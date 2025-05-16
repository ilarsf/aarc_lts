# How to Format Your Markdown Content for Accordions

This template demonstrates how to convert your existing Markdown content into collapsible accordion sections.

> **Need help converting content?** We've created a [helper script]({{ site.baseurl }}/resources/accordion-converter.js) that can convert your existing heading-based content into accordion format. See the comments in the script for usage instructions.

## Step 1: Include the Accordion Component

Add this line at the top of your Markdown document:

{% raw %}
```
{% include accordion.html %}
```
{% endraw %}

## Step 2: Add Accordion Controls

Next, add these controls to allow users to expand or collapse all sections at once:

```
<div class="accordion-controls">
  <button id="expand-all">Expand All</button>
  <button id="collapse-all">Collapse All</button>
</div>
```

## Step 3: Convert Your Content

### Example: Original Markdown Format

```
## Section 1 Title

Content for section 1...

### Subsection 1.1

More content...

## Section 2 Title

Content for section 2...
```

### Example: Converted to Accordion Format

```
<div class="accordion-section">
  <button class="accordion-toggle">Section 1 Title</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <p>Content for section 1...</p>
      
      <h3>Subsection 1.1</h3>
      <p>More content...</p>
    </div>
  </div>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">Section 2 Title</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <p>Content for section 2...</p>
    </div>
  </div>
</div>
```

## Tips for Converting Content

1. Use your existing headings (typically level 2 headings) as accordion section titles
2. Keep the original heading hierarchy inside the accordion content
3. The accordion toggle button can contain HTML formatting like `<strong>` or `<em>` tags
4. You can embed any content inside the accordion including images, lists, tables, etc.

## Example for Part 1: Getting Started

```html
{% include accordion.html %}

<div class="accordion-controls">
  <button id="expand-all">Expand All</button>
  <button id="collapse-all">Collapse All</button>
</div>

<h1>Part 1: Getting Started</h1>

<div class="accordion-section">
  <button class="accordion-toggle">Chapter 1: Introduction</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <h3>Welcome to AARC Learn to Scull!</h3>
      
      <p>Welcome! The Ann Arbor Rowing Club (AARC) invites you to experience the joy of rowing on Argo Pond. This textbook provides a comprehensive guide for our Learn to Scull program.</p>
      
      <h3>What is Sculling?</h3>
      
      <p>Sculling is a type of rowing where one person uses two oars (called sculls), one in each hand, to propel a narrow, lightweight boat called a shell.</p>
      
      <!-- The rest of your content for Chapter 1 -->
    </div>
  </div>
</div>

<div class="accordion-section">
  <button class="accordion-toggle">Chapter 2: Program Structure</button>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <!-- Your content for Chapter 2 -->
    </div>
  </div>
</div>
```
