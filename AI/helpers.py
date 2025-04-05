import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

def fetch_applications():
    res = requests.get(os.getenv("APPLICATIONS_URL"))
    return res.json() if res.status_code == 200 else []

def fetch_student(user_id):
    res = requests.get(f"{os.getenv('BACKEND_API_URL')}/{user_id}")
    return res.json() if res.status_code == 200 else None

def save_to_json(data, filename="ranking_results.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)
