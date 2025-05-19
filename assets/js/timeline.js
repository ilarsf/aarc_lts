/* filepath: /Users/larsf/Dropbox (Personal)/AARC/GitHub/aarc_lts/assets/js/timeline.js */

document.addEventListener('DOMContentLoaded', function () {
    // This script will handle any interactive functionality for timelines

    // Example: Highlight the current session in the progress timeline
    // This could be enhanced to use actual progress data from the user's records
    const progressStep = document.querySelector('.timeline-step[data-current="true"]');
    if (progressStep) {
        progressStep.classList.add('active');

        // Mark all previous steps as completed
        let prevStep = progressStep.previousElementSibling;
        while (prevStep) {
            prevStep.classList.add('completed');
            prevStep = prevStep.previousElementSibling;
        }
    }

    // Add click functionality to timeline steps for navigation (if needed)
    const timelineSteps = document.querySelectorAll('.timeline-step[data-url]');
    timelineSteps.forEach(step => {
        step.addEventListener('click', function () {
            if (this.dataset.url) {
                window.location.href = this.dataset.url;
            }
        });

        // Add a cursor pointer if it's clickable
        if (step.dataset.url) {
            step.style.cursor = 'pointer';
        }
    });
});
