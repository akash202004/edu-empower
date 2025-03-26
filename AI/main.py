from db_fetch import fetch_student_data
from process_data import process_student_data
from save_results import save_to_json

def main():
    user_id = input("Enter User ID: ")  # Get user input
    student_data = fetch_student_data(user_id)

    if student_data:
        processed_data = process_student_data(student_data)  # Process marks & income
        save_to_json(processed_data)  # Save data
        print("✅ Data processed successfully! Check student_data.json")
    else:
        print("❌ Error: Student not found!")

if __name__ == "__main__":
    main()
