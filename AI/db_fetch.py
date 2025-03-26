import requests
import os

# Set backend API URL
BASE_URL = os.getenv("BACKEND_URL", "http://localhost:5000")

def fetch_student_data(user_id):
    url = f"{BASE_URL}/api/students/{user_id}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching data: {e}")
        return None
