#!/bin/zsh
# Script to update front matter for files that include accordions or other JavaScript features

echo "Updating front matter for files using accordions..."

# Find all files that include accordion.html
accordion_files=$(grep -l "{% include accordion.html %}" --include="*.md" -r .)

for file in $accordion_files; do
  # Skip README files and resources directory (templates)
  if [[ "$file" == *"README"* || "$file" == *"/resources/"* ]]; then
    echo "Skipping $file"
    continue
  fi
  
  # Check if the file already has uses_accordion in the front matter
  if grep -q "uses_accordion:" "$file"; then
    echo "$file already has accordion front matter"
    continue
  fi
  
  # Check if the file has front matter
  if grep -q "^---" "$file"; then
    echo "Updating $file"
    # Add uses_accordion to the front matter
    sed -i '' '/^---/,/^---/ s/^---$/---\nuses_accordion: true/' "$file"
  else
    echo "Adding front matter to $file"
    # Add complete front matter with uses_accordion
    sed -i '' '1i\
---\
layout: default\
uses_accordion: true\
---\
' "$file"
  fi
done

echo "Done updating accordion files."

# You can extend this script to handle other JavaScript features
