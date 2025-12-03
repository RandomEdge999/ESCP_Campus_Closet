#!/bin/bash

# Colors for pretty output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}  CampusCloset - Student Marketplace${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js is not installed!${NC}"
    echo ""
    echo "Please download and install Node.js from:"
    echo "https://nodejs.org/"
    echo ""
    exit 1
fi

echo -e "${GREEN}[OK]${NC} Node.js found ($(node -v))"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[INFO]${NC} Installing dependencies..."
    echo "This may take a minute on first run..."
    echo ""
    
    npm install
    
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}[ERROR] Failed to install dependencies!${NC}"
        exit 1
    fi
    
    echo ""
    echo -e "${GREEN}[OK]${NC} Dependencies installed!"
    echo ""
else
    echo -e "${GREEN}[OK]${NC} Dependencies already installed"
    echo ""
fi

echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}  Starting the development server...${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""
echo "Once started, open your browser to:"
echo ""
echo -e "    ${GREEN}http://localhost:5173${NC}"
echo ""
echo "Press Ctrl+C to stop the server."
echo -e "${BLUE}====================================${NC}"
echo ""

# Start the dev server
npm run dev

