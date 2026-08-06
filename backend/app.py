from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.fake_news import analyze_news_hybrid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsRequest(BaseModel):
    text: str
    use_cloud: bool = False

@app.post("/analyze-news")
async def analyze_news(payload: NewsRequest):
    result = analyze_news_hybrid(text=payload.text, use_cloud=payload.use_cloud)
    return {"success": True, "result": result}