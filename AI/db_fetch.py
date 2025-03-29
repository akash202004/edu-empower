import requests

BACKEND_URL = "http://localhost:5001/api/students"

def fetch_student_data(user_id):
    """Fetch student details from the backend."""
    url = f"{BACKEND_URL}/{user_id}"
    
    try:
        response = requests.get(url)
        
        if response.status_code == 404:
            print(f"❌ No student found for User ID: {user_id}")
            return None  # Return None if student not found

        response.raise_for_status()
        data = response.json()

        # ✅ Ensure all required fields exist
        required_fields = ["userId", "fullName", "tenthResult", "twelfthResult", "incomeCert"]
        for field in required_fields:
            if field not in data:
                print(f"❌ Missing field '{field}' in API response!")
                return None

        return {
            "userId": data["userId"],
            "name": data["fullName"],
            "aboutMe": data.get("aboutMe", "Not provided"),
            "contactNumber": data.get("contactNumber", "Not provided"),
            "tenthResult": data["tenthResult"],   # Cloudinary WebP URL
            "twelfthResult": data["twelfthResult"],  
            "incomeCert": data["incomeCert"],    
        }

    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching student data: {e}")
        return None
