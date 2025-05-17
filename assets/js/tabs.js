// Script to manage tab functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');

    // Add click event listeners to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the tab id from the data-tab attribute
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to the clicked button
            this.classList.add('active');

            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show the selected tab content
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        });
    });

    // Activate the first tab by default if none is active
    if (tabButtons.length > 0 && !document.querySelector('.tab-button.active')) {
        const firstTabButton = tabButtons[0];
        firstTabButton.click();
    }
});
