---
layout: coach
title: "Coach Portal - AARC Learn to Scull Program"
search_exclude: true
---

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
        <p id="password-error" class="error-message"></p>
      </div>
    </div>
  </div>
  
  <div id="coach-content" class="coach-content" style="display: none;">
    <h1>Coach Portal</h1>
    
    <div class="info-box tip">
      <h3>Welcome, Coaches!</h3>
      <p>This section contains all the resources and materials you need to successfully lead the Learn to Scull program.</p>
    </div>
    
    <div class="two-col-grid">
      <div class="resource-card">
        <h3>Coach Manual</h3>
        <p>Comprehensive guide for conducting the Learn to Scull program.</p>
        <a href="{{ site.baseurl }}/coach_portal/manual/Coach_Manual.html" class="cta-button">View Manual</a>
      </div>
      
      <div class="resource-card">
        <h3>Session Plans</h3>
        <p>Detailed plans and guides for each training session.</p>
        <a href="{{ site.baseurl }}/coach_portal/session_plans/" class="cta-button">View Session Plans</a>
      </div>
      
      <div class="resource-card">
        <h3>Technical Resources</h3>
        <p>Drills, correction techniques, and teaching frameworks.</p>
        <a href="{{ site.baseurl }}/coach_portal/technical/" class="cta-button">View Technical Resources</a>
      </div>
      
      <div class="resource-card">
        <h3>Safety Procedures</h3>
        <p>Emergency protocols, weather guidelines, and safety documentation.</p>
        <a href="{{ site.baseurl }}/coach_portal/safety/" class="cta-button">View Safety Procedures</a>
      </div>
      
      <div class="resource-card">
        <h3>Assessment Tools</h3>
        <p>Skills checklists and participant evaluation resources.</p>
        <a href="{{ site.baseurl }}/coach_portal/assessment/Participant_Assessment_Checklist.html" class="cta-button">View Assessment Tools</a>
      </div>
      
      <div class="resource-card">
        <h3>Coach Textbook</h3>
        <p>Complete coaching reference materials in textbook format.</p>
        <a href="{{ site.baseurl }}/coach_portal/textbook/" class="cta-button">View Coach Textbook</a>
      </div>
      
      <div class="resource-card">
        <h3>Communication Resources</h3>
        <p>Email templates and participant information packages.</p>
        <a href="{{ site.baseurl }}/coach_portal/communication/" class="cta-button">View Communication Resources</a>
      </div>
    </div>
  </div>
</div>

<!-- Authentication is handled by the coach-auth.js script -->
<!-- No inline JavaScript needed as all functionality is moved to the external file -->

<style>
  .password-gate {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 0;
  }
  
  .password-form {
    margin-top: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-control {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .error-message {
    color: #dc3545;
    margin-top: 0.5rem;
  }
  
  .resource-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.2s ease;
  }
  
  .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .resource-card h3 {
    margin-top: 0;
    color: var(--theme-color);
  }
  
  .resource-card .cta-button {
    margin-top: 1rem;
    display: inline-block;
    min-width: 180px;
  }
  
  .coach-content {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
