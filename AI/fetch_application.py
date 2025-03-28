import requests

BACKEND_URL = "http://localhost:5001/api/application"

def fetch_application_id(user_id):
    """Fetch Application ID from backend API."""
    url = f"{BACKEND_URL}/{user_id}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if not data or "applicationId" not in data:
            print("❌ Error fetching application ID: Invalid Application ID")
            return "N/A"

        return data["applicationId"]

    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching application ID: {e}")
        return "N/A"
