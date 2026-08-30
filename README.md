# AI Hidden-Signal Communication

AI-powered communication intelligence and suspicious-pattern detection platform designed to analyze text communication using machine learning, statistical analysis, hidden-signal analysis, and secure multi-factor authentication.

---

## Overview

AI Hidden-Signal Communication is a security-focused AI platform that analyzes text-based communication and identifies potentially suspicious or unusual communication patterns.

The system combines machine learning, statistical feature analysis, entropy-based analysis, hidden-signal indicators, password authentication, and face verification to provide a controlled environment for authorized users.

The platform provides a centralized web dashboard for:

- Communication analysis
- Suspicious-pattern detection
- AI probability scoring
- Risk assessment
- Detection history
- Analytics
- Secure authentication
- Face verification

---

## Objectives

The primary objectives of the project are:

1. Detect potentially suspicious communication using AI and machine learning.
2. Identify unusual statistical and structural patterns in messages.
3. Extract meaningful features from communication.
4. Generate suspicious probability and confidence scores.
5. Classify communication as normal or suspicious.
6. Assign an appropriate risk level.
7. Restrict system access to authorized users.
8. Provide an additional face-verification authentication layer.
9. Maintain detection history for authorized review.
10. Provide an interactive analytics dashboard.

---

## Problem Statement

Traditional communication monitoring systems often depend on predefined rules, keywords, or manually configured patterns.

Suspicious communication may not always contain obvious keywords. It can also demonstrate unusual characteristics in its structure, character distribution, entropy, repetition, or numerical patterns.

This project explores an AI-based approach that analyzes multiple communication characteristics and combines machine-learning predictions with statistical and hidden-signal analysis.

---

## Proposed Solution

The proposed system consists of several integrated components:

- Secure authentication
- Password verification
- Face verification
- Feature extraction
- Machine-learning classification
- Entropy analysis
- Hidden-signal analysis
- Suspicious probability calculation
- Risk assessment
- Detection history
- Analytics dashboard

The system is designed as an AI-assisted detection platform for authorized and controlled environments.

---

## Core Features

### 1. AI-Based Communication Detection

The system classifies messages into:

- `NORMAL COMMUNICATION`
- `SUSPICIOUS COMMUNICATION`

It also generates a suspicious probability and confidence score.

### 2. Feature Extraction

The system extracts multiple characteristics from a message, including:

- Message length
- Word count
- Digit count
- Special character count
- Uppercase count
- Lowercase count
- Space count
- Character entropy
- Digit ratio
- Special-character ratio
- Uppercase ratio
- Encoded-pattern indicators
- Signal markers

### 3. Hidden-Signal Analysis

The hidden-signal analysis engine examines additional characteristics such as:

- Entropy
- Keyword indicators
- Repetition score
- Structure score
- Character count
- Word count

### 4. Machine-Learning Prediction

The extracted features are passed to a trained machine-learning model to classify communication.

The model produces:

- Prediction
- Classification
- Suspicious probability

### 5. Combined AI Analysis

The outputs from different detection components are combined to produce an overall suspicious probability.

### 6. Risk Assessment

The system provides risk classifications such as:

- `LOW`
- `MEDIUM`
- `HIGH`

### 7. Multi-Factor Authentication

The platform uses multiple authentication layers:

1. Username and password authentication
2. Face verification

### 8. Face Verification

Authorized users can enroll their face and subsequently use face verification as an additional authentication factor.

### 9. Detection History

Authorized users can review previously analyzed communication and their corresponding detection results.

### 10. Analytics Dashboard

The analytics section provides an overview of system activity and detection statistics.

---

## System Architecture

```text
                         USER
                           |
                           v
                  +----------------+
                  |   Login Page   |
                  +-------+--------+
                          |
                          v
                +--------------------+
                | Username + Password|
                +---------+----------+
                          |
                          v
                +--------------------+
                | Face Verification  |
                +---------+----------+
                          |
                    AUTHENTICATED
                          |
                          v
                +--------------------+
                |  React Dashboard   |
                +---------+----------+
                          |
             +------------+------------+
             |            |            |
             v            v            v
        Detection     Analytics     Settings
             |
             v
       +----------------+
       |    FastAPI     |
       |    Backend     |
       +-------+--------+
               |
       +-------+--------+
       |       |        |
       v       v        v
   Feature    ML     Hidden-Signal
  Extraction Model     Analysis
       |       |        |
       +-------+--------+
               |
               v
       Combined AI Analysis
               |
               v
       Suspicious Probability
               |
               v
        Risk Classification
               |
               v
        Final Detection
