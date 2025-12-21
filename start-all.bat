@echo off
echo ========================================
echo Starting NakedPolicy - All Services
echo ========================================
echo.

echo Starting Backend in new window...
start "NakedPolicy Backend" cmd /k "cd /d %~dp0 && start-backend.bat"

echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo Starting Frontend in new window...
start "NakedPolicy Frontend" cmd /k "cd /d %~dp0 && start-frontend.bat"

echo.
echo ========================================
echo Both services starting in separate windows!
echo.
echo Backend will be on: http://localhost:5000
echo Frontend will be on: http://localhost:5173
echo.
echo Open your browser to: http://localhost:5173
echo ========================================
echo.
echo Press any key to open browser...
pause > nul

start http://localhost:5173

exit
