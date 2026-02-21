#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Installing alias-cli...${NC}\n"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    echo -e "${YELLOW}Please install Node.js first.${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18 or higher is required.${NC}"
    echo -e "${YELLOW}Current version: $(node -v)${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Install globally
echo -e "${YELLOW}Installing @laabroms/alias-cli globally...${NC}"
npm install -g @laabroms/alias-cli

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✨ Installation complete!${NC}\n"
    echo -e "${YELLOW}Run 'alias-cli' to get started${NC}"
    echo -e "${YELLOW}For auto-reload setup, see: https://github.com/laabroms/alias-cli#auto-reload-optional${NC}\n"
else
    echo -e "\n${RED}❌ Installation failed${NC}"
    echo -e "${YELLOW}Try running with sudo: sudo npm install -g @laabroms/alias-cli${NC}\n"
    exit 1
fi
