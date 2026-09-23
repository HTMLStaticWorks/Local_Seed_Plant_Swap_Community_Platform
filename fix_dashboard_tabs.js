const fs = require('fs');

// 1. UPDATE CSS
let css = fs.readFileSync('css/style.css', 'utf8');
css = css.replace('background: #0f172a;', 'background: var(--ink);');
if (!css.includes('.tab-pane')) {
    css += `
/* Dashboard Tabs */
.tab-pane { display: none; }
.tab-pane.active { display: block; animation: riseIn .4s cubic-bezier(.2,.7,.2,1) both; }
.app-bottom-row { display: flex; gap: 12px; justify-content: center; margin-top: auto; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; }
.app-bottom-row button { background: rgba(255,255,255,0.05); border: none; color: white; width: 48px; height: 48px; border-radius: 12px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
.app-bottom-row button:hover { background: rgba(255,255,255,0.15); }
`;
}
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('style.css updated');

// 2. UPDATE SCRIPT.JS
let js = fs.readFileSync('js/script.js', 'utf8');
const newDashTab = `function dashTab(btn,tab){
document.querySelectorAll('.app-nav button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
const labels={overview:'Overview',listings:'My Listings',requests:'Requests',messages:'Messages',history:'Swap History',profile:'Profile'};
document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
const target=document.getElementById('pane-'+tab);
if(target) target.classList.add('active');
const title=document.querySelector('.dash-tab-title');
if(title) title.textContent=labels[tab]||'Overview';
toast((labels[tab]||'Overview')+' opened');
}`;
js = js.replace(/function dashTab\(btn,tab\)\{[\s\S]*?toast\(\(labels\[tab\]\|\|'Overview'\)\+' opened'\);\n\}/, newDashTab);
fs.writeFileSync('js/script.js', js, 'utf8');
console.log('script.js updated');

// 3. UPDATE DASHBOARD.HTML
let html = fs.readFileSync('dashboard.html', 'utf8');

// Replace bottom actions
const oldBottom = `<div class="app-bottom">
            <button onclick="toggleTheme()"><span>☼</span> Theme</button>
            <button onclick="go('home1')"><span>←</span> Log Out</button>
        </div>`;
const newBottom = `<div class="app-bottom-row">
            <button onclick="toggleTheme()" aria-label="Toggle Theme">☼</button>
            <button onclick="toggleRTL()" aria-label="Toggle RTL">↔</button>
            <button onclick="go('home1')" aria-label="Log Out">⎋</button>
        </div>`;
html = html.replace(oldBottom, newBottom);

// Create Tab Panes
const tabData = {
    'listings': [
        {title: 'Heirloom Tomatoes', desc: '15 packs of seeds left. Very popular this season.'},
        {title: 'Thai Basil Cuttings', desc: 'Rooted and ready for soil. Need to clear out space.'},
        {title: 'Mint Varieties', desc: 'Spearmint and Peppermint runners available.'},
        {title: 'Zucchini Seeds', desc: 'Collected last fall, extremely high germination rate.'}
    ],
    'requests': [
        {title: 'Pending: Rose Cuttings', desc: 'Waiting for John D. to confirm the meetup time.'},
        {title: 'Approved: Kale Seeds', desc: 'Swap approved! Check your messages for address.'},
        {title: 'Action Needed: Aloe Vera', desc: 'Sarah requested your Aloe pup. Approve or decline?'},
        {title: 'Pending: Spider Plant', desc: 'You requested a Spider plant baby from Mike.'}
    ],
    'messages': [
        {title: 'John D.', desc: 'Hey! Are you still free to meet on Saturday morning?'},
        {title: 'Sarah K.', desc: 'Thanks for the Aloe pup! I planted it today.'},
        {title: 'Community Team', desc: 'Welcome to SeedCircle! Here are some tips to get started.'},
        {title: 'Mike R.', desc: 'I will leave the spider plant on the porch for you.'}
    ],
    'history': [
        {title: 'Swapped: Cherry Tomatoes', desc: 'Given to Alice W. in exchange for Basil.'},
        {title: 'Received: Lavender', desc: 'Received from Bob T. Beautiful cuttings!'},
        {title: 'Swapped: Sunflower Seeds', desc: 'Gifted to the local community garden.'},
        {title: 'Received: Lemon Balm', desc: 'Swapped with Carla M. for Mint.'}
    ],
    'profile': [
        {title: 'Account Details', desc: 'Asha M. • Member since Jan 2026'},
        {title: 'Garden Zone', desc: 'Zone 8 • Urban plot with partial sun.'},
        {title: 'Privacy Settings', desc: 'Manage your public visibility and contact preferences.'},
        {title: 'Notification Preferences', desc: 'Choose how you want to be notified about swaps.'}
    ]
};

let panesHtml = '';
for (const [id, items] of Object.entries(tabData)) {
    panesHtml += `
    <div id="pane-${id}" class="tab-pane">
        <div class="grid-4">
            ${items.map(item => `
            <article class="card">
                <div class="card-body" style="padding: 24px;">
                    <h3 style="margin-top:0">${item.title}</h3>
                    <p style="color:var(--muted); font-size: 0.95rem;">${item.desc}</p>
                </div>
            </article>
            `).join('')}
        </div>
    </div>
    `;
}

// Wrap existing content in overview pane
html = html.replace(/<div class="app-content dash-main" style="min-width:0; width:100%;">([\s\S]*?)<\/main>/, `<div class="app-content dash-main" style="min-width:0; width:100%;">\n<div id="pane-overview" class="tab-pane active">$1</div>\n${panesHtml}\n</div>\n</main>`);

fs.writeFileSync('dashboard.html', html, 'utf8');
console.log('dashboard.html updated');
