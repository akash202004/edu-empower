from controllers.aiController import process_student_documents

if __name__ == "__main__":
    user_id = input("Enter Student User ID: ")  # Fetch student ID dynamically
    process_student_documents(user_id)
