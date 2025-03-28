import random  
import re  
from textblob import TextBlob  
from googletrans import Translator
from train import HARDSHIP_KEYWORDS  # Import hardship data

# Initialize Translator
translator = Translator()

# Detect Hindi words (basic check)
HINDI_PATTERN = re.compile("[\u0900-\u097F]")

def contains_hindi(text):
    """Returns True if text contains Hindi characters."""
    return bool(HINDI_PATTERN.search(text))

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

    # Convert polarity to a 1-5 scale (negative = high emotion)
    emotion_score = round((1 - polarity) * 4.5) + 1  # Scaling max to ~5 points
    emotion_score = max(1, min(emotion_score, 5))  # Ensure range 1-5

    # Hardship-based points (Only English words add points)
    hardship_points = 0
    about_me_lower = about_me.lower()
    for category, keywords in HARDSHIP_KEYWORDS.items():
        for keyword in keywords:
            if keyword in about_me_lower and not contains_hindi(keyword):  # Only English words
                hardship_points += 1

    hardship_points = min(5, hardship_points)  # Cap at 5 points

    # Penalty for Hindi words (-1 point if found)
    if contains_hindi(about_me):
        hardship_points -= 1

    # Penalty for illogical/gibberish sentences
    word_count = len(about_me.split())
    if word_count < 3 and polarity > 0.5:  # If too short and overly positive, likely nonsense
        hardship_points -= 1

    total_score = max(1, min(10, emotion_score + hardship_points))  # Ensure range 1-10
    return total_score

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
