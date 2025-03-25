from services.backendFetcher import fetch_student_documents
from services.ocrProcessor import extract_text_from_image
from services.rankingSystem import assign_points
from services.storageHandler import save_local_results

def process_student_documents(user_id):
    try:
        # Step 1: Fetch document URLs from backend
        documents = fetch_student_documents(user_id)
        if not documents:
            print("⚠️ No documents found for user:", user_id)
            return

        extracted_data = {}
        
        # Step 2: Extract text from images
        for doc_type, url in documents.items():
            extracted_text = extract_text_from_image(url)
            extracted_data[doc_type] = extracted_text

        # Step 3: Assign points
        processed_data = assign_points(extracted_data)

        # Step 4: Store locally
        save_local_results(user_id, processed_data)

        print("✅ Processing completed for user:", user_id)

        # Step 5: (Optional) Store in DB (Commented Out)
        # store_in_db(processed_data)

    except Exception as e:
        print("❌ Error processing documents:", e)
