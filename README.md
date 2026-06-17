# Nayanxyz-Portfolio & Architecture
# 🌌 Developer Portfolio 

A high-performance, vanilla JavaScript portfolio engineered with clinical minimalism. This project features a custom HTML5 canvas physics engine, asynchronous GitHub API integration, and an intersection-observer-driven animation system.

## ✨ Core Features

- **Custom Physics Engine:** A lightweight, non-blocking particle network rendered on HTML5 `<canvas>`, featuring mouse-avoidance physics and dynamic proximity connections.
- **Asynchronous GitHub Integration:** Dynamically fetches, filters, and renders live repository data (description, language, URLs) directly from the GitHub REST API.
- **Intersection Observer Animations:** highly optimized scroll-triggered UI reveals and dynamic scroll hints that react to the viewport state without crushing the main thread.
- **State-Driven Typewriter Effect:** A custom async/await typewriter engine that types terminal commands with precise, millisecond-controlled pacing.
- **Zero Dependencies:** Built entirely with vanilla HTML, CSS, and JavaScript. No heavy frameworks, no bloated libraries.


## 🛠️ Technical Architecture

- **Frontend:** HTML5, CSS3 (Custom Variables, CSS Grid/Flexbox)
- **Logic:** ES6+ JavaScript (Async/Await, Promises, Intersection Observer API)
- **Data:** GitHub REST API (`/users/{username}/repos`)
- **Graphics:** HTML5 Canvas 2D API, Inline SVGs

## 🚀 Deployment & Setup

This is a static client-side application. No build step is required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nayanxyz/nayanxyz-portfolio.git
   ```

2. **Launch:** Open index.html in any modern web browser or host it directly via GitHub Pages, Vercel, or Netlify.
