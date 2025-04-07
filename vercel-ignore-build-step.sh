#!/bin/bash

# This script ensures npm install uses legacy-peer-deps
echo "Installing dependencies with legacy-peer-deps..."
npm install --legacy-peer-deps

# Continue with the build
echo "Building the application..."
npm run build 