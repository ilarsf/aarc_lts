---
layout: open-sculling
title: "Open Sculling Portal - AARC Learn to Scull Program"
search_exclude: true
---

<link rel="stylesheet" href="{{ '/assets/css/coach-portal.css' | relative_url }}"> <!-- Assuming similar styling needs -->

<div class="password-protected-content">
  <div id="password-gate" class="password-gate">
    <div class="info-box note">
      <h1>Open Sculling Portal</h1>
      <p>This area contains resources and materials for authorized open scullers.</p>

      <form id="open-sculling-access-form" class="password-form">
        <div class="form-group">
          <label for="open-sculling-password">Enter Access Password:</label>
          <input type="password" id="open-sculling-password" class="form-control" autocomplete="current-password" aria-describedby="password-error">
        </div>
        <button id="submit-password" type="submit" class="cta-button">Access Open Sculling Materials</button>
        <p id="password-error" class="error-message" role="alert" hidden></p>
      </form>
      <p>Need Open Sculling access? <a href="{{ site.baseurl }}/about/contact.html">Contact AARC</a> for help.</p>
    </div>
  </div>

  <div id="open-sculling-content" class="coach-content" style="display: none;">
    <h1 tabindex="-1">Open Sculling Resources</h1>
    <p>Choose what you need for your next row. Check the AARC member site for current practice details; use the guides here for safety and technique reference.</p>

    <div class="card-grid">
      <a class="card" href="https://aarc.clubexpress.com/">
        <div class="card-content">
          <h2>AARC member site</h2>
          <p>Log in for current club schedules, rowing requests, and announcements.</p>
        </div>
      </a>
      <a class="card" href="{{ site.baseurl }}/open-sculling/safety/weather-guidelines.html">
        <div class="card-content">
          <h2>Check the weather</h2>
          <p>Review the weather decision guide before planning a row.</p>
        </div>
      </a>
      <a class="card" href="{{ site.baseurl }}/open-sculling/safety/river-traffic.html">
        <div class="card-content">
          <h2>Review river traffic</h2>
          <p>Refresh traffic patterns, right of way, and river navigation.</p>
        </div>
      </a>
      <a class="card" href="{{ site.baseurl }}/open-sculling/technique/steering.html">
        <div class="card-content">
          <h2>Improve steering</h2>
          <p>Practice boat control and a safer approach to turns.</p>
        </div>
      </a>
    </div>

    <h2>Browse all guides</h2>
    <ul>
      <li><a href="{{ '/open-sculling/resources/' | relative_url }}">Equipment, assessment, and other resources</a></li>
      <li><a href="{{ '/open-sculling/safety/' | relative_url }}">Safety guides</a></li>
      <li><a href="{{ '/open-sculling/technique/' | relative_url }}">Technique guides</a></li>
    </ul>
    
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const passwordGate = document.getElementById('password-gate');
    const contentArea = document.getElementById('open-sculling-content'); // Changed ID
    const passwordInput = document.getElementById('open-sculling-password'); // Changed ID
    const accessForm = document.getElementById('open-sculling-access-form');
    const passwordError = document.getElementById('password-error');
    const correctPasswordHash = "{{ site.open_sculling_password_hash }}"; // New config variable

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
                localStorage.setItem('aarc_open_sculling_access', 'granted'); // Changed localStorage key
                passwordGate.style.display = 'none';
                contentArea.style.display = 'block';
                clearError();
                contentArea.querySelector('h1').focus();
            } else {
                showError('Incorrect password. Please try again.');
                localStorage.removeItem('aarc_open_sculling_access'); // Changed localStorage key
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

    if (localStorage.getItem('aarc_open_sculling_access') === 'granted') { // Changed localStorage key
        passwordGate.style.display = 'none';
        contentArea.style.display = 'block';
    } else {
        passwordGate.style.display = 'block';
        contentArea.style.display = 'none';
    }
});
</script>
