#!/bin/zsh

# shuffle_all_quizzes.sh
# This script shuffles all quiz CSV files in the current directory

# Set the directory path
DIR="/Users/larsf/Dropbox (Personal)/AARC/GitHub/aarc_lts/src"

# Make the Python script executable
chmod +x $DIR/shuffle_quiz_answers.py

# Function to show usage
show_usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  --dry-run    Show statistics only, don't modify files"
  echo "  --help       Show this help message"
  echo ""
  echo "This script shuffles answers in all quiz CSV files in the project."
}

# Process command line arguments
DRY_RUN=""
if [[ "$1" == "--dry-run" ]]; then
  DRY_RUN="--dry-run"
  echo "Running in dry-run mode (no files will be modified)"
elif [[ "$1" == "--help" ]]; then
  show_usage
  exit 0
fi

# Find all CSV files with "questions" in the filename
CSV_FILES=($DIR/*_questions.csv)

if [[ ${#CSV_FILES[@]} -eq 0 ]]; then
  echo "Error: No *_questions.csv files found in $DIR"
  exit 1
fi

echo "Found ${#CSV_FILES[@]} quiz files to process."

# First, make a backup of all files
BACKUP_DIR="$DIR/quiz_backups_$(date +%Y%m%d_%H%M%S)"
if [[ -z $DRY_RUN ]]; then
  mkdir -p $BACKUP_DIR
  echo "Creating backups in $BACKUP_DIR"
  
  for file in ${CSV_FILES[@]}; do
    cp "$file" "$BACKUP_DIR/$(basename $file)"
  done
  echo "Backups created successfully."
fi

# Run the Python script on each file
$DIR/shuffle_quiz_answers.py $DRY_RUN ${CSV_FILES[@]}

# Show summary if not in dry-run mode
if [[ -z $DRY_RUN ]]; then
  echo ""
  echo "All quiz files have been processed successfully."
  echo "Original files are backed up in: $BACKUP_DIR"
  echo ""
  echo "To restore the original files if needed, run:"
  echo "cp $BACKUP_DIR/* $DIR/"
fi
