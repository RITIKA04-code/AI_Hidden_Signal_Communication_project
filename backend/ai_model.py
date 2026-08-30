import csv
import random
from pathlib import Path

import joblib
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from backend.encoder import encode_signal
from backend.feature_extractor import extract_features


DATASET_PATH = Path(
    "data/samples/advanced_hidden_signal_dataset.csv"
)

MODEL_DIR = Path("models")

MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True
)


def load_dataset():

    messages = []
    labels = []

    with open(
        DATASET_PATH,
        "r",
        encoding="utf-8"
    ) as file:

        reader = csv.DictReader(file)

        for row in reader:

            messages.append(
                row["message"]
            )

            labels.append(
                int(row["label"])
            )

    return messages, labels


def build_statistical_features(messages):

    features = []

    for message in messages:

        extracted = extract_features(
            message
        )

        features.append([
            extracted["message_length"],
            extracted["word_count"],
            extracted["digit_count"],
            extracted["special_character_count"],
            extracted["uppercase_count"],
            extracted["lowercase_count"],
            extracted["space_count"],
            extracted["entropy"],
            extracted["digit_ratio"],
            extracted["special_character_ratio"],
            extracted["uppercase_ratio"],
            extracted["encoded_pattern"],
            extracted["signal_marker"],
        ])

    return np.array(
        features,
        dtype=float
    )


def train_model():

    print("\nLoading dataset...")

    messages, labels = load_dataset()

    print(
        f"Total messages: {len(messages)}"
    )

    X_train_text, X_test_text, y_train, y_test = (
        train_test_split(
            messages,
            labels,
            test_size=0.20,
            random_state=42,
            stratify=labels
        )
    )

    print("\nCreating TF-IDF features...")

    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        max_features=5000,
        lowercase=True
    )

    X_train_tfidf = vectorizer.fit_transform(
        X_train_text
    )

    X_test_tfidf = vectorizer.transform(
        X_test_text
    )

    print(
        f"TF-IDF features: "
        f"{X_train_tfidf.shape[1]}"
    )

    print("\nCreating statistical features...")

    X_train_stats = build_statistical_features(
        X_train_text
    )

    X_test_stats = build_statistical_features(
        X_test_text
    )

    scaler = StandardScaler()

    X_train_stats = scaler.fit_transform(
        X_train_stats
    )

    X_test_stats = scaler.transform(
        X_test_stats
    )

    print(
        f"Statistical features: "
        f"{X_train_stats.shape[1]}"
    )

    print("\nCombining feature sets...")

    X_train = np.hstack([
        X_train_tfidf.toarray(),
        X_train_stats
    ])

    X_test = np.hstack([
        X_test_tfidf.toarray(),
        X_test_stats
    ])

    print(
        f"Final feature matrix: "
        f"{X_train.shape}"
    )

    print("\nTraining AI classifier...")

    model = LogisticRegression(
        max_iter=2000,
        class_weight="balanced"
    )

    model.fit(
        X_train,
        y_train
    )

    predictions = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    print("\n")
    print("=" * 55)
    print("      ADVANCED HIDDEN-SIGNAL AI DETECTOR")
    print("=" * 55)

    print(
        f"\nAccuracy: {accuracy:.4f}"
    )

    print("\nClassification Report:")

    print(
        classification_report(
            y_test,
            predictions,
            target_names=[
                "Normal",
                "Suspicious"
            ]
        )
    )

    print("Confusion Matrix:")

    print(
        confusion_matrix(
            y_test,
            predictions
        )
    )

    joblib.dump(
        vectorizer,
        MODEL_DIR /
        "advanced_tfidf_vectorizer.pkl"
    )

    joblib.dump(
        scaler,
        MODEL_DIR /
        "advanced_feature_scaler.pkl"
    )

    joblib.dump(
        model,
        MODEL_DIR /
        "advanced_hidden_signal_detector.pkl"
    )

    print("\nModels saved successfully:")

    print(
        "models/advanced_tfidf_vectorizer.pkl"
    )

    print(
        "models/advanced_feature_scaler.pkl"
    )

    print(
        "models/advanced_hidden_signal_detector.pkl"
    )


if __name__ == "__main__":

    if not DATASET_PATH.exists():

        print(
            "Dataset not found."
        )

        print(
            "Generating dataset..."
        )

        # Generate a dataset using the
        # same format as Step 18.

        from subprocess import run

        run([
            "python",
            "backend/ai_model.py"
        ])

    else:

        train_model()