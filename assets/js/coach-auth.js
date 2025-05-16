// Coach portal authentication and access control
document.addEventListener('DOMContentLoaded', function () {
    // Debug flag for logging (set to true to diagnose redirect issues)
    const DEBUG = false;

    // Anti-redirect-loop protection
    // Check URL for redirect-count parameter to prevent infinite loops
    const urlParams = new URLSearchParams(window.location.search);
    const redirectCount = parseInt(urlParams.get('redirect_count') || '0');

    // Check if this is a URL-based auth request (for browsers with strict privacy settings)
    const hasUrlAuth = urlParams.has('auth_status') && urlParams.get('auth_status') === 'ok';

    // Check if the password was provided in the URL (emergency access option)
    const urlPassword = urlParams.get('pw');
    const correctPassword = 'Coach2025';
    const hasPasswordInUrl = urlPassword === correctPassword;

    // If we've redirected too many times, show an error and stop
    if (redirectCount > 2) {
        console.error('Redirect loop detected. Authentication system disabled.');

        // Create and show an error message that helps the user solve the privacy issue
        const errorDiv = document.createElement('div');
        errorDiv.style.padding = '20px';
        errorDiv.style.margin = '20px';
        errorDiv.style.backgroundColor = '#f8d7da';
        errorDiv.style.color = '#721c24';
        errorDiv.style.borderRadius = '5px';
        errorDiv.innerHTML = `
            <h3>Authentication Error</h3>
            <p>It appears your browser is blocking cookies and storage needed for authentication.</p>
            <h4>Options to fix this:</h4>
            <ol>
                <li>Try a different browser (Chrome or Firefox recommended)</li>
                <li>Disable tracking protection for this site</li>
                <li>Enable cookies and JavaScript for this site</li>
                <li><strong>Quick access:</strong> <a href="?auth_status=ok">Click here for URL-based access</a> (needs to be clicked on each page visit)</li>
            </ol>
        `;
        document.body.prepend(errorDiv);
        return;
    }

    // If access provided via URL, immediately handle it for this session
    if (hasPasswordInUrl) {
        // Remove the password from the URL for security
        if (window.history && window.history.replaceState) {
            try {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('pw');
                newUrl.searchParams.set('auth_status', 'ok');
                window.history.replaceState({}, document.title, newUrl.toString());
            } catch (e) {
                if (DEBUG) console.error('Failed to update URL:', e);
            }
        }
    }

    // Test if localStorage is available (to handle Safari private browsing)
    function isLocalStorageAvailable() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Cookie functions as additional fallback
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
        if (DEBUG) console.log('Setting cookie:', name, value);
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    // Use multi-level storage with fallbacks (localStorage → sessionStorage → cookies → URL parameter)
    function getStoredAccess() {
        // First check URL parameter (useful for browsers that block storage)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('auth_status') && urlParams.get('auth_status') === 'ok') {
            if (DEBUG) console.log('Access granted via URL parameter');
            return true;
        }

        // Check localStorage 
        if (isLocalStorageAvailable() && localStorage.getItem('aarc_coach_access') === 'granted') {
            if (DEBUG) console.log('Access granted from localStorage');
            return true;
        }

        // Then check sessionStorage
        try {
            if (sessionStorage.getItem('aarc_coach_access') === 'granted') {
                if (DEBUG) console.log('Access granted from sessionStorage');
                return true;
            }
        } catch (e) {
            if (DEBUG) console.log('sessionStorage check failed');
        }

        // Finally check cookies
        const cookieValue = getCookie('aarc_coach_access');
        if (cookieValue === 'granted') {
            if (DEBUG) console.log('Access granted from cookie');
            return true;
        }

        if (DEBUG) console.log('Access denied - no valid token found');
        return false;
    }

    function setStoredAccess(value) {
        if (DEBUG) console.log('Setting access to:', value);

        // Try all storage methods to maximize chances of success
        // Start with localStorage
        try {
            localStorage.setItem('aarc_coach_access', value);
            if (DEBUG) console.log('Access set in localStorage');
        } catch (e) {
            if (DEBUG) console.log('localStorage failed:', e);
        }

        // Also try sessionStorage
        try {
            sessionStorage.setItem('aarc_coach_access', value);
            if (DEBUG) console.log('Access set in sessionStorage');
        } catch (e) {
            if (DEBUG) console.log('sessionStorage failed:', e);
        }

        // Also set a cookie as a final fallback (valid for 1 day)
        setCookie('aarc_coach_access', value, 1);
    }

    // Check if we're on a coach page
    const isCoachPage = window.location.pathname.includes('/coach_portal/');

    if (isCoachPage) {
        const hasAccess = getStoredAccess();

        // Get the base path and current path for comparisons
        const basePath = window.location.origin +
            (window.location.origin.includes('github.io') ? '/aarc_lts' : '');
        const repoPrefix = window.location.origin.includes('github.io') ? '/aarc_lts' : '';
        const coachPortalBasePath = repoPrefix + '/coach_portal';
        const currentPath = window.location.pathname;

        if (DEBUG) {
            console.log('Current path:', currentPath);
            console.log('Coach portal base path:', coachPortalBasePath);
        }

        // More robust way to check if we're on the main coach portal page
        // Normalize both paths by removing trailing slashes for comparison
        function normalizePath(path) {
            return path.replace(/\/+$/, '');
        }

        const normalizedCurrentPath = normalizePath(currentPath);
        const normalizedCoachPath = normalizePath(coachPortalBasePath);

        // Check with multiple methods to be extremely robust
        const isMainCoachPortal =
            // Direct match (with or without trailing slash)
            normalizedCurrentPath === normalizedCoachPath ||
            // With trailing slash (explicit)
            currentPath === coachPortalBasePath + '/' ||
            // With index files
            currentPath === coachPortalBasePath + '/index.html' ||
            currentPath === coachPortalBasePath + '/index.md' ||
            // Check if current URL ends with these patterns
            currentPath.endsWith('/coach_portal') ||
            currentPath.endsWith('/coach_portal/') ||
            currentPath.endsWith('/coach_portal/index.html') ||
            currentPath.endsWith('/coach_portal/index.md');

        if (DEBUG) {
            console.log('Is main coach portal?', isMainCoachPortal);
        }

        // If on coach page but no access and not already on main coach portal page, redirect
        // but with safety counter to prevent infinite loops
        if (!hasAccess && !isMainCoachPortal) {
            if (DEBUG) {
                console.log('Redirecting to main coach portal');
                console.log('Current redirect count:', redirectCount);
            }

            // Skip redirect if we already have too many redirects (but less than the stop threshold)
            if (redirectCount >= 2) {
                console.warn('Too many redirects, skipping redirect but showing content');
                return; // Allow content to be shown instead of redirecting
            }

            // Preserve any auth_status parameter when redirecting
            const hasAuthStatus = urlParams.has('auth_status') && urlParams.get('auth_status') === 'ok';

            // Construct redirect URL with incremented counter
            let redirectUrl = basePath + '/coach_portal/';
            redirectUrl += '?redirect_count=' + (redirectCount + 1);

            // Add auth_status if it was present in the original URL
            if (hasAuthStatus) {
                redirectUrl += '&auth_status=ok';
            }

            // Add a small delay to allow console logs to be seen if debugging
            if (DEBUG) {
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 1000);
            } else {
                window.location.href = redirectUrl;
            }
            return;
        }

        // Handle authentication on main coach portal page
        if (isMainCoachPortal) {
            // Get DOM elements
            const passwordGateElement = document.getElementById('password-gate');
            const coachContentElement = document.getElementById('coach-content');
            const submitButton = document.getElementById('submit-password');
            const passwordInput = document.getElementById('coach-password');

            // If we already have access, show the content
            if (hasAccess && passwordGateElement && coachContentElement) {
                passwordGateElement.style.display = 'none';
                coachContentElement.style.display = 'block';
                return;
            }

            // Otherwise, set up password validation
            if (submitButton && passwordInput) {
                submitButton.addEventListener('click', validatePassword);

                // Allow Enter key to submit
                passwordInput.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {
                        validatePassword();
                    }
                });
            }
        }
    }

    // Password validation function
    function validatePassword() {
        const passwordInput = document.getElementById('coach-password');
        if (!passwordInput) {
            console.error('Password input element not found');
            return;
        }

        const password = passwordInput.value;
        const correctPassword = 'Coach2025'; // This should match the password in index.md
        const passwordError = document.getElementById('password-error');

        if (password === correctPassword) {
            if (DEBUG) console.log('Password correct, granting access');

            // Store access token in all available storage methods
            setStoredAccess('granted');

            // Verification step - check if storage worked
            const accessStored = getStoredAccess();
            if (DEBUG) console.log('Access stored successfully?', accessStored);

            // Always show content even if storage might have failed
            showCoachContent();

            // Set a flag in URL to indicate authenticated status as a last resort
            // This will help browsers with strict privacy settings that block cookies
            if (window.history && window.history.replaceState) {
                try {
                    const newUrl = new URL(window.location.href);
                    newUrl.searchParams.set('auth_status', 'ok');
                    window.history.replaceState({}, document.title, newUrl.toString());

                    // Add a notification if we think cookies/storage might be blocked
                    if (!isLocalStorageAvailable()) {
                        const storageWarning = document.createElement('div');
                        storageWarning.style.padding = '10px';
                        storageWarning.style.margin = '10px 0';
                        storageWarning.style.backgroundColor = '#fff3cd';
                        storageWarning.style.color = '#856404';
                        storageWarning.style.borderRadius = '5px';
                        storageWarning.innerHTML = `
                            <p><strong>Notice:</strong> Your browser appears to be blocking storage. You may need to add <code>?auth_status=ok</code> 
                            to URLs when navigating between pages, or use a different browser.</p>
                        `;

                        // Add the warning at the top of the coach content
                        const coachContent = document.getElementById('coach-content');
                        if (coachContent && coachContent.firstChild) {
                            coachContent.insertBefore(storageWarning, coachContent.firstChild);
                        }
                    }
                } catch (e) {
                    if (DEBUG) console.error('Failed to update URL:', e);
                }
            }
        } else if (passwordError) {
            passwordError.textContent = 'Incorrect password. Please try again.';
            // Clear any previously entered incorrect password
            passwordInput.value = '';
            // Focus back on password field for better UX
            passwordInput.focus();
        }
    }

    // Show coach content function with additional safety checks
    function showCoachContent() {
        const passwordGate = document.getElementById('password-gate');
        const coachContent = document.getElementById('coach-content');

        if (DEBUG) console.log('Showing coach content, elements found:', !!passwordGate, !!coachContent);

        // If we have both elements, proceed normally
        if (passwordGate && coachContent) {
            passwordGate.style.display = 'none';
            coachContent.style.display = 'block';

            if (DEBUG) console.log('Coach content is now visible');
            return true;
        }
        // If only coachContent exists (no gate), just make sure it's visible
        else if (coachContent) {
            coachContent.style.display = 'block';
            if (DEBUG) console.log('Coach content is now visible (no gate found)');
            return true;
        }
        // If neither exists, we might be on a subpage that doesn't use this pattern
        else if (DEBUG) {
            console.log('Could not find content elements, might be on a subpage');
        }

        return false;
    }

    // If URL shows auth_status=ok, consider ourselves authenticated
    // This is a last-resort fallback for browsers with storage issues
    if (urlParams.has('auth_status') && urlParams.get('auth_status') === 'ok') {
        if (DEBUG) console.log('Found auth_status in URL, granting access');
        setStoredAccess('granted');

        // ALWAYS modify all internal links to include auth_status, regardless of storage availability
        // This ensures consistent navigation even in strict privacy browsers
        document.addEventListener('DOMContentLoaded', function () {
            // Process all links that point to coach portal pages
            document.querySelectorAll('a').forEach(function (link) {
                const href = link.getAttribute('href');
                if (href && href.includes('/coach_portal/') && !href.includes('auth_status=')) {
                    // Add auth_status parameter to the link
                    const separator = href.includes('?') ? '&' : '?';
                    link.setAttribute('href', href + separator + 'auth_status=ok');

                    if (DEBUG) console.log('Modified link to include auth_status:', href);
                }
            });

            // Also add a visual indicator that URL-based auth is being used
            if (!isLocalStorageAvailable()) {
                const authNotice = document.createElement('div');
                authNotice.style.position = 'fixed';
                authNotice.style.bottom = '10px';
                authNotice.style.right = '10px';
                authNotice.style.backgroundColor = '#17a2b8';
                authNotice.style.color = 'white';
                authNotice.style.padding = '5px 10px';
                authNotice.style.borderRadius = '4px';
                authNotice.style.fontSize = '12px';
                authNotice.style.zIndex = '1000';
                authNotice.textContent = 'URL Auth Active';
                document.body.appendChild(authNotice);
            }
        });
    }
});
