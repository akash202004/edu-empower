def calculate_points(income, tenth_marks, twelfth_marks):
    points = 0

    # Assign points based on income (lower income = higher points)
    if income < 200000:
        points += 10
    elif income < 500000:
        points += 7
    else:
        points += 3

    # Assign points based on marks (higher marks = higher points)
    if tenth_marks >= 90:
        points += 10
    elif tenth_marks >= 80:
        points += 7
    elif tenth_marks >= 60:
        points += 5
    else:
        points += 2

    if twelfth_marks >= 90:
        points += 10
    elif twelfth_marks >= 80:
        points += 7
    elif twelfth_marks >= 60:
        points += 5
    else:
        points += 2

    return points

def process_student_data(student_data):
    user_id = student_data.get("userId")
    tenth_result_url = student_data.get("tenthResult")
    twelfth_result_url = student_data.get("twelfthResult")
    income_cert_url = student_data.get("incomeCert")
    
    income_amount = int(student_data.get("incomeAmount", 0))  # Assume income is available
    tenth_marks = int(student_data.get("tenthMarks", 0))
    twelfth_marks = int(student_data.get("twelfthMarks", 0))

    # Calculate points
    total_points = calculate_points(income_amount, tenth_marks, twelfth_marks)

    return {
        "userId": user_id,
        "tenthResult": tenth_result_url,
        "twelfthResult": twelfth_result_url,
        "incomeCert": income_cert_url,
        "incomeAmount": income_amount,
        "tenthMarks": tenth_marks,
        "twelfthMarks": twelfth_marks,
        "totalPoints": total_points
    }
