#!/bin/bash

# Define the source and destination files
SOURCE_FILE=".env"
DESTINATION_FILE="frontend/.env"

# Check if the source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "Env file $SOURCE_FILE does not exist."
    exit 1
fi

# Extract the content between the markers and write to the destination file
sed -n '/# FRONTEND - DO NOT CHANGE THIS LINE/,/# END OF FRONTEND - DO NOT CHANGE THIS LINE/p' "$SOURCE_FILE" > "$DESTINATION_FILE"

echo "Content copied to $DESTINATION_FILE"
echo "Building the frontend..."

cd frontend || exit
yarn
yarn build
cd ..