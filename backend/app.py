from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.fake_news import analyze_news_hybrid

app = FastAPI()


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# REQUEST MODELS
# --------------------------------------------------

class NewsRequest(BaseModel):
    text: str
    use_cloud: bool = False


class WebsiteRequest(BaseModel):
    url: str


class PhishingRequest(BaseModel):
    text: str


# --------------------------------------------------
# BASIC ROUTES
# --------------------------------------------------

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "TruthLens AI Backend is running"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# FAKE NEWS
# --------------------------------------------------

@app.post("/analyze-news")
async def analyze_news(payload: NewsRequest):

    result = analyze_news_hybrid(
        text=payload.text,
        use_cloud=payload.use_cloud
    )

    return {
        "success": True,
        "result": result
    }


# --------------------------------------------------
# WEBSITE CHECKER
# --------------------------------------------------

@app.post("/check-website")
async def check_website(payload: WebsiteRequest):

    url = payload.url.strip()

    if not url:
        return {
            "success": False,
            "error": "Please enter a website URL."
        }

    suspicious_keywords = [
        "login",
        "verify",
        "secure",
        "account",
        "update",
        "free",
        "winner",
        "prize",
        "claim"
    ]

    lower_url = url.lower()

    detected = [
        keyword
        for keyword in suspicious_keywords
        if keyword in lower_url
    ]

    if detected:

        result = {
            "verdict": "SUSPICIOUS",
            "risk": "HIGH",
            "score": 75,
            "reason": "Suspicious keywords were detected in the URL.",
            "detected_indicators": detected
        }

    else:

        result = {
            "verdict": "LOW RISK",
            "risk": "LOW",
            "score": 15,
            "reason": "No obvious suspicious URL patterns were detected.",
            "detected_indicators": []
        }

    return {
        "success": True,
        "result": result
    }


# --------------------------------------------------
# PHISHING CHECKER
# --------------------------------------------------

@app.post("/check-phishing")
async def check_phishing(payload: PhishingRequest):

    text = payload.text.strip()

    if not text:
        return {
            "success": False,
            "error": "Please enter email or message content."
        }

    lower_text = text.lower()

    # Common phishing indicators
    indicators = {
        "urgent language": [
            "urgent",
            "immediately",
            "act now",
            "within 24 hours",
            "account will be blocked",
            "account will be suspended"
        ],
        "credential request": [
            "password",
            "username",
            "login",
            "verify your account",
            "confirm your identity"
        ],
        "financial request": [
            "bank account",
            "credit card",
            "debit card",
            "upi",
            "payment",
            "send money"
        ],
        "otp request": [
            "otp",
            "one time password",
            "verification code"
        ],
        "suspicious links": [
            "http://",
            "https://",
            "bit.ly",
            "tinyurl",
            ".tk",
            ".xyz"
        ],
        "reward/scam language": [
            "you won",
            "congratulations",
            "prize",
            "lottery",
            "claim your reward",
            "free gift"
        ]
    }

    detected_indicators = []

    for category, keywords in indicators.items():

        for keyword in keywords:

            if keyword in lower_text:
                detected_indicators.append({
                    "category": category,
                    "keyword": keyword
                })

    # Calculate risk
    indicator_count = len(detected_indicators)

    if indicator_count >= 5:

        verdict = "PHISHING DETECTED"
        confidence = min(98, 70 + indicator_count * 4)
        risk = "CRITICAL"

        reason = (
            "Multiple phishing indicators were detected, including "
            "credential requests, urgency, financial requests, "
            "or suspicious links."
        )

    elif indicator_count >= 3:

        verdict = "SUSPICIOUS"
        confidence = min(90, 60 + indicator_count * 5)
        risk = "HIGH"

        reason = (
            "Several characteristics commonly associated with "
            "phishing messages were detected."
        )

    elif indicator_count >= 1:

        verdict = "POSSIBLY SUSPICIOUS"
        confidence = 60
        risk = "MEDIUM"

        reason = (
            "Some suspicious characteristics were detected. "
            "Verify the sender before responding."
        )

    else:

        verdict = "CLEAN"
        confidence = 85
        risk = "LOW"

        reason = (
            "No obvious phishing indicators were detected "
            "in the provided content."
        )

    return {
        "success": True,
        "result": {
            "verdict": verdict,
            "confidence": f"{confidence}%",
            "risk": risk,
            "reason": reason,
            "detected_indicators": detected_indicators
        }
    }