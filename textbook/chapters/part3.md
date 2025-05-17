---
layout: default
title: "Part 3: Safety - AARC Learn to Scull Textbook"
---

<div class="textbook-header">
  <a href="{{ site.baseurl }}/textbook/" class="textbook-home-link">« Textbook Home</a>
  <div class="textbook-navigation-compact">
    <a href="{{ site.baseurl }}/textbook/chapters/part2.html" class="prev-chapter">« Part 2: For the Learner</a>
    <span class="current-part">Part 3: Safety</span>
    <a href="{{ site.baseurl }}/textbook/chapters/part4.html" class="next-chapter">Part 4: Appendices »</a>
  </div>
</div>

{% include accordion.html %}
<script>
  // Ensure accordions are initialized after content is loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Accordion initialization check - Part 3 page');
    // Add a slight delay to make sure content is fully loaded
    setTimeout(function() {
      // Re-initialize accordions if needed
      if (typeof initAccordions === 'function') {
        initAccordions();
      }
    }, 300);
  });
</script>
{% include textbook/Part3-Safety-with-accordions.md %}

<div class="textbook-footer">
  <div class="textbook-navigation-compact">
    <a href="{{ site.baseurl }}/textbook/chapters/part2.html" class="prev-chapter">« Part 2: For the Learner</a>
    <a href="{{ site.baseurl }}/textbook/" class="textbook-home-link">« Textbook Home</a>
    <a href="{{ site.baseurl }}/textbook/chapters/part4.html" class="next-chapter">Part 4: Appendices »</a>
  </div>
</div>