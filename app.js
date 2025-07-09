// Global variables
let currentSection = 'home';
let particles = [];
let isAnimating = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemeToggle();
    initializeParticles();
    initializeScrollAnimations();
    initializeAITools();
    initializeContactForm();
    initializeProfileEffects();
    initializeDemoButtons();
    
    // Show home section by default
    showSection('home');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            
            if (targetSection !== currentSection) {
                showSection(targetSection);
                updateActiveNavLink(this);
            }
        });
    });
}

function showSection(sectionId) {
    if (isAnimating) return;
    
    isAnimating = true;
    const currentSectionEl = document.getElementById(currentSection);
    const targetSectionEl = document.getElementById(sectionId);
    
    // Hide current section
    if (currentSectionEl) {
        currentSectionEl.classList.remove('active');
    }
    
    // Show target section with delay for smooth transition
    setTimeout(() => {
        if (targetSectionEl) {
            targetSectionEl.classList.add('active');
            currentSection = sectionId;
            
            // Trigger section-specific animations
            triggerSectionAnimations(sectionId);
        }
        isAnimating = false;
    }, 300);
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Animate elements based on section
    switch(sectionId) {
        case 'home':
            animateProfileImage();
            animateAchievementCards();
            break;
        case 'research':
            animateResearchCards();
            break;
        case 'publications':
            animatePublications();
            break;
        case 'conferences':
            animateTimeline();
            break;
        case 'ai-implementation':
            animateAITools();
            break;
        case 'about':
            animateSkillBars();
            break;
        case 'contact':
            animateContactForm();
            break;
    }
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    setTheme(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Particle system for 4D effects
function initializeParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    
    // Animate particles
    setInterval(createParticle, 2000);
}

function createParticle() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and properties
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

// Profile image 4D effects
function initializeProfileEffects() {
    const profileImage = document.querySelector('.profile-image');
    const profileWrapper = document.querySelector('.profile-image-wrapper');
    
    if (!profileImage || !profileWrapper) return;
    
    // Mouse movement effect
    profileWrapper.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    profileWrapper.addEventListener('mouseleave', function() {
        profileImage.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.research-card, .publication-item, .timeline-item, .ai-tool-card').forEach(el => {
        observer.observe(el);
    });
}

// Animation functions for different sections
function animateProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.animation = 'none';
        setTimeout(() => {
            profileImage.style.animation = 'profileFloat 6s ease-in-out infinite';
        }, 100);
    }
}

function animateAchievementCards() {
    const cards = document.querySelectorAll('.achievement-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateResearchCards() {
    const cards = document.querySelectorAll('.research-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function animatePublications() {
    const publications = document.querySelectorAll('.publication-item');
    publications.forEach((pub, index) => {
        pub.style.opacity = '0';
        pub.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            pub.style.transition = 'all 0.5s ease-out';
            pub.style.opacity = '1';
            pub.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateAITools() {
    const tools = document.querySelectorAll('.ai-tool-card');
    tools.forEach((tool, index) => {
        tool.style.opacity = '0';
        tool.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            tool.style.transition = 'all 0.6s ease-out';
            tool.style.opacity = '1';
            tool.style.transform = 'scale(1)';
        }, index * 200);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, index * 100);
    });
}

function animateContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Demo buttons functionality
function initializeDemoButtons() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const demoType = this.getAttribute('data-demo');
            showDemo(demoType);
        });
    });
}

function showDemo(type) {
    const demos = {
        'forecasting': 'Interactive Economic Forecasting Demo - Predicting GDP growth using machine learning models.',
        'policy': 'Policy Impact Simulation Demo - Analyzing the effects of tax policy changes on economic indicators.',
        'nlp': 'NLP Economics Demo - Sentiment analysis of economic news and market reports.',
        'trading': 'Algorithmic Trading Demo - AI-powered trading strategy optimization and backtesting.'
    };
    
    alert(`${demos[type] || 'Demo not available'}\n\nThis is a demonstration of the interactive features that would be available in the full implementation.`);
}

// AI Tools functionality
function initializeAITools() {
    // Policy change slider
    const policySlider = document.getElementById('policy-change');
    const policyValue = document.getElementById('policy-change-value');
    
    if (policySlider && policyValue) {
        policySlider.addEventListener('input', function() {
            policyValue.textContent = this.value + '%';
        });
    }
}

// AI Tool functions
function runForecasting() {
    const period = document.getElementById('forecast-period').value;
    const indicator = document.getElementById('economic-indicator').value;
    const resultDiv = document.getElementById('forecast-result');
    
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        const indicators = {
            'gdp': 'GDP Growth',
            'inflation': 'Inflation Rate',
            'unemployment': 'Unemployment Rate',
            'interest': 'Interest Rate'
        };
        
        const mockValue = (Math.random() * 10 + 1).toFixed(2);
        const trend = Math.random() > 0.5 ? 'increasing' : 'decreasing';
        
        resultDiv.innerHTML = `
            <div class="forecast-output">
                <h4>${indicators[indicator]} Forecast</h4>
                <p><strong>Period:</strong> ${period} months</p>
                <p><strong>Predicted Value:</strong> ${mockValue}%</p>
                <p><strong>Trend:</strong> ${trend}</p>
                <p><strong>Confidence:</strong> 85%</p>
            </div>
        `;
    }, 2000);
}

function runPolicySimulation() {
    const policyType = document.getElementById('policy-type').value;
    const policyChange = document.getElementById('policy-change').value;
    const resultDiv = document.getElementById('policy-result');
    
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        const policies = {
            'tax': 'Tax Policy',
            'monetary': 'Monetary Policy',
            'fiscal': 'Fiscal Policy',
            'trade': 'Trade Policy'
        };
        
        const impact = Math.abs(policyChange) * 0.1;
        const direction = policyChange > 0 ? 'positive' : 'negative';
        
        resultDiv.innerHTML = `
            <div class="policy-output">
                <h4>${policies[policyType]} Impact</h4>
                <p><strong>Change:</strong> ${policyChange}%</p>
                <p><strong>Economic Impact:</strong> ${impact.toFixed(2)}% ${direction}</p>
                <p><strong>Affected Sectors:</strong> Manufacturing, Services, Agriculture</p>
                <p><strong>Time to Effect:</strong> 6-12 months</p>
            </div>
        `;
    }, 1500);
}

function analyzeSentiment() {
    const text = document.getElementById('sentiment-text').value;
    const resultDiv = document.getElementById('sentiment-result');
    
    if (!resultDiv) return;
    
    if (!text.trim()) {
        resultDiv.innerHTML = '<p style="color: var(--color-error);">Please enter text to analyze.</p>';
        return;
    }
    
    resultDiv.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        const sentiments = ['Positive', 'Negative', 'Neutral'];
        const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        const confidence = (Math.random() * 40 + 60).toFixed(1);
        const keywords = ['growth', 'market', 'economy', 'investment', 'inflation'];
        
        resultDiv.innerHTML = `
            <div class="sentiment-output">
                <h4>Sentiment Analysis Results</h4>
                <p><strong>Overall Sentiment:</strong> ${sentiment}</p>
                <p><strong>Confidence:</strong> ${confidence}%</p>
                <p><strong>Key Terms:</strong> ${keywords.join(', ')}</p>
                <p><strong>Market Outlook:</strong> ${sentiment === 'Positive' ? 'Bullish' : sentiment === 'Negative' ? 'Bearish' : 'Neutral'}</p>
            </div>
        `;
    }, 2000);
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission();
        });
    }
}

function handleContactSubmission() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    
    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Utility functions
function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
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

// Optimize scroll events
let ticking = false;
function optimizedScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Scroll-based animations can be added here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', optimizedScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Mobile navigation toggle (if needed)
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Initialize performance monitoring
function initializePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

initializePerformance();