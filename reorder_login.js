const fs = require('fs');

let html = fs.readFileSync('login.html', 'utf8');

// Helper function to reorder a card
function reorderCard(cardHtml, dividerText) {
    // Extract social row
    const socialMatch = cardHtml.match(/<div class="social-row">[\s\S]*?<\/div>\s*<div[^>]*>.*?<\/div>/);
    if (!socialMatch) return cardHtml;

    const socialBlock = socialMatch[0];
    
    // Remove the social block from its current location
    let newHtml = cardHtml.replace(socialBlock, '');

    // The new text to put above the social row
    const newSocialBlock = `
<div style="margin: 20px 0 12px; color: var(--ink); font-size: 0.95rem; text-align: center;">${dividerText}</div>
${socialBlock.replace(/<div[^>]*>or (continue|register) with email<\/div>/, '')}
`;

    // Insert the new social block AFTER the primary button
    newHtml = newHtml.replace(/(<button class="primary-btn"[^>]*>.*?<\/button>)/, `$1\n${newSocialBlock.trim()}`);
    
    return newHtml;
}

// Extract signinCard and replace
const signinMatch = html.match(/(<div class="login-card auth-card" id="signinCard">[\s\S]*?<div class="auth-switch">.*?<\/div>\s*<\/div>)/);
if (signinMatch) {
    const newSignin = reorderCard(signinMatch[1], "or continue with");
    html = html.replace(signinMatch[1], newSignin);
}

// Extract registerCard and replace
const registerMatch = html.match(/(<div class="login-card auth-card" id="registerCard"[^>]*>[\s\S]*?<div class="auth-switch">.*?<\/div>\s*<\/div>)/);
if (registerMatch) {
    const newRegister = reorderCard(registerMatch[1], "or register with");
    html = html.replace(registerMatch[1], newRegister);
}

fs.writeFileSync('login.html', html, 'utf8');
console.log('Successfully reordered login and register cards');
