const fs = require('fs');

// 1. Read existing dashboard.html
let html = fs.readFileSync('dashboard.html', 'utf8');

// Extract the content inside <div class="dash-main">
const dashMainMatch = html.match(/<div class="dash-main">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="section">/);
let mainContent = '';
if (dashMainMatch) {
    mainContent = dashMainMatch[1];
} else {
    console.log("Could not find dash-main content");
}

// Extract the section below dash-main (Listing analytics, etc.)
const sectionMatch = html.match(/<div class="section">\s*<div class="grid-4">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="section"><div class="emoji-card">/);
let bottomContent = '';
if (sectionMatch) {
    bottomContent = `<div class="grid-4" style="margin-top: 24px;">\n${sectionMatch[1]}\n</div>`;
}

// 2. Build the new full-viewport layout
const newLayout = `
<div class="app-layout">
    <!-- Sidebar -->
    <aside class="app-sidebar">
        <div class="app-brand">
            <a class="brand" href="#" onclick="go('home1');return false" style="color: white; text-decoration: none; display: flex; align-items: center; gap: 8px;">
                <span class="brand-mark" style="color: #4CAF50;"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M16 27V12M16 16C11 10 6 12 5 13c1 6 4 9 11 8M16 20c4-6 9-7 11-6-1 6-4 9-11 9" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="9" r="2.2" fill="currentColor"/></svg></span>
                <span style="font-size: 1.25rem; font-weight: 800; tracking: -0.5px;">SeedCircle</span>
            </a>
        </div>
        <nav class="app-nav">
            <button class="active" onclick="dashTab(this, 'overview')"><span>📊</span> Overview</button>
            <button onclick="dashTab(this, 'listings')"><span>🌱</span> My Listings</button>
            <button onclick="dashTab(this, 'requests')"><span>📫</span> Requests</button>
            <button onclick="dashTab(this, 'messages')"><span>💬</span> Messages</button>
            <button onclick="dashTab(this, 'history')"><span>🔄</span> Swap History</button>
            <button onclick="dashTab(this, 'profile')"><span>👤</span> Profile</button>
        </nav>
        <div class="app-bottom">
            <button onclick="toggleTheme()"><span>☼</span> Theme</button>
            <button onclick="go('home1')"><span>←</span> Log Out</button>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="app-main">
        <header class="app-header">
            <h1 class="dash-tab-title" style="font-size: 1.4rem; color: var(--ink); font-weight: 700;">Fleet Command Center (Overview)</h1>
            <div class="app-header-actions">
                <div class="user-profile">
                    <div class="user-info" style="text-align: right;">
                        <strong style="display:block;">Asha M.</strong>
                        <small style="color:var(--muted);">Zone 8 Gardener</small>
                    </div>
                    <span class="user-initial">AM</span>
                </div>
            </div>
        </header>
        
        <div class="app-content dash-main" style="min-width:0; width:100%;">
            ${mainContent}
            ${bottomContent}
        </div>
    </main>
</div>
`;

// Replace <main>...</main> and <footer>...</footer> with the new layout
const finalHtml = html.replace(/<main>[\s\S]*<\/footer>/, newLayout);
fs.writeFileSync('dashboard.html', finalHtml, 'utf8');
console.log('dashboard.html updated');

// 3. Append CSS to style.css
let css = fs.readFileSync('css/style.css', 'utf8');
if (!css.includes('.app-layout')) {
    const appCss = `
/* App Layout for Dashboard */
body.dashboard-mode { margin: 0; padding: 0; height: 100vh; overflow: hidden; background: #f4f6f8; }
body.dashboard-mode footer, body.dashboard-mode #scrollToTopBtn { display: none !important; }
.app-layout { display: flex; height: 100vh; width: 100vw; font-family: inherit; }

.app-sidebar { width: 260px; background: #0f172a; color: white; display: flex; flex-direction: column; padding: 30px 20px; flex-shrink: 0; box-shadow: 2px 0 10px rgba(0,0,0,0.1); z-index: 10; }
.app-brand { margin-bottom: 40px; padding-left: 10px; }
.app-nav { display: flex; flex-direction: column; gap: 8px; flex-grow: 1; }
.app-nav button, .app-bottom button { background: transparent; border: none; color: #94a3b8; font-size: 0.95rem; padding: 12px 16px; border-radius: 10px; text-align: left; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 12px; font-weight: 500; font-family: inherit; }
.app-nav button:hover, .app-bottom button:hover { background: rgba(255,255,255,0.08); color: white; }
.app-nav button.active { background: #1d4ed8; color: white; }
.app-nav button span, .app-bottom button span { font-size: 1.1rem; }
.app-bottom { margin-top: auto; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; }

.app-main { flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; background: #f1f5f9; }
.app-header { background: white; height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); flex-shrink: 0; z-index: 5; }
.app-header h1 { margin: 0; }
.user-profile { display: flex; align-items: center; gap: 14px; }
.user-initial { width: 42px; height: 42px; border-radius: 50%; background: #2563eb; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; }
.user-info strong { font-size: 0.9rem; color: #1e293b; }
.user-info small { font-size: 0.75rem; color: #64748b; }

.app-content { flex-grow: 1; padding: 40px; overflow-y: auto; overflow-x: hidden; }
.app-content .dash-grid { margin-bottom: 24px; }
.app-content .metric, .app-content .card, .app-content .table-wrap { background: white; border: none; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03); border-radius: 12px; }
.app-content .metric strong { color: #1e293b; font-size: 2.2rem; }
.app-content table { border-radius: 12px; overflow: hidden; }
`;
    css += appCss;
    fs.writeFileSync('css/style.css', css, 'utf8');
    console.log('style.css updated');
}
