from predict import predict_message


TEST_MESSAGES = [

    # ========================================================
    # NORMAL COMMUNICATION
    # ========================================================

    (
        "The logistics team will inspect the vehicles "
        "after the morning briefing."
    ),

    (
        "The training exercise has been moved "
        "to Friday afternoon."
    ),

    (
        "All personnel should report to the command "
        "center before the scheduled briefing."
    ),

    (
        "The maintenance report was submitted "
        "to the operations office."
    ),

    # ========================================================
    # SUSPICIOUS COMMUNICATION
    # ========================================================

    (
        "Remember every second word when the "
        "lights change after midnight."
    ),

    (
        "The silent tower watches the northern road "
        "at 0317."
    ),

    (
        "Take the first letters and ignore the "
        "ordinary words between them."
    ),

    (
        "Seven signals followed by three short "
        "signals before sunrise."
    ),
]


# ============================================================
# RUN TESTS
# ============================================================

for number, message in enumerate(
    TEST_MESSAGES,
    start=1
):

    result = predict_message(
        message
    )

    print("\n" + "=" * 70)

    print(
        f"TEST MESSAGE {number}"
    )

    print("=" * 70)

    print(
        "Message:",
        message
    )

    print(
        "Classification:",
        result["classification"]
    )

    print(
        "Suspicious Probability:",
        result["suspicious_probability"]
    )