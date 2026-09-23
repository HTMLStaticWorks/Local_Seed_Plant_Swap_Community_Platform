const fs = require('fs');
let html = fs.readFileSync('dashboard.html', 'utf8');

// The goal is to remove the dash-grid, section, and table-wrap from pane-profile
// leaving only the grid-4 at the end.
const profileStart = '<div id="pane-profile" class="tab-pane">';
const grid4Start = '<div class="grid-4" style="margin-top: 24px;">';

const profileIndex = html.indexOf(profileStart);
if (profileIndex !== -1) {
    const grid4Index = html.indexOf(grid4Start, profileIndex);
    if (grid4Index !== -1) {
        const textToRemove = html.substring(profileIndex + profileStart.length, grid4Index);
        html = html.replace(textToRemove, '\n');
        fs.writeFileSync('dashboard.html', html, 'utf8');
        console.log('Fixed profile pane');
    }
}
