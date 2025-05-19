// Category Tabs JavaScript for Terminology Page
document.addEventListener('DOMContentLoaded', function () {
    // Set up tabs functionality for category-based tabs
    const tabButtons = document.querySelectorAll('.az-tab-button');
    const tabContents = document.querySelectorAll('.az-tab-content');

    // Set first tab as active by default
    if (tabContents.length > 0 && tabButtons.length > 0) {
        tabContents[0].classList.add('active');
        tabButtons[0].classList.add('active');
    }

    // Function to switch active tab
    function setActiveTab(category) {
        // Hide all tab contents
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });

        // Deactivate all tab buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Activate selected tab button and content
        document.querySelector(`.az-tab-button[data-letter="${category}"]`).classList.add('active');
        document.querySelector(`.az-tab-content[id="letter-${category}"]`).classList.add('active');
    }

    // Add click event to tab buttons
    tabButtons.forEach(button => {
        if (!button.classList.contains('disabled')) {
            button.addEventListener('click', function () {
                const category = this.getAttribute('data-letter');
                setActiveTab(category);
            });
        }
    });

    // Set up search functionality
    const searchInput = document.getElementById('glossary-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const allTerms = document.querySelectorAll('.az-glossary-term');
            const allDefinitions = document.querySelectorAll('.az-glossary-definition');

            // If search is empty, show all terms and don't change active tab
            if (searchTerm === '') {
                // Show all terms
                allTerms.forEach((term, index) => {
                    term.style.display = 'block';
                    if (index < allDefinitions.length) {
                        allDefinitions[index].style.display = 'block';
                    }
                });

                // Keep current tab active or set to first tab
                const activeTab = document.querySelector('.az-tab-button.active');
                if (!activeTab && tabButtons.length > 0) {
                    setActiveTab(tabButtons[0].getAttribute('data-letter'));
                }

                return;
            }

            // Make the "All Terms" tab active when searching
            setActiveTab('all');

            // Filter terms
            allTerms.forEach((term, index) => {
                const termText = term.textContent.toLowerCase();
                if (index < allDefinitions.length) {
                    const definitionText = allDefinitions[index].textContent.toLowerCase();

                    if (termText.includes(searchTerm) || definitionText.includes(searchTerm)) {
                        term.style.display = 'block';
                        allDefinitions[index].style.display = 'block';
                    } else {
                        term.style.display = 'none';
                        allDefinitions[index].style.display = 'none';
                    }
                }
            });
        });
    }
});
