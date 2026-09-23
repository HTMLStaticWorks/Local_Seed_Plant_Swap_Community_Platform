const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The image URL from hero-art
const imageUrl = 'https://images.pexels.com/photos/7782153/pexels-photo-7782153.jpeg?auto=compress&cs=tinysrgb&w=2400';

// Remove the hero-art div completely
const artMatch = html.match(/<div class="hero-art reveal">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="section reveal">/);
if (artMatch) {
    const artContent = html.match(/<div class="hero-art reveal">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)[0];
    
    // Actually, it's safer to just replace the hero-art block exactly
    const artBlock = html.match(/<div class="hero-art reveal">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
    // wait, the closing divs are for hero-art, hero, and container.
    // hero-art has 2 floating divs inside it.
    // <div class="hero-art reveal">...</div>
}

// Let's use a simpler replace string
const toReplace = `
<div class="hero-art reveal">
<img src="https://images.pexels.com/photos/7782153/pexels-photo-7782153.jpeg?auto=compress&cs=tinysrgb&w=2400" alt="Gardener holding seed packets">
<div class="floating float-a"><b>🌿 18 swaps</b><br><small>within 5 km this week</small></div>
<div class="floating float-b"><b>● Fresh listing</b><br><small>Heirloom tomato • 12 seeds</small></div>
</div>
</div>
`;

// Replace it and end the hero div
const replacement = `
</div>
`;
html = html.replace(toReplace, replacement);

// Now change the <section id="home1" class="page active"> to include the background
// But wait, they want it as a background for the hero in viewport.
// Let's add a style tag specifically for home1 to set the background and ensure text is readable.
// I will add a background to `#home1` and make sure it has a gradient overlay so the text remains readable.

const styleBlock = `
<style>
#home1 {
    background: linear-gradient(90deg, rgba(246,244,235,1) 0%, rgba(246,244,235,0.85) 40%, rgba(246,244,235,0.2) 100%), url('https://images.pexels.com/photos/7782153/pexels-photo-7782153.jpeg?auto=compress&cs=tinysrgb&w=2400') center center / cover no-repeat;
}
#home1 .hero {
    grid-template-columns: 1fr;
    max-width: 700px;
}
</style>
`;

// Inject style just before </head>
html = html.replace('</head>', styleBlock + '\n</head>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed hero background in index.html');
