---
layout: default
title: River Rules Rally
description: Arcade-style river rules practice for Learn-to-Scull participants.
parent: Sculling Safety
grand_parent: For Learners
nav_exclude: true
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/river-rules-rally.css">
<script src="{{ site.baseurl }}/assets/js/river-rules-rally.js" defer></script>

<div class="river-rally-page">
  <section class="river-rally-hero">
    <div class="river-rally-hero__copy">
      <p class="river-rally-eyebrow">Arcade Safety Drill</p>
      <h1><i class="fas fa-water"></i> River Rules Rally</h1>
      <p class="lead">Pilot a shell through traffic, turn zones, weeds, and unpredictable river users. The only way to post a high score is to row like a safe AARC sculler.</p>
    </div>

    <div class="river-rally-hero__rules">
      <article class="river-rally-hero__rule">
        <h2>Stay Right</h2>
        <p>Hold the right side of the river unless you are actively passing or setting up a turn.</p>
      </article>
      <article class="river-rally-hero__rule">
        <h2>Pass Left</h2>
        <p>Slow traffic belongs ahead of you until there is room to move left, pass cleanly, and return right.</p>
      </article>
      <article class="river-rally-hero__rule">
        <h2>Turn Smart</h2>
        <p>Brake into the turn zone, swing left across the river, and clear the area before resuming speed.</p>
      </article>
    </div>
  </section>

  <section class="river-rally-game" data-river-rules-rally>
    <div class="river-rally-game__header">
      <div class="river-rally-game__title">
        <p class="river-rally-eyebrow">Boathouse Cabinet</p>
        <h2>River Rules Rally Cabinet</h2>
      </div>

      <div class="river-rally-game__stats">
        <div class="river-rally-stat">
          <span class="river-rally-stat__label">Score</span>
          <strong class="river-rally-stat__value" data-stat="score">00000</strong>
        </div>
        <div class="river-rally-stat">
          <span class="river-rally-stat__label">Distance</span>
          <strong class="river-rally-stat__value" data-stat="distance">0m / 1200m</strong>
        </div>
        <div class="river-rally-stat">
          <span class="river-rally-stat__label">Lives</span>
          <strong class="river-rally-stat__value" data-stat="lives">3</strong>
        </div>
        <div class="river-rally-stat">
          <span class="river-rally-stat__label">Streak</span>
          <strong class="river-rally-stat__value" data-stat="combo">0x</strong>
        </div>
      </div>
    </div>

    <div class="river-rally-game__progress">
      <div class="river-rally-game__progress-fill" data-progress></div>
    </div>

    <div class="river-rally-game__layout">
      <div class="river-rally-game__cabinet">
        <div class="river-rally-game__screen">
          <canvas class="river-rally-game__canvas" width="960" height="540" aria-label="River Rules Rally game board"></canvas>

          <div class="river-rally-game__overlay" data-overlay>
            <div class="river-rally-game__overlay-card">
              <p class="river-rally-eyebrow" data-overlay-kicker>Safety Arcade</p>
              <h3 data-overlay-title>Launch River Rules Rally</h3>
              <p data-overlay-copy>Use the arrow keys to steer, boost, and brake. Reach the end of the course without burning through all three lives.</p>
              <p class="river-rally-game__overlay-note" data-overlay-note>Arrow Left and Arrow Right steer. Arrow Up boosts. Arrow Down brakes for turn zones.</p>
              <button type="button" class="river-rally-button river-rally-button--primary" data-action="overlay-start">Launch run</button>
            </div>
          </div>
        </div>
      </div>

      <aside class="river-rally-game__sidebar">
        <section class="river-rally-panel river-rally-panel--radio">
          <p class="river-rally-panel__label">Coach Radio</p>
          <p class="river-rally-panel__message" data-game-message role="status" aria-live="polite">Hold the right side unless you are passing or making a river turn.</p>
        </section>

        <section class="river-rally-panel">
          <p class="river-rally-panel__label">Live Missions</p>
          <div class="river-rally-missions">
            <article class="river-rally-mission" data-mission="lane">
              <h3>Stay Right</h3>
              <p>Default travel lane unless the river rules give you a reason to move left.</p>
            </article>
            <article class="river-rally-mission" data-mission="pass">
              <h3>Pass Left</h3>
              <p>Overtake slower shells and kayaks on the left, then settle back to the right side.</p>
            </article>
            <article class="river-rally-mission" data-mission="turn">
              <h3>River Turn</h3>
              <p>Brake, swing left, cross the river, and clear the turn area before sprinting away.</p>
            </article>
          </div>
        </section>

        <section class="river-rally-panel">
          <p class="river-rally-panel__label">Controls</p>
          <div class="river-rally-controls">
            <div class="river-rally-controls__row">
              <span class="river-rally-controls__key">Left</span>
              <span class="river-rally-controls__text">Slide left to pass and set up turns</span>
            </div>
            <div class="river-rally-controls__row">
              <span class="river-rally-controls__key">Right</span>
              <span class="river-rally-controls__text">Return to the safe travel side</span>
            </div>
            <div class="river-rally-controls__row">
              <span class="river-rally-controls__key">Up</span>
              <span class="river-rally-controls__text">Burst forward when the lane is clear</span>
            </div>
            <div class="river-rally-controls__row">
              <span class="river-rally-controls__key">Down</span>
              <span class="river-rally-controls__text">Brake for stop boxes and tight traffic</span>
            </div>
          </div>

          <div class="river-rally-actions">
            <button type="button" class="river-rally-button river-rally-button--secondary" data-action="pause">Pause</button>
            <button type="button" class="river-rally-button river-rally-button--secondary" data-action="restart">Reset course</button>
          </div>
        </section>
      </aside>
    </div>

    <div class="river-rally-touchpad" aria-label="Touch controls">
      <button type="button" class="river-rally-touchpad__button river-rally-touchpad__button--up" data-control="up">Up</button>
      <button type="button" class="river-rally-touchpad__button river-rally-touchpad__button--left" data-control="left">Left</button>
      <button type="button" class="river-rally-touchpad__button river-rally-touchpad__button--right" data-control="right">Right</button>
      <button type="button" class="river-rally-touchpad__button river-rally-touchpad__button--down" data-control="down">Down</button>
    </div>

    <div class="river-rally-legend">
      <div class="river-rally-legend__item">
        <span class="river-rally-legend__swatch river-rally-legend__swatch--slow"></span>
        <span>Slow shells ahead: move left to pass.</span>
      </div>
      <div class="river-rally-legend__item">
        <span class="river-rally-legend__swatch river-rally-legend__swatch--oncoming"></span>
        <span>Oncoming traffic: hold right and give them the left side.</span>
      </div>
      <div class="river-rally-legend__item">
        <span class="river-rally-legend__swatch river-rally-legend__swatch--hazard"></span>
        <span>Swimmers, weeds, and paddlers do not care about your score.</span>
      </div>
      <div class="river-rally-legend__item">
        <span class="river-rally-legend__swatch river-rally-legend__swatch--turn"></span>
        <span>Turn rings show the stop, cross, and clear sequence.</span>
      </div>
    </div>

    <noscript>
      <div class="alert alert-warning mt-4" role="alert">
        This game needs JavaScript enabled. The river rules still apply even if the arcade cabinet is powered down.
      </div>
    </noscript>
  </section>

  <section class="river-rally-briefing">
    <div class="river-rally-briefing__intro">
      <p class="river-rally-eyebrow">What This Teaches</p>
      <h2>Same rules, faster feedback</h2>
      <p>The game compresses the real river lessons into a short arcade run. If your score drops, it is because one of the real rules would have gone bad on the water too.</p>
    </div>

    <div class="river-rally-briefing__grid">
      <article class="river-rally-briefing__card">
        <h3>Default lane discipline</h3>
        <p>Most of the time your safest move is simple: stay right, scan ahead, and leave the left side open for clean passing.</p>
      </article>
      <article class="river-rally-briefing__card">
        <h3>Passing takes judgment</h3>
        <p>Do not drift left just because the lane feels open. Move left because you have slower traffic ahead, then clear the pass and return right.</p>
      </article>
      <article class="river-rally-briefing__card">
        <h3>Turn areas get busy fast</h3>
        <p>River turns are controlled movements, not speed tests. Stop first, swing left, cross the river, and clear the zone for the next boat.</p>
      </article>
      <article class="river-rally-briefing__card">
        <h3>Hazards are not theoretical</h3>
        <p>Swimmers, paddle craft, and shoreline weeds appear exactly where they are least convenient. Courtesy and caution beat reflexes.</p>
      </article>
    </div>
  </section>

  <div class="text-center mt-5">
    <a href="{{ site.baseurl }}/for-learners/safety/river-rules.html" class="btn btn-outline-secondary me-2"><i class="fas fa-arrow-left"></i> Back to River Rules</a>
    <a href="{{ site.baseurl }}/for-learners/safety/index.html" class="btn btn-primary">Safety Overview <i class="fas fa-shield-alt"></i></a>
  </div>
</div>
