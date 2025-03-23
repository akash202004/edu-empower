def assign_points(income):
    """Assigns points based on income level"""
    income = int(income.replace(",", "")) if income.isdigit() else 0

    if income <= 50000:
        return 10
    elif income <= 100000:
        return 8
    elif income <= 200000:
        return 6
    elif income <= 500000:
        return 4
    else:
        return 2
