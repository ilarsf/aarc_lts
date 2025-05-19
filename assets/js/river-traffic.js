/**
 * River Traffic Interactive Map and Accordion JavaScript
 * Provides functionality for the interactive river map, tooltips, and traffic pattern visualization
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the river traffic map
    initRiverMap();

    // Initialize the traffic accordions
    initTrafficAccordions();

    // Setup map control buttons
    setupMapControls();
});

/**
 * Initialize the interactive river map and its features
 */
function initRiverMap() {
    // Get all highlight points on the map
    const highlightPoints = document.querySelectorAll('.highlight-point');
    const infoBox = document.querySelector('.map-infobox');

    if (!highlightPoints.length || !infoBox) return;

    // Setup event listeners for each point
    highlightPoints.forEach(point => {
        point.addEventListener('click', function (e) {
            e.stopPropagation();

            // Remove active class from all points
            highlightPoints.forEach(p => p.classList.remove('active'));

            // Add active class to clicked point
            this.classList.add('active');

            // Get the data from the point
            const title = this.getAttribute('data-title');
            const content = this.getAttribute('data-content');
            const type = this.getAttribute('data-type');

            // Update the infobox content
            infoBox.querySelector('h4').textContent = title || 'Information';
            infoBox.querySelector('.infobox-content').innerHTML = content || '';

            // Add appropriate class based on point type
            infoBox.className = 'map-infobox visible';
            if (type) infoBox.classList.add(`type-${type}`);

            // Position the infobox near the clicked point
            const rect = this.getBoundingClientRect();
            const mapRect = document.querySelector('.river-map').getBoundingClientRect();

            // Calculate position (either to the right or below the point)
            const windowWidth = window.innerWidth;
            let left, top;

            if (rect.left + 270 < windowWidth) {
                // Position to the right
                left = rect.left - mapRect.left + 15;
                top = rect.top - mapRect.top - (infoBox.offsetHeight / 2) + 5;
            } else {
                // Position below
                left = rect.left - mapRect.left - (infoBox.offsetWidth / 2) + 5;
                top = rect.top - mapRect.top + 15;
            }

            // Ensure infobox stays within map bounds
            left = Math.max(10, Math.min(left, mapRect.width - infoBox.offsetWidth - 10));
            top = Math.max(10, Math.min(top, mapRect.height - infoBox.offsetHeight - 10));

            infoBox.style.left = `${left}px`;
            infoBox.style.top = `${top}px`;
        });
    });

    // Close infobox when clicking outside
    document.querySelector('.river-map').addEventListener('click', function (e) {
        if (!e.target.closest('.highlight-point') && !e.target.closest('.map-infobox')) {
            infoBox.classList.remove('visible');
            highlightPoints.forEach(p => p.classList.remove('active'));
        }
    });

    // Close button functionality
    const closeBtn = document.querySelector('.map-infobox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            infoBox.classList.remove('visible');
            highlightPoints.forEach(p => p.classList.remove('active'));
        });
    }
}

/**
 * Initialize the traffic rule accordions
 */
function initTrafficAccordions() {
    const accordionToggles = document.querySelectorAll('.traffic-accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            // Toggle active class
            this.classList.toggle('active');

            // Get the associated content
            const content = this.nextElementSibling;

            // Toggle the active class on the content
            content.classList.toggle('active');

            // Update aria attributes
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
            content.setAttribute('aria-hidden', !expanded);
        });
    });

    // Setup expand/collapse all functionality
    const expandAllBtn = document.getElementById('expand-all-traffic');
    const collapseAllBtn = document.getElementById('collapse-all-traffic');

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function () {
            accordionToggles.forEach(toggle => {
                toggle.classList.add('active');
                toggle.setAttribute('aria-expanded', true);

                const content = toggle.nextElementSibling;
                content.classList.add('active');
                content.setAttribute('aria-hidden', false);
            });
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function () {
            accordionToggles.forEach(toggle => {
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);

                const content = toggle.nextElementSibling;
                content.classList.remove('active');
                content.setAttribute('aria-hidden', true);
            });
        });
    }
}

/**
 * Setup map control buttons functionality
 */
function setupMapControls() {
    const mapControls = document.querySelectorAll('.map-control-btn');
    if (!mapControls.length) return;

    mapControls.forEach(control => {
        control.addEventListener('click', function () {
            const filterType = this.getAttribute('data-filter');

            // Toggle active state of this button
            this.classList.toggle('active');

            // Find all map elements matching this filter
            const isActive = this.classList.contains('active');
            const elements = document.querySelectorAll(`.river-map [data-type="${filterType}"]`);

            elements.forEach(el => {
                if (isActive) {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        });
    });

    // Reset all filters
    const resetBtn = document.getElementById('reset-map-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            // Reset all control buttons
            mapControls.forEach(control => {
                control.classList.add('active');
            });

            // Show all map elements
            document.querySelectorAll('.river-map .hidden').forEach(el => {
                el.classList.remove('hidden');
            });
        });
    }
}

/**
 * Creates an SVG path for curved traffic flow arrows
 */
function createBezierPath(startX, startY, endX, endY, curvature) {
    const midX = (startX + endX) / 2;
    const midY = startY + (endY - startY) * curvature;

    return `M ${startX} ${startY} Q ${midX} ${midY}, ${endX} ${endY}`;
}
