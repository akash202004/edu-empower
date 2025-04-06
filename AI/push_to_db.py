import requests

BACKEND_URL = "http://localhost:3000/api/ranking"

def already_exists(application_id):
    try:
        res = requests.get(BACKEND_URL)
        if res.status_code == 200:
            rankings = res.json()
            return any(r.get("applicationId") == application_id for r in rankings)
    except Exception as e:
        print(f"⚠️ Error checking existing rankings: {e}")
    return False

def push_data(students):
    for student in students:
        try:
            res = requests.post(BACKEND_URL, json=student)
            if res.status_code in [200, 201]:
                print(f"✅ Pushed {student.get('applicationId')} | Name: {student.get('name', 'Unnamed')} | Score: {student.get('score')}")
            else:
                print(f"❌ Failed to push {student.get('applicationId')} | {res.text}")
        except Exception as e:
            print(f"❌ Exception for {student.get('applicationId')}: {e}")
