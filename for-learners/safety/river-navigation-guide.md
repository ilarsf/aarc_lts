---
layout: default
title: AARC River Navigation Guide
description: Learner route briefing for local Huron River navigation, bridge decisions, caution areas, and assigned course review.
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
      <li><span>Round below M-14</span></li>
      <li><span>Bridge round</span></li>
      <li><span>Full round</span></li>
    </ol>
    <p>Do not use landmarks from another course unless your coach assigns that course. The Round below M-14 stops before bridge navigation. The Bridge round starts only when the coach assigns the named bridge sequence.</p>
  </section>

  <nav class="river-mode-selector" aria-label="River course selector">
    <a href="#small-round-route" class="river-mode-button is-active" data-mode-button="small-round" aria-current="true">
      <i class="fas fa-route"></i>
      <span>Small round</span>
      <small>First learner round</small>
    </a>
    <a href="#below-m14-round-route" class="river-mode-button" data-mode-button="below-m14-round">
      <i class="fas fa-signs-post"></i>
      <span>Round below M-14</span>
      <small>River turns below the first bridge</small>
    </a>
    <a href="#bridge-round-route" class="river-mode-button" data-mode-button="bridge-round">
      <i class="fas fa-archway"></i>
      <span>Bridge round</span>
      <small>Named bridge sequence</small>
    </a>
    <a href="#full-round-route" class="river-mode-button" data-mode-button="full-round">
      <i class="fas fa-location-dot"></i>
      <span>Full round</span>
      <small>Full 6.5 km route</small>
    </a>
  </nav>

  <section class="question-checklist route-self-check-summary" data-question-checklist aria-labelledby="route-self-check-heading">
    <h2 id="route-self-check-heading">Self-checks before launch</h2>
    <div class="question-summary" data-question-summary aria-live="polite">
      <p>Answer the self-checks on the active route cards before launch.</p>
    </div>
  </section>

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
          <article class="route-card is-active" data-route-card data-mode="small-round" data-route-step-id="sr-01-launch" data-self-check-question="Which side should I settle onto after launch?" data-guide-map="small-round-first-sunday" data-place-ids="launch downstream">
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
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-02-downstream-leg" data-self-check-question="What shoreline cue marks the downstream leg today?" data-guide-map="small-round-first-sunday" data-place-ids="downstream fallen-tree-3 river-turn-5">
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
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-03-downstream-turn" data-self-check-question="What exact downstream cue are we using today?" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-5 river-turn-6" data-line-ids="lts-first-weekend">
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
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-04-upstream-leg" data-self-check-question="What should I do if a paddler or swimmer blocks the line?" data-guide-map="small-round-first-sunday" data-place-ids="island-weeds weeds-9 fallen-tree-2 fallen-trees river-turn-7">
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
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-05-upstream-turn" data-self-check-question="What exact upstream turn cue are we using today?" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-7 river-turn-8" data-line-ids="lts-first-weekend-2">
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
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="small-round" data-route-step-id="sr-06-dock-return" data-self-check-question="Which dock approach does the coach want today?" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-8 docking">
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
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>
      </section>

      <section id="below-m14-round-route" class="river-mode-panel" data-mode-panel="below-m14-round" aria-labelledby="below-m14-round-route-heading" hidden>
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Intermediate route</p>
          <h2 id="below-m14-round-route-heading">Route 2: Round below M-14</h2>
          <p>Use this route when your coach assigns the round below M-14. This course uses the river turns below the M-14 bridge. It does not go under M-14 and does not use the bridge sequence.</p>
        </div>

        <div class="route-schematic" role="img" aria-label="Round below M-14 order: launch, downstream turn, upstream leg, below-M-14 turn, return leg, dock">
          <span>Launch</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Downstream turn</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Upstream leg</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Below-M-14 turn</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Return leg</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Dock</span>
        </div>

        <div class="route-card-list">
          <article class="route-card" data-route-card data-mode="below-m14-round" data-route-step-id="bm14-01-launch" data-self-check-question="Which side should I settle onto after launch?" data-guide-map="below-m14-round" data-place-ids="launch downstream">
            <div class="route-card-header">
              <span class="route-card-kicker">1 of 7</span>
              <h3>Launch from AARC dock</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the AARC dock.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Push away under control, scan, and settle onto the correct side before adding pressure.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Dock traffic, returning shells, coach launches, paddlers, and swimmers.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Stay right for your direction of travel.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="below-m14-round" data-route-step-id="bm14-02-downstream-turn" data-self-check-question="What downstream turn line did the coach assign for this round?" data-guide-map="below-m14-round" data-place-ids="river-turn-5 river-turn-6" data-line-ids="lts-first-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">2 of 7</span>
              <h3>Downstream turn line</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the coach-assigned downstream turn line for this round.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Stop first, turn left, check traffic, cross only when clear, and turn left again.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Other shells turning, boats closest to shore, and traffic returning toward the dock.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Starting the crossing before the shell is stopped and traffic is clear.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="below-m14-round" data-route-step-id="bm14-03-upstream-leg" data-self-check-question="What tells me to continue past the small-round upstream turn today?" data-guide-map="below-m14-round" data-place-ids="river-turn-7 fallen-trees-2 weeds-2">
            <div class="route-card-header">
              <span class="route-card-kicker">3 of 7</span>
              <h3>Upstream leg past the small-round turn</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>From the downstream turn line, past the dock area and past the small-round upstream turn cue.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold the correct side and continue only because your coach assigned the below-M-14 round.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Small-round shells turning, returning boats, weeds, fallen-tree cues, paddlers, and swimmers.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Do not copy the small-round turn if today's course continues upstream.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="below-m14-round" data-route-step-id="bm14-04-approach-m14-limit" data-self-check-question="How close to M-14 should we get before setting up the turn?" data-guide-map="below-m14-round" data-place-ids="river-turn-9">
            <div class="route-card-header">
              <span class="route-card-kicker">4 of 7</span>
              <h3>Approach the M-14 limit</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>On the upstream extension, before the M-14 bridge area.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Prepare early for the coach-assigned turn below M-14.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Other shells using the same extension, current or drift near the bridge approach, and traffic returning downstream.</dd>
              </div>
              <div>
                <dt>Important</dt>
                <dd>This route does not go under M-14. If the coach did not assign the Bridge round, turn below the bridge.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="below-m14-round" data-route-step-id="bm14-05-below-m14-turn" data-self-check-question="What is the coach-assigned cue for the turn below M-14?" data-self-check-placeholder="Example: turn at the coach-assigned cue below M-14" data-guide-map="below-m14-round" data-place-ids="river-turn-9 river-turn-10" data-line-ids="lts-saturday-second-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">5 of 7</span>
              <h3>Below-M-14 turn</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the coach-assigned river turn below the M-14 bridge.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Stop first. Turn left. Check traffic. Cross only when clear. Turn left again.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Boats approaching from behind, shells already turning, and any traffic near the M-14 approach.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Drifting into the bridge approach while setting up the turn.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="below-m14-round" data-route-step-id="bm14-06-return-leg" data-self-check-question="How do I return without cutting across another course line?" data-guide-map="below-m14-round" data-place-ids="river-turn-10 stay-on-your-side-of-the-corner weeds-8 river-turn-8">
            <div class="route-card-header">
              <span class="route-card-kicker">6 of 7</span>
              <h3>Return leg toward the dock</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>From the below-M-14 turn back toward the dock area.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold the correct return side, scan through mixed-use traffic, and prepare early for the dock return.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Small-round shells, paddlers, swimmers, dock traffic, and boats turning near the lower course.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Return predictably; do not cut across another course line.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="below-m14-round" data-route-step-id="bm14-07-dock" data-self-check-question="Which dock approach does the coach want after this route?" data-guide-map="below-m14-round" data-place-ids="docking">
            <div class="route-card-header">
              <span class="route-card-kicker">7 of 7</span>
              <h3>Return to dock</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the AARC dock approach.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Approach slowly, use small corrections, and wait for coach direction before docking.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Dock congestion, returning shells, coach launches, paddlers, swimmers, and cross traffic.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Relaxing the scan because the row feels nearly finished.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>
      </section>

      <section id="bridge-round-route" class="river-mode-panel" data-mode-panel="bridge-round" aria-labelledby="bridge-round-route-heading" hidden>
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Separate route</p>
          <h2 id="bridge-round-route-heading">Route 3: Bridge round</h2>
          <p>Use this only when your coach assigns the bridge round. Read the named bridge route in two parts: M-14, Barton Shore Drive, Railroad, and Barton Nature Area Trail upstream, then the reverse sequence downstream after the coach has turned the group for return.</p>
        </div>

        <section class="bridge-name-key" aria-labelledby="bridge-name-key-title">
          <h3 id="bridge-name-key-title">Bridge names, downstream to upstream</h3>
          <ol>
            <li>
              <strong>M-14 bridge</strong>
              <span>First bridge; has a pillar in the river.</span>
            </li>
            <li>
              <strong>Barton Shore Drive bridge</strong>
              <span>Pedestrian and car bridge; no pillars in the river.</span>
            </li>
            <li>
              <strong>Railroad bridge</strong>
              <span>Two openings: upstream opening and downstream opening.</span>
            </li>
            <li>
              <strong>Barton Nature Area Trail bridge</strong>
              <span>Tall bridge; pillar in the middle of the river.</span>
            </li>
          </ol>
        </section>

        <div class="route-schematic" role="img" aria-label="Bridge round order: approach the bridge route, bridges upstream, turn for return, bridges downstream, clear the bridge area">
          <span>Set up below M-14</span>
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
          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-approach-below-m14" data-self-check-question="Did the coach assign the Bridge round and the named bridge sequence?" data-guide-map="bridge-navigation-map" data-place-ids="river-turn-9" data-line-ids="lts-saturday-second-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">Approach</span>
              <h3>Set up below M-14</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Below the M-14 bridge, before entering the bridge sequence.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Confirm that the coach assigned the Bridge round, identify the first bridge, and commit to the correct line early.</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Entering the M-14 approach while uncertain.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-u1-m14" data-self-check-question="Which side of the M-14 pillar did the coach assign upstream?" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-2">
            <div class="route-card-header">
              <span class="route-card-kicker">U1</span>
              <h3>M-14 bridge</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the M-14 bridge, the downstream-most bridge in the sequence.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Use the coach-assigned side of the river pillar and pass through predictably.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>The pillar in the river, current or drift near the approach, and other shells entering the bridge area.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop below the bridge before committing to the opening.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-u2-barton-shore" data-self-check-question="How do I keep the line through Barton Shore Drive after clearing M-14?" data-guide-map="bridge-navigation-map" data-place-ids="correct-your-angle">
            <div class="route-card-header">
              <span class="route-card-kicker">U2</span>
              <h3>Barton Shore Drive bridge</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the pedestrian and car bridge upstream of M-14.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold your bridge line and pass through steadily.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>No river pillar, but still watch for traffic, bank proximity, and line changes after M-14.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Relaxing because there is no pillar and drifting off the assigned side.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-u3-railroad-upstream" data-self-check-question="What is the Railroad bridge upstream opening today?" data-guide-map="bridge-navigation-map" data-place-ids="pass-here">
            <div class="route-card-header">
              <span class="route-card-kicker">U3</span>
              <h3>Railroad bridge: upstream opening</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the railroad bridge, using the coach-assigned upstream opening.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Name the opening before you reach it and commit early.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>The two-opening layout, shells returning downstream, and last-second steering.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop before the railroad bridge and wait for coach instruction.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-u4-trail-bridge" data-self-check-question="Which side of the Barton Nature Area Trail bridge pillar did the coach assign?" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar wrong-side-of-the-pillar">
            <div class="route-card-header">
              <span class="route-card-kicker">U4</span>
              <h3>Barton Nature Area Trail bridge</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the tall trail bridge upstream of the railroad bridge.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Use the coach-assigned side of the middle river pillar.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>The pillar in the middle of the river, other shells clearing the bridge, and the next turn or regroup cue.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Looking at the pillar instead of steering the line early.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>

        <h3 class="route-subheading">Bridges downstream</h3>
        <div class="route-card-list route-card-list--compact">
          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-d1-trail-bridge" data-self-check-question="What return line did the coach assign at the Barton Nature Area Trail bridge?" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-4">
            <div class="route-card-header">
              <span class="route-card-kicker">D1</span>
              <h3>Barton Nature Area Trail bridge</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the tall trail bridge on the downstream return.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Set the return line early and use the coach-assigned side of the middle river pillar.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Drift after the turn, boats approaching upstream, and the pillar in the middle of the river.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop clear of the bridge area and wait for coach instruction.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-d2-railroad-downstream" data-self-check-question="What is the Railroad bridge downstream opening today?" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-3">
            <div class="route-card-header">
              <span class="route-card-kicker">D2</span>
              <h3>Railroad bridge: downstream opening</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the railroad bridge, using the coach-assigned downstream opening.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Identify the downstream opening early and pass through predictably.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>The two-opening layout, upstream traffic, and boats changing line after the trail bridge.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Using the upstream-leg opening by habit on the downstream return.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-d3-barton-shore" data-self-check-question="How do I keep the return side through Barton Shore Drive?" data-guide-map="bridge-navigation-map" data-place-ids="barton-shore-drive-return">
            <div class="route-card-header">
              <span class="route-card-kicker">D3</span>
              <h3>Barton Shore Drive bridge</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the pedestrian and car bridge on the downstream return.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold the return side and keep the shell predictable.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Other shells, paddlers, bank proximity, and line changes before M-14.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-d4-m14" data-self-check-question="Which side of the M-14 pillar did the coach assign downstream?" data-guide-map="bridge-navigation-map" data-place-ids="current">
            <div class="route-card-header">
              <span class="route-card-kicker">D4</span>
              <h3>M-14 bridge</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the M-14 bridge, the final bridge on the downstream return.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Use the coach-assigned side of the river pillar and clear the bridge area before turning or waiting.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>The pillar in the river, shells approaching from below M-14, current or drift, and returning traffic.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop before the bridge if still clear of the approach. Do not stop inside the opening.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge-round" data-route-step-id="br-clear-below-m14" data-self-check-question="Where do I clear below M-14 before regrouping or returning to the lower course?" data-guide-map="bridge-navigation-map" data-place-ids="river-turn-10" data-line-ids="lts-saturday-second-weekend">
            <div class="route-card-header">
              <span class="route-card-kicker">Clear</span>
              <h3>Clear below M-14</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Below M-14 after the downstream bridge sequence.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Clear the bridge area before regrouping, turning, or returning to the lower course.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Boats entering the bridge sequence and shells using the below-M-14 round.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>
      </section>

      <section id="full-round-route" class="river-mode-panel" data-mode-panel="full-round" aria-labelledby="full-round-route-heading" hidden>
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Advanced route</p>
          <h2 id="full-round-route-heading">Route 4: Full round</h2>
          <p>Use this only when your coach assigns the full round. This route adds the full upstream extension, the named bridge sequence, and the Barton Nature Area Trail bridge / Barton turn area.</p>
        </div>

        <div class="route-schematic" role="img" aria-label="Full round order: launch, downstream side, upstream extension, bridges upstream, Barton Nature Area Trail bridge turn, return leg, bridges downstream, dock return">
          <span>Launch</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Argo side</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Upstream extension</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Bridges upstream</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Barton Nature Area Trail bridge turn</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Return leg</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Bridges downstream</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Dock return</span>
        </div>

        <div class="route-card-list route-card-list--compact">
          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-01-launch-downstream" data-self-check-question="What full-round route limit did the coach assign before launch?" data-guide-map="full-round-second-sunday" data-place-ids="launch downstream">
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

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-02-argo-boundary" data-self-check-question="Where is the Argo-side no-row boundary if the coach uses it today?" data-guide-map="full-round-second-sunday" data-place-ids="river-turn-3 river-turn-4" data-line-ids="no-rowing-beyond-this-point">
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

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-03-upstream-extension" data-self-check-question="What tells me to continue through the below-M-14 extension today?" data-guide-map="full-round-second-sunday" data-place-ids="river-turn-7 fallen-trees-2 weeds-2" data-line-ids="lts-first-weekend-2">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 3</span>
              <h3>Upstream extension through the below-M-14 round</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Past the small-round upstream turn line, through the below-M-14 extension, and toward the bridge section.</dd>
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

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-04-bridges-upstream" data-self-check-question="Can I name the upstream bridge sequence before reaching M-14?" data-guide-map="full-round-second-sunday" data-place-ids="river-turn-9 bridge-pillar-2 correct-your-angle pass-here bridge-pillar" data-line-ids="lts-saturday-second-weekend">
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
                <dd>Use the coach-assigned openings through M-14, Barton Shore Drive, Railroad, and Barton Nature Area Trail, correct angle early, and pass through predictably.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Pillars, the Railroad bridge openings, other shells, and last-second steering.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-05-trail-bridge-turn" data-self-check-question="Where is the coach-assigned turn above the Barton Nature Area Trail bridge?" data-guide-map="full-round-second-sunday" data-place-ids="sharp-turn tree-branch river-turn river-turn-2 good-place-for-a-break" data-line-ids="end-point">
            <div class="route-card-header">
              <span class="route-card-kicker">Full 5</span>
              <h3>Full-route bend and Barton Nature Area Trail bridge turn area</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the full-route bend and Barton Nature Area Trail bridge / Barton turn area.</dd>
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

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-06-return-leg" data-self-check-question="What return-side line should I hold after the full-route turn?" data-guide-map="full-round-second-sunday" data-place-ids="fallen-trees-corner fallen-tree fallen-tree-4 fallen-trees-3">
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

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-07-bridges-downstream" data-self-check-question="Can I name the downstream bridge sequence before returning below M-14?" data-guide-map="full-round-second-sunday" data-place-ids="bridge-pillar-4 bridge-pillar-3 barton-shore-drive-return current river-turn-10" data-line-ids="lts-saturday-second-weekend">
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
                <dd>Set the return-side line early through Barton Nature Area Trail, Railroad, Barton Shore Drive, and M-14, expect current, and clear the bridge area before turning or pausing.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Current, return openings, bridge approaches, and other shells entering the bridge area.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-08-dock-return" data-self-check-question="What lower-course traffic should I expect on the return toward dock?" data-guide-map="full-round-second-sunday" data-place-ids="stay-on-your-side-of-the-corner weeds-8 river-turn-8" data-line-ids="lts-first-weekend-2">
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

          <article class="route-card" data-route-card data-mode="full-round" data-route-step-id="fr-09-docking" data-self-check-question="Which dock approach does the coach want after the full round?" data-guide-map="full-round-second-sunday" data-place-ids="docking">
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
