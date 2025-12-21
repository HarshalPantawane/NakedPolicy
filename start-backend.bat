@echo off
echo ========================================
echo Starting NakedPolicy Backend Server
echo ========================================
echo.

cd /d "%~dp0Backend"

echo Checking Python...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python not found!
    pause
    exit /b 1
)

echo.
echo Starting Flask server on port 5000...
echo.

python app.py

pause
