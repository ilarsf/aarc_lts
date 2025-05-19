// Script to manage accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all accordion sections (top level)
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    // Initialize all nested accordion sections (second level)
    const nestedToggles = document.querySelectorAll('.nested-toggle');

    // Handle top-level accordions
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            // Toggle the active class on the button
            this.classList.toggle('active');

            // Get the target content
            const content = this.nextElementSibling;

            // Toggle the content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('visible');
            } else {
                content.style.maxHeight = content.scrollHeight + 2000 + "px"; // Added extra height to ensure full content visibility
                content.classList.add('visible');
            }
        });
    });

    // Handle nested accordions
    nestedToggles.forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            // Prevent event from bubbling to parent accordion
            event.stopPropagation();

            // Toggle the active class on the button
            this.classList.toggle('active');

            // Get the target content
            const content = this.nextElementSibling;

            // Toggle the content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('visible');
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Add extra height for nested content
                content.classList.add('visible');

                // Update parent accordion's height if needed
                const parentContent = this.closest('.accordion-content');
                if (parentContent && parentContent.classList.contains('visible')) {
                    parentContent.style.maxHeight = parentContent.scrollHeight + content.scrollHeight + 2000 + "px";
                }
            }
        });
    });

    // Function to expand all visible sections
    window.expandAllSections = function () {
        // Expand top-level sections first
        accordionToggles.forEach(toggle => {
            // Only expand sections that are not filtered out
            if (!toggle.parentElement.classList.contains('filtered')) {
                const content = toggle.nextElementSibling;
                toggle.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 2000 + "px";
                content.classList.add('visible');
            }
        });

        // Then expand all nested sections
        nestedToggles.forEach(toggle => {
            // Only expand if parent is visible
            if (!toggle.closest('.accordion-section').classList.contains('filtered')) {
                const content = toggle.nextElementSibling;
                toggle.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('visible');

                // Update parent's height
                const parentContent = toggle.closest('.accordion-content');
                if (parentContent && parentContent.classList.contains('visible')) {
                    parentContent.style.maxHeight = parentContent.scrollHeight + content.scrollHeight + 2000 + "px";
                }
            }
        });
    }

    // Function to collapse all sections
    window.collapseAllSections = function () {
        // Collapse nested sections first
        nestedToggles.forEach(toggle => {
            const content = toggle.nextElementSibling;
            toggle.classList.remove('active');
            content.style.maxHeight = null;
            content.classList.remove('visible');
        });

        // Then collapse top-level sections
        accordionToggles.forEach(toggle => {
            const content = toggle.nextElementSibling;
            toggle.classList.remove('active');
            content.style.maxHeight = null;
            content.classList.remove('visible');
        });
    }    // Add event listeners for expand/collapse all buttons
    const expandAllBtns = document.querySelectorAll('[id^="expand-all"]');
    const collapseAllBtns = document.querySelectorAll('[id^="collapse-all"]');

    expandAllBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Check if this button has a specific tab identifier (like "expand-all-intermediate")
            const btnId = this.id;
            const tabId = btnId.replace('expand-all-', '');

            // Find the tab content this button belongs to
            let tabContent;
            console.log(`Button ID: ${btnId}, Tab ID: ${tabId}`);

            if (tabId && tabId !== 'expand-all') {
                // Use the parent tab content if this is in a tabbed interface
                tabContent = document.getElementById(tabId);
                if (!tabContent) {
                    // If not found by ID, the button is probably within the tab already
                    tabContent = this.closest('.tab-content');
                }
            } else {
                tabContent = this.closest('.tab-content');
            }

            if (tabContent) {
                console.log(`Found tab content: ${tabContent.id}`);
                const accordionToggles = tabContent.querySelectorAll('.accordion-toggle');
                console.log(`Found ${accordionToggles.length} accordion toggles in ${tabContent.id}`);

                accordionToggles.forEach(toggle => {
                    if (!toggle.parentElement.classList.contains('filtered')) {
                        const content = toggle.nextElementSibling;
                        toggle.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 2000 + "px";
                        content.classList.add('visible');
                    }
                });
            } else {
                console.log('No tab content found, expanding all sections');
                // If not in a tab, expand all
                window.expandAllSections();
            }
        });
    }); collapseAllBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Check if this button has a specific tab identifier (like "collapse-all-intermediate")
            const btnId = this.id;
            const tabId = btnId.replace('collapse-all-', '');

            // Find the tab content this button belongs to
            let tabContent;
            console.log(`Button ID: ${btnId}, Tab ID: ${tabId}`);

            if (tabId && tabId !== 'collapse-all') {
                // Use the parent tab content if this is in a tabbed interface
                tabContent = document.getElementById(tabId);
                if (!tabContent) {
                    // If not found by ID, the button is probably within the tab already
                    tabContent = this.closest('.tab-content');
                }
            } else {
                tabContent = this.closest('.tab-content');
            }

            if (tabContent) {
                console.log(`Found tab content: ${tabContent.id}`);
                const accordionToggles = tabContent.querySelectorAll('.accordion-toggle');
                console.log(`Found ${accordionToggles.length} accordion toggles in ${tabContent.id}`);

                accordionToggles.forEach(toggle => {
                    const content = toggle.nextElementSibling;
                    toggle.classList.remove('active');
                    content.style.maxHeight = null;
                    content.classList.remove('visible');
                });
            } else {
                console.log('No tab content found, collapsing all sections');
                // If not in a tab, collapse all
                window.collapseAllSections();
            }
        });
    });

    // Initial setup - ensure accordion content is properly hidden
    accordionToggles.forEach(toggle => {
        const content = toggle.nextElementSibling;
        if (!toggle.classList.contains('active')) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add('visible');
        }
    });
});
