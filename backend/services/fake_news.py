import os
import json
import requests
from transformers import pipeline

# Lightweight fake-news model
# Fine-tuned DistilBERT model for REAL / FAKE news
MODEL_NAME = "afsanehm/fake-news-detection-llm"

print("Loading TruthLens AI fake-news model...")

try:
    local_classifier = pipeline(
        "text-classification",
        model=MODEL_NAME,
        truncation=True,
        max_length=512
    )
    print("Fake-news model loaded successfully.")

except Exception as e:
    print("Model loading failed:", e)
    local_classifier = None


def analyze_news_hybrid(
    text: str,
    use_cloud: bool = False,
    openai_api_key: str = None
) -> dict:

    if not text or not text.strip():
        return {
            "verdict": "UNKNOWN",
            "confidence": "0%",
            "reason": "Please enter some news text.",
            "engine": "None"
        }

    api_key = openai_api_key or os.getenv("OPENAI_API_KEY")

    # --------------------------------------------------
    # CLOUD AI - OPTIONAL
    # --------------------------------------------------

    if use_cloud and api_key:

        try:
            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {
                            "role": "system",
                            "content": (
                                "You are a news credibility analyzer. "
                                "Analyze the provided news text carefully. "
                                "Return ONLY valid JSON with these keys: "
                                "verdict, confidence, reason. "
                                "verdict must be either REAL NEWS or FAKE NEWS. "
                                "confidence must be a percentage string. "
                                "reason must briefly explain the decision."
                            )
                        },
                        {
                            "role": "user",
                            "content": text
                        }
                    ],
                    "response_format": {
                        "type": "json_object"
                    }
                },
                timeout=10
            )

            if response.status_code == 200:

                result = json.loads(
                    response.json()["choices"][0]["message"]["content"]
                )

                result["engine"] = "Cloud AI"

                return result

            print("Cloud AI HTTP error:", response.status_code)

        except Exception as e:
            print("Cloud AI failed:", e)

    # --------------------------------------------------
    # LOCAL AI
    # --------------------------------------------------

    if local_classifier:

        try:
            prediction = local_classifier(text)[0]

            label = prediction["label"]
            score = prediction["score"]

            # Model mapping:
            # LABEL_0 = FAKE
            # LABEL_1 = REAL

            if label == "LABEL_1":
                verdict = "REAL NEWS"
            else:
                verdict = "FAKE NEWS"

            confidence = round(score * 100, 2)

            return {
                "verdict": verdict,
                "confidence": f"{confidence}%",
                "reason": (
                    "The news content was analyzed using a "
                    "DistilBERT model fine-tuned for fake-news detection."
                ),
                "engine": "Local AI (DistilBERT)"
            }

        except Exception as e:

            print("Local model prediction failed:", e)

            return {
                "verdict": "UNKNOWN",
                "confidence": "0%",
                "reason": "The AI model could not analyze this content.",
                "engine": "Local AI"
            }

    # --------------------------------------------------
    # NO MODEL
    # --------------------------------------------------

    return {
        "verdict": "UNKNOWN",
        "confidence": "0%",
        "reason": "No AI model is available.",
        "engine": "None"
    }
