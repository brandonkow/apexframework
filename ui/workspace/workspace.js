import markup from "./panels.html";
import { installCataloguePanel } from "../assistant/assistant.js";

const AREAS = {
  desk: { title: "The decision desk", description: "Explore the question. Test the numbers. Keep your context together.", views: [["chat", "Ask Apex", "Your thinking partner"], ["deal", "Property inputs", "Shared with the journey"], ["profile", "Investor profile", "Capacity, goals and reserves"], ["valuation", "Valuation lab", "DCF, comparisons and Excel"], ["guidance", "Preferences", "Choose your guidance style"]] },
  library: { title: "Your private library", description: "Return to what you learned, decided and saved.", views: [["reports", "Decision reports", "Saved seven-stage assessments"], ["journal", "Decision journal", "Thesis, outcomes and lessons"], ["memory", "Long-term memory", "Review what Apex remembers"], ["history", "Conversations", "Resume or manage your history"], ["shortlist", "Saved shortlist", "Compare earlier assessments"]] },
  owner: { title: "Owner Studio", description: "Curate the intelligence. Shared knowledge stays under your control.", views: [["owner", "Intelligence hub", "Coverage, research and operations"], ["catalogue", "Discovery catalogue", "Permitted sources and current listings"], ["market", "Market observatory", "Projects and dated observations"], ["cases", "Development cases", "Your project-level experience"], ["evidence", "Evidence vault", "Sources, documents and indexing"]] },
  account: { title: "Your account", description: "Private access, plan details and the boundaries that protect your decisions.", views: [["account", "Account & plan", "Sign in, security and billing"], ["trust", "Decision boundaries", "What Apex can and cannot do"]] }
};
const allViews = Object.entries(AREAS).flatMap(([area, config]) => config.views.map(([id, label, description]) => ({ area, id, label, description })));
const $ = selector => document.querySelector(selector);

export function createWorkspace({ getCandidate, notify, onVisibility, beforeOpen }) {
  const host = $("#workbench");
  host.innerHTML = `<aside class="studio-sidebar"><p class="eyebrow">APEX / WORKSPACE</p><h2 id="studioAreaTitle"></h2><p id="studioAreaDescription"></p><label class="studio-search"><span class="sr-only">Find a feature</span><input id="studioSearch" type="search" placeholder="Find a tool..." autocomplete="off"></label><nav id="studioNav" aria-label="Workspace sections"></nav><label class="mobile-section"><span>Section</span><select id="studioSectionSelect"></select></label><p class="studio-private">Your property stays selected as you move between tools. Knowledge updates are owner-only.</p></aside><div class="studio-main"><header class="studio-breadcrumb"><span id="studioBreadcrumb"></span><button type="button" data-return-journey>Back to journey <span aria-hidden="true">&#8599;</span></button></header><div id="studioLoading" role="status" hidden>Connecting your workspace...</div>${markup}</div>`;
  installCataloguePanel(host);
  host.querySelector(".studio-breadcrumb").insertAdjacentHTML("afterend", '<p id="studioSyncStatus" class="assistant-caption" role="status" hidden></p>');
  let features, loading, active = "", area = "desk", navigating = false;
  $("#studioBreadcrumb").tabIndex = -1;
  let earlierDraft;
  try {
    const deal = JSON.parse(localStorage.getItem("estatelab.jarvis.dealCard") || "{}");
    const profile = JSON.parse(localStorage.getItem("estatelab.jarvis.financialProfile") || "{}");
    if (!localStorage.getItem("apex.workspace.recovered") && (Object.keys(deal).length || Object.keys(profile).length)) earlierDraft = { dealCard: deal, financialProfile: profile };
  } catch {}
  if (earlierDraft) {
    const recovery = document.createElement("details");
    recovery.className = "draft-recovery";
    recovery.innerHTML = '<summary>Earlier browser inputs found</summary><p>Recover the draft saved on this device. Review it before relying on it; your existing properties will not be overwritten.</p><button type="button" data-recover-draft>Recover draft</button>';
    host.querySelector(".studio-sidebar").append(recovery);
  }
  for (const view of allViews) {
    const heading = host.querySelector(`[data-surface="${view.id}"] > header > span > b:not([id])`);
    if (heading) heading.textContent = view.label;
  }
  function show(surface, updateHash = true) {
    const view = allViews.find(view => view.id === surface);
    if (!view) return;
    active = surface; area = view.area;
    document.dispatchEvent(new CustomEvent("apex:leave-assistant"));
    host.hidden = false; document.body.classList.add("workspace-active"); onVisibility(true);
    $("#studioAreaTitle").textContent = AREAS[area].title;
    $("#studioAreaDescription").textContent = AREAS[area].description;
    $("#studioBreadcrumb").textContent = `${AREAS[area].title} / ${view.label}`;
    host.querySelectorAll("[data-surface]").forEach(node => { node.hidden = node.dataset.surface !== surface; });
    document.querySelectorAll("[data-area]").forEach(button => button.setAttribute("aria-current", button.dataset.area === area ? "page" : "false"));
    $("#studioAccount").setAttribute("aria-current", area === "account" ? "page" : "false");
    renderNavigation($("#studioSearch").value);
    if (updateHash) history.replaceState(null, "", `#${area}/${surface}`);
  }
  function renderNavigation(query = "") {
    const term = query.trim().toLowerCase();
    host.dataset.searching = String(Boolean(term));
    const views = term ? allViews.filter(view => `${view.label} ${view.description}`.toLowerCase().includes(term)) : allViews.filter(view => view.area === area);
    $("#studioNav").innerHTML = views.map((view, index) => `<button type="button" data-view="${view.id}" aria-current="${active === view.id ? "page" : "false"}"><span class="studio-nav-number">${String(index + 1).padStart(2, "0")}</span><span><b>${view.label}</b><small>${view.description}</small></span><span aria-hidden="true">&#8599;</span></button>`).join("") || '<p>No matching tools. Try "reports", "DCF" or "memory".</p>';
    $("#studioSectionSelect").innerHTML = Object.entries(AREAS).map(([key, config]) => `<optgroup label="${config.title}">${config.views.map(([id, label]) => `<option value="${id}" ${id === active ? "selected" : ""}>${label}</option>`).join("")}</optgroup>`).join("");
  }
  async function ready() {
    if (features && host.dataset.ready === "true") return features;
    if (!loading) loading = (async () => {
      $("#studioLoading").hidden = false;
      const module = await import("./features.js");
      features = module;
      module.setWorkspaceCandidate(getCandidate());
      await module.initializeFeatures();
      $("#studioLoading").hidden = true;
      host.dataset.ready = "true";
      return module;
    })().catch(error => { loading = null; $("#studioLoading").textContent = "Workspace connection failed. Try selecting a section again."; throw error; });
    return loading;
  }
  async function open(surface = "chat", options = {}) {
    if (navigating || features?.workspaceBusy()) { notify("Let Apex finish the current request before switching tools."); return; }
    navigating = true;
    show(surface); $("#studioSearch").value = "";
    try {
      await beforeOpen?.(surface);
      const controller = await ready();
      if (surface !== "catalogue") await controller.openWorkspaceFeature(surface, options);
      show(active || surface);
      if (active === "account" && surface !== "account") notify("Sign in to open your private library. Guest chat and property tools remain available.");
      window.scrollTo({ top: 0, behavior: "instant" });
      if (surface !== "chat" && !matchMedia("(pointer: coarse)").matches) $("#studioBreadcrumb").focus({ preventScroll: true });
    } catch (error) { notify(error.message, true); }
    finally { navigating = false; }
  }
  function close() {
    if (navigating || features?.workspaceBusy()) { notify("Let Apex finish the current request before switching views."); return; }
    host.hidden = true; document.body.classList.remove("workspace-active");
    document.dispatchEvent(new CustomEvent("apex:leave-assistant"));
    history.replaceState(null, "", "#journey"); onVisibility(false);
    document.querySelectorAll("[data-area]").forEach(button => button.setAttribute("aria-current", button.dataset.area === "journey" ? "page" : "false"));
  }
  document.addEventListener("apex:surface", event => show(event.detail));
  document.addEventListener("apex:notice", event => notify(event.detail, true));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !host.hidden && !$("#workspaceDialog").open) close();
  });
  host.addEventListener("click", event => {
    const button = event.target.closest("button"); if (!button) return;
    if (button.dataset.view) void open(button.dataset.view);
    if (button.hasAttribute("data-return-journey")) close();
    if (button.hasAttribute("data-studio-close")) void open("chat");
    if (button.hasAttribute("data-recover-draft") && !features?.workspaceBusy()) document.dispatchEvent(new CustomEvent("apex:recover-draft", { detail: earlierDraft }));
  });
  $("#studioSearch").addEventListener("input", event => renderNavigation(event.target.value));
  $("#studioSectionSelect").addEventListener("change", event => void open(event.target.value));
  document.addEventListener("keydown", event => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); void open(active || "chat").then(() => $("#studioSearch").focus()); } });
  document.querySelectorAll("[data-area]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.area === "assistant") return;
    if (button.dataset.area === "journey") close();
    else void open(AREAS[button.dataset.area].views[0][0]);
  }));
  $("#studioAccount").addEventListener("click", () => void open("account"));
  return {
    open, close, isBusy: () => navigating || Boolean(features?.workspaceBusy()),
    setCandidate(candidate) { features?.setWorkspaceCandidate(candidate); },
    restoreRoute() { const surface = location.hash.split("/")[1]; if (allViews.some(view => view.id === surface)) void open(surface); }
  };
}
