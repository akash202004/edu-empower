import uuid
from datetime import datetime
from collections import defaultdict
from analyzer import analyze_emotion
from extractor import extract_marks_and_income
from helpers import fetch_applications, fetch_student, save_to_json
from push_to_db import push_data, already_exists

def score_student(student, app):
    data = extract_marks_and_income(student)
    emotion_score = analyze_emotion(student.get("aboutMe", "")) * 10  # scale to 0–10

    # Income Score (out of 30)
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

    # Marks Score (out of 40)
    avg_marks = (data["tenthMarks"] + data["twelfthMarks"]) / 2
    marks_score = min(max((avg_marks / 100) * 40, 0), 40)

    # Emotion Score (out of 30)
    emotion_score = min(max(emotion_score * 3, 0), 30)

    total_score = round(income_score + marks_score + emotion_score, 2)

    return {
        "id": f"student-{uuid.uuid4()}",
        "applicationId": app["id"],
        "scholarshipId": app.get("scholarshipId", ""),
        "userId": student.get("userId", ""),
        "name": student.get("fullName", "Unnamed Student"),  # Fixed from “Unnamed Student”
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

    students_by_scholarship = defaultdict(list)

    for app in applications:
        if already_exists(app["id"]):
            print(f"⚠️ Skipped: {app['id']} already ranked.")
            continue

        student = fetch_student(app.get("studentId"))
        if student:
            result = score_student(student, app)
            students_by_scholarship[app["scholarshipId"]].append(result)

    all_students = []

    # Assign ranks separately per scholarship
    for scholarship_id, group in students_by_scholarship.items():
        group.sort(key=lambda x: x["score"], reverse=True)
        for i, student in enumerate(group):
            student["rank"] = i + 1
            all_students.append(student)

    # Save full data to JSON
    save_to_json(all_students)

    # Simplified data for DB
    simplified = [
        {
            "applicationId": s["applicationId"],
            "scholarshipId": s["scholarshipId"],
            "score": s["score"],
            "rank": s["rank"],
            "createdAt": datetime.now().isoformat()
        }
        for s in all_students
    ]

    push_data(simplified)

if __name__ == "__main__":
    main()
