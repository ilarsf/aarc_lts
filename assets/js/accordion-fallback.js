// jQuery-based fallback for accordion functionality
// Only activates if the vanilla JS version isn't working

(function () {
    function initjQueryAccordion() {
        console.log('Initializing jQuery fallback for accordions');

        // Check if jQuery is available
        if (typeof jQuery === 'undefined') {
            console.error('jQuery fallback cannot initialize - jQuery is not loaded');
            return;
        }

        // Initialize accordion functionality with jQuery
        jQuery(document).ready(function ($) {
            console.log('jQuery ready - setting up accordion fallback');

            // Toggle accordion sections
            $('.accordion-toggle').off('click').on('click', function (e) {
                e.preventDefault();

                var $this = $(this);
                var $content = $this.next('.accordion-content');

                $this.toggleClass('active');

                if ($content.hasClass('visible')) {
                    $content.removeClass('visible');
                } else {
                    $content.addClass('visible');
                }

                console.log('jQuery toggle:', $this.text().trim(), $content.hasClass('visible'));
            });

            // Expand All button
            $('#expand-all').off('click').on('click', function () {
                $('.accordion-toggle').addClass('active');
                $('.accordion-content').addClass('visible');
            });

            // Collapse All button
            $('#collapse-all').off('click').on('click', function () {
                $('.accordion-toggle').removeClass('active');
                $('.accordion-content').removeClass('visible');
            });

            // Handle nested toggles
            $('.nested-toggle').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $this = $(this);
                var $content = $this.next('.nested-content');

                $this.toggleClass('active');

                if ($content.hasClass('visible')) {
                    $content.removeClass('visible');
                } else {
                    $content.addClass('visible');
                }
            });
        });
    }

    // Check if accordion is working after a delay
    window.setTimeout(function () {
        // Count accordion sections that should be interactive
        var totalAccordions = document.querySelectorAll('.accordion-toggle').length;

        if (totalAccordions > 0) {
            // Try to click an accordion and see if it opens
            var testButton = document.querySelector('.accordion-toggle');
            var testWorked = false;

            if (testButton) {
                var initialState = testButton.classList.contains('active');
                testButton.click();

                // Check if state changed
                var newState = testButton.classList.contains('active');
                testWorked = (initialState !== newState);

                // Reset to initial state
                if (testWorked && initialState !== newState) {
                    testButton.click();
                }
            }

            if (!testWorked) {
                console.warn('Accordion not working with vanilla JS - activating jQuery fallback');

                // Load jQuery if not available
                if (typeof jQuery === 'undefined') {
                    console.log('Loading jQuery for accordion fallback');

                    var script = document.createElement('script');
                    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
                    script.onload = initjQueryAccordion;
                    document.head.appendChild(script);
                } else {
                    initjQueryAccordion();
                }
            } else {
                console.log('Accordion working with vanilla JS - no fallback needed');
            }
        }
    }, 2000);
})();
