# 🚀 NakedPolicy - Quick Reference

## Start Everything

### Windows (Recommended)
```bash
# Terminal 1 - Backend
start-backend.bat

# Terminal 2 - Frontend  
start-frontend.bat
```

### Manual Start
```bash
# Terminal 1 - Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Endpoint:** http://localhost:5000/summarize

## Common Commands

### Fetch a Policy
```bash
python policy_fetcher_safe.py github.com
```

### Test Summarization
```bash
python test_summarize.py
```

### Build Extension
```bash
npm run build
# Then load dist/ folder in chrome://extensions/
```

## File Locations

- **Policies:** `policies/*.txt`
- **Summaries:** `summaries/*.md`
- **Extension Build:** `dist/`

## Troubleshooting

### Backend won't start
```bash
pip install -r requirements.txt
playwright install chromium
```

### Frontend won't start
```bash
cd frontend
npm install
```

### Extension errors
```bash
npm install
npm run build
```

## Quick Test

1. Start backend: `start-backend.bat`
2. Start frontend: `start-frontend.bat`
3. Open http://localhost:5173
4. Upload file from `policies/` folder
5. View summary!

---

**For detailed instructions, see [SETUP.md](./SETUP.md)**
