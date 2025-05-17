---
layout: default
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

### Boat Handling

* **Carrying Boats:** Always lift with proper technique and adequate help. Ask for help taking the boat on or off of its rack and carrying, if needed. Listen to experienced rowers regarding the correct carrying positions.
* **Using Slings/Stretchers:** Place boats carefully on stretchers when adjusting foot stretchers or performing maintenance.
* **Step Ladders:** Use the provided step ladders for reaching high racks; never climb on the racks themselves. Return ladders to their designated storage locations after use.

### Boat Maintenance

1. **Cleaning the Boat**  
   Before putting the boat back on its rack, place it on the stretchers/slings and thoroughly wipe it down using a rag/towel provided by the club. Take the time necessary to CLEAN the boat, not just dry it. Once the river scum dries, it is very difficult to remove. This ensures the equipment is clean and ready for the next use.

2. **Storing the Boat**  
   After cleaning, place the boat back in its original rack position. Note how and where your boat is stored and return it to the same place and position. All boats on the outside rack have bows pointed to the boathouse. Ensure the riggers align with those of other boats on the rack to maintain uniformity and balance. Strap outside boats snugly onto the rack (1Xs should not be tightened as much as a sweep boat). Make sure it is properly supported to prevent damage.

3. **Reporting Issues**  
   Please note any issues with the equipment in the logbook. If there is significant damage, also notify a coach or club officer immediately.

### Oar Care and Storage

* **Oar Storage:** Return oars to their designated racks after use, as indicated by the rack labels, with blades facing in the correct direction.

* **Oar Cleaning:** After each use, rinse oars with fresh water if available, paying special attention to the collars and gates.

* **Oar Handles**  
   Routinely disinfect oar handles after each row. This is crucial for maintaining hygiene and preventing the spread of germs, especially given the likelihood of blisters and potential bleeding. Additionally, it removes residues from bandages or tapes some rowers might use.

* **Tape Removal:** If you've used tape for blisters, remove residues completely after your row. Sticky residue makes handles uncomfortable for the next user.

## Considerate Use of Facilities

* **Bathroom Facilities:** Note that there are only public toilets without running water available. Please plan accordingly.
* **Changing:** There are no dedicated changing rooms at this facility. Come dressed appropriately or be prepared to change discreetly.
* **Trash:** Dispose of all waste properly and recycle when possible.
* **Personal Items:** Do not leave valuables unattended in the boathouse.

## Equipment Respect Philosophy

Remember that rowing equipment is both expensive and delicate. Approach each interaction with equipment by following these principles:

* **Respect Your Future Self:** The care you take now ensures the equipment will be in good condition for your next row.
* **Respect Your Peers:** Other rowers deserve to use well-maintained equipment just as you do.
* **Respect the Club's Investment:** Proper care of equipment protects the club's financial investment and allows resources to be directed to improvements rather than replacements.

<div class="info-box tip">
  <h4>Ask When Unsure</h4>
  <p>If you're unsure about any aspect of equipment handling or boathouse procedures, ask an experienced member or coach. It's better to ask than to risk damaging equipment or breaking protocol.</p>
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