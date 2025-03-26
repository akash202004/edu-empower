import random  # Simulate AI scoring logic

def process_student_data(student_data):
    print("🔄 Processing student data...")

    # Simulated AI extraction (replace with OCR later)
    tenth_marks = random.randint(50, 100)  
    twelfth_marks = random.randint(50, 100)  
    income = 100000  # Assuming accurate extraction now

    # Rank students based on income (Lower income → Higher rank)
    income_points = 10 - (income // 50000)  # Assign points (1-10)

    # Marks-based points
    avg_marks = (tenth_marks + twelfth_marks) / 2
    if avg_marks > 90:
        marks_points = 5
    elif avg_marks > 80:
        marks_points = 4
    elif avg_marks > 70:
        marks_points = 3
    elif avg_marks > 60:
        marks_points = 2
    else:
        marks_points = 1

    # Overall rating (higher marks + lower income)
    overall_rating = marks_points + income_points

    return {
        "userId": student_data["userId"],
        "name": student_data["name"],
        "tenth_marks": tenth_marks,
        "twelfth_marks": twelfth_marks,
        "income": income,
        "income_points": max(1, income_points),  # Ensure min points = 1
        "marks_points": marks_points,
        "overall_rating": overall_rating,  # NEW FIELD
        "tenthResult": student_data["tenthResult"],  # Image URL
        "twelfthResult": student_data["twelfthResult"],
        "incomeCert": student_data["incomeCert"],
    }
