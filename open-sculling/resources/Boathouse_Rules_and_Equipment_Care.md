---
layout: open-sculling
title: "Boathouse Rules and Equipment Care"
---

<link rel="stylesheet" href="{{ '/assets/css/tab-icons.css' | relative_url }}">

# Boathouse Rules and Equipment Care

Proper care and handling of equipment not only extends its lifespan but also ensures it remains in good working condition for everyone. This guide covers important boathouse etiquette and equipment maintenance responsibilities.

<div class="tab-container">
  <div class="tab-nav">
    <a class="tab-link active" data-tab="rules-tab"><i class="fas fa-clipboard-list"></i> <span>General Rules</span></a>
    <a class="tab-link" data-tab="handling-tab"><i class="fas fa-hands"></i> <span>Handling & Storage</span></a>
    <a class="tab-link" data-tab="maintenance-tab"><i class="fas fa-screwdriver-wrench"></i> <span>Maintenance</span></a>
    <a class="tab-link" data-tab="oars-tab"><i class="fas fa-ruler-combined"></i> <span>Oar Care</span></a>
    <a class="tab-link" data-tab="facilities-tab"><i class="fas fa-house-user"></i> <span>Facilities</span></a>
  </div>
  
  <div id="rules-tab" class="tab-content active">
    <h2>General Boathouse Rules</h2>
    
    <ul>
      <li><strong>Sign Out/In:</strong> Always record your boat usage in the logbook before launching and sign back in upon return, including any issues encountered during your row.</li>
      <li><strong>Boat Assignment:</strong> Use only the boat and oars that you have been assigned.</li>
      <li><strong>Footwear:</strong> Wear appropriate footwear in the boathouse. Street shoes are allowed on the dock but not in the boats.</li>
      <li><strong>Quiet Hours:</strong> Respect neighbors by minimizing noise during early morning hours.</li>
      <li><strong>Security:</strong> The last person leaving the boathouse is responsible for ensuring all doors and gates are locked.</li>
      <li><strong>Keep Pathways Clear:</strong> Never leave equipment blocking walkways, doorways, or launch areas.</li>
    </ul>
  </div>
  
  <div id="handling-tab" class="tab-content">
    <h2>Equipment Handling and Storage</h2>

    <h3>Boat Handling</h3>
    <ul>
      <li><strong>Carrying Boats:</strong> Always lift with proper technique and adequate help. Ask for help taking the boat on or off of its rack and carrying, if needed. Listen to experienced rowers regarding the correct carrying positions.</li>
      <li><strong>Using Slings/Stretchers:</strong> Place boats carefully on stretchers when adjusting foot stretchers or performing maintenance.</li>
      <li><strong>Step Ladders:</strong> Use the provided step ladders for reaching high racks; never climb on the racks themselves. Return ladders to their designated storage locations after use.</li>
    </ul>

    <h3>Storing Boats</h3>
    <p>After cleaning, place the boat back in its original rack position. Note how and where your boat is stored and return it to the same place and position. All boats on the outside rack have bows pointed to the boathouse. Ensure the riggers align with those of other boats on the rack to maintain uniformity and balance. Strap outside boats snugly onto the rack (1Xs should not be tightened as much as a sweep boat). Make sure it is properly supported to prevent damage.</p>

    <h3>Storing Oars</h3>
    <ul>
      <li><strong>Oar Storage:</strong> Return oars to their designated racks after use, as indicated by the rack labels, with blades facing in the correct direction.</li>
    </ul>
  </div>
  
  <div id="maintenance-tab" class="tab-content">
    <h2>General Equipment Maintenance</h2>

    <h3>Cleaning Boats</h3>
    <p>Before putting the boat back on its rack, place it on the stretchers/slings and thoroughly wipe it down using a rag/towel provided by the club. Take the time necessary to CLEAN the boat, not just dry it. Once the river scum dries, it is very difficult to remove. This ensures the equipment is clean and ready for the next use.</p>

    <h3>Reporting Issues</h3>
    <p>Please note any issues with the equipment in the logbook. If there is significant damage, also notify a coach or club officer immediately.</p>
  </div>
  
  <div id="oars-tab" class="tab-content">
    <h2>Oar Care</h2>
    
    <h3>Cleaning Oars</h3>
    <p>After each use, rinse oars with fresh water if available, paying special attention to the collars and gates.</p>

    <h3>Oar Handles</h3>
    <p>Routinely disinfect oar handles after each row. This is crucial for maintaining hygiene and preventing the spread of germs, especially given the likelihood of blisters and potential bleeding. Additionally, it removes residues from bandages or tapes some rowers might use.</p>

    <h3>Tape Residue Removal</h3>
    <p>If you\'ve used tape for blisters, remove residues completely after your row. Sticky residue makes handles uncomfortable for the next user.</p>
  </div>
  
  <div id="facilities-tab" class="tab-content">
    <h2>Considerate Use of Facilities</h2>
    <ul>
      <li><strong>Bathroom Facilities:</strong> Note that there are only public toilets without running water available. Please plan accordingly.</li>
      <li><strong>Changing:</strong> There are no dedicated changing rooms at this facility. Come dressed appropriately or be prepared to change discreetly.</li>
      <li><strong>Trash:</strong> Dispose of all waste properly and recycle when possible.</li>
      <li><strong>Personal Items:</strong> Do not leave valuables unattended in the boathouse.</li>
    </ul>
  </div>
  
</div> <!-- This closes tab-container -->

<h2>Equipment Respect Philosophy</h2>

<ul>
  <li><strong>Respect Your Future Self:</strong> The care you take now ensures the equipment will be in good condition for your next row.</li>
  <li><strong>Respect Your Peers:</strong> Other rowers deserve to use well-maintained equipment just as you do.</li>
  <li><strong>Respect the Club\'s Investment:</strong> Proper care of equipment protects the club\'s financial investment and allows resources to be directed to improvements rather than replacements.</li>
</ul>

<div class="info-box tip">
  <h4>Ask When Unsure</h4>
  <p>If you\'re unsure about any aspect of equipment handling or boathouse procedures, ask an experienced member or coach. It\'s better to ask than to risk damaging equipment or breaking protocol.</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Tab navigation functionality
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Function to activate a specific tab by ID
  function activateTab(tabId) {
    // Deactivate current tabs
    tabLinks.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Activate new tab
    document.getElementById(tabId).classList.add('active');
    const tabLink = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
    tabLink.classList.add('active');
  }
  
  // Tab click handling
  tabLinks.forEach(tabLink => {
    tabLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get tab to activate
      const tabId = this.getAttribute('data-tab');
      activateTab(tabId);
    });
  });
  
  // Set first tab as active by default if none is active
  if (!document.querySelector('.tab-link.active') && tabLinks.length > 0) {
    const firstTab = tabLinks[0];
    const firstTabId = firstTab.getAttribute('data-tab');
    activateTab(firstTabId);
  }
  
  // Check for hash in URL to activate specific tab
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const tabId = hash.replace('-section', '-tab');
    if (document.getElementById(tabId)) {
      activateTab(tabId);
    }
  }
});
</script>