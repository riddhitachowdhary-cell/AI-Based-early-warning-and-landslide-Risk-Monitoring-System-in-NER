def generate_reasons(rainfall, soil_moisture, slope):

    reasons = []

    if rainfall >= 100:
        reasons.append("Heavy rainfall detected")

    if soil_moisture >= 0.75:
        reasons.append("High soil moisture detected")

    if slope >= 30:
        reasons.append("Steep slope detected")

    if not reasons:
        reasons.append("No major contributing factors detected")

    return reasons