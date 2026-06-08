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
      <p class="river-briefing-eyebrow">Whole route first</p>
      <h2 id="whole-route-heading">The route story</h2>
      <p>Learn the pattern before using the map: leave the dock under control, settle onto the correct side, scan mixed river traffic, stop before the turn, complete the river turn, and return to dock slowly.</p>
    </div>
    <ol class="whole-route-steps">
      <li><span>Dock</span></li>
      <li><span>Travel side</span></li>
      <li><span>Caution zone</span></li>
      <li><span>Turn area</span></li>
      <li><span>Return side</span></li>
      <li><span>Dock</span></li>
    </ol>
  </section>

  <nav class="river-mode-selector" aria-label="Route briefing modes">
    <a href="#learn-route" class="river-mode-button is-active" data-mode-button="learn" aria-current="true">
      <i class="fas fa-route"></i>
      <span>Learn the route</span>
      <small>First-time sequence</small>
    </a>
    <a href="#bridge-reference" class="river-mode-button" data-mode-button="bridge">
      <i class="fas fa-archway"></i>
      <span>Bridge reference</span>
      <small>Openings and current</small>
    </a>
    <a href="#coach-briefing" class="river-mode-button" data-mode-button="coach">
      <i class="fas fa-clipboard-list"></i>
      <span>Coach briefing</span>
      <small>Script and prompts</small>
    </a>
    <a href="#printable-card" class="river-mode-button" data-mode-button="print">
      <i class="fas fa-print"></i>
      <span>Quick card</span>
      <small>Printable review</small>
    </a>
  </nav>

  <div class="river-briefing-layout">
    <div class="river-briefing-content">
      <section id="learn-route" class="river-mode-panel" data-mode-panel="learn" aria-labelledby="learn-route-heading">
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Learner route briefing</p>
          <h2 id="learn-route-heading">Basic route</h2>
          <p>Read these six cards before launch. A learner should be able to explain the side of the river, the turn behavior, and the main hazards without touching the map.</p>
        </div>

        <div class="route-schematic" role="img" aria-label="Simplified route: dock to outbound side, caution zone, turn, return side, and dock">
          <span>Dock</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Outbound side</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Caution</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Turn</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Return side</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
          <span>Dock</span>
        </div>

        <div class="route-card-list">
          <article class="route-card is-active" data-route-card data-mode="learn" data-guide-map="small-round-first-sunday" data-place-ids="launch downstream">
            <div class="route-card-header">
              <span class="route-card-kicker">1 of 6</span>
              <h3>Launch and orient</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the AARC dock, before adding pressure or leaving the coached launch area.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Push away, establish control, scan traffic, and identify the correct travel side.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Other shells, coach launches, paddlers, swimmers, and dock traffic.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Stay right unless passing or turning.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Looking at the landmark but not scanning behind and ahead.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Confirm the correct travel side before leaving the dock."> Confirm the side I should be on before I start rowing.</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="learn" data-guide-map="small-round-first-sunday" data-place-ids="fallen-tree-3">
            <div class="route-card-header">
              <span class="route-card-kicker">2 of 6</span>
              <h3>Settle onto the travel side</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Just downriver from the AARC dock, near the first tree-cover/fallen-tree caution marker. Your coach will confirm how far from shore to hold the line.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Hold your assigned side and make small early steering corrections.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Shoreline shallows, tree cover, and boats that are still launching or returning.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Give the bank room without drifting across the traffic pattern.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Correcting late, then steering too much at once.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Ask how far from shore to hold the line today."> Ask how far from shore to hold the line today.</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="learn" data-guide-map="small-round-first-sunday" data-place-ids="island-weeds weeds-8">
            <div class="route-card-header">
              <span class="route-card-kicker">3 of 6</span>
              <h3>Scan the mixed-use stretch</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the island-and-weeds stretch and nearby shoreline weed patches on the small-round line.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Keep your line predictable. Stop if a swimmer, paddler, or another shell makes the path unclear.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Weeds, shallows, paddlers, swimmers, and rowers who may not be holding the expected side.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Scan first, steer second.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Watching the caution spot and forgetting to scan traffic.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Ask what to do if a paddler or swimmer blocks the line."> Ask what to do if a paddler or swimmer blocks the line.</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="learn" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-5" data-line-ids="no-rowing-beyond-this-point">
            <div class="route-card-header">
              <span class="route-card-kicker">4 of 6</span>
              <h3>Approach the turn area</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>At the small-round downstream turn cue, before the permanent no-row line and crossing area.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Come under control early and stop before beginning the river turn.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Other boats turning, shells approaching from behind, and the permanent no-row area. The no-row area is the hard limit; do not drift into it while setting up the turn.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Turn before the limit. Do not drift into the crossing.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Starting the turn while still moving too fast.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Confirm today's downstream turn cue and no-row limit."> Confirm today's downstream turn cue and no-row limit.</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="learn" data-guide-map="small-round-first-sunday" data-place-ids="river-turn-6 river-turn-7 river-turn-8" data-line-ids="lts-first-weekend lts-first-weekend-2">
            <div class="route-card-header">
              <span class="route-card-kicker">5 of 6</span>
              <h3>Make the river turn</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Between the downstream turn cue and the return-side cue on the assigned small-round crossing.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Stop, turn left, check traffic, cross only when clear, turn left again, then clear the turn area.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Boats already turning and boats closest to shore that need extra room.</dd>
              </div>
              <div>
                <dt>Coach cue</dt>
                <dd>Stop first. Make the turn compact and predictable.</dd>
              </div>
              <div>
                <dt>Common mistake</dt>
                <dd>Crossing before the boat is pointed and traffic is checked.</dd>
              </div>
            </dl>
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Ask where to wait after completing the river turn."> Ask where to wait after completing the river turn.</label>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="learn" data-guide-map="small-round-first-sunday" data-place-ids="docking">
            <div class="route-card-header">
              <span class="route-card-kicker">6 of 6</span>
              <h3>Return and prepare to dock</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Where</dt>
                <dd>Back at the AARC dock approach, where returning shells, coach launches, and dock traffic mix.</dd>
              </div>
              <div>
                <dt>Do</dt>
                <dd>Approach slowly at an angle, make small corrections, and wait for coach direction.</dd>
              </div>
              <div>
                <dt>Watch for</dt>
                <dd>Dock congestion, returning shells, paddlers, swimmers, and cross traffic.</dd>
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
            <label class="route-check"><input type="checkbox" data-question-checkbox value="Ask which dock approach the coach wants today."> Ask which dock approach the coach wants today.</label>
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

      <section id="bridge-reference" class="river-mode-panel" data-mode-panel="bridge" aria-labelledby="bridge-reference-heading">
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Separate reference</p>
          <h2 id="bridge-reference-heading">Bridge decisions</h2>
          <p>Use this section only when your coach assigns the bridge route. The bridge reference is more detailed than the basic route because the learner must identify openings, pillars, current, and angle changes early.</p>
        </div>

        <div class="route-card-list route-card-list--compact">
          <article class="route-card" data-route-card data-mode="bridge" data-guide-map="bridge-navigation-map" data-place-ids="river-turn-9">
            <div class="route-card-header">
              <span class="route-card-kicker">Bridge 1: first bridge approach</span>
              <h3>Set up before the structure</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Decision</dt>
                <dd>Which side and opening did the coach assign?</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Last-second steering under the bridge.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop before the bridge approach and wait for coach instruction.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-2 tree-branches correct-your-angle pass-here">
            <div class="route-card-header">
              <span class="route-card-kicker">Bridge 2: outbound opening</span>
              <h3>Outbound opening and angle</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Decision</dt>
                <dd>Identify the correct opening and correct your angle before the bridge pulls you off line.</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Watching the pillar so long that you stop scanning for traffic.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Hold position before committing to the opening.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>

          <article class="route-card" data-route-card data-mode="bridge" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-4 current">
            <div class="route-card-header">
              <span class="route-card-kicker">Bridge 3: current and drift</span>
              <h3>Current and drift</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Decision</dt>
                <dd>Make small corrections early so current does not push the shell across the expected line.</dd>
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

          <article class="route-card" data-route-card data-mode="bridge" data-guide-map="bridge-navigation-map" data-place-ids="bridge-pillar-3 river-turn-10">
            <div class="route-card-header">
              <span class="route-card-kicker">Bridge 4: return opening</span>
              <h3>Return opening and turn cue</h3>
            </div>
            <dl class="route-card-facts">
              <div>
                <dt>Decision</dt>
                <dd>Use the coach-assigned return opening, then turn only after traffic is checked.</dd>
              </div>
              <div>
                <dt>Avoid</dt>
                <dd>Blocking the bridge approach for another boat while turning.</dd>
              </div>
              <div>
                <dt>If uncertain</dt>
                <dd>Stop, scan, and wait for the coach to confirm the return path.</dd>
              </div>
            </dl>
            <a href="#route-map" class="route-map-link" data-map-focus><i class="fas fa-location-dot"></i> Show on map</a>
          </article>
        </div>
      </section>

      <section id="coach-briefing" class="river-mode-panel" data-mode-panel="coach" aria-labelledby="coach-briefing-heading">
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Coach script</p>
          <h2 id="coach-briefing-heading">Pre-launch briefing</h2>
          <p>Use this as a consistent script and adjust the details for the session. The learner-facing rule remains simple: stay right, pass left, stop before turning, and follow the coach-assigned course.</p>
        </div>

        <form class="coach-briefing-tool" aria-labelledby="coach-tool-heading">
          <h3 id="coach-tool-heading">Generate learner prompt</h3>
          <div class="coach-tool-grid">
            <label>
              Session route
              <select data-coach-route-map>
                <option value="small-round-first-sunday">Small round</option>
                <option value="bridge-round-second-saturday">Bridge route</option>
                <option value="full-round-second-sunday">Full route</option>
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
              <li>Today we are using the route segment named before launch.</li>
              <li>Your default side is the right side of the river for your direction of travel.</li>
              <li>You will turn at the coach-assigned cue and stay inside the assigned limit.</li>
              <li>If uncertain, stop, scan, and look for coach instruction.</li>
            </ul>
          </article>
          <article class="coach-script">
            <h3>At the turn</h3>
            <ol>
              <li>Stop first.</li>
              <li>Turn left.</li>
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
              <li>Confusing the bridge reference with today's assigned route.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="printable-card" class="river-mode-panel printable-card" data-mode-panel="print" aria-labelledby="printable-card-heading">
        <div class="river-section-heading">
          <p class="river-briefing-eyebrow">Printable review</p>
          <h2 id="printable-card-heading">Dock quick card</h2>
          <p>Use this as a phone-friendly or printed check before practice.</p>
          <button type="button" class="print-guide-button" data-print-guide><i class="fas fa-print"></i> Print quick card</button>
        </div>

        <div class="quick-card-grid">
          <section class="quick-card-section">
            <h3>Before launch</h3>
            <ul class="quick-checklist">
              <li><span aria-hidden="true"></span>Route today?</li>
              <li><span aria-hidden="true"></span>Turn cue?</li>
              <li><span aria-hidden="true"></span>Do-not-go-beyond point?</li>
              <li><span aria-hidden="true"></span>Bridge or caution area?</li>
            </ul>
          </section>
          <section class="quick-card-section">
            <h3>On the water</h3>
            <ul class="quick-checklist">
              <li><span aria-hidden="true"></span>Stay right.</li>
              <li><span aria-hidden="true"></span>Pass left.</li>
              <li><span aria-hidden="true"></span>Stop before turning.</li>
              <li><span aria-hidden="true"></span>Coach sets the course.</li>
            </ul>
          </section>
          <section class="quick-card-section">
            <h3>River turn</h3>
            <ol>
              <li>Stop.</li>
              <li>Turn left.</li>
              <li>Check traffic.</li>
              <li>Cross only when clear.</li>
              <li>Turn left again.</li>
              <li>Clear the area.</li>
            </ol>
          </section>
          <section class="quick-card-section">
            <h3>If uncertain</h3>
            <ul class="quick-checklist">
              <li><span aria-hidden="true"></span>Stop.</li>
              <li><span aria-hidden="true"></span>Hold position if safe.</li>
              <li><span aria-hidden="true"></span>Scan traffic.</li>
              <li><span aria-hidden="true"></span>Look for coach instruction.</li>
            </ul>
          </section>
        </div>
      </section>
    </div>

    <aside id="route-map" class="river-map-reference" aria-labelledby="route-map-heading">
      <div class="river-map-reference-header">
        <p class="river-briefing-eyebrow">Map attached</p>
        <h2 id="route-map-heading" data-map-title>Route map</h2>
        <p data-map-summary>The cards are complete without the map. When the map loads, it highlights the active briefing card.</p>
      </div>
      <details class="river-map-details" open>
        <summary><i class="fas fa-map-location-dot"></i> Map reference</summary>
        <div class="river-map-reference-body">
          <p class="river-map-status" data-map-status role="status" aria-live="polite">Loading the optional route map...</p>
          <div class="river-map-tools" aria-label="Map tools">
            <button type="button" data-map-action="active"><i class="fas fa-crosshairs"></i> Reset to active card</button>
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
