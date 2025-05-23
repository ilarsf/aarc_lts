---
layout: open-sculling
title: Weather Guidelines
description: Weather-related safety protocols for rowers
---

{% include head-custom.html %}
<link rel="stylesheet" href="{{ '/assets/css/weather-guidelines.css' | relative_url }}">
<script src="{{ '/assets/js/weather-guidelines.js' | relative_url }}" defer></script>

# Weather Guidelines for Rowers

Weather conditions directly impact rowing safety. This guide will help you understand when it's safe to row and when activities should be modified or canceled due to weather concerns.

<div class="weather-guidelines-container">
  <div class="weather-warning-box">
    <h4>Safety First</h4>
    <p>Always prioritize safety over training goals. When in doubt about conditions, err on the side of caution. During the Learn to Scull program, your coaches make all weather-related decisions.</p>
  </div>

  <!-- Weather Decision Matrix Table -->
  <div class="weather-matrix-container">
    <h2>Weather Decision Matrix</h2>
    
    <div class="weather-filter-tabs">
      <button class="weather-filter-tab active" data-condition="all">All Conditions</button>
      <button class="weather-filter-tab" data-condition="wind">Wind</button>
      <button class="weather-filter-tab" data-condition="temp">Temperature</button>
      <button class="weather-filter-tab" data-condition="visibility">Visibility</button>
      <button class="weather-filter-tab" data-condition="storm">Storms/Lightning</button>
    </div>
    
    <table class="weather-matrix">
      <thead>
        <tr>
          <th>Condition</th>
          <th>Novice Scullers</th>
          <th>Intermediate</th>
          <th>Advanced</th>
          <th>Required Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Wind Conditions -->
        <tr data-conditions="wind">
          <td><strong>Wind 0-7 mph (0-11 km/h)</strong><br>Calm or light breeze</td>
          <td class="safe">Safe</td>
          <td class="safe">Safe</td>
          <td class="safe">Safe</td>
          <td>Standard procedures</td>
        </tr>
        <tr data-conditions="wind">
          <td><strong>Wind 8-12 mph (12-19 km/h)</strong><br>Moderate breeze</td>
          <td class="caution">Caution</td>
          <td class="safe">Safe</td>
          <td class="safe">Safe</td>
          <td>Stay in sheltered water areas if possible</td>
        </tr>
        <tr data-conditions="wind">
          <td><strong>Wind 12-15 mph (19-24 km/h)</strong><br>Fresh breeze, whitecaps</td>
          <td class="warning">Not Advised</td>
          <td class="caution">Caution</td>
          <td class="safe">Safe</td>
          <td>No novice singles, stay near shore</td>
        </tr>
        <tr data-conditions="wind">
          <td><strong>Wind 15-20 mph (24-32 km/h)</strong><br>Strong breeze, moderate waves</td>
          <td class="no-go">No Rowing</td>
          <td class="warning">Not Advised</td>
          <td class="caution">Larger Boats Only</td>
          <td>No singles/doubles for any rower</td>
        </tr>
        <tr data-conditions="wind">
          <td><strong>Wind 20+ mph (32+ km/h)</strong><br>Near gale, rough water</td>
          <td class="no-go">No Rowing</td>
          <td class="no-go">No Rowing</td>
          <td class="no-go">No Rowing</td>
          <td>All rowing activities suspended</td>
        </tr>
        
        <!-- Temperature Conditions -->
        <tr data-conditions="temp">
          <td><strong>Water < 40°F (< 4°C)</strong><br>Red Zone</td>
          <td class="no-go">No Singles/Doubles</td>
          <td class="warning">Multi-Person Only</td>
          <td class="warning">Multi-Person Only</td>
          <td>Coach accompaniment required, cold gear needed</td>
        </tr>
        <tr data-conditions="temp">
          <td><strong>Water 40-50°F (4-10°C)</strong><br>Yellow Zone</td>
          <td class="warning">No Singles</td>
          <td class="caution">No Singles</td>
          <td class="caution">Experienced Only</td>
          <td>Four-oar rule, cold gear required</td>
        </tr>
        <tr data-conditions="temp">
          <td><strong>Water > 50°F (> 10°C)</strong><br>Green Zone</td>
          <td class="caution">Standard</td>
          <td class="safe">Standard</td>
          <td class="safe">Standard</td>
          <td>Normal operations when other conditions permit</td>
        </tr>
        <tr data-conditions="temp">
          <td><strong>Heat Index 80-90°F (27-32°C)</strong></td>
          <td class="caution">Caution</td>
          <td class="caution">Caution</td>
          <td class="caution">Caution</td>
          <td>Hydration essential, monitor for heat stress</td>
        </tr>
        <tr data-conditions="temp">
          <td><strong>Heat Index > 90°F (> 32°C)</strong></td>
          <td class="warning">Modified Practice</td>
          <td class="warning">Modified Practice</td>
          <td class="caution">Modified Practice</td>
          <td>Reduce duration, early/late rowing only</td>
        </tr>
        
        <!-- Visibility Conditions -->
        <tr data-conditions="visibility">
          <td><strong>Visibility > 500 yd (approx. > 457 m)</strong><br>Clear conditions</td>
          <td class="safe">Safe</td>
          <td class="safe">Safe</td>
          <td class="safe">Safe</td>
          <td>Standard procedures</td>
        </tr>
        <tr data-conditions="visibility">
          <td><strong>Visibility 100-500 yd (approx. 91-457 m)</strong><br>Light fog</td>
          <td class="warning">Not Advised</td>
          <td class="caution">Caution</td>
          <td class="caution">Caution</td>
          <td>Stay near shore, use lights, reduce speed</td>
        </tr>
        <tr data-conditions="visibility">
          <td><strong>Visibility < 100 yd (approx. < 91 m)</strong><br>Heavy fog</td>
          <td class="no-go">No Rowing</td>
          <td class="no-go">No Rowing</td>
          <td class="no-go">No Rowing</td>
          <td>All rowing activities suspended</td>
        </tr>
        
        <!-- Storm Conditions -->
        <tr data-conditions="storm">
          <td><strong>Lightning/Thunder</strong><br>Any distance</td>
          <td class="no-go">No Rowing</td>
          <td class="no-go">No Rowing</td>
          <td class="no-go">No Rowing</td>
          <td>Exit water immediately, wait 30min after last strike</td>
        </tr>
        <tr data-conditions="storm">
          <td><strong>Approaching Storm</strong><br>Dark clouds, increasing winds</td>
          <td class="warning">Return to Dock</td>
          <td class="warning">Return to Dock</td>
          <td class="caution">Monitor & Prepare</td>
          <td>Check radar, prepare to exit water quickly</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <h2>Weather Conditions That Affect Rowing</h2>
  
  <div class="weather-accordion-controls">
    <button id="expand-all-weather">Expand All Sections</button>
    <button id="collapse-all-weather">Collapse All Sections</button>
  </div>

  <!-- Lightning and Thunderstorms Section -->
  <div class="weather-accordion">
    <button class="weather-accordion-header" aria-expanded="false">
      <div class="weather-accordion-toggle">
        <div class="weather-accordion-title">
          <div class="weather-icon"><i class="fas fa-bolt"></i></div>
          Lightning and Thunderstorms
          <span class="status-indicator status-red">Highest Risk</span>
        </div>
        <span class="toggle-icon">↓</span>
      </div>
    </button>
    <div class="weather-accordion-content" aria-hidden="true">
      <div class="weather-accordion-body">
        <div class="two-col-grid">
          <div>
            <h4>The 30/30 Rule:</h4>
            <ul>
              <li>If you see lightning and hear thunder within 30 seconds, lightning is close enough to be dangerous</li>
              <li>Wait a minimum of 30 minutes after the last lightning sighting or thunder before returning to the water</li>
              <li>Reset the 30-minute clock with each new lightning strike or thunder</li>
            </ul>
            {% include icon.html icon="fas fa-bolt" type="safety" feature=true alt="Lightning warning" %}
          </div>
          
          <div>
            <h4>Immediate Action:</h4>
            <ul>
              <li>Get off the water immediately if lightning is seen or thunder heard</li>
              <li>Secure boats and seek proper shelter (not under trees)</li>
              <li>Indoor spaces or enclosed vehicles provide the best protection</li>
              <li>Monitor conditions via weather apps before considering a return</li>
            </ul>
          </div>
        </div>
        
        <div class="weather-warning-box">
          <h4>Lightning = Immediate Exit</h4>
          <p>Lightning is the most dangerous weather condition for rowers. There is NO minimum safe distance on open water. If you see lightning or hear thunder, immediately head to shore by the most direct route.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Wind Conditions Section -->
  <div class="weather-accordion">
    <button class="weather-accordion-header" aria-expanded="false">
      <div class="weather-accordion-toggle">
        <div class="weather-accordion-title">
          <div class="weather-icon"><i class="fas fa-wind"></i></div>
          Wind Conditions
          <span class="status-indicator status-yellow">Variable Risk</span>
        </div>
        <span class="toggle-icon">↓</span>
      </div>
    </button>
    <div class="weather-accordion-content" aria-hidden="true">
      <div class="weather-accordion-body">
        <div class="two-col-grid">
          <div>
            <h4>Wind Speed Guidelines:</h4>
            <ul>
              <li><strong>0-7 mph (0-11 km/h):</strong> Generally safe for all boats</li>
              <li><strong>8-12 mph (12-19 km/h):</strong> Caution for beginners in singles</li>
              <li><strong>12-15 mph (19-24 km/h):</strong> Experienced singles only, no beginner singles</li>
              <li><strong>15-20 mph (24-32 km/h):</strong> No small boats (singles/doubles) recommended</li>
              <li><strong>20+ mph (32+ km/h):</strong> No rowing recommended</li>
            </ul>
          </div>
          
          <div>
            <h4>Wind Warning Signs:</h4>
            <ul>
              <li>Whitecaps on the water surface</li>
              <li>Flags extended and flapping</li>
              <li>Tree branches moving noticeably</li>
              <li>Difficulty maintaining boat set and direction</li>
              <li>Waves forming that could swamp a shell</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fog and Visibility Section -->
  <div class="weather-accordion">
    <button class="weather-accordion-header" aria-expanded="false">
      <div class="weather-accordion-toggle">
        <div class="weather-accordion-title">
          <div class="weather-icon"><i class="fas fa-smog"></i></div>
          Fog and Visibility Issues
          <span class="status-indicator status-yellow">Safety Concern</span>
        </div>
        <span class="toggle-icon">↓</span>
      </div>
    </button>
    <div class="weather-accordion-content" aria-hidden="true">
      <div class="weather-accordion-body">
        <p class="minimum-requirement">Minimum visibility requirement: <strong>100 yd (approx. 91 m) in all directions</strong></p>
        
        <div class="two-col-grid">
          <div>
            <h4>Safety Measures:</h4>
            <ul>
              <li>Must maintain visual contact with shoreline at all times</li>
              <li>In dawn/dusk conditions, boats must have proper lighting</li>
              <li>If visibility drops during rowing, immediately head toward shore</li>
              <li>Use sound signals (voice or whistle) in limited visibility</li>
            </ul>
          </div>
          
          <div>
            <h4>Judgment Test:</h4>
            <ul>
              <li>If you can't see the opposite shore or landmarks clearly</li>
              <li>If you can't see approaching boats from at least 100 yd (approx. 91 m) away</li>
              <li>If you can't see underwater obstacles</li>
              <li>If other rowers appear and disappear from view</li>
              <li>→ Conditions are too foggy for safe rowing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Temperature Considerations Section -->
  <div class="weather-accordion">
    <button class="weather-accordion-header" aria-expanded="false">
      <div class="weather-accordion-toggle">
        <div class="weather-accordion-title">
          <div class="weather-icon"><i class="fas fa-thermometer-half"></i></div>
          Cold Weather Protocol
          <span class="status-indicator status-yellow">Safety Critical</span>
        </div>
        <span class="toggle-icon">↓</span>
      </div>
    </button>
    <div class="weather-accordion-content" aria-hidden="true">
      <div class="weather-accordion-body">
        <div class="temp-zones">
          <div class="temp-zone-card zone-red">
            <h4>Cold Zone (Red)</h4>
            <p>High risk, severely restricted rowing</p>
            <ul>
              <li>Water temp &lt; 40°F (&lt; 4°C)</li>
              <li>Combined air/water temp &lt; 90°F (Air °C + Water °C &lt; 15°C)</li>
            </ul>
            <p><strong>Restrictions:</strong> Only stable, multi-person boats with coach accompaniment</p>
          </div>
          
          <div class="temp-zone-card zone-yellow">
            <h4>Caution Zone (Yellow)</h4>
            <p>Modified rowing permitted</p>
            <ul>
              <li>Water temp 40-50°F (4-10°C)</li>
              <li>Combined air/water temp 90-100°F (15°C ≤ Air °C + Water °C ≤ 20°C)</li>
            </ul>
            <p><strong>Restrictions:</strong> Eight-person shells and doubles with four-oar rule</p>
          </div>
          
          <div class="temp-zone-card zone-green">
            <h4>Normal Zone (Green)</h4>
            <p>Standard operations</p>
            <ul>
              <li>Water temp &gt; 50°F (&gt; 10°C)</li>
              <li>Combined air/water temp &gt; 100°F (Air °C + Water °C &gt; 20°C)</li>
            </ul>
            <p><strong>Restrictions:</strong> All boat types permitted when conditions are safe</p>
          </div>
        </div>
        
        <div class="weather-info-box">
          <h4>Additional Cold Weather Rules</h4>
          <ul>
            <li>Singles (1X) require water temperature ≥50°F (≥10°C) AND combined air/water temperature ≥100°F (Air °C + Water °C ≥ 20°C)</li>
            <li>Doubles (2X) require water temperature ≥40°F (≥4°C) AND combined air/water temperature ≥90°F (Air °C + Water °C ≥ 15°C)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Heat Guidelines Section -->
  <div class="weather-accordion">
    <button class="weather-accordion-header" aria-expanded="false">
      <div class="weather-accordion-toggle">
        <div class="weather-accordion-title">
          <div class="weather-icon"><i class="fas fa-temperature-high"></i></div>
          Heat-Related Guidelines
          <span class="status-indicator status-yellow">Health Risk</span>
        </div>
        <span class="toggle-icon">↓</span>
      </div>
    </button>
    <div class="weather-accordion-content" aria-hidden="true">
      <div class="weather-accordion-body">
        <div class="two-col-grid">
          <div>
            <h4>Heat Index Guidelines:</h4>
            <ul>
              <li><strong>&lt;80°F (&lt;27°C):</strong> Generally safe for full practice</li>
              <li><strong>80-90°F (27-32°C):</strong> Use caution and monitor for signs of heat stress</li>
              <li><strong>90-105°F (32-41°C):</strong> High risk – expect modified practice (reduced duration/intensity)</li>
              <li><strong>&gt;105°F (&gt;41°C):</strong> Extreme risk – practice may be moved indoors</li>
            </ul>
          </div>
          
          <div>
            <h4>Heat Protection:</h4>
            <ul>
              <li>Hydrate well before, during, and after rowing</li>
              <li>Wear appropriate clothing and sun protection</li>
              <li>Be aware of signs of heat illness: dizziness, nausea, headache</li>
              <li>Take breaks in shade when possible</li>
            </ul>
          </div>
        </div>
        
        <div class="weather-info-box">
          <h4>Heat Illness Warning Signs</h4>
          <p>Stop exercise immediately and seek shade/cooling if you experience:</p>
          <ul>
            <li>Dizziness or lightheadedness</li>
            <li>Nausea or vomiting</li>
            <li>Headache that intensifies with continued activity</li>
            <li>Confusion or disorientation</li>
            <li>Cessation of sweating</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Weather Resources Section -->
  <h2>Weather Resources</h2>
  
  <div class="weather-resources">
    <div class="resource-card">
      <h3>Weather.gov</h3>
      <p>National Weather Service with official forecasts and warnings.</p>
      <a href="https://www.weather.gov" class="resource-link" target="_blank">Visit Site</a>
    </div>
    
    <div class="resource-card">
      <h3>Windfinder</h3>
      <p>Specialized wind forecasts ideal for water sports.</p>
      <a href="https://www.windfinder.com" class="resource-link" target="_blank">Visit Site</a>
    </div>
    
    <div class="resource-card">
      <h3>Real Time Lightning Map</h3>
      <p>See lightning strikes in real time across the planet. Free access to maps of former thunderstorms. By Blitzortung.org and contributors.</p>
      <a href="https://www.lightningmaps.org" class="resource-link" target="_blank">Visit Site</a>
    </div>
    
    <div class="resource-card">
      <h3>WeatherBug</h3>
      <p>Local and National Weather Forecasts, Radar & News.</p>
      <a href="https://www.weatherbug.com" class="resource-link" target="_blank">Visit Site</a>
    </div>
  </div>
  
  <div class="weather-info-box">
    <h4>Key Forecasts to Check</h4>
    <ul>
      <li>Hourly forecast for your rowing time</li>
      <li>Wind speed and direction</li>
      <li>Precipitation probability and timing</li>
      <li>Lightning/thunderstorm risk</li>
      <li>Temperature and humidity</li>
    </ul>
  </div>

  <!-- Decision Making Section -->
  <div class="weather-accordion">
    <button class="weather-accordion-header" aria-expanded="true">
      <div class="weather-accordion-toggle">
        <div class="weather-accordion-title">
          <div class="weather-icon"><i class="fas fa-clipboard-check"></i></div>
          Decision-Making Protocol
        </div>
        <span class="toggle-icon">↓</span>
      </div>
    </button>
    <div class="weather-accordion-content" aria-hidden="false">
      <div class="weather-accordion-body">
        <h3>During Learn to Scull</h3>
        <p>During the Learn to Scull program, weather decisions are made by:</p>
        <ol>
          <li>The Program Director</li>
          <li>The Lead Coach</li>
          <li>Individual Session Coaches</li>
        </ol>
        
        <p>You'll be notified of cancellations or modifications via email or text message. Check your communications before heading to practice if weather looks questionable.</p>
        
        <h3>For Independent Rowers</h3>
        <p>Once you've graduated from Learn to Scull and row independently, use this decision-making framework:</p>
        
        <div class="decision-framework">
          <div class="decision-step">
            <h4>1. Gather Information</h4>
            <ul>
              <li>Check multiple weather sources</li>
              <li>Observe actual conditions at the boathouse</li>
              <li>Consult with other experienced rowers</li>
            </ul>
          </div>
          
          <div class="decision-step">
            <h4>2. Assess Risk Factors</h4>
            <ul>
              <li>Your experience level</li>
              <li>Boat type and stability</li>
              <li>Water and air temperature</li>
              <li>Wind speed and direction</li>
              <li>Visibility conditions</li>
              <li>Presence of others on the water</li>
            </ul>
          </div>
          
          <div class="decision-step">
            <h4>3. Make a Conservative Decision</h4>
            <ul>
              <li>When in doubt, don't go out</li>
              <li>Consider alternative workouts</li>
              <li>Modify your planned route to stay near shore</li>
              <li>Reduce your planned distance or intensity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Emergency Response Section -->
  <div class="weather-accordion">
    <button class="weather-accordion-header" aria-expanded="false">
      <div class="weather-accordion-toggle">
        <div class="weather-accordion-title">
          <div class="weather-icon"><i class="fas fa-exclamation-triangle"></i></div>
          Emergency Weather Response
          <span class="status-indicator status-red">Critical</span>
        </div>
        <span class="toggle-icon">↓</span>
      </div>
    </button>
    <div class="weather-accordion-content" aria-hidden="true">
      <div class="weather-accordion-body">
        <p>If weather conditions deteriorate while you're on the water:</p>
        
        <ol class="emergency-steps">
          <li><strong>Remain calm</strong> and alert other rowers if possible</li>
          <li><strong>Head toward the nearest safe shoreline</strong> - not necessarily the boathouse</li>
          <li><strong>Use efficient, stable rowing technique</strong> - focus on boat control, not speed</li>
          <li><strong>In thunder/lightning:</strong> Get off the water at the nearest possible point</li>
          <li><strong>In high winds:</strong> Stay low in the boat, focus on stability over speed</li>
          <li><strong>In fog:</strong> Use sound signals, proceed slowly, maintain shoreline visual contact</li>
        </ol>
        
        <div class="weather-warning-box">
          <h4>Safety Priority</h4>
          <p>Remember that no rowing session is worth risking your safety. Weather conditions can change rapidly, so always be prepared to modify your plans or exit the water if conditions deteriorate.</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="next-steps">
    <h3>Next Steps:</h3>
    <div class="next-steps-buttons">
      <a href="essential-rules.html" class="next-step-button">Essential Safety Rules</a>
      <a href="river-traffic.html" class="next-step-button">River Traffic Guide</a>
      <a href="self-rescue.html" class="next-step-button">Self-Rescue Procedures</a>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Remove Font Awesome loading script as it's now included in head-custom.html
  });
</script>

<!-- Helper component for icon fallbacks -->
<div class="icon-helper" style="display:none">
  <div id="weather-icon-template" class="icon-fallback weather-icon">
    <i class="fas fa-cloud-sun"></i>
  </div>
  <div id="safety-icon-template" class="icon-fallback safety-icon">
    <i class="fas fa-shield-alt"></i>
  </div>
  <div id="info-icon-template" class="icon-fallback info-icon">
    <i class="fas fa-info-circle"></i>
  </div>
</div>
