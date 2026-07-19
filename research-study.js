import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export const RESEARCH_STUDY_FORMAT = "apex-research-study.v1";

const confidenceRules = JSON.parse(readFileSync(new URL("./skills/research-residential-markets/references/rules/confidence-rules.json", import.meta.url), "utf8"));
const comparableRules = JSON.parse(readFileSync(new URL("./skills/research-residential-markets/references/rules/comparable-weights.json", import.meta.url), "utf8"));
const SOURCE_CONFIDENCE = confidenceRules.base_confidence_by_source_type;
const VERIFICATION_ADJUSTMENT = confidenceRules.verification_adjustment;
const MATERIALITIES = new Set(["critical", "material", "supporting"]);
const APPROVED_GATES = new Set(["approved", "not-required"]);
const SUPPLY_STATUSES = new Set(["existing", "incoming", "planned"]);
const COMPARABLE_WEIGHTS = comparableRules.weights;
const STOP_WORDS = new Set([
  "about", "after", "against", "also", "could", "from", "have", "into", "market", "property",
  "project", "should", "that", "their", "there", "these", "this", "what", "when", "where", "which",
  "with", "would", "your"
]);

function cleanText(value, limit = 1000) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function plainObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) && Number.isFinite(Date.parse(`${value}T00:00:00Z`));
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function issue(code, message, recordId = "") {
  return { code, message, ...(recordId ? { recordId } : {}) };
}

function duplicateValues(items, key) {
  const counts = new Map();
  for (const item of items) {
    const value = cleanText(item?.[key], 160);
    if (value) counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

function confidenceCap(sourceType, verificationStatus) {
  return clamp((SOURCE_CONFIDENCE[sourceType] ?? 0) + (VERIFICATION_ADJUSTMENT[verificationStatus] ?? -1));
}

function sourceIdsValid(record, evidenceIndex, errors, dataset, recordId) {
  if (!Array.isArray(record?.source_ids) || !record.source_ids.length) {
    errors.push(issue("missing-source-ids", `${dataset} record requires at least one evidence source.`, recordId));
    return;
  }
  for (const rawId of record.source_ids) {
    const sourceId = cleanText(rawId, 160);
    const evidence = evidenceIndex.get(sourceId);
    if (!evidence) errors.push(issue("unknown-evidence", `${dataset} references unknown evidence ${sourceId}.`, recordId));
    else if (evidence.verification_status === "rejected") errors.push(issue("rejected-evidence", `${dataset} references rejected evidence ${sourceId}.`, recordId));
  }
}

function canonicalHash(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function comparableClassification(project) {
  if (project.comparison_role_override) return project.comparison_role_override;
  const scores = project.comparable_scores;
  if (!plainObject(scores) || Object.keys(COMPARABLE_WEIGHTS).some((key) => !finiteNumber(scores[key]))) return "unscored";
  const weighted = Object.entries(COMPARABLE_WEIGHTS).reduce((sum, [key, weight]) => sum + Number(scores[key]) * Number(weight), 0);
  const thresholds = comparableRules.classification;
  if (project.performance_class === comparableRules.control_performance_class && weighted >= thresholds.control_minimum) return "control";
  if (weighted >= thresholds.direct_minimum) return "direct";
  if (weighted >= thresholds.aspirational_minimum) return "aspirational";
  if (weighted >= thresholds.contextual_minimum) return "contextual";
  return "excluded";
}

function derivedComparableCounts(projects) {
  return projects.reduce((counts, project) => {
    const classification = comparableClassification(project);
    counts[classification] = (counts[classification] || 0) + 1;
    return counts;
  }, {});
}

export function validateResearchStudyBundle(bundle) {
  const errors = [];
  const warnings = [];
  if (!plainObject(bundle)) return { valid: false, errors: [issue("invalid-bundle", "Research bundle must be a JSON object.")], warnings: [] };
  if (bundle.format !== RESEARCH_STUDY_FORMAT) errors.push(issue("invalid-format", `Bundle format must be ${RESEARCH_STUDY_FORMAT}.`));

  const config = plainObject(bundle.study_config) ? bundle.study_config : {};
  const validation = plainObject(bundle.validation) ? bundle.validation : {};
  const validationSummary = plainObject(validation.summary) ? validation.summary : {};
  const evidence = Array.isArray(bundle.evidence) ? bundle.evidence : [];
  const supply = Array.isArray(bundle.supply) ? bundle.supply : [];
  const transactions = Array.isArray(bundle.transactions) ? bundle.transactions : [];
  const projects = Array.isArray(bundle.projects) ? bundle.projects : [];

  if (!/^[a-z0-9][a-z0-9-]*$/.test(String(config.study_id || ""))) errors.push(issue("invalid-study-id", "study_config.study_id must use lowercase letters, numbers, and hyphens."));
  if (cleanText(config.study_name, 300).length < 3) errors.push(issue("invalid-study-name", "study_config.study_name is required."));
  if (cleanText(config.market, 200).length < 2) errors.push(issue("invalid-market", "study_config.market is required."));
  if (cleanText(config.country, 120).length < 2) errors.push(issue("invalid-country", "study_config.country is required."));
  if (!validDate(config.data_cutoff)) errors.push(issue("invalid-cutoff", "study_config.data_cutoff must be a valid date."));
  if (cleanText(config.decision_statement, 1000).length < 10) errors.push(issue("invalid-decision", "study_config.decision_statement is required."));
  if (!Array.isArray(config.product_scope) || !config.product_scope.length) errors.push(issue("missing-product-scope", "study_config.product_scope requires at least one product."));
  if (!plainObject(config.geographies)) errors.push(issue("missing-geographies", "study_config.geographies is required."));
  for (const gate of ["scope", "evidence", "recommendation", "issuance"]) {
    if (!APPROVED_GATES.has(config.human_gates?.[gate])) errors.push(issue("human-gate-pending", `Human gate ${gate} is not approved.`));
  }
  if (validation.strict_mode !== true || Number(validationSummary.critical_errors) !== 0) {
    errors.push(issue("strict-validation-required", "The bundle requires a successful strict validation report."));
  }
  if (!plainObject(bundle.metrics)) errors.push(issue("missing-metrics", "Calculated metrics are required."));
  if (!plainObject(bundle.comparable_scores)) errors.push(issue("missing-comparable-scores", "Comparable scoring output is required."));
  for (const [name, records] of [["evidence", evidence], ["supply", supply], ["transactions", transactions], ["projects", projects]]) {
    if (!records.length) errors.push(issue("empty-dataset", `${name} dataset must contain records.`));
  }
  const expectedValidationCounts = { evidence_records: evidence.length, supply_records: supply.length, transaction_records: transactions.length, project_records: projects.length };
  for (const [key, expected] of Object.entries(expectedValidationCounts)) {
    if (Number(validationSummary[key]) !== expected) errors.push(issue("validation-count-mismatch", `Strict validation ${key} does not match the bundled dataset.`));
  }
  if (bundle.metrics?.study_id !== config.study_id) errors.push(issue("metrics-study-mismatch", "Calculated metrics study_id does not match the study configuration."));
  if (bundle.metrics?.data_cutoff !== config.data_cutoff) errors.push(issue("metrics-cutoff-mismatch", "Calculated metrics data_cutoff does not match the study configuration."));
  for (const section of ["supply", "transactions", "projects"]) {
    if (!plainObject(bundle.metrics?.[section])) errors.push(issue("metrics-section-missing", `Calculated metrics are missing the ${section} section.`));
  }

  for (const id of duplicateValues(evidence, "evidence_id")) errors.push(issue("duplicate-evidence-id", "Evidence ID is duplicated.", id));
  const evidenceIndex = new Map();
  for (const item of evidence) {
    const evidenceId = cleanText(item?.evidence_id, 160);
    if (!evidenceId) {
      errors.push(issue("missing-evidence-id", "Evidence record is missing evidence_id."));
      continue;
    }
    evidenceIndex.set(evidenceId, item);
    const sourceType = cleanText(item.source_type, 80);
    const verificationStatus = cleanText(item.verification_status, 80);
    const materiality = MATERIALITIES.has(item.materiality) ? item.materiality : "supporting";
    if (cleanText(item.claim, 2000).length < 3) errors.push(issue("invalid-claim", "Evidence claim is required.", evidenceId));
    if (!(sourceType in SOURCE_CONFIDENCE)) errors.push(issue("invalid-source-type", `Unknown evidence source type ${sourceType}.`, evidenceId));
    if (!(verificationStatus in VERIFICATION_ADJUSTMENT)) errors.push(issue("invalid-verification", `Unknown verification status ${verificationStatus}.`, evidenceId));
    if (cleanText(item.source_reference, 2000).length < 3) errors.push(issue("missing-source-reference", "Evidence source reference is required.", evidenceId));
    if (!validDate(item.source_date) || !validDate(item.accessed_date)) errors.push(issue("invalid-evidence-date", "Evidence dates must be valid ISO dates.", evidenceId));
    if (validDate(config.data_cutoff) && validDate(item.source_date) && Date.parse(item.source_date) > Date.parse(config.data_cutoff)) {
      warnings.push(issue("post-cutoff-source", "Evidence source date is after the study cut-off.", evidenceId));
    }
    if (!finiteNumber(item.confidence) || item.confidence < 0 || item.confidence > 1) errors.push(issue("invalid-confidence", "Evidence confidence must be between 0 and 1.", evidenceId));
    const effective = finiteNumber(item.confidence) ? Math.min(item.confidence, confidenceCap(sourceType, verificationStatus)) : 0;
    if (materiality === "critical" && effective < 0.8) errors.push(issue("weak-critical-evidence", "Critical evidence requires effective confidence of at least 0.80.", evidenceId));
    if (materiality === "material" && effective < 0.6) errors.push(issue("weak-material-evidence", "Material evidence requires effective confidence of at least 0.60.", evidenceId));
    if (["disputed", "rejected"].includes(verificationStatus) && materiality === "critical") errors.push(issue("disputed-critical-evidence", "Critical evidence cannot be disputed or rejected.", evidenceId));
  }

  const cutoffYear = validDate(config.data_cutoff) ? Number(String(config.data_cutoff).slice(0, 4)) : 0;
  for (const id of duplicateValues(supply, "record_id")) errors.push(issue("duplicate-supply-id", "Supply record ID is duplicated.", id));
  for (const item of supply) {
    const id = cleanText(item?.record_id, 160) || "unknown";
    if (!SUPPLY_STATUSES.has(item?.status)) errors.push(issue("invalid-supply-status", "Supply status must be existing, incoming, or planned.", id));
    if (!Number.isInteger(item?.period_year) || item.period_year < 1900 || item.period_year > 2200) errors.push(issue("invalid-supply-year", "Supply year is invalid.", id));
    if (cutoffYear && item.period_year > cutoffYear) errors.push(issue("post-cutoff-supply", "Supply snapshot year exceeds the study cut-off.", id));
    if (!Number.isInteger(item?.units) || item.units < 0) errors.push(issue("invalid-supply-units", "Supply units must be a non-negative integer.", id));
    sourceIdsValid(item, evidenceIndex, errors, "Supply", id);
  }

  for (const id of duplicateValues(transactions, "transaction_id")) errors.push(issue("duplicate-transaction-id", "Transaction ID is duplicated.", id));
  for (const item of transactions) {
    const id = cleanText(item?.transaction_id, 160) || "unknown";
    if (!validDate(item?.date)) errors.push(issue("invalid-transaction-date", "Transaction date is invalid.", id));
    if (validDate(config.data_cutoff) && validDate(item?.date) && Date.parse(item.date) > Date.parse(config.data_cutoff)) errors.push(issue("post-cutoff-transaction", "Transaction date exceeds the study cut-off.", id));
    if (!['primary', 'secondary'].includes(item?.market_type)) errors.push(issue("invalid-market-type", "Transaction market_type is invalid.", id));
    if (!['individual', 'aggregate'].includes(item?.record_kind)) errors.push(issue("invalid-record-kind", "Transaction record_kind is invalid.", id));
    if (item?.record_kind === "individual" && (!finiteNumber(item.price) || item.price <= 0)) errors.push(issue("missing-individual-price", "Individual transaction requires a positive price.", id));
    if (item?.record_kind === "aggregate" && (!Number.isInteger(item.volume) || item.volume < 0 || !finiteNumber(item.total_value) || item.total_value < 0)) errors.push(issue("missing-aggregate-values", "Aggregate transaction requires volume and total_value.", id));
    sourceIdsValid(item, evidenceIndex, errors, "Transaction", id);
  }

  for (const id of duplicateValues(projects, "project_id")) errors.push(issue("duplicate-project-id", "Project ID is duplicated.", id));
  for (const item of projects) {
    const id = cleanText(item?.project_id, 160) || "unknown";
    if (!cleanText(item?.project_name, 300)) errors.push(issue("missing-project-name", "Project name is required.", id));
    if (!Number.isInteger(item?.total_units) || item.total_units < 0) errors.push(issue("invalid-total-units", "Project total_units must be a non-negative integer.", id));
    if (Number.isInteger(item?.units_released) && item.units_released > item.total_units) errors.push(issue("released-exceeds-total", "Project units_released exceeds total_units.", id));
    if (Number.isInteger(item?.verified_sales) && Number.isInteger(item?.units_released) && item.verified_sales > item.units_released) errors.push(issue("sales-exceed-released", "Project verified_sales exceeds units_released.", id));
    for (const [low, high] of [["gross_price_min", "gross_price_max"], ["net_price_min", "net_price_max"], ["size_sqft_min", "size_sqft_max"]]) {
      if (finiteNumber(item?.[low]) && finiteNumber(item?.[high]) && item[low] > item[high]) errors.push(issue("invalid-project-range", `${low} exceeds ${high}.`, id));
    }
    if (plainObject(item?.comparable_scores)) {
      for (const key of Object.keys(COMPARABLE_WEIGHTS)) {
        if (!finiteNumber(item.comparable_scores[key]) || item.comparable_scores[key] < 0 || item.comparable_scores[key] > 5) errors.push(issue("invalid-comparable-score", `Comparable score ${key} must be between 0 and 5.`, id));
      }
    }
    if (item?.comparison_role_override && !cleanText(item?.override_reason, 1000)) errors.push(issue("override-without-reason", "Comparable override requires a reason.", id));
    sourceIdsValid(item, evidenceIndex, errors, "Project", id);
  }

  const projectIds = new Set(projects.map((item) => cleanText(item?.project_id, 160)).filter(Boolean));
  for (const item of evidence) {
    if (item?.project_id && !projectIds.has(cleanText(item.project_id, 160))) errors.push(issue("unknown-evidence-project", "Evidence references an unknown project.", cleanText(item.evidence_id, 160)));
  }
  for (const [dataset, records, idKey] of [["Supply", supply, "record_id"], ["Transaction", transactions, "transaction_id"]]) {
    for (const item of records) {
      if (item?.project_id && !projectIds.has(cleanText(item.project_id, 160))) errors.push(issue("unknown-record-project", `${dataset} record references an unknown project.`, cleanText(item[idKey], 160)));
    }
  }

  const derivedCounts = derivedComparableCounts(projects);
  if (!derivedCounts.direct) errors.push(issue("missing-direct-comparable", "At least one direct comparable is required."));
  if (!derivedCounts.control) errors.push(issue("missing-control-comparable", "At least one weak-performing control comparable is required."));
  const reportedCounts = bundle.comparable_scores?.classification_counts || {};
  for (const classification of ["direct", "control", "aspirational", "contextual", "excluded", "unscored"]) {
    if (Number(reportedCounts[classification] || 0) !== Number(derivedCounts[classification] || 0)) {
      errors.push(issue("comparable-count-mismatch", `Reported ${classification} comparable count does not match Apex's independent calculation.`));
    }
  }
  const scoredProjects = Array.isArray(bundle.comparable_scores?.projects) ? bundle.comparable_scores.projects : [];
  if (scoredProjects.length !== projects.length) errors.push(issue("comparable-project-count-mismatch", "Comparable scoring output must contain every project."));
  for (const project of projects) {
    const projectId = cleanText(project.project_id, 160);
    const scored = scoredProjects.find((item) => cleanText(item?.project_id, 160) === projectId);
    if (!scored) errors.push(issue("missing-comparable-project", "Comparable scoring output is missing this project.", projectId));
    else if (scored.classification !== comparableClassification(project)) errors.push(issue("comparable-classification-mismatch", "Comparable classification does not match Apex's independent calculation.", projectId));
  }

  const latestSupply = {};
  for (const status of SUPPLY_STATUSES) {
    const records = supply.filter((item) => item.status === status);
    const latestYear = records.reduce((latest, item) => Math.max(latest, Number(item.period_year || 0)), 0);
    latestSupply[status] = records.filter((item) => item.period_year === latestYear).reduce((sum, item) => sum + Number(item.units || 0), 0);
  }
  const expectedPressure = latestSupply.existing ? ((latestSupply.incoming || 0) + (latestSupply.planned || 0)) / latestSupply.existing : null;
  const reportedPressure = bundle.metrics?.supply?.pipeline_pressure;
  if ((expectedPressure === null && reportedPressure !== null) || (expectedPressure !== null && (!finiteNumber(reportedPressure) || Math.abs(reportedPressure - expectedPressure) > 1e-9))) {
    errors.push(issue("pipeline-pressure-mismatch", "Calculated pipeline pressure does not match the supply records."));
  }

  return { valid: errors.length === 0, errors, warnings };
}

function normalizedEvidence(item) {
  const sourceType = cleanText(item.source_type, 80);
  const verificationStatus = cleanText(item.verification_status, 80);
  const providedConfidence = Number(item.confidence);
  const cap = confidenceCap(sourceType, verificationStatus);
  return {
    ...item,
    evidence_id: cleanText(item.evidence_id, 160),
    claim: cleanText(item.claim, 3000),
    source_type: sourceType,
    source_reference: cleanText(item.source_reference, 2000),
    geography: cleanText(item.geography, 300),
    project_id: cleanText(item.project_id, 160),
    materiality: MATERIALITIES.has(item.materiality) ? item.materiality : "supporting",
    entered_confidence: providedConfidence,
    confidence_cap: cap,
    effective_confidence: Math.min(providedConfidence, cap),
    verification_status: verificationStatus,
    notes: cleanText(item.notes, 2000)
  };
}

function calculateSummary(study) {
  const latestSupply = {};
  for (const status of SUPPLY_STATUSES) {
    const records = study.supply.filter((item) => item.status === status);
    const year = records.reduce((latest, item) => Math.max(latest, Number(item.period_year || 0)), 0);
    latestSupply[status] = records.filter((item) => item.period_year === year).reduce((sum, item) => sum + Number(item.units || 0), 0);
  }
  const futureUnits = (latestSupply.incoming || 0) + (latestSupply.planned || 0);
  const existingUnits = latestSupply.existing || 0;
  const classifications = derivedComparableCounts(study.projects);
  return {
    evidenceRecords: study.evidence.length,
    supplyRecords: study.supply.length,
    transactionRecords: study.transactions.length,
    projectRecords: study.projects.length,
    effectiveHighConfidence: study.evidence.filter((item) => item.effective_confidence >= 0.8).length,
    existingUnits,
    futureUnits,
    pipelinePressure: existingUnits ? futureUnits / existingUnits : null,
    directComparables: Number(classifications.direct || 0),
    controlComparables: Number(classifications.control || 0),
    warnings: study.validationWarnings.length
  };
}

export function buildResearchStudy(bundle, importedAt = new Date().toISOString()) {
  const result = validateResearchStudyBundle(bundle);
  if (!result.valid) {
    const error = new Error("Research study bundle failed strict validation.");
    error.code = "INVALID_RESEARCH_STUDY";
    error.issues = result.errors;
    throw error;
  }
  const config = bundle.study_config;
  const study = {
    id: cleanText(config.study_id, 160),
    format: RESEARCH_STUDY_FORMAT,
    title: cleanText(config.study_name, 300),
    market: cleanText(config.market, 200),
    country: cleanText(config.country, 120),
    dataCutoff: config.data_cutoff,
    decisionStatement: cleanText(config.decision_statement, 2000),
    geographies: JSON.parse(JSON.stringify(config.geographies || {})),
    productScope: Array.isArray(config.product_scope) ? config.product_scope.map((item) => cleanText(item, 200)).filter(Boolean).slice(0, 30) : [],
    targetBuyers: Array.isArray(config.target_buyers) ? config.target_buyers.map((item) => cleanText(item, 200)).filter(Boolean).slice(0, 30) : [],
    humanGates: JSON.parse(JSON.stringify(config.human_gates || {})),
    evidence: bundle.evidence.map(normalizedEvidence).slice(0, 20000),
    supply: JSON.parse(JSON.stringify(bundle.supply)).slice(0, 20000),
    transactions: JSON.parse(JSON.stringify(bundle.transactions)).slice(0, 50000),
    projects: JSON.parse(JSON.stringify(bundle.projects)).slice(0, 10000),
    metrics: JSON.parse(JSON.stringify(bundle.metrics)),
    comparableScores: JSON.parse(JSON.stringify(bundle.comparable_scores)),
    validation: JSON.parse(JSON.stringify(bundle.validation)),
    validationWarnings: result.warnings,
    sourceBundleHash: canonicalHash(bundle),
    sourceExportedAt: cleanText(bundle.exported_at, 80),
    importedAt,
    updatedAt: importedAt
  };
  study.summary = calculateSummary(study);
  return study;
}

export function normalizeResearchStudies(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => plainObject(item) && item.format === RESEARCH_STUDY_FORMAT && item.id && Array.isArray(item.evidence)).map((item) => {
    const study = {
      ...item,
      id: cleanText(item.id, 160),
      title: cleanText(item.title, 300),
      market: cleanText(item.market, 200),
      country: cleanText(item.country, 120),
      decisionStatement: cleanText(item.decisionStatement, 2000),
      productScope: Array.isArray(item.productScope) ? item.productScope.map((value) => cleanText(value, 200)).filter(Boolean).slice(0, 30) : [],
      targetBuyers: Array.isArray(item.targetBuyers) ? item.targetBuyers.map((value) => cleanText(value, 200)).filter(Boolean).slice(0, 30) : [],
      evidence: item.evidence.map(normalizedEvidence).slice(0, 20000),
      supply: Array.isArray(item.supply) ? item.supply.slice(0, 20000) : [],
      transactions: Array.isArray(item.transactions) ? item.transactions.slice(0, 50000) : [],
      projects: Array.isArray(item.projects) ? item.projects.slice(0, 10000) : [],
      validationWarnings: Array.isArray(item.validationWarnings) ? item.validationWarnings.slice(0, 500) : [],
      importedAt: cleanText(item.importedAt, 80),
      updatedAt: cleanText(item.updatedAt || item.importedAt, 80)
    };
    study.summary = calculateSummary(study);
    return study;
  }).slice(-200);
}

function terms(value) {
  return [...new Set(cleanText(value, 20000).toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((token) => token.length >= 3 && !STOP_WORDS.has(token)))];
}

function matchScore(queryTerms, text) {
  const target = new Set(terms(text));
  return queryTerms.reduce((score, token) => score + (target.has(token) ? 1 : 0), 0);
}

function ageDays(date, now) {
  const parsed = Date.parse(`${date}T00:00:00Z`);
  return Number.isFinite(parsed) ? Math.max(0, Math.floor((now.getTime() - parsed) / 86400000)) : null;
}

export function selectResearchIntelligence(query, studies, limit = 6, now = new Date()) {
  const queryTerms = terms(query);
  if (!queryTerms.length) return { studies: [], matches: [], summary: { matched: 0, studies: 0, stale: 0 } };
  const matches = [];
  for (const study of normalizeResearchStudies(studies)) {
    const projectIndex = new Map(study.projects.map((item) => [item.project_id, item]));
    const studyText = [study.title, study.market, study.country, study.decisionStatement, JSON.stringify(study.geographies), study.productScope.join(" "), study.projects.map((item) => `${item.project_name} ${item.geography} ${item.submarket || ""}`).join(" ")].join(" ");
    const studyScore = matchScore(queryTerms, studyText);
    for (const evidence of study.evidence) {
      if (evidence.verification_status === "rejected" || evidence.effective_confidence < 0.6) continue;
      const project = projectIndex.get(evidence.project_id);
      const directScore = matchScore(queryTerms, [evidence.claim, evidence.geography, project?.project_name, project?.geography, project?.submarket].join(" "));
      const relevance = directScore * 10 + Math.min(studyScore, 4) * 2 + evidence.effective_confidence * 4;
      if (directScore === 0 && studyScore === 0) continue;
      const days = ageDays(evidence.source_date, now);
      matches.push({
        studyId: study.id,
        studyTitle: study.title,
        market: study.market,
        dataCutoff: study.dataCutoff,
        evidenceId: evidence.evidence_id,
        claim: evidence.claim,
        value: evidence.value,
        unit: evidence.unit || "",
        geography: evidence.geography || project?.geography || "",
        projectId: evidence.project_id || "",
        projectName: project?.project_name || "",
        sourceType: evidence.source_type,
        sourceReference: evidence.source_reference,
        sourceDate: evidence.source_date,
        confidence: evidence.effective_confidence,
        verificationStatus: evidence.verification_status,
        materiality: evidence.materiality,
        ageDays: days,
        stale: days !== null && days > 730,
        score: relevance - (days !== null && days > 730 ? 2 : 0)
      });
    }
  }
  matches.sort((left, right) => right.score - left.score || right.confidence - left.confidence || String(right.sourceDate).localeCompare(String(left.sourceDate)));
  const selected = matches.slice(0, Math.max(1, Math.min(20, Number(limit) || 6)));
  const selectedIds = [...new Set(selected.map((item) => item.studyId))];
  const selectedStudies = normalizeResearchStudies(studies).filter((study) => selectedIds.includes(study.id)).map((study) => ({
    id: study.id,
    title: study.title,
    market: study.market,
    dataCutoff: study.dataCutoff,
    decisionStatement: study.decisionStatement,
    summary: study.summary
  }));
  return { studies: selectedStudies, matches: selected, summary: { matched: selected.length, studies: selectedStudies.length, stale: selected.filter((item) => item.stale).length } };
}

export function researchIntelligenceForPrompt(intelligence) {
  if (!intelligence?.matches?.length) return "No strictly validated market-research evidence matched.";
  const studyLines = intelligence.studies.map((study) => {
    const pressure = finiteNumber(study.summary?.pipelinePressure) ? `${(study.summary.pipelinePressure * 100).toFixed(1)}% pipeline pressure` : "pipeline pressure unavailable";
    return `- Study ${study.title}; market ${study.market}; data cut-off ${study.dataCutoff}; ${pressure}.`;
  });
  const evidenceLines = intelligence.matches.map((item) => `- VERIFIED EVIDENCE [${item.evidenceId}]: ${item.claim} Source date ${item.sourceDate}; effective confidence ${(item.confidence * 100).toFixed(0)}%; ${item.verificationStatus}; source ${item.sourceReference}.`);
  return [...studyLines, ...evidenceLines].join("\n");
}

export function researchStudySources(intelligence) {
  return (intelligence?.matches || []).map((item) => ({
    id: `${item.studyId}:${item.evidenceId}`,
    title: `${item.studyTitle}: ${item.evidenceId}`,
    body: item.claim,
    preview: item.claim,
    type: "research",
    tags: [item.market, item.geography, item.projectName, item.materiality].filter(Boolean),
    studyId: item.studyId,
    sourceReference: item.sourceReference,
    sourceDate: item.sourceDate,
    confidence: item.confidence,
    verificationStatus: item.verificationStatus,
    stale: item.stale
  }));
}

export function publicResearchStudySummary(study) {
  return {
    id: study.id,
    title: study.title,
    market: study.market,
    country: study.country,
    dataCutoff: study.dataCutoff,
    decisionStatement: study.decisionStatement,
    productScope: study.productScope,
    humanGates: study.humanGates,
    importedAt: study.importedAt,
    updatedAt: study.updatedAt,
    sourceBundleHash: study.sourceBundleHash,
    summary: study.summary
  };
}
