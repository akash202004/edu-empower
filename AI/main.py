import json
import requests
from process_data import process_student_data, save_results_to_json, push_to_database

def fetch_student_data(user_id):
    try:
        response = requests.get(f"http://localhost:5001/api/students/{user_id}")
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Error: Student ID {user_id} not found in the database.")
            return None
    except Exception as e:
        print(f"❌ Error fetching student data: {e}")
        return None

def main():
    user_id = input("\nEnter User ID: ").strip()

    student_data = fetch_student_data(user_id)
    if not student_data:
        print("❌ Error fetching student data. Exiting.")
        return

    processed_data = process_student_data(student_data)

    # Rank students (sort based on highest score)
    ranking_list = [processed_data]  
    ranking_list.sort(key=lambda x: x["score"], reverse=True)
    for i, student in enumerate(ranking_list, start=1):
        student["rank"] = i

    save_results_to_json(ranking_list)
    push_to_database(ranking_list)

    print("\n🎉 Processing complete! Data stored in JSON & Database.")

if __name__ == "__main__":
    main()
