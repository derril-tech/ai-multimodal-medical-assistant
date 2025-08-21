#!/bin/bash

# AI Multimodal Medical Assistant - Development Script
# This script starts both frontend and backend development servers

set -e

echo "🚀 Starting AI Multimodal Medical Assistant Development Environment"
echo "================================================================"

# Check if required tools are installed
check_dependencies() {
    echo "📋 Checking dependencies..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm"
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python 3 is not installed. Please install Python 3.11+"
        exit 1
    fi
    
    # Check pip
    if ! command -v pip3 &> /dev/null; then
        echo "❌ pip3 is not installed. Please install pip3"
        exit 1
    fi
    
    echo "✅ All dependencies are installed"
}

# Install frontend dependencies
setup_frontend() {
    echo "📦 Setting up frontend dependencies..."
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        echo "Installing npm packages..."
        npm install
    else
        echo "Frontend dependencies already installed"
    fi
    
    cd ..
}

# Install backend dependencies
setup_backend() {
    echo "🐍 Setting up backend dependencies..."
    cd backend
    
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    echo "Activating virtual environment..."
    source venv/bin/activate
    
    echo "Installing Python packages..."
    pip install -r requirements.txt
    
    cd ..
}

# Start development servers
start_servers() {
    echo "🌐 Starting development servers..."
    
    # Start backend server
    echo "Starting backend server on http://localhost:8000"
    cd backend
    source venv/bin/activate
    uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..
    
    # Start frontend server
    echo "Starting frontend server on http://localhost:3000"
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    echo "✅ Development servers started!"
    echo ""
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo ""
    echo "Press Ctrl+C to stop all servers"
    
    # Wait for user interrupt
    trap 'cleanup' INT
    wait
}

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        echo "✅ Backend server stopped"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        echo "✅ Frontend server stopped"
    fi
    
    echo "👋 Development environment stopped"
    exit 0
}

# Main execution
main() {
    check_dependencies
    setup_frontend
    setup_backend
    start_servers
}

# Run main function
main "$@"
