---
layout: default
title: AARC River Navigation Guide
description: Learner route briefing for local Huron River navigation, bridge decisions, caution areas, and coach launch prompts.
parent: Sculling Safety
grand_parent: For Learners
nav_order: 4
---

<link rel="stylesheet" href="{{ '/assets/css/river-navigation-guide.css' | relative_url }}">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
<script src="{{ '/assets/js/river-navigation-guide.js' | relative_url }}" defer></script>

<div class="river-briefing-page" data-river-navigation-guide data-course-url="{{ '/assets/data/river-navigation-guide.json' | relative_url }}">
  <section class="river-briefing-hero" aria-labelledby="river-briefing-title">
    <p class="river-briefing-eyebrow">Safety preparation</p>
    <h1 id="river-briefing-title"><i class="fas fa-water"></i> AARC River Navigation Guide</h1>
    <p class="lead">Use this before practice to understand the coached route. Your coach may shorten, extend, or change the route based on river conditions and session goals.</p>

    <ul class="river-rule-strip" aria-label="Before you row">
      <li><i class="fas fa-arrow-right"></i> Stay right</li>
      <li><i class="fas fa-arrow-left"></i> Pass left</li>
      <li><i class="fas fa-hand"></i> Stop before turning</li>
      <li><i class="fas fa-bullhorn"></i> Coach sets the course</li>
    </ul>
  </section>

  <section class="whole-route-brief" aria-labelledby="whole-route-heading">
    <div>
      <p class="river-briefing-eyebrow">Whole course first</p>
      <h2 id="whole-route-heading">Choose the course your coach assigned</h2>
      <p>Use the route below only for the course named by your coach. Each course has its own order of turns, caution points, and map markers.</p>
    </div>
    <ol class="whole-route-steps">
      <li><span>Small round</span></li>
      <li><span>Bridge round</span></li>
      <li><span>Full round</span></li>
      <li><span>Coach card</span></li>
    </ol>
  </section>

  <nav class="river-mode-selector" aria-label="River course selector">
    <a href="#small-round-route" class="river-mode-button is-active" data-mode-button="small-round" aria-current="true">
      <i class="fas fa-route"></i>
      <span>Small round</span>
      <small>First learner round</small>
    </a>
    <a href="#bridge-round-route" class="river-mode-button" data-mode-button="bridge-round">
      <i class="fas fa-archway"></i>
      <span>Bridge round</span>
      <small>Bridges upstream and downstream</small>
    </a>
    <a href="#full-round-route" class="river-mode-button" data-mode-button="full-round">
      <i class="fas fa-location-dot"></i>
      <span>Full round</span>
      <small>Full 6.5 km route</small>
    </a>
    <a href="#coach-quick-card" class="river-mode-button" data-mode-button="coach">
      <i class="fas fa-clipboard-list"></i>
      <span>Coach / quick card</span>
      <small>Briefing and print</small>
    </a>
  </nav>

  <div class="river-briefing-layout">
    <div class="river-briefing-content">
      <section id="small-round-route" class="river-mode-panel" data-mode-panel="small-round" aria-labelledby="small-round-route-heading">
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Learner route briefing</p>
          <h2 id="small-round-route-heading">Route 1: Small round</h2>
          <p>Use this route when your coach assigns the small round. Read the cards in order. A learner should be able to name the downstream turn cue, upstream turn cue, and dock approach before launch.</p>
        </div>

        <div class="route-schematic" role="img" aria-label="Small round route order: dock, downstream leg, downstream turn, upstream leg, upstream turn, dock">
          <span>Dock</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Downstream leg</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Downstream turn</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Upstream leg</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Upstream turn</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Dock</span>
        </div>

        <div class="route-card-list">
          <article class="route-card is-active" data-route-card data-mode="small-round" data-route-step-id="sr-01-launch" data-guide-map="small-round-first-sunday" data-place-ids="launch downstream">
            <div class="route-card-header">
              <span class="route-card-kicker">1 of 6</span>
              <h3>Launch from AARC dock</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the AARC dock.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Push away under control, scan, and settle onto the correct traffic side before adding pressure.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Dock traffic, coach launches, returning shells, paddlers, and swimmers.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Stay right for your direction of travel.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Looking at the dock or landmark but not scanning ahead and behind.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Which side should I settle onto after launch?"> Which side should I settle onto after launch?</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-02-downstream-leg" data-guide-map="small-round-first-sunday" data-place-ids="downstream fallen-tree-3 river-turn-5">
            <div class="route-card-header">
              <span class="route-card-kicker">2 of 6</span>
              <h3>Downstream leg: dock to first turn line</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>From the dock toward the small-round downstream turn cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold your line, make small early corrections, and keep enough room from the bank.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Fallen-tree or shoreline caution, shallows, boats launching or returning, and mixed river users.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Small corrections early. Do not drift across the traffic pattern.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Waiting too long to steer, then overcorrecting.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="What shoreline cue marks the downstream leg today?"> What shoreline cue marks the downstream leg today?</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-03-downstream-turn" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-5 river-turn-6" data-line-ids="lts-first-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">3 of 6</span>
              <h3>Downstream turn line</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the small-round downstream crossing line named by your coach.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Stop first. Turn left. Check traffic. Cross only when clear. Turn left again.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Other shells using the same turn line, boats closest to shore, and traffic returning toward the dock.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Stop before the turn. Cross only when clear.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Starting the crossing while the shell is still moving too fast.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="What exact downstream cue are we using today?"> What exact downstream cue are we using today?</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-04-upstream-leg" data-guide-map="small-round-first-sunday" data-place-ids="island-weeds weeds-9 fallen-tree-2 fallen-trees river-turn-7">
            <div class="route-card-header">
              <span class="route-card-kicker">4 of 6</span>
              <h3>Upstream leg: downstream turn line to upstream turn line</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>From the downstream turn line back upstream, past the dock area, toward the small-round upstream turn cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold the correct side for your direction of travel and keep scanning through the mixed-use stretch.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Island or weed edge, shoreline weeds, fallen-tree cues, returning shells, paddlers, and swimmers.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Scan first, steer second.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Staring at the caution spot and forgetting to scan traffic.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="What should I do if a paddler or swimmer blocks the line?"> What should I do if a paddler or swimmer blocks the line?</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-05-upstream-turn" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-7 river-turn-8" data-line-ids="lts-first-weekend-2">
            <div class="route-card-header">
              <span class="route-card-kicker">5 of 6</span>
              <h3>Upstream turn line</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the small-round upstream crossing line.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Stop first. Turn left. Check traffic. Cross only when clear. Turn left again.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Boats approaching from behind, boats already turning, and shells returning toward the dock.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Complete the turn before adding pressure.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Treating the upstream turn as optional because the dock feels close.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="What exact upstream turn cue are we using today?"> What exact upstream turn cue are we using today?</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-06-dock-return" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-8 docking">
            <div class="route-card-header">
              <span class="route-card-kicker">6 of 6</span>
              <h3>Return to dock</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>From the upstream turn line back to the AARC dock approach.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Approach slowly, use small corrections, and wait for coach direction before docking.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Dock congestion, coach launches, returning shells, paddlers, swimmers, and cross traffic.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Slow approach. Never point the bow straight at the dock.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Relaxing the scan because the dock is close.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Which dock approach does the coach want today?"> Which dock approach does the coach want today?</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>

        <section class="question-checklist" aria-labelledby="question-checklist-heading">
          <h3 id="question-checklist-heading">Questions to ask before launch</h3>
          <div class="question-summary" data-question-summary aria-live="polite">
            <p>No questions selected yet.</p>
          </div>
        </section>
      </section>

      <section id="bridge-round-route" class="river-mode-panel" data-mode-panel="bridge-round" aria-labelledby="bridge-round-route-heading" hidden>
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Separate route</p>
          <h2 id="bridge-round-route-heading">Route 2: Bridge round</h2>
          <p>Use this only when your coach assigns the bridge round. Read the bridge route in two parts: bridges upstream first, then bridges downstream after the coach has turned the group for return.</p>
        </div>

        <div class="route-schematic" role="img" aria-label="Bridge round order: approach the bridge route, bridges upstream, turn for return, bridges downstream, clear the bridge area">
          <span>Approach</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Bridges upstream</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Turn / transition</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Bridges downstream</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Clear</span>
        </div>

        <h3 class="route-subheading">Bridges upstream</h3>
        <div class="route-card-list route-card-list--compact">
          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bu-01-approach" data-guide-map="bridge-navigation-map" data-place-ids="river-turn-9" data-line-ids="lts-saturday-second-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">U1</span>
              <h3>Bridge approach cue</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the coach-assigned bridge approach cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Regroup mentally before the bridge section. Look early for the first opening.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Am I committed to the correct side before the bridge approach begins?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Entering the bridge area while still uncertain.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop before the approach and wait for coach instruction.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bu-02-first-opening" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-2">
            <div class="route-card-header">
              <span class="route-card-kicker">U2</span>
              <h3>First upstream opening</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the outbound bridge opening or pillar cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Identify the assigned opening early and commit before the shell reaches the structure.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Which side of the pillar did the coach assign?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Last-second steering under the bridge.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop before committing to the opening.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bu-03-branches" data-guide-map="bridge-navigation-map" data-place-ids="tree-branches">
            <div class="route-card-header">
              <span class="route-card-kicker">U3</span>
              <h3>Branches on the upstream line</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the branch cue near the bridge approach.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Leave room for branches while staying on the expected bridge line.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Can I clear the branches without crossing the traffic pattern?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Moving away from branches so abruptly that you enter another shell's path.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Hold position before the bridge area and ask the coach to reset the line.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bu-04-angle" data-guide-map="bridge-navigation-map" data-place-ids="correct-your-angle">
            <div class="route-card-header">
              <span class="route-card-kicker">U4</span>
              <h3>Correct angle before the opening</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the angle-correction cue before the bridge pulls the shell off line.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Make small corrections early.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Is my bow already pointed through the intended opening?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Staring at the pillar and forgetting to scan.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Slow or stop before the opening.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bu-05-pass-opening" data-guide-map="bridge-navigation-map" data-place-ids="pass-here wrong-side-of-the-pillar bridge-pillar">
            <div class="route-card-header">
              <span class="route-card-kicker">U5</span>
              <h3>Pass through the assigned opening</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the preferred bridge opening or passing cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Pass through the assigned opening, then settle back onto the expected line.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Am I passing where the coach expects?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Drifting to the wrong side of the pillar.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Do not enter the bridge opening. Stop before committing.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>

        <h3 class="route-subheading">Bridges downstream</h3>
        <div class="route-card-list route-card-list--compact">
          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bd-01-return-setup" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-4">
            <div class="route-card-header">
              <span class="route-card-kicker">D1</span>
              <h3>Return-side setup</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the return-side bridge setup cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Set the line early before entering the downstream bridge section.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Am I on the correct return side before the bridge area begins?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Treating the return bridge line as the same as the upstream line.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop clear of the bridge area and wait for coach instruction.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bd-02-current" data-guide-map="bridge-navigation-map" data-place-ids="current">
            <div class="route-card-header">
              <span class="route-card-kicker">D2</span>
              <h3>Current and drift</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the current cue on the downstream return.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Expect drift and correct early with small steering changes.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Is current pushing me across the expected line?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Waiting until the shell is already sideways to correct.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop clear of the bridge area and ask the coach to reset the group.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bd-03-return-opening" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-3">
            <div class="route-card-header">
              <span class="route-card-kicker">D3</span>
              <h3>Return opening</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the downstream return opening or pillar cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Identify the assigned return opening and pass through it predictably.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Which opening did the coach assign for the return direction?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Blocking the bridge approach for another shell.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop, scan, and wait for the coach to confirm the return path.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="bd-04-clear-area" data-guide-map="bridge-navigation-map" data-place-ids="river-turn-10" data-line-ids="lts-saturday-second-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">D4</span>
              <h3>Clear the bridge area</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the bridge return cue after the downstream opening.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Clear the bridge area before turning, pausing, or waiting for the group.</dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Am I clear of the opening and out of the approach path?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Turning while blocking the bridge route.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Move clear if safe, stop, scan, and look for coach instruction.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>
      </section>

      <section id="full-round-route" class="river-mode-panel" data-mode-panel="full-round" aria-labelledby="full-round-route-heading" hidden>
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Advanced route</p>
          <h2 id="full-round-route-heading">Route 3: Full round</h2>
          <p>Use this only when your coach assigns the full round. This route adds the full upstream extension and the Tail Bridge / Barton turn area.</p>
        </div>

        <div class="route-schematic" role="img" aria-label="Full round order: launch, downstream side, upstream extension, bridges upstream, Tail Bridge turn, return leg, bridges downstream, dock return">
          <span>Launch</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Argo side</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Upstream extension</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Bridges upstream</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Tail Bridge turn</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Return leg</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Bridges downstream</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Dock return</span>
        </div>

        <div class="route-card-list route-card-list--compact">
          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-01-launch-downstream" data-guide-map="full-round-second-sunday" data-place-ids="launch downstream">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 1</span>
              <h3>Launch and downstream side</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>From the AARC dock onto the downstream side assigned by the coach.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Launch under control, settle onto the traffic side, and confirm the full-round plan before pressure builds.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Dock traffic, returning shells, paddlers, swimmers, and the group's spacing.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-02-argo-boundary" data-guide-map="full-round-second-sunday" data-place-ids="river-turn-3 river-turn-4" data-line-ids="no-rowing-beyond-this-point">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 2</span>
              <h3>Argo-side turn / boundary if assigned</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Near the Argo-side downstream boundary and coach-assigned turn cues.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Turn before the permanent no-row boundary if the coach uses this as today's downstream limit.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>The hard no-row line, boats setting up to turn, and shells returning toward the dock.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-03-upstream-extension" data-guide-map="full-round-second-sunday" data-place-ids="river-turn-7 fallen-trees-2 weeds-2" data-line-ids="lts-first-weekend-2">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 3</span>
              <h3>Upstream extension past small-round limit</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Past the small-round upstream turn line toward the bridge section.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Continue only because the coach assigned the full route, and keep the line predictable through the extension.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Fallen-tree cues, weeds, group spacing, and boats still using the small round.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-04-bridges-upstream" data-guide-map="full-round-second-sunday" data-place-ids="river-turn-9 bridge-pillar-2 tree-branches correct-your-angle pass-here" data-line-ids="lts-saturday-second-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 4</span>
              <h3>Bridges upstream</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Through the upstream bridge sequence on the full route.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Use the coach-assigned openings, correct angle early, and pass through predictably.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Pillars, branches, other shells, and last-second steering.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-05-tail-bridge-turn" data-guide-map="full-round-second-sunday" data-place-ids="sharp-turn tree-branch river-turn river-turn-2 good-place-for-a-break" data-line-ids="end-point">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 5</span>
              <h3>Full-route bend and Tail Bridge turn area</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the full-route bend and Tail Bridge / Barton turn area.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Set the bend early, turn at the coach-assigned point, and clear the area before regrouping.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Sharp bend geometry, branches, following shells, and boats already turning.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-06-return-leg" data-guide-map="full-round-second-sunday" data-place-ids="fallen-trees-corner fallen-tree fallen-tree-4 fallen-trees-3">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 6</span>
              <h3>Return leg toward bridge section</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>On the return leg from the full-route turn area toward the bridges.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold the return side, make early corrections, and keep the group moving predictably.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Tree-covered corners, drift, fatigue, and spacing changes after the turn.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-07-bridges-downstream" data-guide-map="full-round-second-sunday" data-place-ids="bridge-pillar-4 current bridge-pillar-3 river-turn-10" data-line-ids="lts-saturday-second-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 7</span>
              <h3>Bridges downstream</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Through the downstream bridge sequence on the return.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Set the return-side line early, expect current, and clear the bridge area before turning or pausing.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Current, return openings, bridge approaches, and other shells entering the bridge area.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-08-dock-return" data-guide-map="full-round-second-sunday" data-place-ids="stay-on-your-side-of-the-corner weeds-8 river-turn-8" data-line-ids="lts-first-weekend-2">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 8</span>
              <h3>Return toward dock</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>From the bridge return area toward the small-round return cue and dock approach.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold your side through the corner, scan mixed-use traffic, and prepare early for the dock return.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Corner traffic, weeds, small-round shells, paddlers, and swimmers.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-09-docking" data-guide-map="full-round-second-sunday" data-place-ids="docking">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 9</span>
              <h3>Docking</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the AARC dock approach after the full route.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Slow down, use small corrections, and wait for coach direction before docking.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Dock congestion, tired crews, coach launches, paddlers, swimmers, and cross traffic.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>
      </section>

      <section id="coach-quick-card" class="river-mode-panel printable-card" data-mode-panel="coach" aria-labelledby="coach-quick-card-heading" hidden>
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Coach / quick card</p>
          <h2 id="coach-quick-card-heading">Briefing and selected-course quick card</h2>
          <p>Use this to confirm today's route, turn cues, limits, and reminders before launch.</p>
          <button type="button" class="print-guide-button" data-print-guide><i class="fas fa-print"></i> Print selected quick card</button>
        </div>

        <form class="coach-briefing-tool" aria-labelledby="coach-tool-heading">
          <h3 id="coach-tool-heading">Generate learner prompt</h3>
          <div class="coach-tool-grid">
            <label>
              Session route
              <select data-coach-route-map>
                <option value="small-round">Small round</option>
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
              <li>Name the assigned course: small round, bridge round, or full round.</li>
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

          <section class="quick-card-section" data-quick-card="bridge-round" hidden>
            <h3>Bridge round quick card</h3>
            <h4>Before launch</h4>
            <ul class="quick-checklist">
              <li><span aria-hidden="true"></span>First upstream opening?</li>
              <li><span aria-hidden="true"></span>Angle correction cue?</li>
              <li><span aria-hidden="true"></span>Return-side opening?</li>
              <li><span aria-hidden="true"></span>Current / drift cue?</li>
              <li><span aria-hidden="true"></span>Where do we stop if uncertain?</li>
            </ul>
            <h4>Bridges upstream</h4>
            <ol>
              <li>U1 Approach cue.</li>
              <li>U2 First upstream opening.</li>
              <li>U3 Branches.</li>
              <li>U4 Correct angle.</li>
              <li>U5 Assigned opening.</li>
            </ol>
            <h4>Bridges downstream</h4>
            <ol>
              <li>D1 Return-side setup.</li>
              <li>D2 Current and drift.</li>
              <li>D3 Return opening.</li>
              <li>D4 Clear bridge area.</li>
            </ol>
          </section>

          <section class="quick-card-section" data-quick-card="full-round" hidden>
            <h3>Full round quick card</h3>
            <h4>Before launch</h4>
            <ul class="quick-checklist">
              <li><span aria-hidden="true"></span>Full-route turn point?</li>
              <li><span aria-hidden="true"></span>Tail Bridge / Barton limit?</li>
              <li><span aria-hidden="true"></span>Bridge sequence?</li>
              <li><span aria-hidden="true"></span>Return-side cues?</li>
              <li><span aria-hidden="true"></span>Dock approach?</li>
            </ul>
            <p>Use only when assigned by coach.</p>
          </section>
        </div>
      </section>
    </div>

    <aside id="route-map" class="river-map-reference" aria-labelledby="route-map-heading">
      <div class="river-map-reference-header">
        <p class="river-briefing-eyebrow">Map attached</p>
        <h2 id="route-map-heading" data-map-title>Route map</h2>
        <p data-map-summary>The cards are complete without the map. When the map loads, it highlights the active route step.</p>
      </div>
      <details class="river-map-details" open>
        <summary><i class="fas fa-map-location-dot"></i> Map reference</summary>
        <div class="river-map-reference-body">
          <p class="river-map-status" data-map-status role="status" aria-live="polite">Loading the optional route map...</p>
          <div class="river-map-tools" aria-label="Map tools">
            <button type="button" data-map-action="active"><i class="fas fa-crosshairs"></i> Reset to active step</button>
            <button type="button" data-map-action="full"><i class="fas fa-map"></i> Show full route</button>
          </div>
          <div class="river-briefing-map" data-map aria-label="Optional interactive map of the AARC river route">
            <p class="river-map-fallback">The route briefing above is usable without the map. Review the cards, confirm the assigned route with your coach, and stay inside the session limits.</p>
          </div>
          <button type="button" class="river-map-back" data-map-back hidden><i class="fas fa-arrow-up"></i> Back to card</button>
        </div>
      </details>
    </aside>
  </div>

  <div class="river-briefing-footer-actions">
    <a href="{{ '/for-learners/safety/river-rules.html' | relative_url }}" class="btn btn-outline-secondary"><i class="fas fa-arrow-left"></i> Back to River Rules</a>
    <a href="{{ '/for-learners/safety/index.html' | relative_url }}" class="btn btn-primary">Safety Overview <i class="fas fa-shield-alt"></i></a>
  </div>
</div>
