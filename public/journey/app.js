var Ax=Object.defineProperty;var Cx=(n,e)=>()=>(n&&(e=n(n=0)),e);var Rx=(n,e)=>{for(var t in e)Ax(n,t,{get:e[t],enumerable:!0})};var ax={};Rx(ax,{initializeFeatures:()=>N1,openWorkspaceFeature:()=>k1,setWorkspaceCandidate:()=>O1,workspaceBusy:()=>D1});function Gu(n={}){zo&&document.dispatchEvent(new CustomEvent("apex:context",{detail:{candidateId:zo,dealCard:Qi(),financialProfile:Ca(),dcfContext:gd(),...n}}))}function tn(n){document.dispatchEvent(new CustomEvent("apex:surface",{detail:n}))}function Yt(n){En=n,document.dispatchEvent(new CustomEvent("apex:busy",{detail:En})),wn.disabled=n,IM.disabled=n,ko.disabled=n,Xn.disabled=n,ay.disabled=n,qu.disabled=n,hy.disabled=n,Xi&&(Xi.disabled=n)}function ol(){try{let n=JSON.parse(window.localStorage.getItem("apex.journey.client"));if(/^[A-Za-z0-9_-]{16,128}$/.test(n||""))return n}catch{}return zo||crypto.randomUUID()}function Ci(n){return String(n??"").replace(/EstateLab/gi,"Apex Analytic").replace(/Jarvis/gi,"Apex")}function p(n){return Ci(n).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[e])}function ge(n,e){let t={"System ready":"Ready","Connection issue":"Offline","Voice interrupted":"Voice issue",Resetting:"Starting"}[n]||n;LM.innerHTML=`<i></i> ${p(t).toUpperCase()}`,PM.textContent=e,document.querySelector("#conversation").hidden&&/Connection issue|Voice interrupted/.test(n)&&document.dispatchEvent(new CustomEvent("apex:notice",{detail:e}))}function Ts(n){NM.textContent=n}function ob(n){let e=String(n||"").toLowerCase();return e.trim()?/\b(compare|comparison|versus| vs |which one|option a|option b|better between)\b/.test(` ${e} `)?{id:"compare",...cr.compare}:/\b(offer|negotiate|negotiation|booking|walk.?away|counter.?offer|asking price|max price)\b/.test(e)?{id:"offer",...cr.offer}:/\b(checklist|check list|steps|to.?do|action list|what next|next actions)\b/.test(e)?{id:"checklist",...cr.checklist}:/\b(voice|read|earphone|summary|short answer|brief)\b/.test(e)?{id:"voice",...cr.voice}:/\b(buy|purchase|deal|invest|shortlist|screen|condo|apartment|property|rent|rental|yield|price)\b/.test(e)?{id:"screen",...cr.screen}:{id:"chat",...cr.chat}:{id:"chat",...cr.chat}}function id(n=wn.value){let e=ob(n);return bp&&(bp.textContent=e.label,bp.title=e.prompt),_u.dataset.inputMode=e.id,_u.setAttribute("aria-label",e.prompt),wn.placeholder=e.placeholder,e}function pA(n){let e=Ci(n).replace(/\s+/g," ").trim();if(e.length<=520)return e;let t=e.match(/[^.!?]+[.!?]?/g)||[e],i="";for(let s of t){let r=`${i} ${s}`.trim();if(r.length>420)break;i=r}return`${i||e.slice(0,420)} Full answer is on screen.`}function sd(){try{let n=JSON.parse(window.localStorage.getItem(Qy)||"[]");return Array.isArray(n)?n.slice(0,12):[]}catch{return[]}}function fA(n=[]){window.localStorage.setItem(Qy,JSON.stringify(n.slice(0,12)))}function mA(){let n=sd();if(!n.length)return"";let e=n[0],t=Hf.map(i=>{let s=n.filter(r=>r.value===i.id).length;return s?`${i.label}: ${s}`:""}).filter(Boolean).join(", ");return[e?.note?`Latest feedback: ${e.note}`:"",t?`Recent feedback pattern: ${t}.`:""].filter(Boolean).join(" ")}function gA(n){if(!n)return"";let e=sd().find(t=>t.messageId===n)?.value||"";return`
    <section class="responseFeedback" data-feedback-message="${p(n)}" aria-label="Answer feedback">
      <span>Answer feel</span>
      ${Hf.map(t=>`
        <button type="button" data-response-feedback="${p(t.id)}" class="${e===t.id?"active":""}">
          ${p(t.label)}
        </button>
      `).join("")}
      <button type="button" data-response-refine hidden>REFINE NOW</button>
    </section>
  `}function vA(n={}){let e=Ci(n.refinementSource||n.answer||"").replace(/\s+/g," ").trim();return!e||n.value==="useful"?"":n.value==="shorter"?`Rewrite your previous answer into a short Apex answer: verdict, strongest reason, main risk, and next action only. Keep the same investment judgment unless new evidence is provided. Previous answer: ${e}`:n.value==="warmer"?`Rewrite your previous answer in a more natural mentor-like tone. Keep it human, direct, and calm. Do not weaken the evidence standard or change the verdict. Previous answer: ${e}`:n.value==="evidence"?`For your previous answer, give me the missing-proof checklist only. Separate hard stop, verify next, and optional evidence. Do not change the verdict without new evidence. Previous answer: ${e}`:""}function lb(n,e){let t=n?.querySelector("[data-response-refine]");if(!t)return;let i=vA(e);t.hidden=!i,t.disabled=!1,t.setAttribute("data-refinement-prompt",i),t.textContent=e?.value==="evidence"?"PROOF CHECK":"REFINE NOW"}function yA(n){n.querySelectorAll("[data-feedback-message]").forEach(e=>{let t=e.getAttribute("data-feedback-message")||"",i=sd().find(s=>s.messageId===t);i&&lb(e,i)})}async function bA(n){if(gt)try{let e=await We("/api/memory/answer-style",{method:"POST",body:JSON.stringify(n)});e?.stored&&!wa.hidden&&Wf(e.settings||{})}catch{}}function xA(n){let e=n.closest("[data-feedback-message]");if(!e)return;let t=e.getAttribute("data-feedback-message")||"",i=n.getAttribute("data-response-feedback")||"",s=Hf.find(l=>l.id===i);if(!t||!s)return;let r=Ci(e.closest(".message")?.querySelector(".messageText")?.textContent||"").replace(/\s+/g," ").trim(),a={messageId:t,value:i,label:s.label,note:s.note,answer:r.slice(0,180),refinementSource:r.slice(0,900),createdAt:new Date().toISOString()},o=[a,...sd().filter(l=>l.messageId!==t)];fA(o),e.querySelectorAll("[data-response-feedback]").forEach(l=>{l.classList.toggle("active",l===n)}),lb(e,a),ge("System ready",`Feedback saved. ${s.note}`),bA(a)}async function _A(n){let e=n.getAttribute("data-refinement-prompt")||"";if(e){n.disabled=!0;try{await Ia(e)}finally{n.disabled=!1}}}function tl(n){Ji=n==="register"?"register":"login";let e=Ji==="register";of.textContent=e?"CREATE ACCOUNT":"SIGN IN",UM.hidden=!e,ly.required=e,Cp.autocomplete=e?"new-password":"current-password",Rp.textContent=e?"CREATE ACCOUNT":"SIGN IN",cy.textContent=e?"SIGN IN":"CREATE ACCOUNT",uy.hidden=e||!fa,ya.textContent=""}function zf(n){uf.hidden=!n,lf.hidden=n||!!gt,of.textContent=n?"RESET PASSWORD":Ji==="register"?"CREATE ACCOUNT":"SIGN IN",ma.textContent="",n&&(Su.value=cf.value.trim(),Su.focus())}function ll(n){gt=n||null,document.dispatchEvent(new CustomEvent("apex:auth",{detail:gt}));let e=!!gt,t=String(gt?.displayName||"GUEST").trim().split(/\s+/)[0];if(OM.textContent=t.slice(0,16).toUpperCase(),lf.hidden=e,uf.hidden=!0,BM.hidden=!e,Wu.hidden=!e,Xu.hidden=!e,Yu.hidden=!e,KM.hidden=!e,py.hidden=!e,of.textContent=e?"ACCOUNT":Ji==="register"?"CREATE ACCOUNT":"SIGN IN",e||(dn(),hn(),pn(),nn(),fn(),mn(),gn(),un(),Vo=null),e){$M.textContent=gt.displayName,VM.textContent=gt.email;let i=fa||sb;Vv.textContent=gt.emailVerified?"VERIFIED":i?"UNVERIFIED":"VERIFICATION OPTIONAL",Vv.classList.toggle("verified",!!gt.emailVerified),wu.hidden=!!gt.emailVerified||!fa,Eu.hidden=!!gt.emailVerified||!fa,Mu.hidden=!!gt.emailVerified||!fa,nC()}Pi()}function Ma(){tn("account"),dn(),hn(),pn(),nn(),fn(),mn(),gn(),un(),Mn(),Tn(),af.hidden=!1,rf.setAttribute("aria-expanded","true"),document.body.classList.add("accountOpen"),ll(gt),gt||cf.focus()}function Bn(){af.hidden=!0,rf.setAttribute("aria-expanded","false"),document.body.classList.remove("accountOpen"),ya.textContent=""}function un(){Lf.hidden=!0,Pf.setAttribute("aria-expanded","false"),document.body.classList.remove("trustOpen"),fr="",rd()}function Gf(n=""){tn("trust"),fr=n,Bn(),dn(),hn(),pn(),nn(),fn(),mn(),gn(),Mn(),Tn(),Lf.hidden=!1,Pf.setAttribute("aria-expanded","true"),document.body.classList.add("trustOpen"),rd()}function cb(){try{return JSON.parse(window.localStorage.getItem(Xp)||"null")||null}catch{return window.localStorage.removeItem(Xp),null}}function ub(){return cb()?.version==="v6.1"}function rd(){let n=ub();IT.dataset.state=n?"accepted":"pending",PT.textContent=n?"Boundary acknowledged":"Acknowledgement required",LT.textContent=n?"Formal deal reports can run on this device. Professional review and live evidence still apply.":fr==="deal-analysis"?"Accept this boundary to continue with the formal deal report.":"You can chat freely. Deal reports require this boundary to be accepted first.",Fp.textContent=n?"ACKNOWLEDGED":fr==="deal-analysis"?"ACCEPT & ANALYSE":"I UNDERSTAND",Fp.disabled=n&&!fr}function SA(){window.localStorage.setItem(Xp,JSON.stringify({version:"v6.1",acceptedAt:new Date().toISOString(),scope:"formal-deal-reports"}));let n=fr;fr="",rd(),ge("System ready","Trust boundary acknowledged."),n==="deal-analysis"&&(un(),il())}function wA(n){return ub()?!0:(Gf(n),ge("Trust boundary","Acknowledge Apex's role before generating a formal report."),!1)}function EA(n){if(!n)return"";let e=new Date(n);return Number.isNaN(e.getTime())?"":new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(e)}function db(){let n=cb(),e=n?.version==="v6.1",t=EA(n?.acceptedAt);return{status:e?"accepted":"pending",label:e?"BOUNDARY ACCEPTED":"BOUNDARY PENDING",detail:e?`Accepted ${t||"on this device"}. Apex is decision support only; live proof and professional review still apply.`:"Apex is decision support only. Acknowledge the trust boundary before generating new formal reports.",checks:["Not legal, valuation, tax, banking, or financial-planning advice","Verify completed transactions, achieved rent, financing, title/legal, site, and supply evidence","No validation of false documents, hidden cashback, misleading prices, or lender deception"]}}function MA(){let n=db();return`
    <section class="analysisTrustStamp ${p(n.status)}" aria-label="Report trust boundary">
      <header><small>V6.2 REPORT TRUST STAMP</small><b>${p(n.label)}</b></header>
      <p>${p(n.detail)}</p>
      <div>${n.checks.map(e=>`<span>${p(e)}</span>`).join("")}</div>
    </section>
  `}function TA(){let n=db();return["Report trust boundary:",`- ${n.label}: ${n.detail}`,...n.checks.map(e=>`- ${e}`)]}function Po(n={},e="",t=[]){let i=Number(n.score||0),s=String(n.status||"").toLowerCase();return t.some(a=>e.includes(a))||!i||i<55||/missing|weak|danger|fail|reject/.test(s)?"required":i<75||/watch|review|partial|unknown/.test(s)?"verify":"ready"}function hb(n={}){let e=o=>Array.isArray(o)?o:o?[o]:[],t=[...e(n.hardStops),...e(n.recommendationBlockers),...e(n.missingEvidence),n.counterThesis||""].join(" ").toLowerCase(),i=Number(n.investorReadiness?.score||0),s=[{role:"Lawyer",label:"Title and transaction",status:Po(n.legalTransactionEvidence,t,["title","caveat","consent","restriction","spa","mot","legal"]),action:"Check title, caveat, restrictions, consent timeline, SPA conditions, outstanding charges, and transaction authority."},{role:"Banker",label:"Financing and valuation",status:Po(n.financingValuationEvidence,t,["loan","valuation","financing","dsr","bank","cashback","cash out"]),action:"Confirm valuation support, loan margin, DSR, disbursement timing, and that the structure does not mislead the lender."},{role:"Valuer / comparable proof",label:"Entry price evidence",status:Po(n.transactionComparableEvidence,t,["transaction","comparable","auction","price","value"]),action:"Verify completed subsale and successful auction comparables. Listing prices should not be treated as proof."},{role:"Management / JMB",label:"Site and building quality",status:Po(n.siteManagementEvidence,t,["management","jmb","lift","leak","defect","resident","site"]),action:"Check arrears, lift waiting time, cleanliness, defect pattern, management response, resident behaviour, and site feel."},{role:"Rental agent / property manager",label:"Achieved rent and tenant demand",status:Po(n.achievedRentalEvidence,t,["rent","tenant","vacancy","furnishing","rental"]),action:"Verify achieved rent, tenant profile, vacancy pressure, furnishing scope, and whether rent can cover recurring holding cost."},{role:"Owner / licensed adviser",label:"Personal affordability",status:i>=75?"ready":i>=55?"verify":"required",action:"Stress-test cash reserve, instalment comfort, life commitments, tax and transaction costs, renovation budget, and holding period."}],r=s.filter(o=>o.status==="required").length,a=s.filter(o=>o.status==="verify").length;return{status:r?"required":a?"verify":"ready",summary:r?`${r} professional review lane${r===1?"":"s"} need attention before commitment.`:a?`${a} review lane${a===1?"":"s"} should be verified before money moves.`:"Core professional review lanes look ready, subject to live evidence.",items:s}}function AA(n={}){let e=hb(n);return`
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
  `}function CA(n={}){let e=hb(n);return["Professional review checklist:",`- ${e.summary}`,...e.items.map(t=>`- ${t.role} / ${t.label} / ${t.status}: ${t.action}`)]}function Ki(n){return Array.isArray(n)?n.filter(Boolean):n?[n]:[]}function RA(n={}){return[...Ki(n.hardStops),...Ki(n.recommendationBlockers),...Ki(n.watchouts),...Ki(n.missingEvidence),n.counterThesis,n.challengeMode?.message,n.legalTransactionEvidence?.summary,n.legalTransactionEvidence?.transactionPosition,n.financingValuationEvidence?.summary,n.financingValuationEvidence?.affordabilityPosition,n.siteManagementEvidence?.summary].filter(Boolean).join(" ").toLowerCase()}function Ep(n={}){let e=String(n.status||"").toLowerCase(),t=Number(n.score||0);return/unsafe|danger|blocked|fail|reject/.test(e)||t>0&&t<25}function ad(n={}){let e=RA(n),t=[],i=(a,o,l)=>{t.some(c=>c.label===o)||t.push({level:a,label:o,action:l})};/marked.?up|mark.?up|hidden cashback|cashback|cash back|false document|fake document|mislead|lender deception|side agreement|side payment|direct payment|outside stakeholder|bypass/.test(e)&&i("refuse","Misleading financing or fund-flow risk","Apex will not validate artificial pricing, hidden cashback, false documents, side agreements, or lender deception."),(Ep(n.legalTransactionEvidence)||/caveat|title risk|seller authority|probate|bankrupt|litigation|restriction|consent|stakeholder/.test(e))&&i("refuse","Legal, title, or seller-authority stop","Pause until the lawyer clears title, caveat, restrictions, seller authority, stakeholder flow, arrears, and completion path."),(Ep(n.financingValuationEvidence)||/valuation mismatch|loan rejection|dsr|overleverage|bankability|loan margin/.test(e))&&i("block","Bankability or affordability risk","Do not force the financing. Confirm valuation support, DSR, cash buffer, instalment stress, and clean document readiness."),/bulk purchase|bulk-purchase|many auction|auction cases|investor concentration|airbnb|short.?stay/.test(e)&&i("block","Bulk-purchase or investor-concentration risk","Treat the project as exit-sensitive until ownership mix, auction pressure, resident quality, and rental sustainability are proven."),(Ep(n.siteManagementEvidence)||/management dispute|jmb|self interest|leak|defect|resident behaviour|poor management/.test(e))&&i("block","Project quality or management risk","Do not let cheap entry override poor management, defects, resident issues, or weak site evidence."),(String(n.verdict||"").toUpperCase()==="REJECT"||Ki(n.hardStops).length)&&i("refuse","Hard stop triggered","Resolve or walk away from hard stops before paying, signing, or committing further capital.");let r=t.filter(a=>a.level==="refuse").length?"refuse":t.length?"block":"clear";return{status:r,label:r==="refuse"?"APEX REFUSES VALIDATION":r==="block"?"VALIDATION BLOCKED":"NO UNSAFE STRUCTURE DETECTED",summary:r==="refuse"?"Apex will not validate this deal as structured. Independent legal, financing, and transaction review must clear the issue first.":r==="block"?"Apex cannot support commitment yet. Clear the blocked compliance or evidence lane before treating the deal as investable.":"No compliance-refusal pattern is detected from the supplied inputs. This is not legal clearance.",flags:t.length?t:[{level:"clear",label:"Boundary still applies",action:"Continue to verify live evidence, professional review, and clean financing or legal structure before committing."}]}}function IA(n={}){let e=ad(n);return`
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
  `}function PA(n={}){let e=ad(n);return["Unsafe deal boundary:",`- ${e.label}: ${e.summary}`,...e.flags.map(t=>`- ${t.level}: ${t.label}. ${t.action}`)]}function pb(n={}){let e=ad(n),t=Number(n.confidence||0),i=Number(n.averageScore||0),s=!!(gt&&Vo?.plan?.id&&Vo.plan.id!=="free"),r=gt?Vo?.plan?.name||"Signed-in plan":"Guest / public",a=e.status==="refuse"?"blocked":e.status==="block"||t<50||i<55?"conditional":t>=75&&i>=70?"higher":"moderate";return{status:a,label:a==="blocked"?"Do Not Market As Investable":a==="conditional"?"Conditional Public Confidence":a==="higher"?"Higher Confidence, Still Conditional":"Moderate Public Confidence",planName:r,summary:a==="blocked"?"This report should be treated as a refusal or unresolved-risk record, not a sales or investment endorsement.":"Public confidence is limited by evidence quality, hard-stop status, and professional review. Payment status never upgrades a verdict.",items:[{label:"Payment boundary",body:`${s?`${r} unlocks more workflow capacity.`:`${r} access may be limited.`} Plans affect report access, saved history, and usage limits only; they never improve scores or remove hard stops.`},{label:"Confidence source",body:`Confidence is ${t||0}% and decision score is ${i||0}/100 because of supplied evidence, not because of account status or payment.`},{label:"Public use",body:"Do not present this report as guaranteed return, valuation, legal clearance, loan approval, or personalized licensed financial advice."}]}}function LA(n={}){let e=pb(n);return`
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
  `}function NA(n={}){let e=pb(n);return["Public confidence and monetization guardrails:",`- ${e.label} / ${e.planName}: ${e.summary}`,...e.items.map(t=>`- ${t.label}: ${t.body}`)]}function Lo(n=[],e=/reject|weak|poor|high threat|serious|many|stale|delay|dispute|bad|none|not done|not supplied/i){let t=n.filter(i=>String(i||"").trim());return t.length?t.some(i=>e.test(String(i)))?"watch":"ready":"missing"}function ys(n=[],e="Not supplied"){let t=n.filter(i=>String(i||"").trim());return t.length?t.join(" / "):e}function fb(n={}){let e=n.context?.dealCard||{},t=n.marketIntelligence||{},i=Array.isArray(t.observations)?t.observations:[],s=Array.isArray(t.trends)?t.trends:[],r=t.summary||{},a={project:e.projectName||"Project not specified",area:e.area||"Area not specified",segment:ys([e.propertyType,e.propertyAge?`${e.propertyAge} years`:""],"Segment not supplied"),tenure:ys([e.tenure,e.legalTitleType],"Tenure/title not supplied"),price:ys([e.askingPrice,e.conservativeFairValue?`value ${e.conservativeFairValue}`:""],"Price/value not supplied")},o=[{label:"Owner observations",value:i.length?`${i.length} matched, ${s.length} trend${s.length===1?"":"s"}`:"No matched project memory",status:i.length?"ready":"missing",action:i.length?"Use the observations as project memory, but check dates and source confidence.":"Add dated owner observations for rent, transaction, occupancy, management, supply, auction, or buyer enquiry."},{label:"Supply moat",value:ys([e.supplyRadius,e.substituteCount,e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply]),status:Lo([e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply],/high|serious|many|oversupply|vp|unsold|lift|wait|dense|1\.5k/i),action:"Track closest substitutes within 2.5km, VP timing, unsold stock, layout overlap, and lift/density pressure."},{label:"Management culture",value:ys([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes]),status:Lo([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes],/poor|slow|no reply|arrears|dispute|complaint|bad|leak|defect|arrogant|irresponsible/i),action:"Verify JMB response speed, arrears, resident behaviour, common-area upkeep, defects, and complaint culture."},{label:"Buyer depth",value:ys([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation]),status:Lo([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation],/investor only|weak|poor|narrow|airbnb|short.?stay|none/i),action:"Confirm the project can appeal to own-stay buyers and investors instead of one narrow exit pool."},{label:"Liquidity proof",value:ys([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport]),status:Lo([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport],/none|old|stale|listing|weak|mismatch|not done/i),action:"Use completed subsale transactions, successful auction bids, bankability, and matched comparable adjustments before trusting value."},{label:"Rental defence",value:ys([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal]),status:Lo([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal],/none|weak|stale|vacancy|incentive|seasonal|drop|poor/i),action:"Confirm achieved rent, tenant urgency, furnishing gap, vacancy pressure, and whether rent can defend the instalment."}],l=o.filter(h=>h.status==="missing").length,u=o.filter(h=>h.status==="watch").length?"watch":l>=3?"thin":l?"partial":"tracked",d=e.projectName||e.area||"Development profile";return{status:u,title:d,identity:a,evidence:o,observationCount:i.length,trendCount:s.length,freshness:r.warning||(i.length?"Owner observations matched. Verify freshness before relying on them.":"No dated owner observation matched this project or area yet."),summary:u==="watch"?"Development intelligence has live warning signals. Treat the project profile as a watchlist item until the weak lane is cleared.":u==="tracked"?"Development intelligence is well formed enough for project-level comparison, subject to live verification.":u==="partial"?`Development intelligence is partial. Fill the missing lane${l===1?"":"s"} before treating the project view as mature.`:"Development intelligence is still thin. Apex can screen the deal, but it should not behave like it knows the project deeply yet."}}function DA(n={}){let e=fb(n),t=[["Project",e.identity.project],["Area",e.identity.area],["Segment",e.identity.segment],["Tenure/title",e.identity.tenure],["Price/value",e.identity.price]];return`
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
  `}function OA(n={}){let e=fb(n);return["Development intelligence profile:",`- V7.0 ${e.title} / ${e.status}: ${e.summary}`,`- Identity: ${e.identity.project}; ${e.identity.area}; ${e.identity.segment}; ${e.identity.tenure}; ${e.identity.price}.`,`- Freshness: ${e.freshness}`,...e.evidence.map(t=>`- ${t.label} / ${t.status}: ${t.value}. ${t.action}`)]}function kA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.observationHealth||{};return`
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
  `}function UA(n={}){if(!n.summary)return[];let e=["V7 development intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Build evidence first"}.`,`- Owner observations: ${n.observationHealth?.matched||0} matched, ${n.observationHealth?.fresh||0} fresh, ${n.observationHealth?.aging||0} aging, ${n.observationHealth?.stale||0} stale.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V7 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function FA(n={}){if(!n.summary)return"";let e=Array.isArray(n.cases)?n.cases:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[];return`
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
              <header><span><small>${p([i.area,i.propertyType].filter(Boolean).join(" / ")||"Development case")}</small><b>${p(i.projectName)}</b></span><em>${p(tm(i.verdict))} / ${p(i.confidence||"medium")}</em></header>
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
  `}function BA(n={}){if(!n.summary)return[];let e=["Development case library:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Case-informed, verify live"}.`];for(let t of n.cases||[])e.push(`- ${t.projectName}: ${tm(t.verdict)} / ${t.confidence||"medium"} confidence / ${t.rating||0}/100. ${t.ownerVerdict||t.summary||""}`);if(n.actionQueue?.length){e.push("Case action queue:");for(let t of n.actionQueue)e.push(`- ${t.label}: ${t.action}`)}return e}function $A(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.matchedEvidence)?n.matchedEvidence:[],i=Array.isArray(n.actionQueue)?n.actionQueue:[],s=n.vaultHealth||{};return`
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
  `}function VA(n={}){if(!n.summary)return[];let e=["V8 document intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Evidence-building mode"}.`,`- Vault: ${n.vaultHealth?.documents||0} documents, ${n.vaultHealth?.indexed||0} indexed, ${n.vaultHealth?.matched||0} matched, ${n.vaultHealth?.mode||"none"} retrieval.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.matchedEvidence?.length){e.push("Matched owner evidence:");for(let t of n.matchedEvidence)e.push(`- ${t.title}: ${t.preview}`)}if(n.actionQueue?.length){e.push("V8 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function HA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.capitalMap||{};return`
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
  `}function zA(n={}){if(!n.summary)return[];let e=n.capitalMap||{},t=["V9 portfolio command stack:",`- ${n.status||"hold"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Hold and verify"}.`,`- Next move: ${n.nextMove||"Clear the weakest portfolio lane."}`,`- Capital map: cash ${e.cashAvailable||"n/a"}, outlay ${e.cashOutlay||"n/a"}, after purchase ${e.cashAfterPurchase||"n/a"}, reserve ${e.reserveMonths||"n/a"}, DSR ${e.postDealDsr||"n/a"}, holding ${e.holdingCashFlow||"n/a"}, stress ${e.stressedHolding||"n/a"}.`];for(let i of n.lanes||[])t.push(`- ${i.version} ${i.label}: ${i.status}, ${i.score}/100. ${i.reading} Action: ${i.action}`);if(n.actionQueue?.length){t.push("V9 action queue:");for(let i of n.actionQueue)t.push(`- ${i.version} ${i.label}: ${i.action}`)}return t}function GA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=Array.isArray(n.contradictions)?n.contradictions:[];return`
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
  `}function WA(n={}){if(!n.summary)return[];let e=["V10 final command stack:",`- ${n.command||"INVESTIGATE FIRST"} (${n.score||0}/100): ${n.summary}`,`- Status: ${n.status||"investigate"}.`,`- Next move: ${n.nextMove||"Clear the weakest V10 lane."}`,`- Contradictions: ${n.contradictionCount||0}.`];for(let t of n.contradictions||[])e.push(`- Contradiction: ${t}`);for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V10 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function ey(n){return n==="memory"?"MEMORY":n==="journal"?"JOURNAL":n==="market"?"MARKET":n==="case"?"CASE":n==="saved_report"?"SAVED DEAL":n==="belief"?"BELIEF":n==="decision"?"DECISION":n==="evidence"?"EVIDENCE":n==="research"?"VERIFIED RESEARCH":"REFERENCE"}function mb(n=[]){if(!n.length)return"";let e=n.reduce((a,o)=>{let l=o?.type||"reference";return a[l]=(a[l]||0)+1,a},{}),t=Object.entries(e).map(([a,o])=>`${o} ${ey(a).toLowerCase()}${o===1?"":" sources"}`).slice(0,5).join(" / "),s=n.some(a=>["evidence","market","case","research","saved_report"].includes(a.type))?"Deal-specific or dated evidence matched. Confirm its date, scope, and fit before acting.":"Framework guidance only. No deal-specific market evidence matched this answer.",r=n.slice(0,8).map(a=>`
    <li>
      <span class="sourceType">${p(ey(a.type))}</span>
      <b>${p(a.title||"Untitled source")}</b>
      ${a.preview?`<small>${p(a.preview)}</small>`:""}
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
  `}function qA(n={}){if(!n||typeof n!="object")return"";let e=Array.isArray(n.prompts)?n.prompts.slice(0,4):[],t=Array.isArray(n.missing)?n.missing.slice(0,4):[];return!e.length&&!t.length?"":`
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
  `}function jA(n){let t=String(n||"").replace(/^#{1,6}\s*/,"").replace(/^\*{1,2}|\*{1,2}$/g,"").replace(/:$/,"").trim().toLowerCase();return[[/^current view(?:\b|\s*[—-])/,"Current view"],[/^(what supports it|what drives it|reasons|why)$/,"What supports it"],[/^(strongest counter-case|counter-case|what could make it wrong|watch-outs)$/,"Strongest counter-case"],[/^(what would change my mind|what would change the view|evidence gaps|missing evidence)$/,"What would change the view"],[/^(next best move|next move|check next|next steps?)$/,"Next best move"],[/^(questions? for you|my challenge back|questions? that can change the answer)$/,"Questions for you"],[/^(blind spot|alternative angle|blind spot \/ alternative angle|what you may be missing)$/,"Blind spot / alternative angle"]].find(([s])=>s.test(t))?.[1]||""}function XA(n,e=!1){let t=[],i=null,s=()=>{i?.items.length&&t.push(i),i=null};for(let a of n){let o=String(a||"").replace(/\*\*/g,"").trim();if(!o){s();continue}let l=o.match(/^[-*•]\s+(.+)/),c=o.match(/^\d+[.)]\s+(.+)/),u=c?"ol":l?"ul":"p",d=c?.[1]||l?.[1]||o;(!i||i.type!==u)&&(s(),i={type:u,items:[]}),i.items.push(d)}s();let r=!1;return t.map(a=>a.type==="ul"||a.type==="ol"?`<${a.type}>${a.items.map(o=>`<li>${p(o)}</li>`).join("")}</${a.type}>`:a.items.map(o=>{let l=e&&!r?' class="answerLead"':"";return r=!0,`<p${l}>${p(o)}</p>`}).join("")).join("")}function YA(n){let e=String(n||"").replace(/\r\n/g,`
`).trim().split(`
`),t=[],i={title:"",lines:[]},s=()=>{(i.title||i.lines.some(r=>r.trim()))&&t.push(i),i={title:"",lines:[]}};for(let r of e){let a=jA(r);a?(s(),i.title=a):i.lines.push(r)}return s(),t.map((r,a)=>{let o=XA(r.lines,a===0&&!r.title);return r.title?`<section class="answerSection"><h3>${p(r.title)}</h3>${o}</section>`:`<div class="answerBody">${o}</div>`}).join("")}function gb({mode:n="",provider:e="",model:t=""}={}){return n==="framework"?'<span class="intelligenceBadge framework" title="No external reasoning model generated this response"><i></i>FRAMEWORK ONLY</span>':n!=="llm"?"":'<span class="intelligenceBadge reasoning" title="External AI reasoning was used for this response"><i></i>FRAMEWORK + AI</span>'}function ws(n,e,t=[],i={}){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=n==="jarvis"?i?.message?.id||i?.id||`local-${Date.now()}-${Math.random().toString(16).slice(2)}`:"";s.className=`message ${n}`,s.innerHTML=`
    <strong>${n==="jarvis"?"APEX":"YOU"}</strong>
    ${n==="jarvis"?gb(i):""}
    <div class="messageText">${n==="jarvis"?YA(e):p(e).replace(/\n/g,"<br>")}</div>
    ${n==="jarvis"?mb(t):""}
    ${n==="jarvis"?qA(i.contextCoach):""}
    ${n==="jarvis"?gA(r):""}
  `;let a=s.querySelector(".contextCoach");if(a){let o=document.createElement("details");o.className="response-detail",o.innerHTML="<summary>Context and suggested checks</summary>",a.replaceWith(o),o.append(a)}Gt.append(s),n==="jarvis"&&yA(s),Gt.scrollTop=Gt.scrollHeight}function ha(n,e){if(!e)return"";let t=Array.isArray(e)?e.filter(Boolean).slice(0,2).join("; "):e;return t?`<span><small>${p(n)}</small><b>${p(t)}</b></span>`:""}function KA(n={}){let e=Number(n.approvedCount||0);WM.textContent=e?`${n.investorType||"Profile building"} / ${n.riskStyle||"Needs more memory"}`:"No approved memory yet",qM.textContent=`${Math.max(0,Math.min(100,Number(n.completeness||0)))}%`,jM.textContent=n.summary||"Approve memories to build a private investor profile.",XM.innerHTML=e?[ha("Preferred",n.preferredAssets),ha("Avoid",n.avoidedRisks),ha("Cash flow",n.cashFlowRule),ha("Holding",n.holdingPeriod),ha("Rules",n.investmentRules),ha("Warnings",n.personalWarnings)].filter(Boolean).join(""):""}function JA(n){let e=n.status==="pending";return`
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
  `}function Wf(n={}){let e=!!n.captureEnabled,t=!!n.reasoningEnabled,i=n.answerStyle||{};Jp=!0,Uo.checked=e,Fo.checked=t,Jp=!1;let s=e||t?`Memory ${e?"can suggest items from chat":"will not suggest from chat"}; approved memory ${t?"can guide replies and reports":"will not guide reasoning"}.`:"Memory engine ready. Collection is off.",r=i.feedbackCount?` Answer style memory: ${i.latestLabel||"Learning"} (${i.feedbackCount} saved).`:"";zv.textContent=`${s}${r}`,zv.classList.toggle("active",e||t)}function ZA(n={}){let e=Array.isArray(n.items)?n.items:[];Wf(n.settings||n.summary||{}),KA(n.profile||{}),zM.textContent=String(n.summary?.approved||0),GM.textContent=String(n.summary?.pending||0),Tu.innerHTML=e.length?e.slice().sort((t,i)=>{let s={pending:0,approved:1};return s[t.status]-s[i.status]||String(i.updatedAt).localeCompare(String(t.updatedAt))}).map(JA).join(""):'<p class="memoryEmpty">No long-term memories yet. Auto-capture is off until you enable it, or you can add one manually above.</p>'}async function od(){let n=await We("/api/memory");return ZA(n),n}function dn(){wa.hidden=!0,Wu.setAttribute("aria-expanded","false"),document.body.classList.remove("memoryOpen")}async function vb(){if(tn("memory"),!gt)return Ma();Bn(),hn(),pn(),nn(),fn(),mn(),gn(),un(),Mn(),Tn(),wa.hidden=!1,Wu.setAttribute("aria-expanded","true"),document.body.classList.add("memoryOpen"),Tu.innerHTML='<p class="memoryEmpty">Loading private memory...</p>';try{await od()}catch(n){Tu.innerHTML=`<p class="memoryEmpty">${p(n.message)}</p>`}}async function QA(n,e){return e==="delete"?(await We(`/api/memory/${encodeURIComponent(n)}`,{method:"DELETE"}),null):We(`/api/memory/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:e})})}async function yb(){if(!Jp){Uo.disabled=!0,Fo.disabled=!0;try{let n=await We("/api/memory/settings",{method:"PATCH",body:JSON.stringify({captureEnabled:Uo.checked,reasoningEnabled:Fo.checked})});Wf(n.settings||{}),ge("System ready","Memory settings updated.")}catch(n){ge("Connection issue",n.message||"Memory settings could not be updated."),wa.hidden||await od().catch(()=>{})}finally{Uo.disabled=!1,Fo.disabled=!1}}}async function eC(n){let e=n.getAttribute("data-memory-id"),t=n.getAttribute("data-memory-action");if(!(!e||!t)){n.disabled=!0;try{await QA(e,t),document.querySelectorAll(`[data-memory-item="${CSS.escape(e)}"]`).forEach(i=>i.remove()),wa.hidden||await od(),ge("System ready",t==="approve"?"Memory approved.":t==="delete"?"Memory forgotten.":"Memory skipped.")}catch(i){ge("Connection issue",i.message||"Memory could not be updated."),n.disabled=!1}}}function tC(n){if(!n?.id)return;let e=document.createElement("article");e.className="memorySuggestion",e.setAttribute("data-memory-item",n.id),e.innerHTML=`
    <span><small>${p(n.categoryLabel||"LONG-TERM MEMORY")}</small><b>Remember this?</b></span>
    <p>${p(n.content)}</p>
    <em>${p(n.profileImpact||"Review this before it becomes part of your private profile.")}</em>
    <div class="memoryActions">
      <button type="button" data-memory-action="approve" data-memory-id="${p(n.id)}">KEEP</button>
      <button type="button" data-memory-action="dismiss" data-memory-id="${p(n.id)}">SKIP</button>
    </div>
  `,Gt.append(e),Gt.scrollTop=Gt.scrollHeight}function ld(n){if(!n)return;Vo=n,JM.textContent=n.plan.name.toUpperCase(),ZM.textContent=`${n.usage.remaining} reports remaining this month`;let t=Ou.filter(i=>i.id!=="free"&&i.id!==n.plan.id).filter(i=>i.checkoutAvailable);ju.innerHTML=t.length?t.map(i=>`<button type="button" data-checkout-plan="${p(i.id)}">${p(i.name.toUpperCase())} / RM${p(i.priceRm)}</button>`).join(""):"<small>UPGRADES READY AFTER CHECKOUT CONFIGURATION</small>",tT.textContent=`${n.plan.name.toUpperCase()} / ${n.usage.remaining} LEFT`,py.textContent=`${n.plan.name} controls report access, storage, and usage limits only. It never changes scores, hard stops, or recommendations.`}async function nC(){if(!gt)return null;try{let[n,e]=await Promise.all([We("/api/billing/plans"),We("/api/billing/status")]);return Ou=n.plans||[],ld(e),e}catch{return ju.innerHTML="<small>PLAN STATUS UNAVAILABLE</small>",null}}async function iC(n){let e=ju.querySelector(`[data-checkout-plan="${CSS.escape(n)}"]`);e&&(e.disabled=!0);try{let t=await We("/api/billing/checkout",{method:"POST",body:JSON.stringify({plan:n})});window.location.assign(t.checkoutUrl)}catch(t){ge("Connection issue",t.message||"Checkout is not available yet."),e&&(e.disabled=!1)}}function sC(n){let e=n.weakestDimension,t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="reportHistoryItem" data-report-item="${p(n.id)}">
      <header><span><small>${p(n.verdict)} / ${p(t)}</small><b>${p(n.subject)}</b></span><em>${p(n.averageScore)}/100</em></header>
      <p>${e?`Weak link: ${p(e.label)} (${p(e.score)}/100)`:"Evidence details unavailable"}</p>
      <div class="reportHistoryActions">
        <button type="button" data-report-action="view" data-report-id="${p(n.id)}">VIEW</button>
        <button type="button" data-report-action="delete" data-report-id="${p(n.id)}">DELETE</button>
      </div>
    </article>
  `}function bb(n={}){document.querySelector("#savedReportView").hidden=!0,mr.hidden=!1;let e=Array.isArray(n.reports)?n.reports:[];eT.textContent=String(e.length),mr.innerHTML=e.length?e.map(sC).join(""):'<p class="reportsEmpty">No saved deal reports yet. Signed-in analyses will appear here automatically.</p>',n.billing&&ld(n.billing)}function hn(){hf.hidden=!0,Xu.setAttribute("aria-expanded","false"),document.body.classList.remove("reportsOpen")}async function qf(){if(tn("reports"),!gt)return Ma();Bn(),dn(),pn(),nn(),fn(),mn(),gn(),un(),Mn(),Tn(),hf.hidden=!1,Xu.setAttribute("aria-expanded","true"),document.body.classList.add("reportsOpen"),mr.innerHTML='<p class="reportsEmpty">Loading private reports...</p>';try{bb(await We("/api/reports"))}catch(n){mr.innerHTML=`<p class="reportsEmpty">${p(n.message)}</p>`}}async function rC(n){let e=n.getAttribute("data-report-id"),t=n.getAttribute("data-report-action");if(!(!e||!t||En)){Yt(!0),n.disabled=!0;try{if(t==="delete"){await We(`/api/reports/${encodeURIComponent(e)}`,{method:"DELETE"}),bb(await We("/api/reports"));return}let i=await We(`/api/reports/${encodeURIComponent(e)}`),s=document.querySelector("#savedReportView");mr.hidden=!0,s.hidden=!1,s.innerHTML='<button type="button" data-report-back>Back to saved reports</button>',i.report.analysis.savedReportId=i.report.id,sm(i.report.analysis,[],{},s),ld(i.billing),ge("System ready",`${i.report.subject} report loaded.`)}catch(i){ge("Connection issue",i.message||"The saved report is unavailable."),n.disabled=!1}finally{n.disabled=!1,Yt(!1)}}}function aC(n){let e=n.reviewed?"REVIEWED":n.locked?"LOCKED":"DRAFT",t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="journalItem ${p(e.toLowerCase())}" data-journal-item="${p(n.id)}">
      <header><span><small>${p(e)} / ${p(t)}</small><b>${p(n.subject)}</b></span><em>${p(n.decision)}</em></header>
      <p>${p(n.skillSignal)}</p>
      <div class="journalItemMeta"><span>REPORT ${p(n.snapshotScore)}/100</span><span>CONFIDENCE ${p(n.confidence)}%</span></div>
      <button type="button" data-journal-action="open" data-journal-id="${p(n.id)}">${n.locked?"REVIEW":"EDIT DRAFT"}</button>
    </article>
  `}function oC(n={}){let e=Array.isArray(n.decisions)?n.decisions:[];iT.textContent=String(n.summary?.total||0),sT.textContent=String(n.summary?.reviewed||0),ba.innerHTML=e.length?e.map(aC).join(""):'<p class="journalEmpty">No decisions recorded yet. Open a saved Deal Report and choose RECORD DECISION.</p>',fy.hidden=!1,ba.hidden=!1,Lp.hidden=!0}function pn(){pf.hidden=!0,Yu.setAttribute("aria-expanded","false"),document.body.classList.remove("journalOpen")}async function jf(){let n=await We("/api/journal");return oC(n),n}async function cd(n=""){if(tn("journal"),!gt)return Ma();Bn(),dn(),hn(),nn(),fn(),mn(),gn(),un(),Mn(),Tn(),pf.hidden=!1,Yu.setAttribute("aria-expanded","true"),document.body.classList.add("journalOpen"),ba.innerHTML='<p class="journalEmpty">Loading private decisions...</p>';try{await jf(),n&&await xb(n)}catch(e){ba.innerHTML=`<p class="journalEmpty">${p(e.message)}</p>`}}function lC(n){for(let e of[ff,mf,gf,vf,yf,bf,xf])e.disabled=n}function ud(n){let e=!!n.lockedAt;sl.value=n.id,aT.textContent=n.subject,ff.value=n.prePurchase.decision,mf.value=n.prePurchase.confidence,gf.value=n.prePurchase.holdingPeriod,vf.value=n.prePurchase.thesis,yf.value=n.prePurchase.counterThesis,bf.value=n.prePurchase.killCriterion,xf.value=n.prePurchase.notes,my.value=n.outcome.status==="not_reviewed"?"holding":n.outcome.status,gy.value=n.outcome.actualRent,vy.value=n.outcome.currentValue,yy.value=n.outcome.processScore,by.value=n.outcome.executionScore,xy.value=n.outcome.outcomeScore,_y.value=n.outcome.luckScore,Sy.value=n.outcome.result,wy.value=n.outcome.lesson,lC(e),oT.hidden=e,wi.dataset.confirming="false",wi.textContent="LOCK THESIS",uT.hidden=!e,dT.hidden=!e,Un.textContent=n.outcome.reviewedAt?`Review saved. ${n.outcome.reviewedAt.slice(0,10)}.`:"",fy.hidden=!0,ba.hidden=!0,Lp.hidden=!1,Lp.scrollTop=0}async function xb(n){let e=await We(`/api/journal/${encodeURIComponent(n)}`);return ud(e.decision),e.decision}function _b(){return{action:"update",decision:ff.value,confidence:mf.value,holdingPeriod:gf.value,thesis:vf.value,counterThesis:yf.value,killCriterion:bf.value,notes:xf.value}}async function cC(){let n=sl.value;Un.textContent="Saving draft...";try{let e=await We(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(_b())});ud(e.decision),Un.textContent="Draft saved."}catch(e){Un.textContent=e.message,wi.textContent="LOCK THESIS"}}async function uC(){let n=sl.value;Un.textContent="Locking the pre-purchase record...";try{await We(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(_b())});let e=await We(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"lock"})});ud(e.decision),Un.textContent="Thesis locked. Future reviews cannot rewrite it."}catch(e){Un.textContent=e.message,wi.textContent="LOCK THESIS"}}function dC(){if(wi.dataset.confirming!=="true"){wi.dataset.confirming="true",wi.textContent="CONFIRM LOCK",Un.textContent="Locking is permanent. Press CONFIRM LOCK to preserve this thesis unchanged.";return}wi.dataset.confirming="false",wi.textContent="LOCKING...",uC()}async function hC(){let n=sl.value;Un.textContent="Saving outcome review...";try{let e=await We(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"review",outcomeStatus:my.value,actualRent:gy.value,currentValue:vy.value,processScore:yy.value,executionScore:by.value,outcomeScore:xy.value,luckScore:_y.value,result:Sy.value,lesson:wy.value})});ud(e.decision),Un.textContent=e.summary.skillSignal}catch(e){Un.textContent=e.message}}async function pC(){let n=sl.value;Un.textContent="Deleting draft...";try{await We(`/api/journal/${encodeURIComponent(n)}`,{method:"DELETE"}),await jf(),ge("System ready","Decision draft deleted.")}catch(e){Un.textContent=e.message}}async function Sb(n){if(!gt)return ge("System ready","Sign in to preserve a private decision record."),Ma();if(!n?.savedReportId){ge("System ready","Open a saved Deal Report before recording the decision.");return}try{let e=await We("/api/journal",{method:"POST",body:JSON.stringify({reportId:n.savedReportId})});await cd(e.decision.id)}catch(e){ge("Connection issue",e.message||"The decision record could not be created.")}}function Xf(){try{let n=JSON.parse(window.localStorage.getItem(Zp())||"[]");return Array.isArray(n)?n.slice(0,4):[]}catch{return window.localStorage.removeItem(Zp()),[]}}function dd(n){let e=n.slice(0,4);return window.localStorage.setItem(Zp(),JSON.stringify(e)),Qu.textContent=e.length?`SHORTLIST ${e.length}`:"SHORTLIST",e}function Zp(){return gt?`${Qv}:${gt.id}`:Qv}function Ta(n){let e=n?.context?.dealCard||{};return e.projectName||e.area||"Untitled deal"}function Yf(n){return[...n.dimensions||[]].sort((e,t)=>Number(e.score||0)-Number(t.score||0))[0]||null}function Fu(n){return[...n.hardStops||[],...n.recommendationBlockers||[]].filter(Boolean)}function xu(n){let e=Fu(n).length*18,t=["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?24:0,i=Yf(n),s=i&&Number(i.score||0)<55?10:0;return Math.max(0,Number(n.averageScore||0)-e-t-s)}function fC(n){if(!n.length)return"";let e=n.slice().sort((a,o)=>xu(o)-xu(a)),t=e.filter(a=>!Fu(a).length&&!["REJECT","PAUSE"].includes(String(a.verdict||"").toUpperCase())),i=t[0]||e[0],s=n.filter(a=>Fu(a).length||["REJECT","PAUSE"].includes(String(a.verdict||"").toUpperCase())).length,r=Yf(i);return`
    <section class="shortlistCompare">
      <span><small>APEX COMPARISON</small><b>${p(t.length?"Cleanest current pick":"No clean pick yet")}</b></span>
      <strong>${p(i.subject)}</strong>
      <div>
        <em>${p(xu(i))} adjusted</em>
        <em>${p(s)} blocked</em>
        <em>${p(r?`${r.label}: ${r.score}`:"weak link: n/a")}</em>
      </div>
      <p>${p(t.length?"Compare the adjusted score, then check the weak link before choosing.":"Clear hard stops and decision blockers before treating any shortlisted deal as a contender.")}</p>
    </section>
  `}function mC(n){let e=(n.dimensions||[]).map(l=>`
    <span class="shortlistDimension ${p(l.status)}">
      <small>${p(l.label)}</small><b>${p(l.score)}</b>
    </span>
  `).join(""),t=Yf(n),i=Fu(n),s=n.investorReadiness?.label||"Readiness unknown",r=n.decisionFocus?.body||n.summary||"No decision focus recorded.",a=n.learningLoop?.signals?.length||0;return`
    <article class="shortlistItem ${i.length||["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?"blocked":"clean"}" data-shortlist-item="${p(n.id)}">
      <header><span><small>${p(n.verdict)} / ${p(s)}</small><b>${p(n.subject)}</b></span><em>${p(xu(n))} adj</em></header>
      <div class="shortlistDimensions">${e}</div>
      <p><b>Weak link</b> ${p(t?`${t.label} (${t.score}/100)`:"Evidence not available")}</p>
      <p><b>Decision focus</b> ${p(r)}</p>
      <div class="shortlistSignals">
        <span>${p(i.length)} blocker${i.length===1?"":"s"}</span>
        <span>${p(a)} learning signal${a===1?"":"s"}</span>
        <span>${p(n.confidence||0)}% confidence</span>
      </div>
      <div class="shortlistActions">
        <button type="button" data-shortlist-action="load" data-shortlist-id="${p(n.id)}">LOAD DEAL</button>
        <button type="button" data-shortlist-action="remove" data-shortlist-id="${p(n.id)}">REMOVE</button>
      </div>
    </article>
  `}function cl(){let n=Xf();dd(n),cA.innerHTML=fC(n),Jy.innerHTML=n.length?n.map(mC).join(""):'<p class="shortlistEmpty">No analysed deals saved yet. Run an analysis, then choose SAVE TO SHORTLIST.</p>',Zy.hidden=!n.length,Pi()}function Mn(){Bf.hidden=!0,Qu.setAttribute("aria-expanded","false"),document.body.classList.remove("shortlistOpen")}function Kf(){tn("shortlist"),Bn(),dn(),hn(),pn(),nn(),fn(),mn(),gn(),un(),Tn(),cl(),Bf.hidden=!1,Qu.setAttribute("aria-expanded","true"),document.body.classList.add("shortlistOpen")}function wb(n){let e=n?.context?.dealCard||{},t=Ta(n),i=`${t}|${e.askingPrice||""}`.toLowerCase().replace(/[^a-z0-9|]+/g,"-"),s={id:i,subject:t,savedAt:new Date().toISOString(),verdict:n.verdict,summary:n.summary,averageScore:n.averageScore,confidence:n.confidence,dimensions:n.dimensions||[],metrics:n.metrics||[],scenarios:n.scenarios||[],stressEnvelope:n.stressEnvelope||null,acquisitionCostEstimate:n.acquisitionCostEstimate||null,portfolioGate:n.portfolioGate||null,marketPulse:n.marketPulse||null,holdExitPlan:n.holdExitPlan||null,decisionSeal:n.decisionSeal||null,siteVisitAssistant:n.siteVisitAssistant||null,sourcingProfessional:n.sourcingProfessional||null,tenantRentalPlan:n.tenantRentalPlan||null,exitStrategy:n.exitStrategy||null,hardStops:n.hardStops||[],recommendationBlockers:n.recommendationBlockers||[],decisionFocus:n.decisionFocus||null,personalizedChallenge:n.personalizedChallenge||null,dealMemoryComparison:n.dealMemoryComparison||null,beliefTracker:n.beliefTracker||null,sourceTransparency:n.sourceTransparency||null,memoryConflicts:n.memoryConflicts||null,personalOperatingRules:n.personalOperatingRules||null,investorReadiness:n.investorReadiness||null,productExperience:n.productExperience||null,learningLoop:n.learningLoop||null,evidenceEngine:n.evidenceEngine||null,transactionComparableEvidence:n.transactionComparableEvidence||null,achievedRentalEvidence:n.achievedRentalEvidence||null,financingValuationEvidence:n.financingValuationEvidence||null,supplyAbsorptionEvidence:n.supplyAbsorptionEvidence||null,siteManagementEvidence:n.siteManagementEvidence||null,legalTransactionEvidence:n.legalTransactionEvidence||null,developmentIntelligence:n.developmentIntelligence||null,caseIntelligence:n.caseIntelligence||null,documentIntelligence:n.documentIntelligence||null,portfolioCommand:n.portfolioCommand||null,finalCommand:n.finalCommand||null,residentialDcf:n.residentialDcf||null,marketIntelligence:n.marketIntelligence||null,counterThesis:n.counterThesis,context:n.context||{}},r=Xf().filter(a=>a.id!==i);return dd([s,...r]),s}function gC(n){let e=n?.context?.dealCard||{},t=n?.context?.financialProfile||{};for(let s of Es){let r=s.getAttribute("data-deal-field");s.value=e[r]||""}for(let s of yr){let r=s.getAttribute("data-profile-field");s.value=t[r]||""}Hu(Es,"data-deal-field",$f),Hu(yr,"data-profile-field",Vf),Mn();let i=Mi.find(s=>s.getAttribute("data-context-toggle")==="deal");i&&Ti(i,!0),ge("System ready",`${n.subject} loaded for review.`)}function vC(n){let e=n.getAttribute("data-shortlist-id"),t=n.getAttribute("data-shortlist-action"),i=Xf();if(t==="remove"){dd(i.filter(s=>s.id!==e)),cl();return}if(t==="load"){let s=i.find(r=>r.id===e);s&&gC(s)}}function yC(n){if(n){va?.classList.remove("printTarget"),va=n,va.classList.add("printTarget"),document.body.classList.add("printMode");for(let e of n.querySelectorAll("details"))e.dataset.printWasOpen=String(e.open),e.open=!0;window.print()}}function bC(n){let e=["APEX ANALYTIC DEAL REPORT",Ta(n),"",`Verdict: ${n.verdict||"INVESTIGATE"}`,`Confidence: ${n.confidence||0}%`,`Score: ${n.averageScore||0}/100`,`Reasoning: ${n.reasoningMode||"Framework only"}`,"",...TA(),"",...PA(n),"",...CA(n),"",...NA(n),"",...OA(n),"",...UA(n.developmentIntelligence),"",...BA(n.caseIntelligence),"",...VA(n.documentIntelligence),"",...zA(n.portfolioCommand),"",...WA(n.finalCommand),"",`Summary: ${n.summary||""}`];if(n.decisionFocus?.body&&e.push("",`${n.decisionFocus.label||"Decision focus"}: ${n.decisionFocus.body}`),n.residentialDcf&&e.push("",...n1(n.residentialDcf)),n.investorReadiness?.label){e.push("",`Investor readiness: ${n.investorReadiness.label} (${n.investorReadiness.score||0}/100)`),n.investorReadiness.summary&&e.push(n.investorReadiness.summary);for(let t of n.investorReadiness.flags||[])e.push(`- ${t}`)}if(n.productExperience?.summary){e.push("","V5 product experience",`${n.productExperience.mode||"Balanced investor review"} (${n.productExperience.onboardingCompleteness||0}% guidance complete): ${n.productExperience.summary}`,`Style: ${n.productExperience.explanationStyle||"Balanced explanation"}`,`Next best action: ${n.productExperience.nextBestAction||"Complete the missing guidance fields before relying on the report format."}`);for(let t of n.productExperience.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dimensions?.length){e.push("","Scorecard");for(let t of n.dimensions)e.push(`- ${t.label}: ${t.score}/100 (${t.status})`)}if(n.evidenceChecklist?.length){e.push("","Evidence checklist");for(let t of n.evidenceChecklist)e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.evidenceEngine?.summary){e.push("","V4.0 evidence engine",`${n.evidenceEngine.status||"unknown"} (${n.evidenceEngine.score||0}/100): ${n.evidenceEngine.summary}`,`Gate: ${n.evidenceEngine.recommendationGate||"Evidence gate not calculated."}`);for(let t of n.evidenceEngine.criticalGaps||[])e.push(`- Critical gap: ${t}`);for(let t of n.evidenceEngine.gates||[])e.push(`- ${t.label}: ${t.status}, ${t.score}/100. ${t.action}`)}if(n.transactionComparableEvidence?.summary){e.push("","V4.1 transaction comparable evidence",`${n.transactionComparableEvidence.status||"unknown"} (${n.transactionComparableEvidence.score||0}/100): ${n.transactionComparableEvidence.summary}`,`Value position: ${n.transactionComparableEvidence.valuePosition||"Not calculated."}`);for(let t of n.transactionComparableEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.achievedRentalEvidence?.summary){e.push("","V4.2 achieved rental evidence",`${n.achievedRentalEvidence.status||"unknown"} (${n.achievedRentalEvidence.score||0}/100): ${n.achievedRentalEvidence.summary}`,`Coverage: ${n.achievedRentalEvidence.coveragePosition||"Not calculated."}`);for(let t of n.achievedRentalEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.financingValuationEvidence?.summary){e.push("","V4.3 financing and valuation evidence",`${n.financingValuationEvidence.status||"unknown"} (${n.financingValuationEvidence.score||0}/100): ${n.financingValuationEvidence.summary}`,`Affordability: ${n.financingValuationEvidence.affordabilityPosition||"Not calculated."}`);for(let t of n.financingValuationEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.supplyAbsorptionEvidence?.summary){e.push("","V4.4 supply and absorption evidence",`${n.supplyAbsorptionEvidence.status||"unknown"} (${n.supplyAbsorptionEvidence.score||0}/100): ${n.supplyAbsorptionEvidence.summary}`,`Competition: ${n.supplyAbsorptionEvidence.competitionPosition||"Not calculated."}`);for(let t of n.supplyAbsorptionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteManagementEvidence?.summary){e.push("","V4.5 site and management evidence",`${n.siteManagementEvidence.status||"unknown"} (${n.siteManagementEvidence.score||0}/100): ${n.siteManagementEvidence.summary}`,`Lived quality: ${n.siteManagementEvidence.livedQualityPosition||"Not calculated."}`);for(let t of n.siteManagementEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.legalTransactionEvidence?.summary){e.push("","V4.6 legal and transaction evidence",`${n.legalTransactionEvidence.status||"unknown"} (${n.legalTransactionEvidence.score||0}/100): ${n.legalTransactionEvidence.summary}`,`Transaction path: ${n.legalTransactionEvidence.transactionPosition||"Not calculated."}`);for(let t of n.legalTransactionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dueDiligencePlan?.tasks?.length){e.push("","Due diligence pack",n.dueDiligencePlan.summary||"");for(let t of n.dueDiligencePlan.tasks)e.push(`- ${t.owner} / ${t.priority} / ${t.status}: ${t.label}. ${t.action}`)}if(n.stressEnvelope?.summary){e.push("","Stress envelope",n.stressEnvelope.summary,`Base true holding: ${n.stressEnvelope.baseTrueHolding}`,`Stressed true holding: ${n.stressEnvelope.stressedTrueHolding}`,`Cash after stress reserves: ${n.stressEnvelope.cashAfterStressReserves}`,`Reserve survival: ${n.stressEnvelope.reserveSurvivalMonths===null?"Not applicable":`${n.stressEnvelope.reserveSurvivalMonths} months`}`);for(let t of n.stressEnvelope.assumptions||[])e.push(`- ${t.label}: ${t.value} (${t.source})`)}if(n.acquisitionCostEstimate?.items?.length){e.push("","Estimated Malaysian entry costs");for(let t of zb(n.acquisitionCostEstimate))e.push(`- ${t}`)}if(n.portfolioGate?.summary){e.push("","Portfolio expansion gate",`${n.portfolioGate.status||"review"} (${n.portfolioGate.score||0}/100): ${n.portfolioGate.summary}`,`Next-property rule: ${n.portfolioGate.nextPropertyRule||"Do not scale until the current property is proven."}`);for(let t of n.portfolioGate.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.marketPulse?.summary){e.push("","Market cycle and liquidity pulse",`${n.marketPulse.status||"watch"}: ${n.marketPulse.summary}`,`Cycle: ${n.marketPulse.cycle||"Cycle unclear"}`,`Liquidity: ${n.marketPulse.liquidity||"Liquidity must be proven"}`);for(let t of n.marketPulse.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.holdExitPlan?.summary){e.push("","Hold, refinance, exit plan",`${n.holdExitPlan.action||"monitor"}: ${n.holdExitPlan.summary}`,`Review cadence: ${n.holdExitPlan.reviewCadence||"Review annually and on trigger events."}`);for(let t of n.holdExitPlan.triggers||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.decisionSeal?.summary){e.push("","V1 decision seal",`${n.decisionSeal.label||"V1 Conditional Only"}: ${n.decisionSeal.summary}`);for(let t of n.decisionSeal.conditions||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteVisitAssistant?.summary){e.push("","V2.1 site visit assistant",`${n.siteVisitAssistant.status||"required"}: ${n.siteVisitAssistant.summary}`,`Focus: ${n.siteVisitAssistant.focus||"Check lived quality on site"}`);for(let t of n.siteVisitAssistant.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourcingProfessional?.summary){e.push("","V2.2 sourcing and professional filter",`${n.sourcingProfessional.status||"verify"}: ${n.sourcingProfessional.summary}`,`Posture: ${n.sourcingProfessional.posture||"Evidence-first sourcing"}`);for(let t of n.sourcingProfessional.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.tenantRentalPlan?.summary){e.push("","V2.3 tenant and rental plan",`${n.tenantRentalPlan.status||"watch"}: ${n.tenantRentalPlan.summary}`,`Target: ${n.tenantRentalPlan.target||"Target tenant not stated"}`);for(let t of n.tenantRentalPlan.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.exitStrategy?.summary){e.push("","V2.4 exit strategy and buyer psychology",`${n.exitStrategy.status||"prepare"}: ${n.exitStrategy.summary}`,`Buyer psychology: ${n.exitStrategy.buyerPsychology||"Buyer objections must be prepared"}`);for(let t of n.exitStrategy.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.executionPlan?.actions?.length){e.push("","Execution calibration",n.executionPlan.summary||"",`Posture: ${n.executionPlan.posture||"Verify before offer"}`,`Opening anchor: ${n.executionPlan.openingAnchor||"Need value proof"}`,`Maximum offer: ${n.executionPlan.maximumOffer||"Need value/rent proof"}`,`Walk-away rule: ${n.executionPlan.walkAway||"Do not proceed under pressure."}`);for(let t of n.executionPlan.actions)e.push(`- ${t.lane} / ${t.status}: ${t.label}. ${t.action}`)}if(n.learningLoop?.signals?.length){e.push("","Learning loop",n.learningLoop.summary||""),n.learningLoop.profile?.approvedCount&&e.push(`Memory profile: ${n.learningLoop.profile.investorType||"Profile building"}; ${n.learningLoop.profile.riskStyle||"Needs more approved memory"}.`,`Profile completeness: ${n.learningLoop.profile.completeness||0}%.`);for(let t of n.learningLoop.signals)e.push(`- ${t.label}: ${t.body} ${t.action}`)}if(n.personalizedChallenge?.message){e.push("",`V3.3 personalized challenge: ${n.personalizedChallenge.label||"Personalized challenge"}`,`- ${n.personalizedChallenge.message}`);for(let t of n.personalizedChallenge.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dealMemoryComparison?.summary){e.push("","V3.4 deal memory comparison",`${n.dealMemoryComparison.status||"none"}: ${n.dealMemoryComparison.summary}`);for(let t of n.dealMemoryComparison.matches||[])e.push(`- ${t.subject}: ${t.similarity}% similar, ${t.verdict}. ${t.reason} ${t.action}`)}if(n.beliefTracker?.summary){e.push("","V3.5 belief tracker",`${n.beliefTracker.status||"inactive"}: ${n.beliefTracker.summary}`);for(let t of n.beliefTracker.beliefs||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourceTransparency?.summary){e.push("","V3.6 source transparency",`${n.sourceTransparency.mode||n.reasoningMode||"Framework only"}: ${n.sourceTransparency.summary}`);for(let t of n.sourceTransparency.sources||[])e.push(`- ${t.label}: ${t.status}. ${t.detail}`)}if(n.memoryConflicts?.summary){e.push("","V3.7 memory conflicts",`${n.memoryConflicts.status||"inactive"}: ${n.memoryConflicts.summary}`);for(let t of n.memoryConflicts.conflicts||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.personalOperatingRules?.summary){e.push("","V3.8 personal operating rules",`${n.personalOperatingRules.status||"check"}: ${n.personalOperatingRules.summary}`);for(let t of n.personalOperatingRules.rules||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}return n.hardStops?.length&&e.push("","Hard stops",...n.hardStops.map(t=>`- ${t}`)),n.recommendationBlockers?.length&&e.push("","Decision blockers",...n.recommendationBlockers.map(t=>`- ${t}`)),n.watchouts?.length&&e.push("","Watch-outs",...n.watchouts.map(t=>`- ${t}`)),n.nextActions?.length&&e.push("","Check next",...n.nextActions.map(t=>`- ${t}`)),n.counterThesis&&e.push("",`Strongest counter-thesis: ${n.counterThesis}`),Ci(e.join(`
`))}async function Jf(n){try{await navigator.clipboard.writeText(n)}catch{let e=document.createElement("textarea");e.value=n,e.setAttribute("readonly",""),e.style.position="fixed",e.style.opacity="0",document.body.append(e),e.select(),document.execCommand("copy"),e.remove()}}function xC(n){return String(n||"").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function ty(n,e={},t=10){let i=Object.entries(e).filter(([,s])=>String(s||"").trim()).slice(0,t);return i.length?[`${n}:`,...i.map(([s,r])=>`- ${xC(s)}: ${String(r).trim()}`)]:[`${n}: not supplied`]}function _C(){return["Readiness:",...[{panelName:"deal",label:"Deal"},{panelName:"profile",label:"Profile"},{panelName:"guidance",label:"Guidance"}].map(n=>{let e=nl(n.panelName);return`- ${n.label}: ${e.percent}%${e.missing.length?`, missing ${e.missing.slice(0,3).join(", ")}`:", ready enough"}`})]}function Eb(n){let e=Array.from(Gt.querySelectorAll(n)).pop();return Ci(e?.textContent||"").replace(/\s+/g," ").trim()}function SC(){let n=Array.from(Gt.querySelectorAll(".analysisMessage")).pop(),e=rl.get(n?.dataset.analysisId);if(e)return["Latest Apex direction:",`- Subject: ${Ta(e)}`,`- Verdict: ${e.verdict||"INVESTIGATE"} (${e.confidence||0}% confidence, ${e.averageScore||0}/100 score)`,e.summary?`- Summary: ${e.summary}`:"",e.counterThesis?`- Counter-thesis: ${e.counterThesis}`:"",...(e.nextActions||[]).slice(0,3).map(i=>`- Next: ${i}`)].filter(Boolean);let t=Eb(".message.jarvis .messageText");return t?["Latest Apex direction:",`- ${t.slice(0,700)}`]:["Latest Apex direction: no Apex answer yet"]}function wC(){let n=Qi(),e=Ca(),t=Eb(".message.user .messageText"),i=["APEX ANALYTIC SESSION BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",t?`Latest user question: ${t.slice(0,500)}`:"Latest user question: not supplied","",..._C(),"",...ty("Deal context",n,12),"",...ty("Profile and guidance context",e,12),"",...SC(),"","Use this brief as context only. Re-check live transaction, rental, financing, legal, supply, and site evidence before deciding."];return Ci(i.filter(s=>s!==void 0).join(`
`))}async function Mb(n=Ap){let e=wC();if(await Jf(e),n){let t=n.textContent;n.textContent="COPIED",window.setTimeout(()=>{n.textContent=t||"BRIEF"},1200)}ge("System ready","Session brief copied.")}async function EC(n,e){let t=bC(e);await Jf(t),n.textContent="COPIED",ge("System ready","Report copied.")}function MC(){for(let n of va?.querySelectorAll("details[data-print-was-open]")||[])n.open=n.dataset.printWasOpen==="true",delete n.dataset.printWasOpen;va?.classList.remove("printTarget"),va=null,document.body.classList.remove("printMode")}function TC(n){let e=n.closest(".analysisMessage"),t=rl.get(e?.dataset.analysisId);if(!e||!t)return;let i=n.getAttribute("data-analysis-action");if(i==="report"){yC(e);return}if(i==="copy"){EC(n,t);return}if(i==="shortlist"){wb(t),n.textContent="SAVED",ge("System ready",`${Ta(t)} saved to your shortlist.`),Pi();return}if(i==="dcf"&&t.residentialDcf?.status!=="incomplete"){rm(t.residentialDcf);return}i==="journal"&&Sb(t)}function Tb(n){let e=Mi.find(t=>t.getAttribute("data-context-toggle")===n);e&&Ti(e,!0),Kb(n)}function AC(n){let e=n?.getAttribute("data-journey-action");if(e){if(e==="deal"||e==="profile"||e==="guidance"){Tb(e);return}if(e==="screen"){ex();return}if(e==="analyze"){il();return}if(e==="save"){let t=nf();if(!t)return void il();wb(t),cl(),ge("System ready",`${Ta(t)} saved to your shortlist.`);return}if(e==="shortlist"){Kf();return}if(e==="journal"){let t=nf();t?Sb(t):cd();return}if(e==="reports"){qf();return}e==="brief"&&Mb()}}function hd(){return Go.value.trim()||window.localStorage.getItem(Ms)||""}function Ab(){return Ko.value.trim()||hd()}function Cb(){return Wo.value.trim()||hd()}function Mt(n,e=""){Jv.textContent=n||"",Jv.dataset.tone=e}function Kt(n,e=""){Xv.textContent=n||"",Xv.dataset.tone=e}function Fn(n,e=""){Yv.textContent=n||"",Yv.dataset.tone=e}function Be(n,e=""){Wv.textContent=n||"",Wv.dataset.tone=e}function Yn(n){let e=String(n||"").trim();ci.value=e,Go.value=e,Wo.value=e,Ko.value=e,e?window.localStorage.setItem(Ms,e):window.localStorage.removeItem(Ms)}function Ri(){return ci.value.trim()||window.localStorage.getItem(Ms)||""}async function St(n,e={}){let t=Ri();if(!t)throw new Error("Paste and save the owner token first.");return We(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function jn(n="",e=""){jv.textContent=n,jv.dataset.tone=e}function CC(n){let e=n.summary||{},t=e.pipelinePressure!==null&&e.pipelinePressure!==void 0&&Number.isFinite(Number(e.pipelinePressure))?`${Math.round(Number(e.pipelinePressure)*100)}% pipeline`:"pipeline unavailable";return`
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
  `}function Bu(n={}){pa=Array.isArray(n.studies)?n.studies:[],wT.textContent=`${pa.length} stud${pa.length===1?"y":"ies"}`,Ty.innerHTML=pa.length?pa.map(CC).join(""):'<p class="ownerIntelEmpty">No validated research study has been imported yet.</p>'}async function Zf(){if(!Ri())return Bu(),jn("Owner token required.","warning"),{studies:[],summary:{}};jn("Loading validated research...");let n=await St("/api/owner/research/studies");return Bu(n),jn(`${n.summary?.evidenceRecords||0} evidence records available to retrieval.`),n}async function Rb(n,e=!1){jn(e?"Replacing validated research study...":"Validating and importing research study...");let t=await St(`/api/owner/research/studies/import${e?"?replace=true":""}`,{method:"POST",body:JSON.stringify(n)});Qo=null,Ju.hidden=!0,await Zf(),jn(`${t.study?.title||"Research study"} ${t.replaced?"replaced":"imported"}.`)}async function RC(n){if(!n)return;let e;try{e=JSON.parse(await n.text())}catch{throw new Error("Research import must be a valid JSON bundle.")}finally{Ru.value=""}let t=String(e?.study_config?.study_id||"").trim();if(t&&pa.some(i=>i.id===t)){Qo=e,Ju.hidden=!1,jn(`Study ${t} already exists. Review the new cut-off, then use REPLACE STUDY.`,"warning");return}await Rb(e,!1)}async function IC(n){n&&(jn(`Deleting ${n}...`,"warning"),await St(`/api/owner/research/studies/${encodeURIComponent(n)}`,{method:"DELETE"}),await Zf(),jn("Research study deleted.","warning"))}async function Sa(n,e={}){let t=hd();if(!t)throw new Error("Paste and save the owner token first.");return We(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function ny(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Mp(n="",e={}){let t=ny(n);return t?[e.name,e.area,...e.aliases||[]].map(ny).filter(Boolean).some(i=>t.includes(i)||i.includes(t)):!1}function PC(n=[],e=[],t=[],i=[]){return n.map(s=>{let r=e.filter(v=>v.projectId===s.id||Mp(`${v.projectName} ${v.area}`,s)),a=t.filter(v=>v.projectId===s.id||Mp(`${v.projectName||v.project?.name||""} ${v.area||v.project?.area||""}`,s)),o=i.filter(v=>Mp(`${v.title} ${v.filename} ${(v.tags||[]).join(" ")}`,s)),l=a.filter(v=>v.freshness?.status==="stale").length,c=!!r.length,u=a.some(v=>v.freshness?.status==="fresh"),d=!!o.length,h=[c?"":"case",u?"":"fresh signal",d?"":"evidence"].filter(Boolean),f=c?l?"stale":u&&d?"ready":"partial":"missing";return{project:s,cases:r.length,observations:a.length,evidence:o.length,stale:l,missing:h,status:f}})}function LC(){try{return JSON.parse(window.localStorage.getItem(tb)||"null")||null}catch{return null}}function NC(n={}){let e=n.contentVersion?.hash||n.integrity?.hash||"",t={exportedAt:n.exportedAt||new Date().toISOString(),versionHash:e,versionShort:e?e.slice(0,12):"",counts:n.counts||{}};return window.localStorage.setItem(tb,JSON.stringify(t)),t}function DC(n="",e={}){if(e?.status&&e.status!=="missing")return{status:e.status==="ready"?"ready":"warning",label:e.label||"Server backup record",action:e.action||"Server backup ledger is tracking owner exports."};let t=LC();if(!t?.exportedAt)return{status:"missing",label:"No local backup",action:"Download a backup after major owner-knowledge edits."};let i=Math.floor((Date.now()-Date.parse(t.exportedAt))/864e5);return n&&t.versionHash&&t.versionHash!==n?{status:"warning",label:"Backup outdated",action:"Current owner data changed after the last downloaded backup."}:Number.isFinite(i)&&i>14?{status:"warning",label:`${i} days old`,action:"Download a fresh backup this week."}:{status:"ready",label:t.versionShort?`Saved ${t.versionShort}`:"Backup recent",action:"Local backup marker matches the current browser record."}}function ur(n,e,t,i){return`
    <article class="${p(t)}">
      <small>${p(n)}</small>
      <b>${p(e)}</b>
      <p>${p(i)}</p>
    </article>
  `}function br(n=""){return n==="ready"?"READY":n==="missing"?"BLOCKED":n==="warning"?"CHECK":"UNKNOWN"}function OC(n={}){return`
    <article class="${p(n.status||"warning")}">
      <small>${p(n.label||"Ops check")}</small>
      <b>${p(br(n.status))}</b>
      <p>${p(n.detail||"Status unavailable.")}</p>
      ${n.action?`<em>${p(n.action)}</em>`:""}
    </article>
  `}function Ib(n={}){let e=Array.isArray(n.checks)?n.checks:[];if(!e.length){Gv.innerHTML='<article class="warning"><small>PRODUCTION OPS</small><b>Token required</b><p>Load the owner console to check storage, AI, billing, backup, and launch readiness.</p></article>';return}let t=n.summary||{};Gv.innerHTML=`
    <article class="ownerIntelOpsLead ${p(n.status||"warning")}">
      <small>PRODUCTION OPS</small>
      <b>${p(br(n.status))}</b>
      <p>${p(t.ready||0)} ready / ${p(t.warning||0)} warning / ${p(t.missing||0)} blocked</p>
      <em>${p(n.generatedAt||"")}</em>
    </article>
    ${e.map(OC).join("")}
  `}function kC(n=[]){if(!n.length)return 0;let e=n.reduce((t,i)=>{let s=(i.cases?38:0)+(i.observations?18:0)+(i.observations&&!i.stale?17:0)+(i.evidence?27:0);return t+Math.max(0,Math.min(100,s-(i.stale?12:0)))},0);return Math.round(e/n.length)}function Pb(n=[]){let e={missing:0,stale:1,partial:2,ready:3};return[...n].sort((t,i)=>e[t.status]-e[i.status]||i.missing.length-t.missing.length)}function UC(n=[]){let e=Pb(n);return Jo==="all"?e:e.filter(t=>t.status===Jo)}function Lb(n=[]){let e=UC(n);Ey.querySelectorAll("[data-owner-intel-filter]").forEach(t=>{let i=t.getAttribute("data-owner-intel-filter")===Jo;t.setAttribute("aria-pressed",i?"true":"false")}),Sf.innerHTML=e.length?e.slice(0,10).map(FC).join(""):n.length?`<p class="ownerIntelEmpty">No ${p(Jo)} projects in the current owner coverage view.</p>`:'<p class="ownerIntelEmpty">No projects loaded yet. Start by adding tracked projects in the Market console.</p>'}function FC(n){let e=[n.project.area,n.project.state,n.project.propertyType].filter(Boolean).join(" / ")||"No project detail";return`
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
  `}function BC(){let n=Zo||{},e=Pb(n.rows||[]),t=n.score||0,i=n.ops||{},r=(Array.isArray(i.checks)?i.checks:[]).filter(o=>o.status!=="ready"),a=["APEX OWNER INTELLIGENCE BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",`Coverage score: ${t}%`,`Production ops: ${br(i.status)} (${i.summary?.ready||0} ready / ${i.summary?.warning||0} warning / ${i.summary?.missing||0} blocked)`,`Projects: ${n.projectCount||0}`,`Cases: ${n.caseCount||0}`,`Observations: ${n.observationCount||0}`,`Evidence documents: ${n.documentCount||0}`,`Validated research studies: ${n.researchStudyCount||0}`,`Complete projects: ${n.complete||0}`,"","Production gaps:",...r.length?r.slice(0,8).map(o=>`- ${o.label}: ${br(o.status)} / ${o.action||o.detail||"Review required."}`):["- None loaded or all clear."],"","Priority gaps:",...e.length?e.slice(0,10).map(o=>{let l=o.project?.name||"Unnamed project",c=[o.project?.area,o.project?.state,o.project?.propertyType].filter(Boolean).join(" / ")||"No detail",u=o.missing.length?o.missing.join(", "):"none";return`- ${l} (${c}) / ${o.status}: ${u}; ${o.cases} case, ${o.observations} signal, ${o.evidence} proof, ${o.stale} stale.`}):["- No project coverage loaded yet."],"","Next operating rule: add founder case judgment, fresh dated market signal, and evidence proof for every tracked project before relying on project-aware reasoning."];return Ci(a.join(`
`))}async function $C(){await Jf(BC());let n=bu.textContent;bu.textContent="COPIED",window.setTimeout(()=>{bu.textContent=n||"COPY BRIEF"},1200),Be("Owner intelligence brief copied.")}function VC(n,e){let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=n,document.body.append(s),s.click(),s.remove(),URL.revokeObjectURL(i)}async function HC(){if(!Ri())return ci.focus();Dp.disabled=!0;try{Be("Preparing owner knowledge backup...");let n=await St("/api/owner/export?chunks=true"),e=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");VC(`apex-owner-knowledge-${e}.json`,n);let t=NC(n),i="";try{i=` Server ledger: ${(await zC(n)).ledger?.label||"recorded"}.`}catch{i=" Server ledger could not be updated."}Be(`Owner backup downloaded: ${n.counts?.projects||0} projects, ${n.counts?.observations||0} observations, ${n.counts?.developmentCases||0} cases, ${n.counts?.documents||0} documents, ${n.counts?.chunks||0} chunks. Version ${t.versionShort||"recorded"}.${i}`)}finally{Dp.disabled=!1}}async function zC(n={}){return St("/api/owner/backup/events",{method:"POST",body:JSON.stringify({backupHash:n.integrity?.hash||"",contentVersionHash:n.contentVersion?.hash||"",exportedAt:n.exportedAt||new Date().toISOString(),counts:n.counts||{},source:"owner-console"})})}async function GC(){if(!Ri())return ci.focus();kp.disabled=!0;try{Be("Checking owner backup reminder...");let n=await St("/api/owner/backup/reminder",{method:"POST",body:JSON.stringify({force:!1})}),e=n.reminder||{},t=n.sent?"sent":n.skipped?"not sent":"checked";Be(`Backup reminder ${t}: ${e.message||n.reason||"No reminder needed."}`,n.sent||e.due?"warning":""),await Cs()}finally{kp.disabled=!1}}async function WC(){if(!Ri())return ci.focus();Np.disabled=!0;try{Be("Checking production operations...");let n=await St("/api/owner/ops");Zo={...Zo||{},ops:n},Ib(n),Be(`Production ops: ${br(n.status)}. ${n.summary?.ready||0} ready, ${n.summary?.warning||0} warning, ${n.summary?.missing||0} blocked.`,n.status==="ready"?"":"warning")}finally{Np.disabled=!1}}function qC(n={}){let e=n.incoming||{},t=Array.isArray(n.warnings)&&n.warnings.length?` Warning: ${n.warnings[0]}`:"";return`Backup ready to restore: ${e.projects||0} projects, ${e.observations||0} observations, ${e.developmentCases||0} cases, ${e.documents||0} documents.${t}`}async function jC(n){if(!Ri())return ci.focus();if(n){Op.disabled=!0,It.hidden=!0,It.value="",It.placeholder="Type RESTORE OWNER KNOWLEDGE",Ei.hidden=!0,Ss=null;try{Be("Validating owner backup...");let e=await n.text(),t=JSON.parse(e),i=await St("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:t,dryRun:!0})});Ss=t,It.hidden=!1,Ei.hidden=!1,Be(`${qC(i)} Type RESTORE OWNER KNOWLEDGE, then press CONFIRM RESTORE only if this backup should replace current owner knowledge.`,i.warnings?.length?"warning":"")}catch(e){Ss=null,It.hidden=!0,Ei.hidden=!0,Be(e.message||"Backup could not be validated.","danger")}finally{Op.disabled=!1,Cu.value=""}}}async function XC(){if(!Ss)return It.hidden=!0,Ei.hidden=!0,Be("Choose and validate a backup first.","warning");let n=It.value.trim();if(n!=="RESTORE OWNER KNOWLEDGE")return It.focus(),Be("Type RESTORE OWNER KNOWLEDGE before restoring this backup.","warning");Ei.disabled=!0;try{Be("Restoring owner knowledge backup...");let e=await St("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:Ss,dryRun:!1,confirmRestore:n})});Ss=null,It.value="",It.hidden=!0,Ei.hidden=!0,await Cs(),xa.hidden||Qf(e.history||{}),Be(`Owner knowledge restored: ${e.counts?.projects||0} projects, ${e.counts?.observations||0} observations, ${e.counts?.developmentCases||0} cases, ${e.counts?.researchStudies||0} research studies, ${e.counts?.documents||0} documents.`,"warning")}finally{Ei.disabled=!1}}function YC(n={}){return`${n.projects||0} projects / ${n.observations||0} signals / ${n.developmentCases||0} cases / ${n.researchStudies||0} research / ${n.documents||0} docs`}function Qf(n={}){let e=Array.isArray(n.snapshots)?n.snapshots:[],t=Array.isArray(n.events)?n.events:[],i=n.summary?.currentVersionShort||"",s=n.backup||{};xa.hidden=!1,xa.innerHTML=`
    <header><span><small>OWNER DATA SAFETY${i?` / VERSION ${p(i)}`:""}</small><b>${p(e.length)} rollback snapshot${e.length===1?"":"s"}</b><em>${p(s.label||"No server backup record")}</em></span><em>${p(t.length)} event${t.length===1?"":"s"}</em></header>
    ${e.length?e.map(r=>`
      <article>
        <span><small>${p(r.reason||"snapshot")}</small><b>${p(YC(r.counts))}</b><em>${p(r.createdAt||"")}</em></span>
        <button type="button" data-owner-rollback-snapshot="${p(r.id)}">ROLLBACK</button>
      </article>
    `).join(""):'<p class="ownerIntelEmpty">No rollback snapshots yet. Apex creates one before every confirmed restore or rollback.</p>'}
    ${t.length?`<p>Latest: ${p(t[0].type||"restore")} / ${p(t[0].createdAt||"")}</p>`:""}
  `}async function KC(){if(!Ri())return ci.focus();Ss=null,Ei.hidden=!0,It.value="",It.placeholder="Type ROLLBACK OWNER KNOWLEDGE",Be("Loading owner restore log...");let n=await St("/api/owner/restore/history");Qf(n),It.hidden=!(n.snapshots||[]).length,Be(`Restore log loaded: ${n.summary?.snapshots||0} rollback snapshots, ${n.summary?.events||0} restore events.`)}function JC(n={}){return n.reviewState==="overdue"?`OVERDUE ${Math.abs(Number(n.dueInDays)||0)}d`:n.status==="contested"?"CONTESTED":n.unverifiedHighConfidence?"UNVERIFIED":n.reviewState==="due"?`DUE ${Math.max(0,Number(n.dueInDays)||0)}d`:`IN ${Math.max(0,Number(n.dueInDays)||0)}d`}function ZC(n={}){let e=n.summary||{},t=Array.isArray(n.queue)?n.queue:[];Up.hidden=!1,Up.innerHTML=`
    <header>
      <span>
        <small>BELIEF REVIEW</small>
        <b>${p(e.overdue||0)} overdue / ${p(e.dueSoon||0)} due soon</b>
        <em>${p(e.neverReviewed||0)} of ${p(e.active||0)} never verified against a real case</em>
      </span>
      <em>${p(e.unverifiedHighConfidence||0)} high-confidence unverified</em>
    </header>
    ${t.length?t.map(i=>`
      <article>
        <span>
          <small>${p(JC(i))} / ${p(i.confidence)}% / ${p(i.scope||"General")}</small>
          <b>${p(i.claim)}</b>
          <em>Falsifier: ${p(i.falsifier||"Not recorded")}</em>
        </span>
        <button type="button" data-belief-review="confirm" data-belief-id="${p(i.id)}">HELD UP</button>
        <button type="button" data-belief-review="contest" data-belief-id="${p(i.id)}">COUNTEREXAMPLE</button>
      </article>
    `).join(""):'<p class="ownerIntelEmpty">No belief is due for review. Every active belief has a scheduled re-test date.</p>'}
    ${e.withSourceQuestion===0&&e.active?'<p class="ownerIntelEmpty">No belief records the source question it came from yet.</p>':""}
  `}async function Nb(){if(!Ri())return ci.focus();Be("Loading belief review queue...");let n=await St("/api/owner/beliefs/review?limit=25");ZC(n);let e=n.summary||{};Be(`Belief review: ${e.overdue||0} overdue, ${e.dueSoon||0} due soon, ${e.neverReviewed||0} never verified.`,e.overdue||e.contested?"warning":"")}async function QC(n){let e=n.getAttribute("data-belief-id"),t=n.getAttribute("data-belief-review");if(!e||!t)return;let i=t==="confirm"?"What evidence or real case did you check that kept this belief standing?":"What counterexample or case challenges this belief?",s=window.prompt(i,"");if(s!==null){if(s.trim().length<8)return Be("Record what you actually checked before closing a belief review.","warning");n.disabled=!0;try{await St(`/api/brain/beliefs/${encodeURIComponent(e)}`,{method:"PATCH",body:JSON.stringify({action:t,note:s.trim()})}),await Nb(),Be(t==="confirm"?"Belief confirmed and re-scheduled.":"Belief marked contested for a 90-day re-test.",t==="confirm"?"":"warning")}finally{n.disabled=!1}}}async function eR(n){if(!n)return;let e=It.value.trim();if(e!=="ROLLBACK OWNER KNOWLEDGE")return It.hidden=!1,It.placeholder="Type ROLLBACK OWNER KNOWLEDGE",It.focus(),Be("Type ROLLBACK OWNER KNOWLEDGE before rolling back to this snapshot.","warning");Be("Rolling owner knowledge back to selected snapshot...");let t=await St("/api/owner/restore/rollback",{method:"POST",body:JSON.stringify({snapshotId:n,dryRun:!1,confirmRollback:e})});It.value="",await Cs(),Qf(t.history||{}),Be(`Owner knowledge rolled back: ${t.counts?.projects||0} projects, ${t.counts?.observations||0} observations, ${t.counts?.developmentCases||0} cases, ${t.counts?.researchStudies||0} research studies.`,"warning")}function tR(n){let e=[{id:"free",name:"Free"},{id:"pro",name:"Pro"},{id:"advisor",name:"Advisor"}];return(Ou.length?Ou:e).map(i=>`<option value="${p(i.id)}"${i.id===n?" selected":""}>${p(i.name||i.id)}</option>`).join("")}function nR(n){return`
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
          <select data-owner-admin-field="plan">${tR(n.plan||"free")}</select>
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
  `}function Db(n=[]){My.textContent=n.length?`${n.length} user${n.length===1?"":"s"} loaded`:"No users found",Ef.innerHTML=n.length?n.map(nR).join(""):'<p class="ownerIntelEmpty">No account users loaded yet.</p>'}async function Ob(){if(!Ri())return My.textContent="Owner token required",Ef.innerHTML='<p class="ownerIntelEmpty">Paste the owner token above before loading users.</p>',null;Be("Loading user control...");let n=await St("/api/admin/users");return Db(n.users||[]),Be("User control loaded."),n}async function iR(n){let e=n.closest("[data-owner-admin-user]"),t=e?.getAttribute("data-owner-admin-user");if(!t)return;let i=r=>e.querySelector(`[data-owner-admin-field="${r}"]`)?.value||"",s={role:i("role"),plan:i("plan"),planStatus:i("planStatus"),emailVerified:i("emailVerified")==="true",disabled:i("disabled")==="true"};n.disabled=!0;try{await St(`/api/admin/users/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(s)}),await Ob(),Be("User updated.")}finally{n.disabled=!1}}function Qp({projects:n={},observations:e={},cases:t={},evidence:i={},research:s={},history:r={},ops:a={}}={}){let o=Array.isArray(n.projects)?n.projects:[],l=Array.isArray(e.observations)?e.observations:[],c=Array.isArray(t.cases)?t.cases:[],u=Array.isArray(i.documents)?i.documents:[],d=Array.isArray(s.studies)?s.studies:[];Bu(s),Ib(a),rb=o,Zi=o,Bb(o),Ub(o);let h=PC(o,c,l,u),f=h.filter(S=>S.cases===0).length,v=l.filter(S=>S.freshness?.status==="stale").length,y=h.filter(S=>S.evidence===0).length,g=h.filter(S=>S.status==="ready").length,m=kC(h),M=DC(r.summary?.currentVersionHash||"",r.backup||{});Zo={rows:h,score:m,projectCount:o.length,caseCount:t.summary?.total??c.length,observationCount:e.summary?.matched??l.length,documentCount:i.summary?.documents??u.length,researchStudyCount:d.length,complete:g,currentVersionShort:r.summary?.currentVersionShort||"",backupReminder:M,ops:a},gT.innerHTML=`
    <span><b>${p(m)}%</b> COVERAGE</span>
    <span><b>${p(br(a.status))}</b> OPS</span>
    <span><b>${p(o.length)}</b> PROJECTS</span>
    <span><b>${p(t.summary?.total??c.length)}</b> CASES</span>
    <span><b>${p(e.summary?.matched??l.length)}</b> OBSERVATIONS</span>
    <span><b>${p(i.summary?.documents??u.length)}</b> DOCUMENTS</span>
    <span><b>${p(d.length)}</b> RESEARCH</span>
    <span><b>${p(g)}</b> COMPLETE</span>
  `,bT.innerHTML=[ur("Project registry",`${o.length} tracked`,o.length?"ready":"missing",o.length?"Registry exists.":"Add projects before cases can be linked."),ur("Founder cases",`${f} missing`,f?"warning":"ready",f?"Write founder opinion for unmatched projects.":"Case coverage is broad."),ur("Market freshness",`${v} stale`,v?"warning":l.length?"ready":"missing",v?"Re-check old observations.":l.length?"Signals are current enough.":"Add dated ground signals."),ur("Evidence vault",`${y} unbacked`,y?"warning":u.length?"ready":"missing",y?"Attach proof to important projects.":u.length?"Evidence exists.":"Add source proof."),ur("Research studies",`${d.length} validated`,d.length?"ready":"missing",d.length?"Strict research can now support market questions.":"Import a strictly validated study bundle when one is ready."),ur("Backup rhythm",M.label,M.status,M.action),ur("Production ops",br(a.status),a.status||"warning",a.summary?`${a.summary.ready||0} ready, ${a.summary.warning||0} warning, ${a.summary.missing||0} blocked.`:"Load owner token to check launch readiness.")].join(""),Lb(h);let E={title:"Add project registry",detail:"Apex needs tracked projects before owner intelligence can become project-specific.",action:"market"};f?E={title:"Write missing case opinions",detail:`${f} tracked project${f===1?"":"s"} do not have founder case notes yet.`,action:"cases"}:v?E={title:"Refresh stale market signals",detail:`${v} observation${v===1?" is":"s are"} stale and should be re-verified.`,action:"market"}:y?E={title:"Attach evidence proof",detail:`${y} project${y===1?"":"s"} have no obvious evidence document match.`,action:"evidence"}:d.length?o.length&&(E={title:"Coverage looks healthy",detail:"Keep adding dated observations and update case notes when the market changes.",action:"refresh"}):E={title:"Import validated market research",detail:"The framework is ready; add a strict research bundle to extend it with dated external evidence.",action:"research"},xT.textContent=E.title,_T.textContent=E.detail,wf.innerHTML=`
    <button type="button" data-owner-intel-action="${p(E.action)}">DO NEXT</button>
    <button type="button" data-owner-intel-action="market">PROJECTS / SIGNALS</button>
    <button type="button" data-owner-intel-action="cases">CASES</button>
    <button type="button" data-owner-intel-action="evidence">EVIDENCE</button>
    <button type="button" data-owner-intel-action="research">RESEARCH</button>
  `}async function Cs(){if(!Ri())return Qp(),Be(al?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Be("Loading owner intelligence coverage...");let[n,e,t,i,s,r,a]=await Promise.all([St("/api/owner/market/projects"),St("/api/owner/market/observations?limit=500"),St("/api/owner/development-cases?limit=500"),St("/api/owner/documents"),St("/api/owner/research/studies"),St("/api/owner/restore/history"),St("/api/owner/ops")]);return Qp({projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:a}),Be("Owner intelligence coverage loaded."),{projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:a}}async function $u(n,e={}){let t=Cb();if(!t)throw new Error("Paste and save the owner token first.");return We(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}async function em(n,e={}){let t=Ab();if(!t)throw new Error("Paste and save the owner token first.");return We(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function sR(n=[]){return Array.isArray(n)&&n.length?n.join(", "):"untagged"}function rR(n){return`
    <article class="ownerEvidenceItem ${p(n.status||"stored")}" data-owner-evidence="${p(n.id)}">
      <header>
        <span><small>${p(sR(n.tags))}</small><b>${p(n.title||"Owner evidence")}</b></span>
        <em>${p(n.status||"stored")} / ${p(n.chunkCount||0)} chunks</em>
      </header>
      <p>${p(n.filename||"Evidence file")}${n.sourceUrl?` / ${p(n.sourceUrl)}`:""}</p>
      <div class="ownerEvidenceMeta">
        <span>${p(n.indexMode||"stored")} index</span>
        <span>${p(n.updatedAt?im(n.updatedAt):"No date")}</span>
      </div>
      <button type="button" data-owner-evidence-action="delete" data-owner-evidence-id="${p(n.id)}">DELETE</button>
    </article>
  `}function aR(n,e){if(!e)return!0;let t=[n.title,n.filename,n.sourceUrl,n.status,n.indexMode,...n.tags||[]].join(" ").toLowerCase();return e.split(/\s+/).filter(Boolean).every(i=>t.includes(i))}function kb(){let n=Uf.value.trim().toLowerCase(),e=Kp.filter(t=>aR(t,n));qy.innerHTML=e.length?e.map(rR).join(""):Kp.length?'<p class="ownerEvidenceEmpty">No evidence documents match this filter.</p>':'<p class="ownerEvidenceEmpty">No evidence documents yet. Add the first transaction, rent, financing, legal, or site proof above.</p>'}function ef(n={}){let e=Array.isArray(n.documents)?n.documents:[],t=n.summary||{};Kp=e,zT.innerHTML=`
    <span><b>${p(t.documents||e.length)}</b> DOCUMENTS</span>
    <span><b>${p(t.indexed||0)}</b> INDEXED</span>
    <span><b>${p(t.chunks||0)}</b> CHUNKS</span>
    <span>${p(t.embeddingProvider?"EMBEDDINGS ON":"LEXICAL SEARCH")}</span>
  `,qT.textContent=`${t.chunks||0} indexed chunks`,kb()}async function ul(){if(!Ab())return ef({}),Fn(al?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Fn("Loading evidence vault...");let n=await em("/api/owner/documents");return ef(n),Fn("Evidence vault loaded."),n}async function oR(){let n=Pu.value.trim(),e=Lu.value.trim();if(!n)return Pu.focus();if(!e)return Lu.focus();Fn("Indexing evidence..."),await em("/api/owner/documents",{method:"POST",body:JSON.stringify({title:n,filename:Gy.value.trim()||`${n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"evidence"}.md`,mimeType:"text/markdown",sourceUrl:GT.value.trim(),tags:Wy.value.split(",").map(t=>t.trim()).filter(Boolean),text:e})}),Vp.reset(),await ul(),Fn("Evidence added. V8 reports can now retrieve it when relevant.")}async function lR(n){let e=n.getAttribute("data-owner-evidence-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Fn("Press CONFIRM to delete this evidence document.");return}n.disabled=!0;try{await em(`/api/owner/documents/${encodeURIComponent(e)}`,{method:"DELETE"}),await ul(),Fn("Evidence deleted.")}catch(t){n.disabled=!1,Fn(t.message||"Evidence could not be deleted.","danger")}}}function tm(n){return{strong_buy:"Strong buy",shortlist:"Shortlist",watch:"Watch",avoid:"Avoid",unknown:"Unknown"}[n]||"Watch"}function Ub(n=Zi){Ea.innerHTML='<option value="">No linked market project</option>'+n.map(e=>`<option value="${p(e.id)}">${p(e.name)}${e.area?` / ${p(e.area)}`:""}</option>`).join("")}function tf(n){return[n.managementView,n.residentProfile,n.supplyThreat,n.rentalOutlook,n.resaleOutlook,n.sourceBasis].filter(e=>!String(e||"").trim()).length}function cR(){let n=Vy.value;return n?ku.filter(e=>n==="incomplete"?tf(e)>0:tf(e)===0):ku}function uR(n){let e=[n.area,n.state,n.propertyType,n.priceSegment].filter(Boolean).join(" / ")||"No project detail",t=n.ownerVerdict||n.strengths||n.weaknesses||"No founder verdict recorded.",i=tf(n);return`
    <article class="ownerCaseItem ${p(n.verdict||"watch")}" data-owner-case="${p(n.id)}">
      <header>
        <span><small>${p(e)}</small><b>${p(n.projectName||"Development case")}</b></span>
        <em>${p(tm(n.verdict))} / ${p(n.confidence||"medium")}</em>
      </header>
      <p>${p(t)}</p>
      <div class="ownerCaseMeta">
        <span>${p(n.rating||0)}/100</span>
        <span>${p(n.sourceBasis||"No source basis")}</span>
        <span>${p(n.observedAt?im(n.observedAt):"No date")}</span>
        ${i?`<span>${p(i)} gaps</span>`:"<span>complete</span>"}
      </div>
      <div class="ownerCaseItemActions">
        <button type="button" data-owner-case-action="edit" data-owner-case-id="${p(n.id)}">EDIT</button>
        <button type="button" data-owner-case-action="delete" data-owner-case-id="${p(n.id)}">DELETE</button>
      </div>
    </article>
  `}function Vu(n={}){let e=Array.isArray(n.cases)?n.cases:[];ab=n,ku=e;let t=n.summary||{},i=t.coverage||{},s=cR();FT.innerHTML=`
    <span><b>${p(t.total??e.length)}</b> CASES</span>
    <span><b>${p(t.shortlist||0)}</b> SHORTLIST</span>
    <span><b>${p(t.strong_buy||0)}</b> STRONG BUY</span>
    <span><b>${p(t.avoid||0)}</b> AVOID</span>
    <span><b>${p(i.areas||0)}</b> AREAS</span>
    <span><b>${p(i.incomplete||0)}</b> GAPS</span>
  `,$T.textContent=`${s.length} shown / ${t.matched??e.length} matched`,Hy.innerHTML=s.length?s.map(uR).join(""):'<p class="ownerCaseEmpty">No development cases match this filter yet. Add the first project opinion above.</p>'}function dR(){let n=new URLSearchParams;return Bp.value.trim()&&n.set("q",Bp.value.trim()),$p.value&&n.set("verdict",$p.value),n.set("limit","120"),n.toString()}async function xr(){if(!Cb())return Vu({}),Kt(al?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Kt("Loading development case library...");let[n,e]=await Promise.all([$u("/api/owner/market/projects"),$u(`/api/owner/development-cases?${dR()}`)]);return Zi=Array.isArray(n.projects)?n.projects:[],Ub(Zi),Vu(e),Kt("Development case library loaded."),{projects:n,cases:e}}function Fb(){return Zi.find(n=>n.id===Ea.value)}function hR(){let n=Fb(),e=gr.value.trim()||n?.name||"";return{projectId:Ea.value,projectName:e,area:qo.value.trim()||n?.area||"",state:jo.value.trim()||n?.state||"",propertyType:Xo.value.trim()||n?.propertyType||"",developer:Yo.value.trim()||n?.developer||"",priceSegment:Ay.value.trim(),targetBuyer:Ly.value.trim(),targetTenant:Ny.value.trim(),strengths:Dy.value.trim(),weaknesses:Oy.value.trim(),managementView:ky.value.trim(),residentProfile:Uy.value.trim(),supplyThreat:Fy.value.trim(),rentalOutlook:By.value.trim(),resaleOutlook:$y.value.trim(),ownerVerdict:Df.value.trim(),verdict:Cy.value,confidence:Ry.value,rating:Iy.value.trim(),observedAt:Zu.value||new Date().toISOString(),sourceBasis:Of.value.trim(),tags:Py.value.split(",").map(t=>t.trim()).filter(Boolean)}}function nm(){el="",Nf.reset(),Zu.value=new Date().toISOString().slice(0,10),zy.textContent="Add Development Opinion",Iu.textContent="ADD CASE",kf.hidden=!0}function pR(n){el=n.id||"",Ea.value=n.projectId||"",gr.value=n.projectName||"",qo.value=n.area||"",jo.value=n.state||"",Xo.value=n.propertyType||"",Yo.value=n.developer||"",Ay.value=n.priceSegment||"",Cy.value=n.verdict||"watch",Ry.value=n.confidence||"medium",Iy.value=n.rating||"",Zu.value=n.observedAt?String(n.observedAt).slice(0,10):new Date().toISOString().slice(0,10),Py.value=Array.isArray(n.tags)?n.tags.join(", "):"",Ly.value=n.targetBuyer||"",Ny.value=n.targetTenant||"",Dy.value=n.strengths||"",Oy.value=n.weaknesses||"",ky.value=n.managementView||"",Uy.value=n.residentProfile||"",Fy.value=n.supplyThreat||"",By.value=n.rentalOutlook||"",$y.value=n.resaleOutlook||"",Df.value=n.ownerVerdict||"",Of.value=n.sourceBasis||"",zy.textContent=`Edit ${n.projectName||"Development Case"}`,Iu.textContent="SAVE CASE",kf.hidden=!1,Nf.scrollIntoView({behavior:"smooth",block:"nearest"}),Kt("Editing existing development case. Save to update, or cancel edit.")}function fR(n){let e=n.getAttribute("data-owner-case-id"),t=ku.find(i=>i.id===e);if(!t)return Kt("Case not found in the current filtered list. Refresh and try again.","warning");pR(t)}async function mR(){let n=hR();if(!n.projectName)return gr.focus();let e=!!el;Kt(e?"Updating development case...":"Adding development case...");let t=e?`/api/owner/development-cases/${encodeURIComponent(el)}`:"/api/owner/development-cases";await $u(t,{method:e?"PATCH":"POST",body:JSON.stringify(n)}),nm(),await xr(),Kt(e?"Development case updated.":"Development case added. Apex can now match it in answers and deal reports.")}async function gR(n){let e=n.getAttribute("data-owner-case-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Kt("Press CONFIRM to delete this development case.");return}n.disabled=!0;try{await $u(`/api/owner/development-cases/${encodeURIComponent(e)}`,{method:"DELETE"}),el===e&&nm(),await xr(),Kt("Development case deleted.")}catch(t){n.disabled=!1,Kt(t.message||"Development case could not be deleted.","danger")}}}function vR(n){return String(n||"other").replaceAll("_"," ")}function im(n){if(!n)return"No date";try{return new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n))}catch{return String(n).slice(0,10)}}function Bb(n=[]){vr.innerHTML='<option value="">Area-only observation</option>'+n.map(e=>`<option value="${p(e.id)}">${p(e.name)}${e.area?` / ${p(e.area)}`:""}</option>`).join("")}function yR(n){let e=[n.area,n.state,n.propertyType,n.tenure].filter(Boolean).join(" / ")||"No project detail";return`
    <article class="ownerMarketItem">
      <header><span><small>${p(e)}</small><b>${p(n.name)}</b></span><em>${p(n.observationCount||0)} obs</em></header>
      <p>${p(n.developer||n.status||"Add observations to make this project useful.")}</p>
    </article>
  `}function bR(n){let e=n.project?.name||n.projectName||n.area||"Area observation",t=n.freshness?.status||"unknown",i=Number.isFinite(Number(n.freshness?.ageDays))?`${n.freshness.ageDays}d`:"age n/a",s=n.trend?`${n.trend.direction}${n.trend.percentChange===null||n.trend.percentChange===void 0?"":` ${n.trend.percentChange>0?"+":""}${n.trend.percentChange}%`}`:"no trend",r=n.value===null||n.value===void 0?"Qualitative":`${n.value}${n.unit?` ${n.unit}`:""}`;return`
    <article class="ownerMarketItem ${p(t)}" data-owner-observation="${p(n.id)}">
      <header>
        <span><small>${p(vR(n.metricType))} / ${p(im(n.observedAt))}</small><b>${p(e)}</b></span>
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
  `}function $b(n={},e={}){let t=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(e.observations)?e.observations:[];Zi=t,Bb(t),aA.textContent=String(t.length),oA.textContent=String(e.summary?.matched||i.length),OT.innerHTML=`
    <span><b>${p(t.length)}</b> PROJECTS</span>
    <span><b>${p(n.summary?.observations??i.length)}</b> OBSERVATIONS</span>
    <span><b>${p(e.summary?.fresh||0)}</b> FRESH</span>
    <span><b>${p(e.summary?.stale||0)}</b> STALE</span>
  `,Ky.innerHTML=t.length?t.map(yR).join(""):'<p class="ownerMarketEmpty">No market projects yet. Add one above, then attach observations.</p>',Ff.innerHTML=i.length?i.map(bR).join(""):'<p class="ownerMarketEmpty">No observations match this filter yet.</p>'}function xR(){let n=new URLSearchParams;return Gp.value.trim()&&n.set("area",Gp.value.trim()),Wp.value&&n.set("metricType",Wp.value),qp.value&&n.set("freshness",qp.value),n.set("limit","120"),n.toString()}async function Ii(){if(!hd())return Ky.innerHTML='<p class="ownerMarketEmpty">Owner token required before loading market evidence.</p>',Ff.innerHTML='<p class="ownerMarketEmpty">Paste your owner token above, then press SAVE.</p>',Mt(al?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Mt("Loading owner market intelligence...");let n=xR(),[e,t]=await Promise.all([Sa("/api/owner/market/projects"),Sa(`/api/owner/market/observations?${n}`)]);return $b(e,t),Mt("Market intelligence loaded."),{projects:e,observations:t}}function fn(){Tf.hidden=!0,Mf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerMarketOpen")}function mn(){Cf.hidden=!0,Af.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerCaseOpen")}function gn(){If.hidden=!0,Rf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerEvidenceOpen")}function nn(){Ku.hidden=!0,_f.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerIntelOpen")}async function Vb(){tn("owner"),Bn(),dn(),hn(),pn(),nn(),fn(),mn(),gn(),un(),Mn(),Tn(),Ku.hidden=!1,_f.setAttribute("aria-expanded","true"),document.body.classList.add("ownerIntelOpen"),Yn(window.localStorage.getItem(Ms)||ci.value);try{await Cs()}catch(n){Be(n.message||"Owner intelligence console is unavailable.","danger")}}async function pd(){tn("cases"),Bn(),dn(),hn(),pn(),nn(),fn(),gn(),un(),Mn(),Tn(),Cf.hidden=!1,Af.setAttribute("aria-expanded","true"),document.body.classList.add("ownerCaseOpen"),Yn(window.localStorage.getItem(Ms)||Wo.value),Zu.value||=new Date().toISOString().slice(0,10);try{await xr()}catch(n){Kt(n.message||"Development case library is unavailable.","danger")}}async function fd(){tn("evidence"),Bn(),dn(),hn(),pn(),nn(),fn(),mn(),un(),Mn(),Tn(),If.hidden=!1,Rf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerEvidenceOpen"),Yn(window.localStorage.getItem(Ms)||Ko.value);try{await ul()}catch(n){Fn(n.message||"Evidence vault is unavailable.","danger")}}async function md(){tn("market"),Bn(),dn(),hn(),pn(),nn(),mn(),gn(),un(),Mn(),Tn(),Tf.hidden=!1,Mf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerMarketOpen"),Yn(window.localStorage.getItem(Ms)||Go.value),Nu.value||=new Date().toISOString().slice(0,10);try{await Ii()}catch(n){Mt(n.message||"Owner market console is unavailable.","danger")}}function _R(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"project"}function SR(n=""){let e=String(n||"");return rb.find(t=>t.id===e)||Zi.find(t=>t.id===e)||null}function On(n,e){n&&!n.value&&e&&(n.value=e)}function Hb(n,e){!n||!e||Array.from(n.options).some(t=>t.value===e)&&(n.value=e)}function wR(n){return[n.name,n.area,n.state,n.propertyType].filter(Boolean).join(", ")}function ER(n){Hb(Ea,n.id),On(gr,n.name),On(qo,n.area),On(jo,n.state),On(Xo,n.propertyType),On(Yo,n.developer),On(Of,"Owner console action queue"),gr.scrollIntoView({behavior:"smooth",block:"center"}),Df.focus(),Kt(`Case note prepared for ${n.name}. Add your founder judgment, then save.`)}function MR(n){Hb(vr,n.id),On(ga,n.area),On(Xy,"owner ground check"),On(Yy,`${n.name}: update the latest rental, resale, supply, management, or site signal.`),Nu.value||=new Date().toISOString().slice(0,10),vr.scrollIntoView({behavior:"smooth",block:"center"}),jy.focus(),Mt(`Market signal prepared for ${n.name}. Choose the metric and add the latest evidence.`)}function TR(n){On(Pu,`${n.name} evidence proof`),On(Gy,`${_R(n.name)}-evidence.md`),On(Wy,wR(n)),On(Lu,`Project: ${n.name}
Area: ${n.area||"Not recorded"}
Evidence type:
Source/date:
Notes:
`),Pu.scrollIntoView({behavior:"smooth",block:"center"}),Lu.focus(),Fn(`Evidence shell prepared for ${n.name}. Paste the proof, source, and date before saving.`)}async function AR(n,e){let t=SR(e);if(!t){Be("Project could not be found. Refresh owner intelligence and try again.","warning");return}n==="case"&&(await pd(),ER(t)),n==="signal"&&(await md(),MR(t)),n==="proof"&&(await fd(),TR(t))}async function CR(){Mt("Adding project...");let n={name:jT.value.trim(),area:XT.value.trim(),state:YT.value.trim(),propertyType:KT.value.trim(),developer:JT.value.trim(),tenure:ZT.value.trim(),completionYear:QT.value.trim(),status:eA.value,aliases:tA.value.split(",").map(e=>e.trim()).filter(Boolean)};await Sa("/api/owner/market/projects",{method:"POST",body:JSON.stringify(n)}),Hp.reset(),await Ii(),Mt("Project added.")}async function RR(){let n=Zi.find(t=>t.id===vr.value);if(!n&&!ga.value.trim())throw ga.focus(),new Error("Add an area or link the observation to a project.");Mt("Adding observation...");let e={projectId:vr.value,area:ga.value.trim()||n?.area||"",state:n?.state||"",projectName:n?.name||"",metricType:jy.value,value:nA.value.trim(),unit:iA.value.trim(),observedAt:Nu.value,sourceType:Xy.value.trim()||"owner observation",confidence:sA.value,notes:Yy.value.trim()};await Sa("/api/owner/market/observations",{method:"POST",body:JSON.stringify(e)}),zp.reset(),Nu.value=new Date().toISOString().slice(0,10),await Ii(),Mt("Observation added. Apex can now match it in chat and deal reports.")}async function IR(){let n=_p.value.trim();if(!n)return _p.focus();let e;try{e=JSON.parse(n)}catch{throw new Error("Import must be valid JSON with projects and/or observations arrays.")}let t=Array.isArray(e.projects)?e.projects:[],i=Array.isArray(e.observations)?e.observations:[];if(!t.length&&!i.length)throw new Error("Import JSON must include at least one project or observation.");if(t.length+i.length>200)throw new Error("Each import is limited to 200 combined projects and observations.");Mt("Importing owner market batch...");let s=await Sa("/api/owner/market/import",{method:"POST",body:JSON.stringify({projects:t,observations:i})});_p.value="",await Ii();let r=Array.isArray(s.skipped)?s.skipped.length:0;Mt(`Imported ${s.imported?.projects||0} project(s) and ${s.imported?.observations||0} observation(s)${r?`; ${r} skipped.`:"."}`,r?"warning":"")}async function PR(n){let e=n.getAttribute("data-owner-market-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Mt("Press CONFIRM to delete this observation.");return}n.disabled=!0;try{await Sa(`/api/owner/market/observations/${encodeURIComponent(e)}`,{method:"DELETE"}),await Ii(),Mt("Observation deleted.")}catch(t){n.disabled=!1,Mt(t.message||"Observation could not be deleted.","danger")}}}function dr(n,e=[],t=""){return e.length?`
    <section class="analysisSection ${p(t)}">
      <h3>${p(n)}</h3>
      <ul>${e.map(i=>`<li>${p(i)}</li>`).join("")}</ul>
    </section>
  `:""}function kn(n){return`RM ${Math.round(Number(n)||0).toLocaleString("en-MY")}`}function zb(n){return!n||!Array.isArray(n.items)||!n.items.length?[]:[`Down payment at ${n.loanMarginPercent}% loan margin: ${kn(n.downPayment)}`,...n.items.map(e=>`${e.label}: ${kn(e.amount)}`),`Total duties and fees: ${kn(n.totalTransactionCosts)} (about ${n.costAsPercentOfPrice}% of price)`,`Estimated cash to start: ${kn(n.estimatedCashToStart)}`,...n.rpgt?.note?[`RPGT: ${n.rpgt.note}`]:[],...n.disclaimer?[n.disclaimer]:[]]}function LR(n={}){let e=Array.isArray(n.observations)?n.observations:[];if(!e.length)return"";let t=Array.isArray(n.trends)?n.trends:[],i=n.summary||{},s=t.slice(0,4).map(a=>{let o=a.percentChange===null||a.percentChange===void 0?"":` ${Number(a.percentChange)>0?"+":""}${a.percentChange}%`;return`<span class="marketTrend ${p(a.direction)}"><small>${p(String(a.metricType||"").replaceAll("_"," "))}</small><b>${p(a.direction)}${p(o)}</b></span>`}).join(""),r=e.slice(0,6).map(a=>{let o=a.freshness?.status||"stale",l=Number(a.freshness?.ageDays||0),c=a.notes||(a.value===null?"Qualitative observation":`${a.value}${a.unit?` ${a.unit}`:""}`),u=c.length>420?`${c.slice(0,417).trim()}...`:c;return`
      <li>
        <span><b>${p(a.title)}</b><small>${p(u)}</small></span>
        <em class="${p(o)}">${p(o)} / ${p(l)}d</em>
      </li>
    `}).join("");return`
    <section class="analysisMarketPulse">
      <header><h3>OWNER MARKET PULSE</h3><span>${p(i.matched||e.length)} MATCHED</span></header>
      ${s?`<div class="marketTrends">${s}</div>`:""}
      <ul>${r}</ul>
      <p>${p(i.warning||"Check the observation dates before relying on this market read.")}</p>
    </section>
  `}function NR(n={}){let e=n.decisionFocus||{},t=n.challengeMode||{};return!e.body&&!t.message?"":`
    <section class="analysisDecisionFocus ${p(e.tone||"neutral")}">
      <span><small>${p(e.label||"Decision focus")}</small><b>${p(e.body||n.summary||"")}</b></span>
      ${t.message?`<p>${p(t.message)}</p>`:""}
    </section>
  `}function DR(n={}){if(!n.message||n.status==="inactive")return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function No(n,e={},t="items"){if(!e.summary)return"";let i=Array.isArray(e[t])?e[t]:[],s=e.status||e.mode||"check",r=String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"check";return`
    <section class="analysisV3Insight ${p(r)}">
      <header>
        <span><small>${p(n)}</small><b>${p(e.summary)}</b></span>
        <em>${p(s)}</em>
      </header>
      ${i.length?`
        <div>
          ${i.map(a=>{let o=a.subject||a.label||a.type||"Memory signal",l=a.similarity?`${a.similarity}% similar / ${a.verdict||"saved"}`:a.status||a.type||"",c=a.reason||a.basis||a.detail||a.memoryA||"",u=a.memoryB?`Conflict: ${a.memoryB}`:"";return`
              <article class="v3InsightItem ${p(a.status||e.status||"check")}">
                <i>${p(l)}</i>
                <span>
                  <b>${p(o)}</b>
                  ${c?`<small>${p(c)}</small>`:""}
                  ${u?`<small>${p(u)}</small>`:""}
                  ${a.action?`<em>${p(a.action)}</em>`:""}
                </span>
              </article>
            `}).join("")}
        </div>
      `:""}
    </section>
  `}function OR(n={}){if(!n.label)return"";let e=Array.isArray(n.flags)?n.flags.slice(0,4):[];return`
    <section class="analysisReadiness">
      <header>
        <span><small>INVESTOR READINESS</small><b>${p(n.label)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      ${n.summary?`<p>${p(n.summary)}</p>`:""}
      ${e.length?`<ul>${e.map(t=>`<li>${p(t)}</li>`).join("")}</ul>`:""}
    </section>
  `}function kR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function UR(n=[]){return n.length?`
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
  `:""}function FR(n={}){if(!n.summary)return"";let e=Array.isArray(n.gates)?n.gates:[],t=Array.isArray(n.criticalGaps)?n.criticalGaps:[];return`
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
  `}function BR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function $R(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function VR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function HR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function zR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function GR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function WR(n={}){let e=Array.isArray(n.tasks)?n.tasks:[];return e.length?`
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
  `:""}function qR(n={}){if(!n.summary)return"";let e=Array.isArray(n.assumptions)?n.assumptions:[];return`
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
  `}function jR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function XR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function YR(n={}){if(!n.summary)return"";let e=Array.isArray(n.triggers)?n.triggers:[];return`
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
  `}function KR(n={}){if(!n.summary)return"";let e=Array.isArray(n.conditions)?n.conditions:[];return`
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
  `}function vu(n,e={},t="FOCUS",i=""){if(!e.summary)return"";let s=Array.isArray(e.checks)?e.checks:[],r=e.status||"watch";return`
    <section class="analysisV2Workflow ${p(r)}">
      <header>
        <span><small>${p(n)}</small><b>${p(e.summary)}</b></span>
        <em>${p(r)}</em>
      </header>
      ${i?`<p><b>${p(t)}</b> ${p(i)}</p>`:""}
      ${s.length?`<div>${s.map(a=>`
        <article class="v2WorkflowCheck ${p(a.status)}">
          <i>${p(a.status)}</i>
          <span><b>${p(a.label)}</b><small>${p(a.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function JR(n={}){let e=Array.isArray(n.actions)?n.actions:[];return e.length?`
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
  `:""}function ZR(n={}){let e=Array.isArray(n.signals)?n.signals:[];if(!e.length)return"";let t=n.profile||{};return`
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
  `}function yu(n){let e=Number(n||0);return e>=75?"strong":e>=55?"watch":"weak"}function Tp(n={},e,t=0){let i=(n.dimensions||[]).find(s=>s.key===e);return Number(i?.score??t??0)}function QR(n={},e,t=0){let i=(n.stages||[]).find(s=>e.test(String(s.name||"")));return Number(i?.score??t??0)}function e1(n={}){let e=Ki(n.recommendationBlockers),t=Ki(n.watchouts),i=Ki(n.missingEvidence),s=Ki(n.nextActions),r=e[0]||t[0]||n.counterThesis||"No single dominant risk is proven yet; keep checking the weak evidence lane.",a=i[0]||"No urgent proof gap listed, but live transaction, rent, site, financing, and legal checks still matter.",o=s[0]||a,l=Tp(n,"property"),c=QR(n,/holding/i,Number(n.achievedRentalEvidence?.score||n.investorReadiness?.score||0)),u=Tp(n,"exit"),d=Tp(n,"evidence",n.confidence);return{verdict:n.verdict||"INVESTIGATE",score:Number(n.averageScore||0),confidence:Number(n.confidence||0),reason:n.decisionFocus?.body||n.summary||"Apex needs more proof before upgrading the decision.",risk:r,missingProof:a,nextAction:o,scores:[{label:"Property Quality",value:l,status:yu(l)},{label:"Rental Safety",value:c,status:yu(c)},{label:"Exit Liquidity",value:u,status:yu(u)},{label:"Evidence Confidence",value:d,status:yu(d)}]}}function t1(n={}){let e=e1(n);return`
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
  `}function Ho(n,e=1){let t=Number(n);return Number.isFinite(t)?`${(t*100).toFixed(e)}%`:"Not available"}function n1(n={}){return!n||n.status==="incomplete"?["Residential DCF",...(n?.issues||["Minimum DCF inputs are incomplete."]).map(e=>`- ${e}`)]:["Residential DCF and market-value screen",`Status: ${n.status}`,`${n.indicationLabel}: ${kn(n.indicatedValue)}`,`Formal market-value label: ${n.marketValue?kn(n.marketValue):"Not established"}`,`Income DCF: ${kn(n.incomeApproach?.dcfValue)}`,`Comparison indication: ${n.comparisonApproach?.value?kn(n.comparisonApproach.value):"Need 3 recent verified sales"}`,`Purchase price: ${kn(n.purchasePrice)}`,`Price variance: ${Ho(n.priceVariance)}`,`Year 1 DSCR: ${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"Not available"}`,`Levered equity IRR: ${Ho(n.buyerReturns?.leveredEquityIrr)}`,`Evidence: ${n.evidence?.score||0}/100`,...(n.evidence?.missing||[]).map(e=>`- Missing: ${e}`),...(n.warnings||[]).map(e=>`- Warning: ${e}`),n.disclaimer||""].filter(Boolean)}function Gb(n={}){if(!n)return"";if(n.status==="incomplete")return`
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
        <span><small>INDICATED VALUE</small><b>${p(kn(n.indicatedValue))}</b></span>
        <span><small>MARKET VALUE LABEL</small><b>${e?p(kn(n.marketValue)):"NOT ESTABLISHED"}</b></span>
        <span><small>PRICE POSITION</small><b>${p(Ho(n.priceVariance))}</b></span>
      </div>
      <div class="dcfValuationMetrics">
        <span><small>Income DCF</small><b>${p(kn(n.incomeApproach?.dcfValue))}</b></span>
        <span><small>Completed-sale comparison</small><b>${n.comparisonApproach?.value?p(kn(n.comparisonApproach.value)):"Need 3 verified sales"}</b></span>
        <span><small>Terminal concentration</small><b>${p(Ho(n.incomeApproach?.terminalConcentration))}</b></span>
        <span><small>Year 1 DSCR</small><b>${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"N/A"}</b></span>
        <span><small>Levered equity IRR</small><b>${p(Ho(n.buyerReturns?.leveredEquityIrr))}</b></span>
        <span><small>Evidence strength</small><b>${p(n.evidence?.score||0)}/100</b></span>
      </div>
      ${(n.evidence?.missing||[]).length?`<div class="dcfValuationGaps"><b>Evidence still needed</b><ul>${n.evidence.missing.map(t=>`<li>${p(t)}</li>`).join("")}</ul></div>`:""}
      ${(n.warnings||[]).length?`<div class="dcfValuationWarnings"><b>Challenge back</b><ul>${n.warnings.map(t=>`<li>${p(t)}</li>`).join("")}</ul></div>`:""}
      <p>${p(n.disclaimer||"")}</p>
    </section>
  `}function i1(n){document.body.classList.add("conversationActive");let e=document.createElement("article");e.className="message jarvis dcfValuationMessage",e.innerHTML=`${Gb(n)}<div class="analysisActions"><button type="button">DOWNLOAD DCF WORKBOOK</button></div>`,e.querySelector("button")?.addEventListener("click",()=>void rm(n)),document.querySelector("#valuationResult").replaceChildren(e)}function sm(n,e=[],t={},i=Gt){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=crypto.randomUUID();rl.set(r,n),i===Gt&&(_a=r),s.dataset.analysisId=r;let a=String(n.verdict||"investigate").toLowerCase(),o=(n.stages||[]).map(f=>`
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
  `).join(""),u=ad(n),d=(n.scenarios||[]).map(f=>`
    <article class="analysisScenario ${p(f.status)}">
      <span><b>${p(f.label)}</b><small>${p(f.assumption)}</small></span>
      <em>${p(f.value)}/mo</em>
    </article>
  `).join(""),h=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date);if(s.className="message jarvis analysisMessage",s.innerHTML=`
    <header class="analysisReportTitle">
      <span>A</span><div><small>APEX ANALYTIC</small><h1>DEAL DECISION REPORT</h1><p>${p(Ta(n))} / ${p(h)}</p></div>
    </header>
    ${gb(t)}
    <div class="analysisHeader">
      <span><small>SEVEN-STAGE VERDICT</small><b>${p(n.verdict)}</b></span>
      <i class="analysisVerdict ${p(a)}">${p(n.confidence)}% CONFIDENCE</i>
    </div>
    <p class="analysisSummary">${p(n.summary)}</p>
    ${t1(n)}
    ${Gb(n.residentialDcf)}
    ${NR(n)}
    ${kR(n.productExperience)}
    ${DR(n.personalizedChallenge)}
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
    ${MA()}
    ${IA(n)}
    ${AA(n)}
    ${LA(n)}
    ${DA(n)}
    ${kA(n.developmentIntelligence)}
    ${FA(n.caseIntelligence)}
    ${$A(n.documentIntelligence)}
    ${HA(n.portfolioCommand)}
    ${GA(n.finalCommand)}
    <div class="analysisOverview">
      ${OR(n.investorReadiness)}
      ${c?`<section class="analysisDimensionSection"><h3>DEAL SCORECARD</h3><div class="analysisDimensions">${c}</div></section>`:""}
    </div>
    ${l?`<div class="analysisMetrics">${l}</div>`:""}
    ${UR(n.evidenceChecklist||[])}
    ${FR(n.evidenceEngine)}
    ${BR(n.transactionComparableEvidence)}
    ${$R(n.achievedRentalEvidence)}
    ${VR(n.financingValuationEvidence)}
    ${HR(n.supplyAbsorptionEvidence)}
    ${zR(n.siteManagementEvidence)}
    ${GR(n.legalTransactionEvidence)}
    ${WR(n.dueDiligencePlan)}
    ${qR(n.stressEnvelope)}
    ${jR(n.portfolioGate)}
    ${XR(n.marketPulse)}
    ${YR(n.holdExitPlan)}
    ${KR(n.decisionSeal)}
    ${vu("V2.1 SITE VISIT ASSISTANT",n.siteVisitAssistant,"FOCUS",n.siteVisitAssistant?.focus)}
    ${vu("V2.2 SOURCING / PROFESSIONAL FILTER",n.sourcingProfessional,"POSTURE",n.sourcingProfessional?.posture)}
    ${vu("V2.3 TENANT / RENTAL PLAN",n.tenantRentalPlan,"TARGET",n.tenantRentalPlan?.target)}
    ${vu("V2.4 EXIT STRATEGY",n.exitStrategy,"BUYER PSYCHOLOGY",n.exitStrategy?.buyerPsychology)}
    ${JR(n.executionPlan)}
    ${ZR(n.learningLoop)}
    ${No("V3.4 DEAL MEMORY COMPARISON",n.dealMemoryComparison,"matches")}
    ${No("V3.5 BELIEF TRACKER",n.beliefTracker,"beliefs")}
    ${No("V3.6 SOURCE TRANSPARENCY",n.sourceTransparency,"sources")}
    ${No("V3.7 MEMORY CONFLICTS",n.memoryConflicts,"conflicts")}
    ${No("V3.8 PERSONAL OPERATING RULES",n.personalOperatingRules,"rules")}
    ${d?`<section class="analysisScenarioSection"><h3>DOWNSIDE SCENARIOS</h3><div class="analysisScenarios">${d}</div><p>Stress assumptions are decision tests, not forecasts.</p></section>`:""}
    ${LR(n.marketIntelligence)}
    <ol class="analysisStages">${o}</ol>
    <div class="analysisDetails">
      ${dr("Challenge mode",n.challengeMode?.message?[n.challengeMode.message]:[],n.challengeMode?.level==="hard"?"danger":"warning")}
      ${dr("Hard stops",n.hardStops,"danger")}
      ${dr("Decision blockers",n.recommendationBlockers,"warning")}
      ${dr("Watch-outs",n.watchouts,"warning")}
      ${dr("Estimated Malaysian entry costs",zb(n.acquisitionCostEstimate))}
      ${dr("Missing evidence",n.missingEvidence)}
      ${dr("Check next",n.nextActions,"actions")}
    </div>
    <section class="analysisCounter">
      <h3>STRONGEST COUNTER-THESIS</h3>
      <p>${p(n.counterThesis)}</p>
    </section>
    <div class="analysisActions">
      <button type="button" data-analysis-action="shortlist">${u.status==="refuse"?"SAVE FOR REVIEW":"SAVE TO SHORTLIST"}</button>
      ${gt&&n.savedReportId?'<button type="button" data-analysis-action="journal">RECORD DECISION</button>':""}
      <button type="button" data-analysis-action="copy">COPY REPORT</button>
      <button type="button" data-analysis-action="report">PRINT REPORT</button>
      ${n.residentialDcf&&n.residentialDcf.status!=="incomplete"?'<button type="button" data-analysis-action="dcf">DCF WORKBOOK</button>':""}
    </div>
    ${mb(e)}
  `,s1(s),i.append(s),i===Gt){let f=s.getBoundingClientRect().top-Gt.getBoundingClientRect().top+Gt.scrollTop;Gt.scrollTop=Math.max(0,f-6),Pi()}}function s1(n){let e=".analysisReportTitle,.intelligenceBadge,.analysisHeader,.analysisSummary,.analysisDetails,.analysisCounter,.analysisActions,.analysisMeta,.analysisDimensions",t=new Map;for(let s of Array.from(n.children)){if(s.matches(e))continue;let r=/Metrics|Scenario|dcf|Snapshot/i.test(s.className)?"Numbers and downside":/Memory|Belief|Personal|Learning|Experience/i.test(s.className)?"Personal context and learning":"Evidence and seven-stage checks";if(!t.has(r)){let a=document.createElement("details");a.className="response-detail",a.innerHTML=`<summary>${r}</summary>`,t.set(r,a)}t.get(r).append(s)}let i=n.querySelector(".analysisActions");for(let s of t.values())n.insertBefore(s,i);for(let s of n.querySelectorAll("h3"))s.textContent=s.textContent.replace(/^V\d+(?:\.\d+)?\s+/i,"")}function Wb(n){if(Gt.innerHTML="",!!n?.messages?.length)for(let e of n.messages)ws(e.role==="assistant"?"jarvis":e.role,e.content,e.sources||[],e)}function xs(n){nd=n,Xn.classList.toggle("speaking",n),Xn.setAttribute("aria-label",n?"Stop Apex Analytic voice":"Talk to Apex Analytic"),ry.hidden=!n}function Aa(n,e){return n.reduce((t,i)=>{let s=i.getAttribute(e),r=String(i.value||"").trim();return r&&(t[s]=r),t},{})}function Qi(){return Aa(Es,"data-deal-field")}function Ca(){return Aa(yr,"data-profile-field")}function r1(){return td.map(n=>{let e={};for(let t of n.querySelectorAll("[data-dcf-comp-field]")){let i=t.getAttribute("data-dcf-comp-field"),s=t.type==="checkbox"?t.checked:String(t.value||"").trim();s&&(e[i]=s)}return Object.keys(e).some(t=>t!=="verified")?(e.armsLength=!0,e.evidenceType="completed transaction",e):null}).filter(Boolean)}function gd(){let n=Aa(ed,"data-dcf-field"),e=r1();return e.length&&(n.comparables=e),n}function iy(){let n=gd();Gu()}function qb(n=!0){for(let e of ed)e.value=e.tagName==="SELECT"&&e.options[0]?.value||"";for(let e of td)for(let t of e.querySelectorAll("[data-dcf-comp-field]"))t.type==="checkbox"?t.checked=!1:t.value="";window.localStorage.removeItem(hA),Bo&&(Bo.textContent=""),n&&ge("System ready","DCF assumptions and comparable sales cleared.")}function jb(n=gd()){return{dealCard:Qi(),financialProfile:Ca(),valuation:n}}function a1(n={}){return{...n.assumptions,asOf:n.asOf,propertyName:n.property?.name,area:n.property?.area,address:n.property?.address,propertyType:n.property?.propertyType,tenure:n.property?.tenure,titleNumber:n.property?.titleNumber,marketRentEvidence:n.evidence?.marketRent,operatingCostEvidence:n.evidence?.operatingCosts,discountRateBasis:n.evidence?.discountRateBasis,terminalCapRateBasis:n.evidence?.terminalCapRateBasis,comparables:n.comparisonApproach?.comparables||[]}}function Xb(){let n=Qi();return n.askingPrice?n.floorArea?n.expectedRent?"":"Add a supportable monthly market rent in the Deal card.":"Add the subject floor area in the Deal card.":"Add the asking price in the Deal card."}function _s(n,e=""){Bo&&(Bo.textContent=n,Bo.className=e)}async function o1(){if(En)return null;let n=Xb();if(n)return _s(n,"danger"),null;Yt(!0),Do.disabled=!0,Do.textContent="CALCULATING...",_s("Running income, comparable, debt, and evidence checks...");try{let e=await We("/api/tools/residential-dcf",{method:"POST",body:JSON.stringify(jb())});return i1(e.valuation),_s(e.valuation.marketValue?"Evidence-supported indication calculated. Verify professional valuation before transacting.":"Screening value calculated. Missing evidence prevents a market-value label.",e.valuation.marketValue?"ready":"warning"),e.valuation}catch(e){return _s(e.message||"DCF calculation is unavailable.","danger"),null}finally{Yt(!1),Do.disabled=!1,Do.textContent="CALCULATE VALUE"}}async function rm(n=null){if(En)return;let e=n?"":Xb();if(e){_s(e,"danger");return}Yt(!0),hr&&(hr.disabled=!0,hr.textContent="GENERATING..."),_s("Generating the auditable Excel model...");try{let t=n?a1(n):jb(),i=await fetch("/api/tools/residential-dcf/workbook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok){let c=await i.json().catch(()=>({}));throw new Error(c.error||"DCF workbook could not be generated.")}let s=await i.blob(),a=(i.headers.get("content-disposition")||"").match(/filename="([^"]+)"/i)?.[1]||"apex-residential-dcf.xlsx",o=URL.createObjectURL(s),l=document.createElement("a");l.href=o,l.download=a,l.click(),window.setTimeout(()=>URL.revokeObjectURL(o),1e3),_s("Excel DCF downloaded. Open it to review and stress every blue assumption.","ready")}catch(t){_s(t.message||"DCF workbook could not be generated.","danger")}finally{Yt(!1),hr&&(hr.disabled=!1,hr.textContent="DOWNLOAD EXCEL")}}function am(n){return Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`))}function Yb(n,e=[]){return e.some(t=>String(n[t]||"").trim())}function l1(n){return n==="deal"?[{label:"Area/project",keys:["area","projectName"]},{label:"Price",keys:["askingPrice"]},{label:"Rent",keys:["expectedRent"]},{label:"Comps",keys:["comparableTransactions","comparableSource","conservativeFairValue"]},{label:"Site proof",keys:["siteVisitEvidence","siteVisitNotes"]},{label:"Title/legal",keys:["legalTitleType","legalCheck"]}]:n==="profile"?[{label:"Income",keys:["monthlyIncome"]},{label:"Reserve",keys:["cashReserveMonths","cashAvailable"]},{label:"Debt",keys:["currentDebt"]},{label:"Goal",keys:["investmentGoal","portfolioRole"]},{label:"Holding",keys:["holdingPeriod"]},{label:"Concern",keys:["financialConcern","nearTermCommitment"]}]:[{label:"Experience",keys:["experienceLevel"]},{label:"Mode",keys:["guidanceMode"]},{label:"Intent",keys:["decisionIntent"]},{label:"Output",keys:["preferredOutput"]},{label:"Confidence",keys:["confidenceComfort"]}]}function nl(n){let e=am(n),i=Aa(e,n==="deal"?"data-deal-field":"data-profile-field"),s=l1(n),r=s.filter(c=>!Yb(i,c.keys)).map(c=>c.label),a=s.length-r.length,o=Math.round(a/s.length*100),l=o>=80?"ready":o>=40?"watch":"missing";return{panelName:n,context:i,fields:e,groups:s,missing:r,percent:o,status:l}}function nf(){return _a&&rl.get(_a)||null}function Pi(){let n=Qi();oy.innerHTML="<span>Current investigation</span><b>"+p(n.projectName||n.area||"Your next property")+"</b><small>"+p([n.askingPrice,n.expectedRent?n.expectedRent+" rent":""].filter(Boolean).join(" / ")||"Add a property or explore a question first.")+"</small>"}function Kb(n){let e=nl(n),t=e.missing[0];if(!t){e.fields[0]?.focus();return}let i=e.groups.find(a=>a.label===t),s=n==="deal"?"data-deal-field":"data-profile-field";e.fields.find(a=>i?.keys.includes(a.getAttribute(s)))?.focus()}function c1(n){return n.getAttribute("data-deal-field")||n.getAttribute("data-profile-field")||""}function Jb(){try{let n=JSON.parse(window.localStorage.getItem(jp)||"{}");return n&&typeof n=="object"?n:{}}catch{return window.localStorage.removeItem(jp),{}}}function u1(n,e){let t=Jb();t[n]=e,window.localStorage.setItem(jp,JSON.stringify(t))}function om(n){return Jb()[n]==="all"?"all":"core"}function d1(n,e){return n==="deal"?e==="all"?"Advanced evidence fields are visible. Use them when you have proof, not guesses.":"Start with area/project, price, rent, own-stay quality, management, exit pool, supply, and your main concern.":n==="profile"?e==="all"?"Advanced portfolio context is visible. Add it when the deal is moving beyond first screen.":"Start with income, reserve, cash available, debt, goal, holding period, and financial concern.":"Set the answer style once. Apex will use it to sound more like the adviser you need."}function Zb(n,e){let t=n==="deal"?"data-deal-field":"data-profile-field";return am(n).find(i=>i.getAttribute(t)===e)}function lm(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=om(n),i=e.querySelector(`[data-context-assist="${n}"]`);i||(i=document.createElement("section"),i.className="contextAssist",i.setAttribute("data-context-assist",n),e.prepend(i));let s=nl(n),a=s.groups.filter(l=>!Yb(s.context,l.keys)).filter(l=>t==="all"||l.keys.some(c=>Uu[n]?.has(c))).slice(0,3).map(l=>{let c=l.keys.find(u=>Zb(n,u));return c?`<button type="button" data-context-focus-panel="${p(n)}" data-context-focus-key="${p(c)}">${p(l.label)}</button>`:""}).filter(Boolean).join(""),o=n==="deal"?"Deal":n==="profile"?"Profile":"Guidance";i.innerHTML=`
    <header>
      <span><small>${p(o)} guide</small><b>${p(t==="all"?"All fields visible":"Essentials first")}</b></span>
      <button type="button" data-context-field-mode="${p(n)}">${p(t==="all"?"CORE ONLY":"SHOW ALL")}</button>
    </header>
    <p>${p(d1(n,t))}</p>
    ${a?`<div>${a}</div>`:"<em>Enough context for a first pass. Add advanced proof only when the deal deserves deeper work.</em>"}
  `}function Qb(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=om(n);e.classList.toggle("contextCoreMode",t!=="all"),e.classList.toggle("contextAllMode",t==="all"),lm(n)}function h1(n,e){u1(n,e),Qb(n),ge("System ready",e==="all"?"Advanced fields visible.":"Showing only core fields.")}function p1(){for(let n of Object.keys(Uu)){for(let e of am(n)){let t=c1(e),i=e.closest("label");if(!i)continue;let s=Uu[n].has(t);i.classList.toggle("contextCore",s),i.classList.toggle("contextAdvanced",!s),i.dataset.contextDepth=s?"core":"advanced"}Qb(n)}}function cm(){for(let n of Object.keys(Uu))lm(n)}function sy(n={},e=[]){return e.map(([t,i])=>{let s=String(n[t]||"").trim();return s?`${i}: ${s}`:""}).filter(Boolean).join("; ")}function f1(n={}){return!!(n.area||n.projectName||n.askingPrice||n.expectedRent||n.propertyType||n.mainConcern||n.investmentThesis)}function m1(){let n=Qi(),e=Ca(),t=nl("deal"),i=nl("profile"),s=sy(n,[["area","area"],["projectName","project"],["propertyType","type"],["askingPrice","price"],["conservativeFairValue","fair value"],["expectedRent","rent"],["estimatedInstallment","installment"],["maintenance","maintenance"],["ownStayAppeal","own-stay"],["managementQuality","management"],["exitBuyerPool","exit pool"],["nearbySupply","nearby supply"],["mainConcern","concern"]])||"not supplied",r=sy(e,[["monthlyIncome","income"],["cashReserveMonths","reserve"],["cashAvailable","cash available"],["currentDebt","debt"],["riskStyle","risk style"],["investmentGoal","goal"],["holdingPeriod","holding"]])||"not supplied",a=[...t.missing.map(o=>`Deal: ${o}`),...i.missing.map(o=>`Profile: ${o}`)].slice(0,6).join("; ")||"no major card gap from the current quick screen";return["Run Apex Deal Screening Mode as a first-pass mentor check, not a full formal report.","Use this exact structure: Verdict, Why, Main risk, Missing proof, Next questions.","Keep it short, human, and direct. Ask at most 3 next questions. Do not create a long report.",`Deal card: ${s}`,`Profile card: ${r}`,`Known missing context: ${a}`].join(`
`)}async function ex(){if(En)return;let n=Qi();if(!f1(n)){ws("jarvis","Open the Deal card and give me at least the area/project, price, rent, or your main concern. Then I can screen it without turning the page into a full report.");let e=Mi.find(t=>t.getAttribute("data-context-toggle")==="deal");e&&Ti(e,!0),Kb("deal");return}Tn(),Ai("Screening the deal."),Xi&&(Xi.disabled=!0,Xi.textContent="SCREENING"),ge("Screening","Running a first-pass deal screen.");try{await Ia(m1(),{displayText:"Screen this deal using my current Deal/Profile cards."})}finally{Xi&&(Xi.disabled=!1,Xi.textContent="SCREEN")}}function Hu(n,e,t){let i=Aa(n,e);Gu(),Pi(),cm()}function g1(n){let e=n==="deal",t=Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`)),i=e?Es:yr,s=e?"data-deal-field":"data-profile-field",r=e?$f:Vf;for(let l of t)l.value="";e&&qb(!1);let a=Aa(i,s);Object.keys(a).length?window.localStorage.setItem(r,JSON.stringify(a)):window.localStorage.removeItem(r),Gu();let o=n==="guidance"?"Guidance":e?"Deal":"Profile";Pi(),cm(),ge("System ready",`${o} details cleared.`)}function v1(){try{return JSON.parse(window.localStorage.getItem(Du)||"{}")}catch{return window.localStorage.removeItem(Du),{}}}function Ti(n,e,t=!0){let i=n.getAttribute("data-context-toggle"),s=document.querySelector(`[data-context-body="${i}"]`),r=n.querySelector(".contextAction");if(s){if(e){tn(i);for(let a of Mi)a!==n&&Ti(a,!1,!1)}if(n.setAttribute("aria-expanded",String(e)),s.hidden=!e,n.closest(".contextPanel")?.classList.toggle("expanded",e),r&&(r.textContent=e?"CLOSE":"OPEN"),e&&lm(i),t){let a=Mi.reduce((o,l)=>{let c=l.getAttribute("data-context-toggle");return o[c]=l===n?e:!1,o},{});window.localStorage.setItem(Du,JSON.stringify(a))}}}function y1(){let n=v1(),e=Object.entries(n).find(([,t])=>t)?.[0];for(let t of Mi){let i=t.getAttribute("data-context-toggle");Ti(t,i===e,!1),t.addEventListener("click",()=>{let s=t.getAttribute("aria-expanded")==="true";Ti(t,!s)})}for(let t of uA)t.addEventListener("click",()=>g1(t.getAttribute("data-context-reset")))}function Tn(){let n={};for(let e of Mi)Ti(e,!1,!1),n[e.getAttribute("data-context-toggle")]=!1;window.localStorage.setItem(Du,JSON.stringify(n))}function Ai(n="Voice stopped."){Yp+=1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),bs&&(bs.pause(),bs.src="",bs=null),$o&&(URL.revokeObjectURL($o),$o=""),pr=!0,xs(!1),Yi||ge("System ready",n)}async function b1(n){Ai("Ready when you are.");let e=++Yp;try{xs(!0),ge("Speaking","Delivering analysis.");let t=await fetch("/api/jarvis/speech",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":ol()},body:JSON.stringify({text:n})});if(!t.ok){let i=await t.json().catch(()=>({}));throw new Error(i.error||"Server voice is unavailable.")}if(e!==Yp)return;$o=URL.createObjectURL(await t.blob()),bs=new Audio($o),bs.onended=()=>{xs(!1),ge("System ready",pr?"Voice stopped.":"Ready when you are."),Ai("Ready when you are."),pr=!1},bs.onerror=()=>{xs(!1),ge("Voice interrupted","The written answer is still available.")},await bs.play()}catch{xs(!1),ge("Voice interrupted","The written answer is still available.")}}function sf(n){if(!Dn)return;let e=pA(n);if(!("speechSynthesis"in window)){ib&&b1(e);return}Ai("Ready when you are.");let t=new SpeechSynthesisUtterance(e);t.rate=.96,t.pitch=.9,t.onstart=()=>{pr=!1,xs(!0),ge("Speaking","Delivering analysis.")},t.onend=()=>{xs(!1),ge("System ready",pr?"Voice stopped.":"Ready when you are."),pr=!1},t.onerror=()=>{xs(!1),pr=!1},window.speechSynthesis.speak(t)}function x1(n){return new Promise((e,t)=>{let i=new FileReader;i.onload=()=>e(String(i.result||"").split(",")[1]||""),i.onerror=t,i.readAsDataURL(n)})}async function _1(){if(lr?.state==="recording"){lr.stop();return}if(!nb||!window.MediaRecorder||!navigator.mediaDevices?.getUserMedia){ge("Voice unavailable","Use the command bar on this browser."),wn.focus();return}try{Yi=!0,Sp=await navigator.mediaDevices.getUserMedia({audio:!0}),wp=[];let n=["audio/webm;codecs=opus","audio/webm","audio/mp4"].find(e=>MediaRecorder.isTypeSupported(e));lr=new MediaRecorder(Sp,n?{mimeType:n}:void 0),lr.ondataavailable=e=>{e.data.size&&wp.push(e.data)},lr.onstop=async()=>{Yi=!1,Xn.classList.remove("listening"),Sp?.getTracks().forEach(t=>t.stop());let e=new Blob(wp,{type:lr.mimeType||"audio/webm"});if(!e.size)return ge("Voice interrupted","No recording was captured.");ge("Analyzing","Transcribing your message."),Yt(!0);try{let t=await We("/api/jarvis/transcribe",{method:"POST",body:JSON.stringify({audioBase64:await x1(e),mimeType:e.type,filename:e.type.includes("mp4")?"voice.mp4":"voice.webm"})});wn.value=t.text,Yt(!1),await Ia(t.text)}catch(t){ge("Voice interrupted",t.message||"Voice transcription failed.")}finally{Yt(!1)}},lr.start(),Yi=!0,Xn.classList.add("listening"),ge("Listening","Speak naturally. Tap again when finished.")}catch{Yi=!1,ge("Voice interrupted","Microphone access was not available.")}}async function We(n,e={}){let t=await fetch(n,{...e,credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":ol(),...e.headers||{}}});if(!t.ok){let s=await t.json().catch(()=>({})),r=new Error(s.error||"Apex Analytic backend is unavailable.");throw r.status=t.status,r.payload=s,r}if(t.status===204)return null;let i=await t.json();return i.session&&Gu({sessionId:i.session.id,messages:i.session.messages||[],...i.analysis?{report:{analysis:{...i.analysis,savedReportId:i.savedReport?.id},sources:i.sources||[],mode:i.mode,messageId:i.message?.id}}:{}}),i}async function S1(){let n=await We("/api/auth/me");return ll(n.authenticated?n.user:null),n}async function w1(){let n=Ji==="register"?"/api/auth/register":"/api/auth/login",e={email:cf.value.trim(),password:Cp.value};Ji==="register"&&(e.displayName=ly.value.trim()),Rp.disabled=!0,ya.textContent=Ji==="register"?"Creating your private account...":"Signing in...";try{let t=await We(n,{method:"POST",body:JSON.stringify(e)});ll(t.user),Cp.value="",ge("System ready",t.verificationPending?"Account ready. Verify your email when convenient.":`Welcome back, ${t.user.displayName}.`)}catch(t){ya.textContent=t.message||"Account access is unavailable."}finally{Rp.disabled=!1}}async function E1(){let n=Su.value.trim();if(!n)return Su.focus();Ip.disabled=!0,ma.textContent="Sending reset instructions...";try{let e=await We("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:n})});ma.textContent=e.message,e.debug?.token&&(dy.value=e.debug.token)}catch(e){ma.textContent=e.message||"Password recovery is unavailable."}finally{Ip.disabled=!1}}async function M1(){$v.disabled=!0,ma.textContent="Updating password...";try{await We("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:dy.value.trim(),password:Bv.value})}),Bv.value="",zf(!1),tl("login"),ya.textContent="Password updated. Sign in with the new password."}catch(n){ma.textContent=n.message||"Password could not be updated."}finally{$v.disabled=!1}}async function T1(){Eu.disabled=!0;try{let n=await We("/api/auth/request-verification",{method:"POST",body:"{}"});n.debug?.token&&(wu.value=n.debug.token),ge("System ready",n.sent?"Verification code sent.":"Verification request created.")}catch(n){ge("Connection issue",n.message||"Verification is unavailable.")}finally{Eu.disabled=!1}}async function A1(){let n=wu.value.trim();if(!n)return wu.focus();Mu.disabled=!0;try{let e=await We("/api/auth/verify-email",{method:"POST",body:JSON.stringify({token:n})});ll(e.user),ge("System ready","Email verified.")}catch(e){ge("Connection issue",e.message||"Verification failed.")}finally{Mu.disabled=!1}}function C1(n){let e=new Date(n.updatedAt),t=Number.isNaN(e.getTime())?"Recent":e.toLocaleString([],{dateStyle:"medium",timeStyle:"short"}),i=n.id===Wt;return`
    <article class="sessionItem${i?" current":""}">
      <button class="sessionOpen" type="button" data-session-action="open" data-session-id="${p(n.id)}">
        <b>${p(n.title||"Untitled conversation")}</b>
        <span>${p(t)} / ${p(n.messageCount||0)} messages${i?" / CURRENT":""}</span>
      </button>
      <button class="sessionDelete" type="button" data-session-action="delete" data-session-id="${p(n.id)}" aria-label="Delete ${p(n.title||"conversation")}">DELETE</button>
    </article>
  `}async function tx(){let n=await We("/api/jarvis/sessions"),e=Array.isArray(n.sessions)?n.sessions:[];return Au.innerHTML=e.length?e.map(C1).join(""):'<p class="memoryEmpty">No saved conversations yet.</p>',e}function Ra(){df.hidden=!0,qu.setAttribute("aria-expanded","false"),document.body.classList.remove("historyOpen")}async function nx(){tn("history"),Bn(),dn(),hn(),pn(),nn(),fn(),mn(),gn(),un(),Mn(),Tn(),df.hidden=!1,qu.setAttribute("aria-expanded","true"),document.body.classList.add("historyOpen"),Au.innerHTML='<p class="memoryEmpty">Loading conversation history...</p>';try{await tx()}catch(n){Au.innerHTML=`<p class="memoryEmpty">${p(n.message)}</p>`}}async function R1(n){let e=n.getAttribute("data-session-id"),t=n.getAttribute("data-session-action");if(!(!e||!t||En)){Yt(!0);try{if(t==="open"){await sx(e),Ra(),tn("chat"),ge("System ready","Conversation restored.");return}await We(`/api/jarvis/sessions/${encodeURIComponent(e)}`,{method:"DELETE"}),e===Wt&&(window.localStorage.removeItem(As),Wt=null,await zu()),await tx()}catch(i){ge("Connection issue",i.message||"Conversation history could not be updated.")}finally{Yt(!1)}}}async function I1(){Pp.disabled=!0;try{dn(),hn(),pn(),nn(),fn(),mn(),gn(),Ra(),await We("/api/auth/logout",{method:"POST",body:"{}"}),window.localStorage.removeItem(As),Wt=null,ll(null),tl("login"),ge("System ready","Signed out. Guest space ready.")}catch(n){ya.textContent=n.message||"Sign out is unavailable."}finally{Pp.disabled=!1}}async function zu(n=!0){let e=await We("/api/jarvis/sessions",{method:"POST",body:JSON.stringify({clientId:ol()})});return Wt=e.session.id,window.localStorage.setItem(As,Wt),Ts("READY"),n&&(Gt.innerHTML=""),_a="",document.body.classList.remove("conversationActive"),Pi(),e.session}async function ix(){if(!En){Yt(!0),Ai("Chat reset."),Ra(),ge("Starting","Creating a new conversation."),tn("chat"),Gt.innerHTML="",_a="",document.body.classList.remove("conversationActive"),Pi(),window.localStorage.removeItem(As),Wt=null;try{await zu(),ge("System ready","New chat ready. Your previous conversation remains in History.")}catch{ge("Connection issue","Apex Analytic backend is unavailable."),Ts("OFFLINE")}finally{Yt(!1)}}}async function sx(n,e=!0){let t=await We(`/api/jarvis/sessions/${n}`);return Wt=t.session.id,window.localStorage.setItem(As,Wt),e&&Wb(t.session),Ts(`${t.session.messages.length} MSG`),t.session}async function rx(){if(!Wt)return zu(!1);try{return await sx(Wt,!1)}catch{return zu(!1)}}async function P1(n){await rx();let e=ob(n),t=await We("/api/jarvis/query",{method:"POST",body:JSON.stringify({query:n,inputMode:e.id,sessionId:Wt,clientId:ol(),dealCard:Qi(),financialProfile:Ca(),responseFeedback:mA()})});Wt=t.session.id,window.localStorage.setItem(As,Wt);let i=t.mode==="llm"?"AI":"FRAMEWORK";return Ts(`${i} / ${t.session.messages.length}`),t}async function Ia(n,e={}){let t=String(n||"").trim();if(!t||En)return;Yt(!0);let i=String(e.displayText||t).trim();ws("user",i),wn.value="",id(""),ge("Analyzing","Reviewing your knowledge and prior decisions."),Xn.classList.add("speaking");try{let s=await P1(t);ws("jarvis",s.answer,s.sources,s),tC(s.memoryCandidate),sf(Ci(s.answer)),Dn||ge("System ready","Ready when you are.")}catch(s){let r=s.message||"The Apex Analytic backend is unavailable.";ws("jarvis",r),sf(r),ge("Connection issue","Start Apex Analytic and try again."),Ts("OFFLINE")}finally{Yt(!1),!nd&&!window.speechSynthesis?.speaking&&Xn.classList.remove("speaking")}}async function il(){if(En)return;let n=Qi(),e=Ca(),t=gd();if(!n.askingPrice||!n.area&&!n.projectName){ws("jarvis","Add an asking price and an area or project first. I can work with missing evidence after that, but I need a real deal to analyse.");let i=Mi.find(r=>r.getAttribute("data-context-toggle")==="deal");i&&Ti(i,!0),Es.find(r=>{let a=r.getAttribute("data-deal-field");return a==="askingPrice"&&!n.askingPrice||a==="area"&&!n.area&&!n.projectName})?.focus();return}if(wA("deal-analysis")){tn("chat"),Yt(!0),Tn(),Ai("Running the full framework."),ws("user","Run the seven-stage Apex Analytic assessment for this deal."),ko.disabled=!0,ko.textContent="ANALYSING...",ge("Analyzing","Running all seven Apex Analytic stages."),Xn.classList.add("speaking");try{await rx();let i=await We("/api/jarvis/analyze-deal",{method:"POST",body:JSON.stringify({sessionId:Wt,clientId:ol(),dealCard:n,financialProfile:e,valuation:t})});Wt=i.session.id,window.localStorage.setItem(As,Wt);let s=i.mode==="llm"?"AI":"FRAMEWORK";Ts(`${s} / ${i.session.messages.length}`),i.billing&&ld(i.billing),i.savedReport&&(i.analysis.savedReportId=i.savedReport.id),sm(i.analysis,i.sources,i),sf(Ci(i.analysis.voiceSummary)),Dn||ge("System ready","Analysis complete.")}catch(i){let s=i.message||"The deal analysis is unavailable.";ws("jarvis",s),ge("Connection issue","Deal analysis could not be completed.")}finally{ko.textContent="Decision report",Yt(!1),!nd&&!window.speechSynthesis?.speaking&&Xn.classList.remove("speaking")}}}function L1(){if(!En){if(nd||window.speechSynthesis?.speaking){Ai("Voice stopped.");return}if(!li){_1();return}if(Yi){li.stop();return}li.start()}}async function N1(){Oo.textContent=Dn?"VOICE ON":"VOICE OFF",Oo.setAttribute("aria-pressed",String(Dn)),document.body.classList.toggle("voiceMuted",!Dn),p1(),rd(),id(),Pi(),cl(),y1(),tl("login");try{let n=await We("/api/jarvis/status"),e=n.llm?.enabled?"AI":"FRAMEWORK";nb=!!n.audio?.serverStt,ib=!!n.audio?.serverTts,fa=!!n.accounts?.emailDelivery,sb=!!n.accounts?.verificationRequired,al=!!n.ownerMarket?.enabled,tl(Ji),DM.hidden=!n.llm?.enabled,await S1(),Ts(`${e} READY`),ge("System ready","Ready when you are.")}catch{ge("Connection issue","Apex Analytic backend is unavailable."),Ts("OFFLINE")}}function D1(){return En||Yi}function O1(n){if(En)return!1;zo="",Ai("Ready for this property.");for(let i of Es)i.value=n.dealCard?.[i.dataset.dealField]??"";for(let i of yr)i.value=n.financialProfile?.[i.dataset.profileField]??"";qb(!1);let e=n.dcfContext||{};for(let i of ed)e[i.dataset.dcfField]!==void 0&&(i.value=e[i.dataset.dcfField]);for(let[i,s]of td.entries())for(let r of s.querySelectorAll("[data-dcf-comp-field]")){let a=e.comparables?.[i]?.[r.dataset.dcfCompField];r.type==="checkbox"?r.checked=a===!0:r.value=a??""}document.querySelector("#valuationResult").replaceChildren(),Wt=n.sessionId||null,rl.clear(),_a="";let t=n.messages||(n.chat||[]).map(i=>({role:i.role,content:i.text,mode:i.mode}));return Wb({messages:n.report?.analysis?t.filter(i=>i.id!==n.report.messageId):t}),n.report?.analysis&&sm(n.report.analysis,n.report.sources,{mode:n.report.mode}),zo=n.id,Pi(),cm(),!0}async function k1(n,e={}){if(!En){if(n==="account")return Ma();if(n==="trust")return Gf();if(n==="reports")return qf();if(n==="journal")return cd();if(n==="memory")return vb();if(n==="history")return nx();if(n==="shortlist")return Kf();if(n==="owner")return Vb();if(n==="market")return md();if(n==="cases")return pd();if(n==="evidence")return fd();Bn(),un(),hn(),pn(),dn(),Ra(),Mn(),nn(),fn(),mn(),gn(),Tn(),["deal","profile","guidance"].includes(n)?Ti(Mi.find(t=>t.dataset.contextToggle===n),!0,!1):tn(n),n==="chat"&&(e.prompt&&(wn.value=e.prompt),e.analyze&&!nf()?await il():wn.focus({preventScroll:!0}))}}var zo,Xn,_u,wn,IM,bp,Gt,PM,LM,NM,Oo,ry,ay,Ap,ko,Xi,DM,oy,rf,OM,af,kM,of,lf,UM,ly,cf,Cp,Rp,cy,uy,ya,uf,Su,Ip,dy,Bv,$v,FM,ma,BM,$M,VM,Vv,wu,Eu,Mu,Pp,Wu,wa,HM,Hv,xp,Tu,zM,GM,Uo,Fo,zv,WM,qM,jM,XM,qu,df,YM,hy,Au,KM,JM,ZM,ju,py,Xu,hf,QM,eT,tT,mr,Yu,pf,nT,fy,iT,sT,ba,Lp,rT,sl,aT,ff,mf,gf,vf,yf,bf,xf,oT,lT,wi,cT,uT,dT,my,gy,vy,yy,by,xy,_y,Sy,wy,hT,Un,_f,Ku,pT,fT,ci,mT,gT,Gv,Ey,Np,bu,Dp,Op,vT,kp,yT,Up,Cu,It,Ei,xa,bT,Sf,xT,_T,wf,Wv,ST,My,Ef,qv,wT,ET,MT,Ju,Ru,Ty,jv,Mf,Tf,TT,Af,Cf,AT,Rf,If,CT,Pf,Lf,RT,IT,PT,LT,Fp,NT,Go,DT,OT,kT,Wo,UT,FT,Nf,Ea,gr,qo,jo,Xo,Yo,Ay,Cy,Ry,Iy,Zu,Py,Ly,Ny,Dy,Oy,ky,Uy,Fy,By,$y,Df,Of,BT,Bp,$p,Vy,Hy,$T,Xv,zy,Iu,kf,VT,Ko,HT,zT,Vp,Pu,Gy,GT,Wy,Lu,WT,Uf,qy,qT,Yv,Hp,jT,XT,YT,KT,JT,ZT,QT,eA,tA,zp,vr,jy,ga,nA,iA,Nu,Xy,sA,Yy,Gp,Wp,qp,rA,Kv,_p,aA,oA,Ky,Ff,Jv,Qu,Bf,lA,cA,Jy,Zy,Es,yr,ed,td,Do,hr,Bo,Mi,uA,dA,Zv,li,As,$f,Vf,hA,Du,jp,Qv,Qy,eb,Ms,tb,Xp,rl,Dn,Yi,nd,pr,Yp,Wt,Ji,gt,nb,ib,fa,sb,lr,Sp,wp,bs,$o,va,Vo,Ou,al,Zi,rb,Jo,Zo,Ss,pa,Qo,ku,el,ab,Kp,Jp,fr,_a,En,Uu,cr,Hf,ox=Cx(()=>{zo="";Xn=document.querySelector("#jarvisOrb"),_u=document.querySelector("#chatForm"),wn=document.querySelector("#chatInput"),IM=_u.querySelector('button[type="submit"]'),bp=document.querySelector("#inputModeHint"),Gt=document.querySelector("#transcript"),PM=document.querySelector("#assistantPrompt"),LM=document.querySelector("#systemStatus"),NM=document.querySelector("#sessionStatus"),Oo=document.querySelector("#soundToggle"),ry=document.querySelector("#stopVoiceBtn"),ay=document.querySelector("#resetChatBtn"),Ap=document.querySelector("#sessionBriefBtn"),ko=document.querySelector("#analyzeDealBtn"),Xi=document.querySelector("#screenDealBtn"),DM=document.querySelector("#aiDisclosure"),oy=document.querySelector("#dealJourney"),rf=document.querySelector("#accountToggle"),OM=document.querySelector("#accountLabel"),af=document.querySelector("#authPanel"),kM=document.querySelector("#authClose"),of=document.querySelector("#authTitle"),lf=document.querySelector("#authForm"),UM=document.querySelector("#authNameField"),ly=document.querySelector("#authName"),cf=document.querySelector("#authEmail"),Cp=document.querySelector("#authPassword"),Rp=document.querySelector("#authSubmit"),cy=document.querySelector("#authModeToggle"),uy=document.querySelector("#authRecoveryToggle"),ya=document.querySelector("#authMessage"),uf=document.querySelector("#authRecovery"),Su=document.querySelector("#recoveryEmail"),Ip=document.querySelector("#recoveryRequest"),dy=document.querySelector("#recoveryToken"),Bv=document.querySelector("#recoveryPassword"),$v=document.querySelector("#recoverySubmit"),FM=document.querySelector("#recoveryCancel"),ma=document.querySelector("#recoveryMessage"),BM=document.querySelector("#authUser"),$M=document.querySelector("#authUserName"),VM=document.querySelector("#authUserEmail"),Vv=document.querySelector("#authVerificationState"),wu=document.querySelector("#verificationToken"),Eu=document.querySelector("#verificationRequest"),Mu=document.querySelector("#verificationSubmit"),Pp=document.querySelector("#logoutButton"),Wu=document.querySelector("#memoryToggle"),wa=document.querySelector("#memoryPanel"),HM=document.querySelector("#memoryClose"),Hv=document.querySelector("#memoryForm"),xp=document.querySelector("#memoryInput"),Tu=document.querySelector("#memoryList"),zM=document.querySelector("#memoryApprovedCount"),GM=document.querySelector("#memoryPendingCount"),Uo=document.querySelector("#memoryCaptureEnabled"),Fo=document.querySelector("#memoryReasoningEnabled"),zv=document.querySelector("#memoryModeNotice"),WM=document.querySelector("#memoryProfileTitle"),qM=document.querySelector("#memoryProfileCompleteness"),jM=document.querySelector("#memoryProfileSummary"),XM=document.querySelector("#memoryProfileDetails"),qu=document.querySelector("#historyToggle"),df=document.querySelector("#sessionPanel"),YM=document.querySelector("#sessionClose"),hy=document.querySelector("#sessionNew"),Au=document.querySelector("#sessionList"),KM=document.querySelector("#billingSummary"),JM=document.querySelector("#billingPlanName"),ZM=document.querySelector("#billingUsage"),ju=document.querySelector("#billingActions"),py=document.querySelector("#billingGuardrail"),Xu=document.querySelector("#reportsToggle"),hf=document.querySelector("#reportsPanel"),QM=document.querySelector("#reportsClose"),eT=document.querySelector("#reportsSavedCount"),tT=document.querySelector("#reportsUsageLabel"),mr=document.querySelector("#reportsList"),Yu=document.querySelector("#journalToggle"),pf=document.querySelector("#journalPanel"),nT=document.querySelector("#journalClose"),fy=document.querySelector("#journalSummary"),iT=document.querySelector("#journalTotalCount"),sT=document.querySelector("#journalReviewedCount"),ba=document.querySelector("#journalList"),Lp=document.querySelector("#journalEditor"),rT=document.querySelector("#journalBack"),sl=document.querySelector("#journalDecisionId"),aT=document.querySelector("#journalSubject"),ff=document.querySelector("#journalDecision"),mf=document.querySelector("#journalConfidence"),gf=document.querySelector("#journalHoldingPeriod"),vf=document.querySelector("#journalThesis"),yf=document.querySelector("#journalCounterThesis"),bf=document.querySelector("#journalKillCriterion"),xf=document.querySelector("#journalNotes"),oT=document.querySelector("#journalDraftActions"),lT=document.querySelector("#journalSaveDraft"),wi=document.querySelector("#journalLock"),cT=document.querySelector("#journalDelete"),uT=document.querySelector("#journalLockNotice"),dT=document.querySelector("#journalOutcome"),my=document.querySelector("#journalOutcomeStatus"),gy=document.querySelector("#journalActualRent"),vy=document.querySelector("#journalCurrentValue"),yy=document.querySelector("#journalProcessScore"),by=document.querySelector("#journalExecutionScore"),xy=document.querySelector("#journalOutcomeScore"),_y=document.querySelector("#journalLuckScore"),Sy=document.querySelector("#journalResult"),wy=document.querySelector("#journalLesson"),hT=document.querySelector("#journalSaveReview"),Un=document.querySelector("#journalMessage"),_f=document.querySelector("#ownerIntelToggle"),Ku=document.querySelector("#ownerIntelPanel"),pT=document.querySelector("#ownerIntelClose"),fT=document.querySelector("#ownerIntelAccess"),ci=document.querySelector("#ownerIntelToken"),mT=document.querySelector("#ownerIntelClearToken"),gT=document.querySelector("#ownerIntelSummary"),Gv=document.querySelector("#ownerIntelOpsDashboard"),Ey=document.querySelector("#ownerIntelControls"),Np=document.querySelector("#ownerIntelOpsRefresh"),bu=document.querySelector("#ownerIntelCopyBrief"),Dp=document.querySelector("#ownerIntelExport"),Op=document.querySelector("#ownerIntelImport"),vT=document.querySelector("#ownerIntelRestoreHistory"),kp=document.querySelector("#ownerIntelBackupReminder"),yT=document.querySelector("#ownerIntelBeliefReview"),Up=document.querySelector("#ownerIntelBeliefLog"),Cu=document.querySelector("#ownerIntelImportFile"),It=document.querySelector("#ownerIntelRestorePhrase"),Ei=document.querySelector("#ownerIntelRestoreConfirm"),xa=document.querySelector("#ownerIntelRestoreLog"),bT=document.querySelector("#ownerIntelLanes"),Sf=document.querySelector("#ownerIntelCoverage"),xT=document.querySelector("#ownerIntelNextTitle"),_T=document.querySelector("#ownerIntelNextDetail"),wf=document.querySelector("#ownerIntelActions"),Wv=document.querySelector("#ownerIntelMessage"),ST=document.querySelector("#ownerAdminLoad"),My=document.querySelector("#ownerAdminSummary"),Ef=document.querySelector("#ownerAdminList"),qv=document.querySelector("#ownerResearchPanel"),wT=document.querySelector("#ownerResearchSummary"),ET=document.querySelector("#ownerResearchRefresh"),MT=document.querySelector("#ownerResearchImport"),Ju=document.querySelector("#ownerResearchReplace"),Ru=document.querySelector("#ownerResearchFile"),Ty=document.querySelector("#ownerResearchList"),jv=document.querySelector("#ownerResearchMessage"),Mf=document.querySelector("#ownerMarketToggle"),Tf=document.querySelector("#ownerMarketPanel"),TT=document.querySelector("#ownerMarketClose"),Af=document.querySelector("#ownerCaseToggle"),Cf=document.querySelector("#ownerCasePanel"),AT=document.querySelector("#ownerCaseClose"),Rf=document.querySelector("#ownerEvidenceToggle"),If=document.querySelector("#ownerEvidencePanel"),CT=document.querySelector("#ownerEvidenceClose"),Pf=document.querySelector("#trustToggle"),Lf=document.querySelector("#trustPanel"),RT=document.querySelector("#trustClose"),IT=document.querySelector("#trustAcceptance"),PT=document.querySelector("#trustAcceptanceTitle"),LT=document.querySelector("#trustAcceptanceDetail"),Fp=document.querySelector("#trustAccept"),NT=document.querySelector("#ownerMarketAccess"),Go=document.querySelector("#ownerMarketToken"),DT=document.querySelector("#ownerMarketClearToken"),OT=document.querySelector("#ownerMarketSummary"),kT=document.querySelector("#ownerCaseAccess"),Wo=document.querySelector("#ownerCaseToken"),UT=document.querySelector("#ownerCaseClearToken"),FT=document.querySelector("#ownerCaseSummary"),Nf=document.querySelector("#ownerCaseForm"),Ea=document.querySelector("#ownerCaseProject"),gr=document.querySelector("#ownerCaseProjectName"),qo=document.querySelector("#ownerCaseArea"),jo=document.querySelector("#ownerCaseState"),Xo=document.querySelector("#ownerCaseType"),Yo=document.querySelector("#ownerCaseDeveloper"),Ay=document.querySelector("#ownerCasePriceSegment"),Cy=document.querySelector("#ownerCaseVerdict"),Ry=document.querySelector("#ownerCaseConfidence"),Iy=document.querySelector("#ownerCaseRating"),Zu=document.querySelector("#ownerCaseObservedAt"),Py=document.querySelector("#ownerCaseTags"),Ly=document.querySelector("#ownerCaseTargetBuyer"),Ny=document.querySelector("#ownerCaseTargetTenant"),Dy=document.querySelector("#ownerCaseStrengths"),Oy=document.querySelector("#ownerCaseWeaknesses"),ky=document.querySelector("#ownerCaseManagement"),Uy=document.querySelector("#ownerCaseResident"),Fy=document.querySelector("#ownerCaseSupply"),By=document.querySelector("#ownerCaseRental"),$y=document.querySelector("#ownerCaseResale"),Df=document.querySelector("#ownerCaseOwnerVerdict"),Of=document.querySelector("#ownerCaseSourceBasis"),BT=document.querySelector("#ownerCaseRefresh"),Bp=document.querySelector("#ownerCaseFilter"),$p=document.querySelector("#ownerCaseVerdictFilter"),Vy=document.querySelector("#ownerCaseCompletenessFilter"),Hy=document.querySelector("#ownerCaseList"),$T=document.querySelector("#ownerCaseMetrics"),Xv=document.querySelector("#ownerCaseMessage"),zy=document.querySelector("#ownerCaseFormTitle"),Iu=document.querySelector("#ownerCaseSubmit"),kf=document.querySelector("#ownerCaseCancelEdit"),VT=document.querySelector("#ownerEvidenceAccess"),Ko=document.querySelector("#ownerEvidenceToken"),HT=document.querySelector("#ownerEvidenceClearToken"),zT=document.querySelector("#ownerEvidenceSummary"),Vp=document.querySelector("#ownerEvidenceForm"),Pu=document.querySelector("#ownerEvidenceTitle"),Gy=document.querySelector("#ownerEvidenceFilename"),GT=document.querySelector("#ownerEvidenceSourceUrl"),Wy=document.querySelector("#ownerEvidenceTags"),Lu=document.querySelector("#ownerEvidenceText"),WT=document.querySelector("#ownerEvidenceRefresh"),Uf=document.querySelector("#ownerEvidenceFilter"),qy=document.querySelector("#ownerEvidenceList"),qT=document.querySelector("#ownerEvidenceMetrics"),Yv=document.querySelector("#ownerEvidenceMessage"),Hp=document.querySelector("#ownerProjectForm"),jT=document.querySelector("#ownerProjectName"),XT=document.querySelector("#ownerProjectArea"),YT=document.querySelector("#ownerProjectState"),KT=document.querySelector("#ownerProjectType"),JT=document.querySelector("#ownerProjectDeveloper"),ZT=document.querySelector("#ownerProjectTenure"),QT=document.querySelector("#ownerProjectCompletionYear"),eA=document.querySelector("#ownerProjectStatus"),tA=document.querySelector("#ownerProjectAliases"),zp=document.querySelector("#ownerObservationForm"),vr=document.querySelector("#ownerObservationProject"),jy=document.querySelector("#ownerObservationMetric"),ga=document.querySelector("#ownerObservationArea"),nA=document.querySelector("#ownerObservationValue"),iA=document.querySelector("#ownerObservationUnit"),Nu=document.querySelector("#ownerObservationDate"),Xy=document.querySelector("#ownerObservationSourceType"),sA=document.querySelector("#ownerObservationConfidence"),Yy=document.querySelector("#ownerObservationNotes"),Gp=document.querySelector("#ownerMarketAreaFilter"),Wp=document.querySelector("#ownerMarketMetricFilter"),qp=document.querySelector("#ownerMarketFreshnessFilter"),rA=document.querySelector("#ownerMarketRefresh"),Kv=document.querySelector("#ownerMarketImportForm"),_p=document.querySelector("#ownerMarketImportText"),aA=document.querySelector("#ownerProjectCount"),oA=document.querySelector("#ownerObservationCount"),Ky=document.querySelector("#ownerProjectList"),Ff=document.querySelector("#ownerObservationList"),Jv=document.querySelector("#ownerMarketMessage"),Qu=document.querySelector("#shortlistToggle"),Bf=document.querySelector("#shortlistPanel"),lA=document.querySelector("#shortlistClose"),cA=document.querySelector("#shortlistSummary"),Jy=document.querySelector("#shortlistList"),Zy=document.querySelector("#shortlistClear"),Es=Array.from(document.querySelectorAll("[data-deal-field]")),yr=Array.from(document.querySelectorAll("[data-profile-field]")),ed=Array.from(document.querySelectorAll("[data-dcf-field]")),td=Array.from(document.querySelectorAll("[data-dcf-comparable]")),Do=document.querySelector("#dcfCalculateBtn"),hr=document.querySelector("#dcfDownloadBtn"),Bo=document.querySelector("#dcfMessage"),Mi=Array.from(document.querySelectorAll("[data-context-toggle]")),uA=Array.from(document.querySelectorAll("[data-context-reset]")),dA=Array.from(document.querySelectorAll("[data-starter-prompt], [data-starter-action]")),Zv=window.SpeechRecognition||window.webkitSpeechRecognition,li=Zv?new Zv:null,As="estatelab.jarvis.sessionId",$f="estatelab.jarvis.dealCard",Vf="estatelab.jarvis.financialProfile",hA="apex.residentialDcf.v1",Du="estatelab.jarvis.contextPanels",jp="apex.contextFieldMode.v1",Qv="apex.shortlist.v1",Qy="apex.responseFeedback.v1",eb="apex.voiceResponses.v1",Ms="apex.ownerMarket.token",tb="apex.ownerKnowledge.lastBackup.v1",Xp="apex.trustBoundary.accepted.v1",rl=new Map,Dn=window.localStorage.getItem(eb)==="true",Yi=!1,nd=!1,pr=!1,Yp=0,Wt=window.localStorage.getItem(As),Ji="login",gt=null,nb=!1,ib=!1,fa=!1,sb=!1,lr=null,Sp=null,wp=[],bs=null,$o="",va=null,Vo=null,Ou=[],al=!1,Zi=[],rb=[],Jo="all",Zo=null,Ss=null,pa=[],Qo=null,ku=[],el="",ab={},Kp=[],Jp=!1,fr="",_a="",En=!1;Uu={deal:new Set(["area","projectName","propertyType","askingPrice","conservativeFairValue","expectedRent","estimatedInstallment","maintenance","ownStayAppeal","managementQuality","exitBuyerPool","nearbySupply","mainConcern"]),profile:new Set(["monthlyIncome","cashReserveMonths","cashAvailable","currentDebt","investmentGoal","holdingPeriod","financialConcern"]),guidance:new Set(["experienceLevel","guidanceMode","decisionIntent","preferredOutput","confidenceComfort","onboardingNotes"])};cr={chat:{label:"CHAT",placeholder:"Ask Apex Analytic...",prompt:"Ask naturally. Apex will route the response style."},screen:{label:"SCREEN",placeholder:"Ask if this deal should be shortlisted...",prompt:"Screening mode: include area, price, rent, and concern if you have them."},compare:{label:"COMPARE",placeholder:"Compare two projects, areas, or deals...",prompt:"Comparison mode: name both options and the decision you need."},offer:{label:"OFFER",placeholder:"Prepare offer, negotiation, or walk-away price...",prompt:"Offer mode: Apex will focus on price proof, leverage, and walk-away rule."},checklist:{label:"CHECKLIST",placeholder:"Ask for a checklist or next action list...",prompt:"Checklist mode: Apex will convert the answer into action items."},voice:{label:"VOICE",placeholder:"Ask for a short voice-safe answer...",prompt:"Voice mode: Apex will keep the spoken answer compact."}};Hf=[{id:"useful",label:"Useful",note:"Keep this answer shape."},{id:"shorter",label:"Shorter",note:"Make future answers shorter and lead with the decision."},{id:"warmer",label:"Less formal",note:"Make future answers more natural and mentor-like."},{id:"evidence",label:"More proof",note:"Add clearer missing evidence and verification steps."}];li&&(li.lang="en-MY",li.interimResults=!0,li.continuous=!1,li.onstart=()=>{Yi=!0,Xn.classList.add("listening"),ge("Listening","Speak naturally.")},li.onresult=n=>{let e=Array.from(n.results).map(t=>t[0].transcript).join(" ");wn.value=e,n.results[n.results.length-1].isFinal&&Ia(e)},li.onerror=()=>{ge("Voice interrupted","Tap the orb to try again.")},li.onend=()=>{Yi=!1,Xn.classList.remove("listening"),window.speechSynthesis?.speaking||ge("System ready","Ready when you are.")});_u.addEventListener("submit",n=>{n.preventDefault(),Ia(wn.value)});Xn.addEventListener("click",L1);ry.addEventListener("click",()=>Ai("Voice stopped."));ay.addEventListener("click",ix);Ap.addEventListener("click",()=>void Mb(Ap));ko.addEventListener("click",il);Xi?.addEventListener("click",()=>void ex());rf.addEventListener("click",()=>{af.hidden?Ma():Bn()});Wu.addEventListener("click",()=>{wa.hidden?vb():dn()});qu.addEventListener("click",()=>{df.hidden?nx():Ra()});YM.addEventListener("click",Ra);hy.addEventListener("click",ix);Au.addEventListener("click",n=>{let e=n.target.closest("[data-session-action]");e&&R1(e)});HM.addEventListener("click",dn);Uo.addEventListener("change",()=>void yb());Fo.addEventListener("change",()=>void yb());Xu.addEventListener("click",()=>{hf.hidden?qf():hn()});QM.addEventListener("click",hn);mr.addEventListener("click",n=>{let e=n.target.closest("[data-report-action]");e&&rC(e)});Yu.addEventListener("click",()=>{pf.hidden?cd():pn()});nT.addEventListener("click",pn);ba.addEventListener("click",n=>{let e=n.target.closest("[data-journal-action]");e?.getAttribute("data-journal-action")==="open"&&xb(e.getAttribute("data-journal-id"))});rT.addEventListener("click",()=>void jf());lT.addEventListener("click",()=>void cC());wi.addEventListener("click",dC);cT.addEventListener("click",()=>void pC());hT.addEventListener("click",()=>void hC());Mf.addEventListener("click",()=>{Tf.hidden?md():fn()});TT.addEventListener("click",fn);_f.addEventListener("click",()=>{Ku.hidden?Vb():nn()});pT.addEventListener("click",nn);Ku.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]");if(!e||wf.contains(e)||Sf.contains(e))return;e.getAttribute("data-owner-intel-action")==="refresh"&&Cs()});Af.addEventListener("click",()=>{Cf.hidden?pd():mn()});AT.addEventListener("click",mn);Rf.addEventListener("click",()=>{If.hidden?fd():gn()});CT.addEventListener("click",gn);Pf.addEventListener("click",()=>{Lf.hidden?Gf():un()});RT.addEventListener("click",un);Fp.addEventListener("click",SA);NT.addEventListener("submit",n=>{n.preventDefault();let e=Go.value.trim();if(!e)return Go.focus();Yn(e),Ii()});DT.addEventListener("click",()=>{Yn(""),$b({},{}),Mt("Owner token cleared from this device.")});fT.addEventListener("submit",n=>{n.preventDefault();let e=ci.value.trim();if(!e)return ci.focus();Yn(e),Cs()});mT.addEventListener("click",()=>{Yn(""),Ss=null,It.value="",It.hidden=!0,Ei.hidden=!0,xa.hidden=!0,xa.innerHTML="",Qp(),Db([]),Bu(),Qo=null,Ju.hidden=!0,Be("Owner token cleared from this device.")});Ey.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-filter]")?.getAttribute("data-owner-intel-filter");e&&(Jo=e,Lb(Zo?.rows||[]))});Np.addEventListener("click",()=>void WC().catch(n=>Be(n.message||"Production ops could not be checked.","danger")));bu.addEventListener("click",()=>void $C());Dp.addEventListener("click",()=>void HC().catch(n=>Be(n.message||"Owner backup could not be exported.","danger")));Op.addEventListener("click",()=>Cu.click());vT.addEventListener("click",()=>void KC().catch(n=>Be(n.message||"Restore log could not be loaded.","danger")));kp.addEventListener("click",()=>void GC().catch(n=>Be(n.message||"Backup reminder could not be sent.","danger")));yT.addEventListener("click",()=>void Nb().catch(n=>Be(n.message||"Belief review queue could not be loaded.","danger")));Up.addEventListener("click",n=>{let e=n.target.closest("[data-belief-review]");e&&QC(e).catch(t=>Be(t.message||"Belief review could not be saved.","danger"))});Cu.addEventListener("change",()=>void jC(Cu.files?.[0]).catch(n=>Be(n.message||"Owner backup could not be validated.","danger")));Ei.addEventListener("click",()=>void XC().catch(n=>Be(n.message||"Owner backup could not be restored.","danger")));xa.addEventListener("click",n=>{let e=n.target.closest("[data-owner-rollback-snapshot]")?.getAttribute("data-owner-rollback-snapshot");e&&eR(e).catch(t=>Be(t.message||"Rollback could not be completed.","danger"))});ST.addEventListener("click",()=>void Ob().catch(n=>Be(n.message||"User control could not be loaded.","danger")));Ef.addEventListener("click",n=>{let e=n.target.closest("[data-owner-admin-action='save']");e&&iR(e).catch(t=>Be(t.message||"User could not be updated.","danger"))});wf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]")?.getAttribute("data-owner-intel-action");e==="refresh"&&Cs(),e==="market"&&md(),e==="cases"&&pd(),e==="evidence"&&fd(),e==="research"&&(qv.open=!0,qv.scrollIntoView({behavior:"smooth",block:"start"}))});ET.addEventListener("click",()=>void Zf().catch(n=>jn(n.message||"Research studies could not be loaded.","danger")));MT.addEventListener("click",()=>Ru.click());Ju.addEventListener("click",()=>{Qo&&Rb(Qo,!0).catch(n=>jn(n.message||"Research study could not be replaced.","danger"))});Ru.addEventListener("change",()=>void RC(Ru.files?.[0]).catch(n=>jn(n.message||"Research study could not be imported.","danger")));Ty.addEventListener("click",n=>{let e=n.target.closest("[data-owner-research-action='delete']");e&&IC(e.getAttribute("data-owner-research-id")).catch(t=>jn(t.message||"Research study could not be deleted.","danger"))});Sf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]"),t=e?.getAttribute("data-owner-intel-action");t==="refresh"&&Cs(),["case","signal","proof"].includes(t)&&AR(t,e.getAttribute("data-owner-intel-project"))});kT.addEventListener("submit",n=>{n.preventDefault();let e=Wo.value.trim();if(!e)return Wo.focus();Yn(e),xr()});UT.addEventListener("click",()=>{Yn(""),Vu({}),Kt("Owner token cleared from this device.")});VT.addEventListener("submit",n=>{n.preventDefault();let e=Ko.value.trim();if(!e)return Ko.focus();Yn(e),ul()});HT.addEventListener("click",()=>{Yn(""),Uf.value="",ef({}),Fn("Owner token cleared from this device.")});Nf.addEventListener("submit",n=>{n.preventDefault(),Iu.disabled=!0,mR().catch(e=>Kt(e.message||"Development case could not be saved.","danger")).finally(()=>{Iu.disabled=!1})});kf.addEventListener("click",()=>{nm(),Kt("Edit cancelled.")});Ea.addEventListener("change",()=>{let n=Fb();n&&(gr.value||(gr.value=n.name||""),qo.value||(qo.value=n.area||""),jo.value||(jo.value=n.state||""),Xo.value||(Xo.value=n.propertyType||""),Yo.value||(Yo.value=n.developer||""))});BT.addEventListener("click",()=>void xr().catch(n=>Kt(n.message||"Development case library could not be loaded.","danger")));Bp.addEventListener("input",()=>void xr().catch(()=>{}));$p.addEventListener("change",()=>void xr().catch(n=>Kt(n.message||"Development case library could not be loaded.","danger")));Vy.addEventListener("change",()=>Vu(ab));Hy.addEventListener("click",n=>{let e=n.target.closest("[data-owner-case-action]"),t=e?.getAttribute("data-owner-case-action");t==="edit"&&fR(e),t==="delete"&&gR(e)});Vp.addEventListener("submit",n=>{n.preventDefault();let e=Vp.querySelector("button[type='submit']");e.disabled=!0,oR().catch(t=>Fn(t.message||"Evidence could not be added.","danger")).finally(()=>{e.disabled=!1})});WT.addEventListener("click",()=>void ul().catch(n=>Fn(n.message||"Evidence vault could not be loaded.","danger")));Uf.addEventListener("input",kb);qy.addEventListener("click",n=>{let e=n.target.closest("[data-owner-evidence-action='delete']");e&&lR(e)});Hp.addEventListener("submit",n=>{n.preventDefault();let e=Hp.querySelector("button[type='submit']");e.disabled=!0,CR().catch(t=>Mt(t.message||"Project could not be added.","danger")).finally(()=>{e.disabled=!1})});zp.addEventListener("submit",n=>{n.preventDefault();let e=zp.querySelector("button[type='submit']");e.disabled=!0,RR().catch(t=>Mt(t.message||"Observation could not be added.","danger")).finally(()=>{e.disabled=!1})});Kv.addEventListener("submit",n=>{n.preventDefault();let e=Kv.querySelector("button[type='submit']");e.disabled=!0,IR().catch(t=>Mt(t.message||"Market batch could not be imported.","danger")).finally(()=>{e.disabled=!1})});vr.addEventListener("change",()=>{let n=Zi.find(e=>e.id===vr.value);n&&!ga.value&&(ga.value=n.area||"")});rA.addEventListener("click",()=>void Ii().catch(n=>Mt(n.message||"Market evidence could not be loaded.","danger")));Gp.addEventListener("input",()=>void Ii().catch(()=>{}));Wp.addEventListener("change",()=>void Ii().catch(n=>Mt(n.message||"Market evidence could not be loaded.","danger")));qp.addEventListener("change",()=>void Ii().catch(n=>Mt(n.message||"Market evidence could not be loaded.","danger")));Ff.addEventListener("click",n=>{let e=n.target.closest("[data-owner-market-action='delete-observation']");e&&PR(e)});ju.addEventListener("click",n=>{let e=n.target.closest("[data-checkout-plan]");e&&iC(e.getAttribute("data-checkout-plan"))});Qu.addEventListener("click",()=>{Bf.hidden?Kf():Mn()});lA.addEventListener("click",Mn);Zy.addEventListener("click",()=>{dd([]),cl(),ge("System ready","Shortlist cleared.")});Hv.addEventListener("submit",async n=>{n.preventDefault();let e=xp.value.trim();if(!e)return xp.focus();let t=Hv.querySelector("button");t.disabled=!0;try{await We("/api/memory",{method:"POST",body:JSON.stringify({content:e})}),xp.value="",await od(),ge("System ready","Memory added for review.")}catch(i){ge("Connection issue",i.message||"Memory could not be added.")}finally{t.disabled=!1}});for(let n of[Gt,Tu,document.querySelector("#savedReportView")])n.addEventListener("click",e=>{let t=e.target.closest("[data-memory-action]");t&&eC(t);let i=e.target.closest("[data-analysis-action]");i&&TC(i);let s=e.target.closest("[data-response-feedback]");s&&xA(s);let r=e.target.closest("[data-response-refine]");r&&_A(r);let a=e.target.closest("[data-coach-prompt]");a&&(wn.value=a.getAttribute("data-coach-prompt")||"",wn.focus(),ge("System ready","Prompt loaded. Edit or send when ready."))});Jy.addEventListener("click",n=>{let e=n.target.closest("[data-shortlist-action]");e&&vC(e)});oy?.addEventListener("click",n=>{let e=n.target.closest("[data-journey-action]");e&&AC(e)});document.addEventListener("click",n=>{if(n.target.closest("[data-report-back]")){document.querySelector("#savedReportView").hidden=!0,mr.hidden=!1;return}let e=n.target.closest("[data-context-field-mode]");if(e){let i=e.getAttribute("data-context-field-mode");h1(i,om(i)==="all"?"core":"all");return}let t=n.target.closest("[data-context-focus-panel]");if(t){let i=t.getAttribute("data-context-focus-panel"),s=t.getAttribute("data-context-focus-key"),r=Mi.find(a=>a.getAttribute("data-context-toggle")===i);r&&Ti(r,!0),Zb(i,s)?.focus()}});kM.addEventListener("click",Bn);cy.addEventListener("click",()=>tl(Ji==="login"?"register":"login"));uy.addEventListener("click",()=>zf(!0));lf.addEventListener("submit",n=>{n.preventDefault(),w1()});uf.addEventListener("submit",n=>{n.preventDefault(),M1()});Ip.addEventListener("click",E1);FM.addEventListener("click",()=>zf(!1));Eu.addEventListener("click",T1);Mu.addEventListener("click",A1);Pp.addEventListener("click",I1);window.addEventListener("afterprint",MC);wn.addEventListener("input",()=>id());wn.addEventListener("focus",()=>{let n=id();ge("System ready",n.prompt)});for(let n of dA)n.addEventListener("click",()=>{if(n.getAttribute("data-starter-action")==="deal"){Tb("deal");return}let e=n.getAttribute("data-starter-prompt");e&&Ia(e)});Oo.addEventListener("click",()=>{Dn=!Dn,window.localStorage.setItem(eb,String(Dn)),Oo.textContent=Dn?"VOICE ON":"VOICE OFF",Oo.setAttribute("aria-pressed",String(Dn)),document.body.classList.toggle("voiceMuted",!Dn),Dn?ge("System ready","Voice response on. Spoken replies stay compact."):Ai("Voice response off.")});for(let n of Es)n.addEventListener("input",()=>Hu(Es,"data-deal-field",$f));for(let n of yr)n.addEventListener("input",()=>Hu(yr,"data-profile-field",Vf));for(let n of[...ed,...td.flatMap(e=>Array.from(e.querySelectorAll("[data-dcf-comp-field]")))])n.addEventListener("input",iy),n.addEventListener("change",iy);Do?.addEventListener("click",()=>void o1());hr?.addEventListener("click",()=>void rm())});var Vt=(n,e,t,i,s)=>({id:n,title:e,prompt:t,fields:i.split(" "),source:s}),Tt=[{id:"district",title:"The District",subject:"Property selection",short:"Select",color:"#8fd8be",description:"Find the place worth believing in.",lesson:"A low price is an invitation to investigate. The property still has to earn its place.",position:[-7,0,2],document:"MY_INVESTMENT_FRAMEWORK.md",checkpoints:[Vt("identity","Place your candidate","Start with one real property. Which area, building and unit are you investigating?","projectName area propertyType propertyAge floorArea askingPrice tenure","Stage 1A-C: selection philosophy, area and price segment"),Vt("value","Prove the entry price","Use completed sales of comparable units. Asking prices alone cannot establish value.","conservativeFairValue comparableTransactions comparableSource comparableRecency comparableMatchQuality comparablePriceRange comparableAdjustmentNotes","Stage 1C/G: price discipline and transaction evidence"),Vt("appeal","See the future buyer","Why would someone choose to live here, and why would an investor buy it later?","unitPosition ownStayAppeal exitBuyerPool managementQuality","Stage 1D-F: buyer depth, own-stay appeal and quality"),Vt("visit","Walk the building","Record what you actually observed. Renderings cannot prove a completed building's condition.","siteVisit siteVisitEvidence lobbyGuardhouseSignal liftCarparkCorridorSignal commonAreaCondition residentBehaviourSignal defectLeakageSignal siteVisitNotes inspectionConcern","Stage 1E-F; Execution Calibration D: physical inspection"),Vt("management","Look behind the lobby","Test the management response and collection record. Attractive architecture needs sustained care.","managementResponseSignal arrearsJmbSignal siteManagementNotes","Stage 1F; Execution Calibration E-F: management and project culture")]},{id:"compass",title:"The Compass",subject:"Investor suitability",short:"Fit",color:"#bfd298",description:"Make the property fit your life.",lesson:"Being able to obtain a loan is different from being able to live comfortably with it.",position:[-3.3,.5,-3.5],document:"INVESTOR_MANDATE_PROFILE.md",checkpoints:[Vt("capacity","Measure your breathing room","Use your actual income, existing monthly debt and cash remaining for this purchase.","monthlyIncome currentDebt cashAvailable cashReserveMonths","Buying Power Discipline; Cash Reserve Gate"),Vt("mandate","Choose your destination","Name the job this property must do, the holding period, and any upcoming demands on your cash.","riskStyle investmentGoal holdingPeriod nearTermCommitment financialConcern","Strategy Fit; Refusal And Cooling-Off Rules")]},{id:"vault",title:"The Vault",subject:"Financing & structure",short:"Finance",color:"#dcc597",description:"Build on financing that can hold.",lesson:"The transaction should work at the genuine price, with every payment and obligation visible.",position:[2.5,1,-4.6],document:"DEAL_STRUCTURING_FINANCING.md",checkpoints:[Vt("loan","Test the loan","Use a lender-backed estimate and review margin, documentation and instalment stress together.","estimatedInstallment cashOutlay bankValuationSupport loanPrecheckStatus loanMarginPlan instalmentStress cashBufferAfterPurchase financingDocumentReadiness financingNotes","Loan Margin Discipline; Cash Cost Discipline; Stress Test Standard"),Vt("title","Clear the transaction","Confirm title, seller authority and the path for transferring funds with your lawyer.","legalCheck legalTitleType titleTransferStatus caveatRestrictionStatus sellerAuthorityStatus arrearsUtilitiesStatus stakeholderFlowStatus lawyerCoordinationStatus legalTransactionNotes","Stage 1K: title and transactionability; Financing-Led Deal Test"),Vt("sourcing","Challenge the sales story","Separate evidence about the asset from urgency, promises and negotiation pressure.","dealSource agentBehavior sellerMotivation professionalConcern","Execution Calibration A-C: sourcing, negotiation and professional filtering")]},{id:"residence",title:"The Residence",subject:"Holding power",short:"Hold",color:"#9dcad4",description:"Make the everyday numbers work.",lesson:"Rent is the start of the calculation. Vacancy, maintenance and repairs decide your holding power.",position:[7,.4,-.2],document:"HOLDING_POWER_ASSET_MANAGEMENT.md",checkpoints:[Vt("rent","Follow real tenant demand","Check achieved rents, enquiry quality and seasonality for comparable units.","expectedRent rentEvidence rentalSource rentalRecency tenantUrgency vacancySignal rentalSustainability rentalAdjustmentNotes","Stage 1I: rental resilience; Rental Reality Test"),Vt("costs","Count the quiet costs","Include recurring costs, a repair allowance and vacancy. Enter zero explicitly where it is justified.","maintenance annualAssessmentQuitRent annualInsuranceTax monthlyRepairReserve furnishingBudget vacancyStressMonths","True Holding Cost; Vacancy And Repair Stress"),Vt("tenant","Plan the lived experience","Furnish for the target tenant and screen using documented behaviour, identity and affordability.","targetTenant furnishingStrategy tenantScreening","Execution Calibration G-H: furnishing and tenant management")]},{id:"portfolio",title:"The Collection",subject:"Portfolio strategy",short:"Balance",color:"#b6ace1",description:"Choose what makes the whole stronger.",lesson:"One successful investment does not prove the next. Test how this asset changes your total exposure.",position:[5,.9,5.3],document:"PORTFOLIO_STRATEGY_SCALING.md",checkpoints:[Vt("exposure","Place it in the portfolio","For a first purchase enter zero properties and assess the concentration this new asset would create.","existingProperties portfolioRole existingPortfolioHealth concentrationRisk nextPurchaseReason","Portfolio concentration; Next-Purchase Gate")]},{id:"horizon",title:"The Observatory",subject:"Market & timing",short:"Observe",color:"#e5b6a4",description:"Look past today's sales pitch.",lesson:"A catalyst is a hypothesis. Study competing supply, absorption and your position if it arrives late.",position:[-.1,1.3,7.4],document:"MARKET_INTELLIGENCE_TIMING.md",checkpoints:[Vt("supply","Map the next wave","Inspect the nearest substitutes and future completion dates, including comparable new layouts and prices.","nearbySupply supplyRadius substituteCount substituteThreat futureSupplyTiming densityLiftStress","Stage 1J: supply and density; Supply Pipeline"),Vt("absorption","Read the ground signals","Use dated occupancy, achieved rent and unsold-stock evidence. A busy gallery is not a completed sale.","absorptionEvidence unsoldStockSignal supplyNotes","Local Area Cycle; Buyer Sentiment And Liquidity")]},{id:"summit",title:"The Summit",subject:"Decision & learning",short:"Decide",color:"#e4dfbd",description:"Earn your conclusion.",lesson:"Write what would prove you wrong before the outcome is known. Revisit the thesis as reality changes.",position:[-6,1.1,7],document:"DECISION_JOURNAL_LEARNING.md",checkpoints:[Vt("exit","Design the way out","Consider your future buyers, viewing access, unit presentation and the cost of preparing for sale.","exitStrategyPlan resalePreparation","Execution Calibration I: exit strategy and buyer psychology"),Vt("thesis","Commit the hypothesis","Explain why it should work, the strongest concern and the discovery that makes you walk away.","investmentThesis mainConcern killCriterion","Pre-Purchase Thesis; Counter-Thesis; Kill Criteria; Outcome Review")]}];var xd=new Set(["inspectionConcern","professionalConcern","financialConcern","nearTermCommitment"]);function _d(n,e,t){return String(n?.[t[e]?.scope]?.[e]??"").trim()}function Da(n,e,t){let i=e.fields.filter(o=>!xd.has(o)&&!_d(n,o,t)),s=n?.evidence?.[e.id];(!s?.note||String(s.note).trim().length<12)&&i.push("evidenceNote");let r=String(s?.date||""),a=Date.parse(r);return(!/^\d{4}-\d{2}-\d{2}$/.test(r)||!Number.isFinite(a)||new Date(a).toISOString().slice(0,10)!==r||r>new Date().toISOString().slice(0,10))&&i.push("evidenceDate"),i}var fs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ms={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ng=0,sh=1,ig=2;var rh=1,sg=2,xi=3,ii=0,Xt=1,_n=2,Wi=0,Bs=1,ah=2,oh=3,lh=4,rg=5,cs=100,ag=101,og=102,lg=103,cg=104,ug=200,dg=201,hg=202,pg=203,Wl=204,ql=205,fg=206,mg=207,gg=208,vg=209,yg=210,bg=211,xg=212,_g=213,Sg=214,dc=0,hc=1,pc=2,$s=3,fc=4,mc=5,gc=6,vc=7,yc=0,wg=1,Eg=2,qi=0,Mg=1,Tg=2,Ag=3,bc=4,Cg=5,Rg=6,Ig=7,Yd="attached",Pg="detached",ch=300,Zs=301,Qs=302,xc=303,_c=304,So=306,us=1e3,di=1001,Fr=1002,qt=1003,Sc=1004;var er=1005;var an=1006,Qr=1007;var ai=1008;var oi=1009,uh=1010,dh=1011,ea=1012,wc=1013,gs=1014,Wn=1015,ta=1016,Ec=1017,Mc=1018,na=1020,hh=35902,ph=35899,fh=1021,mh=1022,Nn=1023,Br=1026,ia=1027,Tc=1028,Ac=1029,gh=1030,Cc=1031;var Rc=1033,wo=33776,Eo=33777,Mo=33778,To=33779,Ic=35840,Pc=35841,Lc=35842,Nc=35843,Dc=36196,Oc=37492,kc=37496,Uc=37808,Fc=37809,Bc=37810,$c=37811,Vc=37812,Hc=37813,zc=37814,Gc=37815,Wc=37816,qc=37817,jc=37818,Xc=37819,Yc=37820,Kc=37821,Jc=36492,Zc=36494,Qc=36495,eu=36283,tu=36284,nu=36285,iu=36286,Lg=2200,Ng=2201,Dg=2202,Vs=2300,Hs=2301,Gl=2302,Us=2400,Fs=2401,Wa=2402,su=2500,Og=2501,vh=0,Ao=1,sa=2,kg=3200,Ug=3201;var ru=0,Fg=1,ji="",Et="srgb",jt="srgb-linear",qa="linear",rt="srgb";var ks=7680;var Kd=519,Bg=512,$g=513,Vg=514,yh=515,Hg=516,zg=517,Gg=518,Wg=519,jl=35044;var bh="300 es",ei=2e3,ja=2001;var si=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ym=1234567,za=Math.PI/180,zs=180/Math.PI;function ni(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function xh(n,e){return(n%e+e)%e}function Ix(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Px(n,e,t){return n!==e?(t-n)/(e-n):0}function Ga(n,e,t){return(1-t)*n+t*e}function Lx(n,e,t,i){return Ga(n,e,1-Math.exp(-t*i))}function Nx(n,e=1){return e-Math.abs(xh(n,e*2)-e)}function Dx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ox(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function kx(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ux(n,e){return n+Math.random()*(e-n)}function Fx(n){return n*(.5-Math.random())}function Bx(n){n!==void 0&&(ym=n);let e=ym+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $x(n){return n*za}function Vx(n){return n*zs}function Hx(n){return(n&n-1)===0&&n!==0}function zx(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Gx(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Wx(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),h=a((e-i)/2),f=r((i-e)/2),v=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*v,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*v,o*c);break;case"ZYZ":n.set(l*v,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function st(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Co={DEG2RAD:za,RAD2DEG:zs,generateUUID:ni,clamp:Xe,euclideanModulo:xh,mapLinear:Ix,inverseLerp:Px,lerp:Ga,damp:Lx,pingpong:Nx,smoothstep:Dx,smootherstep:Ox,randInt:kx,randFloat:Ux,randFloatSpread:Fx,seededRandom:Bx,degToRad:$x,radToDeg:Vx,isPowerOfTwo:Hx,ceilPowerOfTwo:zx,floorPowerOfTwo:Gx,setQuaternionFromProperEuler:Wx,normalize:st,denormalize:Qn},Ce=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},zt=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],f=r[a+1],v=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=v,e[t+3]=y;return}if(d!==y||l!==h||c!==f||u!==v){let g=1-o,m=l*h+c*f+u*v+d*y,M=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){let R=Math.sqrt(E),C=Math.atan2(R,m*M);g=Math.sin(g*C)/R,o=Math.sin(o*C)/R}let S=o*M;if(l=l*g+h*S,c=c*g+f*S,u=u*g+v*S,d=d*g+y*S,g===1-o){let R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],f=r[a+2],v=r[a+3];return e[t]=o*v+u*d+l*f-c*h,e[t+1]=l*v+u*h+c*d-o*f,e[t+2]=c*v+u*f+o*h-l*d,e[t+3]=u*v-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),f=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*v,this._y=c*f*d-h*u*v,this._z=c*u*v+h*f*d,this._w=c*u*d-h*f*v;break;case"YXZ":this._x=h*u*d+c*f*v,this._y=c*f*d-h*u*v,this._z=c*u*v-h*f*d,this._w=c*u*d+h*f*v;break;case"ZXY":this._x=h*u*d-c*f*v,this._y=c*f*d+h*u*v,this._z=c*u*v+h*f*d,this._w=c*u*d-h*f*v;break;case"ZYX":this._x=h*u*d-c*f*v,this._y=c*f*d+h*u*v,this._z=c*u*v-h*f*d,this._w=c*u*d+h*f*v;break;case"YZX":this._x=h*u*d+c*f*v,this._y=c*f*d+h*u*v,this._z=c*u*v-h*f*d,this._w=c*u*d-h*f*v;break;case"XZY":this._x=h*u*d-c*f*v,this._y=c*f*d-h*u*v,this._z=c*u*v+h*f*d,this._w=c*u*d+h*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Sd.copy(this).projectOnVector(e),this.sub(Sd)}reflect(e){return this.sub(Sd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sd=new L,bm=new zt,ze=class n{constructor(e,t,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],v=i[8],y=s[0],g=s[3],m=s[6],M=s[1],E=s[4],S=s[7],R=s[2],C=s[5],P=s[8];return r[0]=a*y+o*M+l*R,r[3]=a*g+o*E+l*C,r[6]=a*m+o*S+l*P,r[1]=c*y+u*M+d*R,r[4]=c*g+u*E+d*C,r[7]=c*m+u*S+d*P,r[2]=h*y+f*M+v*R,r[5]=h*g+f*E+v*C,r[8]=h*m+f*S+v*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,v=t*d+i*h+s*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/v;return e[0]=d*y,e[1]=(s*c-u*i)*y,e[2]=(o*i-s*a)*y,e[3]=h*y,e[4]=(u*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(wd.makeScale(e,t)),this}rotate(e){return this.premultiply(wd.makeRotation(-e)),this}translate(e,t){return this.premultiply(wd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wd=new ze;function _h(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function $r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qg(){let n=$r("canvas");return n.style.display="block",n}var xm={};function Vr(n){n in xm||(xm[n]=!0,console.warn(n))}function jg(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var _m=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sm=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qx(){let n={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===rt&&(s.r=$i(s.r),s.g=$i(s.g),s.b=$i(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(s.r=Ur(s.r),s.g=Ur(s.g),s.b=Ur(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ji?qa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Vr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Vr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[jt]:{primaries:e,whitePoint:i,transfer:qa,toXYZ:_m,fromXYZ:Sm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:_m,fromXYZ:Sm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),n}var Ze=qx();function $i(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ur(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var wr,Xl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{wr===void 0&&(wr=$r("canvas")),wr.width=e.width,wr.height=e.height;let s=wr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=wr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=$r("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=$i(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor($i(t[i]/255)*255):t[i]=$i(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},jx=0,Hr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jx++}),this.uuid=ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ed(s[a].image)):r.push(Ed(s[a]))}else r=Ed(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Ed(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Xx=0,Md=new L,Ot=class n extends si{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=di,s=di,r=an,a=ai,o=Nn,l=oi,c=n.DEFAULT_ANISOTROPY,u=ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xx++}),this.uuid=ni(),this.name="",this.source=new Hr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Md).x}get height(){return this.source.getSize(Md).y}get depth(){return this.source.getSize(Md).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ch)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case us:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case Fr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case us:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case Fr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=ch;Ot.DEFAULT_ANISOTROPY=1;var tt=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],v=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-y)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+y)<.1&&Math.abs(v+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,S=(f+1)/2,R=(m+1)/2,C=(u+h)/4,P=(d+y)/4,D=(v+g)/4;return E>S&&E>R?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=C/i,r=P/i):S>R?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=C/s,r=D/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=P/r,s=D/r),this.set(i,s,r,t),this}let M=Math.sqrt((g-v)*(g-v)+(d-y)*(d-y)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-v)/M,this.y=(d-y)/M,this.z=(h-u)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yl=class extends si{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);let s={width:e,height:t,depth:i.depth},r=new Ot(s);this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Hr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},pi=class extends Yl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Xa=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kl=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ln=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kn):Kn.fromBufferAttribute(r,a),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xl.copy(i.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oa),_l.subVectors(this.max,Oa),Er.subVectors(e.a,Oa),Mr.subVectors(e.b,Oa),Tr.subVectors(e.c,Oa),ns.subVectors(Mr,Er),is.subVectors(Tr,Mr),Ls.subVectors(Er,Tr);let t=[0,-ns.z,ns.y,0,-is.z,is.y,0,-Ls.z,Ls.y,ns.z,0,-ns.x,is.z,0,-is.x,Ls.z,0,-Ls.x,-ns.y,ns.x,0,-is.y,is.x,0,-Ls.y,Ls.x,0];return!Td(t,Er,Mr,Tr,_l)||(t=[1,0,0,0,1,0,0,0,1],!Td(t,Er,Mr,Tr,_l))?!1:(Sl.crossVectors(ns,is),t=[Sl.x,Sl.y,Sl.z],Td(t,Er,Mr,Tr,_l))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Di=[new L,new L,new L,new L,new L,new L,new L,new L],Kn=new L,xl=new Ln,Er=new L,Mr=new L,Tr=new L,ns=new L,is=new L,Ls=new L,Oa=new L,_l=new L,Sl=new L,Ns=new L;function Td(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Ns.fromArray(n,r);let o=s.x*Math.abs(Ns.x)+s.y*Math.abs(Ns.y)+s.z*Math.abs(Ns.z),l=e.dot(Ns),c=t.dot(Ns),u=i.dot(Ns);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Yx=new Ln,ka=new L,Ad=new L,yn=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Yx.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ka.subVectors(e,this.center);let t=ka.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ka,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ad.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ka.copy(e.center).add(Ad)),this.expandByPoint(ka.copy(e.center).sub(Ad))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Oi=new L,Cd=new L,wl=new L,ss=new L,Rd=new L,El=new L,Id=new L,fi=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Cd.copy(e).add(t).multiplyScalar(.5),wl.copy(t).sub(e).normalize(),ss.copy(this.origin).sub(Cd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(wl),o=ss.dot(this.direction),l=-ss.dot(wl),c=ss.lengthSq(),u=Math.abs(1-a*a),d,h,f,v;if(u>0)if(d=a*l-o,h=a*o-l,v=r*u,d>=0)if(h>=-v)if(h<=v){let y=1/u;d*=y,h*=y,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Cd).addScaledVector(wl,h),f}intersectSphere(e,t){Oi.subVectors(e.center,this.origin);let i=Oi.dot(this.direction),s=Oi.dot(Oi)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,i,s,r){Rd.subVectors(t,e),El.subVectors(i,e),Id.crossVectors(Rd,El);let a=this.direction.dot(Id),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ss.subVectors(this.origin,e);let l=o*this.direction.dot(El.crossVectors(ss,El));if(l<0)return null;let c=o*this.direction.dot(Rd.cross(ss));if(c<0||l+c>a)return null;let u=-o*ss.dot(Id);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},He=class n{constructor(e,t,i,s,r,a,o,l,c,u,d,h,f,v,y,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,h,f,v,y,g)}set(e,t,i,s,r,a,o,l,c,u,d,h,f,v,y,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=v,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/Ar.setFromMatrixColumn(e,0).length(),r=1/Ar.setFromMatrixColumn(e,1).length(),a=1/Ar.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,f=a*d,v=o*u,y=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+v*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=v+f*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,v=c*u,y=c*d;t[0]=h+y*o,t[4]=v*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-v,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,v=c*u,y=c*d;t[0]=h-y*o,t[4]=-a*d,t[8]=v+f*o,t[1]=f+v*o,t[5]=a*u,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,f=a*d,v=o*u,y=o*d;t[0]=l*u,t[4]=v*c-f,t[8]=h*c+y,t[1]=l*d,t[5]=y*c+h,t[9]=f*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,f=a*c,v=o*l,y=o*c;t[0]=l*u,t[4]=y-h*d,t[8]=v*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+v,t[10]=h-y*d}else if(e.order==="XZY"){let h=a*l,f=a*c,v=o*l,y=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+y,t[5]=a*u,t[9]=f*d-v,t[2]=v*d-f,t[6]=o*u,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kx,e,Jx)}lookAt(e,t,i){let s=this.elements;return In.subVectors(e,t),In.lengthSq()===0&&(In.z=1),In.normalize(),rs.crossVectors(i,In),rs.lengthSq()===0&&(Math.abs(i.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),rs.crossVectors(i,In)),rs.normalize(),Ml.crossVectors(In,rs),s[0]=rs.x,s[4]=Ml.x,s[8]=In.x,s[1]=rs.y,s[5]=Ml.y,s[9]=In.y,s[2]=rs.z,s[6]=Ml.z,s[10]=In.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],v=i[2],y=i[6],g=i[10],m=i[14],M=i[3],E=i[7],S=i[11],R=i[15],C=s[0],P=s[4],D=s[8],w=s[12],b=s[1],A=s[5],O=s[9],$=s[13],U=s[2],q=s[6],V=s[10],Q=s[14],j=s[3],oe=s[7],de=s[11],xe=s[15];return r[0]=a*C+o*b+l*U+c*j,r[4]=a*P+o*A+l*q+c*oe,r[8]=a*D+o*O+l*V+c*de,r[12]=a*w+o*$+l*Q+c*xe,r[1]=u*C+d*b+h*U+f*j,r[5]=u*P+d*A+h*q+f*oe,r[9]=u*D+d*O+h*V+f*de,r[13]=u*w+d*$+h*Q+f*xe,r[2]=v*C+y*b+g*U+m*j,r[6]=v*P+y*A+g*q+m*oe,r[10]=v*D+y*O+g*V+m*de,r[14]=v*w+y*$+g*Q+m*xe,r[3]=M*C+E*b+S*U+R*j,r[7]=M*P+E*A+S*q+R*oe,r[11]=M*D+E*O+S*V+R*de,r[15]=M*w+E*$+S*Q+R*xe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],v=e[3],y=e[7],g=e[11],m=e[15];return v*(+r*l*d-s*c*d-r*o*h+i*c*h+s*o*f-i*l*f)+y*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*u-r*l*u)+g*(+t*c*d-t*o*f-r*a*d+i*a*f+r*o*u-i*c*u)+m*(-s*o*u-t*l*d+t*o*h+s*a*d-i*a*h+i*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],v=e[12],y=e[13],g=e[14],m=e[15],M=d*g*c-y*h*c+y*l*f-o*g*f-d*l*m+o*h*m,E=v*h*c-u*g*c-v*l*f+a*g*f+u*l*m-a*h*m,S=u*y*c-v*d*c+v*o*f-a*y*f-u*o*m+a*d*m,R=v*d*l-u*y*l-v*o*h+a*y*h+u*o*g-a*d*g,C=t*M+i*E+s*S+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/C;return e[0]=M*P,e[1]=(y*h*r-d*g*r-y*s*f+i*g*f+d*s*m-i*h*m)*P,e[2]=(o*g*r-y*l*r+y*s*c-i*g*c-o*s*m+i*l*m)*P,e[3]=(d*l*r-o*h*r-d*s*c+i*h*c+o*s*f-i*l*f)*P,e[4]=E*P,e[5]=(u*g*r-v*h*r+v*s*f-t*g*f-u*s*m+t*h*m)*P,e[6]=(v*l*r-a*g*r-v*s*c+t*g*c+a*s*m-t*l*m)*P,e[7]=(a*h*r-u*l*r+u*s*c-t*h*c-a*s*f+t*l*f)*P,e[8]=S*P,e[9]=(v*d*r-u*y*r-v*i*f+t*y*f+u*i*m-t*d*m)*P,e[10]=(a*y*r-v*o*r+v*i*c-t*y*c-a*i*m+t*o*m)*P,e[11]=(u*o*r-a*d*r-u*i*c+t*d*c+a*i*f-t*o*f)*P,e[12]=R*P,e[13]=(u*y*s-v*d*s+v*i*h-t*y*h-u*i*g+t*d*g)*P,e[14]=(v*o*s-a*y*s-v*i*l+t*y*l+a*i*g-t*o*g)*P,e[15]=(a*d*s-u*o*s+u*i*l-t*d*l-a*i*h+t*o*h)*P,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,v=r*d,y=a*u,g=a*d,m=o*d,M=l*c,E=l*u,S=l*d,R=i.x,C=i.y,P=i.z;return s[0]=(1-(y+m))*R,s[1]=(f+S)*R,s[2]=(v-E)*R,s[3]=0,s[4]=(f-S)*C,s[5]=(1-(h+m))*C,s[6]=(g+M)*C,s[7]=0,s[8]=(v+E)*P,s[9]=(g-M)*P,s[10]=(1-(h+y))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=Ar.set(s[0],s[1],s[2]).length(),a=Ar.set(s[4],s[5],s[6]).length(),o=Ar.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Jn.copy(this);let c=1/r,u=1/a,d=1/o;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=u,Jn.elements[5]*=u,Jn.elements[6]*=u,Jn.elements[8]*=d,Jn.elements[9]*=d,Jn.elements[10]*=d,t.setFromRotationMatrix(Jn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=ei,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s),v,y;if(l)v=r/(a-r),y=a*r/(a-r);else if(o===ei)v=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===ja)v=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=ei,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),f=-(i+s)/(i-s),v,y;if(l)v=1/(a-r),y=a/(a-r);else if(o===ei)v=-2/(a-r),y=-(a+r)/(a-r);else if(o===ja)v=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Ar=new L,Jn=new He,Kx=new L(0,0,0),Jx=new L(1,1,1),rs=new L,Ml=new L,In=new L,wm=new He,Em=new zt,Gn=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return wm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Em.setFromEuler(this),this.setFromQuaternion(Em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gn.DEFAULT_ORDER="XYZ";var zr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Zx=0,Mm=new L,Cr=new zt,ki=new He,Tl=new L,Ua=new L,Qx=new L,e0=new zt,Tm=new L(1,0,0),Am=new L(0,1,0),Cm=new L(0,0,1),Rm={type:"added"},t0={type:"removed"},Rr={type:"childadded",child:null},Pd={type:"childremoved",child:null},ft=class n extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zx++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new L,t=new Gn,i=new zt,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new He},normalMatrix:{value:new ze}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.multiply(Cr),this}rotateOnWorldAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.premultiply(Cr),this}rotateX(e){return this.rotateOnAxis(Tm,e)}rotateY(e){return this.rotateOnAxis(Am,e)}rotateZ(e){return this.rotateOnAxis(Cm,e)}translateOnAxis(e,t){return Mm.copy(e).applyQuaternion(this.quaternion),this.position.add(Mm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tm,e)}translateY(e){return this.translateOnAxis(Am,e)}translateZ(e){return this.translateOnAxis(Cm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ki.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Tl.copy(e):Tl.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ua.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ki.lookAt(Ua,Tl,this.up):ki.lookAt(Tl,Ua,this.up),this.quaternion.setFromRotationMatrix(ki),s&&(ki.extractRotation(s.matrixWorld),Cr.setFromRotationMatrix(ki),this.quaternion.premultiply(Cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rm),Rr.child=e,this.dispatchEvent(Rr),Rr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(t0),Pd.child=e,this.dispatchEvent(Pd),Pd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(ki),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rm),Rr.child=e,this.dispatchEvent(Rr),Rr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ua,e,Qx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ua,e0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};ft.DEFAULT_UP=new L(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zn=new L,Ui=new L,Ld=new L,Fi=new L,Ir=new L,Pr=new L,Im=new L,Nd=new L,Dd=new L,Od=new L,kd=new tt,Ud=new tt,Fd=new tt,ls=class n{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Zn.subVectors(e,t),s.cross(Zn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Zn.subVectors(s,t),Ui.subVectors(i,t),Ld.subVectors(e,t);let a=Zn.dot(Zn),o=Zn.dot(Ui),l=Zn.dot(Ld),c=Ui.dot(Ui),u=Ui.dot(Ld),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,v=(a*u-o*l)*h;return r.set(1-f-v,v,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fi.x),l.addScaledVector(a,Fi.y),l.addScaledVector(o,Fi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return kd.setScalar(0),Ud.setScalar(0),Fd.setScalar(0),kd.fromBufferAttribute(e,t),Ud.fromBufferAttribute(e,i),Fd.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(kd,r.x),a.addScaledVector(Ud,r.y),a.addScaledVector(Fd,r.z),a}static isFrontFacing(e,t,i,s){return Zn.subVectors(i,t),Ui.subVectors(e,t),Zn.cross(Ui).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),Ui.subVectors(this.a,this.b),Zn.cross(Ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Ir.subVectors(s,i),Pr.subVectors(r,i),Nd.subVectors(e,i);let l=Ir.dot(Nd),c=Pr.dot(Nd);if(l<=0&&c<=0)return t.copy(i);Dd.subVectors(e,s);let u=Ir.dot(Dd),d=Pr.dot(Dd);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Ir,a);Od.subVectors(e,r);let f=Ir.dot(Od),v=Pr.dot(Od);if(v>=0&&f<=v)return t.copy(r);let y=f*c-l*v;if(y<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Pr,o);let g=u*v-f*d;if(g<=0&&d-u>=0&&f-v>=0)return Im.subVectors(r,s),o=(d-u)/(d-u+(f-v)),t.copy(s).addScaledVector(Im,o);let m=1/(g+y+h);return a=y*m,o=h*m,t.copy(i).addScaledVector(Ir,a).addScaledVector(Pr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},Al={h:0,s:0,l:0};function Bd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Pe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ze.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ze.workingColorSpace){if(e=xh(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Bd(a,r,e+1/3),this.g=Bd(a,r,e),this.b=Bd(a,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,t=Et){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let i=Xg[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}copyLinearToSRGB(e){return this.r=Ur(e.r),this.g=Ur(e.g),this.b=Ur(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return Ze.workingToColorSpace(Qt.copy(this),e),Math.round(Xe(Qt.r*255,0,255))*65536+Math.round(Xe(Qt.g*255,0,255))*256+Math.round(Xe(Qt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Qt.copy(this),t);let i=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Et){Ze.workingToColorSpace(Qt.copy(this),e);let t=Qt.r,i=Qt.g,s=Qt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(as),this.setHSL(as.h+e,as.s+t,as.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(as),e.getHSL(Al);let i=Ga(as.h,Al.h,t),s=Ga(as.s,Al.s,t),r=Ga(as.l,Al.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qt=new Pe;Pe.NAMES=Xg;var n0=0,on=class extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Bs,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wl,this.blendDst=ql,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(i.blending=this.blending),this.side!==ii&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wl&&(i.blendSrc=this.blendSrc),this.blendDst!==ql&&(i.blendDst=this.blendDst),this.blendEquation!==cs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ln=class extends on{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var At=new L,Cl=new Ce,i0=0,Rt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:i0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jl,this.updateRanges=[],this.gpuType=Wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Cl.fromBufferAttribute(this,t),Cl.applyMatrix3(e),this.setXY(t,Cl.x,Cl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Qn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jl&&(e.usage=this.usage),e}};var Ya=class extends Rt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Ka=class extends Rt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Dt=class extends Rt{constructor(e,t,i){super(new Float32Array(e),t,i)}},s0=0,Hn=new He,$d=new ft,Lr=new L,Pn=new Ln,Fa=new Ln,Ht=new L,cn=class n extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_h(e)?Ka:Ya)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,t,i){return Hn.makeTranslation(e,t,i),this.applyMatrix4(Hn),this}scale(e,t,i){return Hn.makeScale(e,t,i),this.applyMatrix4(Hn),this}lookAt(e){return $d.lookAt(e),$d.updateMatrix(),this.applyMatrix4($d.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lr).negate(),this.translate(Lr.x,Lr.y,Lr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Dt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let i=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Fa.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(Pn.min,Fa.min),Pn.expandByPoint(Ht),Ht.addVectors(Pn.max,Fa.max),Pn.expandByPoint(Ht)):(Pn.expandByPoint(Fa.min),Pn.expandByPoint(Fa.max))}Pn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ht.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ht));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ht.fromBufferAttribute(o,c),l&&(Lr.fromBufferAttribute(e,c),Ht.add(Lr)),s=Math.max(s,i.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new L,l[D]=new L;let c=new L,u=new L,d=new L,h=new Ce,f=new Ce,v=new Ce,y=new L,g=new L;function m(D,w,b){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,b),h.fromBufferAttribute(r,D),f.fromBufferAttribute(r,w),v.fromBufferAttribute(r,b),u.sub(c),d.sub(c),f.sub(h),v.sub(h);let A=1/(f.x*v.y-v.x*f.y);isFinite(A)&&(y.copy(u).multiplyScalar(v.y).addScaledVector(d,-f.y).multiplyScalar(A),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-v.x).multiplyScalar(A),o[D].add(y),o[w].add(y),o[b].add(y),l[D].add(g),l[w].add(g),l[b].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let D=0,w=M.length;D<w;++D){let b=M[D],A=b.start,O=b.count;for(let $=A,U=A+O;$<U;$+=3)m(e.getX($+0),e.getX($+1),e.getX($+2))}let E=new L,S=new L,R=new L,C=new L;function P(D){R.fromBufferAttribute(s,D),C.copy(R);let w=o[D];E.copy(w),E.sub(R.multiplyScalar(R.dot(w))).normalize(),S.crossVectors(C,w);let A=S.dot(l[D])<0?-1:1;a.setXYZW(D,E.x,E.y,E.z,A)}for(let D=0,w=M.length;D<w;++D){let b=M[D],A=b.start,O=b.count;for(let $=A,U=A+O;$<U;$+=3)P(e.getX($+0)),P(e.getX($+1)),P(e.getX($+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){let v=e.getX(h+0),y=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,v=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*u;for(let m=0;m<u;m++)h[v++]=c[f++]}return new Rt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pm=new He,Ds=new fi,Rl=new yn,Lm=new L,Il=new L,Pl=new L,Ll=new L,Vd=new L,Nl=new L,Nm=new L,Dl=new L,at=class extends ft{constructor(e=new cn,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Nl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(Vd.fromBufferAttribute(d,e),a?Nl.addScaledVector(Vd,u):Nl.addScaledVector(Vd.sub(t),u))}t.add(Nl)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Rl.copy(i.boundingSphere),Rl.applyMatrix4(r),Ds.copy(e.ray).recast(e.near),!(Rl.containsPoint(Ds.origin)===!1&&(Ds.intersectSphere(Rl,Lm)===null||Ds.origin.distanceToSquared(Lm)>(e.far-e.near)**2))&&(Pm.copy(r).invert(),Ds.copy(e.ray).applyMatrix4(Pm),!(i.boundingBox!==null&&Ds.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ds)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,y=h.length;v<y;v++){let g=h[v],m=a[g.materialIndex],M=Math.max(g.start,f.start),E=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let S=M,R=E;S<R;S+=3){let C=o.getX(S),P=o.getX(S+1),D=o.getX(S+2);s=Ol(this,m,e,i,c,u,d,C,P,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=v,m=y;g<m;g+=3){let M=o.getX(g),E=o.getX(g+1),S=o.getX(g+2);s=Ol(this,a,e,i,c,u,d,M,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,y=h.length;v<y;v++){let g=h[v],m=a[g.materialIndex],M=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let S=M,R=E;S<R;S+=3){let C=S,P=S+1,D=S+2;s=Ol(this,m,e,i,c,u,d,C,P,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=v,m=y;g<m;g+=3){let M=g,E=g+1,S=g+2;s=Ol(this,a,e,i,c,u,d,M,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function r0(n,e,t,i,s,r,a,o){let l;if(e.side===Xt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===ii,o),l===null)return null;Dl.copy(o),Dl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Dl);return c<t.near||c>t.far?null:{distance:c,point:Dl.clone(),object:n}}function Ol(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Il),n.getVertexPosition(l,Pl),n.getVertexPosition(c,Ll);let u=r0(n,e,t,i,Il,Pl,Ll,Nm);if(u){let d=new L;ls.getBarycoord(Nm,Il,Pl,Ll,d),s&&(u.uv=ls.getInterpolatedAttribute(s,o,l,c,d,new Ce)),r&&(u.uv1=ls.getInterpolatedAttribute(r,o,l,c,d,new Ce)),a&&(u.normal=ls.getInterpolatedAttribute(a,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new L,materialIndex:0};ls.getNormal(Il,Pl,Ll,h.normal),u.face=h,u.barycoord=d}return u}var ds=class n extends cn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(u,3)),this.setAttribute("uv",new Dt(d,2));function v(y,g,m,M,E,S,R,C,P,D,w){let b=S/P,A=R/D,O=S/2,$=R/2,U=C/2,q=P+1,V=D+1,Q=0,j=0,oe=new L;for(let de=0;de<V;de++){let xe=de*A-$;for(let $e=0;$e<q;$e++){let it=$e*b-O;oe[y]=it*M,oe[g]=xe*E,oe[m]=U,c.push(oe.x,oe.y,oe.z),oe[y]=0,oe[g]=0,oe[m]=C>0?1:-1,u.push(oe.x,oe.y,oe.z),d.push($e/P),d.push(1-de/D),Q+=1}}for(let de=0;de<D;de++)for(let xe=0;xe<P;xe++){let $e=h+xe+q*de,it=h+xe+q*(de+1),ut=h+(xe+1)+q*(de+1),Qe=h+(xe+1)+q*de;l.push($e,it,Qe),l.push(it,ut,Qe),j+=6}o.addGroup(f,j,w),f+=j,h+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function tr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function en(n){let e={};for(let t=0;t<n.length;t++){let i=tr(n[t]);for(let s in i)e[s]=i[s]}return e}function a0(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Sh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var Yg={clone:tr,merge:en},o0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,l0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ri=class extends on{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=o0,this.fragmentShader=l0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tr(e.uniforms),this.uniformsGroups=a0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Ja=class extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=ei,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},os=new L,Dm=new Ce,Om=new Ce,Ct=class extends Ja{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(za*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(za*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,t){return this.getViewBounds(e,Dm,Om),t.subVectors(Om,Dm)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(za*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Nr=-90,Dr=1,Jl=class extends ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ct(Nr,Dr,e,t);s.layers=this.layers,this.add(s);let r=new Ct(Nr,Dr,e,t);r.layers=this.layers,this.add(r);let a=new Ct(Nr,Dr,e,t);a.layers=this.layers,this.add(a);let o=new Ct(Nr,Dr,e,t);o.layers=this.layers,this.add(o);let l=new Ct(Nr,Dr,e,t);l.layers=this.layers,this.add(l);let c=new Ct(Nr,Dr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ja)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},Za=class extends Ot{constructor(e=[],t=Zs,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Zl=class extends pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Za(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ds(5,5,5),r=new ri({name:"CubemapFromEquirect",uniforms:tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:Wi});r.uniforms.tEquirect.value=t;let a=new at(s,r),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=an),new Jl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},ti=class extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},c0={type:"move"},Gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ti,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ti,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ti,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,i),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,v=.005;c.inputState.pinching&&h>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(c0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ti;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var Gs=class extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Wr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jl,this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},rn=new L,qr=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Qn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Qn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Qn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Qn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Qn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var km=new L,Um=new tt,Fm=new tt,u0=new L,Bm=new He,kl=new L,Hd=new yn,$m=new He,zd=new fi,Qa=class extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yd,this.bindMatrix=new He,this.bindMatrixInverse=new He,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ln),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,kl),this.boundingBox.expandByPoint(kl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,kl),this.boundingSphere.expandByPoint(kl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hd.copy(this.boundingSphere),Hd.applyMatrix4(s),e.ray.intersectsSphere(Hd)!==!1&&($m.copy(s).invert(),zd.copy(e.ray).applyMatrix4($m),!(this.boundingBox!==null&&zd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,zd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new tt,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Yd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Pg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,s=this.geometry;Um.fromBufferAttribute(s.attributes.skinIndex,e),Fm.fromBufferAttribute(s.attributes.skinWeight,e),km.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Fm.getComponent(r);if(a!==0){let o=Um.getComponent(r);Bm.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(u0.copy(km).applyMatrix4(Bm),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},jr=class extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}},eo=class extends Ot{constructor(e=null,t=1,i=1,s,r,a,o,l,c=qt,u=qt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vm=new He,d0=new He,to=class n{constructor(e=[],t=[]){this.uuid=ni(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new He)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new He;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:d0;Vm.multiplyMatrices(o,t[r]),Vm.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new eo(t,e,e,Nn,Wn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){let r=e.bones[i],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new jr),this.bones.push(a),this.boneInverses.push(new He().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=i[s];e.boneInverses.push(o.toArray())}return e}},hs=class extends Rt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Or=new He,Hm=new He,Ul=[],zm=new Ln,h0=new He,Ba=new at,$a=new yn,Ws=class extends at{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,h0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Or),zm.copy(e.boundingBox).applyMatrix4(Or),this.boundingBox.union(zm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Or),$a.copy(e.boundingSphere).applyMatrix4(Or),this.boundingSphere.union($a)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(Ba.geometry=this.geometry,Ba.material=this.material,Ba.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$a.copy(this.boundingSphere),$a.applyMatrix4(i),e.ray.intersectsSphere($a)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Or),Hm.multiplyMatrices(i,Or),Ba.matrixWorld=Hm,Ba.raycast(e,Ul);for(let a=0,o=Ul.length;a<o;a++){let l=Ul[a];l.instanceId=r,l.object=this,t.push(l)}Ul.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new hs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new eo(new Float32Array(s*this.count),s,this.count,Tc,Wn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Gd=new L,p0=new L,f0=new ze,zn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Gd.subVectors(i,t).cross(p0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Gd),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||f0.getNormalMatrix(e),s=this.coplanarPoint(Gd).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Os=new yn,m0=new Ce(.5,.5),Fl=new L,Xr=class{constructor(e=new zn,t=new zn,i=new zn,s=new zn,r=new zn,a=new zn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ei,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],v=r[8],y=r[9],g=r[10],m=r[11],M=r[12],E=r[13],S=r[14],R=r[15];if(s[0].setComponents(c-a,f-u,m-v,R-M).normalize(),s[1].setComponents(c+a,f+u,m+v,R+M).normalize(),s[2].setComponents(c+o,f+d,m+y,R+E).normalize(),s[3].setComponents(c-o,f-d,m-y,R-E).normalize(),i)s[4].setComponents(l,h,g,S).normalize(),s[5].setComponents(c-l,f-h,m-g,R-S).normalize();else if(s[4].setComponents(c-l,f-h,m-g,R-S).normalize(),t===ei)s[5].setComponents(c+l,f+h,m+g,R+S).normalize();else if(t===ja)s[5].setComponents(l,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(e){Os.center.set(0,0,0);let t=m0.distanceTo(e.center);return Os.radius=.7071067811865476+t,Os.applyMatrix4(e.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Fl.x=s.normal.x>0?e.max.x:e.min.x,Fl.y=s.normal.y>0?e.max.y:e.min.y,Fl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Fl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Yr=class extends on{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ql=new L,ec=new L,Gm=new He,Va=new fi,Bl=new yn,Wd=new L,Wm=new L,qs=class extends ft{constructor(e=new cn,t=new Yr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ql.fromBufferAttribute(t,s-1),ec.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ql.distanceTo(ec);e.setAttribute("lineDistance",new Dt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bl.copy(i.boundingSphere),Bl.applyMatrix4(s),Bl.radius+=r,e.ray.intersectsSphere(Bl)===!1)return;Gm.copy(s).invert(),Va.copy(e.ray).applyMatrix4(Gm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let f=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let y=f,g=v-1;y<g;y+=c){let m=u.getX(y),M=u.getX(y+1),E=$l(this,e,Va,l,m,M,y);E&&t.push(E)}if(this.isLineLoop){let y=u.getX(v-1),g=u.getX(f),m=$l(this,e,Va,l,y,g,v-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let y=f,g=v-1;y<g;y+=c){let m=$l(this,e,Va,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){let y=$l(this,e,Va,l,v-1,f,v-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function $l(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(Ql.fromBufferAttribute(o,s),ec.fromBufferAttribute(o,r),t.distanceSqToSegment(Ql,ec,Wd,Wm)>i)return;Wd.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Wd);if(!(c<e.near||c>e.far))return{distance:c,point:Wm.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var qm=new L,jm=new L,no=class extends qs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)qm.fromBufferAttribute(t,s),jm.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+qm.distanceTo(jm);e.setAttribute("lineDistance",new Dt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},io=class extends qs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Kr=class extends on{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Xm=new He,Jd=new fi,Vl=new yn,Hl=new L,so=class extends ft{constructor(e=new cn,t=new Kr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vl.copy(i.boundingSphere),Vl.applyMatrix4(s),Vl.radius+=r,e.ray.intersectsSphere(Vl)===!1)return;Xm.copy(s).invert(),Jd.copy(e.ray).applyMatrix4(Xm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let v=h,y=f;v<y;v++){let g=c.getX(v);Hl.fromBufferAttribute(d,g),Ym(Hl,g,l,s,e,t,this)}}else{let h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let v=h,y=f;v<y;v++)Hl.fromBufferAttribute(d,v),Ym(Hl,v,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ym(n,e,t,i,s,r,a){let o=Jd.distanceSqToPoint(n);if(o<t){let l=new L;Jd.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ro=class extends Ot{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ao=class extends Ot{constructor(e,t,i=gs,s,r,a,o=qt,l=qt,c,u=Br,d=1){if(u!==Br&&u!==ia)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},oo=class extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var lo=class n extends cn{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],v=0,y=[],g=i/2,m=0;M(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Dt(d,3)),this.setAttribute("normal",new Dt(h,3)),this.setAttribute("uv",new Dt(f,2));function M(){let S=new L,R=new L,C=0,P=(t-e)/i;for(let D=0;D<=r;D++){let w=[],b=D/r,A=b*(t-e)+e;for(let O=0;O<=s;O++){let $=O/s,U=$*l+o,q=Math.sin(U),V=Math.cos(U);R.x=A*q,R.y=-b*i+g,R.z=A*V,d.push(R.x,R.y,R.z),S.set(q,P,V).normalize(),h.push(S.x,S.y,S.z),f.push($,1-b),w.push(v++)}y.push(w)}for(let D=0;D<s;D++)for(let w=0;w<r;w++){let b=y[w][D],A=y[w+1][D],O=y[w+1][D+1],$=y[w][D+1];(e>0||w!==0)&&(u.push(b,A,$),C+=3),(t>0||w!==r-1)&&(u.push(A,O,$),C+=3)}c.addGroup(m,C,0),m+=C}function E(S){let R=v,C=new Ce,P=new L,D=0,w=S===!0?e:t,b=S===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,g*b,0),h.push(0,b,0),f.push(.5,.5),v++;let A=v;for(let O=0;O<=s;O++){let U=O/s*l+o,q=Math.cos(U),V=Math.sin(U);P.x=w*V,P.y=g*b,P.z=w*q,d.push(P.x,P.y,P.z),h.push(0,b,0),C.x=q*.5+.5,C.y=V*.5*b+.5,f.push(C.x,C.y),v++}for(let O=0;O<s;O++){let $=R+O,U=A+O;S===!0?u.push(U,U+1,$):u.push(U+1,U,$),D+=3}c.addGroup(m,D,S===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var js=class n extends cn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],v=[],y=[],g=[];for(let m=0;m<u;m++){let M=m*h-a;for(let E=0;E<c;E++){let S=E*d-r;v.push(S,-M,0),y.push(0,0,1),g.push(E/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let E=M+c*m,S=M+c*(m+1),R=M+1+c*(m+1),C=M+1+c*m;f.push(E,S,C),f.push(S,R,C)}this.setIndex(f),this.setAttribute("position",new Dt(v,3)),this.setAttribute("normal",new Dt(y,3)),this.setAttribute("uv",new Dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},co=class n extends cn{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],u=[],d=e,h=(t-e)/s,f=new L,v=new Ce;for(let y=0;y<=s;y++){for(let g=0;g<=i;g++){let m=r+g/i*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),v.x=(f.x/t+1)/2,v.y=(f.y/t+1)/2,u.push(v.x,v.y)}d+=h}for(let y=0;y<s;y++){let g=y*(i+1);for(let m=0;m<i;m++){let M=m+g,E=M,S=M+i+1,R=M+i+2,C=M+1;o.push(E,S,C),o.push(S,R,C)}}this.setIndex(o),this.setAttribute("position",new Dt(l,3)),this.setAttribute("normal",new Dt(c,3)),this.setAttribute("uv",new Dt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var mi=class extends on{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ru,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},bn=class extends mi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var uo=class extends on{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ru,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},tc=class extends on{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},nc=class extends on{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function zl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function g0(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function v0(n){function e(s,r){return n[s]-n[r]}let t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function Km(n,e,t){let i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function Kg(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}var Vi=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break t}a=i,i=0;break n}break e}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ic=class extends Vi{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Us,endingEnd:Us}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Fs:r=e,o=2*t-i;break;case Wa:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Fs:a=e,l=2*i-t;break;case Wa:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,v=(i-t)/(s-t),y=v*v,g=y*v,m=-h*g+2*h*y-h*v,M=(1+h)*g+(-1.5-2*h)*y+(-.5+h)*v+1,E=(-1-f)*g+(1.5+f)*y+.5*v,S=f*g-f*y;for(let R=0;R!==o;++R)r[R]=m*a[u+R]+M*a[c+R]+E*a[l+R]+S*a[d+R];return r}},ho=class extends Vi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},sc=class extends Vi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},xn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zl(t,this.TimeBufferType),this.values=zl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:zl(e.times,Array),values:zl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new sc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ic(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Vs:t=this.InterpolantFactoryMethodDiscrete;break;case Hs:t=this.InterpolantFactoryMethodLinear;break;case Gl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vs;case this.InterpolantFactoryMethodLinear:return Hs;case this.InterpolantFactoryMethodSmooth:return Gl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&g0(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Gl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*i,h=d-i,f=d+i;for(let v=0;v!==i;++v){let y=t[d+v];if(y!==t[h+v]||y!==t[f+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let f=0;f!==i;++f)t[h+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=Hs;var Hi=class extends xn{constructor(e,t,i){super(e,t,i)}};Hi.prototype.ValueTypeName="bool";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=Vs;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var po=class extends xn{constructor(e,t,i,s){super(e,t,i,s)}};po.prototype.ValueTypeName="color";var gi=class extends xn{constructor(e,t,i,s){super(e,t,i,s)}};gi.prototype.ValueTypeName="number";var rc=class extends Vi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)zt.slerpFlat(r,0,a,c-o,a,c,l);return r}},vi=class extends xn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new rc(this.times,this.values,this.getValueSize(),e)}};vi.prototype.ValueTypeName="quaternion";vi.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends xn{constructor(e,t,i){super(e,t,i)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=Vs;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var yi=class extends xn{constructor(e,t,i,s){super(e,t,i,s)}};yi.prototype.ValueTypeName="vector";var Xs=class{constructor(e="",t=-1,i=[],s=su){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=ni(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(b0(i[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(xn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=v0(l);l=Km(l,1,u),c=Km(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new gi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(d,h,f,v,y){if(f.length!==0){let g=[],m=[];Kg(f,g,m,v),g.length!==0&&y.push(new d(h,g,m))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let d=0;d<c.length;d++){let h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let f={},v;for(v=0;v<h.length;v++)if(h[v].morphTargets)for(let y=0;y<h[v].morphTargets.length;y++)f[h[v].morphTargets[y]]=-1;for(let y in f){let g=[],m=[];for(let M=0;M!==h[v].morphTargets.length;++M){let E=h[v];g.push(E.time),m.push(E.morphTarget===y?1:0)}s.push(new gi(".morphTargetInfluence["+y+"]",g,m))}l=f.length*a}else{let f=".bones["+t[d].name+"]";i(yi,f+".position",h,"pos",s),i(vi,f+".quaternion",h,"rot",s),i(yi,f+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let i=0,s=e.length;i!==s;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function y0(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return gi;case"vector":case"vector2":case"vector3":case"vector4":return yi;case"color":return po;case"quaternion":return vi;case"bool":case"boolean":return Hi;case"string":return zi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function b0(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=y0(n.type);if(n.times===void 0){let t=[],i=[];Kg(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var hi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},ac=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],v=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Jg=new ac,bi=class{constructor(e){this.manager=e!==void 0?e:Jg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Bi={},Zd=class extends Error{constructor(e,t){super(e),this.response=t}},Jr=class extends bi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=hi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Bi[e]!==void 0){Bi[e].push({onLoad:t,onProgress:i,onError:s});return}Bi[e]=[],Bi[e].push({onLoad:t,onProgress:i,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Bi[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,v=f!==0,y=0,g=new ReadableStream({start(m){M();function M(){d.read().then(({done:E,value:S})=>{if(E)m.close();else{y+=S.byteLength;let R=new ProgressEvent("progress",{lengthComputable:v,loaded:y,total:f});for(let C=0,P=u.length;C<P;C++){let D=u[C];D.onProgress&&D.onProgress(R)}m.enqueue(S),M()}},E=>{m.error(E)})}}});return new Response(g)}else throw new Zd(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(v=>f.decode(v))}}}).then(c=>{hi.add(`file:${e}`,c);let u=Bi[e];delete Bi[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Bi[e];if(u===void 0)throw this.manager.itemError(e),c;delete Bi[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var kr=new WeakMap,oc=class extends bi{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=hi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=kr.get(a);d===void 0&&(d=[],kr.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=$r("img");function l(){u(),t&&t(this);let d=kr.get(this)||[];for(let h=0;h<d.length;h++){let f=d[h];f.onLoad&&f.onLoad(this)}kr.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),hi.remove(`image:${e}`);let h=kr.get(this)||[];for(let f=0;f<h.length;f++){let v=h[f];v.onError&&v.onError(d)}kr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),hi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var fo=class extends bi{constructor(e){super(e)}load(e,t,i,s){let r=new Ot,a=new oc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},Ys=class extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},mo=class extends Ys{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},qd=new He,Jm=new L,Zm=new L,go=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.mapType=oi,this.map=null,this.mapPass=null,this.matrix=new He,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xr,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Jm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jm),Zm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zm),t.updateMatrixWorld(),qd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qd,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(qd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Qd=class extends go{constructor(){super(new Ct(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=zs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},vo=class extends Ys{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Qd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Qm=new He,Ha=new L,jd=new L,eh=class extends go{constructor(){super(new Ct(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Ha.setFromMatrixPosition(e.matrixWorld),i.position.copy(Ha),jd.copy(i.position),jd.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(jd),i.updateMatrixWorld(),s.makeTranslation(-Ha.x,-Ha.y,-Ha.z),Qm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qm,i.coordinateSystem,i.reversedDepth)}},Ks=class extends Ys{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new eh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Js=class extends Ja{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},th=class extends go{constructor(){super(new Js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ps=class extends Ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new th}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Gi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Xd=new WeakMap,yo=class extends bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=hi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Xd.has(a)===!0)s&&s(Xd.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return hi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Xd.set(l,c),hi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});hi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var lc=class extends Ct{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var cc=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)i[r+o]=i[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(i,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,s=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(i,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(i,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){o.setValue(i,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,s=i*this._origIndex;e.getValue(t,s);for(let r=i,a=s;r!==a;++r)t[r]=t[s+r%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[i+a]}_slerp(e,t,i,s){zt.slerpFlat(e,t,e,t,e,i,s)}_slerpAdditive(e,t,i,s,r){let a=this._workIndex*r;zt.multiplyQuaternionsFlat(e,a,e,t,e,i),zt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,i,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[i+o]*s}}_lerpAdditive(e,t,i,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[i+a]*s}}},wh="\\[\\]\\.:\\/",x0=new RegExp("["+wh+"]","g"),Eh="[^"+wh+"]",_0="[^"+wh.replace("\\.","")+"]",S0=/((?:WC+[\/:])*)/.source.replace("WC",Eh),w0=/(WCOD+)?/.source.replace("WCOD",_0),E0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Eh),M0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Eh),T0=new RegExp("^"+S0+w0+E0+M0+"$"),A0=["material","materials","bones","map"],nh=class{constructor(e,t,i){let s=i||lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},lt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(x0,"")}static parseTrackName(e){let t=T0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);A0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};lt.Composite=nh;lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};lt.prototype.GetterByBindingType=[lt.prototype._getValue_direct,lt.prototype._getValue_array,lt.prototype._getValue_arrayElement,lt.prototype._getValue_toArray];lt.prototype.SetterByBindingTypeAndVersioning=[[lt.prototype._setValue_direct,lt.prototype._setValue_direct_setNeedsUpdate,lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_array,lt.prototype._setValue_array_setNeedsUpdate,lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_arrayElement,lt.prototype._setValue_arrayElement_setNeedsUpdate,lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_fromArray,lt.prototype._setValue_fromArray_setNeedsUpdate,lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uc=class{constructor(e,t,i=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Us,endingEnd:Us};for(let c=0;c!==a;++c){let u=r[c].createInterpolant(null);o[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ng,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+i,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Og:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case su:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,s=this.time+e,r=this._loopCount,a=i===Dg;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(i===Lg){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,i){let s=this._interpolantSettings;i?(s.endingStart=Fs,s.endingEnd=Fs):(e?s.endingStart=this.zeroSlopeAtStart?Fs:Us:s.endingStart=Wa,t?s.endingEnd=this.zeroSlopeAtEnd?Fs:Us:s.endingEnd=Wa)}_scheduleFading(e,t,i){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=i,this}},C0=new Float32Array(1),bo=class extends si{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let i=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==r;++d){let h=s[d],f=h.name,v=u[f];if(v!==void 0)++v.referenceCount,a[d]=v;else{if(v=a[d],v!==void 0){v._cacheIndex===null&&(++v.referenceCount,this._addInactiveBinding(v,l,f));continue}let y=t&&t._propertyBindings[d].binding.parsedPath;v=new cc(lt.create(i,f,y),h.ValueTypeName,h.getValueSize()),++v.referenceCount,this._addInactiveBinding(v,l,f),a[d]=v}o[d].resultBuffer=v.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,i)}let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],s=e._cacheIndex;i._cacheIndex=s,t[s]=i,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_addInactiveBinding(e,t,i){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[i]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,s=i.rootNode.uuid,r=i.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new ho(new Float32Array(2),new Float32Array(2),1,C0),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=i,t[i]=r}clipAction(e,t,i){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Xs.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(i===void 0&&(a!==null?i=a.blendMode:i=su),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===i)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let u=new uc(this,a,t,i);return this._bindAction(u,c),this._addInactiveAction(u,o,r),u}existingAction(e,t){let i=t||this._root,s=i.uuid,r=typeof e=="string"?Xs.findByName(i,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,s=this._actionsByClip,r=s[i];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let a in i){let o=i[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};var eg=new He,xo=class{constructor(e,t,i=0,s=1/0){this.ray=new fi(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new zr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return eg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(eg),this}intersectObject(e,t=!0,i=[]){return ih(e,this,i,t),i.sort(tg),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)ih(e[s],this,i,t);return i.sort(tg),i}};function tg(n,e){return n.distance-e.distance}function ih(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)ih(r[a],e,t,!0)}}var Zr=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var _o=class extends si{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Mh(n,e,t,i){let s=R0(i);switch(t){case fh:return n*e;case Tc:return n*e/s.components*s.byteLength;case Ac:return n*e/s.components*s.byteLength;case gh:return n*e*2/s.components*s.byteLength;case Cc:return n*e*2/s.components*s.byteLength;case mh:return n*e*3/s.components*s.byteLength;case Nn:return n*e*4/s.components*s.byteLength;case Rc:return n*e*4/s.components*s.byteLength;case wo:case Eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Mo:case To:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Pc:case Nc:return Math.max(n,16)*Math.max(e,8)/4;case Ic:case Lc:return Math.max(n,8)*Math.max(e,8)/2;case Dc:case Oc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case kc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Bc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case $c:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Vc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Hc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case zc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Gc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case jc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Xc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Yc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Kc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Jc:case Zc:case Qc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case eu:case tu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case nu:case iu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function R0(n){switch(n){case oi:case uh:return{byteLength:1,components:1};case ea:case dh:case ta:return{byteLength:2,components:1};case Ec:case Mc:return{byteLength:2,components:4};case gs:case wc:case Wn:return{byteLength:4,components:1};case hh:case ph:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function _v(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function P0(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,v)=>f.start-v.start);let h=0;for(let f=1;f<d.length;f++){let v=d[h],y=d[f];y.start<=v.start+v.count+1?v.count=Math.max(v.count,y.start+y.count-v.start):(++h,d[h]=y)}d.length=h+1;for(let f=0,v=d.length;f<v;f++){let y=d[f];n.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var L0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N0=`#ifdef USE_ALPHAHASH
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
#endif`,D0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,O0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,k0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,U0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F0=`#ifdef USE_AOMAP
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
#endif`,B0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$0=`#ifdef USE_BATCHING
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
#endif`,V0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,H0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,z0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,G0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,W0=`#ifdef USE_IRIDESCENCE
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
#endif`,q0=`#ifdef USE_BUMPMAP
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
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,J0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Z0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,e_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,t_=`#define PI 3.141592653589793
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
} // validated`,n_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,i_=`vec3 transformedNormal = objectNormal;
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
#endif`,s_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,r_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,l_="gl_FragColor = linearToOutputTexel( gl_FragColor );",c_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,u_=`#ifdef USE_ENVMAP
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
#endif`,d_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,h_=`#ifdef USE_ENVMAP
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
#endif`,p_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,f_=`#ifdef USE_ENVMAP
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
#endif`,m_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,g_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,v_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,b_=`#ifdef USE_GRADIENTMAP
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
}`,x_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,__=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,w_=`uniform bool receiveShadow;
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
#endif`,E_=`#ifdef USE_ENVMAP
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
#endif`,M_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,T_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,A_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,R_=`PhysicalMaterial material;
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
#endif`,I_=`struct PhysicalMaterial {
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
}`,P_=`
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
#endif`,L_=`#if defined( RE_IndirectDiffuse )
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
#endif`,N_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,D_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,O_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,F_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,B_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,V_=`#if defined( USE_POINTS_UV )
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
#endif`,H_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,W_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j_=`#ifdef USE_MORPHTARGETS
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
#endif`,X_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,K_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,J_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,eS=`#ifdef USE_NORMALMAP
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
#endif`,tS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,iS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,aS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,oS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gS=`float getShadowMask() {
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
}`,vS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yS=`#ifdef USE_SKINNING
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
#endif`,bS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xS=`#ifdef USE_SKINNING
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
#endif`,_S=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,SS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ES=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,MS=`#ifdef USE_TRANSMISSION
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
#endif`,TS=`#ifdef USE_TRANSMISSION
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
#endif`,AS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,PS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,LS=`uniform sampler2D t2D;
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
}`,NS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,OS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,US=`#include <common>
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
}`,FS=`#if DEPTH_PACKING == 3200
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
}`,BS=`#define DISTANCE
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
}`,$S=`#define DISTANCE
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
}`,VS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,HS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zS=`uniform float scale;
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
}`,GS=`uniform vec3 diffuse;
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
}`,WS=`#include <common>
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
}`,qS=`uniform vec3 diffuse;
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
}`,jS=`#define LAMBERT
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
}`,XS=`#define LAMBERT
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
}`,YS=`#define MATCAP
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
}`,KS=`#define MATCAP
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
}`,JS=`#define NORMAL
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
}`,ZS=`#define NORMAL
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
}`,QS=`#define PHONG
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
}`,ew=`#define PHONG
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
}`,tw=`#define STANDARD
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
}`,nw=`#define STANDARD
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
}`,iw=`#define TOON
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
}`,sw=`#define TOON
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
}`,rw=`uniform float size;
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
}`,aw=`uniform vec3 diffuse;
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
}`,ow=`#include <common>
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
}`,lw=`uniform vec3 color;
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
}`,cw=`uniform float rotation;
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
}`,uw=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:L0,alphahash_pars_fragment:N0,alphamap_fragment:D0,alphamap_pars_fragment:O0,alphatest_fragment:k0,alphatest_pars_fragment:U0,aomap_fragment:F0,aomap_pars_fragment:B0,batching_pars_vertex:$0,batching_vertex:V0,begin_vertex:H0,beginnormal_vertex:z0,bsdfs:G0,iridescence_fragment:W0,bumpmap_pars_fragment:q0,clipping_planes_fragment:j0,clipping_planes_pars_fragment:X0,clipping_planes_pars_vertex:Y0,clipping_planes_vertex:K0,color_fragment:J0,color_pars_fragment:Z0,color_pars_vertex:Q0,color_vertex:e_,common:t_,cube_uv_reflection_fragment:n_,defaultnormal_vertex:i_,displacementmap_pars_vertex:s_,displacementmap_vertex:r_,emissivemap_fragment:a_,emissivemap_pars_fragment:o_,colorspace_fragment:l_,colorspace_pars_fragment:c_,envmap_fragment:u_,envmap_common_pars_fragment:d_,envmap_pars_fragment:h_,envmap_pars_vertex:p_,envmap_physical_pars_fragment:E_,envmap_vertex:f_,fog_vertex:m_,fog_pars_vertex:g_,fog_fragment:v_,fog_pars_fragment:y_,gradientmap_pars_fragment:b_,lightmap_pars_fragment:x_,lights_lambert_fragment:__,lights_lambert_pars_fragment:S_,lights_pars_begin:w_,lights_toon_fragment:M_,lights_toon_pars_fragment:T_,lights_phong_fragment:A_,lights_phong_pars_fragment:C_,lights_physical_fragment:R_,lights_physical_pars_fragment:I_,lights_fragment_begin:P_,lights_fragment_maps:L_,lights_fragment_end:N_,logdepthbuf_fragment:D_,logdepthbuf_pars_fragment:O_,logdepthbuf_pars_vertex:k_,logdepthbuf_vertex:U_,map_fragment:F_,map_pars_fragment:B_,map_particle_fragment:$_,map_particle_pars_fragment:V_,metalnessmap_fragment:H_,metalnessmap_pars_fragment:z_,morphinstance_vertex:G_,morphcolor_vertex:W_,morphnormal_vertex:q_,morphtarget_pars_vertex:j_,morphtarget_vertex:X_,normal_fragment_begin:Y_,normal_fragment_maps:K_,normal_pars_fragment:J_,normal_pars_vertex:Z_,normal_vertex:Q_,normalmap_pars_fragment:eS,clearcoat_normal_fragment_begin:tS,clearcoat_normal_fragment_maps:nS,clearcoat_pars_fragment:iS,iridescence_pars_fragment:sS,opaque_fragment:rS,packing:aS,premultiplied_alpha_fragment:oS,project_vertex:lS,dithering_fragment:cS,dithering_pars_fragment:uS,roughnessmap_fragment:dS,roughnessmap_pars_fragment:hS,shadowmap_pars_fragment:pS,shadowmap_pars_vertex:fS,shadowmap_vertex:mS,shadowmask_pars_fragment:gS,skinbase_vertex:vS,skinning_pars_vertex:yS,skinning_vertex:bS,skinnormal_vertex:xS,specularmap_fragment:_S,specularmap_pars_fragment:SS,tonemapping_fragment:wS,tonemapping_pars_fragment:ES,transmission_fragment:MS,transmission_pars_fragment:TS,uv_pars_fragment:AS,uv_pars_vertex:CS,uv_vertex:RS,worldpos_vertex:IS,background_vert:PS,background_frag:LS,backgroundCube_vert:NS,backgroundCube_frag:DS,cube_vert:OS,cube_frag:kS,depth_vert:US,depth_frag:FS,distanceRGBA_vert:BS,distanceRGBA_frag:$S,equirect_vert:VS,equirect_frag:HS,linedashed_vert:zS,linedashed_frag:GS,meshbasic_vert:WS,meshbasic_frag:qS,meshlambert_vert:jS,meshlambert_frag:XS,meshmatcap_vert:YS,meshmatcap_frag:KS,meshnormal_vert:JS,meshnormal_frag:ZS,meshphong_vert:QS,meshphong_frag:ew,meshphysical_vert:tw,meshphysical_frag:nw,meshtoon_vert:iw,meshtoon_frag:sw,points_vert:rw,points_frag:aw,shadow_vert:ow,shadow_frag:lw,sprite_vert:cw,sprite_frag:uw},le={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},_i={basic:{uniforms:en([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:en([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Pe(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:en([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:en([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:en([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Pe(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:en([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:en([le.points,le.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:en([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:en([le.common,le.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:en([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:en([le.sprite,le.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:en([le.common,le.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:en([le.lights,le.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};_i.physical={uniforms:en([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var au={r:0,b:0,g:0},nr=new Gn,dw=new He;function hw(n,e,t,i,s,r,a){let o=new Pe(0),l=r===!0?0:1,c,u,d=null,h=0,f=null;function v(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function y(E){let S=!1,R=v(E);R===null?m(o,l):R&&R.isColor&&(m(R,1),S=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(E,S){let R=v(S);R&&(R.isCubeTexture||R.mapping===So)?(u===void 0&&(u=new at(new ds(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:tr(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,P,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),nr.copy(S.backgroundRotation),nr.x*=-1,nr.y*=-1,nr.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(nr.y*=-1,nr.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(dw.makeRotationFromEuler(nr)),u.material.toneMapped=Ze.getTransfer(R.colorSpace)!==rt,(d!==R||h!==R.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=R,h=R.version,f=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new at(new js(2,2),new ri({name:"BackgroundMaterial",uniforms:tr(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(R.colorSpace)!==rt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||h!==R.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=R,h=R.version,f=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,S){E.getRGB(au,Sh(n)),i.buffers.color.setClear(au.r,au.g,au.b,S,a)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),l=S,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,m(o,l)},render:y,addToRenderList:g,dispose:M}}function pw(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(b,A,O,$,U){let q=!1,V=d($,O,A);r!==V&&(r=V,c(r.object)),q=f(b,$,O,U),q&&v(b,$,O,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,S(b,A,O,$),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function d(b,A,O){let $=O.wireframe===!0,U=i[b.id];U===void 0&&(U={},i[b.id]=U);let q=U[A.id];q===void 0&&(q={},U[A.id]=q);let V=q[$];return V===void 0&&(V=h(l()),q[$]=V),V}function h(b){let A=[],O=[],$=[];for(let U=0;U<t;U++)A[U]=0,O[U]=0,$[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:O,attributeDivisors:$,object:b,attributes:{},index:null}}function f(b,A,O,$){let U=r.attributes,q=A.attributes,V=0,Q=O.getAttributes();for(let j in Q)if(Q[j].location>=0){let de=U[j],xe=q[j];if(xe===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(xe=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(xe=b.instanceColor)),de===void 0||de.attribute!==xe||xe&&de.data!==xe.data)return!0;V++}return r.attributesNum!==V||r.index!==$}function v(b,A,O,$){let U={},q=A.attributes,V=0,Q=O.getAttributes();for(let j in Q)if(Q[j].location>=0){let de=q[j];de===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(de=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(de=b.instanceColor));let xe={};xe.attribute=de,de&&de.data&&(xe.data=de.data),U[j]=xe,V++}r.attributes=U,r.attributesNum=V,r.index=$}function y(){let b=r.newAttributes;for(let A=0,O=b.length;A<O;A++)b[A]=0}function g(b){m(b,0)}function m(b,A){let O=r.newAttributes,$=r.enabledAttributes,U=r.attributeDivisors;O[b]=1,$[b]===0&&(n.enableVertexAttribArray(b),$[b]=1),U[b]!==A&&(n.vertexAttribDivisor(b,A),U[b]=A)}function M(){let b=r.newAttributes,A=r.enabledAttributes;for(let O=0,$=A.length;O<$;O++)A[O]!==b[O]&&(n.disableVertexAttribArray(O),A[O]=0)}function E(b,A,O,$,U,q,V){V===!0?n.vertexAttribIPointer(b,A,O,U,q):n.vertexAttribPointer(b,A,O,$,U,q)}function S(b,A,O,$){y();let U=$.attributes,q=O.getAttributes(),V=A.defaultAttributeValues;for(let Q in q){let j=q[Q];if(j.location>=0){let oe=U[Q];if(oe===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(oe=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(oe=b.instanceColor)),oe!==void 0){let de=oe.normalized,xe=oe.itemSize,$e=e.get(oe);if($e===void 0)continue;let it=$e.buffer,ut=$e.type,Qe=$e.bytesPerElement,K=ut===n.INT||ut===n.UNSIGNED_INT||oe.gpuType===wc;if(oe.isInterleavedBufferAttribute){let B=oe.data,Z=B.stride,he=oe.offset;if(B.isInstancedInterleavedBuffer){for(let me=0;me<j.locationSize;me++)m(j.location+me,B.meshPerAttribute);b.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let me=0;me<j.locationSize;me++)g(j.location+me);n.bindBuffer(n.ARRAY_BUFFER,it);for(let me=0;me<j.locationSize;me++)E(j.location+me,xe/j.locationSize,ut,de,Z*Qe,(he+xe/j.locationSize*me)*Qe,K)}else{if(oe.isInstancedBufferAttribute){for(let B=0;B<j.locationSize;B++)m(j.location+B,oe.meshPerAttribute);b.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let B=0;B<j.locationSize;B++)g(j.location+B);n.bindBuffer(n.ARRAY_BUFFER,it);for(let B=0;B<j.locationSize;B++)E(j.location+B,xe/j.locationSize,ut,de,xe*Qe,xe/j.locationSize*B*Qe,K)}}else if(V!==void 0){let de=V[Q];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(j.location,de);break;case 3:n.vertexAttrib3fv(j.location,de);break;case 4:n.vertexAttrib4fv(j.location,de);break;default:n.vertexAttrib1fv(j.location,de)}}}}M()}function R(){D();for(let b in i){let A=i[b];for(let O in A){let $=A[O];for(let U in $)u($[U].object),delete $[U];delete A[O]}delete i[b]}}function C(b){if(i[b.id]===void 0)return;let A=i[b.id];for(let O in A){let $=A[O];for(let U in $)u($[U].object),delete $[U];delete A[O]}delete i[b.id]}function P(b){for(let A in i){let O=i[A];if(O[b.id]===void 0)continue;let $=O[b.id];for(let U in $)u($[U].object),delete $[U];delete O[b.id]}}function D(){w(),a=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:g,disableUnusedAttributes:M}}function fw(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let v=0;v<d;v++)f+=u[v];t.update(f,i,1)}function l(c,u,d,h){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)a(c[v],u[v],h[v]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let v=0;for(let y=0;y<d;y++)v+=u[y]*h[y];t.update(v,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function mw(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Nn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let D=P===ta&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==oi&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Wn&&!D)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=v>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:v,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:R,maxSamples:C}}function gw(n){let e=this,t=null,i=0,s=!1,r=!1,a=new zn,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let v=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!s||v===null||v.length===0||r&&!g)r?u(null):c();else{let M=r?0:i,E=M*4,S=m.clippingState||null;l.value=S,S=u(v,h,E,f);for(let R=0;R!==E;++R)S[R]=t[R];m.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,v){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=l.value,v!==!0||g===null){let m=f+y*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,S=f;E!==y;++E,S+=4)a.copy(d[E]).applyMatrix4(M,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function vw(n){let e=new WeakMap;function t(a,o){return o===xc?a.mapping=Zs:o===_c&&(a.mapping=Qs),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===xc||o===_c)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Zl(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var aa=4,Zg=[.125,.215,.35,.446,.526,.582],rr=20,Th=new Js,Qg=new Pe,Ah=null,Ch=0,Rh=0,Ih=!1,sr=(1+Math.sqrt(5))/2,ra=1/sr,ev=[new L(-sr,ra,0),new L(sr,ra,0),new L(-ra,0,sr),new L(ra,0,sr),new L(0,sr,-ra),new L(0,sr,ra),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],yw=new L,la=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=yw}=r;Ah=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),Rh=this._renderer.getActiveMipmapLevel(),Ih=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=iv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ah,Ch,Rh),this._renderer.xr.enabled=Ih,e.scissorTest=!1,ou(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zs||e.mapping===Qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ah=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),Rh=this._renderer.getActiveMipmapLevel(),Ih=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:an,minFilter:an,generateMipmaps:!1,type:ta,format:Nn,colorSpace:jt,depthBuffer:!1},s=tv(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tv(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bw(r)),this._blurMaterial=xw(r,e,t)}return s}_compileMaterial(e){let t=new at(this._lodPlanes[0],e);this._renderer.compile(t,Th)}_sceneToCubeUV(e,t,i,s,r){let l=new Ct(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Qg),d.toneMapping=qi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let y=new ln({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new at(new ds,y),m=!1,M=e.background;M?M.isColor&&(y.color.copy(M),e.background=null,m=!0):(y.color.copy(Qg),m=!0);for(let E=0;E<6;E++){let S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));let R=this._cubeSize;ou(s,S*R,E>2?R:0,R,R),d.setRenderTarget(s),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Zs||e.mapping===Qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=iv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nv());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new at(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;ou(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Th)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ev[(s-r-1)%ev.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new at(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*rr-1),y=r/v,g=isFinite(r)?1+Math.floor(u*y):rr;g>rr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${rr}`);let m=[],M=0;for(let P=0;P<rr;++P){let D=P/y,w=Math.exp(-D*D/2);m.push(w),P===0?M+=w:P<g&&(M+=2*w)}for(let P=0;P<m.length;P++)m[P]=m[P]/M;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:E}=this;h.dTheta.value=v,h.mipInt.value=E-i;let S=this._sizeLods[s],R=3*S*(s>E-aa?s-E+aa:0),C=4*(this._cubeSize-S);ou(t,R,C,3*S,2*S),l.setRenderTarget(t),l.render(d,Th)}};function bw(n){let e=[],t=[],i=[],s=n,r=n-aa+1+Zg.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>n-aa?l=Zg[a-n+aa-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,v=6,y=3,g=2,m=1,M=new Float32Array(y*v*f),E=new Float32Array(g*v*f),S=new Float32Array(m*v*f);for(let C=0;C<f;C++){let P=C%3*2/3-1,D=C>2?0:-1,w=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];M.set(w,y*v*C),E.set(h,g*v*C);let b=[C,C,C,C,C,C];S.set(b,m*v*C)}let R=new cn;R.setAttribute("position",new Rt(M,y)),R.setAttribute("uv",new Rt(E,g)),R.setAttribute("faceIndex",new Rt(S,m)),e.push(R),s>aa&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function tv(n,e,t){let i=new pi(n,e,t);return i.texture.mapping=So,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ou(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function xw(n,e,t){let i=new Float32Array(rr),s=new L(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:rr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$h(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function nv(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$h(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function iv(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function $h(){return`

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
	`}function _w(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===xc||l===_c,u=l===Zs||l===Qs;if(c||u){let d=e.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new la(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{let f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new la(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Sw(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Vr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function ww(n,e,t,i){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let v in h.attributes)e.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,v=d.attributes.position,y=0;if(f!==null){let M=f.array;y=f.version;for(let E=0,S=M.length;E<S;E+=3){let R=M[E+0],C=M[E+1],P=M[E+2];h.push(R,C,C,P,P,R)}}else if(v!==void 0){let M=v.array;y=v.version;for(let E=0,S=M.length/3-1;E<S;E+=3){let R=E+0,C=E+1,P=E+2;h.push(R,C,C,P,P,R)}}else return;let g=new(_h(h)?Ka:Ya)(h,1);g.version=y;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Ew(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*a),t.update(f,i,1)}function c(h,f,v){v!==0&&(n.drawElementsInstanced(i,f,r,h*a,v),t.update(f,i,v))}function u(h,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,v);let g=0;for(let m=0;m<v;m++)g+=f[m];t.update(g,i,1)}function d(h,f,v,y){if(v===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<h.length;m++)c(h[m]/a,f[m],y[m]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,y,0,v);let m=0;for(let M=0;M<v;M++)m+=f[M]*y[M];t.update(m,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Mw(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Tw(n,e,t){let i=new WeakMap,s=new tt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let w=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],E=0;f===!0&&(E=1),v===!0&&(E=2),y===!0&&(E=3);let S=o.attributes.position.count*E,R=1;S>e.maxTextureSize&&(R=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let C=new Float32Array(S*R*4*d),P=new Xa(C,S,R,d);P.type=Wn,P.needsUpdate=!0;let D=E*4;for(let b=0;b<d;b++){let A=g[b],O=m[b],$=M[b],U=S*R*4*b;for(let q=0;q<A.count;q++){let V=q*D;f===!0&&(s.fromBufferAttribute(A,q),C[U+V+0]=s.x,C[U+V+1]=s.y,C[U+V+2]=s.z,C[U+V+3]=0),v===!0&&(s.fromBufferAttribute(O,q),C[U+V+4]=s.x,C[U+V+5]=s.y,C[U+V+6]=s.z,C[U+V+7]=0),y===!0&&(s.fromBufferAttribute($,q),C[U+V+8]=s.x,C[U+V+9]=s.y,C[U+V+10]=s.z,C[U+V+11]=$.itemSize===4?s.w:1)}}h={count:d,texture:P,size:new Ce(S,R)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let v=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Aw(n,e,t,i){let s=new WeakMap;function r(l){let c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Sv=new Ot,sv=new ao(1,1),wv=new Xa,Ev=new Kl,Mv=new Za,rv=[],av=[],ov=new Float32Array(16),lv=new Float32Array(9),cv=new Float32Array(4);function ca(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=rv[s];if(r===void 0&&(r=new Float32Array(s),rv[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function kt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function uu(n,e){let t=av[e];t===void 0&&(t=new Int32Array(e),av[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Cw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Rw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function Iw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function Pw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function Lw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,i))return;cv.set(i),n.uniformMatrix2fv(this.addr,!1,cv),Ut(t,i)}}function Nw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,i))return;lv.set(i),n.uniformMatrix3fv(this.addr,!1,lv),Ut(t,i)}}function Dw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,i))return;ov.set(i),n.uniformMatrix4fv(this.addr,!1,ov),Ut(t,i)}}function Ow(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function kw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function Uw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function Fw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function Bw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function $w(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function Vw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function Hw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function zw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(sv.compareFunction=yh,r=sv):r=Sv,t.setTexture2D(e||r,s)}function Gw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ev,s)}function Ww(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Mv,s)}function qw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||wv,s)}function jw(n){switch(n){case 5126:return Cw;case 35664:return Rw;case 35665:return Iw;case 35666:return Pw;case 35674:return Lw;case 35675:return Nw;case 35676:return Dw;case 5124:case 35670:return Ow;case 35667:case 35671:return kw;case 35668:case 35672:return Uw;case 35669:case 35673:return Fw;case 5125:return Bw;case 36294:return $w;case 36295:return Vw;case 36296:return Hw;case 35678:case 36198:case 36298:case 36306:case 35682:return zw;case 35679:case 36299:case 36307:return Gw;case 35680:case 36300:case 36308:case 36293:return Ww;case 36289:case 36303:case 36311:case 36292:return qw}}function Xw(n,e){n.uniform1fv(this.addr,e)}function Yw(n,e){let t=ca(e,this.size,2);n.uniform2fv(this.addr,t)}function Kw(n,e){let t=ca(e,this.size,3);n.uniform3fv(this.addr,t)}function Jw(n,e){let t=ca(e,this.size,4);n.uniform4fv(this.addr,t)}function Zw(n,e){let t=ca(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Qw(n,e){let t=ca(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function eE(n,e){let t=ca(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function tE(n,e){n.uniform1iv(this.addr,e)}function nE(n,e){n.uniform2iv(this.addr,e)}function iE(n,e){n.uniform3iv(this.addr,e)}function sE(n,e){n.uniform4iv(this.addr,e)}function rE(n,e){n.uniform1uiv(this.addr,e)}function aE(n,e){n.uniform2uiv(this.addr,e)}function oE(n,e){n.uniform3uiv(this.addr,e)}function lE(n,e){n.uniform4uiv(this.addr,e)}function cE(n,e,t){let i=this.cache,s=e.length,r=uu(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Sv,r[a])}function uE(n,e,t){let i=this.cache,s=e.length,r=uu(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ev,r[a])}function dE(n,e,t){let i=this.cache,s=e.length,r=uu(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Mv,r[a])}function hE(n,e,t){let i=this.cache,s=e.length,r=uu(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||wv,r[a])}function pE(n){switch(n){case 5126:return Xw;case 35664:return Yw;case 35665:return Kw;case 35666:return Jw;case 35674:return Zw;case 35675:return Qw;case 35676:return eE;case 5124:case 35670:return tE;case 35667:case 35671:return nE;case 35668:case 35672:return iE;case 35669:case 35673:return sE;case 5125:return rE;case 36294:return aE;case 36295:return oE;case 36296:return lE;case 35678:case 36198:case 36298:case 36306:case 35682:return cE;case 35679:case 36299:case 36307:return uE;case 35680:case 36300:case 36308:case 36293:return dE;case 36289:case 36303:case 36311:case 36292:return hE}}var Lh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=jw(t.type)}},Nh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pE(t.type)}},Dh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},Ph=/(\w+)(\])?(\[|\.)?/g;function uv(n,e){n.seq.push(e),n.map[e.id]=e}function fE(n,e,t){let i=n.name,s=i.length;for(Ph.lastIndex=0;;){let r=Ph.exec(i),a=Ph.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){uv(t,c===void 0?new Lh(o,n,e):new Nh(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Dh(o),uv(t,d)),t=d}}}var oa=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);fE(r,a,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function dv(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var mE=37297,gE=0;function vE(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var hv=new ze;function yE(n){Ze._getMatrix(hv,Ze.workingColorSpace,n);let e=`mat3( ${hv.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(n)){case qa:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function pv(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+vE(n.getShaderSource(e),o)}else return r}function bE(n,e){let t=yE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function xE(n,e){let t;switch(e){case Mg:t="Linear";break;case Tg:t="Reinhard";break;case Ag:t="Cineon";break;case bc:t="ACESFilmic";break;case Rg:t="AgX";break;case Ig:t="Neutral";break;case Cg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var lu=new L;function _E(){Ze.getLuminanceCoefficients(lu);let n=lu.x.toFixed(4),e=lu.y.toFixed(4),t=lu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ro).join(`
`)}function wE(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function EE(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ro(n){return n!==""}function fv(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mv(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ME=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oh(n){return n.replace(ME,AE)}var TE=new Map;function AE(n,e){let t=je[e];if(t===void 0){let i=TE.get(e);if(i!==void 0)t=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Oh(t)}var CE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gv(n){return n.replace(CE,RE)}function RE(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vv(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function IE(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===rh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===sg?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===xi&&(e="SHADOWMAP_TYPE_VSM"),e}function PE(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Zs:case Qs:e="ENVMAP_TYPE_CUBE";break;case So:e="ENVMAP_TYPE_CUBE_UV";break}return e}function LE(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Qs:e="ENVMAP_MODE_REFRACTION";break}return e}function NE(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case yc:e="ENVMAP_BLENDING_MULTIPLY";break;case wg:e="ENVMAP_BLENDING_MIX";break;case Eg:e="ENVMAP_BLENDING_ADD";break}return e}function DE(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function OE(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=IE(t),c=PE(t),u=LE(t),d=NE(t),h=DE(t),f=SE(t),v=wE(r),y=s.createProgram(),g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ro).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ro).join(`
`),m.length>0&&(m+=`
`)):(g=[vv(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ro).join(`
`),m=[vv(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qi?"#define TONE_MAPPING":"",t.toneMapping!==qi?je.tonemapping_pars_fragment:"",t.toneMapping!==qi?xE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,bE("linearToOutputTexel",t.outputColorSpace),_E(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ro).join(`
`)),a=Oh(a),a=fv(a,t),a=mv(a,t),o=Oh(o),o=fv(o,t),o=mv(o,t),a=gv(a),o=gv(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let E=M+g+a,S=M+m+o,R=dv(s,s.VERTEX_SHADER,E),C=dv(s,s.FRAGMENT_SHADER,S);s.attachShader(y,R),s.attachShader(y,C),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function P(A){if(n.debug.checkShaderErrors){let O=s.getProgramInfoLog(y)||"",$=s.getShaderInfoLog(R)||"",U=s.getShaderInfoLog(C)||"",q=O.trim(),V=$.trim(),Q=U.trim(),j=!0,oe=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,R,C);else{let de=pv(s,R,"vertex"),xe=pv(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+q+`
`+de+`
`+xe)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(V===""||Q==="")&&(oe=!1);oe&&(A.diagnostics={runnable:j,programLog:q,vertexShader:{log:V,prefix:g},fragmentShader:{log:Q,prefix:m}})}s.deleteShader(R),s.deleteShader(C),D=new oa(s,y),w=EE(s,y)}let D;this.getUniforms=function(){return D===void 0&&P(this),D};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(y,mE)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gE++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=C,this}var kE=0,kh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Uh(e),t.set(e,i)),i}},Uh=class{constructor(e){this.id=kE++,this.code=e,this.usedTimes=0}};function UE(n,e,t,i,s,r,a){let o=new zr,l=new kh,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,f=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,b,A,O,$){let U=O.fog,q=$.geometry,V=w.isMeshStandardMaterial?O.environment:null,Q=(w.isMeshStandardMaterial?t:e).get(w.envMap||V),j=Q&&Q.mapping===So?Q.image.height:null,oe=v[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let de=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,xe=de!==void 0?de.length:0,$e=0;q.morphAttributes.position!==void 0&&($e=1),q.morphAttributes.normal!==void 0&&($e=2),q.morphAttributes.color!==void 0&&($e=3);let it,ut,Qe,K;if(oe){let nt=_i[oe];it=nt.vertexShader,ut=nt.fragmentShader}else it=w.vertexShader,ut=w.fragmentShader,l.update(w),Qe=l.getVertexShaderID(w),K=l.getFragmentShaderID(w);let B=n.getRenderTarget(),Z=n.state.buffers.depth.getReversed(),he=$.isInstancedMesh===!0,me=$.isBatchedMesh===!0,Ke=!!w.map,Jt=!!w.matcap,I=!!Q,vt=!!w.aoMap,Ve=!!w.lightMap,De=!!w.bumpMap,_e=!!w.normalMap,yt=!!w.displacementMap,Se=!!w.emissiveMap,qe=!!w.metalnessMap,$t=!!w.roughnessMap,wt=w.anisotropy>0,T=w.clearcoat>0,x=w.dispersion>0,H=w.iridescence>0,Y=w.sheen>0,ee=w.transmission>0,X=wt&&!!w.anisotropyMap,Ae=T&&!!w.clearcoatMap,re=T&&!!w.clearcoatNormalMap,we=T&&!!w.clearcoatRoughnessMap,Ee=H&&!!w.iridescenceMap,ie=H&&!!w.iridescenceThicknessMap,pe=Y&&!!w.sheenColorMap,Ne=Y&&!!w.sheenRoughnessMap,Me=!!w.specularMap,ce=!!w.specularColorMap,Ge=!!w.specularIntensityMap,N=ee&&!!w.transmissionMap,se=ee&&!!w.thicknessMap,ae=!!w.gradientMap,ve=!!w.alphaMap,te=w.alphaTest>0,J=!!w.alphaHash,be=!!w.extensions,Fe=qi;w.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Fe=n.toneMapping);let pt={shaderID:oe,shaderType:w.type,shaderName:w.name,vertexShader:it,fragmentShader:ut,defines:w.defines,customVertexShaderID:Qe,customFragmentShaderID:K,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:me,batchingColor:me&&$._colorsTexture!==null,instancing:he,instancingColor:he&&$.instanceColor!==null,instancingMorph:he&&$.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:B===null?n.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:jt,alphaToCoverage:!!w.alphaToCoverage,map:Ke,matcap:Jt,envMap:I,envMapMode:I&&Q.mapping,envMapCubeUVHeight:j,aoMap:vt,lightMap:Ve,bumpMap:De,normalMap:_e,displacementMap:h&&yt,emissiveMap:Se,normalMapObjectSpace:_e&&w.normalMapType===Fg,normalMapTangentSpace:_e&&w.normalMapType===ru,metalnessMap:qe,roughnessMap:$t,anisotropy:wt,anisotropyMap:X,clearcoat:T,clearcoatMap:Ae,clearcoatNormalMap:re,clearcoatRoughnessMap:we,dispersion:x,iridescence:H,iridescenceMap:Ee,iridescenceThicknessMap:ie,sheen:Y,sheenColorMap:pe,sheenRoughnessMap:Ne,specularMap:Me,specularColorMap:ce,specularIntensityMap:Ge,transmission:ee,transmissionMap:N,thicknessMap:se,gradientMap:ae,opaque:w.transparent===!1&&w.blending===Bs&&w.alphaToCoverage===!1,alphaMap:ve,alphaTest:te,alphaHash:J,combine:w.combine,mapUv:Ke&&y(w.map.channel),aoMapUv:vt&&y(w.aoMap.channel),lightMapUv:Ve&&y(w.lightMap.channel),bumpMapUv:De&&y(w.bumpMap.channel),normalMapUv:_e&&y(w.normalMap.channel),displacementMapUv:yt&&y(w.displacementMap.channel),emissiveMapUv:Se&&y(w.emissiveMap.channel),metalnessMapUv:qe&&y(w.metalnessMap.channel),roughnessMapUv:$t&&y(w.roughnessMap.channel),anisotropyMapUv:X&&y(w.anisotropyMap.channel),clearcoatMapUv:Ae&&y(w.clearcoatMap.channel),clearcoatNormalMapUv:re&&y(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&y(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&y(w.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&y(w.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&y(w.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&y(w.sheenRoughnessMap.channel),specularMapUv:Me&&y(w.specularMap.channel),specularColorMapUv:ce&&y(w.specularColorMap.channel),specularIntensityMapUv:Ge&&y(w.specularIntensityMap.channel),transmissionMapUv:N&&y(w.transmissionMap.channel),thicknessMapUv:se&&y(w.thicknessMap.channel),alphaMapUv:ve&&y(w.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(_e||wt),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!q.attributes.uv&&(Ke||ve),fog:!!U,useFog:w.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Z,skinning:$.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:$e,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Ke&&w.map.isVideoTexture===!0&&Ze.getTransfer(w.map.colorSpace)===rt,decodeVideoTextureEmissive:Se&&w.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(w.emissiveMap.colorSpace)===rt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===_n,flipSided:w.side===Xt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:be&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&w.extensions.multiDraw===!0||me)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function m(w){let b=[];if(w.shaderID?b.push(w.shaderID):(b.push(w.customVertexShaderID),b.push(w.customFragmentShaderID)),w.defines!==void 0)for(let A in w.defines)b.push(A),b.push(w.defines[A]);return w.isRawShaderMaterial===!1&&(M(b,w),E(b,w),b.push(n.outputColorSpace)),b.push(w.customProgramCacheKey),b.join()}function M(w,b){w.push(b.precision),w.push(b.outputColorSpace),w.push(b.envMapMode),w.push(b.envMapCubeUVHeight),w.push(b.mapUv),w.push(b.alphaMapUv),w.push(b.lightMapUv),w.push(b.aoMapUv),w.push(b.bumpMapUv),w.push(b.normalMapUv),w.push(b.displacementMapUv),w.push(b.emissiveMapUv),w.push(b.metalnessMapUv),w.push(b.roughnessMapUv),w.push(b.anisotropyMapUv),w.push(b.clearcoatMapUv),w.push(b.clearcoatNormalMapUv),w.push(b.clearcoatRoughnessMapUv),w.push(b.iridescenceMapUv),w.push(b.iridescenceThicknessMapUv),w.push(b.sheenColorMapUv),w.push(b.sheenRoughnessMapUv),w.push(b.specularMapUv),w.push(b.specularColorMapUv),w.push(b.specularIntensityMapUv),w.push(b.transmissionMapUv),w.push(b.thicknessMapUv),w.push(b.combine),w.push(b.fogExp2),w.push(b.sizeAttenuation),w.push(b.morphTargetsCount),w.push(b.morphAttributeCount),w.push(b.numDirLights),w.push(b.numPointLights),w.push(b.numSpotLights),w.push(b.numSpotLightMaps),w.push(b.numHemiLights),w.push(b.numRectAreaLights),w.push(b.numDirLightShadows),w.push(b.numPointLightShadows),w.push(b.numSpotLightShadows),w.push(b.numSpotLightShadowsWithMaps),w.push(b.numLightProbes),w.push(b.shadowMapType),w.push(b.toneMapping),w.push(b.numClippingPlanes),w.push(b.numClipIntersection),w.push(b.depthPacking)}function E(w,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),w.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),w.push(o.mask)}function S(w){let b=v[w.type],A;if(b){let O=_i[b];A=Yg.clone(O.uniforms)}else A=w.uniforms;return A}function R(w,b){let A;for(let O=0,$=u.length;O<$;O++){let U=u[O];if(U.cacheKey===b){A=U,++A.usedTimes;break}}return A===void 0&&(A=new OE(n,b,w,r),u.push(A)),A}function C(w){if(--w.usedTimes===0){let b=u.indexOf(w);u[b]=u[u.length-1],u.pop(),w.destroy()}}function P(w){l.remove(w)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:S,acquireProgram:R,releaseProgram:C,releaseShaderCache:P,programs:u,dispose:D}}function FE(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function BE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function yv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function bv(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,h,f,v,y,g){let m=n[e];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:v,renderOrder:d.renderOrder,z:y,group:g},n[e]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=v,m.renderOrder=d.renderOrder,m.z=y,m.group=g),e++,m}function o(d,h,f,v,y,g){let m=a(d,h,f,v,y,g);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(d,h,f,v,y,g){let m=a(d,h,f,v,y,g);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function c(d,h){t.length>1&&t.sort(d||BE),i.length>1&&i.sort(h||yv),s.length>1&&s.sort(h||yv)}function u(){for(let d=e,h=n.length;d<h;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function $E(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new bv,n.set(i,[a])):s>=r.length?(a=new bv,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function VE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Pe};break;case"SpotLight":t={position:new L,direction:new L,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function HE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var zE=0;function GE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function WE(n){let e=new VE,t=HE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);let s=new L,r=new He,a=new He;function o(c){let u=0,d=0,h=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,v=0,y=0,g=0,m=0,M=0,E=0,S=0,R=0,C=0,P=0;c.sort(GE);for(let w=0,b=c.length;w<b;w++){let A=c[w],O=A.color,$=A.intensity,U=A.distance,q=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=O.r*$,d+=O.g*$,h+=O.b*$;else if(A.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(A.sh.coefficients[V],$);P++}else if(A.isDirectionalLight){let V=e.get(A);if(V.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let Q=A.shadow,j=t.get(A);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.directionalShadow[f]=j,i.directionalShadowMap[f]=q,i.directionalShadowMatrix[f]=A.shadow.matrix,M++}i.directional[f]=V,f++}else if(A.isSpotLight){let V=e.get(A);V.position.setFromMatrixPosition(A.matrixWorld),V.color.copy(O).multiplyScalar($),V.distance=U,V.coneCos=Math.cos(A.angle),V.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),V.decay=A.decay,i.spot[y]=V;let Q=A.shadow;if(A.map&&(i.spotLightMap[R]=A.map,R++,Q.updateMatrices(A),A.castShadow&&C++),i.spotLightMatrix[y]=Q.matrix,A.castShadow){let j=t.get(A);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.spotShadow[y]=j,i.spotShadowMap[y]=q,S++}y++}else if(A.isRectAreaLight){let V=e.get(A);V.color.copy(O).multiplyScalar($),V.halfWidth.set(A.width*.5,0,0),V.halfHeight.set(0,A.height*.5,0),i.rectArea[g]=V,g++}else if(A.isPointLight){let V=e.get(A);if(V.color.copy(A.color).multiplyScalar(A.intensity),V.distance=A.distance,V.decay=A.decay,A.castShadow){let Q=A.shadow,j=t.get(A);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,j.shadowCameraNear=Q.camera.near,j.shadowCameraFar=Q.camera.far,i.pointShadow[v]=j,i.pointShadowMap[v]=q,i.pointShadowMatrix[v]=A.shadow.matrix,E++}i.point[v]=V,v++}else if(A.isHemisphereLight){let V=e.get(A);V.skyColor.copy(A.color).multiplyScalar($),V.groundColor.copy(A.groundColor).multiplyScalar($),i.hemi[m]=V,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let D=i.hash;(D.directionalLength!==f||D.pointLength!==v||D.spotLength!==y||D.rectAreaLength!==g||D.hemiLength!==m||D.numDirectionalShadows!==M||D.numPointShadows!==E||D.numSpotShadows!==S||D.numSpotMaps!==R||D.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=y,i.rectArea.length=g,i.point.length=v,i.hemi.length=m,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+R-C,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=P,D.directionalLength=f,D.pointLength=v,D.spotLength=y,D.rectAreaLength=g,D.hemiLength=m,D.numDirectionalShadows=M,D.numPointShadows=E,D.numSpotShadows=S,D.numSpotMaps=R,D.numLightProbes=P,i.version=zE++)}function l(c,u){let d=0,h=0,f=0,v=0,y=0,g=u.matrixWorldInverse;for(let m=0,M=c.length;m<M;m++){let E=c[m];if(E.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),d++}else if(E.isSpotLight){let S=i.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),f++}else if(E.isRectAreaLight){let S=i.rectArea[v];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),a.identity(),r.copy(E.matrixWorld),r.premultiply(g),a.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(E.isPointLight){let S=i.point[h];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),h++}else if(E.isHemisphereLight){let S=i.hemi[y];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:i}}function xv(n){let e=new WE(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function qE(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new xv(n),e.set(s,[o])):r>=a.length?(o=new xv(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var jE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XE=`uniform sampler2D shadow_pass;
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
}`;function YE(n,e,t){let i=new Xr,s=new Ce,r=new Ce,a=new tt,o=new tc({depthPacking:Ug}),l=new nc,c={},u=t.maxTextureSize,d={[ii]:Xt,[Xt]:ii,[_n]:_n},h=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:jE,fragmentShader:XE}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let v=new cn;v.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new at(v,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rh;let m=this.type;this.render=function(C,P,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;let w=n.getRenderTarget(),b=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Wi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let $=m!==xi&&this.type===xi,U=m===xi&&this.type!==xi;for(let q=0,V=C.length;q<V;q++){let Q=C[q],j=Q.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);let oe=j.getFrameExtents();if(s.multiply(oe),r.copy(j.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/oe.x),s.x=r.x*oe.x,j.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/oe.y),s.y=r.y*oe.y,j.mapSize.y=r.y)),j.map===null||$===!0||U===!0){let xe=this.type!==xi?{minFilter:qt,magFilter:qt}:{};j.map!==null&&j.map.dispose(),j.map=new pi(s.x,s.y,xe),j.map.texture.name=Q.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();let de=j.getViewportCount();for(let xe=0;xe<de;xe++){let $e=j.getViewport(xe);a.set(r.x*$e.x,r.y*$e.y,r.x*$e.z,r.y*$e.w),O.viewport(a),j.updateMatrices(Q,xe),i=j.getFrustum(),S(P,D,j.camera,Q,this.type)}j.isPointLightShadow!==!0&&this.type===xi&&M(j,D),j.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(w,b,A)};function M(C,P){let D=e.update(y);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new pi(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(P,null,D,h,y,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(P,null,D,f,y,null)}function E(C,P,D,w){let b=null,A=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(A!==void 0)b=A;else if(b=D.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let O=b.uuid,$=P.uuid,U=c[O];U===void 0&&(U={},c[O]=U);let q=U[$];q===void 0&&(q=b.clone(),U[$]=q,P.addEventListener("dispose",R)),b=q}if(b.visible=P.visible,b.wireframe=P.wireframe,w===xi?b.side=P.shadowSide!==null?P.shadowSide:P.side:b.side=P.shadowSide!==null?P.shadowSide:d[P.side],b.alphaMap=P.alphaMap,b.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,b.map=P.map,b.clipShadows=P.clipShadows,b.clippingPlanes=P.clippingPlanes,b.clipIntersection=P.clipIntersection,b.displacementMap=P.displacementMap,b.displacementScale=P.displacementScale,b.displacementBias=P.displacementBias,b.wireframeLinewidth=P.wireframeLinewidth,b.linewidth=P.linewidth,D.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let O=n.properties.get(b);O.light=D}return b}function S(C,P,D,w,b){if(C.visible===!1)return;if(C.layers.test(P.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===xi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);let $=e.update(C),U=C.material;if(Array.isArray(U)){let q=$.groups;for(let V=0,Q=q.length;V<Q;V++){let j=q[V],oe=U[j.materialIndex];if(oe&&oe.visible){let de=E(C,oe,w,b);C.onBeforeShadow(n,C,P,D,$,de,j),n.renderBufferDirect(D,null,$,de,C,j),C.onAfterShadow(n,C,P,D,$,de,j)}}}else if(U.visible){let q=E(C,U,w,b);C.onBeforeShadow(n,C,P,D,$,q,null),n.renderBufferDirect(D,null,$,q,C,null),C.onAfterShadow(n,C,P,D,$,q,null)}}let O=C.children;for(let $=0,U=O.length;$<U;$++)S(O[$],P,D,w,b)}function R(C){C.target.removeEventListener("dispose",R);for(let D in c){let w=c[D],b=C.target.uuid;b in w&&(w[b].dispose(),delete w[b])}}}var KE={[dc]:hc,[pc]:gc,[fc]:vc,[$s]:mc,[hc]:dc,[gc]:pc,[vc]:fc,[mc]:$s};function JE(n,e){function t(){let N=!1,se=new tt,ae=null,ve=new tt(0,0,0,0);return{setMask:function(te){ae!==te&&!N&&(n.colorMask(te,te,te,te),ae=te)},setLocked:function(te){N=te},setClear:function(te,J,be,Fe,pt){pt===!0&&(te*=Fe,J*=Fe,be*=Fe),se.set(te,J,be,Fe),ve.equals(se)===!1&&(n.clearColor(te,J,be,Fe),ve.copy(se))},reset:function(){N=!1,ae=null,ve.set(-1,0,0,0)}}}function i(){let N=!1,se=!1,ae=null,ve=null,te=null;return{setReversed:function(J){if(se!==J){let be=e.get("EXT_clip_control");J?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),se=J;let Fe=te;te=null,this.setClear(Fe)}},getReversed:function(){return se},setTest:function(J){J?B(n.DEPTH_TEST):Z(n.DEPTH_TEST)},setMask:function(J){ae!==J&&!N&&(n.depthMask(J),ae=J)},setFunc:function(J){if(se&&(J=KE[J]),ve!==J){switch(J){case dc:n.depthFunc(n.NEVER);break;case hc:n.depthFunc(n.ALWAYS);break;case pc:n.depthFunc(n.LESS);break;case $s:n.depthFunc(n.LEQUAL);break;case fc:n.depthFunc(n.EQUAL);break;case mc:n.depthFunc(n.GEQUAL);break;case gc:n.depthFunc(n.GREATER);break;case vc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=J}},setLocked:function(J){N=J},setClear:function(J){te!==J&&(se&&(J=1-J),n.clearDepth(J),te=J)},reset:function(){N=!1,ae=null,ve=null,te=null,se=!1}}}function s(){let N=!1,se=null,ae=null,ve=null,te=null,J=null,be=null,Fe=null,pt=null;return{setTest:function(nt){N||(nt?B(n.STENCIL_TEST):Z(n.STENCIL_TEST))},setMask:function(nt){se!==nt&&!N&&(n.stencilMask(nt),se=nt)},setFunc:function(nt,Ni,ui){(ae!==nt||ve!==Ni||te!==ui)&&(n.stencilFunc(nt,Ni,ui),ae=nt,ve=Ni,te=ui)},setOp:function(nt,Ni,ui){(J!==nt||be!==Ni||Fe!==ui)&&(n.stencilOp(nt,Ni,ui),J=nt,be=Ni,Fe=ui)},setLocked:function(nt){N=nt},setClear:function(nt){pt!==nt&&(n.clearStencil(nt),pt=nt)},reset:function(){N=!1,se=null,ae=null,ve=null,te=null,J=null,be=null,Fe=null,pt=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h=new WeakMap,f=[],v=null,y=!1,g=null,m=null,M=null,E=null,S=null,R=null,C=null,P=new Pe(0,0,0),D=0,w=!1,b=null,A=null,O=null,$=null,U=null,q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,Q=0,j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(j)[1]),V=Q>=1):j.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),V=Q>=2);let oe=null,de={},xe=n.getParameter(n.SCISSOR_BOX),$e=n.getParameter(n.VIEWPORT),it=new tt().fromArray(xe),ut=new tt().fromArray($e);function Qe(N,se,ae,ve){let te=new Uint8Array(4),J=n.createTexture();n.bindTexture(N,J),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<ae;be++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,te):n.texImage2D(se+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,te);return J}let K={};K[n.TEXTURE_2D]=Qe(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=Qe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=Qe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=Qe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),B(n.DEPTH_TEST),a.setFunc($s),De(!1),_e(sh),B(n.CULL_FACE),vt(Wi);function B(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Z(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function he(N,se){return d[N]!==se?(n.bindFramebuffer(N,se),d[N]=se,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=se),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=se),!0):!1}function me(N,se){let ae=f,ve=!1;if(N){ae=h.get(se),ae===void 0&&(ae=[],h.set(se,ae));let te=N.textures;if(ae.length!==te.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let J=0,be=te.length;J<be;J++)ae[J]=n.COLOR_ATTACHMENT0+J;ae.length=te.length,ve=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,ve=!0);ve&&n.drawBuffers(ae)}function Ke(N){return v!==N?(n.useProgram(N),v=N,!0):!1}let Jt={[cs]:n.FUNC_ADD,[ag]:n.FUNC_SUBTRACT,[og]:n.FUNC_REVERSE_SUBTRACT};Jt[lg]=n.MIN,Jt[cg]=n.MAX;let I={[ug]:n.ZERO,[dg]:n.ONE,[hg]:n.SRC_COLOR,[Wl]:n.SRC_ALPHA,[yg]:n.SRC_ALPHA_SATURATE,[gg]:n.DST_COLOR,[fg]:n.DST_ALPHA,[pg]:n.ONE_MINUS_SRC_COLOR,[ql]:n.ONE_MINUS_SRC_ALPHA,[vg]:n.ONE_MINUS_DST_COLOR,[mg]:n.ONE_MINUS_DST_ALPHA,[bg]:n.CONSTANT_COLOR,[xg]:n.ONE_MINUS_CONSTANT_COLOR,[_g]:n.CONSTANT_ALPHA,[Sg]:n.ONE_MINUS_CONSTANT_ALPHA};function vt(N,se,ae,ve,te,J,be,Fe,pt,nt){if(N===Wi){y===!0&&(Z(n.BLEND),y=!1);return}if(y===!1&&(B(n.BLEND),y=!0),N!==rg){if(N!==g||nt!==w){if((m!==cs||S!==cs)&&(n.blendEquation(n.FUNC_ADD),m=cs,S=cs),nt)switch(N){case Bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ah:n.blendFunc(n.ONE,n.ONE);break;case oh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case lh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ah:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case oh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,E=null,R=null,C=null,P.set(0,0,0),D=0,g=N,w=nt}return}te=te||se,J=J||ae,be=be||ve,(se!==m||te!==S)&&(n.blendEquationSeparate(Jt[se],Jt[te]),m=se,S=te),(ae!==M||ve!==E||J!==R||be!==C)&&(n.blendFuncSeparate(I[ae],I[ve],I[J],I[be]),M=ae,E=ve,R=J,C=be),(Fe.equals(P)===!1||pt!==D)&&(n.blendColor(Fe.r,Fe.g,Fe.b,pt),P.copy(Fe),D=pt),g=N,w=!1}function Ve(N,se){N.side===_n?Z(n.CULL_FACE):B(n.CULL_FACE);let ae=N.side===Xt;se&&(ae=!ae),De(ae),N.blending===Bs&&N.transparent===!1?vt(Wi):vt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let ve=N.stencilWrite;o.setTest(ve),ve&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Se(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?B(n.SAMPLE_ALPHA_TO_COVERAGE):Z(n.SAMPLE_ALPHA_TO_COVERAGE)}function De(N){b!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),b=N)}function _e(N){N!==ng?(B(n.CULL_FACE),N!==A&&(N===sh?n.cullFace(n.BACK):N===ig?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Z(n.CULL_FACE),A=N}function yt(N){N!==O&&(V&&n.lineWidth(N),O=N)}function Se(N,se,ae){N?(B(n.POLYGON_OFFSET_FILL),($!==se||U!==ae)&&(n.polygonOffset(se,ae),$=se,U=ae)):Z(n.POLYGON_OFFSET_FILL)}function qe(N){N?B(n.SCISSOR_TEST):Z(n.SCISSOR_TEST)}function $t(N){N===void 0&&(N=n.TEXTURE0+q-1),oe!==N&&(n.activeTexture(N),oe=N)}function wt(N,se,ae){ae===void 0&&(oe===null?ae=n.TEXTURE0+q-1:ae=oe);let ve=de[ae];ve===void 0&&(ve={type:void 0,texture:void 0},de[ae]=ve),(ve.type!==N||ve.texture!==se)&&(oe!==ae&&(n.activeTexture(ae),oe=ae),n.bindTexture(N,se||K[N]),ve.type=N,ve.texture=se)}function T(){let N=de[oe];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function H(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pe(N){it.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),it.copy(N))}function Ne(N){ut.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),ut.copy(N))}function Me(N,se){let ae=c.get(se);ae===void 0&&(ae=new WeakMap,c.set(se,ae));let ve=ae.get(N);ve===void 0&&(ve=n.getUniformBlockIndex(se,N.name),ae.set(N,ve))}function ce(N,se){let ve=c.get(se).get(N);l.get(se)!==ve&&(n.uniformBlockBinding(se,ve,N.__bindingPointIndex),l.set(se,ve))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},oe=null,de={},d={},h=new WeakMap,f=[],v=null,y=!1,g=null,m=null,M=null,E=null,S=null,R=null,C=null,P=new Pe(0,0,0),D=0,w=!1,b=null,A=null,O=null,$=null,U=null,it.set(0,0,n.canvas.width,n.canvas.height),ut.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:B,disable:Z,bindFramebuffer:he,drawBuffers:me,useProgram:Ke,setBlending:vt,setMaterial:Ve,setFlipSided:De,setCullFace:_e,setLineWidth:yt,setPolygonOffset:Se,setScissorTest:qe,activeTexture:$t,bindTexture:wt,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:H,texImage2D:Ee,texImage3D:ie,updateUBOMapping:Me,uniformBlockBinding:ce,texStorage2D:re,texStorage3D:we,texSubImage2D:Y,texSubImage3D:ee,compressedTexSubImage2D:X,compressedTexSubImage3D:Ae,scissor:pe,viewport:Ne,reset:Ge}}function ZE(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,x){return f?new OffscreenCanvas(T,x):$r("canvas")}function y(T,x,H){let Y=1,ee=wt(T);if((ee.width>H||ee.height>H)&&(Y=H/Math.max(ee.width,ee.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let X=Math.floor(Y*ee.width),Ae=Math.floor(Y*ee.height);d===void 0&&(d=v(X,Ae));let re=x?v(X,Ae):d;return re.width=X,re.height=Ae,re.getContext("2d").drawImage(T,0,0,X,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+X+"x"+Ae+")."),re}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),T;return T}function g(T){return T.generateMipmaps}function m(T){n.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(T,x,H,Y,ee=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=x;if(x===n.RED&&(H===n.FLOAT&&(X=n.R32F),H===n.HALF_FLOAT&&(X=n.R16F),H===n.UNSIGNED_BYTE&&(X=n.R8)),x===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(X=n.R8UI),H===n.UNSIGNED_SHORT&&(X=n.R16UI),H===n.UNSIGNED_INT&&(X=n.R32UI),H===n.BYTE&&(X=n.R8I),H===n.SHORT&&(X=n.R16I),H===n.INT&&(X=n.R32I)),x===n.RG&&(H===n.FLOAT&&(X=n.RG32F),H===n.HALF_FLOAT&&(X=n.RG16F),H===n.UNSIGNED_BYTE&&(X=n.RG8)),x===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(X=n.RG8UI),H===n.UNSIGNED_SHORT&&(X=n.RG16UI),H===n.UNSIGNED_INT&&(X=n.RG32UI),H===n.BYTE&&(X=n.RG8I),H===n.SHORT&&(X=n.RG16I),H===n.INT&&(X=n.RG32I)),x===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(X=n.RGB8UI),H===n.UNSIGNED_SHORT&&(X=n.RGB16UI),H===n.UNSIGNED_INT&&(X=n.RGB32UI),H===n.BYTE&&(X=n.RGB8I),H===n.SHORT&&(X=n.RGB16I),H===n.INT&&(X=n.RGB32I)),x===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),H===n.UNSIGNED_INT&&(X=n.RGBA32UI),H===n.BYTE&&(X=n.RGBA8I),H===n.SHORT&&(X=n.RGBA16I),H===n.INT&&(X=n.RGBA32I)),x===n.RGB&&(H===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),x===n.RGBA){let Ae=ee?qa:Ze.getTransfer(Y);H===n.FLOAT&&(X=n.RGBA32F),H===n.HALF_FLOAT&&(X=n.RGBA16F),H===n.UNSIGNED_BYTE&&(X=Ae===rt?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function S(T,x){let H;return T?x===null||x===gs||x===na?H=n.DEPTH24_STENCIL8:x===Wn?H=n.DEPTH32F_STENCIL8:x===ea&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===gs||x===na?H=n.DEPTH_COMPONENT24:x===Wn?H=n.DEPTH_COMPONENT32F:x===ea&&(H=n.DEPTH_COMPONENT16),H}function R(T,x){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==qt&&T.minFilter!==an?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function C(T){let x=T.target;x.removeEventListener("dispose",C),D(x),x.isVideoTexture&&u.delete(x)}function P(T){let x=T.target;x.removeEventListener("dispose",P),b(x)}function D(T){let x=i.get(T);if(x.__webglInit===void 0)return;let H=T.source,Y=h.get(H);if(Y){let ee=Y[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(T),Object.keys(Y).length===0&&h.delete(H)}i.remove(T)}function w(T){let x=i.get(T);n.deleteTexture(x.__webglTexture);let H=T.source,Y=h.get(H);delete Y[x.__cacheKey],a.memory.textures--}function b(T){let x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let ee=0;ee<x.__webglFramebuffer[Y].length;ee++)n.deleteFramebuffer(x.__webglFramebuffer[Y][ee]);else n.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[Y]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let H=T.textures;for(let Y=0,ee=H.length;Y<ee;Y++){let X=i.get(H[Y]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(H[Y])}i.remove(T)}let A=0;function O(){A=0}function $(){let T=A;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),A+=1,T}function U(T){let x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function q(T,x){let H=i.get(T);if(T.isVideoTexture&&qe(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&H.__version!==T.version){let Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(H,T,x);return}}else T.isExternalTexture&&(H.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+x)}function V(T,x){let H=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&H.__version!==T.version){K(H,T,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+x)}function Q(T,x){let H=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&H.__version!==T.version){K(H,T,x);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+x)}function j(T,x){let H=i.get(T);if(T.version>0&&H.__version!==T.version){B(H,T,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+x)}let oe={[us]:n.REPEAT,[di]:n.CLAMP_TO_EDGE,[Fr]:n.MIRRORED_REPEAT},de={[qt]:n.NEAREST,[Sc]:n.NEAREST_MIPMAP_NEAREST,[er]:n.NEAREST_MIPMAP_LINEAR,[an]:n.LINEAR,[Qr]:n.LINEAR_MIPMAP_NEAREST,[ai]:n.LINEAR_MIPMAP_LINEAR},xe={[Bg]:n.NEVER,[Wg]:n.ALWAYS,[$g]:n.LESS,[yh]:n.LEQUAL,[Vg]:n.EQUAL,[Gg]:n.GEQUAL,[Hg]:n.GREATER,[zg]:n.NOTEQUAL};function $e(T,x){if(x.type===Wn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===an||x.magFilter===Qr||x.magFilter===er||x.magFilter===ai||x.minFilter===an||x.minFilter===Qr||x.minFilter===er||x.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,oe[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,oe[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,oe[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,de[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,de[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,xe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===qt||x.minFilter!==er&&x.minFilter!==ai||x.type===Wn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function it(T,x){let H=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",C));let Y=x.source,ee=h.get(Y);ee===void 0&&(ee={},h.set(Y,ee));let X=U(x);if(X!==T.__cacheKey){ee[X]===void 0&&(ee[X]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ee[X].usedTimes++;let Ae=ee[T.__cacheKey];Ae!==void 0&&(ee[T.__cacheKey].usedTimes--,Ae.usedTimes===0&&w(x)),T.__cacheKey=X,T.__webglTexture=ee[X].texture}return H}function ut(T,x,H){return Math.floor(Math.floor(T/H)/x)}function Qe(T,x,H,Y){let X=T.updateRanges;if(X.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,H,Y,x.data);else{X.sort((ie,pe)=>ie.start-pe.start);let Ae=0;for(let ie=1;ie<X.length;ie++){let pe=X[Ae],Ne=X[ie],Me=pe.start+pe.count,ce=ut(Ne.start,x.width,4),Ge=ut(pe.start,x.width,4);Ne.start<=Me+1&&ce===Ge&&ut(Ne.start+Ne.count-1,x.width,4)===ce?pe.count=Math.max(pe.count,Ne.start+Ne.count-pe.start):(++Ae,X[Ae]=Ne)}X.length=Ae+1;let re=n.getParameter(n.UNPACK_ROW_LENGTH),we=n.getParameter(n.UNPACK_SKIP_PIXELS),Ee=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ie=0,pe=X.length;ie<pe;ie++){let Ne=X[ie],Me=Math.floor(Ne.start/4),ce=Math.ceil(Ne.count/4),Ge=Me%x.width,N=Math.floor(Me/x.width),se=ce,ae=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Ge,N,se,ae,H,Y,x.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,we),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ee)}}function K(T,x,H){let Y=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=n.TEXTURE_3D);let ee=it(T,x),X=x.source;t.bindTexture(Y,T.__webglTexture,n.TEXTURE0+H);let Ae=i.get(X);if(X.version!==Ae.__version||ee===!0){t.activeTexture(n.TEXTURE0+H);let re=Ze.getPrimaries(Ze.workingColorSpace),we=x.colorSpace===ji?null:Ze.getPrimaries(x.colorSpace),Ee=x.colorSpace===ji||re===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let ie=y(x.image,!1,s.maxTextureSize);ie=$t(x,ie);let pe=r.convert(x.format,x.colorSpace),Ne=r.convert(x.type),Me=E(x.internalFormat,pe,Ne,x.colorSpace,x.isVideoTexture);$e(Y,x);let ce,Ge=x.mipmaps,N=x.isVideoTexture!==!0,se=Ae.__version===void 0||ee===!0,ae=X.dataReady,ve=R(x,ie);if(x.isDepthTexture)Me=S(x.format===ia,x.type),se&&(N?t.texStorage2D(n.TEXTURE_2D,1,Me,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Me,ie.width,ie.height,0,pe,Ne,null));else if(x.isDataTexture)if(Ge.length>0){N&&se&&t.texStorage2D(n.TEXTURE_2D,ve,Me,Ge[0].width,Ge[0].height);for(let te=0,J=Ge.length;te<J;te++)ce=Ge[te],N?ae&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,ce.width,ce.height,pe,Ne,ce.data):t.texImage2D(n.TEXTURE_2D,te,Me,ce.width,ce.height,0,pe,Ne,ce.data);x.generateMipmaps=!1}else N?(se&&t.texStorage2D(n.TEXTURE_2D,ve,Me,ie.width,ie.height),ae&&Qe(x,ie,pe,Ne)):t.texImage2D(n.TEXTURE_2D,0,Me,ie.width,ie.height,0,pe,Ne,ie.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Me,Ge[0].width,Ge[0].height,ie.depth);for(let te=0,J=Ge.length;te<J;te++)if(ce=Ge[te],x.format!==Nn)if(pe!==null)if(N){if(ae)if(x.layerUpdates.size>0){let be=Mh(ce.width,ce.height,x.format,x.type);for(let Fe of x.layerUpdates){let pt=ce.data.subarray(Fe*be/ce.data.BYTES_PER_ELEMENT,(Fe+1)*be/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,Fe,ce.width,ce.height,1,pe,pt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ie.depth,pe,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,Me,ce.width,ce.height,ie.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ae&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ie.depth,pe,Ne,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,Me,ce.width,ce.height,ie.depth,0,pe,Ne,ce.data)}else{N&&se&&t.texStorage2D(n.TEXTURE_2D,ve,Me,Ge[0].width,Ge[0].height);for(let te=0,J=Ge.length;te<J;te++)ce=Ge[te],x.format!==Nn?pe!==null?N?ae&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,ce.width,ce.height,pe,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,te,Me,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ae&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,ce.width,ce.height,pe,Ne,ce.data):t.texImage2D(n.TEXTURE_2D,te,Me,ce.width,ce.height,0,pe,Ne,ce.data)}else if(x.isDataArrayTexture)if(N){if(se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Me,ie.width,ie.height,ie.depth),ae)if(x.layerUpdates.size>0){let te=Mh(ie.width,ie.height,x.format,x.type);for(let J of x.layerUpdates){let be=ie.data.subarray(J*te/ie.data.BYTES_PER_ELEMENT,(J+1)*te/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,ie.width,ie.height,1,pe,Ne,be)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,pe,Ne,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,ie.width,ie.height,ie.depth,0,pe,Ne,ie.data);else if(x.isData3DTexture)N?(se&&t.texStorage3D(n.TEXTURE_3D,ve,Me,ie.width,ie.height,ie.depth),ae&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,pe,Ne,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Me,ie.width,ie.height,ie.depth,0,pe,Ne,ie.data);else if(x.isFramebufferTexture){if(se)if(N)t.texStorage2D(n.TEXTURE_2D,ve,Me,ie.width,ie.height);else{let te=ie.width,J=ie.height;for(let be=0;be<ve;be++)t.texImage2D(n.TEXTURE_2D,be,Me,te,J,0,pe,Ne,null),te>>=1,J>>=1}}else if(Ge.length>0){if(N&&se){let te=wt(Ge[0]);t.texStorage2D(n.TEXTURE_2D,ve,Me,te.width,te.height)}for(let te=0,J=Ge.length;te<J;te++)ce=Ge[te],N?ae&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,pe,Ne,ce):t.texImage2D(n.TEXTURE_2D,te,Me,pe,Ne,ce);x.generateMipmaps=!1}else if(N){if(se){let te=wt(ie);t.texStorage2D(n.TEXTURE_2D,ve,Me,te.width,te.height)}ae&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Ne,ie)}else t.texImage2D(n.TEXTURE_2D,0,Me,pe,Ne,ie);g(x)&&m(Y),Ae.__version=X.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function B(T,x,H){if(x.image.length!==6)return;let Y=it(T,x),ee=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+H);let X=i.get(ee);if(ee.version!==X.__version||Y===!0){t.activeTexture(n.TEXTURE0+H);let Ae=Ze.getPrimaries(Ze.workingColorSpace),re=x.colorSpace===ji?null:Ze.getPrimaries(x.colorSpace),we=x.colorSpace===ji||Ae===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let Ee=x.isCompressedTexture||x.image[0].isCompressedTexture,ie=x.image[0]&&x.image[0].isDataTexture,pe=[];for(let J=0;J<6;J++)!Ee&&!ie?pe[J]=y(x.image[J],!0,s.maxCubemapSize):pe[J]=ie?x.image[J].image:x.image[J],pe[J]=$t(x,pe[J]);let Ne=pe[0],Me=r.convert(x.format,x.colorSpace),ce=r.convert(x.type),Ge=E(x.internalFormat,Me,ce,x.colorSpace),N=x.isVideoTexture!==!0,se=X.__version===void 0||Y===!0,ae=ee.dataReady,ve=R(x,Ne);$e(n.TEXTURE_CUBE_MAP,x);let te;if(Ee){N&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,Ge,Ne.width,Ne.height);for(let J=0;J<6;J++){te=pe[J].mipmaps;for(let be=0;be<te.length;be++){let Fe=te[be];x.format!==Nn?Me!==null?N?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,Fe.width,Fe.height,Me,Fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,Ge,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,Fe.width,Fe.height,Me,ce,Fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,Ge,Fe.width,Fe.height,0,Me,ce,Fe.data)}}}else{if(te=x.mipmaps,N&&se){te.length>0&&ve++;let J=wt(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,Ge,J.width,J.height)}for(let J=0;J<6;J++)if(ie){N?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pe[J].width,pe[J].height,Me,ce,pe[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ge,pe[J].width,pe[J].height,0,Me,ce,pe[J].data);for(let be=0;be<te.length;be++){let pt=te[be].image[J].image;N?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,pt.width,pt.height,Me,ce,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,Ge,pt.width,pt.height,0,Me,ce,pt.data)}}else{N?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Me,ce,pe[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ge,Me,ce,pe[J]);for(let be=0;be<te.length;be++){let Fe=te[be];N?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,Me,ce,Fe.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,Ge,Me,ce,Fe.image[J])}}}g(x)&&m(n.TEXTURE_CUBE_MAP),X.__version=ee.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Z(T,x,H,Y,ee,X){let Ae=r.convert(H.format,H.colorSpace),re=r.convert(H.type),we=E(H.internalFormat,Ae,re,H.colorSpace),Ee=i.get(x),ie=i.get(H);if(ie.__renderTarget=x,!Ee.__hasExternalTextures){let pe=Math.max(1,x.width>>X),Ne=Math.max(1,x.height>>X);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,X,we,pe,Ne,x.depth,0,Ae,re,null):t.texImage2D(ee,X,we,pe,Ne,0,Ae,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Se(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,ee,ie.__webglTexture,0,yt(x)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,ee,ie.__webglTexture,X),t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(T,x,H){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){let Y=x.depthTexture,ee=Y&&Y.isDepthTexture?Y.type:null,X=S(x.stencilBuffer,ee),Ae=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=yt(x);Se(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,X,x.width,x.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,X,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,X,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,T)}else{let Y=x.textures;for(let ee=0;ee<Y.length;ee++){let X=Y[ee],Ae=r.convert(X.format,X.colorSpace),re=r.convert(X.type),we=E(X.internalFormat,Ae,re,X.colorSpace),Ee=yt(x);H&&Se(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ee,we,x.width,x.height):Se(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ee,we,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,we,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function me(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=i.get(x.depthTexture);Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),q(x.depthTexture,0);let ee=Y.__webglTexture,X=yt(x);if(x.depthTexture.format===Br)Se(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(x.depthTexture.format===ia)Se(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ke(T){let x=i.get(T),H=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){let Y=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){let ee=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",ee)};Y.addEventListener("dispose",ee),x.__depthDisposeCallback=ee}x.__boundDepthTexture=Y}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let Y=T.texture.mipmaps;Y&&Y.length>0?me(x.__webglFramebuffer[0],T):me(x.__webglFramebuffer,T)}else if(H){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=n.createRenderbuffer(),he(x.__webglDepthbuffer[Y],T,!1);else{let ee=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,X)}}else{let Y=T.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),he(x.__webglDepthbuffer,T,!1);else{let ee=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,X)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Jt(T,x,H){let Y=i.get(T);x!==void 0&&Z(Y.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Ke(T)}function I(T){let x=T.texture,H=i.get(T),Y=i.get(x);T.addEventListener("dispose",P);let ee=T.textures,X=T.isWebGLCubeRenderTarget===!0,Ae=ee.length>1;if(Ae||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=x.version,a.memory.textures++),X){H.__webglFramebuffer=[];for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer[re]=[];for(let we=0;we<x.mipmaps.length;we++)H.__webglFramebuffer[re][we]=n.createFramebuffer()}else H.__webglFramebuffer[re]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer=[];for(let re=0;re<x.mipmaps.length;re++)H.__webglFramebuffer[re]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let re=0,we=ee.length;re<we;re++){let Ee=i.get(ee[re]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Se(T)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let re=0;re<ee.length;re++){let we=ee[re];H.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[re]);let Ee=r.convert(we.format,we.colorSpace),ie=r.convert(we.type),pe=E(we.internalFormat,Ee,ie,we.colorSpace,T.isXRRenderTarget===!0),Ne=yt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,pe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,H.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),he(H.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),$e(n.TEXTURE_CUBE_MAP,x);for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0)for(let we=0;we<x.mipmaps.length;we++)Z(H.__webglFramebuffer[re][we],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,we);else Z(H.__webglFramebuffer[re],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(x)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let re=0,we=ee.length;re<we;re++){let Ee=ee[re],ie=i.get(Ee),pe=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,ie.__webglTexture),$e(pe,Ee),Z(H.__webglFramebuffer,T,Ee,n.COLOR_ATTACHMENT0+re,pe,0),g(Ee)&&m(pe)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(re=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,Y.__webglTexture),$e(re,x),x.mipmaps&&x.mipmaps.length>0)for(let we=0;we<x.mipmaps.length;we++)Z(H.__webglFramebuffer[we],T,x,n.COLOR_ATTACHMENT0,re,we);else Z(H.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,re,0);g(x)&&m(re),t.unbindTexture()}T.depthBuffer&&Ke(T)}function vt(T){let x=T.textures;for(let H=0,Y=x.length;H<Y;H++){let ee=x[H];if(g(ee)){let X=M(T),Ae=i.get(ee).__webglTexture;t.bindTexture(X,Ae),m(X),t.unbindTexture()}}}let Ve=[],De=[];function _e(T){if(T.samples>0){if(Se(T)===!1){let x=T.textures,H=T.width,Y=T.height,ee=n.COLOR_BUFFER_BIT,X=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(T),re=x.length>1;if(re)for(let Ee=0;Ee<x.length;Ee++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);let we=T.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ee=0;Ee<x.length;Ee++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);let ie=i.get(x[Ee]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ie,0)}n.blitFramebuffer(0,0,H,Y,0,0,H,Y,ee,n.NEAREST),l===!0&&(Ve.length=0,De.length=0,Ve.push(n.COLOR_ATTACHMENT0+Ee),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ve.push(X),De.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,De)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Ee=0;Ee<x.length;Ee++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);let ie=i.get(x[Ee]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.TEXTURE_2D,ie,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function yt(T){return Math.min(s.maxSamples,T.samples)}function Se(T){let x=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function qe(T){let x=a.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function $t(T,x){let H=T.colorSpace,Y=T.format,ee=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||H!==jt&&H!==ji&&(Ze.getTransfer(H)===rt?(Y!==Nn||ee!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),x}function wt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=V,this.setTexture3D=Q,this.setTextureCube=j,this.rebindTextures=Jt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=Se}function QE(n,e){function t(i,s=ji){let r,a=Ze.getTransfer(s);if(i===oi)return n.UNSIGNED_BYTE;if(i===Ec)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===hh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ph)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===uh)return n.BYTE;if(i===dh)return n.SHORT;if(i===ea)return n.UNSIGNED_SHORT;if(i===wc)return n.INT;if(i===gs)return n.UNSIGNED_INT;if(i===Wn)return n.FLOAT;if(i===ta)return n.HALF_FLOAT;if(i===fh)return n.ALPHA;if(i===mh)return n.RGB;if(i===Nn)return n.RGBA;if(i===Br)return n.DEPTH_COMPONENT;if(i===ia)return n.DEPTH_STENCIL;if(i===Tc)return n.RED;if(i===Ac)return n.RED_INTEGER;if(i===gh)return n.RG;if(i===Cc)return n.RG_INTEGER;if(i===Rc)return n.RGBA_INTEGER;if(i===wo||i===Eo||i===Mo||i===To)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===wo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===wo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Eo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Mo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===To)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ic||i===Pc||i===Lc||i===Nc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ic)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Pc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Lc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Nc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Dc||i===Oc||i===kc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Dc||i===Oc)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===kc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Uc||i===Fc||i===Bc||i===$c||i===Vc||i===Hc||i===zc||i===Gc||i===Wc||i===qc||i===jc||i===Xc||i===Yc||i===Kc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Uc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===$c)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Hc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===jc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Xc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Yc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Kc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Jc||i===Zc||i===Qc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Jc)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Zc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Qc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===eu||i===tu||i===nu||i===iu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===eu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===tu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===nu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===iu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===na?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var eM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tM=`
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

}`,Fh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new oo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ri({vertexShader:eM,fragmentShader:tM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new js(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bh=class extends si{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,v=null,y=typeof XRWebGLBinding<"u",g=new Fh,m={},M=t.getContextAttributes(),E=null,S=null,R=[],C=[],P=new Ce,D=null,w=new Ct;w.viewport=new tt;let b=new Ct;b.viewport=new tt;let A=[w,b],O=new lc,$=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let B=R[K];return B===void 0&&(B=new Gr,R[K]=B),B.getTargetRaySpace()},this.getControllerGrip=function(K){let B=R[K];return B===void 0&&(B=new Gr,R[K]=B),B.getGripSpace()},this.getHand=function(K){let B=R[K];return B===void 0&&(B=new Gr,R[K]=B),B.getHandSpace()};function q(K){let B=C.indexOf(K.inputSource);if(B===-1)return;let Z=R[B];Z!==void 0&&(Z.update(K.inputSource,K.frame,c||a),Z.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",Q);for(let K=0;K<R.length;K++){let B=C[K];B!==null&&(C[K]=null,R[K].disconnect(B))}$=null,U=null,g.reset();for(let K in m)delete m[K];e.setRenderTarget(E),f=null,h=null,d=null,s=null,S=null,Qe.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",V),s.addEventListener("inputsourceschange",Q),M.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(P),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,he=null,me=null;M.depth&&(me=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=M.stencil?ia:Br,he=M.stencil?na:gs);let Ke={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ke),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new pi(h.textureWidth,h.textureHeight,{format:Nn,type:oi,depthTexture:new ao(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let Z={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new pi(f.framebufferWidth,f.framebufferHeight,{format:Nn,type:oi,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Qe.setContext(s),Qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(K){for(let B=0;B<K.removed.length;B++){let Z=K.removed[B],he=C.indexOf(Z);he>=0&&(C[he]=null,R[he].disconnect(Z))}for(let B=0;B<K.added.length;B++){let Z=K.added[B],he=C.indexOf(Z);if(he===-1){for(let Ke=0;Ke<R.length;Ke++)if(Ke>=C.length){C.push(Z),he=Ke;break}else if(C[Ke]===null){C[Ke]=Z,he=Ke;break}if(he===-1)break}let me=R[he];me&&me.connect(Z)}}let j=new L,oe=new L;function de(K,B,Z){j.setFromMatrixPosition(B.matrixWorld),oe.setFromMatrixPosition(Z.matrixWorld);let he=j.distanceTo(oe),me=B.projectionMatrix.elements,Ke=Z.projectionMatrix.elements,Jt=me[14]/(me[10]-1),I=me[14]/(me[10]+1),vt=(me[9]+1)/me[5],Ve=(me[9]-1)/me[5],De=(me[8]-1)/me[0],_e=(Ke[8]+1)/Ke[0],yt=Jt*De,Se=Jt*_e,qe=he/(-De+_e),$t=qe*-De;if(B.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX($t),K.translateZ(qe),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),me[10]===-1)K.projectionMatrix.copy(B.projectionMatrix),K.projectionMatrixInverse.copy(B.projectionMatrixInverse);else{let wt=Jt+qe,T=I+qe,x=yt-$t,H=Se+(he-$t),Y=vt*I/T*wt,ee=Ve*I/T*wt;K.projectionMatrix.makePerspective(x,H,Y,ee,wt,T),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function xe(K,B){B===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(B.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let B=K.near,Z=K.far;g.texture!==null&&(g.depthNear>0&&(B=g.depthNear),g.depthFar>0&&(Z=g.depthFar)),O.near=b.near=w.near=B,O.far=b.far=w.far=Z,($!==O.near||U!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),$=O.near,U=O.far),O.layers.mask=K.layers.mask|6,w.layers.mask=O.layers.mask&3,b.layers.mask=O.layers.mask&5;let he=K.parent,me=O.cameras;xe(O,he);for(let Ke=0;Ke<me.length;Ke++)xe(me[Ke],he);me.length===2?de(O,w,b):O.projectionMatrix.copy(w.projectionMatrix),$e(K,O,he)};function $e(K,B,Z){Z===null?K.matrix.copy(B.matrixWorld):(K.matrix.copy(Z.matrixWorld),K.matrix.invert(),K.matrix.multiply(B.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(B.projectionMatrix),K.projectionMatrixInverse.copy(B.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=zs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(K){return m[K]};let it=null;function ut(K,B){if(u=B.getViewerPose(c||a),v=B,u!==null){let Z=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let he=!1;Z.length!==O.cameras.length&&(O.cameras.length=0,he=!0);for(let I=0;I<Z.length;I++){let vt=Z[I],Ve=null;if(f!==null)Ve=f.getViewport(vt);else{let _e=d.getViewSubImage(h,vt);Ve=_e.viewport,I===0&&(e.setRenderTargetTextures(S,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(S))}let De=A[I];De===void 0&&(De=new Ct,De.layers.enable(I),De.viewport=new tt,A[I]=De),De.matrix.fromArray(vt.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(vt.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),I===0&&(O.matrix.copy(De.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),he===!0&&O.cameras.push(De)}let me=s.enabledFeatures;if(me&&me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let I=d.getDepthInformation(Z[0]);I&&I.isValid&&I.texture&&g.init(I,s.renderState)}if(me&&me.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let I=0;I<Z.length;I++){let vt=Z[I].camera;if(vt){let Ve=m[vt];Ve||(Ve=new oo,m[vt]=Ve);let De=d.getCameraImage(vt);Ve.sourceTexture=De}}}}for(let Z=0;Z<R.length;Z++){let he=C[Z],me=R[Z];he!==null&&me!==void 0&&me.update(he,B,c||a)}it&&it(K,B),B.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:B}),v=null}let Qe=new _v;Qe.setAnimationLoop(ut),this.setAnimationLoop=function(K){it=K},this.dispose=function(){}}},ir=new Gn,nM=new He;function iM(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Sh(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,E,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,S)):m.isMeshMatcapMaterial?(r(g,m),v(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),y(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,M,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Xt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Xt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let M=e.get(m),E=M.envMap,S=M.envMapRotation;E&&(g.envMap.value=E,ir.copy(S),ir.x*=-1,ir.y*=-1,ir.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ir.y*=-1,ir.z*=-1),g.envMapRotation.value.setFromMatrix4(nM.makeRotationFromEuler(ir)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function sM(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){let S=E.program;i.uniformBlockBinding(M,S)}function c(M,E){let S=s[M.id];S===void 0&&(v(M),S=u(M),s[M.id]=S,M.addEventListener("dispose",g));let R=E.program;i.updateUBOMapping(M,R);let C=e.render.frame;r[M.id]!==C&&(h(M),r[M.id]=C)}function u(M){let E=d();M.__bindingPointIndex=E;let S=n.createBuffer(),R=M.__size,C=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,R,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let E=s[M.id],S=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let C=0,P=S.length;C<P;C++){let D=Array.isArray(S[C])?S[C]:[S[C]];for(let w=0,b=D.length;w<b;w++){let A=D[w];if(f(A,C,w,R)===!0){let O=A.__offset,$=Array.isArray(A.value)?A.value:[A.value],U=0;for(let q=0;q<$.length;q++){let V=$[q],Q=y(V);typeof V=="number"||typeof V=="boolean"?(A.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,O+U,A.__data)):V.isMatrix3?(A.__data[0]=V.elements[0],A.__data[1]=V.elements[1],A.__data[2]=V.elements[2],A.__data[3]=0,A.__data[4]=V.elements[3],A.__data[5]=V.elements[4],A.__data[6]=V.elements[5],A.__data[7]=0,A.__data[8]=V.elements[6],A.__data[9]=V.elements[7],A.__data[10]=V.elements[8],A.__data[11]=0):(V.toArray(A.__data,U),U+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,E,S,R){let C=M.value,P=E+"_"+S;if(R[P]===void 0)return typeof C=="number"||typeof C=="boolean"?R[P]=C:R[P]=C.clone(),!0;{let D=R[P];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return R[P]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function v(M){let E=M.uniforms,S=0,R=16;for(let P=0,D=E.length;P<D;P++){let w=Array.isArray(E[P])?E[P]:[E[P]];for(let b=0,A=w.length;b<A;b++){let O=w[b],$=Array.isArray(O.value)?O.value:[O.value];for(let U=0,q=$.length;U<q;U++){let V=$[U],Q=y(V),j=S%R,oe=j%Q.boundary,de=j+oe;S+=oe,de!==0&&R-de<Q.storage&&(S+=R-de),O.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=Q.storage}}}let C=S%R;return C>0&&(S+=R-C),M.__size=S,M.__cache={},this}function y(M){let E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function g(M){let E=M.target;E.removeEventListener("dispose",g);let S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}var cu=class{constructor(e={}){let{canvas:t=qg(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;let v=new Uint32Array(4),y=new Int32Array(4),g=null,m=null,M=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,R=!1;this._outputColorSpace=Et;let C=0,P=0,D=null,w=-1,b=null,A=new tt,O=new tt,$=null,U=new Pe(0),q=0,V=t.width,Q=t.height,j=1,oe=null,de=null,xe=new tt(0,0,V,Q),$e=new tt(0,0,V,Q),it=!1,ut=new Xr,Qe=!1,K=!1,B=new He,Z=new L,he=new tt,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ke=!1;function Jt(){return D===null?j:1}let I=i;function vt(_,k){return t.getContext(_,k)}try{let _={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",te,!1),I===null){let k="webgl2";if(I=vt(k,_),I===null)throw vt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let Ve,De,_e,yt,Se,qe,$t,wt,T,x,H,Y,ee,X,Ae,re,we,Ee,ie,pe,Ne,Me,ce,Ge;function N(){Ve=new Sw(I),Ve.init(),Me=new QE(I,Ve),De=new mw(I,Ve,e,Me),_e=new JE(I,Ve),De.reversedDepthBuffer&&h&&_e.buffers.depth.setReversed(!0),yt=new Mw(I),Se=new FE,qe=new ZE(I,Ve,_e,Se,De,Me,yt),$t=new vw(S),wt=new _w(S),T=new P0(I),ce=new pw(I,T),x=new ww(I,T,yt,ce),H=new Aw(I,x,T,yt),ie=new Tw(I,De,qe),re=new gw(Se),Y=new UE(S,$t,wt,Ve,De,ce,re),ee=new iM(S,Se),X=new $E,Ae=new qE(Ve),Ee=new hw(S,$t,wt,_e,H,f,l),we=new YE(S,H,De),Ge=new sM(I,yt,De,_e),pe=new fw(I,Ve,yt),Ne=new Ew(I,Ve,yt),yt.programs=Y.programs,S.capabilities=De,S.extensions=Ve,S.properties=Se,S.renderLists=X,S.shadowMap=we,S.state=_e,S.info=yt}N();let se=new Bh(S,I);this.xr=se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let _=Ve.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Ve.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(_){_!==void 0&&(j=_,this.setSize(V,Q,!1))},this.getSize=function(_){return _.set(V,Q)},this.setSize=function(_,k,G=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=_,Q=k,t.width=Math.floor(_*j),t.height=Math.floor(k*j),G===!0&&(t.style.width=_+"px",t.style.height=k+"px"),this.setViewport(0,0,_,k)},this.getDrawingBufferSize=function(_){return _.set(V*j,Q*j).floor()},this.setDrawingBufferSize=function(_,k,G){V=_,Q=k,j=G,t.width=Math.floor(_*G),t.height=Math.floor(k*G),this.setViewport(0,0,_,k)},this.getCurrentViewport=function(_){return _.copy(A)},this.getViewport=function(_){return _.copy(xe)},this.setViewport=function(_,k,G,W){_.isVector4?xe.set(_.x,_.y,_.z,_.w):xe.set(_,k,G,W),_e.viewport(A.copy(xe).multiplyScalar(j).round())},this.getScissor=function(_){return _.copy($e)},this.setScissor=function(_,k,G,W){_.isVector4?$e.set(_.x,_.y,_.z,_.w):$e.set(_,k,G,W),_e.scissor(O.copy($e).multiplyScalar(j).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(_){_e.setScissorTest(it=_)},this.setOpaqueSort=function(_){oe=_},this.setTransparentSort=function(_){de=_},this.getClearColor=function(_){return _.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(_=!0,k=!0,G=!0){let W=0;if(_){let F=!1;if(D!==null){let ne=D.texture.format;F=ne===Rc||ne===Cc||ne===Ac}if(F){let ne=D.texture.type,ue=ne===oi||ne===gs||ne===ea||ne===na||ne===Ec||ne===Mc,ye=Ee.getClearColor(),fe=Ee.getClearAlpha(),Le=ye.r,Oe=ye.g,Re=ye.b;ue?(v[0]=Le,v[1]=Oe,v[2]=Re,v[3]=fe,I.clearBufferuiv(I.COLOR,0,v)):(y[0]=Le,y[1]=Oe,y[2]=Re,y[3]=fe,I.clearBufferiv(I.COLOR,0,y))}else W|=I.COLOR_BUFFER_BIT}k&&(W|=I.DEPTH_BUFFER_BIT),G&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",te,!1),Ee.dispose(),X.dispose(),Ae.dispose(),Se.dispose(),$t.dispose(),wt.dispose(),H.dispose(),ce.dispose(),Ge.dispose(),Y.dispose(),se.dispose(),se.removeEventListener("sessionstart",ui),se.removeEventListener("sessionend",hm),Is.stop()};function ae(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let _=yt.autoReset,k=we.enabled,G=we.autoUpdate,W=we.needsUpdate,F=we.type;N(),yt.autoReset=_,we.enabled=k,we.autoUpdate=G,we.needsUpdate=W,we.type=F}function te(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function J(_){let k=_.target;k.removeEventListener("dispose",J),be(k)}function be(_){Fe(_),Se.remove(_)}function Fe(_){let k=Se.get(_).programs;k!==void 0&&(k.forEach(function(G){Y.releaseProgram(G)}),_.isShaderMaterial&&Y.releaseShaderCache(_))}this.renderBufferDirect=function(_,k,G,W,F,ne){k===null&&(k=me);let ue=F.isMesh&&F.matrixWorld.determinant()<0,ye=_x(_,k,G,W,F);_e.setMaterial(W,ue);let fe=G.index,Le=1;if(W.wireframe===!0){if(fe=x.getWireframeAttribute(G),fe===void 0)return;Le=2}let Oe=G.drawRange,Re=G.attributes.position,Je=Oe.start*Le,ot=(Oe.start+Oe.count)*Le;ne!==null&&(Je=Math.max(Je,ne.start*Le),ot=Math.min(ot,(ne.start+ne.count)*Le)),fe!==null?(Je=Math.max(Je,0),ot=Math.min(ot,fe.count)):Re!=null&&(Je=Math.max(Je,0),ot=Math.min(ot,Re.count));let _t=ot-Je;if(_t<0||_t===1/0)return;ce.setup(F,W,ye,G,fe);let mt,dt=pe;if(fe!==null&&(mt=T.get(fe),dt=Ne,dt.setIndex(mt)),F.isMesh)W.wireframe===!0?(_e.setLineWidth(W.wireframeLinewidth*Jt()),dt.setMode(I.LINES)):dt.setMode(I.TRIANGLES);else if(F.isLine){let Ie=W.linewidth;Ie===void 0&&(Ie=1),_e.setLineWidth(Ie*Jt()),F.isLineSegments?dt.setMode(I.LINES):F.isLineLoop?dt.setMode(I.LINE_LOOP):dt.setMode(I.LINE_STRIP)}else F.isPoints?dt.setMode(I.POINTS):F.isSprite&&dt.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Vr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))dt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ie=F._multiDrawStarts,bt=F._multiDrawCounts,et=F._multiDrawCount,Cn=fe?T.get(fe).bytesPerElement:1,Sr=Se.get(W).currentProgram.getUniforms();for(let Rn=0;Rn<et;Rn++)Sr.setValue(I,"_gl_DrawID",Rn),dt.render(Ie[Rn]/Cn,bt[Rn])}else if(F.isInstancedMesh)dt.renderInstances(Je,_t,F.count);else if(G.isInstancedBufferGeometry){let Ie=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,bt=Math.min(G.instanceCount,Ie);dt.renderInstances(Je,_t,bt)}else dt.render(Je,_t)};function pt(_,k,G){_.transparent===!0&&_.side===_n&&_.forceSinglePass===!1?(_.side=Xt,_.needsUpdate=!0,bl(_,k,G),_.side=ii,_.needsUpdate=!0,bl(_,k,G),_.side=_n):bl(_,k,G)}this.compile=function(_,k,G=null){G===null&&(G=_),m=Ae.get(G),m.init(k),E.push(m),G.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),_!==G&&_.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();let W=new Set;return _.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ne=F.material;if(ne)if(Array.isArray(ne))for(let ue=0;ue<ne.length;ue++){let ye=ne[ue];pt(ye,G,F),W.add(ye)}else pt(ne,G,F),W.add(ne)}),m=E.pop(),W},this.compileAsync=function(_,k,G=null){let W=this.compile(_,k,G);return new Promise(F=>{function ne(){if(W.forEach(function(ue){Se.get(ue).currentProgram.isReady()&&W.delete(ue)}),W.size===0){F(_);return}setTimeout(ne,10)}Ve.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let nt=null;function Ni(_){nt&&nt(_)}function ui(){Is.stop()}function hm(){Is.start()}let Is=new _v;Is.setAnimationLoop(Ni),typeof self<"u"&&Is.setContext(self),this.setAnimationLoop=function(_){nt=_,se.setAnimationLoop(_),_===null?Is.stop():Is.start()},se.addEventListener("sessionstart",ui),se.addEventListener("sessionend",hm),this.render=function(_,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(k),k=se.getCamera()),_.isScene===!0&&_.onBeforeRender(S,_,k,D),m=Ae.get(_,E.length),m.init(k),E.push(m),B.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ut.setFromProjectionMatrix(B,ei,k.reversedDepth),K=this.localClippingEnabled,Qe=re.init(this.clippingPlanes,K),g=X.get(_,M.length),g.init(),M.push(g),se.enabled===!0&&se.isPresenting===!0){let ne=S.xr.getDepthSensingMesh();ne!==null&&yd(ne,k,-1/0,S.sortObjects)}yd(_,k,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(oe,de),Ke=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ke&&Ee.addToRenderList(g,_),this.info.render.frame++,Qe===!0&&re.beginShadows();let G=m.state.shadowsArray;we.render(G,_,k),Qe===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=g.opaque,F=g.transmissive;if(m.setupLights(),k.isArrayCamera){let ne=k.cameras;if(F.length>0)for(let ue=0,ye=ne.length;ue<ye;ue++){let fe=ne[ue];fm(W,F,_,fe)}Ke&&Ee.render(_);for(let ue=0,ye=ne.length;ue<ye;ue++){let fe=ne[ue];pm(g,_,fe,fe.viewport)}}else F.length>0&&fm(W,F,_,k),Ke&&Ee.render(_),pm(g,_,k);D!==null&&P===0&&(qe.updateMultisampleRenderTarget(D),qe.updateRenderTargetMipmap(D)),_.isScene===!0&&_.onAfterRender(S,_,k),ce.resetDefaultState(),w=-1,b=null,E.pop(),E.length>0?(m=E[E.length-1],Qe===!0&&re.setGlobalState(S.clippingPlanes,m.state.camera)):m=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function yd(_,k,G,W){if(_.visible===!1)return;if(_.layers.test(k.layers)){if(_.isGroup)G=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(k);else if(_.isLight)m.pushLight(_),_.castShadow&&m.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||ut.intersectsSprite(_)){W&&he.setFromMatrixPosition(_.matrixWorld).applyMatrix4(B);let ue=H.update(_),ye=_.material;ye.visible&&g.push(_,ue,ye,G,he.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||ut.intersectsObject(_))){let ue=H.update(_),ye=_.material;if(W&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),he.copy(_.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),he.copy(ue.boundingSphere.center)),he.applyMatrix4(_.matrixWorld).applyMatrix4(B)),Array.isArray(ye)){let fe=ue.groups;for(let Le=0,Oe=fe.length;Le<Oe;Le++){let Re=fe[Le],Je=ye[Re.materialIndex];Je&&Je.visible&&g.push(_,ue,Je,G,he.z,Re)}}else ye.visible&&g.push(_,ue,ye,G,he.z,null)}}let ne=_.children;for(let ue=0,ye=ne.length;ue<ye;ue++)yd(ne[ue],k,G,W)}function pm(_,k,G,W){let F=_.opaque,ne=_.transmissive,ue=_.transparent;m.setupLightsView(G),Qe===!0&&re.setGlobalState(S.clippingPlanes,G),W&&_e.viewport(A.copy(W)),F.length>0&&yl(F,k,G),ne.length>0&&yl(ne,k,G),ue.length>0&&yl(ue,k,G),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function fm(_,k,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new pi(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?ta:oi,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));let ne=m.state.transmissionRenderTarget[W.id],ue=W.viewport||A;ne.setSize(ue.z*S.transmissionResolutionScale,ue.w*S.transmissionResolutionScale);let ye=S.getRenderTarget(),fe=S.getActiveCubeFace(),Le=S.getActiveMipmapLevel();S.setRenderTarget(ne),S.getClearColor(U),q=S.getClearAlpha(),q<1&&S.setClearColor(16777215,.5),S.clear(),Ke&&Ee.render(G);let Oe=S.toneMapping;S.toneMapping=qi;let Re=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),Qe===!0&&re.setGlobalState(S.clippingPlanes,W),yl(_,G,W),qe.updateMultisampleRenderTarget(ne),qe.updateRenderTargetMipmap(ne),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let ot=0,_t=k.length;ot<_t;ot++){let mt=k[ot],dt=mt.object,Ie=mt.geometry,bt=mt.material,et=mt.group;if(bt.side===_n&&dt.layers.test(W.layers)){let Cn=bt.side;bt.side=Xt,bt.needsUpdate=!0,mm(dt,G,W,Ie,bt,et),bt.side=Cn,bt.needsUpdate=!0,Je=!0}}Je===!0&&(qe.updateMultisampleRenderTarget(ne),qe.updateRenderTargetMipmap(ne))}S.setRenderTarget(ye,fe,Le),S.setClearColor(U,q),Re!==void 0&&(W.viewport=Re),S.toneMapping=Oe}function yl(_,k,G){let W=k.isScene===!0?k.overrideMaterial:null;for(let F=0,ne=_.length;F<ne;F++){let ue=_[F],ye=ue.object,fe=ue.geometry,Le=ue.group,Oe=ue.material;Oe.allowOverride===!0&&W!==null&&(Oe=W),ye.layers.test(G.layers)&&mm(ye,k,G,fe,Oe,Le)}}function mm(_,k,G,W,F,ne){_.onBeforeRender(S,k,G,W,F,ne),_.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),F.onBeforeRender(S,k,G,W,_,ne),F.transparent===!0&&F.side===_n&&F.forceSinglePass===!1?(F.side=Xt,F.needsUpdate=!0,S.renderBufferDirect(G,k,W,F,_,ne),F.side=ii,F.needsUpdate=!0,S.renderBufferDirect(G,k,W,F,_,ne),F.side=_n):S.renderBufferDirect(G,k,W,F,_,ne),_.onAfterRender(S,k,G,W,F,ne)}function bl(_,k,G){k.isScene!==!0&&(k=me);let W=Se.get(_),F=m.state.lights,ne=m.state.shadowsArray,ue=F.state.version,ye=Y.getParameters(_,F.state,ne,k,G),fe=Y.getProgramCacheKey(ye),Le=W.programs;W.environment=_.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(_.isMeshStandardMaterial?wt:$t).get(_.envMap||W.environment),W.envMapRotation=W.environment!==null&&_.envMap===null?k.environmentRotation:_.envMapRotation,Le===void 0&&(_.addEventListener("dispose",J),Le=new Map,W.programs=Le);let Oe=Le.get(fe);if(Oe!==void 0){if(W.currentProgram===Oe&&W.lightsStateVersion===ue)return vm(_,ye),Oe}else ye.uniforms=Y.getUniforms(_),_.onBeforeCompile(ye,S),Oe=Y.acquireProgram(ye,fe),Le.set(fe,Oe),W.uniforms=ye.uniforms;let Re=W.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Re.clippingPlanes=re.uniform),vm(_,ye),W.needsLights=wx(_),W.lightsStateVersion=ue,W.needsLights&&(Re.ambientLightColor.value=F.state.ambient,Re.lightProbe.value=F.state.probe,Re.directionalLights.value=F.state.directional,Re.directionalLightShadows.value=F.state.directionalShadow,Re.spotLights.value=F.state.spot,Re.spotLightShadows.value=F.state.spotShadow,Re.rectAreaLights.value=F.state.rectArea,Re.ltc_1.value=F.state.rectAreaLTC1,Re.ltc_2.value=F.state.rectAreaLTC2,Re.pointLights.value=F.state.point,Re.pointLightShadows.value=F.state.pointShadow,Re.hemisphereLights.value=F.state.hemi,Re.directionalShadowMap.value=F.state.directionalShadowMap,Re.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Re.spotShadowMap.value=F.state.spotShadowMap,Re.spotLightMatrix.value=F.state.spotLightMatrix,Re.spotLightMap.value=F.state.spotLightMap,Re.pointShadowMap.value=F.state.pointShadowMap,Re.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Oe,W.uniformsList=null,Oe}function gm(_){if(_.uniformsList===null){let k=_.currentProgram.getUniforms();_.uniformsList=oa.seqWithValue(k.seq,_.uniforms)}return _.uniformsList}function vm(_,k){let G=Se.get(_);G.outputColorSpace=k.outputColorSpace,G.batching=k.batching,G.batchingColor=k.batchingColor,G.instancing=k.instancing,G.instancingColor=k.instancingColor,G.instancingMorph=k.instancingMorph,G.skinning=k.skinning,G.morphTargets=k.morphTargets,G.morphNormals=k.morphNormals,G.morphColors=k.morphColors,G.morphTargetsCount=k.morphTargetsCount,G.numClippingPlanes=k.numClippingPlanes,G.numIntersection=k.numClipIntersection,G.vertexAlphas=k.vertexAlphas,G.vertexTangents=k.vertexTangents,G.toneMapping=k.toneMapping}function _x(_,k,G,W,F){k.isScene!==!0&&(k=me),qe.resetTextureUnits();let ne=k.fog,ue=W.isMeshStandardMaterial?k.environment:null,ye=D===null?S.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:jt,fe=(W.isMeshStandardMaterial?wt:$t).get(W.envMap||ue),Le=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Oe=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Re=!!G.morphAttributes.position,Je=!!G.morphAttributes.normal,ot=!!G.morphAttributes.color,_t=qi;W.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(_t=S.toneMapping);let mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,dt=mt!==void 0?mt.length:0,Ie=Se.get(W),bt=m.state.lights;if(Qe===!0&&(K===!0||_!==b)){let sn=_===b&&W.id===w;re.setState(W,_,sn)}let et=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==bt.state.version||Ie.outputColorSpace!==ye||F.isBatchedMesh&&Ie.batching===!1||!F.isBatchedMesh&&Ie.batching===!0||F.isBatchedMesh&&Ie.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ie.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ie.instancing===!1||!F.isInstancedMesh&&Ie.instancing===!0||F.isSkinnedMesh&&Ie.skinning===!1||!F.isSkinnedMesh&&Ie.skinning===!0||F.isInstancedMesh&&Ie.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ie.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ie.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ie.instancingMorph===!1&&F.morphTexture!==null||Ie.envMap!==fe||W.fog===!0&&Ie.fog!==ne||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==re.numPlanes||Ie.numIntersection!==re.numIntersection)||Ie.vertexAlphas!==Le||Ie.vertexTangents!==Oe||Ie.morphTargets!==Re||Ie.morphNormals!==Je||Ie.morphColors!==ot||Ie.toneMapping!==_t||Ie.morphTargetsCount!==dt)&&(et=!0):(et=!0,Ie.__version=W.version);let Cn=Ie.currentProgram;et===!0&&(Cn=bl(W,k,F));let Sr=!1,Rn=!1,Na=!1,xt=Cn.getUniforms(),$n=Ie.uniforms;if(_e.useProgram(Cn.program)&&(Sr=!0,Rn=!0,Na=!0),W.id!==w&&(w=W.id,Rn=!0),Sr||b!==_){_e.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),xt.setValue(I,"projectionMatrix",_.projectionMatrix),xt.setValue(I,"viewMatrix",_.matrixWorldInverse);let vn=xt.map.cameraPosition;vn!==void 0&&vn.setValue(I,Z.setFromMatrixPosition(_.matrixWorld)),De.logarithmicDepthBuffer&&xt.setValue(I,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xt.setValue(I,"isOrthographic",_.isOrthographicCamera===!0),b!==_&&(b=_,Rn=!0,Na=!0)}if(F.isSkinnedMesh){xt.setOptional(I,F,"bindMatrix"),xt.setOptional(I,F,"bindMatrixInverse");let sn=F.skeleton;sn&&(sn.boneTexture===null&&sn.computeBoneTexture(),xt.setValue(I,"boneTexture",sn.boneTexture,qe))}F.isBatchedMesh&&(xt.setOptional(I,F,"batchingTexture"),xt.setValue(I,"batchingTexture",F._matricesTexture,qe),xt.setOptional(I,F,"batchingIdTexture"),xt.setValue(I,"batchingIdTexture",F._indirectTexture,qe),xt.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&xt.setValue(I,"batchingColorTexture",F._colorsTexture,qe));let Vn=G.morphAttributes;if((Vn.position!==void 0||Vn.normal!==void 0||Vn.color!==void 0)&&ie.update(F,G,Cn),(Rn||Ie.receiveShadow!==F.receiveShadow)&&(Ie.receiveShadow=F.receiveShadow,xt.setValue(I,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&($n.envMap.value=fe,$n.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&($n.envMapIntensity.value=k.environmentIntensity),Rn&&(xt.setValue(I,"toneMappingExposure",S.toneMappingExposure),Ie.needsLights&&Sx($n,Na),ne&&W.fog===!0&&ee.refreshFogUniforms($n,ne),ee.refreshMaterialUniforms($n,W,j,Q,m.state.transmissionRenderTarget[_.id]),oa.upload(I,gm(Ie),$n,qe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(oa.upload(I,gm(Ie),$n,qe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xt.setValue(I,"center",F.center),xt.setValue(I,"modelViewMatrix",F.modelViewMatrix),xt.setValue(I,"normalMatrix",F.normalMatrix),xt.setValue(I,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let sn=W.uniformsGroups;for(let vn=0,bd=sn.length;vn<bd;vn++){let Ps=sn[vn];Ge.update(Ps,Cn),Ge.bind(Ps,Cn)}}return Cn}function Sx(_,k){_.ambientLightColor.needsUpdate=k,_.lightProbe.needsUpdate=k,_.directionalLights.needsUpdate=k,_.directionalLightShadows.needsUpdate=k,_.pointLights.needsUpdate=k,_.pointLightShadows.needsUpdate=k,_.spotLights.needsUpdate=k,_.spotLightShadows.needsUpdate=k,_.rectAreaLights.needsUpdate=k,_.hemisphereLights.needsUpdate=k}function wx(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(_,k,G){let W=Se.get(_);W.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Se.get(_.texture).__webglTexture=k,Se.get(_.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,k){let G=Se.get(_);G.__webglFramebuffer=k,G.__useDefaultFramebuffer=k===void 0};let Ex=I.createFramebuffer();this.setRenderTarget=function(_,k=0,G=0){D=_,C=k,P=G;let W=!0,F=null,ne=!1,ue=!1;if(_){let fe=Se.get(_);if(fe.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(fe.__webglFramebuffer===void 0)qe.setupRenderTarget(_);else if(fe.__hasExternalTextures)qe.rebindTextures(_,Se.get(_.texture).__webglTexture,Se.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Re=_.depthTexture;if(fe.__boundDepthTexture!==Re){if(Re!==null&&Se.has(Re)&&(_.width!==Re.image.width||_.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");qe.setupDepthRenderbuffer(_)}}let Le=_.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ue=!0);let Oe=Se.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Oe[k])?F=Oe[k][G]:F=Oe[k],ne=!0):_.samples>0&&qe.useMultisampledRTT(_)===!1?F=Se.get(_).__webglMultisampledFramebuffer:Array.isArray(Oe)?F=Oe[G]:F=Oe,A.copy(_.viewport),O.copy(_.scissor),$=_.scissorTest}else A.copy(xe).multiplyScalar(j).floor(),O.copy($e).multiplyScalar(j).floor(),$=it;if(G!==0&&(F=Ex),_e.bindFramebuffer(I.FRAMEBUFFER,F)&&W&&_e.drawBuffers(_,F),_e.viewport(A),_e.scissor(O),_e.setScissorTest($),ne){let fe=Se.get(_.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+k,fe.__webglTexture,G)}else if(ue){let fe=k;for(let Le=0;Le<_.textures.length;Le++){let Oe=Se.get(_.textures[Le]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Le,Oe.__webglTexture,G,fe)}}else if(_!==null&&G!==0){let fe=Se.get(_.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,fe.__webglTexture,G)}w=-1},this.readRenderTargetPixels=function(_,k,G,W,F,ne,ue,ye=0){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=Se.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){_e.bindFramebuffer(I.FRAMEBUFFER,fe);try{let Le=_.textures[ye],Oe=Le.format,Re=Le.type;if(!De.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=_.width-W&&G>=0&&G<=_.height-F&&(_.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ye),I.readPixels(k,G,W,F,Me.convert(Oe),Me.convert(Re),ne))}finally{let Le=D!==null?Se.get(D).__webglFramebuffer:null;_e.bindFramebuffer(I.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(_,k,G,W,F,ne,ue,ye=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=Se.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(k>=0&&k<=_.width-W&&G>=0&&G<=_.height-F){_e.bindFramebuffer(I.FRAMEBUFFER,fe);let Le=_.textures[ye],Oe=Le.format,Re=Le.type;if(!De.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Je=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Je),I.bufferData(I.PIXEL_PACK_BUFFER,ne.byteLength,I.STREAM_READ),_.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ye),I.readPixels(k,G,W,F,Me.convert(Oe),Me.convert(Re),0);let ot=D!==null?Se.get(D).__webglFramebuffer:null;_e.bindFramebuffer(I.FRAMEBUFFER,ot);let _t=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await jg(I,_t,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Je),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ne),I.deleteBuffer(Je),I.deleteSync(_t),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,k=null,G=0){let W=Math.pow(2,-G),F=Math.floor(_.image.width*W),ne=Math.floor(_.image.height*W),ue=k!==null?k.x:0,ye=k!==null?k.y:0;qe.setTexture2D(_,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,ue,ye,F,ne),_e.unbindTexture()};let Mx=I.createFramebuffer(),Tx=I.createFramebuffer();this.copyTextureToTexture=function(_,k,G=null,W=null,F=0,ne=null){ne===null&&(F!==0?(Vr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=F,F=0):ne=0);let ue,ye,fe,Le,Oe,Re,Je,ot,_t,mt=_.isCompressedTexture?_.mipmaps[ne]:_.image;if(G!==null)ue=G.max.x-G.min.x,ye=G.max.y-G.min.y,fe=G.isBox3?G.max.z-G.min.z:1,Le=G.min.x,Oe=G.min.y,Re=G.isBox3?G.min.z:0;else{let Vn=Math.pow(2,-F);ue=Math.floor(mt.width*Vn),ye=Math.floor(mt.height*Vn),_.isDataArrayTexture?fe=mt.depth:_.isData3DTexture?fe=Math.floor(mt.depth*Vn):fe=1,Le=0,Oe=0,Re=0}W!==null?(Je=W.x,ot=W.y,_t=W.z):(Je=0,ot=0,_t=0);let dt=Me.convert(k.format),Ie=Me.convert(k.type),bt;k.isData3DTexture?(qe.setTexture3D(k,0),bt=I.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(qe.setTexture2DArray(k,0),bt=I.TEXTURE_2D_ARRAY):(qe.setTexture2D(k,0),bt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);let et=I.getParameter(I.UNPACK_ROW_LENGTH),Cn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Sr=I.getParameter(I.UNPACK_SKIP_PIXELS),Rn=I.getParameter(I.UNPACK_SKIP_ROWS),Na=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,mt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,mt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Le),I.pixelStorei(I.UNPACK_SKIP_ROWS,Oe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Re);let xt=_.isDataArrayTexture||_.isData3DTexture,$n=k.isDataArrayTexture||k.isData3DTexture;if(_.isDepthTexture){let Vn=Se.get(_),sn=Se.get(k),vn=Se.get(Vn.__renderTarget),bd=Se.get(sn.__renderTarget);_e.bindFramebuffer(I.READ_FRAMEBUFFER,vn.__webglFramebuffer),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,bd.__webglFramebuffer);for(let Ps=0;Ps<fe;Ps++)xt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Se.get(_).__webglTexture,F,Re+Ps),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Se.get(k).__webglTexture,ne,_t+Ps)),I.blitFramebuffer(Le,Oe,ue,ye,Je,ot,ue,ye,I.DEPTH_BUFFER_BIT,I.NEAREST);_e.bindFramebuffer(I.READ_FRAMEBUFFER,null),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||_.isRenderTargetTexture||Se.has(_)){let Vn=Se.get(_),sn=Se.get(k);_e.bindFramebuffer(I.READ_FRAMEBUFFER,Mx),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,Tx);for(let vn=0;vn<fe;vn++)xt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Vn.__webglTexture,F,Re+vn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Vn.__webglTexture,F),$n?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,sn.__webglTexture,ne,_t+vn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,sn.__webglTexture,ne),F!==0?I.blitFramebuffer(Le,Oe,ue,ye,Je,ot,ue,ye,I.COLOR_BUFFER_BIT,I.NEAREST):$n?I.copyTexSubImage3D(bt,ne,Je,ot,_t+vn,Le,Oe,ue,ye):I.copyTexSubImage2D(bt,ne,Je,ot,Le,Oe,ue,ye);_e.bindFramebuffer(I.READ_FRAMEBUFFER,null),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else $n?_.isDataTexture||_.isData3DTexture?I.texSubImage3D(bt,ne,Je,ot,_t,ue,ye,fe,dt,Ie,mt.data):k.isCompressedArrayTexture?I.compressedTexSubImage3D(bt,ne,Je,ot,_t,ue,ye,fe,dt,mt.data):I.texSubImage3D(bt,ne,Je,ot,_t,ue,ye,fe,dt,Ie,mt):_.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ne,Je,ot,ue,ye,dt,Ie,mt.data):_.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ne,Je,ot,mt.width,mt.height,dt,mt.data):I.texSubImage2D(I.TEXTURE_2D,ne,Je,ot,ue,ye,dt,Ie,mt);I.pixelStorei(I.UNPACK_ROW_LENGTH,et),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Cn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Sr),I.pixelStorei(I.UNPACK_SKIP_ROWS,Rn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Na),ne===0&&k.generateMipmaps&&I.generateMipmap(bt),_e.unbindTexture()},this.initRenderTarget=function(_){Se.get(_).__webglFramebuffer===void 0&&qe.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?qe.setTextureCube(_,0):_.isData3DTexture?qe.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?qe.setTexture2DArray(_,0):qe.setTexture2D(_,0),_e.unbindTexture()},this.resetState=function(){C=0,P=0,D=null,_e.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};function Vh(n,e){if(e===vh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===sa||e===Ao){let t=n.getIndex();if(t===null){let a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,s=[];if(e===sa)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}var du=class extends bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Xh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new sp(t)}),this.register(function(t){return new rp(t)}),this.register(function(t){return new ap(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new ep(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new tp(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new ip(t)}),this.register(function(t){return new np(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new op(t)}),this.register(function(t){return new lp(t)})}load(e,t,i,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Gi.extractUrlBase(e);a=Gi.resolveURL(c,this.path)}else a=Gi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Jr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Iv){try{a[Ye.KHR_BINARY_GLTF]=new cp(e)}catch(d){s&&s(d);return}r=JSON.parse(a[Ye.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new gp(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case Ye.KHR_MATERIALS_UNLIT:a[d]=new qh;break;case Ye.KHR_DRACO_MESH_COMPRESSION:a[d]=new up(r,this.dracoLoader);break;case Ye.KHR_TEXTURE_TRANSFORM:a[d]=new dp;break;case Ye.KHR_MESH_QUANTIZATION:a[d]=new hp;break;default:h.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){let i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}};function aM(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}var Ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Wh=class{constructor(e){this.parser=e,this.name=Ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,s=t.cache.get(i);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new Pe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],jt);let d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ps(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ks(u),c.distance=d;break;case"spot":c=new vo(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Si(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}},qh=class{constructor(){this.name=Ye.KHR_MATERIALS_UNLIT}getMaterialType(){return ln}extendParams(e,t,i){let s=[];e.color=new Pe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],jt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,Et))}return Promise.all(s)}},jh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Xh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ce(o,o)}return Promise.all(r)}},Yh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_DISPERSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Kh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},Jh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Pe(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],jt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Et)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},Zh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},Qh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Pe().setRGB(o[0],o[1],o[2],jt),Promise.all(r)}},ep=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},tp=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Pe().setRGB(o[0],o[1],o[2],jt),a.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,Et)),Promise.all(r)}},np=class{constructor(e){this.parser=e,this.name=Ye.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},ip=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:bn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},sp=class{constructor(e){this.parser=e,this.name=Ye.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},rp=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},ap=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},op=class{constructor(e){this.name=Ye.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(f),u,d,h,s.mode,s.filter),f})})}else return null}},lp=class{constructor(e){this.name=Ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let s=t.meshes[i.mesh];for(let c of s.primitives)if(c.mode!==qn.TRIANGLES&&c.mode!==qn.TRIANGLE_STRIP&&c.mode!==qn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(let v of d){let y=new He,g=new L,m=new zt,M=new L(1,1,1),E=new Ws(v.geometry,v.material,h);for(let S=0;S<h;S++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,S),l.SCALE&&M.fromBufferAttribute(l.SCALE,S),E.setMatrixAt(S,y.compose(g,m,M));for(let S in l)if(S==="_COLOR_0"){let R=l[S];E.instanceColor=new hs(R.array,R.itemSize,R.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&v.geometry.setAttribute(S,l[S]);ft.prototype.copy.call(E,v),this.parser.assignFinalMaterial(E),f.push(E)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Iv="glTF",Io=12,Tv={JSON:1313821514,BIN:5130562},cp=class{constructor(e){this.name=Ye.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Io),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Iv)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Io,r=new DataView(e,Io),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Tv.JSON){let c=new Uint8Array(e,Io+a,o);this.content=i.decode(c)}else if(l===Tv.BIN){let c=Io+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},up=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let d=fp[u]||u.toLowerCase();o[d]=a[u]}for(let u in e.attributes){let d=fp[u]||u.toLowerCase();if(a[u]!==void 0){let h=i.accessors[e.attributes[u]],f=ua[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(f){for(let v in f.attributes){let y=f.attributes[v],g=l[v];g!==void 0&&(y.normalized=g)}d(f)},o,c,jt,h)})})}},dp=class{constructor(){this.name=Ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},hp=class{constructor(){this.name=Ye.KHR_MESH_QUANTIZATION}},hu=class extends Vi{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,d=(i-t)/u,h=d*d,f=h*d,v=e*c,y=v-c,g=-2*f+3*h,m=f-h,M=1-g,E=m-h+d;for(let S=0;S!==o;S++){let R=a[y+S+o],C=a[y+S+l]*u,P=a[v+S+o],D=a[v+S]*u;r[S]=M*R+E*C+g*P+m*D}return r}},oM=new zt,pp=class extends hu{interpolate_(e,t,i,s){let r=super.interpolate_(e,t,i,s);return oM.fromArray(r).normalize().toArray(r),r}},qn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ua={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Av={9728:qt,9729:an,9984:Sc,9985:Qr,9986:er,9987:ai},Cv={33071:di,33648:Fr,10497:us},Hh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},fp={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},vs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},lM={CUBICSPLINE:void 0,LINEAR:Hs,STEP:Vs},zh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function cM(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new mi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ii})),n.DefaultMaterial}function ar(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Si(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function uM(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let d=e[c];if(i){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;a.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;o.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],d=c[1],h=c[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=d),r&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function dM(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function hM(n){let e,t=n.extensions&&n.extensions[Ye.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gh(t.attributes):e=n.indices+":"+Gh(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+Gh(n.targets[i]);return e}function Gh(n){let e="",t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function mp(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function pM(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var fM=new He,gp=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new aM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new fo(this.options.manager):this.textureLoader=new yo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Jr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return ar(r,o,s),Si(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let s=i.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())r(u,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let s=e(t[i]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ye.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){i.load(Gi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){let t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Hh[s.type],o=ua[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Rt(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Hh[s.type],c=ua[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,v=s.normalized===!0,y,g;if(f&&f!==d){let m=Math.floor(h/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,E=t.cache.get(M);E||(y=new c(o,m*f,s.count*f/u),E=new Wr(y,f/u),t.cache.add(M,E)),g=new qr(E,l,h%f/u,v)}else o===null?y=new c(s.count*l):y=new c(o,h,s.count*l),g=new Rt(y,l,v);if(s.sparse!==void 0){let m=Hh.SCALAR,M=ua[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,R=new M(a[1],E,s.sparse.count*m),C=new c(a[2],S,s.sparse.count*l);o!==null&&(g=new Rt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,D=R.length;P<D;P++){let w=R[P];if(g.setX(w,C[P*l]),l>=2&&g.setY(w,C[P*l+1]),l>=3&&g.setZ(w,C[P*l+2]),l>=4&&g.setW(w,C[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=v}return g})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let h=(r.samplers||{})[a.sampler]||{};return u.magFilter=Av[h.magFilter]||an,u.minFilter=Av[h.minFilter]||ai,u.wrapS=Cv[h.wrapS]||us,u.wrapT=Cv[h.wrapT]||us,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==qt&&u.minFilter!==an,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(d){c=!0;let h=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let v=h;t.isImageBitmapLoader===!0&&(v=function(y){let g=new Ot(y);g.needsUpdate=!0,h(g)}),t.load(Gi.resolveURL(d,r.path),v,void 0,f)})}).then(function(d){return c===!0&&o.revokeObjectURL(l),Si(d,a),d.userData.mimeType=a.mimeType||pM(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,i,s){let r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[Ye.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[Ye.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[Ye.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new Kr,on.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new Yr,on.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return mi}loadMaterial(e){let t=this,i=this.json,s=this.extensions,r=i.materials[e],a,o={},l=r.extensions||{},c=[];if(l[Ye.KHR_MATERIALS_UNLIT]){let d=s[Ye.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),c.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new Pe(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],jt),o.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,Et)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=_n);let u=r.alphaMode||zh.OPAQUE;if(u===zh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===zh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ln&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ce(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==ln&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ln){let d=r.emissiveFactor;o.emissive=new Pe().setRGB(d[0],d[1],d[2],jt)}return r.emissiveTexture!==void 0&&a!==ln&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Et)),Promise.all(c).then(function(){let d=new a(o);return r.name&&(d.name=r.name),Si(d,r),t.associations.set(d,{materials:e}),r.extensions&&ar(s,d,r),d})}createUniqueName(e){let t=lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[Ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Rv(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=hM(c),d=s[u];if(d)a.push(d.promise);else{let h;c.extensions&&c.extensions[Ye.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=Rv(new cn,c,t),s[u]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?cM(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,v=u.length;f<v;f++){let y=u[f],g=a[f],m,M=c[f];if(g.mode===qn.TRIANGLES||g.mode===qn.TRIANGLE_STRIP||g.mode===qn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new Qa(y,M):new at(y,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===qn.TRIANGLE_STRIP?m.geometry=Vh(m.geometry,Ao):g.mode===qn.TRIANGLE_FAN&&(m.geometry=Vh(m.geometry,sa));else if(g.mode===qn.LINES)m=new no(y,M);else if(g.mode===qn.LINE_STRIP)m=new qs(y,M);else if(g.mode===qn.LINE_LOOP)m=new io(y,M);else if(g.mode===qn.POINTS)m=new so(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&dM(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Si(m,r),g.extensions&&ar(s,m,g),t.assignFinalMaterial(m),d.push(m)}for(let f=0,v=d.length;f<v;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&ar(s,d[0],r),d[0];let h=new ti;r.extensions&&ar(s,h,r),t.associations.set(h,{meshes:e});for(let f=0,v=d.length;f<v;f++)h.add(d[f]);return h})}loadCamera(e){let t,i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Ct(Co.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new Js(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Si(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let d=a[c];if(d){o.push(d);let h=new He;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new to(o,l)})}loadAnimation(e){let t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let f=s.channels[d],v=s.samplers[f.sampler],y=f.target,g=y.node,m=s.parameters!==void 0?s.parameters[v.input]:v.input,M=s.parameters!==void 0?s.parameters[v.output]:v.output;y.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",M)),c.push(v),u.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],v=d[2],y=d[3],g=d[4],m=[];for(let E=0,S=h.length;E<S;E++){let R=h[E],C=f[E],P=v[E],D=y[E],w=g[E];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();let b=i._createAnimationTracks(R,C,P,D,w);if(b)for(let A=0;A<b.length;A++)m.push(b[A])}let M=new Xs(r,void 0,m);return Si(M,s),M})}createNodeMesh(e){let t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){let a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)a.push(i.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,fM)});for(let f=0,v=d.length;f<v;f++)u.add(d[f]);return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(r.isBone===!0?u=new jr:c.length>1?u=new ti:c.length===1?u=c[0]:u=new ft,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=a),Si(u,r),r.extensions&&ar(i,u,r),r.matrix!==void 0){let d=new He;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],s=this,r=new ti;i.name&&(r.name=s.createUniqueName(i.name)),Si(r,i),i.extensions&&ar(t,r,i);let a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,d=l.length;u<d;u++)r.add(l[u]);let c=u=>{let d=new Map;for(let[h,f]of s.associations)(h instanceof on||h instanceof Ot)&&d.set(h,f);return u.traverse(h=>{let f=s.associations.get(h);f!=null&&d.set(h,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];vs[r.path]===vs.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(vs[r.path]){case vs.weights:c=gi;break;case vs.rotation:c=vi;break;case vs.translation:case vs.scale:c=yi;break;default:switch(i.itemSize){case 1:c=gi;break;case 2:case 3:default:c=yi;break}break}let u=s.interpolation!==void 0?lM[s.interpolation]:Hs,d=this._getArrayFromAccessor(i);for(let h=0,f=l.length;h<f;h++){let v=new c(l[h]+"."+vs[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=mp(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let s=this instanceof vi?pp:hu;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function mM(n,e,t){let i=e.attributes,s=new Ln;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),o.normalized){let u=mp(ua[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new L,l=new L;for(let c=0,u=r.length;c<u;c++){let d=r[c];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,v=h.max;if(f!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(v[2]))),h.normalized){let y=mp(ua[h.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;let a=new yn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function Rv(n,e,t){let i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(let a in i){let o=fp[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){let a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return Ze.workingColorSpace!==jt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),Si(n,e),mM(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?uM(n,e.targets,t):n})}var Pv={type:"change"},yp={type:"start"},Nv={type:"end"},pu=new fi,Lv=new zn,gM=Math.cos(70*Co.DEG2RAD),Ft=new L,Sn=2*Math.PI,ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},vp=1e-6,fu=class extends _o{constructor(e,t=null){super(e,t),this.state=ct.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fs.ROTATE,MIDDLE:fs.DOLLY,RIGHT:fs.PAN},this.touches={ONE:ms.ROTATE,TWO:ms.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new zt,this._lastTargetPosition=new L,this._quat=new zt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zr,this._sphericalDelta=new Zr,this._scale=1,this._panOffset=new L,this._rotateStart=new Ce,this._rotateEnd=new Ce,this._rotateDelta=new Ce,this._panStart=new Ce,this._panEnd=new Ce,this._panDelta=new Ce,this._dollyStart=new Ce,this._dollyEnd=new Ce,this._dollyDelta=new Ce,this._dollyDirection=new L,this._mouse=new Ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yM.bind(this),this._onPointerDown=vM.bind(this),this._onPointerUp=bM.bind(this),this._onContextMenu=TM.bind(this),this._onMouseWheel=SM.bind(this),this._onKeyDown=wM.bind(this),this._onTouchStart=EM.bind(this),this._onTouchMove=MM.bind(this),this._onMouseDown=xM.bind(this),this._onMouseMove=_M.bind(this),this._interceptControlDown=AM.bind(this),this._interceptControlUp=CM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Pv),this.update(),this.state=ct.NONE}update(e=null){let t=this.object.position;Ft.copy(t).sub(this.target),Ft.applyQuaternion(this._quat),this._spherical.setFromVector3(Ft),this.autoRotate&&this.state===ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Sn:i>Math.PI&&(i-=Sn),s<-Math.PI?s+=Sn:s>Math.PI&&(s-=Sn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ft.setFromSpherical(this._spherical),Ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ft.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(pu.origin.copy(this.object.position),pu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(pu.direction))<gM?this.object.lookAt(this.target):(Lv.setFromNormalAndCoplanarPoint(this.object.up,this.target),pu.intersectPlane(Lv,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>vp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>vp||this._lastTargetPosition.distanceToSquared(this.target)>vp?(this.dispatchEvent(Pv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ft.setFromMatrixColumn(t,0),Ft.multiplyScalar(-e),this._panOffset.add(Ft)}_panUp(e,t){this.screenSpacePanning===!0?Ft.setFromMatrixColumn(t,1):(Ft.setFromMatrixColumn(t,0),Ft.crossVectors(this.object.up,Ft)),Ft.multiplyScalar(e),this._panOffset.add(Ft)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ft.copy(s).sub(this.target);let r=Ft.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ce,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function vM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function yM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function bM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Nv),this.state=ct.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function xM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case fs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ct.DOLLY;break;case fs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ct.ROTATE}break;case fs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ct.PAN}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(yp)}function _M(n){switch(this.state){case ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function SM(n){this.enabled===!1||this.enableZoom===!1||this.state!==ct.NONE||(n.preventDefault(),this.dispatchEvent(yp),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Nv))}function wM(n){this.enabled!==!1&&this._handleKeyDown(n)}function EM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ms.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ct.TOUCH_ROTATE;break;case ms.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ct.TOUCH_PAN;break;default:this.state=ct.NONE}break;case 2:switch(this.touches.TWO){case ms.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ct.TOUCH_DOLLY_PAN;break;case ms.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ct.TOUCH_DOLLY_ROTATE;break;default:this.state=ct.NONE}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(yp)}function MM(n){switch(this._trackPointer(n),this.state){case ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ct.NONE}}function TM(n){this.enabled!==!1&&n.preventDefault()}function AM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function CM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var mu=class extends Gs{constructor(){super();let e=new ds;e.deleteAttribute("uv");let t=new mi({side:Xt}),i=new mi,s=new Ks(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new at(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Ws(e,i,6),o=new ft;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new at(e,da(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new at(e,da(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new at(e,da(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new at(e,da(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new at(e,da(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let f=new at(e,da(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function da(n){return new uo({color:0,emissive:16777215,emissiveIntensity:n})}async function Dv({selectLevel:n,notify:e,reducedMotion:t}){let i=document.querySelector("#worldCanvas"),s=document.querySelector("#worldWrap"),r=document.querySelector("#worldLoading"),a;try{a=new cu({canvas:i,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return r.hidden=!0,i.hidden=!0,document.body.classList.add("flat-view"),document.querySelector("#worldHint").textContent="Illustrated view. All levels work below.",{focus(){},update(){},pause(){},overview(){},flat(){},dispose(){}}}a.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<800?1.4:1.7)),a.outputColorSpace=Et,a.toneMapping=bc,a.toneMappingExposure=.95;let o=new Gs,l=new la(a),c=new mu,u=l.fromScene(c,.04);o.environment=u.texture,c.dispose(),l.dispose();let d=new Ct(37,1,.1,150),h=new L(1.7,.4,1.8),f=new L(13,18,21);d.position.copy(h).add(f);let v=new fu(d,i);v.target.copy(h),v.enableDamping=!t,v.dampingFactor=.065,v.minDistance=10,v.maxDistance=62,v.minPolarAngle=.35,v.maxPolarAngle=1.18,v.enablePan=!1,v.rotateSpeed=.45,v.zoomSpeed=.7,o.add(new mo(14020324,2507844,1.5));let y=new ps(16768432,2.5);y.position.set(4,12,-8),o.add(y);let g=new ps(10216389,1.3);g.position.set(-8,8,5),o.add(g);let m=document.createElement("canvas");m.width=m.height=64;let M=m.getContext("2d"),E=M.createRadialGradient(32,32,3,32,32,32);E.addColorStop(0,"rgba(0,0,0,0.65)"),E.addColorStop(1,"rgba(0,0,0,0)"),M.fillStyle=E,M.fillRect(0,0,64,64);let S=new ro(m);for(let B of Tt){let Z=new at(new js(6,6),new ln({map:S,transparent:!0,depthWrite:!1}));Z.rotation.x=-Math.PI/2,Z.position.set(B.position[0],-1.2,B.position[2]),o.add(Z)}let R=new at(new co(2.05,2.1,80),new ln({color:10804932,side:_n,transparent:!0,opacity:.8}));R.rotation.x=-Math.PI/2,R.position.set(...Tt[0].position),R.position.y+=.1,o.add(R);let C=Tt.map((B,Z)=>{let he=document.createElement("span");return he.className="world-marker",he.textContent=String(Z+1).padStart(2,"0"),document.querySelector("#worldMarkers").append(he),he}),P=Tt.map((B,Z)=>{let he=new at(new lo(1.95,1.95,3.7,16),new ln({visible:!1}));return he.position.set(...B.position),he.position.y+=1.5,he.userData.level=Z,o.add(he),he}),D,w,b,A=0,O=t,$=!1,U,q=!1,V=0,Q=0,j=!0,oe=!1,de=new L,xe=new xo,$e=new Ce,it=()=>{let{width:B,height:Z}=s.getBoundingClientRect();!B||!Z||(a.setSize(B,Z,!1),d.aspect=B/Z,d.updateProjectionMatrix(),j=!0)},ut=new ResizeObserver(it);ut.observe(s),it(),v.addEventListener("start",()=>{b=null}),v.addEventListener("change",()=>{j=!0}),i.addEventListener("pointerdown",B=>{U=[B.clientX,B.clientY],q=!1}),i.addEventListener("pointermove",B=>{U&&Math.hypot(B.clientX-U[0],B.clientY-U[1])>6&&(q=!0);let Z=i.getBoundingClientRect();$e.set((B.clientX-Z.left)/Z.width*2-1,-(B.clientY-Z.top)/Z.height*2+1),xe.setFromCamera($e,d),i.style.cursor=xe.intersectObjects(P)[0]?"pointer":"grab"}),i.addEventListener("pointerup",B=>{if(!U||q){U=null;return}let Z=i.getBoundingClientRect();$e.set((B.clientX-Z.left)/Z.width*2-1,-(B.clientY-Z.top)/Z.height*2+1),xe.setFromCamera($e,d);let he=xe.intersectObjects(P)[0];he&&n(he.object.userData.level),U=null}),i.addEventListener("keydown",B=>{let Z=d.position.clone().sub(v.target);if(["ArrowLeft","ArrowRight"].includes(B.key))Z.applyAxisAngle(new L(0,1,0),B.key==="ArrowLeft"?-.13:.13);else if(["+","=","ArrowUp"].includes(B.key))Z.multiplyScalar(.9);else if(["-","ArrowDown"].includes(B.key))Z.multiplyScalar(1.1);else return;B.preventDefault(),b=null,Z.clampLength(10,62),d.position.copy(v.target).add(Z),v.update()}),i.addEventListener("webglcontextlost",B=>{B.preventDefault(),s.classList.remove("world-ready"),r.hidden=!0,$=!0,a.setAnimationLoop(null),e("The 3D view paused. Your checkpoint forms and progress are still available.")});function Qe(B,Z){if(j=!0,O){v.target.copy(B),d.position.copy(B).add(Z),v.update();return}b={from:v.target.clone(),to:B,fromCamera:d.position.clone(),toCamera:B.clone().add(Z),start:performance.now()}}function K(B){if(oe||O&&!j&&!b||B-Q<1e3/(O?15:30))return;Q=B;let Z=Math.min((B-V)/1e3||0,.05);if(V=B,!(document.hidden||$)){if(!O&&w&&w.update(Z),b){let he=Math.min((B-b.start)/1150,1),me=he*he*(3-2*he);v.target.lerpVectors(b.from,b.to,me),d.position.lerpVectors(b.fromCamera,b.toCamera,me),he===1&&(b=null)}O||(R.material.opacity=.7+Math.sin(B/750)*.18),v.update(),Tt.forEach((he,me)=>{de.set(...he.position).add(new L(0,.2,1.6)).project(d),C[me].style.left=`${(de.x/2+.5)*i.clientWidth}px`,C[me].style.top=`${(-de.y/2+.5)*i.clientHeight}px`,C[me].hidden=de.z>1}),a.render(o,d),j=!1}}a.setAnimationLoop(K);try{let B=await new du().loadAsync("/journey/assets/apex-world.glb");D=B.scene,j=!0,o.add(D),w=new bo(D),B.animations.forEach(Z=>w.clipAction(Z).play()),s.classList.add("world-ready"),s.dataset.meshes=String(B.scene.getObjectsByProperty("isMesh",!0).length),r.hidden=!0}catch{r.hidden=!0,i.hidden=!0,C.forEach(B=>B.hidden=!0),$=!0,e("Using the illustrated map while the 3D asset is unavailable. All levels still work.")}return{focus(B,Z=!1){A=B,R.position.set(...Tt[B].position).y+=.12,C.forEach((me,Ke)=>{me.dataset.active=String(Ke===B)});let he=new L(...Tt[B].position);Qe(Z?he.add(new L(1,1,0)):h.clone(),Z?f.clone().multiplyScalar(.53):f.clone())},update(B){j=!0,C.forEach((Z,he)=>{Z.dataset.locked=String(B?.[he]?.status==="locked"),Z.dataset.active=String(he===A)})},pause(B){O=B,j=!0,v.enableDamping=!B,b&&(v.target.copy(b.to),d.position.copy(b.toCamera),b=null)},overview(){Qe(h.clone(),f.clone())},flat(B){$=B,j=!0,s.classList.toggle("world-ready",!B&&!!D),i.hidden=B},dispose(){oe=!0,ut.disconnect(),v.dispose(),a.setAnimationLoop(null),o.traverse(B=>{if(B.geometry?.dispose(),B.material)for(let Z of[B.material].flat())Z.dispose()}),u.dispose(),a.dispose()}}}var Ov=`<div id="workspacePanels"><section id="authPanel" class="authPanel studio-surface" aria-label="Apex Analytic account" hidden="" data-surface="account">
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
            <button id="ownerIntelBeliefReview" type="button">BELIEF REVIEW</button>
            <input id="ownerIntelImportFile" type="file" accept="application/json" hidden="">
            <input id="ownerIntelRestorePhrase" type="text" placeholder="Type RESTORE OWNER KNOWLEDGE" autocomplete="off" hidden="">
            <button id="ownerIntelRestoreConfirm" type="button" hidden="">CONFIRM RESTORE</button>
          </div>
          <div id="ownerIntelRestoreLog" class="ownerIntelRestoreLog" hidden=""></div>
          <div id="ownerIntelBeliefLog" class="ownerIntelRestoreLog" hidden=""></div>
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
`;var ke=n=>document.querySelector(n),Ue=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),kv=n=>new Intl.NumberFormat("en-MY",{style:"currency",currency:"MYR",maximumFractionDigits:0}).format(n),gu={rental_income:"Rental income",appreciation:"Capital appreciation",own_stay:"My own home",balanced:"A balance",discovery:"Discovery",site_visit:"Site visit",transaction:"Transaction",handover:"Handover",rental:"Rental",review:"Holding review"},or=()=>new Date().toISOString().slice(0,10);function Uv({openTool:n,useProperty:e,notify:t}){let i=ke("#investmentAssistant"),s=null,r=null,a=!1,o=0,l,c=[],u=!1,d;i.innerHTML=`<header class="assistant-intro"><div class="assistant-orb" aria-hidden="true"><span>A</span></div><p class="eyebrow">YOUR PROPERTY THINKING PARTNER</p><h1>A clearer way forward.</h1><p>Tell me what you want property investment to do for you.</p></header>
    <div class="assistant-casebar"><label><span class="sr-only">Your investigations</span><select id="investmentCaseSelect" aria-label="Your investigations"><option>No saved investigation</option></select></label><button id="investmentNew" type="button">New investigation</button><button id="investmentExport" type="button" hidden>Export</button><details class="assistant-more"><summary>More</summary><button id="investmentDelete" type="button">Delete this investigation</button><button id="investmentAccount" type="button">Account &amp; private memory</button></details></div>
    <p id="investmentStorage" class="assistant-storage"></p><button id="investmentAdopt" class="secondary-button" hidden>Import my guest investigations</button>
    <div id="investmentMessages" class="assistant-messages" role="log" aria-label="Investment conversation"></div>
    <section id="investmentBrief" class="assistant-brief" aria-label="Search brief" hidden></section>
    <section id="investmentRun" class="assistant-run" aria-label="Search progress" hidden></section>
    <section id="investmentResults" class="assistant-results" aria-label="Property shortlist" hidden></section>
    <section id="investmentProperty" class="assistant-property" aria-label="Your continuing property investigation" hidden></section>
    <p id="investmentError" class="error-note" role="alert"></p>
    <form id="investmentComposer" class="assistant-composer"><label class="sr-only" for="investmentInput">Talk to Apex</label><textarea id="investmentInput" rows="2" maxlength="2000" placeholder="Find a rental property in Penang that fits my situation..." required></textarea><button type="submit" class="primary-button">Send <span aria-hidden="true">&#8599;</span></button></form>
    <div class="assistant-composer-meta"><label><input id="investmentAi" type="checkbox"> Use AI reasoning</label><span id="investmentModel">Checking connection</span><button id="investmentVoice" type="button">Speak</button></div>
    <details class="assistant-boundaries"><summary>What happens with my information?</summary><p>Your confirmed brief guides the search; it does not prove affordability. Turning on AI sends submitted messages and relevant case context to the configured provider. Your private observations never update the shared founder framework. Site visits, professional checks and external commitments still need people.</p><p id="investmentCoverage"></p></details>`;async function h(b,A,O=A?"POST":"GET"){let $=new AbortController,U=setTimeout(()=>$.abort(),6e4);d=$;try{let q=await fetch(b,{method:O,headers:{"content-type":"application/json"},body:A?JSON.stringify(A):void 0,signal:$.signal}),V=await q.json();if(!q.ok)throw Object.assign(new Error(V.error||"The request could not be completed."),{status:q.status});return V}catch(q){throw q.name==="AbortError"?new Error("Request interrupted. Reload the investigation to check what was saved before retrying."):q}finally{clearTimeout(U),d===$&&(d=null)}}function f(b){a=b,ke("#investmentComposer button").disabled=b;for(let A of["investmentCaseSelect","investmentNew","investmentDelete"])ke("#"+A).disabled=b;i.setAttribute("aria-busy",String(b))}function v(b){ke("#investmentError").textContent=b.message||String(b)}async function y(){let b=o,A=await h("/api/assistant/cases");b===o&&(c=A.cases,i.classList.toggle("no-cases",!c.length&&!s),ke("#investmentCaseSelect").innerHTML=c.length?c.map(O=>`<option value="${Ue(O.id)}" ${s?.id===O.id?"selected":""}>${Ue(O.title)} / ${Ue(gu[O.stage])}</option>`).join(""):'<option value="">No saved investigation</option>')}function g(){ke("#investmentExport").hidden=!s;let b=ke("#investmentMessages"),A=b.scrollHeight-b.scrollTop-b.clientHeight<60;b.innerHTML=(s?.messages||[]).map(V=>`<article class="assistant-message ${V.role==="user"?"from-user":"from-apex"}"><small>${V.role==="user"?"YOU":`APEX / ${V.mode==="llm"?"AI + FRAMEWORK":"FRAMEWORK"}`}</small><p>${Ue(V.content)}</p></article>`).join(""),A&&(b.scrollTop=b.scrollHeight),i.classList.toggle("has-conversation",!!s?.messages.length);let O=ke("#investmentBrief"),$=s?.brief;O.hidden=!s||s.messages.length<2||!!s.selected,$&&!O.hidden&&(O.innerHTML=`<details ${!s.confirmedAt||u?"open":""}><summary>Your search brief <span>${s.confirmedAt&&!u?"Confirmed":"Please review"}</span></summary><form id="investmentBriefForm"><div class="assistant-field-grid"><label>Location<input name="area" required maxlength="120" value="${Ue($.area)}" placeholder="Town, neighbourhood or state"></label><label>Purpose<select name="goal" required><option value="">Choose your objective</option>${Object.entries(gu).slice(0,4).map(([V,Q])=>`<option value="${V}" ${$.goal===V?"selected":""}>${Q}</option>`).join("")}</select></label><label>Search ceiling (RM)<input name="budgetMax" type="number" min="1" max="1000000000" required value="${$.budgetMax??""}" inputmode="decimal"></label><label>Property type<select name="propertyType">${[["any","Open to residential options"],["condo","Condominium"],["serviced_apartment","Serviced apartment"],["landed","Landed"]].map(([V,Q])=>`<option value="${V}" ${$.propertyType===V?"selected":""}>${Q}</option>`).join("")}</select></label></div><p class="assistant-caption">Confirm what I understood. This is a search range, not loan approval or a recommendation to spend it.</p><button type="submit" class="primary-button">${s.confirmedAt?"Search again with this brief":"Confirm & find candidates"}</button></form></details>`);let U=s?.job;ke("#investmentRun").hidden=!U,U&&(ke("#investmentRun").innerHTML=`<div><span class="live-dot"></span><b>${Ue(U.status==="completed"?"Search complete":U.status==="cancelled"?"Search stopped":U.status==="failed"?"Search needs attention":U.labels[Math.min(U.step,2)])}</b><small>${Math.min(U.step,3)} / 3</small></div>${["queued","running"].includes(U.status)?'<button type="button" data-investment-action="cancel">Stop search</button>':""}<p>${Ue(U.error||"Uses the published catalogue only. You can use other tools while this runs; return here to see the result.")}</p>`);let q=s?.results;ke("#investmentResults").hidden=!q||!!s?.selected||U?.status!=="completed",q&&(ke("#investmentResults").innerHTML=`<header><p class="eyebrow">${q.coverage.current} CURRENT RECORDS / ${q.coverage.sources.length} PUBLISHED SOURCES</p><h2>${q.candidates.length?"Worth a closer look":"No supported match yet"}</h2><p>${Ue(q.message)}</p></header><div class="assistant-shortlist">${q.candidates.map(V=>`<article class="assistant-candidate"><span class="status-pill">INVESTIGATE</span><h3>${Ue(V.projectName)}</h3><p>${Ue(V.area)} / ${Ue(V.propertyType.replaceAll("_"," "))}</p><strong>${kv(V.askingPrice)}</strong><small>Asking price / checked ${V.observedAt.slice(0,10)}</small><p>${Ue(V.reasons[0])}</p><p class="candidate-gap">${Ue(V.gaps[0])}</p><details><summary>Evidence &amp; contrary case</summary><p>${Ue(V.counterCase)}</p><ul>${V.gaps.map(Q=>`<li>${Ue(Q)}</li>`).join("")}</ul><a href="${Ue(V.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original listing</a>${V.facts.map(Q=>`<p><a href="${Ue(Q.sourceUrl)}" target="_blank" rel="noopener noreferrer">${Ue(Q.kind.replaceAll("_"," "))}</a> / ${Q.observedAt.slice(0,10)} / ${Ue(Q.verification.replaceAll("_"," "))}<br>${Ue(Q.description)}</p>`).join("")}</details><button type="button" class="primary-button" data-investment-select="${Ue(V.id)}">Investigate this property</button></article>`).join("")}</div><details><summary>Search coverage and exclusions</summary><p>${Ue(q.rankingBasis)}</p><p>${Object.entries(q.excluded).map(([V,Q])=>`${Ue(V)}: ${Q}`).join(" / ")}</p><p>${Ue(q.coverage.limit)}</p><p>${q.coverage.sources.map(V=>`${Ue(V.name)}: ${Ue(V.coverage||"Coverage not specified")}`).join("<br>")}</p></details>`),m()}function m(){let b=ke("#investmentProperty"),A=s?.selected;if(b.hidden=!A,!A)return;let $=s.tasks.filter(U=>U.id.startsWith(s.stage+":")).find(U=>U.status!=="done");b.innerHTML=`<header><p class="eyebrow">ONE PROPERTY / A CONTINUING INVESTIGATION</p><h2>${Ue(A.projectName)}</h2><p>${Ue(gu[s.stage])} / ${Ue(A.area)}</p><button type="button" class="secondary-button" data-investment-action="numbers">Open the valuation tools</button></header>
      ${$?`<section class="assistant-next"><small>NEXT USEFUL ACTION</small><h3>${Ue($.title)}</h3><p>${Ue($.prompt)}</p><form id="investmentTaskForm"><input type="hidden" name="taskId" value="${Ue($.id)}"><label>What did you check?<textarea name="note" required minlength="12" maxlength="1500" placeholder="Your observation, document or professional feedback"></textarea></label><div class="assistant-field-grid"><label>Date checked<input type="date" name="checkedAt" required max="${or()}" value="${or()}"></label><label>Source link (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label></div><button type="submit" class="primary-button">Record this check</button><p class="assistant-caption">Recorded as your declaration, not independent verification.</p></form></section>`:'<p class="assistant-next">Your checks for this stage are recorded. Review unresolved risks before making a commitment.</p>'}
      <details><summary>All checks and evidence</summary>${s.tasks.map(U=>`<p><b>${Ue(U.title)}</b> / ${Ue(U.status)}<br>${Ue(U.note||"Not yet recorded")}${U.status==="done"?`<br><button type="button" data-reopen-task="${Ue(U.id)}">Reopen check</button>`:""}</p>`).join("")}<form id="investmentEvidenceForm"><label>Add a private observation<textarea name="note" required minlength="12" maxlength="2000"></textarea></label><label>Date<input type="date" name="checkedAt" required max="${or()}" value="${or()}"></label><label>Source (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label><button type="submit">Keep this evidence</button></form>${s.evidence.map(U=>`<p>${Ue(U.note)}<br><small>${U.checkedAt.slice(0,10)} / user declared</small></p>`).join("")}</details>
      <details><summary>Move to another ownership stage</summary><form id="investmentStageForm"><label>Current situation<select name="stage">${Object.entries(gu).slice(5).map(([U,q])=>`<option value="${U}" ${U===s.stage?"selected":""}>${q}</option>`).join("")}</select></label><label>What changed, and what remains unresolved?<textarea name="note" required minlength="12" maxlength="1000"></textarea></label><button type="submit">Update my stage</button><p class="assistant-caption">This records your progress, not approval to transact. Apex does not sign, pay, book or contact anyone automatically.</p></form></details>
      <details><summary>Actual rental and holding outcomes</summary><form id="investmentOutcomeForm"><div class="assistant-field-grid"><label>Month<input name="month" type="month" required max="${or().slice(0,7)}" value="${or().slice(0,7)}"></label><label>Rent received (RM)<input name="rentReceived" type="number" step="0.01" min="0" required></label><label>All monthly outgoings (RM)<input name="totalCosts" type="number" step="0.01" min="0" required></label><label>Notes<input name="note" maxlength="1000" placeholder="Vacancy, repairs, loan and recurring charges"></label></div><button type="submit">Record actual outcome</button></form>${s.outcomes.map(U=>`<p>${Ue(U.month)} / ${kv(U.cashFlow)} cash flow<br>${Ue(U.note)}</p>`).join("")}</details>
      <details><summary>Decision history</summary>${s.events.slice().reverse().map(U=>`<p>${Ue(U.description)}<br><small>${U.at.slice(0,10)}</small></p>`).join("")}</details>`}async function M(b){let A=o,O=await h(`/api/assistant/cases/${b}`);A===o&&(s=O.case,u=!1,g())}async function E(b,A={}){if(!s)return;let O=o,$=s.id,U=await h(`/api/assistant/cases/${$}/${b}`,{...A,revision:s.revision});O!==o||s?.id!==$||(s=U.case,g())}async function S(b){if(!a){f(!0),ke("#investmentError").textContent="";try{await b(),await y()}catch(A){v(A),A.status===409&&s&&await M(s.id).catch(v)}finally{f(!1),R()}}}function R(){clearTimeout(l),!(!s?.job||!["queued","running"].includes(s.job.status))&&(l=setTimeout(()=>{if(a){R();return}S(()=>E("step",{jobId:s.job.id}))},650))}async function C(){let b=o,A=await h("/api/assistant/cases",{});b===o&&(s=A.case,u=!1,g())}async function P(){o++,clearTimeout(l),d?.abort(),s=null,g();let b=o,A=await h("/api/assistant/status");b===o&&(r=A,ke("#investmentStorage").textContent=r.storageNotice,ke("#investmentModel").textContent=r.llm?"AI available / opt in to use":"Framework mode / AI not configured",ke("#investmentAi").checked=!1,ke("#investmentAi").disabled=!r.llm,ke("#investmentCoverage").textContent=`${r.coverage.current} current records from ${r.coverage.sources.length} published sources. ${r.coverage.limit} ${r.background}`,ke("#investmentAdopt").hidden=!r.guestDraftAvailable,await y(),c.length&&(await M(c[0].id),R()))}ke("#investmentComposer").addEventListener("submit",b=>{b.preventDefault();let A=ke("#investmentInput"),O=A.value.trim();O&&S(async()=>{s||await C(),await E("message",{message:O,allowAi:ke("#investmentAi").checked,editBrief:u}),A.value=""})}),i.addEventListener("submit",b=>{let A=b.target.id,O={investmentBriefForm:"confirm",investmentTaskForm:"task",investmentStageForm:"stage",investmentOutcomeForm:"outcome",investmentEvidenceForm:"evidence"}[A];if(!O)return;b.preventDefault();let $=Object.fromEntries(new FormData(b.target));S(async()=>{await E(O,O==="confirm"?{brief:{...s.brief,...$}}:{...$,...O==="task"?{status:"done"}:{}}),u=!1,g()})}),i.addEventListener("click",b=>{let A=b.target.closest("button");A&&(A.dataset.investmentSelect&&S(async()=>{await E("select",{listingId:A.dataset.investmentSelect}),e(s)}),A.dataset.investmentAction==="cancel"&&S(()=>E("cancel")),A.dataset.investmentAction==="numbers"&&(e(s),n("valuation")),A.dataset.reopenTask&&S(()=>E("task",{taskId:A.dataset.reopenTask,status:"open"})))}),ke("#investmentNew").addEventListener("click",()=>void S(C)),ke("#investmentCaseSelect").addEventListener("change",b=>void S(()=>M(b.target.value))),ke("#investmentAccount").addEventListener("click",()=>void n("account")),ke("#investmentAdopt").addEventListener("click",()=>void S(async()=>{await h("/api/assistant/adopt",{}),await P()})),ke("#investmentExport").addEventListener("click",()=>{if(!s)return;let b=URL.createObjectURL(new Blob([JSON.stringify({format:"apex-investigation.v1",exportedAt:new Date().toISOString(),case:s},null,2)],{type:"application/json"})),A=document.createElement("a");A.href=b,A.download=`apex-investigation-${or()}.json`,A.click(),setTimeout(()=>URL.revokeObjectURL(b),1e3)}),ke("#investmentDelete").addEventListener("click",b=>{if(!(!s||a)){if(b.target.dataset.confirm!==s.id){b.target.dataset.confirm=s.id,b.target.textContent="Confirm delete: chat, evidence and outcomes";return}S(async()=>{await h(`/api/assistant/cases/${s.id}`,null,"DELETE"),s=null,g(),b.target.textContent="Delete this investigation",b.target.dataset.confirm=""})}});let D,w=window.SpeechRecognition||window.webkitSpeechRecognition;return ke("#investmentVoice").hidden=!w,ke("#investmentVoice").addEventListener("click",()=>{if(D){D.stop();return}D=new w,D.lang="en-MY",D.onresult=b=>{ke("#investmentInput").value=Array.from(b.results).map(A=>A[0].transcript).join(" ")},D.onerror=()=>v(new Error("Voice input is unavailable. You can type your message instead.")),D.onend=()=>{D=null,ke("#investmentVoice").textContent="Speak"},D.start(),ke("#investmentVoice").textContent="Stop listening"}),document.addEventListener("apex:auth",()=>{D?.stop(),P().catch(v)}),P().catch(v),{show(){i.hidden=!1,document.body.classList.add("assistant-active"),document.body.classList.remove("workspace-active"),ke("#workbench").hidden=!0,document.querySelectorAll("[data-area]").forEach(b=>b.setAttribute("aria-current",b.dataset.area==="assistant"?"page":"false")),history.replaceState(null,"","#assistant")},hide(){i.hidden=!0,document.body.classList.remove("assistant-active"),D?.stop()}}}function Fv(n){n.querySelector("#workspacePanels").insertAdjacentHTML("beforeend",`<section data-surface="catalogue" class="studio-surface" hidden><header><span><small>OWNER ONLY</small><b>Published discovery sources</b></span></header><p>Publish only records you are permitted to redistribute. This catalogue is separate from private evidence and the founder's 407 answers.</p><form id="catalogueForm"><label>Owner token<input id="catalogueToken" type="password" autocomplete="off"></label><label>Permitted source export (JSON)<input id="catalogueFile" type="file" accept=".json,application/json"></label><p>A complete import replaces that source's earlier records, so withdrawn listings do not remain active.</p><button type="submit" class="primary-button">Validate &amp; publish source</button><button type="button" id="catalogueRefresh">Refresh coverage</button><a href="/assistant/catalogue-template.json" download>Download an empty import template</a></form><p id="catalogueMessage" role="status"></p><div id="catalogueSources"></div></section>`);async function e(i="GET",s){let r=await fetch("/api/owner/discovery",{method:i,headers:{"content-type":"application/json","x-estatelab-owner-token":ke("#catalogueToken").value||ke("#ownerIntelToken")?.value||""},body:s?JSON.stringify(s):void 0}),a=await r.json();if(!r.ok)throw new Error(a.error||"Catalogue request failed.");return a}async function t(){let i=await e();ke("#catalogueSources").innerHTML=`<p>${i.coverage.current} current listings / ${i.coverage.records} total records.</p>${i.sources.map(s=>`<article><h3>${Ue(s.name)}</h3><p>${Ue(s.coverage)} / ${Ue(s.permission)}</p><p>${Ue(s.permissionReference)}</p><button type="button" data-unpublish="${Ue(s.id)}">Unpublish this source</button></article>`).join("")}`}ke("#catalogueRefresh").addEventListener("click",()=>void t().catch(i=>{ke("#catalogueMessage").textContent=i.message})),ke("#catalogueForm").addEventListener("submit",async i=>{i.preventDefault();let s=ke("#catalogueFile").files[0],r=i.target.querySelector('[type="submit"]');r.disabled=!0;try{if(!s||s.size>4*1024*1024)throw new Error("Choose a JSON source export under 4 MB.");let a=await e("POST",JSON.parse(await s.text()));ke("#catalogueMessage").textContent=`Published ${a.imported} records. Import validates structure, not the truth of source claims.`,await t()}catch(a){ke("#catalogueMessage").textContent=a.message}finally{r.disabled=!1}}),ke("#catalogueSources").addEventListener("click",async i=>{let s=i.target.closest("[data-unpublish]");if(s){if(s.dataset.confirm!=="true"){s.dataset.confirm="true",s.textContent="Confirm unpublish";return}try{await e("DELETE",{sourceId:s.dataset.unpublish}),await t()}catch(r){ke("#catalogueMessage").textContent=r.message}}})}var Pa={desk:{title:"The decision desk",description:"Explore the question. Test the numbers. Keep your context together.",views:[["chat","Ask Apex","Your thinking partner"],["deal","Property inputs","Shared with the journey"],["profile","Investor profile","Capacity, goals and reserves"],["valuation","Valuation lab","DCF, comparisons and Excel"],["guidance","Preferences","Choose your guidance style"]]},library:{title:"Your private library",description:"Return to what you learned, decided and saved.",views:[["reports","Decision reports","Saved seven-stage assessments"],["journal","Decision journal","Thesis, outcomes and lessons"],["memory","Long-term memory","Review what Apex remembers"],["history","Conversations","Resume or manage your history"],["shortlist","Saved shortlist","Compare earlier assessments"]]},owner:{title:"Owner Studio",description:"Curate the intelligence. Shared knowledge stays under your control.",views:[["owner","Intelligence hub","Coverage, research and operations"],["catalogue","Discovery catalogue","Permitted sources and current listings"],["market","Market observatory","Projects and dated observations"],["cases","Development cases","Your project-level experience"],["evidence","Evidence vault","Sources, documents and indexing"]]},account:{title:"Your account",description:"Private access, plan details and the boundaries that protect your decisions.",views:[["account","Account & plan","Sign in, security and billing"],["trust","Decision boundaries","What Apex can and cannot do"]]}},dl=Object.entries(Pa).flatMap(([n,e])=>e.views.map(([t,i,s])=>({area:n,id:t,label:i,description:s}))),Bt=n=>document.querySelector(n);function lx({getCandidate:n,notify:e,onVisibility:t}){let i=Bt("#workbench");i.innerHTML=`<aside class="studio-sidebar"><p class="eyebrow">APEX / WORKSPACE</p><h2 id="studioAreaTitle"></h2><p id="studioAreaDescription"></p><label class="studio-search"><span class="sr-only">Find a feature</span><input id="studioSearch" type="search" placeholder="Find a tool..." autocomplete="off"></label><nav id="studioNav" aria-label="Workspace sections"></nav><label class="mobile-section"><span>Section</span><select id="studioSectionSelect"></select></label><p class="studio-private">Your property stays selected as you move between tools. Knowledge updates are owner-only.</p></aside><div class="studio-main"><header class="studio-breadcrumb"><span id="studioBreadcrumb"></span><button type="button" data-return-journey>Back to journey <span aria-hidden="true">&#8599;</span></button></header><div id="studioLoading" role="status" hidden>Connecting your workspace...</div>${Ov}</div>`,Fv(i);let s,r,a="",o="desk",l=!1;Bt("#studioBreadcrumb").tabIndex=-1;let c;try{let y=JSON.parse(localStorage.getItem("estatelab.jarvis.dealCard")||"{}"),g=JSON.parse(localStorage.getItem("estatelab.jarvis.financialProfile")||"{}");!localStorage.getItem("apex.workspace.recovered")&&(Object.keys(y).length||Object.keys(g).length)&&(c={dealCard:y,financialProfile:g})}catch{}if(c){let y=document.createElement("details");y.className="draft-recovery",y.innerHTML='<summary>Earlier browser inputs found</summary><p>Recover the draft saved on this device. Review it before relying on it; your existing properties will not be overwritten.</p><button type="button" data-recover-draft>Recover draft</button>',i.querySelector(".studio-sidebar").append(y)}for(let y of dl){let g=i.querySelector(`[data-surface="${y.id}"] > header > span > b:not([id])`);g&&(g.textContent=y.label)}function u(y,g=!0){let m=dl.find(M=>M.id===y);m&&(a=y,o=m.area,document.dispatchEvent(new CustomEvent("apex:leave-assistant")),i.hidden=!1,document.body.classList.add("workspace-active"),t(!0),Bt("#studioAreaTitle").textContent=Pa[o].title,Bt("#studioAreaDescription").textContent=Pa[o].description,Bt("#studioBreadcrumb").textContent=`${Pa[o].title} / ${m.label}`,i.querySelectorAll("[data-surface]").forEach(M=>{M.hidden=M.dataset.surface!==y}),document.querySelectorAll("[data-area]").forEach(M=>M.setAttribute("aria-current",M.dataset.area===o?"page":"false")),Bt("#studioAccount").setAttribute("aria-current",o==="account"?"page":"false"),d(Bt("#studioSearch").value),g&&history.replaceState(null,"",`#${o}/${y}`))}function d(y=""){let g=y.trim().toLowerCase();i.dataset.searching=String(!!g);let m=g?dl.filter(M=>`${M.label} ${M.description}`.toLowerCase().includes(g)):dl.filter(M=>M.area===o);Bt("#studioNav").innerHTML=m.map((M,E)=>`<button type="button" data-view="${M.id}" aria-current="${a===M.id?"page":"false"}"><span class="studio-nav-number">${String(E+1).padStart(2,"0")}</span><span><b>${M.label}</b><small>${M.description}</small></span><span aria-hidden="true">&#8599;</span></button>`).join("")||'<p>No matching tools. Try "reports", "DCF" or "memory".</p>',Bt("#studioSectionSelect").innerHTML=Object.entries(Pa).map(([M,E])=>`<optgroup label="${E.title}">${E.views.map(([S,R])=>`<option value="${S}" ${S===a?"selected":""}>${R}</option>`).join("")}</optgroup>`).join("")}async function h(){return s&&i.dataset.ready==="true"?s:(r||(r=(async()=>{Bt("#studioLoading").hidden=!1;let y=await Promise.resolve().then(()=>(ox(),ax));return s=y,y.setWorkspaceCandidate(n()),await y.initializeFeatures(),Bt("#studioLoading").hidden=!0,i.dataset.ready="true",y})().catch(y=>{throw r=null,Bt("#studioLoading").textContent="Workspace connection failed. Try selecting a section again.",y})),r)}async function f(y="chat",g={}){if(l||s?.workspaceBusy()){e("Let Apex finish the current request before switching tools.");return}l=!0,u(y),Bt("#studioSearch").value="";try{let m=await h();y!=="catalogue"&&await m.openWorkspaceFeature(y,g),u(a||y),a==="account"&&y!=="account"&&e("Sign in to open your private library. Guest chat and property tools remain available."),window.scrollTo({top:0,behavior:"instant"}),y!=="chat"&&!matchMedia("(pointer: coarse)").matches&&Bt("#studioBreadcrumb").focus({preventScroll:!0})}catch(m){e(m.message,!0)}finally{l=!1}}function v(){if(l||s?.workspaceBusy()){e("Let Apex finish the current request before switching views.");return}i.hidden=!0,document.body.classList.remove("workspace-active"),document.dispatchEvent(new CustomEvent("apex:leave-assistant")),history.replaceState(null,"","#journey"),t(!1),document.querySelectorAll("[data-area]").forEach(y=>y.setAttribute("aria-current",y.dataset.area==="journey"?"page":"false"))}return document.addEventListener("apex:surface",y=>u(y.detail)),document.addEventListener("apex:notice",y=>e(y.detail,!0)),document.addEventListener("keydown",y=>{y.key==="Escape"&&!i.hidden&&!Bt("#workspaceDialog").open&&v()}),i.addEventListener("click",y=>{let g=y.target.closest("button");g&&(g.dataset.view&&f(g.dataset.view),g.hasAttribute("data-return-journey")&&v(),g.hasAttribute("data-studio-close")&&f("chat"),g.hasAttribute("data-recover-draft")&&!s?.workspaceBusy()&&document.dispatchEvent(new CustomEvent("apex:recover-draft",{detail:c})))}),Bt("#studioSearch").addEventListener("input",y=>d(y.target.value)),Bt("#studioSectionSelect").addEventListener("change",y=>void f(y.target.value)),document.addEventListener("keydown",y=>{(y.ctrlKey||y.metaKey)&&y.key.toLowerCase()==="k"&&(y.preventDefault(),f(a||"chat").then(()=>Bt("#studioSearch").focus()))}),document.querySelectorAll("[data-area]").forEach(y=>y.addEventListener("click",()=>{y.dataset.area!=="assistant"&&(y.dataset.area==="journey"?v():f(Pa[y.dataset.area].views[0][0]))})),Bt("#studioAccount").addEventListener("click",()=>void f("account")),{open:f,close:v,isBusy:()=>l||!!s?.workspaceBusy(),setCandidate(y){s?.setWorkspaceCandidate(y)},restoreRoute(){let y=location.hash.split("/")[1];dl.some(g=>g.id===y)&&f(y)}}}var Lt,hl,cx=!1,Te=n=>document.querySelector(n),ht=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),U1=n=>String(n??"").replace(/EstateLab|Jarvis/gi,"Apex"),mx=()=>new Date().toISOString().slice(0,10),gx=()=>crypto.randomUUID(),vl={read(n,e){try{return JSON.parse(localStorage.getItem(n))??e}catch{return e}},write(n,e){localStorage.setItem(n,JSON.stringify(e))}},ts={},es=vl.read("apex.journey.client",null);if(!es)try{es=localStorage.getItem("estatelab.jarvis.clientId"),es&&vl.write("apex.journey.client",es)}catch{}if(!/^[\w-]{16,128}$/.test(es||"")){es=gx();try{vl.write("apex.journey.client",es)}catch{}}var vx=matchMedia("(prefers-reduced-motion: reduce)"),z={candidates:[],active:"",level:0,checkpoint:null,evaluation:null,busy:!1,revision:0,paused:vx.matches,flat:!1,storageKey:null,world:null,noticeTimer:null};function Pt(n,e=!1){clearTimeout(z.noticeTimer),Te("#notice").textContent=U1(n),e||(z.noticeTimer=setTimeout(()=>{Te("#notice").textContent=""},6500))}function gl(){return{id:gx(),dealCard:{},financialProfile:{},evidence:{},report:null,sessionId:null,chat:[],modified:new Date().toISOString()}}function Nt(){return z.candidates.find(n=>n.id===z.active)}function yx(n){return{dealCard:n.dealCard,financialProfile:n.financialProfile,evidence:n.evidence}}function Li(){if(z.storageKey)try{vl.write(z.storageKey,{candidates:z.candidates,active:z.active}),Te("#saveStatus").textContent="Saved in this browser. Your framework stays owner-controlled."}catch{Te("#saveStatus").textContent="Browser storage is unavailable. Export your journey to keep a copy."}}function bx(){z.revision++,z.evaluation=null,Nt().report=null,Nt().modified=new Date().toISOString(),Te("#levelStatus").textContent="RECHECK NEEDED",Li(),La(),Rs()}async function vd(n,e,t=35e3){let i=new AbortController,s=setTimeout(()=>i.abort(),t);try{let r=await fetch(n,{method:e?"POST":"GET",headers:{"content-type":"application/json","x-estatelab-client-id":es},body:e?JSON.stringify(e):void 0,signal:i.signal}),a=await r.json().catch(()=>({}));if(!r.ok)throw new Error(a.error||`Request failed (${r.status}).`);return a}catch(r){throw r.name==="AbortError"?new Error("Apex is taking longer to respond. Your work is saved; please try again."):r}finally{clearTimeout(s)}}function _r(n=z.level){return z.evaluation?.levels?.[n]}function dm(n){return n===0||["active","review","blocked","passed"].includes(_r(n)?.status)}function La(){let n=Te("#candidateSelect");n.innerHTML=z.candidates.map((e,t)=>`<option value="${ht(e.id)}">${ht(e.dealCard.projectName||e.dealCard.area||`Property ${t+1}`)}</option>`).join(""),n.value=z.active,Te("#compareCount").textContent=z.candidates.length}function Rs(){Te("#levelRail").innerHTML=Tt.map((n,e)=>{let t=_r(e)?.status||(e===0?"active":"locked"),i={passed:"Cleared",active:"Explore",review:"Evidence needed",blocked:"Resolve issue",locked:"Locked"}[t];return`<button type="button" data-level="${e}" class="${z.level===e?"active":""}" aria-current="${z.level===e?"step":"false"}" aria-disabled="${!dm(e)}" aria-label="Level ${e+1}: ${ht(n.subject)}. ${i}."><span class="rail-number">${t==="passed"?"&#10003;":String(e+1).padStart(2,"0")}</span><span><b>${ht(n.short)}</b><small>${i}</small></span></button>`}).join(""),Te("#levelsPassed").textContent=String(z.evaluation?.completed||0).padStart(2,"0"),z.world?.update(z.evaluation?.levels||Tt.map((n,e)=>({status:e===0?"active":"locked"})))}function F1(){let n=Tt[z.level],e=_r(),t=n.checkpoints.filter(a=>!Da(Nt(),a,ts).length).length,i=e?.status==="passed",s=e?.status==="blocked"||e?.status==="review",r=`<button class="primary-button" data-action="enter">${t?"Continue investigation":"Enter this level"}<span aria-hidden="true">&#8599;</span></button>`;i&&z.level<6&&(r=`<button class="primary-button" data-action="next">Continue to ${ht(Tt[z.level+1].title)} <span aria-hidden="true">&#8594;</span></button>`),z.level===6&&i&&(r='<button class="primary-button" data-action="report">Get the decision report <span aria-hidden="true">&#8599;</span></button>'),Te("#levelContent").innerHTML=`
    <p class="level-lead">${ht(n.description)}</p>
    <div class="panel-progress"><span>${t} of ${n.checkpoints.length} checkpoints recorded</span><span>${Math.round(t/n.checkpoints.length*100)}%</span></div>
    <div class="progress-track"><span style="width:${t/n.checkpoints.length*100}%"></span></div>
    ${s?`<div class="gate-result bad"><b>${e.status==="blocked"?"Pause at this level":"The evidence needs another look"}</b><p>${ht(e.blockers?.[0]||e.summary)}</p><button class="secondary-button" data-action="challenge">Ask Apex what to check</button></div>`:""}
    ${i?`<div class="gate-result good"><b>Level cleared</b><p>${ht(e.summary)}</p></div>`:""}
    <ol class="checkpoint-list">${n.checkpoints.map((a,o)=>{let l=!Da(Nt(),a,ts).length;return`<li><button type="button" data-checkpoint="${o}"><span class="step-icon ${l?"complete":""}">${l?"&#10003;":String(o+1).padStart(2,"0")}</span><span>${ht(a.title)}</span><span class="step-arrow" aria-hidden="true">&#8599;</span></button></li>`}).join("")}</ol>
    ${r}
    ${t===n.checkpoints.length&&!i?'<button class="secondary-button" data-action="check" style="width:100%;margin-top:10px">Check this level</button>':""}
    <p class="mentor-note">${ht(n.lesson)}</p>`}function B1(n){let e=ts[n],t=_d(Nt(),n,ts),i=xd.has(n)?"":"required",s=`<span>${ht(e.label)}${i?"":"<small>optional</small>"}</span>`;if(e.options.length)return`<label class="field">${s}<select name="${n}" data-field="${n}" ${i}><option value="">Select what the evidence shows</option>${e.options.map(o=>`<option value="${ht(o.value)}" ${t===o.value?"selected":""}>${ht(o.label)}</option>`).join("")}</select></label>`;let r=/Notes|Thesis|Criterion|Concern|Screening|Reason|Preparation|Commitment/.test(n),a=e.inputMode==="numeric"?"numeric":e.inputMode==="decimal"?"decimal":"text";return`<label class="field">${s}${r?`<textarea data-field="${n}" name="${n}" maxlength="500" placeholder="${ht(e.placeholder)}" ${i}>${ht(t)}</textarea>`:`<input data-field="${n}" name="${n}" value="${ht(t)}" inputmode="${a}" maxlength="500" placeholder="${ht(e.placeholder)}" ${i}>`}</label>`}function $1(){let e=Tt[z.level].checkpoints[z.checkpoint],t=Nt().evidence[e.id]||{};Te("#levelContent").innerHTML=`<button class="back-button" data-action="overview">&#8592; Level overview</button>
    <form class="checkpoint-form" id="checkpointForm">
      <h3>${ht(e.title)}</h3><p>${ht(e.prompt)}</p>
      ${e.fields.map(B1).join("")}
      <div class="proof-block"><p>Leave a trace of your reasoning. For financial inputs, record the basis of your calculation.</p>
      <label class="field"><span>Evidence or calculation notes</span><textarea name="proofNote" data-proof="note" minlength="12" maxlength="1500" required placeholder="Source, document, observation or calculation. Say what is still uncertain.">${ht(t.note||"")}</textarea></label>
      <label class="field"><span>Date checked</span><input name="proofDate" data-proof="date" type="date" max="${mx()}" value="${ht(t.date||"")}" required></label></div>
      <p class="source-line">Framework: ${ht(e.source)}.</p>
      <p id="checkpointError" class="error-note" role="alert"></p>
      <div class="form-actions"><button type="submit" class="primary-button">Save &amp; check <span aria-hidden="true">&#8594;</span></button></div>
    </form>`}function An(){let n=Tt[z.level],e=_r()?.status||"active";Te("#levelEyebrow").textContent=`LEVEL ${String(z.level+1).padStart(2,"0")} / 07`,Te("#levelTitle").textContent=n.title,Te("#levelSubject").textContent=n.subject.toUpperCase(),Te("#levelStatus").textContent={active:"OPEN",passed:"CLEARED",review:"REVIEW",blocked:"PAUSED",locked:"LOCKED"}[e],Te("#levelStatus").dataset.status=e,z.checkpoint===null?F1():$1(),Te("#levelPanel").setAttribute("aria-busy",String(z.busy))}function um(n){if(!(z.busy||Lt?.isBusy())){if(!dm(n)){Pt("Clear the earlier levels first. Each decision builds on the evidence before it.");return}z.level=n,z.checkpoint=null,An(),Rs(),z.world?.focus(n),Te("#levelPanel").scrollTop=0,innerWidth<800&&Te("#levelPanel").scrollIntoView({behavior:z.paused?"instant":"smooth",block:"start"})}}async function fl(){let n=z.active,e=z.revision,t=await vd("/api/journey/evaluate",{candidate:yx(Nt())});return n!==z.active||e!==z.revision?null:(z.evaluation=t,Rs(),t)}async function ux(){if(!(z.busy||Lt?.isBusy())){z.busy=!0,Te("#levelPanel").setAttribute("aria-busy","true");try{let n=z.evaluation?.completed||0,e=await fl();if(!e)return;Li();let t=Tt[z.level].checkpoints.findIndex(i=>Da(Nt(),i,ts).length);t>=0&&z.checkpoint!==null?z.checkpoint=t:z.checkpoint=null,An(),Te("#levelPanel").scrollTop=0,e.completed>n?Pt(`${Tt[z.level].title} cleared. The next level is open.`):t<0?Pt(_r()?.status==="passed"?"This level is cleared.":"Evidence saved. Review the level feedback before proceeding."):Pt("Checkpoint saved. Continue with the next piece of evidence.")}catch(n){let e=Te("#checkpointError");e?e.textContent=n.message:Pt(n.message,!0)}finally{z.busy=!1,Te("#levelPanel").setAttribute("aria-busy","false")}}}function xx(n,e,t="YOUR INVESTIGATION"){Te("#dialogTitle").textContent=n,Te("#dialogEyebrow").textContent=t,Te("#dialogContent").innerHTML=e,Te("#workspaceDialog").open||Te("#workspaceDialog").showModal()}function dx(){let n={product:"Apex Property Journey",version:1,exportedAt:new Date().toISOString(),candidate:Nt(),assessment:z.evaluation},e=URL.createObjectURL(new Blob([JSON.stringify(n,null,2)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`apex-journey-${mx()}.json`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}async function V1(){if(!(z.busy||Lt?.isBusy())){xx("Which property earns its place?",'<p role="status">Rechecking each candidate against the same framework...</p>',"YOUR PROPERTY COLLECTION");try{let n=[];for(let a of z.candidates)n.push(await vd("/api/journey/evaluate",{candidate:yx(a)}));let e=n.map((a,o)=>({result:a,i:o})).filter(a=>a.result.qualified).sort((a,o)=>(o.result.dimensions||[]).reduce((l,c)=>l+c.score,0)-(a.result.dimensions||[]).reduce((l,c)=>l+c.score,0)),t=e[0],i=a=>a.result.dimensions.reduce((o,l)=>o+l.score,0),s=t?e.filter(a=>i(a)===i(t)):[],r=s.length>1?`${s.map(a=>a.result.candidateName).join(", ")} share the highest framework score. There is no clear winner from these scores alone. Compare the cash-flow assumptions, exit risks and strength of the evidence before choosing.`:t?`${t.result.candidateName} has the strongest average across the four framework dimensions among your qualified candidates. Review its counter-case before deciding.`:"No candidate has cleared every level and the final evidence gate yet. The comparison shows where each investigation needs work.";Te("#dialogContent").innerHTML=`<p>${ht(r)}</p><div class="compare-grid">${n.map((a,o)=>`<article class="compare-card"><small>${a.qualified?"QUALIFIED FOR SHORTLIST REVIEW":"INVESTIGATION IN PROGRESS"}</small><h3>${ht(a.candidateName)}</h3><p>${a.completed} / 7 levels cleared</p>${a.dimensions.map(l=>`<div class="score-row"><span>${ht(l.label)}</span><b>${l.score}/100</b></div>`).join("")}<p>${ht(a.hardStops[0]||a.blockers[0]||a.counterThesis)}</p><button class="secondary-button" data-switch="${ht(z.candidates[o].id)}">Open journey</button></article>`).join("")}</div><p class="source-line">Scores reflect your supplied inputs. Evidence quality, hard stops and the investor's situation take priority over the average.</p>`}catch(n){Te("#dialogContent").textContent=n.message}}}function hx(n=""){Lt.setCandidate(Nt()),Lt.open("chat",{prompt:n})}async function H1(){z.busy||Lt.isBusy()||(Lt.setCandidate(Nt()),await Lt.open("chat",{analyze:!0}))}async function pl(n){if(z.busy||Lt?.isBusy()||!z.candidates.some(e=>e.id===n)){La();return}window.speechSynthesis?.cancel(),z.active=n,z.level=0,z.checkpoint=null,z.evaluation=null,z.revision++,Lt?.setCandidate(Nt()),Li(),La(),An(),Rs(),z.world?.overview();try{await fl(),An()}catch(e){Pt(e.message)}}function z1(){Te("#candidateSelect").addEventListener("change",n=>pl(n.target.value)),Te("#levelRail").addEventListener("click",n=>{let e=n.target.closest("[data-level]");e&&um(Number(e.dataset.level))}),Te("#levelContent").addEventListener("click",n=>{let e=n.target.closest("button");if(!(!e||z.busy)){if(e.dataset.checkpoint!==void 0){z.checkpoint=Number(e.dataset.checkpoint),An(),z.world?.focus(z.level,!0),Te("#levelPanel").scrollTop=0;return}switch(e.dataset.action){case"overview":z.checkpoint=null,An(),z.world?.focus(z.level);break;case"enter":{let t=Tt[z.level].checkpoints;z.checkpoint=Math.max(0,t.findIndex(i=>Da(Nt(),i,ts).length)),An(),z.world?.focus(z.level,!0);break}case"next":um(z.level+1);break;case"check":ux();break;case"challenge":hx(`Help me resolve the ${Tt[z.level].subject} level. ${_r()?.blockers?.[0]||_r()?.summary||"What evidence am I missing?"}`);break;case"report":H1();break}}}),Te("#levelContent").addEventListener("input",n=>{let e=n.target;if(e.dataset.field)Nt()[ts[e.dataset.field].scope][e.dataset.field]=e.value;else if(e.dataset.proof){let t=Tt[z.level].checkpoints[z.checkpoint].id;Nt().evidence[t]||={},Nt().evidence[t][e.dataset.proof]=e.value}else return;bx()}),Te("#levelContent").addEventListener("submit",n=>{n.preventDefault(),ux()}),Te("#newCandidate").addEventListener("click",()=>{if(z.busy||Lt?.isBusy())return;if(z.candidates.length>=4){Pt("Keep up to four active properties. Export and reset one to start another.");return}let n=gl();z.candidates.push(n),pl(n.id)}),Te("#compareButton").addEventListener("click",V1),Te("#assistantButton").addEventListener("click",()=>hx()),Te("#exportButton").addEventListener("click",dx),Te("#resetButton").addEventListener("click",()=>{z.busy||Lt?.isBusy()||xx("Reset this property?",`<p>This clears the selected property's inputs, checkpoint notes, browser chat and local report. Other properties and your account history remain available.</p><div class="dialog-actions"><button class="secondary-button" data-dialog-action="cancel">Keep my progress</button><button class="primary-button" data-dialog-action="reset">Clear this property</button></div>`)}),Te("#dialogClose").addEventListener("click",()=>{window.speechSynthesis?.cancel(),Te("#workspaceDialog").close()}),Te("#workspaceDialog").addEventListener("close",()=>window.speechSynthesis?.cancel()),Te("#dialogContent").addEventListener("click",n=>{let e=n.target.closest("button");if(e){if(e.dataset.switch&&!z.busy&&(Te("#workspaceDialog").close(),pl(e.dataset.switch)),e.dataset.dialogAction==="cancel"&&Te("#workspaceDialog").close(),e.dataset.dialogAction==="reset"&&!z.busy){let t=z.candidates.findIndex(i=>i.id===z.active);z.candidates[t]=gl(),Te("#workspaceDialog").close(),pl(z.candidates[t].id)}e.dataset.dialogAction==="export"&&dx(),e.dataset.dialogAction==="print"&&window.print()}}),Te("#resetView").addEventListener("click",()=>z.world?.overview()),Te("#motionToggle").addEventListener("click",()=>{z.paused=!z.paused,z.world?.pause(z.paused),ml()}),Te("#mapToggle").addEventListener("click",()=>{z.flat=!z.flat,document.body.classList.toggle("flat-view",z.flat),z.world?.flat(z.flat),ml()}),vx.addEventListener("change",n=>{z.paused=n.matches,z.world?.pause(z.paused),ml()}),window.addEventListener("pagehide",()=>{Li(),window.speechSynthesis?.cancel(),z.world?.dispose()}),window.addEventListener("pageshow",n=>{n.persisted&&location.reload()})}function ml(){Te("#motionToggle").textContent=z.paused?"Resume motion":"Pause motion",Te("#motionToggle").setAttribute("aria-pressed",String(z.paused)),Te("#mapToggle").textContent=z.flat?"3D view":"List view",Te("#mapToggle").setAttribute("aria-pressed",String(z.flat))}function px(n){z.userId=n||null,z.storageKey=`apex.journey.v1:${n||`guest-${es}`}`;let e=vl.read(z.storageKey,{});z.candidates=(Array.isArray(e.candidates)?e.candidates:[]).filter(t=>t&&typeof t.id=="string"&&t.dealCard&&t.financialProfile&&t.evidence).slice(0,4).map(t=>({...t,chat:Array.isArray(t.chat)?t.chat.slice(-40):[]})),z.candidates.length||z.candidates.push(gl()),z.active=z.candidates.some(t=>t.id===e.active)?e.active:z.candidates[0].id,z.level=0,z.checkpoint=null,z.evaluation=null,z.revision++}function fx(){z.world||cx||(cx=!0,Dv({selectLevel:um,notify:Pt,reducedMotion:z.paused}).then(n=>{z.world=n,n.pause(z.paused||document.body.classList.contains("workspace-active")||document.body.classList.contains("assistant-active")),Rs(),ml()}).catch(()=>{document.body.classList.add("flat-view"),Te("#worldLoading").hidden=!0,Pt("The illustrated map is available while 3D is unavailable. Your checkpoint forms still work.")}))}async function G1(){ts=await vd("/journey/fields.json",null,2e4);let n;try{n=(await vd("/api/auth/me",null,12e3)).user}catch{Pt("Account connection is unavailable. The journey will use this browser's guest space.")}px(n?.id),Lt=lx({getCandidate:Nt,notify:Pt,onVisibility(e){z.world?.pause(e||z.paused),e||(fx(),An(),fl().then(()=>{dm(z.level)||(z.level=0,z.checkpoint=null),An()}).catch(t=>Pt(t.message)))}}),hl=Uv({openTool:e=>Lt.open(e),notify:Pt,useProperty(e){if(!e?.selected)return;let t=z.candidates.find(i=>i.investigationId===e.id);if(!t){let i=z.candidates.findIndex(s=>!Object.keys(s.dealCard).length&&!Object.keys(s.financialProfile).length&&!s.messages?.length);if(z.candidates.length>=4&&i<0){Pt("Export and reset an unused tool property slot first. Your investigation remains saved.",!0);return}t={...gl(),investigationId:e.id,dealCard:{...e.selected.dealCard}},i>=0?z.candidates[i]=t:z.candidates.push(t)}z.active=t.id,z.evaluation=null,z.level=0,z.checkpoint=null,z.revision++,Lt.setCandidate(Nt()),Li(),La(),An(),Rs()}}),document.addEventListener("apex:leave-assistant",()=>hl.hide()),document.querySelector('[data-area="assistant"]').addEventListener("click",()=>{if(Lt.isBusy()||z.busy){Pt("Let the current tool request finish first.");return}hl.show(),z.world?.pause(!0)}),document.addEventListener("apex:context",e=>{let t=e.detail,i=Nt();if(t.candidateId!==i.id)return;let s=JSON.stringify(i.dealCard)!==JSON.stringify(t.dealCard)||JSON.stringify(i.financialProfile)!==JSON.stringify(t.financialProfile);i.dealCard=t.dealCard,i.financialProfile=t.financialProfile,i.dcfContext=t.dcfContext,t.sessionId!==void 0&&(i.sessionId!==t.sessionId&&(i.report=null),i.sessionId=t.sessionId),t.messages&&(i.messages=t.messages.slice(-40)),s?bx():Li(),t.report&&(i.report=t.report,Li())}),document.addEventListener("apex:busy",e=>{for(let t of["candidateSelect","newCandidate","compareButton"])Te("#"+t).disabled=e.detail}),document.addEventListener("apex:recover-draft",e=>{if(z.busy||Lt.isBusy())return;let t=z.candidates.findIndex(s=>!Object.keys(s.dealCard).length&&!Object.keys(s.financialProfile).length&&!Object.keys(s.evidence).length&&!s.messages?.length&&!s.chat?.length);if(z.candidates.length>=4&&t<0){Pt("Export and reset an unused property before recovering another draft.");return}let i=gl();for(let[s,r]of Object.entries(ts)){let a=e.detail?.[r.scope]?.[s];(typeof a=="string"||typeof a=="number")&&(i[r.scope][s]=String(a).slice(0,500))}t>=0?z.candidates[t]=i:z.candidates.push(i),pl(i.id).then(()=>Lt.open("deal"));try{localStorage.setItem("apex.workspace.recovered","true")}catch{}document.querySelector(".draft-recovery")?.remove(),Pt("Earlier inputs recovered as a separate property. Recheck the evidence before proceeding.")}),document.addEventListener("apex:auth",e=>{let t=e.detail?.id||null;z.userId!==t&&(Li(),px(t),Lt.setCandidate(Nt()),La(),An(),Rs(),Li(),fl().then(An).catch(i=>Pt(i.message)))}),La(),An(),Rs(),ml(),z1(),Li();try{await fl(),An()}catch(e){Pt(e.message,!0)}document.body.dataset.ready="true",!location.hash||location.hash==="#assistant"?hl.show():location.hash==="#journey"?(hl.hide(),fx()):Lt.restoreRoute()}G1().catch(n=>{Pt(`The journey could not finish loading: ${n.message}. Please reload to reconnect. Your saved property data is retained.`,!0)});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
