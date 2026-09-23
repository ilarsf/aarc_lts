// Video library: filter the collection and create one player on demand.
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.video-gallery');
    if (!gallery) return;

    const cards = Array.from(gallery.querySelectorAll('.video-card'));
    const filters = Array.from(gallery.querySelectorAll('.filter-button'));
    const showAll = gallery.querySelector('#show-all-videos');
    const search = gallery.querySelector('#video-search');
    const status = gallery.querySelector('#video-results-status');
    const noResults = gallery.querySelector('#no-video-results');

    function selected(type) {
        return filters
            .filter(button => button.dataset.filterType === type && button.classList.contains('active'))
            .map(button => button.dataset.filter);
    }

    function updateButtons() {
        filters.forEach(button => {
            button.setAttribute('aria-pressed', String(button.classList.contains('active')));
        });
    }

    function filterVideos() {
        const sessions = selected('session');
        const skills = selected('skill');
        const topics = selected('topic');
        const query = search.value.trim().toLocaleLowerCase();
        let visible = 0;

        cards.forEach(card => {
            const hasAny = (values, attribute) => !values.length ||
                values.some(value => (card.dataset[attribute] || '').split(/\s+/).includes(value));
            const matches = hasAny(sessions, 'sessions') &&
                hasAny(skills, 'skills') &&
                hasAny(topics, 'topics') &&
                (!query || card.textContent.toLocaleLowerCase().includes(query));
            card.classList.toggle('filtered-out', !matches);
            card.classList.toggle('filtered-in', matches);
            card.hidden = !matches;
            if (matches) visible += 1;
        });

        noResults.hidden = visible !== 0;
        status.textContent = `Showing ${visible} of ${cards.length} videos`;
        updateButtons();
    }

    filters.forEach(button => {
        button.addEventListener('click', () => {
            if (button === showAll) {
                filters.forEach(filter => filter.classList.toggle('active', filter === showAll));
                search.value = '';
            } else {
                filters.filter(filter => filter.dataset.filterType === button.dataset.filterType)
                    .forEach(filter => filter.classList.remove('active'));
                button.classList.add('active');
                showAll.classList.remove('active');
            }
            filterVideos();
        });
    });
    search.addEventListener('input', filterVideos);

    const requestedFilter = new URLSearchParams(window.location.search).get('filter');
    const requestedButton = filters.find(button => button.dataset.filter === requestedFilter);
    if (requestedButton) {
        filters.forEach(button => button.classList.remove('active'));
        requestedButton.classList.add('active');
    } else {
        showAll.classList.add('active');
    }
    filterVideos();

    const dialog = document.createElement('dialog');
    dialog.className = 'video-modal';
    dialog.setAttribute('aria-labelledby', 'video-dialog-title');
    dialog.innerHTML = `
        <div class="modal-content">
            <button type="button" class="modal-close" aria-label="Close video">&times;</button>
            <div class="modal-video-container">
                <iframe title="" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
            <div class="modal-video-info">
                <h2 id="video-dialog-title" class="modal-video-title"></h2>
                <p class="modal-video-meta"></p>
                <p class="modal-video-description"></p>
                <a class="modal-video-link" target="_blank" rel="noopener noreferrer">Open video on YouTube</a>
            </div>
        </div>`;
    document.body.appendChild(dialog);

    let opener = null;
    const frame = dialog.querySelector('iframe');
    function finishClose() {
        frame.removeAttribute('src'); // Stops playback and removes the remote frame.
        if (opener && opener.isConnected) opener.focus();
        opener = null;
    }
    function closeDialog() {
        dialog.close();
        finishClose();
    }
    dialog.querySelector('.modal-close').addEventListener('click', closeDialog);
    dialog.addEventListener('cancel', event => {
        event.preventDefault();
        closeDialog();
    });
    dialog.addEventListener('close', finishClose);

    gallery.querySelectorAll('.video-thumbnail').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.video-card');
            const title = card.querySelector('.video-title').textContent.trim();
            const videoId = button.dataset.videoId;
            opener = button;
            dialog.querySelector('.modal-video-title').textContent = title;
            dialog.querySelector('.modal-video-meta').textContent = card.querySelector('.video-meta').textContent.trim();
            dialog.querySelector('.modal-video-description').textContent = card.querySelector('.video-description').textContent.trim();
            dialog.querySelector('.modal-video-link').href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
            frame.title = title;
            frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1`;
            dialog.showModal();
            dialog.querySelector('.modal-close').focus();
        });
    });
});
