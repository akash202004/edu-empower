import os
import google.generativeai as genai
from typing import Optional, Dict

# Set up Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not configured. Check your .env file in the 'ai' folder.")
genai.configure(api_key=api_key)

# Define valid service keywords
SERVICE_KEYWORDS = [
    "plumber", "mechanic", "diesel_mechanic", "motorcycle_mechanic",
    "heavy_vehicle_mechanic", "transmission_specialist", "brake_and_suspension_mechanic",
    "auto_body_mechanic", "auto_electrician", "tire_and_wheel_technician",
    "fleet_mechanic", "home_salon_men", "home_salon_female", "home_appliance_worker"
]

def get_service_keyword_from_gemini(user_prompt: str, file_path: Optional[str] = None) -> Dict[str, str]:
    """
    Detects the most relevant service keyword based on the user's prompt using Gemini.
    
    Parameters:
        user_prompt (str): The user's request in any language.
        file_path (Optional[str]): Optional path to an uploaded file (e.g. image or PDF).
    
    Returns:
        dict: { "keyword": matched_keyword }
    
    Raises:
        ValueError: If the AI output is invalid or unmatchable.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')

        # Prompt to Gemini
        prompt = [
            (
                "You are a multilingual AI that does two things:\n"
                "1. Detect the language of the input and translate it to English.\n"
                "2. Based on the English version, choose ONLY ONE matching keyword from the list:\n"
                f"{', '.join(SERVICE_KEYWORDS)}\n"
                "Return just the keyword in lowercase with no explanation, no punctuation, and no additional text.\n\n"
                f"User request: {user_prompt}"
            )
        ]

        if file_path:
            uploaded_file = genai.upload_file(path=file_path)
            prompt.append(uploaded_file)

        # Call Gemini model
        response = model.generate_content(prompt)
        generated_keyword = response.text.strip().lower().replace('.', '').replace('\n', '')

        # Exact or partial match
        if generated_keyword in SERVICE_KEYWORDS:
            return {"keyword": generated_keyword}
        for keyword in SERVICE_KEYWORDS:
            if keyword in generated_keyword:
                return {"keyword": keyword}

        raise ValueError(f"Gemini returned an unrecognized keyword: '{generated_keyword}'")

    except Exception as e:
        print(f"[ERROR] Gemini processing failed: {e}")
        raise
