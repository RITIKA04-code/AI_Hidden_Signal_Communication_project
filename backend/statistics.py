import json
from pathlib import Path


STATS_FILE = Path(
    "backend/data/statistics.json"
)


def load_statistics():

    if not STATS_FILE.exists():

        return {
            "messages_scanned": 0,
            "signals_detected": 0,
            "high_risk": 0,
            "medium_risk": 0,
            "low_risk": 0,
            "critical_risk": 0,
            "total_confidence": 0.0
        }

    with open(
        STATS_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


def save_statistics(stats):

    with open(
        STATS_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            stats,
            file,
            indent=4
        )


def record_analysis(
    detected,
    risk_level,
    confidence
):

    stats = load_statistics()

    stats["messages_scanned"] += 1

    if detected:

        stats["signals_detected"] += 1

    if risk_level == "CRITICAL":

        stats["critical_risk"] += 1

    elif risk_level == "HIGH":

        stats["high_risk"] += 1

    elif risk_level == "MEDIUM":

        stats["medium_risk"] += 1

    else:

        stats["low_risk"] += 1

    stats["total_confidence"] += confidence

    save_statistics(stats)

    return stats


def get_statistics():

    stats = load_statistics()

    scanned = stats["messages_scanned"]

    if scanned > 0:

        average_confidence = (
            stats["total_confidence"]
            / scanned
        )

    else:

        average_confidence = 0.0

    return {
        "messages_scanned":
            scanned,

        "signals_detected":
            stats["signals_detected"],

        "high_risk":
            stats["high_risk"],

        "medium_risk":
            stats["medium_risk"],

        "low_risk":
            stats["low_risk"],

        "critical_risk":
            stats["critical_risk"],

        "average_confidence":
            round(
                average_confidence,
                4
            )
    }