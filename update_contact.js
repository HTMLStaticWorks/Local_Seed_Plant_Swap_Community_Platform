const fs = require('fs');

// 1. Update contact.html
let contactHtml = fs.readFileSync('contact.html', 'utf8');

// Remove emoji section entirely
contactHtml = contactHtml.replace(/<div class="section"><div class="emoji-card">[\s\S]*?<\/div><\/div><\/div>/, '');

// Replace mapbox with real vibrant Google Map iframe
const mapHtml = `<div class="mapbox" style="padding:0; overflow:hidden; border-radius: 26px; border: 1px solid var(--line); margin-bottom: 40px;">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528000654!2d-74.14448744576395!3d40.69763123334237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1714521453213!5m2!1sen!2s" width="100%" height="450" style="border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>`;
contactHtml = contactHtml.replace(/<div class="mapbox">[\s\S]*?<\/div><\/div><\/div>/, mapHtml);

// Append FAQ section right before </footer>
const faqHtml = `
<div class="section faq-section" style="max-width: 800px; margin: 0 auto 60px;">
    <div class="section-head" style="text-align: center; margin-bottom: 40px;">
        <span class="eyebrow">FAQ</span>
        <h2>Frequently Asked Questions</h2>
    </div>
    <div class="faq-list">
        <details class="faq-item">
            <summary class="faq-question">How does the seed swap process work? <span class="arrow">▼</span></summary>
            <div class="faq-answer"><p>It's simple! Browse the available listings, click 'View offer', and send a direct message to the person offering the seeds. You can arrange to swap for something you have, or accept it as a gift if they are giving it away.</p></div>
        </details>
        <details class="faq-item">
            <summary class="faq-question">Is it free to join and trade? <span class="arrow">▼</span></summary>
            <div class="faq-answer"><p>Yes, joining SeedCircle is completely free. We believe in building an open community where seeds, plants, and gardening knowledge are shared freely without cost barriers.</p></div>
        </details>
        <details class="faq-item">
            <summary class="faq-question">What if I don't have anything to swap yet? <span class="arrow">▼</span></summary>
            <div class="faq-answer"><p>That is perfectly fine! Many generous gardeners list their excess seeds and cuttings as 'Gifts'. You can start your garden with these gifts, and once your plants mature, you can share your own harvest back with the community.</p></div>
        </details>
        <details class="faq-item">
            <summary class="faq-question">How do I know what grows well in my zone? <span class="arrow">▼</span></summary>
            <div class="faq-answer"><p>Every listing includes the hardiness zone of the grower. We recommend looking for plants and seeds from members in your local area, as those plants are already adapted to your specific climate.</p></div>
        </details>
        <details class="faq-item">
            <summary class="faq-question">Can I organize a local, in-person swap event? <span class="arrow">▼</span></summary>
            <div class="faq-answer"><p>Absolutely! We encourage local meetups. You can post your community event in the Local Events section to invite members from your neighborhood to gather, trade, and learn together.</p></div>
        </details>
    </div>
</div>
`;

contactHtml = contactHtml.replace('</main>', faqHtml + '\n</main>');

fs.writeFileSync('contact.html', contactHtml, 'utf8');
console.log('contact.html updated');

// 2. Update style.css with FAQ styles
let styleCss = fs.readFileSync('css/style.css', 'utf8');
if (!styleCss.includes('.faq-item')) {
    const faqCss = `
/* FAQ Section */
.faq-section { width: 100%; }
.faq-item { border-bottom: 1px solid var(--line); padding: 22px 0; }
.faq-item:last-child { border-bottom: none; }
.faq-question { font-weight: 800; font-size: 1.15rem; color: var(--ink); cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; outline: none; }
.faq-question::-webkit-details-marker { display: none; }
.faq-question .arrow { font-size: 0.8rem; color: var(--primary); transition: transform 0.3s ease; }
details[open] .faq-question .arrow { transform: rotate(180deg); color: var(--accent); }
.faq-answer { padding-top: 14px; color: var(--muted); line-height: 1.6; font-size: 1.05rem; }
`;
    styleCss += faqCss;
    fs.writeFileSync('css/style.css', styleCss, 'utf8');
    console.log('style.css updated');
}
