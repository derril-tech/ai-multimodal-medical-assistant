@echo off
REM AI Multimodal Medical Assistant - Development Script (Windows)
REM This script starts both frontend and backend development servers

echo 🚀 Starting AI Multimodal Medical Assistant Development Environment
echo ================================================================

REM Check if required tools are installed
echo 📋 Checking dependencies...

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm
    pause
    exit /b 1
)

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.11+
    pause
    exit /b 1
)

echo ✅ All dependencies are installed

REM Setup frontend
echo 📦 Setting up frontend dependencies...
cd frontend
if not exist "node_modules" (
    echo Installing npm packages...
    npm install
) else (
    echo Frontend dependencies already installed
)
cd ..

REM Setup backend
echo 🐍 Setting up backend dependencies...
cd backend
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python packages...
pip install -r requirements.txt
cd ..

REM Start development servers
echo 🌐 Starting development servers...

REM Start backend server
echo Starting backend server on http://localhost:8000
cd backend
start "Backend Server" cmd /k "call venv\Scripts\activate.bat && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
cd ..

REM Start frontend server
echo Starting frontend server on http://localhost:3000
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo ✅ Development servers started!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop all servers...
pause >nul

echo 🛑 Stopping development servers...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1
echo ✅ Development environment stopped
echo 👋 Goodbye!
pause
