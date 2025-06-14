// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Scroll animations
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.scroll-animate');
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Add scroll-animate class to elements that should animate
    function addScrollAnimateClasses() {
        const elementsToAnimate = [
            '.about-content',
            '.skill-category',
            '.project-card',
            '.timeline-item',
            '.contact-content'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('scroll-animate');
            });
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(44, 47, 51, 0.95)';
        } else {
            navbar.style.background = 'var(--bg-primary)';
        }
    }

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Find the end of the tag
                    let tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            // Start typing animation after a short delay
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 30);
            }, 500);
        }
    }

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Skill tags hover effect
    function initSkillTagsEffect() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Project cards tilt effect
    function initProjectCardsTilt() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // Contact links animation
    function initContactLinksAnimation() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.link-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.link-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    // Intersection Observer for better performance
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all scroll-animate elements
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    // Smooth reveal animation for sections
    function initSectionReveal() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Performance optimized scroll handler
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateNavbarBackground();
                // Disable parallax on mobile for better performance
                if (window.innerWidth > 768) {
                    parallaxEffect();
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        // Recalculate animations on resize
        updateActiveNavLink();
    });

    // Initialize all functionality
    function init() {
        addScrollAnimateClasses();
        initIntersectionObserver();
        initSkillTagsEffect();
        initProjectCardsTilt();
        initContactLinksAnimation();
        
        // Add a small delay for better UX
        setTimeout(() => {
            initSectionReveal();
        }, 300);
        
        // Initialize typing animation
        setTimeout(() => {
            initTypingAnimation();
        }, 800);
    }

    // Start the application
    init();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any loading screens if they exist
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add focus management for accessibility
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        link.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });

    // Console message for developers
    console.log(`
    🚀 Solomon Pierce Portfolio
    ========================
    Built with modern web technologies
    - Neumorphic Design
    - Responsive Layout
    - Smooth Animations
    - Accessibility Features
    
    GitHub: https://github.com/spierceVR
    LinkedIn: https://linkedin.com/in/solomon-pierce
    `);
});

// Add some utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential use in other scripts
window.portfolioUtils = utils;