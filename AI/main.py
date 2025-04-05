import uuid
from datetime import datetime
from analyzer import analyze_emotion
from extractor import extract_marks_and_income
from helpers import fetch_applications, fetch_student, save_to_json
from push_to_db import push_data, already_exists

def score_student(student, app):
    data = extract_marks_and_income(student)
    emotion_score = analyze_emotion(student.get("aboutMe", "")) * 10

    income = data["incomeAmount"]
    if income <= 100000:
        income_score = 30
    elif income <= 150000:
        income_score = 25
    elif income <= 200000:
        income_score = 20
    elif income <= 250000:
        income_score = 15
    elif income <= 300000:
        income_score = 10
    else:
        income_score = 5

    avg_marks = (data["tenthMarks"] + data["twelfthMarks"]) / 2
    marks_score = min(max((avg_marks / 100) * 40, 0), 40)
    emotion_score = min(max(emotion_score * 3, 0), 30)

    total_score = round(income_score + marks_score + emotion_score, 2)

    return {
        "id": f"student-{uuid.uuid4()}",
        "applicationId": app["id"],
        "scholarshipId": app.get("scholarshipId", ""),
        "userId": student.get("userId", ""),
        "name": student.get("fullName", "Unnamed Student"),  # Use fullName here
        "aboutMe": student.get("aboutMe", ""),
        "incomeAmount": data["incomeAmount"],
        "tenthMarks": data["tenthMarks"],
        "twelfthMarks": data["twelfthMarks"],
        "incomeScore": income_score,
        "marksScore": marks_score,
        "emotionScore": round(emotion_score, 2),
        "score": total_score,
        "rank": 0
    }

def main():
    applications = fetch_applications()
    print(f"\n🎯 Total Applications: {len(applications)}\n")

    students = []

    for app in applications:
        if already_exists(app["id"]):
            print(f"⚠️ Skipped: {app['id']} already ranked.")
            continue

        student = fetch_student(app.get("studentId"))
        if student:
            result = score_student(student, app)
            students.append(result)

    students.sort(key=lambda x: (x["scholarshipId"], -x["score"]))

    current_scholarship = None
    current_rank = 0

    for s in students:
        if s["scholarshipId"] != current_scholarship:
            current_scholarship = s["scholarshipId"]
            current_rank = 1
        else:
            current_rank += 1
        s["rank"] = current_rank

    save_to_json(students)

    simplified = [
        {
            "applicationId": s["applicationId"],
            "scholarshipId": s["scholarshipId"],
            "score": s["score"],
            "rank": s["rank"],
            "createdAt": datetime.now().isoformat(),
            "name": s["name"]  # Include name for logging
        }
        for s in students
    ]

    push_data(simplified)

if __name__ == "__main__":
    main()
