/* ==========================================
   NETWORK NODE PHYSICS ENGINE
   Engineered for Clinical Minimalism
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // --- SYSTEM PARAMETERS ---
    // Adjust these to tune the physics

    const density = 6000; // Decreased from 9000. Creates MORE nodes.
    const maxDistance = 140; // Increased. Draws longer connecting lines.
    const particleRadius = 2.0; // Slightly larger data points.
    const baseSpeed = 0.15; // Cut in half. Slower movement implies calculated data flow, not chaos.

    // --- STATE MACHINE ---
    // This allows us to change behavior based on scroll position later
    window.SYSTEM_STATE = 'idle'; 

    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    // --- RESIZE HANDLER ---
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    }

    // --- THE NODE CLASS ---
    class Node {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Random trajectory
            this.vx = (Math.random() - 0.5) * baseSpeed;
            this.vy = (Math.random() - 0.5) * baseSpeed;
            // Enterprise Blue with low opacity
            this.color = `rgba(47, 129, 247, 0.6)`; 
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Screen collision detection (bounce off walls)
            if (this.x > width || this.x < 0) this.vx = -this.vx;
            if (this.y > height || this.y < 0) this.vy = -this.vy;

            // Subtle Mouse Avoidance (keeps it professional, not chaotic)
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Push away gently
                    this.vx -= forceDirectionX * force * 0.02;
                    this.vy -= forceDirectionY * force * 0.02;
                }
            }

            // Apply friction so they don't accelerate infinitely from mouse pushes
            this.vx *= 0.99;
            this.vy *= 0.99;

            // Maintain base speed
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (currentSpeed < baseSpeed * 0.5) {
                this.vx *= 1.1;
                this.vy *= 1.1;
            }

            this.x += this.vx;
            this.y += this.vy;
        }
    }

    // --- INITIALIZATION ---
    function init() {
        particles = [];
        // Calculate particle count based on screen size so it doesn't crash mobiles
        const numberOfParticles = Math.floor((width * height) / density);
        
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            particles.push(new Node(x, y));
        }
    }

    // --- THE RENDER LOOP ---
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        // Update and draw nodes
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect close nodes with lines (The "Network" effect)
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // Opacity fades as they get further apart
                    const opacity = 1 - (distance / maxDistance);
                    // Muted secondary blue/gray for connections
                    ctx.strokeStyle = `rgba(9, 45, 94, ${opacity * 0.35})`; 
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // --- EVENT LISTENERS ---
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(resize, 200);
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // IGNITION
    resize();
    animate();
});