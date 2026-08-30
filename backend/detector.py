from pathlib import Path

import joblib
import numpy as np

from backend.feature_extractor import extract_features


MODEL_PATH = Path(
    "models/advanced_hidden_signal_detector.pkl"
)

VECTORIZER_PATH = Path(
    "models/advanced_tfidf_vectorizer.pkl"
)

SCALER_PATH = Path(
    "models/advanced_feature_scaler.pkl"
)


def load_models():

    model = joblib.load(
        MODEL_PATH
    )

    vectorizer = joblib.load(
        VECTORIZER_PATH
    )

    scaler = joblib.load(
        SCALER_PATH
    )

    return model, vectorizer, scaler


def build_statistical_features(message):

    features = extract_features(
        message
    )

    return np.array([
        features["message_length"],
        features["word_count"],
        features["digit_count"],
        features["special_character_count"],
        features["uppercase_count"],
        features["lowercase_count"],
        features["space_count"],
        features["entropy"],
        features["digit_ratio"],
        features["special_character_ratio"],
        features["uppercase_ratio"],
        features["encoded_pattern"],
        features["signal_marker"],
    ]).reshape(1, -1)


def detect_hidden_signal(message):

    model, vectorizer, scaler = load_models()

    text_features = vectorizer.transform(
        [message]
    ).toarray()

    statistical_features = (
        build_statistical_features(
            message
        )
    )

    statistical_features = scaler.transform(
        statistical_features
    )

    combined_features = np.hstack([
        text_features,
        statistical_features
    ])

    prediction = model.predict(
        combined_features
    )[0]

    probabilities = model.predict_proba(
        combined_features
    )[0]

    confidence = float(
        max(probabilities)
    )

    suspicious_probability = float(
        probabilities[1]
    )

    if prediction == 1:

        classification = (
            "SUSPICIOUS COMMUNICATION"
        )

    else:

        classification = (
            "NORMAL COMMUNICATION"
        )

    return {
        "detected": bool(prediction),
        "classification": classification,
        "confidence": round(
            confidence,
            4
        ),
        "suspicious_probability": round(
            suspicious_probability,
            4
        )
    }


if __name__ == "__main__":

    messages = [

        "The team will meet at the training center tomorrow.",

        (
            "The team will meet at the training center tomorrow. "
            "|| SIGNAL:TUlTU0lPTi1BTFBIQS0wNw=="
        ),

    ]

    for message in messages:

        print("\n")
        print("=" * 60)

        print(
            "MESSAGE:"
        )

        print(message)

        print(
            "\nAI ANALYSIS:"
        )

        print(
            detect_hidden_signal(
                message
            )
        )