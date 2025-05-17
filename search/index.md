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
    <a href="#" data-search="weather">Weather Policy</a>
    <a href="#" data-search="terminology">Rowing Terms</a>
    <a href="#" data-search="common fixes">Technique Fixes</a>
    <a href="#" data-search="video">Instructional Videos</a>
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
        <li><a href="{{ site.baseurl }}/course_materials/learner/technical/Common_Rowing_Fixes.html">Common Rowing Fixes</a> - Solutions to technique problems</li>
      </ul>
    </div>
    <div>
      <h4>Quick Guides</h4>
      <ul class="mb-0">
        <li><a href="{{ site.baseurl }}/src/Sculling_Self_Rescue_Guide.html">Self-Rescue Guide</a> - Recovering from a capsize</li>
        <li><a href="{{ site.baseurl }}/src/Sculling_Self_Rescue_Guide.html">Self-Rescue & Flip Test Guide</a> - Step-by-step guide</li>
        <li><a href="{{ site.baseurl }}/src/Rowers_Hand_Blister_Treatment.html">Hand Care Guide</a> - Treating rowing blisters</li>
        <li><a href="{{ site.baseurl }}/course_materials/learner/safety/River_Traffic_Guide.html">River Traffic Guide</a> - Navigation rules</li>
        <li><a href="{{ site.baseurl }}/course_materials/learner/technical/Instructional_Videos.html">Instructional Videos</a> - Visual learning resources</li>
      </ul>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get the base URL for the site to process paths correctly
  const siteBaseUrl = '{{ site.baseurl }}';
  console.log('Site baseUrl:', siteBaseUrl);
  
  // Debug function to help identify any path processing issues
  function debugPath(original, processed) {
    console.debug(`Path processing: "${original}" → "${processed}"`);
    return processed;
  }
  
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
    // Learn to Scull Program pages
    { title: "Learn to Scull Program", path: "{{ site.baseurl }}/", keywords: "learn scull rowing program overview intensive weekend introduction beginner novice start learning new rower", summary: "Overview of the Learn to Scull program, including program features, schedule, and requirements." },
    { title: "Program Schedule", path: "{{ site.baseurl }}/course_materials/learner/Program_Schedule.html", keywords: "schedule sessions weekend timing format progression four saturday sunday morning 8am class dates times meeting", summary: "Details about the four-session weekend intensive format including times, dates, and session progression." },
    { title: "Learner's Guide", path: "{{ site.baseurl }}/course_materials/learner/Learner_Guide.html", keywords: "guide instructions basics technique rowing motion stroke sculling catch drive finish recovery feathering square blade", summary: "Comprehensive guide to sculling concepts and techniques for beginners." },
    { title: "Q&A Companion", path: "{{ site.baseurl }}/course_materials/learner/QA_Companion.html", keywords: "questions answers FAQ frequently asked common concerns program length requirements prerequisites what to wear clothing attire", summary: "Answers to frequently asked questions about the Learn to Scull program." },
    { title: "Quick Answers", path: "{{ site.baseurl }}/quick-answers/", keywords: "quick help fast answers immediate resources quick reference common questions lookup find information", summary: "Quick reference guide to common questions and resources organized by topic." },
    
    // Safety pages
    { title: "Self-Rescue & Flip Test Guide", path: "{{ site.baseurl }}/src/Sculling_Self_Rescue_Guide.html", keywords: "flip test capsizing practice self rescue demonstration requirements wet exit capsize drill procedure walk through recovery get back in", summary: "Comprehensive guide covering both the flip test procedure and self-rescue techniques required for all AARC scullers." },
    { title: "River Traffic Guide", path: "{{ site.baseurl }}/course_materials/learner/safety/River_Traffic_Guide.html", keywords: "river traffic pattern navigation rules right-of-way direction clockwise counter-clockwise starboard port side map waterway", summary: "Guidelines for navigating Argo pond and understanding river traffic patterns." },
    { title: "Weather Guidelines", path: "{{ site.baseurl }}/course_materials/learner/safety/Weather_Guidelines.html", keywords: "weather conditions wind rain lightning thunder temperature cold hot cancellation policy meters per second whitecaps waves fog visibility", summary: "Safety guidelines for rowing in various weather conditions." },
    { title: "Safety Rules", path: "{{ site.baseurl }}/src/AARC_Safety_Rules.pdf", keywords: "safety rules regulations requirements emergency procedures visibility lights life jacket PFD flotation device rowing alone buddy system sign out log", summary: "Essential safety guidelines for all AARC rowers." },
    { title: "Emergency Procedures", path: "{{ site.baseurl }}/coach_portal/safety/Emergency_Procedures.html", keywords: "emergency procedures first aid injury accident response protocol help rescue call 911 medical", summary: "Step-by-step procedures for handling emergency situations at the boathouse or on the water." },
    
    // Technical resources
    { title: "Hand Care Guide", path: "{{ site.baseurl }}/src/Rowers_Hand_Blister_Treatment.html", keywords: "hand care blisters calluses treatment prevention gloves tape hands hurt sore pain palms fingers", summary: "Preventing and treating hand blisters from rowing." },
    { title: "Rowing Terminology", path: "{{ site.baseurl }}/textbook/chapters/part5.html#appendix-a-glossary-of-rowing-terms", keywords: "terms vocabulary glossary dictionary rowing language jargon definitions technical words boat parts oar", summary: "Comprehensive glossary of rowing terms and their definitions." },
    { title: "Boathouse Rules", path: "{{ site.baseurl }}/src/Boathouse_Rules_and_Equipment_Care.html", keywords: "boathouse rules equipment care storage handling respect boat rack carrying lifting launching", summary: "Rules for using the boathouse facilities and caring for equipment." },
    { title: "Common Rowing Fixes", path: "{{ site.baseurl }}/course_materials/learner/technical/Common_Rowing_Fixes.html", keywords: "technical fixes problems issues troubleshooting common mistakes corrections technique tips help advice rushing forward early square late square catching air blade depth", summary: "Solutions for common technical issues that beginner rowers experience." },
    { title: "Instructional Videos", path: "{{ site.baseurl }}/course_materials/learner/technical/Instructional_Videos.html", keywords: "videos tutorials demonstrations visual instruction technique youtube learning resources watch see demonstrations", summary: "Curated collection of instructional videos demonstrating proper rowing technique and skills." },
    { title: "Technical Frameworks", path: "{{ site.baseurl }}/course_materials/learner/technical/Technical_Frameworks.html", keywords: "technique frameworks models approaches teaching methods concepts body position posture stroke sequence", summary: "Analytical frameworks for understanding and teaching proper rowing technique." },
    
    // Coach resources
    { title: "Coach Manual", path: "{{ site.baseurl }}/coach_portal/manual/Coach_Manual.html", keywords: "coach manual instructor teaching guide methods approach philosophy training development skill", summary: "Comprehensive guide for coaches teaching the Learn to Scull program." },
    { title: "Daily Coach Checklist", path: "{{ site.baseurl }}/assets/pdf/daily_coach_checklist.html", keywords: "coach checklist preparation session planning daily tasks equipment safety checks before class", summary: "Daily checklist to ensure coaches are prepared for each session." },
    { title: "Session 1 Plan", path: "{{ site.baseurl }}/coach_portal/session_plans/Session_1_Plan.html", keywords: "session 1 plan first lesson introduction basics flip test getting in out boat initial", summary: "Detailed plan for teaching the first session of the Learn to Scull program." },
    { title: "Session 2 Plan", path: "{{ site.baseurl }}/coach_portal/session_plans/Session_2_Plan.html", keywords: "session 2 plan second lesson technique development stroke catch drive hands away sequencing", summary: "Detailed plan for teaching the second session of the Learn to Scull program." },
    { title: "Session 3 Plan", path: "{{ site.baseurl }}/coach_portal/session_plans/Session_3_Plan.html", keywords: "session 3 plan third lesson advanced skills balance recovery body angle blade work", summary: "Detailed plan for teaching the third session of the Learn to Scull program." },
    { title: "Session 4 Plan", path: "{{ site.baseurl }}/coach_portal/session_plans/Session_4_Plan.html", keywords: "session 4 plan fourth final lesson navigation independence river rules traffic pattern", summary: "Detailed plan for teaching the fourth session of the Learn to Scull program." },
    { title: "Key Drills Repertoire", path: "{{ site.baseurl }}/coach_portal/technical/Key_Drills_Repertoire.html", keywords: "drills exercises practice technique development skill building progression coaching tools methods", summary: "Comprehensive collection of drills for teaching and improving rowing skills." },
    { title: "Technical Corrections", path: "{{ site.baseurl }}/coach_portal/technical/Common_Technical_Issues_and_Corrections.html", keywords: "technical corrections issues problems fixes coaching advice teaching troubleshooting technique", summary: "Guide for coaches on identifying and correcting common rowing technique issues." },
    
    // Communication resources
    { title: "Email Templates", path: "{{ site.baseurl }}/coach_portal/communication/Email_Templates.html", keywords: "email templates communication participants class information updates correspondence messages", summary: "Templates for coach-participant communication throughout the program." },
    { title: "Weather Email Templates", path: "{{ site.baseurl }}/coach_portal/communication/Weather_Email_Templates.html", keywords: "weather cancellation delay email communication templates reschedule contingency plan", summary: "Communication templates for weather-related changes to the program schedule." },
    { title: "Introduction Package", path: "{{ site.baseurl }}/coach_portal/communication/IntroPackage.html", keywords: "introduction welcome info package preparation what to bring what to wear before starting", summary: "Welcome information for new participants before the program begins." },
    { title: "Session 1 Package", path: "{{ site.baseurl }}/coach_portal/communication/Session1_Package.html", keywords: "session 1 first getting started introduction day one preparation info", summary: "Information about the first session of the Learn to Scull program." },
    { title: "Session 2 Package", path: "{{ site.baseurl }}/coach_portal/communication/Session2_Package.html", keywords: "session 2 second building foundation day two preparation info", summary: "Information about the second session of the Learn to Scull program." },
    { title: "Session 3 Package", path: "{{ site.baseurl }}/coach_portal/communication/Session3_Package.html", keywords: "session 3 third learning push day three preparation info", summary: "Information about the third session of the Learn to Scull program." },
    { title: "Session 4 Package", path: "{{ site.baseurl }}/coach_portal/communication/Session4_Package.html", keywords: "session 4 fourth final navigation independence day four preparation info", summary: "Information about the fourth and final session of the Learn to Scull program." },
    { title: "Post-Course Package", path: "{{ site.baseurl }}/coach_portal/communication/PostCourse_Package.html", keywords: "post course after completion next steps continuing rowing club membership graduation", summary: "Information for participants after completing the Learn to Scull program." },
    
    // Textbook chapters 
    { title: "Textbook: Getting Started", path: "{{ site.baseurl }}/textbook/chapters/part1.html", keywords: "textbook part 1 getting started introduction overview program structure components", summary: "First section of the comprehensive textbook covering program introduction and overview." },
    { title: "Textbook: For the Learner", path: "{{ site.baseurl }}/textbook/chapters/part2.html", keywords: "textbook part 2 learner information technique development sequence progression skills", summary: "Second section of the comprehensive textbook with detailed instruction for learners." },
    { title: "Textbook: Safety", path: "{{ site.baseurl }}/textbook/chapters/part3.html", keywords: "textbook part 3 safety procedures protocols emergency management risk assessment prevention", summary: "Third section of the comprehensive textbook covering all safety aspects of rowing." },
    { title: "Coach Textbook", path: "{{ site.baseurl }}/coach_portal/textbook/coach_complete.html", keywords: "textbook coach teaching instruction methodology pedagogy session design", summary: "Comprehensive textbook with guidance for coaches in the Learn to Scull program." },
    { title: "Textbook: Appendices", path: "{{ site.baseurl }}/textbook/chapters/part4.html", keywords: "textbook part 4 appendices glossary terms definitions resources reference materials", summary: "Fourth section of the comprehensive textbook with reference materials and appendices." },
    { title: "Complete Textbook", path: "{{ site.baseurl }}/textbook/all.html", keywords: "textbook complete full comprehensive guide reference all chapters combined entire", summary: "Complete course materials in a traditional textbook format with all chapters combined." },
    
    // Assessment and knowledge checks
    { title: "Knowledge Check Quizzes", path: "{{ site.baseurl }}/src/quiz_module.html", keywords: "quiz quizzes test questions assessment learning check knowledge verification understanding", summary: "Interactive quizzes to test your knowledge of rowing concepts and safety." },
    { title: "Participant Assessment", path: "{{ site.baseurl }}/coach_portal/assessment/Participant_Assessment_Checklist.html", keywords: "assessment evaluation progress skills checklist competency mastery tracking learning", summary: "Checklist for coaches to track participant progress and skill development." },
    
    // Additional resources
    { title: "Meet Our Team", path: "{{ site.baseurl }}/team/", keywords: "team coaches instructors staff experience background expertise qualifications certifications", summary: "Information about the AARC Learn to Scull coaching team." },
    { title: "About AARC", path: "{{ site.baseurl }}/about/", keywords: "about AARC Ann Arbor Rowing Club history mission values organization structure club information", summary: "Information about the Ann Arbor Rowing Club, its history, and mission." },
    { title: "Club Policies", path: "{{ site.baseurl }}/textbook/chapters/part5.html#appendix-b-aarc-policies", keywords: "policies rules procedures code conduct safesport behavior expectations membership requirements", summary: "AARC club policies including Code of Conduct and SafeSport Policy." },
    { title: "Resources", path: "{{ site.baseurl }}/resources/", keywords: "resources additional materials references links external websites books videos", summary: "Additional resources for rowers beyond the Learn to Scull program." }
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
      // Process the path to replace the Liquid tag with the actual baseUrl
      let pathWithRealBaseUrl;
      
      try {
        // Process path with more robust error handling
        if (result.path.includes('{{ site.baseurl }}')) {
          pathWithRealBaseUrl = result.path.replace(/\{\{\s*site\.baseurl\s*\}\}/g, siteBaseUrl);
        } else {
          // If no template tags found, just use path directly
          pathWithRealBaseUrl = result.path;
        }
        
        // Add leading slash if missing and not external URL
        if (!pathWithRealBaseUrl.startsWith('/') && 
            !pathWithRealBaseUrl.startsWith('http') &&
            !pathWithRealBaseUrl.startsWith(siteBaseUrl)) {
          pathWithRealBaseUrl = '/' + pathWithRealBaseUrl;
        }
      } catch (error) {
        console.error('Error processing path:', error, result.path);
        pathWithRealBaseUrl = '#'; // Fallback to prevent broken links
      }
      
      titleLink.href = pathWithRealBaseUrl;
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
  background-color: #f2f7ff;
  border: 1px solid #e0e9ff;
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  color: #0066cc;
  transition: all 0.2s ease;
  font-size: 14px;
}

.popular-searches a:hover {
  background-color: #e0e9ff;
  border-color: #0066cc;
  text-decoration: none !important;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .search-form {
    flex-direction: column;
  }
  
  #search-input {
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 16px; /* Prevents iOS zoom on focus */
    -webkit-appearance: none; /* Better iOS appearance */
  }
  
  #search-button {
    border-radius: 4px;
    width: 100%;
    padding: 12px;
  }
  
  .search-result-item {
    padding: 12px;
  }
  
  .search-result-title {
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 8px;
    display: block;
  }
  
  .two-col-grid {
    display: block;
  }
  
  .two-col-grid > div {
    margin-bottom: 20px;
  }
}
</style>
