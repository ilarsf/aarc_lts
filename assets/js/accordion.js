// Shared disclosures used by the learner, member, and coach guides.
document.addEventListener('DOMContentLoaded', () => {
    const toggles = Array.from(document.querySelectorAll('.accordion-toggle, .nested-toggle'));

    function panelFor(toggle) {
        const controlledId = toggle.getAttribute('aria-controls');
        return (controlledId && document.getElementById(controlledId)) || toggle.nextElementSibling;
    }

    function setExpanded(toggle, expanded) {
        const panel = panelFor(toggle);
        if (!panel) return;

        toggle.classList.toggle('active', expanded);
        toggle.setAttribute('aria-expanded', String(expanded));
        panel.classList.toggle('visible', expanded);
        panel.hidden = !expanded;
        // Other page scripts may inspect maxHeight; keep its state in sync.
        panel.style.maxHeight = expanded ? 'none' : '';
    }

    window.setAccordionExpanded = setExpanded;

    toggles.forEach((toggle, index) => {
        const panel = panelFor(toggle);
        if (!panel) return;

        if (!panel.id) panel.id = `accordion-panel-${index + 1}`;
        toggle.setAttribute('aria-controls', panel.id);
        setExpanded(toggle, toggle.classList.contains('active') || toggle.getAttribute('aria-expanded') === 'true');

        toggle.addEventListener('click', () => {
            setExpanded(toggle, toggle.getAttribute('aria-expanded') !== 'true');
        });
    });

    function setAll(expanded, scope = document) {
        const scopedToggles = scope.querySelectorAll('.accordion-toggle, .nested-toggle');
        scopedToggles.forEach((toggle) => {
            if (!expanded || !toggle.closest('.accordion-section.filtered')) {
                setExpanded(toggle, expanded);
            }
        });
    }

    window.expandAllSections = () => setAll(true);
    window.collapseAllSections = () => setAll(false);

    document.querySelectorAll('[id^="expand-all"], [id^="collapse-all"]').forEach((button) => {
        // Rules, weather, and river traffic use their own controls and handlers.
        if (button.id.endsWith('-rules') || button.id.endsWith('-weather') || button.id.endsWith('-traffic')) return;

        button.addEventListener('click', () => {
            const scope = button.closest('.accordion') || button.closest('.tab-content') || document;
            setAll(button.id.startsWith('expand-all'), scope);
        });
    });
});
