# 🔍 NakedPolicy

> **AI-Powered Privacy Policy Analyzer** - Understand complex legal documents in plain English

[![Status](https://img.shields.io/badge/status-active-success)](https://github.com)
[![Python](https://img.shields.io/badge/python-3.8+-blue)](https://python.org)
[![React](https://img.shields.io/badge/react-18.2-blue)](https://reactjs.org)

---

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses Google Gemini to generate summaries
- 📊 **Risk Assessment** - Categorizes policies as Low, Medium, or High risk
- 🎯 **Dual Summaries** - 50-word quick view + 1000-word detailed analysis
- 🌐 **Web Application** - React interface for uploading and analyzing policies
- 🔌 **Chrome Extension** - Quick analysis directly from your browser
- 📥 **Auto-Fetch** - Automatically extract policies from any website

---

## 🚀 Quick Start

### 1. Start Backend
```bash
start-backend.bat
```

### 2. Start Frontend
```bash
start-frontend.bat
```

### 3. Use the App
- **Web:** Visit `http://localhost:5173`
- **Extension:** Build with `npm run build`, load `dist/` in Chrome

---

## 📁 Project Structure

```
NakedPolicy/
├── app.py                    # Flask backend API
├── policy_fetcher_safe.py    # Policy fetching from websites
├── summary_store.py          # Summary storage system
├── requirements.txt          # Python dependencies
├── summaries_db.json         # Stored summaries database
│
├── frontend/                 # React web application
│   ├── src/
│   │   └── App.jsx          # Main app with URL parameter support
│   └── package.json
│
├── src/                      # Chrome extension
│   ├── App.tsx              # Extension popup
│   └── components/
│
├── public/
│   └── manifest.json        # Extension manifest
│
├── start-backend.bat        # Easy backend startup
└── start-frontend.bat       # Easy frontend startup
```

---

## 🔧 Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Chrome browser (for extension)

### Installation

1. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd NakedPolicy
   ```

2. **Backend setup**
   ```bash
   pip install -r requirements.txt
   playwright install chromium
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Extension setup**
   ```bash
   npm install
   npm run build
   ```

---

## 📖 Usage

### Web Application

1. Start backend: `start-backend.bat`
2. Start frontend: `start-frontend.bat`
3. Open `http://localhost:5173`
4. Upload a `.txt` policy file
5. View AI-generated summary

### Chrome Extension

1. Build: `npm run build`
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" → Select `dist/` folder
5. Visit any website → Click extension icon
6. Click "Analyze Privacy Policy"

### API Endpoints

```bash
# Create demo summary (no API key needed)
POST /demo-summary
{
  "url": "github.com"
}

# Fetch and analyze (requires API key)
POST /fetch-and-summarize
{
  "url": "github.com"
}

# Get full summary
GET /summary/<id>

# Health check
GET /health
```

---

## 🎯 How It Works

```
User Action (Extension/Web)
    ↓
Backend fetches policy
    ↓
AI generates summaries:
  - 50 words (quick view)
  - 1000 words (detailed)
    ↓
Stores with unique ID
    ↓
Extension shows 50-word summary
    ↓
"View Full" opens frontend
    ↓
Frontend displays 1000-word analysis
```

---

## 🔑 API Key Setup

1. Get API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Update `app.py` line 16:
   ```python
   api_key = "YOUR_API_KEY_HERE"
   ```

**Or** use demo mode (no API key needed):
```bash
curl -X POST http://localhost:5000/demo-summary \
  -H "Content-Type: application/json" \
  -d '{"url":"github.com"}'
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
pip install --upgrade google-genai flask flask-cors
```

### Frontend won't start
```bash
cd frontend
npm install
npm run dev
```

### Extension not working
- Verify backend is running on port 5000
- Check `chrome://extensions/` for errors
- Rebuild: `npm run build`

### API Quota Error
- Use `/demo-summary` endpoint instead
- Wait 1-2 minutes for quota reset
- Check usage: https://ai.dev/usage

---

## 🛠️ Tech Stack

**Backend:**
- Python, Flask, Flask-CORS
- Google Gemini AI
- Playwright (for web scraping)

**Frontend:**
- React 18, Vite
- TailwindCSS
- Lucide Icons

**Extension:**
- TypeScript, React
- Chrome Extension Manifest V3

---

## 📝 Example Output

**Input:** Privacy policy from github.com

**50-word Summary (Extension):**
```
🚫 GitHub collects extensive personal data including browsing history and location.
⚠️ Data shared with third-party advertisers.
⚠️ Limited user control over data deletion.
```

**1000-word Summary (Frontend):**
- 🚫 **CRITICAL ISSUES** - Data selling, indefinite storage
- ⚠️ **CONCERNING PRACTICES** - Third-party sharing, tracking
- ✅ **GOOD THINGS** - Encryption, access rights
- ℹ️ **STANDARD STUFF** - Age requirements, cookies

---

## 🤝 Contributing

This is a portfolio project. Feel free to fork and modify!

---

## 📄 License

MIT License - Educational purposes

---

## 👨‍💻 Contributors

- Karan Tomar (Team Leader)
- Swinal Waghmare (Member)
- Harshal Pantawane (Member)
- Anirudh Trivedi (Member)

---

**Made with ❤️ and AI**
