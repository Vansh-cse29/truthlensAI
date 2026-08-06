from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.fake_news import analyze_fake_news

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

@app.get("/")
def home():
    return {"message": "TruthLens AI Backend Running 🚀"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze-news")
def analyze_news(request: NewsRequest):
    result = analyze_fake_news(request.text)
    return {
        "success": True,
        "result": result
    }
