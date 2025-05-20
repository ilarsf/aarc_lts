/**
 * Utility functions for creating icon fallbacks in AARC LTS
 */

/**
 * Creates HTML for an icon that can be used as a fallback for missing images
 * 
 * @param {string} iconClasses - Font Awesome classes for the icon (e.g., 'fas fa-rowing')
 * @param {string} size - Size of the icon (default: '2rem')
 * @param {string} type - Type of icon for styling (weather, safety, info)
 * @param {string} altText - Alternative text for accessibility
 * @returns {string} HTML markup for the icon
 */
function createIconFallback(iconClasses, size = '2rem', type = 'info', altText = '') {
    return `<div class="icon-fallback ${type}-icon" role="img" aria-label="${altText}">
    <i class="${iconClasses}" style="font-size: ${size};"></i>
  </div>`;
}

/**
 * Creates HTML for an image with icon fallback
 * 
 * @param {string} src - Source URL for the image
 * @param {string} alt - Alternative text for the image
 * @param {string} iconClasses - Font Awesome classes for fallback icon
 * @param {string} classes - Additional CSS classes for the image
 * @returns {string} HTML markup for the image with fallback
 */
function createImageWithFallback(src, alt, iconClasses, classes = '') {
    return `<img src="${src}" alt="${alt}" class="${classes}" 
    data-fallback-icon="${iconClasses}" 
    data-icon-class="feature-icon" 
    loading="lazy">`;
}

/**
 * Creates a feature icon (larger than normal icons) for important visual elements
 * 
 * @param {string} iconClasses - Font Awesome classes for the icon
 * @param {string} type - Type of icon for styling (weather, safety, info)
 * @param {string} altText - Alternative text for accessibility
 * @returns {string} HTML markup for the feature icon
 */
function createFeatureIcon(iconClasses, type = 'info', altText = '') {
    return `<div class="icon-fallback ${type}-icon feature-icon" role="img" aria-label="${altText}">
    <i class="${iconClasses}"></i>
  </div>`;
}

// Export the functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createIconFallback,
        createImageWithFallback,
        createFeatureIcon
    };
}
