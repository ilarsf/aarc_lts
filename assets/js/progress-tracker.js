/**
 * Progress Tracker JavaScript
 * Handles interactive skill tracking and self-assessment functionality
 * for the AARC Learn to Scull Program
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all progress tracking elements
    initializeProgressTrackers();
    initializeSkillChecklist();
    initializeSaveLoadFunctionality();
});

/**
 * Initialize all progress bar elements
 */
function initializeProgressTrackers() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const slider = bar.querySelector('input[type="range"]');
        const progressIndicator = bar.querySelector('.progress-indicator');
        const valueDisplay = bar.querySelector('.progress-value');

        if (slider && progressIndicator) {
            // Set initial position based on saved value or default
            const skillId = bar.closest('.skill-item').dataset.skillId;
            const savedValue = getSavedSkillValue(skillId);

            if (savedValue !== null) {
                slider.value = savedValue;
                updateProgressDisplay(progressIndicator, valueDisplay, savedValue);
            }

            // Add event listener for changes
            slider.addEventListener('input', function () {
                const value = this.value;
                updateProgressDisplay(progressIndicator, valueDisplay, value);
                saveSkillValue(skillId, value);
            });
        }
    });
}

/**
 * Update the visual display of progress
 */
function updateProgressDisplay(progressIndicator, valueDisplay, value) {
    if (progressIndicator) {
        progressIndicator.style.width = `${value}%`;
    }

    if (valueDisplay) {
        valueDisplay.textContent = `${value}%`;
    }
}

/**
 * Initialize all skill checklist items
 */
function initializeSkillChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');

    checklistItems.forEach(item => {
        const itemId = item.id;
        const isSaved = getSavedChecklistItem(itemId);

        // Set initial state based on saved data
        if (isSaved === 'true') {
            item.checked = true;
        }

        // Add event listener for changes
        item.addEventListener('change', function () {
            saveChecklistItem(itemId, this.checked);
            updateCategoryProgress(this);
        });
    });

    // Initialize all category progress
    document.querySelectorAll('.checklist-category').forEach(category => {
        updateCategoryProgressDisplay(category);
    });
}

/**
 * Update the progress for a category when a checkbox is changed
 */
function updateCategoryProgress(checkboxElement) {
    const category = checkboxElement.closest('.checklist-category');
    updateCategoryProgressDisplay(category);
}

/**
 * Calculate and display the progress for a category
 */
function updateCategoryProgressDisplay(category) {
    if (!category) return;

    const checkboxes = category.querySelectorAll('input[type="checkbox"]');
    const totalItems = checkboxes.length;
    const checkedItems = Array.from(checkboxes).filter(cb => cb.checked).length;

    const progressBar = category.querySelector('.category-progress .progress-indicator');
    const progressText = category.querySelector('.category-progress .progress-value');

    if (progressBar && progressText && totalItems > 0) {
        const progressPercent = Math.round((checkedItems / totalItems) * 100);
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${checkedItems}/${totalItems}`;
    }
}

/**
 * Save/Load functionality using localStorage
 */
function getSavedSkillValue(skillId) {
    const key = `aarc-skill-${skillId}`;
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : null;
}

function saveSkillValue(skillId, value) {
    const key = `aarc-skill-${skillId}`;
    localStorage.setItem(key, value);
}

function getSavedChecklistItem(itemId) {
    const key = `aarc-check-${itemId}`;
    return localStorage.getItem(key);
}

function saveChecklistItem(itemId, isChecked) {
    const key = `aarc-check-${itemId}`;
    localStorage.setItem(key, isChecked);
}

/**
 * Initialize functionality to save/load progress data
 */
function initializeSaveLoadFunctionality() {
    const saveButton = document.getElementById('save-progress');
    const resetButton = document.getElementById('reset-progress');
    const exportButton = document.getElementById('export-progress');

    if (saveButton) {
        saveButton.addEventListener('click', function () {
            // Save logic would be implemented here
            alert('Your progress has been saved!');
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', function () {
            if (confirm('Are you sure you want to reset all your progress?')) {
                resetAllProgress();
            }
        });
    }

    if (exportButton) {
        exportButton.addEventListener('click', function () {
            exportProgressData();
        });
    }
}

/**
 * Reset all tracking data
 */
function resetAllProgress() {
    // Find all localStorage keys related to our tracking
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('aarc-skill-') || key.startsWith('aarc-check-')) {
            keysToRemove.push(key);
        }
    }

    // Remove all keys
    keysToRemove.forEach(key => localStorage.removeItem(key));

    // Refresh page to update UI
    location.reload();
}

/**
 * Export progress data as downloadable JSON
 */
function exportProgressData() {
    const progressData = {};

    // Collect all data from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('aarc-skill-') || key.startsWith('aarc-check-')) {
            progressData[key] = localStorage.getItem(key);
        }
    }

    // Create and trigger download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progressData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "aarc-sculling-progress.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
