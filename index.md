---
layout: default
title: AARC Learn to Scull Program
---

<section class="program-section">
  <div class="section-header">
    <h2>Program Highlights</h2>
  </div>

  <div class="highlights-grid">
    <a href="{{ site.baseurl }}/for-learners/getting-started/program-overview.html" class="highlight-card-link">
      <div class="highlight-card">
        <div class="highlight-icon">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <h3>Program Format</h3>
        <p>Four 3-hour sessions over two weekends with small groups and personalized coaching.</p>
      </div>
    </a>
    
    <a href="{{ site.baseurl }}/for-learners/#learning-journey" class="highlight-card-link">
      <div class="highlight-card">
        <div class="highlight-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <h3>Progressive Learning</h3>
        <p>Structured approach from first strokes to independent rowing with confidence.</p>
      </div>
    </a>
    
    <a href="{{ site.baseurl }}/for-learners/#safety" class="highlight-card-link">
      <div class="highlight-card">
        <div class="highlight-icon">
          <i class="fas fa-life-ring"></i>
        </div>
        <h3>Safety First</h3>
        <p>Comprehensive water safety training including practical self-rescue techniques.</p>
      </div>
    </a>
    
    <a href="{{ site.baseurl }}/for-learners/resources/next-steps.html" class="highlight-card-link">
      <div class="highlight-card">
        <div class="highlight-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>Join the Community</h3>
        <p>Clear pathway to club membership and ongoing rowing opportunities.</p>
      </div>
    </a>
  </div>
</section>

<div style="text-align: center; margin-bottom: 2rem;">
  <img src="https://images.clubexpress.com/757878/graphics/LTS_1121118463.jpg" alt="Learn to Scull program participants" class="landing-page-image">
</div>

<section class="program-section info-section">
  <div class="section-header">
    <h2>2025 Program Information</h2>
  </div>
  
  <div class="info-container">
    <div class="info-panel">
      <div class="info-header">
        <i class="fas fa-calendar-check"></i>
        <h3>Session Dates</h3>
      </div>
      <ul>
        <li><strong>Session 1:</strong> May/June</li>
        <li><strong>Session 2:</strong> June</li>
        <li><strong>Session 3:</strong> June/July</li>
        <li><strong>Session 4:</strong> July/August</li>
      </ul>
    </div>
    
    <div class="info-panel">
      <div class="info-header">
        <i class="fas fa-clipboard-list"></i>
        <h3>Registration</h3>
      </div>
      <ul>
        <li><strong>Opens:</strong> April 30th, 2025</li>
        <li><strong>Cost:</strong> $300</li>
        <li><strong>Discounted:</strong> $225 (students/veterans)</li>
        <li><a href="https://aarc.clubexpress.com" class="info-link" target="_blank">Register Online</a></li>
      </ul>
    </div>
    
    <div class="info-panel">
      <div class="info-header">
        <i class="fas fa-question-circle"></i>
        <h3>Questions?</h3>
      </div>
      <p>Email <a href="mailto:info@a2crew.com">info@a2crew.com</a> or visit the <a href="https://aarc.clubexpress.com/content.aspx?page_id=22&club_id=757878&module_id=201828" target="_blank">AARC website</a> for more information.</p>
    </div>
  </div>
</section>

<!-- Font Awesome for icons -->
<script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    
<section class="program-section cta-section" style="text-align: center;">
  <a href="{{ site.baseurl }}/for-learners/" class="cta-button">Learner’s Guide: Learn to Scull Program</a>
</section>

<style>
:root {
  --primary-color: #0056b3;
  --secondary-color: #f8f9fa;
  --accent-color: #e63946;
  --text-color: #333;
  --light-text: #6c757d;
  --border-radius: 8px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
  --section-padding: 3rem 0;
}

/* Section Styling */
.program-section {
  padding: var(--section-padding);
  margin-bottom: 2rem;
  position: relative;
  z-index: 0;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  z-index: 0;
}

.section-header p {
  font-size: 1.1rem;
  color: var(--light-text);
  max-width: 600px;
  margin: 1rem auto 0;
}

/* Main Navigation Tiles */
.main-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.nav-tile {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.tile-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.nav-tile h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.nav-tile p {
  color: var(--light-text);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

/* Program Highlights */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.highlight-card-link {
  text-decoration: none;
  color: inherit;
  display: block; /* Ensures the link takes up the grid cell properly */
}

.highlight-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  height: 100%; /* Ensures the card fills the link wrapper */
}

.highlight-card:hover {
  transform: translateY(-5px);
}

.highlight-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  display: inline-block;
  border-radius: 50%;
  padding: 1rem;
  background-color: rgba(0, 86, 179, 0.1);
}

.highlight-card h3 {
  margin-bottom: 0.5rem;
}

.highlight-card p {
  color: var(--light-text);
  font-size: 0.95rem;
}

/* Info Section */
.info-section {
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
  padding: 2rem 1rem;
}

.info-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.info-panel {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.info-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.info-header i {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.info-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.info-panel ul {
  padding-left: 1.5rem;
  margin-bottom: 0;
}

.info-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-top: 0.5rem;
}

/* Buttons */
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  text-align: center;
}

.cta-button:hover {
  background-color: #004494;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  color: white;
}

/* Added for footer_nav.html */
.footer-navigation .footer-nav-button {
  margin: 0.3rem 0.25rem;
  padding: 0.6rem 1rem;
  font-size: 0.9em;
}
/* End of added styles */

.cta-button.secondary {
  background-color: transparent;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background-color: rgba(255,255,255,0.2);
}

/* Hero Section */
.hero-section {
  background-color: var(--primary-color);
  background-image: linear-gradient(rgba(0, 56, 130, 0.85), rgba(0, 56, 130, 0.9)), url("{{ site.baseurl }}/assets/images/rowing-header.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 3rem 2rem; /* Reduced top/bottom padding */
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  border-radius: var(--border-radius);
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 2.5rem; /* Reduced font size */
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.25rem; /* Reduced font size */
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.landing-page-image {
  max-width: 600px; /* Adjusted from 700px */
  width: 75%;
  height: auto;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-top: 1rem;
  margin-bottom: 2rem; /* Added to ensure spacing before next section */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .info-container {
    grid-template-columns: 1fr;
  }
  
  .resources-flex {
    gap: 1rem;
  }
  
  .resource-item {
    width: calc(50% - 0.5rem);
    padding: 1.25rem;
  }
}
</style>
