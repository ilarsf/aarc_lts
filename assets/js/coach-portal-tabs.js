// Coach Portal Tab Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Once the coach authentication is successful and content is shown
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.target.style.display === "block" && mutation.target.id === "coach-content") {
                initializeTabs();
                observer.disconnect(); // Stop observing once tabs are initialized
            }
        });
    });

    // Start observing the coach content div
    const coachContent = document.getElementById('coach-content');
    if (coachContent) {
        observer.observe(coachContent, { attributes: true, attributeFilter: ['style'] });
    }

    function initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                // Deactivate all tab buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate the selected tab
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
});
