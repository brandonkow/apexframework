const MONTHS_PER_YEAR = 12;
const CURRENT_COMPARABLE_MONTHS = 24;

function numeric(value, fallback = 0) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  const clean = String(value).toLowerCase().replace(/,/g, "").replace(/rm/g, "").trim();
  const match = clean.match(/-?(?:\d+(?:\.\d+)?|\.\d+)\s*(k|m)?/);
  if (!match) return fallback;
  let result = Number(match[0].replace(/\s*(?:k|m)$/i, ""));
  if (!Number.isFinite(result)) return fallback;
  if (match[1] === "k") result *= 1_000;
  if (match[1] === "m") result *= 1_000_000;
  return result;
}

function bounded(value, fallback, min, max) {
  return Math.min(max, Math.max(min, numeric(value, fallback)));
}

function rate(value, fallback, max = 1) {
  let result = numeric(value, fallback);
  if (Math.abs(result) > 1 && Math.abs(result) <= 100) result /= 100;
  return Math.min(max, Math.max(0, result));
}

function text(value, max = 300) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function round(value, decimals = 2) {
  if (!Number.isFinite(value)) return null;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function payment(principal, annualRate, years) {
  const periods = Math.max(1, Math.round(years * MONTHS_PER_YEAR));
  const monthlyRate = annualRate / MONTHS_PER_YEAR;
  if (!principal) return 0;
  if (!monthlyRate) return principal / periods;
  return principal * monthlyRate / (1 - (1 + monthlyRate) ** -periods);
}

function mortgageBalance(principal, annualRate, years, elapsedYears, monthlyPayment) {
  const elapsedPeriods = Math.max(0, Math.round(elapsedYears * MONTHS_PER_YEAR));
  const monthlyRate = annualRate / MONTHS_PER_YEAR;
  if (!monthlyRate) return Math.max(0, principal - monthlyPayment * elapsedPeriods);
  return Math.max(
    0,
    principal * (1 + monthlyRate) ** elapsedPeriods
      - monthlyPayment * (((1 + monthlyRate) ** elapsedPeriods - 1) / monthlyRate)
  );
}

function npv(cashFlows, discountRate) {
  return cashFlows.reduce((total, cashFlow, index) => total + cashFlow / (1 + discountRate) ** index, 0);
}

function irr(cashFlows) {
  if (!cashFlows.some((value) => value < 0) || !cashFlows.some((value) => value > 0)) return null;
  let low = -0.9999;
  let high = 10;
  let lowValue = npv(cashFlows, low);
  let highValue = npv(cashFlows, high);
  if (!Number.isFinite(lowValue) || !Number.isFinite(highValue) || lowValue * highValue > 0) return null;
  for (let index = 0; index < 200; index += 1) {
    const midpoint = (low + high) / 2;
    const midpointValue = npv(cashFlows, midpoint);
    if (!Number.isFinite(midpointValue)) return null;
    if (Math.abs(midpointValue) < 0.01) return midpoint;
    if (lowValue * midpointValue <= 0) {
      high = midpoint;
      highValue = midpointValue;
    } else {
      low = midpoint;
      lowValue = midpointValue;
    }
  }
  return (low + high) / 2;
}

function monthsOld(dateValue, asOf) {
  const observed = new Date(dateValue);
  const cutoff = new Date(asOf);
  if (!Number.isFinite(observed.getTime()) || !Number.isFinite(cutoff.getTime())) return Infinity;
  return Math.max(0, (cutoff.getUTCFullYear() - observed.getUTCFullYear()) * 12 + cutoff.getUTCMonth() - observed.getUTCMonth());
}

function comparableAdjustment(comparable) {
  if (comparable.totalAdjustment !== undefined && comparable.totalAdjustment !== "") {
    return Math.min(0.5, Math.max(-0.5, rateWithSign(comparable.totalAdjustment)));
  }
  const adjustments = comparable.adjustments && typeof comparable.adjustments === "object"
    ? Object.values(comparable.adjustments)
    : [];
  return Math.min(0.5, Math.max(-0.5, adjustments.reduce((sum, value) => sum + rateWithSign(value), 0)));
}

function rateWithSign(value) {
  let result = numeric(value, 0);
  if (Math.abs(result) > 1 && Math.abs(result) <= 100) result /= 100;
  return Number.isFinite(result) ? result : 0;
}

function normalizeComparable(raw, index, asOf) {
  const salePrice = Math.max(0, numeric(raw?.salePrice));
  const floorArea = Math.max(0, numeric(raw?.floorArea));
  const source = text(raw?.source || raw?.sourceUrl, 1000);
  const transactionDate = text(raw?.transactionDate, 40);
  const listing = Boolean(raw?.listing) || /asking|listing|advertis/i.test(String(raw?.evidenceType || raw?.sourceType || ""));
  const armsLength = raw?.armsLength !== false;
  const verified = raw?.verified === true && Boolean(source) && Boolean(transactionDate) && salePrice > 0 && floorArea > 0 && !listing && armsLength;
  const ageMonths = monthsOld(transactionDate, asOf);
  const current = verified && ageMonths <= CURRENT_COMPARABLE_MONTHS;
  const adjustment = comparableAdjustment(raw || {});
  const rawPricePerSf = floorArea ? salePrice / floorArea : 0;
  return {
    id: text(raw?.id, 80) || `comparable-${index + 1}`,
    projectName: text(raw?.projectName || raw?.project, 160),
    source,
    transactionDate,
    salePrice: round(salePrice),
    floorArea: round(floorArea),
    rawPricePerSf: round(rawPricePerSf),
    adjustment: round(adjustment, 4),
    adjustedPricePerSf: round(rawPricePerSf * (1 + adjustment)),
    weight: Math.max(0, numeric(raw?.weight, 1)),
    verified,
    current,
    ageMonths: Number.isFinite(ageMonths) ? ageMonths : null,
    exclusionReason: verified
      ? current ? "" : "Verified transaction is older than 24 months."
      : listing ? "Asking-price listings are not completed transaction evidence."
        : !armsLength ? "Transaction is not confirmed as arm's length."
          : "Sale price, floor area, transaction date, source, or verification is missing."
  };
}

export function normalizeResidentialDcfInput(raw = {}) {
  const asOf = text(raw.asOf || new Date().toISOString().slice(0, 10), 40);
  const assumptions = {
    purchasePrice: Math.max(0, numeric(raw.purchasePrice || raw.askingPrice)),
    floorArea: Math.max(0, numeric(raw.floorArea || raw.size)),
    carParks: Math.max(0, Math.round(numeric(raw.carParks, 1))),
    monthlyMarketRent: Math.max(0, numeric(raw.monthlyMarketRent || raw.expectedRent)),
    otherMonthlyIncome: Math.max(0, numeric(raw.otherMonthlyIncome)),
    year1Occupancy: rate(raw.year1Occupancy, 0.92),
    stabilizedOccupancy: rate(raw.stabilizedOccupancy, 0.94),
    annualOccupancyStep: rate(raw.annualOccupancyStep, 0.01),
    annualRentGrowth: rate(raw.annualRentGrowth, 0.03),
    annualOtherIncomeGrowth: rate(raw.annualOtherIncomeGrowth, 0.03),
    annualExpenseInflation: rate(raw.annualExpenseInflation, 0.03),
    discountRate: rate(raw.discountRate, 0.1),
    terminalCapRate: rate(raw.terminalCapRate, 0.06),
    sellingCostRate: rate(raw.sellingCostRate, 0.03),
    holdingPeriodYears: Math.round(bounded(raw.holdingPeriodYears || raw.holdingPeriod, 5, 3, 10)),
    maintenanceRatePerSfMonth: Math.max(0, numeric(raw.maintenanceRatePerSfMonth)),
    monthlyMaintenance: Math.max(0, numeric(raw.monthlyMaintenance || raw.maintenance)),
    sinkingFundRate: rate(raw.sinkingFundRate, 0.1),
    annualAssessment: Math.max(0, numeric(raw.annualAssessment, 0)),
    annualQuitRent: Math.max(0, numeric(raw.annualQuitRent, 0)),
    annualInsurance: Math.max(0, numeric(raw.annualInsurance, 0)),
    propertyManagementRate: rate(raw.propertyManagementRate, 0.08),
    lettingRenewalRate: rate(raw.lettingRenewalRate, 0.04),
    repairsRate: rate(raw.repairsRate, 0.03),
    ownerUtilitiesRate: rate(raw.ownerUtilitiesRate, 0),
    furnishingReserveRate: rate(raw.furnishingReserveRate, 0.02),
    miscellaneousRate: rate(raw.miscellaneousRate, 0.01),
    annualSpecialAssessment: Math.max(0, numeric(raw.annualSpecialAssessment, 0)),
    loanToValue: rate(raw.loanToValue, 0.8),
    mortgageInterestRate: rate(raw.mortgageInterestRate, 0.0425),
    loanTermYears: Math.round(bounded(raw.loanTermYears, 30, 1, 40)),
    buyerIncomeTaxRate: rate(raw.buyerIncomeTaxRate, 0),
    exitRpgtRate: rate(raw.exitRpgtRate, 0.15),
    minimumDscr: Math.max(0, numeric(raw.minimumDscr, 1.1)),
    transferStampDuty: Math.max(0, numeric(raw.transferStampDuty, 0)),
    legalDueDiligence: Math.max(0, numeric(raw.legalDueDiligence, 0)),
    loanValuationFees: Math.max(0, numeric(raw.loanValuationFees, 0)),
    initialRenovation: Math.max(0, numeric(raw.initialRenovation || raw.furnishingBudget, 0)),
    buyerContingency: Math.max(0, numeric(raw.buyerContingency, 0))
  };
  if (!assumptions.maintenanceRatePerSfMonth && assumptions.floorArea) {
    assumptions.maintenanceRatePerSfMonth = assumptions.monthlyMaintenance / assumptions.floorArea;
  }
  return {
    asOf,
    property: {
      name: text(raw.propertyName || raw.projectName, 160),
      area: text(raw.area, 120),
      address: text(raw.address, 300),
      propertyType: text(raw.propertyType || "Residential high-rise", 120),
      tenure: text(raw.tenure, 100),
      titleNumber: text(raw.titleNumber, 120)
    },
    assumptions,
    evidence: {
      marketRent: text(raw.marketRentEvidence, 120).toLowerCase(),
      operatingCosts: text(raw.operatingCostEvidence, 120).toLowerCase(),
      discountRate: text(raw.discountRateBasis, 200),
      terminalCapRate: text(raw.terminalCapRateBasis, 200)
    },
    comparables: (Array.isArray(raw.comparables) ? raw.comparables : []).slice(0, 8).map((item, index) => normalizeComparable(item, index, asOf))
  };
}

function evidenceStatus(input, currentComparableCount) {
  const missing = [];
  const rentEvidence = input.evidence.marketRent;
  const costEvidence = input.evidence.operatingCosts;
  const supportedRent = /signed|achieved|agent|tenancy|multiple/.test(rentEvidence) && !/asking|listing/.test(rentEvidence);
  const supportedCosts = /jmb|mc statement|invoice|budget|actual|statement/.test(costEvidence);
  if (!supportedRent) missing.push("Achieved-rent evidence from a tenancy, agent, or multiple verified leases");
  if (!supportedCosts) missing.push("Current JMB/MC charges and owner-cost evidence");
  if (!input.evidence.discountRate) missing.push("Discount-rate rationale");
  if (!input.evidence.terminalCapRate) missing.push("Terminal-cap-rate rationale");
  if (currentComparableCount < 3) missing.push("At least three recent verified completed comparable transactions");
  const score = Math.round(([
    supportedRent,
    supportedCosts,
    Boolean(input.evidence.discountRate),
    Boolean(input.evidence.terminalCapRate),
    currentComparableCount >= 3
  ].filter(Boolean).length / 5) * 100);
  return { supportedRent, supportedCosts, missing, score };
}

function resultCheck(id, label, pass, actual, expected, severity = "review") {
  return { id, label, status: pass ? "ok" : severity, actual, expected };
}

export function calculateResidentialDcf(raw = {}) {
  const input = normalizeResidentialDcfInput(raw);
  const a = input.assumptions;
  const errors = [];
  if (!a.purchasePrice) errors.push("Purchase price is required.");
  if (!a.floorArea) errors.push("Floor area is required.");
  if (!a.monthlyMarketRent) errors.push("Monthly market rent is required.");
  if (!a.discountRate) errors.push("Discount rate must be above zero.");
  if (!a.terminalCapRate) errors.push("Terminal capitalization rate must be above zero.");
  if (a.discountRate <= a.terminalCapRate) errors.push("Discount rate must exceed the terminal capitalization rate.");
  if (errors.length) {
    const error = new Error(errors.join(" "));
    error.statusCode = 400;
    error.code = "INVALID_DCF_INPUT";
    error.issues = errors;
    throw error;
  }

  const years = [];
  const maintenanceYear1 = a.monthlyMaintenance
    ? a.monthlyMaintenance * MONTHS_PER_YEAR
    : a.floorArea * a.maintenanceRatePerSfMonth * MONTHS_PER_YEAR * (1 + a.sinkingFundRate);
  for (let index = 0; index <= a.holdingPeriodYears; index += 1) {
    const year = index + 1;
    const inflationFactor = (1 + a.annualExpenseInflation) ** index;
    const monthlyRent = a.monthlyMarketRent * (1 + a.annualRentGrowth) ** index;
    const grossPotentialRent = monthlyRent * MONTHS_PER_YEAR;
    const occupancy = Math.min(a.stabilizedOccupancy, a.year1Occupancy + index * a.annualOccupancyStep);
    const vacancyLoss = -grossPotentialRent * (1 - occupancy);
    const otherIncome = a.otherMonthlyIncome * MONTHS_PER_YEAR * (1 + a.annualOtherIncomeGrowth) ** index;
    const effectiveGrossIncome = grossPotentialRent + vacancyLoss + otherIncome;
    const expenses = {
      maintenanceAndSinking: -maintenanceYear1 * inflationFactor,
      assessment: -a.annualAssessment * inflationFactor,
      quitRent: -a.annualQuitRent * inflationFactor,
      insurance: -a.annualInsurance * inflationFactor,
      propertyManagement: -effectiveGrossIncome * a.propertyManagementRate,
      lettingRenewal: -effectiveGrossIncome * a.lettingRenewalRate,
      repairs: -effectiveGrossIncome * a.repairsRate,
      ownerUtilities: -effectiveGrossIncome * a.ownerUtilitiesRate,
      furnishingReserve: -effectiveGrossIncome * a.furnishingReserveRate,
      miscellaneous: -effectiveGrossIncome * a.miscellaneousRate,
      specialAssessment: -a.annualSpecialAssessment * inflationFactor
    };
    const totalOperatingExpenses = Object.values(expenses).reduce((sum, value) => sum + value, 0);
    const noi = effectiveGrossIncome + totalOperatingExpenses;
    const discountFactor = year <= a.holdingPeriodYears ? 1 / (1 + a.discountRate) ** year : null;
    years.push({
      year,
      monthlyRent: round(monthlyRent),
      grossPotentialRent: round(grossPotentialRent),
      occupancy: round(occupancy, 4),
      vacancyLoss: round(vacancyLoss),
      otherIncome: round(otherIncome),
      effectiveGrossIncome: round(effectiveGrossIncome),
      expenses: Object.fromEntries(Object.entries(expenses).map(([key, value]) => [key, round(value)])),
      totalOperatingExpenses: round(totalOperatingExpenses),
      noi: round(noi),
      noiMargin: round(noi / effectiveGrossIncome, 4),
      discountFactor: round(discountFactor, 6),
      presentValueOfNoi: discountFactor ? round(noi * discountFactor) : null
    });
  }

  const terminalYear = years[a.holdingPeriodYears];
  const forecastYears = years.slice(0, a.holdingPeriodYears);
  const grossTerminalValue = terminalYear.noi / a.terminalCapRate;
  const netTerminalValue = grossTerminalValue * (1 - a.sellingCostRate);
  const presentValueOfTerminal = netTerminalValue / (1 + a.discountRate) ** a.holdingPeriodYears;
  const presentValueOfNoi = forecastYears.reduce((sum, year) => sum + year.presentValueOfNoi, 0);
  const dcfValue = presentValueOfNoi + presentValueOfTerminal;
  const dcfValuePerSf = dcfValue / a.floorArea;
  const terminalConcentration = presentValueOfTerminal / dcfValue;

  const currentComparables = input.comparables.filter((item) => item.current);
  const comparableWeight = currentComparables.reduce((sum, item) => sum + item.weight, 0);
  const weightedPricePerSf = comparableWeight
    ? currentComparables.reduce((sum, item) => sum + item.adjustedPricePerSf * item.weight, 0) / comparableWeight
    : null;
  const comparisonValue = currentComparables.length >= 3 && weightedPricePerSf
    ? weightedPricePerSf * a.floorArea
    : null;
  const evidence = evidenceStatus(input, currentComparables.length);
  const marketSupported = comparisonValue !== null && evidence.supportedRent && evidence.supportedCosts
    && Boolean(input.evidence.discountRate) && Boolean(input.evidence.terminalCapRate);
  const reconciledValue = comparisonValue === null ? null : dcfValue * 0.5 + comparisonValue * 0.5;
  const indicatedValue = comparisonValue === null ? dcfValue : reconciledValue;
  const indicationLabel = marketSupported
    ? "Evidence-supported indicative market value"
    : comparisonValue !== null
      ? "Reconciled screening indication"
      : "Income-based screening value";

  const loanAmount = a.purchasePrice * a.loanToValue;
  const monthlyDebtService = payment(loanAmount, a.mortgageInterestRate, a.loanTermYears);
  const annualDebtService = monthlyDebtService * MONTHS_PER_YEAR;
  const totalAcquisitionCost = a.purchasePrice + a.transferStampDuty + a.legalDueDiligence
    + a.loanValuationFees + a.initialRenovation + a.buyerContingency;
  const equityRequired = totalAcquisitionCost - loanAmount;
  const year1Noi = forecastYears[0].noi;
  const year1Dscr = annualDebtService ? year1Noi / annualDebtService : null;
  const year1CashOnCash = equityRequired ? (year1Noi - annualDebtService) / equityRequired : null;
  const equityCashFlows = [-equityRequired];
  const financingSchedule = [];
  let openingBalance = loanAmount;
  for (let year = 1; year <= a.holdingPeriodYears; year += 1) {
    const yearNoi = forecastYears[year - 1].noi;
    const interestEstimate = openingBalance * a.mortgageInterestRate;
    const incomeTax = Math.max(0, yearNoi - interestEstimate) * a.buyerIncomeTaxRate;
    const endingBalance = mortgageBalance(loanAmount, a.mortgageInterestRate, a.loanTermYears, year, monthlyDebtService);
    let cashFlow = yearNoi - annualDebtService - incomeTax;
    let exitRpgt = 0;
    if (year === a.holdingPeriodYears) {
      exitRpgt = Math.max(0, netTerminalValue - a.purchasePrice - a.transferStampDuty - a.legalDueDiligence) * a.exitRpgtRate;
      cashFlow += netTerminalValue - exitRpgt - endingBalance;
    }
    equityCashFlows.push(cashFlow);
    financingSchedule.push({
      year,
      openingBalance: round(openingBalance),
      endingBalance: round(endingBalance),
      interestEstimate: round(interestEstimate),
      incomeTax: round(incomeTax),
      exitRpgt: round(exitRpgt),
      equityCashFlow: round(cashFlow)
    });
    openingBalance = endingBalance;
  }
  const leveredEquityIrr = irr(equityCashFlows);
  const priceVariance = (indicatedValue - a.purchasePrice) / a.purchasePrice;

  const checks = [
    resultCheck("dcf-positive", "DCF indication is positive", dcfValue > 0, round(dcfValue), "> 0", "blocked"),
    resultCheck("rate-spread", "Discount rate exceeds terminal cap rate", a.discountRate > a.terminalCapRate, round(a.discountRate, 4), `> ${round(a.terminalCapRate, 4)}`, "blocked"),
    resultCheck("terminal-concentration", "Terminal value concentration", terminalConcentration <= 0.8, round(terminalConcentration, 4), "<= 0.80"),
    resultCheck("dscr", "Year 1 DSCR", year1Dscr === null || year1Dscr >= a.minimumDscr, round(year1Dscr, 3), `>= ${round(a.minimumDscr, 2)}`),
    resultCheck("comparables", "Recent verified comparable count", currentComparables.length >= 3, currentComparables.length, ">= 3"),
    resultCheck("price", "Purchase price is at or below indication", a.purchasePrice <= indicatedValue, round(a.purchasePrice), `<= ${round(indicatedValue)}`)
  ];
  const warnings = [];
  if (terminalConcentration > 0.8) warnings.push("More than 80% of DCF value comes from the terminal value; the result is highly sensitive to the exit cap rate.");
  if (year1Dscr !== null && year1Dscr < a.minimumDscr) warnings.push("Year 1 NOI does not meet the selected debt-service coverage target.");
  if (!marketSupported) warnings.push("Do not present this result as a formal market valuation. It remains decision-support screening until the missing market evidence is verified.");
  if (input.comparables.some((item) => item.exclusionReason)) warnings.push("One or more comparable entries were excluded because they were stale, incomplete, non-arm's-length, or asking-price evidence.");

  return {
    format: "apex-residential-dcf.v1",
    generatedAt: new Date().toISOString(),
    asOf: input.asOf,
    property: input.property,
    status: marketSupported ? "market_supported" : comparisonValue !== null ? "screening_supported" : "income_screening",
    indicationLabel,
    indicatedValue: round(indicatedValue),
    marketValue: marketSupported ? round(reconciledValue) : null,
    screeningValue: round(dcfValue),
    purchasePrice: round(a.purchasePrice),
    priceVariance: round(priceVariance, 4),
    assumptions: a,
    incomeApproach: {
      dcfValue: round(dcfValue),
      valuePerSf: round(dcfValuePerSf),
      presentValueOfNoi: round(presentValueOfNoi),
      grossTerminalValue: round(grossTerminalValue),
      netTerminalValue: round(netTerminalValue),
      presentValueOfTerminal: round(presentValueOfTerminal),
      terminalConcentration: round(terminalConcentration, 4)
    },
    comparisonApproach: {
      value: round(comparisonValue),
      adjustedPricePerSf: round(weightedPricePerSf),
      eligibleCount: currentComparables.length,
      enteredCount: input.comparables.length,
      comparables: input.comparables
    },
    reconciliation: {
      value: round(reconciledValue),
      incomeWeight: comparisonValue === null ? 1 : 0.5,
      comparisonWeight: comparisonValue === null ? 0 : 0.5,
      marketSupported
    },
    buyerReturns: {
      loanAmount: round(loanAmount),
      totalAcquisitionCost: round(totalAcquisitionCost),
      equityRequired: round(equityRequired),
      monthlyDebtService: round(monthlyDebtService),
      annualDebtService: round(annualDebtService),
      year1Dscr: round(year1Dscr, 3),
      year1CashOnCash: round(year1CashOnCash, 4),
      leveredEquityIrr: round(leveredEquityIrr, 4),
      equityCashFlows: equityCashFlows.map((value) => round(value)),
      financingSchedule
    },
    years,
    evidence: {
      score: evidence.score,
      missing: evidence.missing,
      marketRent: input.evidence.marketRent,
      operatingCosts: input.evidence.operatingCosts,
      discountRateBasis: input.evidence.discountRate,
      terminalCapRateBasis: input.evidence.terminalCapRate
    },
    checks,
    warnings,
    disclaimer: "Decision-support estimate only. It is not a valuation report, investment recommendation, mortgage offer, legal opinion, or tax computation. Verify market rent, completed transactions, strata costs, title, financing, and taxes for the actual unit and buyer."
  };
}

export const DCF_TEMPLATE_DEFAULTS = Object.freeze({
  year1Occupancy: 0.92,
  stabilizedOccupancy: 0.94,
  annualOccupancyStep: 0.01,
  annualRentGrowth: 0.03,
  annualExpenseInflation: 0.03,
  discountRate: 0.1,
  terminalCapRate: 0.06,
  sellingCostRate: 0.03,
  holdingPeriodYears: 5,
  sinkingFundRate: 0.1,
  propertyManagementRate: 0.08,
  lettingRenewalRate: 0.04,
  repairsRate: 0.03,
  furnishingReserveRate: 0.02,
  miscellaneousRate: 0.01,
  loanToValue: 0.8,
  mortgageInterestRate: 0.0425,
  loanTermYears: 30,
  minimumDscr: 1.1
});
