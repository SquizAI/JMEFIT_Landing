// Countdown Timer Function
document.addEventListener('DOMContentLoaded', () => {
    // Set the launch date - 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    // Update countdown every second
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "<h2>We're Live!</h2>";
        }
    }, 1000);
    
    // Instagram button approach - no email functionality needed
    
    // Add subtle interactive effect to background
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const background = document.querySelector('.background-animation');
        background.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
    
    // Animate on scroll
    window.addEventListener('scroll', () => {
        const content = document.querySelector('.content');
        const position = content.getBoundingClientRect().top;
        
        if (position < window.innerHeight - 100) {
            content.style.opacity = 1;
            content.style.transform = 'translateY(0)';
        }
    });
});
