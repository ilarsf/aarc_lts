// Essential Rules Accordion Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all accordions
    const accordions = document.querySelectorAll('.rules-accordion-toggle');
    function setRuleExpanded(accordion, expanded) {
        const content = accordion.nextElementSibling;
        if (!content) return;
        accordion.classList.toggle('active', expanded);
        accordion.setAttribute('aria-expanded', String(expanded));
        content.classList.toggle('active', expanded);
        content.hidden = !expanded;
    }

    // Set up accordion click handlers
    accordions.forEach(accordion => {
        const content = accordion.nextElementSibling;
        if (content && !content.id) content.id = `rule-panel-${Array.from(accordions).indexOf(accordion) + 1}`;
        if (content) accordion.setAttribute('aria-controls', content.id);
        setRuleExpanded(accordion, accordion.classList.contains('active'));
        accordion.addEventListener('click', function () {
            setRuleExpanded(this, this.getAttribute('aria-expanded') !== 'true');
        });
    });

    // Expand all / Collapse all buttons
    const expandAllBtn = document.getElementById('expand-all-rules');
    const collapseAllBtn = document.getElementById('collapse-all-rules');

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function () {
            accordions.forEach(accordion => {
                setRuleExpanded(accordion, true);
            });
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function () {
            accordions.forEach(accordion => {
                setRuleExpanded(accordion, false);
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
