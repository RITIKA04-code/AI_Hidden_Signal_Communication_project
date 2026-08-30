from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.auth.auth_routes import router as auth_router

from fastapi import FastAPI, Depends
from backend.auth.security import get_current_user
from backend.ai.hidden_signal_detector import HiddenSignalDetector
from backend.detector import detect_hidden_signal
from backend.feature_extractor import extract_features
from backend.predict import predict_message
from backend.explainability import generate_explanation

from backend.statistics import (
    record_analysis,
    get_statistics,
)

from backend.history import (
    add_history_record,
    get_history,
)


# ============================================================
# AI ENGINE
# ============================================================

hidden_signal_detector = HiddenSignalDetector()


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
app.include_router(auth_router)

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
        "ml_model": "online",
        "explainability": "online",
        "service": "Hidden-Signal Detection",
    }


# ============================================================
# ANALYZE MESSAGE
# ============================================================

@app.post("/analyze")
def analyze_message(
    request: MessageRequest,
    current_user: dict = Depends(get_current_user)
):

    # --------------------------------------------------------
    # CLEAN MESSAGE
    # --------------------------------------------------------

    message = request.message.strip()

    # --------------------------------------------------------
    # VALIDATE MESSAGE
    # --------------------------------------------------------

    if not message:
        return {
            "success": False,
            "error": "Message cannot be empty.",
        }

    # --------------------------------------------------------
    # EXISTING DETECTOR
    # --------------------------------------------------------

    detection = detect_hidden_signal(message)

    # --------------------------------------------------------
    # HIDDEN-SIGNAL ENGINE
    # --------------------------------------------------------

    hidden_result = hidden_signal_detector.analyze(
        message
    )

    # --------------------------------------------------------
    # TRAINED ML MODEL
    # --------------------------------------------------------

    ml_prediction = predict_message(
        message
    )

    # --------------------------------------------------------
    # FEATURE EXTRACTION
    # --------------------------------------------------------

    features = extract_features(
        message
    )

    # --------------------------------------------------------
    # EXISTING DETECTOR PROBABILITY
    # --------------------------------------------------------

    existing_probability = float(
        detection.get(
            "suspicious_probability",
            0.0
        )
    )

    # --------------------------------------------------------
    # ML MODEL PROBABILITY
    # --------------------------------------------------------

    ml_probability = float(
        ml_prediction.get(
            "suspicious_probability",
            0.0
        )
    )

    # --------------------------------------------------------
    # HIDDEN SIGNAL PROBABILITY
    # --------------------------------------------------------

    hidden_probability = float(
        hidden_result.get(
            "suspicious_probability",
            0.0
        )
    )

    # --------------------------------------------------------
    # AI FUSION
    #
    # Existing detector = 40%
    # ML model          = 40%
    # Hidden signal AI  = 20%
    # --------------------------------------------------------

    suspicious_probability = (

        existing_probability * 0.40

        +

        ml_probability * 0.40

        +

        hidden_probability * 0.20
    )

    # --------------------------------------------------------
    # CLAMP PROBABILITY
    # --------------------------------------------------------

    suspicious_probability = max(
        0.0,
        min(
            suspicious_probability,
            1.0
        )
    )

    suspicious_probability = round(
        suspicious_probability,
        3
    )

    # --------------------------------------------------------
    # DETECTION
    # --------------------------------------------------------

    detected = (
        suspicious_probability >= 0.35
    )

    # --------------------------------------------------------
    # CONFIDENCE
    # --------------------------------------------------------

    confidence = max(
        suspicious_probability,
        1.0 - suspicious_probability
    )

    confidence = round(
        confidence,
        3
    )

    # --------------------------------------------------------
    # CLASSIFICATION
    # --------------------------------------------------------

    if detected:

        classification = (
            "SUSPICIOUS COMMUNICATION"
        )

    else:

        classification = (
            "NORMAL COMMUNICATION"
        )

    # --------------------------------------------------------
    # RISK LEVEL
    # --------------------------------------------------------

    if suspicious_probability >= 0.80:

        risk_level = "CRITICAL"

    elif suspicious_probability >= 0.60:

        risk_level = "HIGH"

    elif suspicious_probability >= 0.35:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"

    # --------------------------------------------------------
    # RECOMMENDATION
    # --------------------------------------------------------

    if risk_level == "CRITICAL":

        recommendation = (
            "Critical indicators detected. "
            "Immediate analyst review recommended."
        )

    elif risk_level == "HIGH":

        recommendation = (
            "Multiple suspicious indicators detected. "
            "Further analyst review recommended."
        )

    elif risk_level == "MEDIUM":

        recommendation = (
            "Potential suspicious indicators detected. "
            "Monitor communication and perform "
            "additional analysis."
        )

    else:

        recommendation = (
            "No immediate suspicious indicators "
            "detected."
        )

    # --------------------------------------------------------
    # HIDDEN SIGNAL INDICATORS
    # --------------------------------------------------------

    hidden_indicators = hidden_result.get(
        "indicators",
        []
    )

    # --------------------------------------------------------
    # EXPLAINABLE AI
    # --------------------------------------------------------

    explanation = generate_explanation(

        message=message,

        ml_probability=ml_probability,

        hidden_probability=hidden_probability,

        features=features,
    )

    # --------------------------------------------------------
    # SAVE STATISTICS
    # --------------------------------------------------------

    record_analysis(

        detected=detected,

        risk_level=risk_level,

        confidence=confidence,
    )

    # --------------------------------------------------------
    # SAVE HISTORY
    # --------------------------------------------------------

    add_history_record(

        message=message,

        classification=classification,

        detected=detected,

        confidence=confidence,

        suspicious_probability=(
            suspicious_probability
        ),

        risk_level=risk_level,

        recommendation=recommendation,
    )

    # ========================================================
    # RESPONSE
    # ========================================================

    return {

        "success": True,

        # ----------------------------------------------------
        # FINAL ANALYSIS
        # ----------------------------------------------------

        "analysis": {

            "classification":
                classification,

            "detected":
                detected,

            "confidence":
                confidence,

            "suspicious_probability":
                suspicious_probability,

            "risk_level":
                risk_level,

            "recommendation":
                recommendation,

            "indicators":
                hidden_indicators,
        },

        # ----------------------------------------------------
        # EXTRACTED FEATURES
        # ----------------------------------------------------

        "features":
            features,

        # ----------------------------------------------------
        # EXPLAINABLE AI
        # ----------------------------------------------------

        "explainability":
            explanation,

        # ----------------------------------------------------
        # AI ENGINE DETAILS
        # ----------------------------------------------------

        "ai_engine": {

            # Existing detector
            "existing_detector": {

                "suspicious_probability":
                    existing_probability,
            },

            # Trained ML model
            "ml_model": {

                "prediction":
                    ml_prediction.get(
                        "prediction",
                        0
                    ),

                "classification":
                    ml_prediction.get(
                        "classification",
                        "UNKNOWN"
                    ),

                "suspicious_probability":
                    ml_probability,
            },

            # Hidden signal engine
            "hidden_signal_engine": {

                "suspicious_probability":
                    hidden_probability,

                "features":
                    hidden_result.get(
                        "features",
                        {}
                    ),

                "indicators":
                    hidden_indicators,
            },

            # Final fusion
            "combined_probability":
                suspicious_probability,
        },
    }


# ============================================================
# STATISTICS
# ============================================================

@app.get("/statistics")
def statistics(
    current_user: dict = Depends(get_current_user)
):

    return {

        "success": True,

        "statistics":
            get_statistics(),
    }


# ============================================================
# HISTORY
# ============================================================

@app.get("/history")
def history(
    limit: int = 20,
    current_user: dict = Depends(get_current_user)
):

    records = get_history(
        limit
    )

    return {

        "success": True,

        "count":
            len(records),

        "history":
            records,
    }