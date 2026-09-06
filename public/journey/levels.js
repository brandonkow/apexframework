const checkpoint = (id, title, prompt, fields, source) => ({ id, title, prompt, fields: fields.split(" "), source });

export const LEVELS = [
  {
    id: "district", title: "The District", subject: "Property selection", short: "Select", color: "#8fd8be",
    description: "Find the place worth believing in.",
    lesson: "A low price is an invitation to investigate. The property still has to earn its place.",
    position: [-7, 0, 2], document: "MY_INVESTMENT_FRAMEWORK.md",
    checkpoints: [
      checkpoint("identity", "Place your candidate", "Start with one real property. Which area, building and unit are you investigating?", "projectName area propertyType propertyAge floorArea askingPrice tenure", "Stage 1A-C: selection philosophy, area and price segment"),
      checkpoint("value", "Prove the entry price", "Use completed sales of comparable units. Asking prices alone cannot establish value.", "conservativeFairValue comparableTransactions comparableSource comparableRecency comparableMatchQuality comparablePriceRange comparableAdjustmentNotes", "Stage 1C/G: price discipline and transaction evidence"),
      checkpoint("appeal", "See the future buyer", "Why would someone choose to live here, and why would an investor buy it later?", "unitPosition ownStayAppeal exitBuyerPool managementQuality", "Stage 1D-F: buyer depth, own-stay appeal and quality"),
      checkpoint("visit", "Walk the building", "Record what you actually observed. Renderings cannot prove a completed building's condition.", "siteVisit siteVisitEvidence lobbyGuardhouseSignal liftCarparkCorridorSignal commonAreaCondition residentBehaviourSignal defectLeakageSignal siteVisitNotes inspectionConcern", "Stage 1E-F; Execution Calibration D: physical inspection"),
      checkpoint("management", "Look behind the lobby", "Test the management response and collection record. Attractive architecture needs sustained care.", "managementResponseSignal arrearsJmbSignal siteManagementNotes", "Stage 1F; Execution Calibration E-F: management and project culture")
    ]
  },
  {
    id: "compass", title: "The Compass", subject: "Investor suitability", short: "Fit", color: "#bfd298",
    description: "Make the property fit your life.",
    lesson: "Being able to obtain a loan is different from being able to live comfortably with it.",
    position: [-3.3, 0.5, -3.5], document: "INVESTOR_MANDATE_PROFILE.md",
    checkpoints: [
      checkpoint("capacity", "Measure your breathing room", "Use your actual income, existing monthly debt and cash remaining for this purchase.", "monthlyIncome currentDebt cashAvailable cashReserveMonths", "Buying Power Discipline; Cash Reserve Gate"),
      checkpoint("mandate", "Choose your destination", "Name the job this property must do, the holding period, and any upcoming demands on your cash.", "riskStyle investmentGoal holdingPeriod nearTermCommitment financialConcern", "Strategy Fit; Refusal And Cooling-Off Rules")
    ]
  },
  {
    id: "vault", title: "The Vault", subject: "Financing & structure", short: "Finance", color: "#dcc597",
    description: "Build on financing that can hold.",
    lesson: "The transaction should work at the genuine price, with every payment and obligation visible.",
    position: [2.5, 1, -4.6], document: "DEAL_STRUCTURING_FINANCING.md",
    checkpoints: [
      checkpoint("loan", "Test the loan", "Use a lender-backed estimate and review margin, documentation and instalment stress together.", "estimatedInstallment cashOutlay bankValuationSupport loanPrecheckStatus loanMarginPlan instalmentStress cashBufferAfterPurchase financingDocumentReadiness financingNotes", "Loan Margin Discipline; Cash Cost Discipline; Stress Test Standard"),
      checkpoint("title", "Clear the transaction", "Confirm title, seller authority and the path for transferring funds with your lawyer.", "legalCheck legalTitleType titleTransferStatus caveatRestrictionStatus sellerAuthorityStatus arrearsUtilitiesStatus stakeholderFlowStatus lawyerCoordinationStatus legalTransactionNotes", "Stage 1K: title and transactionability; Financing-Led Deal Test"),
      checkpoint("sourcing", "Challenge the sales story", "Separate evidence about the asset from urgency, promises and negotiation pressure.", "dealSource agentBehavior sellerMotivation professionalConcern", "Execution Calibration A-C: sourcing, negotiation and professional filtering")
    ]
  },
  {
    id: "residence", title: "The Residence", subject: "Holding power", short: "Hold", color: "#9dcad4",
    description: "Make the everyday numbers work.",
    lesson: "Rent is the start of the calculation. Vacancy, maintenance and repairs decide your holding power.",
    position: [7, 0.4, -0.2], document: "HOLDING_POWER_ASSET_MANAGEMENT.md",
    checkpoints: [
      checkpoint("rent", "Follow real tenant demand", "Check achieved rents, enquiry quality and seasonality for comparable units.", "expectedRent rentEvidence rentalSource rentalRecency tenantUrgency vacancySignal rentalSustainability rentalAdjustmentNotes", "Stage 1I: rental resilience; Rental Reality Test"),
      checkpoint("costs", "Count the quiet costs", "Include recurring costs, a repair allowance and vacancy. Enter zero explicitly where it is justified.", "maintenance annualAssessmentQuitRent annualInsuranceTax monthlyRepairReserve furnishingBudget vacancyStressMonths", "True Holding Cost; Vacancy And Repair Stress"),
      checkpoint("tenant", "Plan the lived experience", "Furnish for the target tenant and screen using documented behaviour, identity and affordability.", "targetTenant furnishingStrategy tenantScreening", "Execution Calibration G-H: furnishing and tenant management")
    ]
  },
  {
    id: "portfolio", title: "The Collection", subject: "Portfolio strategy", short: "Balance", color: "#b6ace1",
    description: "Choose what makes the whole stronger.",
    lesson: "One successful investment does not prove the next. Test how this asset changes your total exposure.",
    position: [5, 0.9, 5.3], document: "PORTFOLIO_STRATEGY_SCALING.md",
    checkpoints: [
      checkpoint("exposure", "Place it in the portfolio", "For a first purchase enter zero properties and assess the concentration this new asset would create.", "existingProperties portfolioRole existingPortfolioHealth concentrationRisk nextPurchaseReason", "Portfolio concentration; Next-Purchase Gate")
    ]
  },
  {
    id: "horizon", title: "The Observatory", subject: "Market & timing", short: "Observe", color: "#e5b6a4",
    description: "Look past today's sales pitch.",
    lesson: "A catalyst is a hypothesis. Study competing supply, absorption and your position if it arrives late.",
    position: [-0.1, 1.3, 7.4], document: "MARKET_INTELLIGENCE_TIMING.md",
    checkpoints: [
      checkpoint("supply", "Map the next wave", "Inspect the nearest substitutes and future completion dates, including comparable new layouts and prices.", "nearbySupply supplyRadius substituteCount substituteThreat futureSupplyTiming densityLiftStress", "Stage 1J: supply and density; Supply Pipeline"),
      checkpoint("absorption", "Read the ground signals", "Use dated occupancy, achieved rent and unsold-stock evidence. A busy gallery is not a completed sale.", "absorptionEvidence unsoldStockSignal supplyNotes", "Local Area Cycle; Buyer Sentiment And Liquidity")
    ]
  },
  {
    id: "summit", title: "The Summit", subject: "Decision & learning", short: "Decide", color: "#e4dfbd",
    description: "Earn your conclusion.",
    lesson: "Write what would prove you wrong before the outcome is known. Revisit the thesis as reality changes.",
    position: [-6, 1.1, 7], document: "DECISION_JOURNAL_LEARNING.md",
    checkpoints: [
      checkpoint("exit", "Design the way out", "Consider your future buyers, viewing access, unit presentation and the cost of preparing for sale.", "exitStrategyPlan resalePreparation", "Execution Calibration I: exit strategy and buyer psychology"),
      checkpoint("thesis", "Commit the hypothesis", "Explain why it should work, the strongest concern and the discovery that makes you walk away.", "investmentThesis mainConcern killCriterion", "Pre-Purchase Thesis; Counter-Thesis; Kill Criteria; Outcome Review")
    ]
  }
];

export const PREFERENCE_FIELDS = ["experienceLevel", "guidanceMode", "decisionIntent", "preferredOutput", "confidenceComfort", "onboardingNotes"];
export const OPTIONAL_FIELDS = new Set(["inspectionConcern", "professionalConcern", "financialConcern", "nearTermCommitment"]);
export const NUMERIC_FIELDS = new Set(["propertyAge", "floorArea", "askingPrice", "conservativeFairValue", "expectedRent", "estimatedInstallment", "cashOutlay", "maintenance", "annualAssessmentQuitRent", "annualInsuranceTax", "monthlyRepairReserve", "furnishingBudget", "vacancyStressMonths", "monthlyIncome", "currentDebt", "cashAvailable", "cashReserveMonths", "holdingPeriod", "existingProperties"]);

export function valueFor(candidate, key, fields) {
  return String(candidate?.[fields[key]?.scope]?.[key] ?? "").trim();
}

export function checkpointMissing(candidate, point, fields) {
  const missing = point.fields.filter(key => !OPTIONAL_FIELDS.has(key) && !valueFor(candidate, key, fields));
  const proof = candidate?.evidence?.[point.id];
  if (!proof?.note || String(proof.note).trim().length < 12) missing.push("evidenceNote");
  const date = String(proof?.date || "");
  const parsed = Date.parse(date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed) || new Date(parsed).toISOString().slice(0, 10) !== date || date > new Date().toISOString().slice(0, 10)) missing.push("evidenceDate");
  return missing;
}
