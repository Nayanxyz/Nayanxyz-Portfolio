/* 1. THE DATA LAYER */
const projectsData = [
    {
        title: "Algorithmic Trading Engine",
        description: "High-frequency execution bot utilizing Fyers API for millisecond order routing and market data analysis.",
        techStack: ["Python", "WebSockets", "Pandas"],
        githubLink: "#"
    },
    {
        title: "Campus Placement API",
        description: "Decoupled backend architecture handling role-based access, concurrent user applications, and relational data.",
        techStack: ["Flask", "PostgreSQL", "REST API"],
        githubLink: "https://github.com/Nayanxyz/Nayanxyz-Portfolio.git"
    },
    {
        title: "Headless Extraction Bot",
        description: "Automated data pipeline utilizing Selenium to bypass basic bot-detection and scrape dynamic DOM elements.",
        techStack: ["Python", "Selenium", "Data Automation"],
        githubLink: "#"
    }
];

/* ==========================================
   2. THE RENDER ENGINE 
   (This reads the data and builds the HTML)
   ========================================== */

// Step A: Find the empty container in the HTML
const gridContainer = document.getElementById('project-grid');

// Step B: Loop through every project in our database
projectsData.forEach(project => {
    
    // Step C: Create the HTML for the tags (e.g., Python, Flask)
    const techTagsHTML = project.techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Step D: Construct the actual card HTML using Template Literals
    const cardHTML = `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${techTagsHTML}
            </div>
            <a href="${project.githubLink}" target="_blank" class="repo-link">View Architecture &rarr;</a>
        </div>
    `;

    // Step E: Inject the constructed card into the live webpage
    gridContainer.innerHTML += cardHTML;
});

/* ==========================================
   3. THE ANIMATION CONTROLLER (Intersection Observer)
   ========================================== */

// 1. Define the rules for the observer
const observerOptions = {
    root: null, // Use the browser viewport as the camera
    threshold: 0.1, // Trigger when 10% of the card is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
};

// 2. Create the observer machine
const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the card has entered the camera's view...
        if (entry.isIntersecting) {
            // Add the 'show' class to trigger the CSS animation
            entry.target.classList.add('show');
            // Stop watching this specific card once it has animated
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// 3. Find all the cards and attach the observer to them
// Note: We use setTimeout to ensure the DOM has finished painting the cards first.
setTimeout(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        cardObserver.observe(card);
    });
}, 100);

/* ==========================================
   4. THE ASYNC TYPEWRITER ENGINE
   ========================================== */

// 1. We build a utility function that returns a Promise. 
// This acts as a mathematical delay in our execution thread.
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 2. The core typing function
async function typeLine(elementId, text, speed) {
    const element = document.getElementById(elementId);
    element.innerHTML = ""; // Clear it first
    
    // Loop through the string, add one character, then pause
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await sleep(speed);
    }
}

// 3. The Execution Sequence.
// The 'await' keyword forces the system to finish Line 1 before starting Line 2.
async function runTypewriterSequence() {
    await typeLine("hero-line-1", "Hello everyone!", 30);
    await sleep(100); // Brief pause between lines
    
    await typeLine("hero-line-2", "I am Nayan", 30);
    await sleep(150);
    
    await typeLine("hero-terminal", "automating execution pipelines and engineering algorithmic systems.", 15);
}

// Trigger the sequence when the page loads
runTypewriterSequence();