// Tab functionality
(function () {
    function initTabs() {
        console.log("Initializing enhanced tabs functionality");

        // Get all tab links
        const tabLinks = document.querySelectorAll('.tab-link');
        if (tabLinks.length === 0) return;

        // Function to activate a specific tab
        function activateTab(tabId) {
            // Remove active class from all tab links and tab contents
            document.querySelectorAll('.tab-link').forEach(link => {
                link.classList.remove('active');
            });

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to target tab link and content
            const targetTab = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
            if (targetTab) targetTab.classList.add('active');

            const targetContent = document.getElementById(tabId);
            if (targetContent) targetContent.classList.add('active');

            // Update URL hash without scrolling
            history.pushState(null, null, `#${tabId}`);

            return true;
        }

        // Add click event to each tab link
        tabLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Get the tab content id from the data-tab attribute
                const tabId = this.getAttribute('data-tab');
                activateTab(tabId);
            });
        });

        // Check if we should activate a tab based on URL hash
        if (window.location.hash) {
            const tabId = window.location.hash.substring(1);
            const tabElement = document.getElementById(tabId);

            // Only try to activate if the tab exists
            if (tabElement && tabElement.classList.contains('tab-content')) {
                activateTab(tabId);
            } else {
                // If hash doesn't correspond to a tab, activate first tab
                const firstTabId = tabLinks[0].getAttribute('data-tab');
                activateTab(firstTabId);
            }
        } else {
            // Activate first tab by default if no hash
            const firstTabId = tabLinks[0].getAttribute('data-tab');
            activateTab(firstTabId);
        }

        // Listen for hash changes
        window.addEventListener('hashchange', function () {
            if (window.location.hash) {
                const tabId = window.location.hash.substring(1);
                const tabElement = document.getElementById(tabId);

                // Only try to activate if the tab exists
                if (tabElement && tabElement.classList.contains('tab-content')) {
                    activateTab(tabId);
                }
            }
        });
    }

    // Initialize tabs when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabs);
    } else {
        initTabs();
    }
})();
