---
layout: open-sculling
title: "Open Sculling Portal - AARC Learn to Scull Program"
search_exclude: true
---

<link rel="stylesheet" href="{{ '/assets/css/coach-portal.css' | relative_url }}"> <!-- Assuming similar styling needs -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
  crossorigin="anonymous" referrerpolicy="no-referrer" />

<div class="password-protected-content">
  <div id="password-gate" class="password-gate">
    <div class="info-box note">
      <h2>Open Sculling Portal</h2>
      <p>This area contains resources and materials for authorized open scullers.</p>

      <div class="password-form">
        <div class="form-group">
          <label for="open-sculling-password">Enter Access Password:</label>
          <input type="password" id="open-sculling-password" class="form-control" placeholder="Enter password">
        </div>
        <button id="submit-password" class="cta-button">Access Open Sculling Materials</button>
        <p id="password-error" class="error-message" style="display: none;"></p>
      </div>
    </div>
  </div>

  <div id="open-sculling-content" class="coach-content" style="display: none;"> <!-- Re-used class for structure, can be renamed -->
    <h1>Open Sculling Resources</h1>

    <div class="info-box tip">
      <h3>Welcome, Open Scullers!</h3>
      <p>This section provides resources relevant to open sculling activities.</p>
    </div>

    <!-- Content for open scullers will go here. This could include specific guidelines, sign-up links, etc. -->
    <p>Content to be added.</p>
    
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const passwordGate = document.getElementById('password-gate');
    const contentArea = document.getElementById('open-sculling-content'); // Changed ID
    const passwordInput = document.getElementById('open-sculling-password'); // Changed ID
    const submitButton = document.getElementById('submit-password');
    const passwordError = document.getElementById('password-error');
    const correctPasswordHash = "{{ site.open_sculling_password_hash }}"; // New config variable

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
                localStorage.setItem('aarc_open_sculling_access', 'granted'); // Changed localStorage key
                passwordGate.style.display = 'none';
                contentArea.style.display = 'block';
                passwordError.style.display = 'none';
                if (typeof initializeTabs === 'function') { // If you use tabs here
                    initializeTabs(); 
                }
            } else {
                passwordError.textContent = 'Incorrect password. Please try again.';
                passwordError.style.display = 'block';
                localStorage.removeItem('aarc_open_sculling_access'); // Changed localStorage key
            }
        } catch (error) {
            console.error("Password hashing error:", error);
            passwordError.textContent = 'Error verifying password. Please try again.';
            passwordError.style.display = 'block';
        }
    }

    if (submitButton) {
        submitButton.addEventListener('click', checkPassword);
    }

    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                checkPassword();
            }
        });
    }

    if (localStorage.getItem('aarc_open_sculling_access') === 'granted') { // Changed localStorage key
        passwordGate.style.display = 'none';
        contentArea.style.display = 'block';
        if (typeof initializeTabs === 'function') {
            initializeTabs();
        }
    } else {
        passwordGate.style.display = 'block';
        contentArea.style.display = 'none';
    }
});
</script>
