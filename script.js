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