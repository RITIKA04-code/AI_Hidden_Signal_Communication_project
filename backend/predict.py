import os
import joblib


MODEL_PATH = os.path.join(
    "models",
    "hidden_signal_model.pkl"
)


# Load trained model once
model = joblib.load(MODEL_PATH)


def predict_message(message: str):

    # Prediction
    prediction = int(
        model.predict([message])[0]
    )

    # Probability of suspicious class
    probability = float(
        model.predict_proba([message])[0][1]
    )

    if prediction == 1:
        classification = "SUSPICIOUS COMMUNICATION"
    else:
        classification = "NORMAL COMMUNICATION"

    return {
        "prediction": prediction,
        "classification": classification,
        "suspicious_probability": round(
            probability,
            4
        ),
    }