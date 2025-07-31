#!/bin/bash

# Frontend Deployment Script for DEV Environment
# This script should be run on the Ubuntu server

set -e

echo "🚀 Starting Frontend Deployment for DEV Environment..."

# Configuration
APP_DIR="/var/www/inventory-frontend"
PM2_PROCESS_NAME="inventory-frontend-dev"
NODE_VERSION="18"
PORT="3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js $NODE_VERSION first."
    exit 1
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Create application directory if it doesn't exist
if [ ! -d "$APP_DIR" ]; then
    print_status "Creating application directory..."
    sudo mkdir -p "$APP_DIR"
    sudo chown -R $USER:$USER "$APP_DIR"
fi

# Navigate to application directory
cd "$APP_DIR"

print_status "Current directory: $(pwd)"

# Check if git repository exists
if [ ! -d ".git" ]; then
    print_status "Initializing git repository..."
    git init
    git remote add origin https://github.com/optimus9021/app-inventory-frontend.git # Adjust URL as needed
fi

# Pull latest changes
print_status "Pulling latest changes from DEV_Ismail branch..."
git fetch origin
git checkout DEV_Ismail || git checkout -b DEV_Ismail origin/DEV_Ismail
git pull origin DEV_Ismail

# Install dependencies
print_status "Installing dependencies..."
npm ci --only=production

# Create environment file if not exists
if [ ! -f ".env.local" ]; then
    print_status "Creating environment file..."
    cp .env.example .env.local
    print_warning "Please update .env.local with your actual environment variables"
fi

# Build application
print_status "Building application..."
npm run build

# Stop existing PM2 process if running
if pm2 describe "$PM2_PROCESS_NAME" > /dev/null 2>&1; then
    print_status "Stopping existing PM2 process..."
    pm2 stop "$PM2_PROCESS_NAME"
    pm2 delete "$PM2_PROCESS_NAME"
fi

# Start application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.json

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup | grep -E "sudo.*pm2.*startup" | sh || true

print_status "✅ Deployment completed successfully!"
print_status "Application is running on port $PORT"
print_status "You can check the status with: pm2 status"
print_status "View logs with: pm2 logs $PM2_PROCESS_NAME"
