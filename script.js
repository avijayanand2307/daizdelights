// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.style.left = navMenu.style.left === '0px' ? '-100%' : '0px';
});

// Close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.left = '-100%';
    });
});

// Shopping Cart
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

document.querySelectorAll('.btn-small').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        cartCountElement.textContent = cartCount;

        // Show feedback
        const card = button.closest('.product-card');
        const productName = card.querySelector('.product-info h3').textContent;
        showNotification(`${productName} added to cart!`);
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #51CF66 0%, #37B24D 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideNotification 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideNotification {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideNotification 0.3s ease-in reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form Submission
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully! We\'ll get back to you soon.');
    e.target.reset();
});

document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showNotification(`Thanks for subscribing, ${email}!`);
    e.target.reset();
});

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Order Now Button
document.querySelector('.hero .btn-primary')?.addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
});

// Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Navbar Hide on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add to Cart with Quantity
function addToCart(productName, price) {
    const item = {
        name: productName,
        price: price,
        quantity: 1,
        timestamp: new Date().toISOString()
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(p => p.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Rating Stars Interaction
document.querySelectorAll('.rating').forEach(ratingElement => {
    ratingElement.style.cursor = 'pointer';
    ratingElement.addEventListener('click', () => {
        showNotification('Thank you for your rating!');
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.style.left === '0px') {
        navMenu.style.left = '-100%';
    }
});

console.log('🎂 Welcome to DaiZ Delights! Enjoy our delicious treats.');
