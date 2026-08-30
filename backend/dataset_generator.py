import csv
import os
import random


OUTPUT_FILE = "data/training/hidden_signal_dataset.csv"


NORMAL_MESSAGES = [
    "The team will meet at the training center tomorrow.",
    "The supply vehicle will arrive at the base at noon.",
    "Training starts at eight in the morning.",
    "The equipment inspection is scheduled for Friday.",
    "The patrol team returned safely to the base.",
    "The weather conditions are clear today.",
    "The logistics report has been submitted.",
    "The communication system is functioning normally.",
    "The team completed the scheduled exercise.",
    "The maintenance team inspected the vehicles.",
    "The briefing will begin after lunch.",
    "All personnel should report to the command center.",
    "The medical supplies have arrived.",
    "The transportation schedule has been updated.",
    "The training exercise was completed successfully.",
]


SUSPICIOUS_MESSAGES = [
    "The blue bird will visit the old bridge at 0317.",
    "Remember the third word from every sentence.",
    "The silent river knows when the lights disappear.",
    "Three candles burn before the second bell.",
    "The northern star appears after the seventh signal.",
    "Use the first letter of every unusual sentence.",
    "The red vehicle stops when the clock reaches midnight.",
    "Seven steps followed by three silent signals.",
    "The old tower watches the road after dark.",
    "Remember blue three seven before sunrise.",
    "The second message contains the real instruction.",
    "Take every third word and ignore the remaining text.",
    "The bridge is quiet when the birds return.",
    "Five lights followed by two short signals.",
    "The hidden instruction starts after the fourth sentence.",
]


def generate_dataset():

    os.makedirs(
        os.path.dirname(OUTPUT_FILE),
        exist_ok=True
    )

    rows = []

    message_id = 1

    # --------------------------------------------------------
    # NORMAL COMMUNICATION
    # --------------------------------------------------------

    for _ in range(500):

        message = random.choice(
            NORMAL_MESSAGES
        )

        rows.append({
            "id": message_id,
            "message": message,
            "label": 0
        })

        message_id += 1


    # --------------------------------------------------------
    # SUSPICIOUS COMMUNICATION
    # --------------------------------------------------------

    for _ in range(500):

        message = random.choice(
            SUSPICIOUS_MESSAGES
        )

        rows.append({
            "id": message_id,
            "message": message,
            "label": 1
        })

        message_id += 1


    # --------------------------------------------------------
    # SHUFFLE
    # --------------------------------------------------------

    random.shuffle(rows)


    # --------------------------------------------------------
    # WRITE CSV
    # --------------------------------------------------------

    with open(
        OUTPUT_FILE,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=[
                "id",
                "message",
                "label"
            ]
        )

        writer.writeheader()

        writer.writerows(rows)


    print(
        f"Dataset created successfully: {OUTPUT_FILE}"
    )

    print(
        f"Total messages: {len(rows)}"
    )

    print(
        "Normal messages: 500"
    )

    print(
        "Suspicious messages: 500"
    )


if __name__ == "__main__":
    generate_dataset()