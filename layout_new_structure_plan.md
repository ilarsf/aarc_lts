# AARC Learn to Scull Program - Layout Implementation Plan

This document outlines the recommended layouts for each section of the reorganized content structure, indicating which special layouts would enhance content digestibility and user experience. Implementation status is tracked with checkboxes:
- [x] = Layout already implemented
- [ ] = Layout needs to be implemented
- [C] = Layout change needed (current layout isn't optimal)

## Available Layout Components

1. **Tabs** (`{% include tabs.html %}`) - Best for parallel content categories where users need to switch between related topics.
2. **Accordions** (`{% include accordion.html %}`) - Best for sequential content that benefits from being collapsed/expanded, especially for lengthy sections.
3. **Standard Markdown** - Default layout for simpler content.
4. **Cards** - Visual elements with images/icons for navigation and key highlights.
5. **Timeline** - Visual representation of sequential content or progression.
6. **Tables** - For comparative data and structured information.
7. **Interactive Elements** - For self-assessment, progress tracking, and quizzes.
8. **Image Galleries** - For visual technique demonstrations and references.
9. **Combined Layouts** - Strategic use of multiple layouts on the same page.

## Implementation Plan

### Landing Page (index_new.md)
- [ ] **Card-Based Layout with Featured Sections**
  - Visual cards for primary user paths (Learners, Coaches, Resources, About)
  - Hero section with key program highlights and imagery
  - Clear call-to-action buttons for different user journeys

### For Learners Section

#### for-learners/index.md
- [x] **Combined Layout: Tabs + Cards**
  - Primary Tabs:
    - Tab 1: "Getting Started" (links to getting-started/)
    - Tab 2: "Learning Journey" (links to learning-journey/)
    - Tab 3: "Technique" (links to technique/)
    - Tab 4: "Safety" (links to safety/)
    - Tab 5: "Resources" (links to resources/)
  - Each tab should contain visual cards for sub-sections with icons

#### for-learners/getting-started/
- [ ] **program-overview.md**: Standard Markdown with Card Elements for key concepts
- [ ] **preparation.md**: Combined Layout: Accordion + Interactive Checklist
  - Equipment lists with checkable items
  - Categorized preparation steps
- [x] **terminology.md**: [C] Category Tabbed Layout with Search
  - Category tabs for quick navigation to term groups
  - Search functionality for quick term finding

#### for-learners/learning-journey/
- [x] **Timeline Navigation Component** (new layout element for all session pages)
  - Visual timeline showing progression through the four sessions
  - "You are here" indicator for current session

- [x] **session-1.md**: Tabs Layout with Interactive Elements
  - Tab 1: "Objectives" (with progress tracking checkboxes)
  - Tab 2: "Preparation" (with downloadable checklists)
  - Tab 3: "Skills Practice" (with visual technique references)
  - Tab 4: "Next Steps" (with preview links to session 2)
- [x] **session-2.md**: Tabs Layout (same enhanced structure as session-1)
- [x] **session-3.md**: Tabs Layout (same enhanced structure as session-1)
- [x] **session-4.md**: Tabs Layout (same enhanced structure as session-1)

#### for-learners/technique/
- [x] **basic-technique.md**: Combined Layout: Tabs for Stroke Phases + Image Gallery
  - Each stroke phase tab contains detailed breakdowns with images
  - Sequential visual presentation of the rowing stroke
- [x] **common-fixes.md**: [C] Combined Layout: Problem/Solution Tables + Accordions
  - Tables showing problems and corresponding fixes
  - Accordion sections for detailed explanations and drills
- [x] **videos.md**: Image Gallery Layout with embedded videos
  - Categorized video thumbnails with clear descriptions
  - Filterable by technique aspect or difficulty level
- [x] **advanced-technique.md**: Combined Layout: Skill Level Tabs + Accordions
  - Tabs for different skill levels
  - Accordion sections within each tab for specific techniques
  - Tabs for different skill levels
  - Accordion sections within each tab for specific techniques

#### for-learners/safety/
- [x] **essential-rules.md**: [C] Enhanced Accordion Layout with Priority Indicators
  - Visual priority indicators (Critical, Important, Standard)
  - Expandable sections with detailed explanations and rationales
  - Category-based filtering system
- [x] **self-rescue.md**: [C] Timeline Layout with Step-by-Step Instructions
  - Sequential steps with images for each phase of self-rescue
  - Interactive progress tracking through the sequence
- [x] **river-traffic.md**: [C] Interactive Map/Diagram Layout + Accordions
  - Visual diagram of traffic patterns with interactive elements
  - Accordion sections for detailed navigation rules
- [ ] **weather-guidelines.md**: Table + Accordion Layout
  - Table showing weather conditions and decision framework
  - Accordion sections for detailed protocols by condition

#### for-learners/resources/
- [ ] **faq.md**: Combined Layout: Topic Tabs + Accordions
  - Tabs for major topic categories (Equipment, Technique, Program, etc.)
  - Accordion questions within each tab for easy scanning
- [x] **glossary.md**: [C] A-Z Tabbed Layout with Search
  - Alphabet tabs for quick navigation
  - Search box for rapid term finding
  - Terms organized visually rather than in accordions
- [x] **assessment.md**: Interactive Progress Tracking Layout
  - Self-assessment checklists
  - Visual skill progress indicators
  - Interactive competency tracking
- [ ] **next-steps.md**: Card-Based Layout
  - Visual cards for different post-program pathways
  - Clear call-to-action buttons for each option

### For Coaches Section

#### for-coaches/index.md
- [ ] **Combined Layout: Tabs + Cards**
  - Tab 1: "Session Plans" (with visual session cards)
  - Tab 2: "Technical Coaching" (with technique category cards)
  - Tab 3: "Program Management" (with admin task cards)
  - Tab 4: "Safety Leadership" (with safety protocol cards)
  - Quick access buttons for current session resources

#### for-coaches/session-plans/
- [ ] **overview.md**: Timeline Layout with Program Structure
  - Visual timeline of the entire program
  - Links to each session with preview information
  - Progression indicators for skill development
- [x] **session-1.md**: [C] Combined Layout: Timeline + Accordions
  - Visual timeline of session activities with durations
  - Accordion sections for detailed activity instructions
  - Printable session outline for on-water reference
- [ ] **session-2.md**: [C] Combined Layout: Timeline + Accordions (same as session-1)
- [ ] **session-3.md**: [C] Combined Layout: Timeline + Accordions (same as session-1)
- [ ] **session-4.md**: [C] Combined Layout: Timeline + Accordions (same as session-1)

#### for-coaches/technical-coaching/
- [x] **coaching-language.md**: Accordion Layout
  - *Current implementation is appropriate*
- [x] **common-issues.md**: Accordion Layout
  - *Current implementation is appropriate*
- [x] **equipment-adjustments.md**: [C] Combined Layout: Tables + Accordions
  - *Should include quick-reference tables for equipment adjustments*
- [ ] **drills-library.md**: [C] Combined Layout: Filterable Cards + Accordions
  - Visual cards for each drill with filtering options (purpose, skill level)
  - Accordion details for each drill's instructions
- [x] **video-analysis.md**: Accordion Layout
  - *Current implementation is appropriate*

#### for-coaches/program-management/
- [x] **communication.md**: Accordion Layout
  - *Current implementation is appropriate*
- [x] **assessment-tools.md**: Accordion Layout
  - *Current implementation is appropriate*
- [ ] **administrative-guide.md**: [C] Combined Layout: Tabs by Phase + Accordions
  - Tabs for program phases (Pre-program, During, Post-program)
  - Accordion sections within each tab for specific tasks
  - Downloadable templates and checklists

#### for-coaches/safety-leadership/
- [ ] **safety-protocols.md**: [C] Combined Layout: Scenario Cards + Accordions
  - Visual scenario cards with quick actions
  - Detailed accordion content for each scenario
- [ ] **daily-safety-checklist.md**: [C] Interactive Checklist Layout
  - Digital checkable items grouped by category
  - Printable version with date fields
  - Mobile-friendly layout for on-dock use
- [x] **emergency-procedures.md**: [C] Decision Tree + Accordion Layout
  - Visual decision trees for emergency response
  - Accordion sections for detailed protocols
  - Emergency contact information prominently displayed
- [ ] **risk-management.md**: [C] Risk Matrix + Accordion Layout
  - Visual risk assessment matrix 
  - Accordion sections for detailed mitigation strategies

### Resources Section

#### resources/index.md
- [x] **Card-Based Layout with Resource Categories**
  - Visual cards for each resource category
  - Most accessed resources highlighted
  - Search functionality for quick resource finding

#### resources/club-policies/
- [x] **code-of-conduct.md**: [C] Tabs by Policy Section + Accordions
  - Tabbed navigation for policy sections
  - Accordion details for specific rules
  - Highlighted key points for emphasis
- [x] **safety-rules.md**: [C] Combined Layout: Priority Tables + Accordions
  - Table of critical safety rules highlighted
  - Accordion sections for detailed explanations
- [x] **boathouse-rules.md**: [C] Combined Layout: Location Map + Accordions
  - Interactive boathouse map with clickable areas
  - Accordion sections for area-specific rules

#### resources/quick-reference/
- [ ] **equipment-care.md**: [C] Combined Layout: Visual Guides + Accordions
  - Visual guides for equipment handling
  - Accordion sections for detailed care instructions
  - Printable quick-reference cards
- [ ] **blister-treatment.md**: [C] Visual Step-by-Step Guide
  - Sequential visual steps for treatment
  - Printable reference version
- [ ] **weather-reference.md**: [C] Interactive Weather Decision Matrix
  - Visual matrix of conditions and actions
  - Accordion details for specific protocols
  - Mobile-optimized for on-water decision making

#### resources/knowledge-assessment/
- [ ] **quizzes.md**: [C] Interactive Quiz Layout
  - Categorized quiz modules
  - Progress tracking across modules
  - Visual feedback for correct/incorrect answers
- [ ] **self-assessment.md**: [C] Interactive Skill Tracking Layout
  - Visual skill development chart
  - Checkable competency items
  - Progress visualization

### About Section
- [ ] **index.md**: Card-Based Layout with Program Features
  - Visual cards highlighting program features
  - Timeline of program history/development
- [ ] **team.md**: [C] Profile Card Grid Layout
  - Visual coach/instructor profile cards
  - Filterable by role/expertise
  - Brief bios with contact information
- [ ] **contact.md**: [C] Interactive Contact Form + FAQ Cards
  - User-friendly contact form
  - Quick-access FAQ cards for common inquiries
  - Contact information organized by department/need
- [ ] **faq.md**: [C] Combined Layout: Topic Tabs + Accordions
  - Tabbed categories for different question types
  - Accordion sections for Q&A content
  - Search functionality for finding specific questions

### Textbook Section
- [ ] **index.md**: [C] Interactive Chapter Navigation
  - Visual chapter cards with progress tracking
  - Clear linear progression indicators
  - Quick-jump table of contents
- [ ] **chapters/**: [C] Combined Layout for Each Chapter
  - Chapter overview with visual navigation
  - Accordion sections for detailed topics
  - Progress tracking between chapters
  - Interactive elements for key concepts

## Implementation Guidelines

1. **When to Use Tabs:**
   - For parallel content categories where users need to choose between distinct but related topics
   - For content that benefits from being organized into clear, separate sections
   - When screen space is limited and showing all content at once would be overwhelming
   - For A-Z navigation of reference materials like glossaries

2. **When to Use Accordions:**
   - For content with clear hierarchical organization
   - For FAQ-style content with questions and answers
   - For detailed reference material that most users only need portions of
   - For step-by-step processes that benefit from being collapsed or expanded
   - When mobile-friendly collapsible sections are needed

3. **When to Use Card-Based Layouts:**
   - For navigation pages with distinct content categories
   - For visual highlights of key features or resources
   - For team profiles, resources, or content with visual elements
   - When you need to encourage exploration of multiple content options

4. **When to Use Timeline Layouts:**
   - For sequential processes like session plans
   - For historical information or program progression
   - For step-by-step guides that benefit from visual sequence
   - For representing user journey or learning progression

5. **When to Use Tables:**
   - For comparative data presentation
   - For quick-reference information that needs structured format
   - For equipment specifications, settings, or measurements
   - For decision matrices with multiple variables

6. **When to Use Interactive Elements:**
   - For self-assessment tools and quizzes
   - For progress tracking features
   - For checklists and completion markers
   - For features that benefit from user input/interaction

7. **When to Use Combined Layouts:**
   - For complex pages with different types of information
   - When primary navigation needs sub-navigation
   - When content has both overview and detail components
   - For mobile-responsive designs that adapt to different screen sizes

8. **When to Use Standard Markdown:**
   - For narrative content that flows naturally from top to bottom
   - For simpler pages with limited content
   - For content that needs to be read in its entirety
   - When simplicity and loading speed are priorities

## Technical Implementation

For each file requiring special layouts, follow these implementation guidelines:

### 1. Basic Setup

Add the appropriate include statement(s) at the top of the markdown file:

```markdown
---
title: Page Title
layout: default
---

{% include tabs.html %}    <!-- For tabs layout -->
{% include accordion.html %}    <!-- For accordion layout -->
{% include timeline.html %}    <!-- For timeline layout (needs to be created) -->
<!-- Add other layout includes as needed -->
```

### 2. Tabs Layout

Structure tab content using:

```html
<div class="tab-container">
    <div class="tab-nav">
        <button class="tab-link active" data-tab="tab1">Tab 1 Title</button>
        <button class="tab-link" data-tab="tab2">Tab 2 Title</button>
        <button class="tab-link" data-tab="tab3">Tab 3 Title</button>
    </div>

    <div class="tab-content active" id="tab1">
        <div class="tab-content-inner">
            <h3>Section Heading</h3>
            <p>Content for Tab 1...</p>
            <!-- Any markdown or HTML can go here -->
        </div>
    </div>

    <div class="tab-content" id="tab2">
        <div class="tab-content-inner">
            <p>Content for Tab 2...</p>
        </div>
    </div>
    
    <div class="tab-content" id="tab3">
        <div class="tab-content-inner">
            <p>Content for Tab 3...</p>
        </div>
    </div>
</div>
```

#### Alphabetical Tabs (for Glossary)

```html
<div class="tab-container alpha-tabs">
    <div class="tab-nav">
        <button class="tab-link active" data-tab="tab-a">A</button>
        <button class="tab-link" data-tab="tab-b">B</button>
        <!-- Repeat for each letter -->
        <button class="tab-link" data-tab="tab-z">Z</button>
    </div>

    <div class="tab-content active" id="tab-a">
        <div class="tab-content-inner">
            <dl class="glossary">
                <dt>Adjustable</dt>
                <dd>Description of the term...</dd>
                <!-- More terms -->
            </dl>
        </div>
    </div>
    
    <!-- Repeat for each letter tab -->
</div>
```

### 3. Accordion Layout

Structure accordion content using:

```html
<div class="accordion-controls">
    <button id="expand-all">Expand All</button>
    <button id="collapse-all">Collapse All</button>
</div>

<div class="accordion-section">
    <button class="accordion-toggle">Section Title</button>
    <div class="accordion-content">
        <div class="accordion-content-inner">
            <p>Your content here...</p>
            <!-- Any markdown or HTML can go here -->
        </div>
    </div>
</div>

<div class="accordion-section">
    <button class="accordion-toggle">Another Section</button>
    <div class="accordion-content">
        <div class="accordion-content-inner">
            <p>More content here...</p>
        </div>
    </div>
</div>
```

#### Accordion with Skill Tags / Priority Indicators

```html
<div class="accordion-section">
    <button class="accordion-toggle">
        Section Title 
        <span class="skill-tag">Beginner</span>
        <span class="priority-tag high">Must Know</span>
    </button>
    <div class="accordion-content">
        <div class="accordion-content-inner">
            <p>Your content here...</p>
        </div>
    </div>
</div>
```

### 4. Card-Based Layout

Create a responsive card grid:

```html
<div class="card-grid">
    <a href="/path/to/page.html" class="card">
        <div class="card-image">
            <img src="/assets/images/icon-image.png" alt="Card Title">
        </div>
        <div class="card-content">
            <h3>Card Title</h3>
            <p>Brief description of the card content or destination</p>
        </div>
    </a>
    
    <a href="/path/to/another-page.html" class="card">
        <!-- Another card structure -->
    </a>
    
    <!-- More cards as needed -->
</div>
```

#### Feature Cards with Icons

```html
<div class="feature-cards">
    <div class="feature-card">
        <div class="icon">
            <i class="fas fa-life-ring"></i> <!-- Using Font Awesome or similar -->
        </div>
        <h3>Safety First</h3>
        <p>Brief description of the feature</p>
        <a href="/path/to/page" class="cta-button">Learn More</a>
    </div>
    
    <!-- More feature cards -->
</div>
```

### 5. Timeline Layout

Create a vertical timeline for session plans or sequential content:

```html
<div class="timeline">
    <div class="timeline-item">
        <div class="timeline-marker">
            <span class="time">9:00</span>
        </div>
        <div class="timeline-content">
            <h3>Activity Title</h3>
            <p>Description of the activity...</p>
            <ul>
                <li>Key point 1</li>
                <li>Key point 2</li>
            </ul>
        </div>
    </div>
    
    <div class="timeline-item">
        <div class="timeline-marker">
            <span class="time">9:30</span>
        </div>
        <div class="timeline-content">
            <!-- Another activity -->
        </div>
    </div>
    
    <!-- More timeline items -->
</div>
```

#### Progress Timeline

```html
<div class="progress-timeline">
    <div class="timeline-step completed">
        <div class="step-marker">1</div>
        <div class="step-content">
            <h4>Session 1</h4>
            <p>Introduction to Equipment</p>
        </div>
    </div>
    
    <div class="timeline-step active">
        <div class="step-marker">2</div>
        <div class="step-content">
            <h4>Session 2</h4>
            <p>Basic Stroke Technique</p>
        </div>
    </div>
    
    <!-- More steps -->
</div>
```

### 6. Table Layout

Create responsive tables for comparative data:

```html
<div class="table-container">
    <table class="data-table">
        <thead>
            <tr>
                <th>Problem</th>
                <th>Cause</th>
                <th>Solution</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Boat feels unstable</td>
                <td>Weight distribution too high</td>
                <td>Lower hands, relax shoulders</td>
            </tr>
            <!-- More table rows -->
        </tbody>
    </table>
</div>
```

#### Decision Matrix Table

```html
<div class="table-container">
    <table class="matrix-table">
        <thead>
            <tr>
                <th>Weather Condition</th>
                <th>Novice</th>
                <th>Intermediate</th>
                <th>Advanced</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Wind &lt; 5 mph</td>
                <td class="safe">Safe</td>
                <td class="safe">Safe</td>
                <td class="safe">Safe</td>
            </tr>
            <tr>
                <td>Wind 5-10 mph</td>
                <td class="caution">Caution</td>
                <td class="safe">Safe</td>
                <td class="safe">Safe</td>
            </tr>
            <!-- More conditions -->
        </tbody>
    </table>
</div>
```

### 7. Interactive Elements

#### Checklist Implementation

```html
<div class="interactive-checklist">
    <div class="checklist-item">
        <input type="checkbox" id="item1" name="checklist" value="item1">
        <label for="item1">Check footstretcher settings</label>
    </div>
    
    <div class="checklist-item">
        <input type="checkbox" id="item2" name="checklist" value="item2">
        <label for="item2">Adjust oarlock height</label>
    </div>
    
    <!-- More checklist items -->
</div>
```

#### Progress Tracking

```html
<div class="skill-tracker">
    <div class="skill-item">
        <div class="skill-name">Catch Position</div>
        <div class="progress-bar">
            <div class="progress" style="width: 75%;">75%</div>
        </div>
    </div>
    
    <div class="skill-item">
        <div class="skill-name">Recovery Sequence</div>
        <div class="progress-bar">
            <div class="progress" style="width: 50%;">50%</div>
        </div>
    </div>
    
    <!-- More skills -->
</div>
```

### 8. Image Gallery Layout

Create a responsive image gallery with lightbox support:

```html
<div class="image-gallery">
    <div class="gallery-item">
        <a href="/assets/images/full-size-image.jpg" class="lightbox">
            <img src="/assets/images/thumbnail.jpg" alt="Image description">
            <div class="caption">Image caption or description</div>
        </a>
    </div>
    
    <!-- More gallery items -->
</div>
```

#### Video Gallery

```html
<div class="video-gallery">
    <div class="video-item">
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-caption">
            <h4>Video Title</h4>
            <p>Brief description of the video content</p>
        </div>
    </div>
    
    <!-- More video items -->
</div>
```

### 9. Combined Layouts

Example of tabs containing accordions:

```html
<div class="tab-container">
    <div class="tab-nav">
        <button class="tab-link active" data-tab="tab1">Category 1</button>
        <button class="tab-link" data-tab="tab2">Category 2</button>
    </div>

    <div class="tab-content active" id="tab1">
        <div class="tab-content-inner">
            <div class="accordion-section">
                <button class="accordion-toggle">Section 1.1</button>
                <div class="accordion-content">
                    <div class="accordion-content-inner">
                        <p>Content for Section 1.1...</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-section">
                <button class="accordion-toggle">Section 1.2</button>
                <div class="accordion-content">
                    <div class="accordion-content-inner">
                        <p>Content for Section 1.2...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="tab-content" id="tab2">
        <!-- More accordion sections for tab 2 -->
    </div>
</div>
```

### 10. Interactive Maps/Diagrams

```html
<div class="interactive-map">
    <img src="/assets/images/river-map.png" alt="River Traffic Map" usemap="#rivermap">
    <map name="rivermap">
        <area shape="rect" coords="0,0,100,100" alt="North Dock" 
              data-content="North Dock Rules" data-title="North Dock">
        <!-- More area elements for different regions -->
    </map>
    
    <div id="map-tooltip" style="display: none;">
        <h4 id="tooltip-title"></h4>
        <div id="tooltip-content"></div>
    </div>
</div>
```

### 11. Required JavaScript and CSS

For the various interactive components, include:

```html
<!-- For tabs and accordions (already included) -->
<script src="{{ '/assets/js/tabs.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/accordion.js' | relative_url }}" defer></script>

<!-- For interactive elements -->
<script src="{{ '/assets/js/interactive.js' | relative_url }}" defer></script>

<!-- For image galleries with lightbox -->
<script src="{{ '/assets/js/lightbox.js' | relative_url }}" defer></script>

<!-- For interactive maps -->
<script src="{{ '/assets/js/interactive-map.js' | relative_url }}" defer></script>

<!-- For progress tracking (requires server-side storage) -->
<script src="{{ '/assets/js/progress-tracker.js' | relative_url }}" defer></script>
```

## Mobile Optimization Considerations

All layouts should be optimized for mobile devices, with special attention to:

1. **Touch-Friendly Elements:**
   - Larger touch targets for accordion toggles and tab buttons
   - Swipe gestures for image galleries and tabs
   - Appropriate spacing between interactive elements

2. **Responsive Design:**
   - Single-column layouts for narrow screens
   - Vertical stacking of card elements on mobile
   - Collapsible navigation for complex page structures

3. **Performance Optimization:**
   - Lazy loading for images and video content
   - Progressive loading for lengthy accordion content
   - Minimized initial load time for critical content

4. **On-Water Usage:**
   - High-contrast mode option for outdoor viewing
   - Critical safety information accessible offline
   - Quick-access emergency procedures
   - Water-resistant printable versions of key materials

## Priority Implementation Path

1. **High Impact, High Visibility Pages (Phase 1):**
   - Landing page (index.md) - Card-based navigation
   - for-learners/index.md - Combined tabs and cards
   - for-learners/safety/essential-rules.md - Accordion with priority indicators
   - for-learners/learning-journey/* - Session tabs with timeline

2. **Critical Technical Content (Phase 2):**
   - for-learners/technique/basic-technique.md - Combined tabs and images
   - for-learners/technique/common-fixes.md - Problem/solution tables
   - for-coaches/session-plans/* - Timeline with accordions
   - for-coaches/safety-leadership/emergency-procedures.md - Decision trees

3. **Reference Materials (Phase 3):**
   - for-learners/resources/glossary.md - A-Z tabbed interface
   - resources/club-policies/* - Tabs and accordions
   - resources/quick-reference/* - Visual guides

4. **Interactive Elements (Phase 4):**
   - resources/knowledge-assessment/quizzes.md - Interactive quiz layout
   - for-learners/resources/assessment.md - Progress tracking
   - for-coaches/safety-leadership/daily-safety-checklist.md - Interactive checklist

5. **Remaining Content (Phase 5):**
   - Complete textbook section
   - About section
   - Any remaining pages

Each phase should include thorough testing on both desktop and mobile devices before proceeding to the next phase.
