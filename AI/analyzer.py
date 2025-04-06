import os
import google.generativeai as genai
from dotenv import load_dotenv
import time

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Rate limiting to prevent API quota issues
LAST_CALL_TIME = 0
MIN_INTERVAL = 1.2  # seconds between API calls

def analyze_emotion(text: str) -> float:
    """
    Analyzes emotional hardship from text using Gemini AI
    Returns: Float between 0 (no hardship) and 1 (extreme hardship)
    """
    global LAST_CALL_TIME
    
    if not text or not text.strip():
        return 0.5  # Neutral baseline for empty text

    try:
        # Enforce rate limiting
        elapsed = time.time() - LAST_CALL_TIME
        if elapsed < MIN_INTERVAL:
            time.sleep(MIN_INTERVAL - elapsed)
        LAST_CALL_TIME = time.time()

        # Initialize model (using latest stable version)
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        
        prompt = f"""
        Analyze this student's personal statement for emotional hardship.
        Consider these aspects with weights:
        - Financial struggles (30%)
        - Family difficulties (25%)
        - Health challenges (20%)
        - Educational barriers (15%)
        - Emotional distress (10%)

        Scoring Guidelines:
        0.0-0.3: Minimal hardship (normal challenges)
        0.4-0.6: Moderate hardship (significant but manageable)
        0.7-0.9: Severe hardship (serious difficulties)
        1.0: Extreme hardship (critical situation)

        Respond ONLY with a decimal number between 0 and 1.
        Do not include any other text or explanation.

        Text to analyze: "{text[:3000]}"  # Using first 3000 chars for efficiency
        """
        
        response = model.generate_content(prompt)
        
        # Strict parsing of response
        try:
            score = float(response.text.strip())
            return min(max(score, 0.0), 1.0)  # Clamp to 0-1 range
        except (ValueError, AttributeError):
            print("⚠️ Could not parse emotion score, using fallback")
            return 0.5
            
    except Exception as e:
        print(f"❌ Emotion analysis failed: {str(e)}")
        return 0.5  # Fallback neutral score