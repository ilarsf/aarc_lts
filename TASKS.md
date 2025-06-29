## Why these tasks matter

Addressing the items below will bring the site substantially closer to WCAG 2.1 AA conformance. Each task is **self‑contained**—it names the affected file(s), shows the exact code to add or change, and states an acceptance criterion. The tasks are ordered top‑to‑bottom by **Priority → Effort → Scope**, so you can work from the most impactful quick wins toward the deeper refactors. Key WCAG references and best‑practice links are cited for every task.

---

## Global high‑impact tasks

* [ ] **Add descriptive `alt` text for every image**
  *Location*: all Markdown/HTML where images appear (`assets/img`, `index.md`, session pages).
  *Action*: Replace `![](hero.jpg)` with

  ```markdown
  ![Scullers launching on the Huron River](assets/img/hero.jpg)
  ```

  *Acceptance*: No **“Missing alt”** errors in Lighthouse or Pa11y; every image conveys equivalent information.
  *Why*: Meets **WCAG 2.1 SC 1.1.1 Text Alternatives**.([w3.org][1])

* [ ] **Fix low‑contrast footer text**
  *Location*: `_sass/custom.scss`.
  *Action*:

  ```scss
  // before: #7c7c7c on #ffffff ≈ 2.8 : 1 (fails)
  $footer-text-color: #595959; // ≥ 4.5 : 1
  footer { color: $footer-text-color; }
  ```

  *Acceptance*: Colour contrast ≥ 4.5 : 1 for normal text as verified with the W3C contrast tool.
  *Why*: Satisfies **SC 1.4.3 Contrast (Minimum)**.([w3.org][2])

* [ ] **Insert a keyboard “Skip to main content” link**
  *Location*: immediately after `<body>` in `_layouts/default.html`.
  *Action*:

  ```html
  <a class="sr-only sr-only-focusable" href="#main">Skip to main content</a>
  ```

  *Acceptance*: Pressing `Tab` once from the top focuses the link and sends focus to `#main`.
  *Why*: Required by **SC 2.4.1 Bypass Blocks**.([w3.org][3])

* [ ] **Ensure always‑visible focus styling**
  *Location*: `_sass/custom.scss`.
  *Action*:

  ```scss
  :focus-visible { outline: 3px solid #005fcc; outline-offset: 2px; }
  ```

  *Acceptance*: Every focusable element shows a clear outline when navigated via keyboard.
  *Why*: Supports keyboard guidance in MDN focus‑visible docs.([developer.mozilla.org][4])

---

## Navigation & layout

* [ ] **Make the dropdown navigation keyboard‑friendly**
  *Location*: `_includes/header.html` or equivalent.
  *Action* (quick method): wrap each submenu in native `<details>`/`<summary>` so it opens with **Enter/Space** and closes with **Esc**.

  ```html
  <details class="nav-item">
    <summary>Programs</summary>
    <ul><li><a href="/lts/">Learn to Scull</a></li>…</ul>
  </details>
  ```

  *Acceptance*: All items reachable via **Tab/Shift‑Tab**; visible focus ring; submenu collapses when focus leaves.
  *Why*: Ensures fly‑out menus remain operable without a mouse.([w3.org][5])

* [ ] **Add main landmarks**
  *Location*: wrap each page’s primary content in `<main id="main">`.
  *Acceptance*: Browser accessibility tree shows exactly one `<main>` per page.
  *Why*: Improves semantic structure per HTML accessibility guidance.([developer.mozilla.org][6])

---

## Re‑usable components

* [ ] **Refactor `tabs.html` include to ARIA pattern**
  *Location*: `_includes/tabs.html`.
  *Action*:

  ```html
  <div role="tablist" aria-label="{{ include.label }}">
    {% for tab in include.tabs %}
      <button id="{{tab.id}}"
              role="tab"
              aria-selected="{{ tab.active }}"
              aria-controls="{{tab.id}}-panel">
        {{ tab.label }}
      </button>
    {% endfor %}
    …
  </div>
  <section id="{{tab.id}}-panel" role="tabpanel" tabindex="0" …>
  ```

  *Acceptance*: Arrow keys cycle tabs; **Enter/Space** activates; screen reader announces “Tab, selected …”.
  *Why*: Conforms to WAI‑ARIA **Tabs Pattern**.([w3.org][7])

* [ ] **Convert accordions to accessible pattern**
  *Location*: `_includes/accordion.html` (and any inline accordions).
  *Action*: use `<button class="accordion-toggle" aria-expanded="false" aria-controls="panel‑{{forloop.index}}">…</button>` and toggle attributes in JS.
  *Acceptance*: **Space/Enter** toggles; state announced; IDs unique.
  *Why*: Matches WAI‑ARIA **Accordion Pattern**.([w3.org][8])

* [ ] **Add unique IDs in includes**
  *Location*: wherever duplicate IDs occur (e.g., cards).
  *Action*: append `{{ page.slug }}` to IDs:

  ```liquid
  id="{{ include.id | append: '-' | append: page.slug }}"
  ```

  *Acceptance*: W3C validator reports no duplicate `id`.
  *Why*: Duplicate IDs break **HTML 5 validity** and assistive‑tech navigation.([webaim.org][9])

* [ ] **Stop carousel auto‑rotation & add pause control**
  *Location*: `carousel.html`.
  *Action*:

  ```html
  <div id="sessionCarousel" class="carousel slide" data-bs-ride="false">
    … ‹existing slides› …
    <button class="carousel-control-pause" aria-label="Pause slide show">❚❚</button>
  </div>
  ```

  Add JS to toggle `data-bs-interval`.
  *Acceptance*: Auto‑advance off by default; keyboard users can start/stop.
  *Why*: Complies with **SC 2.2.2 Pause, Stop, Hide**; Bootstrap supports this.([getbootstrap.com][10])

---

## Forms & quizzes

* [ ] **Group radio buttons with `<fieldset>`/`<legend>`**
  *Location*: `quiz.html`, `session‑quiz.md`.
  *Action*:

  ```html
  <fieldset>
    <legend>Which command stops the boat?</legend>
    <label><input type="radio" name="q1" …>Hold Water</label>
    …
  </fieldset>
  ```

  *Acceptance*: Screen reader announces “group… 3 choices”.
  *Why*: Clarifies relationships per WAI forms tutorial.([w3.org][11])

* [ ] **Announce form errors via live region**
  *Location*: same quiz templates.
  *Action*:

  ```html
  <div id="quiz-status" role="alert" class="visually-hidden"></div>
  // JS
  status.textContent = 'Please answer all questions before submitting';
  status.classList.remove('visually-hidden');
  ```

  *Acceptance*: Message announced immediately without focus jump.
  *Why*: Uses **ARIA role="alert"** live region.([developer.mozilla.org][12], [developer.mozilla.org][13])

* [ ] **Add text equivalents for pass/fail**
  *Location*: quiz results modal.
  *Action*:

  ```html
  <p class="results"><strong>Result:</strong> <span class="status">Passed</span></p>
  ```

  Colour may still vary, but text conveys meaning.
  *Why*: Meets **SC 1.4.1 Use of Color**.([w3.org][14], [w3.org][15])

---

## Visual semantics

* [ ] **Replace icon‑only cues in `Session 2` colour blocks**
  *Location*: `session‑2.md`.
  *Action*: add visually hidden label:

  ```html
  <span class="visually-hidden">Preparation section</span>
  ```

  *Acceptance*: Colour‑blind users receive same info.
  *Why*: Addresses **SC 1.4.1 Use of Color**.([w3.org][16])

* [ ] **Swap pseudo‑element arrow icons for inline SVG**
  *Location*: `session‑4.md`, SCSS.
  *Action*:

  ```html
  <svg aria-hidden="true" focusable="false" …><path d="…"/></svg>
  ```

  *Acceptance*: Icon no longer skipped by screen readers but marked decorative.
  *Why*: Ensures semantic clarity; see MDN ARIA basics.([developer.mozilla.org][17])

* [ ] **Regularise heading hierarchy**
  *Location*: any Markdown with skipped levels (`##` → `####`).
  *Action*: downgrade/upgrade headings so levels increase by 1.
  *Acceptance*: No skipped levels flagged by aXe.
  *Why*: Structural headings improve navigation; see MDN HTML accessibility.([developer.mozilla.org][6])

---

## Link semantics

* [ ] **Label external links & new‑tab behaviour**
  *Location*: templates and Markdown where `target="_blank"` or external sites used.
  *Action*:

  ```html
  <a href="https://clubexpress.com" target="_blank"
     rel="noopener" aria-label="Register on ClubExpress (opens in new tab)">
    Register Online
  </a>
  ```

  *Acceptance*: Screen reader announces “opens in new tab”.
  *Why*: Helps users anticipate context changes.([webaim.org][9])

---

### Done!

Tick ☑︎ each box once the acceptance criteria are met and commit your changes. When everything is checked, run an automated scan (Pa11y CI or Lighthouse) and a manual screen‑reader pass to confirm no new regressions.

---

**Next steps**
Merge these improvements in a feature branch, open a Pull Request for review, and schedule a follow‑up audit to ensure ongoing WCAG AA compliance.

[1]: https://www.w3.org/WAI/WCAG21/Understanding/text-alternatives?utm_source=chatgpt.com "Understanding Guideline 1.1: Text Alternatives | WAI | W3C"
[2]: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html?utm_source=chatgpt.com "Understanding Success Criterion 1.4.3: Contrast (Minimum) | WAI | W3C"
[3]: https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html?utm_source=chatgpt.com "Understanding Success Criterion 2.4.1: Bypass Blocks | WAI | W3C"
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/%3Afocus-visible?utm_source=chatgpt.com ":focus-visible - CSS | MDN"
[5]: https://www.w3.org/WAI/tutorials/menus/flyout/?utm_source=chatgpt.com "Fly-out Menus | Web Accessibility Initiative (WAI) | W3C"
[6]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML?utm_source=chatgpt.com "HTML: A good basis for accessibility - MDN Web Docs"
[7]: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/?utm_source=chatgpt.com "Tabs Pattern | APG | WAI | W3C"
[8]: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/?utm_source=chatgpt.com "Accordion Pattern (Sections With Show/Hide Functionality)"
[9]: https://webaim.org/standards/wcag/checklist?utm_source=chatgpt.com "WebAIM's WCAG 2 Checklist"
[10]: https://getbootstrap.com/docs/5.3/components/carousel/?utm_source=chatgpt.com "Carousel · Bootstrap v5.3"
[11]: https://www.w3.org/WAI/tutorials/forms/grouping/?utm_source=chatgpt.com "Grouping Controls | Web Accessibility Initiative (WAI) | W3C"
[12]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role?utm_source=chatgpt.com "ARIA: alert role - ARIA | MDN - MDN Web Docs"
[13]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions?utm_source=chatgpt.com "ARIA live regions - MDN Web Docs"
[14]: https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html?utm_source=chatgpt.com "Understanding Success Criterion 1.4.1: Use of Color | WAI | W3C"
[15]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html?utm_source=chatgpt.com "Understanding Success Criterion 1.4.1 | Understanding WCAG 2.0"
[16]: https://www.w3.org/WAI/WCAG21/Techniques/general/G183.html?utm_source=chatgpt.com "Using a contrast ratio of 3:1 with surrounding text and providing ..."
[17]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA?utm_source=chatgpt.com "ARIA - Accessibility | MDN - MDN Web Docs"
