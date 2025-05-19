// Script to manage tab functionality

console.log('tabs.js loaded and running');

// Function to initialize all tabs on the page
function initTabs() {
    // Initialize all tab containers
    const tabContainers = document.querySelectorAll('.tab-container');

    tabContainers.forEach(container => {
        // Get all tab buttons within this container - support both tab-button and tab-link classes
        const tabButtons = container.querySelectorAll('.tab-button, .tab-link');
        const tabContents = container.querySelectorAll('.tab-content');

        // Check for hash in URL to activate specific tab
        const hash = window.location.hash;
        let activeTabSet = false;

        if (hash) {
            let hashValue = hash.substring(1);

            // Check if we need to map a section ID to a tab ID
            if (window.sectionToTabMap && window.sectionToTabMap[hashValue]) {
                hashValue = window.sectionToTabMap[hashValue];
            }

            // Try to find a tab matching the hash
            const targetTab = document.getElementById(hashValue);
            if (targetTab && targetTab.classList.contains('tab-content')) {
                // Find the corresponding button (support both tab-button and tab-link)
                const tabButton = container.querySelector(`.tab-button[data-tab="${hashValue}"], .tab-link[data-tab="${hashValue}"]`);
                if (tabButton) {
                    // Activate this tab
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));

                    tabButton.classList.add('active');
                    targetTab.classList.add('active');
                    activeTabSet = true;

                    // Scroll to tab container
                    setTimeout(() => {
                        window.scrollTo({
                            top: container.offsetTop - 20,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        }

        // Add click event listeners to each tab button in this container
        tabButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Tab button clicked:', this.textContent.trim(), 'data-tab:', this.getAttribute('data-tab'));

                // Get the tab id from the data-tab attribute
                const tabId = this.getAttribute('data-tab');

                // Remove active class from all tab buttons in this container
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to the clicked button
                this.classList.add('active');

                // Hide all tab contents in this container
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });                // Show the selected tab content
                const selectedTab = document.getElementById(tabId);
                if (selectedTab) {
                    selectedTab.classList.add('active');

                    // Update URL hash for direct linking
                    if (history.pushState) {
                        history.pushState(null, null, '#' + tabId);
                    } else {
                        location.hash = '#' + tabId;
                    }
                }
            });
        });

        // Activate the first tab by default if none is active
        if (!activeTabSet && tabButtons.length > 0) {
            tabButtons[0].classList.add('active');
            if (tabContents.length > 0) {
                tabContents[0].classList.add('active');
            }
        }
    });
}

// Initialize tabs when DOM is ready with error handling
document.addEventListener('DOMContentLoaded', function () {
    try {
        console.log('DOM loaded, calling initTabs()');
        initTabs();
    } catch (error) {
        console.error('Error initializing tabs:', error);
    }
});

// Also initialize directly in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function () {
        try {
            console.log('Document already ready, calling initTabs() with timeout');
            initTabs();
        } catch (error) {
            console.error('Error initializing tabs with timeout:', error);
        }
    }, 100); // Small delay to ensure DOM is fully available
}
