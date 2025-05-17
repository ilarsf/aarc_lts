#!/bin/zsh
# Script to find any remaining script inclusions in markdown files

echo "Checking for direct script inclusions in markdown files..."

# Array of script files to check for
SCRIPT_FILES=(
  "accordion.js"
  "accordion-fallback.js"
  "category-nav.js"
  "tabs.js"
  "drill-filter.js"
  "skill-tags.js"
  "nested-dropdown.js"
  "quiz-integration.js"
  "coach-auth.js"
)

# Check for script inclusions
for script in "${SCRIPT_FILES[@]}"; do
  echo "Checking for $script..."
  grep -l "<script.*$script" --include="*.md" -r .
done

echo "Done checking for direct script inclusions."
