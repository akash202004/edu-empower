import axios from "axios";
import { config } from "../config/env";

interface ExtractedData {
  name: string;
  income: string;
}

export const sendExtractedData = async ({ name, income }: ExtractedData): Promise<void> => {
  try {
    const response = await axios.post(`${config.backendUrl}/api/saveData`, { name, income });
    console.log(`✅ Data successfully sent to backend:`, response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`❌ Axios error: ${error.message}`);
      console.error(`🔎 Response data: ${error.response?.data}`);
    } else {
      console.error(`❌ Unknown error:`, error);
    }
  }
};
