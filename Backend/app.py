import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for Chrome Extension

# Configure Perplexity API (OpenAI-compatible)
api_key = os.environ.get("PERPLEXITY_API_KEY")
if not api_key:
    # Fallback - user should set their Perplexity API key
    api_key = "#############################"
    print("WARNING: PERPLEXITY_API_KEY environment variable not set. Using placeholder.")

# Initialize OpenAI client with Perplexity base URL
client = OpenAI(
    api_key=api_key,
    base_url="https://api.perplexity.ai"
)


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
    """Generate summary using Perplexity API"""
    try:
        print(f"Generating summary with Perplexity...")
        
        # Use Perplexity's sonar model via OpenAI-compatible API
        response = client.chat.completions.create(
            model='sonar',  # Perplexity's sonar model
            messages=[
                {"role": "system", "content": SYSTEM_INSTRUCTION},
                {"role": "user", "content": text_content}
            ],
            temperature=0.3,
            max_tokens=8192,
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        error_msg = str(e)
        print(f"Error generating content: {e}")
        
        # Check if it's a quota error
        if "429" in error_msg or "rate" in error_msg.lower():
            print("⚠️ API quota exceeded. Please wait or try again later.")
            return """# API Quota Exceeded

Unfortunately, the Perplexity API quota has been exceeded. 

## What this means:
- The API has rate limits
- You need to wait before trying again
- Or upgrade to a higher tier plan

## Temporary Summary:
🚫 **Unable to generate AI summary due to API limits**

Please try again in a few minutes, or check your API usage at:
https://www.perplexity.ai/settings/api

For now, you can:
- Wait a minute and try again
- Use a different API key
- Upgrade your Perplexity API plan
"""
        
        # Try with a simpler request as fallback
        try:
            print("Trying fallback with shorter content...")
            response = client.chat.completions.create(
                model='sonar',
                messages=[
                    {"role": "system", "content": SYSTEM_INSTRUCTION},
                    {"role": "user", "content": text_content[:10000]}  # Limit text size
                ],
                temperature=0.3,
                max_tokens=2000,
            )
            return response.choices[0].message.content
        except Exception as e2:
            print(f"Fallback also failed: {e2}")
            # Return a helpful error message instead of crashing
            return """# Summary Generation Failed

Unable to generate AI summary at this time.

**Possible reasons:**
- API quota exceeded (wait a few minutes)
- Model unavailable
- Network issues
- Invalid API key

**What you can do:**
1. Wait a minute and try again
2. Check your API key and quota
3. Try uploading a smaller policy file

Visit: https://www.perplexity.ai/settings/api to check your API usage
"""


def generate_short_summary(text_content):
    """Generate 50-word summary for extension"""
    try:
        print("Generating 50-word summary...")
        
        short_prompt = f"""Summarize this privacy policy in EXACTLY 50 words or less. 
Focus on the most critical privacy concerns. Use emojis: 🚫 for critical issues, ⚠️ for concerns.

Policy text:
{text_content[:5000]}  

Provide ONLY the summary, nothing else."""

        response = client.chat.completions.create(
            model='sonar',  # Perplexity's sonar model
            messages=[
                {"role": "user", "content": short_prompt}
            ],
            temperature=0.3,
            max_tokens=200,
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        error_msg = str(e)
        print(f"Error generating short summary: {e}")
        
        # Return helpful error message
        if "429" in error_msg or "rate" in error_msg.lower():
            return "⚠️ API quota exceeded. Please wait 1 minute and try again."
        else:
            return "⚠️ Unable to generate summary. Please try again later."

# Import policy fetcher and database system
from policy_fetcher_safe import fetch_policy_for_url
from database import get_database
from config.config import Config

# Initialize database based on configuration
if Config.DB_TYPE.lower() == 'dynamodb':
    print(f"🗄️  Using DynamoDB: {Config.DYNAMODB_TABLE_NAME} ({Config.DYNAMODB_REGION})")
    db = get_database(
        'dynamodb',
        table_name=Config.DYNAMODB_TABLE_NAME,
        region_name=Config.DYNAMODB_REGION,
        aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY
    )
else:
    print(f"🗄️  Using JSON Database: {Config.JSON_DB_FILE}")
    db = get_database('json', storage_file=Config.JSON_DB_FILE)

print(f"💾 Cache enabled: {Config.CACHE_ENABLED}")


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

@app.route('/fetch-and-summarize', methods=['POST'])
def fetch_and_summarize():
    """
    Main endpoint for extension
    Checks cache first, then fetches policy from URL and generates summaries if needed
    
    Request body can include:
    - url: The URL to fetch and summarize (required)
    - force_refresh: If true, bypass cache and fetch fresh data (optional, default: false)
    """
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({"error": "No URL provided"}), 400

        url = data['url']
        force_refresh = data.get('force_refresh', False)
        
        print(f"\n📥 Request for: {url}")
        if force_refresh:
            print(f"🔄 Force refresh requested - bypassing cache")
        
        # Check cache first if enabled and not forcing refresh
        if Config.CACHE_ENABLED and not force_refresh:
            cached_summary = db.get_summary_by_url(url, expiry_days=Config.CACHE_EXPIRY_DAYS)
            
            if cached_summary:
                print(f"✨ CACHE HIT! Returning cached summary for: {url}")
                print(f"💰 Tokens saved by using cache!")
                
                return jsonify({
                    "id": cached_summary['id'],
                    "short_summary": cached_summary['short_summary'],
                    "url": cached_summary['url'],
                    "policy_types": cached_summary.get('policy_types', []),
                    "status": "success",
                    "cached": True,
                    "cached_at": cached_summary.get('created_at', 'N/A')
                })
            else:
                print(f"🔍 Cache miss - will fetch and summarize")
        
        # Not in cache or force refresh - proceed with fetching and summarizing
        print(f"🌐 Fetching policies for: {url}")
        
        # Fetch policies
        policy_data = fetch_policy_for_url(url)
        
        if not policy_data['found_types']:
            return jsonify({
                "error": "No policies found",
                "message": f"Could not find privacy policy, terms, or cookies policy for {url}"
            }), 404
        
        # Combine all found policies
        combined_text = ""
        for policy_type in policy_data['found_types']:
            combined_text += f"\n\n=== {policy_type.upper()} POLICY ===\n\n"
            combined_text += policy_data['policies'][policy_type]
        
        print(f"✅ Found {len(policy_data['found_types'])} policies")
        print(f"📝 Generating summaries...")
        
        # Generate both summaries
        short_summary = generate_short_summary(combined_text)
        full_summary = get_working_response(combined_text)
        
        # Store summaries (will update if URL already exists)
        summary_id = db.save_summary(
            url=policy_data['url'],
            short_summary=short_summary,
            full_summary=full_summary,
            policy_types=policy_data['found_types']
        )
        
        print(f"💾 Saved with ID: {summary_id}")
        
        return jsonify({
            "id": summary_id,
            "short_summary": short_summary,
            "url": policy_data['url'],
            "policy_types": policy_data['found_types'],
            "status": "success",
            "cached": False
        })

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/summary/<summary_id>', methods=['GET'])
def get_summary(summary_id):
    """
    Retrieve full summary for frontend with structured sections
    """
    try:
        summary = db.get_summary_by_id(summary_id)
        
        if not summary:
            return jsonify({"error": "Summary not found"}), 404
        
        # Parse the full_summary into structured sections
        full_text = summary.get('full_summary', '')
        sections = parse_summary_into_sections(full_text)
        
        # Add structured sections to response
        summary['sections'] = sections
        
        return jsonify(summary)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


def parse_summary_into_sections(summary_text):
    """
    Parse summary markdown into structured sections with headers and bullet points
    
    Returns:
    {
        'critical': {'header': '...', 'points': [...]},
        'concerning': {'header': '...', 'points': [...]},
        'good': {'header': '...', 'points': [...]},
        'standard': {'header': '...', 'points': [...]}
    }
    """
    sections = {
        'critical': {'header': '', 'points': []},
        'concerning': {'header': '', 'points': []},
        'good': {'header': '', 'points': []},
        'standard': {'header': '', 'points': []}
    }
    
    lines = summary_text.split('\n')
    current_section = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check if it's a section header
        if line.startswith('##'):
            clean_line = line.replace('#', '').strip()
            
            if '🚫' in clean_line or 'CRITICAL' in clean_line.upper():
                sections['critical']['header'] = clean_line
                current_section = 'critical'
            elif '⚠️' in clean_line or 'CONCERNING' in clean_line.upper():
                sections['concerning']['header'] = clean_line
                current_section = 'concerning'
            elif '✅' in clean_line or 'GOOD' in clean_line.upper():
                sections['good']['header'] = clean_line
                current_section = 'good'
            elif 'ℹ️' in clean_line or 'STANDARD' in clean_line.upper():
                sections['standard']['header'] = clean_line
                current_section = 'standard'
                
        # Check if it's a bullet point for the current section
        elif current_section and (line.startswith('🚫') or line.startswith('⚠️') or 
                                 line.startswith('✅') or line.startswith('ℹ️') or 
                                 line.startswith('-') or line.startswith('*')):
            # Clean up the line (remove leading emoji/markers)
            clean_point = line.lstrip('🚫⚠️✅ℹ️-* ').strip()
            if clean_point:
                sections[current_section]['points'].append(clean_point)
    
    return sections

@app.route('/recent', methods=['GET'])
def get_recent():
    """Get recent summaries"""
    try:
        limit = request.args.get('limit', 10, type=int)
        recent = db.get_recent(limit=limit)
        return jsonify({"summaries": recent})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "NakedPolicy API",
        "version": "1.0.0",
        "database": Config.DB_TYPE,
        "cache_enabled": Config.CACHE_ENABLED
    })

@app.route('/cache/stats', methods=['GET'])
def cache_stats():
    """Get cache statistics"""
    try:
        if hasattr(db, 'get_cache_stats'):
            stats = db.get_cache_stats()
            stats['cache_enabled'] = Config.CACHE_ENABLED
            stats['cache_expiry_days'] = Config.CACHE_EXPIRY_DAYS
            stats['db_type'] = Config.DB_TYPE
            return jsonify(stats)
        else:
            return jsonify({"error": "Cache stats not available for this database type"}), 501
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/cache/clear', methods=['POST'])
def cache_clear():
    """
    Clear cached summary for a specific URL
    
    Request body:
    {
        "url": "example.com"  // URL to clear from cache
    }
    """
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({"error": "No URL provided"}), 400
        
        url = data['url']
        print(f"🗑️  Clearing cache for: {url}")
        
        # Delete the cached summary
        success = db.delete_summary_by_url(url)
        
        if success:
            print(f"✅ Cache cleared for: {url}")
            return jsonify({
                "status": "success",
                "message": f"Cache cleared for {url}",
                "url": url
            })
        else:
            print(f"❌ No cached entry found for: {url}")
            return jsonify({
                "status": "not_found",
                "message": f"No cached entry found for {url}",
                "url": url
            }), 404
    
    except Exception as e:
        print(f"Error clearing cache: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/demo-summary', methods=['POST'])
def demo_summary():
    """
    Demo endpoint that creates a realistic summary without calling the API
    Use this to test the complete flow when API key is not working
    """
    try:
        data = request.get_json()
        url = data.get('url', 'example.com')
        
        print(f"\n🎭 Creating DEMO summary for: {url}")
        
        short_summary = f"""🚫 {url} collects extensive personal data including browsing history and location. 
⚠️ Data shared with third-party advertisers. 
⚠️ Limited user control over data deletion."""

        full_summary = f"""# Privacy Policy Analysis for {url}

## 🚫 CRITICAL ISSUES

- **Data Selling**: Your personal information may be sold to third parties if the company is acquired or merged
- **Indefinite Storage**: Data is stored indefinitely, even after account deletion
- **Broad Data Collection**: Collects extensive personal data including name, email, phone, location, browsing history, and device information

## ⚠️ CONCERNING PRACTICES

- **Third-Party Sharing**: Your data is shared with numerous third-party advertisers and marketing partners
- **Cross-Site Tracking**: Uses cookies and tracking technologies to monitor your activity across multiple websites
- **Limited Deletion Rights**: You have limited ability to request data deletion, and the process is not guaranteed
- **Vague Security Promises**: No specific commitments about data breach notifications or security measures
- **Location Tracking**: Tracks your location even when the app is not actively in use

## ✅ GOOD THINGS

- **Encryption in Transit**: Data is encrypted when transmitted between your device and their servers
- **Access Rights**: You can request a copy of your data at any time
- **Opt-Out Options**: Some limited opt-out options are available for marketing communications
- **GDPR Compliance**: Complies with basic GDPR requirements for European users

## ℹ️ STANDARD STUFF

- **Age Requirement**: Must be 13 years or older to use the service
- **Cookie Usage**: Uses cookies for login sessions and site functionality
- **Terms Updates**: May update privacy policy with notice to users
- **Contact Information**: Provides email address for privacy-related questions
- **Legal Compliance**: Complies with applicable laws and regulations

## Summary

This privacy policy shows several concerning practices, particularly around data sharing and retention. While they provide some user rights, the extensive data collection and third-party sharing make this a **MEDIUM to HIGH** risk service. Users should be aware that their data may be widely shared and stored indefinitely.

**Recommendation**: Use with caution. Consider using privacy-focused alternatives if available, or limit the personal information you provide.
"""

        # Save to database
        summary_id = db.save_summary(
            url=url,
            short_summary=short_summary,
            full_summary=full_summary,
            policy_types=['privacy', 'terms', 'cookies']
        )
        
        print(f"💾 Demo summary saved with ID: {summary_id}")
        
        return jsonify({
            'id': summary_id,
            'short_summary': short_summary,
            'url': url,
            'policy_types': ['privacy', 'terms', 'cookies'],
            'status': 'success',
            'demo': True
        })
        
    except Exception as e:
        print(f"Error creating demo: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Naked Policy Backend on port 5000...")
    print("Endpoints:")
    print("  POST /fetch-and-summarize - Fetch and analyze policy")
    print("  POST /demo-summary        - Create demo summary (no API key needed)")
    print("  GET  /summary/<id>        - Get full summary")
    print("  POST /summarize           - Analyze uploaded text")
    print("  GET  /recent              - Get recent summaries")
    print("  GET  /health              - Health check")
    print("  GET  /cache/stats         - Cache statistics")
    print("  POST /cache/clear         - Clear cache for specific URL")
    app.run(debug=True, port=5000)