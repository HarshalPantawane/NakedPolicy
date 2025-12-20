# NakedPolicy - Complete Setup Guide

## 🎯 Overview

NakedPolicy is an AI-powered privacy policy analyzer that helps you understand complex legal documents in plain English. It consists of:

- **Backend API** - Flask server with Gemini AI for policy summarization
- **Frontend Web App** - React application for uploading and viewing summaries
- **Chrome Extension** - Browser extension for quick policy analysis
- **Policy Fetcher** - Python script to automatically fetch policies from websites

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Python 3.8+** installed ([Download](https://www.python.org/downloads/))
- **Node.js 16+** installed ([Download](https://nodejs.org/))
- **Google Chrome** browser (for extension testing)
- **Git** (optional, for cloning)

---

## 🚀 Quick Start

### Option 1: Using Batch Scripts (Recommended for Windows)

1. **Start the Backend**
   ```bash
   start-backend.bat
   ```
   This will:
   - Create a virtual environment
   - Install Python dependencies
   - Start Flask server on `http://localhost:5000`

2. **Start the Frontend** (in a new terminal)
   ```bash
   start-frontend.bat
   ```
   This will:
   - Install Node.js dependencies
   - Start dev server on `http://localhost:5173`

3. **Open your browser** and visit `http://localhost:5173`

### Option 2: Manual Setup

#### Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers (one-time)
playwright install chromium

# Start server
python app.py
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧪 Testing the System

### 1. Test Backend API

```bash
# Make sure backend is running, then:
python test_summarize.py
```

This will:
- Check if backend is accessible
- Test summarization with existing policy files
- Save summaries to `summaries/` folder

### 2. Test Frontend Web App

1. Open `http://localhost:5173` in your browser
2. Click "Try It Now - Free"
3. Upload a `.txt` policy file from the `policies/` folder
4. View the AI-generated summary

### 3. Fetch a Real Policy

```bash
# Fetch policies from a website
python policy_fetcher_safe.py github.com
```

This creates policy files in the `policies/` directory that you can then upload to the frontend.

---

## 🔌 Chrome Extension Setup

### Build the Extension

```bash
# Install dependencies (if not already done)
npm install

# Build the extension
npm run build
```

### Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `dist/` folder from your project directory
5. The NakedPolicy extension should now appear in your extensions

### Test the Extension

1. **Make sure the backend is running** on `http://localhost:5000`
2. Click the NakedPolicy extension icon in Chrome
3. Click "Analyze Privacy Policy"
4. View the AI-generated summary in the popup

> **Note:** The extension currently uses sample policy text. To analyze real pages, you would need to add content extraction logic.

---

## 📁 Project Structure

```
NakedPolicy/
├── app.py                      # Flask backend API
├── policy_fetcher_safe.py      # Policy fetching script
├── test_summarize.py           # Testing script
├── requirements.txt            # Python dependencies
├── start-backend.bat           # Backend startup script
├── start-frontend.bat          # Frontend startup script
│
├── frontend/                   # React web application
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── src/                        # Chrome extension
│   ├── App.tsx                # Extension popup
│   ├── components/
│   └── ...
│
├── public/
│   └── manifest.json          # Extension manifest
│
├── policies/                   # Fetched policy files
└── summaries/                  # Generated summaries
```

---

## 🔧 Configuration

### API Key

The Gemini API key is currently hardcoded in `app.py`. For production:

1. Set environment variable:
   ```bash
   set GEMINI_API_KEY=your_api_key_here  # Windows
   export GEMINI_API_KEY=your_api_key_here  # Mac/Linux
   ```

2. Or update `app.py` line 15 with your key

### Backend URL

Both frontend and extension are configured to use `http://localhost:5000`. To change:

- **Frontend:** Update URL in `frontend/src/App.jsx` line 20
- **Extension:** Update URL in `src/App.tsx` line 48

---

## 🎨 Usage Examples

### Example 1: Analyze a Website's Policy

```bash
# 1. Fetch the policy
python policy_fetcher_safe.py facebook.com

# 2. Test summarization
python test_summarize.py

# 3. View in frontend
# Upload the generated file from policies/ folder
```

### Example 2: Quick Analysis via Extension

1. Visit any website (e.g., `github.com`)
2. Click the NakedPolicy extension icon
3. Click "Analyze Privacy Policy"
4. View instant summary

### Example 3: Batch Processing

```bash
# Fetch multiple policies
python policy_fetcher_safe.py google.com
python policy_fetcher_safe.py twitter.com
python policy_fetcher_safe.py amazon.com

# Summaries will be saved in summaries/ folder
```

---

## 🐛 Troubleshooting

### Backend won't start

- **Error:** `ModuleNotFoundError: No module named 'flask'`
  - **Solution:** Run `pip install -r requirements.txt`

- **Error:** `playwright._impl._api_types.Error`
  - **Solution:** Run `playwright install chromium`

### Frontend won't start

- **Error:** `Cannot find module 'react'`
  - **Solution:** Run `npm install` in the `frontend/` directory

### Extension not working

- **Error:** "Failed to fetch" or "Network error"
  - **Solution:** Make sure backend is running on `http://localhost:5000`
  - Check Chrome console (F12) for detailed errors

- **Error:** Extension not loading
  - **Solution:** Run `npm run build` to rebuild the extension
  - Reload the extension in `chrome://extensions/`

### CORS Errors

- **Error:** "CORS policy: No 'Access-Control-Allow-Origin' header"
  - **Solution:** Backend already has CORS enabled. Make sure you're using the correct URL

---

## 📊 Features

### ✅ Current Features

- ✅ AI-powered policy summarization (1000 words)
- ✅ Categorized summaries (Critical, Concerning, Good, Standard)
- ✅ Risk level assessment (Low, Medium, High)
- ✅ Web interface for file uploads
- ✅ Chrome extension popup
- ✅ Automatic policy fetching from websites
- ✅ Support for multiple policy types (Privacy, Terms, Cookies)

### 🚧 Future Enhancements

- 🔄 Real-time policy extraction from current page
- 🔄 Policy comparison between versions
- 🔄 Export summaries as PDF
- 🔄 User accounts and history
- 🔄 Browser extension for Firefox/Edge

---

## 🤝 Contributing

This is a portfolio project. Feel free to fork and modify for your own use!

---

## 📝 License

This project is for educational and portfolio purposes.

---

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Ensure all dependencies are installed
3. Verify backend is running before testing frontend/extension
4. Check browser console for detailed error messages

---

## 🎓 How It Works

1. **Policy Fetching:** `policy_fetcher_safe.py` visits websites and extracts policy text
2. **Summarization:** Flask backend sends policy text to Gemini AI
3. **Parsing:** AI returns categorized summary in plain English
4. **Display:** Frontend/Extension displays the summary with risk assessment

**Enjoy using NakedPolicy! 🎉**
