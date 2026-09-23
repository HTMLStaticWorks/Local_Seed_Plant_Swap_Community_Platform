const fs = require('fs');

let html = fs.readFileSync('login.html', 'utf8');

// 1. Extract the auth-logo block
const logoMatch = html.match(/(<div class="auth-logo">[\s\S]*?<\/div>\s*)(?=<div class="login-card)/);
if (logoMatch) {
    const logoHtml = logoMatch[1];
    
    // Remove the logo from its original position
    html = html.replace(logoHtml, '');

    // 2. Insert logo inside BOTH signinCard and registerCard
    html = html.replace(/(<div class="login-card auth-card" id="signinCard">)/, `$1\n${logoHtml.trim()}\n`);
    html = html.replace(/(<div class="login-card auth-card" id="registerCard"[^>]*>)/, `$1\n${logoHtml.trim()}\n`);

    // 3. Add top-right Theme and RTL buttons
    const topActions = `
<div class="auth-top-actions" style="position: absolute; top: 24px; right: 24px; display: flex; gap: 12px; z-index: 100;">
    <button class="icon-btn" aria-label="Toggle RTL" onclick="toggleRTL()" style="background: var(--surface); border: 1px solid var(--line); color: var(--ink); border-radius: 50%; width: 44px; height: 44px; display: grid; place-items: center; cursor: pointer; transition: 0.2s;">↔</button>
    <button class="icon-btn" aria-label="Toggle theme" onclick="toggleTheme()" style="background: var(--surface); border: 1px solid var(--line); color: var(--ink); border-radius: 50%; width: 44px; height: 44px; display: grid; place-items: center; cursor: pointer; transition: 0.2s;">☼</button>
</div>
`;
    // Insert topActions right after <div class="container auth-page">
    html = html.replace(/(<div class="container auth-page">)/, `$1\n${topActions}`);

    fs.writeFileSync('login.html', html, 'utf8');
    console.log('Successfully updated login.html');
} else {
    console.log('auth-logo not found or already moved.');
}
