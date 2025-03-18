import os
import pandas as pd
from utils.extract_data import extract_text_from_pdf, extract_name_and_income


PDF_DIR = "test_pdfs"
OUTPUT_DIR = "output"
EXCEL_FILE = os.path.join(OUTPUT_DIR, "income_data.xlsx")

def calculate_points(income):
    """Calculate points based on income range."""
    thresholds = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000]
    for i, threshold in enumerate(thresholds, start=1):
        if income <= threshold:
            return 11 - i  # Convert range into 1-10 scale
    return 1  # Default lowest point for highest income

def process_pdfs():
    """Process all PDFs in the directory, extract data, and store in Excel."""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    data = []

    for pdf_file in os.listdir(PDF_DIR):
        if pdf_file.endswith(".pdf"):
            pdf_path = os.path.join(PDF_DIR, pdf_file)
            text = extract_text_from_pdf(pdf_path)
            name, income = extract_name_and_income(text)
            points = calculate_points(income)

            data.append({"Name": name, "Income": income, "Points": points})

    df = pd.DataFrame(data, columns=["Name", "Income", "Points"])
    df.to_excel(EXCEL_FILE, index=False)
    print(f"✅ Data saved to {EXCEL_FILE}")
