# 🔍 NakedPolicy

> **AI-Powered Privacy Policy Analyzer** - Understand complex legal documents in plain English

NakedPolicy uses advanced AI to transform lengthy privacy policies and terms of service into clear, categorized summaries. Available as both a web application and Chrome extension.

![Status](https://img.shields.io/badge/status-active-success)
![Python](https://img.shields.io/badge/python-3.8+-blue)
![React](https://img.shields.io/badge/react-18.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses Google Gemini to generate 1000-word summaries
- 📊 **Risk Assessment** - Categorizes policies as Low, Medium, or High risk
- 🎯 **Categorized Summaries** - Separates Critical Issues, Concerning Practices, Good Things, and Standard Items
- 🌐 **Web Application** - Beautiful React interface for uploading and analyzing policies
- 🔌 **Chrome Extension** - Quick analysis directly from your browser
- 📥 **Auto-Fetch** - Automatically extract policies from any website

---

## 🚀 Quick Start

### 1. Start the Backend

```bash
start-backend.bat
```

### 2. Start the Frontend

```bash
start-frontend.bat
```

### 3. Open Browser

Visit `http://localhost:5173` and start analyzing policies!

---

## 📖 Full Documentation

For detailed setup instructions, troubleshooting, and usage examples, see [SETUP.md](./SETUP.md)

---

## 🛠️ Tech Stack

**Backend:**
- Python 3.8+
- Flask
- Google Gemini AI
- Playwright

**Frontend:**
- React 18
- Vite
- TailwindCSS
- Lucide Icons

**Extension:**
- TypeScript
- React
- Chrome Extension Manifest V3

---

## 📸 Screenshots

### Web Application
![Web App](https://via.placeholder.com/800x400?text=NakedPolicy+Web+App)

### Chrome Extension
![Extension](https://via.placeholder.com/400x600?text=Chrome+Extension)

---

## 🎯 Use Cases

- ✅ Quickly understand privacy policies before signing up
- ✅ Compare policies between different services
- ✅ Identify concerning data collection practices
- ✅ Know your rights as a user
- ✅ Make informed decisions about your data

---

## 📝 Example Output

**Input:** 50-page privacy policy document

**Output:**
```
🚫 CRITICAL ISSUES
- Your data can be sold if the company is acquired
- No guarantee of data deletion after account closure

⚠️ CONCERNING PRACTICES  
- Tracks your location even when app is closed
- Shares data with 100+ third-party partners

✅ GOOD THINGS
- You can request your data at any time
- Encryption used for data in transit

ℹ️ STANDARD STUFF
- Must be 13+ to use the service
- Cookies used for login sessions
```

---

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

---

## 📄 License

MIT License - feel free to use for educational purposes

---

## 👨‍💻 Author

Created as part of my portfolio to demonstrate full-stack development and AI integration skills.

---

**Made with ❤️ and AI**
---
