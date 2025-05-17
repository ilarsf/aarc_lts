// Standardized skill tags management
document.addEventListener('DOMContentLoaded', function () {
    // Define standard skill tag categories
    const standardSkillTags = {
        "Balance": "#e1f0ff",
        "Blade Control": "#e1faff",
        "Body Awareness": "#ffefd6",
        "Boat Control": "#e1ffef",
        "Catch": "#ffefef",
        "Control": "#e5e1ff",
        "Coordination": "#e1ffe5",
        "Drive": "#ffe1e1",
        "Entry": "#fff0d9",
        "Foundation": "#d9f0ff",
        "Hands": "#ffd9f0",
        "Independence": "#f0ffd9",
        "Integration": "#f0d9ff",
        "Maneuverability": "#fff0d9",
        "Navigation": "#d9fff0",
        "Posture": "#f0d9ff",
        "Power": "#ffd9d9",
        "Precision": "#d9ffff",
        "Recovery": "#ffe6d9",
        "Safety": "#ffffcc",
        "Sequencing": "#e6ffe6",
        "Steering": "#e6e6ff",
        "Technique": "#ffe6ff"
    };

    // Get all skill tags
    const skillTags = document.querySelectorAll('.skill-tag');

    // Color code the skill tags based on category
    skillTags.forEach(tag => {
        const tagText = tag.textContent.trim();
        if (standardSkillTags[tagText]) {
            tag.style.backgroundColor = standardSkillTags[tagText];
        }
    });    // No filter generation needed - just color code the skill tags
});
