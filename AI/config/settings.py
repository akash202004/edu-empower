import os

# Define paths for PDF storage and output files
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PDF_FOLDER = os.path.join(BASE_DIR, "test_pdfs")
OUTPUT_FOLDER = os.path.join(BASE_DIR, "output")

# Ensure directories exist
os.makedirs(PDF_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

EXCEL_FILE = os.path.join(OUTPUT_FOLDER, "income_data.xlsx")
