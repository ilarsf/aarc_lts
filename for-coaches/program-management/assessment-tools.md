---
layout: coach
title: "Assessment Tools - AARC Learn to Scull Program"
search_exclude: true
---

# Assessment Tools

<div class="info-box tip">
  <h3>Evaluation Resources</h3>
  <p>These tools help coaches evaluate participant progress and provide structured feedback throughout the Learn to Scull program. Use them to track development, identify areas for improvement, and determine readiness for independent rowing.</p>
</div>

{% include accordion.html %}

<div class="accordion-controls">
  <button id="expand-all">Expand All</button>
  <button id="collapse-all">Collapse All</button>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">Participant Assessment Checklist</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <h3>Assessment Instructions</h3>
      <p>Complete this comprehensive assessment for each participant at the end of the program. The assessment evaluates technical skills, safety awareness, and readiness for independent sculling.</p>
      
      {% for i in (1..6) %}
      <div class="assessment-checklist participant-assessment-{{ i }}">
        <h3>Participant {{ i }} Information</h3>
        <div class="form-group">
          <label for="participant-name-{{ i }}">Name:</label>
          <input type="text" id="participant-name-{{ i }}" class="form-control participant-name">
        </div>
        <div class="form-group">
          <label for="program-dates-{{ i }}">Program Dates:</label>
          <input type="text" id="program-dates-{{ i }}" class="form-control program-dates">
        </div>
        <div class="form-group">
          <label for="coach-name-{{ i }}">Coach:</label>
          <input type="text" id="coach-name-{{ i }}" class="form-control coach-name">
        </div>
        
        <h3>Assessment Scale</h3>
        <p>For each skill, rate the participant using the following scale:</p>
        <ol>
          <li><strong>Needs significant improvement</strong> - Requires constant guidance and supervision</li>
          <li><strong>Developing</strong> - Understands concepts but inconsistent in execution</li>
          <li><strong>Competent</strong> - Can perform skill safely with minimal guidance</li>
          <li><strong>Proficient</strong> - Demonstrates consistent technique with independence</li>
        </ol>
        
        <h3>Boat Handling Skills</h3>
        <table class="assessment-table">
          <tr>
            <th>Skill</th>
            <th>Rating</th>
            <th>Comments</th>
          </tr>
          <tr>
            <td>Carries boat safely with proper technique</td>
            <td>
              <select id="boat-handling-carries-{{ i }}" class="form-control boat-handling-carries">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="boat-handling-carries-comments-{{ i }}" class="form-control boat-handling-carries-comments"></td>
          </tr>
          <tr>
            <td>Launches boat properly from dock</td>
            <td>
              <select id="boat-handling-launches-{{ i }}" class="form-control boat-handling-launches">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="boat-handling-launches-comments-{{ i }}" class="form-control boat-handling-launches-comments"></td>
          </tr>
          <tr>
            <td>Handles oars properly</td>
            <td>
              <select id="boat-handling-oars-{{ i }}" class="form-control boat-handling-oars">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="boat-handling-oars-comments-{{ i }}" class="form-control boat-handling-oars-comments"></td>
          </tr>
          <tr>
            <td>Lands boat safely at dock</td>
            <td>
              <select id="boat-handling-lands-{{ i }}" class="form-control boat-handling-lands">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="boat-handling-lands-comments-{{ i }}" class="form-control boat-handling-lands-comments"></td>
          </tr>
        </table>
        
        <h3>Technical Rowing Skills</h3>
        <table class="assessment-table">
          <tr>
            <th>Skill</th>
            <th>Rating</th>
            <th>Comments</th>
          </tr>
          <tr>
            <td>Demonstrates proper recovery sequencing</td>
            <td>
              <select id="tech-rowing-recovery-{{ i }}" class="form-control tech-rowing-recovery">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="tech-rowing-recovery-comments-{{ i }}" class="form-control tech-rowing-recovery-comments"></td>
          </tr>
          <tr>
            <td>Maintains proper blade depth</td>
            <td>
              <select id="tech-rowing-blade-depth-{{ i }}" class="form-control tech-rowing-blade-depth">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="tech-rowing-blade-depth-comments-{{ i }}" class="form-control tech-rowing-blade-depth-comments"></td>
          </tr>
          <tr>
            <td>Demonstrates proper drive sequence</td>
            <td>
              <select id="tech-rowing-drive-sequence-{{ i }}" class="form-control tech-rowing-drive-sequence">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="tech-rowing-drive-sequence-comments-{{ i }}" class="form-control tech-rowing-drive-sequence-comments"></td>
          </tr>
          <tr>
            <td>Maintains consistent rhythm</td>
            <td>
              <select id="tech-rowing-rhythm-{{ i }}" class="form-control tech-rowing-rhythm">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="tech-rowing-rhythm-comments-{{ i }}" class="form-control tech-rowing-rhythm-comments"></td>
          </tr>
          <tr>
            <td>Controls boat feathering and squaring</td>
            <td>
              <select id="tech-rowing-feathering-{{ i }}" class="form-control tech-rowing-feathering">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="tech-rowing-feathering-comments-{{ i }}" class="form-control tech-rowing-feathering-comments"></td>
          </tr>
        </table>
        
        <h3>Safety and Navigation</h3>
        <table class="assessment-table">
          <tr>
            <th>Skill</th>
            <th>Rating</th>
            <th>Comments</th>
          </tr>
          <tr>
            <td>Successfully completed flip test</td>
            <td>
              <select id="safety-nav-flip-test-{{ i }}" class="form-control safety-nav-flip-test">
                <option>Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="na">N/A</option>
              </select>
            </td>
            <td><input type="text" id="safety-nav-flip-test-comments-{{ i }}" class="form-control safety-nav-flip-test-comments"></td>
          </tr>
          <tr>
            <td>Demonstrates awareness of river traffic pattern</td>
            <td>
              <select id="safety-nav-traffic-pattern-{{ i }}" class="form-control safety-nav-traffic-pattern">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="safety-nav-traffic-pattern-comments-{{ i }}" class="form-control safety-nav-traffic-pattern-comments"></td>
          </tr>
          <tr>
            <td>Applies appropriate safety practices</td>
            <td>
              <select id="safety-nav-practices-{{ i }}" class="form-control safety-nav-practices">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="safety-nav-practices-comments-{{ i }}" class="form-control safety-nav-practices-comments"></td>
          </tr>
          <tr>
            <td>Demonstrates ability to steer effectively</td>
            <td>
              <select id="safety-nav-steering-{{ i }}" class="form-control safety-nav-steering">
                <option>Select...</option>
                <option value="1">1 - Needs significant improvement</option>
                <option value="2">2 - Developing</option>
                <option value="3">3 - Competent</option>
                <option value="4">4 - Proficient</option>
              </select>
            </td>
            <td><input type="text" id="safety-nav-steering-comments-{{ i }}" class="form-control safety-nav-steering-comments"></td>
          </tr>
        </table>
        
        <h3>Overall Assessment</h3>
        <div class="form-group">
          <label for="overall-strengths-{{ i }}">Participant Strengths:</label>
          <textarea id="overall-strengths-{{ i }}" class="form-control overall-strengths" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="development-areas-{{ i }}">Areas for Development:</label>
          <textarea id="development-areas-{{ i }}" class="form-control development-areas" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="recommendations-{{ i }}">Recommendations for Next Steps:</label>
          <textarea id="recommendations-{{ i }}" class="form-control recommendations" rows="3"></textarea>
        </div>
        
        <h3>Program Completion Status</h3>
        <div class="form-group">
          <label>Recommendation:</label>
          <div class="radio-options">
            <label>
              <input type="radio" name="completion-status-{{ i }}" value="ready" class="completion-status-ready">
              Ready for independent sculling
            </label>
            <label>
              <input type="radio" name="completion-status-{{ i }}" value="additional" class="completion-status-additional">
              Additional supervised practice recommended
            </label>
            <label>
              <input type="radio" name="completion-status-{{ i }}" value="not-ready" class="completion-status-not-ready">
              Not ready for independent sculling
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="coach-signature-{{ i }}">Coach Signature:</label>
          <input type="text" id="coach-signature-{{ i }}" class="form-control coach-signature">
        </div>
        <div class="form-group">
          <label for="assessment-date-{{ i }}">Date:</label>
          <input type="date" id="assessment-date-{{ i }}" class="form-control assessment-date">
        </div>
        
        <div class="form-actions">
          <button class="cta-button print-assessment-button" data-participant="{{ i }}">Print Assessment</button>
          <button class="cta-button save-pdf-button" data-participant="{{ i }}">Save as PDF</button>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">Session-by-Session Progress Tracker</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <p>Use this tracker to monitor participant progress after each session. This helps identify areas for focus in subsequent sessions.</p>
      
      {% for i in (1..6) %}
      <div class="progress-tracker participant-progress-{{ i }}">
        <h3>Participant {{ i }} Progressive Skill Tracking</h3>
        <div class="form-group">
          <label for="participant-name-progress-{{ i }}">Name:</label>
          <input type="text" id="participant-name-progress-{{ i }}" class="form-control participant-name-progress">
        </div>
        <table class="progress-table">
          <tr>
            <th>Skill Area</th>
            <th>Session 1</th>
            <th>Session 2</th>
            <th>Session 3</th>
            <th>Session 4</th>
          </tr>
          <tr>
            <td>Balance & Stability</td>
            <td>
              <select id="balance-stability-s1-{{ i }}" class="compact-select balance-stability-s1">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="balance-stability-s2-{{ i }}" class="compact-select balance-stability-s2">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="balance-stability-s3-{{ i }}" class="compact-select balance-stability-s3">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="balance-stability-s4-{{ i }}" class="compact-select balance-stability-s4">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Recovery Sequence</td>
            <td>
              <select id="recovery-sequence-s1-{{ i }}" class="compact-select recovery-sequence-s1">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="recovery-sequence-s2-{{ i }}" class="compact-select recovery-sequence-s2">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="recovery-sequence-s3-{{ i }}" class="compact-select recovery-sequence-s3">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="recovery-sequence-s4-{{ i }}" class="compact-select recovery-sequence-s4">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Blade Control</td>
            <td>
              <select id="blade-control-s1-{{ i }}" class="compact-select blade-control-s1">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="blade-control-s2-{{ i }}" class="compact-select blade-control-s2">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="blade-control-s3-{{ i }}" class="compact-select blade-control-s3">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="blade-control-s4-{{ i }}" class="compact-select blade-control-s4">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Drive Phase</td>
            <td>
              <select id="drive-phase-s1-{{ i }}" class="compact-select drive-phase-s1">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="drive-phase-s2-{{ i }}" class="compact-select drive-phase-s2">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="drive-phase-s3-{{ i }}" class="compact-select drive-phase-s3">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="drive-phase-s4-{{ i }}" class="compact-select drive-phase-s4">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Safety Awareness</td>
            <td>
              <select id="safety-awareness-s1-{{ i }}" class="compact-select safety-awareness-s1">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="safety-awareness-s2-{{ i }}" class="compact-select safety-awareness-s2">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="safety-awareness-s3-{{ i }}" class="compact-select safety-awareness-s3">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
            <td>
              <select id="safety-awareness-s4-{{ i }}" class="compact-select safety-awareness-s4">
                <option value="">-</option>
                <option value="✓">✓</option>
                <option value="!">!</option>
                <option value="X">X</option>
              </select>
            </td>
          </tr>
        </table>
        
        <div class="legend">
          <p><strong>Legend:</strong> ✓ = Proficient  |  ! = Needs attention  |  X = Significant issue  |  - = Not assessed</p>
        </div>
      </div>
      
      <div class="notes-section">
        <h3>Participant {{ i }} Session Notes</h3>
        
        <div class="session-notes">
          <h4>Session 1 Notes</h4>
          <textarea id="session-1-notes-{{ i }}" class="form-control session-1-notes" rows="3"></textarea>
          <h4>Session 2 Notes</h4>
          <textarea id="session-2-notes-{{ i }}" class="form-control session-2-notes" rows="3"></textarea>
          <h4>Session 3 Notes</h4>
          <textarea id="session-3-notes-{{ i }}" class="form-control session-3-notes" rows="3"></textarea>
          <h4>Session 4 Notes</h4>
          <textarea id="session-4-notes-{{ i }}" class="form-control session-4-notes" rows="3"></textarea>
        </div>
      </div>
      {% if i < 6 %}<hr>{% endif %}
      {% endfor %}
    </div>
  </div>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">Video Assessment Guidelines</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <p>Using video for assessment provides objective documentation of participant progress and can be a powerful coaching tool. Follow these guidelines when recording and reviewing assessment videos.</p>
      
      <h3>Recording Standards</h3>
      <ul>
        <li>Capture each participant from at least two angles (side and bow/stern view)</li>
        <li>Record during sessions 1 and 4 at minimum for comparison</li>
        <li>Ensure proper participant permission is obtained before recording</li>
        <li>Include 30-60 seconds of continuous rowing for each recording</li>
      </ul>
      
      <h3>Analysis Framework</h3>
      <div class="video-analysis-framework">
        <table class="analysis-table">
          <tr>
            <th>Technical Element</th>
            <th>What to Look For</th>
          </tr>
          <tr>
            <td>Posture</td>
            <td>
              <ul>
                <li>Straight back throughout stroke</li>
                <li>Shoulders relaxed and down</li>
                <li>Head in neutral position</li>
                <li>Core engagement during drive</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Sequencing</td>
            <td>
              <ul>
                <li>Clear separation of recovery phases (hands-body-slide)</li>
                <li>Sequential power application on drive (legs-back-arms)</li>
                <li>Appropriate body angle at catch and finish</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Blade Work</td>
            <td>
              <ul>
                <li>Clean entry and exit</li>
                <li>Consistent blade depth</li>
                <li>Proper feathering and squaring timing</li>
                <li>Effective use of water</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Balance/Stability</td>
            <td>
              <ul>
                <li>Minimal gunwale touching</li>
                <li>Level boat through recovery</li>
                <li>Stability during drive phase</li>
                <li>Handling of recovery during unbalanced moments</li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
      
      <h3>Video Feedback Session Guidelines</h3>
      <ol>
        <li>Review video privately before sharing with participant</li>
        <li>Always start feedback with positive observations</li>
        <li>Focus on 2-3 key improvements at most</li>
        <li>Use side-by-side comparison with model technique when helpful</li>
        <li>Connect observed issues to specific drills for improvement</li>
      </ol>
    </div>
  </div>
</div>

<div class="resource-links mt-4">
  <h3>Assessment Resources</h3>
  <ul>
    <li><a href="{{ site.baseurl }}/assets/pdf/assessment_checklist_printable.pdf" download>Printable Assessment Form</a></li>
    <li><a href="{{ site.baseurl }}/assets/pdf/progress_tracker_printable.pdf" download>Printable Progress Tracker</a></li>
    <li><a href="{{ site.baseurl }}/for-coaches/technical-coaching/video-analysis.html">Video Analysis Guide</a></li>
  </ul>
</div>

<style>
  .assessment-checklist {
    background-color: #f8f9fa;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .assessment-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0 2rem;
  }
  
  .assessment-table th, .assessment-table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
  }
  
  .assessment-table th {
    background-color: #f3f4f5;
    text-align: left;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }
  
  .form-actions {
    margin-top: 2rem;
    text-align: center;
  }
  
  .radio-options {
    display: flex;
    flex-direction: column;
  }
  
  .radio-options label {
    margin-bottom: 0.5rem;
  }
  
  .progress-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .compact-select {
    width: 100%;
    padding: 0.25rem;
  }
  
  .legend {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    text-align: center;
  }
  
  .session-notes {
    margin-top: 1rem;
  }
  
  .session-notes h4 {
    margin-bottom: 0.5rem;
  }
  
  .video-analysis-framework {
    margin: 1rem 0;
  }
  
  .analysis-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .analysis-table th, .analysis-table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    vertical-align: top;
  }
  
  .analysis-table th {
    background-color: #f3f4f5;
    width: 25%;
  }

  .assessment-table tbody tr:nth-child(odd),
  .progress-table tbody tr:nth-child(odd) {
    background-color: #f9f9f9; /* Light gray for odd rows */
  }
</style>
