import json
from db_fetch import fetch_student_data
from process_data import process_student_data
from save_results import save_to_json

def main():
    user_id = input("Enter User ID: ")
    
    # Fetch student details from NeonDB
    student_data = fetch_student_data(user_id)
    
    if not student_data:
        print("❌ Error: Student not found!")
        return

    # Process the extracted data
    processed_data = process_student_data(student_data)

    # Save results to JSON file
    save_to_json(processed_data)
    
    print("✅ Data processed and saved successfully!")

if __name__ == "__main__":
    main()
