from ai.hidden_signal_detector import (
    HiddenSignalDetector
)


detector = HiddenSignalDetector()


test_messages = [

    "The team will meet at the training center tomorrow.",

    "The mission checkpoint is classified and urgent.",

    "AAAAAAAAAAAAAAAAAAAAAAAAAAAA",

    "Training starts at 0900 and ends at 1700.",

]


for message in test_messages:

    print("=" * 70)

    print("MESSAGE:")

    print(message)

    print()

    result = detector.analyze(
        message
    )

    print("RESULT:")

    print(result)