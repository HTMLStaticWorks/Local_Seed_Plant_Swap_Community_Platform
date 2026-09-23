const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('css/style.css', 'utf8');

const newCSS = `
@media (max-width: 1024px) {
  .nav {
    grid-template-columns: 190px 1fr auto !important;
  }
  .navlinks {
    display: none !important;
  }
  .nav-actions > :not(.hamb) {
    display: none !important;
  }
  .hamb {
    display: grid !important;
  }
  
  .mobile-panel {
    display: none;
    flex-direction: column;
    padding: 24px;
    background: var(--surface);
    border-top: 1px solid var(--line);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    box-shadow: var(--shadow);
  }
  .mobile-panel.active {
    display: flex;
  }
  
  .mobile-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
  
  .mobile-actions-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin: 16px 0;
  }
  
  .mobile-panel .contact-btn {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
    display: block;
    text-align: center;
  }
}
`;
fs.writeFileSync('css/style.css', css + newCSS, 'utf8');

// 2. Update all HTML files
const newMobilePanel = `<div class="mobile-panel" id="mobilePanel">
<div class="mobile-links">
<button onclick="go('home1')">Home</button>
<button onclick="go('home2')">Home 2</button>
<button onclick="go('how')">How It Works</button>
<button onclick="go('browse')">Browse Swaps</button>
<button onclick="go('service')">Services</button>
<button onclick="go('events')">Local Events</button>
<button onclick="go('contact')">Contact</button>
<button onclick="go('dashboard')">Dashboard</button>
</div>
<div class="mobile-actions-row">
<button class="icon-btn" aria-label="Toggle RTL" onclick="toggleRTL()">↔</button>
<button class="icon-btn" aria-label="Toggle theme" onclick="toggleTheme()">☼</button>
</div>
<button class="contact-btn" onclick="go('login')">Login</button>
</div>`;

const pages = ['index.html', 'home2.html', 'original.html', 'login.html', 'register.html', 'dashboard.html'];
pages.forEach(p => {
    if (fs.existsSync(p)) {
        let phtml = fs.readFileSync(p, 'utf8');
        // Match the mobile panel safely.
        // It's `<div class="mobile-panel" id="mobilePanel">` ... until `</header>`
        const match = phtml.match(/<div class="mobile-panel" id="mobilePanel">[\s\S]*?<\/div>\s*<\/div>/);
        if (match) {
            phtml = phtml.replace(match[0], newMobilePanel);
            fs.writeFileSync(p, phtml, 'utf8');
        } else {
             // Maybe it doesn't have the id?
             const altMatch = phtml.match(/<div class="mobile-panel"[^>]*>[\s\S]*?<\/div>\s*<\/div>/);
             if (altMatch) {
                 phtml = phtml.replace(altMatch[0], newMobilePanel);
                 fs.writeFileSync(p, phtml, 'utf8');
             }
        }
    }
});

console.log('Mobile nav updated for all pages.');
