// Navigation JavaScript - handles TOC generation and other page navigation features
document.addEventListener('DOMContentLoaded', function () {
    // Auto-generate TOC when present
    const tocContainer = document.querySelector('.page-toc-container');
    if (tocContainer) {
        const headings = document.querySelectorAll('h2, h3');
        const tocList = document.createElement('ul');

        headings.forEach((heading, index) => {
            // Create ID if not present
            if (!heading.id) {
                heading.id = 'section-' + index;
            }

            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.href = '#' + heading.id;
            link.textContent = heading.textContent;

            // Indent h3 elements
            if (heading.tagName === 'H3') {
                listItem.style.paddingLeft = '1rem';
            }

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocList);
    }

    // Handle anchor link highlighting
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.classList.add('section-highlight');

                // Scroll to element with offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }, 100);
        }
    }

    // Add icons to image placeholders
    const imagePlaceholders = document.querySelectorAll('.image-placeholder .icon');
    imagePlaceholders.forEach(placeholder => {
        if (!placeholder.querySelector('i')) {
            placeholder.innerHTML = '<i class="fas fa-image"></i>';
        }
    });
});
