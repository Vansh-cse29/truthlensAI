import re
from urllib.parse import urlparse

def analyze_website_url(url: str) -> dict:
    """Analyzes web URL structure and security indicators."""
    parsed = urlparse(url if url.startswith(('http://', 'https://')) else f'http://{url}')
    domain = parsed.netloc or parsed.path
    
    score = 0
    reasons = []

    # Check for IP address instead of domain name
    if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", domain):
        score += 40
        reasons.append("Raw IP address used instead of a domain name.")

    # Check URL length (phishing URLs often conceal destinations with extreme length)
    if len(url) > 75:
        score += 20
        reasons.append("Suspiciously long URL length.")

    # Check suspicious characters
    if "@" in url:
        score += 30
        reasons.append("Contains '@' symbol used for user-info spoofing.")

    # Check domain hyphen overuse
    if domain.count("-") > 2:
        score += 15
        reasons.append("Multiple hyphens detected in domain name.")

    # HTTPS check
    if not url.startswith("https://"):
        score += 15
        reasons.append("Site lacks SSL/TLS (HTTP only).")

    is_suspicious = score >= 30
    verdict = "SUSPICIOUS / UNSAFE" if is_suspicious else "SAFE / LEGITIMATE"
    confidence = min(99, max(60, 50 + score if is_suspicious else 90 - score))

    return {
        "verdict": verdict,
        "confidence": f"{confidence}%",
        "risk_score": score,
        "reason": " ".join(reasons) if reasons else "No suspicious URL indicators detected."
    }

def analyze_phishing_text(text: str) -> dict:
    """Scans text/email content for phishing intent indicators."""
    text_lower = text.lower()
    
    keywords = [
        "urgent", "account suspended", "verify your account", "immediate action required",
        "password reset", "unauthorized login", "click here", "gift card", "ssn", "bank details"
    ]
    
    detected = [kw for kw in keywords if kw in text_lower]
    
    if len(detected) >= 2:
        verdict = "PHISHING DETECTED"
        confidence = f"{min(98, 70 + (len(detected) * 10))}%"
        reason = f"Flags triggered by urgency or credential request patterns: {', '.join(detected)}."
    elif len(detected) == 1:
        verdict = "POSSIBLE PHISHING"
        confidence = "72%"
        reason = f"Contains urgent key phrase: '{detected[0]}'. Exercise caution."
    else:
        verdict = "CLEAN / SAFE"
        confidence = "94%"
        reason = "No high-risk urgency phrases or credential requests detected."

    return {
        "verdict": verdict,
        "confidence": confidence,
        "reason": reason
    }