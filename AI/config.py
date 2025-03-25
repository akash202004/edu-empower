import requests
import os

# Backend API URL
BACKEND_API = "http://localhost:5000/api/cloudinary-config"

def fetch_cloudinary_config():
    """Fetch Cloudinary credentials from backend"""
    try:
        response = requests.get(BACKEND_API)
        if response.status_code == 200:
            data = response.json()
            os.environ["CLOUDINARY_CLOUD_NAME"] = data["cloud_name"]
            os.environ["CLOUDINARY_API_KEY"] = data["api_key"]
            os.environ["CLOUDINARY_API_SECRET"] = data["api_secret"]
        else:
            print("⚠️ Error: Failed to fetch Cloudinary config")
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Request error: {e}")

# Call the function to load credentials
fetch_cloudinary_config()
