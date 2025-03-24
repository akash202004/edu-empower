def assign_points(income, marks_10, marks_12, income_certificate):
    """Assigns points based on income, 10th and 12th marks, and income certificate validity."""
    def get_income_points(income):
        income = int(income.replace(",", "")) if income.isdigit() else 0
        if income <= 50000:
            return 10
        elif income <= 100000:
            return 9
        elif income <= 200000:
            return 8
        elif income <= 500000:
            return 6
        elif income <= 1000000:
            return 4
        else:
            return 2
    
    def get_marks_points(marks):
        if marks >= 90:
            return 10
        elif marks >= 80:
            return 9
        elif marks >= 70:
            return 8
        elif marks >= 60:
            return 7
        elif marks >= 50:
            return 6
        elif marks >= 40:
            return 5
        else:
            return 4
    
    def get_certificate_points(valid):
        return 10 if valid else 5
    
    income_points = get_income_points(income)
    marks_10_points = get_marks_points(marks_10)
    marks_12_points = get_marks_points(marks_12)
    certificate_points = get_certificate_points(income_certificate)
    
    avg_points = (income_points + marks_10_points + marks_12_points + certificate_points) / 4
    
    return round(avg_points)