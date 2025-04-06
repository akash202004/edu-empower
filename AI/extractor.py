import random

def extract_marks_and_income(student):
    return {
        "tenthMarks": random.randint(60, 95),
        "twelfthMarks": random.randint(65, 98),
        "incomeAmount": random.randint(50000, 300000)
    }
