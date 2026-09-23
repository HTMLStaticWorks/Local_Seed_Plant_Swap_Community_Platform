const fs = require('fs');
let html = fs.readFileSync('dashboard.html', 'utf8');

// The profile pane starts with:
// <div id="pane-profile" class="tab-pane">
// <div class="grid-4" style="margin-top: 24px;">

const iconStyle = 'width: 48px; height: 48px; stroke: var(--primary);';
const mediaStyle = 'background: #f1f5f9; display: flex; align-items: center; justify-content: center; height: 160px;';

const newGrid4 = `
<div class="grid-4" style="margin-top: 24px;">
<article class="card">
    <div class="card-media" style="${mediaStyle}">
        <svg viewBox="0 0 24 24" style="${iconStyle}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    </div>
    <div class="card-body"><h3>Security Settings</h3><p>Update your password and enable two-factor authentication.</p></div>
</article>
<article class="card">
    <div class="card-media" style="${mediaStyle}">
        <svg viewBox="0 0 24 24" style="${iconStyle}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
    </div>
    <div class="card-body"><h3>Notification Preferences</h3><p>Control which emails and push alerts you receive.</p></div>
</article>
<article class="card">
    <div class="card-media" style="${mediaStyle}">
        <svg viewBox="0 0 24 24" style="${iconStyle}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    </div>
    <div class="card-body"><h3>Privacy Controls</h3><p>Manage who can see your listings and message you.</p></div>
</article>
<article class="card">
    <div class="card-media" style="${mediaStyle}">
        <svg viewBox="0 0 24 24" style="${iconStyle} stroke: #ef4444;" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
    </div>
    <div class="card-body"><h3>Delete Account</h3><p>Permanently remove your data from SeedCircle.</p></div>
</article>
</div>
`;

// Extract pane-profile
const startMarker = '<div id="pane-profile" class="tab-pane">';
const endMarker = '</div>\n    \n</div>\n</main>';

const startIndex = html.indexOf(startMarker);
if (startIndex !== -1) {
    const paneHtml = html.substring(startIndex, html.indexOf(endMarker, startIndex));
    
    // Replace the grid-4 inside pane-profile
    const replaced = paneHtml.replace(/<div class="grid-4" style="margin-top: 24px;">[\s\S]*<\/div>\n$/, newGrid4.trim() + '\n');
    html = html.replace(paneHtml, replaced);
    
    fs.writeFileSync('dashboard.html', html, 'utf8');
    console.log('Successfully replaced profile cards with icons');
} else {
    console.log('pane-profile not found');
}
