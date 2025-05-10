/**
 * Print utilities for the AARC Learn to Scull textbook
 */

// When the print button is clicked, format the page for optimal printing
function printTextbook() {
    window.print();
    return false;
}

// Handle when someone tries to print directly from browser (Ctrl+P)
window.onbeforeprint = function () {
    // Make sure all content is visible and expanded for printing
    document.querySelectorAll('.textbook-full-toc details').forEach(function (detail) {
        detail.setAttribute('open', true);
    });

    // Hide any "print-hide" elements 
    document.querySelectorAll('.print-hide').forEach(function (el) {
        el.style.display = 'none';
    });

    // Show any collapsed sections
    document.querySelectorAll('.collapse').forEach(function (el) {
        el.classList.add('show');
    });
};

document.addEventListener('DOMContentLoaded', function () {
    // Initialize print button handlers
    const printButtons = document.querySelectorAll('.print-now-btn, .print-textbook-btn');
    printButtons.forEach(function (button) {
        button.addEventListener('click', printTextbook);
    });

    // If we're on the index page and the print button is clicked,
    // redirect to the all.html page with a print parameter
    const indexPrintButtons = document.querySelectorAll('.index-print-btn');
    indexPrintButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = button.getAttribute('href') + '?print=true';
        });
    });
});

// Auto-print when directed by URL parameter
if (window.location.search.includes('print=true')) {
    // Wait for page to fully load before printing
    window.addEventListener('load', function () {
        // Short timeout to ensure all content is rendered
        setTimeout(function () {
            window.print();
        }, 1000);
    });
}
