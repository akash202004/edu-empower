import os
import requests
from dotenv import load_dotenv

load_dotenv()

CLOUD_NAME = os.getenv("CLOUD_NAME")
API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
RESOURCE_TYPE = "raw"

CLOUDINARY_LIST_URL = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/resources/{RESOURCE_TYPE}"

def get_latest_pdf():
    """Fetch the latest uploaded PDF URL from Cloudinary"""
    response = requests.get(
        CLOUDINARY_LIST_URL,
        auth=(API_KEY, API_SECRET),
        params={"max_results": 1, "prefix": ""}
    )

    files = response.json().get("resources", [])
    if files:
        return files[0]["secure_url"]
    return None

if __name__ == "__main__":
    latest_pdf = get_latest_pdf()
    print("Latest PDF URL:", latest_pdf)
