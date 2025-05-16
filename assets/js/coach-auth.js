// Coach portal authentication logic
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on a coach page
    const isCoachPage = window.location.pathname.includes('/coach_portal/');

    if (isCoachPage) {
        const hasAccess = localStorage.getItem('aarc_coach_access') === 'granted';

        // If no access and not already on the main coach portal page, redirect to coach portal
        if (!hasAccess && !window.location.pathname.endsWith('/coach_portal/')) {
            window.location.href = window.location.origin +
                (window.location.origin.includes('github.io') ? '/aarc_lts' : '') +
                '/coach_portal/';
        }
    }
});
