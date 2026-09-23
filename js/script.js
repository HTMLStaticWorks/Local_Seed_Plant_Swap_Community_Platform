const pageMap = {
    'home1': 'index.html',
    'home2': 'home2.html',
    'service': 'service.html',
    'browse': 'browse.html',
    'how': 'how.html',
    'events': 'events.html',
    'dashboard': 'dashboard.html',
    'contact': 'contact.html',
    'login': 'login.html'
};

function go(id) {
    if (pageMap[id]) {
        window.location.href = pageMap[id];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentId = Object.keys(pageMap).find(key => pageMap[key] === currentPath) || 'home1';
    
    document.querySelectorAll('.navlinks button, .mobile-links button').forEach(b => {
        let page = b.dataset.page;
        if(!page && b.getAttribute('onclick')) {
            const match = b.getAttribute('onclick').match(/'([^']+)'/);
            if(match) page = match[1];
        }
        if(page) {
            b.classList.toggle('active', page === currentId);
        }
    });

    if (currentId === 'login') {
        document.body.classList.add('auth-mode');
    } else if (currentId === 'dashboard') {
        document.body.classList.add('dashboard-mode');
    }
});

function showRegister(){
document.getElementById('signinCard').style.display='none';
document.getElementById('registerCard').style.display='block';
document.getElementById('login').classList.add('active');
document.body.classList.add('auth-mode');
window.scrollTo({top:0,behavior:'smooth'});
}
function showLogin(scroll=true){
const a=document.getElementById('signinCard'),b=document.getElementById('registerCard');
if(!a||!b)return;
a.style.display='block';b.style.display='none';
if(scroll) window.scrollTo({top:0,behavior:'smooth'});
}
function toggleMenu(){document.getElementById('mobilePanel').classList.toggle('open')}
function toggleTheme(){
const dark=document.documentElement.getAttribute('data-theme')==='dark';
document.documentElement.setAttribute('data-theme',dark?'light':'dark');
localStorage.setItem('160-theme',dark?'light':'dark');
}
function toggleRTL(){
const rtl=document.documentElement.getAttribute('dir')==='rtl';
document.documentElement.setAttribute('dir',rtl?'ltr':'rtl');
document.body.style.direction=rtl?'ltr':'rtl';
localStorage.setItem('160-dir',rtl?'ltr':'rtl');
toast(rtl?'LTR layout enabled':'RTL layout enabled');
}
function toast(msg){
const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}
function filterSwaps(){
const q=document.getElementById('swapSearch').value.toLowerCase();
const type=document.getElementById('swapType').value;
const dist=document.getElementById('swapDistance').value;
const mode=document.getElementById('swapMode').value;
document.querySelectorAll('.swap-card').forEach(card=>{
const ok=(card.dataset.search.includes(q)||!q)&&(card.dataset.type===type||!type)&&(card.dataset.distance===dist||!dist)&&(card.dataset.mode===mode||!mode);
card.style.display=ok?'block':'none';
});
}
function observeReveal(){
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
(function(){
const theme=localStorage.getItem('160-theme');if(theme)document.documentElement.setAttribute('data-theme',theme);
const dir=localStorage.getItem('160-dir');if(dir){document.documentElement.setAttribute('dir',dir);document.body.style.direction=dir}
observeReveal();
})();
function dashTab(btn,tab){
document.querySelectorAll('.app-nav button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
const labels={overview:'Overview',listings:'My Listings',requests:'Requests',messages:'Messages',history:'Swap History',profile:'Profile'};
document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
const target=document.getElementById('pane-'+tab);
if(target) target.classList.add('active');
const title=document.querySelector('.dash-tab-title');
if(title) title.textContent=labels[tab]||'Overview';
toast((labels[tab]||'Overview')+' opened');
const sidebar = document.querySelector('.app-sidebar'); if(sidebar) sidebar.classList.remove('open');
}
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if(scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

function toggleDashMenu() {
    const sidebar = document.querySelector('.app-sidebar');
    if(sidebar) sidebar.classList.toggle('open');
}
