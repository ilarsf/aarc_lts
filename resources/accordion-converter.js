/**
 * Accordion Content Converter
 * 
 * This script helps convert traditional content with headings to accordion format.
 * It can be run in your browser's console on any page to generate the accordion HTML.
 * 
 * Usage instructions:
 * 1. Open your markdown file in a text editor
 * 2. Copy the content you want to convert
 * 3. Open a blank HTML page in your browser
 * 4. Paste your content into the page as plain text
 * 5. Open browser developer tools (F12) and paste this script into the console
 * 6. Call convertToAccordion() to generate the accordion HTML
 * 7. Copy the generated HTML from the console or page
 */

function convertToAccordion() {
    // Get the content from the body
    const content = document.body.innerHTML;

    // Store the original content
    document.body.setAttribute('data-original', content);

    // Create accordion controls
    const controls = `
<div class="accordion-controls">
  <button id="expand-all">Expand All</button>
  <button id="collapse-all">Collapse All</button>
</div>`;

    // Find all h2 elements - these will be our accordion sections
    const sections = content.split(/<h2[^>]*>|<h2>/i);

    // If there's text before the first h2, keep it outside the accordions
    let intro = sections.shift();

    // Start building the new content with the includes directive
    let newContent = `{% include accordion.html %}\n\n${controls}\n\n${intro}\n\n`;

    // Process each section
    sections.forEach(section => {
        // Find the heading text
        const headingEndIndex = section.indexOf('</h2>');
        if (headingEndIndex === -1) return;

        const headingText = section.substring(0, headingEndIndex).trim();
        const sectionContent = section.substring(headingEndIndex + 5); // +5 for </h2>

        // Create an accordion section
        newContent += `
<div class="accordion-section">
  <button class="accordion-toggle">${headingText}</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      ${sectionContent}
    </div>
  </div>
</div>
`;
    });

    // Display the new content
    document.body.innerHTML = '<h1>Converted Accordion Content:</h1><pre id="accordion-output">' +
        newContent.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';

    // Also log to console for easy copying
    console.log("Accordion HTML:");
    console.log(newContent);
    console.log("Copy the above HTML to use in your markdown files.");

    // Add button to restore original content
    const restoreButton = document.createElement('button');
    restoreButton.textContent = "Restore Original Content";
    restoreButton.onclick = function () {
        document.body.innerHTML = document.body.getAttribute('data-original');
        const newButton = document.createElement('button');
        newButton.textContent = "Convert to Accordion Again";
        newButton.onclick = convertToAccordion;
        document.body.appendChild(newButton);
    };
    document.body.appendChild(restoreButton);

    return newContent;
}

// Call the function to convert the content
convertToAccordion();
