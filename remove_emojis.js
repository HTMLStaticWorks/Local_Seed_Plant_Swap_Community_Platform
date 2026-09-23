const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
    if (file !== 'contact.html') {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('class="big-emoji"')) {
            content = content.replace(/<div class="big-emoji">.*?<\/div>/g, '');
            fs.writeFileSync(file, content, 'utf8');
            console.log('Removed emoji from', file);
        }
    }
});
