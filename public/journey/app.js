var mx=Object.defineProperty;var gx=(n,e)=>()=>(n&&(e=n(n=0)),e);var yx=(n,e)=>{for(var t in e)mx(n,t,{get:e[t],enumerable:!0})};var Kb={};yx(Kb,{initializeFeatures:()=>y1,openWorkspaceFeature:()=>x1,setWorkspaceCandidate:()=>b1,workspaceBusy:()=>v1});function Fu(n={}){Ba&&document.dispatchEvent(new CustomEvent("apex:context",{detail:{candidateId:Ba,dealCard:Ki(),financialProfile:To(),dcfContext:ud(),...n}}))}function Qt(n){document.dispatchEvent(new CustomEvent("apex:surface",{detail:n}))}function Wt(n){Sn=n,document.dispatchEvent(new CustomEvent("apex:busy",{detail:Sn})),_n.disabled=n,vM.disabled=n,La.disabled=n,qn.disabled=n,Jy.disabled=n,Vu.disabled=n,iv.disabled=n,Gi&&(Gi.disabled=n)}function il(){try{let n=JSON.parse(window.localStorage.getItem("apex.journey.client"));if(/^[A-Za-z0-9_-]{16,128}$/.test(n||""))return n}catch{}return Ba||crypto.randomUUID()}function Ti(n){return String(n??"").replace(/EstateLab/gi,"Apex Analytic").replace(/Jarvis/gi,"Apex")}function p(n){return Ti(n).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[e])}function ge(n,e){let t={"System ready":"Ready","Connection issue":"Offline","Voice interrupted":"Voice issue",Resetting:"Starting"}[n]||n;xM.innerHTML=`<i></i> ${p(t).toUpperCase()}`,bM.textContent=e,document.querySelector("#conversation").hidden&&/Connection issue|Voice interrupted/.test(n)&&document.dispatchEvent(new CustomEvent("apex:notice",{detail:e}))}function Es(n){_M.textContent=n}function Zv(n){let e=String(n||"").toLowerCase();return e.trim()?/\b(compare|comparison|versus| vs |which one|option a|option b|better between)\b/.test(` ${e} `)?{id:"compare",...rr.compare}:/\b(offer|negotiate|negotiation|booking|walk.?away|counter.?offer|asking price|max price)\b/.test(e)?{id:"offer",...rr.offer}:/\b(checklist|check list|steps|to.?do|action list|what next|next actions)\b/.test(e)?{id:"checklist",...rr.checklist}:/\b(voice|read|earphone|summary|short answer|brief)\b/.test(e)?{id:"voice",...rr.voice}:/\b(buy|purchase|deal|invest|shortlist|screen|condo|apartment|property|rent|rental|yield|price)\b/.test(e)?{id:"screen",...rr.screen}:{id:"chat",...rr.chat}:{id:"chat",...rr.chat}}function Ju(n=_n.value){let e=Zv(n);return fp&&(fp.textContent=e.label,fp.title=e.prompt),mu.dataset.inputMode=e.id,mu.setAttribute("aria-label",e.prompt),_n.placeholder=e.placeholder,e}function eA(n){let e=Ti(n).replace(/\s+/g," ").trim();if(e.length<=520)return e;let t=e.match(/[^.!?]+[.!?]?/g)||[e],i="";for(let s of t){let r=`${i} ${s}`.trim();if(r.length>420)break;i=r}return`${i||e.slice(0,420)} Full answer is on screen.`}function Zu(){try{let n=JSON.parse(window.localStorage.getItem(Gv)||"[]");return Array.isArray(n)?n.slice(0,12):[]}catch{return[]}}function tA(n=[]){window.localStorage.setItem(Gv,JSON.stringify(n.slice(0,12)))}function nA(){let n=Zu();if(!n.length)return"";let e=n[0],t=kf.map(i=>{let s=n.filter(r=>r.value===i.id).length;return s?`${i.label}: ${s}`:""}).filter(Boolean).join(", ");return[e?.note?`Latest feedback: ${e.note}`:"",t?`Recent feedback pattern: ${t}.`:""].filter(Boolean).join(" ")}function iA(n){if(!n)return"";let e=Zu().find(t=>t.messageId===n)?.value||"";return`
    <section class="responseFeedback" data-feedback-message="${p(n)}" aria-label="Answer feedback">
      <span>Answer feel</span>
      ${kf.map(t=>`
        <button type="button" data-response-feedback="${p(t.id)}" class="${e===t.id?"active":""}">
          ${p(t.label)}
        </button>
      `).join("")}
      <button type="button" data-response-refine hidden>REFINE NOW</button>
    </section>
  `}function sA(n={}){let e=Ti(n.refinementSource||n.answer||"").replace(/\s+/g," ").trim();return!e||n.value==="useful"?"":n.value==="shorter"?`Rewrite your previous answer into a short Apex answer: verdict, strongest reason, main risk, and next action only. Keep the same investment judgment unless new evidence is provided. Previous answer: ${e}`:n.value==="warmer"?`Rewrite your previous answer in a more natural mentor-like tone. Keep it human, direct, and calm. Do not weaken the evidence standard or change the verdict. Previous answer: ${e}`:n.value==="evidence"?`For your previous answer, give me the missing-proof checklist only. Separate hard stop, verify next, and optional evidence. Do not change the verdict without new evidence. Previous answer: ${e}`:""}function Qv(n,e){let t=n?.querySelector("[data-response-refine]");if(!t)return;let i=sA(e);t.hidden=!i,t.disabled=!1,t.setAttribute("data-refinement-prompt",i),t.textContent=e?.value==="evidence"?"PROOF CHECK":"REFINE NOW"}function rA(n){n.querySelectorAll("[data-feedback-message]").forEach(e=>{let t=e.getAttribute("data-feedback-message")||"",i=Zu().find(s=>s.messageId===t);i&&Qv(e,i)})}async function oA(n){if(ft)try{let e=await ze("/api/memory/answer-style",{method:"POST",body:JSON.stringify(n)});e?.stored&&!_o.hidden&&Bf(e.settings||{})}catch{}}function aA(n){let e=n.closest("[data-feedback-message]");if(!e)return;let t=e.getAttribute("data-feedback-message")||"",i=n.getAttribute("data-response-feedback")||"",s=kf.find(l=>l.id===i);if(!t||!s)return;let r=Ti(e.closest(".message")?.querySelector(".messageText")?.textContent||"").replace(/\s+/g," ").trim(),o={messageId:t,value:i,label:s.label,note:s.note,answer:r.slice(0,180),refinementSource:r.slice(0,900),createdAt:new Date().toISOString()},a=[o,...Zu().filter(l=>l.messageId!==t)];tA(a),e.querySelectorAll("[data-response-feedback]").forEach(l=>{l.classList.toggle("active",l===n)}),Qv(e,o),ge("System ready",`Feedback saved. ${s.note}`),oA(o)}async function lA(n){let e=n.getAttribute("data-refinement-prompt")||"";if(e){n.disabled=!0;try{await Co(e)}finally{n.disabled=!1}}}function Ja(n){ji=n==="register"?"register":"login";let e=ji==="register";ef.textContent=e?"CREATE ACCOUNT":"SIGN IN",MM.hidden=!e,Qy.required=e,wp.autocomplete=e?"new-password":"current-password",Ep.textContent=e?"CREATE ACCOUNT":"SIGN IN",ev.textContent=e?"SIGN IN":"CREATE ACCOUNT",tv.hidden=e||!ho,go.textContent=""}function Uf(n){sf.hidden=!n,tf.hidden=n||!!ft,ef.textContent=n?"RESET PASSWORD":ji==="register"?"CREATE ACCOUNT":"SIGN IN",po.textContent="",n&&(gu.value=nf.value.trim(),gu.focus())}function sl(n){ft=n||null,document.dispatchEvent(new CustomEvent("apex:auth",{detail:ft}));let e=!!ft,t=String(ft?.displayName||"GUEST").trim().split(/\s+/)[0];if(wM.textContent=t.slice(0,16).toUpperCase(),tf.hidden=e,sf.hidden=!0,AM.hidden=!e,Bu.hidden=!e,zu.hidden=!e,Hu.hidden=!e,FM.hidden=!e,sv.hidden=!e,ef.textContent=e?"ACCOUNT":ji==="register"?"CREATE ACCOUNT":"SIGN IN",e||(cn(),un(),dn(),en(),hn(),pn(),fn(),ln(),Ua=null),e){CM.textContent=ft.displayName,RM.textContent=ft.email;let i=ho||Yv;Ly.textContent=ft.emailVerified?"VERIFIED":i?"UNVERIFIED":"VERIFICATION OPTIONAL",Ly.classList.toggle("verified",!!ft.emailVerified),yu.hidden=!!ft.emailVerified||!ho,vu.hidden=!!ft.emailVerified||!ho,bu.hidden=!!ft.emailVerified||!ho,HA()}Ci()}function wo(){Qt("account"),cn(),un(),dn(),en(),hn(),pn(),fn(),ln(),wn(),En(),Qp.hidden=!1,Zp.setAttribute("aria-expanded","true"),document.body.classList.add("accountOpen"),sl(ft),ft||nf.focus()}function kn(){Qp.hidden=!0,Zp.setAttribute("aria-expanded","false"),document.body.classList.remove("accountOpen"),go.textContent=""}function ln(){Tf.hidden=!0,Mf.setAttribute("aria-expanded","false"),document.body.classList.remove("trustOpen"),ur="",Qu()}function Ff(n=""){Qt("trust"),ur=n,kn(),cn(),un(),dn(),en(),hn(),pn(),fn(),wn(),En(),Tf.hidden=!1,Mf.setAttribute("aria-expanded","true"),document.body.classList.add("trustOpen"),Qu()}function eb(){try{return JSON.parse(window.localStorage.getItem(zp)||"null")||null}catch{return window.localStorage.removeItem(zp),null}}function tb(){return eb()?.version==="v6.1"}function Qu(){let n=tb();yT.dataset.state=n?"accepted":"pending",vT.textContent=n?"Boundary acknowledged":"Acknowledgement required",bT.textContent=n?"Formal deal reports can run on this device. Professional review and live evidence still apply.":ur==="deal-analysis"?"Accept this boundary to continue with the formal deal report.":"You can chat freely. Deal reports require this boundary to be accepted first.",Lp.textContent=n?"ACKNOWLEDGED":ur==="deal-analysis"?"ACCEPT & ANALYSE":"I UNDERSTAND",Lp.disabled=n&&!ur}function cA(){window.localStorage.setItem(zp,JSON.stringify({version:"v6.1",acceptedAt:new Date().toISOString(),scope:"formal-deal-reports"}));let n=ur;ur="",Qu(),ge("System ready","Trust boundary acknowledged."),n==="deal-analysis"&&(ln(),Qa())}function uA(n){return tb()?!0:(Ff(n),ge("Trust boundary","Acknowledge Apex's role before generating a formal report."),!1)}function dA(n){if(!n)return"";let e=new Date(n);return Number.isNaN(e.getTime())?"":new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(e)}function nb(){let n=eb(),e=n?.version==="v6.1",t=dA(n?.acceptedAt);return{status:e?"accepted":"pending",label:e?"BOUNDARY ACCEPTED":"BOUNDARY PENDING",detail:e?`Accepted ${t||"on this device"}. Apex is decision support only; live proof and professional review still apply.`:"Apex is decision support only. Acknowledge the trust boundary before generating new formal reports.",checks:["Not legal, valuation, tax, banking, or financial-planning advice","Verify completed transactions, achieved rent, financing, title/legal, site, and supply evidence","No validation of false documents, hidden cashback, misleading prices, or lender deception"]}}function hA(){let n=nb();return`
    <section class="analysisTrustStamp ${p(n.status)}" aria-label="Report trust boundary">
      <header><small>V6.2 REPORT TRUST STAMP</small><b>${p(n.label)}</b></header>
      <p>${p(n.detail)}</p>
      <div>${n.checks.map(e=>`<span>${p(e)}</span>`).join("")}</div>
    </section>
  `}function pA(){let n=nb();return["Report trust boundary:",`- ${n.label}: ${n.detail}`,...n.checks.map(e=>`- ${e}`)]}function Aa(n={},e="",t=[]){let i=Number(n.score||0),s=String(n.status||"").toLowerCase();return t.some(o=>e.includes(o))||!i||i<55||/missing|weak|danger|fail|reject/.test(s)?"required":i<75||/watch|review|partial|unknown/.test(s)?"verify":"ready"}function ib(n={}){let e=a=>Array.isArray(a)?a:a?[a]:[],t=[...e(n.hardStops),...e(n.recommendationBlockers),...e(n.missingEvidence),n.counterThesis||""].join(" ").toLowerCase(),i=Number(n.investorReadiness?.score||0),s=[{role:"Lawyer",label:"Title and transaction",status:Aa(n.legalTransactionEvidence,t,["title","caveat","consent","restriction","spa","mot","legal"]),action:"Check title, caveat, restrictions, consent timeline, SPA conditions, outstanding charges, and transaction authority."},{role:"Banker",label:"Financing and valuation",status:Aa(n.financingValuationEvidence,t,["loan","valuation","financing","dsr","bank","cashback","cash out"]),action:"Confirm valuation support, loan margin, DSR, disbursement timing, and that the structure does not mislead the lender."},{role:"Valuer / comparable proof",label:"Entry price evidence",status:Aa(n.transactionComparableEvidence,t,["transaction","comparable","auction","price","value"]),action:"Verify completed subsale and successful auction comparables. Listing prices should not be treated as proof."},{role:"Management / JMB",label:"Site and building quality",status:Aa(n.siteManagementEvidence,t,["management","jmb","lift","leak","defect","resident","site"]),action:"Check arrears, lift waiting time, cleanliness, defect pattern, management response, resident behaviour, and site feel."},{role:"Rental agent / property manager",label:"Achieved rent and tenant demand",status:Aa(n.achievedRentalEvidence,t,["rent","tenant","vacancy","furnishing","rental"]),action:"Verify achieved rent, tenant profile, vacancy pressure, furnishing scope, and whether rent can cover recurring holding cost."},{role:"Owner / licensed adviser",label:"Personal affordability",status:i>=75?"ready":i>=55?"verify":"required",action:"Stress-test cash reserve, instalment comfort, life commitments, tax and transaction costs, renovation budget, and holding period."}],r=s.filter(a=>a.status==="required").length,o=s.filter(a=>a.status==="verify").length;return{status:r?"required":o?"verify":"ready",summary:r?`${r} professional review lane${r===1?"":"s"} need attention before commitment.`:o?`${o} review lane${o===1?"":"s"} should be verified before money moves.`:"Core professional review lanes look ready, subject to live evidence.",items:s}}function fA(n={}){let e=ib(n);return`
    <section class="analysisProfessionalReview ${p(e.status)}" aria-label="Professional review checklist">
      <header><span><small>V6.3 PROFESSIONAL REVIEW</small><b>${p(e.summary)}</b></span></header>
      <div>
        ${e.items.map(t=>`
          <article class="professionalReviewItem ${p(t.status)}">
            <i>${p(t.status)}</i>
            <span><b>${p(t.role)} / ${p(t.label)}</b><small>${p(t.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function mA(n={}){let e=ib(n);return["Professional review checklist:",`- ${e.summary}`,...e.items.map(t=>`- ${t.role} / ${t.label} / ${t.status}: ${t.action}`)]}function qi(n){return Array.isArray(n)?n.filter(Boolean):n?[n]:[]}function gA(n={}){return[...qi(n.hardStops),...qi(n.recommendationBlockers),...qi(n.watchouts),...qi(n.missingEvidence),n.counterThesis,n.challengeMode?.message,n.legalTransactionEvidence?.summary,n.legalTransactionEvidence?.transactionPosition,n.financingValuationEvidence?.summary,n.financingValuationEvidence?.affordabilityPosition,n.siteManagementEvidence?.summary].filter(Boolean).join(" ").toLowerCase()}function bp(n={}){let e=String(n.status||"").toLowerCase(),t=Number(n.score||0);return/unsafe|danger|blocked|fail|reject/.test(e)||t>0&&t<25}function ed(n={}){let e=gA(n),t=[],i=(o,a,l)=>{t.some(c=>c.label===a)||t.push({level:o,label:a,action:l})};/marked.?up|mark.?up|hidden cashback|cashback|cash back|false document|fake document|mislead|lender deception|side agreement|side payment|direct payment|outside stakeholder|bypass/.test(e)&&i("refuse","Misleading financing or fund-flow risk","Apex will not validate artificial pricing, hidden cashback, false documents, side agreements, or lender deception."),(bp(n.legalTransactionEvidence)||/caveat|title risk|seller authority|probate|bankrupt|litigation|restriction|consent|stakeholder/.test(e))&&i("refuse","Legal, title, or seller-authority stop","Pause until the lawyer clears title, caveat, restrictions, seller authority, stakeholder flow, arrears, and completion path."),(bp(n.financingValuationEvidence)||/valuation mismatch|loan rejection|dsr|overleverage|bankability|loan margin/.test(e))&&i("block","Bankability or affordability risk","Do not force the financing. Confirm valuation support, DSR, cash buffer, instalment stress, and clean document readiness."),/bulk purchase|bulk-purchase|many auction|auction cases|investor concentration|airbnb|short.?stay/.test(e)&&i("block","Bulk-purchase or investor-concentration risk","Treat the project as exit-sensitive until ownership mix, auction pressure, resident quality, and rental sustainability are proven."),(bp(n.siteManagementEvidence)||/management dispute|jmb|self interest|leak|defect|resident behaviour|poor management/.test(e))&&i("block","Project quality or management risk","Do not let cheap entry override poor management, defects, resident issues, or weak site evidence."),(String(n.verdict||"").toUpperCase()==="REJECT"||qi(n.hardStops).length)&&i("refuse","Hard stop triggered","Resolve or walk away from hard stops before paying, signing, or committing further capital.");let r=t.filter(o=>o.level==="refuse").length?"refuse":t.length?"block":"clear";return{status:r,label:r==="refuse"?"APEX REFUSES VALIDATION":r==="block"?"VALIDATION BLOCKED":"NO UNSAFE STRUCTURE DETECTED",summary:r==="refuse"?"Apex will not validate this deal as structured. Independent legal, financing, and transaction review must clear the issue first.":r==="block"?"Apex cannot support commitment yet. Clear the blocked compliance or evidence lane before treating the deal as investable.":"No compliance-refusal pattern is detected from the supplied inputs. This is not legal clearance.",flags:t.length?t:[{level:"clear",label:"Boundary still applies",action:"Continue to verify live evidence, professional review, and clean financing or legal structure before committing."}]}}function yA(n={}){let e=ed(n);return`
    <section class="analysisComplianceRefusal ${p(e.status)}" aria-label="Unsafe deal and compliance boundary">
      <header><span><small>V6.4 UNSAFE DEAL BOUNDARY</small><b>${p(e.label)}</b></span></header>
      <p>${p(e.summary)}</p>
      <div>
        ${e.flags.map(t=>`
          <article class="complianceFlag ${p(t.level)}">
            <i>${p(t.level)}</i>
            <span><b>${p(t.label)}</b><small>${p(t.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function vA(n={}){let e=ed(n);return["Unsafe deal boundary:",`- ${e.label}: ${e.summary}`,...e.flags.map(t=>`- ${t.level}: ${t.label}. ${t.action}`)]}function sb(n={}){let e=ed(n),t=Number(n.confidence||0),i=Number(n.averageScore||0),s=!!(ft&&Ua?.plan?.id&&Ua.plan.id!=="free"),r=ft?Ua?.plan?.name||"Signed-in plan":"Guest / public",o=e.status==="refuse"?"blocked":e.status==="block"||t<50||i<55?"conditional":t>=75&&i>=70?"higher":"moderate";return{status:o,label:o==="blocked"?"Do Not Market As Investable":o==="conditional"?"Conditional Public Confidence":o==="higher"?"Higher Confidence, Still Conditional":"Moderate Public Confidence",planName:r,summary:o==="blocked"?"This report should be treated as a refusal or unresolved-risk record, not a sales or investment endorsement.":"Public confidence is limited by evidence quality, hard-stop status, and professional review. Payment status never upgrades a verdict.",items:[{label:"Payment boundary",body:`${s?`${r} unlocks more workflow capacity.`:`${r} access may be limited.`} Plans affect report access, saved history, and usage limits only; they never improve scores or remove hard stops.`},{label:"Confidence source",body:`Confidence is ${t||0}% and decision score is ${i||0}/100 because of supplied evidence, not because of account status or payment.`},{label:"Public use",body:"Do not present this report as guaranteed return, valuation, legal clearance, loan approval, or personalized licensed financial advice."}]}}function bA(n={}){let e=sb(n);return`
    <section class="analysisCommercialGuardrail ${p(e.status)}" aria-label="Public confidence and monetization guardrails">
      <header><span><small>V6.5 PUBLIC CONFIDENCE</small><b>${p(e.label)}</b></span><em>${p(e.planName)}</em></header>
      <p>${p(e.summary)}</p>
      <div>
        ${e.items.map(t=>`
          <article class="commercialGuardrailItem">
            <b>${p(t.label)}</b>
            <small>${p(t.body)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `}function xA(n={}){let e=sb(n);return["Public confidence and monetization guardrails:",`- ${e.label} / ${e.planName}: ${e.summary}`,...e.items.map(t=>`- ${t.label}: ${t.body}`)]}function Ca(n=[],e=/reject|weak|poor|high threat|serious|many|stale|delay|dispute|bad|none|not done|not supplied/i){let t=n.filter(i=>String(i||"").trim());return t.length?t.some(i=>e.test(String(i)))?"watch":"ready":"missing"}function gs(n=[],e="Not supplied"){let t=n.filter(i=>String(i||"").trim());return t.length?t.join(" / "):e}function rb(n={}){let e=n.context?.dealCard||{},t=n.marketIntelligence||{},i=Array.isArray(t.observations)?t.observations:[],s=Array.isArray(t.trends)?t.trends:[],r=t.summary||{},o={project:e.projectName||"Project not specified",area:e.area||"Area not specified",segment:gs([e.propertyType,e.propertyAge?`${e.propertyAge} years`:""],"Segment not supplied"),tenure:gs([e.tenure,e.legalTitleType],"Tenure/title not supplied"),price:gs([e.askingPrice,e.conservativeFairValue?`value ${e.conservativeFairValue}`:""],"Price/value not supplied")},a=[{label:"Owner observations",value:i.length?`${i.length} matched, ${s.length} trend${s.length===1?"":"s"}`:"No matched project memory",status:i.length?"ready":"missing",action:i.length?"Use the observations as project memory, but check dates and source confidence.":"Add dated owner observations for rent, transaction, occupancy, management, supply, auction, or buyer enquiry."},{label:"Supply moat",value:gs([e.supplyRadius,e.substituteCount,e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply]),status:Ca([e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply],/high|serious|many|oversupply|vp|unsold|lift|wait|dense|1\.5k/i),action:"Track closest substitutes within 2.5km, VP timing, unsold stock, layout overlap, and lift/density pressure."},{label:"Management culture",value:gs([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes]),status:Ca([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes],/poor|slow|no reply|arrears|dispute|complaint|bad|leak|defect|arrogant|irresponsible/i),action:"Verify JMB response speed, arrears, resident behaviour, common-area upkeep, defects, and complaint culture."},{label:"Buyer depth",value:gs([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation]),status:Ca([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation],/investor only|weak|poor|narrow|airbnb|short.?stay|none/i),action:"Confirm the project can appeal to own-stay buyers and investors instead of one narrow exit pool."},{label:"Liquidity proof",value:gs([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport]),status:Ca([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport],/none|old|stale|listing|weak|mismatch|not done/i),action:"Use completed subsale transactions, successful auction bids, bankability, and matched comparable adjustments before trusting value."},{label:"Rental defence",value:gs([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal]),status:Ca([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal],/none|weak|stale|vacancy|incentive|seasonal|drop|poor/i),action:"Confirm achieved rent, tenant urgency, furnishing gap, vacancy pressure, and whether rent can defend the instalment."}],l=a.filter(h=>h.status==="missing").length,u=a.filter(h=>h.status==="watch").length?"watch":l>=3?"thin":l?"partial":"tracked",d=e.projectName||e.area||"Development profile";return{status:u,title:d,identity:o,evidence:a,observationCount:i.length,trendCount:s.length,freshness:r.warning||(i.length?"Owner observations matched. Verify freshness before relying on them.":"No dated owner observation matched this project or area yet."),summary:u==="watch"?"Development intelligence has live warning signals. Treat the project profile as a watchlist item until the weak lane is cleared.":u==="tracked"?"Development intelligence is well formed enough for project-level comparison, subject to live verification.":u==="partial"?`Development intelligence is partial. Fill the missing lane${l===1?"":"s"} before treating the project view as mature.`:"Development intelligence is still thin. Apex can screen the deal, but it should not behave like it knows the project deeply yet."}}function _A(n={}){let e=rb(n),t=[["Project",e.identity.project],["Area",e.identity.area],["Segment",e.identity.segment],["Tenure/title",e.identity.tenure],["Price/value",e.identity.price]];return`
    <section class="analysisDevelopmentProfile ${p(e.status)}" aria-label="Development intelligence profile">
      <header>
        <span><small>V7.0 DEVELOPMENT PROFILE</small><b>${p(e.title)}</b></span>
        <em>${p(e.status)}</em>
      </header>
      <p>${p(e.summary)}</p>
      <div class="developmentIdentity">
        ${t.map(([i,s])=>`
          <span><small>${p(i)}</small><b>${p(s)}</b></span>
        `).join("")}
      </div>
      <div class="developmentProfileSignals">
        ${e.evidence.map(i=>`
          <article class="developmentProfileSignal ${p(i.status)}">
            <i>${p(i.status)}</i>
            <span><b>${p(i.label)}</b><small>${p(i.value)}</small><em>${p(i.action)}</em></span>
          </article>
        `).join("")}
      </div>
      <p class="developmentFreshness">${p(e.freshness)}</p>
    </section>
  `}function SA(n={}){let e=rb(n);return["Development intelligence profile:",`- V7.0 ${e.title} / ${e.status}: ${e.summary}`,`- Identity: ${e.identity.project}; ${e.identity.area}; ${e.identity.segment}; ${e.identity.tenure}; ${e.identity.price}.`,`- Freshness: ${e.freshness}`,...e.evidence.map(t=>`- ${t.label} / ${t.status}: ${t.value}. ${t.action}`)]}function wA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.observationHealth||{};return`
    <section class="analysisDevelopmentStack ${p(n.status||"thin")}" aria-label="V7 development intelligence stack">
      <header>
        <span><small>V7.1 - V7.10 DEVELOPMENT INTELLIGENCE</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <div class="developmentStackMeta">
        <span><small>POSTURE</small><b>${p(n.posture||"Build evidence first")}</b></span>
        <span><small>OWNER OBSERVATIONS</small><b>${p(i.matched||0)} matched / ${p(i.fresh||0)} fresh</b></span>
        <span><small>STALE</small><b>${p(i.stale||0)} stale</b></span>
      </div>
      ${e.length?`
        <div class="developmentStackLanes">
          ${e.map(s=>`
            <article class="developmentStackLane ${p(s.status||"watch")}">
              <i>${p(s.version||"V7")}</i>
              <span>
                <b>${p(s.label)} <small>${p(s.score||0)}/100</small></b>
                <small>${p(s.reading)}</small>
                <em>${p(s.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="developmentActionQueue">
          <h3>V7 ACTION QUEUE</h3>
          ${t.map(s=>`
            <p><b>${p(s.version)} ${p(s.label)}</b><span>${p(s.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function EA(n={}){if(!n.summary)return[];let e=["V7 development intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Build evidence first"}.`,`- Owner observations: ${n.observationHealth?.matched||0} matched, ${n.observationHealth?.fresh||0} fresh, ${n.observationHealth?.aging||0} aging, ${n.observationHealth?.stale||0} stale.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V7 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function MA(n={}){if(!n.summary)return"";let e=Array.isArray(n.cases)?n.cases:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[];return`
    <section class="analysisCaseIntelligence ${p(n.status||"thin")}" aria-label="Development case library intelligence">
      <header>
        <span><small>CASE LIBRARY V1</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.posture||"Case-informed, verify live")}</p>
      ${e.length?`
        <div class="caseIntelligenceCards">
          ${e.map(i=>`
            <article class="caseIntelligenceItem ${p(i.verdict||"watch")}">
              <header><span><small>${p([i.area,i.propertyType].filter(Boolean).join(" / ")||"Development case")}</small><b>${p(i.projectName)}</b></span><em>${p(Yf(i.verdict))} / ${p(i.confidence||"medium")}</em></header>
              <p>${p(i.ownerVerdict||i.summary||"No founder verdict recorded.")}</p>
              <div>
                <span><small>STRENGTH</small><b>${p(i.strengths||"Not stated")}</b></span>
                <span><small>WEAKNESS</small><b>${p(i.weaknesses||"Not stated")}</b></span>
                <span><small>SOURCE</small><b>${p(i.sourceBasis||"Owner case note")}</b></span>
              </div>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="caseActionQueue">
          <h3>CASE ACTION QUEUE</h3>
          ${t.map(i=>`<p><b>${p(i.label)}</b><span>${p(i.action)}</span></p>`).join("")}
        </div>
      `:""}
    </section>
  `}function TA(n={}){if(!n.summary)return[];let e=["Development case library:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Case-informed, verify live"}.`];for(let t of n.cases||[])e.push(`- ${t.projectName}: ${Yf(t.verdict)} / ${t.confidence||"medium"} confidence / ${t.rating||0}/100. ${t.ownerVerdict||t.summary||""}`);if(n.actionQueue?.length){e.push("Case action queue:");for(let t of n.actionQueue)e.push(`- ${t.label}: ${t.action}`)}return e}function AA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.matchedEvidence)?n.matchedEvidence:[],i=Array.isArray(n.actionQueue)?n.actionQueue:[],s=n.vaultHealth||{};return`
    <section class="analysisDocumentStack ${p(n.status||"thin")}" aria-label="V8 document intelligence stack">
      <header>
        <span><small>V8.1 - V8.10 DOCUMENT INTELLIGENCE</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <div class="documentStackMeta">
        <span><small>POSTURE</small><b>${p(n.posture||"Evidence-building mode")}</b></span>
        <span><small>VAULT</small><b>${p(s.documents||0)} docs / ${p(s.indexed||0)} indexed</b></span>
        <span><small>MATCHED</small><b>${p(s.matched||0)} docs / ${p(s.mode||"none")}</b></span>
      </div>
      ${e.length?`
        <div class="documentStackLanes">
          ${e.map(r=>`
            <article class="documentStackLane ${p(r.status||"watch")}">
              <i>${p(r.version||"V8")}</i>
              <span>
                <b>${p(r.label)} <small>${p(r.score||0)}/100</small></b>
                <small>${p(r.reading)}</small>
                <em>${p(r.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="documentMatchedEvidence">
          <h3>MATCHED OWNER EVIDENCE</h3>
          ${t.map(r=>`
            <p><b>${p(r.title)}</b><span>${p(r.preview)}</span><em>${p((r.tags||[]).join(", ")||"untagged")}</em></p>
          `).join("")}
        </div>
      `:""}
      ${i.length?`
        <div class="documentActionQueue">
          <h3>V8 ACTION QUEUE</h3>
          ${i.map(r=>`
            <p><b>${p(r.version)} ${p(r.label)}</b><span>${p(r.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function CA(n={}){if(!n.summary)return[];let e=["V8 document intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Evidence-building mode"}.`,`- Vault: ${n.vaultHealth?.documents||0} documents, ${n.vaultHealth?.indexed||0} indexed, ${n.vaultHealth?.matched||0} matched, ${n.vaultHealth?.mode||"none"} retrieval.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.matchedEvidence?.length){e.push("Matched owner evidence:");for(let t of n.matchedEvidence)e.push(`- ${t.title}: ${t.preview}`)}if(n.actionQueue?.length){e.push("V8 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function RA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.capitalMap||{};return`
    <section class="analysisPortfolioCommand ${p(n.status||"hold")}" aria-label="V9 portfolio command stack">
      <header>
        <span><small>V9.1 - V9.10 PORTFOLIO COMMAND</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <div class="portfolioCommandMeta">
        <span><small>POSTURE</small><b>${p(n.posture||"Hold and verify")}</b></span>
        <span><small>NEXT MOVE</small><b>${p(n.nextMove||"Clear weakest lane")}</b></span>
        <span><small>ROLE</small><b>${p(i.portfolioRole||"Not stated")}</b></span>
      </div>
      <div class="portfolioCapitalMap">
        <span><small>CASH</small><b>${p(i.cashAvailable||"Not stated")}</b></span>
        <span><small>OUTLAY</small><b>${p(i.cashOutlay||"Not stated")}</b></span>
        <span><small>AFTER PURCHASE</small><b>${p(i.cashAfterPurchase||"Not calculated")}</b></span>
        <span><small>DSR</small><b>${p(i.postDealDsr||"Not calculated")}</b></span>
        <span><small>HOLDING</small><b>${p(i.holdingCashFlow||"Not calculated")}</b></span>
        <span><small>STRESS</small><b>${p(i.stressedHolding||"Not calculated")}</b></span>
      </div>
      ${e.length?`
        <div class="portfolioCommandLanes">
          ${e.map(s=>`
            <article class="portfolioCommandLane ${p(s.status||"watch")}">
              <i>${p(s.version||"V9")}</i>
              <span>
                <b>${p(s.label)} <small>${p(s.score||0)}/100</small></b>
                <small>${p(s.reading)}</small>
                <em>${p(s.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="portfolioCommandQueue">
          <h3>V9 ACTION QUEUE</h3>
          ${t.map(s=>`
            <p><b>${p(s.version)} ${p(s.label)}</b><span>${p(s.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function IA(n={}){if(!n.summary)return[];let e=n.capitalMap||{},t=["V9 portfolio command stack:",`- ${n.status||"hold"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Hold and verify"}.`,`- Next move: ${n.nextMove||"Clear the weakest portfolio lane."}`,`- Capital map: cash ${e.cashAvailable||"n/a"}, outlay ${e.cashOutlay||"n/a"}, after purchase ${e.cashAfterPurchase||"n/a"}, reserve ${e.reserveMonths||"n/a"}, DSR ${e.postDealDsr||"n/a"}, holding ${e.holdingCashFlow||"n/a"}, stress ${e.stressedHolding||"n/a"}.`];for(let i of n.lanes||[])t.push(`- ${i.version} ${i.label}: ${i.status}, ${i.score}/100. ${i.reading} Action: ${i.action}`);if(n.actionQueue?.length){t.push("V9 action queue:");for(let i of n.actionQueue)t.push(`- ${i.version} ${i.label}: ${i.action}`)}return t}function PA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=Array.isArray(n.contradictions)?n.contradictions:[];return`
    <section class="analysisFinalCommand ${p(n.status||"investigate")}" aria-label="V10 final command stack">
      <header>
        <span><small>V10.1 - V10.10 FINAL COMMAND</small><b>${p(n.headline||n.command||"Final command")}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <div class="finalCommandDecision">
        <strong>${p(n.command||"INVESTIGATE FIRST")}</strong>
        <p>${p(n.finalAnswer||n.summary)}</p>
      </div>
      <div class="finalCommandMeta">
        <span><small>STATUS</small><b>${p(n.status||"investigate")}</b></span>
        <span><small>NEXT MOVE</small><b>${p(n.nextMove||"Clear weakest lane")}</b></span>
        <span><small>CONTRADICTIONS</small><b>${p(n.contradictionCount||0)}</b></span>
      </div>
      ${i.length?`
        <div class="finalCommandContradictions">
          <h3>CONTRADICTION SCAN</h3>
          ${i.map(s=>`<p>${p(s)}</p>`).join("")}
        </div>
      `:""}
      ${e.length?`
        <div class="finalCommandLanes">
          ${e.map(s=>`
            <article class="finalCommandLane ${p(s.status||"watch")}">
              <i>${p(s.version||"V10")}</i>
              <span>
                <b>${p(s.label)} <small>${p(s.score||0)}/100</small></b>
                <small>${p(s.reading)}</small>
                <em>${p(s.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="finalCommandQueue">
          <h3>V10 ACTION QUEUE</h3>
          ${t.map(s=>`
            <p><b>${p(s.version)} ${p(s.label)}</b><span>${p(s.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function LA(n={}){if(!n.summary)return[];let e=["V10 final command stack:",`- ${n.command||"INVESTIGATE FIRST"} (${n.score||0}/100): ${n.summary}`,`- Status: ${n.status||"investigate"}.`,`- Next move: ${n.nextMove||"Clear the weakest V10 lane."}`,`- Contradictions: ${n.contradictionCount||0}.`];for(let t of n.contradictions||[])e.push(`- Contradiction: ${t}`);for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V10 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function Wy(n){return n==="memory"?"MEMORY":n==="journal"?"JOURNAL":n==="market"?"MARKET":n==="case"?"CASE":n==="saved_report"?"SAVED DEAL":n==="belief"?"BELIEF":n==="decision"?"DECISION":n==="evidence"?"EVIDENCE":n==="research"?"VERIFIED RESEARCH":"REFERENCE"}function ob(n=[]){if(!n.length)return"";let e=n.reduce((o,a)=>{let l=a?.type||"reference";return o[l]=(o[l]||0)+1,o},{}),t=Object.entries(e).map(([o,a])=>`${a} ${Wy(o).toLowerCase()}${a===1?"":" sources"}`).slice(0,5).join(" / "),s=n.some(o=>["evidence","market","case","research","saved_report"].includes(o.type))?"Deal-specific or dated evidence matched. Confirm its date, scope, and fit before acting.":"Framework guidance only. No deal-specific market evidence matched this answer.",r=n.slice(0,8).map(o=>`
    <li>
      <span class="sourceType">${p(Wy(o.type))}</span>
      <b>${p(o.title||"Untitled source")}</b>
      ${o.preview?`<small>${p(o.preview)}</small>`:""}
    </li>
  `).join("");return`
    <div class="sourceSummary">
      <p><b>Reasoning basis</b><span>${p(t)}</span></p>
      <p><b>Evidence level</b><span>${p(s)}</span></p>
      <details>
        <summary>See the sources used</summary>
        <ul class="sourceList">${r}</ul>
      </details>
    </div>
  `}function NA(n={}){if(!n||typeof n!="object")return"";let e=Array.isArray(n.prompts)?n.prompts.slice(0,4):[],t=Array.isArray(n.missing)?n.missing.slice(0,4):[];return!e.length&&!t.length?"":`
    <section class="contextCoach">
      <header>
        <span><small>${p(n.title||"NEXT MOVES")}</small><b>${p(n.summary||"Choose the next question to sharpen the decision.")}</b></span>
      </header>
      ${t.length?`<p><b>Missing</b><span>${p(t.join(", "))}</span></p>`:""}
      ${e.length?`
        <div>
          ${e.map(i=>`
            <button type="button" data-coach-prompt="${p(i.text)}">
              <small>${p(i.kind||"question")}</small>
              <span>${p(i.label)}</span>
            </button>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function DA(n){let t=String(n||"").replace(/^#{1,6}\s*/,"").replace(/^\*{1,2}|\*{1,2}$/g,"").replace(/:$/,"").trim().toLowerCase();return[[/^current view(?:\b|\s*[—-])/,"Current view"],[/^(what supports it|what drives it|reasons|why)$/,"What supports it"],[/^(strongest counter-case|counter-case|what could make it wrong|watch-outs)$/,"Strongest counter-case"],[/^(what would change my mind|what would change the view|evidence gaps|missing evidence)$/,"What would change the view"],[/^(next best move|next move|check next|next steps?)$/,"Next best move"],[/^(questions? for you|my challenge back|questions? that can change the answer)$/,"Questions for you"],[/^(blind spot|alternative angle|blind spot \/ alternative angle|what you may be missing)$/,"Blind spot / alternative angle"]].find(([s])=>s.test(t))?.[1]||""}function OA(n,e=!1){let t=[],i=null,s=()=>{i?.items.length&&t.push(i),i=null};for(let o of n){let a=String(o||"").replace(/\*\*/g,"").trim();if(!a){s();continue}let l=a.match(/^[-*•]\s+(.+)/),c=a.match(/^\d+[.)]\s+(.+)/),u=c?"ol":l?"ul":"p",d=c?.[1]||l?.[1]||a;(!i||i.type!==u)&&(s(),i={type:u,items:[]}),i.items.push(d)}s();let r=!1;return t.map(o=>o.type==="ul"||o.type==="ol"?`<${o.type}>${o.items.map(a=>`<li>${p(a)}</li>`).join("")}</${o.type}>`:o.items.map(a=>{let l=e&&!r?' class="answerLead"':"";return r=!0,`<p${l}>${p(a)}</p>`}).join("")).join("")}function kA(n){let e=String(n||"").replace(/\r\n/g,`
`).trim().split(`
`),t=[],i={title:"",lines:[]},s=()=>{(i.title||i.lines.some(r=>r.trim()))&&t.push(i),i={title:"",lines:[]}};for(let r of e){let o=DA(r);o?(s(),i.title=o):i.lines.push(r)}return s(),t.map((r,o)=>{let a=OA(r.lines,o===0&&!r.title);return r.title?`<section class="answerSection"><h3>${p(r.title)}</h3>${a}</section>`:`<div class="answerBody">${a}</div>`}).join("")}function ab({mode:n="",provider:e="",model:t=""}={}){return n==="framework"?'<span class="intelligenceBadge framework" title="No external reasoning model generated this response"><i></i>FRAMEWORK ONLY</span>':n!=="llm"?"":'<span class="intelligenceBadge reasoning" title="External AI reasoning was used for this response"><i></i>FRAMEWORK + AI</span>'}function _s(n,e,t=[],i={}){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=n==="jarvis"?i?.message?.id||i?.id||`local-${Date.now()}-${Math.random().toString(16).slice(2)}`:"";s.className=`message ${n}`,s.innerHTML=`
    <strong>${n==="jarvis"?"APEX":"YOU"}</strong>
    ${n==="jarvis"?ab(i):""}
    <div class="messageText">${n==="jarvis"?kA(e):p(e).replace(/\n/g,"<br>")}</div>
    ${n==="jarvis"?ob(t):""}
    ${n==="jarvis"?NA(i.contextCoach):""}
    ${n==="jarvis"?iA(r):""}
  `;let o=s.querySelector(".contextCoach");if(o){let a=document.createElement("details");a.className="response-detail",a.innerHTML="<summary>Context and suggested checks</summary>",o.replaceWith(a),a.append(o)}Vt.append(s),n==="jarvis"&&rA(s),Vt.scrollTop=Vt.scrollHeight}function co(n,e){if(!e)return"";let t=Array.isArray(e)?e.filter(Boolean).slice(0,2).join("; "):e;return t?`<span><small>${p(n)}</small><b>${p(t)}</b></span>`:""}function UA(n={}){let e=Number(n.approvedCount||0);NM.textContent=e?`${n.investorType||"Profile building"} / ${n.riskStyle||"Needs more memory"}`:"No approved memory yet",DM.textContent=`${Math.max(0,Math.min(100,Number(n.completeness||0)))}%`,OM.textContent=n.summary||"Approve memories to build a private investor profile.",kM.innerHTML=e?[co("Preferred",n.preferredAssets),co("Avoid",n.avoidedRisks),co("Cash flow",n.cashFlowRule),co("Holding",n.holdingPeriod),co("Rules",n.investmentRules),co("Warnings",n.personalWarnings)].filter(Boolean).join(""):""}function FA(n){let e=n.status==="pending";return`
    <article class="memoryItem ${e?"pending":"approved"} priority-${p(n.reviewPriority||"normal")}" data-memory-item="${p(n.id)}">
      <span><small>${p(n.categoryLabel||n.category)}</small><i>${e?"REVIEW":"APPROVED"}</i></span>
      <p>${p(n.content)}</p>
      <em>${p(n.profileImpact||"Useful context, but review before using it.")}</em>
      <div class="memoryActions">
        ${e?`
          <button type="button" data-memory-action="approve" data-memory-id="${p(n.id)}">KEEP</button>
          <button type="button" data-memory-action="dismiss" data-memory-id="${p(n.id)}">SKIP</button>
        `:`<button type="button" data-memory-action="delete" data-memory-id="${p(n.id)}">FORGET</button>`}
      </div>
    </article>
  `}function Bf(n={}){let e=!!n.captureEnabled,t=!!n.reasoningEnabled,i=n.answerStyle||{};Wp=!0,Na.checked=e,Da.checked=t,Wp=!1;let s=e||t?`Memory ${e?"can suggest items from chat":"will not suggest from chat"}; approved memory ${t?"can guide replies and reports":"will not guide reasoning"}.`:"Memory engine ready. Collection is off.",r=i.feedbackCount?` Answer style memory: ${i.latestLabel||"Learning"} (${i.feedbackCount} saved).`:"";Dy.textContent=`${s}${r}`,Dy.classList.toggle("active",e||t)}function BA(n={}){let e=Array.isArray(n.items)?n.items:[];Bf(n.settings||n.summary||{}),UA(n.profile||{}),PM.textContent=String(n.summary?.approved||0),LM.textContent=String(n.summary?.pending||0),xu.innerHTML=e.length?e.slice().sort((t,i)=>{let s={pending:0,approved:1};return s[t.status]-s[i.status]||String(i.updatedAt).localeCompare(String(t.updatedAt))}).map(FA).join(""):'<p class="memoryEmpty">No long-term memories yet. Auto-capture is off until you enable it, or you can add one manually above.</p>'}async function td(){let n=await ze("/api/memory");return BA(n),n}function cn(){_o.hidden=!0,Bu.setAttribute("aria-expanded","false"),document.body.classList.remove("memoryOpen")}async function lb(){if(Qt("memory"),!ft)return wo();kn(),un(),dn(),en(),hn(),pn(),fn(),ln(),wn(),En(),_o.hidden=!1,Bu.setAttribute("aria-expanded","true"),document.body.classList.add("memoryOpen"),xu.innerHTML='<p class="memoryEmpty">Loading private memory...</p>';try{await td()}catch(n){xu.innerHTML=`<p class="memoryEmpty">${p(n.message)}</p>`}}async function VA(n,e){return e==="delete"?(await ze(`/api/memory/${encodeURIComponent(n)}`,{method:"DELETE"}),null):ze(`/api/memory/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:e})})}async function cb(){if(!Wp){Na.disabled=!0,Da.disabled=!0;try{let n=await ze("/api/memory/settings",{method:"PATCH",body:JSON.stringify({captureEnabled:Na.checked,reasoningEnabled:Da.checked})});Bf(n.settings||{}),ge("System ready","Memory settings updated.")}catch(n){ge("Connection issue",n.message||"Memory settings could not be updated."),_o.hidden||await td().catch(()=>{})}finally{Na.disabled=!1,Da.disabled=!1}}}async function $A(n){let e=n.getAttribute("data-memory-id"),t=n.getAttribute("data-memory-action");if(!(!e||!t)){n.disabled=!0;try{await VA(e,t),document.querySelectorAll(`[data-memory-item="${CSS.escape(e)}"]`).forEach(i=>i.remove()),_o.hidden||await td(),ge("System ready",t==="approve"?"Memory approved.":t==="delete"?"Memory forgotten.":"Memory skipped.")}catch(i){ge("Connection issue",i.message||"Memory could not be updated."),n.disabled=!1}}}function zA(n){if(!n?.id)return;let e=document.createElement("article");e.className="memorySuggestion",e.setAttribute("data-memory-item",n.id),e.innerHTML=`
    <span><small>${p(n.categoryLabel||"LONG-TERM MEMORY")}</small><b>Remember this?</b></span>
    <p>${p(n.content)}</p>
    <em>${p(n.profileImpact||"Review this before it becomes part of your private profile.")}</em>
    <div class="memoryActions">
      <button type="button" data-memory-action="approve" data-memory-id="${p(n.id)}">KEEP</button>
      <button type="button" data-memory-action="dismiss" data-memory-id="${p(n.id)}">SKIP</button>
    </div>
  `,Vt.append(e),Vt.scrollTop=Vt.scrollHeight}function nd(n){if(!n)return;Ua=n,BM.textContent=n.plan.name.toUpperCase(),VM.textContent=`${n.usage.remaining} reports remaining this month`;let t=Ru.filter(i=>i.id!=="free"&&i.id!==n.plan.id).filter(i=>i.checkoutAvailable);$u.innerHTML=t.length?t.map(i=>`<button type="button" data-checkout-plan="${p(i.id)}">${p(i.name.toUpperCase())} / RM${p(i.priceRm)}</button>`).join(""):"<small>UPGRADES READY AFTER CHECKOUT CONFIGURATION</small>",HM.textContent=`${n.plan.name.toUpperCase()} / ${n.usage.remaining} LEFT`,sv.textContent=`${n.plan.name} controls report access, storage, and usage limits only. It never changes scores, hard stops, or recommendations.`}async function HA(){if(!ft)return null;try{let[n,e]=await Promise.all([ze("/api/billing/plans"),ze("/api/billing/status")]);return Ru=n.plans||[],nd(e),e}catch{return $u.innerHTML="<small>PLAN STATUS UNAVAILABLE</small>",null}}async function GA(n){let e=$u.querySelector(`[data-checkout-plan="${CSS.escape(n)}"]`);e&&(e.disabled=!0);try{let t=await ze("/api/billing/checkout",{method:"POST",body:JSON.stringify({plan:n})});window.location.assign(t.checkoutUrl)}catch(t){ge("Connection issue",t.message||"Checkout is not available yet."),e&&(e.disabled=!1)}}function WA(n){let e=n.weakestDimension,t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="reportHistoryItem" data-report-item="${p(n.id)}">
      <header><span><small>${p(n.verdict)} / ${p(t)}</small><b>${p(n.subject)}</b></span><em>${p(n.averageScore)}/100</em></header>
      <p>${e?`Weak link: ${p(e.label)} (${p(e.score)}/100)`:"Evidence details unavailable"}</p>
      <div class="reportHistoryActions">
        <button type="button" data-report-action="view" data-report-id="${p(n.id)}">VIEW</button>
        <button type="button" data-report-action="delete" data-report-id="${p(n.id)}">DELETE</button>
      </div>
    </article>
  `}function ub(n={}){document.querySelector("#savedReportView").hidden=!0,dr.hidden=!1;let e=Array.isArray(n.reports)?n.reports:[];zM.textContent=String(e.length),dr.innerHTML=e.length?e.map(WA).join(""):'<p class="reportsEmpty">No saved deal reports yet. Signed-in analyses will appear here automatically.</p>',n.billing&&nd(n.billing)}function un(){of.hidden=!0,zu.setAttribute("aria-expanded","false"),document.body.classList.remove("reportsOpen")}async function Vf(){if(Qt("reports"),!ft)return wo();kn(),cn(),dn(),en(),hn(),pn(),fn(),ln(),wn(),En(),of.hidden=!1,zu.setAttribute("aria-expanded","true"),document.body.classList.add("reportsOpen"),dr.innerHTML='<p class="reportsEmpty">Loading private reports...</p>';try{ub(await ze("/api/reports"))}catch(n){dr.innerHTML=`<p class="reportsEmpty">${p(n.message)}</p>`}}async function qA(n){let e=n.getAttribute("data-report-id"),t=n.getAttribute("data-report-action");if(!(!e||!t||Sn)){Wt(!0),n.disabled=!0;try{if(t==="delete"){await ze(`/api/reports/${encodeURIComponent(e)}`,{method:"DELETE"}),ub(await ze("/api/reports"));return}let i=await ze(`/api/reports/${encodeURIComponent(e)}`),s=document.querySelector("#savedReportView");dr.hidden=!0,s.hidden=!1,s.innerHTML='<button type="button" data-report-back>Back to saved reports</button>',i.report.analysis.savedReportId=i.report.id,Zf(i.report.analysis,[],{},s),nd(i.billing),ge("System ready",`${i.report.subject} report loaded.`)}catch(i){ge("Connection issue",i.message||"The saved report is unavailable."),n.disabled=!1}finally{n.disabled=!1,Wt(!1)}}}function jA(n){let e=n.reviewed?"REVIEWED":n.locked?"LOCKED":"DRAFT",t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="journalItem ${p(e.toLowerCase())}" data-journal-item="${p(n.id)}">
      <header><span><small>${p(e)} / ${p(t)}</small><b>${p(n.subject)}</b></span><em>${p(n.decision)}</em></header>
      <p>${p(n.skillSignal)}</p>
      <div class="journalItemMeta"><span>REPORT ${p(n.snapshotScore)}/100</span><span>CONFIDENCE ${p(n.confidence)}%</span></div>
      <button type="button" data-journal-action="open" data-journal-id="${p(n.id)}">${n.locked?"REVIEW":"EDIT DRAFT"}</button>
    </article>
  `}function XA(n={}){let e=Array.isArray(n.decisions)?n.decisions:[];WM.textContent=String(n.summary?.total||0),qM.textContent=String(n.summary?.reviewed||0),yo.innerHTML=e.length?e.map(jA).join(""):'<p class="journalEmpty">No decisions recorded yet. Open a saved Deal Report and choose RECORD DECISION.</p>',rv.hidden=!1,yo.hidden=!1,Ap.hidden=!0}function dn(){af.hidden=!0,Hu.setAttribute("aria-expanded","false"),document.body.classList.remove("journalOpen")}async function $f(){let n=await ze("/api/journal");return XA(n),n}async function id(n=""){if(Qt("journal"),!ft)return wo();kn(),cn(),un(),en(),hn(),pn(),fn(),ln(),wn(),En(),af.hidden=!1,Hu.setAttribute("aria-expanded","true"),document.body.classList.add("journalOpen"),yo.innerHTML='<p class="journalEmpty">Loading private decisions...</p>';try{await $f(),n&&await db(n)}catch(e){yo.innerHTML=`<p class="journalEmpty">${p(e.message)}</p>`}}function YA(n){for(let e of[lf,cf,uf,df,hf,pf,ff])e.disabled=n}function sd(n){let e=!!n.lockedAt;el.value=n.id,XM.textContent=n.subject,lf.value=n.prePurchase.decision,cf.value=n.prePurchase.confidence,uf.value=n.prePurchase.holdingPeriod,df.value=n.prePurchase.thesis,hf.value=n.prePurchase.counterThesis,pf.value=n.prePurchase.killCriterion,ff.value=n.prePurchase.notes,ov.value=n.outcome.status==="not_reviewed"?"holding":n.outcome.status,av.value=n.outcome.actualRent,lv.value=n.outcome.currentValue,cv.value=n.outcome.processScore,uv.value=n.outcome.executionScore,dv.value=n.outcome.outcomeScore,hv.value=n.outcome.luckScore,pv.value=n.outcome.result,fv.value=n.outcome.lesson,YA(e),YM.hidden=e,xi.dataset.confirming="false",xi.textContent="LOCK THESIS",ZM.hidden=!e,QM.hidden=!e,Dn.textContent=n.outcome.reviewedAt?`Review saved. ${n.outcome.reviewedAt.slice(0,10)}.`:"",rv.hidden=!0,yo.hidden=!0,Ap.hidden=!1,Ap.scrollTop=0}async function db(n){let e=await ze(`/api/journal/${encodeURIComponent(n)}`);return sd(e.decision),e.decision}function hb(){return{action:"update",decision:lf.value,confidence:cf.value,holdingPeriod:uf.value,thesis:df.value,counterThesis:hf.value,killCriterion:pf.value,notes:ff.value}}async function KA(){let n=el.value;Dn.textContent="Saving draft...";try{let e=await ze(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(hb())});sd(e.decision),Dn.textContent="Draft saved."}catch(e){Dn.textContent=e.message,xi.textContent="LOCK THESIS"}}async function JA(){let n=el.value;Dn.textContent="Locking the pre-purchase record...";try{await ze(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(hb())});let e=await ze(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"lock"})});sd(e.decision),Dn.textContent="Thesis locked. Future reviews cannot rewrite it."}catch(e){Dn.textContent=e.message,xi.textContent="LOCK THESIS"}}function ZA(){if(xi.dataset.confirming!=="true"){xi.dataset.confirming="true",xi.textContent="CONFIRM LOCK",Dn.textContent="Locking is permanent. Press CONFIRM LOCK to preserve this thesis unchanged.";return}xi.dataset.confirming="false",xi.textContent="LOCKING...",JA()}async function QA(){let n=el.value;Dn.textContent="Saving outcome review...";try{let e=await ze(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"review",outcomeStatus:ov.value,actualRent:av.value,currentValue:lv.value,processScore:cv.value,executionScore:uv.value,outcomeScore:dv.value,luckScore:hv.value,result:pv.value,lesson:fv.value})});sd(e.decision),Dn.textContent=e.summary.skillSignal}catch(e){Dn.textContent=e.message}}async function eC(){let n=el.value;Dn.textContent="Deleting draft...";try{await ze(`/api/journal/${encodeURIComponent(n)}`,{method:"DELETE"}),await $f(),ge("System ready","Decision draft deleted.")}catch(e){Dn.textContent=e.message}}async function pb(n){if(!ft)return ge("System ready","Sign in to preserve a private decision record."),wo();if(!n?.savedReportId){ge("System ready","Open a saved Deal Report before recording the decision.");return}try{let e=await ze("/api/journal",{method:"POST",body:JSON.stringify({reportId:n.savedReportId})});await id(e.decision.id)}catch(e){ge("Connection issue",e.message||"The decision record could not be created.")}}function zf(){try{let n=JSON.parse(window.localStorage.getItem(qp())||"[]");return Array.isArray(n)?n.slice(0,4):[]}catch{return window.localStorage.removeItem(qp()),[]}}function rd(n){let e=n.slice(0,4);return window.localStorage.setItem(qp(),JSON.stringify(e)),ju.textContent=e.length?`SHORTLIST ${e.length}`:"SHORTLIST",e}function qp(){return ft?`${Gy}:${ft.id}`:Gy}function Eo(n){let e=n?.context?.dealCard||{};return e.projectName||e.area||"Untitled deal"}function Hf(n){return[...n.dimensions||[]].sort((e,t)=>Number(e.score||0)-Number(t.score||0))[0]||null}function Lu(n){return[...n.hardStops||[],...n.recommendationBlockers||[]].filter(Boolean)}function fu(n){let e=Lu(n).length*18,t=["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?24:0,i=Hf(n),s=i&&Number(i.score||0)<55?10:0;return Math.max(0,Number(n.averageScore||0)-e-t-s)}function tC(n){if(!n.length)return"";let e=n.slice().sort((o,a)=>fu(a)-fu(o)),t=e.filter(o=>!Lu(o).length&&!["REJECT","PAUSE"].includes(String(o.verdict||"").toUpperCase())),i=t[0]||e[0],s=n.filter(o=>Lu(o).length||["REJECT","PAUSE"].includes(String(o.verdict||"").toUpperCase())).length,r=Hf(i);return`
    <section class="shortlistCompare">
      <span><small>APEX COMPARISON</small><b>${p(t.length?"Cleanest current pick":"No clean pick yet")}</b></span>
      <strong>${p(i.subject)}</strong>
      <div>
        <em>${p(fu(i))} adjusted</em>
        <em>${p(s)} blocked</em>
        <em>${p(r?`${r.label}: ${r.score}`:"weak link: n/a")}</em>
      </div>
      <p>${p(t.length?"Compare the adjusted score, then check the weak link before choosing.":"Clear hard stops and decision blockers before treating any shortlisted deal as a contender.")}</p>
    </section>
  `}function nC(n){let e=(n.dimensions||[]).map(l=>`
    <span class="shortlistDimension ${p(l.status)}">
      <small>${p(l.label)}</small><b>${p(l.score)}</b>
    </span>
  `).join(""),t=Hf(n),i=Lu(n),s=n.investorReadiness?.label||"Readiness unknown",r=n.decisionFocus?.body||n.summary||"No decision focus recorded.",o=n.learningLoop?.signals?.length||0;return`
    <article class="shortlistItem ${i.length||["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?"blocked":"clean"}" data-shortlist-item="${p(n.id)}">
      <header><span><small>${p(n.verdict)} / ${p(s)}</small><b>${p(n.subject)}</b></span><em>${p(fu(n))} adj</em></header>
      <div class="shortlistDimensions">${e}</div>
      <p><b>Weak link</b> ${p(t?`${t.label} (${t.score}/100)`:"Evidence not available")}</p>
      <p><b>Decision focus</b> ${p(r)}</p>
      <div class="shortlistSignals">
        <span>${p(i.length)} blocker${i.length===1?"":"s"}</span>
        <span>${p(o)} learning signal${o===1?"":"s"}</span>
        <span>${p(n.confidence||0)}% confidence</span>
      </div>
      <div class="shortlistActions">
        <button type="button" data-shortlist-action="load" data-shortlist-id="${p(n.id)}">LOAD DEAL</button>
        <button type="button" data-shortlist-action="remove" data-shortlist-id="${p(n.id)}">REMOVE</button>
      </div>
    </article>
  `}function rl(){let n=zf();rd(n),KT.innerHTML=tC(n),zv.innerHTML=n.length?n.map(nC).join(""):'<p class="shortlistEmpty">No analysed deals saved yet. Run an analysis, then choose SAVE TO SHORTLIST.</p>',Hv.hidden=!n.length,Ci()}function wn(){Nf.hidden=!0,ju.setAttribute("aria-expanded","false"),document.body.classList.remove("shortlistOpen")}function Gf(){Qt("shortlist"),kn(),cn(),un(),dn(),en(),hn(),pn(),fn(),ln(),En(),rl(),Nf.hidden=!1,ju.setAttribute("aria-expanded","true"),document.body.classList.add("shortlistOpen")}function fb(n){let e=n?.context?.dealCard||{},t=Eo(n),i=`${t}|${e.askingPrice||""}`.toLowerCase().replace(/[^a-z0-9|]+/g,"-"),s={id:i,subject:t,savedAt:new Date().toISOString(),verdict:n.verdict,summary:n.summary,averageScore:n.averageScore,confidence:n.confidence,dimensions:n.dimensions||[],metrics:n.metrics||[],scenarios:n.scenarios||[],stressEnvelope:n.stressEnvelope||null,acquisitionCostEstimate:n.acquisitionCostEstimate||null,portfolioGate:n.portfolioGate||null,marketPulse:n.marketPulse||null,holdExitPlan:n.holdExitPlan||null,decisionSeal:n.decisionSeal||null,siteVisitAssistant:n.siteVisitAssistant||null,sourcingProfessional:n.sourcingProfessional||null,tenantRentalPlan:n.tenantRentalPlan||null,exitStrategy:n.exitStrategy||null,hardStops:n.hardStops||[],recommendationBlockers:n.recommendationBlockers||[],decisionFocus:n.decisionFocus||null,personalizedChallenge:n.personalizedChallenge||null,dealMemoryComparison:n.dealMemoryComparison||null,beliefTracker:n.beliefTracker||null,sourceTransparency:n.sourceTransparency||null,memoryConflicts:n.memoryConflicts||null,personalOperatingRules:n.personalOperatingRules||null,investorReadiness:n.investorReadiness||null,productExperience:n.productExperience||null,learningLoop:n.learningLoop||null,evidenceEngine:n.evidenceEngine||null,transactionComparableEvidence:n.transactionComparableEvidence||null,achievedRentalEvidence:n.achievedRentalEvidence||null,financingValuationEvidence:n.financingValuationEvidence||null,supplyAbsorptionEvidence:n.supplyAbsorptionEvidence||null,siteManagementEvidence:n.siteManagementEvidence||null,legalTransactionEvidence:n.legalTransactionEvidence||null,developmentIntelligence:n.developmentIntelligence||null,caseIntelligence:n.caseIntelligence||null,documentIntelligence:n.documentIntelligence||null,portfolioCommand:n.portfolioCommand||null,finalCommand:n.finalCommand||null,residentialDcf:n.residentialDcf||null,marketIntelligence:n.marketIntelligence||null,counterThesis:n.counterThesis,context:n.context||{}},r=zf().filter(o=>o.id!==i);return rd([s,...r]),s}function iC(n){let e=n?.context?.dealCard||{},t=n?.context?.financialProfile||{};for(let s of Ss){let r=s.getAttribute("data-deal-field");s.value=e[r]||""}for(let s of fr){let r=s.getAttribute("data-profile-field");s.value=t[r]||""}ku(Ss,"data-deal-field",Df),ku(fr,"data-profile-field",Of),wn();let i=wi.find(s=>s.getAttribute("data-context-toggle")==="deal");i&&Ei(i,!0),ge("System ready",`${n.subject} loaded for review.`)}function sC(n){let e=n.getAttribute("data-shortlist-id"),t=n.getAttribute("data-shortlist-action"),i=zf();if(t==="remove"){rd(i.filter(s=>s.id!==e)),rl();return}if(t==="load"){let s=i.find(r=>r.id===e);s&&iC(s)}}function rC(n){if(n){mo?.classList.remove("printTarget"),mo=n,mo.classList.add("printTarget"),document.body.classList.add("printMode");for(let e of n.querySelectorAll("details"))e.dataset.printWasOpen=String(e.open),e.open=!0;window.print()}}function oC(n){let e=["APEX ANALYTIC DEAL REPORT",Eo(n),"",`Verdict: ${n.verdict||"INVESTIGATE"}`,`Confidence: ${n.confidence||0}%`,`Score: ${n.averageScore||0}/100`,`Reasoning: ${n.reasoningMode||"Framework only"}`,"",...pA(),"",...vA(n),"",...mA(n),"",...xA(n),"",...SA(n),"",...EA(n.developmentIntelligence),"",...TA(n.caseIntelligence),"",...CA(n.documentIntelligence),"",...IA(n.portfolioCommand),"",...LA(n.finalCommand),"",`Summary: ${n.summary||""}`];if(n.decisionFocus?.body&&e.push("",`${n.decisionFocus.label||"Decision focus"}: ${n.decisionFocus.body}`),n.residentialDcf&&e.push("",...VR(n.residentialDcf)),n.investorReadiness?.label){e.push("",`Investor readiness: ${n.investorReadiness.label} (${n.investorReadiness.score||0}/100)`),n.investorReadiness.summary&&e.push(n.investorReadiness.summary);for(let t of n.investorReadiness.flags||[])e.push(`- ${t}`)}if(n.productExperience?.summary){e.push("","V5 product experience",`${n.productExperience.mode||"Balanced investor review"} (${n.productExperience.onboardingCompleteness||0}% guidance complete): ${n.productExperience.summary}`,`Style: ${n.productExperience.explanationStyle||"Balanced explanation"}`,`Next best action: ${n.productExperience.nextBestAction||"Complete the missing guidance fields before relying on the report format."}`);for(let t of n.productExperience.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dimensions?.length){e.push("","Scorecard");for(let t of n.dimensions)e.push(`- ${t.label}: ${t.score}/100 (${t.status})`)}if(n.evidenceChecklist?.length){e.push("","Evidence checklist");for(let t of n.evidenceChecklist)e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.evidenceEngine?.summary){e.push("","V4.0 evidence engine",`${n.evidenceEngine.status||"unknown"} (${n.evidenceEngine.score||0}/100): ${n.evidenceEngine.summary}`,`Gate: ${n.evidenceEngine.recommendationGate||"Evidence gate not calculated."}`);for(let t of n.evidenceEngine.criticalGaps||[])e.push(`- Critical gap: ${t}`);for(let t of n.evidenceEngine.gates||[])e.push(`- ${t.label}: ${t.status}, ${t.score}/100. ${t.action}`)}if(n.transactionComparableEvidence?.summary){e.push("","V4.1 transaction comparable evidence",`${n.transactionComparableEvidence.status||"unknown"} (${n.transactionComparableEvidence.score||0}/100): ${n.transactionComparableEvidence.summary}`,`Value position: ${n.transactionComparableEvidence.valuePosition||"Not calculated."}`);for(let t of n.transactionComparableEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.achievedRentalEvidence?.summary){e.push("","V4.2 achieved rental evidence",`${n.achievedRentalEvidence.status||"unknown"} (${n.achievedRentalEvidence.score||0}/100): ${n.achievedRentalEvidence.summary}`,`Coverage: ${n.achievedRentalEvidence.coveragePosition||"Not calculated."}`);for(let t of n.achievedRentalEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.financingValuationEvidence?.summary){e.push("","V4.3 financing and valuation evidence",`${n.financingValuationEvidence.status||"unknown"} (${n.financingValuationEvidence.score||0}/100): ${n.financingValuationEvidence.summary}`,`Affordability: ${n.financingValuationEvidence.affordabilityPosition||"Not calculated."}`);for(let t of n.financingValuationEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.supplyAbsorptionEvidence?.summary){e.push("","V4.4 supply and absorption evidence",`${n.supplyAbsorptionEvidence.status||"unknown"} (${n.supplyAbsorptionEvidence.score||0}/100): ${n.supplyAbsorptionEvidence.summary}`,`Competition: ${n.supplyAbsorptionEvidence.competitionPosition||"Not calculated."}`);for(let t of n.supplyAbsorptionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteManagementEvidence?.summary){e.push("","V4.5 site and management evidence",`${n.siteManagementEvidence.status||"unknown"} (${n.siteManagementEvidence.score||0}/100): ${n.siteManagementEvidence.summary}`,`Lived quality: ${n.siteManagementEvidence.livedQualityPosition||"Not calculated."}`);for(let t of n.siteManagementEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.legalTransactionEvidence?.summary){e.push("","V4.6 legal and transaction evidence",`${n.legalTransactionEvidence.status||"unknown"} (${n.legalTransactionEvidence.score||0}/100): ${n.legalTransactionEvidence.summary}`,`Transaction path: ${n.legalTransactionEvidence.transactionPosition||"Not calculated."}`);for(let t of n.legalTransactionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dueDiligencePlan?.tasks?.length){e.push("","Due diligence pack",n.dueDiligencePlan.summary||"");for(let t of n.dueDiligencePlan.tasks)e.push(`- ${t.owner} / ${t.priority} / ${t.status}: ${t.label}. ${t.action}`)}if(n.stressEnvelope?.summary){e.push("","Stress envelope",n.stressEnvelope.summary,`Base true holding: ${n.stressEnvelope.baseTrueHolding}`,`Stressed true holding: ${n.stressEnvelope.stressedTrueHolding}`,`Cash after stress reserves: ${n.stressEnvelope.cashAfterStressReserves}`,`Reserve survival: ${n.stressEnvelope.reserveSurvivalMonths===null?"Not applicable":`${n.stressEnvelope.reserveSurvivalMonths} months`}`);for(let t of n.stressEnvelope.assumptions||[])e.push(`- ${t.label}: ${t.value} (${t.source})`)}if(n.acquisitionCostEstimate?.items?.length){e.push("","Estimated Malaysian entry costs");for(let t of Nb(n.acquisitionCostEstimate))e.push(`- ${t}`)}if(n.portfolioGate?.summary){e.push("","Portfolio expansion gate",`${n.portfolioGate.status||"review"} (${n.portfolioGate.score||0}/100): ${n.portfolioGate.summary}`,`Next-property rule: ${n.portfolioGate.nextPropertyRule||"Do not scale until the current property is proven."}`);for(let t of n.portfolioGate.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.marketPulse?.summary){e.push("","Market cycle and liquidity pulse",`${n.marketPulse.status||"watch"}: ${n.marketPulse.summary}`,`Cycle: ${n.marketPulse.cycle||"Cycle unclear"}`,`Liquidity: ${n.marketPulse.liquidity||"Liquidity must be proven"}`);for(let t of n.marketPulse.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.holdExitPlan?.summary){e.push("","Hold, refinance, exit plan",`${n.holdExitPlan.action||"monitor"}: ${n.holdExitPlan.summary}`,`Review cadence: ${n.holdExitPlan.reviewCadence||"Review annually and on trigger events."}`);for(let t of n.holdExitPlan.triggers||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.decisionSeal?.summary){e.push("","V1 decision seal",`${n.decisionSeal.label||"V1 Conditional Only"}: ${n.decisionSeal.summary}`);for(let t of n.decisionSeal.conditions||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteVisitAssistant?.summary){e.push("","V2.1 site visit assistant",`${n.siteVisitAssistant.status||"required"}: ${n.siteVisitAssistant.summary}`,`Focus: ${n.siteVisitAssistant.focus||"Check lived quality on site"}`);for(let t of n.siteVisitAssistant.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourcingProfessional?.summary){e.push("","V2.2 sourcing and professional filter",`${n.sourcingProfessional.status||"verify"}: ${n.sourcingProfessional.summary}`,`Posture: ${n.sourcingProfessional.posture||"Evidence-first sourcing"}`);for(let t of n.sourcingProfessional.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.tenantRentalPlan?.summary){e.push("","V2.3 tenant and rental plan",`${n.tenantRentalPlan.status||"watch"}: ${n.tenantRentalPlan.summary}`,`Target: ${n.tenantRentalPlan.target||"Target tenant not stated"}`);for(let t of n.tenantRentalPlan.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.exitStrategy?.summary){e.push("","V2.4 exit strategy and buyer psychology",`${n.exitStrategy.status||"prepare"}: ${n.exitStrategy.summary}`,`Buyer psychology: ${n.exitStrategy.buyerPsychology||"Buyer objections must be prepared"}`);for(let t of n.exitStrategy.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.executionPlan?.actions?.length){e.push("","Execution calibration",n.executionPlan.summary||"",`Posture: ${n.executionPlan.posture||"Verify before offer"}`,`Opening anchor: ${n.executionPlan.openingAnchor||"Need value proof"}`,`Maximum offer: ${n.executionPlan.maximumOffer||"Need value/rent proof"}`,`Walk-away rule: ${n.executionPlan.walkAway||"Do not proceed under pressure."}`);for(let t of n.executionPlan.actions)e.push(`- ${t.lane} / ${t.status}: ${t.label}. ${t.action}`)}if(n.learningLoop?.signals?.length){e.push("","Learning loop",n.learningLoop.summary||""),n.learningLoop.profile?.approvedCount&&e.push(`Memory profile: ${n.learningLoop.profile.investorType||"Profile building"}; ${n.learningLoop.profile.riskStyle||"Needs more approved memory"}.`,`Profile completeness: ${n.learningLoop.profile.completeness||0}%.`);for(let t of n.learningLoop.signals)e.push(`- ${t.label}: ${t.body} ${t.action}`)}if(n.personalizedChallenge?.message){e.push("",`V3.3 personalized challenge: ${n.personalizedChallenge.label||"Personalized challenge"}`,`- ${n.personalizedChallenge.message}`);for(let t of n.personalizedChallenge.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dealMemoryComparison?.summary){e.push("","V3.4 deal memory comparison",`${n.dealMemoryComparison.status||"none"}: ${n.dealMemoryComparison.summary}`);for(let t of n.dealMemoryComparison.matches||[])e.push(`- ${t.subject}: ${t.similarity}% similar, ${t.verdict}. ${t.reason} ${t.action}`)}if(n.beliefTracker?.summary){e.push("","V3.5 belief tracker",`${n.beliefTracker.status||"inactive"}: ${n.beliefTracker.summary}`);for(let t of n.beliefTracker.beliefs||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourceTransparency?.summary){e.push("","V3.6 source transparency",`${n.sourceTransparency.mode||n.reasoningMode||"Framework only"}: ${n.sourceTransparency.summary}`);for(let t of n.sourceTransparency.sources||[])e.push(`- ${t.label}: ${t.status}. ${t.detail}`)}if(n.memoryConflicts?.summary){e.push("","V3.7 memory conflicts",`${n.memoryConflicts.status||"inactive"}: ${n.memoryConflicts.summary}`);for(let t of n.memoryConflicts.conflicts||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.personalOperatingRules?.summary){e.push("","V3.8 personal operating rules",`${n.personalOperatingRules.status||"check"}: ${n.personalOperatingRules.summary}`);for(let t of n.personalOperatingRules.rules||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}return n.hardStops?.length&&e.push("","Hard stops",...n.hardStops.map(t=>`- ${t}`)),n.recommendationBlockers?.length&&e.push("","Decision blockers",...n.recommendationBlockers.map(t=>`- ${t}`)),n.watchouts?.length&&e.push("","Watch-outs",...n.watchouts.map(t=>`- ${t}`)),n.nextActions?.length&&e.push("","Check next",...n.nextActions.map(t=>`- ${t}`)),n.counterThesis&&e.push("",`Strongest counter-thesis: ${n.counterThesis}`),Ti(e.join(`
`))}async function Wf(n){try{await navigator.clipboard.writeText(n)}catch{let e=document.createElement("textarea");e.value=n,e.setAttribute("readonly",""),e.style.position="fixed",e.style.opacity="0",document.body.append(e),e.select(),document.execCommand("copy"),e.remove()}}function aC(n){return String(n||"").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function qy(n,e={},t=10){let i=Object.entries(e).filter(([,s])=>String(s||"").trim()).slice(0,t);return i.length?[`${n}:`,...i.map(([s,r])=>`- ${aC(s)}: ${String(r).trim()}`)]:[`${n}: not supplied`]}function lC(){return["Readiness:",...[{panelName:"deal",label:"Deal"},{panelName:"profile",label:"Profile"},{panelName:"guidance",label:"Guidance"}].map(n=>{let e=Za(n.panelName);return`- ${n.label}: ${e.percent}%${e.missing.length?`, missing ${e.missing.slice(0,3).join(", ")}`:", ready enough"}`})]}function mb(n){let e=Array.from(Vt.querySelectorAll(n)).pop();return Ti(e?.textContent||"").replace(/\s+/g," ").trim()}function cC(){let n=Array.from(Vt.querySelectorAll(".analysisMessage")).pop(),e=tl.get(n?.dataset.analysisId);if(e)return["Latest Apex direction:",`- Subject: ${Eo(e)}`,`- Verdict: ${e.verdict||"INVESTIGATE"} (${e.confidence||0}% confidence, ${e.averageScore||0}/100 score)`,e.summary?`- Summary: ${e.summary}`:"",e.counterThesis?`- Counter-thesis: ${e.counterThesis}`:"",...(e.nextActions||[]).slice(0,3).map(i=>`- Next: ${i}`)].filter(Boolean);let t=mb(".message.jarvis .messageText");return t?["Latest Apex direction:",`- ${t.slice(0,700)}`]:["Latest Apex direction: no Apex answer yet"]}function uC(){let n=Ki(),e=To(),t=mb(".message.user .messageText"),i=["APEX ANALYTIC SESSION BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",t?`Latest user question: ${t.slice(0,500)}`:"Latest user question: not supplied","",...lC(),"",...qy("Deal context",n,12),"",...qy("Profile and guidance context",e,12),"",...cC(),"","Use this brief as context only. Re-check live transaction, rental, financing, legal, supply, and site evidence before deciding."];return Ti(i.filter(s=>s!==void 0).join(`
`))}async function gb(n=Sp){let e=uC();if(await Wf(e),n){let t=n.textContent;n.textContent="COPIED",window.setTimeout(()=>{n.textContent=t||"BRIEF"},1200)}ge("System ready","Session brief copied.")}async function dC(n,e){let t=oC(e);await Wf(t),n.textContent="COPIED",ge("System ready","Report copied.")}function hC(){for(let n of mo?.querySelectorAll("details[data-print-was-open]")||[])n.open=n.dataset.printWasOpen==="true",delete n.dataset.printWasOpen;mo?.classList.remove("printTarget"),mo=null,document.body.classList.remove("printMode")}function pC(n){let e=n.closest(".analysisMessage"),t=tl.get(e?.dataset.analysisId);if(!e||!t)return;let i=n.getAttribute("data-analysis-action");if(i==="report"){rC(e);return}if(i==="copy"){dC(n,t);return}if(i==="shortlist"){fb(t),n.textContent="SAVED",ge("System ready",`${Eo(t)} saved to your shortlist.`),Ci();return}if(i==="dcf"&&t.residentialDcf?.status!=="incomplete"){Qf(t.residentialDcf);return}i==="journal"&&pb(t)}function yb(n){let e=wi.find(t=>t.getAttribute("data-context-toggle")===n);e&&Ei(e,!0),Vb(n)}function fC(n){let e=n?.getAttribute("data-journey-action");if(e){if(e==="deal"||e==="profile"||e==="guidance"){yb(e);return}if(e==="screen"){Gb();return}if(e==="analyze"){Qa();return}if(e==="save"){let t=Kp();if(!t)return void Qa();fb(t),rl(),ge("System ready",`${Eo(t)} saved to your shortlist.`);return}if(e==="shortlist"){Gf();return}if(e==="journal"){let t=Kp();t?pb(t):id();return}if(e==="reports"){Vf();return}e==="brief"&&gb()}}function od(){return Va.value.trim()||window.localStorage.getItem(ws)||""}function vb(){return qa.value.trim()||od()}function bb(){return $a.value.trim()||od()}function St(n,e=""){zy.textContent=n||"",zy.dataset.tone=e}function qt(n,e=""){By.textContent=n||"",By.dataset.tone=e}function On(n,e=""){Vy.textContent=n||"",Vy.dataset.tone=e}function je(n,e=""){ky.textContent=n||"",ky.dataset.tone=e}function jn(n){let e=String(n||"").trim();Si.value=e,Va.value=e,$a.value=e,qa.value=e,e?window.localStorage.setItem(ws,e):window.localStorage.removeItem(ws)}function Yi(){return Si.value.trim()||window.localStorage.getItem(ws)||""}async function At(n,e={}){let t=Yi();if(!t)throw new Error("Paste and save the owner token first.");return ze(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function Wn(n="",e=""){Fy.textContent=n,Fy.dataset.tone=e}function mC(n){let e=n.summary||{},t=e.pipelinePressure!==null&&e.pipelinePressure!==void 0&&Number.isFinite(Number(e.pipelinePressure))?`${Math.round(Number(e.pipelinePressure)*100)}% pipeline`:"pipeline unavailable";return`
    <article class="ownerResearchItem" data-owner-research-id="${p(n.id)}">
      <header>
        <span><small>${p(n.market||n.country||"Market study")} / CUT-OFF ${p(n.dataCutoff||"unknown")}</small><b>${p(n.title||n.id)}</b></span>
        <em>${p(e.effectiveHighConfidence||0)} high-confidence</em>
      </header>
      <p>${p(n.decisionStatement||"No decision statement supplied.")}</p>
      <div class="ownerResearchMeta">
        <span>${p(e.evidenceRecords||0)} evidence</span>
        <span>${p(e.projectRecords||0)} projects</span>
        <span>${p(t)}</span>
        <span>${p(e.warnings||0)} warnings</span>
      </div>
      <button type="button" data-owner-research-action="delete" data-owner-research-id="${p(n.id)}">DELETE</button>
    </article>
  `}function Nu(n={}){uo=Array.isArray(n.studies)?n.studies:[],uT.textContent=`${uo.length} stud${uo.length===1?"y":"ies"}`,yv.innerHTML=uo.length?uo.map(mC).join(""):'<p class="ownerIntelEmpty">No validated research study has been imported yet.</p>'}async function qf(){if(!Yi())return Nu(),Wn("Owner token required.","warning"),{studies:[],summary:{}};Wn("Loading validated research...");let n=await At("/api/owner/research/studies");return Nu(n),Wn(`${n.summary?.evidenceRecords||0} evidence records available to retrieval.`),n}async function xb(n,e=!1){Wn(e?"Replacing validated research study...":"Validating and importing research study...");let t=await At(`/api/owner/research/studies/import${e?"?replace=true":""}`,{method:"POST",body:JSON.stringify(n)});Ya=null,Wu.hidden=!0,await qf(),Wn(`${t.study?.title||"Research study"} ${t.replaced?"replaced":"imported"}.`)}async function gC(n){if(!n)return;let e;try{e=JSON.parse(await n.text())}catch{throw new Error("Research import must be a valid JSON bundle.")}finally{wu.value=""}let t=String(e?.study_config?.study_id||"").trim();if(t&&uo.some(i=>i.id===t)){Ya=e,Wu.hidden=!1,Wn(`Study ${t} already exists. Review the new cut-off, then use REPLACE STUDY.`,"warning");return}await xb(e,!1)}async function yC(n){n&&(Wn(`Deleting ${n}...`,"warning"),await At(`/api/owner/research/studies/${encodeURIComponent(n)}`,{method:"DELETE"}),await qf(),Wn("Research study deleted.","warning"))}async function xo(n,e={}){let t=od();if(!t)throw new Error("Paste and save the owner token first.");return ze(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function jy(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function xp(n="",e={}){let t=jy(n);return t?[e.name,e.area,...e.aliases||[]].map(jy).filter(Boolean).some(i=>t.includes(i)||i.includes(t)):!1}function vC(n=[],e=[],t=[],i=[]){return n.map(s=>{let r=e.filter(y=>y.projectId===s.id||xp(`${y.projectName} ${y.area}`,s)),o=t.filter(y=>y.projectId===s.id||xp(`${y.projectName||y.project?.name||""} ${y.area||y.project?.area||""}`,s)),a=i.filter(y=>xp(`${y.title} ${y.filename} ${(y.tags||[]).join(" ")}`,s)),l=o.filter(y=>y.freshness?.status==="stale").length,c=!!r.length,u=o.some(y=>y.freshness?.status==="fresh"),d=!!a.length,h=[c?"":"case",u?"":"fresh signal",d?"":"evidence"].filter(Boolean),f=c?l?"stale":u&&d?"ready":"partial":"missing";return{project:s,cases:r.length,observations:o.length,evidence:a.length,stale:l,missing:h,status:f}})}function bC(){try{return JSON.parse(window.localStorage.getItem(qv)||"null")||null}catch{return null}}function xC(n={}){let e=n.contentVersion?.hash||n.integrity?.hash||"",t={exportedAt:n.exportedAt||new Date().toISOString(),versionHash:e,versionShort:e?e.slice(0,12):"",counts:n.counts||{}};return window.localStorage.setItem(qv,JSON.stringify(t)),t}function _C(n="",e={}){if(e?.status&&e.status!=="missing")return{status:e.status==="ready"?"ready":"warning",label:e.label||"Server backup record",action:e.action||"Server backup ledger is tracking owner exports."};let t=bC();if(!t?.exportedAt)return{status:"missing",label:"No local backup",action:"Download a backup after major owner-knowledge edits."};let i=Math.floor((Date.now()-Date.parse(t.exportedAt))/864e5);return n&&t.versionHash&&t.versionHash!==n?{status:"warning",label:"Backup outdated",action:"Current owner data changed after the last downloaded backup."}:Number.isFinite(i)&&i>14?{status:"warning",label:`${i} days old`,action:"Download a fresh backup this week."}:{status:"ready",label:t.versionShort?`Saved ${t.versionShort}`:"Backup recent",action:"Local backup marker matches the current browser record."}}function or(n,e,t,i){return`
    <article class="${p(t)}">
      <small>${p(n)}</small>
      <b>${p(e)}</b>
      <p>${p(i)}</p>
    </article>
  `}function mr(n=""){return n==="ready"?"READY":n==="missing"?"BLOCKED":n==="warning"?"CHECK":"UNKNOWN"}function SC(n={}){return`
    <article class="${p(n.status||"warning")}">
      <small>${p(n.label||"Ops check")}</small>
      <b>${p(mr(n.status))}</b>
      <p>${p(n.detail||"Status unavailable.")}</p>
      ${n.action?`<em>${p(n.action)}</em>`:""}
    </article>
  `}function _b(n={}){let e=Array.isArray(n.checks)?n.checks:[];if(!e.length){Oy.innerHTML='<article class="warning"><small>PRODUCTION OPS</small><b>Token required</b><p>Load the owner console to check storage, AI, billing, backup, and launch readiness.</p></article>';return}let t=n.summary||{};Oy.innerHTML=`
    <article class="ownerIntelOpsLead ${p(n.status||"warning")}">
      <small>PRODUCTION OPS</small>
      <b>${p(mr(n.status))}</b>
      <p>${p(t.ready||0)} ready / ${p(t.warning||0)} warning / ${p(t.missing||0)} blocked</p>
      <em>${p(n.generatedAt||"")}</em>
    </article>
    ${e.map(SC).join("")}
  `}function wC(n=[]){if(!n.length)return 0;let e=n.reduce((t,i)=>{let s=(i.cases?38:0)+(i.observations?18:0)+(i.observations&&!i.stale?17:0)+(i.evidence?27:0);return t+Math.max(0,Math.min(100,s-(i.stale?12:0)))},0);return Math.round(e/n.length)}function Sb(n=[]){let e={missing:0,stale:1,partial:2,ready:3};return[...n].sort((t,i)=>e[t.status]-e[i.status]||i.missing.length-t.missing.length)}function EC(n=[]){let e=Sb(n);return ja==="all"?e:e.filter(t=>t.status===ja)}function wb(n=[]){let e=EC(n);mv.querySelectorAll("[data-owner-intel-filter]").forEach(t=>{let i=t.getAttribute("data-owner-intel-filter")===ja;t.setAttribute("aria-pressed",i?"true":"false")}),gf.innerHTML=e.length?e.slice(0,10).map(MC).join(""):n.length?`<p class="ownerIntelEmpty">No ${p(ja)} projects in the current owner coverage view.</p>`:'<p class="ownerIntelEmpty">No projects loaded yet. Start by adding tracked projects in the Market console.</p>'}function MC(n){let e=[n.project.area,n.project.state,n.project.propertyType].filter(Boolean).join(" / ")||"No project detail";return`
    <article class="ownerIntelCoverageItem ${p(n.status)}" data-owner-intel-project="${p(n.project.id)}">
      <header><span><small>${p(e)}</small><b>${p(n.project.name)}</b></span><em>${p(n.status)}</em></header>
      <div>
        <span>${p(n.cases)} case</span>
        <span>${p(n.observations)} signal</span>
        <span>${p(n.evidence)} proof</span>
        <span>${p(n.stale)} stale</span>
      </div>
      <p>${p(n.missing.length?`Missing ${n.missing.join(", ")}.`:"Coverage is strong enough for project-aware Apex reasoning.")}</p>
      <div class="ownerIntelCoverageActions">
        <button type="button" data-owner-intel-action="case" data-owner-intel-project="${p(n.project.id)}">CASE</button>
        <button type="button" data-owner-intel-action="signal" data-owner-intel-project="${p(n.project.id)}">SIGNAL</button>
        <button type="button" data-owner-intel-action="proof" data-owner-intel-project="${p(n.project.id)}">PROOF</button>
      </div>
    </article>
  `}function TC(){let n=Xa||{},e=Sb(n.rows||[]),t=n.score||0,i=n.ops||{},r=(Array.isArray(i.checks)?i.checks:[]).filter(a=>a.status!=="ready"),o=["APEX OWNER INTELLIGENCE BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",`Coverage score: ${t}%`,`Production ops: ${mr(i.status)} (${i.summary?.ready||0} ready / ${i.summary?.warning||0} warning / ${i.summary?.missing||0} blocked)`,`Projects: ${n.projectCount||0}`,`Cases: ${n.caseCount||0}`,`Observations: ${n.observationCount||0}`,`Evidence documents: ${n.documentCount||0}`,`Validated research studies: ${n.researchStudyCount||0}`,`Complete projects: ${n.complete||0}`,"","Production gaps:",...r.length?r.slice(0,8).map(a=>`- ${a.label}: ${mr(a.status)} / ${a.action||a.detail||"Review required."}`):["- None loaded or all clear."],"","Priority gaps:",...e.length?e.slice(0,10).map(a=>{let l=a.project?.name||"Unnamed project",c=[a.project?.area,a.project?.state,a.project?.propertyType].filter(Boolean).join(" / ")||"No detail",u=a.missing.length?a.missing.join(", "):"none";return`- ${l} (${c}) / ${a.status}: ${u}; ${a.cases} case, ${a.observations} signal, ${a.evidence} proof, ${a.stale} stale.`}):["- No project coverage loaded yet."],"","Next operating rule: add founder case judgment, fresh dated market signal, and evidence proof for every tracked project before relying on project-aware reasoning."];return Ti(o.join(`
`))}async function AC(){await Wf(TC());let n=pu.textContent;pu.textContent="COPIED",window.setTimeout(()=>{pu.textContent=n||"COPY BRIEF"},1200),je("Owner intelligence brief copied.")}function CC(n,e){let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=n,document.body.append(s),s.click(),s.remove(),URL.revokeObjectURL(i)}async function RC(){if(!Yi())return Si.focus();Rp.disabled=!0;try{je("Preparing owner knowledge backup...");let n=await At("/api/owner/export?chunks=true"),e=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");CC(`apex-owner-knowledge-${e}.json`,n);let t=xC(n),i="";try{i=` Server ledger: ${(await IC(n)).ledger?.label||"recorded"}.`}catch{i=" Server ledger could not be updated."}je(`Owner backup downloaded: ${n.counts?.projects||0} projects, ${n.counts?.observations||0} observations, ${n.counts?.developmentCases||0} cases, ${n.counts?.documents||0} documents, ${n.counts?.chunks||0} chunks. Version ${t.versionShort||"recorded"}.${i}`)}finally{Rp.disabled=!1}}async function IC(n={}){return At("/api/owner/backup/events",{method:"POST",body:JSON.stringify({backupHash:n.integrity?.hash||"",contentVersionHash:n.contentVersion?.hash||"",exportedAt:n.exportedAt||new Date().toISOString(),counts:n.counts||{},source:"owner-console"})})}async function PC(){if(!Yi())return Si.focus();Pp.disabled=!0;try{je("Checking owner backup reminder...");let n=await At("/api/owner/backup/reminder",{method:"POST",body:JSON.stringify({force:!1})}),e=n.reminder||{},t=n.sent?"sent":n.skipped?"not sent":"checked";je(`Backup reminder ${t}: ${e.message||n.reason||"No reminder needed."}`,n.sent||e.due?"warning":""),await Ts()}finally{Pp.disabled=!1}}async function LC(){if(!Yi())return Si.focus();Cp.disabled=!0;try{je("Checking production operations...");let n=await At("/api/owner/ops");Xa={...Xa||{},ops:n},_b(n),je(`Production ops: ${mr(n.status)}. ${n.summary?.ready||0} ready, ${n.summary?.warning||0} warning, ${n.summary?.missing||0} blocked.`,n.status==="ready"?"":"warning")}finally{Cp.disabled=!1}}function NC(n={}){let e=n.incoming||{},t=Array.isArray(n.warnings)&&n.warnings.length?` Warning: ${n.warnings[0]}`:"";return`Backup ready to restore: ${e.projects||0} projects, ${e.observations||0} observations, ${e.developmentCases||0} cases, ${e.documents||0} documents.${t}`}async function DC(n){if(!Yi())return Si.focus();if(n){Ip.disabled=!0,Ct.hidden=!0,Ct.value="",Ct.placeholder="Type RESTORE OWNER KNOWLEDGE",_i.hidden=!0,xs=null;try{je("Validating owner backup...");let e=await n.text(),t=JSON.parse(e),i=await At("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:t,dryRun:!0})});xs=t,Ct.hidden=!1,_i.hidden=!1,je(`${NC(i)} Type RESTORE OWNER KNOWLEDGE, then press CONFIRM RESTORE only if this backup should replace current owner knowledge.`,i.warnings?.length?"warning":"")}catch(e){xs=null,Ct.hidden=!0,_i.hidden=!0,je(e.message||"Backup could not be validated.","danger")}finally{Ip.disabled=!1,Su.value=""}}}async function OC(){if(!xs)return Ct.hidden=!0,_i.hidden=!0,je("Choose and validate a backup first.","warning");let n=Ct.value.trim();if(n!=="RESTORE OWNER KNOWLEDGE")return Ct.focus(),je("Type RESTORE OWNER KNOWLEDGE before restoring this backup.","warning");_i.disabled=!0;try{je("Restoring owner knowledge backup...");let e=await At("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:xs,dryRun:!1,confirmRestore:n})});xs=null,Ct.value="",Ct.hidden=!0,_i.hidden=!0,await Ts(),vo.hidden||jf(e.history||{}),je(`Owner knowledge restored: ${e.counts?.projects||0} projects, ${e.counts?.observations||0} observations, ${e.counts?.developmentCases||0} cases, ${e.counts?.researchStudies||0} research studies, ${e.counts?.documents||0} documents.`,"warning")}finally{_i.disabled=!1}}function kC(n={}){return`${n.projects||0} projects / ${n.observations||0} signals / ${n.developmentCases||0} cases / ${n.researchStudies||0} research / ${n.documents||0} docs`}function jf(n={}){let e=Array.isArray(n.snapshots)?n.snapshots:[],t=Array.isArray(n.events)?n.events:[],i=n.summary?.currentVersionShort||"",s=n.backup||{};vo.hidden=!1,vo.innerHTML=`
    <header><span><small>OWNER DATA SAFETY${i?` / VERSION ${p(i)}`:""}</small><b>${p(e.length)} rollback snapshot${e.length===1?"":"s"}</b><em>${p(s.label||"No server backup record")}</em></span><em>${p(t.length)} event${t.length===1?"":"s"}</em></header>
    ${e.length?e.map(r=>`
      <article>
        <span><small>${p(r.reason||"snapshot")}</small><b>${p(kC(r.counts))}</b><em>${p(r.createdAt||"")}</em></span>
        <button type="button" data-owner-rollback-snapshot="${p(r.id)}">ROLLBACK</button>
      </article>
    `).join(""):'<p class="ownerIntelEmpty">No rollback snapshots yet. Apex creates one before every confirmed restore or rollback.</p>'}
    ${t.length?`<p>Latest: ${p(t[0].type||"restore")} / ${p(t[0].createdAt||"")}</p>`:""}
  `}async function UC(){if(!Yi())return Si.focus();xs=null,_i.hidden=!0,Ct.value="",Ct.placeholder="Type ROLLBACK OWNER KNOWLEDGE",je("Loading owner restore log...");let n=await At("/api/owner/restore/history");jf(n),Ct.hidden=!(n.snapshots||[]).length,je(`Restore log loaded: ${n.summary?.snapshots||0} rollback snapshots, ${n.summary?.events||0} restore events.`)}async function FC(n){if(!n)return;let e=Ct.value.trim();if(e!=="ROLLBACK OWNER KNOWLEDGE")return Ct.hidden=!1,Ct.placeholder="Type ROLLBACK OWNER KNOWLEDGE",Ct.focus(),je("Type ROLLBACK OWNER KNOWLEDGE before rolling back to this snapshot.","warning");je("Rolling owner knowledge back to selected snapshot...");let t=await At("/api/owner/restore/rollback",{method:"POST",body:JSON.stringify({snapshotId:n,dryRun:!1,confirmRollback:e})});Ct.value="",await Ts(),jf(t.history||{}),je(`Owner knowledge rolled back: ${t.counts?.projects||0} projects, ${t.counts?.observations||0} observations, ${t.counts?.developmentCases||0} cases, ${t.counts?.researchStudies||0} research studies.`,"warning")}function BC(n){let e=[{id:"free",name:"Free"},{id:"pro",name:"Pro"},{id:"advisor",name:"Advisor"}];return(Ru.length?Ru:e).map(i=>`<option value="${p(i.id)}"${i.id===n?" selected":""}>${p(i.name||i.id)}</option>`).join("")}function VC(n){return`
    <article class="ownerAdminUser ${n.disabled?"disabled":""}" data-owner-admin-user="${p(n.id)}">
      <header>
        <span><small>${p(n.role||"member")} / ${p(n.plan||"free")}</small><b>${p(n.displayName||n.email)}</b><em>${p(n.email)}</em></span>
        <strong>${p(n.disabled?"DISABLED":n.emailVerified?"VERIFIED":"UNVERIFIED")}</strong>
      </header>
      <div class="ownerAdminGrid">
        <label>Role
          <select data-owner-admin-field="role">
            <option value="member"${n.role!=="admin"?" selected":""}>Member</option>
            <option value="admin"${n.role==="admin"?" selected":""}>Admin</option>
          </select>
        </label>
        <label>Plan
          <select data-owner-admin-field="plan">${BC(n.plan||"free")}</select>
        </label>
        <label>Status
          <select data-owner-admin-field="planStatus">
            ${["active","trialing","past_due","canceled"].map(e=>`<option value="${e}"${e===n.planStatus?" selected":""}>${e}</option>`).join("")}
          </select>
        </label>
        <label>Verified
          <select data-owner-admin-field="emailVerified">
            <option value="true"${n.emailVerified?" selected":""}>Yes</option>
            <option value="false"${n.emailVerified?"":" selected"}>No</option>
          </select>
        </label>
        <label>Disabled
          <select data-owner-admin-field="disabled">
            <option value="false"${n.disabled?"":" selected"}>No</option>
            <option value="true"${n.disabled?" selected":""}>Yes</option>
          </select>
        </label>
      </div>
      <button type="button" data-owner-admin-action="save">SAVE USER</button>
    </article>
  `}function Eb(n=[]){gv.textContent=n.length?`${n.length} user${n.length===1?"":"s"} loaded`:"No users found",vf.innerHTML=n.length?n.map(VC).join(""):'<p class="ownerIntelEmpty">No account users loaded yet.</p>'}async function Mb(){if(!Yi())return gv.textContent="Owner token required",vf.innerHTML='<p class="ownerIntelEmpty">Paste the owner token above before loading users.</p>',null;je("Loading user control...");let n=await At("/api/admin/users");return Eb(n.users||[]),je("User control loaded."),n}async function $C(n){let e=n.closest("[data-owner-admin-user]"),t=e?.getAttribute("data-owner-admin-user");if(!t)return;let i=r=>e.querySelector(`[data-owner-admin-field="${r}"]`)?.value||"",s={role:i("role"),plan:i("plan"),planStatus:i("planStatus"),emailVerified:i("emailVerified")==="true",disabled:i("disabled")==="true"};n.disabled=!0;try{await At(`/api/admin/users/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(s)}),await Mb(),je("User updated.")}finally{n.disabled=!1}}function jp({projects:n={},observations:e={},cases:t={},evidence:i={},research:s={},history:r={},ops:o={}}={}){let a=Array.isArray(n.projects)?n.projects:[],l=Array.isArray(e.observations)?e.observations:[],c=Array.isArray(t.cases)?t.cases:[],u=Array.isArray(i.documents)?i.documents:[],d=Array.isArray(s.studies)?s.studies:[];Nu(s),_b(o),Kv=a,Xi=a,Rb(a),Ab(a);let h=vC(a,c,l,u),f=h.filter(S=>S.cases===0).length,y=l.filter(S=>S.freshness?.status==="stale").length,v=h.filter(S=>S.evidence===0).length,g=h.filter(S=>S.status==="ready").length,m=wC(h),M=_C(r.summary?.currentVersionHash||"",r.backup||{});Xa={rows:h,score:m,projectCount:a.length,caseCount:t.summary?.total??c.length,observationCount:e.summary?.matched??l.length,documentCount:i.summary?.documents??u.length,researchStudyCount:d.length,complete:g,currentVersionShort:r.summary?.currentVersionShort||"",backupReminder:M,ops:o},sT.innerHTML=`
    <span><b>${p(m)}%</b> COVERAGE</span>
    <span><b>${p(mr(o.status))}</b> OPS</span>
    <span><b>${p(a.length)}</b> PROJECTS</span>
    <span><b>${p(t.summary?.total??c.length)}</b> CASES</span>
    <span><b>${p(e.summary?.matched??l.length)}</b> OBSERVATIONS</span>
    <span><b>${p(i.summary?.documents??u.length)}</b> DOCUMENTS</span>
    <span><b>${p(d.length)}</b> RESEARCH</span>
    <span><b>${p(g)}</b> COMPLETE</span>
  `,oT.innerHTML=[or("Project registry",`${a.length} tracked`,a.length?"ready":"missing",a.length?"Registry exists.":"Add projects before cases can be linked."),or("Founder cases",`${f} missing`,f?"warning":"ready",f?"Write founder opinion for unmatched projects.":"Case coverage is broad."),or("Market freshness",`${y} stale`,y?"warning":l.length?"ready":"missing",y?"Re-check old observations.":l.length?"Signals are current enough.":"Add dated ground signals."),or("Evidence vault",`${v} unbacked`,v?"warning":u.length?"ready":"missing",v?"Attach proof to important projects.":u.length?"Evidence exists.":"Add source proof."),or("Research studies",`${d.length} validated`,d.length?"ready":"missing",d.length?"Strict research can now support market questions.":"Import a strictly validated study bundle when one is ready."),or("Backup rhythm",M.label,M.status,M.action),or("Production ops",mr(o.status),o.status||"warning",o.summary?`${o.summary.ready||0} ready, ${o.summary.warning||0} warning, ${o.summary.missing||0} blocked.`:"Load owner token to check launch readiness.")].join(""),wb(h);let E={title:"Add project registry",detail:"Apex needs tracked projects before owner intelligence can become project-specific.",action:"market"};f?E={title:"Write missing case opinions",detail:`${f} tracked project${f===1?"":"s"} do not have founder case notes yet.`,action:"cases"}:y?E={title:"Refresh stale market signals",detail:`${y} observation${y===1?" is":"s are"} stale and should be re-verified.`,action:"market"}:v?E={title:"Attach evidence proof",detail:`${v} project${v===1?"":"s"} have no obvious evidence document match.`,action:"evidence"}:d.length?a.length&&(E={title:"Coverage looks healthy",detail:"Keep adding dated observations and update case notes when the market changes.",action:"refresh"}):E={title:"Import validated market research",detail:"The framework is ready; add a strict research bundle to extend it with dated external evidence.",action:"research"},aT.textContent=E.title,lT.textContent=E.detail,yf.innerHTML=`
    <button type="button" data-owner-intel-action="${p(E.action)}">DO NEXT</button>
    <button type="button" data-owner-intel-action="market">PROJECTS / SIGNALS</button>
    <button type="button" data-owner-intel-action="cases">CASES</button>
    <button type="button" data-owner-intel-action="evidence">EVIDENCE</button>
    <button type="button" data-owner-intel-action="research">RESEARCH</button>
  `}async function Ts(){if(!Yi())return jp(),je(nl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;je("Loading owner intelligence coverage...");let[n,e,t,i,s,r,o]=await Promise.all([At("/api/owner/market/projects"),At("/api/owner/market/observations?limit=500"),At("/api/owner/development-cases?limit=500"),At("/api/owner/documents"),At("/api/owner/research/studies"),At("/api/owner/restore/history"),At("/api/owner/ops")]);return jp({projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:o}),je("Owner intelligence coverage loaded."),{projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:o}}async function Du(n,e={}){let t=bb();if(!t)throw new Error("Paste and save the owner token first.");return ze(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}async function Xf(n,e={}){let t=vb();if(!t)throw new Error("Paste and save the owner token first.");return ze(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function zC(n=[]){return Array.isArray(n)&&n.length?n.join(", "):"untagged"}function HC(n){return`
    <article class="ownerEvidenceItem ${p(n.status||"stored")}" data-owner-evidence="${p(n.id)}">
      <header>
        <span><small>${p(zC(n.tags))}</small><b>${p(n.title||"Owner evidence")}</b></span>
        <em>${p(n.status||"stored")} / ${p(n.chunkCount||0)} chunks</em>
      </header>
      <p>${p(n.filename||"Evidence file")}${n.sourceUrl?` / ${p(n.sourceUrl)}`:""}</p>
      <div class="ownerEvidenceMeta">
        <span>${p(n.indexMode||"stored")} index</span>
        <span>${p(n.updatedAt?Jf(n.updatedAt):"No date")}</span>
      </div>
      <button type="button" data-owner-evidence-action="delete" data-owner-evidence-id="${p(n.id)}">DELETE</button>
    </article>
  `}function GC(n,e){if(!e)return!0;let t=[n.title,n.filename,n.sourceUrl,n.status,n.indexMode,...n.tags||[]].join(" ").toLowerCase();return e.split(/\s+/).filter(Boolean).every(i=>t.includes(i))}function Tb(){let n=Pf.value.trim().toLowerCase(),e=Gp.filter(t=>GC(t,n));Uv.innerHTML=e.length?e.map(HC).join(""):Gp.length?'<p class="ownerEvidenceEmpty">No evidence documents match this filter.</p>':'<p class="ownerEvidenceEmpty">No evidence documents yet. Add the first transaction, rent, financing, legal, or site proof above.</p>'}function Xp(n={}){let e=Array.isArray(n.documents)?n.documents:[],t=n.summary||{};Gp=e,IT.innerHTML=`
    <span><b>${p(t.documents||e.length)}</b> DOCUMENTS</span>
    <span><b>${p(t.indexed||0)}</b> INDEXED</span>
    <span><b>${p(t.chunks||0)}</b> CHUNKS</span>
    <span>${p(t.embeddingProvider?"EMBEDDINGS ON":"LEXICAL SEARCH")}</span>
  `,NT.textContent=`${t.chunks||0} indexed chunks`,Tb()}async function ol(){if(!vb())return Xp({}),On(nl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;On("Loading evidence vault...");let n=await Xf("/api/owner/documents");return Xp(n),On("Evidence vault loaded."),n}async function WC(){let n=Mu.value.trim(),e=Tu.value.trim();if(!n)return Mu.focus();if(!e)return Tu.focus();On("Indexing evidence..."),await Xf("/api/owner/documents",{method:"POST",body:JSON.stringify({title:n,filename:Ov.value.trim()||`${n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"evidence"}.md`,mimeType:"text/markdown",sourceUrl:PT.value.trim(),tags:kv.value.split(",").map(t=>t.trim()).filter(Boolean),text:e})}),Op.reset(),await ol(),On("Evidence added. V8 reports can now retrieve it when relevant.")}async function qC(n){let e=n.getAttribute("data-owner-evidence-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",On("Press CONFIRM to delete this evidence document.");return}n.disabled=!0;try{await Xf(`/api/owner/documents/${encodeURIComponent(e)}`,{method:"DELETE"}),await ol(),On("Evidence deleted.")}catch(t){n.disabled=!1,On(t.message||"Evidence could not be deleted.","danger")}}}function Yf(n){return{strong_buy:"Strong buy",shortlist:"Shortlist",watch:"Watch",avoid:"Avoid",unknown:"Unknown"}[n]||"Watch"}function Ab(n=Xi){So.innerHTML='<option value="">No linked market project</option>'+n.map(e=>`<option value="${p(e.id)}">${p(e.name)}${e.area?` / ${p(e.area)}`:""}</option>`).join("")}function Yp(n){return[n.managementView,n.residentProfile,n.supplyThreat,n.rentalOutlook,n.resaleOutlook,n.sourceBasis].filter(e=>!String(e||"").trim()).length}function jC(){let n=Lv.value;return n?Iu.filter(e=>n==="incomplete"?Yp(e)>0:Yp(e)===0):Iu}function XC(n){let e=[n.area,n.state,n.propertyType,n.priceSegment].filter(Boolean).join(" / ")||"No project detail",t=n.ownerVerdict||n.strengths||n.weaknesses||"No founder verdict recorded.",i=Yp(n);return`
    <article class="ownerCaseItem ${p(n.verdict||"watch")}" data-owner-case="${p(n.id)}">
      <header>
        <span><small>${p(e)}</small><b>${p(n.projectName||"Development case")}</b></span>
        <em>${p(Yf(n.verdict))} / ${p(n.confidence||"medium")}</em>
      </header>
      <p>${p(t)}</p>
      <div class="ownerCaseMeta">
        <span>${p(n.rating||0)}/100</span>
        <span>${p(n.sourceBasis||"No source basis")}</span>
        <span>${p(n.observedAt?Jf(n.observedAt):"No date")}</span>
        ${i?`<span>${p(i)} gaps</span>`:"<span>complete</span>"}
      </div>
      <div class="ownerCaseItemActions">
        <button type="button" data-owner-case-action="edit" data-owner-case-id="${p(n.id)}">EDIT</button>
        <button type="button" data-owner-case-action="delete" data-owner-case-id="${p(n.id)}">DELETE</button>
      </div>
    </article>
  `}function Ou(n={}){let e=Array.isArray(n.cases)?n.cases:[];Jv=n,Iu=e;let t=n.summary||{},i=t.coverage||{},s=jC();MT.innerHTML=`
    <span><b>${p(t.total??e.length)}</b> CASES</span>
    <span><b>${p(t.shortlist||0)}</b> SHORTLIST</span>
    <span><b>${p(t.strong_buy||0)}</b> STRONG BUY</span>
    <span><b>${p(t.avoid||0)}</b> AVOID</span>
    <span><b>${p(i.areas||0)}</b> AREAS</span>
    <span><b>${p(i.incomplete||0)}</b> GAPS</span>
  `,AT.textContent=`${s.length} shown / ${t.matched??e.length} matched`,Nv.innerHTML=s.length?s.map(XC).join(""):'<p class="ownerCaseEmpty">No development cases match this filter yet. Add the first project opinion above.</p>'}function YC(){let n=new URLSearchParams;return Np.value.trim()&&n.set("q",Np.value.trim()),Dp.value&&n.set("verdict",Dp.value),n.set("limit","120"),n.toString()}async function gr(){if(!bb())return Ou({}),qt(nl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;qt("Loading development case library...");let[n,e]=await Promise.all([Du("/api/owner/market/projects"),Du(`/api/owner/development-cases?${YC()}`)]);return Xi=Array.isArray(n.projects)?n.projects:[],Ab(Xi),Ou(e),qt("Development case library loaded."),{projects:n,cases:e}}function Cb(){return Xi.find(n=>n.id===So.value)}function KC(){let n=Cb(),e=hr.value.trim()||n?.name||"";return{projectId:So.value,projectName:e,area:za.value.trim()||n?.area||"",state:Ha.value.trim()||n?.state||"",propertyType:Ga.value.trim()||n?.propertyType||"",developer:Wa.value.trim()||n?.developer||"",priceSegment:vv.value.trim(),targetBuyer:wv.value.trim(),targetTenant:Ev.value.trim(),strengths:Mv.value.trim(),weaknesses:Tv.value.trim(),managementView:Av.value.trim(),residentProfile:Cv.value.trim(),supplyThreat:Rv.value.trim(),rentalOutlook:Iv.value.trim(),resaleOutlook:Pv.value.trim(),ownerVerdict:Cf.value.trim(),verdict:bv.value,confidence:xv.value,rating:_v.value.trim(),observedAt:qu.value||new Date().toISOString(),sourceBasis:Rf.value.trim(),tags:Sv.value.split(",").map(t=>t.trim()).filter(Boolean)}}function Kf(){Ka="",Af.reset(),qu.value=new Date().toISOString().slice(0,10),Dv.textContent="Add Development Opinion",Eu.textContent="ADD CASE",If.hidden=!0}function JC(n){Ka=n.id||"",So.value=n.projectId||"",hr.value=n.projectName||"",za.value=n.area||"",Ha.value=n.state||"",Ga.value=n.propertyType||"",Wa.value=n.developer||"",vv.value=n.priceSegment||"",bv.value=n.verdict||"watch",xv.value=n.confidence||"medium",_v.value=n.rating||"",qu.value=n.observedAt?String(n.observedAt).slice(0,10):new Date().toISOString().slice(0,10),Sv.value=Array.isArray(n.tags)?n.tags.join(", "):"",wv.value=n.targetBuyer||"",Ev.value=n.targetTenant||"",Mv.value=n.strengths||"",Tv.value=n.weaknesses||"",Av.value=n.managementView||"",Cv.value=n.residentProfile||"",Rv.value=n.supplyThreat||"",Iv.value=n.rentalOutlook||"",Pv.value=n.resaleOutlook||"",Cf.value=n.ownerVerdict||"",Rf.value=n.sourceBasis||"",Dv.textContent=`Edit ${n.projectName||"Development Case"}`,Eu.textContent="SAVE CASE",If.hidden=!1,Af.scrollIntoView({behavior:"smooth",block:"nearest"}),qt("Editing existing development case. Save to update, or cancel edit.")}function ZC(n){let e=n.getAttribute("data-owner-case-id"),t=Iu.find(i=>i.id===e);if(!t)return qt("Case not found in the current filtered list. Refresh and try again.","warning");JC(t)}async function QC(){let n=KC();if(!n.projectName)return hr.focus();let e=!!Ka;qt(e?"Updating development case...":"Adding development case...");let t=e?`/api/owner/development-cases/${encodeURIComponent(Ka)}`:"/api/owner/development-cases";await Du(t,{method:e?"PATCH":"POST",body:JSON.stringify(n)}),Kf(),await gr(),qt(e?"Development case updated.":"Development case added. Apex can now match it in answers and deal reports.")}async function eR(n){let e=n.getAttribute("data-owner-case-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",qt("Press CONFIRM to delete this development case.");return}n.disabled=!0;try{await Du(`/api/owner/development-cases/${encodeURIComponent(e)}`,{method:"DELETE"}),Ka===e&&Kf(),await gr(),qt("Development case deleted.")}catch(t){n.disabled=!1,qt(t.message||"Development case could not be deleted.","danger")}}}function tR(n){return String(n||"other").replaceAll("_"," ")}function Jf(n){if(!n)return"No date";try{return new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n))}catch{return String(n).slice(0,10)}}function Rb(n=[]){pr.innerHTML='<option value="">Area-only observation</option>'+n.map(e=>`<option value="${p(e.id)}">${p(e.name)}${e.area?` / ${p(e.area)}`:""}</option>`).join("")}function nR(n){let e=[n.area,n.state,n.propertyType,n.tenure].filter(Boolean).join(" / ")||"No project detail";return`
    <article class="ownerMarketItem">
      <header><span><small>${p(e)}</small><b>${p(n.name)}</b></span><em>${p(n.observationCount||0)} obs</em></header>
      <p>${p(n.developer||n.status||"Add observations to make this project useful.")}</p>
    </article>
  `}function iR(n){let e=n.project?.name||n.projectName||n.area||"Area observation",t=n.freshness?.status||"unknown",i=Number.isFinite(Number(n.freshness?.ageDays))?`${n.freshness.ageDays}d`:"age n/a",s=n.trend?`${n.trend.direction}${n.trend.percentChange===null||n.trend.percentChange===void 0?"":` ${n.trend.percentChange>0?"+":""}${n.trend.percentChange}%`}`:"no trend",r=n.value===null||n.value===void 0?"Qualitative":`${n.value}${n.unit?` ${n.unit}`:""}`;return`
    <article class="ownerMarketItem ${p(t)}" data-owner-observation="${p(n.id)}">
      <header>
        <span><small>${p(tR(n.metricType))} / ${p(Jf(n.observedAt))}</small><b>${p(e)}</b></span>
        <em>${p(t)} / ${p(i)}</em>
      </header>
      <p>${p(r)}. ${p(n.notes||"No notes recorded.")}</p>
      <div class="ownerMarketMeta">
        <span>${p(n.confidence||"medium")} confidence</span>
        <span>${p(n.sourceType||"owner observation")}</span>
        <span>${p(s)}</span>
      </div>
      <button type="button" data-owner-market-action="delete-observation" data-owner-market-id="${p(n.id)}">DELETE</button>
    </article>
  `}function Ib(n={},e={}){let t=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(e.observations)?e.observations:[];Xi=t,Rb(t),jT.textContent=String(t.length),XT.textContent=String(e.summary?.matched||i.length),ST.innerHTML=`
    <span><b>${p(t.length)}</b> PROJECTS</span>
    <span><b>${p(n.summary?.observations??i.length)}</b> OBSERVATIONS</span>
    <span><b>${p(e.summary?.fresh||0)}</b> FRESH</span>
    <span><b>${p(e.summary?.stale||0)}</b> STALE</span>
  `,$v.innerHTML=t.length?t.map(nR).join(""):'<p class="ownerMarketEmpty">No market projects yet. Add one above, then attach observations.</p>',Lf.innerHTML=i.length?i.map(iR).join(""):'<p class="ownerMarketEmpty">No observations match this filter yet.</p>'}function sR(){let n=new URLSearchParams;return Fp.value.trim()&&n.set("area",Fp.value.trim()),Bp.value&&n.set("metricType",Bp.value),Vp.value&&n.set("freshness",Vp.value),n.set("limit","120"),n.toString()}async function Ai(){if(!od())return $v.innerHTML='<p class="ownerMarketEmpty">Owner token required before loading market evidence.</p>',Lf.innerHTML='<p class="ownerMarketEmpty">Paste your owner token above, then press SAVE.</p>',St(nl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;St("Loading owner market intelligence...");let n=sR(),[e,t]=await Promise.all([xo("/api/owner/market/projects"),xo(`/api/owner/market/observations?${n}`)]);return Ib(e,t),St("Market intelligence loaded."),{projects:e,observations:t}}function hn(){xf.hidden=!0,bf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerMarketOpen")}function pn(){Sf.hidden=!0,_f.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerCaseOpen")}function fn(){Ef.hidden=!0,wf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerEvidenceOpen")}function en(){Gu.hidden=!0,mf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerIntelOpen")}async function Pb(){Qt("owner"),kn(),cn(),un(),dn(),en(),hn(),pn(),fn(),ln(),wn(),En(),Gu.hidden=!1,mf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerIntelOpen"),jn(window.localStorage.getItem(ws)||Si.value);try{await Ts()}catch(n){je(n.message||"Owner intelligence console is unavailable.","danger")}}async function ad(){Qt("cases"),kn(),cn(),un(),dn(),en(),hn(),fn(),ln(),wn(),En(),Sf.hidden=!1,_f.setAttribute("aria-expanded","true"),document.body.classList.add("ownerCaseOpen"),jn(window.localStorage.getItem(ws)||$a.value),qu.value||=new Date().toISOString().slice(0,10);try{await gr()}catch(n){qt(n.message||"Development case library is unavailable.","danger")}}async function ld(){Qt("evidence"),kn(),cn(),un(),dn(),en(),hn(),pn(),ln(),wn(),En(),Ef.hidden=!1,wf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerEvidenceOpen"),jn(window.localStorage.getItem(ws)||qa.value);try{await ol()}catch(n){On(n.message||"Evidence vault is unavailable.","danger")}}async function cd(){Qt("market"),kn(),cn(),un(),dn(),en(),pn(),fn(),ln(),wn(),En(),xf.hidden=!1,bf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerMarketOpen"),jn(window.localStorage.getItem(ws)||Va.value),Au.value||=new Date().toISOString().slice(0,10);try{await Ai()}catch(n){St(n.message||"Owner market console is unavailable.","danger")}}function rR(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"project"}function oR(n=""){let e=String(n||"");return Kv.find(t=>t.id===e)||Xi.find(t=>t.id===e)||null}function Ln(n,e){n&&!n.value&&e&&(n.value=e)}function Lb(n,e){!n||!e||Array.from(n.options).some(t=>t.value===e)&&(n.value=e)}function aR(n){return[n.name,n.area,n.state,n.propertyType].filter(Boolean).join(", ")}function lR(n){Lb(So,n.id),Ln(hr,n.name),Ln(za,n.area),Ln(Ha,n.state),Ln(Ga,n.propertyType),Ln(Wa,n.developer),Ln(Rf,"Owner console action queue"),hr.scrollIntoView({behavior:"smooth",block:"center"}),Cf.focus(),qt(`Case note prepared for ${n.name}. Add your founder judgment, then save.`)}function cR(n){Lb(pr,n.id),Ln(fo,n.area),Ln(Bv,"owner ground check"),Ln(Vv,`${n.name}: update the latest rental, resale, supply, management, or site signal.`),Au.value||=new Date().toISOString().slice(0,10),pr.scrollIntoView({behavior:"smooth",block:"center"}),Fv.focus(),St(`Market signal prepared for ${n.name}. Choose the metric and add the latest evidence.`)}function uR(n){Ln(Mu,`${n.name} evidence proof`),Ln(Ov,`${rR(n.name)}-evidence.md`),Ln(kv,aR(n)),Ln(Tu,`Project: ${n.name}
Area: ${n.area||"Not recorded"}
Evidence type:
Source/date:
Notes:
`),Mu.scrollIntoView({behavior:"smooth",block:"center"}),Tu.focus(),On(`Evidence shell prepared for ${n.name}. Paste the proof, source, and date before saving.`)}async function dR(n,e){let t=oR(e);if(!t){je("Project could not be found. Refresh owner intelligence and try again.","warning");return}n==="case"&&(await ad(),lR(t)),n==="signal"&&(await cd(),cR(t)),n==="proof"&&(await ld(),uR(t))}async function hR(){St("Adding project...");let n={name:DT.value.trim(),area:OT.value.trim(),state:kT.value.trim(),propertyType:UT.value.trim(),developer:FT.value.trim(),tenure:BT.value.trim(),completionYear:VT.value.trim(),status:$T.value,aliases:zT.value.split(",").map(e=>e.trim()).filter(Boolean)};await xo("/api/owner/market/projects",{method:"POST",body:JSON.stringify(n)}),kp.reset(),await Ai(),St("Project added.")}async function pR(){let n=Xi.find(t=>t.id===pr.value);if(!n&&!fo.value.trim())throw fo.focus(),new Error("Add an area or link the observation to a project.");St("Adding observation...");let e={projectId:pr.value,area:fo.value.trim()||n?.area||"",state:n?.state||"",projectName:n?.name||"",metricType:Fv.value,value:HT.value.trim(),unit:GT.value.trim(),observedAt:Au.value,sourceType:Bv.value.trim()||"owner observation",confidence:WT.value,notes:Vv.value.trim()};await xo("/api/owner/market/observations",{method:"POST",body:JSON.stringify(e)}),Up.reset(),Au.value=new Date().toISOString().slice(0,10),await Ai(),St("Observation added. Apex can now match it in chat and deal reports.")}async function fR(){let n=gp.value.trim();if(!n)return gp.focus();let e;try{e=JSON.parse(n)}catch{throw new Error("Import must be valid JSON with projects and/or observations arrays.")}let t=Array.isArray(e.projects)?e.projects:[],i=Array.isArray(e.observations)?e.observations:[];if(!t.length&&!i.length)throw new Error("Import JSON must include at least one project or observation.");if(t.length+i.length>200)throw new Error("Each import is limited to 200 combined projects and observations.");St("Importing owner market batch...");let s=await xo("/api/owner/market/import",{method:"POST",body:JSON.stringify({projects:t,observations:i})});gp.value="",await Ai();let r=Array.isArray(s.skipped)?s.skipped.length:0;St(`Imported ${s.imported?.projects||0} project(s) and ${s.imported?.observations||0} observation(s)${r?`; ${r} skipped.`:"."}`,r?"warning":"")}async function mR(n){let e=n.getAttribute("data-owner-market-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",St("Press CONFIRM to delete this observation.");return}n.disabled=!0;try{await xo(`/api/owner/market/observations/${encodeURIComponent(e)}`,{method:"DELETE"}),await Ai(),St("Observation deleted.")}catch(t){n.disabled=!1,St(t.message||"Observation could not be deleted.","danger")}}}function ar(n,e=[],t=""){return e.length?`
    <section class="analysisSection ${p(t)}">
      <h3>${p(n)}</h3>
      <ul>${e.map(i=>`<li>${p(i)}</li>`).join("")}</ul>
    </section>
  `:""}function Nn(n){return`RM ${Math.round(Number(n)||0).toLocaleString("en-MY")}`}function Nb(n){return!n||!Array.isArray(n.items)||!n.items.length?[]:[`Down payment at ${n.loanMarginPercent}% loan margin: ${Nn(n.downPayment)}`,...n.items.map(e=>`${e.label}: ${Nn(e.amount)}`),`Total duties and fees: ${Nn(n.totalTransactionCosts)} (about ${n.costAsPercentOfPrice}% of price)`,`Estimated cash to start: ${Nn(n.estimatedCashToStart)}`,...n.rpgt?.note?[`RPGT: ${n.rpgt.note}`]:[],...n.disclaimer?[n.disclaimer]:[]]}function gR(n={}){let e=Array.isArray(n.observations)?n.observations:[];if(!e.length)return"";let t=Array.isArray(n.trends)?n.trends:[],i=n.summary||{},s=t.slice(0,4).map(o=>{let a=o.percentChange===null||o.percentChange===void 0?"":` ${Number(o.percentChange)>0?"+":""}${o.percentChange}%`;return`<span class="marketTrend ${p(o.direction)}"><small>${p(String(o.metricType||"").replaceAll("_"," "))}</small><b>${p(o.direction)}${p(a)}</b></span>`}).join(""),r=e.slice(0,6).map(o=>{let a=o.freshness?.status||"stale",l=Number(o.freshness?.ageDays||0),c=o.notes||(o.value===null?"Qualitative observation":`${o.value}${o.unit?` ${o.unit}`:""}`),u=c.length>420?`${c.slice(0,417).trim()}...`:c;return`
      <li>
        <span><b>${p(o.title)}</b><small>${p(u)}</small></span>
        <em class="${p(a)}">${p(a)} / ${p(l)}d</em>
      </li>
    `}).join("");return`
    <section class="analysisMarketPulse">
      <header><h3>OWNER MARKET PULSE</h3><span>${p(i.matched||e.length)} MATCHED</span></header>
      ${s?`<div class="marketTrends">${s}</div>`:""}
      <ul>${r}</ul>
      <p>${p(i.warning||"Check the observation dates before relying on this market read.")}</p>
    </section>
  `}function yR(n={}){let e=n.decisionFocus||{},t=n.challengeMode||{};return!e.body&&!t.message?"":`
    <section class="analysisDecisionFocus ${p(e.tone||"neutral")}">
      <span><small>${p(e.label||"Decision focus")}</small><b>${p(e.body||n.summary||"")}</b></span>
      ${t.message?`<p>${p(t.message)}</p>`:""}
    </section>
  `}function vR(n={}){if(!n.message||n.status==="inactive")return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisPersonalChallenge ${p(n.status||"challenge")}">
      <header>
        <span><small>V3.3 PERSONALIZED CHALLENGE</small><b>${p(n.label||"Personalized challenge")}</b></span>
        <em>${p(n.status||"challenge")}</em>
      </header>
      <p>${p(n.message)}</p>
      ${n.profileBasis?`<blockquote>${p(n.profileBasis)}</blockquote>`:""}
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="personalChallengeCheck ${p(t.status||"check")}">
              <i>${p(t.status||"check")}</i>
              <span><b>${p(t.label)}</b><small>${p(t.action)}</small></span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function Ra(n,e={},t="items"){if(!e.summary)return"";let i=Array.isArray(e[t])?e[t]:[],s=e.status||e.mode||"check",r=String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"check";return`
    <section class="analysisV3Insight ${p(r)}">
      <header>
        <span><small>${p(n)}</small><b>${p(e.summary)}</b></span>
        <em>${p(s)}</em>
      </header>
      ${i.length?`
        <div>
          ${i.map(o=>{let a=o.subject||o.label||o.type||"Memory signal",l=o.similarity?`${o.similarity}% similar / ${o.verdict||"saved"}`:o.status||o.type||"",c=o.reason||o.basis||o.detail||o.memoryA||"",u=o.memoryB?`Conflict: ${o.memoryB}`:"";return`
              <article class="v3InsightItem ${p(o.status||e.status||"check")}">
                <i>${p(l)}</i>
                <span>
                  <b>${p(a)}</b>
                  ${c?`<small>${p(c)}</small>`:""}
                  ${u?`<small>${p(u)}</small>`:""}
                  ${o.action?`<em>${p(o.action)}</em>`:""}
                </span>
              </article>
            `}).join("")}
        </div>
      `:""}
    </section>
  `}function bR(n={}){if(!n.label)return"";let e=Array.isArray(n.flags)?n.flags.slice(0,4):[];return`
    <section class="analysisReadiness">
      <header>
        <span><small>INVESTOR READINESS</small><b>${p(n.label)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      ${n.summary?`<p>${p(n.summary)}</p>`:""}
      ${e.length?`<ul>${e.map(t=>`<li>${p(t)}</li>`).join("")}</ul>`:""}
    </section>
  `}function xR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisProductExperience">
      <header>
        <span><small>V5 PRODUCT EXPERIENCE</small><b>${p(n.summary)}</b></span>
        <em>${p(n.onboardingCompleteness||0)}%</em>
      </header>
      <div class="productExperienceMeta">
        <span><small>MODE</small><b>${p(n.mode||"Balanced investor review")}</b></span>
        <span><small>STYLE</small><b>${p(n.explanationStyle||"Balanced explanation")}</b></span>
        <span><small>NEXT</small><b>${p(n.nextBestAction||"Clarify the user job before relying on format.")}</b></span>
      </div>
      ${e.length?`
        <div class="productExperienceChecks">
          ${e.map(t=>`
            <article class="productExperienceCheck ${p(t.status||"missing")}">
              <i>${p(t.status||"missing")}</i>
              <span><b>${p(t.label)}</b><em>${p(t.action)}</em></span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function _R(n=[]){return n.length?`
    <section class="analysisEvidence">
      <h3>EVIDENCE CHECKLIST</h3>
      <div>
        ${n.map(e=>`
          <article class="evidenceItem ${p(e.status)}">
            <i>${p(e.status)}</i>
            <span><b>${p(e.label)}</b><small>${p(e.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `:""}function SR(n={}){if(!n.summary)return"";let e=Array.isArray(n.gates)?n.gates:[],t=Array.isArray(n.criticalGaps)?n.criticalGaps:[];return`
    <section class="analysisEvidenceEngine ${p(n.status||"unknown")}">
      <header>
        <span><small>V4.0 EVIDENCE ENGINE</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.recommendationGate||"Evidence gate not calculated.")}</p>
      ${t.length?`<ul>${t.map(i=>`<li>${p(i)}</li>`).join("")}</ul>`:""}
      ${e.length?`
        <div>
          ${e.map(i=>`
            <article class="evidenceGate ${p(i.status||"missing")}">
              <i>${p(i.status||"missing")}</i>
              <span>
                <b>${p(i.label)} <small>${p(i.score||0)}/100</small></b>
                ${i.proof?`<small>${p(i.proof)}</small>`:""}
                ${i.gap?`<small>${p(i.gap)}</small>`:""}
                <em>${p(i.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function wR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps ${p(n.status||"unknown")}">
      <header>
        <span><small>V4.1 TRANSACTION COMPARABLES</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.valuePosition||"Comparable value position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck ${p(t.status||"missing")}">
              <i>${p(t.status||"missing")}</i>
              <span>
                <b>${p(t.label)}</b>
                ${t.proof?`<small>${p(t.proof)}</small>`:""}
                ${t.gap?`<small>${p(t.gap)}</small>`:""}
                <em>${p(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function ER(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisRentalEvidence ${p(n.status||"unknown")}">
      <header>
        <span><small>V4.2 ACHIEVED RENTAL EVIDENCE</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.coveragePosition||"Rental coverage is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck rentalEvidenceCheck ${p(t.status||"missing")}">
              <i>${p(t.status||"missing")}</i>
              <span>
                <b>${p(t.label)}</b>
                ${t.proof?`<small>${p(t.proof)}</small>`:""}
                ${t.gap?`<small>${p(t.gap)}</small>`:""}
                <em>${p(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function MR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisFinancingEvidence ${p(n.status||"unknown")}">
      <header>
        <span><small>V4.3 FINANCING + VALUATION</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.affordabilityPosition||"Financing affordability is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck financingEvidenceCheck ${p(t.status||"missing")}">
              <i>${p(t.status||"missing")}</i>
              <span>
                <b>${p(t.label)}</b>
                ${t.proof?`<small>${p(t.proof)}</small>`:""}
                ${t.gap?`<small>${p(t.gap)}</small>`:""}
                <em>${p(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function TR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisSupplyEvidence ${p(n.status||"unknown")}">
      <header>
        <span><small>V4.4 SUPPLY + ABSORPTION</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.competitionPosition||"Supply competition position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck supplyEvidenceCheck ${p(t.status||"missing")}">
              <i>${p(t.status||"missing")}</i>
              <span>
                <b>${p(t.label)}</b>
                ${t.proof?`<small>${p(t.proof)}</small>`:""}
                ${t.gap?`<small>${p(t.gap)}</small>`:""}
                <em>${p(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function AR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisSiteEvidence ${p(n.status||"unknown")}">
      <header>
        <span><small>V4.5 SITE + MANAGEMENT</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.livedQualityPosition||"Site and management position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck siteEvidenceCheck ${p(t.status||"missing")}">
              <i>${p(t.status||"missing")}</i>
              <span>
                <b>${p(t.label)}</b>
                ${t.proof?`<small>${p(t.proof)}</small>`:""}
                ${t.gap?`<small>${p(t.gap)}</small>`:""}
                <em>${p(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function CR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisLegalEvidence ${p(n.status||"unknown")}">
      <header>
        <span><small>V4.6 LEGAL + TRANSACTION</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.transactionPosition||"Legal transaction position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck legalEvidenceCheck ${p(t.status||"missing")}">
              <i>${p(t.status||"missing")}</i>
              <span>
                <b>${p(t.label)}</b>
                ${t.proof?`<small>${p(t.proof)}</small>`:""}
                ${t.gap?`<small>${p(t.gap)}</small>`:""}
                <em>${p(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function RR(n={}){let e=Array.isArray(n.tasks)?n.tasks:[];return e.length?`
    <section class="analysisDiligence">
      <header><span><small>DUE DILIGENCE PACK</small><b>${p(n.summary||"Clear these tasks before commitment.")}</b></span></header>
      <div>
        ${e.map(t=>`
          <article class="diligenceTask ${p(t.status)} ${p(t.priority)}">
            <i>${p(t.priority)}</i>
            <span><b>${p(t.owner)} / ${p(t.label)}</b><small>${p(t.action)}</small></span>
            <em>${p(t.status)}</em>
          </article>
        `).join("")}
      </div>
    </section>
  `:""}function IR(n={}){if(!n.summary)return"";let e=Array.isArray(n.assumptions)?n.assumptions:[];return`
    <section class="analysisStress ${p(n.status||"unknown")}">
      <header>
        <span><small>STRESS ENVELOPE</small><b>${p(n.summary)}</b></span>
        <em>${p(n.status||"unknown")}</em>
      </header>
      <div class="stressReadings">
        <span><small>BASE TRUE HOLDING</small><b>${p(n.baseTrueHolding||"Need rent proof")}</b></span>
        <span><small>STRESSED HOLDING</small><b>${p(n.stressedTrueHolding||"Need rent and instalment")}</b></span>
        <span><small>RESERVE SURVIVAL</small><b>${p(n.reserveSurvivalMonths===null?"Not applicable":`${n.reserveSurvivalMonths} months`)}</b></span>
      </div>
      ${e.length?`
        <div class="stressAssumptions">
          ${e.map(t=>`
            <span class="${p(t.source)}"><small>${p(t.source)}</small><b>${p(t.label)}</b><em>${p(t.value)}</em></span>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function PR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisPortfolioGate ${p(n.status||"unknown")}">
      <header>
        <span><small>PORTFOLIO EXPANSION GATE</small><b>${p(n.summary)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      <p>${p(n.nextPropertyRule||"Do not scale until the current property is proven.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="portfolioCheck ${p(t.status)}">
              <i>${p(t.status)}</i>
              <span><b>${p(t.label)}</b><small>${p(t.action)}</small></span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function LR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisMarketCycle ${p(n.status||"watch")}">
      <header>
        <span><small>MARKET CYCLE / LIQUIDITY</small><b>${p(n.summary)}</b></span>
        <em>${p(n.status||"watch")}</em>
      </header>
      <div class="marketCycleReadings">
        <span><small>CYCLE</small><b>${p(n.cycle||"Cycle unclear")}</b></span>
        <span><small>LIQUIDITY</small><b>${p(n.liquidity||"Liquidity must be proven")}</b></span>
      </div>
      ${e.length?`<div>${e.map(t=>`
        <article class="marketCycleCheck ${p(t.status)}">
          <i>${p(t.status)}</i>
          <span><b>${p(t.label)}</b><small>${p(t.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function NR(n={}){if(!n.summary)return"";let e=Array.isArray(n.triggers)?n.triggers:[];return`
    <section class="analysisHoldExit ${p(n.action||"monitor")}">
      <header>
        <span><small>HOLD / REFINANCE / EXIT</small><b>${p(n.summary)}</b></span>
        <em>${p(n.action||"monitor")}</em>
      </header>
      <p>${p(n.reviewCadence||"Review annually and on trigger events.")}</p>
      ${e.length?`<div>${e.map(t=>`
        <article class="holdExitTrigger ${p(t.status)}">
          <i>${p(t.status)}</i>
          <span><b>${p(t.label)}</b><small>${p(t.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function DR(n={}){if(!n.summary)return"";let e=Array.isArray(n.conditions)?n.conditions:[];return`
    <section class="analysisDecisionSeal ${p(n.status||"conditional")}">
      <header>
        <span><small>V1 DECISION SEAL</small><b>${p(n.label||"V1 Conditional Only")}</b></span>
        <em>${p(n.status||"conditional")}</em>
      </header>
      <p>${p(n.summary)}</p>
      ${e.length?`<div>${e.map(t=>`
        <article class="sealCondition ${p(t.status)}">
          <i>${p(t.status)}</i>
          <span><b>${p(t.label)}</b><small>${p(t.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function du(n,e={},t="FOCUS",i=""){if(!e.summary)return"";let s=Array.isArray(e.checks)?e.checks:[],r=e.status||"watch";return`
    <section class="analysisV2Workflow ${p(r)}">
      <header>
        <span><small>${p(n)}</small><b>${p(e.summary)}</b></span>
        <em>${p(r)}</em>
      </header>
      ${i?`<p><b>${p(t)}</b> ${p(i)}</p>`:""}
      ${s.length?`<div>${s.map(o=>`
        <article class="v2WorkflowCheck ${p(o.status)}">
          <i>${p(o.status)}</i>
          <span><b>${p(o.label)}</b><small>${p(o.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function OR(n={}){let e=Array.isArray(n.actions)?n.actions:[];return e.length?`
    <section class="analysisExecution">
      <header>
        <span><small>EXECUTION CALIBRATION</small><b>${p(n.summary||"Use these guardrails before offer, booking, renovation, tenant approval, or exit.")}</b></span>
        <em>${p(n.posture||"Verify before offer")}</em>
      </header>
      <div class="executionOffer">
        <span><small>OPENING ANCHOR</small><b>${p(n.openingAnchor||"Need value proof")}</b></span>
        <span><small>MAXIMUM OFFER</small><b>${p(n.maximumOffer||"Need value/rent proof")}</b></span>
        <span><small>WALK-AWAY RULE</small><b>${p(n.walkAway||"Do not proceed under pressure.")}</b></span>
      </div>
      <div class="executionActions">
        ${e.map(t=>`
          <article class="executionAction ${p(t.status)}">
            <i>${p(t.status)}</i>
            <span><b>${p(t.lane)} / ${p(t.label)}</b><small>${p(t.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `:""}function kR(n={}){let e=Array.isArray(n.signals)?n.signals:[];if(!e.length)return"";let t=n.profile||{};return`
    <section class="analysisLearning">
      <header><span><small>LEARNING LOOP</small><b>${p(n.summary||"Matched private learning for this report.")}</b></span></header>
      ${t.approvedCount?`
        <div class="learningProfile">
          <span><small>MEMORY PROFILE</small><b>${p(t.investorType||"Profile building")} / ${p(t.riskStyle||"Needs more memory")}</b></span>
          <span><small>COMPLETENESS</small><b>${p(t.completeness||0)}%</b></span>
        </div>
      `:""}
      <div>
        ${e.map(i=>`
          <article class="learningSignal ${p(i.type)}">
            <i>${p(i.type)}</i>
            <span><b>${p(i.label)}</b><small>${p(i.body)}</small><em>${p(i.action)}</em></span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function hu(n){let e=Number(n||0);return e>=75?"strong":e>=55?"watch":"weak"}function _p(n={},e,t=0){let i=(n.dimensions||[]).find(s=>s.key===e);return Number(i?.score??t??0)}function UR(n={},e,t=0){let i=(n.stages||[]).find(s=>e.test(String(s.name||"")));return Number(i?.score??t??0)}function FR(n={}){let e=qi(n.recommendationBlockers),t=qi(n.watchouts),i=qi(n.missingEvidence),s=qi(n.nextActions),r=e[0]||t[0]||n.counterThesis||"No single dominant risk is proven yet; keep checking the weak evidence lane.",o=i[0]||"No urgent proof gap listed, but live transaction, rent, site, financing, and legal checks still matter.",a=s[0]||o,l=_p(n,"property"),c=UR(n,/holding/i,Number(n.achievedRentalEvidence?.score||n.investorReadiness?.score||0)),u=_p(n,"exit"),d=_p(n,"evidence",n.confidence);return{verdict:n.verdict||"INVESTIGATE",score:Number(n.averageScore||0),confidence:Number(n.confidence||0),reason:n.decisionFocus?.body||n.summary||"Apex needs more proof before upgrading the decision.",risk:r,missingProof:o,nextAction:a,scores:[{label:"Property Quality",value:l,status:hu(l)},{label:"Rental Safety",value:c,status:hu(c)},{label:"Exit Liquidity",value:u,status:hu(u)},{label:"Evidence Confidence",value:d,status:hu(d)}]}}function BR(n={}){let e=FR(n);return`
    <section class="dealSnapshot ${p(String(e.verdict).toLowerCase())}" aria-label="Deal screening snapshot">
      <header>
        <span><small>DEAL SCREEN</small><b>${p(e.verdict)}</b></span>
        <em>${p(e.score)}/100 / ${p(e.confidence)}% confidence</em>
      </header>
      <p>${p(e.reason)}</p>
      <div class="dealSnapshotGrid">
        <article><small>Main risk</small><b>${p(e.risk)}</b></article>
        <article><small>Missing proof</small><b>${p(e.missingProof)}</b></article>
        <article><small>Next action</small><b>${p(e.nextAction)}</b></article>
      </div>
      <div class="dealSnapshotScores">
        ${e.scores.map(t=>`
          <article class="${p(t.status)}">
            <span><small>${p(t.label)}</small><b>${p(t.value)}/100</b></span>
            <i><em style="width:${Math.max(0,Math.min(100,Number(t.value)||0))}%"></em></i>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Fa(n,e=1){let t=Number(n);return Number.isFinite(t)?`${(t*100).toFixed(e)}%`:"Not available"}function VR(n={}){return!n||n.status==="incomplete"?["Residential DCF",...(n?.issues||["Minimum DCF inputs are incomplete."]).map(e=>`- ${e}`)]:["Residential DCF and market-value screen",`Status: ${n.status}`,`${n.indicationLabel}: ${Nn(n.indicatedValue)}`,`Formal market-value label: ${n.marketValue?Nn(n.marketValue):"Not established"}`,`Income DCF: ${Nn(n.incomeApproach?.dcfValue)}`,`Comparison indication: ${n.comparisonApproach?.value?Nn(n.comparisonApproach.value):"Need 3 recent verified sales"}`,`Purchase price: ${Nn(n.purchasePrice)}`,`Price variance: ${Fa(n.priceVariance)}`,`Year 1 DSCR: ${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"Not available"}`,`Levered equity IRR: ${Fa(n.buyerReturns?.leveredEquityIrr)}`,`Evidence: ${n.evidence?.score||0}/100`,...(n.evidence?.missing||[]).map(e=>`- Missing: ${e}`),...(n.warnings||[]).map(e=>`- Warning: ${e}`),n.disclaimer||""].filter(Boolean)}function Db(n={}){if(!n)return"";if(n.status==="incomplete")return`
      <section class="dcfValuationResult incomplete">
        <header><span><small>DCF / VALUE MODEL</small><b>INPUTS INCOMPLETE</b></span><em>NO VALUE PRODUCED</em></header>
        <ul>${(n.issues||[]).map(t=>`<li>${p(t)}</li>`).join("")}</ul>
      </section>
    `;let e=!!n.marketValue;return`
    <section class="dcfValuationResult ${e?"supported":"screening"}">
      <header>
        <span><small>RESIDENTIAL DCF / COMPARISON</small><b>${p(n.indicationLabel||"Valuation screen")}</b></span>
        <em>${e?"MARKET-SUPPORTED":"SCREENING ONLY"}</em>
      </header>
      <div class="dcfValuationHero">
        <span><small>INDICATED VALUE</small><b>${p(Nn(n.indicatedValue))}</b></span>
        <span><small>MARKET VALUE LABEL</small><b>${e?p(Nn(n.marketValue)):"NOT ESTABLISHED"}</b></span>
        <span><small>PRICE POSITION</small><b>${p(Fa(n.priceVariance))}</b></span>
      </div>
      <div class="dcfValuationMetrics">
        <span><small>Income DCF</small><b>${p(Nn(n.incomeApproach?.dcfValue))}</b></span>
        <span><small>Completed-sale comparison</small><b>${n.comparisonApproach?.value?p(Nn(n.comparisonApproach.value)):"Need 3 verified sales"}</b></span>
        <span><small>Terminal concentration</small><b>${p(Fa(n.incomeApproach?.terminalConcentration))}</b></span>
        <span><small>Year 1 DSCR</small><b>${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"N/A"}</b></span>
        <span><small>Levered equity IRR</small><b>${p(Fa(n.buyerReturns?.leveredEquityIrr))}</b></span>
        <span><small>Evidence strength</small><b>${p(n.evidence?.score||0)}/100</b></span>
      </div>
      ${(n.evidence?.missing||[]).length?`<div class="dcfValuationGaps"><b>Evidence still needed</b><ul>${n.evidence.missing.map(t=>`<li>${p(t)}</li>`).join("")}</ul></div>`:""}
      ${(n.warnings||[]).length?`<div class="dcfValuationWarnings"><b>Challenge back</b><ul>${n.warnings.map(t=>`<li>${p(t)}</li>`).join("")}</ul></div>`:""}
      <p>${p(n.disclaimer||"")}</p>
    </section>
  `}function $R(n){document.body.classList.add("conversationActive");let e=document.createElement("article");e.className="message jarvis dcfValuationMessage",e.innerHTML=`${Db(n)}<div class="analysisActions"><button type="button">DOWNLOAD DCF WORKBOOK</button></div>`,e.querySelector("button")?.addEventListener("click",()=>void Qf(n)),document.querySelector("#valuationResult").replaceChildren(e)}function Zf(n,e=[],t={},i=Vt){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=crypto.randomUUID();tl.set(r,n),i===Vt&&(bo=r),s.dataset.analysisId=r;let o=String(n.verdict||"investigate").toLowerCase(),a=(n.stages||[]).map(f=>`
    <li class="analysisStage">
      <span class="stageNumber">0${p(f.number)}</span>
      <span class="stageBody">
        <b>${p(f.name)}</b>
        <small>${p(f.summary)}</small>
      </span>
      <span class="stageReading">
        <i class="stageStatus ${p(f.status)}">${p(f.status)}</i>
        <em>${p(f.score)}/100</em>
      </span>
    </li>
  `).join(""),l=(n.metrics||[]).map(f=>`
    <span class="analysisMetric"><small>${p(f.label)}</small><b>${p(f.value)}</b></span>
  `).join(""),c=(n.dimensions||[]).map(f=>`
    <article class="analysisDimension ${p(f.status)}">
      <span><small>${p(f.label)}</small><b>${p(f.score)}/100</b><em>${p(f.status)}</em></span>
      <i><em style="width:${Math.max(0,Math.min(100,Number(f.score)||0))}%"></em></i>
    </article>
  `).join(""),u=ed(n),d=(n.scenarios||[]).map(f=>`
    <article class="analysisScenario ${p(f.status)}">
      <span><b>${p(f.label)}</b><small>${p(f.assumption)}</small></span>
      <em>${p(f.value)}/mo</em>
    </article>
  `).join(""),h=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date);if(s.className="message jarvis analysisMessage",s.innerHTML=`
    <header class="analysisReportTitle">
      <span>A</span><div><small>APEX ANALYTIC</small><h1>DEAL DECISION REPORT</h1><p>${p(Eo(n))} / ${p(h)}</p></div>
    </header>
    ${ab(t)}
    <div class="analysisHeader">
      <span><small>SEVEN-STAGE VERDICT</small><b>${p(n.verdict)}</b></span>
      <i class="analysisVerdict ${p(o)}">${p(n.confidence)}% CONFIDENCE</i>
    </div>
    <p class="analysisSummary">${p(n.summary)}</p>
    ${BR(n)}
    ${Db(n.residentialDcf)}
    ${yR(n)}
    ${xR(n.productExperience)}
    ${vR(n.personalizedChallenge)}
    ${n.aiCommentary?`
      <section class="analysisJarvisTake">
        <h3>APEX ANALYSIS</h3>
        <p>${p(n.aiCommentary)}</p>
      </section>
    `:""}
    <div class="analysisMeta">
      <span>ENGINE <b>${p(n.engineVersion||"Apex v10.10")}</b></span>
      <span>REASONING <b>${p(n.reasoningMode||(n.aiCommentary?"Framework + AI":"Framework only"))}</b></span>
      <span>DECISION SCORE <b>${p(n.averageScore)}/100</b></span>
      <span>INPUT COMPLETE <b>${p(n.completeness)}%</b></span>
    </div>
    ${hA()}
    ${yA(n)}
    ${fA(n)}
    ${bA(n)}
    ${_A(n)}
    ${wA(n.developmentIntelligence)}
    ${MA(n.caseIntelligence)}
    ${AA(n.documentIntelligence)}
    ${RA(n.portfolioCommand)}
    ${PA(n.finalCommand)}
    <div class="analysisOverview">
      ${bR(n.investorReadiness)}
      ${c?`<section class="analysisDimensionSection"><h3>DEAL SCORECARD</h3><div class="analysisDimensions">${c}</div></section>`:""}
    </div>
    ${l?`<div class="analysisMetrics">${l}</div>`:""}
    ${_R(n.evidenceChecklist||[])}
    ${SR(n.evidenceEngine)}
    ${wR(n.transactionComparableEvidence)}
    ${ER(n.achievedRentalEvidence)}
    ${MR(n.financingValuationEvidence)}
    ${TR(n.supplyAbsorptionEvidence)}
    ${AR(n.siteManagementEvidence)}
    ${CR(n.legalTransactionEvidence)}
    ${RR(n.dueDiligencePlan)}
    ${IR(n.stressEnvelope)}
    ${PR(n.portfolioGate)}
    ${LR(n.marketPulse)}
    ${NR(n.holdExitPlan)}
    ${DR(n.decisionSeal)}
    ${du("V2.1 SITE VISIT ASSISTANT",n.siteVisitAssistant,"FOCUS",n.siteVisitAssistant?.focus)}
    ${du("V2.2 SOURCING / PROFESSIONAL FILTER",n.sourcingProfessional,"POSTURE",n.sourcingProfessional?.posture)}
    ${du("V2.3 TENANT / RENTAL PLAN",n.tenantRentalPlan,"TARGET",n.tenantRentalPlan?.target)}
    ${du("V2.4 EXIT STRATEGY",n.exitStrategy,"BUYER PSYCHOLOGY",n.exitStrategy?.buyerPsychology)}
    ${OR(n.executionPlan)}
    ${kR(n.learningLoop)}
    ${Ra("V3.4 DEAL MEMORY COMPARISON",n.dealMemoryComparison,"matches")}
    ${Ra("V3.5 BELIEF TRACKER",n.beliefTracker,"beliefs")}
    ${Ra("V3.6 SOURCE TRANSPARENCY",n.sourceTransparency,"sources")}
    ${Ra("V3.7 MEMORY CONFLICTS",n.memoryConflicts,"conflicts")}
    ${Ra("V3.8 PERSONAL OPERATING RULES",n.personalOperatingRules,"rules")}
    ${d?`<section class="analysisScenarioSection"><h3>DOWNSIDE SCENARIOS</h3><div class="analysisScenarios">${d}</div><p>Stress assumptions are decision tests, not forecasts.</p></section>`:""}
    ${gR(n.marketIntelligence)}
    <ol class="analysisStages">${a}</ol>
    <div class="analysisDetails">
      ${ar("Challenge mode",n.challengeMode?.message?[n.challengeMode.message]:[],n.challengeMode?.level==="hard"?"danger":"warning")}
      ${ar("Hard stops",n.hardStops,"danger")}
      ${ar("Decision blockers",n.recommendationBlockers,"warning")}
      ${ar("Watch-outs",n.watchouts,"warning")}
      ${ar("Estimated Malaysian entry costs",Nb(n.acquisitionCostEstimate))}
      ${ar("Missing evidence",n.missingEvidence)}
      ${ar("Check next",n.nextActions,"actions")}
    </div>
    <section class="analysisCounter">
      <h3>STRONGEST COUNTER-THESIS</h3>
      <p>${p(n.counterThesis)}</p>
    </section>
    <div class="analysisActions">
      <button type="button" data-analysis-action="shortlist">${u.status==="refuse"?"SAVE FOR REVIEW":"SAVE TO SHORTLIST"}</button>
      ${ft&&n.savedReportId?'<button type="button" data-analysis-action="journal">RECORD DECISION</button>':""}
      <button type="button" data-analysis-action="copy">COPY REPORT</button>
      <button type="button" data-analysis-action="report">PRINT REPORT</button>
      ${n.residentialDcf&&n.residentialDcf.status!=="incomplete"?'<button type="button" data-analysis-action="dcf">DCF WORKBOOK</button>':""}
    </div>
    ${ob(e)}
  `,zR(s),i.append(s),i===Vt){let f=s.getBoundingClientRect().top-Vt.getBoundingClientRect().top+Vt.scrollTop;Vt.scrollTop=Math.max(0,f-6),Ci()}}function zR(n){let e=".analysisReportTitle,.intelligenceBadge,.analysisHeader,.analysisSummary,.analysisDetails,.analysisCounter,.analysisActions,.analysisMeta,.analysisDimensions",t=new Map;for(let s of Array.from(n.children)){if(s.matches(e))continue;let r=/Metrics|Scenario|dcf|Snapshot/i.test(s.className)?"Numbers and downside":/Memory|Belief|Personal|Learning|Experience/i.test(s.className)?"Personal context and learning":"Evidence and seven-stage checks";if(!t.has(r)){let o=document.createElement("details");o.className="response-detail",o.innerHTML=`<summary>${r}</summary>`,t.set(r,o)}t.get(r).append(s)}let i=n.querySelector(".analysisActions");for(let s of t.values())n.insertBefore(s,i);for(let s of n.querySelectorAll("h3"))s.textContent=s.textContent.replace(/^V\d+(?:\.\d+)?\s+/i,"")}function Ob(n){if(Vt.innerHTML="",!!n?.messages?.length)for(let e of n.messages)_s(e.role==="assistant"?"jarvis":e.role,e.content,e.sources||[],e)}function vs(n){Ku=n,qn.classList.toggle("speaking",n),qn.setAttribute("aria-label",n?"Stop Apex Analytic voice":"Talk to Apex Analytic"),Ky.hidden=!n}function Mo(n,e){return n.reduce((t,i)=>{let s=i.getAttribute(e),r=String(i.value||"").trim();return r&&(t[s]=r),t},{})}function Ki(){return Mo(Ss,"data-deal-field")}function To(){return Mo(fr,"data-profile-field")}function HR(){return Yu.map(n=>{let e={};for(let t of n.querySelectorAll("[data-dcf-comp-field]")){let i=t.getAttribute("data-dcf-comp-field"),s=t.type==="checkbox"?t.checked:String(t.value||"").trim();s&&(e[i]=s)}return Object.keys(e).some(t=>t!=="verified")?(e.armsLength=!0,e.evidenceType="completed transaction",e):null}).filter(Boolean)}function ud(){let n=Mo(Xu,"data-dcf-field"),e=HR();return e.length&&(n.comparables=e),n}function Xy(){let n=ud();Fu()}function kb(n=!0){for(let e of Xu)e.value=e.tagName==="SELECT"&&e.options[0]?.value||"";for(let e of Yu)for(let t of e.querySelectorAll("[data-dcf-comp-field]"))t.type==="checkbox"?t.checked=!1:t.value="";window.localStorage.removeItem(QT),Oa&&(Oa.textContent=""),n&&ge("System ready","DCF assumptions and comparable sales cleared.")}function Ub(n=ud()){return{dealCard:Ki(),financialProfile:To(),valuation:n}}function GR(n={}){return{...n.assumptions,asOf:n.asOf,propertyName:n.property?.name,area:n.property?.area,address:n.property?.address,propertyType:n.property?.propertyType,tenure:n.property?.tenure,titleNumber:n.property?.titleNumber,marketRentEvidence:n.evidence?.marketRent,operatingCostEvidence:n.evidence?.operatingCosts,discountRateBasis:n.evidence?.discountRateBasis,terminalCapRateBasis:n.evidence?.terminalCapRateBasis,comparables:n.comparisonApproach?.comparables||[]}}function Fb(){let n=Ki();return n.askingPrice?n.floorArea?n.expectedRent?"":"Add a supportable monthly market rent in the Deal card.":"Add the subject floor area in the Deal card.":"Add the asking price in the Deal card."}function bs(n,e=""){Oa&&(Oa.textContent=n,Oa.className=e)}async function WR(){if(Sn)return null;let n=Fb();if(n)return bs(n,"danger"),null;Wt(!0),Ia.disabled=!0,Ia.textContent="CALCULATING...",bs("Running income, comparable, debt, and evidence checks...");try{let e=await ze("/api/tools/residential-dcf",{method:"POST",body:JSON.stringify(Ub())});return $R(e.valuation),bs(e.valuation.marketValue?"Evidence-supported indication calculated. Verify professional valuation before transacting.":"Screening value calculated. Missing evidence prevents a market-value label.",e.valuation.marketValue?"ready":"warning"),e.valuation}catch(e){return bs(e.message||"DCF calculation is unavailable.","danger"),null}finally{Wt(!1),Ia.disabled=!1,Ia.textContent="CALCULATE VALUE"}}async function Qf(n=null){if(Sn)return;let e=n?"":Fb();if(e){bs(e,"danger");return}Wt(!0),lr&&(lr.disabled=!0,lr.textContent="GENERATING..."),bs("Generating the auditable Excel model...");try{let t=n?GR(n):Ub(),i=await fetch("/api/tools/residential-dcf/workbook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok){let c=await i.json().catch(()=>({}));throw new Error(c.error||"DCF workbook could not be generated.")}let s=await i.blob(),o=(i.headers.get("content-disposition")||"").match(/filename="([^"]+)"/i)?.[1]||"apex-residential-dcf.xlsx",a=URL.createObjectURL(s),l=document.createElement("a");l.href=a,l.download=o,l.click(),window.setTimeout(()=>URL.revokeObjectURL(a),1e3),bs("Excel DCF downloaded. Open it to review and stress every blue assumption.","ready")}catch(t){bs(t.message||"DCF workbook could not be generated.","danger")}finally{Wt(!1),lr&&(lr.disabled=!1,lr.textContent="DOWNLOAD EXCEL")}}function em(n){return Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`))}function Bb(n,e=[]){return e.some(t=>String(n[t]||"").trim())}function qR(n){return n==="deal"?[{label:"Area/project",keys:["area","projectName"]},{label:"Price",keys:["askingPrice"]},{label:"Rent",keys:["expectedRent"]},{label:"Comps",keys:["comparableTransactions","comparableSource","conservativeFairValue"]},{label:"Site proof",keys:["siteVisitEvidence","siteVisitNotes"]},{label:"Title/legal",keys:["legalTitleType","legalCheck"]}]:n==="profile"?[{label:"Income",keys:["monthlyIncome"]},{label:"Reserve",keys:["cashReserveMonths","cashAvailable"]},{label:"Debt",keys:["currentDebt"]},{label:"Goal",keys:["investmentGoal","portfolioRole"]},{label:"Holding",keys:["holdingPeriod"]},{label:"Concern",keys:["financialConcern","nearTermCommitment"]}]:[{label:"Experience",keys:["experienceLevel"]},{label:"Mode",keys:["guidanceMode"]},{label:"Intent",keys:["decisionIntent"]},{label:"Output",keys:["preferredOutput"]},{label:"Confidence",keys:["confidenceComfort"]}]}function Za(n){let e=em(n),i=Mo(e,n==="deal"?"data-deal-field":"data-profile-field"),s=qR(n),r=s.filter(c=>!Bb(i,c.keys)).map(c=>c.label),o=s.length-r.length,a=Math.round(o/s.length*100),l=a>=80?"ready":a>=40?"watch":"missing";return{panelName:n,context:i,fields:e,groups:s,missing:r,percent:a,status:l}}function Kp(){return bo&&tl.get(bo)||null}function Ci(){let n=Ki();Zy.innerHTML="<span>Current investigation</span><b>"+p(n.projectName||n.area||"Your next property")+"</b><small>"+p([n.askingPrice,n.expectedRent?n.expectedRent+" rent":""].filter(Boolean).join(" / ")||"Add a property or explore a question first.")+"</small>"}function Vb(n){let e=Za(n),t=e.missing[0];if(!t){e.fields[0]?.focus();return}let i=e.groups.find(o=>o.label===t),s=n==="deal"?"data-deal-field":"data-profile-field";e.fields.find(o=>i?.keys.includes(o.getAttribute(s)))?.focus()}function jR(n){return n.getAttribute("data-deal-field")||n.getAttribute("data-profile-field")||""}function $b(){try{let n=JSON.parse(window.localStorage.getItem($p)||"{}");return n&&typeof n=="object"?n:{}}catch{return window.localStorage.removeItem($p),{}}}function XR(n,e){let t=$b();t[n]=e,window.localStorage.setItem($p,JSON.stringify(t))}function tm(n){return $b()[n]==="all"?"all":"core"}function YR(n,e){return n==="deal"?e==="all"?"Advanced evidence fields are visible. Use them when you have proof, not guesses.":"Start with area/project, price, rent, own-stay quality, management, exit pool, supply, and your main concern.":n==="profile"?e==="all"?"Advanced portfolio context is visible. Add it when the deal is moving beyond first screen.":"Start with income, reserve, cash available, debt, goal, holding period, and financial concern.":"Set the answer style once. Apex will use it to sound more like the adviser you need."}function zb(n,e){let t=n==="deal"?"data-deal-field":"data-profile-field";return em(n).find(i=>i.getAttribute(t)===e)}function nm(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=tm(n),i=e.querySelector(`[data-context-assist="${n}"]`);i||(i=document.createElement("section"),i.className="contextAssist",i.setAttribute("data-context-assist",n),e.prepend(i));let s=Za(n),o=s.groups.filter(l=>!Bb(s.context,l.keys)).filter(l=>t==="all"||l.keys.some(c=>Pu[n]?.has(c))).slice(0,3).map(l=>{let c=l.keys.find(u=>zb(n,u));return c?`<button type="button" data-context-focus-panel="${p(n)}" data-context-focus-key="${p(c)}">${p(l.label)}</button>`:""}).filter(Boolean).join(""),a=n==="deal"?"Deal":n==="profile"?"Profile":"Guidance";i.innerHTML=`
    <header>
      <span><small>${p(a)} guide</small><b>${p(t==="all"?"All fields visible":"Essentials first")}</b></span>
      <button type="button" data-context-field-mode="${p(n)}">${p(t==="all"?"CORE ONLY":"SHOW ALL")}</button>
    </header>
    <p>${p(YR(n,t))}</p>
    ${o?`<div>${o}</div>`:"<em>Enough context for a first pass. Add advanced proof only when the deal deserves deeper work.</em>"}
  `}function Hb(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=tm(n);e.classList.toggle("contextCoreMode",t!=="all"),e.classList.toggle("contextAllMode",t==="all"),nm(n)}function KR(n,e){XR(n,e),Hb(n),ge("System ready",e==="all"?"Advanced fields visible.":"Showing only core fields.")}function JR(){for(let n of Object.keys(Pu)){for(let e of em(n)){let t=jR(e),i=e.closest("label");if(!i)continue;let s=Pu[n].has(t);i.classList.toggle("contextCore",s),i.classList.toggle("contextAdvanced",!s),i.dataset.contextDepth=s?"core":"advanced"}Hb(n)}}function im(){for(let n of Object.keys(Pu))nm(n)}function Yy(n={},e=[]){return e.map(([t,i])=>{let s=String(n[t]||"").trim();return s?`${i}: ${s}`:""}).filter(Boolean).join("; ")}function ZR(n={}){return!!(n.area||n.projectName||n.askingPrice||n.expectedRent||n.propertyType||n.mainConcern||n.investmentThesis)}function QR(){let n=Ki(),e=To(),t=Za("deal"),i=Za("profile"),s=Yy(n,[["area","area"],["projectName","project"],["propertyType","type"],["askingPrice","price"],["conservativeFairValue","fair value"],["expectedRent","rent"],["estimatedInstallment","installment"],["maintenance","maintenance"],["ownStayAppeal","own-stay"],["managementQuality","management"],["exitBuyerPool","exit pool"],["nearbySupply","nearby supply"],["mainConcern","concern"]])||"not supplied",r=Yy(e,[["monthlyIncome","income"],["cashReserveMonths","reserve"],["cashAvailable","cash available"],["currentDebt","debt"],["riskStyle","risk style"],["investmentGoal","goal"],["holdingPeriod","holding"]])||"not supplied",o=[...t.missing.map(a=>`Deal: ${a}`),...i.missing.map(a=>`Profile: ${a}`)].slice(0,6).join("; ")||"no major card gap from the current quick screen";return["Run Apex Deal Screening Mode as a first-pass mentor check, not a full formal report.","Use this exact structure: Verdict, Why, Main risk, Missing proof, Next questions.","Keep it short, human, and direct. Ask at most 3 next questions. Do not create a long report.",`Deal card: ${s}`,`Profile card: ${r}`,`Known missing context: ${o}`].join(`
`)}async function Gb(){if(Sn)return;let n=Ki();if(!ZR(n)){_s("jarvis","Open the Deal card and give me at least the area/project, price, rent, or your main concern. Then I can screen it without turning the page into a full report.");let e=wi.find(t=>t.getAttribute("data-context-toggle")==="deal");e&&Ei(e,!0),Vb("deal");return}En(),Mi("Screening the deal."),Gi&&(Gi.disabled=!0,Gi.textContent="SCREENING"),ge("Screening","Running a first-pass deal screen.");try{await Co(QR(),{displayText:"Screen this deal using my current Deal/Profile cards."})}finally{Gi&&(Gi.disabled=!1,Gi.textContent="SCREEN")}}function ku(n,e,t){let i=Mo(n,e);Fu(),Ci(),im()}function e1(n){let e=n==="deal",t=Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`)),i=e?Ss:fr,s=e?"data-deal-field":"data-profile-field",r=e?Df:Of;for(let l of t)l.value="";e&&kb(!1);let o=Mo(i,s);Object.keys(o).length?window.localStorage.setItem(r,JSON.stringify(o)):window.localStorage.removeItem(r),Fu();let a=n==="guidance"?"Guidance":e?"Deal":"Profile";Ci(),im(),ge("System ready",`${a} details cleared.`)}function t1(){try{return JSON.parse(window.localStorage.getItem(Cu)||"{}")}catch{return window.localStorage.removeItem(Cu),{}}}function Ei(n,e,t=!0){let i=n.getAttribute("data-context-toggle"),s=document.querySelector(`[data-context-body="${i}"]`),r=n.querySelector(".contextAction");if(s){if(e){Qt(i);for(let o of wi)o!==n&&Ei(o,!1,!1)}if(n.setAttribute("aria-expanded",String(e)),s.hidden=!e,n.closest(".contextPanel")?.classList.toggle("expanded",e),r&&(r.textContent=e?"CLOSE":"OPEN"),e&&nm(i),t){let o=wi.reduce((a,l)=>{let c=l.getAttribute("data-context-toggle");return a[c]=l===n?e:!1,a},{});window.localStorage.setItem(Cu,JSON.stringify(o))}}}function n1(){let n=t1(),e=Object.entries(n).find(([,t])=>t)?.[0];for(let t of wi){let i=t.getAttribute("data-context-toggle");Ei(t,i===e,!1),t.addEventListener("click",()=>{let s=t.getAttribute("aria-expanded")==="true";Ei(t,!s)})}for(let t of JT)t.addEventListener("click",()=>e1(t.getAttribute("data-context-reset")))}function En(){let n={};for(let e of wi)Ei(e,!1,!1),n[e.getAttribute("data-context-toggle")]=!1;window.localStorage.setItem(Cu,JSON.stringify(n))}function Mi(n="Voice stopped."){Hp+=1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),ys&&(ys.pause(),ys.src="",ys=null),ka&&(URL.revokeObjectURL(ka),ka=""),cr=!0,vs(!1),Wi||ge("System ready",n)}async function i1(n){Mi("Ready when you are.");let e=++Hp;try{vs(!0),ge("Speaking","Delivering analysis.");let t=await fetch("/api/jarvis/speech",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":il()},body:JSON.stringify({text:n})});if(!t.ok){let i=await t.json().catch(()=>({}));throw new Error(i.error||"Server voice is unavailable.")}if(e!==Hp)return;ka=URL.createObjectURL(await t.blob()),ys=new Audio(ka),ys.onended=()=>{vs(!1),ge("System ready",cr?"Voice stopped.":"Ready when you are."),Mi("Ready when you are."),cr=!1},ys.onerror=()=>{vs(!1),ge("Voice interrupted","The written answer is still available.")},await ys.play()}catch{vs(!1),ge("Voice interrupted","The written answer is still available.")}}function Jp(n){if(!Pn)return;let e=eA(n);if(!("speechSynthesis"in window)){Xv&&i1(e);return}Mi("Ready when you are.");let t=new SpeechSynthesisUtterance(e);t.rate=.96,t.pitch=.9,t.onstart=()=>{cr=!1,vs(!0),ge("Speaking","Delivering analysis.")},t.onend=()=>{vs(!1),ge("System ready",cr?"Voice stopped.":"Ready when you are."),cr=!1},t.onerror=()=>{vs(!1),cr=!1},window.speechSynthesis.speak(t)}function s1(n){return new Promise((e,t)=>{let i=new FileReader;i.onload=()=>e(String(i.result||"").split(",")[1]||""),i.onerror=t,i.readAsDataURL(n)})}async function r1(){if(sr?.state==="recording"){sr.stop();return}if(!jv||!window.MediaRecorder||!navigator.mediaDevices?.getUserMedia){ge("Voice unavailable","Use the command bar on this browser."),_n.focus();return}try{Wi=!0,yp=await navigator.mediaDevices.getUserMedia({audio:!0}),vp=[];let n=["audio/webm;codecs=opus","audio/webm","audio/mp4"].find(e=>MediaRecorder.isTypeSupported(e));sr=new MediaRecorder(yp,n?{mimeType:n}:void 0),sr.ondataavailable=e=>{e.data.size&&vp.push(e.data)},sr.onstop=async()=>{Wi=!1,qn.classList.remove("listening"),yp?.getTracks().forEach(t=>t.stop());let e=new Blob(vp,{type:sr.mimeType||"audio/webm"});if(!e.size)return ge("Voice interrupted","No recording was captured.");ge("Analyzing","Transcribing your message."),Wt(!0);try{let t=await ze("/api/jarvis/transcribe",{method:"POST",body:JSON.stringify({audioBase64:await s1(e),mimeType:e.type,filename:e.type.includes("mp4")?"voice.mp4":"voice.webm"})});_n.value=t.text,Wt(!1),await Co(t.text)}catch(t){ge("Voice interrupted",t.message||"Voice transcription failed.")}finally{Wt(!1)}},sr.start(),Wi=!0,qn.classList.add("listening"),ge("Listening","Speak naturally. Tap again when finished.")}catch{Wi=!1,ge("Voice interrupted","Microphone access was not available.")}}async function ze(n,e={}){let t=await fetch(n,{...e,credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":il(),...e.headers||{}}});if(!t.ok){let s=await t.json().catch(()=>({})),r=new Error(s.error||"Apex Analytic backend is unavailable.");throw r.status=t.status,r.payload=s,r}if(t.status===204)return null;let i=await t.json();return i.session&&Fu({sessionId:i.session.id,messages:i.session.messages||[],...i.analysis?{report:{analysis:{...i.analysis,savedReportId:i.savedReport?.id},sources:i.sources||[],mode:i.mode,messageId:i.message?.id}}:{}}),i}async function o1(){let n=await ze("/api/auth/me");return sl(n.authenticated?n.user:null),n}async function a1(){let n=ji==="register"?"/api/auth/register":"/api/auth/login",e={email:nf.value.trim(),password:wp.value};ji==="register"&&(e.displayName=Qy.value.trim()),Ep.disabled=!0,go.textContent=ji==="register"?"Creating your private account...":"Signing in...";try{let t=await ze(n,{method:"POST",body:JSON.stringify(e)});sl(t.user),wp.value="",ge("System ready",t.verificationPending?"Account ready. Verify your email when convenient.":`Welcome back, ${t.user.displayName}.`)}catch(t){go.textContent=t.message||"Account access is unavailable."}finally{Ep.disabled=!1}}async function l1(){let n=gu.value.trim();if(!n)return gu.focus();Mp.disabled=!0,po.textContent="Sending reset instructions...";try{let e=await ze("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:n})});po.textContent=e.message,e.debug?.token&&(nv.value=e.debug.token)}catch(e){po.textContent=e.message||"Password recovery is unavailable."}finally{Mp.disabled=!1}}async function c1(){Py.disabled=!0,po.textContent="Updating password...";try{await ze("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:nv.value.trim(),password:Iy.value})}),Iy.value="",Uf(!1),Ja("login"),go.textContent="Password updated. Sign in with the new password."}catch(n){po.textContent=n.message||"Password could not be updated."}finally{Py.disabled=!1}}async function u1(){vu.disabled=!0;try{let n=await ze("/api/auth/request-verification",{method:"POST",body:"{}"});n.debug?.token&&(yu.value=n.debug.token),ge("System ready",n.sent?"Verification code sent.":"Verification request created.")}catch(n){ge("Connection issue",n.message||"Verification is unavailable.")}finally{vu.disabled=!1}}async function d1(){let n=yu.value.trim();if(!n)return yu.focus();bu.disabled=!0;try{let e=await ze("/api/auth/verify-email",{method:"POST",body:JSON.stringify({token:n})});sl(e.user),ge("System ready","Email verified.")}catch(e){ge("Connection issue",e.message||"Verification failed.")}finally{bu.disabled=!1}}function h1(n){let e=new Date(n.updatedAt),t=Number.isNaN(e.getTime())?"Recent":e.toLocaleString([],{dateStyle:"medium",timeStyle:"short"}),i=n.id===$t;return`
    <article class="sessionItem${i?" current":""}">
      <button class="sessionOpen" type="button" data-session-action="open" data-session-id="${p(n.id)}">
        <b>${p(n.title||"Untitled conversation")}</b>
        <span>${p(t)} / ${p(n.messageCount||0)} messages${i?" / CURRENT":""}</span>
      </button>
      <button class="sessionDelete" type="button" data-session-action="delete" data-session-id="${p(n.id)}" aria-label="Delete ${p(n.title||"conversation")}">DELETE</button>
    </article>
  `}async function Wb(){let n=await ze("/api/jarvis/sessions"),e=Array.isArray(n.sessions)?n.sessions:[];return _u.innerHTML=e.length?e.map(h1).join(""):'<p class="memoryEmpty">No saved conversations yet.</p>',e}function Ao(){rf.hidden=!0,Vu.setAttribute("aria-expanded","false"),document.body.classList.remove("historyOpen")}async function qb(){Qt("history"),kn(),cn(),un(),dn(),en(),hn(),pn(),fn(),ln(),wn(),En(),rf.hidden=!1,Vu.setAttribute("aria-expanded","true"),document.body.classList.add("historyOpen"),_u.innerHTML='<p class="memoryEmpty">Loading conversation history...</p>';try{await Wb()}catch(n){_u.innerHTML=`<p class="memoryEmpty">${p(n.message)}</p>`}}async function p1(n){let e=n.getAttribute("data-session-id"),t=n.getAttribute("data-session-action");if(!(!e||!t||Sn)){Wt(!0);try{if(t==="open"){await Xb(e),Ao(),Qt("chat"),ge("System ready","Conversation restored.");return}await ze(`/api/jarvis/sessions/${encodeURIComponent(e)}`,{method:"DELETE"}),e===$t&&(window.localStorage.removeItem(Ms),$t=null,await Uu()),await Wb()}catch(i){ge("Connection issue",i.message||"Conversation history could not be updated.")}finally{Wt(!1)}}}async function f1(){Tp.disabled=!0;try{cn(),un(),dn(),en(),hn(),pn(),fn(),Ao(),await ze("/api/auth/logout",{method:"POST",body:"{}"}),window.localStorage.removeItem(Ms),$t=null,sl(null),Ja("login"),ge("System ready","Signed out. Guest space ready.")}catch(n){go.textContent=n.message||"Sign out is unavailable."}finally{Tp.disabled=!1}}async function Uu(n=!0){let e=await ze("/api/jarvis/sessions",{method:"POST",body:JSON.stringify({clientId:il()})});return $t=e.session.id,window.localStorage.setItem(Ms,$t),Es("READY"),n&&(Vt.innerHTML=""),bo="",document.body.classList.remove("conversationActive"),Ci(),e.session}async function jb(){if(!Sn){Wt(!0),Mi("Chat reset."),Ao(),ge("Starting","Creating a new conversation."),Qt("chat"),Vt.innerHTML="",bo="",document.body.classList.remove("conversationActive"),Ci(),window.localStorage.removeItem(Ms),$t=null;try{await Uu(),ge("System ready","New chat ready. Your previous conversation remains in History.")}catch{ge("Connection issue","Apex Analytic backend is unavailable."),Es("OFFLINE")}finally{Wt(!1)}}}async function Xb(n,e=!0){let t=await ze(`/api/jarvis/sessions/${n}`);return $t=t.session.id,window.localStorage.setItem(Ms,$t),e&&Ob(t.session),Es(`${t.session.messages.length} MSG`),t.session}async function Yb(){if(!$t)return Uu(!1);try{return await Xb($t,!1)}catch{return Uu(!1)}}async function m1(n){await Yb();let e=Zv(n),t=await ze("/api/jarvis/query",{method:"POST",body:JSON.stringify({query:n,inputMode:e.id,sessionId:$t,clientId:il(),dealCard:Ki(),financialProfile:To(),responseFeedback:nA()})});$t=t.session.id,window.localStorage.setItem(Ms,$t);let i=t.mode==="llm"?"AI":"FRAMEWORK";return Es(`${i} / ${t.session.messages.length}`),t}async function Co(n,e={}){let t=String(n||"").trim();if(!t||Sn)return;Wt(!0);let i=String(e.displayText||t).trim();_s("user",i),_n.value="",Ju(""),ge("Analyzing","Reviewing your knowledge and prior decisions."),qn.classList.add("speaking");try{let s=await m1(t);_s("jarvis",s.answer,s.sources,s),zA(s.memoryCandidate),Jp(Ti(s.answer)),Pn||ge("System ready","Ready when you are.")}catch(s){let r=s.message||"The Apex Analytic backend is unavailable.";_s("jarvis",r),Jp(r),ge("Connection issue","Start Apex Analytic and try again."),Es("OFFLINE")}finally{Wt(!1),!Ku&&!window.speechSynthesis?.speaking&&qn.classList.remove("speaking")}}async function Qa(){if(Sn)return;let n=Ki(),e=To(),t=ud();if(!n.askingPrice||!n.area&&!n.projectName){_s("jarvis","Add an asking price and an area or project first. I can work with missing evidence after that, but I need a real deal to analyse.");let i=wi.find(r=>r.getAttribute("data-context-toggle")==="deal");i&&Ei(i,!0),Ss.find(r=>{let o=r.getAttribute("data-deal-field");return o==="askingPrice"&&!n.askingPrice||o==="area"&&!n.area&&!n.projectName})?.focus();return}if(uA("deal-analysis")){Qt("chat"),Wt(!0),En(),Mi("Running the full framework."),_s("user","Run the seven-stage Apex Analytic assessment for this deal."),La.disabled=!0,La.textContent="ANALYSING...",ge("Analyzing","Running all seven Apex Analytic stages."),qn.classList.add("speaking");try{await Yb();let i=await ze("/api/jarvis/analyze-deal",{method:"POST",body:JSON.stringify({sessionId:$t,clientId:il(),dealCard:n,financialProfile:e,valuation:t})});$t=i.session.id,window.localStorage.setItem(Ms,$t);let s=i.mode==="llm"?"AI":"FRAMEWORK";Es(`${s} / ${i.session.messages.length}`),i.billing&&nd(i.billing),i.savedReport&&(i.analysis.savedReportId=i.savedReport.id),Zf(i.analysis,i.sources,i),Jp(Ti(i.analysis.voiceSummary)),Pn||ge("System ready","Analysis complete.")}catch(i){let s=i.message||"The deal analysis is unavailable.";_s("jarvis",s),ge("Connection issue","Deal analysis could not be completed.")}finally{La.textContent="Decision report",Wt(!1),!Ku&&!window.speechSynthesis?.speaking&&qn.classList.remove("speaking")}}}function g1(){if(!Sn){if(Ku||window.speechSynthesis?.speaking){Mi("Voice stopped.");return}if(!oi){r1();return}if(Wi){oi.stop();return}oi.start()}}async function y1(){Pa.textContent=Pn?"VOICE ON":"VOICE OFF",Pa.setAttribute("aria-pressed",String(Pn)),document.body.classList.toggle("voiceMuted",!Pn),JR(),Qu(),Ju(),Ci(),rl(),n1(),Ja("login");try{let n=await ze("/api/jarvis/status"),e=n.llm?.enabled?"AI":"FRAMEWORK";jv=!!n.audio?.serverStt,Xv=!!n.audio?.serverTts,ho=!!n.accounts?.emailDelivery,Yv=!!n.accounts?.verificationRequired,nl=!!n.ownerMarket?.enabled,Ja(ji),SM.hidden=!n.llm?.enabled,await o1(),Es(`${e} READY`),ge("System ready","Ready when you are.")}catch{ge("Connection issue","Apex Analytic backend is unavailable."),Es("OFFLINE")}}function v1(){return Sn||Wi}function b1(n){if(Sn)return!1;Ba="",Mi("Ready for this property.");for(let i of Ss)i.value=n.dealCard?.[i.dataset.dealField]??"";for(let i of fr)i.value=n.financialProfile?.[i.dataset.profileField]??"";kb(!1);let e=n.dcfContext||{};for(let i of Xu)e[i.dataset.dcfField]!==void 0&&(i.value=e[i.dataset.dcfField]);for(let[i,s]of Yu.entries())for(let r of s.querySelectorAll("[data-dcf-comp-field]")){let o=e.comparables?.[i]?.[r.dataset.dcfCompField];r.type==="checkbox"?r.checked=o===!0:r.value=o??""}document.querySelector("#valuationResult").replaceChildren(),$t=n.sessionId||null,tl.clear(),bo="";let t=n.messages||(n.chat||[]).map(i=>({role:i.role,content:i.text,mode:i.mode}));return Ob({messages:n.report?.analysis?t.filter(i=>i.id!==n.report.messageId):t}),n.report?.analysis&&Zf(n.report.analysis,n.report.sources,{mode:n.report.mode}),Ba=n.id,Ci(),im(),!0}async function x1(n,e={}){if(!Sn){if(n==="account")return wo();if(n==="trust")return Ff();if(n==="reports")return Vf();if(n==="journal")return id();if(n==="memory")return lb();if(n==="history")return qb();if(n==="shortlist")return Gf();if(n==="owner")return Pb();if(n==="market")return cd();if(n==="cases")return ad();if(n==="evidence")return ld();kn(),ln(),un(),dn(),cn(),Ao(),wn(),en(),hn(),pn(),fn(),En(),["deal","profile","guidance"].includes(n)?Ei(wi.find(t=>t.dataset.contextToggle===n),!0,!1):Qt(n),n==="chat"&&(e.prompt&&(_n.value=e.prompt),e.analyze&&!Kp()?await Qa():_n.focus({preventScroll:!0}))}}var Ba,qn,mu,_n,vM,fp,Vt,bM,xM,_M,Pa,Ky,Jy,Sp,La,Gi,SM,Zy,Zp,wM,Qp,EM,ef,tf,MM,Qy,nf,wp,Ep,ev,tv,go,sf,gu,Mp,nv,Iy,Py,TM,po,AM,CM,RM,Ly,yu,vu,bu,Tp,Bu,_o,IM,Ny,mp,xu,PM,LM,Na,Da,Dy,NM,DM,OM,kM,Vu,rf,UM,iv,_u,FM,BM,VM,$u,sv,zu,of,$M,zM,HM,dr,Hu,af,GM,rv,WM,qM,yo,Ap,jM,el,XM,lf,cf,uf,df,hf,pf,ff,YM,KM,xi,JM,ZM,QM,ov,av,lv,cv,uv,dv,hv,pv,fv,eT,Dn,mf,Gu,tT,nT,Si,iT,sT,Oy,mv,Cp,pu,Rp,Ip,rT,Pp,Su,Ct,_i,vo,oT,gf,aT,lT,yf,ky,cT,gv,vf,Uy,uT,dT,hT,Wu,wu,yv,Fy,bf,xf,pT,_f,Sf,fT,wf,Ef,mT,Mf,Tf,gT,yT,vT,bT,Lp,xT,Va,_T,ST,wT,$a,ET,MT,Af,So,hr,za,Ha,Ga,Wa,vv,bv,xv,_v,qu,Sv,wv,Ev,Mv,Tv,Av,Cv,Rv,Iv,Pv,Cf,Rf,TT,Np,Dp,Lv,Nv,AT,By,Dv,Eu,If,CT,qa,RT,IT,Op,Mu,Ov,PT,kv,Tu,LT,Pf,Uv,NT,Vy,kp,DT,OT,kT,UT,FT,BT,VT,$T,zT,Up,pr,Fv,fo,HT,GT,Au,Bv,WT,Vv,Fp,Bp,Vp,qT,$y,gp,jT,XT,$v,Lf,zy,ju,Nf,YT,KT,zv,Hv,Ss,fr,Xu,Yu,Ia,lr,Oa,wi,JT,ZT,Hy,oi,Ms,Df,Of,QT,Cu,$p,Gy,Gv,Wv,ws,qv,zp,tl,Pn,Wi,Ku,cr,Hp,$t,ji,ft,jv,Xv,ho,Yv,sr,yp,vp,ys,ka,mo,Ua,Ru,nl,Xi,Kv,ja,Xa,xs,uo,Ya,Iu,Ka,Jv,Gp,Wp,ur,bo,Sn,Pu,rr,kf,Jb=gx(()=>{Ba="";qn=document.querySelector("#jarvisOrb"),mu=document.querySelector("#chatForm"),_n=document.querySelector("#chatInput"),vM=mu.querySelector('button[type="submit"]'),fp=document.querySelector("#inputModeHint"),Vt=document.querySelector("#transcript"),bM=document.querySelector("#assistantPrompt"),xM=document.querySelector("#systemStatus"),_M=document.querySelector("#sessionStatus"),Pa=document.querySelector("#soundToggle"),Ky=document.querySelector("#stopVoiceBtn"),Jy=document.querySelector("#resetChatBtn"),Sp=document.querySelector("#sessionBriefBtn"),La=document.querySelector("#analyzeDealBtn"),Gi=document.querySelector("#screenDealBtn"),SM=document.querySelector("#aiDisclosure"),Zy=document.querySelector("#dealJourney"),Zp=document.querySelector("#accountToggle"),wM=document.querySelector("#accountLabel"),Qp=document.querySelector("#authPanel"),EM=document.querySelector("#authClose"),ef=document.querySelector("#authTitle"),tf=document.querySelector("#authForm"),MM=document.querySelector("#authNameField"),Qy=document.querySelector("#authName"),nf=document.querySelector("#authEmail"),wp=document.querySelector("#authPassword"),Ep=document.querySelector("#authSubmit"),ev=document.querySelector("#authModeToggle"),tv=document.querySelector("#authRecoveryToggle"),go=document.querySelector("#authMessage"),sf=document.querySelector("#authRecovery"),gu=document.querySelector("#recoveryEmail"),Mp=document.querySelector("#recoveryRequest"),nv=document.querySelector("#recoveryToken"),Iy=document.querySelector("#recoveryPassword"),Py=document.querySelector("#recoverySubmit"),TM=document.querySelector("#recoveryCancel"),po=document.querySelector("#recoveryMessage"),AM=document.querySelector("#authUser"),CM=document.querySelector("#authUserName"),RM=document.querySelector("#authUserEmail"),Ly=document.querySelector("#authVerificationState"),yu=document.querySelector("#verificationToken"),vu=document.querySelector("#verificationRequest"),bu=document.querySelector("#verificationSubmit"),Tp=document.querySelector("#logoutButton"),Bu=document.querySelector("#memoryToggle"),_o=document.querySelector("#memoryPanel"),IM=document.querySelector("#memoryClose"),Ny=document.querySelector("#memoryForm"),mp=document.querySelector("#memoryInput"),xu=document.querySelector("#memoryList"),PM=document.querySelector("#memoryApprovedCount"),LM=document.querySelector("#memoryPendingCount"),Na=document.querySelector("#memoryCaptureEnabled"),Da=document.querySelector("#memoryReasoningEnabled"),Dy=document.querySelector("#memoryModeNotice"),NM=document.querySelector("#memoryProfileTitle"),DM=document.querySelector("#memoryProfileCompleteness"),OM=document.querySelector("#memoryProfileSummary"),kM=document.querySelector("#memoryProfileDetails"),Vu=document.querySelector("#historyToggle"),rf=document.querySelector("#sessionPanel"),UM=document.querySelector("#sessionClose"),iv=document.querySelector("#sessionNew"),_u=document.querySelector("#sessionList"),FM=document.querySelector("#billingSummary"),BM=document.querySelector("#billingPlanName"),VM=document.querySelector("#billingUsage"),$u=document.querySelector("#billingActions"),sv=document.querySelector("#billingGuardrail"),zu=document.querySelector("#reportsToggle"),of=document.querySelector("#reportsPanel"),$M=document.querySelector("#reportsClose"),zM=document.querySelector("#reportsSavedCount"),HM=document.querySelector("#reportsUsageLabel"),dr=document.querySelector("#reportsList"),Hu=document.querySelector("#journalToggle"),af=document.querySelector("#journalPanel"),GM=document.querySelector("#journalClose"),rv=document.querySelector("#journalSummary"),WM=document.querySelector("#journalTotalCount"),qM=document.querySelector("#journalReviewedCount"),yo=document.querySelector("#journalList"),Ap=document.querySelector("#journalEditor"),jM=document.querySelector("#journalBack"),el=document.querySelector("#journalDecisionId"),XM=document.querySelector("#journalSubject"),lf=document.querySelector("#journalDecision"),cf=document.querySelector("#journalConfidence"),uf=document.querySelector("#journalHoldingPeriod"),df=document.querySelector("#journalThesis"),hf=document.querySelector("#journalCounterThesis"),pf=document.querySelector("#journalKillCriterion"),ff=document.querySelector("#journalNotes"),YM=document.querySelector("#journalDraftActions"),KM=document.querySelector("#journalSaveDraft"),xi=document.querySelector("#journalLock"),JM=document.querySelector("#journalDelete"),ZM=document.querySelector("#journalLockNotice"),QM=document.querySelector("#journalOutcome"),ov=document.querySelector("#journalOutcomeStatus"),av=document.querySelector("#journalActualRent"),lv=document.querySelector("#journalCurrentValue"),cv=document.querySelector("#journalProcessScore"),uv=document.querySelector("#journalExecutionScore"),dv=document.querySelector("#journalOutcomeScore"),hv=document.querySelector("#journalLuckScore"),pv=document.querySelector("#journalResult"),fv=document.querySelector("#journalLesson"),eT=document.querySelector("#journalSaveReview"),Dn=document.querySelector("#journalMessage"),mf=document.querySelector("#ownerIntelToggle"),Gu=document.querySelector("#ownerIntelPanel"),tT=document.querySelector("#ownerIntelClose"),nT=document.querySelector("#ownerIntelAccess"),Si=document.querySelector("#ownerIntelToken"),iT=document.querySelector("#ownerIntelClearToken"),sT=document.querySelector("#ownerIntelSummary"),Oy=document.querySelector("#ownerIntelOpsDashboard"),mv=document.querySelector("#ownerIntelControls"),Cp=document.querySelector("#ownerIntelOpsRefresh"),pu=document.querySelector("#ownerIntelCopyBrief"),Rp=document.querySelector("#ownerIntelExport"),Ip=document.querySelector("#ownerIntelImport"),rT=document.querySelector("#ownerIntelRestoreHistory"),Pp=document.querySelector("#ownerIntelBackupReminder"),Su=document.querySelector("#ownerIntelImportFile"),Ct=document.querySelector("#ownerIntelRestorePhrase"),_i=document.querySelector("#ownerIntelRestoreConfirm"),vo=document.querySelector("#ownerIntelRestoreLog"),oT=document.querySelector("#ownerIntelLanes"),gf=document.querySelector("#ownerIntelCoverage"),aT=document.querySelector("#ownerIntelNextTitle"),lT=document.querySelector("#ownerIntelNextDetail"),yf=document.querySelector("#ownerIntelActions"),ky=document.querySelector("#ownerIntelMessage"),cT=document.querySelector("#ownerAdminLoad"),gv=document.querySelector("#ownerAdminSummary"),vf=document.querySelector("#ownerAdminList"),Uy=document.querySelector("#ownerResearchPanel"),uT=document.querySelector("#ownerResearchSummary"),dT=document.querySelector("#ownerResearchRefresh"),hT=document.querySelector("#ownerResearchImport"),Wu=document.querySelector("#ownerResearchReplace"),wu=document.querySelector("#ownerResearchFile"),yv=document.querySelector("#ownerResearchList"),Fy=document.querySelector("#ownerResearchMessage"),bf=document.querySelector("#ownerMarketToggle"),xf=document.querySelector("#ownerMarketPanel"),pT=document.querySelector("#ownerMarketClose"),_f=document.querySelector("#ownerCaseToggle"),Sf=document.querySelector("#ownerCasePanel"),fT=document.querySelector("#ownerCaseClose"),wf=document.querySelector("#ownerEvidenceToggle"),Ef=document.querySelector("#ownerEvidencePanel"),mT=document.querySelector("#ownerEvidenceClose"),Mf=document.querySelector("#trustToggle"),Tf=document.querySelector("#trustPanel"),gT=document.querySelector("#trustClose"),yT=document.querySelector("#trustAcceptance"),vT=document.querySelector("#trustAcceptanceTitle"),bT=document.querySelector("#trustAcceptanceDetail"),Lp=document.querySelector("#trustAccept"),xT=document.querySelector("#ownerMarketAccess"),Va=document.querySelector("#ownerMarketToken"),_T=document.querySelector("#ownerMarketClearToken"),ST=document.querySelector("#ownerMarketSummary"),wT=document.querySelector("#ownerCaseAccess"),$a=document.querySelector("#ownerCaseToken"),ET=document.querySelector("#ownerCaseClearToken"),MT=document.querySelector("#ownerCaseSummary"),Af=document.querySelector("#ownerCaseForm"),So=document.querySelector("#ownerCaseProject"),hr=document.querySelector("#ownerCaseProjectName"),za=document.querySelector("#ownerCaseArea"),Ha=document.querySelector("#ownerCaseState"),Ga=document.querySelector("#ownerCaseType"),Wa=document.querySelector("#ownerCaseDeveloper"),vv=document.querySelector("#ownerCasePriceSegment"),bv=document.querySelector("#ownerCaseVerdict"),xv=document.querySelector("#ownerCaseConfidence"),_v=document.querySelector("#ownerCaseRating"),qu=document.querySelector("#ownerCaseObservedAt"),Sv=document.querySelector("#ownerCaseTags"),wv=document.querySelector("#ownerCaseTargetBuyer"),Ev=document.querySelector("#ownerCaseTargetTenant"),Mv=document.querySelector("#ownerCaseStrengths"),Tv=document.querySelector("#ownerCaseWeaknesses"),Av=document.querySelector("#ownerCaseManagement"),Cv=document.querySelector("#ownerCaseResident"),Rv=document.querySelector("#ownerCaseSupply"),Iv=document.querySelector("#ownerCaseRental"),Pv=document.querySelector("#ownerCaseResale"),Cf=document.querySelector("#ownerCaseOwnerVerdict"),Rf=document.querySelector("#ownerCaseSourceBasis"),TT=document.querySelector("#ownerCaseRefresh"),Np=document.querySelector("#ownerCaseFilter"),Dp=document.querySelector("#ownerCaseVerdictFilter"),Lv=document.querySelector("#ownerCaseCompletenessFilter"),Nv=document.querySelector("#ownerCaseList"),AT=document.querySelector("#ownerCaseMetrics"),By=document.querySelector("#ownerCaseMessage"),Dv=document.querySelector("#ownerCaseFormTitle"),Eu=document.querySelector("#ownerCaseSubmit"),If=document.querySelector("#ownerCaseCancelEdit"),CT=document.querySelector("#ownerEvidenceAccess"),qa=document.querySelector("#ownerEvidenceToken"),RT=document.querySelector("#ownerEvidenceClearToken"),IT=document.querySelector("#ownerEvidenceSummary"),Op=document.querySelector("#ownerEvidenceForm"),Mu=document.querySelector("#ownerEvidenceTitle"),Ov=document.querySelector("#ownerEvidenceFilename"),PT=document.querySelector("#ownerEvidenceSourceUrl"),kv=document.querySelector("#ownerEvidenceTags"),Tu=document.querySelector("#ownerEvidenceText"),LT=document.querySelector("#ownerEvidenceRefresh"),Pf=document.querySelector("#ownerEvidenceFilter"),Uv=document.querySelector("#ownerEvidenceList"),NT=document.querySelector("#ownerEvidenceMetrics"),Vy=document.querySelector("#ownerEvidenceMessage"),kp=document.querySelector("#ownerProjectForm"),DT=document.querySelector("#ownerProjectName"),OT=document.querySelector("#ownerProjectArea"),kT=document.querySelector("#ownerProjectState"),UT=document.querySelector("#ownerProjectType"),FT=document.querySelector("#ownerProjectDeveloper"),BT=document.querySelector("#ownerProjectTenure"),VT=document.querySelector("#ownerProjectCompletionYear"),$T=document.querySelector("#ownerProjectStatus"),zT=document.querySelector("#ownerProjectAliases"),Up=document.querySelector("#ownerObservationForm"),pr=document.querySelector("#ownerObservationProject"),Fv=document.querySelector("#ownerObservationMetric"),fo=document.querySelector("#ownerObservationArea"),HT=document.querySelector("#ownerObservationValue"),GT=document.querySelector("#ownerObservationUnit"),Au=document.querySelector("#ownerObservationDate"),Bv=document.querySelector("#ownerObservationSourceType"),WT=document.querySelector("#ownerObservationConfidence"),Vv=document.querySelector("#ownerObservationNotes"),Fp=document.querySelector("#ownerMarketAreaFilter"),Bp=document.querySelector("#ownerMarketMetricFilter"),Vp=document.querySelector("#ownerMarketFreshnessFilter"),qT=document.querySelector("#ownerMarketRefresh"),$y=document.querySelector("#ownerMarketImportForm"),gp=document.querySelector("#ownerMarketImportText"),jT=document.querySelector("#ownerProjectCount"),XT=document.querySelector("#ownerObservationCount"),$v=document.querySelector("#ownerProjectList"),Lf=document.querySelector("#ownerObservationList"),zy=document.querySelector("#ownerMarketMessage"),ju=document.querySelector("#shortlistToggle"),Nf=document.querySelector("#shortlistPanel"),YT=document.querySelector("#shortlistClose"),KT=document.querySelector("#shortlistSummary"),zv=document.querySelector("#shortlistList"),Hv=document.querySelector("#shortlistClear"),Ss=Array.from(document.querySelectorAll("[data-deal-field]")),fr=Array.from(document.querySelectorAll("[data-profile-field]")),Xu=Array.from(document.querySelectorAll("[data-dcf-field]")),Yu=Array.from(document.querySelectorAll("[data-dcf-comparable]")),Ia=document.querySelector("#dcfCalculateBtn"),lr=document.querySelector("#dcfDownloadBtn"),Oa=document.querySelector("#dcfMessage"),wi=Array.from(document.querySelectorAll("[data-context-toggle]")),JT=Array.from(document.querySelectorAll("[data-context-reset]")),ZT=Array.from(document.querySelectorAll("[data-starter-prompt], [data-starter-action]")),Hy=window.SpeechRecognition||window.webkitSpeechRecognition,oi=Hy?new Hy:null,Ms="estatelab.jarvis.sessionId",Df="estatelab.jarvis.dealCard",Of="estatelab.jarvis.financialProfile",QT="apex.residentialDcf.v1",Cu="estatelab.jarvis.contextPanels",$p="apex.contextFieldMode.v1",Gy="apex.shortlist.v1",Gv="apex.responseFeedback.v1",Wv="apex.voiceResponses.v1",ws="apex.ownerMarket.token",qv="apex.ownerKnowledge.lastBackup.v1",zp="apex.trustBoundary.accepted.v1",tl=new Map,Pn=window.localStorage.getItem(Wv)==="true",Wi=!1,Ku=!1,cr=!1,Hp=0,$t=window.localStorage.getItem(Ms),ji="login",ft=null,jv=!1,Xv=!1,ho=!1,Yv=!1,sr=null,yp=null,vp=[],ys=null,ka="",mo=null,Ua=null,Ru=[],nl=!1,Xi=[],Kv=[],ja="all",Xa=null,xs=null,uo=[],Ya=null,Iu=[],Ka="",Jv={},Gp=[],Wp=!1,ur="",bo="",Sn=!1;Pu={deal:new Set(["area","projectName","propertyType","askingPrice","conservativeFairValue","expectedRent","estimatedInstallment","maintenance","ownStayAppeal","managementQuality","exitBuyerPool","nearbySupply","mainConcern"]),profile:new Set(["monthlyIncome","cashReserveMonths","cashAvailable","currentDebt","investmentGoal","holdingPeriod","financialConcern"]),guidance:new Set(["experienceLevel","guidanceMode","decisionIntent","preferredOutput","confidenceComfort","onboardingNotes"])};rr={chat:{label:"CHAT",placeholder:"Ask Apex Analytic...",prompt:"Ask naturally. Apex will route the response style."},screen:{label:"SCREEN",placeholder:"Ask if this deal should be shortlisted...",prompt:"Screening mode: include area, price, rent, and concern if you have them."},compare:{label:"COMPARE",placeholder:"Compare two projects, areas, or deals...",prompt:"Comparison mode: name both options and the decision you need."},offer:{label:"OFFER",placeholder:"Prepare offer, negotiation, or walk-away price...",prompt:"Offer mode: Apex will focus on price proof, leverage, and walk-away rule."},checklist:{label:"CHECKLIST",placeholder:"Ask for a checklist or next action list...",prompt:"Checklist mode: Apex will convert the answer into action items."},voice:{label:"VOICE",placeholder:"Ask for a short voice-safe answer...",prompt:"Voice mode: Apex will keep the spoken answer compact."}};kf=[{id:"useful",label:"Useful",note:"Keep this answer shape."},{id:"shorter",label:"Shorter",note:"Make future answers shorter and lead with the decision."},{id:"warmer",label:"Less formal",note:"Make future answers more natural and mentor-like."},{id:"evidence",label:"More proof",note:"Add clearer missing evidence and verification steps."}];oi&&(oi.lang="en-MY",oi.interimResults=!0,oi.continuous=!1,oi.onstart=()=>{Wi=!0,qn.classList.add("listening"),ge("Listening","Speak naturally.")},oi.onresult=n=>{let e=Array.from(n.results).map(t=>t[0].transcript).join(" ");_n.value=e,n.results[n.results.length-1].isFinal&&Co(e)},oi.onerror=()=>{ge("Voice interrupted","Tap the orb to try again.")},oi.onend=()=>{Wi=!1,qn.classList.remove("listening"),window.speechSynthesis?.speaking||ge("System ready","Ready when you are.")});mu.addEventListener("submit",n=>{n.preventDefault(),Co(_n.value)});qn.addEventListener("click",g1);Ky.addEventListener("click",()=>Mi("Voice stopped."));Jy.addEventListener("click",jb);Sp.addEventListener("click",()=>void gb(Sp));La.addEventListener("click",Qa);Gi?.addEventListener("click",()=>void Gb());Zp.addEventListener("click",()=>{Qp.hidden?wo():kn()});Bu.addEventListener("click",()=>{_o.hidden?lb():cn()});Vu.addEventListener("click",()=>{rf.hidden?qb():Ao()});UM.addEventListener("click",Ao);iv.addEventListener("click",jb);_u.addEventListener("click",n=>{let e=n.target.closest("[data-session-action]");e&&p1(e)});IM.addEventListener("click",cn);Na.addEventListener("change",()=>void cb());Da.addEventListener("change",()=>void cb());zu.addEventListener("click",()=>{of.hidden?Vf():un()});$M.addEventListener("click",un);dr.addEventListener("click",n=>{let e=n.target.closest("[data-report-action]");e&&qA(e)});Hu.addEventListener("click",()=>{af.hidden?id():dn()});GM.addEventListener("click",dn);yo.addEventListener("click",n=>{let e=n.target.closest("[data-journal-action]");e?.getAttribute("data-journal-action")==="open"&&db(e.getAttribute("data-journal-id"))});jM.addEventListener("click",()=>void $f());KM.addEventListener("click",()=>void KA());xi.addEventListener("click",ZA);JM.addEventListener("click",()=>void eC());eT.addEventListener("click",()=>void QA());bf.addEventListener("click",()=>{xf.hidden?cd():hn()});pT.addEventListener("click",hn);mf.addEventListener("click",()=>{Gu.hidden?Pb():en()});tT.addEventListener("click",en);Gu.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]");if(!e||yf.contains(e)||gf.contains(e))return;e.getAttribute("data-owner-intel-action")==="refresh"&&Ts()});_f.addEventListener("click",()=>{Sf.hidden?ad():pn()});fT.addEventListener("click",pn);wf.addEventListener("click",()=>{Ef.hidden?ld():fn()});mT.addEventListener("click",fn);Mf.addEventListener("click",()=>{Tf.hidden?Ff():ln()});gT.addEventListener("click",ln);Lp.addEventListener("click",cA);xT.addEventListener("submit",n=>{n.preventDefault();let e=Va.value.trim();if(!e)return Va.focus();jn(e),Ai()});_T.addEventListener("click",()=>{jn(""),Ib({},{}),St("Owner token cleared from this device.")});nT.addEventListener("submit",n=>{n.preventDefault();let e=Si.value.trim();if(!e)return Si.focus();jn(e),Ts()});iT.addEventListener("click",()=>{jn(""),xs=null,Ct.value="",Ct.hidden=!0,_i.hidden=!0,vo.hidden=!0,vo.innerHTML="",jp(),Eb([]),Nu(),Ya=null,Wu.hidden=!0,je("Owner token cleared from this device.")});mv.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-filter]")?.getAttribute("data-owner-intel-filter");e&&(ja=e,wb(Xa?.rows||[]))});Cp.addEventListener("click",()=>void LC().catch(n=>je(n.message||"Production ops could not be checked.","danger")));pu.addEventListener("click",()=>void AC());Rp.addEventListener("click",()=>void RC().catch(n=>je(n.message||"Owner backup could not be exported.","danger")));Ip.addEventListener("click",()=>Su.click());rT.addEventListener("click",()=>void UC().catch(n=>je(n.message||"Restore log could not be loaded.","danger")));Pp.addEventListener("click",()=>void PC().catch(n=>je(n.message||"Backup reminder could not be sent.","danger")));Su.addEventListener("change",()=>void DC(Su.files?.[0]).catch(n=>je(n.message||"Owner backup could not be validated.","danger")));_i.addEventListener("click",()=>void OC().catch(n=>je(n.message||"Owner backup could not be restored.","danger")));vo.addEventListener("click",n=>{let e=n.target.closest("[data-owner-rollback-snapshot]")?.getAttribute("data-owner-rollback-snapshot");e&&FC(e).catch(t=>je(t.message||"Rollback could not be completed.","danger"))});cT.addEventListener("click",()=>void Mb().catch(n=>je(n.message||"User control could not be loaded.","danger")));vf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-admin-action='save']");e&&$C(e).catch(t=>je(t.message||"User could not be updated.","danger"))});yf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]")?.getAttribute("data-owner-intel-action");e==="refresh"&&Ts(),e==="market"&&cd(),e==="cases"&&ad(),e==="evidence"&&ld(),e==="research"&&(Uy.open=!0,Uy.scrollIntoView({behavior:"smooth",block:"start"}))});dT.addEventListener("click",()=>void qf().catch(n=>Wn(n.message||"Research studies could not be loaded.","danger")));hT.addEventListener("click",()=>wu.click());Wu.addEventListener("click",()=>{Ya&&xb(Ya,!0).catch(n=>Wn(n.message||"Research study could not be replaced.","danger"))});wu.addEventListener("change",()=>void gC(wu.files?.[0]).catch(n=>Wn(n.message||"Research study could not be imported.","danger")));yv.addEventListener("click",n=>{let e=n.target.closest("[data-owner-research-action='delete']");e&&yC(e.getAttribute("data-owner-research-id")).catch(t=>Wn(t.message||"Research study could not be deleted.","danger"))});gf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]"),t=e?.getAttribute("data-owner-intel-action");t==="refresh"&&Ts(),["case","signal","proof"].includes(t)&&dR(t,e.getAttribute("data-owner-intel-project"))});wT.addEventListener("submit",n=>{n.preventDefault();let e=$a.value.trim();if(!e)return $a.focus();jn(e),gr()});ET.addEventListener("click",()=>{jn(""),Ou({}),qt("Owner token cleared from this device.")});CT.addEventListener("submit",n=>{n.preventDefault();let e=qa.value.trim();if(!e)return qa.focus();jn(e),ol()});RT.addEventListener("click",()=>{jn(""),Pf.value="",Xp({}),On("Owner token cleared from this device.")});Af.addEventListener("submit",n=>{n.preventDefault(),Eu.disabled=!0,QC().catch(e=>qt(e.message||"Development case could not be saved.","danger")).finally(()=>{Eu.disabled=!1})});If.addEventListener("click",()=>{Kf(),qt("Edit cancelled.")});So.addEventListener("change",()=>{let n=Cb();n&&(hr.value||(hr.value=n.name||""),za.value||(za.value=n.area||""),Ha.value||(Ha.value=n.state||""),Ga.value||(Ga.value=n.propertyType||""),Wa.value||(Wa.value=n.developer||""))});TT.addEventListener("click",()=>void gr().catch(n=>qt(n.message||"Development case library could not be loaded.","danger")));Np.addEventListener("input",()=>void gr().catch(()=>{}));Dp.addEventListener("change",()=>void gr().catch(n=>qt(n.message||"Development case library could not be loaded.","danger")));Lv.addEventListener("change",()=>Ou(Jv));Nv.addEventListener("click",n=>{let e=n.target.closest("[data-owner-case-action]"),t=e?.getAttribute("data-owner-case-action");t==="edit"&&ZC(e),t==="delete"&&eR(e)});Op.addEventListener("submit",n=>{n.preventDefault();let e=Op.querySelector("button[type='submit']");e.disabled=!0,WC().catch(t=>On(t.message||"Evidence could not be added.","danger")).finally(()=>{e.disabled=!1})});LT.addEventListener("click",()=>void ol().catch(n=>On(n.message||"Evidence vault could not be loaded.","danger")));Pf.addEventListener("input",Tb);Uv.addEventListener("click",n=>{let e=n.target.closest("[data-owner-evidence-action='delete']");e&&qC(e)});kp.addEventListener("submit",n=>{n.preventDefault();let e=kp.querySelector("button[type='submit']");e.disabled=!0,hR().catch(t=>St(t.message||"Project could not be added.","danger")).finally(()=>{e.disabled=!1})});Up.addEventListener("submit",n=>{n.preventDefault();let e=Up.querySelector("button[type='submit']");e.disabled=!0,pR().catch(t=>St(t.message||"Observation could not be added.","danger")).finally(()=>{e.disabled=!1})});$y.addEventListener("submit",n=>{n.preventDefault();let e=$y.querySelector("button[type='submit']");e.disabled=!0,fR().catch(t=>St(t.message||"Market batch could not be imported.","danger")).finally(()=>{e.disabled=!1})});pr.addEventListener("change",()=>{let n=Xi.find(e=>e.id===pr.value);n&&!fo.value&&(fo.value=n.area||"")});qT.addEventListener("click",()=>void Ai().catch(n=>St(n.message||"Market evidence could not be loaded.","danger")));Fp.addEventListener("input",()=>void Ai().catch(()=>{}));Bp.addEventListener("change",()=>void Ai().catch(n=>St(n.message||"Market evidence could not be loaded.","danger")));Vp.addEventListener("change",()=>void Ai().catch(n=>St(n.message||"Market evidence could not be loaded.","danger")));Lf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-market-action='delete-observation']");e&&mR(e)});$u.addEventListener("click",n=>{let e=n.target.closest("[data-checkout-plan]");e&&GA(e.getAttribute("data-checkout-plan"))});ju.addEventListener("click",()=>{Nf.hidden?Gf():wn()});YT.addEventListener("click",wn);Hv.addEventListener("click",()=>{rd([]),rl(),ge("System ready","Shortlist cleared.")});Ny.addEventListener("submit",async n=>{n.preventDefault();let e=mp.value.trim();if(!e)return mp.focus();let t=Ny.querySelector("button");t.disabled=!0;try{await ze("/api/memory",{method:"POST",body:JSON.stringify({content:e})}),mp.value="",await td(),ge("System ready","Memory added for review.")}catch(i){ge("Connection issue",i.message||"Memory could not be added.")}finally{t.disabled=!1}});for(let n of[Vt,xu,document.querySelector("#savedReportView")])n.addEventListener("click",e=>{let t=e.target.closest("[data-memory-action]");t&&$A(t);let i=e.target.closest("[data-analysis-action]");i&&pC(i);let s=e.target.closest("[data-response-feedback]");s&&aA(s);let r=e.target.closest("[data-response-refine]");r&&lA(r);let o=e.target.closest("[data-coach-prompt]");o&&(_n.value=o.getAttribute("data-coach-prompt")||"",_n.focus(),ge("System ready","Prompt loaded. Edit or send when ready."))});zv.addEventListener("click",n=>{let e=n.target.closest("[data-shortlist-action]");e&&sC(e)});Zy?.addEventListener("click",n=>{let e=n.target.closest("[data-journey-action]");e&&fC(e)});document.addEventListener("click",n=>{if(n.target.closest("[data-report-back]")){document.querySelector("#savedReportView").hidden=!0,dr.hidden=!1;return}let e=n.target.closest("[data-context-field-mode]");if(e){let i=e.getAttribute("data-context-field-mode");KR(i,tm(i)==="all"?"core":"all");return}let t=n.target.closest("[data-context-focus-panel]");if(t){let i=t.getAttribute("data-context-focus-panel"),s=t.getAttribute("data-context-focus-key"),r=wi.find(o=>o.getAttribute("data-context-toggle")===i);r&&Ei(r,!0),zb(i,s)?.focus()}});EM.addEventListener("click",kn);ev.addEventListener("click",()=>Ja(ji==="login"?"register":"login"));tv.addEventListener("click",()=>Uf(!0));tf.addEventListener("submit",n=>{n.preventDefault(),a1()});sf.addEventListener("submit",n=>{n.preventDefault(),c1()});Mp.addEventListener("click",l1);TM.addEventListener("click",()=>Uf(!1));vu.addEventListener("click",u1);bu.addEventListener("click",d1);Tp.addEventListener("click",f1);window.addEventListener("afterprint",hC);_n.addEventListener("input",()=>Ju());_n.addEventListener("focus",()=>{let n=Ju();ge("System ready",n.prompt)});for(let n of ZT)n.addEventListener("click",()=>{if(n.getAttribute("data-starter-action")==="deal"){yb("deal");return}let e=n.getAttribute("data-starter-prompt");e&&Co(e)});Pa.addEventListener("click",()=>{Pn=!Pn,window.localStorage.setItem(Wv,String(Pn)),Pa.textContent=Pn?"VOICE ON":"VOICE OFF",Pa.setAttribute("aria-pressed",String(Pn)),document.body.classList.toggle("voiceMuted",!Pn),Pn?ge("System ready","Voice response on. Spoken replies stay compact."):Mi("Voice response off.")});for(let n of Ss)n.addEventListener("input",()=>ku(Ss,"data-deal-field",Df));for(let n of fr)n.addEventListener("input",()=>ku(fr,"data-profile-field",Of));for(let n of[...Xu,...Yu.flatMap(e=>Array.from(e.querySelectorAll("[data-dcf-comp-field]")))])n.addEventListener("input",Xy),n.addEventListener("change",Xy);Ia?.addEventListener("click",()=>void WR());lr?.addEventListener("click",()=>void Qf())});var Ut=(n,e,t,i,s)=>({id:n,title:e,prompt:t,fields:i.split(" "),source:s}),wt=[{id:"district",title:"The District",subject:"Property selection",short:"Select",color:"#8fd8be",description:"Find the place worth believing in.",lesson:"A low price is an invitation to investigate. The property still has to earn its place.",position:[-7,0,2],document:"MY_INVESTMENT_FRAMEWORK.md",checkpoints:[Ut("identity","Place your candidate","Start with one real property. Which area, building and unit are you investigating?","projectName area propertyType propertyAge floorArea askingPrice tenure","Stage 1A-C: selection philosophy, area and price segment"),Ut("value","Prove the entry price","Use completed sales of comparable units. Asking prices alone cannot establish value.","conservativeFairValue comparableTransactions comparableSource comparableRecency comparableMatchQuality comparablePriceRange comparableAdjustmentNotes","Stage 1C/G: price discipline and transaction evidence"),Ut("appeal","See the future buyer","Why would someone choose to live here, and why would an investor buy it later?","unitPosition ownStayAppeal exitBuyerPool managementQuality","Stage 1D-F: buyer depth, own-stay appeal and quality"),Ut("visit","Walk the building","Record what you actually observed. Renderings cannot prove a completed building's condition.","siteVisit siteVisitEvidence lobbyGuardhouseSignal liftCarparkCorridorSignal commonAreaCondition residentBehaviourSignal defectLeakageSignal siteVisitNotes inspectionConcern","Stage 1E-F; Execution Calibration D: physical inspection"),Ut("management","Look behind the lobby","Test the management response and collection record. Attractive architecture needs sustained care.","managementResponseSignal arrearsJmbSignal siteManagementNotes","Stage 1F; Execution Calibration E-F: management and project culture")]},{id:"compass",title:"The Compass",subject:"Investor suitability",short:"Fit",color:"#bfd298",description:"Make the property fit your life.",lesson:"Being able to obtain a loan is different from being able to live comfortably with it.",position:[-3.3,.5,-3.5],document:"INVESTOR_MANDATE_PROFILE.md",checkpoints:[Ut("capacity","Measure your breathing room","Use your actual income, existing monthly debt and cash remaining for this purchase.","monthlyIncome currentDebt cashAvailable cashReserveMonths","Buying Power Discipline; Cash Reserve Gate"),Ut("mandate","Choose your destination","Name the job this property must do, the holding period, and any upcoming demands on your cash.","riskStyle investmentGoal holdingPeriod nearTermCommitment financialConcern","Strategy Fit; Refusal And Cooling-Off Rules")]},{id:"vault",title:"The Vault",subject:"Financing & structure",short:"Finance",color:"#dcc597",description:"Build on financing that can hold.",lesson:"The transaction should work at the genuine price, with every payment and obligation visible.",position:[2.5,1,-4.6],document:"DEAL_STRUCTURING_FINANCING.md",checkpoints:[Ut("loan","Test the loan","Use a lender-backed estimate and review margin, documentation and instalment stress together.","estimatedInstallment cashOutlay bankValuationSupport loanPrecheckStatus loanMarginPlan instalmentStress cashBufferAfterPurchase financingDocumentReadiness financingNotes","Loan Margin Discipline; Cash Cost Discipline; Stress Test Standard"),Ut("title","Clear the transaction","Confirm title, seller authority and the path for transferring funds with your lawyer.","legalCheck legalTitleType titleTransferStatus caveatRestrictionStatus sellerAuthorityStatus arrearsUtilitiesStatus stakeholderFlowStatus lawyerCoordinationStatus legalTransactionNotes","Stage 1K: title and transactionability; Financing-Led Deal Test"),Ut("sourcing","Challenge the sales story","Separate evidence about the asset from urgency, promises and negotiation pressure.","dealSource agentBehavior sellerMotivation professionalConcern","Execution Calibration A-C: sourcing, negotiation and professional filtering")]},{id:"residence",title:"The Residence",subject:"Holding power",short:"Hold",color:"#9dcad4",description:"Make the everyday numbers work.",lesson:"Rent is the start of the calculation. Vacancy, maintenance and repairs decide your holding power.",position:[7,.4,-.2],document:"HOLDING_POWER_ASSET_MANAGEMENT.md",checkpoints:[Ut("rent","Follow real tenant demand","Check achieved rents, enquiry quality and seasonality for comparable units.","expectedRent rentEvidence rentalSource rentalRecency tenantUrgency vacancySignal rentalSustainability rentalAdjustmentNotes","Stage 1I: rental resilience; Rental Reality Test"),Ut("costs","Count the quiet costs","Include recurring costs, a repair allowance and vacancy. Enter zero explicitly where it is justified.","maintenance annualAssessmentQuitRent annualInsuranceTax monthlyRepairReserve furnishingBudget vacancyStressMonths","True Holding Cost; Vacancy And Repair Stress"),Ut("tenant","Plan the lived experience","Furnish for the target tenant and screen using documented behaviour, identity and affordability.","targetTenant furnishingStrategy tenantScreening","Execution Calibration G-H: furnishing and tenant management")]},{id:"portfolio",title:"The Collection",subject:"Portfolio strategy",short:"Balance",color:"#b6ace1",description:"Choose what makes the whole stronger.",lesson:"One successful investment does not prove the next. Test how this asset changes your total exposure.",position:[5,.9,5.3],document:"PORTFOLIO_STRATEGY_SCALING.md",checkpoints:[Ut("exposure","Place it in the portfolio","For a first purchase enter zero properties and assess the concentration this new asset would create.","existingProperties portfolioRole existingPortfolioHealth concentrationRisk nextPurchaseReason","Portfolio concentration; Next-Purchase Gate")]},{id:"horizon",title:"The Observatory",subject:"Market & timing",short:"Observe",color:"#e5b6a4",description:"Look past today's sales pitch.",lesson:"A catalyst is a hypothesis. Study competing supply, absorption and your position if it arrives late.",position:[-.1,1.3,7.4],document:"MARKET_INTELLIGENCE_TIMING.md",checkpoints:[Ut("supply","Map the next wave","Inspect the nearest substitutes and future completion dates, including comparable new layouts and prices.","nearbySupply supplyRadius substituteCount substituteThreat futureSupplyTiming densityLiftStress","Stage 1J: supply and density; Supply Pipeline"),Ut("absorption","Read the ground signals","Use dated occupancy, achieved rent and unsold-stock evidence. A busy gallery is not a completed sale.","absorptionEvidence unsoldStockSignal supplyNotes","Local Area Cycle; Buyer Sentiment And Liquidity")]},{id:"summit",title:"The Summit",subject:"Decision & learning",short:"Decide",color:"#e4dfbd",description:"Earn your conclusion.",lesson:"Write what would prove you wrong before the outcome is known. Revisit the thesis as reality changes.",position:[-6,1.1,7],document:"DECISION_JOURNAL_LEARNING.md",checkpoints:[Ut("exit","Design the way out","Consider your future buyers, viewing access, unit presentation and the cost of preparing for sale.","exitStrategyPlan resalePreparation","Execution Calibration I: exit strategy and buyer psychology"),Ut("thesis","Commit the hypothesis","Explain why it should work, the strongest concern and the discovery that makes you walk away.","investmentThesis mainConcern killCriterion","Pre-Purchase Thesis; Counter-Thesis; Kill Criteria; Outcome Review")]}];var md=new Set(["inspectionConcern","professionalConcern","financialConcern","nearTermCommitment"]);function gd(n,e,t){return String(n?.[t[e]?.scope]?.[e]??"").trim()}function Po(n,e,t){let i=e.fields.filter(a=>!md.has(a)&&!gd(n,a,t)),s=n?.evidence?.[e.id];(!s?.note||String(s.note).trim().length<12)&&i.push("evidenceNote");let r=String(s?.date||""),o=Date.parse(r);return(!/^\d{4}-\d{2}-\d{2}$/.test(r)||!Number.isFinite(o)||new Date(o).toISOString().slice(0,10)!==r||r>new Date().toISOString().slice(0,10))&&i.push("evidenceDate"),i}var hs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ps={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Km=0,Qd=1,Jm=2;var eh=1,Zm=2,yi=3,ti=0,Gt=1,bn=2,$i=0,ks=1,th=2,nh=3,ih=4,Qm=5,as=100,eg=101,tg=102,ng=103,ig=104,sg=200,rg=201,og=202,ag=203,Vl=204,$l=205,lg=206,cg=207,ug=208,dg=209,hg=210,pg=211,fg=212,mg=213,gg=214,oc=0,ac=1,lc=2,Us=3,cc=4,uc=5,dc=6,hc=7,pc=0,yg=1,vg=2,zi=0,bg=1,xg=2,_g=3,fc=4,Sg=5,wg=6,Eg=7,Gd="attached",Mg="detached",sh=300,Ys=301,Ks=302,mc=303,gc=304,va=306,ls=1e3,li=1001,Or=1002,zt=1003,yc=1004;var Js=1005;var sn=1006,Kr=1007;var si=1008;var ri=1009,rh=1010,oh=1011,Jr=1012,vc=1013,fs=1014,Hn=1015,Zr=1016,bc=1017,xc=1018,Qr=1020,ah=35902,lh=35899,ch=1021,uh=1022,In=1023,kr=1026,eo=1027,_c=1028,Sc=1029,dh=1030,wc=1031;var Ec=1033,ba=33776,xa=33777,_a=33778,Sa=33779,Mc=35840,Tc=35841,Ac=35842,Cc=35843,Rc=36196,Ic=37492,Pc=37496,Lc=37808,Nc=37809,Dc=37810,Oc=37811,kc=37812,Uc=37813,Fc=37814,Bc=37815,Vc=37816,$c=37817,zc=37818,Hc=37819,Gc=37820,Wc=37821,qc=36492,jc=36494,Xc=36495,Yc=36283,Kc=36284,Jc=36285,Zc=36286,Tg=2200,Ag=2201,Cg=2202,Fs=2300,Bs=2301,Bl=2302,Ds=2400,Os=2401,zo=2402,Qc=2500,Rg=2501,hh=0,wa=1,to=2,Ig=3200,Pg=3201;var eu=0,Lg=1,Hi="",_t="srgb",Ht="srgb-linear",Ho="linear",it="srgb";var Ns=7680;var Wd=519,Ng=512,Dg=513,Og=514,ph=515,kg=516,Ug=517,Fg=518,Bg=519,zl=35044;var fh="300 es",Zn=2e3,Go=2001;var ni=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hm=1234567,Vo=Math.PI/180,Vs=180/Math.PI;function ei(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function We(n,e,t){return Math.max(e,Math.min(t,n))}function mh(n,e){return(n%e+e)%e}function vx(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function bx(n,e,t){return n!==e?(t-n)/(e-n):0}function $o(n,e,t){return(1-t)*n+t*e}function xx(n,e,t,i){return $o(n,e,1-Math.exp(-t*i))}function _x(n,e=1){return e-Math.abs(mh(n,e*2)-e)}function Sx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function wx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ex(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Mx(n,e){return n+Math.random()*(e-n)}function Tx(n){return n*(.5-Math.random())}function Ax(n){n!==void 0&&(hm=n);let e=hm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cx(n){return n*Vo}function Rx(n){return n*Vs}function Ix(n){return(n&n-1)===0&&n!==0}function Px(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Lx(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Nx(n,e,t,i,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),u=o((e+i)/2),d=r((e-i)/2),h=o((e-i)/2),f=r((i-e)/2),y=o((i-e)/2);switch(s){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*y,l*f,a*c);break;case"YXY":n.set(l*f,a*u,l*y,a*c);break;case"ZYZ":n.set(l*y,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Jn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Ea={DEG2RAD:Vo,RAD2DEG:Vs,generateUUID:ei,clamp:We,euclideanModulo:mh,mapLinear:vx,inverseLerp:bx,lerp:$o,damp:xx,pingpong:_x,smoothstep:Sx,smootherstep:wx,randInt:Ex,randFloat:Mx,randFloatSpread:Tx,seededRandom:Ax,degToRad:Cx,radToDeg:Rx,isPowerOfTwo:Ix,ceilPowerOfTwo:Px,floorPowerOfTwo:Lx,setQuaternionFromProperEuler:Nx,normalize:nt,denormalize:Jn},Ce=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Bt=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[o+0],f=r[o+1],y=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=y,e[t+3]=v;return}if(d!==v||l!==h||c!==f||u!==y){let g=1-a,m=l*h+c*f+u*y+d*v,M=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){let C=Math.sqrt(E),A=Math.atan2(C,m*M);g=Math.sin(g*A)/C,a=Math.sin(a*A)/C}let S=a*M;if(l=l*g+h*S,c=c*g+f*S,u=u*g+y*S,d=d*g+v*S,g===1-a){let C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[o],h=r[o+1],f=r[o+2],y=r[o+3];return e[t]=a*y+u*d+l*f-c*h,e[t+1]=l*y+u*h+c*d-a*f,e[t+2]=c*y+u*f+a*h-l*d,e[t+3]=u*y-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(r/2),h=l(i/2),f=l(s/2),y=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*f*y,this._y=c*f*d-h*u*y,this._z=c*u*y+h*f*d,this._w=c*u*d-h*f*y;break;case"YXZ":this._x=h*u*d+c*f*y,this._y=c*f*d-h*u*y,this._z=c*u*y-h*f*d,this._w=c*u*d+h*f*y;break;case"ZXY":this._x=h*u*d-c*f*y,this._y=c*f*d+h*u*y,this._z=c*u*y+h*f*d,this._w=c*u*d-h*f*y;break;case"ZYX":this._x=h*u*d-c*f*y,this._y=c*f*d+h*u*y,this._z=c*u*y-h*f*d,this._w=c*u*d+h*f*y;break;case"YZX":this._x=h*u*d+c*f*y,this._y=c*f*d+h*u*y,this._z=c*u*y-h*f*d,this._w=c*u*d-h*f*y;break;case"XZY":this._x=h*u*d-c*f*y,this._y=c*f*d-h*u*y,this._z=c*u*y+h*f*d,this._w=c*u*d+h*f*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yd.copy(this).projectOnVector(e),this.sub(yd)}reflect(e){return this.sub(yd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},yd=new P,pm=new Bt,Ve=class n{constructor(e,t,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],y=i[8],v=s[0],g=s[3],m=s[6],M=s[1],E=s[4],S=s[7],C=s[2],A=s[5],I=s[8];return r[0]=o*v+a*M+l*C,r[3]=o*g+a*E+l*A,r[6]=o*m+a*S+l*I,r[1]=c*v+u*M+d*C,r[4]=c*g+u*E+d*A,r[7]=c*m+u*S+d*I,r[2]=h*v+f*M+y*C,r[5]=h*g+f*E+y*A,r[8]=h*m+f*S+y*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*r,f=c*r-o*l,y=t*d+i*h+s*f;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/y;return e[0]=d*v,e[1]=(s*c-u*i)*v,e[2]=(a*i-s*o)*v,e[3]=h*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(vd.makeScale(e,t)),this}rotate(e){return this.premultiply(vd.makeRotation(-e)),this}translate(e,t){return this.premultiply(vd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vd=new Ve;function gh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ur(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vg(){let n=Ur("canvas");return n.style.display="block",n}var fm={};function Fr(n){n in fm||(fm[n]=!0,console.warn(n))}function $g(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var mm=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gm=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dx(){let n={enabled:!0,workingColorSpace:Ht,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=Dr(s.r),s.g=Dr(s.g),s.b=Dr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hi?Ho:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Fr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Fr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ht]:{primaries:e,whitePoint:i,transfer:Ho,toXYZ:mm,fromXYZ:gm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_t},outputColorSpaceConfig:{drawingBufferColorSpace:_t}},[_t]:{primaries:e,whitePoint:i,transfer:it,toXYZ:mm,fromXYZ:gm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_t}}}),n}var Ke=Dx();function ki(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Dr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var xr,Hl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{xr===void 0&&(xr=Ur("canvas")),xr.width=e.width,xr.height=e.height;let s=xr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=xr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ur("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ki(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ki(t[i]/255)*255):t[i]=ki(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ox=0,Br=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ox++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(bd(s[o].image)):r.push(bd(s[o]))}else r=bd(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function bd(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Hl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var kx=0,xd=new P,It=class n extends ni{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=li,s=li,r=sn,o=si,a=In,l=ri,c=n.DEFAULT_ANISOTROPY,u=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kx++}),this.uuid=ei(),this.name="",this.source=new Br(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(xd).x}get height(){return this.source.getSize(xd).y}get depth(){return this.source.getSize(xd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ls:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case Or:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ls:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case Or:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=sh;It.DEFAULT_ANISOTROPY=1;var Qe=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],y=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(y-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(y+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,S=(f+1)/2,C=(m+1)/2,A=(u+h)/4,I=(d+v)/4,D=(y+g)/4;return E>S&&E>C?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=A/i,r=I/i):S>C?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=A/s,r=D/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=I/r,s=D/r),this.set(i,s,r,t),this}let M=Math.sqrt((g-y)*(g-y)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-y)/M,this.y=(d-v)/M,this.z=(h-u)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gl=class extends ni{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);let s={width:e,height:t,depth:i.depth},r=new It(s);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Br(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ui=class extends Gl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Wo=class extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wl=class extends It{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xn):Xn.fromBufferAttribute(r,o),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ml.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ml.copy(i.boundingBox)),ml.applyMatrix4(e.matrixWorld),this.union(ml)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lo),gl.subVectors(this.max,Lo),_r.subVectors(e.a,Lo),Sr.subVectors(e.b,Lo),wr.subVectors(e.c,Lo),es.subVectors(Sr,_r),ts.subVectors(wr,Sr),Rs.subVectors(_r,wr);let t=[0,-es.z,es.y,0,-ts.z,ts.y,0,-Rs.z,Rs.y,es.z,0,-es.x,ts.z,0,-ts.x,Rs.z,0,-Rs.x,-es.y,es.x,0,-ts.y,ts.x,0,-Rs.y,Rs.x,0];return!_d(t,_r,Sr,wr,gl)||(t=[1,0,0,0,1,0,0,0,1],!_d(t,_r,Sr,wr,gl))?!1:(yl.crossVectors(es,ts),t=[yl.x,yl.y,yl.z],_d(t,_r,Sr,wr,gl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ii=[new P,new P,new P,new P,new P,new P,new P,new P],Xn=new P,ml=new Rn,_r=new P,Sr=new P,wr=new P,es=new P,ts=new P,Rs=new P,Lo=new P,gl=new P,yl=new P,Is=new P;function _d(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Is.fromArray(n,r);let a=s.x*Math.abs(Is.x)+s.y*Math.abs(Is.y)+s.z*Math.abs(Is.z),l=e.dot(Is),c=t.dot(Is),u=i.dot(Is);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Ux=new Rn,No=new P,Sd=new P,gn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Ux.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;No.subVectors(e,this.center);let t=No.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(No,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(No.copy(e.center).add(Sd)),this.expandByPoint(No.copy(e.center).sub(Sd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Pi=new P,wd=new P,vl=new P,ns=new P,Ed=new P,bl=new P,Md=new P,di=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){wd.copy(e).add(t).multiplyScalar(.5),vl.copy(t).sub(e).normalize(),ns.copy(this.origin).sub(wd);let r=e.distanceTo(t)*.5,o=-this.direction.dot(vl),a=ns.dot(this.direction),l=-ns.dot(vl),c=ns.lengthSq(),u=Math.abs(1-o*o),d,h,f,y;if(u>0)if(d=o*l-a,h=o*a-l,y=r*u,d>=0)if(h>=-y)if(h<=y){let v=1/u;d*=v,h*=v,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-y?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=y?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(wd).addScaledVector(vl,h),f}intersectSphere(e,t){Pi.subVectors(e.center,this.origin);let i=Pi.dot(this.direction),s=Pi.dot(Pi)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,i,s,r){Ed.subVectors(t,e),bl.subVectors(i,e),Md.crossVectors(Ed,bl);let o=this.direction.dot(Md),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ns.subVectors(this.origin,e);let l=a*this.direction.dot(bl.crossVectors(ns,bl));if(l<0)return null;let c=a*this.direction.dot(Ed.cross(ns));if(c<0||l+c>o)return null;let u=-a*ns.dot(Md);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Be=class n{constructor(e,t,i,s,r,o,a,l,c,u,d,h,f,y,v,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,d,h,f,y,v,g)}set(e,t,i,s,r,o,a,l,c,u,d,h,f,y,v,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=y,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/Er.setFromMatrixColumn(e,0).length(),r=1/Er.setFromMatrixColumn(e,1).length(),o=1/Er.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=o*u,f=o*d,y=a*u,v=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+y*c,t[5]=h-v*c,t[9]=-a*l,t[2]=v-h*c,t[6]=y+f*c,t[10]=o*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,y=c*u,v=c*d;t[0]=h+v*a,t[4]=y*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-y,t[6]=v+h*a,t[10]=o*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,y=c*u,v=c*d;t[0]=h-v*a,t[4]=-o*d,t[8]=y+f*a,t[1]=f+y*a,t[5]=o*u,t[9]=v-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let h=o*u,f=o*d,y=a*u,v=a*d;t[0]=l*u,t[4]=y*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-y,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let h=o*l,f=o*c,y=a*l,v=a*c;t[0]=l*u,t[4]=v-h*d,t[8]=y*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+y,t[10]=h-v*d}else if(e.order==="XZY"){let h=o*l,f=o*c,y=a*l,v=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=o*u,t[9]=f*d-y,t[2]=y*d-f,t[6]=a*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fx,e,Bx)}lookAt(e,t,i){let s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),is.crossVectors(i,An),is.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),is.crossVectors(i,An)),is.normalize(),xl.crossVectors(An,is),s[0]=is.x,s[4]=xl.x,s[8]=An.x,s[1]=is.y,s[5]=xl.y,s[9]=An.y,s[2]=is.z,s[6]=xl.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],y=i[2],v=i[6],g=i[10],m=i[14],M=i[3],E=i[7],S=i[11],C=i[15],A=s[0],I=s[4],D=s[8],w=s[12],_=s[1],L=s[5],F=s[9],H=s[13],W=s[2],Y=s[6],q=s[10],se=s[14],z=s[3],ae=s[7],de=s[11],xe=s[15];return r[0]=o*A+a*_+l*W+c*z,r[4]=o*I+a*L+l*Y+c*ae,r[8]=o*D+a*F+l*q+c*de,r[12]=o*w+a*H+l*se+c*xe,r[1]=u*A+d*_+h*W+f*z,r[5]=u*I+d*L+h*Y+f*ae,r[9]=u*D+d*F+h*q+f*de,r[13]=u*w+d*H+h*se+f*xe,r[2]=y*A+v*_+g*W+m*z,r[6]=y*I+v*L+g*Y+m*ae,r[10]=y*D+v*F+g*q+m*de,r[14]=y*w+v*H+g*se+m*xe,r[3]=M*A+E*_+S*W+C*z,r[7]=M*I+E*L+S*Y+C*ae,r[11]=M*D+E*F+S*q+C*de,r[15]=M*w+E*H+S*se+C*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],y=e[3],v=e[7],g=e[11],m=e[15];return y*(+r*l*d-s*c*d-r*a*h+i*c*h+s*a*f-i*l*f)+v*(+t*l*f-t*c*h+r*o*h-s*o*f+s*c*u-r*l*u)+g*(+t*c*d-t*a*f-r*o*d+i*o*f+r*a*u-i*c*u)+m*(-s*a*u-t*l*d+t*a*h+s*o*d-i*o*h+i*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],y=e[12],v=e[13],g=e[14],m=e[15],M=d*g*c-v*h*c+v*l*f-a*g*f-d*l*m+a*h*m,E=y*h*c-u*g*c-y*l*f+o*g*f+u*l*m-o*h*m,S=u*v*c-y*d*c+y*a*f-o*v*f-u*a*m+o*d*m,C=y*d*l-u*v*l-y*a*h+o*v*h+u*a*g-o*d*g,A=t*M+i*E+s*S+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/A;return e[0]=M*I,e[1]=(v*h*r-d*g*r-v*s*f+i*g*f+d*s*m-i*h*m)*I,e[2]=(a*g*r-v*l*r+v*s*c-i*g*c-a*s*m+i*l*m)*I,e[3]=(d*l*r-a*h*r-d*s*c+i*h*c+a*s*f-i*l*f)*I,e[4]=E*I,e[5]=(u*g*r-y*h*r+y*s*f-t*g*f-u*s*m+t*h*m)*I,e[6]=(y*l*r-o*g*r-y*s*c+t*g*c+o*s*m-t*l*m)*I,e[7]=(o*h*r-u*l*r+u*s*c-t*h*c-o*s*f+t*l*f)*I,e[8]=S*I,e[9]=(y*d*r-u*v*r-y*i*f+t*v*f+u*i*m-t*d*m)*I,e[10]=(o*v*r-y*a*r+y*i*c-t*v*c-o*i*m+t*a*m)*I,e[11]=(u*a*r-o*d*r-u*i*c+t*d*c+o*i*f-t*a*f)*I,e[12]=C*I,e[13]=(u*v*s-y*d*s+y*i*h-t*v*h-u*i*g+t*d*g)*I,e[14]=(y*a*s-o*v*s-y*i*l+t*v*l+o*i*g-t*a*g)*I,e[15]=(o*d*s-u*a*s+u*i*l-t*d*l-o*i*h+t*a*h)*I,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,h=r*c,f=r*u,y=r*d,v=o*u,g=o*d,m=a*d,M=l*c,E=l*u,S=l*d,C=i.x,A=i.y,I=i.z;return s[0]=(1-(v+m))*C,s[1]=(f+S)*C,s[2]=(y-E)*C,s[3]=0,s[4]=(f-S)*A,s[5]=(1-(h+m))*A,s[6]=(g+M)*A,s[7]=0,s[8]=(y+E)*I,s[9]=(g-M)*I,s[10]=(1-(h+v))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=Er.set(s[0],s[1],s[2]).length(),o=Er.set(s[4],s[5],s[6]).length(),a=Er.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Yn.copy(this);let c=1/r,u=1/o,d=1/a;return Yn.elements[0]*=c,Yn.elements[1]*=c,Yn.elements[2]*=c,Yn.elements[4]*=u,Yn.elements[5]*=u,Yn.elements[6]*=u,Yn.elements[8]*=d,Yn.elements[9]*=d,Yn.elements[10]*=d,t.setFromRotationMatrix(Yn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Zn,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s),y,v;if(l)y=r/(o-r),v=o*r/(o-r);else if(a===Zn)y=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Go)y=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=y,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Zn,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),f=-(i+s)/(i-s),y,v;if(l)y=1/(o-r),v=o/(o-r);else if(a===Zn)y=-2/(o-r),v=-(o+r)/(o-r);else if(a===Go)y=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=y,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Er=new P,Yn=new Be,Fx=new P(0,0,0),Bx=new P(1,1,1),is=new P,xl=new P,An=new P,ym=new Be,vm=new Bt,zn=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ym.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ym,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vm.setFromEuler(this),this.setFromQuaternion(vm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zn.DEFAULT_ORDER="XYZ";var Vr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Vx=0,bm=new P,Mr=new Bt,Li=new Be,_l=new P,Do=new P,$x=new P,zx=new Bt,xm=new P(1,0,0),_m=new P(0,1,0),Sm=new P(0,0,1),wm={type:"added"},Hx={type:"removed"},Tr={type:"childadded",child:null},Td={type:"childremoved",child:null},ht=class n extends ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vx++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new P,t=new zn,i=new Bt,s=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Be},normalMatrix:{value:new Ve}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mr.setFromAxisAngle(e,t),this.quaternion.multiply(Mr),this}rotateOnWorldAxis(e,t){return Mr.setFromAxisAngle(e,t),this.quaternion.premultiply(Mr),this}rotateX(e){return this.rotateOnAxis(xm,e)}rotateY(e){return this.rotateOnAxis(_m,e)}rotateZ(e){return this.rotateOnAxis(Sm,e)}translateOnAxis(e,t){return bm.copy(e).applyQuaternion(this.quaternion),this.position.add(bm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xm,e)}translateY(e){return this.translateOnAxis(_m,e)}translateZ(e){return this.translateOnAxis(Sm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_l.copy(e):_l.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Do.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(Do,_l,this.up):Li.lookAt(_l,Do,this.up),this.quaternion.setFromRotationMatrix(Li),s&&(Li.extractRotation(s.matrixWorld),Mr.setFromRotationMatrix(Li),this.quaternion.premultiply(Mr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wm),Tr.child=e,this.dispatchEvent(Tr),Tr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hx),Td.child=e,this.dispatchEvent(Td),Td.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wm),Tr.child=e,this.dispatchEvent(Tr),Tr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Do,e,$x),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Do,zx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),y=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),y.length>0&&(i.nodes=y)}return i.object=s,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};ht.DEFAULT_UP=new P(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Kn=new P,Ni=new P,Ad=new P,Di=new P,Ar=new P,Cr=new P,Em=new P,Cd=new P,Rd=new P,Id=new P,Pd=new Qe,Ld=new Qe,Nd=new Qe,os=class n{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Kn.subVectors(e,t),s.cross(Kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Kn.subVectors(s,t),Ni.subVectors(i,t),Ad.subVectors(e,t);let o=Kn.dot(Kn),a=Kn.dot(Ni),l=Kn.dot(Ad),c=Ni.dot(Ni),u=Ni.dot(Ad),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-a*u)*h,y=(o*u-a*l)*h;return r.set(1-f-y,y,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,Di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Di.x),l.addScaledVector(o,Di.y),l.addScaledVector(a,Di.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Pd.setScalar(0),Ld.setScalar(0),Nd.setScalar(0),Pd.fromBufferAttribute(e,t),Ld.fromBufferAttribute(e,i),Nd.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Pd,r.x),o.addScaledVector(Ld,r.y),o.addScaledVector(Nd,r.z),o}static isFrontFacing(e,t,i,s){return Kn.subVectors(i,t),Ni.subVectors(e,t),Kn.cross(Ni).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),Kn.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;Ar.subVectors(s,i),Cr.subVectors(r,i),Cd.subVectors(e,i);let l=Ar.dot(Cd),c=Cr.dot(Cd);if(l<=0&&c<=0)return t.copy(i);Rd.subVectors(e,s);let u=Ar.dot(Rd),d=Cr.dot(Rd);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ar,o);Id.subVectors(e,r);let f=Ar.dot(Id),y=Cr.dot(Id);if(y>=0&&f<=y)return t.copy(r);let v=f*c-l*y;if(v<=0&&c>=0&&y<=0)return a=c/(c-y),t.copy(i).addScaledVector(Cr,a);let g=u*y-f*d;if(g<=0&&d-u>=0&&f-y>=0)return Em.subVectors(r,s),a=(d-u)/(d-u+(f-y)),t.copy(s).addScaledVector(Em,a);let m=1/(g+v+h);return o=v*m,a=h*m,t.copy(i).addScaledVector(Ar,o).addScaledVector(Cr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},Sl={h:0,s:0,l:0};function Dd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Pe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ke.workingColorSpace){if(e=mh(e,1),t=We(t,0,1),i=We(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Dd(o,r,e+1/3),this.g=Dd(o,r,e),this.b=Dd(o,r,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=_t){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){let i=zg[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=Dr(e.r),this.g=Dr(e.g),this.b=Dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return Ke.workingToColorSpace(Jt.copy(this),e),Math.round(We(Jt.r*255,0,255))*65536+Math.round(We(Jt.g*255,0,255))*256+Math.round(We(Jt.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Jt.copy(this),t);let i=Jt.r,s=Jt.g,r=Jt.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=_t){Ke.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,i=Jt.g,s=Jt.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ss),this.setHSL(ss.h+e,ss.s+t,ss.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ss),e.getHSL(Sl);let i=$o(ss.h,Sl.h,t),s=$o(ss.s,Sl.s,t),r=$o(ss.l,Sl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new Pe;Pe.NAMES=zg;var Gx=0,rn=class extends ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gx++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=ks,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vl,this.blendDst=$l,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ns,this.stencilZFail=Ns,this.stencilZPass=Ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(i.blending=this.blending),this.side!==ti&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Vl&&(i.blendSrc=this.blendSrc),this.blendDst!==$l&&(i.blendDst=this.blendDst),this.blendEquation!==as&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Us&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ns&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ns&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ns&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},on=class extends rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Et=new P,wl=new Ce,Wx=0,Tt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=zl,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)wl.fromBufferAttribute(this,t),wl.applyMatrix3(e),this.setXY(t,wl.x,wl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Jn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zl&&(e.usage=this.usage),e}};var qo=class extends Tt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var jo=class extends Tt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Rt=class extends Tt{constructor(e,t,i){super(new Float32Array(e),t,i)}},qx=0,Vn=new Be,Od=new ht,Rr=new P,Cn=new Rn,Oo=new Rn,Ft=new P,an=class n extends ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gh(e)?jo:qo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ve().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vn.makeRotationFromQuaternion(e),this.applyMatrix4(Vn),this}rotateX(e){return Vn.makeRotationX(e),this.applyMatrix4(Vn),this}rotateY(e){return Vn.makeRotationY(e),this.applyMatrix4(Vn),this}rotateZ(e){return Vn.makeRotationZ(e),this.applyMatrix4(Vn),this}translate(e,t,i){return Vn.makeTranslation(e,t,i),this.applyMatrix4(Vn),this}scale(e,t,i){return Vn.makeScale(e,t,i),this.applyMatrix4(Vn),this}lookAt(e){return Od.lookAt(e),Od.updateMatrix(),this.applyMatrix4(Od.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rr).negate(),this.translate(Rr.x,Rr.y,Rr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Rt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let i=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Oo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(Cn.min,Oo.min),Cn.expandByPoint(Ft),Ft.addVectors(Cn.max,Oo.max),Cn.expandByPoint(Ft)):(Cn.expandByPoint(Oo.min),Cn.expandByPoint(Oo.max))}Cn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ft.fromBufferAttribute(a,c),l&&(Rr.fromBufferAttribute(e,c),Ft.add(Rr)),s=Math.max(s,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tt(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new P,l[D]=new P;let c=new P,u=new P,d=new P,h=new Ce,f=new Ce,y=new Ce,v=new P,g=new P;function m(D,w,_){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,_),h.fromBufferAttribute(r,D),f.fromBufferAttribute(r,w),y.fromBufferAttribute(r,_),u.sub(c),d.sub(c),f.sub(h),y.sub(h);let L=1/(f.x*y.y-y.x*f.y);isFinite(L)&&(v.copy(u).multiplyScalar(y.y).addScaledVector(d,-f.y).multiplyScalar(L),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-y.x).multiplyScalar(L),a[D].add(v),a[w].add(v),a[_].add(v),l[D].add(g),l[w].add(g),l[_].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let D=0,w=M.length;D<w;++D){let _=M[D],L=_.start,F=_.count;for(let H=L,W=L+F;H<W;H+=3)m(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let E=new P,S=new P,C=new P,A=new P;function I(D){C.fromBufferAttribute(s,D),A.copy(C);let w=a[D];E.copy(w),E.sub(C.multiplyScalar(C.dot(w))).normalize(),S.crossVectors(A,w);let L=S.dot(l[D])<0?-1:1;o.setXYZW(D,E.x,E.y,E.z,L)}for(let D=0,w=M.length;D<w;++D){let _=M[D],L=_.start,F=_.count;for(let H=L,W=L+F;H<W;H+=3)I(e.getX(H+0)),I(e.getX(H+1)),I(e.getX(H+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,u=new P,d=new P;if(e)for(let h=0,f=e.count;h<f;h+=3){let y=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,y),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,y),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(y,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u),f=0,y=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*u;for(let m=0;m<u;m++)h[y++]=c[f++]}return new Tt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,i);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mm=new Be,Ps=new di,El=new gn,Tm=new P,Ml=new P,Tl=new P,Al=new P,kd=new P,Cl=new P,Am=new P,Rl=new P,st=class extends ht{constructor(e=new an,t=new on){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Cl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],d=r[l];u!==0&&(kd.fromBufferAttribute(d,e),o?Cl.addScaledVector(kd,u):Cl.addScaledVector(kd.sub(t),u))}t.add(Cl)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),El.copy(i.boundingSphere),El.applyMatrix4(r),Ps.copy(e.ray).recast(e.near),!(El.containsPoint(Ps.origin)===!1&&(Ps.intersectSphere(El,Tm)===null||Ps.origin.distanceToSquared(Tm)>(e.far-e.near)**2))&&(Mm.copy(r).invert(),Ps.copy(e.ray).applyMatrix4(Mm),!(i.boundingBox!==null&&Ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ps)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let y=0,v=h.length;y<v;y++){let g=h[y],m=o[g.materialIndex],M=Math.max(g.start,f.start),E=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let S=M,C=E;S<C;S+=3){let A=a.getX(S),I=a.getX(S+1),D=a.getX(S+2);s=Il(this,m,e,i,c,u,d,A,I,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let y=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=y,m=v;g<m;g+=3){let M=a.getX(g),E=a.getX(g+1),S=a.getX(g+2);s=Il(this,o,e,i,c,u,d,M,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let y=0,v=h.length;y<v;y++){let g=h[y],m=o[g.materialIndex],M=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let S=M,C=E;S<C;S+=3){let A=S,I=S+1,D=S+2;s=Il(this,m,e,i,c,u,d,A,I,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let y=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=y,m=v;g<m;g+=3){let M=g,E=g+1,S=g+2;s=Il(this,o,e,i,c,u,d,M,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function jx(n,e,t,i,s,r,o,a){let l;if(e.side===Gt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===ti,a),l===null)return null;Rl.copy(a),Rl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Rl);return c<t.near||c>t.far?null:{distance:c,point:Rl.clone(),object:n}}function Il(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Ml),n.getVertexPosition(l,Tl),n.getVertexPosition(c,Al);let u=jx(n,e,t,i,Ml,Tl,Al,Am);if(u){let d=new P;os.getBarycoord(Am,Ml,Tl,Al,d),s&&(u.uv=os.getInterpolatedAttribute(s,a,l,c,d,new Ce)),r&&(u.uv1=os.getInterpolatedAttribute(r,a,l,c,d,new Ce)),o&&(u.normal=os.getInterpolatedAttribute(o,a,l,c,d,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new P,materialIndex:0};os.getNormal(Ml,Tl,Al,h.normal),u.face=h,u.barycoord=d}return u}var cs=class n extends an{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],d=[],h=0,f=0;y("z","y","x",-1,-1,i,t,e,o,r,0),y("z","y","x",1,-1,i,t,-e,o,r,1),y("x","z","y",1,1,e,i,t,s,o,2),y("x","z","y",1,-1,e,i,-t,s,o,3),y("x","y","z",1,-1,e,t,i,s,r,4),y("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(d,2));function y(v,g,m,M,E,S,C,A,I,D,w){let _=S/I,L=C/D,F=S/2,H=C/2,W=A/2,Y=I+1,q=D+1,se=0,z=0,ae=new P;for(let de=0;de<q;de++){let xe=de*L-H;for(let Ue=0;Ue<Y;Ue++){let tt=Ue*_-F;ae[v]=tt*M,ae[g]=xe*E,ae[m]=W,c.push(ae.x,ae.y,ae.z),ae[v]=0,ae[g]=0,ae[m]=A>0?1:-1,u.push(ae.x,ae.y,ae.z),d.push(Ue/I),d.push(1-de/D),se+=1}}for(let de=0;de<D;de++)for(let xe=0;xe<I;xe++){let Ue=h+xe+Y*de,tt=h+xe+Y*(de+1),lt=h+(xe+1)+Y*(de+1),Je=h+(xe+1)+Y*de;l.push(Ue,tt,Je),l.push(tt,lt,Je),z+=6}a.addGroup(f,z,w),f+=z,h+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Zs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Zt(n){let e={};for(let t=0;t<n.length;t++){let i=Zs(n[t]);for(let s in i)e[s]=i[s]}return e}function Xx(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}var Hg={clone:Zs,merge:Zt},Yx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ii=class extends rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yx,this.fragmentShader=Kx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zs(e.uniforms),this.uniformsGroups=Xx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Xo=class extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},rs=new P,Cm=new Ce,Rm=new Ce,Mt=class extends Xo{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Vo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Vo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(rs.x,rs.y).multiplyScalar(-e/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rs.x,rs.y).multiplyScalar(-e/rs.z)}getViewSize(e,t){return this.getViewBounds(e,Cm,Rm),t.subVectors(Rm,Cm)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Vo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ir=-90,Pr=1,ql=class extends ht{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Mt(Ir,Pr,e,t);s.layers=this.layers,this.add(s);let r=new Mt(Ir,Pr,e,t);r.layers=this.layers,this.add(r);let o=new Mt(Ir,Pr,e,t);o.layers=this.layers,this.add(o);let a=new Mt(Ir,Pr,e,t);a.layers=this.layers,this.add(a);let l=new Mt(Ir,Pr,e,t);l.layers=this.layers,this.add(l);let c=new Mt(Ir,Pr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===Zn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Go)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}},Yo=class extends It{constructor(e=[],t=Ys,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},jl=class extends ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Yo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new cs(5,5,5),r=new ii({name:"CubemapFromEquirect",uniforms:Zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:$i});r.uniforms.tEquirect.value=t;let o=new st(s,r),a=t.minFilter;return t.minFilter===si&&(t.minFilter=sn),new ql(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}},Qn=class extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}},Jx={type:"move"},$r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,i),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,y=.005;c.inputState.pinching&&h>f+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jx)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Qn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var $s=class extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=zl,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},nn=new P,Hr=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Jn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Im=new P,Pm=new Qe,Lm=new Qe,Zx=new P,Nm=new Be,Pl=new P,Ud=new gn,Dm=new Be,Fd=new di,Ko=class extends st{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Gd,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Rn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Pl),this.boundingBox.expandByPoint(Pl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new gn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Pl),this.boundingSphere.expandByPoint(Pl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ud.copy(this.boundingSphere),Ud.applyMatrix4(s),e.ray.intersectsSphere(Ud)!==!1&&(Dm.copy(s).invert(),Fd.copy(e.ray).applyMatrix4(Dm),!(this.boundingBox!==null&&Fd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Fd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Qe,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Gd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Mg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,s=this.geometry;Pm.fromBufferAttribute(s.attributes.skinIndex,e),Lm.fromBufferAttribute(s.attributes.skinWeight,e),Im.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Lm.getComponent(r);if(o!==0){let a=Pm.getComponent(r);Nm.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(Zx.copy(Im).applyMatrix4(Nm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Gr=class extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}},Jo=class extends It{constructor(e=null,t=1,i=1,s,r,o,a,l,c=zt,u=zt,d,h){super(null,o,a,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Om=new Be,Qx=new Be,Zo=class n{constructor(e=[],t=[]){this.uuid=ei(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new Be;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Qx;Om.multiplyMatrices(a,t[r]),Om.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new Jo(t,e,e,In,Hn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){let r=e.bones[i],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Gr),this.bones.push(o),this.boneInverses.push(new Be().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=i[s];e.boneInverses.push(a.toArray())}return e}},us=class extends Tt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Lr=new Be,km=new Be,Ll=[],Um=new Rn,e_=new Be,ko=new st,Uo=new gn,zs=class extends st{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new us(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,e_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Lr),Um.copy(e.boundingBox).applyMatrix4(Lr),this.boundingBox.union(Um)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Lr),Uo.copy(e.boundingSphere).applyMatrix4(Lr),this.boundingSphere.union(Uo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(ko.geometry=this.geometry,ko.material=this.material,ko.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Uo.copy(this.boundingSphere),Uo.applyMatrix4(i),e.ray.intersectsSphere(Uo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Lr),km.multiplyMatrices(i,Lr),ko.matrixWorld=km,ko.raycast(e,Ll);for(let o=0,a=Ll.length;o<a;o++){let l=Ll[o];l.instanceId=r,l.object=this,t.push(l)}Ll.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new us(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Jo(new Float32Array(s*this.count),s,this.count,_c,Hn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Bd=new P,t_=new P,n_=new Ve,$n=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Bd.subVectors(i,t).cross(t_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Bd),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||n_.getNormalMatrix(e),s=this.coplanarPoint(Bd).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ls=new gn,i_=new Ce(.5,.5),Nl=new P,Wr=class{constructor(e=new $n,t=new $n,i=new $n,s=new $n,r=new $n,o=new $n){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Zn,i=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],y=r[8],v=r[9],g=r[10],m=r[11],M=r[12],E=r[13],S=r[14],C=r[15];if(s[0].setComponents(c-o,f-u,m-y,C-M).normalize(),s[1].setComponents(c+o,f+u,m+y,C+M).normalize(),s[2].setComponents(c+a,f+d,m+v,C+E).normalize(),s[3].setComponents(c-a,f-d,m-v,C-E).normalize(),i)s[4].setComponents(l,h,g,S).normalize(),s[5].setComponents(c-l,f-h,m-g,C-S).normalize();else if(s[4].setComponents(c-l,f-h,m-g,C-S).normalize(),t===Zn)s[5].setComponents(c+l,f+h,m+g,C+S).normalize();else if(t===Go)s[5].setComponents(l,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ls)}intersectsSprite(e){Ls.center.set(0,0,0);let t=i_.distanceTo(e.center);return Ls.radius=.7071067811865476+t,Ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ls)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Nl.x=s.normal.x>0?e.max.x:e.min.x,Nl.y=s.normal.y>0?e.max.y:e.min.y,Nl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Nl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var qr=class extends rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xl=new P,Yl=new P,Fm=new Be,Fo=new di,Dl=new gn,Vd=new P,Bm=new P,Hs=class extends ht{constructor(e=new an,t=new qr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Xl.fromBufferAttribute(t,s-1),Yl.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Xl.distanceTo(Yl);e.setAttribute("lineDistance",new Rt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Dl.copy(i.boundingSphere),Dl.applyMatrix4(s),Dl.radius+=r,e.ray.intersectsSphere(Dl)===!1)return;Fm.copy(s).invert(),Fo.copy(e.ray).applyMatrix4(Fm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let f=Math.max(0,o.start),y=Math.min(u.count,o.start+o.count);for(let v=f,g=y-1;v<g;v+=c){let m=u.getX(v),M=u.getX(v+1),E=Ol(this,e,Fo,l,m,M,v);E&&t.push(E)}if(this.isLineLoop){let v=u.getX(y-1),g=u.getX(f),m=Ol(this,e,Fo,l,v,g,y-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),y=Math.min(h.count,o.start+o.count);for(let v=f,g=y-1;v<g;v+=c){let m=Ol(this,e,Fo,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){let v=Ol(this,e,Fo,l,y-1,f,y-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ol(n,e,t,i,s,r,o){let a=n.geometry.attributes.position;if(Xl.fromBufferAttribute(a,s),Yl.fromBufferAttribute(a,r),t.distanceSqToSegment(Xl,Yl,Vd,Bm)>i)return;Vd.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Vd);if(!(c<e.near||c>e.far))return{distance:c,point:Bm.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Vm=new P,$m=new P,Qo=class extends Hs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Vm.fromBufferAttribute(t,s),$m.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Vm.distanceTo($m);e.setAttribute("lineDistance",new Rt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ea=class extends Hs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},jr=class extends rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},zm=new Be,qd=new di,kl=new gn,Ul=new P,ta=class extends ht{constructor(e=new an,t=new jr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),kl.copy(i.boundingSphere),kl.applyMatrix4(s),kl.radius+=r,e.ray.intersectsSphere(kl)===!1)return;zm.copy(s).invert(),qd.copy(e.ray).applyMatrix4(zm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let y=h,v=f;y<v;y++){let g=c.getX(y);Ul.fromBufferAttribute(d,g),Hm(Ul,g,l,s,e,t,this)}}else{let h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let y=h,v=f;y<v;y++)Ul.fromBufferAttribute(d,y),Hm(Ul,y,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Hm(n,e,t,i,s,r,o){let a=qd.distanceSqToPoint(n);if(a<t){let l=new P;qd.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var na=class extends It{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ia=class extends It{constructor(e,t,i=fs,s,r,o,a=zt,l=zt,c,u=kr,d=1){if(u!==kr&&u!==eo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Br(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},sa=class extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var ra=class n extends an{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],y=0,v=[],g=i/2,m=0;M(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Rt(d,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(f,2));function M(){let S=new P,C=new P,A=0,I=(t-e)/i;for(let D=0;D<=r;D++){let w=[],_=D/r,L=_*(t-e)+e;for(let F=0;F<=s;F++){let H=F/s,W=H*l+a,Y=Math.sin(W),q=Math.cos(W);C.x=L*Y,C.y=-_*i+g,C.z=L*q,d.push(C.x,C.y,C.z),S.set(Y,I,q).normalize(),h.push(S.x,S.y,S.z),f.push(H,1-_),w.push(y++)}v.push(w)}for(let D=0;D<s;D++)for(let w=0;w<r;w++){let _=v[w][D],L=v[w+1][D],F=v[w+1][D+1],H=v[w][D+1];(e>0||w!==0)&&(u.push(_,L,H),A+=3),(t>0||w!==r-1)&&(u.push(L,F,H),A+=3)}c.addGroup(m,A,0),m+=A}function E(S){let C=y,A=new Ce,I=new P,D=0,w=S===!0?e:t,_=S===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*_,0),h.push(0,_,0),f.push(.5,.5),y++;let L=y;for(let F=0;F<=s;F++){let W=F/s*l+a,Y=Math.cos(W),q=Math.sin(W);I.x=w*q,I.y=g*_,I.z=w*Y,d.push(I.x,I.y,I.z),h.push(0,_,0),A.x=Y*.5+.5,A.y=q*.5*_+.5,f.push(A.x,A.y),y++}for(let F=0;F<s;F++){let H=C+F,W=L+F;S===!0?u.push(W,W+1,H):u.push(W+1,W,H),D+=3}c.addGroup(m,D,S===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Gs=class n extends an{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=e/a,h=t/l,f=[],y=[],v=[],g=[];for(let m=0;m<u;m++){let M=m*h-o;for(let E=0;E<c;E++){let S=E*d-r;y.push(S,-M,0),v.push(0,0,1),g.push(E/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<a;M++){let E=M+c*m,S=M+c*(m+1),C=M+1+c*(m+1),A=M+1+c*m;f.push(E,S,A),f.push(S,C,A)}this.setIndex(f),this.setAttribute("position",new Rt(y,3)),this.setAttribute("normal",new Rt(v,3)),this.setAttribute("uv",new Rt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},oa=class n extends an{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],l=[],c=[],u=[],d=e,h=(t-e)/s,f=new P,y=new Ce;for(let v=0;v<=s;v++){for(let g=0;g<=i;g++){let m=r+g/i*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),y.x=(f.x/t+1)/2,y.y=(f.y/t+1)/2,u.push(y.x,y.y)}d+=h}for(let v=0;v<s;v++){let g=v*(i+1);for(let m=0;m<i;m++){let M=m+g,E=M,S=M+i+1,C=M+i+2,A=M+1;a.push(E,S,A),a.push(S,C,A)}}this.setIndex(a),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var hi=class extends rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=eu,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},yn=class extends hi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var aa=class extends rn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=eu,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Kl=class extends rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ig,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Jl=class extends rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Fl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function s_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function r_(n){function e(s,r){return n[s]-n[r]}let t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function Gm(n,e,t){let i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=n[a+l]}return s}function Gg(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(e.push(r.time),t.push(...o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(e.push(r.time),t.push(o)),r=n[s++];while(r!==void 0)}var Ui=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break t}o=i,i=0;break n}break e}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Zl=class extends Ui{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ds,endingEnd:Ds}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Os:r=e,a=2*t-i;break;case zo:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Os:o=e,l=2*i-t;break;case zo:o=1,l=i+s[1]-s[0];break;default:o=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,y=(i-t)/(s-t),v=y*y,g=v*y,m=-h*g+2*h*v-h*y,M=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*y+1,E=(-1-f)*g+(1.5+f)*v+.5*y,S=f*g-f*v;for(let C=0;C!==a;++C)r[C]=m*o[u+C]+M*o[c+C]+E*o[l+C]+S*o[d+C];return r}},la=class extends Ui{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(s-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}},Ql=class extends Ui{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},vn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fl(t,this.TimeBufferType),this.values=Fl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Fl(e.times,Array),values:Fl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ql(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new la(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Zl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fs:t=this.InterpolantFactoryMethodDiscrete;break;case Bs:t=this.InterpolantFactoryMethodLinear;break;case Bl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fs;case this.InterpolantFactoryMethodLinear:return Bs;case this.InterpolantFactoryMethodSmooth:return Bl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&s_(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Bl,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let d=a*i,h=d-i,f=d+i;for(let y=0;y!==i;++y){let v=t[d+y];if(v!==t[h+y]||v!==t[f+y]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*i,h=o*i;for(let f=0;f!==i;++f)t[h+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};vn.prototype.ValueTypeName="";vn.prototype.TimeBufferType=Float32Array;vn.prototype.ValueBufferType=Float32Array;vn.prototype.DefaultInterpolation=Bs;var Fi=class extends vn{constructor(e,t,i){super(e,t,i)}};Fi.prototype.ValueTypeName="bool";Fi.prototype.ValueBufferType=Array;Fi.prototype.DefaultInterpolation=Fs;Fi.prototype.InterpolantFactoryMethodLinear=void 0;Fi.prototype.InterpolantFactoryMethodSmooth=void 0;var ca=class extends vn{constructor(e,t,i,s){super(e,t,i,s)}};ca.prototype.ValueTypeName="color";var pi=class extends vn{constructor(e,t,i,s){super(e,t,i,s)}};pi.prototype.ValueTypeName="number";var ec=class extends Ui{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)Bt.slerpFlat(r,0,o,c-a,o,c,l);return r}},fi=class extends vn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new ec(this.times,this.values,this.getValueSize(),e)}};fi.prototype.ValueTypeName="quaternion";fi.prototype.InterpolantFactoryMethodSmooth=void 0;var Bi=class extends vn{constructor(e,t,i){super(e,t,i)}};Bi.prototype.ValueTypeName="string";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=Fs;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends vn{constructor(e,t,i,s){super(e,t,i,s)}};mi.prototype.ValueTypeName="vector";var Ws=class{constructor(e="",t=-1,i=[],s=Qc){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=ei(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,s=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(a_(i[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=i.length;r!==o;++r)t.push(vn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let u=r_(l);l=Gm(l,1,u),c=Gm(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new pi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],u=c.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,i));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(d,h,f,y,v){if(f.length!==0){let g=[],m=[];Gg(f,g,m,y),g.length!==0&&v.push(new d(h,g,m))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let d=0;d<c.length;d++){let h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let f={},y;for(y=0;y<h.length;y++)if(h[y].morphTargets)for(let v=0;v<h[y].morphTargets.length;v++)f[h[y].morphTargets[v]]=-1;for(let v in f){let g=[],m=[];for(let M=0;M!==h[y].morphTargets.length;++M){let E=h[y];g.push(E.time),m.push(E.morphTarget===v?1:0)}s.push(new pi(".morphTargetInfluence["+v+"]",g,m))}l=f.length*o}else{let f=".bones["+t[d].name+"]";i(mi,f+".position",h,"pos",s),i(fi,f+".quaternion",h,"rot",s),i(mi,f+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){let e=this.tracks,t=0;for(let i=0,s=e.length;i!==s;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function o_(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return pi;case"vector":case"vector2":case"vector3":case"vector4":return mi;case"color":return ca;case"quaternion":return fi;case"bool":case"boolean":return Fi;case"string":return Bi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function a_(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=o_(n.type);if(n.times===void 0){let t=[],i=[];Gg(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var ci={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},tc=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],y=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return y}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Wg=new tc,gi=class{constructor(e){this.manager=e!==void 0?e:Wg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};gi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Oi={},jd=class extends Error{constructor(e,t){super(e),this.response=t}},Xr=class extends gi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ci.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Oi[e]!==void 0){Oi[e].push({onLoad:t,onProgress:i,onError:s});return}Oi[e]=[],Oi[e].push({onLoad:t,onProgress:i,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Oi[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,y=f!==0,v=0,g=new ReadableStream({start(m){M();function M(){d.read().then(({done:E,value:S})=>{if(E)m.close();else{v+=S.byteLength;let C=new ProgressEvent("progress",{lengthComputable:y,loaded:v,total:f});for(let A=0,I=u.length;A<I;A++){let D=u[A];D.onProgress&&D.onProgress(C)}m.enqueue(S),M()}},E=>{m.error(E)})}}});return new Response(g)}else throw new jd(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(y=>f.decode(y))}}}).then(c=>{ci.add(`file:${e}`,c);let u=Oi[e];delete Oi[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Oi[e];if(u===void 0)throw this.manager.itemError(e),c;delete Oi[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Nr=new WeakMap,nc=class extends gi{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ci.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=Nr.get(o);d===void 0&&(d=[],Nr.set(o,d)),d.push({onLoad:t,onError:s})}return o}let a=Ur("img");function l(){u(),t&&t(this);let d=Nr.get(this)||[];for(let h=0;h<d.length;h++){let f=d[h];f.onLoad&&f.onLoad(this)}Nr.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),ci.remove(`image:${e}`);let h=Nr.get(this)||[];for(let f=0;f<h.length;f++){let y=h[f];y.onError&&y.onError(d)}Nr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ci.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var ua=class extends gi{constructor(e){super(e)}load(e,t,i,s){let r=new It,o=new nc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},qs=class extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},da=class extends qs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},$d=new Be,Wm=new P,qm=new P,ha=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.mapType=ri,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wr,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Wm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wm),qm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qm),t.updateMatrixWorld(),$d.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix($d,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply($d)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xd=class extends ha{constructor(){super(new Mt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=Vs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},pa=class extends qs{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Xd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},jm=new Be,Bo=new P,zd=new P,Yd=class extends ha{constructor(){super(new Mt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Bo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Bo),zd.copy(i.position),zd.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(zd),i.updateMatrixWorld(),s.makeTranslation(-Bo.x,-Bo.y,-Bo.z),jm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jm,i.coordinateSystem,i.reversedDepth)}},js=class extends qs{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Yd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Xs=class extends Xo{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Kd=class extends ha{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ds=class extends qs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new Kd}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Vi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Hd=new WeakMap,fa=class extends gi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ci.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(Hd.has(o)===!0)s&&s(Hd.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ci.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Hd.set(l,c),ci.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ci.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ic=class extends Mt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var sc=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)i[r+a]=i[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(i,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,s=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(i,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(i,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){a.setValue(i,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,s=i*this._origIndex;e.getValue(t,s);for(let r=i,o=s;r!==o;++r)t[r]=t[s+r%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[i+o]}_slerp(e,t,i,s){Bt.slerpFlat(e,t,e,t,e,i,s)}_slerpAdditive(e,t,i,s,r){let o=this._workIndex*r;Bt.multiplyQuaternionsFlat(e,o,e,t,e,i),Bt.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,i,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[i+a]*s}}_lerpAdditive(e,t,i,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[i+o]*s}}},vh="\\[\\]\\.:\\/",l_=new RegExp("["+vh+"]","g"),bh="[^"+vh+"]",c_="[^"+vh.replace("\\.","")+"]",u_=/((?:WC+[\/:])*)/.source.replace("WC",bh),d_=/(WCOD+)?/.source.replace("WCOD",c_),h_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bh),p_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bh),f_=new RegExp("^"+u_+d_+h_+p_+"$"),m_=["material","materials","bones","map"],Jd=class{constructor(e,t,i){let s=i||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ot=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(l_,"")}static parseTrackName(e){let t=f_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);m_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=Jd;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rc=class{constructor(e,t,i=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Ds,endingEnd:Ds};for(let c=0;c!==o;++c){let u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ag,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+i,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Rg:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case Qc:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,s=this.time+e,r=this._loopCount,o=i===Cg;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(i===Tg){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,i){let s=this._interpolantSettings;i?(s.endingStart=Os,s.endingEnd=Os):(e?s.endingStart=this.zeroSlopeAtStart?Os:Ds:s.endingStart=zo,t?s.endingEnd=this.zeroSlopeAtEnd?Os:Ds:s.endingEnd=zo)}_scheduleFading(e,t,i){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=i,this}},g_=new Float32Array(1),ma=class extends ni{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let i=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==r;++d){let h=s[d],f=h.name,y=u[f];if(y!==void 0)++y.referenceCount,o[d]=y;else{if(y=o[d],y!==void 0){y._cacheIndex===null&&(++y.referenceCount,this._addInactiveBinding(y,l,f));continue}let v=t&&t._propertyBindings[d].binding.parsedPath;y=new sc(ot.create(i,f,v),h.ValueTypeName,h.getValueSize()),++y.referenceCount,this._addInactiveBinding(y,l,f),o[d]=y}a[d].resultBuffer=y.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,i)}let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],s=e._cacheIndex;i._cacheIndex=s,t[s]=i,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let d=a.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_addInactiveBinding(e,t,i){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[i]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,s=i.rootNode.uuid,r=i.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new la(new Float32Array(2),new Float32Array(2),1,g_),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=i,t[i]=r}clipAction(e,t,i){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Ws.findByName(s,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(i===void 0&&(o!==null?i=o.blendMode:i=Qc),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===i)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let u=new rc(this,o,t,i);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){let i=t||this._root,s=i.uuid,r=typeof e=="string"?Ws.findByName(i,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(s,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,s=this._actionsByClip,r=s[i];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let o in i){let a=i[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};var Xm=new Be,ga=class{constructor(e,t,i=0,s=1/0){this.ray=new di(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Vr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Xm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xm),this}intersectObject(e,t=!0,i=[]){return Zd(e,this,i,t),i.sort(Ym),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Zd(e[s],this,i,t);return i.sort(Ym),i}};function Ym(n,e){return n.distance-e.distance}function Zd(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let o=0,a=r.length;o<a;o++)Zd(r[o],e,t,!0)}}var Yr=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(We(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ya=class extends ni{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function xh(n,e,t,i){let s=y_(i);switch(t){case ch:return n*e;case _c:return n*e/s.components*s.byteLength;case Sc:return n*e/s.components*s.byteLength;case dh:return n*e*2/s.components*s.byteLength;case wc:return n*e*2/s.components*s.byteLength;case uh:return n*e*3/s.components*s.byteLength;case In:return n*e*4/s.components*s.byteLength;case Ec:return n*e*4/s.components*s.byteLength;case ba:case xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _a:case Sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Tc:case Cc:return Math.max(n,16)*Math.max(e,8)/4;case Mc:case Ac:return Math.max(n,8)*Math.max(e,8)/2;case Rc:case Ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Pc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Nc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case kc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Uc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Fc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Bc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Vc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case $c:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case zc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Hc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Gc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Wc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case qc:case jc:case Xc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Yc:case Kc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Jc:case Zc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function y_(n){switch(n){case ri:case rh:return{byteLength:1,components:1};case Jr:case oh:case Zr:return{byteLength:2,components:1};case bc:case xc:return{byteLength:2,components:4};case fs:case vc:case Hn:return{byteLength:4,components:1};case ah:case lh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function my(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function b_(n){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,y)=>f.start-y.start);let h=0;for(let f=1;f<d.length;f++){let y=d[h],v=d[f];v.start<=y.start+y.count+1?y.count=Math.max(y.count,v.start+v.count-y.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,y=d.length;f<y;f++){let v=d[f];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var x_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,__=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,S_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,w_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,M_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,T_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,A_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,C_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,R_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,I_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,P_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,L_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,N_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,D_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,O_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,k_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,F_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,B_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,V_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,z_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,H_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,G_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,W_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,q_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,j_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,K_="gl_FragColor = linearToOutputTexel( gl_FragColor );",J_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Z_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Q_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,e0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,t0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,n0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,i0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,s0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,r0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,o0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,a0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,l0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,c0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,u0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,d0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,h0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,p0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,f0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,m0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,g0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,y0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,v0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,b0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,x0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,S0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,w0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,T0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,A0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,C0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,R0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,I0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,P0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,L0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,N0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,D0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,k0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,F0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,B0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,V0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,z0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,H0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,G0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,W0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,q0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,j0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,X0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Y0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,K0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,J0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Q0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,nS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,iS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,sS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,oS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,aS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,mS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_S=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,SS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ES=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,TS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,AS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,CS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,RS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,IS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,LS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,DS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,US=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,FS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,VS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$S=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,GS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,XS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,KS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,JS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ZS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:x_,alphahash_pars_fragment:__,alphamap_fragment:S_,alphamap_pars_fragment:w_,alphatest_fragment:E_,alphatest_pars_fragment:M_,aomap_fragment:T_,aomap_pars_fragment:A_,batching_pars_vertex:C_,batching_vertex:R_,begin_vertex:I_,beginnormal_vertex:P_,bsdfs:L_,iridescence_fragment:N_,bumpmap_pars_fragment:D_,clipping_planes_fragment:O_,clipping_planes_pars_fragment:k_,clipping_planes_pars_vertex:U_,clipping_planes_vertex:F_,color_fragment:B_,color_pars_fragment:V_,color_pars_vertex:$_,color_vertex:z_,common:H_,cube_uv_reflection_fragment:G_,defaultnormal_vertex:W_,displacementmap_pars_vertex:q_,displacementmap_vertex:j_,emissivemap_fragment:X_,emissivemap_pars_fragment:Y_,colorspace_fragment:K_,colorspace_pars_fragment:J_,envmap_fragment:Z_,envmap_common_pars_fragment:Q_,envmap_pars_fragment:e0,envmap_pars_vertex:t0,envmap_physical_pars_fragment:h0,envmap_vertex:n0,fog_vertex:i0,fog_pars_vertex:s0,fog_fragment:r0,fog_pars_fragment:o0,gradientmap_pars_fragment:a0,lightmap_pars_fragment:l0,lights_lambert_fragment:c0,lights_lambert_pars_fragment:u0,lights_pars_begin:d0,lights_toon_fragment:p0,lights_toon_pars_fragment:f0,lights_phong_fragment:m0,lights_phong_pars_fragment:g0,lights_physical_fragment:y0,lights_physical_pars_fragment:v0,lights_fragment_begin:b0,lights_fragment_maps:x0,lights_fragment_end:_0,logdepthbuf_fragment:S0,logdepthbuf_pars_fragment:w0,logdepthbuf_pars_vertex:E0,logdepthbuf_vertex:M0,map_fragment:T0,map_pars_fragment:A0,map_particle_fragment:C0,map_particle_pars_fragment:R0,metalnessmap_fragment:I0,metalnessmap_pars_fragment:P0,morphinstance_vertex:L0,morphcolor_vertex:N0,morphnormal_vertex:D0,morphtarget_pars_vertex:O0,morphtarget_vertex:k0,normal_fragment_begin:U0,normal_fragment_maps:F0,normal_pars_fragment:B0,normal_pars_vertex:V0,normal_vertex:$0,normalmap_pars_fragment:z0,clearcoat_normal_fragment_begin:H0,clearcoat_normal_fragment_maps:G0,clearcoat_pars_fragment:W0,iridescence_pars_fragment:q0,opaque_fragment:j0,packing:X0,premultiplied_alpha_fragment:Y0,project_vertex:K0,dithering_fragment:J0,dithering_pars_fragment:Z0,roughnessmap_fragment:Q0,roughnessmap_pars_fragment:eS,shadowmap_pars_fragment:tS,shadowmap_pars_vertex:nS,shadowmap_vertex:iS,shadowmask_pars_fragment:sS,skinbase_vertex:rS,skinning_pars_vertex:oS,skinning_vertex:aS,skinnormal_vertex:lS,specularmap_fragment:cS,specularmap_pars_fragment:uS,tonemapping_fragment:dS,tonemapping_pars_fragment:hS,transmission_fragment:pS,transmission_pars_fragment:fS,uv_pars_fragment:mS,uv_pars_vertex:gS,uv_vertex:yS,worldpos_vertex:vS,background_vert:bS,background_frag:xS,backgroundCube_vert:_S,backgroundCube_frag:SS,cube_vert:wS,cube_frag:ES,depth_vert:MS,depth_frag:TS,distanceRGBA_vert:AS,distanceRGBA_frag:CS,equirect_vert:RS,equirect_frag:IS,linedashed_vert:PS,linedashed_frag:LS,meshbasic_vert:NS,meshbasic_frag:DS,meshlambert_vert:OS,meshlambert_frag:kS,meshmatcap_vert:US,meshmatcap_frag:FS,meshnormal_vert:BS,meshnormal_frag:VS,meshphong_vert:$S,meshphong_frag:zS,meshphysical_vert:HS,meshphysical_frag:GS,meshtoon_vert:WS,meshtoon_frag:qS,points_vert:jS,points_frag:XS,shadow_vert:YS,shadow_frag:KS,sprite_vert:JS,sprite_frag:ZS},le={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},vi={basic:{uniforms:Zt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Zt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Zt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Zt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Zt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Zt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Zt([le.points,le.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Zt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Zt([le.common,le.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Zt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Zt([le.sprite,le.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Zt([le.common,le.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Zt([le.lights,le.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};vi.physical={uniforms:Zt([vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var tu={r:0,b:0,g:0},Qs=new zn,QS=new Be;function ew(n,e,t,i,s,r,o){let a=new Pe(0),l=r===!0?0:1,c,u,d=null,h=0,f=null;function y(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function v(E){let S=!1,C=y(E);C===null?m(a,l):C&&C.isColor&&(m(C,1),S=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(E,S){let C=y(S);C&&(C.isCubeTexture||C.mapping===va)?(u===void 0&&(u=new st(new cs(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:Zs(vi.backgroundCube.uniforms),vertexShader:vi.backgroundCube.vertexShader,fragmentShader:vi.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,I,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Qs.copy(S.backgroundRotation),Qs.x*=-1,Qs.y*=-1,Qs.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Qs.y*=-1,Qs.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(QS.makeRotationFromEuler(Qs)),u.material.toneMapped=Ke.getTransfer(C.colorSpace)!==it,(d!==C||h!==C.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=C,h=C.version,f=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new st(new Gs(2,2),new ii({name:"BackgroundMaterial",uniforms:Zs(vi.background.uniforms),vertexShader:vi.background.vertexShader,fragmentShader:vi.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(C.colorSpace)!==it,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||h!==C.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=C,h=C.version,f=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,S){E.getRGB(tu,yh(n)),i.buffers.color.setClear(tu.r,tu.g,tu.b,S,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,S=1){a.set(E),l=S,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,m(a,l)},render:v,addToRenderList:g,dispose:M}}function tw(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,o=!1;function a(_,L,F,H,W){let Y=!1,q=d(H,F,L);r!==q&&(r=q,c(r.object)),Y=f(_,H,F,W),Y&&y(_,H,F,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,S(_,L,F,H),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function u(_){return n.deleteVertexArray(_)}function d(_,L,F){let H=F.wireframe===!0,W=i[_.id];W===void 0&&(W={},i[_.id]=W);let Y=W[L.id];Y===void 0&&(Y={},W[L.id]=Y);let q=Y[H];return q===void 0&&(q=h(l()),Y[H]=q),q}function h(_){let L=[],F=[],H=[];for(let W=0;W<t;W++)L[W]=0,F[W]=0,H[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:H,object:_,attributes:{},index:null}}function f(_,L,F,H){let W=r.attributes,Y=L.attributes,q=0,se=F.getAttributes();for(let z in se)if(se[z].location>=0){let de=W[z],xe=Y[z];if(xe===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(xe=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(xe=_.instanceColor)),de===void 0||de.attribute!==xe||xe&&de.data!==xe.data)return!0;q++}return r.attributesNum!==q||r.index!==H}function y(_,L,F,H){let W={},Y=L.attributes,q=0,se=F.getAttributes();for(let z in se)if(se[z].location>=0){let de=Y[z];de===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(de=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(de=_.instanceColor));let xe={};xe.attribute=de,de&&de.data&&(xe.data=de.data),W[z]=xe,q++}r.attributes=W,r.attributesNum=q,r.index=H}function v(){let _=r.newAttributes;for(let L=0,F=_.length;L<F;L++)_[L]=0}function g(_){m(_,0)}function m(_,L){let F=r.newAttributes,H=r.enabledAttributes,W=r.attributeDivisors;F[_]=1,H[_]===0&&(n.enableVertexAttribArray(_),H[_]=1),W[_]!==L&&(n.vertexAttribDivisor(_,L),W[_]=L)}function M(){let _=r.newAttributes,L=r.enabledAttributes;for(let F=0,H=L.length;F<H;F++)L[F]!==_[F]&&(n.disableVertexAttribArray(F),L[F]=0)}function E(_,L,F,H,W,Y,q){q===!0?n.vertexAttribIPointer(_,L,F,W,Y):n.vertexAttribPointer(_,L,F,H,W,Y)}function S(_,L,F,H){v();let W=H.attributes,Y=F.getAttributes(),q=L.defaultAttributeValues;for(let se in Y){let z=Y[se];if(z.location>=0){let ae=W[se];if(ae===void 0&&(se==="instanceMatrix"&&_.instanceMatrix&&(ae=_.instanceMatrix),se==="instanceColor"&&_.instanceColor&&(ae=_.instanceColor)),ae!==void 0){let de=ae.normalized,xe=ae.itemSize,Ue=e.get(ae);if(Ue===void 0)continue;let tt=Ue.buffer,lt=Ue.type,Je=Ue.bytesPerElement,K=lt===n.INT||lt===n.UNSIGNED_INT||ae.gpuType===vc;if(ae.isInterleavedBufferAttribute){let U=ae.data,Z=U.stride,he=ae.offset;if(U.isInstancedInterleavedBuffer){for(let me=0;me<z.locationSize;me++)m(z.location+me,U.meshPerAttribute);_.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=U.meshPerAttribute*U.count)}else for(let me=0;me<z.locationSize;me++)g(z.location+me);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let me=0;me<z.locationSize;me++)E(z.location+me,xe/z.locationSize,lt,de,Z*Je,(he+xe/z.locationSize*me)*Je,K)}else{if(ae.isInstancedBufferAttribute){for(let U=0;U<z.locationSize;U++)m(z.location+U,ae.meshPerAttribute);_.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let U=0;U<z.locationSize;U++)g(z.location+U);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let U=0;U<z.locationSize;U++)E(z.location+U,xe/z.locationSize,lt,de,xe*Je,xe/z.locationSize*U*Je,K)}}else if(q!==void 0){let de=q[se];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(z.location,de);break;case 3:n.vertexAttrib3fv(z.location,de);break;case 4:n.vertexAttrib4fv(z.location,de);break;default:n.vertexAttrib1fv(z.location,de)}}}}M()}function C(){D();for(let _ in i){let L=i[_];for(let F in L){let H=L[F];for(let W in H)u(H[W].object),delete H[W];delete L[F]}delete i[_]}}function A(_){if(i[_.id]===void 0)return;let L=i[_.id];for(let F in L){let H=L[F];for(let W in H)u(H[W].object),delete H[W];delete L[F]}delete i[_.id]}function I(_){for(let L in i){let F=i[L];if(F[_.id]===void 0)continue;let H=F[_.id];for(let W in H)u(H[W].object),delete H[W];delete F[_.id]}}function D(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:w,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function nw(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let y=0;y<d;y++)f+=u[y];t.update(f,i,1)}function l(c,u,d,h){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let y=0;y<c.length;y++)o(c[y],u[y],h[y]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let y=0;for(let v=0;v<d;v++)y+=u[v]*h[v];t.update(y,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function iw(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==In&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let D=I===Zr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==ri&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Hn&&!D)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=y>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:y,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:C,maxSamples:A}}function sw(n){let e=this,t=null,i=0,s=!1,r=!1,o=new $n,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let y=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!s||y===null||y.length===0||r&&!g)r?u(null):c();else{let M=r?0:i,E=M*4,S=m.clippingState||null;l.value=S,S=u(y,h,E,f);for(let C=0;C!==E;++C)S[C]=t[C];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,y){let v=d!==null?d.length:0,g=null;if(v!==0){if(g=l.value,y!==!0||g===null){let m=f+v*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,S=f;E!==v;++E,S+=4)o.copy(d[E]).applyMatrix4(M,a),o.normal.toArray(g,S),g[S+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function rw(n){let e=new WeakMap;function t(o,a){return a===mc?o.mapping=Ys:a===gc&&(o.mapping=Ks),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===mc||a===gc)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new jl(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var io=4,qg=[.125,.215,.35,.446,.526,.582],nr=20,_h=new Xs,jg=new Pe,Sh=null,wh=0,Eh=0,Mh=!1,tr=(1+Math.sqrt(5))/2,no=1/tr,Xg=[new P(-tr,no,0),new P(tr,no,0),new P(-no,0,tr),new P(no,0,tr),new P(0,tr,-no),new P(0,tr,no),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],ow=new P,ro=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:a=ow}=r;Sh=this._renderer.getRenderTarget(),wh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sh,wh,Eh),this._renderer.xr.enabled=Mh,e.scissorTest=!1,nu(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ys||e.mapping===Ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sh=this._renderer.getRenderTarget(),wh=this._renderer.getActiveCubeFace(),Eh=this._renderer.getActiveMipmapLevel(),Mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:Zr,format:In,colorSpace:Ht,depthBuffer:!1},s=Yg(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yg(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=aw(r)),this._blurMaterial=lw(r,e,t)}return s}_compileMaterial(e){let t=new st(this._lodPlanes[0],e);this._renderer.compile(t,_h)}_sceneToCubeUV(e,t,i,s,r){let l=new Mt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(jg),d.toneMapping=zi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let v=new on({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),g=new st(new cs,v),m=!1,M=e.background;M?M.isColor&&(v.color.copy(M),e.background=null,m=!0):(v.color.copy(jg),m=!0);for(let E=0;E<6;E++){let S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));let C=this._cubeSize;nu(s,S*C,E>2?C:0,C,C),d.setRenderTarget(s),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Ys||e.mapping===Ks;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kg());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new st(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;nu(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,_h)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Xg[(s-r-1)%Xg.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new st(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,y=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*nr-1),v=r/y,g=isFinite(r)?1+Math.floor(u*v):nr;g>nr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${nr}`);let m=[],M=0;for(let I=0;I<nr;++I){let D=I/v,w=Math.exp(-D*D/2);m.push(w),I===0?M+=w:I<g&&(M+=2*w)}for(let I=0;I<m.length;I++)m[I]=m[I]/M;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:E}=this;h.dTheta.value=y,h.mipInt.value=E-i;let S=this._sizeLods[s],C=3*S*(s>E-io?s-E+io:0),A=4*(this._cubeSize-S);nu(t,C,A,3*S,2*S),l.setRenderTarget(t),l.render(d,_h)}};function aw(n){let e=[],t=[],i=[],s=n,r=n-io+1+qg.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let l=1/a;o>n-io?l=qg[o-n+io-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,y=6,v=3,g=2,m=1,M=new Float32Array(v*y*f),E=new Float32Array(g*y*f),S=new Float32Array(m*y*f);for(let A=0;A<f;A++){let I=A%3*2/3-1,D=A>2?0:-1,w=[I,D,0,I+2/3,D,0,I+2/3,D+1,0,I,D,0,I+2/3,D+1,0,I,D+1,0];M.set(w,v*y*A),E.set(h,g*y*A);let _=[A,A,A,A,A,A];S.set(_,m*y*A)}let C=new an;C.setAttribute("position",new Tt(M,v)),C.setAttribute("uv",new Tt(E,g)),C.setAttribute("faceIndex",new Tt(S,m)),e.push(C),s>io&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Yg(n,e,t){let i=new ui(n,e,t);return i.texture.mapping=va,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nu(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function lw(n,e,t){let i=new Float32Array(nr),s=new P(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:nr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Oh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Kg(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Jg(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Oh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function cw(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===mc||l===gc,u=l===Ys||l===Ks;if(c||u){let d=e.get(a),h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new ro(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new ro(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function uw(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Fr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function dw(n,e,t,i){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let y in h.attributes)e.remove(h.attributes[y]);h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,y=d.attributes.position,v=0;if(f!==null){let M=f.array;v=f.version;for(let E=0,S=M.length;E<S;E+=3){let C=M[E+0],A=M[E+1],I=M[E+2];h.push(C,A,A,I,I,C)}}else if(y!==void 0){let M=y.array;v=y.version;for(let E=0,S=M.length/3-1;E<S;E+=3){let C=E+0,A=E+1,I=E+2;h.push(C,A,A,I,I,C)}}else return;let g=new(gh(h)?jo:qo)(h,1);g.version=v;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function hw(n,e,t){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*o),t.update(f,i,1)}function c(h,f,y){y!==0&&(n.drawElementsInstanced(i,f,r,h*o,y),t.update(f,i,y))}function u(h,f,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,y);let g=0;for(let m=0;m<y;m++)g+=f[m];t.update(g,i,1)}function d(h,f,y,v){if(y===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<h.length;m++)c(h[m]/o,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,v,0,y);let m=0;for(let M=0;M<y;M++)m+=f[M]*v[M];t.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function pw(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function fw(n,e,t){let i=new WeakMap,s=new Qe;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==d){let w=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],E=0;f===!0&&(E=1),y===!0&&(E=2),v===!0&&(E=3);let S=a.attributes.position.count*E,C=1;S>e.maxTextureSize&&(C=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let A=new Float32Array(S*C*4*d),I=new Wo(A,S,C,d);I.type=Hn,I.needsUpdate=!0;let D=E*4;for(let _=0;_<d;_++){let L=g[_],F=m[_],H=M[_],W=S*C*4*_;for(let Y=0;Y<L.count;Y++){let q=Y*D;f===!0&&(s.fromBufferAttribute(L,Y),A[W+q+0]=s.x,A[W+q+1]=s.y,A[W+q+2]=s.z,A[W+q+3]=0),y===!0&&(s.fromBufferAttribute(F,Y),A[W+q+4]=s.x,A[W+q+5]=s.y,A[W+q+6]=s.z,A[W+q+7]=0),v===!0&&(s.fromBufferAttribute(H,Y),A[W+q+8]=s.x,A[W+q+9]=s.y,A[W+q+10]=s.z,A[W+q+11]=H.itemSize===4?s.w:1)}}h={count:d,texture:I,size:new Ce(S,C)},i.set(a,h),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let y=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",y),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function mw(n,e,t,i){let s=new WeakMap;function r(l){let c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var gy=new It,Zg=new ia(1,1),yy=new Wo,vy=new Wl,by=new Yo,Qg=[],ey=[],ty=new Float32Array(16),ny=new Float32Array(9),iy=new Float32Array(4);function oo(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Qg[s];if(r===void 0&&(r=new Float32Array(s),Qg[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Lt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ru(n,e){let t=ey[e];t===void 0&&(t=new Int32Array(e),ey[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function gw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function yw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2fv(this.addr,e),Lt(t,e)}}function vw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;n.uniform3fv(this.addr,e),Lt(t,e)}}function bw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4fv(this.addr,e),Lt(t,e)}}function xw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,i))return;iy.set(i),n.uniformMatrix2fv(this.addr,!1,iy),Lt(t,i)}}function _w(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,i))return;ny.set(i),n.uniformMatrix3fv(this.addr,!1,ny),Lt(t,i)}}function Sw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,i))return;ty.set(i),n.uniformMatrix4fv(this.addr,!1,ty),Lt(t,i)}}function ww(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ew(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2iv(this.addr,e),Lt(t,e)}}function Mw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3iv(this.addr,e),Lt(t,e)}}function Tw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4iv(this.addr,e),Lt(t,e)}}function Aw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Cw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;n.uniform2uiv(this.addr,e),Lt(t,e)}}function Rw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;n.uniform3uiv(this.addr,e),Lt(t,e)}}function Iw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;n.uniform4uiv(this.addr,e),Lt(t,e)}}function Pw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Zg.compareFunction=ph,r=Zg):r=gy,t.setTexture2D(e||r,s)}function Lw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||vy,s)}function Nw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||by,s)}function Dw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||yy,s)}function Ow(n){switch(n){case 5126:return gw;case 35664:return yw;case 35665:return vw;case 35666:return bw;case 35674:return xw;case 35675:return _w;case 35676:return Sw;case 5124:case 35670:return ww;case 35667:case 35671:return Ew;case 35668:case 35672:return Mw;case 35669:case 35673:return Tw;case 5125:return Aw;case 36294:return Cw;case 36295:return Rw;case 36296:return Iw;case 35678:case 36198:case 36298:case 36306:case 35682:return Pw;case 35679:case 36299:case 36307:return Lw;case 35680:case 36300:case 36308:case 36293:return Nw;case 36289:case 36303:case 36311:case 36292:return Dw}}function kw(n,e){n.uniform1fv(this.addr,e)}function Uw(n,e){let t=oo(e,this.size,2);n.uniform2fv(this.addr,t)}function Fw(n,e){let t=oo(e,this.size,3);n.uniform3fv(this.addr,t)}function Bw(n,e){let t=oo(e,this.size,4);n.uniform4fv(this.addr,t)}function Vw(n,e){let t=oo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $w(n,e){let t=oo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zw(n,e){let t=oo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Hw(n,e){n.uniform1iv(this.addr,e)}function Gw(n,e){n.uniform2iv(this.addr,e)}function Ww(n,e){n.uniform3iv(this.addr,e)}function qw(n,e){n.uniform4iv(this.addr,e)}function jw(n,e){n.uniform1uiv(this.addr,e)}function Xw(n,e){n.uniform2uiv(this.addr,e)}function Yw(n,e){n.uniform3uiv(this.addr,e)}function Kw(n,e){n.uniform4uiv(this.addr,e)}function Jw(n,e,t){let i=this.cache,s=e.length,r=ru(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||gy,r[o])}function Zw(n,e,t){let i=this.cache,s=e.length,r=ru(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||vy,r[o])}function Qw(n,e,t){let i=this.cache,s=e.length,r=ru(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||by,r[o])}function eE(n,e,t){let i=this.cache,s=e.length,r=ru(t,s);Pt(i,r)||(n.uniform1iv(this.addr,r),Lt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||yy,r[o])}function tE(n){switch(n){case 5126:return kw;case 35664:return Uw;case 35665:return Fw;case 35666:return Bw;case 35674:return Vw;case 35675:return $w;case 35676:return zw;case 5124:case 35670:return Hw;case 35667:case 35671:return Gw;case 35668:case 35672:return Ww;case 35669:case 35673:return qw;case 5125:return jw;case 36294:return Xw;case 36295:return Yw;case 36296:return Kw;case 35678:case 36198:case 36298:case 36306:case 35682:return Jw;case 35679:case 36299:case 36307:return Zw;case 35680:case 36300:case 36308:case 36293:return Qw;case 36289:case 36303:case 36311:case 36292:return eE}}var Ah=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ow(t.type)}},Ch=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tE(t.type)}},Rh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},Th=/(\w+)(\])?(\[|\.)?/g;function sy(n,e){n.seq.push(e),n.map[e.id]=e}function nE(n,e,t){let i=n.name,s=i.length;for(Th.lastIndex=0;;){let r=Th.exec(i),o=Th.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){sy(t,c===void 0?new Ah(a,n,e):new Ch(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Rh(a),sy(t,d)),t=d}}}var so=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);nE(r,o,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function ry(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var iE=37297,sE=0;function rE(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var oy=new Ve;function oE(n){Ke._getMatrix(oy,Ke.workingColorSpace,n);let e=`mat3( ${oy.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case Ho:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ay(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+rE(n.getShaderSource(e),a)}else return r}function aE(n,e){let t=oE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function lE(n,e){let t;switch(e){case bg:t="Linear";break;case xg:t="Reinhard";break;case _g:t="Cineon";break;case fc:t="ACESFilmic";break;case wg:t="AgX";break;case Eg:t="Neutral";break;case Sg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var iu=new P;function cE(){Ke.getLuminanceCoefficients(iu);let n=iu.x.toFixed(4),e=iu.y.toFixed(4),t=iu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function uE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function dE(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function hE(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ma(n){return n!==""}function ly(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cy(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var pE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ih(n){return n.replace(pE,mE)}var fE=new Map;function mE(n,e){let t=Ge[e];if(t===void 0){let i=fE.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ih(t)}var gE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uy(n){return n.replace(gE,yE)}function yE(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function dy(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vE(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===eh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Zm?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function bE(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ys:case Ks:e="ENVMAP_TYPE_CUBE";break;case va:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xE(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ks:e="ENVMAP_MODE_REFRACTION";break}return e}function _E(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case pc:e="ENVMAP_BLENDING_MULTIPLY";break;case yg:e="ENVMAP_BLENDING_MIX";break;case vg:e="ENVMAP_BLENDING_ADD";break}return e}function SE(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function wE(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=vE(t),c=bE(t),u=xE(t),d=_E(t),h=SE(t),f=uE(t),y=dE(r),v=s.createProgram(),g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Ma).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Ma).join(`
`),m.length>0&&(m+=`
`)):(g=[dy(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),m=[dy(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zi?"#define TONE_MAPPING":"",t.toneMapping!==zi?Ge.tonemapping_pars_fragment:"",t.toneMapping!==zi?lE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,aE("linearToOutputTexel",t.outputColorSpace),cE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ma).join(`
`)),o=Ih(o),o=ly(o,t),o=cy(o,t),a=Ih(a),a=ly(a,t),a=cy(a,t),o=uy(o),a=uy(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let E=M+g+o,S=M+m+a,C=ry(s,s.VERTEX_SHADER,E),A=ry(s,s.FRAGMENT_SHADER,S);s.attachShader(v,C),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function I(L){if(n.debug.checkShaderErrors){let F=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(C)||"",W=s.getShaderInfoLog(A)||"",Y=F.trim(),q=H.trim(),se=W.trim(),z=!0,ae=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,C,A);else{let de=ay(s,C,"vertex"),xe=ay(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+Y+`
`+de+`
`+xe)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(q===""||se==="")&&(ae=!1);ae&&(L.diagnostics={runnable:z,programLog:Y,vertexShader:{log:q,prefix:g},fragmentShader:{log:se,prefix:m}})}s.deleteShader(C),s.deleteShader(A),D=new so(s,v),w=hE(s,v)}let D;this.getUniforms=function(){return D===void 0&&I(this),D};let w;this.getAttributes=function(){return w===void 0&&I(this),w};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(v,iE)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sE++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=A,this}var EE=0,Ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Lh(e),t.set(e,i)),i}},Lh=class{constructor(e){this.id=EE++,this.code=e,this.usedTimes=0}};function ME(n,e,t,i,s,r,o){let a=new Vr,l=new Ph,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,f=s.precision,y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,_,L,F,H){let W=F.fog,Y=H.geometry,q=w.isMeshStandardMaterial?F.environment:null,se=(w.isMeshStandardMaterial?t:e).get(w.envMap||q),z=se&&se.mapping===va?se.image.height:null,ae=y[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let de=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,xe=de!==void 0?de.length:0,Ue=0;Y.morphAttributes.position!==void 0&&(Ue=1),Y.morphAttributes.normal!==void 0&&(Ue=2),Y.morphAttributes.color!==void 0&&(Ue=3);let tt,lt,Je,K;if(ae){let et=vi[ae];tt=et.vertexShader,lt=et.fragmentShader}else tt=w.vertexShader,lt=w.fragmentShader,l.update(w),Je=l.getVertexShaderID(w),K=l.getFragmentShaderID(w);let U=n.getRenderTarget(),Z=n.state.buffers.depth.getReversed(),he=H.isInstancedMesh===!0,me=H.isBatchedMesh===!0,Xe=!!w.map,Yt=!!w.matcap,R=!!se,mt=!!w.aoMap,Fe=!!w.lightMap,De=!!w.bumpMap,_e=!!w.normalMap,gt=!!w.displacementMap,Se=!!w.emissiveMap,He=!!w.metalnessMap,kt=!!w.roughnessMap,xt=w.anisotropy>0,T=w.clearcoat>0,b=w.dispersion>0,B=w.iridescence>0,X=w.sheen>0,Q=w.transmission>0,j=xt&&!!w.anisotropyMap,Ae=T&&!!w.clearcoatMap,re=T&&!!w.clearcoatNormalMap,we=T&&!!w.clearcoatRoughnessMap,Ee=B&&!!w.iridescenceMap,ne=B&&!!w.iridescenceThicknessMap,pe=X&&!!w.sheenColorMap,Ne=X&&!!w.sheenRoughnessMap,Me=!!w.specularMap,ce=!!w.specularColorMap,$e=!!w.specularIntensityMap,N=Q&&!!w.transmissionMap,ie=Q&&!!w.thicknessMap,oe=!!w.gradientMap,ye=!!w.alphaMap,ee=w.alphaTest>0,J=!!w.alphaHash,be=!!w.extensions,ke=zi;w.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ke=n.toneMapping);let dt={shaderID:ae,shaderType:w.type,shaderName:w.name,vertexShader:tt,fragmentShader:lt,defines:w.defines,customVertexShaderID:Je,customFragmentShaderID:K,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:me,batchingColor:me&&H._colorsTexture!==null,instancing:he,instancingColor:he&&H.instanceColor!==null,instancingMorph:he&&H.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:U===null?n.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ht,alphaToCoverage:!!w.alphaToCoverage,map:Xe,matcap:Yt,envMap:R,envMapMode:R&&se.mapping,envMapCubeUVHeight:z,aoMap:mt,lightMap:Fe,bumpMap:De,normalMap:_e,displacementMap:h&&gt,emissiveMap:Se,normalMapObjectSpace:_e&&w.normalMapType===Lg,normalMapTangentSpace:_e&&w.normalMapType===eu,metalnessMap:He,roughnessMap:kt,anisotropy:xt,anisotropyMap:j,clearcoat:T,clearcoatMap:Ae,clearcoatNormalMap:re,clearcoatRoughnessMap:we,dispersion:b,iridescence:B,iridescenceMap:Ee,iridescenceThicknessMap:ne,sheen:X,sheenColorMap:pe,sheenRoughnessMap:Ne,specularMap:Me,specularColorMap:ce,specularIntensityMap:$e,transmission:Q,transmissionMap:N,thicknessMap:ie,gradientMap:oe,opaque:w.transparent===!1&&w.blending===ks&&w.alphaToCoverage===!1,alphaMap:ye,alphaTest:ee,alphaHash:J,combine:w.combine,mapUv:Xe&&v(w.map.channel),aoMapUv:mt&&v(w.aoMap.channel),lightMapUv:Fe&&v(w.lightMap.channel),bumpMapUv:De&&v(w.bumpMap.channel),normalMapUv:_e&&v(w.normalMap.channel),displacementMapUv:gt&&v(w.displacementMap.channel),emissiveMapUv:Se&&v(w.emissiveMap.channel),metalnessMapUv:He&&v(w.metalnessMap.channel),roughnessMapUv:kt&&v(w.roughnessMap.channel),anisotropyMapUv:j&&v(w.anisotropyMap.channel),clearcoatMapUv:Ae&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:re&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&v(w.sheenRoughnessMap.channel),specularMapUv:Me&&v(w.specularMap.channel),specularColorMapUv:ce&&v(w.specularColorMap.channel),specularIntensityMapUv:$e&&v(w.specularIntensityMap.channel),transmissionMapUv:N&&v(w.transmissionMap.channel),thicknessMapUv:ie&&v(w.thicknessMap.channel),alphaMapUv:ye&&v(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(_e||xt),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Y.attributes.uv&&(Xe||ye),fog:!!W,useFog:w.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Z,skinning:H.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ue,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:Xe&&w.map.isVideoTexture===!0&&Ke.getTransfer(w.map.colorSpace)===it,decodeVideoTextureEmissive:Se&&w.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(w.emissiveMap.colorSpace)===it,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===bn,flipSided:w.side===Gt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:be&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&w.extensions.multiDraw===!0||me)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function m(w){let _=[];if(w.shaderID?_.push(w.shaderID):(_.push(w.customVertexShaderID),_.push(w.customFragmentShaderID)),w.defines!==void 0)for(let L in w.defines)_.push(L),_.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(M(_,w),E(_,w),_.push(n.outputColorSpace)),_.push(w.customProgramCacheKey),_.join()}function M(w,_){w.push(_.precision),w.push(_.outputColorSpace),w.push(_.envMapMode),w.push(_.envMapCubeUVHeight),w.push(_.mapUv),w.push(_.alphaMapUv),w.push(_.lightMapUv),w.push(_.aoMapUv),w.push(_.bumpMapUv),w.push(_.normalMapUv),w.push(_.displacementMapUv),w.push(_.emissiveMapUv),w.push(_.metalnessMapUv),w.push(_.roughnessMapUv),w.push(_.anisotropyMapUv),w.push(_.clearcoatMapUv),w.push(_.clearcoatNormalMapUv),w.push(_.clearcoatRoughnessMapUv),w.push(_.iridescenceMapUv),w.push(_.iridescenceThicknessMapUv),w.push(_.sheenColorMapUv),w.push(_.sheenRoughnessMapUv),w.push(_.specularMapUv),w.push(_.specularColorMapUv),w.push(_.specularIntensityMapUv),w.push(_.transmissionMapUv),w.push(_.thicknessMapUv),w.push(_.combine),w.push(_.fogExp2),w.push(_.sizeAttenuation),w.push(_.morphTargetsCount),w.push(_.morphAttributeCount),w.push(_.numDirLights),w.push(_.numPointLights),w.push(_.numSpotLights),w.push(_.numSpotLightMaps),w.push(_.numHemiLights),w.push(_.numRectAreaLights),w.push(_.numDirLightShadows),w.push(_.numPointLightShadows),w.push(_.numSpotLightShadows),w.push(_.numSpotLightShadowsWithMaps),w.push(_.numLightProbes),w.push(_.shadowMapType),w.push(_.toneMapping),w.push(_.numClippingPlanes),w.push(_.numClipIntersection),w.push(_.depthPacking)}function E(w,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),w.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),w.push(a.mask)}function S(w){let _=y[w.type],L;if(_){let F=vi[_];L=Hg.clone(F.uniforms)}else L=w.uniforms;return L}function C(w,_){let L;for(let F=0,H=u.length;F<H;F++){let W=u[F];if(W.cacheKey===_){L=W,++L.usedTimes;break}}return L===void 0&&(L=new wE(n,_,w,r),u.push(L)),L}function A(w){if(--w.usedTimes===0){let _=u.indexOf(w);u[_]=u[u.length-1],u.pop(),w.destroy()}}function I(w){l.remove(w)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:S,acquireProgram:C,releaseProgram:A,releaseShaderCache:I,programs:u,dispose:D}}function TE(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function AE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function hy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function py(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,h,f,y,v,g){let m=n[e];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:y,renderOrder:d.renderOrder,z:v,group:g},n[e]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=y,m.renderOrder=d.renderOrder,m.z=v,m.group=g),e++,m}function a(d,h,f,y,v,g){let m=o(d,h,f,y,v,g);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(d,h,f,y,v,g){let m=o(d,h,f,y,v,g);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function c(d,h){t.length>1&&t.sort(d||AE),i.length>1&&i.sort(h||hy),s.length>1&&s.sort(h||hy)}function u(){for(let d=e,h=n.length;d<h;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function CE(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new py,n.set(i,[o])):s>=r.length?(o=new py,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function RE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Pe};break;case"SpotLight":t={position:new P,direction:new P,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function IE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var PE=0;function LE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function NE(n){let e=new RE,t=IE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let s=new P,r=new Be,o=new Be;function a(c){let u=0,d=0,h=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,y=0,v=0,g=0,m=0,M=0,E=0,S=0,C=0,A=0,I=0;c.sort(LE);for(let w=0,_=c.length;w<_;w++){let L=c[w],F=L.color,H=L.intensity,W=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=F.r*H,d+=F.g*H,h+=F.b*H;else if(L.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(L.sh.coefficients[q],H);I++}else if(L.isDirectionalLight){let q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let se=L.shadow,z=t.get(L);z.shadowIntensity=se.intensity,z.shadowBias=se.bias,z.shadowNormalBias=se.normalBias,z.shadowRadius=se.radius,z.shadowMapSize=se.mapSize,i.directionalShadow[f]=z,i.directionalShadowMap[f]=Y,i.directionalShadowMatrix[f]=L.shadow.matrix,M++}i.directional[f]=q,f++}else if(L.isSpotLight){let q=e.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(F).multiplyScalar(H),q.distance=W,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,i.spot[v]=q;let se=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,se.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[v]=se.matrix,L.castShadow){let z=t.get(L);z.shadowIntensity=se.intensity,z.shadowBias=se.bias,z.shadowNormalBias=se.normalBias,z.shadowRadius=se.radius,z.shadowMapSize=se.mapSize,i.spotShadow[v]=z,i.spotShadowMap[v]=Y,S++}v++}else if(L.isRectAreaLight){let q=e.get(L);q.color.copy(F).multiplyScalar(H),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=q,g++}else if(L.isPointLight){let q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){let se=L.shadow,z=t.get(L);z.shadowIntensity=se.intensity,z.shadowBias=se.bias,z.shadowNormalBias=se.normalBias,z.shadowRadius=se.radius,z.shadowMapSize=se.mapSize,z.shadowCameraNear=se.camera.near,z.shadowCameraFar=se.camera.far,i.pointShadow[y]=z,i.pointShadowMap[y]=Y,i.pointShadowMatrix[y]=L.shadow.matrix,E++}i.point[y]=q,y++}else if(L.isHemisphereLight){let q=e.get(L);q.skyColor.copy(L.color).multiplyScalar(H),q.groundColor.copy(L.groundColor).multiplyScalar(H),i.hemi[m]=q,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let D=i.hash;(D.directionalLength!==f||D.pointLength!==y||D.spotLength!==v||D.rectAreaLength!==g||D.hemiLength!==m||D.numDirectionalShadows!==M||D.numPointShadows!==E||D.numSpotShadows!==S||D.numSpotMaps!==C||D.numLightProbes!==I)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=g,i.point.length=y,i.hemi.length=m,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=I,D.directionalLength=f,D.pointLength=y,D.spotLength=v,D.rectAreaLength=g,D.hemiLength=m,D.numDirectionalShadows=M,D.numPointShadows=E,D.numSpotShadows=S,D.numSpotMaps=C,D.numLightProbes=I,i.version=PE++)}function l(c,u){let d=0,h=0,f=0,y=0,v=0,g=u.matrixWorldInverse;for(let m=0,M=c.length;m<M;m++){let E=c[m];if(E.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),d++}else if(E.isSpotLight){let S=i.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),f++}else if(E.isRectAreaLight){let S=i.rectArea[y];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),y++}else if(E.isPointLight){let S=i.point[h];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),h++}else if(E.isHemisphereLight){let S=i.hemi[v];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function fy(n){let e=new NE(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function DE(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new fy(n),e.set(s,[a])):r>=o.length?(a=new fy(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var OE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function UE(n,e,t){let i=new Wr,s=new Ce,r=new Ce,o=new Qe,a=new Kl({depthPacking:Pg}),l=new Jl,c={},u=t.maxTextureSize,d={[ti]:Gt,[Gt]:ti,[bn]:bn},h=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:OE,fragmentShader:kE}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let y=new an;y.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new st(y,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eh;let m=this.type;this.render=function(A,I,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let w=n.getRenderTarget(),_=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),F=n.state;F.setBlending($i),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let H=m!==yi&&this.type===yi,W=m===yi&&this.type!==yi;for(let Y=0,q=A.length;Y<q;Y++){let se=A[Y],z=se.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",se,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let ae=z.getFrameExtents();if(s.multiply(ae),r.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ae.x),s.x=r.x*ae.x,z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ae.y),s.y=r.y*ae.y,z.mapSize.y=r.y)),z.map===null||H===!0||W===!0){let xe=this.type!==yi?{minFilter:zt,magFilter:zt}:{};z.map!==null&&z.map.dispose(),z.map=new ui(s.x,s.y,xe),z.map.texture.name=se.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();let de=z.getViewportCount();for(let xe=0;xe<de;xe++){let Ue=z.getViewport(xe);o.set(r.x*Ue.x,r.y*Ue.y,r.x*Ue.z,r.y*Ue.w),F.viewport(o),z.updateMatrices(se,xe),i=z.getFrustum(),S(I,D,z.camera,se,this.type)}z.isPointLightShadow!==!0&&this.type===yi&&M(z,D),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(w,_,L)};function M(A,I){let D=e.update(v);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ui(s.x,s.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(I,null,D,h,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(I,null,D,f,v,null)}function E(A,I,D,w){let _=null,L=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)_=L;else if(_=D.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let F=_.uuid,H=I.uuid,W=c[F];W===void 0&&(W={},c[F]=W);let Y=W[H];Y===void 0&&(Y=_.clone(),W[H]=Y,I.addEventListener("dispose",C)),_=Y}if(_.visible=I.visible,_.wireframe=I.wireframe,w===yi?_.side=I.shadowSide!==null?I.shadowSide:I.side:_.side=I.shadowSide!==null?I.shadowSide:d[I.side],_.alphaMap=I.alphaMap,_.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,_.map=I.map,_.clipShadows=I.clipShadows,_.clippingPlanes=I.clippingPlanes,_.clipIntersection=I.clipIntersection,_.displacementMap=I.displacementMap,_.displacementScale=I.displacementScale,_.displacementBias=I.displacementBias,_.wireframeLinewidth=I.wireframeLinewidth,_.linewidth=I.linewidth,D.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let F=n.properties.get(_);F.light=D}return _}function S(A,I,D,w,_){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&_===yi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);let H=e.update(A),W=A.material;if(Array.isArray(W)){let Y=H.groups;for(let q=0,se=Y.length;q<se;q++){let z=Y[q],ae=W[z.materialIndex];if(ae&&ae.visible){let de=E(A,ae,w,_);A.onBeforeShadow(n,A,I,D,H,de,z),n.renderBufferDirect(D,null,H,de,A,z),A.onAfterShadow(n,A,I,D,H,de,z)}}}else if(W.visible){let Y=E(A,W,w,_);A.onBeforeShadow(n,A,I,D,H,Y,null),n.renderBufferDirect(D,null,H,Y,A,null),A.onAfterShadow(n,A,I,D,H,Y,null)}}let F=A.children;for(let H=0,W=F.length;H<W;H++)S(F[H],I,D,w,_)}function C(A){A.target.removeEventListener("dispose",C);for(let D in c){let w=c[D],_=A.target.uuid;_ in w&&(w[_].dispose(),delete w[_])}}}var FE={[oc]:ac,[lc]:dc,[cc]:hc,[Us]:uc,[ac]:oc,[dc]:lc,[hc]:cc,[uc]:Us};function BE(n,e){function t(){let N=!1,ie=new Qe,oe=null,ye=new Qe(0,0,0,0);return{setMask:function(ee){oe!==ee&&!N&&(n.colorMask(ee,ee,ee,ee),oe=ee)},setLocked:function(ee){N=ee},setClear:function(ee,J,be,ke,dt){dt===!0&&(ee*=ke,J*=ke,be*=ke),ie.set(ee,J,be,ke),ye.equals(ie)===!1&&(n.clearColor(ee,J,be,ke),ye.copy(ie))},reset:function(){N=!1,oe=null,ye.set(-1,0,0,0)}}}function i(){let N=!1,ie=!1,oe=null,ye=null,ee=null;return{setReversed:function(J){if(ie!==J){let be=e.get("EXT_clip_control");J?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),ie=J;let ke=ee;ee=null,this.setClear(ke)}},getReversed:function(){return ie},setTest:function(J){J?U(n.DEPTH_TEST):Z(n.DEPTH_TEST)},setMask:function(J){oe!==J&&!N&&(n.depthMask(J),oe=J)},setFunc:function(J){if(ie&&(J=FE[J]),ye!==J){switch(J){case oc:n.depthFunc(n.NEVER);break;case ac:n.depthFunc(n.ALWAYS);break;case lc:n.depthFunc(n.LESS);break;case Us:n.depthFunc(n.LEQUAL);break;case cc:n.depthFunc(n.EQUAL);break;case uc:n.depthFunc(n.GEQUAL);break;case dc:n.depthFunc(n.GREATER);break;case hc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=J}},setLocked:function(J){N=J},setClear:function(J){ee!==J&&(ie&&(J=1-J),n.clearDepth(J),ee=J)},reset:function(){N=!1,oe=null,ye=null,ee=null,ie=!1}}}function s(){let N=!1,ie=null,oe=null,ye=null,ee=null,J=null,be=null,ke=null,dt=null;return{setTest:function(et){N||(et?U(n.STENCIL_TEST):Z(n.STENCIL_TEST))},setMask:function(et){ie!==et&&!N&&(n.stencilMask(et),ie=et)},setFunc:function(et,Ri,ai){(oe!==et||ye!==Ri||ee!==ai)&&(n.stencilFunc(et,Ri,ai),oe=et,ye=Ri,ee=ai)},setOp:function(et,Ri,ai){(J!==et||be!==Ri||ke!==ai)&&(n.stencilOp(et,Ri,ai),J=et,be=Ri,ke=ai)},setLocked:function(et){N=et},setClear:function(et){dt!==et&&(n.clearStencil(et),dt=et)},reset:function(){N=!1,ie=null,oe=null,ye=null,ee=null,J=null,be=null,ke=null,dt=null}}}let r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap,u={},d={},h=new WeakMap,f=[],y=null,v=!1,g=null,m=null,M=null,E=null,S=null,C=null,A=null,I=new Pe(0,0,0),D=0,w=!1,_=null,L=null,F=null,H=null,W=null,Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,se=0,z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(z)[1]),q=se>=1):z.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),q=se>=2);let ae=null,de={},xe=n.getParameter(n.SCISSOR_BOX),Ue=n.getParameter(n.VIEWPORT),tt=new Qe().fromArray(xe),lt=new Qe().fromArray(Ue);function Je(N,ie,oe,ye){let ee=new Uint8Array(4),J=n.createTexture();n.bindTexture(N,J),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<oe;be++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(ie+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return J}let K={};K[n.TEXTURE_2D]=Je(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=Je(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=Je(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=Je(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),U(n.DEPTH_TEST),o.setFunc(Us),De(!1),_e(Qd),U(n.CULL_FACE),mt($i);function U(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Z(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function he(N,ie){return d[N]!==ie?(n.bindFramebuffer(N,ie),d[N]=ie,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ie),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function me(N,ie){let oe=f,ye=!1;if(N){oe=h.get(ie),oe===void 0&&(oe=[],h.set(ie,oe));let ee=N.textures;if(oe.length!==ee.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let J=0,be=ee.length;J<be;J++)oe[J]=n.COLOR_ATTACHMENT0+J;oe.length=ee.length,ye=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,ye=!0);ye&&n.drawBuffers(oe)}function Xe(N){return y!==N?(n.useProgram(N),y=N,!0):!1}let Yt={[as]:n.FUNC_ADD,[eg]:n.FUNC_SUBTRACT,[tg]:n.FUNC_REVERSE_SUBTRACT};Yt[ng]=n.MIN,Yt[ig]=n.MAX;let R={[sg]:n.ZERO,[rg]:n.ONE,[og]:n.SRC_COLOR,[Vl]:n.SRC_ALPHA,[hg]:n.SRC_ALPHA_SATURATE,[ug]:n.DST_COLOR,[lg]:n.DST_ALPHA,[ag]:n.ONE_MINUS_SRC_COLOR,[$l]:n.ONE_MINUS_SRC_ALPHA,[dg]:n.ONE_MINUS_DST_COLOR,[cg]:n.ONE_MINUS_DST_ALPHA,[pg]:n.CONSTANT_COLOR,[fg]:n.ONE_MINUS_CONSTANT_COLOR,[mg]:n.CONSTANT_ALPHA,[gg]:n.ONE_MINUS_CONSTANT_ALPHA};function mt(N,ie,oe,ye,ee,J,be,ke,dt,et){if(N===$i){v===!0&&(Z(n.BLEND),v=!1);return}if(v===!1&&(U(n.BLEND),v=!0),N!==Qm){if(N!==g||et!==w){if((m!==as||S!==as)&&(n.blendEquation(n.FUNC_ADD),m=as,S=as),et)switch(N){case ks:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case th:n.blendFunc(n.ONE,n.ONE);break;case nh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ih:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ks:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case th:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case nh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ih:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,E=null,C=null,A=null,I.set(0,0,0),D=0,g=N,w=et}return}ee=ee||ie,J=J||oe,be=be||ye,(ie!==m||ee!==S)&&(n.blendEquationSeparate(Yt[ie],Yt[ee]),m=ie,S=ee),(oe!==M||ye!==E||J!==C||be!==A)&&(n.blendFuncSeparate(R[oe],R[ye],R[J],R[be]),M=oe,E=ye,C=J,A=be),(ke.equals(I)===!1||dt!==D)&&(n.blendColor(ke.r,ke.g,ke.b,dt),I.copy(ke),D=dt),g=N,w=!1}function Fe(N,ie){N.side===bn?Z(n.CULL_FACE):U(n.CULL_FACE);let oe=N.side===Gt;ie&&(oe=!oe),De(oe),N.blending===ks&&N.transparent===!1?mt($i):mt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let ye=N.stencilWrite;a.setTest(ye),ye&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Se(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?U(n.SAMPLE_ALPHA_TO_COVERAGE):Z(n.SAMPLE_ALPHA_TO_COVERAGE)}function De(N){_!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),_=N)}function _e(N){N!==Km?(U(n.CULL_FACE),N!==L&&(N===Qd?n.cullFace(n.BACK):N===Jm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Z(n.CULL_FACE),L=N}function gt(N){N!==F&&(q&&n.lineWidth(N),F=N)}function Se(N,ie,oe){N?(U(n.POLYGON_OFFSET_FILL),(H!==ie||W!==oe)&&(n.polygonOffset(ie,oe),H=ie,W=oe)):Z(n.POLYGON_OFFSET_FILL)}function He(N){N?U(n.SCISSOR_TEST):Z(n.SCISSOR_TEST)}function kt(N){N===void 0&&(N=n.TEXTURE0+Y-1),ae!==N&&(n.activeTexture(N),ae=N)}function xt(N,ie,oe){oe===void 0&&(ae===null?oe=n.TEXTURE0+Y-1:oe=ae);let ye=de[oe];ye===void 0&&(ye={type:void 0,texture:void 0},de[oe]=ye),(ye.type!==N||ye.texture!==ie)&&(ae!==oe&&(n.activeTexture(oe),ae=oe),n.bindTexture(N,ie||K[N]),ye.type=N,ye.texture=ie)}function T(){let N=de[ae];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function B(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pe(N){tt.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),tt.copy(N))}function Ne(N){lt.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),lt.copy(N))}function Me(N,ie){let oe=c.get(ie);oe===void 0&&(oe=new WeakMap,c.set(ie,oe));let ye=oe.get(N);ye===void 0&&(ye=n.getUniformBlockIndex(ie,N.name),oe.set(N,ye))}function ce(N,ie){let ye=c.get(ie).get(N);l.get(ie)!==ye&&(n.uniformBlockBinding(ie,ye,N.__bindingPointIndex),l.set(ie,ye))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ae=null,de={},d={},h=new WeakMap,f=[],y=null,v=!1,g=null,m=null,M=null,E=null,S=null,C=null,A=null,I=new Pe(0,0,0),D=0,w=!1,_=null,L=null,F=null,H=null,W=null,tt.set(0,0,n.canvas.width,n.canvas.height),lt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:U,disable:Z,bindFramebuffer:he,drawBuffers:me,useProgram:Xe,setBlending:mt,setMaterial:Fe,setFlipSided:De,setCullFace:_e,setLineWidth:gt,setPolygonOffset:Se,setScissorTest:He,activeTexture:kt,bindTexture:xt,unbindTexture:T,compressedTexImage2D:b,compressedTexImage3D:B,texImage2D:Ee,texImage3D:ne,updateUBOMapping:Me,uniformBlockBinding:ce,texStorage2D:re,texStorage3D:we,texSubImage2D:X,texSubImage3D:Q,compressedTexSubImage2D:j,compressedTexSubImage3D:Ae,scissor:pe,viewport:Ne,reset:$e}}function VE(n,e,t,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(T,b){return f?new OffscreenCanvas(T,b):Ur("canvas")}function v(T,b,B){let X=1,Q=xt(T);if((Q.width>B||Q.height>B)&&(X=B/Math.max(Q.width,Q.height)),X<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let j=Math.floor(X*Q.width),Ae=Math.floor(X*Q.height);d===void 0&&(d=y(j,Ae));let re=b?y(j,Ae):d;return re.width=j,re.height=Ae,re.getContext("2d").drawImage(T,0,0,j,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+Ae+")."),re}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function g(T){return T.generateMipmaps}function m(T){n.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(T,b,B,X,Q=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=b;if(b===n.RED&&(B===n.FLOAT&&(j=n.R32F),B===n.HALF_FLOAT&&(j=n.R16F),B===n.UNSIGNED_BYTE&&(j=n.R8)),b===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.R8UI),B===n.UNSIGNED_SHORT&&(j=n.R16UI),B===n.UNSIGNED_INT&&(j=n.R32UI),B===n.BYTE&&(j=n.R8I),B===n.SHORT&&(j=n.R16I),B===n.INT&&(j=n.R32I)),b===n.RG&&(B===n.FLOAT&&(j=n.RG32F),B===n.HALF_FLOAT&&(j=n.RG16F),B===n.UNSIGNED_BYTE&&(j=n.RG8)),b===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RG8UI),B===n.UNSIGNED_SHORT&&(j=n.RG16UI),B===n.UNSIGNED_INT&&(j=n.RG32UI),B===n.BYTE&&(j=n.RG8I),B===n.SHORT&&(j=n.RG16I),B===n.INT&&(j=n.RG32I)),b===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGB8UI),B===n.UNSIGNED_SHORT&&(j=n.RGB16UI),B===n.UNSIGNED_INT&&(j=n.RGB32UI),B===n.BYTE&&(j=n.RGB8I),B===n.SHORT&&(j=n.RGB16I),B===n.INT&&(j=n.RGB32I)),b===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),B===n.UNSIGNED_INT&&(j=n.RGBA32UI),B===n.BYTE&&(j=n.RGBA8I),B===n.SHORT&&(j=n.RGBA16I),B===n.INT&&(j=n.RGBA32I)),b===n.RGB&&(B===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),b===n.RGBA){let Ae=Q?Ho:Ke.getTransfer(X);B===n.FLOAT&&(j=n.RGBA32F),B===n.HALF_FLOAT&&(j=n.RGBA16F),B===n.UNSIGNED_BYTE&&(j=Ae===it?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function S(T,b){let B;return T?b===null||b===fs||b===Qr?B=n.DEPTH24_STENCIL8:b===Hn?B=n.DEPTH32F_STENCIL8:b===Jr&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===fs||b===Qr?B=n.DEPTH_COMPONENT24:b===Hn?B=n.DEPTH_COMPONENT32F:b===Jr&&(B=n.DEPTH_COMPONENT16),B}function C(T,b){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==zt&&T.minFilter!==sn?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function A(T){let b=T.target;b.removeEventListener("dispose",A),D(b),b.isVideoTexture&&u.delete(b)}function I(T){let b=T.target;b.removeEventListener("dispose",I),_(b)}function D(T){let b=i.get(T);if(b.__webglInit===void 0)return;let B=T.source,X=h.get(B);if(X){let Q=X[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&w(T),Object.keys(X).length===0&&h.delete(B)}i.remove(T)}function w(T){let b=i.get(T);n.deleteTexture(b.__webglTexture);let B=T.source,X=h.get(B);delete X[b.__cacheKey],o.memory.textures--}function _(T){let b=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(b.__webglFramebuffer[X]))for(let Q=0;Q<b.__webglFramebuffer[X].length;Q++)n.deleteFramebuffer(b.__webglFramebuffer[X][Q]);else n.deleteFramebuffer(b.__webglFramebuffer[X]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[X])}else{if(Array.isArray(b.__webglFramebuffer))for(let X=0;X<b.__webglFramebuffer.length;X++)n.deleteFramebuffer(b.__webglFramebuffer[X]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let X=0;X<b.__webglColorRenderbuffer.length;X++)b.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[X]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let B=T.textures;for(let X=0,Q=B.length;X<Q;X++){let j=i.get(B[X]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(B[X])}i.remove(T)}let L=0;function F(){L=0}function H(){let T=L;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function W(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function Y(T,b){let B=i.get(T);if(T.isVideoTexture&&He(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let X=T.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(B,T,b);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+b)}function q(T,b){let B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){K(B,T,b);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+b)}function se(T,b){let B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){K(B,T,b);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+b)}function z(T,b){let B=i.get(T);if(T.version>0&&B.__version!==T.version){U(B,T,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+b)}let ae={[ls]:n.REPEAT,[li]:n.CLAMP_TO_EDGE,[Or]:n.MIRRORED_REPEAT},de={[zt]:n.NEAREST,[yc]:n.NEAREST_MIPMAP_NEAREST,[Js]:n.NEAREST_MIPMAP_LINEAR,[sn]:n.LINEAR,[Kr]:n.LINEAR_MIPMAP_NEAREST,[si]:n.LINEAR_MIPMAP_LINEAR},xe={[Ng]:n.NEVER,[Bg]:n.ALWAYS,[Dg]:n.LESS,[ph]:n.LEQUAL,[Og]:n.EQUAL,[Fg]:n.GEQUAL,[kg]:n.GREATER,[Ug]:n.NOTEQUAL};function Ue(T,b){if(b.type===Hn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===sn||b.magFilter===Kr||b.magFilter===Js||b.magFilter===si||b.minFilter===sn||b.minFilter===Kr||b.minFilter===Js||b.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ae[b.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ae[b.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ae[b.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,de[b.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,de[b.minFilter]),b.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,xe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===zt||b.minFilter!==Js&&b.minFilter!==si||b.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function tt(T,b){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",A));let X=b.source,Q=h.get(X);Q===void 0&&(Q={},h.set(X,Q));let j=W(b);if(j!==T.__cacheKey){Q[j]===void 0&&(Q[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[j].usedTimes++;let Ae=Q[T.__cacheKey];Ae!==void 0&&(Q[T.__cacheKey].usedTimes--,Ae.usedTimes===0&&w(b)),T.__cacheKey=j,T.__webglTexture=Q[j].texture}return B}function lt(T,b,B){return Math.floor(Math.floor(T/B)/b)}function Je(T,b,B,X){let j=T.updateRanges;if(j.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,B,X,b.data);else{j.sort((ne,pe)=>ne.start-pe.start);let Ae=0;for(let ne=1;ne<j.length;ne++){let pe=j[Ae],Ne=j[ne],Me=pe.start+pe.count,ce=lt(Ne.start,b.width,4),$e=lt(pe.start,b.width,4);Ne.start<=Me+1&&ce===$e&&lt(Ne.start+Ne.count-1,b.width,4)===ce?pe.count=Math.max(pe.count,Ne.start+Ne.count-pe.start):(++Ae,j[Ae]=Ne)}j.length=Ae+1;let re=n.getParameter(n.UNPACK_ROW_LENGTH),we=n.getParameter(n.UNPACK_SKIP_PIXELS),Ee=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let ne=0,pe=j.length;ne<pe;ne++){let Ne=j[ne],Me=Math.floor(Ne.start/4),ce=Math.ceil(Ne.count/4),$e=Me%b.width,N=Math.floor(Me/b.width),ie=ce,oe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,$e),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,$e,N,ie,oe,B,X,b.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,we),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ee)}}function K(T,b,B){let X=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(X=n.TEXTURE_3D);let Q=tt(T,b),j=b.source;t.bindTexture(X,T.__webglTexture,n.TEXTURE0+B);let Ae=i.get(j);if(j.version!==Ae.__version||Q===!0){t.activeTexture(n.TEXTURE0+B);let re=Ke.getPrimaries(Ke.workingColorSpace),we=b.colorSpace===Hi?null:Ke.getPrimaries(b.colorSpace),Ee=b.colorSpace===Hi||re===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let ne=v(b.image,!1,s.maxTextureSize);ne=kt(b,ne);let pe=r.convert(b.format,b.colorSpace),Ne=r.convert(b.type),Me=E(b.internalFormat,pe,Ne,b.colorSpace,b.isVideoTexture);Ue(X,b);let ce,$e=b.mipmaps,N=b.isVideoTexture!==!0,ie=Ae.__version===void 0||Q===!0,oe=j.dataReady,ye=C(b,ne);if(b.isDepthTexture)Me=S(b.format===eo,b.type),ie&&(N?t.texStorage2D(n.TEXTURE_2D,1,Me,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Me,ne.width,ne.height,0,pe,Ne,null));else if(b.isDataTexture)if($e.length>0){N&&ie&&t.texStorage2D(n.TEXTURE_2D,ye,Me,$e[0].width,$e[0].height);for(let ee=0,J=$e.length;ee<J;ee++)ce=$e[ee],N?oe&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,pe,Ne,ce.data):t.texImage2D(n.TEXTURE_2D,ee,Me,ce.width,ce.height,0,pe,Ne,ce.data);b.generateMipmaps=!1}else N?(ie&&t.texStorage2D(n.TEXTURE_2D,ye,Me,ne.width,ne.height),oe&&Je(b,ne,pe,Ne)):t.texImage2D(n.TEXTURE_2D,0,Me,ne.width,ne.height,0,pe,Ne,ne.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){N&&ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Me,$e[0].width,$e[0].height,ne.depth);for(let ee=0,J=$e.length;ee<J;ee++)if(ce=$e[ee],b.format!==In)if(pe!==null)if(N){if(oe)if(b.layerUpdates.size>0){let be=xh(ce.width,ce.height,b.format,b.type);for(let ke of b.layerUpdates){let dt=ce.data.subarray(ke*be/ce.data.BYTES_PER_ELEMENT,(ke+1)*be/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,ke,ce.width,ce.height,1,pe,dt)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,pe,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Me,ce.width,ce.height,ne.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?oe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,pe,Ne,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Me,ce.width,ce.height,ne.depth,0,pe,Ne,ce.data)}else{N&&ie&&t.texStorage2D(n.TEXTURE_2D,ye,Me,$e[0].width,$e[0].height);for(let ee=0,J=$e.length;ee<J;ee++)ce=$e[ee],b.format!==In?pe!==null?N?oe&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,pe,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Me,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?oe&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,pe,Ne,ce.data):t.texImage2D(n.TEXTURE_2D,ee,Me,ce.width,ce.height,0,pe,Ne,ce.data)}else if(b.isDataArrayTexture)if(N){if(ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Me,ne.width,ne.height,ne.depth),oe)if(b.layerUpdates.size>0){let ee=xh(ne.width,ne.height,b.format,b.type);for(let J of b.layerUpdates){let be=ne.data.subarray(J*ee/ne.data.BYTES_PER_ELEMENT,(J+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,pe,Ne,be)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ne,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,ne.width,ne.height,ne.depth,0,pe,Ne,ne.data);else if(b.isData3DTexture)N?(ie&&t.texStorage3D(n.TEXTURE_3D,ye,Me,ne.width,ne.height,ne.depth),oe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ne,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Me,ne.width,ne.height,ne.depth,0,pe,Ne,ne.data);else if(b.isFramebufferTexture){if(ie)if(N)t.texStorage2D(n.TEXTURE_2D,ye,Me,ne.width,ne.height);else{let ee=ne.width,J=ne.height;for(let be=0;be<ye;be++)t.texImage2D(n.TEXTURE_2D,be,Me,ee,J,0,pe,Ne,null),ee>>=1,J>>=1}}else if($e.length>0){if(N&&ie){let ee=xt($e[0]);t.texStorage2D(n.TEXTURE_2D,ye,Me,ee.width,ee.height)}for(let ee=0,J=$e.length;ee<J;ee++)ce=$e[ee],N?oe&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe,Ne,ce):t.texImage2D(n.TEXTURE_2D,ee,Me,pe,Ne,ce);b.generateMipmaps=!1}else if(N){if(ie){let ee=xt(ne);t.texStorage2D(n.TEXTURE_2D,ye,Me,ee.width,ee.height)}oe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Ne,ne)}else t.texImage2D(n.TEXTURE_2D,0,Me,pe,Ne,ne);g(b)&&m(X),Ae.__version=j.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function U(T,b,B){if(b.image.length!==6)return;let X=tt(T,b),Q=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+B);let j=i.get(Q);if(Q.version!==j.__version||X===!0){t.activeTexture(n.TEXTURE0+B);let Ae=Ke.getPrimaries(Ke.workingColorSpace),re=b.colorSpace===Hi?null:Ke.getPrimaries(b.colorSpace),we=b.colorSpace===Hi||Ae===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let Ee=b.isCompressedTexture||b.image[0].isCompressedTexture,ne=b.image[0]&&b.image[0].isDataTexture,pe=[];for(let J=0;J<6;J++)!Ee&&!ne?pe[J]=v(b.image[J],!0,s.maxCubemapSize):pe[J]=ne?b.image[J].image:b.image[J],pe[J]=kt(b,pe[J]);let Ne=pe[0],Me=r.convert(b.format,b.colorSpace),ce=r.convert(b.type),$e=E(b.internalFormat,Me,ce,b.colorSpace),N=b.isVideoTexture!==!0,ie=j.__version===void 0||X===!0,oe=Q.dataReady,ye=C(b,Ne);Ue(n.TEXTURE_CUBE_MAP,b);let ee;if(Ee){N&&ie&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,$e,Ne.width,Ne.height);for(let J=0;J<6;J++){ee=pe[J].mipmaps;for(let be=0;be<ee.length;be++){let ke=ee[be];b.format!==In?Me!==null?N?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,ke.width,ke.height,Me,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,$e,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,ke.width,ke.height,Me,ce,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,$e,ke.width,ke.height,0,Me,ce,ke.data)}}}else{if(ee=b.mipmaps,N&&ie){ee.length>0&&ye++;let J=xt(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,$e,J.width,J.height)}for(let J=0;J<6;J++)if(ne){N?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pe[J].width,pe[J].height,Me,ce,pe[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,pe[J].width,pe[J].height,0,Me,ce,pe[J].data);for(let be=0;be<ee.length;be++){let dt=ee[be].image[J].image;N?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,dt.width,dt.height,Me,ce,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,$e,dt.width,dt.height,0,Me,ce,dt.data)}}else{N?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Me,ce,pe[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Me,ce,pe[J]);for(let be=0;be<ee.length;be++){let ke=ee[be];N?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,Me,ce,ke.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,$e,Me,ce,ke.image[J])}}}g(b)&&m(n.TEXTURE_CUBE_MAP),j.__version=Q.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function Z(T,b,B,X,Q,j){let Ae=r.convert(B.format,B.colorSpace),re=r.convert(B.type),we=E(B.internalFormat,Ae,re,B.colorSpace),Ee=i.get(b),ne=i.get(B);if(ne.__renderTarget=b,!Ee.__hasExternalTextures){let pe=Math.max(1,b.width>>j),Ne=Math.max(1,b.height>>j);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,j,we,pe,Ne,b.depth,0,Ae,re,null):t.texImage2D(Q,j,we,pe,Ne,0,Ae,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Se(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,Q,ne.__webglTexture,0,gt(b)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,Q,ne.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(T,b,B){if(n.bindRenderbuffer(n.RENDERBUFFER,T),b.depthBuffer){let X=b.depthTexture,Q=X&&X.isDepthTexture?X.type:null,j=S(b.stencilBuffer,Q),Ae=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=gt(b);Se(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,j,b.width,b.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,j,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,j,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,T)}else{let X=b.textures;for(let Q=0;Q<X.length;Q++){let j=X[Q],Ae=r.convert(j.format,j.colorSpace),re=r.convert(j.type),we=E(j.internalFormat,Ae,re,j.colorSpace),Ee=gt(b);B&&Se(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ee,we,b.width,b.height):Se(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ee,we,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,we,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function me(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=i.get(b.depthTexture);X.__renderTarget=b,(!X.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Y(b.depthTexture,0);let Q=X.__webglTexture,j=gt(b);if(b.depthTexture.format===kr)Se(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(b.depthTexture.format===eo)Se(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Xe(T){let b=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){let X=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),X){let Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,X.removeEventListener("dispose",Q)};X.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=X}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let X=T.texture.mipmaps;X&&X.length>0?me(b.__webglFramebuffer[0],T):me(b.__webglFramebuffer,T)}else if(B){b.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[X]),b.__webglDepthbuffer[X]===void 0)b.__webglDepthbuffer[X]=n.createRenderbuffer(),he(b.__webglDepthbuffer[X],T,!1);else{let Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,j)}}else{let X=T.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),he(b.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,j)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Yt(T,b,B){let X=i.get(T);b!==void 0&&Z(X.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Xe(T)}function R(T){let b=T.texture,B=i.get(T),X=i.get(b);T.addEventListener("dispose",I);let Q=T.textures,j=T.isWebGLCubeRenderTarget===!0,Ae=Q.length>1;if(Ae||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=b.version,o.memory.textures++),j){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let we=0;we<b.mipmaps.length;we++)B.__webglFramebuffer[re][we]=n.createFramebuffer()}else B.__webglFramebuffer[re]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<b.mipmaps.length;re++)B.__webglFramebuffer[re]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let re=0,we=Q.length;re<we;re++){let Ee=i.get(Q[re]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&Se(T)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let re=0;re<Q.length;re++){let we=Q[re];B.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[re]);let Ee=r.convert(we.format,we.colorSpace),ne=r.convert(we.type),pe=E(we.internalFormat,Ee,ne,we.colorSpace,T.isXRRenderTarget===!0),Ne=gt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,pe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,B.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),he(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,b);for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0)for(let we=0;we<b.mipmaps.length;we++)Z(B.__webglFramebuffer[re][we],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,we);else Z(B.__webglFramebuffer[re],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(b)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let re=0,we=Q.length;re<we;re++){let Ee=Q[re],ne=i.get(Ee),pe=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,ne.__webglTexture),Ue(pe,Ee),Z(B.__webglFramebuffer,T,Ee,n.COLOR_ATTACHMENT0+re,pe,0),g(Ee)&&m(pe)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(re=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,X.__webglTexture),Ue(re,b),b.mipmaps&&b.mipmaps.length>0)for(let we=0;we<b.mipmaps.length;we++)Z(B.__webglFramebuffer[we],T,b,n.COLOR_ATTACHMENT0,re,we);else Z(B.__webglFramebuffer,T,b,n.COLOR_ATTACHMENT0,re,0);g(b)&&m(re),t.unbindTexture()}T.depthBuffer&&Xe(T)}function mt(T){let b=T.textures;for(let B=0,X=b.length;B<X;B++){let Q=b[B];if(g(Q)){let j=M(T),Ae=i.get(Q).__webglTexture;t.bindTexture(j,Ae),m(j),t.unbindTexture()}}}let Fe=[],De=[];function _e(T){if(T.samples>0){if(Se(T)===!1){let b=T.textures,B=T.width,X=T.height,Q=n.COLOR_BUFFER_BIT,j=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(T),re=b.length>1;if(re)for(let Ee=0;Ee<b.length;Ee++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);let we=T.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ee=0;Ee<b.length;Ee++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);let ne=i.get(b[Ee]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,B,X,0,0,B,X,Q,n.NEAREST),l===!0&&(Fe.length=0,De.length=0,Fe.push(n.COLOR_ATTACHMENT0+Ee),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Fe.push(j),De.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,De)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Fe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Ee=0;Ee<b.length;Ee++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);let ne=i.get(b[Ee]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.TEXTURE_2D,ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let b=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function gt(T){return Math.min(s.maxSamples,T.samples)}function Se(T){let b=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function He(T){let b=o.render.frame;u.get(T)!==b&&(u.set(T,b),T.update())}function kt(T,b){let B=T.colorSpace,X=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Ht&&B!==Hi&&(Ke.getTransfer(B)===it?(X!==In||Q!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),b}function xt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.setTexture2D=Y,this.setTexture2DArray=q,this.setTexture3D=se,this.setTextureCube=z,this.rebindTextures=Yt,this.setupRenderTarget=R,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=Se}function $E(n,e){function t(i,s=Hi){let r,o=Ke.getTransfer(s);if(i===ri)return n.UNSIGNED_BYTE;if(i===bc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===xc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ah)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===lh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===rh)return n.BYTE;if(i===oh)return n.SHORT;if(i===Jr)return n.UNSIGNED_SHORT;if(i===vc)return n.INT;if(i===fs)return n.UNSIGNED_INT;if(i===Hn)return n.FLOAT;if(i===Zr)return n.HALF_FLOAT;if(i===ch)return n.ALPHA;if(i===uh)return n.RGB;if(i===In)return n.RGBA;if(i===kr)return n.DEPTH_COMPONENT;if(i===eo)return n.DEPTH_STENCIL;if(i===_c)return n.RED;if(i===Sc)return n.RED_INTEGER;if(i===dh)return n.RG;if(i===wc)return n.RG_INTEGER;if(i===Ec)return n.RGBA_INTEGER;if(i===ba||i===xa||i===_a||i===Sa)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_a)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Mc||i===Tc||i===Ac||i===Cc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Tc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ac)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Rc||i===Ic||i===Pc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Rc||i===Ic)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Pc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Lc||i===Nc||i===Dc||i===Oc||i===kc||i===Uc||i===Fc||i===Bc||i===Vc||i===$c||i===zc||i===Hc||i===Gc||i===Wc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Lc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Nc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Dc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===kc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Uc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Fc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$c)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===zc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Hc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Gc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Wc)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qc||i===jc||i===Xc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===qc)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===jc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Xc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Yc||i===Kc||i===Jc||i===Zc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Yc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var zE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,HE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Nh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new sa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ii({vertexShader:zE,fragmentShader:HE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new Gs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dh=class extends ni{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,y=null,v=typeof XRWebGLBinding<"u",g=new Nh,m={},M=t.getContextAttributes(),E=null,S=null,C=[],A=[],I=new Ce,D=null,w=new Mt;w.viewport=new Qe;let _=new Mt;_.viewport=new Qe;let L=[w,_],F=new ic,H=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let U=C[K];return U===void 0&&(U=new $r,C[K]=U),U.getTargetRaySpace()},this.getControllerGrip=function(K){let U=C[K];return U===void 0&&(U=new $r,C[K]=U),U.getGripSpace()},this.getHand=function(K){let U=C[K];return U===void 0&&(U=new $r,C[K]=U),U.getHandSpace()};function Y(K){let U=A.indexOf(K.inputSource);if(U===-1)return;let Z=C[U];Z!==void 0&&(Z.update(K.inputSource,K.frame,c||o),Z.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",se);for(let K=0;K<C.length;K++){let U=A[K];U!==null&&(A[K]=null,C[K].disconnect(U))}H=null,W=null,g.reset();for(let K in m)delete m[K];e.setRenderTarget(E),f=null,h=null,d=null,s=null,S=null,Je.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return y},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",q),s.addEventListener("inputsourceschange",se),M.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(I),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,he=null,me=null;M.depth&&(me=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=M.stencil?eo:kr,he=M.stencil?Qr:fs);let Xe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Xe),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new ui(h.textureWidth,h.textureHeight,{format:In,type:ri,depthTexture:new ia(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let Z={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new ui(f.framebufferWidth,f.framebufferHeight,{format:In,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Je.setContext(s),Je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function se(K){for(let U=0;U<K.removed.length;U++){let Z=K.removed[U],he=A.indexOf(Z);he>=0&&(A[he]=null,C[he].disconnect(Z))}for(let U=0;U<K.added.length;U++){let Z=K.added[U],he=A.indexOf(Z);if(he===-1){for(let Xe=0;Xe<C.length;Xe++)if(Xe>=A.length){A.push(Z),he=Xe;break}else if(A[Xe]===null){A[Xe]=Z,he=Xe;break}if(he===-1)break}let me=C[he];me&&me.connect(Z)}}let z=new P,ae=new P;function de(K,U,Z){z.setFromMatrixPosition(U.matrixWorld),ae.setFromMatrixPosition(Z.matrixWorld);let he=z.distanceTo(ae),me=U.projectionMatrix.elements,Xe=Z.projectionMatrix.elements,Yt=me[14]/(me[10]-1),R=me[14]/(me[10]+1),mt=(me[9]+1)/me[5],Fe=(me[9]-1)/me[5],De=(me[8]-1)/me[0],_e=(Xe[8]+1)/Xe[0],gt=Yt*De,Se=Yt*_e,He=he/(-De+_e),kt=He*-De;if(U.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(kt),K.translateZ(He),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),me[10]===-1)K.projectionMatrix.copy(U.projectionMatrix),K.projectionMatrixInverse.copy(U.projectionMatrixInverse);else{let xt=Yt+He,T=R+He,b=gt-kt,B=Se+(he-kt),X=mt*R/T*xt,Q=Fe*R/T*xt;K.projectionMatrix.makePerspective(b,B,X,Q,xt,T),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function xe(K,U){U===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(U.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let U=K.near,Z=K.far;g.texture!==null&&(g.depthNear>0&&(U=g.depthNear),g.depthFar>0&&(Z=g.depthFar)),F.near=_.near=w.near=U,F.far=_.far=w.far=Z,(H!==F.near||W!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),H=F.near,W=F.far),F.layers.mask=K.layers.mask|6,w.layers.mask=F.layers.mask&3,_.layers.mask=F.layers.mask&5;let he=K.parent,me=F.cameras;xe(F,he);for(let Xe=0;Xe<me.length;Xe++)xe(me[Xe],he);me.length===2?de(F,w,_):F.projectionMatrix.copy(w.projectionMatrix),Ue(K,F,he)};function Ue(K,U,Z){Z===null?K.matrix.copy(U.matrixWorld):(K.matrix.copy(Z.matrixWorld),K.matrix.invert(),K.matrix.multiply(U.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(U.projectionMatrix),K.projectionMatrixInverse.copy(U.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Vs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(K){return m[K]};let tt=null;function lt(K,U){if(u=U.getViewerPose(c||o),y=U,u!==null){let Z=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let he=!1;Z.length!==F.cameras.length&&(F.cameras.length=0,he=!0);for(let R=0;R<Z.length;R++){let mt=Z[R],Fe=null;if(f!==null)Fe=f.getViewport(mt);else{let _e=d.getViewSubImage(h,mt);Fe=_e.viewport,R===0&&(e.setRenderTargetTextures(S,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(S))}let De=L[R];De===void 0&&(De=new Mt,De.layers.enable(R),De.viewport=new Qe,L[R]=De),De.matrix.fromArray(mt.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(mt.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),R===0&&(F.matrix.copy(De.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),he===!0&&F.cameras.push(De)}let me=s.enabledFeatures;if(me&&me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();let R=d.getDepthInformation(Z[0]);R&&R.isValid&&R.texture&&g.init(R,s.renderState)}if(me&&me.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let R=0;R<Z.length;R++){let mt=Z[R].camera;if(mt){let Fe=m[mt];Fe||(Fe=new sa,m[mt]=Fe);let De=d.getCameraImage(mt);Fe.sourceTexture=De}}}}for(let Z=0;Z<C.length;Z++){let he=A[Z],me=C[Z];he!==null&&me!==void 0&&me.update(he,U,c||o)}tt&&tt(K,U),U.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:U}),y=null}let Je=new my;Je.setAnimationLoop(lt),this.setAnimationLoop=function(K){tt=K},this.dispose=function(){}}},er=new zn,GE=new Be;function WE(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,yh(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,E,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,S)):m.isMeshMatcapMaterial?(r(g,m),y(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,M,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Gt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Gt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let M=e.get(m),E=M.envMap,S=M.envMapRotation;E&&(g.envMap.value=E,er.copy(S),er.x*=-1,er.y*=-1,er.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(er.y*=-1,er.z*=-1),g.envMapRotation.value.setFromMatrix4(GE.makeRotationFromEuler(er)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Gt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){let M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function qE(n,e,t,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){let S=E.program;i.uniformBlockBinding(M,S)}function c(M,E){let S=s[M.id];S===void 0&&(y(M),S=u(M),s[M.id]=S,M.addEventListener("dispose",g));let C=E.program;i.updateUBOMapping(M,C);let A=e.render.frame;r[M.id]!==A&&(h(M),r[M.id]=A)}function u(M){let E=d();M.__bindingPointIndex=E;let S=n.createBuffer(),C=M.__size,A=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let E=s[M.id],S=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let A=0,I=S.length;A<I;A++){let D=Array.isArray(S[A])?S[A]:[S[A]];for(let w=0,_=D.length;w<_;w++){let L=D[w];if(f(L,A,w,C)===!0){let F=L.__offset,H=Array.isArray(L.value)?L.value:[L.value],W=0;for(let Y=0;Y<H.length;Y++){let q=H[Y],se=v(q);typeof q=="number"||typeof q=="boolean"?(L.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,F+W,L.__data)):q.isMatrix3?(L.__data[0]=q.elements[0],L.__data[1]=q.elements[1],L.__data[2]=q.elements[2],L.__data[3]=0,L.__data[4]=q.elements[3],L.__data[5]=q.elements[4],L.__data[6]=q.elements[5],L.__data[7]=0,L.__data[8]=q.elements[6],L.__data[9]=q.elements[7],L.__data[10]=q.elements[8],L.__data[11]=0):(q.toArray(L.__data,W),W+=se.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,E,S,C){let A=M.value,I=E+"_"+S;if(C[I]===void 0)return typeof A=="number"||typeof A=="boolean"?C[I]=A:C[I]=A.clone(),!0;{let D=C[I];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return C[I]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function y(M){let E=M.uniforms,S=0,C=16;for(let I=0,D=E.length;I<D;I++){let w=Array.isArray(E[I])?E[I]:[E[I]];for(let _=0,L=w.length;_<L;_++){let F=w[_],H=Array.isArray(F.value)?F.value:[F.value];for(let W=0,Y=H.length;W<Y;W++){let q=H[W],se=v(q),z=S%C,ae=z%se.boundary,de=z+ae;S+=ae,de!==0&&C-de<se.storage&&(S+=C-de),F.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=se.storage}}}let A=S%C;return A>0&&(S+=C-A),M.__size=S,M.__cache={},this}function v(M){let E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function g(M){let E=M.target;E.removeEventListener("dispose",g);let S=o.indexOf(E.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}var su=class{constructor(e={}){let{canvas:t=Vg(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;let y=new Uint32Array(4),v=new Int32Array(4),g=null,m=null,M=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=_t;let A=0,I=0,D=null,w=-1,_=null,L=new Qe,F=new Qe,H=null,W=new Pe(0),Y=0,q=t.width,se=t.height,z=1,ae=null,de=null,xe=new Qe(0,0,q,se),Ue=new Qe(0,0,q,se),tt=!1,lt=new Wr,Je=!1,K=!1,U=new Be,Z=new P,he=new Qe,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function Yt(){return D===null?z:1}let R=i;function mt(x,O){return t.getContext(x,O)}try{let x={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ee,!1),R===null){let O="webgl2";if(R=mt(O,x),R===null)throw mt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Fe,De,_e,gt,Se,He,kt,xt,T,b,B,X,Q,j,Ae,re,we,Ee,ne,pe,Ne,Me,ce,$e;function N(){Fe=new uw(R),Fe.init(),Me=new $E(R,Fe),De=new iw(R,Fe,e,Me),_e=new BE(R,Fe),De.reversedDepthBuffer&&h&&_e.buffers.depth.setReversed(!0),gt=new pw(R),Se=new TE,He=new VE(R,Fe,_e,Se,De,Me,gt),kt=new rw(S),xt=new cw(S),T=new b_(R),ce=new tw(R,T),b=new dw(R,T,gt,ce),B=new mw(R,b,T,gt),ne=new fw(R,De,He),re=new sw(Se),X=new ME(S,kt,xt,Fe,De,ce,re),Q=new WE(S,Se),j=new CE,Ae=new DE(Fe),Ee=new ew(S,kt,xt,_e,B,f,l),we=new UE(S,B,De),$e=new qE(R,gt,De,_e),pe=new nw(R,Fe,gt),Ne=new hw(R,Fe,gt),gt.programs=X.programs,S.capabilities=De,S.extensions=Fe,S.properties=Se,S.renderLists=j,S.shadowMap=we,S.state=_e,S.info=gt}N();let ie=new Dh(S,R);this.xr=ie,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let x=Fe.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Fe.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(x){x!==void 0&&(z=x,this.setSize(q,se,!1))},this.getSize=function(x){return x.set(q,se)},this.setSize=function(x,O,V=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=x,se=O,t.width=Math.floor(x*z),t.height=Math.floor(O*z),V===!0&&(t.style.width=x+"px",t.style.height=O+"px"),this.setViewport(0,0,x,O)},this.getDrawingBufferSize=function(x){return x.set(q*z,se*z).floor()},this.setDrawingBufferSize=function(x,O,V){q=x,se=O,z=V,t.width=Math.floor(x*V),t.height=Math.floor(O*V),this.setViewport(0,0,x,O)},this.getCurrentViewport=function(x){return x.copy(L)},this.getViewport=function(x){return x.copy(xe)},this.setViewport=function(x,O,V,$){x.isVector4?xe.set(x.x,x.y,x.z,x.w):xe.set(x,O,V,$),_e.viewport(L.copy(xe).multiplyScalar(z).round())},this.getScissor=function(x){return x.copy(Ue)},this.setScissor=function(x,O,V,$){x.isVector4?Ue.set(x.x,x.y,x.z,x.w):Ue.set(x,O,V,$),_e.scissor(F.copy(Ue).multiplyScalar(z).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(x){_e.setScissorTest(tt=x)},this.setOpaqueSort=function(x){ae=x},this.setTransparentSort=function(x){de=x},this.getClearColor=function(x){return x.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(x=!0,O=!0,V=!0){let $=0;if(x){let k=!1;if(D!==null){let te=D.texture.format;k=te===Ec||te===wc||te===Sc}if(k){let te=D.texture.type,ue=te===ri||te===fs||te===Jr||te===Qr||te===bc||te===xc,ve=Ee.getClearColor(),fe=Ee.getClearAlpha(),Le=ve.r,Oe=ve.g,Re=ve.b;ue?(y[0]=Le,y[1]=Oe,y[2]=Re,y[3]=fe,R.clearBufferuiv(R.COLOR,0,y)):(v[0]=Le,v[1]=Oe,v[2]=Re,v[3]=fe,R.clearBufferiv(R.COLOR,0,v))}else $|=R.COLOR_BUFFER_BIT}O&&($|=R.DEPTH_BUFFER_BIT),V&&($|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),Ee.dispose(),j.dispose(),Ae.dispose(),Se.dispose(),kt.dispose(),xt.dispose(),B.dispose(),ce.dispose(),$e.dispose(),X.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",ai),ie.removeEventListener("sessionend",om),As.stop()};function oe(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let x=gt.autoReset,O=we.enabled,V=we.autoUpdate,$=we.needsUpdate,k=we.type;N(),gt.autoReset=x,we.enabled=O,we.autoUpdate=V,we.needsUpdate=$,we.type=k}function ee(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function J(x){let O=x.target;O.removeEventListener("dispose",J),be(O)}function be(x){ke(x),Se.remove(x)}function ke(x){let O=Se.get(x).programs;O!==void 0&&(O.forEach(function(V){X.releaseProgram(V)}),x.isShaderMaterial&&X.releaseShaderCache(x))}this.renderBufferDirect=function(x,O,V,$,k,te){O===null&&(O=me);let ue=k.isMesh&&k.matrixWorld.determinant()<0,ve=cx(x,O,V,$,k);_e.setMaterial($,ue);let fe=V.index,Le=1;if($.wireframe===!0){if(fe=b.getWireframeAttribute(V),fe===void 0)return;Le=2}let Oe=V.drawRange,Re=V.attributes.position,Ye=Oe.start*Le,rt=(Oe.start+Oe.count)*Le;te!==null&&(Ye=Math.max(Ye,te.start*Le),rt=Math.min(rt,(te.start+te.count)*Le)),fe!==null?(Ye=Math.max(Ye,0),rt=Math.min(rt,fe.count)):Re!=null&&(Ye=Math.max(Ye,0),rt=Math.min(rt,Re.count));let bt=rt-Ye;if(bt<0||bt===1/0)return;ce.setup(k,$,ve,V,fe);let pt,ct=pe;if(fe!==null&&(pt=T.get(fe),ct=Ne,ct.setIndex(pt)),k.isMesh)$.wireframe===!0?(_e.setLineWidth($.wireframeLinewidth*Yt()),ct.setMode(R.LINES)):ct.setMode(R.TRIANGLES);else if(k.isLine){let Ie=$.linewidth;Ie===void 0&&(Ie=1),_e.setLineWidth(Ie*Yt()),k.isLineSegments?ct.setMode(R.LINES):k.isLineLoop?ct.setMode(R.LINE_LOOP):ct.setMode(R.LINE_STRIP)}else k.isPoints?ct.setMode(R.POINTS):k.isSprite&&ct.setMode(R.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Fr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Fe.get("WEBGL_multi_draw"))ct.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ie=k._multiDrawStarts,yt=k._multiDrawCounts,Ze=k._multiDrawCount,Mn=fe?T.get(fe).bytesPerElement:1,br=Se.get($).currentProgram.getUniforms();for(let Tn=0;Tn<Ze;Tn++)br.setValue(R,"_gl_DrawID",Tn),ct.render(Ie[Tn]/Mn,yt[Tn])}else if(k.isInstancedMesh)ct.renderInstances(Ye,bt,k.count);else if(V.isInstancedBufferGeometry){let Ie=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,yt=Math.min(V.instanceCount,Ie);ct.renderInstances(Ye,bt,yt)}else ct.render(Ye,bt)};function dt(x,O,V){x.transparent===!0&&x.side===bn&&x.forceSinglePass===!1?(x.side=Gt,x.needsUpdate=!0,fl(x,O,V),x.side=ti,x.needsUpdate=!0,fl(x,O,V),x.side=bn):fl(x,O,V)}this.compile=function(x,O,V=null){V===null&&(V=x),m=Ae.get(V),m.init(O),E.push(m),V.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),x!==V&&x.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();let $=new Set;return x.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let te=k.material;if(te)if(Array.isArray(te))for(let ue=0;ue<te.length;ue++){let ve=te[ue];dt(ve,V,k),$.add(ve)}else dt(te,V,k),$.add(te)}),m=E.pop(),$},this.compileAsync=function(x,O,V=null){let $=this.compile(x,O,V);return new Promise(k=>{function te(){if($.forEach(function(ue){Se.get(ue).currentProgram.isReady()&&$.delete(ue)}),$.size===0){k(x);return}setTimeout(te,10)}Fe.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let et=null;function Ri(x){et&&et(x)}function ai(){As.stop()}function om(){As.start()}let As=new my;As.setAnimationLoop(Ri),typeof self<"u"&&As.setContext(self),this.setAnimationLoop=function(x){et=x,ie.setAnimationLoop(x),x===null?As.stop():As.start()},ie.addEventListener("sessionstart",ai),ie.addEventListener("sessionend",om),this.render=function(x,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(O),O=ie.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,O,D),m=Ae.get(x,E.length),m.init(O),E.push(m),U.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),lt.setFromProjectionMatrix(U,Zn,O.reversedDepth),K=this.localClippingEnabled,Je=re.init(this.clippingPlanes,K),g=j.get(x,M.length),g.init(),M.push(g),ie.enabled===!0&&ie.isPresenting===!0){let te=S.xr.getDepthSensingMesh();te!==null&&pd(te,O,-1/0,S.sortObjects)}pd(x,O,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(ae,de),Xe=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Xe&&Ee.addToRenderList(g,x),this.info.render.frame++,Je===!0&&re.beginShadows();let V=m.state.shadowsArray;we.render(V,x,O),Je===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();let $=g.opaque,k=g.transmissive;if(m.setupLights(),O.isArrayCamera){let te=O.cameras;if(k.length>0)for(let ue=0,ve=te.length;ue<ve;ue++){let fe=te[ue];lm($,k,x,fe)}Xe&&Ee.render(x);for(let ue=0,ve=te.length;ue<ve;ue++){let fe=te[ue];am(g,x,fe,fe.viewport)}}else k.length>0&&lm($,k,x,O),Xe&&Ee.render(x),am(g,x,O);D!==null&&I===0&&(He.updateMultisampleRenderTarget(D),He.updateRenderTargetMipmap(D)),x.isScene===!0&&x.onAfterRender(S,x,O),ce.resetDefaultState(),w=-1,_=null,E.pop(),E.length>0?(m=E[E.length-1],Je===!0&&re.setGlobalState(S.clippingPlanes,m.state.camera)):m=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function pd(x,O,V,$){if(x.visible===!1)return;if(x.layers.test(O.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(O);else if(x.isLight)m.pushLight(x),x.castShadow&&m.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||lt.intersectsSprite(x)){$&&he.setFromMatrixPosition(x.matrixWorld).applyMatrix4(U);let ue=B.update(x),ve=x.material;ve.visible&&g.push(x,ue,ve,V,he.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||lt.intersectsObject(x))){let ue=B.update(x),ve=x.material;if($&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),he.copy(x.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),he.copy(ue.boundingSphere.center)),he.applyMatrix4(x.matrixWorld).applyMatrix4(U)),Array.isArray(ve)){let fe=ue.groups;for(let Le=0,Oe=fe.length;Le<Oe;Le++){let Re=fe[Le],Ye=ve[Re.materialIndex];Ye&&Ye.visible&&g.push(x,ue,Ye,V,he.z,Re)}}else ve.visible&&g.push(x,ue,ve,V,he.z,null)}}let te=x.children;for(let ue=0,ve=te.length;ue<ve;ue++)pd(te[ue],O,V,$)}function am(x,O,V,$){let k=x.opaque,te=x.transmissive,ue=x.transparent;m.setupLightsView(V),Je===!0&&re.setGlobalState(S.clippingPlanes,V),$&&_e.viewport(L.copy($)),k.length>0&&pl(k,O,V),te.length>0&&pl(te,O,V),ue.length>0&&pl(ue,O,V),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function lm(x,O,V,$){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[$.id]===void 0&&(m.state.transmissionRenderTarget[$.id]=new ui(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float")?Zr:ri,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));let te=m.state.transmissionRenderTarget[$.id],ue=$.viewport||L;te.setSize(ue.z*S.transmissionResolutionScale,ue.w*S.transmissionResolutionScale);let ve=S.getRenderTarget(),fe=S.getActiveCubeFace(),Le=S.getActiveMipmapLevel();S.setRenderTarget(te),S.getClearColor(W),Y=S.getClearAlpha(),Y<1&&S.setClearColor(16777215,.5),S.clear(),Xe&&Ee.render(V);let Oe=S.toneMapping;S.toneMapping=zi;let Re=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),m.setupLightsView($),Je===!0&&re.setGlobalState(S.clippingPlanes,$),pl(x,V,$),He.updateMultisampleRenderTarget(te),He.updateRenderTargetMipmap(te),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let rt=0,bt=O.length;rt<bt;rt++){let pt=O[rt],ct=pt.object,Ie=pt.geometry,yt=pt.material,Ze=pt.group;if(yt.side===bn&&ct.layers.test($.layers)){let Mn=yt.side;yt.side=Gt,yt.needsUpdate=!0,cm(ct,V,$,Ie,yt,Ze),yt.side=Mn,yt.needsUpdate=!0,Ye=!0}}Ye===!0&&(He.updateMultisampleRenderTarget(te),He.updateRenderTargetMipmap(te))}S.setRenderTarget(ve,fe,Le),S.setClearColor(W,Y),Re!==void 0&&($.viewport=Re),S.toneMapping=Oe}function pl(x,O,V){let $=O.isScene===!0?O.overrideMaterial:null;for(let k=0,te=x.length;k<te;k++){let ue=x[k],ve=ue.object,fe=ue.geometry,Le=ue.group,Oe=ue.material;Oe.allowOverride===!0&&$!==null&&(Oe=$),ve.layers.test(V.layers)&&cm(ve,O,V,fe,Oe,Le)}}function cm(x,O,V,$,k,te){x.onBeforeRender(S,O,V,$,k,te),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),k.onBeforeRender(S,O,V,$,x,te),k.transparent===!0&&k.side===bn&&k.forceSinglePass===!1?(k.side=Gt,k.needsUpdate=!0,S.renderBufferDirect(V,O,$,k,x,te),k.side=ti,k.needsUpdate=!0,S.renderBufferDirect(V,O,$,k,x,te),k.side=bn):S.renderBufferDirect(V,O,$,k,x,te),x.onAfterRender(S,O,V,$,k,te)}function fl(x,O,V){O.isScene!==!0&&(O=me);let $=Se.get(x),k=m.state.lights,te=m.state.shadowsArray,ue=k.state.version,ve=X.getParameters(x,k.state,te,O,V),fe=X.getProgramCacheKey(ve),Le=$.programs;$.environment=x.isMeshStandardMaterial?O.environment:null,$.fog=O.fog,$.envMap=(x.isMeshStandardMaterial?xt:kt).get(x.envMap||$.environment),$.envMapRotation=$.environment!==null&&x.envMap===null?O.environmentRotation:x.envMapRotation,Le===void 0&&(x.addEventListener("dispose",J),Le=new Map,$.programs=Le);let Oe=Le.get(fe);if(Oe!==void 0){if($.currentProgram===Oe&&$.lightsStateVersion===ue)return dm(x,ve),Oe}else ve.uniforms=X.getUniforms(x),x.onBeforeCompile(ve,S),Oe=X.acquireProgram(ve,fe),Le.set(fe,Oe),$.uniforms=ve.uniforms;let Re=$.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=re.uniform),dm(x,ve),$.needsLights=dx(x),$.lightsStateVersion=ue,$.needsLights&&(Re.ambientLightColor.value=k.state.ambient,Re.lightProbe.value=k.state.probe,Re.directionalLights.value=k.state.directional,Re.directionalLightShadows.value=k.state.directionalShadow,Re.spotLights.value=k.state.spot,Re.spotLightShadows.value=k.state.spotShadow,Re.rectAreaLights.value=k.state.rectArea,Re.ltc_1.value=k.state.rectAreaLTC1,Re.ltc_2.value=k.state.rectAreaLTC2,Re.pointLights.value=k.state.point,Re.pointLightShadows.value=k.state.pointShadow,Re.hemisphereLights.value=k.state.hemi,Re.directionalShadowMap.value=k.state.directionalShadowMap,Re.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Re.spotShadowMap.value=k.state.spotShadowMap,Re.spotLightMatrix.value=k.state.spotLightMatrix,Re.spotLightMap.value=k.state.spotLightMap,Re.pointShadowMap.value=k.state.pointShadowMap,Re.pointShadowMatrix.value=k.state.pointShadowMatrix),$.currentProgram=Oe,$.uniformsList=null,Oe}function um(x){if(x.uniformsList===null){let O=x.currentProgram.getUniforms();x.uniformsList=so.seqWithValue(O.seq,x.uniforms)}return x.uniformsList}function dm(x,O){let V=Se.get(x);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function cx(x,O,V,$,k){O.isScene!==!0&&(O=me),He.resetTextureUnits();let te=O.fog,ue=$.isMeshStandardMaterial?O.environment:null,ve=D===null?S.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ht,fe=($.isMeshStandardMaterial?xt:kt).get($.envMap||ue),Le=$.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Oe=!!V.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Re=!!V.morphAttributes.position,Ye=!!V.morphAttributes.normal,rt=!!V.morphAttributes.color,bt=zi;$.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(bt=S.toneMapping);let pt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ct=pt!==void 0?pt.length:0,Ie=Se.get($),yt=m.state.lights;if(Je===!0&&(K===!0||x!==_)){let tn=x===_&&$.id===w;re.setState($,x,tn)}let Ze=!1;$.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==yt.state.version||Ie.outputColorSpace!==ve||k.isBatchedMesh&&Ie.batching===!1||!k.isBatchedMesh&&Ie.batching===!0||k.isBatchedMesh&&Ie.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ie.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ie.instancing===!1||!k.isInstancedMesh&&Ie.instancing===!0||k.isSkinnedMesh&&Ie.skinning===!1||!k.isSkinnedMesh&&Ie.skinning===!0||k.isInstancedMesh&&Ie.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ie.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ie.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ie.instancingMorph===!1&&k.morphTexture!==null||Ie.envMap!==fe||$.fog===!0&&Ie.fog!==te||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==re.numPlanes||Ie.numIntersection!==re.numIntersection)||Ie.vertexAlphas!==Le||Ie.vertexTangents!==Oe||Ie.morphTargets!==Re||Ie.morphNormals!==Ye||Ie.morphColors!==rt||Ie.toneMapping!==bt||Ie.morphTargetsCount!==ct)&&(Ze=!0):(Ze=!0,Ie.__version=$.version);let Mn=Ie.currentProgram;Ze===!0&&(Mn=fl($,O,k));let br=!1,Tn=!1,Io=!1,vt=Mn.getUniforms(),Fn=Ie.uniforms;if(_e.useProgram(Mn.program)&&(br=!0,Tn=!0,Io=!0),$.id!==w&&(w=$.id,Tn=!0),br||_!==x){_e.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),vt.setValue(R,"projectionMatrix",x.projectionMatrix),vt.setValue(R,"viewMatrix",x.matrixWorldInverse);let mn=vt.map.cameraPosition;mn!==void 0&&mn.setValue(R,Z.setFromMatrixPosition(x.matrixWorld)),De.logarithmicDepthBuffer&&vt.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&vt.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),_!==x&&(_=x,Tn=!0,Io=!0)}if(k.isSkinnedMesh){vt.setOptional(R,k,"bindMatrix"),vt.setOptional(R,k,"bindMatrixInverse");let tn=k.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),vt.setValue(R,"boneTexture",tn.boneTexture,He))}k.isBatchedMesh&&(vt.setOptional(R,k,"batchingTexture"),vt.setValue(R,"batchingTexture",k._matricesTexture,He),vt.setOptional(R,k,"batchingIdTexture"),vt.setValue(R,"batchingIdTexture",k._indirectTexture,He),vt.setOptional(R,k,"batchingColorTexture"),k._colorsTexture!==null&&vt.setValue(R,"batchingColorTexture",k._colorsTexture,He));let Bn=V.morphAttributes;if((Bn.position!==void 0||Bn.normal!==void 0||Bn.color!==void 0)&&ne.update(k,V,Mn),(Tn||Ie.receiveShadow!==k.receiveShadow)&&(Ie.receiveShadow=k.receiveShadow,vt.setValue(R,"receiveShadow",k.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Fn.envMap.value=fe,Fn.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&O.environment!==null&&(Fn.envMapIntensity.value=O.environmentIntensity),Tn&&(vt.setValue(R,"toneMappingExposure",S.toneMappingExposure),Ie.needsLights&&ux(Fn,Io),te&&$.fog===!0&&Q.refreshFogUniforms(Fn,te),Q.refreshMaterialUniforms(Fn,$,z,se,m.state.transmissionRenderTarget[x.id]),so.upload(R,um(Ie),Fn,He)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(so.upload(R,um(Ie),Fn,He),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&vt.setValue(R,"center",k.center),vt.setValue(R,"modelViewMatrix",k.modelViewMatrix),vt.setValue(R,"normalMatrix",k.normalMatrix),vt.setValue(R,"modelMatrix",k.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let tn=$.uniformsGroups;for(let mn=0,fd=tn.length;mn<fd;mn++){let Cs=tn[mn];$e.update(Cs,Mn),$e.bind(Cs,Mn)}}return Mn}function ux(x,O){x.ambientLightColor.needsUpdate=O,x.lightProbe.needsUpdate=O,x.directionalLights.needsUpdate=O,x.directionalLightShadows.needsUpdate=O,x.pointLights.needsUpdate=O,x.pointLightShadows.needsUpdate=O,x.spotLights.needsUpdate=O,x.spotLightShadows.needsUpdate=O,x.rectAreaLights.needsUpdate=O,x.hemisphereLights.needsUpdate=O}function dx(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(x,O,V){let $=Se.get(x);$.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Se.get(x.texture).__webglTexture=O,Se.get(x.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:V,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,O){let V=Se.get(x);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0};let hx=R.createFramebuffer();this.setRenderTarget=function(x,O=0,V=0){D=x,A=O,I=V;let $=!0,k=null,te=!1,ue=!1;if(x){let fe=Se.get(x);if(fe.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(R.FRAMEBUFFER,null),$=!1;else if(fe.__webglFramebuffer===void 0)He.setupRenderTarget(x);else if(fe.__hasExternalTextures)He.rebindTextures(x,Se.get(x.texture).__webglTexture,Se.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let Re=x.depthTexture;if(fe.__boundDepthTexture!==Re){if(Re!==null&&Se.has(Re)&&(x.width!==Re.image.width||x.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");He.setupDepthRenderbuffer(x)}}let Le=x.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ue=!0);let Oe=Se.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Oe[O])?k=Oe[O][V]:k=Oe[O],te=!0):x.samples>0&&He.useMultisampledRTT(x)===!1?k=Se.get(x).__webglMultisampledFramebuffer:Array.isArray(Oe)?k=Oe[V]:k=Oe,L.copy(x.viewport),F.copy(x.scissor),H=x.scissorTest}else L.copy(xe).multiplyScalar(z).floor(),F.copy(Ue).multiplyScalar(z).floor(),H=tt;if(V!==0&&(k=hx),_e.bindFramebuffer(R.FRAMEBUFFER,k)&&$&&_e.drawBuffers(x,k),_e.viewport(L),_e.scissor(F),_e.setScissorTest(H),te){let fe=Se.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+O,fe.__webglTexture,V)}else if(ue){let fe=O;for(let Le=0;Le<x.textures.length;Le++){let Oe=Se.get(x.textures[Le]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Le,Oe.__webglTexture,V,fe)}}else if(x!==null&&V!==0){let fe=Se.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,fe.__webglTexture,V)}w=-1},this.readRenderTargetPixels=function(x,O,V,$,k,te,ue,ve=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=Se.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){_e.bindFramebuffer(R.FRAMEBUFFER,fe);try{let Le=x.textures[ve],Oe=Le.format,Re=Le.type;if(!De.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=x.width-$&&V>=0&&V<=x.height-k&&(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ve),R.readPixels(O,V,$,k,Me.convert(Oe),Me.convert(Re),te))}finally{let Le=D!==null?Se.get(D).__webglFramebuffer:null;_e.bindFramebuffer(R.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(x,O,V,$,k,te,ue,ve=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=Se.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(O>=0&&O<=x.width-$&&V>=0&&V<=x.height-k){_e.bindFramebuffer(R.FRAMEBUFFER,fe);let Le=x.textures[ve],Oe=Le.format,Re=Le.type;if(!De.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ye=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ye),R.bufferData(R.PIXEL_PACK_BUFFER,te.byteLength,R.STREAM_READ),x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ve),R.readPixels(O,V,$,k,Me.convert(Oe),Me.convert(Re),0);let rt=D!==null?Se.get(D).__webglFramebuffer:null;_e.bindFramebuffer(R.FRAMEBUFFER,rt);let bt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await $g(R,bt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Ye),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,te),R.deleteBuffer(Ye),R.deleteSync(bt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,O=null,V=0){let $=Math.pow(2,-V),k=Math.floor(x.image.width*$),te=Math.floor(x.image.height*$),ue=O!==null?O.x:0,ve=O!==null?O.y:0;He.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,V,0,0,ue,ve,k,te),_e.unbindTexture()};let px=R.createFramebuffer(),fx=R.createFramebuffer();this.copyTextureToTexture=function(x,O,V=null,$=null,k=0,te=null){te===null&&(k!==0?(Fr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=k,k=0):te=0);let ue,ve,fe,Le,Oe,Re,Ye,rt,bt,pt=x.isCompressedTexture?x.mipmaps[te]:x.image;if(V!==null)ue=V.max.x-V.min.x,ve=V.max.y-V.min.y,fe=V.isBox3?V.max.z-V.min.z:1,Le=V.min.x,Oe=V.min.y,Re=V.isBox3?V.min.z:0;else{let Bn=Math.pow(2,-k);ue=Math.floor(pt.width*Bn),ve=Math.floor(pt.height*Bn),x.isDataArrayTexture?fe=pt.depth:x.isData3DTexture?fe=Math.floor(pt.depth*Bn):fe=1,Le=0,Oe=0,Re=0}$!==null?(Ye=$.x,rt=$.y,bt=$.z):(Ye=0,rt=0,bt=0);let ct=Me.convert(O.format),Ie=Me.convert(O.type),yt;O.isData3DTexture?(He.setTexture3D(O,0),yt=R.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(He.setTexture2DArray(O,0),yt=R.TEXTURE_2D_ARRAY):(He.setTexture2D(O,0),yt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,O.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,O.unpackAlignment);let Ze=R.getParameter(R.UNPACK_ROW_LENGTH),Mn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),br=R.getParameter(R.UNPACK_SKIP_PIXELS),Tn=R.getParameter(R.UNPACK_SKIP_ROWS),Io=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,pt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,pt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Le),R.pixelStorei(R.UNPACK_SKIP_ROWS,Oe),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Re);let vt=x.isDataArrayTexture||x.isData3DTexture,Fn=O.isDataArrayTexture||O.isData3DTexture;if(x.isDepthTexture){let Bn=Se.get(x),tn=Se.get(O),mn=Se.get(Bn.__renderTarget),fd=Se.get(tn.__renderTarget);_e.bindFramebuffer(R.READ_FRAMEBUFFER,mn.__webglFramebuffer),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,fd.__webglFramebuffer);for(let Cs=0;Cs<fe;Cs++)vt&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Se.get(x).__webglTexture,k,Re+Cs),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Se.get(O).__webglTexture,te,bt+Cs)),R.blitFramebuffer(Le,Oe,ue,ve,Ye,rt,ue,ve,R.DEPTH_BUFFER_BIT,R.NEAREST);_e.bindFramebuffer(R.READ_FRAMEBUFFER,null),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(k!==0||x.isRenderTargetTexture||Se.has(x)){let Bn=Se.get(x),tn=Se.get(O);_e.bindFramebuffer(R.READ_FRAMEBUFFER,px),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,fx);for(let mn=0;mn<fe;mn++)vt?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Bn.__webglTexture,k,Re+mn):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Bn.__webglTexture,k),Fn?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,tn.__webglTexture,te,bt+mn):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,tn.__webglTexture,te),k!==0?R.blitFramebuffer(Le,Oe,ue,ve,Ye,rt,ue,ve,R.COLOR_BUFFER_BIT,R.NEAREST):Fn?R.copyTexSubImage3D(yt,te,Ye,rt,bt+mn,Le,Oe,ue,ve):R.copyTexSubImage2D(yt,te,Ye,rt,Le,Oe,ue,ve);_e.bindFramebuffer(R.READ_FRAMEBUFFER,null),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Fn?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(yt,te,Ye,rt,bt,ue,ve,fe,ct,Ie,pt.data):O.isCompressedArrayTexture?R.compressedTexSubImage3D(yt,te,Ye,rt,bt,ue,ve,fe,ct,pt.data):R.texSubImage3D(yt,te,Ye,rt,bt,ue,ve,fe,ct,Ie,pt):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,te,Ye,rt,ue,ve,ct,Ie,pt.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,te,Ye,rt,pt.width,pt.height,ct,pt.data):R.texSubImage2D(R.TEXTURE_2D,te,Ye,rt,ue,ve,ct,Ie,pt);R.pixelStorei(R.UNPACK_ROW_LENGTH,Ze),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Mn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,br),R.pixelStorei(R.UNPACK_SKIP_ROWS,Tn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Io),te===0&&O.generateMipmaps&&R.generateMipmap(yt),_e.unbindTexture()},this.initRenderTarget=function(x){Se.get(x).__webglFramebuffer===void 0&&He.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?He.setTextureCube(x,0):x.isData3DTexture?He.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?He.setTexture2DArray(x,0):He.setTexture2D(x,0),_e.unbindTexture()},this.resetState=function(){A=0,I=0,D=null,_e.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}};function kh(n,e){if(e===hh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===to||e===wa){let t=n.getIndex();if(t===null){let o=[],a=n.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);n.setIndex(o),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,s=[];if(e===to)for(let o=1;o<=i;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}var ou=class extends gi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new ep(t)}),this.register(function(t){return new tp(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new zh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new np(t)}),this.register(function(t){return new ip(t)})}load(e,t,i,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=Vi.extractUrlBase(e);o=Vi.resolveURL(c,this.path)}else o=Vi.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Xr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Ey){try{o[qe.KHR_BINARY_GLTF]=new sp(e)}catch(d){s&&s(d);return}r=JSON.parse(o[qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new dp(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case qe.KHR_MATERIALS_UNLIT:o[d]=new $h;break;case qe.KHR_DRACO_MESH_COMPRESSION:o[d]=new rp(r,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:o[d]=new op;break;case qe.KHR_MESH_QUANTIZATION:o[d]=new ap;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(i,s)}parseAsync(e,t){let i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}};function XE(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}var qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Vh=class{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,s=t.cache.get(i);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new Pe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Ht);let d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ds(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new js(u),c.distance=d;break;case"spot":c=new pa(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),bi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return i._getNodeRef(t.cache,a,l)})}},$h=class{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return on}extendParams(e,t,i){let s=[];e.color=new Pe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ht),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,_t))}return Promise.all(s)}},zh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Hh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ce(a,a)}return Promise.all(r)}},Gh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Wh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},qh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Pe(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ht)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",o.sheenColorTexture,_t)),o.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},jh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Xh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Pe().setRGB(a[0],a[1],a[2],Ht),Promise.all(r)}},Yh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Kh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Pe().setRGB(a[0],a[1],a[2],Ht),o.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",o.specularColorTexture,_t)),Promise.all(r)}},Jh=class{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Zh=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:yn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Qh=class{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},ep=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=i.textureLoader;if(a.uri){let c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return i.loadTextureImage(e,o.source,l)}},tp=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=i.textureLoader;if(a.uri){let c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return i.loadTextureImage(e,o.source,l)}},np=class{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(f),u,d,h,s.mode,s.filter),f})})}else return null}},ip=class{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let s=t.meshes[i.mesh];for(let c of s.primitives)if(c.mode!==Gn.TRIANGLES&&c.mode!==Gn.TRIANGLE_STRIP&&c.mode!==Gn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=i.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(let y of d){let v=new Be,g=new P,m=new Bt,M=new P(1,1,1),E=new zs(y.geometry,y.material,h);for(let S=0;S<h;S++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,S),l.SCALE&&M.fromBufferAttribute(l.SCALE,S),E.setMatrixAt(S,v.compose(g,m,M));for(let S in l)if(S==="_COLOR_0"){let C=l[S];E.instanceColor=new us(C.array,C.itemSize,C.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&y.geometry.setAttribute(S,l[S]);ht.prototype.copy.call(E,y),this.parser.assignFinalMaterial(E),f.push(E)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Ey="glTF",Ta=12,xy={JSON:1313821514,BIN:5130562},sp=class{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ta),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ey)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Ta,r=new DataView(e,Ta),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===xy.JSON){let c=new Uint8Array(e,Ta+o,a);this.content=i.decode(c)}else if(l===xy.BIN){let c=Ta+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},rp=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let u in o){let d=cp[u]||u.toLowerCase();a[d]=o[u]}for(let u in e.attributes){let d=cp[u]||u.toLowerCase();if(o[u]!==void 0){let h=i.accessors[e.attributes[u]],f=ao[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(f){for(let y in f.attributes){let v=f.attributes[y],g=l[y];g!==void 0&&(v.normalized=g)}d(f)},a,c,Ht,h)})})}},op=class{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},ap=class{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}},au=class extends Ui{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=i[r+o];return t}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=s-t,d=(i-t)/u,h=d*d,f=h*d,y=e*c,v=y-c,g=-2*f+3*h,m=f-h,M=1-g,E=m-h+d;for(let S=0;S!==a;S++){let C=o[v+S+a],A=o[v+S+l]*u,I=o[y+S+a],D=o[y+S]*u;r[S]=M*C+E*A+g*I+m*D}return r}},YE=new Bt,lp=class extends au{interpolate_(e,t,i,s){let r=super.interpolate_(e,t,i,s);return YE.fromArray(r).normalize().toArray(r),r}},Gn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ao={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},_y={9728:zt,9729:sn,9984:yc,9985:Kr,9986:Js,9987:si},Sy={33071:li,33648:Or,10497:ls},Uh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cp={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ms={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},KE={CUBICSPLINE:void 0,LINEAR:Bs,STEP:Fs},Fh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function JE(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new hi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),n.DefaultMaterial}function ir(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function bi(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ZE(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);let o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){let d=e[c];if(i){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;o.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;a.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let u=c[0],d=c[1],h=c[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=d),r&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function QE(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function eM(n){let e,t=n.extensions&&n.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Bh(t.attributes):e=n.indices+":"+Bh(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+Bh(n.targets[i]);return e}function Bh(n){let e="",t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function up(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function tM(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var nM=new Be,dp=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new XE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&o<98?this.textureLoader=new ua(this.options.manager):this.textureLoader=new fa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return ir(r,a,s),bi(a,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let s=i.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,u]of o.children.entries())r(u,a.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let s=e(t[i]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return i.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){i.load(Vi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){let t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Uh[s.type],a=ao[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new Tt(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=Uh[s.type],c=ao[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,y=s.normalized===!0,v,g;if(f&&f!==d){let m=Math.floor(h/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,E=t.cache.get(M);E||(v=new c(a,m*f,s.count*f/u),E=new zr(v,f/u),t.cache.add(M,E)),g=new Hr(E,l,h%f/u,y)}else a===null?v=new c(s.count*l):v=new c(a,h,s.count*l),g=new Tt(v,l,y);if(s.sparse!==void 0){let m=Uh.SCALAR,M=ao[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,C=new M(o[1],E,s.sparse.count*m),A=new c(o[2],S,s.sparse.count*l);a!==null&&(g=new Tt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let I=0,D=C.length;I<D;I++){let w=C[I];if(g.setX(w,A[I*l]),l>=2&&g.setY(w,A[I*l+1]),l>=3&&g.setZ(w,A[I*l+2]),l>=4&&g.setW(w,A[I*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=y}return g})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=i.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,i){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let h=(r.samplers||{})[o.sampler]||{};return u.magFilter=_y[h.magFilter]||sn,u.minFilter=_y[h.minFilter]||si,u.wrapS=Sy[h.wrapS]||ls,u.wrapT=Sy[h.wrapT]||ls,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==zt&&u.minFilter!==sn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=i.getDependency("bufferView",o.bufferView).then(function(d){c=!0;let h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let y=h;t.isImageBitmapLoader===!0&&(y=function(v){let g=new It(v);g.needsUpdate=!0,h(g)}),t.load(Vi.resolveURL(d,r.path),y,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),bi(d,o),d.userData.mimeType=o.mimeType||tM(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,i,s){let r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[qe.KHR_TEXTURE_TRANSFORM]){let a=i.extensions!==void 0?i.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,i=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+i.uuid,l=this.cache.get(a);l||(l=new jr,rn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(a,l)),i=l}else if(e.isLine){let a="LineBasicMaterial:"+i.uuid,l=this.cache.get(a);l||(l=new qr,rn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(a,l)),i=l}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=i.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return hi}loadMaterial(e){let t=this,i=this.json,s=this.extensions,r=i.materials[e],o,a={},l=r.extensions||{},c=[];if(l[qe.KHR_MATERIALS_UNLIT]){let d=s[qe.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,r,t))}else{let d=r.pbrMetallicRoughness||{};if(a.color=new Pe(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Ht),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,_t)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=bn);let u=r.alphaMode||Fh.OPAQUE;if(u===Fh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Fh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==on&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ce(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==on&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==on){let d=r.emissiveFactor;a.emissive=new Pe().setRGB(d[0],d[1],d[2],Ht)}return r.emissiveTexture!==void 0&&o!==on&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,_t)),Promise.all(c).then(function(){let d=new o(a);return r.name&&(d.name=r.name),bi(d,r),t.associations.set(d,{materials:e}),r.extensions&&ir(s,d,r),d})}createUniqueName(e){let t=ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return wy(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],u=eM(c),d=s[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=wy(new an,c,t),s[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){let t=this,i=this.json,s=this.extensions,r=i.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let u=o[l].material===void 0?JE(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,y=u.length;f<y;f++){let v=u[f],g=o[f],m,M=c[f];if(g.mode===Gn.TRIANGLES||g.mode===Gn.TRIANGLE_STRIP||g.mode===Gn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new Ko(v,M):new st(v,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===Gn.TRIANGLE_STRIP?m.geometry=kh(m.geometry,wa):g.mode===Gn.TRIANGLE_FAN&&(m.geometry=kh(m.geometry,to));else if(g.mode===Gn.LINES)m=new Qo(v,M);else if(g.mode===Gn.LINE_STRIP)m=new Hs(v,M);else if(g.mode===Gn.LINE_LOOP)m=new ea(v,M);else if(g.mode===Gn.POINTS)m=new ta(v,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&QE(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),bi(m,r),g.extensions&&ir(s,m,g),t.assignFinalMaterial(m),d.push(m)}for(let f=0,y=d.length;f<y;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&ir(s,d[0],r),d[0];let h=new Qn;r.extensions&&ir(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,y=d.length;f<y;f++)h.add(d[f]);return h})}loadCamera(e){let t,i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Mt(Ea.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new Xs(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),bi(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,u=o.length;c<u;c++){let d=o[c];if(d){a.push(d);let h=new Be;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Zo(a,l)})}loadAnimation(e){let t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let f=s.channels[d],y=s.samplers[f.sampler],v=f.target,g=v.node,m=s.parameters!==void 0?s.parameters[y.input]:y.input,M=s.parameters!==void 0?s.parameters[y.output]:y.output;v.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",M)),c.push(y),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],y=d[2],v=d[3],g=d[4],m=[];for(let E=0,S=h.length;E<S;E++){let C=h[E],A=f[E],I=y[E],D=v[E],w=g[E];if(C===void 0)continue;C.updateMatrix&&C.updateMatrix();let _=i._createAnimationTracks(C,A,I,D,w);if(_)for(let L=0;L<_.length;L++)m.push(_[L])}let M=new Ws(r,void 0,m);return bi(M,s),M})}createNodeMesh(e){let t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){let o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,u=a.length;c<u;c++)o.push(i.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,nM)});for(let f=0,y=d.length;f<y;f++)u.add(d[f]);return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new Gr:c.length>1?u=new Qn:c.length===1?u=c[0]:u=new ht,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=o),bi(u,r),r.extensions&&ir(i,u,r),r.matrix!==void 0){let d=new Be;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],s=this,r=new Qn;i.name&&(r.name=s.createUniqueName(i.name)),bi(r,i),i.extensions&&ir(t,r,i);let o=i.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)r.add(l[u]);let c=u=>{let d=new Map;for(let[h,f]of s.associations)(h instanceof rn||h instanceof It)&&d.set(h,f);return u.traverse(h=>{let f=s.associations.get(h);f!=null&&d.set(h,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];ms[r.path]===ms.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(ms[r.path]){case ms.weights:c=pi;break;case ms.rotation:c=fi;break;case ms.translation:case ms.scale:c=mi;break;default:switch(i.itemSize){case 1:c=pi;break;case 2:case 3:default:c=mi;break}break}let u=s.interpolation!==void 0?KE[s.interpolation]:Bs,d=this._getArrayFromAccessor(i);for(let h=0,f=l.length;h<f;h++){let y=new c(l[h]+"."+ms[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),o.push(y)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=up(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let s=this instanceof fi?lp:au;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function iM(n,e,t){let i=e.attributes,s=new Rn;if(i.POSITION!==void 0){let a=t.json.accessors[i.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),a.normalized){let u=up(ao[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new P,l=new P;for(let c=0,u=r.length;c<u;c++){let d=r[c];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,y=h.max;if(f!==void 0&&y!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(y[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(y[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(y[2]))),h.normalized){let v=up(ao[h.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;let o=new gn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function wy(n,e,t){let i=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){n.setAttribute(a,l)})}for(let o in i){let a=cp[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(e.indices!==void 0&&!n.index){let o=t.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});s.push(o)}return Ke.workingColorSpace!==Ht&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),bi(n,e),iM(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?ZE(n,e.targets,t):n})}var My={type:"change"},pp={type:"start"},Ay={type:"end"},lu=new di,Ty=new $n,sM=Math.cos(70*Ea.DEG2RAD),Nt=new P,xn=2*Math.PI,at={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},hp=1e-6,cu=class extends ya{constructor(e,t=null){super(e,t),this.state=at.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hs.ROTATE,MIDDLE:hs.DOLLY,RIGHT:hs.PAN},this.touches={ONE:ps.ROTATE,TWO:ps.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Bt,this._lastTargetPosition=new P,this._quat=new Bt().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yr,this._sphericalDelta=new Yr,this._scale=1,this._panOffset=new P,this._rotateStart=new Ce,this._rotateEnd=new Ce,this._rotateDelta=new Ce,this._panStart=new Ce,this._panEnd=new Ce,this._panDelta=new Ce,this._dollyStart=new Ce,this._dollyEnd=new Ce,this._dollyDelta=new Ce,this._dollyDirection=new P,this._mouse=new Ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=oM.bind(this),this._onPointerDown=rM.bind(this),this._onPointerUp=aM.bind(this),this._onContextMenu=fM.bind(this),this._onMouseWheel=uM.bind(this),this._onKeyDown=dM.bind(this),this._onTouchStart=hM.bind(this),this._onTouchMove=pM.bind(this),this._onMouseDown=lM.bind(this),this._onMouseMove=cM.bind(this),this._interceptControlDown=mM.bind(this),this._interceptControlUp=gM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(My),this.update(),this.state=at.NONE}update(e=null){let t=this.object.position;Nt.copy(t).sub(this.target),Nt.applyQuaternion(this._quat),this._spherical.setFromVector3(Nt),this.autoRotate&&this.state===at.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=xn:i>Math.PI&&(i-=xn),s<-Math.PI?s+=xn:s>Math.PI&&(s-=xn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Nt.setFromSpherical(this._spherical),Nt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Nt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Nt.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Nt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(lu.origin.copy(this.object.position),lu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(lu.direction))<sM?this.object.lookAt(this.target):(Ty.setFromNormalAndCoplanarPoint(this.object.up,this.target),lu.intersectPlane(Ty,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>hp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>hp||this._lastTargetPosition.distanceToSquared(this.target)>hp?(this.dispatchEvent(My),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?xn/60*this.autoRotateSpeed*e:xn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Nt.setFromMatrixColumn(t,0),Nt.multiplyScalar(-e),this._panOffset.add(Nt)}_panUp(e,t){this.screenSpacePanning===!0?Nt.setFromMatrixColumn(t,1):(Nt.setFromMatrixColumn(t,0),Nt.crossVectors(this.object.up,Nt)),Nt.multiplyScalar(e),this._panOffset.add(Nt)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Nt.copy(s).sub(this.target);let r=Nt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ce,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function rM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function oM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function aM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ay),this.state=at.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function lM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=at.DOLLY;break;case hs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=at.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=at.ROTATE}break;case hs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=at.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=at.PAN}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(pp)}function cM(n){switch(this.state){case at.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case at.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case at.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function uM(n){this.enabled===!1||this.enableZoom===!1||this.state!==at.NONE||(n.preventDefault(),this.dispatchEvent(pp),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Ay))}function dM(n){this.enabled!==!1&&this._handleKeyDown(n)}function hM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ps.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=at.TOUCH_ROTATE;break;case ps.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=at.TOUCH_PAN;break;default:this.state=at.NONE}break;case 2:switch(this.touches.TWO){case ps.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=at.TOUCH_DOLLY_PAN;break;case ps.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=at.TOUCH_DOLLY_ROTATE;break;default:this.state=at.NONE}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(pp)}function pM(n){switch(this._trackPointer(n),this.state){case at.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case at.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case at.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case at.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=at.NONE}}function fM(n){this.enabled!==!1&&n.preventDefault()}function mM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function gM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var uu=class extends $s{constructor(){super();let e=new cs;e.deleteAttribute("uv");let t=new hi({side:Gt}),i=new hi,s=new js(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new st(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new zs(e,i,6),a=new ht;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new st(e,lo(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new st(e,lo(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new st(e,lo(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new st(e,lo(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new st(e,lo(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let f=new st(e,lo(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function lo(n){return new aa({color:0,emissive:16777215,emissiveIntensity:n})}async function Cy({selectLevel:n,notify:e,reducedMotion:t}){let i=document.querySelector("#worldCanvas"),s=document.querySelector("#worldWrap"),r=document.querySelector("#worldLoading"),o;try{o=new su({canvas:i,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return r.hidden=!0,i.hidden=!0,document.body.classList.add("flat-view"),document.querySelector("#worldHint").textContent="Illustrated view. All levels work below.",{focus(){},update(){},pause(){},overview(){},flat(){},dispose(){}}}o.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<800?1.4:1.7)),o.outputColorSpace=_t,o.toneMapping=fc,o.toneMappingExposure=.95;let a=new $s,l=new ro(o),c=new uu,u=l.fromScene(c,.04);a.environment=u.texture,c.dispose(),l.dispose();let d=new Mt(37,1,.1,150),h=new P(1.7,.4,1.8),f=new P(13,18,21);d.position.copy(h).add(f);let y=new cu(d,i);y.target.copy(h),y.enableDamping=!t,y.dampingFactor=.065,y.minDistance=10,y.maxDistance=62,y.minPolarAngle=.35,y.maxPolarAngle=1.18,y.enablePan=!1,y.rotateSpeed=.45,y.zoomSpeed=.7,a.add(new da(14020324,2507844,1.5));let v=new ds(16768432,2.5);v.position.set(4,12,-8),a.add(v);let g=new ds(10216389,1.3);g.position.set(-8,8,5),a.add(g);let m=document.createElement("canvas");m.width=m.height=64;let M=m.getContext("2d"),E=M.createRadialGradient(32,32,3,32,32,32);E.addColorStop(0,"rgba(0,0,0,0.65)"),E.addColorStop(1,"rgba(0,0,0,0)"),M.fillStyle=E,M.fillRect(0,0,64,64);let S=new na(m);for(let U of wt){let Z=new st(new Gs(6,6),new on({map:S,transparent:!0,depthWrite:!1}));Z.rotation.x=-Math.PI/2,Z.position.set(U.position[0],-1.2,U.position[2]),a.add(Z)}let C=new st(new oa(2.05,2.1,80),new on({color:10804932,side:bn,transparent:!0,opacity:.8}));C.rotation.x=-Math.PI/2,C.position.set(...wt[0].position),C.position.y+=.1,a.add(C);let A=wt.map((U,Z)=>{let he=document.createElement("span");return he.className="world-marker",he.textContent=String(Z+1).padStart(2,"0"),document.querySelector("#worldMarkers").append(he),he}),I=wt.map((U,Z)=>{let he=new st(new ra(1.95,1.95,3.7,16),new on({visible:!1}));return he.position.set(...U.position),he.position.y+=1.5,he.userData.level=Z,a.add(he),he}),D,w,_,L=0,F=t,H=!1,W,Y=!1,q=0,se=0,z=!0,ae=!1,de=new P,xe=new ga,Ue=new Ce,tt=()=>{let{width:U,height:Z}=s.getBoundingClientRect();!U||!Z||(o.setSize(U,Z,!1),d.aspect=U/Z,d.updateProjectionMatrix(),z=!0)},lt=new ResizeObserver(tt);lt.observe(s),tt(),y.addEventListener("start",()=>{_=null}),y.addEventListener("change",()=>{z=!0}),i.addEventListener("pointerdown",U=>{W=[U.clientX,U.clientY],Y=!1}),i.addEventListener("pointermove",U=>{W&&Math.hypot(U.clientX-W[0],U.clientY-W[1])>6&&(Y=!0);let Z=i.getBoundingClientRect();Ue.set((U.clientX-Z.left)/Z.width*2-1,-(U.clientY-Z.top)/Z.height*2+1),xe.setFromCamera(Ue,d),i.style.cursor=xe.intersectObjects(I)[0]?"pointer":"grab"}),i.addEventListener("pointerup",U=>{if(!W||Y){W=null;return}let Z=i.getBoundingClientRect();Ue.set((U.clientX-Z.left)/Z.width*2-1,-(U.clientY-Z.top)/Z.height*2+1),xe.setFromCamera(Ue,d);let he=xe.intersectObjects(I)[0];he&&n(he.object.userData.level),W=null}),i.addEventListener("keydown",U=>{let Z=d.position.clone().sub(y.target);if(["ArrowLeft","ArrowRight"].includes(U.key))Z.applyAxisAngle(new P(0,1,0),U.key==="ArrowLeft"?-.13:.13);else if(["+","=","ArrowUp"].includes(U.key))Z.multiplyScalar(.9);else if(["-","ArrowDown"].includes(U.key))Z.multiplyScalar(1.1);else return;U.preventDefault(),_=null,Z.clampLength(10,62),d.position.copy(y.target).add(Z),y.update()}),i.addEventListener("webglcontextlost",U=>{U.preventDefault(),s.classList.remove("world-ready"),r.hidden=!0,H=!0,o.setAnimationLoop(null),e("The 3D view paused. Your checkpoint forms and progress are still available.")});function Je(U,Z){if(z=!0,F){y.target.copy(U),d.position.copy(U).add(Z),y.update();return}_={from:y.target.clone(),to:U,fromCamera:d.position.clone(),toCamera:U.clone().add(Z),start:performance.now()}}function K(U){if(ae||F&&!z&&!_||U-se<1e3/(F?15:30))return;se=U;let Z=Math.min((U-q)/1e3||0,.05);if(q=U,!(document.hidden||H)){if(!F&&w&&w.update(Z),_){let he=Math.min((U-_.start)/1150,1),me=he*he*(3-2*he);y.target.lerpVectors(_.from,_.to,me),d.position.lerpVectors(_.fromCamera,_.toCamera,me),he===1&&(_=null)}F||(C.material.opacity=.7+Math.sin(U/750)*.18),y.update(),wt.forEach((he,me)=>{de.set(...he.position).add(new P(0,.2,1.6)).project(d),A[me].style.left=`${(de.x/2+.5)*i.clientWidth}px`,A[me].style.top=`${(-de.y/2+.5)*i.clientHeight}px`,A[me].hidden=de.z>1}),o.render(a,d),z=!1}}o.setAnimationLoop(K);try{let U=await new ou().loadAsync("/journey/assets/apex-world.glb");D=U.scene,z=!0,a.add(D),w=new ma(D),U.animations.forEach(Z=>w.clipAction(Z).play()),s.classList.add("world-ready"),s.dataset.meshes=String(U.scene.getObjectsByProperty("isMesh",!0).length),r.hidden=!0}catch{r.hidden=!0,i.hidden=!0,A.forEach(U=>U.hidden=!0),H=!0,e("Using the illustrated map while the 3D asset is unavailable. All levels still work.")}return{focus(U,Z=!1){L=U,C.position.set(...wt[U].position).y+=.12,A.forEach((me,Xe)=>{me.dataset.active=String(Xe===U)});let he=new P(...wt[U].position);Je(Z?he.add(new P(1,1,0)):h.clone(),Z?f.clone().multiplyScalar(.53):f.clone())},update(U){z=!0,A.forEach((Z,he)=>{Z.dataset.locked=String(U?.[he]?.status==="locked"),Z.dataset.active=String(he===L)})},pause(U){F=U,z=!0,y.enableDamping=!U,_&&(y.target.copy(_.to),d.position.copy(_.toCamera),_=null)},overview(){Je(h.clone(),f.clone())},flat(U){H=U,z=!0,s.classList.toggle("world-ready",!U&&!!D),i.hidden=U},dispose(){ae=!0,lt.disconnect(),y.dispose(),o.setAnimationLoop(null),a.traverse(U=>{if(U.geometry?.dispose(),U.material)for(let Z of[U.material].flat())Z.dispose()}),u.dispose(),o.dispose()}}}var Ry=`<div id="workspacePanels"><section id="authPanel" class="authPanel studio-surface" aria-label="Apex Analytic account" hidden="" data-surface="account">
          <header class="authHeader">
            <span><small>PRIVATE SESSION</small><b id="authTitle">SIGN IN</b></span>
            <button id="authClose" type="button" aria-label="Close account panel" data-studio-close="true">CLOSE</button>
          </header>

          <form id="authForm" class="authForm" autocomplete="on">
            <label id="authNameField" hidden="">Name<input id="authName" name="name" autocomplete="name" maxlength="60"></label>
            <label>Email<input id="authEmail" name="email" type="email" autocomplete="email" maxlength="254" required=""></label>
            <label>Password<input id="authPassword" name="password" type="password" autocomplete="current-password" minlength="10" maxlength="128" required=""></label>
            <div class="authActions">
              <button id="authSubmit" class="authPrimary" type="submit">SIGN IN</button>
              <button id="authModeToggle" type="button">CREATE ACCOUNT</button>
              <button id="authRecoveryToggle" type="button">RESET PASSWORD</button>
            </div>
            <p id="authMessage" class="authMessage" role="status"></p>
          </form>

          <form id="authRecovery" class="authForm authRecovery" hidden="">
            <label>Email<input id="recoveryEmail" type="email" autocomplete="email" maxlength="254"></label>
            <button id="recoveryRequest" class="authPrimary" type="button">SEND RESET CODE</button>
            <label>Reset code<input id="recoveryToken" autocomplete="one-time-code"></label>
            <label>New password<input id="recoveryPassword" type="password" autocomplete="new-password" minlength="10" maxlength="128"></label>
            <div class="authActions">
              <button id="recoverySubmit" class="authPrimary" type="submit">SET PASSWORD</button>
              <button id="recoveryCancel" type="button">BACK</button>
            </div>
            <p id="recoveryMessage" class="authMessage" role="status"></p>
          </form>

          <div id="authUser" class="authUser" hidden="">
            <span><small>SIGNED IN AS</small><b id="authUserName"></b><em id="authUserEmail"></em><i id="authVerificationState">UNVERIFIED</i></span>
            <div class="authUserActions">
              <input id="verificationToken" aria-label="Email verification code" placeholder="Verification code" autocomplete="one-time-code">
              <button id="verificationRequest" type="button">SEND CODE</button>
              <button id="verificationSubmit" type="button">VERIFY</button>
              <button id="logoutButton" type="button">SIGN OUT</button>
            </div>
          </div>

          <section id="billingSummary" class="billingSummary" hidden="">
            <span><small>CURRENT PLAN</small><b id="billingPlanName">FREE</b><em id="billingUsage">3 reports remaining</em></span>
            <div id="billingActions" class="billingActions"></div>
          </section>
          <p id="billingGuardrail" class="billingGuardrail" hidden="">Plan changes report access only. It never changes scores, hard stops, or recommendations.</p>
          <div class="accountLibraryActions">
            <button id="memoryToggle" type="button" aria-expanded="false" aria-controls="memoryPanel" hidden="">MEMORY</button>
            <button id="reportsToggle" type="button" aria-expanded="false" aria-controls="reportsPanel" hidden="">REPORTS</button>
            <button id="journalToggle" type="button" aria-expanded="false" aria-controls="journalPanel" hidden="">JOURNAL</button>
            <button id="ownerIntelToggle" type="button" aria-expanded="false" aria-controls="ownerIntelPanel">OWNER TOOLS</button>
            <button id="ownerMarketToggle" type="button" aria-expanded="false" aria-controls="ownerMarketPanel" hidden="">MARKET</button>
            <button id="ownerCaseToggle" type="button" aria-expanded="false" aria-controls="ownerCasePanel" hidden="">CASES</button>
            <button id="ownerEvidenceToggle" type="button" aria-expanded="false" aria-controls="ownerEvidencePanel" hidden="">EVIDENCE</button>
            <button id="trustToggle" type="button" aria-expanded="false" aria-controls="trustPanel">TRUST</button>
          </div>
        </section><section id="trustPanel" class="trustPanel studio-surface" aria-label="Apex trust and decision boundaries" hidden="" data-surface="trust">
          <header class="trustHeader">
            <span><small>V6.0 TRUST BOUNDARY</small><b>WHAT APEX CAN AND CANNOT DO</b></span>
            <button id="trustClose" type="button" aria-label="Close trust boundary" data-studio-close="true">CLOSE</button>
          </header>
          <p class="trustIntro">Apex structures property decisions. It does not replace a valuer, lawyer, banker, tax adviser, or licensed financial planner.</p>
          <div class="trustGrid">
            <article>
              <small>USES</small>
              <b>Decision support</b>
              <p>Compare property quality, buyer depth, rentability, evidence quality, financing stress, and exit risk.</p>
            </article>
            <article>
              <small>BOUNDARY</small>
              <b>No unsafe financing validation</b>
              <p>Apex can flag financing risk, but will not validate false documents, hidden cashback, misleading prices, or lender deception.</p>
            </article>
            <article>
              <small>STRONG ANSWER NEEDS</small>
              <b>Live proof</b>
              <p>Completed transactions, achieved rent, financing precheck, title/legal review, site visit, and nearby supply evidence.</p>
            </article>
            <article>
              <small>KNOWLEDGE CONTROL</small>
              <b>Owner-led framework</b>
              <p>Normal users can submit chat and card context only. They cannot change the shared Apex knowledge base.</p>
            </article>
          </div>
          <div id="trustAcceptance" class="trustAcceptance" data-state="pending">
            <span>
              <small>FORMAL DEAL REPORTS</small>
              <b id="trustAcceptanceTitle">Acknowledgement required</b>
              <em id="trustAcceptanceDetail">You can chat freely. Deal reports require this boundary to be accepted first.</em>
            </span>
            <button id="trustAccept" type="button">I UNDERSTAND</button>
          </div>
        </section><section id="memoryPanel" class="memoryPanel studio-surface" aria-label="Long-term memory" hidden="" data-surface="memory">
          <header class="memoryHeader">
            <span><small>PRIVATE TO YOUR ACCOUNT</small><b>LONG-TERM MEMORY</b></span>
            <button id="memoryClose" type="button" aria-label="Close memory panel" data-studio-close="true">CLOSE</button>
          </header>
          <p class="memoryIntro">Only memories you approve can influence future conversations and be sent as context to the configured AI provider. They never change the shared Apex knowledge base.</p>
          <div class="memorySettings" aria-label="Memory controls">
            <label>
              <input id="memoryCaptureEnabled" type="checkbox">
              <span><b>Capture suggestions</b><small>Off by default. Apex will not suggest memories from chat unless enabled.</small></span>
            </label>
            <label>
              <input id="memoryReasoningEnabled" type="checkbox">
              <span><b>Use approved memory</b><small>Off by default. Approved memories affect replies and reports only when enabled.</small></span>
            </label>
          </div>
          <p id="memoryModeNotice" class="memoryModeNotice">Memory engine ready. Collection is off.</p>
          <section id="memoryProfile" class="memoryProfile" aria-label="Investor memory profile">
            <header><small>INVESTOR PROFILE</small><b id="memoryProfileTitle">No approved memory yet</b><em id="memoryProfileCompleteness">0%</em></header>
            <p id="memoryProfileSummary">Approve memories to build a private investor profile.</p>
            <div id="memoryProfileDetails" class="memoryProfileDetails"></div>
          </section>
          <div class="memorySummary" aria-label="Memory summary">
            <span><b id="memoryApprovedCount">0</b> APPROVED</span>
            <span><b id="memoryPendingCount">0</b> TO REVIEW</span>
          </div>
          <form id="memoryForm" class="memoryForm" autocomplete="off">
            <label class="srOnly" for="memoryInput">Add a long-term memory</label>
            <input id="memoryInput" maxlength="500" placeholder="Add a preference, goal, constraint, or lesson...">
            <button type="submit">ADD</button>
          </form>
          <div id="memoryList" class="memoryList"></div>
        </section><section id="sessionPanel" class="memoryPanel sessionPanel studio-surface" aria-label="Conversation history" hidden="" data-surface="history">
          <header class="memoryHeader">
            <span><small>YOUR RECENT THREADS</small><b>CONVERSATION HISTORY</b></span>
            <button id="sessionClose" type="button" aria-label="Close conversation history" data-studio-close="true">CLOSE</button>
          </header>
          <p class="memoryIntro">Open a previous thread or remove one you no longer need.</p>
          <button id="sessionNew" class="historyNewButton" type="button">START NEW CHAT</button>
          <div id="sessionList" class="memoryList sessionList"></div>
        </section><section id="reportsPanel" class="reportsPanel studio-surface" aria-label="Private deal reports" hidden="" data-surface="reports">
          <header class="reportsHeader">
            <span><small>PRIVATE TO YOUR ACCOUNT</small><b>DEAL REPORTS</b></span>
            <button id="reportsClose" type="button" aria-label="Close deal reports" data-studio-close="true">CLOSE</button>
          </header>
          <div class="reportsSummary">
            <span><b id="reportsSavedCount">0</b> SAVED</span>
            <span id="reportsUsageLabel">FREE PLAN</span>
          </div>
          <div id="reportsList" class="reportsList"></div>
          <section id="savedReportView" hidden aria-label="Saved assessment"></section>
        </section><section id="journalPanel" class="journalPanel studio-surface" aria-label="Private decision journal" hidden="" data-surface="journal">
          <header class="journalHeader">
            <span><small>PRIVATE DECISION AUDIT</small><b>DECISION JOURNAL</b></span>
            <button id="journalClose" type="button" aria-label="Close decision journal" data-studio-close="true">CLOSE</button>
          </header>
          <p class="journalIntro">Locked entries stay private to your account. Relevant entries may be used as context by the configured AI provider.</p>
          <div id="journalSummary" class="journalSummary">
            <span><b id="journalTotalCount">0</b> DECISIONS</span>
            <span><b id="journalReviewedCount">0</b> REVIEWED</span>
          </div>
          <div id="journalList" class="journalList"></div>

          <form id="journalEditor" class="journalEditor" hidden="">
            <header>
              <span><small>DECISION RECORD</small><b id="journalSubject">PROPERTY</b></span>
              <button id="journalBack" type="button">BACK</button>
            </header>
            <input id="journalDecisionId" type="hidden">
            <div class="journalGrid">
              <label>Decision
                <select id="journalDecision">
                  <option value="investigate">Investigate</option>
                  <option value="proceed">Proceed</option>
                  <option value="pause">Pause</option>
                  <option value="reject">Reject</option>
                </select>
              </label>
              <label>Confidence<input id="journalConfidence" type="number" min="0" max="100" inputmode="numeric"></label>
              <label>Planned Holding<input id="journalHoldingPeriod" placeholder="Years"></label>
              <label class="journalWide">Thesis<textarea id="journalThesis" placeholder="Why should this decision work?"></textarea></label>
              <label class="journalWide">Counter-Thesis<textarea id="journalCounterThesis" placeholder="What is the strongest reason this may fail?"></textarea></label>
              <label class="journalWide">Kill Criterion<textarea id="journalKillCriterion" placeholder="What evidence means stop or exit?"></textarea></label>
              <label class="journalWide">Notes<textarea id="journalNotes" placeholder="Assumptions to preserve before the outcome"></textarea></label>
            </div>
            <div id="journalDraftActions" class="journalEditorActions">
              <button id="journalSaveDraft" type="button">SAVE DRAFT</button>
              <button id="journalLock" class="journalPrimary" type="button">LOCK THESIS</button>
              <button id="journalDelete" type="button">DELETE DRAFT</button>
            </div>
            <p id="journalLockNotice" class="journalLockNotice" hidden="">Thesis locked. The original decision can no longer be rewritten.</p>

            <fieldset id="journalOutcome" class="journalOutcome" hidden="">
              <legend>OUTCOME REVIEW</legend>
              <div class="journalGrid">
                <label>Status
                  <select id="journalOutcomeStatus">
                    <option value="holding">Holding</option>
                    <option value="sold">Sold</option>
                    <option value="abandoned">Abandoned</option>
                  </select>
                </label>
                <label>Actual Rent<input id="journalActualRent" placeholder="RM/month"></label>
                <label>Current / Exit Value<input id="journalCurrentValue" placeholder="RM"></label>
                <label>Process Score<input id="journalProcessScore" type="number" min="0" max="100" inputmode="numeric"></label>
                <label>Execution Score<input id="journalExecutionScore" type="number" min="0" max="100" inputmode="numeric"></label>
                <label>Outcome Score<input id="journalOutcomeScore" type="number" min="0" max="100" inputmode="numeric"></label>
                <label>Luck Score<input id="journalLuckScore" type="number" min="0" max="100" inputmode="numeric"></label>
                <label class="journalWide">What Happened<textarea id="journalResult" placeholder="Compare the outcome with the original thesis"></textarea></label>
                <label class="journalWide">Lesson<textarea id="journalLesson" placeholder="What should Apex remember for the next decision?"></textarea></label>
              </div>
              <button id="journalSaveReview" class="journalPrimary" type="button">SAVE OUTCOME REVIEW</button>
            </fieldset>
            <p id="journalMessage" class="journalMessage" role="status"></p>
          </form>
        </section><section id="ownerIntelPanel" class="ownerIntelPanel studio-surface" aria-label="Owner intelligence command center" hidden="" data-surface="owner">
          <header class="ownerIntelHeader">
            <span><small>OWNER COMMAND CENTER</small><b>OWNER INTELLIGENCE CONSOLE</b></span>
            <button id="ownerIntelClose" type="button" aria-label="Close owner intelligence console" data-studio-close="true">CLOSE</button>
          </header>
          <p class="ownerIntelIntro">One coverage view for your proprietary moat: project registry, founder case opinions, dated market signals, and evidence vault proof. Use it to decide what Apex still needs from you.</p>
          <form id="ownerIntelAccess" class="ownerIntelAccess" autocomplete="off">
            <label>Owner Token<input id="ownerIntelToken" type="password" placeholder="Uses the same owner token as Market / Cases / Evidence" autocomplete="off"></label>
            <button id="ownerIntelSaveToken" type="submit">LOAD</button>
            <button id="ownerIntelClearToken" type="button">CLEAR</button>
          </form>
          <div id="ownerIntelSummary" class="ownerIntelSummary" aria-live="polite">
            <span><b>0</b> PROJECTS</span>
            <span><b>0</b> CASES</span>
            <span><b>0</b> OBSERVATIONS</span>
            <span><b>0</b> DOCUMENTS</span>
          </div>
          <details class="studio-disclosure"><summary>Service health and deployment checks</summary><div id="ownerIntelOpsDashboard" class="ownerIntelOps" aria-live="polite">
            <article class="warning"><small>PRODUCTION OPS</small><b>Token required</b><p>Load the owner console to check storage, AI, billing, backup, and launch readiness.</p></article>
          </div></details>
          <div id="ownerIntelControls" class="ownerIntelControls" aria-label="Owner intelligence filters and export">
            <button type="button" data-owner-intel-filter="all" aria-pressed="true">ALL</button>
            <button type="button" data-owner-intel-filter="missing">MISSING</button>
            <button type="button" data-owner-intel-filter="stale">STALE</button>
            <button type="button" data-owner-intel-filter="partial">PARTIAL</button>
            <button type="button" data-owner-intel-filter="ready">READY</button>
            <button id="ownerIntelOpsRefresh" type="button">OPS CHECK</button>
            <button id="ownerIntelCopyBrief" type="button">COPY BRIEF</button>
            <button id="ownerIntelExport" type="button">EXPORT BACKUP</button>
            <button id="ownerIntelImport" type="button">RESTORE BACKUP</button>
            <button id="ownerIntelRestoreHistory" type="button">RESTORE LOG</button>
            <button id="ownerIntelBackupReminder" type="button">REMINDER</button>
            <input id="ownerIntelImportFile" type="file" accept="application/json" hidden="">
            <input id="ownerIntelRestorePhrase" type="text" placeholder="Type RESTORE OWNER KNOWLEDGE" autocomplete="off" hidden="">
            <button id="ownerIntelRestoreConfirm" type="button" hidden="">CONFIRM RESTORE</button>
          </div>
          <div id="ownerIntelRestoreLog" class="ownerIntelRestoreLog" hidden=""></div>
          <div id="ownerIntelLanes" class="ownerIntelLanes"></div>
          <div class="ownerIntelWorkspace">
            <section class="ownerIntelCoverageWrap">
              <header><span><small>COVERAGE DASHBOARD</small><b>Project-level readiness</b></span><button type="button" data-owner-intel-action="refresh">REFRESH</button></header>
              <div id="ownerIntelCoverage" class="ownerIntelCoverage"></div>
            </section>
            <section class="ownerIntelNext">
              <header><small>NEXT INPUT</small><b id="ownerIntelNextTitle">Load owner intelligence</b></header>
              <p id="ownerIntelNextDetail">Paste your owner token to see which projects need case opinions, fresh observations, or evidence proof.</p>
              <div id="ownerIntelActions" class="ownerIntelActions">
                <button type="button" data-owner-intel-action="market">PROJECTS</button>
                <button type="button" data-owner-intel-action="cases">CASES</button>
                <button type="button" data-owner-intel-action="evidence">EVIDENCE</button>
              </div>
            </section>
          </div>
          <details id="ownerResearchPanel" class="ownerResearchPanel">
            <summary>VERIFIED MARKET RESEARCH <span id="ownerResearchSummary">0 studies</span></summary>
            <p>Import only a JSON bundle exported by the bundled research skill after strict validation and all four human approvals. This evidence can challenge a decision, but it cannot edit the founder framework or override hard stops.</p>
            <div class="ownerResearchActions">
              <button id="ownerResearchRefresh" type="button">REFRESH</button>
              <button id="ownerResearchImport" type="button">IMPORT JSON</button>
              <button id="ownerResearchReplace" type="button" hidden="">REPLACE STUDY</button>
              <input id="ownerResearchFile" type="file" accept="application/json,.json" hidden="">
            </div>
            <div id="ownerResearchList" class="ownerResearchList">
              <p class="ownerIntelEmpty">Load the owner console to view validated research studies.</p>
            </div>
            <p id="ownerResearchMessage" class="ownerIntelMessage" role="status"></p>
          </details>
          <details class="ownerAdminPanel">
            <summary>USER / PLAN CONTROL</summary>
            <div class="ownerAdminToolbar">
              <button id="ownerAdminLoad" type="button">LOAD USERS</button>
              <span id="ownerAdminSummary">Owner token required</span>
            </div>
            <div id="ownerAdminList" class="ownerAdminList"></div>
          </details>
          <p id="ownerIntelMessage" class="ownerIntelMessage" role="status"></p>
        </section><section id="ownerCasePanel" class="ownerCasePanel studio-surface" aria-label="Owner development case library" hidden="" data-surface="cases">
          <header class="ownerCaseHeader">
            <span><small>OWNER-CONTROLLED OPINION</small><b>DEVELOPMENT CASE LIBRARY</b></span>
            <button id="ownerCaseClose" type="button" aria-label="Close development case library" data-studio-close="true">CLOSE</button>
          </header>
          <p class="ownerCaseIntro">Record your project-by-project judgment here. Public users can benefit from matched case intelligence in answers and reports, but only the owner token can create or delete cases.</p>
          <form id="ownerCaseAccess" class="ownerCaseAccess" autocomplete="off">
            <label>Owner Token<input id="ownerCaseToken" type="password" placeholder="Uses the same owner token as Market" autocomplete="off"></label>
            <button id="ownerCaseSaveToken" type="submit">SAVE</button>
            <button id="ownerCaseClearToken" type="button">CLEAR</button>
          </form>
          <div id="ownerCaseSummary" class="ownerCaseSummary" aria-live="polite">
            <span><b>0</b> CASES</span>
            <span><b>0</b> SHORTLIST</span>
            <span>OWNER TOKEN REQUIRED</span>
          </div>

          <div class="ownerCaseWorkspace">
            <form id="ownerCaseForm" class="ownerCaseForm" autocomplete="off">
              <header><small>CASE NOTE</small><b id="ownerCaseFormTitle">Add Development Opinion</b></header>
              <div class="ownerCaseGrid">
                <label>Linked Project
                  <select id="ownerCaseProject">
                    <option value="">No linked market project</option>
                  </select>
                </label>
                <label>Project Name<input id="ownerCaseProjectName" required="" maxlength="160" placeholder="Queens Waterfront"></label>
                <label>Area<input id="ownerCaseArea" maxlength="120" placeholder="Bayan Lepas"></label>
                <label>State<input id="ownerCaseState" maxlength="80" placeholder="Penang"></label>
                <label>Type<input id="ownerCaseType" maxlength="80" placeholder="Condo / serviced residence"></label>
                <label>Developer<input id="ownerCaseDeveloper" maxlength="120" placeholder="Developer name"></label>
                <label>Price Segment<input id="ownerCasePriceSegment" maxlength="120" placeholder="RM400k-RM550k mass affluent"></label>
                <label>Verdict
                  <select id="ownerCaseVerdict">
                    <option value="shortlist">Shortlist</option>
                    <option value="strong_buy">Strong buy</option>
                    <option value="watch">Watch</option>
                    <option value="avoid">Avoid</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </label>
                <label>Confidence
                  <select id="ownerCaseConfidence">
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </label>
                <label>Rating<input id="ownerCaseRating" type="number" min="0" max="100" inputmode="numeric" placeholder="75"></label>
                <label>Observed Date<input id="ownerCaseObservedAt" type="date"></label>
                <label>Tags<input id="ownerCaseTags" maxlength="300" placeholder="Penang, family, rental, freehold"></label>
                <label class="ownerCaseWide">Target Buyer<textarea id="ownerCaseTargetBuyer" maxlength="700" placeholder="Who will emotionally buy this later?"></textarea></label>
                <label class="ownerCaseWide">Target Tenant<textarea id="ownerCaseTargetTenant" maxlength="700" placeholder="Who is likely to rent this?"></textarea></label>
                <label class="ownerCaseWide">Strengths<textarea id="ownerCaseStrengths" maxlength="1200" placeholder="Layout, view, location, scarcity, own-stay emotion..."></textarea></label>
                <label class="ownerCaseWide">Weaknesses<textarea id="ownerCaseWeaknesses" maxlength="1200" placeholder="Density, supply, accessibility, layout issue, pricing risk..."></textarea></label>
                <label class="ownerCaseWide">Management / JMB<textarea id="ownerCaseManagement" maxlength="900" placeholder="Management attitude, arrears, upkeep, common area condition..."></textarea></label>
                <label class="ownerCaseWide">Resident Profile<textarea id="ownerCaseResident" maxlength="900" placeholder="Owner-stay, tenants, families, students, short-stay risk..."></textarea></label>
                <label class="ownerCaseWide">Supply Threat<textarea id="ownerCaseSupply" maxlength="900" placeholder="Nearby substitutes, future VP pressure, pricing competition..."></textarea></label>
                <label class="ownerCaseWide">Rental Outlook<textarea id="ownerCaseRental" maxlength="900" placeholder="Tenant pool, rent level, vacancy speed, furnishing needs..."></textarea></label>
                <label class="ownerCaseWide">Resale Outlook<textarea id="ownerCaseResale" maxlength="900" placeholder="Exit buyer depth, owner-stay emotion, bankability, liquidity..."></textarea></label>
                <label class="ownerCaseWide">Founder Verdict<textarea id="ownerCaseOwnerVerdict" maxlength="1200" placeholder="Your final opinion on this development and what Apex should remember..."></textarea></label>
                <label class="ownerCaseWide">Source Basis<input id="ownerCaseSourceBasis" maxlength="500" placeholder="Site visit, agent feedback, Brickz, auction, management office..."></label>
              </div>
              <div class="ownerCaseFormActions">
                <button id="ownerCaseSubmit" class="ownerCasePrimary" type="submit">ADD CASE</button>
                <button id="ownerCaseCancelEdit" type="button" hidden="">CANCEL EDIT</button>
              </div>
            </form>

            <section class="ownerCaseListWrap">
              <header>
                <span><small>CASE LIBRARY</small><b id="ownerCaseMetrics">0 case notes</b></span>
                <button id="ownerCaseRefresh" type="button">REFRESH</button>
              </header>
              <div class="ownerCaseFilters">
                <input id="ownerCaseFilter" placeholder="Filter project or area...">
                <select id="ownerCaseVerdictFilter">
                  <option value="">All verdicts</option>
                  <option value="strong_buy">Strong buy</option>
                  <option value="shortlist">Shortlist</option>
                  <option value="watch">Watch</option>
                  <option value="avoid">Avoid</option>
                  <option value="unknown">Unknown</option>
                </select>
                <select id="ownerCaseCompletenessFilter">
                  <option value="">All completeness</option>
                  <option value="incomplete">Incomplete only</option>
                  <option value="complete">Complete only</option>
                </select>
              </div>
              <div id="ownerCaseList" class="ownerCaseList"></div>
            </section>
          </div>
          <p id="ownerCaseMessage" class="ownerCaseMessage" role="status"></p>
        </section><section id="ownerEvidencePanel" class="ownerEvidencePanel studio-surface" aria-label="Owner evidence vault" hidden="" data-surface="evidence">
          <header class="ownerEvidenceHeader">
            <span><small>OWNER-CONTROLLED PROOF</small><b>EVIDENCE VAULT</b></span>
            <button id="ownerEvidenceClose" type="button" aria-label="Close evidence vault" data-studio-close="true">CLOSE</button>
          </header>
          <p class="ownerEvidenceIntro">Store transaction notes, achieved-rent proof, financing/legal checks, site observations, and management evidence. V8 reports will show whether conclusions are backed by these documents.</p>
          <form id="ownerEvidenceAccess" class="ownerEvidenceAccess" autocomplete="off">
            <label>Owner Token<input id="ownerEvidenceToken" type="password" placeholder="Uses the same owner token as Market" autocomplete="off"></label>
            <button id="ownerEvidenceSaveToken" type="submit">SAVE</button>
            <button id="ownerEvidenceClearToken" type="button">CLEAR</button>
          </form>
          <div id="ownerEvidenceSummary" class="ownerEvidenceSummary" aria-live="polite">
            <span><b>0</b> DOCUMENTS</span>
            <span><b>0</b> INDEXED</span>
            <span>OWNER TOKEN REQUIRED</span>
          </div>

          <div class="ownerEvidenceWorkspace">
            <form id="ownerEvidenceForm" class="ownerEvidenceForm" autocomplete="off">
              <header><small>NEW EVIDENCE</small><b>Add A Proof File</b></header>
              <div class="ownerEvidenceGrid">
                <label>Title<input id="ownerEvidenceTitle" required="" maxlength="160" placeholder="Queens Waterfront achieved rent proof"></label>
                <label>Filename<input id="ownerEvidenceFilename" maxlength="160" placeholder="queens-waterfront-rent.md"></label>
                <label>Source URL<input id="ownerEvidenceSourceUrl" maxlength="500" placeholder="Optional link to source"></label>
                <label>Tags<input id="ownerEvidenceTags" maxlength="300" placeholder="Penang, rent, transaction, legal..."></label>
                <label class="ownerEvidenceWide">Evidence Text<textarea id="ownerEvidenceText" required="" maxlength="12000" placeholder="Paste the transaction, rental, financing, legal, site, or management evidence here..."></textarea></label>
              </div>
              <button class="ownerEvidencePrimary" type="submit">ADD EVIDENCE</button>
            </form>

            <section class="ownerEvidenceListWrap">
              <header>
                <span><small>DOCUMENTS</small><b id="ownerEvidenceMetrics">0 indexed chunks</b></span>
                <button id="ownerEvidenceRefresh" type="button">REFRESH</button>
              </header>
              <input id="ownerEvidenceFilter" class="ownerEvidenceFilter" placeholder="Filter evidence by project, tag, filename, or source...">
              <div id="ownerEvidenceList" class="ownerEvidenceList"></div>
            </section>
          </div>
          <p id="ownerEvidenceMessage" class="ownerEvidenceMessage" role="status"></p>
        </section><section id="ownerMarketPanel" class="ownerMarketPanel studio-surface" aria-label="Owner market intelligence console" hidden="" data-surface="market">
          <header class="ownerMarketHeader">
            <span><small>OWNER-CONTROLLED EVIDENCE</small><b>MARKET CONSOLE</b></span>
            <button id="ownerMarketClose" type="button" aria-label="Close market console" data-studio-close="true">CLOSE</button>
          </header>
          <p class="ownerMarketIntro">Add dated market observations here. Public users can benefit from matched evidence in answers and reports, but only the owner token can create or delete records.</p>
          <form id="ownerMarketAccess" class="ownerMarketAccess" autocomplete="off">
            <label>Owner Token<input id="ownerMarketToken" type="password" placeholder="Paste owner token once on this device" autocomplete="off"></label>
            <button id="ownerMarketSaveToken" type="submit">SAVE</button>
            <button id="ownerMarketClearToken" type="button">CLEAR</button>
          </form>
          <div id="ownerMarketSummary" class="ownerMarketSummary" aria-live="polite">
            <span><b>0</b> PROJECTS</span>
            <span><b>0</b> OBSERVATIONS</span>
            <span>OWNER TOKEN REQUIRED</span>
          </div>

          <div class="ownerMarketWorkspace">
            <form id="ownerProjectForm" class="ownerMarketForm" autocomplete="off">
              <header><small>PROJECT</small><b>Track A Market Subject</b></header>
              <div class="ownerMarketGrid">
                <label>Name<input id="ownerProjectName" required="" maxlength="160" placeholder="Evidence Residence"></label>
                <label>Area<input id="ownerProjectArea" maxlength="120" placeholder="Bayan Lepas"></label>
                <label>State<input id="ownerProjectState" maxlength="80" placeholder="Penang"></label>
                <label>Type<input id="ownerProjectType" maxlength="80" placeholder="Condo"></label>
                <label>Developer<input id="ownerProjectDeveloper" maxlength="160" placeholder="Developer name"></label>
                <label>Tenure<input id="ownerProjectTenure" maxlength="80" placeholder="Freehold / leasehold"></label>
                <label>Completion Year<input id="ownerProjectCompletionYear" inputmode="numeric" placeholder="2026"></label>
                <label>Status
                  <select id="ownerProjectStatus">
                    <option value="">Select</option>
                    <option value="planned">Planned</option>
                    <option value="launched">Launched</option>
                    <option value="under_construction">Under construction</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </label>
                <label class="ownerMarketWide">Aliases<input id="ownerProjectAliases" maxlength="300" placeholder="Comma separated alternate names"></label>
              </div>
              <button class="ownerMarketPrimary" type="submit">ADD PROJECT</button>
            </form>

            <form id="ownerObservationForm" class="ownerMarketForm" autocomplete="off">
              <header><small>OBSERVATION</small><b>Add Dated Market Evidence</b></header>
              <div class="ownerMarketGrid">
                <label>Linked Project
                  <select id="ownerObservationProject">
                    <option value="">Area-only observation</option>
                  </select>
                </label>
                <label>Metric
                  <select id="ownerObservationMetric" required="">
                    <option value="rent">Rent</option>
                    <option value="transaction">Transaction</option>
                    <option value="occupancy">Occupancy</option>
                    <option value="rental_enquiry">Rental enquiry</option>
                    <option value="supply">Supply</option>
                    <option value="auction">Auction</option>
                    <option value="unsold_stock">Unsold stock</option>
                    <option value="launch_sales">Launch sales</option>
                    <option value="management">Management</option>
                    <option value="catalyst">Catalyst</option>
                    <option value="financing">Financing</option>
                    <option value="buyer_sentiment">Buyer sentiment</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label>Area<input id="ownerObservationArea" maxlength="120" placeholder="Required if no linked project"></label>
                <label>Value<input id="ownerObservationValue" inputmode="decimal" placeholder="2800"></label>
                <label>Unit<input id="ownerObservationUnit" maxlength="40" placeholder="RM/month, %, units"></label>
                <label>Observed Date<input id="ownerObservationDate" type="date" required=""></label>
                <label>Source Type<input id="ownerObservationSourceType" maxlength="80" placeholder="rental agent, auction page..."></label>
                <label>Confidence
                  <select id="ownerObservationConfidence">
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </label>
                <label class="ownerMarketWide">Notes<textarea id="ownerObservationNotes" maxlength="1200" placeholder="What exactly did you observe?"></textarea></label>
              </div>
              <button class="ownerMarketPrimary" type="submit">ADD OBSERVATION</button>
            </form>
          </div>

          <details class="ownerMarketImport">
            <summary>BULK IMPORT PROJECTS / SIGNALS</summary>
            <form id="ownerMarketImportForm" autocomplete="off">
              <textarea id="ownerMarketImportText" maxlength="60000" placeholder="{&quot;projects&quot;:[{&quot;id&quot;:&quot;queens&quot;,&quot;name&quot;:&quot;Queens Waterfront&quot;,&quot;area&quot;:&quot;Bayan Lepas&quot;,&quot;state&quot;:&quot;Penang&quot;}],&quot;observations&quot;:[{&quot;projectId&quot;:&quot;queens&quot;,&quot;metricType&quot;:&quot;rent&quot;,&quot;value&quot;:2800,&quot;unit&quot;:&quot;RM/month&quot;,&quot;observedAt&quot;:&quot;2026-07-02&quot;,&quot;notes&quot;:&quot;Agent feedback on achieved rent.&quot;}]}"></textarea>
              <button type="submit">IMPORT JSON</button>
            </form>
          </details>

          <div class="ownerMarketFilters">
            <input id="ownerMarketAreaFilter" placeholder="Filter area...">
            <select id="ownerMarketMetricFilter">
              <option value="">All metrics</option>
              <option value="rent">Rent</option>
              <option value="transaction">Transaction</option>
              <option value="occupancy">Occupancy</option>
              <option value="rental_enquiry">Rental enquiry</option>
              <option value="supply">Supply</option>
              <option value="auction">Auction</option>
              <option value="unsold_stock">Unsold stock</option>
              <option value="launch_sales">Launch sales</option>
              <option value="management">Management</option>
              <option value="catalyst">Catalyst</option>
              <option value="financing">Financing</option>
              <option value="buyer_sentiment">Buyer sentiment</option>
              <option value="other">Other</option>
            </select>
            <select id="ownerMarketFreshnessFilter">
              <option value="">All freshness</option>
              <option value="fresh">Fresh</option>
              <option value="aging">Aging</option>
              <option value="stale">Stale</option>
            </select>
            <button id="ownerMarketRefresh" type="button">REFRESH</button>
          </div>
          <div class="ownerMarketLists">
            <section>
              <header><small>PROJECTS</small><b id="ownerProjectCount">0</b></header>
              <div id="ownerProjectList" class="ownerProjectList"></div>
            </section>
            <section>
              <header><small>OBSERVATIONS</small><b id="ownerObservationCount">0</b></header>
              <div id="ownerObservationList" class="ownerObservationList"></div>
            </section>
          </div>
          <p id="ownerMarketMessage" class="ownerMarketMessage" role="status"></p>
        </section><section id="shortlistPanel" class="shortlistPanel studio-surface" aria-label="Deal shortlist" hidden="" data-surface="shortlist">
          <header class="shortlistHeader">
            <span><small>PRIVATE TO THIS DEVICE</small><b>DEAL SHORTLIST</b></span>
            <button id="shortlistClose" type="button" aria-label="Close deal shortlist" data-studio-close="true">CLOSE</button>
          </header>
          <p class="shortlistIntro">Keep up to four analysed deals side by side. Compare the weak link, not just the headline score.</p>
          <div id="shortlistSummary" class="shortlistSummary" aria-live="polite"></div>
          <div id="shortlistList" class="shortlistList"></div>
          <button id="shortlistClear" class="shortlistClear" type="button">CLEAR SHORTLIST</button>
        </section><section id="valuationSurface" data-surface="valuation" hidden="" class="studio-surface"><header class="surface-heading"><div><small>VALUATION LAB</small><h2>What is the income worth?</h2><p>Test the price, assumptions and downside. This is not a bank valuation.</p></div></header><section id="dcfPanel" class="valuation-model">

                <p>Estimate an income-based value first. Apex only labels a result as indicative market value when rent, costs, rates, and at least three recent completed sales are supported.</p>
                <div class="dcfGrid">
                  <label>Year 1 Occupancy<input data-dcf-field="year1Occupancy" placeholder="92%" inputmode="decimal"></label>
                  <label>Stabilized Occupancy<input data-dcf-field="stabilizedOccupancy" placeholder="94%" inputmode="decimal"></label>
                  <label>Annual Rent Growth<input data-dcf-field="annualRentGrowth" placeholder="3%" inputmode="decimal"></label>
                  <label>Workbook Horizon
                    <select data-dcf-field="holdingPeriodYears" aria-label="DCF workbook horizon">
                      <option value="5">5 years</option>
                    </select>
                  </label>
                  <label>Discount Rate<input data-dcf-field="discountRate" placeholder="10%" inputmode="decimal"></label>
                  <label>Terminal Cap Rate<input data-dcf-field="terminalCapRate" placeholder="6%" inputmode="decimal"></label>
                  <label>Loan-to-Value<input data-dcf-field="loanToValue" placeholder="80%" inputmode="decimal"></label>
                  <label>Mortgage Rate<input data-dcf-field="mortgageInterestRate" placeholder="4.25%" inputmode="decimal"></label>
                  <label>Loan Term<input data-dcf-field="loanTermYears" placeholder="30 years" inputmode="numeric"></label>
                  <label>Other Monthly Income<input data-dcf-field="otherMonthlyIncome" placeholder="Parking / storage" inputmode="decimal"></label>
                  <label>Market Rent Evidence
                    <select data-dcf-field="marketRentEvidence">
                      <option value="">Select</option>
                      <option>Signed tenancy / achieved rent</option>
                      <option>Agent-confirmed achieved rent</option>
                      <option>Multiple verified rental checks</option>
                      <option>Asking-price listings only</option>
                      <option>Not verified</option>
                    </select>
                  </label>
                  <label>Operating Cost Evidence
                    <select data-dcf-field="operatingCostEvidence">
                      <option value="">Select</option>
                      <option>Current JMB / MC statement and AGM budget</option>
                      <option>Owner invoices / actual statements</option>
                      <option>Agent or seller estimate only</option>
                      <option>Not verified</option>
                    </select>
                  </label>
                  <label class="dcfWide">Discount Rate Basis<input data-dcf-field="discountRateBasis" placeholder="Required return and risk basis..."></label>
                  <label class="dcfWide">Terminal Cap Basis<input data-dcf-field="terminalCapRateBasis" placeholder="Exit-yield evidence and downside rationale..."></label>
                </div>
                <section class="dcfComparables" aria-label="Recent verified comparable transactions">
                  <header><span><small>COMPARISON APPROACH</small><b>Recent Completed Sales</b></span><em>Minimum 3</em></header>
                  <div class="dcfComparableHeader" aria-hidden="true"><span>Project</span><span>Date</span><span>Price</span><span>Area</span><span>Adj.</span><span>Source</span><span>Verified</span></div>
                  <div class="dcfComparable" data-dcf-comparable="0">
                    <input data-dcf-comp-field="projectName" aria-label="Comparable 1 project" placeholder="Project">
                    <input data-dcf-comp-field="transactionDate" aria-label="Comparable 1 transaction date" type="date">
                    <input data-dcf-comp-field="salePrice" aria-label="Comparable 1 sale price" placeholder="RM" inputmode="decimal">
                    <input data-dcf-comp-field="floorArea" aria-label="Comparable 1 floor area" placeholder="sf" inputmode="decimal">
                    <input data-dcf-comp-field="totalAdjustment" aria-label="Comparable 1 adjustment" placeholder="%" inputmode="decimal">
                    <input data-dcf-comp-field="source" aria-label="Comparable 1 source" placeholder="Source / URL">
                    <label class="dcfVerified"><input data-dcf-comp-field="verified" type="checkbox"> Completed</label>
                  </div>
                  <div class="dcfComparable" data-dcf-comparable="1">
                    <input data-dcf-comp-field="projectName" aria-label="Comparable 2 project" placeholder="Project">
                    <input data-dcf-comp-field="transactionDate" aria-label="Comparable 2 transaction date" type="date">
                    <input data-dcf-comp-field="salePrice" aria-label="Comparable 2 sale price" placeholder="RM" inputmode="decimal">
                    <input data-dcf-comp-field="floorArea" aria-label="Comparable 2 floor area" placeholder="sf" inputmode="decimal">
                    <input data-dcf-comp-field="totalAdjustment" aria-label="Comparable 2 adjustment" placeholder="%" inputmode="decimal">
                    <input data-dcf-comp-field="source" aria-label="Comparable 2 source" placeholder="Source / URL">
                    <label class="dcfVerified"><input data-dcf-comp-field="verified" type="checkbox"> Completed</label>
                  </div>
                  <div class="dcfComparable" data-dcf-comparable="2">
                    <input data-dcf-comp-field="projectName" aria-label="Comparable 3 project" placeholder="Project">
                    <input data-dcf-comp-field="transactionDate" aria-label="Comparable 3 transaction date" type="date">
                    <input data-dcf-comp-field="salePrice" aria-label="Comparable 3 sale price" placeholder="RM" inputmode="decimal">
                    <input data-dcf-comp-field="floorArea" aria-label="Comparable 3 floor area" placeholder="sf" inputmode="decimal">
                    <input data-dcf-comp-field="totalAdjustment" aria-label="Comparable 3 adjustment" placeholder="%" inputmode="decimal">
                    <input data-dcf-comp-field="source" aria-label="Comparable 3 source" placeholder="Source / URL">
                    <label class="dcfVerified"><input data-dcf-comp-field="verified" type="checkbox"> Completed</label>
                  </div>
                </section>
                <div class="dcfActions">
                  <button id="dcfCalculateBtn" type="button">CALCULATE VALUE</button>
                  <button id="dcfDownloadBtn" type="button">DOWNLOAD EXCEL</button>
                  <span id="dcfMessage" role="status"></span>
                </div>
              </section><div id="valuationResult" aria-live="polite"></div></section><section class="contextPanel studio-surface" data-surface="deal" hidden="">
            <header class="contextHeader"><div><small>SHARED WITH YOUR JOURNEY</small><h2>The property, in detail</h2></div>
              <button class="contextToggle" type="button" data-context-toggle="deal" aria-expanded="false" aria-controls="dealContextFields" hidden="">
                <span>Deal</span>
                <b class="contextAction">OPEN</b>
              </button>
              <button class="contextReset" type="button" data-context-reset="deal" aria-label="Clear all Deal card details">RESET</button>
            </header>
            <div id="dealContextFields" class="contextGrid" data-context-body="deal">
              <label>Area<input data-deal-field="area" placeholder="Penang, KL, Selangor..."></label>
              <label>Project<input data-deal-field="projectName" placeholder="Development name"></label>
              <label>Property Type<input data-deal-field="propertyType" placeholder="Condo, serviced apartment..."></label>
              <label>Property Age<input data-deal-field="propertyAge" placeholder="Years" inputmode="decimal"></label>
              <label>Floor Area<input data-deal-field="floorArea" placeholder="1,000 sf" inputmode="decimal"></label>
              <label>Asking Price<input data-deal-field="askingPrice" placeholder="RM500k" inputmode="decimal"></label>
              <label>Conservative Value<input data-deal-field="conservativeFairValue" placeholder="RM520k from transactions" inputmode="decimal"></label>
              <label>Expected Rent<input data-deal-field="expectedRent" placeholder="RM2,500/month" inputmode="decimal"></label>
              <label>Maintenance + Sinking<input data-deal-field="maintenance" placeholder="RM385/month total" inputmode="decimal"></label>
              <label>Loan Instalment<input data-deal-field="estimatedInstallment" placeholder="RM2,100/month" inputmode="decimal"></label>
              <label>Cash Outlay<input data-deal-field="cashOutlay" placeholder="RM80k all-in cash" inputmode="decimal"></label>

              <label>Bank Valuation
                <select data-deal-field="bankValuationSupport">
                  <option value="">Select</option>
                  <option>Multiple banker support</option>
                  <option>One banker indicative support</option>
                  <option>Agent valuation claim only</option>
                  <option>Valuation below price</option>
                  <option>Not checked</option>
                </select>
              </label>
              <label>Loan Precheck
                <select data-deal-field="loanPrecheckStatus">
                  <option value="">Select</option>
                  <option>Pre-approved / eligibility checked</option>
                  <option>Banker says likely</option>
                  <option>Not checked</option>
                  <option>Rejected / weak profile</option>
                </select>
              </label>
              <label>Loan Margin
                <select data-deal-field="loanMarginPlan">
                  <option value="">Select</option>
                  <option>80% or lower</option>
                  <option>Around 90% standard</option>
                  <option>Above 90% / cash-out</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Instalment Stress
                <select data-deal-field="instalmentStress">
                  <option value="">Select</option>
                  <option>10% higher instalment tested</option>
                  <option>Base instalment only</option>
                  <option>Not tested</option>
                </select>
              </label>
              <label>Cash Buffer
                <select data-deal-field="cashBufferAfterPurchase">
                  <option value="">Select</option>
                  <option>6+ months reserve after purchase</option>
                  <option>3-6 months reserve after purchase</option>
                  <option>Below 3 months reserve after purchase</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Loan Documents
                <select data-deal-field="financingDocumentReadiness">
                  <option value="">Select</option>
                  <option>Complete income / CTOS / CCRIS documents</option>
                  <option>Partial documents</option>
                  <option>Weak score / rejected documents</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label class="contextWide">Financing Notes<input data-deal-field="financingNotes" placeholder="Valuation basis, DSR concern, loan margin, approval risk, banker comment..."></label>
              <label>Supply Radius
                <select data-deal-field="supplyRadius">
                  <option value="">Select</option>
                  <option>Within 2.5km checked</option>
                  <option>Same road / township only</option>
                  <option>Not checked</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Substitute Count
                <select data-deal-field="substituteCount">
                  <option value="">Select</option>
                  <option>Less than 5</option>
                  <option>5 or more</option>
                  <option>No direct substitute</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Substitute Threat
                <select data-deal-field="substituteThreat">
                  <option value="">Select</option>
                  <option>No direct similar substitute</option>
                  <option>Different segment only</option>
                  <option>Complementary township supply</option>
                  <option>Newer similar layout or pricing</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Future Supply Timing
                <select data-deal-field="futureSupplyTiming">
                  <option value="">Select</option>
                  <option>No material VP nearby</option>
                  <option>Announcement / launch only</option>
                  <option>Under construction</option>
                  <option>VP within 12 months</option>
                  <option>Newly VP units entering market</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Absorption Evidence
                <select data-deal-field="absorptionEvidence">
                  <option value="">Select</option>
                  <option>Occupancy and rent holding strong</option>
                  <option>Sales rate and unsold units healthy</option>
                  <option>Agent confirms absorption</option>
                  <option>Weak absorption / rental drop</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Unsold Stock
                <select data-deal-field="unsoldStockSignal">
                  <option value="">Select</option>
                  <option>Less than 1% unsold</option>
                  <option>Elevated unsold stock</option>
                  <option>Bulk purchase / clear inventory</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Density / Lift Stress
                <select data-deal-field="densityLiftStress">
                  <option value="">Select</option>
                  <option>Below 1.5k units and lift wait acceptable</option>
                  <option>High density but prime pricing</option>
                  <option>1.5k+ units or lift wait concern</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label class="contextWide">Supply Notes<input data-deal-field="supplyNotes" placeholder="Closest substitutes, VP batch, occupancy, rent pressure, unsold stock, lift wait..."></label>
              <label>Assessment / Quit Rent<input data-deal-field="annualAssessmentQuitRent" placeholder="RM1,200/year" inputmode="decimal"></label>
              <label>Insurance / Tax<input data-deal-field="annualInsuranceTax" placeholder="RM800/year" inputmode="decimal"></label>
              <label>Repair Reserve<input data-deal-field="monthlyRepairReserve" placeholder="RM150/month" inputmode="decimal"></label>
              <label>Furnishing / Reno<input data-deal-field="furnishingBudget" placeholder="RM20k" inputmode="decimal"></label>
              <label>Vacancy Stress<input data-deal-field="vacancyStressMonths" placeholder="2 months" inputmode="decimal"></label>
              <label>Tenure<input data-deal-field="tenure" placeholder="Freehold / leasehold"></label>
              <label>Unit Position
                <select data-deal-field="unitPosition">
                  <option value="">Select</option>
                  <option>Good</option>
                  <option>Neutral</option>
                  <option>Unfavourable</option>
                </select>
              </label>
              <label>Own-Stay Appeal
                <select data-deal-field="ownStayAppeal">
                  <option value="">Select</option>
                  <option>Strong</option>
                  <option>Mixed</option>
                  <option>Weak</option>
                </select>
              </label>
              <label>Management / Build
                <select data-deal-field="managementQuality">
                  <option value="">Select</option>
                  <option>Strong</option>
                  <option>Mixed</option>
                  <option>Weak</option>
                </select>
              </label>
              <label>Exit Buyer Pool
                <select data-deal-field="exitBuyerPool">
                  <option value="">Select</option>
                  <option>Own-stay and investor</option>
                  <option>Own-stay mainly</option>
                  <option>Investor mainly</option>
                  <option>Unclear</option>
                </select>
              </label>
              <label>Completed Comparables
                <select data-deal-field="comparableTransactions">
                  <option value="">Select</option>
                  <option>None</option>
                  <option>1 to 2</option>
                  <option>3 or more</option>
                </select>
              </label>
              <label>Comparable Source
                <select data-deal-field="comparableSource">
                  <option value="">Select</option>
                  <option>Brickz / official transaction data</option>
                  <option>Successful auction result</option>
                  <option>Bank valuation support</option>
                  <option>Agent supplied completed comps</option>
                  <option>Property portal listing only</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Comparable Recency
                <select data-deal-field="comparableRecency">
                  <option value="">Select</option>
                  <option>0-6 months</option>
                  <option>6-12 months</option>
                  <option>12-24 months</option>
                  <option>Older than 24 months</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Comparable Match
                <select data-deal-field="comparableMatchQuality">
                  <option value="">Select</option>
                  <option>Same project</option>
                  <option>Closest substitute project</option>
                  <option>Same township only</option>
                  <option>Weak substitute</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Comparable Range<input data-deal-field="comparablePriceRange" placeholder="RM480k - RM520k" inputmode="decimal"></label>
              <label class="contextWide">Comparable Adjustments<input data-deal-field="comparableAdjustmentNotes" placeholder="Floor, view, size, layout, renovation, parking, facing adjustments..."></label>
              <label>Rental Evidence
                <select data-deal-field="rentEvidence">
                  <option value="">Select</option>
                  <option>Signed tenancy or achieved rent</option>
                  <option>Agent-confirmed</option>
                  <option>Listing only</option>
                  <option>None</option>
                </select>
              </label>
              <label>Rental Source
                <select data-deal-field="rentalSource">
                  <option value="">Select</option>
                  <option>Signed tenancy / achieved rent record</option>
                  <option>Active rental agent achieved rent</option>
                  <option>Property manager / owner actual rent</option>
                  <option>Agent verbal estimate</option>
                  <option>Property portal listing only</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Rental Recency
                <select data-deal-field="rentalRecency">
                  <option value="">Select</option>
                  <option>0-3 months</option>
                  <option>3-6 months</option>
                  <option>6-12 months</option>
                  <option>Older than 12 months</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Tenant Urgency
                <select data-deal-field="tenantUrgency">
                  <option value="">Select</option>
                  <option>High inquiry</option>
                  <option>Normal inquiry</option>
                  <option>Slow inquiry</option>
                  <option>No inquiry</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Vacancy Signal
                <select data-deal-field="vacancySignal">
                  <option value="">Select</option>
                  <option>0-1 month</option>
                  <option>1-2 months</option>
                  <option>More than 2 months</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Rental Sustainability
                <select data-deal-field="rentalSustainability">
                  <option value="">Select</option>
                  <option>Stable year-round demand</option>
                  <option>Seasonal but explainable</option>
                  <option>Incentive-supported</option>
                  <option>New supply pressure</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label class="contextWide">Rental Adjustments<input data-deal-field="rentalAdjustmentNotes" placeholder="Tenant profile, furnishing, vacancy, seasonality, incentives, new supply..."></label>
              <label>Site Visit
                <select data-deal-field="siteVisit">
                  <option value="">Select</option>
                  <option>Completed</option>
                  <option>Not yet</option>
                </select>
              </label>
              <label>Site Visit Evidence
                <select data-deal-field="siteVisitEvidence">
                  <option value="">Select</option>
                  <option>Physical visit with photos / notes</option>
                  <option>Physical visit, light notes only</option>
                  <option>Desk review only</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Lobby / Guardhouse
                <select data-deal-field="lobbyGuardhouseSignal">
                  <option value="">Select</option>
                  <option>Welcoming lobby and professional guardhouse</option>
                  <option>Acceptable but not memorable</option>
                  <option>Poor arrival / weak security</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Lift / Car Park / Corridor
                <select data-deal-field="liftCarparkCorridorSignal">
                  <option value="">Select</option>
                  <option>Fast lift, bright car park, good corridor</option>
                  <option>Acceptable daily use</option>
                  <option>Lift wait / dark car park / corridor issue</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Common Areas
                <select data-deal-field="commonAreaCondition">
                  <option value="">Select</option>
                  <option>Clean and well maintained</option>
                  <option>Average but functional</option>
                  <option>Dirty, broken, or short-stay heavy</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Resident Behaviour
                <select data-deal-field="residentBehaviourSignal">
                  <option value="">Select</option>
                  <option>Respectful and responsible</option>
                  <option>Mixed but acceptable</option>
                  <option>Complaints, nuisance, or overcrowding</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Management Response
                <select data-deal-field="managementResponseSignal">
                  <option value="">Select</option>
                  <option>Fast reply and solution-oriented</option>
                  <option>Mixed / average response</option>
                  <option>No reply / late / irresponsible</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Defect / Leakage
                <select data-deal-field="defectLeakageSignal">
                  <option value="">Select</option>
                  <option>No major defect or leakage</option>
                  <option>Minor wear only</option>
                  <option>Leakage / structural / material concern</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Arrears / JMB
                <select data-deal-field="arrearsJmbSignal">
                  <option value="">Select</option>
                  <option>Healthy collection and JMB culture</option>
                  <option>Some arrears but improving</option>
                  <option>High arrears / dispute / lawsuit</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label class="contextWide">Site / Management Notes<input data-deal-field="siteManagementNotes" placeholder="Management response, arrears, JMB culture, defects, resident behaviour, daily friction..."></label>
              <label>Title / Legal Check
                <select data-deal-field="legalCheck">
                  <option value="">Select</option>
                  <option>Clear</option>
                  <option>Pending</option>
                  <option>Issue found</option>
                </select>
              </label>
              <label>Title Type
                <select data-deal-field="legalTitleType">
                  <option value="">Select</option>
                  <option>Residential title / HDA serviced residence</option>
                  <option>Commercial title with residential use clarified</option>
                  <option>Fully office-commercial title</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Transfer Path
                <select data-deal-field="titleTransferStatus">
                  <option value="">Select</option>
                  <option>Issued title / transfer path clear</option>
                  <option>Master title but developer solvent</option>
                  <option>Perfection / transfer timeline pending</option>
                  <option>Transfer blocked / developer issue</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Caveat / Restriction
                <select data-deal-field="caveatRestrictionStatus">
                  <option value="">Select</option>
                  <option>No caveat or blocking restriction</option>
                  <option>State consent / affordable restriction understood</option>
                  <option>Caveat / Malay reserve / Bumi lot / blocking restriction</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Seller Authority
                <select data-deal-field="sellerAuthorityStatus">
                  <option value="">Select</option>
                  <option>Seller authority and documents verified</option>
                  <option>Agent supplied partial documents</option>
                  <option>Seller refuses documents / authority unclear</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Arrears / Utilities
                <select data-deal-field="arrearsUtilitiesStatus">
                  <option value="">Select</option>
                  <option>Maintenance, quit rent, assessment, utilities clear</option>
                  <option>Outstanding amount known and settled on completion</option>
                  <option>Unknown or disputed arrears</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Stakeholder Flow
                <select data-deal-field="stakeholderFlowStatus">
                  <option value="">Select</option>
                  <option>All payments through lawyer stakeholder / bank channels</option>
                  <option>Payment flow to be confirmed by lawyer</option>
                  <option>Direct payment / side agreement requested</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Lawyer Coordination
                <select data-deal-field="lawyerCoordinationStatus">
                  <option value="">Select</option>
                  <option>Lawyer reviewed / responsive with milestones</option>
                  <option>Pending but responsive</option>
                  <option>No lawyer / late reply / no progress report</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label class="contextWide">Legal Transaction Notes<input data-deal-field="legalTransactionNotes" placeholder="Land search, title, caveat, consent, seller authority, arrears, stakeholder flow, lawyer progress..."></label>
              <label>Deal Source
                <select data-deal-field="dealSource">
                  <option value="">Select</option>
                  <option>Auction page</option>
                  <option>Agency in-house app</option>
                  <option>Agent referral</option>
                  <option>Owner direct</option>
                  <option>Banker contact</option>
                  <option>Developer unit</option>
                  <option>Property portal</option>
                  <option>Social media</option>
                </select>
              </label>
              <label>Agent Behaviour
                <select data-deal-field="agentBehavior">
                  <option value="">Select</option>
                  <option>One-time genuine approach</option>
                  <option>First-hand access</option>
                  <option>Repeated follow-up</option>
                  <option>Hard sell</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label class="contextWide">Seller Motivation<input data-deal-field="sellerMotivation" placeholder="Urgent cash need, open to negotiation, testing price..."></label>
              <label class="contextWide">Professional Concern<input data-deal-field="professionalConcern" placeholder="Agent, banker, lawyer, coordination, fee, delay concern..."></label>
              <label class="contextWide">Site Visit Notes<input data-deal-field="siteVisitNotes" placeholder="Lobby, guardhouse, lift, car park, corridor, residents, vibe..."></label>
              <label class="contextWide">Inspection Concern<input data-deal-field="inspectionConcern" placeholder="Leak, lift wait, refuse room, noise, security, short-stay traffic..."></label>
              <label>Target Tenant
                <select data-deal-field="targetTenant">
                  <option value="">Select</option>
                  <option>All / depends on property</option>
                  <option>University students</option>
                  <option>Working professionals</option>
                  <option>Young couples</option>
                  <option>Small families</option>
                  <option>Expats</option>
                  <option>Factory workers</option>
                  <option>Unknown</option>
                </select>
              </label>
              <label>Furnishing Strategy
                <select data-deal-field="furnishingStrategy">
                  <option value="">Select</option>
                  <option>Fully furnished</option>
                  <option>Partially furnished</option>
                  <option>Bare unit</option>
                  <option>Minimal durable package</option>
                </select>
              </label>
              <label class="contextWide">Tenant Screening<input data-deal-field="tenantScreening" placeholder="Work/study proof, identity, occupant count, payment behaviour..."></label>
              <label>Exit Strategy
                <select data-deal-field="exitStrategyPlan">
                  <option value="">Select</option>
                  <option>Sell vacant after renovation</option>
                  <option>Sell tenanted to investor</option>
                  <option>Hold for cash flow</option>
                  <option>Refinance then hold</option>
                  <option>Undecided</option>
                </select>
              </label>
              <label class="contextWide">Resale Preparation<input data-deal-field="resalePreparation" placeholder="Bank value, staging, renovation, viewing condition, buyer objections..."></label>
              <label class="contextWide">Nearby Supply<input data-deal-field="nearbySupply" placeholder="Newer similar projects within 2.5km?"></label>
              <label class="contextWide">Investment Thesis<input data-deal-field="investmentThesis" placeholder="Why should this property work?"></label>
              <label class="contextWide">Main Concern<input data-deal-field="mainConcern" placeholder="What worries you most about this deal?"></label>
              <label class="contextWide">Kill Criterion<input data-deal-field="killCriterion" placeholder="What discovery would make you walk away?"></label>
            </div>
          </section><section class="contextPanel studio-surface" data-surface="profile" hidden="">
            <header class="contextHeader"><div><small>SHARED WITH YOUR JOURNEY</small><h2>Your investment capacity</h2></div>
              <button class="contextToggle" type="button" data-context-toggle="profile" aria-expanded="false" aria-controls="profileContextFields" hidden="">
                <span>Profile</span>
                <b class="contextAction">OPEN</b>
              </button>
              <button class="contextReset" type="button" data-context-reset="profile" aria-label="Clear all Profile card details">RESET</button>
            </header>
            <div id="profileContextFields" class="contextGrid" data-context-body="profile">
              <label>Monthly Income<input data-profile-field="monthlyIncome" placeholder="RM8,000" inputmode="decimal"></label>
              <label>Cash Reserve<input data-profile-field="cashReserveMonths" placeholder="Months of expenses/salary" inputmode="decimal"></label>
              <label>Cash Available<input data-profile-field="cashAvailable" placeholder="RM80k" inputmode="decimal"></label>
              <label>Current Debt<input data-profile-field="currentDebt" placeholder="RM1,500/month" inputmode="decimal"></label>
              <label>Risk Style
                <select data-profile-field="riskStyle">
                  <option value="">Select</option>
                  <option>Conservative</option>
                  <option>Balanced</option>
                  <option>Aggressive</option>
                </select>
              </label>
              <label>Investment Goal
                <select data-profile-field="investmentGoal">
                  <option value="">Select</option>
                  <option>Cash flow</option>
                  <option>Capital appreciation</option>
                  <option>Balanced rental and resale</option>
                  <option>Refinancing or cash-out</option>
                </select>
              </label>
              <label>Holding Period<input data-profile-field="holdingPeriod" placeholder="Years" inputmode="decimal"></label>
              <label>Existing Properties<input data-profile-field="existingProperties" placeholder="Number owned" inputmode="numeric"></label>
              <label>Portfolio Role
                <select data-profile-field="portfolioRole">
                  <option value="">Select</option>
                  <option>First investment asset</option>
                  <option>Cash-flow base</option>
                  <option>Appreciation play</option>
                  <option>Own-stay property</option>
                  <option>Refinancing capital</option>
                </select>
              </label>
              <label>Existing Portfolio Health
                <select data-profile-field="existingPortfolioHealth">
                  <option value="">Select</option>
                  <option>No existing investment property</option>
                  <option>Stable rent and costs</option>
                  <option>Weak rent or vacancy</option>
                  <option>Not reviewed</option>
                </select>
              </label>
              <label>Concentration Risk
                <select data-profile-field="concentrationRisk">
                  <option value="">Select</option>
                  <option>Low</option>
                  <option>Same area or township</option>
                  <option>Same property type</option>
                  <option>Same tenant pool</option>
                  <option>Unclear</option>
                </select>
              </label>
              <label class="contextWide">Next Purchase Reason<input data-profile-field="nextPurchaseReason" placeholder="Why add this property now?"></label>
              <label class="contextWide">Near-Term Commitment<input data-profile-field="nearTermCommitment" placeholder="Any major capital need in the next 2 years?"></label>
              <label class="contextWide">Financial Concern<input data-profile-field="financialConcern" placeholder="What financial risk worries you most?"></label>
            </div>
          </section><section class="contextPanel contextPanelSecondary studio-surface" data-surface="guidance" hidden="">
            <header class="contextHeader"><div><small>PREFERENCES</small><h2>How Apex should work with you</h2></div>
              <button class="contextToggle" type="button" data-context-toggle="guidance" aria-expanded="false" aria-controls="guidanceContextFields" hidden="">
                <span>Guidance</span>
                <b class="contextAction">OPEN</b>
              </button>
              <button class="contextReset" type="button" data-context-reset="guidance" aria-label="Clear all Guidance card details">RESET</button>
            </header>
            <div id="guidanceContextFields" class="contextGrid" data-context-body="guidance">
              <label>Experience Level
                <select data-profile-field="experienceLevel">
                  <option value="">Select</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Seasoned investor</option>
                  <option>Professional</option>
                </select>
              </label>
              <label>Guidance Mode
                <select data-profile-field="guidanceMode">
                  <option value="">Select</option>
                  <option>Guided</option>
                  <option>Balanced</option>
                  <option>Concise</option>
                  <option>Professional</option>
                </select>
              </label>
              <label>Decision Intent
                <select data-profile-field="decisionIntent">
                  <option value="">Select</option>
                  <option>Learn the framework</option>
                  <option>Screen a deal</option>
                  <option>Prepare an offer</option>
                  <option>Compare deals</option>
                  <option>Portfolio review</option>
                </select>
              </label>
              <label>Preferred Output
                <select data-profile-field="preferredOutput">
                  <option value="">Select</option>
                  <option>Short answer</option>
                  <option>Full report</option>
                  <option>Checklist</option>
                  <option>Voice summary</option>
                </select>
              </label>
              <label>Confidence Comfort
                <select data-profile-field="confidenceComfort">
                  <option value="">Select</option>
                  <option>Conservative</option>
                  <option>Normal</option>
                  <option>Comfortable with uncertainty</option>
                </select>
              </label>
              <label class="contextWide">Guidance Notes<input data-profile-field="onboardingNotes" placeholder="Tell Apex how direct, detailed, or beginner-friendly to be."></label>
            </div>
          </section><section id="conversation" class="assistant-desk studio-surface" data-surface="chat" hidden=""><header class="surface-heading"><div><small>YOUR THINKING PARTNER</small><h2>A clearer perspective.</h2><p id="assistantPrompt" role="status">What would you like to explore?</p></div><div class="connection-state"><span id="systemStatus">Connecting</span><span id="sessionStatus"></span></div></header><div id="dealJourney" class="desk-context" aria-label="Current property context"></div><section class="starterPanel" aria-label="Start with a common property decision">
          <button type="button" data-starter-action="deal"><b>Screen a deal</b><span>Add only the essential facts first.</span></button>
          <button type="button" data-starter-prompt="Compare buying one RM600k condo with three RM200k flats."><b>Compare options</b><span>Test the trade-offs across the whole portfolio.</span></button>
          <button type="button" data-starter-prompt="What evidence should I collect before paying the booking fee?"><b>Check evidence</b><span>Find the cheapest checks that could stop a bad decision.</span></button>
          <button type="button" data-starter-prompt="I like this property. Challenge my view and identify what I may be missing."><b>Challenge my thesis</b><span>Expose the counter-case and blind spots.</span></button>
        </section><div id="transcript" class="transcript"></div><div class="desk-composer"><p id="aiDisclosure" class="ai-disclosure" hidden="">Your question and submitted property context may be sent to the configured AI provider. Owner knowledge remains protected.</p><form id="chatForm" autocomplete="off"><label class="sr-only" for="chatInput">Ask Apex</label><textarea id="chatInput" maxlength="4000" rows="2" placeholder="What am I missing about this property?" required=""></textarea><button type="submit" class="primary-button">Send <span aria-hidden="true">\u2197</span></button></form><div class="composer-actions"><span id="inputModeHint" class="inputModeHint">CHAT</span><button id="jarvisOrb" class="voiceLaunch" type="button">Speak</button><button id="stopVoiceBtn" type="button" hidden="">Stop audio</button><button id="soundToggle" type="button" aria-pressed="false">Voice off</button><button id="screenDealBtn" type="button">Quick screen</button><button id="analyzeDealBtn" type="button">Decision report</button><button id="sessionBriefBtn" type="button">Copy brief</button><button id="resetChatBtn" type="button">New chat</button></div></div></section><nav id="featureTriggers" hidden=""><button id="accountToggle" class="accountStatus" type="button" aria-expanded="false" aria-controls="authPanel">
        <span id="accountLabel">GUEST</span>
      </button><button id="historyToggle" type="button" aria-expanded="false" aria-controls="sessionPanel">HISTORY</button><button id="shortlistToggle" type="button" aria-expanded="false" aria-controls="shortlistPanel">SHORTLIST</button></nav></div>
`;var Ro={desk:{title:"The decision desk",description:"Explore the question. Test the numbers. Keep your context together.",views:[["chat","Ask Apex","Your thinking partner"],["deal","Property inputs","Shared with the journey"],["profile","Investor profile","Capacity, goals and reserves"],["valuation","Valuation lab","DCF, comparisons and Excel"],["guidance","Preferences","Choose your guidance style"]]},library:{title:"Your private library",description:"Return to what you learned, decided and saved.",views:[["reports","Decision reports","Saved seven-stage assessments"],["journal","Decision journal","Thesis, outcomes and lessons"],["memory","Long-term memory","Review what Apex remembers"],["history","Conversations","Resume or manage your history"],["shortlist","Saved shortlist","Compare earlier assessments"]]},owner:{title:"Owner Studio",description:"Curate the intelligence. Shared knowledge stays under your control.",views:[["owner","Intelligence hub","Coverage, research and operations"],["market","Market observatory","Projects and dated observations"],["cases","Development cases","Your project-level experience"],["evidence","Evidence vault","Sources, documents and indexing"]]},account:{title:"Your account",description:"Private access, plan details and the boundaries that protect your decisions.",views:[["account","Account & plan","Sign in, security and billing"],["trust","Decision boundaries","What Apex can and cannot do"]]}},al=Object.entries(Ro).flatMap(([n,e])=>e.views.map(([t,i,s])=>({area:n,id:t,label:i,description:s}))),Dt=n=>document.querySelector(n);function Zb({getCandidate:n,notify:e,onVisibility:t}){let i=Dt("#workbench");i.innerHTML=`<aside class="studio-sidebar"><p class="eyebrow">APEX / WORKSPACE</p><h2 id="studioAreaTitle"></h2><p id="studioAreaDescription"></p><label class="studio-search"><span class="sr-only">Find a feature</span><input id="studioSearch" type="search" placeholder="Find a tool..." autocomplete="off"></label><nav id="studioNav" aria-label="Workspace sections"></nav><label class="mobile-section"><span>Section</span><select id="studioSectionSelect"></select></label><p class="studio-private">Your property stays selected as you move between tools. Knowledge updates are owner-only.</p></aside><div class="studio-main"><header class="studio-breadcrumb"><span id="studioBreadcrumb"></span><button type="button" data-return-journey>Back to journey <span aria-hidden="true">&#8599;</span></button></header><div id="studioLoading" role="status" hidden>Connecting your workspace...</div>${Ry}</div>`;let s,r,o="",a="desk",l=!1;Dt("#studioBreadcrumb").tabIndex=-1;let c;try{let v=JSON.parse(localStorage.getItem("estatelab.jarvis.dealCard")||"{}"),g=JSON.parse(localStorage.getItem("estatelab.jarvis.financialProfile")||"{}");!localStorage.getItem("apex.workspace.recovered")&&(Object.keys(v).length||Object.keys(g).length)&&(c={dealCard:v,financialProfile:g})}catch{}if(c){let v=document.createElement("details");v.className="draft-recovery",v.innerHTML='<summary>Earlier browser inputs found</summary><p>Recover the draft saved on this device. Review it before relying on it; your existing properties will not be overwritten.</p><button type="button" data-recover-draft>Recover draft</button>',i.querySelector(".studio-sidebar").append(v)}for(let v of al){let g=i.querySelector(`[data-surface="${v.id}"] > header > span > b:not([id])`);g&&(g.textContent=v.label)}function u(v,g=!0){let m=al.find(M=>M.id===v);m&&(o=v,a=m.area,i.hidden=!1,document.body.classList.add("workspace-active"),t(!0),Dt("#studioAreaTitle").textContent=Ro[a].title,Dt("#studioAreaDescription").textContent=Ro[a].description,Dt("#studioBreadcrumb").textContent=`${Ro[a].title} / ${m.label}`,i.querySelectorAll("[data-surface]").forEach(M=>{M.hidden=M.dataset.surface!==v}),document.querySelectorAll("[data-area]").forEach(M=>M.setAttribute("aria-current",M.dataset.area===a?"page":"false")),Dt("#studioAccount").setAttribute("aria-current",a==="account"?"page":"false"),d(Dt("#studioSearch").value),g&&history.replaceState(null,"",`#${a}/${v}`))}function d(v=""){let g=v.trim().toLowerCase();i.dataset.searching=String(!!g);let m=g?al.filter(M=>`${M.label} ${M.description}`.toLowerCase().includes(g)):al.filter(M=>M.area===a);Dt("#studioNav").innerHTML=m.map((M,E)=>`<button type="button" data-view="${M.id}" aria-current="${o===M.id?"page":"false"}"><span class="studio-nav-number">${String(E+1).padStart(2,"0")}</span><span><b>${M.label}</b><small>${M.description}</small></span><span aria-hidden="true">&#8599;</span></button>`).join("")||'<p>No matching tools. Try "reports", "DCF" or "memory".</p>',Dt("#studioSectionSelect").innerHTML=Object.entries(Ro).map(([M,E])=>`<optgroup label="${E.title}">${E.views.map(([S,C])=>`<option value="${S}" ${S===o?"selected":""}>${C}</option>`).join("")}</optgroup>`).join("")}async function h(){return s&&i.dataset.ready==="true"?s:(r||(r=(async()=>{Dt("#studioLoading").hidden=!1;let v=await Promise.resolve().then(()=>(Jb(),Kb));return s=v,v.setWorkspaceCandidate(n()),await v.initializeFeatures(),Dt("#studioLoading").hidden=!0,i.dataset.ready="true",v})().catch(v=>{throw r=null,Dt("#studioLoading").textContent="Workspace connection failed. Try selecting a section again.",v})),r)}async function f(v="chat",g={}){if(l||s?.workspaceBusy()){e("Let Apex finish the current request before switching tools.");return}l=!0,u(v),Dt("#studioSearch").value="";try{await(await h()).openWorkspaceFeature(v,g),u(o||v),o==="account"&&v!=="account"&&e("Sign in to open your private library. Guest chat and property tools remain available."),window.scrollTo({top:0,behavior:"instant"}),v!=="chat"&&!matchMedia("(pointer: coarse)").matches&&Dt("#studioBreadcrumb").focus({preventScroll:!0})}catch(m){e(m.message,!0)}finally{l=!1}}function y(){if(l||s?.workspaceBusy()){e("Let Apex finish the current request before switching views.");return}i.hidden=!0,document.body.classList.remove("workspace-active"),history.replaceState(null,"",location.pathname),t(!1),document.querySelectorAll("[data-area]").forEach(v=>v.setAttribute("aria-current",v.dataset.area==="journey"?"page":"false"))}return document.addEventListener("apex:surface",v=>u(v.detail)),document.addEventListener("apex:notice",v=>e(v.detail,!0)),document.addEventListener("keydown",v=>{v.key==="Escape"&&!i.hidden&&!Dt("#workspaceDialog").open&&y()}),i.addEventListener("click",v=>{let g=v.target.closest("button");g&&(g.dataset.view&&f(g.dataset.view),g.hasAttribute("data-return-journey")&&y(),g.hasAttribute("data-studio-close")&&f("chat"),g.hasAttribute("data-recover-draft")&&!s?.workspaceBusy()&&document.dispatchEvent(new CustomEvent("apex:recover-draft",{detail:c})))}),Dt("#studioSearch").addEventListener("input",v=>d(v.target.value)),Dt("#studioSectionSelect").addEventListener("change",v=>void f(v.target.value)),document.addEventListener("keydown",v=>{(v.ctrlKey||v.metaKey)&&v.key.toLowerCase()==="k"&&(v.preventDefault(),f(o||"chat").then(()=>Dt("#studioSearch").focus()))}),document.querySelectorAll("[data-area]").forEach(v=>v.addEventListener("click",()=>v.dataset.area==="journey"?y():void f(Ro[v.dataset.area].views[0][0]))),Dt("#studioAccount").addEventListener("click",()=>void f("account")),{open:f,close:y,isBusy:()=>l||!!s?.workspaceBusy(),setCandidate(v){s?.setWorkspaceCandidate(v)},restoreRoute(){let v=location.hash.split("/")[1];al.some(g=>g.id===v)&&f(v)}}}var Xt,Te=n=>document.querySelector(n),ut=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),_1=n=>String(n??"").replace(/EstateLab|Jarvis/gi,"Apex"),ix=()=>new Date().toISOString().slice(0,10),sx=()=>crypto.randomUUID(),hl={read(n,e){try{return JSON.parse(localStorage.getItem(n))??e}catch{return e}},write(n,e){localStorage.setItem(n,JSON.stringify(e))}},Qi={},Zi=hl.read("apex.journey.client",null);if(!Zi)try{Zi=localStorage.getItem("estatelab.jarvis.clientId"),Zi&&hl.write("apex.journey.client",Zi)}catch{}if(!/^[\w-]{16,128}$/.test(Zi||"")){Zi=sx();try{hl.write("apex.journey.client",Zi)}catch{}}var rx=matchMedia("(prefers-reduced-motion: reduce)"),G={candidates:[],active:"",level:0,checkpoint:null,evaluation:null,busy:!1,revision:0,paused:rx.matches,flat:!1,storageKey:null,world:null,noticeTimer:null};function jt(n,e=!1){clearTimeout(G.noticeTimer),Te("#notice").textContent=_1(n),e||(G.noticeTimer=setTimeout(()=>{Te("#notice").textContent=""},6500))}function dd(){return{id:sx(),dealCard:{},financialProfile:{},evidence:{},report:null,sessionId:null,chat:[],modified:new Date().toISOString()}}function Ot(){return G.candidates.find(n=>n.id===G.active)}function ox(n){return{dealCard:n.dealCard,financialProfile:n.financialProfile,evidence:n.evidence}}function Ji(){if(G.storageKey)try{hl.write(G.storageKey,{candidates:G.candidates,active:G.active}),Te("#saveStatus").textContent="Saved in this browser. Your framework stays owner-controlled."}catch{Te("#saveStatus").textContent="Browser storage is unavailable. Export your journey to keep a copy."}}function ax(){G.revision++,G.evaluation=null,Ot().report=null,Ot().modified=new Date().toISOString(),Te("#levelStatus").textContent="RECHECK NEEDED",Ji(),dl(),yr()}async function hd(n,e,t=35e3){let i=new AbortController,s=setTimeout(()=>i.abort(),t);try{let r=await fetch(n,{method:e?"POST":"GET",headers:{"content-type":"application/json","x-estatelab-client-id":Zi},body:e?JSON.stringify(e):void 0,signal:i.signal}),o=await r.json().catch(()=>({}));if(!r.ok)throw new Error(o.error||`Request failed (${r.status}).`);return o}catch(r){throw r.name==="AbortError"?new Error("Apex is taking longer to respond. Your work is saved; please try again."):r}finally{clearTimeout(s)}}function vr(n=G.level){return G.evaluation?.levels?.[n]}function rm(n){return n===0||["active","review","blocked","passed"].includes(vr(n)?.status)}function dl(){let n=Te("#candidateSelect");n.innerHTML=G.candidates.map((e,t)=>`<option value="${ut(e.id)}">${ut(e.dealCard.projectName||e.dealCard.area||`Property ${t+1}`)}</option>`).join(""),n.value=G.active,Te("#compareCount").textContent=G.candidates.length}function yr(){Te("#levelRail").innerHTML=wt.map((n,e)=>{let t=vr(e)?.status||(e===0?"active":"locked"),i={passed:"Cleared",active:"Explore",review:"Evidence needed",blocked:"Resolve issue",locked:"Locked"}[t];return`<button type="button" data-level="${e}" class="${G.level===e?"active":""}" aria-current="${G.level===e?"step":"false"}" aria-disabled="${!rm(e)}" aria-label="Level ${e+1}: ${ut(n.subject)}. ${i}."><span class="rail-number">${t==="passed"?"&#10003;":String(e+1).padStart(2,"0")}</span><span><b>${ut(n.short)}</b><small>${i}</small></span></button>`}).join(""),Te("#levelsPassed").textContent=String(G.evaluation?.completed||0).padStart(2,"0"),G.world?.update(G.evaluation?.levels||wt.map((n,e)=>({status:e===0?"active":"locked"})))}function S1(){let n=wt[G.level],e=vr(),t=n.checkpoints.filter(o=>!Po(Ot(),o,Qi).length).length,i=e?.status==="passed",s=e?.status==="blocked"||e?.status==="review",r=`<button class="primary-button" data-action="enter">${t?"Continue investigation":"Enter this level"}<span aria-hidden="true">&#8599;</span></button>`;i&&G.level<6&&(r=`<button class="primary-button" data-action="next">Continue to ${ut(wt[G.level+1].title)} <span aria-hidden="true">&#8594;</span></button>`),G.level===6&&i&&(r='<button class="primary-button" data-action="report">Get the decision report <span aria-hidden="true">&#8599;</span></button>'),Te("#levelContent").innerHTML=`
    <p class="level-lead">${ut(n.description)}</p>
    <div class="panel-progress"><span>${t} of ${n.checkpoints.length} checkpoints recorded</span><span>${Math.round(t/n.checkpoints.length*100)}%</span></div>
    <div class="progress-track"><span style="width:${t/n.checkpoints.length*100}%"></span></div>
    ${s?`<div class="gate-result bad"><b>${e.status==="blocked"?"Pause at this level":"The evidence needs another look"}</b><p>${ut(e.blockers?.[0]||e.summary)}</p><button class="secondary-button" data-action="challenge">Ask Apex what to check</button></div>`:""}
    ${i?`<div class="gate-result good"><b>Level cleared</b><p>${ut(e.summary)}</p></div>`:""}
    <ol class="checkpoint-list">${n.checkpoints.map((o,a)=>{let l=!Po(Ot(),o,Qi).length;return`<li><button type="button" data-checkpoint="${a}"><span class="step-icon ${l?"complete":""}">${l?"&#10003;":String(a+1).padStart(2,"0")}</span><span>${ut(o.title)}</span><span class="step-arrow" aria-hidden="true">&#8599;</span></button></li>`}).join("")}</ol>
    ${r}
    ${t===n.checkpoints.length&&!i?'<button class="secondary-button" data-action="check" style="width:100%;margin-top:10px">Check this level</button>':""}
    <p class="mentor-note">${ut(n.lesson)}</p>`}function w1(n){let e=Qi[n],t=gd(Ot(),n,Qi),i=md.has(n)?"":"required",s=`<span>${ut(e.label)}${i?"":"<small>optional</small>"}</span>`;if(e.options.length)return`<label class="field">${s}<select name="${n}" data-field="${n}" ${i}><option value="">Select what the evidence shows</option>${e.options.map(a=>`<option value="${ut(a.value)}" ${t===a.value?"selected":""}>${ut(a.label)}</option>`).join("")}</select></label>`;let r=/Notes|Thesis|Criterion|Concern|Screening|Reason|Preparation|Commitment/.test(n),o=e.inputMode==="numeric"?"numeric":e.inputMode==="decimal"?"decimal":"text";return`<label class="field">${s}${r?`<textarea data-field="${n}" name="${n}" maxlength="500" placeholder="${ut(e.placeholder)}" ${i}>${ut(t)}</textarea>`:`<input data-field="${n}" name="${n}" value="${ut(t)}" inputmode="${o}" maxlength="500" placeholder="${ut(e.placeholder)}" ${i}>`}</label>`}function E1(){let e=wt[G.level].checkpoints[G.checkpoint],t=Ot().evidence[e.id]||{};Te("#levelContent").innerHTML=`<button class="back-button" data-action="overview">&#8592; Level overview</button>
    <form class="checkpoint-form" id="checkpointForm">
      <h3>${ut(e.title)}</h3><p>${ut(e.prompt)}</p>
      ${e.fields.map(w1).join("")}
      <div class="proof-block"><p>Leave a trace of your reasoning. For financial inputs, record the basis of your calculation.</p>
      <label class="field"><span>Evidence or calculation notes</span><textarea name="proofNote" data-proof="note" minlength="12" maxlength="1500" required placeholder="Source, document, observation or calculation. Say what is still uncertain.">${ut(t.note||"")}</textarea></label>
      <label class="field"><span>Date checked</span><input name="proofDate" data-proof="date" type="date" max="${ix()}" value="${ut(t.date||"")}" required></label></div>
      <p class="source-line">Framework: ${ut(e.source)}.</p>
      <p id="checkpointError" class="error-note" role="alert"></p>
      <div class="form-actions"><button type="submit" class="primary-button">Save &amp; check <span aria-hidden="true">&#8594;</span></button></div>
    </form>`}function Un(){let n=wt[G.level],e=vr()?.status||"active";Te("#levelEyebrow").textContent=`LEVEL ${String(G.level+1).padStart(2,"0")} / 07`,Te("#levelTitle").textContent=n.title,Te("#levelSubject").textContent=n.subject.toUpperCase(),Te("#levelStatus").textContent={active:"OPEN",passed:"CLEARED",review:"REVIEW",blocked:"PAUSED",locked:"LOCKED"}[e],Te("#levelStatus").dataset.status=e,G.checkpoint===null?S1():E1(),Te("#levelPanel").setAttribute("aria-busy",String(G.busy))}function sm(n){if(!(G.busy||Xt?.isBusy())){if(!rm(n)){jt("Clear the earlier levels first. Each decision builds on the evidence before it.");return}G.level=n,G.checkpoint=null,Un(),yr(),G.world?.focus(n),Te("#levelPanel").scrollTop=0,innerWidth<800&&Te("#levelPanel").scrollIntoView({behavior:G.paused?"instant":"smooth",block:"start"})}}async function cl(){let n=G.active,e=G.revision,t=await hd("/api/journey/evaluate",{candidate:ox(Ot())});return n!==G.active||e!==G.revision?null:(G.evaluation=t,yr(),t)}async function Qb(){if(!(G.busy||Xt?.isBusy())){G.busy=!0,Te("#levelPanel").setAttribute("aria-busy","true");try{let n=G.evaluation?.completed||0,e=await cl();if(!e)return;Ji();let t=wt[G.level].checkpoints.findIndex(i=>Po(Ot(),i,Qi).length);t>=0&&G.checkpoint!==null?G.checkpoint=t:G.checkpoint=null,Un(),Te("#levelPanel").scrollTop=0,e.completed>n?jt(`${wt[G.level].title} cleared. The next level is open.`):t<0?jt(vr()?.status==="passed"?"This level is cleared.":"Evidence saved. Review the level feedback before proceeding."):jt("Checkpoint saved. Continue with the next piece of evidence.")}catch(n){let e=Te("#checkpointError");e?e.textContent=n.message:jt(n.message,!0)}finally{G.busy=!1,Te("#levelPanel").setAttribute("aria-busy","false")}}}function lx(n,e,t="YOUR INVESTIGATION"){Te("#dialogTitle").textContent=n,Te("#dialogEyebrow").textContent=t,Te("#dialogContent").innerHTML=e,Te("#workspaceDialog").open||Te("#workspaceDialog").showModal()}function ex(){let n={product:"Apex Property Journey",version:1,exportedAt:new Date().toISOString(),candidate:Ot(),assessment:G.evaluation},e=URL.createObjectURL(new Blob([JSON.stringify(n,null,2)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`apex-journey-${ix()}.json`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}async function M1(){if(!(G.busy||Xt?.isBusy())){lx("Which property earns its place?",'<p role="status">Rechecking each candidate against the same framework...</p>',"YOUR PROPERTY COLLECTION");try{let n=[];for(let o of G.candidates)n.push(await hd("/api/journey/evaluate",{candidate:ox(o)}));let e=n.map((o,a)=>({result:o,i:a})).filter(o=>o.result.qualified).sort((o,a)=>(a.result.dimensions||[]).reduce((l,c)=>l+c.score,0)-(o.result.dimensions||[]).reduce((l,c)=>l+c.score,0)),t=e[0],i=o=>o.result.dimensions.reduce((a,l)=>a+l.score,0),s=t?e.filter(o=>i(o)===i(t)):[],r=s.length>1?`${s.map(o=>o.result.candidateName).join(", ")} share the highest framework score. There is no clear winner from these scores alone. Compare the cash-flow assumptions, exit risks and strength of the evidence before choosing.`:t?`${t.result.candidateName} has the strongest average across the four framework dimensions among your qualified candidates. Review its counter-case before deciding.`:"No candidate has cleared every level and the final evidence gate yet. The comparison shows where each investigation needs work.";Te("#dialogContent").innerHTML=`<p>${ut(r)}</p><div class="compare-grid">${n.map((o,a)=>`<article class="compare-card"><small>${o.qualified?"QUALIFIED FOR SHORTLIST REVIEW":"INVESTIGATION IN PROGRESS"}</small><h3>${ut(o.candidateName)}</h3><p>${o.completed} / 7 levels cleared</p>${o.dimensions.map(l=>`<div class="score-row"><span>${ut(l.label)}</span><b>${l.score}/100</b></div>`).join("")}<p>${ut(o.hardStops[0]||o.blockers[0]||o.counterThesis)}</p><button class="secondary-button" data-switch="${ut(G.candidates[a].id)}">Open journey</button></article>`).join("")}</div><p class="source-line">Scores reflect your supplied inputs. Evidence quality, hard stops and the investor's situation take priority over the average.</p>`}catch(n){Te("#dialogContent").textContent=n.message}}}function tx(n=""){Xt.setCandidate(Ot()),Xt.open("chat",{prompt:n})}async function T1(){G.busy||Xt.isBusy()||(Xt.setCandidate(Ot()),await Xt.open("chat",{analyze:!0}))}async function ll(n){if(G.busy||Xt?.isBusy()||!G.candidates.some(e=>e.id===n)){dl();return}window.speechSynthesis?.cancel(),G.active=n,G.level=0,G.checkpoint=null,G.evaluation=null,G.revision++,Xt?.setCandidate(Ot()),Ji(),dl(),Un(),yr(),G.world?.overview();try{await cl(),Un()}catch(e){jt(e.message)}}function A1(){Te("#candidateSelect").addEventListener("change",n=>ll(n.target.value)),Te("#levelRail").addEventListener("click",n=>{let e=n.target.closest("[data-level]");e&&sm(Number(e.dataset.level))}),Te("#levelContent").addEventListener("click",n=>{let e=n.target.closest("button");if(!(!e||G.busy)){if(e.dataset.checkpoint!==void 0){G.checkpoint=Number(e.dataset.checkpoint),Un(),G.world?.focus(G.level,!0),Te("#levelPanel").scrollTop=0;return}switch(e.dataset.action){case"overview":G.checkpoint=null,Un(),G.world?.focus(G.level);break;case"enter":{let t=wt[G.level].checkpoints;G.checkpoint=Math.max(0,t.findIndex(i=>Po(Ot(),i,Qi).length)),Un(),G.world?.focus(G.level,!0);break}case"next":sm(G.level+1);break;case"check":Qb();break;case"challenge":tx(`Help me resolve the ${wt[G.level].subject} level. ${vr()?.blockers?.[0]||vr()?.summary||"What evidence am I missing?"}`);break;case"report":T1();break}}}),Te("#levelContent").addEventListener("input",n=>{let e=n.target;if(e.dataset.field)Ot()[Qi[e.dataset.field].scope][e.dataset.field]=e.value;else if(e.dataset.proof){let t=wt[G.level].checkpoints[G.checkpoint].id;Ot().evidence[t]||={},Ot().evidence[t][e.dataset.proof]=e.value}else return;ax()}),Te("#levelContent").addEventListener("submit",n=>{n.preventDefault(),Qb()}),Te("#newCandidate").addEventListener("click",()=>{if(G.busy||Xt?.isBusy())return;if(G.candidates.length>=4){jt("Keep up to four active properties. Export and reset one to start another.");return}let n=dd();G.candidates.push(n),ll(n.id)}),Te("#compareButton").addEventListener("click",M1),Te("#assistantButton").addEventListener("click",()=>tx()),Te("#exportButton").addEventListener("click",ex),Te("#resetButton").addEventListener("click",()=>{G.busy||Xt?.isBusy()||lx("Reset this property?",`<p>This clears the selected property's inputs, checkpoint notes, browser chat and local report. Other properties and your account history remain available.</p><div class="dialog-actions"><button class="secondary-button" data-dialog-action="cancel">Keep my progress</button><button class="primary-button" data-dialog-action="reset">Clear this property</button></div>`)}),Te("#dialogClose").addEventListener("click",()=>{window.speechSynthesis?.cancel(),Te("#workspaceDialog").close()}),Te("#workspaceDialog").addEventListener("close",()=>window.speechSynthesis?.cancel()),Te("#dialogContent").addEventListener("click",n=>{let e=n.target.closest("button");if(e){if(e.dataset.switch&&!G.busy&&(Te("#workspaceDialog").close(),ll(e.dataset.switch)),e.dataset.dialogAction==="cancel"&&Te("#workspaceDialog").close(),e.dataset.dialogAction==="reset"&&!G.busy){let t=G.candidates.findIndex(i=>i.id===G.active);G.candidates[t]=dd(),Te("#workspaceDialog").close(),ll(G.candidates[t].id)}e.dataset.dialogAction==="export"&&ex(),e.dataset.dialogAction==="print"&&window.print()}}),Te("#resetView").addEventListener("click",()=>G.world?.overview()),Te("#motionToggle").addEventListener("click",()=>{G.paused=!G.paused,G.world?.pause(G.paused),ul()}),Te("#mapToggle").addEventListener("click",()=>{G.flat=!G.flat,document.body.classList.toggle("flat-view",G.flat),G.world?.flat(G.flat),ul()}),rx.addEventListener("change",n=>{G.paused=n.matches,G.world?.pause(G.paused),ul()}),window.addEventListener("pagehide",()=>{Ji(),window.speechSynthesis?.cancel(),G.world?.dispose()}),window.addEventListener("pageshow",n=>{n.persisted&&location.reload()})}function ul(){Te("#motionToggle").textContent=G.paused?"Resume motion":"Pause motion",Te("#motionToggle").setAttribute("aria-pressed",String(G.paused)),Te("#mapToggle").textContent=G.flat?"3D view":"List view",Te("#mapToggle").setAttribute("aria-pressed",String(G.flat))}function nx(n){G.userId=n||null,G.storageKey=`apex.journey.v1:${n||`guest-${Zi}`}`;let e=hl.read(G.storageKey,{});G.candidates=(Array.isArray(e.candidates)?e.candidates:[]).filter(t=>t&&typeof t.id=="string"&&t.dealCard&&t.financialProfile&&t.evidence).slice(0,4).map(t=>({...t,chat:Array.isArray(t.chat)?t.chat.slice(-40):[]})),G.candidates.length||G.candidates.push(dd()),G.active=G.candidates.some(t=>t.id===e.active)?e.active:G.candidates[0].id,G.level=0,G.checkpoint=null,G.evaluation=null,G.revision++}async function C1(){Qi=await hd("/journey/fields.json",null,2e4),Cy({selectLevel:sm,notify:jt,reducedMotion:G.paused}).then(e=>{G.world=e,e.pause(G.paused||document.body.classList.contains("workspace-active")),yr(),ul()}).catch(()=>{document.body.classList.add("flat-view"),Te("#worldLoading").hidden=!0,jt("The illustrated map is available while 3D is unavailable. Your checkpoint forms still work.")});let n;try{n=(await hd("/api/auth/me",null,12e3)).user}catch{jt("Account connection is unavailable. The journey will use this browser's guest space.")}nx(n?.id),Xt=Zb({getCandidate:Ot,notify:jt,onVisibility(e){G.world?.pause(e||G.paused),e||(Un(),cl().then(()=>{rm(G.level)||(G.level=0,G.checkpoint=null),Un()}).catch(t=>jt(t.message)))}}),document.addEventListener("apex:context",e=>{let t=e.detail,i=Ot();if(t.candidateId!==i.id)return;let s=JSON.stringify(i.dealCard)!==JSON.stringify(t.dealCard)||JSON.stringify(i.financialProfile)!==JSON.stringify(t.financialProfile);i.dealCard=t.dealCard,i.financialProfile=t.financialProfile,i.dcfContext=t.dcfContext,t.sessionId!==void 0&&(i.sessionId!==t.sessionId&&(i.report=null),i.sessionId=t.sessionId),t.messages&&(i.messages=t.messages.slice(-40)),s?ax():Ji(),t.report&&(i.report=t.report,Ji())}),document.addEventListener("apex:busy",e=>{for(let t of["candidateSelect","newCandidate","compareButton"])Te("#"+t).disabled=e.detail}),document.addEventListener("apex:recover-draft",e=>{if(G.busy||Xt.isBusy())return;let t=G.candidates.findIndex(s=>!Object.keys(s.dealCard).length&&!Object.keys(s.financialProfile).length&&!Object.keys(s.evidence).length&&!s.messages?.length&&!s.chat?.length);if(G.candidates.length>=4&&t<0){jt("Export and reset an unused property before recovering another draft.");return}let i=dd();for(let[s,r]of Object.entries(Qi)){let o=e.detail?.[r.scope]?.[s];(typeof o=="string"||typeof o=="number")&&(i[r.scope][s]=String(o).slice(0,500))}t>=0?G.candidates[t]=i:G.candidates.push(i),ll(i.id).then(()=>Xt.open("deal"));try{localStorage.setItem("apex.workspace.recovered","true")}catch{}document.querySelector(".draft-recovery")?.remove(),jt("Earlier inputs recovered as a separate property. Recheck the evidence before proceeding.")}),document.addEventListener("apex:auth",e=>{let t=e.detail?.id||null;G.userId!==t&&(Ji(),nx(t),Xt.setCandidate(Ot()),dl(),Un(),yr(),Ji(),cl().then(Un).catch(i=>jt(i.message)))}),dl(),Un(),yr(),ul(),A1(),Ji();try{await cl(),Un()}catch(e){jt(e.message,!0)}document.body.dataset.ready="true",Xt.restoreRoute()}C1().catch(n=>{jt(`The journey could not finish loading: ${n.message}. Please reload to reconnect. Your saved property data is retained.`,!0)});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
