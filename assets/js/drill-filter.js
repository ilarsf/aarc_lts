// Drill filtering functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all filter buttons
    const tagFilters = document.querySelectorAll('.tag-filter');

    // Get all accordion sections
    const accordionSections = document.querySelectorAll('.accordion-section');

    // Get all skill tags for direct click filtering
    const skillTags = document.querySelectorAll('.skill-tag');

    // Add click event to skill tags
    skillTags.forEach(tag => {
        tag.addEventListener('click', function (e) {
            // Prevent the accordion toggle from triggering
            e.stopPropagation();

            // Find the filter button with matching data-tag
            const tagText = this.textContent;
            const matchingFilter = Array.from(tagFilters).find(filter =>
                filter.getAttribute('data-tag') === tagText
            );

            if (matchingFilter) {
                // Simulate click on the matching filter button
                matchingFilter.click();
            }
        });
    });

    // Add click event to each filter button
    tagFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remove active class from all filters
            tagFilters.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked filter
            this.classList.add('active');

            // Get the selected tag
            const selectedTag = this.getAttribute('data-tag');

            // Update UI to show active filter
            const filterHeading = document.querySelector('.filters-container h3');
            if (filterHeading && selectedTag !== 'all') {
                filterHeading.textContent = `Showing Drills Tagged: ${selectedTag}`;
            } else if (filterHeading) {
                filterHeading.textContent = 'Filter Drills by Skill Tags';
            }

            // Track visible sections count
            let visibleSections = 0;

            // Filter accordion sections based on selected tag
            accordionSections.forEach(section => {
                const toggleButton = section.querySelector('.accordion-toggle');

                // If "All Skills" is selected or the section contains the selected tag
                if (selectedTag === 'all' || toggleButton.innerHTML.includes(selectedTag)) {
                    section.classList.remove('filtered');
                    visibleSections++;

                    // Highlight matching tags if specific tag is selected
                    if (selectedTag !== 'all') {
                        const tags = section.querySelectorAll('.skill-tag');
                        tags.forEach(tag => {
                            if (tag.textContent === selectedTag) {
                                tag.classList.add('highlighted');
                            } else {
                                tag.classList.remove('highlighted');
                            }
                        });
                    } else {
                        // Remove highlights when showing all
                        const tags = section.querySelectorAll('.skill-tag');
                        tags.forEach(tag => tag.classList.remove('highlighted'));
                    }
                } else {
                    section.classList.add('filtered');

                    // If this section was expanded, collapse it
                    const content = section.querySelector('.accordion-content');
                    if (content && content.style.maxHeight) {
                        toggleButton.classList.remove('active');
                        content.style.maxHeight = null;
                        content.classList.remove('visible');
                    }
                }
            });

            // Update the visible drills counter
            const drillCounter = document.getElementById('visible-drills-count');
            if (drillCounter) {
                if (selectedTag === 'all') {
                    drillCounter.textContent = 'All';
                } else {
                    drillCounter.textContent = visibleSections;
                }
            }

            // Fix accordion max-height issues after filtering
            setTimeout(() => {
                const visibleAccordions = document.querySelectorAll('.accordion-content.visible');
                visibleAccordions.forEach(content => {
                    content.style.maxHeight = content.scrollHeight + 2000 + 'px';
                });
            }, 100);

            // Show message if no matching drills
            const noResultsMessage = document.getElementById('no-results-message');
            if (visibleSections === 0) {
                if (!noResultsMessage) {
                    const msg = document.createElement('div');
                    msg.id = 'no-results-message';
                    msg.className = 'no-results';
                    msg.textContent = `No drills tagged with "${selectedTag}" found.`;

                    // Insert after filters container
                    const filtersContainer = document.querySelector('.filters-container');
                    filtersContainer.insertAdjacentElement('afterend', msg);
                }
            } else if (noResultsMessage) {
                noResultsMessage.remove();
            }
        });
    });
});
