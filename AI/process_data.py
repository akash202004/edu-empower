import random
import re
import json
import requests
from textblob import TextBlob
from googletrans import Translator
from train import HARDSHIP_KEYWORDS  

translator = Translator()
HINDI_PATTERN = re.compile("[\u0900-\u097F]")

SCHOLARSHIP_ID = "cbb8c275-d3c2-42ca-a158-52ee215b95b9"

def contains_hindi(text):
    return bool(HINDI_PATTERN.search(text))

def translate_text(text):
    try:
        detected_lang = translator.detect(text).lang
        if detected_lang != "en":
            return translator.translate(text, src=detected_lang, dest="en").text
        return text
    except:
        return text

def analyze_emotion(about_me):
    if not about_me or about_me.strip() == "Not provided":
        return 1  

    about_me = translate_text(about_me)  
    blob = TextBlob(about_me)
    polarity = blob.sentiment.polarity  

    emotion_score = round((1 - polarity) * 4.5) + 1  
    emotion_score = max(1, min(emotion_score, 5))

    hardship_points = 0
    about_me_lower = about_me.lower()
    for category, keywords in HARDSHIP_KEYWORDS.items():
        for keyword in keywords:
            if keyword in about_me_lower and not contains_hindi(keyword):  
                hardship_points += 1

    hardship_points = min(5, hardship_points)  
    if contains_hindi(about_me):
        hardship_points -= 1

    word_count = len(about_me.split())
    if word_count < 3 and polarity > 0.5:  
        hardship_points -= 1

    total_score = max(1, min(10, emotion_score + hardship_points))
    return total_score

def fetch_application_id(user_id):
    try:
        response = requests.get(f"http://localhost:5001/api/applications/{user_id}")
        if response.status_code == 200:
            return response.json().get("id")
        else:
            print("❌ Error fetching application ID. Using default.")
            return "90d26440-912d-409a-8ebb-20d4cbf3ea8f"
    except Exception as e:
        print(f"❌ Error fetching application ID: {e}")
        return "90d26440-912d-409a-8ebb-20d4cbf3ea8f"

def process_student_data(student_data):
    print("🔄 Processing student data...")

    student_id = f"student-{random.randint(1000, 9999)}"
    application_id = fetch_application_id(student_data.get("userId", "unknown_user"))
    
    tenth_marks = random.randint(50, 100)  
    twelfth_marks = random.randint(50, 100)  
    income = 100000  

    income_points = 10 - (income // 50000)  
    income_points = max(1, income_points)  

    avg_marks = (tenth_marks + twelfth_marks) / 2
    marks_points = 5 if avg_marks > 90 else 4 if avg_marks > 80 else 3 if avg_marks > 70 else 2 if avg_marks > 60 else 1

    about_me = student_data.get("aboutMe", "Not provided")
    emotion_points = analyze_emotion(about_me)

    total_score = (income_points + marks_points + emotion_points) / 3  
    overall_rating = round(total_score, 1)  

    student_result = {
        "id": student_id,
        "applicationId": application_id,
        "scholarshipId": SCHOLARSHIP_ID,
        "userId": student_data.get("userId", "unknown_user"),
        "name": student_data.get("name", "Unknown Student"),  # FIXED ERROR HERE
        "contactNumber": student_data.get("contactNumber", "Not provided"),
        "aboutMe": about_me,
        "tenthMarks": tenth_marks,
        "twelfthMarks": twelfth_marks,
        "incomeAmount": income,
        "incomePoints": income_points,
        "marksPoints": marks_points,
        "emotionPoints": emotion_points,  
        "score": overall_rating,  
        "rank": 1,
        "tenthResult": student_data.get("tenthResult", "Not provided"),  
        "twelfthResult": student_data.get("twelfthResult", "Not provided"),
        "incomeCert": student_data.get("incomeCert", "Not provided"),
    }
    
    return student_result

def save_results_to_json(results):
    with open("ranking_results.json", "w") as file:
        json.dump(results, file, indent=4)
    print("✅ Ranking saved to ranking_results.json!")

def push_to_database(results):
    for student in results:
        data = {
            "applicationId": student["applicationId"],
            "scholarshipId": student["scholarshipId"],
            "score": student["score"],
            "rank": student["rank"],
        }
        try:
            response = requests.post("http://localhost:5001/api/ranking", json=data)

            if response.status_code == 201:
                print(f"✅ Data for {student['name']} pushed successfully!")
            else:
                print(f"❌ Failed to push data: {response.text}")
        except Exception as e:
            print(f"❌ Error pushing data to database: {e}")
