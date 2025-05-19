// AZ Tabs JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Set up AZ tabs functionality
    const tabButtons = document.querySelectorAll('.az-tab-button');
    const tabContents = document.querySelectorAll('.az-tab-content');

    // Function to switch active tab
    function setActiveTab(letter) {
        // Hide all tab contents
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });

        // Deactivate all tab buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Activate selected tab button and content
        document.querySelector(`.az-tab-button[data-letter="${letter}"]`).classList.add('active');
        document.querySelector(`.az-tab-content[id="letter-${letter}"]`).classList.add('active');
    }

    // Add click event to tab buttons
    tabButtons.forEach(button => {
        if (!button.classList.contains('disabled')) {
            button.addEventListener('click', function () {
                const letter = this.getAttribute('data-letter');
                setActiveTab(letter);
            });
        }
    });

    // Set up glossary search functionality
    const searchInput = document.getElementById('glossary-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const allTerms = document.querySelectorAll('.az-glossary-term');
            const allDefinitions = document.querySelectorAll('.az-glossary-definition');

            // If search is empty, show all tabs and set first tab active
            if (searchTerm === '') {
                const firstActiveButton = document.querySelector('.az-tab-button:not(.disabled)');
                if (firstActiveButton) {
                    setActiveTab(firstActiveButton.getAttribute('data-letter'));
                }

                // Show all terms
                allTerms.forEach((term, index) => {
                    term.style.display = 'block';
                    allDefinitions[index].style.display = 'block';
                });

                return;
            }

            // Track which tabs have matching terms
            const tabsWithMatches = new Set();

            // Filter terms
            allTerms.forEach((term, index) => {
                const termText = term.textContent.toLowerCase();
                const definitionText = allDefinitions[index].textContent.toLowerCase();
                const letterContainer = term.closest('.az-tab-content');

                if (termText.includes(searchTerm) || definitionText.includes(searchTerm)) {
                    term.style.display = 'block';
                    allDefinitions[index].style.display = 'block';

                    const letter = letterContainer.id.replace('letter-', '');
                    tabsWithMatches.add(letter);
                } else {
                    term.style.display = 'none';
                    allDefinitions[index].style.display = 'none';
                }
            });

            // Set active tab if there are matches
            if (tabsWithMatches.size > 0) {
                // Try to set active to first tab with matches
                const firstMatchTab = [...tabsWithMatches][0];
                setActiveTab(firstMatchTab);
            }
        });
    }
});
