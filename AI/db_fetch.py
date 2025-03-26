import os
import requests

# Load backend URL (Update this in .env)
BACKEND_URL = "http://localhost:5000/api/students"  

def fetch_student_data(user_id):
    url = f"{BACKEND_URL}/{user_id}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise error if request fails

        data = response.json()
        if not data:
            print("❌ No data found for the given User ID!")
            return None

        return {
            "userId": data["userId"],
            "name": data["fullName"],
            "tenthResult": data["tenthResult"],   # Cloudinary WebP URL
            "twelfthResult": data["twelfthResult"],  # Cloudinary WebP URL
            "incomeCert": data["incomeCert"],    # Cloudinary WebP URL
        }

    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching data: {e}")
        return None
