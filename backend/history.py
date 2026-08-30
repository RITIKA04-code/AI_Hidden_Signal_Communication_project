import json
from pathlib import Path
from datetime import datetime, timezone


HISTORY_FILE = Path(
    "backend/data/history.json"
)


def load_history():

    if not HISTORY_FILE.exists():
        return []

    try:

        with open(
            HISTORY_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except (json.JSONDecodeError, OSError):

        return []


def save_history(history):

    HISTORY_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with open(
        HISTORY_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            history,
            file,
            indent=4
        )


def add_history_record(
    message,
    classification,
    detected,
    confidence,
    suspicious_probability,
    risk_level,
    recommendation
):

    history = load_history()

    record = {

        "id": len(history) + 1,

        "timestamp":
            datetime.now(
                timezone.utc
            ).isoformat(),

        "message":
            message,

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
            recommendation
    }

    history.insert(
        0,
        record
    )

    # Keep latest 100 records
    history = history[:100]

    save_history(history)

    return record


def get_history(limit=20):

    history = load_history()

    return history[:limit]