import cloudinary.api
from config import cloudinary

def fetch_latest_pdf():
    """Fetch latest PDF from Cloudinary"""
    try:
        result = cloudinary.api.resources(
            resource_type="raw",
            type="upload",
            prefix="",  # Fetch all raw uploads (PDFs)
            max_results=1,
            order="desc"
        )
        if result["resources"]:
            latest_pdf = result["resources"][0]["secure_url"]
            print("✅ Latest PDF URL:", latest_pdf)
            return latest_pdf
        else:
            print("⚠️ No PDFs found.")
            return None
    except Exception as e:
        print(f"⚠️ Error fetching PDF: {e}")
        return None

if __name__ == "__main__":
    fetch_latest_pdf()
