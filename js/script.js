// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSlider();
    initTabs();
    initModal();
    initCountdown();
    initReviewsCarousel();
    initMobileMenu();
    initFormValidation();
});

// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto slide
    startAutoSlide();
}

// Product Tabs Functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Newsletter Modal Functionality
function initModal() {
    const modal = document.getElementById('newsletter-modal');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('newsletter-form');

    // Show modal after 3 seconds
    setTimeout(() => {
        if (modal) {
            modal.classList.add('show');
        }
    }, 3000);

    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Simulate successful subscription
                alert('Thank you for subscribing! You will receive 20% off your next order.');
                closeModal();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Countdown Timer Functionality
function initCountdown() {
    const timers = document.querySelectorAll('.countdown-timer .timer');
    
    timers.forEach(timer => {
        // Set a target date (24 hours from now for demo)
        const targetDate = new Date().getTime() + (24 * 60 * 60 * 1000);
        
        function updateTimer() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                timer.textContent = `${days.toString().padStart(2, '0')}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
            } else {
                timer.textContent = "00d : 00h : 00m : 00s";
            }
        }
        
        // Update immediately and then every second
        updateTimer();
        setInterval(updateTimer, 1000);
    });
}

// Reviews Carousel Functionality
function initReviewsCarousel() {
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentReview = 0;
    let reviewInterval;

    function showReview(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextReview() {
        currentReview = (currentReview + 1) % slides.length;
        showReview(currentReview);
    }

    function startReviewCarousel() {
        reviewInterval = setInterval(nextReview, 4000);
    }

    function stopReviewCarousel() {
        clearInterval(reviewInterval);
    }

    // Dot navigation for reviews
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentReview = index;
            showReview(currentReview);
            stopReviewCarousel();
            startReviewCarousel();
        });
    });

    // Pause on hover
    const reviewsContainer = document.querySelector('.reviews-carousel');
    if (reviewsContainer) {
        reviewsContainer.addEventListener('mouseenter', stopReviewCarousel);
        reviewsContainer.addEventListener('mouseleave', startReviewCarousel);
    }

    // Start carousel
    startReviewCarousel();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }
}

// Form Validation
function initFormValidation() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Simulate successful subscription
                showNotification('Thank you for subscribing!', 'success');
                form.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });
}

// Product Actions
function initProductActions() {
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.action-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const action = btn.textContent.trim();
            
            switch(action) {
                case '🛒':
                    addToCart(btn);
                    break;
                case '♡':
                    addToWishlist(btn);
                    break;
                case '⚖':
                    addToCompare(btn);
                    break;
                case '👁':
                    quickView(btn);
                    break;
            }
        });
    });
}

function addToCart(btn) {
    // Simulate adding to cart
    showNotification('Product added to cart!', 'success');
    
    // Update cart count
    const cartCount = document.querySelector('.cart-btn .count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
    }
    
    // Add animation
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

function addToWishlist(btn) {
    showNotification('Product added to wishlist!', 'success');
    
    // Update wishlist count
    const wishlistCount = document.querySelector('.wishlist-btn .count');
    if (wishlistCount) {
        const currentCount = parseInt(wishlistCount.textContent);
        wishlistCount.textContent = currentCount + 1;
    }
    
    // Change heart to filled
    btn.textContent = '❤';
    btn.style.color = '#ff4444';
}

function addToCompare(btn) {
    showNotification('Product added to compare!', 'success');
}

function quickView(btn) {
    showNotification('Quick view opened!', 'info');
}

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'info':
            notification.style.backgroundColor = '#3b82f6';
            break;
        default:
            notification.style.backgroundColor = '#6b7280';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.createElement('input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            // Toggle search input
            if (searchInput.parentNode) {
                searchInput.parentNode.removeChild(searchInput);
            } else {
                searchInput.type = 'text';
                searchInput.placeholder = 'Search products...';
                searchInput.style.cssText = `
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 300px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                `;
                
                searchBtn.parentNode.style.position = 'relative';
                searchBtn.parentNode.appendChild(searchInput);
                searchInput.focus();
                
                // Handle search
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const query = searchInput.value.trim();
                        if (query) {
                            showNotification(`Searching for: ${query}`, 'info');
                            // Here you would implement actual search functionality
                        }
                    }
                });
                
                // Close on click outside
                document.addEventListener('click', (e) => {
                    if (!searchBtn.parentNode.contains(e.target)) {
                        if (searchInput.parentNode) {
                            searchInput.parentNode.removeChild(searchInput);
                        }
                    }
                });
            }
        });
    }
}

// Size selector functionality
function initSizeSelector() {
    const sizeOptions = document.querySelectorAll('.product-sizes span');
    
    sizeOptions.forEach(size => {
        size.addEventListener('click', () => {
            // Remove active class from siblings
            const siblings = size.parentNode.querySelectorAll('span');
            siblings.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked size
            size.classList.add('active');
            
            // Add some styling for active state
            size.style.backgroundColor = '#000';
            size.style.color = '#fff';
            
            siblings.forEach(s => {
                if (s !== size) {
                    s.style.backgroundColor = '';
                    s.style.color = '';
                }
            });
        });
    });
}

// Color selector functionality
function initColorSelector() {
    const colorOptions = document.querySelectorAll('.product-colors .color');
    
    colorOptions.forEach(color => {
        color.addEventListener('click', () => {
            // Remove active class from siblings
            const siblings = color.parentNode.querySelectorAll('.color');
            siblings.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked color
            color.classList.add('active');
            
            // Add border to show selection
            siblings.forEach(c => {
                c.style.border = '2px solid #fff';
                c.style.boxShadow = '0 0 0 1px #ddd';
            });
            
            color.style.border = '2px solid #000';
            color.style.boxShadow = '0 0 0 1px #000';
        });
    });
}

// Initialize additional functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProductActions();
    initSmoothScrolling();
    initLazyLoading();
    initSearch();
    initSizeSelector();
    initColorSelector();
});

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust mobile navigation
    const mobileNav = document.querySelector('.mobile-nav');
    if (window.innerWidth > 768) {
        if (mobileNav) {
            mobileNav.style.display = 'none';
        }
    } else {
        if (mobileNav) {
            mobileNav.style.display = 'flex';
        }
    }
});

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

// Add scroll effects
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header) {
        if (scrolled > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.backgroundColor = 'rgba(255,255,255,0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Console welcome message
console.log('%c🛍️ Welcome to Ochaka!', 'color: #ff4444; font-size: 20px; font-weight: bold;');
console.log('%cEnjoy shopping with us!', 'color: #333; font-size: 14px;');
