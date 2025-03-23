import pytesseract
from pdf2image import convert_from_path

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF using OCR."""
    images = convert_from_path(pdf_path)
    text = ""

    for img in images:
        text += pytesseract.image_to_string(img)

    return text

# Example Usage:
if __name__ == "__main__":
    extracted_text = extract_text_from_pdf("downloaded.pdf")
    print("Extracted Data:\n", extracted_text)
