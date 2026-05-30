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
        await typeLine("hero-line-1", "Hello everyone!", 30);
        await sleep(100); 
        await typeLine("hero-line-2", "I am Nayan", 30);
        await sleep(150);
        await typeLine("hero-terminal", "engineering automated systems and scalable web applications.", 15);
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

// Function to observe static cards (like Education/Certificates)
function observeStaticCards() {
    const staticCards = document.querySelectorAll('.slider-panel .project-card');
    staticCards.forEach(card => cardObserver.observe(card));
}

/* ==========================================
   3. THE GITHUB API INTEGRATION ENGINE (Pinned & Live Links)
   ========================================== */
const gridContainer = document.getElementById('project-grid');

// ENGINEERING PATTERN: The Target Array
// Type the exact names of your pinned GitHub repositories inside these quotes.
// Example: "fyers-trading-bot", "ai-extraction-pipeline"
const pinnedRepos = [
    "Swarm-API-Super-Agent-Travily", 
    "webcam-motion-alert", 
    "Web-Automation-with-Selenium",
    "Web_scrape_sql",
    "Personality-Ai-Agent",
    "Django-Application-form"
];

async function fetchGitHubProjects() {
    if (!gridContainer) return;
    
    try {
        gridContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Connecting to GitHub API...</p>';

        // Fetch up to 100 repositories to ensure we capture all your pinned ones
        const response = await fetch('https://api.github.com/users/Nayanxyz/repos?per_page=100');
        
        if (!response.ok) throw new Error(`GitHub API returned status: ${response.status}`);

        const allRepos = await response.json();
        
        // Filter the incoming data against your target array
        let displayRepos = [];
        if (pinnedRepos.length > 0 && pinnedRepos[0] !== "repo-name-1") {
            displayRepos = allRepos.filter(repo => pinnedRepos.includes(repo.name));
        } else {
            // Fallback: If you haven't updated the array yet, just show the latest 6
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
            
            // THE CONDITIONAL RENDER: If repo.homepage exists, build the link.
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
const tabButtons = document.querySelectorAll('.tab-btn');
const sliderTrack = document.getElementById('slider-track');

tabButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const slidePercentage = index * -33.333;
        if (sliderTrack) {
            sliderTrack.style.transform = `translateX(${slidePercentage}%)`;
        }
    });
});

/* ==========================================
   5. HARDWARE-ACCELERATED SMOOTH SCROLL
   ========================================== */
const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
    heroBtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        const targetSection = document.getElementById('projects');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ==========================================
   6. INITIALIZATION CONTROLLER
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    runTypewriterSequence();
    fetchGitHubProjects();
    observeStaticCards();
});