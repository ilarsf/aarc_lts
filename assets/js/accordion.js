// Accordion functionality for .accordion-toggle buttons
// Ensures each button toggles its corresponding .accordion-content

document.addEventListener('DOMContentLoaded', function () {
    // Toggle individual accordion sections
    document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            btn.classList.toggle('active');
            var content = btn.nextElementSibling;
            if (content && content.classList.contains('accordion-content')) {
                content.classList.toggle('visible');
            }
        });
    });

    // Expand All
    var expandAll = document.getElementById('expand-all');
    if (expandAll) {
        expandAll.addEventListener('click', function () {
            document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
                btn.classList.add('active');
                var content = btn.nextElementSibling;
                if (content && content.classList.contains('accordion-content')) {
                    content.classList.add('visible');
                }
            });
        });
    }

    // Collapse All
    var collapseAll = document.getElementById('collapse-all');
    if (collapseAll) {
        collapseAll.addEventListener('click', function () {
            document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
                btn.classList.remove('active');
                var content = btn.nextElementSibling;
                if (content && content.classList.contains('accordion-content')) {
                    content.classList.remove('visible');
                }
            });
        });
    }
});
