---
layout: default
title: AARC River Navigation Guide
description: Progressive Learn-to-Scull map guide for local Huron River navigation, safety gates, hazards, and bridge decisions.
parent: Sculling Safety
grand_parent: For Learners
nav_exclude: true
---

<link rel="stylesheet" href="{{ '/assets/css/river-navigation-guide.css' | relative_url }}">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
<script src="{{ '/assets/js/river-navigation-guide.js' | relative_url }}" defer></script>

<div class="river-tour-page">
  <section class="river-tour-hero">
    <div>
      <p class="river-tour-eyebrow">AARC Learn-to-Scull</p>
      <h1><i class="fas fa-water"></i> AARC River Navigation Guide</h1>
      <p class="lead">Review the real river route by training progression: first-weekend limits, the Saturday bridge introduction, and the Sunday full-route rehearsal.</p>
    </div>
  </section>

  <section class="river-tour-app" data-river-navigation-guide data-course-url="{{ '/assets/data/river-navigation-guide.json' | relative_url }}">
    <div class="river-tour-app__header">
      <div>
        <p class="river-tour-eyebrow">Progressive river maps</p>
        <h2>Match the map to the session</h2>
        <p>Each map keeps the satellite view, actual route markers, and coach progression boundaries together so the local decisions stay grounded in the real river.</p>
      </div>
      <div class="river-tour-progress" aria-live="polite">
        <span data-progress-count>Loading map...</span>
        <strong data-progress-label>Navigation guide</strong>
      </div>
    </div>

    <nav class="river-tour-map-selectors" data-map-selectors aria-label="River navigation maps"></nav>

    <div class="river-tour-layout">
      <div class="river-tour-map-panel">
        <div class="river-tour-marker-tools" aria-label="Marker display controls">
          <button type="button" class="river-tour-filter river-tour-filter--toggle" data-action="toggle-all-markers">Show all markers</button>
          <div class="river-tour-filterbar" data-filter-bar aria-label="Additional marker filters"></div>
        </div>
        <div class="river-tour-map-wrap">
          <div class="river-tour-map-tools" aria-label="Map tools">
            <button type="button" class="river-tour-map-tool" data-action="fit-map">Fit map</button>
            <button type="button" class="river-tour-map-tool" data-action="center-current">Center selected place</button>
          </div>
          <div class="river-tour-map" data-map role="application" aria-label="Satellite map of the AARC river route"></div>
        </div>
      </div>

      <aside class="river-tour-sidebar">
        <section class="river-tour-card river-tour-card--current">
          <div class="river-tour-card__topline">
            <span class="river-tour-pill" data-current-category>Map marker</span>
            <span data-current-distance></span>
          </div>
          <h3 data-current-title>Select a place</h3>
          <p data-current-description>Select a mapped place to review the local rule, gate, or hazard.</p>

          <div class="river-tour-action">
            <span>On-water action</span>
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
            <button type="button" class="river-tour-button river-tour-button--secondary" data-action="coach-question">
              <i class="fas fa-bookmark"></i> Ask coach about this
            </button>
          </div>
        </section>

        <section class="river-tour-card">
          <div class="river-tour-card__topline">
            <span class="river-tour-pill">Key places</span>
            <span data-key-place-count></span>
          </div>
          <h3 data-map-title>Loading map</h3>
          <p data-map-summary></p>
          <ol class="river-tour-stop-list" data-key-place-list></ol>
        </section>
      </aside>
    </div>
  </section>

  <section class="river-tour-notes">
    <article>
      <h2>LTS Progression</h2>
      <p>First Weekend and Saturday Second Weekend maps show coach progression gates. The Sunday Full Route map hides those LTS gates but keeps permanent safety boundaries.</p>
    </article>
    <article>
      <h2>Map source</h2>
      <p>This guide is generated from the AARC Google My Maps river traffic map and stored as static site data. Satellite imagery keeps the route and markers grounded in the actual river.</p>
    </article>
  </section>

  <div class="text-center mt-5">
    <a href="{{ '/for-learners/safety/river-rules.html' | relative_url }}" class="btn btn-outline-secondary me-2"><i class="fas fa-arrow-left"></i> Back to River Rules</a>
    <a href="{{ '/for-learners/safety/index.html' | relative_url }}" class="btn btn-primary">Safety Overview <i class="fas fa-shield-alt"></i></a>
  </div>
</div>
