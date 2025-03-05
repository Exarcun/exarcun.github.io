// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Parallax effect for hero section
    const parallaxContainer = document.querySelector('.parallax-container');
    
    if (parallaxContainer) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const layerBack = document.querySelector('.layer-back');
            const layerMiddle = document.querySelector('.layer-middle');
            
            if (layerBack && layerMiddle) {
                layerBack.style.transform = `translateY(${scrollPosition * 0.5}px) translateZ(-1px) scale(2)`;
                layerMiddle.style.transform = `translateY(${scrollPosition * 0.3}px) translateZ(-0.5px) scale(1.5)`;
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
        
        // Animate skill bars when they come into view
        const skillSection = document.querySelector('#skills');
        
        if (skillSection) {
            const skillSectionTop = skillSection.getBoundingClientRect().top;
            const skillLevels = document.querySelectorAll('.skill-level');
            
            if (skillSectionTop < triggerBottom) {
                skillLevels.forEach(skillLevel => {
                    const width = skillLevel.style.width;
                    skillLevel.style.width = '0';
                    
                    setTimeout(() => {
                        skillLevel.style.width = width;
                    }, 100);
                });
            }
        }
    }
    
    // Initial check on page load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link update on scroll
    const sections = document.querySelectorAll('section');
    
    function updateActiveNavLink() {
        let currentSection = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Form submission handling (prevent default and show alert for demo)
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real scenario, you would send the form data to a server
            // For this demo, we'll just show an alert
            alert('Your message has been sent successfully! (Demo only)');
            this.reset();
        });
    }
});
