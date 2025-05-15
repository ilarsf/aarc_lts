---
layout: default
title: Search - AARC Learn to Scull Program
---

<div class="search-container">
  <h1>Quick Search</h1>
  <p>Find answers quickly by searching across all Learn to Scull resources.</p>
  
  <div class="search-form">
    <input type="text" id="search-input" placeholder="Search for topics, terms, or questions..." aria-label="Search">
    <button id="search-button" class="cta-button">Search</button>
  </div>
  
  <div id="search-results">
    <p id="results-message"></p>
    <ul id="results-list"></ul>
  </div>
</div>

<div class="mt-4 info-box note">
  <h3>Popular Search Topics</h3>
  <div class="popular-searches">
    <a href="#" data-search="flip test">Flip Test</a>
    <a href="#" data-search="self rescue">Self-Rescue</a>
    <a href="#" data-search="rowing technique">Rowing Technique</a>
    <a href="#" data-search="hand blisters">Hand Care</a>
    <a href="#" data-search="equipment">Equipment</a>
    <a href="#" data-search="safety rules">Safety Rules</a>
    <a href="#" data-search="river traffic">River Traffic</a>
    <a href="#" data-search="program schedule">Schedule</a>
  </div>
</div>

<div class="mt-4 info-box tip">
  <h3>Direct Access Resources</h3>
  <div class="two-col-grid">
    <div>
      <h4>Common Questions</h4>
      <ul class="mb-0">
        <li><a href="{{ site.baseurl }}/course_materials/learner/QA_Companion.html">Q&A Companion</a> - Answers to frequently asked questions</li>
        <li><a href="{{ site.baseurl }}/course_materials/learner/Program_Schedule.html">Program Schedule</a> - Find details about class sessions</li>
        <li><a href="{{ site.baseurl }}/textbook/chapters/part5.html#appendix-a-glossary-of-rowing-terms">Rowing Terminology</a> - Glossary of rowing terms</li>
      </ul>
    </div>
    <div>
      <h4>Quick Guides</h4>
      <ul class="mb-0">
        <li><a href="{{ site.baseurl }}/src/Sculling_Self_Rescue_Guide.html">Self-Rescue Guide</a> - Recovering from a capsize</li>
        <li><a href="{{ site.baseurl }}/src/Rowers_Hand_Blister_Treatment.html">Hand Care Guide</a> - Treating rowing blisters</li>
        <li><a href="{{ site.baseurl }}/course_materials/learner/safety/River_Traffic_Guide.html">River Traffic Guide</a> - Navigation rules</li>
      </ul>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Check if there's a hash in the URL indicating a search term
  const hash = window.location.hash.substring(1);
  if (hash) {
    const searchTerm = decodeURIComponent(hash);
    document.getElementById('search-input').value = searchTerm;
    // Trigger search automatically
    setTimeout(function() {
      performSearch();
    }, 100);
  }

  // Search index content structure
  const searchIndex = [
    {% raw %}
    // Learn to Scull Program pages
    { title: "Learn to Scull Program", path: "{{ site.baseurl }}/", keywords: "learn scull rowing program overview intensive weekend introduction beginner", summary: "Overview of the Learn to Scull program, including program features, schedule, and requirements." },
    { title: "Program Schedule", path: "{{ site.baseurl }}/course_materials/learner/Program_Schedule.html", keywords: "schedule sessions weekend timing format progression four saturday sunday morning 8am", summary: "Details about the four-session weekend intensive format including times, dates, and session progression." },
    { title: "Learner's Guide", path: "{{ site.baseurl }}/course_materials/learner/Learner_Guide.html", keywords: "guide instructions basics technique rowing motion stroke sculling", summary: "Comprehensive guide to sculling concepts and techniques for beginners." },
    { title: "Q&A Companion", path: "{{ site.baseurl }}/course_materials/learner/QA_Companion.html", keywords: "questions answers FAQ frequently asked common concerns", summary: "Answers to frequently asked questions about the Learn to Scull program." },
    
    // Safety pages
    { title: "Self-Rescue Guide", path: "{{ site.baseurl }}/src/Sculling_Self_Rescue_Guide.html", keywords: "capsize flip falling in water safety rescue emergency recovery wet", summary: "Instructions for safely recovering from a capsize and getting back into your shell." },
    { title: "Flip Test Instructions", path: "{{ site.baseurl }}/src/AARC_Flip_Test_Instructions_20240803.html", keywords: "flip test capsizing practice self rescue demonstration requirements", summary: "Step-by-step guide for completing the capsize recovery test required for all AARC scullers." },
    { title: "River Traffic Guide", path: "{{ site.baseurl }}/course_materials/learner/safety/River_Traffic_Guide.html", keywords: "river traffic pattern navigation rules right-of-way direction", summary: "Guidelines for navigating Argo pond and understanding river traffic patterns." },
    { title: "Weather Guidelines", path: "{{ site.baseurl }}/course_materials/learner/safety/Weather_Guidelines.html", keywords: "weather conditions wind rain lightning thunder temperature cold hot", summary: "Safety guidelines for rowing in various weather conditions." },
    { title: "Safety Rules", path: "{{ site.baseurl }}/src/AARC_Safety_Rules.pdf", keywords: "safety rules regulations requirements emergency procedures visibility lights", summary: "Essential safety guidelines for all AARC rowers." },
    
    // Technical resources
    { title: "Hand Care Guide", path: "{{ site.baseurl }}/src/Rowers_Hand_Blister_Treatment.html", keywords: "hand care blisters calluses treatment prevention gloves tape", summary: "Preventing and treating hand blisters from rowing." },
    { title: "Rowing Terminology", path: "{{ site.baseurl }}/textbook/chapters/part5.html#appendix-a-glossary-of-rowing-terms", keywords: "terms vocabulary glossary dictionary rowing language", summary: "Comprehensive glossary of rowing terms and their definitions." },
    { title: "Boathouse Rules", path: "{{ site.baseurl }}/src/Boathouse_Rules_and_Equipment_Care.html", keywords: "boathouse rules equipment care storage handling respect", summary: "Rules for using the boathouse facilities and caring for equipment." },
    { title: "Technical Guides", path: "{{ site.baseurl }}/src/", keywords: "technical guides resources instructions manuals", summary: "Collection of technical guides and resources for the Learn to Scull program." },
    
    // Additional resources
    { title: "Meet Our Team", path: "{{ site.baseurl }}/team/", keywords: "team coaches instructors staff experience background", summary: "Information about the AARC Learn to Scull coaching team." },
    { title: "Club Policies", path: "{{ site.baseurl }}/textbook/chapters/part5.html#appendix-b-aarc-policies", keywords: "policies rules procedures code conduct safesport", summary: "AARC club policies including Code of Conduct and SafeSport Policy." },
    { title: "Knowledge Check Quizzes", path: "{{ site.baseurl }}/src/#knowledge-check-quizzes", keywords: "quiz quizzes test questions assessment learning check", summary: "Interactive quizzes to test your knowledge of rowing concepts and safety." },
    { title: "Textbook", path: "{{ site.baseurl }}/textbook/", keywords: "textbook complete comprehensive guide manual reference", summary: "Complete course materials in a traditional textbook format." },
    
    // Session-specific content
    { title: "Session 1", path: "{{ site.baseurl }}/course_materials/communication/Session1_Package.html", keywords: "session 1 first getting started introduction day one", summary: "Information about the first session of the Learn to Scull program." },
    { title: "Session 2", path: "{{ site.baseurl }}/course_materials/communication/Session2_Package.html", keywords: "session 2 second building foundation day two", summary: "Information about the second session of the Learn to Scull program." },
    { title: "Session 3", path: "{{ site.baseurl }}/course_materials/communication/Session3_Package.html", keywords: "session 3 third learning push day three", summary: "Information about the third session of the Learn to Scull program." },
    { title: "Session 4", path: "{{ site.baseurl }}/course_materials/communication/Session4_Package.html", keywords: "session 4 fourth final navigation independence day four", summary: "Information about the fourth and final session of the Learn to Scull program." }
    {% endraw %}
  ];

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const resultsMessage = document.getElementById('results-message');
  const resultsList = document.getElementById('results-list');
  
  // Add event listeners for search
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Set up popular search links
  const popularSearches = document.querySelectorAll('.popular-searches a');
  popularSearches.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const searchTerm = this.dataset.search;
      searchInput.value = searchTerm;
      performSearch();
    });
  });
  
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
      resultsMessage.textContent = 'Please enter a search term.';
      resultsList.innerHTML = '';
      return;
    }
    
    const results = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(searchTerm) || 
             item.keywords.toLowerCase().includes(searchTerm) ||
             item.summary.toLowerCase().includes(searchTerm);
    });
    
    displayResults(results, searchTerm);
  }
  
  function displayResults(results, searchTerm) {
    resultsList.innerHTML = '';
    
    if (results.length === 0) {
      resultsMessage.textContent = `No results found for "${searchTerm}".`;
      return;
    }
    
    resultsMessage.textContent = `Found ${results.length} results for "${searchTerm}":`;
    
    results.forEach(result => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      
      const titleLink = document.createElement('a');
      titleLink.href = result.path;
      titleLink.textContent = result.title;
      titleLink.className = 'search-result-title';
      
      const summary = document.createElement('p');
      summary.textContent = result.summary;
      summary.className = 'search-result-summary';
      
      li.appendChild(titleLink);
      li.appendChild(summary);
      resultsList.appendChild(li);
    });
  }
});
</script>

<style>
.search-container {
  max-width: 800px;
  margin: 0 auto;
}

.search-form {
  display: flex;
  margin: 20px 0;
}

#search-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px 0 0 4px;
}

#search-button {
  border-radius: 0 4px 4px 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.search-result-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.search-result-title {
  font-size: 18px;
  font-weight: bold;
  color: #0066cc;
  text-decoration: none;
}

.search-result-summary {
  margin-top: 5px;
  color: #333;
}

.popular-searches {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.popular-searches a {
  background-color: #eee;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.popular-searches a:hover {
  background-color: #ddd;
}

@media (max-width: 600px) {
  .search-form {
    flex-direction: column;
  }
  
  #search-input {
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  #search-button {
    border-radius: 4px;
  }
}
</style>
