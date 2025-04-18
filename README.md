# AARC Learn to Scull Program

This repository contains materials for the Ann Arbor Rowing Club's Learn to Scull program. It's built as a Jekyll site with the Cayman theme, customized to match AARC branding.

## Repository Structure

### `/course_materials/`
Contains the final, polished materials ready for use in the program.

#### `/course_materials/coach/`
- **Coach_Manual.md**: Comprehensive guide for coaches with program structure, session goals, and teaching methodologies
- **Daily_Coach_Checklist.md**: Operational checklist for coaches to use before, during, and after each session

#### `/course_materials/learner/`
- **Learner_Guide.md**: Beginner-friendly guide explaining sculling concepts, techniques, and progression
- **QA_Companion.md**: Collection of frequently asked questions and expert answers for participants

#### `/course_materials/communication/`
- **Email_Templates.md**: Templates for pre-course, daily, and post-course communications

### `/assets/`
Contains theme customization files:
- **css/style.scss**: Main stylesheet that overrides the Cayman theme
- **images/**: Directory for storing site images and branding elements

### Theme Files
- **_layouts/default.html**: Custom layout template
- **_includes/head-custom.html**: Custom head includes
- **_config.yml**: Site configuration including custom theme settings

## Theme Customization

### Page Front Matter Options

You can customize individual pages by adding these options to the front matter:

```yaml
---
layout: default
title: Custom Page Title
description: Custom page description
custom_class: your-custom-class
header_image: /assets/images/your-header-image.jpg
actions:
  - label: Button Text
    url: /link/to/page/
---
```

- **custom_class**: Adds a CSS class to the page for custom styling
- **header_image**: Adds a background image to the page header
- **actions**: Adds custom buttons to the page header

### Global Theme Settings

Edit these settings in `_config.yml`:

```yaml
# Custom theme settings
theme_color: "#0066cc"  # Primary blue color
theme_color_secondary: "#004c99"  # Secondary blue color
footer_text_color: "#7c7c7c"  # Light gray for footer text

# Navigation
navigation:
  - title: Home
    url: /
  - title: Coach Resources
    url: /course_materials/coach/
```

### Custom CSS

Add custom styles in `assets/css/style.scss`. Page-specific styles can be added using the custom class:

```scss
.your-custom-class .main-content {
  /* Custom styles */
}
```

## Development Guide

1. Follow the Jekyll organization patterns when adding new content
2. Use Markdown for content files
3. Test changes locally before deploying
4. See `assets/README.md` for detailed customization instructions