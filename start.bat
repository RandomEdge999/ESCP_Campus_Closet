@echo off
title CampusCloset - Starting...
color 0A

echo.
echo  ====================================
echo    CampusCloset - Student Marketplace
echo  ====================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js is not installed!
    echo.
    echo  Please download and install Node.js from:
    echo  https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo  [OK] Node.js found
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo  [INFO] Installing dependencies...
    echo  This may take a minute on first run...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo  [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
    echo  [OK] Dependencies installed!
    echo.
) else (
    echo  [OK] Dependencies already installed
    echo.
)

echo  ====================================
echo    Starting the development server...
echo  ====================================
echo.
echo  Once started, open your browser to:
echo.
echo     http://localhost:5173
echo.
echo  Press Ctrl+C to stop the server.
echo  ====================================
echo.

:: Start the dev server
call npm run dev

