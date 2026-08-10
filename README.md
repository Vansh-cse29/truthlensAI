# 🔍 TruthLens AI

### AI-Powered Digital Trust & Cyber Intelligence Platform

TruthLens AI is an AI-powered digital trust platform designed to help users identify potentially misleading news, suspicious websites, and phishing threats.

The platform combines AI-based analysis with security checks to provide users with understandable risk assessments through a simple web interface.

---

## 🌐 Live Demo

**Live Project:**  
https://truthlens-ai-henna-three.vercel.app/

**GitHub Repository:**  
https://github.com/Vansh-cse29/truthlensAI

---

## 🎯 Problem Statement

The rapid spread of misinformation, malicious websites, and phishing attacks has made it difficult for users to determine whether online content can be trusted.

Traditional security tools are often complex and difficult for normal users to understand.

TruthLens AI aims to provide a unified platform where users can quickly analyze:

- 📰 News and textual content
- 🌐 Website security
- 🎣 Phishing risks
- 📊 Overall trust and risk information

---

## 💡 Solution

TruthLens AI provides a centralized digital trust platform with three major analysis modules:

### 1. 📰 Fake News Detection

Users can enter a news statement or article text.

The system analyzes the content using an AI-based classification pipeline and provides a result indicating whether the content appears potentially misleading or trustworthy.

### 2. 🌐 Website Security Checker

Users can enter a website URL.

The system performs security-oriented checks and provides a risk assessment for the website.

### 3. 🎣 Phishing Detection

Users can submit a URL for phishing-risk analysis.

The system checks the URL and presents an easy-to-understand security result.

---

## 🧠 Key Features

- AI-powered news analysis
- Website security checking
- Phishing detection
- Risk assessment
- Trust-oriented dashboard
- Modern responsive interface
- Interactive analysis cards
- User-friendly results
- Centralized security intelligence
- Publicly accessible web application

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      Vercel         │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
          Fake News       Website        Phishing
          Detection       Security       Detection
                 │             │             │
                 └─────────────┼─────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Analysis Engine   │
                    │   FastAPI Backend   │
                    └─────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ AI / Security Logic │
                    └─────────────────────┘



                    TruthLens-AI/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── services/
│   │   ├── fake_news.py
│   │   ├── website.py
│   │   └── phishing.py
│   │
│   └── utils/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
