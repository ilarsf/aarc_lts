import pandas as pd
import io
import os

# Function to safely read CSV files, returning an empty DataFrame on error
# (Using the robust version from the initial analysis)
def safe_read_csv(file_path):
    try:
        # Attempt to read with standard comma delimiter
        df = pd.read_csv(file_path)
        # Check if parsing resulted in a single column, potentially indicating a different delimiter or issue
        if df.shape[1] == 1 and len(df) > 0:
             # Use StringIO to handle the file content as a string buffer
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            # Try reading again, explicitly setting delimiter and handling quotes
            try:
                df = pd.read_csv(io.StringIO(content), sep=',', quotechar='"', escapechar='\\', skipinitialspace=True)
                print(f"Successfully re-read {file_path} with explicit settings.")
            except Exception as e_alt:
                print(f"Warning: Could not parse {file_path} correctly even with explicit settings. Error: {e_alt}. Returning raw read.")
                # If secondary parsing fails, return the initial single-column DataFrame for inspection
                # Re-read the initial way to ensure we have *something*
                try:
                    df = pd.read_csv(file_path)
                except Exception as e_final_read_fallback:
                    print(f"Error during fallback read of {file_path}: {e_final_read_fallback}")
                    return pd.DataFrame()

        # Check if essential columns exist after parsing
        expected_cols = ['ID', 'QuestionText', 'AnswerA', 'AnswerB', 'AnswerC', 'AnswerD', 'CorrectIndex', 'Explanation']
        if not all(col in df.columns for col in expected_cols):
             print(f"Warning: File {file_path} is missing expected columns after parsing. Columns found: {list(df.columns)}")
             # Attempt to re-read assuming the first line might be problematic data, not header
             try:
                 # Use StringIO for potentially malformed files
                 with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                 df = pd.read_csv(io.StringIO(content), header=None, sep=',', quotechar='"', escapechar='\\', skipinitialspace=True)
                 # Assign generic headers if re-read successful
                 print(f"Re-read {file_path} without header. Assigning generic headers.")
                 df.columns = [f'col_{i}' for i in range(df.shape[1])]
                 # Try assigning expected headers if column count matches
                 if len(df.columns) == len(expected_cols):
                     df.columns = expected_cols
                     print(f"Assigned expected headers to {file_path}.")
                 else:
                     print(f"Column count mismatch in {file_path} ({len(df.columns)} vs {len(expected_cols)} expected). Cannot assign expected headers.")

             except Exception as e_re_read:
                 print(f"Error re-reading {file_path} without header: {e_re_read}. Returning initial read if possible.")
                 # Fallback to initial read if re-read fails
                 try:
                     df = pd.read_csv(file_path) # Try standard read one last time
                 except Exception as e_final_read:
                      print(f"Final error reading {file_path}: {e_final_read}")
                      return pd.DataFrame() # Return empty DataFrame if all attempts fail

        return df
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return pd.DataFrame()
    except Exception as e:
        print(f"General Error reading {file_path}: {e}")
        return pd.DataFrame()


# --- Define File Paths ---
quiz_files_paths = {
    's1': 'src/session1_questions.csv',
    's2': 'src/session2_questions.csv',
    's3': 'src/session3_questions.csv',
    's4': 'src/session4_questions.csv',
    'bh': 'src/boathouse_questions.csv',
}

output_dir = "revised_quiz_files"
os.makedirs(output_dir, exist_ok=True)

# --- Load Original DataFrames ---
quiz_dfs = {}
for key, path in quiz_files_paths.items():
    quiz_dfs[key] = safe_read_csv(path)
    if quiz_dfs[key].empty:
        print(f"Failed to load or empty file: {path}. Cannot proceed with revisions for this file.")
    else:
        print(f"Successfully loaded original: {path} ({len(quiz_dfs[key])} questions)")

# --- Apply Revisions ---

# 1. Revise Boathouse Questions
if 'bh' in quiz_dfs and not quiz_dfs['bh'].empty:
    boathouse_df = quiz_dfs['bh'].copy()
    # Indices to remove: 15, 16, 17, 18 (BHQ16-19) and 22-37 (BHQ23-38 duplicates)
    # Note: DataFrame indices might not perfectly match row numbers if CSV was altered.
    # It's safer to filter by ID if IDs are reliable and unique.
    # Let's try filtering by ID first.
    ids_to_remove = [f'BHQ{i}' for i in range(16, 20)] + [f'BHQ{i}' for i in range(23, 39)]
    
    if 'ID' in boathouse_df.columns:
        initial_count = len(boathouse_df)
        # Check if IDs exist before attempting removal
        found_ids = boathouse_df['ID'].isin(ids_to_remove).sum()
        print(f"Found {found_ids} Boathouse questions matching IDs to remove: {ids_to_remove}")
        
        revised_boathouse_df = boathouse_df[~boathouse_df['ID'].isin(ids_to_remove)].copy()
        removed_count = initial_count - len(revised_boathouse_df)
        print(f"Removed {removed_count} questions from boathouse_questions based on ID.")
        
        # If ID-based removal didn't remove the expected number (20), fall back to index removal
        if removed_count != 20 and found_ids != 20:
             print(f"Warning: ID-based removal didn't remove the expected 20 questions (removed {removed_count}). Attempting index-based removal.")
             indices_to_remove = [15, 16, 17, 18] + list(range(22, 38)) # 0-based indices
             # Ensure indices are within bounds
             valid_indices_to_remove = [idx for idx in indices_to_remove if idx < len(boathouse_df)]
             print(f"Indices to remove (0-based): {valid_indices_to_remove}")
             revised_boathouse_df = boathouse_df.drop(index=valid_indices_to_remove, errors='ignore').copy()
             removed_count_idx = initial_count - len(revised_boathouse_df)
             print(f"Removed {removed_count_idx} questions from boathouse_questions based on index.")
             if removed_count_idx != 20:
                  print(f"Warning: Index-based removal also didn't remove exactly 20 questions.")
        
        # Clean up the QuestionTextLower column if it exists
        if 'QuestionTextLower' in revised_boathouse_df.columns:
             revised_boathouse_df = revised_boathouse_df.drop(columns=['QuestionTextLower'])
             
        # Reset index for cleanliness
        revised_boathouse_df.reset_index(drop=True, inplace=True)

        # Save revised file
        output_path = os.path.join(output_dir, "revised_boathouse_questions.csv")
        revised_boathouse_df.to_csv(output_path, index=False, quoting=1) # quoting=1 is csv.QUOTE_ALL
        print(f"Saved revised boathouse questions ({len(revised_boathouse_df)} questions) to {output_path}")
        quiz_dfs['bh'] = revised_boathouse_df # Update the dictionary with the revised df
    else:
        print("Warning: 'ID' column not found in boathouse_questions.csv. Cannot remove questions by ID. Skipping boathouse revisions.")

# 2. Add New Questions to Session Files

# Session 1: No changes
if 's1' in quiz_dfs and not quiz_dfs['s1'].empty:
    output_path = os.path.join(output_dir, "revised_session1_questions.csv")
    quiz_dfs['s1'].to_csv(output_path, index=False, quoting=1)
    print(f"Saved unchanged session 1 questions ({len(quiz_dfs['s1'])} questions) to {output_path}")


# Session 2: Add 2 questions
if 's2' in quiz_dfs and not quiz_dfs['s2'].empty:
    s2_df = quiz_dfs['s2'].copy()
    new_questions_s2 = [
        {'ID': 'S2Q14', 
         'QuestionText': "What is the primary purpose of using the Pick Drill on the water in Session 2?", 
         'AnswerA': "To practice steering in tight spaces", 
         'AnswerB': "To incrementally transfer erg stroke sequence and control to the boat", 
         'AnswerC': "To build maximum leg power", 
         'AnswerD': "To practice capsize recovery drills", 
         'CorrectIndex': 1, 
         'Explanation': "The Pick Drill on water breaks down the stroke (arms only -> arms/body -> slide) to help safely transfer the coordinated sequence learned on the ergometer to the less stable environment of the boat."},
        {'ID': 'S2Q15', 
         'QuestionText': "During launching, pointing the bow upstream primarily helps with...?", 
         'AnswerA': "Seeing downstream traffic more easily", 
         'AnswerB': "Making the boat easier to clean", 
         'AnswerC': "Managing river current for a more controlled departure from the dock", 
         'AnswerD': "Impressing the coach with proper procedure", 
         'CorrectIndex': 2, 
         'Explanation': "Pointing the bow upstream when launching allows the current to naturally help move the stern away from the dock, making departure easier and more controlled, especially for beginners."}
    ]
    # Convert list of dicts to DataFrame
    new_s2_df = pd.DataFrame(new_questions_s2)
    # Concatenate original and new questions
    revised_s2_df = pd.concat([s2_df, new_s2_df], ignore_index=True)
    
    output_path = os.path.join(output_dir, "revised_session2_questions.csv")
    revised_s2_df.to_csv(output_path, index=False, quoting=1)
    print(f"Saved revised session 2 questions ({len(revised_s2_df)} questions) to {output_path}")
    quiz_dfs['s2'] = revised_s2_df # Update the dictionary


# Session 3: Add 1 question
if 's3' in quiz_dfs and not quiz_dfs['s3'].empty:
    s3_df = quiz_dfs['s3'].copy()
    new_question_s3 = [
        {'ID': 'S3Q14', 
         'QuestionText': "In Session 3, coaches contrast a 'good push' with a 'soft push' primarily to demonstrate...?", 
         'AnswerA': "How to row silently", 
         'AnswerB': "The correct way to grip the oars", 
         'AnswerC': "The feeling and effect of effective leg drive vs. insufficient connection", 
         'AnswerD': "How to adjust the foot stretchers properly", 
         'CorrectIndex': 2, 
         'Explanation': "The 'good push' vs. 'soft push' demonstration aims to help rowers feel the difference between a well-connected leg drive that moves the boat effectively and a disconnected or weak push."}
    ]
    new_s3_df = pd.DataFrame(new_question_s3)
    revised_s3_df = pd.concat([s3_df, new_s3_df], ignore_index=True)
    
    output_path = os.path.join(output_dir, "revised_session3_questions.csv")
    revised_s3_df.to_csv(output_path, index=False, quoting=1)
    print(f"Saved revised session 3 questions ({len(revised_s3_df)} questions) to {output_path}")
    quiz_dfs['s3'] = revised_s3_df # Update the dictionary


# Session 4: Add 1 question
if 's4' in quiz_dfs and not quiz_dfs['s4'].empty:
    s4_df = quiz_dfs['s4'].copy()
    new_question_s4 = [
        {'ID': 'S4Q14', 
         'QuestionText': "For the Skills Development group in Session 4, what type of drill might be used to reinforce correct recovery sequencing?", 
         'AnswerA': "High-intensity race pieces", 
         'AnswerB': "Legs-only rowing", 
         'AnswerC': "Pause drills (e.g., arms away, body over)", 
         'AnswerD': "Steering obstacle course", 
         'CorrectIndex': 2, 
         'Explanation': "Session 4 plan mentions that the Skills Development group might work on consistency using drills. Pause drills are specifically designed to reinforce correct sequencing during the recovery phase."}
    ]
    new_s4_df = pd.DataFrame(new_question_s4)
    revised_s4_df = pd.concat([s4_df, new_s4_df], ignore_index=True)
    
    output_path = os.path.join(output_dir, "revised_session4_questions.csv")
    revised_s4_df.to_csv(output_path, index=False, quoting=1)
    print(f"Saved revised session 4 questions ({len(revised_s4_df)} questions) to {output_path}")
    quiz_dfs['s4'] = revised_s4_df # Update the dictionary

print("\n--- File Generation Complete ---")
# List created files
print("Created files in:", output_dir)
for filename in os.listdir(output_dir):
    print(f"- {filename}")
    