import math
import re
from collections import Counter


def calculate_entropy(text: str) -> float:
    """
    Calculate Shannon character entropy.
    """

    if not text:
        return 0.0

    counter = Counter(text)
    length = len(text)

    entropy = 0.0

    for count in counter.values():
        probability = count / length
        entropy -= probability * math.log2(probability)

    return entropy


def extract_features(text: str):
    """
    Extract statistical and structural features
    from a communication message.
    """

    if not text:
        text = ""

    length = len(text)

    words = text.split()

    digits = sum(char.isdigit() for char in text)

    special_chars = sum(
        not char.isalnum() and not char.isspace()
        for char in text
    )

    uppercase = sum(
        char.isupper()
        for char in text
    )

    lowercase = sum(
        char.islower()
        for char in text
    )

    spaces = sum(
        char.isspace()
        for char in text
    )

    encoded_pattern = bool(
        re.search(
            r"[A-Za-z0-9+/]{20,}={0,2}",
            text
        )
    )

    signal_marker = bool(
        re.search(
            r"(SIGNAL|HIDDEN|PAYLOAD)\s*:",
            text,
            re.IGNORECASE
        )
    )

    return {
        "message_length": length,
        "word_count": len(words),
        "digit_count": digits,
        "special_character_count": special_chars,
        "uppercase_count": uppercase,
        "lowercase_count": lowercase,
        "space_count": spaces,
        "entropy": calculate_entropy(text),
        "digit_ratio": digits / max(length, 1),
        "special_character_ratio":
            special_chars / max(length, 1),
        "uppercase_ratio":
            uppercase / max(length, 1),
        "encoded_pattern": int(encoded_pattern),
        "signal_marker": int(signal_marker),
    }


if __name__ == "__main__":

    test_message = (
        "The team will meet at the training center tomorrow."
    )

    features = extract_features(test_message)

    print("\nExtracted Features")
    print("------------------------------")

    for name, value in features.items():
        print(f"{name}: {value}")