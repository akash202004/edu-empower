import axios from "axios";
import { config } from "../config/env";

export const sendExtractedData = async (name: string, income: string): Promise<void> => {
  try {
    await axios.post(`${config.backendUrl}/api/saveData`, { name, income });
    console.log(`✅ Data sent to backend: ${name}, ${income}`);
  } catch (error) {
    console.error("❌ Error sending data to backend:", error);
  }
};
