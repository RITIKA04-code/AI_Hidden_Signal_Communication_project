# AI Hidden-Signal Communication

<p align="center">

<img src="docs/images/project-banner.png" alt="AI Hidden-Signal Communication" width="900">

</p>

<p align="center">
<b>AI-powered communication intelligence and suspicious-pattern detection platform</b>
</p>

<p align="center">

![Python](https://img.shields.io/badge/Python-3.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Scikit--learn-orange)
![Computer Vision](https://img.shields.io/badge/Computer%20Vision-OpenCV-red)
![Authentication](https://img.shields.io/badge/Authentication-MFA-purple)

</p>

---

## Overview

AI Hidden-Signal Communication is an AI-powered communication intelligence platform designed to analyze text messages and identify suspicious or unusual communication patterns.

The system combines machine learning, statistical feature analysis, entropy-based analysis, hidden-signal indicators, and multi-factor authentication to provide a secure environment for authorized users.

The platform provides a web-based dashboard where authorized personnel can analyze communication, review detection results, monitor statistics, and inspect historical detections.

---

## Problem Statement

Conventional communication monitoring systems may rely heavily on manually defined rules or keyword matching.

However, suspicious communication can also exhibit statistical and structural characteristics that are difficult to identify through simple keyword searches.

This project explores an AI-based approach that analyzes communication characteristics such as:

- Character entropy
- Message length
- Word frequency
- Digit distribution
- Special characters
- Uppercase and lowercase distribution
- Repetition patterns
- Structural characteristics
- Encoded-pattern indicators
- Signal markers

The system combines these characteristics with machine-learning predictions to produce an overall suspicious probability.

---

## Proposed Solution

The proposed system provides an integrated platform consisting of:

1. Secure authentication
2. Password verification
3. Face verification
4. AI-based message analysis
5. Hidden-signal feature extraction
6. Machine-learning classification
7. Suspicious probability estimation
8. Risk-level assessment
9. Detection history
10. Analytics dashboard

The architecture is designed to provide an additional layer of intelligence for authorized communication-analysis environments.

---

# System Architecture

```text
                         USER
                           |
                           v
                 +-------------------+
                 |    Login Page     |
                 +---------+---------+
                           |
                           v
              +------------------------+
              | Username + Password    |
              +-----------+------------+
                          |
                          v
              +------------------------+
              | Face Verification      |
              +-----------+------------+
                          |
                    Authentication
                          |
                          v
              +------------------------+
              |    React Dashboard     |
              +-----------+------------+
                          |
             +------------+-------------+
             |            |             |
             v            v             v
       Message       Detection      Analytics
       Analysis       History
             |            |             |
             +------------+-------------+
                          |
                          v
              +------------------------+
              |      FastAPI API       |
              +-----------+------------+
                          |
          +---------------+----------------+
          |               |                |
          v               v                v
 +----------------+ +------------+ +----------------+
 | Feature        | | ML Model   | | Hidden Signal  |
 | Extraction     | | Prediction | | Analysis       |
 +-------+--------+ +-----+------+ +-------+--------+
         |                |                |
         +----------------+----------------+
                          |
                          v
               +-----------------------+
               | Combined AI Analysis  |
               +-----------+-----------+
                           |
                           v
               +-----------------------+
               | Detection Result      |
               | Classification        |
               | Probability           |
               | Risk Level             |
               | Indicators             |
               +-----------------------+
