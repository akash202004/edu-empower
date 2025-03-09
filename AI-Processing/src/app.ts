import { fetchPDFUrls } from "./services/cloudinary";
import { extractDataFromPDF } from "./services/pdfService";
import { sendExtractedData } from "./services/apiService";
import { saveDataToExcel } from "./utils/excelUtills";

const processPDFs = async () => {
  console.log("🚀 Fetching PDFs from Cloudinary...");
  const pdfUrls = await fetchPDFUrls();

  if (pdfUrls.length === 0) {
    console.log("❌ No PDFs found in Cloudinary.");
    return;
  }

  let extractedData: { name: string; income: string }[] = [];

  for (const pdfUrl of pdfUrls) {
    console.log(`📄 Processing: ${pdfUrl}`);
    const extracted = await extractDataFromPDF(pdfUrl);
    if (extracted) {
      extractedData.push(extracted);
      await sendExtractedData(extracted.name, extracted.income);
    }
  }

  if (extractedData.length > 0) {
    saveDataToExcel(extractedData);
  }

  console.log("🎉 Processing complete!");
};

processPDFs();
