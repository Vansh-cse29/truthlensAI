import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print(f"❌ ERROR: GEMINI_API_KEY not found at {env_path}")
else:
    print(f"🔑 Key detected: {api_key[:6]}...{api_key[-4:]}")
    try:
        client = genai.Client()
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite",
            contents="Say 'Hello, API Key is working!'"
        )
        print("✅ SUCCESS! Response:", response.text.strip())
    except Exception as e:
        print("❌ API ERROR:", e)