# Coolify Deployment Instructions

## For Hostinger Coolify Deployment

### Step 1: Repository Setup
1. Make sure all files are committed and pushed to your Git repository
2. Connect your repository to Coolify

### Step 2: Coolify Configuration
In your Coolify dashboard:

1. **Application Type:** Static Website
2. **Build Command:** Leave empty
3. **Start Command:** Leave empty
4. **Port:** 80
5. **Environment Variables:** None required

### Step 3: Docker Configuration
The repository includes:
- `Dockerfile` - Nginx-based static file serving
- `nginx.conf` - Nginx configuration
- `healthcheck.html` - Health check endpoint

### Step 4: Deployment
1. Click "Deploy" in Coolify
2. Wait for the build to complete
3. Check the logs for any errors

### Troubleshooting

If you get "no available server" error:

1. **Check the logs** in Coolify dashboard
2. **Verify port configuration** is set to 80
3. **Ensure Dockerfile is present** in the root directory
4. **Check that all files are committed** to Git

### Files Required for Deployment
- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `script.js` - JavaScript functionality
- `Dockerfile` - Docker configuration
- `nginx.conf` - Nginx configuration
- `healthcheck.html` - Health check endpoint
- `package.json` - Package configuration

### Health Check
The website includes a health check endpoint at `/healthcheck.html` that Coolify can use to verify the deployment is working.

### Support
If you continue to have issues:
1. Check Coolify logs for specific error messages
2. Verify all files are present in the repository
3. Ensure the Dockerfile is in the root directory
4. Make sure the port is set to 80 in Coolify settings
