// Search exclusion script
document.addEventListener('DOMContentLoaded', function () {
    // This script modifies the searchIndex array to exclude coach content
    if (typeof searchIndex !== 'undefined') {
        // Filter out any results containing coach_portal in the path
        searchIndex = searchIndex.filter(function (item) {
            return !item.path.includes('/coach_portal/');
        });

        console.log('Filtered search index to exclude coach content');
    }
});
