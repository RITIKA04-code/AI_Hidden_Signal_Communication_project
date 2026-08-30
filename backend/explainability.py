def generate_explanation(
    message,
    ml_probability,
    hidden_probability,
    features,
):
    indicators = []

    message_lower = message.lower()

    # --------------------------------------------------------
    # NUMERICAL INDICATORS
    # --------------------------------------------------------

    if features.get("digit_count", 0) >= 3:
        indicators.append(
            "Unusual numerical pattern detected"
        )

    # --------------------------------------------------------
    # ENTROPY
    # --------------------------------------------------------

    entropy = features.get(
        "entropy",
        0
    )

    if entropy >= 4.0:
        indicators.append(
            "Elevated character entropy"
        )

    # --------------------------------------------------------
    # EXTRACTION LANGUAGE
    # --------------------------------------------------------

    extraction_terms = [
        "first word",
        "second word",
        "third word",
        "every word",
        "every second",
        "every third",
        "first letters",
        "take the letters",
        "ignore the words",
    ]

    if any(
        term in message_lower
        for term in extraction_terms
    ):
        indicators.append(
            "Possible message-extraction instruction"
        )

    # --------------------------------------------------------
    # SIGNAL LANGUAGE
    # --------------------------------------------------------

    signal_terms = [
        "signal",
        "sequence",
        "code",
        "hidden",
        "remember",
        "pattern",
        "three",
        "seven",
    ]

    matches = [
        term
        for term in signal_terms
        if term in message_lower
    ]

    if len(matches) >= 2:
        indicators.append(
            "Multiple signal-related terms detected"
        )

    # --------------------------------------------------------
    # ML CONTRIBUTION
    # --------------------------------------------------------

    ml_contribution = round(
        ml_probability * 100,
        2
    )

    hidden_contribution = round(
        hidden_probability * 100,
        2
    )

    # --------------------------------------------------------
    # DEFAULT EXPLANATION
    # --------------------------------------------------------

    if not indicators:

        indicators.append(
            "No strong structural indicators detected"
        )

    return {
        "indicators": indicators,

        "ml_contribution":
            ml_contribution,

        "hidden_signal_contribution":
            hidden_contribution,

        "explanation":
            "Detection is based on a combination "
            "of text classification and structural "
            "signal analysis."
    }