import random  # Simulate AI scoring logic

def process_student_data(student_data):
    print("🔄 Processing student data...")

    # Simulated AI extraction (replace with OCR later)
    tenth_marks = random.randint(50, 100)  
    twelfth_marks = random.randint(50, 100)  
    income = random.randint(50000, 500000)  # Random income for now

    # Rank students based on income (Lower income → Higher rank)
    income_points = 10 - (income // 50000)  # Assign points (1-10)

    return {
        "userId": student_data["userId"],
        "name": student_data["name"],
        "tenth_marks": tenth_marks,
        "twelfth_marks": twelfth_marks,
        "income": income,
        "income_points": max(1, income_points),  # Ensure min points = 1
        "tenthResult": student_data["tenthResult"],  # Image URL
        "twelfthResult": student_data["twelfthResult"],
        "incomeCert": student_data["incomeCert"],
    }
