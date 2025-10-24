#!/bin/bash

echo "=== Deployment Debug Script ==="
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la

echo ""
echo "=== Checking if required files exist ==="
if [ -f "index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing"
fi

if [ -f "styles.css" ]; then
    echo "✅ styles.css exists"
else
    echo "❌ styles.css missing"
fi

if [ -f "script.js" ]; then
    echo "✅ script.js exists"
else
    echo "❌ script.js missing"
fi

if [ -f "nginx.conf" ]; then
    echo "✅ nginx.conf exists"
else
    echo "❌ nginx.conf missing"
fi

echo ""
echo "=== Docker build test ==="
echo "Building Docker image..."
docker build -t portfolio-test .

echo ""
echo "=== Running Docker container ==="
echo "Starting container..."
docker run -d -p 8080:80 --name portfolio-test-container portfolio-test

echo ""
echo "=== Checking container files ==="
docker exec portfolio-test-container ls -la /usr/share/nginx/html/

echo ""
echo "=== Testing website ==="
curl -I http://localhost:8080/

echo ""
echo "=== Cleaning up ==="
docker stop portfolio-test-container
docker rm portfolio-test-container
docker rmi portfolio-test
