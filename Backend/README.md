# NakedPolicy Backend

Backend API server for the NakedPolicy project - AI-powered privacy policy summarization.

## Overview

This Flask-based API provides endpoints for analyzing and summarizing privacy policies and terms of service documents using Google's Gemini AI.

## Project Structure

Backend/
├── api/                    # API routes and handlers
│   ├── __init__.py
│   └── routes.py          # Flask endpoints
├── database/              # Database abstraction layer
│   ├── __init__.py
│   ├── db_interface.py    # Database interface
│   ├── json_db.py         # JSON file storage
│   └── dynamodb_adapter.py # DynamoDB storage
├── services/              # Business logic
│   ├── __init__.py
│   ├── summarizer.py      # AI summarization service
│   └── policy_fetcher.py  # Web scraping utility
├── models/                # Data models
│   └── __init__.py
├── utils/                 # Utility functions
│   └── __init__.py
├── data/                  # Data storage (JSON mode)
│   ├── policies/         # Fetched policy documents
│   └── summaries/        # Generated summaries
├── tests/                 # Unit tests
│   ├── __init__.py
│   └── test_summarizer.py
├── config/                # Configuration
│   ├── __init__.py
│   └── config.py
├── app.py                 # Application entry point
├── summaries_db.json      # Summary database (JSON mode)
├── summary_store.py       # Legacy storage (deprecated)
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── CACHING.md            # Caching system documentation
├── setup_dynamodb.py      # DynamoDB setup script
└── migrate_to_dynamodb.py # Migration tool
```

## Setup

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

## Running the Server

### Development Mode

```bash
python app.py
```

The server will start on `http://localhost:5000`

### Using the Batch Script (Windows)

```bash
start-backend.bat
```

## API Endpoints

### POST /summarize

Summarize a policy document.

**Request:**
```json
{
  "text": "Your policy document text here..."
}
```

**Response:**
```json
{
  "summary": "# What You Need to Know\n\n## 🚫 CRITICAL ISSUES..."
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

### POST /fetch-and-summarize

Fetch and summarize a website's privacy policy (main endpoint for extension).

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response (not cached):**
```json
{
  "id": "abc-123-def",
  "short_summary": "🚫 Website collects extensive data...",
  "url": "example.com",
  "policy_types": ["privacy", "terms"],
  "status": "success",
  "cached": false
}
```

**Response (cached):**
```json
{
  "id": "abc-123-def",
  "short_summary": "🚫 Website collects extensive data...",
  "url": "example.com",
  "policy_types": ["privacy", "terms"],
  "status": "success",
  "cached": true,
  "cached_at": "2025-12-21 12:34:56"
}
```

### GET /summary/:id

Get full summary by ID (for frontend display).

**Response:**
```json
{
  "id": "abc-123-def",
  "url": "example.com",
  "short_summary": "...",
  "full_summary": "...",
  "policy_types": ["privacy"],
  "created_at": "2025-12-21 12:34:56"
}
```

### GET /recent

Get recent summaries.

**Query Parameters:**
- `limit` (optional): Number of summaries to return (default: 10)

### GET /cache/stats

Get cache statistics (useful for monitoring).

**Response:**
```json
{
  "total_summaries": 150,
  "total_urls": 145,
  "cache_enabled": true,
  "cache_expiry_days": 30,
  "db_type": "json"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "NakedPolicy API",
  "version": "1.0.0",
  "database": "json",
  "cache_enabled": true
}
```

## Configuration

Configuration is managed through `config/config.py` and environment variables:

### Basic Configuration
- `PERPLEXITY_API_KEY`: Your Perplexity API key for AI summarization
- `FLASK_ENV`: `development` or `production`
- `PORT`: Server port (default: 5000)

### Database & Caching Configuration

The backend supports **URL-based caching** to save API tokens when multiple users request the same website.

#### Database Options

**Option 1: JSON Database (Default)**
- Local file storage
- No additional setup required
- Good for development and single-server deployments

```bash
# .env
DB_TYPE=json
CACHE_ENABLED=true
```

**Option 2: DynamoDB (Recommended for Production)**
- AWS cloud storage
- Supports multiple servers
- Highly scalable
- Requires AWS account

```bash
# .env
DB_TYPE=dynamodb
DYNAMODB_TABLE_NAME=naked-policy-summaries
DYNAMODB_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
CACHE_ENABLED=true
```

#### Setting Up DynamoDB

1. **Create the table:**
   ```bash
   python setup_dynamodb.py
   ```

2. **Migrate from JSON (optional):**
   ```bash
   python migrate_to_dynamodb.py
   ```

3. **Update .env:**
   ```bash
   DB_TYPE=dynamodb
   ```

For detailed caching documentation, see [CACHING.md](CACHING.md).

### How Caching Works

1. **Without Cache**: Every request fetches and summarizes → Uses API tokens
2. **With Cache**: First request summarizes, subsequent requests use cache → **Saves 90%+ tokens!**

Example:
```
User A: google.com → Fetch + Summarize → Cache
User B: google.com → Return from cache (instant!) ✨
User C: google.com → Return from cache (instant!) ✨
```

## Testing

Run tests with pytest:

```bash
pytest tests/
```

## Policy Fetcher Tool

The `services/policy_fetcher.py` script can be used to fetch policies from websites:

```bash
python services/policy_fetcher.py https://example.com
```

Options:
- `--headful`: Open visible browser
- `--no-block`: Don't block analytics/ads
- `--screenshot-on-failure`: Save debugging screenshots

## Dependencies

- **Flask**: Web framework
- **flask-cors**: CORS support
- **google-generativeai**: Gemini AI integration
- **playwright**: Web scraping (optional)
- **beautifulsoup4**: HTML parsing (optional)
- **python-dotenv**: Environment variable management

## Development

### Adding New Routes

1. Add route handler in `api/routes.py`
2. The route will be automatically registered in `app.py`

### Adding New Services

1. Create a new file in `services/`
2. Import and use in route handlers

## License

See the main project README for license information.
