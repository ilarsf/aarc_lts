document.addEventListener('DOMContentLoaded', function () {
    // Get all tab links
    const tabLinks = document.querySelectorAll('.tab-link');

    // Add click event listener to each tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the tab id from the data attribute
            const tabId = this.getAttribute('data-tab');

            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'none';
            });

            // Remove active class from all tab links
            tabLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Show the selected tab content and mark tab as active
            document.getElementById(tabId).style.display = 'block';
            this.classList.add('active');
        });
    });

    // Display the first tab by default
    if (tabLinks.length > 0) {
        tabLinks[0].click();
    }
});