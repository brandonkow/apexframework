import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { strFromU8, strToU8, unzipSync, zipSync } from "fflate";
import { calculateResidentialDcf } from "./dcf-engine.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONTHS_PER_YEAR = 12;
const TEMPLATE_PATH = path.join(__dirname, "templates", "residential-high-rise-buyer-dcf.xlsx");
const SHEETS = Object.freeze({
  summary: "xl/worksheets/sheet1.xml",
  dcf: "xl/worksheets/sheet2.xml",
  comparison: "xl/worksheets/sheet3.xml",
  sources: "xl/worksheets/sheet4.xml"
});

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cellPattern(reference) {
  return new RegExp(`<c\\b([^>]*\\br="${reference}"[^>]*?)(?:\\s*\\/\\s*>|>[\\s\\S]*?<\\/c>)`);
}

function columnNumber(reference) {
  return reference.match(/^[A-Z]+/)?.[0].split("").reduce((total, character) => (
    total * 26 + character.charCodeAt(0) - 64
  ), 0) || 0;
}

function ensureCell(xml, reference) {
  if (cellPattern(reference).test(xml)) return xml;
  const rowNumber = reference.match(/\d+$/)?.[0];
  if (!rowNumber) throw new Error(`Invalid DCF template cell reference ${reference}.`);
  const rowPattern = new RegExp(`(<row\\b[^>]*\\br="${rowNumber}"[^>]*>)([\\s\\S]*?)(<\\/row>)`);
  const rowMatch = xml.match(rowPattern);
  if (!rowMatch) throw new Error(`DCF template row ${rowNumber} was not found.`);

  const targetColumn = columnNumber(reference);
  const cells = [...rowMatch[2].matchAll(/<c\b([^>]*\br="([A-Z]+)\d+"[^>]*)>[\s\S]*?<\/c>/g)];
  const nearest = cells.reduce((best, cell) => {
    const distance = Math.abs(columnNumber(cell[2]) - targetColumn);
    return !best || distance < best.distance ? { cell, distance } : best;
  }, null);
  const style = nearest?.cell?.[1].match(/\bs="([^"]+)"/)?.[1];
  const emptyCell = `<c r="${reference}"${style ? ` s="${style}"` : ""}></c>`;
  const nextCell = cells.find((cell) => columnNumber(cell[2]) > targetColumn);
  const content = nextCell
    ? `${rowMatch[2].slice(0, nextCell.index)}${emptyCell}${rowMatch[2].slice(nextCell.index)}`
    : `${rowMatch[2]}${emptyCell}`;
  return xml.replace(rowPattern, `$1${content}$3`);
}

function cellOpening(attributes, type = "") {
  const clean = attributes.replace(/\s+t="[^"]*"/g, "");
  return `<c${clean}${type ? ` t="${type}"` : ""}>`;
}

function setCell(xml, reference, value) {
  xml = ensureCell(xml, reference);
  const pattern = cellPattern(reference);
  return xml.replace(pattern, (_match, attributes) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return `${cellOpening(attributes)}<v>${value}</v></c>`;
    }
    const stringValue = value === undefined || value === null ? "" : String(value);
    return `${cellOpening(attributes, "inlineStr")}<is><t xml:space="preserve">${xmlEscape(stringValue)}</t></is></c>`;
  });
}

function setFormulaCache(xml, reference, value) {
  if (value === undefined || value === null) return xml;
  const numericValue = typeof value === "number" && Number.isFinite(value);
  if (typeof value === "number" && !numericValue) return xml;
  const pattern = cellPattern(reference);
  if (!pattern.test(xml)) throw new Error(`DCF template formula cell ${reference} was not found.`);
  return xml.replace(pattern, (match, attributes) => {
    const formula = match.match(/<f\b[^>]*(?:\/>|>[\s\S]*?<\/f>)/)?.[0];
    if (!formula) return match;
    const cache = numericValue ? String(value) : xmlEscape(value);
    return `${cellOpening(attributes, numericValue ? "" : "str")}${formula}<v>${cache}</v></c>`;
  });
}

function excelSerial(dateValue) {
  const date = new Date(dateValue);
  if (!Number.isFinite(date.getTime())) return null;
  return date.getTime() / 86_400_000 + 25_569;
}

function writeCells(xml, values) {
  return Object.entries(values).reduce((updated, [reference, value]) => setCell(updated, reference, value), xml);
}

function writeFormulaCaches(xml, values) {
  return Object.entries(values).reduce((updated, [reference, value]) => setFormulaCache(updated, reference, value), xml);
}

function requireTemplateEntries(archive) {
  for (const entry of [...Object.values(SHEETS), "xl/workbook.xml"]) {
    if (!archive[entry]) throw new Error(`DCF workbook template is missing ${entry}.`);
  }
}

function removeObscuringTemplateShapes(archive) {
  const drawingEntry = "xl/drawings/drawing1.xml";
  const drawingRelationsEntry = "xl/drawings/_rels/drawing1.xml.rels";
  const sheetRelationsEntry = "xl/worksheets/_rels/sheet2.xml.rels";
  archive[SHEETS.dcf] = strToU8(strFromU8(archive[SHEETS.dcf]).replace(/<drawing\b[^>]*r:id="rId1"[^>]*\/>/g, ""));
  if (archive[sheetRelationsEntry]) {
    archive[sheetRelationsEntry] = strToU8(strFromU8(archive[sheetRelationsEntry])
      .replace(/<Relationship\b[^>]*Id="rId1"[^>]*\/\>/g, ""));
  }
  if (archive["[Content_Types].xml"]) {
    archive["[Content_Types].xml"] = strToU8(strFromU8(archive["[Content_Types].xml"])
      .replace(/<Override\b[^>]*PartName="\/xl\/drawings\/drawing1\.xml"[^>]*\/\>/g, ""));
  }
  delete archive[drawingEntry];
  delete archive[drawingRelationsEntry];
}

function calculationMode(xml) {
  if (/<calcPr\b[^>]*\/>/.test(xml)) {
    return xml.replace(/<calcPr\b[^>]*\/>/, '<calcPr calcMode="auto" fullCalcOnLoad="1" forceFullCalc="1"/>');
  }
  if (/<calcPr\b[^>]*>[\s\S]*?<\/calcPr>/.test(xml)) {
    return xml.replace(/<calcPr\b[^>]*>[\s\S]*?<\/calcPr>/, '<calcPr calcMode="auto" fullCalcOnLoad="1" forceFullCalc="1"/>');
  }
  return xml.replace("</workbook>", '<calcPr calcMode="auto" fullCalcOnLoad="1" forceFullCalc="1"/></workbook>');
}

function summaryDecision(result) {
  const dscr = result.buyerReturns.year1Dscr;
  const valuePass = result.purchasePrice <= result.indicatedValue;
  const dscrPass = dscr === null || dscr >= result.assumptions.minimumDscr;
  if (valuePass && dscrPass) return "PASS SCREEN - validate tenancy, comparables, condition and legal due diligence";
  return "REVIEW PRICE / RENT / LEVERAGE - current inputs do not meet both value and DSCR screens";
}

function comparableCells(result) {
  const values = {};
  const columns = ["C", "D", "E", "F"];
  const comparables = result.comparisonApproach.comparables.filter((item) => item.current).slice(0, columns.length);
  columns.forEach((column, index) => {
    const comparable = comparables[index];
    if (!comparable) return;
    values[`${column}17`] = comparable.source;
    values[`${column}18`] = comparable.projectName;
    values[`${column}19`] = comparable.projectName;
    values[`${column}20`] = excelSerial(comparable.transactionDate) || "";
    values[`${column}21`] = comparable.salePrice;
    values[`${column}22`] = comparable.floorArea;
    values[`${column}32`] = comparable.adjustment;
    values[`${column}46`] = comparable.weight;
  });
  return values;
}

function projectionFormulaCaches(result) {
  const caches = {};
  const columns = ["F", "G", "H", "I", "J", "K"];
  const expenseRows = {
    maintenanceAndSinking: 47,
    assessment: 48,
    quitRent: 49,
    insurance: 50,
    propertyManagement: 51,
    lettingRenewal: 52,
    repairs: 53,
    ownerUtilities: 54,
    furnishingReserve: 55,
    miscellaneous: 56,
    specialAssessment: 57
  };
  result.years.slice(0, columns.length).forEach((year, index) => {
    const column = columns[index];
    caches[`${column}39`] = year.monthlyRent;
    caches[`${column}40`] = year.grossPotentialRent;
    caches[`${column}41`] = year.occupancy;
    caches[`${column}42`] = year.vacancyLoss;
    caches[`${column}43`] = year.otherIncome;
    caches[`${column}44`] = year.effectiveGrossIncome;
    for (const [expense, row] of Object.entries(expenseRows)) caches[`${column}${row}`] = year.expenses[expense];
    caches[`${column}58`] = year.totalOperatingExpenses;
    caches[`${column}60`] = year.noi;
    caches[`${column}61`] = year.noiMargin;
    if (index < result.assumptions.holdingPeriodYears) {
      caches[`${column}62`] = result.assumptions.discountRate;
      caches[`${column}64`] = year.discountFactor;
      caches[`${column}65`] = year.presentValueOfNoi;
    }
  });
  caches.K67 = result.assumptions.terminalCapRate;
  caches.K68 = result.incomeApproach.netTerminalValue;
  caches.K69 = result.incomeApproach.presentValueOfTerminal;
  return caches;
}

function buyerFormulaCaches(result) {
  const caches = { E90: result.buyerReturns.loanAmount, E94: -result.buyerReturns.equityRequired };
  const columns = ["F", "G", "H", "I", "J"];
  result.buyerReturns.financingSchedule.slice(0, columns.length).forEach((year, index) => {
    const column = columns[index];
    caches[`${column}90`] = year.endingBalance;
    caches[`${column}91`] = year.interestEstimate;
    caches[`${column}92`] = -year.incomeTax;
    caches[`${column}94`] = year.equityCashFlow;
  });
  caches.J93 = -(result.buyerReturns.financingSchedule.at(-1)?.exitRpgt || 0);
  return caches;
}

function comparableFormulaCaches(result) {
  const caches = {};
  const columns = ["C", "D", "E", "F"];
  result.comparisonApproach.comparables.filter((item) => item.current).slice(0, columns.length).forEach((comparable, index) => {
    const column = columns[index];
    caches[`${column}23`] = comparable.rawPricePerSf;
    caches[`${column}42`] = comparable.adjustment;
    caches[`${column}43`] = comparable.adjustedPricePerSf;
    caches[`${column}45`] = "Yes";
    caches[`${column}47`] = comparable.adjustedPricePerSf * comparable.weight;
  });
  return caches;
}

export async function generateResidentialDcfWorkbook(raw = {}, calculated = null) {
  const result = calculated || calculateResidentialDcf(raw);
  const a = result.assumptions;
  if (a.holdingPeriodYears !== 5) {
    const error = new Error("The attached Excel template uses a fixed five-year DCF horizon. Select five years before downloading it.");
    error.statusCode = 400;
    error.code = "DCF_WORKBOOK_HORIZON";
    throw error;
  }
  const source = await readFile(TEMPLATE_PATH);
  const archive = unzipSync(new Uint8Array(source));
  requireTemplateEntries(archive);
  removeObscuringTemplateShapes(archive);
  const xml = Object.fromEntries(Object.entries(SHEETS).map(([name, entry]) => [name, strFromU8(archive[entry])]));
  const valuationDate = excelSerial(result.asOf) || excelSerial(new Date().toISOString());
  const propertyName = result.property.name || "Subject residential high-rise unit";
  const address = result.property.address || [result.property.area, "Malaysia"].filter(Boolean).join(", ");
  const fileRef = `Apex DCF ${result.asOf} / ${propertyName}`.slice(0, 120);

  xml.summary = writeCells(xml.summary, {
    B4: fileRef,
    B5: raw.dateOfInspection || "To be confirmed",
    B6: valuationDate,
    B7: "Individual investment purchase screening",
    B8: propertyName,
    B9: result.property.propertyType,
    B10: address,
    B11: result.property.titleNumber || "To be confirmed",
    B12: a.floorArea,
    B13: a.carParks,
    B14: result.property.tenure || "To be confirmed",
    B15: raw.currentOccupancy || "Investment screening - verify tenancy status",
    B16: raw.buyerProfile || "Individual investor - verify tax and financing treatment",
    B17: `${a.holdingPeriodYears}-year unlevered DCF plus terminal capitalization; separate levered buyer return`,
    B18: "Malaysian Ringgit (RM)"
  });
  xml.summary = writeFormulaCaches(xml.summary, {
    B21: result.incomeApproach.dcfValue,
    D21: result.purchasePrice,
    F21: (result.incomeApproach.dcfValue - result.purchasePrice) / result.purchasePrice,
    B22: result.incomeApproach.valuePerSf,
    D22: result.buyerReturns.totalAcquisitionCost,
    F22: result.comparisonApproach.value,
    B23: result.years[0].noi,
    D23: result.buyerReturns.annualDebtService,
    F23: result.buyerReturns.year1Dscr,
    B24: result.buyerReturns.equityRequired,
    D24: result.buyerReturns.year1CashOnCash,
    F24: result.buyerReturns.leveredEquityIrr,
    B25: result.incomeApproach.terminalConcentration,
    D25: a.minimumDscr,
    F25: a.holdingPeriodYears,
    B33: result.incomeApproach.dcfValue,
    C33: (result.incomeApproach.dcfValue - result.purchasePrice) / result.purchasePrice,
    D33: result.purchasePrice,
    B34: result.comparisonApproach.value,
    C34: result.comparisonApproach.value === null ? null : (result.comparisonApproach.value - result.purchasePrice) / result.purchasePrice,
    D34: result.purchasePrice,
    B36: result.indicatedValue,
    C36: result.priceVariance,
    D36: result.purchasePrice
  });
  xml.summary = setCell(xml.summary, "A27", summaryDecision(result));

  xml.dcf = writeCells(xml.dcf, {
    B12: a.purchasePrice,
    B13: a.monthlyMarketRent,
    B14: a.otherMonthlyIncome,
    B15: a.year1Occupancy,
    B16: a.stabilizedOccupancy,
    B17: a.annualOccupancyStep,
    B18: a.annualRentGrowth,
    B19: a.annualOtherIncomeGrowth,
    B20: a.annualExpenseInflation,
    B21: a.discountRate,
    B22: a.terminalCapRate,
    B23: a.sellingCostRate,
    B24: a.holdingPeriodYears,
    B25: MONTHS_PER_YEAR,
    E12: a.maintenanceRatePerSfMonth,
    E13: a.monthlyMaintenance ? 0 : a.sinkingFundRate,
    E14: a.annualAssessment,
    E15: a.annualQuitRent,
    E16: a.annualInsurance,
    E17: a.propertyManagementRate,
    E18: a.lettingRenewalRate,
    E19: a.repairsRate,
    E20: a.ownerUtilitiesRate,
    E21: a.furnishingReserveRate,
    E22: a.miscellaneousRate,
    E23: a.annualSpecialAssessment,
    E24: a.loanToValue,
    E25: a.mortgageInterestRate,
    E26: a.loanTermYears,
    E27: a.buyerIncomeTaxRate,
    E28: a.exitRpgtRate,
    E29: a.minimumDscr,
    E30: a.transferStampDuty,
    E31: a.legalDueDiligence,
    E32: a.loanValuationFees,
    E33: a.initialRenovation,
    E34: a.buyerContingency
  });
  xml.dcf = writeFormulaCaches(xml.dcf, {
    B3: propertyName,
    B4: result.property.propertyType,
    B5: address,
    B6: result.property.tenure || "To be confirmed",
    B7: a.floorArea,
    B8: a.carParks,
    B9: valuationDate,
    ...projectionFormulaCaches(result),
    B69: result.incomeApproach.dcfValue,
    B70: result.incomeApproach.valuePerSf,
    B71: result.incomeApproach.terminalConcentration,
    B74: result.purchasePrice,
    B80: result.buyerReturns.totalAcquisitionCost,
    B82: result.buyerReturns.loanAmount,
    B83: result.buyerReturns.equityRequired,
    B84: result.buyerReturns.monthlyDebtService,
    B85: result.buyerReturns.annualDebtService,
    B86: result.buyerReturns.year1Dscr,
    B87: result.buyerReturns.year1CashOnCash,
    ...buyerFormulaCaches(result),
    B95: result.buyerReturns.leveredEquityIrr
  });

  xml.comparison = writeCells(xml.comparison, comparableCells(result));
  xml.comparison = writeFormulaCaches(xml.comparison, {
    B3: propertyName,
    B4: result.property.propertyType,
    B5: address,
    B6: result.property.tenure || "To be confirmed",
    B7: a.floorArea,
    B8: a.carParks,
    B9: result.incomeApproach.dcfValue,
    B10: result.incomeApproach.valuePerSf,
    B11: valuationDate,
    B18: propertyName,
    B19: address,
    B20: valuationDate,
    B22: a.floorArea,
    B26: a.carParks,
    B27: result.property.tenure || "To be confirmed",
    B28: a.maintenanceRatePerSfMonth,
    ...comparableFormulaCaches(result),
    B51: result.comparisonApproach.eligibleCount ? result.comparisonApproach.comparables.filter((item) => item.current).reduce((sum, item) => sum + item.weight, 0) : 0,
    B52: result.comparisonApproach.adjustedPricePerSf,
    B53: result.comparisonApproach.value,
    B54: result.comparisonApproach.value === null ? null : (result.comparisonApproach.value / result.incomeApproach.dcfValue) - 1
  });
  xml.comparison = setFormulaCache(xml.comparison, "B55", result.comparisonApproach.eligibleCount >= 3
    ? "OK"
    : "INPUT NEEDED - enter at least three recent verified completed sales");

  xml.sources = writeFormulaCaches(xml.sources, {
    B48: result.incomeApproach.dcfValue,
    D48: result.incomeApproach.dcfValue,
    B49: a.discountRate,
    C49: a.terminalCapRate,
    D49: a.discountRate - a.terminalCapRate,
    B50: result.incomeApproach.terminalConcentration,
    D50: result.incomeApproach.terminalConcentration - 0.8,
    B51: result.buyerReturns.year1Dscr,
    C51: a.minimumDscr,
    D51: result.buyerReturns.year1Dscr - a.minimumDscr,
    B52: result.comparisonApproach.eligibleCount,
    D52: result.comparisonApproach.eligibleCount - 3,
    B53: result.purchasePrice,
    C53: result.incomeApproach.dcfValue,
    D53: result.incomeApproach.dcfValue - result.purchasePrice,
    E48: result.incomeApproach.dcfValue > 0 ? "OK" : "REVIEW",
    E49: a.discountRate > a.terminalCapRate ? "OK" : "REVIEW",
    E50: result.incomeApproach.terminalConcentration <= 0.8 ? "OK" : "REVIEW",
    E51: result.buyerReturns.year1Dscr >= a.minimumDscr ? "OK" : "REVIEW",
    E52: result.comparisonApproach.eligibleCount >= 3 ? "OK" : "INPUT NEEDED",
    E53: result.purchasePrice <= result.incomeApproach.dcfValue ? "OK" : "REVIEW",
    E54: result.incomeApproach.dcfValue > 0
      && a.discountRate > a.terminalCapRate
      && result.incomeApproach.terminalConcentration <= 0.8
      && result.buyerReturns.year1Dscr >= a.minimumDscr
      && result.purchasePrice <= result.incomeApproach.dcfValue
      ? "CORE MODEL OK - COMPLETE COMPARABLES"
      : "REVIEW CORE ASSUMPTIONS"
  });

  for (const [name, entry] of Object.entries(SHEETS)) archive[entry] = strToU8(xml[name]);
  archive["xl/workbook.xml"] = strToU8(calculationMode(strFromU8(archive["xl/workbook.xml"])));
  return Buffer.from(zipSync(archive, { level: 6 }));
}

export { TEMPLATE_PATH as RESIDENTIAL_DCF_TEMPLATE_PATH };
