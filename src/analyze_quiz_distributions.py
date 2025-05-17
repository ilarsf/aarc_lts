#!/usr/bin/env python3
"""
This script analyzes CSV quiz files to visualize the distribution
of correct answer positions.
"""

import csv
import sys
import os
import argparse
from pathlib import Path

# Optional matplotlib import
try:
    import matplotlib.pyplot as plt
    MATPLOTLIB_AVAILABLE = True
except ImportError:
    MATPLOTLIB_AVAILABLE = False

def analyze_quiz_file(file_path):
    """
    Analyze the distribution of correct answers in a quiz CSV file.
    
    Args:
        file_path: Path to the CSV file
    
    Returns:
        Dictionary with statistics
    """
    try:
        # Read the file
        with open(file_path, 'r', newline='') as f:
            content = f.readlines()
        
        # Check for comment line
        start_index = 0
        if content and content[0].strip().startswith('//'):
            start_index = 1
        
        # Parse the CSV data
        reader = csv.reader(content[start_index:])
        rows = list(reader)
        
        if not rows:
            return {"error": "Empty CSV file"}
        
        header = rows[0]
        data_rows = rows[1:]
        
        # Find the column index for CorrectIndex
        try:
            correct_idx = header.index('CorrectIndex')
        except ValueError:
            return {"error": "Missing 'CorrectIndex' column"}
        
        # Count occurrences of each correct answer position
        position_counts = {1: 0, 2: 0, 3: 0, 4: 0}
        
        for row in data_rows:
            if len(row) <= correct_idx:
                continue  # Skip rows with insufficient columns
            
            try:
                current_correct = int(row[correct_idx])
                if 1 <= current_correct <= 4:
                    position_counts[current_correct] += 1
            except (ValueError, KeyError):
                continue  # Skip rows with invalid correct index
        
        total_questions = sum(position_counts.values())
        
        # Calculate percentages
        percentages = {pos: (count / total_questions * 100) if total_questions > 0 else 0 
                      for pos, count in position_counts.items()}
        
        return {
            "file_name": os.path.basename(file_path),
            "total_questions": total_questions,
            "position_counts": position_counts,
            "percentages": percentages
        }
    
    except Exception as e:
        return {"error": f"Error analyzing {file_path}: {str(e)}"}

def visualize_distributions(stats_list):
    """
    Create a visualization of answer distributions.
    
    Args:
        stats_list: List of statistics dictionaries from analyze_quiz_file()
    """
    # Prepare data
    file_names = [stats["file_name"] for stats in stats_list if "error" not in stats]
    positions = [1, 2, 3, 4]
    
    # Set up the figure
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 7))
    
    # Plot counts
    counts_data = []
    for stats in stats_list:
        if "error" in stats:
            continue
        counts_data.append([stats["position_counts"][pos] for pos in positions])
    
    ax1.boxplot(counts_data)
    ax1.set_title('Distribution of Correct Answer Counts')
    ax1.set_xlabel('Answer Position (A, B, C, D)')
    ax1.set_ylabel('Number of Questions')
    ax1.set_xticks(range(1, 5))
    ax1.set_xticklabels(['A', 'B', 'C', 'D'])
    
    # Plot percentages
    percentage_data = []
    for stats in stats_list:
        if "error" in stats:
            continue
        percentage_data.append([stats["percentages"][pos] for pos in positions])
    
    ax2.boxplot(percentage_data)
    ax2.set_title('Distribution of Correct Answer Percentages')
    ax2.set_xlabel('Answer Position (A, B, C, D)')
    ax2.set_ylabel('Percentage of Questions')
    ax2.set_xticks(range(1, 5))
    ax2.set_xticklabels(['A', 'B', 'C', 'D'])
    
    # Add overall statistics
    all_counts = {1: 0, 2: 0, 3: 0, 4: 0}
    total_questions = 0
    
    for stats in stats_list:
        if "error" in stats:
            continue
        for pos in positions:
            all_counts[pos] += stats["position_counts"][pos]
        total_questions += stats["total_questions"]
    
    all_percentages = {pos: (count / total_questions * 100) if total_questions > 0 else 0 
                      for pos, count in all_counts.items()}
    
    # Add text with overall statistics
    plt.figtext(0.5, 0.01, f"Overall: A: {all_percentages[1]:.1f}%, B: {all_percentages[2]:.1f}%, C: {all_percentages[3]:.1f}%, D: {all_percentages[4]:.1f}%", 
                ha="center", fontsize=12, bbox={"facecolor":"orange", "alpha":0.2, "pad":5})
    
    plt.tight_layout(rect=[0, 0.05, 1, 0.95])
    plt.savefig('quiz_answer_distribution.png')
    print(f"Visualization saved to quiz_answer_distribution.png")

def main():
    parser = argparse.ArgumentParser(description='Analyze quiz answer distributions.')
    parser.add_argument('files', metavar='FILE', nargs='+', help='CSV file(s) to analyze')
    args = parser.parse_args()
    
    all_stats = []
    
    # Analyze each file
    for file_path in args.files:
        if not os.path.exists(file_path):
            print(f"Error: File not found - {file_path}")
            continue
            
        print(f"Analyzing {file_path}...")
        stats = analyze_quiz_file(file_path)
        
        if "error" in stats:
            print(f"  Error: {stats['error']}")
            continue
        
        print(f"  Total questions: {stats['total_questions']}")
        print("  Correct answer positions:")
        for pos, count in stats["position_counts"].items():
            print(f"    Position {pos} (Option {chr(64+pos)}): {count} ({stats['percentages'][pos]:.1f}%)")
        
        all_stats.append(stats)
    
    # Create visualization if we have data
    if all_stats:
        # Print overall statistics
        all_counts = {1: 0, 2: 0, 3: 0, 4: 0}
        total_questions = 0
        
        for stats in all_stats:
            if "error" not in stats:
                for pos in range(1, 5):
                    all_counts[pos] += stats["position_counts"][pos]
                total_questions += stats["total_questions"]
        
        print("\nOverall statistics:")
        print(f"Total questions across all files: {total_questions}")
        
        if total_questions > 0:
            all_percentages = {pos: (count / total_questions * 100) 
                              for pos, count in all_counts.items()}
            
            print("Distribution of correct answers:")
            for pos in range(1, 5):
                print(f"  Position {pos} (Option {chr(64+pos)}): {all_counts[pos]} ({all_percentages[pos]:.1f}%)")
        
        # Try to create visualization if matplotlib is available
        if MATPLOTLIB_AVAILABLE:
            try:
                visualize_distributions(all_stats)
            except Exception as e:
                print(f"\nError creating visualization: {str(e)}")
                print("The textual analysis was completed successfully.")
        else:
            print("\nMatplotlib not available. Install with: pip install matplotlib")
            print("Textual analysis completed without visualization.")

if __name__ == '__main__':
    main()
