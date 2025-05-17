/**
 * Quiz Integration Components JavaScript
 * This script handles the interactive features of the quiz components embedded in the learner materials.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Toggle knowledge check answers
    const toggleButtons = document.querySelectorAll('.toggle-answer, .mini-quiz-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const answerDiv = this.nextElementSibling;
            answerDiv.classList.toggle('hidden');
            this.textContent = answerDiv.classList.contains('hidden') ? 'Show Answer' : 'Hide Answer';
        });
    });

    // Quiz progress tracking using localStorage
    updateQuizProgress();

    // Check if there's a quiz dashboard that needs initialization
    initializeQuizDashboard();
});

/**
 * Updates the quiz progress indicators based on localStorage data
 */
function updateQuizProgress() {
    const progressItems = document.querySelectorAll('.progress-item');

    if (!progressItems.length) return;

    progressItems.forEach(item => {
        const quizId = item.getAttribute('data-quiz-id');
        const statusEl = item.querySelector('.progress-status');

        if (quizId && statusEl) {
            const quizStatus = getQuizStatus(quizId);

            if (quizStatus === 'completed') {
                statusEl.textContent = 'Completed';
                statusEl.className = 'progress-status completed';
            } else if (quizStatus === 'in-progress') {
                statusEl.textContent = 'In Progress';
                statusEl.className = 'progress-status in-progress';
            } else {
                statusEl.textContent = 'Not Started';
                statusEl.className = 'progress-status not-started';
            }
        }
    });
}

/**
 * Gets the completion status of a quiz from localStorage
 * @param {string} quizId - The ID of the quiz to check
 * @returns {string} - The status of the quiz: 'completed', 'in-progress', or 'not-started'
 */
function getQuizStatus(quizId) {
    try {
        const quizData = localStorage.getItem('aarc_quiz_' + quizId);

        if (!quizData) return 'not-started';

        const parsedData = JSON.parse(quizData);

        if (parsedData.completed) {
            return 'completed';
        } else if (parsedData.started) {
            return 'in-progress';
        }

        return 'not-started';
    } catch (e) {
        console.error('Error getting quiz status:', e);
        return 'not-started';
    }
}

/**
 * Initializes the quiz dashboard with dynamic content if present
 */
function initializeQuizDashboard() {
    const dashboardEl = document.getElementById('quizzes-dashboard');

    if (!dashboardEl) return;

    // This could be enhanced to dynamically load quiz data
    // or update the status indicators for each quiz

    const quizCards = dashboardEl.querySelectorAll('.quiz-card');

    quizCards.forEach(card => {
        const quizId = card.getAttribute('data-quiz-id');
        const statusEl = card.querySelector('.quiz-status');

        if (quizId && statusEl) {
            const status = getQuizStatus(quizId);
            updateQuizCardStatus(statusEl, status);
        }
    });
}

/**
 * Updates a quiz card status indicator
 * @param {Element} statusEl - The status element to update
 * @param {string} status - The quiz status
 */
function updateQuizCardStatus(statusEl, status) {
    statusEl.className = 'quiz-status';

    if (status === 'completed') {
        statusEl.textContent = '✓ Completed';
        statusEl.classList.add('completed');
    } else if (status === 'in-progress') {
        statusEl.textContent = '⟳ In Progress';
        statusEl.classList.add('in-progress');
    } else {
        statusEl.textContent = '○ Not Started';
        statusEl.classList.add('not-started');
    }
}
