import requests
import pytesseract
from PIL import Image
from io import BytesIO

def extract_text_from_image(image_url):
    try:
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))
        text = pytesseract.image_to_string(img)
        return text.strip()
    except Exception as e:
        print("❌ OCR error:", e)
        return ""
