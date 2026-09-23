const fs = require('fs');

const tabData = {
    'listings': {
        metrics: [
            { label: 'Total Seeds', value: '150' },
            { label: 'Active Listings', value: '8' },
            { label: 'Drafts', value: '2' }
        ],
        grid2: [
            { img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', pill: 'Tips', title: 'Photography matters', desc: 'Clear, well-lit photos of your seeds or cuttings increase request rates by 40%.' },
            { img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', pill: 'Inventory', title: 'Restock upcoming', desc: 'Spring is approaching. Time to gather those tomato and basil seeds.' }
        ],
        table: {
            headers: ['Item Name', 'Category', 'Quantity', 'Status', 'Views'],
            rows: [
                ['Heirloom Tomatoes', 'Seeds', '15 packs', '<span class="status">Active</span>', '120'],
                ['Thai Basil Cuttings', 'Cuttings', '5 pots', '<span class="status">Active</span>', '85'],
                ['Mint Varieties', 'Runners', '10 bundles', '<span class="status">Draft</span>', '0'],
                ['Zucchini Seeds', 'Seeds', 'Out of stock', '<span class="status" style="background:#e2e8f0;color:#64748b">Inactive</span>', '40']
            ]
        },
        grid4: [
            { img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Promote Listings', desc: 'Share your listings to local community boards to get more visibility.' },
            { img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', title: 'Seed Saving Guide', desc: 'Learn how to properly dry and store seeds for next season.' },
            { img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', title: 'Packaging Ideas', desc: 'Eco-friendly ways to package seeds for your swap partners.' },
            { img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', title: 'Pricing Strategy', desc: 'Most swaps are free, but fair trading requires good communication.' }
        ]
    },
    'requests': {
        metrics: [
            { label: 'Pending Approvals', value: '3' },
            { label: 'Awaiting Pickup', value: '5' },
            { label: 'Archived', value: '14' }
        ],
        grid2: [
            { img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', pill: 'Action Needed', title: 'Respond quickly', desc: 'Responding to swap requests within 24 hours builds a strong community rating.' },
            { img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', pill: 'Safety', title: 'Safe meetups', desc: 'Always arrange to swap seeds in public, well-lit community spaces or local cafes.' }
        ],
        table: {
            headers: ['Requestor', 'Requested Item', 'Date', 'Location', 'Status'],
            rows: [
                ['John D.', 'Rose Cuttings', 'Today', 'Downtown Park', '<span class="status">Pending</span>'],
                ['Sarah K.', 'Kale Seeds', 'Yesterday', 'Mail delivery', '<span class="status">Approved</span>'],
                ['Mike R.', 'Aloe Vera Pup', '15 Sep', 'Library cafe', '<span class="status">Pickup agreed</span>'],
                ['Elena V.', 'Spider Plant', '14 Sep', 'Community Garden', '<span class="status" style="background:#e2e8f0;color:#64748b">Declined</span>']
            ]
        },
        grid4: [
            { img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', title: 'Shipping Tips', desc: 'How to safely mail seeds in standard envelopes.' },
            { img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', title: 'Tracking Swaps', desc: 'Keep a notebook of who you swapped with.' },
            { img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Rating System', desc: 'Don\'t forget to leave a review after a successful swap.' },
            { img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', title: 'Common Etiquette', desc: 'Guidelines for respectful and fair plant trading.' }
        ]
    },
    'messages': {
        metrics: [
            { label: 'Unread Messages', value: '2' },
            { label: 'Active Chats', value: '6' },
            { label: 'Average Response', value: '4 hrs' }
        ],
        grid2: [
            { img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', pill: 'Updates', title: 'New chat features', desc: 'You can now share photos of your plants directly in the chat window.' },
            { img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', pill: 'Community', title: 'Group chats', desc: 'Join neighborhood groups to discuss upcoming swap meets.' }
        ],
        table: {
            headers: ['User', 'Last Message', 'Date', 'Unread', 'Action'],
            rows: [
                ['John D.', 'Are you still free to meet on Saturday?', '10:30 AM', '<strong>1</strong>', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">Reply</button>'],
                ['Sarah K.', 'Thanks for the Aloe pup! I planted it today.', 'Yesterday', '0', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">View</button>'],
                ['Community Team', 'Welcome to SeedCircle! Here are some tips...', '12 Sep', '0', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">View</button>'],
                ['Mike R.', 'I will leave the spider plant on the porch.', '10 Sep', '0', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">View</button>']
            ]
        },
        grid4: [
            { img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', title: 'Notification Settings', desc: 'Customize how you receive message alerts.' },
            { img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', title: 'Archive Chats', desc: 'Keep your inbox clean by archiving old swaps.' },
            { img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Report Spam', desc: 'Help keep the community safe from bots.' },
            { img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', title: 'Message Templates', desc: 'Save quick replies for common questions.' }
        ]
    },
    'history': {
        metrics: [
            { label: 'Total Swaps', value: '42' },
            { label: 'Plants Given', value: '28' },
            { label: 'Plants Received', value: '14' }
        ],
        grid2: [
            { img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', pill: 'Milestone', title: 'Top Contributor', desc: 'You are in the top 10% of active swappers in your neighborhood this month!' },
            { img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', pill: 'Export', title: 'Download History', desc: 'Keep a spreadsheet of all your trades for your personal garden journal.' }
        ],
        table: {
            headers: ['Swap Item', 'Partner', 'Direction', 'Date', 'Rating'],
            rows: [
                ['Cherry Tomatoes', 'Alice W.', 'Given', '05 Sep', '⭐⭐⭐⭐⭐'],
                ['Lavender Cuttings', 'Bob T.', 'Received', '01 Sep', '⭐⭐⭐⭐⭐'],
                ['Sunflower Seeds', 'Community Garden', 'Given', '28 Aug', '⭐⭐⭐⭐'],
                ['Lemon Balm', 'Carla M.', 'Received', '20 Aug', '⭐⭐⭐⭐⭐']
            ]
        },
        grid4: [
            { img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', title: 'Garden Journal', desc: 'Log the growth progress of plants you received.' },
            { img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', title: 'Impact Report', desc: 'See how many local gardens you have influenced.' },
            { img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', title: 'Favorite Partners', desc: 'Save users you had great swap experiences with.' },
            { img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Swap Memories', desc: 'Upload photos of the full-grown plants.' }
        ]
    },
    'profile': {
        metrics: [
            { label: 'Profile Views', value: '315' },
            { label: 'Followers', value: '42' },
            { label: 'Community Rating', value: '4.9/5' }
        ],
        grid2: [
            { img: 'https://images.pexels.com/photos/7729129/pexels-photo-7729129.jpeg', pill: 'Identity', title: 'Verify your profile', desc: 'Verified members get 3x more swap requests. Upload a garden photo to verify.' },
            { img: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg', pill: 'Visibility', title: 'Public Garden Profile', desc: 'Your profile is currently visible to anyone in your local zip code.' }
        ],
        table: {
            headers: ['Setting', 'Current Value', 'Visibility', 'Last Updated', 'Action'],
            rows: [
                ['Display Name', 'Asha M.', 'Public', 'Jan 2026', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">Edit</button>'],
                ['Garden Zone', 'Zone 8', 'Public', 'Jan 2026', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">Edit</button>'],
                ['Email Address', 'asha.m@example.com', 'Private', 'Jan 2026', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">Edit</button>'],
                ['Location Preference', 'Local pickup only', 'Public', 'Mar 2026', '<button class="ghost-btn" style="padding:4px 8px;font-size:0.75rem">Edit</button>']
            ]
        },
        grid4: [
            { img: 'https://images.pexels.com/photos/7728125/pexels-photo-7728125.jpeg', title: 'Security Settings', desc: 'Update your password and enable two-factor authentication.' },
            { img: 'https://images.pexels.com/photos/12025139/pexels-photo-12025139.jpeg', title: 'Notification Preferences', desc: 'Control which emails and push alerts you receive.' },
            { img: 'https://images.pexels.com/photos/7655912/pexels-photo-7655912.jpeg', title: 'Privacy Controls', desc: 'Manage who can see your listings and message you.' },
            { img: 'https://images.pexels.com/photos/7728958/pexels-photo-7728958.jpeg', title: 'Delete Account', desc: 'Permanently remove your data from SeedCircle.' }
        ]
    }
};

let html = fs.readFileSync('dashboard.html', 'utf8');

// The strategy is to completely replace everything inside <div class="app-content dash-main" style="min-width:0; width:100%;"> up to </main>
// But we want to KEEP the true overview.

const overviewMatch = html.match(/<div id="pane-overview" class="tab-pane active">([\s\S]*?)<\/div>\s*<div id="pane-listings"/);
if (!overviewMatch) {
    console.error("Could not find overview pane");
    process.exit(1);
}
const trueOverviewContent = overviewMatch[1];

let panesHtml = '';
for (const [id, data] of Object.entries(tabData)) {
    let metricsHtml = '<div class="dash-grid">\n';
    data.metrics.forEach(m => {
        metricsHtml += `<div class="metric"><small>${m.label}</small><strong>${m.value}</strong></div>\n`;
    });
    metricsHtml += '</div>\n';

    let grid2Html = '<div class="section" style="padding-bottom:24px"><div class="grid-2">\n';
    data.grid2.forEach(g => {
        grid2Html += `<article class="card"><div class="card-media"><img src="${g.img}?auto=compress&cs=tinysrgb&w=1800" alt="Card image"></div><div class="card-body"><span class="pill">${g.pill}</span><h3>${g.title}</h3><p>${g.desc}</p></div></article>\n`;
    });
    grid2Html += '</div></div>\n';

    let tableHtml = '<div class="table-wrap">\n<table><thead><tr>\n';
    data.table.headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
    tableHtml += '</tr></thead><tbody>\n';
    data.table.rows.forEach(r => {
        tableHtml += '<tr>';
        r.forEach(c => { tableHtml += `<td>${c}</td>`; });
        tableHtml += '</tr>\n';
    });
    tableHtml += '</tbody></table>\n</div>\n';

    let grid4Html = '<div class="grid-4" style="margin-top: 24px;">\n';
    data.grid4.forEach(g => {
        grid4Html += `<article class="card"><div class="card-media"><img src="${g.img}?auto=compress&cs=tinysrgb&w=800" alt="Card image"></div><div class="card-body"><h3>${g.title}</h3><p>${g.desc}</p></div></article>\n`;
    });
    grid4Html += '</div>\n';

    panesHtml += `
<div id="pane-${id}" class="tab-pane">
${metricsHtml}
${grid2Html}
${tableHtml}
${grid4Html}
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

html = html.replace(/<div class="app-content dash-main"[^>]*>[\s\S]*<\/main>/, newAppContent);
fs.writeFileSync('dashboard.html', html, 'utf8');
console.log('Successfully rebuilt all panes with full layout!');
