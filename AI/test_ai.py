import sys
import os

# Set the path to AI folder
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from controllers.aiController import run_income_extraction

if __name__ == "__main__":
    print("🚀 Running AI Income Extraction...")
    run_income_extraction()
