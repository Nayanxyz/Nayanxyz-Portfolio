/* ==========================================
   1. THE ASYNC TYPEWRITER ENGINE
   ========================================== */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typeLine(elementId, text, speed) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = ""; 
    
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await sleep(speed);
    }
}

async function runTypewriterSequence() {
    try {
        await typeLine("hero-line-1", "Hello everyone!", 50);
        await sleep(300); 
        await typeLine("hero-line-2", "I am Nayan", 50);
        await sleep(350);
        await typeLine("hero-terminal", "engineering automated systems and scalable web applications.", 30);
        await sleep(200);
        await typeLine("hero-line-3", "View My Architecture", 30);
    } catch (err) {
        console.error("Typewriter error:", err);
    }
}

/* ==========================================
   2. THE ANIMATION CONTROLLER (Intersection Observer)
   ========================================== */
const observerOptions = {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
};

const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

function observeStaticCards() {
    const staticCards = document.querySelectorAll('.slider-panel .project-card');
    if (staticCards.length === 0) return;
    staticCards.forEach(card => cardObserver.observe(card));
}

/* ==========================================
   3. THE GITHUB API INTEGRATION ENGINE
   ========================================== */
const pinnedRepos = [
    "Swarm-API-Super-Agent-Travily", 
    "webcam-motion-alert", 
    "Web-Automation-with-Selenium",
    "Web_scrape_sql",
    "Personality-Ai-Agent",
    "Django-Application-form"
];

async function fetchGitHubProjects() {
    const gridContainer = document.getElementById('project-grid');
    if (!gridContainer) return;
    
    try {
        gridContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Connecting to GitHub API...</p>';

        const response = await fetch('https://api.github.com/users/Nayanxyz/repos?per_page=100');
        if (!response.ok) throw new Error(`GitHub API returned status: ${response.status}`);

        const allRepos = await response.json();
        
        let displayRepos = [];
        if (pinnedRepos.length > 0) {
            displayRepos = pinnedRepos
                .map(targetName => allRepos.find(repo => repo.name === targetName))
                .filter(repo => repo !== undefined); 
        } else {
            displayRepos = allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6);
        }

        if (displayRepos.length === 0) {
            gridContainer.innerHTML = '<p style="color: var(--text-muted);">No featured repositories found. Check your array names.</p>';
            return;
        }

        let htmlString = '';
        displayRepos.forEach(repo => {
            const description = repo.description || "System architecture and codebase repository.";
            const languageTag = repo.language ? `<span class="tech-tag">${repo.language}</span>` : '<span class="tech-tag">Logic</span>';
            const liveLinkHTML = repo.homepage 
                ? `<a href="${repo.homepage}" target="_blank" class="repo-link" style="color: var(--accent-glow); margin-right: 20px;">Live Webapp &nearr;</a>` 
                : '';

            htmlString += `
                <div class="project-card" style="display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600;">${repo.name.replace(/-/g, ' ')}</h3>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px; flex-grow: 1;">
                        ${description}
                    </p>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 25px;">
                        ${languageTag}
                        <span class="tech-tag">Systems</span>
                    </div>
                    <div style="display: flex; align-items: center; font-weight: 600; font-size: 0.9rem;">
                        ${liveLinkHTML}
                        <a href="${repo.html_url}" target="_blank" class="repo-link">View Architecture &rarr;</a>
                    </div>
                </div>
            `;
        });

        gridContainer.innerHTML = htmlString;

        // Apply animations to newly injected cards
        const dynamicCards = gridContainer.querySelectorAll('.project-card');
        dynamicCards.forEach(card => cardObserver.observe(card));

    } catch (error) {
        console.error("API Error:", error);
        gridContainer.innerHTML = '<p style="color: #ef4444; text-align: center;">Failed to load live projects. Check console.</p>';
    }
}

/* ==========================================
   4. THE TAB SWITCHER & SLIDER ENGINE
   ========================================== */
function initTabSlider() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sliderTrack = document.getElementById('slider-track');
    
    if (tabButtons.length === 0 || !sliderTrack) return;

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const slidePercentage = index * -25;
            sliderTrack.style.transform = `translateX(${slidePercentage}%)`;
        });
    });
}

/* ==========================================
   5. HARDWARE-ACCELERATED SMOOTH SCROLL
   ========================================== */
function initScrollEngine() {
    const scrollBtn = document.getElementById("scroll-down-btn");
    const targetSection = document.getElementById("projects"); 

    if (scrollBtn && targetSection) {
        scrollBtn.addEventListener("click", () => {
            targetSection.scrollIntoView({ 
                behavior: "smooth", 
                block: "start" 
            });
        });
    }
}

/* ==========================================
   6. DYNAMIC SCROLL HINT ENGINE
   ========================================== */
function initScrollHint() {
    const scrollHint = document.getElementById('scroll-hint');
    const heroSection = document.getElementById('hero');
    const bottomAnchor = document.getElementById('projects-bottom-anchor');

    if (!scrollHint || !heroSection || !bottomAnchor) return;

    // THE NEW CLICK LISTENER
    scrollHint.addEventListener('click', () => {
        window.scrollBy({ 
            top: window.innerHeight * 0.7, // Scrolls down exactly 70% of the user's screen height
            behavior: 'smooth' 
        });
    });

    const bottomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrollHint.classList.remove('visible');
            } else if (heroSection.getBoundingClientRect().bottom < 0) {
                scrollHint.classList.add('visible');
            }
        });
    }, { threshold: 0 });

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                if (bottomAnchor.getBoundingClientRect().top > window.innerHeight) {
                    scrollHint.classList.add('visible');
                }
            } else {
                scrollHint.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    bottomObserver.observe(bottomAnchor);
    heroObserver.observe(heroSection);
}


/* ==========================================
   7. THE SOCIAL CONNECTIONS ENGINE
   ========================================== */
const socialLinks = [
    {
        platform: "GitHub",
        url: "https://github.com/Nayanxyz",
        description: "Open-source system architecture, algorithms, and complete project repositories.",
        tag: "Codebase",
        handle: "github/Nayanxyz"
    },
    {
        platform: "Instagram",
        url: "https://www.instagram.com/nayan.xyz",
        description: "Professional experience, network connections, and system engineering discussions.",
        tag: "Network",
        handle: "@nayan.xyz"
    },
    {
        platform: "Email",
        url: "mailto:choudharyji527@gmail.com",
        description: "Direct line for architecture consultations, project inquiries, and professional communication.",
        tag: "Contact",
        handle: "choudharyji527@gmail.com"
    }
];

function renderSocialHandles() {
    const socialContainer = document.getElementById('social-grid');
    if (!socialContainer) return;

    let htmlString = '';
    
    socialLinks.forEach(social => {
        // PROTOCOL AWARENESS: 
        // If it is an email, open in the same window so no blank tab is created.
        // If it is a standard URL, open in a new tab.
        const targetAttr = social.url.startsWith('mailto:') ? '' : 'target="_blank"';
        htmlString += `
            <a href="${social.url}" ${targetAttr} class="project-card social-link-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: var(--text-main);">${social.platform}</h3>
                    <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </div>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px; flex-grow: 1;">
                    ${social.description}
                </p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <span class="handle-tag">${social.tag}</span>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <span class="tech-tag">${social.handle}</span>
                </div>
            </a>
        `;
    });

    socialContainer.innerHTML = htmlString;

    const dynamicCards = socialContainer.querySelectorAll('.project-card');
    if (typeof cardObserver !== 'undefined') {
        dynamicCards.forEach(card => cardObserver.observe(card));
    }
}
/* ==========================================
   8. INITIALIZATION CONTROLLER
   ========================================== */
// This is the ignition switch. It MUST stay at the very bottom.
document.addEventListener("DOMContentLoaded", () => {
    runTypewriterSequence();
    fetchGitHubProjects();
    observeStaticCards();
    initTabSlider();
    initScrollEngine(); 
    initScrollHint(); 
    renderSocialHandles();
});

