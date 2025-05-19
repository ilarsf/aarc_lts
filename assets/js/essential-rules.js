// Essential Rules Accordion Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all accordions
    const accordions = document.querySelectorAll('.rules-accordion-toggle');
    const allContentElements = document.querySelectorAll('.rules-accordion-content');

    // Set up accordion click handlers
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function () {
            // Toggle active class on the clicked accordion
            this.classList.toggle('active');

            // Get the content associated with this accordion
            const content = this.nextElementSibling;

            // Toggle active class on the content
            content.classList.toggle('active');
        });
    });

    // Expand all / Collapse all buttons
    const expandAllBtn = document.getElementById('expand-all-rules');
    const collapseAllBtn = document.getElementById('collapse-all-rules');

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function () {
            accordions.forEach(accordion => {
                accordion.classList.add('active');
                accordion.nextElementSibling.classList.add('active');
            });
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function () {
            accordions.forEach(accordion => {
                accordion.classList.remove('active');
                accordion.nextElementSibling.classList.remove('active');
            });
        });
    }

    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.rules-filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Get the filter category
            const filter = this.getAttribute('data-filter');

            // Toggle active class on filter buttons
            if (filter === 'all') {
                filterButtons.forEach(button => {
                    button.classList.remove('active');
                });
                this.classList.add('active');
            } else {
                document.querySelector('[data-filter="all"]').classList.remove('active');
                this.classList.toggle('active');
            }

            // Apply filtering
            applyFilters();
        });
    });

    // Function to apply current active filters
    function applyFilters() {
        // Get all active filters
        const activeFilters = Array.from(document.querySelectorAll('.rules-filter-btn.active'))
            .map(btn => btn.getAttribute('data-filter'));

        // Show all sections if "all" is selected or no filters are active
        if (activeFilters.includes('all') || activeFilters.length === 0) {
            document.querySelectorAll('.rules-accordion-section').forEach(section => {
                section.style.display = 'block';
            });
            return;
        }

        // Hide all sections first
        document.querySelectorAll('.rules-accordion-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show sections matching active filters
        document.querySelectorAll('.rules-accordion-section').forEach(section => {
            const priority = section.getAttribute('data-priority');
            const category = section.getAttribute('data-category');

            if (activeFilters.includes(priority) || activeFilters.includes(category)) {
                section.style.display = 'block';
            }
        });
    }

    // Initially open the first accordion if none are open
    if (!document.querySelector('.rules-accordion-toggle.active')) {
        const firstAccordion = document.querySelector('.rules-accordion-toggle');
        if (firstAccordion) {
            firstAccordion.click();
        }
    }
});
