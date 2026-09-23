const fs = require('fs');

let html = fs.readFileSync('dashboard.html', 'utf8');

// 1. Remove all the misplaced tab-panes
html = html.replace(/<div id="pane-listings"[\s\S]*?<\/main>/, '</main>');
// Also fix the pane-overview ending. Let's find where pane-overview starts.
// Wait, currently it's:
// <div class="app-content dash-main" style="min-width:0; width:100%;">
// <div id="pane-overview" class="tab-pane">
// ...
// </div>
// </div>
// </div>
// </main>

// Actually, let's just grab the content of pane-overview.
const overviewMatch = html.match(/<div id="pane-overview"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/main>/);
if (overviewMatch) {
    let overviewContent = overviewMatch[1];
    
    // We will rebuild the entire app-content block
    const tabData = {
        'listings': [
            {img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Heirloom Tomatoes', desc: '15 packs of seeds left. Very popular this season.'},
            {img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', title: 'Thai Basil Cuttings', desc: 'Rooted and ready for soil. Need to clear out space.'},
            {img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', title: 'Mint Varieties', desc: 'Spearmint and Peppermint runners available.'},
            {img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', title: 'Zucchini Seeds', desc: 'Collected last fall, extremely high germination rate.'}
        ],
        'requests': [
            {img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', title: 'Pending: Rose Cuttings', desc: 'Waiting for John D. to confirm the meetup time.'},
            {img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', title: 'Approved: Kale Seeds', desc: 'Swap approved! Check your messages for address.'},
            {img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Action Needed: Aloe Vera', desc: 'Sarah requested your Aloe pup. Approve or decline?'},
            {img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', title: 'Pending: Spider Plant', desc: 'You requested a Spider plant baby from Mike.'}
        ],
        'messages': [
            {img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', title: 'John D.', desc: 'Hey! Are you still free to meet on Saturday morning?'},
            {img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', title: 'Sarah K.', desc: 'Thanks for the Aloe pup! I planted it today.'},
            {img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', title: 'Community Team', desc: 'Welcome to SeedCircle! Here are some tips to get started.'},
            {img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', title: 'Mike R.', desc: 'I will leave the spider plant on the porch for you.'}
        ],
        'history': [
            {img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Swapped: Cherry Tomatoes', desc: 'Given to Alice W. in exchange for Basil.'},
            {img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', title: 'Received: Lavender', desc: 'Received from Bob T. Beautiful cuttings!'},
            {img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', title: 'Swapped: Sunflower Seeds', desc: 'Gifted to the local community garden.'},
            {img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', title: 'Received: Lemon Balm', desc: 'Swapped with Carla M. for Mint.'}
        ],
        'profile': [
            {img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', title: 'Account Details', desc: 'Asha M. • Member since Jan 2026'},
            {img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', title: 'Garden Zone', desc: 'Zone 8 • Urban plot with partial sun.'},
            {img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', title: 'Privacy Settings', desc: 'Manage your public visibility and contact preferences.'},
            {img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', title: 'Notification Preferences', desc: 'Choose how you want to be notified about swaps.'}
        ]
    };

    let panesHtml = '';
    for (const [id, items] of Object.entries(tabData)) {
        panesHtml += `
        <div id="pane-${id}" class="tab-pane">
            <div class="grid-4">
                ${items.map(item => `
                <article class="card">
                    <div class="card-media"><img src="${item.img}?auto=compress&cs=tinysrgb&w=800" alt="Plant swap related image"></div>
                    <div class="card-body">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                </article>
                `).join('')}
            </div>
        </div>
        `;
    }

    const newAppContent = `
    <div class="app-content dash-main" style="min-width:0; width:100%;">
        <div id="pane-overview" class="tab-pane active">
            ${overviewContent}
        </div>
        ${panesHtml}
    </div>
    </main>
    `;

    html = html.replace(/<div class="app-content dash-main"[^>]*>[\s\S]*<\/main>/, newAppContent);
    fs.writeFileSync('dashboard.html', html, 'utf8');
    console.log('Fixed dashboard.html layout issue!');
} else {
    console.log("Could not find overview pane.");
}
