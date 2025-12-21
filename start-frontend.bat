@echo off
echo ========================================
echo Starting NakedPolicy Frontend Server
echo ========================================
echo.

cd /d "%~dp0Frontend\frontend"

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)

echo.
echo Starting Vite dev server on port 5173...
echo.

npm run dev

pause
