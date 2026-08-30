import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix,
)


# ============================================================
# PATHS
# ============================================================

DATASET_PATH = "data/training/hidden_signal_dataset.csv"

MODEL_DIR = "models"

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "hidden_signal_model.pkl"
)


# ============================================================
# LOAD DATASET
# ============================================================

print("\nLoading dataset...")

df = pd.read_csv(DATASET_PATH)

print(f"Dataset shape: {df.shape}")

print("\nClass distribution:")
print(df["label"].value_counts())


# ============================================================
# CLEAN DATA
# ============================================================

df["message"] = (
    df["message"]
    .fillna("")
    .astype(str)
)

df["label"] = (
    df["label"]
    .astype(int)
)


# ============================================================
# FEATURES AND LABEL
# ============================================================

X = df["message"]

y = df["label"]


# ============================================================
# TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.20,

    random_state=42,

    stratify=y,
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# ============================================================
# TF-IDF + LOGISTIC REGRESSION
# ============================================================

model = Pipeline([

    (
        "tfidf",

        TfidfVectorizer(

            lowercase=True,

            ngram_range=(1, 2),

            min_df=1,

            max_df=0.95,

            sublinear_tf=True,

        ),
    ),

    (
        "classifier",

        LogisticRegression(

            max_iter=1000,

            class_weight="balanced",

            random_state=42,

        ),
    ),

])


# ============================================================
# TRAIN
# ============================================================

print("\nTraining AI model...")

model.fit(
    X_train,
    y_train,
)

print("Training completed.")


# ============================================================
# PREDICTION
# ============================================================

y_pred = model.predict(
    X_test
)


# ============================================================
# PROBABILITY
# ============================================================

y_probability = model.predict_proba(
    X_test
)[:, 1]


# ============================================================
# METRICS
# ============================================================

accuracy = accuracy_score(
    y_test,
    y_pred
)

precision = precision_score(
    y_test,
    y_pred,
    zero_division=0
)

recall = recall_score(
    y_test,
    y_pred,
    zero_division=0
)

f1 = f1_score(
    y_test,
    y_pred,
    zero_division=0
)


# ============================================================
# DISPLAY RESULTS
# ============================================================

print("\n" + "=" * 60)

print("MODEL EVALUATION")

print("=" * 60)

print(
    f"Accuracy  : {accuracy:.4f}"
)

print(
    f"Precision : {precision:.4f}"
)

print(
    f"Recall    : {recall:.4f}"
)

print(
    f"F1 Score  : {f1:.4f}"
)


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred,

        target_names=[
            "NORMAL",
            "SUSPICIOUS"
        ],

        zero_division=0,
    )
)


print("Confusion Matrix:")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)


# ============================================================
# SAVE MODEL
# ============================================================

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)

joblib.dump(
    model,
    MODEL_PATH
)


print("\n" + "=" * 60)

print(
    f"Model saved to: {MODEL_PATH}"
)

print("=" * 60)