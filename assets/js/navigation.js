document.addEventListener('DOMContentLoaded', () => {
    initTableOfContents();
    highlightHashTarget();
    addPlaceholderIcons();
    initSiteNavigation();
});

function initTableOfContents() {
    const tocContainer = document.querySelector('.page-toc-container');
    if (!tocContainer) {
        return;
    }

    const headings = document.querySelectorAll('h2, h3');
    const tocList = document.createElement('ul');

    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `section-${index}`;
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');

        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;

        if (heading.tagName === 'H3') {
            listItem.style.paddingLeft = '1rem';
        }

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
}

function highlightHashTarget() {
    if (!window.location.hash) {
        return;
    }

    const targetElement = document.querySelector(window.location.hash);
    if (!targetElement) {
        return;
    }

    setTimeout(() => {
        targetElement.classList.add('section-highlight');

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }, 100);
}

function addPlaceholderIcons() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder .icon');
    imagePlaceholders.forEach((placeholder) => {
        if (!placeholder.querySelector('i')) {
            placeholder.innerHTML = '<i class="fas fa-image"></i>';
        }
    });
}

function initSiteNavigation() {
    const siteNav = document.getElementById('site-nav');
    const navToggle = document.querySelector('.mobile-nav-toggle');
    if (!siteNav || !navToggle) {
        return;
    }

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const dropdownItems = Array.from(siteNav.querySelectorAll('.has-dropdown'));
    let dropdownCounter = 0;

    markActiveNavItem(siteNav);

    dropdownItems.forEach((item) => {
        const link = item.querySelector(':scope > a');
        const menu = item.querySelector(':scope > .dropdown-menu');
        if (!link || !menu) {
            return;
        }

        if (!menu.id) {
            dropdownCounter += 1;
            menu.id = `site-nav-dropdown-${dropdownCounter}`;
        }

        let toggle = item.querySelector(':scope > .dropdown-toggle');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.className = 'dropdown-toggle';
            toggle.type = 'button';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', menu.id);
            toggle.setAttribute('aria-label', `Toggle ${link.textContent.trim()} submenu`);
            toggle.textContent = '+';
            link.after(toggle);
        }

        toggle.addEventListener('click', (event) => {
            if (!mobileQuery.matches) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const isOpen = item.classList.toggle('dropdown-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.textContent = isOpen ? '−' : '+';
        });
    });

    navToggle.addEventListener('click', () => {
        if (!mobileQuery.matches) {
            return;
        }

        const isOpen = siteNav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        setNavToggleIcon(navToggle, isOpen);

        if (!isOpen) {
            closeAllDropdowns(dropdownItems);
        }
    });

    document.addEventListener('click', (event) => {
        if (!mobileQuery.matches) {
            return;
        }

        if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
            closeNavigation(siteNav, navToggle, dropdownItems);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNavigation(siteNav, navToggle, dropdownItems);
        }
    });

    const syncNavigationState = () => {
        if (!mobileQuery.matches) {
            siteNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            closeAllDropdowns(dropdownItems);
        }

        setNavToggleIcon(navToggle, siteNav.classList.contains('active') && mobileQuery.matches);
    };

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', syncNavigationState);
    } else {
        window.addEventListener('resize', syncNavigationState);
    }

    syncNavigationState();
}

function closeNavigation(siteNav, navToggle, dropdownItems) {
    siteNav.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    setNavToggleIcon(navToggle, false);
    closeAllDropdowns(dropdownItems);
}

function closeAllDropdowns(dropdownItems) {
    dropdownItems.forEach((item) => {
        item.classList.remove('dropdown-open');
        const toggle = item.querySelector(':scope > .dropdown-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = '+';
        }
    });
}

function setNavToggleIcon(navToggle, isOpen) {
    const icon = navToggle.querySelector('i');
    if (!icon) {
        return;
    }

    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
}

function markActiveNavItem(siteNav) {
    const currentPath = normalizePath(window.location.pathname);
    const links = Array.from(siteNav.querySelectorAll('a'));
    let bestMatch = null;
    let bestLength = -1;

    links.forEach((link) => {
        const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
        const isMatch = currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath));
        if (isMatch && linkPath.length > bestLength) {
            bestMatch = link;
            bestLength = linkPath.length;
        }
    });

    if (!bestMatch) {
        return;
    }

    const matchedItem = bestMatch.closest('li');
    if (!matchedItem) {
        return;
    }

    matchedItem.classList.add('active-nav-item');
    const parentDropdown = matchedItem.closest('.has-dropdown');
    if (parentDropdown) {
        parentDropdown.classList.add('active-nav-item');
    }
}

function normalizePath(pathname) {
    const withoutIndex = pathname.replace(/index\.html$/, '');
    if (!withoutIndex || withoutIndex === '/') {
        return '/';
    }

    return withoutIndex.endsWith('/') ? withoutIndex : `${withoutIndex}/`;
}
