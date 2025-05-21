/**
 * Video Gallery Functionality
 * Handles video filtering, modal interactions, and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function () {
    initVideoGallery();
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function initVideoGallery() {
    setupFilterButtons(); // Sets up event listeners
    setupVideoModal();
    if (document.getElementById('video-search')) {
        setupVideoSearch(); // Sets up event listeners
    }

    const initialUrlFilter = getQueryParam('filter');
    const showAllButton = document.getElementById('show-all-videos');

    // Clear all active states from filter buttons to ensure a clean start
    document.querySelectorAll('.filter-button.active').forEach(btn => {
        btn.classList.remove('active');
    });

    if (initialUrlFilter) {
        const targetButton = document.querySelector(`.filter-button[data-filter='${initialUrlFilter}']`);
        if (targetButton) {
            targetButton.classList.add('active');
            // If a specific filter is from URL, "Show All" button should not be active.
            // This is handled by clearing all active states first and only activating the target.
        } else {
            // Invalid filter in URL, or filter not found, default to "Show All"
            if (showAllButton) {
                showAllButton.classList.add('active');
            }
        }
    } else {
        // No URL filter, default to "Show All"
        if (showAllButton) {
            showAllButton.classList.add('active');
        }
    }

    filterVideos(); // Apply filters based on the determined active buttons
}

function setupFilterButtons() {
    const allFilterButtons = document.querySelectorAll('.filter-button');
    const showAllButton = document.getElementById('show-all-videos');

    allFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const clickedButton = this;

            if (clickedButton.id === 'show-all-videos') {
                // Clicked "Show All"
                allFilterButtons.forEach(btn => {
                    if (btn !== clickedButton) {
                        btn.classList.remove('active');
                    }
                });
                clickedButton.classList.add('active');
            } else {
                // Clicked a specific filter button (not "Show All")
                const categoryType = clickedButton.getAttribute('data-filter-type');
                if (categoryType) {
                    // Deactivate other buttons of the same type if they are not the clicked one
                    document.querySelectorAll(`.filter-button[data-filter-type="${categoryType}"]`).forEach(btn => {
                        if (btn !== clickedButton) {
                            btn.classList.remove('active');
                        }
                    });
                    // Toggle the clicked button's active state (or simply set to active)
                    // If a button in a category is clicked, it should become active.
                    clickedButton.classList.add('active');

                    // Deactivate "Show All" button if a specific filter is now active
                    if (showAllButton) {
                        showAllButton.classList.remove('active');
                    }
                } else {
                    // Fallback for buttons without categoryType that are not "Show All" (should not occur with current HTML)
                    clickedButton.classList.toggle('active');
                    if (clickedButton.classList.contains('active') && showAllButton) {
                        showAllButton.classList.remove('active');
                    }
                }
            }
            filterVideos(); // Apply filters after updating active states
        });
    });

    // "Show All" button functionality
    if (showAllButton) {
        showAllButton.addEventListener('click', function () {
            // Remove active class from all filter buttons
            document.querySelectorAll('.filter-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Show all videos
            document.querySelectorAll('.video-card').forEach(card => {
                card.classList.remove('filtered-out');
                card.classList.add('filtered-in');
            });

            // Activate the "Show All" button
            this.classList.add('active');
            filterVideos(); // Ensure filtering is called
        });
    }
}

function filterVideos() {
    const activeSessionFilters = Array.from(document.querySelectorAll('.filter-button[data-filter-type="session"].active'))
        .map(button => button.getAttribute('data-filter'));

    const activeSkillFilters = Array.from(document.querySelectorAll('.filter-button[data-filter-type="skill"].active'))
        .map(button => button.getAttribute('data-filter'));

    const activeTopicFilters = Array.from(document.querySelectorAll('.filter-button[data-filter-type="topic"].active'))
        .map(button => button.getAttribute('data-filter'));

    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        const cardSessions = card.getAttribute('data-sessions')?.split(' ') || [];
        const cardSkills = card.getAttribute('data-skills')?.split(' ') || [];
        const cardTopics = card.getAttribute('data-topics')?.split(' ') || [];

        // If no filters are active in a category, consider it a match
        const sessionMatch = activeSessionFilters.length === 0 || activeSessionFilters.some(filter => cardSessions.includes(filter));
        const skillMatch = activeSkillFilters.length === 0 || activeSkillFilters.some(filter => cardSkills.includes(filter));
        const topicMatch = activeTopicFilters.length === 0 || activeTopicFilters.some(filter => cardTopics.includes(filter));

        // Show or hide based on all filter matches
        if (sessionMatch && skillMatch && topicMatch) {
            card.classList.remove('filtered-out');
            card.classList.add('filtered-in');
        } else {
            card.classList.remove('filtered-in');
            card.classList.add('filtered-out');
        }
    });

    // Check if we should show the "no results" message
    const visibleCards = document.querySelectorAll('.video-card:not(.filtered-out)').length;
    const noResultsElement = document.getElementById('no-video-results');

    if (noResultsElement) {
        if (visibleCards === 0) {
            noResultsElement.style.display = 'block';
        } else {
            noResultsElement.style.display = 'none';
        }
    }
}

function setupVideoSearch() {
    const searchInput = document.getElementById('video-search');

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();

        if (searchTerm.length < 2) {
            // If search term is too short, just use the existing filters
            filterVideos();
            return;
        }

        const videoCards = document.querySelectorAll('.video-card');

        videoCards.forEach(card => {
            const title = card.querySelector('.video-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.video-description')?.textContent.toLowerCase() || '';
            const creator = card.querySelector('.video-creator')?.textContent.toLowerCase() || '';

            // Apply existing filters first
            const isFilteredOut = card.classList.contains('filtered-out');

            // Only search among cards that pass the current filters
            if (!isFilteredOut) {
                if (title.includes(searchTerm) || description.includes(searchTerm) || creator.includes(searchTerm)) {
                    card.classList.remove('filtered-out');
                    card.classList.add('filtered-in');
                } else {
                    card.classList.remove('filtered-in');
                    card.classList.add('filtered-out');
                }
            }
        });

        // Check if we should show the "no results" message
        const visibleCards = document.querySelectorAll('.video-card:not(.filtered-out)').length;
        const noResultsElement = document.getElementById('no-video-results');

        if (noResultsElement) {
            if (visibleCards === 0) {
                noResultsElement.style.display = 'block';
            } else {
                noResultsElement.style.display = 'none';
            }
        }
    });
}

function setupVideoModal() {
    // Create modal element if it doesn't exist
    if (!document.querySelector('.video-modal')) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-video-container">
          <iframe allowfullscreen></iframe>
        </div>
        <div class="modal-video-info">
          <h3 class="modal-video-title"></h3>
          <div class="modal-video-meta"></div>
          <p class="modal-video-description"></p>
        </div>
      </div>
    `;
        document.body.appendChild(modal);

        // Close modal when clicking the X button
        modal.querySelector('.modal-close').addEventListener('click', function () {
            closeVideoModal();
        });

        // Close modal when clicking outside the content
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeVideoModal();
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeVideoModal();
            }
        });
    }

    // Set up click events for all video thumbnails
    document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const videoCard = this.closest('.video-card');
            const videoId = this.getAttribute('data-video-id');
            const videoTitle = videoCard.querySelector('.video-title').textContent;
            const videoMeta = videoCard.querySelector('.video-meta').innerHTML;
            const videoDescription = videoCard.querySelector('.video-description').innerHTML;

            openVideoModal(videoId, videoTitle, videoMeta, videoDescription);
        });
    });
}

function openVideoModal(videoId, title, meta, description) {
    const modal = document.querySelector('.video-modal');
    const iframe = modal.querySelector('iframe');
    const videoTitle = modal.querySelector('.modal-video-title');
    const videoMeta = modal.querySelector('.modal-video-meta');
    const videoDescription = modal.querySelector('.modal-video-description');

    // Set video source
    if (videoId.includes('youtube')) {
        iframe.src = videoId + '?autoplay=1';
    } else {
        // Assuming YouTube videos, adjust as needed
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // Set video info
    videoTitle.textContent = title;
    videoMeta.innerHTML = meta;
    videoDescription.innerHTML = description;

    // Show modal
    modal.style.display = 'block';

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.querySelector('.video-modal');
    const iframe = modal.querySelector('iframe');

    // Stop the video
    iframe.src = '';

    // Hide modal
    modal.style.display = 'none';

    // Allow body scrolling
    document.body.style.overflow = '';
}
