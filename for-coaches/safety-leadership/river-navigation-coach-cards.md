---
layout: coach
title: River Navigation Coach Cards
parent: Safety Leadership
search_exclude: true
nav_order: 5
---

<link rel="stylesheet" href="{{ '/assets/css/river-navigation-guide.css' | relative_url }}">
<script src="{{ '/assets/js/river-navigation-guide.js' | relative_url }}" defer></script>

<div class="river-briefing-page river-coach-card-page" data-river-navigation-guide data-coach-route-tools>
  <section class="river-briefing-hero" aria-labelledby="river-coach-card-title">
    <p class="river-briefing-eyebrow">Coach route briefing</p>
    <h1 id="river-coach-card-title"><i class="fas fa-clipboard-list"></i> River Navigation Coach Cards</h1>
    <p class="lead">Use this restricted coach page to choose the session route, generate a concise learner prompt, and print the selected quick card before launch.</p>
    <p><a href="{{ '/for-learners/safety/river-navigation-guide.html' | relative_url }}" class="btn btn-outline-secondary"><i class="fas fa-route"></i> Open learner river guide</a></p>
  </section>

  <section class="printable-card" aria-labelledby="coach-quick-card-heading">
    <div class="river-section-heading">
      <p class="river-briefing-eyebrow">Coach / quick card</p>
      <h2 id="coach-quick-card-heading">Briefing and selected-course quick card</h2>
      <p>Confirm today's route, turn cues, limits, and reminders before launch. The print button prints only the selected route quick card.</p>
      <button type="button" class="print-guide-button" data-print-guide><i class="fas fa-print"></i> Print selected quick card</button>
    </div>

    <form class="coach-briefing-tool" aria-labelledby="coach-tool-heading">
      <h3 id="coach-tool-heading">Generate learner prompt</h3>
      <div class="coach-tool-grid">
        <label>
          Session route
          <select data-coach-route-map>
            <option value="small-round">Small round</option>
            <option value="below-m14-round">Round below M-14</option>
            <option value="bridge-round">Bridge round</option>
            <option value="full-round">Full round</option>
          </select>
        </label>
        <label>
          Turn at
          <input type="text" data-coach-turn value="the coach-assigned turn cue">
        </label>
        <label>
          Do not go beyond
          <input type="text" data-coach-limit value="the coach-assigned limit">
        </label>
      </div>
      <div class="coach-reminders">
        <label><input type="checkbox" data-coach-reminder value="stop before every turn" checked> Stop before every turn</label>
        <label><input type="checkbox" data-coach-reminder value="scan before crossing" checked> Scan before crossing</label>
        <label><input type="checkbox" data-coach-reminder value="hold the correct side" checked> Hold the correct side</label>
        <label><input type="checkbox" data-coach-reminder value="wait for coach instruction if uncertain" checked> Wait if uncertain</label>
      </div>
      <output class="coach-generated-prompt" data-coach-prompt aria-live="polite">Today we will row the small round. Turn at the coach-assigned turn cue. Do not go beyond the coach-assigned limit. Remember to stop before every turn, scan before crossing, hold the correct side, and wait for coach instruction if uncertain.</output>
    </form>

    <div class="coach-script-list">
      <article class="coach-script">
        <h3>Before launch</h3>
        <ul>
          <li>Name the assigned course: small round, round below M-14, bridge round, or full round.</li>
          <li>Confirm the exact turn cues and any route limit that applies today.</li>
          <li>Keep the learner-facing rule simple: stay right, pass left, stop before turning, and follow the coach-assigned course.</li>
          <li>If uncertain, stop, scan, and look for coach instruction.</li>
        </ul>
      </article>
      <article class="coach-script">
        <h3>Permanent no-row boundary</h3>
        <p>This is a hard downstream limit. Do not row beyond it. Coaches may point it out as a safety boundary, but it is not the default small-round turn cue unless assigned.</p>
      </article>
      <article class="coach-script">
        <h3>At any turn line</h3>
        <ol>
          <li>Stop first.</li>
          <li>Turn left.</li>
          <li>Check traffic.</li>
          <li>Cross only when clear.</li>
          <li>Turn left again.</li>
          <li>Clear the turning area before resuming.</li>
        </ol>
      </article>
      <article class="coach-script">
        <h3>Common learner errors</h3>
        <ul>
          <li>Drifting toward shore or into the middle.</li>
          <li>Starting the turn without stopping.</li>
          <li>Watching a landmark but not scanning traffic.</li>
          <li>Confusing the bridge or full-round reference with today's assigned route.</li>
        </ul>
      </article>
    </div>

    <div class="quick-card-grid" aria-live="polite">
      <section class="quick-card-section" data-quick-card="small-round">
        <h3>Small round quick card</h3>
        <h4>Before launch</h4>
        <ul class="quick-checklist">
          <li><span aria-hidden="true"></span>Downstream turn cue?</li>
          <li><span aria-hidden="true"></span>Upstream turn cue?</li>
          <li><span aria-hidden="true"></span>Dock approach?</li>
          <li><span aria-hidden="true"></span>What should I do if traffic blocks the turn?</li>
        </ul>
        <h4>On the water</h4>
        <ol>
          <li>Leave dock under control.</li>
          <li>Row to downstream turn line.</li>
          <li>Stop, turn left, check, cross, turn left.</li>
          <li>Row to upstream turn line.</li>
          <li>Stop, turn left, check, cross, turn left.</li>
          <li>Return to dock slowly.</li>
        </ol>
      </section>

      <section class="quick-card-section" data-quick-card="below-m14-round" hidden>
        <h3>Round below M-14 quick card</h3>
        <h4>Before launch</h4>
        <ul class="quick-checklist">
          <li><span aria-hidden="true"></span>What downstream turn line are we using?</li>
          <li><span aria-hidden="true"></span>What is the upstream turn cue below M-14?</li>
          <li><span aria-hidden="true"></span>How close to M-14 should we get before turning?</li>
          <li><span aria-hidden="true"></span>What should I do if another shell is already turning below M-14?</li>
          <li><span aria-hidden="true"></span>Are we explicitly avoiding the bridge sequence today?</li>
        </ul>
        <h4>On the water</h4>
        <ol>
          <li>Leave dock under control.</li>
          <li>Row to the downstream turn line.</li>
          <li>Stop, turn left, check, cross, turn left.</li>
          <li>Row upstream past the small-round turn cue.</li>
          <li>Turn below M-14.</li>
          <li>Return toward the dock.</li>
          <li>Dock slowly under coach direction.</li>
        </ol>
      </section>

      <section class="quick-card-section" data-quick-card="bridge-round" hidden>
        <h3>Bridge round quick card</h3>
        <h4>Before launch</h4>
        <ul class="quick-checklist">
          <li><span aria-hidden="true"></span>What side of the M-14 pillar are we using upstream?</li>
          <li><span aria-hidden="true"></span>What is the Railroad bridge upstream opening?</li>
          <li><span aria-hidden="true"></span>What side of the Barton Nature Area Trail bridge pillar are we using?</li>
          <li><span aria-hidden="true"></span>What is the Railroad bridge downstream opening?</li>
          <li><span aria-hidden="true"></span>What side of the M-14 pillar are we using downstream?</li>
          <li><span aria-hidden="true"></span>Where do we stop if uncertain?</li>
        </ul>
        <h4>Bridges upstream</h4>
        <ol>
          <li>U1 M-14 bridge.</li>
          <li>U2 Barton Shore Drive bridge.</li>
          <li>U3 Railroad bridge, upstream opening.</li>
          <li>U4 Barton Nature Area Trail bridge.</li>
        </ol>
        <h4>Bridges downstream</h4>
        <ol>
          <li>D1 Barton Nature Area Trail bridge.</li>
          <li>D2 Railroad bridge, downstream opening.</li>
          <li>D3 Barton Shore Drive bridge.</li>
          <li>D4 M-14 bridge.</li>
        </ol>
      </section>

      <section class="quick-card-section" data-quick-card="full-round" hidden>
        <h3>Full round quick card</h3>
        <h4>Before launch</h4>
        <ul class="quick-checklist">
          <li><span aria-hidden="true"></span>Full-route turn point?</li>
          <li><span aria-hidden="true"></span>Barton Nature Area Trail bridge / Barton limit?</li>
          <li><span aria-hidden="true"></span>Named bridge sequence?</li>
          <li><span aria-hidden="true"></span>Return-side cues?</li>
          <li><span aria-hidden="true"></span>Dock approach?</li>
        </ul>
        <p>Use only when assigned by coach.</p>
      </section>
    </div>
  </section>
</div>
