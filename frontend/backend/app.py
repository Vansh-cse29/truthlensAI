from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.fake_news import analyze_fake_news
from services.security import analyze_website_url, analyze_phishing_text

app = FastAPI(
    title="TruthLens AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsRequest(BaseModel):
    text: str

class UrlRequest(BaseModel):
    url: str

class PhishingRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "TruthLens AI Backend Running 🚀"}

@app.post("/analyze-news")
def analyze_news(request: NewsRequest):
    return {"success": True, "result": analyze_fake_news(request.text)}

@app.post("/check-website")
def check_website(request: UrlRequest):
    return {"success": True, "result": analyze_website_url(request.url)}

@app.post("/check-phishing")
def check_phishing(request: PhishingRequest):
    return {"success": True, "result": analyze_phishing_text(request.text)}