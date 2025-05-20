---
layout: default
title: "Knowledge Quizzes - AARC Learn to Scull Program"
nav_order: 1
parent: Knowledge Assessment
---

<div class="page-header">
  <h1>Knowledge Quizzes</h1>
  <p class="page-description">Test your understanding of key rowing concepts with our interactive quizzes. These assessments help reinforce important information and ensure you're ready for on-water activities.</p>
</div>

<div class="info-box note">
  <h4>Required Quizzes/* Progress grid styles */
.quiz-progress {
  margin: 2.5rem 0;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.progress-item {
  text-align: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}ty Quiz is required for all Learn to Scull participants and must be completed with a score of at least 80% before the first on-water session.</p>
</div>

## Your Quiz Progress

<div class="quiz-progress">
  <div class="progress-grid">
    <div class="progress-item" data-quiz-id="safety">
      <a href="#" onclick="loadQuiz('safety'); return false;" class="progress-item-link">
        <div class="progress-icon">🦺</div>
        <div class="progress-label">Safety</div>
        <div class="progress-status not-started">Not started</div>
      </a>
    </div>
    <div class="progress-item" data-quiz-id="boathouse">
      <a href="#" onclick="loadQuiz('boathouse'); return false;" class="progress-item-link">
        <div class="progress-icon">🏠</div>
        <div class="progress-label">Boathouse</div>
        <div class="progress-status not-started">Not started</div>
      </a>
    </div>
    <div class="progress-item" data-quiz-id="session1">
      <a href="#" onclick="loadQuiz('session1'); return false;" class="progress-item-link">
        <div class="progress-icon">1️⃣</div>
        <div class="progress-label">Session 1</
        <div class="progress-status not-started">Not started</div>
      </a>
    </div>
    <div class="progress-item" data-quiz-id="session2">
      <a href="#" onclick="loadQuiz('session2'); return false;" class="progress-item-link">
        <div class="progress-icon">2️⃣</div>
        <div class="progress-label">Session 2</div>
        <div class="progress-status not-started">Not started</div>
      </a>
    </div>
    <div class="progress-item" data-quiz-id="session3">
      <a href="#" onclick="loadQuiz('session3'); return false;" class="progress-item-link">
        <div class="progress-icon">3️⃣</div>
        <div class="progress-label">Session 3</div>
        <div class="progress-status not-started">Not started</div>
      </a>
    </div>
    <div class="progress-item" data-quiz-id="session4">
      <a href="#" onclick="loadQuiz('session4'); return false;" class="progress-item-link">
        <div class="progress-icon">4️⃣</div>
        <div class="progress-label">Session 4</div>
        <div class="progress-status not-started">Not started</div>
      </a>
    </div>
    <div class="progress-item" data-quiz-id="terminology">
      <a href="#" onclick="loadQuiz('terminology'); return false;" class="progress-item-link">
        <div class="progress-icon">📚</div>
        <div class="progress-label">Terminology</div>
        <div class="progress-status not-started">Not started</div>
      </a>
    </div>
  </div>
</div>

{% include tabs.html %}

<div class="tab active" data-tab="session-quizzes">
  <h2>Session Quizzes</h2>
  <p>These quizzes are designed to reinforce the key concepts from each Learn to Scull session. Take each quiz after completing the corresponding session to solidify your understanding.</p>
  
  <div class="quiz-grid">
    <div class="quiz-card" data-quiz-id="session1">
      <div class="quiz-card-header">
        <h4>Session 1 Quiz</h4>
      </div>
      <div class="quiz-card-body">
        <p>Test your understanding of the core concepts covered in Session 1, including basic terminology, equipment, and fundamental safety rules.</p>
        <div class="quiz-status not-started">○ Not Started</div>
        <a href="#" onclick="loadQuiz('session1'); return false;" class="quiz-link">Take Quiz</a>
      </div>
    </div>
    
    <div class="quiz-card" data-quiz-id="session2">
      <div class="quiz-card-header">
        <h4>Session 2 Quiz</h4>
      </div>
      <div class="quiz-card-body">
        <p>This quiz covers the material from Session 2, focusing on rowing technique, water safety, and equipment handling.</p>
        <div class="quiz-status not-started">○ Not Started</div>
        <a href="#" onclick="loadQuiz('session2'); return false;" class="quiz-link">Take Quiz</a>
      </div>
    </div>
    
    <div class="quiz-card" data-quiz-id="session3">
      <div class="quiz-card-header">
        <h4>Session 3 Quiz</h4>
      </div>
      <div class="quiz-card-body">
        <p>Assess your knowledge of Session 3 content, including advanced technique, river traffic patterns, and common challenges.</p>
        <div class="quiz-status not-started">○ Not Started</div>
        <a href="#" onclick="loadQuiz('session3'); return false;" class="quiz-link">Take Quiz</a>
      </div>
    </div>
    
    <div class="quiz-card" data-quiz-id="session4">
      <div class="quiz-card-header">
        <h4>Session 4 Quiz</h4>
      </div>
      <div class="quiz-card-body">
        <p>Test your comprehensive understanding of all material covered in Session 4, including independent rowing requirements.</p>
        <div class="quiz-status not-started">○ Not Started</div>
        <a href="#" onclick="loadQuiz('session4'); return false;" class="quiz-link">Take Quiz</a>
      </div>
    </div>
  </div>
</div>

<div class="tab" data-tab="safety-quizzes">
  <h2>Safety Quizzes</h2>
  <p>Safety is our top priority. These quizzes cover essential knowledge about water safety, boathouse protocols, and emergency procedures.</p>
  
  <div class="quiz-grid">
    <div class="quiz-card featured-card" data-quiz-id="safety">
      <div class="quiz-card-header">
        <h4>Rowing Safety Quiz</h4>
        <span class="required-badge">Required</span>
      </div>
      <div class="quiz-card-body">
        <p>Essential safety knowledge every rower must know, including emergency procedures, traffic patterns, and weather guidelines.</p>
        <p class="quiz-requirement">Required for all participants. Must score at least 80% before first on-water session.</p>
        <div class="quiz-status not-started">○ Not Started</div>
        <a href="#" onclick="loadQuiz('safety'); return false;" class="quiz-link">Take Quiz</a>
      </div>
    </div>
    
    <div class="quiz-card" data-quiz-id="boathouse">
      <div class="quiz-card-header">
        <h4>Boathouse Rules Quiz</h4>
      </div>
      <div class="quiz-card-body">
        <p>Test your knowledge of boathouse protocols, equipment handling, and club rules.</p>
        <div class="quiz-status not-started">○ Not Started</div>
        <a href="#" onclick="loadQuiz('boathouse'); return false;" class="quiz-link">Take Quiz</a>
      </div>
    </div>
  </div>
</div>

<div class="tab" data-tab="topic-quizzes">
  <h2>Topic-Specific Quizzes</h2>
  <p>These specialized quizzes focus on particular aspects of rowing knowledge, allowing you to dive deeper into specific areas.</p>
  
  <div class="quiz-grid">
    <div class="quiz-card" data-quiz-id="terminology">
      <div class="quiz-card-header">
        <h4>Rowing Terminology Quiz</h4>
      </div>
      <div class="quiz-card-body">
        <p>Demonstrate your understanding of rowing terminology, commands, and technical language.</p>
        <div class="quiz-status not-started">○ Not Started</div>
        <a href="#" onclick="loadQuiz('terminology'); return false;" class="quiz-link">Take Quiz</a>
      </div>
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
    <iframe id="quiz-frame" style="width:100%; height:500px; border:none; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 8px;" src=""></iframe>
  </div>
  
  <div class="quiz-controls">
    <button onclick="closeQuiz()" class="back-button">Return to Quiz List</button>
  </div>
</div>

## About the Quizzes

{% include accordion.html %}

<div class="accordion">
  <div class="accordion-item">
    <div class="accordion-header">
      <h3>Quiz Structure</h3>
      <span class="accordion-icon">+</span>
    </div>
    <div class="accordion-content">
      <ul>
        <li><strong>Length</strong>: Most quizzes contain 10-15 questions</li>
        <li><strong>Format</strong>: Multiple-choice and true/false questions</li>
        <li><strong>Time Limit</strong>: None (take as much time as you need)</li>
        <li><strong>Scoring</strong>: Immediate feedback and score provided upon completion</li>
        <li><strong>Retakes</strong>: All quizzes can be retaken as many times as needed</li>
      </ul>
    </div>
  </div>
  
  <div class="accordion-item">
    <div class="accordion-header">
      <h3>Why Take These Quizzes?</h3>
      <span class="accordion-icon">+</span>
    </div>
    <div class="accordion-content">
      <ul>
        <li><strong>Reinforce Learning:</strong> Quizzes help solidify the concepts and techniques you learn during your sessions</li>
        <li><strong>Identify Knowledge Gaps:</strong> Discover areas where you might need additional review or practice</li>
        <li><strong>Track Progress:</strong> See your improvement as you advance through the program</li>
        <li><strong>Build Confidence:</strong> Confirm your understanding of important safety and technique principles</li>
      </ul>
      <p>Each quiz provides immediate feedback and explanations for all questions, making them valuable learning tools even if you don't answer every question correctly the first time.</p>
    </div>
  </div>
  
  <div class="accordion-item">
    <div class="accordion-header">
      <h3>Study Resources</h3>
      <span class="accordion-icon">+</span>
    </div>
    <div class="accordion-content">
      <p>To prepare for these quizzes, review the following materials:</p>
      <ul>
        <li><a href="{{ site.baseurl }}/for-learners/getting-started/">For Learners: Getting Started</a> - Basic concepts and terminology</li>
        <li><a href="{{ site.baseurl }}/for-learners/safety/">For Learners: Safety</a> - Essential safety information</li>
        <li><a href="{{ site.baseurl }}/resources/quick-reference/">Quick Reference Guides</a> - Key rowing concepts and procedures</li>
        <li><a href="{{ site.baseurl }}/resources/club-policies/boathouse-rules">Boathouse Rules</a> - Equipment handling and facility guidelines</li>
      </ul>
      
      <div class="info-box tip">
        <h4>Study Tip</h4>
        <p>If you miss questions on a quiz, make note of those topics and review the relevant materials before retaking the quiz.</p>
      </div>
    </div>
  </div>
  
  <div class="accordion-item">
    <div class="accordion-header">
      <h3>Quiz Completion</h3>
      <span class="accordion-icon">+</span>
    </div>
    <div class="accordion-content">
      <p>Your quiz results are saved locally in your browser. You can return to this page anytime to see which quizzes you've completed and revisit them as needed.</p>
      
      <div class="info-box tip">
        <h4>Quiz Tips</h4>
        <ul>
          <li>Take the <strong>Rowing Safety Quiz</strong> and <strong>Boathouse Rules Quiz</strong> before your first session</li>
          <li>Complete each session quiz shortly after attending the corresponding session</li>
          <li>Review any incorrect answers to strengthen your understanding</li>
          <li>Retake quizzes periodically to refresh your knowledge</li>
        </ul>
      </div>
    </div>
  </div>
</div>

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
    'terminology': 'Rowing Terminology Quiz'
  };
  
  const quizDescriptions = {
    'session1': 'Test your understanding of the core concepts covered in Session 1, including basic terminology, equipment, and fundamental safety rules.',
    'session2': 'This quiz covers the material from Session 2, focusing on rowing technique, water safety, and equipment handling.',
    'session3': 'Assess your knowledge of Session 3 content, including advanced technique, river traffic patterns, and common challenges.',
    'session4': 'Test your comprehensive understanding of all material covered in Session 4, including independent rowing requirements.',
    'safety': 'Essential safety knowledge every rower must know, including emergency procedures, traffic patterns, and weather guidelines.',
    'boathouse': 'Test your knowledge of boathouse protocols, equipment handling, and club rules.',
    'terminology': 'Demonstrate your understanding of rowing terminology, commands, and technical language.'
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
      csvPath = '{{ site.baseurl }}/resources/safety_questions.csv';
      break;
    case 'boathouse':
      csvPath = '{{ site.baseurl }}/resources/boathouse_questions.csv';
      break;
    case 'terminology':
      csvPath = '{{ site.baseurl }}/resources/terminology_questions.csv';
      break;
    default:
      csvPath = '{{ site.baseurl }}/resources/safety_questions.csv';
  }
  
  // Update the quiz title and description
  document.getElementById('current-quiz-title').innerText = quizTitles[quizType];
  document.getElementById('quiz-description').innerText = quizDescriptions[quizType];
  
  // Show loading indicator before loading the quiz
  showQuizLoading();
  
  // Load the quiz in the iframe using the special embed version with no layout
  const quizUrl = `{{ site.baseurl }}/resources/quiz_module_embed.html?quiz=${quizType}&src=${encodeURIComponent(csvPath)}`;
  console.log('Loading quiz with URL:', quizUrl);
  
  const quizFrame = document.getElementById('quiz-frame');
  
  // Add load event to hide loading indicator when iframe is loaded
  quizFrame.onload = function() {
    hideQuizLoading();
  };
  
  quizFrame.src = quizUrl;
  
  // Show the quiz container
  document.getElementById('quiz-container').classList.remove('hidden');
  
  // Scroll to the quiz with a slight delay for smoother transition
  setTimeout(() => {
    document.getElementById('quiz-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
  
  // Update progress status if needed
  updateQuizStatus(quizType, 'in-progress');
}

// Show quiz loading indicator
function showQuizLoading() {
  if (!document.getElementById('quiz-loading')) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'quiz-loading';
    loadingDiv.className = 'quiz-loading';
    loadingDiv.innerHTML = `
      <div class="loading-spinner"></div>
      <p>Loading quiz content...</p>
    `;
    document.getElementById('quiz-content').appendChild(loadingDiv);
  } else {
    document.getElementById('quiz-loading').style.display = 'flex';
  }
}

// Hide quiz loading indicator
function hideQuizLoading() {
  const loadingElement = document.getElementById('quiz-loading');
  if (loadingElement) {
    loadingElement.style.opacity = '0';
    setTimeout(() => {
      loadingElement.style.display = 'none';
    }, 300);
  }
}

function closeQuiz() {
  // Hide the quiz container
  document.getElementById('quiz-container').classList.add('hidden');
  
  // Clear the iframe
  document.getElementById('quiz-frame').src = '';
  
  // Scroll back to the top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to load saved quiz statuses
function loadQuizStatuses() {
  const quizzes = ['safety', 'boathouse', 'session1', 'session2', 'session3', 'session4', 'terminology'];
  
  quizzes.forEach(quiz => {
    const status = localStorage.getItem(`quiz_${quiz}_status`);
    if (status) {
      updateQuizStatus(quiz, status);
    }
  });
}

// Function to update quiz status
function updateQuizStatus(quizId, status) {
  // Update in progress grid
  const progressItem = document.querySelector(`.progress-item[data-quiz-id="${quizId}"] .progress-status`);
  if (progressItem) {
    progressItem.className = `progress-status ${status}`;
    
    if (status === 'completed') {
      progressItem.textContent = 'Completed';
    } else if (status === 'in-progress') {
      progressItem.textContent = 'In progress';
    } else {
      progressItem.textContent = 'Not started';
    }
  }
  
  // Update in dashboard
  const dashboardItems = document.querySelectorAll(`.quiz-card[data-quiz-id="${quizId}"] .quiz-status`);
  dashboardItems.forEach(dashboardItem => {
    dashboardItem.className = `quiz-status ${status}`;
    
    if (status === 'completed') {
      dashboardItem.innerHTML = '✓ Completed';
    } else if (status === 'in-progress') {
      dashboardItem.innerHTML = '○ In Progress';
    } else {
      dashboardItem.innerHTML = '○ Not Started';
    }
  });
  
  // Save status to local storage
  localStorage.setItem(`quiz_${quizId}_status`, status);
}

// Listen for messages from the quiz iframe
window.addEventListener('message', function(event) {
  if (event.data && event.data.quizStatus) {
    const { quizId, status, score } = event.data.quizStatus;
    updateQuizStatus(quizId, status);
    
    if (score !== undefined) {
      localStorage.setItem(`quiz_${quizId}_score`, score);
    }
  }
});

// Handle tab navigation
document.addEventListener('DOMContentLoaded', function() {
  // Set session-quizzes tab as active by default
  document.querySelector('.tabs').innerHTML = `
    <button class="tab-button active" data-tab="session-quizzes">Session Quizzes</button>
    <button class="tab-button" data-tab="safety-quizzes">Safety Quizzes</button>
    <button class="tab-button" data-tab="topic-quizzes">Topic-Specific Quizzes</button>
  `;
  
  // Add event listeners to tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked button and corresponding tab
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    });
  });
  
  // Load saved quiz statuses
  loadQuizStatuses();
});
</script>

<style>
/* Page header styles */
.page-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.page-description {
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
}

/* Progress grid styles */
.quiz-progress {
  margin: 2rem 0;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.progress-item {
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.progress-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  border-color: var(--theme-color);
}

.progress-item-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.progress-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
  transition: transform 0.2s ease;
}

.progress-item:hover .progress-icon {
  transform: scale(1.15);
}

.progress-label {
  font-weight: bold;
  margin-bottom: 0.7rem;
  font-size: 1.1rem;
  color: #333;
}

.progress-status {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
  border-radius: 20px;
  display: inline-block;
  font-weight: 500;
}

.progress-status.not-started {
  background-color: #f1f1f1;
  color: #666;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.progress-status.in-progress {
  background-color: #cce5ff;
  color: #004085;
  box-shadow: 0 2px 5px rgba(0,70,150,0.1);
}

.progress-status.completed {
  background-color: #d4edda;
  color: #155724;
  box-shadow: 0 2px 5px rgba(21,87,36,0.1);
  position: relative;
}

.progress-status.completed::before {
  content: "✓";
  margin-right: 3px;
}

/* Tab styles */
.tabs {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #dee2e6;
  margin: 2.5rem 0 2rem;
  flex-wrap: wrap;
  position: relative;
}

.tab-button {
  padding: 0.9rem 1.5rem;
  margin: 0 0.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.25s;
  color: #555;
  font-size: 1.05rem;
  position: relative;
  overflow: hidden;
}

.tab-button:hover {
  background-color: #f8f9fa;
  color: var(--theme-color);
}

.tab-button.active {
  border-bottom-color: var(--theme-color);
  color: var(--theme-color);
}

.tab-button.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--theme-color);
  animation: tabActivate 0.3s ease forwards;
}

@keyframes tabActivate {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.tab {
  display: none;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.tab.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Quiz grid styles */
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.8rem;
  margin: 2rem 0;
  max-width: 1200px;
}

/* Quiz card styles */
.quiz-card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.35s ease;
  border: 1px solid #f0f0f0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.quiz-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.12);
}

.quiz-card.featured-card {
  border: 2px solid #dc3545;
  position: relative;
}

.quiz-card.featured-card::before {
  content: "";
  position: absolute;
  top: -8px;
  right: 20px;
  width: 30px;
  height: 30px;
  background-color: #dc3545;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  z-index: 2;
}

.quiz-card-header {
  background-color: var(--theme-color);
  color: white;
  padding: 1.2rem 1.3rem;
  position: relative;
}

.featured-card .quiz-card-header {
  background-color: #dc3545;
  background-image: linear-gradient(135deg, #dc3545, #e83e8c);
}

.quiz-card-header h4 {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
}

.required-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  color: #dc3545;
  padding: 0.35rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quiz-card-body {
  padding: 1.8rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.quiz-requirement {
  font-size: 0.9rem;
  color: #dc3545;
  margin: 0.8rem 0;
  font-weight: 500;
  padding: 0.6rem 0.8rem;
  background-color: rgba(220,53,69,0.08);
  border-radius: 6px;
  border-left: 3px solid #dc3545;
}

.quiz-status {
  margin: 1.2rem 0;
  padding: 0.7rem;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
}

.quiz-status.not-started {
  background-color: #f5f5f5;
  color: #666;
  border-left: 4px solid #ced4da;
}

.quiz-status.in-progress {
  background-color: #e2f0fd;
  color: #0056b3;
  border-left: 4px solid #0d6efd;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.2); }
  70% { box-shadow: 0 0 0 6px rgba(13, 110, 253, 0); }
  100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0); }
}

.quiz-status.completed {
  background-color: #e0f7e9;
  color: #155724;
  border-left: 4px solid #198754;
}

.quiz-link {
  display: block;
  background-color: var(--theme-color);
  color: white;
  text-align: center;
  padding: 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: auto;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0,102,204,0.25);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.95rem;
  border: none;
  position: relative;
  overflow: hidden;
}

.featured-card .quiz-link {
  background-color: #dc3545;
  background-image: linear-gradient(135deg, #dc3545, #e83e8c);
  box-shadow: 0 4px 8px rgba(220,53,69,0.25);
}

.quiz-link:hover {
  background-color: var(--theme-color-dark);
  text-decoration: none;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,102,204,0.3);
}

.quiz-link::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 100%;
  top: 0;
  left: -50px;
  background-color: rgba(255, 255, 255, 0.2);
  transform: skewX(-20deg);
  transition: all 0.5s;
}

.quiz-link:hover::after {
  left: 110%;
  transition: all 0.5s;
}

.featured-card .quiz-link:hover {
  background-color: #bd2130;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(220,53,69,0.3);
}

/* Quiz container styles */
#quiz-container {
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem;
  margin: 3rem 0;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: all 0.5s ease;
  border: 1px solid #f0f0f0;
  position: relative;
}

#quiz-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--theme-color), #4d94ff);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.quiz-header {
  margin-bottom: 2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.quiz-controls {
  display: flex;
  justify-content: center;
  margin-top: 2.2rem;
  padding-top: 1rem;
  border-top: 1px solid #f5f5f5;
}

.back-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(108,117,125,0.25);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
}

.back-button::before {
  content: "←";
  margin-right: 8px;
  display: inline-block;
  transition: transform 0.2s ease;
}

.back-button:hover {
  background-color: #5a6268;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(108,117,125,0.3);
}

.back-button:hover::before {
  transform: translateX(-3px);
}

.hidden {
  display: none !important;
}
</style>
