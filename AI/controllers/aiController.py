import json
import os
from services.pdfExtractor import extract_pdf_data
from services.pointDistributor import assign_points
from fetch_pdf import download_pdf
from services.cloudinaryService import get_latest_pdf

SAVE_JSON_PATH = "data/extracted_data.json"

def process_latest_pdf():
    """Fetch, process, and store extracted data"""
    latest_pdf_url = get_latest_pdf()
    if not latest_pdf_url:
        print("No PDFs found in Cloudinary!")
        return

    local_pdf = download_pdf(latest_pdf_url)
    extracted_data = extract_pdf_data(local_pdf)

    # Assign points
    extracted_data["points"] = assign_points(extracted_data["income"])

    # Store locally in JSON
    if os.path.exists(SAVE_JSON_PATH):
        with open(SAVE_JSON_PATH, "r") as f:
            data = json.load(f)
    else:
        data = []

    data.append(extracted_data)

    with open(SAVE_JSON_PATH, "w") as f:
        json.dump(data, f, indent=4)

    print("Extracted data stored locally!")

    # **DB integration (Commented out for now)**
    # response = requests.post("http://localhost:3000/api/students", json=extracted_data)
    # print("DB Response:", response.json())

if __name__ == "__main__":
    process_latest_pdf()
