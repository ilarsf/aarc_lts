# Website upgrade review — September 23, 2026

## Acceptance criteria

- Keep the AARC logo, blue palette, sans serif typography, and branded favicon usable at desktop and mobile widths.
- Make 2027 status clear wherever 2026 schedules, fees, continuation plans, or coach information appear.
- Give learners and members a clear route to the right guide, with no broken internal links.
- Make shared disclosures and key safety controls operable by keyboard, with accurate expanded states and visible focus.

## Completed

- Added a 2027 notice to the learner guide, linked the homepage notice to contact, and labeled the continuation guidance and fees as 2026 examples.
- Routed Members to a role choice page and aligned the coach header with the public navigation, brand mark, and skip link.
- Repaired internal destinations in learner, policy, coach, and Open Sculling resources. Removed links to downloads and forms that are not available in this site.
- Updated shared accordions, safety rules, tabs, and self-rescue controls so hidden content, expanded state, and focus cues match the visible interface.
- Removed an unused Mermaid CDN request from every page.

## Follow-up flow and accessibility review

- Put 2027 class status first on the homepage and moved learner safety resources before session guides. Removed the duplicate Self-Rescue card and clarified when to use the river rules, route guide, quizzes, and terminology.
- Gave returning Open Sculling members direct links to common tasks. Added contact routes and accessible error feedback to both member access forms.
- Aligned the Open Sculling header with the AARC logo, navigation label, and skip link. Corrected mobile submenu visibility and Escape focus return.
- Restored skill-level labels in the mobile weather decision matrix and kept table headings available to assistive technology. Collapsed weather sections now hide their contents from keyboard navigation.
- Replaced eager video embeds with keyboard-operable play controls, a focused dialog, and live filter results.
- Kept quiz answer feedback visible until the learner activates Next Question or See Results. Moved focus to feedback, each new question, and the results and review headings; quiz links now work as ordinary links.

## Verification

- `bundle exec jekyll build` passed.
- Generated site link audit: 97 HTML pages, zero broken internal links or fragments.
- Chromium checks passed at desktop and mobile widths for the homepage brand, logo, favicon, navigation, Members page, FAQ, safety rules, policy tabs, coach header, and self-rescue controls.
- Follow-up Chromium checks passed at 320px for the learner order, member forms, mobile menu, weather matrix, video library keyboard/dialog/filter flows, and a complete 15-question quiz.
- `git diff --check` passed.

## Remaining limitation

The coach and Open Sculling access prompts run in browser code on a static site. They should not be treated as protection for confidential information. A private hosting or authentication service would be needed for that.

## 2026 hot-weather policy alignment

Compared the site with the supplied AARC Hot-Weather Rowing (Heat Index) Cutoff Policy 2026 PDF. The previous Open Sculling weather guide allowed modified outdoor practice through 105°F heat index, conflicting with the policy's no-outdoor-workouts cutoff at 98°F. Updated the decision matrix, detailed weather guide, quick reference, learner guidance, club safety rules, coach protocols, and daily checklist to use the policy's exact thresholds. Added the policy PDF under `assets/policies/` and linked it from the affected pages. The policy applies to organized outdoor sessions and individual use of AARC-owned boats; its private disclosure and opt-out provisions are now described on the site.
