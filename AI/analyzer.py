import re
from textblob import TextBlob
from googletrans import Translator
from train import HARDSHIP_KEYWORDS

translator = Translator()
HINDI_PATTERN = re.compile("[\u0900-\u097F]")

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

    # Reverse scoring: More negative → higher score
    emotion_score = round((1 - polarity) * 5)  # from 1 to 10
    emotion_score = max(1, min(emotion_score, 10))

    hardship_points = 0
    about_me_lower = about_me.lower()
    for _, keywords in HARDSHIP_KEYWORDS.items():
        for keyword in keywords:
            if keyword in about_me_lower:
                hardship_points += 1

    hardship_points = min(5, hardship_points)
    if contains_hindi(about_me):
        hardship_points -= 1

    total_score = max(1, min(10, emotion_score + hardship_points))
    return total_score
