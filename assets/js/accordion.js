// Accordion functionality for .accordion-toggle buttons
// Ensures each button toggles its corresponding .accordion-content

// Create a safe function to handle potential jQuery conflicts
(function () {
    // Function to initialize accordions with vanilla JavaScript
    function initAccordions() {
        console.log("Initializing accordions with vanilla JS");

        // Toggle individual accordion sections
        document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default behavior
                btn.classList.toggle('active');
                var content = btn.nextElementSibling;
                if (content && content.classList.contains('accordion-content')) {
                    content.classList.toggle('visible');

                    // Log for debugging
                    console.log('Toggling accordion:',
                        'Button:', btn.textContent.trim(),
                        'Active:', btn.classList.contains('active'),
                        'Content visible:', content.classList.contains('visible'));
                }
            });
        });

        // Expand All
        var expandAll = document.getElementById('expand-all');
        if (expandAll) {
            expandAll.addEventListener('click', function () {
                document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
                    btn.classList.add('active');
                    var content = btn.nextElementSibling;
                    if (content && content.classList.contains('accordion-content')) {
                        content.classList.add('visible');
                    }
                });
            });
        }

        // Collapse All
        var collapseAll = document.getElementById('collapse-all');
        if (collapseAll) {
            collapseAll.addEventListener('click', function () {
                document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
                    btn.classList.remove('active');
                    var content = btn.nextElementSibling;
                    if (content && content.classList.contains('accordion-content')) {
                        content.classList.remove('visible');
                    }
                });
            });
        }

        // Initialize nested toggles if present
        document.querySelectorAll('.nested-toggle').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default behavior
                e.stopPropagation(); // Prevent event bubbling
                btn.classList.toggle('active');
                var content = btn.nextElementSibling;
                if (content && content.classList.contains('nested-content')) {
                    content.classList.toggle('visible');

                    // Log for debugging
                    console.log('Toggling nested content:',
                        'Button:', btn.textContent.trim(),
                        'Active:', btn.classList.contains('active'),
                        'Content visible:', content.classList.contains('visible'));
                }
            });
        });
    }

    // Function to verify accordion functionality
    function verifyAccordions() {
        const toggles = document.querySelectorAll('.accordion-toggle');
        console.log(`Found ${toggles.length} accordion toggle elements`);

        if (toggles.length === 0) {
            console.warn('No accordion toggles found. Check if the page structure is correct.');
        }

        // Check if any accordions are already open (for debugging)
        const visibleContents = document.querySelectorAll('.accordion-content.visible');
        console.log(`${visibleContents.length} accordion sections are visible on page load`);
    }

    // Initialize when the DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initAccordions();
            setTimeout(verifyAccordions, 500); // Check after a delay
        });
    } else {
        // DOM already loaded, run immediately
        initAccordions();
        setTimeout(verifyAccordions, 500);
    }

    // Define a global function to fix potential jQuery conflicts
    window.fixAccordions = function () {
        // Remove any jQuery slideReveal bindings
        if (window.jQuery) {
            try {
                jQuery('.accordion-content').each(function () {
                    if (jQuery(this).data('slideReveal')) {
                        jQuery(this).slideReveal('hide');
                    }
                });
            } catch (e) {
                console.log("Cleaning up jQuery references: ", e);
            }

            // Reinitialize with vanilla JS
            initAccordions();
        }
    };

    // If page has jQuery loaded, provide backup plan
    if (window.jQuery) {
        console.log("jQuery detected, setting up fallback");
        window.setTimeout(window.fixAccordions, 500);
    }
})();
