// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add shadow to header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.classList.add('header-shadow');
    } else {
        header.classList.remove('header-shadow');
    }
});

// Mobile menu toggle
const menuButton = document.createElement('button');
menuButton.className = 'menu-toggle';
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
menuButton.addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Add to mobile only
if (window.innerWidth < 768) {
    document.querySelector('.nav').appendChild(menuButton);
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track CTA clicks
document.querySelectorAll('.cta-button, .nav-button').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('CTA', 'click', this.textContent.trim());
    });
});
