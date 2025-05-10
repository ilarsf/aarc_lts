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

    // Clean up any previous print elements
    cleanupPrintElements();

    // Fix empty pages by properly structuring content
    fixEmptyPages();

    // Try to properly mark chapter headings if not already done
    addChapterIds();

    // Add print-specific header and footer content
    addFooterContent();
}

// Clean up any elements we might have added in a previous print attempt
function cleanupPrintElements() {
    // Remove any existing print-specific elements
    const elementsToRemove = document.querySelectorAll('.print-header, .print-footer, .page-counter, .header-title, .total-pages, .print-copyright, .date-printed');
    elementsToRemove.forEach(el => el.remove());
}

// Fix issues with empty pages
function fixEmptyPages() {
    // Replace page-break-before with a more reliable approach
    document.querySelectorAll('.page-break-before').forEach(el => {
        el.classList.remove('page-break-before');
    });

    // Add page breaks only to major sections where really needed
    document.querySelectorAll('h1[id^="part-"]').forEach(function (heading) {
        // Create a wrapper if it doesn't exist
        if (!heading.parentElement.classList.contains('part-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'part-wrapper';
            wrapper.style.pageBreakBefore = 'always';

            // Insert the wrapper before the heading
            heading.parentNode.insertBefore(wrapper, heading);
            // Move the heading into the wrapper
            wrapper.appendChild(heading);
        }
    });

    // Fix potential margin issues - only make minimal adjustments
    // to avoid conflicts with print.css
    document.body.style.margin = '0';
    document.body.style.padding = '0';
}

// Function to add IDs to chapter headings if not already present
function addChapterIds() {
    // Find all h2 elements that might be chapters
    const potentialChapters = Array.from(document.querySelectorAll('h2:not([id^="chapter-"])'))
        .filter(h2 => h2.textContent.toLowerCase().includes('chapter'));

    // Add proper IDs to make sure page breaks work correctly
    potentialChapters.forEach((heading, index) => {
        heading.id = 'chapter-' + (index + 1);
        heading.classList.add('chapter-heading');
    });

    // Also check for part headings that might be missing IDs
    const potentialParts = Array.from(document.querySelectorAll('h1:not([id^="part-"])'))
        .filter(h1 => h1.textContent.toLowerCase().includes('part'));

    potentialParts.forEach((heading, index) => {
        heading.id = 'part-' + (index + 1);
        heading.classList.add('part-heading');
    });
}

// Add footer content in a more consistent way
function addFooterContent() {
    // Clean up any existing footer elements
    cleanupPrintElements();

    // Create wrapper elements for header and footer
    const printHeader = document.createElement('div');
    printHeader.className = 'print-header';

    const printFooter = document.createElement('div');
    printFooter.className = 'print-footer';

    // Create header content
    const headerTitle = document.createElement('div');
    headerTitle.className = 'header-title';
    headerTitle.textContent = 'AARC Learn to Scull';

    // Create date printed for header
    const datePrinted = document.createElement('div');
    datePrinted.className = 'date-printed';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    datePrinted.textContent = 'Printed: ' + new Date().toLocaleDateString('en-US', options);

    // Create footer elements - left side
    const copyright = document.createElement('div');
    copyright.className = 'print-copyright';
    copyright.textContent = '© ' + new Date().getFullYear() + ' Ann Arbor Rowing Club';

    // Create footer elements - right side with page numbers
    const totalPages = document.createElement('div');
    totalPages.className = 'total-pages';
    totalPages.textContent = 'Page ';

    // Append all elements to their containers
    printHeader.appendChild(headerTitle);
    printHeader.appendChild(datePrinted);

    printFooter.appendChild(copyright);
    printFooter.appendChild(totalPages);

    // Add to the document
    document.body.appendChild(printHeader);
    document.body.appendChild(printFooter);

    // Add proper print margins to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.padding = '0.75in';
    }
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
