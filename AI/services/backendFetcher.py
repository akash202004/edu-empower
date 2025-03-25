import requests

BACKEND_URL = "http://localhost:5000/scholarship/studentRoutes"  # Change if needed

def fetch_student_documents(user_id):
    try:
        response = requests.get(f"{BACKEND_URL}/{user_id}")
        if response.status_code == 200:
            data = response.json()
            return {
                "tenthResult": data.get("tenthResult"),
                "twelfthResult": data.get("twelfthResult"),
                "incomeCert": data.get("incomeCert")
            }
        else:
            print("⚠️ Error fetching data:", response.text)
            return None
    except Exception as e:
        print("❌ Backend fetch error:", e)
        return None
