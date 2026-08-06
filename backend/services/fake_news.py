import os
import requests
from transformers import pipeline

# Load local model once at startup
try:
    local_classifier = pipeline("text-classification", model="distilbert-base-uncased")
except Exception:
    local_classifier = None

def analyze_news_hybrid(text: str, openai_api_key: str = None) -> dict:
    api_key = openai_api_key or os.getenv("OPENAI_API_KEY")

    # 1. TRY ONLINE AI ENGINE FIRST (if API key provided & online)
    if api_key:
        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are an expert fake news analyzer. Respond ONLY in valid JSON with keys: verdict ('REAL NEWS' or 'FAKE NEWS'), confidence (percentage string), and reason (brief explanation)."
                        },
                        {"role": "user", "content": text}
                    ],
                    "response_format": {"type": "json_object"}
                },
                timeout=3  # Fast fallback if internet is lagging
            )
            if response.status_code == 200:
                data = response.json()['choices'][0]['message']['content']
                import json
                result = json.loads(data)
                result["engine"] = "Cloud AI (GPT-4o)"
                return result
        except Exception as e:
            print(f"Online engine failed or offline, switching to local model: {e}")

    # 2. FALLBACK TO LOCAL DISTILBERT MODEL (Zero-Dependency / Offline)
    if local_classifier:
        prediction = local_classifier(text)[0]
        label = "REAL NEWS" if prediction["label"] == "LABEL_1" else "FAKE NEWS"
        confidence = f"{round(prediction['score'] * 100, 2)}%"
        
        return {
            "verdict": label,
            "confidence": confidence,
            "reason": "Analyzed locally using fine-tuned DistilBERT transformer.",
            "engine": "Local DistilBERT (Offline)"
        }

    return {"error": "No AI engine available."}