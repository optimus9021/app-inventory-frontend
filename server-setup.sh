#!/bin/bash

# Server Setup Script for Ubuntu
# Run this script on your Ubuntu server to prepare for deployment

set -e

echo "🛠️  Setting up Ubuntu server for Frontend deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root"
    exit 1
fi

print_header "Updating system packages..."
sudo apt update && sudo apt upgrade -y

print_header "Installing required packages..."
sudo apt install -y curl wget git build-essential software-properties-common

# Install Node.js 18
print_header "Installing Node.js 18..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    print_status "Node.js is already installed: $(node --version)"
fi

# Install PM2 globally
print_header "Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
else
    print_status "PM2 is already installed: $(pm2 --version)"
fi

# Install Nginx (optional, for reverse proxy)
print_header "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
else
    print_status "Nginx is already installed"
fi

# Create application directory
print_header "Creating application directory..."
sudo mkdir -p /var/www/inventory-frontend
sudo chown -R $USER:$USER /var/www/inventory-frontend

# Create log directory for PM2
print_header "Creating log directories..."
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Setup firewall (optional)
print_header "Configuring firewall..."
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 3000  # Next.js app
sudo ufw --force enable

# Create Nginx configuration for frontend
print_header "Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/inventory-frontend > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com;  # Replace with your actual domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/inventory-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

print_status "✅ Server setup completed successfully!"
print_status ""
print_status "Next steps:"
print_status "1. Update the domain in /etc/nginx/sites-available/inventory-frontend"
print_status "2. Setup SSL certificate (optional): sudo certbot --nginx"
print_status "3. Clone your repository to /var/www/inventory-frontend"
print_status "4. Run the deployment script"
print_status ""
print_status "Useful commands:"
print_status "- Check PM2 status: pm2 status"
print_status "- View PM2 logs: pm2 logs"
print_status "- Check Nginx status: sudo systemctl status nginx"
print_status "- Test Nginx config: sudo nginx -t"
