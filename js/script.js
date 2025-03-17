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
    
    // Email notification functionality
    const notifyBtn = document.getElementById('notify-btn');
    const emailInput = document.getElementById('subscriber-email');
    const notificationMsg = document.getElementById('notification-message');
    
    // Load previously stored emails from localStorage
    const storedEmails = JSON.parse(localStorage.getItem('jmefitSubscribers') || '[]');
    
    notifyBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (isValidEmail(email)) {
            // Show loading state
            notifyBtn.disabled = true;
            notifyBtn.innerText = 'SENDING...';
            
            // Store email in localStorage
            if (!storedEmails.includes(email)) {
                storedEmails.push(email);
                localStorage.setItem('jmefitSubscribers', JSON.stringify(storedEmails));
            }
            
            // Prepare to send email to site owner
            const ownerTemplateParams = {
                to_email: 'your-email@example.com', // Replace with your actual email
                from_name: 'JMEFIT Website',
                subscriber_email: email,
                message: `New subscriber: ${email} has signed up for launch notifications.`
            };
            
            // Prepare confirmation email to subscriber
            const subscriberTemplateParams = {
                to_email: email,
                from_name: 'JMEFIT',
                message: 'Thank you for signing up for our launch notification! We will let you know as soon as we go live. Stay fit!'
            };
            
            // Send email to site owner
            emailjs.send('default_service', 'owner_template', ownerTemplateParams)
                .then(() => {
                    // Send confirmation email to subscriber
                    return emailjs.send('default_service', 'subscriber_template', subscriberTemplateParams);
                })
                .then(() => {
                    // Show success message
                    notificationMsg.innerText = 'Thank you! We will notify you when we launch.';
                    notificationMsg.style.color = '#8e44ad';
                    notificationMsg.style.display = 'block';
                    emailInput.value = '';
                    
                    // Reset button
                    notifyBtn.disabled = false;
                    notifyBtn.innerText = 'NOTIFY ME';
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        notificationMsg.style.display = 'none';
                    }, 5000);
                })
                .catch((error) => {
                    console.error('Email sending failed:', error);
                    
                    // Show fallback success message (we still stored the email locally)
                    notificationMsg.innerText = 'Thank you! Your email has been saved.';
                    notificationMsg.style.color = '#8e44ad';
                    notificationMsg.style.display = 'block';
                    emailInput.value = '';
                    
                    // Reset button
                    notifyBtn.disabled = false;
                    notifyBtn.innerText = 'NOTIFY ME';
                });
        } else {
            // Show error message for invalid email
            notificationMsg.innerText = 'Please enter a valid email address.';
            notificationMsg.style.color = '#e74c3c';
            notificationMsg.style.display = 'block';
        }
    });
    
    // Email validation function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Helper function to display stored emails in console for checking
    function checkStoredEmails() {
        const emails = JSON.parse(localStorage.getItem('jmefitSubscribers') || '[]');
        console.log('Stored emails:', emails);
        return emails;
    }
    
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
