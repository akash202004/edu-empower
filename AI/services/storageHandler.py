import json
import os

DATA_DIR = "data/processed_data"

def save_local_results(user_id, data):
    try:
        if not os.path.exists(DATA_DIR):
            os.makedirs(DATA_DIR)

        file_path = f"{DATA_DIR}/{user_id}.json"
        with open(file_path, "w") as file:
            json.dump(data, file, indent=4)

        print(f"✅ Data saved locally: {file_path}")
    
    except Exception as e:
        print("❌ Storage error:", e)
