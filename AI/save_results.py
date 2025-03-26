import json

def save_to_json(data, filename="student_data.json"):
    try:
        with open(filename, "w") as f:
            json.dump(data, f, indent=4)
        print(f"✅ Data saved to {filename}")
    except Exception as e:
        print(f"❌ Error saving data: {e}")
