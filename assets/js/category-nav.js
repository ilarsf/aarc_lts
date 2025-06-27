// Category navigation link activation
document.addEventListener('DOMContentLoaded', function () {
    const categoryLinks = document.querySelectorAll('.category-link');

    // Add click event to highlight active category
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Allow the default anchor behavior to navigate to the section
        });
    });

    // Set the active category based on scroll position
    const sectionHeadings = document.querySelectorAll('h2[id]');
    const sectionTops = {};

    // Get all section positions
    sectionHeadings.forEach(heading => {
        const id = heading.getAttribute('id');
        sectionTops[id] = heading.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky header
    });

    function updateActiveLink() {
        const scrollPosition = window.scrollY;

        // Determine which section is currently in view
        let currentSection = '';
        for (const id in sectionTops) {
            if (scrollPosition >= sectionTops[id]) {
                currentSection = id;
            }
        }

        // Apply active class to the matching link
        if (currentSection) {
            categoryLinks.forEach(link => {
                const href = link.getAttribute('href').substring(1); // Remove # from href
                if (href === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    // Update on scroll and run once on load so the first category is highlighted
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});
