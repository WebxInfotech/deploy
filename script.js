"use strict";
class PortfolioApp {
    constructor() {
        this.skillProgresses = [];
        this.statNumbers = [];
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.contactForm = document.getElementById('contact-form');
        this.init();
    }
    init() {
        this.setupEventListeners();
        this.initSkillProgress();
        this.initCounterAnimations();
        this.initScrollAnimations();
        this.initSmoothScrolling();
    }
    setupEventListeners() {
        this.navToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        this.contactForm?.addEventListener('submit', (e) => {
            this.handleContactForm(e);
        });
        const ctaButton = document.getElementById('cta-button');
        const portfolioButton = document.getElementById('portfolio-button');
        ctaButton?.addEventListener('click', () => {
            this.scrollToSection('contact');
        });
        portfolioButton?.addEventListener('click', () => {
            this.scrollToSection('services');
        });
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
        });
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }
    toggleMobileMenu() {
        this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');
    }
    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
    }
    handleContactForm(e) {
        e.preventDefault();
        if (!this.contactForm)
            return;
        const formData = new FormData(this.contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        this.showNotification('Message sent successfully!', 'success');
        this.contactForm.reset();
    }
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease'
        });
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
        else {
            notification.style.background = '#e74c3c';
        }
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        }
        else {
            navbar?.classList.remove('scrolled');
        }
    }
    initSkillProgress() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const element = bar;
            const width = element.getAttribute('data-width');
            if (width) {
                this.skillProgresses.push({
                    element,
                    targetWidth: parseInt(width)
                });
            }
        });
        this.animateSkillBars();
    }
    animateSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = this.skillProgresses.find(sp => sp.element === entry.target);
                    if (skillProgress) {
                        setTimeout(() => {
                            skillProgress.element.style.width = `${skillProgress.targetWidth}%`;
                        }, 500);
                    }
                }
            });
        }, { threshold: 0.5 });
        this.skillProgresses.forEach(skillProgress => {
            observer.observe(skillProgress.element);
        });
    }
    initCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const element = stat;
            const count = element.getAttribute('data-count');
            if (count) {
                this.statNumbers.push(element);
            }
        });
        this.animateCounters();
    }
    animateCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const targetCount = parseInt(element.getAttribute('data-count') || '0');
                    this.animateCounter(element, targetCount);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        this.statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    animateCounter(element, targetCount) {
        let currentCount = 0;
        const increment = targetCount / 60;
        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                currentCount = targetCount;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentCount).toString();
        }, 16);
    }
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .stat-item, .contact-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                if (targetId) {
                    this.scrollToSection(targetId);
                }
            });
        });
    }
}
class Utils {
    static debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    static throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    static isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .notification {
        font-family: 'Inter', sans-serif;
    }
`;
document.head.appendChild(style);
