from transformers import pipeline
from fastapi import HTTPException

# Model loads into memory once when the backend starts
try:
    classifier = pipeline(
        "text-classification", 
        model="therealcyberlord/fake-news-classification-distilbert"
    )
except Exception as e:
    classifier = None

def analyze_fake_news(news_text: str):
    if classifier is None:
        raise HTTPException(
            status_code=500, 
            detail="Local ML classification model failed to initialize."
        )
    
    if not news_text or len(news_text.strip()) == 0:
        raise HTTPException(status_code=400, detail="News text cannot be empty.")

    try:
        # Truncate text to fit model max sequence length (512 tokens)
        results = classifier(news_text[:512])
        result = results[0]
        
        raw_label = str(result['label']).upper()
        confidence = round(result['score'] * 100, 2)
        
        # 1 or LABEL_1 = REAL, 0 or LABEL_0 = FAKE
        is_real = raw_label in ["1", "LABEL_1", "REAL"]
        verdict = "REAL NEWS" if is_real else "FAKE NEWS"
        
        return {
            "verdict": verdict,
            "confidence": f"{confidence}%",
            "reason": f"Analyzed using fine-tuned DistilBERT text classifier. Model computed a {confidence}% probability match."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference Error: {str(e)}")