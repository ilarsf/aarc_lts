---
layout: coach
title: "Technical Resources - AARC Learn to Scull Program"
search_exclude: true
---

# Technical Resources for Coaches

<div class="info-box tip">
  <h3>About These Resources</h3>
  <p>This section contains technical coaching resources, drills, and teaching frameworks to help you deliver effective instruction throughout the Learn to Scull program.</p>
</div>

{% include tabs.html %}

<div class="tab-container">
  <div class="tab-nav">
    <button class="tab-button active" data-tab="tab1">Key Drills</button>
    <button class="tab-button" data-tab="tab2">Technical Correction</button>
    <button class="tab-button" data-tab="tab3">Teaching Frameworks</button>
    <button class="tab-button" data-tab="tab4">Video Analysis</button>
    <button class="tab-button" data-tab="tab5">Equipment Adjustment</button>
    <button class="tab-button" data-tab="tab6">Coaching Language</button>
  </div>

  <div class="tab-content active" id="tab1">
    <div class="tab-content-inner">
      <div class="tab-overview">
        <p>Comprehensive collection of drills organized by skill level and learning objective. Each drill includes clear instructions and common errors to watch for.</p>
        <div class="tab-actions">
          <a href="{{ site.baseurl }}/coach_portal/technical/Key_Drills_Repertoire" class="cta-button">View Full Page</a>
          <button class="toggle-content-btn" data-target="drills-content">Show Content Inline</button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-content" id="tab2">
    <div class="tab-content-inner">
      <div class="tab-overview">
        <p>Identify common technical issues and learn effective correction strategies, including visual cues, verbal prompts, and targeted drills.</p>
        <div class="tab-actions">
          <a href="{{ site.baseurl }}/coach_portal/technical/Common_Technical_Issues_and_Corrections" class="cta-button">View Full Page</a>
          <button class="toggle-content-btn" data-target="corrections-content">Show Content Inline</button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-content" id="tab3">
    <div class="tab-content-inner">
      <div class="tab-overview">
        <p>Structured approaches for introducing and developing technical skills, with clear progression pathways for different learning styles.</p>
        <div class="tab-actions">
          <a href="{{ site.baseurl }}/coach_portal/technical/Technical_Frameworks" class="cta-button">View Full Page</a>
          <button class="toggle-content-btn" data-target="frameworks-content">Show Content Inline</button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-content" id="tab4">
    <div class="tab-content-inner">
      <div class="tab-overview">
        <p>Guidelines for using video feedback effectively, including recommended apps, camera positions, and analysis methods.</p>
        <div class="tab-actions">
          <a href="{{ site.baseurl }}/coach_portal/technical/Video_Analysis_Guide" class="cta-button">View Full Page</a>
          <button class="toggle-content-btn" data-target="video-content">Show Content Inline</button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-content" id="tab5">
    <div class="tab-content-inner">
      <div class="tab-overview">
        <p>Instructions for adjusting foot stretchers, oarlock height, and other equipment settings to match participant needs.</p>
        <div class="tab-actions">
          <a href="{{ site.baseurl }}/coach_portal/technical/Equipment_Adjustment_Reference" class="cta-button">View Full Page</a>
          <button class="toggle-content-btn" data-target="equipment-content">Show Content Inline</button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-content" id="tab6">
    <div class="tab-content-inner">
      <div class="tab-overview">
        <p>Effective terminology, metaphors, and communication strategies for conveying technical concepts to beginners.</p>
        <div class="tab-actions">
          <a href="{{ site.baseurl }}/coach_portal/technical/Coaching_Language_Guide" class="cta-button">View Full Page</a>
          <button class="toggle-content-btn" data-target="language-content">Show Content Inline</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="info-box note mt-4">
  <h3>Need More Help?</h3>
  <p>Reach out to your instructors via email</p>
</div>

<style>
  .cta-button {
    display: inline-block;
    margin-top: 1rem;
    background-color: var(--theme-color);
    color: white !important;
    border: none;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
  }
  
  .cta-button:hover {
    background-color: var(--theme-color-dark);
    color: white !important;
    text-decoration: none;
  }
  
  .tab-overview {
    margin-bottom: 1rem;
  }
  
  .tab-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 1rem;
  }
  
  .toggle-content-btn {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .toggle-content-btn:hover {
    background-color: #e7e7e7;
  }
  
  .toggle-content-btn.active {
    background-color: #e7e7e7;
    border-color: #bbb;
  }
  
  .expandable-content {
    border-top: 1px solid #ddd;
    margin-top: 1rem;
    padding-top: 1.5rem;
  }
  
  .expandable-content h2 {
    margin-top: 0;
  }
  
  .collapsible-section {
    margin-bottom: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  
  .collapsible-header {
    background-color: #f5f5f5;
    padding: 10px 15px;
    margin: 0;
    cursor: pointer;
    position: relative;
    border-left: 3px solid #0073E6;
  }
  
  .collapsible-header:after {
    content: '+';
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .collapsible-header.active:after {
    content: '-';
  }
  
  .collapsible-content {
    padding: 15px;
    display: none;
  }
  
  .collapsible-content.active {
    display: block;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Handle toggle content buttons
    const toggleButtons = document.querySelectorAll('.toggle-content-btn');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        
        if (targetContent.style.display === 'none') {
          targetContent.style.display = 'block';
          this.textContent = 'Hide Content';
          this.classList.add('active');
        } else {
          targetContent.style.display = 'none';
          this.textContent = 'Show Content Inline';
          this.classList.remove('active');
        }
      });
    });
    
    // Handle collapsible sections
    document.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('collapsible-header')) {
        e.target.classList.toggle('active');
        const content = e.target.nextElementSibling;
        
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      }
    });
  });
</script>
