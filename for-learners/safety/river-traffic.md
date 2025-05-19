---
layout: default
title: River Traffic Guide
description: Navigation patterns and rules for scullers
---

{% include head-custom.html %}
<link rel="stylesheet" href="{{ '/assets/css/river-traffic.css' | relative_url }}">
<script src="{{ '/assets/js/river-traffic.js' | relative_url }}" defer></script>

# River Traffic Guide for Novice Scullers

Understanding and following proper waterway navigation rules is essential for the safety of all rowers and other water users. This guide covers the core traffic patterns and navigation principles you need to know.

<div class="river-traffic-container">
  <div class="interactive-map-container">
    <h2 class="interactive-map-title">Huron River Navigation: Barton Dam to Argo Dam</h2>

    <div class="river-map">
      <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <path class="river" d="M 100,80 C 200,70 300,100 360,150 C 300,180 280,250 320,300 C 380,380 500,400 580,350 C 650,280 630,180 550,150 C 480,120 400,130 380,180 L 390,200 C 480,180 580,200 620,280 C 650,350 580,440 500,480 C 400,520 350,500 330,450 C 300,380 350,300 390,250 C 420,200 300,120 200,110 C 120,100 110,90 100,80 Z" />

        <path class="mill-race" d="M 335,455 C 345,450 360,440 370,425 L 375,430 C 365,445 350,455 340,460 Z" fill="#AADAFF" stroke="#5483b0" stroke-width="1.5"/>

        <path class="land" d="M0,0 H800 V50 C 700,30 500,60 400,100 C 300,40 150,20 0,30 Z" />
        <path class="land" d="M0,600 H800 V550 C 700,570 500,520 400,480 C 300,530 150,580 0,560 Z" />

        <rect class="bridge" x="370" y="130" width="30" height="140" />
        <rect class="bridge-arch" x="375" y="170" width="20" height="70" />

        <rect class="bridge" x="405" y="125" width="30" height="150" /> <rect class="bridge-arch" x="410" y="165" width="20" height="80" />


        <rect class="landmark" x="50" y="40" width="100" height="50" data-type="landmark-area" data-title="Barton Dam Area" data-content="Area around Barton Dam and Barton Nature Area." />
        <rect class="landmark" x="450" y="180" width="180" height="150" data-type="landmark-area" data-title="Bandemer Park Area" data-content="Bandemer Park, on the eastern side of Argo Pond." />
        <rect class="landmark" x="300" y="460" width="80" height="60" data-type="landmark-area" data-title="Argo Dam & Livery Area" data-content="Area around Argo Dam, Canoe Livery, and Mill Race." />


        <path class="traffic-arrow" d="M150,100 C250,120 300,180 370,220" marker-end="url(#arrow)" /> <path class="traffic-arrow" d="M480,170 C550,220 570,300 520,380" marker-end="url(#arrow)" /> <path class="traffic-arrow" d="M480,420 C420,450 380,460 350,480" marker-end="url(#arrow)" /> <path class="traffic-arrow right" d="M340,440 C380,400 450,370 500,320" marker-end="url(#arrow)" /> <path class="traffic-arrow right" d="M530,280 C580,200 500,140 420,160" marker-end="url(#arrow)" /> <path class="traffic-arrow right" d="M380,140 C300,100 200,80 120,70" marker-end="url(#arrow)" /> <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
              markerWidth="6" markerHeight="6"
              orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
          </marker>
        </defs>

        <circle class="highlight-point" cx="100" cy="70" r="8"
                data-type="landmark" data-title="Barton Dam"
                data-content="<p><strong>Barton Dam:</strong> Upstream limit of this mapped section, forms Barton Pond. [cite: 50]</p><p>Nearby: Barton Nature Area, Black Pond Woods. [cite: 50]</p>" />

        <circle class="highlight-point" cx="385" cy="200" r="8"
                data-type="bridge" data-title="M-14 Expressway Overpass"
                data-content="<p><strong>M-14 Bridge:</strong> Major highway crossing over the Huron River. [cite: 50]</p>" />

        <circle class="highlight-point" cx="420" cy="195" r="8" data-type="bridge" data-title="Railroad Bridge"
                data-content="<p><strong>Railroad Bridge:</strong> Active railroad line crossing the Huron River, runs parallel to much of Argo Pond's western shore. [cite: 50]</p>" />

        <circle class="highlight-point" cx="550" cy="250" r="8"
                data-type="landmark" data-title="Bandemer Park"
                data-content="<p><strong>Bandemer Park:</strong> Large park on the eastern/northern bank of Argo Pond. Features include rowing facilities (boathouse) and disc golf. [cite: 359, 50]</p>" />
        
        <circle class="highlight-point" cx="470" cy="160" r="6" 
                data-type="traffic" data-title="Traver Creek Outlet" 
                data-content="<p><strong>Traver Creek Outlet:</strong> Traver Creek enters Argo Pond on its eastern bank. [cite: 50]</p>" />

        <circle class="highlight-point" cx="340" cy="470" r="8"
                data-type="landmark" data-title="Argo Dam"
                data-content="<p><strong>Argo Dam:</strong> Downstream limit of Argo Pond. [cite: 50]</p><p>The historic Argo Mill Race starts here. [cite: 227, 272]</p>" />

        <circle class="highlight-point" cx="360" cy="420" r="8"
                data-type="landmark" data-title="Argo Canoe Livery"
                data-content="<p><strong>Argo Canoe Livery:</strong> City-operated boat rental facility on the western/southern bank of Argo Pond. [cite: 50, 751]</p>" />
        
        <circle class="highlight-point" cx="400" cy="300" r="8" 
                data-type="hazard" data-title="Argo Pond - General Use Area" 
                data-content="<p>Argo Pond is used for rowing, canoeing, and kayaking. [cite: 767, 750]</p><p>Be aware of other watercraft and follow standard navigation rules. Invasive aquatic vegetation can be present. [cite: 777]</p>" />

        <circle class="highlight-point" cx="320" cy="500" r="6" 
                data-type="landmark" data-title="Allen Creek Outlet (Near DTE)" 
                data-content="<p><strong>Allen Creek Outlet:</strong> Enters the Huron River just downstream of Argo Dam, near the DTE property. [cite: 50, 364]</p>" />

      </svg>

      <div class="map-infobox">
        <button class="map-infobox-close">&times;</button>
        <h4>Information</h4>
        <div class="infobox-content"></div>
      </div>
    </div>

    <div class="map-controls">
      <button class="map-control-btn active" data-filter="bridge">Bridges</button>
      <button class="map-control-btn active" data-filter="hazard">Hazards</button>
      <button class="map-control-btn active" data-filter="landmark">Landmarks</button>
      <button class="map-control-btn active" data-filter="traffic">Traffic Areas</button>
      <button class="map-control-btn" id="reset-map-filters">Reset All</button>
    </div>

    <div class="map-legend">
      <h4>Map Legend</h4>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #4caf50;"></div>
        <div class="legend-label">Downstream Traffic</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #f44336;"></div>
        <div class="legend-label">Upstream Traffic</div>
      </div>
       <div class="legend-item">
        <div class="legend-color" style="background-color: #AADAFF;"></div> <div class="legend-label">Mill Race</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #795548;"></div>
        <div class="legend-label">Bridge Information</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #e53935;"></div>
        <div class="legend-label">Hazard Information</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #2196F3;"></div>
        <div class="legend-label">Landmark Information</div>
      </div>
       <div class="legend-item">
        <div class="legend-color" style="background-color: #FFC107;"></div>
        <div class="legend-label">Traffic Area Note</div>
      </div>
    </div>
  </div>
</div>

  <!-- Basic Navigation Rules Section -->
  <div class="traffic-rules-section">
    <h2>Basic Navigation Rules</h2>
    
    <div class="traffic-pattern">
      <div class="traffic-direction upstream">
        <div class="traffic-direction-label">Upstream</div>
        <div class="traffic-boat upstream"></div>
        <div class="traffic-direction-label">North Shore</div>
      </div>
      <div class="traffic-direction downstream">
        <div class="traffic-direction-label">Downstream</div>
        <div class="traffic-boat downstream"></div>
        <div class="traffic-direction-label">South Shore</div>
      </div>
    </div>
    
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        The "Stay Right" Rule
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-directions"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Always Stay to the Right</h4>
              <p class="traffic-rule-description">The most important rule in rowing traffic is to <strong>stay to the right</strong> side of the waterway (relative to your direction of travel). This is similar to driving a car on the right side of the road.</p>
              
              <p><strong>Remember:</strong></p>
              <ul>
                <li>Always keep the nearest shoreline on your right side</li>
                <li>This creates predictable two-way traffic flow</li>
                <li>When in doubt, move further right</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Looking Around While Rowing
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-eye"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Maintain Visual Awareness</h4>
              <p class="traffic-rule-description">Since rowers sit facing backward, you must actively watch where you're going:</p>
              <ul>
                <li>Look over your shoulder every 3-5 strokes</li>
                <li>Alternate between looking left and right</li>
                <li>Check what's ahead of you regularly</li>
                <li>Be aware of other boats around you</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Procedures Section -->
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Passing Another Boat
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-forward"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Passing Protocol</h4>
              <p class="traffic-rule-description">When you need to pass a slower boat ahead of you:</p>
              <ol>
                <li>Check carefully that the passing lane is clear</li>
                <li>Call out "Passing on your port!" (their left side)</li>
                <li>Move to pass, giving ample room</li>
                <li>Return to the proper traffic pattern after passing</li>
                <li>Thank the other boat if appropriate</li>
              </ol>
              
              <div class="communication-box">
                <h4>Communication Example:</h4>
                <p><span class="communication-speaker">You:</span> <span class="communication-phrase">"Passing on your port!"</span></p>
                <p><span class="communication-speaker">Other Rower:</span> <span class="communication-response">"Heard you!"</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Being Passed
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-backward"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">When Being Overtaken</h4>
              <p class="traffic-rule-description">When another boat is overtaking you:</p>
              <ol>
                <li>Maintain your course and speed</li>
                <li>Stay to the right of the waterway</li>
                <li>Listen for verbal communication from the passing boat</li>
                <li>Acknowledge with "Heard you" or similar response</li>
                <li>Don't make sudden direction changes</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Approaching Oncoming Boats
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Meeting Head-On</h4>
              <p class="traffic-rule-description">When you see another boat coming toward you:</p>
              <ol>
                <li>Both boats stay to their right side</li>
                <li>Maintain clear visual contact</li>
                <li>If necessary, verbally confirm with "Passing port to port!"</li>
                <li>In narrow passages, the upstream boat typically has right-of-way</li>
                <li>Reduce speed if needed for safety</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bridge Navigation Section -->
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Bridge Navigation 
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-archway"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">General Bridge Rules</h4>
              <p class="traffic-rule-description">Bridges require special attention due to limited visibility and space:</p>
              <ul>
                <li>Approach bridges with caution at reduced speed</li>
                <li>Some bridges may have designated arches for traffic in specific directions</li>
                <li>Never stop under a bridge</li>
                <li>Be especially vigilant about looking ahead before entering a bridge</li>
                <li>Call out "Taking center arch!" (or appropriate arch) when approaching</li>
              </ul>
              
              <div class="communication-box">
                <h4>Communication Example:</h4>
                <p><span class="communication-speaker">You:</span> <span class="communication-phrase">"Taking center arch!"</span></p>
              </div>
            </div>
          </div>
          
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-map-signs"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Bridge-Specific Guidelines</h4>
              <p class="traffic-rule-description">Your club has established traffic patterns for each bridge on your waterway. Your coach will teach you these specific rules, which may include:</p>
              <ul>
                <li>Which arch to use for upstream vs. downstream traffic</li>
                <li>How to handle situations when multiple boats approach simultaneously</li>
                <li>Specific communication protocols near bridges</li>
                <li>Any areas where passing is not allowed near bridges</li>
              </ul>
              
              <p><strong>Click on the bridge markers in the map above for specific information about each bridge.</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- River Hazards Section -->
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        River Hazards
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Common Waterway Hazards</h4>
              <p class="traffic-rule-description">Be aware of and avoid these common waterway hazards:</p>
              
              <ul class="hazard-list">
                <li><strong>Debris:</strong> Tree branches, logs, trash, etc.</li>
                <li><strong>Shallow Areas:</strong> Know where the water depth changes</li>
                <li><strong>Wake:</strong> From power boats, which can destabilize rowing shells</li>
                <li><strong>Wind:</strong> Creates waves and affects steering</li>
                <li><strong>Buoys/Markers:</strong> Indicating specific areas or hazards</li>
                <li><strong>Other Watercraft:</strong> Especially powerboats, paddlers, kayakers</li>
                <li><strong>Narrow Passages:</strong> Where extra caution is required</li>
              </ul>
              
              <p><strong>Note:</strong> Hazards are marked in <span style="color: #e53935;">red</span> on the interactive map above.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Communication Section -->
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Communication on the Water
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-bullhorn"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Verbal Commands</h4>
              <p class="traffic-rule-description">Clear communication is essential for safety:</p>
              
              <ul class="command-list">
                <li><strong>"On your bow!"</strong> - Warning to a boat ahead that you're approaching</li>
                <li><strong>"Passing on port!"</strong> - Indicating you're passing on their left side</li>
                <li><strong>"Hold water!"</strong> - Emergency stop command</li>
                <li><strong>"Look ahead!"</strong> - Warning about obstacle or traffic ahead</li>
                <li><strong>"Way enough!"</strong> - Command to stop rowing</li>
              </ul>
              
              <div class="communication-box">
                <h4>Practice These Commands</h4>
                <p>Say them clearly and loudly so that they can be heard over the water.</p>
              </div>
            </div>
          </div>
          
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-hands"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Non-Verbal Communication</h4>
              <ul class="signal-list">
                <li><strong>Raised oar:</strong> Indicates a stopped or disabled boat</li>
                <li><strong>Pointing:</strong> Indicating direction or hazard</li>
                <li><strong>Whistle blasts:</strong> Often used by coaches or officials (one blast = attention, multiple = emergency)</li>
                <li><strong>Waving arms:</strong> Emergency signal for help</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Before You Leave the Dock Section -->
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Before You Leave the Dock
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-clipboard-check"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Pre-Row Checklist</h4>
              <p class="traffic-rule-description">Complete this mental checklist before each row:</p>
              
              <div class="interactive-checklist">
                <div class="checklist-item">
                  <input type="checkbox" id="check1" name="checklist">
                  <label for="check1">Know the traffic pattern for your waterway</label>
                </div>
                
                <div class="checklist-item">
                  <input type="checkbox" id="check2" name="checklist">
                  <label for="check2">Check weather conditions and visibility</label>
                </div>
                
                <div class="checklist-item">
                  <input type="checkbox" id="check3" name="checklist">
                  <label for="check3">Ensure all equipment is properly secured</label>
                </div>
                
                <div class="checklist-item">
                  <input type="checkbox" id="check4" name="checklist">
                  <label for="check4">Confirm your intended route and return time</label>
                </div>
                
                <div class="checklist-item">
                  <input type="checkbox" id="check5" name="checklist">
                  <label for="check5">Sign out in the logbook with your name, boat, and time</label>
                </div>
                
                <div class="checklist-item">
                  <input type="checkbox" id="check6" name="checklist">
                  <label for="check6">Verify safety equipment is accessible</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Special Situations Section -->
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Special Situations
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-low-vision"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Low Light Conditions</h4>
              <ul>
                <li>Wear high-visibility clothing</li>
                <li>Use proper lighting on your boat</li>
                <li>Exercise extra caution and reduced speed</li>
                <li>Look around more frequently</li>
                <li>Stay closer to shore</li>
              </ul>
            </div>
          </div>
          
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-traffic-light"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">High Traffic Areas</h4>
              <ul>
                <li>Reduce your speed</li>
                <li>Increase your awareness</li>
                <li>Communicate clearly and early</li>
                <li>Follow established traffic patterns precisely</li>
                <li>Be prepared to stop quickly if needed</li>
              </ul>
              
              <p><strong>Click on the "Traffic Areas" points in the map above to see specific high traffic locations.</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Emergency Protocols Section -->
    <div class="traffic-accordion">
      <button class="traffic-accordion-toggle" aria-expanded="false">
        Emergency Protocols
        <span class="toggle-icon">+</span>
      </button>
      <div class="traffic-accordion-content" aria-hidden="true">
        <div class="traffic-accordion-inner">
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-ambulance"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Water Emergency Response</h4>
              <p class="traffic-rule-description">If you encounter an emergency on the water:</p>
              
              <ol class="emergency-steps">
                <li><strong>Stay calm</strong> and assess the situation</li>
                <li><strong>Signal for help</strong> if needed (wave one arm, use whistle)</li>
                <li><strong>Move to safety</strong> if possible</li>
                <li><strong>Assist others</strong> only if it's safe to do so</li>
                <li><strong>Report incidents</strong> to coaches and club safety officers</li>
              </ol>
            </div>
          </div>
          
          <div class="traffic-rule-container">
            <div class="traffic-rule-icon">
              <i class="fas fa-phone-alt"></i>
            </div>
            <div class="traffic-rule-content">
              <h4 class="traffic-rule-title">Emergency Contacts</h4>
              <table>
                <tr>
                  <th>Emergency Service</th>
                  <th>Contact Number</th>
                  <th>Notes</th>
                </tr>
                <tr>
                  <td>Emergency Services</td>
                  <td>911</td>
                  <td>For all medical emergencies, fires, police</td>
                </tr>
                <tr>
                  <td>DNR Conservation Officers</td>
                  <td>RAP Hotline: 1-800-292-7800</td>
                  <td>For water-related emergencies on Michigan inland waters</td>
                </tr>
                <tr>
                  <td>Washtenaw County Sheriff's Marine Division</td>
                  <td>Non-emergency dispatch: (734) 994-2911</td>
                  <td>For water-related emergencies on the Huron River</td>
                </tr>
                <tr>
                  <td>Boathouse Manager</td>
                  <td>Russ Giacobbe, Director &amp; Boatman — contact via
                    <a href="mailto:info@a2crew.com">info@a2crew.com</a>
                  </td>
                  <td>For facility-related emergencies</td>
                </tr>
                <tr>
                  <td>Club Safety Officer</td>
                  <td>Jason Wenzlaff, Safety Committee Chair — 
                    <a href="mailto:safety@a2crew.org">safety@a2crew.org</a>
                  </td>
                  <td>For reporting and follow-up</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="traffic-accordion-controls">
      <button id="expand-all-traffic">Expand All Sections</button>
      <button id="collapse-all-traffic">Collapse All Sections</button>
    </div>
  </div>
</div>

<div class="summary-section">
  <h2>Key Takeaways</h2>
  <p>Following these river traffic rules will help ensure your safety and the safety of all waterway users. When in doubt, proceed with caution, stay aware of your surroundings, and remember that safety always takes precedence over training goals.</p>
  
  <h3>Next Steps:</h3>
  <div class="next-steps-buttons">
    <a href="essential-rules.html" class="next-step-button">Essential Safety Rules</a>
    <a href="self-rescue.html" class="next-step-button">Self-Rescue Guide</a>
    <a href="weather-guidelines.html" class="next-step-button">Weather Guidelines</a>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Add Font Awesome icons if not already loaded
    if (!document.getElementById('font-awesome-css')) {
      const link = document.createElement('link');
      link.id = 'font-awesome-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(link);
    }
  });
</script>
