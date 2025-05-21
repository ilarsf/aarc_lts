---
layout: default
title: Sculling Instructional Videos
description: A curated collection of high-quality instructional videos to support your learning
---

<link rel="stylesheet" href="{{ '/assets/css/video-gallery.css' | relative_url }}">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
  crossorigin="anonymous" referrerpolicy="no-referrer" />

# Sculling Instructional Video Library

This curated collection of high-quality instructional videos supports the Learn to Scull curriculum. Videos have been selected for clarity, accuracy, credible instruction, and good production quality, with preference for concise content under 10 minutes where appropriate.

<div class="video-gallery">
  <div class="video-filter-controls">
    <h3 class="filter-heading">Filter Videos</h3>
    
    <div class="filter-section">
      <p><strong>By Session:</strong></p>
      <div class="filter-buttons">
        <button id="show-all-videos" class="filter-button active">Show All</button>
        <button class="filter-button" data-filter="pre-course" data-filter-type="session">Before First Session</button>
        <button class="filter-button" data-filter="session1" data-filter-type="session">Session 1</button>
        <button class="filter-button" data-filter="session2" data-filter-type="session">Session 2</button>
        <button class="filter-button" data-filter="session3" data-filter-type="session">Session 3</button>
        <button class="filter-button" data-filter="session4" data-filter-type="session">Session 4</button>
        <button class="filter-button" data-filter="post-course" data-filter-type="session">After Course</button>
      </div>
    </div>
    
    <div class="filter-section">
      <p><strong>By Skill Focus:</strong></p>
      <div class="filter-buttons">
        <button class="filter-button" data-filter="basics" data-filter-type="skill">Basics</button>
        <button class="filter-button" data-filter="safety" data-filter-type="skill">Safety</button>
        <button class="filter-button" data-filter="equipment" data-filter-type="skill">Equipment</button>
        <button class="filter-button" data-filter="technique" data-filter-type="skill">Technique</button>
        <button class="filter-button" data-filter="drills" data-filter-type="skill">Drills</button>
        <button class="filter-button" data-filter="advanced" data-filter-type="skill">Advanced</button>
      </div>
    </div>
    
    <div class="filter-section">
      <p><strong>By Stroke Phase:</strong></p>
      <div class="filter-buttons">
        <button class="filter-button" data-filter="stroke-overview" data-filter-type="topic">Full Stroke</button>
        <button class="filter-button" data-filter="catch" data-filter-type="topic">Catch</button>
        <button class="filter-button" data-filter="drive" data-filter-type="topic">Drive</button>
        <button class="filter-button" data-filter="finish" data-filter-type="topic">Finish</button>
        <button class="filter-button" data-filter="recovery" data-filter-type="topic">Recovery</button>
        <button class="filter-button" data-filter="feathering" data-filter-type="topic">Feathering</button>
      </div>
    </div>
    
    <div class="filter-section">
      <label for="video-search"><strong>Search Videos:</strong></label>
      <input type="text" id="video-search" placeholder="Enter keywords..." class="form-control">
    </div>
    
    <div id="no-video-results" style="display: none;">
      <p>No videos match your selected filters. Try adjusting your criteria or click "Show All" to see all videos.</p>
    </div>
  </div>

  <h2>Video Collection</h2>

  <div class="video-grid">

    <!-- Introduction to Sculling -->
    <div class="video-card" data-sessions="pre-course" data-skills="basics" data-topics="stroke-overview">
      <div class="video-thumbnail" data-video-id="eTerbM8Uhxc">
        <iframe src="https://www.youtube.com/embed/eTerbM8Uhxc" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Sculling vs. Sweep – Rowing Boat Classes Explained</h3>
        <div class="video-meta">
          <span class="video-creator">World Rowing</span>
          <span class="video-duration">2:55</span>
        </div>
        <div class="video-description">
          Explains what sculling is (using two oars per rower) versus sweep rowing (one oar per rower) and introduces the different boat types (singles, doubles, fours, etc.). A great primer on where single sculling fits into the sport.
        </div>
        <div class="video-tags">
          <span class="video-tag">Introduction</span>
          <span class="video-tag">Basics</span>
          <span class="video-tag">Pre-Course</span>
        </div>
      </div>
    </div>

    <!-- Getting Ready to Row on the Rowing Machine -->
    <div class="video-card" data-sessions="pre-course session1" data-skills="basics equipment" data-topics="equipment">
      <div class="video-thumbnail" data-video-id="4WyHEL-9xKM">
        <iframe src="https://www.youtube.com/embed/4WyHEL-9xKM" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Getting Ready to Row on the Rowing Machine with Concept2</h3>
        <div class="video-meta">
          <span class="video-creator">concept2usa</span>
          <span class="video-duration">0:49</span>
        </div>
        <div class="video-description">
          It's easy to get started on the Concept2 RowErg. This video will guide you through setting the damper, adjusting the foot straps, and getting you started using the powerful Concept2 Performance Monitor.
        </div>
        <div class="video-tags">
          <span class="video-tag">Ergometer Setup</span>
          <span class="video-tag">Basics</span>
          <span class="video-tag">Equipment</span>
          <span class="video-tag">Pre-Course</span>
          <span class="video-tag">Session 1</span>
        </div>
      </div>
    </div>

    <!-- Correct Rowing Machine Technique -->
    <div class="video-card" data-sessions="pre-course session1" data-skills="technique basics" data-topics="stroke-overview">
      <div class="video-thumbnail" data-video-id="4zWu1yuJ0_g">
        <iframe src="https://www.youtube.com/embed/4zWu1yuJ0_g" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Correct Rowing Machine Technique, Improve Your Rowing | Concept2</h3>
        <div class="video-meta">
          <span class="video-creator">concept2usa</span>
          <span class="video-duration">1:53</span>
        </div>
        <div class="video-description">
          Technique on an indoor rowing machine can be divided into three parts: the catch, the drive and the recovery. This video will take you through proper technique on the rowing machine. This is appropriate for all types of athletes.
        </div>
        <div class="video-tags">
          <span class="video-tag">Technique</span>
          <span class="video-tag">Ergometer</span>
          <span class="video-tag">Full Stroke</span>
          <span class="video-tag">Pre-Course</span>
          <span class="video-tag">Session 1</span>
        </div>
      </div>
    </div>

    <!-- Safety Video -->
    <div class="video-card" data-sessions="" data-skills="safety" data-topics="stroke-overview">
      <div class="video-thumbnail" data-video-id="Rx5SUe_RdgQ">
        <iframe src="https://www.youtube.com/embed/Rx5SUe_RdgQ" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">USRowing Safety Video</h3>
        <div class="video-meta">
          <span class="video-creator">USRowing</span>
          <span class="video-duration">41:25</span>
        </div>
        <div class="video-description">
          A comprehensive safety briefing covering essential on-water safety practices: checking equipment, understanding traffic patterns, monitoring weather and water conditions, and the importance of proper safety equipment.
        </div>
        <div class="video-tags">
          <span class="video-tag">Safety</span>
          <span class="video-tag">River Traffic</span>
          <span class="video-tag">Pre-Course</span>
        </div>
      </div>
    </div>

    <!-- Parts of a Shell -->
    <div class="video-card" data-sessions="pre-course session1" data-skills="equipment" data-topics="">
      <div class="video-thumbnail" data-video-id="se7_i8KoyjE">
        <iframe src="https://www.youtube.com/embed/se7_i8KoyjE" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Parts of a Rowing Shell</h3>
        <div class="video-meta">
          <span class="video-creator">The Drive</span>
          <span class="video-duration">2:43</span>
        </div>
        <div class="video-description">
          A walk-through of all the key components of a sculling boat. This short video goes bow to stern identifying the hull, bowball, seat, tracks, riggers, foot stretcher, and more to help beginners understand the equipment.
        </div>
        <div class="video-tags">
          <span class="video-tag">Equipment</span>
          <span class="video-tag">Terminology</span>
          <span class="video-tag">Session 1</span>
        </div>
      </div>
    </div>

    <!-- Getting In and Out of the Boat -->
    <div class="video-card" data-sessions="session1" data-skills="basics technique" data-topics="">
      <div class="video-thumbnail" data-video-id="BZj3jUVNdAM">
        <iframe src="https://www.youtube.com/embed/BZj3jUVNdAM" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">How to get into a rowing single scull</h3>
        <div class="video-meta">
          <span class="video-creator">Decent Rowing</span>
          <span class="video-duration">0:41</span>
        </div>
        <div class="video-description">
          A clear demonstration of the proper technique for entering a single scull from the dock. The instructor shows the step-by-step process of mounting the boat safely: positioning the oars, secure hand placement, gradual weight transfer, and proper foot positioning.
        </div>
        <div class="video-tags">
          <span class="video-tag">Basics</span>
          <span class="video-tag">Safety</span>
          <span class="video-tag">Session 1</span>
        </div>
      </div>
    </div>
        
    <!-- Capsize Recovery -->
    <div class="video-card" data-sessions="session1" data-skills="safety" data-topics="">
      <div class="video-thumbnail" data-video-id="nhtv53MOrqA">
        <iframe src="https://www.youtube.com/embed/nhtv53MOrqA" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">How to Get Back into Your Scull after Flipping</h3>
        <div class="video-meta">
          <span class="video-creator">Rowing with Calm Waters</span>
          <span class="video-duration">2:27</span>
        </div>
        <div class="video-description">
          Learn how to get back into your scull — swiftly and safely — after flipping over in water. Demonstration of the "Belly Flop Method" by Calm Waters Rowing coaches and U.S. National Team medalists Charlotte Hollings and John Dunn.
        </div>
        <div class="video-tags">
          <span class="video-tag">Safety</span>
          <span class="video-tag">Self-Rescue</span>
          <span class="video-tag">Session 1</span>
        </div>
      </div>
    </div>

    <!-- Lars Flip Test Demo -->
    <div class="video-card" data-sessions="session1" data-skills="safety self-rescue" data-topics="">
      <div class="video-thumbnail" data-video-id="bfJR2K18GZo">
        <iframe src="https://www.youtube.com/embed/bfJR2K18GZo" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Lars Flip Test Demo - Hip Rotation Method</h3>
        <div class="video-meta">
          <span class="video-creator">AARC</span>
          <span class="video-duration">1:10</span>
        </div>
        <div class="video-description">
          Demonstration of the "Hip Rotation Method" for re-entering a capsized scull, performed by an AARC rower. This video shows the standard flip test procedure.
        </div>
        <div class="video-tags">
          <span class="video-tag">Safety</span>
          <span class="video-tag">Self-Rescue</span>
          <span class="video-tag">Flip Test</span>
          <span class="video-tag">Session 1</span>
        </div>
      </div>
    </div>

    <!-- Johanna Flip Test Demo -->
    <div class="video-card" data-sessions="session1" data-skills="safety self-rescue" data-topics="">
      <div class="video-thumbnail" data-video-id="lznN4_uCz9c">
        <iframe src="https://www.youtube.com/embed/lznN4_uCz9c" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Johanna Flip Test Demo - Hip Rotation Method</h3>
        <div class="video-meta">
          <span class="video-creator">AARC</span>
          <span class="video-duration">1:10</span>
        </div>
        <div class="video-description">
          Demonstration of an alternative technique for re-entering a capsized scull using the "Hip Rotation Method", performed by an AARC rower.
        </div>
        <div class="video-tags">
          <span class="video-tag">Safety</span>
          <span class="video-tag">Self-Rescue</span>
          <span class="video-tag">Flip Test</span>
          <span class="video-tag">Session 1</span>
        </div>
      </div>
    </div>

    <!-- Basic Stroke Technique -->
    <div class="video-card" data-sessions="session2" data-skills="technique" data-topics="stroke-overview">
      <div class="video-thumbnail" data-video-id="OpZbV8LyT_c">
        <iframe src="https://www.youtube.com/embed/OpZbV8LyT_c" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Essential Sculling Technique for Rowers</h3>
        <div class="video-meta">
          <span class="video-creator">World Rowing</span>
          <span class="video-duration">3:45</span>
        </div>
        <div class="video-description">
          A comprehensive overview of the entire sculling stroke cycle. This instructional video breaks down the complete stroke sequence from catch to finish, covering proper body positioning and handle positions through each phase.
        </div>
        <div class="video-tags">
          <span class="video-tag">Technique</span>
          <span class="video-tag">Full Stroke</span>
          <span class="video-tag">Session 2</span>
        </div>
      </div>
    </div>
    
    <!-- The Catch -->
    <div class="video-card" data-sessions="session2" data-skills="technique" data-topics="catch">
      <div class="video-thumbnail" data-video-id="0kzP4KZLMq8">
        <iframe src="https://www.youtube.com/embed/0kzP4KZLMq8" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">On-Water Rowing – The Catch (Sculling)</h3>
        <div class="video-meta">
          <span class="video-creator">Rowing Canada Aviron</span>
          <span class="video-duration">1:05</span>
        </div>
        <div class="video-description">
          A focused tutorial on the critical moment when the oar enters the water. Learn proper handle height, blade orientation, and timing for clean blade entry without diving too deep or skipping across the surface.
        </div>
        <div class="video-tags">
          <span class="video-tag">Technique</span>
          <span class="video-tag">Catch</span>
          <span class="video-tag">Session 2</span>
        </div>
      </div>
    </div>
    
    <!-- The Drive Phase -->
    <div class="video-card" data-sessions="session2 session3" data-skills="technique" data-topics="drive">
      <div class="video-thumbnail" data-video-id="BYsueP5GpGY">
        <iframe src="https://www.youtube.com/embed/BYsueP5GpGY" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">On-Water Rowing – The Drive (Sculling)</h3>
        <div class="video-meta">
          <span class="video-creator">Rowing Canada Aviron</span>
          <span class="video-duration">3:45</span>
        </div>
        <div class="video-description">
          This video breaks down the drive phase sequencing – "legs, core, arms" – for efficient power application. Learn how the drive begins with explosive leg press, followed by core/back engagement, and finally arm pull.
        </div>
        <div class="video-tags">
          <span class="video-tag">Technique</span>
          <span class="video-tag">Drive</span>
          <span class="video-tag">Session 2-3</span>
        </div>
      </div>
    </div>
    
    <!-- The Finish -->
    <div class="video-card" data-sessions="session3 session4" data-skills="technique" data-topics="finish">
      <div class="video-thumbnail" data-video-id="15RkCUVzqdA">
        <iframe src="https://www.youtube.com/embed/15RkCUVzqdA" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">On-Water Rowing – The Release (Sculling)</h3>
        <div class="video-meta">
          <span class="video-creator">Rowing Canada Aviron</span>
          <span class="video-duration">3:11</span>
        </div>
        <div class="video-description">
          A detailed look at how to properly finish the rowing stroke and extract the blade from the water. Learn the correct "tap down" motion to lift the blades cleanly from the water and proper timing of feathering.
        </div>
        <div class="video-tags">
          <span class="video-tag">Technique</span>
          <span class="video-tag">Finish</span>
          <span class="video-tag">Session 3-4</span>
        </div>
      </div>
    </div>
    
    <!-- The Recovery -->
    <div class="video-card" data-sessions="session3 session4" data-skills="technique" data-topics="recovery">
      <div class="video-thumbnail" data-video-id="I4yWtnTFdoY">
        <iframe src="https://www.youtube.com/embed/I4yWtnTFdoY" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Recovery to Catch – Body &amp; Blade Preparation</h3>
        <div class="video-meta">
          <span class="video-creator">Calm Waters Rowing</span>
          <span class="video-duration">5:39</span>
        </div>
        <div class="video-description">
          A technique-focused video that emphasizes the often-overlooked recovery phase. Learn proper "arms-body-slide" sequencing to maintain boat balance and momentum during the recovery phase.
        </div>
        <div class="video-tags">
          <span class="video-tag">Technique</span>
          <span class="video-tag">Recovery</span>
          <span class="video-tag">Session 3-4</span>
        </div>
      </div>
    </div>
    
    <!-- Feathering and Squaring -->
    <div class="video-card" data-sessions="session3" data-skills="technique" data-topics="feathering">
      <div class="video-thumbnail" data-video-id="UIDwzwSsXtI">
        <iframe src="https://www.youtube.com/embed/UIDwzwSsXtI" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Proper Sculling Grip and Feathering</h3>
        <div class="video-meta">
          <span class="video-creator">British Rowing</span>
          <span class="video-duration">5:04</span>
        </div>
        <div class="video-description">
          Learn proper handle control techniques for feathering and squaring your blades during your rowing stroke. The video explains proper sculling grip and demonstrates the motion of feathering and squaring with close-ups of handle movements.
        </div>
        <div class="video-tags">
          <span class="video-tag">Technique</span>
          <span class="video-tag">Feathering</span>
          <span class="video-tag">Session 3</span>
        </div>
      </div>
    </div>
    
    <!-- Navigation and Steering -->
    <div class="video-card" data-sessions="session3 session4" data-skills="technique advanced" data-topics="">
      <div class="video-thumbnail" data-video-id="2Ry2O5f8q0Y">
        <iframe src="https://www.youtube.com/embed/2Ry2O5f8q0Y" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Sculling: How to Steer a Single</h3>
        <div class="video-meta">
          <span class="video-creator">Calm Waters Rowing</span>
          <span class="video-duration">2:00</span>
        </div>
        <div class="video-description">
          Learn techniques for steering a single scull using pressure differences, subtle body weight shifts, and how to safely look over your shoulder to check your course while maintaining balance.
        </div>
        <div class="video-tags">
          <span class="video-tag">Navigation</span>
          <span class="video-tag">Advanced</span>
          <span class="video-tag">Session 3-4</span>
        </div>
      </div>
    </div>

    <!-- Parts of Sculling Oars -->
    <div class="video-card" data-sessions="post-course" data-skills="equipment" data-topics="">
      <div class="video-thumbnail" data-video-id="g6dO8Tftidk">
        <iframe src="https://www.youtube.com/embed/g6dO8Tftidk" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Oars – Every Rower Should Know This</h3>
        <div class="video-meta">
          <span class="video-creator">Decent Rowing (AUS)</span>
          <span class="video-duration">8:44</span>
        </div>
        <div class="video-description">
          The connection between the oar handle and the rower's hand is arguably the most important. But how many people know how to set up and maintain their oars? In this video, Ken Davey and Howard Croker run through what every rower should know about their oars and how to get the most out of them on race day.
        </div>
        <div class="video-tags">
          <span class="video-tag">Equipment</span>
          <span class="video-tag">Oars</span>
        </div>
      </div>
    </div>

    <!-- Drilling Technique -->
    <div class="video-card" data-sessions="session3 session4" data-skills="drills technique" data-topics="stroke-overview">
      <div class="video-thumbnail" data-video-id="kAAFCBTwb2Q">
        <iframe src="https://www.youtube.com/embed/kAAFCBTwb2Q" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Sculling Drills</h3>
        <div class="video-meta">
          <span class="video-creator">US Rowing</span>
          <span class="video-duration">16:45</span>
        </div>
        <div class="video-description">
          A compilation of fundamental on-water drills to reinforce proper technique. Includes pause drills, pick drills, and exercises for improving blade releases and handle control, all designed to help you isolate and improve individual stroke components.
        </div>
        <div class="video-tags">
          <span class="video-tag">Drills</span>
          <span class="video-tag">Technique</span>
          <span class="video-tag">Session 3-4</span>
        </div>
      </div>
    </div>

    <!-- Advanced Sculling Technique -->
    <div class="video-card" data-sessions="post-course" data-skills="advanced technique" data-topics="stroke-overview">
      <div class="video-thumbnail" data-video-id="RO0kN5JNa9w">
        <iframe src="https://www.youtube.com/embed/RO0kN5JNa9w" frameborder="0" allowfullscreen=""></iframe>
      </div>
      <div class="video-info">
        <h3 class="video-title">Sculling Basics</h3>
        <div class="video-meta">
          <span class="video-creator">US Rowing</span>
          <span class="video-duration">14:56</span>
        </div>
        <div class="video-description">
          A coaching video that identifies typical novice mistakes and how to fix them. The video points out common errors like rushing the slide, shooting the tail, dipping hands at the catch, and provides corrections and drills to improve your technique.
        </div>
        <div class="video-tags">
          <span class="video-tag">Advanced</span>
          <span class="video-tag">Technique</span>
          <span class="video-tag">Post-Course</span>
        </div>
      </div>
    </div>

  </div> <!-- End of video-grid -->
</div> <!-- End of video-gallery -->

<script src="{{ '/assets/js/video-gallery.js' | relative_url }}"></script>
