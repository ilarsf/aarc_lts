---
layout: default
title: Self-Rescue Guide
description: Flip test and recovery procedures for scullers
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/self-rescue-timeline.css">

# Sculling Self-Rescue Guide

<p>Every sculler must know how to perform a self-rescue after a capsize. This guide covers the mandatory flip test procedure and the step-by-step process for returning to your boat and resuming rowing.</p>

## Understanding Capsizing

<p>{% include icon.html icon="fas fa-info-circle" type="info" alt="Information" %} Capsizing can happen to anyone, from beginners to experienced rowers. Common causes include:</p>

<div class="rescue-step-content">
  <div class="row">
    <div class="col-md-9">
      <ul>
        <li><strong>Balance Issues</strong>: Small shifts in weight or uneven oar heights</li>
        <li><strong>Technique Errors</strong>: "Catching a crab" (blade stuck in water) or uneven pressure</li>
        <li><strong>Environmental Factors</strong>: Wakes from other boats, unexpected wind gusts, or waves</li>
        <li><strong>Equipment Problems</strong>: Open oarlocks, loose equipment, or rigger failure</li>
      </ul>
    </div>
    <div class="col-md-3 text-center">
      <div class="rescue-step-icon">
        {% include icon.html icon="fas fa-water" type="info" size="3rem" alt="Water icon" %}
      </div>
    </div>
  </div>
</div>

<div class="rescue-progress" id="rescue-progress-nav">
  <div class="rescue-progress-step active" data-step="0">
    <div class="rescue-progress-marker">1</div>
    <div class="rescue-progress-label">Prepare</div>
  </div>
  <div class="rescue-progress-step" data-step="1">
    <div class="rescue-progress-marker">2</div>
    <div class="rescue-progress-label">Capsize</div>
  </div>
  <div class="rescue-progress-step" data-step="2">
    <div class="rescue-progress-marker">3</div>
    <div class="rescue-progress-label">Right Boat</div>
  </div>
  <div class="rescue-progress-step" data-step="3">
    <div class="rescue-progress-marker">4</div>
    <div class="rescue-progress-label">Re-enter</div>
  </div>
  <div class="rescue-progress-step" data-step="4">
    <div class="rescue-progress-marker">5</div>
    <div class="rescue-progress-label">Resume</div>
  </div>
</div>

## Self-Rescue Process

{% include accordion.html %}

<div class="accordion-controls">
    <button id="expand-all">Expand All</button>
    <button id="collapse-all">Collapse All</button>
</div>

<div class="rescue-timeline" id="rescue-main-timeline">
  <div class="accordion-section rescue-step" id="step-1">
    <button class="accordion-toggle" onclick="toggleAccordionStep('step-1', 0)"><div class="rescue-step-number">1</div> <span class="rescue-step-title">Preparation</span></button>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="rescue-step-content">
      <div class="row">
        <div class="col-md-9">
          <div class="rescue-step-description">
            <p>{% include icon.html icon="fas fa-check-circle" type="info" alt="Check" color="#4caf50" %} Before any rowing session, be prepared for the possibility of capsizing.</p>
          </div>
          <div class="rescue-step-actions">
            <ol>
              <li>Wear appropriate clothing suitable for water immersion</li>
              <li>Remove loose items from pockets</li>
              <li>Understand the self-rescue procedure</li>
            </ol>
          </div>
        </div>
        <div class="col-md-3 text-center">
          <div class="rescue-step-icon">
            {% include icon.html icon="fas fa-tshirt" type="info" size="3rem" alt="Clothing icon" %}
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="accordion-section rescue-step" id="step-2">
    <button class="accordion-toggle" onclick="toggleAccordionStep('step-2', 1)"><div class="rescue-step-number">2</div> <span class="rescue-step-title">Initial Response to Capsize</span></button>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="rescue-step-content">
      <div class="row">
        <div class="col-md-9">
          <div class="rescue-step-description">
            <p><i class="fas fa-water" style="color: #2196f3;"></i> The first moments after a capsize are crucial. Your primary focus should be on personal safety.</p>
          </div>
          <div class="rescue-step-actions">
            <ol>
              <li><strong>Stay calm</strong> and get your bearings</li>
              <li><strong>Exit the boat</strong> - avoid getting caught by the oar or rigger</li>
              <li><strong>Stay with your boat</strong> - it's your primary flotation device</li>
              <li><strong>Keep hold of both oars</strong> if possible</li>
              <li><strong>Assess the situation</strong> - check for injury or dangerous conditions</li>
            </ol>
          </div>
          <p><i class="fas fa-exclamation-triangle" style="color: #ff9800;"></i> <strong>Important:</strong> If you are injured or in dangerous waters (strong current, very cold water), prioritize signaling for help over attempting self-rescue.</p>
        </div>
        <div class="col-md-3 text-center">
          <div class="rescue-step-icon">
            <i class="fas fa-life-ring fa-3x" style="color: #ff9800;"></i>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="accordion-section rescue-step" id="step-3">
    <button class="accordion-toggle" onclick="toggleAccordionStep('step-3', 2)"><div class="rescue-step-number">3</div> <span class="rescue-step-title">Right Your Boat</span></button>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="rescue-step-content">
      <div class="row">
        <div class="col-md-9">
          <div class="rescue-step-description">
            <p><i class="fas fa-sync-alt" style="color: #2196f3;"></i> If your boat is upside down, you'll need to flip it right-side up.</p>
          </div>
          <div class="rescue-step-actions">
            <ol>
              <li>Position yourself at the cockpit (center) of the boat</li>
              <li>Reach across to the far side and grasp the rigger</li>
              <li>Push down on the near rigger while pulling up on the far rigger</li>
              <li>Watch out for the oars and rigger coming towards you</li>
              <li>The boat will roll back to upright position.</li>
            </ol>
          </div>
          <p><i class="fas fa-lightbulb" style="color: #4caf50;"></i> <strong>Technique Tip:</strong> Use the riggers as leverage points rather than trying to lift the entire weight of the boat. Think of it as rolling the boat rather than lifting it.</p>
        </div>
        <div class="col-md-3 text-center">
          <div class="rescue-step-icon">
            <i class="fas fa-sync fa-3x" style="color: #2196f3;"></i>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="accordion-section rescue-step" id="step-4">
    <button class="accordion-toggle" onclick="toggleAccordionStep('step-4', 3)"><div class="rescue-step-number">4</div> <span class="rescue-step-title">Re-Entry Technique</span></button>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="rescue-step-content">
      <div class="row">
        <div class="col-md-9">
          <div class="rescue-step-description">
            <p><i class="fas fa-reply" style="color: #2196f3;"></i> The side re-entry is the most common technique for getting back into your shell from the water.</p>
          </div>
          <div class="rescue-step-actions">
            <ol>
              <li><strong>Position your oars</strong>: Extend both oars perpendicular to the boat</li>
              <li><strong>Set the Near-Side Oar</strong><br>
                Float the near-side blade flat on the water, shaft perpendicular to the hull. This gives you a stable brace. Verify the oarlock is properly closed.
              </li>
              <li><strong>Retrieve the Far-Side Oar</strong><br>
                Swim or lean over to grab the other oar. Ensure this oarlock is also properly closed.
              </li>
              <li><strong>Extend both oars</strong><br>Push them out so they are fully extended and both blades lie flat on the water, with the handles overlapping.
              </li>
              <li><strong>Position your hands</strong><br>
                Grasp the overlapping handles in one hand. Keep your elbow high over the shaft. The other hand is on the center strip between the tracks.
              </li>
              <li><strong>Hoist Yourself Onto the Hull</strong> (Two methods)
                <ul>
                  <li>First, bob down to utilize your natural buoyancy, then use a strong kick to gain upward momentum</li>
                  <li>Push down firmly on the oar handles and the center strip while executing a strong scissors kick, similar to getting out of a pool</li>
                </ul>
                <strong>Option A: The Belly Flop Method</strong>
                <ul>
                  <li>Propel yourself forward and across the boat in a "belly flop" motion</li>
                  <li>Land with your torso flat across the hull, perpendicular to the boat's length</li>
                  <li>Keep your weight low and centered over the boat</li>
                  <li>Once stable in this position, sit up, and bring one leg across</li>
                  <li>Keep both blades flat on the water throughout for stability by lifting the hand holding the oars.</li>
                </ul>
                <strong>Option B: The Hip Rotation Method</strong>
                <ul>
                  <li>Rotate your hip onto the tracks as you rise</li>
                  <li>Keep your weight low and centered over the boat</li>
                  <li>Once your hip is secured on the tracks, sit up, and bring one leg across</li>
                  <li>Keep both blades flat on the water throughout for stability by lifting the hand holding the oars.</li>
                </ul>
              </li>
              <li><strong>Re-seat Yourself</strong>
                <ul>
                  <li>Wait until the boat settles, then while both feet are outside, pull the seat below you and re-seat yourself. Insert your feet into the cockpit and foot stretchers.</li>
                </ul>
              </li>
            </ol>
          </div>
          <p><i class="fas fa-lightbulb" style="color: #4caf50;"></i> <strong>Technique Tip:</strong> This technique relies on leg power and body mechanics, not upper body strength. Using your natural buoancy and a strong scissors kick while pushing down on the oar handles will help lift your body horizontally onto the boat.</p>
        </div>
        <div class="col-md-3 text-center">
          <div class="rescue-step-icon">
            <i class="fas fa-sign-in-alt fa-3x" style="color: #2196f3;"></i>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="accordion-section rescue-step" id="step-5">
    <button class="accordion-toggle" onclick="toggleAccordionStep('step-5', 4)"><div class="rescue-step-number">5</div> <span class="rescue-step-title">Recovery and Continuation</span></button>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="rescue-step-content">
      <div class="row">
        <div class="col-md-9">
          <div class="rescue-step-description">
            <p><i class="fas fa-forward" style="color: #2196f3;"></i> Once back in your boat, follow these steps to resume rowing.</p>
          </div>
          <div class="rescue-step-actions">
            <ol>
              <li>Perform a quick equipment check</li>
              <li>Signal to your coach or others that you are okay</li>
              <li>Begin gentle rowing, when stable, resume normal rowing</li>
              <li>Consider heading to the dock to drain the boat</li>
            </ol>
          </div>
          <p><i class="fas fa-hourglass-half" style="color: #43a047;"></i> <strong>Recovery Time:</strong> Take your time getting settled back in the boat. It's normal for the boat to feel unstable at first—gentle movements and patience will help you regain control.</p>
        </div>
        <div class="col-md-3 text-center">
          <div class="rescue-step-icon">
            <i class="fas fa-rowing fa-3x" style="color: #2196f3;"></i>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="alert alert-info" style="background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 10px 0; border-radius: 4px;">
  <p>{% include icon.html icon="fas fa-video" type="info" alt="Videos" %} For visual demonstrations of the self-rescue techniques, please see our collection of self-rescue videos: 
  <a href="{{ site.baseurl }}/for-learners/technique/videos.html?filter=self-rescue" class="cta-button">Watch Self-Rescue Videos</a></p>
</div>

<div class="accordion-container" id="alternative-self-rescue-accordion">
  <div class="accordion-item">
    <div class="accordion-header" onclick="toggleAccordion('alternative-self-rescue')">{% include icon.html icon="fas fa-home" type="info" alt="Dock" style="margin-right: 10px;" %} Alternative Self Rescue</div>
    <div class="accordion-content" id="alternative-self-rescue-content">
      <div id="dock-content">
        {% include icon.html icon="fas fa-info-circle" type="info" alt="Information" %} If you cannot re-enter your boat and need to get to the dock or shore:
        <ul>
          <li>Position yourself flat on the stern deck, much like you would lie on a surfboard.</li>
          <li>Use your hands to paddle towards the shore or dock.</li>
        </ul>
        {% include icon.html icon="fas fa-info-circle" type="info" alt="Information" %} Once you reach the dock with your boat:
        <ul>
          <li>Push the boat to the side of the dock, keeping it parallel to the dock.</li>
          <li>Position yourself next to the boat, facing the dock.</li>
          <li>Place both hands on the dock surface.</li>
          <li>Use a strong push/kick motion to lift your upper body onto the dock</li>
          <li>Once your torso is on the dock, swing one leg up and roll onto the dock surface</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="alert alert-info" style="background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 10px 0; border-radius: 4px;">
  <p>{% include icon.html icon="fas fa-info-circle" type="info" %} <strong>A Note on Physical Sensations:</strong> During self-rescue practice, some individuals might experience minor bruising on areas like legs, hips, or torso as they learn to get back into the boat. This is a normal part of the learning process.</p>
  <p>{% include icon.html icon="fas fa-exclamation-triangle" type="safety" alt="Warning" color="#f44336" %} <strong>Safety First:</strong> If at any point during a real capsize you feel unsafe or unable to complete the self-rescue, signal for help immediately and stay with your boat while awaiting assistance.</p>
</div>

<section class="program-section cta-section" style="text-align: center;">
  <a href="{{ site.baseurl }}/for-learners/#safety" class="cta-button">{% include icon.html icon="fas fa-shield-alt" type="info" alt="Safety" %} Back to Safety</a>
</section>

<script>
  // Simple manual accordion toggle function for challenge sections
  function toggleAccordion(id) {
    const contentId = id + '-content';
    const content = document.getElementById(contentId);
    const header = content.previousElementSibling;
    
    console.log('toggleAccordion called for', id);
    
    // Toggle active class
    header.classList.toggle('active');
    
    // Toggle content visibility
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 500 + 'px';
    }
  }
  
  // Function to toggle steps in the main rescue timeline
  function toggleAccordionStep(stepId, stepIndex) {
    console.log('toggleAccordionStep called for', stepId, 'at index', stepIndex);
    
    // Get all timeline toggles
    const allToggles = document.querySelectorAll('#rescue-main-timeline .accordion-toggle');
    const toggle = document.querySelector(`#${stepId} .accordion-toggle`);
    const content = document.querySelector(`#${stepId} .accordion-content`);
    
    if (!toggle || !content) {
      console.error('Could not find toggle or content for step', stepId);
      return;
    }
    
    // Update progress indicator
    const progressSteps = document.querySelectorAll('.rescue-progress-step');
    progressSteps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else if (index < stepIndex) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
    
    // Close all other accordions
    allToggles.forEach((otherToggle) => {
      if (otherToggle !== toggle && otherToggle.classList.contains('active')) {
        otherToggle.classList.remove('active');
        const otherContent = otherToggle.closest('.accordion-section').querySelector('.accordion-content');
        if (otherContent) {
          otherContent.style.maxHeight = null;
          otherContent.classList.remove('visible');
        }
      }
    });
    
    // Toggle this accordion
    toggle.classList.toggle('active');
    
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove('visible');
    } else {
      // Calculate the correct height
      content.style.display = 'block';
      const height = content.scrollHeight;
      content.style.display = '';
      
      content.style.maxHeight = height + 3000 + 'px';
      content.classList.add('visible');
      
      // Scroll the step into view
      const stepElement = document.getElementById(stepId);
      if (stepElement) {
        stepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
    
    // Prevent default button behavior
    return false;
  }
</script>
<style>
/* Local overrides for regular accordions on this page */
.accordion-container .accordion-item .accordion-header {
  font-weight: bold;
  padding: 15px;
}

.accordion-container .accordion-item .accordion-content {
  background-color: white;
}

.accordion-container .accordion-item .accordion-content p,
.accordion-container .accordion-item .accordion-content ol,
.accordion-container .accordion-item .accordion-content ul {
  padding: 15px;
}

/* Fix for accordion item click on this page */
.accordion-container .accordion-item .accordion-header.active + .accordion-content {
  max-height: 1000px !important;
}
</style>

<script>
  // Immediate execution to ensure accordion headers are properly initialized
  (function() {
    document.addEventListener('DOMContentLoaded', function() {
      // Direct event handlers for accordion headers
      const allHeaders = document.querySelectorAll('.accordion-header');
      
      allHeaders.forEach(header => {
        header.addEventListener('click', function() {
          console.log('Direct accordion header clicked');
          this.classList.toggle('active');
          const content = this.nextElementSibling;
          
          if (content && content.classList.contains('accordion-content')) {
            if (content.style.maxHeight) {
              content.style.maxHeight = null;
            } else {
              content.style.maxHeight = content.scrollHeight + 500 + 'px';
            }
          }
        });
      });
    });
  })();
</script>

<script>
  // JavaScript for self-rescue progress tracking
  document.addEventListener('DOMContentLoaded', function() {
    const progressSteps = document.querySelectorAll('.rescue-progress-step');
    const mainTimelineSteps = document.querySelectorAll('#rescue-main-timeline .rescue-step');
    const accordionToggles = document.querySelectorAll('#rescue-main-timeline .accordion-toggle');
    
    // Function to update the progress indicator
    function updateProgress(stepIndex) {
      // Reset all steps
      progressSteps.forEach((step, index) => {
        if (index < stepIndex) {
          step.classList.add('completed');
          step.classList.remove('active');
        } else if (index === stepIndex) {
          step.classList.add('active');
          step.classList.remove('completed');
        } else {
          step.classList.remove('active', 'completed');
        }
      });
    }
    
    // Open accordion section programmatically
    function openAccordionSection(index) {
      // Close any open accordion sections
      accordionToggles.forEach((toggle) => {
        if (toggle.classList.contains('active')) {
          toggle.classList.remove('active');
          const content = toggle.nextElementSibling;
          if (content) content.style.maxHeight = null;
        }
      });
      
      // Open the requested section
      if (accordionToggles[index]) {
        accordionToggles[index].classList.add('active');
        const content = accordionToggles[index].nextElementSibling;
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    }
    
    // Add click event to accordion toggles
    accordionToggles.forEach((toggle, index) => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Accordion toggle clicked at index:', index);
        updateProgress(index);
        
        // Toggle this accordion
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        
        // Close other accordions
        accordionToggles.forEach((otherToggle, otherIndex) => {
          if (otherIndex !== index && otherToggle.classList.contains('active')) {
            otherToggle.classList.remove('active');
            const otherContent = otherToggle.nextElementSibling;
            if (otherContent) {
              otherContent.style.maxHeight = null;
              otherContent.classList.remove('visible');
            }
          }
        });
        
        // Toggle current accordion content
        if (content) {
          console.log('Content found, toggling visibility');
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.classList.remove('visible');
          } else {
            // Force layout reflow to get accurate scrollHeight
            content.style.display = 'block'; 
            const height = content.scrollHeight;
            content.style.display = '';
            content.style.maxHeight = height + 3000 + 'px'; // Add extra space for content
            content.classList.add('visible');
          }
        } else {
          console.error('No content element found for toggle', this);
        }
      });
      
      // Make sure the toggle is clickable
      toggle.style.cursor = 'pointer';
      toggle.setAttribute('tabindex', '0'); // Make it keyboard accessible
    });
    
    // Add click event to progress markers
    progressSteps.forEach((step, index) => {
      step.addEventListener('click', function() {
        updateProgress(index);
        
        // Open the corresponding accordion section
        openAccordionSection(index);
        
        // Find the corresponding step in the main timeline
        const targetStep = document.getElementById('step-' + (index + 1));
        if (targetStep) {
          targetStep.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      });
    });
    
    // Add expand/collapse all functionality
    const expandAllButton = document.getElementById('expand-all');
    const collapseAllButton = document.getElementById('collapse-all');
    
    if (expandAllButton) {
      expandAllButton.addEventListener('click', function() {
        accordionToggles.forEach((toggle, index) => {
          toggle.classList.add('active');
          const content = toggle.nextElementSibling;
          if (content) {
            content.style.maxHeight = content.scrollHeight + 3000 + 'px';
            content.classList.add('visible');
          }
        });
        
        // Update progress to first step to maintain UI consistency
        updateProgress(0);
      });
    }
    
    if (collapseAllButton) {
      collapseAllButton.addEventListener('click', function() {
        accordionToggles.forEach((toggle) => {
          toggle.classList.remove('active');
          const content = toggle.nextElementSibling;
          if (content) {
            content.style.maxHeight = null;
            content.classList.remove('visible');
          }
        });
      });
    }
    
    // Initialize all accordions to be closed by default, except the first one
    accordionToggles.forEach((toggle, index) => {
      const content = toggle.nextElementSibling;
      if (index === 0) {
        // Open the first accordion
        toggle.classList.add('active');
        console.log('Setting first accordion to active state');
        if (content) {
          // Ensure the content is visible before measuring
          content.style.display = 'block';
          const height = content.scrollHeight;
          content.style.display = '';
          
          // Set the max height with extra padding
          content.style.maxHeight = height + 3000 + 'px';
          content.classList.add('visible');
          console.log('Set first accordion content height to', height + 3000);
        }
      } else {
        // Close all other accordions
        toggle.classList.remove('active');
        if (content) {
          content.style.maxHeight = null;
          content.classList.remove('visible');
        }
      }
    });
    
    // Force a reflow to ensure accordions render correctly
    document.body.offsetHeight;
    
    // Initialize non-timeline accordions (with accordion-header class)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    console.log('Found regular accordion headers:', accordionHeaders.length);
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        console.log('Regular accordion header clicked');
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content) {
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + 500 + "px";
          }
        }
      });
    });
  });
</script>

<style>
/* Card hover effects */
.card.hover-effect {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Enhanced layout for the rescue steps */
.rescue-step-content .row {
  display: flex;
  align-items: center;
}

/* Better accordion styling */
.accordion-header, .accordion-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.accordion-toggle:hover, .accordion-header:hover {
  background-color: #e3f2fd !important;
}

.accordion-toggle:active, .accordion-header:active {
  background-color: #bbdefb !important;
}

/* Visual indicator that these are clickable */
.accordion-toggle::after, .accordion-header::after {
  transition: transform 0.3s ease;
}

/* Fix any display issues with accordion content */
.accordion-content {
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
}

.accordion-content.visible {
  max-height: 3000px !important; 
}

/* Ensure all toggles are visibly interactive */
.accordion-toggle, .accordion-header {
  outline: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

/* Consistent alerts */
.alert {
  margin: 20px 0;
  border-radius: 4px;
}

/* Better spacing for everything */
h2, h3 {
  margin-top: 40px;
  margin-bottom: 20px;
}

/* Make icons consistent */
i.fas, i.far {
  margin-right: 6px;
}

/* Custom styling for video thumbnails */
.video-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  object-fit: cover;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.video-thumbnail:hover {
  opacity: 0.5;
}

/* When image is hidden, make sure the icon fallback doesn't block the video */
.icon-fallback.feature-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
  border-radius: 50%;
  padding: 20px;
}
</style>
