import pdfParse from "pdf-parse";
import axios from "axios";

export const extractDataFromPDF = async (pdfUrl: string): Promise<{ name: string; income: string } | null> => {
  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfData = await pdfParse(response.data);
    const text = pdfData.text;

    const nameMatch = text.match(/Name:\s*([A-Za-z\s]+)/);
    const incomeMatch = text.match(/Income:\s*\$?([\d,]+)/);

    if (!nameMatch || !incomeMatch) {
      console.log("No valid data found in PDF:", pdfUrl);
      return null;
    }

    return { name: nameMatch[1].trim(), income: incomeMatch[1].trim() };
  } catch (error) {
    console.error("Error extracting data from PDF:", error);
    return null;
  }
};
