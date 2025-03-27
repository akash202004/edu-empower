import random  
from textblob import TextBlob  
from googletrans import Translator

# Initialize Translator
translator = Translator()

# Keywords for special hardship conditions
HARDSHIP_KEYWORDS = {
    "financial": ["financial difficulties", "low income", "can't afford", "struggling", "गरीब", "आर्थिक कठिनाई"],
    "single_parent": ["lost father", "lost mother", "no father", "no mother", "orphan", "raised by guardian", "अनाथ"],
    "disability": ["disabled", "special needs", "medical condition", "physically challenged", "विकलांग", "बीमारी"],
    "rural": ["village", "no proper school", "rural area", "lack of resources", "गाँव", "ग्रामीण"],
    "first_gen": ["first in family to study", "no educated family members", "first-generation learner", "पहली पीढ़ी का छात्र"]
}

def translate_text(text):
    """Translate text to English if it's in another language."""
    try:
        detected_lang = translator.detect(text).lang
        if detected_lang != "en":
            translated_text = translator.translate(text, src=detected_lang, dest="en").text
            return translated_text
        return text
    except:
        return text  # In case of translation failure

def analyze_emotion(about_me):
    """Analyze emotional intensity & hardship for 'aboutMe' and return a score (1-10)."""
    if not about_me or about_me.strip() == "Not provided":
        return 1  # Minimum points if empty

    about_me = translate_text(about_me)  # Translate if needed
    blob = TextBlob(about_me)
    polarity = blob.sentiment.polarity  # Sentiment score (-1 to 1)

    # Convert polarity to a 1-10 scale (more negative = more emotion)
    emotion_score = round((1 - polarity) * 9) + 1
    emotion_score = max(1, min(emotion_score, 10))  # Ensure 1-10

    # Additional hardship-based points (up to 5)
    hardship_points = 0
    for category, keywords in HARDSHIP_KEYWORDS.items():
        if any(keyword in about_me.lower() for keyword in keywords):
            hardship_points += 1

    total_score = emotion_score + hardship_points
    return min(10, total_score)  # Cap at 10

def process_student_data(student_data):
    print("🔄 Processing student data...")

    tenth_marks = random.randint(50, 100)  
    twelfth_marks = random.randint(50, 100)  
    income = 100000  

    # Income-based points
    income_points = 10 - (income // 50000)  
    income_points = max(1, income_points)  

    # Marks-based points
    avg_marks = (tenth_marks + twelfth_marks) / 2
    marks_points = 5 if avg_marks > 90 else 4 if avg_marks > 80 else 3 if avg_marks > 70 else 2 if avg_marks > 60 else 1

    # Emotional-based points from "aboutMe"
    about_me = student_data.get("aboutMe", "Not provided")
    emotion_points = analyze_emotion(about_me)

    # Normalize Overall Rating (out of 10)
    total_score = (income_points + marks_points + emotion_points) / 3  
    overall_rating = round(total_score, 1)  # Keep 1 decimal point

    return {
        "userId": student_data["userId"],
        "name": student_data["name"],
        "contactNumber": student_data.get("contactNumber", "Not provided"),  
        "aboutMe": about_me,
        "tenth_marks": tenth_marks,
        "twelfth_marks": twelfth_marks,
        "income": income,
        "income_points": income_points,
        "marks_points": marks_points,
        "emotion_points": emotion_points,  
        "overall_rating": overall_rating,  
        "tenthResult": student_data["tenthResult"],  
        "twelfthResult": student_data["twelfthResult"],
        "incomeCert": student_data["incomeCert"],
    }
