def assign_points(extracted_data):
    try:
        points = 0
        income_text = extracted_data.get("incomeCert", "")
        tenth_marks = extracted_data.get("tenthResult", "")
        twelfth_marks = extracted_data.get("twelfthResult", "")

        # Example: Assign points based on extracted data
        if "50000" in income_text:
            points += 10
        if "90%" in tenth_marks:
            points += 5
        if "85%" in twelfth_marks:
            points += 5

        extracted_data["points"] = points
        return extracted_data

    except Exception as e:
        print("❌ Ranking system error:", e)
        return extracted_data
