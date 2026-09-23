/**
 * Weather Guidelines - Table + Accordion Interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize weather accordions
    initWeatherAccordions();

    // Initialize weather matrix filters
    initWeatherMatrixFilters();
});

/**
 * Initialize the expandable/collapsible weather accordions
 */
function initWeatherAccordions() {
    const accordionHeaders = document.querySelectorAll('.weather-accordion-header');

    function setExpanded(header, expanded) {
        const content = header.nextElementSibling;
        if (!content) return;
        header.setAttribute('aria-expanded', String(expanded));
        content.setAttribute('aria-hidden', String(!expanded));
        content.hidden = !expanded;
    }

    accordionHeaders.forEach((header, index) => {
        const content = header.nextElementSibling;
        if (content && !content.id) content.id = `weather-panel-${index + 1}`;
        if (content) header.setAttribute('aria-controls', content.id);
        setExpanded(header, header.getAttribute('aria-expanded') === 'true');
        header.addEventListener('click', function () {
            setExpanded(header, header.getAttribute('aria-expanded') !== 'true');
        });
    });

    // Setup expand/collapse all functionality
    const expandAllBtn = document.getElementById('expand-all-weather');
    const collapseAllBtn = document.getElementById('collapse-all-weather');

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function () {
            accordionHeaders.forEach(header => {
                setExpanded(header, true);
            });
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function () {
            accordionHeaders.forEach(header => {
                setExpanded(header, false);
            });
        });
    }
}

/**
 * Initialize the weather matrix filtering functionality
 */
function initWeatherMatrixFilters() {
    const filterTabs = document.querySelectorAll('.weather-filter-tab');
    const matrixRows = document.querySelectorAll('.weather-matrix tbody tr');

    if (!filterTabs.length || !matrixRows.length) return;

    filterTabs.forEach(tab => {
        tab.setAttribute('aria-pressed', String(tab.classList.contains('active')));
    });

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const condition = this.getAttribute('data-condition');

            // Update active tab state
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            // Show specific rows based on condition filter
            if (condition === 'all') {
                matrixRows.forEach(row => row.style.display = '');
            } else {
                matrixRows.forEach(row => {
                    const matches = row.getAttribute('data-conditions').includes(condition);
                    row.style.display = matches ? '' : 'none';
                });
            }
        });
    });
}

/**
 * Update the weather guidelines based on current conditions
 * Can be connected to real-time weather data in future iterations
 */
function updateWeatherGuidelines(conditions) {
    // This function could be expanded to integrate with real-time weather data
    const waterTemp = conditions.waterTemp;
    const airTemp = conditions.airTemp;
    const windSpeed = conditions.windSpeed;
    const visibility = conditions.visibility;

    // Update the recommendation sidebar
    const recommendationEl = document.getElementById('current-recommendation');

    // Example logic for determining rowing recommendations
    let status = 'safe';
    let message = 'Conditions are suitable for rowing.';

    // Check for lightning (highest priority)
    if (conditions.lightning) {
        status = 'no-go';
        message = 'DANGER: Lightning detected. Do not row.';
    }
    // Check wind conditions
    else if (windSpeed > 20) {
        status = 'no-go';
        message = 'Wind speed exceeds safe limits (20+ mph). Do not row.';
    }
    else if (windSpeed > 15) {
        status = 'warning';
        message = 'Wind conditions (15+ mph) unsafe for singles/doubles. Larger boats only.';
    }
    else if (windSpeed > 12) {
        status = 'caution';
        message = 'Use caution. Wind 12-15 mph. Experienced scullers only in singles.';
    }
    // Check temperature conditions
    else if (waterTemp < 40) {
        status = 'warning';
        message = 'Cold water conditions. Restricted rowing policies in effect.';
    }
    else if (waterTemp < 50) {
        status = 'caution';
        message = 'Cold water caution. Modified rowing permitted. No singles.';
    }
    // Check visibility
    else if (visibility < 100) {
        status = 'no-go';
        message = 'Visibility below 100m minimum requirement. Do not row.';
    }

    // Add recommendation to the page
    if (recommendationEl) {
        recommendationEl.className = `recommendation ${status}`;
        recommendationEl.textContent = message;
    }
}
