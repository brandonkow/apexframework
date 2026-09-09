var Fx=Object.defineProperty;var Bx=(n,e)=>()=>(n&&(e=n(n=0)),e);var $x=(n,e)=>{for(var t in e)Fx(n,t,{get:e[t],enumerable:!0})};var vx={};$x(vx,{initializeFeatures:()=>G1,openWorkspaceFeature:()=>j1,setWorkspaceCandidate:()=>q1,workspaceBusy:()=>W1});function Xu(n={}){Yo&&document.dispatchEvent(new CustomEvent("apex:context",{detail:{candidateId:Yo,dealCard:is(),financialProfile:Na(),dcfContext:xd(),...n}}))}function nn(n){document.dispatchEvent(new CustomEvent("apex:surface",{detail:n}))}function Kt(n){Tn=n,document.dispatchEvent(new CustomEvent("apex:busy",{detail:Tn})),An.disabled=n,VM.disabled=n,Ho.disabled=n,Zn.disabled=n,vy.disabled=n,Ku.disabled=n,wy.disabled=n,Zi&&(Zi.disabled=n)}function pl(){try{let n=JSON.parse(window.localStorage.getItem("apex.journey.client"));if(/^[A-Za-z0-9_-]{16,128}$/.test(n||""))return n}catch{}return Yo||crypto.randomUUID()}function Li(n){return String(n??"").replace(/EstateLab/gi,"Apex Analytic").replace(/Jarvis/gi,"Apex")}function m(n){return Li(n).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[e])}function _e(n,e){let t={"System ready":"Ready","Connection issue":"Offline","Voice interrupted":"Voice issue",Resetting:"Starting"}[n]||n;zM.innerHTML=`<i></i> ${m(t).toUpperCase()}`,HM.textContent=e,document.querySelector("#conversation").hidden&&/Connection issue|Voice interrupted/.test(n)&&document.dispatchEvent(new CustomEvent("apex:notice",{detail:e}))}function Ps(n){GM.textContent=n}function yb(n){let e=String(n||"").toLowerCase();return e.trim()?/\b(compare|comparison|versus| vs |which one|option a|option b|better between)\b/.test(` ${e} `)?{id:"compare",...hr.compare}:/\b(offer|negotiate|negotiation|booking|walk.?away|counter.?offer|asking price|max price)\b/.test(e)?{id:"offer",...hr.offer}:/\b(checklist|check list|steps|to.?do|action list|what next|next actions)\b/.test(e)?{id:"checklist",...hr.checklist}:/\b(voice|read|earphone|summary|short answer|brief)\b/.test(e)?{id:"voice",...hr.voice}:/\b(buy|purchase|deal|invest|shortlist|screen|condo|apartment|property|rent|rental|yield|price)\b/.test(e)?{id:"screen",...hr.screen}:{id:"chat",...hr.chat}:{id:"chat",...hr.chat}}function od(n=An.value){let e=yb(n);return Ap&&(Ap.textContent=e.label,Ap.title=e.prompt),Mu.dataset.inputMode=e.id,Mu.setAttribute("aria-label",e.prompt),An.placeholder=e.placeholder,e}function ET(n){let e=Li(n).replace(/\s+/g," ").trim();if(e.length<=520)return e;let t=e.match(/[^.!?]+[.!?]?/g)||[e],i="";for(let s of t){let r=`${i} ${s}`.trim();if(r.length>420)break;i=r}return`${i||e.slice(0,420)} Full answer is on screen.`}function ld(){try{let n=JSON.parse(window.localStorage.getItem(ub)||"[]");return Array.isArray(n)?n.slice(0,12):[]}catch{return[]}}function MT(n=[]){window.localStorage.setItem(ub,JSON.stringify(n.slice(0,12)))}function AT(){let n=ld();if(!n.length)return"";let e=n[0],t=Yf.map(i=>{let s=n.filter(r=>r.value===i.id).length;return s?`${i.label}: ${s}`:""}).filter(Boolean).join(", ");return[e?.note?`Latest feedback: ${e.note}`:"",t?`Recent feedback pattern: ${t}.`:""].filter(Boolean).join(" ")}function TT(n){if(!n)return"";let e=ld().find(t=>t.messageId===n)?.value||"";return`
    <section class="responseFeedback" data-feedback-message="${m(n)}" aria-label="Answer feedback">
      <span>Answer feel</span>
      ${Yf.map(t=>`
        <button type="button" data-response-feedback="${m(t.id)}" class="${e===t.id?"active":""}">
          ${m(t.label)}
        </button>
      `).join("")}
      <button type="button" data-response-refine hidden>REFINE NOW</button>
    </section>
  `}function CT(n={}){let e=Li(n.refinementSource||n.answer||"").replace(/\s+/g," ").trim();return!e||n.value==="useful"?"":n.value==="shorter"?`Rewrite your previous answer into a short Apex answer: verdict, strongest reason, main risk, and next action only. Keep the same investment judgment unless new evidence is provided. Previous answer: ${e}`:n.value==="warmer"?`Rewrite your previous answer in a more natural mentor-like tone. Keep it human, direct, and calm. Do not weaken the evidence standard or change the verdict. Previous answer: ${e}`:n.value==="evidence"?`For your previous answer, give me the missing-proof checklist only. Separate hard stop, verify next, and optional evidence. Do not change the verdict without new evidence. Previous answer: ${e}`:""}function bb(n,e){let t=n?.querySelector("[data-response-refine]");if(!t)return;let i=CT(e);t.hidden=!i,t.disabled=!1,t.setAttribute("data-refinement-prompt",i),t.textContent=e?.value==="evidence"?"PROOF CHECK":"REFINE NOW"}function RT(n){n.querySelectorAll("[data-feedback-message]").forEach(e=>{let t=e.getAttribute("data-feedback-message")||"",i=ld().find(s=>s.messageId===t);i&&bb(e,i)})}async function IT(n){if(yt)try{let e=await Ye("/api/memory/answer-style",{method:"POST",body:JSON.stringify(n)});e?.stored&&!Ca.hidden&&Zf(e.settings||{})}catch{}}function PT(n){let e=n.closest("[data-feedback-message]");if(!e)return;let t=e.getAttribute("data-feedback-message")||"",i=n.getAttribute("data-response-feedback")||"",s=Yf.find(l=>l.id===i);if(!t||!s)return;let r=Li(e.closest(".message")?.querySelector(".messageText")?.textContent||"").replace(/\s+/g," ").trim(),a={messageId:t,value:i,label:s.label,note:s.note,answer:r.slice(0,180),refinementSource:r.slice(0,900),createdAt:new Date().toISOString()},o=[a,...ld().filter(l=>l.messageId!==t)];MT(o),e.querySelectorAll("[data-response-feedback]").forEach(l=>{l.classList.toggle("active",l===n)}),bb(e,a),_e("System ready",`Feedback saved. ${s.note}`),IT(a)}async function LT(n){let e=n.getAttribute("data-refinement-prompt")||"";if(e){n.disabled=!0;try{await Oa(e)}finally{n.disabled=!1}}}function ol(n){ts=n==="register"?"register":"login";let e=ts==="register";ff.textContent=e?"CREATE ACCOUNT":"SIGN IN",XM.hidden=!e,by.required=e,Op.autocomplete=e?"new-password":"current-password",kp.textContent=e?"CREATE ACCOUNT":"SIGN IN",xy.textContent=e?"SIGN IN":"CREATE ACCOUNT",_y.hidden=e||!ba,wa.textContent=""}function Kf(n){vf.hidden=!n,mf.hidden=n||!!yt,ff.textContent=n?"RESET PASSWORD":ts==="register"?"CREATE ACCOUNT":"SIGN IN",xa.textContent="",n&&(Au.value=gf.value.trim(),Au.focus())}function fl(n){yt=n||null,document.dispatchEvent(new CustomEvent("apex:auth",{detail:yt}));let e=!!yt,t=String(yt?.displayName||"GUEST").trim().split(/\s+/)[0];if(qM.textContent=t.slice(0,16).toUpperCase(),mf.hidden=e,vf.hidden=!0,KM.hidden=!e,Yu.hidden=!e,Zu.hidden=!e,Qu.hidden=!e,oA.hidden=!e,Ey.hidden=!e,ff.textContent=e?"ACCOUNT":ts==="register"?"CREATE ACCOUNT":"SIGN IN",e||(pn(),fn(),mn(),sn(),gn(),vn(),yn(),hn(),jo=null),e){JM.textContent=yt.displayName,ZM.textContent=yt.email;let i=ba||mb;Zv.textContent=yt.emailVerified?"VERIFIED":i?"UNVERIFIED":"VERIFICATION OPTIONAL",Zv.classList.toggle("verified",!!yt.emailVerified),Tu.hidden=!!yt.emailVerified||!ba,Cu.hidden=!!yt.emailVerified||!ba,Ru.hidden=!!yt.emailVerified||!ba,pC()}Oi()}function Ia(){nn("account"),pn(),fn(),mn(),sn(),gn(),vn(),yn(),hn(),Cn(),Rn(),pf.hidden=!1,hf.setAttribute("aria-expanded","true"),document.body.classList.add("accountOpen"),fl(yt),yt||gf.focus()}function Hn(){pf.hidden=!0,hf.setAttribute("aria-expanded","false"),document.body.classList.remove("accountOpen"),wa.textContent=""}function hn(){Bf.hidden=!0,Ff.setAttribute("aria-expanded","false"),document.body.classList.remove("trustOpen"),vr="",cd()}function Jf(n=""){nn("trust"),vr=n,Hn(),pn(),fn(),mn(),sn(),gn(),vn(),yn(),Cn(),Rn(),Bf.hidden=!1,Ff.setAttribute("aria-expanded","true"),document.body.classList.add("trustOpen"),cd()}function xb(){try{return JSON.parse(window.localStorage.getItem(tf)||"null")||null}catch{return window.localStorage.removeItem(tf),null}}function _b(){return xb()?.version==="v6.1"}function cd(){let n=_b();VA.dataset.state=n?"accepted":"pending",HA.textContent=n?"Boundary acknowledged":"Acknowledgement required",zA.textContent=n?"Formal deal reports can run on this device. Professional review and live evidence still apply.":vr==="deal-analysis"?"Accept this boundary to continue with the formal deal report.":"You can chat freely. Deal reports require this boundary to be accepted first.",Wp.textContent=n?"ACKNOWLEDGED":vr==="deal-analysis"?"ACCEPT & ANALYSE":"I UNDERSTAND",Wp.disabled=n&&!vr}function NT(){window.localStorage.setItem(tf,JSON.stringify({version:"v6.1",acceptedAt:new Date().toISOString(),scope:"formal-deal-reports"}));let n=vr;vr="",cd(),_e("System ready","Trust boundary acknowledged."),n==="deal-analysis"&&(hn(),cl())}function DT(n){return _b()?!0:(Jf(n),_e("Trust boundary","Acknowledge Apex's role before generating a formal report."),!1)}function OT(n){if(!n)return"";let e=new Date(n);return Number.isNaN(e.getTime())?"":new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(e)}function Sb(){let n=xb(),e=n?.version==="v6.1",t=OT(n?.acceptedAt);return{status:e?"accepted":"pending",label:e?"BOUNDARY ACCEPTED":"BOUNDARY PENDING",detail:e?`Accepted ${t||"on this device"}. Apex is decision support only; live proof and professional review still apply.`:"Apex is decision support only. Acknowledge the trust boundary before generating new formal reports.",checks:["Not legal, valuation, tax, banking, or financial-planning advice","Verify completed transactions, achieved rent, financing, title/legal, site, and supply evidence","No validation of false documents, hidden cashback, misleading prices, or lender deception"]}}function kT(){let n=Sb();return`
    <section class="analysisTrustStamp ${m(n.status)}" aria-label="Report trust boundary">
      <header><small>V6.2 REPORT TRUST STAMP</small><b>${m(n.label)}</b></header>
      <p>${m(n.detail)}</p>
      <div>${n.checks.map(e=>`<span>${m(e)}</span>`).join("")}</div>
    </section>
  `}function UT(){let n=Sb();return["Report trust boundary:",`- ${n.label}: ${n.detail}`,...n.checks.map(e=>`- ${e}`)]}function Uo(n={},e="",t=[]){let i=Number(n.score||0),s=String(n.status||"").toLowerCase();return t.some(a=>e.includes(a))||!i||i<55||/missing|weak|danger|fail|reject/.test(s)?"required":i<75||/watch|review|partial|unknown/.test(s)?"verify":"ready"}function wb(n={}){let e=o=>Array.isArray(o)?o:o?[o]:[],t=[...e(n.hardStops),...e(n.recommendationBlockers),...e(n.missingEvidence),n.counterThesis||""].join(" ").toLowerCase(),i=Number(n.investorReadiness?.score||0),s=[{role:"Lawyer",label:"Title and transaction",status:Uo(n.legalTransactionEvidence,t,["title","caveat","consent","restriction","spa","mot","legal"]),action:"Check title, caveat, restrictions, consent timeline, SPA conditions, outstanding charges, and transaction authority."},{role:"Banker",label:"Financing and valuation",status:Uo(n.financingValuationEvidence,t,["loan","valuation","financing","dsr","bank","cashback","cash out"]),action:"Confirm valuation support, loan margin, DSR, disbursement timing, and that the structure does not mislead the lender."},{role:"Valuer / comparable proof",label:"Entry price evidence",status:Uo(n.transactionComparableEvidence,t,["transaction","comparable","auction","price","value"]),action:"Verify completed subsale and successful auction comparables. Listing prices should not be treated as proof."},{role:"Management / JMB",label:"Site and building quality",status:Uo(n.siteManagementEvidence,t,["management","jmb","lift","leak","defect","resident","site"]),action:"Check arrears, lift waiting time, cleanliness, defect pattern, management response, resident behaviour, and site feel."},{role:"Rental agent / property manager",label:"Achieved rent and tenant demand",status:Uo(n.achievedRentalEvidence,t,["rent","tenant","vacancy","furnishing","rental"]),action:"Verify achieved rent, tenant profile, vacancy pressure, furnishing scope, and whether rent can cover recurring holding cost."},{role:"Owner / licensed adviser",label:"Personal affordability",status:i>=75?"ready":i>=55?"verify":"required",action:"Stress-test cash reserve, instalment comfort, life commitments, tax and transaction costs, renovation budget, and holding period."}],r=s.filter(o=>o.status==="required").length,a=s.filter(o=>o.status==="verify").length;return{status:r?"required":a?"verify":"ready",summary:r?`${r} professional review lane${r===1?"":"s"} need attention before commitment.`:a?`${a} review lane${a===1?"":"s"} should be verified before money moves.`:"Core professional review lanes look ready, subject to live evidence.",items:s}}function FT(n={}){let e=wb(n);return`
    <section class="analysisProfessionalReview ${m(e.status)}" aria-label="Professional review checklist">
      <header><span><small>V6.3 PROFESSIONAL REVIEW</small><b>${m(e.summary)}</b></span></header>
      <div>
        ${e.items.map(t=>`
          <article class="professionalReviewItem ${m(t.status)}">
            <i>${m(t.status)}</i>
            <span><b>${m(t.role)} / ${m(t.label)}</b><small>${m(t.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function BT(n={}){let e=wb(n);return["Professional review checklist:",`- ${e.summary}`,...e.items.map(t=>`- ${t.role} / ${t.label} / ${t.status}: ${t.action}`)]}function es(n){return Array.isArray(n)?n.filter(Boolean):n?[n]:[]}function $T(n={}){return[...es(n.hardStops),...es(n.recommendationBlockers),...es(n.watchouts),...es(n.missingEvidence),n.counterThesis,n.challengeMode?.message,n.legalTransactionEvidence?.summary,n.legalTransactionEvidence?.transactionPosition,n.financingValuationEvidence?.summary,n.financingValuationEvidence?.affordabilityPosition,n.siteManagementEvidence?.summary].filter(Boolean).join(" ").toLowerCase()}function Pp(n={}){let e=String(n.status||"").toLowerCase(),t=Number(n.score||0);return/unsafe|danger|blocked|fail|reject/.test(e)||t>0&&t<25}function ud(n={}){let e=$T(n),t=[],i=(a,o,l)=>{t.some(c=>c.label===o)||t.push({level:a,label:o,action:l})};/marked.?up|mark.?up|hidden cashback|cashback|cash back|false document|fake document|mislead|lender deception|side agreement|side payment|direct payment|outside stakeholder|bypass/.test(e)&&i("refuse","Misleading financing or fund-flow risk","Apex will not validate artificial pricing, hidden cashback, false documents, side agreements, or lender deception."),(Pp(n.legalTransactionEvidence)||/caveat|title risk|seller authority|probate|bankrupt|litigation|restriction|consent|stakeholder/.test(e))&&i("refuse","Legal, title, or seller-authority stop","Pause until the lawyer clears title, caveat, restrictions, seller authority, stakeholder flow, arrears, and completion path."),(Pp(n.financingValuationEvidence)||/valuation mismatch|loan rejection|dsr|overleverage|bankability|loan margin/.test(e))&&i("block","Bankability or affordability risk","Do not force the financing. Confirm valuation support, DSR, cash buffer, instalment stress, and clean document readiness."),/bulk purchase|bulk-purchase|many auction|auction cases|investor concentration|airbnb|short.?stay/.test(e)&&i("block","Bulk-purchase or investor-concentration risk","Treat the project as exit-sensitive until ownership mix, auction pressure, resident quality, and rental sustainability are proven."),(Pp(n.siteManagementEvidence)||/management dispute|jmb|self interest|leak|defect|resident behaviour|poor management/.test(e))&&i("block","Project quality or management risk","Do not let cheap entry override poor management, defects, resident issues, or weak site evidence."),(String(n.verdict||"").toUpperCase()==="REJECT"||es(n.hardStops).length)&&i("refuse","Hard stop triggered","Resolve or walk away from hard stops before paying, signing, or committing further capital.");let r=t.filter(a=>a.level==="refuse").length?"refuse":t.length?"block":"clear";return{status:r,label:r==="refuse"?"APEX REFUSES VALIDATION":r==="block"?"VALIDATION BLOCKED":"NO UNSAFE STRUCTURE DETECTED",summary:r==="refuse"?"Apex will not validate this deal as structured. Independent legal, financing, and transaction review must clear the issue first.":r==="block"?"Apex cannot support commitment yet. Clear the blocked compliance or evidence lane before treating the deal as investable.":"No compliance-refusal pattern is detected from the supplied inputs. This is not legal clearance.",flags:t.length?t:[{level:"clear",label:"Boundary still applies",action:"Continue to verify live evidence, professional review, and clean financing or legal structure before committing."}]}}function VT(n={}){let e=ud(n);return`
    <section class="analysisComplianceRefusal ${m(e.status)}" aria-label="Unsafe deal and compliance boundary">
      <header><span><small>V6.4 UNSAFE DEAL BOUNDARY</small><b>${m(e.label)}</b></span></header>
      <p>${m(e.summary)}</p>
      <div>
        ${e.flags.map(t=>`
          <article class="complianceFlag ${m(t.level)}">
            <i>${m(t.level)}</i>
            <span><b>${m(t.label)}</b><small>${m(t.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function HT(n={}){let e=ud(n);return["Unsafe deal boundary:",`- ${e.label}: ${e.summary}`,...e.flags.map(t=>`- ${t.level}: ${t.label}. ${t.action}`)]}function Eb(n={}){let e=ud(n),t=Number(n.confidence||0),i=Number(n.averageScore||0),s=!!(yt&&jo?.plan?.id&&jo.plan.id!=="free"),r=yt?jo?.plan?.name||"Signed-in plan":"Guest / public",a=e.status==="refuse"?"blocked":e.status==="block"||t<50||i<55?"conditional":t>=75&&i>=70?"higher":"moderate";return{status:a,label:a==="blocked"?"Do Not Market As Investable":a==="conditional"?"Conditional Public Confidence":a==="higher"?"Higher Confidence, Still Conditional":"Moderate Public Confidence",planName:r,summary:a==="blocked"?"This report should be treated as a refusal or unresolved-risk record, not a sales or investment endorsement.":"Public confidence is limited by evidence quality, hard-stop status, and professional review. Payment status never upgrades a verdict.",items:[{label:"Payment boundary",body:`${s?`${r} unlocks more workflow capacity.`:`${r} access may be limited.`} Plans affect report access, saved history, and usage limits only; they never improve scores or remove hard stops.`},{label:"Confidence source",body:`Confidence is ${t||0}% and decision score is ${i||0}/100 because of supplied evidence, not because of account status or payment.`},{label:"Public use",body:"Do not present this report as guaranteed return, valuation, legal clearance, loan approval, or personalized licensed financial advice."}]}}function zT(n={}){let e=Eb(n);return`
    <section class="analysisCommercialGuardrail ${m(e.status)}" aria-label="Public confidence and monetization guardrails">
      <header><span><small>V6.5 PUBLIC CONFIDENCE</small><b>${m(e.label)}</b></span><em>${m(e.planName)}</em></header>
      <p>${m(e.summary)}</p>
      <div>
        ${e.items.map(t=>`
          <article class="commercialGuardrailItem">
            <b>${m(t.label)}</b>
            <small>${m(t.body)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `}function GT(n={}){let e=Eb(n);return["Public confidence and monetization guardrails:",`- ${e.label} / ${e.planName}: ${e.summary}`,...e.items.map(t=>`- ${t.label}: ${t.body}`)]}function Fo(n=[],e=/reject|weak|poor|high threat|serious|many|stale|delay|dispute|bad|none|not done|not supplied/i){let t=n.filter(i=>String(i||"").trim());return t.length?t.some(i=>e.test(String(i)))?"watch":"ready":"missing"}function ws(n=[],e="Not supplied"){let t=n.filter(i=>String(i||"").trim());return t.length?t.join(" / "):e}function Mb(n={}){let e=n.context?.dealCard||{},t=n.marketIntelligence||{},i=Array.isArray(t.observations)?t.observations:[],s=Array.isArray(t.trends)?t.trends:[],r=t.summary||{},a={project:e.projectName||"Project not specified",area:e.area||"Area not specified",segment:ws([e.propertyType,e.propertyAge?`${e.propertyAge} years`:""],"Segment not supplied"),tenure:ws([e.tenure,e.legalTitleType],"Tenure/title not supplied"),price:ws([e.askingPrice,e.conservativeFairValue?`value ${e.conservativeFairValue}`:""],"Price/value not supplied")},o=[{label:"Owner observations",value:i.length?`${i.length} matched, ${s.length} trend${s.length===1?"":"s"}`:"No matched project memory",status:i.length?"ready":"missing",action:i.length?"Use the observations as project memory, but check dates and source confidence.":"Add dated owner observations for rent, transaction, occupancy, management, supply, auction, or buyer enquiry."},{label:"Supply moat",value:ws([e.supplyRadius,e.substituteCount,e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply]),status:Fo([e.substituteThreat,e.futureSupplyTiming,e.unsoldStockSignal,e.densityLiftStress,e.nearbySupply],/high|serious|many|oversupply|vp|unsold|lift|wait|dense|1\.5k/i),action:"Track closest substitutes within 2.5km, VP timing, unsold stock, layout overlap, and lift/density pressure."},{label:"Management culture",value:ws([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes]),status:Fo([e.managementQuality,e.managementResponseSignal,e.arrearsJmbSignal,e.residentBehaviourSignal,e.siteManagementNotes],/poor|slow|no reply|arrears|dispute|complaint|bad|leak|defect|arrogant|irresponsible/i),action:"Verify JMB response speed, arrears, resident behaviour, common-area upkeep, defects, and complaint culture."},{label:"Buyer depth",value:ws([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation]),status:Fo([e.exitBuyerPool,e.ownStayAppeal,e.resalePreparation],/investor only|weak|poor|narrow|airbnb|short.?stay|none/i),action:"Confirm the project can appeal to own-stay buyers and investors instead of one narrow exit pool."},{label:"Liquidity proof",value:ws([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport]),status:Fo([e.comparableTransactions,e.comparableSource,e.comparableRecency,e.bankValuationSupport],/none|old|stale|listing|weak|mismatch|not done/i),action:"Use completed subsale transactions, successful auction bids, bankability, and matched comparable adjustments before trusting value."},{label:"Rental defence",value:ws([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal]),status:Fo([e.expectedRent,e.rentEvidence,e.rentalSource,e.rentalSustainability,e.vacancySignal],/none|weak|stale|vacancy|incentive|seasonal|drop|poor/i),action:"Confirm achieved rent, tenant urgency, furnishing gap, vacancy pressure, and whether rent can defend the instalment."}],l=o.filter(h=>h.status==="missing").length,d=o.filter(h=>h.status==="watch").length?"watch":l>=3?"thin":l?"partial":"tracked",u=e.projectName||e.area||"Development profile";return{status:d,title:u,identity:a,evidence:o,observationCount:i.length,trendCount:s.length,freshness:r.warning||(i.length?"Owner observations matched. Verify freshness before relying on them.":"No dated owner observation matched this project or area yet."),summary:d==="watch"?"Development intelligence has live warning signals. Treat the project profile as a watchlist item until the weak lane is cleared.":d==="tracked"?"Development intelligence is well formed enough for project-level comparison, subject to live verification.":d==="partial"?`Development intelligence is partial. Fill the missing lane${l===1?"":"s"} before treating the project view as mature.`:"Development intelligence is still thin. Apex can screen the deal, but it should not behave like it knows the project deeply yet."}}function WT(n={}){let e=Mb(n),t=[["Project",e.identity.project],["Area",e.identity.area],["Segment",e.identity.segment],["Tenure/title",e.identity.tenure],["Price/value",e.identity.price]];return`
    <section class="analysisDevelopmentProfile ${m(e.status)}" aria-label="Development intelligence profile">
      <header>
        <span><small>V7.0 DEVELOPMENT PROFILE</small><b>${m(e.title)}</b></span>
        <em>${m(e.status)}</em>
      </header>
      <p>${m(e.summary)}</p>
      <div class="developmentIdentity">
        ${t.map(([i,s])=>`
          <span><small>${m(i)}</small><b>${m(s)}</b></span>
        `).join("")}
      </div>
      <div class="developmentProfileSignals">
        ${e.evidence.map(i=>`
          <article class="developmentProfileSignal ${m(i.status)}">
            <i>${m(i.status)}</i>
            <span><b>${m(i.label)}</b><small>${m(i.value)}</small><em>${m(i.action)}</em></span>
          </article>
        `).join("")}
      </div>
      <p class="developmentFreshness">${m(e.freshness)}</p>
    </section>
  `}function qT(n={}){let e=Mb(n);return["Development intelligence profile:",`- V7.0 ${e.title} / ${e.status}: ${e.summary}`,`- Identity: ${e.identity.project}; ${e.identity.area}; ${e.identity.segment}; ${e.identity.tenure}; ${e.identity.price}.`,`- Freshness: ${e.freshness}`,...e.evidence.map(t=>`- ${t.label} / ${t.status}: ${t.value}. ${t.action}`)]}function jT(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.observationHealth||{};return`
    <section class="analysisDevelopmentStack ${m(n.status||"thin")}" aria-label="V7 development intelligence stack">
      <header>
        <span><small>V7.1 - V7.10 DEVELOPMENT INTELLIGENCE</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <div class="developmentStackMeta">
        <span><small>POSTURE</small><b>${m(n.posture||"Build evidence first")}</b></span>
        <span><small>OWNER OBSERVATIONS</small><b>${m(i.matched||0)} matched / ${m(i.fresh||0)} fresh</b></span>
        <span><small>STALE</small><b>${m(i.stale||0)} stale</b></span>
      </div>
      ${e.length?`
        <div class="developmentStackLanes">
          ${e.map(s=>`
            <article class="developmentStackLane ${m(s.status||"watch")}">
              <i>${m(s.version||"V7")}</i>
              <span>
                <b>${m(s.label)} <small>${m(s.score||0)}/100</small></b>
                <small>${m(s.reading)}</small>
                <em>${m(s.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="developmentActionQueue">
          <h3>V7 ACTION QUEUE</h3>
          ${t.map(s=>`
            <p><b>${m(s.version)} ${m(s.label)}</b><span>${m(s.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function XT(n={}){if(!n.summary)return[];let e=["V7 development intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Build evidence first"}.`,`- Owner observations: ${n.observationHealth?.matched||0} matched, ${n.observationHealth?.fresh||0} fresh, ${n.observationHealth?.aging||0} aging, ${n.observationHealth?.stale||0} stale.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V7 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function YT(n={}){if(!n.summary)return"";let e=Array.isArray(n.cases)?n.cases:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[];return`
    <section class="analysisCaseIntelligence ${m(n.status||"thin")}" aria-label="Development case library intelligence">
      <header>
        <span><small>CASE LIBRARY V1</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.posture||"Case-informed, verify live")}</p>
      ${e.length?`
        <div class="caseIntelligenceCards">
          ${e.map(i=>`
            <article class="caseIntelligenceItem ${m(i.verdict||"watch")}">
              <header><span><small>${m([i.area,i.propertyType].filter(Boolean).join(" / ")||"Development case")}</small><b>${m(i.projectName)}</b></span><em>${m(lm(i.verdict))} / ${m(i.confidence||"medium")}</em></header>
              <p>${m(i.ownerVerdict||i.summary||"No founder verdict recorded.")}</p>
              <div>
                <span><small>STRENGTH</small><b>${m(i.strengths||"Not stated")}</b></span>
                <span><small>WEAKNESS</small><b>${m(i.weaknesses||"Not stated")}</b></span>
                <span><small>SOURCE</small><b>${m(i.sourceBasis||"Owner case note")}</b></span>
              </div>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="caseActionQueue">
          <h3>CASE ACTION QUEUE</h3>
          ${t.map(i=>`<p><b>${m(i.label)}</b><span>${m(i.action)}</span></p>`).join("")}
        </div>
      `:""}
    </section>
  `}function KT(n={}){if(!n.summary)return[];let e=["Development case library:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Case-informed, verify live"}.`];for(let t of n.cases||[])e.push(`- ${t.projectName}: ${lm(t.verdict)} / ${t.confidence||"medium"} confidence / ${t.rating||0}/100. ${t.ownerVerdict||t.summary||""}`);if(n.actionQueue?.length){e.push("Case action queue:");for(let t of n.actionQueue)e.push(`- ${t.label}: ${t.action}`)}return e}function JT(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.matchedEvidence)?n.matchedEvidence:[],i=Array.isArray(n.actionQueue)?n.actionQueue:[],s=n.vaultHealth||{};return`
    <section class="analysisDocumentStack ${m(n.status||"thin")}" aria-label="V8 document intelligence stack">
      <header>
        <span><small>V8.1 - V8.10 DOCUMENT INTELLIGENCE</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <div class="documentStackMeta">
        <span><small>POSTURE</small><b>${m(n.posture||"Evidence-building mode")}</b></span>
        <span><small>VAULT</small><b>${m(s.documents||0)} docs / ${m(s.indexed||0)} indexed</b></span>
        <span><small>MATCHED</small><b>${m(s.matched||0)} docs / ${m(s.mode||"none")}</b></span>
      </div>
      ${e.length?`
        <div class="documentStackLanes">
          ${e.map(r=>`
            <article class="documentStackLane ${m(r.status||"watch")}">
              <i>${m(r.version||"V8")}</i>
              <span>
                <b>${m(r.label)} <small>${m(r.score||0)}/100</small></b>
                <small>${m(r.reading)}</small>
                <em>${m(r.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="documentMatchedEvidence">
          <h3>MATCHED OWNER EVIDENCE</h3>
          ${t.map(r=>`
            <p><b>${m(r.title)}</b><span>${m(r.preview)}</span><em>${m((r.tags||[]).join(", ")||"untagged")}</em></p>
          `).join("")}
        </div>
      `:""}
      ${i.length?`
        <div class="documentActionQueue">
          <h3>V8 ACTION QUEUE</h3>
          ${i.map(r=>`
            <p><b>${m(r.version)} ${m(r.label)}</b><span>${m(r.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function ZT(n={}){if(!n.summary)return[];let e=["V8 document intelligence stack:",`- ${n.status||"thin"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Evidence-building mode"}.`,`- Vault: ${n.vaultHealth?.documents||0} documents, ${n.vaultHealth?.indexed||0} indexed, ${n.vaultHealth?.matched||0} matched, ${n.vaultHealth?.mode||"none"} retrieval.`];for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.matchedEvidence?.length){e.push("Matched owner evidence:");for(let t of n.matchedEvidence)e.push(`- ${t.title}: ${t.preview}`)}if(n.actionQueue?.length){e.push("V8 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function QT(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=n.capitalMap||{};return`
    <section class="analysisPortfolioCommand ${m(n.status||"hold")}" aria-label="V9 portfolio command stack">
      <header>
        <span><small>V9.1 - V9.10 PORTFOLIO COMMAND</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <div class="portfolioCommandMeta">
        <span><small>POSTURE</small><b>${m(n.posture||"Hold and verify")}</b></span>
        <span><small>NEXT MOVE</small><b>${m(n.nextMove||"Clear weakest lane")}</b></span>
        <span><small>ROLE</small><b>${m(i.portfolioRole||"Not stated")}</b></span>
      </div>
      <div class="portfolioCapitalMap">
        <span><small>CASH</small><b>${m(i.cashAvailable||"Not stated")}</b></span>
        <span><small>OUTLAY</small><b>${m(i.cashOutlay||"Not stated")}</b></span>
        <span><small>AFTER PURCHASE</small><b>${m(i.cashAfterPurchase||"Not calculated")}</b></span>
        <span><small>DSR</small><b>${m(i.postDealDsr||"Not calculated")}</b></span>
        <span><small>HOLDING</small><b>${m(i.holdingCashFlow||"Not calculated")}</b></span>
        <span><small>STRESS</small><b>${m(i.stressedHolding||"Not calculated")}</b></span>
      </div>
      ${e.length?`
        <div class="portfolioCommandLanes">
          ${e.map(s=>`
            <article class="portfolioCommandLane ${m(s.status||"watch")}">
              <i>${m(s.version||"V9")}</i>
              <span>
                <b>${m(s.label)} <small>${m(s.score||0)}/100</small></b>
                <small>${m(s.reading)}</small>
                <em>${m(s.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="portfolioCommandQueue">
          <h3>V9 ACTION QUEUE</h3>
          ${t.map(s=>`
            <p><b>${m(s.version)} ${m(s.label)}</b><span>${m(s.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function eC(n={}){if(!n.summary)return[];let e=n.capitalMap||{},t=["V9 portfolio command stack:",`- ${n.status||"hold"} (${n.score||0}/100): ${n.summary}`,`- Posture: ${n.posture||"Hold and verify"}.`,`- Next move: ${n.nextMove||"Clear the weakest portfolio lane."}`,`- Capital map: cash ${e.cashAvailable||"n/a"}, outlay ${e.cashOutlay||"n/a"}, after purchase ${e.cashAfterPurchase||"n/a"}, reserve ${e.reserveMonths||"n/a"}, DSR ${e.postDealDsr||"n/a"}, holding ${e.holdingCashFlow||"n/a"}, stress ${e.stressedHolding||"n/a"}.`];for(let i of n.lanes||[])t.push(`- ${i.version} ${i.label}: ${i.status}, ${i.score}/100. ${i.reading} Action: ${i.action}`);if(n.actionQueue?.length){t.push("V9 action queue:");for(let i of n.actionQueue)t.push(`- ${i.version} ${i.label}: ${i.action}`)}return t}function tC(n={}){if(!n.summary)return"";let e=Array.isArray(n.lanes)?n.lanes:[],t=Array.isArray(n.actionQueue)?n.actionQueue:[],i=Array.isArray(n.contradictions)?n.contradictions:[];return`
    <section class="analysisFinalCommand ${m(n.status||"investigate")}" aria-label="V10 final command stack">
      <header>
        <span><small>V10.1 - V10.10 FINAL COMMAND</small><b>${m(n.headline||n.command||"Final command")}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <div class="finalCommandDecision">
        <strong>${m(n.command||"INVESTIGATE FIRST")}</strong>
        <p>${m(n.finalAnswer||n.summary)}</p>
      </div>
      <div class="finalCommandMeta">
        <span><small>STATUS</small><b>${m(n.status||"investigate")}</b></span>
        <span><small>NEXT MOVE</small><b>${m(n.nextMove||"Clear weakest lane")}</b></span>
        <span><small>CONTRADICTIONS</small><b>${m(n.contradictionCount||0)}</b></span>
      </div>
      ${i.length?`
        <div class="finalCommandContradictions">
          <h3>CONTRADICTION SCAN</h3>
          ${i.map(s=>`<p>${m(s)}</p>`).join("")}
        </div>
      `:""}
      ${e.length?`
        <div class="finalCommandLanes">
          ${e.map(s=>`
            <article class="finalCommandLane ${m(s.status||"watch")}">
              <i>${m(s.version||"V10")}</i>
              <span>
                <b>${m(s.label)} <small>${m(s.score||0)}/100</small></b>
                <small>${m(s.reading)}</small>
                <em>${m(s.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
      ${t.length?`
        <div class="finalCommandQueue">
          <h3>V10 ACTION QUEUE</h3>
          ${t.map(s=>`
            <p><b>${m(s.version)} ${m(s.label)}</b><span>${m(s.action)}</span></p>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function nC(n={}){if(!n.summary)return[];let e=["V10 final command stack:",`- ${n.command||"INVESTIGATE FIRST"} (${n.score||0}/100): ${n.summary}`,`- Status: ${n.status||"investigate"}.`,`- Next move: ${n.nextMove||"Clear the weakest V10 lane."}`,`- Contradictions: ${n.contradictionCount||0}.`];for(let t of n.contradictions||[])e.push(`- Contradiction: ${t}`);for(let t of n.lanes||[])e.push(`- ${t.version} ${t.label}: ${t.status}, ${t.score}/100. ${t.reading} Action: ${t.action}`);if(n.actionQueue?.length){e.push("V10 action queue:");for(let t of n.actionQueue)e.push(`- ${t.version} ${t.label}: ${t.action}`)}return e}function dy(n){return n==="memory"?"MEMORY":n==="journal"?"JOURNAL":n==="market"?"MARKET":n==="case"?"CASE":n==="saved_report"?"SAVED DEAL":n==="belief"?"BELIEF":n==="decision"?"DECISION":n==="evidence"?"EVIDENCE":n==="research"?"VERIFIED RESEARCH":"REFERENCE"}function Ab(n=[]){if(!n.length)return"";let e=n.reduce((a,o)=>{let l=o?.type||"reference";return a[l]=(a[l]||0)+1,a},{}),t=Object.entries(e).map(([a,o])=>`${o} ${dy(a).toLowerCase()}${o===1?"":" sources"}`).slice(0,5).join(" / "),s=n.some(a=>["evidence","market","case","research","saved_report"].includes(a.type))?"Deal-specific or dated evidence matched. Confirm its date, scope, and fit before acting.":"Framework guidance only. No deal-specific market evidence matched this answer.",r=n.slice(0,8).map(a=>`
    <li>
      <span class="sourceType">${m(dy(a.type))}</span>
      <b>${m(a.title||"Untitled source")}</b>
      ${a.preview?`<small>${m(a.preview)}</small>`:""}
    </li>
  `).join("");return`
    <div class="sourceSummary">
      <p><b>Reasoning basis</b><span>${m(t)}</span></p>
      <p><b>Evidence level</b><span>${m(s)}</span></p>
      <details>
        <summary>See the sources used</summary>
        <ul class="sourceList">${r}</ul>
      </details>
    </div>
  `}function iC(n={}){if(!n||typeof n!="object")return"";let e=Array.isArray(n.prompts)?n.prompts.slice(0,4):[],t=Array.isArray(n.missing)?n.missing.slice(0,4):[];return!e.length&&!t.length?"":`
    <section class="contextCoach">
      <header>
        <span><small>${m(n.title||"NEXT MOVES")}</small><b>${m(n.summary||"Choose the next question to sharpen the decision.")}</b></span>
      </header>
      ${t.length?`<p><b>Missing</b><span>${m(t.join(", "))}</span></p>`:""}
      ${e.length?`
        <div>
          ${e.map(i=>`
            <button type="button" data-coach-prompt="${m(i.text)}">
              <small>${m(i.kind||"question")}</small>
              <span>${m(i.label)}</span>
            </button>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function sC(n){let t=String(n||"").replace(/^#{1,6}\s*/,"").replace(/^\*{1,2}|\*{1,2}$/g,"").replace(/:$/,"").trim().toLowerCase();return[[/^current view(?:\b|\s*[—-])/,"Current view"],[/^(what supports it|what drives it|reasons|why)$/,"What supports it"],[/^(strongest counter-case|counter-case|what could make it wrong|watch-outs)$/,"Strongest counter-case"],[/^(what would change my mind|what would change the view|evidence gaps|missing evidence)$/,"What would change the view"],[/^(next best move|next move|check next|next steps?)$/,"Next best move"],[/^(questions? for you|my challenge back|questions? that can change the answer)$/,"Questions for you"],[/^(blind spot|alternative angle|blind spot \/ alternative angle|what you may be missing)$/,"Blind spot / alternative angle"]].find(([s])=>s.test(t))?.[1]||""}function rC(n,e=!1){let t=[],i=null,s=()=>{i?.items.length&&t.push(i),i=null};for(let a of n){let o=String(a||"").replace(/\*\*/g,"").trim();if(!o){s();continue}let l=o.match(/^[-*•]\s+(.+)/),c=o.match(/^\d+[.)]\s+(.+)/),d=c?"ol":l?"ul":"p",u=c?.[1]||l?.[1]||o;(!i||i.type!==d)&&(s(),i={type:d,items:[]}),i.items.push(u)}s();let r=!1;return t.map(a=>a.type==="ul"||a.type==="ol"?`<${a.type}>${a.items.map(o=>`<li>${m(o)}</li>`).join("")}</${a.type}>`:a.items.map(o=>{let l=e&&!r?' class="answerLead"':"";return r=!0,`<p${l}>${m(o)}</p>`}).join("")).join("")}function aC(n){let e=String(n||"").replace(/\r\n/g,`
`).trim().split(`
`),t=[],i={title:"",lines:[]},s=()=>{(i.title||i.lines.some(r=>r.trim()))&&t.push(i),i={title:"",lines:[]}};for(let r of e){let a=sC(r);a?(s(),i.title=a):i.lines.push(r)}return s(),t.map((r,a)=>{let o=rC(r.lines,a===0&&!r.title);return r.title?`<section class="answerSection"><h3>${m(r.title)}</h3>${o}</section>`:`<div class="answerBody">${o}</div>`}).join("")}function Tb({mode:n="",provider:e="",model:t=""}={}){return n==="framework"?'<span class="intelligenceBadge framework" title="No external reasoning model generated this response"><i></i>FRAMEWORK ONLY</span>':n!=="llm"?"":'<span class="intelligenceBadge reasoning" title="External AI reasoning was used for this response"><i></i>FRAMEWORK + AI</span>'}function Cs(n,e,t=[],i={}){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=n==="jarvis"?i?.message?.id||i?.id||`local-${Date.now()}-${Math.random().toString(16).slice(2)}`:"";s.className=`message ${n}`,s.innerHTML=`
    <strong>${n==="jarvis"?"APEX":"YOU"}</strong>
    ${n==="jarvis"?Tb(i):""}
    <div class="messageText">${n==="jarvis"?aC(e):m(e).replace(/\n/g,"<br>")}</div>
    ${n==="jarvis"?Ab(t):""}
    ${n==="jarvis"?iC(i.contextCoach):""}
    ${n==="jarvis"?TT(r):""}
  `;let a=s.querySelector(".contextCoach");if(a){let o=document.createElement("details");o.className="response-detail",o.innerHTML="<summary>Context and suggested checks</summary>",a.replaceWith(o),o.append(a)}Wt.append(s),n==="jarvis"&&RT(s),Wt.scrollTop=Wt.scrollHeight}function va(n,e){if(!e)return"";let t=Array.isArray(e)?e.filter(Boolean).slice(0,2).join("; "):e;return t?`<span><small>${m(n)}</small><b>${m(t)}</b></span>`:""}function oC(n={}){let e=Number(n.approvedCount||0);nA.textContent=e?`${n.investorType||"Profile building"} / ${n.riskStyle||"Needs more memory"}`:"No approved memory yet",iA.textContent=`${Math.max(0,Math.min(100,Number(n.completeness||0)))}%`,sA.textContent=n.summary||"Approve memories to build a private investor profile.",rA.innerHTML=e?[va("Preferred",n.preferredAssets),va("Avoid",n.avoidedRisks),va("Cash flow",n.cashFlowRule),va("Holding",n.holdingPeriod),va("Rules",n.investmentRules),va("Warnings",n.personalWarnings)].filter(Boolean).join(""):""}function lC(n){let e=n.status==="pending";return`
    <article class="memoryItem ${e?"pending":"approved"} priority-${m(n.reviewPriority||"normal")}" data-memory-item="${m(n.id)}">
      <span><small>${m(n.categoryLabel||n.category)}</small><i>${e?"REVIEW":"APPROVED"}</i></span>
      <p>${m(n.content)}</p>
      <em>${m(n.profileImpact||"Useful context, but review before using it.")}</em>
      <div class="memoryActions">
        ${e?`
          <button type="button" data-memory-action="approve" data-memory-id="${m(n.id)}">KEEP</button>
          <button type="button" data-memory-action="dismiss" data-memory-id="${m(n.id)}">SKIP</button>
        `:`<button type="button" data-memory-action="delete" data-memory-id="${m(n.id)}">FORGET</button>`}
      </div>
    </article>
  `}function Zf(n={}){let e=!!n.captureEnabled,t=!!n.reasoningEnabled,i=n.answerStyle||{};rf=!0,zo.checked=e,Go.checked=t,rf=!1;let s=e||t?`Memory ${e?"can suggest items from chat":"will not suggest from chat"}; approved memory ${t?"can guide replies and reports":"will not guide reasoning"}.`:"Memory engine ready. Collection is off.",r=i.feedbackCount?` Answer style memory: ${i.latestLabel||"Learning"} (${i.feedbackCount} saved).`:"";ey.textContent=`${s}${r}`,ey.classList.toggle("active",e||t)}function cC(n={}){let e=Array.isArray(n.items)?n.items:[];Zf(n.settings||n.summary||{}),oC(n.profile||{}),eA.textContent=String(n.summary?.approved||0),tA.textContent=String(n.summary?.pending||0),Iu.innerHTML=e.length?e.slice().sort((t,i)=>{let s={pending:0,approved:1};return s[t.status]-s[i.status]||String(i.updatedAt).localeCompare(String(t.updatedAt))}).map(lC).join(""):'<p class="memoryEmpty">No long-term memories yet. Auto-capture is off until you enable it, or you can add one manually above.</p>'}async function dd(){let n=await Ye("/api/memory");return cC(n),n}function pn(){Ca.hidden=!0,Yu.setAttribute("aria-expanded","false"),document.body.classList.remove("memoryOpen")}async function Cb(){if(nn("memory"),!yt)return Ia();Hn(),fn(),mn(),sn(),gn(),vn(),yn(),hn(),Cn(),Rn(),Ca.hidden=!1,Yu.setAttribute("aria-expanded","true"),document.body.classList.add("memoryOpen"),Iu.innerHTML='<p class="memoryEmpty">Loading private memory...</p>';try{await dd()}catch(n){Iu.innerHTML=`<p class="memoryEmpty">${m(n.message)}</p>`}}async function uC(n,e){return e==="delete"?(await Ye(`/api/memory/${encodeURIComponent(n)}`,{method:"DELETE"}),null):Ye(`/api/memory/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:e})})}async function Rb(){if(!rf){zo.disabled=!0,Go.disabled=!0;try{let n=await Ye("/api/memory/settings",{method:"PATCH",body:JSON.stringify({captureEnabled:zo.checked,reasoningEnabled:Go.checked})});Zf(n.settings||{}),_e("System ready","Memory settings updated.")}catch(n){_e("Connection issue",n.message||"Memory settings could not be updated."),Ca.hidden||await dd().catch(()=>{})}finally{zo.disabled=!1,Go.disabled=!1}}}async function dC(n){let e=n.getAttribute("data-memory-id"),t=n.getAttribute("data-memory-action");if(!(!e||!t)){n.disabled=!0;try{await uC(e,t),document.querySelectorAll(`[data-memory-item="${CSS.escape(e)}"]`).forEach(i=>i.remove()),Ca.hidden||await dd(),_e("System ready",t==="approve"?"Memory approved.":t==="delete"?"Memory forgotten.":"Memory skipped.")}catch(i){_e("Connection issue",i.message||"Memory could not be updated."),n.disabled=!1}}}function hC(n){if(!n?.id)return;let e=document.createElement("article");e.className="memorySuggestion",e.setAttribute("data-memory-item",n.id),e.innerHTML=`
    <span><small>${m(n.categoryLabel||"LONG-TERM MEMORY")}</small><b>Remember this?</b></span>
    <p>${m(n.content)}</p>
    <em>${m(n.profileImpact||"Review this before it becomes part of your private profile.")}</em>
    <div class="memoryActions">
      <button type="button" data-memory-action="approve" data-memory-id="${m(n.id)}">KEEP</button>
      <button type="button" data-memory-action="dismiss" data-memory-id="${m(n.id)}">SKIP</button>
    </div>
  `,Wt.append(e),Wt.scrollTop=Wt.scrollHeight}function hd(n){if(!n)return;jo=n,lA.textContent=n.plan.name.toUpperCase(),cA.textContent=`${n.usage.remaining} reports remaining this month`;let t=Bu.filter(i=>i.id!=="free"&&i.id!==n.plan.id).filter(i=>i.checkoutAvailable);Ju.innerHTML=t.length?t.map(i=>`<button type="button" data-checkout-plan="${m(i.id)}">${m(i.name.toUpperCase())} / RM${m(i.priceRm)}</button>`).join(""):"<small>UPGRADES READY AFTER CHECKOUT CONFIGURATION</small>",hA.textContent=`${n.plan.name.toUpperCase()} / ${n.usage.remaining} LEFT`,Ey.textContent=`${n.plan.name} controls report access, storage, and usage limits only. It never changes scores, hard stops, or recommendations.`}async function pC(){if(!yt)return null;try{let[n,e]=await Promise.all([Ye("/api/billing/plans"),Ye("/api/billing/status")]);return Bu=n.plans||[],hd(e),e}catch{return Ju.innerHTML="<small>PLAN STATUS UNAVAILABLE</small>",null}}async function fC(n){let e=Ju.querySelector(`[data-checkout-plan="${CSS.escape(n)}"]`);e&&(e.disabled=!0);try{let t=await Ye("/api/billing/checkout",{method:"POST",body:JSON.stringify({plan:n})});window.location.assign(t.checkoutUrl)}catch(t){_e("Connection issue",t.message||"Checkout is not available yet."),e&&(e.disabled=!1)}}function mC(n){let e=n.weakestDimension,t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="reportHistoryItem" data-report-item="${m(n.id)}">
      <header><span><small>${m(n.verdict)} / ${m(t)}</small><b>${m(n.subject)}</b></span><em>${m(n.averageScore)}/100</em></header>
      <p>${e?`Weak link: ${m(e.label)} (${m(e.score)}/100)`:"Evidence details unavailable"}</p>
      <div class="reportHistoryActions">
        <button type="button" data-report-action="view" data-report-id="${m(n.id)}">VIEW</button>
        <button type="button" data-report-action="delete" data-report-id="${m(n.id)}">DELETE</button>
      </div>
    </article>
  `}function Ib(n={}){document.querySelector("#savedReportView").hidden=!0,yr.hidden=!1;let e=Array.isArray(n.reports)?n.reports:[];dA.textContent=String(e.length),yr.innerHTML=e.length?e.map(mC).join(""):'<p class="reportsEmpty">No saved deal reports yet. Signed-in analyses will appear here automatically.</p>',n.billing&&hd(n.billing)}function fn(){bf.hidden=!0,Zu.setAttribute("aria-expanded","false"),document.body.classList.remove("reportsOpen")}async function Qf(){if(nn("reports"),!yt)return Ia();Hn(),pn(),mn(),sn(),gn(),vn(),yn(),hn(),Cn(),Rn(),bf.hidden=!1,Zu.setAttribute("aria-expanded","true"),document.body.classList.add("reportsOpen"),yr.innerHTML='<p class="reportsEmpty">Loading private reports...</p>';try{Ib(await Ye("/api/reports"))}catch(n){yr.innerHTML=`<p class="reportsEmpty">${m(n.message)}</p>`}}async function gC(n){let e=n.getAttribute("data-report-id"),t=n.getAttribute("data-report-action");if(!(!e||!t||Tn)){Kt(!0),n.disabled=!0;try{if(t==="delete"){await Ye(`/api/reports/${encodeURIComponent(e)}`,{method:"DELETE"}),Ib(await Ye("/api/reports"));return}let i=await Ye(`/api/reports/${encodeURIComponent(e)}`),s=document.querySelector("#savedReportView");yr.hidden=!0,s.hidden=!1,s.innerHTML='<button type="button" data-report-back>Back to saved reports</button>',i.report.analysis.savedReportId=i.report.id,dm(i.report.analysis,[],{},s),hd(i.billing),_e("System ready",`${i.report.subject} report loaded.`)}catch(i){_e("Connection issue",i.message||"The saved report is unavailable."),n.disabled=!1}finally{n.disabled=!1,Kt(!1)}}}function vC(n){let e=n.reviewed?"REVIEWED":n.locked?"LOCKED":"DRAFT",t=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n.createdAt));return`
    <article class="journalItem ${m(e.toLowerCase())}" data-journal-item="${m(n.id)}">
      <header><span><small>${m(e)} / ${m(t)}</small><b>${m(n.subject)}</b></span><em>${m(n.decision)}</em></header>
      <p>${m(n.skillSignal)}</p>
      <div class="journalItemMeta"><span>REPORT ${m(n.snapshotScore)}/100</span><span>CONFIDENCE ${m(n.confidence)}%</span></div>
      <button type="button" data-journal-action="open" data-journal-id="${m(n.id)}">${n.locked?"REVIEW":"EDIT DRAFT"}</button>
    </article>
  `}function yC(n={}){let e=Array.isArray(n.decisions)?n.decisions:[];fA.textContent=String(n.summary?.total||0),mA.textContent=String(n.summary?.reviewed||0),Ea.innerHTML=e.length?e.map(vC).join(""):'<p class="journalEmpty">No decisions recorded yet. Open a saved Deal Report and choose RECORD DECISION.</p>',My.hidden=!1,Ea.hidden=!1,Bp.hidden=!0}function mn(){xf.hidden=!0,Qu.setAttribute("aria-expanded","false"),document.body.classList.remove("journalOpen")}async function em(){let n=await Ye("/api/journal");return yC(n),n}async function pd(n=""){if(nn("journal"),!yt)return Ia();Hn(),pn(),fn(),sn(),gn(),vn(),yn(),hn(),Cn(),Rn(),xf.hidden=!1,Qu.setAttribute("aria-expanded","true"),document.body.classList.add("journalOpen"),Ea.innerHTML='<p class="journalEmpty">Loading private decisions...</p>';try{await em(),n&&await Pb(n)}catch(e){Ea.innerHTML=`<p class="journalEmpty">${m(e.message)}</p>`}}function bC(n){for(let e of[_f,Sf,wf,Ef,Mf,Af,Tf])e.disabled=n}function fd(n){let e=!!n.lockedAt;ul.value=n.id,vA.textContent=n.subject,_f.value=n.prePurchase.decision,Sf.value=n.prePurchase.confidence,wf.value=n.prePurchase.holdingPeriod,Ef.value=n.prePurchase.thesis,Mf.value=n.prePurchase.counterThesis,Af.value=n.prePurchase.killCriterion,Tf.value=n.prePurchase.notes,Ay.value=n.outcome.status==="not_reviewed"?"holding":n.outcome.status,Ty.value=n.outcome.actualRent,Cy.value=n.outcome.currentValue,Ry.value=n.outcome.processScore,Iy.value=n.outcome.executionScore,Py.value=n.outcome.outcomeScore,Ly.value=n.outcome.luckScore,Ny.value=n.outcome.result,Dy.value=n.outcome.lesson,bC(e),yA.hidden=e,Ti.dataset.confirming="false",Ti.textContent="LOCK THESIS",_A.hidden=!e,SA.hidden=!e,$n.textContent=n.outcome.reviewedAt?`Review saved. ${n.outcome.reviewedAt.slice(0,10)}.`:"",My.hidden=!0,Ea.hidden=!0,Bp.hidden=!1,Bp.scrollTop=0}async function Pb(n){let e=await Ye(`/api/journal/${encodeURIComponent(n)}`);return fd(e.decision),e.decision}function Lb(){return{action:"update",decision:_f.value,confidence:Sf.value,holdingPeriod:wf.value,thesis:Ef.value,counterThesis:Mf.value,killCriterion:Af.value,notes:Tf.value}}async function xC(){let n=ul.value;$n.textContent="Saving draft...";try{let e=await Ye(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(Lb())});fd(e.decision),$n.textContent="Draft saved."}catch(e){$n.textContent=e.message,Ti.textContent="LOCK THESIS"}}async function _C(){let n=ul.value;$n.textContent="Locking the pre-purchase record...";try{await Ye(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(Lb())});let e=await Ye(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"lock"})});fd(e.decision),$n.textContent="Thesis locked. Future reviews cannot rewrite it."}catch(e){$n.textContent=e.message,Ti.textContent="LOCK THESIS"}}function SC(){if(Ti.dataset.confirming!=="true"){Ti.dataset.confirming="true",Ti.textContent="CONFIRM LOCK",$n.textContent="Locking is permanent. Press CONFIRM LOCK to preserve this thesis unchanged.";return}Ti.dataset.confirming="false",Ti.textContent="LOCKING...",_C()}async function wC(){let n=ul.value;$n.textContent="Saving outcome review...";try{let e=await Ye(`/api/journal/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify({action:"review",outcomeStatus:Ay.value,actualRent:Ty.value,currentValue:Cy.value,processScore:Ry.value,executionScore:Iy.value,outcomeScore:Py.value,luckScore:Ly.value,result:Ny.value,lesson:Dy.value})});fd(e.decision),$n.textContent=e.summary.skillSignal}catch(e){$n.textContent=e.message}}async function EC(){let n=ul.value;$n.textContent="Deleting draft...";try{await Ye(`/api/journal/${encodeURIComponent(n)}`,{method:"DELETE"}),await em(),_e("System ready","Decision draft deleted.")}catch(e){$n.textContent=e.message}}async function Nb(n){if(!yt)return _e("System ready","Sign in to preserve a private decision record."),Ia();if(!n?.savedReportId){_e("System ready","Open a saved Deal Report before recording the decision.");return}try{let e=await Ye("/api/journal",{method:"POST",body:JSON.stringify({reportId:n.savedReportId})});await pd(e.decision.id)}catch(e){_e("Connection issue",e.message||"The decision record could not be created.")}}function tm(){try{let n=JSON.parse(window.localStorage.getItem(af())||"[]");return Array.isArray(n)?n.slice(0,4):[]}catch{return window.localStorage.removeItem(af()),[]}}function md(n){let e=n.slice(0,4);return window.localStorage.setItem(af(),JSON.stringify(e)),id.textContent=e.length?`SHORTLIST ${e.length}`:"SHORTLIST",e}function af(){return yt?`${uy}:${yt.id}`:uy}function Pa(n){let e=n?.context?.dealCard||{};return e.projectName||e.area||"Untitled deal"}function nm(n){return[...n.dimensions||[]].sort((e,t)=>Number(e.score||0)-Number(t.score||0))[0]||null}function Hu(n){return[...n.hardStops||[],...n.recommendationBlockers||[]].filter(Boolean)}function Eu(n){let e=Hu(n).length*18,t=["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?24:0,i=nm(n),s=i&&Number(i.score||0)<55?10:0;return Math.max(0,Number(n.averageScore||0)-e-t-s)}function MC(n){if(!n.length)return"";let e=n.slice().sort((a,o)=>Eu(o)-Eu(a)),t=e.filter(a=>!Hu(a).length&&!["REJECT","PAUSE"].includes(String(a.verdict||"").toUpperCase())),i=t[0]||e[0],s=n.filter(a=>Hu(a).length||["REJECT","PAUSE"].includes(String(a.verdict||"").toUpperCase())).length,r=nm(i);return`
    <section class="shortlistCompare">
      <span><small>APEX COMPARISON</small><b>${m(t.length?"Cleanest current pick":"No clean pick yet")}</b></span>
      <strong>${m(i.subject)}</strong>
      <div>
        <em>${m(Eu(i))} adjusted</em>
        <em>${m(s)} blocked</em>
        <em>${m(r?`${r.label}: ${r.score}`:"weak link: n/a")}</em>
      </div>
      <p>${m(t.length?"Compare the adjusted score, then check the weak link before choosing.":"Clear hard stops and decision blockers before treating any shortlisted deal as a contender.")}</p>
    </section>
  `}function AC(n){let e=(n.dimensions||[]).map(l=>`
    <span class="shortlistDimension ${m(l.status)}">
      <small>${m(l.label)}</small><b>${m(l.score)}</b>
    </span>
  `).join(""),t=nm(n),i=Hu(n),s=n.investorReadiness?.label||"Readiness unknown",r=n.decisionFocus?.body||n.summary||"No decision focus recorded.",a=n.learningLoop?.signals?.length||0;return`
    <article class="shortlistItem ${i.length||["REJECT","PAUSE"].includes(String(n.verdict||"").toUpperCase())?"blocked":"clean"}" data-shortlist-item="${m(n.id)}">
      <header><span><small>${m(n.verdict)} / ${m(s)}</small><b>${m(n.subject)}</b></span><em>${m(Eu(n))} adj</em></header>
      <div class="shortlistDimensions">${e}</div>
      <p><b>Weak link</b> ${m(t?`${t.label} (${t.score}/100)`:"Evidence not available")}</p>
      <p><b>Decision focus</b> ${m(r)}</p>
      <div class="shortlistSignals">
        <span>${m(i.length)} blocker${i.length===1?"":"s"}</span>
        <span>${m(a)} learning signal${a===1?"":"s"}</span>
        <span>${m(n.confidence||0)}% confidence</span>
      </div>
      <div class="shortlistActions">
        <button type="button" data-shortlist-action="load" data-shortlist-id="${m(n.id)}">LOAD DEAL</button>
        <button type="button" data-shortlist-action="remove" data-shortlist-id="${m(n.id)}">REMOVE</button>
      </div>
    </article>
  `}function ml(){let n=tm();md(n),xT.innerHTML=MC(n),lb.innerHTML=n.length?n.map(AC).join(""):'<p class="shortlistEmpty">No analysed deals saved yet. Run an analysis, then choose SAVE TO SHORTLIST.</p>',cb.hidden=!n.length,Oi()}function Cn(){qf.hidden=!0,id.setAttribute("aria-expanded","false"),document.body.classList.remove("shortlistOpen")}function im(){nn("shortlist"),Hn(),pn(),fn(),mn(),sn(),gn(),vn(),yn(),hn(),Rn(),ml(),qf.hidden=!1,id.setAttribute("aria-expanded","true"),document.body.classList.add("shortlistOpen")}function Db(n){let e=n?.context?.dealCard||{},t=Pa(n),i=`${t}|${e.askingPrice||""}`.toLowerCase().replace(/[^a-z0-9|]+/g,"-"),s={id:i,subject:t,savedAt:new Date().toISOString(),verdict:n.verdict,summary:n.summary,averageScore:n.averageScore,confidence:n.confidence,dimensions:n.dimensions||[],metrics:n.metrics||[],scenarios:n.scenarios||[],stressEnvelope:n.stressEnvelope||null,acquisitionCostEstimate:n.acquisitionCostEstimate||null,portfolioGate:n.portfolioGate||null,marketPulse:n.marketPulse||null,holdExitPlan:n.holdExitPlan||null,decisionSeal:n.decisionSeal||null,siteVisitAssistant:n.siteVisitAssistant||null,sourcingProfessional:n.sourcingProfessional||null,tenantRentalPlan:n.tenantRentalPlan||null,exitStrategy:n.exitStrategy||null,hardStops:n.hardStops||[],recommendationBlockers:n.recommendationBlockers||[],decisionFocus:n.decisionFocus||null,personalizedChallenge:n.personalizedChallenge||null,dealMemoryComparison:n.dealMemoryComparison||null,beliefTracker:n.beliefTracker||null,sourceTransparency:n.sourceTransparency||null,memoryConflicts:n.memoryConflicts||null,personalOperatingRules:n.personalOperatingRules||null,investorReadiness:n.investorReadiness||null,productExperience:n.productExperience||null,learningLoop:n.learningLoop||null,evidenceEngine:n.evidenceEngine||null,transactionComparableEvidence:n.transactionComparableEvidence||null,achievedRentalEvidence:n.achievedRentalEvidence||null,financingValuationEvidence:n.financingValuationEvidence||null,supplyAbsorptionEvidence:n.supplyAbsorptionEvidence||null,siteManagementEvidence:n.siteManagementEvidence||null,legalTransactionEvidence:n.legalTransactionEvidence||null,developmentIntelligence:n.developmentIntelligence||null,caseIntelligence:n.caseIntelligence||null,documentIntelligence:n.documentIntelligence||null,portfolioCommand:n.portfolioCommand||null,finalCommand:n.finalCommand||null,residentialDcf:n.residentialDcf||null,marketIntelligence:n.marketIntelligence||null,counterThesis:n.counterThesis,context:n.context||{}},r=tm().filter(a=>a.id!==i);return md([s,...r]),s}function TC(n){let e=n?.context?.dealCard||{},t=n?.context?.financialProfile||{};for(let s of Rs){let r=s.getAttribute("data-deal-field");s.value=e[r]||""}for(let s of _r){let r=s.getAttribute("data-profile-field");s.value=t[r]||""}qu(Rs,"data-deal-field",jf),qu(_r,"data-profile-field",Xf),Cn();let i=Ri.find(s=>s.getAttribute("data-context-toggle")==="deal");i&&Ii(i,!0),_e("System ready",`${n.subject} loaded for review.`)}function CC(n){let e=n.getAttribute("data-shortlist-id"),t=n.getAttribute("data-shortlist-action"),i=tm();if(t==="remove"){md(i.filter(s=>s.id!==e)),ml();return}if(t==="load"){let s=i.find(r=>r.id===e);s&&TC(s)}}function RC(n){if(n){Sa?.classList.remove("printTarget"),Sa=n,Sa.classList.add("printTarget"),document.body.classList.add("printMode");for(let e of n.querySelectorAll("details"))e.dataset.printWasOpen=String(e.open),e.open=!0;window.print()}}function IC(n){let e=["APEX ANALYTIC DEAL REPORT",Pa(n),"",`Verdict: ${n.verdict||"INVESTIGATE"}`,`Confidence: ${n.confidence||0}%`,`Score: ${n.averageScore||0}/100`,`Reasoning: ${n.reasoningMode||"Framework only"}`,"",...UT(),"",...HT(n),"",...BT(n),"",...GT(n),"",...qT(n),"",...XT(n.developmentIntelligence),"",...KT(n.caseIntelligence),"",...ZT(n.documentIntelligence),"",...eC(n.portfolioCommand),"",...nC(n.finalCommand),"",`Summary: ${n.summary||""}`];if(n.decisionFocus?.body&&e.push("",`${n.decisionFocus.label||"Decision focus"}: ${n.decisionFocus.body}`),n.residentialDcf&&e.push("",...p1(n.residentialDcf)),n.investorReadiness?.label){e.push("",`Investor readiness: ${n.investorReadiness.label} (${n.investorReadiness.score||0}/100)`),n.investorReadiness.summary&&e.push(n.investorReadiness.summary);for(let t of n.investorReadiness.flags||[])e.push(`- ${t}`)}if(n.productExperience?.summary){e.push("","V5 product experience",`${n.productExperience.mode||"Balanced investor review"} (${n.productExperience.onboardingCompleteness||0}% guidance complete): ${n.productExperience.summary}`,`Style: ${n.productExperience.explanationStyle||"Balanced explanation"}`,`Next best action: ${n.productExperience.nextBestAction||"Complete the missing guidance fields before relying on the report format."}`);for(let t of n.productExperience.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dimensions?.length){e.push("","Scorecard");for(let t of n.dimensions)e.push(`- ${t.label}: ${t.score}/100 (${t.status})`)}if(n.evidenceChecklist?.length){e.push("","Evidence checklist");for(let t of n.evidenceChecklist)e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.evidenceEngine?.summary){e.push("","V4.0 evidence engine",`${n.evidenceEngine.status||"unknown"} (${n.evidenceEngine.score||0}/100): ${n.evidenceEngine.summary}`,`Gate: ${n.evidenceEngine.recommendationGate||"Evidence gate not calculated."}`);for(let t of n.evidenceEngine.criticalGaps||[])e.push(`- Critical gap: ${t}`);for(let t of n.evidenceEngine.gates||[])e.push(`- ${t.label}: ${t.status}, ${t.score}/100. ${t.action}`)}if(n.transactionComparableEvidence?.summary){e.push("","V4.1 transaction comparable evidence",`${n.transactionComparableEvidence.status||"unknown"} (${n.transactionComparableEvidence.score||0}/100): ${n.transactionComparableEvidence.summary}`,`Value position: ${n.transactionComparableEvidence.valuePosition||"Not calculated."}`);for(let t of n.transactionComparableEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.achievedRentalEvidence?.summary){e.push("","V4.2 achieved rental evidence",`${n.achievedRentalEvidence.status||"unknown"} (${n.achievedRentalEvidence.score||0}/100): ${n.achievedRentalEvidence.summary}`,`Coverage: ${n.achievedRentalEvidence.coveragePosition||"Not calculated."}`);for(let t of n.achievedRentalEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.financingValuationEvidence?.summary){e.push("","V4.3 financing and valuation evidence",`${n.financingValuationEvidence.status||"unknown"} (${n.financingValuationEvidence.score||0}/100): ${n.financingValuationEvidence.summary}`,`Affordability: ${n.financingValuationEvidence.affordabilityPosition||"Not calculated."}`);for(let t of n.financingValuationEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.supplyAbsorptionEvidence?.summary){e.push("","V4.4 supply and absorption evidence",`${n.supplyAbsorptionEvidence.status||"unknown"} (${n.supplyAbsorptionEvidence.score||0}/100): ${n.supplyAbsorptionEvidence.summary}`,`Competition: ${n.supplyAbsorptionEvidence.competitionPosition||"Not calculated."}`);for(let t of n.supplyAbsorptionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteManagementEvidence?.summary){e.push("","V4.5 site and management evidence",`${n.siteManagementEvidence.status||"unknown"} (${n.siteManagementEvidence.score||0}/100): ${n.siteManagementEvidence.summary}`,`Lived quality: ${n.siteManagementEvidence.livedQualityPosition||"Not calculated."}`);for(let t of n.siteManagementEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.legalTransactionEvidence?.summary){e.push("","V4.6 legal and transaction evidence",`${n.legalTransactionEvidence.status||"unknown"} (${n.legalTransactionEvidence.score||0}/100): ${n.legalTransactionEvidence.summary}`,`Transaction path: ${n.legalTransactionEvidence.transactionPosition||"Not calculated."}`);for(let t of n.legalTransactionEvidence.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dueDiligencePlan?.tasks?.length){e.push("","Due diligence pack",n.dueDiligencePlan.summary||"");for(let t of n.dueDiligencePlan.tasks)e.push(`- ${t.owner} / ${t.priority} / ${t.status}: ${t.label}. ${t.action}`)}if(n.stressEnvelope?.summary){e.push("","Stress envelope",n.stressEnvelope.summary,`Base true holding: ${n.stressEnvelope.baseTrueHolding}`,`Stressed true holding: ${n.stressEnvelope.stressedTrueHolding}`,`Cash after stress reserves: ${n.stressEnvelope.cashAfterStressReserves}`,`Reserve survival: ${n.stressEnvelope.reserveSurvivalMonths===null?"Not applicable":`${n.stressEnvelope.reserveSurvivalMonths} months`}`);for(let t of n.stressEnvelope.assumptions||[])e.push(`- ${t.label}: ${t.value} (${t.source})`)}if(n.acquisitionCostEstimate?.items?.length){e.push("","Estimated Malaysian entry costs");for(let t of ex(n.acquisitionCostEstimate))e.push(`- ${t}`)}if(n.portfolioGate?.summary){e.push("","Portfolio expansion gate",`${n.portfolioGate.status||"review"} (${n.portfolioGate.score||0}/100): ${n.portfolioGate.summary}`,`Next-property rule: ${n.portfolioGate.nextPropertyRule||"Do not scale until the current property is proven."}`);for(let t of n.portfolioGate.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.marketPulse?.summary){e.push("","Market cycle and liquidity pulse",`${n.marketPulse.status||"watch"}: ${n.marketPulse.summary}`,`Cycle: ${n.marketPulse.cycle||"Cycle unclear"}`,`Liquidity: ${n.marketPulse.liquidity||"Liquidity must be proven"}`);for(let t of n.marketPulse.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.holdExitPlan?.summary){e.push("","Hold, refinance, exit plan",`${n.holdExitPlan.action||"monitor"}: ${n.holdExitPlan.summary}`,`Review cadence: ${n.holdExitPlan.reviewCadence||"Review annually and on trigger events."}`);for(let t of n.holdExitPlan.triggers||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.decisionSeal?.summary){e.push("","V1 decision seal",`${n.decisionSeal.label||"V1 Conditional Only"}: ${n.decisionSeal.summary}`);for(let t of n.decisionSeal.conditions||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.siteVisitAssistant?.summary){e.push("","V2.1 site visit assistant",`${n.siteVisitAssistant.status||"required"}: ${n.siteVisitAssistant.summary}`,`Focus: ${n.siteVisitAssistant.focus||"Check lived quality on site"}`);for(let t of n.siteVisitAssistant.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourcingProfessional?.summary){e.push("","V2.2 sourcing and professional filter",`${n.sourcingProfessional.status||"verify"}: ${n.sourcingProfessional.summary}`,`Posture: ${n.sourcingProfessional.posture||"Evidence-first sourcing"}`);for(let t of n.sourcingProfessional.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.tenantRentalPlan?.summary){e.push("","V2.3 tenant and rental plan",`${n.tenantRentalPlan.status||"watch"}: ${n.tenantRentalPlan.summary}`,`Target: ${n.tenantRentalPlan.target||"Target tenant not stated"}`);for(let t of n.tenantRentalPlan.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.exitStrategy?.summary){e.push("","V2.4 exit strategy and buyer psychology",`${n.exitStrategy.status||"prepare"}: ${n.exitStrategy.summary}`,`Buyer psychology: ${n.exitStrategy.buyerPsychology||"Buyer objections must be prepared"}`);for(let t of n.exitStrategy.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.executionPlan?.actions?.length){e.push("","Execution calibration",n.executionPlan.summary||"",`Posture: ${n.executionPlan.posture||"Verify before offer"}`,`Opening anchor: ${n.executionPlan.openingAnchor||"Need value proof"}`,`Maximum offer: ${n.executionPlan.maximumOffer||"Need value/rent proof"}`,`Walk-away rule: ${n.executionPlan.walkAway||"Do not proceed under pressure."}`);for(let t of n.executionPlan.actions)e.push(`- ${t.lane} / ${t.status}: ${t.label}. ${t.action}`)}if(n.learningLoop?.signals?.length){e.push("","Learning loop",n.learningLoop.summary||""),n.learningLoop.profile?.approvedCount&&e.push(`Memory profile: ${n.learningLoop.profile.investorType||"Profile building"}; ${n.learningLoop.profile.riskStyle||"Needs more approved memory"}.`,`Profile completeness: ${n.learningLoop.profile.completeness||0}%.`);for(let t of n.learningLoop.signals)e.push(`- ${t.label}: ${t.body} ${t.action}`)}if(n.personalizedChallenge?.message){e.push("",`V3.3 personalized challenge: ${n.personalizedChallenge.label||"Personalized challenge"}`,`- ${n.personalizedChallenge.message}`);for(let t of n.personalizedChallenge.checks||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.dealMemoryComparison?.summary){e.push("","V3.4 deal memory comparison",`${n.dealMemoryComparison.status||"none"}: ${n.dealMemoryComparison.summary}`);for(let t of n.dealMemoryComparison.matches||[])e.push(`- ${t.subject}: ${t.similarity}% similar, ${t.verdict}. ${t.reason} ${t.action}`)}if(n.beliefTracker?.summary){e.push("","V3.5 belief tracker",`${n.beliefTracker.status||"inactive"}: ${n.beliefTracker.summary}`);for(let t of n.beliefTracker.beliefs||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.sourceTransparency?.summary){e.push("","V3.6 source transparency",`${n.sourceTransparency.mode||n.reasoningMode||"Framework only"}: ${n.sourceTransparency.summary}`);for(let t of n.sourceTransparency.sources||[])e.push(`- ${t.label}: ${t.status}. ${t.detail}`)}if(n.memoryConflicts?.summary){e.push("","V3.7 memory conflicts",`${n.memoryConflicts.status||"inactive"}: ${n.memoryConflicts.summary}`);for(let t of n.memoryConflicts.conflicts||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}if(n.personalOperatingRules?.summary){e.push("","V3.8 personal operating rules",`${n.personalOperatingRules.status||"check"}: ${n.personalOperatingRules.summary}`);for(let t of n.personalOperatingRules.rules||[])e.push(`- ${t.label}: ${t.status}. ${t.action}`)}return n.hardStops?.length&&e.push("","Hard stops",...n.hardStops.map(t=>`- ${t}`)),n.recommendationBlockers?.length&&e.push("","Decision blockers",...n.recommendationBlockers.map(t=>`- ${t}`)),n.watchouts?.length&&e.push("","Watch-outs",...n.watchouts.map(t=>`- ${t}`)),n.nextActions?.length&&e.push("","Check next",...n.nextActions.map(t=>`- ${t}`)),n.counterThesis&&e.push("",`Strongest counter-thesis: ${n.counterThesis}`),Li(e.join(`
`))}async function sm(n){try{await navigator.clipboard.writeText(n)}catch{let e=document.createElement("textarea");e.value=n,e.setAttribute("readonly",""),e.style.position="fixed",e.style.opacity="0",document.body.append(e),e.select(),document.execCommand("copy"),e.remove()}}function PC(n){return String(n||"").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function hy(n,e={},t=10){let i=Object.entries(e).filter(([,s])=>String(s||"").trim()).slice(0,t);return i.length?[`${n}:`,...i.map(([s,r])=>`- ${PC(s)}: ${String(r).trim()}`)]:[`${n}: not supplied`]}function LC(){return["Readiness:",...[{panelName:"deal",label:"Deal"},{panelName:"profile",label:"Profile"},{panelName:"guidance",label:"Guidance"}].map(n=>{let e=ll(n.panelName);return`- ${n.label}: ${e.percent}%${e.missing.length?`, missing ${e.missing.slice(0,3).join(", ")}`:", ready enough"}`})]}function Ob(n){let e=Array.from(Wt.querySelectorAll(n)).pop();return Li(e?.textContent||"").replace(/\s+/g," ").trim()}function NC(){let n=Array.from(Wt.querySelectorAll(".analysisMessage")).pop(),e=dl.get(n?.dataset.analysisId);if(e)return["Latest Apex direction:",`- Subject: ${Pa(e)}`,`- Verdict: ${e.verdict||"INVESTIGATE"} (${e.confidence||0}% confidence, ${e.averageScore||0}/100 score)`,e.summary?`- Summary: ${e.summary}`:"",e.counterThesis?`- Counter-thesis: ${e.counterThesis}`:"",...(e.nextActions||[]).slice(0,3).map(i=>`- Next: ${i}`)].filter(Boolean);let t=Ob(".message.jarvis .messageText");return t?["Latest Apex direction:",`- ${t.slice(0,700)}`]:["Latest Apex direction: no Apex answer yet"]}function DC(){let n=is(),e=Na(),t=Ob(".message.user .messageText"),i=["APEX ANALYTIC SESSION BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",t?`Latest user question: ${t.slice(0,500)}`:"Latest user question: not supplied","",...LC(),"",...hy("Deal context",n,12),"",...hy("Profile and guidance context",e,12),"",...NC(),"","Use this brief as context only. Re-check live transaction, rental, financing, legal, supply, and site evidence before deciding."];return Li(i.filter(s=>s!==void 0).join(`
`))}async function kb(n=Dp){let e=DC();if(await sm(e),n){let t=n.textContent;n.textContent="COPIED",window.setTimeout(()=>{n.textContent=t||"BRIEF"},1200)}_e("System ready","Session brief copied.")}async function OC(n,e){let t=IC(e);await sm(t),n.textContent="COPIED",_e("System ready","Report copied.")}function kC(){for(let n of Sa?.querySelectorAll("details[data-print-was-open]")||[])n.open=n.dataset.printWasOpen==="true",delete n.dataset.printWasOpen;Sa?.classList.remove("printTarget"),Sa=null,document.body.classList.remove("printMode")}function UC(n){let e=n.closest(".analysisMessage"),t=dl.get(e?.dataset.analysisId);if(!e||!t)return;let i=n.getAttribute("data-analysis-action");if(i==="report"){RC(e);return}if(i==="copy"){OC(n,t);return}if(i==="shortlist"){Db(t),n.textContent="SAVED",_e("System ready",`${Pa(t)} saved to your shortlist.`),Oi();return}if(i==="dcf"&&t.residentialDcf?.status!=="incomplete"){hm(t.residentialDcf);return}i==="journal"&&Nb(t)}function Ub(n){let e=Ri.find(t=>t.getAttribute("data-context-toggle")===n);e&&Ii(e,!0),ox(n)}function FC(n){let e=n?.getAttribute("data-journey-action");if(e){if(e==="deal"||e==="profile"||e==="guidance"){Ub(e);return}if(e==="screen"){dx();return}if(e==="analyze"){cl();return}if(e==="save"){let t=uf();if(!t)return void cl();Db(t),ml(),_e("System ready",`${Pa(t)} saved to your shortlist.`);return}if(e==="shortlist"){im();return}if(e==="journal"){let t=uf();t?Nb(t):pd();return}if(e==="reports"){Qf();return}e==="brief"&&kb()}}function gd(){return Ko.value.trim()||window.localStorage.getItem(Is)||""}function Fb(){return nl.value.trim()||gd()}function Bb(){return Jo.value.trim()||gd()}function Tt(n,e=""){ly.textContent=n||"",ly.dataset.tone=e}function Jt(n,e=""){ry.textContent=n||"",ry.dataset.tone=e}function Vn(n,e=""){ay.textContent=n||"",ay.dataset.tone=e}function Ge(n,e=""){ny.textContent=n||"",ny.dataset.tone=e}function Qn(n){let e=String(n||"").trim();pi.value=e,Ko.value=e,Jo.value=e,nl.value=e,e?window.localStorage.setItem(Is,e):window.localStorage.removeItem(Is)}function Ni(){return pi.value.trim()||window.localStorage.getItem(Is)||""}async function Et(n,e={}){let t=Ni();if(!t)throw new Error("Paste and save the owner token first.");return Ye(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function Jn(n="",e=""){sy.textContent=n,sy.dataset.tone=e}function BC(n){let e=n.summary||{},t=e.pipelinePressure!==null&&e.pipelinePressure!==void 0&&Number.isFinite(Number(e.pipelinePressure))?`${Math.round(Number(e.pipelinePressure)*100)}% pipeline`:"pipeline unavailable";return`
    <article class="ownerResearchItem" data-owner-research-id="${m(n.id)}">
      <header>
        <span><small>${m(n.market||n.country||"Market study")} / CUT-OFF ${m(n.dataCutoff||"unknown")}</small><b>${m(n.title||n.id)}</b></span>
        <em>${m(e.effectiveHighConfidence||0)} high-confidence</em>
      </header>
      <p>${m(n.decisionStatement||"No decision statement supplied.")}</p>
      <div class="ownerResearchMeta">
        <span>${m(e.evidenceRecords||0)} evidence</span>
        <span>${m(e.projectRecords||0)} projects</span>
        <span>${m(t)}</span>
        <span>${m(e.warnings||0)} warnings</span>
      </div>
      <button type="button" data-owner-research-action="delete" data-owner-research-id="${m(n.id)}">DELETE</button>
    </article>
  `}function zu(n={}){ya=Array.isArray(n.studies)?n.studies:[],DA.textContent=`${ya.length} stud${ya.length===1?"y":"ies"}`,Uy.innerHTML=ya.length?ya.map(BC).join(""):'<p class="ownerIntelEmpty">No validated research study has been imported yet.</p>'}async function rm(){if(!Ni())return zu(),Jn("Owner token required.","warning"),{studies:[],summary:{}};Jn("Loading validated research...");let n=await Et("/api/owner/research/studies");return zu(n),Jn(`${n.summary?.evidenceRecords||0} evidence records available to retrieval.`),n}async function $b(n,e=!1){Jn(e?"Replacing validated research study...":"Validating and importing research study...");let t=await Et(`/api/owner/research/studies/import${e?"?replace=true":""}`,{method:"POST",body:JSON.stringify(n)});rl=null,td.hidden=!0,await rm(),Jn(`${t.study?.title||"Research study"} ${t.replaced?"replaced":"imported"}.`)}async function $C(n){if(!n)return;let e;try{e=JSON.parse(await n.text())}catch{throw new Error("Research import must be a valid JSON bundle.")}finally{Nu.value=""}let t=String(e?.study_config?.study_id||"").trim();if(t&&ya.some(i=>i.id===t)){rl=e,td.hidden=!1,Jn(`Study ${t} already exists. Review the new cut-off, then use REPLACE STUDY.`,"warning");return}await $b(e,!1)}async function VC(n){n&&(Jn(`Deleting ${n}...`,"warning"),await Et(`/api/owner/research/studies/${encodeURIComponent(n)}`,{method:"DELETE"}),await rm(),Jn("Research study deleted.","warning"))}async function Ta(n,e={}){let t=gd();if(!t)throw new Error("Paste and save the owner token first.");return Ye(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function py(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}function Lp(n="",e={}){let t=py(n);return t?[e.name,e.area,...e.aliases||[]].map(py).filter(Boolean).some(i=>t.includes(i)||i.includes(t)):!1}function HC(n=[],e=[],t=[],i=[]){return n.map(s=>{let r=e.filter(v=>v.projectId===s.id||Lp(`${v.projectName} ${v.area}`,s)),a=t.filter(v=>v.projectId===s.id||Lp(`${v.projectName||v.project?.name||""} ${v.area||v.project?.area||""}`,s)),o=i.filter(v=>Lp(`${v.title} ${v.filename} ${(v.tags||[]).join(" ")}`,s)),l=a.filter(v=>v.freshness?.status==="stale").length,c=!!r.length,d=a.some(v=>v.freshness?.status==="fresh"),u=!!o.length,h=[c?"":"case",d?"":"fresh signal",u?"":"evidence"].filter(Boolean),g=c?l?"stale":d&&u?"ready":"partial":"missing";return{project:s,cases:r.length,observations:a.length,evidence:o.length,stale:l,missing:h,status:g}})}function zC(){try{return JSON.parse(window.localStorage.getItem(hb)||"null")||null}catch{return null}}function GC(n={}){let e=n.contentVersion?.hash||n.integrity?.hash||"",t={exportedAt:n.exportedAt||new Date().toISOString(),versionHash:e,versionShort:e?e.slice(0,12):"",counts:n.counts||{}};return window.localStorage.setItem(hb,JSON.stringify(t)),t}function WC(n="",e={}){if(e?.status&&e.status!=="missing")return{status:e.status==="ready"?"ready":"warning",label:e.label||"Server backup record",action:e.action||"Server backup ledger is tracking owner exports."};let t=zC();if(!t?.exportedAt)return{status:"missing",label:"No local backup",action:"Download a backup after major owner-knowledge edits."};let i=Math.floor((Date.now()-Date.parse(t.exportedAt))/864e5);return n&&t.versionHash&&t.versionHash!==n?{status:"warning",label:"Backup outdated",action:"Current owner data changed after the last downloaded backup."}:Number.isFinite(i)&&i>14?{status:"warning",label:`${i} days old`,action:"Download a fresh backup this week."}:{status:"ready",label:t.versionShort?`Saved ${t.versionShort}`:"Backup recent",action:"Local backup marker matches the current browser record."}}function pr(n,e,t,i){return`
    <article class="${m(t)}">
      <small>${m(n)}</small>
      <b>${m(e)}</b>
      <p>${m(i)}</p>
    </article>
  `}function Sr(n=""){return n==="ready"?"READY":n==="missing"?"BLOCKED":n==="warning"?"CHECK":"UNKNOWN"}function qC(n={}){return`
    <article class="${m(n.status||"warning")}">
      <small>${m(n.label||"Ops check")}</small>
      <b>${m(Sr(n.status))}</b>
      <p>${m(n.detail||"Status unavailable.")}</p>
      ${n.action?`<em>${m(n.action)}</em>`:""}
    </article>
  `}function Vb(n={}){let e=Array.isArray(n.checks)?n.checks:[];if(!e.length){ty.innerHTML='<article class="warning"><small>PRODUCTION OPS</small><b>Token required</b><p>Load the owner console to check storage, AI, billing, backup, and launch readiness.</p></article>';return}let t=n.summary||{};ty.innerHTML=`
    <article class="ownerIntelOpsLead ${m(n.status||"warning")}">
      <small>PRODUCTION OPS</small>
      <b>${m(Sr(n.status))}</b>
      <p>${m(t.ready||0)} ready / ${m(t.warning||0)} warning / ${m(t.missing||0)} blocked</p>
      <em>${m(n.generatedAt||"")}</em>
    </article>
    ${e.map(qC).join("")}
  `}function jC(n=[]){if(!n.length)return 0;let e=n.reduce((t,i)=>{let s=(i.cases?38:0)+(i.observations?18:0)+(i.observations&&!i.stale?17:0)+(i.evidence?27:0);return t+Math.max(0,Math.min(100,s-(i.stale?12:0)))},0);return Math.round(e/n.length)}function Hb(n=[]){let e={missing:0,stale:1,partial:2,ready:3};return[...n].sort((t,i)=>e[t.status]-e[i.status]||i.missing.length-t.missing.length)}function XC(n=[]){let e=Hb(n);return il==="all"?e:e.filter(t=>t.status===il)}function zb(n=[]){let e=XC(n);Oy.querySelectorAll("[data-owner-intel-filter]").forEach(t=>{let i=t.getAttribute("data-owner-intel-filter")===il;t.setAttribute("aria-pressed",i?"true":"false")}),Rf.innerHTML=e.length?e.slice(0,10).map(YC).join(""):n.length?`<p class="ownerIntelEmpty">No ${m(il)} projects in the current owner coverage view.</p>`:'<p class="ownerIntelEmpty">No projects loaded yet. Start by adding tracked projects in the Market console.</p>'}function YC(n){let e=[n.project.area,n.project.state,n.project.propertyType].filter(Boolean).join(" / ")||"No project detail";return`
    <article class="ownerIntelCoverageItem ${m(n.status)}" data-owner-intel-project="${m(n.project.id)}">
      <header><span><small>${m(e)}</small><b>${m(n.project.name)}</b></span><em>${m(n.status)}</em></header>
      <div>
        <span>${m(n.cases)} case</span>
        <span>${m(n.observations)} signal</span>
        <span>${m(n.evidence)} proof</span>
        <span>${m(n.stale)} stale</span>
      </div>
      <p>${m(n.missing.length?`Missing ${n.missing.join(", ")}.`:"Coverage is strong enough for project-aware Apex reasoning.")}</p>
      <div class="ownerIntelCoverageActions">
        <button type="button" data-owner-intel-action="case" data-owner-intel-project="${m(n.project.id)}">CASE</button>
        <button type="button" data-owner-intel-action="signal" data-owner-intel-project="${m(n.project.id)}">SIGNAL</button>
        <button type="button" data-owner-intel-action="proof" data-owner-intel-project="${m(n.project.id)}">PROOF</button>
      </div>
    </article>
  `}function KC(){let n=sl||{},e=Hb(n.rows||[]),t=n.score||0,i=n.ops||{},r=(Array.isArray(i.checks)?i.checks:[]).filter(o=>o.status!=="ready"),a=["APEX OWNER INTELLIGENCE BRIEF",new Intl.DateTimeFormat("en-MY",{dateStyle:"medium",timeStyle:"short"}).format(new Date),"",`Coverage score: ${t}%`,`Production ops: ${Sr(i.status)} (${i.summary?.ready||0} ready / ${i.summary?.warning||0} warning / ${i.summary?.missing||0} blocked)`,`Projects: ${n.projectCount||0}`,`Cases: ${n.caseCount||0}`,`Observations: ${n.observationCount||0}`,`Evidence documents: ${n.documentCount||0}`,`Validated research studies: ${n.researchStudyCount||0}`,`Complete projects: ${n.complete||0}`,"","Production gaps:",...r.length?r.slice(0,8).map(o=>`- ${o.label}: ${Sr(o.status)} / ${o.action||o.detail||"Review required."}`):["- None loaded or all clear."],"","Priority gaps:",...e.length?e.slice(0,10).map(o=>{let l=o.project?.name||"Unnamed project",c=[o.project?.area,o.project?.state,o.project?.propertyType].filter(Boolean).join(" / ")||"No detail",d=o.missing.length?o.missing.join(", "):"none";return`- ${l} (${c}) / ${o.status}: ${d}; ${o.cases} case, ${o.observations} signal, ${o.evidence} proof, ${o.stale} stale.`}):["- No project coverage loaded yet."],"","Next operating rule: add founder case judgment, fresh dated market signal, and evidence proof for every tracked project before relying on project-aware reasoning."];return Li(a.join(`
`))}async function JC(){await sm(KC());let n=wu.textContent;wu.textContent="COPIED",window.setTimeout(()=>{wu.textContent=n||"COPY BRIEF"},1200),Ge("Owner intelligence brief copied.")}function ZC(n,e){let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=n,document.body.append(s),s.click(),s.remove(),URL.revokeObjectURL(i)}async function QC(){if(!Ni())return pi.focus();Vp.disabled=!0;try{Ge("Preparing owner knowledge backup...");let n=await Et("/api/owner/export?chunks=true"),e=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");ZC(`apex-owner-knowledge-${e}.json`,n);let t=GC(n),i="";try{i=` Server ledger: ${(await eR(n)).ledger?.label||"recorded"}.`}catch{i=" Server ledger could not be updated."}Ge(`Owner backup downloaded: ${n.counts?.projects||0} projects, ${n.counts?.observations||0} observations, ${n.counts?.developmentCases||0} cases, ${n.counts?.documents||0} documents, ${n.counts?.chunks||0} chunks. Version ${t.versionShort||"recorded"}.${i}`)}finally{Vp.disabled=!1}}async function eR(n={}){return Et("/api/owner/backup/events",{method:"POST",body:JSON.stringify({backupHash:n.integrity?.hash||"",contentVersionHash:n.contentVersion?.hash||"",exportedAt:n.exportedAt||new Date().toISOString(),counts:n.counts||{},source:"owner-console"})})}async function tR(){if(!Ni())return pi.focus();zp.disabled=!0;try{Ge("Checking owner backup reminder...");let n=await Et("/api/owner/backup/reminder",{method:"POST",body:JSON.stringify({force:!1})}),e=n.reminder||{},t=n.sent?"sent":n.skipped?"not sent":"checked";Ge(`Backup reminder ${t}: ${e.message||n.reason||"No reminder needed."}`,n.sent||e.due?"warning":""),await Ns()}finally{zp.disabled=!1}}async function nR(){if(!Ni())return pi.focus();$p.disabled=!0;try{Ge("Checking production operations...");let n=await Et("/api/owner/ops");sl={...sl||{},ops:n},Vb(n),Ge(`Production ops: ${Sr(n.status)}. ${n.summary?.ready||0} ready, ${n.summary?.warning||0} warning, ${n.summary?.missing||0} blocked.`,n.status==="ready"?"":"warning")}finally{$p.disabled=!1}}function iR(n={}){let e=n.incoming||{},t=Array.isArray(n.warnings)&&n.warnings.length?` Warning: ${n.warnings[0]}`:"";return`Backup ready to restore: ${e.projects||0} projects, ${e.observations||0} observations, ${e.developmentCases||0} cases, ${e.documents||0} documents.${t}`}async function sR(n){if(!Ni())return pi.focus();if(n){Hp.disabled=!0,Nt.hidden=!0,Nt.value="",Nt.placeholder="Type RESTORE OWNER KNOWLEDGE",Ci.hidden=!0,Ts=null;try{Ge("Validating owner backup...");let e=await n.text(),t=JSON.parse(e),i=await Et("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:t,dryRun:!0})});Ts=t,Nt.hidden=!1,Ci.hidden=!1,Ge(`${iR(i)} Type RESTORE OWNER KNOWLEDGE, then press CONFIRM RESTORE only if this backup should replace current owner knowledge.`,i.warnings?.length?"warning":"")}catch(e){Ts=null,Nt.hidden=!0,Ci.hidden=!0,Ge(e.message||"Backup could not be validated.","danger")}finally{Hp.disabled=!1,Lu.value=""}}}async function rR(){if(!Ts)return Nt.hidden=!0,Ci.hidden=!0,Ge("Choose and validate a backup first.","warning");let n=Nt.value.trim();if(n!=="RESTORE OWNER KNOWLEDGE")return Nt.focus(),Ge("Type RESTORE OWNER KNOWLEDGE before restoring this backup.","warning");Ci.disabled=!0;try{Ge("Restoring owner knowledge backup...");let e=await Et("/api/owner/restore",{method:"POST",body:JSON.stringify({backup:Ts,dryRun:!1,confirmRestore:n})});Ts=null,Nt.value="",Nt.hidden=!0,Ci.hidden=!0,await Ns(),Ma.hidden||am(e.history||{}),Ge(`Owner knowledge restored: ${e.counts?.projects||0} projects, ${e.counts?.observations||0} observations, ${e.counts?.developmentCases||0} cases, ${e.counts?.researchStudies||0} research studies, ${e.counts?.documents||0} documents.`,"warning")}finally{Ci.disabled=!1}}function aR(n={}){return`${n.projects||0} projects / ${n.observations||0} signals / ${n.developmentCases||0} cases / ${n.researchStudies||0} research / ${n.documents||0} docs`}function am(n={}){let e=Array.isArray(n.snapshots)?n.snapshots:[],t=Array.isArray(n.events)?n.events:[],i=n.summary?.currentVersionShort||"",s=n.backup||{};Ma.hidden=!1,Ma.innerHTML=`
    <header><span><small>OWNER DATA SAFETY${i?` / VERSION ${m(i)}`:""}</small><b>${m(e.length)} rollback snapshot${e.length===1?"":"s"}</b><em>${m(s.label||"No server backup record")}</em></span><em>${m(t.length)} event${t.length===1?"":"s"}</em></header>
    ${e.length?e.map(r=>`
      <article>
        <span><small>${m(r.reason||"snapshot")}</small><b>${m(aR(r.counts))}</b><em>${m(r.createdAt||"")}</em></span>
        <button type="button" data-owner-rollback-snapshot="${m(r.id)}">ROLLBACK</button>
      </article>
    `).join(""):'<p class="ownerIntelEmpty">No rollback snapshots yet. Apex creates one before every confirmed restore or rollback.</p>'}
    ${t.length?`<p>Latest: ${m(t[0].type||"restore")} / ${m(t[0].createdAt||"")}</p>`:""}
  `}async function oR(){if(!Ni())return pi.focus();Ts=null,Ci.hidden=!0,Nt.value="",Nt.placeholder="Type ROLLBACK OWNER KNOWLEDGE",Ge("Loading owner restore log...");let n=await Et("/api/owner/restore/history");am(n),Nt.hidden=!(n.snapshots||[]).length,Ge(`Restore log loaded: ${n.summary?.snapshots||0} rollback snapshots, ${n.summary?.events||0} restore events.`)}function lR(n={}){return n.reviewState==="overdue"?`OVERDUE ${Math.abs(Number(n.dueInDays)||0)}d`:n.status==="contested"?"CONTESTED":n.unverifiedHighConfidence?"UNVERIFIED":n.reviewState==="due"?`DUE ${Math.max(0,Number(n.dueInDays)||0)}d`:`IN ${Math.max(0,Number(n.dueInDays)||0)}d`}function cR(n={}){let e=n.summary||{},t=Array.isArray(n.queue)?n.queue:[];Gp.hidden=!1,Gp.innerHTML=`
    <header>
      <span>
        <small>BELIEF REVIEW</small>
        <b>${m(e.overdue||0)} overdue / ${m(e.dueSoon||0)} due soon</b>
        <em>${m(e.neverReviewed||0)} of ${m(e.active||0)} never verified against a real case</em>
      </span>
      <em>${m(e.unverifiedHighConfidence||0)} high-confidence unverified</em>
    </header>
    ${t.length?t.map(i=>`
      <article>
        <span>
          <small>${m(lR(i))} / ${m(i.confidence)}% / ${m(i.scope||"General")}</small>
          <b>${m(i.claim)}</b>
          <em>Falsifier: ${m(i.falsifier||"Not recorded")}</em>
        </span>
        <button type="button" data-belief-review="confirm" data-belief-id="${m(i.id)}">HELD UP</button>
        <button type="button" data-belief-review="contest" data-belief-id="${m(i.id)}">COUNTEREXAMPLE</button>
      </article>
    `).join(""):'<p class="ownerIntelEmpty">No belief is due for review. Every active belief has a scheduled re-test date.</p>'}
    ${e.withSourceQuestion===0&&e.active?'<p class="ownerIntelEmpty">No belief records the source question it came from yet.</p>':""}
  `}async function Gb(){if(!Ni())return pi.focus();Ge("Loading belief review queue...");let n=await Et("/api/owner/beliefs/review?limit=25");cR(n);let e=n.summary||{};Ge(`Belief review: ${e.overdue||0} overdue, ${e.dueSoon||0} due soon, ${e.neverReviewed||0} never verified.`,e.overdue||e.contested?"warning":"")}async function uR(n){let e=n.getAttribute("data-belief-id"),t=n.getAttribute("data-belief-review");if(!e||!t)return;let i=t==="confirm"?"What evidence or real case did you check that kept this belief standing?":"What counterexample or case challenges this belief?",s=window.prompt(i,"");if(s!==null){if(s.trim().length<8)return Ge("Record what you actually checked before closing a belief review.","warning");n.disabled=!0;try{await Et(`/api/brain/beliefs/${encodeURIComponent(e)}`,{method:"PATCH",body:JSON.stringify({action:t,note:s.trim()})}),await Gb(),Ge(t==="confirm"?"Belief confirmed and re-scheduled.":"Belief marked contested for a 90-day re-test.",t==="confirm"?"":"warning")}finally{n.disabled=!1}}}async function dR(n){if(!n)return;let e=Nt.value.trim();if(e!=="ROLLBACK OWNER KNOWLEDGE")return Nt.hidden=!1,Nt.placeholder="Type ROLLBACK OWNER KNOWLEDGE",Nt.focus(),Ge("Type ROLLBACK OWNER KNOWLEDGE before rolling back to this snapshot.","warning");Ge("Rolling owner knowledge back to selected snapshot...");let t=await Et("/api/owner/restore/rollback",{method:"POST",body:JSON.stringify({snapshotId:n,dryRun:!1,confirmRollback:e})});Nt.value="",await Ns(),am(t.history||{}),Ge(`Owner knowledge rolled back: ${t.counts?.projects||0} projects, ${t.counts?.observations||0} observations, ${t.counts?.developmentCases||0} cases, ${t.counts?.researchStudies||0} research studies.`,"warning")}function hR(n){let e=[{id:"free",name:"Free"},{id:"pro",name:"Pro"},{id:"advisor",name:"Advisor"}];return(Bu.length?Bu:e).map(i=>`<option value="${m(i.id)}"${i.id===n?" selected":""}>${m(i.name||i.id)}</option>`).join("")}function pR(n){return`
    <article class="ownerAdminUser ${n.disabled?"disabled":""}" data-owner-admin-user="${m(n.id)}">
      <header>
        <span><small>${m(n.role||"member")} / ${m(n.plan||"free")}</small><b>${m(n.displayName||n.email)}</b><em>${m(n.email)}</em></span>
        <strong>${m(n.disabled?"DISABLED":n.emailVerified?"VERIFIED":"UNVERIFIED")}</strong>
      </header>
      <div class="ownerAdminGrid">
        <label>Role
          <select data-owner-admin-field="role">
            <option value="member"${n.role!=="admin"?" selected":""}>Member</option>
            <option value="admin"${n.role==="admin"?" selected":""}>Admin</option>
          </select>
        </label>
        <label>Plan
          <select data-owner-admin-field="plan">${hR(n.plan||"free")}</select>
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
  `}function Wb(n=[]){ky.textContent=n.length?`${n.length} user${n.length===1?"":"s"} loaded`:"No users found",Pf.innerHTML=n.length?n.map(pR).join(""):'<p class="ownerIntelEmpty">No account users loaded yet.</p>'}async function qb(){if(!Ni())return ky.textContent="Owner token required",Pf.innerHTML='<p class="ownerIntelEmpty">Paste the owner token above before loading users.</p>',null;Ge("Loading user control...");let n=await Et("/api/admin/users");return Wb(n.users||[]),Ge("User control loaded."),n}async function fR(n){let e=n.closest("[data-owner-admin-user]"),t=e?.getAttribute("data-owner-admin-user");if(!t)return;let i=r=>e.querySelector(`[data-owner-admin-field="${r}"]`)?.value||"",s={role:i("role"),plan:i("plan"),planStatus:i("planStatus"),emailVerified:i("emailVerified")==="true",disabled:i("disabled")==="true"};n.disabled=!0;try{await Et(`/api/admin/users/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(s)}),await qb(),Ge("User updated.")}finally{n.disabled=!1}}function of({projects:n={},observations:e={},cases:t={},evidence:i={},research:s={},history:r={},ops:a={}}={}){let o=Array.isArray(n.projects)?n.projects:[],l=Array.isArray(e.observations)?e.observations:[],c=Array.isArray(t.cases)?t.cases:[],d=Array.isArray(i.documents)?i.documents:[],u=Array.isArray(s.studies)?s.studies:[];zu(s),Vb(a),gb=o,ns=o,Kb(o),Xb(o);let h=HC(o,c,l,d),g=h.filter(_=>_.cases===0).length,v=l.filter(_=>_.freshness?.status==="stale").length,y=h.filter(_=>_.evidence===0).length,f=h.filter(_=>_.status==="ready").length,p=jC(h),M=WC(r.summary?.currentVersionHash||"",r.backup||{});sl={rows:h,score:p,projectCount:o.length,caseCount:t.summary?.total??c.length,observationCount:e.summary?.matched??l.length,documentCount:i.summary?.documents??d.length,researchStudyCount:u.length,complete:f,currentVersionShort:r.summary?.currentVersionShort||"",backupReminder:M,ops:a},TA.innerHTML=`
    <span><b>${m(p)}%</b> COVERAGE</span>
    <span><b>${m(Sr(a.status))}</b> OPS</span>
    <span><b>${m(o.length)}</b> PROJECTS</span>
    <span><b>${m(t.summary?.total??c.length)}</b> CASES</span>
    <span><b>${m(e.summary?.matched??l.length)}</b> OBSERVATIONS</span>
    <span><b>${m(i.summary?.documents??d.length)}</b> DOCUMENTS</span>
    <span><b>${m(u.length)}</b> RESEARCH</span>
    <span><b>${m(f)}</b> COMPLETE</span>
  `,IA.innerHTML=[pr("Project registry",`${o.length} tracked`,o.length?"ready":"missing",o.length?"Registry exists.":"Add projects before cases can be linked."),pr("Founder cases",`${g} missing`,g?"warning":"ready",g?"Write founder opinion for unmatched projects.":"Case coverage is broad."),pr("Market freshness",`${v} stale`,v?"warning":l.length?"ready":"missing",v?"Re-check old observations.":l.length?"Signals are current enough.":"Add dated ground signals."),pr("Evidence vault",`${y} unbacked`,y?"warning":d.length?"ready":"missing",y?"Attach proof to important projects.":d.length?"Evidence exists.":"Add source proof."),pr("Research studies",`${u.length} validated`,u.length?"ready":"missing",u.length?"Strict research can now support market questions.":"Import a strictly validated study bundle when one is ready."),pr("Backup rhythm",M.label,M.status,M.action),pr("Production ops",Sr(a.status),a.status||"warning",a.summary?`${a.summary.ready||0} ready, ${a.summary.warning||0} warning, ${a.summary.missing||0} blocked.`:"Load owner token to check launch readiness.")].join(""),zb(h);let x={title:"Add project registry",detail:"Apex needs tracked projects before owner intelligence can become project-specific.",action:"market"};g?x={title:"Write missing case opinions",detail:`${g} tracked project${g===1?"":"s"} do not have founder case notes yet.`,action:"cases"}:v?x={title:"Refresh stale market signals",detail:`${v} observation${v===1?" is":"s are"} stale and should be re-verified.`,action:"market"}:y?x={title:"Attach evidence proof",detail:`${y} project${y===1?"":"s"} have no obvious evidence document match.`,action:"evidence"}:u.length?o.length&&(x={title:"Coverage looks healthy",detail:"Keep adding dated observations and update case notes when the market changes.",action:"refresh"}):x={title:"Import validated market research",detail:"The framework is ready; add a strict research bundle to extend it with dated external evidence.",action:"research"},PA.textContent=x.title,LA.textContent=x.detail,If.innerHTML=`
    <button type="button" data-owner-intel-action="${m(x.action)}">DO NEXT</button>
    <button type="button" data-owner-intel-action="market">PROJECTS / SIGNALS</button>
    <button type="button" data-owner-intel-action="cases">CASES</button>
    <button type="button" data-owner-intel-action="evidence">EVIDENCE</button>
    <button type="button" data-owner-intel-action="research">RESEARCH</button>
  `}async function Ns(){if(!Ni())return of(),Ge(hl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Ge("Loading owner intelligence coverage...");let[n,e,t,i,s,r,a]=await Promise.all([Et("/api/owner/market/projects"),Et("/api/owner/market/observations?limit=500"),Et("/api/owner/development-cases?limit=500"),Et("/api/owner/documents"),Et("/api/owner/research/studies"),Et("/api/owner/restore/history"),Et("/api/owner/ops")]);return of({projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:a}),Ge("Owner intelligence coverage loaded."),{projects:n,observations:e,cases:t,evidence:i,research:s,history:r,ops:a}}async function Gu(n,e={}){let t=Bb();if(!t)throw new Error("Paste and save the owner token first.");return Ye(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}async function om(n,e={}){let t=Fb();if(!t)throw new Error("Paste and save the owner token first.");return Ye(n,{...e,headers:{"x-estatelab-owner-token":t,...e.headers||{}}})}function mR(n=[]){return Array.isArray(n)&&n.length?n.join(", "):"untagged"}function gR(n){return`
    <article class="ownerEvidenceItem ${m(n.status||"stored")}" data-owner-evidence="${m(n.id)}">
      <header>
        <span><small>${m(mR(n.tags))}</small><b>${m(n.title||"Owner evidence")}</b></span>
        <em>${m(n.status||"stored")} / ${m(n.chunkCount||0)} chunks</em>
      </header>
      <p>${m(n.filename||"Evidence file")}${n.sourceUrl?` / ${m(n.sourceUrl)}`:""}</p>
      <div class="ownerEvidenceMeta">
        <span>${m(n.indexMode||"stored")} index</span>
        <span>${m(n.updatedAt?um(n.updatedAt):"No date")}</span>
      </div>
      <button type="button" data-owner-evidence-action="delete" data-owner-evidence-id="${m(n.id)}">DELETE</button>
    </article>
  `}function vR(n,e){if(!e)return!0;let t=[n.title,n.filename,n.sourceUrl,n.status,n.indexMode,...n.tags||[]].join(" ").toLowerCase();return e.split(/\s+/).filter(Boolean).every(i=>t.includes(i))}function jb(){let n=Gf.value.trim().toLowerCase(),e=sf.filter(t=>vR(t,n));ib.innerHTML=e.length?e.map(gR).join(""):sf.length?'<p class="ownerEvidenceEmpty">No evidence documents match this filter.</p>':'<p class="ownerEvidenceEmpty">No evidence documents yet. Add the first transaction, rent, financing, legal, or site proof above.</p>'}function lf(n={}){let e=Array.isArray(n.documents)?n.documents:[],t=n.summary||{};sf=e,eT.innerHTML=`
    <span><b>${m(t.documents||e.length)}</b> DOCUMENTS</span>
    <span><b>${m(t.indexed||0)}</b> INDEXED</span>
    <span><b>${m(t.chunks||0)}</b> CHUNKS</span>
    <span>${m(t.embeddingProvider?"EMBEDDINGS ON":"LEXICAL SEARCH")}</span>
  `,iT.textContent=`${t.chunks||0} indexed chunks`,jb()}async function gl(){if(!Fb())return lf({}),Vn(hl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Vn("Loading evidence vault...");let n=await om("/api/owner/documents");return lf(n),Vn("Evidence vault loaded."),n}async function yR(){let n=Ou.value.trim(),e=ku.value.trim();if(!n)return Ou.focus();if(!e)return ku.focus();Vn("Indexing evidence..."),await om("/api/owner/documents",{method:"POST",body:JSON.stringify({title:n,filename:tb.value.trim()||`${n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"evidence"}.md`,mimeType:"text/markdown",sourceUrl:tT.value.trim(),tags:nb.value.split(",").map(t=>t.trim()).filter(Boolean),text:e})}),Xp.reset(),await gl(),Vn("Evidence added. V8 reports can now retrieve it when relevant.")}async function bR(n){let e=n.getAttribute("data-owner-evidence-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Vn("Press CONFIRM to delete this evidence document.");return}n.disabled=!0;try{await om(`/api/owner/documents/${encodeURIComponent(e)}`,{method:"DELETE"}),await gl(),Vn("Evidence deleted.")}catch(t){n.disabled=!1,Vn(t.message||"Evidence could not be deleted.","danger")}}}function lm(n){return{strong_buy:"Strong buy",shortlist:"Shortlist",watch:"Watch",avoid:"Avoid",unknown:"Unknown"}[n]||"Watch"}function Xb(n=ns){Ra.innerHTML='<option value="">No linked market project</option>'+n.map(e=>`<option value="${m(e.id)}">${m(e.name)}${e.area?` / ${m(e.area)}`:""}</option>`).join("")}function cf(n){return[n.managementView,n.residentProfile,n.supplyThreat,n.rentalOutlook,n.resaleOutlook,n.sourceBasis].filter(e=>!String(e||"").trim()).length}function xR(){let n=Zy.value;return n?$u.filter(e=>n==="incomplete"?cf(e)>0:cf(e)===0):$u}function _R(n){let e=[n.area,n.state,n.propertyType,n.priceSegment].filter(Boolean).join(" / ")||"No project detail",t=n.ownerVerdict||n.strengths||n.weaknesses||"No founder verdict recorded.",i=cf(n);return`
    <article class="ownerCaseItem ${m(n.verdict||"watch")}" data-owner-case="${m(n.id)}">
      <header>
        <span><small>${m(e)}</small><b>${m(n.projectName||"Development case")}</b></span>
        <em>${m(lm(n.verdict))} / ${m(n.confidence||"medium")}</em>
      </header>
      <p>${m(t)}</p>
      <div class="ownerCaseMeta">
        <span>${m(n.rating||0)}/100</span>
        <span>${m(n.sourceBasis||"No source basis")}</span>
        <span>${m(n.observedAt?um(n.observedAt):"No date")}</span>
        ${i?`<span>${m(i)} gaps</span>`:"<span>complete</span>"}
      </div>
      <div class="ownerCaseItemActions">
        <button type="button" data-owner-case-action="edit" data-owner-case-id="${m(n.id)}">EDIT</button>
        <button type="button" data-owner-case-action="delete" data-owner-case-id="${m(n.id)}">DELETE</button>
      </div>
    </article>
  `}function Wu(n={}){let e=Array.isArray(n.cases)?n.cases:[];vb=n,$u=e;let t=n.summary||{},i=t.coverage||{},s=xR();YA.innerHTML=`
    <span><b>${m(t.total??e.length)}</b> CASES</span>
    <span><b>${m(t.shortlist||0)}</b> SHORTLIST</span>
    <span><b>${m(t.strong_buy||0)}</b> STRONG BUY</span>
    <span><b>${m(t.avoid||0)}</b> AVOID</span>
    <span><b>${m(i.areas||0)}</b> AREAS</span>
    <span><b>${m(i.incomplete||0)}</b> GAPS</span>
  `,JA.textContent=`${s.length} shown / ${t.matched??e.length} matched`,Qy.innerHTML=s.length?s.map(_R).join(""):'<p class="ownerCaseEmpty">No development cases match this filter yet. Add the first project opinion above.</p>'}function SR(){let n=new URLSearchParams;return qp.value.trim()&&n.set("q",qp.value.trim()),jp.value&&n.set("verdict",jp.value),n.set("limit","120"),n.toString()}async function wr(){if(!Bb())return Wu({}),Jt(hl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Jt("Loading development case library...");let[n,e]=await Promise.all([Gu("/api/owner/market/projects"),Gu(`/api/owner/development-cases?${SR()}`)]);return ns=Array.isArray(n.projects)?n.projects:[],Xb(ns),Wu(e),Jt("Development case library loaded."),{projects:n,cases:e}}function Yb(){return ns.find(n=>n.id===Ra.value)}function wR(){let n=Yb(),e=br.value.trim()||n?.name||"";return{projectId:Ra.value,projectName:e,area:Zo.value.trim()||n?.area||"",state:Qo.value.trim()||n?.state||"",propertyType:el.value.trim()||n?.propertyType||"",developer:tl.value.trim()||n?.developer||"",priceSegment:Fy.value.trim(),targetBuyer:zy.value.trim(),targetTenant:Gy.value.trim(),strengths:Wy.value.trim(),weaknesses:qy.value.trim(),managementView:jy.value.trim(),residentProfile:Xy.value.trim(),supplyThreat:Yy.value.trim(),rentalOutlook:Ky.value.trim(),resaleOutlook:Jy.value.trim(),ownerVerdict:Vf.value.trim(),verdict:By.value,confidence:$y.value,rating:Vy.value.trim(),observedAt:nd.value||new Date().toISOString(),sourceBasis:Hf.value.trim(),tags:Hy.value.split(",").map(t=>t.trim()).filter(Boolean)}}function cm(){al="",$f.reset(),nd.value=new Date().toISOString().slice(0,10),eb.textContent="Add Development Opinion",Du.textContent="ADD CASE",zf.hidden=!0}function ER(n){al=n.id||"",Ra.value=n.projectId||"",br.value=n.projectName||"",Zo.value=n.area||"",Qo.value=n.state||"",el.value=n.propertyType||"",tl.value=n.developer||"",Fy.value=n.priceSegment||"",By.value=n.verdict||"watch",$y.value=n.confidence||"medium",Vy.value=n.rating||"",nd.value=n.observedAt?String(n.observedAt).slice(0,10):new Date().toISOString().slice(0,10),Hy.value=Array.isArray(n.tags)?n.tags.join(", "):"",zy.value=n.targetBuyer||"",Gy.value=n.targetTenant||"",Wy.value=n.strengths||"",qy.value=n.weaknesses||"",jy.value=n.managementView||"",Xy.value=n.residentProfile||"",Yy.value=n.supplyThreat||"",Ky.value=n.rentalOutlook||"",Jy.value=n.resaleOutlook||"",Vf.value=n.ownerVerdict||"",Hf.value=n.sourceBasis||"",eb.textContent=`Edit ${n.projectName||"Development Case"}`,Du.textContent="SAVE CASE",zf.hidden=!1,$f.scrollIntoView({behavior:"smooth",block:"nearest"}),Jt("Editing existing development case. Save to update, or cancel edit.")}function MR(n){let e=n.getAttribute("data-owner-case-id"),t=$u.find(i=>i.id===e);if(!t)return Jt("Case not found in the current filtered list. Refresh and try again.","warning");ER(t)}async function AR(){let n=wR();if(!n.projectName)return br.focus();let e=!!al;Jt(e?"Updating development case...":"Adding development case...");let t=e?`/api/owner/development-cases/${encodeURIComponent(al)}`:"/api/owner/development-cases";await Gu(t,{method:e?"PATCH":"POST",body:JSON.stringify(n)}),cm(),await wr(),Jt(e?"Development case updated.":"Development case added. Apex can now match it in answers and deal reports.")}async function TR(n){let e=n.getAttribute("data-owner-case-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Jt("Press CONFIRM to delete this development case.");return}n.disabled=!0;try{await Gu(`/api/owner/development-cases/${encodeURIComponent(e)}`,{method:"DELETE"}),al===e&&cm(),await wr(),Jt("Development case deleted.")}catch(t){n.disabled=!1,Jt(t.message||"Development case could not be deleted.","danger")}}}function CR(n){return String(n||"other").replaceAll("_"," ")}function um(n){if(!n)return"No date";try{return new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date(n))}catch{return String(n).slice(0,10)}}function Kb(n=[]){xr.innerHTML='<option value="">Area-only observation</option>'+n.map(e=>`<option value="${m(e.id)}">${m(e.name)}${e.area?` / ${m(e.area)}`:""}</option>`).join("")}function RR(n){let e=[n.area,n.state,n.propertyType,n.tenure].filter(Boolean).join(" / ")||"No project detail";return`
    <article class="ownerMarketItem">
      <header><span><small>${m(e)}</small><b>${m(n.name)}</b></span><em>${m(n.observationCount||0)} obs</em></header>
      <p>${m(n.developer||n.status||"Add observations to make this project useful.")}</p>
    </article>
  `}function IR(n){let e=n.project?.name||n.projectName||n.area||"Area observation",t=n.freshness?.status||"unknown",i=Number.isFinite(Number(n.freshness?.ageDays))?`${n.freshness.ageDays}d`:"age n/a",s=n.trend?`${n.trend.direction}${n.trend.percentChange===null||n.trend.percentChange===void 0?"":` ${n.trend.percentChange>0?"+":""}${n.trend.percentChange}%`}`:"no trend",r=n.value===null||n.value===void 0?"Qualitative":`${n.value}${n.unit?` ${n.unit}`:""}`;return`
    <article class="ownerMarketItem ${m(t)}" data-owner-observation="${m(n.id)}">
      <header>
        <span><small>${m(CR(n.metricType))} / ${m(um(n.observedAt))}</small><b>${m(e)}</b></span>
        <em>${m(t)} / ${m(i)}</em>
      </header>
      <p>${m(r)}. ${m(n.notes||"No notes recorded.")}</p>
      <div class="ownerMarketMeta">
        <span>${m(n.confidence||"medium")} confidence</span>
        <span>${m(n.sourceType||"owner observation")}</span>
        <span>${m(s)}</span>
      </div>
      <button type="button" data-owner-market-action="delete-observation" data-owner-market-id="${m(n.id)}">DELETE</button>
    </article>
  `}function Jb(n={},e={}){let t=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(e.observations)?e.observations:[];ns=t,Kb(t),vT.textContent=String(t.length),yT.textContent=String(e.summary?.matched||i.length),qA.innerHTML=`
    <span><b>${m(t.length)}</b> PROJECTS</span>
    <span><b>${m(n.summary?.observations??i.length)}</b> OBSERVATIONS</span>
    <span><b>${m(e.summary?.fresh||0)}</b> FRESH</span>
    <span><b>${m(e.summary?.stale||0)}</b> STALE</span>
  `,ob.innerHTML=t.length?t.map(RR).join(""):'<p class="ownerMarketEmpty">No market projects yet. Add one above, then attach observations.</p>',Wf.innerHTML=i.length?i.map(IR).join(""):'<p class="ownerMarketEmpty">No observations match this filter yet.</p>'}function PR(){let n=new URLSearchParams;return Jp.value.trim()&&n.set("area",Jp.value.trim()),Zp.value&&n.set("metricType",Zp.value),Qp.value&&n.set("freshness",Qp.value),n.set("limit","120"),n.toString()}async function Di(){if(!gd())return ob.innerHTML='<p class="ownerMarketEmpty">Owner token required before loading market evidence.</p>',Wf.innerHTML='<p class="ownerMarketEmpty">Paste your owner token above, then press SAVE.</p>',Tt(hl?"Owner API is enabled. Token required.":"Owner API may be disabled. Set the owner token on Render if this fails.","warning"),null;Tt("Loading owner market intelligence...");let n=PR(),[e,t]=await Promise.all([Ta("/api/owner/market/projects"),Ta(`/api/owner/market/observations?${n}`)]);return Jb(e,t),Tt("Market intelligence loaded."),{projects:e,observations:t}}function gn(){Nf.hidden=!0,Lf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerMarketOpen")}function vn(){Of.hidden=!0,Df.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerCaseOpen")}function yn(){Uf.hidden=!0,kf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerEvidenceOpen")}function sn(){ed.hidden=!0,Cf.setAttribute("aria-expanded","false"),document.body.classList.remove("ownerIntelOpen")}async function Zb(){nn("owner"),Hn(),pn(),fn(),mn(),sn(),gn(),vn(),yn(),hn(),Cn(),Rn(),ed.hidden=!1,Cf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerIntelOpen"),Qn(window.localStorage.getItem(Is)||pi.value);try{await Ns()}catch(n){Ge(n.message||"Owner intelligence console is unavailable.","danger")}}async function vd(){nn("cases"),Hn(),pn(),fn(),mn(),sn(),gn(),yn(),hn(),Cn(),Rn(),Of.hidden=!1,Df.setAttribute("aria-expanded","true"),document.body.classList.add("ownerCaseOpen"),Qn(window.localStorage.getItem(Is)||Jo.value),nd.value||=new Date().toISOString().slice(0,10);try{await wr()}catch(n){Jt(n.message||"Development case library is unavailable.","danger")}}async function yd(){nn("evidence"),Hn(),pn(),fn(),mn(),sn(),gn(),vn(),hn(),Cn(),Rn(),Uf.hidden=!1,kf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerEvidenceOpen"),Qn(window.localStorage.getItem(Is)||nl.value);try{await gl()}catch(n){Vn(n.message||"Evidence vault is unavailable.","danger")}}async function bd(){nn("market"),Hn(),pn(),fn(),mn(),sn(),vn(),yn(),hn(),Cn(),Rn(),Nf.hidden=!1,Lf.setAttribute("aria-expanded","true"),document.body.classList.add("ownerMarketOpen"),Qn(window.localStorage.getItem(Is)||Ko.value),Uu.value||=new Date().toISOString().slice(0,10);try{await Di()}catch(n){Tt(n.message||"Owner market console is unavailable.","danger")}}function LR(n=""){return String(n||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"project"}function NR(n=""){let e=String(n||"");return gb.find(t=>t.id===e)||ns.find(t=>t.id===e)||null}function Fn(n,e){n&&!n.value&&e&&(n.value=e)}function Qb(n,e){!n||!e||Array.from(n.options).some(t=>t.value===e)&&(n.value=e)}function DR(n){return[n.name,n.area,n.state,n.propertyType].filter(Boolean).join(", ")}function OR(n){Qb(Ra,n.id),Fn(br,n.name),Fn(Zo,n.area),Fn(Qo,n.state),Fn(el,n.propertyType),Fn(tl,n.developer),Fn(Hf,"Owner console action queue"),br.scrollIntoView({behavior:"smooth",block:"center"}),Vf.focus(),Jt(`Case note prepared for ${n.name}. Add your founder judgment, then save.`)}function kR(n){Qb(xr,n.id),Fn(_a,n.area),Fn(rb,"owner ground check"),Fn(ab,`${n.name}: update the latest rental, resale, supply, management, or site signal.`),Uu.value||=new Date().toISOString().slice(0,10),xr.scrollIntoView({behavior:"smooth",block:"center"}),sb.focus(),Tt(`Market signal prepared for ${n.name}. Choose the metric and add the latest evidence.`)}function UR(n){Fn(Ou,`${n.name} evidence proof`),Fn(tb,`${LR(n.name)}-evidence.md`),Fn(nb,DR(n)),Fn(ku,`Project: ${n.name}
Area: ${n.area||"Not recorded"}
Evidence type:
Source/date:
Notes:
`),Ou.scrollIntoView({behavior:"smooth",block:"center"}),ku.focus(),Vn(`Evidence shell prepared for ${n.name}. Paste the proof, source, and date before saving.`)}async function FR(n,e){let t=NR(e);if(!t){Ge("Project could not be found. Refresh owner intelligence and try again.","warning");return}n==="case"&&(await vd(),OR(t)),n==="signal"&&(await bd(),kR(t)),n==="proof"&&(await yd(),UR(t))}async function BR(){Tt("Adding project...");let n={name:sT.value.trim(),area:rT.value.trim(),state:aT.value.trim(),propertyType:oT.value.trim(),developer:lT.value.trim(),tenure:cT.value.trim(),completionYear:uT.value.trim(),status:dT.value,aliases:hT.value.split(",").map(e=>e.trim()).filter(Boolean)};await Ta("/api/owner/market/projects",{method:"POST",body:JSON.stringify(n)}),Yp.reset(),await Di(),Tt("Project added.")}async function $R(){let n=ns.find(t=>t.id===xr.value);if(!n&&!_a.value.trim())throw _a.focus(),new Error("Add an area or link the observation to a project.");Tt("Adding observation...");let e={projectId:xr.value,area:_a.value.trim()||n?.area||"",state:n?.state||"",projectName:n?.name||"",metricType:sb.value,value:pT.value.trim(),unit:fT.value.trim(),observedAt:Uu.value,sourceType:rb.value.trim()||"owner observation",confidence:mT.value,notes:ab.value.trim()};await Ta("/api/owner/market/observations",{method:"POST",body:JSON.stringify(e)}),Kp.reset(),Uu.value=new Date().toISOString().slice(0,10),await Di(),Tt("Observation added. Apex can now match it in chat and deal reports.")}async function VR(){let n=Cp.value.trim();if(!n)return Cp.focus();let e;try{e=JSON.parse(n)}catch{throw new Error("Import must be valid JSON with projects and/or observations arrays.")}let t=Array.isArray(e.projects)?e.projects:[],i=Array.isArray(e.observations)?e.observations:[];if(!t.length&&!i.length)throw new Error("Import JSON must include at least one project or observation.");if(t.length+i.length>200)throw new Error("Each import is limited to 200 combined projects and observations.");Tt("Importing owner market batch...");let s=await Ta("/api/owner/market/import",{method:"POST",body:JSON.stringify({projects:t,observations:i})});Cp.value="",await Di();let r=Array.isArray(s.skipped)?s.skipped.length:0;Tt(`Imported ${s.imported?.projects||0} project(s) and ${s.imported?.observations||0} observation(s)${r?`; ${r} skipped.`:"."}`,r?"warning":"")}async function HR(n){let e=n.getAttribute("data-owner-market-id");if(e){if(n.dataset.confirming!=="true"){n.dataset.confirming="true",n.textContent="CONFIRM",Tt("Press CONFIRM to delete this observation.");return}n.disabled=!0;try{await Ta(`/api/owner/market/observations/${encodeURIComponent(e)}`,{method:"DELETE"}),await Di(),Tt("Observation deleted.")}catch(t){n.disabled=!1,Tt(t.message||"Observation could not be deleted.","danger")}}}function fr(n,e=[],t=""){return e.length?`
    <section class="analysisSection ${m(t)}">
      <h3>${m(n)}</h3>
      <ul>${e.map(i=>`<li>${m(i)}</li>`).join("")}</ul>
    </section>
  `:""}function Bn(n){return`RM ${Math.round(Number(n)||0).toLocaleString("en-MY")}`}function ex(n){return!n||!Array.isArray(n.items)||!n.items.length?[]:[`Down payment at ${n.loanMarginPercent}% loan margin: ${Bn(n.downPayment)}`,...n.items.map(e=>`${e.label}: ${Bn(e.amount)}`),`Total duties and fees: ${Bn(n.totalTransactionCosts)} (about ${n.costAsPercentOfPrice}% of price)`,`Estimated cash to start: ${Bn(n.estimatedCashToStart)}`,...n.rpgt?.note?[`RPGT: ${n.rpgt.note}`]:[],...n.disclaimer?[n.disclaimer]:[]]}function zR(n={}){let e=Array.isArray(n.observations)?n.observations:[];if(!e.length)return"";let t=Array.isArray(n.trends)?n.trends:[],i=n.summary||{},s=t.slice(0,4).map(a=>{let o=a.percentChange===null||a.percentChange===void 0?"":` ${Number(a.percentChange)>0?"+":""}${a.percentChange}%`;return`<span class="marketTrend ${m(a.direction)}"><small>${m(String(a.metricType||"").replaceAll("_"," "))}</small><b>${m(a.direction)}${m(o)}</b></span>`}).join(""),r=e.slice(0,6).map(a=>{let o=a.freshness?.status||"stale",l=Number(a.freshness?.ageDays||0),c=a.notes||(a.value===null?"Qualitative observation":`${a.value}${a.unit?` ${a.unit}`:""}`),d=c.length>420?`${c.slice(0,417).trim()}...`:c;return`
      <li>
        <span><b>${m(a.title)}</b><small>${m(d)}</small></span>
        <em class="${m(o)}">${m(o)} / ${m(l)}d</em>
      </li>
    `}).join("");return`
    <section class="analysisMarketPulse">
      <header><h3>OWNER MARKET PULSE</h3><span>${m(i.matched||e.length)} MATCHED</span></header>
      ${s?`<div class="marketTrends">${s}</div>`:""}
      <ul>${r}</ul>
      <p>${m(i.warning||"Check the observation dates before relying on this market read.")}</p>
    </section>
  `}function GR(n={}){let e=n.decisionFocus||{},t=n.challengeMode||{};return!e.body&&!t.message?"":`
    <section class="analysisDecisionFocus ${m(e.tone||"neutral")}">
      <span><small>${m(e.label||"Decision focus")}</small><b>${m(e.body||n.summary||"")}</b></span>
      ${t.message?`<p>${m(t.message)}</p>`:""}
    </section>
  `}function WR(n={}){if(!n.message||n.status==="inactive")return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisPersonalChallenge ${m(n.status||"challenge")}">
      <header>
        <span><small>V3.3 PERSONALIZED CHALLENGE</small><b>${m(n.label||"Personalized challenge")}</b></span>
        <em>${m(n.status||"challenge")}</em>
      </header>
      <p>${m(n.message)}</p>
      ${n.profileBasis?`<blockquote>${m(n.profileBasis)}</blockquote>`:""}
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="personalChallengeCheck ${m(t.status||"check")}">
              <i>${m(t.status||"check")}</i>
              <span><b>${m(t.label)}</b><small>${m(t.action)}</small></span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function Bo(n,e={},t="items"){if(!e.summary)return"";let i=Array.isArray(e[t])?e[t]:[],s=e.status||e.mode||"check",r=String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"check";return`
    <section class="analysisV3Insight ${m(r)}">
      <header>
        <span><small>${m(n)}</small><b>${m(e.summary)}</b></span>
        <em>${m(s)}</em>
      </header>
      ${i.length?`
        <div>
          ${i.map(a=>{let o=a.subject||a.label||a.type||"Memory signal",l=a.similarity?`${a.similarity}% similar / ${a.verdict||"saved"}`:a.status||a.type||"",c=a.reason||a.basis||a.detail||a.memoryA||"",d=a.memoryB?`Conflict: ${a.memoryB}`:"";return`
              <article class="v3InsightItem ${m(a.status||e.status||"check")}">
                <i>${m(l)}</i>
                <span>
                  <b>${m(o)}</b>
                  ${c?`<small>${m(c)}</small>`:""}
                  ${d?`<small>${m(d)}</small>`:""}
                  ${a.action?`<em>${m(a.action)}</em>`:""}
                </span>
              </article>
            `}).join("")}
        </div>
      `:""}
    </section>
  `}function qR(n={}){if(!n.label)return"";let e=Array.isArray(n.flags)?n.flags.slice(0,4):[];return`
    <section class="analysisReadiness">
      <header>
        <span><small>INVESTOR READINESS</small><b>${m(n.label)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      ${n.summary?`<p>${m(n.summary)}</p>`:""}
      ${e.length?`<ul>${e.map(t=>`<li>${m(t)}</li>`).join("")}</ul>`:""}
    </section>
  `}function jR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisProductExperience">
      <header>
        <span><small>V5 PRODUCT EXPERIENCE</small><b>${m(n.summary)}</b></span>
        <em>${m(n.onboardingCompleteness||0)}%</em>
      </header>
      <div class="productExperienceMeta">
        <span><small>MODE</small><b>${m(n.mode||"Balanced investor review")}</b></span>
        <span><small>STYLE</small><b>${m(n.explanationStyle||"Balanced explanation")}</b></span>
        <span><small>NEXT</small><b>${m(n.nextBestAction||"Clarify the user job before relying on format.")}</b></span>
      </div>
      ${e.length?`
        <div class="productExperienceChecks">
          ${e.map(t=>`
            <article class="productExperienceCheck ${m(t.status||"missing")}">
              <i>${m(t.status||"missing")}</i>
              <span><b>${m(t.label)}</b><em>${m(t.action)}</em></span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function XR(n=[]){return n.length?`
    <section class="analysisEvidence">
      <h3>EVIDENCE CHECKLIST</h3>
      <div>
        ${n.map(e=>`
          <article class="evidenceItem ${m(e.status)}">
            <i>${m(e.status)}</i>
            <span><b>${m(e.label)}</b><small>${m(e.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `:""}function YR(n={}){if(!n.summary)return"";let e=Array.isArray(n.gates)?n.gates:[],t=Array.isArray(n.criticalGaps)?n.criticalGaps:[];return`
    <section class="analysisEvidenceEngine ${m(n.status||"unknown")}">
      <header>
        <span><small>V4.0 EVIDENCE ENGINE</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.recommendationGate||"Evidence gate not calculated.")}</p>
      ${t.length?`<ul>${t.map(i=>`<li>${m(i)}</li>`).join("")}</ul>`:""}
      ${e.length?`
        <div>
          ${e.map(i=>`
            <article class="evidenceGate ${m(i.status||"missing")}">
              <i>${m(i.status||"missing")}</i>
              <span>
                <b>${m(i.label)} <small>${m(i.score||0)}/100</small></b>
                ${i.proof?`<small>${m(i.proof)}</small>`:""}
                ${i.gap?`<small>${m(i.gap)}</small>`:""}
                <em>${m(i.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function KR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps ${m(n.status||"unknown")}">
      <header>
        <span><small>V4.1 TRANSACTION COMPARABLES</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.valuePosition||"Comparable value position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck ${m(t.status||"missing")}">
              <i>${m(t.status||"missing")}</i>
              <span>
                <b>${m(t.label)}</b>
                ${t.proof?`<small>${m(t.proof)}</small>`:""}
                ${t.gap?`<small>${m(t.gap)}</small>`:""}
                <em>${m(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function JR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisRentalEvidence ${m(n.status||"unknown")}">
      <header>
        <span><small>V4.2 ACHIEVED RENTAL EVIDENCE</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.coveragePosition||"Rental coverage is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck rentalEvidenceCheck ${m(t.status||"missing")}">
              <i>${m(t.status||"missing")}</i>
              <span>
                <b>${m(t.label)}</b>
                ${t.proof?`<small>${m(t.proof)}</small>`:""}
                ${t.gap?`<small>${m(t.gap)}</small>`:""}
                <em>${m(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function ZR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisFinancingEvidence ${m(n.status||"unknown")}">
      <header>
        <span><small>V4.3 FINANCING + VALUATION</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.affordabilityPosition||"Financing affordability is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck financingEvidenceCheck ${m(t.status||"missing")}">
              <i>${m(t.status||"missing")}</i>
              <span>
                <b>${m(t.label)}</b>
                ${t.proof?`<small>${m(t.proof)}</small>`:""}
                ${t.gap?`<small>${m(t.gap)}</small>`:""}
                <em>${m(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function QR(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisSupplyEvidence ${m(n.status||"unknown")}">
      <header>
        <span><small>V4.4 SUPPLY + ABSORPTION</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.competitionPosition||"Supply competition position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck supplyEvidenceCheck ${m(t.status||"missing")}">
              <i>${m(t.status||"missing")}</i>
              <span>
                <b>${m(t.label)}</b>
                ${t.proof?`<small>${m(t.proof)}</small>`:""}
                ${t.gap?`<small>${m(t.gap)}</small>`:""}
                <em>${m(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function e1(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisSiteEvidence ${m(n.status||"unknown")}">
      <header>
        <span><small>V4.5 SITE + MANAGEMENT</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.livedQualityPosition||"Site and management position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck siteEvidenceCheck ${m(t.status||"missing")}">
              <i>${m(t.status||"missing")}</i>
              <span>
                <b>${m(t.label)}</b>
                ${t.proof?`<small>${m(t.proof)}</small>`:""}
                ${t.gap?`<small>${m(t.gap)}</small>`:""}
                <em>${m(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function t1(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisTransactionComps analysisLegalEvidence ${m(n.status||"unknown")}">
      <header>
        <span><small>V4.6 LEGAL + TRANSACTION</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.transactionPosition||"Legal transaction position is not calculated yet.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="transactionCompCheck legalEvidenceCheck ${m(t.status||"missing")}">
              <i>${m(t.status||"missing")}</i>
              <span>
                <b>${m(t.label)}</b>
                ${t.proof?`<small>${m(t.proof)}</small>`:""}
                ${t.gap?`<small>${m(t.gap)}</small>`:""}
                <em>${m(t.action)}</em>
              </span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function n1(n={}){let e=Array.isArray(n.tasks)?n.tasks:[];return e.length?`
    <section class="analysisDiligence">
      <header><span><small>DUE DILIGENCE PACK</small><b>${m(n.summary||"Clear these tasks before commitment.")}</b></span></header>
      <div>
        ${e.map(t=>`
          <article class="diligenceTask ${m(t.status)} ${m(t.priority)}">
            <i>${m(t.priority)}</i>
            <span><b>${m(t.owner)} / ${m(t.label)}</b><small>${m(t.action)}</small></span>
            <em>${m(t.status)}</em>
          </article>
        `).join("")}
      </div>
    </section>
  `:""}function i1(n={}){if(!n.summary)return"";let e=Array.isArray(n.assumptions)?n.assumptions:[];return`
    <section class="analysisStress ${m(n.status||"unknown")}">
      <header>
        <span><small>STRESS ENVELOPE</small><b>${m(n.summary)}</b></span>
        <em>${m(n.status||"unknown")}</em>
      </header>
      <div class="stressReadings">
        <span><small>BASE TRUE HOLDING</small><b>${m(n.baseTrueHolding||"Need rent proof")}</b></span>
        <span><small>STRESSED HOLDING</small><b>${m(n.stressedTrueHolding||"Need rent and instalment")}</b></span>
        <span><small>RESERVE SURVIVAL</small><b>${m(n.reserveSurvivalMonths===null?"Not applicable":`${n.reserveSurvivalMonths} months`)}</b></span>
      </div>
      ${e.length?`
        <div class="stressAssumptions">
          ${e.map(t=>`
            <span class="${m(t.source)}"><small>${m(t.source)}</small><b>${m(t.label)}</b><em>${m(t.value)}</em></span>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function s1(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisPortfolioGate ${m(n.status||"unknown")}">
      <header>
        <span><small>PORTFOLIO EXPANSION GATE</small><b>${m(n.summary)}</b></span>
        <em>${m(n.score||0)}/100</em>
      </header>
      <p>${m(n.nextPropertyRule||"Do not scale until the current property is proven.")}</p>
      ${e.length?`
        <div>
          ${e.map(t=>`
            <article class="portfolioCheck ${m(t.status)}">
              <i>${m(t.status)}</i>
              <span><b>${m(t.label)}</b><small>${m(t.action)}</small></span>
            </article>
          `).join("")}
        </div>
      `:""}
    </section>
  `}function r1(n={}){if(!n.summary)return"";let e=Array.isArray(n.checks)?n.checks:[];return`
    <section class="analysisMarketCycle ${m(n.status||"watch")}">
      <header>
        <span><small>MARKET CYCLE / LIQUIDITY</small><b>${m(n.summary)}</b></span>
        <em>${m(n.status||"watch")}</em>
      </header>
      <div class="marketCycleReadings">
        <span><small>CYCLE</small><b>${m(n.cycle||"Cycle unclear")}</b></span>
        <span><small>LIQUIDITY</small><b>${m(n.liquidity||"Liquidity must be proven")}</b></span>
      </div>
      ${e.length?`<div>${e.map(t=>`
        <article class="marketCycleCheck ${m(t.status)}">
          <i>${m(t.status)}</i>
          <span><b>${m(t.label)}</b><small>${m(t.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function a1(n={}){if(!n.summary)return"";let e=Array.isArray(n.triggers)?n.triggers:[];return`
    <section class="analysisHoldExit ${m(n.action||"monitor")}">
      <header>
        <span><small>HOLD / REFINANCE / EXIT</small><b>${m(n.summary)}</b></span>
        <em>${m(n.action||"monitor")}</em>
      </header>
      <p>${m(n.reviewCadence||"Review annually and on trigger events.")}</p>
      ${e.length?`<div>${e.map(t=>`
        <article class="holdExitTrigger ${m(t.status)}">
          <i>${m(t.status)}</i>
          <span><b>${m(t.label)}</b><small>${m(t.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function o1(n={}){if(!n.summary)return"";let e=Array.isArray(n.conditions)?n.conditions:[];return`
    <section class="analysisDecisionSeal ${m(n.status||"conditional")}">
      <header>
        <span><small>V1 DECISION SEAL</small><b>${m(n.label||"V1 Conditional Only")}</b></span>
        <em>${m(n.status||"conditional")}</em>
      </header>
      <p>${m(n.summary)}</p>
      ${e.length?`<div>${e.map(t=>`
        <article class="sealCondition ${m(t.status)}">
          <i>${m(t.status)}</i>
          <span><b>${m(t.label)}</b><small>${m(t.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function _u(n,e={},t="FOCUS",i=""){if(!e.summary)return"";let s=Array.isArray(e.checks)?e.checks:[],r=e.status||"watch";return`
    <section class="analysisV2Workflow ${m(r)}">
      <header>
        <span><small>${m(n)}</small><b>${m(e.summary)}</b></span>
        <em>${m(r)}</em>
      </header>
      ${i?`<p><b>${m(t)}</b> ${m(i)}</p>`:""}
      ${s.length?`<div>${s.map(a=>`
        <article class="v2WorkflowCheck ${m(a.status)}">
          <i>${m(a.status)}</i>
          <span><b>${m(a.label)}</b><small>${m(a.action)}</small></span>
        </article>
      `).join("")}</div>`:""}
    </section>
  `}function l1(n={}){let e=Array.isArray(n.actions)?n.actions:[];return e.length?`
    <section class="analysisExecution">
      <header>
        <span><small>EXECUTION CALIBRATION</small><b>${m(n.summary||"Use these guardrails before offer, booking, renovation, tenant approval, or exit.")}</b></span>
        <em>${m(n.posture||"Verify before offer")}</em>
      </header>
      <div class="executionOffer">
        <span><small>OPENING ANCHOR</small><b>${m(n.openingAnchor||"Need value proof")}</b></span>
        <span><small>MAXIMUM OFFER</small><b>${m(n.maximumOffer||"Need value/rent proof")}</b></span>
        <span><small>WALK-AWAY RULE</small><b>${m(n.walkAway||"Do not proceed under pressure.")}</b></span>
      </div>
      <div class="executionActions">
        ${e.map(t=>`
          <article class="executionAction ${m(t.status)}">
            <i>${m(t.status)}</i>
            <span><b>${m(t.lane)} / ${m(t.label)}</b><small>${m(t.action)}</small></span>
          </article>
        `).join("")}
      </div>
    </section>
  `:""}function c1(n={}){let e=Array.isArray(n.signals)?n.signals:[];if(!e.length)return"";let t=n.profile||{};return`
    <section class="analysisLearning">
      <header><span><small>LEARNING LOOP</small><b>${m(n.summary||"Matched private learning for this report.")}</b></span></header>
      ${t.approvedCount?`
        <div class="learningProfile">
          <span><small>MEMORY PROFILE</small><b>${m(t.investorType||"Profile building")} / ${m(t.riskStyle||"Needs more memory")}</b></span>
          <span><small>COMPLETENESS</small><b>${m(t.completeness||0)}%</b></span>
        </div>
      `:""}
      <div>
        ${e.map(i=>`
          <article class="learningSignal ${m(i.type)}">
            <i>${m(i.type)}</i>
            <span><b>${m(i.label)}</b><small>${m(i.body)}</small><em>${m(i.action)}</em></span>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Su(n){let e=Number(n||0);return e>=75?"strong":e>=55?"watch":"weak"}function Np(n={},e,t=0){let i=(n.dimensions||[]).find(s=>s.key===e);return Number(i?.score??t??0)}function u1(n={},e,t=0){let i=(n.stages||[]).find(s=>e.test(String(s.name||"")));return Number(i?.score??t??0)}function d1(n={}){let e=es(n.recommendationBlockers),t=es(n.watchouts),i=es(n.missingEvidence),s=es(n.nextActions),r=e[0]||t[0]||n.counterThesis||"No single dominant risk is proven yet; keep checking the weak evidence lane.",a=i[0]||"No urgent proof gap listed, but live transaction, rent, site, financing, and legal checks still matter.",o=s[0]||a,l=Np(n,"property"),c=u1(n,/holding/i,Number(n.achievedRentalEvidence?.score||n.investorReadiness?.score||0)),d=Np(n,"exit"),u=Np(n,"evidence",n.confidence);return{verdict:n.verdict||"INVESTIGATE",score:Number(n.averageScore||0),confidence:Number(n.confidence||0),reason:n.decisionFocus?.body||n.summary||"Apex needs more proof before upgrading the decision.",risk:r,missingProof:a,nextAction:o,scores:[{label:"Property Quality",value:l,status:Su(l)},{label:"Rental Safety",value:c,status:Su(c)},{label:"Exit Liquidity",value:d,status:Su(d)},{label:"Evidence Confidence",value:u,status:Su(u)}]}}function h1(n={}){let e=d1(n);return`
    <section class="dealSnapshot ${m(String(e.verdict).toLowerCase())}" aria-label="Deal screening snapshot">
      <header>
        <span><small>DEAL SCREEN</small><b>${m(e.verdict)}</b></span>
        <em>${m(e.score)}/100 / ${m(e.confidence)}% confidence</em>
      </header>
      <p>${m(e.reason)}</p>
      <div class="dealSnapshotGrid">
        <article><small>Main risk</small><b>${m(e.risk)}</b></article>
        <article><small>Missing proof</small><b>${m(e.missingProof)}</b></article>
        <article><small>Next action</small><b>${m(e.nextAction)}</b></article>
      </div>
      <div class="dealSnapshotScores">
        ${e.scores.map(t=>`
          <article class="${m(t.status)}">
            <span><small>${m(t.label)}</small><b>${m(t.value)}/100</b></span>
            <i><em style="width:${Math.max(0,Math.min(100,Number(t.value)||0))}%"></em></i>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Xo(n,e=1){let t=Number(n);return Number.isFinite(t)?`${(t*100).toFixed(e)}%`:"Not available"}function p1(n={}){return!n||n.status==="incomplete"?["Residential DCF",...(n?.issues||["Minimum DCF inputs are incomplete."]).map(e=>`- ${e}`)]:["Residential DCF and market-value screen",`Status: ${n.status}`,`${n.indicationLabel}: ${Bn(n.indicatedValue)}`,`Formal market-value label: ${n.marketValue?Bn(n.marketValue):"Not established"}`,`Income DCF: ${Bn(n.incomeApproach?.dcfValue)}`,`Comparison indication: ${n.comparisonApproach?.value?Bn(n.comparisonApproach.value):"Need 3 recent verified sales"}`,`Purchase price: ${Bn(n.purchasePrice)}`,`Price variance: ${Xo(n.priceVariance)}`,`Year 1 DSCR: ${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"Not available"}`,`Levered equity IRR: ${Xo(n.buyerReturns?.leveredEquityIrr)}`,`Evidence: ${n.evidence?.score||0}/100`,...(n.evidence?.missing||[]).map(e=>`- Missing: ${e}`),...(n.warnings||[]).map(e=>`- Warning: ${e}`),n.disclaimer||""].filter(Boolean)}function tx(n={}){if(!n)return"";if(n.status==="incomplete")return`
      <section class="dcfValuationResult incomplete">
        <header><span><small>DCF / VALUE MODEL</small><b>INPUTS INCOMPLETE</b></span><em>NO VALUE PRODUCED</em></header>
        <ul>${(n.issues||[]).map(t=>`<li>${m(t)}</li>`).join("")}</ul>
      </section>
    `;let e=!!n.marketValue;return`
    <section class="dcfValuationResult ${e?"supported":"screening"}">
      <header>
        <span><small>RESIDENTIAL DCF / COMPARISON</small><b>${m(n.indicationLabel||"Valuation screen")}</b></span>
        <em>${e?"MARKET-SUPPORTED":"SCREENING ONLY"}</em>
      </header>
      <div class="dcfValuationHero">
        <span><small>INDICATED VALUE</small><b>${m(Bn(n.indicatedValue))}</b></span>
        <span><small>MARKET VALUE LABEL</small><b>${e?m(Bn(n.marketValue)):"NOT ESTABLISHED"}</b></span>
        <span><small>PRICE POSITION</small><b>${m(Xo(n.priceVariance))}</b></span>
      </div>
      <div class="dcfValuationMetrics">
        <span><small>Income DCF</small><b>${m(Bn(n.incomeApproach?.dcfValue))}</b></span>
        <span><small>Completed-sale comparison</small><b>${n.comparisonApproach?.value?m(Bn(n.comparisonApproach.value)):"Need 3 verified sales"}</b></span>
        <span><small>Terminal concentration</small><b>${m(Xo(n.incomeApproach?.terminalConcentration))}</b></span>
        <span><small>Year 1 DSCR</small><b>${Number.isFinite(Number(n.buyerReturns?.year1Dscr))?`${Number(n.buyerReturns.year1Dscr).toFixed(2)}x`:"N/A"}</b></span>
        <span><small>Levered equity IRR</small><b>${m(Xo(n.buyerReturns?.leveredEquityIrr))}</b></span>
        <span><small>Evidence strength</small><b>${m(n.evidence?.score||0)}/100</b></span>
      </div>
      ${(n.evidence?.missing||[]).length?`<div class="dcfValuationGaps"><b>Evidence still needed</b><ul>${n.evidence.missing.map(t=>`<li>${m(t)}</li>`).join("")}</ul></div>`:""}
      ${(n.warnings||[]).length?`<div class="dcfValuationWarnings"><b>Challenge back</b><ul>${n.warnings.map(t=>`<li>${m(t)}</li>`).join("")}</ul></div>`:""}
      <p>${m(n.disclaimer||"")}</p>
    </section>
  `}function f1(n){document.body.classList.add("conversationActive");let e=document.createElement("article");e.className="message jarvis dcfValuationMessage",e.innerHTML=`${tx(n)}<div class="analysisActions"><button type="button">DOWNLOAD DCF WORKBOOK</button></div>`,e.querySelector("button")?.addEventListener("click",()=>void hm(n)),document.querySelector("#valuationResult").replaceChildren(e)}function dm(n,e=[],t={},i=Wt){document.body.classList.add("conversationActive");let s=document.createElement("article"),r=crypto.randomUUID();dl.set(r,n),i===Wt&&(Aa=r),s.dataset.analysisId=r;let a=String(n.verdict||"investigate").toLowerCase(),o=(n.stages||[]).map(g=>`
    <li class="analysisStage">
      <span class="stageNumber">0${m(g.number)}</span>
      <span class="stageBody">
        <b>${m(g.name)}</b>
        <small>${m(g.summary)}</small>
      </span>
      <span class="stageReading">
        <i class="stageStatus ${m(g.status)}">${m(g.status)}</i>
        <em>${m(g.score)}/100</em>
      </span>
    </li>
  `).join(""),l=(n.metrics||[]).map(g=>`
    <span class="analysisMetric"><small>${m(g.label)}</small><b>${m(g.value)}</b></span>
  `).join(""),c=(n.dimensions||[]).map(g=>`
    <article class="analysisDimension ${m(g.status)}">
      <span><small>${m(g.label)}</small><b>${m(g.score)}/100</b><em>${m(g.status)}</em></span>
      <i><em style="width:${Math.max(0,Math.min(100,Number(g.score)||0))}%"></em></i>
    </article>
  `).join(""),d=ud(n),u=(n.scenarios||[]).map(g=>`
    <article class="analysisScenario ${m(g.status)}">
      <span><b>${m(g.label)}</b><small>${m(g.assumption)}</small></span>
      <em>${m(g.value)}/mo</em>
    </article>
  `).join(""),h=new Intl.DateTimeFormat("en-MY",{dateStyle:"medium"}).format(new Date);if(s.className="message jarvis analysisMessage",s.innerHTML=`
    <header class="analysisReportTitle">
      <span>A</span><div><small>APEX ANALYTIC</small><h1>DEAL DECISION REPORT</h1><p>${m(Pa(n))} / ${m(h)}</p></div>
    </header>
    ${Tb(t)}
    <div class="analysisHeader">
      <span><small>SEVEN-STAGE VERDICT</small><b>${m(n.verdict)}</b></span>
      <i class="analysisVerdict ${m(a)}">${m(n.confidence)}% CONFIDENCE</i>
    </div>
    <p class="analysisSummary">${m(n.summary)}</p>
    ${h1(n)}
    ${tx(n.residentialDcf)}
    ${GR(n)}
    ${jR(n.productExperience)}
    ${WR(n.personalizedChallenge)}
    ${n.aiCommentary?`
      <section class="analysisJarvisTake">
        <h3>APEX ANALYSIS</h3>
        <p>${m(n.aiCommentary)}</p>
      </section>
    `:""}
    <div class="analysisMeta">
      <span>ENGINE <b>${m(n.engineVersion||"Apex v10.10")}</b></span>
      <span>REASONING <b>${m(n.reasoningMode||(n.aiCommentary?"Framework + AI":"Framework only"))}</b></span>
      <span>DECISION SCORE <b>${m(n.averageScore)}/100</b></span>
      <span>INPUT COMPLETE <b>${m(n.completeness)}%</b></span>
    </div>
    ${kT()}
    ${VT(n)}
    ${FT(n)}
    ${zT(n)}
    ${WT(n)}
    ${jT(n.developmentIntelligence)}
    ${YT(n.caseIntelligence)}
    ${JT(n.documentIntelligence)}
    ${QT(n.portfolioCommand)}
    ${tC(n.finalCommand)}
    <div class="analysisOverview">
      ${qR(n.investorReadiness)}
      ${c?`<section class="analysisDimensionSection"><h3>DEAL SCORECARD</h3><div class="analysisDimensions">${c}</div></section>`:""}
    </div>
    ${l?`<div class="analysisMetrics">${l}</div>`:""}
    ${XR(n.evidenceChecklist||[])}
    ${YR(n.evidenceEngine)}
    ${KR(n.transactionComparableEvidence)}
    ${JR(n.achievedRentalEvidence)}
    ${ZR(n.financingValuationEvidence)}
    ${QR(n.supplyAbsorptionEvidence)}
    ${e1(n.siteManagementEvidence)}
    ${t1(n.legalTransactionEvidence)}
    ${n1(n.dueDiligencePlan)}
    ${i1(n.stressEnvelope)}
    ${s1(n.portfolioGate)}
    ${r1(n.marketPulse)}
    ${a1(n.holdExitPlan)}
    ${o1(n.decisionSeal)}
    ${_u("V2.1 SITE VISIT ASSISTANT",n.siteVisitAssistant,"FOCUS",n.siteVisitAssistant?.focus)}
    ${_u("V2.2 SOURCING / PROFESSIONAL FILTER",n.sourcingProfessional,"POSTURE",n.sourcingProfessional?.posture)}
    ${_u("V2.3 TENANT / RENTAL PLAN",n.tenantRentalPlan,"TARGET",n.tenantRentalPlan?.target)}
    ${_u("V2.4 EXIT STRATEGY",n.exitStrategy,"BUYER PSYCHOLOGY",n.exitStrategy?.buyerPsychology)}
    ${l1(n.executionPlan)}
    ${c1(n.learningLoop)}
    ${Bo("V3.4 DEAL MEMORY COMPARISON",n.dealMemoryComparison,"matches")}
    ${Bo("V3.5 BELIEF TRACKER",n.beliefTracker,"beliefs")}
    ${Bo("V3.6 SOURCE TRANSPARENCY",n.sourceTransparency,"sources")}
    ${Bo("V3.7 MEMORY CONFLICTS",n.memoryConflicts,"conflicts")}
    ${Bo("V3.8 PERSONAL OPERATING RULES",n.personalOperatingRules,"rules")}
    ${u?`<section class="analysisScenarioSection"><h3>DOWNSIDE SCENARIOS</h3><div class="analysisScenarios">${u}</div><p>Stress assumptions are decision tests, not forecasts.</p></section>`:""}
    ${zR(n.marketIntelligence)}
    <ol class="analysisStages">${o}</ol>
    <div class="analysisDetails">
      ${fr("Challenge mode",n.challengeMode?.message?[n.challengeMode.message]:[],n.challengeMode?.level==="hard"?"danger":"warning")}
      ${fr("Hard stops",n.hardStops,"danger")}
      ${fr("Decision blockers",n.recommendationBlockers,"warning")}
      ${fr("Watch-outs",n.watchouts,"warning")}
      ${fr("Estimated Malaysian entry costs",ex(n.acquisitionCostEstimate))}
      ${fr("Missing evidence",n.missingEvidence)}
      ${fr("Check next",n.nextActions,"actions")}
    </div>
    <section class="analysisCounter">
      <h3>STRONGEST COUNTER-THESIS</h3>
      <p>${m(n.counterThesis)}</p>
    </section>
    <div class="analysisActions">
      <button type="button" data-analysis-action="shortlist">${d.status==="refuse"?"SAVE FOR REVIEW":"SAVE TO SHORTLIST"}</button>
      ${yt&&n.savedReportId?'<button type="button" data-analysis-action="journal">RECORD DECISION</button>':""}
      <button type="button" data-analysis-action="copy">COPY REPORT</button>
      <button type="button" data-analysis-action="report">PRINT REPORT</button>
      ${n.residentialDcf&&n.residentialDcf.status!=="incomplete"?'<button type="button" data-analysis-action="dcf">DCF WORKBOOK</button>':""}
    </div>
    ${Ab(e)}
  `,m1(s),i.append(s),i===Wt){let g=s.getBoundingClientRect().top-Wt.getBoundingClientRect().top+Wt.scrollTop;Wt.scrollTop=Math.max(0,g-6),Oi()}}function m1(n){let e=".analysisReportTitle,.intelligenceBadge,.analysisHeader,.analysisSummary,.analysisDetails,.analysisCounter,.analysisActions,.analysisMeta,.analysisDimensions",t=new Map;for(let s of Array.from(n.children)){if(s.matches(e))continue;let r=/Metrics|Scenario|dcf|Snapshot/i.test(s.className)?"Numbers and downside":/Memory|Belief|Personal|Learning|Experience/i.test(s.className)?"Personal context and learning":"Evidence and seven-stage checks";if(!t.has(r)){let a=document.createElement("details");a.className="response-detail",a.innerHTML=`<summary>${r}</summary>`,t.set(r,a)}t.get(r).append(s)}let i=n.querySelector(".analysisActions");for(let s of t.values())n.insertBefore(s,i);for(let s of n.querySelectorAll("h3"))s.textContent=s.textContent.replace(/^V\d+(?:\.\d+)?\s+/i,"")}function nx(n){if(Wt.innerHTML="",!!n?.messages?.length)for(let e of n.messages)Cs(e.role==="assistant"?"jarvis":e.role,e.content,e.sources||[],e)}function Ms(n){ad=n,Zn.classList.toggle("speaking",n),Zn.setAttribute("aria-label",n?"Stop Apex Analytic voice":"Talk to Apex Analytic"),gy.hidden=!n}function La(n,e){return n.reduce((t,i)=>{let s=i.getAttribute(e),r=String(i.value||"").trim();return r&&(t[s]=r),t},{})}function is(){return La(Rs,"data-deal-field")}function Na(){return La(_r,"data-profile-field")}function g1(){return rd.map(n=>{let e={};for(let t of n.querySelectorAll("[data-dcf-comp-field]")){let i=t.getAttribute("data-dcf-comp-field"),s=t.type==="checkbox"?t.checked:String(t.value||"").trim();s&&(e[i]=s)}return Object.keys(e).some(t=>t!=="verified")?(e.armsLength=!0,e.evidenceType="completed transaction",e):null}).filter(Boolean)}function xd(){let n=La(sd,"data-dcf-field"),e=g1();return e.length&&(n.comparables=e),n}function fy(){let n=xd();Xu()}function ix(n=!0){for(let e of sd)e.value=e.tagName==="SELECT"&&e.options[0]?.value||"";for(let e of rd)for(let t of e.querySelectorAll("[data-dcf-comp-field]"))t.type==="checkbox"?t.checked=!1:t.value="";window.localStorage.removeItem(wT),Wo&&(Wo.textContent=""),n&&_e("System ready","DCF assumptions and comparable sales cleared.")}function sx(n=xd()){return{dealCard:is(),financialProfile:Na(),valuation:n}}function v1(n={}){return{...n.assumptions,asOf:n.asOf,propertyName:n.property?.name,area:n.property?.area,address:n.property?.address,propertyType:n.property?.propertyType,tenure:n.property?.tenure,titleNumber:n.property?.titleNumber,marketRentEvidence:n.evidence?.marketRent,operatingCostEvidence:n.evidence?.operatingCosts,discountRateBasis:n.evidence?.discountRateBasis,terminalCapRateBasis:n.evidence?.terminalCapRateBasis,comparables:n.comparisonApproach?.comparables||[]}}function rx(){let n=is();return n.askingPrice?n.floorArea?n.expectedRent?"":"Add a supportable monthly market rent in the Deal card.":"Add the subject floor area in the Deal card.":"Add the asking price in the Deal card."}function As(n,e=""){Wo&&(Wo.textContent=n,Wo.className=e)}async function y1(){if(Tn)return null;let n=rx();if(n)return As(n,"danger"),null;Kt(!0),$o.disabled=!0,$o.textContent="CALCULATING...",As("Running income, comparable, debt, and evidence checks...");try{let e=await Ye("/api/tools/residential-dcf",{method:"POST",body:JSON.stringify(sx())});return f1(e.valuation),As(e.valuation.marketValue?"Evidence-supported indication calculated. Verify professional valuation before transacting.":"Screening value calculated. Missing evidence prevents a market-value label.",e.valuation.marketValue?"ready":"warning"),e.valuation}catch(e){return As(e.message||"DCF calculation is unavailable.","danger"),null}finally{Kt(!1),$o.disabled=!1,$o.textContent="CALCULATE VALUE"}}async function hm(n=null){if(Tn)return;let e=n?"":rx();if(e){As(e,"danger");return}Kt(!0),mr&&(mr.disabled=!0,mr.textContent="GENERATING..."),As("Generating the auditable Excel model...");try{let t=n?v1(n):sx(),i=await fetch("/api/tools/residential-dcf/workbook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok){let c=await i.json().catch(()=>({}));throw new Error(c.error||"DCF workbook could not be generated.")}let s=await i.blob(),a=(i.headers.get("content-disposition")||"").match(/filename="([^"]+)"/i)?.[1]||"apex-residential-dcf.xlsx",o=URL.createObjectURL(s),l=document.createElement("a");l.href=o,l.download=a,l.click(),window.setTimeout(()=>URL.revokeObjectURL(o),1e3),As("Excel DCF downloaded. Open it to review and stress every blue assumption.","ready")}catch(t){As(t.message||"DCF workbook could not be generated.","danger")}finally{Kt(!1),mr&&(mr.disabled=!1,mr.textContent="DOWNLOAD EXCEL")}}function pm(n){return Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`))}function ax(n,e=[]){return e.some(t=>String(n[t]||"").trim())}function b1(n){return n==="deal"?[{label:"Area/project",keys:["area","projectName"]},{label:"Price",keys:["askingPrice"]},{label:"Rent",keys:["expectedRent"]},{label:"Comps",keys:["comparableTransactions","comparableSource","conservativeFairValue"]},{label:"Site proof",keys:["siteVisitEvidence","siteVisitNotes"]},{label:"Title/legal",keys:["legalTitleType","legalCheck"]}]:n==="profile"?[{label:"Income",keys:["monthlyIncome"]},{label:"Reserve",keys:["cashReserveMonths","cashAvailable"]},{label:"Debt",keys:["currentDebt"]},{label:"Goal",keys:["investmentGoal","portfolioRole"]},{label:"Holding",keys:["holdingPeriod"]},{label:"Concern",keys:["financialConcern","nearTermCommitment"]}]:[{label:"Experience",keys:["experienceLevel"]},{label:"Mode",keys:["guidanceMode"]},{label:"Intent",keys:["decisionIntent"]},{label:"Output",keys:["preferredOutput"]},{label:"Confidence",keys:["confidenceComfort"]}]}function ll(n){let e=pm(n),i=La(e,n==="deal"?"data-deal-field":"data-profile-field"),s=b1(n),r=s.filter(c=>!ax(i,c.keys)).map(c=>c.label),a=s.length-r.length,o=Math.round(a/s.length*100),l=o>=80?"ready":o>=40?"watch":"missing";return{panelName:n,context:i,fields:e,groups:s,missing:r,percent:o,status:l}}function uf(){return Aa&&dl.get(Aa)||null}function Oi(){let n=is();yy.innerHTML="<span>Current investigation</span><b>"+m(n.projectName||n.area||"Your next property")+"</b><small>"+m([n.askingPrice,n.expectedRent?n.expectedRent+" rent":""].filter(Boolean).join(" / ")||"Add a property or explore a question first.")+"</small>"}function ox(n){let e=ll(n),t=e.missing[0];if(!t){e.fields[0]?.focus();return}let i=e.groups.find(a=>a.label===t),s=n==="deal"?"data-deal-field":"data-profile-field";e.fields.find(a=>i?.keys.includes(a.getAttribute(s)))?.focus()}function x1(n){return n.getAttribute("data-deal-field")||n.getAttribute("data-profile-field")||""}function lx(){try{let n=JSON.parse(window.localStorage.getItem(ef)||"{}");return n&&typeof n=="object"?n:{}}catch{return window.localStorage.removeItem(ef),{}}}function _1(n,e){let t=lx();t[n]=e,window.localStorage.setItem(ef,JSON.stringify(t))}function fm(n){return lx()[n]==="all"?"all":"core"}function S1(n,e){return n==="deal"?e==="all"?"Advanced evidence fields are visible. Use them when you have proof, not guesses.":"Start with area/project, price, rent, own-stay quality, management, exit pool, supply, and your main concern.":n==="profile"?e==="all"?"Advanced portfolio context is visible. Add it when the deal is moving beyond first screen.":"Start with income, reserve, cash available, debt, goal, holding period, and financial concern.":"Set the answer style once. Apex will use it to sound more like the adviser you need."}function cx(n,e){let t=n==="deal"?"data-deal-field":"data-profile-field";return pm(n).find(i=>i.getAttribute(t)===e)}function mm(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=fm(n),i=e.querySelector(`[data-context-assist="${n}"]`);i||(i=document.createElement("section"),i.className="contextAssist",i.setAttribute("data-context-assist",n),e.prepend(i));let s=ll(n),a=s.groups.filter(l=>!ax(s.context,l.keys)).filter(l=>t==="all"||l.keys.some(c=>Vu[n]?.has(c))).slice(0,3).map(l=>{let c=l.keys.find(d=>cx(n,d));return c?`<button type="button" data-context-focus-panel="${m(n)}" data-context-focus-key="${m(c)}">${m(l.label)}</button>`:""}).filter(Boolean).join(""),o=n==="deal"?"Deal":n==="profile"?"Profile":"Guidance";i.innerHTML=`
    <header>
      <span><small>${m(o)} guide</small><b>${m(t==="all"?"All fields visible":"Essentials first")}</b></span>
      <button type="button" data-context-field-mode="${m(n)}">${m(t==="all"?"CORE ONLY":"SHOW ALL")}</button>
    </header>
    <p>${m(S1(n,t))}</p>
    ${a?`<div>${a}</div>`:"<em>Enough context for a first pass. Add advanced proof only when the deal deserves deeper work.</em>"}
  `}function ux(n){let e=document.querySelector(`[data-context-body="${n}"]`);if(!e)return;let t=fm(n);e.classList.toggle("contextCoreMode",t!=="all"),e.classList.toggle("contextAllMode",t==="all"),mm(n)}function w1(n,e){_1(n,e),ux(n),_e("System ready",e==="all"?"Advanced fields visible.":"Showing only core fields.")}function E1(){for(let n of Object.keys(Vu)){for(let e of pm(n)){let t=x1(e),i=e.closest("label");if(!i)continue;let s=Vu[n].has(t);i.classList.toggle("contextCore",s),i.classList.toggle("contextAdvanced",!s),i.dataset.contextDepth=s?"core":"advanced"}ux(n)}}function gm(){for(let n of Object.keys(Vu))mm(n)}function my(n={},e=[]){return e.map(([t,i])=>{let s=String(n[t]||"").trim();return s?`${i}: ${s}`:""}).filter(Boolean).join("; ")}function M1(n={}){return!!(n.area||n.projectName||n.askingPrice||n.expectedRent||n.propertyType||n.mainConcern||n.investmentThesis)}function A1(){let n=is(),e=Na(),t=ll("deal"),i=ll("profile"),s=my(n,[["area","area"],["projectName","project"],["propertyType","type"],["askingPrice","price"],["conservativeFairValue","fair value"],["expectedRent","rent"],["estimatedInstallment","installment"],["maintenance","maintenance"],["ownStayAppeal","own-stay"],["managementQuality","management"],["exitBuyerPool","exit pool"],["nearbySupply","nearby supply"],["mainConcern","concern"]])||"not supplied",r=my(e,[["monthlyIncome","income"],["cashReserveMonths","reserve"],["cashAvailable","cash available"],["currentDebt","debt"],["riskStyle","risk style"],["investmentGoal","goal"],["holdingPeriod","holding"]])||"not supplied",a=[...t.missing.map(o=>`Deal: ${o}`),...i.missing.map(o=>`Profile: ${o}`)].slice(0,6).join("; ")||"no major card gap from the current quick screen";return["Run Apex Deal Screening Mode as a first-pass mentor check, not a full formal report.","Use this exact structure: Verdict, Why, Main risk, Missing proof, Next questions.","Keep it short, human, and direct. Ask at most 3 next questions. Do not create a long report.",`Deal card: ${s}`,`Profile card: ${r}`,`Known missing context: ${a}`].join(`
`)}async function dx(){if(Tn)return;let n=is();if(!M1(n)){Cs("jarvis","Open the Deal card and give me at least the area/project, price, rent, or your main concern. Then I can screen it without turning the page into a full report.");let e=Ri.find(t=>t.getAttribute("data-context-toggle")==="deal");e&&Ii(e,!0),ox("deal");return}Rn(),Pi("Screening the deal."),Zi&&(Zi.disabled=!0,Zi.textContent="SCREENING"),_e("Screening","Running a first-pass deal screen.");try{await Oa(A1(),{displayText:"Screen this deal using my current Deal/Profile cards."})}finally{Zi&&(Zi.disabled=!1,Zi.textContent="SCREEN")}}function qu(n,e,t){let i=La(n,e);Xu(),Oi(),gm()}function T1(n){let e=n==="deal",t=Array.from(document.querySelectorAll(`[data-context-body="${n}"] [data-deal-field], [data-context-body="${n}"] [data-profile-field]`)),i=e?Rs:_r,s=e?"data-deal-field":"data-profile-field",r=e?jf:Xf;for(let l of t)l.value="";e&&ix(!1);let a=La(i,s);Object.keys(a).length?window.localStorage.setItem(r,JSON.stringify(a)):window.localStorage.removeItem(r),Xu();let o=n==="guidance"?"Guidance":e?"Deal":"Profile";Oi(),gm(),_e("System ready",`${o} details cleared.`)}function C1(){try{return JSON.parse(window.localStorage.getItem(Fu)||"{}")}catch{return window.localStorage.removeItem(Fu),{}}}function Ii(n,e,t=!0){let i=n.getAttribute("data-context-toggle"),s=document.querySelector(`[data-context-body="${i}"]`),r=n.querySelector(".contextAction");if(s){if(e){nn(i);for(let a of Ri)a!==n&&Ii(a,!1,!1)}if(n.setAttribute("aria-expanded",String(e)),s.hidden=!e,n.closest(".contextPanel")?.classList.toggle("expanded",e),r&&(r.textContent=e?"CLOSE":"OPEN"),e&&mm(i),t){let a=Ri.reduce((o,l)=>{let c=l.getAttribute("data-context-toggle");return o[c]=l===n?e:!1,o},{});window.localStorage.setItem(Fu,JSON.stringify(a))}}}function R1(){let n=C1(),e=Object.entries(n).find(([,t])=>t)?.[0];for(let t of Ri){let i=t.getAttribute("data-context-toggle");Ii(t,i===e,!1),t.addEventListener("click",()=>{let s=t.getAttribute("aria-expanded")==="true";Ii(t,!s)})}for(let t of _T)t.addEventListener("click",()=>T1(t.getAttribute("data-context-reset")))}function Rn(){let n={};for(let e of Ri)Ii(e,!1,!1),n[e.getAttribute("data-context-toggle")]=!1;window.localStorage.setItem(Fu,JSON.stringify(n))}function Pi(n="Voice stopped."){nf+=1,"speechSynthesis"in window&&window.speechSynthesis.cancel(),Es&&(Es.pause(),Es.src="",Es=null),qo&&(URL.revokeObjectURL(qo),qo=""),gr=!0,Ms(!1),Qi||_e("System ready",n)}async function I1(n){Pi("Ready when you are.");let e=++nf;try{Ms(!0),_e("Speaking","Delivering analysis.");let t=await fetch("/api/jarvis/speech",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":pl()},body:JSON.stringify({text:n})});if(!t.ok){let i=await t.json().catch(()=>({}));throw new Error(i.error||"Server voice is unavailable.")}if(e!==nf)return;qo=URL.createObjectURL(await t.blob()),Es=new Audio(qo),Es.onended=()=>{Ms(!1),_e("System ready",gr?"Voice stopped.":"Ready when you are."),Pi("Ready when you are."),gr=!1},Es.onerror=()=>{Ms(!1),_e("Voice interrupted","The written answer is still available.")},await Es.play()}catch{Ms(!1),_e("Voice interrupted","The written answer is still available.")}}function df(n){if(!Un)return;let e=ET(n);if(!("speechSynthesis"in window)){fb&&I1(e);return}Pi("Ready when you are.");let t=new SpeechSynthesisUtterance(e);t.rate=.96,t.pitch=.9,t.onstart=()=>{gr=!1,Ms(!0),_e("Speaking","Delivering analysis.")},t.onend=()=>{Ms(!1),_e("System ready",gr?"Voice stopped.":"Ready when you are."),gr=!1},t.onerror=()=>{Ms(!1),gr=!1},window.speechSynthesis.speak(t)}function P1(n){return new Promise((e,t)=>{let i=new FileReader;i.onload=()=>e(String(i.result||"").split(",")[1]||""),i.onerror=t,i.readAsDataURL(n)})}async function L1(){if(dr?.state==="recording"){dr.stop();return}if(!pb||!window.MediaRecorder||!navigator.mediaDevices?.getUserMedia){_e("Voice unavailable","Use the command bar on this browser."),An.focus();return}try{Qi=!0,Rp=await navigator.mediaDevices.getUserMedia({audio:!0}),Ip=[];let n=["audio/webm;codecs=opus","audio/webm","audio/mp4"].find(e=>MediaRecorder.isTypeSupported(e));dr=new MediaRecorder(Rp,n?{mimeType:n}:void 0),dr.ondataavailable=e=>{e.data.size&&Ip.push(e.data)},dr.onstop=async()=>{Qi=!1,Zn.classList.remove("listening"),Rp?.getTracks().forEach(t=>t.stop());let e=new Blob(Ip,{type:dr.mimeType||"audio/webm"});if(!e.size)return _e("Voice interrupted","No recording was captured.");_e("Analyzing","Transcribing your message."),Kt(!0);try{let t=await Ye("/api/jarvis/transcribe",{method:"POST",body:JSON.stringify({audioBase64:await P1(e),mimeType:e.type,filename:e.type.includes("mp4")?"voice.mp4":"voice.webm"})});An.value=t.text,Kt(!1),await Oa(t.text)}catch(t){_e("Voice interrupted",t.message||"Voice transcription failed.")}finally{Kt(!1)}},dr.start(),Qi=!0,Zn.classList.add("listening"),_e("Listening","Speak naturally. Tap again when finished.")}catch{Qi=!1,_e("Voice interrupted","Microphone access was not available.")}}async function Ye(n,e={}){let t=await fetch(n,{...e,credentials:"same-origin",headers:{"Content-Type":"application/json","x-estatelab-client-id":pl(),...e.headers||{}}});if(!t.ok){let s=await t.json().catch(()=>({})),r=new Error(s.error||"Apex Analytic backend is unavailable.");throw r.status=t.status,r.payload=s,r}if(t.status===204)return null;let i=await t.json();return i.session&&Xu({sessionId:i.session.id,messages:i.session.messages||[],...i.analysis?{report:{analysis:{...i.analysis,savedReportId:i.savedReport?.id},sources:i.sources||[],mode:i.mode,messageId:i.message?.id}}:{}}),i}async function N1(){let n=await Ye("/api/auth/me");return fl(n.authenticated?n.user:null),n}async function D1(){let n=ts==="register"?"/api/auth/register":"/api/auth/login",e={email:gf.value.trim(),password:Op.value};ts==="register"&&(e.displayName=by.value.trim()),kp.disabled=!0,wa.textContent=ts==="register"?"Creating your private account...":"Signing in...";try{let t=await Ye(n,{method:"POST",body:JSON.stringify(e)});fl(t.user),Op.value="",_e("System ready",t.verificationPending?"Account ready. Verify your email when convenient.":`Welcome back, ${t.user.displayName}.`)}catch(t){wa.textContent=t.message||"Account access is unavailable."}finally{kp.disabled=!1}}async function O1(){let n=Au.value.trim();if(!n)return Au.focus();Up.disabled=!0,xa.textContent="Sending reset instructions...";try{let e=await Ye("/api/auth/forgot-password",{method:"POST",body:JSON.stringify({email:n})});xa.textContent=e.message,e.debug?.token&&(Sy.value=e.debug.token)}catch(e){xa.textContent=e.message||"Password recovery is unavailable."}finally{Up.disabled=!1}}async function k1(){Jv.disabled=!0,xa.textContent="Updating password...";try{await Ye("/api/auth/reset-password",{method:"POST",body:JSON.stringify({token:Sy.value.trim(),password:Kv.value})}),Kv.value="",Kf(!1),ol("login"),wa.textContent="Password updated. Sign in with the new password."}catch(n){xa.textContent=n.message||"Password could not be updated."}finally{Jv.disabled=!1}}async function U1(){Cu.disabled=!0;try{let n=await Ye("/api/auth/request-verification",{method:"POST",body:"{}"});n.debug?.token&&(Tu.value=n.debug.token),_e("System ready",n.sent?"Verification code sent.":"Verification request created.")}catch(n){_e("Connection issue",n.message||"Verification is unavailable.")}finally{Cu.disabled=!1}}async function F1(){let n=Tu.value.trim();if(!n)return Tu.focus();Ru.disabled=!0;try{let e=await Ye("/api/auth/verify-email",{method:"POST",body:JSON.stringify({token:n})});fl(e.user),_e("System ready","Email verified.")}catch(e){_e("Connection issue",e.message||"Verification failed.")}finally{Ru.disabled=!1}}function B1(n){let e=new Date(n.updatedAt),t=Number.isNaN(e.getTime())?"Recent":e.toLocaleString([],{dateStyle:"medium",timeStyle:"short"}),i=n.id===qt;return`
    <article class="sessionItem${i?" current":""}">
      <button class="sessionOpen" type="button" data-session-action="open" data-session-id="${m(n.id)}">
        <b>${m(n.title||"Untitled conversation")}</b>
        <span>${m(t)} / ${m(n.messageCount||0)} messages${i?" / CURRENT":""}</span>
      </button>
      <button class="sessionDelete" type="button" data-session-action="delete" data-session-id="${m(n.id)}" aria-label="Delete ${m(n.title||"conversation")}">DELETE</button>
    </article>
  `}async function hx(){let n=await Ye("/api/jarvis/sessions"),e=Array.isArray(n.sessions)?n.sessions:[];return Pu.innerHTML=e.length?e.map(B1).join(""):'<p class="memoryEmpty">No saved conversations yet.</p>',e}function Da(){yf.hidden=!0,Ku.setAttribute("aria-expanded","false"),document.body.classList.remove("historyOpen")}async function px(){nn("history"),Hn(),pn(),fn(),mn(),sn(),gn(),vn(),yn(),hn(),Cn(),Rn(),yf.hidden=!1,Ku.setAttribute("aria-expanded","true"),document.body.classList.add("historyOpen"),Pu.innerHTML='<p class="memoryEmpty">Loading conversation history...</p>';try{await hx()}catch(n){Pu.innerHTML=`<p class="memoryEmpty">${m(n.message)}</p>`}}async function $1(n){let e=n.getAttribute("data-session-id"),t=n.getAttribute("data-session-action");if(!(!e||!t||Tn)){Kt(!0);try{if(t==="open"){await mx(e),Da(),nn("chat"),_e("System ready","Conversation restored.");return}await Ye(`/api/jarvis/sessions/${encodeURIComponent(e)}`,{method:"DELETE"}),e===qt&&(window.localStorage.removeItem(Ls),qt=null,await ju()),await hx()}catch(i){_e("Connection issue",i.message||"Conversation history could not be updated.")}finally{Kt(!1)}}}async function V1(){Fp.disabled=!0;try{pn(),fn(),mn(),sn(),gn(),vn(),yn(),Da(),await Ye("/api/auth/logout",{method:"POST",body:"{}"}),window.localStorage.removeItem(Ls),qt=null,fl(null),ol("login"),_e("System ready","Signed out. Guest space ready.")}catch(n){wa.textContent=n.message||"Sign out is unavailable."}finally{Fp.disabled=!1}}async function ju(n=!0){let e=await Ye("/api/jarvis/sessions",{method:"POST",body:JSON.stringify({clientId:pl()})});return qt=e.session.id,window.localStorage.setItem(Ls,qt),Ps("READY"),n&&(Wt.innerHTML=""),Aa="",document.body.classList.remove("conversationActive"),Oi(),e.session}async function fx(){if(!Tn){Kt(!0),Pi("Chat reset."),Da(),_e("Starting","Creating a new conversation."),nn("chat"),Wt.innerHTML="",Aa="",document.body.classList.remove("conversationActive"),Oi(),window.localStorage.removeItem(Ls),qt=null;try{await ju(),_e("System ready","New chat ready. Your previous conversation remains in History.")}catch{_e("Connection issue","Apex Analytic backend is unavailable."),Ps("OFFLINE")}finally{Kt(!1)}}}async function mx(n,e=!0){let t=await Ye(`/api/jarvis/sessions/${n}`);return qt=t.session.id,window.localStorage.setItem(Ls,qt),e&&nx(t.session),Ps(`${t.session.messages.length} MSG`),t.session}async function gx(){if(!qt)return ju(!1);try{return await mx(qt,!1)}catch{return ju(!1)}}async function H1(n){await gx();let e=yb(n),t=await Ye("/api/jarvis/query",{method:"POST",body:JSON.stringify({query:n,inputMode:e.id,sessionId:qt,clientId:pl(),dealCard:is(),financialProfile:Na(),responseFeedback:AT()})});qt=t.session.id,window.localStorage.setItem(Ls,qt);let i=t.mode==="llm"?"AI":"FRAMEWORK";return Ps(`${i} / ${t.session.messages.length}`),t}async function Oa(n,e={}){let t=String(n||"").trim();if(!t||Tn)return;Kt(!0);let i=String(e.displayText||t).trim();Cs("user",i),An.value="",od(""),_e("Analyzing","Reviewing your knowledge and prior decisions."),Zn.classList.add("speaking");try{let s=await H1(t);Cs("jarvis",s.answer,s.sources,s),hC(s.memoryCandidate),df(Li(s.answer)),Un||_e("System ready","Ready when you are.")}catch(s){let r=s.message||"The Apex Analytic backend is unavailable.";Cs("jarvis",r),df(r),_e("Connection issue","Start Apex Analytic and try again."),Ps("OFFLINE")}finally{Kt(!1),!ad&&!window.speechSynthesis?.speaking&&Zn.classList.remove("speaking")}}async function cl(){if(Tn)return;let n=is(),e=Na(),t=xd();if(!n.askingPrice||!n.area&&!n.projectName){Cs("jarvis","Add an asking price and an area or project first. I can work with missing evidence after that, but I need a real deal to analyse.");let i=Ri.find(r=>r.getAttribute("data-context-toggle")==="deal");i&&Ii(i,!0),Rs.find(r=>{let a=r.getAttribute("data-deal-field");return a==="askingPrice"&&!n.askingPrice||a==="area"&&!n.area&&!n.projectName})?.focus();return}if(DT("deal-analysis")){nn("chat"),Kt(!0),Rn(),Pi("Running the full framework."),Cs("user","Run the seven-stage Apex Analytic assessment for this deal."),Ho.disabled=!0,Ho.textContent="ANALYSING...",_e("Analyzing","Running all seven Apex Analytic stages."),Zn.classList.add("speaking");try{await gx();let i=await Ye("/api/jarvis/analyze-deal",{method:"POST",body:JSON.stringify({sessionId:qt,clientId:pl(),dealCard:n,financialProfile:e,valuation:t})});qt=i.session.id,window.localStorage.setItem(Ls,qt);let s=i.mode==="llm"?"AI":"FRAMEWORK";Ps(`${s} / ${i.session.messages.length}`),i.billing&&hd(i.billing),i.savedReport&&(i.analysis.savedReportId=i.savedReport.id),dm(i.analysis,i.sources,i),df(Li(i.analysis.voiceSummary)),Un||_e("System ready","Analysis complete.")}catch(i){let s=i.message||"The deal analysis is unavailable.";Cs("jarvis",s),_e("Connection issue","Deal analysis could not be completed.")}finally{Ho.textContent="Decision report",Kt(!1),!ad&&!window.speechSynthesis?.speaking&&Zn.classList.remove("speaking")}}}function z1(){if(!Tn){if(ad||window.speechSynthesis?.speaking){Pi("Voice stopped.");return}if(!hi){L1();return}if(Qi){hi.stop();return}hi.start()}}async function G1(){Vo.textContent=Un?"VOICE ON":"VOICE OFF",Vo.setAttribute("aria-pressed",String(Un)),document.body.classList.toggle("voiceMuted",!Un),E1(),cd(),od(),Oi(),ml(),R1(),ol("login");try{let n=await Ye("/api/jarvis/status"),e=n.llm?.enabled?"AI":"FRAMEWORK";pb=!!n.audio?.serverStt,fb=!!n.audio?.serverTts,ba=!!n.accounts?.emailDelivery,mb=!!n.accounts?.verificationRequired,hl=!!n.ownerMarket?.enabled,ol(ts),WM.hidden=!n.llm?.enabled,await N1(),Ps(`${e} READY`),_e("System ready","Ready when you are.")}catch{_e("Connection issue","Apex Analytic backend is unavailable."),Ps("OFFLINE")}}function W1(){return Tn||Qi}function q1(n){if(Tn)return!1;Yo="",Pi("Ready for this property.");for(let i of Rs)i.value=n.dealCard?.[i.dataset.dealField]??"";for(let i of _r)i.value=n.financialProfile?.[i.dataset.profileField]??"";ix(!1);let e=n.dcfContext||{};for(let i of sd)e[i.dataset.dcfField]!==void 0&&(i.value=e[i.dataset.dcfField]);for(let[i,s]of rd.entries())for(let r of s.querySelectorAll("[data-dcf-comp-field]")){let a=e.comparables?.[i]?.[r.dataset.dcfCompField];r.type==="checkbox"?r.checked=a===!0:r.value=a??""}document.querySelector("#valuationResult").replaceChildren(),qt=n.sessionId||null,dl.clear(),Aa="";let t=n.messages||(n.chat||[]).map(i=>({role:i.role,content:i.text,mode:i.mode}));return nx({messages:n.report?.analysis?t.filter(i=>i.id!==n.report.messageId):t}),n.report?.analysis&&dm(n.report.analysis,n.report.sources,{mode:n.report.mode}),Yo=n.id,Oi(),gm(),!0}async function j1(n,e={}){if(!Tn){if(n==="account")return Ia();if(n==="trust")return Jf();if(n==="reports")return Qf();if(n==="journal")return pd();if(n==="memory")return Cb();if(n==="history")return px();if(n==="shortlist")return im();if(n==="owner")return Zb();if(n==="market")return bd();if(n==="cases")return vd();if(n==="evidence")return yd();Hn(),hn(),fn(),mn(),pn(),Da(),Cn(),sn(),gn(),vn(),yn(),Rn(),["deal","profile","guidance"].includes(n)?Ii(Ri.find(t=>t.dataset.contextToggle===n),!0,!1):nn(n),n==="chat"&&(e.prompt&&(An.value=e.prompt),e.analyze&&!uf()?await cl():An.focus({preventScroll:!0}))}}var Yo,Zn,Mu,An,VM,Ap,Wt,HM,zM,GM,Vo,gy,vy,Dp,Ho,Zi,WM,yy,hf,qM,pf,jM,ff,mf,XM,by,gf,Op,kp,xy,_y,wa,vf,Au,Up,Sy,Kv,Jv,YM,xa,KM,JM,ZM,Zv,Tu,Cu,Ru,Fp,Yu,Ca,QM,Qv,Tp,Iu,eA,tA,zo,Go,ey,nA,iA,sA,rA,Ku,yf,aA,wy,Pu,oA,lA,cA,Ju,Ey,Zu,bf,uA,dA,hA,yr,Qu,xf,pA,My,fA,mA,Ea,Bp,gA,ul,vA,_f,Sf,wf,Ef,Mf,Af,Tf,yA,bA,Ti,xA,_A,SA,Ay,Ty,Cy,Ry,Iy,Py,Ly,Ny,Dy,wA,$n,Cf,ed,EA,MA,pi,AA,TA,ty,Oy,$p,wu,Vp,Hp,CA,zp,RA,Gp,Lu,Nt,Ci,Ma,IA,Rf,PA,LA,If,ny,NA,ky,Pf,iy,DA,OA,kA,td,Nu,Uy,sy,Lf,Nf,UA,Df,Of,FA,kf,Uf,BA,Ff,Bf,$A,VA,HA,zA,Wp,GA,Ko,WA,qA,jA,Jo,XA,YA,$f,Ra,br,Zo,Qo,el,tl,Fy,By,$y,Vy,nd,Hy,zy,Gy,Wy,qy,jy,Xy,Yy,Ky,Jy,Vf,Hf,KA,qp,jp,Zy,Qy,JA,ry,eb,Du,zf,ZA,nl,QA,eT,Xp,Ou,tb,tT,nb,ku,nT,Gf,ib,iT,ay,Yp,sT,rT,aT,oT,lT,cT,uT,dT,hT,Kp,xr,sb,_a,pT,fT,Uu,rb,mT,ab,Jp,Zp,Qp,gT,oy,Cp,vT,yT,ob,Wf,ly,id,qf,bT,xT,lb,cb,Rs,_r,sd,rd,$o,mr,Wo,Ri,_T,ST,cy,hi,Ls,jf,Xf,wT,Fu,ef,uy,ub,db,Is,hb,tf,dl,Un,Qi,ad,gr,nf,qt,ts,yt,pb,fb,ba,mb,dr,Rp,Ip,Es,qo,Sa,jo,Bu,hl,ns,gb,il,sl,Ts,ya,rl,$u,al,vb,sf,rf,vr,Aa,Tn,Vu,hr,Yf,yx=Bx(()=>{Yo="";Zn=document.querySelector("#jarvisOrb"),Mu=document.querySelector("#chatForm"),An=document.querySelector("#chatInput"),VM=Mu.querySelector('button[type="submit"]'),Ap=document.querySelector("#inputModeHint"),Wt=document.querySelector("#transcript"),HM=document.querySelector("#assistantPrompt"),zM=document.querySelector("#systemStatus"),GM=document.querySelector("#sessionStatus"),Vo=document.querySelector("#soundToggle"),gy=document.querySelector("#stopVoiceBtn"),vy=document.querySelector("#resetChatBtn"),Dp=document.querySelector("#sessionBriefBtn"),Ho=document.querySelector("#analyzeDealBtn"),Zi=document.querySelector("#screenDealBtn"),WM=document.querySelector("#aiDisclosure"),yy=document.querySelector("#dealJourney"),hf=document.querySelector("#accountToggle"),qM=document.querySelector("#accountLabel"),pf=document.querySelector("#authPanel"),jM=document.querySelector("#authClose"),ff=document.querySelector("#authTitle"),mf=document.querySelector("#authForm"),XM=document.querySelector("#authNameField"),by=document.querySelector("#authName"),gf=document.querySelector("#authEmail"),Op=document.querySelector("#authPassword"),kp=document.querySelector("#authSubmit"),xy=document.querySelector("#authModeToggle"),_y=document.querySelector("#authRecoveryToggle"),wa=document.querySelector("#authMessage"),vf=document.querySelector("#authRecovery"),Au=document.querySelector("#recoveryEmail"),Up=document.querySelector("#recoveryRequest"),Sy=document.querySelector("#recoveryToken"),Kv=document.querySelector("#recoveryPassword"),Jv=document.querySelector("#recoverySubmit"),YM=document.querySelector("#recoveryCancel"),xa=document.querySelector("#recoveryMessage"),KM=document.querySelector("#authUser"),JM=document.querySelector("#authUserName"),ZM=document.querySelector("#authUserEmail"),Zv=document.querySelector("#authVerificationState"),Tu=document.querySelector("#verificationToken"),Cu=document.querySelector("#verificationRequest"),Ru=document.querySelector("#verificationSubmit"),Fp=document.querySelector("#logoutButton"),Yu=document.querySelector("#memoryToggle"),Ca=document.querySelector("#memoryPanel"),QM=document.querySelector("#memoryClose"),Qv=document.querySelector("#memoryForm"),Tp=document.querySelector("#memoryInput"),Iu=document.querySelector("#memoryList"),eA=document.querySelector("#memoryApprovedCount"),tA=document.querySelector("#memoryPendingCount"),zo=document.querySelector("#memoryCaptureEnabled"),Go=document.querySelector("#memoryReasoningEnabled"),ey=document.querySelector("#memoryModeNotice"),nA=document.querySelector("#memoryProfileTitle"),iA=document.querySelector("#memoryProfileCompleteness"),sA=document.querySelector("#memoryProfileSummary"),rA=document.querySelector("#memoryProfileDetails"),Ku=document.querySelector("#historyToggle"),yf=document.querySelector("#sessionPanel"),aA=document.querySelector("#sessionClose"),wy=document.querySelector("#sessionNew"),Pu=document.querySelector("#sessionList"),oA=document.querySelector("#billingSummary"),lA=document.querySelector("#billingPlanName"),cA=document.querySelector("#billingUsage"),Ju=document.querySelector("#billingActions"),Ey=document.querySelector("#billingGuardrail"),Zu=document.querySelector("#reportsToggle"),bf=document.querySelector("#reportsPanel"),uA=document.querySelector("#reportsClose"),dA=document.querySelector("#reportsSavedCount"),hA=document.querySelector("#reportsUsageLabel"),yr=document.querySelector("#reportsList"),Qu=document.querySelector("#journalToggle"),xf=document.querySelector("#journalPanel"),pA=document.querySelector("#journalClose"),My=document.querySelector("#journalSummary"),fA=document.querySelector("#journalTotalCount"),mA=document.querySelector("#journalReviewedCount"),Ea=document.querySelector("#journalList"),Bp=document.querySelector("#journalEditor"),gA=document.querySelector("#journalBack"),ul=document.querySelector("#journalDecisionId"),vA=document.querySelector("#journalSubject"),_f=document.querySelector("#journalDecision"),Sf=document.querySelector("#journalConfidence"),wf=document.querySelector("#journalHoldingPeriod"),Ef=document.querySelector("#journalThesis"),Mf=document.querySelector("#journalCounterThesis"),Af=document.querySelector("#journalKillCriterion"),Tf=document.querySelector("#journalNotes"),yA=document.querySelector("#journalDraftActions"),bA=document.querySelector("#journalSaveDraft"),Ti=document.querySelector("#journalLock"),xA=document.querySelector("#journalDelete"),_A=document.querySelector("#journalLockNotice"),SA=document.querySelector("#journalOutcome"),Ay=document.querySelector("#journalOutcomeStatus"),Ty=document.querySelector("#journalActualRent"),Cy=document.querySelector("#journalCurrentValue"),Ry=document.querySelector("#journalProcessScore"),Iy=document.querySelector("#journalExecutionScore"),Py=document.querySelector("#journalOutcomeScore"),Ly=document.querySelector("#journalLuckScore"),Ny=document.querySelector("#journalResult"),Dy=document.querySelector("#journalLesson"),wA=document.querySelector("#journalSaveReview"),$n=document.querySelector("#journalMessage"),Cf=document.querySelector("#ownerIntelToggle"),ed=document.querySelector("#ownerIntelPanel"),EA=document.querySelector("#ownerIntelClose"),MA=document.querySelector("#ownerIntelAccess"),pi=document.querySelector("#ownerIntelToken"),AA=document.querySelector("#ownerIntelClearToken"),TA=document.querySelector("#ownerIntelSummary"),ty=document.querySelector("#ownerIntelOpsDashboard"),Oy=document.querySelector("#ownerIntelControls"),$p=document.querySelector("#ownerIntelOpsRefresh"),wu=document.querySelector("#ownerIntelCopyBrief"),Vp=document.querySelector("#ownerIntelExport"),Hp=document.querySelector("#ownerIntelImport"),CA=document.querySelector("#ownerIntelRestoreHistory"),zp=document.querySelector("#ownerIntelBackupReminder"),RA=document.querySelector("#ownerIntelBeliefReview"),Gp=document.querySelector("#ownerIntelBeliefLog"),Lu=document.querySelector("#ownerIntelImportFile"),Nt=document.querySelector("#ownerIntelRestorePhrase"),Ci=document.querySelector("#ownerIntelRestoreConfirm"),Ma=document.querySelector("#ownerIntelRestoreLog"),IA=document.querySelector("#ownerIntelLanes"),Rf=document.querySelector("#ownerIntelCoverage"),PA=document.querySelector("#ownerIntelNextTitle"),LA=document.querySelector("#ownerIntelNextDetail"),If=document.querySelector("#ownerIntelActions"),ny=document.querySelector("#ownerIntelMessage"),NA=document.querySelector("#ownerAdminLoad"),ky=document.querySelector("#ownerAdminSummary"),Pf=document.querySelector("#ownerAdminList"),iy=document.querySelector("#ownerResearchPanel"),DA=document.querySelector("#ownerResearchSummary"),OA=document.querySelector("#ownerResearchRefresh"),kA=document.querySelector("#ownerResearchImport"),td=document.querySelector("#ownerResearchReplace"),Nu=document.querySelector("#ownerResearchFile"),Uy=document.querySelector("#ownerResearchList"),sy=document.querySelector("#ownerResearchMessage"),Lf=document.querySelector("#ownerMarketToggle"),Nf=document.querySelector("#ownerMarketPanel"),UA=document.querySelector("#ownerMarketClose"),Df=document.querySelector("#ownerCaseToggle"),Of=document.querySelector("#ownerCasePanel"),FA=document.querySelector("#ownerCaseClose"),kf=document.querySelector("#ownerEvidenceToggle"),Uf=document.querySelector("#ownerEvidencePanel"),BA=document.querySelector("#ownerEvidenceClose"),Ff=document.querySelector("#trustToggle"),Bf=document.querySelector("#trustPanel"),$A=document.querySelector("#trustClose"),VA=document.querySelector("#trustAcceptance"),HA=document.querySelector("#trustAcceptanceTitle"),zA=document.querySelector("#trustAcceptanceDetail"),Wp=document.querySelector("#trustAccept"),GA=document.querySelector("#ownerMarketAccess"),Ko=document.querySelector("#ownerMarketToken"),WA=document.querySelector("#ownerMarketClearToken"),qA=document.querySelector("#ownerMarketSummary"),jA=document.querySelector("#ownerCaseAccess"),Jo=document.querySelector("#ownerCaseToken"),XA=document.querySelector("#ownerCaseClearToken"),YA=document.querySelector("#ownerCaseSummary"),$f=document.querySelector("#ownerCaseForm"),Ra=document.querySelector("#ownerCaseProject"),br=document.querySelector("#ownerCaseProjectName"),Zo=document.querySelector("#ownerCaseArea"),Qo=document.querySelector("#ownerCaseState"),el=document.querySelector("#ownerCaseType"),tl=document.querySelector("#ownerCaseDeveloper"),Fy=document.querySelector("#ownerCasePriceSegment"),By=document.querySelector("#ownerCaseVerdict"),$y=document.querySelector("#ownerCaseConfidence"),Vy=document.querySelector("#ownerCaseRating"),nd=document.querySelector("#ownerCaseObservedAt"),Hy=document.querySelector("#ownerCaseTags"),zy=document.querySelector("#ownerCaseTargetBuyer"),Gy=document.querySelector("#ownerCaseTargetTenant"),Wy=document.querySelector("#ownerCaseStrengths"),qy=document.querySelector("#ownerCaseWeaknesses"),jy=document.querySelector("#ownerCaseManagement"),Xy=document.querySelector("#ownerCaseResident"),Yy=document.querySelector("#ownerCaseSupply"),Ky=document.querySelector("#ownerCaseRental"),Jy=document.querySelector("#ownerCaseResale"),Vf=document.querySelector("#ownerCaseOwnerVerdict"),Hf=document.querySelector("#ownerCaseSourceBasis"),KA=document.querySelector("#ownerCaseRefresh"),qp=document.querySelector("#ownerCaseFilter"),jp=document.querySelector("#ownerCaseVerdictFilter"),Zy=document.querySelector("#ownerCaseCompletenessFilter"),Qy=document.querySelector("#ownerCaseList"),JA=document.querySelector("#ownerCaseMetrics"),ry=document.querySelector("#ownerCaseMessage"),eb=document.querySelector("#ownerCaseFormTitle"),Du=document.querySelector("#ownerCaseSubmit"),zf=document.querySelector("#ownerCaseCancelEdit"),ZA=document.querySelector("#ownerEvidenceAccess"),nl=document.querySelector("#ownerEvidenceToken"),QA=document.querySelector("#ownerEvidenceClearToken"),eT=document.querySelector("#ownerEvidenceSummary"),Xp=document.querySelector("#ownerEvidenceForm"),Ou=document.querySelector("#ownerEvidenceTitle"),tb=document.querySelector("#ownerEvidenceFilename"),tT=document.querySelector("#ownerEvidenceSourceUrl"),nb=document.querySelector("#ownerEvidenceTags"),ku=document.querySelector("#ownerEvidenceText"),nT=document.querySelector("#ownerEvidenceRefresh"),Gf=document.querySelector("#ownerEvidenceFilter"),ib=document.querySelector("#ownerEvidenceList"),iT=document.querySelector("#ownerEvidenceMetrics"),ay=document.querySelector("#ownerEvidenceMessage"),Yp=document.querySelector("#ownerProjectForm"),sT=document.querySelector("#ownerProjectName"),rT=document.querySelector("#ownerProjectArea"),aT=document.querySelector("#ownerProjectState"),oT=document.querySelector("#ownerProjectType"),lT=document.querySelector("#ownerProjectDeveloper"),cT=document.querySelector("#ownerProjectTenure"),uT=document.querySelector("#ownerProjectCompletionYear"),dT=document.querySelector("#ownerProjectStatus"),hT=document.querySelector("#ownerProjectAliases"),Kp=document.querySelector("#ownerObservationForm"),xr=document.querySelector("#ownerObservationProject"),sb=document.querySelector("#ownerObservationMetric"),_a=document.querySelector("#ownerObservationArea"),pT=document.querySelector("#ownerObservationValue"),fT=document.querySelector("#ownerObservationUnit"),Uu=document.querySelector("#ownerObservationDate"),rb=document.querySelector("#ownerObservationSourceType"),mT=document.querySelector("#ownerObservationConfidence"),ab=document.querySelector("#ownerObservationNotes"),Jp=document.querySelector("#ownerMarketAreaFilter"),Zp=document.querySelector("#ownerMarketMetricFilter"),Qp=document.querySelector("#ownerMarketFreshnessFilter"),gT=document.querySelector("#ownerMarketRefresh"),oy=document.querySelector("#ownerMarketImportForm"),Cp=document.querySelector("#ownerMarketImportText"),vT=document.querySelector("#ownerProjectCount"),yT=document.querySelector("#ownerObservationCount"),ob=document.querySelector("#ownerProjectList"),Wf=document.querySelector("#ownerObservationList"),ly=document.querySelector("#ownerMarketMessage"),id=document.querySelector("#shortlistToggle"),qf=document.querySelector("#shortlistPanel"),bT=document.querySelector("#shortlistClose"),xT=document.querySelector("#shortlistSummary"),lb=document.querySelector("#shortlistList"),cb=document.querySelector("#shortlistClear"),Rs=Array.from(document.querySelectorAll("[data-deal-field]")),_r=Array.from(document.querySelectorAll("[data-profile-field]")),sd=Array.from(document.querySelectorAll("[data-dcf-field]")),rd=Array.from(document.querySelectorAll("[data-dcf-comparable]")),$o=document.querySelector("#dcfCalculateBtn"),mr=document.querySelector("#dcfDownloadBtn"),Wo=document.querySelector("#dcfMessage"),Ri=Array.from(document.querySelectorAll("[data-context-toggle]")),_T=Array.from(document.querySelectorAll("[data-context-reset]")),ST=Array.from(document.querySelectorAll("[data-starter-prompt], [data-starter-action]")),cy=window.SpeechRecognition||window.webkitSpeechRecognition,hi=cy?new cy:null,Ls="estatelab.jarvis.sessionId",jf="estatelab.jarvis.dealCard",Xf="estatelab.jarvis.financialProfile",wT="apex.residentialDcf.v1",Fu="estatelab.jarvis.contextPanels",ef="apex.contextFieldMode.v1",uy="apex.shortlist.v1",ub="apex.responseFeedback.v1",db="apex.voiceResponses.v1",Is="apex.ownerMarket.token",hb="apex.ownerKnowledge.lastBackup.v1",tf="apex.trustBoundary.accepted.v1",dl=new Map,Un=window.localStorage.getItem(db)==="true",Qi=!1,ad=!1,gr=!1,nf=0,qt=window.localStorage.getItem(Ls),ts="login",yt=null,pb=!1,fb=!1,ba=!1,mb=!1,dr=null,Rp=null,Ip=[],Es=null,qo="",Sa=null,jo=null,Bu=[],hl=!1,ns=[],gb=[],il="all",sl=null,Ts=null,ya=[],rl=null,$u=[],al="",vb={},sf=[],rf=!1,vr="",Aa="",Tn=!1;Vu={deal:new Set(["area","projectName","propertyType","askingPrice","conservativeFairValue","expectedRent","estimatedInstallment","maintenance","ownStayAppeal","managementQuality","exitBuyerPool","nearbySupply","mainConcern"]),profile:new Set(["monthlyIncome","cashReserveMonths","cashAvailable","currentDebt","investmentGoal","holdingPeriod","financialConcern"]),guidance:new Set(["experienceLevel","guidanceMode","decisionIntent","preferredOutput","confidenceComfort","onboardingNotes"])};hr={chat:{label:"CHAT",placeholder:"Ask Apex Analytic...",prompt:"Ask naturally. Apex will route the response style."},screen:{label:"SCREEN",placeholder:"Ask if this deal should be shortlisted...",prompt:"Screening mode: include area, price, rent, and concern if you have them."},compare:{label:"COMPARE",placeholder:"Compare two projects, areas, or deals...",prompt:"Comparison mode: name both options and the decision you need."},offer:{label:"OFFER",placeholder:"Prepare offer, negotiation, or walk-away price...",prompt:"Offer mode: Apex will focus on price proof, leverage, and walk-away rule."},checklist:{label:"CHECKLIST",placeholder:"Ask for a checklist or next action list...",prompt:"Checklist mode: Apex will convert the answer into action items."},voice:{label:"VOICE",placeholder:"Ask for a short voice-safe answer...",prompt:"Voice mode: Apex will keep the spoken answer compact."}};Yf=[{id:"useful",label:"Useful",note:"Keep this answer shape."},{id:"shorter",label:"Shorter",note:"Make future answers shorter and lead with the decision."},{id:"warmer",label:"Less formal",note:"Make future answers more natural and mentor-like."},{id:"evidence",label:"More proof",note:"Add clearer missing evidence and verification steps."}];hi&&(hi.lang="en-MY",hi.interimResults=!0,hi.continuous=!1,hi.onstart=()=>{Qi=!0,Zn.classList.add("listening"),_e("Listening","Speak naturally.")},hi.onresult=n=>{let e=Array.from(n.results).map(t=>t[0].transcript).join(" ");An.value=e,n.results[n.results.length-1].isFinal&&Oa(e)},hi.onerror=()=>{_e("Voice interrupted","Tap the orb to try again.")},hi.onend=()=>{Qi=!1,Zn.classList.remove("listening"),window.speechSynthesis?.speaking||_e("System ready","Ready when you are.")});Mu.addEventListener("submit",n=>{n.preventDefault(),Oa(An.value)});Zn.addEventListener("click",z1);gy.addEventListener("click",()=>Pi("Voice stopped."));vy.addEventListener("click",fx);Dp.addEventListener("click",()=>void kb(Dp));Ho.addEventListener("click",cl);Zi?.addEventListener("click",()=>void dx());hf.addEventListener("click",()=>{pf.hidden?Ia():Hn()});Yu.addEventListener("click",()=>{Ca.hidden?Cb():pn()});Ku.addEventListener("click",()=>{yf.hidden?px():Da()});aA.addEventListener("click",Da);wy.addEventListener("click",fx);Pu.addEventListener("click",n=>{let e=n.target.closest("[data-session-action]");e&&$1(e)});QM.addEventListener("click",pn);zo.addEventListener("change",()=>void Rb());Go.addEventListener("change",()=>void Rb());Zu.addEventListener("click",()=>{bf.hidden?Qf():fn()});uA.addEventListener("click",fn);yr.addEventListener("click",n=>{let e=n.target.closest("[data-report-action]");e&&gC(e)});Qu.addEventListener("click",()=>{xf.hidden?pd():mn()});pA.addEventListener("click",mn);Ea.addEventListener("click",n=>{let e=n.target.closest("[data-journal-action]");e?.getAttribute("data-journal-action")==="open"&&Pb(e.getAttribute("data-journal-id"))});gA.addEventListener("click",()=>void em());bA.addEventListener("click",()=>void xC());Ti.addEventListener("click",SC);xA.addEventListener("click",()=>void EC());wA.addEventListener("click",()=>void wC());Lf.addEventListener("click",()=>{Nf.hidden?bd():gn()});UA.addEventListener("click",gn);Cf.addEventListener("click",()=>{ed.hidden?Zb():sn()});EA.addEventListener("click",sn);ed.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]");if(!e||If.contains(e)||Rf.contains(e))return;e.getAttribute("data-owner-intel-action")==="refresh"&&Ns()});Df.addEventListener("click",()=>{Of.hidden?vd():vn()});FA.addEventListener("click",vn);kf.addEventListener("click",()=>{Uf.hidden?yd():yn()});BA.addEventListener("click",yn);Ff.addEventListener("click",()=>{Bf.hidden?Jf():hn()});$A.addEventListener("click",hn);Wp.addEventListener("click",NT);GA.addEventListener("submit",n=>{n.preventDefault();let e=Ko.value.trim();if(!e)return Ko.focus();Qn(e),Di()});WA.addEventListener("click",()=>{Qn(""),Jb({},{}),Tt("Owner token cleared from this device.")});MA.addEventListener("submit",n=>{n.preventDefault();let e=pi.value.trim();if(!e)return pi.focus();Qn(e),Ns()});AA.addEventListener("click",()=>{Qn(""),Ts=null,Nt.value="",Nt.hidden=!0,Ci.hidden=!0,Ma.hidden=!0,Ma.innerHTML="",of(),Wb([]),zu(),rl=null,td.hidden=!0,Ge("Owner token cleared from this device.")});Oy.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-filter]")?.getAttribute("data-owner-intel-filter");e&&(il=e,zb(sl?.rows||[]))});$p.addEventListener("click",()=>void nR().catch(n=>Ge(n.message||"Production ops could not be checked.","danger")));wu.addEventListener("click",()=>void JC());Vp.addEventListener("click",()=>void QC().catch(n=>Ge(n.message||"Owner backup could not be exported.","danger")));Hp.addEventListener("click",()=>Lu.click());CA.addEventListener("click",()=>void oR().catch(n=>Ge(n.message||"Restore log could not be loaded.","danger")));zp.addEventListener("click",()=>void tR().catch(n=>Ge(n.message||"Backup reminder could not be sent.","danger")));RA.addEventListener("click",()=>void Gb().catch(n=>Ge(n.message||"Belief review queue could not be loaded.","danger")));Gp.addEventListener("click",n=>{let e=n.target.closest("[data-belief-review]");e&&uR(e).catch(t=>Ge(t.message||"Belief review could not be saved.","danger"))});Lu.addEventListener("change",()=>void sR(Lu.files?.[0]).catch(n=>Ge(n.message||"Owner backup could not be validated.","danger")));Ci.addEventListener("click",()=>void rR().catch(n=>Ge(n.message||"Owner backup could not be restored.","danger")));Ma.addEventListener("click",n=>{let e=n.target.closest("[data-owner-rollback-snapshot]")?.getAttribute("data-owner-rollback-snapshot");e&&dR(e).catch(t=>Ge(t.message||"Rollback could not be completed.","danger"))});NA.addEventListener("click",()=>void qb().catch(n=>Ge(n.message||"User control could not be loaded.","danger")));Pf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-admin-action='save']");e&&fR(e).catch(t=>Ge(t.message||"User could not be updated.","danger"))});If.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]")?.getAttribute("data-owner-intel-action");e==="refresh"&&Ns(),e==="market"&&bd(),e==="cases"&&vd(),e==="evidence"&&yd(),e==="research"&&(iy.open=!0,iy.scrollIntoView({behavior:"smooth",block:"start"}))});OA.addEventListener("click",()=>void rm().catch(n=>Jn(n.message||"Research studies could not be loaded.","danger")));kA.addEventListener("click",()=>Nu.click());td.addEventListener("click",()=>{rl&&$b(rl,!0).catch(n=>Jn(n.message||"Research study could not be replaced.","danger"))});Nu.addEventListener("change",()=>void $C(Nu.files?.[0]).catch(n=>Jn(n.message||"Research study could not be imported.","danger")));Uy.addEventListener("click",n=>{let e=n.target.closest("[data-owner-research-action='delete']");e&&VC(e.getAttribute("data-owner-research-id")).catch(t=>Jn(t.message||"Research study could not be deleted.","danger"))});Rf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-intel-action]"),t=e?.getAttribute("data-owner-intel-action");t==="refresh"&&Ns(),["case","signal","proof"].includes(t)&&FR(t,e.getAttribute("data-owner-intel-project"))});jA.addEventListener("submit",n=>{n.preventDefault();let e=Jo.value.trim();if(!e)return Jo.focus();Qn(e),wr()});XA.addEventListener("click",()=>{Qn(""),Wu({}),Jt("Owner token cleared from this device.")});ZA.addEventListener("submit",n=>{n.preventDefault();let e=nl.value.trim();if(!e)return nl.focus();Qn(e),gl()});QA.addEventListener("click",()=>{Qn(""),Gf.value="",lf({}),Vn("Owner token cleared from this device.")});$f.addEventListener("submit",n=>{n.preventDefault(),Du.disabled=!0,AR().catch(e=>Jt(e.message||"Development case could not be saved.","danger")).finally(()=>{Du.disabled=!1})});zf.addEventListener("click",()=>{cm(),Jt("Edit cancelled.")});Ra.addEventListener("change",()=>{let n=Yb();n&&(br.value||(br.value=n.name||""),Zo.value||(Zo.value=n.area||""),Qo.value||(Qo.value=n.state||""),el.value||(el.value=n.propertyType||""),tl.value||(tl.value=n.developer||""))});KA.addEventListener("click",()=>void wr().catch(n=>Jt(n.message||"Development case library could not be loaded.","danger")));qp.addEventListener("input",()=>void wr().catch(()=>{}));jp.addEventListener("change",()=>void wr().catch(n=>Jt(n.message||"Development case library could not be loaded.","danger")));Zy.addEventListener("change",()=>Wu(vb));Qy.addEventListener("click",n=>{let e=n.target.closest("[data-owner-case-action]"),t=e?.getAttribute("data-owner-case-action");t==="edit"&&MR(e),t==="delete"&&TR(e)});Xp.addEventListener("submit",n=>{n.preventDefault();let e=Xp.querySelector("button[type='submit']");e.disabled=!0,yR().catch(t=>Vn(t.message||"Evidence could not be added.","danger")).finally(()=>{e.disabled=!1})});nT.addEventListener("click",()=>void gl().catch(n=>Vn(n.message||"Evidence vault could not be loaded.","danger")));Gf.addEventListener("input",jb);ib.addEventListener("click",n=>{let e=n.target.closest("[data-owner-evidence-action='delete']");e&&bR(e)});Yp.addEventListener("submit",n=>{n.preventDefault();let e=Yp.querySelector("button[type='submit']");e.disabled=!0,BR().catch(t=>Tt(t.message||"Project could not be added.","danger")).finally(()=>{e.disabled=!1})});Kp.addEventListener("submit",n=>{n.preventDefault();let e=Kp.querySelector("button[type='submit']");e.disabled=!0,$R().catch(t=>Tt(t.message||"Observation could not be added.","danger")).finally(()=>{e.disabled=!1})});oy.addEventListener("submit",n=>{n.preventDefault();let e=oy.querySelector("button[type='submit']");e.disabled=!0,VR().catch(t=>Tt(t.message||"Market batch could not be imported.","danger")).finally(()=>{e.disabled=!1})});xr.addEventListener("change",()=>{let n=ns.find(e=>e.id===xr.value);n&&!_a.value&&(_a.value=n.area||"")});gT.addEventListener("click",()=>void Di().catch(n=>Tt(n.message||"Market evidence could not be loaded.","danger")));Jp.addEventListener("input",()=>void Di().catch(()=>{}));Zp.addEventListener("change",()=>void Di().catch(n=>Tt(n.message||"Market evidence could not be loaded.","danger")));Qp.addEventListener("change",()=>void Di().catch(n=>Tt(n.message||"Market evidence could not be loaded.","danger")));Wf.addEventListener("click",n=>{let e=n.target.closest("[data-owner-market-action='delete-observation']");e&&HR(e)});Ju.addEventListener("click",n=>{let e=n.target.closest("[data-checkout-plan]");e&&fC(e.getAttribute("data-checkout-plan"))});id.addEventListener("click",()=>{qf.hidden?im():Cn()});bT.addEventListener("click",Cn);cb.addEventListener("click",()=>{md([]),ml(),_e("System ready","Shortlist cleared.")});Qv.addEventListener("submit",async n=>{n.preventDefault();let e=Tp.value.trim();if(!e)return Tp.focus();let t=Qv.querySelector("button");t.disabled=!0;try{await Ye("/api/memory",{method:"POST",body:JSON.stringify({content:e})}),Tp.value="",await dd(),_e("System ready","Memory added for review.")}catch(i){_e("Connection issue",i.message||"Memory could not be added.")}finally{t.disabled=!1}});for(let n of[Wt,Iu,document.querySelector("#savedReportView")])n.addEventListener("click",e=>{let t=e.target.closest("[data-memory-action]");t&&dC(t);let i=e.target.closest("[data-analysis-action]");i&&UC(i);let s=e.target.closest("[data-response-feedback]");s&&PT(s);let r=e.target.closest("[data-response-refine]");r&&LT(r);let a=e.target.closest("[data-coach-prompt]");a&&(An.value=a.getAttribute("data-coach-prompt")||"",An.focus(),_e("System ready","Prompt loaded. Edit or send when ready."))});lb.addEventListener("click",n=>{let e=n.target.closest("[data-shortlist-action]");e&&CC(e)});yy?.addEventListener("click",n=>{let e=n.target.closest("[data-journey-action]");e&&FC(e)});document.addEventListener("click",n=>{if(n.target.closest("[data-report-back]")){document.querySelector("#savedReportView").hidden=!0,yr.hidden=!1;return}let e=n.target.closest("[data-context-field-mode]");if(e){let i=e.getAttribute("data-context-field-mode");w1(i,fm(i)==="all"?"core":"all");return}let t=n.target.closest("[data-context-focus-panel]");if(t){let i=t.getAttribute("data-context-focus-panel"),s=t.getAttribute("data-context-focus-key"),r=Ri.find(a=>a.getAttribute("data-context-toggle")===i);r&&Ii(r,!0),cx(i,s)?.focus()}});jM.addEventListener("click",Hn);xy.addEventListener("click",()=>ol(ts==="login"?"register":"login"));_y.addEventListener("click",()=>Kf(!0));mf.addEventListener("submit",n=>{n.preventDefault(),D1()});vf.addEventListener("submit",n=>{n.preventDefault(),k1()});Up.addEventListener("click",O1);YM.addEventListener("click",()=>Kf(!1));Cu.addEventListener("click",U1);Ru.addEventListener("click",F1);Fp.addEventListener("click",V1);window.addEventListener("afterprint",kC);An.addEventListener("input",()=>od());An.addEventListener("focus",()=>{let n=od();_e("System ready",n.prompt)});for(let n of ST)n.addEventListener("click",()=>{if(n.getAttribute("data-starter-action")==="deal"){Ub("deal");return}let e=n.getAttribute("data-starter-prompt");e&&Oa(e)});Vo.addEventListener("click",()=>{Un=!Un,window.localStorage.setItem(db,String(Un)),Vo.textContent=Un?"VOICE ON":"VOICE OFF",Vo.setAttribute("aria-pressed",String(Un)),document.body.classList.toggle("voiceMuted",!Un),Un?_e("System ready","Voice response on. Spoken replies stay compact."):Pi("Voice response off.")});for(let n of Rs)n.addEventListener("input",()=>qu(Rs,"data-deal-field",jf));for(let n of _r)n.addEventListener("input",()=>qu(_r,"data-profile-field",Xf));for(let n of[...sd,...rd.flatMap(e=>Array.from(e.querySelectorAll("[data-dcf-comp-field]")))])n.addEventListener("input",fy),n.addEventListener("change",fy);$o?.addEventListener("click",()=>void y1());mr?.addEventListener("click",()=>void hm())});var Ht=(n,e,t,i,s)=>({id:n,title:e,prompt:t,fields:i.split(" "),source:s}),Rt=[{id:"district",title:"The District",subject:"Property selection",short:"Select",color:"#8fd8be",description:"Find the place worth believing in.",lesson:"A low price is an invitation to investigate. The property still has to earn its place.",position:[-7,0,2],document:"MY_INVESTMENT_FRAMEWORK.md",checkpoints:[Ht("identity","Place your candidate","Start with one real property. Which area, building and unit are you investigating?","projectName area propertyType propertyAge floorArea askingPrice tenure","Stage 1A-C: selection philosophy, area and price segment"),Ht("value","Prove the entry price","Use completed sales of comparable units. Asking prices alone cannot establish value.","conservativeFairValue comparableTransactions comparableSource comparableRecency comparableMatchQuality comparablePriceRange comparableAdjustmentNotes","Stage 1C/G: price discipline and transaction evidence"),Ht("appeal","See the future buyer","Why would someone choose to live here, and why would an investor buy it later?","unitPosition ownStayAppeal exitBuyerPool managementQuality","Stage 1D-F: buyer depth, own-stay appeal and quality"),Ht("visit","Walk the building","Record what you actually observed. Renderings cannot prove a completed building's condition.","siteVisit siteVisitEvidence lobbyGuardhouseSignal liftCarparkCorridorSignal commonAreaCondition residentBehaviourSignal defectLeakageSignal siteVisitNotes inspectionConcern","Stage 1E-F; Execution Calibration D: physical inspection"),Ht("management","Look behind the lobby","Test the management response and collection record. Attractive architecture needs sustained care.","managementResponseSignal arrearsJmbSignal siteManagementNotes","Stage 1F; Execution Calibration E-F: management and project culture")]},{id:"compass",title:"The Compass",subject:"Investor suitability",short:"Fit",color:"#bfd298",description:"Make the property fit your life.",lesson:"Being able to obtain a loan is different from being able to live comfortably with it.",position:[-3.3,.5,-3.5],document:"INVESTOR_MANDATE_PROFILE.md",checkpoints:[Ht("capacity","Measure your breathing room","Use your actual income, existing monthly debt and cash remaining for this purchase.","monthlyIncome currentDebt cashAvailable cashReserveMonths","Buying Power Discipline; Cash Reserve Gate"),Ht("mandate","Choose your destination","Name the job this property must do, the holding period, and any upcoming demands on your cash.","riskStyle investmentGoal holdingPeriod nearTermCommitment financialConcern","Strategy Fit; Refusal And Cooling-Off Rules")]},{id:"vault",title:"The Vault",subject:"Financing & structure",short:"Finance",color:"#dcc597",description:"Build on financing that can hold.",lesson:"The transaction should work at the genuine price, with every payment and obligation visible.",position:[2.5,1,-4.6],document:"DEAL_STRUCTURING_FINANCING.md",checkpoints:[Ht("loan","Test the loan","Use a lender-backed estimate and review margin, documentation and instalment stress together.","estimatedInstallment cashOutlay bankValuationSupport loanPrecheckStatus loanMarginPlan instalmentStress cashBufferAfterPurchase financingDocumentReadiness financingNotes","Loan Margin Discipline; Cash Cost Discipline; Stress Test Standard"),Ht("title","Clear the transaction","Confirm title, seller authority and the path for transferring funds with your lawyer.","legalCheck legalTitleType titleTransferStatus caveatRestrictionStatus sellerAuthorityStatus arrearsUtilitiesStatus stakeholderFlowStatus lawyerCoordinationStatus legalTransactionNotes","Stage 1K: title and transactionability; Financing-Led Deal Test"),Ht("sourcing","Challenge the sales story","Separate evidence about the asset from urgency, promises and negotiation pressure.","dealSource agentBehavior sellerMotivation professionalConcern","Execution Calibration A-C: sourcing, negotiation and professional filtering")]},{id:"residence",title:"The Residence",subject:"Holding power",short:"Hold",color:"#9dcad4",description:"Make the everyday numbers work.",lesson:"Rent is the start of the calculation. Vacancy, maintenance and repairs decide your holding power.",position:[7,.4,-.2],document:"HOLDING_POWER_ASSET_MANAGEMENT.md",checkpoints:[Ht("rent","Follow real tenant demand","Check achieved rents, enquiry quality and seasonality for comparable units.","expectedRent rentEvidence rentalSource rentalRecency tenantUrgency vacancySignal rentalSustainability rentalAdjustmentNotes","Stage 1I: rental resilience; Rental Reality Test"),Ht("costs","Count the quiet costs","Include recurring costs, a repair allowance and vacancy. Enter zero explicitly where it is justified.","maintenance annualAssessmentQuitRent annualInsuranceTax monthlyRepairReserve furnishingBudget vacancyStressMonths","True Holding Cost; Vacancy And Repair Stress"),Ht("tenant","Plan the lived experience","Furnish for the target tenant and screen using documented behaviour, identity and affordability.","targetTenant furnishingStrategy tenantScreening","Execution Calibration G-H: furnishing and tenant management")]},{id:"portfolio",title:"The Collection",subject:"Portfolio strategy",short:"Balance",color:"#b6ace1",description:"Choose what makes the whole stronger.",lesson:"One successful investment does not prove the next. Test how this asset changes your total exposure.",position:[5,.9,5.3],document:"PORTFOLIO_STRATEGY_SCALING.md",checkpoints:[Ht("exposure","Place it in the portfolio","For a first purchase enter zero properties and assess the concentration this new asset would create.","existingProperties portfolioRole existingPortfolioHealth concentrationRisk nextPurchaseReason","Portfolio concentration; Next-Purchase Gate")]},{id:"horizon",title:"The Observatory",subject:"Market & timing",short:"Observe",color:"#e5b6a4",description:"Look past today's sales pitch.",lesson:"A catalyst is a hypothesis. Study competing supply, absorption and your position if it arrives late.",position:[-.1,1.3,7.4],document:"MARKET_INTELLIGENCE_TIMING.md",checkpoints:[Ht("supply","Map the next wave","Inspect the nearest substitutes and future completion dates, including comparable new layouts and prices.","nearbySupply supplyRadius substituteCount substituteThreat futureSupplyTiming densityLiftStress","Stage 1J: supply and density; Supply Pipeline"),Ht("absorption","Read the ground signals","Use dated occupancy, achieved rent and unsold-stock evidence. A busy gallery is not a completed sale.","absorptionEvidence unsoldStockSignal supplyNotes","Local Area Cycle; Buyer Sentiment And Liquidity")]},{id:"summit",title:"The Summit",subject:"Decision & learning",short:"Decide",color:"#e4dfbd",description:"Earn your conclusion.",lesson:"Write what would prove you wrong before the outcome is known. Revisit the thesis as reality changes.",position:[-6,1.1,7],document:"DECISION_JOURNAL_LEARNING.md",checkpoints:[Ht("exit","Design the way out","Consider your future buyers, viewing access, unit presentation and the cost of preparing for sale.","exitStrategyPlan resalePreparation","Execution Calibration I: exit strategy and buyer psychology"),Ht("thesis","Commit the hypothesis","Explain why it should work, the strongest concern and the discovery that makes you walk away.","investmentThesis mainConcern killCriterion","Pre-Purchase Thesis; Counter-Thesis; Kill Criteria; Outcome Review")]}];var Md=new Set(["inspectionConcern","professionalConcern","financialConcern","nearTermCommitment"]);function Ad(n,e,t){return String(n?.[t[e]?.scope]?.[e]??"").trim()}function Ba(n,e,t){let i=e.fields.filter(o=>!Md.has(o)&&!Ad(n,o,t)),s=n?.evidence?.[e.id];(!s?.note||String(s.note).trim().length<12)&&i.push("evidenceNote");let r=String(s?.date||""),a=Date.parse(r);return(!/^\d{4}-\d{2}-\d{2}$/.test(r)||!Number.isFinite(a)||new Date(a).toISOString().slice(0,10)!==r||r>new Date().toISOString().slice(0,10))&&i.push("evidenceDate"),i}var bs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},xs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cg=0,ch=1,ug=2;var uh=1,dg=2,Ei=3,oi=0,Yt=1,En=2,Yi=0,zs=1,dh=2,hh=3,ph=4,hg=5,fs=100,pg=101,fg=102,mg=103,gg=104,vg=200,yg=201,bg=202,xg=203,Yl=204,Kl=205,_g=206,Sg=207,wg=208,Eg=209,Mg=210,Ag=211,Tg=212,Cg=213,Rg=214,mc=0,gc=1,vc=2,Gs=3,yc=4,bc=5,xc=6,_c=7,Sc=0,Ig=1,Pg=2,Ki=0,Lg=1,Ng=2,Dg=3,wc=4,Og=5,kg=6,Ug=7,eh="attached",Fg="detached",fh=300,nr=301,ir=302,Ec=303,Mc=304,To=306,ms=1e3,mi=1001,Hr=1002,jt=1003,Ac=1004;var sr=1005;var on=1006,ia=1007;var ui=1008;var di=1009,mh=1010,gh=1011,sa=1012,Tc=1013,_s=1014,Yn=1015,ra=1016,Cc=1017,Rc=1018,aa=1020,vh=35902,yh=35899,bh=1021,xh=1022,On=1023,zr=1026,oa=1027,Ic=1028,Pc=1029,_h=1030,Lc=1031;var Nc=1033,Co=33776,Ro=33777,Io=33778,Po=33779,Dc=35840,Oc=35841,kc=35842,Uc=35843,Fc=36196,Bc=37492,$c=37496,Vc=37808,Hc=37809,zc=37810,Gc=37811,Wc=37812,qc=37813,jc=37814,Xc=37815,Yc=37816,Kc=37817,Jc=37818,Zc=37819,Qc=37820,eu=37821,tu=36492,nu=36494,iu=36495,su=36283,ru=36284,au=36285,ou=36286,Bg=2200,$g=2201,Vg=2202,Ws=2300,qs=2301,Xl=2302,Vs=2400,Hs=2401,Ka=2402,lu=2500,Hg=2501,Sh=0,Lo=1,la=2,zg=3200,Gg=3201;var cu=0,Wg=1,Ji="",At="srgb",Xt="srgb-linear",Ja="linear",ot="srgb";var $s=7680;var th=519,qg=512,jg=513,Xg=514,wh=515,Yg=516,Kg=517,Jg=518,Zg=519,Jl=35044;var Eh="300 es",si=2e3,Za=2001;var li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mm=1234567,Xa=Math.PI/180,js=180/Math.PI;function ai(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function Mh(n,e){return(n%e+e)%e}function Vx(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Hx(n,e,t){return n!==e?(t-n)/(e-n):0}function Ya(n,e,t){return(1-t)*n+t*e}function zx(n,e,t,i){return Ya(n,e,1-Math.exp(-t*i))}function Gx(n,e=1){return e-Math.abs(Mh(n,e*2)-e)}function Wx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function qx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function jx(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Xx(n,e){return n+Math.random()*(e-n)}function Yx(n){return n*(.5-Math.random())}function Kx(n){n!==void 0&&(Mm=n);let e=Mm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Jx(n){return n*Xa}function Zx(n){return n*js}function Qx(n){return(n&n-1)===0&&n!==0}function e0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function t0(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function n0(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),d=a((e+i)/2),u=r((e-i)/2),h=a((e-i)/2),g=r((i-e)/2),v=a((i-e)/2);switch(s){case"XYX":n.set(o*d,l*u,l*h,o*c);break;case"YZY":n.set(l*h,o*d,l*u,o*c);break;case"ZXZ":n.set(l*u,l*h,o*d,o*c);break;case"XZX":n.set(o*d,l*v,l*g,o*c);break;case"YXY":n.set(l*g,o*d,l*v,o*c);break;case"ZYZ":n.set(l*v,l*g,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ii(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function at(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var No={DEG2RAD:Xa,RAD2DEG:js,generateUUID:ai,clamp:Ze,euclideanModulo:Mh,mapLinear:Vx,inverseLerp:Hx,lerp:Ya,damp:zx,pingpong:Gx,smoothstep:Wx,smootherstep:qx,randInt:jx,randFloat:Xx,randFloatSpread:Yx,seededRandom:Kx,degToRad:Jx,radToDeg:Zx,isPowerOfTwo:Qx,ceilPowerOfTwo:e0,floorPowerOfTwo:t0,setQuaternionFromProperEuler:n0,normalize:at,denormalize:ii},Ne=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Gt=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],d=i[s+2],u=i[s+3],h=r[a+0],g=r[a+1],v=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=g,e[t+2]=v,e[t+3]=y;return}if(u!==y||l!==h||c!==g||d!==v){let f=1-o,p=l*h+c*g+d*v+u*y,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let A=Math.sqrt(x),C=Math.atan2(A,p*M);f=Math.sin(f*C)/A,o=Math.sin(o*C)/A}let _=o*M;if(l=l*f+h*_,c=c*f+g*_,d=d*f+v*_,u=u*f+y*_,f===1-o){let A=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=A,c*=A,d*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],u=r[a],h=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+d*u+l*g-c*h,e[t+1]=l*v+d*h+c*u-o*g,e[t+2]=c*v+d*g+o*h-l*u,e[t+3]=d*v-o*u-l*h-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),u=o(r/2),h=l(i/2),g=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*g*v,this._y=c*g*u-h*d*v,this._z=c*d*v+h*g*u,this._w=c*d*u-h*g*v;break;case"YXZ":this._x=h*d*u+c*g*v,this._y=c*g*u-h*d*v,this._z=c*d*v-h*g*u,this._w=c*d*u+h*g*v;break;case"ZXY":this._x=h*d*u-c*g*v,this._y=c*g*u+h*d*v,this._z=c*d*v+h*g*u,this._w=c*d*u-h*g*v;break;case"ZYX":this._x=h*d*u-c*g*v,this._y=c*g*u+h*d*v,this._z=c*d*v-h*g*u,this._w=c*d*u+h*g*v;break;case"YZX":this._x=h*d*u+c*g*v,this._y=c*g*u+h*d*v,this._z=c*d*v-h*g*u,this._w=c*d*u-h*g*v;break;case"XZY":this._x=h*d*u-c*g*v,this._y=c*g*u-h*d*v,this._z=c*d*v+h*g*u,this._w=c*d*u+h*g*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=i+o+u;if(h>0){let g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(d-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(i>o&&i>u){let g=2*Math.sqrt(1+i-o-u);this._w=(d-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>u){let g=2*Math.sqrt(1+o-i-u);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+d)/g}else{let g=2*Math.sqrt(1+u-i-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-i*c,this._z=r*d+a*c+i*l-s*o,this._w=a*d-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let g=1-t;return this._w=g*a+t*this._w,this._x=g*i+t*this._x,this._y=g*s+t*this._y,this._z=g*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=i*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Am.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Am.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*d,this.y=i+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Td.copy(this).projectOnVector(e),this.sub(Td)}reflect(e){return this.sub(Td.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Td=new L,Am=new Gt,je=class n{constructor(e,t,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],g=i[5],v=i[8],y=s[0],f=s[3],p=s[6],M=s[1],x=s[4],_=s[7],A=s[2],C=s[5],I=s[8];return r[0]=a*y+o*M+l*A,r[3]=a*f+o*x+l*C,r[6]=a*p+o*_+l*I,r[1]=c*y+d*M+u*A,r[4]=c*f+d*x+u*C,r[7]=c*p+d*_+u*I,r[2]=h*y+g*M+v*A,r[5]=h*f+g*x+v*C,r[8]=h*p+g*_+v*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,g=c*r-a*l,v=t*u+i*h+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/v;return e[0]=u*y,e[1]=(s*c-d*i)*y,e[2]=(o*i-s*a)*y,e[3]=h*y,e[4]=(d*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=g*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Cd.makeScale(e,t)),this}rotate(e){return this.premultiply(Cd.makeRotation(-e)),this}translate(e,t){return this.premultiply(Cd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Cd=new je;function Ah(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Gr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qg(){let n=Gr("canvas");return n.style.display="block",n}var Tm={};function Wr(n){n in Tm||(Tm[n]=!0,console.warn(n))}function ev(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Cm=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rm=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function i0(){let n={enabled:!0,workingColorSpace:Xt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ot&&(s.r=Gi(s.r),s.g=Gi(s.g),s.b=Gi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(s.r=Vr(s.r),s.g=Vr(s.g),s.b=Vr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ji?Ja:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Wr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Wr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Xt]:{primaries:e,whitePoint:i,transfer:Ja,toXYZ:Cm,fromXYZ:Rm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:Cm,fromXYZ:Rm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),n}var nt=i0();function Gi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Vr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Tr,Zl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Tr===void 0&&(Tr=Gr("canvas")),Tr.width=e.width,Tr.height=e.height;let s=Tr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Tr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Gr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Gi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gi(t[i]/255)*255):t[i]=Gi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},s0=0,qr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Rd(s[a].image)):r.push(Rd(s[a]))}else r=Rd(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Rd(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var r0=0,Id=new L,kt=class n extends li{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=mi,s=mi,r=on,a=ui,o=On,l=di,c=n.DEFAULT_ANISOTROPY,d=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=ai(),this.name="",this.source=new qr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Id).x}get height(){return this.source.getSize(Id).y}get depth(){return this.source.getSize(Id).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ms:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case Hr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ms:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case Hr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=fh;kt.DEFAULT_ANISOTROPY=1;var st=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],g=l[5],v=l[9],y=l[2],f=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-y)<.01&&Math.abs(v-f)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+y)<.1&&Math.abs(v+f)<.1&&Math.abs(c+g+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,_=(g+1)/2,A=(p+1)/2,C=(d+h)/4,I=(u+y)/4,O=(v+f)/4;return x>_&&x>A?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=C/i,r=I/i):_>A?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=C/s,r=O/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=I/r,s=O/r),this.set(i,s,r,t),this}let M=Math.sqrt((f-v)*(f-v)+(u-y)*(u-y)+(h-d)*(h-d));return Math.abs(M)<.001&&(M=1),this.x=(f-v)/M,this.y=(u-y)/M,this.z=(h-d)/M,this.w=Math.acos((c+g+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ql=class extends li{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);let s={width:e,height:t,depth:i.depth},r=new kt(s);this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new qr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vi=class extends Ql{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Qa=class extends kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ec=class extends kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Dn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),El.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),El.copy(i.boundingBox)),El.applyMatrix4(e.matrixWorld),this.union(El)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($a),Ml.subVectors(this.max,$a),Cr.subVectors(e.a,$a),Rr.subVectors(e.b,$a),Ir.subVectors(e.c,$a),os.subVectors(Rr,Cr),ls.subVectors(Ir,Rr),ks.subVectors(Cr,Ir);let t=[0,-os.z,os.y,0,-ls.z,ls.y,0,-ks.z,ks.y,os.z,0,-os.x,ls.z,0,-ls.x,ks.z,0,-ks.x,-os.y,os.x,0,-ls.y,ls.x,0,-ks.y,ks.x,0];return!Pd(t,Cr,Rr,Ir,Ml)||(t=[1,0,0,0,1,0,0,0,1],!Pd(t,Cr,Rr,Ir,Ml))?!1:(Al.crossVectors(os,ls),t=[Al.x,Al.y,Al.z],Pd(t,Cr,Rr,Ir,Ml))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Fi=[new L,new L,new L,new L,new L,new L,new L,new L],ei=new L,El=new Dn,Cr=new L,Rr=new L,Ir=new L,os=new L,ls=new L,ks=new L,$a=new L,Ml=new L,Al=new L,Us=new L;function Pd(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Us.fromArray(n,r);let o=s.x*Math.abs(Us.x)+s.y*Math.abs(Us.y)+s.z*Math.abs(Us.z),l=e.dot(Us),c=t.dot(Us),d=i.dot(Us);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var a0=new Dn,Va=new L,Ld=new L,_n=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):a0.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Va.subVectors(e,this.center);let t=Va.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Va,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ld.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Va.copy(e.center).add(Ld)),this.expandByPoint(Va.copy(e.center).sub(Ld))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Bi=new L,Nd=new L,Tl=new L,cs=new L,Dd=new L,Cl=new L,Od=new L,yi=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Nd.copy(e).add(t).multiplyScalar(.5),Tl.copy(t).sub(e).normalize(),cs.copy(this.origin).sub(Nd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Tl),o=cs.dot(this.direction),l=-cs.dot(Tl),c=cs.lengthSq(),d=Math.abs(1-a*a),u,h,g,v;if(d>0)if(u=a*l-o,h=a*o-l,v=r*d,u>=0)if(h>=-v)if(h<=v){let y=1/d;u*=y,h*=y,g=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),g=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),g=-u*u+h*(h+2*l)+c;else h<=-v?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),g=-u*u+h*(h+2*l)+c):h<=v?(u=0,h=Math.min(Math.max(-r,-l),r),g=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),g=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),g=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Nd).addScaledVector(Tl,h),g}intersectSphere(e,t){Bi.subVectors(e.center,this.origin);let i=Bi.dot(this.direction),s=Bi.dot(Bi)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,i,s,r){Dd.subVectors(t,e),Cl.subVectors(i,e),Od.crossVectors(Dd,Cl);let a=this.direction.dot(Od),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;cs.subVectors(this.origin,e);let l=o*this.direction.dot(Cl.crossVectors(cs,Cl));if(l<0)return null;let c=o*this.direction.dot(Dd.cross(cs));if(c<0||l+c>a)return null;let d=-o*cs.dot(Od);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qe=class n{constructor(e,t,i,s,r,a,o,l,c,d,u,h,g,v,y,f){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,d,u,h,g,v,y,f)}set(e,t,i,s,r,a,o,l,c,d,u,h,g,v,y,f){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=g,p[7]=v,p[11]=y,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/Pr.setFromMatrixColumn(e,0).length(),r=1/Pr.setFromMatrixColumn(e,1).length(),a=1/Pr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let h=a*d,g=a*u,v=o*d,y=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=g+v*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*d,g=l*u,v=c*d,y=c*u;t[0]=h+y*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=g*o-v,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*d,g=l*u,v=c*d,y=c*u;t[0]=h-y*o,t[4]=-a*u,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*d,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*d,g=a*u,v=o*d,y=o*u;t[0]=l*d,t[4]=v*c-g,t[8]=h*c+y,t[1]=l*u,t[5]=y*c+h,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,g=a*c,v=o*l,y=o*c;t[0]=l*d,t[4]=y-h*u,t[8]=v*u+g,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=g*u+v,t[10]=h-y*u}else if(e.order==="XZY"){let h=a*l,g=a*c,v=o*l,y=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+y,t[5]=a*d,t[9]=g*u-v,t[2]=v*u-g,t[6]=o*d,t[10]=y*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(o0,e,l0)}lookAt(e,t,i){let s=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),us.crossVectors(i,Ln),us.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),us.crossVectors(i,Ln)),us.normalize(),Rl.crossVectors(Ln,us),s[0]=us.x,s[4]=Rl.x,s[8]=Ln.x,s[1]=us.y,s[5]=Rl.y,s[9]=Ln.y,s[2]=us.z,s[6]=Rl.z,s[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],g=i[13],v=i[2],y=i[6],f=i[10],p=i[14],M=i[3],x=i[7],_=i[11],A=i[15],C=s[0],I=s[4],O=s[8],E=s[12],w=s[1],P=s[5],B=s[9],q=s[13],G=s[2],J=s[6],Y=s[10],ie=s[14],W=s[3],ce=s[7],N=s[11],V=s[15];return r[0]=a*C+o*w+l*G+c*W,r[4]=a*I+o*P+l*J+c*ce,r[8]=a*O+o*B+l*Y+c*N,r[12]=a*E+o*q+l*ie+c*V,r[1]=d*C+u*w+h*G+g*W,r[5]=d*I+u*P+h*J+g*ce,r[9]=d*O+u*B+h*Y+g*N,r[13]=d*E+u*q+h*ie+g*V,r[2]=v*C+y*w+f*G+p*W,r[6]=v*I+y*P+f*J+p*ce,r[10]=v*O+y*B+f*Y+p*N,r[14]=v*E+y*q+f*ie+p*V,r[3]=M*C+x*w+_*G+A*W,r[7]=M*I+x*P+_*J+A*ce,r[11]=M*O+x*B+_*Y+A*N,r[15]=M*E+x*q+_*ie+A*V,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],g=e[14],v=e[3],y=e[7],f=e[11],p=e[15];return v*(+r*l*u-s*c*u-r*o*h+i*c*h+s*o*g-i*l*g)+y*(+t*l*g-t*c*h+r*a*h-s*a*g+s*c*d-r*l*d)+f*(+t*c*u-t*o*g-r*a*u+i*a*g+r*o*d-i*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-i*a*h+i*l*d)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],g=e[11],v=e[12],y=e[13],f=e[14],p=e[15],M=u*f*c-y*h*c+y*l*g-o*f*g-u*l*p+o*h*p,x=v*h*c-d*f*c-v*l*g+a*f*g+d*l*p-a*h*p,_=d*y*c-v*u*c+v*o*g-a*y*g-d*o*p+a*u*p,A=v*u*l-d*y*l-v*o*h+a*y*h+d*o*f-a*u*f,C=t*M+i*x+s*_+r*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/C;return e[0]=M*I,e[1]=(y*h*r-u*f*r-y*s*g+i*f*g+u*s*p-i*h*p)*I,e[2]=(o*f*r-y*l*r+y*s*c-i*f*c-o*s*p+i*l*p)*I,e[3]=(u*l*r-o*h*r-u*s*c+i*h*c+o*s*g-i*l*g)*I,e[4]=x*I,e[5]=(d*f*r-v*h*r+v*s*g-t*f*g-d*s*p+t*h*p)*I,e[6]=(v*l*r-a*f*r-v*s*c+t*f*c+a*s*p-t*l*p)*I,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*g+t*l*g)*I,e[8]=_*I,e[9]=(v*u*r-d*y*r-v*i*g+t*y*g+d*i*p-t*u*p)*I,e[10]=(a*y*r-v*o*r+v*i*c-t*y*c-a*i*p+t*o*p)*I,e[11]=(d*o*r-a*u*r-d*i*c+t*u*c+a*i*g-t*o*g)*I,e[12]=A*I,e[13]=(d*y*s-v*u*s+v*i*h-t*y*h-d*i*f+t*u*f)*I,e[14]=(v*o*s-a*y*s-v*i*l+t*y*l+a*i*f-t*o*f)*I,e[15]=(a*u*s-d*o*s+d*i*l-t*u*l-a*i*h+t*o*h)*I,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,g=r*d,v=r*u,y=a*d,f=a*u,p=o*u,M=l*c,x=l*d,_=l*u,A=i.x,C=i.y,I=i.z;return s[0]=(1-(y+p))*A,s[1]=(g+_)*A,s[2]=(v-x)*A,s[3]=0,s[4]=(g-_)*C,s[5]=(1-(h+p))*C,s[6]=(f+M)*C,s[7]=0,s[8]=(v+x)*I,s[9]=(f-M)*I,s[10]=(1-(h+y))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=Pr.set(s[0],s[1],s[2]).length(),a=Pr.set(s[4],s[5],s[6]).length(),o=Pr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ti.copy(this);let c=1/r,d=1/a,u=1/o;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=d,ti.elements[5]*=d,ti.elements[6]*=d,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,t.setFromRotationMatrix(ti),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=si,l=!1){let c=this.elements,d=2*r/(t-e),u=2*r/(i-s),h=(t+e)/(t-e),g=(i+s)/(i-s),v,y;if(l)v=r/(a-r),y=a*r/(a-r);else if(o===si)v=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Za)v=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=si,l=!1){let c=this.elements,d=2/(t-e),u=2/(i-s),h=-(t+e)/(t-e),g=-(i+s)/(i-s),v,y;if(l)v=1/(a-r),y=a/(a-r);else if(o===si)v=-2/(a-r),y=-(a+r)/(a-r);else if(o===Za)v=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Pr=new L,ti=new qe,o0=new L(0,0,0),l0=new L(1,1,1),us=new L,Rl=new L,Ln=new L,Im=new qe,Pm=new Gt,Xn=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Im.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Im,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pm.setFromEuler(this),this.setFromQuaternion(Pm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xn.DEFAULT_ORDER="XYZ";var jr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},c0=0,Lm=new L,Lr=new Gt,$i=new qe,Il=new L,Ha=new L,u0=new L,d0=new Gt,Nm=new L(1,0,0),Dm=new L(0,1,0),Om=new L(0,0,1),km={type:"added"},h0={type:"removed"},Nr={type:"childadded",child:null},kd={type:"childremoved",child:null},mt=class n extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new L,t=new Xn,i=new Gt,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new je}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Lr.setFromAxisAngle(e,t),this.quaternion.multiply(Lr),this}rotateOnWorldAxis(e,t){return Lr.setFromAxisAngle(e,t),this.quaternion.premultiply(Lr),this}rotateX(e){return this.rotateOnAxis(Nm,e)}rotateY(e){return this.rotateOnAxis(Dm,e)}rotateZ(e){return this.rotateOnAxis(Om,e)}translateOnAxis(e,t){return Lm.copy(e).applyQuaternion(this.quaternion),this.position.add(Lm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nm,e)}translateY(e){return this.translateOnAxis(Dm,e)}translateZ(e){return this.translateOnAxis(Om,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($i.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Il.copy(e):Il.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$i.lookAt(Ha,Il,this.up):$i.lookAt(Il,Ha,this.up),this.quaternion.setFromRotationMatrix($i),s&&($i.extractRotation(s.matrixWorld),Lr.setFromRotationMatrix($i),this.quaternion.premultiply(Lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(km),Nr.child=e,this.dispatchEvent(Nr),Nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(h0),kd.child=e,this.dispatchEvent(kd),kd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$i.multiply(e.parent.matrixWorld)),e.applyMatrix4($i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(km),Nr.child=e,this.dispatchEvent(Nr),Nr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,e,u0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,d0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};mt.DEFAULT_UP=new L(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ni=new L,Vi=new L,Ud=new L,Hi=new L,Dr=new L,Or=new L,Um=new L,Fd=new L,Bd=new L,$d=new L,Vd=new st,Hd=new st,zd=new st,ps=class n{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ni.subVectors(e,t),s.cross(ni);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ni.subVectors(s,t),Vi.subVectors(i,t),Ud.subVectors(e,t);let a=ni.dot(ni),o=ni.dot(Vi),l=ni.dot(Ud),c=Vi.dot(Vi),d=Vi.dot(Ud),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let h=1/u,g=(c*l-o*d)*h,v=(a*d-o*l)*h;return r.set(1-g-v,v,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Hi)===null?!1:Hi.x>=0&&Hi.y>=0&&Hi.x+Hi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hi.x),l.addScaledVector(a,Hi.y),l.addScaledVector(o,Hi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Vd.setScalar(0),Hd.setScalar(0),zd.setScalar(0),Vd.fromBufferAttribute(e,t),Hd.fromBufferAttribute(e,i),zd.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Vd,r.x),a.addScaledVector(Hd,r.y),a.addScaledVector(zd,r.z),a}static isFrontFacing(e,t,i,s){return ni.subVectors(i,t),Vi.subVectors(e,t),ni.cross(Vi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ni.subVectors(this.c,this.b),Vi.subVectors(this.a,this.b),ni.cross(Vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Dr.subVectors(s,i),Or.subVectors(r,i),Fd.subVectors(e,i);let l=Dr.dot(Fd),c=Or.dot(Fd);if(l<=0&&c<=0)return t.copy(i);Bd.subVectors(e,s);let d=Dr.dot(Bd),u=Or.dot(Bd);if(d>=0&&u<=d)return t.copy(s);let h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(Dr,a);$d.subVectors(e,r);let g=Dr.dot($d),v=Or.dot($d);if(v>=0&&g<=v)return t.copy(r);let y=g*c-l*v;if(y<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Or,o);let f=d*v-g*u;if(f<=0&&u-d>=0&&g-v>=0)return Um.subVectors(r,s),o=(u-d)/(u-d+(g-v)),t.copy(s).addScaledVector(Um,o);let p=1/(f+y+h);return a=y*p,o=h*p,t.copy(i).addScaledVector(Dr,a).addScaledVector(Or,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},tv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ds={h:0,s:0,l:0},Pl={h:0,s:0,l:0};function Gd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var ke=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=i,nt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=nt.workingColorSpace){if(e=Mh(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Gd(a,r,e+1/3),this.g=Gd(a,r,e),this.b=Gd(a,r,e-1/3)}return nt.colorSpaceToWorking(this,s),this}setStyle(e,t=At){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){let i=tv[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=Vr(e.r),this.g=Vr(e.g),this.b=Vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return nt.workingToColorSpace(en.copy(this),e),Math.round(Ze(en.r*255,0,255))*65536+Math.round(Ze(en.g*255,0,255))*256+Math.round(Ze(en.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(en.copy(this),t);let i=en.r,s=en.g,r=en.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=At){nt.workingToColorSpace(en.copy(this),e);let t=en.r,i=en.g,s=en.b;return e!==At?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ds),this.setHSL(ds.h+e,ds.s+t,ds.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ds),e.getHSL(Pl);let i=Ya(ds.h,Pl.h,t),s=Ya(ds.s,Pl.s,t),r=Ya(ds.l,Pl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new ke;ke.NAMES=tv;var p0=0,ln=class extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:p0++}),this.uuid=ai(),this.name="",this.type="Material",this.blending=zs,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yl,this.blendDst=Kl,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=th,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$s,this.stencilZFail=$s,this.stencilZPass=$s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==zs&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Yl&&(i.blendSrc=this.blendSrc),this.blendDst!==Kl&&(i.blendDst=this.blendDst),this.blendEquation!==fs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==th&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$s&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$s&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$s&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},cn=class extends ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var It=new L,Ll=new Ne,f0=0,Lt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:f0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Jl,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ll.fromBufferAttribute(this,t),Ll.applyMatrix3(e),this.setXY(t,Ll.x,Ll.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ii(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jl&&(e.usage=this.usage),e}};var eo=class extends Lt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var to=class extends Lt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ot=class extends Lt{constructor(e,t,i){super(new Float32Array(e),t,i)}},m0=0,qn=new qe,Wd=new mt,kr=new L,Nn=new Dn,za=new Dn,zt=new L,un=class n extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ah(e)?to:eo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,i){return qn.makeTranslation(e,t,i),this.applyMatrix4(qn),this}scale(e,t,i){return qn.makeScale(e,t,i),this.applyMatrix4(qn),this}lookAt(e){return Wd.lookAt(e),Wd.updateMatrix(),this.applyMatrix4(Wd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kr).negate(),this.translate(kr.x,kr.y,kr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ot(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];za.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(Nn.min,za.min),Nn.expandByPoint(zt),zt.addVectors(Nn.max,za.max),Nn.expandByPoint(zt)):(Nn.expandByPoint(za.min),Nn.expandByPoint(za.max))}Nn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(zt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)zt.fromBufferAttribute(o,c),l&&(kr.fromBufferAttribute(e,c),zt.add(kr)),s=Math.max(s,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<i.count;O++)o[O]=new L,l[O]=new L;let c=new L,d=new L,u=new L,h=new Ne,g=new Ne,v=new Ne,y=new L,f=new L;function p(O,E,w){c.fromBufferAttribute(i,O),d.fromBufferAttribute(i,E),u.fromBufferAttribute(i,w),h.fromBufferAttribute(r,O),g.fromBufferAttribute(r,E),v.fromBufferAttribute(r,w),d.sub(c),u.sub(c),g.sub(h),v.sub(h);let P=1/(g.x*v.y-v.x*g.y);isFinite(P)&&(y.copy(d).multiplyScalar(v.y).addScaledVector(u,-g.y).multiplyScalar(P),f.copy(u).multiplyScalar(g.x).addScaledVector(d,-v.x).multiplyScalar(P),o[O].add(y),o[E].add(y),o[w].add(y),l[O].add(f),l[E].add(f),l[w].add(f))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let O=0,E=M.length;O<E;++O){let w=M[O],P=w.start,B=w.count;for(let q=P,G=P+B;q<G;q+=3)p(e.getX(q+0),e.getX(q+1),e.getX(q+2))}let x=new L,_=new L,A=new L,C=new L;function I(O){A.fromBufferAttribute(s,O),C.copy(A);let E=o[O];x.copy(E),x.sub(A.multiplyScalar(A.dot(E))).normalize(),_.crossVectors(C,E);let P=_.dot(l[O])<0?-1:1;a.setXYZW(O,x.x,x.y,x.z,P)}for(let O=0,E=M.length;O<E;++O){let w=M[O],P=w.start,B=w.count;for(let q=P,G=P+B;q<G;q+=3)I(e.getX(q+0)),I(e.getX(q+1)),I(e.getX(q+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,d=new L,u=new L;if(e)for(let h=0,g=e.count;h<g;h+=3){let v=e.getX(h+0),y=e.getX(h+1),f=e.getX(h+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,f),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,f),o.add(d),l.add(d),c.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let h=0,g=t.count;h<g;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){let c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d),g=0,v=0;for(let y=0,f=l.length;y<f;y++){o.isInterleavedBufferAttribute?g=l[y]*o.data.stride+o.offset:g=l[y]*d;for(let p=0;p<d;p++)h[v++]=c[g++]}return new Lt(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){let h=c[d],g=e(h,i);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){let g=c[u];d.push(g.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(t))}let r=e.morphAttributes;for(let c in r){let d=[],u=r[c];for(let h=0,g=u.length;h<g;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,d=a.length;c<d;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fm=new qe,Fs=new yi,Nl=new _n,Bm=new L,Dl=new L,Ol=new L,kl=new L,qd=new L,Ul=new L,$m=new L,Fl=new L,lt=class extends mt{constructor(e=new un,t=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ul.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=o[l],u=r[l];d!==0&&(qd.fromBufferAttribute(u,e),a?Ul.addScaledVector(qd,d):Ul.addScaledVector(qd.sub(t),d))}t.add(Ul)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Nl.copy(i.boundingSphere),Nl.applyMatrix4(r),Fs.copy(e.ray).recast(e.near),!(Nl.containsPoint(Fs.origin)===!1&&(Fs.intersectSphere(Nl,Bm)===null||Fs.origin.distanceToSquared(Bm)>(e.far-e.near)**2))&&(Fm.copy(r).invert(),Fs.copy(e.ray).applyMatrix4(Fm),!(i.boundingBox!==null&&Fs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fs)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,y=h.length;v<y;v++){let f=h[v],p=a[f.materialIndex],M=Math.max(f.start,g.start),x=Math.min(o.count,Math.min(f.start+f.count,g.start+g.count));for(let _=M,A=x;_<A;_+=3){let C=o.getX(_),I=o.getX(_+1),O=o.getX(_+2);s=Bl(this,p,e,i,c,d,u,C,I,O),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),y=Math.min(o.count,g.start+g.count);for(let f=v,p=y;f<p;f+=3){let M=o.getX(f),x=o.getX(f+1),_=o.getX(f+2);s=Bl(this,a,e,i,c,d,u,M,x,_),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,y=h.length;v<y;v++){let f=h[v],p=a[f.materialIndex],M=Math.max(f.start,g.start),x=Math.min(l.count,Math.min(f.start+f.count,g.start+g.count));for(let _=M,A=x;_<A;_+=3){let C=_,I=_+1,O=_+2;s=Bl(this,p,e,i,c,d,u,C,I,O),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),y=Math.min(l.count,g.start+g.count);for(let f=v,p=y;f<p;f+=3){let M=f,x=f+1,_=f+2;s=Bl(this,a,e,i,c,d,u,M,x,_),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}};function g0(n,e,t,i,s,r,a,o){let l;if(e.side===Yt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===oi,o),l===null)return null;Fl.copy(o),Fl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Fl);return c<t.near||c>t.far?null:{distance:c,point:Fl.clone(),object:n}}function Bl(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Dl),n.getVertexPosition(l,Ol),n.getVertexPosition(c,kl);let d=g0(n,e,t,i,Dl,Ol,kl,$m);if(d){let u=new L;ps.getBarycoord($m,Dl,Ol,kl,u),s&&(d.uv=ps.getInterpolatedAttribute(s,o,l,c,u,new Ne)),r&&(d.uv1=ps.getInterpolatedAttribute(r,o,l,c,u,new Ne)),a&&(d.normal=ps.getInterpolatedAttribute(a,o,l,c,u,new L),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new L,materialIndex:0};ps.getNormal(Dl,Ol,kl,h.normal),d.face=h,d.barycoord=u}return d}var gs=class n extends un{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],d=[],u=[],h=0,g=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(u,2));function v(y,f,p,M,x,_,A,C,I,O,E){let w=_/I,P=A/O,B=_/2,q=A/2,G=C/2,J=I+1,Y=O+1,ie=0,W=0,ce=new L;for(let N=0;N<Y;N++){let V=N*P-q;for(let te=0;te<J;te++){let ue=te*w-B;ce[y]=ue*M,ce[f]=V*x,ce[p]=G,c.push(ce.x,ce.y,ce.z),ce[y]=0,ce[f]=0,ce[p]=C>0?1:-1,d.push(ce.x,ce.y,ce.z),u.push(te/I),u.push(1-N/O),ie+=1}}for(let N=0;N<O;N++)for(let V=0;V<I;V++){let te=h+V+J*N,ue=h+V+J*(N+1),Me=h+(V+1)+J*(N+1),ve=h+(V+1)+J*N;l.push(te,ue,ve),l.push(ue,Me,ve),W+=6}o.addGroup(g,W,E),g+=W,h+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function rr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function tn(n){let e={};for(let t=0;t<n.length;t++){let i=rr(n[t]);for(let s in i)e[s]=i[s]}return e}function v0(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Th(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var nv={clone:rr,merge:tn},y0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,b0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ci=class extends ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=y0,this.fragmentShader=b0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=v0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},no=class extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},hs=new L,Vm=new Ne,Hm=new Ne,Pt=class extends no{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=js*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Xa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return js*2*Math.atan(Math.tan(Xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hs.x,hs.y).multiplyScalar(-e/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hs.x,hs.y).multiplyScalar(-e/hs.z)}getViewSize(e,t){return this.getViewBounds(e,Vm,Hm),t.subVectors(Hm,Vm)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Xa*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ur=-90,Fr=1,tc=class extends mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Pt(Ur,Fr,e,t);s.layers=this.layers,this.add(s);let r=new Pt(Ur,Fr,e,t);r.layers=this.layers,this.add(r);let a=new Pt(Ur,Fr,e,t);a.layers=this.layers,this.add(a);let o=new Pt(Ur,Fr,e,t);o.layers=this.layers,this.add(o);let l=new Pt(Ur,Fr,e,t);l.layers=this.layers,this.add(l);let c=new Pt(Ur,Fr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Za)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,s),e.render(t,d),e.setRenderTarget(u,h,g),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},io=class extends kt{constructor(e=[],t=nr,i,s,r,a,o,l,c,d){super(e,t,i,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},nc=class extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new io(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new gs(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yt,blending:Yi});r.uniforms.tEquirect.value=t;let a=new lt(s,r),o=t.minFilter;return t.minFilter===ui&&(t.minFilter=on),new tc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},ri=class extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},x0={type:"move"},Xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let f=t.getJointPose(y,i),p=this._getHandJoint(c,y);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}let d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),g=.02,v=.005;c.inputState.pinching&&h>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(x0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ri;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var Xs=class extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Yr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Jl,this.updateRanges=[],this.version=0,this.uuid=ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},an=new L,Kr=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ii(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ii(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ii(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ii(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ii(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var zm=new L,Gm=new st,Wm=new st,_0=new L,qm=new qe,$l=new L,jd=new _n,jm=new qe,Xd=new yi,so=class extends lt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=eh,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Dn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,$l),this.boundingBox.expandByPoint($l)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new _n),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,$l),this.boundingSphere.expandByPoint($l)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jd.copy(this.boundingSphere),jd.applyMatrix4(s),e.ray.intersectsSphere(jd)!==!1&&(jm.copy(s).invert(),Xd.copy(e.ray).applyMatrix4(jm),!(this.boundingBox!==null&&Xd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Xd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new st,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===eh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Fg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,s=this.geometry;Gm.fromBufferAttribute(s.attributes.skinIndex,e),Wm.fromBufferAttribute(s.attributes.skinWeight,e),zm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Wm.getComponent(r);if(a!==0){let o=Gm.getComponent(r);qm.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(_0.copy(zm).applyMatrix4(qm),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Jr=class extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ro=class extends kt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=jt,d=jt,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xm=new qe,S0=new qe,ao=class n{constructor(e=[],t=[]){this.uuid=ai(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new qe;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:S0;Xm.multiplyMatrices(o,t[r]),Xm.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new ro(t,e,e,On,Yn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){let r=e.bones[i],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Jr),this.bones.push(a),this.boneInverses.push(new qe().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=i[s];e.boneInverses.push(o.toArray())}return e}},vs=class extends Lt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Br=new qe,Ym=new qe,Vl=[],Km=new Dn,w0=new qe,Ga=new lt,Wa=new _n,Ys=class extends lt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,w0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Dn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Br),Km.copy(e.boundingBox).applyMatrix4(Br),this.boundingBox.union(Km)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _n),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Br),Wa.copy(e.boundingSphere).applyMatrix4(Br),this.boundingSphere.union(Wa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(Ga.geometry=this.geometry,Ga.material=this.material,Ga.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wa.copy(this.boundingSphere),Wa.applyMatrix4(i),e.ray.intersectsSphere(Wa)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Br),Ym.multiplyMatrices(i,Br),Ga.matrixWorld=Ym,Ga.raycast(e,Vl);for(let a=0,o=Vl.length;a<o;a++){let l=Vl[a];l.instanceId=r,l.object=this,t.push(l)}Vl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new vs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ro(new Float32Array(s*this.count),s,this.count,Ic,Yn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Yd=new L,E0=new L,M0=new je,jn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Yd.subVectors(i,t).cross(E0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Yd),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||M0.getNormalMatrix(e),s=this.coplanarPoint(Yd).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bs=new _n,A0=new Ne(.5,.5),Hl=new L,Zr=class{constructor(e=new jn,t=new jn,i=new jn,s=new jn,r=new jn,a=new jn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=si,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],g=r[7],v=r[8],y=r[9],f=r[10],p=r[11],M=r[12],x=r[13],_=r[14],A=r[15];if(s[0].setComponents(c-a,g-d,p-v,A-M).normalize(),s[1].setComponents(c+a,g+d,p+v,A+M).normalize(),s[2].setComponents(c+o,g+u,p+y,A+x).normalize(),s[3].setComponents(c-o,g-u,p-y,A-x).normalize(),i)s[4].setComponents(l,h,f,_).normalize(),s[5].setComponents(c-l,g-h,p-f,A-_).normalize();else if(s[4].setComponents(c-l,g-h,p-f,A-_).normalize(),t===si)s[5].setComponents(c+l,g+h,p+f,A+_).normalize();else if(t===Za)s[5].setComponents(l,h,f,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bs)}intersectsSprite(e){Bs.center.set(0,0,0);let t=A0.distanceTo(e.center);return Bs.radius=.7071067811865476+t,Bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bs)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Hl.x=s.normal.x>0?e.max.x:e.min.x,Hl.y=s.normal.y>0?e.max.y:e.min.y,Hl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Hl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Qr=class extends ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ic=new L,sc=new L,Jm=new qe,qa=new yi,zl=new _n,Kd=new L,Zm=new L,Ks=class extends mt{constructor(e=new un,t=new Qr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ic.fromBufferAttribute(t,s-1),sc.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ic.distanceTo(sc);e.setAttribute("lineDistance",new Ot(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zl.copy(i.boundingSphere),zl.applyMatrix4(s),zl.radius+=r,e.ray.intersectsSphere(zl)===!1)return;Jm.copy(s).invert(),qa.copy(e.ray).applyMatrix4(Jm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){let g=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let y=g,f=v-1;y<f;y+=c){let p=d.getX(y),M=d.getX(y+1),x=Gl(this,e,qa,l,p,M,y);x&&t.push(x)}if(this.isLineLoop){let y=d.getX(v-1),f=d.getX(g),p=Gl(this,e,qa,l,y,f,v-1);p&&t.push(p)}}else{let g=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let y=g,f=v-1;y<f;y+=c){let p=Gl(this,e,qa,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=Gl(this,e,qa,l,v-1,g,v-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gl(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(ic.fromBufferAttribute(o,s),sc.fromBufferAttribute(o,r),t.distanceSqToSegment(ic,sc,Kd,Zm)>i)return;Kd.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Kd);if(!(c<e.near||c>e.far))return{distance:c,point:Zm.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Qm=new L,eg=new L,oo=class extends Ks{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Qm.fromBufferAttribute(t,s),eg.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Qm.distanceTo(eg);e.setAttribute("lineDistance",new Ot(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},lo=class extends Ks{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ea=class extends ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},tg=new qe,nh=new yi,Wl=new _n,ql=new L,co=class extends mt{constructor(e=new un,t=new ea){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wl.copy(i.boundingSphere),Wl.applyMatrix4(s),Wl.radius+=r,e.ray.intersectsSphere(Wl)===!1)return;tg.copy(s).invert(),nh.copy(e.ray).applyMatrix4(tg);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let v=h,y=g;v<y;v++){let f=c.getX(v);ql.fromBufferAttribute(u,f),ng(ql,f,l,s,e,t,this)}}else{let h=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=h,y=g;v<y;v++)ql.fromBufferAttribute(u,v),ng(ql,v,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ng(n,e,t,i,s,r,a){let o=nh.distanceSqToPoint(n);if(o<t){let l=new L;nh.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var uo=class extends kt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ho=class extends kt{constructor(e,t,i=_s,s,r,a,o=jt,l=jt,c,d=zr,u=1){if(d!==zr&&d!==oa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:u};super(h,s,r,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},po=class extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var fo=class n extends un{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let d=[],u=[],h=[],g=[],v=0,y=[],f=i/2,p=0;M(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new Ot(u,3)),this.setAttribute("normal",new Ot(h,3)),this.setAttribute("uv",new Ot(g,2));function M(){let _=new L,A=new L,C=0,I=(t-e)/i;for(let O=0;O<=r;O++){let E=[],w=O/r,P=w*(t-e)+e;for(let B=0;B<=s;B++){let q=B/s,G=q*l+o,J=Math.sin(G),Y=Math.cos(G);A.x=P*J,A.y=-w*i+f,A.z=P*Y,u.push(A.x,A.y,A.z),_.set(J,I,Y).normalize(),h.push(_.x,_.y,_.z),g.push(q,1-w),E.push(v++)}y.push(E)}for(let O=0;O<s;O++)for(let E=0;E<r;E++){let w=y[E][O],P=y[E+1][O],B=y[E+1][O+1],q=y[E][O+1];(e>0||E!==0)&&(d.push(w,P,q),C+=3),(t>0||E!==r-1)&&(d.push(P,B,q),C+=3)}c.addGroup(p,C,0),p+=C}function x(_){let A=v,C=new Ne,I=new L,O=0,E=_===!0?e:t,w=_===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,f*w,0),h.push(0,w,0),g.push(.5,.5),v++;let P=v;for(let B=0;B<=s;B++){let G=B/s*l+o,J=Math.cos(G),Y=Math.sin(G);I.x=E*Y,I.y=f*w,I.z=E*J,u.push(I.x,I.y,I.z),h.push(0,w,0),C.x=J*.5+.5,C.y=Y*.5*w+.5,g.push(C.x,C.y),v++}for(let B=0;B<s;B++){let q=A+B,G=P+B;_===!0?d.push(G,G+1,q):d.push(G+1,G,q),O+=3}c.addGroup(p,O,_===!0?1:2),p+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Js=class n extends un{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,g=[],v=[],y=[],f=[];for(let p=0;p<d;p++){let M=p*h-a;for(let x=0;x<c;x++){let _=x*u-r;v.push(_,-M,0),y.push(0,0,1),f.push(x/o),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let x=M+c*p,_=M+c*(p+1),A=M+1+c*(p+1),C=M+1+c*p;g.push(x,_,C),g.push(_,A,C)}this.setIndex(g),this.setAttribute("position",new Ot(v,3)),this.setAttribute("normal",new Ot(y,3)),this.setAttribute("uv",new Ot(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},mo=class n extends un{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],d=[],u=e,h=(t-e)/s,g=new L,v=new Ne;for(let y=0;y<=s;y++){for(let f=0;f<=i;f++){let p=r+f/i*a;g.x=u*Math.cos(p),g.y=u*Math.sin(p),l.push(g.x,g.y,g.z),c.push(0,0,1),v.x=(g.x/t+1)/2,v.y=(g.y/t+1)/2,d.push(v.x,v.y)}u+=h}for(let y=0;y<s;y++){let f=y*(i+1);for(let p=0;p<i;p++){let M=p+f,x=M,_=M+i+1,A=M+i+2,C=M+1;o.push(x,_,C),o.push(_,A,C)}}this.setIndex(o),this.setAttribute("position",new Ot(l,3)),this.setAttribute("normal",new Ot(c,3)),this.setAttribute("uv",new Ot(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var bi=class extends ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cu,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Sn=class extends bi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ke(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var go=class extends ln{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cu,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},rc=class extends ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ac=class extends ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function jl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function T0(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function C0(n){function e(s,r){return n[s]-n[r]}let t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function ig(n,e,t){let i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function iv(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}var Wi=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break t}a=i,i=0;break n}break e}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},oc=class extends Wi{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vs,endingEnd:Vs}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Hs:r=e,o=2*t-i;break;case Ka:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Hs:a=e,l=2*i-t;break;case Ka:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,g=this._weightNext,v=(i-t)/(s-t),y=v*v,f=y*v,p=-h*f+2*h*y-h*v,M=(1+h)*f+(-1.5-2*h)*y+(-.5+h)*v+1,x=(-1-g)*f+(1.5+g)*y+.5*v,_=g*f-g*y;for(let A=0;A!==o;++A)r[A]=p*a[d+A]+M*a[c+A]+x*a[l+A]+_*a[u+A];return r}},vo=class extends Wi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(i-t)/(s-t),u=1-d;for(let h=0;h!==o;++h)r[h]=a[c+h]*u+a[l+h]*d;return r}},lc=class extends Wi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},wn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=jl(t,this.TimeBufferType),this.values=jl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:jl(e.times,Array),values:jl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new lc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new oc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ws:t=this.InterpolantFactoryMethodDiscrete;break;case qs:t=this.InterpolantFactoryMethodLinear;break;case Xl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ws;case this.InterpolantFactoryMethodLinear:return qs;case this.InterpolantFactoryMethodSmooth:return Xl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&T0(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Xl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{let u=o*i,h=u-i,g=u+i;for(let v=0;v!==i;++v){let y=t[u+v];if(y!==t[h+v]||y!==t[g+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*i,h=a*i;for(let g=0;g!==i;++g)t[h+g]=t[u+g]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=qs;var qi=class extends wn{constructor(e,t,i){super(e,t,i)}};qi.prototype.ValueTypeName="bool";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=Ws;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;var yo=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};yo.prototype.ValueTypeName="color";var xi=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};xi.prototype.ValueTypeName="number";var cc=class extends Wi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let d=c+o;c!==d;c+=4)Gt.slerpFlat(r,0,a,c-o,a,c,l);return r}},_i=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new cc(this.times,this.values,this.getValueSize(),e)}};_i.prototype.ValueTypeName="quaternion";_i.prototype.InterpolantFactoryMethodSmooth=void 0;var ji=class extends wn{constructor(e,t,i){super(e,t,i)}};ji.prototype.ValueTypeName="string";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=Ws;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;var Si=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};Si.prototype.ValueTypeName="vector";var Zs=class{constructor(e="",t=-1,i=[],s=lu){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=ai(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(I0(i[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(wn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let d=C0(l);l=ig(l,1,d),c=ig(c,1,d),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new xi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],d=c.name.match(r);if(d&&d.length>1){let u=d[1],h=s[u];h||(s[u]=h=[]),h.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(u,h,g,v,y){if(g.length!==0){let f=[],p=[];iv(g,f,p,v),f.length!==0&&y.push(new u(h,f,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let h=c[u].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let g={},v;for(v=0;v<h.length;v++)if(h[v].morphTargets)for(let y=0;y<h[v].morphTargets.length;y++)g[h[v].morphTargets[y]]=-1;for(let y in g){let f=[],p=[];for(let M=0;M!==h[v].morphTargets.length;++M){let x=h[v];f.push(x.time),p.push(x.morphTarget===y?1:0)}s.push(new xi(".morphTargetInfluence["+y+"]",f,p))}l=g.length*a}else{let g=".bones["+t[u].name+"]";i(Si,g+".position",h,"pos",s),i(_i,g+".quaternion",h,"rot",s),i(Si,g+".scale",h,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let i=0,s=e.length;i!==s;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function R0(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return xi;case"vector":case"vector2":case"vector3":case"vector4":return Si;case"color":return yo;case"quaternion":return _i;case"bool":case"boolean":return qi;case"string":return ji}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function I0(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=R0(n.type);if(n.times===void 0){let t=[],i=[];iv(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var gi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},uc=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){let u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){let g=c[u],v=c[u+1];if(g.global&&(g.lastIndex=0),g.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},sv=new uc,wi=class{constructor(e){this.manager=e!==void 0?e:sv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};wi.DEFAULT_MATERIAL_NAME="__DEFAULT";var zi={},ih=class extends Error{constructor(e,t){super(e),this.response=t}},ta=class extends wi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=gi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(zi[e]!==void 0){zi[e].push({onLoad:t,onProgress:i,onError:s});return}zi[e]=[],zi[e].push({onLoad:t,onProgress:i,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let d=zi[e],u=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),g=h?parseInt(h):0,v=g!==0,y=0,f=new ReadableStream({start(p){M();function M(){u.read().then(({done:x,value:_})=>{if(x)p.close();else{y+=_.byteLength;let A=new ProgressEvent("progress",{lengthComputable:v,loaded:y,total:g});for(let C=0,I=d.length;C<I;C++){let O=d[C];O.onProgress&&O.onProgress(A)}p.enqueue(_),M()}},x=>{p.error(x)})}}});return new Response(f)}else throw new ih(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,g=new TextDecoder(h);return c.arrayBuffer().then(v=>g.decode(v))}}}).then(c=>{gi.add(`file:${e}`,c);let d=zi[e];delete zi[e];for(let u=0,h=d.length;u<h;u++){let g=d[u];g.onLoad&&g.onLoad(c)}}).catch(c=>{let d=zi[e];if(d===void 0)throw this.manager.itemError(e),c;delete zi[e];for(let u=0,h=d.length;u<h;u++){let g=d[u];g.onError&&g.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var $r=new WeakMap,dc=class extends wi{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=gi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=$r.get(a);u===void 0&&(u=[],$r.set(a,u)),u.push({onLoad:t,onError:s})}return a}let o=Gr("img");function l(){d(),t&&t(this);let u=$r.get(this)||[];for(let h=0;h<u.length;h++){let g=u[h];g.onLoad&&g.onLoad(this)}$r.delete(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),gi.remove(`image:${e}`);let h=$r.get(this)||[];for(let g=0;g<h.length;g++){let v=h[g];v.onError&&v.onError(u)}$r.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),gi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var bo=class extends wi{constructor(e){super(e)}load(e,t,i,s){let r=new kt,a=new dc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},Qs=class extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},xo=class extends Qs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Jd=new qe,sg=new L,rg=new L,_o=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=di,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zr,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;sg.setFromMatrixPosition(e.matrixWorld),t.position.copy(sg),rg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rg),t.updateMatrixWorld(),Jd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jd,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Jd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},sh=class extends _o{constructor(){super(new Pt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=js*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},So=class extends Qs{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new sh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ag=new qe,ja=new L,Zd=new L,rh=class extends _o{constructor(){super(new Pt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ne(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),ja.setFromMatrixPosition(e.matrixWorld),i.position.copy(ja),Zd.copy(i.position),Zd.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Zd),i.updateMatrixWorld(),s.makeTranslation(-ja.x,-ja.y,-ja.z),ag.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ag,i.coordinateSystem,i.reversedDepth)}},er=class extends Qs{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new rh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},tr=class extends no{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ah=class extends _o{constructor(){super(new tr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ys=class extends Qs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new ah}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Xi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Qd=new WeakMap,wo=class extends wi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=gi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Qd.has(a)===!0)s&&s(Qd.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return gi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Qd.set(l,c),gi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});gi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var hc=class extends Pt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var pc=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)i[r+o]=i[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(i,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,s=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(i,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(i,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){o.setValue(i,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,s=i*this._origIndex;e.getValue(t,s);for(let r=i,a=s;r!==a;++r)t[r]=t[s+r%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[i+a]}_slerp(e,t,i,s){Gt.slerpFlat(e,t,e,t,e,i,s)}_slerpAdditive(e,t,i,s,r){let a=this._workIndex*r;Gt.multiplyQuaternionsFlat(e,a,e,t,e,i),Gt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,i,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[i+o]*s}}_lerpAdditive(e,t,i,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[i+a]*s}}},Ch="\\[\\]\\.:\\/",P0=new RegExp("["+Ch+"]","g"),Rh="[^"+Ch+"]",L0="[^"+Ch.replace("\\.","")+"]",N0=/((?:WC+[\/:])*)/.source.replace("WC",Rh),D0=/(WCOD+)?/.source.replace("WCOD",L0),O0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rh),k0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rh),U0=new RegExp("^"+N0+D0+O0+k0+"$"),F0=["material","materials","bones","map"],oh=class{constructor(e,t,i){let s=i||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},ut=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(P0,"")}static parseTrackName(e){let t=U0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);F0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ut.Composite=oh;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var fc=class{constructor(e,t,i=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Vs,endingEnd:Vs};for(let c=0;c!==a;++c){let d=r[c].createInterpolant(null);o[c]=d,d.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=$g,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+i,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Hg:for(let d=0,u=l.length;d!==u;++d)l[d].evaluate(a),c[d].accumulateAdditive(o);break;case lu:default:for(let d=0,u=l.length;d!==u;++d)l[d].evaluate(a),c[d].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,s=this.time+e,r=this._loopCount,a=i===Vg;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(i===Bg){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,i){let s=this._interpolantSettings;i?(s.endingStart=Hs,s.endingEnd=Hs):(e?s.endingStart=this.zeroSlopeAtStart?Hs:Vs:s.endingStart=Ka,t?s.endingEnd=this.zeroSlopeAtEnd?Hs:Vs:s.endingEnd=Ka)}_scheduleFading(e,t,i){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=i,this}},B0=new Float32Array(1),Eo=class extends li{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let i=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName,d=c[l];d===void 0&&(d={},c[l]=d);for(let u=0;u!==r;++u){let h=s[u],g=h.name,v=d[g];if(v!==void 0)++v.referenceCount,a[u]=v;else{if(v=a[u],v!==void 0){v._cacheIndex===null&&(++v.referenceCount,this._addInactiveBinding(v,l,g));continue}let y=t&&t._propertyBindings[u].binding.parsedPath;v=new pc(ut.create(i,g,y),h.ValueTypeName,h.getValueSize()),++v.referenceCount,this._addInactiveBinding(v,l,g),a[u]=v}o[u].resultBuffer=v.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,i)}let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],s=e._cacheIndex;i._cacheIndex=s,t[s]=i,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],d=e._byClipCacheIndex;c._byClipCacheIndex=d,l[d]=c,l.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,h=(e._localRoot||this._root).uuid;delete u[h],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){let r=t[i];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_addInactiveBinding(e,t,i){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[i]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,s=i.rootNode.uuid,r=i.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=i,t[i]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new vo(new Float32Array(2),new Float32Array(2),1,B0),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=i,t[i]=r}clipAction(e,t,i){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Zs.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(i===void 0&&(a!==null?i=a.blendMode:i=lu),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===i)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let d=new fc(this,a,t,i);return this._bindAction(d,c),this._addInactiveAction(d,o,r),d}existingAction(e,t){let i=t||this._root,s=i.uuid,r=typeof e=="string"?Zs.findByName(i,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,s=this._actionsByClip,r=s[i];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let d=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=d,t[d]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let a in i){let o=i[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};var og=new qe,Mo=class{constructor(e,t,i=0,s=1/0){this.ray=new yi(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new jr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return og.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(og),this}intersectObject(e,t=!0,i=[]){return lh(e,this,i,t),i.sort(lg),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)lh(e[s],this,i,t);return i.sort(lg),i}};function lg(n,e){return n.distance-e.distance}function lh(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)lh(r[a],e,t,!0)}}var na=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ao=class extends li{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ih(n,e,t,i){let s=$0(i);switch(t){case bh:return n*e;case Ic:return n*e/s.components*s.byteLength;case Pc:return n*e/s.components*s.byteLength;case _h:return n*e*2/s.components*s.byteLength;case Lc:return n*e*2/s.components*s.byteLength;case xh:return n*e*3/s.components*s.byteLength;case On:return n*e*4/s.components*s.byteLength;case Nc:return n*e*4/s.components*s.byteLength;case Co:case Ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Io:case Po:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Oc:case Uc:return Math.max(n,16)*Math.max(e,8)/4;case Dc:case kc:return Math.max(n,8)*Math.max(e,8)/2;case Fc:case Bc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $c:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Vc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case zc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Wc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case qc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case jc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Xc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Yc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Kc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Zc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Qc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case eu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case tu:case nu:case iu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case su:case ru:return Math.ceil(n/4)*Math.ceil(e/4)*8;case au:case ou:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $0(n){switch(n){case di:case mh:return{byteLength:1,components:1};case sa:case gh:case ra:return{byteLength:2,components:1};case Cc:case Rc:return{byteLength:2,components:4};case _s:case Tc:case Yn:return{byteLength:4,components:1};case vh:case yh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Cv(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function H0(n){let e=new WeakMap;function t(o,l){let c=o.array,d=o.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),o.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let d=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,d);else{u.sort((g,v)=>g.start-v.start);let h=0;for(let g=1;g<u.length;g++){let v=u[h],y=u[g];y.start<=v.start+v.count+1?v.count=Math.max(v.count,y.start+y.count-v.start):(++h,u[h]=y)}u.length=h+1;for(let g=0,v=u.length;g<v;g++){let y=u[g];n.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var z0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,G0=`#ifdef USE_ALPHAHASH
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
#endif`,W0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,q0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,j0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,X0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Y0=`#ifdef USE_AOMAP
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
#endif`,K0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,J0=`#ifdef USE_BATCHING
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
#endif`,Z0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Q0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,e_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,t_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,n_=`#ifdef USE_IRIDESCENCE
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
#endif`,i_=`#ifdef USE_BUMPMAP
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
#endif`,s_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,r_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,a_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,o_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,l_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,c_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,u_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,d_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,h_=`#define PI 3.141592653589793
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
} // validated`,p_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,f_=`vec3 transformedNormal = objectNormal;
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
#endif`,m_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,g_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,y_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b_="gl_FragColor = linearToOutputTexel( gl_FragColor );",x_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,__=`#ifdef USE_ENVMAP
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
#endif`,S_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,w_=`#ifdef USE_ENVMAP
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
#endif`,E_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,M_=`#ifdef USE_ENVMAP
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
#endif`,A_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,T_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,C_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,R_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,I_=`#ifdef USE_GRADIENTMAP
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
}`,P_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,L_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,N_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,D_=`uniform bool receiveShadow;
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
#endif`,O_=`#ifdef USE_ENVMAP
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
#endif`,k_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,U_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,F_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,B_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$_=`PhysicalMaterial material;
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
#endif`,V_=`struct PhysicalMaterial {
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
}`,H_=`
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
#endif`,z_=`#if defined( RE_IndirectDiffuse )
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
#endif`,G_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,W_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,q_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Y_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,K_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,J_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z_=`#if defined( USE_POINTS_UV )
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
#endif`,Q_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,iS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sS=`#ifdef USE_MORPHTARGETS
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
#endif`,rS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,oS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,lS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dS=`#ifdef USE_NORMALMAP
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
#endif`,hS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_S=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,SS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ES=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,MS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,AS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,TS=`float getShadowMask() {
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
}`,CS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,RS=`#ifdef USE_SKINNING
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
#endif`,IS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,PS=`#ifdef USE_SKINNING
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
#endif`,LS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,NS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,OS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kS=`#ifdef USE_TRANSMISSION
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
#endif`,US=`#ifdef USE_TRANSMISSION
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
#endif`,FS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$S=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,VS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,HS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zS=`uniform sampler2D t2D;
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
}`,GS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XS=`#include <common>
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
}`,YS=`#if DEPTH_PACKING == 3200
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
}`,KS=`#define DISTANCE
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
}`,JS=`#define DISTANCE
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
}`,ZS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,QS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ew=`uniform float scale;
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
}`,tw=`uniform vec3 diffuse;
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
}`,nw=`#include <common>
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
}`,iw=`uniform vec3 diffuse;
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
}`,sw=`#define LAMBERT
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
}`,rw=`#define LAMBERT
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
}`,aw=`#define MATCAP
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
}`,ow=`#define MATCAP
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
}`,lw=`#define NORMAL
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
}`,cw=`#define NORMAL
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
}`,uw=`#define PHONG
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
}`,dw=`#define PHONG
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
}`,hw=`#define STANDARD
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
}`,pw=`#define STANDARD
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
}`,fw=`#define TOON
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
}`,mw=`#define TOON
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
}`,gw=`uniform float size;
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
}`,vw=`uniform vec3 diffuse;
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
}`,yw=`#include <common>
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
}`,bw=`uniform vec3 color;
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
}`,xw=`uniform float rotation;
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
}`,_w=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:z0,alphahash_pars_fragment:G0,alphamap_fragment:W0,alphamap_pars_fragment:q0,alphatest_fragment:j0,alphatest_pars_fragment:X0,aomap_fragment:Y0,aomap_pars_fragment:K0,batching_pars_vertex:J0,batching_vertex:Z0,begin_vertex:Q0,beginnormal_vertex:e_,bsdfs:t_,iridescence_fragment:n_,bumpmap_pars_fragment:i_,clipping_planes_fragment:s_,clipping_planes_pars_fragment:r_,clipping_planes_pars_vertex:a_,clipping_planes_vertex:o_,color_fragment:l_,color_pars_fragment:c_,color_pars_vertex:u_,color_vertex:d_,common:h_,cube_uv_reflection_fragment:p_,defaultnormal_vertex:f_,displacementmap_pars_vertex:m_,displacementmap_vertex:g_,emissivemap_fragment:v_,emissivemap_pars_fragment:y_,colorspace_fragment:b_,colorspace_pars_fragment:x_,envmap_fragment:__,envmap_common_pars_fragment:S_,envmap_pars_fragment:w_,envmap_pars_vertex:E_,envmap_physical_pars_fragment:O_,envmap_vertex:M_,fog_vertex:A_,fog_pars_vertex:T_,fog_fragment:C_,fog_pars_fragment:R_,gradientmap_pars_fragment:I_,lightmap_pars_fragment:P_,lights_lambert_fragment:L_,lights_lambert_pars_fragment:N_,lights_pars_begin:D_,lights_toon_fragment:k_,lights_toon_pars_fragment:U_,lights_phong_fragment:F_,lights_phong_pars_fragment:B_,lights_physical_fragment:$_,lights_physical_pars_fragment:V_,lights_fragment_begin:H_,lights_fragment_maps:z_,lights_fragment_end:G_,logdepthbuf_fragment:W_,logdepthbuf_pars_fragment:q_,logdepthbuf_pars_vertex:j_,logdepthbuf_vertex:X_,map_fragment:Y_,map_pars_fragment:K_,map_particle_fragment:J_,map_particle_pars_fragment:Z_,metalnessmap_fragment:Q_,metalnessmap_pars_fragment:eS,morphinstance_vertex:tS,morphcolor_vertex:nS,morphnormal_vertex:iS,morphtarget_pars_vertex:sS,morphtarget_vertex:rS,normal_fragment_begin:aS,normal_fragment_maps:oS,normal_pars_fragment:lS,normal_pars_vertex:cS,normal_vertex:uS,normalmap_pars_fragment:dS,clearcoat_normal_fragment_begin:hS,clearcoat_normal_fragment_maps:pS,clearcoat_pars_fragment:fS,iridescence_pars_fragment:mS,opaque_fragment:gS,packing:vS,premultiplied_alpha_fragment:yS,project_vertex:bS,dithering_fragment:xS,dithering_pars_fragment:_S,roughnessmap_fragment:SS,roughnessmap_pars_fragment:wS,shadowmap_pars_fragment:ES,shadowmap_pars_vertex:MS,shadowmap_vertex:AS,shadowmask_pars_fragment:TS,skinbase_vertex:CS,skinning_pars_vertex:RS,skinning_vertex:IS,skinnormal_vertex:PS,specularmap_fragment:LS,specularmap_pars_fragment:NS,tonemapping_fragment:DS,tonemapping_pars_fragment:OS,transmission_fragment:kS,transmission_pars_fragment:US,uv_pars_fragment:FS,uv_pars_vertex:BS,uv_vertex:$S,worldpos_vertex:VS,background_vert:HS,background_frag:zS,backgroundCube_vert:GS,backgroundCube_frag:WS,cube_vert:qS,cube_frag:jS,depth_vert:XS,depth_frag:YS,distanceRGBA_vert:KS,distanceRGBA_frag:JS,equirect_vert:ZS,equirect_frag:QS,linedashed_vert:ew,linedashed_frag:tw,meshbasic_vert:nw,meshbasic_frag:iw,meshlambert_vert:sw,meshlambert_frag:rw,meshmatcap_vert:aw,meshmatcap_frag:ow,meshnormal_vert:lw,meshnormal_frag:cw,meshphong_vert:uw,meshphong_frag:dw,meshphysical_vert:hw,meshphysical_frag:pw,meshtoon_vert:fw,meshtoon_frag:mw,points_vert:gw,points_frag:vw,shadow_vert:yw,shadow_frag:bw,sprite_vert:xw,sprite_frag:_w},he={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Mi={basic:{uniforms:tn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:tn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new ke(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:tn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:tn([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:tn([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new ke(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:tn([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:tn([he.points,he.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:tn([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:tn([he.common,he.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:tn([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:tn([he.sprite,he.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:tn([he.common,he.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:tn([he.lights,he.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Mi.physical={uniforms:tn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};var uu={r:0,b:0,g:0},ar=new Xn,Sw=new qe;function ww(n,e,t,i,s,r,a){let o=new ke(0),l=r===!0?0:1,c,d,u=null,h=0,g=null;function v(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?t:e).get(_)),_}function y(x){let _=!1,A=v(x);A===null?p(o,l):A&&A.isColor&&(p(A,1),_=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function f(x,_){let A=v(_);A&&(A.isCubeTexture||A.mapping===To)?(d===void 0&&(d=new lt(new gs(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:rr(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,I,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),ar.copy(_.backgroundRotation),ar.x*=-1,ar.y*=-1,ar.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),d.material.uniforms.envMap.value=A,d.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Sw.makeRotationFromEuler(ar)),d.material.toneMapped=nt.getTransfer(A.colorSpace)!==ot,(u!==A||h!==A.version||g!==n.toneMapping)&&(d.material.needsUpdate=!0,u=A,h=A.version,g=n.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new lt(new Js(2,2),new ci({name:"BackgroundMaterial",uniforms:rr(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=nt.getTransfer(A.colorSpace)!==ot,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||h!==A.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,u=A,h=A.version,g=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,_){x.getRGB(uu,Th(n)),i.buffers.color.setClear(uu.r,uu.g,uu.b,_,a)}function M(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:y,addToRenderList:f,dispose:M}}function Ew(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(w,P,B,q,G){let J=!1,Y=u(q,B,P);r!==Y&&(r=Y,c(r.object)),J=g(w,q,B,G),J&&v(w,q,B,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,_(w,P,B,q),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(w){return n.bindVertexArray(w)}function d(w){return n.deleteVertexArray(w)}function u(w,P,B){let q=B.wireframe===!0,G=i[w.id];G===void 0&&(G={},i[w.id]=G);let J=G[P.id];J===void 0&&(J={},G[P.id]=J);let Y=J[q];return Y===void 0&&(Y=h(l()),J[q]=Y),Y}function h(w){let P=[],B=[],q=[];for(let G=0;G<t;G++)P[G]=0,B[G]=0,q[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:q,object:w,attributes:{},index:null}}function g(w,P,B,q){let G=r.attributes,J=P.attributes,Y=0,ie=B.getAttributes();for(let W in ie)if(ie[W].location>=0){let N=G[W],V=J[W];if(V===void 0&&(W==="instanceMatrix"&&w.instanceMatrix&&(V=w.instanceMatrix),W==="instanceColor"&&w.instanceColor&&(V=w.instanceColor)),N===void 0||N.attribute!==V||V&&N.data!==V.data)return!0;Y++}return r.attributesNum!==Y||r.index!==q}function v(w,P,B,q){let G={},J=P.attributes,Y=0,ie=B.getAttributes();for(let W in ie)if(ie[W].location>=0){let N=J[W];N===void 0&&(W==="instanceMatrix"&&w.instanceMatrix&&(N=w.instanceMatrix),W==="instanceColor"&&w.instanceColor&&(N=w.instanceColor));let V={};V.attribute=N,N&&N.data&&(V.data=N.data),G[W]=V,Y++}r.attributes=G,r.attributesNum=Y,r.index=q}function y(){let w=r.newAttributes;for(let P=0,B=w.length;P<B;P++)w[P]=0}function f(w){p(w,0)}function p(w,P){let B=r.newAttributes,q=r.enabledAttributes,G=r.attributeDivisors;B[w]=1,q[w]===0&&(n.enableVertexAttribArray(w),q[w]=1),G[w]!==P&&(n.vertexAttribDivisor(w,P),G[w]=P)}function M(){let w=r.newAttributes,P=r.enabledAttributes;for(let B=0,q=P.length;B<q;B++)P[B]!==w[B]&&(n.disableVertexAttribArray(B),P[B]=0)}function x(w,P,B,q,G,J,Y){Y===!0?n.vertexAttribIPointer(w,P,B,G,J):n.vertexAttribPointer(w,P,B,q,G,J)}function _(w,P,B,q){y();let G=q.attributes,J=B.getAttributes(),Y=P.defaultAttributeValues;for(let ie in J){let W=J[ie];if(W.location>=0){let ce=G[ie];if(ce===void 0&&(ie==="instanceMatrix"&&w.instanceMatrix&&(ce=w.instanceMatrix),ie==="instanceColor"&&w.instanceColor&&(ce=w.instanceColor)),ce!==void 0){let N=ce.normalized,V=ce.itemSize,te=e.get(ce);if(te===void 0)continue;let ue=te.buffer,Me=te.type,ve=te.bytesPerElement,H=Me===n.INT||Me===n.UNSIGNED_INT||ce.gpuType===Tc;if(ce.isInterleavedBufferAttribute){let k=ce.data,ee=k.stride,me=ce.offset;if(k.isInstancedInterleavedBuffer){for(let be=0;be<W.locationSize;be++)p(W.location+be,k.meshPerAttribute);w.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let be=0;be<W.locationSize;be++)f(W.location+be);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let be=0;be<W.locationSize;be++)x(W.location+be,V/W.locationSize,Me,N,ee*ve,(me+V/W.locationSize*be)*ve,H)}else{if(ce.isInstancedBufferAttribute){for(let k=0;k<W.locationSize;k++)p(W.location+k,ce.meshPerAttribute);w.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let k=0;k<W.locationSize;k++)f(W.location+k);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let k=0;k<W.locationSize;k++)x(W.location+k,V/W.locationSize,Me,N,V*ve,V/W.locationSize*k*ve,H)}}else if(Y!==void 0){let N=Y[ie];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(W.location,N);break;case 3:n.vertexAttrib3fv(W.location,N);break;case 4:n.vertexAttrib4fv(W.location,N);break;default:n.vertexAttrib1fv(W.location,N)}}}}M()}function A(){O();for(let w in i){let P=i[w];for(let B in P){let q=P[B];for(let G in q)d(q[G].object),delete q[G];delete P[B]}delete i[w]}}function C(w){if(i[w.id]===void 0)return;let P=i[w.id];for(let B in P){let q=P[B];for(let G in q)d(q[G].object),delete q[G];delete P[B]}delete i[w.id]}function I(w){for(let P in i){let B=i[P];if(B[w.id]===void 0)continue;let q=B[w.id];for(let G in q)d(q[G].object),delete q[G];delete B[w.id]}}function O(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:E,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:f,disableUnusedAttributes:M}}function Mw(n,e,t){let i;function s(c){i=c}function r(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function a(c,d,u){u!==0&&(n.drawArraysInstanced(i,c,d,u),t.update(d,i,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v];t.update(g,i,1)}function l(c,d,u,h){if(u===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let v=0;v<c.length;v++)a(c[v],d[v],h[v]);else{g.multiDrawArraysInstancedWEBGL(i,c,0,d,0,h,0,u);let v=0;for(let y=0;y<u;y++)v+=d[y]*h[y];t.update(v,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Aw(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==On&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let O=I===ra&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==di&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Yn&&!O)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=v>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:v,maxTextureSize:y,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:M,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:A,maxSamples:C}}function Tw(n){let e=this,t=null,i=0,s=!1,r=!1,a=new jn,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){let g=u.length!==0||h||i!==0||s;return s=h,i=u.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,g){let v=u.clippingPlanes,y=u.clipIntersection,f=u.clipShadows,p=n.get(u);if(!s||v===null||v.length===0||r&&!f)r?d(null):c();else{let M=r?0:i,x=M*4,_=p.clippingState||null;l.value=_,_=d(v,h,x,g);for(let A=0;A!==x;++A)_[A]=t[A];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,g,v){let y=u!==null?u.length:0,f=null;if(y!==0){if(f=l.value,v!==!0||f===null){let p=g+y*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(f===null||f.length<p)&&(f=new Float32Array(p));for(let x=0,_=g;x!==y;++x,_+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(f,_),f[_+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,f}}function Cw(n){let e=new WeakMap;function t(a,o){return o===Ec?a.mapping=nr:o===Mc&&(a.mapping=ir),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===Ec||o===Mc)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new nc(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var ua=4,rv=[.125,.215,.35,.446,.526,.582],cr=20,Ph=new tr,av=new ke,Lh=null,Nh=0,Dh=0,Oh=!1,lr=(1+Math.sqrt(5))/2,ca=1/lr,ov=[new L(-lr,ca,0),new L(lr,ca,0),new L(-ca,0,lr),new L(ca,0,lr),new L(0,lr,-ca),new L(0,lr,ca),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Rw=new L,ha=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=Rw}=r;Lh=this._renderer.getRenderTarget(),Nh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lh,Nh,Dh),this._renderer.xr.enabled=Oh,e.scissorTest=!1,du(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===nr||e.mapping===ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lh=this._renderer.getRenderTarget(),Nh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:on,minFilter:on,generateMipmaps:!1,type:ra,format:On,colorSpace:Xt,depthBuffer:!1},s=lv(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lv(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Iw(r)),this._blurMaterial=Pw(r,e,t)}return s}_compileMaterial(e){let t=new lt(this._lodPlanes[0],e);this._renderer.compile(t,Ph)}_sceneToCubeUV(e,t,i,s,r){let l=new Pt(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,g=u.toneMapping;u.getClearColor(av),u.toneMapping=Ki,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let y=new cn({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),f=new lt(new gs,y),p=!1,M=e.background;M?M.isColor&&(y.color.copy(M),e.background=null,p=!0):(y.color.copy(av),p=!0);for(let x=0;x<6;x++){let _=x%3;_===0?(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[x],r.y,r.z)):_===1?(l.up.set(0,0,c[x]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[x],r.z)):(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[x]));let A=this._cubeSize;du(s,_*A,x>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(f,l),u.render(e,l)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=g,u.autoClear=h,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===nr||e.mapping===ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=uv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cv());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new lt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;du(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ph)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ov[(s-r-1)%ov.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,u=new lt(this._lodPlanes[s],c),h=c.uniforms,g=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*cr-1),y=r/v,f=isFinite(r)?1+Math.floor(d*y):cr;f>cr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${cr}`);let p=[],M=0;for(let I=0;I<cr;++I){let O=I/y,E=Math.exp(-O*O/2);p.push(E),I===0?M+=E:I<f&&(M+=2*E)}for(let I=0;I<p.length;I++)p[I]=p[I]/M;h.envMap.value=e.texture,h.samples.value=f,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:x}=this;h.dTheta.value=v,h.mipInt.value=x-i;let _=this._sizeLods[s],A=3*_*(s>x-ua?s-x+ua:0),C=4*(this._cubeSize-_);du(t,A,C,3*_,2*_),l.setRenderTarget(t),l.render(u,Ph)}};function Iw(n){let e=[],t=[],i=[],s=n,r=n-ua+1+rv.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>n-ua?l=rv[a-n+ua-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],g=6,v=6,y=3,f=2,p=1,M=new Float32Array(y*v*g),x=new Float32Array(f*v*g),_=new Float32Array(p*v*g);for(let C=0;C<g;C++){let I=C%3*2/3-1,O=C>2?0:-1,E=[I,O,0,I+2/3,O,0,I+2/3,O+1,0,I,O,0,I+2/3,O+1,0,I,O+1,0];M.set(E,y*v*C),x.set(h,f*v*C);let w=[C,C,C,C,C,C];_.set(w,p*v*C)}let A=new un;A.setAttribute("position",new Lt(M,y)),A.setAttribute("uv",new Lt(x,f)),A.setAttribute("faceIndex",new Lt(_,p)),e.push(A),s>ua&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function lv(n,e,t){let i=new vi(n,e,t);return i.texture.mapping=To,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function du(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Pw(n,e,t){let i=new Float32Array(cr),s=new L(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wh(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function cv(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wh(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function uv(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Wh(){return`

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
	`}function Lw(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===Ec||l===Mc,d=l===nr||l===ir;if(c||d){let u=e.get(o),h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new ha(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let g=o.image;return c&&g&&g.height>0||d&&g&&s(g)?(t===null&&(t=new ha(n)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Nw(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Wr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Dw(n,e,t,i){let s={},r=new WeakMap;function a(u){let h=u.target;h.index!==null&&e.remove(h.index);for(let v in h.attributes)e.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];let g=r.get(h);g&&(e.remove(g),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){let h=u.attributes;for(let g in h)e.update(h[g],n.ARRAY_BUFFER)}function c(u){let h=[],g=u.index,v=u.attributes.position,y=0;if(g!==null){let M=g.array;y=g.version;for(let x=0,_=M.length;x<_;x+=3){let A=M[x+0],C=M[x+1],I=M[x+2];h.push(A,C,C,I,I,A)}}else if(v!==void 0){let M=v.array;y=v.version;for(let x=0,_=M.length/3-1;x<_;x+=3){let A=x+0,C=x+1,I=x+2;h.push(A,C,C,I,I,A)}}else return;let f=new(Ah(h)?to:eo)(h,1);f.version=y;let p=r.get(u);p&&e.remove(p),r.set(u,f)}function d(u){let h=r.get(u);if(h){let g=u.index;g!==null&&h.version<g.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Ow(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,g){n.drawElements(i,g,r,h*a),t.update(g,i,1)}function c(h,g,v){v!==0&&(n.drawElementsInstanced(i,g,r,h*a,v),t.update(g,i,v))}function d(h,g,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,r,h,0,v);let f=0;for(let p=0;p<v;p++)f+=g[p];t.update(f,i,1)}function u(h,g,v,y){if(v===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<h.length;p++)c(h[p]/a,g[p],y[p]);else{f.multiDrawElementsInstancedWEBGL(i,g,0,r,h,0,y,0,v);let p=0;for(let M=0;M<v;M++)p+=g[M]*y[M];t.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function kw(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Uw(n,e,t){let i=new WeakMap,s=new st;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0,h=i.get(o);if(h===void 0||h.count!==u){let E=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],x=0;g===!0&&(x=1),v===!0&&(x=2),y===!0&&(x=3);let _=o.attributes.position.count*x,A=1;_>e.maxTextureSize&&(A=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let C=new Float32Array(_*A*4*u),I=new Qa(C,_,A,u);I.type=Yn,I.needsUpdate=!0;let O=x*4;for(let w=0;w<u;w++){let P=f[w],B=p[w],q=M[w],G=_*A*4*w;for(let J=0;J<P.count;J++){let Y=J*O;g===!0&&(s.fromBufferAttribute(P,J),C[G+Y+0]=s.x,C[G+Y+1]=s.y,C[G+Y+2]=s.z,C[G+Y+3]=0),v===!0&&(s.fromBufferAttribute(B,J),C[G+Y+4]=s.x,C[G+Y+5]=s.y,C[G+Y+6]=s.z,C[G+Y+7]=0),y===!0&&(s.fromBufferAttribute(q,J),C[G+Y+8]=s.x,C[G+Y+9]=s.y,C[G+Y+10]=s.z,C[G+Y+11]=q.itemSize===4?s.w:1)}}h={count:u,texture:I,size:new Ne(_,A)},i.set(o,h),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let y=0;y<c.length;y++)g+=c[y];let v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Fw(n,e,t,i){let s=new WeakMap;function r(l){let c=i.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Rv=new kt,dv=new ho(1,1),Iv=new Qa,Pv=new ec,Lv=new io,hv=[],pv=[],fv=new Float32Array(16),mv=new Float32Array(9),gv=new Float32Array(4);function pa(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=hv[s];if(r===void 0&&(r=new Float32Array(s),hv[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function fu(n,e){let t=pv[e];t===void 0&&(t=new Int32Array(e),pv[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Bw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $w(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function Vw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function Hw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function zw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,i))return;gv.set(i),n.uniformMatrix2fv(this.addr,!1,gv),Ft(t,i)}}function Gw(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,i))return;mv.set(i),n.uniformMatrix3fv(this.addr,!1,mv),Ft(t,i)}}function Ww(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,i))return;fv.set(i),n.uniformMatrix4fv(this.addr,!1,fv),Ft(t,i)}}function qw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function jw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function Xw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function Yw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function Kw(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Jw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function Zw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function Qw(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function eE(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(dv.compareFunction=wh,r=dv):r=Rv,t.setTexture2D(e||r,s)}function tE(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Pv,s)}function nE(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Lv,s)}function iE(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Iv,s)}function sE(n){switch(n){case 5126:return Bw;case 35664:return $w;case 35665:return Vw;case 35666:return Hw;case 35674:return zw;case 35675:return Gw;case 35676:return Ww;case 5124:case 35670:return qw;case 35667:case 35671:return jw;case 35668:case 35672:return Xw;case 35669:case 35673:return Yw;case 5125:return Kw;case 36294:return Jw;case 36295:return Zw;case 36296:return Qw;case 35678:case 36198:case 36298:case 36306:case 35682:return eE;case 35679:case 36299:case 36307:return tE;case 35680:case 36300:case 36308:case 36293:return nE;case 36289:case 36303:case 36311:case 36292:return iE}}function rE(n,e){n.uniform1fv(this.addr,e)}function aE(n,e){let t=pa(e,this.size,2);n.uniform2fv(this.addr,t)}function oE(n,e){let t=pa(e,this.size,3);n.uniform3fv(this.addr,t)}function lE(n,e){let t=pa(e,this.size,4);n.uniform4fv(this.addr,t)}function cE(n,e){let t=pa(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function uE(n,e){let t=pa(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function dE(n,e){let t=pa(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function hE(n,e){n.uniform1iv(this.addr,e)}function pE(n,e){n.uniform2iv(this.addr,e)}function fE(n,e){n.uniform3iv(this.addr,e)}function mE(n,e){n.uniform4iv(this.addr,e)}function gE(n,e){n.uniform1uiv(this.addr,e)}function vE(n,e){n.uniform2uiv(this.addr,e)}function yE(n,e){n.uniform3uiv(this.addr,e)}function bE(n,e){n.uniform4uiv(this.addr,e)}function xE(n,e,t){let i=this.cache,s=e.length,r=fu(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Rv,r[a])}function _E(n,e,t){let i=this.cache,s=e.length,r=fu(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Pv,r[a])}function SE(n,e,t){let i=this.cache,s=e.length,r=fu(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Lv,r[a])}function wE(n,e,t){let i=this.cache,s=e.length,r=fu(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Iv,r[a])}function EE(n){switch(n){case 5126:return rE;case 35664:return aE;case 35665:return oE;case 35666:return lE;case 35674:return cE;case 35675:return uE;case 35676:return dE;case 5124:case 35670:return hE;case 35667:case 35671:return pE;case 35668:case 35672:return fE;case 35669:case 35673:return mE;case 5125:return gE;case 36294:return vE;case 36295:return yE;case 36296:return bE;case 35678:case 36198:case 36298:case 36306:case 35682:return xE;case 35679:case 36299:case 36307:return _E;case 35680:case 36300:case 36308:case 36293:return SE;case 36289:case 36303:case 36311:case 36292:return wE}}var Uh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=sE(t.type)}},Fh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=EE(t.type)}},Bh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},kh=/(\w+)(\])?(\[|\.)?/g;function vv(n,e){n.seq.push(e),n.map[e.id]=e}function ME(n,e,t){let i=n.name,s=i.length;for(kh.lastIndex=0;;){let r=kh.exec(i),a=kh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){vv(t,c===void 0?new Uh(o,n,e):new Fh(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new Bh(o),vv(t,u)),t=u}}}var da=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);ME(r,a,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function yv(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var AE=37297,TE=0;function CE(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var bv=new je;function RE(n){nt._getMatrix(bv,nt.workingColorSpace,n);let e=`mat3( ${bv.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(n)){case Ja:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function xv(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+CE(n.getShaderSource(e),o)}else return r}function IE(n,e){let t=RE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function PE(n,e){let t;switch(e){case Lg:t="Linear";break;case Ng:t="Reinhard";break;case Dg:t="Cineon";break;case wc:t="ACESFilmic";break;case kg:t="AgX";break;case Ug:t="Neutral";break;case Og:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var hu=new L;function LE(){nt.getLuminanceCoefficients(hu);let n=hu.x.toFixed(4),e=hu.y.toFixed(4),t=hu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Do).join(`
`)}function DE(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function OE(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Do(n){return n!==""}function _v(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sv(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var kE=/^[ \t]*#include +<([\w\d./]+)>/gm;function $h(n){return n.replace(kE,FE)}var UE=new Map;function FE(n,e){let t=Je[e];if(t===void 0){let i=UE.get(e);if(i!==void 0)t=Je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return $h(t)}var BE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wv(n){return n.replace(BE,$E)}function $E(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ev(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function VE(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===uh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===dg?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ei&&(e="SHADOWMAP_TYPE_VSM"),e}function HE(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case nr:case ir:e="ENVMAP_TYPE_CUBE";break;case To:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zE(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ir:e="ENVMAP_MODE_REFRACTION";break}return e}function GE(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Sc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ig:e="ENVMAP_BLENDING_MIX";break;case Pg:e="ENVMAP_BLENDING_ADD";break}return e}function WE(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function qE(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=VE(t),c=HE(t),d=zE(t),u=GE(t),h=WE(t),g=NE(t),v=DE(r),y=s.createProgram(),f,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Do).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Do).join(`
`),p.length>0&&(p+=`
`)):(f=[Ev(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Do).join(`
`),p=[Ev(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ki?"#define TONE_MAPPING":"",t.toneMapping!==Ki?Je.tonemapping_pars_fragment:"",t.toneMapping!==Ki?PE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,IE("linearToOutputTexel",t.outputColorSpace),LE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Do).join(`
`)),a=$h(a),a=_v(a,t),a=Sv(a,t),o=$h(o),o=_v(o,t),o=Sv(o,t),a=wv(a),o=wv(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",t.glslVersion===Eh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Eh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=M+f+a,_=M+p+o,A=yv(s,s.VERTEX_SHADER,x),C=yv(s,s.FRAGMENT_SHADER,_);s.attachShader(y,A),s.attachShader(y,C),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function I(P){if(n.debug.checkShaderErrors){let B=s.getProgramInfoLog(y)||"",q=s.getShaderInfoLog(A)||"",G=s.getShaderInfoLog(C)||"",J=B.trim(),Y=q.trim(),ie=G.trim(),W=!0,ce=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,A,C);else{let N=xv(s,A,"vertex"),V=xv(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+J+`
`+N+`
`+V)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(Y===""||ie==="")&&(ce=!1);ce&&(P.diagnostics={runnable:W,programLog:J,vertexShader:{log:Y,prefix:f},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(A),s.deleteShader(C),O=new da(s,y),E=OE(s,y)}let O;this.getUniforms=function(){return O===void 0&&I(this),O};let E;this.getAttributes=function(){return E===void 0&&I(this),E};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(y,AE)),w},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=TE++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=A,this.fragmentShader=C,this}var jE=0,Vh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Hh(e),t.set(e,i)),i}},Hh=class{constructor(e){this.id=jE++,this.code=e,this.usedTimes=0}};function XE(n,e,t,i,s,r,a){let o=new jr,l=new Vh,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures,g=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return c.add(E),E===0?"uv":`uv${E}`}function f(E,w,P,B,q){let G=B.fog,J=q.geometry,Y=E.isMeshStandardMaterial?B.environment:null,ie=(E.isMeshStandardMaterial?t:e).get(E.envMap||Y),W=ie&&ie.mapping===To?ie.image.height:null,ce=v[E.type];E.precision!==null&&(g=s.getMaxPrecision(E.precision),g!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",g,"instead."));let N=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,V=N!==void 0?N.length:0,te=0;J.morphAttributes.position!==void 0&&(te=1),J.morphAttributes.normal!==void 0&&(te=2),J.morphAttributes.color!==void 0&&(te=3);let ue,Me,ve,H;if(ce){let rt=Mi[ce];ue=rt.vertexShader,Me=rt.fragmentShader}else ue=E.vertexShader,Me=E.fragmentShader,l.update(E),ve=l.getVertexShaderID(E),H=l.getFragmentShaderID(E);let k=n.getRenderTarget(),ee=n.state.buffers.depth.getReversed(),me=q.isInstancedMesh===!0,be=q.isBatchedMesh===!0,et=!!E.map,Zt=!!E.matcap,R=!!ie,bt=!!E.aoMap,We=!!E.lightMap,Be=!!E.bumpMap,Ae=!!E.normalMap,xt=!!E.displacementMap,Te=!!E.emissiveMap,Ke=!!E.metalnessMap,Vt=!!E.roughnessMap,Mt=E.anisotropy>0,T=E.clearcoat>0,b=E.dispersion>0,z=E.iridescence>0,Z=E.sheen>0,ne=E.transmission>0,K=Mt&&!!E.anisotropyMap,Le=T&&!!E.clearcoatMap,le=T&&!!E.clearcoatNormalMap,Ce=T&&!!E.clearcoatRoughnessMap,Ie=z&&!!E.iridescenceMap,ae=z&&!!E.iridescenceThicknessMap,ge=Z&&!!E.sheenColorMap,Fe=Z&&!!E.sheenRoughnessMap,Pe=!!E.specularMap,pe=!!E.specularColorMap,Xe=!!E.specularIntensityMap,D=ne&&!!E.transmissionMap,oe=ne&&!!E.thicknessMap,de=!!E.gradientMap,Se=!!E.alphaMap,se=E.alphaTest>0,Q=!!E.alphaHash,Ee=!!E.extensions,ze=Ki;E.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(ze=n.toneMapping);let ft={shaderID:ce,shaderType:E.type,shaderName:E.name,vertexShader:ue,fragmentShader:Me,defines:E.defines,customVertexShaderID:ve,customFragmentShaderID:H,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:g,batching:be,batchingColor:be&&q._colorsTexture!==null,instancing:me,instancingColor:me&&q.instanceColor!==null,instancingMorph:me&&q.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:k===null?n.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Xt,alphaToCoverage:!!E.alphaToCoverage,map:et,matcap:Zt,envMap:R,envMapMode:R&&ie.mapping,envMapCubeUVHeight:W,aoMap:bt,lightMap:We,bumpMap:Be,normalMap:Ae,displacementMap:h&&xt,emissiveMap:Te,normalMapObjectSpace:Ae&&E.normalMapType===Wg,normalMapTangentSpace:Ae&&E.normalMapType===cu,metalnessMap:Ke,roughnessMap:Vt,anisotropy:Mt,anisotropyMap:K,clearcoat:T,clearcoatMap:Le,clearcoatNormalMap:le,clearcoatRoughnessMap:Ce,dispersion:b,iridescence:z,iridescenceMap:Ie,iridescenceThicknessMap:ae,sheen:Z,sheenColorMap:ge,sheenRoughnessMap:Fe,specularMap:Pe,specularColorMap:pe,specularIntensityMap:Xe,transmission:ne,transmissionMap:D,thicknessMap:oe,gradientMap:de,opaque:E.transparent===!1&&E.blending===zs&&E.alphaToCoverage===!1,alphaMap:Se,alphaTest:se,alphaHash:Q,combine:E.combine,mapUv:et&&y(E.map.channel),aoMapUv:bt&&y(E.aoMap.channel),lightMapUv:We&&y(E.lightMap.channel),bumpMapUv:Be&&y(E.bumpMap.channel),normalMapUv:Ae&&y(E.normalMap.channel),displacementMapUv:xt&&y(E.displacementMap.channel),emissiveMapUv:Te&&y(E.emissiveMap.channel),metalnessMapUv:Ke&&y(E.metalnessMap.channel),roughnessMapUv:Vt&&y(E.roughnessMap.channel),anisotropyMapUv:K&&y(E.anisotropyMap.channel),clearcoatMapUv:Le&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:le&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&y(E.sheenRoughnessMap.channel),specularMapUv:Pe&&y(E.specularMap.channel),specularColorMapUv:pe&&y(E.specularColorMap.channel),specularIntensityMapUv:Xe&&y(E.specularIntensityMap.channel),transmissionMapUv:D&&y(E.transmissionMap.channel),thicknessMapUv:oe&&y(E.thicknessMap.channel),alphaMapUv:Se&&y(E.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Ae||Mt),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!J.attributes.uv&&(et||Se),fog:!!G,useFog:E.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ee,skinning:q.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:V,morphTextureStride:te,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:et&&E.map.isVideoTexture===!0&&nt.getTransfer(E.map.colorSpace)===ot,decodeVideoTextureEmissive:Te&&E.emissiveMap.isVideoTexture===!0&&nt.getTransfer(E.emissiveMap.colorSpace)===ot,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===En,flipSided:E.side===Yt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ee&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&E.extensions.multiDraw===!0||be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(E){let w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(let P in E.defines)w.push(P),w.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(M(w,E),x(w,E),w.push(n.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function M(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function x(E,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),w.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),E.push(o.mask)}function _(E){let w=v[E.type],P;if(w){let B=Mi[w];P=nv.clone(B.uniforms)}else P=E.uniforms;return P}function A(E,w){let P;for(let B=0,q=d.length;B<q;B++){let G=d[B];if(G.cacheKey===w){P=G,++P.usedTimes;break}}return P===void 0&&(P=new qE(n,w,E,r),d.push(P)),P}function C(E){if(--E.usedTimes===0){let w=d.indexOf(E);d[w]=d[d.length-1],d.pop(),E.destroy()}}function I(E){l.remove(E)}function O(){l.dispose()}return{getParameters:f,getProgramCacheKey:p,getUniforms:_,acquireProgram:A,releaseProgram:C,releaseShaderCache:I,programs:d,dispose:O}}function YE(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function KE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Mv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Av(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u,h,g,v,y,f){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:g,groupOrder:v,renderOrder:u.renderOrder,z:y,group:f},n[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=g,p.groupOrder=v,p.renderOrder=u.renderOrder,p.z=y,p.group=f),e++,p}function o(u,h,g,v,y,f){let p=a(u,h,g,v,y,f);g.transmission>0?i.push(p):g.transparent===!0?s.push(p):t.push(p)}function l(u,h,g,v,y,f){let p=a(u,h,g,v,y,f);g.transmission>0?i.unshift(p):g.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||KE),i.length>1&&i.sort(h||Mv),s.length>1&&s.sort(h||Mv)}function d(){for(let u=e,h=n.length;u<h;u++){let g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function JE(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new Av,n.set(i,[a])):s>=r.length?(a=new Av,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function ZE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ke};break;case"SpotLight":t={position:new L,direction:new L,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function QE(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var eM=0;function tM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function nM(n){let e=new ZE,t=QE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);let s=new L,r=new qe,a=new qe;function o(c){let d=0,u=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let g=0,v=0,y=0,f=0,p=0,M=0,x=0,_=0,A=0,C=0,I=0;c.sort(tM);for(let E=0,w=c.length;E<w;E++){let P=c[E],B=P.color,q=P.intensity,G=P.distance,J=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=B.r*q,u+=B.g*q,h+=B.b*q;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],q);I++}else if(P.isDirectionalLight){let Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let ie=P.shadow,W=t.get(P);W.shadowIntensity=ie.intensity,W.shadowBias=ie.bias,W.shadowNormalBias=ie.normalBias,W.shadowRadius=ie.radius,W.shadowMapSize=ie.mapSize,i.directionalShadow[g]=W,i.directionalShadowMap[g]=J,i.directionalShadowMatrix[g]=P.shadow.matrix,M++}i.directional[g]=Y,g++}else if(P.isSpotLight){let Y=e.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(B).multiplyScalar(q),Y.distance=G,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[y]=Y;let ie=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,ie.updateMatrices(P),P.castShadow&&C++),i.spotLightMatrix[y]=ie.matrix,P.castShadow){let W=t.get(P);W.shadowIntensity=ie.intensity,W.shadowBias=ie.bias,W.shadowNormalBias=ie.normalBias,W.shadowRadius=ie.radius,W.shadowMapSize=ie.mapSize,i.spotShadow[y]=W,i.spotShadowMap[y]=J,_++}y++}else if(P.isRectAreaLight){let Y=e.get(P);Y.color.copy(B).multiplyScalar(q),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[f]=Y,f++}else if(P.isPointLight){let Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){let ie=P.shadow,W=t.get(P);W.shadowIntensity=ie.intensity,W.shadowBias=ie.bias,W.shadowNormalBias=ie.normalBias,W.shadowRadius=ie.radius,W.shadowMapSize=ie.mapSize,W.shadowCameraNear=ie.camera.near,W.shadowCameraFar=ie.camera.far,i.pointShadow[v]=W,i.pointShadowMap[v]=J,i.pointShadowMatrix[v]=P.shadow.matrix,x++}i.point[v]=Y,v++}else if(P.isHemisphereLight){let Y=e.get(P);Y.skyColor.copy(P.color).multiplyScalar(q),Y.groundColor.copy(P.groundColor).multiplyScalar(q),i.hemi[p]=Y,p++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;let O=i.hash;(O.directionalLength!==g||O.pointLength!==v||O.spotLength!==y||O.rectAreaLength!==f||O.hemiLength!==p||O.numDirectionalShadows!==M||O.numPointShadows!==x||O.numSpotShadows!==_||O.numSpotMaps!==A||O.numLightProbes!==I)&&(i.directional.length=g,i.spot.length=y,i.rectArea.length=f,i.point.length=v,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=_+A-C,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=I,O.directionalLength=g,O.pointLength=v,O.spotLength=y,O.rectAreaLength=f,O.hemiLength=p,O.numDirectionalShadows=M,O.numPointShadows=x,O.numSpotShadows=_,O.numSpotMaps=A,O.numLightProbes=I,i.version=eM++)}function l(c,d){let u=0,h=0,g=0,v=0,y=0,f=d.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let x=c[p];if(x.isDirectionalLight){let _=i.directional[u];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(f),u++}else if(x.isSpotLight){let _=i.spot[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(f),g++}else if(x.isRectAreaLight){let _=i.rectArea[v];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(f),a.identity(),r.copy(x.matrixWorld),r.premultiply(f),a.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){let _=i.point[h];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(f),h++}else if(x.isHemisphereLight){let _=i.hemi[y];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(f),y++}}}return{setup:o,setupView:l,state:i}}function Tv(n){let e=new nM(n),t=[],i=[];function s(d){c.camera=d,t.length=0,i.length=0}function r(d){t.push(d)}function a(d){i.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function iM(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Tv(n),e.set(s,[o])):r>=a.length?(o=new Tv(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var sM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rM=`uniform sampler2D shadow_pass;
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
}`;function aM(n,e,t){let i=new Zr,s=new Ne,r=new Ne,a=new st,o=new rc({depthPacking:Gg}),l=new ac,c={},d=t.maxTextureSize,u={[oi]:Yt,[Yt]:oi,[En]:En},h=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:sM,fragmentShader:rM}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let v=new un;v.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new lt(v,h),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uh;let p=this.type;this.render=function(C,I,O){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;let E=n.getRenderTarget(),w=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Yi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let q=p!==Ei&&this.type===Ei,G=p===Ei&&this.type!==Ei;for(let J=0,Y=C.length;J<Y;J++){let ie=C[J],W=ie.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let ce=W.getFrameExtents();if(s.multiply(ce),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ce.x),s.x=r.x*ce.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ce.y),s.y=r.y*ce.y,W.mapSize.y=r.y)),W.map===null||q===!0||G===!0){let V=this.type!==Ei?{minFilter:jt,magFilter:jt}:{};W.map!==null&&W.map.dispose(),W.map=new vi(s.x,s.y,V),W.map.texture.name=ie.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();let N=W.getViewportCount();for(let V=0;V<N;V++){let te=W.getViewport(V);a.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),B.viewport(a),W.updateMatrices(ie,V),i=W.getFrustum(),_(I,O,W.camera,ie,this.type)}W.isPointLightShadow!==!0&&this.type===Ei&&M(W,O),W.needsUpdate=!1}p=this.type,f.needsUpdate=!1,n.setRenderTarget(E,w,P)};function M(C,I){let O=e.update(y);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,g.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new vi(s.x,s.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(I,null,O,h,y,null),g.uniforms.shadow_pass.value=C.mapPass.texture,g.uniforms.resolution.value=C.mapSize,g.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(I,null,O,g,y,null)}function x(C,I,O,E){let w=null,P=O.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)w=P;else if(w=O.isPointLight===!0?l:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=w.uuid,q=I.uuid,G=c[B];G===void 0&&(G={},c[B]=G);let J=G[q];J===void 0&&(J=w.clone(),G[q]=J,I.addEventListener("dispose",A)),w=J}if(w.visible=I.visible,w.wireframe=I.wireframe,E===Ei?w.side=I.shadowSide!==null?I.shadowSide:I.side:w.side=I.shadowSide!==null?I.shadowSide:u[I.side],w.alphaMap=I.alphaMap,w.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,w.map=I.map,w.clipShadows=I.clipShadows,w.clippingPlanes=I.clippingPlanes,w.clipIntersection=I.clipIntersection,w.displacementMap=I.displacementMap,w.displacementScale=I.displacementScale,w.displacementBias=I.displacementBias,w.wireframeLinewidth=I.wireframeLinewidth,w.linewidth=I.linewidth,O.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let B=n.properties.get(w);B.light=O}return w}function _(C,I,O,E,w){if(C.visible===!1)return;if(C.layers.test(I.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&w===Ei)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld);let q=e.update(C),G=C.material;if(Array.isArray(G)){let J=q.groups;for(let Y=0,ie=J.length;Y<ie;Y++){let W=J[Y],ce=G[W.materialIndex];if(ce&&ce.visible){let N=x(C,ce,E,w);C.onBeforeShadow(n,C,I,O,q,N,W),n.renderBufferDirect(O,null,q,N,C,W),C.onAfterShadow(n,C,I,O,q,N,W)}}}else if(G.visible){let J=x(C,G,E,w);C.onBeforeShadow(n,C,I,O,q,J,null),n.renderBufferDirect(O,null,q,J,C,null),C.onAfterShadow(n,C,I,O,q,J,null)}}let B=C.children;for(let q=0,G=B.length;q<G;q++)_(B[q],I,O,E,w)}function A(C){C.target.removeEventListener("dispose",A);for(let O in c){let E=c[O],w=C.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}var oM={[mc]:gc,[vc]:xc,[yc]:_c,[Gs]:bc,[gc]:mc,[xc]:vc,[_c]:yc,[bc]:Gs};function lM(n,e){function t(){let D=!1,oe=new st,de=null,Se=new st(0,0,0,0);return{setMask:function(se){de!==se&&!D&&(n.colorMask(se,se,se,se),de=se)},setLocked:function(se){D=se},setClear:function(se,Q,Ee,ze,ft){ft===!0&&(se*=ze,Q*=ze,Ee*=ze),oe.set(se,Q,Ee,ze),Se.equals(oe)===!1&&(n.clearColor(se,Q,Ee,ze),Se.copy(oe))},reset:function(){D=!1,de=null,Se.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,de=null,Se=null,se=null;return{setReversed:function(Q){if(oe!==Q){let Ee=e.get("EXT_clip_control");Q?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),oe=Q;let ze=se;se=null,this.setClear(ze)}},getReversed:function(){return oe},setTest:function(Q){Q?k(n.DEPTH_TEST):ee(n.DEPTH_TEST)},setMask:function(Q){de!==Q&&!D&&(n.depthMask(Q),de=Q)},setFunc:function(Q){if(oe&&(Q=oM[Q]),Se!==Q){switch(Q){case mc:n.depthFunc(n.NEVER);break;case gc:n.depthFunc(n.ALWAYS);break;case vc:n.depthFunc(n.LESS);break;case Gs:n.depthFunc(n.LEQUAL);break;case yc:n.depthFunc(n.EQUAL);break;case bc:n.depthFunc(n.GEQUAL);break;case xc:n.depthFunc(n.GREATER);break;case _c:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Se=Q}},setLocked:function(Q){D=Q},setClear:function(Q){se!==Q&&(oe&&(Q=1-Q),n.clearDepth(Q),se=Q)},reset:function(){D=!1,de=null,Se=null,se=null,oe=!1}}}function s(){let D=!1,oe=null,de=null,Se=null,se=null,Q=null,Ee=null,ze=null,ft=null;return{setTest:function(rt){D||(rt?k(n.STENCIL_TEST):ee(n.STENCIL_TEST))},setMask:function(rt){oe!==rt&&!D&&(n.stencilMask(rt),oe=rt)},setFunc:function(rt,Ui,fi){(de!==rt||Se!==Ui||se!==fi)&&(n.stencilFunc(rt,Ui,fi),de=rt,Se=Ui,se=fi)},setOp:function(rt,Ui,fi){(Q!==rt||Ee!==Ui||ze!==fi)&&(n.stencilOp(rt,Ui,fi),Q=rt,Ee=Ui,ze=fi)},setLocked:function(rt){D=rt},setClear:function(rt){ft!==rt&&(n.clearStencil(rt),ft=rt)},reset:function(){D=!1,oe=null,de=null,Se=null,se=null,Q=null,Ee=null,ze=null,ft=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},u={},h=new WeakMap,g=[],v=null,y=!1,f=null,p=null,M=null,x=null,_=null,A=null,C=null,I=new ke(0,0,0),O=0,E=!1,w=null,P=null,B=null,q=null,G=null,J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,ie=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=ie>=1):W.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=ie>=2);let ce=null,N={},V=n.getParameter(n.SCISSOR_BOX),te=n.getParameter(n.VIEWPORT),ue=new st().fromArray(V),Me=new st().fromArray(te);function ve(D,oe,de,Se){let se=new Uint8Array(4),Q=n.createTexture();n.bindTexture(D,Q),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ee=0;Ee<de;Ee++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,Se,0,n.RGBA,n.UNSIGNED_BYTE,se):n.texImage2D(oe+Ee,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,se);return Q}let H={};H[n.TEXTURE_2D]=ve(n.TEXTURE_2D,n.TEXTURE_2D,1),H[n.TEXTURE_CUBE_MAP]=ve(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[n.TEXTURE_2D_ARRAY]=ve(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),H[n.TEXTURE_3D]=ve(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),k(n.DEPTH_TEST),a.setFunc(Gs),Be(!1),Ae(ch),k(n.CULL_FACE),bt(Yi);function k(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function ee(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function me(D,oe){return u[D]!==oe?(n.bindFramebuffer(D,oe),u[D]=oe,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function be(D,oe){let de=g,Se=!1;if(D){de=h.get(oe),de===void 0&&(de=[],h.set(oe,de));let se=D.textures;if(de.length!==se.length||de[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,Ee=se.length;Q<Ee;Q++)de[Q]=n.COLOR_ATTACHMENT0+Q;de.length=se.length,Se=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,Se=!0);Se&&n.drawBuffers(de)}function et(D){return v!==D?(n.useProgram(D),v=D,!0):!1}let Zt={[fs]:n.FUNC_ADD,[pg]:n.FUNC_SUBTRACT,[fg]:n.FUNC_REVERSE_SUBTRACT};Zt[mg]=n.MIN,Zt[gg]=n.MAX;let R={[vg]:n.ZERO,[yg]:n.ONE,[bg]:n.SRC_COLOR,[Yl]:n.SRC_ALPHA,[Mg]:n.SRC_ALPHA_SATURATE,[wg]:n.DST_COLOR,[_g]:n.DST_ALPHA,[xg]:n.ONE_MINUS_SRC_COLOR,[Kl]:n.ONE_MINUS_SRC_ALPHA,[Eg]:n.ONE_MINUS_DST_COLOR,[Sg]:n.ONE_MINUS_DST_ALPHA,[Ag]:n.CONSTANT_COLOR,[Tg]:n.ONE_MINUS_CONSTANT_COLOR,[Cg]:n.CONSTANT_ALPHA,[Rg]:n.ONE_MINUS_CONSTANT_ALPHA};function bt(D,oe,de,Se,se,Q,Ee,ze,ft,rt){if(D===Yi){y===!0&&(ee(n.BLEND),y=!1);return}if(y===!1&&(k(n.BLEND),y=!0),D!==hg){if(D!==f||rt!==E){if((p!==fs||_!==fs)&&(n.blendEquation(n.FUNC_ADD),p=fs,_=fs),rt)switch(D){case zs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dh:n.blendFunc(n.ONE,n.ONE);break;case hh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ph:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case zs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case hh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ph:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,x=null,A=null,C=null,I.set(0,0,0),O=0,f=D,E=rt}return}se=se||oe,Q=Q||de,Ee=Ee||Se,(oe!==p||se!==_)&&(n.blendEquationSeparate(Zt[oe],Zt[se]),p=oe,_=se),(de!==M||Se!==x||Q!==A||Ee!==C)&&(n.blendFuncSeparate(R[de],R[Se],R[Q],R[Ee]),M=de,x=Se,A=Q,C=Ee),(ze.equals(I)===!1||ft!==O)&&(n.blendColor(ze.r,ze.g,ze.b,ft),I.copy(ze),O=ft),f=D,E=!1}function We(D,oe){D.side===En?ee(n.CULL_FACE):k(n.CULL_FACE);let de=D.side===Yt;oe&&(de=!de),Be(de),D.blending===zs&&D.transparent===!1?bt(Yi):bt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let Se=D.stencilWrite;o.setTest(Se),Se&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Te(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?k(n.SAMPLE_ALPHA_TO_COVERAGE):ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(D){w!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),w=D)}function Ae(D){D!==cg?(k(n.CULL_FACE),D!==P&&(D===ch?n.cullFace(n.BACK):D===ug?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ee(n.CULL_FACE),P=D}function xt(D){D!==B&&(Y&&n.lineWidth(D),B=D)}function Te(D,oe,de){D?(k(n.POLYGON_OFFSET_FILL),(q!==oe||G!==de)&&(n.polygonOffset(oe,de),q=oe,G=de)):ee(n.POLYGON_OFFSET_FILL)}function Ke(D){D?k(n.SCISSOR_TEST):ee(n.SCISSOR_TEST)}function Vt(D){D===void 0&&(D=n.TEXTURE0+J-1),ce!==D&&(n.activeTexture(D),ce=D)}function Mt(D,oe,de){de===void 0&&(ce===null?de=n.TEXTURE0+J-1:de=ce);let Se=N[de];Se===void 0&&(Se={type:void 0,texture:void 0},N[de]=Se),(Se.type!==D||Se.texture!==oe)&&(ce!==de&&(n.activeTexture(de),ce=de),n.bindTexture(D,oe||H[D]),Se.type=D,Se.texture=oe)}function T(){let D=N[ce];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function le(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ie(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(D){ue.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),ue.copy(D))}function Fe(D){Me.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Me.copy(D))}function Pe(D,oe){let de=c.get(oe);de===void 0&&(de=new WeakMap,c.set(oe,de));let Se=de.get(D);Se===void 0&&(Se=n.getUniformBlockIndex(oe,D.name),de.set(D,Se))}function pe(D,oe){let Se=c.get(oe).get(D);l.get(oe)!==Se&&(n.uniformBlockBinding(oe,Se,D.__bindingPointIndex),l.set(oe,Se))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ce=null,N={},u={},h=new WeakMap,g=[],v=null,y=!1,f=null,p=null,M=null,x=null,_=null,A=null,C=null,I=new ke(0,0,0),O=0,E=!1,w=null,P=null,B=null,q=null,G=null,ue.set(0,0,n.canvas.width,n.canvas.height),Me.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:k,disable:ee,bindFramebuffer:me,drawBuffers:be,useProgram:et,setBlending:bt,setMaterial:We,setFlipSided:Be,setCullFace:Ae,setLineWidth:xt,setPolygonOffset:Te,setScissorTest:Ke,activeTexture:Vt,bindTexture:Mt,unbindTexture:T,compressedTexImage2D:b,compressedTexImage3D:z,texImage2D:Ie,texImage3D:ae,updateUBOMapping:Pe,uniformBlockBinding:pe,texStorage2D:le,texStorage3D:Ce,texSubImage2D:Z,texSubImage3D:ne,compressedTexSubImage2D:K,compressedTexSubImage3D:Le,scissor:ge,viewport:Fe,reset:Xe}}function cM(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ne,d=new WeakMap,u,h=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,b){return g?new OffscreenCanvas(T,b):Gr("canvas")}function y(T,b,z){let Z=1,ne=Mt(T);if((ne.width>z||ne.height>z)&&(Z=z/Math.max(ne.width,ne.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let K=Math.floor(Z*ne.width),Le=Math.floor(Z*ne.height);u===void 0&&(u=v(K,Le));let le=b?v(K,Le):u;return le.width=K,le.height=Le,le.getContext("2d").drawImage(T,0,0,K,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+K+"x"+Le+")."),le}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),T;return T}function f(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(T,b,z,Z,ne=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=b;if(b===n.RED&&(z===n.FLOAT&&(K=n.R32F),z===n.HALF_FLOAT&&(K=n.R16F),z===n.UNSIGNED_BYTE&&(K=n.R8)),b===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.R8UI),z===n.UNSIGNED_SHORT&&(K=n.R16UI),z===n.UNSIGNED_INT&&(K=n.R32UI),z===n.BYTE&&(K=n.R8I),z===n.SHORT&&(K=n.R16I),z===n.INT&&(K=n.R32I)),b===n.RG&&(z===n.FLOAT&&(K=n.RG32F),z===n.HALF_FLOAT&&(K=n.RG16F),z===n.UNSIGNED_BYTE&&(K=n.RG8)),b===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RG8UI),z===n.UNSIGNED_SHORT&&(K=n.RG16UI),z===n.UNSIGNED_INT&&(K=n.RG32UI),z===n.BYTE&&(K=n.RG8I),z===n.SHORT&&(K=n.RG16I),z===n.INT&&(K=n.RG32I)),b===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RGB8UI),z===n.UNSIGNED_SHORT&&(K=n.RGB16UI),z===n.UNSIGNED_INT&&(K=n.RGB32UI),z===n.BYTE&&(K=n.RGB8I),z===n.SHORT&&(K=n.RGB16I),z===n.INT&&(K=n.RGB32I)),b===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),z===n.UNSIGNED_INT&&(K=n.RGBA32UI),z===n.BYTE&&(K=n.RGBA8I),z===n.SHORT&&(K=n.RGBA16I),z===n.INT&&(K=n.RGBA32I)),b===n.RGB&&(z===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),b===n.RGBA){let Le=ne?Ja:nt.getTransfer(Z);z===n.FLOAT&&(K=n.RGBA32F),z===n.HALF_FLOAT&&(K=n.RGBA16F),z===n.UNSIGNED_BYTE&&(K=Le===ot?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function _(T,b){let z;return T?b===null||b===_s||b===aa?z=n.DEPTH24_STENCIL8:b===Yn?z=n.DEPTH32F_STENCIL8:b===sa&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===_s||b===aa?z=n.DEPTH_COMPONENT24:b===Yn?z=n.DEPTH_COMPONENT32F:b===sa&&(z=n.DEPTH_COMPONENT16),z}function A(T,b){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==jt&&T.minFilter!==on?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function C(T){let b=T.target;b.removeEventListener("dispose",C),O(b),b.isVideoTexture&&d.delete(b)}function I(T){let b=T.target;b.removeEventListener("dispose",I),w(b)}function O(T){let b=i.get(T);if(b.__webglInit===void 0)return;let z=T.source,Z=h.get(z);if(Z){let ne=Z[b.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&E(T),Object.keys(Z).length===0&&h.delete(z)}i.remove(T)}function E(T){let b=i.get(T);n.deleteTexture(b.__webglTexture);let z=T.source,Z=h.get(z);delete Z[b.__cacheKey],a.memory.textures--}function w(T){let b=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(b.__webglFramebuffer[Z]))for(let ne=0;ne<b.__webglFramebuffer[Z].length;ne++)n.deleteFramebuffer(b.__webglFramebuffer[Z][ne]);else n.deleteFramebuffer(b.__webglFramebuffer[Z]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[Z])}else{if(Array.isArray(b.__webglFramebuffer))for(let Z=0;Z<b.__webglFramebuffer.length;Z++)n.deleteFramebuffer(b.__webglFramebuffer[Z]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Z=0;Z<b.__webglColorRenderbuffer.length;Z++)b.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[Z]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let z=T.textures;for(let Z=0,ne=z.length;Z<ne;Z++){let K=i.get(z[Z]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),a.memory.textures--),i.remove(z[Z])}i.remove(T)}let P=0;function B(){P=0}function q(){let T=P;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function G(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function J(T,b){let z=i.get(T);if(T.isVideoTexture&&Ke(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){let Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(z,T,b);return}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+b)}function Y(T,b){let z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){H(z,T,b);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+b)}function ie(T,b){let z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){H(z,T,b);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+b)}function W(T,b){let z=i.get(T);if(T.version>0&&z.__version!==T.version){k(z,T,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+b)}let ce={[ms]:n.REPEAT,[mi]:n.CLAMP_TO_EDGE,[Hr]:n.MIRRORED_REPEAT},N={[jt]:n.NEAREST,[Ac]:n.NEAREST_MIPMAP_NEAREST,[sr]:n.NEAREST_MIPMAP_LINEAR,[on]:n.LINEAR,[ia]:n.LINEAR_MIPMAP_NEAREST,[ui]:n.LINEAR_MIPMAP_LINEAR},V={[qg]:n.NEVER,[Zg]:n.ALWAYS,[jg]:n.LESS,[wh]:n.LEQUAL,[Xg]:n.EQUAL,[Jg]:n.GEQUAL,[Yg]:n.GREATER,[Kg]:n.NOTEQUAL};function te(T,b){if(b.type===Yn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===on||b.magFilter===ia||b.magFilter===sr||b.magFilter===ui||b.minFilter===on||b.minFilter===ia||b.minFilter===sr||b.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ce[b.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ce[b.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ce[b.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,N[b.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,N[b.minFilter]),b.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,V[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===jt||b.minFilter!==sr&&b.minFilter!==ui||b.type===Yn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function ue(T,b){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",C));let Z=b.source,ne=h.get(Z);ne===void 0&&(ne={},h.set(Z,ne));let K=G(b);if(K!==T.__cacheKey){ne[K]===void 0&&(ne[K]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ne[K].usedTimes++;let Le=ne[T.__cacheKey];Le!==void 0&&(ne[T.__cacheKey].usedTimes--,Le.usedTimes===0&&E(b)),T.__cacheKey=K,T.__webglTexture=ne[K].texture}return z}function Me(T,b,z){return Math.floor(Math.floor(T/z)/b)}function ve(T,b,z,Z){let K=T.updateRanges;if(K.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,z,Z,b.data);else{K.sort((ae,ge)=>ae.start-ge.start);let Le=0;for(let ae=1;ae<K.length;ae++){let ge=K[Le],Fe=K[ae],Pe=ge.start+ge.count,pe=Me(Fe.start,b.width,4),Xe=Me(ge.start,b.width,4);Fe.start<=Pe+1&&pe===Xe&&Me(Fe.start+Fe.count-1,b.width,4)===pe?ge.count=Math.max(ge.count,Fe.start+Fe.count-ge.start):(++Le,K[Le]=Fe)}K.length=Le+1;let le=n.getParameter(n.UNPACK_ROW_LENGTH),Ce=n.getParameter(n.UNPACK_SKIP_PIXELS),Ie=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let ae=0,ge=K.length;ae<ge;ae++){let Fe=K[ae],Pe=Math.floor(Fe.start/4),pe=Math.ceil(Fe.count/4),Xe=Pe%b.width,D=Math.floor(Pe/b.width),oe=pe,de=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Xe,D,oe,de,z,Z,b.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,le),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ce),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ie)}}function H(T,b,z){let Z=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Z=n.TEXTURE_3D);let ne=ue(T,b),K=b.source;t.bindTexture(Z,T.__webglTexture,n.TEXTURE0+z);let Le=i.get(K);if(K.version!==Le.__version||ne===!0){t.activeTexture(n.TEXTURE0+z);let le=nt.getPrimaries(nt.workingColorSpace),Ce=b.colorSpace===Ji?null:nt.getPrimaries(b.colorSpace),Ie=b.colorSpace===Ji||le===Ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let ae=y(b.image,!1,s.maxTextureSize);ae=Vt(b,ae);let ge=r.convert(b.format,b.colorSpace),Fe=r.convert(b.type),Pe=x(b.internalFormat,ge,Fe,b.colorSpace,b.isVideoTexture);te(Z,b);let pe,Xe=b.mipmaps,D=b.isVideoTexture!==!0,oe=Le.__version===void 0||ne===!0,de=K.dataReady,Se=A(b,ae);if(b.isDepthTexture)Pe=_(b.format===oa,b.type),oe&&(D?t.texStorage2D(n.TEXTURE_2D,1,Pe,ae.width,ae.height):t.texImage2D(n.TEXTURE_2D,0,Pe,ae.width,ae.height,0,ge,Fe,null));else if(b.isDataTexture)if(Xe.length>0){D&&oe&&t.texStorage2D(n.TEXTURE_2D,Se,Pe,Xe[0].width,Xe[0].height);for(let se=0,Q=Xe.length;se<Q;se++)pe=Xe[se],D?de&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,Fe,pe.data):t.texImage2D(n.TEXTURE_2D,se,Pe,pe.width,pe.height,0,ge,Fe,pe.data);b.generateMipmaps=!1}else D?(oe&&t.texStorage2D(n.TEXTURE_2D,Se,Pe,ae.width,ae.height),de&&ve(b,ae,ge,Fe)):t.texImage2D(n.TEXTURE_2D,0,Pe,ae.width,ae.height,0,ge,Fe,ae.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){D&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Pe,Xe[0].width,Xe[0].height,ae.depth);for(let se=0,Q=Xe.length;se<Q;se++)if(pe=Xe[se],b.format!==On)if(ge!==null)if(D){if(de)if(b.layerUpdates.size>0){let Ee=Ih(pe.width,pe.height,b.format,b.type);for(let ze of b.layerUpdates){let ft=pe.data.subarray(ze*Ee/pe.data.BYTES_PER_ELEMENT,(ze+1)*Ee/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,ze,pe.width,pe.height,1,ge,ft)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,ae.depth,ge,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Pe,pe.width,pe.height,ae.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?de&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,ae.depth,ge,Fe,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Pe,pe.width,pe.height,ae.depth,0,ge,Fe,pe.data)}else{D&&oe&&t.texStorage2D(n.TEXTURE_2D,Se,Pe,Xe[0].width,Xe[0].height);for(let se=0,Q=Xe.length;se<Q;se++)pe=Xe[se],b.format!==On?ge!==null?D?de&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Pe,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?de&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,Fe,pe.data):t.texImage2D(n.TEXTURE_2D,se,Pe,pe.width,pe.height,0,ge,Fe,pe.data)}else if(b.isDataArrayTexture)if(D){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Pe,ae.width,ae.height,ae.depth),de)if(b.layerUpdates.size>0){let se=Ih(ae.width,ae.height,b.format,b.type);for(let Q of b.layerUpdates){let Ee=ae.data.subarray(Q*se/ae.data.BYTES_PER_ELEMENT,(Q+1)*se/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,ae.width,ae.height,1,ge,Fe,Ee)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,ge,Fe,ae.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,ae.width,ae.height,ae.depth,0,ge,Fe,ae.data);else if(b.isData3DTexture)D?(oe&&t.texStorage3D(n.TEXTURE_3D,Se,Pe,ae.width,ae.height,ae.depth),de&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,ge,Fe,ae.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,ae.width,ae.height,ae.depth,0,ge,Fe,ae.data);else if(b.isFramebufferTexture){if(oe)if(D)t.texStorage2D(n.TEXTURE_2D,Se,Pe,ae.width,ae.height);else{let se=ae.width,Q=ae.height;for(let Ee=0;Ee<Se;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,Pe,se,Q,0,ge,Fe,null),se>>=1,Q>>=1}}else if(Xe.length>0){if(D&&oe){let se=Mt(Xe[0]);t.texStorage2D(n.TEXTURE_2D,Se,Pe,se.width,se.height)}for(let se=0,Q=Xe.length;se<Q;se++)pe=Xe[se],D?de&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,ge,Fe,pe):t.texImage2D(n.TEXTURE_2D,se,Pe,ge,Fe,pe);b.generateMipmaps=!1}else if(D){if(oe){let se=Mt(ae);t.texStorage2D(n.TEXTURE_2D,Se,Pe,se.width,se.height)}de&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Fe,ae)}else t.texImage2D(n.TEXTURE_2D,0,Pe,ge,Fe,ae);f(b)&&p(Z),Le.__version=K.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function k(T,b,z){if(b.image.length!==6)return;let Z=ue(T,b),ne=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+z);let K=i.get(ne);if(ne.version!==K.__version||Z===!0){t.activeTexture(n.TEXTURE0+z);let Le=nt.getPrimaries(nt.workingColorSpace),le=b.colorSpace===Ji?null:nt.getPrimaries(b.colorSpace),Ce=b.colorSpace===Ji||Le===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let Ie=b.isCompressedTexture||b.image[0].isCompressedTexture,ae=b.image[0]&&b.image[0].isDataTexture,ge=[];for(let Q=0;Q<6;Q++)!Ie&&!ae?ge[Q]=y(b.image[Q],!0,s.maxCubemapSize):ge[Q]=ae?b.image[Q].image:b.image[Q],ge[Q]=Vt(b,ge[Q]);let Fe=ge[0],Pe=r.convert(b.format,b.colorSpace),pe=r.convert(b.type),Xe=x(b.internalFormat,Pe,pe,b.colorSpace),D=b.isVideoTexture!==!0,oe=K.__version===void 0||Z===!0,de=ne.dataReady,Se=A(b,Fe);te(n.TEXTURE_CUBE_MAP,b);let se;if(Ie){D&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,Xe,Fe.width,Fe.height);for(let Q=0;Q<6;Q++){se=ge[Q].mipmaps;for(let Ee=0;Ee<se.length;Ee++){let ze=se[Ee];b.format!==On?Pe!==null?D?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,0,0,ze.width,ze.height,Pe,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,Xe,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,0,0,ze.width,ze.height,Pe,pe,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee,Xe,ze.width,ze.height,0,Pe,pe,ze.data)}}}else{if(se=b.mipmaps,D&&oe){se.length>0&&Se++;let Q=Mt(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,Xe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ae){D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ge[Q].width,ge[Q].height,Pe,pe,ge[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Xe,ge[Q].width,ge[Q].height,0,Pe,pe,ge[Q].data);for(let Ee=0;Ee<se.length;Ee++){let ft=se[Ee].image[Q].image;D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,0,0,ft.width,ft.height,Pe,pe,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,Xe,ft.width,ft.height,0,Pe,pe,ft.data)}}else{D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pe,pe,ge[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Xe,Pe,pe,ge[Q]);for(let Ee=0;Ee<se.length;Ee++){let ze=se[Ee];D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,0,0,Pe,pe,ze.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ee+1,Xe,Pe,pe,ze.image[Q])}}}f(b)&&p(n.TEXTURE_CUBE_MAP),K.__version=ne.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function ee(T,b,z,Z,ne,K){let Le=r.convert(z.format,z.colorSpace),le=r.convert(z.type),Ce=x(z.internalFormat,Le,le,z.colorSpace),Ie=i.get(b),ae=i.get(z);if(ae.__renderTarget=b,!Ie.__hasExternalTextures){let ge=Math.max(1,b.width>>K),Fe=Math.max(1,b.height>>K);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,K,Ce,ge,Fe,b.depth,0,Le,le,null):t.texImage2D(ne,K,Ce,ge,Fe,0,Le,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),Te(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,ne,ae.__webglTexture,0,xt(b)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,ne,ae.__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function me(T,b,z){if(n.bindRenderbuffer(n.RENDERBUFFER,T),b.depthBuffer){let Z=b.depthTexture,ne=Z&&Z.isDepthTexture?Z.type:null,K=_(b.stencilBuffer,ne),Le=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=xt(b);Te(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,K,b.width,b.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,K,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,K,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Le,n.RENDERBUFFER,T)}else{let Z=b.textures;for(let ne=0;ne<Z.length;ne++){let K=Z[ne],Le=r.convert(K.format,K.colorSpace),le=r.convert(K.type),Ce=x(K.internalFormat,Le,le,K.colorSpace),Ie=xt(b);z&&Te(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie,Ce,b.width,b.height):Te(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie,Ce,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Ce,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function be(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=i.get(b.depthTexture);Z.__renderTarget=b,(!Z.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J(b.depthTexture,0);let ne=Z.__webglTexture,K=xt(b);if(b.depthTexture.format===zr)Te(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(b.depthTexture.format===oa)Te(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function et(T){let b=i.get(T),z=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){let Z=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Z){let ne=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Z.removeEventListener("dispose",ne)};Z.addEventListener("dispose",ne),b.__depthDisposeCallback=ne}b.__boundDepthTexture=Z}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let Z=T.texture.mipmaps;Z&&Z.length>0?be(b.__webglFramebuffer[0],T):be(b.__webglFramebuffer,T)}else if(z){b.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[Z]),b.__webglDepthbuffer[Z]===void 0)b.__webglDepthbuffer[Z]=n.createRenderbuffer(),me(b.__webglDepthbuffer[Z],T,!1);else{let ne=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,K)}}else{let Z=T.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),me(b.__webglDepthbuffer,T,!1);else{let ne=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,K)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Zt(T,b,z){let Z=i.get(T);b!==void 0&&ee(Z.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&et(T)}function R(T){let b=T.texture,z=i.get(T),Z=i.get(b);T.addEventListener("dispose",I);let ne=T.textures,K=T.isWebGLCubeRenderTarget===!0,Le=ne.length>1;if(Le||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=b.version,a.memory.textures++),K){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let Ce=0;Ce<b.mipmaps.length;Ce++)z.__webglFramebuffer[le][Ce]=n.createFramebuffer()}else z.__webglFramebuffer[le]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<b.mipmaps.length;le++)z.__webglFramebuffer[le]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Le)for(let le=0,Ce=ne.length;le<Ce;le++){let Ie=i.get(ne[le]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Te(T)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let le=0;le<ne.length;le++){let Ce=ne[le];z.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[le]);let Ie=r.convert(Ce.format,Ce.colorSpace),ae=r.convert(Ce.type),ge=x(Ce.internalFormat,Ie,ae,Ce.colorSpace,T.isXRRenderTarget===!0),Fe=xt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,ge,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,z.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),me(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),te(n.TEXTURE_CUBE_MAP,b);for(let le=0;le<6;le++)if(b.mipmaps&&b.mipmaps.length>0)for(let Ce=0;Ce<b.mipmaps.length;Ce++)ee(z.__webglFramebuffer[le][Ce],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ce);else ee(z.__webglFramebuffer[le],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);f(b)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let le=0,Ce=ne.length;le<Ce;le++){let Ie=ne[le],ae=i.get(Ie),ge=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ge=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,ae.__webglTexture),te(ge,Ie),ee(z.__webglFramebuffer,T,Ie,n.COLOR_ATTACHMENT0+le,ge,0),f(Ie)&&p(ge)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,Z.__webglTexture),te(le,b),b.mipmaps&&b.mipmaps.length>0)for(let Ce=0;Ce<b.mipmaps.length;Ce++)ee(z.__webglFramebuffer[Ce],T,b,n.COLOR_ATTACHMENT0,le,Ce);else ee(z.__webglFramebuffer,T,b,n.COLOR_ATTACHMENT0,le,0);f(b)&&p(le),t.unbindTexture()}T.depthBuffer&&et(T)}function bt(T){let b=T.textures;for(let z=0,Z=b.length;z<Z;z++){let ne=b[z];if(f(ne)){let K=M(T),Le=i.get(ne).__webglTexture;t.bindTexture(K,Le),p(K),t.unbindTexture()}}}let We=[],Be=[];function Ae(T){if(T.samples>0){if(Te(T)===!1){let b=T.textures,z=T.width,Z=T.height,ne=n.COLOR_BUFFER_BIT,K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Le=i.get(T),le=b.length>1;if(le)for(let Ie=0;Ie<b.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);let Ce=T.texture.mipmaps;Ce&&Ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Ie=0;Ie<b.length;Ie++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Le.__webglColorRenderbuffer[Ie]);let ae=i.get(b[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ae,0)}n.blitFramebuffer(0,0,z,Z,0,0,z,Z,ne,n.NEAREST),l===!0&&(We.length=0,Be.length=0,We.push(n.COLOR_ATTACHMENT0+Ie),T.depthBuffer&&T.resolveDepthBuffer===!1&&(We.push(K),Be.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Be)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,We))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let Ie=0;Ie<b.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,Le.__webglColorRenderbuffer[Ie]);let ae=i.get(b[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let b=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function xt(T){return Math.min(s.maxSamples,T.samples)}function Te(T){let b=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ke(T){let b=a.render.frame;d.get(T)!==b&&(d.set(T,b),T.update())}function Vt(T,b){let z=T.colorSpace,Z=T.format,ne=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Xt&&z!==Ji&&(nt.getTransfer(z)===ot?(Z!==On||ne!==di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),b}function Mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=B,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=ie,this.setTextureCube=W,this.rebindTextures=Zt,this.setupRenderTarget=R,this.updateRenderTargetMipmap=bt,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=Te}function uM(n,e){function t(i,s=Ji){let r,a=nt.getTransfer(s);if(i===di)return n.UNSIGNED_BYTE;if(i===Cc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Rc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===mh)return n.BYTE;if(i===gh)return n.SHORT;if(i===sa)return n.UNSIGNED_SHORT;if(i===Tc)return n.INT;if(i===_s)return n.UNSIGNED_INT;if(i===Yn)return n.FLOAT;if(i===ra)return n.HALF_FLOAT;if(i===bh)return n.ALPHA;if(i===xh)return n.RGB;if(i===On)return n.RGBA;if(i===zr)return n.DEPTH_COMPONENT;if(i===oa)return n.DEPTH_STENCIL;if(i===Ic)return n.RED;if(i===Pc)return n.RED_INTEGER;if(i===_h)return n.RG;if(i===Lc)return n.RG_INTEGER;if(i===Nc)return n.RGBA_INTEGER;if(i===Co||i===Ro||i===Io||i===Po)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Co)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Co)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Dc||i===Oc||i===kc||i===Uc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Dc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Oc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===kc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Uc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fc||i===Bc||i===$c)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Fc||i===Bc)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===$c)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Vc||i===Hc||i===zc||i===Gc||i===Wc||i===qc||i===jc||i===Xc||i===Yc||i===Kc||i===Jc||i===Zc||i===Qc||i===eu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Vc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Hc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===zc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===jc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Kc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Jc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qc)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===eu)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===tu||i===nu||i===iu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===tu)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===nu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===iu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===su||i===ru||i===au||i===ou)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===su)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ru)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===au)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ou)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===aa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var dM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hM=`
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

}`,zh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new po(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ci({vertexShader:dM,fragmentShader:hM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Js(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Gh=class extends li{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,g=null,v=null,y=typeof XRWebGLBinding<"u",f=new zh,p={},M=t.getContextAttributes(),x=null,_=null,A=[],C=[],I=new Ne,O=null,E=new Pt;E.viewport=new st;let w=new Pt;w.viewport=new st;let P=[E,w],B=new hc,q=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let k=A[H];return k===void 0&&(k=new Xr,A[H]=k),k.getTargetRaySpace()},this.getControllerGrip=function(H){let k=A[H];return k===void 0&&(k=new Xr,A[H]=k),k.getGripSpace()},this.getHand=function(H){let k=A[H];return k===void 0&&(k=new Xr,A[H]=k),k.getHandSpace()};function J(H){let k=C.indexOf(H.inputSource);if(k===-1)return;let ee=A[k];ee!==void 0&&(ee.update(H.inputSource,H.frame,c||a),ee.dispatchEvent({type:H.type,data:H.inputSource}))}function Y(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",ie);for(let H=0;H<A.length;H++){let k=C[H];k!==null&&(C[H]=null,A[H].disconnect(k))}q=null,G=null,f.reset();for(let H in p)delete p[H];e.setRenderTarget(x),g=null,h=null,u=null,s=null,_=null,ve.stop(),i.isPresenting=!1,e.setPixelRatio(O),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(x=e.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",ie),M.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,me=null,be=null;M.depth&&(be=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=M.stencil?oa:zr,me=M.stencil?aa:_s);let et={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(et),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new vi(h.textureWidth,h.textureHeight,{format:On,type:di,depthTexture:new ho(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let ee={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),_=new vi(g.framebufferWidth,g.framebufferHeight,{format:On,type:di,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ve.setContext(s),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function ie(H){for(let k=0;k<H.removed.length;k++){let ee=H.removed[k],me=C.indexOf(ee);me>=0&&(C[me]=null,A[me].disconnect(ee))}for(let k=0;k<H.added.length;k++){let ee=H.added[k],me=C.indexOf(ee);if(me===-1){for(let et=0;et<A.length;et++)if(et>=C.length){C.push(ee),me=et;break}else if(C[et]===null){C[et]=ee,me=et;break}if(me===-1)break}let be=A[me];be&&be.connect(ee)}}let W=new L,ce=new L;function N(H,k,ee){W.setFromMatrixPosition(k.matrixWorld),ce.setFromMatrixPosition(ee.matrixWorld);let me=W.distanceTo(ce),be=k.projectionMatrix.elements,et=ee.projectionMatrix.elements,Zt=be[14]/(be[10]-1),R=be[14]/(be[10]+1),bt=(be[9]+1)/be[5],We=(be[9]-1)/be[5],Be=(be[8]-1)/be[0],Ae=(et[8]+1)/et[0],xt=Zt*Be,Te=Zt*Ae,Ke=me/(-Be+Ae),Vt=Ke*-Be;if(k.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Vt),H.translateZ(Ke),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),be[10]===-1)H.projectionMatrix.copy(k.projectionMatrix),H.projectionMatrixInverse.copy(k.projectionMatrixInverse);else{let Mt=Zt+Ke,T=R+Ke,b=xt-Vt,z=Te+(me-Vt),Z=bt*R/T*Mt,ne=We*R/T*Mt;H.projectionMatrix.makePerspective(b,z,Z,ne,Mt,T),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function V(H,k){k===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(k.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let k=H.near,ee=H.far;f.texture!==null&&(f.depthNear>0&&(k=f.depthNear),f.depthFar>0&&(ee=f.depthFar)),B.near=w.near=E.near=k,B.far=w.far=E.far=ee,(q!==B.near||G!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),q=B.near,G=B.far),B.layers.mask=H.layers.mask|6,E.layers.mask=B.layers.mask&3,w.layers.mask=B.layers.mask&5;let me=H.parent,be=B.cameras;V(B,me);for(let et=0;et<be.length;et++)V(be[et],me);be.length===2?N(B,E,w):B.projectionMatrix.copy(E.projectionMatrix),te(H,B,me)};function te(H,k,ee){ee===null?H.matrix.copy(k.matrixWorld):(H.matrix.copy(ee.matrixWorld),H.matrix.invert(),H.matrix.multiply(k.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(k.projectionMatrix),H.projectionMatrixInverse.copy(k.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=js*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&g===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=H)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(H){return p[H]};let ue=null;function Me(H,k){if(d=k.getViewerPose(c||a),v=k,d!==null){let ee=d.views;g!==null&&(e.setRenderTargetFramebuffer(_,g.framebuffer),e.setRenderTarget(_));let me=!1;ee.length!==B.cameras.length&&(B.cameras.length=0,me=!0);for(let R=0;R<ee.length;R++){let bt=ee[R],We=null;if(g!==null)We=g.getViewport(bt);else{let Ae=u.getViewSubImage(h,bt);We=Ae.viewport,R===0&&(e.setRenderTargetTextures(_,Ae.colorTexture,Ae.depthStencilTexture),e.setRenderTarget(_))}let Be=P[R];Be===void 0&&(Be=new Pt,Be.layers.enable(R),Be.viewport=new st,P[R]=Be),Be.matrix.fromArray(bt.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(bt.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(We.x,We.y,We.width,We.height),R===0&&(B.matrix.copy(Be.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),me===!0&&B.cameras.push(Be)}let be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=i.getBinding();let R=u.getDepthInformation(ee[0]);R&&R.isValid&&R.texture&&f.init(R,s.renderState)}if(be&&be.includes("camera-access")&&y){e.state.unbindTexture(),u=i.getBinding();for(let R=0;R<ee.length;R++){let bt=ee[R].camera;if(bt){let We=p[bt];We||(We=new po,p[bt]=We);let Be=u.getCameraImage(bt);We.sourceTexture=Be}}}}for(let ee=0;ee<A.length;ee++){let me=C[ee],be=A[ee];me!==null&&be!==void 0&&be.update(me,k,c||a)}ue&&ue(H,k),k.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:k}),v=null}let ve=new Cv;ve.setAnimationLoop(Me),this.setAnimationLoop=function(H){ue=H},this.dispose=function(){}}},or=new Xn,pM=new qe;function fM(n,e){function t(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function i(f,p){p.color.getRGB(f.fogColor.value,Th(n)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function s(f,p,M,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(f,p):p.isMeshToonMaterial?(r(f,p),u(f,p)):p.isMeshPhongMaterial?(r(f,p),d(f,p)):p.isMeshStandardMaterial?(r(f,p),h(f,p),p.isMeshPhysicalMaterial&&g(f,p,_)):p.isMeshMatcapMaterial?(r(f,p),v(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),y(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&o(f,p)):p.isPointsMaterial?l(f,p,M,x):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,t(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===Yt&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,t(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===Yt&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,t(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,t(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);let M=e.get(p),x=M.envMap,_=M.envMapRotation;x&&(f.envMap.value=x,or.copy(_),or.x*=-1,or.y*=-1,or.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(or.y*=-1,or.z*=-1),f.envMapRotation.value.setFromMatrix4(pM.makeRotationFromEuler(or)),f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform))}function o(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,M,x){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*M,f.scale.value=x*.5,p.map&&(f.map.value=p.map,t(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function d(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function u(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function h(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function g(f,p,M){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yt&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,f.specularIntensityMapTransform))}function v(f,p){p.matcap&&(f.matcap.value=p.matcap)}function y(f,p){let M=e.get(p).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function mM(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,x){let _=x.program;i.uniformBlockBinding(M,_)}function c(M,x){let _=s[M.id];_===void 0&&(v(M),_=d(M),s[M.id]=_,M.addEventListener("dispose",f));let A=x.program;i.updateUBOMapping(M,A);let C=e.render.frame;r[M.id]!==C&&(h(M),r[M.id]=C)}function d(M){let x=u();M.__bindingPointIndex=x;let _=n.createBuffer(),A=M.__size,C=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,A,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,_),_}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let x=s[M.id],_=M.uniforms,A=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let C=0,I=_.length;C<I;C++){let O=Array.isArray(_[C])?_[C]:[_[C]];for(let E=0,w=O.length;E<w;E++){let P=O[E];if(g(P,C,E,A)===!0){let B=P.__offset,q=Array.isArray(P.value)?P.value:[P.value],G=0;for(let J=0;J<q.length;J++){let Y=q[J],ie=y(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,B+G,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,G),G+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(M,x,_,A){let C=M.value,I=x+"_"+_;if(A[I]===void 0)return typeof C=="number"||typeof C=="boolean"?A[I]=C:A[I]=C.clone(),!0;{let O=A[I];if(typeof C=="number"||typeof C=="boolean"){if(O!==C)return A[I]=C,!0}else if(O.equals(C)===!1)return O.copy(C),!0}return!1}function v(M){let x=M.uniforms,_=0,A=16;for(let I=0,O=x.length;I<O;I++){let E=Array.isArray(x[I])?x[I]:[x[I]];for(let w=0,P=E.length;w<P;w++){let B=E[w],q=Array.isArray(B.value)?B.value:[B.value];for(let G=0,J=q.length;G<J;G++){let Y=q[G],ie=y(Y),W=_%A,ce=W%ie.boundary,N=W+ce;_+=ce,N!==0&&A-N<ie.storage&&(_+=A-N),B.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=_,_+=ie.storage}}}let C=_%A;return C>0&&(_+=A-C),M.__size=_,M.__cache={},this}function y(M){let x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function f(M){let x=M.target;x.removeEventListener("dispose",f);let _=a.indexOf(x.__bindingPointIndex);a.splice(_,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(let M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var pu=class{constructor(e={}){let{canvas:t=Qg(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let v=new Uint32Array(4),y=new Int32Array(4),f=null,p=null,M=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,A=!1;this._outputColorSpace=At;let C=0,I=0,O=null,E=-1,w=null,P=new st,B=new st,q=null,G=new ke(0),J=0,Y=t.width,ie=t.height,W=1,ce=null,N=null,V=new st(0,0,Y,ie),te=new st(0,0,Y,ie),ue=!1,Me=new Zr,ve=!1,H=!1,k=new qe,ee=new L,me=new st,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function Zt(){return O===null?W:1}let R=i;function bt(S,U){return t.getContext(S,U)}try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",se,!1),R===null){let U="webgl2";if(R=bt(U,S),R===null)throw bt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let We,Be,Ae,xt,Te,Ke,Vt,Mt,T,b,z,Z,ne,K,Le,le,Ce,Ie,ae,ge,Fe,Pe,pe,Xe;function D(){We=new Nw(R),We.init(),Pe=new uM(R,We),Be=new Aw(R,We,e,Pe),Ae=new lM(R,We),Be.reversedDepthBuffer&&h&&Ae.buffers.depth.setReversed(!0),xt=new kw(R),Te=new YE,Ke=new cM(R,We,Ae,Te,Be,Pe,xt),Vt=new Cw(_),Mt=new Lw(_),T=new H0(R),pe=new Ew(R,T),b=new Dw(R,T,xt,pe),z=new Fw(R,b,T,xt),ae=new Uw(R,Be,Ke),le=new Tw(Te),Z=new XE(_,Vt,Mt,We,Be,pe,le),ne=new fM(_,Te),K=new JE,Le=new iM(We),Ie=new ww(_,Vt,Mt,Ae,z,g,l),Ce=new aM(_,z,Be),Xe=new mM(R,xt,Be,Ae),ge=new Mw(R,We,xt),Fe=new Ow(R,We,xt),xt.programs=Z.programs,_.capabilities=Be,_.extensions=We,_.properties=Te,_.renderLists=K,_.shadowMap=Ce,_.state=Ae,_.info=xt}D();let oe=new Gh(_,R);this.xr=oe,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let S=We.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=We.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(Y,ie,!1))},this.getSize=function(S){return S.set(Y,ie)},this.setSize=function(S,U,j=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=S,ie=U,t.width=Math.floor(S*W),t.height=Math.floor(U*W),j===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(Y*W,ie*W).floor()},this.setDrawingBufferSize=function(S,U,j){Y=S,ie=U,W=j,t.width=Math.floor(S*j),t.height=Math.floor(U*j),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(V)},this.setViewport=function(S,U,j,X){S.isVector4?V.set(S.x,S.y,S.z,S.w):V.set(S,U,j,X),Ae.viewport(P.copy(V).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(te)},this.setScissor=function(S,U,j,X){S.isVector4?te.set(S.x,S.y,S.z,S.w):te.set(S,U,j,X),Ae.scissor(B.copy(te).multiplyScalar(W).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(S){Ae.setScissorTest(ue=S)},this.setOpaqueSort=function(S){ce=S},this.setTransparentSort=function(S){N=S},this.getClearColor=function(S){return S.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,j=!0){let X=0;if(S){let F=!1;if(O!==null){let re=O.texture.format;F=re===Nc||re===Lc||re===Pc}if(F){let re=O.texture.type,fe=re===di||re===_s||re===sa||re===aa||re===Cc||re===Rc,we=Ie.getClearColor(),ye=Ie.getClearAlpha(),Ue=we.r,$e=we.g,De=we.b;fe?(v[0]=Ue,v[1]=$e,v[2]=De,v[3]=ye,R.clearBufferuiv(R.COLOR,0,v)):(y[0]=Ue,y[1]=$e,y[2]=De,y[3]=ye,R.clearBufferiv(R.COLOR,0,y))}else X|=R.COLOR_BUFFER_BIT}U&&(X|=R.DEPTH_BUFFER_BIT),j&&(X|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",se,!1),Ie.dispose(),K.dispose(),Le.dispose(),Te.dispose(),Vt.dispose(),Mt.dispose(),z.dispose(),pe.dispose(),Xe.dispose(),Z.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",fi),oe.removeEventListener("sessionend",bm),Ds.stop()};function de(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let S=xt.autoReset,U=Ce.enabled,j=Ce.autoUpdate,X=Ce.needsUpdate,F=Ce.type;D(),xt.autoReset=S,Ce.enabled=U,Ce.autoUpdate=j,Ce.needsUpdate=X,Ce.type=F}function se(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Q(S){let U=S.target;U.removeEventListener("dispose",Q),Ee(U)}function Ee(S){ze(S),Te.remove(S)}function ze(S){let U=Te.get(S).programs;U!==void 0&&(U.forEach(function(j){Z.releaseProgram(j)}),S.isShaderMaterial&&Z.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,j,X,F,re){U===null&&(U=be);let fe=F.isMesh&&F.matrixWorld.determinant()<0,we=Lx(S,U,j,X,F);Ae.setMaterial(X,fe);let ye=j.index,Ue=1;if(X.wireframe===!0){if(ye=b.getWireframeAttribute(j),ye===void 0)return;Ue=2}let $e=j.drawRange,De=j.attributes.position,tt=$e.start*Ue,ct=($e.start+$e.count)*Ue;re!==null&&(tt=Math.max(tt,re.start*Ue),ct=Math.min(ct,(re.start+re.count)*Ue)),ye!==null?(tt=Math.max(tt,0),ct=Math.min(ct,ye.count)):De!=null&&(tt=Math.max(tt,0),ct=Math.min(ct,De.count));let wt=ct-tt;if(wt<0||wt===1/0)return;pe.setup(F,X,we,j,ye);let vt,ht=ge;if(ye!==null&&(vt=T.get(ye),ht=Fe,ht.setIndex(vt)),F.isMesh)X.wireframe===!0?(Ae.setLineWidth(X.wireframeLinewidth*Zt()),ht.setMode(R.LINES)):ht.setMode(R.TRIANGLES);else if(F.isLine){let Oe=X.linewidth;Oe===void 0&&(Oe=1),Ae.setLineWidth(Oe*Zt()),F.isLineSegments?ht.setMode(R.LINES):F.isLineLoop?ht.setMode(R.LINE_LOOP):ht.setMode(R.LINE_STRIP)}else F.isPoints?ht.setMode(R.POINTS):F.isSprite&&ht.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Wr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))ht.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Oe=F._multiDrawStarts,_t=F._multiDrawCounts,it=F._multiDrawCount,In=ye?T.get(ye).bytesPerElement:1,Ar=Te.get(X).currentProgram.getUniforms();for(let Pn=0;Pn<it;Pn++)Ar.setValue(R,"_gl_DrawID",Pn),ht.render(Oe[Pn]/In,_t[Pn])}else if(F.isInstancedMesh)ht.renderInstances(tt,wt,F.count);else if(j.isInstancedBufferGeometry){let Oe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,_t=Math.min(j.instanceCount,Oe);ht.renderInstances(tt,wt,_t)}else ht.render(tt,wt)};function ft(S,U,j){S.transparent===!0&&S.side===En&&S.forceSinglePass===!1?(S.side=Yt,S.needsUpdate=!0,wl(S,U,j),S.side=oi,S.needsUpdate=!0,wl(S,U,j),S.side=En):wl(S,U,j)}this.compile=function(S,U,j=null){j===null&&(j=S),p=Le.get(j),p.init(U),x.push(p),j.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),S!==j&&S.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let X=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let re=F.material;if(re)if(Array.isArray(re))for(let fe=0;fe<re.length;fe++){let we=re[fe];ft(we,j,F),X.add(we)}else ft(re,j,F),X.add(re)}),p=x.pop(),X},this.compileAsync=function(S,U,j=null){let X=this.compile(S,U,j);return new Promise(F=>{function re(){if(X.forEach(function(fe){Te.get(fe).currentProgram.isReady()&&X.delete(fe)}),X.size===0){F(S);return}setTimeout(re,10)}We.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let rt=null;function Ui(S){rt&&rt(S)}function fi(){Ds.stop()}function bm(){Ds.start()}let Ds=new Cv;Ds.setAnimationLoop(Ui),typeof self<"u"&&Ds.setContext(self),this.setAnimationLoop=function(S){rt=S,oe.setAnimationLoop(S),S===null?Ds.stop():Ds.start()},oe.addEventListener("sessionstart",fi),oe.addEventListener("sessionend",bm),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(U),U=oe.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,U,O),p=Le.get(S,x.length),p.init(U),x.push(p),k.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Me.setFromProjectionMatrix(k,si,U.reversedDepth),H=this.localClippingEnabled,ve=le.init(this.clippingPlanes,H),f=K.get(S,M.length),f.init(),M.push(f),oe.enabled===!0&&oe.isPresenting===!0){let re=_.xr.getDepthSensingMesh();re!==null&&wd(re,U,-1/0,_.sortObjects)}wd(S,U,0,_.sortObjects),f.finish(),_.sortObjects===!0&&f.sort(ce,N),et=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,et&&Ie.addToRenderList(f,S),this.info.render.frame++,ve===!0&&le.beginShadows();let j=p.state.shadowsArray;Ce.render(j,S,U),ve===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();let X=f.opaque,F=f.transmissive;if(p.setupLights(),U.isArrayCamera){let re=U.cameras;if(F.length>0)for(let fe=0,we=re.length;fe<we;fe++){let ye=re[fe];_m(X,F,S,ye)}et&&Ie.render(S);for(let fe=0,we=re.length;fe<we;fe++){let ye=re[fe];xm(f,S,ye,ye.viewport)}}else F.length>0&&_m(X,F,S,U),et&&Ie.render(S),xm(f,S,U);O!==null&&I===0&&(Ke.updateMultisampleRenderTarget(O),Ke.updateRenderTargetMipmap(O)),S.isScene===!0&&S.onAfterRender(_,S,U),pe.resetDefaultState(),E=-1,w=null,x.pop(),x.length>0?(p=x[x.length-1],ve===!0&&le.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?f=M[M.length-1]:f=null};function wd(S,U,j,X){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)j=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Me.intersectsSprite(S)){X&&me.setFromMatrixPosition(S.matrixWorld).applyMatrix4(k);let fe=z.update(S),we=S.material;we.visible&&f.push(S,fe,we,j,me.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Me.intersectsObject(S))){let fe=z.update(S),we=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),me.copy(S.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),me.copy(fe.boundingSphere.center)),me.applyMatrix4(S.matrixWorld).applyMatrix4(k)),Array.isArray(we)){let ye=fe.groups;for(let Ue=0,$e=ye.length;Ue<$e;Ue++){let De=ye[Ue],tt=we[De.materialIndex];tt&&tt.visible&&f.push(S,fe,tt,j,me.z,De)}}else we.visible&&f.push(S,fe,we,j,me.z,null)}}let re=S.children;for(let fe=0,we=re.length;fe<we;fe++)wd(re[fe],U,j,X)}function xm(S,U,j,X){let F=S.opaque,re=S.transmissive,fe=S.transparent;p.setupLightsView(j),ve===!0&&le.setGlobalState(_.clippingPlanes,j),X&&Ae.viewport(P.copy(X)),F.length>0&&Sl(F,U,j),re.length>0&&Sl(re,U,j),fe.length>0&&Sl(fe,U,j),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function _m(S,U,j,X){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new vi(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?ra:di,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));let re=p.state.transmissionRenderTarget[X.id],fe=X.viewport||P;re.setSize(fe.z*_.transmissionResolutionScale,fe.w*_.transmissionResolutionScale);let we=_.getRenderTarget(),ye=_.getActiveCubeFace(),Ue=_.getActiveMipmapLevel();_.setRenderTarget(re),_.getClearColor(G),J=_.getClearAlpha(),J<1&&_.setClearColor(16777215,.5),_.clear(),et&&Ie.render(j);let $e=_.toneMapping;_.toneMapping=Ki;let De=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),ve===!0&&le.setGlobalState(_.clippingPlanes,X),Sl(S,j,X),Ke.updateMultisampleRenderTarget(re),Ke.updateRenderTargetMipmap(re),We.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let ct=0,wt=U.length;ct<wt;ct++){let vt=U[ct],ht=vt.object,Oe=vt.geometry,_t=vt.material,it=vt.group;if(_t.side===En&&ht.layers.test(X.layers)){let In=_t.side;_t.side=Yt,_t.needsUpdate=!0,Sm(ht,j,X,Oe,_t,it),_t.side=In,_t.needsUpdate=!0,tt=!0}}tt===!0&&(Ke.updateMultisampleRenderTarget(re),Ke.updateRenderTargetMipmap(re))}_.setRenderTarget(we,ye,Ue),_.setClearColor(G,J),De!==void 0&&(X.viewport=De),_.toneMapping=$e}function Sl(S,U,j){let X=U.isScene===!0?U.overrideMaterial:null;for(let F=0,re=S.length;F<re;F++){let fe=S[F],we=fe.object,ye=fe.geometry,Ue=fe.group,$e=fe.material;$e.allowOverride===!0&&X!==null&&($e=X),we.layers.test(j.layers)&&Sm(we,U,j,ye,$e,Ue)}}function Sm(S,U,j,X,F,re){S.onBeforeRender(_,U,j,X,F,re),S.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(_,U,j,X,S,re),F.transparent===!0&&F.side===En&&F.forceSinglePass===!1?(F.side=Yt,F.needsUpdate=!0,_.renderBufferDirect(j,U,X,F,S,re),F.side=oi,F.needsUpdate=!0,_.renderBufferDirect(j,U,X,F,S,re),F.side=En):_.renderBufferDirect(j,U,X,F,S,re),S.onAfterRender(_,U,j,X,F,re)}function wl(S,U,j){U.isScene!==!0&&(U=be);let X=Te.get(S),F=p.state.lights,re=p.state.shadowsArray,fe=F.state.version,we=Z.getParameters(S,F.state,re,U,j),ye=Z.getProgramCacheKey(we),Ue=X.programs;X.environment=S.isMeshStandardMaterial?U.environment:null,X.fog=U.fog,X.envMap=(S.isMeshStandardMaterial?Mt:Vt).get(S.envMap||X.environment),X.envMapRotation=X.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Ue===void 0&&(S.addEventListener("dispose",Q),Ue=new Map,X.programs=Ue);let $e=Ue.get(ye);if($e!==void 0){if(X.currentProgram===$e&&X.lightsStateVersion===fe)return Em(S,we),$e}else we.uniforms=Z.getUniforms(S),S.onBeforeCompile(we,_),$e=Z.acquireProgram(we,ye),Ue.set(ye,$e),X.uniforms=we.uniforms;let De=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(De.clippingPlanes=le.uniform),Em(S,we),X.needsLights=Dx(S),X.lightsStateVersion=fe,X.needsLights&&(De.ambientLightColor.value=F.state.ambient,De.lightProbe.value=F.state.probe,De.directionalLights.value=F.state.directional,De.directionalLightShadows.value=F.state.directionalShadow,De.spotLights.value=F.state.spot,De.spotLightShadows.value=F.state.spotShadow,De.rectAreaLights.value=F.state.rectArea,De.ltc_1.value=F.state.rectAreaLTC1,De.ltc_2.value=F.state.rectAreaLTC2,De.pointLights.value=F.state.point,De.pointLightShadows.value=F.state.pointShadow,De.hemisphereLights.value=F.state.hemi,De.directionalShadowMap.value=F.state.directionalShadowMap,De.directionalShadowMatrix.value=F.state.directionalShadowMatrix,De.spotShadowMap.value=F.state.spotShadowMap,De.spotLightMatrix.value=F.state.spotLightMatrix,De.spotLightMap.value=F.state.spotLightMap,De.pointShadowMap.value=F.state.pointShadowMap,De.pointShadowMatrix.value=F.state.pointShadowMatrix),X.currentProgram=$e,X.uniformsList=null,$e}function wm(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=da.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Em(S,U){let j=Te.get(S);j.outputColorSpace=U.outputColorSpace,j.batching=U.batching,j.batchingColor=U.batchingColor,j.instancing=U.instancing,j.instancingColor=U.instancingColor,j.instancingMorph=U.instancingMorph,j.skinning=U.skinning,j.morphTargets=U.morphTargets,j.morphNormals=U.morphNormals,j.morphColors=U.morphColors,j.morphTargetsCount=U.morphTargetsCount,j.numClippingPlanes=U.numClippingPlanes,j.numIntersection=U.numClipIntersection,j.vertexAlphas=U.vertexAlphas,j.vertexTangents=U.vertexTangents,j.toneMapping=U.toneMapping}function Lx(S,U,j,X,F){U.isScene!==!0&&(U=be),Ke.resetTextureUnits();let re=U.fog,fe=X.isMeshStandardMaterial?U.environment:null,we=O===null?_.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Xt,ye=(X.isMeshStandardMaterial?Mt:Vt).get(X.envMap||fe),Ue=X.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,$e=!!j.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),De=!!j.morphAttributes.position,tt=!!j.morphAttributes.normal,ct=!!j.morphAttributes.color,wt=Ki;X.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(wt=_.toneMapping);let vt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ht=vt!==void 0?vt.length:0,Oe=Te.get(X),_t=p.state.lights;if(ve===!0&&(H===!0||S!==w)){let rn=S===w&&X.id===E;le.setState(X,S,rn)}let it=!1;X.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==_t.state.version||Oe.outputColorSpace!==we||F.isBatchedMesh&&Oe.batching===!1||!F.isBatchedMesh&&Oe.batching===!0||F.isBatchedMesh&&Oe.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Oe.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Oe.instancing===!1||!F.isInstancedMesh&&Oe.instancing===!0||F.isSkinnedMesh&&Oe.skinning===!1||!F.isSkinnedMesh&&Oe.skinning===!0||F.isInstancedMesh&&Oe.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Oe.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Oe.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Oe.instancingMorph===!1&&F.morphTexture!==null||Oe.envMap!==ye||X.fog===!0&&Oe.fog!==re||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==le.numPlanes||Oe.numIntersection!==le.numIntersection)||Oe.vertexAlphas!==Ue||Oe.vertexTangents!==$e||Oe.morphTargets!==De||Oe.morphNormals!==tt||Oe.morphColors!==ct||Oe.toneMapping!==wt||Oe.morphTargetsCount!==ht)&&(it=!0):(it=!0,Oe.__version=X.version);let In=Oe.currentProgram;it===!0&&(In=wl(X,U,F));let Ar=!1,Pn=!1,Fa=!1,St=In.getUniforms(),Gn=Oe.uniforms;if(Ae.useProgram(In.program)&&(Ar=!0,Pn=!0,Fa=!0),X.id!==E&&(E=X.id,Pn=!0),Ar||w!==S){Ae.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),St.setValue(R,"projectionMatrix",S.projectionMatrix),St.setValue(R,"viewMatrix",S.matrixWorldInverse);let xn=St.map.cameraPosition;xn!==void 0&&xn.setValue(R,ee.setFromMatrixPosition(S.matrixWorld)),Be.logarithmicDepthBuffer&&St.setValue(R,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&St.setValue(R,"isOrthographic",S.isOrthographicCamera===!0),w!==S&&(w=S,Pn=!0,Fa=!0)}if(F.isSkinnedMesh){St.setOptional(R,F,"bindMatrix"),St.setOptional(R,F,"bindMatrixInverse");let rn=F.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),St.setValue(R,"boneTexture",rn.boneTexture,Ke))}F.isBatchedMesh&&(St.setOptional(R,F,"batchingTexture"),St.setValue(R,"batchingTexture",F._matricesTexture,Ke),St.setOptional(R,F,"batchingIdTexture"),St.setValue(R,"batchingIdTexture",F._indirectTexture,Ke),St.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&St.setValue(R,"batchingColorTexture",F._colorsTexture,Ke));let Wn=j.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&ae.update(F,j,In),(Pn||Oe.receiveShadow!==F.receiveShadow)&&(Oe.receiveShadow=F.receiveShadow,St.setValue(R,"receiveShadow",F.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Gn.envMap.value=ye,Gn.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&U.environment!==null&&(Gn.envMapIntensity.value=U.environmentIntensity),Pn&&(St.setValue(R,"toneMappingExposure",_.toneMappingExposure),Oe.needsLights&&Nx(Gn,Fa),re&&X.fog===!0&&ne.refreshFogUniforms(Gn,re),ne.refreshMaterialUniforms(Gn,X,W,ie,p.state.transmissionRenderTarget[S.id]),da.upload(R,wm(Oe),Gn,Ke)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(da.upload(R,wm(Oe),Gn,Ke),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&St.setValue(R,"center",F.center),St.setValue(R,"modelViewMatrix",F.modelViewMatrix),St.setValue(R,"normalMatrix",F.normalMatrix),St.setValue(R,"modelMatrix",F.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){let rn=X.uniformsGroups;for(let xn=0,Ed=rn.length;xn<Ed;xn++){let Os=rn[xn];Xe.update(Os,In),Xe.bind(Os,In)}}return In}function Nx(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function Dx(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(S,U,j){let X=Te.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Te.get(S.texture).__webglTexture=U,Te.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:j,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){let j=Te.get(S);j.__webglFramebuffer=U,j.__useDefaultFramebuffer=U===void 0};let Ox=R.createFramebuffer();this.setRenderTarget=function(S,U=0,j=0){O=S,C=U,I=j;let X=!0,F=null,re=!1,fe=!1;if(S){let ye=Te.get(S);if(ye.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(R.FRAMEBUFFER,null),X=!1;else if(ye.__webglFramebuffer===void 0)Ke.setupRenderTarget(S);else if(ye.__hasExternalTextures)Ke.rebindTextures(S,Te.get(S.texture).__webglTexture,Te.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let De=S.depthTexture;if(ye.__boundDepthTexture!==De){if(De!==null&&Te.has(De)&&(S.width!==De.image.width||S.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ke.setupDepthRenderbuffer(S)}}let Ue=S.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(fe=!0);let $e=Te.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray($e[U])?F=$e[U][j]:F=$e[U],re=!0):S.samples>0&&Ke.useMultisampledRTT(S)===!1?F=Te.get(S).__webglMultisampledFramebuffer:Array.isArray($e)?F=$e[j]:F=$e,P.copy(S.viewport),B.copy(S.scissor),q=S.scissorTest}else P.copy(V).multiplyScalar(W).floor(),B.copy(te).multiplyScalar(W).floor(),q=ue;if(j!==0&&(F=Ox),Ae.bindFramebuffer(R.FRAMEBUFFER,F)&&X&&Ae.drawBuffers(S,F),Ae.viewport(P),Ae.scissor(B),Ae.setScissorTest(q),re){let ye=Te.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,ye.__webglTexture,j)}else if(fe){let ye=U;for(let Ue=0;Ue<S.textures.length;Ue++){let $e=Te.get(S.textures[Ue]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Ue,$e.__webglTexture,j,ye)}}else if(S!==null&&j!==0){let ye=Te.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ye.__webglTexture,j)}E=-1},this.readRenderTargetPixels=function(S,U,j,X,F,re,fe,we=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&fe!==void 0&&(ye=ye[fe]),ye){Ae.bindFramebuffer(R.FRAMEBUFFER,ye);try{let Ue=S.textures[we],$e=Ue.format,De=Ue.type;if(!Be.textureFormatReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-X&&j>=0&&j<=S.height-F&&(S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+we),R.readPixels(U,j,X,F,Pe.convert($e),Pe.convert(De),re))}finally{let Ue=O!==null?Te.get(O).__webglFramebuffer:null;Ae.bindFramebuffer(R.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(S,U,j,X,F,re,fe,we=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&fe!==void 0&&(ye=ye[fe]),ye)if(U>=0&&U<=S.width-X&&j>=0&&j<=S.height-F){Ae.bindFramebuffer(R.FRAMEBUFFER,ye);let Ue=S.textures[we],$e=Ue.format,De=Ue.type;if(!Be.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,tt),R.bufferData(R.PIXEL_PACK_BUFFER,re.byteLength,R.STREAM_READ),S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+we),R.readPixels(U,j,X,F,Pe.convert($e),Pe.convert(De),0);let ct=O!==null?Te.get(O).__webglFramebuffer:null;Ae.bindFramebuffer(R.FRAMEBUFFER,ct);let wt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await ev(R,wt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,tt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,re),R.deleteBuffer(tt),R.deleteSync(wt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,j=0){let X=Math.pow(2,-j),F=Math.floor(S.image.width*X),re=Math.floor(S.image.height*X),fe=U!==null?U.x:0,we=U!==null?U.y:0;Ke.setTexture2D(S,0),R.copyTexSubImage2D(R.TEXTURE_2D,j,0,0,fe,we,F,re),Ae.unbindTexture()};let kx=R.createFramebuffer(),Ux=R.createFramebuffer();this.copyTextureToTexture=function(S,U,j=null,X=null,F=0,re=null){re===null&&(F!==0?(Wr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=F,F=0):re=0);let fe,we,ye,Ue,$e,De,tt,ct,wt,vt=S.isCompressedTexture?S.mipmaps[re]:S.image;if(j!==null)fe=j.max.x-j.min.x,we=j.max.y-j.min.y,ye=j.isBox3?j.max.z-j.min.z:1,Ue=j.min.x,$e=j.min.y,De=j.isBox3?j.min.z:0;else{let Wn=Math.pow(2,-F);fe=Math.floor(vt.width*Wn),we=Math.floor(vt.height*Wn),S.isDataArrayTexture?ye=vt.depth:S.isData3DTexture?ye=Math.floor(vt.depth*Wn):ye=1,Ue=0,$e=0,De=0}X!==null?(tt=X.x,ct=X.y,wt=X.z):(tt=0,ct=0,wt=0);let ht=Pe.convert(U.format),Oe=Pe.convert(U.type),_t;U.isData3DTexture?(Ke.setTexture3D(U,0),_t=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ke.setTexture2DArray(U,0),_t=R.TEXTURE_2D_ARRAY):(Ke.setTexture2D(U,0),_t=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);let it=R.getParameter(R.UNPACK_ROW_LENGTH),In=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ar=R.getParameter(R.UNPACK_SKIP_PIXELS),Pn=R.getParameter(R.UNPACK_SKIP_ROWS),Fa=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,vt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,vt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ue),R.pixelStorei(R.UNPACK_SKIP_ROWS,$e),R.pixelStorei(R.UNPACK_SKIP_IMAGES,De);let St=S.isDataArrayTexture||S.isData3DTexture,Gn=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){let Wn=Te.get(S),rn=Te.get(U),xn=Te.get(Wn.__renderTarget),Ed=Te.get(rn.__renderTarget);Ae.bindFramebuffer(R.READ_FRAMEBUFFER,xn.__webglFramebuffer),Ae.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ed.__webglFramebuffer);for(let Os=0;Os<ye;Os++)St&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Te.get(S).__webglTexture,F,De+Os),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Te.get(U).__webglTexture,re,wt+Os)),R.blitFramebuffer(Ue,$e,fe,we,tt,ct,fe,we,R.DEPTH_BUFFER_BIT,R.NEAREST);Ae.bindFramebuffer(R.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||S.isRenderTargetTexture||Te.has(S)){let Wn=Te.get(S),rn=Te.get(U);Ae.bindFramebuffer(R.READ_FRAMEBUFFER,kx),Ae.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ux);for(let xn=0;xn<ye;xn++)St?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Wn.__webglTexture,F,De+xn):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Wn.__webglTexture,F),Gn?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,rn.__webglTexture,re,wt+xn):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,rn.__webglTexture,re),F!==0?R.blitFramebuffer(Ue,$e,fe,we,tt,ct,fe,we,R.COLOR_BUFFER_BIT,R.NEAREST):Gn?R.copyTexSubImage3D(_t,re,tt,ct,wt+xn,Ue,$e,fe,we):R.copyTexSubImage2D(_t,re,tt,ct,Ue,$e,fe,we);Ae.bindFramebuffer(R.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Gn?S.isDataTexture||S.isData3DTexture?R.texSubImage3D(_t,re,tt,ct,wt,fe,we,ye,ht,Oe,vt.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(_t,re,tt,ct,wt,fe,we,ye,ht,vt.data):R.texSubImage3D(_t,re,tt,ct,wt,fe,we,ye,ht,Oe,vt):S.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,re,tt,ct,fe,we,ht,Oe,vt.data):S.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,re,tt,ct,vt.width,vt.height,ht,vt.data):R.texSubImage2D(R.TEXTURE_2D,re,tt,ct,fe,we,ht,Oe,vt);R.pixelStorei(R.UNPACK_ROW_LENGTH,it),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,In),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ar),R.pixelStorei(R.UNPACK_SKIP_ROWS,Pn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Fa),re===0&&U.generateMipmaps&&R.generateMipmap(_t),Ae.unbindTexture()},this.initRenderTarget=function(S){Te.get(S).__webglFramebuffer===void 0&&Ke.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ke.setTextureCube(S,0):S.isData3DTexture?Ke.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ke.setTexture2DArray(S,0):Ke.setTexture2D(S,0),Ae.unbindTexture()},this.resetState=function(){C=0,I=0,O=null,Ae.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};function qh(n,e){if(e===Sh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===la||e===Lo){let t=n.getIndex();if(t===null){let a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,s=[];if(e===la)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}var mu=class extends wi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Qh(t)}),this.register(function(t){return new ep(t)}),this.register(function(t){return new cp(t)}),this.register(function(t){return new up(t)}),this.register(function(t){return new dp(t)}),this.register(function(t){return new np(t)}),this.register(function(t){return new ip(t)}),this.register(function(t){return new sp(t)}),this.register(function(t){return new rp(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new ap(t)}),this.register(function(t){return new tp(t)}),this.register(function(t){return new lp(t)}),this.register(function(t){return new op(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new hp(t)}),this.register(function(t){return new pp(t)})}load(e,t,i,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Xi.extractUrlBase(e);a=Xi.resolveURL(c,this.path)}else a=Xi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new ta(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(d){t(d),r.manager.itemEnd(e)},o)}catch(d){o(d)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Uv){try{a[Qe.KHR_BINARY_GLTF]=new fp(e)}catch(u){s&&s(u);return}r=JSON.parse(a[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new _p(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){let u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){let u=r.extensionsUsed[d],h=r.extensionsRequired||[];switch(u){case Qe.KHR_MATERIALS_UNLIT:a[u]=new Jh;break;case Qe.KHR_DRACO_MESH_COMPRESSION:a[u]=new mp(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:a[u]=new gp;break;case Qe.KHR_MESH_QUANTIZATION:a[u]=new vp;break;default:h.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){let i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}};function vM(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}var Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Kh=class{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,s=t.cache.get(i);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,d=new ke(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],Xt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ys(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new er(d),c.distance=u;break;case"spot":c=new So(d),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Ai(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}},Jh=class{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return cn}extendParams(e,t,i){let s=[];e.color=new ke(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Xt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(s)}},Zh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Qh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ne(o,o)}return Promise.all(r)}},ep=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},tp=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},np=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new ke(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Xt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,At)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},ip=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},sp=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ke().setRGB(o[0],o[1],o[2],Xt),Promise.all(r)}},rp=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},ap=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new ke().setRGB(o[0],o[1],o[2],Xt),a.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,At)),Promise.all(r)}},op=class{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},lp=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Sn}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},cp=class{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},up=class{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},dp=class{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=i.textureLoader;if(o.uri){let c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}},hp=class{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,d=s.count,u=s.byteStride,h=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,h,s.mode,s.filter).then(function(g){return g.buffer}):a.ready.then(function(){let g=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(g),d,u,h,s.mode,s.filter),g})})}else return null}},pp=class{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let s=t.meshes[i.mesh];for(let c of s.primitives)if(c.mode!==Kn.TRIANGLES&&c.mode!==Kn.TRIANGLE_STRIP&&c.mode!==Kn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(d=>(l[c]=d,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let d=c.pop(),u=d.isGroup?d.children:[d],h=c[0].count,g=[];for(let v of u){let y=new qe,f=new L,p=new Gt,M=new L(1,1,1),x=new Ys(v.geometry,v.material,h);for(let _=0;_<h;_++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&M.fromBufferAttribute(l.SCALE,_),x.setMatrixAt(_,y.compose(f,p,M));for(let _ in l)if(_==="_COLOR_0"){let A=l[_];x.instanceColor=new vs(A.array,A.itemSize,A.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&v.geometry.setAttribute(_,l[_]);mt.prototype.copy.call(x,v),this.parser.assignFinalMaterial(x),g.push(x)}return d.isGroup?(d.clear(),d.add(...g),d):g[0]}))}},Uv="glTF",Oo=12,Nv={JSON:1313821514,BIN:5130562},fp=class{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Oo),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Uv)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Oo,r=new DataView(e,Oo),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Nv.JSON){let c=new Uint8Array(e,Oo+a,o);this.content=i.decode(c)}else if(l===Nv.BIN){let c=Oo+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},mp=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let d in a){let u=bp[d]||d.toLowerCase();o[u]=a[d]}for(let d in e.attributes){let u=bp[d]||d.toLowerCase();if(a[d]!==void 0){let h=i.accessors[e.attributes[d]],g=fa[h.componentType];c[u]=g.name,l[u]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(d){return new Promise(function(u,h){s.decodeDracoFile(d,function(g){for(let v in g.attributes){let y=g.attributes[v],f=l[v];f!==void 0&&(y.normalized=f)}u(g)},o,c,Xt,h)})})}},gp=class{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},vp=class{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}},gu=class extends Wi{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,d=s-t,u=(i-t)/d,h=u*u,g=h*u,v=e*c,y=v-c,f=-2*g+3*h,p=g-h,M=1-f,x=p-h+u;for(let _=0;_!==o;_++){let A=a[y+_+o],C=a[y+_+l]*d,I=a[v+_+o],O=a[v+_]*d;r[_]=M*A+x*C+f*I+p*O}return r}},yM=new Gt,yp=class extends gu{interpolate_(e,t,i,s){let r=super.interpolate_(e,t,i,s);return yM.fromArray(r).normalize().toArray(r),r}},Kn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},fa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Dv={9728:jt,9729:on,9984:Ac,9985:ia,9986:sr,9987:ui},Ov={33071:mi,33648:Hr,10497:ms},jh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},bp={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ss={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},bM={CUBICSPLINE:void 0,LINEAR:qs,STEP:Ws},Xh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xM(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new bi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:oi})),n.DefaultMaterial}function ur(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Ai(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function _M(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,d=e.length;c<d;c++){let u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);let a=[],o=[],l=[];for(let c=0,d=e.length;c<d;c++){let u=e[c];if(i){let h=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):n.attributes.position;a.push(h)}if(s){let h=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):n.attributes.normal;o.push(h)}if(r){let h=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):n.attributes.color;l.push(h)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let d=c[0],u=c[1],h=c[2];return i&&(n.morphAttributes.position=d),s&&(n.morphAttributes.normal=u),r&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function SM(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function wM(n){let e,t=n.extensions&&n.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Yh(t.attributes):e=n.indices+":"+Yh(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+Yh(n.targets[i]);return e}function Yh(n){let e="",t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function xp(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function EM(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var MM=new qe,_p=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new vM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new bo(this.options.manager):this.textureLoader=new wo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ta(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return ur(r,o,s),Ai(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let s=i.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,d]of a.children.entries())r(d,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let s=e(t[i]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){i.load(Xi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){let t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=jh[s.type],o=fa[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Lt(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=jh[s.type],c=fa[s.componentType],d=c.BYTES_PER_ELEMENT,u=d*l,h=s.byteOffset||0,g=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,v=s.normalized===!0,y,f;if(g&&g!==u){let p=Math.floor(h/g),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,x=t.cache.get(M);x||(y=new c(o,p*g,s.count*g/d),x=new Yr(y,g/d),t.cache.add(M,x)),f=new Kr(x,l,h%g/d,v)}else o===null?y=new c(s.count*l):y=new c(o,h,s.count*l),f=new Lt(y,l,v);if(s.sparse!==void 0){let p=jh.SCALAR,M=fa[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,A=new M(a[1],x,s.sparse.count*p),C=new c(a[2],_,s.sparse.count*l);o!==null&&(f=new Lt(f.array.slice(),f.itemSize,f.normalized)),f.normalized=!1;for(let I=0,O=A.length;I<O;I++){let E=A[I];if(f.setX(E,C[I*l]),l>=2&&f.setY(E,C[I*l+1]),l>=3&&f.setZ(E,C[I*l+2]),l>=4&&f.setW(E,C[I*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}f.normalized=v}return f})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(d){d.flipY=!1,d.name=a.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);let h=(r.samplers||{})[a.sampler]||{};return d.magFilter=Dv[h.magFilter]||on,d.minFilter=Dv[h.minFilter]||ui,d.wrapS=Ov[h.wrapS]||ms,d.wrapT=Ov[h.wrapT]||ms,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==jt&&d.minFilter!==on,s.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let h=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let d=Promise.resolve(l).then(function(u){return new Promise(function(h,g){let v=h;t.isImageBitmapLoader===!0&&(v=function(y){let f=new kt(y);f.needsUpdate=!0,h(f)}),t.load(Xi.resolveURL(u,r.path),v,void 0,g)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Ai(u,a),u.userData.mimeType=a.mimeType||EM(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=d,d}assignTexture(e,t,i,s){let r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new ea,ln.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,l=this.cache.get(o);l||(l=new Qr,ln.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return bi}loadMaterial(e){let t=this,i=this.json,s=this.extensions,r=i.materials[e],a,o={},l=r.extensions||{},c=[];if(l[Qe.KHR_MATERIALS_UNLIT]){let u=s[Qe.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new ke(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let h=u.baseColorFactor;o.color.setRGB(h[0],h[1],h[2],Xt),o.opacity=h[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,At)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=En);let d=r.alphaMode||Xh.OPAQUE;if(d===Xh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===Xh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==cn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ne(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==cn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==cn){let u=r.emissiveFactor;o.emissive=new ke().setRGB(u[0],u[1],u[2],Xt)}return r.emissiveTexture!==void 0&&a!==cn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,At)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Ai(u,r),t.associations.set(u,{materials:e}),r.extensions&&ur(s,u,r),u})}createUniqueName(e){let t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return kv(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],d=wM(c),u=s[d];if(u)a.push(u.promise);else{let h;c.extensions&&c.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=kv(new un,c,t),s[d]={primitive:c,promise:h},a.push(h)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let d=a[l].material===void 0?xM(this.cache):this.getDependency("material",a[l].material);o.push(d)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),d=l[l.length-1],u=[];for(let g=0,v=d.length;g<v;g++){let y=d[g],f=a[g],p,M=c[g];if(f.mode===Kn.TRIANGLES||f.mode===Kn.TRIANGLE_STRIP||f.mode===Kn.TRIANGLE_FAN||f.mode===void 0)p=r.isSkinnedMesh===!0?new so(y,M):new lt(y,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),f.mode===Kn.TRIANGLE_STRIP?p.geometry=qh(p.geometry,Lo):f.mode===Kn.TRIANGLE_FAN&&(p.geometry=qh(p.geometry,la));else if(f.mode===Kn.LINES)p=new oo(y,M);else if(f.mode===Kn.LINE_STRIP)p=new Ks(y,M);else if(f.mode===Kn.LINE_LOOP)p=new lo(y,M);else if(f.mode===Kn.POINTS)p=new co(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(p.geometry.morphAttributes).length>0&&SM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ai(p,r),f.extensions&&ur(s,p,f),t.assignFinalMaterial(p),u.push(p)}for(let g=0,v=u.length;g<v;g++)t.associations.set(u[g],{meshes:e,primitives:g});if(u.length===1)return r.extensions&&ur(s,u[0],r),u[0];let h=new ri;r.extensions&&ur(s,h,r),t.associations.set(h,{meshes:e});for(let g=0,v=u.length;g<v;g++)h.add(u[g]);return h})}loadCamera(e){let t,i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Pt(No.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new tr(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ai(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,d=a.length;c<d;c++){let u=a[c];if(u){o.push(u);let h=new qe;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ao(o,l)})}loadAnimation(e){let t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],d=[];for(let u=0,h=s.channels.length;u<h;u++){let g=s.channels[u],v=s.samplers[g.sampler],y=g.target,f=y.node,p=s.parameters!==void 0?s.parameters[v.input]:v.input,M=s.parameters!==void 0?s.parameters[v.output]:v.output;y.node!==void 0&&(a.push(this.getDependency("node",f)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(v),d.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(u){let h=u[0],g=u[1],v=u[2],y=u[3],f=u[4],p=[];for(let x=0,_=h.length;x<_;x++){let A=h[x],C=g[x],I=v[x],O=y[x],E=f[x];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();let w=i._createAnimationTracks(A,C,I,O,E);if(w)for(let P=0;P<w.length;P++)p.push(w[P])}let M=new Zs(r,void 0,p);return Ai(M,s),M})}createNodeMesh(e){let t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){let a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,d=o.length;c<d;c++)a.push(i.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let d=c[0],u=c[1],h=c[2];h!==null&&d.traverse(function(g){g.isSkinnedMesh&&g.bind(h,MM)});for(let g=0,v=u.length;g<v;g++)d.add(u[g]);return d})}_loadNodeShallow(e){let t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let d;if(r.isBone===!0?d=new Jr:c.length>1?d=new ri:c.length===1?d=c[0]:d=new mt,d!==c[0])for(let u=0,h=c.length;u<h;u++)d.add(c[u]);if(r.name&&(d.userData.name=r.name,d.name=a),Ai(d,r),r.extensions&&ur(i,d,r),r.matrix!==void 0){let u=new qe;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);if(!s.associations.has(d))s.associations.set(d,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(d);s.associations.set(d,{...u})}return s.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],s=this,r=new ri;i.name&&(r.name=s.createUniqueName(i.name)),Ai(r,i),i.extensions&&ur(t,r,i);let a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let d=0,u=l.length;d<u;d++)r.add(l[d]);let c=d=>{let u=new Map;for(let[h,g]of s.associations)(h instanceof ln||h instanceof kt)&&u.set(h,g);return d.traverse(h=>{let g=s.associations.get(h);g!=null&&u.set(h,g)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];Ss[r.path]===Ss.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(o);let c;switch(Ss[r.path]){case Ss.weights:c=xi;break;case Ss.rotation:c=_i;break;case Ss.translation:case Ss.scale:c=Si;break;default:switch(i.itemSize){case 1:c=xi;break;case 2:case 3:default:c=Si;break}break}let d=s.interpolation!==void 0?bM[s.interpolation]:qs,u=this._getArrayFromAccessor(i);for(let h=0,g=l.length;h<g;h++){let v=new c(l[h]+"."+Ss[r.path],t.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=xp(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let s=this instanceof _i?yp:gu;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function AM(n,e,t){let i=e.attributes,s=new Dn;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),o.normalized){let d=xp(fa[o.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new L,l=new L;for(let c=0,d=r.length;c<d;c++){let u=r[c];if(u.POSITION!==void 0){let h=t.json.accessors[u.POSITION],g=h.min,v=h.max;if(g!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(g[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(g[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(g[2]),Math.abs(v[2]))),h.normalized){let y=xp(fa[h.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;let a=new _n;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function kv(n,e,t){let i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(let a in i){let o=bp[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){let a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return nt.workingColorSpace!==Xt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),Ai(n,e),AM(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?_M(n,e.targets,t):n})}var Fv={type:"change"},wp={type:"start"},$v={type:"end"},vu=new yi,Bv=new jn,TM=Math.cos(70*No.DEG2RAD),Bt=new L,Mn=2*Math.PI,dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sp=1e-6,yu=class extends Ao{constructor(e,t=null){super(e,t),this.state=dt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bs.ROTATE,MIDDLE:bs.DOLLY,RIGHT:bs.PAN},this.touches={ONE:xs.ROTATE,TWO:xs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Gt,this._lastTargetPosition=new L,this._quat=new Gt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new na,this._sphericalDelta=new na,this._scale=1,this._panOffset=new L,this._rotateStart=new Ne,this._rotateEnd=new Ne,this._rotateDelta=new Ne,this._panStart=new Ne,this._panEnd=new Ne,this._panDelta=new Ne,this._dollyStart=new Ne,this._dollyEnd=new Ne,this._dollyDelta=new Ne,this._dollyDirection=new L,this._mouse=new Ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=RM.bind(this),this._onPointerDown=CM.bind(this),this._onPointerUp=IM.bind(this),this._onContextMenu=UM.bind(this),this._onMouseWheel=NM.bind(this),this._onKeyDown=DM.bind(this),this._onTouchStart=OM.bind(this),this._onTouchMove=kM.bind(this),this._onMouseDown=PM.bind(this),this._onMouseMove=LM.bind(this),this._interceptControlDown=FM.bind(this),this._interceptControlUp=BM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Fv),this.update(),this.state=dt.NONE}update(e=null){let t=this.object.position;Bt.copy(t).sub(this.target),Bt.applyQuaternion(this._quat),this._spherical.setFromVector3(Bt),this.autoRotate&&this.state===dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Mn:i>Math.PI&&(i-=Mn),s<-Math.PI?s+=Mn:s>Math.PI&&(s-=Mn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Bt.setFromSpherical(this._spherical),Bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Bt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(vu.origin.copy(this.object.position),vu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(vu.direction))<TM?this.object.lookAt(this.target):(Bv.setFromNormalAndCoplanarPoint(this.object.up,this.target),vu.intersectPlane(Bv,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Sp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sp||this._lastTargetPosition.distanceToSquared(this.target)>Sp?(this.dispatchEvent(Fv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Mn/60*this.autoRotateSpeed*e:Mn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Bt.setFromMatrixColumn(t,0),Bt.multiplyScalar(-e),this._panOffset.add(Bt)}_panUp(e,t){this.screenSpacePanning===!0?Bt.setFromMatrixColumn(t,1):(Bt.setFromMatrixColumn(t,0),Bt.crossVectors(this.object.up,Bt)),Bt.multiplyScalar(e),this._panOffset.add(Bt)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Bt.copy(s).sub(this.target);let r=Bt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ne,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function CM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function RM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function IM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent($v),this.state=dt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function PM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case bs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=dt.DOLLY;break;case bs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=dt.ROTATE}break;case bs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=dt.PAN}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(wp)}function LM(n){switch(this.state){case dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function NM(n){this.enabled===!1||this.enableZoom===!1||this.state!==dt.NONE||(n.preventDefault(),this.dispatchEvent(wp),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent($v))}function DM(n){this.enabled!==!1&&this._handleKeyDown(n)}function OM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case xs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=dt.TOUCH_ROTATE;break;case xs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=dt.TOUCH_PAN;break;default:this.state=dt.NONE}break;case 2:switch(this.touches.TWO){case xs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=dt.TOUCH_DOLLY_PAN;break;case xs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=dt.TOUCH_DOLLY_ROTATE;break;default:this.state=dt.NONE}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(wp)}function kM(n){switch(this._trackPointer(n),this.state){case dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=dt.NONE}}function UM(n){this.enabled!==!1&&n.preventDefault()}function FM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function BM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var bu=class extends Xs{constructor(){super();let e=new gs;e.deleteAttribute("uv");let t=new bi({side:Yt}),i=new bi,s=new er(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new lt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Ys(e,i,6),o=new mt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new lt(e,ma(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new lt(e,ma(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let d=new lt(e,ma(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);let u=new lt(e,ma(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let h=new lt(e,ma(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let g=new lt(e,ma(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function ma(n){return new go({color:0,emissive:16777215,emissiveIntensity:n})}async function Vv({selectLevel:n,notify:e,reducedMotion:t}){let i=document.querySelector("#worldCanvas"),s=document.querySelector("#worldWrap"),r=document.querySelector("#worldLoading"),a;try{a=new pu({canvas:i,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return r.hidden=!0,i.hidden=!0,document.body.classList.add("flat-view"),document.querySelector("#worldHint").textContent="Illustrated view. All levels work below.",{focus(){},update(){},pause(){},overview(){},flat(){},dispose(){}}}a.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<800?1.4:1.7)),a.outputColorSpace=At,a.toneMapping=wc,a.toneMappingExposure=.95;let o=new Xs,l=new ha(a),c=new bu,d=l.fromScene(c,.04);o.environment=d.texture,c.dispose(),l.dispose();let u=new Pt(37,1,.1,150),h=new L(1.7,.4,1.8),g=new L(13,18,21);u.position.copy(h).add(g);let v=new yu(u,i);v.target.copy(h),v.enableDamping=!t,v.dampingFactor=.065,v.minDistance=10,v.maxDistance=62,v.minPolarAngle=.35,v.maxPolarAngle=1.18,v.enablePan=!1,v.rotateSpeed=.45,v.zoomSpeed=.7,o.add(new xo(14020324,2507844,1.5));let y=new ys(16768432,2.5);y.position.set(4,12,-8),o.add(y);let f=new ys(10216389,1.3);f.position.set(-8,8,5),o.add(f);let p=document.createElement("canvas");p.width=p.height=64;let M=p.getContext("2d"),x=M.createRadialGradient(32,32,3,32,32,32);x.addColorStop(0,"rgba(0,0,0,0.65)"),x.addColorStop(1,"rgba(0,0,0,0)"),M.fillStyle=x,M.fillRect(0,0,64,64);let _=new uo(p);for(let k of Rt){let ee=new lt(new Js(6,6),new cn({map:_,transparent:!0,depthWrite:!1}));ee.rotation.x=-Math.PI/2,ee.position.set(k.position[0],-1.2,k.position[2]),o.add(ee)}let A=new lt(new mo(2.05,2.1,80),new cn({color:10804932,side:En,transparent:!0,opacity:.8}));A.rotation.x=-Math.PI/2,A.position.set(...Rt[0].position),A.position.y+=.1,o.add(A);let C=Rt.map((k,ee)=>{let me=document.createElement("span");return me.className="world-marker",me.textContent=String(ee+1).padStart(2,"0"),document.querySelector("#worldMarkers").append(me),me}),I=Rt.map((k,ee)=>{let me=new lt(new fo(1.95,1.95,3.7,16),new cn({visible:!1}));return me.position.set(...k.position),me.position.y+=1.5,me.userData.level=ee,o.add(me),me}),O,E,w,P=0,B=t,q=!1,G,J=!1,Y=0,ie=0,W=!0,ce=!1,N=new L,V=new Mo,te=new Ne,ue=()=>{let{width:k,height:ee}=s.getBoundingClientRect();!k||!ee||(a.setSize(k,ee,!1),u.aspect=k/ee,u.updateProjectionMatrix(),W=!0)},Me=new ResizeObserver(ue);Me.observe(s),ue(),v.addEventListener("start",()=>{w=null}),v.addEventListener("change",()=>{W=!0}),i.addEventListener("pointerdown",k=>{G=[k.clientX,k.clientY],J=!1}),i.addEventListener("pointermove",k=>{G&&Math.hypot(k.clientX-G[0],k.clientY-G[1])>6&&(J=!0);let ee=i.getBoundingClientRect();te.set((k.clientX-ee.left)/ee.width*2-1,-(k.clientY-ee.top)/ee.height*2+1),V.setFromCamera(te,u),i.style.cursor=V.intersectObjects(I)[0]?"pointer":"grab"}),i.addEventListener("pointerup",k=>{if(!G||J){G=null;return}let ee=i.getBoundingClientRect();te.set((k.clientX-ee.left)/ee.width*2-1,-(k.clientY-ee.top)/ee.height*2+1),V.setFromCamera(te,u);let me=V.intersectObjects(I)[0];me&&n(me.object.userData.level),G=null}),i.addEventListener("keydown",k=>{let ee=u.position.clone().sub(v.target);if(["ArrowLeft","ArrowRight"].includes(k.key))ee.applyAxisAngle(new L(0,1,0),k.key==="ArrowLeft"?-.13:.13);else if(["+","=","ArrowUp"].includes(k.key))ee.multiplyScalar(.9);else if(["-","ArrowDown"].includes(k.key))ee.multiplyScalar(1.1);else return;k.preventDefault(),w=null,ee.clampLength(10,62),u.position.copy(v.target).add(ee),v.update()}),i.addEventListener("webglcontextlost",k=>{k.preventDefault(),s.classList.remove("world-ready"),r.hidden=!0,q=!0,a.setAnimationLoop(null),e("The 3D view paused. Your checkpoint forms and progress are still available.")});function ve(k,ee){if(W=!0,B){v.target.copy(k),u.position.copy(k).add(ee),v.update();return}w={from:v.target.clone(),to:k,fromCamera:u.position.clone(),toCamera:k.clone().add(ee),start:performance.now()}}function H(k){if(ce||B&&!W&&!w||k-ie<1e3/(B?15:30))return;ie=k;let ee=Math.min((k-Y)/1e3||0,.05);if(Y=k,!(document.hidden||q)){if(!B&&E&&E.update(ee),w){let me=Math.min((k-w.start)/1150,1),be=me*me*(3-2*me);v.target.lerpVectors(w.from,w.to,be),u.position.lerpVectors(w.fromCamera,w.toCamera,be),me===1&&(w=null)}B||(A.material.opacity=.7+Math.sin(k/750)*.18),v.update(),Rt.forEach((me,be)=>{N.set(...me.position).add(new L(0,.2,1.6)).project(u),C[be].style.left=`${(N.x/2+.5)*i.clientWidth}px`,C[be].style.top=`${(-N.y/2+.5)*i.clientHeight}px`,C[be].hidden=N.z>1}),a.render(o,u),W=!1}}a.setAnimationLoop(H);try{let k=await new mu().loadAsync("/journey/assets/apex-world.glb");O=k.scene,W=!0,o.add(O),E=new Eo(O),k.animations.forEach(ee=>E.clipAction(ee).play()),s.classList.add("world-ready"),s.dataset.meshes=String(k.scene.getObjectsByProperty("isMesh",!0).length),r.hidden=!0}catch{r.hidden=!0,i.hidden=!0,C.forEach(k=>k.hidden=!0),q=!0,e("Using the illustrated map while the 3D asset is unavailable. All levels still work.")}return{focus(k,ee=!1){P=k,A.position.set(...Rt[k].position).y+=.12,C.forEach((be,et)=>{be.dataset.active=String(et===k)});let me=new L(...Rt[k].position);ve(ee?me.add(new L(1,1,0)):h.clone(),ee?g.clone().multiplyScalar(.53):g.clone())},update(k){W=!0,C.forEach((ee,me)=>{ee.dataset.locked=String(k?.[me]?.status==="locked"),ee.dataset.active=String(me===P)})},pause(k){B=k,W=!0,v.enableDamping=!k,w&&(v.target.copy(w.to),u.position.copy(w.toCamera),w=null)},overview(){ve(h.clone(),g.clone())},flat(k){q=k,W=!0,s.classList.toggle("world-ready",!k&&!!O),i.hidden=k},dispose(){ce=!0,Me.disconnect(),v.dispose(),a.setAnimationLoop(null),o.traverse(k=>{if(k.geometry?.dispose(),k.material)for(let ee of[k.material].flat())ee.dispose()}),d.dispose(),a.dispose()}}}var Hv=`<div id="workspacePanels"><section id="authPanel" class="authPanel studio-surface" aria-label="Apex Analytic account" hidden="" data-surface="account">
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
`;var dn=n=>structuredClone({dealCard:n.dealCard||{},financialProfile:n.financialProfile||{},evidence:n.evidence||{},dcfContext:n.dcfContext||{}});function zv({request:n,onState:e,onSaved:t,delay:i=650}){let s=new Map,r=0;function a(l,c,d){let u=s.get(l);return u||(u={revision:c,saved:JSON.stringify(dn(d)),pending:null,running:null,timer:null,error:null},s.set(l,u)),u}async function o(l){let c=s.get(l),d=r;if(!c)return;if(clearTimeout(c.timer),c.running)return await c.running,d===r&&c.pending?o(l):void 0;if(c.error?.status===409)throw c.error;if(!c.pending)return;let u=c.pending;if(c.pending=null,e(l,"saving"),c.running=(async()=>{try{let h=await n(`/api/assistant/cases/${l}/context`,{contextRevision:c.revision,context:u});if(d!==r||s.get(l)!==c)return;c.revision=h.case.working?.revision||0,c.saved=JSON.stringify(dn(u)),c.error=null,t(l,h.case),e(l,c.pending?"pending":"saved")}catch(h){if(d!==r||s.get(l)!==c)return;throw c.pending||=u,c.error=h,e(l,h.status===409?"conflict":"unsaved",h),h}finally{c.running=null}})(),await c.running,d===r&&c.pending)return o(l)}return{register:a,hasPending(l){let c=s.get(l);return!!(c?.pending||c?.running||c?.error)},pending(l){return s.get(l)?.pending?structuredClone(s.get(l).pending):null},hold(l,c,d){let u=a(l,c,{});u.pending=dn(d),u.error=Object.assign(new Error("Earlier tool edits have no sync history. Review both versions before choosing which to keep."),{status:409}),e(l,"conflict",u.error)},queue(l,c,d){let u=a(l,c,d),h=dn(d);!u.running&&!u.pending&&u.saved===JSON.stringify(h)||(u.pending=h,clearTimeout(u.timer),e(l,u.error?.status===409?"conflict":"pending"),u.error?.status!==409&&(u.timer=setTimeout(()=>{o(l).catch(()=>{})},i)))},flush:o,accept(l){let c=s.get(l.id);if(c?.running)throw new Error("Wait for the current save to finish before replacing the local copy.");clearTimeout(c?.timer),s.delete(l.id),a(l.id,l.working?.revision||0,l.toolContext||l.working||{}),e(l.id,"saved")},async keepLocal(l){let c=this.pending(l.id);if(!c)throw new Error("No unsaved tool inputs to apply.");this.accept(l),this.queue(l.id,l.working?.revision||0,c),await o(l.id)},forget(l){clearTimeout(s.get(l)?.timer),s.delete(l)},reset(){r++;for(let l of s.values())clearTimeout(l.timer);s.clear()}}}var kn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Ep=()=>new Date().toISOString().slice(0,10);function Gv(n,{run:e,onResolve:t}){n.querySelector("#investmentComposer").insertAdjacentHTML("beforebegin",'<details id="investmentFiles" class="assistant-files" hidden><summary>Private evidence <span id="investmentFileCount"></span></summary><div id="investmentFileBody"></div></details>');let i=n.querySelector("#investmentFiles"),s=n.querySelector("#investmentFileBody"),r="",a="",o,l,c=new Map;i.addEventListener("input",u=>{let h=u.target.closest("[data-file-review]");if(!h)return;let g=h.dataset.fileReview,v=Object.fromEntries(new FormData(h));c.set(g,{...v,revision:Number(h.dataset.revision),baseline:c.get(g)?.baseline||JSON.stringify(o.attachments.find(y=>y.id===g))})}),i.addEventListener("submit",u=>{u.preventDefault();let h=u.target,g=Object.fromEntries(new FormData(h));if(h.id==="investmentUploadForm"){let v=h.querySelector('[type="file"]').files[0];e("",async()=>{if(!v||v.size>2*1024*1024)throw new Error("Choose a non-empty supported file no larger than 2 MB.");let y=new Uint8Array(await v.arrayBuffer()),f="";for(let p=0;p<y.length;p+=16384)f+=String.fromCharCode(...y.subarray(p,p+16384));return{filename:v.name,mimeType:v.type,contentBase64:btoa(f),consentStore:g.consentStore==="on",revision:Number(h.dataset.revision)}})}else h.dataset.fileReview&&e(`${h.dataset.fileReview}/review`,async()=>({note:g.note,checkedAt:g.checkedAt,confirmReviewed:g.confirmReviewed==="on",revision:Number(h.dataset.revision)}))}),i.addEventListener("click",u=>{let h=u.target.closest("[data-file-action]");if(!h)return;let g=h.closest("[data-file-id]"),v=g.dataset.fileId,y=Number(g.dataset.revision);if(["saved-note","local-note"].includes(h.dataset.fileAction)){if(h.dataset.confirm!=="true"){h.dataset.confirm="true",h.textContent=h.dataset.fileAction==="saved-note"?"Confirm discard my unsaved note":"Confirm review latest file with my note";return}if(h.dataset.fileAction==="saved-note")c.delete(v);else{let f=c.get(v);f.baseline=JSON.stringify(o.attachments.find(p=>p.id===v)),f.revision=o.revision,f.confirmReviewed=""}a="",d.render(o,l),t?.();return}if(h.dataset.fileAction==="read"&&e(`${v}/read`,async()=>({consentAi:g.querySelector("[data-file-consent]").checked,revision:y})),h.dataset.fileAction==="delete"){if(h.dataset.confirm!=="true"){h.dataset.confirm="true",h.textContent="Confirm delete file and linked note";return}e(v,async()=>({action:"delete",revision:y}))}});let d={accept(u){(u.endsWith("/review")||u&&!u.includes("/"))&&c.delete(u.split("/")[0])},render(u,h){if(o=u,l=h,i.hidden=!u||!!u.profileIntake,!u){r="",a="",c.clear(),s.innerHTML="";return}r!==u.id&&(i.open=!1,a="",c.clear(),r=u.id);let g=JSON.stringify([u.id,u.attachments||[],h?.files,h?.llm]);if(n.querySelector("#investmentFileCount").textContent=u.attachments?.length?`(${u.attachments.length})`:"",a===g){for(let v of s.querySelectorAll("[data-revision]")){let y=c.get(v.dataset.fileReview);(!y||y.baseline===JSON.stringify(u.attachments.find(f=>f.id===v.dataset.fileReview)))&&(v.dataset.revision=u.revision,y&&(y.revision=u.revision))}return}a=g,s.innerHTML=`<p class="assistant-caption">${kn(h?.files?.notice||"Checking private storage...")}</p><p class="assistant-caption">Redact identity, bank-account and contact details, faces and location metadata you do not want to share. Apex does not scan files for malware; upload only trusted files. Files never enter the owner's shared framework.</p>
        <form id="investmentUploadForm" data-revision="${u.revision}"><label>Document or photo<input type="file" accept=".txt,.pdf,.docx,.png,.jpg,.jpeg" required ${h?.files?.enabled?"":"disabled"}></label><label class="assistant-consent"><input name="consentStore" type="checkbox" required> I have permission to store this file privately in this investigation.</label><button type="submit" ${h?.files?.enabled?"":"disabled"}>Attach file</button><small>Up to 2 MB per file. Text extraction runs on Apex's server without an AI provider. PDF scans require manual review or a separately uploaded page photo.</small></form>
        ${(u.attachments||[]).map(v=>`<details data-file-id="${kn(v.id)}" data-revision="${u.revision}"><summary>${kn(v.filename)} <small>${v.review?"Reviewed note":"Needs review"}</small></summary><p class="assistant-caption">${kn(v.mimeType)} / ${Math.ceil(v.size/1024)} KB / uploaded ${v.uploadedAt.slice(0,10)}</p><a href="/api/assistant/cases/${encodeURIComponent(u.id)}/files/${encodeURIComponent(v.id)}" download>Download original</a><p class="assistant-caption">${kn(v.extraction.coverage)}</p>${v.extraction.text?`<details><summary>Unreviewed extracted text</summary><pre class="assistant-file-text">${kn(v.extraction.text)}</pre></details>`:""}
          <details><summary>Optional AI reading</summary><p class="assistant-caption">Sends this photo, or up to 12,000 extracted text characters, plus the filename to the configured provider. It may incur API charges. Compatibility and accuracy are not guaranteed; it cannot certify condition, tenancy or title.</p><label class="assistant-consent"><input type="checkbox" data-file-consent> I consent to this file reading by the configured AI provider.</label><button type="button" data-file-action="read" ${h?.llm?"":"disabled"}>Request AI draft</button>${h?.llm?"":'<p class="assistant-caption">AI is not configured. You can review the file yourself below.</p>'}${v.aiError?`<p role="status">${kn(v.aiError)}</p>`:""}${v.aiDraft?`<p class="assistant-caption">Unverified AI draft / ${kn(v.aiDraft.provider)} / ${v.aiDraft.at.slice(0,10)}</p><p>${kn(v.aiDraft.summary)}</p><ul>${v.aiDraft.observations.map(y=>`<li>${kn(y)}</li>`).join("")}</ul><p>${v.aiDraft.questions.map(kn).join("<br>")}</p>`:""}</details>
          <form data-file-review="${kn(v.id)}" data-revision="${u.revision}"><label>Your review note<textarea name="note" minlength="12" maxlength="2000" required placeholder="What does the original establish, and what is still uncertain?">${kn(v.review?.note||"")}</textarea></label><label>Date checked<input name="checkedAt" type="date" max="${Ep()}" required value="${v.review?.checkedAt.slice(0,10)||Ep()}"></label><label class="assistant-consent"><input name="confirmReviewed" type="checkbox" required> I reviewed the original and this note. It is not independent verification.</label><button type="submit">Keep reviewed note</button></form><button type="button" data-file-action="delete">Delete file</button></details>`).join("")}`;for(let[v,y]of c){let f=u.attachments?.find(x=>x.id===v),p=s.querySelector(`[data-file-review="${v}"]`);if(!f||!p)continue;let M=y.baseline!==JSON.stringify(f);M||(y.revision=u.revision),p.dataset.revision=y.revision,p.elements.note.value=y.note||"",p.elements.checkedAt.value=y.checkedAt||Ep(),p.elements.confirmReviewed.checked=!M&&y.confirmReviewed==="on",M&&p.insertAdjacentHTML("beforebegin",'<p role="status">This file changed elsewhere. Your unsaved note is preserved below. Review the latest saved version before choosing.</p><button type="button" data-file-action="local-note">Keep my unsaved note</button><button type="button" data-file-action="saved-note">Use saved note</button>')}}};return d}var Wv=(n=Date.now())=>new Date(n+288e5).toISOString().slice(0,10);var He=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ko={site_visit:"Site visit",transaction:"Transaction",handover:"Handover",rental:"Rental",review:"Holding review"},qv=Wv;function jv(n,{run:e,clearError:t}){let i,s,r="",a="",o="",l="",c="",d=new Map,u=()=>JSON.stringify(i.tasks);function h(f){let p=new FormData(f);return{...Object.fromEntries(p),dependsOn:p.getAll("dependsOn")}}n.addEventListener("input",f=>{let p=f.target.closest("[data-milestone-form]");if(!p)return;let M=p.dataset.milestoneForm;d.set(M,{values:h(p),revision:Number(p.dataset.revision),baseline:d.get(M)?.baseline||u()})}),n.addEventListener("change",f=>{if(f.target.id==="investmentPlanStage"&&(o=f.target.value,l="",y.render(i,s)),f.target.name==="suggestion"&&f.target.value){let[p,M]=f.target.value.split(":"),x=s?.actionSuggestions?.[p]?.[Number(M)],_=f.target.form;if(!x)return;if(_.elements.title.value||_.elements.prompt.value){f.target.value="";return}_.elements.stage.value=p,_.elements.title.value=x[0],_.elements.prompt.value=x[1],_.elements.responsibility.value=x[2],_.elements.title.dispatchEvent(new Event("input",{bubbles:!0}))}}),n.addEventListener("click",f=>{let p=f.target.closest("[data-milestone-open], [data-milestone-resolve]");if(!p)return;if(p.dataset.milestoneOpen){a=p.dataset.milestoneOpen,l="",y.render(i,s),n.querySelector("#investmentActions h3")?.focus();return}if(p.dataset.confirm!=="yes"){p.dataset.confirm="yes",p.textContent=p.dataset.milestoneResolve==="saved"?"Confirm discard this unsaved draft":"Confirm re-review my draft against the latest record";return}let M=p.dataset.draftKey,x=d.get(M);p.dataset.milestoneResolve==="saved"?d.delete(M):x&&(x.baseline=u(),x.revision=i.revision,x.values.confirmDate=""),l="",y.render(i,s),t?.()}),n.addEventListener("submit",f=>{let p=f.target.closest("[data-milestone-form]");if(!p)return;f.preventDefault(),f.stopPropagation();let M=p.dataset.milestoneForm,x=h(p),_=Number(p.dataset.revision),A={responsibility:x.responsibility,contactLabel:x.contactLabel,dueDate:x.dueDate,dateKind:x.dateKind,dateReference:x.dateReference,confirmDate:x.confirmDate==="on",dependsOn:x.dependsOn},C=M.startsWith("check:")?{taskId:p.dataset.taskId,status:x.status,note:x.note,checkedAt:x.checkedAt,sourceUrl:x.sourceUrl}:M==="add"?{action:"add",stage:x.stage,title:x.title,prompt:x.prompt,plan:A}:{action:"plan",taskId:p.dataset.taskId,plan:A};e(M.startsWith("check:")?"task":"milestone",{...C,revision:_},M)});function g(f){let p=f?.plan||{},M=s?.responsibilities||{unassigned:"Not assigned",self:"Me",lawyer:"Lawyer",agent:"Agent",banker:"Banker",management:"Management",contractor:"Contractor",tenant:"Tenant",other:"Other"};return`<div class="assistant-field-grid"><label>Responsible person<select name="responsibility">${Object.entries(M).map(([x,_])=>`<option value="${x}" ${(p.responsibility||"unassigned")===x?"selected":""}>${He(_)}</option>`).join("")}</select></label><label>Private name or label (optional)<input name="contactLabel" maxlength="80" value="${He(p.contactLabel||"")}" placeholder="No identity numbers or bank details"></label><label>Date (optional)<input name="dueDate" type="date" min="1990-01-01" max="2100-12-31" value="${He(p.dueDate||"")}"></label><label>Date basis<select name="dateKind"><option value="target">My planning target</option><option value="confirmed" ${p.dateKind==="confirmed"?"selected":""}>I checked this date</option></select></label></div><label>Date reference (required for a checked date)<textarea name="dateReference" maxlength="500" placeholder="Document, clause or professional confirmation; include any unresolved conditions">${He(p.dateReference||"")}</textarea></label><label class="assistant-consent"><input name="confirmDate" type="checkbox"> For a checked date, I confirmed the exact date and reference myself.</label><details><summary>Prerequisite checks (optional)</summary><p class="assistant-caption">An action cannot be completed while a prerequisite is unresolved. Apex does not infer contractual dependencies.</p>${i.tasks.filter(x=>x.id!==f?.id).map(x=>`<label class="assistant-consent"><input type="checkbox" name="dependsOn" value="${He(x.id)}" ${p.dependsOn?.includes(x.id)?"checked":""}>${He(ko[x.id.split(":")[0]])}: ${He(x.title)} (${He(x.status)})</label>`).join("")||'<p class="assistant-caption">No existing checks yet.</p>'}</details>`}function v(f){if(a==="add")return`<section class="assistant-next"><h3 tabindex="-1">Add an ownership action</h3><form data-milestone-form="add" data-revision="${i.revision}"><label>Start with a suggestion (optional)<select name="suggestion"><option value="">Write my own action</option>${Object.entries(s?.actionSuggestions||{}).map(([x,_])=>`<optgroup label="${He(ko[x])}">${_.map(([A],C)=>`<option value="${x}:${C}">${He(A)}</option>`).join("")}</optgroup>`).join("")}</select></label><p class="assistant-caption">Suggestions fill empty drafts only. Review and adapt them; no date or professional instruction is assumed.</p><label>Stage<select name="stage">${Object.entries(ko).map(([x,_])=>`<option value="${x}" ${x===i.stage?"selected":""}>${_}</option>`).join("")}</select></label><label>Action<input name="title" minlength="4" maxlength="120" required placeholder="e.g. Confirm the actual loan disbursement date"></label><label>What would establish completion?<textarea name="prompt" minlength="12" maxlength="500" required placeholder="Evidence or confirmation needed; no assumed approval"></textarea></label><details><summary>Responsibility, date and prerequisites</summary>${g(null)}</details><button type="submit" class="primary-button">Add action</button></form></section>`;if(!f)return'<p class="assistant-next">No open check is recorded for this stage. Earlier unresolved actions remain in your plan.</p>';let p=i.ownershipPlan.rows.find(x=>x.id===f.id),M=["done","cancelled"].includes(f.status);return`<section class="assistant-next"><small>${f.id===i.ownershipPlan.nextId?"NEXT USEFUL ACTION":"SELECTED ACTION"}</small><h3 tabindex="-1">${He(f.title)}</h3><p>${He(f.prompt)}</p><p class="assistant-caption">${He(ko[p.stage])} / ${He(p.responsibility)}${p.contactLabel?` (${He(p.contactLabel)})`:""} / ${p.dueDate?`${He(p.dueDate)} (${He(p.dateKind)}, ${He(p.timing)})`:"Date not set"}</p>${p.waitingFor.length?`<p class="candidate-gap">Waiting for: ${p.waitingFor.map(x=>He(x.title)).join(", ")}. Resolve these before recording completion.</p>`:""}${f.status==="blocked"?`<p class="candidate-gap">Blocked: ${He(f.note)}</p>`:""}
      <form id="investmentTaskForm" data-milestone-form="check:${He(f.id)}" data-task-id="${He(f.id)}" data-revision="${i.revision}"><label>Progress<select name="status">${M?'<option value="open">Reopen for review</option>':`<option value="done" ${p.waitingFor.length?"disabled":""}>Checked / complete</option><option value="blocked" ${p.waitingFor.length?"selected":""}>Blocked / waiting</option><option value="open">Keep open</option>${f.custom?'<option value="cancelled">Cancel this custom action</option>':""}`}</select></label><label>${M?"Reason to reopen":"What did you check, or what is blocking progress?"}<textarea name="note" required minlength="12" maxlength="1500" placeholder="Dated observation, document or professional feedback"></textarea></label><div class="assistant-field-grid"><label>Date checked<input type="date" name="checkedAt" required max="${qv()}" value="${qv()}"></label><label>Source link (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label></div><button type="submit" class="primary-button">${M?"Reopen action":"Record this check"}</button><p class="assistant-caption">Your declaration, not independent verification. No messages or reminders are sent.</p></form>
      ${M?"":`<details id="investmentTaskPlan"><summary>Responsibility &amp; date</summary><form data-milestone-form="plan:${He(f.id)}" data-task-id="${He(f.id)}" data-revision="${i.revision}">${g(f)}<button type="submit">Save action plan</button></form></details>`}<details><summary>Saved record &amp; history</summary><p>${He(f.status)} / ${He(f.checkedAt?.slice(0,10)||"No checked date")}<br>${He(f.note||"No observation yet")}</p>${f.plan?.dateReference?`<p>Date reference: ${He(f.plan.dateReference)}</p>`:""}${[...f.history||[]].reverse().map(x=>`<p>${He(x.at?.slice(0,10))}: ${He(x.status)} / ${He(x.note)}</p>`).join("")}${[...f.planHistory||[]].reverse().map(x=>`<p>Previous plan: ${He(x.dueDate||"Undated")} / ${He(x.responsibility)} / ${He(x.dateReference)}</p>`).join("")}</details></section>`}let y={accept(f){d.delete(f),(f==="add"||f.startsWith("check:"))&&(a=""),l=""},render(f,p){if(i=f,s=p,!i?.selected){r="",a="",l="",d.clear();return}r!==i.id&&(r=i.id,a="",o=i.stage,c=i.stage,l="",d.clear()),c!==i.stage&&(c=i.stage,a="",o=i.stage);let M=n.querySelector("#investmentActions");if(!M)return;let x=i.tasks.find(A=>A.id===a)||i.tasks.find(A=>A.id===i.ownershipPlan.nextId),_=[...M.querySelectorAll("details[open][id]")].map(A=>A.id);l=u(),M.innerHTML=`${i.ownershipPlan.attention.length?`<div class="assistant-plan-attention"><b>Needs attention</b>${i.ownershipPlan.attention.map(A=>`<button type="button" data-milestone-open="${He(A.id)}">${He(A.title)} / ${A.blocked?"waiting":He(A.timing)}${A.dueDate?` / ${He(A.dueDate)}`:""}</button>`).join("")}</div>`:""}${v(x)}<details id="investmentActionList"><summary>Action plan / ${i.ownershipPlan.openCount} open</summary><p class="assistant-caption">Plan dates as of ${He(i.ownershipPlan.asOf)} / Malaysia time. Plans are private; assigning a role does not contact that person. Check legal deadlines with your professional.</p><label>Stage<select id="investmentPlanStage"><option value="all" ${o==="all"?"selected":""}>All stages</option>${Object.entries(ko).map(([A,C])=>`<option value="${A}" ${o===A?"selected":""}>${C}</option>`).join("")}</select></label><div class="assistant-plan-list">${i.ownershipPlan.rows.filter(A=>o==="all"||A.stage===o).map(A=>`<button type="button" data-milestone-open="${He(A.id)}"><b>${He(A.title)}</b><small>${He(A.status)} / ${He(A.responsibility)} / ${He(A.dueDate||"Undated")}${A.timing==="overdue"?" / overdue":""}</small></button>`).join("")||"<p>No recorded actions in this stage.</p>"}</div><button type="button" data-milestone-open="add">Add an action</button></details>`;for(let A of M.querySelectorAll("[data-milestone-form]")){let C=A.dataset.milestoneForm,I=d.get(C);if(!I)continue;let O=I.baseline!==l;O||(I.revision=i.revision),A.dataset.revision=I.revision;for(let E of A.elements)E.name&&Object.hasOwn(I.values,E.name)&&(E.type==="checkbox"?E.checked=E.name==="dependsOn"?I.values.dependsOn.includes(E.value):!O&&I.values[E.name]==="on":E.value=I.values[E.name]);O&&A.insertAdjacentHTML("beforebegin",`<p role="status">The action plan changed elsewhere. Your unsaved draft is preserved. Compare it with the saved record before continuing.</p><button type="button" data-milestone-resolve="local" data-draft-key="${He(C)}">Review my draft</button><button type="button" data-milestone-resolve="saved" data-draft-key="${He(C)}">Use saved record</button>`)}for(let A of _){let C=M.querySelector(`#${A}`);C&&(C.open=!0)}}};return y}var xe=n=>document.querySelector(n),Ve=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Mp=n=>new Intl.NumberFormat("en-MY",{style:"currency",currency:"MYR",maximumFractionDigits:0}).format(n),xu={rental_income:"Rental income",appreciation:"Capital appreciation",own_stay:"My own home",balanced:"A balance",discovery:"Discovery",site_visit:"Site visit",transaction:"Transaction",handover:"Handover",rental:"Rental",review:"Holding review"},ga=()=>new Date().toISOString().slice(0,10);function Xv({openTool:n,useProperty:e,notify:t,onContextSaved:i,onContextState:s,onInvestigationDeleted:r}){let a=xe("#investmentAssistant"),o=null,l=null,c=!1,d=0,u,h=[],g=!1,v=new Set,y=new Map,f=zv({request:_,onSaved(N,V){i?.(N,V),o?.id===N&&(o=V)},onState(N,V,te){y.set(N,{value:V,error:te?.message||""}),s?.(N,V,te),o?.id===N&&P()}});a.innerHTML=`<header class="assistant-intro"><div class="assistant-orb" aria-hidden="true"><span>A</span></div><p class="eyebrow">YOUR PROPERTY THINKING PARTNER</p><h1>A clearer way forward.</h1><p>Tell me what you want property investment to do for you.</p></header>
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
    <details class="assistant-boundaries"><summary>What happens with my information?</summary><p>Your confirmed brief guides the search; it does not prove affordability. Turning on AI sends submitted messages and relevant case context to the configured provider. Your private observations never update the shared founder framework. Site visits, professional checks and external commitments still need people.</p><p id="investmentCoverage"></p></details>`,a.querySelector(".assistant-more").insertAdjacentHTML("beforeend",'<button id="investmentCleanup" type="button" hidden>Retry private file cleanup</button><p id="investmentCleanupNotice" class="assistant-caption" role="status"></p>');let p=Gv(a,{onResolve:()=>{xe("#investmentError").textContent=""},run:(N,V)=>G(async()=>{let te=o?.id,ue=d;if(!te)return;let Me=await V(),ve=await _(`/api/assistant/cases/${te}/files${N?"/"+N:""}`,Me);ue!==d||o?.id!==te||(p.accept(N),o=ve.case,O(),x(ve.pendingFileDeletes))})}),M=jv(a,{clearError:()=>{xe("#investmentError").textContent=""},run:(N,V,te)=>G(async()=>{let ue=o?.id,Me=d;if(!ue)return;let ve=await _(`/api/assistant/cases/${ue}/${N}`,V);Me!==d||o?.id!==ue||(M.accept(te),o=ve.case,O())})});function x(N){N!==void 0&&(a.classList.toggle("has-file-cleanup",!!N),xe("#investmentCleanup").hidden=!N,xe("#investmentCleanupNotice").textContent=N?`${N} original-file cleanup(s) still pending. Files are not accessible through deleted records. Retry after a few minutes; the server retains a cleanup record.`:"")}async function _(N,V,te=V?"POST":"GET"){let ue=new AbortController,Me=setTimeout(()=>ue.abort(),6e4);v.add(ue);try{let ve=await fetch(N,{method:te,headers:{"content-type":"application/json"},body:V?JSON.stringify(V):void 0,signal:ue.signal}),H=await ve.json();if(!ve.ok)throw Object.assign(new Error(H.error||"The request could not be completed."),{status:ve.status});return H}catch(ve){throw ve.name==="AbortError"?new Error("Request interrupted. Reload the investigation to check what was saved before retrying."):ve}finally{clearTimeout(Me),v.delete(ue)}}function A(N){c=N,xe("#investmentComposer button").disabled=N;for(let V of["investmentCaseSelect","investmentNew","investmentDelete"])xe("#"+V).disabled=N;a.setAttribute("aria-busy",String(N))}function C(N){xe("#investmentError").textContent=N.message||String(N)}async function I(){let N=d,V=await _("/api/assistant/cases");N===d&&(h=V.cases,a.classList.toggle("no-cases",!h.length&&!o),xe("#investmentCaseSelect").innerHTML=h.length?h.map(te=>`<option value="${Ve(te.id)}" ${o?.id===te.id?"selected":""}>${Ve(te.title)} / ${Ve(xu[te.stage])}</option>`).join(""):'<option value="">No saved investigation</option>')}function O(){xe("#investmentExport").hidden=!o,xe("#investmentDelete").hidden=!o;let N=xe("#investmentMessages"),V=N.scrollHeight-N.scrollTop-N.clientHeight<60;N.innerHTML=(o?.messages||[]).map(H=>`<article class="assistant-message ${H.role==="user"?"from-user":"from-apex"}"><small>${H.role==="user"?"YOU":`APEX / ${H.mode==="llm"?"AI + FRAMEWORK":"FRAMEWORK"}`}</small><p>${Ve(H.content)}</p></article>`).join(""),V&&(N.scrollTop=N.scrollHeight),a.classList.toggle("has-conversation",!!o?.messages.length);let te=xe("#investmentBrief"),ue=o?.brief;te.hidden=!o||!!(o.selected||o.profileIntake)||!(ue?.area||ue?.goal||ue?.budgetMax),ue&&!te.hidden&&(te.innerHTML=`<details ${!o.confirmedAt||g?"open":""}><summary>Your search brief <span>${o.confirmedAt&&!g?"Confirmed":"Please review"}</span></summary><form id="investmentBriefForm"><div class="assistant-field-grid"><label>Location<input name="area" required maxlength="120" value="${Ve(ue.area)}" placeholder="Town, neighbourhood or state"></label><label>Purpose<select name="goal" required><option value="">Choose your objective</option>${Object.entries(xu).slice(0,4).map(([H,k])=>`<option value="${H}" ${ue.goal===H?"selected":""}>${k}</option>`).join("")}</select></label><label>Search ceiling (RM)<input name="budgetMax" type="number" min="1" max="1000000000" required value="${ue.budgetMax??""}" inputmode="decimal"></label><label>Property type<select name="propertyType">${[["any","Open to residential options"],["condo","Condominium"],["serviced_apartment","Serviced apartment"],["landed","Landed"]].map(([H,k])=>`<option value="${H}" ${ue.propertyType===H?"selected":""}>${k}</option>`).join("")}</select></label></div><p class="assistant-caption">Confirm what I understood. This is a search range, not loan approval or a recommendation to spend it.</p><button type="submit" class="primary-button">${o.confirmedAt?"Search again with this brief":"Confirm & find candidates"}</button></form></details>`);let Me=o?.job;xe("#investmentRun").hidden=!Me,Me&&(xe("#investmentRun").innerHTML=`<div><span class="live-dot"></span><b>${Ve(Me.status==="completed"?"Search complete":Me.status==="cancelled"?"Search stopped":Me.status==="failed"?"Search needs attention":Me.labels[Math.min(Me.step,2)])}</b><small>${Math.min(Me.step,3)} / 3</small></div>${["queued","running"].includes(Me.status)?'<button type="button" data-investment-action="cancel">Stop search</button>':""}<p>${Ve(Me.error||"Uses the published catalogue only. You can use other tools while this runs; return here to see the result.")}</p>`);let ve=o?.results;xe("#investmentResults").hidden=!ve||!!(o?.selected||o?.profileIntake)||Me?.status!=="completed",ve&&(xe("#investmentResults").innerHTML=`<header><p class="eyebrow">${ve.coverage.current} CURRENT RECORDS / ${ve.coverage.sources.length} PUBLISHED SOURCES</p><h2>${ve.candidates.length?"Worth a closer look":"No supported match yet"}</h2><p>${Ve(ve.message)}</p></header><div class="assistant-shortlist">${ve.candidates.map(H=>`<article class="assistant-candidate"><span class="status-pill">INVESTIGATE</span><h3>${Ve(H.projectName)}</h3><p>${Ve(H.area)} / ${Ve(H.propertyType.replaceAll("_"," "))}</p><strong>${Mp(H.askingPrice)}</strong><small>Asking price / checked ${H.observedAt.slice(0,10)}</small><p>${Ve(H.reasons[0])}</p><p class="candidate-gap">${Ve(H.gaps[0])}</p><details><summary>Evidence &amp; contrary case</summary><p>${Ve(H.counterCase)}</p><ul>${H.gaps.map(k=>`<li>${Ve(k)}</li>`).join("")}</ul><a href="${Ve(H.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original listing</a>${H.facts.map(k=>`<p><a href="${Ve(k.sourceUrl)}" target="_blank" rel="noopener noreferrer">${Ve(k.kind.replaceAll("_"," "))}</a> / ${k.observedAt.slice(0,10)} / ${Ve(k.verification.replaceAll("_"," "))}<br>${Ve(k.description)}</p>`).join("")}</details><button type="button" class="primary-button" data-investment-select="${Ve(H.id)}">Investigate this property</button></article>`).join("")}</div><details><summary>Search coverage and exclusions</summary><p>${Ve(ve.rankingBasis)}</p><p>${Object.entries(ve.excluded).map(([H,k])=>`${Ve(H)}: ${k}`).join(" / ")}</p><p>${Ve(ve.coverage.limit)}</p><p>${ve.coverage.sources.map(H=>`${Ve(H.name)}: ${Ve(H.coverage||"Coverage not specified")}`).join("<br>")}</p></details>`),w(),M.render(o,l),E(),p.render(o,l)}function E(){let N=xe("#investmentFinance"),V=o?.profileIntake;N.hidden=!V,xe("#investmentProfileStart").hidden=!!V,xe("#investmentProfileStart").textContent=o?.working?.financialProfile&&Object.keys(o.working.financialProfile).length?"Review my buying power":"Check my buying power",xe("#investmentInput").placeholder=V?"Your answer, or skip...":"Find a rental property in Penang that fits my situation...",V&&(N.innerHTML=`<header><b>Your financial draft</b><small>${V.answered} / 4 answered</small></header><p class="assistant-caption">Saved figures stay unchanged until you confirm. Skipped fields replace earlier figures with unknowns. This intake uses no AI provider.</p>
      <details ${V.pending?"":"open"}><summary>Review figures</summary><dl>${V.rows.map(te=>`<div><dt>${Ve(te.label)}</dt><dd>${te.state==="pending"?"Not answered":te.state==="skipped"?"Unknown / skipped":te.key==="cashReserveMonths"?`${Ve(te.value)} months`:Mp(Number(te.value))}</dd></div>`).join("")}</dl></details>
      ${V.stale?'<p class="error-note" role="status">Saved inputs changed while this draft was open. Restart the conversation to review the current version. Nothing has been overwritten.</p>':""}
      <div class="assistant-finance-actions">${V.pending?'<button type="button" data-profile-action="skip">Skip this question</button>':`<button type="button" class="primary-button" data-profile-action="confirm" ${!V.canConfirm||V.stale?"disabled":""}>Confirm &amp; save profile</button>`}<button type="button" data-profile-action="restart">Start these questions again</button><button type="button" data-profile-action="cancel">Cancel intake</button></div><details><summary>How to correct a figure</summary><p class="assistant-caption">Use the chat with labels, for example: net income 8000; debt repayments 1500; purchase cash 60k; reserve 6 months. Reserve means essential expenses after the purchase, not salary. To remove a draft answer, restart and skip that question.</p></details>`)}function w(){let N=xe("#investmentProperty"),V=o?.selected;if(N.hidden=!V||!!o?.profileIntake,N.hidden)return;let te=N.querySelector("#investmentActions");N.innerHTML=`<header><p class="eyebrow">ONE PROPERTY / A CONTINUING INVESTIGATION</p><h2>${Ve(V.projectName)}</h2><p>${Ve(xu[o.stage])} / ${Ve(V.area)}</p><button type="button" class="secondary-button" data-investment-action="numbers">Open the valuation tools</button></header>
      <p id="investmentSyncNotice" class="assistant-caption" role="status"></p><div id="investmentSyncActions" hidden><details><summary>Review the differences</summary><div id="investmentSyncDiff"></div></details><button type="button" data-investment-action="retry-sync">Retry saving</button><button type="button" data-investment-action="download-context">Export unsaved inputs</button><button type="button" data-investment-action="keep-context">Keep my tool edits</button><button type="button" data-investment-action="reload-context">Use the saved inputs</button></div>
      ${o.working?`<details><summary>Working assumptions / saved ${o.working.updatedAt.slice(0,10)}</summary><p>Tool edits are private user-declared inputs. They do not change the original listing snapshot or prove the claims.</p><p>Working price: ${Ve(o.working.dealCard.askingPrice||"Not provided")} / Working rent: ${Ve(o.working.dealCard.expectedRent||"Not provided")} / Income: ${Ve(o.working.financialProfile.monthlyIncome||"Not provided")}</p></details>`:""}
      ${o.sourceStatus&&o.sourceStatus.status!=="current"?`<p class="candidate-gap" role="status">${Ve(o.sourceStatus.note)}</p>`:""}
      <div id="investmentActions"></div>
      <details><summary>Private observations</summary><form id="investmentEvidenceForm"><label>Add a private observation<textarea name="note" required minlength="12" maxlength="2000"></textarea></label><label>Date<input type="date" name="checkedAt" required max="${ga()}" value="${ga()}"></label><label>Source (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label><button type="submit">Keep this evidence</button></form>${o.evidence.map(ue=>`<p>${Ve(ue.note)}<br><small>${ue.checkedAt.slice(0,10)} / user declared</small></p>`).join("")}</details>
      <details><summary>Move to another ownership stage</summary><form id="investmentStageForm"><label>Current situation<select name="stage">${Object.entries(xu).slice(5).map(([ue,Me])=>`<option value="${ue}" ${ue===o.stage?"selected":""}>${Me}</option>`).join("")}</select></label><label>What changed, and what remains unresolved?<textarea name="note" required minlength="12" maxlength="1000"></textarea></label><button type="submit">Update my stage</button><p class="assistant-caption">This records your progress, not approval to transact. Apex does not sign, pay, book or contact anyone automatically.</p></form></details>
      <details><summary>Actual rental and holding outcomes</summary><form id="investmentOutcomeForm"><div class="assistant-field-grid"><label>Month<input name="month" type="month" required max="${ga().slice(0,7)}" value="${ga().slice(0,7)}"></label><label>Rent received (RM)<input name="rentReceived" type="number" step="0.01" min="0" required></label><label>All monthly outgoings (RM)<input name="totalCosts" type="number" step="0.01" min="0" required></label><label>Notes<input name="note" maxlength="1000" placeholder="Vacancy, repairs, loan and recurring charges"></label></div><button type="submit">Record actual outcome</button></form>${o.outcomes.map(ue=>`<p>${Ve(ue.month)} / ${Mp(ue.cashFlow)} cash flow<br>${Ve(ue.note)}</p>`).join("")}</details>
      <details><summary>Decision history</summary>${o.events.slice().reverse().map(ue=>`<p>${Ve(ue.description)}<br><small>${ue.at.slice(0,10)}</small></p>`).join("")}</details>`,te&&N.querySelector("#investmentActions").replaceWith(te),P()}function P(){let N=xe("#investmentSyncNotice");if(!N)return;let V=y.get(o?.id),te=V&&["conflict","unsaved"].includes(V.value);if(N.textContent=te?`${V.value==="conflict"?"Working inputs changed elsewhere.":"Tool edits are not saved to the investigation."} ${V.error} Your local copy remains in the tools; export it before choosing the saved version.`:V&&["pending","saving"].includes(V.value)?"Saving working inputs to this investigation...":o?.working?"The assistant and tools use the same saved working inputs.":"The original source snapshot is preserved when you edit assumptions in the tools.",xe("#investmentSyncActions").hidden=!te,te){let ue=f.pending(o.id),Me=o.toolContext||{};xe("#investmentSyncDiff").innerHTML=ue?Object.keys(ue).flatMap(ve=>Array.from(new Set([...Object.keys(ue[ve]||{}),...Object.keys(Me[ve]||{})])).filter(H=>JSON.stringify(ue[ve]?.[H])!==JSON.stringify(Me[ve]?.[H])).map(H=>`<p><b>${Ve(H.replace(/([A-Z])/g," $1"))}</b><br>Your tool edit: ${Ve(typeof ue[ve]?.[H]=="object"?JSON.stringify(ue[ve][H]):ue[ve]?.[H]??"Not provided")}<br>Saved: ${Ve(typeof Me[ve]?.[H]=="object"?JSON.stringify(Me[ve][H]):Me[ve]?.[H]??"Not provided")}</p>`)).join(""):"No pending tool copy is available."}}async function B(N){let V=d,te=await _(`/api/assistant/cases/${N}`);V===d&&(o=te.case,g=!1,O())}async function q(N,V={}){if(!o)return;f.hasPending(o.id)&&(await f.flush(o.id),await B(o.id));let te=d,ue=o.id,Me=await _(`/api/assistant/cases/${ue}/${N}`,{...V,revision:o.revision});te!==d||o?.id!==ue||(o=Me.case,O(),(N==="message"||N==="profile")&&(xe("#investmentMessages").scrollTop=xe("#investmentMessages").scrollHeight),N==="profile"&&V.action==="confirm"&&(f.accept(o),o.selected&&e(o,{replace:!0})))}async function G(N){if(!c){A(!0),xe("#investmentError").textContent="";try{await N(),await I()}catch(V){C(V),V.status===409&&o&&await B(o.id).catch(C)}finally{A(!1),J()}}}function J(){clearTimeout(u),!(!o?.job||!["queued","running"].includes(o.job.status))&&(u=setTimeout(()=>{if(c){J();return}G(()=>l?.backgroundMode==="server"?B(o.id):q("step",{jobId:o.job.id}))},l?.backgroundMode==="server"?1800:650))}async function Y(){let N=d,V=await _("/api/assistant/cases",{});N===d&&(o=V.case,g=!1,O())}async function ie(){d++,clearTimeout(u),f.reset(),y.clear();for(let te of v)te.abort();o=null,O();let N=d,V=await _("/api/assistant/status");N===d&&(l=V,x(l.files?.pendingDeletes||0),xe("#investmentStorage").textContent=l.storageNotice,xe("#investmentModel").textContent=l.llm?"AI available / opt in to use":"Framework mode / AI not configured",xe("#investmentAi").checked=!1,xe("#investmentAi").disabled=!l.llm,xe("#investmentCoverage").textContent=`${l.coverage.current} current records from ${l.coverage.sources.length} published sources. ${l.coverage.limit} ${l.background}`,xe("#investmentAdopt").hidden=!l.guestDraftAvailable,await I(),h.length&&(await B(h[0].id),J()))}xe("#investmentComposer").addEventListener("submit",N=>{N.preventDefault();let V=xe("#investmentInput"),te=V.value.trim();te&&G(async()=>{o||await Y(),await q("message",{message:te,allowAi:xe("#investmentAi").checked,editBrief:g}),V.value=""})}),a.addEventListener("submit",N=>{let V=N.target.id,te={investmentBriefForm:"confirm",investmentStageForm:"stage",investmentOutcomeForm:"outcome",investmentEvidenceForm:"evidence"}[V];if(!te)return;N.preventDefault();let ue=Object.fromEntries(new FormData(N.target));G(async()=>{await q(te,te==="confirm"?{brief:{...o.brief,...ue}}:{...ue,...te==="task"?{status:"done"}:{}}),g=!1,O()})}),a.addEventListener("click",N=>{let V=N.target.closest("button");if(V){if(V.dataset.profileAction&&G(async()=>{await q("profile",{action:V.dataset.profileAction}),o.profileIntake?.pending&&xe("#investmentInput").focus()}),V.dataset.investmentSelect&&G(async()=>{await q("select",{listingId:V.dataset.investmentSelect}),e(o)}),V.dataset.investmentAction==="cancel"&&G(()=>q("cancel",{jobId:o.job.id})),V.dataset.investmentAction==="numbers"&&e(o)!==!1&&n("valuation"),V.dataset.investmentAction==="retry-sync"&&G(async()=>{await f.flush(o.id),await B(o.id)}),V.dataset.investmentAction==="keep-context"){if(V.dataset.confirm!==o.id){V.dataset.confirm=o.id,V.textContent="Confirm: replace saved assumptions with my tool edits";return}G(async()=>{await f.keepLocal(o),await B(o.id),e(o,{replace:!0})})}if(V.dataset.investmentAction==="download-context"){let te=f.pending(o.id);if(!te)return;let ue=URL.createObjectURL(new Blob([JSON.stringify({format:"apex-unsaved-context.v1",investigationId:o.id,context:te},null,2)],{type:"application/json"})),Me=document.createElement("a");Me.href=ue,Me.download=`apex-unsaved-inputs-${ga()}.json`,Me.click(),setTimeout(()=>URL.revokeObjectURL(ue),1e3)}if(V.dataset.investmentAction==="reload-context"){if(V.dataset.confirm!==o.id){V.dataset.confirm=o.id,V.textContent="Confirm: replace local tool edits with saved inputs";return}G(async()=>{await B(o.id),f.accept(o),e(o,{replace:!0})})}}}),xe("#investmentNew").addEventListener("click",()=>void G(Y)),xe("#investmentProfileStart").addEventListener("click",()=>void G(async()=>{o||await Y(),await q("profile",{action:"start"}),xe("#investmentInput").focus()})),xe("#investmentCaseSelect").addEventListener("change",N=>void G(()=>B(N.target.value))),xe("#investmentAccount").addEventListener("click",()=>void n("account")),xe("#investmentCleanup").addEventListener("click",()=>void G(async()=>{let N=await _("/api/assistant/cleanup",{});x(N.pendingFileDeletes)})),xe("#investmentAdopt").addEventListener("click",()=>void G(async()=>{await _("/api/assistant/adopt",{}),await ie()})),xe("#investmentExport").addEventListener("click",()=>{if(!o)return;let N=URL.createObjectURL(new Blob([JSON.stringify({format:"apex-investigation.v1",exportedAt:new Date().toISOString(),case:o},null,2)],{type:"application/json"})),V=document.createElement("a");V.href=N,V.download=`apex-investigation-${ga()}.json`,V.click(),setTimeout(()=>URL.revokeObjectURL(N),1e3),o.attachments?.length&&t("JSON export includes file notes and extraction, not the original bytes. Download originals individually from Private evidence.")}),xe("#investmentDelete").addEventListener("click",N=>{if(!(!o||c)){if(N.target.dataset.confirm!==o.id){N.target.dataset.confirm=o.id,N.target.textContent="Confirm delete: chat, evidence, outcomes and linked tool inputs";return}G(async()=>{let V=o.id,te=await _(`/api/assistant/cases/${V}`,null,"DELETE");f.forget(V),r?.(V),o=null,O(),x(te.pendingFileDeletes),N.target.textContent="Delete this investigation",N.target.dataset.confirm=""})}});let W,ce=window.SpeechRecognition||window.webkitSpeechRecognition;return xe("#investmentVoice").hidden=!ce,xe("#investmentVoice").addEventListener("click",()=>{if(W){W.stop();return}W=new ce,W.lang="en-MY",W.onresult=N=>{xe("#investmentInput").value=Array.from(N.results).map(V=>V[0].transcript).join(" ")},W.onerror=()=>C(new Error("Voice input is unavailable. You can type your message instead.")),W.onend=()=>{W=null,xe("#investmentVoice").textContent="Speak"},W.start(),xe("#investmentVoice").textContent="Stop listening"}),document.addEventListener("apex:auth",()=>{W?.stop(),ie().catch(C)}),ie().catch(C),{holdContext(N,V){f.hold(N.investigationId,V.working?.revision||0,N)},queueContext(N){N?.investigationId&&(f.register(N.investigationId,N.assistantRevision||0,N.assistantSynced||{}),f.queue(N.investigationId,N.assistantRevision||0,dn(N)))},async prepareTools(N){if(!N?.investigationId)return;let V=d;if(f.register(N.investigationId,N.assistantRevision||0,N.assistantSynced||{}),N.assistantPending||f.hasPending(N.investigationId)){f.queue(N.investigationId,N.assistantRevision||0,dn(N));try{await f.flush(N.investigationId)}catch{return}}try{let te=await _(`/api/assistant/cases/${N.investigationId}`);if(V!==d)return;if(!N.assistantSynced&&JSON.stringify(dn(N))!==JSON.stringify(dn(te.case.toolContext))){f.hold(N.investigationId,te.case.working?.revision||0,N);return}f.hasPending(N.investigationId)||(f.accept(te.case),e(te.case,{replace:!0}))}catch(te){V===d&&(s?.(N.investigationId,"unsaved",te),t("Could not refresh this investigation. The tools retain this browser's copy; do not treat it as the latest saved version."))}},async resume(N){if(N){try{await f.flush(N)}catch(V){C(V)}try{await B(N)}catch(V){C(V)}}else o&&await B(o.id).catch(C);this.show(),J()},show(){a.hidden=!1,document.body.classList.add("assistant-active"),document.body.classList.remove("workspace-active"),xe("#workbench").hidden=!0,document.querySelectorAll("[data-area]").forEach(N=>N.setAttribute("aria-current",N.dataset.area==="assistant"?"page":"false")),history.replaceState(null,"","#assistant")},hide(){a.hidden=!0,document.body.classList.remove("assistant-active"),W?.stop()}}}function Yv(n){n.querySelector("#workspacePanels").insertAdjacentHTML("beforeend",`<section data-surface="catalogue" class="studio-surface" hidden><header><span><small>OWNER ONLY</small><b>Published discovery sources</b></span></header><p>Publish only records you are permitted to redistribute. This catalogue is separate from private evidence and the founder's 407 answers.</p><form id="catalogueForm"><label>Owner token<input id="catalogueToken" type="password" autocomplete="off"></label><label>Permitted source export (JSON)<input id="catalogueFile" type="file" accept=".json,application/json"></label><p>A complete import replaces that source's earlier records, so withdrawn listings do not remain active.</p><button type="submit" class="primary-button">Validate &amp; publish source</button><button type="button" id="catalogueRefresh">Refresh coverage</button><a href="/assistant/catalogue-template.json" download>Download an empty import template</a></form><p id="catalogueMessage" role="status"></p><div id="catalogueSources"></div></section>`);async function e(i="GET",s){let r=await fetch("/api/owner/discovery",{method:i,headers:{"content-type":"application/json","x-estatelab-owner-token":xe("#catalogueToken").value||xe("#ownerIntelToken")?.value||""},body:s?JSON.stringify(s):void 0}),a=await r.json();if(!r.ok)throw new Error(a.error||"Catalogue request failed.");return a}async function t(){let i=await e();xe("#catalogueSources").innerHTML=`<p>${i.coverage.current} current listings / ${i.coverage.records} total records.</p>${i.sources.map(s=>`<article><h3>${Ve(s.name)}</h3><p>${Ve(s.coverage)} / ${Ve(s.permission)}</p><p>${Ve(s.permissionReference)}</p><button type="button" data-unpublish="${Ve(s.id)}">Unpublish this source</button></article>`).join("")}`}xe("#catalogueRefresh").addEventListener("click",()=>void t().catch(i=>{xe("#catalogueMessage").textContent=i.message})),xe("#catalogueForm").addEventListener("submit",async i=>{i.preventDefault();let s=xe("#catalogueFile").files[0],r=i.target.querySelector('[type="submit"]');r.disabled=!0;try{if(!s||s.size>4*1024*1024)throw new Error("Choose a JSON source export under 4 MB.");let a=await e("POST",JSON.parse(await s.text()));xe("#catalogueMessage").textContent=`Published ${a.imported} records. Import validates structure, not the truth of source claims.`,await t()}catch(a){xe("#catalogueMessage").textContent=a.message}finally{r.disabled=!1}}),xe("#catalogueSources").addEventListener("click",async i=>{let s=i.target.closest("[data-unpublish]");if(s){if(s.dataset.confirm!=="true"){s.dataset.confirm="true",s.textContent="Confirm unpublish";return}try{await e("DELETE",{sourceId:s.dataset.unpublish}),await t()}catch(r){xe("#catalogueMessage").textContent=r.message}}})}var ka={desk:{title:"The decision desk",description:"Explore the question. Test the numbers. Keep your context together.",views:[["chat","Ask Apex","Your thinking partner"],["deal","Property inputs","Shared with the journey"],["profile","Investor profile","Capacity, goals and reserves"],["valuation","Valuation lab","DCF, comparisons and Excel"],["guidance","Preferences","Choose your guidance style"]]},library:{title:"Your private library",description:"Return to what you learned, decided and saved.",views:[["reports","Decision reports","Saved seven-stage assessments"],["journal","Decision journal","Thesis, outcomes and lessons"],["memory","Long-term memory","Review what Apex remembers"],["history","Conversations","Resume or manage your history"],["shortlist","Saved shortlist","Compare earlier assessments"]]},owner:{title:"Owner Studio",description:"Curate the intelligence. Shared knowledge stays under your control.",views:[["owner","Intelligence hub","Coverage, research and operations"],["catalogue","Discovery catalogue","Permitted sources and current listings"],["market","Market observatory","Projects and dated observations"],["cases","Development cases","Your project-level experience"],["evidence","Evidence vault","Sources, documents and indexing"]]},account:{title:"Your account",description:"Private access, plan details and the boundaries that protect your decisions.",views:[["account","Account & plan","Sign in, security and billing"],["trust","Decision boundaries","What Apex can and cannot do"]]}},vl=Object.entries(ka).flatMap(([n,e])=>e.views.map(([t,i,s])=>({area:n,id:t,label:i,description:s}))),$t=n=>document.querySelector(n);function bx({getCandidate:n,notify:e,onVisibility:t,beforeOpen:i}){let s=$t("#workbench");s.innerHTML=`<aside class="studio-sidebar"><p class="eyebrow">APEX / WORKSPACE</p><h2 id="studioAreaTitle"></h2><p id="studioAreaDescription"></p><label class="studio-search"><span class="sr-only">Find a feature</span><input id="studioSearch" type="search" placeholder="Find a tool..." autocomplete="off"></label><nav id="studioNav" aria-label="Workspace sections"></nav><label class="mobile-section"><span>Section</span><select id="studioSectionSelect"></select></label><p class="studio-private">Your property stays selected as you move between tools. Knowledge updates are owner-only.</p></aside><div class="studio-main"><header class="studio-breadcrumb"><span id="studioBreadcrumb"></span><button type="button" data-return-journey>Back to journey <span aria-hidden="true">&#8599;</span></button></header><div id="studioLoading" role="status" hidden>Connecting your workspace...</div>${Hv}</div>`,Yv(s),s.querySelector(".studio-breadcrumb").insertAdjacentHTML("afterend",'<p id="studioSyncStatus" class="assistant-caption" role="status" hidden></p>');let r,a,o="",l="desk",c=!1;$t("#studioBreadcrumb").tabIndex=-1;let d;try{let f=JSON.parse(localStorage.getItem("estatelab.jarvis.dealCard")||"{}"),p=JSON.parse(localStorage.getItem("estatelab.jarvis.financialProfile")||"{}");!localStorage.getItem("apex.workspace.recovered")&&(Object.keys(f).length||Object.keys(p).length)&&(d={dealCard:f,financialProfile:p})}catch{}if(d){let f=document.createElement("details");f.className="draft-recovery",f.innerHTML='<summary>Earlier browser inputs found</summary><p>Recover the draft saved on this device. Review it before relying on it; your existing properties will not be overwritten.</p><button type="button" data-recover-draft>Recover draft</button>',s.querySelector(".studio-sidebar").append(f)}for(let f of vl){let p=s.querySelector(`[data-surface="${f.id}"] > header > span > b:not([id])`);p&&(p.textContent=f.label)}function u(f,p=!0){let M=vl.find(x=>x.id===f);M&&(o=f,l=M.area,document.dispatchEvent(new CustomEvent("apex:leave-assistant")),s.hidden=!1,document.body.classList.add("workspace-active"),t(!0),$t("#studioAreaTitle").textContent=ka[l].title,$t("#studioAreaDescription").textContent=ka[l].description,$t("#studioBreadcrumb").textContent=`${ka[l].title} / ${M.label}`,s.querySelectorAll("[data-surface]").forEach(x=>{x.hidden=x.dataset.surface!==f}),document.querySelectorAll("[data-area]").forEach(x=>x.setAttribute("aria-current",x.dataset.area===l?"page":"false")),$t("#studioAccount").setAttribute("aria-current",l==="account"?"page":"false"),h($t("#studioSearch").value),p&&history.replaceState(null,"",`#${l}/${f}`))}function h(f=""){let p=f.trim().toLowerCase();s.dataset.searching=String(!!p);let M=p?vl.filter(x=>`${x.label} ${x.description}`.toLowerCase().includes(p)):vl.filter(x=>x.area===l);$t("#studioNav").innerHTML=M.map((x,_)=>`<button type="button" data-view="${x.id}" aria-current="${o===x.id?"page":"false"}"><span class="studio-nav-number">${String(_+1).padStart(2,"0")}</span><span><b>${x.label}</b><small>${x.description}</small></span><span aria-hidden="true">&#8599;</span></button>`).join("")||'<p>No matching tools. Try "reports", "DCF" or "memory".</p>',$t("#studioSectionSelect").innerHTML=Object.entries(ka).map(([x,_])=>`<optgroup label="${_.title}">${_.views.map(([A,C])=>`<option value="${A}" ${A===o?"selected":""}>${C}</option>`).join("")}</optgroup>`).join("")}async function g(){return r&&s.dataset.ready==="true"?r:(a||(a=(async()=>{$t("#studioLoading").hidden=!1;let f=await Promise.resolve().then(()=>(yx(),vx));return r=f,f.setWorkspaceCandidate(n()),await f.initializeFeatures(),$t("#studioLoading").hidden=!0,s.dataset.ready="true",f})().catch(f=>{throw a=null,$t("#studioLoading").textContent="Workspace connection failed. Try selecting a section again.",f})),a)}async function v(f="chat",p={}){if(c||r?.workspaceBusy()){e("Let Apex finish the current request before switching tools.");return}c=!0,u(f),$t("#studioSearch").value="";try{await i?.(f);let M=await g();f!=="catalogue"&&await M.openWorkspaceFeature(f,p),u(o||f),o==="account"&&f!=="account"&&e("Sign in to open your private library. Guest chat and property tools remain available."),window.scrollTo({top:0,behavior:"instant"}),f!=="chat"&&!matchMedia("(pointer: coarse)").matches&&$t("#studioBreadcrumb").focus({preventScroll:!0})}catch(M){e(M.message,!0)}finally{c=!1}}function y(){if(c||r?.workspaceBusy()){e("Let Apex finish the current request before switching views.");return}s.hidden=!0,document.body.classList.remove("workspace-active"),document.dispatchEvent(new CustomEvent("apex:leave-assistant")),history.replaceState(null,"","#journey"),t(!1),document.querySelectorAll("[data-area]").forEach(f=>f.setAttribute("aria-current",f.dataset.area==="journey"?"page":"false"))}return document.addEventListener("apex:surface",f=>u(f.detail)),document.addEventListener("apex:notice",f=>e(f.detail,!0)),document.addEventListener("keydown",f=>{f.key==="Escape"&&!s.hidden&&!$t("#workspaceDialog").open&&y()}),s.addEventListener("click",f=>{let p=f.target.closest("button");p&&(p.dataset.view&&v(p.dataset.view),p.hasAttribute("data-return-journey")&&y(),p.hasAttribute("data-studio-close")&&v("chat"),p.hasAttribute("data-recover-draft")&&!r?.workspaceBusy()&&document.dispatchEvent(new CustomEvent("apex:recover-draft",{detail:d})))}),$t("#studioSearch").addEventListener("input",f=>h(f.target.value)),$t("#studioSectionSelect").addEventListener("change",f=>void v(f.target.value)),document.addEventListener("keydown",f=>{(f.ctrlKey||f.metaKey)&&f.key.toLowerCase()==="k"&&(f.preventDefault(),v(o||"chat").then(()=>$t("#studioSearch").focus()))}),document.querySelectorAll("[data-area]").forEach(f=>f.addEventListener("click",()=>{f.dataset.area!=="assistant"&&(f.dataset.area==="journey"?y():v(ka[f.dataset.area].views[0][0]))})),$t("#studioAccount").addEventListener("click",()=>void v("account")),{open:v,close:y,isBusy:()=>c||!!r?.workspaceBusy(),setCandidate(f){r?.setWorkspaceCandidate(f)},restoreRoute(){let f=location.hash.split("/")[1];vl.some(p=>p.id===f)&&v(f)}}}var Ct,ki,xx=!1,Re=n=>document.querySelector(n),pt=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),X1=n=>String(n??"").replace(/EstateLab|Jarvis/gi,"Apex"),Ax=()=>new Date().toISOString().slice(0,10),Tx=()=>crypto.randomUUID(),_l={read(n,e){try{return JSON.parse(localStorage.getItem(n))??e}catch{return e}},write(n,e){localStorage.setItem(n,JSON.stringify(e))}},as={},ss=_l.read("apex.journey.client",null);if(!ss)try{ss=localStorage.getItem("estatelab.jarvis.clientId"),ss&&_l.write("apex.journey.client",ss)}catch{}if(!/^[\w-]{16,128}$/.test(ss||"")){ss=Tx();try{_l.write("apex.journey.client",ss)}catch{}}var Cx=matchMedia("(prefers-reduced-motion: reduce)"),$={candidates:[],active:"",level:0,checkpoint:null,evaluation:null,busy:!1,revision:0,paused:Cx.matches,flat:!1,storageKey:null,world:null,noticeTimer:null};function Dt(n,e=!1){clearTimeout($.noticeTimer),Re("#notice").textContent=X1(n),e||($.noticeTimer=setTimeout(()=>{Re("#notice").textContent=""},6500))}function Ua(){return{id:Tx(),dealCard:{},financialProfile:{},evidence:{},report:null,sessionId:null,chat:[],modified:new Date().toISOString()}}function gt(){return $.candidates.find(n=>n.id===$.active)}function Rx(n){return{dealCard:n.dealCard,financialProfile:n.financialProfile,evidence:n.evidence}}function zn(){if($.storageKey)try{_l.write($.storageKey,{candidates:$.candidates,active:$.active}),Re("#saveStatus").textContent="Saved in this browser. Your framework stays owner-controlled."}catch{Re("#saveStatus").textContent="Browser storage is unavailable. Export your journey to keep a copy."}}function Ix(){$.revision++,$.evaluation=null,gt().report=null,gt().modified=new Date().toISOString(),Re("#levelStatus").textContent="RECHECK NEEDED",zn(),Er(),rs(),ki?.queueContext(gt())}function _d(){let n=Re("#studioSyncStatus"),e=gt();if(!n||(n.hidden=!e?.investigationId,n.hidden))return;let t=e.assistantSyncStatus;n.textContent=t==="conflict"?"These inputs changed elsewhere. Return to Assistant to review the saved version; local edits are retained.":t==="unsaved"?`Tool edits are only saved in this browser. ${e.assistantSyncError||"Reconnect or correct the inputs to save them to the investigation."}`:["pending","saving"].includes(t)?"Saving working inputs to the linked investigation...":"Working inputs are linked to your investigation. The original source record is unchanged."}async function Sd(n,e,t=35e3){let i=new AbortController,s=setTimeout(()=>i.abort(),t);try{let r=await fetch(n,{method:e?"POST":"GET",headers:{"content-type":"application/json","x-estatelab-client-id":ss},body:e?JSON.stringify(e):void 0,signal:i.signal}),a=await r.json().catch(()=>({}));if(!r.ok)throw new Error(a.error||`Request failed (${r.status}).`);return a}catch(r){throw r.name==="AbortError"?new Error("Apex is taking longer to respond. Your work is saved; please try again."):r}finally{clearTimeout(s)}}function Mr(n=$.level){return $.evaluation?.levels?.[n]}function ym(n){return n===0||["active","review","blocked","passed"].includes(Mr(n)?.status)}function Er(){let n=Re("#candidateSelect");n.innerHTML=$.candidates.map((e,t)=>`<option value="${pt(e.id)}">${pt(e.dealCard.projectName||e.dealCard.area||`Property ${t+1}`)}</option>`).join(""),n.value=$.active,Re("#compareCount").textContent=$.candidates.length}function rs(){Re("#levelRail").innerHTML=Rt.map((n,e)=>{let t=Mr(e)?.status||(e===0?"active":"locked"),i={passed:"Cleared",active:"Explore",review:"Evidence needed",blocked:"Resolve issue",locked:"Locked"}[t];return`<button type="button" data-level="${e}" class="${$.level===e?"active":""}" aria-current="${$.level===e?"step":"false"}" aria-disabled="${!ym(e)}" aria-label="Level ${e+1}: ${pt(n.subject)}. ${i}."><span class="rail-number">${t==="passed"?"&#10003;":String(e+1).padStart(2,"0")}</span><span><b>${pt(n.short)}</b><small>${i}</small></span></button>`}).join(""),Re("#levelsPassed").textContent=String($.evaluation?.completed||0).padStart(2,"0"),$.world?.update($.evaluation?.levels||Rt.map((n,e)=>({status:e===0?"active":"locked"})))}function Y1(){let n=Rt[$.level],e=Mr(),t=n.checkpoints.filter(a=>!Ba(gt(),a,as).length).length,i=e?.status==="passed",s=e?.status==="blocked"||e?.status==="review",r=`<button class="primary-button" data-action="enter">${t?"Continue investigation":"Enter this level"}<span aria-hidden="true">&#8599;</span></button>`;i&&$.level<6&&(r=`<button class="primary-button" data-action="next">Continue to ${pt(Rt[$.level+1].title)} <span aria-hidden="true">&#8594;</span></button>`),$.level===6&&i&&(r='<button class="primary-button" data-action="report">Get the decision report <span aria-hidden="true">&#8599;</span></button>'),Re("#levelContent").innerHTML=`
    <p class="level-lead">${pt(n.description)}</p>
    <div class="panel-progress"><span>${t} of ${n.checkpoints.length} checkpoints recorded</span><span>${Math.round(t/n.checkpoints.length*100)}%</span></div>
    <div class="progress-track"><span style="width:${t/n.checkpoints.length*100}%"></span></div>
    ${s?`<div class="gate-result bad"><b>${e.status==="blocked"?"Pause at this level":"The evidence needs another look"}</b><p>${pt(e.blockers?.[0]||e.summary)}</p><button class="secondary-button" data-action="challenge">Ask Apex what to check</button></div>`:""}
    ${i?`<div class="gate-result good"><b>Level cleared</b><p>${pt(e.summary)}</p></div>`:""}
    <ol class="checkpoint-list">${n.checkpoints.map((a,o)=>{let l=!Ba(gt(),a,as).length;return`<li><button type="button" data-checkpoint="${o}"><span class="step-icon ${l?"complete":""}">${l?"&#10003;":String(o+1).padStart(2,"0")}</span><span>${pt(a.title)}</span><span class="step-arrow" aria-hidden="true">&#8599;</span></button></li>`}).join("")}</ol>
    ${r}
    ${t===n.checkpoints.length&&!i?'<button class="secondary-button" data-action="check" style="width:100%;margin-top:10px">Check this level</button>':""}
    <p class="mentor-note">${pt(n.lesson)}</p>`}function K1(n){let e=as[n],t=Ad(gt(),n,as),i=Md.has(n)?"":"required",s=`<span>${pt(e.label)}${i?"":"<small>optional</small>"}</span>`;if(e.options.length)return`<label class="field">${s}<select name="${n}" data-field="${n}" ${i}><option value="">Select what the evidence shows</option>${e.options.map(o=>`<option value="${pt(o.value)}" ${t===o.value?"selected":""}>${pt(o.label)}</option>`).join("")}</select></label>`;let r=/Notes|Thesis|Criterion|Concern|Screening|Reason|Preparation|Commitment/.test(n),a=e.inputMode==="numeric"?"numeric":e.inputMode==="decimal"?"decimal":"text";return`<label class="field">${s}${r?`<textarea data-field="${n}" name="${n}" maxlength="500" placeholder="${pt(e.placeholder)}" ${i}>${pt(t)}</textarea>`:`<input data-field="${n}" name="${n}" value="${pt(t)}" inputmode="${a}" maxlength="500" placeholder="${pt(e.placeholder)}" ${i}>`}</label>`}function J1(){let e=Rt[$.level].checkpoints[$.checkpoint],t=gt().evidence[e.id]||{};Re("#levelContent").innerHTML=`<button class="back-button" data-action="overview">&#8592; Level overview</button>
    <form class="checkpoint-form" id="checkpointForm">
      <h3>${pt(e.title)}</h3><p>${pt(e.prompt)}</p>
      ${e.fields.map(K1).join("")}
      <div class="proof-block"><p>Leave a trace of your reasoning. For financial inputs, record the basis of your calculation.</p>
      <label class="field"><span>Evidence or calculation notes</span><textarea name="proofNote" data-proof="note" minlength="12" maxlength="1500" required placeholder="Source, document, observation or calculation. Say what is still uncertain.">${pt(t.note||"")}</textarea></label>
      <label class="field"><span>Date checked</span><input name="proofDate" data-proof="date" type="date" max="${Ax()}" value="${pt(t.date||"")}" required></label></div>
      <p class="source-line">Framework: ${pt(e.source)}.</p>
      <p id="checkpointError" class="error-note" role="alert"></p>
      <div class="form-actions"><button type="submit" class="primary-button">Save &amp; check <span aria-hidden="true">&#8594;</span></button></div>
    </form>`}function bn(){let n=Rt[$.level],e=Mr()?.status||"active";Re("#levelEyebrow").textContent=`LEVEL ${String($.level+1).padStart(2,"0")} / 07`,Re("#levelTitle").textContent=n.title,Re("#levelSubject").textContent=n.subject.toUpperCase(),Re("#levelStatus").textContent={active:"OPEN",passed:"CLEARED",review:"REVIEW",blocked:"PAUSED",locked:"LOCKED"}[e],Re("#levelStatus").dataset.status=e,$.checkpoint===null?Y1():J1(),Re("#levelPanel").setAttribute("aria-busy",String($.busy))}function vm(n){if(!($.busy||Ct?.isBusy())){if(!ym(n)){Dt("Clear the earlier levels first. Each decision builds on the evidence before it.");return}$.level=n,$.checkpoint=null,bn(),rs(),$.world?.focus(n),Re("#levelPanel").scrollTop=0,innerWidth<800&&Re("#levelPanel").scrollIntoView({behavior:$.paused?"instant":"smooth",block:"start"})}}async function bl(){let n=$.active,e=$.revision,t=await Sd("/api/journey/evaluate",{candidate:Rx(gt())});return n!==$.active||e!==$.revision?null:($.evaluation=t,rs(),t)}async function _x(){if(!($.busy||Ct?.isBusy())){$.busy=!0,Re("#levelPanel").setAttribute("aria-busy","true");try{let n=$.evaluation?.completed||0,e=await bl();if(!e)return;zn();let t=Rt[$.level].checkpoints.findIndex(i=>Ba(gt(),i,as).length);t>=0&&$.checkpoint!==null?$.checkpoint=t:$.checkpoint=null,bn(),Re("#levelPanel").scrollTop=0,e.completed>n?Dt(`${Rt[$.level].title} cleared. The next level is open.`):t<0?Dt(Mr()?.status==="passed"?"This level is cleared.":"Evidence saved. Review the level feedback before proceeding."):Dt("Checkpoint saved. Continue with the next piece of evidence.")}catch(n){let e=Re("#checkpointError");e?e.textContent=n.message:Dt(n.message,!0)}finally{$.busy=!1,Re("#levelPanel").setAttribute("aria-busy","false")}}}function Px(n,e,t="YOUR INVESTIGATION"){Re("#dialogTitle").textContent=n,Re("#dialogEyebrow").textContent=t,Re("#dialogContent").innerHTML=e,Re("#workspaceDialog").open||Re("#workspaceDialog").showModal()}function Sx(){let n={product:"Apex Property Journey",version:1,exportedAt:new Date().toISOString(),candidate:gt(),assessment:$.evaluation},e=URL.createObjectURL(new Blob([JSON.stringify(n,null,2)],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`apex-journey-${Ax()}.json`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}async function Z1(){if(!($.busy||Ct?.isBusy())){Px("Which property earns its place?",'<p role="status">Rechecking each candidate against the same framework...</p>',"YOUR PROPERTY COLLECTION");try{let n=[];for(let a of $.candidates)n.push(await Sd("/api/journey/evaluate",{candidate:Rx(a)}));let e=n.map((a,o)=>({result:a,i:o})).filter(a=>a.result.qualified).sort((a,o)=>(o.result.dimensions||[]).reduce((l,c)=>l+c.score,0)-(a.result.dimensions||[]).reduce((l,c)=>l+c.score,0)),t=e[0],i=a=>a.result.dimensions.reduce((o,l)=>o+l.score,0),s=t?e.filter(a=>i(a)===i(t)):[],r=s.length>1?`${s.map(a=>a.result.candidateName).join(", ")} share the highest framework score. There is no clear winner from these scores alone. Compare the cash-flow assumptions, exit risks and strength of the evidence before choosing.`:t?`${t.result.candidateName} has the strongest average across the four framework dimensions among your qualified candidates. Review its counter-case before deciding.`:"No candidate has cleared every level and the final evidence gate yet. The comparison shows where each investigation needs work.";Re("#dialogContent").innerHTML=`<p>${pt(r)}</p><div class="compare-grid">${n.map((a,o)=>`<article class="compare-card"><small>${a.qualified?"QUALIFIED FOR SHORTLIST REVIEW":"INVESTIGATION IN PROGRESS"}</small><h3>${pt(a.candidateName)}</h3><p>${a.completed} / 7 levels cleared</p>${a.dimensions.map(l=>`<div class="score-row"><span>${pt(l.label)}</span><b>${l.score}/100</b></div>`).join("")}<p>${pt(a.hardStops[0]||a.blockers[0]||a.counterThesis)}</p><button class="secondary-button" data-switch="${pt($.candidates[o].id)}">Open journey</button></article>`).join("")}</div><p class="source-line">Scores reflect your supplied inputs. Evidence quality, hard stops and the investor's situation take priority over the average.</p>`}catch(n){Re("#dialogContent").textContent=n.message}}}function wx(n=""){Ct.setCandidate(gt()),Ct.open("chat",{prompt:n})}async function Q1(){$.busy||Ct.isBusy()||(Ct.setCandidate(gt()),await Ct.open("chat",{analyze:!0}))}async function yl(n){if($.busy||Ct?.isBusy()||!$.candidates.some(e=>e.id===n)){Er();return}window.speechSynthesis?.cancel(),$.active=n,$.level=0,$.checkpoint=null,$.evaluation=null,$.revision++,Ct?.setCandidate(gt()),zn(),Er(),bn(),rs(),$.world?.overview();try{await bl(),bn()}catch(e){Dt(e.message)}}function eI(){Re("#candidateSelect").addEventListener("change",n=>yl(n.target.value)),Re("#levelRail").addEventListener("click",n=>{let e=n.target.closest("[data-level]");e&&vm(Number(e.dataset.level))}),Re("#levelContent").addEventListener("click",n=>{let e=n.target.closest("button");if(!(!e||$.busy)){if(e.dataset.checkpoint!==void 0){$.checkpoint=Number(e.dataset.checkpoint),bn(),$.world?.focus($.level,!0),Re("#levelPanel").scrollTop=0;return}switch(e.dataset.action){case"overview":$.checkpoint=null,bn(),$.world?.focus($.level);break;case"enter":{let t=Rt[$.level].checkpoints;$.checkpoint=Math.max(0,t.findIndex(i=>Ba(gt(),i,as).length)),bn(),$.world?.focus($.level,!0);break}case"next":vm($.level+1);break;case"check":_x();break;case"challenge":wx(`Help me resolve the ${Rt[$.level].subject} level. ${Mr()?.blockers?.[0]||Mr()?.summary||"What evidence am I missing?"}`);break;case"report":Q1();break}}}),Re("#levelContent").addEventListener("input",n=>{let e=n.target;if(e.dataset.field)gt()[as[e.dataset.field].scope][e.dataset.field]=e.value;else if(e.dataset.proof){let t=Rt[$.level].checkpoints[$.checkpoint].id;gt().evidence[t]||={},gt().evidence[t][e.dataset.proof]=e.value}else return;Ix()}),Re("#levelContent").addEventListener("submit",n=>{n.preventDefault(),_x()}),Re("#newCandidate").addEventListener("click",()=>{if($.busy||Ct?.isBusy())return;if($.candidates.length>=4){Dt("Keep up to four active properties. Export and reset one to start another.");return}let n=Ua();$.candidates.push(n),yl(n.id)}),Re("#compareButton").addEventListener("click",Z1),Re("#assistantButton").addEventListener("click",()=>wx()),Re("#exportButton").addEventListener("click",Sx),Re("#resetButton").addEventListener("click",()=>{$.busy||Ct?.isBusy()||Px("Reset this property?",`<p>This clears the selected property's inputs, checkpoint notes, browser chat and local report. Other properties and your account history remain available.</p><div class="dialog-actions"><button class="secondary-button" data-dialog-action="cancel">Keep my progress</button><button class="primary-button" data-dialog-action="reset">Clear this property</button></div>`)}),Re("#dialogClose").addEventListener("click",()=>{window.speechSynthesis?.cancel(),Re("#workspaceDialog").close()}),Re("#workspaceDialog").addEventListener("close",()=>window.speechSynthesis?.cancel()),Re("#dialogContent").addEventListener("click",n=>{let e=n.target.closest("button");if(e){if(e.dataset.switch&&!$.busy&&(Re("#workspaceDialog").close(),yl(e.dataset.switch)),e.dataset.dialogAction==="cancel"&&Re("#workspaceDialog").close(),e.dataset.dialogAction==="reset"&&!$.busy){let t=$.candidates.findIndex(i=>i.id===$.active);$.candidates[t]=Ua(),Re("#workspaceDialog").close(),yl($.candidates[t].id)}e.dataset.dialogAction==="export"&&Sx(),e.dataset.dialogAction==="print"&&window.print()}}),Re("#resetView").addEventListener("click",()=>$.world?.overview()),Re("#motionToggle").addEventListener("click",()=>{$.paused=!$.paused,$.world?.pause($.paused),xl()}),Re("#mapToggle").addEventListener("click",()=>{$.flat=!$.flat,document.body.classList.toggle("flat-view",$.flat),$.world?.flat($.flat),xl()}),Cx.addEventListener("change",n=>{$.paused=n.matches,$.world?.pause($.paused),xl()}),window.addEventListener("pagehide",()=>{zn(),window.speechSynthesis?.cancel(),$.world?.dispose()}),window.addEventListener("pageshow",n=>{n.persisted&&location.reload()})}function xl(){Re("#motionToggle").textContent=$.paused?"Resume motion":"Pause motion",Re("#motionToggle").setAttribute("aria-pressed",String($.paused)),Re("#mapToggle").textContent=$.flat?"3D view":"List view",Re("#mapToggle").setAttribute("aria-pressed",String($.flat))}function Ex(n){$.userId=n||null,$.storageKey=`apex.journey.v1:${n||`guest-${ss}`}`;let e=_l.read($.storageKey,{});$.candidates=(Array.isArray(e.candidates)?e.candidates:[]).filter(t=>t&&typeof t.id=="string"&&t.dealCard&&t.financialProfile&&t.evidence).slice(0,4).map(t=>({...t,chat:Array.isArray(t.chat)?t.chat.slice(-40):[]})),$.candidates.length||$.candidates.push(Ua()),$.active=$.candidates.some(t=>t.id===e.active)?e.active:$.candidates[0].id,$.level=0,$.checkpoint=null,$.evaluation=null,$.revision++}function Mx(){$.world||xx||(xx=!0,Vv({selectLevel:vm,notify:Dt,reducedMotion:$.paused}).then(n=>{$.world=n,n.pause($.paused||document.body.classList.contains("workspace-active")||document.body.classList.contains("assistant-active")),rs(),xl()}).catch(()=>{document.body.classList.add("flat-view"),Re("#worldLoading").hidden=!0,Dt("The illustrated map is available while 3D is unavailable. Your checkpoint forms still work.")}))}async function tI(){as=await Sd("/journey/fields.json",null,2e4);let n;try{n=(await Sd("/api/auth/me",null,12e3)).user}catch{Dt("Account connection is unavailable. The journey will use this browser's guest space.")}Ex(n?.id),Ct=bx({getCandidate:gt,notify:Dt,beforeOpen:async e=>{["chat","deal","profile","valuation","guidance"].includes(e)&&await ki?.prepareTools(gt()),_d()},onVisibility(e){$.world?.pause(e||$.paused),e||(Mx(),bn(),bl().then(()=>{ym($.level)||($.level=0,$.checkpoint=null),bn()}).catch(t=>Dt(t.message)))}}),ki=Xv({openTool:e=>Ct.open(e),notify:Dt,onInvestigationDeleted(e){$.candidates=$.candidates.filter(t=>t.investigationId!==e),$.candidates.length||$.candidates.push(Ua()),gt()||($.active=$.candidates[0].id),$.evaluation=null,$.revision++,$.level=0,$.checkpoint=null,Ct.setCandidate(gt()),zn(),Er(),bn(),rs(),_d()},onContextSaved(e,t){let i=$.candidates.find(s=>s.investigationId===e);i&&(i.assistantRevision=t.working?.revision||0,i.assistantSynced=dn(t.toolContext||t.working||{}),zn())},onContextState(e,t,i){let s=$.candidates.find(r=>r.investigationId===e);s&&(s.assistantSyncStatus=t,s.assistantPending=t!=="saved",s.assistantSyncError=i?.message||"",_d(),zn())},useProperty(e,t={}){if(!e?.selected)return!1;let i=$.candidates.find(s=>s.investigationId===e.id);if(i&&!i.assistantSynced&&!t.replace&&JSON.stringify(dn(i))!==JSON.stringify(dn(e.toolContext||{dealCard:e.selected.dealCard}))&&(i.assistantPending=!0,ki?.holdContext(i,e)),!i){let s=$.candidates.findIndex(r=>!Object.keys(r.dealCard).length&&!Object.keys(r.financialProfile).length&&!Object.keys(r.evidence).length&&!r.messages?.length&&!r.chat?.length);if($.candidates.length>=4&&s<0)return Dt("Export and reset an unused tool property slot first. Your investigation remains saved.",!0),!1;i={...Ua(),investigationId:e.id},s>=0?$.candidates[s]=i:$.candidates.push(i)}if(!i.assistantPending||t.replace){let s=dn(e.toolContext||e.working||{dealCard:e.selected.dealCard});JSON.stringify(dn(i))!==JSON.stringify(s)&&(i.report=null),Object.assign(i,s,{assistantRevision:e.working?.revision||0,assistantSynced:structuredClone(s),assistantPending:!1,assistantSyncStatus:"saved",assistantSyncError:""})}return $.active=i.id,$.evaluation=null,$.level=0,$.checkpoint=null,$.revision++,Ct.setCandidate(gt()),zn(),Er(),bn(),rs(),_d(),!0}});for(let e of $.candidates)e.assistantPending&&ki.queueContext(e);if(document.addEventListener("apex:leave-assistant",()=>ki.hide()),document.querySelector('[data-area="assistant"]').addEventListener("click",()=>{if(Ct.isBusy()||$.busy){Dt("Let the current tool request finish first.");return}ki.resume(gt()?.investigationId),$.world?.pause(!0)}),document.addEventListener("apex:context",e=>{let t=e.detail,i=gt();if(t.candidateId!==i.id)return;let s=JSON.stringify(i.dealCard)!==JSON.stringify(t.dealCard)||JSON.stringify(i.financialProfile)!==JSON.stringify(t.financialProfile)||JSON.stringify(i.dcfContext||{})!==JSON.stringify(t.dcfContext||{});i.dealCard=t.dealCard,i.financialProfile=t.financialProfile,i.dcfContext=t.dcfContext,t.sessionId!==void 0&&(i.sessionId!==t.sessionId&&(i.report=null),i.sessionId=t.sessionId),t.messages&&(i.messages=t.messages.slice(-40)),s?Ix():zn(),t.report&&(i.report=t.report,zn())}),document.addEventListener("apex:busy",e=>{for(let t of["candidateSelect","newCandidate","compareButton"])Re("#"+t).disabled=e.detail}),document.addEventListener("apex:recover-draft",e=>{if($.busy||Ct.isBusy())return;let t=$.candidates.findIndex(s=>!Object.keys(s.dealCard).length&&!Object.keys(s.financialProfile).length&&!Object.keys(s.evidence).length&&!s.messages?.length&&!s.chat?.length);if($.candidates.length>=4&&t<0){Dt("Export and reset an unused property before recovering another draft.");return}let i=Ua();for(let[s,r]of Object.entries(as)){let a=e.detail?.[r.scope]?.[s];(typeof a=="string"||typeof a=="number")&&(i[r.scope][s]=String(a).slice(0,500))}t>=0?$.candidates[t]=i:$.candidates.push(i),yl(i.id).then(()=>Ct.open("deal"));try{localStorage.setItem("apex.workspace.recovered","true")}catch{}document.querySelector(".draft-recovery")?.remove(),Dt("Earlier inputs recovered as a separate property. Recheck the evidence before proceeding.")}),document.addEventListener("apex:auth",e=>{let t=e.detail?.id||null;if($.userId!==t){zn(),Ex(t),Ct.setCandidate(gt());for(let i of $.candidates)i.assistantPending&&ki.queueContext(i);Er(),bn(),rs(),zn(),document.body.classList.contains("assistant-active")||bl().then(bn).catch(i=>Dt(i.message))}}),Er(),bn(),rs(),xl(),eI(),zn(),location.hash&&location.hash!=="#assistant")try{await bl(),bn()}catch(e){Dt(e.message,!0)}document.body.dataset.ready="true",!location.hash||location.hash==="#assistant"?ki.show():location.hash==="#journey"?(ki.hide(),Mx()):Ct.restoreRoute()}tI().catch(n=>{Dt(`The journey could not finish loading: ${n.message}. Please reload to reconnect. Your saved property data is retained.`,!0)});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
