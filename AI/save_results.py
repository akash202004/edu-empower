import json

def save_to_json(data):
    with open("student_data.json", "w") as f:
        json.dump(data, f, indent=4)
    print("✅ Data saved in student_data.json")
