---
layout: default
title: River Rules Rally
description: Guided map tour for Learn-to-Scull river rules and local navigation markers.
parent: Sculling Safety
grand_parent: For Learners
nav_exclude: true
---

<link rel="stylesheet" href="{{ '/assets/css/river-rules-rally-v2.css' | relative_url }}">
<script src="{{ '/assets/js/river-rules-rally-v2.js' | relative_url }}" defer></script>

<div class="river-tour-page">
  <section class="river-tour-hero">
    <div>
      <p class="river-tour-eyebrow">Guided map tour</p>
      <h1><i class="fas fa-water"></i> River Rules Rally</h1>
      <p class="lead">Step through the actual AARC river map and rehearse the local decisions that matter: launching, docking, river turns, progression limits, bridge pillars, weeds, fallen trees, current, and corner drift.</p>
    </div>
  </section>

  <section class="river-tour-app" data-river-tour data-course-url="{{ '/assets/data/river-rules-rally-course.json' | relative_url }}">
    <div class="river-tour-app__header">
      <div>
        <p class="river-tour-eyebrow">AARC water rehearsal</p>
        <h2>Follow the route by Learn-to-Scull progression</h2>
        <p>The tour uses the real map markers as coaching stops. Visit each stop, mark anything that needs review, and answer short checks at the highest-value decision points.</p>
      </div>
      <div class="river-tour-progress" aria-live="polite">
        <span data-progress-count>Loading map...</span>
        <strong data-progress-label>Guided tour</strong>
      </div>
    </div>

    <nav class="river-tour-tabs" data-section-tabs aria-label="River tour sections"></nav>

    <div class="river-tour-layout">
      <div class="river-tour-map-panel">
        <div class="river-tour-filterbar" data-filter-bar aria-label="Marker filters"></div>
        <div class="river-tour-map-wrap">
          <svg class="river-tour-map" data-map role="img" aria-label="Simplified AARC river route map"></svg>
        </div>
      </div>

      <aside class="river-tour-sidebar">
        <section class="river-tour-card river-tour-card--current">
          <div class="river-tour-card__topline">
            <span class="river-tour-pill" data-current-category>Map marker</span>
            <span data-current-distance></span>
          </div>
          <h3 data-current-title>Select a stop</h3>
          <p data-current-description>The map tour will load the current stop here.</p>

          <div class="river-tour-action">
            <span>What to do here</span>
            <p data-current-action></p>
          </div>

          <div class="river-tour-check" data-check hidden></div>

          <div class="river-tour-controls">
            <button type="button" class="river-tour-button river-tour-button--secondary" data-action="prev">
              <i class="fas fa-arrow-left"></i> Previous
            </button>
            <button type="button" class="river-tour-button river-tour-button--primary" data-action="next">
              Next <i class="fas fa-arrow-right"></i>
            </button>
            <button type="button" class="river-tour-button river-tour-button--secondary" data-action="review">
              <i class="fas fa-bookmark"></i> Needs review
            </button>
          </div>
        </section>

        <section class="river-tour-card">
          <div class="river-tour-card__topline">
            <span class="river-tour-pill">Section stops</span>
            <span data-section-count></span>
          </div>
          <h3 data-section-title>Loading section</h3>
          <p data-section-summary></p>
          <ol class="river-tour-stop-list" data-stop-list></ol>
        </section>
      </aside>
    </div>
  </section>

  <section class="river-tour-notes">
    <article>
      <h2>How to use it</h2>
      <p>Use the section tabs in order during Learn-to-Scull. The goal is not to win a game; it is to recognize the local marker, say the safe action out loud, and know where the coach expects you to turn or hold your line.</p>
    </article>
    <article>
      <h2>Map source</h2>
      <p>This tour is generated from the AARC Google My Maps river traffic map and stored as static site data so it works reliably without fetching Google Maps while you practice.</p>
    </article>
  </section>

  <div class="text-center mt-5">
    <a href="{{ '/for-learners/safety/river-rules.html' | relative_url }}" class="btn btn-outline-secondary me-2"><i class="fas fa-arrow-left"></i> Back to River Rules</a>
    <a href="{{ '/for-learners/safety/index.html' | relative_url }}" class="btn btn-primary">Safety Overview <i class="fas fa-shield-alt"></i></a>
  </div>
</div>
