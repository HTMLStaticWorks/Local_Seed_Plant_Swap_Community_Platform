const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('css/style.css', 'utf8');
const dashMobileCss = `
@media (max-width: 1024px) {
  .app-sidebar {
    position: absolute;
    left: -260px;
    height: 100vh;
    transition: left 0.3s ease;
    z-index: 1000;
  }
  .app-sidebar.open {
    left: 0;
  }
  .dash-hamb {
    display: grid !important;
    margin-right: 16px;
    border: 1px solid var(--line);
    background: var(--surface);
    color: var(--ink);
    border-radius: 12px;
    width: 40px;
    height: 40px;
    place-items: center;
    font-size: 1rem;
    cursor: pointer;
  }
  .app-header {
    padding: 0 20px;
    justify-content: flex-start;
  }
  .app-header-actions {
    margin-left: auto;
  }
  .dash-tab-title {
    font-size: 1.2rem !important;
  }
}
`;
fs.writeFileSync('css/style.css', css + '\n' + dashMobileCss, 'utf8');

// 2. Update dashboard.html to add hamburger
let html = fs.readFileSync('dashboard.html', 'utf8');

// Add hamburger button to header
const headerMatch = '<header class="app-header">';
const headerReplace = '<header class="app-header">\n            <button class="dash-hamb" aria-label="Menu" onclick="toggleDashMenu()" style="display: none;">☰</button>';
html = html.replace(headerMatch, headerReplace);

fs.writeFileSync('dashboard.html', html, 'utf8');

// 3. Update js/script.js to add toggleDashMenu function and close menu on tab click
let js = fs.readFileSync('js/script.js', 'utf8');
const newJs = `
function toggleDashMenu() {
    const sidebar = document.querySelector('.app-sidebar');
    if(sidebar) sidebar.classList.toggle('open');
}
`;
js += newJs;

// Also modify dashTab to close the sidebar on mobile when a tab is clicked
js = js.replace(
    "toast((labels[tab]||'Overview')+' opened');",
    "toast((labels[tab]||'Overview')+' opened');\nconst sidebar = document.querySelector('.app-sidebar'); if(sidebar) sidebar.classList.remove('open');"
);

fs.writeFileSync('js/script.js', js, 'utf8');
console.log('Fixed dashboard mobile menu');
