#!/bin/bash
echo "Testing file copy in Docker container..."
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la
echo "Files in /usr/share/nginx/html:"
ls -la /usr/share/nginx/html/
echo "Testing nginx configuration:"
nginx -t
