#!/bin/bash
# filepath: /Users/larsf/Dropbox (Personal)/AARC/GitHub/aarc_lts/migrate.sh
# Script to migrate files from src/ to resources/ and update all references

# Define source and destination directories
SRC_DIR="src"
DEST_DIR="resources"
REPO_ROOT="$(pwd)"

# Create destination directory if it doesn't exist
mkdir -p "${DEST_DIR}"

# First, copy all files from src to resources
echo "Copying files from ${SRC_DIR} to ${DEST_DIR}..."
cp -r "${SRC_DIR}"/* "${DEST_DIR}"/

# Function to update references in a file
update_references() {
  local file="$1"
  local file_extension="${file##*.}"
  
  # Skip binary files
  if [[ "${file_extension}" == "pdf" || "${file_extension}" == "jpg" || 
        "${file_extension}" == "png" || "${file_extension}" == "gif" ]]; then
    return
  fi
  
  # Update references in the file
  sed -i.bak -E \
    -e "s|(\{\{ site\.baseurl \}\})/src/|\\1/resources/|g" \
    -e "s|(\")(/src/)|\\1/resources/|g" \
    -e "s|(\")src/|\\1resources/|g" \
    -e "s|href=\"resources/|href=\"resources/|g" \
    -e "s|href=\"/resources/|href=\"/resources/|g" \
    -e "s|src=\"resources/|src=\"resources/|g" \
    -e "s|src=\"/resources/|src=\"/resources/|g" \
    -e "s|path: \"resources/|path: \"resources/|g" \
    -e "s|path: \"/resources/|path: \"/resources/|g" \
    -e "s|path: \"\{\{ site\.baseurl \}\}/src/|path: \"\{\{ site\.baseurl \}\}/resources/|g" \
    "$file"
  
  # Remove backup file if the original was modified
  if cmp -s "$file" "$file.bak"; then
    rm "$file.bak"
  else
    echo "Updated references in: $file"
    rm "$file.bak"
  fi
}
export -f update_references

echo "Updating references in all files..."
# Find all files in the repository and update references
# Using -print0 with xargs -0 to handle filenames with spaces and special characters
find "${REPO_ROOT}" -type f \
  -not -path "*/\.*" \
  -not -path "*/node_modules/*" \
  -not -path "*/_site/*" \
  -not -path "*/.jekyll-cache/*" \
  -print0 | xargs -0 -I{} bash -c 'update_references "$@"' _ "{}"

echo "Migration completed!"
echo "Please verify the changes before removing the original src directory."
