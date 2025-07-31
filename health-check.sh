#!/bin/bash

# Health Check Script for Frontend Application
# This script checks if the application is running properly

APP_URL="http://localhost:3000"
PM2_PROCESS_NAME="inventory-frontend-dev"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

echo "🔍 Frontend Health Check Report"
echo "================================"

# Check if PM2 process is running
if pm2 describe "$PM2_PROCESS_NAME" > /dev/null 2>&1; then
    STATUS=$(pm2 describe "$PM2_PROCESS_NAME" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    if [ "$STATUS" = "online" ]; then
        print_status "PM2 process is running"
    else
        print_error "PM2 process status: $STATUS"
    fi
else
    print_error "PM2 process not found"
fi

# Check if application responds
if curl -s --max-time 10 "$APP_URL" > /dev/null; then
    print_status "Application is responding"
else
    print_error "Application is not responding"
fi

# Check memory usage
MEM_USAGE=$(ps aux | grep "node.*next" | grep -v grep | awk '{sum+=$4} END {print sum}')
if [ -n "$MEM_USAGE" ] && [ "$MEM_USAGE" != "" ]; then
    if (( $(echo "$MEM_USAGE > 80" | bc -l) )); then
        print_warning "High memory usage: ${MEM_USAGE}%"
    else
        print_status "Memory usage: ${MEM_USAGE}%"
    fi
else
    print_warning "Could not determine memory usage"
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    print_warning "High disk usage: ${DISK_USAGE}%"
else
    print_status "Disk usage: ${DISK_USAGE}%"
fi

# Check if Nginx is running
if systemctl is-active --quiet nginx; then
    print_status "Nginx is running"
else
    print_error "Nginx is not running"
fi

# Check recent logs for errors
ERROR_COUNT=$(pm2 logs "$PM2_PROCESS_NAME" --lines 100 --nostream | grep -i error | wc -l)
if [ "$ERROR_COUNT" -gt 0 ]; then
    print_warning "Found $ERROR_COUNT errors in recent logs"
else
    print_status "No recent errors in logs"
fi

echo ""
echo "Quick Actions:"
echo "- View logs: pm2 logs $PM2_PROCESS_NAME"
echo "- Restart app: pm2 restart $PM2_PROCESS_NAME"
echo "- Check detailed status: pm2 describe $PM2_PROCESS_NAME"
