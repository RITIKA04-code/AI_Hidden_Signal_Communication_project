import re
import math
from collections import Counter


# ============================================================
# HIDDEN SIGNAL DETECTOR
# ============================================================

class HiddenSignalDetector:

    def __init__(self):

        self.suspicious_keywords = [
            "urgent",
            "classified",
            "secret",
            "unknown",
            "code",
            "signal",
            "encrypted",
            "activate",
            "mission",
            "checkpoint",
            "coordinates",
        ]


    # ========================================================
    # BASIC TEXT FEATURES
    # ========================================================

    def text_features(self, text):

        words = re.findall(
            r"\b[\w'-]+\b",
            text.lower()
        )

        characters = len(text)

        word_count = len(words)

        unique_words = len(set(words))

        uppercase_count = sum(
            1 for char in text
            if char.isupper()
        )

        digit_count = sum(
            1 for char in text
            if char.isdigit()
        )

        special_count = sum(
            1
            for char in text
            if not char.isalnum()
            and not char.isspace()
        )


        return {

            "characters": characters,

            "word_count": word_count,

            "unique_words": unique_words,

            "uppercase_count":
                uppercase_count,

            "digit_count":
                digit_count,

            "special_count":
                special_count,

        }


    # ========================================================
    # ENTROPY
    # ========================================================

    def calculate_entropy(self, text):

        if not text:

            return 0.0


        counts = Counter(text)

        length = len(text)


        entropy = 0.0


        for count in counts.values():

            probability = count / length

            entropy -= (
                probability *
                math.log2(probability)
            )


        return round(
            entropy,
            3
        )


    # ========================================================
    # KEYWORD ANALYSIS
    # ========================================================

    def keyword_analysis(self, text):

        lower_text = text.lower()


        found = []


        for keyword in self.suspicious_keywords:

            if keyword in lower_text:

                found.append(
                    keyword
                )


        return found


    # ========================================================
    # REPETITION ANALYSIS
    # ========================================================

    def repetition_score(self, text):

        words = re.findall(
            r"\b[\w'-]+\b",
            text.lower()
        )


        if len(words) < 4:

            return 0.0


        counts = Counter(words)


        repeated_words = sum(
            1
            for count in counts.values()
            if count > 1
        )


        score = (
            repeated_words /
            len(set(words))
        )


        return min(
            round(score, 3),
            1.0
        )


    # ========================================================
    # STRUCTURE ANALYSIS
    # ========================================================

    def structure_analysis(self, text):

        features = self.text_features(
            text
        )


        if features["characters"] == 0:

            return 0.0


        digit_ratio = (
            features["digit_count"] /
            features["characters"]
        )


        uppercase_ratio = (
            features["uppercase_count"] /
            features["characters"]
        )


        special_ratio = (
            features["special_count"] /
            features["characters"]
        )


        score = (

            digit_ratio * 0.35 +

            uppercase_ratio * 0.25 +

            special_ratio * 0.40

        )


        return round(
            min(score * 5, 1.0),
            3
        )


    # ========================================================
    # COMBINED ANALYSIS
    # ========================================================

    def analyze(self, text):

        if not isinstance(
            text,
            str
        ):

            text = str(text)


        text = text.strip()


        if not text:

            return {

                "detected": False,

                "confidence": 1.0,

                "suspicious_probability": 0.0,

                "risk_level": "LOW",

                "indicators": [],

            }


        features = self.text_features(
            text
        )


        entropy = self.calculate_entropy(
            text
        )


        keywords = self.keyword_analysis(
            text
        )


        repetition = self.repetition_score(
            text
        )


        structure = self.structure_analysis(
            text
        )


        # ----------------------------------------------------
        # NORMALIZED ENTROPY SIGNAL
        # ----------------------------------------------------

        entropy_signal = 0.0


        if entropy >= 4.5:

            entropy_signal = 0.7

        elif entropy >= 3.8:

            entropy_signal = 0.35


        # ----------------------------------------------------
        # KEYWORD SIGNAL
        # ----------------------------------------------------

        keyword_signal = min(
            len(keywords) * 0.12,
            0.6
        )


        # ----------------------------------------------------
        # STRUCTURE SIGNAL
        # ----------------------------------------------------

        structure_signal = structure


        # ----------------------------------------------------
        # REPETITION SIGNAL
        # ----------------------------------------------------

        repetition_signal = repetition


        # ----------------------------------------------------
        # COMBINED SCORE
        # ----------------------------------------------------

        suspicious_probability = (

            entropy_signal * 0.25 +

            keyword_signal * 0.25 +

            structure_signal * 0.30 +

            repetition_signal * 0.20

        )


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


        # ----------------------------------------------------
        # RISK LEVEL
        # ----------------------------------------------------

        if suspicious_probability >= 0.80:

            risk_level = "CRITICAL"

        elif suspicious_probability >= 0.60:

            risk_level = "HIGH"

        elif suspicious_probability >= 0.35:

            risk_level = "MEDIUM"

        else:

            risk_level = "LOW"


        detected = (
            suspicious_probability >= 0.35
        )


        confidence = max(
            suspicious_probability,
            1 - suspicious_probability
        )


        confidence = round(
            confidence,
            3
        )


        # ----------------------------------------------------
        # EXPLAINABILITY
        # ----------------------------------------------------

        indicators = []


        if keywords:

            indicators.append(
                "Suspicious contextual keywords detected"
            )


        if entropy >= 4.5:

            indicators.append(
                "Unusually high character entropy"
            )

        elif entropy >= 3.8:

            indicators.append(
                "Elevated character entropy"
            )


        if structure >= 0.30:

            indicators.append(
                "Unusual character structure"
            )


        if repetition >= 0.25:

            indicators.append(
                "Abnormal word repetition"
            )


        if not indicators:

            indicators.append(
                "No significant suspicious indicators detected"
            )


        return {

            "detected":
                detected,

            "confidence":
                confidence,

            "suspicious_probability":
                suspicious_probability,

            "risk_level":
                risk_level,

            "indicators":
                indicators,

            "features": {

                "entropy":
                    entropy,

                "keyword_matches":
                    keywords,

                "repetition_score":
                    repetition,

                "structure_score":
                    structure,

                "character_count":
                    features["characters"],

                "word_count":
                    features["word_count"],

            },

        }