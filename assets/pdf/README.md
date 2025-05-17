# PDF Resources Directory

This directory contains HTML files formatted for printing that can be converted to PDF by the user through browser printing.

## Available Resources

- **daily_coach_checklist.html**: A printable checklist for coaches to use during each session
- **session_specific_checklist.html**: A printable checklist for session-specific tasks

## How It Works

These HTML files are designed to be:

1. Opened in a browser
2. Printed or saved as PDF using the browser's print functionality 
3. Used by coaches during rowing sessions

## Printing Instructions

When a user opens one of these HTML files in a browser, they will see printing instructions at the top of the page. These instructions are only visible in the browser and will not appear in the printed version.

To generate a PDF:
1. Open the HTML file in a web browser
2. Use the browser's print function (Ctrl+P or Cmd+P)
3. Select "Save as PDF" as the destination
4. Set orientation to "Portrait"
5. Disable headers and footers if possible
6. Click "Save" or "Print"

## Future Improvements

In the future, this approach could be improved by:

1. Using a tool like wkhtmltopdf or WeasyPrint to pre-generate PDFs
2. Setting up a GitHub Actions workflow to automatically generate PDFs from HTML files
3. Adding more printable resources like participant tracking forms

## Adding New Printable Resources

To add new printable resources:

1. Create an HTML file in this directory with print-friendly CSS
2. Include print instructions that are hidden when printing
3. Add links to the new resource in the relevant Markdown files