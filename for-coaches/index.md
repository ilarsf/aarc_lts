---
layout: coach
title: "Coach Portal - AARC Learn to Scull Program"
search_exclude: true
---

<link rel="stylesheet" href="{{ '/assets/css/coach-portal.css' | relative_url }}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
  crossorigin="anonymous" referrerpolicy="no-referrer" />

<div class="password-protected-content">
  <div id="password-gate" class="password-gate">
    <div class="info-box note">
      <h2>Coach Portal</h2>
      <p>This area contains coaching resources and materials that are only accessible to authorized coaches.</p>

      <div class="password-form">
        <div class="form-group">
          <label for="coach-password">Enter Coach Password:</label>
          <input type="password" id="coach-password" class="form-control" placeholder="Enter password">
        </div>
        <button id="submit-password" class="cta-button">Access Coach Materials</button>
        <p id="password-error" class="error-message" style="display: none;"></p>
      </div>
    </div>
  </div>

  <div id="coach-content" class="coach-content" style="display: none;">
    <h1>Coach Portal</h1>

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
                <a href="{{ site.baseurl }}/for-coaches/technical-coaching/drills.html" class="cta-button">View Drills</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Common Errors</h3>
                <p>How to identify and correct common beginner mistakes.</p>
                <a href="{{ site.baseurl }}/for-coaches/technical-coaching/common-errors.html" class="cta-button">View Guide</a>
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
                <a href="{{ site.baseurl }}/for-coaches/program-management/assessment.html" class="cta-button">View Tools</a>
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
                <a href="{{ site.baseurl }}/for-coaches/safety-leadership/emergency-protocols.html" class="cta-button">View Protocols</a>
              </div>
              
              <div class="resource-card">
                <div class="card-icon">
                  <i class="fas fa-cloud-sun-rain"></i>
                </div>
                <h3>Weather Guidelines</h3>
                <p>Decision matrices for weather-related rowing conditions.</p>
                <a href="{{ site.baseurl }}/for-coaches/safety-leadership/weather-guidelines.html" class="cta-button">View Guidelines</a>
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
                <h3>First Aid</h3>
                <p>Basic first aid guidelines for common rowing-related injuries.</p>
                <a href="{{ site.baseurl }}/for-coaches/safety-leadership/first-aid.html" class="cta-button">View Guide</a>
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
    const submitButton = document.getElementById('submit-password');
    const passwordError = document.getElementById('password-error');
    const correctPasswordHash = "{{ site.coach_password_hash }}"; // Ensure this is set in _config.yml

    // Function to check password
    async function checkPassword() {
        const enteredPassword = passwordInput.value;
        if (!enteredPassword) {
            passwordError.textContent = 'Please enter a password.';
            passwordError.style.display = 'block';
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
                passwordError.style.display = 'none';
                if (typeof initializeTabs === 'function') {
                    initializeTabs(); // Initialize tabs after content is shown
                }
            } else {
                passwordError.textContent = 'Incorrect password. Please try again.';
                passwordError.style.display = 'block';
                localStorage.removeItem('aarc_coach_access');
            }
        } catch (error) {
            console.error("Password hashing error:", error);
            passwordError.textContent = 'Error verifying password. Please try again.';
            passwordError.style.display = 'block';
        }
    }

    // Event listener for submit button
    if (submitButton) {
        submitButton.addEventListener('click', checkPassword);
    }

    // Event listener for Enter key in password field
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if it were a real form
                checkPassword();
            }
        });
    }

    // Check if already authenticated from a previous session (via coach.html logic)
    if (localStorage.getItem('aarc_coach_access') === 'granted') {
        passwordGate.style.display = 'none';
        coachContent.style.display = 'block';
        if (typeof initializeTabs === 'function') {
            initializeTabs();
        }
    } else {
        // If not authenticated, ensure password gate is shown and content is hidden
        passwordGate.style.display = 'block';
        coachContent.style.display = 'none';
    }
});
</script>
