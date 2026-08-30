# AI Hidden-Signal Communication

<p align="center">
  <img src="docs/images/project-banner.png" alt="AI Hidden-Signal Communication" width="900">
</p>

<h3 align="center">
AI-Powered Communication Intelligence & Suspicious Pattern Detection
</h3>

<p align="center">
  <b>Secure. Intelligent. Explainable.</b>
</p>

<p align="center">

![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.141-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Scikit Learn](https://img.shields.io/badge/ML-Scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![OpenCV](https://img.shields.io/badge/CV-OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)

</p>

---

## Overview

**AI Hidden-Signal Communication** is an AI-powered communication intelligence platform designed to analyze text-based communication and identify potentially suspicious or unusual patterns.

The system combines machine learning, statistical analysis, entropy-based feature extraction, hidden-signal analysis, and multi-factor authentication to provide a controlled environment for authorized users.

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

## Why This Project?

Traditional rule-based systems often depend on predefined keywords or patterns.

Suspicious communication, however, may not always contain obvious keywords. It can exhibit unusual statistical, structural, or encoding characteristics.

This project explores an AI-driven approach that analyzes multiple characteristics of communication and combines them to identify potentially suspicious messages.

```text
Traditional Approach
        |
        v
Keyword / Rule Matching
        |
        v
Limited Detection

             vs.

AI-Based Approach
        |
        v
Feature Extraction
        |
        +---- Entropy
        +---- Structure
        +---- Character Patterns
        +---- Statistical Features
        +---- ML Prediction
        |
        v
Combined Analysis
        |
        v
Risk Assessment

#System Architecture

                         ┌─────────────────────┐
                         │        USER         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     LOGIN PAGE      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Password Validation │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Face Verification  │
                         └──────────┬──────────┘
                                    │
                              AUTHORIZED
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │       REACT DASHBOARD        │
                    └──────────────┬───────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │  Detection  │      │  Analytics  │      │  Settings   │
       └──────┬──────┘      └─────────────┘      └─────────────┘
              │
              ▼
       ┌─────────────────────────────────────┐
       │             FASTAPI                 │
       │              BACKEND                │
       └──────────────────┬──────────────────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
      ┌────────────┐ ┌──────────┐ ┌──────────────┐
      │  Feature   │ │ ML Model │ │ Hidden Signal│
      │ Extraction │ │          │ │   Analysis   │
      └─────┬──────┘ └────┬─────┘ └──────┬───────┘
            │             │              │
            └─────────────┼──────────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Combined AI Score│
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Detection Result │
                 ├──────────────────┤
                 │ Classification   │
                 │ Probability      │
                 │ Risk Level       │
                 │ Indicators       │
                 └──────────────────┘

User Interface
Secure Login

The application starts with a protected authentication interface.

<p align="center"> <img src="docs/images/login-page.png" alt="Secure Login" width="850"> </p>

The authentication layer is designed to prevent unauthorized access to the communication-analysis dashboard.

Face Verification

A second authentication layer verifies the authorized user's face.

<p align="center"> <img src="docs/images/face-verification.png" alt="Face Verification" width="850"> </p>

The system captures a camera frame and compares it with the enrolled authorized face.

Main Dashboard

The dashboard provides a centralized view of the communication-analysis system.

<p align="center"> <img src="docs/images/dashboard.png" alt="Main Dashboard" width="900"> </p>

The dashboard provides access to:

Message analysis
Detection results
Suspicious probability
Risk assessment
Detection history
Analytics
System status
Detection Result
<p align="center"> <img src="docs/images/detection-result.png" alt="Detection Result" width="900"> </p>

The result interface presents the AI analysis in an easy-to-understand format.

Detection History
<p align="center"> <img src="docs/images/detection-history.png" alt="Detection History" width="900"> </p>

The history module allows authorized users to review previously analyzed communication.

Analytics
<p align="center"> <img src="docs/images/analytics.png" alt="Analytics Dashboard" width="900"> </p>

The analytics section provides an overview of system activity and detection statistics.

Settings
<p align="center"> <img src="docs/images/settings.png" alt="Settings" width="900"> </p>

The settings module provides a centralized interface for system configuration and future administrative controls.

Authentication

The system implements a multi-factor authentication workflow.

                    LOGIN
                      │
                      ▼
              Username + Password
                      │
                      ▼
              Credential Validation
                      │
                      ▼
               Face Verification
                      │
                 ┌────┴────┐
                 │         │
               FAIL       PASS
                 │         │
                 ▼         ▼
             DENIED     DASHBOARD

Protected application routes include:

/dashboard
/analytics
/settings
Role-Based Access

The authentication architecture can support controlled roles such as:

Administrator

Designed for authorized administrative operations.

Potential capabilities:

System configuration
User management
Face enrollment
Security configuration
Detection monitoring
Supervisor

Designed for authorized monitoring and analysis.

Potential capabilities:

Communication analysis
Detection history
Analytics
Monitoring
Report review

Role permissions can be expanded as the project develops.

Project Focus
Artificial Intelligence
Machine Learning
Natural Language Processing
Anomaly Detection
Statistical Analysis
Computer Vision
Cybersecurity
Secure Authentication
Data Visualization
Web Application Development
Author

Developed as an academic and competition-oriented project exploring the application of artificial intelligence, machine learning, computer vision, and secure authentication to communication intelligence.
