import os
import re
import requests
import pytesseract
import cloudinary
import cloudinary.uploader
from pdf2image import convert_from_bytes
import cv2
import json
import prisma

# Cloudinary Config
cloudinary.config(
    cloud_name="your_cloud_name",
    api_key="your_api_key",
    api_secret="your_api_secret"
)

# Fetch PDF URL from Prisma
def fetch_pdf_url(user_id):
    response = requests.get(f"http://localhost:8000/api/get_pdf/{user_id}")
    if response.status_code == 200:
        return response.json()["documentUrl"]
    return None

# Download PDF and convert it to images
def fetch_pdf_from_cloudinary(pdf_url):
    response = requests.get(pdf_url)
    if response.status_code == 200:
        images = convert_from_bytes(response.content)
        return images
    return None

# Preprocess image for better OCR
def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return binary

# Extract name and income from text
def extract_info(text):
    name_match = re.search(r"certify that\s+([A-Z\s]+)", text, re.IGNORECASE)
    name = name_match.group(1).strip() if name_match else "Unknown"

    numbers = re.findall(r"\b\d{5,6}\b", text)
    income_amount = max(map(int, numbers)) if numbers else "Not Found"

    return {"name": name, "income": income_amount}

# Process the PDF
def process_pdf(user_id):
    pdf_url = fetch_pdf_url(user_id)
    if not pdf_url:
        return {"error": "PDF URL not found"}

    images = fetch_pdf_from_cloudinary(pdf_url)
    if not images:
        return {"error": "Could not download PDF"}

    extracted_data = {"name": "Unknown", "income": "Not Found"}
    
    for image in images:
        text = pytesseract.image_to_string(preprocess_image(image))
        extracted_data = extract_info(text)
    
    # Store extracted data in Prisma
    requests.post("http://localhost:5000/api/store_data", json=extracted_data)
    
    return extracted_data

# Run script
if __name__ == "__main__":
    user_id = input("Enter User ID: ")
    result = process_pdf(user_id)
    print("Extracted Data:", result)
