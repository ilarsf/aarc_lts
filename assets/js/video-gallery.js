/**
 * Video Gallery Functionality
 * Handles video filtering, modal interactions, and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function () {
    initVideoGallery();
});

function initVideoGallery() {
    // Set up filter buttons
    setupFilterButtons();

    // Set up video modal functionality
    setupVideoModal();

    // Set up search functionality if search field exists
    if (document.getElementById('video-search')) {
        setupVideoSearch();
    }
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-filter');
            const categoryType = this.getAttribute('data-filter-type');

            // Toggle active state for buttons of the same filter type
            if (categoryType) {
                document.querySelectorAll(`.filter-button[data-filter-type="${categoryType}"]`).forEach(btn => {
                    btn.classList.remove('active');
                });
            }

            this.classList.toggle('active');
            filterVideos();
        });
    });

    // "Show All" button functionality
    const showAllButton = document.getElementById('show-all-videos');
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
