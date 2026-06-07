---
layout: default
title: AARC River Navigation Guide
description: Learn-to-Scull conveyor-belt course guide for local Huron River navigation, hazards, bridge decisions, and docking.
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
      <p class="lead">Review the three coached conveyor-belt courses by the places you need to recognize on the water: launch, turns, bridge decisions, hazards, current, and docking.</p>
    </div>
  </section>

  <section class="river-tour-app" data-river-navigation-guide data-course-url="{{ '/assets/data/river-navigation-guide.json' | relative_url }}">
    <div class="river-tour-app__header">
      <div>
        <p class="river-tour-eyebrow">Conveyor-belt courses</p>
        <h2>Choose your course</h2>
        <p>Step through the course you are preparing to row: small round below the bridges, round below the bridges, or the full round.</p>
      </div>
      <div class="river-tour-progress" aria-live="polite">
        <span data-progress-count>Loading map...</span>
        <strong data-progress-label>Course guide</strong>
      </div>
    </div>

    <nav class="river-tour-map-selectors" data-map-selectors aria-label="River navigation courses"></nav>

    <div class="river-tour-layout">
      <div class="river-tour-map-panel">
        <div class="river-tour-map-grid">
          <section class="river-tour-card river-tour-card--keyplaces">
            <div class="river-tour-card__topline">
              <span class="river-tour-pill">Key places</span>
              <span data-key-place-count></span>
            </div>
            <h3 data-map-title>Loading map</h3>
            <p data-map-summary></p>
            <ol class="river-tour-stop-list" data-key-place-list></ol>
          </section>

          <div class="river-tour-map-wrap">
            <div class="river-tour-map-tools" aria-label="Map tools">
              <button type="button" class="river-tour-map-tool" data-action="fit-map">Fit course</button>
              <button type="button" class="river-tour-map-tool" data-action="fit-bridge" hidden>Bridge pattern</button>
              <button type="button" class="river-tour-map-tool" data-action="center-current">Center selected place</button>
            </div>
            <div class="river-tour-map" data-map role="application" aria-label="Satellite map of the AARC river route"></div>
          </div>
        </div>
      </div>

      <aside class="river-tour-sidebar">
        <section class="river-tour-card river-tour-card--current">
          <div class="river-tour-card__topline">
            <span class="river-tour-pill" data-current-category>Location</span>
            <span data-current-distance></span>
          </div>
          <h3 data-current-title>Select a place</h3>
          <p data-current-description>Select a mapped place to review the local turn cue, rule, or hazard.</p>

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
      </aside>
    </div>
  </section>

  <section class="river-tour-notes">
    <article>
      <h2>Coach Route</h2>
      <p>Your coach sets the course for the session. Stay inside the assigned area and turn where directed.</p>
    </article>
    <article>
      <h2>On The Water</h2>
      <p>Keep scanning, stay on the correct side, and leave room near bridges, weeds, trees, current, and sharp bends.</p>
    </article>
  </section>

  <div class="text-center mt-5">
    <a href="{{ '/for-learners/safety/river-rules.html' | relative_url }}" class="btn btn-outline-secondary me-2"><i class="fas fa-arrow-left"></i> Back to River Rules</a>
    <a href="{{ '/for-learners/safety/index.html' | relative_url }}" class="btn btn-primary">Safety Overview <i class="fas fa-shield-alt"></i></a>
  </div>
</div>
