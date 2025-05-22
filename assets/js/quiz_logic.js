// --- Shared Quiz Logic ---

// --- Global State (managed by the shared logic) ---
let allQuestions = [];        // All unique questions loaded from a CSV
let currentQuestions = [];    // Active set of questions for the current quiz (e.g., 15 random ones)
let currentQuestionIndex = 0;
let score = 0;                // Generic score, can be % or count based on module
let correctAnswersCount = 0;  // Explicit count of correct answers
let timer = 0;
let timerInterval = null;
let userAnswers = [];         // Stores original indices of answers selected by the user
let quizComplete = false;

const DEFAULT_QUESTIONS_TO_SELECT = 15;
let numberOfQuestionsToSelect = DEFAULT_QUESTIONS_TO_SELECT;

// --- DOM Element References (to be populated by each module via init) ---
let dom = {
    // Start Screen
    startScreen: null, // ADDED: Reference to the start screen container
    startButton: null,
    loadingMessage: null,
    errorMessage: null,
    // Quiz Screen
    quizScreen: null,
    questionCounter: null,
    timerDisplay: null,
    scoreDisplay: null,
    questionText: null,
    answersContainer: null,
    feedback: null,
    feedbackText: null,
    progressBarContainer: null, // Added: Reference to the progress bar's container
    progressBar: null,        // Embed only
    changeQuizButton: null, // RE-ADD: Button to go back to quiz selection
    // Results Screen
    resultsScreen: null,
    correctCountDisplay: null, // Element to show number of correct answers
    totalQuestionsDisplay: null,// Element to show total questions in current quiz
    timeTakenDisplay: null,
    finalScoreDisplay: null,   // Element to show final score (e.g., percentage)
    feedbackMessageDisplay: null, // General feedback message on results
    // Review Screen
    reviewScreen: null,
    reviewContainer: null,
    // Buttons (common)
    restartButton: null,
    reviewButton: null,
    // Module-specific buttons (optional, to be wired by module\'s init)
    // reviewBackButton: null,    // Embed // REMOVED - consolidated to returnToResultsButton
    returnToResultsButton: null, // Main (back from review to results)
    returnToParentPageButton: null, // Main (back to referring page)
    // Main module specific UI for quiz selection
    quizSelectDropdown: null,
    quizTitleElement: null,
    quizDescriptionElement: null,
    startScreenTitle: null, // e.g., h2 on start screen
};

// --- Configuration (to be set by each module via init) ---
let config = {
    quizId: null,             // For localStorage or other tracking
    isEmbedded: false,
    fetchCsvUrl: null,        // Function or string to get the CSV URL
    onQuizEndCallbacks: [],   // Array of functions to call when quiz ends
    onQuestionsLoadedCallbacks: [], // Array of functions after questions are fetched and processed
    moduleUsesProgressBar: false,
    moduleUsesDetailedFeedbackMessage: false, // e.g. the specific %-based messages
    moduleHandlesHighScore: false,
    modulePostsToParent: false,
};

// --- Helper Functions ---
function shuffleArray(array) {
    let newArray = [...array]; // Create a copy to avoid modifying the original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// --- CSV Parsing ---
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() && !line.startsWith('//'));
    if (lines.length === 0) return [];

    // const headers = lines[0].split(',').map(header => header.trim().replace(/^"(.*)"$/, '$1')); // Headers not explicitly used later
    const questions = [];

    for (let i = 1; i < lines.length; i++) { // Start at 1 to skip header row
        const line = lines[i].trim();
        if (!line) continue;

        const values = [];
        let fieldStart = 0;
        let inQuotes = false;
        for (let j = 0; j < line.length; j++) {
            if (line[j] === '"' && (j === 0 || line[j - 1] !== '\\')) { // Handle escaped quotes if any, though current CSVs don't use them
                inQuotes = !inQuotes;
            } else if (line[j] === ',' && !inQuotes) {
                values.push(line.substring(fieldStart, j).trim().replace(/^"(.*)"$/, '$1'));
                fieldStart = j + 1;
            }
        }
        values.push(line.substring(fieldStart).trim().replace(/^"(.*)"$/, '$1'));

        if (values.length < 7) { // Expecting at least ID, Text, 4 Answers, CorrectIndex
            console.warn('Skipping malformed CSV line:', line);
            continue;
        }

        const question = {
            id: values[0] || `Q${i}`,
            text: values[1] || 'Question text missing',
            answers: [values[2], values[3], values[4], values[5]].map(a => a || '').filter(a => a.trim() !== '' && a !== 'null' && a !== 'undefined'),
            correctIndex: parseInt(values[6]) - 1, // Convert from 1-indexed to 0-indexed
            explanation: values[7] || 'No explanation provided'
        };

        if (question.text && question.answers.length >= 2 && !isNaN(question.correctIndex) && question.correctIndex < question.answers.length) {
            questions.push(question);
        } else {
            console.warn('Skipping invalid question due to missing data or invalid correctIndex:', line, question);
        }
    }
    return questions;
}

// --- Core Quiz Logic ---

function startSharedTimer() {
    if (timerInterval) clearInterval(timerInterval); // Clear any existing timer
    timer = 0;
    if (dom.timerDisplay) dom.timerDisplay.textContent = `Time: ${formatTime(timer)}`;
    timerInterval = setInterval(() => {
        timer++;
        if (dom.timerDisplay) dom.timerDisplay.textContent = `Time: ${formatTime(timer)}`;
    }, 1000);
}

function resetAndStartNewQuiz() {
    console.log("Resetting and starting new quiz...");
    quizComplete = false;
    currentQuestionIndex = 0;
    score = 0; // Generic score, can be used as needed
    correctAnswersCount = 0; // Specific count of correct answers
    timer = 0;

    // Select questions for the current quiz session
    if (allQuestions.length === 0) {
        console.error("No questions available to start the quiz.");
        if (dom.errorMessage) {
            dom.errorMessage.textContent = "Error: No questions loaded to start the quiz.";
            dom.errorMessage.classList.remove('hidden');
        }
        // Ensure start button is re-enabled if it was disabled
        if (dom.startButton) dom.startButton.disabled = false;
        if (dom.loadingMessage) dom.loadingMessage.classList.add('hidden');
        return;
    }

    if (allQuestions.length > numberOfQuestionsToSelect) {
        currentQuestions = shuffleArray(allQuestions).slice(0, numberOfQuestionsToSelect);
        console.log(`Randomly selected ${numberOfQuestionsToSelect} questions.`);
    } else {
        currentQuestions = shuffleArray(allQuestions); // Shuffle even if fewer than N
        console.log(`Using all ${currentQuestions.length} available questions (shuffled).`);
    }

    userAnswers = Array(currentQuestions.length).fill(null);

    // UI updates
    if (dom.startScreen) dom.startScreen.classList.add('hidden');
    if (dom.resultsScreen) dom.resultsScreen.classList.add('hidden');
    if (dom.reviewScreen) dom.reviewScreen.classList.add('hidden');
    if (dom.quizScreen) dom.quizScreen.classList.remove('hidden');
    if (dom.errorMessage) dom.errorMessage.classList.add('hidden');

    // Show/hide progress bar container based on config
    if (dom.progressBarContainer) {
        if (config.moduleUsesProgressBar) {
            dom.progressBarContainer.classList.remove('hidden');
        } else {
            dom.progressBarContainer.classList.add('hidden');
        }
    }

    // Show "Change Quiz" button only on main page, not embedded, and only if quiz has started
    if (dom.changeQuizButton) {
        if (!config.isEmbedded) {
            dom.changeQuizButton.classList.remove('hidden');
        } else {
            dom.changeQuizButton.classList.add('hidden');
        }
    }

    // Ensure the main "Return to Page" button is visible on quiz screen for non-embedded version
    if (dom.returnToParentPageButton && !config.isEmbedded) {
        dom.returnToParentPageButton.classList.remove('hidden');
    } else if (dom.returnToParentPageButton) {
        dom.returnToParentPageButton.classList.add('hidden');
    }

    startSharedTimer();
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        console.warn("Attempted to display question beyond array length. Ending quiz.");
        endCurrentQuiz();
        return;
    }
    const question = currentQuestions[currentQuestionIndex];

    // Update progress
    if (dom.questionCounter) {
        dom.questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${currentQuestions.length}`;
    }
    // Ensure progressBarContainer is visible if moduleUsesProgressBar is true
    if (config.moduleUsesProgressBar && dom.progressBarContainer && dom.progressBarContainer.classList.contains('hidden')) {
        dom.progressBarContainer.classList.remove('hidden');
    }
    if (config.moduleUsesProgressBar && dom.progressBar) {
        dom.progressBar.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;
    }
    if (dom.scoreDisplay) { // This might display correctAnswersCount or a percentage score
        dom.scoreDisplay.textContent = `Score: ${correctAnswersCount}`; // Default to count
    }

    if (dom.questionText) dom.questionText.textContent = question.text;

    if (dom.answersContainer) {
        dom.answersContainer.innerHTML = ''; // Clear previous answers

        let answerObjects = question.answers.map((answerText, originalIndex) => {
            return { text: answerText, originalIndex: originalIndex };
        });
        let shuffledAnswerObjects = shuffleArray(answerObjects);

        shuffledAnswerObjects.forEach((answerObj) => {
            const answerElement = document.createElement('button'); // Changed from div to button
            answerElement.className = 'answer-button'; // Use .answer-button for styling from quiz-integration.css
            answerElement.textContent = answerObj.text;
            answerElement.dataset.originalIndex = answerObj.originalIndex;
            answerElement.addEventListener('click', handleAnswerSelection);
            dom.answersContainer.appendChild(answerElement);
        });
    }

    if (dom.feedback) dom.feedback.classList.add('hidden');
}

function handleAnswerSelection(event) {
    if (dom.answersContainer.querySelector('.answer-button.selected')) {
        return; // Prevent selecting multiple answers or re-selecting
    }

    const selectedAnswerElement = event.target;
    const selectedOriginalIndex = parseInt(selectedAnswerElement.dataset.originalIndex);
    const question = currentQuestions[currentQuestionIndex];

    // Clear existing selections/highlights from other buttons if any (though logic should prevent re-click)
    // dom.answersContainer.querySelectorAll(\'.answer-button.selected\').forEach(btn => btn.classList.remove(\'selected\'));
    // dom.answersContainer.querySelectorAll(\'.answer-button.correct\').forEach(btn => btn.classList.remove(\'correct\'));
    // dom.answersContainer.querySelectorAll(\'.answer-button.incorrect\').forEach(btn => btn.classList.remove(\'incorrect\'));


    selectedAnswerElement.classList.add('selected');
    userAnswers[currentQuestionIndex] = selectedOriginalIndex;

    const isCorrect = selectedOriginalIndex === question.correctIndex;
    if (isCorrect) {
        selectedAnswerElement.classList.add('correct');
        correctAnswersCount++;
        // Update score display immediately if needed
        if (dom.scoreDisplay) dom.scoreDisplay.textContent = `Score: ${correctAnswersCount}`;
    } else {
        selectedAnswerElement.classList.add('incorrect');
        const correctAnswerElement = dom.answersContainer.querySelector(`.answer-button[data-original-index="${question.correctIndex}"]`);
        if (correctAnswerElement) correctAnswerElement.classList.add('correct');
    }

    if (dom.feedbackText && dom.feedback) {
        dom.feedbackText.innerHTML = `<strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${question.explanation || ''}`;
        dom.feedback.classList.remove('hidden');
    }

    // Disable all answer options after selection
    const answerOptions = dom.answersContainer.querySelectorAll('.answer-button');
    answerOptions.forEach(option => {
        option.removeEventListener('click', handleAnswerSelection);
        option.style.cursor = 'default';
    });

    // Move to next question or end quiz
    setTimeout(() => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayCurrentQuestion();
        } else {
            endCurrentQuiz();
        }
    }, 2500); // Delay for feedback viewing
}

function endCurrentQuiz() {
    if (quizComplete) return; // Prevent multiple calls
    quizComplete = true;

    clearInterval(timerInterval);

    if (dom.quizScreen) dom.quizScreen.classList.add('hidden');
    if (dom.resultsScreen) dom.resultsScreen.classList.remove('hidden');

    // Hide "Change Quiz" button on results screen
    if (dom.changeQuizButton && !config.isEmbedded) {
        dom.changeQuizButton.classList.add('hidden');
    }

    // Ensure the main "Return to Page" button is visible on results screen for non-embedded version
    if (dom.returnToParentPageButton && !config.isEmbedded) {
        dom.returnToParentPageButton.classList.remove('hidden');
    } else if (dom.returnToParentPageButton) {
        dom.returnToParentPageButton.classList.add('hidden');
    }

    const percentage = currentQuestions.length > 0 ? Math.round((correctAnswersCount / currentQuestions.length) * 100) : 0;

    if (dom.correctCountDisplay) dom.correctCountDisplay.textContent = correctAnswersCount;
    if (dom.totalQuestionsDisplay) dom.totalQuestionsDisplay.textContent = currentQuestions.length;
    if (dom.timeTakenDisplay) dom.timeTakenDisplay.textContent = formatTime(timer);
    if (dom.finalScoreDisplay) dom.finalScoreDisplay.textContent = percentage; // Or `${percentage}%`

    if (dom.feedbackMessageDisplay) {
        if (config.moduleUsesDetailedFeedbackMessage) {
            if (percentage >= 90) {
                dom.feedbackMessageDisplay.innerHTML = '<p class="highlight">Excellent work! You have a strong understanding of the material.</p>';
            } else if (percentage >= 80) {
                dom.feedbackMessageDisplay.innerHTML = '<p class="highlight">Good job! You have a solid grasp of the material.</p>';
            } else if (percentage >= 70) {
                dom.feedbackMessageDisplay.innerHTML = '<p>Not bad! You understand most of the material but might want to review some concepts.</p>';
            } else {
                dom.feedbackMessageDisplay.innerHTML = '<p>You might want to review the material and try again to improve your score.</p>';
            }
        } else {
            dom.feedbackMessageDisplay.innerHTML = ''; // Clear if not used, or provide a generic message
        }

        // Handle specific quiz type messages (e.g., safety quiz)
        if ((config.quizId === 'safety' || config.quizId === 'lts-safety') && percentage < 80) {
            let safetyMessage = '<p style="color: #dc3545; font-weight: bold;">A Safety quiz score of at least 80% is recommended before your first on-water session. Please review the safety materials and try again.</p>';
            if (config.moduleUsesDetailedFeedbackMessage) {
                dom.feedbackMessageDisplay.innerHTML += safetyMessage;
            } else {
                dom.feedbackMessageDisplay.innerHTML = safetyMessage;
            }
        }
    }

    // Callbacks and parent posting
    config.onQuizEndCallbacks.forEach(cb => cb(correctAnswersCount, currentQuestions.length, percentage));

    if (config.modulePostsToParent) {
        try {
            window.parent.postMessage({
                quizStatus: {
                    quizId: config.quizId,
                    status: 'completed',
                    score: percentage,
                    correct: correctAnswersCount,
                    total: currentQuestions.length
                }
            }, '*');
        } catch (e) {
            console.error('Error sending completion message to parent:', e);
        }
    }
    // Potentially save high score if config.moduleHandlesHighScore
}

function showReviewScreen() {
    if (dom.resultsScreen) dom.resultsScreen.classList.add('hidden');
    if (dom.reviewScreen) dom.reviewScreen.classList.remove('hidden');

    // Hide "Change Quiz" button on review screen
    if (dom.changeQuizButton && !config.isEmbedded) {
        dom.changeQuizButton.classList.add('hidden');
    }

    // Ensure the main "Return to Page" button is visible on review screen for non-embedded version
    if (dom.returnToParentPageButton && !config.isEmbedded) {
        dom.returnToParentPageButton.classList.remove('hidden');
    } else if (dom.returnToParentPageButton) {
        dom.returnToParentPageButton.classList.add('hidden');
    }

    populateReviewContent();
}

function populateReviewContent() {
    if (!dom.reviewContainer) return;
    dom.reviewContainer.innerHTML = ''; // Clear previous review

    currentQuestions.forEach((question, index) => {
        const userAnswerOriginalIndex = userAnswers[index];
        // const isCorrect = userAnswerOriginalIndex === question.correctIndex; // Already calculated and stored effectively

        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question'; // Matches CSS

        const questionTitle = document.createElement('p');
        questionTitle.className = 'question-title'; // Matches CSS
        questionTitle.innerHTML = `<strong>Question ${index + 1}:</strong> ${question.text}`;
        questionDiv.appendChild(questionTitle);

        const answersList = document.createElement('ul');
        answersList.className = 'review-answers'; // Matches CSS

        question.answers.forEach((answerText, answerIndex) => {
            const answerItem = document.createElement('li');
            answerItem.className = 'answer-option'; // Matches CSS
            answerItem.textContent = answerText;

            if (answerIndex === question.correctIndex) {
                answerItem.classList.add('correct-answer'); // Matches CSS for highlighting the correct answer
            }
            if (answerIndex === userAnswerOriginalIndex) {
                answerItem.classList.add('user-selected'); // Matches CSS for user's selection
                if (userAnswerOriginalIndex !== question.correctIndex) {
                    answerItem.classList.add('incorrect-selection'); // Matches CSS if user selected this and it was wrong
                }
            }
            answersList.appendChild(answerItem);
        });
        questionDiv.appendChild(answersList);

        if (question.explanation) {
            const explanationP = document.createElement('p');
            explanationP.className = 'review-explanation'; // A general class for explanation text
            explanationP.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
            questionDiv.appendChild(explanationP);
        }

        dom.reviewContainer.appendChild(questionDiv);
    });
}


// --- Main Initialization for the shared script ---
function initializeQuizModule(moduleDomElements, moduleConfig) {
    // Merge provided DOM elements and config with defaults/shared structures
    dom = { ...dom, ...moduleDomElements };
    config = { ...config, ...moduleConfig };

    console.log("Quiz Module Initialized with config:", config);
    console.log("DOM elements mapped:", dom);

    // Basic common event listeners
    if (dom.startButton) {
        dom.startButton.addEventListener('click', attemptStartNewQuiz);
    }
    if (dom.restartButton) {
        dom.restartButton.addEventListener('click', resetAndStartNewQuiz);
    }
    if (dom.reviewButton) {
        dom.reviewButton.addEventListener('click', showReviewScreen);
    }

    // RE-ADD: Event listener for the "Change Quiz" button
    if (dom.changeQuizButton) {
        dom.changeQuizButton.addEventListener('click', () => {
            // Navigate to the main quiz selection page
            // Assumes siteBaseUrl is available or can be constructed if needed.
            window.location.href = (config.siteBaseUrl || '') + '/for-learners/resources/quizzes.html';
        });
    }

    // Module-specific initial UI setup (e.g., populating dropdown, handling URL params)
    // This part is often handled by the calling HTML's inline script before/after calling initializeQuizModule
    // For example, the calling script might fetch CSV URL then call another function here to load questions.
}

function attemptStartNewQuiz() {
    if (allQuestions.length === 0 && config.fetchCsvUrl) {
        if (dom.loadingMessage) dom.loadingMessage.classList.remove('hidden');
        if (dom.startButton) dom.startButton.disabled = true;
        if (dom.errorMessage) dom.errorMessage.classList.add('hidden');

        let csvUrl = (typeof config.fetchCsvUrl === 'function') ? config.fetchCsvUrl() : config.fetchCsvUrl;

        if (!csvUrl) {
            console.error("No CSV URL provided to fetch questions.");
            if (dom.errorMessage) {
                dom.errorMessage.textContent = "Cannot start quiz: No question source configured.";
                dom.errorMessage.classList.remove('hidden');
            }
            if (dom.loadingMessage) dom.loadingMessage.classList.add('hidden');
            if (dom.startButton) dom.startButton.disabled = false; // Re-enable if possible
            return;
        }

        loadAndProcessQuestions(csvUrl)
            .then(() => {
                if (allQuestions.length > 0) {
                    resetAndStartNewQuiz(); // This will hide start screen, etc.
                } else {
                    // Error already handled in loadAndProcessQuestions
                    if (dom.startButton) dom.startButton.disabled = false; // Re-enable
                }
            })
            .finally(() => {
                if (dom.loadingMessage) dom.loadingMessage.classList.add('hidden');
            });
    } else if (allQuestions.length > 0) {
        // Questions already loaded, perhaps from a previous run or different selection
        resetAndStartNewQuiz();
    } else {
        console.error("Cannot start quiz: No questions loaded and no CSV URL configured for fetching.");
        if (dom.errorMessage) {
            dom.errorMessage.textContent = "Error: Quiz content not available.";
            dom.errorMessage.classList.remove('hidden');
        }
    }
}


async function loadAndProcessQuestions(csvUrl) {
    try {
        // Ensure the CSV path is properly formatted (especially for embed relative paths)
        let fetchUrl = csvUrl;
        if (config.isEmbedded && csvUrl && !csvUrl.startsWith('http') && !csvUrl.startsWith('/')) {
            // Attempt to construct a path relative to the site root if it's a simple filename
            // This might need adjustment based on actual deployment structure
            const pathSegments = window.location.pathname.split('/');
            pathSegments.pop(); // Remove current HTML filename
            // Assuming 'resources' is where CSVs are, and this script is in 'assets/js'
            // and the HTML is in 'resources'.
            // A direct relative path from HTML like '../resources/file.csv' might be better handled by caller.
            // For now, let's assume csvUrl is either absolute or correctly relative from site root.
            // If it's just 'filename.csv', prefix with '/resources/'
            if (!csvUrl.includes('/')) {
                fetchUrl = '/resources/' + csvUrl; // Common location
            } else if (csvUrl.startsWith('../')) {
                // This is tricky if the base URL isn't what we expect.
                // Best if the embedder provides a full path or path from root.
                // For now, let's assume it's relative from a known structure.
                // This part is fragile and depends on where quiz_module_embed.html is.
                // If quiz_module_embed.html is in /resources/, then ../assets/js/quiz_logic.js
                // and ../resources/file.csv would mean file.csv is in /resources.
                // So, if csvUrl is like 'safety_questions.csv', it should be prefixed.
                // The original embed script did: if (csvSource && !csvSource.startsWith('http') && !csvSource.startsWith('/')) { fetchUrl = '/' + csvSource; }
                // Let's adopt that for non-http, non-absolute paths.
                fetchUrl = '/' + csvUrl;
            }
        }
        console.log('Fetching questions from URL:', fetchUrl);
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status} ${response.statusText} - URL: ${fetchUrl}`);
        }
        const csvText = await response.text();
        allQuestions = parseCSV(csvText);
        console.log(`Parsed ${allQuestions.length} questions.`);

        if (allQuestions.length === 0) {
            throw new Error('No valid questions found in the CSV file.');
        }

        config.onQuestionsLoadedCallbacks.forEach(cb => cb());
        if (dom.startButton && !config.quizSelectDropdown) dom.startButton.disabled = false; // Enable start if not dependent on dropdown

    } catch (error) {
        console.error('Error loading or processing questions:', error);
        if (dom.errorMessage) {
            dom.errorMessage.textContent = `Error loading quiz: ${error.message}`;
            dom.errorMessage.classList.remove('hidden');
        }
        allQuestions = []; // Ensure it's empty on error
    }
}

// Placeholder for the rest of the logic
// function resetAndStartNewQuiz() { console.log("resetAndStartNewQuiz called - to be fully implemented"); }
// function showReviewScreen() { console.log("showReviewScreen called - to be fully implemented"); }
// Remove the above placeholders as they are now implemented.

// Ensure this script doesn't run and break if included in <head> without defer
// Actual initialization should be triggered by the HTML module itself.
console.log("quiz_logic.js loaded");

