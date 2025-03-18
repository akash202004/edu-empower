from services.process_pdfs import process_pdfs

def run_income_extraction():
    """Runs the AI module for processing income certificates."""
    process_pdfs()
    print("✅ Income extraction completed.")

if __name__ == "__main__":
    run_income_extraction()
