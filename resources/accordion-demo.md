---
layout: default
title: "Accordion Demo"
---

# Accordion Demo Page

This page demonstrates how to use the accordion feature to make content more manageable on content-heavy pages.

{% include accordion.html %}

<div class="accordion-controls">
  <button id="expand-all">Expand All</button>
  <button id="collapse-all">Collapse All</button>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">What is Sculling?</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <p>Sculling is a type of rowing where one person uses two oars (called sculls), one in each hand, to propel a narrow, lightweight boat called a shell.</p>
      
      <p>In sculling, each rower uses two oars or sculls, with one in each hand. This differs from sweep rowing, where each rower uses one oar with both hands.</p>
    </div>
  </div>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">Program Overview & Structure</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <p>The AARC Learn to Scull program is an introductory course designed to teach you the basics and get you comfortable on the water, preparing you for the next step in your rowing journey.</p>
      
      <h4>Key Program Features:</h4>
      <ul>
        <li><strong>Progressive Skill Development:</strong> Each session builds logically on the previous one.</li>
        <li><strong>Safety-First Approach:</strong> Comprehensive training includes water safety, boat handling, and the essential flip test (capsize recovery).</li>
        <li><strong>Supportive Learning Environment:</strong> Small group instruction ensures personalized attention from experienced coaches.</li>
        <li><strong>Technical Focus:</strong> Emphasis on developing proper technique from the very beginning.</li>
      </ul>
      
      <h4>Weekend Intensive Format & Considerations:</h4>
      <p>Our program uses a weekend intensive format (4 sessions over 2 consecutive weekends, 8am-11am Sat/Sun). This immersive format accelerates learning but can be physically demanding.</p>
      <ul>
        <li><strong>Pacing:</strong> Be prepared for multiple sessions per weekend.</li>
        <li><strong>Hand Care:</strong> Be proactive with blister prevention.</li>
        <li><strong>Recovery:</strong> Stay hydrated, eat well, and rest between sessions.</li>
      </ul>
    </div>
  </div>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">Safety Rules</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <h4>Essential Safety Rules:</h4>
      <ol>
        <li>Always wear a PFD (life jacket) when on the water</li>
        <li>Check the weather conditions before launching</li>
        <li>Know and follow the traffic patterns on the river</li>
        <li>Be aware of your surroundings at all times</li>
        <li>Never row alone as a beginner</li>
      </ol>
      
      <p>Safety is the top priority in all AARC programs. All participants must complete safety training and demonstrate the ability to perform a self-rescue (flip test) before being allowed to row independently.</p>
    </div>
  </div>
</div>

## How to Use Accordions in Your Content

To convert your existing content to use accordions, follow these steps:

1. Include the accordion component at the top of your page:

   {% raw %}
   ```
   {% include accordion.html %}
   ```
   {% endraw %}

2. Add the accordion controls:

   ```
   <div class="accordion-controls">
     <button id="expand-all">Expand All</button>
     <button id="collapse-all">Collapse All</button>
   </div>
   ```

3. For each section you want to make collapsible, wrap it in the accordion structure:

   ```
   <div class="accordion-section">
     <button class="accordion-toggle">Section Title</button>
     <div class="accordion-content">
       <div class="accordion-content-inner">
         Your content here...
       </div>
     </div>
   </div>
   ```

4. Move your existing content into the `accordion-content-inner` div.

## Examples

Check out these examples to see how accordions can be implemented:

- [Accordion Template]({{ site.baseurl }}/resources/accordion-template.html) - Template showing how to convert content
- [Textbook Chapter with Accordions]({{ site.baseurl }}/resources/accordion-textbook-example.html) - Example of a textbook chapter converted to use accordion sections
