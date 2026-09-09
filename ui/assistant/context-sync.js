export const contextOf = value => structuredClone({ dealCard: value.dealCard || {}, financialProfile: value.financialProfile || {}, evidence: value.evidence || {}, dcfContext: value.dcfContext || {} });

export function createContextSync({ request, onState, onSaved, delay = 650 }) {
  const records = new Map();
  let epoch = 0;
  function register(id, revision, context) {
    let record = records.get(id);
    if (!record) {
      record = { revision, saved: JSON.stringify(contextOf(context)), pending: null, running: null, timer: null, error: null };
      records.set(id, record);
    }
    return record;
  }
  async function flush(id) {
    const record = records.get(id), generation = epoch;
    if (!record) return;
    clearTimeout(record.timer);
    if (record.running) { await record.running; if (generation === epoch && record.pending) return flush(id); return; }
    if (record.error?.status === 409) throw record.error;
    if (!record.pending) return;
    const payload = record.pending;
    record.pending = null;
    onState(id, "saving");
    record.running = (async () => {
      try {
        const result = await request(`/api/assistant/cases/${id}/context`, { contextRevision: record.revision, context: payload });
        if (generation !== epoch || records.get(id) !== record) return;
        record.revision = result.case.working?.revision || 0;
        record.saved = JSON.stringify(contextOf(payload));
        record.error = null;
        onSaved(id, result.case);
        onState(id, record.pending ? "pending" : "saved");
      } catch (error) {
        if (generation !== epoch || records.get(id) !== record) return;
        record.pending ||= payload;
        record.error = error;
        onState(id, error.status === 409 ? "conflict" : "unsaved", error);
        throw error;
      } finally { record.running = null; }
    })();
    await record.running;
    if (generation === epoch && record.pending) return flush(id);
  }
  return {
    register,
    hasPending(id) { const record = records.get(id); return Boolean(record?.pending || record?.running || record?.error); },
    pending(id) { return records.get(id)?.pending ? structuredClone(records.get(id).pending) : null; },
    hold(id, revision, context) {
      const record = register(id, revision, {});
      record.pending = contextOf(context);
      record.error = Object.assign(new Error("Earlier tool edits have no sync history. Review both versions before choosing which to keep."), { status: 409 });
      onState(id, "conflict", record.error);
    },
    queue(id, revision, context) {
      const record = register(id, revision, context), payload = contextOf(context);
      if (!record.running && !record.pending && record.saved === JSON.stringify(payload)) return;
      record.pending = payload;
      clearTimeout(record.timer);
      onState(id, record.error?.status === 409 ? "conflict" : "pending");
      if (record.error?.status !== 409) record.timer = setTimeout(() => { void flush(id).catch(() => {}); }, delay);
    },
    flush,
    accept(item) {
      const old = records.get(item.id);
      if (old?.running) throw new Error("Wait for the current save to finish before replacing the local copy.");
      clearTimeout(old?.timer);
      records.delete(item.id);
      register(item.id, item.working?.revision || 0, item.toolContext || item.working || {});
      onState(item.id, "saved");
    },
    async keepLocal(item) {
      const pending = this.pending(item.id);
      if (!pending) throw new Error("No unsaved tool inputs to apply.");
      this.accept(item);
      this.queue(item.id, item.working?.revision || 0, pending);
      await flush(item.id);
    },
    forget(id) { clearTimeout(records.get(id)?.timer); records.delete(id); },
    reset() { epoch++; for (const record of records.values()) clearTimeout(record.timer); records.clear(); }
  };
}
