# Coolify Deployment Troubleshooting Guide

## Current Issue: "No Available Server"

If you're getting "no available server" error in Coolify, try these solutions:

## Solution 1: Use Nginx Dockerfile (Recommended)

1. **Rename the nginx Dockerfile:**
   ```bash
   mv Dockerfile.nginx Dockerfile
   ```

2. **Delete the old Dockerfile:**
   ```bash
   rm Dockerfile
   ```

3. **Push the changes:**
   ```bash
   git add .
   git commit -m "Switch to nginx deployment"
   git push origin main
   ```

## Solution 2: Check Coolify Configuration

In Coolify, make sure:

1. **Port Configuration:**
   - For Node.js: Port 3000
   - For Nginx: Port 80

2. **Environment Variables:**
   - No special environment variables needed

3. **Build Command:**
   - Leave empty (Dockerfile handles everything)

4. **Start Command:**
   - Leave empty (Dockerfile handles everything)

## Solution 3: Alternative Static Deployment

If Docker deployment fails, try direct static file deployment:

1. **Create a simple static server:**
   ```javascript
   // server.js
   const express = require('express');
   const path = require('path');
   const app = express();
   const port = process.env.PORT || 3000;

   app.use(express.static('.'));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'index.html'));
   });

   app.listen(port, '0.0.0.0', () => {
     console.log(`Server running on port ${port}`);
   });
   ```

2. **Update package.json:**
   ```json
   {
     "scripts": {
       "start": "node server.js"
     },
     "dependencies": {
       "express": "^4.18.2"
     }
   }
   ```

## Solution 4: Check Coolify Logs

1. Go to your Coolify dashboard
2. Click on your application
3. Check the "Logs" section
4. Look for specific error messages

## Common Issues and Fixes

### Issue: Port not exposed
**Fix:** Ensure Dockerfile has `EXPOSE 3000` or `EXPOSE 80`

### Issue: Wrong start command
**Fix:** Use `npm start` in Dockerfile CMD

### Issue: Missing files
**Fix:** Ensure all files are copied in Dockerfile

### Issue: Permission errors
**Fix:** Use non-root user in Dockerfile

## Quick Test Commands

Test locally before deploying:
```bash
# Test Node.js version
docker build -t portfolio-node .
docker run -p 3000:3000 portfolio-node

# Test nginx version
docker build -f Dockerfile.nginx -t portfolio-nginx .
docker run -p 80:80 portfolio-nginx
```

## Final Recommendations

1. **Try nginx deployment first** (most reliable for static sites)
2. **Check Coolify logs** for specific errors
3. **Ensure port configuration** matches Dockerfile
4. **Use health check endpoint** for monitoring

The nginx version should work better for static websites and is more commonly supported by deployment platforms.
