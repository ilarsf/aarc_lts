// Script to manage accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all accordion sections
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            // Toggle the active class on the button
            this.classList.toggle('active');

            // Get the target content
            const content = this.nextElementSibling;

            // Toggle the content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Function to expand all sections
    window.expandAllSections = function () {
        accordionToggles.forEach(toggle => {
            const content = toggle.nextElementSibling;
            if (!content.style.maxHeight) {
                toggle.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    // Function to collapse all sections
    window.collapseAllSections = function () {
        accordionToggles.forEach(toggle => {
            const content = toggle.nextElementSibling;
            if (content.style.maxHeight) {
                toggle.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    }

    // Add event listeners for expand/collapse all buttons
    const expandAllBtn = document.getElementById('expand-all');
    const collapseAllBtn = document.getElementById('collapse-all');

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', window.expandAllSections);
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', window.collapseAllSections);
    }
});
