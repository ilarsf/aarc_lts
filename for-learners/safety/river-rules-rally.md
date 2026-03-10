---
layout: default
title: River Rules Rally
description: Route-based river decision trainer for Learn-to-Scull participants.
parent: Sculling Safety
grand_parent: For Learners
nav_exclude: true
---

<link rel="stylesheet" href="{{ '/assets/css/river-rules-rally-v2.css' | relative_url }}">
<script src="{{ '/assets/js/river-rules-rally-v2.js' | relative_url }}" defer></script>

<div class="river-trainer-page">
  <section class="river-trainer-hero">
    <div class="river-trainer-hero__copy">
      <p class="river-trainer-eyebrow">Route-based decision trainer</p>
      <h1><i class="fas fa-water"></i> River Rules Rally</h1>
      <p class="lead">This is no longer an endless arcade run. It is a location-based sculling trainer built around the AARC water: dock launches, short river turns, the Argo-side mixed-user stretch, and the advanced bridge sequence north toward Barton.</p>
    </div>

    <div class="river-trainer-hero__grid">
      <article class="river-trainer-hero__card">
        <h2>Argo Turn Drill</h2>
        <p>Depart downstream from the dock, manage swimmers and public traffic, stop above Argo, cross the river, turn, and come back upstream under control.</p>
      </article>
      <article class="river-trainer-hero__card">
        <h2>M-14 Turn Drill</h2>
        <p>The short upstream drill. Stop below M-14, do not drift under the bridge, cross cleanly, and set up the return leg back to the dock.</p>
      </article>
      <article class="river-trainer-hero__card">
        <h2>Barton Bridge Run</h2>
        <p>The advanced course: M-14, low park bridge, railroad bridge, and the high foot bridge before Barton, then a composed turn and the full bridge sequence back home.</p>
      </article>
    </div>
  </section>

  <section class="river-trainer-app" data-river-trainer data-course-url="{{ '/assets/data/river-rules-rally-course.json' | relative_url }}">
    <div class="river-trainer-app__header">
      <div>
        <p class="river-trainer-eyebrow">AARC water rehearsal</p>
        <h2>Choose a drill, then row it like a real sculler</h2>
        <p>The scoring rewards awareness, calm line choices, correct openings, and a proper stop-cross-clear turn. Speed only matters if it stays under control.</p>
      </div>

      <div class="river-trainer-stats" aria-label="Run statistics">
        <div class="river-trainer-stat">
          <span>Score</span>
          <strong data-stat="score">0000</strong>
        </div>
        <div class="river-trainer-stat">
          <span>Safety</span>
          <strong data-stat="safety">100/100</strong>
        </div>
        <div class="river-trainer-stat">
          <span>Awareness</span>
          <strong data-stat="awareness">100/100</strong>
        </div>
        <div class="river-trainer-stat">
          <span>Progress</span>
          <strong data-stat="progress">0%</strong>
        </div>
        <div class="river-trainer-stat">
          <span>Last look</span>
          <strong data-stat="look">—</strong>
        </div>
      </div>
    </div>

    <div class="river-trainer-progress" aria-hidden="true">
      <div class="river-trainer-progress__fill" data-progress-fill></div>
    </div>

    <div class="river-trainer-shell">
      <div class="river-trainer-screen-wrap">
        <canvas class="river-trainer-canvas" data-canvas width="1100" height="640" aria-label="River Rules Rally training map"></canvas>

        <div class="river-trainer-overlay" data-overlay>
          <div class="river-trainer-overlay__card" data-overlay-card>
            <p class="river-trainer-eyebrow">Built from the AARC training water</p>
            <h3 data-overlay-title>Choose a drill</h3>
            <p data-overlay-copy>Select the route that matches the skill you want to rehearse.</p>

            <div class="river-trainer-overlay__grid">
              <section>
                <h4>Choose a drill</h4>
                <div class="river-trainer-choice-grid" data-pack-options></div>
              </section>
              <section>
                <h4>Choose a mode</h4>
                <div class="river-trainer-choice-grid" data-mode-options></div>
              </section>
            </div>

            <p data-overlay-note>Coach Demo will show the line. Guided Practice keeps the teaching aids visible. Assessment hides most prompts and grades the full run.</p>

            <div class="river-trainer-overlay__actions">
              <button type="button" class="river-trainer-button river-trainer-button--primary" data-action="start">Launch drill</button>
              <button type="button" class="river-trainer-button river-trainer-button--secondary" data-action="resume" hidden>Resume run</button>
              <button type="button" class="river-trainer-button river-trainer-button--secondary" data-action="menu" hidden>Back to drill menu</button>
            </div>
          </div>
        </div>
      </div>

      <aside class="river-trainer-sidebar">
        <section class="river-trainer-panel">
          <span class="river-trainer-panel__label" data-message-tone>Coach radio</span>
          <p class="river-trainer-message river-trainer-message--calm" data-game-message role="status" aria-live="polite">Choose a drill and launch the run.</p>
        </section>

        <section class="river-trainer-panel">
          <span class="river-trainer-panel__label">Next landmark</span>
          <h3 data-next-landmark>Stay right and keep scanning</h3>
          <p data-next-brief>The trainer will call out the next decision point as it comes into range.</p>
        </section>

        <section class="river-trainer-panel">
          <span class="river-trainer-panel__label">Current run</span>
          <div class="river-trainer-meta">
            <strong data-pack-name>Choose a drill</strong>
            <span data-leg-name></span>
          </div>
          <canvas class="river-trainer-minimap" data-minimap width="320" height="220" aria-label="Mini map of the selected route"></canvas>
        </section>

        <section class="river-trainer-panel">
          <span class="river-trainer-panel__label">Pack briefing</span>
          <ul class="river-trainer-briefing-list" data-briefing-list>
            <li>Launch a drill to load its coaching brief.</li>
          </ul>
        </section>

        <section class="river-trainer-panel">
          <span class="river-trainer-panel__label">Controls</span>
          <div class="river-trainer-controls">
            <div class="river-trainer-controls__row">
              <span class="river-trainer-controls__key">Space</span>
              <span>Look ahead. Use it often.</span>
            </div>
            <div class="river-trainer-controls__row">
              <span class="river-trainer-controls__key">A / D</span>
              <span>Set your line left or right.</span>
            </div>
            <div class="river-trainer-controls__row">
              <span class="river-trainer-controls__key">W</span>
              <span>Build pressure and maintain pace.</span>
            </div>
            <div class="river-trainer-controls__row">
              <span class="river-trainer-controls__key">S</span>
              <span>Ease off and hold water for turn boxes or crowded zones.</span>
            </div>
            <div class="river-trainer-controls__row">
              <span class="river-trainer-controls__key">P</span>
              <span>Pause and review the line.</span>
            </div>
          </div>

          <div class="river-trainer-actions" style="margin-top: 1rem;">
            <button type="button" class="river-trainer-button river-trainer-button--secondary" data-action="pause">Pause</button>
            <button type="button" class="river-trainer-button river-trainer-button--secondary" data-action="restart">Restart</button>
          </div>
        </section>
      </aside>
    </div>

    <div class="river-trainer-touchpad" aria-label="Touch controls">
      <button type="button" class="river-trainer-touchpad__button river-trainer-touchpad__button--look" data-control="look">Look</button>
      <button type="button" class="river-trainer-touchpad__button river-trainer-touchpad__button--up" data-control="up">Pressure</button>
      <button type="button" class="river-trainer-touchpad__button river-trainer-touchpad__button--left" data-control="left">Left</button>
      <button type="button" class="river-trainer-touchpad__button river-trainer-touchpad__button--down" data-control="down">Hold water</button>
      <button type="button" class="river-trainer-touchpad__button river-trainer-touchpad__button--right" data-control="right">Right</button>
    </div>

    <section class="river-trainer-debrief" data-debrief hidden>
      <div class="river-trainer-debrief__header">
        <p class="river-trainer-eyebrow">Debrief</p>
        <div data-debrief-summary></div>
      </div>
      <div class="river-trainer-debrief__scores" data-debrief-scores></div>
      <div class="river-trainer-debrief__list" data-debrief-list></div>
    </section>
  </section>

  <section class="river-trainer-explainer">
    <div class="river-trainer-explainer__intro">
      <p class="river-trainer-eyebrow">How to use it</p>
      <h2>What makes this version useful</h2>
      <p>The goal is not arcade reflexes. The goal is to build the habits that keep traffic predictable on the real river: look over your shoulder often, stay right by default, commit to a bridge opening early, and make river turns as stop-cross-clear maneuvers rather than speed moves.</p>
    </div>

    <div class="river-trainer-explainer__grid">
      <article class="river-trainer-explainer__card">
        <h3>Coach Demo</h3>
        <p>Watch the correct line first. This is the quickest way to see where the boat should be at bridges, turn boxes, and mixed-user zones.</p>
      </article>
      <article class="river-trainer-explainer__card">
        <h3>Guided Practice</h3>
        <p>Use the visible target line and coach prompts until the decisions feel calm and repeatable instead of rushed.</p>
      </article>
      <article class="river-trainer-explainer__card">
        <h3>Assessment Mode</h3>
        <p>Remove most prompts and see whether the line choice still holds up when the trainer stops helping.</p>
      </article>
      <article class="river-trainer-explainer__card">
        <h3>Repeat the hard sections</h3>
        <p>The short Argo and M-14 drills are for repetition. The Barton run is the technical sequence once the turn pattern is already automatic.</p>
      </article>
    </div>
  </section>

  <div class="text-center mt-5">
    <a href="{{ '/for-learners/safety/river-rules.html' | relative_url }}" class="btn btn-outline-secondary me-2"><i class="fas fa-arrow-left"></i> Back to River Rules</a>
    <a href="{{ '/for-learners/safety/index.html' | relative_url }}" class="btn btn-primary">Safety Overview <i class="fas fa-shield-alt"></i></a>
  </div>
</div>
