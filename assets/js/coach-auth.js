// Coach portal authentication and access control
document.addEventListener('DOMContentLoaded', function () {
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

    // Use sessionStorage as fallback if localStorage isn't available
    function getStoredAccess() {
        if (isLocalStorageAvailable()) {
            return localStorage.getItem('aarc_coach_access') === 'granted';
        } else {
            return sessionStorage.getItem('aarc_coach_access') === 'granted';
        }
    }

    function setStoredAccess(value) {
        try {
            localStorage.setItem('aarc_coach_access', value);
        } catch (e) {
            // If localStorage fails, try sessionStorage
            try {
                sessionStorage.setItem('aarc_coach_access', value);
            } catch (e2) {
                console.warn('Neither localStorage nor sessionStorage are available');
            }
        }
    }

    // Check if we're on a coach page
    const isCoachPage = window.location.pathname.includes('/coach_portal/');

    if (isCoachPage) {
        const hasAccess = getStoredAccess();
        const isMainCoachPortal = window.location.pathname.endsWith('/coach_portal/') ||
            window.location.pathname.endsWith('/coach_portal/index.html') ||
            window.location.pathname.endsWith('/coach_portal/index.md');

        // If on coach page but no access and not already on main coach portal page, redirect
        if (!hasAccess && !isMainCoachPortal) {
            const basePath = window.location.origin +
                (window.location.origin.includes('github.io') ? '/aarc_lts' : '');
            window.location.href = basePath + '/coach_portal/';
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
        const password = document.getElementById('coach-password').value;
        const correctPassword = 'Coach2025'; // This should match the password in index.md
        const passwordError = document.getElementById('password-error');

        if (password === correctPassword) {
            // Store access token in storage
            setStoredAccess('granted');
            showCoachContent();
        } else if (passwordError) {
            passwordError.textContent = 'Incorrect password. Please try again.';
            // Clear any previously entered incorrect password
            document.getElementById('coach-password').value = '';
            // Focus back on password field for better UX
            document.getElementById('coach-password').focus();
        }
    }

    // Show coach content function
    function showCoachContent() {
        const passwordGate = document.getElementById('password-gate');
        const coachContent = document.getElementById('coach-content');

        if (passwordGate && coachContent) {
            passwordGate.style.display = 'none';
            coachContent.style.display = 'block';
        }
    }
});
