import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app)  # Enable CORS for Chrome Extension

# Configure Gemini
# ideally, this should be an environment variable. 
# For this specific task, we'll check for the env var or use the hardcoded key provided by the user.
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    # User provided key directly in previous edit attempt
    api_key = "AIzaSyD6K1gcGuGZb0L-kiWMZzpERk4wBWCRm-M"

if not api_key:
    print("WARNING: GEMINI_API_KEY environment variable not set and no fallback key found.")

# Initialize client
client = genai.Client(api_key=api_key)

# System instruction for the AI
SYSTEM_INSTRUCTION = """You are a Privacy Rights Advocate helping everyday people understand complex legal policies.

Your task: Transform legal jargon into PLAIN ENGLISH that a 12-year-old can understand.

Analyze the Terms of Service or Privacy Policy and create a simple, scannable list of what users REALLY need to know.

Use this EXACT format:

# What You Need to Know

## 🚫 CRITICAL ISSUES (Deal Breakers)
[List the most serious privacy violations or unfair terms]
🚫 [Simple statement in plain English]
🚫 [Simple statement in plain English]

## ⚠️ CONCERNING PRACTICES (Think Twice)
[List problematic but common practices]
⚠️ [Simple statement in plain English]
⚠️ [Simple statement in plain English]
⚠️ [Simple statement in plain English]

## ✅ GOOD THINGS (Your Rights)
[List user protections and rights]
✅ [Simple statement in plain English]
✅ [Simple statement in plain English]

## ℹ️ STANDARD STUFF (Normal for Most Services)
[List typical industry practices]
ℹ️ [Simple statement in plain English]
ℹ️ [Simple statement in plain English]

---

**RULES FOR WRITING:**
1. Use SIMPLE words - pretend you're explaining to a friend over coffee
2. NO legal jargon - say "they can read your messages" not "access to user communications"
3. Be SPECIFIC - say "Facebook tracks you on other websites" not "third-party tracking occurs"
4. Be DIRECT - say "Your deleted photos aren't really deleted" not "data retention policies apply"
5. Each point is ONE clear sentence
6. Focus on what ACTUALLY affects users' privacy and rights
7. Maximum 1000 words total

**EXAMPLES OF GOOD STATEMENTS:**
- 🚫 This service can read your private messages
- 🚫 Your data is stored even if you delete your account
- ⚠️ They track which websites you visit
- ⚠️ Your location is collected through GPS
- ⚠️ They can sell your data if the company is sold
- ✅ You can delete your account anytime
- ✅ You can opt out of targeted ads
- ℹ️ You must be 13 or older to use this service
- ℹ️ They use cookies to remember your login

**EXAMPLES OF BAD STATEMENTS (too technical):**
- ❌ "The service implements third-party tracking mechanisms"
- ❌ "Data retention policies may extend beyond account termination"
- ❌ "Geolocation data is processed for service optimization"

Write like you're WARNING A FRIEND, not writing a legal document.
"""

def get_working_response(text_content):
    """Generate summary using Gemini API"""
    try:
        print(f"Generating summary with Gemini...")
        
        # Use the new API format
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=text_content,
            config=types.GenerateContentConfig(
                temperature=0.3,
                top_p=0.95,
                top_k=64,
                max_output_tokens=8192,
                system_instruction=SYSTEM_INSTRUCTION,
            )
        )
        
        return response.text
        
    except Exception as e:
        print(f"Error generating content: {e}")
        # Fallback to simpler model
        try:
            print("Trying fallback model...")
            response = client.models.generate_content(
                model='gemini-1.5-flash',
                contents=text_content,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=8192,
                    system_instruction=SYSTEM_INSTRUCTION,
                )
            )
            return response.text
        except Exception as e2:
            print(f"Fallback also failed: {e2}")
            raise e2

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400

        text_content = data['text']
        
        # Basic "File too large" check
        if len(text_content) > 1000000: # 1MB text limit for safety
             return jsonify({"error": "Text content too large (max 1MB)"}), 413

        summary_text = get_working_response(text_content)
        return jsonify({"summary": summary_text})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Naked Policy Backend on port 5000...")
    app.run(debug=True, port=5000)