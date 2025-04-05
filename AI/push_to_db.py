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
        payload = {
            "applicationId": student["applicationId"],
            "scholarshipId": student["scholarshipId"],
            "score": student["score"],
            "rank": student["rank"],
            "studentId": student["userId"],  # store studentId in DB
            "createdAt": student.get("createdAt")
        }

        try:
            res = requests.post(BACKEND_URL, json=payload)
            if res.status_code == 200 or res.status_code == 201:
                print(f"✅ Pushed {student['applicationId']} | Score: {student['score']}")
            else:
                print(f"❌ Failed to push {student['applicationId']} | {res.text}")
        except Exception as e:
            print(f"❌ Exception for {student['applicationId']}: {e}")
