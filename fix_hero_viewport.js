const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The replacement logic:
// 1. Find `<section id="home1" class="page active">\n<div class="container">\n<div class="hero">`
// 2. Change to `<section id="home1" class="page active">\n<div class="hero-viewport">\n<div class="container">\n<div class="hero">`
// 3. Find the end of `.hero`, which is `</div>\n<div class="section reveal">` (since I removed hero-art, hero now ends right before section reveal)
// Wait, my previous script left:
// `</div>\n<div class="section reveal">`
// Let's verify what the exact text is.

html = html.replace(
    '<section id="home1" class="page active">\n<div class="container">\n<div class="hero">',
    '<section id="home1" class="page active">\n<div class="hero-viewport">\n<div class="container">\n<div class="hero">'
);

// In my previous script I replaced the `<div class="hero-art reveal">...</div></div>` with `</div>`.
// So the end of hero is `</div>\n<div class="section reveal">`.
html = html.replace(
    /<\/div>\s*<div class="section reveal">/,
    '</div>\n</div>\n</div>\n<div class="container">\n<div class="section reveal">'
);

// Update CSS
// Remove old #home1 .hero styles and replace with #home1 .hero-viewport
const oldCss = `#home1 .hero {
    background: linear-gradient(90deg, rgba(246,244,235,1) 0%, rgba(246,244,235,0.85) 40%, rgba(246,244,235,0.2) 100%), url('https://images.pexels.com/photos/7782153/pexels-photo-7782153.jpeg?auto=compress&cs=tinysrgb&w=2400') center center / cover no-repeat;
    grid-template-columns: 1fr;
    width: 100%;
    border-radius: 34px;
}`;

const newCss = `#home1 .hero-viewport {
    background: linear-gradient(90deg, rgba(246,244,235,1) 0%, rgba(246,244,235,0.85) 40%, rgba(246,244,235,0.2) 100%), url('https://images.pexels.com/photos/7782153/pexels-photo-7782153.jpeg?auto=compress&cs=tinysrgb&w=2400') center center / cover no-repeat;
    width: 100%;
}
#home1 .hero {
    grid-template-columns: 1fr;
}`;

html = html.replace(oldCss, newCss);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed viewport');
