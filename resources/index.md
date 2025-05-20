---
layout: default
title: Resources Hub - AARC Learn to Scull Program
---

# Resources Hub

Welcome to your centralized resource hub for the Learn to Scull program! Here you'll find quick access to all supplementary materials including club policies, quick-reference guides, and knowledge assessment tools.

<div class="resource-categories">
  <div class="resource-category">
    <h3><i class="fas fa-landmark"></i> Club Policies</h3>
    <p>Official AARC policies, procedures, and guidelines that govern our rowing community.</p>
    <ul class="resource-links">
      <li><a href="{{ site.baseurl }}/resources/club-policies/code-of-conduct.html">Code of Conduct</a> - Standards of behavior expected of all members</li>
      <li><a href="{{ site.baseurl }}/resources/club-policies/safety-rules.html">Safety Rules</a> - Essential safety guidelines for all rowers</li>
      <li><a href="{{ site.baseurl }}/resources/club-policies/boathouse-rules.html">Boathouse Rules</a> - Facility usage and equipment care</li>
    </ul>
    <a href="{{ site.baseurl }}/resources/club-policies/" class="cta-button">Browse All Policies</a>
  </div>

  <div class="resource-category">
    <h3><i class="fas fa-file-alt"></i> Quick Reference</h3>
    <p>Handy guides and references for common rowing situations and needs.</p>
    <ul class="resource-links">
      <li><a href="{{ site.baseurl }}/resources/quick-reference/equipment-care.html">Equipment Care</a> - How to properly handle and maintain boats and oars</li>
      <li><a href="{{ site.baseurl }}/resources/quick-reference/blister-treatment.html">Blister Treatment</a> - Prevention and care for rower's hands</li>
      <li><a href="{{ site.baseurl }}/resources/quick-reference/weather-reference.html">Weather Reference</a> - Guidelines for rowing in different conditions</li>
    </ul>
    <a href="{{ site.baseurl }}/resources/quick-reference/" class="cta-button">Browse Quick Guides</a>
  </div>

  <div class="resource-category">
    <h3><i class="fas fa-graduation-cap"></i> Knowledge Assessment</h3>
    <p>Tools to test and reinforce your rowing knowledge.</p>
    <ul class="resource-links">
      <li><a href="{{ site.baseurl }}/resources/knowledge-assessment/quizzes.html">Interactive Quizzes</a> - Test your understanding of key concepts</li>
      <li><a href="{{ site.baseurl }}/resources/knowledge-assessment/self-assessment.html">Self-Assessment Checklists</a> - Track your skill progression</li>
    </ul>
    <a href="{{ site.baseurl }}/resources/knowledge-assessment/" class="cta-button">Access Assessment Tools</a>
  </div>
</div>

<div class="program-navigation">
  <div class="nav-card">
    <div class="nav-icon"><i class="fas fa-user-graduate"></i></div>
    <h3>For Learners</h3>
    <p>Access learning materials, technique guides, and session-specific content designed for program participants.</p>
    <a href="{{ site.baseurl }}/for-learners/" class="cta-button">Go to Learner Hub</a>
  </div>
  
  <div class="nav-card">
    <div class="nav-icon"><i class="fas fa-chalkboard-teacher"></i></div>
    <h3>For Coaches</h3>
    <p>Access teaching resources, session plans, and program management tools designed for instructors.</p>
    <a href="{{ site.baseurl }}/for-coaches/" class="cta-button">Go to Coach Portal</a>
  </div>
  
  <div class="nav-card">
    <div class="nav-icon"><i class="fas fa-book"></i></div>
    <h3>Textbook Format</h3>
    <p>Access the complete Learn to Scull materials in traditional textbook format.</p>
    <a href="{{ site.baseurl }}/textbook/" class="cta-button">View Textbook</a>
  </div>
</div>

<div class="info-box tip">
  <h4>Need Help Finding Something?</h4>
  <p>Use the site search function to quickly locate specific topics or resources. If you still can't find what you're looking for, please <a href="{{ site.baseurl }}/about/contact">contact us</a> for assistance.</p>
</div>

<style>
.resource-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.resource-category {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.resource-category h3 {
  margin-top: 0;
  border-bottom: 2px solid var(--theme-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.resource-links {
  margin-bottom: 1.5rem;
}

.program-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.nav-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  text-align: center;
}

.nav-icon {
  font-size: 2.5rem;
  color: var(--theme-color);
  margin-bottom: 1rem;
}

.cta-button {
  display: inline-block;
  background-color: var(--theme-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: var(--theme-color-dark);
  text-decoration: none;
  color: white;
}
</style>
