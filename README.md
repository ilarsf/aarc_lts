# AARC Learn to Scull Program

This repository contains the website and training materials for the Ann Arbor Rowing Club's Learn to Scull program.

## Site Structure

The site is organized into the following main sections:

- **Home Page**: Overview of the program and resources
- **Coach Resources**: Materials for program instructors
- **Learner Resources**: Guides and references for participants
- **Technical Guides**: Detailed instructions for specific skills
- **Communication Templates**: Email and announcement templates

## Content Organization

Content is stored in markdown files organized by audience:

- `/course_materials/coach/` - Coach-facing resources
- `/course_materials/learner/` - Participant-facing materials
- `/course_materials/communication/` - Templates for program communications

## Image Handling

The site includes a custom image handling system that:

1. **Prevents broken image placeholders** - Missing images won't show broken placeholders
2. **Uses icon fallbacks** - Font Awesome icons can be used in place of missing images
3. **Improves performance** - Reduces console errors and improves page loading

For details on using this feature, see [Image Handling Documentation](/assets/README-image-handling.md)
- `/src/` - Technical guides and reference materials

## Site Features

The site includes:

- Responsive layout for desktop and mobile devices
- Drop-down navigation menus
- Tabbed content organization
- Automatic table of contents generation
- Enhanced print functionality for the textbook:
  - One-click printing from any page
  - Print-optimized CSS for better formatting
  - Option to save as PDF
- Video embeds and galleries
- Interactive information boxes
- Responsive tables
- Grid layouts for content organization

## Visual Element Recommendations

The following visual elements would significantly enhance the learning materials:

### Technique Illustrations
- **Rowing Stroke Sequence**: Step-by-step illustrations of the proper sculling stroke
- **Hand Position Diagrams**: Close-up views of correct grip and feathering technique
- **Body Position Reference**: Side-view illustrations of proper posture at different points in the stroke

### Safety Visuals
- **Flip Test Process**: Sequential photographs of the capsize recovery procedure
- **Equipment Safety Checks**: Visual guide to boat parts requiring inspection
- **Traffic Pattern Maps**: Bird's-eye view diagrams of local waterway navigation rules

### Equipment References
- **Boat Parts Labeled Diagram**: Annotated illustration of sculling shell components
- **Oar Anatomy Guide**: Detailed view of sculling oars with part names
- **Rigging Adjustment Visuals**: Examples of proper foot stretcher and oarlock settings

### Practical Guides
- **Weather Condition Visual Guide**: Examples of safe vs. unsafe water conditions
- **Launching Sequence Photos**: Step-by-step visual guide to boat launching
- **Hand Care Illustrations**: Visual guide to blister prevention and treatment

## Development

The site uses:
- Jekyll static site generator
- GitHub Pages for hosting
- Markdown content with HTML/CSS enhancements
- Custom JavaScript for interactive components

## Recommended Next Steps

1. Create and integrate recommended visual elements
2. Consider adding interactive technique demos (e.g., animated stroke sequence)
3. Expand video resources with embedded technique demonstrations
4. Add printable quick-reference cards for key concepts
5. Consider implementing a search feature for larger content sections
6. Complete integration of GoogleDriveExport content with course_materials for better alignment
7. Update links in GoogleDriveExport materials to use proper web paths rather than relative Markdown links
8. Consider creating Google Drive compatible versions of materials for sharing in that environment

## Textbook Materials

The repository also includes comprehensive textbook materials, located in the `/textbook` directory. These materials are organized as follows:

  - **Chapters**: Found in `/textbook/chapters/`, these markdown files are divided into:
      - **Part 1: Getting Started**
      - **Part 2: For the Learner**
      - **Part 3: Safety**
      - **Part 4: Appendices**

  - **Coach Content**: Coach-specific materials have been moved to the `/coach_portal/textbook/` directory, accessible via coach login.
  
  - **Includes**: Shared content for the chapters is stored in the `_includes/textbook/` directory. This structure ensures compatibility with GitHub Pages and avoids include path issues.

Deploying the site on GitHub Pages will now correctly build and render the textbook as part of the overall site.
