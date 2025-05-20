---
layout: coach
title: "Communication Templates and Protocols - AARC Learn to Scull Program"
search_exclude: true
---

# Communication Templates and Protocols

<div class="info-box tip">
  <h3>Effective Communication</h3>
  <p>Consistent, clear communication is critical to program success. Use these templates and guidelines to maintain professional communication with participants throughout the program.</p>
</div>

{% include communication_accordion.html
   id="learnToScullAccordion"
   expand_text="Expand All"
   collapse_text="Collapse All"
   sections=site.data.learn_to_scull_templates
%}

<div class="resource-links mt-4">
  <h3>Related Resources</h3>
  <ul>
    <li><a href="{{ site.baseurl }}/for-coaches/program-management/administrative-guide.html">Administrative Guide</a></li>
    <li><a href="{{ site.baseurl }}/for-coaches/safety-leadership/emergency-procedures.html">Emergency Communication Procedures</a></li>
  </ul>
</div>

<style>
  .template-container {
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    margin-bottom: 2rem;
    overflow: hidden;
  }
  
  .template-container h4 {
    background-color: #f3f4f5;
    margin: 0;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e1e4e8;
  }
  
  .template-content {
    padding: 1rem;
    background-color: #fff;
    /* font-family: monospace; */ /* Removed for proper HTML rendering */
    white-space: normal; /* MODIFIED to allow normal HTML flow and rely on markdownify for structure */
    font-size: 0.9rem;
  }
  
  .template-actions {
    display: flex;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e1e4e8;
  }
  
  .copy-button, .download-button {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
    color: #333;
  }
  
  .copy-button:hover, .download-button:hover {
    background-color: #e9e9e9;
  }

  /* Added styles for Markdown rendering within templates */
  .template-content p,
  .template-content ul,
  .template-content ol {
    margin-top: 0;
    margin-bottom: 0.2em; /* Further reduced margin */
    line-height: 1.3;    /* Explicitly set line-height */
  }
  .template-content strong, .template-content b {
    font-weight: bold;
  }
  .template-content em, .template-content i {
    font-style: italic;
  }
  .template-content ul {
    list-style-type: disc;
    padding-left: 20px; /* Adjusted from margin-left for better compatibility */
    margin-bottom: 1em;
  }
  .template-content ol {
    list-style-type: decimal;
    padding-left: 20px; /* Adjusted from margin-left for better compatibility */
    margin-bottom: 1em;
  }
  .template-content li {
    margin-bottom: 0.25em;
  }
  .template-content a {
    color: #0366d6; /* Standard link blue */
    text-decoration: underline;
  }
  .template-content a:hover {
    color: #0056b3;
    text-decoration: none;
  }
</style>
