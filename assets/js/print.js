/**
 * Print utilities for the AARC Learn to Scull textbook
 * Enhanced with page numbering and proper textbook formatting
 */

// When the print button is clicked, format the page for optimal printing
function printTextbook() {
    prepareForPrinting();
    window.print();
    return false;
}

// Format the document for proper textbook printing
function prepareForPrinting() {
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

    // Add page break before each major section/chapter
    document.querySelectorAll('h1[id^="part-"], h2[id^="chapter-"]').forEach(function (heading) {
        heading.classList.add('page-break-before');
    });

    // Add page numbers by creating a counter element that will be positioned in the footer
    addPageCounter();
}

// Add dynamic page counter that will appear in print mode
function addPageCounter() {
    // Remove any existing page counters
    const existingCounters = document.querySelectorAll('.page-counter');
    existingCounters.forEach(counter => counter.remove());

    // Create page counter elements
    const pageCounter = document.createElement('div');
    pageCounter.className = 'page-counter';

    const totalPages = document.createElement('div');
    totalPages.className = 'total-pages';
    totalPages.setAttribute('id', 'total-pages');
    totalPages.textContent = 'Total pages: calculating...';

    // Create a title for the header
    const headerTitle = document.createElement('div');
    headerTitle.className = 'header-title';
    headerTitle.textContent = 'AARC Learn to Scull';

    // Add copyright info
    const copyright = document.createElement('div');
    copyright.className = 'print-copyright';
    copyright.textContent = '© ' + new Date().getFullYear() + ' Ann Arbor Rowing Club';

    // Add date printed
    const datePrinted = document.createElement('div');
    datePrinted.className = 'date-printed';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    datePrinted.textContent = 'Printed: ' + new Date().toLocaleDateString('en-US', options);

    // Append elements to body
    document.body.appendChild(pageCounter);
    document.body.appendChild(headerTitle);
    document.body.appendChild(totalPages);
    document.body.appendChild(copyright);
    document.body.appendChild(datePrinted);
}

// Handle when someone tries to print directly from browser (Ctrl+P)
window.onbeforeprint = function () {
    prepareForPrinting();
};

document.addEventListener('DOMContentLoaded', function () {
    // Initialize print button handlers
    const printButtons = document.querySelectorAll('.print-now-btn, .print-textbook-btn');
    printButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            prepareForPrinting();
            estimatePageCount();
            setTimeout(function () {
                window.print();
            }, 200);
        });
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

    // If we're on the all.html page, setup the print formatting
    if (window.location.pathname.includes('/textbook/all.html')) {
        // Add IDs to chapter headings for TOC and page breaks if they don't exist
        document.querySelectorAll('h2').forEach(function (heading, index) {
            if (!heading.id && heading.textContent.toLowerCase().includes('chapter')) {
                heading.id = 'chapter-' + (index + 1);
            }
        });
    }
});

// Estimate the number of pages for the page count
function estimatePageCount() {
    // We can't know the exact page count until printing,
    // but we can make a reasonable estimate based on content length
    const contentHeight = document.querySelector('.main-content').scrollHeight;
    const pageHeight = 900; // Approximate height of a printed page in pixels
    const estimatedPages = Math.ceil(contentHeight / pageHeight);

    // Update the total pages element
    const totalPages = document.getElementById('total-pages');
    if (totalPages) {
        totalPages.textContent = 'Approximately ' + estimatedPages + ' pages';
    }
}

// Auto-print when directed by URL parameter
if (window.location.search.includes('print=true')) {
    // Wait for page to fully load before printing
    window.addEventListener('load', function () {
        // Short timeout to ensure all content is rendered
        setTimeout(function () {
            prepareForPrinting();
            estimatePageCount();
            window.print();
        }, 1000);
    });
}
