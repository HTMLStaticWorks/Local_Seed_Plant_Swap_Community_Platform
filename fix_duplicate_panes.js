const fs = require('fs');

let html = fs.readFileSync('dashboard.html', 'utf8');

// 1. We need to extract the TRUE overview content.
// The true overview content is everything inside <div id="pane-overview" class="tab-pane active">
// EXCEPT any nested <div id="pane-listings"...
const overviewStart = html.indexOf('<div id="pane-overview"');
if (overviewStart !== -1) {
    // Find the end of the real overview content.
    // It should end where the nested <div id="pane-listings"> begins.
    const nestedListingsIndex = html.indexOf('<div id="pane-listings"', overviewStart + 20);
    
    // We want the content between overviewStart and nestedListingsIndex, excluding the outer div tag.
    // Actually, let's just grab the content manually using regex up to the first nested pane
    const overviewContentMatch = html.match(/<div id="pane-overview"[^>]*>([\s\S]*?)<div id="pane-listings"/);
    if (overviewContentMatch) {
        let trueOverviewContent = overviewContentMatch[1];
        // Remove trailing </div> tags if there are too many, or just keep it simple.
        // trueOverviewContent ends with </div></div></div>
        
        // Let's clean up trueOverviewContent. It should end with the section that has the Neighborhood Network card.
        // We know exactly what's at the end of the real overview content:
        const cleanOverviewMatch = trueOverviewContent.match(/([\s\S]*?Neighborhood Network<\/h3>[\s\S]*?<\/article>\s*<\/div>\s*<\/div>)/);
        if (cleanOverviewMatch) {
            trueOverviewContent = cleanOverviewMatch[1];
        }

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
                <div class="grid-4" style="margin-top: 0;">
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
                ${trueOverviewContent}
            </div>
            ${panesHtml}
        </div>
        </main>
        `;

        // Replace everything from <div class="app-content... to </main>
        const finalHtml = html.replace(/<div class="app-content dash-main"[^>]*>[\s\S]*<\/main>/, newAppContent);
        fs.writeFileSync('dashboard.html', finalHtml, 'utf8');
        console.log('Fixed duplicate IDs layout issue!');
    } else {
        console.log("Could not parse overview content properly.");
    }
}
