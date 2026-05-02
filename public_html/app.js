// Ailexity Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for internal links
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Enhanced card interactions
    function setupCardInteractions() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
    
    // Scroll-triggered animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease-out';
                }
            });
        }, observerOptions);
        
        // Elements to animate on scroll
        const animateElements = document.querySelectorAll('.service-card, .about-content, .industry-item, .process-step');
        
        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }
    
    // Contact button functionality
    function setupContactButtons() {
        const contactButtons = document.querySelectorAll('.btn-contact, .btn-contact-large');
        
        contactButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Simulate contact action (in real app, this would open a modal or redirect)
                setTimeout(() => {
                    alert('Thank you for your interest! We will contact you soon.');
                }, 200);
            });
        });
    }
    
    // Header scroll effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Industry items hover effect
    function setupIndustryHover() {
        const industryItems = document.querySelectorAll('.industry-item');
        
        industryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.borderColor = '#FF6B47';
                this.style.borderWidth = '2px';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.borderColor = '#f0f0f0';
                this.style.borderWidth = '1px';
            });
        });
    }
    
    // Process steps animation
    function setupProcessAnimation() {
        const processSteps = document.querySelectorAll('.process-step');
        
        processSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', function() {
                const stepNumber = this.querySelector('.step-number');
                stepNumber.style.transform = 'scale(1.1) rotate(5deg)';
                stepNumber.style.background = '#e55a3d';
            });
            
            step.addEventListener('mouseleave', function() {
                const stepNumber = this.querySelector('.step-number');
                stepNumber.style.transform = 'scale(1) rotate(0deg)';
                stepNumber.style.background = '#FF6B47';
            });
        });
    }
    
    // Loading animation for service features
    function setupFeatureAnimation() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const features = card.querySelectorAll('.service-features li');
            
            card.addEventListener('mouseenter', function() {
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(5px)';
                        feature.style.color = '#FF6B47';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                features.forEach(feature => {
                    feature.style.transform = 'translateX(0)';
                    feature.style.color = '#666666';
                });
            });
        });
    }
    
    // Initialize all features
    smoothScroll();
    setupCardInteractions();
    setupScrollAnimations();
    setupContactButtons();
    setupHeaderScroll();
    setupIndustryHover();
    setupProcessAnimation();
    setupFeatureAnimation();
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add a subtle parallax effect to hero section
    function setupParallax() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, 10));
    }
    
    setupParallax();
    
    // Add typing effect to hero tagline
    function typeWriter() {
        const tagline = document.querySelector('.hero-tagline');
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
    
    console.log('Ailexity website loaded successfully!');
});


// Pos script
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Feature Cards Animation
const featureCards = document.querySelectorAll('.feature-card');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Product Category Filter
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter animation
        productCards.forEach(card => {
            card.style.animation = 'fadeIn 0.5s ease';
        });
    });
});

// Product Search Functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('h4').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Add to Cart Simulation
productCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
        
        // Show notification
        showNotification('Product added to cart!');
    });
});

// Notification System
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    /* Mobile Menu Styles */
    @media (max-width: 968px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
            display: flex;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
    }
    
    lastScroll = currentScroll;
});

// Pricing card hover effect
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Button click effects
document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ailexity POS Landing Page Loaded');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Form validation for CTA buttons
document.querySelectorAll('.cta-actions button').forEach(button => {
    button.addEventListener('click', (e) => {
        showNotification('Feature coming soon! Stay tuned.');
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});
