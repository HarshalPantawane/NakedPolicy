@echo off
echo ========================================
echo   Starting NakedPolicy Frontend
echo ========================================
echo.

cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Start development server
echo Starting frontend on http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
npm run dev
