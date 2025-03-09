import * as XLSX from "xlsx";
import fs from "fs";

export const saveDataToExcel = (data: { name: string; income: string }[]) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "IncomeData");

  XLSX.writeFile(wb, "income_data.xlsx");
  console.log("✅ Data saved to income_data.xlsx");
};
