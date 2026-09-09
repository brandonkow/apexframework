var Ix=Object.defineProperty;var Px=(n,e)=>()=>(n&&(e=n(n=0)),e);var Lx=(n,e)=>{for(var t in e)Ix(n,t,{get:e[t],enumerable:!0})};var cx={};Lx(cx,{initializeFeatures:()=>k1,openWorkspaceFeature:()=>B1,setWorkspaceCandidate:()=>F1,workspaceBusy:()=>U1});function Wu(n={}){qo&&document.dispatchEvent(new CustomEvent("apex:context",{detail:{candidateId:qo,dealCard:ts(),financialProfile:Pa(),dcfContext:vd(),...n}}))}function tn(n){document.dispatchEvent(new CustomEvent("apex:surface",{detail:n}))}function Yt(n){Tn=n,document.dispatchEvent(new CustomEvent("apex:busy",{detail:Tn})),Mn.disabled=n,NM.disabled=n,Bo.disabled=n,Kn.disabled=n,cy.disabled=n,ju.disabled=n,my.disabled=n,Ki&&(Ki.disabled=n)}function ul(){try{let n=JSON.parse(window.localStorage.getItem("apex.journey.client"));if(/^[A-Za-z0-9_-]{16,128}$/.test(n||""))return n}catch{}return qo||crypto.randomUUID()}function Ii(n){return String(n??"").replace(/EstateLab/gi,"Apex Analytic").replace(/Jarvis/gi,"Apex")}function p(n){return Ii(n).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[e])}function be(n,e){let t={"System ready":"Ready","Connection issue":"Offline","Voice interrupted":"Voice issue",Resetting:"Starting"}[n]||n;OM.innerHTML=`<i></i> ${p(t).toUpperCase()}`,DM.textContent=e,document.querySelector("#conversation").hidden&&/Connection issue|Voice interrupted/.test(n)&&document.dispatchEvent(new CustomEvent("apex:notice",{detail:e}))}function Is(n){kM.textContent=n}function ub(n){let e=String(n||"").toLowerCase();return e.trim()?/\b(compare|comparison|versus| vs |which one|option a|option b|better between)\b/.test(` ${e} `)?{id:"compare",...dr.compare}:/\b(offer|negotiate|negotiation|booking|walk.?away|counter.?offer|asking price|max price)\b/.test(e)?{id:"offer",...dr.offer}:/\b(checklist|check list|steps|to.?do|action list|what next|next actions)\b/.test(e)?{id:"checklist",...dr.checklist}:/\b(voice|read|earphone|summary|short answer|brief)\b/.test(e)?{id:"voice",...dr.voice}:/\b(buy|purchase|deal|invest|shortlist|screen|condo|apartment|property|rent|rental|yield|price)\b/.test(e)?{id:"screen",...dr.screen}:{id:"chat",...dr.chat}:{id:"chat",...dr.chat}}function sd(n=Mn.value){let e=ub(n);return Sp&&(Sp.textContent=e.label,Sp.title=e.prompt),Su.dataset.inputMode=e.id,Su.setAttribute("aria-label",e.prompt),Mn.placeholder=e.placeholder,e}function gA(n){let e=Ii(n).replace(/\s+/g," ").trim();if(e.length<=520)return e;let t=e.match(/[^.!?]+[.!?]?/g)||[e],i="";for(let s of t){let r=`${i} ${s}`.trim();if(r.length>420)break;i=r}return`${i||e.slice(0,420)} Full answer is on screen.`}function rd(){try{let n=JSON.parse(window.localStorage.getItem(nb)||"[]");return Array.isArray(n)?n.slice(0,12):[]}catch{return[]}}function vA(n=[]){window.localStorage.setItem(nb,JSON.stringify(n.slice(0,12)))}function yA(){let n=rd();if(!n.length)return"";let e=n[0],t=Wf.map(i=>{let s=n.filter(r=>r.value===i.id).length;return s?`${i.label}: ${s}`:""}).filter(Boolean).join(", ");return[e?.note?`Latest feedback: ${e.note}`:"",t?`Recent feedback pattern: ${t}.`:""].filter(Boolean).join(" ")}function bA(n){if(!n)return"";let e=rd().find(t=>t.messageId===n)?.value||"";return`
    <section class="responseFeedback" data-feedback-message="${p(n)}" aria-label="Answer feedback">
      <span>Answer feel</span>
      ${Wf.map(t=>`
        <button type="button" data-response-feedback="${p(t.id)}" class="${e===t.id?"active":""}">
          ${p(t.label)}
        </button>
      `).join("")}
      <button type="button" data-response-refine hidden>REFINE NOW</button>
    </section>
  `}function xA(n={}){let e=Ii(n.refinementSource||n.answer||"").replace(/\s+/g," ").trim();return!e||n.value==="useful"?"":n.value==="shorter"?`Rewrite your previous answer into a short Apex answer: verdict, strongest reason, main risk, and next action only. Keep the same investment judgment unless new evidence is provided. Previous answer: ${e}`:n.value==="warmer"?`Rewrite your previous answer in a more natural mentor-like tone. Keep it human, direct, and calm. Do not weaken the evidence standard or change the verdict. Previous answer: ${e}`:n.value==="evidence"?`For your previous answer, give me the missing-proof checklist only. Separate hard stop, verify next, and optional evidence. Do not change the verdict without new evidence. Previous answer: ${e}`:""}function db(n,e){let t=n?.querySelector("[data-response-refine]");if(!t)return;let i=xA(e);t.hidden=!i,t.disabled=!1,t.setAttribute("data-refinement-prompt",i),t.textContent=e?.value==="evidence"?"PROOF CHECK":"REFINE NOW"}function _A(n){n.querySelectorAll("[data-feedback-message]").forEach(e=>{let t=e.getAttribute("data-feedback-message")||"",i=rd().find(s=>s.messageId===t);i&&db(e,i)})}async function SA(n){if(vt)try{let e=await je("/api/memory/answer-style",{method:"POST",body:JSON.stringify(n)});e?.stored&&!Ta.hidden&&Xf(e.settings||{})}catch{}}function wA(n){let e=n.closest("[data-feedback-message]");if(!e)return;let t=e.getAttribute("data-feedback-message")||"",i=n.getAttribute("data-response-feedback")||"",s=Wf.find(l=>l.id===i);if(!t||!s)return;let r=Ii(e.closest(".message")?.querySelector(".messageText")?.textContent||"").replace(/\s+/g," ").trim(),a={messageId:t,value:i,label:s.label,note:s.note,answer:r.slice(0,180),refinementSource:r.slice(0,900),createdAt:new Date().toISOString()},o=[a,...rd().filter(l=>l.messageId!==t)];vA(o),e.querySelectorAll("[data-response-feedback]").forEach(l=>{l.classList.toggle("active",l===n)}),db(e,a),be("System ready",`Feedback saved. ${s.note}`),SA(a)}async function EA(n){let e=n.getAttribute("data-refinement-prompt")||"";if(e){n.disabled=!0;try{await Na(e)}finally{n.disabled=!1}}}function sl(n){Qi=n==="register"?"register":"login";let e=Qi==="register";uf.textContent=e?"CREATE ACCOUNT":"SIGN IN",$M.hidden=!e,dy.required=e,Pp.autocomplete=e?"new-password":"current-password",Lp.textContent=e?"CREATE ACCOUNT":"SIGN IN",hy.textContent=e?"SIGN IN":"CREATE ACCOUNT",py.hidden=e||!va,_a.textContent=""}function qf(n){pf.hidden=!n,df.hidden=n||!!vt,uf.textContent=n?"RESET PASSWORD":Qi==="register"?"CREATE ACCOUNT":"SIGN IN",ya.textContent="",n&&(wu.value=hf.value.trim(),wu.focus())}function dl(n){vt=n||null,document.dispatchEvent(new CustomEvent("apex:auth",{detail:vt}));let e=!!vt,t=String(vt?.displayName||"GUEST").trim().split(/\s+/)[0];if(FM.textContent=t.slice(0,16).toUpperCase(),df.hidden=e,pf.hidden=!0,HM.hidden=!e,qu.hidden=!e,Yu.hidden=!e,Ku.hidden=!e,QM.hidden=!e,gy.hidden=!e,uf.textContent=e?"ACCOUNT":Qi==="register"?"CREATE ACCOUNT":"SIGN IN",e||(hn(),pn(),fn(),nn(),mn(),gn(),vn(),dn(),Go=null),e){zM.textContent=vt.displayName,GM.textContent=vt.email;let i=va||ob;Gv.textContent=vt.emailVerified?"VERIFIED":i?"UNVERIFIED":"VERIFICATION OPTIONAL",Gv.classList.toggle("verified",!!vt.emailVerified),Eu.hidden=!!vt.emailVerified||!va,Mu.hidden=!!vt.emailVerified||!va,Tu.hidden=!!vt.emailVerified||!va,rC()}Ni()}function Ca(){tn("account"),hn(),pn(),fn(),nn(),mn(),gn(),vn(),dn(),An(),Cn(),cf.hidden=!1,lf.setAttribute("aria-expanded","true"),document.body.classList.add("accountOpen"),dl(vt),vt||hf.focus()}function $n(){cf.hidden=!0,lf.setAttribute("aria-expanded","false"),document.body.classList.remove("accountOpen"),_a.textContent=""}function dn(){Of.hidden=!0,Df.setAttribute("aria-expanded","false"),document.body.classList.remove("trustOpen"),gr="",ad()}function jf(n=""){tn("trust"),gr=n,$n(),hn(),pn(),fn(),nn(),mn(),gn(),vn(),An(),Cn(),Of.hidden=!1,Df.setAttribute("aria-expanded","true"),document.body.classList.add("trustOpen"),ad()}function hb(){try{return JSON.parse(window.localStorage.getItem(Jp)||"null")||null}catch{return window.localStorage.removeItem(Jp),null}}function pb(){return hb()?.version==="v6.1"}function ad(){let n=pb();NT.dataset.state=n?"accepted":"pending",DT.textContent=n?"Boundary acknowledged":"Acknowledgement required",OT.textContent=n?"Formal deal reports can run on this device. Professional review and live evidence still apply.":gr==="deal-analysis"?"Accept this boundary to continue with the formal deal report.":"You can chat freely. Deal reports require this boundary to be accepted first.",Vp.textContent=n?"ACKNOWLEDGED":gr==="deal-analysis"?"ACCEPT & ANALYSE":"I UNDERSTAND",Vp.disabled=n&&!gr}function MA(){window.localStorage.setItem(Jp,JSON.stringify({version:"v6.1",acceptedAt:new Date().toISOString(),scope:"formal-deal-reports"}));let n=gr;gr="",ad(),be("System ready","Trust boundary acknowledged."),n==="deal-analysis"&&(dn(),al())}function TA(n){return pb()?!0:(jf(n),be("Trust boundary","Acknowledge Apex's role before generating a formal report."),!1)}function AA(n){if(!n)return"";let e=new Date(n);return Number.isNaN(e.getTime())?"":new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(e)}function fb(){let n=hb(),e=n?.version==="v6.1",t=AA(n?.acceptedAt);return{status:e?"accepted":"pending",label:e?"BOUNDARY ACCEPTED":"BOUNDARY PENDING",detail:e?`Accepted ${t||"on this device"}. Apex is decision support only; live proof and professional review still apply.`:"Apex is decision support only. Acknowledge the trust boundary before generating new formal reports.",checks:["Not legal, valuation, tax, banking, or financial-planning advice","Verify completed transactions, achieved rent, financing, title/legal, site, and supply evidence","No validation of false documents, hidden cashback, misleading prices, or lender deception"]}}function CA(){let n=fb();return`
    <section class="analysisTrustStamp ${p(n.status)}" aria-label="Report trust boundary">
      <header><small>V6.2 REPORT TRUST STAMP</small><b>${p(n.label)}</b></header>
      <p>${p(n.detail)}</p>
      <div>${n.checks.map(e=>`<span>${p(e)}</span>`).join("")}</div>
    </section>
  `}function RA(){let n=fb();return["Report trust boundary:",`- ${n.label}: ${n.detail}`,...n.checks.map(e=>`- ${e}`)]}function Do(n={},e="",t=[]){let i=Number(n.score||0),s=String(n.status||"").toLowerCase();return t.some(a=>e.includes(a))||!i||i<55||/missing|weak|danger|fail|reject/.test(s)?"required":i<75||/watch|review|partial|unknown/.test(s)?"verify":"ready"}function mb(n={}){let e=o=>Array.isArray(o)?o:o?[o]:[],t=[...e(n.hardStops),...e(n.recommendationBlockers),...e(n.missingEvidence),n.counterThesis||""].join(" ").toLowerCase(),i=Number(n.investorReadiness?.score||0),s=[{role:"Lawyer",label:"Title and transaction",status:Do(n.legalTransactionEvidence,t,["title","caveat","consent","restriction","spa","mot","legal"]),action:"Check title, caveat, restrictions, consent timeline, SPA conditions, outstanding charges, and transaction authority."},{role:"Banker",label:"Financing and valuation",status:Do(n.financingValuationEvidence,t,["loan","valuation","financing","dsr","bank","cashback","cash out"]),action:"Confirm valuation support, loan margin, DSR, disbursement timing, and that the structure does not mislead the lender."},{role:"Valuer / comparable proof",label:"Entry price evidence",status:Do(n.transactionComparableEvidence,t,["transaction","comparable","auction","price","value"]),action:"Verify completed subsale and successful auction comparables. Listing prices should not be treated as proof."},{role:"Management / JMB",label:"Site and building quality",status:Do(n.siteManagementEvidence,t,["management","jmb","lift","leak","defect","resident","site"]),action:"Check arrears, lift waiting time, cleanliness, defect pattern, management response, resident behaviour, and site feel."},{role:"Rental agent / property manager",label:"Achieved rent and tenant demand",status:Do(n.achievedRentalEvidence,t,["rent","tenant","vacancy","furnishing","rental"]),action:"Verify achieved rent, tenant profile, vacancy pressure, furnishing scope, and whether rent can cover recurring holding cost."},{role:"Owner / licensed adviser",label:"Personal affordability",status:i>=75?"ready":i>=55?"verify":"required",action:"Stress-test cash reserve, instalment comfort, life commitments, tax and transaction costs, renovation budget, and holding period."}],r=s.filter(o=>o.status==="required").length,a=s.filter(o=>o.status==="verify").length;return{status:r?"required":a?"verify":"ready",summary:r?`${r} professional review lane${r===1?"":"s"} need attention before commitment.`:a?`${a} review lane${a===1?"":"s"} should be verified before money moves.`:"Core professional review lanes look ready, subject to live evidence.",items:s}}function IA(n={}){let e=mb(n);return`
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
  `}function PA(n={}){let e=mb(n);return["Professional review checklist:",`- ${e.summary}`,...e.items.map(t=>`- ${t.role} / ${t.label} / ${t.status}: ${t.action}`)]}function Zi(n){return Array.isArray(n)?n.filter(Boolean):n?[n]:[]}function LA(n={}){return[...Zi(n.hardStops),...Zi(n.recommendationBlockers),...Zi(n.watchouts),...Zi(n.missingEvidence),n.counterThesis,n.challengeMode?.message,n.legalTransactionEvidence?.summary,n.legalTransactionEvidence?.transactionPosition,n.financingValuationEvidence?.summary,n.financingValuationEvidence?.affordabilityPosition,n.siteManagementEvidence?.summary].filter(Boolean).join(" ").toLowerCase()}function Ap(n={}){let e=String(n.status||"").toLowerCase(),t=Number(n.score||0);return/unsafe|danger|blocked|fail|reject/.test(e)||t>0&&t<25}function od(n={}){let e=LA(n),t=[],i=(a,o,l)=>{t.some(c=>c.label===o)||t.push({level:a,label:o,action:l})};/marked.?up|mark.?up|hidden cashback|cashback|cash back|false document|fake document|mislead|lender deception|side agreement|side payment|direct payment|outside stakeholder|bypass/.test(e)&&i("refuse","Misleading financing or fund-flow risk","Apex will not validate artificial pricing, hidden cashback, false documents, side agreements, or lender deception."),(Ap(n.legalTransactionEvidence)||/caveat|title risk|seller authority|probate|bankrupt|litigation|restriction|consent|stakeholder/.test(e))&&i("refuse","Legal, title, or seller-authority stop","Pause until the lawyer clears title, caveat, restrictions, seller authority, stakeholder flow, arrears, and completion path."),(Ap(n.financingValuationEvidence)||/valuation mismatch|loan rejection|dsr|overleverage|bankability|loan margin/.test(e))&&i("block","Bankability or affordability risk","Do not force the financing. Confirm valuation support, DSR, cash buffer, instalment stress, and clean document readiness."),/bulk purchase|bulk-purchase|many auction|auction cases|investor concentration|airbnb|short.?stay/.test(e)&&i("block","Bulk-purchase or investor-concentration risk","Treat the project as exit-sensitive until ownership mix, auction pressure, resident quality, and rental sustainability are proven."),(Ap(n.siteManagementEvidence)||/management dispute|jmb|self interest|leak|defect|resident behaviour|poor management/.test(e))&&i("block","Project quality or management risk","Do not let cheap entry override poor management, defects, resident issues, or weak site evidence."),(String(n.verdict||"").toUpperCase()==="REJECT"||Zi(n.hardStops).length)&&i("refuse","Hard stop triggered","Resolve or walk away from hard stops before paying, signing, or committing further capital.");let r=t.filter(a=>a.level==="refuse").length?"refuse":t.length?"block":"clear";return{status:r,label:r==="refuse"?"APEX REFUSES VALIDATION":r==="block"?"VALIDATION BLOCKED":"NO UNSAFE STRUCTURE DETECTED",summary:r==="refuse"?"Apex will not validate this deal as structured. Independent legal, financing, and transaction review must clear the issue first.":r==="block"?"Apex cannot support commitment yet. Clear the blocked compliance or evidence lane before treating the deal as investable.":"No compliance-refusal pattern is detected from the supplied inputs. This is not legal clearance.",flags:t.length?t:[{level:"clear",label:"Boundary still applies",action:"Continue to verify live evidence, professional review, and clean financing or legal structure before committing."}]}}function NA(n={}){let e=od(n);return`
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
  `}function DA(n={}){let e=od(n);return["Unsafe deal boundary:",`- ${e.label}: ${e.summary}`,...e.flags.map(t=>`- ${t.level}: ${t.label}. ${t.action}`)]}function gb(n={}){let e=od(n),t=Number(n.confidence||0),i=Number(n.averageScore||0),s=!!(vt&&Go?.plan?.id&&Go.plan.id!=="free"),r=vt?Go?.plan?.name||"Signed-in plan":"Guest / public",a=e.status==="refuse"?"blocked":e.status==="block"||t<50||i<55?"conditional":t>=75&&i>=70?"higher":"moderate";return{status:a,label:a==="blocked"?"Do Not Market As Investable":a==="conditional"?"Conditional Public Confidence":a==="higher"?"Higher Confidence, Still Conditional":"Moderate Public Confidence",planName:r,summary:a==="blocked"?"This report should be treated as a refusal or unresolved-risk record, not a sales or investment endorsement.":"Public confidence is limited by evidence quality, hard-stop status, and professional review. Payment status never upgrades a verdict.",items:[{label:"Payment boundary",body:`${s?`${r} unlocks more workflow capacity.`:`${r} access may be limited.`} Plans affect report access, saved history, and usage limits only; they never improve scores or remove hard stops.`},{label:"Confidence source",body:`Confidence is ${t||0}% and decision score is ${i||0}/100 because of supplied evidence, not because of account status or payment.`},{label:"Public use",body:"Do not present this report as guaranteed return, valuation, legal clearance, loan approval, or personalized licensed financial advice."}]}}function OA(n={}){let e=gb(n);return`
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
  `}function kA(n={}){let e=gb(n);return["Public confidence and monetization guardrails:",`- ${e.label} / ${e.planName}: ${e.summary}`,...e.items.map(t=>`- ${t.label}: ${t.body}`)]}function Oo(n=[],e=/reject|weak|poor|high threat|serious|many|stale|delay|dispute|bad|none|not done|not supplied/i){let t=n.filter(i=>String(i||"").trim());return t.length?t.some(i=>e.test(String(i)))?"watch":"ready":"missing"}function Ss(n=[],e="Not supplied"){let t=n.filter(i=>String(i||"").trim());return t.length?t.join(" / "):e}function vb(n={}){let e=n.context?.dealCard||{},t=n.marketIntelligence||{},i=Array.isArray(t.observations)?t.observations:[],s=Array.isArray(t.trends)?t.trends:[],r=t.summary||{},a={project:e.projectName||"Project not specified",area:e.area||"Area not specified",segment:Ss([e.propertyType,e.propertyAge?`${e.propertyAge} years`:""],"Segment not supplied"),tenure:Ss([e.tenure,e.legalTitleType],"Tenure/title not supplied"),price:Ss([e.askingPrice,e.conservativeFairValue?`value ${e.conservativeFairValue}`:""],"Price/value not supplied")},o=[{label:"Owner observations",value:i.length?`${i.length} matched, ${s.length} trend${s.length===1?"":"s"}`:"No matched project memory",status:i.length?"ready":"missing",action:i.length?"Use the observations as project memory, but check dates and source confidence.":"Add dated owner observations for rent, transaction, occupancy, management, supply, auction, or buyer enquiry."},{label:"Supply moat",value:Ss([e.supplyRadius,e.substituteCount,e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply]),status:Oo([e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply],/high|serious|many|oversupply|vp|unsold|lift|wait|dense|1\.5k/i),action:"Track closest substitutes within 2.5km, VP timing, unsold stock, layout overlap, and lift/density pressure."},{label:"Management culture",value:Ss([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes]),status:Oo([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes],/poor|slow|no reply|arrears|dispute|complaint|bad|leak|defect|arrogant|irresponsible/i),action:"Verify JMB response speed, arrears, resident behaviour, common-area upkeep, defects, and complaint culture."},{label:"Buyer depth",value:Ss([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation]),status:Oo([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation],/investor only|weak|poor|narrow|airbnb|short.?stay|none/i),action:"Confirm the project can appeal to own-stay buyers and investors instead of one narrow exit pool."},{label:"Liquidity proof",value:Ss([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport]),status:Oo([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport],/none|old|stale|listing|weak|mismatch|not done/i),action:"Use completed subsale transactions, successful auction bids, bankability, and matched comparable adjustments before trusting value."},{label:"Rental defence",value:Ss([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal]),status:Oo([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal],/none|weak|stale|vacancy|incentive|seasonal|drop|poor/i),action:"Confirm achieved rent, tenant urgency, furnishing gap, vacancy pressure, and whether rent can defend the instalment."}],l=o.filter(h=>h.status==="missing").length,u=o.filter(h=>h.status==="watch").length?"watch":l>=3?"thin":l?"partial":"tracked",d=e.projectName||e.area||"Development profile";return{status:u,title:d,identity:a,evidence:o,observationCount:i.length,trendCount:s.length,freshness:r.warning||(i.length?"Owner observations matched. Verify freshness before relying on them.":"No dated owner observation matched this project or area yet."),summary:u==="watch"?"Development intelligence has live warning signals. Treat the project profile as a watchlist item until the weak lane is cleared.":u==="tracked"?"Development intelligence is well formed enough for project-level comparison, subject to live verification.":u==="partial"?`Development intelligence is partial. Fill the missing lane${l===1?"":"s"} before treating the project view as mature.`:"Development intelligence is still thin. Apex can screen the deal, but it should not behave like it knows the project deeply yet."}}function UA(n={}){let e=vb(n),t=[["Project",e.identity.project],["Area",e.identity.area],["Segment",e.identity.segment],["Tenure/title",e.identity.tenure],["Price/value",e.identity.price]];return`
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
  `}function FA(n={}){let e=vb(n);return["Development intelligence profile:",`- V7.0 ${e.title} / ${e.status}: ${e.summary}`,`- Identity: ${e.identity.project}; ${e.identity.area}; ${e.identity.segment}; ${e.identity.tenure}; ${e.identity.price}.`,`- Freshness: ${e.freshness}`,...e.evidence.map(t=>`- ${t.label} / ${t.status}: ${t.value}. ${t.action}`)]}function BA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.observationHealth||{};return`
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
  `}function $A(n={}){if(!n.summary)return[];let e=["V7 development intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Build evidence first"}.`,`- Owner observations: ${n.observationHealth?.matched||0} matched, ${n.observationHealth?.fresh||0} fresh, ${n.observationHealth?.aging||0} aging, ${n.observationHealth?.stale||0} stale.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V7 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function VA(n={}){if(!n.summary)return"";let e=Array.isArray(n.cases)?n.cases:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[];return`
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
              <header><span><small>${p([i.area,i.propertyType].filter(Boolean).join(" / ")||"Development case")}</small><b>${p(i.projectName)}</b></span><em>${p(sm(i.verdict))} / ${p(i.confidence||"medium")}</em></header>
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
  `}function HA(n={}){if(!n.summary)return[];let e=["Development case library:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Case-informed, verify live"}.`];for(let t of n.cases||[])e.push(`- ${t.projectName}: ${sm(t.verdict)} / ${t.confidence||"medium"} confidence / ${t.rating||0}/100. ${t.ownerVerdict||t.summary||""}`);if(n.actionQueue?.length){e.push("Case action queue:");for(let t of n.actionQueue)e.push(`- ${t.label}: ${t.action}`)}return e}function zA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.matchedEvidence)?n.matchedEvidence:[],i=Array.isArray(n.actionQueue)?n.actionQueue:[],s=n.vaultHealth||{};return`
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
  `}function GA(n={}){if(!n.summary)return[];let e=["V8 document intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Evidence-building mode"}.`,`- Vault: ${n.vaultHealth?.documents||0} documents, ${n.vaultHealth?.indexed||0} indexed, ${n.vaultHealth?.matched||0} matched, ${n.vaultHealth?.mode||"none"} retrieval.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.matchedEvidence?.length){e.push("Matched owner evidence:");for(let t of n.matchedEvidence)e.push(`- ${t.title}: ${t.preview}`)}if(n.actionQueue?.length){e.push("V8 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function WA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.capitalMap||{};return`
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
  `}function qA(n={}){if(!n.summary)return[];let e=n.capitalMap||{},t=["V9 portfolio command stack:",`- ${n.status||"hold"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Hold and verify"}.`,`- Next move: ${n.nextMove||"Clear the weakest portfolio lane."}`,`- Capital map: cash ${e.cashAvailable||"n/a"}, outlay ${e.cashOutlay||"n/a"}, after purchase ${e.cashAfterPurchase||"n/a"}, reserve ${e.reserveMonths||"n/a"}, DSR ${e.postDealDsr||"n/a"}, holding ${e.holdingCashFlow||"n/a"}, stress ${e.stressedHolding||"n/a"}.`];for(let i of n.lanes||[])t.push(`- ${i.version} ${i.label}: ${i.status}, ${i.score}/100. ${i.reading} Action: ${i.action}`);if(n.actionQueue?.length){t.push("V9 action queue:");for(let i of n.actionQueue)t.push(`- ${i.version} ${i.label}: ${i.action}`)}return t}function jA(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=Array.isArray(n.contradictions)?n.contradictions:[];return`
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
  `}function XA(n={}){if(!n.summary)return[];let e=["V10 final command stack:",`- ${n.command||"INVESTIGATE FIRST"} (${n.score||0}/100): ${n.summary}`,`- Status: ${n.status||"investigate"}.`,`- Next move: ${n.nextMove||"Clear the weakest V10 lane."}`,`- Contradictions: ${n.contradictionCount||0}.`];for(let t of n.contradictions||[])e.push(`- Contradiction: ${t}`);for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V10 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function iy(n){return n==="memory"?"MEMORY":n==="journal"?"JOURNAL":n==="market"?"MARKET":n==="case"?"CASE":n==="saved_report"?"SAVED DEAL":n==="belief"?"BELIEF":n==="decision"?"DECISION":n==="evidence"?"EVIDENCE":n==="research"?"VERIFIED RESEARCH":"REFERENCE"}function yb(n=[]){if(!n.length)return"";let e=n.reduce((a,o)=>{let l=o?.type||"reference";return a[l]=(a[l]||0)+1,a},{}),t=Object.entries(e).map(([a,o])=>`${o} ${iy(a).toLowerCase()}${o===1?"":" sources"}`).slice(0,5).join(" / "),s=n.some(a=>["evidence","market","case","research","saved_report"].includes(a.type))?"Deal-specific or dated evidence matched. Confirm its date, scope, and fit before acting.":"Framework guidance only. No deal-specific market evidence matched this answer.",r=n.slice(0,8).map(a=>`
    <li>
      <span class="sourceType">${p(iy(a.type))}</span>
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
  `}function YA(n={}){if(!n||typeof n!="object")return"";let e=Array.isArray(n.prompts)?n.prompts.slice(0,4):[],t=Array.isArray(n.missing)?n.missing.slice(0,4):[];return!e.length&&!t.length?"":`
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
  `}function KA(n){let t=String(n||"").replace(/^#{1,6}\s*/,"").replace(/^\*{1,2}|\*{1,2}$/g,"").replace(/:$/,"").trim().toLowerCase();return[[/^current view(?:\b|\s*[—-])/,"Current view"],[/^(what supports it|what drives it|reasons|why)$/,"What supports it"],[/^(strongest counter-case|counter-case|what could make it wrong|watch-outs)$/,"Strongest counter-case"],[/^(what would change my mind|what would change the view|evidence gaps|missing evidence)$/,"What would change the view"],[/^(next best move|next move|check next|next steps?)$/,"Next best move"],[/^(questions? for you|my challenge back|questions? that can change the answer)$/,"Questions for you"],[/^(blind spot|alternative angle|blind spot \/ alternative angle|what you may be missing)$/,"Blind spot / alternative angle"]].find(([s])=>s.test(t))?.[1]||""}function JA(n,e=!1){let t=[],i=null,s=()=>{i?.items.length&&t.push(i),i=null};for(let a of n){let o=String(a||"").replace(/\*\*/g,"").trim();if(!o){s();continue}let l=o.match(/^[-*•]\s+(.+)/),c=o.match(/^\d+[.)]\s+(.+)/),u=c?"ol":l?"ul":"p",d=c?.[1]||l?.[1]||o;(!i||i.type!==u)&&(s(),i={type:u,items:[]}),i.items.push(d)}s();let r=!1;return t.map(a=>a.type==="ul"||a.type==="ol"?`<${a.type}>${a.items.map(o=>`<li>${p(o)}</li>`).join("")}</${a.type}>`:a.items.map(o=>{let l=e&&!r?' class="answerLead"':"";return r=!0,`<p${l}>${p(o)}</p>`}).join("")).join("")}function ZA(n){let e=String(n||"").replace(/\r\n/g,`
`).trim().split(`
`),t=[],i={title:"",lines:[]},s=()=>{(i.title||i.lines.some(r=>r.trim()))&&t.push(i),i={title:"",lines:[]}};for(let r of e){let a=KA(r);a?(s(),i.title=a):i.lines.push(r)}return s(),t.map((r,a)=>{let o=JA(r.lines,a===0&&!r.title);return r.title?`<section class="answerSection"><h3>${p(r.title)}</h3>${o}</section>`:`<div class="answerBody">${o}</div>`}).join("")}function bb({mode:n="",provider:e="",model:t=""}={}){return n==="framework"?'<span class="intelligenceBadge framework" title="No external reasoning model generated this response"><i></i>FRAMEWORK ONLY</span>':n!=="llm"?"":'<span class="intelligenceBadge reasoning" title="External AI reasoning was used for this response"><i></i>FRAMEWORK + AI</span>'}function As(n,e,t=[],i={}){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=n==="jarvis"?i?.message?.id||i?.id||`local-${Date.now()}-${Math.random().toString(16).slice(2)}`:"";s.className=`message ${n}`,s.innerHTML=`
    <strong>${n==="jarvis"?"APEX":"YOU"}</strong>
    ${n==="jarvis"?bb(i):""}
    <div class="messageText">${n==="jarvis"?ZA(e):p(e).replace(/\n/g,"<br>")}</div>
    ${n==="jarvis"?yb(t):""}
    ${n==="jarvis"?YA(i.contextCoach):""}
    ${n==="jarvis"?bA(r):""}
  `;let a=s.querySelector(".contextCoach");if(a){let o=document.createElement("details");o.className="response-detail",o.innerHTML="<summary>Context and suggested checks</summary>",a.replaceWith(o),o.append(a)}Gt.append(s),n==="jarvis"&&_A(s),Gt.scrollTop=Gt.scrollHeight}function ma(n,e){if(!e)return"";let t=Array.isArray(e)?e.filter(Boolean).slice(0,2).join("; "):e;return t?`<span><small>${p(n)}</small><b>${p(t)}</b></span>`:""}function QA(n={}){let e=Number(n.approvedCount||0);XM.textContent=e?`${n.investorType||"Profile building"} / ${n.riskStyle||"Needs more memory"}`:"No approved memory yet",YM.textContent=`${Math.max(0,Math.min(100,Number(n.completeness||0)))}%`,KM.textContent=n.summary||"Approve memories to build a private investor profile.",JM.innerHTML=e?[ma("Preferred",n.preferredAssets),ma("Avoid",n.avoidedRisks),ma("Cash flow",n.cashFlowRule),ma("Holding",n.holdingPeriod),ma("Rules",n.investmentRules),ma("Warnings",n.personalWarnings)].filter(Boolean).join(""):""}function eC(n){let e=n.status==="pending";return`
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
  `}function Xf(n={}){let e=!!n.captureEnabled,t=!!n.reasoningEnabled,i=n.answerStyle||{};ef=!0,$o.checked=e,Vo.checked=t,ef=!1;let s=e||t?`Memory ${e?"can suggest items from chat":"will not suggest from chat"}; approved memory ${t?"can guide replies and reports":"will not guide reasoning"}.`:"Memory engine ready. Collection is off.",r=i.feedbackCount?` Answer style memory: ${i.latestLabel||"Learning"} (${i.feedbackCount} saved).`:"";qv.textContent=`${s}${r}`,qv.classList.toggle("active",e||t)}function tC(n={}){let e=Array.isArray(n.items)?n.items:[];Xf(n.settings||n.summary||{}),QA(n.profile||{}),qM.textContent=String(n.summary?.approved||0),jM.textContent=String(n.summary?.pending||0),Au.innerHTML=e.length?e.slice().sort((t,i)=>{let s={pending:0,approved:1};return s[t.status]-s[i.status]||String(i.updatedAt).localeCompare(String(t.updatedAt))}).map(eC).join(""):'<p class="memoryEmpty">No long-term memories yet. Auto-capture is off until you enable it, or you can add one manually above.</p>'}async function ld(){let n=await je("/api/memory");return tC(n),n}function hn(){Ta.hidden=!0,qu.setAttribute("aria-expanded","false"),document.body.classList.remove("memoryOpen")}async function xb(){if(tn("memory"),!vt)return Ca();$n(),pn(),fn(),nn(),mn(),gn(),vn(),dn(),An(),Cn(),Ta.hidden=!1,qu.setAttribute("aria-expanded","true"),document.body.classList.add("memoryOpen"),Au.innerHTML='<p class="memoryEmpty">Loading private memory...</p>';try{await ld()}catch(n){Au.innerHTML=`<p class="memoryEmpty">${p(n.message)}</p>`}}async function nC(n,e){return e==="delete"?(await je(`/api/memory/${encodeURIComponent(n)}`,{method:"DELETE"}),null):je(`/api/memory/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:e})})}async function _b(){if(!ef){$o.disabled=!0,Vo.disabled=!0;try{let n=await je("/api/memory/settings",{method:"PATCH",body:JSON.stringify({captureEnabled:$o.checked,reasoningEnabled:Vo.checked})});Xf(n.settings||{}),be("System ready","Memory settings updated.")}catch(n){be("Connection issue",n.message||"Memory settings could not be updated."),Ta.hidden||await ld().catch(()=>{})}finally{$o.disabled=!1,Vo.disabled=!1}}}async function iC(n){let e=n.getAttribute("data-memory-id"),t=n.getAttribute("data-memory-action");if(!(!e||!t)){n.disabled=!0;try{await nC(e,t),document.querySelectorAll(`[data-memory-item="${CSS.escape(e)}"]`).forEach(i=>i.remove()),Ta.hidden||await ld(),be("System ready",t==="approve"?"Memory approved.":t==="delete"?"Memory forgotten.":"Memory skipped.")}catch(i){be("Connection issue",i.message||"Memory could not be updated."),n.disabled=!1}}}function sC(n){if(!n?.id)return;let e=document.createElement("article");e.className="memorySuggestion",e.setAttribute("data-memory-item",n.id),e.innerHTML=`
    <span><small>${p(n.categoryLabel||"LONG-TERM MEMORY")}</small><b>Remember this?</b></span>
    <p>${p(n.content)}</p>
    <em>${p(n.profileImpact||"Review this before it becomes part of your private profile.")}</em>
    <div class="memoryActions">
      <button type="button" data-memory-action="approve" data-memory-id="${p(n.id)}">KEEP</button>
      <button type="button" data-memory-action="dismiss" data-memory-id="${p(n.id)}">SKIP</button>
    </div>
  `,Gt.append(e),Gt.scrollTop=Gt.scrollHeight}function cd(n){if(!n)return;Go=n,eT.textContent=n.plan.name.toUpperCase(),tT.textContent=`${n.usage.remaining} reports remaining this month`;let t=ku.filter(i=>i.id!=="free"&&i.id!==n.plan.id).filter(i=>i.checkoutAvailable);Xu.innerHTML=t.length?t.map(i=>`<button type="button" data-checkout-plan="${p(i.id)}">${p(i.name.toUpperCase())} / RM${p(i.priceRm)}</button>`).join(""):"<small>UPGRADES READY AFTER CHECKOUT CONFIGURATION</small>",sT.textContent=`${n.plan.name.toUpperCase()} / ${n.usage.remaining} LEFT`,gy.textContent=`${n.plan.name} controls report access, storage, and usage limits only. It never changes scores, hard stops, or recommendations.`}async function rC(){if(!vt)return null;try{let[n,e]=await Promise.all([je("/api/billing/plans"),je("/api/billing/status")]);return ku=n.plans||[],cd(e),e}catch{return Xu.innerHTML="<small>PLAN STATUS UNAVAILABLE</small>",null}}async function aC(n){let e=Xu.querySelector(`[data-checkout-plan="${CSS.escape(n)}"]`);e&&(e.disabled=!0);try{let t=await je("/api/billing/checkout",{method:"POST",body:JSON.stringify({plan:n})});window.location.assign(t.checkoutUrl)}catch(t){be("Connection issue",t.message||"Checkout is not available yet."),e&&(e.disabled=!1)}}function oC(n){let e=n.weakestDimension,t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="reportHistoryItem" data-report-item="${p(n.id)}">
      <header><span><small>${p(n.verdict)} / ${p(t)}</small><b>${p(n.subject)}</b></span><em>${p(n.averageScore)}/100</em></header>
      <p>${e?`Weak link: ${p(e.label)} (${p(e.score)}/100)`:"Evidence details unavailable"}</p>
      <div class="reportHistoryActions">
        <button type="button" data-report-action="view" data-report-id="${p(n.id)}">VIEW</button>
        <button type="button" data-report-action="delete" data-report-id="${p(n.id)}">DELETE</button>
      </div>
    </article>
  `}function Sb(n={}){document.querySelector("#savedReportView").hidden=!0,vr.hidden=!1;let e=Array.isArray(n.reports)?n.reports:[];iT.textContent=String(e.length),vr.innerHTML=e.length?e.map(oC).join(""):'<p class="reportsEmpty">No saved deal reports yet. Signed-in analyses will appear here automatically.</p>',n.billing&&cd(n.billing)}function pn(){mf.hidden=!0,Yu.setAttribute("aria-expanded","false"),document.body.classList.remove("reportsOpen")}async function Yf(){if(tn("reports"),!vt)return Ca();$n(),hn(),fn(),nn(),mn(),gn(),vn(),dn(),An(),Cn(),mf.hidden=!1,Yu.setAttribute("aria-expanded","true"),document.body.classList.add("reportsOpen"),vr.innerHTML='<p class="reportsEmpty">Loading private reports...</p>';try{Sb(await je("/api/reports"))}catch(n){vr.innerHTML=`<p class="reportsEmpty">${p(n.message)}</p>`}}async function lC(n){let e=n.getAttribute("data-report-id"),t=n.getAttribute("data-report-action");if(!(!e||!t||Tn)){Yt(!0),n.disabled=!0;try{if(t==="delete"){await je(`/api/reports/${encodeURIComponent(e)}`,{method:"DELETE"}),Sb(await je("/api/reports"));return}let i=await je(`/api/reports/${encodeURIComponent(e)}`),s=document.querySelector("#savedReportView");vr.hidden=!0,s.hidden=!1,s.innerHTML='<button type="button" data-report-back>Back to saved reports</button>',i.report.analysis.savedReportId=i.report.id,om(i.report.analysis,[],{},s),cd(i.billing),be("System ready",`${i.report.subject} report loaded.`)}catch(i){be("Connection issue",i.message||"The saved report is unavailable."),n.disabled=!1}finally{n.disabled=!1,Yt(!1)}}}function cC(n){let e=n.reviewed?"REVIEWED":n.locked?"LOCKED":"DRAFT",t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="journalItem ${p(e.toLowerCase())}" data-journal-item="${p(n.id)}">
      <header><span><small>${p(e)} / ${p(t)}</small><b>${p(n.subject)}</b></span><em>${p(n.decision)}</em></header>
      <p>${p(n.skillSignal)}</p>
      <div class="journalItemMeta"><span>REPORT ${p(n.snapshotScore)}/100</span><span>CONFIDENCE ${p(n.confidence)}%</span></div>
      <button type="button" data-journal-action="open" data-journal-id="${p(n.id)}">${n.locked?"REVIEW":"EDIT DRAFT"}</button>
    </article>
  `}function uC(n={}){let e=Array.isArray(n.decisions)?n.decisions:[];aT.textContent=String(n.summary?.total||0),oT.textContent=String(n.summary?.reviewed||0),Sa.innerHTML=e.length?e.map(cC).join(""):'<p class="journalEmpty">No decisions recorded yet. Open a saved Deal Report and choose RECORD DECISION.</p>',vy.hidden=!1,Sa.hidden=!1,Op.hidden=!0}function fn(){gf.hidden=!0,Ku.setAttribute("aria-expanded","false"),document.body.classList.remove("journalOpen")}async function Kf(){let n=await je("/api/journal");return uC(n),n}async function ud(n=""){if(tn("journal"),!vt)return Ca();$n(),hn(),pn(),nn(),mn(),gn(),vn(),dn(),An(),Cn(),gf.hidden=!1,Ku.setAttribute("aria-expanded","true"),document.body.classList.add("journalOpen"),Sa.innerHTML='<p class="journalEmpty">Loading private decisions...</p>';try{await Kf(),n&&await wb(n)}catch(e){Sa.innerHTML=`<p class="journalEmpty">${p(e.message)}</p>`}}function dC(n){for(let e of[vf,yf,bf,xf,_f,Sf,wf])e.disabled=n}function dd(n){let e=!!n.lockedAt;ol.value=n.id,cT.textContent=n.subject,vf.value=n.prePurchase.decision,yf.value=n.prePurchase.confidence,bf.value=n.prePurchase.holdingPeriod,xf.value=n.prePurchase.thesis,_f.value=n.prePurchase.counterThesis,Sf.value=n.prePurchase.killCriterion,wf.value=n.prePurchase.notes,yy.value=n.outcome.status==="not_reviewed"?"holding":n.outcome.status,by.value=n.outcome.actualRent,xy.value=n.outcome.currentValue,_y.value=n.outcome.processScore,Sy.value=n.outcome.executionScore,wy.value=n.outcome.outcomeScore,Ey.value=n.outcome.luckScore,My.value=n.outcome.result,Ty.value=n.outcome.lesson,dC(e),uT.hidden=e,Mi.dataset.confirming="false",Mi.textContent="LOCK THESIS",pT.hidden=!e,fT.hidden=!e,Fn.textContent=n.outcome.reviewedAt?`Review saved. ${n.outcome.reviewedAt.slice(0,10)}.`:"",vy.hidden=!0,Sa.hidden=!0,Op.hidden=!1,Op.scrollTop=0}async function wb(n){let e=await je(`/api/journal/${encodeURIComponent(n)}`);return dd(e.decision),e.decision}function Eb(){return{action:"update",decision:vf.value,confidence:yf.value,holdingPeriod:bf.value,thesis:xf.value,counterThesis:_f.value,killCriterion:Sf.value,notes:wf.value}}async function hC(){let n=ol.value;Fn.textContent="Saving draft...";try{let e=await je(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(Eb())});dd(e.decision),Fn.textContent="Draft saved."}catch(e){Fn.textContent=e.message,Mi.textContent="LOCK THESIS"}}async function pC(){let n=ol.value;Fn.textContent="Locking the pre-purchase record...";try{await je(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(Eb())});let e=await je(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"lock"})});dd(e.decision),Fn.textContent="Thesis locked. Future reviews cannot rewrite it."}catch(e){Fn.textContent=e.message,Mi.textContent="LOCK THESIS"}}function fC(){if(Mi.dataset.confirming!=="true"){Mi.dataset.confirming="true",Mi.textContent="CONFIRM LOCK",Fn.textContent="Locking is permanent. Press CONFIRM LOCK to preserve this thesis unchanged.";return}Mi.dataset.confirming="false",Mi.textContent="LOCKING...",pC()}async function mC(){let n=ol.value;Fn.textContent="Saving outcome review...";try{let e=await je(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"review",outcomeStatus:yy.value,actualRent:by.value,currentValue:xy.value,processScore:_y.value,executionScore:Sy.value,outcomeScore:wy.value,luckScore:Ey.value,result:My.value,lesson:Ty.value})});dd(e.decision),Fn.textContent=e.summary.skillSignal}catch(e){Fn.textContent=e.message}}async function gC(){let n=ol.value;Fn.textContent="Deleting draft...";try{await je(`/api/journal/${encodeURIComponent(n)}`,{method:"DELETE"}),await Kf(),be("System ready","Decision draft deleted.")}catch(e){Fn.textContent=e.message}}async function Mb(n){if(!vt)return be("System ready","Sign in to preserve a private decision record."),Ca();if(!n?.savedReportId){be("System ready","Open a saved Deal Report before recording the decision.");return}try{let e=await je("/api/journal",{method:"POST",body:JSON.stringify({reportId:n.savedReportId})});await ud(e.decision.id)}catch(e){be("Connection issue",e.message||"The decision record could not be created.")}}function Jf(){try{let n=JSON.parse(window.localStorage.getItem(tf())||"[]");return Array.isArray(n)?n.slice(0,4):[]}catch{return window.localStorage.removeItem(tf()),[]}}function hd(n){let e=n.slice(0,4);return window.localStorage.setItem(tf(),JSON.stringify(e)),ed.textContent=e.length?`SHORTLIST ${e.length}`:"SHORTLIST",e}function tf(){return vt?`${ny}:${vt.id}`:ny}function Ra(n){let e=n?.context?.dealCard||{};return e.projectName||e.area||"Untitled deal"}function Zf(n){return[...n.dimensions||[]].sort((e,t)=>Number(e.score||0)-Number(t.score||0))[0]||null}function Bu(n){return[...n.hardStops||[],...n.recommendationBlockers||[]].filter(Boolean)}function _u(n){let e=Bu(n).length*18,t=["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?24:0,i=Zf(n),s=i&&Number(i.score||0)<55?10:0;return Math.max(0,Number(n.averageScore||0)-e-t-s)}function vC(n){if(!n.length)return"";let e=n.slice().sort((a,o)=>_u(o)-_u(a)),t=e.filter(a=>!Bu(a).length&&!["REJECT","PAUSE"].includes(String(a.verdict||"").toUpperCase())),i=t[0]||e[0],s=n.filter(a=>Bu(a).length||["REJECT","PAUSE"].includes(String(a.verdict||"").toUpperCase())).length,r=Zf(i);return`
    <section class="shortlistCompare">
      <span><small>APEX COMPARISON</small><b>${p(t.length?"Cleanest current pick":"No clean pick yet")}</b></span>
      <strong>${p(i.subject)}</strong>
      <div>
        <em>${p(_u(i))} adjusted</em>
        <em>${p(s)} blocked</em>
        <em>${p(r?`${r.label}: ${r.score}`:"weak link: n/a")}</em>
      </div>
      <p>${p(t.length?"Compare the adjusted score, then check the weak link before choosing.":"Clear hard stops and decision blockers before treating any shortlisted deal as a contender.")}</p>
    </section>
  `}function yC(n){let e=(n.dimensions||[]).map(l=>`
    <span class="shortlistDimension ${p(l.status)}">
      <small>${p(l.label)}</small><b>${p(l.score)}</b>
    </span>
  `).join(""),t=Zf(n),i=Bu(n),s=n.investorReadiness?.label||"Readiness unknown",r=n.decisionFocus?.body||n.summary||"No decision focus recorded.",a=n.learningLoop?.signals?.length||0;return`
    <article class="shortlistItem ${i.length||["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?"blocked":"clean"}" data-shortlist-item="${p(n.id)}">
      <header><span><small>${p(n.verdict)} / ${p(s)}</small><b>${p(n.subject)}</b></span><em>${p(_u(n))} adj</em></header>
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
  `}function hl(){let n=Jf();hd(n),hA.innerHTML=vC(n),eb.innerHTML=n.length?n.map(yC).join(""):'<p class="shortlistEmpty">No analysed deals saved yet. Run an analysis, then choose SAVE TO SHORTLIST.</p>',tb.hidden=!n.length,Ni()}function An(){Hf.hidden=!0,ed.setAttribute("aria-expanded","false"),document.body.classList.remove("shortlistOpen")}function Qf(){tn("shortlist"),$n(),hn(),pn(),fn(),nn(),mn(),gn(),vn(),dn(),Cn(),hl(),Hf.hidden=!1,ed.setAttribute("aria-expanded","true"),document.body.classList.add("shortlistOpen")}function Tb(n){let e=n?.context?.dealCard||{},t=Ra(n),i=`${t}|${e.askingPrice||""}`.toLowerCase().replace(/[^a-z0-9|]+/g,"-"),s={id:i,subject:t,savedAt:new Date().toISOString(),verdict:n.verdict,summary:n.summary,averageScore:n.averageScore,confidence:n.confidence,dimensions:n.dimensions||[],metrics:n.metrics||[],scenarios:n.scenarios||[],stressEnvelope:n.stressEnvelope||null,acquisitionCostEstimate:n.acquisitionCostEstimate||null,portfolioGate:n.portfolioGate||null,marketPulse:n.marketPulse||null,holdExitPlan:n.holdExitPlan||null,decisionSeal:n.decisionSeal||null,siteVisitAssistant:n.siteVisitAssistant||null,sourcingProfessional:n.sourcingProfessional||null,tenantRentalPlan:n.tenantRentalPlan||null,exitStrategy:n.exitStrategy||null,hardStops:n.hardStops||[],recommendationBlockers:n.recommendationBlockers||[],decisionFocus:n.decisionFocus||null,personalizedChallenge:n.personalizedChallenge||null,dealMemoryComparison:n.dealMemoryComparison||null,beliefTracker:n.beliefTracker||null,sourceTransparency:n.sourceTransparency||null,memoryConflicts:n.memoryConflicts||null,personalOperatingRules:n.personalOperatingRules||null,investorReadiness:n.investorReadiness||null,productExperience:n.productExperience||null,learningLoop:n.learningLoop||null,evidenceEngine:n.evidenceEngine||null,transactionComparableEvidence:n.transactionComparableEvidence||null,achievedRentalEvidence:n.achievedRentalEvidence||null,financingValuationEvidence:n.financingValuationEvidence||null,supplyAbsorptionEvidence:n.supplyAbsorptionEvidence||null,siteManagementEvidence:n.siteManagementEvidence||null,legalTransactionEvidence:n.legalTransactionEvidence||null,developmentIntelligence:n.developmentIntelligence||null,caseIntelligence:n.caseIntelligence||null,documentIntelligence:n.documentIntelligence||null,portfolioCommand:n.portfolioCommand||null,finalCommand:n.finalCommand||null,residentialDcf:n.residentialDcf||null,marketIntelligence:n.marketIntelligence||null,counterThesis:n.counterThesis,context:n.context||{}},r=Jf().filter(a=>a.id!==i);return hd([s,...r]),s}function bC(n){let e=n?.context?.dealCard||{},t=n?.context?.financialProfile||{};for(let s of Cs){let r=s.getAttribute("data-deal-field");s.value=e[r]||""}for(let s of xr){let r=s.getAttribute("data-profile-field");s.value=t[r]||""}zu(Cs,"data-deal-field",zf),zu(xr,"data-profile-field",Gf),An();let i=Ai.find(s=>s.getAttribute("data-context-toggle")==="deal");i&&Ci(i,!0),be("System ready",`${n.subject} loaded for review.`)}function xC(n){let e=n.getAttribute("data-shortlist-id"),t=n.getAttribute("data-shortlist-action"),i=Jf();if(t==="remove"){hd(i.filter(s=>s.id!==e)),hl();return}if(t==="load"){let s=i.find(r=>r.id===e);s&&bC(s)}}function _C(n){if(n){xa?.classList.remove("printTarget"),xa=n,xa.classList.add("printTarget"),document.body.classList.add("printMode");for(let e of n.querySelectorAll("details"))e.dataset.printWasOpen=String(e.open),e.open=!0;window.print()}}function SC(n){let e=["APEX ANALYTIC DEAL REPORT",Ra(n),"",`Verdict: ${n.verdict||"INVESTIGATE"}`,`Confidence: ${n.confidence||0}%`,`Score: ${n.averageScore||0}/100`,`Reasoning: ${n.reasoningMode||"Framework only"}`,"",...RA(),"",...DA(n),"",...PA(n),"",...kA(n),"",...FA(n),"",...$A(n.developmentIntelligence),"",...HA(n.caseIntelligence),"",...GA(n.documentIntelligence),"",...qA(n.portfolioCommand),"",...XA(n.finalCommand),"",`Summary: ${n.summary||""}`];if(n.decisionFocus?.body&&e.push("",`${n.decisionFocus.label||"Decision focus"}: ${n.decisionFocus.body}`),n.residentialDcf&&e.push("",...r1(n.residentialDcf)),n.investorReadiness?.label){e.push("",`Investor readiness: ${n.investorReadiness.label} (${n.investorReadiness.score||0}/100)`),n.investorReadiness.summary&&e.push(n.investorReadiness.summary);for(let t of n.investorReadiness.flags||[])e.push(`- ${t}`)}if(n.productExperience?.summary){e.push("","V5 product experience",`${n.productExperience.mode||"Balanced investor review"} (${n.productExperience.onboardingCompleteness||0}% guidance complete): ${n.productExperience.summary}`,`Style: ${n.productExperience.explanationStyle||"Balanced explanation"}`,`Next best action: ${n.productExperience.nextBestAction||"Complete the missing guidance fields before relying on the report format."}`);for(let t of n.productExperience.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dimensions?.length){e.push("","Scorecard");for(let t of n.dimensions)e.push(`- ${t.label}: ${t.score}/100 (${t.status})`)}if(n.evidenceChecklist?.length){e.push("","Evidence checklist");for(let t of n.evidenceChecklist)e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.evidenceEngine?.summary){e.push("","V4.0 evidence engine",`${n.evidenceEngine.status||"unknown"} (${n.evidenceEngine.score||0}/100): ${n.evidenceEngine.summary}`,`Gate: ${n.evidenceEngine.recommendationGate||"Evidence gate not calculated."}`);for(let t of n.evidenceEngine.criticalGaps||[])e.push(`- Critical gap: ${t}`);for(let t of n.evidenceEngine.gates||[])e.push(`- ${t.label}: ${t.status}, ${t.score}/100. ${t.action}`)}if(n.transactionComparableEvidence?.summary){e.push("","V4.1 transaction comparable evidence",`${n.transactionComparableEvidence.status||"unknown"} (${n.transactionComparableEvidence.score||0}/100): ${n.transactionComparableEvidence.summary}`,`Value position: ${n.transactionComparableEvidence.valuePosition||"Not calculated."}`);for(let t of n.transactionComparableEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.achievedRentalEvidence?.summary){e.push("","V4.2 achieved rental evidence",`${n.achievedRentalEvidence.status||"unknown"} (${n.achievedRentalEvidence.score||0}/100): ${n.achievedRentalEvidence.summary}`,`Coverage: ${n.achievedRentalEvidence.coveragePosition||"Not calculated."}`);for(let t of n.achievedRentalEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.financingValuationEvidence?.summary){e.push("","V4.3 financing and valuation evidence",`${n.financingValuationEvidence.status||"unknown"} (${n.financingValuationEvidence.score||0}/100): ${n.financingValuationEvidence.summary}`,`Affordability: ${n.financingValuationEvidence.affordabilityPosition||"Not calculated."}`);for(let t of n.financingValuationEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.supplyAbsorptionEvidence?.summary){e.push("","V4.4 supply and absorption evidence",`${n.supplyAbsorptionEvidence.status||"unknown"} (${n.supplyAbsorptionEvidence.score||0}/100): ${n.supplyAbsorptionEvidence.summary}`,`Competition: ${n.supplyAbsorptionEvidence.competitionPosition||"Not calculated."}`);for(let t of n.supplyAbsorptionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteManagementEvidence?.summary){e.push("","V4.5 site and management evidence",`${n.siteManagementEvidence.status||"unknown"} (${n.siteManagementEvidence.score||0}/100): ${n.siteManagementEvidence.summary}`,`Lived quality: ${n.siteManagementEvidence.livedQualityPosition||"Not calculated."}`);for(let t of n.siteManagementEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.legalTransactionEvidence?.summary){e.push("","V4.6 legal and transaction evidence",`${n.legalTransactionEvidence.status||"unknown"} (${n.legalTransactionEvidence.score||0}/100): ${n.legalTransactionEvidence.summary}`,`Transaction path: ${n.legalTransactionEvidence.transactionPosition||"Not calculated."}`);for(let t of n.legalTransactionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dueDiligencePlan?.tasks?.length){e.push("","Due diligence pack",n.dueDiligencePlan.summary||"");for(let t of n.dueDiligencePlan.tasks)e.push(`- ${t.owner} / ${t.priority} / ${t.status}: ${t.label}. ${t.action}`)}if(n.stressEnvelope?.summary){e.push("","Stress envelope",n.stressEnvelope.summary,`Base true holding: ${n.stressEnvelope.baseTrueHolding}`,`Stressed true holding: ${n.stressEnvelope.stressedTrueHolding}`,`Cash after stress reserves: ${n.stressEnvelope.cashAfterStressReserves}`,`Reserve survival: ${n.stressEnvelope.reserveSurvivalMonths===null?"Not applicable":`${n.stressEnvelope.reserveSurvivalMonths} months`}`);for(let t of n.stressEnvelope.assumptions||[])e.push(`- ${t.label}: ${t.value} (${t.source})`)}if(n.acquisitionCostEstimate?.items?.length){e.push("","Estimated Malaysian entry costs");for(let t of qb(n.acquisitionCostEstimate))e.push(`- ${t}`)}if(n.portfolioGate?.summary){e.push("","Portfolio expansion gate",`${n.portfolioGate.status||"review"} (${n.portfolioGate.score||0}/100): ${n.portfolioGate.summary}`,`Next-property rule: ${n.portfolioGate.nextPropertyRule||"Do not scale until the current property is proven."}`);for(let t of n.portfolioGate.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.marketPulse?.summary){e.push("","Market cycle and liquidity pulse",`${n.marketPulse.status||"watch"}: ${n.marketPulse.summary}`,`Cycle: ${n.marketPulse.cycle||"Cycle unclear"}`,`Liquidity: ${n.marketPulse.liquidity||"Liquidity must be proven"}`);for(let t of n.marketPulse.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.holdExitPlan?.summary){e.push("","Hold, refinance, exit plan",`${n.holdExitPlan.action||"monitor"}: ${n.holdExitPlan.summary}`,`Review cadence: ${n.holdExitPlan.reviewCadence||"Review annually and on trigger events."}`);for(let t of n.holdExitPlan.triggers||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.decisionSeal?.summary){e.push("","V1 decision seal",`${n.decisionSeal.label||"V1 Conditional Only"}: ${n.decisionSeal.summary}`);for(let t of n.decisionSeal.conditions||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteVisitAssistant?.summary){e.push("","V2.1 site visit assistant",`${n.siteVisitAssistant.status||"required"}: ${n.siteVisitAssistant.summary}`,`Focus: ${n.siteVisitAssistant.focus||"Check lived quality on site"}`);for(let t of n.siteVisitAssistant.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourcingProfessional?.summary){e.push("","V2.2 sourcing and professional filter",`${n.sourcingProfessional.status||"verify"}: ${n.sourcingProfessional.summary}`,`Posture: ${n.sourcingProfessional.posture||"Evidence-first sourcing"}`);for(let t of n.sourcingProfessional.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.tenantRentalPlan?.summary){e.push("","V2.3 tenant and rental plan",`${n.tenantRentalPlan.status||"watch"}: ${n.tenantRentalPlan.summary}`,`Target: ${n.tenantRentalPlan.target||"Target tenant not stated"}`);for(let t of n.tenantRentalPlan.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.exitStrategy?.summary){e.push("","V2.4 exit strategy and buyer psychology",`${n.exitStrategy.status||"prepare"}: ${n.exitStrategy.summary}`,`Buyer psychology: ${n.exitStrategy.buyerPsychology||"Buyer objections must be prepared"}`);for(let t of n.exitStrategy.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.executionPlan?.actions?.length){e.push("","Execution calibration",n.executionPlan.summary||"",`Posture: ${n.executionPlan.posture||"Verify before offer"}`,`Opening anchor: ${n.executionPlan.openingAnchor||"Need value proof"}`,`Maximum offer: ${n.executionPlan.maximumOffer||"Need value/rent proof"}`,`Walk-away rule: ${n.executionPlan.walkAway||"Do not proceed under pressure."}`);for(let t of n.executionPlan.actions)e.push(`- ${t.lane} / ${t.status}: ${t.label}. ${t.action}`)}if(n.learningLoop?.signals?.length){e.push("","Learning loop",n.learningLoop.summary||""),n.learningLoop.profile?.approvedCount&&e.push(`Memory profile: ${n.learningLoop.profile.investorType||"Profile building"}; ${n.learningLoop.profile.riskStyle||"Needs more approved memory"}.`,`Profile completeness: ${n.learningLoop.profile.completeness||0}%.`);for(let t of n.learningLoop.signals)e.push(`- ${t.label}: ${t.body} ${t.action}`)}if(n.personalizedChallenge?.message){e.push("",`V3.3 personalized challenge: ${n.personalizedChallenge.label||"Personalized challenge"}`,`- ${n.personalizedChallenge.message}`);for(let t of n.personalizedChallenge.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dealMemoryComparison?.summary){e.push("","V3.4 deal memory comparison",`${n.dealMemoryComparison.status||"none"}: ${n.dealMemoryComparison.summary}`);for(let t of n.dealMemoryComparison.matches||[])e.push(`- ${t.subject}: ${t.similarity}% similar, ${t.verdict}. ${t.reason} ${t.action}`)}if(n.beliefTracker?.summary){e.push("","V3.5 belief tracker",`${n.beliefTracker.status||"inactive"}: ${n.beliefTracker.summary}`);for(let t of n.beliefTracker.beliefs||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourceTransparency?.summary){e.push("","V3.6 source transparency",`${n.sourceTransparency.mode||n.reasoningMode||"Framework only"}: ${n.sourceTransparency.summary}`);for(let t of n.sourceTransparency.sources||[])e.push(`- ${t.label}: ${t.status}. ${t.detail}`)}if(n.memoryConflicts?.summary){e.push("","V3.7 memory conflicts",`${n.memoryConflicts.status||"inactive"}: ${n.memoryConflicts.summary}`);for(let t of n.memoryConflicts.conflicts||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.personalOperatingRules?.summary){e.push("","V3.8 personal operating rules",`${n.personalOperatingRules.status||"check"}: ${n.personalOperatingRules.summary}`);for(let t of n.personalOperatingRules.rules||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}return n.hardStops?.length&&e.push("","Hard stops",...n.hardStops.map(t=>`- ${t}`)),n.recommendationBlockers?.length&&e.push("","Decision blockers",...n.recommendationBlockers.map(t=>`- ${t}`)),n.watchouts?.length&&e.push("","Watch-outs",...n.watchouts.map(t=>`- ${t}`)),n.nextActions?.length&&e.push("","Check next",...n.nextActions.map(t=>`- ${t}`)),n.counterThesis&&e.push("",`Strongest counter-thesis: ${n.counterThesis}`),Ii(e.join(`
`))}async function em(n){try{await navigator.clipboard.writeText(n)}catch{let e=document.createElement("textarea");e.value=n,e.setAttribute("readonly",""),e.style.position="fixed",e.style.opacity="0",document.body.append(e),e.select(),document.execCommand("copy"),e.remove()}}function wC(n){return String(n||"").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function sy(n,e={},t=10){let i=Object.entries(e).filter(([,s])=>String(s||"").trim()).slice(0,t);return i.length?[`${n}:`,...i.map(([s,r])=>`- ${wC(s)}: ${String(r).trim()}`)]:[`${n}: not supplied`]}function EC(){return["Readiness:",...[{panelName:"deal",label:"Deal"},{panelName:"profile",label:"Profile"},{panelName:"guidance",label:"Guidance"}].map(n=>{let e=rl(n.panelName);return`- ${n.label}: ${e.percent}%${e.missing.length?`, missing ${e.missing.slice(0,3).join(", ")}`:", ready enough"}`})]}function Ab(n){let e=Array.from(Gt.querySelectorAll(n)).pop();return Ii(e?.textContent||"").replace(/\s+/g," ").trim()}function MC(){let n=Array.from(Gt.querySelectorAll(".analysisMessage")).pop(),e=ll.get(n?.dataset.analysisId);if(e)return["Latest Apex direction:",`- Subject: ${Ra(e)}`,`- Verdict: ${e.verdict||"INVESTIGATE"} (${e.confidence||0}% confidence, ${e.averageScore||0}/100 score)`,e.summary?`- Summary: ${e.summary}`:"",e.counterThesis?`- Counter-thesis: ${e.counterThesis}`:"",...(e.nextActions||[]).slice(0,3).map(i=>`- Next: ${i}`)].filter(Boolean);let t=Ab(".message.jarvis .messageText");return t?["Latest Apex direction:",`- ${t.slice(0,700)}`]:["Latest Apex direction: no Apex answer yet"]}function TC(){let n=ts(),e=Pa(),t=Ab(".message.user .messageText"),i=["APEX ANALYTIC SESSION BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",t?`Latest user question: ${t.slice(0,500)}`:"Latest user question: not supplied","",...EC(),"",...sy("Deal context",n,12),"",...sy("Profile and guidance context",e,12),"",...MC(),"","Use this brief as context only. Re-check live transaction, rental, financing, legal, supply, and site evidence before deciding."];return Ii(i.filter(s=>s!==void 0).join(`
`))}async function Cb(n=Ip){let e=TC();if(await em(e),n){let t=n.textContent;n.textContent="COPIED",window.setTimeout(()=>{n.textContent=t||"BRIEF"},1200)}be("System ready","Session brief copied.")}async function AC(n,e){let t=SC(e);await em(t),n.textContent="COPIED",be("System ready","Report copied.")}function CC(){for(let n of xa?.querySelectorAll("details[data-print-was-open]")||[])n.open=n.dataset.printWasOpen==="true",delete n.dataset.printWasOpen;xa?.classList.remove("printTarget"),xa=null,document.body.classList.remove("printMode")}function RC(n){let e=n.closest(".analysisMessage"),t=ll.get(e?.dataset.analysisId);if(!e||!t)return;let i=n.getAttribute("data-analysis-action");if(i==="report"){_C(e);return}if(i==="copy"){AC(n,t);return}if(i==="shortlist"){Tb(t),n.textContent="SAVED",be("System ready",`${Ra(t)} saved to your shortlist.`),Ni();return}if(i==="dcf"&&t.residentialDcf?.status!=="incomplete"){lm(t.residentialDcf);return}i==="journal"&&Mb(t)}function Rb(n){let e=Ai.find(t=>t.getAttribute("data-context-toggle")===n);e&&Ci(e,!0),Qb(n)}function IC(n){let e=n?.getAttribute("data-journey-action");if(e){if(e==="deal"||e==="profile"||e==="guidance"){Rb(e);return}if(e==="screen"){ix();return}if(e==="analyze"){al();return}if(e==="save"){let t=af();if(!t)return void al();Tb(t),hl(),be("System ready",`${Ra(t)} saved to your shortlist.`);return}if(e==="shortlist"){Qf();return}if(e==="journal"){let t=af();t?Mb(t):ud();return}if(e==="reports"){Yf();return}e==="brief"&&Cb()}}function pd(){return jo.value.trim()||window.localStorage.getItem(Rs)||""}function Ib(){return Qo.value.trim()||pd()}function Pb(){return Xo.value.trim()||pd()}function Tt(n,e=""){ey.textContent=n||"",ey.dataset.tone=e}function Kt(n,e=""){Jv.textContent=n||"",Jv.dataset.tone=e}function Bn(n,e=""){Zv.textContent=n||"",Zv.dataset.tone=e}function Ve(n,e=""){Xv.textContent=n||"",Xv.dataset.tone=e}function Jn(n){let e=String(n||"").trim();di.value=e,jo.value=e,Xo.value=e,Qo.value=e,e?window.localStorage.setItem(Rs,e):window.localStorage.removeItem(Rs)}function Pi(){return di.value.trim()||window.localStorage.getItem(Rs)||""}async function wt(n,e={}){let t=Pi();if(!t)throw new Error("Paste and save the owner token first.");return je(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function Yn(n="",e=""){Kv.textContent=n,Kv.dataset.tone=e}function PC(n){let e=n.summary||{},t=e.pipelinePressure!==null&&e.pipelinePressure!==void 0&&Number.isFinite(Number(e.pipelinePressure))?`${Math.round(Number(e.pipelinePressure)*100)}% pipeline`:"pipeline unavailable";return`
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
  `}function $u(n={}){ga=Array.isArray(n.studies)?n.studies:[],TT.textContent=`${ga.length} stud${ga.length===1?"y":"ies"}`,Ry.innerHTML=ga.length?ga.map(PC).join(""):'<p class="ownerIntelEmpty">No validated research study has been imported yet.</p>'}async function tm(){if(!Pi())return $u(),Yn("Owner token required.","warning"),{studies:[],summary:{}};Yn("Loading validated research...");let n=await wt("/api/owner/research/studies");return $u(n),Yn(`${n.summary?.evidenceRecords||0} evidence records available to retrieval.`),n}async function Lb(n,e=!1){Yn(e?"Replacing validated research study...":"Validating and importing research study...");let t=await wt(`/api/owner/research/studies/import${e?"?replace=true":""}`,{method:"POST",body:JSON.stringify(n)});nl=null,Zu.hidden=!0,await tm(),Yn(`${t.study?.title||"Research study"} ${t.replaced?"replaced":"imported"}.`)}async function LC(n){if(!n)return;let e;try{e=JSON.parse(await n.text())}catch{throw new Error("Research import must be a valid JSON bundle.")}finally{Iu.value=""}let t=String(e?.study_config?.study_id||"").trim();if(t&&ga.some(i=>i.id===t)){nl=e,Zu.hidden=!1,Yn(`Study ${t} already exists. Review the new cut-off, then use REPLACE STUDY.`,"warning");return}await Lb(e,!1)}async function NC(n){n&&(Yn(`Deleting ${n}...`,"warning"),await wt(`/api/owner/research/studies/${encodeURIComponent(n)}`,{method:"DELETE"}),await tm(),Yn("Research study deleted.","warning"))}async function Ma(n,e={}){let t=pd();if(!t)throw new Error("Paste and save the owner token first.");return je(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function ry(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Cp(n="",e={}){let t=ry(n);return t?[e.name,e.area,...e.aliases||[]].map(ry).filter(Boolean).some(i=>t.includes(i)||i.includes(t)):!1}function DC(n=[],e=[],t=[],i=[]){return n.map(s=>{let r=e.filter(v=>v.projectId===s.id||Cp(`${v.projectName} ${v.area}`,s)),a=t.filter(v=>v.projectId===s.id||Cp(`${v.projectName||v.project?.name||""} ${v.area||v.project?.area||""}`,s)),o=i.filter(v=>Cp(`${v.title} ${v.filename} ${(v.tags||[]).join(" ")}`,s)),l=a.filter(v=>v.freshness?.status==="stale").length,c=!!r.length,u=a.some(v=>v.freshness?.status==="fresh"),d=!!o.length,h=[c?"":"case",u?"":"fresh signal",d?"":"evidence"].filter(Boolean),m=c?l?"stale":u&&d?"ready":"partial":"missing";return{project:s,cases:r.length,observations:a.length,evidence:o.length,stale:l,missing:h,status:m}})}function OC(){try{return JSON.parse(window.localStorage.getItem(sb)||"null")||null}catch{return null}}function kC(n={}){let e=n.contentVersion?.hash||n.integrity?.hash||"",t={exportedAt:n.exportedAt||new Date().toISOString(),versionHash:e,versionShort:e?e.slice(0,12):"",counts:n.counts||{}};return window.localStorage.setItem(sb,JSON.stringify(t)),t}function UC(n="",e={}){if(e?.status&&e.status!=="missing")return{status:e.status==="ready"?"ready":"warning",label:e.label||"Server backup record",action:e.action||"Server backup ledger is tracking owner exports."};let t=OC();if(!t?.exportedAt)return{status:"missing",label:"No local backup",action:"Download a backup after major owner-knowledge edits."};let i=Math.floor((Date.now()-Date.parse(t.exportedAt))/864e5);return n&&t.versionHash&&t.versionHash!==n?{status:"warning",label:"Backup outdated",action:"Current owner data changed after the last downloaded backup."}:Number.isFinite(i)&&i>14?{status:"warning",label:`${i} days old`,action:"Download a fresh backup this week."}:{status:"ready",label:t.versionShort?`Saved ${t.versionShort}`:"Backup recent",action:"Local backup marker matches the current browser record."}}function hr(n,e,t,i){return`
    <article class="${p(t)}">
      <small>${p(n)}</small>
      <b>${p(e)}</b>
      <p>${p(i)}</p>
    </article>
  `}function _r(n=""){return n==="ready"?"READY":n==="missing"?"BLOCKED":n==="warning"?"CHECK":"UNKNOWN"}function FC(n={}){return`
    <article class="${p(n.status||"warning")}">
      <small>${p(n.label||"Ops check")}</small>
      <b>${p(_r(n.status))}</b>
      <p>${p(n.detail||"Status unavailable.")}</p>
      ${n.action?`<em>${p(n.action)}</em>`:""}
    </article>
  `}function Nb(n={}){let e=Array.isArray(n.checks)?n.checks:[];if(!e.length){jv.innerHTML='<article class="warning"><small>PRODUCTION OPS</small><b>Token required</b><p>Load the owner console to check storage, AI, billing, backup, and launch readiness.</p></article>';return}let t=n.summary||{};jv.innerHTML=`
    <article class="ownerIntelOpsLead ${p(n.status||"warning")}">
      <small>PRODUCTION OPS</small>
      <b>${p(_r(n.status))}</b>
      <p>${p(t.ready||0)} ready / ${p(t.warning||0)} warning / ${p(t.missing||0)} blocked</p>
      <em>${p(n.generatedAt||"")}</em>
    </article>
    ${e.map(FC).join("")}
  `}function BC(n=[]){if(!n.length)return 0;let e=n.reduce((t,i)=>{let s=(i.cases?38:0)+(i.observations?18:0)+(i.observations&&!i.stale?17:0)+(i.evidence?27:0);return t+Math.max(0,Math.min(100,s-(i.stale?12:0)))},0);return Math.round(e/n.length)}function Db(n=[]){let e={missing:0,stale:1,partial:2,ready:3};return[...n].sort((t,i)=>e[t.status]-e[i.status]||i.missing.length-t.missing.length)}function $C(n=[]){let e=Db(n);return el==="all"?e:e.filter(t=>t.status===el)}function Ob(n=[]){let e=$C(n);Ay.querySelectorAll("[data-owner-intel-filter]").forEach(t=>{let i=t.getAttribute("data-owner-intel-filter")===el;t.setAttribute("aria-pressed",i?"true":"false")}),Mf.innerHTML=e.length?e.slice(0,10).map(VC).join(""):n.length?`<p class="ownerIntelEmpty">No ${p(el)} projects in the current owner coverage view.</p>`:'<p class="ownerIntelEmpty">No projects loaded yet. Start by adding tracked projects in the Market console.</p>'}function VC(n){let e=[n.project.area,n.project.state,n.project.propertyType].filter(Boolean).join(" / ")||"No project detail";return`
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
  `}function HC(){let n=tl||{},e=Db(n.rows||[]),t=n.score||0,i=n.ops||{},r=(Array.isArray(i.checks)?i.checks:[]).filter(o=>o.status!=="ready"),a=["APEX OWNER INTELLIGENCE BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",`Coverage score: ${t}%`,`Production ops: ${_r(i.status)} (${i.summary?.ready||0} ready / ${i.summary?.warning||0} warning / ${i.summary?.missing||0} blocked)`,`Projects: ${n.projectCount||0}`,`Cases: ${n.caseCount||0}`,`Observations: ${n.observationCount||0}`,`Evidence documents: ${n.documentCount||0}`,`Validated research studies: ${n.researchStudyCount||0}`,`Complete projects: ${n.complete||0}`,"","Production gaps:",...r.length?r.slice(0,8).map(o=>`- ${o.label}: ${_r(o.status)} / ${o.action||o.detail||"Review required."}`):["- None loaded or all clear."],"","Priority gaps:",...e.length?e.slice(0,10).map(o=>{let l=o.project?.name||"Unnamed project",c=[o.project?.area,o.project?.state,o.project?.propertyType].filter(Boolean).join(" / ")||"No detail",u=o.missing.length?o.missing.join(", "):"none";return`- ${l} (${c}) / ${o.status}: ${u}; ${o.cases} case, ${o.observations} signal, ${o.evidence} proof, ${o.stale} stale.`}):["- No project coverage loaded yet."],"","Next operating rule: add founder case judgment, fresh dated market signal, and evidence proof for every tracked project before relying on project-aware reasoning."];return Ii(a.join(`
`))}async function zC(){await em(HC());let n=xu.textContent;xu.textContent="COPIED",window.setTimeout(()=>{xu.textContent=n||"COPY BRIEF"},1200),Ve("Owner intelligence brief copied.")}function GC(n,e){let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=n,document.body.append(s),s.click(),s.remove(),URL.revokeObjectURL(i)}async function WC(){if(!Pi())return di.focus();Up.disabled=!0;try{Ve("Preparing owner knowledge backup...");let n=await wt("/api/owner/export?chunks=true"),e=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");GC(`apex-owner-knowledge-${e}.json`,n);let t=kC(n),i="";try{i=` Server ledger: ${(await qC(n)).ledger?.label||"recorded"}.`}catch{i=" Server ledger could not be updated."}Ve(`Owner backup downloaded: ${n.counts?.projects||0} projects, ${n.counts?.observations||0} observations, ${n.counts?.developmentCases||0} cases, ${n.counts?.documents||0} documents, ${n.counts?.chunks||0} chunks. Version ${t.versionShort||"recorded"}.${i}`)}finally{Up.disabled=!1}}async function qC(n={}){return wt("/api/owner/backup/events",{method:"POST",body:JSON.stringify({backupHash:n.integrity?.hash||"",contentVersionHash:n.contentVersion?.hash||"",exportedAt:n.exportedAt||new Date().toISOString(),counts:n.counts||{},source:"owner-console"})})}async function jC(){if(!Pi())return di.focus();Bp.disabled=!0;try{Ve("Checking owner backup reminder...");let n=await wt("/api/owner/backup/reminder",{method:"POST",body:JSON.stringify({force:!1})}),e=n.reminder||{},t=n.sent?"sent":n.skipped?"not sent":"checked";Ve(`Backup reminder ${t}: ${e.message||n.reason||"No reminder needed."}`,n.sent||e.due?"warning":""),await Ls()}finally{Bp.disabled=!1}}async function XC(){if(!Pi())return di.focus();kp.disabled=!0;try{Ve("Checking production operations...");let n=await wt("/api/owner/ops");tl={...tl||{},ops:n},Nb(n),Ve(`Production ops: ${_r(n.status)}. ${n.summary?.ready||0} ready, ${n.summary?.warning||0} warning, ${n.summary?.missing||0} blocked.`,n.status==="ready"?"":"warning")}finally{kp.disabled=!1}}function YC(n={}){let e=n.incoming||{},t=Array.isArray(n.warnings)&&n.warnings.length?` Warning: ${n.warnings[0]}`:"";return`Backup ready to restore: ${e.projects||0} projects, ${e.observations||0} observations, ${e.developmentCases||0} cases, ${e.documents||0} documents.${t}`}async function KC(n){if(!Pi())return di.focus();if(n){Fp.disabled=!0,Lt.hidden=!0,Lt.value="",Lt.placeholder="Type RESTORE OWNER KNOWLEDGE",Ti.hidden=!0,Ts=null;try{Ve("Validating owner backup...");let e=await n.text(),t=JSON.parse(e),i=await wt("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:t,dryRun:!0})});Ts=t,Lt.hidden=!1,Ti.hidden=!1,Ve(`${YC(i)} Type RESTORE OWNER KNOWLEDGE, then press CONFIRM RESTORE only if this backup should replace current owner knowledge.`,i.warnings?.length?"warning":"")}catch(e){Ts=null,Lt.hidden=!0,Ti.hidden=!0,Ve(e.message||"Backup could not be validated.","danger")}finally{Fp.disabled=!1,Ru.value=""}}}async function JC(){if(!Ts)return Lt.hidden=!0,Ti.hidden=!0,Ve("Choose and validate a backup first.","warning");let n=Lt.value.trim();if(n!=="RESTORE OWNER KNOWLEDGE")return Lt.focus(),Ve("Type RESTORE OWNER KNOWLEDGE before restoring this backup.","warning");Ti.disabled=!0;try{Ve("Restoring owner knowledge backup...");let e=await wt("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:Ts,dryRun:!1,confirmRestore:n})});Ts=null,Lt.value="",Lt.hidden=!0,Ti.hidden=!0,await Ls(),wa.hidden||nm(e.history||{}),Ve(`Owner knowledge restored: ${e.counts?.projects||0} projects, ${e.counts?.observations||0} observations, ${e.counts?.developmentCases||0} cases, ${e.counts?.researchStudies||0} research studies, ${e.counts?.documents||0} documents.`,"warning")}finally{Ti.disabled=!1}}function ZC(n={}){return`${n.projects||0} projects / ${n.observations||0} signals / ${n.developmentCases||0} cases / ${n.researchStudies||0} research / ${n.documents||0} docs`}function nm(n={}){let e=Array.isArray(n.snapshots)?n.snapshots:[],t=Array.isArray(n.events)?n.events:[],i=n.summary?.currentVersionShort||"",s=n.backup||{};wa.hidden=!1,wa.innerHTML=`
    <header><span><small>OWNER DATA SAFETY${i?` / VERSION ${p(i)}`:""}</small><b>${p(e.length)} rollback snapshot${e.length===1?"":"s"}</b><em>${p(s.label||"No server backup record")}</em></span><em>${p(t.length)} event${t.length===1?"":"s"}</em></header>
    ${e.length?e.map(r=>`
      <article>
        <span><small>${p(r.reason||"snapshot")}</small><b>${p(ZC(r.counts))}</b><em>${p(r.createdAt||"")}</em></span>
        <button type="button" data-owner-rollback-snapshot="${p(r.id)}">ROLLBACK</button>
      </article>
    `).join(""):'<p class="ownerIntelEmpty">No rollback snapshots yet. Apex creates one before every confirmed restore or rollback.</p>'}
    ${t.length?`<p>Latest: ${p(t[0].type||"restore")} / ${p(t[0].createdAt||"")}</p>`:""}
  `}async function QC(){if(!Pi())return di.focus();Ts=null,Ti.hidden=!0,Lt.value="",Lt.placeholder="Type ROLLBACK OWNER KNOWLEDGE",Ve("Loading owner restore log...");let n=await wt("/api/owner/restore/history");nm(n),Lt.hidden=!(n.snapshots||[]).length,Ve(`Restore log loaded: ${n.summary?.snapshots||0} rollback snapshots, ${n.summary?.events||0} restore events.`)}function eR(n={}){return n.reviewState==="overdue"?`OVERDUE ${Math.abs(Number(n.dueInDays)||0)}d`:n.status==="contested"?"CONTESTED":n.unverifiedHighConfidence?"UNVERIFIED":n.reviewState==="due"?`DUE ${Math.max(0,Number(n.dueInDays)||0)}d`:`IN ${Math.max(0,Number(n.dueInDays)||0)}d`}function tR(n={}){let e=n.summary||{},t=Array.isArray(n.queue)?n.queue:[];$p.hidden=!1,$p.innerHTML=`
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
          <small>${p(eR(i))} / ${p(i.confidence)}% / ${p(i.scope||"General")}</small>
          <b>${p(i.claim)}</b>
          <em>Falsifier: ${p(i.falsifier||"Not recorded")}</em>
        </span>
        <button type="button" data-belief-review="confirm" data-belief-id="${p(i.id)}">HELD UP</button>
        <button type="button" data-belief-review="contest" data-belief-id="${p(i.id)}">COUNTEREXAMPLE</button>
      </article>
    `).join(""):'<p class="ownerIntelEmpty">No belief is due for review. Every active belief has a scheduled re-test date.</p>'}
    ${e.withSourceQuestion===0&&e.active?'<p class="ownerIntelEmpty">No belief records the source question it came from yet.</p>':""}
  `}async function kb(){if(!Pi())return di.focus();Ve("Loading belief review queue...");let n=await wt("/api/owner/beliefs/review?limit=25");tR(n);let e=n.summary||{};Ve(`Belief review: ${e.overdue||0} overdue, ${e.dueSoon||0} due soon, ${e.neverReviewed||0} never verified.`,e.overdue||e.contested?"warning":"")}async function nR(n){let e=n.getAttribute("data-belief-id"),t=n.getAttribute("data-belief-review");if(!e||!t)return;let i=t==="confirm"?"What evidence or real case did you check that kept this belief standing?":"What counterexample or case challenges this belief?",s=window.prompt(i,"");if(s!==null){if(s.trim().length<8)return Ve("Record what you actually checked before closing a belief review.","warning");n.disabled=!0;try{await wt(`/api/brain/beliefs/${encodeURIComponent(e)}`,{method:"PATCH",body:JSON.stringify({action:t,note:s.trim()})}),await kb(),Ve(t==="confirm"?"Belief confirmed and re-scheduled.":"Belief marked contested for a 90-day re-test.",t==="confirm"?"":"warning")}finally{n.disabled=!1}}}async function iR(n){if(!n)return;let e=Lt.value.trim();if(e!=="ROLLBACK OWNER KNOWLEDGE")return Lt.hidden=!1,Lt.placeholder="Type ROLLBACK OWNER KNOWLEDGE",Lt.focus(),Ve("Type ROLLBACK OWNER KNOWLEDGE before rolling back to this snapshot.","warning");Ve("Rolling owner knowledge back to selected snapshot...");let t=await wt("/api/owner/restore/rollback",{method:"POST",body:JSON.stringify({snapshotId:n,dryRun:!1,confirmRollback:e})});Lt.value="",await Ls(),nm(t.history||{}),Ve(`Owner knowledge rolled back: ${t.counts?.projects||0} projects, ${t.counts?.observations||0} observations, ${t.counts?.developmentCases||0} cases, ${t.counts?.researchStudies||0} research studies.`,"warning")}function sR(n){let e=[{id:"free",name:"Free"},{id:"pro",name:"Pro"},{id:"advisor",name:"Advisor"}];return(ku.length?ku:e).map(i=>`<option value="${p(i.id)}"${i.id===n?" selected":""}>${p(i.name||i.id)}</option>`).join("")}function rR(n){return`
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
          <select data-owner-admin-field="plan">${sR(n.plan||"free")}</select>
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
  `}function Ub(n=[]){Cy.textContent=n.length?`${n.length} user${n.length===1?"":"s"} loaded`:"No users found",Af.innerHTML=n.length?n.map(rR).join(""):'<p class="ownerIntelEmpty">No account users loaded yet.</p>'}async function Fb(){if(!Pi())return Cy.textContent="Owner token required",Af.innerHTML='<p class="ownerIntelEmpty">Paste the owner token above before loading users.</p>',null;Ve("Loading user control...");let n=await wt("/api/admin/users");return Ub(n.users||[]),Ve("User control loaded."),n}async function aR(n){let e=n.closest("[data-owner-admin-user]"),t=e?.getAttribute("data-owner-admin-user");if(!t)return;let i=r=>e.querySelector(`[data-owner-admin-field="${r}"]`)?.value||"",s={role:i("role"),plan:i("plan"),planStatus:i("planStatus"),emailVerified:i("emailVerified")==="true",disabled:i("disabled")==="true"};n.disabled=!0;try{await wt(`/api/admin/users/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(s)}),await Fb(),Ve("User updated.")}finally{n.disabled=!1}}function nf({projects:n={},observations:e={},cases:t={},evidence:i={},research:s={},history:r={},ops:a={}}={}){let o=Array.isArray(n.projects)?n.projects:[],l=Array.isArray(e.observations)?e.observations:[],c=Array.isArray(t.cases)?t.cases:[],u=Array.isArray(i.documents)?i.documents:[],d=Array.isArray(s.studies)?s.studies:[];$u(s),Nb(a),lb=o,es=o,Hb(o),$b(o);let h=DC(o,c,l,u),m=h.filter(S=>S.cases===0).length,v=l.filter(S=>S.freshness?.status==="stale").length,y=h.filter(S=>S.evidence===0).length,g=h.filter(S=>S.status==="ready").length,f=BC(h),M=UC(r.summary?.currentVersionHash||"",r.backup||{});tl={rows:h,score:f,projectCount:o.length,caseCount:t.summary?.total??c.length,observationCount:e.summary?.matched??l.length,documentCount:i.summary?.documents??u.length,researchStudyCount:d.length,complete:g,currentVersionShort:r.summary?.currentVersionShort||"",backupReminder:M,ops:a},bT.innerHTML=`
    <span><b>${p(f)}%</b> COVERAGE</span>
    <span><b>${p(_r(a.status))}</b> OPS</span>
    <span><b>${p(o.length)}</b> PROJECTS</span>
    <span><b>${p(t.summary?.total??c.length)}</b> CASES</span>
    <span><b>${p(e.summary?.matched??l.length)}</b> OBSERVATIONS</span>
    <span><b>${p(i.summary?.documents??u.length)}</b> DOCUMENTS</span>
    <span><b>${p(d.length)}</b> RESEARCH</span>
    <span><b>${p(g)}</b> COMPLETE</span>
  `,ST.innerHTML=[hr("Project registry",`${o.length} tracked`,o.length?"ready":"missing",o.length?"Registry exists.":"Add projects before cases can be linked."),hr("Founder cases",`${m} missing`,m?"warning":"ready",m?"Write founder opinion for unmatched projects.":"Case coverage is broad."),hr("Market freshness",`${v} stale`,v?"warning":l.length?"ready":"missing",v?"Re-check old observations.":l.length?"Signals are current enough.":"Add dated ground signals."),hr("Evidence vault",`${y} unbacked`,y?"warning":u.length?"ready":"missing",y?"Attach proof to important projects.":u.length?"Evidence exists.":"Add source proof."),hr("Research studies",`${d.length} validated`,d.length?"ready":"missing",d.length?"Strict research can now support market questions.":"Import a strictly validated study bundle when one is ready."),hr("Backup rhythm",M.label,M.status,M.action),hr("Production ops",_r(a.status),a.status||"warning",a.summary?`${a.summary.ready||0} ready, ${a.summary.warning||0} warning, ${a.summary.missing||0} blocked.`:"Load owner token to check launch readiness.")].join(""),Ob(h);let E={title:"Add project registry",detail:"Apex needs tracked projects before owner intelligence can become project-specific.",action:"market"};m?E={title:"Write missing case opinions",detail:`${m} tracked project${m===1?"":"s"} do not have founder case notes yet.`,action:"cases"}:v?E={title:"Refresh stale market signals",detail:`${v} observation${v===1?" is":"s are"} stale and should be re-verified.`,action:"market"}:y?E={title:"Attach evidence proof",detail:`${y} project${y===1?"":"s"} have no obvious evidence document match.`,action:"evidence"}:d.length?o.length&&(E={title:"Coverage looks healthy",detail:"Keep adding dated observations and update case notes when the market changes.",action:"refresh"}):E={title:"Import validated market research",detail:"The framework is ready; add a strict research bundle to extend it with dated external evidence.",action:"research"},wT.textContent=E.title,ET.textContent=E.detail,Tf.innerHTML=`
    <button type="button" data-owner-intel-action="${p(E.action)}">DO NEXT</button>
    <button type="button" data-owner-intel-action="market">PROJECTS / SIGNALS</button>
    <button type="button" data-owner-intel-action="cases">CASES</button>
    <button type="button" data-owner-intel-action="evidence">EVIDENCE</button>
    <button type="button" data-owner-intel-action="research">RESEARCH</button>
  `}async function Ls(){if(!Pi())return nf(),Ve(cl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Ve("Loading owner intelligence coverage...");let[n,e,t,i,s,r,a]=await Promise.all([wt("/api/owner/market/projects"),wt("/api/owner/market/observations?limit=500"),wt("/api/owner/development-cases?limit=500"),wt("/api/owner/documents"),wt("/api/owner/research/studies"),wt("/api/owner/restore/history"),wt("/api/owner/ops")]);return nf({projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:a}),Ve("Owner intelligence coverage loaded."),{projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:a}}async function Vu(n,e={}){let t=Pb();if(!t)throw new Error("Paste and save the owner token first.");return je(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}async function im(n,e={}){let t=Ib();if(!t)throw new Error("Paste and save the owner token first.");return je(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function oR(n=[]){return Array.isArray(n)&&n.length?n.join(", "):"untagged"}function lR(n){return`
    <article class="ownerEvidenceItem ${p(n.status||"stored")}" data-owner-evidence="${p(n.id)}">
      <header>
        <span><small>${p(oR(n.tags))}</small><b>${p(n.title||"Owner evidence")}</b></span>
        <em>${p(n.status||"stored")} / ${p(n.chunkCount||0)} chunks</em>
      </header>
      <p>${p(n.filename||"Evidence file")}${n.sourceUrl?` / ${p(n.sourceUrl)}`:""}</p>
      <div class="ownerEvidenceMeta">
        <span>${p(n.indexMode||"stored")} index</span>
        <span>${p(n.updatedAt?am(n.updatedAt):"No date")}</span>
      </div>
      <button type="button" data-owner-evidence-action="delete" data-owner-evidence-id="${p(n.id)}">DELETE</button>
    </article>
  `}function cR(n,e){if(!e)return!0;let t=[n.title,n.filename,n.sourceUrl,n.status,n.indexMode,...n.tags||[]].join(" ").toLowerCase();return e.split(/\s+/).filter(Boolean).every(i=>t.includes(i))}function Bb(){let n=$f.value.trim().toLowerCase(),e=Qp.filter(t=>cR(t,n));Yy.innerHTML=e.length?e.map(lR).join(""):Qp.length?'<p class="ownerEvidenceEmpty">No evidence documents match this filter.</p>':'<p class="ownerEvidenceEmpty">No evidence documents yet. Add the first transaction, rent, financing, legal, or site proof above.</p>'}function sf(n={}){let e=Array.isArray(n.documents)?n.documents:[],t=n.summary||{};Qp=e,qT.innerHTML=`
    <span><b>${p(t.documents||e.length)}</b> DOCUMENTS</span>
    <span><b>${p(t.indexed||0)}</b> INDEXED</span>
    <span><b>${p(t.chunks||0)}</b> CHUNKS</span>
    <span>${p(t.embeddingProvider?"EMBEDDINGS ON":"LEXICAL SEARCH")}</span>
  `,YT.textContent=`${t.chunks||0} indexed chunks`,Bb()}async function pl(){if(!Ib())return sf({}),Bn(cl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Bn("Loading evidence vault...");let n=await im("/api/owner/documents");return sf(n),Bn("Evidence vault loaded."),n}async function uR(){let n=Lu.value.trim(),e=Nu.value.trim();if(!n)return Lu.focus();if(!e)return Nu.focus();Bn("Indexing evidence..."),await im("/api/owner/documents",{method:"POST",body:JSON.stringify({title:n,filename:jy.value.trim()||`${n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"evidence"}.md`,mimeType:"text/markdown",sourceUrl:jT.value.trim(),tags:Xy.value.split(",").map(t=>t.trim()).filter(Boolean),text:e})}),Gp.reset(),await pl(),Bn("Evidence added. V8 reports can now retrieve it when relevant.")}async function dR(n){let e=n.getAttribute("data-owner-evidence-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Bn("Press CONFIRM to delete this evidence document.");return}n.disabled=!0;try{await im(`/api/owner/documents/${encodeURIComponent(e)}`,{method:"DELETE"}),await pl(),Bn("Evidence deleted.")}catch(t){n.disabled=!1,Bn(t.message||"Evidence could not be deleted.","danger")}}}function sm(n){return{strong_buy:"Strong buy",shortlist:"Shortlist",watch:"Watch",avoid:"Avoid",unknown:"Unknown"}[n]||"Watch"}function $b(n=es){Aa.innerHTML='<option value="">No linked market project</option>'+n.map(e=>`<option value="${p(e.id)}">${p(e.name)}${e.area?` / ${p(e.area)}`:""}</option>`).join("")}function rf(n){return[n.managementView,n.residentProfile,n.supplyThreat,n.rentalOutlook,n.resaleOutlook,n.sourceBasis].filter(e=>!String(e||"").trim()).length}function hR(){let n=Gy.value;return n?Uu.filter(e=>n==="incomplete"?rf(e)>0:rf(e)===0):Uu}function pR(n){let e=[n.area,n.state,n.propertyType,n.priceSegment].filter(Boolean).join(" / ")||"No project detail",t=n.ownerVerdict||n.strengths||n.weaknesses||"No founder verdict recorded.",i=rf(n);return`
    <article class="ownerCaseItem ${p(n.verdict||"watch")}" data-owner-case="${p(n.id)}">
      <header>
        <span><small>${p(e)}</small><b>${p(n.projectName||"Development case")}</b></span>
        <em>${p(sm(n.verdict))} / ${p(n.confidence||"medium")}</em>
      </header>
      <p>${p(t)}</p>
      <div class="ownerCaseMeta">
        <span>${p(n.rating||0)}/100</span>
        <span>${p(n.sourceBasis||"No source basis")}</span>
        <span>${p(n.observedAt?am(n.observedAt):"No date")}</span>
        ${i?`<span>${p(i)} gaps</span>`:"<span>complete</span>"}
      </div>
      <div class="ownerCaseItemActions">
        <button type="button" data-owner-case-action="edit" data-owner-case-id="${p(n.id)}">EDIT</button>
        <button type="button" data-owner-case-action="delete" data-owner-case-id="${p(n.id)}">DELETE</button>
      </div>
    </article>
  `}function Hu(n={}){let e=Array.isArray(n.cases)?n.cases:[];cb=n,Uu=e;let t=n.summary||{},i=t.coverage||{},s=hR();VT.innerHTML=`
    <span><b>${p(t.total??e.length)}</b> CASES</span>
    <span><b>${p(t.shortlist||0)}</b> SHORTLIST</span>
    <span><b>${p(t.strong_buy||0)}</b> STRONG BUY</span>
    <span><b>${p(t.avoid||0)}</b> AVOID</span>
    <span><b>${p(i.areas||0)}</b> AREAS</span>
    <span><b>${p(i.incomplete||0)}</b> GAPS</span>
  `,zT.textContent=`${s.length} shown / ${t.matched??e.length} matched`,Wy.innerHTML=s.length?s.map(pR).join(""):'<p class="ownerCaseEmpty">No development cases match this filter yet. Add the first project opinion above.</p>'}function fR(){let n=new URLSearchParams;return Hp.value.trim()&&n.set("q",Hp.value.trim()),zp.value&&n.set("verdict",zp.value),n.set("limit","120"),n.toString()}async function Sr(){if(!Pb())return Hu({}),Kt(cl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Kt("Loading development case library...");let[n,e]=await Promise.all([Vu("/api/owner/market/projects"),Vu(`/api/owner/development-cases?${fR()}`)]);return es=Array.isArray(n.projects)?n.projects:[],$b(es),Hu(e),Kt("Development case library loaded."),{projects:n,cases:e}}function Vb(){return es.find(n=>n.id===Aa.value)}function mR(){let n=Vb(),e=yr.value.trim()||n?.name||"";return{projectId:Aa.value,projectName:e,area:Yo.value.trim()||n?.area||"",state:Ko.value.trim()||n?.state||"",propertyType:Jo.value.trim()||n?.propertyType||"",developer:Zo.value.trim()||n?.developer||"",priceSegment:Iy.value.trim(),targetBuyer:Oy.value.trim(),targetTenant:ky.value.trim(),strengths:Uy.value.trim(),weaknesses:Fy.value.trim(),managementView:By.value.trim(),residentProfile:$y.value.trim(),supplyThreat:Vy.value.trim(),rentalOutlook:Hy.value.trim(),resaleOutlook:zy.value.trim(),ownerVerdict:Uf.value.trim(),verdict:Py.value,confidence:Ly.value,rating:Ny.value.trim(),observedAt:Qu.value||new Date().toISOString(),sourceBasis:Ff.value.trim(),tags:Dy.value.split(",").map(t=>t.trim()).filter(Boolean)}}function rm(){il="",kf.reset(),Qu.value=new Date().toISOString().slice(0,10),qy.textContent="Add Development Opinion",Pu.textContent="ADD CASE",Bf.hidden=!0}function gR(n){il=n.id||"",Aa.value=n.projectId||"",yr.value=n.projectName||"",Yo.value=n.area||"",Ko.value=n.state||"",Jo.value=n.propertyType||"",Zo.value=n.developer||"",Iy.value=n.priceSegment||"",Py.value=n.verdict||"watch",Ly.value=n.confidence||"medium",Ny.value=n.rating||"",Qu.value=n.observedAt?String(n.observedAt).slice(0,10):new Date().toISOString().slice(0,10),Dy.value=Array.isArray(n.tags)?n.tags.join(", "):"",Oy.value=n.targetBuyer||"",ky.value=n.targetTenant||"",Uy.value=n.strengths||"",Fy.value=n.weaknesses||"",By.value=n.managementView||"",$y.value=n.residentProfile||"",Vy.value=n.supplyThreat||"",Hy.value=n.rentalOutlook||"",zy.value=n.resaleOutlook||"",Uf.value=n.ownerVerdict||"",Ff.value=n.sourceBasis||"",qy.textContent=`Edit ${n.projectName||"Development Case"}`,Pu.textContent="SAVE CASE",Bf.hidden=!1,kf.scrollIntoView({behavior:"smooth",block:"nearest"}),Kt("Editing existing development case. Save to update, or cancel edit.")}function vR(n){let e=n.getAttribute("data-owner-case-id"),t=Uu.find(i=>i.id===e);if(!t)return Kt("Case not found in the current filtered list. Refresh and try again.","warning");gR(t)}async function yR(){let n=mR();if(!n.projectName)return yr.focus();let e=!!il;Kt(e?"Updating development case...":"Adding development case...");let t=e?`/api/owner/development-cases/${encodeURIComponent(il)}`:"/api/owner/development-cases";await Vu(t,{method:e?"PATCH":"POST",body:JSON.stringify(n)}),rm(),await Sr(),Kt(e?"Development case updated.":"Development case added. Apex can now match it in answers and deal reports.")}async function bR(n){let e=n.getAttribute("data-owner-case-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Kt("Press CONFIRM to delete this development case.");return}n.disabled=!0;try{await Vu(`/api/owner/development-cases/${encodeURIComponent(e)}`,{method:"DELETE"}),il===e&&rm(),await Sr(),Kt("Development case deleted.")}catch(t){n.disabled=!1,Kt(t.message||"Development case could not be deleted.","danger")}}}function xR(n){return String(n||"other").replaceAll("_"," ")}function am(n){if(!n)return"No date";try{return new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n))}catch{return String(n).slice(0,10)}}function Hb(n=[]){br.innerHTML='<option value="">Area-only observation</option>'+n.map(e=>`<option value="${p(e.id)}">${p(e.name)}${e.area?` / ${p(e.area)}`:""}</option>`).join("")}function _R(n){let e=[n.area,n.state,n.propertyType,n.tenure].filter(Boolean).join(" / ")||"No project detail";return`
    <article class="ownerMarketItem">
      <header><span><small>${p(e)}</small><b>${p(n.name)}</b></span><em>${p(n.observationCount||0)} obs</em></header>
      <p>${p(n.developer||n.status||"Add observations to make this project useful.")}</p>
    </article>
  `}function SR(n){let e=n.project?.name||n.projectName||n.area||"Area observation",t=n.freshness?.status||"unknown",i=Number.isFinite(Number(n.freshness?.ageDays))?`${n.freshness.ageDays}d`:"age n/a",s=n.trend?`${n.trend.direction}${n.trend.percentChange===null||n.trend.percentChange===void 0?"":` ${n.trend.percentChange>0?"+":""}${n.trend.percentChange}%`}`:"no trend",r=n.value===null||n.value===void 0?"Qualitative":`${n.value}${n.unit?` ${n.unit}`:""}`;return`
    <article class="ownerMarketItem ${p(t)}" data-owner-observation="${p(n.id)}">
      <header>
        <span><small>${p(xR(n.metricType))} / ${p(am(n.observedAt))}</small><b>${p(e)}</b></span>
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
  `}function zb(n={},e={}){let t=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(e.observations)?e.observations:[];es=t,Hb(t),cA.textContent=String(t.length),uA.textContent=String(e.summary?.matched||i.length),FT.innerHTML=`
    <span><b>${p(t.length)}</b> PROJECTS</span>
    <span><b>${p(n.summary?.observations??i.length)}</b> OBSERVATIONS</span>
    <span><b>${p(e.summary?.fresh||0)}</b> FRESH</span>
    <span><b>${p(e.summary?.stale||0)}</b> STALE</span>
  `,Qy.innerHTML=t.length?t.map(_R).join(""):'<p class="ownerMarketEmpty">No market projects yet. Add one above, then attach observations.</p>',Vf.innerHTML=i.length?i.map(SR).join(""):'<p class="ownerMarketEmpty">No observations match this filter yet.</p>'}function wR(){let n=new URLSearchParams;return jp.value.trim()&&n.set("area",jp.value.trim()),Xp.value&&n.set("metricType",Xp.value),Yp.value&&n.set("freshness",Yp.value),n.set("limit","120"),n.toString()}async function Li(){if(!pd())return Qy.innerHTML='<p class="ownerMarketEmpty">Owner token required before loading market evidence.</p>',Vf.innerHTML='<p class="ownerMarketEmpty">Paste your owner token above, then press SAVE.</p>',Tt(cl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Tt("Loading owner market intelligence...");let n=wR(),[e,t]=await Promise.all([Ma("/api/owner/market/projects"),Ma(`/api/owner/market/observations?${n}`)]);return zb(e,t),Tt("Market intelligence loaded."),{projects:e,observations:t}}function mn(){Rf.hidden=!0,Cf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerMarketOpen")}function gn(){Pf.hidden=!0,If.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerCaseOpen")}function vn(){Nf.hidden=!0,Lf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerEvidenceOpen")}function nn(){Ju.hidden=!0,Ef.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerIntelOpen")}async function Gb(){tn("owner"),$n(),hn(),pn(),fn(),nn(),mn(),gn(),vn(),dn(),An(),Cn(),Ju.hidden=!1,Ef.setAttribute("aria-expanded","true"),document.body.classList.add("ownerIntelOpen"),Jn(window.localStorage.getItem(Rs)||di.value);try{await Ls()}catch(n){Ve(n.message||"Owner intelligence console is unavailable.","danger")}}async function fd(){tn("cases"),$n(),hn(),pn(),fn(),nn(),mn(),vn(),dn(),An(),Cn(),Pf.hidden=!1,If.setAttribute("aria-expanded","true"),document.body.classList.add("ownerCaseOpen"),Jn(window.localStorage.getItem(Rs)||Xo.value),Qu.value||=new Date().toISOString().slice(0,10);try{await Sr()}catch(n){Kt(n.message||"Development case library is unavailable.","danger")}}async function md(){tn("evidence"),$n(),hn(),pn(),fn(),nn(),mn(),gn(),dn(),An(),Cn(),Nf.hidden=!1,Lf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerEvidenceOpen"),Jn(window.localStorage.getItem(Rs)||Qo.value);try{await pl()}catch(n){Bn(n.message||"Evidence vault is unavailable.","danger")}}async function gd(){tn("market"),$n(),hn(),pn(),fn(),nn(),gn(),vn(),dn(),An(),Cn(),Rf.hidden=!1,Cf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerMarketOpen"),Jn(window.localStorage.getItem(Rs)||jo.value),Du.value||=new Date().toISOString().slice(0,10);try{await Li()}catch(n){Tt(n.message||"Owner market console is unavailable.","danger")}}function ER(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"project"}function MR(n=""){let e=String(n||"");return lb.find(t=>t.id===e)||es.find(t=>t.id===e)||null}function kn(n,e){n&&!n.value&&e&&(n.value=e)}function Wb(n,e){!n||!e||Array.from(n.options).some(t=>t.value===e)&&(n.value=e)}function TR(n){return[n.name,n.area,n.state,n.propertyType].filter(Boolean).join(", ")}function AR(n){Wb(Aa,n.id),kn(yr,n.name),kn(Yo,n.area),kn(Ko,n.state),kn(Jo,n.propertyType),kn(Zo,n.developer),kn(Ff,"Owner console action queue"),yr.scrollIntoView({behavior:"smooth",block:"center"}),Uf.focus(),Kt(`Case note prepared for ${n.name}. Add your founder judgment, then save.`)}function CR(n){Wb(br,n.id),kn(ba,n.area),kn(Jy,"owner ground check"),kn(Zy,`${n.name}: update the latest rental, resale, supply, management, or site signal.`),Du.value||=new Date().toISOString().slice(0,10),br.scrollIntoView({behavior:"smooth",block:"center"}),Ky.focus(),Tt(`Market signal prepared for ${n.name}. Choose the metric and add the latest evidence.`)}function RR(n){kn(Lu,`${n.name} evidence proof`),kn(jy,`${ER(n.name)}-evidence.md`),kn(Xy,TR(n)),kn(Nu,`Project: ${n.name}
Area: ${n.area||"Not recorded"}
Evidence type:
Source/date:
Notes:
`),Lu.scrollIntoView({behavior:"smooth",block:"center"}),Nu.focus(),Bn(`Evidence shell prepared for ${n.name}. Paste the proof, source, and date before saving.`)}async function IR(n,e){let t=MR(e);if(!t){Ve("Project could not be found. Refresh owner intelligence and try again.","warning");return}n==="case"&&(await fd(),AR(t)),n==="signal"&&(await gd(),CR(t)),n==="proof"&&(await md(),RR(t))}async function PR(){Tt("Adding project...");let n={name:KT.value.trim(),area:JT.value.trim(),state:ZT.value.trim(),propertyType:QT.value.trim(),developer:eA.value.trim(),tenure:tA.value.trim(),completionYear:nA.value.trim(),status:iA.value,aliases:sA.value.split(",").map(e=>e.trim()).filter(Boolean)};await Ma("/api/owner/market/projects",{method:"POST",body:JSON.stringify(n)}),Wp.reset(),await Li(),Tt("Project added.")}async function LR(){let n=es.find(t=>t.id===br.value);if(!n&&!ba.value.trim())throw ba.focus(),new Error("Add an area or link the observation to a project.");Tt("Adding observation...");let e={projectId:br.value,area:ba.value.trim()||n?.area||"",state:n?.state||"",projectName:n?.name||"",metricType:Ky.value,value:rA.value.trim(),unit:aA.value.trim(),observedAt:Du.value,sourceType:Jy.value.trim()||"owner observation",confidence:oA.value,notes:Zy.value.trim()};await Ma("/api/owner/market/observations",{method:"POST",body:JSON.stringify(e)}),qp.reset(),Du.value=new Date().toISOString().slice(0,10),await Li(),Tt("Observation added. Apex can now match it in chat and deal reports.")}async function NR(){let n=Ep.value.trim();if(!n)return Ep.focus();let e;try{e=JSON.parse(n)}catch{throw new Error("Import must be valid JSON with projects and/or observations arrays.")}let t=Array.isArray(e.projects)?e.projects:[],i=Array.isArray(e.observations)?e.observations:[];if(!t.length&&!i.length)throw new Error("Import JSON must include at least one project or observation.");if(t.length+i.length>200)throw new Error("Each import is limited to 200 combined projects and observations.");Tt("Importing owner market batch...");let s=await Ma("/api/owner/market/import",{method:"POST",body:JSON.stringify({projects:t,observations:i})});Ep.value="",await Li();let r=Array.isArray(s.skipped)?s.skipped.length:0;Tt(`Imported ${s.imported?.projects||0} project(s) and ${s.imported?.observations||0} observation(s)${r?`; ${r} skipped.`:"."}`,r?"warning":"")}async function DR(n){let e=n.getAttribute("data-owner-market-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Tt("Press CONFIRM to delete this observation.");return}n.disabled=!0;try{await Ma(`/api/owner/market/observations/${encodeURIComponent(e)}`,{method:"DELETE"}),await Li(),Tt("Observation deleted.")}catch(t){n.disabled=!1,Tt(t.message||"Observation could not be deleted.","danger")}}}function pr(n,e=[],t=""){return e.length?`
    <section class="analysisSection ${p(t)}">
      <h3>${p(n)}</h3>
      <ul>${e.map(i=>`<li>${p(i)}</li>`).join("")}</ul>
    </section>
  `:""}function Un(n){return`RM ${Math.round(Number(n)||0).toLocaleString("en-MY")}`}function qb(n){return!n||!Array.isArray(n.items)||!n.items.length?[]:[`Down payment at ${n.loanMarginPercent}% loan margin: ${Un(n.downPayment)}`,...n.items.map(e=>`${e.label}: ${Un(e.amount)}`),`Total duties and fees: ${Un(n.totalTransactionCosts)} (about ${n.costAsPercentOfPrice}% of price)`,`Estimated cash to start: ${Un(n.estimatedCashToStart)}`,...n.rpgt?.note?[`RPGT: ${n.rpgt.note}`]:[],...n.disclaimer?[n.disclaimer]:[]]}function OR(n={}){let e=Array.isArray(n.observations)?n.observations:[];if(!e.length)return"";let t=Array.isArray(n.trends)?n.trends:[],i=n.summary||{},s=t.slice(0,4).map(a=>{let o=a.percentChange===null||a.percentChange===void 0?"":` ${Number(a.percentChange)>0?"+":""}${a.percentChange}%`;return`<span class="marketTrend ${p(a.direction)}"><small>${p(String(a.metricType||"").replaceAll("_"," "))}</small><b>${p(a.direction)}${p(o)}</b></span>`}).join(""),r=e.slice(0,6).map(a=>{let o=a.freshness?.status||"stale",l=Number(a.freshness?.ageDays||0),c=a.notes||(a.value===null?"Qualitative observation":`${a.value}${a.unit?` ${a.unit}`:""}`),u=c.length>420?`${c.slice(0,417).trim()}...`:c;return`
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
  `}function kR(n={}){let e=n.decisionFocus||{},t=n.challengeMode||{};return!e.body&&!t.message?"":`
    <section class="analysisDecisionFocus ${p(e.tone||"neutral")}">
      <span><small>${p(e.label||"Decision focus")}</small><b>${p(e.body||n.summary||"")}</b></span>
      ${t.message?`<p>${p(t.message)}</p>`:""}
    </section>
  `}function UR(n={}){if(!n.message||n.status==="inactive")return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function ko(n,e={},t="items"){if(!e.summary)return"";let i=Array.isArray(e[t])?e[t]:[],s=e.status||e.mode||"check",r=String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"check";return`
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
  `}function FR(n={}){if(!n.label)return"";let e=Array.isArray(n.flags)?n.flags.slice(0,4):[];return`
    <section class="analysisReadiness">
      <header>
        <span><small>INVESTOR READINESS</small><b>${p(n.label)}</b></span>
        <em>${p(n.score||0)}/100</em>
      </header>
      ${n.summary?`<p>${p(n.summary)}</p>`:""}
      ${e.length?`<ul>${e.map(t=>`<li>${p(t)}</li>`).join("")}</ul>`:""}
    </section>
  `}function BR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function $R(n=[]){return n.length?`
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
  `:""}function VR(n={}){if(!n.summary)return"";let e=Array.isArray(n.gates)?n.gates:[],t=Array.isArray(n.criticalGaps)?n.criticalGaps:[];return`
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
  `}function HR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function zR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function GR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function WR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function qR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function jR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function XR(n={}){let e=Array.isArray(n.tasks)?n.tasks:[];return e.length?`
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
  `:""}function YR(n={}){if(!n.summary)return"";let e=Array.isArray(n.assumptions)?n.assumptions:[];return`
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
  `}function KR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function JR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
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
  `}function ZR(n={}){if(!n.summary)return"";let e=Array.isArray(n.triggers)?n.triggers:[];return`
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
  `}function QR(n={}){if(!n.summary)return"";let e=Array.isArray(n.conditions)?n.conditions:[];return`
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
  `}function yu(n,e={},t="FOCUS",i=""){if(!e.summary)return"";let s=Array.isArray(e.checks)?e.checks:[],r=e.status||"watch";return`
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
  `}function e1(n={}){let e=Array.isArray(n.actions)?n.actions:[];return e.length?`
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
  `:""}function t1(n={}){let e=Array.isArray(n.signals)?n.signals:[];if(!e.length)return"";let t=n.profile||{};return`
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
  `}function bu(n){let e=Number(n||0);return e>=75?"strong":e>=55?"watch":"weak"}function Rp(n={},e,t=0){let i=(n.dimensions||[]).find(s=>s.key===e);return Number(i?.score??t??0)}function n1(n={},e,t=0){let i=(n.stages||[]).find(s=>e.test(String(s.name||"")));return Number(i?.score??t??0)}function i1(n={}){let e=Zi(n.recommendationBlockers),t=Zi(n.watchouts),i=Zi(n.missingEvidence),s=Zi(n.nextActions),r=e[0]||t[0]||n.counterThesis||"No single dominant risk is proven yet; keep checking the weak evidence lane.",a=i[0]||"No urgent proof gap listed, but live transaction, rent, site, financing, and legal checks still matter.",o=s[0]||a,l=Rp(n,"property"),c=n1(n,/holding/i,Number(n.achievedRentalEvidence?.score||n.investorReadiness?.score||0)),u=Rp(n,"exit"),d=Rp(n,"evidence",n.confidence);return{verdict:n.verdict||"INVESTIGATE",score:Number(n.averageScore||0),confidence:Number(n.confidence||0),reason:n.decisionFocus?.body||n.summary||"Apex needs more proof before upgrading the decision.",risk:r,missingProof:a,nextAction:o,scores:[{label:"Property Quality",value:l,status:bu(l)},{label:"Rental Safety",value:c,status:bu(c)},{label:"Exit Liquidity",value:u,status:bu(u)},{label:"Evidence Confidence",value:d,status:bu(d)}]}}function s1(n={}){let e=i1(n);return`
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
  `}function Wo(n,e=1){let t=Number(n);return Number.isFinite(t)?`${(t*100).toFixed(e)}%`:"Not available"}function r1(n={}){return!n||n.status==="incomplete"?["Residential DCF",...(n?.issues||["Minimum DCF inputs are incomplete."]).map(e=>`- ${e}`)]:["Residential DCF and market-value screen",`Status: ${n.status}`,`${n.indicationLabel}: ${Un(n.indicatedValue)}`,`Formal market-value label: ${n.marketValue?Un(n.marketValue):"Not established"}`,`Income DCF: ${Un(n.incomeApproach?.dcfValue)}`,`Comparison indication: ${n.comparisonApproach?.value?Un(n.comparisonApproach.value):"Need 3 recent verified sales"}`,`Purchase price: ${Un(n.purchasePrice)}`,`Price variance: ${Wo(n.priceVariance)}`,`Year 1 DSCR: ${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"Not available"}`,`Levered equity IRR: ${Wo(n.buyerReturns?.leveredEquityIrr)}`,`Evidence: ${n.evidence?.score||0}/100`,...(n.evidence?.missing||[]).map(e=>`- Missing: ${e}`),...(n.warnings||[]).map(e=>`- Warning: ${e}`),n.disclaimer||""].filter(Boolean)}function jb(n={}){if(!n)return"";if(n.status==="incomplete")return`
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
        <span><small>INDICATED VALUE</small><b>${p(Un(n.indicatedValue))}</b></span>
        <span><small>MARKET VALUE LABEL</small><b>${e?p(Un(n.marketValue)):"NOT ESTABLISHED"}</b></span>
        <span><small>PRICE POSITION</small><b>${p(Wo(n.priceVariance))}</b></span>
      </div>
      <div class="dcfValuationMetrics">
        <span><small>Income DCF</small><b>${p(Un(n.incomeApproach?.dcfValue))}</b></span>
        <span><small>Completed-sale comparison</small><b>${n.comparisonApproach?.value?p(Un(n.comparisonApproach.value)):"Need 3 verified sales"}</b></span>
        <span><small>Terminal concentration</small><b>${p(Wo(n.incomeApproach?.terminalConcentration))}</b></span>
        <span><small>Year 1 DSCR</small><b>${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"N/A"}</b></span>
        <span><small>Levered equity IRR</small><b>${p(Wo(n.buyerReturns?.leveredEquityIrr))}</b></span>
        <span><small>Evidence strength</small><b>${p(n.evidence?.score||0)}/100</b></span>
      </div>
      ${(n.evidence?.missing||[]).length?`<div class="dcfValuationGaps"><b>Evidence still needed</b><ul>${n.evidence.missing.map(t=>`<li>${p(t)}</li>`).join("")}</ul></div>`:""}
      ${(n.warnings||[]).length?`<div class="dcfValuationWarnings"><b>Challenge back</b><ul>${n.warnings.map(t=>`<li>${p(t)}</li>`).join("")}</ul></div>`:""}
      <p>${p(n.disclaimer||"")}</p>
    </section>
  `}function a1(n){document.body.classList.add("conversationActive");let e=document.createElement("article");e.className="message jarvis dcfValuationMessage",e.innerHTML=`${jb(n)}<div class="analysisActions"><button type="button">DOWNLOAD DCF WORKBOOK</button></div>`,e.querySelector("button")?.addEventListener("click",()=>void lm(n)),document.querySelector("#valuationResult").replaceChildren(e)}function om(n,e=[],t={},i=Gt){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=crypto.randomUUID();ll.set(r,n),i===Gt&&(Ea=r),s.dataset.analysisId=r;let a=String(n.verdict||"investigate").toLowerCase(),o=(n.stages||[]).map(m=>`
    <li class="analysisStage">
      <span class="stageNumber">0${p(m.number)}</span>
      <span class="stageBody">
        <b>${p(m.name)}</b>
        <small>${p(m.summary)}</small>
      </span>
      <span class="stageReading">
        <i class="stageStatus ${p(m.status)}">${p(m.status)}</i>
        <em>${p(m.score)}/100</em>
      </span>
    </li>
  `).join(""),l=(n.metrics||[]).map(m=>`
    <span class="analysisMetric"><small>${p(m.label)}</small><b>${p(m.value)}</b></span>
  `).join(""),c=(n.dimensions||[]).map(m=>`
    <article class="analysisDimension ${p(m.status)}">
      <span><small>${p(m.label)}</small><b>${p(m.score)}/100</b><em>${p(m.status)}</em></span>
      <i><em style="width:${Math.max(0,Math.min(100,Number(m.score)||0))}%"></em></i>
    </article>
  `).join(""),u=od(n),d=(n.scenarios||[]).map(m=>`
    <article class="analysisScenario ${p(m.status)}">
      <span><b>${p(m.label)}</b><small>${p(m.assumption)}</small></span>
      <em>${p(m.value)}/mo</em>
    </article>
  `).join(""),h=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date);if(s.className="message jarvis analysisMessage",s.innerHTML=`
    <header class="analysisReportTitle">
      <span>A</span><div><small>APEX ANALYTIC</small><h1>DEAL DECISION REPORT</h1><p>${p(Ra(n))} / ${p(h)}</p></div>
    </header>
    ${bb(t)}
    <div class="analysisHeader">
      <span><small>SEVEN-STAGE VERDICT</small><b>${p(n.verdict)}</b></span>
      <i class="analysisVerdict ${p(a)}">${p(n.confidence)}% CONFIDENCE</i>
    </div>
    <p class="analysisSummary">${p(n.summary)}</p>
    ${s1(n)}
    ${jb(n.residentialDcf)}
    ${kR(n)}
    ${BR(n.productExperience)}
    ${UR(n.personalizedChallenge)}
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
    ${CA()}
    ${NA(n)}
    ${IA(n)}
    ${OA(n)}
    ${UA(n)}
    ${BA(n.developmentIntelligence)}
    ${VA(n.caseIntelligence)}
    ${zA(n.documentIntelligence)}
    ${WA(n.portfolioCommand)}
    ${jA(n.finalCommand)}
    <div class="analysisOverview">
      ${FR(n.investorReadiness)}
      ${c?`<section class="analysisDimensionSection"><h3>DEAL SCORECARD</h3><div class="analysisDimensions">${c}</div></section>`:""}
    </div>
    ${l?`<div class="analysisMetrics">${l}</div>`:""}
    ${$R(n.evidenceChecklist||[])}
    ${VR(n.evidenceEngine)}
    ${HR(n.transactionComparableEvidence)}
    ${zR(n.achievedRentalEvidence)}
    ${GR(n.financingValuationEvidence)}
    ${WR(n.supplyAbsorptionEvidence)}
    ${qR(n.siteManagementEvidence)}
    ${jR(n.legalTransactionEvidence)}
    ${XR(n.dueDiligencePlan)}
    ${YR(n.stressEnvelope)}
    ${KR(n.portfolioGate)}
    ${JR(n.marketPulse)}
    ${ZR(n.holdExitPlan)}
    ${QR(n.decisionSeal)}
    ${yu("V2.1 SITE VISIT ASSISTANT",n.siteVisitAssistant,"FOCUS",n.siteVisitAssistant?.focus)}
    ${yu("V2.2 SOURCING / PROFESSIONAL FILTER",n.sourcingProfessional,"POSTURE",n.sourcingProfessional?.posture)}
    ${yu("V2.3 TENANT / RENTAL PLAN",n.tenantRentalPlan,"TARGET",n.tenantRentalPlan?.target)}
    ${yu("V2.4 EXIT STRATEGY",n.exitStrategy,"BUYER PSYCHOLOGY",n.exitStrategy?.buyerPsychology)}
    ${e1(n.executionPlan)}
    ${t1(n.learningLoop)}
    ${ko("V3.4 DEAL MEMORY COMPARISON",n.dealMemoryComparison,"matches")}
    ${ko("V3.5 BELIEF TRACKER",n.beliefTracker,"beliefs")}
    ${ko("V3.6 SOURCE TRANSPARENCY",n.sourceTransparency,"sources")}
    ${ko("V3.7 MEMORY CONFLICTS",n.memoryConflicts,"conflicts")}
    ${ko("V3.8 PERSONAL OPERATING RULES",n.personalOperatingRules,"rules")}
    ${d?`<section class="analysisScenarioSection"><h3>DOWNSIDE SCENARIOS</h3><div class="analysisScenarios">${d}</div><p>Stress assumptions are decision tests, not forecasts.</p></section>`:""}
    ${OR(n.marketIntelligence)}
    <ol class="analysisStages">${o}</ol>
    <div class="analysisDetails">
      ${pr("Challenge mode",n.challengeMode?.message?[n.challengeMode.message]:[],n.challengeMode?.level==="hard"?"danger":"warning")}
      ${pr("Hard stops",n.hardStops,"danger")}
      ${pr("Decision blockers",n.recommendationBlockers,"warning")}
      ${pr("Watch-outs",n.watchouts,"warning")}
      ${pr("Estimated Malaysian entry costs",qb(n.acquisitionCostEstimate))}
      ${pr("Missing evidence",n.missingEvidence)}
      ${pr("Check next",n.nextActions,"actions")}
    </div>
    <section class="analysisCounter">
      <h3>STRONGEST COUNTER-THESIS</h3>
      <p>${p(n.counterThesis)}</p>
    </section>
    <div class="analysisActions">
      <button type="button" data-analysis-action="shortlist">${u.status==="refuse"?"SAVE FOR REVIEW":"SAVE TO SHORTLIST"}</button>
      ${vt&&n.savedReportId?'<button type="button" data-analysis-action="journal">RECORD DECISION</button>':""}
      <button type="button" data-analysis-action="copy">COPY REPORT</button>
      <button type="button" data-analysis-action="report">PRINT REPORT</button>
      ${n.residentialDcf&&n.residentialDcf.status!=="incomplete"?'<button type="button" data-analysis-action="dcf">DCF WORKBOOK</button>':""}
    </div>
    ${yb(e)}
  `,o1(s),i.append(s),i===Gt){let m=s.getBoundingClientRect().top-Gt.getBoundingClientRect().top+Gt.scrollTop;Gt.scrollTop=Math.max(0,m-6),Ni()}}function o1(n){let e=".analysisReportTitle,.intelligenceBadge,.analysisHeader,.analysisSummary,.analysisDetails,.analysisCounter,.analysisActions,.analysisMeta,.analysisDimensions",t=new Map;for(let s of Array.from(n.children)){if(s.matches(e))continue;let r=/Metrics|Scenario|dcf|Snapshot/i.test(s.className)?"Numbers and downside":/Memory|Belief|Personal|Learning|Experience/i.test(s.className)?"Personal context and learning":"Evidence and seven-stage checks";if(!t.has(r)){let a=document.createElement("details");a.className="response-detail",a.innerHTML=`<summary>${r}</summary>`,t.set(r,a)}t.get(r).append(s)}let i=n.querySelector(".analysisActions");for(let s of t.values())n.insertBefore(s,i);for(let s of n.querySelectorAll("h3"))s.textContent=s.textContent.replace(/^V\d+(?:\.\d+)?\s+/i,"")}function Xb(n){if(Gt.innerHTML="",!!n?.messages?.length)for(let e of n.messages)As(e.role==="assistant"?"jarvis":e.role,e.content,e.sources||[],e)}function Es(n){id=n,Kn.classList.toggle("speaking",n),Kn.setAttribute("aria-label",n?"Stop Apex Analytic voice":"Talk to Apex Analytic"),ly.hidden=!n}function Ia(n,e){return n.reduce((t,i)=>{let s=i.getAttribute(e),r=String(i.value||"").trim();return r&&(t[s]=r),t},{})}function ts(){return Ia(Cs,"data-deal-field")}function Pa(){return Ia(xr,"data-profile-field")}function l1(){return nd.map(n=>{let e={};for(let t of n.querySelectorAll("[data-dcf-comp-field]")){let i=t.getAttribute("data-dcf-comp-field"),s=t.type==="checkbox"?t.checked:String(t.value||"").trim();s&&(e[i]=s)}return Object.keys(e).some(t=>t!=="verified")?(e.armsLength=!0,e.evidenceType="completed transaction",e):null}).filter(Boolean)}function vd(){let n=Ia(td,"data-dcf-field"),e=l1();return e.length&&(n.comparables=e),n}function ay(){let n=vd();Wu()}function Yb(n=!0){for(let e of td)e.value=e.tagName==="SELECT"&&e.options[0]?.value||"";for(let e of nd)for(let t of e.querySelectorAll("[data-dcf-comp-field]"))t.type==="checkbox"?t.checked=!1:t.value="";window.localStorage.removeItem(mA),Ho&&(Ho.textContent=""),n&&be("System ready","DCF assumptions and comparable sales cleared.")}function Kb(n=vd()){return{dealCard:ts(),financialProfile:Pa(),valuation:n}}function c1(n={}){return{...n.assumptions,asOf:n.asOf,propertyName:n.property?.name,area:n.property?.area,address:n.property?.address,propertyType:n.property?.propertyType,tenure:n.property?.tenure,titleNumber:n.property?.titleNumber,marketRentEvidence:n.evidence?.marketRent,operatingCostEvidence:n.evidence?.operatingCosts,discountRateBasis:n.evidence?.discountRateBasis,terminalCapRateBasis:n.evidence?.terminalCapRateBasis,comparables:n.comparisonApproach?.comparables||[]}}function Jb(){let n=ts();return n.askingPrice?n.floorArea?n.expectedRent?"":"Add a supportable monthly market rent in the Deal card.":"Add the subject floor area in the Deal card.":"Add the asking price in the Deal card."}function Ms(n,e=""){Ho&&(Ho.textContent=n,Ho.className=e)}async function u1(){if(Tn)return null;let n=Jb();if(n)return Ms(n,"danger"),null;Yt(!0),Uo.disabled=!0,Uo.textContent="CALCULATING...",Ms("Running income, comparable, debt, and evidence checks...");try{let e=await je("/api/tools/residential-dcf",{method:"POST",body:JSON.stringify(Kb())});return a1(e.valuation),Ms(e.valuation.marketValue?"Evidence-supported indication calculated. Verify professional valuation before transacting.":"Screening value calculated. Missing evidence prevents a market-value label.",e.valuation.marketValue?"ready":"warning"),e.valuation}catch(e){return Ms(e.message||"DCF calculation is unavailable.","danger"),null}finally{Yt(!1),Uo.disabled=!1,Uo.textContent="CALCULATE VALUE"}}async function lm(n=null){if(Tn)return;let e=n?"":Jb();if(e){Ms(e,"danger");return}Yt(!0),fr&&(fr.disabled=!0,fr.textContent="GENERATING..."),Ms("Generating the auditable Excel model...");try{let t=n?c1(n):Kb(),i=await fetch("/api/tools/residential-dcf/workbook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok){let c=await i.json().catch(()=>({}));throw new Error(c.error||"DCF workbook could not be generated.")}let s=await i.blob(),a=(i.headers.get("content-disposition")||"").match(/filename="([^"]+)"/i)?.[1]||"apex-residential-dcf.xlsx",o=URL.createObjectURL(s),l=document.createElement("a");l.href=o,l.download=a,l.click(),window.setTimeout(()=>URL.revokeObjectURL(o),1e3),Ms("Excel DCF downloaded. Open it to review and stress every blue assumption.","ready")}catch(t){Ms(t.message||"DCF workbook could not be generated.","danger")}finally{Yt(!1),fr&&(fr.disabled=!1,fr.textContent="DOWNLOAD EXCEL")}}function cm(n){return Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`))}function Zb(n,e=[]){return e.some(t=>String(n[t]||"").trim())}function d1(n){return n==="deal"?[{label:"Area/project",keys:["area","projectName"]},{label:"Price",keys:["askingPrice"]},{label:"Rent",keys:["expectedRent"]},{label:"Comps",keys:["comparableTransactions","comparableSource","conservativeFairValue"]},{label:"Site proof",keys:["siteVisitEvidence","siteVisitNotes"]},{label:"Title/legal",keys:["legalTitleType","legalCheck"]}]:n==="profile"?[{label:"Income",keys:["monthlyIncome"]},{label:"Reserve",keys:["cashReserveMonths","cashAvailable"]},{label:"Debt",keys:["currentDebt"]},{label:"Goal",keys:["investmentGoal","portfolioRole"]},{label:"Holding",keys:["holdingPeriod"]},{label:"Concern",keys:["financialConcern","nearTermCommitment"]}]:[{label:"Experience",keys:["experienceLevel"]},{label:"Mode",keys:["guidanceMode"]},{label:"Intent",keys:["decisionIntent"]},{label:"Output",keys:["preferredOutput"]},{label:"Confidence",keys:["confidenceComfort"]}]}function rl(n){let e=cm(n),i=Ia(e,n==="deal"?"data-deal-field":"data-profile-field"),s=d1(n),r=s.filter(c=>!Zb(i,c.keys)).map(c=>c.label),a=s.length-r.length,o=Math.round(a/s.length*100),l=o>=80?"ready":o>=40?"watch":"missing";return{panelName:n,context:i,fields:e,groups:s,missing:r,percent:o,status:l}}function af(){return Ea&&ll.get(Ea)||null}function Ni(){let n=ts();uy.innerHTML="<span>Current investigation</span><b>"+p(n.projectName||n.area||"Your next property")+"</b><small>"+p([n.askingPrice,n.expectedRent?n.expectedRent+" rent":""].filter(Boolean).join(" / ")||"Add a property or explore a question first.")+"</small>"}function Qb(n){let e=rl(n),t=e.missing[0];if(!t){e.fields[0]?.focus();return}let i=e.groups.find(a=>a.label===t),s=n==="deal"?"data-deal-field":"data-profile-field";e.fields.find(a=>i?.keys.includes(a.getAttribute(s)))?.focus()}function h1(n){return n.getAttribute("data-deal-field")||n.getAttribute("data-profile-field")||""}function ex(){try{let n=JSON.parse(window.localStorage.getItem(Kp)||"{}");return n&&typeof n=="object"?n:{}}catch{return window.localStorage.removeItem(Kp),{}}}function p1(n,e){let t=ex();t[n]=e,window.localStorage.setItem(Kp,JSON.stringify(t))}function um(n){return ex()[n]==="all"?"all":"core"}function f1(n,e){return n==="deal"?e==="all"?"Advanced evidence fields are visible. Use them when you have proof, not guesses.":"Start with area/project, price, rent, own-stay quality, management, exit pool, supply, and your main concern.":n==="profile"?e==="all"?"Advanced portfolio context is visible. Add it when the deal is moving beyond first screen.":"Start with income, reserve, cash available, debt, goal, holding period, and financial concern.":"Set the answer style once. Apex will use it to sound more like the adviser you need."}function tx(n,e){let t=n==="deal"?"data-deal-field":"data-profile-field";return cm(n).find(i=>i.getAttribute(t)===e)}function dm(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=um(n),i=e.querySelector(`[data-context-assist="${n}"]`);i||(i=document.createElement("section"),i.className="contextAssist",i.setAttribute("data-context-assist",n),e.prepend(i));let s=rl(n),a=s.groups.filter(l=>!Zb(s.context,l.keys)).filter(l=>t==="all"||l.keys.some(c=>Fu[n]?.has(c))).slice(0,3).map(l=>{let c=l.keys.find(u=>tx(n,u));return c?`<button type="button" data-context-focus-panel="${p(n)}" data-context-focus-key="${p(c)}">${p(l.label)}</button>`:""}).filter(Boolean).join(""),o=n==="deal"?"Deal":n==="profile"?"Profile":"Guidance";i.innerHTML=`
    <header>
      <span><small>${p(o)} guide</small><b>${p(t==="all"?"All fields visible":"Essentials first")}</b></span>
      <button type="button" data-context-field-mode="${p(n)}">${p(t==="all"?"CORE ONLY":"SHOW ALL")}</button>
    </header>
    <p>${p(f1(n,t))}</p>
    ${a?`<div>${a}</div>`:"<em>Enough context for a first pass. Add advanced proof only when the deal deserves deeper work.</em>"}
  `}function nx(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=um(n);e.classList.toggle("contextCoreMode",t!=="all"),e.classList.toggle("contextAllMode",t==="all"),dm(n)}function m1(n,e){p1(n,e),nx(n),be("System ready",e==="all"?"Advanced fields visible.":"Showing only core fields.")}function g1(){for(let n of Object.keys(Fu)){for(let e of cm(n)){let t=h1(e),i=e.closest("label");if(!i)continue;let s=Fu[n].has(t);i.classList.toggle("contextCore",s),i.classList.toggle("contextAdvanced",!s),i.dataset.contextDepth=s?"core":"advanced"}nx(n)}}function hm(){for(let n of Object.keys(Fu))dm(n)}function oy(n={},e=[]){return e.map(([t,i])=>{let s=String(n[t]||"").trim();return s?`${i}: ${s}`:""}).filter(Boolean).join("; ")}function v1(n={}){return!!(n.area||n.projectName||n.askingPrice||n.expectedRent||n.propertyType||n.mainConcern||n.investmentThesis)}function y1(){let n=ts(),e=Pa(),t=rl("deal"),i=rl("profile"),s=oy(n,[["area","area"],["projectName","project"],["propertyType","type"],["askingPrice","price"],["conservativeFairValue","fair value"],["expectedRent","rent"],["estimatedInstallment","installment"],["maintenance","maintenance"],["ownStayAppeal","own-stay"],["managementQuality","management"],["exitBuyerPool","exit pool"],["nearbySupply","nearby supply"],["mainConcern","concern"]])||"not supplied",r=oy(e,[["monthlyIncome","income"],["cashReserveMonths","reserve"],["cashAvailable","cash available"],["currentDebt","debt"],["riskStyle","risk style"],["investmentGoal","goal"],["holdingPeriod","holding"]])||"not supplied",a=[...t.missing.map(o=>`Deal: ${o}`),...i.missing.map(o=>`Profile: ${o}`)].slice(0,6).join("; ")||"no major card gap from the current quick screen";return["Run Apex Deal Screening Mode as a first-pass mentor check, not a full formal report.","Use this exact structure: Verdict, Why, Main risk, Missing proof, Next questions.","Keep it short, human, and direct. Ask at most 3 next questions. Do not create a long report.",`Deal card: ${s}`,`Profile card: ${r}`,`Known missing context: ${a}`].join(`
`)}async function ix(){if(Tn)return;let n=ts();if(!v1(n)){As("jarvis","Open the Deal card and give me at least the area/project, price, rent, or your main concern. Then I can screen it without turning the page into a full report.");let e=Ai.find(t=>t.getAttribute("data-context-toggle")==="deal");e&&Ci(e,!0),Qb("deal");return}Cn(),Ri("Screening the deal."),Ki&&(Ki.disabled=!0,Ki.textContent="SCREENING"),be("Screening","Running a first-pass deal screen.");try{await Na(y1(),{displayText:"Screen this deal using my current Deal/Profile cards."})}finally{Ki&&(Ki.disabled=!1,Ki.textContent="SCREEN")}}function zu(n,e,t){let i=Ia(n,e);Wu(),Ni(),hm()}function b1(n){let e=n==="deal",t=Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`)),i=e?Cs:xr,s=e?"data-deal-field":"data-profile-field",r=e?zf:Gf;for(let l of t)l.value="";e&&Yb(!1);let a=Ia(i,s);Object.keys(a).length?window.localStorage.setItem(r,JSON.stringify(a)):window.localStorage.removeItem(r),Wu();let o=n==="guidance"?"Guidance":e?"Deal":"Profile";Ni(),hm(),be("System ready",`${o} details cleared.`)}function x1(){try{return JSON.parse(window.localStorage.getItem(Ou)||"{}")}catch{return window.localStorage.removeItem(Ou),{}}}function Ci(n,e,t=!0){let i=n.getAttribute("data-context-toggle"),s=document.querySelector(`[data-context-body="${i}"]`),r=n.querySelector(".contextAction");if(s){if(e){tn(i);for(let a of Ai)a!==n&&Ci(a,!1,!1)}if(n.setAttribute("aria-expanded",String(e)),s.hidden=!e,n.closest(".contextPanel")?.classList.toggle("expanded",e),r&&(r.textContent=e?"CLOSE":"OPEN"),e&&dm(i),t){let a=Ai.reduce((o,l)=>{let c=l.getAttribute("data-context-toggle");return o[c]=l===n?e:!1,o},{});window.localStorage.setItem(Ou,JSON.stringify(a))}}}function _1(){let n=x1(),e=Object.entries(n).find(([,t])=>t)?.[0];for(let t of Ai){let i=t.getAttribute("data-context-toggle");Ci(t,i===e,!1),t.addEventListener("click",()=>{let s=t.getAttribute("aria-expanded")==="true";Ci(t,!s)})}for(let t of pA)t.addEventListener("click",()=>b1(t.getAttribute("data-context-reset")))}function Cn(){let n={};for(let e of Ai)Ci(e,!1,!1),n[e.getAttribute("data-context-toggle")]=!1;window.localStorage.setItem(Ou,JSON.stringify(n))}function Ri(n="Voice stopped."){Zp+=1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),ws&&(ws.pause(),ws.src="",ws=null),zo&&(URL.revokeObjectURL(zo),zo=""),mr=!0,Es(!1),Ji||be("System ready",n)}async function S1(n){Ri("Ready when you are.");let e=++Zp;try{Es(!0),be("Speaking","Delivering analysis.");let t=await fetch("/api/jarvis/speech",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":ul()},body:JSON.stringify({text:n})});if(!t.ok){let i=await t.json().catch(()=>({}));throw new Error(i.error||"Server voice is unavailable.")}if(e!==Zp)return;zo=URL.createObjectURL(await t.blob()),ws=new Audio(zo),ws.onended=()=>{Es(!1),be("System ready",mr?"Voice stopped.":"Ready when you are."),Ri("Ready when you are."),mr=!1},ws.onerror=()=>{Es(!1),be("Voice interrupted","The written answer is still available.")},await ws.play()}catch{Es(!1),be("Voice interrupted","The written answer is still available.")}}function of(n){if(!On)return;let e=gA(n);if(!("speechSynthesis"in window)){ab&&S1(e);return}Ri("Ready when you are.");let t=new SpeechSynthesisUtterance(e);t.rate=.96,t.pitch=.9,t.onstart=()=>{mr=!1,Es(!0),be("Speaking","Delivering analysis.")},t.onend=()=>{Es(!1),be("System ready",mr?"Voice stopped.":"Ready when you are."),mr=!1},t.onerror=()=>{Es(!1),mr=!1},window.speechSynthesis.speak(t)}function w1(n){return new Promise((e,t)=>{let i=new FileReader;i.onload=()=>e(String(i.result||"").split(",")[1]||""),i.onerror=t,i.readAsDataURL(n)})}async function E1(){if(ur?.state==="recording"){ur.stop();return}if(!rb||!window.MediaRecorder||!navigator.mediaDevices?.getUserMedia){be("Voice unavailable","Use the command bar on this browser."),Mn.focus();return}try{Ji=!0,Mp=await navigator.mediaDevices.getUserMedia({audio:!0}),Tp=[];let n=["audio/webm;codecs=opus","audio/webm","audio/mp4"].find(e=>MediaRecorder.isTypeSupported(e));ur=new MediaRecorder(Mp,n?{mimeType:n}:void 0),ur.ondataavailable=e=>{e.data.size&&Tp.push(e.data)},ur.onstop=async()=>{Ji=!1,Kn.classList.remove("listening"),Mp?.getTracks().forEach(t=>t.stop());let e=new Blob(Tp,{type:ur.mimeType||"audio/webm"});if(!e.size)return be("Voice interrupted","No recording was captured.");be("Analyzing","Transcribing your message."),Yt(!0);try{let t=await je("/api/jarvis/transcribe",{method:"POST",body:JSON.stringify({audioBase64:await w1(e),mimeType:e.type,filename:e.type.includes("mp4")?"voice.mp4":"voice.webm"})});Mn.value=t.text,Yt(!1),await Na(t.text)}catch(t){be("Voice interrupted",t.message||"Voice transcription failed.")}finally{Yt(!1)}},ur.start(),Ji=!0,Kn.classList.add("listening"),be("Listening","Speak naturally. Tap again when finished.")}catch{Ji=!1,be("Voice interrupted","Microphone access was not available.")}}async function je(n,e={}){let t=await fetch(n,{...e,credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":ul(),...e.headers||{}}});if(!t.ok){let s=await t.json().catch(()=>({})),r=new Error(s.error||"Apex Analytic backend is unavailable.");throw r.status=t.status,r.payload=s,r}if(t.status===204)return null;let i=await t.json();return i.session&&Wu({sessionId:i.session.id,messages:i.session.messages||[],...i.analysis?{report:{analysis:{...i.analysis,savedReportId:i.savedReport?.id},sources:i.sources||[],mode:i.mode,messageId:i.message?.id}}:{}}),i}async function M1(){let n=await je("/api/auth/me");return dl(n.authenticated?n.user:null),n}async function T1(){let n=Qi==="register"?"/api/auth/register":"/api/auth/login",e={email:hf.value.trim(),password:Pp.value};Qi==="register"&&(e.displayName=dy.value.trim()),Lp.disabled=!0,_a.textContent=Qi==="register"?"Creating your private account...":"Signing in...";try{let t=await je(n,{method:"POST",body:JSON.stringify(e)});dl(t.user),Pp.value="",be("System ready",t.verificationPending?"Account ready. Verify your email when convenient.":`Welcome back, ${t.user.displayName}.`)}catch(t){_a.textContent=t.message||"Account access is unavailable."}finally{Lp.disabled=!1}}async function A1(){let n=wu.value.trim();if(!n)return wu.focus();Np.disabled=!0,ya.textContent="Sending reset instructions...";try{let e=await je("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:n})});ya.textContent=e.message,e.debug?.token&&(fy.value=e.debug.token)}catch(e){ya.textContent=e.message||"Password recovery is unavailable."}finally{Np.disabled=!1}}async function C1(){zv.disabled=!0,ya.textContent="Updating password...";try{await je("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:fy.value.trim(),password:Hv.value})}),Hv.value="",qf(!1),sl("login"),_a.textContent="Password updated. Sign in with the new password."}catch(n){ya.textContent=n.message||"Password could not be updated."}finally{zv.disabled=!1}}async function R1(){Mu.disabled=!0;try{let n=await je("/api/auth/request-verification",{method:"POST",body:"{}"});n.debug?.token&&(Eu.value=n.debug.token),be("System ready",n.sent?"Verification code sent.":"Verification request created.")}catch(n){be("Connection issue",n.message||"Verification is unavailable.")}finally{Mu.disabled=!1}}async function I1(){let n=Eu.value.trim();if(!n)return Eu.focus();Tu.disabled=!0;try{let e=await je("/api/auth/verify-email",{method:"POST",body:JSON.stringify({token:n})});dl(e.user),be("System ready","Email verified.")}catch(e){be("Connection issue",e.message||"Verification failed.")}finally{Tu.disabled=!1}}function P1(n){let e=new Date(n.updatedAt),t=Number.isNaN(e.getTime())?"Recent":e.toLocaleString([],{dateStyle:"medium",timeStyle:"short"}),i=n.id===Wt;return`
    <article class="sessionItem${i?" current":""}">
      <button class="sessionOpen" type="button" data-session-action="open" data-session-id="${p(n.id)}">
        <b>${p(n.title||"Untitled conversation")}</b>
        <span>${p(t)} / ${p(n.messageCount||0)} messages${i?" / CURRENT":""}</span>
      </button>
      <button class="sessionDelete" type="button" data-session-action="delete" data-session-id="${p(n.id)}" aria-label="Delete ${p(n.title||"conversation")}">DELETE</button>
    </article>
  `}async function sx(){let n=await je("/api/jarvis/sessions"),e=Array.isArray(n.sessions)?n.sessions:[];return Cu.innerHTML=e.length?e.map(P1).join(""):'<p class="memoryEmpty">No saved conversations yet.</p>',e}function La(){ff.hidden=!0,ju.setAttribute("aria-expanded","false"),document.body.classList.remove("historyOpen")}async function rx(){tn("history"),$n(),hn(),pn(),fn(),nn(),mn(),gn(),vn(),dn(),An(),Cn(),ff.hidden=!1,ju.setAttribute("aria-expanded","true"),document.body.classList.add("historyOpen"),Cu.innerHTML='<p class="memoryEmpty">Loading conversation history...</p>';try{await sx()}catch(n){Cu.innerHTML=`<p class="memoryEmpty">${p(n.message)}</p>`}}async function L1(n){let e=n.getAttribute("data-session-id"),t=n.getAttribute("data-session-action");if(!(!e||!t||Tn)){Yt(!0);try{if(t==="open"){await ox(e),La(),tn("chat"),be("System ready","Conversation restored.");return}await je(`/api/jarvis/sessions/${encodeURIComponent(e)}`,{method:"DELETE"}),e===Wt&&(window.localStorage.removeItem(Ps),Wt=null,await Gu()),await sx()}catch(i){be("Connection issue",i.message||"Conversation history could not be updated.")}finally{Yt(!1)}}}async function N1(){Dp.disabled=!0;try{hn(),pn(),fn(),nn(),mn(),gn(),vn(),La(),await je("/api/auth/logout",{method:"POST",body:"{}"}),window.localStorage.removeItem(Ps),Wt=null,dl(null),sl("login"),be("System ready","Signed out. Guest space ready.")}catch(n){_a.textContent=n.message||"Sign out is unavailable."}finally{Dp.disabled=!1}}async function Gu(n=!0){let e=await je("/api/jarvis/sessions",{method:"POST",body:JSON.stringify({clientId:ul()})});return Wt=e.session.id,window.localStorage.setItem(Ps,Wt),Is("READY"),n&&(Gt.innerHTML=""),Ea="",document.body.classList.remove("conversationActive"),Ni(),e.session}async function ax(){if(!Tn){Yt(!0),Ri("Chat reset."),La(),be("Starting","Creating a new conversation."),tn("chat"),Gt.innerHTML="",Ea="",document.body.classList.remove("conversationActive"),Ni(),window.localStorage.removeItem(Ps),Wt=null;try{await Gu(),be("System ready","New chat ready. Your previous conversation remains in History.")}catch{be("Connection issue","Apex Analytic backend is unavailable."),Is("OFFLINE")}finally{Yt(!1)}}}async function ox(n,e=!0){let t=await je(`/api/jarvis/sessions/${n}`);return Wt=t.session.id,window.localStorage.setItem(Ps,Wt),e&&Xb(t.session),Is(`${t.session.messages.length} MSG`),t.session}async function lx(){if(!Wt)return Gu(!1);try{return await ox(Wt,!1)}catch{return Gu(!1)}}async function D1(n){await lx();let e=ub(n),t=await je("/api/jarvis/query",{method:"POST",body:JSON.stringify({query:n,inputMode:e.id,sessionId:Wt,clientId:ul(),dealCard:ts(),financialProfile:Pa(),responseFeedback:yA()})});Wt=t.session.id,window.localStorage.setItem(Ps,Wt);let i=t.mode==="llm"?"AI":"FRAMEWORK";return Is(`${i} / ${t.session.messages.length}`),t}async function Na(n,e={}){let t=String(n||"").trim();if(!t||Tn)return;Yt(!0);let i=String(e.displayText||t).trim();As("user",i),Mn.value="",sd(""),be("Analyzing","Reviewing your knowledge and prior decisions."),Kn.classList.add("speaking");try{let s=await D1(t);As("jarvis",s.answer,s.sources,s),sC(s.memoryCandidate),of(Ii(s.answer)),On||be("System ready","Ready when you are.")}catch(s){let r=s.message||"The Apex Analytic backend is unavailable.";As("jarvis",r),of(r),be("Connection issue","Start Apex Analytic and try again."),Is("OFFLINE")}finally{Yt(!1),!id&&!window.speechSynthesis?.speaking&&Kn.classList.remove("speaking")}}async function al(){if(Tn)return;let n=ts(),e=Pa(),t=vd();if(!n.askingPrice||!n.area&&!n.projectName){As("jarvis","Add an asking price and an area or project first. I can work with missing evidence after that, but I need a real deal to analyse.");let i=Ai.find(r=>r.getAttribute("data-context-toggle")==="deal");i&&Ci(i,!0),Cs.find(r=>{let a=r.getAttribute("data-deal-field");return a==="askingPrice"&&!n.askingPrice||a==="area"&&!n.area&&!n.projectName})?.focus();return}if(TA("deal-analysis")){tn("chat"),Yt(!0),Cn(),Ri("Running the full framework."),As("user","Run the seven-stage Apex Analytic assessment for this deal."),Bo.disabled=!0,Bo.textContent="ANALYSING...",be("Analyzing","Running all seven Apex Analytic stages."),Kn.classList.add("speaking");try{await lx();let i=await je("/api/jarvis/analyze-deal",{method:"POST",body:JSON.stringify({sessionId:Wt,clientId:ul(),dealCard:n,financialProfile:e,valuation:t})});Wt=i.session.id,window.localStorage.setItem(Ps,Wt);let s=i.mode==="llm"?"AI":"FRAMEWORK";Is(`${s} / ${i.session.messages.length}`),i.billing&&cd(i.billing),i.savedReport&&(i.analysis.savedReportId=i.savedReport.id),om(i.analysis,i.sources,i),of(Ii(i.analysis.voiceSummary)),On||be("System ready","Analysis complete.")}catch(i){let s=i.message||"The deal analysis is unavailable.";As("jarvis",s),be("Connection issue","Deal analysis could not be completed.")}finally{Bo.textContent="Decision report",Yt(!1),!id&&!window.speechSynthesis?.speaking&&Kn.classList.remove("speaking")}}}function O1(){if(!Tn){if(id||window.speechSynthesis?.speaking){Ri("Voice stopped.");return}if(!ui){E1();return}if(Ji){ui.stop();return}ui.start()}}async function k1(){Fo.textContent=On?"VOICE ON":"VOICE OFF",Fo.setAttribute("aria-pressed",String(On)),document.body.classList.toggle("voiceMuted",!On),g1(),ad(),sd(),Ni(),hl(),_1(),sl("login");try{let n=await je("/api/jarvis/status"),e=n.llm?.enabled?"AI":"FRAMEWORK";rb=!!n.audio?.serverStt,ab=!!n.audio?.serverTts,va=!!n.accounts?.emailDelivery,ob=!!n.accounts?.verificationRequired,cl=!!n.ownerMarket?.enabled,sl(Qi),UM.hidden=!n.llm?.enabled,await M1(),Is(`${e} READY`),be("System ready","Ready when you are.")}catch{be("Connection issue","Apex Analytic backend is unavailable."),Is("OFFLINE")}}function U1(){return Tn||Ji}function F1(n){if(Tn)return!1;qo="",Ri("Ready for this property.");for(let i of Cs)i.value=n.dealCard?.[i.dataset.dealField]??"";for(let i of xr)i.value=n.financialProfile?.[i.dataset.profileField]??"";Yb(!1);let e=n.dcfContext||{};for(let i of td)e[i.dataset.dcfField]!==void 0&&(i.value=e[i.dataset.dcfField]);for(let[i,s]of nd.entries())for(let r of s.querySelectorAll("[data-dcf-comp-field]")){let a=e.comparables?.[i]?.[r.dataset.dcfCompField];r.type==="checkbox"?r.checked=a===!0:r.value=a??""}document.querySelector("#valuationResult").replaceChildren(),Wt=n.sessionId||null,ll.clear(),Ea="";let t=n.messages||(n.chat||[]).map(i=>({role:i.role,content:i.text,mode:i.mode}));return Xb({messages:n.report?.analysis?t.filter(i=>i.id!==n.report.messageId):t}),n.report?.analysis&&om(n.report.analysis,n.report.sources,{mode:n.report.mode}),qo=n.id,Ni(),hm(),!0}async function B1(n,e={}){if(!Tn){if(n==="account")return Ca();if(n==="trust")return jf();if(n==="reports")return Yf();if(n==="journal")return ud();if(n==="memory")return xb();if(n==="history")return rx();if(n==="shortlist")return Qf();if(n==="owner")return Gb();if(n==="market")return gd();if(n==="cases")return fd();if(n==="evidence")return md();$n(),dn(),pn(),fn(),hn(),La(),An(),nn(),mn(),gn(),vn(),Cn(),["deal","profile","guidance"].includes(n)?Ci(Ai.find(t=>t.dataset.contextToggle===n),!0,!1):tn(n),n==="chat"&&(e.prompt&&(Mn.value=e.prompt),e.analyze&&!af()?await al():Mn.focus({preventScroll:!0}))}}var qo,Kn,Su,Mn,NM,Sp,Gt,DM,OM,kM,Fo,ly,cy,Ip,Bo,Ki,UM,uy,lf,FM,cf,BM,uf,df,$M,dy,hf,Pp,Lp,hy,py,_a,pf,wu,Np,fy,Hv,zv,VM,ya,HM,zM,GM,Gv,Eu,Mu,Tu,Dp,qu,Ta,WM,Wv,wp,Au,qM,jM,$o,Vo,qv,XM,YM,KM,JM,ju,ff,ZM,my,Cu,QM,eT,tT,Xu,gy,Yu,mf,nT,iT,sT,vr,Ku,gf,rT,vy,aT,oT,Sa,Op,lT,ol,cT,vf,yf,bf,xf,_f,Sf,wf,uT,dT,Mi,hT,pT,fT,yy,by,xy,_y,Sy,wy,Ey,My,Ty,mT,Fn,Ef,Ju,gT,vT,di,yT,bT,jv,Ay,kp,xu,Up,Fp,xT,Bp,_T,$p,Ru,Lt,Ti,wa,ST,Mf,wT,ET,Tf,Xv,MT,Cy,Af,Yv,TT,AT,CT,Zu,Iu,Ry,Kv,Cf,Rf,RT,If,Pf,IT,Lf,Nf,PT,Df,Of,LT,NT,DT,OT,Vp,kT,jo,UT,FT,BT,Xo,$T,VT,kf,Aa,yr,Yo,Ko,Jo,Zo,Iy,Py,Ly,Ny,Qu,Dy,Oy,ky,Uy,Fy,By,$y,Vy,Hy,zy,Uf,Ff,HT,Hp,zp,Gy,Wy,zT,Jv,qy,Pu,Bf,GT,Qo,WT,qT,Gp,Lu,jy,jT,Xy,Nu,XT,$f,Yy,YT,Zv,Wp,KT,JT,ZT,QT,eA,tA,nA,iA,sA,qp,br,Ky,ba,rA,aA,Du,Jy,oA,Zy,jp,Xp,Yp,lA,Qv,Ep,cA,uA,Qy,Vf,ey,ed,Hf,dA,hA,eb,tb,Cs,xr,td,nd,Uo,fr,Ho,Ai,pA,fA,ty,ui,Ps,zf,Gf,mA,Ou,Kp,ny,nb,ib,Rs,sb,Jp,ll,On,Ji,id,mr,Zp,Wt,Qi,vt,rb,ab,va,ob,ur,Mp,Tp,ws,zo,xa,Go,ku,cl,es,lb,el,tl,Ts,ga,nl,Uu,il,cb,Qp,ef,gr,Ea,Tn,Fu,dr,Wf,ux=Px(()=>{qo="";Kn=document.querySelector("#jarvisOrb"),Su=document.querySelector("#chatForm"),Mn=document.querySelector("#chatInput"),NM=Su.querySelector('button[type="submit"]'),Sp=document.querySelector("#inputModeHint"),Gt=document.querySelector("#transcript"),DM=document.querySelector("#assistantPrompt"),OM=document.querySelector("#systemStatus"),kM=document.querySelector("#sessionStatus"),Fo=document.querySelector("#soundToggle"),ly=document.querySelector("#stopVoiceBtn"),cy=document.querySelector("#resetChatBtn"),Ip=document.querySelector("#sessionBriefBtn"),Bo=document.querySelector("#analyzeDealBtn"),Ki=document.querySelector("#screenDealBtn"),UM=document.querySelector("#aiDisclosure"),uy=document.querySelector("#dealJourney"),lf=document.querySelector("#accountToggle"),FM=document.querySelector("#accountLabel"),cf=document.querySelector("#authPanel"),BM=document.querySelector("#authClose"),uf=document.querySelector("#authTitle"),df=document.querySelector("#authForm"),$M=document.querySelector("#authNameField"),dy=document.querySelector("#authName"),hf=document.querySelector("#authEmail"),Pp=document.querySelector("#authPassword"),Lp=document.querySelector("#authSubmit"),hy=document.querySelector("#authModeToggle"),py=document.querySelector("#authRecoveryToggle"),_a=document.querySelector("#authMessage"),pf=document.querySelector("#authRecovery"),wu=document.querySelector("#recoveryEmail"),Np=document.querySelector("#recoveryRequest"),fy=document.querySelector("#recoveryToken"),Hv=document.querySelector("#recoveryPassword"),zv=document.querySelector("#recoverySubmit"),VM=document.querySelector("#recoveryCancel"),ya=document.querySelector("#recoveryMessage"),HM=document.querySelector("#authUser"),zM=document.querySelector("#authUserName"),GM=document.querySelector("#authUserEmail"),Gv=document.querySelector("#authVerificationState"),Eu=document.querySelector("#verificationToken"),Mu=document.querySelector("#verificationRequest"),Tu=document.querySelector("#verificationSubmit"),Dp=document.querySelector("#logoutButton"),qu=document.querySelector("#memoryToggle"),Ta=document.querySelector("#memoryPanel"),WM=document.querySelector("#memoryClose"),Wv=document.querySelector("#memoryForm"),wp=document.querySelector("#memoryInput"),Au=document.querySelector("#memoryList"),qM=document.querySelector("#memoryApprovedCount"),jM=document.querySelector("#memoryPendingCount"),$o=document.querySelector("#memoryCaptureEnabled"),Vo=document.querySelector("#memoryReasoningEnabled"),qv=document.querySelector("#memoryModeNotice"),XM=document.querySelector("#memoryProfileTitle"),YM=document.querySelector("#memoryProfileCompleteness"),KM=document.querySelector("#memoryProfileSummary"),JM=document.querySelector("#memoryProfileDetails"),ju=document.querySelector("#historyToggle"),ff=document.querySelector("#sessionPanel"),ZM=document.querySelector("#sessionClose"),my=document.querySelector("#sessionNew"),Cu=document.querySelector("#sessionList"),QM=document.querySelector("#billingSummary"),eT=document.querySelector("#billingPlanName"),tT=document.querySelector("#billingUsage"),Xu=document.querySelector("#billingActions"),gy=document.querySelector("#billingGuardrail"),Yu=document.querySelector("#reportsToggle"),mf=document.querySelector("#reportsPanel"),nT=document.querySelector("#reportsClose"),iT=document.querySelector("#reportsSavedCount"),sT=document.querySelector("#reportsUsageLabel"),vr=document.querySelector("#reportsList"),Ku=document.querySelector("#journalToggle"),gf=document.querySelector("#journalPanel"),rT=document.querySelector("#journalClose"),vy=document.querySelector("#journalSummary"),aT=document.querySelector("#journalTotalCount"),oT=document.querySelector("#journalReviewedCount"),Sa=document.querySelector("#journalList"),Op=document.querySelector("#journalEditor"),lT=document.querySelector("#journalBack"),ol=document.querySelector("#journalDecisionId"),cT=document.querySelector("#journalSubject"),vf=document.querySelector("#journalDecision"),yf=document.querySelector("#journalConfidence"),bf=document.querySelector("#journalHoldingPeriod"),xf=document.querySelector("#journalThesis"),_f=document.querySelector("#journalCounterThesis"),Sf=document.querySelector("#journalKillCriterion"),wf=document.querySelector("#journalNotes"),uT=document.querySelector("#journalDraftActions"),dT=document.querySelector("#journalSaveDraft"),Mi=document.querySelector("#journalLock"),hT=document.querySelector("#journalDelete"),pT=document.querySelector("#journalLockNotice"),fT=document.querySelector("#journalOutcome"),yy=document.querySelector("#journalOutcomeStatus"),by=document.querySelector("#journalActualRent"),xy=document.querySelector("#journalCurrentValue"),_y=document.querySelector("#journalProcessScore"),Sy=document.querySelector("#journalExecutionScore"),wy=document.querySelector("#journalOutcomeScore"),Ey=document.querySelector("#journalLuckScore"),My=document.querySelector("#journalResult"),Ty=document.querySelector("#journalLesson"),mT=document.querySelector("#journalSaveReview"),Fn=document.querySelector("#journalMessage"),Ef=document.querySelector("#ownerIntelToggle"),Ju=document.querySelector("#ownerIntelPanel"),gT=document.querySelector("#ownerIntelClose"),vT=document.querySelector("#ownerIntelAccess"),di=document.querySelector("#ownerIntelToken"),yT=document.querySelector("#ownerIntelClearToken"),bT=document.querySelector("#ownerIntelSummary"),jv=document.querySelector("#ownerIntelOpsDashboard"),Ay=document.querySelector("#ownerIntelControls"),kp=document.querySelector("#ownerIntelOpsRefresh"),xu=document.querySelector("#ownerIntelCopyBrief"),Up=document.querySelector("#ownerIntelExport"),Fp=document.querySelector("#ownerIntelImport"),xT=document.querySelector("#ownerIntelRestoreHistory"),Bp=document.querySelector("#ownerIntelBackupReminder"),_T=document.querySelector("#ownerIntelBeliefReview"),$p=document.querySelector("#ownerIntelBeliefLog"),Ru=document.querySelector("#ownerIntelImportFile"),Lt=document.querySelector("#ownerIntelRestorePhrase"),Ti=document.querySelector("#ownerIntelRestoreConfirm"),wa=document.querySelector("#ownerIntelRestoreLog"),ST=document.querySelector("#ownerIntelLanes"),Mf=document.querySelector("#ownerIntelCoverage"),wT=document.querySelector("#ownerIntelNextTitle"),ET=document.querySelector("#ownerIntelNextDetail"),Tf=document.querySelector("#ownerIntelActions"),Xv=document.querySelector("#ownerIntelMessage"),MT=document.querySelector("#ownerAdminLoad"),Cy=document.querySelector("#ownerAdminSummary"),Af=document.querySelector("#ownerAdminList"),Yv=document.querySelector("#ownerResearchPanel"),TT=document.querySelector("#ownerResearchSummary"),AT=document.querySelector("#ownerResearchRefresh"),CT=document.querySelector("#ownerResearchImport"),Zu=document.querySelector("#ownerResearchReplace"),Iu=document.querySelector("#ownerResearchFile"),Ry=document.querySelector("#ownerResearchList"),Kv=document.querySelector("#ownerResearchMessage"),Cf=document.querySelector("#ownerMarketToggle"),Rf=document.querySelector("#ownerMarketPanel"),RT=document.querySelector("#ownerMarketClose"),If=document.querySelector("#ownerCaseToggle"),Pf=document.querySelector("#ownerCasePanel"),IT=document.querySelector("#ownerCaseClose"),Lf=document.querySelector("#ownerEvidenceToggle"),Nf=document.querySelector("#ownerEvidencePanel"),PT=document.querySelector("#ownerEvidenceClose"),Df=document.querySelector("#trustToggle"),Of=document.querySelector("#trustPanel"),LT=document.querySelector("#trustClose"),NT=document.querySelector("#trustAcceptance"),DT=document.querySelector("#trustAcceptanceTitle"),OT=document.querySelector("#trustAcceptanceDetail"),Vp=document.querySelector("#trustAccept"),kT=document.querySelector("#ownerMarketAccess"),jo=document.querySelector("#ownerMarketToken"),UT=document.querySelector("#ownerMarketClearToken"),FT=document.querySelector("#ownerMarketSummary"),BT=document.querySelector("#ownerCaseAccess"),Xo=document.querySelector("#ownerCaseToken"),$T=document.querySelector("#ownerCaseClearToken"),VT=document.querySelector("#ownerCaseSummary"),kf=document.querySelector("#ownerCaseForm"),Aa=document.querySelector("#ownerCaseProject"),yr=document.querySelector("#ownerCaseProjectName"),Yo=document.querySelector("#ownerCaseArea"),Ko=document.querySelector("#ownerCaseState"),Jo=document.querySelector("#ownerCaseType"),Zo=document.querySelector("#ownerCaseDeveloper"),Iy=document.querySelector("#ownerCasePriceSegment"),Py=document.querySelector("#ownerCaseVerdict"),Ly=document.querySelector("#ownerCaseConfidence"),Ny=document.querySelector("#ownerCaseRating"),Qu=document.querySelector("#ownerCaseObservedAt"),Dy=document.querySelector("#ownerCaseTags"),Oy=document.querySelector("#ownerCaseTargetBuyer"),ky=document.querySelector("#ownerCaseTargetTenant"),Uy=document.querySelector("#ownerCaseStrengths"),Fy=document.querySelector("#ownerCaseWeaknesses"),By=document.querySelector("#ownerCaseManagement"),$y=document.querySelector("#ownerCaseResident"),Vy=document.querySelector("#ownerCaseSupply"),Hy=document.querySelector("#ownerCaseRental"),zy=document.querySelector("#ownerCaseResale"),Uf=document.querySelector("#ownerCaseOwnerVerdict"),Ff=document.querySelector("#ownerCaseSourceBasis"),HT=document.querySelector("#ownerCaseRefresh"),Hp=document.querySelector("#ownerCaseFilter"),zp=document.querySelector("#ownerCaseVerdictFilter"),Gy=document.querySelector("#ownerCaseCompletenessFilter"),Wy=document.querySelector("#ownerCaseList"),zT=document.querySelector("#ownerCaseMetrics"),Jv=document.querySelector("#ownerCaseMessage"),qy=document.querySelector("#ownerCaseFormTitle"),Pu=document.querySelector("#ownerCaseSubmit"),Bf=document.querySelector("#ownerCaseCancelEdit"),GT=document.querySelector("#ownerEvidenceAccess"),Qo=document.querySelector("#ownerEvidenceToken"),WT=document.querySelector("#ownerEvidenceClearToken"),qT=document.querySelector("#ownerEvidenceSummary"),Gp=document.querySelector("#ownerEvidenceForm"),Lu=document.querySelector("#ownerEvidenceTitle"),jy=document.querySelector("#ownerEvidenceFilename"),jT=document.querySelector("#ownerEvidenceSourceUrl"),Xy=document.querySelector("#ownerEvidenceTags"),Nu=document.querySelector("#ownerEvidenceText"),XT=document.querySelector("#ownerEvidenceRefresh"),$f=document.querySelector("#ownerEvidenceFilter"),Yy=document.querySelector("#ownerEvidenceList"),YT=document.querySelector("#ownerEvidenceMetrics"),Zv=document.querySelector("#ownerEvidenceMessage"),Wp=document.querySelector("#ownerProjectForm"),KT=document.querySelector("#ownerProjectName"),JT=document.querySelector("#ownerProjectArea"),ZT=document.querySelector("#ownerProjectState"),QT=document.querySelector("#ownerProjectType"),eA=document.querySelector("#ownerProjectDeveloper"),tA=document.querySelector("#ownerProjectTenure"),nA=document.querySelector("#ownerProjectCompletionYear"),iA=document.querySelector("#ownerProjectStatus"),sA=document.querySelector("#ownerProjectAliases"),qp=document.querySelector("#ownerObservationForm"),br=document.querySelector("#ownerObservationProject"),Ky=document.querySelector("#ownerObservationMetric"),ba=document.querySelector("#ownerObservationArea"),rA=document.querySelector("#ownerObservationValue"),aA=document.querySelector("#ownerObservationUnit"),Du=document.querySelector("#ownerObservationDate"),Jy=document.querySelector("#ownerObservationSourceType"),oA=document.querySelector("#ownerObservationConfidence"),Zy=document.querySelector("#ownerObservationNotes"),jp=document.querySelector("#ownerMarketAreaFilter"),Xp=document.querySelector("#ownerMarketMetricFilter"),Yp=document.querySelector("#ownerMarketFreshnessFilter"),lA=document.querySelector("#ownerMarketRefresh"),Qv=document.querySelector("#ownerMarketImportForm"),Ep=document.querySelector("#ownerMarketImportText"),cA=document.querySelector("#ownerProjectCount"),uA=document.querySelector("#ownerObservationCount"),Qy=document.querySelector("#ownerProjectList"),Vf=document.querySelector("#ownerObservationList"),ey=document.querySelector("#ownerMarketMessage"),ed=document.querySelector("#shortlistToggle"),Hf=document.querySelector("#shortlistPanel"),dA=document.querySelector("#shortlistClose"),hA=document.querySelector("#shortlistSummary"),eb=document.querySelector("#shortlistList"),tb=document.querySelector("#shortlistClear"),Cs=Array.from(document.querySelectorAll("[data-deal-field]")),xr=Array.from(document.querySelectorAll("[data-profile-field]")),td=Array.from(document.querySelectorAll("[data-dcf-field]")),nd=Array.from(document.querySelectorAll("[data-dcf-comparable]")),Uo=document.querySelector("#dcfCalculateBtn"),fr=document.querySelector("#dcfDownloadBtn"),Ho=document.querySelector("#dcfMessage"),Ai=Array.from(document.querySelectorAll("[data-context-toggle]")),pA=Array.from(document.querySelectorAll("[data-context-reset]")),fA=Array.from(document.querySelectorAll("[data-starter-prompt], [data-starter-action]")),ty=window.SpeechRecognition||window.webkitSpeechRecognition,ui=ty?new ty:null,Ps="estatelab.jarvis.sessionId",zf="estatelab.jarvis.dealCard",Gf="estatelab.jarvis.financialProfile",mA="apex.residentialDcf.v1",Ou="estatelab.jarvis.contextPanels",Kp="apex.contextFieldMode.v1",ny="apex.shortlist.v1",nb="apex.responseFeedback.v1",ib="apex.voiceResponses.v1",Rs="apex.ownerMarket.token",sb="apex.ownerKnowledge.lastBackup.v1",Jp="apex.trustBoundary.accepted.v1",ll=new Map,On=window.localStorage.getItem(ib)==="true",Ji=!1,id=!1,mr=!1,Zp=0,Wt=window.localStorage.getItem(Ps),Qi="login",vt=null,rb=!1,ab=!1,va=!1,ob=!1,ur=null,Mp=null,Tp=[],ws=null,zo="",xa=null,Go=null,ku=[],cl=!1,es=[],lb=[],el="all",tl=null,Ts=null,ga=[],nl=null,Uu=[],il="",cb={},Qp=[],ef=!1,gr="",Ea="",Tn=!1;Fu={deal:new Set(["area","projectName","propertyType","askingPrice","conservativeFairValue","expectedRent","estimatedInstallment","maintenance","ownStayAppeal","managementQuality","exitBuyerPool","nearbySupply","mainConcern"]),profile:new Set(["monthlyIncome","cashReserveMonths","cashAvailable","currentDebt","investmentGoal","holdingPeriod","financialConcern"]),guidance:new Set(["experienceLevel","guidanceMode","decisionIntent","preferredOutput","confidenceComfort","onboardingNotes"])};dr={chat:{label:"CHAT",placeholder:"Ask Apex Analytic...",prompt:"Ask naturally. Apex will route the response style."},screen:{label:"SCREEN",placeholder:"Ask if this deal should be shortlisted...",prompt:"Screening mode: include area, price, rent, and concern if you have them."},compare:{label:"COMPARE",placeholder:"Compare two projects, areas, or deals...",prompt:"Comparison mode: name both options and the decision you need."},offer:{label:"OFFER",placeholder:"Prepare offer, negotiation, or walk-away price...",prompt:"Offer mode: Apex will focus on price proof, leverage, and walk-away rule."},checklist:{label:"CHECKLIST",placeholder:"Ask for a checklist or next action list...",prompt:"Checklist mode: Apex will convert the answer into action items."},voice:{label:"VOICE",placeholder:"Ask for a short voice-safe answer...",prompt:"Voice mode: Apex will keep the spoken answer compact."}};Wf=[{id:"useful",label:"Useful",note:"Keep this answer shape."},{id:"shorter",label:"Shorter",note:"Make future answers shorter and lead with the decision."},{id:"warmer",label:"Less formal",note:"Make future answers more natural and mentor-like."},{id:"evidence",label:"More proof",note:"Add clearer missing evidence and verification steps."}];ui&&(ui.lang="en-MY",ui.interimResults=!0,ui.continuous=!1,ui.onstart=()=>{Ji=!0,Kn.classList.add("listening"),be("Listening","Speak naturally.")},ui.onresult=n=>{let e=Array.from(n.results).map(t=>t[0].transcript).join(" ");Mn.value=e,n.results[n.results.length-1].isFinal&&Na(e)},ui.onerror=()=>{be("Voice interrupted","Tap the orb to try again.")},ui.onend=()=>{Ji=!1,Kn.classList.remove("listening"),window.speechSynthesis?.speaking||be("System ready","Ready when you are.")});Su.addEventListener("submit",n=>{n.preventDefault(),Na(Mn.value)});Kn.addEventListener("click",O1);ly.addEventListener("click",()=>Ri("Voice stopped."));cy.addEventListener("click",ax);Ip.addEventListener("click",()=>void Cb(Ip));Bo.addEventListener("click",al);Ki?.addEventListener("click",()=>void ix());lf.addEventListener("click",()=>{cf.hidden?Ca():$n()});qu.addEventListener("click",()=>{Ta.hidden?xb():hn()});ju.addEventListener("click",()=>{ff.hidden?rx():La()});ZM.addEventListener("click",La);my.addEventListener("click",ax);Cu.addEventListener("click",n=>{let e=n.target.closest("[data-session-action]");e&&L1(e)});WM.addEventListener("click",hn);$o.addEventListener("change",()=>void _b());Vo.addEventListener("change",()=>void _b());Yu.addEventListener("click",()=>{mf.hidden?Yf():pn()});nT.addEventListener("click",pn);vr.addEventListener("click",n=>{let e=n.target.closest("[data-report-action]");e&&lC(e)});Ku.addEventListener("click",()=>{gf.hidden?ud():fn()});rT.addEventListener("click",fn);Sa.addEventListener("click",n=>{let e=n.target.closest("[data-journal-action]");e?.getAttribute("data-journal-action")==="open"&&wb(e.getAttribute("data-journal-id"))});lT.addEventListener("click",()=>void Kf());dT.addEventListener("click",()=>void hC());Mi.addEventListener("click",fC);hT.addEventListener("click",()=>void gC());mT.addEventListener("click",()=>void mC());Cf.addEventListener("click",()=>{Rf.hidden?gd():mn()});RT.addEventListener("click",mn);Ef.addEventListener("click",()=>{Ju.hidden?Gb():nn()});gT.addEventListener("click",nn);Ju.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]");if(!e||Tf.contains(e)||Mf.contains(e))return;e.getAttribute("data-owner-intel-action")==="refresh"&&Ls()});If.addEventListener("click",()=>{Pf.hidden?fd():gn()});IT.addEventListener("click",gn);Lf.addEventListener("click",()=>{Nf.hidden?md():vn()});PT.addEventListener("click",vn);Df.addEventListener("click",()=>{Of.hidden?jf():dn()});LT.addEventListener("click",dn);Vp.addEventListener("click",MA);kT.addEventListener("submit",n=>{n.preventDefault();let e=jo.value.trim();if(!e)return jo.focus();Jn(e),Li()});UT.addEventListener("click",()=>{Jn(""),zb({},{}),Tt("Owner token cleared from this device.")});vT.addEventListener("submit",n=>{n.preventDefault();let e=di.value.trim();if(!e)return di.focus();Jn(e),Ls()});yT.addEventListener("click",()=>{Jn(""),Ts=null,Lt.value="",Lt.hidden=!0,Ti.hidden=!0,wa.hidden=!0,wa.innerHTML="",nf(),Ub([]),$u(),nl=null,Zu.hidden=!0,Ve("Owner token cleared from this device.")});Ay.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-filter]")?.getAttribute("data-owner-intel-filter");e&&(el=e,Ob(tl?.rows||[]))});kp.addEventListener("click",()=>void XC().catch(n=>Ve(n.message||"Production ops could not be checked.","danger")));xu.addEventListener("click",()=>void zC());Up.addEventListener("click",()=>void WC().catch(n=>Ve(n.message||"Owner backup could not be exported.","danger")));Fp.addEventListener("click",()=>Ru.click());xT.addEventListener("click",()=>void QC().catch(n=>Ve(n.message||"Restore log could not be loaded.","danger")));Bp.addEventListener("click",()=>void jC().catch(n=>Ve(n.message||"Backup reminder could not be sent.","danger")));_T.addEventListener("click",()=>void kb().catch(n=>Ve(n.message||"Belief review queue could not be loaded.","danger")));$p.addEventListener("click",n=>{let e=n.target.closest("[data-belief-review]");e&&nR(e).catch(t=>Ve(t.message||"Belief review could not be saved.","danger"))});Ru.addEventListener("change",()=>void KC(Ru.files?.[0]).catch(n=>Ve(n.message||"Owner backup could not be validated.","danger")));Ti.addEventListener("click",()=>void JC().catch(n=>Ve(n.message||"Owner backup could not be restored.","danger")));wa.addEventListener("click",n=>{let e=n.target.closest("[data-owner-rollback-snapshot]")?.getAttribute("data-owner-rollback-snapshot");e&&iR(e).catch(t=>Ve(t.message||"Rollback could not be completed.","danger"))});MT.addEventListener("click",()=>void Fb().catch(n=>Ve(n.message||"User control could not be loaded.","danger")));Af.addEventListener("click",n=>{let e=n.target.closest("[data-owner-admin-action='save']");e&&aR(e).catch(t=>Ve(t.message||"User could not be updated.","danger"))});Tf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]")?.getAttribute("data-owner-intel-action");e==="refresh"&&Ls(),e==="market"&&gd(),e==="cases"&&fd(),e==="evidence"&&md(),e==="research"&&(Yv.open=!0,Yv.scrollIntoView({behavior:"smooth",block:"start"}))});AT.addEventListener("click",()=>void tm().catch(n=>Yn(n.message||"Research studies could not be loaded.","danger")));CT.addEventListener("click",()=>Iu.click());Zu.addEventListener("click",()=>{nl&&Lb(nl,!0).catch(n=>Yn(n.message||"Research study could not be replaced.","danger"))});Iu.addEventListener("change",()=>void LC(Iu.files?.[0]).catch(n=>Yn(n.message||"Research study could not be imported.","danger")));Ry.addEventListener("click",n=>{let e=n.target.closest("[data-owner-research-action='delete']");e&&NC(e.getAttribute("data-owner-research-id")).catch(t=>Yn(t.message||"Research study could not be deleted.","danger"))});Mf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]"),t=e?.getAttribute("data-owner-intel-action");t==="refresh"&&Ls(),["case","signal","proof"].includes(t)&&IR(t,e.getAttribute("data-owner-intel-project"))});BT.addEventListener("submit",n=>{n.preventDefault();let e=Xo.value.trim();if(!e)return Xo.focus();Jn(e),Sr()});$T.addEventListener("click",()=>{Jn(""),Hu({}),Kt("Owner token cleared from this device.")});GT.addEventListener("submit",n=>{n.preventDefault();let e=Qo.value.trim();if(!e)return Qo.focus();Jn(e),pl()});WT.addEventListener("click",()=>{Jn(""),$f.value="",sf({}),Bn("Owner token cleared from this device.")});kf.addEventListener("submit",n=>{n.preventDefault(),Pu.disabled=!0,yR().catch(e=>Kt(e.message||"Development case could not be saved.","danger")).finally(()=>{Pu.disabled=!1})});Bf.addEventListener("click",()=>{rm(),Kt("Edit cancelled.")});Aa.addEventListener("change",()=>{let n=Vb();n&&(yr.value||(yr.value=n.name||""),Yo.value||(Yo.value=n.area||""),Ko.value||(Ko.value=n.state||""),Jo.value||(Jo.value=n.propertyType||""),Zo.value||(Zo.value=n.developer||""))});HT.addEventListener("click",()=>void Sr().catch(n=>Kt(n.message||"Development case library could not be loaded.","danger")));Hp.addEventListener("input",()=>void Sr().catch(()=>{}));zp.addEventListener("change",()=>void Sr().catch(n=>Kt(n.message||"Development case library could not be loaded.","danger")));Gy.addEventListener("change",()=>Hu(cb));Wy.addEventListener("click",n=>{let e=n.target.closest("[data-owner-case-action]"),t=e?.getAttribute("data-owner-case-action");t==="edit"&&vR(e),t==="delete"&&bR(e)});Gp.addEventListener("submit",n=>{n.preventDefault();let e=Gp.querySelector("button[type='submit']");e.disabled=!0,uR().catch(t=>Bn(t.message||"Evidence could not be added.","danger")).finally(()=>{e.disabled=!1})});XT.addEventListener("click",()=>void pl().catch(n=>Bn(n.message||"Evidence vault could not be loaded.","danger")));$f.addEventListener("input",Bb);Yy.addEventListener("click",n=>{let e=n.target.closest("[data-owner-evidence-action='delete']");e&&dR(e)});Wp.addEventListener("submit",n=>{n.preventDefault();let e=Wp.querySelector("button[type='submit']");e.disabled=!0,PR().catch(t=>Tt(t.message||"Project could not be added.","danger")).finally(()=>{e.disabled=!1})});qp.addEventListener("submit",n=>{n.preventDefault();let e=qp.querySelector("button[type='submit']");e.disabled=!0,LR().catch(t=>Tt(t.message||"Observation could not be added.","danger")).finally(()=>{e.disabled=!1})});Qv.addEventListener("submit",n=>{n.preventDefault();let e=Qv.querySelector("button[type='submit']");e.disabled=!0,NR().catch(t=>Tt(t.message||"Market batch could not be imported.","danger")).finally(()=>{e.disabled=!1})});br.addEventListener("change",()=>{let n=es.find(e=>e.id===br.value);n&&!ba.value&&(ba.value=n.area||"")});lA.addEventListener("click",()=>void Li().catch(n=>Tt(n.message||"Market evidence could not be loaded.","danger")));jp.addEventListener("input",()=>void Li().catch(()=>{}));Xp.addEventListener("change",()=>void Li().catch(n=>Tt(n.message||"Market evidence could not be loaded.","danger")));Yp.addEventListener("change",()=>void Li().catch(n=>Tt(n.message||"Market evidence could not be loaded.","danger")));Vf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-market-action='delete-observation']");e&&DR(e)});Xu.addEventListener("click",n=>{let e=n.target.closest("[data-checkout-plan]");e&&aC(e.getAttribute("data-checkout-plan"))});ed.addEventListener("click",()=>{Hf.hidden?Qf():An()});dA.addEventListener("click",An);tb.addEventListener("click",()=>{hd([]),hl(),be("System ready","Shortlist cleared.")});Wv.addEventListener("submit",async n=>{n.preventDefault();let e=wp.value.trim();if(!e)return wp.focus();let t=Wv.querySelector("button");t.disabled=!0;try{await je("/api/memory",{method:"POST",body:JSON.stringify({content:e})}),wp.value="",await ld(),be("System ready","Memory added for review.")}catch(i){be("Connection issue",i.message||"Memory could not be added.")}finally{t.disabled=!1}});for(let n of[Gt,Au,document.querySelector("#savedReportView")])n.addEventListener("click",e=>{let t=e.target.closest("[data-memory-action]");t&&iC(t);let i=e.target.closest("[data-analysis-action]");i&&RC(i);let s=e.target.closest("[data-response-feedback]");s&&wA(s);let r=e.target.closest("[data-response-refine]");r&&EA(r);let a=e.target.closest("[data-coach-prompt]");a&&(Mn.value=a.getAttribute("data-coach-prompt")||"",Mn.focus(),be("System ready","Prompt loaded. Edit or send when ready."))});eb.addEventListener("click",n=>{let e=n.target.closest("[data-shortlist-action]");e&&xC(e)});uy?.addEventListener("click",n=>{let e=n.target.closest("[data-journey-action]");e&&IC(e)});document.addEventListener("click",n=>{if(n.target.closest("[data-report-back]")){document.querySelector("#savedReportView").hidden=!0,vr.hidden=!1;return}let e=n.target.closest("[data-context-field-mode]");if(e){let i=e.getAttribute("data-context-field-mode");m1(i,um(i)==="all"?"core":"all");return}let t=n.target.closest("[data-context-focus-panel]");if(t){let i=t.getAttribute("data-context-focus-panel"),s=t.getAttribute("data-context-focus-key"),r=Ai.find(a=>a.getAttribute("data-context-toggle")===i);r&&Ci(r,!0),tx(i,s)?.focus()}});BM.addEventListener("click",$n);hy.addEventListener("click",()=>sl(Qi==="login"?"register":"login"));py.addEventListener("click",()=>qf(!0));df.addEventListener("submit",n=>{n.preventDefault(),T1()});pf.addEventListener("submit",n=>{n.preventDefault(),C1()});Np.addEventListener("click",A1);VM.addEventListener("click",()=>qf(!1));Mu.addEventListener("click",R1);Tu.addEventListener("click",I1);Dp.addEventListener("click",N1);window.addEventListener("afterprint",CC);Mn.addEventListener("input",()=>sd());Mn.addEventListener("focus",()=>{let n=sd();be("System ready",n.prompt)});for(let n of fA)n.addEventListener("click",()=>{if(n.getAttribute("data-starter-action")==="deal"){Rb("deal");return}let e=n.getAttribute("data-starter-prompt");e&&Na(e)});Fo.addEventListener("click",()=>{On=!On,window.localStorage.setItem(ib,String(On)),Fo.textContent=On?"VOICE ON":"VOICE OFF",Fo.setAttribute("aria-pressed",String(On)),document.body.classList.toggle("voiceMuted",!On),On?be("System ready","Voice response on. Spoken replies stay compact."):Ri("Voice response off.")});for(let n of Cs)n.addEventListener("input",()=>zu(Cs,"data-deal-field",zf));for(let n of xr)n.addEventListener("input",()=>zu(xr,"data-profile-field",Gf));for(let n of[...td,...nd.flatMap(e=>Array.from(e.querySelectorAll("[data-dcf-comp-field]")))])n.addEventListener("input",ay),n.addEventListener("change",ay);Uo?.addEventListener("click",()=>void u1());fr?.addEventListener("click",()=>void lm())});var Vt=(n,e,t,i,s)=>({id:n,title:e,prompt:t,fields:i.split(" "),source:s}),Ct=[{id:"district",title:"The District",subject:"Property selection",short:"Select",color:"#8fd8be",description:"Find the place worth believing in.",lesson:"A low price is an invitation to investigate. The property still has to earn its place.",position:[-7,0,2],document:"MY_INVESTMENT_FRAMEWORK.md",checkpoints:[Vt("identity","Place your candidate","Start with one real property. Which area, building and unit are you investigating?","projectName area propertyType propertyAge floorArea askingPrice tenure","Stage 1A-C: selection philosophy, area and price segment"),Vt("value","Prove the entry price","Use completed sales of comparable units. Asking prices alone cannot establish value.","conservativeFairValue comparableTransactions comparableSource comparableRecency comparableMatchQuality comparablePriceRange comparableAdjustmentNotes","Stage 1C/G: price discipline and transaction evidence"),Vt("appeal","See the future buyer","Why would someone choose to live here, and why would an investor buy it later?","unitPosition ownStayAppeal exitBuyerPool managementQuality","Stage 1D-F: buyer depth, own-stay appeal and quality"),Vt("visit","Walk the building","Record what you actually observed. Renderings cannot prove a completed building's condition.","siteVisit siteVisitEvidence lobbyGuardhouseSignal liftCarparkCorridorSignal commonAreaCondition residentBehaviourSignal defectLeakageSignal siteVisitNotes inspectionConcern","Stage 1E-F; Execution Calibration D: physical inspection"),Vt("management","Look behind the lobby","Test the management response and collection record. Attractive architecture needs sustained care.","managementResponseSignal arrearsJmbSignal siteManagementNotes","Stage 1F; Execution Calibration E-F: management and project culture")]},{id:"compass",title:"The Compass",subject:"Investor suitability",short:"Fit",color:"#bfd298",description:"Make the property fit your life.",lesson:"Being able to obtain a loan is different from being able to live comfortably with it.",position:[-3.3,.5,-3.5],document:"INVESTOR_MANDATE_PROFILE.md",checkpoints:[Vt("capacity","Measure your breathing room","Use your actual income, existing monthly debt and cash remaining for this purchase.","monthlyIncome currentDebt cashAvailable cashReserveMonths","Buying Power Discipline; Cash Reserve Gate"),Vt("mandate","Choose your destination","Name the job this property must do, the holding period, and any upcoming demands on your cash.","riskStyle investmentGoal holdingPeriod nearTermCommitment financialConcern","Strategy Fit; Refusal And Cooling-Off Rules")]},{id:"vault",title:"The Vault",subject:"Financing & structure",short:"Finance",color:"#dcc597",description:"Build on financing that can hold.",lesson:"The transaction should work at the genuine price, with every payment and obligation visible.",position:[2.5,1,-4.6],document:"DEAL_STRUCTURING_FINANCING.md",checkpoints:[Vt("loan","Test the loan","Use a lender-backed estimate and review margin, documentation and instalment stress together.","estimatedInstallment cashOutlay bankValuationSupport loanPrecheckStatus loanMarginPlan instalmentStress cashBufferAfterPurchase financingDocumentReadiness financingNotes","Loan Margin Discipline; Cash Cost Discipline; Stress Test Standard"),Vt("title","Clear the transaction","Confirm title, seller authority and the path for transferring funds with your lawyer.","legalCheck legalTitleType titleTransferStatus caveatRestrictionStatus sellerAuthorityStatus arrearsUtilitiesStatus stakeholderFlowStatus lawyerCoordinationStatus legalTransactionNotes","Stage 1K: title and transactionability; Financing-Led Deal Test"),Vt("sourcing","Challenge the sales story","Separate evidence about the asset from urgency, promises and negotiation pressure.","dealSource agentBehavior sellerMotivation professionalConcern","Execution Calibration A-C: sourcing, negotiation and professional filtering")]},{id:"residence",title:"The Residence",subject:"Holding power",short:"Hold",color:"#9dcad4",description:"Make the everyday numbers work.",lesson:"Rent is the start of the calculation. Vacancy, maintenance and repairs decide your holding power.",position:[7,.4,-.2],document:"HOLDING_POWER_ASSET_MANAGEMENT.md",checkpoints:[Vt("rent","Follow real tenant demand","Check achieved rents, enquiry quality and seasonality for comparable units.","expectedRent rentEvidence rentalSource rentalRecency tenantUrgency vacancySignal rentalSustainability rentalAdjustmentNotes","Stage 1I: rental resilience; Rental Reality Test"),Vt("costs","Count the quiet costs","Include recurring costs, a repair allowance and vacancy. Enter zero explicitly where it is justified.","maintenance annualAssessmentQuitRent annualInsuranceTax monthlyRepairReserve furnishingBudget vacancyStressMonths","True Holding Cost; Vacancy And Repair Stress"),Vt("tenant","Plan the lived experience","Furnish for the target tenant and screen using documented behaviour, identity and affordability.","targetTenant furnishingStrategy tenantScreening","Execution Calibration G-H: furnishing and tenant management")]},{id:"portfolio",title:"The Collection",subject:"Portfolio strategy",short:"Balance",color:"#b6ace1",description:"Choose what makes the whole stronger.",lesson:"One successful investment does not prove the next. Test how this asset changes your total exposure.",position:[5,.9,5.3],document:"PORTFOLIO_STRATEGY_SCALING.md",checkpoints:[Vt("exposure","Place it in the portfolio","For a first purchase enter zero properties and assess the concentration this new asset would create.","existingProperties portfolioRole existingPortfolioHealth concentrationRisk nextPurchaseReason","Portfolio concentration; Next-Purchase Gate")]},{id:"horizon",title:"The Observatory",subject:"Market & timing",short:"Observe",color:"#e5b6a4",description:"Look past today's sales pitch.",lesson:"A catalyst is a hypothesis. Study competing supply, absorption and your position if it arrives late.",position:[-.1,1.3,7.4],document:"MARKET_INTELLIGENCE_TIMING.md",checkpoints:[Vt("supply","Map the next wave","Inspect the nearest substitutes and future completion dates, including comparable new layouts and prices.","nearbySupply supplyRadius substituteCount substituteThreat futureSupplyTiming densityLiftStress","Stage 1J: supply and density; Supply Pipeline"),Vt("absorption","Read the ground signals","Use dated occupancy, achieved rent and unsold-stock evidence. A busy gallery is not a completed sale.","absorptionEvidence unsoldStockSignal supplyNotes","Local Area Cycle; Buyer Sentiment And Liquidity")]},{id:"summit",title:"The Summit",subject:"Decision & learning",short:"Decide",color:"#e4dfbd",description:"Earn your conclusion.",lesson:"Write what would prove you wrong before the outcome is known. Revisit the thesis as reality changes.",position:[-6,1.1,7],document:"DECISION_JOURNAL_LEARNING.md",checkpoints:[Vt("exit","Design the way out","Consider your future buyers, viewing access, unit presentation and the cost of preparing for sale.","exitStrategyPlan resalePreparation","Execution Calibration I: exit strategy and buyer psychology"),Vt("thesis","Commit the hypothesis","Explain why it should work, the strongest concern and the discovery that makes you walk away.","investmentThesis mainConcern killCriterion","Pre-Purchase Thesis; Counter-Thesis; Kill Criteria; Outcome Review")]}];var Sd=new Set(["inspectionConcern","professionalConcern","financialConcern","nearTermCommitment"]);function wd(n,e,t){return String(n?.[t[e]?.scope]?.[e]??"").trim()}function Ua(n,e,t){let i=e.fields.filter(o=>!Sd.has(o)&&!wd(n,o,t)),s=n?.evidence?.[e.id];(!s?.note||String(s.note).trim().length<12)&&i.push("evidenceNote");let r=String(s?.date||""),a=Date.parse(r);return(!/^\d{4}-\d{2}-\d{2}$/.test(r)||!Number.isFinite(a)||new Date(a).toISOString().slice(0,10)!==r||r>new Date().toISOString().slice(0,10))&&i.push("evidenceDate"),i}var vs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ys={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rg=0,ah=1,ag=2;var oh=1,og=2,Si=3,ri=0,Xt=1,wn=2,ji=0,Hs=1,lh=2,ch=3,uh=4,lg=5,hs=100,cg=101,ug=102,dg=103,hg=104,pg=200,fg=201,mg=202,gg=203,ql=204,jl=205,vg=206,yg=207,bg=208,xg=209,_g=210,Sg=211,wg=212,Eg=213,Mg=214,hc=0,pc=1,fc=2,zs=3,mc=4,gc=5,vc=6,yc=7,bc=0,Tg=1,Ag=2,Xi=0,Cg=1,Rg=2,Ig=3,xc=4,Pg=5,Lg=6,Ng=7,Jd="attached",Dg="detached",dh=300,tr=301,nr=302,_c=303,Sc=304,Mo=306,ps=1e3,pi=1001,Vr=1002,qt=1003,wc=1004;var ir=1005;var an=1006,na=1007;var li=1008;var ci=1009,hh=1010,ph=1011,ia=1012,Ec=1013,bs=1014,jn=1015,sa=1016,Mc=1017,Tc=1018,ra=1020,fh=35902,mh=35899,gh=1021,vh=1022,Dn=1023,Hr=1026,aa=1027,Ac=1028,Cc=1029,yh=1030,Rc=1031;var Ic=1033,To=33776,Ao=33777,Co=33778,Ro=33779,Pc=35840,Lc=35841,Nc=35842,Dc=35843,Oc=36196,kc=37492,Uc=37496,Fc=37808,Bc=37809,$c=37810,Vc=37811,Hc=37812,zc=37813,Gc=37814,Wc=37815,qc=37816,jc=37817,Xc=37818,Yc=37819,Kc=37820,Jc=37821,Zc=36492,Qc=36494,eu=36495,tu=36283,nu=36284,iu=36285,su=36286,Og=2200,kg=2201,Ug=2202,Gs=2300,Ws=2301,Wl=2302,$s=2400,Vs=2401,Xa=2402,ru=2500,Fg=2501,bh=0,Io=1,oa=2,Bg=3200,$g=3201;var au=0,Vg=1,Yi="",Mt="srgb",jt="srgb-linear",Ya="linear",at="srgb";var Bs=7680;var Zd=519,Hg=512,zg=513,Gg=514,xh=515,Wg=516,qg=517,jg=518,Xg=519,Xl=35044;var _h="300 es",ni=2e3,Ka=2001;var ai=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_m=1234567,qa=Math.PI/180,qs=180/Math.PI;function si(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function Sh(n,e){return(n%e+e)%e}function Nx(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Dx(n,e,t){return n!==e?(t-n)/(e-n):0}function ja(n,e,t){return(1-t)*n+t*e}function Ox(n,e,t,i){return ja(n,e,1-Math.exp(-t*i))}function kx(n,e=1){return e-Math.abs(Sh(n,e*2)-e)}function Ux(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Fx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Bx(n,e){return n+Math.floor(Math.random()*(e-n+1))}function $x(n,e){return n+Math.random()*(e-n)}function Vx(n){return n*(.5-Math.random())}function Hx(n){n!==void 0&&(_m=n);let e=_m+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zx(n){return n*qa}function Gx(n){return n*qs}function Wx(n){return(n&n-1)===0&&n!==0}function qx(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function jx(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Xx(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),h=a((e-i)/2),m=r((i-e)/2),v=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*v,l*m,o*c);break;case"YXY":n.set(l*m,o*u,l*v,o*c);break;case"ZYZ":n.set(l*v,l*m,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ti(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Po={DEG2RAD:qa,RAD2DEG:qs,generateUUID:si,clamp:Ke,euclideanModulo:Sh,mapLinear:Nx,inverseLerp:Dx,lerp:ja,damp:Ox,pingpong:kx,smoothstep:Ux,smootherstep:Fx,randInt:Bx,randFloat:$x,randFloatSpread:Vx,seededRandom:Hx,degToRad:zx,radToDeg:Gx,isPowerOfTwo:Wx,ceilPowerOfTwo:qx,floorPowerOfTwo:jx,setQuaternionFromProperEuler:Xx,normalize:rt,denormalize:ti},Pe=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},zt=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],m=r[a+1],v=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=m,e[t+2]=v,e[t+3]=y;return}if(d!==y||l!==h||c!==m||u!==v){let g=1-o,f=l*h+c*m+u*v+d*y,M=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){let A=Math.sqrt(E),R=Math.atan2(A,f*M);g=Math.sin(g*R)/A,o=Math.sin(o*R)/A}let S=o*M;if(l=l*g+h*S,c=c*g+m*S,u=u*g+v*S,d=d*g+y*S,g===1-o){let A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],m=r[a+2],v=r[a+3];return e[t]=o*v+u*d+l*m-c*h,e[t+1]=l*v+u*h+c*d-o*m,e[t+2]=c*v+u*m+o*h-l*d,e[t+3]=u*v-o*d-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),m=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*m*v,this._y=c*m*d-h*u*v,this._z=c*u*v+h*m*d,this._w=c*u*d-h*m*v;break;case"YXZ":this._x=h*u*d+c*m*v,this._y=c*m*d-h*u*v,this._z=c*u*v-h*m*d,this._w=c*u*d+h*m*v;break;case"ZXY":this._x=h*u*d-c*m*v,this._y=c*m*d+h*u*v,this._z=c*u*v+h*m*d,this._w=c*u*d-h*m*v;break;case"ZYX":this._x=h*u*d-c*m*v,this._y=c*m*d+h*u*v,this._z=c*u*v-h*m*d,this._w=c*u*d+h*m*v;break;case"YZX":this._x=h*u*d+c*m*v,this._y=c*m*d+h*u*v,this._z=c*u*v-h*m*d,this._w=c*u*d-h*m*v;break;case"XZY":this._x=h*u*d-c*m*v,this._y=c*m*d-h*u*v,this._z=c*u*v+h*m*d,this._w=c*u*d+h*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(i>o&&i>d){let m=2*Math.sqrt(1+i-o-d);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){let m=2*Math.sqrt(1+o-i-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{let m=2*Math.sqrt(1+d-i-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ed.copy(this).projectOnVector(e),this.sub(Ed)}reflect(e){return this.sub(Ed.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ed=new N,Sm=new zt,Ge=class n{constructor(e,t,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],m=i[5],v=i[8],y=s[0],g=s[3],f=s[6],M=s[1],E=s[4],S=s[7],A=s[2],R=s[5],L=s[8];return r[0]=a*y+o*M+l*A,r[3]=a*g+o*E+l*R,r[6]=a*f+o*S+l*L,r[1]=c*y+u*M+d*A,r[4]=c*g+u*E+d*R,r[7]=c*f+u*S+d*L,r[2]=h*y+m*M+v*A,r[5]=h*g+m*E+v*R,r[8]=h*f+m*S+v*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,m=c*r-a*l,v=t*d+i*h+s*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/v;return e[0]=d*y,e[1]=(s*c-u*i)*y,e[2]=(o*i-s*a)*y,e[3]=h*y,e[4]=(u*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=m*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Md.makeScale(e,t)),this}rotate(e){return this.premultiply(Md.makeRotation(-e)),this}translate(e,t){return this.premultiply(Md.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Md=new Ge;function wh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function zr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Yg(){let n=zr("canvas");return n.style.display="block",n}var wm={};function Gr(n){n in wm||(wm[n]=!0,console.warn(n))}function Kg(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Em=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mm=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yx(){let n={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Hi(s.r),s.g=Hi(s.g),s.b=Hi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=$r(s.r),s.g=$r(s.g),s.b=$r(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yi?Ya:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[jt]:{primaries:e,whitePoint:i,transfer:Ya,toXYZ:Em,fromXYZ:Mm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:i,transfer:at,toXYZ:Em,fromXYZ:Mm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),n}var et=Yx();function Hi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function $r(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Tr,Yl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Tr===void 0&&(Tr=zr("canvas")),Tr.width=e.width,Tr.height=e.height;let s=Tr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Tr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=zr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Hi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Hi(t[i]/255)*255):t[i]=Hi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Kx=0,Wr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=si(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Td(s[a].image)):r.push(Td(s[a]))}else r=Td(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Td(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Yl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Jx=0,Ad=new N,Ot=class n extends ai{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=pi,s=pi,r=an,a=li,o=Dn,l=ci,c=n.DEFAULT_ANISOTROPY,u=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jx++}),this.uuid=si(),this.name="",this.source=new Wr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ad).x}get height(){return this.source.getSize(Ad).y}get depth(){return this.source.getSize(Ad).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ps:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ps:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=dh;Ot.DEFAULT_ANISOTROPY=1;var it=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],m=l[5],v=l[9],y=l[2],g=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-y)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+y)<.1&&Math.abs(v+g)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,S=(m+1)/2,A=(f+1)/2,R=(u+h)/4,L=(d+y)/4,k=(v+g)/4;return E>S&&E>A?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=R/i,r=L/i):S>A?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=R/s,r=k/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=L/r,s=k/r),this.set(i,s,r,t),this}let M=Math.sqrt((g-v)*(g-v)+(d-y)*(d-y)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-v)/M,this.y=(d-y)/M,this.z=(h-u)/M,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Kl=class extends ai{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);let s={width:e,height:t,depth:i.depth},r=new Ot(s);this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Wr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},mi=class extends Kl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Ja=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Jl=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Nn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zn):Zn.fromBufferAttribute(r,a),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_l.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_l.copy(i.boundingBox)),_l.applyMatrix4(e.matrixWorld),this.union(_l)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fa),Sl.subVectors(this.max,Fa),Ar.subVectors(e.a,Fa),Cr.subVectors(e.b,Fa),Rr.subVectors(e.c,Fa),rs.subVectors(Cr,Ar),as.subVectors(Rr,Cr),Os.subVectors(Ar,Rr);let t=[0,-rs.z,rs.y,0,-as.z,as.y,0,-Os.z,Os.y,rs.z,0,-rs.x,as.z,0,-as.x,Os.z,0,-Os.x,-rs.y,rs.x,0,-as.y,as.x,0,-Os.y,Os.x,0];return!Cd(t,Ar,Cr,Rr,Sl)||(t=[1,0,0,0,1,0,0,0,1],!Cd(t,Ar,Cr,Rr,Sl))?!1:(wl.crossVectors(rs,as),t=[wl.x,wl.y,wl.z],Cd(t,Ar,Cr,Rr,Sl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ki=[new N,new N,new N,new N,new N,new N,new N,new N],Zn=new N,_l=new Nn,Ar=new N,Cr=new N,Rr=new N,rs=new N,as=new N,Os=new N,Fa=new N,Sl=new N,wl=new N,ks=new N;function Cd(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ks.fromArray(n,r);let o=s.x*Math.abs(ks.x)+s.y*Math.abs(ks.y)+s.z*Math.abs(ks.z),l=e.dot(ks),c=t.dot(ks),u=i.dot(ks);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Zx=new Nn,Ba=new N,Rd=new N,xn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Zx.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ba.subVectors(e,this.center);let t=Ba.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ba,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ba.copy(e.center).add(Rd)),this.expandByPoint(Ba.copy(e.center).sub(Rd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ui=new N,Id=new N,El=new N,os=new N,Pd=new N,Ml=new N,Ld=new N,gi=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ui.copy(this.origin).addScaledVector(this.direction,t),Ui.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Id.copy(e).add(t).multiplyScalar(.5),El.copy(t).sub(e).normalize(),os.copy(this.origin).sub(Id);let r=e.distanceTo(t)*.5,a=-this.direction.dot(El),o=os.dot(this.direction),l=-os.dot(El),c=os.lengthSq(),u=Math.abs(1-a*a),d,h,m,v;if(u>0)if(d=a*l-o,h=a*o-l,v=r*u,d>=0)if(h>=-v)if(h<=v){let y=1/u;d*=y,h*=y,m=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-r,-l),r),m=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Id).addScaledVector(El,h),m}intersectSphere(e,t){Ui.subVectors(e.center,this.origin);let i=Ui.dot(this.direction),s=Ui.dot(Ui)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ui)!==null}intersectTriangle(e,t,i,s,r){Pd.subVectors(t,e),Ml.subVectors(i,e),Ld.crossVectors(Pd,Ml);let a=this.direction.dot(Ld),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;os.subVectors(this.origin,e);let l=o*this.direction.dot(Ml.crossVectors(os,Ml));if(l<0)return null;let c=o*this.direction.dot(Pd.cross(os));if(c<0||l+c>a)return null;let u=-o*os.dot(Ld);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ze=class n{constructor(e,t,i,s,r,a,o,l,c,u,d,h,m,v,y,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,h,m,v,y,g)}set(e,t,i,s,r,a,o,l,c,u,d,h,m,v,y,g){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=m,f[7]=v,f[11]=y,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/Ir.setFromMatrixColumn(e,0).length(),r=1/Ir.setFromMatrixColumn(e,1).length(),a=1/Ir.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,m=a*d,v=o*u,y=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=m+v*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=v+m*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,m=l*d,v=c*u,y=c*d;t[0]=h+y*o,t[4]=v*o-m,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=m*o-v,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,m=l*d,v=c*u,y=c*d;t[0]=h-y*o,t[4]=-a*d,t[8]=v+m*o,t[1]=m+v*o,t[5]=a*u,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,m=a*d,v=o*u,y=o*d;t[0]=l*u,t[4]=v*c-m,t[8]=h*c+y,t[1]=l*d,t[5]=y*c+h,t[9]=m*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,m=a*c,v=o*l,y=o*c;t[0]=l*u,t[4]=y-h*d,t[8]=v*d+m,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*d+v,t[10]=h-y*d}else if(e.order==="XZY"){let h=a*l,m=a*c,v=o*l,y=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+y,t[5]=a*u,t[9]=m*d-v,t[2]=v*d-m,t[6]=o*u,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qx,e,e0)}lookAt(e,t,i){let s=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),ls.crossVectors(i,Pn),ls.lengthSq()===0&&(Math.abs(i.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),ls.crossVectors(i,Pn)),ls.normalize(),Tl.crossVectors(Pn,ls),s[0]=ls.x,s[4]=Tl.x,s[8]=Pn.x,s[1]=ls.y,s[5]=Tl.y,s[9]=Pn.y,s[2]=ls.z,s[6]=Tl.z,s[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],m=i[13],v=i[2],y=i[6],g=i[10],f=i[14],M=i[3],E=i[7],S=i[11],A=i[15],R=s[0],L=s[4],k=s[8],w=s[12],_=s[1],P=s[5],B=s[9],G=s[13],q=s[2],j=s[6],Y=s[10],D=s[14],C=s[3],X=s[7],te=s[11],Q=s[15];return r[0]=a*R+o*_+l*q+c*C,r[4]=a*L+o*P+l*j+c*X,r[8]=a*k+o*B+l*Y+c*te,r[12]=a*w+o*G+l*D+c*Q,r[1]=u*R+d*_+h*q+m*C,r[5]=u*L+d*P+h*j+m*X,r[9]=u*k+d*B+h*Y+m*te,r[13]=u*w+d*G+h*D+m*Q,r[2]=v*R+y*_+g*q+f*C,r[6]=v*L+y*P+g*j+f*X,r[10]=v*k+y*B+g*Y+f*te,r[14]=v*w+y*G+g*D+f*Q,r[3]=M*R+E*_+S*q+A*C,r[7]=M*L+E*P+S*j+A*X,r[11]=M*k+E*B+S*Y+A*te,r[15]=M*w+E*G+S*D+A*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],m=e[14],v=e[3],y=e[7],g=e[11],f=e[15];return v*(+r*l*d-s*c*d-r*o*h+i*c*h+s*o*m-i*l*m)+y*(+t*l*m-t*c*h+r*a*h-s*a*m+s*c*u-r*l*u)+g*(+t*c*d-t*o*m-r*a*d+i*a*m+r*o*u-i*c*u)+f*(-s*o*u-t*l*d+t*o*h+s*a*d-i*a*h+i*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],m=e[11],v=e[12],y=e[13],g=e[14],f=e[15],M=d*g*c-y*h*c+y*l*m-o*g*m-d*l*f+o*h*f,E=v*h*c-u*g*c-v*l*m+a*g*m+u*l*f-a*h*f,S=u*y*c-v*d*c+v*o*m-a*y*m-u*o*f+a*d*f,A=v*d*l-u*y*l-v*o*h+a*y*h+u*o*g-a*d*g,R=t*M+i*E+s*S+r*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/R;return e[0]=M*L,e[1]=(y*h*r-d*g*r-y*s*m+i*g*m+d*s*f-i*h*f)*L,e[2]=(o*g*r-y*l*r+y*s*c-i*g*c-o*s*f+i*l*f)*L,e[3]=(d*l*r-o*h*r-d*s*c+i*h*c+o*s*m-i*l*m)*L,e[4]=E*L,e[5]=(u*g*r-v*h*r+v*s*m-t*g*m-u*s*f+t*h*f)*L,e[6]=(v*l*r-a*g*r-v*s*c+t*g*c+a*s*f-t*l*f)*L,e[7]=(a*h*r-u*l*r+u*s*c-t*h*c-a*s*m+t*l*m)*L,e[8]=S*L,e[9]=(v*d*r-u*y*r-v*i*m+t*y*m+u*i*f-t*d*f)*L,e[10]=(a*y*r-v*o*r+v*i*c-t*y*c-a*i*f+t*o*f)*L,e[11]=(u*o*r-a*d*r-u*i*c+t*d*c+a*i*m-t*o*m)*L,e[12]=A*L,e[13]=(u*y*s-v*d*s+v*i*h-t*y*h-u*i*g+t*d*g)*L,e[14]=(v*o*s-a*y*s-v*i*l+t*y*l+a*i*g-t*o*g)*L,e[15]=(a*d*s-u*o*s+u*i*l-t*d*l-a*i*h+t*o*h)*L,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,m=r*u,v=r*d,y=a*u,g=a*d,f=o*d,M=l*c,E=l*u,S=l*d,A=i.x,R=i.y,L=i.z;return s[0]=(1-(y+f))*A,s[1]=(m+S)*A,s[2]=(v-E)*A,s[3]=0,s[4]=(m-S)*R,s[5]=(1-(h+f))*R,s[6]=(g+M)*R,s[7]=0,s[8]=(v+E)*L,s[9]=(g-M)*L,s[10]=(1-(h+y))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=Ir.set(s[0],s[1],s[2]).length(),a=Ir.set(s[4],s[5],s[6]).length(),o=Ir.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Qn.copy(this);let c=1/r,u=1/a,d=1/o;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=u,Qn.elements[5]*=u,Qn.elements[6]*=u,Qn.elements[8]*=d,Qn.elements[9]*=d,Qn.elements[10]*=d,t.setFromRotationMatrix(Qn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=ni,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),m=(i+s)/(i-s),v,y;if(l)v=r/(a-r),y=a*r/(a-r);else if(o===ni)v=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Ka)v=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=ni,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),m=-(i+s)/(i-s),v,y;if(l)v=1/(a-r),y=a/(a-r);else if(o===ni)v=-2/(a-r),y=-(a+r)/(a-r);else if(o===Ka)v=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Ir=new N,Qn=new ze,Qx=new N(0,0,0),e0=new N(1,1,1),ls=new N,Tl=new N,Pn=new N,Tm=new ze,Am=new zt,qn=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Tm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Am.setFromEuler(this),this.setFromQuaternion(Am,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qn.DEFAULT_ORDER="XYZ";var qr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},t0=0,Cm=new N,Pr=new zt,Fi=new ze,Al=new N,$a=new N,n0=new N,i0=new zt,Rm=new N(1,0,0),Im=new N(0,1,0),Pm=new N(0,0,1),Lm={type:"added"},s0={type:"removed"},Lr={type:"childadded",child:null},Nd={type:"childremoved",child:null},ft=class n extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new N,t=new qn,i=new zt,s=new N(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ze},normalMatrix:{value:new Ge}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Pr.setFromAxisAngle(e,t),this.quaternion.multiply(Pr),this}rotateOnWorldAxis(e,t){return Pr.setFromAxisAngle(e,t),this.quaternion.premultiply(Pr),this}rotateX(e){return this.rotateOnAxis(Rm,e)}rotateY(e){return this.rotateOnAxis(Im,e)}rotateZ(e){return this.rotateOnAxis(Pm,e)}translateOnAxis(e,t){return Cm.copy(e).applyQuaternion(this.quaternion),this.position.add(Cm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rm,e)}translateY(e){return this.translateOnAxis(Im,e)}translateZ(e){return this.translateOnAxis(Pm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Al.copy(e):Al.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),$a.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt($a,Al,this.up):Fi.lookAt(Al,$a,this.up),this.quaternion.setFromRotationMatrix(Fi),s&&(Fi.extractRotation(s.matrixWorld),Pr.setFromRotationMatrix(Fi),this.quaternion.premultiply(Pr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lm),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(s0),Nd.child=e,this.dispatchEvent(Nd),Nd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lm),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($a,e,n0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($a,i0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),m=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};ft.DEFAULT_UP=new N(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ei=new N,Bi=new N,Dd=new N,$i=new N,Nr=new N,Dr=new N,Nm=new N,Od=new N,kd=new N,Ud=new N,Fd=new it,Bd=new it,$d=new it,ds=class n{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ei.subVectors(e,t),s.cross(ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ei.subVectors(s,t),Bi.subVectors(i,t),Dd.subVectors(e,t);let a=ei.dot(ei),o=ei.dot(Bi),l=ei.dot(Dd),c=Bi.dot(Bi),u=Bi.dot(Dd),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,m=(c*l-o*u)*h,v=(a*u-o*l)*h;return r.set(1-m-v,v,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,$i)===null?!1:$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,$i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$i.x),l.addScaledVector(a,$i.y),l.addScaledVector(o,$i.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Fd.setScalar(0),Bd.setScalar(0),$d.setScalar(0),Fd.fromBufferAttribute(e,t),Bd.fromBufferAttribute(e,i),$d.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Fd,r.x),a.addScaledVector(Bd,r.y),a.addScaledVector($d,r.z),a}static isFrontFacing(e,t,i,s){return ei.subVectors(i,t),Bi.subVectors(e,t),ei.cross(Bi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),ei.cross(Bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Nr.subVectors(s,i),Dr.subVectors(r,i),Od.subVectors(e,i);let l=Nr.dot(Od),c=Dr.dot(Od);if(l<=0&&c<=0)return t.copy(i);kd.subVectors(e,s);let u=Nr.dot(kd),d=Dr.dot(kd);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Nr,a);Ud.subVectors(e,r);let m=Nr.dot(Ud),v=Dr.dot(Ud);if(v>=0&&m<=v)return t.copy(r);let y=m*c-l*v;if(y<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Dr,o);let g=u*v-m*d;if(g<=0&&d-u>=0&&m-v>=0)return Nm.subVectors(r,s),o=(d-u)/(d-u+(m-v)),t.copy(s).addScaledVector(Nm,o);let f=1/(g+y+h);return a=y*f,o=h*f,t.copy(i).addScaledVector(Nr,a).addScaledVector(Dr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cs={h:0,s:0,l:0},Cl={h:0,s:0,l:0};function Vd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Oe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=et.workingColorSpace){if(e=Sh(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Vd(a,r,e+1/3),this.g=Vd(a,r,e),this.b=Vd(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Mt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){let i=Jg[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hi(e.r),this.g=Hi(e.g),this.b=Hi(e.b),this}copyLinearToSRGB(e){return this.r=$r(e.r),this.g=$r(e.g),this.b=$r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return et.workingToColorSpace(Qt.copy(this),e),Math.round(Ke(Qt.r*255,0,255))*65536+Math.round(Ke(Qt.g*255,0,255))*256+Math.round(Ke(Qt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Qt.copy(this),t);let i=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Mt){et.workingToColorSpace(Qt.copy(this),e);let t=Qt.r,i=Qt.g,s=Qt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(cs),this.setHSL(cs.h+e,cs.s+t,cs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(cs),e.getHSL(Cl);let i=ja(cs.h,Cl.h,t),s=ja(cs.s,Cl.s,t),r=ja(cs.l,Cl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qt=new Oe;Oe.NAMES=Jg;var r0=0,on=class extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=si(),this.name="",this.type="Material",this.blending=Hs,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ql,this.blendDst=jl,this.blendEquation=hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bs,this.stencilZFail=Bs,this.stencilZPass=Bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hs&&(i.blending=this.blending),this.side!==ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ql&&(i.blendSrc=this.blendSrc),this.blendDst!==jl&&(i.blendDst=this.blendDst),this.blendEquation!==hs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ln=class extends on{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Rt=new N,Rl=new Pe,a0=0,Pt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:a0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Xl,this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Rl.fromBufferAttribute(this,t),Rl.applyMatrix3(e),this.setXY(t,Rl.x,Rl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ti(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xl&&(e.usage=this.usage),e}};var Za=class extends Pt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Qa=class extends Pt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Dt=class extends Pt{constructor(e,t,i){super(new Float32Array(e),t,i)}},o0=0,Gn=new ze,Hd=new ft,Or=new N,Ln=new Nn,Va=new Nn,Ht=new N,cn=class n extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wh(e)?Qa:Za)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ge().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,i){return Gn.makeTranslation(e,t,i),this.applyMatrix4(Gn),this}scale(e,t,i){return Gn.makeScale(e,t,i),this.applyMatrix4(Gn),this}lookAt(e){return Hd.lookAt(e),Hd.updateMatrix(),this.applyMatrix4(Hd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Dt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let i=this.boundingSphere.center;if(Ln.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Va.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(Ln.min,Va.min),Ln.expandByPoint(Ht),Ht.addVectors(Ln.max,Va.max),Ln.expandByPoint(Ht)):(Ln.expandByPoint(Va.min),Ln.expandByPoint(Va.max))}Ln.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ht.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ht));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ht.fromBufferAttribute(o,c),l&&(Or.fromBufferAttribute(e,c),Ht.add(Or)),s=Math.max(s,i.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let k=0;k<i.count;k++)o[k]=new N,l[k]=new N;let c=new N,u=new N,d=new N,h=new Pe,m=new Pe,v=new Pe,y=new N,g=new N;function f(k,w,_){c.fromBufferAttribute(i,k),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,_),h.fromBufferAttribute(r,k),m.fromBufferAttribute(r,w),v.fromBufferAttribute(r,_),u.sub(c),d.sub(c),m.sub(h),v.sub(h);let P=1/(m.x*v.y-v.x*m.y);isFinite(P)&&(y.copy(u).multiplyScalar(v.y).addScaledVector(d,-m.y).multiplyScalar(P),g.copy(d).multiplyScalar(m.x).addScaledVector(u,-v.x).multiplyScalar(P),o[k].add(y),o[w].add(y),o[_].add(y),l[k].add(g),l[w].add(g),l[_].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let k=0,w=M.length;k<w;++k){let _=M[k],P=_.start,B=_.count;for(let G=P,q=P+B;G<q;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let E=new N,S=new N,A=new N,R=new N;function L(k){A.fromBufferAttribute(s,k),R.copy(A);let w=o[k];E.copy(w),E.sub(A.multiplyScalar(A.dot(w))).normalize(),S.crossVectors(R,w);let P=S.dot(l[k])<0?-1:1;a.setXYZW(k,E.x,E.y,E.z,P)}for(let k=0,w=M.length;k<w;++k){let _=M[k],P=_.start,B=_.count;for(let G=P,q=P+B;G<q;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,u=new N,d=new N;if(e)for(let h=0,m=e.count;h<m;h+=3){let v=e.getX(h+0),y=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,m=t.count;h<m;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),m=0,v=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?m=l[y]*o.data.stride+o.offset:m=l[y]*u;for(let f=0;f<u;f++)h[v++]=c[m++]}return new Pt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],m=e(h,i);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let m=c[d];u.push(m.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dm=new ze,Us=new gi,Il=new xn,Om=new N,Pl=new N,Ll=new N,Nl=new N,zd=new N,Dl=new N,km=new N,Ol=new N,ot=class extends ft{constructor(e=new cn,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Dl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(zd.fromBufferAttribute(d,e),a?Dl.addScaledVector(zd,u):Dl.addScaledVector(zd.sub(t),u))}t.add(Dl)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Il.copy(i.boundingSphere),Il.applyMatrix4(r),Us.copy(e.ray).recast(e.near),!(Il.containsPoint(Us.origin)===!1&&(Us.intersectSphere(Il,Om)===null||Us.origin.distanceToSquared(Om)>(e.far-e.near)**2))&&(Dm.copy(r).invert(),Us.copy(e.ray).applyMatrix4(Dm),!(i.boundingBox!==null&&Us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Us)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,y=h.length;v<y;v++){let g=h[v],f=a[g.materialIndex],M=Math.max(g.start,m.start),E=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let S=M,A=E;S<A;S+=3){let R=o.getX(S),L=o.getX(S+1),k=o.getX(S+2);s=kl(this,f,e,i,c,u,d,R,L,k),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);for(let g=v,f=y;g<f;g+=3){let M=o.getX(g),E=o.getX(g+1),S=o.getX(g+2);s=kl(this,a,e,i,c,u,d,M,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,y=h.length;v<y;v++){let g=h[v],f=a[g.materialIndex],M=Math.max(g.start,m.start),E=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let S=M,A=E;S<A;S+=3){let R=S,L=S+1,k=S+2;s=kl(this,f,e,i,c,u,d,R,L,k),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let g=v,f=y;g<f;g+=3){let M=g,E=g+1,S=g+2;s=kl(this,a,e,i,c,u,d,M,E,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function l0(n,e,t,i,s,r,a,o){let l;if(e.side===Xt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===ri,o),l===null)return null;Ol.copy(o),Ol.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Ol);return c<t.near||c>t.far?null:{distance:c,point:Ol.clone(),object:n}}function kl(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Pl),n.getVertexPosition(l,Ll),n.getVertexPosition(c,Nl);let u=l0(n,e,t,i,Pl,Ll,Nl,km);if(u){let d=new N;ds.getBarycoord(km,Pl,Ll,Nl,d),s&&(u.uv=ds.getInterpolatedAttribute(s,o,l,c,d,new Pe)),r&&(u.uv1=ds.getInterpolatedAttribute(r,o,l,c,d,new Pe)),a&&(u.normal=ds.getInterpolatedAttribute(a,o,l,c,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new N,materialIndex:0};ds.getNormal(Pl,Ll,Nl,h.normal),u.face=h,u.barycoord=d}return u}var fs=class n extends cn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,m=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(u,3)),this.setAttribute("uv",new Dt(d,2));function v(y,g,f,M,E,S,A,R,L,k,w){let _=S/L,P=A/k,B=S/2,G=A/2,q=R/2,j=L+1,Y=k+1,D=0,C=0,X=new N;for(let te=0;te<Y;te++){let Q=te*P-G;for(let de=0;de<j;de++){let pe=de*_-B;X[y]=pe*M,X[g]=Q*E,X[f]=q,c.push(X.x,X.y,X.z),X[y]=0,X[g]=0,X[f]=R>0?1:-1,u.push(X.x,X.y,X.z),d.push(de/L),d.push(1-te/k),D+=1}}for(let te=0;te<k;te++)for(let Q=0;Q<L;Q++){let de=h+Q+j*te,pe=h+Q+j*(te+1),We=h+(Q+1)+j*(te+1),tt=h+(Q+1)+j*te;l.push(de,pe,tt),l.push(pe,We,tt),C+=6}o.addGroup(m,C,w),m+=C,h+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function sr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function en(n){let e={};for(let t=0;t<n.length;t++){let i=sr(n[t]);for(let s in i)e[s]=i[s]}return e}function c0(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Eh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}var Zg={clone:sr,merge:en},u0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,d0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,oi=class extends on{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=u0,this.fragmentShader=d0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sr(e.uniforms),this.uniformsGroups=c0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},eo=class extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},us=new N,Um=new Pe,Fm=new Pe,It=class extends eo{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=qs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(qa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qs*2*Math.atan(Math.tan(qa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){us.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(us.x,us.y).multiplyScalar(-e/us.z),us.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(us.x,us.y).multiplyScalar(-e/us.z)}getViewSize(e,t){return this.getViewBounds(e,Um,Fm),t.subVectors(Fm,Um)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(qa*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},kr=-90,Ur=1,Zl=class extends ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new It(kr,Ur,e,t);s.layers=this.layers,this.add(s);let r=new It(kr,Ur,e,t);r.layers=this.layers,this.add(r);let a=new It(kr,Ur,e,t);a.layers=this.layers,this.add(a);let o=new It(kr,Ur,e,t);o.layers=this.layers,this.add(o);let l=new It(kr,Ur,e,t);l.layers=this.layers,this.add(l);let c=new It(kr,Ur,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===ni)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ka)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,m),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},to=class extends Ot{constructor(e=[],t=tr,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ql=class extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new to(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fs(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:ji});r.uniforms.tEquirect.value=t;let a=new ot(s,r),o=t.minFilter;return t.minFilter===li&&(t.minFilter=an),new Zl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},ii=class extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},h0={type:"move"},jr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,i),f=this._getHandJoint(c,y);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,v=.005;c.inputState.pinching&&h>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(h0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ii;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var js=class extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Xr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xl,this.updateRanges=[],this.version=0,this.uuid=si()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},rn=new N,Yr=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ti(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Bm=new N,$m=new it,Vm=new it,p0=new N,Hm=new ze,Ul=new N,Gd=new xn,zm=new ze,Wd=new gi,no=class extends ot{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jd,this.bindMatrix=new ze,this.bindMatrixInverse=new ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ul),this.boundingBox.expandByPoint(Ul)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ul),this.boundingSphere.expandByPoint(Ul)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gd.copy(this.boundingSphere),Gd.applyMatrix4(s),e.ray.intersectsSphere(Gd)!==!1&&(zm.copy(s).invert(),Wd.copy(e.ray).applyMatrix4(zm),!(this.boundingBox!==null&&Wd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Wd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new it,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Jd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Dg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,s=this.geometry;$m.fromBufferAttribute(s.attributes.skinIndex,e),Vm.fromBufferAttribute(s.attributes.skinWeight,e),Bm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Vm.getComponent(r);if(a!==0){let o=$m.getComponent(r);Hm.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(p0.copy(Bm).applyMatrix4(Hm),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Kr=class extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}},io=class extends Ot{constructor(e=null,t=1,i=1,s,r,a,o,l,c=qt,u=qt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Gm=new ze,f0=new ze,so=class n{constructor(e=[],t=[]){this.uuid=si(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new ze;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:f0;Gm.multiplyMatrices(o,t[r]),Gm.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new io(t,e,e,Dn,jn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){let r=e.bones[i],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Kr),this.bones.push(a),this.boneInverses.push(new ze().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=i[s];e.boneInverses.push(o.toArray())}return e}},ms=class extends Pt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Fr=new ze,Wm=new ze,Fl=[],qm=new Nn,m0=new ze,Ha=new ot,za=new xn,Xs=class extends ot{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ms(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,m0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Fr),qm.copy(e.boundingBox).applyMatrix4(Fr),this.boundingBox.union(qm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Fr),za.copy(e.boundingSphere).applyMatrix4(Fr),this.boundingSphere.union(za)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(Ha.geometry=this.geometry,Ha.material=this.material,Ha.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),za.copy(this.boundingSphere),za.applyMatrix4(i),e.ray.intersectsSphere(za)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fr),Wm.multiplyMatrices(i,Fr),Ha.matrixWorld=Wm,Ha.raycast(e,Fl);for(let a=0,o=Fl.length;a<o;a++){let l=Fl[a];l.instanceId=r,l.object=this,t.push(l)}Fl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ms(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new io(new Float32Array(s*this.count),s,this.count,Ac,jn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},qd=new N,g0=new N,v0=new Ge,Wn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=qd.subVectors(i,t).cross(g0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(qd),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||v0.getNormalMatrix(e),s=this.coplanarPoint(qd).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fs=new xn,y0=new Pe(.5,.5),Bl=new N,Jr=class{constructor(e=new Wn,t=new Wn,i=new Wn,s=new Wn,r=new Wn,a=new Wn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ni,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],m=r[7],v=r[8],y=r[9],g=r[10],f=r[11],M=r[12],E=r[13],S=r[14],A=r[15];if(s[0].setComponents(c-a,m-u,f-v,A-M).normalize(),s[1].setComponents(c+a,m+u,f+v,A+M).normalize(),s[2].setComponents(c+o,m+d,f+y,A+E).normalize(),s[3].setComponents(c-o,m-d,f-y,A-E).normalize(),i)s[4].setComponents(l,h,g,S).normalize(),s[5].setComponents(c-l,m-h,f-g,A-S).normalize();else if(s[4].setComponents(c-l,m-h,f-g,A-S).normalize(),t===ni)s[5].setComponents(c+l,m+h,f+g,A+S).normalize();else if(t===Ka)s[5].setComponents(l,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fs)}intersectsSprite(e){Fs.center.set(0,0,0);let t=y0.distanceTo(e.center);return Fs.radius=.7071067811865476+t,Fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fs)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Bl.x=s.normal.x>0?e.max.x:e.min.x,Bl.y=s.normal.y>0?e.max.y:e.min.y,Bl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Bl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Zr=class extends on{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ec=new N,tc=new N,jm=new ze,Ga=new gi,$l=new xn,jd=new N,Xm=new N,Ys=class extends ft{constructor(e=new cn,t=new Zr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ec.fromBufferAttribute(t,s-1),tc.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ec.distanceTo(tc);e.setAttribute("lineDistance",new Dt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$l.copy(i.boundingSphere),$l.applyMatrix4(s),$l.radius+=r,e.ray.intersectsSphere($l)===!1)return;jm.copy(s).invert(),Ga.copy(e.ray).applyMatrix4(jm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let m=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let y=m,g=v-1;y<g;y+=c){let f=u.getX(y),M=u.getX(y+1),E=Vl(this,e,Ga,l,f,M,y);E&&t.push(E)}if(this.isLineLoop){let y=u.getX(v-1),g=u.getX(m),f=Vl(this,e,Ga,l,y,g,v-1);f&&t.push(f)}}else{let m=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let y=m,g=v-1;y<g;y+=c){let f=Vl(this,e,Ga,l,y,y+1,y);f&&t.push(f)}if(this.isLineLoop){let y=Vl(this,e,Ga,l,v-1,m,v-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Vl(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(ec.fromBufferAttribute(o,s),tc.fromBufferAttribute(o,r),t.distanceSqToSegment(ec,tc,jd,Xm)>i)return;jd.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(jd);if(!(c<e.near||c>e.far))return{distance:c,point:Xm.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Ym=new N,Km=new N,ro=class extends Ys{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Ym.fromBufferAttribute(t,s),Km.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ym.distanceTo(Km);e.setAttribute("lineDistance",new Dt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ao=class extends Ys{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Qr=class extends on{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Jm=new ze,Qd=new gi,Hl=new xn,zl=new N,oo=class extends ft{constructor(e=new cn,t=new Qr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Hl.copy(i.boundingSphere),Hl.applyMatrix4(s),Hl.radius+=r,e.ray.intersectsSphere(Hl)===!1)return;Jm.copy(s).invert(),Qd.copy(e.ray).applyMatrix4(Jm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let v=h,y=m;v<y;v++){let g=c.getX(v);zl.fromBufferAttribute(d,g),Zm(zl,g,l,s,e,t,this)}}else{let h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let v=h,y=m;v<y;v++)zl.fromBufferAttribute(d,v),Zm(zl,v,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Zm(n,e,t,i,s,r,a){let o=Qd.distanceSqToPoint(n);if(o<t){let l=new N;Qd.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var lo=class extends Ot{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},co=class extends Ot{constructor(e,t,i=bs,s,r,a,o=qt,l=qt,c,u=Hr,d=1){if(u!==Hr&&u!==aa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},uo=class extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var ho=class n extends cn{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],m=[],v=0,y=[],g=i/2,f=0;M(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Dt(d,3)),this.setAttribute("normal",new Dt(h,3)),this.setAttribute("uv",new Dt(m,2));function M(){let S=new N,A=new N,R=0,L=(t-e)/i;for(let k=0;k<=r;k++){let w=[],_=k/r,P=_*(t-e)+e;for(let B=0;B<=s;B++){let G=B/s,q=G*l+o,j=Math.sin(q),Y=Math.cos(q);A.x=P*j,A.y=-_*i+g,A.z=P*Y,d.push(A.x,A.y,A.z),S.set(j,L,Y).normalize(),h.push(S.x,S.y,S.z),m.push(G,1-_),w.push(v++)}y.push(w)}for(let k=0;k<s;k++)for(let w=0;w<r;w++){let _=y[w][k],P=y[w+1][k],B=y[w+1][k+1],G=y[w][k+1];(e>0||w!==0)&&(u.push(_,P,G),R+=3),(t>0||w!==r-1)&&(u.push(P,B,G),R+=3)}c.addGroup(f,R,0),f+=R}function E(S){let A=v,R=new Pe,L=new N,k=0,w=S===!0?e:t,_=S===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,g*_,0),h.push(0,_,0),m.push(.5,.5),v++;let P=v;for(let B=0;B<=s;B++){let q=B/s*l+o,j=Math.cos(q),Y=Math.sin(q);L.x=w*Y,L.y=g*_,L.z=w*j,d.push(L.x,L.y,L.z),h.push(0,_,0),R.x=j*.5+.5,R.y=Y*.5*_+.5,m.push(R.x,R.y),v++}for(let B=0;B<s;B++){let G=A+B,q=P+B;S===!0?u.push(q,q+1,G):u.push(q+1,q,G),k+=3}c.addGroup(f,k,S===!0?1:2),f+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ks=class n extends cn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,m=[],v=[],y=[],g=[];for(let f=0;f<u;f++){let M=f*h-a;for(let E=0;E<c;E++){let S=E*d-r;v.push(S,-M,0),y.push(0,0,1),g.push(E/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let E=M+c*f,S=M+c*(f+1),A=M+1+c*(f+1),R=M+1+c*f;m.push(E,S,R),m.push(S,A,R)}this.setIndex(m),this.setAttribute("position",new Dt(v,3)),this.setAttribute("normal",new Dt(y,3)),this.setAttribute("uv",new Dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},po=class n extends cn{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],u=[],d=e,h=(t-e)/s,m=new N,v=new Pe;for(let y=0;y<=s;y++){for(let g=0;g<=i;g++){let f=r+g/i*a;m.x=d*Math.cos(f),m.y=d*Math.sin(f),l.push(m.x,m.y,m.z),c.push(0,0,1),v.x=(m.x/t+1)/2,v.y=(m.y/t+1)/2,u.push(v.x,v.y)}d+=h}for(let y=0;y<s;y++){let g=y*(i+1);for(let f=0;f<i;f++){let M=f+g,E=M,S=M+i+1,A=M+i+2,R=M+1;o.push(E,S,R),o.push(S,A,R)}}this.setIndex(o),this.setAttribute("position",new Dt(l,3)),this.setAttribute("normal",new Dt(c,3)),this.setAttribute("uv",new Dt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var vi=class extends on{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=au,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},_n=class extends vi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var fo=class extends on{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=au,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},nc=class extends on{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ic=class extends on{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Gl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function b0(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function x0(n){function e(s,r){return n[s]-n[r]}let t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function Qm(n,e,t){let i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function Qg(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}var zi=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break t}a=i,i=0;break n}break e}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},sc=class extends zi{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$s,endingEnd:$s}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Vs:r=e,o=2*t-i;break;case Xa:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Vs:a=e,l=2*i-t;break;case Xa:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,m=this._weightNext,v=(i-t)/(s-t),y=v*v,g=y*v,f=-h*g+2*h*y-h*v,M=(1+h)*g+(-1.5-2*h)*y+(-.5+h)*v+1,E=(-1-m)*g+(1.5+m)*y+.5*v,S=m*g-m*y;for(let A=0;A!==o;++A)r[A]=f*a[u+A]+M*a[c+A]+E*a[l+A]+S*a[d+A];return r}},mo=class extends zi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},rc=class extends zi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Sn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gl(t,this.TimeBufferType),this.values=Gl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Gl(e.times,Array),values:Gl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new rc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Gs:t=this.InterpolantFactoryMethodDiscrete;break;case Ws:t=this.InterpolantFactoryMethodLinear;break;case Wl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gs;case this.InterpolantFactoryMethodLinear:return Ws;case this.InterpolantFactoryMethodSmooth:return Wl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&b0(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Wl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*i,h=d-i,m=d+i;for(let v=0;v!==i;++v){let y=t[d+v];if(y!==t[h+v]||y!==t[m+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let m=0;m!==i;++m)t[h+m]=t[d+m]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=Ws;var Gi=class extends Sn{constructor(e,t,i){super(e,t,i)}};Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=Gs;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var go=class extends Sn{constructor(e,t,i,s){super(e,t,i,s)}};go.prototype.ValueTypeName="color";var yi=class extends Sn{constructor(e,t,i,s){super(e,t,i,s)}};yi.prototype.ValueTypeName="number";var ac=class extends zi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)zt.slerpFlat(r,0,a,c-o,a,c,l);return r}},bi=class extends Sn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new ac(this.times,this.values,this.getValueSize(),e)}};bi.prototype.ValueTypeName="quaternion";bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Wi=class extends Sn{constructor(e,t,i){super(e,t,i)}};Wi.prototype.ValueTypeName="string";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=Gs;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var xi=class extends Sn{constructor(e,t,i,s){super(e,t,i,s)}};xi.prototype.ValueTypeName="vector";var Js=class{constructor(e="",t=-1,i=[],s=ru){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=si(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(S0(i[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(Sn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=x0(l);l=Qm(l,1,u),c=Qm(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new yi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let d=u[1],h=s[d];h||(s[d]=h=[]),h.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(d,h,m,v,y){if(m.length!==0){let g=[],f=[];Qg(m,g,f,v),g.length!==0&&y.push(new d(h,g,f))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let d=0;d<c.length;d++){let h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let m={},v;for(v=0;v<h.length;v++)if(h[v].morphTargets)for(let y=0;y<h[v].morphTargets.length;y++)m[h[v].morphTargets[y]]=-1;for(let y in m){let g=[],f=[];for(let M=0;M!==h[v].morphTargets.length;++M){let E=h[v];g.push(E.time),f.push(E.morphTarget===y?1:0)}s.push(new yi(".morphTargetInfluence["+y+"]",g,f))}l=m.length*a}else{let m=".bones["+t[d].name+"]";i(xi,m+".position",h,"pos",s),i(bi,m+".quaternion",h,"rot",s),i(xi,m+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let i=0,s=e.length;i!==s;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function _0(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return xi;case"color":return go;case"quaternion":return bi;case"bool":case"boolean":return Gi;case"string":return Wi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function S0(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=_0(n.type);if(n.times===void 0){let t=[],i=[];Qg(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var fi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},oc=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let m=c[d],v=c[d+1];if(m.global&&(m.lastIndex=0),m.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},ev=new oc,_i=class{constructor(e){this.manager=e!==void 0?e:ev,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};_i.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vi={},eh=class extends Error{constructor(e,t){super(e),this.response=t}},ea=class extends _i{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=fi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Vi[e]!==void 0){Vi[e].push({onLoad:t,onProgress:i,onError:s});return}Vi[e]=[],Vi[e].push({onLoad:t,onProgress:i,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Vi[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),m=h?parseInt(h):0,v=m!==0,y=0,g=new ReadableStream({start(f){M();function M(){d.read().then(({done:E,value:S})=>{if(E)f.close();else{y+=S.byteLength;let A=new ProgressEvent("progress",{lengthComputable:v,loaded:y,total:m});for(let R=0,L=u.length;R<L;R++){let k=u[R];k.onProgress&&k.onProgress(A)}f.enqueue(S),M()}},E=>{f.error(E)})}}});return new Response(g)}else throw new eh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,m=new TextDecoder(h);return c.arrayBuffer().then(v=>m.decode(v))}}}).then(c=>{fi.add(`file:${e}`,c);let u=Vi[e];delete Vi[e];for(let d=0,h=u.length;d<h;d++){let m=u[d];m.onLoad&&m.onLoad(c)}}).catch(c=>{let u=Vi[e];if(u===void 0)throw this.manager.itemError(e),c;delete Vi[e];for(let d=0,h=u.length;d<h;d++){let m=u[d];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Br=new WeakMap,lc=class extends _i{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=fi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Br.get(a);d===void 0&&(d=[],Br.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=zr("img");function l(){u(),t&&t(this);let d=Br.get(this)||[];for(let h=0;h<d.length;h++){let m=d[h];m.onLoad&&m.onLoad(this)}Br.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),fi.remove(`image:${e}`);let h=Br.get(this)||[];for(let m=0;m<h.length;m++){let v=h[m];v.onError&&v.onError(d)}Br.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),fi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var vo=class extends _i{constructor(e){super(e)}load(e,t,i,s){let r=new Ot,a=new lc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},Zs=class extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},yo=class extends Zs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Xd=new ze,eg=new N,tg=new N,bo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.mapType=ci,this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jr,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;eg.setFromMatrixPosition(e.matrixWorld),t.position.copy(eg),tg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tg),t.updateMatrixWorld(),Xd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xd,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Xd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},th=class extends bo{constructor(){super(new It(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=qs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},xo=class extends Zs{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new th}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ng=new ze,Wa=new N,Yd=new N,nh=class extends bo{constructor(){super(new It(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Wa.setFromMatrixPosition(e.matrixWorld),i.position.copy(Wa),Yd.copy(i.position),Yd.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Yd),i.updateMatrixWorld(),s.makeTranslation(-Wa.x,-Wa.y,-Wa.z),ng.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ng,i.coordinateSystem,i.reversedDepth)}},Qs=class extends Zs{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new nh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},er=class extends eo{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ih=class extends bo{constructor(){super(new er(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},gs=class extends Zs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new ih}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var qi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Kd=new WeakMap,_o=class extends _i{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=fi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Kd.has(a)===!0)s&&s(Kd.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return fi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Kd.set(l,c),fi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});fi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var cc=class extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var uc=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)i[r+o]=i[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(i,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,s=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(i,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(i,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){o.setValue(i,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,s=i*this._origIndex;e.getValue(t,s);for(let r=i,a=s;r!==a;++r)t[r]=t[s+r%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[i+a]}_slerp(e,t,i,s){zt.slerpFlat(e,t,e,t,e,i,s)}_slerpAdditive(e,t,i,s,r){let a=this._workIndex*r;zt.multiplyQuaternionsFlat(e,a,e,t,e,i),zt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,i,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[i+o]*s}}_lerpAdditive(e,t,i,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[i+a]*s}}},Mh="\\[\\]\\.:\\/",w0=new RegExp("["+Mh+"]","g"),Th="[^"+Mh+"]",E0="[^"+Mh.replace("\\.","")+"]",M0=/((?:WC+[\/:])*)/.source.replace("WC",Th),T0=/(WCOD+)?/.source.replace("WCOD",E0),A0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Th),C0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Th),R0=new RegExp("^"+M0+T0+A0+C0+"$"),I0=["material","materials","bones","map"],sh=class{constructor(e,t,i){let s=i||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ct=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(w0,"")}static parseTrackName(e){let t=R0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);I0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ct.Composite=sh;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var dc=class{constructor(e,t,i=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:$s,endingEnd:$s};for(let c=0;c!==a;++c){let u=r[c].createInterpolant(null);o[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=kg,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+i,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Fg:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case ru:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(a),c[u].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,s=this.time+e,r=this._loopCount,a=i===Ug;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(i===Og){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,i){let s=this._interpolantSettings;i?(s.endingStart=Vs,s.endingEnd=Vs):(e?s.endingStart=this.zeroSlopeAtStart?Vs:$s:s.endingStart=Xa,t?s.endingEnd=this.zeroSlopeAtEnd?Vs:$s:s.endingEnd=Xa)}_scheduleFading(e,t,i){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=i,this}},P0=new Float32Array(1),So=class extends ai{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let i=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==r;++d){let h=s[d],m=h.name,v=u[m];if(v!==void 0)++v.referenceCount,a[d]=v;else{if(v=a[d],v!==void 0){v._cacheIndex===null&&(++v.referenceCount,this._addInactiveBinding(v,l,m));continue}let y=t&&t._propertyBindings[d].binding.parsedPath;v=new uc(ct.create(i,m,y),h.ValueTypeName,h.getValueSize()),++v.referenceCount,this._addInactiveBinding(v,l,m),a[d]=v}o[d].resultBuffer=v.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,i)}let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],s=e._cacheIndex;i._cacheIndex=s,t[s]=i,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let d=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_addInactiveBinding(e,t,i){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[i]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,s=i.rootNode.uuid,r=i.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new mo(new Float32Array(2),new Float32Array(2),1,P0),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=i,t[i]=r}clipAction(e,t,i){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Js.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(i===void 0&&(a!==null?i=a.blendMode:i=ru),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===i)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let u=new dc(this,a,t,i);return this._bindAction(u,c),this._addInactiveAction(u,o,r),u}existingAction(e,t){let i=t||this._root,s=i.uuid,r=typeof e=="string"?Js.findByName(i,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,s=this._actionsByClip,r=s[i];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let a in i){let o=i[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};var ig=new ze,wo=class{constructor(e,t,i=0,s=1/0){this.ray=new gi(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new qr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ig.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ig),this}intersectObject(e,t=!0,i=[]){return rh(e,this,i,t),i.sort(sg),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)rh(e[s],this,i,t);return i.sort(sg),i}};function sg(n,e){return n.distance-e.distance}function rh(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)rh(r[a],e,t,!0)}}var ta=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Eo=class extends ai{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ah(n,e,t,i){let s=L0(i);switch(t){case gh:return n*e;case Ac:return n*e/s.components*s.byteLength;case Cc:return n*e/s.components*s.byteLength;case yh:return n*e*2/s.components*s.byteLength;case Rc:return n*e*2/s.components*s.byteLength;case vh:return n*e*3/s.components*s.byteLength;case Dn:return n*e*4/s.components*s.byteLength;case Ic:return n*e*4/s.components*s.byteLength;case To:case Ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Co:case Ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lc:case Dc:return Math.max(n,16)*Math.max(e,8)/4;case Pc:case Nc:return Math.max(n,8)*Math.max(e,8)/2;case Oc:case kc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case $c:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Vc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case zc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Wc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case qc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case jc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Xc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Yc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Kc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Jc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Zc:case Qc:case eu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case tu:case nu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case iu:case su:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function L0(n){switch(n){case ci:case hh:return{byteLength:1,components:1};case ia:case ph:case sa:return{byteLength:2,components:1};case Mc:case Tc:return{byteLength:2,components:4};case bs:case Ec:case jn:return{byteLength:4,components:1};case fh:case mh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Ev(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function D0(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((m,v)=>m.start-v.start);let h=0;for(let m=1;m<d.length;m++){let v=d[h],y=d[m];y.start<=v.start+v.count+1?v.count=Math.max(v.count,y.start+y.count-v.start):(++h,d[h]=y)}d.length=h+1;for(let m=0,v=d.length;m<v;m++){let y=d[m];n.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var O0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,k0=`#ifdef USE_ALPHAHASH
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
#endif`,U0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,F0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,V0=`#ifdef USE_AOMAP
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
#endif`,H0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,z0=`#ifdef USE_BATCHING
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
#endif`,G0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,W0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,q0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,j0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,X0=`#ifdef USE_IRIDESCENCE
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
#endif`,Y0=`#ifdef USE_BUMPMAP
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,e_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,t_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,n_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,i_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,s_=`#define PI 3.141592653589793
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
} // validated`,r_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,a_=`vec3 transformedNormal = objectNormal;
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
#endif`,o_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,l_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,c_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,u_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d_="gl_FragColor = linearToOutputTexel( gl_FragColor );",h_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,p_=`#ifdef USE_ENVMAP
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
#endif`,f_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,m_=`#ifdef USE_ENVMAP
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
#endif`,g_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,v_=`#ifdef USE_ENVMAP
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
#endif`,y_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,b_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,x_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,__=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S_=`#ifdef USE_GRADIENTMAP
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
}`,w_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,M_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T_=`uniform bool receiveShadow;
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
#endif`,A_=`#ifdef USE_ENVMAP
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
#endif`,C_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,R_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,P_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L_=`PhysicalMaterial material;
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
#endif`,N_=`struct PhysicalMaterial {
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
}`,D_=`
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
#endif`,O_=`#if defined( RE_IndirectDiffuse )
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
#endif`,k_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,F_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,V_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,H_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,z_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,G_=`#if defined( USE_POINTS_UV )
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
#endif`,W_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,j_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Y_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K_=`#ifdef USE_MORPHTARGETS
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
#endif`,J_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Q_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,iS=`#ifdef USE_NORMALMAP
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
#endif`,sS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,aS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,uS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bS=`float getShadowMask() {
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
}`,xS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_S=`#ifdef USE_SKINNING
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
#endif`,SS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wS=`#ifdef USE_SKINNING
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
#endif`,ES=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,MS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,TS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,CS=`#ifdef USE_TRANSMISSION
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
#endif`,RS=`#ifdef USE_TRANSMISSION
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
#endif`,IS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,PS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,LS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,NS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,DS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,OS=`uniform sampler2D t2D;
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
}`,kS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,US=`#ifdef ENVMAP_TYPE_CUBE
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
}`,FS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$S=`#include <common>
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
}`,VS=`#if DEPTH_PACKING == 3200
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
}`,HS=`#define DISTANCE
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
}`,zS=`#define DISTANCE
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
}`,GS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qS=`uniform float scale;
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
}`,jS=`uniform vec3 diffuse;
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
}`,XS=`#include <common>
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
}`,YS=`uniform vec3 diffuse;
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
}`,KS=`#define LAMBERT
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
}`,JS=`#define LAMBERT
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
}`,ZS=`#define MATCAP
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
}`,QS=`#define MATCAP
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
}`,ew=`#define NORMAL
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
}`,tw=`#define NORMAL
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
}`,nw=`#define PHONG
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
}`,iw=`#define PHONG
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
}`,sw=`#define STANDARD
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
}`,rw=`#define STANDARD
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
}`,aw=`#define TOON
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
}`,ow=`#define TOON
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
}`,lw=`uniform float size;
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
}`,cw=`uniform vec3 diffuse;
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
}`,uw=`#include <common>
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
}`,dw=`uniform vec3 color;
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
}`,hw=`uniform float rotation;
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
}`,pw=`uniform vec3 diffuse;
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
}`,Ye={alphahash_fragment:O0,alphahash_pars_fragment:k0,alphamap_fragment:U0,alphamap_pars_fragment:F0,alphatest_fragment:B0,alphatest_pars_fragment:$0,aomap_fragment:V0,aomap_pars_fragment:H0,batching_pars_vertex:z0,batching_vertex:G0,begin_vertex:W0,beginnormal_vertex:q0,bsdfs:j0,iridescence_fragment:X0,bumpmap_pars_fragment:Y0,clipping_planes_fragment:K0,clipping_planes_pars_fragment:J0,clipping_planes_pars_vertex:Z0,clipping_planes_vertex:Q0,color_fragment:e_,color_pars_fragment:t_,color_pars_vertex:n_,color_vertex:i_,common:s_,cube_uv_reflection_fragment:r_,defaultnormal_vertex:a_,displacementmap_pars_vertex:o_,displacementmap_vertex:l_,emissivemap_fragment:c_,emissivemap_pars_fragment:u_,colorspace_fragment:d_,colorspace_pars_fragment:h_,envmap_fragment:p_,envmap_common_pars_fragment:f_,envmap_pars_fragment:m_,envmap_pars_vertex:g_,envmap_physical_pars_fragment:A_,envmap_vertex:v_,fog_vertex:y_,fog_pars_vertex:b_,fog_fragment:x_,fog_pars_fragment:__,gradientmap_pars_fragment:S_,lightmap_pars_fragment:w_,lights_lambert_fragment:E_,lights_lambert_pars_fragment:M_,lights_pars_begin:T_,lights_toon_fragment:C_,lights_toon_pars_fragment:R_,lights_phong_fragment:I_,lights_phong_pars_fragment:P_,lights_physical_fragment:L_,lights_physical_pars_fragment:N_,lights_fragment_begin:D_,lights_fragment_maps:O_,lights_fragment_end:k_,logdepthbuf_fragment:U_,logdepthbuf_pars_fragment:F_,logdepthbuf_pars_vertex:B_,logdepthbuf_vertex:$_,map_fragment:V_,map_pars_fragment:H_,map_particle_fragment:z_,map_particle_pars_fragment:G_,metalnessmap_fragment:W_,metalnessmap_pars_fragment:q_,morphinstance_vertex:j_,morphcolor_vertex:X_,morphnormal_vertex:Y_,morphtarget_pars_vertex:K_,morphtarget_vertex:J_,normal_fragment_begin:Z_,normal_fragment_maps:Q_,normal_pars_fragment:eS,normal_pars_vertex:tS,normal_vertex:nS,normalmap_pars_fragment:iS,clearcoat_normal_fragment_begin:sS,clearcoat_normal_fragment_maps:rS,clearcoat_pars_fragment:aS,iridescence_pars_fragment:oS,opaque_fragment:lS,packing:cS,premultiplied_alpha_fragment:uS,project_vertex:dS,dithering_fragment:hS,dithering_pars_fragment:pS,roughnessmap_fragment:fS,roughnessmap_pars_fragment:mS,shadowmap_pars_fragment:gS,shadowmap_pars_vertex:vS,shadowmap_vertex:yS,shadowmask_pars_fragment:bS,skinbase_vertex:xS,skinning_pars_vertex:_S,skinning_vertex:SS,skinnormal_vertex:wS,specularmap_fragment:ES,specularmap_pars_fragment:MS,tonemapping_fragment:TS,tonemapping_pars_fragment:AS,transmission_fragment:CS,transmission_pars_fragment:RS,uv_pars_fragment:IS,uv_pars_vertex:PS,uv_vertex:LS,worldpos_vertex:NS,background_vert:DS,background_frag:OS,backgroundCube_vert:kS,backgroundCube_frag:US,cube_vert:FS,cube_frag:BS,depth_vert:$S,depth_frag:VS,distanceRGBA_vert:HS,distanceRGBA_frag:zS,equirect_vert:GS,equirect_frag:WS,linedashed_vert:qS,linedashed_frag:jS,meshbasic_vert:XS,meshbasic_frag:YS,meshlambert_vert:KS,meshlambert_frag:JS,meshmatcap_vert:ZS,meshmatcap_frag:QS,meshnormal_vert:ew,meshnormal_frag:tw,meshphong_vert:nw,meshphong_frag:iw,meshphysical_vert:sw,meshphysical_frag:rw,meshtoon_vert:aw,meshtoon_frag:ow,points_vert:lw,points_frag:cw,shadow_vert:uw,shadow_frag:dw,sprite_vert:hw,sprite_frag:pw},ue={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},wi={basic:{uniforms:en([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:en([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:en([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:en([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:en([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:en([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:en([ue.points,ue.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:en([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:en([ue.common,ue.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:en([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:en([ue.sprite,ue.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:en([ue.common,ue.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:en([ue.lights,ue.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};wi.physical={uniforms:en([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};var ou={r:0,b:0,g:0},rr=new qn,fw=new ze;function mw(n,e,t,i,s,r,a){let o=new Oe(0),l=r===!0?0:1,c,u,d=null,h=0,m=null;function v(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function y(E){let S=!1,A=v(E);A===null?f(o,l):A&&A.isColor&&(f(A,1),S=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(E,S){let A=v(S);A&&(A.isCubeTexture||A.mapping===Mo)?(u===void 0&&(u=new ot(new fs(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:sr(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,L,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),rr.copy(S.backgroundRotation),rr.x*=-1,rr.y*=-1,rr.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(fw.makeRotationFromEuler(rr)),u.material.toneMapped=et.getTransfer(A.colorSpace)!==at,(d!==A||h!==A.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,d=A,h=A.version,m=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new ot(new Ks(2,2),new oi({name:"BackgroundMaterial",uniforms:sr(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=et.getTransfer(A.colorSpace)!==at,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||h!==A.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=A,h=A.version,m=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function f(E,S){E.getRGB(ou,Eh(n)),i.buffers.color.setClear(ou.r,ou.g,ou.b,S,a)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),l=S,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,f(o,l)},render:y,addToRenderList:g,dispose:M}}function gw(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(_,P,B,G,q){let j=!1,Y=d(G,B,P);r!==Y&&(r=Y,c(r.object)),j=m(_,G,B,q),j&&v(_,G,B,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,S(_,P,B,G),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function u(_){return n.deleteVertexArray(_)}function d(_,P,B){let G=B.wireframe===!0,q=i[_.id];q===void 0&&(q={},i[_.id]=q);let j=q[P.id];j===void 0&&(j={},q[P.id]=j);let Y=j[G];return Y===void 0&&(Y=h(l()),j[G]=Y),Y}function h(_){let P=[],B=[],G=[];for(let q=0;q<t;q++)P[q]=0,B[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:G,object:_,attributes:{},index:null}}function m(_,P,B,G){let q=r.attributes,j=P.attributes,Y=0,D=B.getAttributes();for(let C in D)if(D[C].location>=0){let te=q[C],Q=j[C];if(Q===void 0&&(C==="instanceMatrix"&&_.instanceMatrix&&(Q=_.instanceMatrix),C==="instanceColor"&&_.instanceColor&&(Q=_.instanceColor)),te===void 0||te.attribute!==Q||Q&&te.data!==Q.data)return!0;Y++}return r.attributesNum!==Y||r.index!==G}function v(_,P,B,G){let q={},j=P.attributes,Y=0,D=B.getAttributes();for(let C in D)if(D[C].location>=0){let te=j[C];te===void 0&&(C==="instanceMatrix"&&_.instanceMatrix&&(te=_.instanceMatrix),C==="instanceColor"&&_.instanceColor&&(te=_.instanceColor));let Q={};Q.attribute=te,te&&te.data&&(Q.data=te.data),q[C]=Q,Y++}r.attributes=q,r.attributesNum=Y,r.index=G}function y(){let _=r.newAttributes;for(let P=0,B=_.length;P<B;P++)_[P]=0}function g(_){f(_,0)}function f(_,P){let B=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;B[_]=1,G[_]===0&&(n.enableVertexAttribArray(_),G[_]=1),q[_]!==P&&(n.vertexAttribDivisor(_,P),q[_]=P)}function M(){let _=r.newAttributes,P=r.enabledAttributes;for(let B=0,G=P.length;B<G;B++)P[B]!==_[B]&&(n.disableVertexAttribArray(B),P[B]=0)}function E(_,P,B,G,q,j,Y){Y===!0?n.vertexAttribIPointer(_,P,B,q,j):n.vertexAttribPointer(_,P,B,G,q,j)}function S(_,P,B,G){y();let q=G.attributes,j=B.getAttributes(),Y=P.defaultAttributeValues;for(let D in j){let C=j[D];if(C.location>=0){let X=q[D];if(X===void 0&&(D==="instanceMatrix"&&_.instanceMatrix&&(X=_.instanceMatrix),D==="instanceColor"&&_.instanceColor&&(X=_.instanceColor)),X!==void 0){let te=X.normalized,Q=X.itemSize,de=e.get(X);if(de===void 0)continue;let pe=de.buffer,We=de.type,tt=de.bytesPerElement,Z=We===n.INT||We===n.UNSIGNED_INT||X.gpuType===Ec;if(X.isInterleavedBufferAttribute){let $=X.data,ne=$.stride,me=X.offset;if($.isInstancedInterleavedBuffer){for(let ye=0;ye<C.locationSize;ye++)f(C.location+ye,$.meshPerAttribute);_.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ye=0;ye<C.locationSize;ye++)g(C.location+ye);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let ye=0;ye<C.locationSize;ye++)E(C.location+ye,Q/C.locationSize,We,te,ne*tt,(me+Q/C.locationSize*ye)*tt,Z)}else{if(X.isInstancedBufferAttribute){for(let $=0;$<C.locationSize;$++)f(C.location+$,X.meshPerAttribute);_.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let $=0;$<C.locationSize;$++)g(C.location+$);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let $=0;$<C.locationSize;$++)E(C.location+$,Q/C.locationSize,We,te,Q*tt,Q/C.locationSize*$*tt,Z)}}else if(Y!==void 0){let te=Y[D];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(C.location,te);break;case 3:n.vertexAttrib3fv(C.location,te);break;case 4:n.vertexAttrib4fv(C.location,te);break;default:n.vertexAttrib1fv(C.location,te)}}}}M()}function A(){k();for(let _ in i){let P=i[_];for(let B in P){let G=P[B];for(let q in G)u(G[q].object),delete G[q];delete P[B]}delete i[_]}}function R(_){if(i[_.id]===void 0)return;let P=i[_.id];for(let B in P){let G=P[B];for(let q in G)u(G[q].object),delete G[q];delete P[B]}delete i[_.id]}function L(_){for(let P in i){let B=i[P];if(B[_.id]===void 0)continue;let G=B[_.id];for(let q in G)u(G[q].object),delete G[q];delete B[_.id]}}function k(){w(),a=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:k,resetDefaultState:w,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:L,initAttributes:y,enableAttribute:g,disableUnusedAttributes:M}}function vw(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let m=0;for(let v=0;v<d;v++)m+=u[v];t.update(m,i,1)}function l(c,u,d,h){if(d===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<c.length;v++)a(c[v],u[v],h[v]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let v=0;for(let y=0;y<d;y++)v+=u[y]*h[y];t.update(v,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function yw(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Dn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){let k=L===sa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==ci&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==jn&&!k)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=v>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:v,maxTextureSize:y,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:A,maxSamples:R}}function bw(n){let e=this,t=null,i=0,s=!1,r=!1,a=new Wn,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let m=d.length!==0||h||i!==0||s;return s=h,i=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,m){let v=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,f=n.get(d);if(!s||v===null||v.length===0||r&&!g)r?u(null):c();else{let M=r?0:i,E=M*4,S=f.clippingState||null;l.value=S,S=u(v,h,E,m);for(let A=0;A!==E;++A)S[A]=t[A];f.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,m,v){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=l.value,v!==!0||g===null){let f=m+y*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<f)&&(g=new Float32Array(f));for(let E=0,S=m;E!==y;++E,S+=4)a.copy(d[E]).applyMatrix4(M,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function xw(n){let e=new WeakMap;function t(a,o){return o===_c?a.mapping=tr:o===Sc&&(a.mapping=nr),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===_c||o===Sc)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Ql(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var ca=4,tv=[.125,.215,.35,.446,.526,.582],lr=20,Ch=new er,nv=new Oe,Rh=null,Ih=0,Ph=0,Lh=!1,or=(1+Math.sqrt(5))/2,la=1/or,iv=[new N(-or,la,0),new N(or,la,0),new N(-la,0,or),new N(la,0,or),new N(0,or,-la),new N(0,or,la),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],_w=new N,da=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=_w}=r;Rh=this._renderer.getRenderTarget(),Ih=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=av(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Rh,Ih,Ph),this._renderer.xr.enabled=Lh,e.scissorTest=!1,lu(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===tr||e.mapping===nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rh=this._renderer.getRenderTarget(),Ih=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:an,minFilter:an,generateMipmaps:!1,type:sa,format:Dn,colorSpace:jt,depthBuffer:!1},s=sv(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sv(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sw(r)),this._blurMaterial=ww(r,e,t)}return s}_compileMaterial(e){let t=new ot(this._lodPlanes[0],e);this._renderer.compile(t,Ch)}_sceneToCubeUV(e,t,i,s,r){let l=new It(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(nv),d.toneMapping=Xi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let y=new ln({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new ot(new fs,y),f=!1,M=e.background;M?M.isColor&&(y.color.copy(M),e.background=null,f=!0):(y.color.copy(nv),f=!0);for(let E=0;E<6;E++){let S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));let A=this._cubeSize;lu(s,S*A,E>2?A:0,A,A),d.setRenderTarget(s),f&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=m,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===tr||e.mapping===nr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=av()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rv());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ot(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;lu(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ch)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=iv[(s-r-1)%iv.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new ot(this._lodPlanes[s],c),h=c.uniforms,m=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*lr-1),y=r/v,g=isFinite(r)?1+Math.floor(u*y):lr;g>lr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${lr}`);let f=[],M=0;for(let L=0;L<lr;++L){let k=L/y,w=Math.exp(-k*k/2);f.push(w),L===0?M+=w:L<g&&(M+=2*w)}for(let L=0;L<f.length;L++)f[L]=f[L]/M;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:E}=this;h.dTheta.value=v,h.mipInt.value=E-i;let S=this._sizeLods[s],A=3*S*(s>E-ca?s-E+ca:0),R=4*(this._cubeSize-S);lu(t,A,R,3*S,2*S),l.setRenderTarget(t),l.render(d,Ch)}};function Sw(n){let e=[],t=[],i=[],s=n,r=n-ca+1+tv.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>n-ca?l=tv[a-n+ca-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,v=6,y=3,g=2,f=1,M=new Float32Array(y*v*m),E=new Float32Array(g*v*m),S=new Float32Array(f*v*m);for(let R=0;R<m;R++){let L=R%3*2/3-1,k=R>2?0:-1,w=[L,k,0,L+2/3,k,0,L+2/3,k+1,0,L,k,0,L+2/3,k+1,0,L,k+1,0];M.set(w,y*v*R),E.set(h,g*v*R);let _=[R,R,R,R,R,R];S.set(_,f*v*R)}let A=new cn;A.setAttribute("position",new Pt(M,y)),A.setAttribute("uv",new Pt(E,g)),A.setAttribute("faceIndex",new Pt(S,f)),e.push(A),s>ca&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function sv(n,e,t){let i=new mi(n,e,t);return i.texture.mapping=Mo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function lu(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function ww(n,e,t){let i=new Float32Array(lr),s=new N(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Hh(),fragmentShader:`

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
		`,blending:ji,depthTest:!1,depthWrite:!1})}function rv(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hh(),fragmentShader:`

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
		`,blending:ji,depthTest:!1,depthWrite:!1})}function av(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Hh(){return`

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
	`}function Ew(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===_c||l===Sc,u=l===tr||l===nr;if(c||u){let d=e.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new da(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{let m=o.image;return c&&m&&m.height>0||u&&m&&s(m)?(t===null&&(t=new da(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Mw(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Gr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Tw(n,e,t,i){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let v in h.attributes)e.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];let m=r.get(h);m&&(e.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let m in h)e.update(h[m],n.ARRAY_BUFFER)}function c(d){let h=[],m=d.index,v=d.attributes.position,y=0;if(m!==null){let M=m.array;y=m.version;for(let E=0,S=M.length;E<S;E+=3){let A=M[E+0],R=M[E+1],L=M[E+2];h.push(A,R,R,L,L,A)}}else if(v!==void 0){let M=v.array;y=v.version;for(let E=0,S=M.length/3-1;E<S;E+=3){let A=E+0,R=E+1,L=E+2;h.push(A,R,R,L,L,A)}}else return;let g=new(wh(h)?Qa:Za)(h,1);g.version=y;let f=r.get(d);f&&e.remove(f),r.set(d,g)}function u(d){let h=r.get(d);if(h){let m=d.index;m!==null&&h.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Aw(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,m){n.drawElements(i,m,r,h*a),t.update(m,i,1)}function c(h,m,v){v!==0&&(n.drawElementsInstanced(i,m,r,h*a,v),t.update(m,i,v))}function u(h,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,h,0,v);let g=0;for(let f=0;f<v;f++)g+=m[f];t.update(g,i,1)}function d(h,m,v,y){if(v===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<h.length;f++)c(h[f]/a,m[f],y[f]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,r,h,0,y,0,v);let f=0;for(let M=0;M<v;M++)f+=m[M]*y[M];t.update(f,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Cw(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Rw(n,e,t){let i=new WeakMap,s=new it;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let w=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],E=0;m===!0&&(E=1),v===!0&&(E=2),y===!0&&(E=3);let S=o.attributes.position.count*E,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let R=new Float32Array(S*A*4*d),L=new Ja(R,S,A,d);L.type=jn,L.needsUpdate=!0;let k=E*4;for(let _=0;_<d;_++){let P=g[_],B=f[_],G=M[_],q=S*A*4*_;for(let j=0;j<P.count;j++){let Y=j*k;m===!0&&(s.fromBufferAttribute(P,j),R[q+Y+0]=s.x,R[q+Y+1]=s.y,R[q+Y+2]=s.z,R[q+Y+3]=0),v===!0&&(s.fromBufferAttribute(B,j),R[q+Y+4]=s.x,R[q+Y+5]=s.y,R[q+Y+6]=s.z,R[q+Y+7]=0),y===!0&&(s.fromBufferAttribute(G,j),R[q+Y+8]=s.x,R[q+Y+9]=s.y,R[q+Y+10]=s.z,R[q+Y+11]=G.itemSize===4?s.w:1)}}h={count:d,texture:L,size:new Pe(S,A)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let y=0;y<c.length;y++)m+=c[y];let v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Iw(n,e,t,i){let s=new WeakMap;function r(l){let c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Mv=new Ot,ov=new co(1,1),Tv=new Ja,Av=new Jl,Cv=new to,lv=[],cv=[],uv=new Float32Array(16),dv=new Float32Array(9),hv=new Float32Array(4);function ha(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=lv[s];if(r===void 0&&(r=new Float32Array(s),lv[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function kt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function du(n,e){let t=cv[e];t===void 0&&(t=new Int32Array(e),cv[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Pw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Lw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function Nw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function Dw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function Ow(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,i))return;hv.set(i),n.uniformMatrix2fv(this.addr,!1,hv),Ut(t,i)}}function kw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,i))return;dv.set(i),n.uniformMatrix3fv(this.addr,!1,dv),Ut(t,i)}}function Uw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(kt(t,i))return;uv.set(i),n.uniformMatrix4fv(this.addr,!1,uv),Ut(t,i)}}function Fw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Bw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function $w(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function Vw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function Hw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function zw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function Gw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function Ww(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function qw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ov.compareFunction=xh,r=ov):r=Mv,t.setTexture2D(e||r,s)}function jw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Av,s)}function Xw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Cv,s)}function Yw(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Tv,s)}function Kw(n){switch(n){case 5126:return Pw;case 35664:return Lw;case 35665:return Nw;case 35666:return Dw;case 35674:return Ow;case 35675:return kw;case 35676:return Uw;case 5124:case 35670:return Fw;case 35667:case 35671:return Bw;case 35668:case 35672:return $w;case 35669:case 35673:return Vw;case 5125:return Hw;case 36294:return zw;case 36295:return Gw;case 36296:return Ww;case 35678:case 36198:case 36298:case 36306:case 35682:return qw;case 35679:case 36299:case 36307:return jw;case 35680:case 36300:case 36308:case 36293:return Xw;case 36289:case 36303:case 36311:case 36292:return Yw}}function Jw(n,e){n.uniform1fv(this.addr,e)}function Zw(n,e){let t=ha(e,this.size,2);n.uniform2fv(this.addr,t)}function Qw(n,e){let t=ha(e,this.size,3);n.uniform3fv(this.addr,t)}function eE(n,e){let t=ha(e,this.size,4);n.uniform4fv(this.addr,t)}function tE(n,e){let t=ha(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nE(n,e){let t=ha(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function iE(n,e){let t=ha(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function sE(n,e){n.uniform1iv(this.addr,e)}function rE(n,e){n.uniform2iv(this.addr,e)}function aE(n,e){n.uniform3iv(this.addr,e)}function oE(n,e){n.uniform4iv(this.addr,e)}function lE(n,e){n.uniform1uiv(this.addr,e)}function cE(n,e){n.uniform2uiv(this.addr,e)}function uE(n,e){n.uniform3uiv(this.addr,e)}function dE(n,e){n.uniform4uiv(this.addr,e)}function hE(n,e,t){let i=this.cache,s=e.length,r=du(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Mv,r[a])}function pE(n,e,t){let i=this.cache,s=e.length,r=du(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Av,r[a])}function fE(n,e,t){let i=this.cache,s=e.length,r=du(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Cv,r[a])}function mE(n,e,t){let i=this.cache,s=e.length,r=du(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Tv,r[a])}function gE(n){switch(n){case 5126:return Jw;case 35664:return Zw;case 35665:return Qw;case 35666:return eE;case 35674:return tE;case 35675:return nE;case 35676:return iE;case 5124:case 35670:return sE;case 35667:case 35671:return rE;case 35668:case 35672:return aE;case 35669:case 35673:return oE;case 5125:return lE;case 36294:return cE;case 36295:return uE;case 36296:return dE;case 35678:case 36198:case 36298:case 36306:case 35682:return hE;case 35679:case 36299:case 36307:return pE;case 35680:case 36300:case 36308:case 36293:return fE;case 36289:case 36303:case 36311:case 36292:return mE}}var Dh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Kw(t.type)}},Oh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gE(t.type)}},kh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},Nh=/(\w+)(\])?(\[|\.)?/g;function pv(n,e){n.seq.push(e),n.map[e.id]=e}function vE(n,e,t){let i=n.name,s=i.length;for(Nh.lastIndex=0;;){let r=Nh.exec(i),a=Nh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){pv(t,c===void 0?new Dh(o,n,e):new Oh(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new kh(o),pv(t,d)),t=d}}}var ua=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);vE(r,a,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function fv(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var yE=37297,bE=0;function xE(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var mv=new Ge;function _E(n){et._getMatrix(mv,et.workingColorSpace,n);let e=`mat3( ${mv.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case Ya:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function gv(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+xE(n.getShaderSource(e),o)}else return r}function SE(n,e){let t=_E(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function wE(n,e){let t;switch(e){case Cg:t="Linear";break;case Rg:t="Reinhard";break;case Ig:t="Cineon";break;case xc:t="ACESFilmic";break;case Lg:t="AgX";break;case Ng:t="Neutral";break;case Pg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var cu=new N;function EE(){et.getLuminanceCoefficients(cu);let n=cu.x.toFixed(4),e=cu.y.toFixed(4),t=cu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ME(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lo).join(`
`)}function TE(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function AE(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Lo(n){return n!==""}function vv(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yv(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var CE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uh(n){return n.replace(CE,IE)}var RE=new Map;function IE(n,e){let t=Ye[e];if(t===void 0){let i=RE.get(e);if(i!==void 0)t=Ye[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Uh(t)}var PE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bv(n){return n.replace(PE,LE)}function LE(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xv(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function NE(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===oh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===og?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Si&&(e="SHADOWMAP_TYPE_VSM"),e}function DE(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case tr:case nr:e="ENVMAP_TYPE_CUBE";break;case Mo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OE(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case nr:e="ENVMAP_MODE_REFRACTION";break}return e}function kE(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case bc:e="ENVMAP_BLENDING_MULTIPLY";break;case Tg:e="ENVMAP_BLENDING_MIX";break;case Ag:e="ENVMAP_BLENDING_ADD";break}return e}function UE(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function FE(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=NE(t),c=DE(t),u=OE(t),d=kE(t),h=UE(t),m=ME(t),v=TE(r),y=s.createProgram(),g,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Lo).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Lo).join(`
`),f.length>0&&(f+=`
`)):(g=[xv(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),f=[xv(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xi?"#define TONE_MAPPING":"",t.toneMapping!==Xi?Ye.tonemapping_pars_fragment:"",t.toneMapping!==Xi?wE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,SE("linearToOutputTexel",t.outputColorSpace),EE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lo).join(`
`)),a=Uh(a),a=vv(a,t),a=yv(a,t),o=Uh(o),o=vv(o,t),o=yv(o,t),a=bv(a),o=bv(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===_h?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let E=M+g+a,S=M+f+o,A=fv(s,s.VERTEX_SHADER,E),R=fv(s,s.FRAGMENT_SHADER,S);s.attachShader(y,A),s.attachShader(y,R),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function L(P){if(n.debug.checkShaderErrors){let B=s.getProgramInfoLog(y)||"",G=s.getShaderInfoLog(A)||"",q=s.getShaderInfoLog(R)||"",j=B.trim(),Y=G.trim(),D=q.trim(),C=!0,X=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(C=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,A,R);else{let te=gv(s,A,"vertex"),Q=gv(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+j+`
`+te+`
`+Q)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(Y===""||D==="")&&(X=!1);X&&(P.diagnostics={runnable:C,programLog:j,vertexShader:{log:Y,prefix:g},fragmentShader:{log:D,prefix:f}})}s.deleteShader(A),s.deleteShader(R),k=new ua(s,y),w=AE(s,y)}let k;this.getUniforms=function(){return k===void 0&&L(this),k};let w;this.getAttributes=function(){return w===void 0&&L(this),w};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(y,yE)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bE++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=A,this.fragmentShader=R,this}var BE=0,Fh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Bh(e),t.set(e,i)),i}},Bh=class{constructor(e){this.id=BE++,this.code=e,this.usedTimes=0}};function $E(n,e,t,i,s,r,a){let o=new qr,l=new Fh,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,m=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,_,P,B,G){let q=B.fog,j=G.geometry,Y=w.isMeshStandardMaterial?B.environment:null,D=(w.isMeshStandardMaterial?t:e).get(w.envMap||Y),C=D&&D.mapping===Mo?D.image.height:null,X=v[w.type];w.precision!==null&&(m=s.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));let te=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Q=te!==void 0?te.length:0,de=0;j.morphAttributes.position!==void 0&&(de=1),j.morphAttributes.normal!==void 0&&(de=2),j.morphAttributes.color!==void 0&&(de=3);let pe,We,tt,Z;if(X){let st=wi[X];pe=st.vertexShader,We=st.fragmentShader}else pe=w.vertexShader,We=w.fragmentShader,l.update(w),tt=l.getVertexShaderID(w),Z=l.getFragmentShaderID(w);let $=n.getRenderTarget(),ne=n.state.buffers.depth.getReversed(),me=G.isInstancedMesh===!0,ye=G.isBatchedMesh===!0,Ze=!!w.map,Jt=!!w.matcap,I=!!D,yt=!!w.aoMap,He=!!w.lightMap,Fe=!!w.bumpMap,we=!!w.normalMap,bt=!!w.displacementMap,Ee=!!w.emissiveMap,Xe=!!w.metalnessMap,$t=!!w.roughnessMap,Et=w.anisotropy>0,T=w.clearcoat>0,b=w.dispersion>0,H=w.iridescence>0,J=w.sheen>0,ie=w.transmission>0,K=Et&&!!w.anisotropyMap,Ie=T&&!!w.clearcoatMap,le=T&&!!w.clearcoatNormalMap,Me=T&&!!w.clearcoatRoughnessMap,Ce=H&&!!w.iridescenceMap,ae=H&&!!w.iridescenceThicknessMap,ge=J&&!!w.sheenColorMap,Ue=J&&!!w.sheenRoughnessMap,Re=!!w.specularMap,he=!!w.specularColorMap,qe=!!w.specularIntensityMap,O=ie&&!!w.transmissionMap,oe=ie&&!!w.thicknessMap,ce=!!w.gradientMap,xe=!!w.alphaMap,se=w.alphaTest>0,ee=!!w.alphaHash,Se=!!w.extensions,$e=Xi;w.toneMapped&&($===null||$.isXRRenderTarget===!0)&&($e=n.toneMapping);let pt={shaderID:X,shaderType:w.type,shaderName:w.name,vertexShader:pe,fragmentShader:We,defines:w.defines,customVertexShaderID:tt,customFragmentShaderID:Z,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:ye,batchingColor:ye&&G._colorsTexture!==null,instancing:me,instancingColor:me&&G.instanceColor!==null,instancingMorph:me&&G.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:jt,alphaToCoverage:!!w.alphaToCoverage,map:Ze,matcap:Jt,envMap:I,envMapMode:I&&D.mapping,envMapCubeUVHeight:C,aoMap:yt,lightMap:He,bumpMap:Fe,normalMap:we,displacementMap:h&&bt,emissiveMap:Ee,normalMapObjectSpace:we&&w.normalMapType===Vg,normalMapTangentSpace:we&&w.normalMapType===au,metalnessMap:Xe,roughnessMap:$t,anisotropy:Et,anisotropyMap:K,clearcoat:T,clearcoatMap:Ie,clearcoatNormalMap:le,clearcoatRoughnessMap:Me,dispersion:b,iridescence:H,iridescenceMap:Ce,iridescenceThicknessMap:ae,sheen:J,sheenColorMap:ge,sheenRoughnessMap:Ue,specularMap:Re,specularColorMap:he,specularIntensityMap:qe,transmission:ie,transmissionMap:O,thicknessMap:oe,gradientMap:ce,opaque:w.transparent===!1&&w.blending===Hs&&w.alphaToCoverage===!1,alphaMap:xe,alphaTest:se,alphaHash:ee,combine:w.combine,mapUv:Ze&&y(w.map.channel),aoMapUv:yt&&y(w.aoMap.channel),lightMapUv:He&&y(w.lightMap.channel),bumpMapUv:Fe&&y(w.bumpMap.channel),normalMapUv:we&&y(w.normalMap.channel),displacementMapUv:bt&&y(w.displacementMap.channel),emissiveMapUv:Ee&&y(w.emissiveMap.channel),metalnessMapUv:Xe&&y(w.metalnessMap.channel),roughnessMapUv:$t&&y(w.roughnessMap.channel),anisotropyMapUv:K&&y(w.anisotropyMap.channel),clearcoatMapUv:Ie&&y(w.clearcoatMap.channel),clearcoatNormalMapUv:le&&y(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&y(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&y(w.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&y(w.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&y(w.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&y(w.sheenRoughnessMap.channel),specularMapUv:Re&&y(w.specularMap.channel),specularColorMapUv:he&&y(w.specularColorMap.channel),specularIntensityMapUv:qe&&y(w.specularIntensityMap.channel),transmissionMapUv:O&&y(w.transmissionMap.channel),thicknessMapUv:oe&&y(w.thicknessMap.channel),alphaMapUv:xe&&y(w.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(we||Et),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!j.attributes.uv&&(Ze||xe),fog:!!q,useFog:w.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:G.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:de,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:$e,decodeVideoTexture:Ze&&w.map.isVideoTexture===!0&&et.getTransfer(w.map.colorSpace)===at,decodeVideoTextureEmissive:Ee&&w.emissiveMap.isVideoTexture===!0&&et.getTransfer(w.emissiveMap.colorSpace)===at,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===wn,flipSided:w.side===Xt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Se&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&w.extensions.multiDraw===!0||ye)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function f(w){let _=[];if(w.shaderID?_.push(w.shaderID):(_.push(w.customVertexShaderID),_.push(w.customFragmentShaderID)),w.defines!==void 0)for(let P in w.defines)_.push(P),_.push(w.defines[P]);return w.isRawShaderMaterial===!1&&(M(_,w),E(_,w),_.push(n.outputColorSpace)),_.push(w.customProgramCacheKey),_.join()}function M(w,_){w.push(_.precision),w.push(_.outputColorSpace),w.push(_.envMapMode),w.push(_.envMapCubeUVHeight),w.push(_.mapUv),w.push(_.alphaMapUv),w.push(_.lightMapUv),w.push(_.aoMapUv),w.push(_.bumpMapUv),w.push(_.normalMapUv),w.push(_.displacementMapUv),w.push(_.emissiveMapUv),w.push(_.metalnessMapUv),w.push(_.roughnessMapUv),w.push(_.anisotropyMapUv),w.push(_.clearcoatMapUv),w.push(_.clearcoatNormalMapUv),w.push(_.clearcoatRoughnessMapUv),w.push(_.iridescenceMapUv),w.push(_.iridescenceThicknessMapUv),w.push(_.sheenColorMapUv),w.push(_.sheenRoughnessMapUv),w.push(_.specularMapUv),w.push(_.specularColorMapUv),w.push(_.specularIntensityMapUv),w.push(_.transmissionMapUv),w.push(_.thicknessMapUv),w.push(_.combine),w.push(_.fogExp2),w.push(_.sizeAttenuation),w.push(_.morphTargetsCount),w.push(_.morphAttributeCount),w.push(_.numDirLights),w.push(_.numPointLights),w.push(_.numSpotLights),w.push(_.numSpotLightMaps),w.push(_.numHemiLights),w.push(_.numRectAreaLights),w.push(_.numDirLightShadows),w.push(_.numPointLightShadows),w.push(_.numSpotLightShadows),w.push(_.numSpotLightShadowsWithMaps),w.push(_.numLightProbes),w.push(_.shadowMapType),w.push(_.toneMapping),w.push(_.numClippingPlanes),w.push(_.numClipIntersection),w.push(_.depthPacking)}function E(w,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),w.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),w.push(o.mask)}function S(w){let _=v[w.type],P;if(_){let B=wi[_];P=Zg.clone(B.uniforms)}else P=w.uniforms;return P}function A(w,_){let P;for(let B=0,G=u.length;B<G;B++){let q=u[B];if(q.cacheKey===_){P=q,++P.usedTimes;break}}return P===void 0&&(P=new FE(n,_,w,r),u.push(P)),P}function R(w){if(--w.usedTimes===0){let _=u.indexOf(w);u[_]=u[u.length-1],u.pop(),w.destroy()}}function L(w){l.remove(w)}function k(){l.dispose()}return{getParameters:g,getProgramCacheKey:f,getUniforms:S,acquireProgram:A,releaseProgram:R,releaseShaderCache:L,programs:u,dispose:k}}function VE(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function HE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function _v(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Sv(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,h,m,v,y,g){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:m,groupOrder:v,renderOrder:d.renderOrder,z:y,group:g},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=m,f.groupOrder=v,f.renderOrder=d.renderOrder,f.z=y,f.group=g),e++,f}function o(d,h,m,v,y,g){let f=a(d,h,m,v,y,g);m.transmission>0?i.push(f):m.transparent===!0?s.push(f):t.push(f)}function l(d,h,m,v,y,g){let f=a(d,h,m,v,y,g);m.transmission>0?i.unshift(f):m.transparent===!0?s.unshift(f):t.unshift(f)}function c(d,h){t.length>1&&t.sort(d||HE),i.length>1&&i.sort(h||_v),s.length>1&&s.sort(h||_v)}function u(){for(let d=e,h=n.length;d<h;d++){let m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function zE(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new Sv,n.set(i,[a])):s>=r.length?(a=new Sv,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function GE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Oe};break;case"SpotLight":t={position:new N,direction:new N,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function WE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var qE=0;function jE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function XE(n){let e=new GE,t=WE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let s=new N,r=new ze,a=new ze;function o(c){let u=0,d=0,h=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let m=0,v=0,y=0,g=0,f=0,M=0,E=0,S=0,A=0,R=0,L=0;c.sort(jE);for(let w=0,_=c.length;w<_;w++){let P=c[w],B=P.color,G=P.intensity,q=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=B.r*G,d+=B.g*G,h+=B.b*G;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],G);L++}else if(P.isDirectionalLight){let Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let D=P.shadow,C=t.get(P);C.shadowIntensity=D.intensity,C.shadowBias=D.bias,C.shadowNormalBias=D.normalBias,C.shadowRadius=D.radius,C.shadowMapSize=D.mapSize,i.directionalShadow[m]=C,i.directionalShadowMap[m]=j,i.directionalShadowMatrix[m]=P.shadow.matrix,M++}i.directional[m]=Y,m++}else if(P.isSpotLight){let Y=e.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(B).multiplyScalar(G),Y.distance=q,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[y]=Y;let D=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,D.updateMatrices(P),P.castShadow&&R++),i.spotLightMatrix[y]=D.matrix,P.castShadow){let C=t.get(P);C.shadowIntensity=D.intensity,C.shadowBias=D.bias,C.shadowNormalBias=D.normalBias,C.shadowRadius=D.radius,C.shadowMapSize=D.mapSize,i.spotShadow[y]=C,i.spotShadowMap[y]=j,S++}y++}else if(P.isRectAreaLight){let Y=e.get(P);Y.color.copy(B).multiplyScalar(G),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=Y,g++}else if(P.isPointLight){let Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){let D=P.shadow,C=t.get(P);C.shadowIntensity=D.intensity,C.shadowBias=D.bias,C.shadowNormalBias=D.normalBias,C.shadowRadius=D.radius,C.shadowMapSize=D.mapSize,C.shadowCameraNear=D.camera.near,C.shadowCameraFar=D.camera.far,i.pointShadow[v]=C,i.pointShadowMap[v]=j,i.pointShadowMatrix[v]=P.shadow.matrix,E++}i.point[v]=Y,v++}else if(P.isHemisphereLight){let Y=e.get(P);Y.skyColor.copy(P.color).multiplyScalar(G),Y.groundColor.copy(P.groundColor).multiplyScalar(G),i.hemi[f]=Y,f++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let k=i.hash;(k.directionalLength!==m||k.pointLength!==v||k.spotLength!==y||k.rectAreaLength!==g||k.hemiLength!==f||k.numDirectionalShadows!==M||k.numPointShadows!==E||k.numSpotShadows!==S||k.numSpotMaps!==A||k.numLightProbes!==L)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=g,i.point.length=v,i.hemi.length=f,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=L,k.directionalLength=m,k.pointLength=v,k.spotLength=y,k.rectAreaLength=g,k.hemiLength=f,k.numDirectionalShadows=M,k.numPointShadows=E,k.numSpotShadows=S,k.numSpotMaps=A,k.numLightProbes=L,i.version=qE++)}function l(c,u){let d=0,h=0,m=0,v=0,y=0,g=u.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){let E=c[f];if(E.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),d++}else if(E.isSpotLight){let S=i.spot[m];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),m++}else if(E.isRectAreaLight){let S=i.rectArea[v];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),a.identity(),r.copy(E.matrixWorld),r.premultiply(g),a.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(E.isPointLight){let S=i.point[h];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(g),h++}else if(E.isHemisphereLight){let S=i.hemi[y];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:i}}function wv(n){let e=new XE(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function YE(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new wv(n),e.set(s,[o])):r>=a.length?(o=new wv(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var KE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,JE=`uniform sampler2D shadow_pass;
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
}`;function ZE(n,e,t){let i=new Jr,s=new Pe,r=new Pe,a=new it,o=new nc({depthPacking:$g}),l=new ic,c={},u=t.maxTextureSize,d={[ri]:Xt,[Xt]:ri,[wn]:wn},h=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:KE,fragmentShader:JE}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let v=new cn;v.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ot(v,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oh;let f=this.type;this.render=function(R,L,k){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;let w=n.getRenderTarget(),_=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),B=n.state;B.setBlending(ji),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let G=f!==Si&&this.type===Si,q=f===Si&&this.type!==Si;for(let j=0,Y=R.length;j<Y;j++){let D=R[j],C=D.shadow;if(C===void 0){console.warn("THREE.WebGLShadowMap:",D,"has no shadow.");continue}if(C.autoUpdate===!1&&C.needsUpdate===!1)continue;s.copy(C.mapSize);let X=C.getFrameExtents();if(s.multiply(X),r.copy(C.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/X.x),s.x=r.x*X.x,C.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/X.y),s.y=r.y*X.y,C.mapSize.y=r.y)),C.map===null||G===!0||q===!0){let Q=this.type!==Si?{minFilter:qt,magFilter:qt}:{};C.map!==null&&C.map.dispose(),C.map=new mi(s.x,s.y,Q),C.map.texture.name=D.name+".shadowMap",C.camera.updateProjectionMatrix()}n.setRenderTarget(C.map),n.clear();let te=C.getViewportCount();for(let Q=0;Q<te;Q++){let de=C.getViewport(Q);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),B.viewport(a),C.updateMatrices(D,Q),i=C.getFrustum(),S(L,k,C.camera,D,this.type)}C.isPointLightShadow!==!0&&this.type===Si&&M(C,k),C.needsUpdate=!1}f=this.type,g.needsUpdate=!1,n.setRenderTarget(w,_,P)};function M(R,L){let k=e.update(y);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new mi(s.x,s.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(L,null,k,h,y,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(L,null,k,m,y,null)}function E(R,L,k,w){let _=null,P=k.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)_=P;else if(_=k.isPointLight===!0?l:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let B=_.uuid,G=L.uuid,q=c[B];q===void 0&&(q={},c[B]=q);let j=q[G];j===void 0&&(j=_.clone(),q[G]=j,L.addEventListener("dispose",A)),_=j}if(_.visible=L.visible,_.wireframe=L.wireframe,w===Si?_.side=L.shadowSide!==null?L.shadowSide:L.side:_.side=L.shadowSide!==null?L.shadowSide:d[L.side],_.alphaMap=L.alphaMap,_.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,_.map=L.map,_.clipShadows=L.clipShadows,_.clippingPlanes=L.clippingPlanes,_.clipIntersection=L.clipIntersection,_.displacementMap=L.displacementMap,_.displacementScale=L.displacementScale,_.displacementBias=L.displacementBias,_.wireframeLinewidth=L.wireframeLinewidth,_.linewidth=L.linewidth,k.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let B=n.properties.get(_);B.light=k}return _}function S(R,L,k,w,_){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&_===Si)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,R.matrixWorld);let G=e.update(R),q=R.material;if(Array.isArray(q)){let j=G.groups;for(let Y=0,D=j.length;Y<D;Y++){let C=j[Y],X=q[C.materialIndex];if(X&&X.visible){let te=E(R,X,w,_);R.onBeforeShadow(n,R,L,k,G,te,C),n.renderBufferDirect(k,null,G,te,R,C),R.onAfterShadow(n,R,L,k,G,te,C)}}}else if(q.visible){let j=E(R,q,w,_);R.onBeforeShadow(n,R,L,k,G,j,null),n.renderBufferDirect(k,null,G,j,R,null),R.onAfterShadow(n,R,L,k,G,j,null)}}let B=R.children;for(let G=0,q=B.length;G<q;G++)S(B[G],L,k,w,_)}function A(R){R.target.removeEventListener("dispose",A);for(let k in c){let w=c[k],_=R.target.uuid;_ in w&&(w[_].dispose(),delete w[_])}}}var QE={[hc]:pc,[fc]:vc,[mc]:yc,[zs]:gc,[pc]:hc,[vc]:fc,[yc]:mc,[gc]:zs};function eM(n,e){function t(){let O=!1,oe=new it,ce=null,xe=new it(0,0,0,0);return{setMask:function(se){ce!==se&&!O&&(n.colorMask(se,se,se,se),ce=se)},setLocked:function(se){O=se},setClear:function(se,ee,Se,$e,pt){pt===!0&&(se*=$e,ee*=$e,Se*=$e),oe.set(se,ee,Se,$e),xe.equals(oe)===!1&&(n.clearColor(se,ee,Se,$e),xe.copy(oe))},reset:function(){O=!1,ce=null,xe.set(-1,0,0,0)}}}function i(){let O=!1,oe=!1,ce=null,xe=null,se=null;return{setReversed:function(ee){if(oe!==ee){let Se=e.get("EXT_clip_control");ee?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),oe=ee;let $e=se;se=null,this.setClear($e)}},getReversed:function(){return oe},setTest:function(ee){ee?$(n.DEPTH_TEST):ne(n.DEPTH_TEST)},setMask:function(ee){ce!==ee&&!O&&(n.depthMask(ee),ce=ee)},setFunc:function(ee){if(oe&&(ee=QE[ee]),xe!==ee){switch(ee){case hc:n.depthFunc(n.NEVER);break;case pc:n.depthFunc(n.ALWAYS);break;case fc:n.depthFunc(n.LESS);break;case zs:n.depthFunc(n.LEQUAL);break;case mc:n.depthFunc(n.EQUAL);break;case gc:n.depthFunc(n.GEQUAL);break;case vc:n.depthFunc(n.GREATER);break;case yc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=ee}},setLocked:function(ee){O=ee},setClear:function(ee){se!==ee&&(oe&&(ee=1-ee),n.clearDepth(ee),se=ee)},reset:function(){O=!1,ce=null,xe=null,se=null,oe=!1}}}function s(){let O=!1,oe=null,ce=null,xe=null,se=null,ee=null,Se=null,$e=null,pt=null;return{setTest:function(st){O||(st?$(n.STENCIL_TEST):ne(n.STENCIL_TEST))},setMask:function(st){oe!==st&&!O&&(n.stencilMask(st),oe=st)},setFunc:function(st,Oi,hi){(ce!==st||xe!==Oi||se!==hi)&&(n.stencilFunc(st,Oi,hi),ce=st,xe=Oi,se=hi)},setOp:function(st,Oi,hi){(ee!==st||Se!==Oi||$e!==hi)&&(n.stencilOp(st,Oi,hi),ee=st,Se=Oi,$e=hi)},setLocked:function(st){O=st},setClear:function(st){pt!==st&&(n.clearStencil(st),pt=st)},reset:function(){O=!1,oe=null,ce=null,xe=null,se=null,ee=null,Se=null,$e=null,pt=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h=new WeakMap,m=[],v=null,y=!1,g=null,f=null,M=null,E=null,S=null,A=null,R=null,L=new Oe(0,0,0),k=0,w=!1,_=null,P=null,B=null,G=null,q=null,j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,D=0,C=n.getParameter(n.VERSION);C.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec(C)[1]),Y=D>=1):C.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec(C)[1]),Y=D>=2);let X=null,te={},Q=n.getParameter(n.SCISSOR_BOX),de=n.getParameter(n.VIEWPORT),pe=new it().fromArray(Q),We=new it().fromArray(de);function tt(O,oe,ce,xe){let se=new Uint8Array(4),ee=n.createTexture();n.bindTexture(O,ee),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Se=0;Se<ce;Se++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,se):n.texImage2D(oe+Se,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,se);return ee}let Z={};Z[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(n.DEPTH_TEST),a.setFunc(zs),Fe(!1),we(ah),$(n.CULL_FACE),yt(ji);function $(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function ne(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function me(O,oe){return d[O]!==oe?(n.bindFramebuffer(O,oe),d[O]=oe,O===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=oe),O===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function ye(O,oe){let ce=m,xe=!1;if(O){ce=h.get(oe),ce===void 0&&(ce=[],h.set(oe,ce));let se=O.textures;if(ce.length!==se.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,Se=se.length;ee<Se;ee++)ce[ee]=n.COLOR_ATTACHMENT0+ee;ce.length=se.length,xe=!0}}else ce[0]!==n.BACK&&(ce[0]=n.BACK,xe=!0);xe&&n.drawBuffers(ce)}function Ze(O){return v!==O?(n.useProgram(O),v=O,!0):!1}let Jt={[hs]:n.FUNC_ADD,[cg]:n.FUNC_SUBTRACT,[ug]:n.FUNC_REVERSE_SUBTRACT};Jt[dg]=n.MIN,Jt[hg]=n.MAX;let I={[pg]:n.ZERO,[fg]:n.ONE,[mg]:n.SRC_COLOR,[ql]:n.SRC_ALPHA,[_g]:n.SRC_ALPHA_SATURATE,[bg]:n.DST_COLOR,[vg]:n.DST_ALPHA,[gg]:n.ONE_MINUS_SRC_COLOR,[jl]:n.ONE_MINUS_SRC_ALPHA,[xg]:n.ONE_MINUS_DST_COLOR,[yg]:n.ONE_MINUS_DST_ALPHA,[Sg]:n.CONSTANT_COLOR,[wg]:n.ONE_MINUS_CONSTANT_COLOR,[Eg]:n.CONSTANT_ALPHA,[Mg]:n.ONE_MINUS_CONSTANT_ALPHA};function yt(O,oe,ce,xe,se,ee,Se,$e,pt,st){if(O===ji){y===!0&&(ne(n.BLEND),y=!1);return}if(y===!1&&($(n.BLEND),y=!0),O!==lg){if(O!==g||st!==w){if((f!==hs||S!==hs)&&(n.blendEquation(n.FUNC_ADD),f=hs,S=hs),st)switch(O){case Hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lh:n.blendFunc(n.ONE,n.ONE);break;case ch:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case uh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ch:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,E=null,A=null,R=null,L.set(0,0,0),k=0,g=O,w=st}return}se=se||oe,ee=ee||ce,Se=Se||xe,(oe!==f||se!==S)&&(n.blendEquationSeparate(Jt[oe],Jt[se]),f=oe,S=se),(ce!==M||xe!==E||ee!==A||Se!==R)&&(n.blendFuncSeparate(I[ce],I[xe],I[ee],I[Se]),M=ce,E=xe,A=ee,R=Se),($e.equals(L)===!1||pt!==k)&&(n.blendColor($e.r,$e.g,$e.b,pt),L.copy($e),k=pt),g=O,w=!1}function He(O,oe){O.side===wn?ne(n.CULL_FACE):$(n.CULL_FACE);let ce=O.side===Xt;oe&&(ce=!ce),Fe(ce),O.blending===Hs&&O.transparent===!1?yt(ji):yt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let xe=O.stencilWrite;o.setTest(xe),xe&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ee(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?$(n.SAMPLE_ALPHA_TO_COVERAGE):ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(O){_!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),_=O)}function we(O){O!==rg?($(n.CULL_FACE),O!==P&&(O===ah?n.cullFace(n.BACK):O===ag?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ne(n.CULL_FACE),P=O}function bt(O){O!==B&&(Y&&n.lineWidth(O),B=O)}function Ee(O,oe,ce){O?($(n.POLYGON_OFFSET_FILL),(G!==oe||q!==ce)&&(n.polygonOffset(oe,ce),G=oe,q=ce)):ne(n.POLYGON_OFFSET_FILL)}function Xe(O){O?$(n.SCISSOR_TEST):ne(n.SCISSOR_TEST)}function $t(O){O===void 0&&(O=n.TEXTURE0+j-1),X!==O&&(n.activeTexture(O),X=O)}function Et(O,oe,ce){ce===void 0&&(X===null?ce=n.TEXTURE0+j-1:ce=X);let xe=te[ce];xe===void 0&&(xe={type:void 0,texture:void 0},te[ce]=xe),(xe.type!==O||xe.texture!==oe)&&(X!==ce&&(n.activeTexture(ce),X=ce),n.bindTexture(O,oe||Z[O]),xe.type=O,xe.texture=oe)}function T(){let O=te[X];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function H(){try{n.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{n.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ie(){try{n.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ie(){try{n.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function le(){try{n.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Me(){try{n.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ce(){try{n.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ae(){try{n.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ge(O){pe.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),pe.copy(O))}function Ue(O){We.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),We.copy(O))}function Re(O,oe){let ce=c.get(oe);ce===void 0&&(ce=new WeakMap,c.set(oe,ce));let xe=ce.get(O);xe===void 0&&(xe=n.getUniformBlockIndex(oe,O.name),ce.set(O,xe))}function he(O,oe){let xe=c.get(oe).get(O);l.get(oe)!==xe&&(n.uniformBlockBinding(oe,xe,O.__bindingPointIndex),l.set(oe,xe))}function qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},X=null,te={},d={},h=new WeakMap,m=[],v=null,y=!1,g=null,f=null,M=null,E=null,S=null,A=null,R=null,L=new Oe(0,0,0),k=0,w=!1,_=null,P=null,B=null,G=null,q=null,pe.set(0,0,n.canvas.width,n.canvas.height),We.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:ne,bindFramebuffer:me,drawBuffers:ye,useProgram:Ze,setBlending:yt,setMaterial:He,setFlipSided:Fe,setCullFace:we,setLineWidth:bt,setPolygonOffset:Ee,setScissorTest:Xe,activeTexture:$t,bindTexture:Et,unbindTexture:T,compressedTexImage2D:b,compressedTexImage3D:H,texImage2D:Ce,texImage3D:ae,updateUBOMapping:Re,uniformBlockBinding:he,texStorage2D:le,texStorage3D:Me,texSubImage2D:J,texSubImage3D:ie,compressedTexSubImage2D:K,compressedTexSubImage3D:Ie,scissor:ge,viewport:Ue,reset:qe}}function tM(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,u=new WeakMap,d,h=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,b){return m?new OffscreenCanvas(T,b):zr("canvas")}function y(T,b,H){let J=1,ie=Et(T);if((ie.width>H||ie.height>H)&&(J=H/Math.max(ie.width,ie.height)),J<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let K=Math.floor(J*ie.width),Ie=Math.floor(J*ie.height);d===void 0&&(d=v(K,Ie));let le=b?v(K,Ie):d;return le.width=K,le.height=Ie,le.getContext("2d").drawImage(T,0,0,K,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+K+"x"+Ie+")."),le}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),T;return T}function g(T){return T.generateMipmaps}function f(T){n.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(T,b,H,J,ie=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=b;if(b===n.RED&&(H===n.FLOAT&&(K=n.R32F),H===n.HALF_FLOAT&&(K=n.R16F),H===n.UNSIGNED_BYTE&&(K=n.R8)),b===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.R8UI),H===n.UNSIGNED_SHORT&&(K=n.R16UI),H===n.UNSIGNED_INT&&(K=n.R32UI),H===n.BYTE&&(K=n.R8I),H===n.SHORT&&(K=n.R16I),H===n.INT&&(K=n.R32I)),b===n.RG&&(H===n.FLOAT&&(K=n.RG32F),H===n.HALF_FLOAT&&(K=n.RG16F),H===n.UNSIGNED_BYTE&&(K=n.RG8)),b===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RG8UI),H===n.UNSIGNED_SHORT&&(K=n.RG16UI),H===n.UNSIGNED_INT&&(K=n.RG32UI),H===n.BYTE&&(K=n.RG8I),H===n.SHORT&&(K=n.RG16I),H===n.INT&&(K=n.RG32I)),b===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RGB8UI),H===n.UNSIGNED_SHORT&&(K=n.RGB16UI),H===n.UNSIGNED_INT&&(K=n.RGB32UI),H===n.BYTE&&(K=n.RGB8I),H===n.SHORT&&(K=n.RGB16I),H===n.INT&&(K=n.RGB32I)),b===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),H===n.UNSIGNED_INT&&(K=n.RGBA32UI),H===n.BYTE&&(K=n.RGBA8I),H===n.SHORT&&(K=n.RGBA16I),H===n.INT&&(K=n.RGBA32I)),b===n.RGB&&(H===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),b===n.RGBA){let Ie=ie?Ya:et.getTransfer(J);H===n.FLOAT&&(K=n.RGBA32F),H===n.HALF_FLOAT&&(K=n.RGBA16F),H===n.UNSIGNED_BYTE&&(K=Ie===at?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function S(T,b){let H;return T?b===null||b===bs||b===ra?H=n.DEPTH24_STENCIL8:b===jn?H=n.DEPTH32F_STENCIL8:b===ia&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===bs||b===ra?H=n.DEPTH_COMPONENT24:b===jn?H=n.DEPTH_COMPONENT32F:b===ia&&(H=n.DEPTH_COMPONENT16),H}function A(T,b){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==qt&&T.minFilter!==an?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function R(T){let b=T.target;b.removeEventListener("dispose",R),k(b),b.isVideoTexture&&u.delete(b)}function L(T){let b=T.target;b.removeEventListener("dispose",L),_(b)}function k(T){let b=i.get(T);if(b.__webglInit===void 0)return;let H=T.source,J=h.get(H);if(J){let ie=J[b.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&w(T),Object.keys(J).length===0&&h.delete(H)}i.remove(T)}function w(T){let b=i.get(T);n.deleteTexture(b.__webglTexture);let H=T.source,J=h.get(H);delete J[b.__cacheKey],a.memory.textures--}function _(T){let b=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let ie=0;ie<b.__webglFramebuffer[J].length;ie++)n.deleteFramebuffer(b.__webglFramebuffer[J][ie]);else n.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)n.deleteFramebuffer(b.__webglFramebuffer[J]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let H=T.textures;for(let J=0,ie=H.length;J<ie;J++){let K=i.get(H[J]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),a.memory.textures--),i.remove(H[J])}i.remove(T)}let P=0;function B(){P=0}function G(){let T=P;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function q(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function j(T,b){let H=i.get(T);if(T.isVideoTexture&&Xe(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&H.__version!==T.version){let J=T.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(H,T,b);return}}else T.isExternalTexture&&(H.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+b)}function Y(T,b){let H=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&H.__version!==T.version){Z(H,T,b);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+b)}function D(T,b){let H=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&H.__version!==T.version){Z(H,T,b);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+b)}function C(T,b){let H=i.get(T);if(T.version>0&&H.__version!==T.version){$(H,T,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+b)}let X={[ps]:n.REPEAT,[pi]:n.CLAMP_TO_EDGE,[Vr]:n.MIRRORED_REPEAT},te={[qt]:n.NEAREST,[wc]:n.NEAREST_MIPMAP_NEAREST,[ir]:n.NEAREST_MIPMAP_LINEAR,[an]:n.LINEAR,[na]:n.LINEAR_MIPMAP_NEAREST,[li]:n.LINEAR_MIPMAP_LINEAR},Q={[Hg]:n.NEVER,[Xg]:n.ALWAYS,[zg]:n.LESS,[xh]:n.LEQUAL,[Gg]:n.EQUAL,[jg]:n.GEQUAL,[Wg]:n.GREATER,[qg]:n.NOTEQUAL};function de(T,b){if(b.type===jn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===an||b.magFilter===na||b.magFilter===ir||b.magFilter===li||b.minFilter===an||b.minFilter===na||b.minFilter===ir||b.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,X[b.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,X[b.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,X[b.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,te[b.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,te[b.minFilter]),b.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Q[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===qt||b.minFilter!==ir&&b.minFilter!==li||b.type===jn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function pe(T,b){let H=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",R));let J=b.source,ie=h.get(J);ie===void 0&&(ie={},h.set(J,ie));let K=q(b);if(K!==T.__cacheKey){ie[K]===void 0&&(ie[K]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ie[K].usedTimes++;let Ie=ie[T.__cacheKey];Ie!==void 0&&(ie[T.__cacheKey].usedTimes--,Ie.usedTimes===0&&w(b)),T.__cacheKey=K,T.__webglTexture=ie[K].texture}return H}function We(T,b,H){return Math.floor(Math.floor(T/H)/b)}function tt(T,b,H,J){let K=T.updateRanges;if(K.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,H,J,b.data);else{K.sort((ae,ge)=>ae.start-ge.start);let Ie=0;for(let ae=1;ae<K.length;ae++){let ge=K[Ie],Ue=K[ae],Re=ge.start+ge.count,he=We(Ue.start,b.width,4),qe=We(ge.start,b.width,4);Ue.start<=Re+1&&he===qe&&We(Ue.start+Ue.count-1,b.width,4)===he?ge.count=Math.max(ge.count,Ue.start+Ue.count-ge.start):(++Ie,K[Ie]=Ue)}K.length=Ie+1;let le=n.getParameter(n.UNPACK_ROW_LENGTH),Me=n.getParameter(n.UNPACK_SKIP_PIXELS),Ce=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let ae=0,ge=K.length;ae<ge;ae++){let Ue=K[ae],Re=Math.floor(Ue.start/4),he=Math.ceil(Ue.count/4),qe=Re%b.width,O=Math.floor(Re/b.width),oe=he,ce=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,qe),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),t.texSubImage2D(n.TEXTURE_2D,0,qe,O,oe,ce,H,J,b.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,le),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Me),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ce)}}function Z(T,b,H){let J=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(J=n.TEXTURE_3D);let ie=pe(T,b),K=b.source;t.bindTexture(J,T.__webglTexture,n.TEXTURE0+H);let Ie=i.get(K);if(K.version!==Ie.__version||ie===!0){t.activeTexture(n.TEXTURE0+H);let le=et.getPrimaries(et.workingColorSpace),Me=b.colorSpace===Yi?null:et.getPrimaries(b.colorSpace),Ce=b.colorSpace===Yi||le===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let ae=y(b.image,!1,s.maxTextureSize);ae=$t(b,ae);let ge=r.convert(b.format,b.colorSpace),Ue=r.convert(b.type),Re=E(b.internalFormat,ge,Ue,b.colorSpace,b.isVideoTexture);de(J,b);let he,qe=b.mipmaps,O=b.isVideoTexture!==!0,oe=Ie.__version===void 0||ie===!0,ce=K.dataReady,xe=A(b,ae);if(b.isDepthTexture)Re=S(b.format===aa,b.type),oe&&(O?t.texStorage2D(n.TEXTURE_2D,1,Re,ae.width,ae.height):t.texImage2D(n.TEXTURE_2D,0,Re,ae.width,ae.height,0,ge,Ue,null));else if(b.isDataTexture)if(qe.length>0){O&&oe&&t.texStorage2D(n.TEXTURE_2D,xe,Re,qe[0].width,qe[0].height);for(let se=0,ee=qe.length;se<ee;se++)he=qe[se],O?ce&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,he.width,he.height,ge,Ue,he.data):t.texImage2D(n.TEXTURE_2D,se,Re,he.width,he.height,0,ge,Ue,he.data);b.generateMipmaps=!1}else O?(oe&&t.texStorage2D(n.TEXTURE_2D,xe,Re,ae.width,ae.height),ce&&tt(b,ae,ge,Ue)):t.texImage2D(n.TEXTURE_2D,0,Re,ae.width,ae.height,0,ge,Ue,ae.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){O&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Re,qe[0].width,qe[0].height,ae.depth);for(let se=0,ee=qe.length;se<ee;se++)if(he=qe[se],b.format!==Dn)if(ge!==null)if(O){if(ce)if(b.layerUpdates.size>0){let Se=Ah(he.width,he.height,b.format,b.type);for(let $e of b.layerUpdates){let pt=he.data.subarray($e*Se/he.data.BYTES_PER_ELEMENT,($e+1)*Se/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,$e,he.width,he.height,1,ge,pt)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,he.width,he.height,ae.depth,ge,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Re,he.width,he.height,ae.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ce&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,he.width,he.height,ae.depth,ge,Ue,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Re,he.width,he.height,ae.depth,0,ge,Ue,he.data)}else{O&&oe&&t.texStorage2D(n.TEXTURE_2D,xe,Re,qe[0].width,qe[0].height);for(let se=0,ee=qe.length;se<ee;se++)he=qe[se],b.format!==Dn?ge!==null?O?ce&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,he.width,he.height,ge,he.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Re,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ce&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,he.width,he.height,ge,Ue,he.data):t.texImage2D(n.TEXTURE_2D,se,Re,he.width,he.height,0,ge,Ue,he.data)}else if(b.isDataArrayTexture)if(O){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Re,ae.width,ae.height,ae.depth),ce)if(b.layerUpdates.size>0){let se=Ah(ae.width,ae.height,b.format,b.type);for(let ee of b.layerUpdates){let Se=ae.data.subarray(ee*se/ae.data.BYTES_PER_ELEMENT,(ee+1)*se/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ee,ae.width,ae.height,1,ge,Ue,Se)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,ge,Ue,ae.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ae.width,ae.height,ae.depth,0,ge,Ue,ae.data);else if(b.isData3DTexture)O?(oe&&t.texStorage3D(n.TEXTURE_3D,xe,Re,ae.width,ae.height,ae.depth),ce&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,ge,Ue,ae.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ae.width,ae.height,ae.depth,0,ge,Ue,ae.data);else if(b.isFramebufferTexture){if(oe)if(O)t.texStorage2D(n.TEXTURE_2D,xe,Re,ae.width,ae.height);else{let se=ae.width,ee=ae.height;for(let Se=0;Se<xe;Se++)t.texImage2D(n.TEXTURE_2D,Se,Re,se,ee,0,ge,Ue,null),se>>=1,ee>>=1}}else if(qe.length>0){if(O&&oe){let se=Et(qe[0]);t.texStorage2D(n.TEXTURE_2D,xe,Re,se.width,se.height)}for(let se=0,ee=qe.length;se<ee;se++)he=qe[se],O?ce&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,ge,Ue,he):t.texImage2D(n.TEXTURE_2D,se,Re,ge,Ue,he);b.generateMipmaps=!1}else if(O){if(oe){let se=Et(ae);t.texStorage2D(n.TEXTURE_2D,xe,Re,se.width,se.height)}ce&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Ue,ae)}else t.texImage2D(n.TEXTURE_2D,0,Re,ge,Ue,ae);g(b)&&f(J),Ie.__version=K.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function $(T,b,H){if(b.image.length!==6)return;let J=pe(T,b),ie=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+H);let K=i.get(ie);if(ie.version!==K.__version||J===!0){t.activeTexture(n.TEXTURE0+H);let Ie=et.getPrimaries(et.workingColorSpace),le=b.colorSpace===Yi?null:et.getPrimaries(b.colorSpace),Me=b.colorSpace===Yi||Ie===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let Ce=b.isCompressedTexture||b.image[0].isCompressedTexture,ae=b.image[0]&&b.image[0].isDataTexture,ge=[];for(let ee=0;ee<6;ee++)!Ce&&!ae?ge[ee]=y(b.image[ee],!0,s.maxCubemapSize):ge[ee]=ae?b.image[ee].image:b.image[ee],ge[ee]=$t(b,ge[ee]);let Ue=ge[0],Re=r.convert(b.format,b.colorSpace),he=r.convert(b.type),qe=E(b.internalFormat,Re,he,b.colorSpace),O=b.isVideoTexture!==!0,oe=K.__version===void 0||J===!0,ce=ie.dataReady,xe=A(b,Ue);de(n.TEXTURE_CUBE_MAP,b);let se;if(Ce){O&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,qe,Ue.width,Ue.height);for(let ee=0;ee<6;ee++){se=ge[ee].mipmaps;for(let Se=0;Se<se.length;Se++){let $e=se[Se];b.format!==Dn?Re!==null?O?ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,0,0,$e.width,$e.height,Re,$e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,qe,$e.width,$e.height,0,$e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,0,0,$e.width,$e.height,Re,he,$e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,qe,$e.width,$e.height,0,Re,he,$e.data)}}}else{if(se=b.mipmaps,O&&oe){se.length>0&&xe++;let ee=Et(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,qe,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ae){O?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,ge[ee].width,ge[ee].height,Re,he,ge[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,qe,ge[ee].width,ge[ee].height,0,Re,he,ge[ee].data);for(let Se=0;Se<se.length;Se++){let pt=se[Se].image[ee].image;O?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,0,0,pt.width,pt.height,Re,he,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,qe,pt.width,pt.height,0,Re,he,pt.data)}}else{O?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Re,he,ge[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,qe,Re,he,ge[ee]);for(let Se=0;Se<se.length;Se++){let $e=se[Se];O?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,0,0,Re,he,$e.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,qe,Re,he,$e.image[ee])}}}g(b)&&f(n.TEXTURE_CUBE_MAP),K.__version=ie.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function ne(T,b,H,J,ie,K){let Ie=r.convert(H.format,H.colorSpace),le=r.convert(H.type),Me=E(H.internalFormat,Ie,le,H.colorSpace),Ce=i.get(b),ae=i.get(H);if(ae.__renderTarget=b,!Ce.__hasExternalTextures){let ge=Math.max(1,b.width>>K),Ue=Math.max(1,b.height>>K);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,K,Me,ge,Ue,b.depth,0,Ie,le,null):t.texImage2D(ie,K,Me,ge,Ue,0,Ie,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Ee(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,ie,ae.__webglTexture,0,bt(b)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,ie,ae.__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function me(T,b,H){if(n.bindRenderbuffer(n.RENDERBUFFER,T),b.depthBuffer){let J=b.depthTexture,ie=J&&J.isDepthTexture?J.type:null,K=S(b.stencilBuffer,ie),Ie=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=bt(b);Ee(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,K,b.width,b.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,K,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,K,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ie,n.RENDERBUFFER,T)}else{let J=b.textures;for(let ie=0;ie<J.length;ie++){let K=J[ie],Ie=r.convert(K.format,K.colorSpace),le=r.convert(K.type),Me=E(K.internalFormat,Ie,le,K.colorSpace),Ce=bt(b);H&&Ee(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,Me,b.width,b.height):Ee(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce,Me,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Me,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=i.get(b.depthTexture);J.__renderTarget=b,(!J.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),j(b.depthTexture,0);let ie=J.__webglTexture,K=bt(b);if(b.depthTexture.format===Hr)Ee(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0);else if(b.depthTexture.format===aa)Ee(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ze(T){let b=i.get(T),H=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){let J=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),J){let ie=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,J.removeEventListener("dispose",ie)};J.addEventListener("dispose",ie),b.__depthDisposeCallback=ie}b.__boundDepthTexture=J}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let J=T.texture.mipmaps;J&&J.length>0?ye(b.__webglFramebuffer[0],T):ye(b.__webglFramebuffer,T)}else if(H){b.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[J]),b.__webglDepthbuffer[J]===void 0)b.__webglDepthbuffer[J]=n.createRenderbuffer(),me(b.__webglDepthbuffer[J],T,!1);else{let ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,K)}}else{let J=T.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),me(b.__webglDepthbuffer,T,!1);else{let ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,K)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Jt(T,b,H){let J=i.get(T);b!==void 0&&ne(J.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Ze(T)}function I(T){let b=T.texture,H=i.get(T),J=i.get(b);T.addEventListener("dispose",L);let ie=T.textures,K=T.isWebGLCubeRenderTarget===!0,Ie=ie.length>1;if(Ie||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=b.version,a.memory.textures++),K){H.__webglFramebuffer=[];for(let le=0;le<6;le++)if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer[le]=[];for(let Me=0;Me<b.mipmaps.length;Me++)H.__webglFramebuffer[le][Me]=n.createFramebuffer()}else H.__webglFramebuffer[le]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer=[];for(let le=0;le<b.mipmaps.length;le++)H.__webglFramebuffer[le]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Ie)for(let le=0,Me=ie.length;le<Me;le++){let Ce=i.get(ie[le]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Ee(T)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let le=0;le<ie.length;le++){let Me=ie[le];H.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[le]);let Ce=r.convert(Me.format,Me.colorSpace),ae=r.convert(Me.type),ge=E(Me.internalFormat,Ce,ae,Me.colorSpace,T.isXRRenderTarget===!0),Ue=bt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue,ge,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,H.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),me(H.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),de(n.TEXTURE_CUBE_MAP,b);for(let le=0;le<6;le++)if(b.mipmaps&&b.mipmaps.length>0)for(let Me=0;Me<b.mipmaps.length;Me++)ne(H.__webglFramebuffer[le][Me],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Me);else ne(H.__webglFramebuffer[le],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);g(b)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let le=0,Me=ie.length;le<Me;le++){let Ce=ie[le],ae=i.get(Ce),ge=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ge=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,ae.__webglTexture),de(ge,Ce),ne(H.__webglFramebuffer,T,Ce,n.COLOR_ATTACHMENT0+le,ge,0),g(Ce)&&f(ge)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,J.__webglTexture),de(le,b),b.mipmaps&&b.mipmaps.length>0)for(let Me=0;Me<b.mipmaps.length;Me++)ne(H.__webglFramebuffer[Me],T,b,n.COLOR_ATTACHMENT0,le,Me);else ne(H.__webglFramebuffer,T,b,n.COLOR_ATTACHMENT0,le,0);g(b)&&f(le),t.unbindTexture()}T.depthBuffer&&Ze(T)}function yt(T){let b=T.textures;for(let H=0,J=b.length;H<J;H++){let ie=b[H];if(g(ie)){let K=M(T),Ie=i.get(ie).__webglTexture;t.bindTexture(K,Ie),f(K),t.unbindTexture()}}}let He=[],Fe=[];function we(T){if(T.samples>0){if(Ee(T)===!1){let b=T.textures,H=T.width,J=T.height,ie=n.COLOR_BUFFER_BIT,K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ie=i.get(T),le=b.length>1;if(le)for(let Ce=0;Ce<b.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer);let Me=T.texture.mipmaps;Me&&Me.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ce=0;Ce<b.length;Ce++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ce]);let ae=i.get(b[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ae,0)}n.blitFramebuffer(0,0,H,J,0,0,H,J,ie,n.NEAREST),l===!0&&(He.length=0,Fe.length=0,He.push(n.COLOR_ATTACHMENT0+Ce),T.depthBuffer&&T.resolveDepthBuffer===!1&&(He.push(K),Fe.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let Ce=0;Ce<b.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ce]);let ae=i.get(b[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let b=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function bt(T){return Math.min(s.maxSamples,T.samples)}function Ee(T){let b=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Xe(T){let b=a.render.frame;u.get(T)!==b&&(u.set(T,b),T.update())}function $t(T,b){let H=T.colorSpace,J=T.format,ie=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||H!==jt&&H!==Yi&&(et.getTransfer(H)===at?(J!==Dn||ie!==ci)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),b}function Et(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=Y,this.setTexture3D=D,this.setTextureCube=C,this.rebindTextures=Jt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=Ee}function nM(n,e){function t(i,s=Yi){let r,a=et.getTransfer(s);if(i===ci)return n.UNSIGNED_BYTE;if(i===Mc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Tc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===mh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===hh)return n.BYTE;if(i===ph)return n.SHORT;if(i===ia)return n.UNSIGNED_SHORT;if(i===Ec)return n.INT;if(i===bs)return n.UNSIGNED_INT;if(i===jn)return n.FLOAT;if(i===sa)return n.HALF_FLOAT;if(i===gh)return n.ALPHA;if(i===vh)return n.RGB;if(i===Dn)return n.RGBA;if(i===Hr)return n.DEPTH_COMPONENT;if(i===aa)return n.DEPTH_STENCIL;if(i===Ac)return n.RED;if(i===Cc)return n.RED_INTEGER;if(i===yh)return n.RG;if(i===Rc)return n.RG_INTEGER;if(i===Ic)return n.RGBA_INTEGER;if(i===To||i===Ao||i===Co||i===Ro)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===To)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===To)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ao)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ro)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pc||i===Lc||i===Nc||i===Dc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Pc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Lc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Dc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Oc||i===kc||i===Uc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Oc||i===kc)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Uc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Fc||i===Bc||i===$c||i===Vc||i===Hc||i===zc||i===Gc||i===Wc||i===qc||i===jc||i===Xc||i===Yc||i===Kc||i===Jc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Fc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Bc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$c)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Vc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Hc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===zc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Gc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===qc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Yc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Kc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Jc)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zc||i===Qc||i===eu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Zc)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===eu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===tu||i===nu||i===iu||i===su)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===tu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===nu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===iu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===su)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ra?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var iM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sM=`
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

}`,$h=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new uo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new oi({vertexShader:iM,fragmentShader:sM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new Ks(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vh=class extends ai{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,m=null,v=null,y=typeof XRWebGLBinding<"u",g=new $h,f={},M=t.getContextAttributes(),E=null,S=null,A=[],R=[],L=new Pe,k=null,w=new It;w.viewport=new it;let _=new It;_.viewport=new it;let P=[w,_],B=new cc,G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let $=A[Z];return $===void 0&&($=new jr,A[Z]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Z){let $=A[Z];return $===void 0&&($=new jr,A[Z]=$),$.getGripSpace()},this.getHand=function(Z){let $=A[Z];return $===void 0&&($=new jr,A[Z]=$),$.getHandSpace()};function j(Z){let $=R.indexOf(Z.inputSource);if($===-1)return;let ne=A[$];ne!==void 0&&(ne.update(Z.inputSource,Z.frame,c||a),ne.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Y(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",D);for(let Z=0;Z<A.length;Z++){let $=R[Z];$!==null&&(R[Z]=null,A[Z].disconnect($))}G=null,q=null,g.reset();for(let Z in f)delete f[Z];e.setRenderTarget(E),m=null,h=null,d=null,s=null,S=null,tt.stop(),i.isPresenting=!1,e.setPixelRatio(k),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",D),M.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(L),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,me=null,ye=null;M.depth&&(ye=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=M.stencil?aa:Hr,me=M.stencil?ra:bs);let Ze={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ze),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new mi(h.textureWidth,h.textureHeight,{format:Dn,type:ci,depthTexture:new co(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let ne={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new mi(m.framebufferWidth,m.framebufferHeight,{format:Dn,type:ci,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),tt.setContext(s),tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function D(Z){for(let $=0;$<Z.removed.length;$++){let ne=Z.removed[$],me=R.indexOf(ne);me>=0&&(R[me]=null,A[me].disconnect(ne))}for(let $=0;$<Z.added.length;$++){let ne=Z.added[$],me=R.indexOf(ne);if(me===-1){for(let Ze=0;Ze<A.length;Ze++)if(Ze>=R.length){R.push(ne),me=Ze;break}else if(R[Ze]===null){R[Ze]=ne,me=Ze;break}if(me===-1)break}let ye=A[me];ye&&ye.connect(ne)}}let C=new N,X=new N;function te(Z,$,ne){C.setFromMatrixPosition($.matrixWorld),X.setFromMatrixPosition(ne.matrixWorld);let me=C.distanceTo(X),ye=$.projectionMatrix.elements,Ze=ne.projectionMatrix.elements,Jt=ye[14]/(ye[10]-1),I=ye[14]/(ye[10]+1),yt=(ye[9]+1)/ye[5],He=(ye[9]-1)/ye[5],Fe=(ye[8]-1)/ye[0],we=(Ze[8]+1)/Ze[0],bt=Jt*Fe,Ee=Jt*we,Xe=me/(-Fe+we),$t=Xe*-Fe;if($.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX($t),Z.translateZ(Xe),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),ye[10]===-1)Z.projectionMatrix.copy($.projectionMatrix),Z.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let Et=Jt+Xe,T=I+Xe,b=bt-$t,H=Ee+(me-$t),J=yt*I/T*Et,ie=He*I/T*Et;Z.projectionMatrix.makePerspective(b,H,J,ie,Et,T),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Q(Z,$){$===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices($.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let $=Z.near,ne=Z.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(ne=g.depthFar)),B.near=_.near=w.near=$,B.far=_.far=w.far=ne,(G!==B.near||q!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),G=B.near,q=B.far),B.layers.mask=Z.layers.mask|6,w.layers.mask=B.layers.mask&3,_.layers.mask=B.layers.mask&5;let me=Z.parent,ye=B.cameras;Q(B,me);for(let Ze=0;Ze<ye.length;Ze++)Q(ye[Ze],me);ye.length===2?te(B,w,_):B.projectionMatrix.copy(w.projectionMatrix),de(Z,B,me)};function de(Z,$,ne){ne===null?Z.matrix.copy($.matrixWorld):(Z.matrix.copy(ne.matrixWorld),Z.matrix.invert(),Z.matrix.multiply($.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy($.projectionMatrix),Z.projectionMatrixInverse.copy($.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=qs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(Z){return f[Z]};let pe=null;function We(Z,$){if(u=$.getViewerPose(c||a),v=$,u!==null){let ne=u.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let me=!1;ne.length!==B.cameras.length&&(B.cameras.length=0,me=!0);for(let I=0;I<ne.length;I++){let yt=ne[I],He=null;if(m!==null)He=m.getViewport(yt);else{let we=d.getViewSubImage(h,yt);He=we.viewport,I===0&&(e.setRenderTargetTextures(S,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(S))}let Fe=P[I];Fe===void 0&&(Fe=new It,Fe.layers.enable(I),Fe.viewport=new it,P[I]=Fe),Fe.matrix.fromArray(yt.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(yt.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(He.x,He.y,He.width,He.height),I===0&&(B.matrix.copy(Fe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),me===!0&&B.cameras.push(Fe)}let ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let I=d.getDepthInformation(ne[0]);I&&I.isValid&&I.texture&&g.init(I,s.renderState)}if(ye&&ye.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let I=0;I<ne.length;I++){let yt=ne[I].camera;if(yt){let He=f[yt];He||(He=new uo,f[yt]=He);let Fe=d.getCameraImage(yt);He.sourceTexture=Fe}}}}for(let ne=0;ne<A.length;ne++){let me=R[ne],ye=A[ne];me!==null&&ye!==void 0&&ye.update(me,$,c||a)}pe&&pe(Z,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),v=null}let tt=new Ev;tt.setAnimationLoop(We),this.setAnimationLoop=function(Z){pe=Z},this.dispose=function(){}}},ar=new qn,rM=new ze;function aM(n,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,Eh(n)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,M,E,S){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(g,f):f.isMeshToonMaterial?(r(g,f),d(g,f)):f.isMeshPhongMaterial?(r(g,f),u(g,f)):f.isMeshStandardMaterial?(r(g,f),h(g,f),f.isMeshPhysicalMaterial&&m(g,f,S)):f.isMeshMatcapMaterial?(r(g,f),v(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),y(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,M,E):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Xt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Xt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let M=e.get(f),E=M.envMap,S=M.envMapRotation;E&&(g.envMap.value=E,ar.copy(S),ar.x*=-1,ar.y*=-1,ar.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),g.envMapRotation.value.setFromMatrix4(rM.makeRotationFromEuler(ar)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,M,E){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*M,g.scale.value=E*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function d(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function h(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function m(g,f,M){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Xt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,f){f.matcap&&(g.matcap.value=f.matcap)}function y(g,f){let M=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function oM(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){let S=E.program;i.uniformBlockBinding(M,S)}function c(M,E){let S=s[M.id];S===void 0&&(v(M),S=u(M),s[M.id]=S,M.addEventListener("dispose",g));let A=E.program;i.updateUBOMapping(M,A);let R=e.render.frame;r[M.id]!==R&&(h(M),r[M.id]=R)}function u(M){let E=d();M.__bindingPointIndex=E;let S=n.createBuffer(),A=M.__size,R=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,A,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let E=s[M.id],S=M.uniforms,A=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let R=0,L=S.length;R<L;R++){let k=Array.isArray(S[R])?S[R]:[S[R]];for(let w=0,_=k.length;w<_;w++){let P=k[w];if(m(P,R,w,A)===!0){let B=P.__offset,G=Array.isArray(P.value)?P.value:[P.value],q=0;for(let j=0;j<G.length;j++){let Y=G[j],D=y(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,B+q,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,q),q+=D.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(M,E,S,A){let R=M.value,L=E+"_"+S;if(A[L]===void 0)return typeof R=="number"||typeof R=="boolean"?A[L]=R:A[L]=R.clone(),!0;{let k=A[L];if(typeof R=="number"||typeof R=="boolean"){if(k!==R)return A[L]=R,!0}else if(k.equals(R)===!1)return k.copy(R),!0}return!1}function v(M){let E=M.uniforms,S=0,A=16;for(let L=0,k=E.length;L<k;L++){let w=Array.isArray(E[L])?E[L]:[E[L]];for(let _=0,P=w.length;_<P;_++){let B=w[_],G=Array.isArray(B.value)?B.value:[B.value];for(let q=0,j=G.length;q<j;q++){let Y=G[q],D=y(Y),C=S%A,X=C%D.boundary,te=C+X;S+=X,te!==0&&A-te<D.storage&&(S+=A-te),B.__data=new Float32Array(D.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=D.storage}}}let R=S%A;return R>0&&(S+=A-R),M.__size=S,M.__cache={},this}function y(M){let E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function g(M){let E=M.target;E.removeEventListener("dispose",g);let S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(let M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var uu=class{constructor(e={}){let{canvas:t=Yg(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let v=new Uint32Array(4),y=new Int32Array(4),g=null,f=null,M=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,A=!1;this._outputColorSpace=Mt;let R=0,L=0,k=null,w=-1,_=null,P=new it,B=new it,G=null,q=new Oe(0),j=0,Y=t.width,D=t.height,C=1,X=null,te=null,Q=new it(0,0,Y,D),de=new it(0,0,Y,D),pe=!1,We=new Jr,tt=!1,Z=!1,$=new ze,ne=new N,me=new it,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ze=!1;function Jt(){return k===null?C:1}let I=i;function yt(x,U){return t.getContext(x,U)}try{let x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",se,!1),I===null){let U="webgl2";if(I=yt(U,x),I===null)throw yt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let He,Fe,we,bt,Ee,Xe,$t,Et,T,b,H,J,ie,K,Ie,le,Me,Ce,ae,ge,Ue,Re,he,qe;function O(){He=new Mw(I),He.init(),Re=new nM(I,He),Fe=new yw(I,He,e,Re),we=new eM(I,He),Fe.reversedDepthBuffer&&h&&we.buffers.depth.setReversed(!0),bt=new Cw(I),Ee=new VE,Xe=new tM(I,He,we,Ee,Fe,Re,bt),$t=new xw(S),Et=new Ew(S),T=new D0(I),he=new gw(I,T),b=new Tw(I,T,bt,he),H=new Iw(I,b,T,bt),ae=new Rw(I,Fe,Xe),le=new bw(Ee),J=new $E(S,$t,Et,He,Fe,he,le),ie=new aM(S,Ee),K=new zE,Ie=new YE(He),Ce=new mw(S,$t,Et,we,H,m,l),Me=new ZE(S,H,Fe),qe=new oM(I,bt,Fe,we),ge=new vw(I,He,bt),Ue=new Aw(I,He,bt),bt.programs=J.programs,S.capabilities=Fe,S.extensions=He,S.properties=Ee,S.renderLists=K,S.shadowMap=Me,S.state=we,S.info=bt}O();let oe=new Vh(S,I);this.xr=oe,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let x=He.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=He.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return C},this.setPixelRatio=function(x){x!==void 0&&(C=x,this.setSize(Y,D,!1))},this.getSize=function(x){return x.set(Y,D)},this.setSize=function(x,U,z=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=x,D=U,t.width=Math.floor(x*C),t.height=Math.floor(U*C),z===!0&&(t.style.width=x+"px",t.style.height=U+"px"),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(Y*C,D*C).floor()},this.setDrawingBufferSize=function(x,U,z){Y=x,D=U,C=z,t.width=Math.floor(x*z),t.height=Math.floor(U*z),this.setViewport(0,0,x,U)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(Q)},this.setViewport=function(x,U,z,W){x.isVector4?Q.set(x.x,x.y,x.z,x.w):Q.set(x,U,z,W),we.viewport(P.copy(Q).multiplyScalar(C).round())},this.getScissor=function(x){return x.copy(de)},this.setScissor=function(x,U,z,W){x.isVector4?de.set(x.x,x.y,x.z,x.w):de.set(x,U,z,W),we.scissor(B.copy(de).multiplyScalar(C).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(x){we.setScissorTest(pe=x)},this.setOpaqueSort=function(x){X=x},this.setTransparentSort=function(x){te=x},this.getClearColor=function(x){return x.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(x=!0,U=!0,z=!0){let W=0;if(x){let F=!1;if(k!==null){let re=k.texture.format;F=re===Ic||re===Rc||re===Cc}if(F){let re=k.texture.type,fe=re===ci||re===bs||re===ia||re===ra||re===Mc||re===Tc,_e=Ce.getClearColor(),ve=Ce.getClearAlpha(),ke=_e.r,Be=_e.g,Ne=_e.b;fe?(v[0]=ke,v[1]=Be,v[2]=Ne,v[3]=ve,I.clearBufferuiv(I.COLOR,0,v)):(y[0]=ke,y[1]=Be,y[2]=Ne,y[3]=ve,I.clearBufferiv(I.COLOR,0,y))}else W|=I.COLOR_BUFFER_BIT}U&&(W|=I.DEPTH_BUFFER_BIT),z&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",se,!1),Ce.dispose(),K.dispose(),Ie.dispose(),Ee.dispose(),$t.dispose(),Et.dispose(),H.dispose(),he.dispose(),qe.dispose(),J.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",hi),oe.removeEventListener("sessionend",mm),Ns.stop()};function ce(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let x=bt.autoReset,U=Me.enabled,z=Me.autoUpdate,W=Me.needsUpdate,F=Me.type;O(),bt.autoReset=x,Me.enabled=U,Me.autoUpdate=z,Me.needsUpdate=W,Me.type=F}function se(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function ee(x){let U=x.target;U.removeEventListener("dispose",ee),Se(U)}function Se(x){$e(x),Ee.remove(x)}function $e(x){let U=Ee.get(x).programs;U!==void 0&&(U.forEach(function(z){J.releaseProgram(z)}),x.isShaderMaterial&&J.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,z,W,F,re){U===null&&(U=ye);let fe=F.isMesh&&F.matrixWorld.determinant()<0,_e=Ex(x,U,z,W,F);we.setMaterial(W,fe);let ve=z.index,ke=1;if(W.wireframe===!0){if(ve=b.getWireframeAttribute(z),ve===void 0)return;ke=2}let Be=z.drawRange,Ne=z.attributes.position,Qe=Be.start*ke,lt=(Be.start+Be.count)*ke;re!==null&&(Qe=Math.max(Qe,re.start*ke),lt=Math.min(lt,(re.start+re.count)*ke)),ve!==null?(Qe=Math.max(Qe,0),lt=Math.min(lt,ve.count)):Ne!=null&&(Qe=Math.max(Qe,0),lt=Math.min(lt,Ne.count));let St=lt-Qe;if(St<0||St===1/0)return;he.setup(F,W,_e,z,ve);let gt,dt=ge;if(ve!==null&&(gt=T.get(ve),dt=Ue,dt.setIndex(gt)),F.isMesh)W.wireframe===!0?(we.setLineWidth(W.wireframeLinewidth*Jt()),dt.setMode(I.LINES)):dt.setMode(I.TRIANGLES);else if(F.isLine){let De=W.linewidth;De===void 0&&(De=1),we.setLineWidth(De*Jt()),F.isLineSegments?dt.setMode(I.LINES):F.isLineLoop?dt.setMode(I.LINE_LOOP):dt.setMode(I.LINE_STRIP)}else F.isPoints?dt.setMode(I.POINTS):F.isSprite&&dt.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Gr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))dt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let De=F._multiDrawStarts,xt=F._multiDrawCounts,nt=F._multiDrawCount,Rn=ve?T.get(ve).bytesPerElement:1,Mr=Ee.get(W).currentProgram.getUniforms();for(let In=0;In<nt;In++)Mr.setValue(I,"_gl_DrawID",In),dt.render(De[In]/Rn,xt[In])}else if(F.isInstancedMesh)dt.renderInstances(Qe,St,F.count);else if(z.isInstancedBufferGeometry){let De=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,xt=Math.min(z.instanceCount,De);dt.renderInstances(Qe,St,xt)}else dt.render(Qe,St)};function pt(x,U,z){x.transparent===!0&&x.side===wn&&x.forceSinglePass===!1?(x.side=Xt,x.needsUpdate=!0,xl(x,U,z),x.side=ri,x.needsUpdate=!0,xl(x,U,z),x.side=wn):xl(x,U,z)}this.compile=function(x,U,z=null){z===null&&(z=x),f=Ie.get(z),f.init(U),E.push(f),z.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),x!==z&&x.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();let W=new Set;return x.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let re=F.material;if(re)if(Array.isArray(re))for(let fe=0;fe<re.length;fe++){let _e=re[fe];pt(_e,z,F),W.add(_e)}else pt(re,z,F),W.add(re)}),f=E.pop(),W},this.compileAsync=function(x,U,z=null){let W=this.compile(x,U,z);return new Promise(F=>{function re(){if(W.forEach(function(fe){Ee.get(fe).currentProgram.isReady()&&W.delete(fe)}),W.size===0){F(x);return}setTimeout(re,10)}He.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let st=null;function Oi(x){st&&st(x)}function hi(){Ns.stop()}function mm(){Ns.start()}let Ns=new Ev;Ns.setAnimationLoop(Oi),typeof self<"u"&&Ns.setContext(self),this.setAnimationLoop=function(x){st=x,oe.setAnimationLoop(x),x===null?Ns.stop():Ns.start()},oe.addEventListener("sessionstart",hi),oe.addEventListener("sessionend",mm),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(U),U=oe.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,U,k),f=Ie.get(x,E.length),f.init(U),E.push(f),$.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),We.setFromProjectionMatrix($,ni,U.reversedDepth),Z=this.localClippingEnabled,tt=le.init(this.clippingPlanes,Z),g=K.get(x,M.length),g.init(),M.push(g),oe.enabled===!0&&oe.isPresenting===!0){let re=S.xr.getDepthSensingMesh();re!==null&&xd(re,U,-1/0,S.sortObjects)}xd(x,U,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(X,te),Ze=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Ze&&Ce.addToRenderList(g,x),this.info.render.frame++,tt===!0&&le.beginShadows();let z=f.state.shadowsArray;Me.render(z,x,U),tt===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=g.opaque,F=g.transmissive;if(f.setupLights(),U.isArrayCamera){let re=U.cameras;if(F.length>0)for(let fe=0,_e=re.length;fe<_e;fe++){let ve=re[fe];vm(W,F,x,ve)}Ze&&Ce.render(x);for(let fe=0,_e=re.length;fe<_e;fe++){let ve=re[fe];gm(g,x,ve,ve.viewport)}}else F.length>0&&vm(W,F,x,U),Ze&&Ce.render(x),gm(g,x,U);k!==null&&L===0&&(Xe.updateMultisampleRenderTarget(k),Xe.updateRenderTargetMipmap(k)),x.isScene===!0&&x.onAfterRender(S,x,U),he.resetDefaultState(),w=-1,_=null,E.pop(),E.length>0?(f=E[E.length-1],tt===!0&&le.setGlobalState(S.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function xd(x,U,z,W){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLight)f.pushLight(x),x.castShadow&&f.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||We.intersectsSprite(x)){W&&me.setFromMatrixPosition(x.matrixWorld).applyMatrix4($);let fe=H.update(x),_e=x.material;_e.visible&&g.push(x,fe,_e,z,me.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||We.intersectsObject(x))){let fe=H.update(x),_e=x.material;if(W&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),me.copy(x.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),me.copy(fe.boundingSphere.center)),me.applyMatrix4(x.matrixWorld).applyMatrix4($)),Array.isArray(_e)){let ve=fe.groups;for(let ke=0,Be=ve.length;ke<Be;ke++){let Ne=ve[ke],Qe=_e[Ne.materialIndex];Qe&&Qe.visible&&g.push(x,fe,Qe,z,me.z,Ne)}}else _e.visible&&g.push(x,fe,_e,z,me.z,null)}}let re=x.children;for(let fe=0,_e=re.length;fe<_e;fe++)xd(re[fe],U,z,W)}function gm(x,U,z,W){let F=x.opaque,re=x.transmissive,fe=x.transparent;f.setupLightsView(z),tt===!0&&le.setGlobalState(S.clippingPlanes,z),W&&we.viewport(P.copy(W)),F.length>0&&bl(F,U,z),re.length>0&&bl(re,U,z),fe.length>0&&bl(fe,U,z),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function vm(x,U,z,W){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new mi(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?sa:ci,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));let re=f.state.transmissionRenderTarget[W.id],fe=W.viewport||P;re.setSize(fe.z*S.transmissionResolutionScale,fe.w*S.transmissionResolutionScale);let _e=S.getRenderTarget(),ve=S.getActiveCubeFace(),ke=S.getActiveMipmapLevel();S.setRenderTarget(re),S.getClearColor(q),j=S.getClearAlpha(),j<1&&S.setClearColor(16777215,.5),S.clear(),Ze&&Ce.render(z);let Be=S.toneMapping;S.toneMapping=Xi;let Ne=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),tt===!0&&le.setGlobalState(S.clippingPlanes,W),bl(x,z,W),Xe.updateMultisampleRenderTarget(re),Xe.updateRenderTargetMipmap(re),He.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let lt=0,St=U.length;lt<St;lt++){let gt=U[lt],dt=gt.object,De=gt.geometry,xt=gt.material,nt=gt.group;if(xt.side===wn&&dt.layers.test(W.layers)){let Rn=xt.side;xt.side=Xt,xt.needsUpdate=!0,ym(dt,z,W,De,xt,nt),xt.side=Rn,xt.needsUpdate=!0,Qe=!0}}Qe===!0&&(Xe.updateMultisampleRenderTarget(re),Xe.updateRenderTargetMipmap(re))}S.setRenderTarget(_e,ve,ke),S.setClearColor(q,j),Ne!==void 0&&(W.viewport=Ne),S.toneMapping=Be}function bl(x,U,z){let W=U.isScene===!0?U.overrideMaterial:null;for(let F=0,re=x.length;F<re;F++){let fe=x[F],_e=fe.object,ve=fe.geometry,ke=fe.group,Be=fe.material;Be.allowOverride===!0&&W!==null&&(Be=W),_e.layers.test(z.layers)&&ym(_e,U,z,ve,Be,ke)}}function ym(x,U,z,W,F,re){x.onBeforeRender(S,U,z,W,F,re),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),F.onBeforeRender(S,U,z,W,x,re),F.transparent===!0&&F.side===wn&&F.forceSinglePass===!1?(F.side=Xt,F.needsUpdate=!0,S.renderBufferDirect(z,U,W,F,x,re),F.side=ri,F.needsUpdate=!0,S.renderBufferDirect(z,U,W,F,x,re),F.side=wn):S.renderBufferDirect(z,U,W,F,x,re),x.onAfterRender(S,U,z,W,F,re)}function xl(x,U,z){U.isScene!==!0&&(U=ye);let W=Ee.get(x),F=f.state.lights,re=f.state.shadowsArray,fe=F.state.version,_e=J.getParameters(x,F.state,re,U,z),ve=J.getProgramCacheKey(_e),ke=W.programs;W.environment=x.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(x.isMeshStandardMaterial?Et:$t).get(x.envMap||W.environment),W.envMapRotation=W.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,ke===void 0&&(x.addEventListener("dispose",ee),ke=new Map,W.programs=ke);let Be=ke.get(ve);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===fe)return xm(x,_e),Be}else _e.uniforms=J.getUniforms(x),x.onBeforeCompile(_e,S),Be=J.acquireProgram(_e,ve),ke.set(ve,Be),W.uniforms=_e.uniforms;let Ne=W.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ne.clippingPlanes=le.uniform),xm(x,_e),W.needsLights=Tx(x),W.lightsStateVersion=fe,W.needsLights&&(Ne.ambientLightColor.value=F.state.ambient,Ne.lightProbe.value=F.state.probe,Ne.directionalLights.value=F.state.directional,Ne.directionalLightShadows.value=F.state.directionalShadow,Ne.spotLights.value=F.state.spot,Ne.spotLightShadows.value=F.state.spotShadow,Ne.rectAreaLights.value=F.state.rectArea,Ne.ltc_1.value=F.state.rectAreaLTC1,Ne.ltc_2.value=F.state.rectAreaLTC2,Ne.pointLights.value=F.state.point,Ne.pointLightShadows.value=F.state.pointShadow,Ne.hemisphereLights.value=F.state.hemi,Ne.directionalShadowMap.value=F.state.directionalShadowMap,Ne.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ne.spotShadowMap.value=F.state.spotShadowMap,Ne.spotLightMatrix.value=F.state.spotLightMatrix,Ne.spotLightMap.value=F.state.spotLightMap,Ne.pointShadowMap.value=F.state.pointShadowMap,Ne.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function bm(x){if(x.uniformsList===null){let U=x.currentProgram.getUniforms();x.uniformsList=ua.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function xm(x,U){let z=Ee.get(x);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function Ex(x,U,z,W,F){U.isScene!==!0&&(U=ye),Xe.resetTextureUnits();let re=U.fog,fe=W.isMeshStandardMaterial?U.environment:null,_e=k===null?S.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:jt,ve=(W.isMeshStandardMaterial?Et:$t).get(W.envMap||fe),ke=W.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Be=!!z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ne=!!z.morphAttributes.position,Qe=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color,St=Xi;W.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(St=S.toneMapping);let gt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,dt=gt!==void 0?gt.length:0,De=Ee.get(W),xt=f.state.lights;if(tt===!0&&(Z===!0||x!==_)){let sn=x===_&&W.id===w;le.setState(W,x,sn)}let nt=!1;W.version===De.__version?(De.needsLights&&De.lightsStateVersion!==xt.state.version||De.outputColorSpace!==_e||F.isBatchedMesh&&De.batching===!1||!F.isBatchedMesh&&De.batching===!0||F.isBatchedMesh&&De.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&De.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&De.instancing===!1||!F.isInstancedMesh&&De.instancing===!0||F.isSkinnedMesh&&De.skinning===!1||!F.isSkinnedMesh&&De.skinning===!0||F.isInstancedMesh&&De.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&De.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&De.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&De.instancingMorph===!1&&F.morphTexture!==null||De.envMap!==ve||W.fog===!0&&De.fog!==re||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==le.numPlanes||De.numIntersection!==le.numIntersection)||De.vertexAlphas!==ke||De.vertexTangents!==Be||De.morphTargets!==Ne||De.morphNormals!==Qe||De.morphColors!==lt||De.toneMapping!==St||De.morphTargetsCount!==dt)&&(nt=!0):(nt=!0,De.__version=W.version);let Rn=De.currentProgram;nt===!0&&(Rn=xl(W,U,F));let Mr=!1,In=!1,ka=!1,_t=Rn.getUniforms(),Hn=De.uniforms;if(we.useProgram(Rn.program)&&(Mr=!0,In=!0,ka=!0),W.id!==w&&(w=W.id,In=!0),Mr||_!==x){we.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),_t.setValue(I,"projectionMatrix",x.projectionMatrix),_t.setValue(I,"viewMatrix",x.matrixWorldInverse);let bn=_t.map.cameraPosition;bn!==void 0&&bn.setValue(I,ne.setFromMatrixPosition(x.matrixWorld)),Fe.logarithmicDepthBuffer&&_t.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&_t.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),_!==x&&(_=x,In=!0,ka=!0)}if(F.isSkinnedMesh){_t.setOptional(I,F,"bindMatrix"),_t.setOptional(I,F,"bindMatrixInverse");let sn=F.skeleton;sn&&(sn.boneTexture===null&&sn.computeBoneTexture(),_t.setValue(I,"boneTexture",sn.boneTexture,Xe))}F.isBatchedMesh&&(_t.setOptional(I,F,"batchingTexture"),_t.setValue(I,"batchingTexture",F._matricesTexture,Xe),_t.setOptional(I,F,"batchingIdTexture"),_t.setValue(I,"batchingIdTexture",F._indirectTexture,Xe),_t.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&_t.setValue(I,"batchingColorTexture",F._colorsTexture,Xe));let zn=z.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&ae.update(F,z,Rn),(In||De.receiveShadow!==F.receiveShadow)&&(De.receiveShadow=F.receiveShadow,_t.setValue(I,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Hn.envMap.value=ve,Hn.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(Hn.envMapIntensity.value=U.environmentIntensity),In&&(_t.setValue(I,"toneMappingExposure",S.toneMappingExposure),De.needsLights&&Mx(Hn,ka),re&&W.fog===!0&&ie.refreshFogUniforms(Hn,re),ie.refreshMaterialUniforms(Hn,W,C,D,f.state.transmissionRenderTarget[x.id]),ua.upload(I,bm(De),Hn,Xe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ua.upload(I,bm(De),Hn,Xe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&_t.setValue(I,"center",F.center),_t.setValue(I,"modelViewMatrix",F.modelViewMatrix),_t.setValue(I,"normalMatrix",F.normalMatrix),_t.setValue(I,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let sn=W.uniformsGroups;for(let bn=0,_d=sn.length;bn<_d;bn++){let Ds=sn[bn];qe.update(Ds,Rn),qe.bind(Ds,Rn)}}return Rn}function Mx(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function Tx(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(x,U,z){let W=Ee.get(x);W.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Ee.get(x.texture).__webglTexture=U,Ee.get(x.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,U){let z=Ee.get(x);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0};let Ax=I.createFramebuffer();this.setRenderTarget=function(x,U=0,z=0){k=x,R=U,L=z;let W=!0,F=null,re=!1,fe=!1;if(x){let ve=Ee.get(x);if(ve.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(ve.__webglFramebuffer===void 0)Xe.setupRenderTarget(x);else if(ve.__hasExternalTextures)Xe.rebindTextures(x,Ee.get(x.texture).__webglTexture,Ee.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let Ne=x.depthTexture;if(ve.__boundDepthTexture!==Ne){if(Ne!==null&&Ee.has(Ne)&&(x.width!==Ne.image.width||x.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(x)}}let ke=x.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(fe=!0);let Be=Ee.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Be[U])?F=Be[U][z]:F=Be[U],re=!0):x.samples>0&&Xe.useMultisampledRTT(x)===!1?F=Ee.get(x).__webglMultisampledFramebuffer:Array.isArray(Be)?F=Be[z]:F=Be,P.copy(x.viewport),B.copy(x.scissor),G=x.scissorTest}else P.copy(Q).multiplyScalar(C).floor(),B.copy(de).multiplyScalar(C).floor(),G=pe;if(z!==0&&(F=Ax),we.bindFramebuffer(I.FRAMEBUFFER,F)&&W&&we.drawBuffers(x,F),we.viewport(P),we.scissor(B),we.setScissorTest(G),re){let ve=Ee.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,ve.__webglTexture,z)}else if(fe){let ve=U;for(let ke=0;ke<x.textures.length;ke++){let Be=Ee.get(x.textures[ke]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+ke,Be.__webglTexture,z,ve)}}else if(x!==null&&z!==0){let ve=Ee.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ve.__webglTexture,z)}w=-1},this.readRenderTargetPixels=function(x,U,z,W,F,re,fe,_e=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Ee.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve){we.bindFramebuffer(I.FRAMEBUFFER,ve);try{let ke=x.textures[_e],Be=ke.format,Ne=ke.type;if(!Fe.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Fe.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-W&&z>=0&&z<=x.height-F&&(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_e),I.readPixels(U,z,W,F,Re.convert(Be),Re.convert(Ne),re))}finally{let ke=k!==null?Ee.get(k).__webglFramebuffer:null;we.bindFramebuffer(I.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(x,U,z,W,F,re,fe,_e=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Ee.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve)if(U>=0&&U<=x.width-W&&z>=0&&z<=x.height-F){we.bindFramebuffer(I.FRAMEBUFFER,ve);let ke=x.textures[_e],Be=ke.format,Ne=ke.type;if(!Fe.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Fe.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Qe),I.bufferData(I.PIXEL_PACK_BUFFER,re.byteLength,I.STREAM_READ),x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_e),I.readPixels(U,z,W,F,Re.convert(Be),Re.convert(Ne),0);let lt=k!==null?Ee.get(k).__webglFramebuffer:null;we.bindFramebuffer(I.FRAMEBUFFER,lt);let St=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Kg(I,St,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Qe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,re),I.deleteBuffer(Qe),I.deleteSync(St),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,U=null,z=0){let W=Math.pow(2,-z),F=Math.floor(x.image.width*W),re=Math.floor(x.image.height*W),fe=U!==null?U.x:0,_e=U!==null?U.y:0;Xe.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,fe,_e,F,re),we.unbindTexture()};let Cx=I.createFramebuffer(),Rx=I.createFramebuffer();this.copyTextureToTexture=function(x,U,z=null,W=null,F=0,re=null){re===null&&(F!==0?(Gr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=F,F=0):re=0);let fe,_e,ve,ke,Be,Ne,Qe,lt,St,gt=x.isCompressedTexture?x.mipmaps[re]:x.image;if(z!==null)fe=z.max.x-z.min.x,_e=z.max.y-z.min.y,ve=z.isBox3?z.max.z-z.min.z:1,ke=z.min.x,Be=z.min.y,Ne=z.isBox3?z.min.z:0;else{let zn=Math.pow(2,-F);fe=Math.floor(gt.width*zn),_e=Math.floor(gt.height*zn),x.isDataArrayTexture?ve=gt.depth:x.isData3DTexture?ve=Math.floor(gt.depth*zn):ve=1,ke=0,Be=0,Ne=0}W!==null?(Qe=W.x,lt=W.y,St=W.z):(Qe=0,lt=0,St=0);let dt=Re.convert(U.format),De=Re.convert(U.type),xt;U.isData3DTexture?(Xe.setTexture3D(U,0),xt=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Xe.setTexture2DArray(U,0),xt=I.TEXTURE_2D_ARRAY):(Xe.setTexture2D(U,0),xt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);let nt=I.getParameter(I.UNPACK_ROW_LENGTH),Rn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Mr=I.getParameter(I.UNPACK_SKIP_PIXELS),In=I.getParameter(I.UNPACK_SKIP_ROWS),ka=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,gt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,gt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ke),I.pixelStorei(I.UNPACK_SKIP_ROWS,Be),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ne);let _t=x.isDataArrayTexture||x.isData3DTexture,Hn=U.isDataArrayTexture||U.isData3DTexture;if(x.isDepthTexture){let zn=Ee.get(x),sn=Ee.get(U),bn=Ee.get(zn.__renderTarget),_d=Ee.get(sn.__renderTarget);we.bindFramebuffer(I.READ_FRAMEBUFFER,bn.__webglFramebuffer),we.bindFramebuffer(I.DRAW_FRAMEBUFFER,_d.__webglFramebuffer);for(let Ds=0;Ds<ve;Ds++)_t&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ee.get(x).__webglTexture,F,Ne+Ds),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ee.get(U).__webglTexture,re,St+Ds)),I.blitFramebuffer(ke,Be,fe,_e,Qe,lt,fe,_e,I.DEPTH_BUFFER_BIT,I.NEAREST);we.bindFramebuffer(I.READ_FRAMEBUFFER,null),we.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||x.isRenderTargetTexture||Ee.has(x)){let zn=Ee.get(x),sn=Ee.get(U);we.bindFramebuffer(I.READ_FRAMEBUFFER,Cx),we.bindFramebuffer(I.DRAW_FRAMEBUFFER,Rx);for(let bn=0;bn<ve;bn++)_t?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,zn.__webglTexture,F,Ne+bn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,zn.__webglTexture,F),Hn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,sn.__webglTexture,re,St+bn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,sn.__webglTexture,re),F!==0?I.blitFramebuffer(ke,Be,fe,_e,Qe,lt,fe,_e,I.COLOR_BUFFER_BIT,I.NEAREST):Hn?I.copyTexSubImage3D(xt,re,Qe,lt,St+bn,ke,Be,fe,_e):I.copyTexSubImage2D(xt,re,Qe,lt,ke,Be,fe,_e);we.bindFramebuffer(I.READ_FRAMEBUFFER,null),we.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Hn?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(xt,re,Qe,lt,St,fe,_e,ve,dt,De,gt.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(xt,re,Qe,lt,St,fe,_e,ve,dt,gt.data):I.texSubImage3D(xt,re,Qe,lt,St,fe,_e,ve,dt,De,gt):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,re,Qe,lt,fe,_e,dt,De,gt.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,re,Qe,lt,gt.width,gt.height,dt,gt.data):I.texSubImage2D(I.TEXTURE_2D,re,Qe,lt,fe,_e,dt,De,gt);I.pixelStorei(I.UNPACK_ROW_LENGTH,nt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Rn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Mr),I.pixelStorei(I.UNPACK_SKIP_ROWS,In),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ka),re===0&&U.generateMipmaps&&I.generateMipmap(xt),we.unbindTexture()},this.initRenderTarget=function(x){Ee.get(x).__webglFramebuffer===void 0&&Xe.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Xe.setTextureCube(x,0):x.isData3DTexture?Xe.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Xe.setTexture2DArray(x,0):Xe.setTexture2D(x,0),we.unbindTexture()},this.resetState=function(){R=0,L=0,k=null,we.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}};function zh(n,e){if(e===bh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===oa||e===Io){let t=n.getIndex();if(t===null){let a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,s=[];if(e===oa)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}var hu=class extends _i{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Kh(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new ap(t)}),this.register(function(t){return new op(t)}),this.register(function(t){return new lp(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new ep(t)}),this.register(function(t){return new tp(t)}),this.register(function(t){return new np(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new ip(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new rp(t)}),this.register(function(t){return new sp(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new cp(t)}),this.register(function(t){return new up(t)})}load(e,t,i,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=qi.extractUrlBase(e);a=qi.resolveURL(c,this.path)}else a=qi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new ea(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Nv){try{a[Je.KHR_BINARY_GLTF]=new dp(e)}catch(d){s&&s(d);return}r=JSON.parse(a[Je.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new yp(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case Je.KHR_MATERIALS_UNLIT:a[d]=new Xh;break;case Je.KHR_DRACO_MESH_COMPRESSION:a[d]=new hp(r,this.dracoLoader);break;case Je.KHR_TEXTURE_TRANSFORM:a[d]=new pp;break;case Je.KHR_MESH_QUANTIZATION:a[d]=new fp;break;default:h.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){let i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}};function cM(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}var Je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},jh=class{constructor(e){this.parser=e,this.name=Je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,s=t.cache.get(i);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new Oe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],jt);let d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new gs(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Qs(u),c.distance=d;break;case"spot":c=new xo(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Ei(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}},Xh=class{constructor(){this.name=Je.KHR_MATERIALS_UNLIT}getMaterialType(){return ln}extendParams(e,t,i){let s=[];e.color=new Oe(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],jt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,Mt))}return Promise.all(s)}},Yh=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Kh=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(o,o)}return Promise.all(r)}},Jh=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_DISPERSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Zh=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},Qh=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Oe(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],jt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Mt)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},ep=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},tp=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Oe().setRGB(o[0],o[1],o[2],jt),Promise.all(r)}},np=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},ip=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Oe().setRGB(o[0],o[1],o[2],jt),a.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,Mt)),Promise.all(r)}},sp=class{constructor(e){this.parser=e,this.name=Je.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},rp=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:_n}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},ap=class{constructor(e){this.parser=e,this.name=Je.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},op=class{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},lp=class{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},cp=class{constructor(e){this.name=Je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,d=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,h,s.mode,s.filter).then(function(m){return m.buffer}):a.ready.then(function(){let m=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(m),u,d,h,s.mode,s.filter),m})})}else return null}},up=class{constructor(e){this.name=Je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let s=t.meshes[i.mesh];for(let c of s.primitives)if(c.mode!==Xn.TRIANGLES&&c.mode!==Xn.TRIANGLE_STRIP&&c.mode!==Xn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,m=[];for(let v of d){let y=new ze,g=new N,f=new zt,M=new N(1,1,1),E=new Xs(v.geometry,v.material,h);for(let S=0;S<h;S++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,S),l.SCALE&&M.fromBufferAttribute(l.SCALE,S),E.setMatrixAt(S,y.compose(g,f,M));for(let S in l)if(S==="_COLOR_0"){let A=l[S];E.instanceColor=new ms(A.array,A.itemSize,A.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&v.geometry.setAttribute(S,l[S]);ft.prototype.copy.call(E,v),this.parser.assignFinalMaterial(E),m.push(E)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}},Nv="glTF",No=12,Rv={JSON:1313821514,BIN:5130562},dp=class{constructor(e){this.name=Je.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,No),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Nv)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-No,r=new DataView(e,No),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Rv.JSON){let c=new Uint8Array(e,No+a,o);this.content=i.decode(c)}else if(l===Rv.BIN){let c=No+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},hp=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let d=gp[u]||u.toLowerCase();o[d]=a[u]}for(let u in e.attributes){let d=gp[u]||u.toLowerCase();if(a[u]!==void 0){let h=i.accessors[e.attributes[u]],m=pa[h.componentType];c[d]=m.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){s.decodeDracoFile(u,function(m){for(let v in m.attributes){let y=m.attributes[v],g=l[v];g!==void 0&&(y.normalized=g)}d(m)},o,c,jt,h)})})}},pp=class{constructor(){this.name=Je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},fp=class{constructor(){this.name=Je.KHR_MESH_QUANTIZATION}},pu=class extends zi{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,d=(i-t)/u,h=d*d,m=h*d,v=e*c,y=v-c,g=-2*m+3*h,f=m-h,M=1-g,E=f-h+d;for(let S=0;S!==o;S++){let A=a[y+S+o],R=a[y+S+l]*u,L=a[v+S+o],k=a[v+S]*u;r[S]=M*A+E*R+g*L+f*k}return r}},uM=new zt,mp=class extends pu{interpolate_(e,t,i,s){let r=super.interpolate_(e,t,i,s);return uM.fromArray(r).normalize().toArray(r),r}},Xn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},pa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Iv={9728:qt,9729:an,9984:wc,9985:na,9986:ir,9987:li},Pv={33071:pi,33648:Vr,10497:ps},Gh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},gp={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dM={CUBICSPLINE:void 0,LINEAR:Ws,STEP:Gs},Wh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function hM(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new vi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ri})),n.DefaultMaterial}function cr(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Ei(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function pM(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let d=e[c];if(i){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;a.push(h)}if(s){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;o.push(h)}if(r){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],d=c[1],h=c[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=d),r&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function fM(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function mM(n){let e,t=n.extensions&&n.extensions[Je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qh(t.attributes):e=n.indices+":"+qh(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+qh(n.targets[i]);return e}function qh(n){let e="",t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function vp(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function gM(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var vM=new ze,yp=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new cM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new vo(this.options.manager):this.textureLoader=new _o(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ea(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return cr(r,o,s),Ei(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let s=i.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())r(u,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let s=e(t[i]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Je.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){i.load(qi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){let t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Gh[s.type],o=pa[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Pt(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Gh[s.type],c=pa[s.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=s.byteOffset||0,m=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,v=s.normalized===!0,y,g;if(m&&m!==d){let f=Math.floor(h/m),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count,E=t.cache.get(M);E||(y=new c(o,f*m,s.count*m/u),E=new Xr(y,m/u),t.cache.add(M,E)),g=new Yr(E,l,h%m/u,v)}else o===null?y=new c(s.count*l):y=new c(o,h,s.count*l),g=new Pt(y,l,v);if(s.sparse!==void 0){let f=Gh.SCALAR,M=pa[s.sparse.indices.componentType],E=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,A=new M(a[1],E,s.sparse.count*f),R=new c(a[2],S,s.sparse.count*l);o!==null&&(g=new Pt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let L=0,k=A.length;L<k;L++){let w=A[L];if(g.setX(w,R[L*l]),l>=2&&g.setY(w,R[L*l+1]),l>=3&&g.setZ(w,R[L*l+2]),l>=4&&g.setW(w,R[L*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=v}return g})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let h=(r.samplers||{})[a.sampler]||{};return u.magFilter=Iv[h.magFilter]||an,u.minFilter=Iv[h.minFilter]||li,u.wrapS=Pv[h.wrapS]||ps,u.wrapT=Pv[h.wrapT]||ps,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==qt&&u.minFilter!==an,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(d){c=!0;let h=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(d){return new Promise(function(h,m){let v=h;t.isImageBitmapLoader===!0&&(v=function(y){let g=new Ot(y);g.needsUpdate=!0,h(g)}),t.load(qi.resolveURL(d,r.path),v,void 0,m)})}).then(function(d){return c===!0&&o.revokeObjectURL(l),Ei(d,a),d.userData.mimeType=a.mimeType||gM(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,i,s){let r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[Je.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[Je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[Je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new Qr,on.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new Zr,on.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return vi}loadMaterial(e){let t=this,i=this.json,s=this.extensions,r=i.materials[e],a,o={},l=r.extensions||{},c=[];if(l[Je.KHR_MATERIALS_UNLIT]){let d=s[Je.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),c.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new Oe(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],jt),o.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,Mt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=wn);let u=r.alphaMode||Wh.OPAQUE;if(u===Wh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Wh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ln&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Pe(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==ln&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ln){let d=r.emissiveFactor;o.emissive=new Oe().setRGB(d[0],d[1],d[2],jt)}return r.emissiveTexture!==void 0&&a!==ln&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Mt)),Promise.all(c).then(function(){let d=new a(o);return r.name&&(d.name=r.name),Ei(d,r),t.associations.set(d,{materials:e}),r.extensions&&cr(s,d,r),d})}createUniqueName(e){let t=ct.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[Je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Lv(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=mM(c),d=s[u];if(d)a.push(d.promise);else{let h;c.extensions&&c.extensions[Je.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=Lv(new cn,c,t),s[u]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?hM(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let m=0,v=u.length;m<v;m++){let y=u[m],g=a[m],f,M=c[m];if(g.mode===Xn.TRIANGLES||g.mode===Xn.TRIANGLE_STRIP||g.mode===Xn.TRIANGLE_FAN||g.mode===void 0)f=r.isSkinnedMesh===!0?new no(y,M):new ot(y,M),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),g.mode===Xn.TRIANGLE_STRIP?f.geometry=zh(f.geometry,Io):g.mode===Xn.TRIANGLE_FAN&&(f.geometry=zh(f.geometry,oa));else if(g.mode===Xn.LINES)f=new ro(y,M);else if(g.mode===Xn.LINE_STRIP)f=new Ys(y,M);else if(g.mode===Xn.LINE_LOOP)f=new ao(y,M);else if(g.mode===Xn.POINTS)f=new oo(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(f.geometry.morphAttributes).length>0&&fM(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Ei(f,r),g.extensions&&cr(s,f,g),t.assignFinalMaterial(f),d.push(f)}for(let m=0,v=d.length;m<v;m++)t.associations.set(d[m],{meshes:e,primitives:m});if(d.length===1)return r.extensions&&cr(s,d[0],r),d[0];let h=new ii;r.extensions&&cr(s,h,r),t.associations.set(h,{meshes:e});for(let m=0,v=d.length;m<v;m++)h.add(d[m]);return h})}loadCamera(e){let t,i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new It(Po.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new er(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ei(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let d=a[c];if(d){o.push(d);let h=new ze;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new so(o,l)})}loadAnimation(e){let t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let d=0,h=s.channels.length;d<h;d++){let m=s.channels[d],v=s.samplers[m.sampler],y=m.target,g=y.node,f=s.parameters!==void 0?s.parameters[v.input]:v.input,M=s.parameters!==void 0?s.parameters[v.output]:v.output;y.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",M)),c.push(v),u.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){let h=d[0],m=d[1],v=d[2],y=d[3],g=d[4],f=[];for(let E=0,S=h.length;E<S;E++){let A=h[E],R=m[E],L=v[E],k=y[E],w=g[E];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();let _=i._createAnimationTracks(A,R,L,k,w);if(_)for(let P=0;P<_.length;P++)f.push(_[P])}let M=new Js(r,void 0,f);return Ei(M,s),M})}createNodeMesh(e){let t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){let a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)a.push(i.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(h,vM)});for(let m=0,v=d.length;m<v;m++)u.add(d[m]);return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(r.isBone===!0?u=new Kr:c.length>1?u=new ii:c.length===1?u=c[0]:u=new ft,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=a),Ei(u,r),r.extensions&&cr(i,u,r),r.matrix!==void 0){let d=new ze;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],s=this,r=new ii;i.name&&(r.name=s.createUniqueName(i.name)),Ei(r,i),i.extensions&&cr(t,r,i);let a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,d=l.length;u<d;u++)r.add(l[u]);let c=u=>{let d=new Map;for(let[h,m]of s.associations)(h instanceof on||h instanceof Ot)&&d.set(h,m);return u.traverse(h=>{let m=s.associations.get(h);m!=null&&d.set(h,m)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];xs[r.path]===xs.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(xs[r.path]){case xs.weights:c=yi;break;case xs.rotation:c=bi;break;case xs.translation:case xs.scale:c=xi;break;default:switch(i.itemSize){case 1:c=yi;break;case 2:case 3:default:c=xi;break}break}let u=s.interpolation!==void 0?dM[s.interpolation]:Ws,d=this._getArrayFromAccessor(i);for(let h=0,m=l.length;h<m;h++){let v=new c(l[h]+"."+xs[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=vp(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let s=this instanceof bi?mp:pu;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function yM(n,e,t){let i=e.attributes,s=new Nn;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new N(l[0],l[1],l[2]),new N(c[0],c[1],c[2])),o.normalized){let u=vp(pa[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new N,l=new N;for(let c=0,u=r.length;c<u;c++){let d=r[c];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],m=h.min,v=h.max;if(m!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(v[2]))),h.normalized){let y=vp(pa[h.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;let a=new xn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function Lv(n,e,t){let i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(let a in i){let o=gp[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){let a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return et.workingColorSpace!==jt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),Ei(n,e),yM(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?pM(n,e.targets,t):n})}var Dv={type:"change"},xp={type:"start"},kv={type:"end"},fu=new gi,Ov=new Wn,bM=Math.cos(70*Po.DEG2RAD),Ft=new N,En=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bp=1e-6,mu=class extends Eo{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vs.ROTATE,MIDDLE:vs.DOLLY,RIGHT:vs.PAN},this.touches={ONE:ys.ROTATE,TWO:ys.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new zt,this._lastTargetPosition=new N,this._quat=new zt().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ta,this._sphericalDelta=new ta,this._scale=1,this._panOffset=new N,this._rotateStart=new Pe,this._rotateEnd=new Pe,this._rotateDelta=new Pe,this._panStart=new Pe,this._panEnd=new Pe,this._panDelta=new Pe,this._dollyStart=new Pe,this._dollyEnd=new Pe,this._dollyDelta=new Pe,this._dollyDirection=new N,this._mouse=new Pe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=_M.bind(this),this._onPointerDown=xM.bind(this),this._onPointerUp=SM.bind(this),this._onContextMenu=RM.bind(this),this._onMouseWheel=MM.bind(this),this._onKeyDown=TM.bind(this),this._onTouchStart=AM.bind(this),this._onTouchMove=CM.bind(this),this._onMouseDown=wM.bind(this),this._onMouseMove=EM.bind(this),this._interceptControlDown=IM.bind(this),this._interceptControlUp=PM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Dv),this.update(),this.state=ut.NONE}update(e=null){let t=this.object.position;Ft.copy(t).sub(this.target),Ft.applyQuaternion(this._quat),this._spherical.setFromVector3(Ft),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=En:i>Math.PI&&(i-=En),s<-Math.PI?s+=En:s>Math.PI&&(s-=En),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ft.setFromSpherical(this._spherical),Ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ft.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(fu.origin.copy(this.object.position),fu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(fu.direction))<bM?this.object.lookAt(this.target):(Ov.setFromNormalAndCoplanarPoint(this.object.up,this.target),fu.intersectPlane(Ov,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>bp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bp||this._lastTargetPosition.distanceToSquared(this.target)>bp?(this.dispatchEvent(Dv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?En/60*this.autoRotateSpeed*e:En/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ft.setFromMatrixColumn(t,0),Ft.multiplyScalar(-e),this._panOffset.add(Ft)}_panUp(e,t){this.screenSpacePanning===!0?Ft.setFromMatrixColumn(t,1):(Ft.setFromMatrixColumn(t,0),Ft.crossVectors(this.object.up,Ft)),Ft.multiplyScalar(e),this._panOffset.add(Ft)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ft.copy(s).sub(this.target);let r=Ft.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(En*this._rotateDelta.x/t.clientHeight),this._rotateUp(En*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(En*this._rotateDelta.x/t.clientHeight),this._rotateUp(En*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Pe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function xM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function _M(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function SM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(kv),this.state=ut.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function wM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case vs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ut.DOLLY;break;case vs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}break;case vs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(xp)}function EM(n){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function MM(n){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(n.preventDefault(),this.dispatchEvent(xp),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(kv))}function TM(n){this.enabled!==!1&&this._handleKeyDown(n)}function AM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ys.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ut.TOUCH_ROTATE;break;case ys.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case ys.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ut.TOUCH_DOLLY_PAN;break;case ys.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(xp)}function CM(n){switch(this._trackPointer(n),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ut.NONE}}function RM(n){this.enabled!==!1&&n.preventDefault()}function IM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function PM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var gu=class extends js{constructor(){super();let e=new fs;e.deleteAttribute("uv");let t=new vi({side:Xt}),i=new vi,s=new Qs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ot(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Xs(e,i,6),o=new ft;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new ot(e,fa(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new ot(e,fa(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new ot(e,fa(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new ot(e,fa(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new ot(e,fa(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let m=new ot(e,fa(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function fa(n){return new fo({color:0,emissive:16777215,emissiveIntensity:n})}async function Uv({selectLevel:n,notify:e,reducedMotion:t}){let i=document.querySelector("#worldCanvas"),s=document.querySelector("#worldWrap"),r=document.querySelector("#worldLoading"),a;try{a=new uu({canvas:i,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return r.hidden=!0,i.hidden=!0,document.body.classList.add("flat-view"),document.querySelector("#worldHint").textContent="Illustrated view. All levels work below.",{focus(){},update(){},pause(){},overview(){},flat(){},dispose(){}}}a.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<800?1.4:1.7)),a.outputColorSpace=Mt,a.toneMapping=xc,a.toneMappingExposure=.95;let o=new js,l=new da(a),c=new gu,u=l.fromScene(c,.04);o.environment=u.texture,c.dispose(),l.dispose();let d=new It(37,1,.1,150),h=new N(1.7,.4,1.8),m=new N(13,18,21);d.position.copy(h).add(m);let v=new mu(d,i);v.target.copy(h),v.enableDamping=!t,v.dampingFactor=.065,v.minDistance=10,v.maxDistance=62,v.minPolarAngle=.35,v.maxPolarAngle=1.18,v.enablePan=!1,v.rotateSpeed=.45,v.zoomSpeed=.7,o.add(new yo(14020324,2507844,1.5));let y=new gs(16768432,2.5);y.position.set(4,12,-8),o.add(y);let g=new gs(10216389,1.3);g.position.set(-8,8,5),o.add(g);let f=document.createElement("canvas");f.width=f.height=64;let M=f.getContext("2d"),E=M.createRadialGradient(32,32,3,32,32,32);E.addColorStop(0,"rgba(0,0,0,0.65)"),E.addColorStop(1,"rgba(0,0,0,0)"),M.fillStyle=E,M.fillRect(0,0,64,64);let S=new lo(f);for(let $ of Ct){let ne=new ot(new Ks(6,6),new ln({map:S,transparent:!0,depthWrite:!1}));ne.rotation.x=-Math.PI/2,ne.position.set($.position[0],-1.2,$.position[2]),o.add(ne)}let A=new ot(new po(2.05,2.1,80),new ln({color:10804932,side:wn,transparent:!0,opacity:.8}));A.rotation.x=-Math.PI/2,A.position.set(...Ct[0].position),A.position.y+=.1,o.add(A);let R=Ct.map(($,ne)=>{let me=document.createElement("span");return me.className="world-marker",me.textContent=String(ne+1).padStart(2,"0"),document.querySelector("#worldMarkers").append(me),me}),L=Ct.map(($,ne)=>{let me=new ot(new ho(1.95,1.95,3.7,16),new ln({visible:!1}));return me.position.set(...$.position),me.position.y+=1.5,me.userData.level=ne,o.add(me),me}),k,w,_,P=0,B=t,G=!1,q,j=!1,Y=0,D=0,C=!0,X=!1,te=new N,Q=new wo,de=new Pe,pe=()=>{let{width:$,height:ne}=s.getBoundingClientRect();!$||!ne||(a.setSize($,ne,!1),d.aspect=$/ne,d.updateProjectionMatrix(),C=!0)},We=new ResizeObserver(pe);We.observe(s),pe(),v.addEventListener("start",()=>{_=null}),v.addEventListener("change",()=>{C=!0}),i.addEventListener("pointerdown",$=>{q=[$.clientX,$.clientY],j=!1}),i.addEventListener("pointermove",$=>{q&&Math.hypot($.clientX-q[0],$.clientY-q[1])>6&&(j=!0);let ne=i.getBoundingClientRect();de.set(($.clientX-ne.left)/ne.width*2-1,-($.clientY-ne.top)/ne.height*2+1),Q.setFromCamera(de,d),i.style.cursor=Q.intersectObjects(L)[0]?"pointer":"grab"}),i.addEventListener("pointerup",$=>{if(!q||j){q=null;return}let ne=i.getBoundingClientRect();de.set(($.clientX-ne.left)/ne.width*2-1,-($.clientY-ne.top)/ne.height*2+1),Q.setFromCamera(de,d);let me=Q.intersectObjects(L)[0];me&&n(me.object.userData.level),q=null}),i.addEventListener("keydown",$=>{let ne=d.position.clone().sub(v.target);if(["ArrowLeft","ArrowRight"].includes($.key))ne.applyAxisAngle(new N(0,1,0),$.key==="ArrowLeft"?-.13:.13);else if(["+","=","ArrowUp"].includes($.key))ne.multiplyScalar(.9);else if(["-","ArrowDown"].includes($.key))ne.multiplyScalar(1.1);else return;$.preventDefault(),_=null,ne.clampLength(10,62),d.position.copy(v.target).add(ne),v.update()}),i.addEventListener("webglcontextlost",$=>{$.preventDefault(),s.classList.remove("world-ready"),r.hidden=!0,G=!0,a.setAnimationLoop(null),e("The 3D view paused. Your checkpoint forms and progress are still available.")});function tt($,ne){if(C=!0,B){v.target.copy($),d.position.copy($).add(ne),v.update();return}_={from:v.target.clone(),to:$,fromCamera:d.position.clone(),toCamera:$.clone().add(ne),start:performance.now()}}function Z($){if(X||B&&!C&&!_||$-D<1e3/(B?15:30))return;D=$;let ne=Math.min(($-Y)/1e3||0,.05);if(Y=$,!(document.hidden||G)){if(!B&&w&&w.update(ne),_){let me=Math.min(($-_.start)/1150,1),ye=me*me*(3-2*me);v.target.lerpVectors(_.from,_.to,ye),d.position.lerpVectors(_.fromCamera,_.toCamera,ye),me===1&&(_=null)}B||(A.material.opacity=.7+Math.sin($/750)*.18),v.update(),Ct.forEach((me,ye)=>{te.set(...me.position).add(new N(0,.2,1.6)).project(d),R[ye].style.left=`${(te.x/2+.5)*i.clientWidth}px`,R[ye].style.top=`${(-te.y/2+.5)*i.clientHeight}px`,R[ye].hidden=te.z>1}),a.render(o,d),C=!1}}a.setAnimationLoop(Z);try{let $=await new hu().loadAsync("/journey/assets/apex-world.glb");k=$.scene,C=!0,o.add(k),w=new So(k),$.animations.forEach(ne=>w.clipAction(ne).play()),s.classList.add("world-ready"),s.dataset.meshes=String($.scene.getObjectsByProperty("isMesh",!0).length),r.hidden=!0}catch{r.hidden=!0,i.hidden=!0,R.forEach($=>$.hidden=!0),G=!0,e("Using the illustrated map while the 3D asset is unavailable. All levels still work.")}return{focus($,ne=!1){P=$,A.position.set(...Ct[$].position).y+=.12,R.forEach((ye,Ze)=>{ye.dataset.active=String(Ze===$)});let me=new N(...Ct[$].position);tt(ne?me.add(new N(1,1,0)):h.clone(),ne?m.clone().multiplyScalar(.53):m.clone())},update($){C=!0,R.forEach((ne,me)=>{ne.dataset.locked=String($?.[me]?.status==="locked"),ne.dataset.active=String(me===P)})},pause($){B=$,C=!0,v.enableDamping=!$,_&&(v.target.copy(_.to),d.position.copy(_.toCamera),_=null)},overview(){tt(h.clone(),m.clone())},flat($){G=$,C=!0,s.classList.toggle("world-ready",!$&&!!k),i.hidden=$},dispose(){X=!0,We.disconnect(),v.dispose(),a.setAnimationLoop(null),o.traverse($=>{if($.geometry?.dispose(),$.material)for(let ne of[$.material].flat())ne.dispose()}),u.dispose(),a.dispose()}}}var Fv=`<div id="workspacePanels"><section id="authPanel" class="authPanel studio-surface" aria-label="Apex Analytic account" hidden="" data-surface="account">
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
`;var un=n=>structuredClone({dealCard:n.dealCard||{},financialProfile:n.financialProfile||{},evidence:n.evidence||{},dcfContext:n.dcfContext||{}});function Bv({request:n,onState:e,onSaved:t,delay:i=650}){let s=new Map,r=0;function a(l,c,u){let d=s.get(l);return d||(d={revision:c,saved:JSON.stringify(un(u)),pending:null,running:null,timer:null,error:null},s.set(l,d)),d}async function o(l){let c=s.get(l),u=r;if(!c)return;if(clearTimeout(c.timer),c.running)return await c.running,u===r&&c.pending?o(l):void 0;if(c.error?.status===409)throw c.error;if(!c.pending)return;let d=c.pending;if(c.pending=null,e(l,"saving"),c.running=(async()=>{try{let h=await n(`/api/assistant/cases/${l}/context`,{contextRevision:c.revision,context:d});if(u!==r||s.get(l)!==c)return;c.revision=h.case.working?.revision||0,c.saved=JSON.stringify(un(d)),c.error=null,t(l,h.case),e(l,c.pending?"pending":"saved")}catch(h){if(u!==r||s.get(l)!==c)return;throw c.pending||=d,c.error=h,e(l,h.status===409?"conflict":"unsaved",h),h}finally{c.running=null}})(),await c.running,u===r&&c.pending)return o(l)}return{register:a,hasPending(l){let c=s.get(l);return!!(c?.pending||c?.running||c?.error)},pending(l){return s.get(l)?.pending?structuredClone(s.get(l).pending):null},hold(l,c,u){let d=a(l,c,{});d.pending=un(u),d.error=Object.assign(new Error("Earlier tool edits have no sync history. Review both versions before choosing which to keep."),{status:409}),e(l,"conflict",d.error)},queue(l,c,u){let d=a(l,c,u),h=un(u);!d.running&&!d.pending&&d.saved===JSON.stringify(h)||(d.pending=h,clearTimeout(d.timer),e(l,d.error?.status===409?"conflict":"pending"),d.error?.status!==409&&(d.timer=setTimeout(()=>{o(l).catch(()=>{})},i)))},flush:o,accept(l){let c=s.get(l.id);if(c?.running)throw new Error("Wait for the current save to finish before replacing the local copy.");clearTimeout(c?.timer),s.delete(l.id),a(l.id,l.working?.revision||0,l.toolContext||l.working||{}),e(l.id,"saved")},async keepLocal(l){let c=this.pending(l.id);if(!c)throw new Error("No unsaved tool inputs to apply.");this.accept(l),this.queue(l.id,l.working?.revision||0,c),await o(l.id)},forget(l){clearTimeout(s.get(l)?.timer),s.delete(l)},reset(){r++;for(let l of s.values())clearTimeout(l.timer);s.clear()}}}var Te=n=>document.querySelector(n),Le=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),_p=n=>new Intl.NumberFormat("en-MY",{style:"currency",currency:"MYR",maximumFractionDigits:0}).format(n),vu={rental_income:"Rental income",appreciation:"Capital appreciation",own_stay:"My own home",balanced:"A balance",discovery:"Discovery",site_visit:"Site visit",transaction:"Transaction",handover:"Handover",rental:"Rental",review:"Holding review"},_s=()=>new Date().toISOString().slice(0,10);function $v({openTool:n,useProperty:e,notify:t,onContextSaved:i,onContextState:s,onInvestigationDeleted:r}){let a=Te("#investmentAssistant"),o=null,l=null,c=!1,u=0,d,h=[],m=!1,v=new Set,y=new Map,g=Bv({request:f,onSaved(D,C){i?.(D,C),o?.id===D&&(o=C)},onState(D,C,X){y.set(D,{value:C,error:X?.message||""}),s?.(D,C,X),o?.id===D&&k()}});a.innerHTML=`<header class="assistant-intro"><div class="assistant-orb" aria-hidden="true"><span>A</span></div><p class="eyebrow">YOUR PROPERTY THINKING PARTNER</p><h1>A clearer way forward.</h1><p>Tell me what you want property investment to do for you.</p></header>
    <div class="assistant-casebar"><label><span class="sr-only">Your investigations</span><select id="investmentCaseSelect" aria-label="Your investigations"><option>No saved investigation</option></select></label><button id="investmentNew" type="button">New investigation</button><button id="investmentExport" type="button" hidden>Export</button><details class="assistant-more"><summary>More</summary><button id="investmentDelete" type="button">Delete this investigation</button><button id="investmentAccount" type="button">Account &amp; private memory</button></details></div>
    <p id="investmentStorage" class="assistant-storage"></p><button id="investmentAdopt" class="secondary-button" hidden>Import my guest investigations</button>
    <div id="investmentMessages" class="assistant-messages" role="log" aria-label="Investment conversation"></div>
    <section id="investmentBrief" class="assistant-brief" aria-label="Search brief" hidden></section>
    <section id="investmentRun" class="assistant-run" aria-label="Search progress" hidden></section>
    <section id="investmentResults" class="assistant-results" aria-label="Property shortlist" hidden></section>
    <section id="investmentProperty" class="assistant-property" aria-label="Your continuing property investigation" hidden></section>
    <section id="investmentFinance" class="assistant-finance" aria-label="Financial conversation" hidden></section>
    <p id="investmentError" class="error-note" role="alert"></p>
    <form id="investmentComposer" class="assistant-composer"><label class="sr-only" for="investmentInput">Talk to Apex</label><textarea id="investmentInput" rows="2" maxlength="2000" placeholder="Find a rental property in Penang that fits my situation..." required></textarea><button type="submit" class="primary-button">Send <span aria-hidden="true">&#8599;</span></button></form>
    <div class="assistant-composer-meta"><label><input id="investmentAi" type="checkbox"> Use AI reasoning</label><span id="investmentModel">Checking connection</span><button id="investmentProfileStart" type="button">Check my buying power</button><button id="investmentVoice" type="button">Speak</button></div>
    <details class="assistant-boundaries"><summary>What happens with my information?</summary><p>Your confirmed brief guides the search; it does not prove affordability. Turning on AI sends submitted messages and relevant case context to the configured provider. Your private observations never update the shared founder framework. Site visits, professional checks and external commitments still need people.</p><p id="investmentCoverage"></p></details>`;async function f(D,C,X=C?"POST":"GET"){let te=new AbortController,Q=setTimeout(()=>te.abort(),6e4);v.add(te);try{let de=await fetch(D,{method:X,headers:{"content-type":"application/json"},body:C?JSON.stringify(C):void 0,signal:te.signal}),pe=await de.json();if(!de.ok)throw Object.assign(new Error(pe.error||"The request could not be completed."),{status:de.status});return pe}catch(de){throw de.name==="AbortError"?new Error("Request interrupted. Reload the investigation to check what was saved before retrying."):de}finally{clearTimeout(Q),v.delete(te)}}function M(D){c=D,Te("#investmentComposer button").disabled=D;for(let C of["investmentCaseSelect","investmentNew","investmentDelete"])Te("#"+C).disabled=D;a.setAttribute("aria-busy",String(D))}function E(D){Te("#investmentError").textContent=D.message||String(D)}async function S(){let D=u,C=await f("/api/assistant/cases");D===u&&(h=C.cases,a.classList.toggle("no-cases",!h.length&&!o),Te("#investmentCaseSelect").innerHTML=h.length?h.map(X=>`<option value="${Le(X.id)}" ${o?.id===X.id?"selected":""}>${Le(X.title)} / ${Le(vu[X.stage])}</option>`).join(""):'<option value="">No saved investigation</option>')}function A(){Te("#investmentExport").hidden=!o;let D=Te("#investmentMessages"),C=D.scrollHeight-D.scrollTop-D.clientHeight<60;D.innerHTML=(o?.messages||[]).map(pe=>`<article class="assistant-message ${pe.role==="user"?"from-user":"from-apex"}"><small>${pe.role==="user"?"YOU":`APEX / ${pe.mode==="llm"?"AI + FRAMEWORK":"FRAMEWORK"}`}</small><p>${Le(pe.content)}</p></article>`).join(""),C&&(D.scrollTop=D.scrollHeight),a.classList.toggle("has-conversation",!!o?.messages.length);let X=Te("#investmentBrief"),te=o?.brief;X.hidden=!o||!!(o.selected||o.profileIntake)||!(te?.area||te?.goal||te?.budgetMax),te&&!X.hidden&&(X.innerHTML=`<details ${!o.confirmedAt||m?"open":""}><summary>Your search brief <span>${o.confirmedAt&&!m?"Confirmed":"Please review"}</span></summary><form id="investmentBriefForm"><div class="assistant-field-grid"><label>Location<input name="area" required maxlength="120" value="${Le(te.area)}" placeholder="Town, neighbourhood or state"></label><label>Purpose<select name="goal" required><option value="">Choose your objective</option>${Object.entries(vu).slice(0,4).map(([pe,We])=>`<option value="${pe}" ${te.goal===pe?"selected":""}>${We}</option>`).join("")}</select></label><label>Search ceiling (RM)<input name="budgetMax" type="number" min="1" max="1000000000" required value="${te.budgetMax??""}" inputmode="decimal"></label><label>Property type<select name="propertyType">${[["any","Open to residential options"],["condo","Condominium"],["serviced_apartment","Serviced apartment"],["landed","Landed"]].map(([pe,We])=>`<option value="${pe}" ${te.propertyType===pe?"selected":""}>${We}</option>`).join("")}</select></label></div><p class="assistant-caption">Confirm what I understood. This is a search range, not loan approval or a recommendation to spend it.</p><button type="submit" class="primary-button">${o.confirmedAt?"Search again with this brief":"Confirm & find candidates"}</button></form></details>`);let Q=o?.job;Te("#investmentRun").hidden=!Q,Q&&(Te("#investmentRun").innerHTML=`<div><span class="live-dot"></span><b>${Le(Q.status==="completed"?"Search complete":Q.status==="cancelled"?"Search stopped":Q.status==="failed"?"Search needs attention":Q.labels[Math.min(Q.step,2)])}</b><small>${Math.min(Q.step,3)} / 3</small></div>${["queued","running"].includes(Q.status)?'<button type="button" data-investment-action="cancel">Stop search</button>':""}<p>${Le(Q.error||"Uses the published catalogue only. You can use other tools while this runs; return here to see the result.")}</p>`);let de=o?.results;Te("#investmentResults").hidden=!de||!!(o?.selected||o?.profileIntake)||Q?.status!=="completed",de&&(Te("#investmentResults").innerHTML=`<header><p class="eyebrow">${de.coverage.current} CURRENT RECORDS / ${de.coverage.sources.length} PUBLISHED SOURCES</p><h2>${de.candidates.length?"Worth a closer look":"No supported match yet"}</h2><p>${Le(de.message)}</p></header><div class="assistant-shortlist">${de.candidates.map(pe=>`<article class="assistant-candidate"><span class="status-pill">INVESTIGATE</span><h3>${Le(pe.projectName)}</h3><p>${Le(pe.area)} / ${Le(pe.propertyType.replaceAll("_"," "))}</p><strong>${_p(pe.askingPrice)}</strong><small>Asking price / checked ${pe.observedAt.slice(0,10)}</small><p>${Le(pe.reasons[0])}</p><p class="candidate-gap">${Le(pe.gaps[0])}</p><details><summary>Evidence &amp; contrary case</summary><p>${Le(pe.counterCase)}</p><ul>${pe.gaps.map(We=>`<li>${Le(We)}</li>`).join("")}</ul><a href="${Le(pe.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original listing</a>${pe.facts.map(We=>`<p><a href="${Le(We.sourceUrl)}" target="_blank" rel="noopener noreferrer">${Le(We.kind.replaceAll("_"," "))}</a> / ${We.observedAt.slice(0,10)} / ${Le(We.verification.replaceAll("_"," "))}<br>${Le(We.description)}</p>`).join("")}</details><button type="button" class="primary-button" data-investment-select="${Le(pe.id)}">Investigate this property</button></article>`).join("")}</div><details><summary>Search coverage and exclusions</summary><p>${Le(de.rankingBasis)}</p><p>${Object.entries(de.excluded).map(([pe,We])=>`${Le(pe)}: ${We}`).join(" / ")}</p><p>${Le(de.coverage.limit)}</p><p>${de.coverage.sources.map(pe=>`${Le(pe.name)}: ${Le(pe.coverage||"Coverage not specified")}`).join("<br>")}</p></details>`),L(),R()}function R(){let D=Te("#investmentFinance"),C=o?.profileIntake;D.hidden=!C,Te("#investmentProfileStart").hidden=!!C,Te("#investmentProfileStart").textContent=o?.working?.financialProfile&&Object.keys(o.working.financialProfile).length?"Review my buying power":"Check my buying power",Te("#investmentInput").placeholder=C?"Your answer, or skip...":"Find a rental property in Penang that fits my situation...",C&&(D.innerHTML=`<header><b>Your financial draft</b><small>${C.answered} / 4 answered</small></header><p class="assistant-caption">Saved figures stay unchanged until you confirm. Skipped fields replace earlier figures with unknowns. This intake uses no AI provider.</p>
      <details ${C.pending?"":"open"}><summary>Review figures</summary><dl>${C.rows.map(X=>`<div><dt>${Le(X.label)}</dt><dd>${X.state==="pending"?"Not answered":X.state==="skipped"?"Unknown / skipped":X.key==="cashReserveMonths"?`${Le(X.value)} months`:_p(Number(X.value))}</dd></div>`).join("")}</dl></details>
      ${C.stale?'<p class="error-note" role="status">Saved inputs changed while this draft was open. Restart the conversation to review the current version. Nothing has been overwritten.</p>':""}
      <div class="assistant-finance-actions">${C.pending?'<button type="button" data-profile-action="skip">Skip this question</button>':`<button type="button" class="primary-button" data-profile-action="confirm" ${!C.canConfirm||C.stale?"disabled":""}>Confirm &amp; save profile</button>`}<button type="button" data-profile-action="restart">Start these questions again</button><button type="button" data-profile-action="cancel">Cancel intake</button></div><details><summary>How to correct a figure</summary><p class="assistant-caption">Use the chat with labels, for example: net income 8000; debt repayments 1500; purchase cash 60k; reserve 6 months. Reserve means essential expenses after the purchase, not salary. To remove a draft answer, restart and skip that question.</p></details>`)}function L(){let D=Te("#investmentProperty"),C=o?.selected;if(D.hidden=!C||!!o?.profileIntake,D.hidden)return;let te=o.tasks.filter(Q=>Q.id.startsWith(o.stage+":")).find(Q=>Q.status!=="done");D.innerHTML=`<header><p class="eyebrow">ONE PROPERTY / A CONTINUING INVESTIGATION</p><h2>${Le(C.projectName)}</h2><p>${Le(vu[o.stage])} / ${Le(C.area)}</p><button type="button" class="secondary-button" data-investment-action="numbers">Open the valuation tools</button></header>
      <p id="investmentSyncNotice" class="assistant-caption" role="status"></p><div id="investmentSyncActions" hidden><details><summary>Review the differences</summary><div id="investmentSyncDiff"></div></details><button type="button" data-investment-action="retry-sync">Retry saving</button><button type="button" data-investment-action="download-context">Export unsaved inputs</button><button type="button" data-investment-action="keep-context">Keep my tool edits</button><button type="button" data-investment-action="reload-context">Use the saved inputs</button></div>
      ${o.working?`<details><summary>Working assumptions / saved ${o.working.updatedAt.slice(0,10)}</summary><p>Tool edits are private user-declared inputs. They do not change the original listing snapshot or prove the claims.</p><p>Working price: ${Le(o.working.dealCard.askingPrice||"Not provided")} / Working rent: ${Le(o.working.dealCard.expectedRent||"Not provided")} / Income: ${Le(o.working.financialProfile.monthlyIncome||"Not provided")}</p></details>`:""}
      ${o.sourceStatus&&o.sourceStatus.status!=="current"?`<p class="candidate-gap" role="status">${Le(o.sourceStatus.note)}</p>`:""}
      ${te?`<section class="assistant-next"><small>NEXT USEFUL ACTION</small><h3>${Le(te.title)}</h3><p>${Le(te.prompt)}</p><form id="investmentTaskForm"><input type="hidden" name="taskId" value="${Le(te.id)}"><label>What did you check?<textarea name="note" required minlength="12" maxlength="1500" placeholder="Your observation, document or professional feedback"></textarea></label><div class="assistant-field-grid"><label>Date checked<input type="date" name="checkedAt" required max="${_s()}" value="${_s()}"></label><label>Source link (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label></div><button type="submit" class="primary-button">Record this check</button><p class="assistant-caption">Recorded as your declaration, not independent verification.</p></form></section>`:'<p class="assistant-next">Your checks for this stage are recorded. Review unresolved risks before making a commitment.</p>'}
      <details><summary>All checks and evidence</summary>${o.tasks.map(Q=>`<p><b>${Le(Q.title)}</b> / ${Le(Q.status)}<br>${Le(Q.note||"Not yet recorded")}${Q.status==="done"?`<br><button type="button" data-reopen-task="${Le(Q.id)}">Reopen check</button>`:""}</p>`).join("")}<form id="investmentEvidenceForm"><label>Add a private observation<textarea name="note" required minlength="12" maxlength="2000"></textarea></label><label>Date<input type="date" name="checkedAt" required max="${_s()}" value="${_s()}"></label><label>Source (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label><button type="submit">Keep this evidence</button></form>${o.evidence.map(Q=>`<p>${Le(Q.note)}<br><small>${Q.checkedAt.slice(0,10)} / user declared</small></p>`).join("")}</details>
      <details><summary>Move to another ownership stage</summary><form id="investmentStageForm"><label>Current situation<select name="stage">${Object.entries(vu).slice(5).map(([Q,de])=>`<option value="${Q}" ${Q===o.stage?"selected":""}>${de}</option>`).join("")}</select></label><label>What changed, and what remains unresolved?<textarea name="note" required minlength="12" maxlength="1000"></textarea></label><button type="submit">Update my stage</button><p class="assistant-caption">This records your progress, not approval to transact. Apex does not sign, pay, book or contact anyone automatically.</p></form></details>
      <details><summary>Actual rental and holding outcomes</summary><form id="investmentOutcomeForm"><div class="assistant-field-grid"><label>Month<input name="month" type="month" required max="${_s().slice(0,7)}" value="${_s().slice(0,7)}"></label><label>Rent received (RM)<input name="rentReceived" type="number" step="0.01" min="0" required></label><label>All monthly outgoings (RM)<input name="totalCosts" type="number" step="0.01" min="0" required></label><label>Notes<input name="note" maxlength="1000" placeholder="Vacancy, repairs, loan and recurring charges"></label></div><button type="submit">Record actual outcome</button></form>${o.outcomes.map(Q=>`<p>${Le(Q.month)} / ${_p(Q.cashFlow)} cash flow<br>${Le(Q.note)}</p>`).join("")}</details>
      <details><summary>Decision history</summary>${o.events.slice().reverse().map(Q=>`<p>${Le(Q.description)}<br><small>${Q.at.slice(0,10)}</small></p>`).join("")}</details>`,k()}function k(){let D=Te("#investmentSyncNotice");if(!D)return;let C=y.get(o?.id),X=C&&["conflict","unsaved"].includes(C.value);if(D.textContent=X?`${C.value==="conflict"?"Working inputs changed elsewhere.":"Tool edits are not saved to the investigation."} ${C.error} Your local copy remains in the tools; export it before choosing the saved version.`:C&&["pending","saving"].includes(C.value)?"Saving working inputs to this investigation...":o?.working?"The assistant and tools use the same saved working inputs.":"The original source snapshot is preserved when you edit assumptions in the tools.",Te("#investmentSyncActions").hidden=!X,X){let te=g.pending(o.id),Q=o.toolContext||{};Te("#investmentSyncDiff").innerHTML=te?Object.keys(te).flatMap(de=>Array.from(new Set([...Object.keys(te[de]||{}),...Object.keys(Q[de]||{})])).filter(pe=>JSON.stringify(te[de]?.[pe])!==JSON.stringify(Q[de]?.[pe])).map(pe=>`<p><b>${Le(pe.replace(/([A-Z])/g," $1"))}</b><br>Your tool edit: ${Le(typeof te[de]?.[pe]=="object"?JSON.stringify(te[de][pe]):te[de]?.[pe]??"Not provided")}<br>Saved: ${Le(typeof Q[de]?.[pe]=="object"?JSON.stringify(Q[de][pe]):Q[de]?.[pe]??"Not provided")}</p>`)).join(""):"No pending tool copy is available."}}async function w(D){let C=u,X=await f(`/api/assistant/cases/${D}`);C===u&&(o=X.case,m=!1,A())}async function _(D,C={}){if(!o)return;g.hasPending(o.id)&&(await g.flush(o.id),await w(o.id));let X=u,te=o.id,Q=await f(`/api/assistant/cases/${te}/${D}`,{...C,revision:o.revision});X!==u||o?.id!==te||(o=Q.case,A(),(D==="message"||D==="profile")&&(Te("#investmentMessages").scrollTop=Te("#investmentMessages").scrollHeight),D==="profile"&&C.action==="confirm"&&(g.accept(o),o.selected&&e(o,{replace:!0})))}async function P(D){if(!c){M(!0),Te("#investmentError").textContent="";try{await D(),await S()}catch(C){E(C),C.status===409&&o&&await w(o.id).catch(E)}finally{M(!1),B()}}}function B(){clearTimeout(d),!(!o?.job||!["queued","running"].includes(o.job.status))&&(d=setTimeout(()=>{if(c){B();return}P(()=>l?.backgroundMode==="server"?w(o.id):_("step",{jobId:o.job.id}))},l?.backgroundMode==="server"?1800:650))}async function G(){let D=u,C=await f("/api/assistant/cases",{});D===u&&(o=C.case,m=!1,A())}async function q(){u++,clearTimeout(d),g.reset(),y.clear();for(let X of v)X.abort();o=null,A();let D=u,C=await f("/api/assistant/status");D===u&&(l=C,Te("#investmentStorage").textContent=l.storageNotice,Te("#investmentModel").textContent=l.llm?"AI available / opt in to use":"Framework mode / AI not configured",Te("#investmentAi").checked=!1,Te("#investmentAi").disabled=!l.llm,Te("#investmentCoverage").textContent=`${l.coverage.current} current records from ${l.coverage.sources.length} published sources. ${l.coverage.limit} ${l.background}`,Te("#investmentAdopt").hidden=!l.guestDraftAvailable,await S(),h.length&&(await w(h[0].id),B()))}Te("#investmentComposer").addEventListener("submit",D=>{D.preventDefault();let C=Te("#investmentInput"),X=C.value.trim();X&&P(async()=>{o||await G(),await _("message",{message:X,allowAi:Te("#investmentAi").checked,editBrief:m}),C.value=""})}),a.addEventListener("submit",D=>{let C=D.target.id,X={investmentBriefForm:"confirm",investmentTaskForm:"task",investmentStageForm:"stage",investmentOutcomeForm:"outcome",investmentEvidenceForm:"evidence"}[C];if(!X)return;D.preventDefault();let te=Object.fromEntries(new FormData(D.target));P(async()=>{await _(X,X==="confirm"?{brief:{...o.brief,...te}}:{...te,...X==="task"?{status:"done"}:{}}),m=!1,A()})}),a.addEventListener("click",D=>{let C=D.target.closest("button");if(C){if(C.dataset.profileAction&&P(async()=>{await _("profile",{action:C.dataset.profileAction}),o.profileIntake?.pending&&Te("#investmentInput").focus()}),C.dataset.investmentSelect&&P(async()=>{await _("select",{listingId:C.dataset.investmentSelect}),e(o)}),C.dataset.investmentAction==="cancel"&&P(()=>_("cancel",{jobId:o.job.id})),C.dataset.investmentAction==="numbers"&&e(o)!==!1&&n("valuation"),C.dataset.investmentAction==="retry-sync"&&P(async()=>{await g.flush(o.id),await w(o.id)}),C.dataset.investmentAction==="keep-context"){if(C.dataset.confirm!==o.id){C.dataset.confirm=o.id,C.textContent="Confirm: replace saved assumptions with my tool edits";return}P(async()=>{await g.keepLocal(o),await w(o.id),e(o,{replace:!0})})}if(C.dataset.investmentAction==="download-context"){let X=g.pending(o.id);if(!X)return;let te=URL.createObjectURL(new Blob([JSON.stringify({format:"apex-unsaved-context.v1",investigationId:o.id,context:X},null,2)],{type:"application/json"})),Q=document.createElement("a");Q.href=te,Q.download=`apex-unsaved-inputs-${_s()}.json`,Q.click(),setTimeout(()=>URL.revokeObjectURL(te),1e3)}if(C.dataset.investmentAction==="reload-context"){if(C.dataset.confirm!==o.id){C.dataset.confirm=o.id,C.textContent="Confirm: replace local tool edits with saved inputs";return}P(async()=>{await w(o.id),g.accept(o),e(o,{replace:!0})})}C.dataset.reopenTask&&P(()=>_("task",{taskId:C.dataset.reopenTask,status:"open"}))}}),Te("#investmentNew").addEventListener("click",()=>void P(G)),Te("#investmentProfileStart").addEventListener("click",()=>void P(async()=>{o||await G(),await _("profile",{action:"start"}),Te("#investmentInput").focus()})),Te("#investmentCaseSelect").addEventListener("change",D=>void P(()=>w(D.target.value))),Te("#investmentAccount").addEventListener("click",()=>void n("account")),Te("#investmentAdopt").addEventListener("click",()=>void P(async()=>{await f("/api/assistant/adopt",{}),await q()})),Te("#investmentExport").addEventListener("click",()=>{if(!o)return;let D=URL.createObjectURL(new Blob([JSON.stringify({format:"apex-investigation.v1",exportedAt:new Date().toISOString(),case:o},null,2)],{type:"application/json"})),C=document.createElement("a");C.href=D,C.download=`apex-investigation-${_s()}.json`,C.click(),setTimeout(()=>URL.revokeObjectURL(D),1e3)}),Te("#investmentDelete").addEventListener("click",D=>{if(!(!o||c)){if(D.target.dataset.confirm!==o.id){D.target.dataset.confirm=o.id,D.target.textContent="Confirm delete: chat, evidence, outcomes and linked tool inputs";return}P(async()=>{let C=o.id;await f(`/api/assistant/cases/${C}`,null,"DELETE"),g.forget(C),r?.(C),o=null,A(),D.target.textContent="Delete this investigation",D.target.dataset.confirm=""})}});let j,Y=window.SpeechRecognition||window.webkitSpeechRecognition;return Te("#investmentVoice").hidden=!Y,Te("#investmentVoice").addEventListener("click",()=>{if(j){j.stop();return}j=new Y,j.lang="en-MY",j.onresult=D=>{Te("#investmentInput").value=Array.from(D.results).map(C=>C[0].transcript).join(" ")},j.onerror=()=>E(new Error("Voice input is unavailable. You can type your message instead.")),j.onend=()=>{j=null,Te("#investmentVoice").textContent="Speak"},j.start(),Te("#investmentVoice").textContent="Stop listening"}),document.addEventListener("apex:auth",()=>{j?.stop(),q().catch(E)}),q().catch(E),{holdContext(D,C){g.hold(D.investigationId,C.working?.revision||0,D)},queueContext(D){D?.investigationId&&(g.register(D.investigationId,D.assistantRevision||0,D.assistantSynced||{}),g.queue(D.investigationId,D.assistantRevision||0,un(D)))},async prepareTools(D){if(!D?.investigationId)return;let C=u;if(g.register(D.investigationId,D.assistantRevision||0,D.assistantSynced||{}),D.assistantPending||g.hasPending(D.investigationId)){g.queue(D.investigationId,D.assistantRevision||0,un(D));try{await g.flush(D.investigationId)}catch{return}}try{let X=await f(`/api/assistant/cases/${D.investigationId}`);if(C!==u)return;if(!D.assistantSynced&&JSON.stringify(un(D))!==JSON.stringify(un(X.case.toolContext))){g.hold(D.investigationId,X.case.working?.revision||0,D);return}g.hasPending(D.investigationId)||(g.accept(X.case),e(X.case,{replace:!0}))}catch(X){C===u&&(s?.(D.investigationId,"unsaved",X),t("Could not refresh this investigation. The tools retain this browser's copy; do not treat it as the latest saved version."))}},async resume(D){if(D){try{await g.flush(D)}catch(C){E(C)}try{await w(D)}catch(C){E(C)}}else o&&await w(o.id).catch(E);this.show(),B()},show(){a.hidden=!1,document.body.classList.add("assistant-active"),document.body.classList.remove("workspace-active"),Te("#workbench").hidden=!0,document.querySelectorAll("[data-area]").forEach(D=>D.setAttribute("aria-current",D.dataset.area==="assistant"?"page":"false")),history.replaceState(null,"","#assistant")},hide(){a.hidden=!0,document.body.classList.remove("assistant-active"),j?.stop()}}}function Vv(n){n.querySelector("#workspacePanels").insertAdjacentHTML("beforeend",`<section data-surface="catalogue" class="studio-surface" hidden><header><span><small>OWNER ONLY</small><b>Published discovery sources</b></span></header><p>Publish only records you are permitted to redistribute. This catalogue is separate from private evidence and the founder's 407 answers.</p><form id="catalogueForm"><label>Owner token<input id="catalogueToken" type="password" autocomplete="off"></label><label>Permitted source export (JSON)<input id="catalogueFile" type="file" accept=".json,application/json"></label><p>A complete import replaces that source's earlier records, so withdrawn listings do not remain active.</p><button type="submit" class="primary-button">Validate &amp; publish source</button><button type="button" id="catalogueRefresh">Refresh coverage</button><a href="/assistant/catalogue-template.json" download>Download an empty import template</a></form><p id="catalogueMessage" role="status"></p><div id="catalogueSources"></div></section>`);async function e(i="GET",s){let r=await fetch("/api/owner/discovery",{method:i,headers:{"content-type":"application/json","x-estatelab-owner-token":Te("#catalogueToken").value||Te("#ownerIntelToken")?.value||""},body:s?JSON.stringify(s):void 0}),a=await r.json();if(!r.ok)throw new Error(a.error||"Catalogue request failed.");return a}async function t(){let i=await e();Te("#catalogueSources").innerHTML=`<p>${i.coverage.current} current listings / ${i.coverage.records} total records.</p>${i.sources.map(s=>`<article><h3>${Le(s.name)}</h3><p>${Le(s.coverage)} / ${Le(s.permission)}</p><p>${Le(s.permissionReference)}</p><button type="button" data-unpublish="${Le(s.id)}">Unpublish this source</button></article>`).join("")}`}Te("#catalogueRefresh").addEventListener("click",()=>void t().catch(i=>{Te("#catalogueMessage").textContent=i.message})),Te("#catalogueForm").addEventListener("submit",async i=>{i.preventDefault();let s=Te("#catalogueFile").files[0],r=i.target.querySelector('[type="submit"]');r.disabled=!0;try{if(!s||s.size>4*1024*1024)throw new Error("Choose a JSON source export under 4 MB.");let a=await e("POST",JSON.parse(await s.text()));Te("#catalogueMessage").textContent=`Published ${a.imported} records. Import validates structure, not the truth of source claims.`,await t()}catch(a){Te("#catalogueMessage").textContent=a.message}finally{r.disabled=!1}}),Te("#catalogueSources").addEventListener("click",async i=>{let s=i.target.closest("[data-unpublish]");if(s){if(s.dataset.confirm!=="true"){s.dataset.confirm="true",s.textContent="Confirm unpublish";return}try{await e("DELETE",{sourceId:s.dataset.unpublish}),await t()}catch(r){Te("#catalogueMessage").textContent=r.message}}})}var Da={desk:{title:"The decision desk",description:"Explore the question. Test the numbers. Keep your context together.",views:[["chat","Ask Apex","Your thinking partner"],["deal","Property inputs","Shared with the journey"],["profile","Investor profile","Capacity, goals and reserves"],["valuation","Valuation lab","DCF, comparisons and Excel"],["guidance","Preferences","Choose your guidance style"]]},library:{title:"Your private library",description:"Return to what you learned, decided and saved.",views:[["reports","Decision reports","Saved seven-stage assessments"],["journal","Decision journal","Thesis, outcomes and lessons"],["memory","Long-term memory","Review what Apex remembers"],["history","Conversations","Resume or manage your history"],["shortlist","Saved shortlist","Compare earlier assessments"]]},owner:{title:"Owner Studio",description:"Curate the intelligence. Shared knowledge stays under your control.",views:[["owner","Intelligence hub","Coverage, research and operations"],["catalogue","Discovery catalogue","Permitted sources and current listings"],["market","Market observatory","Projects and dated observations"],["cases","Development cases","Your project-level experience"],["evidence","Evidence vault","Sources, documents and indexing"]]},account:{title:"Your account",description:"Private access, plan details and the boundaries that protect your decisions.",views:[["account","Account & plan","Sign in, security and billing"],["trust","Decision boundaries","What Apex can and cannot do"]]}},fl=Object.entries(Da).flatMap(([n,e])=>e.views.map(([t,i,s])=>({area:n,id:t,label:i,description:s}))),Bt=n=>document.querySelector(n);function dx({getCandidate:n,notify:e,onVisibility:t,beforeOpen:i}){let s=Bt("#workbench");s.innerHTML=`<aside class="studio-sidebar"><p class="eyebrow">APEX / WORKSPACE</p><h2 id="studioAreaTitle"></h2><p id="studioAreaDescription"></p><label class="studio-search"><span class="sr-only">Find a feature</span><input id="studioSearch" type="search" placeholder="Find a tool..." autocomplete="off"></label><nav id="studioNav" aria-label="Workspace sections"></nav><label class="mobile-section"><span>Section</span><select id="studioSectionSelect"></select></label><p class="studio-private">Your property stays selected as you move between tools. Knowledge updates are owner-only.</p></aside><div class="studio-main"><header class="studio-breadcrumb"><span id="studioBreadcrumb"></span><button type="button" data-return-journey>Back to journey <span aria-hidden="true">&#8599;</span></button></header><div id="studioLoading" role="status" hidden>Connecting your workspace...</div>${Fv}</div>`,Vv(s),s.querySelector(".studio-breadcrumb").insertAdjacentHTML("afterend",'<p id="studioSyncStatus" class="assistant-caption" role="status" hidden></p>');let r,a,o="",l="desk",c=!1;Bt("#studioBreadcrumb").tabIndex=-1;let u;try{let g=JSON.parse(localStorage.getItem("estatelab.jarvis.dealCard")||"{}"),f=JSON.parse(localStorage.getItem("estatelab.jarvis.financialProfile")||"{}");!localStorage.getItem("apex.workspace.recovered")&&(Object.keys(g).length||Object.keys(f).length)&&(u={dealCard:g,financialProfile:f})}catch{}if(u){let g=document.createElement("details");g.className="draft-recovery",g.innerHTML='<summary>Earlier browser inputs found</summary><p>Recover the draft saved on this device. Review it before relying on it; your existing properties will not be overwritten.</p><button type="button" data-recover-draft>Recover draft</button>',s.querySelector(".studio-sidebar").append(g)}for(let g of fl){let f=s.querySelector(`[data-surface="${g.id}"] > header > span > b:not([id])`);f&&(f.textContent=g.label)}function d(g,f=!0){let M=fl.find(E=>E.id===g);M&&(o=g,l=M.area,document.dispatchEvent(new CustomEvent("apex:leave-assistant")),s.hidden=!1,document.body.classList.add("workspace-active"),t(!0),Bt("#studioAreaTitle").textContent=Da[l].title,Bt("#studioAreaDescription").textContent=Da[l].description,Bt("#studioBreadcrumb").textContent=`${Da[l].title} / ${M.label}`,s.querySelectorAll("[data-surface]").forEach(E=>{E.hidden=E.dataset.surface!==g}),document.querySelectorAll("[data-area]").forEach(E=>E.setAttribute("aria-current",E.dataset.area===l?"page":"false")),Bt("#studioAccount").setAttribute("aria-current",l==="account"?"page":"false"),h(Bt("#studioSearch").value),f&&history.replaceState(null,"",`#${l}/${g}`))}function h(g=""){let f=g.trim().toLowerCase();s.dataset.searching=String(!!f);let M=f?fl.filter(E=>`${E.label} ${E.description}`.toLowerCase().includes(f)):fl.filter(E=>E.area===l);Bt("#studioNav").innerHTML=M.map((E,S)=>`<button type="button" data-view="${E.id}" aria-current="${o===E.id?"page":"false"}"><span class="studio-nav-number">${String(S+1).padStart(2,"0")}</span><span><b>${E.label}</b><small>${E.description}</small></span><span aria-hidden="true">&#8599;</span></button>`).join("")||'<p>No matching tools. Try "reports", "DCF" or "memory".</p>',Bt("#studioSectionSelect").innerHTML=Object.entries(Da).map(([E,S])=>`<optgroup label="${S.title}">${S.views.map(([A,R])=>`<option value="${A}" ${A===o?"selected":""}>${R}</option>`).join("")}</optgroup>`).join("")}async function m(){return r&&s.dataset.ready==="true"?r:(a||(a=(async()=>{Bt("#studioLoading").hidden=!1;let g=await Promise.resolve().then(()=>(ux(),cx));return r=g,g.setWorkspaceCandidate(n()),await g.initializeFeatures(),Bt("#studioLoading").hidden=!0,s.dataset.ready="true",g})().catch(g=>{throw a=null,Bt("#studioLoading").textContent="Workspace connection failed. Try selecting a section again.",g})),a)}async function v(g="chat",f={}){if(c||r?.workspaceBusy()){e("Let Apex finish the current request before switching tools.");return}c=!0,d(g),Bt("#studioSearch").value="";try{await i?.(g);let M=await m();g!=="catalogue"&&await M.openWorkspaceFeature(g,f),d(o||g),o==="account"&&g!=="account"&&e("Sign in to open your private library. Guest chat and property tools remain available."),window.scrollTo({top:0,behavior:"instant"}),g!=="chat"&&!matchMedia("(pointer: coarse)").matches&&Bt("#studioBreadcrumb").focus({preventScroll:!0})}catch(M){e(M.message,!0)}finally{c=!1}}function y(){if(c||r?.workspaceBusy()){e("Let Apex finish the current request before switching views.");return}s.hidden=!0,document.body.classList.remove("workspace-active"),document.dispatchEvent(new CustomEvent("apex:leave-assistant")),history.replaceState(null,"","#journey"),t(!1),document.querySelectorAll("[data-area]").forEach(g=>g.setAttribute("aria-current",g.dataset.area==="journey"?"page":"false"))}return document.addEventListener("apex:surface",g=>d(g.detail)),document.addEventListener("apex:notice",g=>e(g.detail,!0)),document.addEventListener("keydown",g=>{g.key==="Escape"&&!s.hidden&&!Bt("#workspaceDialog").open&&y()}),s.addEventListener("click",g=>{let f=g.target.closest("button");f&&(f.dataset.view&&v(f.dataset.view),f.hasAttribute("data-return-journey")&&y(),f.hasAttribute("data-studio-close")&&v("chat"),f.hasAttribute("data-recover-draft")&&!r?.workspaceBusy()&&document.dispatchEvent(new CustomEvent("apex:recover-draft",{detail:u})))}),Bt("#studioSearch").addEventListener("input",g=>h(g.target.value)),Bt("#studioSectionSelect").addEventListener("change",g=>void v(g.target.value)),document.addEventListener("keydown",g=>{(g.ctrlKey||g.metaKey)&&g.key.toLowerCase()==="k"&&(g.preventDefault(),v(o||"chat").then(()=>Bt("#studioSearch").focus()))}),document.querySelectorAll("[data-area]").forEach(g=>g.addEventListener("click",()=>{g.dataset.area!=="assistant"&&(g.dataset.area==="journey"?y():v(Da[g.dataset.area].views[0][0]))})),Bt("#studioAccount").addEventListener("click",()=>void v("account")),{open:v,close:y,isBusy:()=>c||!!r?.workspaceBusy(),setCandidate(g){r?.setWorkspaceCandidate(g)},restoreRoute(){let g=location.hash.split("/")[1];fl.some(f=>f.id===g)&&v(g)}}}var At,Di,hx=!1,Ae=n=>document.querySelector(n),ht=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),$1=n=>String(n??"").replace(/EstateLab|Jarvis/gi,"Apex"),yx=()=>new Date().toISOString().slice(0,10),bx=()=>crypto.randomUUID(),yl={read(n,e){try{return JSON.parse(localStorage.getItem(n))??e}catch{return e}},write(n,e){localStorage.setItem(n,JSON.stringify(e))}},ss={},ns=yl.read("apex.journey.client",null);if(!ns)try{ns=localStorage.getItem("estatelab.jarvis.clientId"),ns&&yl.write("apex.journey.client",ns)}catch{}if(!/^[\w-]{16,128}$/.test(ns||"")){ns=bx();try{yl.write("apex.journey.client",ns)}catch{}}var xx=matchMedia("(prefers-reduced-motion: reduce)"),V={candidates:[],active:"",level:0,checkpoint:null,evaluation:null,busy:!1,revision:0,paused:xx.matches,flat:!1,storageKey:null,world:null,noticeTimer:null};function Nt(n,e=!1){clearTimeout(V.noticeTimer),Ae("#notice").textContent=$1(n),e||(V.noticeTimer=setTimeout(()=>{Ae("#notice").textContent=""},6500))}function Oa(){return{id:bx(),dealCard:{},financialProfile:{},evidence:{},report:null,sessionId:null,chat:[],modified:new Date().toISOString()}}function mt(){return V.candidates.find(n=>n.id===V.active)}function _x(n){return{dealCard:n.dealCard,financialProfile:n.financialProfile,evidence:n.evidence}}function Vn(){if(V.storageKey)try{yl.write(V.storageKey,{candidates:V.candidates,active:V.active}),Ae("#saveStatus").textContent="Saved in this browser. Your framework stays owner-controlled."}catch{Ae("#saveStatus").textContent="Browser storage is unavailable. Export your journey to keep a copy."}}function Sx(){V.revision++,V.evaluation=null,mt().report=null,mt().modified=new Date().toISOString(),Ae("#levelStatus").textContent="RECHECK NEEDED",Vn(),wr(),is(),Di?.queueContext(mt())}function yd(){let n=Ae("#studioSyncStatus"),e=mt();if(!n||(n.hidden=!e?.investigationId,n.hidden))return;let t=e.assistantSyncStatus;n.textContent=t==="conflict"?"These inputs changed elsewhere. Return to Assistant to review the saved version; local edits are retained.":t==="unsaved"?`Tool edits are only saved in this browser. ${e.assistantSyncError||"Reconnect or correct the inputs to save them to the investigation."}`:["pending","saving"].includes(t)?"Saving working inputs to the linked investigation...":"Working inputs are linked to your investigation. The original source record is unchanged."}async function bd(n,e,t=35e3){let i=new AbortController,s=setTimeout(()=>i.abort(),t);try{let r=await fetch(n,{method:e?"POST":"GET",headers:{"content-type":"application/json","x-estatelab-client-id":ns},body:e?JSON.stringify(e):void 0,signal:i.signal}),a=await r.json().catch(()=>({}));if(!r.ok)throw new Error(a.error||`Request failed (${r.status}).`);return a}catch(r){throw r.name==="AbortError"?new Error("Apex is taking longer to respond. Your work is saved; please try again."):r}finally{clearTimeout(s)}}function Er(n=V.level){return V.evaluation?.levels?.[n]}function fm(n){return n===0||["active","review","blocked","passed"].includes(Er(n)?.status)}function wr(){let n=Ae("#candidateSelect");n.innerHTML=V.candidates.map((e,t)=>`<option value="${ht(e.id)}">${ht(e.dealCard.projectName||e.dealCard.area||`Property ${t+1}`)}</option>`).join(""),n.value=V.active,Ae("#compareCount").textContent=V.candidates.length}function is(){Ae("#levelRail").innerHTML=Ct.map((n,e)=>{let t=Er(e)?.status||(e===0?"active":"locked"),i={passed:"Cleared",active:"Explore",review:"Evidence needed",blocked:"Resolve issue",locked:"Locked"}[t];return`<button type="button" data-level="${e}" class="${V.level===e?"active":""}" aria-current="${V.level===e?"step":"false"}" aria-disabled="${!fm(e)}" aria-label="Level ${e+1}: ${ht(n.subject)}. ${i}."><span class="rail-number">${t==="passed"?"&#10003;":String(e+1).padStart(2,"0")}</span><span><b>${ht(n.short)}</b><small>${i}</small></span></button>`}).join(""),Ae("#levelsPassed").textContent=String(V.evaluation?.completed||0).padStart(2,"0"),V.world?.update(V.evaluation?.levels||Ct.map((n,e)=>({status:e===0?"active":"locked"})))}function V1(){let n=Ct[V.level],e=Er(),t=n.checkpoints.filter(a=>!Ua(mt(),a,ss).length).length,i=e?.status==="passed",s=e?.status==="blocked"||e?.status==="review",r=`<button class="primary-button" data-action="enter">${t?"Continue investigation":"Enter this level"}<span aria-hidden="true">&#8599;</span></button>`;i&&V.level<6&&(r=`<button class="primary-button" data-action="next">Continue to ${ht(Ct[V.level+1].title)} <span aria-hidden="true">&#8594;</span></button>`),V.level===6&&i&&(r='<button class="primary-button" data-action="report">Get the decision report <span aria-hidden="true">&#8599;</span></button>'),Ae("#levelContent").innerHTML=`
    <p class="level-lead">${ht(n.description)}</p>
    <div class="panel-progress"><span>${t} of ${n.checkpoints.length} checkpoints recorded</span><span>${Math.round(t/n.checkpoints.length*100)}%</span></div>
    <div class="progress-track"><span style="width:${t/n.checkpoints.length*100}%"></span></div>
    ${s?`<div class="gate-result bad"><b>${e.status==="blocked"?"Pause at this level":"The evidence needs another look"}</b><p>${ht(e.blockers?.[0]||e.summary)}</p><button class="secondary-button" data-action="challenge">Ask Apex what to check</button></div>`:""}
    ${i?`<div class="gate-result good"><b>Level cleared</b><p>${ht(e.summary)}</p></div>`:""}
    <ol class="checkpoint-list">${n.checkpoints.map((a,o)=>{let l=!Ua(mt(),a,ss).length;return`<li><button type="button" data-checkpoint="${o}"><span class="step-icon ${l?"complete":""}">${l?"&#10003;":String(o+1).padStart(2,"0")}</span><span>${ht(a.title)}</span><span class="step-arrow" aria-hidden="true">&#8599;</span></button></li>`}).join("")}</ol>
    ${r}
    ${t===n.checkpoints.length&&!i?'<button class="secondary-button" data-action="check" style="width:100%;margin-top:10px">Check this level</button>':""}
    <p class="mentor-note">${ht(n.lesson)}</p>`}function H1(n){let e=ss[n],t=wd(mt(),n,ss),i=Sd.has(n)?"":"required",s=`<span>${ht(e.label)}${i?"":"<small>optional</small>"}</span>`;if(e.options.length)return`<label class="field">${s}<select name="${n}" data-field="${n}" ${i}><option value="">Select what the evidence shows</option>${e.options.map(o=>`<option value="${ht(o.value)}" ${t===o.value?"selected":""}>${ht(o.label)}</option>`).join("")}</select></label>`;let r=/Notes|Thesis|Criterion|Concern|Screening|Reason|Preparation|Commitment/.test(n),a=e.inputMode==="numeric"?"numeric":e.inputMode==="decimal"?"decimal":"text";return`<label class="field">${s}${r?`<textarea data-field="${n}" name="${n}" maxlength="500" placeholder="${ht(e.placeholder)}" ${i}>${ht(t)}</textarea>`:`<input data-field="${n}" name="${n}" value="${ht(t)}" inputmode="${a}" maxlength="500" placeholder="${ht(e.placeholder)}" ${i}>`}</label>`}function z1(){let e=Ct[V.level].checkpoints[V.checkpoint],t=mt().evidence[e.id]||{};Ae("#levelContent").innerHTML=`<button class="back-button" data-action="overview">&#8592; Level overview</button>
    <form class="checkpoint-form" id="checkpointForm">
      <h3>${ht(e.title)}</h3><p>${ht(e.prompt)}</p>
      ${e.fields.map(H1).join("")}
      <div class="proof-block"><p>Leave a trace of your reasoning. For financial inputs, record the basis of your calculation.</p>
      <label class="field"><span>Evidence or calculation notes</span><textarea name="proofNote" data-proof="note" minlength="12" maxlength="1500" required placeholder="Source, document, observation or calculation. Say what is still uncertain.">${ht(t.note||"")}</textarea></label>
      <label class="field"><span>Date checked</span><input name="proofDate" data-proof="date" type="date" max="${yx()}" value="${ht(t.date||"")}" required></label></div>
      <p class="source-line">Framework: ${ht(e.source)}.</p>
      <p id="checkpointError" class="error-note" role="alert"></p>
      <div class="form-actions"><button type="submit" class="primary-button">Save &amp; check <span aria-hidden="true">&#8594;</span></button></div>
    </form>`}function yn(){let n=Ct[V.level],e=Er()?.status||"active";Ae("#levelEyebrow").textContent=`LEVEL ${String(V.level+1).padStart(2,"0")} / 07`,Ae("#levelTitle").textContent=n.title,Ae("#levelSubject").textContent=n.subject.toUpperCase(),Ae("#levelStatus").textContent={active:"OPEN",passed:"CLEARED",review:"REVIEW",blocked:"PAUSED",locked:"LOCKED"}[e],Ae("#levelStatus").dataset.status=e,V.checkpoint===null?V1():z1(),Ae("#levelPanel").setAttribute("aria-busy",String(V.busy))}function pm(n){if(!(V.busy||At?.isBusy())){if(!fm(n)){Nt("Clear the earlier levels first. Each decision builds on the evidence before it.");return}V.level=n,V.checkpoint=null,yn(),is(),V.world?.focus(n),Ae("#levelPanel").scrollTop=0,innerWidth<800&&Ae("#levelPanel").scrollIntoView({behavior:V.paused?"instant":"smooth",block:"start"})}}async function gl(){let n=V.active,e=V.revision,t=await bd("/api/journey/evaluate",{candidate:_x(mt())});return n!==V.active||e!==V.revision?null:(V.evaluation=t,is(),t)}async function px(){if(!(V.busy||At?.isBusy())){V.busy=!0,Ae("#levelPanel").setAttribute("aria-busy","true");try{let n=V.evaluation?.completed||0,e=await gl();if(!e)return;Vn();let t=Ct[V.level].checkpoints.findIndex(i=>Ua(mt(),i,ss).length);t>=0&&V.checkpoint!==null?V.checkpoint=t:V.checkpoint=null,yn(),Ae("#levelPanel").scrollTop=0,e.completed>n?Nt(`${Ct[V.level].title} cleared. The next level is open.`):t<0?Nt(Er()?.status==="passed"?"This level is cleared.":"Evidence saved. Review the level feedback before proceeding."):Nt("Checkpoint saved. Continue with the next piece of evidence.")}catch(n){let e=Ae("#checkpointError");e?e.textContent=n.message:Nt(n.message,!0)}finally{V.busy=!1,Ae("#levelPanel").setAttribute("aria-busy","false")}}}function wx(n,e,t="YOUR INVESTIGATION"){Ae("#dialogTitle").textContent=n,Ae("#dialogEyebrow").textContent=t,Ae("#dialogContent").innerHTML=e,Ae("#workspaceDialog").open||Ae("#workspaceDialog").showModal()}function fx(){let n={product:"Apex Property Journey",version:1,exportedAt:new Date().toISOString(),candidate:mt(),assessment:V.evaluation},e=URL.createObjectURL(new Blob([JSON.stringify(n,null,2)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`apex-journey-${yx()}.json`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}async function G1(){if(!(V.busy||At?.isBusy())){wx("Which property earns its place?",'<p role="status">Rechecking each candidate against the same framework...</p>',"YOUR PROPERTY COLLECTION");try{let n=[];for(let a of V.candidates)n.push(await bd("/api/journey/evaluate",{candidate:_x(a)}));let e=n.map((a,o)=>({result:a,i:o})).filter(a=>a.result.qualified).sort((a,o)=>(o.result.dimensions||[]).reduce((l,c)=>l+c.score,0)-(a.result.dimensions||[]).reduce((l,c)=>l+c.score,0)),t=e[0],i=a=>a.result.dimensions.reduce((o,l)=>o+l.score,0),s=t?e.filter(a=>i(a)===i(t)):[],r=s.length>1?`${s.map(a=>a.result.candidateName).join(", ")} share the highest framework score. There is no clear winner from these scores alone. Compare the cash-flow assumptions, exit risks and strength of the evidence before choosing.`:t?`${t.result.candidateName} has the strongest average across the four framework dimensions among your qualified candidates. Review its counter-case before deciding.`:"No candidate has cleared every level and the final evidence gate yet. The comparison shows where each investigation needs work.";Ae("#dialogContent").innerHTML=`<p>${ht(r)}</p><div class="compare-grid">${n.map((a,o)=>`<article class="compare-card"><small>${a.qualified?"QUALIFIED FOR SHORTLIST REVIEW":"INVESTIGATION IN PROGRESS"}</small><h3>${ht(a.candidateName)}</h3><p>${a.completed} / 7 levels cleared</p>${a.dimensions.map(l=>`<div class="score-row"><span>${ht(l.label)}</span><b>${l.score}/100</b></div>`).join("")}<p>${ht(a.hardStops[0]||a.blockers[0]||a.counterThesis)}</p><button class="secondary-button" data-switch="${ht(V.candidates[o].id)}">Open journey</button></article>`).join("")}</div><p class="source-line">Scores reflect your supplied inputs. Evidence quality, hard stops and the investor's situation take priority over the average.</p>`}catch(n){Ae("#dialogContent").textContent=n.message}}}function mx(n=""){At.setCandidate(mt()),At.open("chat",{prompt:n})}async function W1(){V.busy||At.isBusy()||(At.setCandidate(mt()),await At.open("chat",{analyze:!0}))}async function ml(n){if(V.busy||At?.isBusy()||!V.candidates.some(e=>e.id===n)){wr();return}window.speechSynthesis?.cancel(),V.active=n,V.level=0,V.checkpoint=null,V.evaluation=null,V.revision++,At?.setCandidate(mt()),Vn(),wr(),yn(),is(),V.world?.overview();try{await gl(),yn()}catch(e){Nt(e.message)}}function q1(){Ae("#candidateSelect").addEventListener("change",n=>ml(n.target.value)),Ae("#levelRail").addEventListener("click",n=>{let e=n.target.closest("[data-level]");e&&pm(Number(e.dataset.level))}),Ae("#levelContent").addEventListener("click",n=>{let e=n.target.closest("button");if(!(!e||V.busy)){if(e.dataset.checkpoint!==void 0){V.checkpoint=Number(e.dataset.checkpoint),yn(),V.world?.focus(V.level,!0),Ae("#levelPanel").scrollTop=0;return}switch(e.dataset.action){case"overview":V.checkpoint=null,yn(),V.world?.focus(V.level);break;case"enter":{let t=Ct[V.level].checkpoints;V.checkpoint=Math.max(0,t.findIndex(i=>Ua(mt(),i,ss).length)),yn(),V.world?.focus(V.level,!0);break}case"next":pm(V.level+1);break;case"check":px();break;case"challenge":mx(`Help me resolve the ${Ct[V.level].subject} level. ${Er()?.blockers?.[0]||Er()?.summary||"What evidence am I missing?"}`);break;case"report":W1();break}}}),Ae("#levelContent").addEventListener("input",n=>{let e=n.target;if(e.dataset.field)mt()[ss[e.dataset.field].scope][e.dataset.field]=e.value;else if(e.dataset.proof){let t=Ct[V.level].checkpoints[V.checkpoint].id;mt().evidence[t]||={},mt().evidence[t][e.dataset.proof]=e.value}else return;Sx()}),Ae("#levelContent").addEventListener("submit",n=>{n.preventDefault(),px()}),Ae("#newCandidate").addEventListener("click",()=>{if(V.busy||At?.isBusy())return;if(V.candidates.length>=4){Nt("Keep up to four active properties. Export and reset one to start another.");return}let n=Oa();V.candidates.push(n),ml(n.id)}),Ae("#compareButton").addEventListener("click",G1),Ae("#assistantButton").addEventListener("click",()=>mx()),Ae("#exportButton").addEventListener("click",fx),Ae("#resetButton").addEventListener("click",()=>{V.busy||At?.isBusy()||wx("Reset this property?",`<p>This clears the selected property's inputs, checkpoint notes, browser chat and local report. Other properties and your account history remain available.</p><div class="dialog-actions"><button class="secondary-button" data-dialog-action="cancel">Keep my progress</button><button class="primary-button" data-dialog-action="reset">Clear this property</button></div>`)}),Ae("#dialogClose").addEventListener("click",()=>{window.speechSynthesis?.cancel(),Ae("#workspaceDialog").close()}),Ae("#workspaceDialog").addEventListener("close",()=>window.speechSynthesis?.cancel()),Ae("#dialogContent").addEventListener("click",n=>{let e=n.target.closest("button");if(e){if(e.dataset.switch&&!V.busy&&(Ae("#workspaceDialog").close(),ml(e.dataset.switch)),e.dataset.dialogAction==="cancel"&&Ae("#workspaceDialog").close(),e.dataset.dialogAction==="reset"&&!V.busy){let t=V.candidates.findIndex(i=>i.id===V.active);V.candidates[t]=Oa(),Ae("#workspaceDialog").close(),ml(V.candidates[t].id)}e.dataset.dialogAction==="export"&&fx(),e.dataset.dialogAction==="print"&&window.print()}}),Ae("#resetView").addEventListener("click",()=>V.world?.overview()),Ae("#motionToggle").addEventListener("click",()=>{V.paused=!V.paused,V.world?.pause(V.paused),vl()}),Ae("#mapToggle").addEventListener("click",()=>{V.flat=!V.flat,document.body.classList.toggle("flat-view",V.flat),V.world?.flat(V.flat),vl()}),xx.addEventListener("change",n=>{V.paused=n.matches,V.world?.pause(V.paused),vl()}),window.addEventListener("pagehide",()=>{Vn(),window.speechSynthesis?.cancel(),V.world?.dispose()}),window.addEventListener("pageshow",n=>{n.persisted&&location.reload()})}function vl(){Ae("#motionToggle").textContent=V.paused?"Resume motion":"Pause motion",Ae("#motionToggle").setAttribute("aria-pressed",String(V.paused)),Ae("#mapToggle").textContent=V.flat?"3D view":"List view",Ae("#mapToggle").setAttribute("aria-pressed",String(V.flat))}function gx(n){V.userId=n||null,V.storageKey=`apex.journey.v1:${n||`guest-${ns}`}`;let e=yl.read(V.storageKey,{});V.candidates=(Array.isArray(e.candidates)?e.candidates:[]).filter(t=>t&&typeof t.id=="string"&&t.dealCard&&t.financialProfile&&t.evidence).slice(0,4).map(t=>({...t,chat:Array.isArray(t.chat)?t.chat.slice(-40):[]})),V.candidates.length||V.candidates.push(Oa()),V.active=V.candidates.some(t=>t.id===e.active)?e.active:V.candidates[0].id,V.level=0,V.checkpoint=null,V.evaluation=null,V.revision++}function vx(){V.world||hx||(hx=!0,Uv({selectLevel:pm,notify:Nt,reducedMotion:V.paused}).then(n=>{V.world=n,n.pause(V.paused||document.body.classList.contains("workspace-active")||document.body.classList.contains("assistant-active")),is(),vl()}).catch(()=>{document.body.classList.add("flat-view"),Ae("#worldLoading").hidden=!0,Nt("The illustrated map is available while 3D is unavailable. Your checkpoint forms still work.")}))}async function j1(){ss=await bd("/journey/fields.json",null,2e4);let n;try{n=(await bd("/api/auth/me",null,12e3)).user}catch{Nt("Account connection is unavailable. The journey will use this browser's guest space.")}gx(n?.id),At=dx({getCandidate:mt,notify:Nt,beforeOpen:async e=>{["chat","deal","profile","valuation","guidance"].includes(e)&&await Di?.prepareTools(mt()),yd()},onVisibility(e){V.world?.pause(e||V.paused),e||(vx(),yn(),gl().then(()=>{fm(V.level)||(V.level=0,V.checkpoint=null),yn()}).catch(t=>Nt(t.message)))}}),Di=$v({openTool:e=>At.open(e),notify:Nt,onInvestigationDeleted(e){V.candidates=V.candidates.filter(t=>t.investigationId!==e),V.candidates.length||V.candidates.push(Oa()),mt()||(V.active=V.candidates[0].id),V.evaluation=null,V.revision++,V.level=0,V.checkpoint=null,At.setCandidate(mt()),Vn(),wr(),yn(),is(),yd()},onContextSaved(e,t){let i=V.candidates.find(s=>s.investigationId===e);i&&(i.assistantRevision=t.working?.revision||0,i.assistantSynced=un(t.toolContext||t.working||{}),Vn())},onContextState(e,t,i){let s=V.candidates.find(r=>r.investigationId===e);s&&(s.assistantSyncStatus=t,s.assistantPending=t!=="saved",s.assistantSyncError=i?.message||"",yd(),Vn())},useProperty(e,t={}){if(!e?.selected)return!1;let i=V.candidates.find(s=>s.investigationId===e.id);if(i&&!i.assistantSynced&&!t.replace&&JSON.stringify(un(i))!==JSON.stringify(un(e.toolContext||{dealCard:e.selected.dealCard}))&&(i.assistantPending=!0,Di?.holdContext(i,e)),!i){let s=V.candidates.findIndex(r=>!Object.keys(r.dealCard).length&&!Object.keys(r.financialProfile).length&&!Object.keys(r.evidence).length&&!r.messages?.length&&!r.chat?.length);if(V.candidates.length>=4&&s<0)return Nt("Export and reset an unused tool property slot first. Your investigation remains saved.",!0),!1;i={...Oa(),investigationId:e.id},s>=0?V.candidates[s]=i:V.candidates.push(i)}if(!i.assistantPending||t.replace){let s=un(e.toolContext||e.working||{dealCard:e.selected.dealCard});JSON.stringify(un(i))!==JSON.stringify(s)&&(i.report=null),Object.assign(i,s,{assistantRevision:e.working?.revision||0,assistantSynced:structuredClone(s),assistantPending:!1,assistantSyncStatus:"saved",assistantSyncError:""})}return V.active=i.id,V.evaluation=null,V.level=0,V.checkpoint=null,V.revision++,At.setCandidate(mt()),Vn(),wr(),yn(),is(),yd(),!0}});for(let e of V.candidates)e.assistantPending&&Di.queueContext(e);if(document.addEventListener("apex:leave-assistant",()=>Di.hide()),document.querySelector('[data-area="assistant"]').addEventListener("click",()=>{if(At.isBusy()||V.busy){Nt("Let the current tool request finish first.");return}Di.resume(mt()?.investigationId),V.world?.pause(!0)}),document.addEventListener("apex:context",e=>{let t=e.detail,i=mt();if(t.candidateId!==i.id)return;let s=JSON.stringify(i.dealCard)!==JSON.stringify(t.dealCard)||JSON.stringify(i.financialProfile)!==JSON.stringify(t.financialProfile)||JSON.stringify(i.dcfContext||{})!==JSON.stringify(t.dcfContext||{});i.dealCard=t.dealCard,i.financialProfile=t.financialProfile,i.dcfContext=t.dcfContext,t.sessionId!==void 0&&(i.sessionId!==t.sessionId&&(i.report=null),i.sessionId=t.sessionId),t.messages&&(i.messages=t.messages.slice(-40)),s?Sx():Vn(),t.report&&(i.report=t.report,Vn())}),document.addEventListener("apex:busy",e=>{for(let t of["candidateSelect","newCandidate","compareButton"])Ae("#"+t).disabled=e.detail}),document.addEventListener("apex:recover-draft",e=>{if(V.busy||At.isBusy())return;let t=V.candidates.findIndex(s=>!Object.keys(s.dealCard).length&&!Object.keys(s.financialProfile).length&&!Object.keys(s.evidence).length&&!s.messages?.length&&!s.chat?.length);if(V.candidates.length>=4&&t<0){Nt("Export and reset an unused property before recovering another draft.");return}let i=Oa();for(let[s,r]of Object.entries(ss)){let a=e.detail?.[r.scope]?.[s];(typeof a=="string"||typeof a=="number")&&(i[r.scope][s]=String(a).slice(0,500))}t>=0?V.candidates[t]=i:V.candidates.push(i),ml(i.id).then(()=>At.open("deal"));try{localStorage.setItem("apex.workspace.recovered","true")}catch{}document.querySelector(".draft-recovery")?.remove(),Nt("Earlier inputs recovered as a separate property. Recheck the evidence before proceeding.")}),document.addEventListener("apex:auth",e=>{let t=e.detail?.id||null;if(V.userId!==t){Vn(),gx(t),At.setCandidate(mt());for(let i of V.candidates)i.assistantPending&&Di.queueContext(i);wr(),yn(),is(),Vn(),document.body.classList.contains("assistant-active")||gl().then(yn).catch(i=>Nt(i.message))}}),wr(),yn(),is(),vl(),q1(),Vn(),location.hash&&location.hash!=="#assistant")try{await gl(),yn()}catch(e){Nt(e.message,!0)}document.body.dataset.ready="true",!location.hash||location.hash==="#assistant"?Di.show():location.hash==="#journey"?(Di.hide(),vx()):At.restoreRoute()}j1().catch(n=>{Nt(`The journey could not finish loading: ${n.message}. Please reload to reconnect. Your saved property data is retained.`,!0)});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
