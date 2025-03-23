import PyPDF2
import re

def extract_pdf_data(pdf_path):
    """Extracts required details from the PDF"""
    extracted_data = {"name": None, "income": None, "tenth_marks": None, "twelfth_marks": None}

    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])

        extracted_data["name"] = re.search(r"Name[:\s]+([A-Za-z ]+)", text).group(1) if re.search(r"Name[:\s]+([A-Za-z ]+)", text) else "Unknown"
        extracted_data["income"] = re.search(r"Income[:\s]+([\d,]+)", text).group(1) if re.search(r"Income[:\s]+([\d,]+)", text) else "0"
        extracted_data["tenth_marks"] = re.search(r"10th Marks[:\s]+([\d]+)", text).group(1) if re.search(r"10th Marks[:\s]+([\d]+)", text) else "0"
        extracted_data["twelfth_marks"] = re.search(r"12th Marks[:\s]+([\d]+)", text).group(1) if re.search(r"12th Marks[:\s]+([\d]+)", text) else "0"

    return extracted_data
