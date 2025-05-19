# AARC Learn to Scull Program - Content Reorganization Plan

This document serves as both a reference for the proposed content structure and a checklist to track progress on the reorganization effort.

## Current Content Catalog

A comprehensive inventory of all content currently in the repository:

- [x] **Main Entry Point**
  - `index.md`: Main landing page with program introduction, format, session dates

- [x] **Learner Materials**
  - Core Learning Materials
    - `course_materials/learner/Learner_Guide.md`: Comprehensive guide with tabbed sections
    - `course_materials/learner/QA_Companion.md`: Frequently asked questions organized by topics
    - `course_materials/learner/Program_Schedule.md`: Session-by-session breakdown
    - `course_materials/learner/Textbook.md`: Linear format reference
  - Technical Content
    - `course_materials/learner/technical/Common_Rowing_Fixes.md`: Troubleshooting technical issues
    - `course_materials/learner/technical/Instructional_Videos.md`: Video resources
    - `course_materials/learner/technical/Rowing_Terminology.md`: Glossary of terms
    - `course_materials/learner/technical/Technical_Frameworks.md`: Technical concepts
  - Safety Content
    - `course_materials/learner/safety/River_Traffic_Guide.md`: Navigation rules
    - `course_materials/learner/safety/Weather_Guidelines.md`: Weather-related safety information
    - `resources/Sculling_Self_Rescue_Guide.md`: Flip test and self-rescue procedures
    - `resources/Learn_to_Scull_Safety_Rules.md`: Program-specific safety rules

- [x] **Coach Materials**
  - Session Plans
    - `coach_portal/session_plans/Session_1_Plan.md`: Session 1 detailed plan
    - `coach_portal/session_plans/Session_2_Plan.md`: Session 2 detailed plan
    - `coach_portal/session_plans/Session_3_Plan.md`: Session 3 detailed plan
    - `coach_portal/session_plans/Session_4_Plan.md`: Session 4 detailed plan
    - `coach_portal/session_plans/index.md`: Session plans overview
  - Technical Coaching Resources
    - `coach_portal/technical/Coaching_Language_Guide.md`: Terminology and communication
    - `coach_portal/technical/Common_Technical_Issues_and_Corrections.md`: Problem-solving guide
    - `coach_portal/technical/Equipment_Adjustment_Reference.md`: Equipment setup guidance
    - `coach_portal/technical/Key_Drills_Repertoire.md`: Training drills collection
    - `coach_portal/technical/Technical_Frameworks.md`: Technical teaching frameworks
    - `coach_portal/technical/Video_Analysis_Guide.md`: Video analysis instruction
  - Coach Management
    - `coach_portal/assessment/`: Participant evaluation tools
    - `coach_portal/communication/`: Templates and guidelines
    - `coach_portal/manual/`: Program management instructions
    - `coach_portal/safety/`: Coach-specific safety protocols

- [x] **General Resources**
  - `resources/AARC_Code_of_Conduct_2025-02-26.pdf`: Club conduct policy
  - `resources/AARC_Safety_Rules.pdf`: General safety rules
  - `resources/Boathouse_Rules_and_Equipment_Care.md`: Facility usage guidelines
  - `resources/Rowers_Hand_Blister_Treatment.md`: Health information
  - Quiz materials (various CSV files in resources directory)

- [x] **Textbook Format**
  - `textbook/chapters/part1.md`: Getting Started
  - `textbook/chapters/part2.md`: For the Learner
  - `textbook/chapters/part3.md`: Safety
  - `textbook/chapters/part4.md`: For the Coach

- [x] **Quick Answers**
  - `quick-answers/index.md`: Categorized FAQ

- [x] **Search Functionality**
  - `search/index.md`: Site-wide search capability

## Proposed Reorganized Structure

Use this checklist to track implementation of the new structure. Check off items as they are completed.

```
/
├── [x] index_new.md (Landing page with basic program info and clear navigation)
│
├── [x] for-learners/
│   ├── [x] index.md (Learner hub with clear path for progression)
│   ├── [x] getting-started/
│   │   ├── [x] program-overview.md (What to expect)
│   │   ├── [x] preparation.md (What to bring, wear, etc.)
│   │   └── [x] terminology.md (Basic rowing terms)
│   ├── [x] learning-journey/
│   │   ├── [x] session-1.md (Content specific to session 1)
│   │   ├── [x] session-2.md (Content specific to session 2)
│   │   ├── [x] session-3.md (Content specific to session 3)
│   │   └── [x] session-4.md (Content specific to session 4)
│   ├── [x] technique/
│   │   ├── [x] basic-technique.md (Fundamental rowing movements)
│   │   ├── [x] common-fixes.md (Solutions to common problems)
│   │   ├── [x] videos.md (Instructional video resources)
│   │   └── [x] advanced-technique.md (For continuing development)
│   ├── [x] safety/
│   │   ├── [x] essential-rules.md (Must-know safety rules)
│   │   ├── [x] self-rescue.md (Flip test and recovery procedures)
│   │   ├── [x] river-traffic.md (Navigation patterns)
│   │   └── [x] weather-guidelines.md (Weather-related protocols)
│   └── [x] resources/
│       ├── [x] faq.md (Frequently asked questions)
│       ├── [x] glossary.md (Complete terminology reference)
│       ├── [x] assessment.md (How you'll be evaluated)
│       └── [x] next-steps.md (Post-program opportunities)
│
├── [x] for-coaches/
│   ├── [x] index.md (Password protected coach portal)
│   ├── [x] session-plans/
│   │   ├── [x] overview.md (Program structure)
│   │   ├── [x] session-1.md (Detailed session 1 plan)
│   │   ├── [x] session-2.md (Detailed session 2 plan)
│   │   ├── [x] session-3.md (Detailed session 3 plan)
│   │   └── [x] session-4.md (Detailed session 4 plan)
│   ├── [x] technical-coaching/
│   │   ├── [x] coaching-language.md (How to communicate effectively)
│   │   ├── [x] common-issues.md (Problems and corrections)
│   │   ├── [x] equipment-adjustments.md (Boat setup guide)
│   │   ├── [x] drills-library.md (Teaching exercises)
│   │   └── [x] video-analysis.md (How to use video effectively)
│   ├── [x] program-management/
│   │   ├── [x] communication.md (Templates and protocols)
│   │   ├── [x] assessment-tools.md (Evaluation resources)
│   │   └── [x] administrative-guide.md (Program logistics)
│   └── [x] safety-leadership/
│       ├── [x] safety-protocols.md (Coach-specific safety info)
│       ├── [x] daily-safety-checklist.md (Pre-session safety checks)
│       ├── [x] emergency-procedures.md (Emergency response)
│       └── [x] risk-management.md (Identifying and mitigating risks)
│
├── [x] resources/
│   ├── [x] index.md (Centralized resource hub)
│   ├── [x] club-policies/
│   │   ├── [x] code-of-conduct.md
│   │   ├── [x] safety-rules.md
│   │   └── [x] boathouse-rules.md
│   ├── [x] quick-reference/
│   │   ├── [x] equipment-care.md
│   │   ├── [x] blister-treatment.md
│   │   └── [x] weather-reference.md
│   └── [x] knowledge-assessment/
│       ├── [x] quizzes.md (Interactive knowledge checks)
│       └── [x] self-assessment.md (Track your own progress)
│
└── [x] about/
    ├── [x] index.md (About the program)
    ├── [x] team.md (Instructors and contributors)
    ├── [x] contact.md (How to get help)
    └── [x] faq.md (General program questions)
```

## Content Migration Guide

### For each new section, follow these steps:

1. Create the necessary directory structure
2. Create the new markdown file with appropriate front matter
3. Migrate and reorganize content from the original source files
4. Update internal links to reflect the new structure
5. Check for redundant information and consolidate where appropriate
6. Ensure the content follows a logical progression within the section
7. Update the checklist in this document when complete

## Detailed Section Descriptions

### 1. Landing Page (index.md)
**Purpose:** Provide a welcoming introduction and clear navigation paths
**Content Includes:**
- Brief program introduction
- Key program highlights (format, dates, cost)
- Clear navigation paths for different user types
- Featured image(s)
- Quick access links to most important resources

### 2. For Learners Section
**Purpose:** Provide a structured learning path for program participants

#### getting-started/
- **program-overview.md**: Program structure, what to expect across the sessions
- **preparation.md**: What to bring, appropriate clothing, preparation checklist
- **terminology.md**: Essential rowing vocabulary for beginners

#### learning-journey/
- **session-X.md files**: Each session page includes:
  - Session objectives
  - Skills to be learned
  - Pre-session preparation
  - Post-session practice recommendations
  - Links to relevant technical and safety content

#### technique/
- **basic-technique.md**: Foundational rowing movements and concepts
- **common-fixes.md**: Solutions to typical beginner issues
- **videos.md**: Curated instructional videos with descriptions
- **advanced-technique.md**: More refined technique for skills development

#### safety/
- **essential-rules.md**: Core safety rules every rower must know
- **self-rescue.md**: Complete flip test and recovery procedure
- **river-traffic.md**: Navigation rules and patterns
- **weather-guidelines.md**: Weather-related protocols and decision making

#### resources/
- **faq.md**: Comprehensive learner FAQ
- **glossary.md**: Complete terminology reference
- **assessment.md**: Evaluation criteria and self-assessment tools
- **next-steps.md**: Information about continuing with rowing after the program

### 3. For Coaches Section
**Purpose:** Provide comprehensive teaching resources for program instructors
**Note:** All content password protected

#### session-plans/
- **overview.md**: Program structure and teaching philosophy
- **session-X.md files**: Each includes:
  - Detailed timeline
  - Teaching objectives
  - Required equipment
  - Setup instructions
  - Specific activities with timing
  - Common issues to watch for
  - Assessment criteria

#### technical-coaching/
- **coaching-language.md**: Effective terminology and communication techniques
- **common-issues.md**: Comprehensive troubleshooting guide
- **equipment-adjustments.md**: How to adjust equipment for different rowers
- **drills-library.md**: Complete collection of teaching drills with purposes
- **video-analysis.md**: How to effectively use video for feedback

#### program-management/
- **communication.md**: Email templates, communication protocols
- **assessment-tools.md**: Evaluation forms and criteria
- **administrative-guide.md**: Registration, logistics, equipment management

#### safety-leadership/
- **safety-protocols.md**: Coach-specific safety responsibilities
- **emergency-procedures.md**: Response protocols for various scenarios
- **risk-management.md**: How to identify and mitigate potential hazards

### 4. Resources Section
**Purpose:** Centralized repository for club policies and supplementary materials

#### club-policies/
- Official club documents organized by type

#### quick-reference/
- Stand-alone reference guides for specific topics

#### knowledge-assessment/
- Quiz modules and self-assessment tools

### 5. Textbook Section
**Purpose:** Provide traditional linear learning format as an alternative navigation option
- Preserves existing textbook structure but with updated navigation and cross-links

### 6. About Section
**Purpose:** General program information and contact resources
- Program history and philosophy
- Team information
- Contact details
- General FAQs

## Implementation Notes

1. Begin with creating the directory structure, then focus on the most critical learner pathways
2. Use redirects where appropriate to maintain compatibility with any existing links
3. Consider implementing breadcrumb navigation to help users understand their location
4. Update all cross-references between documents to use the new paths
5. Test navigation thoroughly after each major section is completed

## Website Navigation Implementation

After content reorganization, implement these navigation features:

- [ ] Main top navigation menu with primary sections
- [ ] Side navigation for subsections when viewing section content
- [ ] Breadcrumb trails showing current location
- [ ] "Related content" links at the bottom of each page
- [ ] Clear return paths to section hubs
- [ ] Consistent footer navigation on all pages
