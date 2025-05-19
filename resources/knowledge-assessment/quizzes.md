---
layout: default
title: "Knowledge Quizzes - AARC Learn to Scull Program"
---

# Knowledge Quizzes

Test your understanding of key rowing concepts with our interactive quizzes. These assessments help reinforce important information and ensure you're ready for on-water activities.

## Available Quizzes

<div class="quiz-categories">
  <div class="quiz-category">
    <h3>Session-Based Quizzes</h3>
    <p>These quizzes cover material specific to each Learn to Scull session.</p>
    <div class="quiz-buttons">
      <a href="#" onclick="loadQuiz('session1'); return false;" class="quiz-button">Session 1 Quiz</a>
      <a href="#" onclick="loadQuiz('session2'); return false;" class="quiz-button">Session 2 Quiz</a>
      <a href="#" onclick="loadQuiz('session3'); return false;" class="quiz-button">Session 3 Quiz</a>
      <a href="#" onclick="loadQuiz('session4'); return false;" class="quiz-button">Session 4 Quiz</a>
    </div>
  </div>
  
  <div class="quiz-category">
    <h3>Topic-Specific Quizzes</h3>
    <p>Focus on particular aspects of rowing knowledge with these specialized quizzes.</p>
    <div class="quiz-buttons">
      <a href="#" onclick="loadQuiz('safety'); return false;" class="quiz-button">Safety Quiz</a>
      <a href="#" onclick="loadQuiz('boathouse'); return false;" class="quiz-button">Boathouse Rules Quiz</a>
      <a href="#" onclick="loadQuiz('terminology'); return false;" class="quiz-button">Terminology Quiz</a>
    </div>
  </div>
  
  <div class="quiz-category">
    <h3>Comprehensive Assessments</h3>
    <p>Test your overall knowledge with these more extensive quizzes.</p>
    <div class="quiz-buttons">
      <a href="#" onclick="loadQuiz('complete'); return false;" class="quiz-button">Full Program Quiz</a>
      <a href="#" onclick="loadQuiz('advanced'); return false;" class="quiz-button">Advanced Concepts Quiz</a>
    </div>
  </div>
</div>

<div id="quiz-container" class="hidden">
  <div class="quiz-header">
    <h2 id="current-quiz-title">Quiz Title</h2>
    <p id="quiz-description">Quiz description will appear here.</p>
  </div>
  
  <div id="quiz-content">
    <!-- Quiz content will load here -->
    <iframe id="quiz-frame" style="width:100%; height:600px; border:none;" src=""></iframe>
  </div>
  
  <div class="quiz-controls">
    <button onclick="closeQuiz()" class="back-button">Return to Quiz List</button>
  </div>
</div>

## Quiz Information

### Completion Requirements

<div class="info-box note">
  <h4>Required Quizzes</h4>
  <p>The Safety Quiz is required for all Learn to Scull participants and must be completed with a score of at least 80% before the first on-water session.</p>
</div>

### Quiz Structure

- **Length**: Most quizzes contain 10-15 questions
- **Format**: Multiple-choice and true/false questions
- **Time Limit**: None (take as much time as you need)
- **Scoring**: Immediate feedback and score provided upon completion
- **Retakes**: All quizzes can be retaken as many times as needed

### Study Resources

To prepare for these quizzes, review the following materials:

- [For Learners: Getting Started]({{ site.baseurl }}/for-learners/getting-started/) - Basic concepts and terminology
- [For Learners: Safety]({{ site.baseurl }}/for-learners/safety/) - Essential safety information
- [Quick Reference Guides]({{ site.baseurl }}/resources/quick-reference/) - Key rowing concepts and procedures
- [Boathouse Rules]({{ site.baseurl }}/resources/club-policies/boathouse-rules) - Equipment handling and facility guidelines

<div class="info-box tip">
  <h4>Study Tip</h4>
  <p>If you miss questions on a quiz, make note of those topics and review the relevant materials before retaking the quiz.</p>
</div>

## Self-Assessment

These quizzes are designed primarily as learning tools to help you assess your own knowledge and identify areas where you might need additional review. While some quizzes (like the Safety Quiz) have minimum score requirements, the overall goal is to help you become a knowledgeable and safe rower.

<script>
function loadQuiz(quizType) {
  // Set quiz title and description based on quiz type
  const quizTitles = {
    'session1': 'Session 1 Knowledge Quiz',
    'session2': 'Session 2 Knowledge Quiz',
    'session3': 'Session 3 Knowledge Quiz',
    'session4': 'Session 4 Knowledge Quiz',
    'safety': 'Rowing Safety Quiz',
    'boathouse': 'Boathouse Rules Quiz',
    'terminology': 'Rowing Terminology Quiz',
    'complete': 'Complete Program Assessment',
    'advanced': 'Advanced Rowing Concepts Quiz'
  };
  
  const quizDescriptions = {
    'session1': 'Test your understanding of the core concepts covered in Session 1, including basic terminology, equipment, and fundamental safety rules.',
    'session2': 'This quiz covers the material from Session 2, focusing on rowing technique, water safety, and equipment handling.',
    'session3': 'Assess your knowledge of Session 3 content, including advanced technique, river traffic patterns, and common challenges.',
    'session4': 'Test your comprehensive understanding of all material covered in Session 4, including independent rowing requirements.',
    'safety': 'Essential safety knowledge every rower must know, including emergency procedures, traffic patterns, and weather guidelines.',
    'boathouse': 'Test your knowledge of boathouse protocols, equipment handling, and club rules.',
    'terminology': 'Demonstrate your understanding of rowing terminology, commands, and technical language.',
    'complete': 'A comprehensive assessment covering all aspects of the Learn to Scull program.',
    'advanced': 'Challenge yourself with advanced rowing concepts beyond the basic curriculum.'
  };
  
  // Get the CSV file path based on quiz type
  let csvPath;
  switch(quizType) {
    case 'session1':
      csvPath = '{{ site.baseurl }}/resources/session1_questions.csv';
      break;
    case 'session2':
      csvPath = '{{ site.baseurl }}/resources/session2_questions.csv';
      break;
    case 'session3':
      csvPath = '{{ site.baseurl }}/resources/session3_questions.csv';
      break;
    case 'session4':
      csvPath = '{{ site.baseurl }}/resources/session4_questions.csv';
      break;
    case 'safety':
      csvPath = '{{ site.baseurl }}/resources/consolidated_safety_questions.csv';
      break;
    case 'boathouse':
      csvPath = '{{ site.baseurl }}/resources/boathouse_questions.csv';
      break;
    // Other quiz types would be added here
    default:
      csvPath = '{{ site.baseurl }}/resources/consolidated_safety_questions.csv';
  }
  
  // Update the quiz title and description
  document.getElementById('current-quiz-title').innerText = quizTitles[quizType];
  document.getElementById('quiz-description').innerText = quizDescriptions[quizType];
  
  // Load the quiz in the iframe
  document.getElementById('quiz-frame').src = `{{ site.baseurl }}/resources/quiz_module.html?quiz=${quizType}&src=${csvPath}`;
  
  // Show the quiz container
  document.getElementById('quiz-container').classList.remove('hidden');
  
  // Scroll to the quiz
  document.getElementById('quiz-container').scrollIntoView({ behavior: 'smooth' });
}

function closeQuiz() {
  // Hide the quiz container
  document.getElementById('quiz-container').classList.add('hidden');
  
  // Clear the iframe
  document.getElementById('quiz-frame').src = '';
  
  // Scroll back to the top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style>
.quiz-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.quiz-category {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.quiz-category h3 {
  margin-top: 0;
  color: var(--theme-color);
  border-bottom: 2px solid var(--theme-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.quiz-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.quiz-button {
  display: inline-block;
  background-color: var(--theme-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  text-align: center;
  min-width: 120px;
}

.quiz-button:hover {
  background-color: var(--theme-color-dark);
  text-decoration: none;
  color: white;
}

#quiz-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.quiz-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.quiz-controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.back-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #5a6268;
  color: white;
}

.hidden {
  display: none;
}
</style>
