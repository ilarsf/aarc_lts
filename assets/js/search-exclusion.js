// Search exclusion script
document.addEventListener('DOMContentLoaded', function () {
    // This script modifies the searchIndex array to exclude coach content
    if (typeof searchIndex !== 'undefined') {
        // Filter out any coach-specific content from search results
        searchIndex = searchIndex.filter(function (item) {
            // Exclude URLs with coach-specific paths
            if (item.path.includes('/coach_portal/')) return false;
            if (item.path.includes('/course_materials/coach/')) return false;

            // Exclude coach-specific sections from textbook
            if (item.path.includes('/textbook/') && (
                item.path.includes('ForTheCoach') ||
                item.path.includes('CoachAppendices') ||
                item.path.includes('TechnicalCoaching') ||
                item.path.includes('SessionManagement') ||
                item.path.includes('SafetyLeadership') ||
                item.path.includes('ParticipantAssessment') ||
                item.path.includes('ProgramAdministration')
            )) return false;

            // Exclude coach layouts
            if (item.path.includes('_layouts/coach')) return false;

            // If content title or body specifically mentions "coach" in key coaching contexts
            const contentLower = (item.title + ' ' + item.body || '').toLowerCase();
            if (
                contentLower.includes('coach manual') ||
                contentLower.includes('coach textbook') ||
                contentLower.includes('coach portal') ||
                contentLower.includes('coach\'s manual') ||
                contentLower.includes('coach assessment') ||
                contentLower.includes('coach resources') ||
                contentLower.includes('for coaches only')
            ) return false;

            return true;
        });

        console.log('Filtered search index to exclude all coach-specific content');
    }
});
