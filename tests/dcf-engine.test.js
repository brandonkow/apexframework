import assert from "node:assert/strict";
import test from "node:test";
import { strFromU8, unzipSync } from "fflate";
import { calculateResidentialDcf } from "../dcf-engine.js";
import { generateResidentialDcfWorkbook } from "../dcf-workbook.js";

const templateCase = {
  asOf: "2026-07-17",
  propertyName: "Sungai Jawi",
  area: "Penang",
  propertyType: "Residential strata apartment / condominium unit",
  tenure: "Freehold",
  purchasePrice: 450000,
  floorArea: 1000,
  carParks: 1,
  monthlyMarketRent: 3000,
  otherMonthlyIncome: 150,
  year1Occupancy: 0.92,
  stabilizedOccupancy: 0.94,
  annualOccupancyStep: 0.01,
  annualRentGrowth: 0.03,
  annualOtherIncomeGrowth: 0.03,
  annualExpenseInflation: 0.03,
  discountRate: 0.1,
  terminalCapRate: 0.06,
  sellingCostRate: 0.03,
  holdingPeriodYears: 5,
  maintenanceRatePerSfMonth: 0.35,
  sinkingFundRate: 0.1,
  annualAssessment: 700,
  annualQuitRent: 80,
  annualInsurance: 600,
  propertyManagementRate: 0.08,
  lettingRenewalRate: 0.04,
  repairsRate: 0.03,
  ownerUtilitiesRate: 0,
  furnishingReserveRate: 0.02,
  miscellaneousRate: 0.01,
  annualSpecialAssessment: 0,
  loanToValue: 0.8,
  mortgageInterestRate: 0.0425,
  loanTermYears: 30,
  buyerIncomeTaxRate: 0,
  exitRpgtRate: 0.15,
  minimumDscr: 1.1,
  transferStampDuty: 9000,
  legalDueDiligence: 8000,
  loanValuationFees: 4000,
  initialRenovation: 25000,
  buyerContingency: 5000
};

test("residential DCF reproduces the supplied template economics", () => {
  const result = calculateResidentialDcf(templateCase);
  assert.equal(result.format, "apex-residential-dcf.v1");
  assert.ok(Math.abs(result.incomeApproach.dcfValue - 362439.91) < 2);
  assert.ok(Math.abs(result.years[0].noi - 22634) < 2);
  assert.ok(Math.abs(result.buyerReturns.monthlyDebtService - 1771.25) < 1);
  assert.ok(Math.abs(result.buyerReturns.year1Dscr - 1.065) < 0.002);
  assert.equal(result.marketValue, null);
  assert.equal(result.status, "income_screening");
  assert.match(result.warnings.join(" "), /not.*formal market valuation/i);
});

test("market-value label requires current verified transactions and supported inputs", () => {
  const comparables = [
    ["A", 430000, 980, -0.02],
    ["B", 465000, 1020, 0],
    ["C", 455000, 1000, 0.01]
  ].map(([projectName, salePrice, floorArea, totalAdjustment], index) => ({
    projectName,
    salePrice,
    floorArea,
    totalAdjustment,
    transactionDate: `2026-0${index + 3}-15`,
    source: `Land-office record ${index + 1}`,
    verified: true,
    armsLength: true,
    weight: 1
  }));
  const result = calculateResidentialDcf({
    ...templateCase,
    comparables,
    marketRentEvidence: "Signed tenancy and achieved rent confirmed by agent",
    operatingCostEvidence: "Current JMB statement and AGM budget",
    discountRateBasis: "Required return supported by local risk and financing conditions",
    terminalCapRateBasis: "Exit yield checked against comparable rental assets"
  });
  assert.equal(result.status, "market_supported");
  assert.ok(result.marketValue > 0);
  assert.equal(result.comparisonApproach.eligibleCount, 3);
  assert.equal(result.evidence.score, 100);

  const listingOnly = calculateResidentialDcf({
    ...templateCase,
    comparables: comparables.map((item) => ({ ...item, evidenceType: "asking listing" }))
  });
  assert.equal(listingOnly.comparisonApproach.eligibleCount, 0);
  assert.equal(listingOnly.marketValue, null);
});

test("downloadable workbook preserves formulas and replaces subject assumptions", async () => {
  const result = calculateResidentialDcf(templateCase);
  const workbook = await generateResidentialDcfWorkbook(templateCase, result);
  assert.ok(workbook.length > 10000);
  const archive = unzipSync(new Uint8Array(workbook));
  const summary = strFromU8(archive["xl/worksheets/sheet1.xml"]);
  const dcf = strFromU8(archive["xl/worksheets/sheet2.xml"]);
  const workbookXml = strFromU8(archive["xl/workbook.xml"]);
  assert.match(summary, /Apex DCF 2026-07-17 \/ Sungai Jawi/);
  assert.match(dcf, /r="B12"[^>]*><v>450000<\/v>/);
  assert.match(dcf, /r="B69"[^>]*><f>SUM\(F65:J65\)\+K69<\/f><v>3624/);
  assert.doesNotMatch(dcf, /<drawing\b[^>]*r:id="rId1"/);
  assert.equal(archive["xl/drawings/drawing1.xml"], undefined);
  assert.match(workbookXml, /fullCalcOnLoad="1"/);
});

test("downloaded template rejects a horizon it cannot display", async () => {
  const input = { ...templateCase, holdingPeriodYears: 7 };
  const result = calculateResidentialDcf(input);
  await assert.rejects(
    () => generateResidentialDcfWorkbook(input, result),
    (error) => error.code === "DCF_WORKBOOK_HORIZON" && /five-year/i.test(error.message)
  );
});
