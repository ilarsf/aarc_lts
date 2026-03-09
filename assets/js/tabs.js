document.addEventListener('DOMContentLoaded', () => {
    const tabContainers = Array.from(document.querySelectorAll('.tab-container'));
    if (!tabContainers.length) {
        return;
    }

    tabContainers.forEach((container, index) => {
        initializeTabContainer(container, index);
    });

    activateTabFromHash(tabContainers);
    window.addEventListener('hashchange', () => {
        activateTabFromHash(tabContainers);
    });
});

function initializeTabContainer(container, containerIndex) {
    if (container.dataset.tabsInitialized === 'true') {
        return;
    }

    const tabList = container.querySelector('.tab-nav');
    const tabButtons = getTabButtons(container);
    const tabPanels = getTabPanels(container);

    if (!tabButtons.length || !tabPanels.length) {
        return;
    }

    if (tabList) {
        tabList.setAttribute('role', 'tablist');
    }

    tabButtons.forEach((button, buttonIndex) => {
        const tabId = button.getAttribute('data-tab');
        const panel = container.querySelector(`#${tabId}`);
        if (!panel) {
            return;
        }

        const buttonId = button.id || `tab-${containerIndex}-${tabId}`;
        button.id = buttonId;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', tabId);

        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', buttonId);

        button.addEventListener('click', (event) => {
            event.preventDefault();
            activateTab(container, tabId, { updateHash: true });
        });

        button.addEventListener('keydown', (event) => {
            let nextIndex = null;

            if (event.key === 'ArrowRight') {
                nextIndex = (buttonIndex + 1) % tabButtons.length;
            } else if (event.key === 'ArrowLeft') {
                nextIndex = (buttonIndex - 1 + tabButtons.length) % tabButtons.length;
            } else if (event.key === 'Home') {
                nextIndex = 0;
            } else if (event.key === 'End') {
                nextIndex = tabButtons.length - 1;
            }

            if (nextIndex === null) {
                return;
            }

            event.preventDefault();
            const nextButton = tabButtons[nextIndex];
            nextButton.focus();
            activateTab(container, nextButton.getAttribute('data-tab'), { updateHash: true });
        });
    });

    const activeButton = tabButtons.find((button) => button.classList.contains('active')) || tabButtons[0];
    activateTab(container, activeButton.getAttribute('data-tab'));
    container.dataset.tabsInitialized = 'true';
}

function activateTab(container, tabId, options = {}) {
    const { updateHash = false } = options;
    const tabButtons = getTabButtons(container);
    const tabPanels = getTabPanels(container);
    let didActivate = false;

    tabButtons.forEach((button) => {
        const isActive = button.getAttribute('data-tab') === tabId;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
        button.setAttribute('tabindex', isActive ? '0' : '-1');
        didActivate = didActivate || isActive;
    });

    tabPanels.forEach((panel) => {
        const isActive = panel.id === tabId;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
    });

    if (!didActivate || !updateHash) {
        return didActivate;
    }

    if (history.replaceState) {
        history.replaceState(null, '', `#${tabId}`);
    } else {
        window.location.hash = tabId;
    }

    return didActivate;
}

function activateTabFromHash(tabContainers) {
    const hash = window.location.hash.slice(1);
    if (!hash) {
        return false;
    }

    return tabContainers.some((container) => activateTab(container, hash));
}

function getTabButtons(container) {
    return Array.from(container.querySelectorAll('.tab-nav .tab-button, .tab-nav .tab-link'));
}

function getTabPanels(container) {
    return Array.from(container.querySelectorAll('.tab-content'));
}
