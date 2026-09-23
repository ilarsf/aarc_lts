---
layout: coach
title: "Coach Portal - AARC Learn to Scull Program"
search_exclude: true
---

<link rel="stylesheet" href="{{ '/assets/css/coach-portal.css' | relative_url }}">

<div class="password-protected-content">
  <div id="password-gate" class="password-gate">
    <div class="info-box note">
      <h1>Coach Portal</h1>
      <p>This area contains coaching resources and materials that are only accessible to authorized coaches.</p>

      <form id="coach-access-form" class="password-form">
        <div class="form-group">
          <label for="coach-password">Enter Coach Password:</label>
          <input type="password" id="coach-password" class="form-control" autocomplete="current-password" aria-describedby="password-error">
        </div>
        <button id="submit-password" type="submit" class="cta-button">Access Coach Materials</button>
        <p id="password-error" class="error-message" role="alert" hidden></p>
      </form>
      <p>Need coach access? <a href="{{ site.baseurl }}/about/contact.html">Contact AARC</a> for help.</p>
    </div>
  </div>

  <div id="coach-content" class="coach-content" style="display: none;">
    <h1 tabindex="-1">Coach Materials</h1>

    <div class="info-box tip">
      <h3>Welcome, Coaches!</h3>
      <p>This section contains all the resources and materials you need to successfully lead the Learn to Scull program.</p>
    </div>

    {% include tabs.html %}

    <div class="tab-container">
      <div class="tab-nav">
        <button class="tab-link active" data-tab="session-plans">Session Plans</button>
        <button class="tab-link" data-tab="technical">Technical Coaching</button>
        <button class="tab-link" data-tab="management">Program Management</button>
        <button class="tab-link" data-tab="safety">Safety Leadership</button>
      </div>

      <!-- Session Plans Tab -->
      <div class="tab-content active" id="session-plans">
        <div class="tab-content-inner">
          <h2>Session Plans</h2>
          <p>Detailed guides and resources for each of the four Learn to Scull sessions.</p>
          
          <div class="cards-container">
            <div class="card-grid">
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-clipboard-list"></i>
                </div>
                <h3>Session 1</h3>
                <p>Introduction to sculling, safety procedures, and equipment orientation.</p>
                <a href="{{ site.baseurl }}/for-coaches/session-plans/session-1.html" class="cta-button">View Plan</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-water"></i>
                </div>
                <h3>Session 2</h3>
                <p>Basic stroke sequencing, recovery technique, and initial water drills.</p>
                <a href="{{ site.baseurl }}/for-coaches/session-plans/session-2.html" class="cta-button">View Plan</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-dumbbell"></i>
                </div>
                <h3>Session 3</h3>
                <p>Power application, navigation principles, and river traffic patterns.</p>
                <a href="{{ site.baseurl }}/for-coaches/session-plans/session-3.html" class="cta-button">View Plan</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-route"></i>
                </div>
                <h3>Session 4</h3>
                <p>Independent rowing, bridge passage, and preparation for solo sculling.</p>
                <a href="{{ site.baseurl }}/for-coaches/session-plans/session-4.html" class="cta-button">View Plan</a>
              </div>
            </div>
          </div>
          
          <div class="resource-card">
            <div class="card-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h3>Program Overview</h3>
            <p>Complete guide to the Learn to Scull program structure, goals, and teaching methodology.</p>
            <a href="{{ site.baseurl }}/for-coaches/session-plans/overview.html" class="cta-button">View Overview</a>
          </div>
        </div>
      </div>
      
      <!-- Technical Coaching Tab -->
      <div class="tab-content" id="technical">
        <div class="tab-content-inner">
          <h2>Technical Coaching Resources</h2>
          <p>Tools and frameworks to help you effectively teach sculling technique.</p>
          
          <div class="cards-container">
            <div class="card-grid">
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-comment-dots"></i>
                </div>
                <h3>Coaching Language</h3>
                <p>Effective cues and terminology for teaching sculling technique.</p>
                <a href="{{ site.baseurl }}/for-coaches/technical-coaching/coaching-language.html" class="cta-button">View Guide</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-tasks"></i>
                </div>
                <h3>Drills Library</h3>
                <p>Collection of effective sculling drills organized by skill level and focus area.</p>
                <a href="{{ site.baseurl }}/for-coaches/technical-coaching/drills-library.html" class="cta-button">View Drills</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Common Errors</h3>
                <p>How to identify and correct common beginner mistakes.</p>
                <a href="{{ site.baseurl }}/for-coaches/technical-coaching/common-issues.html" class="cta-button">View Guide</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-video"></i>
                </div>
                <h3>Video Analysis</h3>
                <p>Guidelines for using video feedback in your coaching.</p>
                <a href="{{ site.baseurl }}/for-coaches/technical-coaching/video-analysis.html" class="cta-button">View Guide</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Program Management Tab -->
      <div class="tab-content" id="management">
        <div class="tab-content-inner">
          <h2>Program Management</h2>
          <p>Administrative resources to help you run the program effectively.</p>
          
          <div class="cards-container">
            <div class="card-grid">
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <h3>Communication</h3>
                <p>Email templates and communication guidelines for participants.</p>
                <a href="{{ site.baseurl }}/for-coaches/program-management/communication.html" class="cta-button">View Resources</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-clipboard-check"></i>
                </div>
                <h3>Assessment Tools</h3>
                <p>Checklists and criteria for evaluating participant progress.</p>
                <a href="{{ site.baseurl }}/for-coaches/program-management/assessment-tools.html" class="cta-button">View Tools</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-user-graduate"></i>
                </div>
                <h3>Graduation Requirements</h3>
                <p>Standards and protocols for program completion and certification.</p>
                <a href="{{ site.baseurl }}/for-coaches/program-management/graduation.html" class="cta-button">View Guide</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Safety Leadership Tab -->
      <div class="tab-content" id="safety">
        <div class="tab-content-inner">
          <h2>Safety Leadership</h2>
          <p>Resources to ensure you can lead sessions safely and handle emergencies.</p>
          
          <div class="cards-container">
            <div class="card-grid">
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-procedures"></i>
                </div>
                <h3>Emergency Protocols</h3>
                <p>Step-by-step procedures for handling on-water emergencies.</p>
                <a href="{{ site.baseurl }}/for-coaches/safety-leadership/emergency-procedures.html" class="cta-button">View Procedures</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-cloud-sun-rain"></i>
                </div>
                <h3>Weather Guidelines</h3>
                <p>Decision matrices for weather-related rowing conditions.</p>
                <a href="{{ site.baseurl }}/open-sculling/safety/weather-guidelines.html" class="cta-button">View Guidelines</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Safety Protocols</h3>
                <p>Standard safety procedures and checklist for all sessions.</p>
                <a href="{{ site.baseurl }}/for-coaches/safety-leadership/safety-protocols.html" class="cta-button">View Protocols</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-first-aid"></i>
                </div>
                <h3>Daily Safety Checklist</h3>
                <p>Check weather, equipment, and emergency readiness before each session.</p>
                <a href="{{ site.baseurl }}/for-coaches/safety-leadership/daily-safety-checklist.html" class="cta-button">View Checklist</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const passwordGate = document.getElementById('password-gate');
    const coachContent = document.getElementById('coach-content');
    const passwordInput = document.getElementById('coach-password');
    const accessForm = document.getElementById('coach-access-form');
    const passwordError = document.getElementById('password-error');
    const correctPasswordHash = "{{ site.coach_password_hash }}"; // Ensure this is set in _config.yml

    function showError(message) {
        passwordError.textContent = message;
        passwordError.hidden = false;
        passwordInput.setAttribute('aria-invalid', 'true');
        passwordInput.focus();
    }

    function clearError() {
        passwordError.textContent = '';
        passwordError.hidden = true;
        passwordInput.removeAttribute('aria-invalid');
    }

    // Function to check password
    async function checkPassword() {
        const enteredPassword = passwordInput.value;
        if (!enteredPassword) {
            showError('Please enter a password.');
            return;
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(enteredPassword);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const enteredPasswordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            if (enteredPasswordHash === correctPasswordHash) {
                localStorage.setItem('aarc_coach_access', 'granted');
                passwordGate.style.display = 'none';
                coachContent.style.display = 'block';
                clearError();
                coachContent.querySelector('h1').focus();
            } else {
                showError('Incorrect password. Please try again.');
                localStorage.removeItem('aarc_coach_access');
            }
        } catch (error) {
            console.error("Password hashing error:", error);
            showError('Error verifying password. Please try again.');
        }
    }

    accessForm.addEventListener('submit', function(event) {
        event.preventDefault();
        checkPassword();
    });
    passwordInput.addEventListener('input', clearError);

    // Check if already authenticated from a previous session (via coach.html logic)
    if (localStorage.getItem('aarc_coach_access') === 'granted') {
        passwordGate.style.display = 'none';
        coachContent.style.display = 'block';
    } else {
        // If not authenticated, ensure password gate is shown and content is hidden
        passwordGate.style.display = 'block';
        coachContent.style.display = 'none';
    }
});
</script>
