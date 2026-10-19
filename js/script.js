const pageMap = {
    'home1': 'index.html',
    'home2': 'home2.html',
    'about': 'about.html',
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
function toggleMenu(){
    const p = document.getElementById('mobilePanel');
    if (!p) return;
    const isOpen = p.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
}
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
const labels={overview:'Overview',listings:'My Listings',requests:'Requests',messages:'Messages',history:'Swap History',profile:'Profile & Settings'};
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

    if (document.body.classList.contains('dashboard-mode')) {
        loadSavedProfile();
    }
});

function toggleDashMenu() {
    const sidebar = document.querySelector('.app-sidebar');
    if(sidebar) sidebar.classList.toggle('open');
}

function selectValue(idx) {
    const items = document.querySelectorAll('.value-item');
    const slides = document.querySelectorAll('.value-media-slide');
    if (!items.length || !slides.length) return;
    items.forEach((item, i) => {
        const isCurrent = (i === idx);
        item.classList.toggle('active', isCurrent);
        item.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
    });
}

function loadSavedProfile() {
    const raw = localStorage.getItem('sc_profile_data');
    if (!raw) return;
    try {
        const data = JSON.parse(raw);
        if (data.fullName) {
            const el = document.getElementById('profFullName');
            if (el) el.value = data.fullName;
            const bName = document.getElementById('profBannerName');
            if (bName) bName.textContent = data.fullName;
            document.querySelectorAll('.user-info strong').forEach(s => s.textContent = data.fullName);
            const initials = data.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            document.querySelectorAll('.user-initial, #profAvatarInitials').forEach(i => i.textContent = initials || 'AM');
        }
        if (data.handle) {
            const el = document.getElementById('profHandle');
            if (el) el.value = data.handle;
            const bHandle = document.getElementById('profBannerHandle');
            if (bHandle) bHandle.textContent = data.handle;
        }
        if (data.zone) {
            const el = document.getElementById('profZone');
            if (el) el.value = data.zone;
            const bZone = document.getElementById('profBannerZone');
            if (bZone) bZone.textContent = data.zone;
            document.querySelectorAll('.user-info small').forEach(s => s.textContent = data.zone);
        }
        if (data.email) {
            const el = document.getElementById('profEmail');
            if (el) el.value = data.email;
        }
        if (data.phone) {
            const el = document.getElementById('profPhone');
            if (el) el.value = data.phone;
        }
        if (data.bio) {
            const el = document.getElementById('profBio');
            if (el) el.value = data.bio;
        }
        if (data.website) {
            const el = document.getElementById('profWebsite');
            if (el) el.value = data.website;
        }
        if (data.gardenType) {
            const el = document.getElementById('profGardenType');
            if (el) el.value = data.gardenType;
        }
        if (data.hub) {
            const el = document.getElementById('profHub');
            if (el) el.value = data.hub;
        }
        if (data.swapMode) {
            const el = document.getElementById('profSwapMode');
            if (el) el.value = data.swapMode;
        }
        if (data.avatarImg) {
            const wrap = document.querySelector('.profile-avatar-wrap');
            if (wrap) {
                wrap.innerHTML = `<img src="${data.avatarImg}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;"><span class="profile-avatar-status" title="Active Community Member"></span>`;
            }
            document.querySelectorAll('.user-initial').forEach(headerInit => {
                headerInit.innerHTML = `<img src="${data.avatarImg}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
            });
        }
    } catch(e) {}
}

function saveProfileChanges(e) {
    if (e && e.preventDefault) e.preventDefault();
    const fullName = document.getElementById('profFullName') ? document.getElementById('profFullName').value.trim() : 'Asha M.';
    const handle = document.getElementById('profHandle') ? document.getElementById('profHandle').value.trim() : '@asha_gardens';
    const email = document.getElementById('profEmail') ? document.getElementById('profEmail').value.trim() : 'asha.gardens@seedcircle.org';
    const phone = document.getElementById('profPhone') ? document.getElementById('profPhone').value.trim() : '';
    const bio = document.getElementById('profBio') ? document.getElementById('profBio').value.trim() : '';
    const website = document.getElementById('profWebsite') ? document.getElementById('profWebsite').value.trim() : '';
    const zone = document.getElementById('profZone') ? document.getElementById('profZone').value : 'Zone 8b Gardener';
    const gardenType = document.getElementById('profGardenType') ? document.getElementById('profGardenType').value : '';
    const hub = document.getElementById('profHub') ? document.getElementById('profHub').value.trim() : '';
    const swapMode = document.getElementById('profSwapMode') ? document.getElementById('profSwapMode').value : '';

    const existingRaw = localStorage.getItem('sc_profile_data');
    let avatarImg = '';
    if (existingRaw) {
        try { avatarImg = JSON.parse(existingRaw).avatarImg || ''; } catch(err) {}
    }

    const profileData = { fullName, handle, email, phone, bio, website, zone, gardenType, hub, swapMode, avatarImg };
    localStorage.setItem('sc_profile_data', JSON.stringify(profileData));

    const bName = document.getElementById('profBannerName');
    if (bName) bName.textContent = fullName;
    const bHandle = document.getElementById('profBannerHandle');
    if (bHandle) bHandle.textContent = handle;
    const bZone = document.getElementById('profBannerZone');
    if (bZone) bZone.textContent = zone;

    document.querySelectorAll('.user-info strong').forEach(s => s.textContent = fullName);
    document.querySelectorAll('.user-info small').forEach(s => s.textContent = zone);

    if (!avatarImg) {
        const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        document.querySelectorAll('.user-initial, #profAvatarInitials').forEach(i => i.textContent = initials || 'AM');
    }

    toast('Profile and account settings saved successfully!');
}

function resetProfileChanges() {
    loadSavedProfile();
    toast('Profile changes reset to saved values');
}

function toggleInterestChip(btn) {
    btn.classList.toggle('active');
}

function handleAvatarUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            const wrap = document.querySelector('.profile-avatar-wrap');
            if (wrap) {
                wrap.innerHTML = `<img src="${dataUrl}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;"><span class="profile-avatar-status" title="Active Community Member"></span>`;
            }
            document.querySelectorAll('.user-initial').forEach(headerInit => {
                headerInit.innerHTML = `<img src="${dataUrl}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
            });
            const existingRaw = localStorage.getItem('sc_profile_data');
            let data = {};
            if (existingRaw) {
                try { data = JSON.parse(existingRaw); } catch(err) {}
            }
            data.avatarImg = dataUrl;
            localStorage.setItem('sc_profile_data', JSON.stringify(data));
            toast('Profile photo updated successfully!');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function removeAvatar() {
    const wrap = document.querySelector('.profile-avatar-wrap');
    const name = document.getElementById('profFullName') ? document.getElementById('profFullName').value : 'Asha M.';
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AM';
    if (wrap) {
        wrap.innerHTML = `<span id="profAvatarInitials">${initials}</span><span class="profile-avatar-status" title="Active Community Member"></span>`;
    }
    document.querySelectorAll('.user-initial').forEach(headerInit => {
        headerInit.innerHTML = initials;
    });
    const existingRaw = localStorage.getItem('sc_profile_data');
    if (existingRaw) {
        try {
            let data = JSON.parse(existingRaw);
            delete data.avatarImg;
            localStorage.setItem('sc_profile_data', JSON.stringify(data));
        } catch(err) {}
    }
    toast('Profile photo removed');
}

function togglePasswordVisibility(id, btn) {
    const input = document.getElementById(id);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    if (btn) {
        btn.innerHTML = isPassword
            ? '<svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
            : '<svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
}

