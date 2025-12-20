@echo off
echo ========================================
echo   Starting NakedPolicy Backend Server
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo.

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt
echo.

REM Install Playwright browsers (only needed once)
if not exist "venv\Lib\site-packages\playwright\driver" (
    echo Installing Playwright browsers...
    playwright install chromium
    echo.
)

REM Start Flask server
echo Starting Flask server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
python app.py
