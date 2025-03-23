from fpdf import FPDF

def create_processed_pdf(text, output_path="processed.pdf"):
    """Creates a new PDF with extracted text."""
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, text)

    pdf.output(output_path)
    print(f"Processed PDF saved as {output_path}")
    return output_path

# Example Usage:
if __name__ == "__main__":
    extracted_text = "Sample Extracted Data\nName: John Doe\nIncome: 50000\nMarks: 85, 90"
    create_processed_pdf(extracted_text)
