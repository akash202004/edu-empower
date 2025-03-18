import fitz  # PyMuPDF
import re

def extract_text_from_pdf(pdf_path):
    """Extract raw text from a PDF file."""
    with fitz.open(pdf_path) as doc:
        text = ""
        for page in doc:
            text += page.get_text("text") + "\n"
    return text

def extract_name_and_income(text):
    """Extract name and income from the extracted text."""
    name_pattern = re.search(r"This is to certify that Mr\.?\s+([A-Za-z\s]+)", text)
    income_pattern = re.search(r"Rs\.?\s*([\d,]+)", text)

    name = name_pattern.group(1).strip() if name_pattern else "Unknown"
    income = int(income_pattern.group(1).replace(",", "")) if income_pattern else 0

    return name, income
