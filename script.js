// Performance optimized JavaScript for Nha Khoa Asia website

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Lazy loading for images
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

// Observe all images with lazy class
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
            if (!entry.hadRecentInput) {
                console.log('CLS:', entry.value);
            }
        }
    }
});

perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

// Contact form enhancement (if exists)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
        }, 2000);
    });
}

// Branch location click tracking
document.querySelectorAll('.branch-item a').forEach(link => {
    link.addEventListener('click', function() {
        // Track Google Maps clicks
        if (this.href.includes('maps.google.com')) {
            console.log('Maps link clicked:', this.textContent);
            // Add analytics tracking here if needed
        }
    });
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone number clicked:', this.textContent);
        // Add analytics tracking here if needed
    });
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && e.target === document.body) {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.focus();
        }
    }
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Image failed to load:', this.src);
    });
});

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalImages = [
        'image-9.png',
        'image-10.png',
        'image-11.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
    preloadCriticalResources();
}

// Accessibility improvements
const addSkipLink = () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Bỏ qua đến nội dung chính';
    document.body.insertBefore(skipLink, document.body.firstChild);
};

// Add skip link if not exists
if (!document.querySelector('.skip-link')) {
    addSkipLink();
}

// Add main landmark if not exists
const main = document.querySelector('main');
if (main && !main.id) {
    main.id = 'main';
}

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        // Handle scroll events here if needed
    }, 100);
});

// Memory cleanup
window.addEventListener('beforeunload', () => {
    if (imageObserver) {
        imageObserver.disconnect();
    }
    if (perfObserver) {
        perfObserver.disconnect();
    }
});

console.log('Nha Khoa Asia website loaded successfully!');