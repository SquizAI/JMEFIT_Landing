// Particles Animation
document.addEventListener('DOMContentLoaded', () => {
    class Particle {
        constructor(canvas, options = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.x = options.x || Math.random() * canvas.width;
            this.y = options.y || Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = options.color || '#8e44ad';
            this.alpha = Math.random() * 0.5 + 0.1;
            this.originalAlpha = this.alpha;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.01;

            // Bounce off edges
            if (this.x < 0 || this.x > this.canvas.width) {
                this.speedX = -this.speedX;
            }
            if (this.y < 0 || this.y > this.canvas.height) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            this.ctx.globalAlpha = this.alpha;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        }
    }

    // Setup canvas
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    document.body.prepend(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Add canvas styles
    const style = document.createElement('style');
    style.innerHTML = `
        .particles-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = Math.min(window.innerWidth / 10, 100); // Adjust based on screen size
    const particleColors = ['#8e44ad', '#9b59b6', '#6c3483', '#5b2c6f'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, {
            color: particleColors[Math.floor(Math.random() * particleColors.length)]
        }));
    }

    // Connect particles with lines if they are close enough
    function connectParticles() {
        const maxDistance = 150;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(142, 68, 173, ${0.2 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();

    // Mouse interaction
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        
        // Create new particles at mouse position
        if (Math.random() < 0.1) {
            particles.push(new Particle(canvas, {
                x: mouse.x,
                y: mouse.y,
                color: particleColors[Math.floor(Math.random() * particleColors.length)]
            }));
            
            // Remove old particles if we have too many
            if (particles.length > particleCount + 20) {
                particles.shift();
            }
        }
        
        // Affect nearby particles
        for (let i = 0; i < particles.length; i++) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = mouse.radius / distance;
                const angle = Math.atan2(dy, dx);
                particles[i].x += Math.cos(angle) * force * 0.2;
                particles[i].y += Math.sin(angle) * force * 0.2;
                particles[i].alpha = particles[i].originalAlpha * 2;
            } else {
                particles[i].alpha = particles[i].originalAlpha;
            }
        }
    });

    // Resize event
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
