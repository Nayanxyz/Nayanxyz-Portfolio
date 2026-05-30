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
   3. THE GITHUB API INTEGRATION ENGINE
   ========================================== */
const gridContainer = document.getElementById('project-grid');

async function fetchGitHubProjects() {
    if (!gridContainer) return;
    
    try {
        gridContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Connecting to GitHub API...</p>';

        const response = await fetch('https://api.github.com/users/Nayanxyz/repos?sort=updated&per_page=6');
        
        if (!response.ok) throw new Error(`GitHub API returned status: ${response.status}`);

        const repos = await response.json();
        
        if (repos.length === 0) {
            gridContainer.innerHTML = '<p style="color: var(--text-muted);">No public repositories found.</p>';
            return;
        }

        // Build the HTML string efficiently
        let htmlString = '';
        repos.forEach(repo => {
            const description = repo.description || "System architecture and codebase repository.";
            const languageTag = repo.language ? `<span class="tech-tag">${repo.language}</span>` : '<span class="tech-tag">Logic</span>';

            htmlString += `
                <div class="project-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600;">${repo.name.replace(/-/g, ' ')}</h3>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px;">
                        ${description}
                    </p>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
                        ${languageTag}
                        <span class="tech-tag">Systems</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">View Architecture &rarr;</a>
                </div>
            `;
        });

        // Inject the HTML
        gridContainer.innerHTML = htmlString;

        // CRITICAL: Now that the new cards exist in the DOM, tell the observer to animate them
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