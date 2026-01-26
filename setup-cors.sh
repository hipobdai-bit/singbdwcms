#!/bin/bash

# Script to configure CORS for Firebase Storage bucket

echo "Configuring CORS for Firebase Storage..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "Error: gcloud CLI is not installed."
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Check if FIREBASE_PROJECT_ID is set
if [ -z "$FIREBASE_PROJECT_ID" ]; then
    echo "Error: FIREBASE_PROJECT_ID is not set in .env.local"
    exit 1
fi

# Set the bucket name
if [ -z "$FIREBASE_STORAGE_BUCKET" ]; then
    BUCKET="gs://${FIREBASE_PROJECT_ID}.appspot.com"
else
    BUCKET="gs://${FIREBASE_STORAGE_BUCKET}"
fi

echo "Applying CORS configuration to bucket: $BUCKET"

# Apply CORS configuration
gcloud storage buckets update "$BUCKET" --cors-file=cors.json

if [ $? -eq 0 ]; then
    echo "CORS configuration applied successfully!"
else
    echo "Failed to apply CORS configuration."
    echo "You may need to run: gcloud auth login"
    exit 1
fi
