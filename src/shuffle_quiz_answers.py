#!/usr/bin/env python3
"""
This script reads CSV quiz files and randomly shuffles the answer choices 
while keeping track of the correct answer index.
"""

import csv
import random
import os
import sys
import argparse
from pathlib import Path

def shuffle_answers(input_file, output_file=None, dry_run=False):
    """
    Shuffle the answers in the CSV file and update the correct index.
    
    Args:
        input_file: Path to the input CSV file
        output_file: Path to the output CSV file (if None, overwrite input)
        dry_run: If True, don't actually write anything, just print stats
    
    Returns:
        Dictionary with statistics about the shuffling
    """
    if output_file is None:
        output_file = input_file
    
    # Read the file
    with open(input_file, 'r', newline='') as f:
        content = f.readlines()
    
    # Check for comment line
    comment_line = None
    start_index = 0
    if content and content[0].strip().startswith('//'):
        comment_line = content[0]
        start_index = 1
    
    # Parse the CSV data
    reader = csv.reader(content[start_index:])
    rows = list(reader)
    
    if not rows:
        return {"error": "Empty CSV file"}
    
    header = rows[0]
    data_rows = rows[1:]
    
    # Find the column indices
    try:
        answer_a_idx = header.index('AnswerA')
        answer_b_idx = header.index('AnswerB')
        answer_c_idx = header.index('AnswerC')
        answer_d_idx = header.index('AnswerD')
        correct_idx = header.index('CorrectIndex')
    except ValueError as e:
        return {"error": f"Missing required column: {str(e)}"}
    
    # Statistics
    stats = {
        "total_questions": len(data_rows),
        "original_positions": {1: 0, 2: 0, 3: 0, 4: 0},
        "new_positions": {1: 0, 2: 0, 3: 0, 4: 0}
    }
    
    # Process each question row
    for row in data_rows:
        if len(row) <= max(answer_a_idx, answer_b_idx, answer_c_idx, answer_d_idx, correct_idx):
            continue  # Skip rows with insufficient columns
        
        # Get current correct answer index (1-based)
        try:
            current_correct = int(row[correct_idx])
            stats["original_positions"][current_correct] += 1
        except (ValueError, KeyError):
            continue  # Skip rows with invalid correct index
        
        # Get the answers
        answers = [
            row[answer_a_idx],
            row[answer_b_idx],
            row[answer_c_idx],
            row[answer_d_idx]
        ]
        
        # Remember which one was correct (0-based)
        correct_answer = answers[current_correct - 1]
        
        # Shuffle the answers
        answer_indices = list(range(4))
        random.shuffle(answer_indices)
        
        # Rearrange the answers
        new_answers = [answers[i] for i in answer_indices]
        
        # Find where the correct answer went
        new_correct_idx = answer_indices.index(current_correct - 1) + 1  # 1-based index
        
        # Update the statistics
        stats["new_positions"][new_correct_idx] += 1
        
        # Update the row
        row[answer_a_idx] = new_answers[0]
        row[answer_b_idx] = new_answers[1]
        row[answer_c_idx] = new_answers[2]
        row[answer_d_idx] = new_answers[3]
        row[correct_idx] = str(new_correct_idx)
    
    if dry_run:
        return stats
    
    # Write the updated content
    with open(output_file, 'w', newline='') as f:
        if comment_line:
            f.write(comment_line)
        
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(data_rows)
    
    return stats

def main():
    parser = argparse.ArgumentParser(description='Shuffle quiz answer choices while keeping track of correct answers.')
    parser.add_argument('files', metavar='FILE', nargs='+', help='CSV file(s) to process')
    parser.add_argument('--dry-run', action='store_true', help='Print statistics without modifying files')
    args = parser.parse_args()
    
    for file_path in args.files:
        if not os.path.exists(file_path):
            print(f"Error: File not found - {file_path}")
            continue
            
        print(f"Processing {file_path}...")
        stats = shuffle_answers(file_path, dry_run=args.dry_run)
        
        if "error" in stats:
            print(f"  Error: {stats['error']}")
            continue
        
        print("  Questions processed:", stats["total_questions"])
        print("  Original correct answer positions:")
        for pos, count in stats["original_positions"].items():
            percentage = (count / stats["total_questions"]) * 100 if stats["total_questions"] > 0 else 0
            print(f"    Position {pos}: {count} ({percentage:.1f}%)")
        
        if not args.dry_run:
            print("  New correct answer positions:")
            for pos, count in stats["new_positions"].items():
                percentage = (count / stats["total_questions"]) * 100 if stats["total_questions"] > 0 else 0
                print(f"    Position {pos}: {count} ({percentage:.1f}%)")
        
        if not args.dry_run:
            print("  File updated successfully.")
        else:
            print("  Dry run completed. No changes were made.")

if __name__ == '__main__':
    main()
