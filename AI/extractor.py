import os
import re
import requests
from PIL import Image
from io import BytesIO
from pdf2image import convert_from_bytes
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")


def read_pdf_from_url(url):
    try:
        if not url:
            raise ValueError("Empty URL")

        response = requests.get(url)
        response.raise_for_status()

        # Convert PDF bytes to image(s)
        images = convert_from_bytes(response.content)
        if images:
            return images[0]  # return first page
        else:
            raise ValueError("PDF could not be converted to image.")
    except Exception as e:
        print(f"⚠️ Could not read PDF from {url}: {e}")
        return None


def extract_number_from_text(text, pattern=r"\d{2,9}(?:\.\d+)?"):
    try:
        text = text.replace(",", "")  # remove commas
        match = re.search(pattern, text)
        if match:
            return float(match.group())
    except Exception as e:
        print(f"Error extracting number: {e}")
    return 0



def extract_marks_and_income(student):
    print(f"\n📄 Extracting data for: {student.get('fullName', 'Unknown')}")

    tenth_url = student.get("tenthResult", "")
    twelfth_url = student.get("twelfthResult", "")
    income_url = student.get("incomeCert", "")

    if not all([tenth_url, twelfth_url, income_url]):
        print("❌ Missing one or more document URLs in studentDetails.")
        return {
            "tenthMarks": 0,
            "twelfthMarks": 0,
            "incomeAmount": 0,
        }

    tenth_img = read_pdf_from_url(tenth_url)
    twelfth_img = read_pdf_from_url(twelfth_url)
    income_img = read_pdf_from_url(income_url)

    if not all([tenth_img, twelfth_img, income_img]):
        print("❌ One or more PDFs could not be converted to images.")
        return {
            "tenthMarks": 0,
            "twelfthMarks": 0,
            "incomeAmount": 0,
        }

    try:
        tenth_response = model.generate_content([
            "Extract the 10th percentage marks from this document (just the number):",
            tenth_img
        ])
        tenth_marks = extract_number_from_text(tenth_response.text)

        twelfth_response = model.generate_content([
            "Extract the 12th percentage marks from this document (just the number):",
            twelfth_img
        ])
        twelfth_marks = extract_number_from_text(twelfth_response.text)

        income_response = model.generate_content([
            "Extract the annual income from this income certificate (just the number in ₹):",
            income_img
        ])
        income_amount = extract_number_from_text(income_response.text)

        print(f"✅ Extracted: 10th = {tenth_marks}, 12th = {twelfth_marks}, Income = {income_amount}")

        return {
            "tenthMarks": tenth_marks,
            "twelfthMarks": twelfth_marks,
            "incomeAmount": income_amount
        }

    except Exception as e:
        print(f"❌ Gemini extraction failed: {e}")
        return {
            "tenthMarks": 0,
            "twelfthMarks": 0,
            "incomeAmount": 0
        }
