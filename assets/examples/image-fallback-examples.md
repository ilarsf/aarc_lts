## Common Image-with-Fallback Usage Examples

Here are some common usage patterns for the image fallback components in AARC LTS:

### 1. Image in Card Layout

```html
<div class="card">
  <div class="card-image">
    {% include image-with-fallback.html 
      src="/assets/images/rowing-technique/catch-position.jpg" 
      alt="Rower at the catch position"
      icon="fas fa-rowing" 
      type="info"
      icon_size="3rem" %}
  </div>
  <div class="card-content">
    <h3>The Catch Position</h3>
    <p>Proper body positioning at the catch...</p>
  </div>
</div>
```

### 2. Hero or Banner Image

```html
<div class="hero-banner">
  {% include image-with-fallback.html 
    src="/assets/images/banners/river-sunrise.jpg" 
    alt="Sunrise over the river with rowing shells"
    icon="fas fa-sun" 
    type="weather"
    icon_size="5rem"
    class="hero-image" %}
  <div class="hero-overlay">
    <h1>Learn to Scull Program</h1>
  </div>
</div>
```

### 3. Image Gallery Item

```html
<div class="gallery-item">
  {% include image-with-fallback.html 
    src="/assets/images/gallery/team-photo.jpg" 
    alt="AARC Rowing Team"
    icon="fas fa-users" 
    type="info"
    icon_size="2.5rem" %}
  <div class="gallery-caption">
    <p>Learn to Scull graduation day</p>
  </div>
</div>
```

### 4. Technique Diagram

```html
<div class="technique-diagram">
  {% include image-with-fallback.html 
    src="/assets/images/technique/sculling-sequence.png" 
    alt="Sculling stroke sequence diagram"
    icon="fas fa-project-diagram" 
    type="info"
    icon_size="4rem" %}
  <div class="diagram-caption">
    <p>The complete sculling stroke sequence</p>
  </div>
</div>
```

### 5. Equipment Reference

```html
<div class="equipment-reference">
  {% include image-with-fallback.html 
    src="/assets/images/equipment/oar-parts.jpg" 
    alt="Parts of a sculling oar"
    icon="fas fa-ruler-combined" 
    type="info"
    icon_size="3rem" %}
  <div class="reference-labels">
    <p>1. Handle  2. Shaft  3. Collar  4. Sleeve  5. Blade</p>
  </div>
</div>
```

### 6. Just the Icon Component

When no image is needed, just use the icon component directly:

```html
<div class="feature-box">
  <div class="feature-icon">
    {% include icon.html 
      icon="fas fa-life-ring" 
      type="safety" 
      size="4rem" 
      alt="Safety equipment" 
      feature=true %}
  </div>
  <h3>Safety Equipment</h3>
  <p>Always ensure proper safety equipment is available...</p>
</div>
```

### 7. Environmental Indicators

```html
<div class="weather-condition">
  <div class="condition-label">Current Wind:</div>
  <div class="condition-value">
    {% include icon.html 
      icon="fas fa-wind" 
      type="weather" 
      size="2rem" 
      alt="Wind conditions" %}
    12-15 mph (Moderate)
  </div>
</div>
```

### 8. Team/Coach Profiles

```html
<div class="team-member">
  <div class="member-photo">
    {% include image-with-fallback.html 
      src="/assets/images/coaches/coach-sarah.jpg" 
      alt="Coach Sarah"
      icon="fas fa-user" 
      type="info"
      icon_size="3rem" %}
  </div>
  <div class="member-info">
    <h3>Sarah Johnson</h3>
    <p>Lead Technical Coach</p>
  </div>
</div>
```

These examples should cover most common use cases in the AARC LTS site.
