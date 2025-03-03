import os
import re
import pytesseract
from pdf2image import convert_from_path
import cv2
import pandas as pd
import numpy as np

# ✅ Set the Tesseract-OCR path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# ✅ Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # One level up from 'script/'
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")  # Locate 'uploads' folder
OUTPUT_DIR = os.path.join(BASE_DIR, "output")  # Output folder

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ✅ Define PDF file path
PDF_PATH = os.path.join(UPLOADS_DIR, "income_demo.pdf")

# ✅ Define Poppler path
POPPLER_PATH = r"C:\Users\lifeo\poppler\Library\bin"  # Update with actual path

# ✅ Convert PDF to images
images = convert_from_path(PDF_PATH, poppler_path=POPPLER_PATH)

# ✅ Function to preprocess image
def preprocess_image(img_path):
    image = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Convert to grayscale
    _, thresh = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)  # Apply thresholding
    return thresh

# ✅ Process each image
name = "Unknown"
income_amount = "Not Found"

for i, image in enumerate(images):
    img_filename = os.path.join(OUTPUT_DIR, f"page_{i}.jpg")
    image.save(img_filename, "JPEG")

    # Preprocess image before OCR
    processed_img = preprocess_image(img_filename)

    # Convert image to text using Tesseract
    text = pytesseract.image_to_string(processed_img)

    # ✅ Extract Name (First Uppercase words after "This is to certify that")
    name_match = re.search(r"certify that\s+([A-Z\s]+)", text, re.IGNORECASE)
    if name_match:
        name = name_match.group(1).strip()

    # ✅ Extract All Numeric Values
    numbers = re.findall(r"\b\d{5,6}\b", text)  # Find 5-6 digit numbers (income values)
    numbers = [int(num) for num in numbers]

    # ✅ Find Highest Income
    if numbers:
        income_amount = max(numbers)

# ✅ Save extracted data to Excel
data = {"Name": [name], "Income Amount": [income_amount]}
df = pd.DataFrame(data)

excel_path = os.path.join(OUTPUT_DIR, "extracted_data.xlsx")
df.to_excel(excel_path, index=False)

print("✅ Sheet extracted successfully.")
