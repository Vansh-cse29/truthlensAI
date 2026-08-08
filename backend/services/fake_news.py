import os
import json
import requests
from transformers import pipeline

try:
    local_classifier = pipeline(
        "text-classification",
        model="distilbert-base-uncased-finetuned-sst-2-english"
    )
except Exception:
    local_classifier = None


def analyze_news_hybrid(
    text: str,
    use_cloud: bool = False,
    openai_api_key: str = None
) -> dict:

    api_key = openai_api_key or os.getenv("OPENAI_API_KEY")

    # ----------------------------
    # Cloud AI (Optional)
    # ----------------------------
    if use_cloud and api_key:
        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {
                            "role": "system",
                            "content": (
                                "You are a fake news detector. "
                                "Reply ONLY in JSON with keys: "
                                "verdict, confidence, reason."
                            ),
                        },
                        {
                            "role": "user",
                            "content": text,
                        },
                    ],
                    "response_format": {
                        "type": "json_object"
                    },
                },
                timeout=10,
            )

            if response.status_code == 200:
                result = json.loads(
                    response.json()["choices"][0]["message"]["content"]
                )

                result["engine"] = "Cloud AI (GPT-4o)"
                return result

        except Exception as e:
            print("Cloud AI failed:", e)

    # ----------------------------
    # Offline Model
    # ----------------------------
    if local_classifier:

        prediction = local_classifier(text)[0]

        score = round(prediction["score"] * 100, 2)

        if prediction["label"] == "POSITIVE":
            verdict = "REAL NEWS"
        else:
            verdict = "FAKE NEWS"

        return {
            "verdict": verdict,
            "confidence": f"{score}%",
            "reason": "Prediction generated using the local AI model.",
            "engine": "Local DistilBERT",
        }

    # ----------------------------
    # No model available
    # ----------------------------
    return {
        "verdict": "UNKNOWN",
        "confidence": "0%",
        "reason": "No AI model is available.",
        "engine": "None",
    }