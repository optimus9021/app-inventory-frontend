# Frontend Deployment Guide

## Overview
This guide covers the CI/CD setup for the frontend application using GitHub Actions, PM2, and deployment to Ubuntu server.

## Deployment Workflow

### 1. Development Workflow
- Push code to `DEV_Ismail` branch
- GitHub Actions automatically triggers deployment to DEV server
- For production deployment, create Pull Request from `DEV_Ismail` to `DEV` branch

### 2. GitHub Actions Workflow
The CI/CD pipeline (`deploy-dev.yml`) includes:
- Code checkout
- Node.js setup
- Dependency installation
- Linting
- Build process
- Deployment to server via SSH

## Server Setup

### Prerequisites
- Ubuntu server with SSH access
- Domain name (optional)
- GitHub repository access

### 1. Initial Server Setup
Run the server setup script on your Ubuntu server:

```bash
chmod +x server-setup.sh
./server-setup.sh
```

This script will:
- Update system packages
- Install Node.js 18
- Install PM2
- Install and configure Nginx
- Setup firewall rules
- Create application directories

### 2. GitHub Secrets Configuration
Add the following secrets to your GitHub repository:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DEV_HOST` | Server IP address | `192.168.1.100` |
| `DEV_USERNAME` | SSH username | `ubuntu` |
| `DEV_SSH_KEY` | Private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `DEV_PORT` | SSH port (optional) | `22` |
| `DEV_APP_PATH` | Application path on server | `/var/www/inventory-frontend` |
| `DEV_PM2_PROCESS_NAME` | PM2 process name | `inventory-frontend-dev` |

### 3. SSH Key Setup
Generate SSH key pair on your local machine:

```bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

Copy public key to server:
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub username@server-ip
```

Add private key content to GitHub Secrets as `DEV_SSH_KEY`.

## Manual Deployment

### 1. First Time Deployment
On your server, run:

```bash
# Clone repository
cd /var/www/inventory-frontend
git clone https://github.com/your-username/your-repo.git .
git checkout DEV_Ismail

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

### 2. Environment Configuration
Copy and configure environment variables:

```bash
cp .env.example .env.local
nano .env.local
```

Update the following variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_APP_ENV`: Environment (development/production)

## PM2 Management

### Basic Commands
```bash
# Check status
pm2 status

# View logs
pm2 logs inventory-frontend-dev

# Restart application
pm2 restart inventory-frontend-dev

# Stop application
pm2 stop inventory-frontend-dev

# Monitor in real-time
pm2 monit
```

### Configuration
PM2 configuration is defined in `ecosystem.config.json`:
- Process name: `inventory-frontend-dev`
- Port: `3000`
- Logs location: `/var/log/pm2/`
- Auto-restart on crashes

## Nginx Configuration

### Default Configuration
Nginx is configured to proxy requests from port 80 to port 3000 where the Next.js application runs.

Configuration file: `/etc/nginx/sites-available/inventory-frontend`

### SSL Setup (Optional)
Install Certbot for free SSL certificates:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **PM2 Process Won't Start**
   - Check application logs: `pm2 logs`
   - Verify environment variables
   - Check port availability: `sudo netstat -tulpn | grep :3000`

3. **Deployment Fails**
   - Verify SSH connection: `ssh username@server-ip`
   - Check GitHub Secrets configuration
   - Verify server disk space: `df -h`

### Useful Commands

```bash
# Check application status
curl http://localhost:3000

# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# View system logs
sudo journalctl -u nginx -f
```

## File Structure

```
frontend/
├── .github/
│   └── workflows/
│       └── deploy-dev.yml      # GitHub Actions workflow
├── ecosystem.config.json       # PM2 configuration
├── deploy.sh                   # Deployment script
├── server-setup.sh            # Server setup script
├── .env.example               # Environment variables template
└── DEPLOYMENT.md              # This documentation
```

## Support

For deployment issues:
1. Check the GitHub Actions logs
2. Review PM2 logs on the server
3. Verify Nginx configuration
4. Check server resources (CPU, memory, disk space)

## Security Notes

- Keep SSH keys secure and rotate them regularly
- Use strong passwords for server access
- Configure firewall properly
- Keep system packages updated
- Monitor application logs for suspicious activity
