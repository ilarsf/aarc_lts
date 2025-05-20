# Image Handling Documentation for AARC LTS

This README explains how to handle images in the AARC LTS project, particularly when dealing with missing images.

## Overview

The system now includes:
1. Automatic hiding of broken image placeholders
2. Icon fallbacks for missing images
3. Utility functions for creating icons and image fallbacks

## How to Use

### 1. Basic Image with Icon Fallback

When adding an image that might not be available yet, use the data attributes to specify a fallback icon:

```html
<img src="/path/to/image.jpg" alt="Description" 
     data-fallback-icon="fas fa-rowing" 
     data-icon-size="2rem"
     data-icon-color="#1976d2">
```

### 2. Using Icon Types

Different types of icons have different styling. Available types are:
- `weather-icon` (blue background)
- `safety-icon` (red background)
- `info-icon` (green background)

Example:
```html
<img src="/path/to/image.jpg" alt="Description" 
     data-fallback-icon="fas fa-life-ring" 
     data-icon-class="safety-icon">
```

### 3. Feature Icons

For larger, more prominent icons:

```html
<img src="/path/to/image.jpg" alt="Description" 
     data-fallback-icon="fas fa-water" 
     data-icon-class="feature-icon weather-icon">
```

### 4. Icon-Only Elements

If you want to just display an icon (not as a fallback):

```html
<div class="icon-fallback weather-icon">
  <i class="fas fa-cloud-sun"></i>
</div>
```

## Reference

### Font Awesome Icon Reference

Here are some relevant Font Awesome icons for rowing and weather:

#### Rowing/Water:
- `fas fa-life-ring` - Life Ring
- `fas fa-water` - Water
- `fas fa-swimming-pool` - Water (alternative)
- `fas fa-ship` - Boat
- `fas fa-anchor` - Anchor

#### Weather:
- `fas fa-cloud-sun` - Partly Cloudy
- `fas fa-cloud` - Cloudy
- `fas fa-cloud-rain` - Rain
- `fas fa-cloud-showers-heavy` - Heavy Rain
- `fas fa-bolt` - Lightning
- `fas fa-wind` - Wind
- `fas fa-smog` - Fog
- `fas fa-temperature-high` - Hot Temperature
- `fas fa-temperature-low` - Cold Temperature
- `fas fa-sun` - Sunny

#### Safety:
- `fas fa-exclamation-triangle` - Warning
- `fas fa-shield-alt` - Safety Shield
- `fas fa-hard-hat` - Safety Helmet
- `fas fa-first-aid` - First Aid
- `fas fa-bell` - Alert

Check the [Font Awesome 5 Icon Gallery](https://fontawesome.com/v5/search) for more icons.

## Usage in Templates or Markdown

You can include icon fallbacks in your Jekyll templates or Markdown files. For Markdown files that support HTML (like in Jekyll), you can directly include the HTML for images with fallbacks.

## Technical Details

The system works by:
1. Detecting image load errors
2. Hiding broken images
3. Replacing them with the specified Font Awesome icon
4. Applying styling based on the specified classes

This solution ensures a clean user interface even when images are missing, and provides meaningful visual cues through icons.
