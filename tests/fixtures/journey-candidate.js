import { readFileSync } from "node:fs";
import { LEVELS } from "../../public/journey/levels.js";
const fields = JSON.parse(readFileSync(new URL("../../public/journey/fields.json", import.meta.url), "utf8"));

export function completeCandidate() {
  const dealCard = {
    area: "Bayan Lepas, Penang", projectName: "Test Residence", propertyType: "Condo", propertyAge: "5", floorArea: "1000",
    askingPrice: "RM400k", conservativeFairValue: "RM500k", expectedRent: "RM3,000", maintenance: "RM300", estimatedInstallment: "RM2,000", cashOutlay: "RM80k",
    bankValuationSupport: "Multiple banker support", loanPrecheckStatus: "Pre-approved / eligibility checked", loanMarginPlan: "Around 90% standard",
    instalmentStress: "10% higher instalment tested", cashBufferAfterPurchase: "6+ months reserve after purchase", financingDocumentReadiness: "Complete income / CTOS / CCRIS documents",
    financingNotes: "Lender checked genuine consideration, income, DSR, valuation and stress.", supplyRadius: "Within 2.5km checked", substituteCount: "Less than 5",
    substituteThreat: "No direct similar substitute", futureSupplyTiming: "No material VP nearby", absorptionEvidence: "Occupancy and rent holding strong",
    unsoldStockSignal: "Less than 1% unsold", densityLiftStress: "Below 1.5k units and lift wait acceptable", supplyNotes: "Completed local supply and rental checks; no direct similar threat.",
    siteVisitEvidence: "Physical visit with photos / notes", lobbyGuardhouseSignal: "Welcoming lobby and professional guardhouse", liftCarparkCorridorSignal: "Fast lift, bright car park, good corridor",
    commonAreaCondition: "Clean and well maintained", residentBehaviourSignal: "Respectful and responsible", managementResponseSignal: "Fast reply and solution-oriented",
    defectLeakageSignal: "No major defect or leakage", arrearsJmbSignal: "Healthy collection and JMB culture", siteManagementNotes: "Management replied promptly; collection records and condition were inspected.",
    annualAssessmentQuitRent: "RM1,200", annualInsuranceTax: "RM600", monthlyRepairReserve: "RM200", furnishingBudget: "RM20k", vacancyStressMonths: "2",
    tenure: "Freehold residential title", unitPosition: "Good", ownStayAppeal: "Strong", managementQuality: "Strong", exitBuyerPool: "Own-stay and investor",
    comparableTransactions: "3 or more", comparableSource: "Brickz / official transaction data", comparableRecency: "0-6 months", comparableMatchQuality: "Same project",
    comparablePriceRange: "RM480k - RM520k", comparableAdjustmentNotes: "Adjusted for floor, view, renovation and parking.", rentEvidence: "Signed tenancy or achieved rent",
    rentalSource: "Signed tenancy / achieved rent record", rentalRecency: "0-3 months", tenantUrgency: "High inquiry", vacancySignal: "0-1 month",
    rentalSustainability: "Stable year-round demand", rentalAdjustmentNotes: "Achieved rents checked against comparable furnishing and seasonal vacancies.", siteVisit: "Completed", legalCheck: "Clear",
    legalTitleType: "Residential title / HDA serviced residence", titleTransferStatus: "Issued title / transfer path clear", caveatRestrictionStatus: "No caveat or blocking restriction",
    sellerAuthorityStatus: "Seller authority and documents verified", arrearsUtilitiesStatus: "Maintenance, quit rent, assessment, utilities clear",
    stakeholderFlowStatus: "All payments through lawyer stakeholder / bank channels", lawyerCoordinationStatus: "Lawyer reviewed / responsive with milestones",
    legalTransactionNotes: "Lawyer reviewed land search, seller authority, arrears and stakeholder payment terms.", dealSource: "Agency in-house app", agentBehavior: "One-time genuine approach",
    sellerMotivation: "Seller wants to relocate; genuine price and negotiation verified.", siteVisitNotes: "Clean lobby, fast lifts, wide corridors and no unexplained defects.",
    targetTenant: "Working professionals", tenantScreening: "Employment proof, identity, occupant count and references checked.", furnishingStrategy: "Fully furnished",
    exitStrategyPlan: "Sell vacant after renovation", resalePreparation: "Presentation, viewings and competing resale prices reviewed.", nearbySupply: "No direct similar supply",
    investmentThesis: "Existing employment demand supports achieved rent and a broad buyer pool.", mainConcern: "New supply could erode the unit's rental advantage.", killCriterion: "Walk away if title or achieved rent cannot be verified."
  };
  const financialProfile = {
    monthlyIncome: "RM10,000", cashReserveMonths: "8", cashAvailable: "RM150k", currentDebt: "RM1,000", investmentGoal: "Balanced rental and resale", holdingPeriod: "7",
    existingProperties: "1", portfolioRole: "Cash-flow base", existingPortfolioHealth: "Stable rent and costs", concentrationRisk: "Low", nextPurchaseReason: "Add a durable rental income source with sufficient remaining reserves."
  };
  financialProfile.riskStyle = fields.riskStyle.options[0].value;
  const evidence = Object.fromEntries(LEVELS.flatMap(level => level.checkpoints.map(point => [point.id, { note: "Test-only evidence: verified document and dated comparison notes.", date: "2026-08-01" }])));
  return { dealCard, financialProfile, evidence };
}
