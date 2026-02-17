/**
 * One-time script: merge Personal + Enterprise AI Tool Evaluation PDFs into one.
 * Run: node scripts/merge-ai-checklist-pdfs.mjs
 * Output: public/downloads/ChisokuLab_AITool_Evaluation_Checklist.pdf
 */
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloadsDir = path.join(root, "public", "downloads");

const personalPath = path.join(downloadsDir, "ChisokuLab_AITool_Evaluation_Personal.pdf");
const enterprisePath = path.join(downloadsDir, "ChisokuLab_AITool_Evaluation_Enterprise.pdf");
const outputPath = path.join(downloadsDir, "ChisokuLab_AITool_Evaluation_Checklist.pdf");

async function merge() {
  const personalBytes = fs.readFileSync(personalPath);
  const enterpriseBytes = fs.readFileSync(enterprisePath);

  const mergedPdf = await PDFDocument.create();
  const pdfPersonal = await PDFDocument.load(personalBytes);
  const pdfEnterprise = await PDFDocument.load(enterpriseBytes);

  const personalPages = await mergedPdf.copyPages(pdfPersonal, pdfPersonal.getPageIndices());
  personalPages.forEach((page) => mergedPdf.addPage(page));

  const enterprisePages = await mergedPdf.copyPages(pdfEnterprise, pdfEnterprise.getPageIndices());
  enterprisePages.forEach((page) => mergedPdf.addPage(page));

  const mergedBytes = await mergedPdf.save();
  fs.writeFileSync(outputPath, mergedBytes);
  console.log("Merged PDF written to", outputPath);
}

merge().catch((err) => {
  console.error(err);
  process.exit(1);
});
