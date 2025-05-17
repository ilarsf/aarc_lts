# JavaScript Organization for AARC LTS

This document explains how JavaScript files are organized and loaded in the AARC Learn to Scull website.

## Script Loading System

Scripts are loaded using a centralized system to avoid duplicate loading and to ensure scripts are only loaded when needed:

1. All scripts are included from the `_includes/scripts.html` file
2. This file is included at the bottom of layout files (`default.html`, `coach.html`)
3. Page-specific scripts are loaded conditionally based on front matter variables

## Available Scripts

| Script File | Purpose | Front Matter Flag |
|-------------|---------|------------------|
| accordion.js | Handles expandable/collapsible content sections | `uses_accordion: true` |
| accordion-fallback.js | Fallback for accordion.js | Loaded with accordion.js |
| tabs.js | Handles tabbed content | `uses_tabs: true` |
| skill-tags.js | Manages skill tagging functionality | `uses_skill_tags: true` |
| drill-filter.js | Filters drill content | `uses_drill_filter: true` |
| category-nav.js | Handles category navigation | `uses_category_nav: true` |
| nested-dropdown.js | Handles nested dropdown menus | `uses_nested_dropdown: true` |
| quiz-integration.js | Quiz functionality | `uses_quiz: true` |
| coach-auth.js | Coach authentication | Automatically loaded in coach layout |
| search-exclusion.js | Manages search exclusions | Loaded globally |

## How to Add Scripts to Pages

1. **For existing scripts:** Add the appropriate front matter variable to your page:

   ```yaml
   ---
   layout: default
   title: My Page
   uses_tabs: true
   uses_accordion: true
   ---
   ```

2. **For new scripts:**
   - Add your script to the `assets/js/` directory
   - Update `_includes/scripts.html` to include your script with an appropriate conditional
   - Document the new script in this README
