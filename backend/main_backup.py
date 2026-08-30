from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.detector import detect_hidden_signal
from backend.feature_extractor import extract_features
from backend.statistics import (
    record_analysis,
    get_statistics,
)
from backend.history import (
    add_history_record,
    get_history,
)


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="AI Defence Intelligence as a Service",
    description=(
        "AI-powered hidden-signal communication "
        "detection and analysis platform."
    ),
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST MODEL
# ============================================================

class MessageRequest(BaseModel):
    message: str


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "system": "AI Defence Intelligence as a Service",
        "status": "online",
        "message": "AI backend is running",
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "ai_engine": "online",
        "service": "Hidden-Signal Detection",
    }


# ============================================================
# ANALYZE MESSAGE
# ============================================================

@app.post("/analyze")
def analyze_message(request: MessageRequest):

    message = request.message.strip()

    # --------------------------------------------------------
    # Validate message
    # --------------------------------------------------------

    if not message:
        return {
            "success": False,
            "error": "Message cannot be empty.",
        }

    # --------------------------------------------------------
    # AI Detection
    # --------------------------------------------------------

    detection = detect_hidden_signal(message)

    # --------------------------------------------------------
    # Feature Extraction
    # --------------------------------------------------------

    features = extract_features(message)

    # --------------------------------------------------------
    # Suspicious Probability
    # --------------------------------------------------------

    suspicious_probability = float(
        detection["suspicious_probability"]
    )

    # --------------------------------------------------------
    # Risk Classification
    # --------------------------------------------------------

    if suspicious_probability >= 0.90:

        risk_level = "CRITICAL"

    elif suspicious_probability >= 0.75:

        risk_level = "HIGH"

    elif suspicious_probability >= 0.50:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"

    # --------------------------------------------------------
    # Analyst Recommendation
    # --------------------------------------------------------

    if risk_level in ["CRITICAL", "HIGH"]:

        recommendation = (
            "Further analyst review recommended."
        )

    elif risk_level == "MEDIUM":

        recommendation = (
            "Monitor communication and perform "
            "additional analysis."
        )

    else:

        recommendation = (
            "No immediate suspicious indicators "
            "detected."
        )

    # --------------------------------------------------------
    # Save Statistics
    # --------------------------------------------------------

    record_analysis(
        detected=detection["detected"],
        risk_level=risk_level,
        confidence=detection["confidence"],
    )
    # --------------------------------------------------------
# Save Statistics
# --------------------------------------------------------

    record_analysis(
        detected=detection["detected"],
        risk_level=risk_level,
        confidence=detection["confidence"],
    )


    # --------------------------------------------------------
    # Save Detection History
    # --------------------------------------------------------

    add_history_record(
        message=message,
        classification=detection["classification"],
        detected=detection["detected"],
        confidence=detection["confidence"],
        suspicious_probability=detection[
            "suspicious_probability"
        ],
        risk_level=risk_level,
        recommendation=recommendation,
    )

    # --------------------------------------------------------
    # Response
    # --------------------------------------------------------

    return {
        "success": True,

        "analysis": {

            "classification":
                detection["classification"],

            "detected":
                detection["detected"],

            "confidence":
                detection["confidence"],

            "suspicious_probability":
                detection["suspicious_probability"],

            "risk_level":
                risk_level,

            "recommendation":
                recommendation,
        },

        "features": features,
    }


# ============================================================
# STATISTICS
# ============================================================

@app.get("/statistics")
def statistics():

    return {
        "success": True,
        "statistics": get_statistics(),
    }
@app.get("/history")
def history(limit: int = 20):

    return {
        "success": True,
        "count": len(get_history(limit)),
        "history": get_history(limit),
    }