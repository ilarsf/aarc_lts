// Script for handling dropdown accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize dropdown accordion functionality
    const dropdownAccordionToggles = document.querySelectorAll('.dropdown-accordion-toggle');

    dropdownAccordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle the active class on the button
            this.classList.toggle('active');

            // Get the target content
            const content = this.nextElementSibling;

            // Toggle the content visibility
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });

    // Prevent menu from closing when clicking inside dropdown accordion content
    const dropdownAccordionContents = document.querySelectorAll('.dropdown-accordion-content');
    dropdownAccordionContents.forEach(content => {
        content.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });
});
