---
layout: default
title: "Part 4: Appendices - AARC Learn to Scull Textbook"
---

<div class="textbook-header">
  <a href="{{ site.baseurl }}/textbook/" class="textbook-home-link">« Textbook Home</a>
  <div class="textbook-navigation-compact">
    <a href="{{ site.baseurl }}/textbook/chapters/part3.html" class="prev-chapter">« Part 3: Safety</a>
    <span class="current-part">Part 4: Appendices</span>
    <span class="next-chapter"></span>
  </div>
</div>

<script>
  // Ensure accordions are initialized after content is loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Accordion initialization check - Part 4 page');
    // Add a slight delay to make sure content is fully loaded
    setTimeout(function() {
      // Re-initialize accordions if needed
      if (typeof initAccordions === 'function') {
        initAccordions();
      }
    }, 300);
  });
</script>
{% include textbook/Part4-Appendices.md %}

<div class="textbook-footer">
  <div class="textbook-navigation-compact">
    <a href="{{ site.baseurl }}/textbook/chapters/part3.html" class="prev-chapter">« Part 3: Safety</a>
    <a href="{{ site.baseurl }}/textbook/" class="textbook-home-link">« Textbook Home</a>
    <span class="next-chapter"></span>
  </div>
</div>