<!-- filepath: /Users/larsf/Dropbox (Personal)/AARC/GitHub/aarc_lts/footer_link_analysis.md -->
# Footer Navigation Implementation Progress

This document tracks the progress of implementing a standardized footer navigation menu across HTML and Markdown files. The initial analysis involved:

- Reviewing files listed in `found_files.txt`.
- Identifying existing footer links (e.g., previous/next pages, parent sections, top of page).
- Documenting findings, including file path, link presence, link nature, and replaceability by a standardized footer.

The table below will be used to track the implementation status for each file.

This document summarizes the analysis of links found at the bottom of HTML and Markdown pages in the repository.

| File Path | Bottom Links Present? | Link Types / Destination | Replaceable by Nav Menu? | Status | Notes |
|-----------|----------------------|-------------------------|--------------------------|--------|-------|
| for-coaches/program-management/communication.md | Yes | Links to "Administrative Guide" and "Emergency Communication Procedures" (resource links section at bottom) | Yes | Not Started | Resource links could be standardized in a footer nav. |
| for-coaches/program-management/graduation.md | No | None at bottom | Yes | Not Started | No footer links; could add standardized nav. |
| for-coaches/program-management/assessment-tools.md | No | None at bottom | Yes | Not Started | No footer links; could add standardized nav. |
| for-coaches/program-management/administrative-guide.md | No | None at bottom | Yes | Not Started | No footer links; could add standardized nav. |
| for-coaches/program-management/index.md | Yes | List of internal resource links (Administrative Guide, Assessment Tools, Communication) | Yes | Not Started | Resource links at bottom; could be replaced by nav menu. |
| for-coaches/session-plans/overview.md | Yes | "View Session X Plan" buttons (internal navigation) | Yes | Not Started | Session navigation could be standardized. |
| for-coaches/session-plans/session-2.md | Yes | "Back to All Sessions" button | Yes | Not Started | Could be replaced by nav menu. |
| for-coaches/session-plans/session-3.md | Yes | "Back to All Sessions" button | Yes | Not Started | Could be replaced by nav menu. |
| for-coaches/session-plans/index.md | Yes | List of session plan links | Yes | Not Started | Could be replaced by nav menu. |
| for-coaches/session-plans/session-4.md | Yes | "Back to All Sessions" button | Yes | Not Started | Could be replaced by nav menu. |
| for-coaches/session-plans/session-1.md | Yes | "Back to All Sessions" button | Yes | Not Started | Could be replaced by nav menu. |
| for-coaches/safety-leadership/safety-protocols.md | Yes | Links to related safety docs (Daily Safety Checklist, Emergency Procedures) | Yes | Not Started | Resource links at bottom; could be standardized. |
| for-coaches/safety-leadership/emergency-procedures.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/safety-leadership/daily-safety-checklist.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/safety-leadership/risk-management.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/safety-leadership/index.md | Yes | List of safety resource links | Yes | Not Started | Could be replaced by nav menu. |
| for-coaches/index.md | No | None at bottom (password-protected content) | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/technical-coaching/common-issues.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/technical-coaching/equipment-adjustments.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/technical-coaching/index.md | Yes | List of technical coaching resource links | Yes | Not Started | Could be replaced by nav menu. |
| for-coaches/technical-coaching/drills-library.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/technical-coaching/coaching-language.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-coaches/technical-coaching/video-analysis.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/learning-journey/session-2.md | Yes | Timeline navigation links to other sessions | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/learning-journey/session-3.md | Yes | Timeline navigation links to other sessions | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/learning-journey/index.md | Yes | List of session links | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/learning-journey/session-4.md | Yes | Timeline navigation links to other sessions | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/learning-journey/session-1.md | Yes | Timeline navigation links to other sessions | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/resources/membership.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/glossary.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/faq.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/quizzes.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/index.md | Yes | List of resource links and quiz button | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/resources/_site/next-steps.html | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/_site/glossary.html | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/_site/assessment.html | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/_site/faq.html | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/resources/next-steps.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/technique/videos.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/technique/basic-technique.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/technique/index.md | Yes | List of technique resource links | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/safety/essential-rules.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/safety/index.md | Yes | List of safety resource links | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/safety/self-rescue.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/getting-started/preparation.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/getting-started/terminology.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/getting-started/index.md | Yes | List of getting started resource links | Yes | Not Started | Could be replaced by nav menu. |
| for-learners/getting-started/program-overview.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| for-learners/index.md | Yes | Tabbed navigation to all main sections | Yes | Not Started | Could be replaced by nav menu. |
| resources/AARC-LearntoScullClassPlan_20250521.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| resources/quiz_module_embed.html | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| resources/quiz_module.html | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| resources/Rowers_Hand_Blister_Treatment.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| resources/index.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| resources/Sculling_Self_Rescue_Guide.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| resources/Learn_to_Scull_Safety_Rules.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/contact.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/faq.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/index.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/team.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/club-policies/boathouse-rules.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/club-policies/code-of-conduct.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/club-policies/index.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| about/club-policies/safety-rules.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
| ./index.md | No | None at bottom | Yes | Not Started | No footer links; could add nav menu. |
