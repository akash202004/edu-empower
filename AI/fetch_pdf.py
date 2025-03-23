import requests
import os
from services.cloudinaryService import get_latest_pdf

SAVE_DIR = "data/processed_pdfs"
os.makedirs(SAVE_DIR, exist_ok=True)

def download_pdf(pdf_url):
    """Download PDF from Cloudinary and save it locally"""
    response = requests.get(pdf_url, stream=True)
    filename = os.path.join(SAVE_DIR, pdf_url.split("/")[-1])

    with open(filename, "wb") as file:
        for chunk in response.iter_content(chunk_size=8192):
            file.write(chunk)
    
    print(f"Downloaded PDF: {filename}")
    return filename

if __name__ == "__main__":
    latest_pdf = get_latest_pdf()
    if latest_pdf:
        local_pdf = download_pdf(latest_pdf)
    else:
        print("No new PDFs found!")
