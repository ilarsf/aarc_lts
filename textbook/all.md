---
layout: default
title: "Complete Textbook - AARC Learn to Scull"
---

<div class="textbook-container">
  <div class="textbook-header">
    <a href="{{ site.baseurl }}/textbook/" class="textbook-home-link">« Textbook Home</a>
    <h1>AARC Learn to Scull - Complete Textbook</h1>
  </div>

<div class="textbook-full-toc">
  <h2>Table of Contents</h2>
  
  <ul class="toc-main">
    <li><a href="#part-1-getting-started">Part 1: Getting Started</a>
      <ul>
        <li><a href="#chapter-1-introduction">Chapter 1: Introduction</a></li>
        <li><a href="#chapter-2-your-first-session-what-to-expect--bring">Chapter 2: Your First Session</a></li>
      </ul>
    </li>
    <li><a href="#part-2-for-the-learner">Part 2: For the Learner</a>
      <ul>
        <li><a href="#chapter-3-rowing-fundamentals">Chapter 3: Rowing Fundamentals</a></li>
        <li><a href="#chapter-4-developing-your-technique">Chapter 4: Developing Your Technique</a></li>
        <li><a href="#chapter-5-essential-skills--knowledge">Chapter 5: Essential Skills & Knowledge</a></li>
      </ul>
    </li>
    <li><a href="#part-3-safety">Part 3: Safety</a>
      <ul>
        <li><a href="#chapter-6-on-water-safety-protocols">Chapter 6: On-Water Safety Protocols</a></li>
        <li><a href="#chapter-7-capsize-recovery-the-flip-test--self-rescue">Chapter 7: Capsize Recovery</a></li>
      </ul>
    </li>
    <li><a href="#part-4-appendices">Part 4: Appendices</a>
      <ul>
        <li><a href="#appendix-a-glossary-of-rowing-terms">Appendix A: Glossary of Rowing Terms</a></li>
        <li><a href="#appendix-b-aarc-policies">Appendix B: AARC Policies</a></li>
        <li><a href="#appendix-c-resources--next-steps">Appendix C: Resources & Next Steps</a></li>
      </ul>
    </li>
  </ul>
</div>

<div class="textbook-cover">
  <h2>AARC Learn to Scull</h2>
  <p class="textbook-subtitle">Complete Textbook</p>
  <div class="textbook-cover-info">
    <p>Ann Arbor Rowing Club</p>
    <p>Learn to Scull Program</p>
    <p>{{ "now" | date: '%Y' }}</p>
  </div>
</div>

<hr class="section-divider">

<div class="textbook-content">
  <h1 id="part-1-getting-started" class="part-heading">Part 1: Getting Started</h1>

  <div class="textbook-part">
    {% capture part1_content %}{% include textbook/Part1-GettingStarted.md %}{% endcapture %}
    {{ part1_content | markdownify }}
  </div>

  <hr class="section-divider">

  <h1 id="part-2-for-the-learner" class="part-heading">Part 2: For the Learner</h1>

  <div class="textbook-part">
    {% capture part2_content %}{% include textbook/Part2-ForTheLearner.md %}{% endcapture %}
    {{ part2_content | markdownify }}
  </div>

  <hr class="section-divider">

  <h1 id="part-3-safety" class="part-heading">Part 3: Safety</h1>

  <div class="textbook-part">
    {% capture part3_content %}{% include textbook/Part3-Safety.md %}{% endcapture %}
    {{ part3_content | markdownify }}
  </div>

  <hr class="section-divider">

  <h1 id="part-4-appendices" class="part-heading">Part 4: Appendices</h1>

  <div class="textbook-part">
    {% capture part4_content %}{% include textbook/Part4-Appendices.md %}{% endcapture %}
    {{ part4_content | markdownify }}
  </div>
</div>

<div class="textbook-footer">
  <a href="{{ site.baseurl }}/textbook/" class="textbook-home-link">« Back to Textbook Home</a>
</div>
