/**
 * Image handler for AARC LTS website
 * 
 * This script:
 * 1. Prevents broken image placeholders from displaying
 * 2. Provides fallback icons for images that can't be loaded
 * 3. Suppresses console errors for missing images
 */

document.addEventListener('DOMContentLoaded', function () {
    // Create a global onerror handler for images
    window.addEventListener('error', function (e) {
        // Only handle image errors
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();

            // Hide the broken image
            e.target.style.display = 'none';

            // If the image has a data-fallback-icon attribute, replace with that icon
            if (e.target.dataset.fallbackIcon) {
                const icon = document.createElement('i');
                const iconClasses = e.target.dataset.fallbackIcon.split(' ');
                icon.classList.add(...iconClasses);

                // If there's a size specified, apply it
                if (e.target.dataset.iconSize) {
                    icon.style.fontSize = e.target.dataset.iconSize;
                } else {
                    icon.style.fontSize = '2rem'; // Default size
                }

                // Apply any custom color
                if (e.target.dataset.iconColor) {
                    icon.style.color = e.target.dataset.iconColor;
                }

                // Add any additional classes
                if (e.target.dataset.iconClass) {
                    const additionalClasses = e.target.dataset.iconClass.split(' ');
                    icon.classList.add(...additionalClasses);
                }

                // Replace the image with the icon
                e.target.parentNode.insertBefore(icon, e.target);
            }

            return true; // Prevent the error from appearing in console
        }
    }, true);

    // Apply fallback classes to all images that have the data-fallback-icon attribute
    document.querySelectorAll('img[data-fallback-icon]').forEach(img => {
        // Add a class to these images for styling
        img.classList.add('with-fallback-icon');
    });
});
