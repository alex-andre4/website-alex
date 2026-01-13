// Common JavaScript - Shared across all pages

// Enhanced Page Caching and Preloading System
class PageCache {
    constructor() {
        this.cache = new Map();
        this.preloadedPages = new Set();
        this.init();
    }

    init() {
        // Preload all pages after initial page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.preloadAllPages());
        } else {
            this.preloadAllPages();
        }

        // Intercept all navigation links
        this.interceptNavigation();
    }

    async preloadAllPages() {
        const pages = ['index.html', 'about.html', 'projects.html', 'contact.html'];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pagesToPreload = pages.filter(page => page !== currentPage);
        
        // Add small delay to not interfere with initial page load
        setTimeout(async () => {
            for (const page of pagesToPreload) {
                await this.preloadPage(page);
            }
        }, 100);
    }

    async preloadPage(url) {
        if (this.preloadedPages.has(url)) return;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const html = await response.text();
                this.cache.set(url, html);
                this.preloadedPages.add(url);
                console.log(`✅ Preloaded: ${url}`);
            }
        } catch (error) {
            console.log(`⚠️ Failed to preload: ${url}`, error);
        }
    }

    interceptNavigation() {
        // Intercept all clicks on navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            
            // Only handle internal HTML pages
            if (href && href.endsWith('.html') && !href.startsWith('http')) {
                e.preventDefault();
                this.navigateToPage(href);
            }
        });
    }

    navigateToPage(url) {
        // Update URL without triggering reload
        history.pushState(null, '', url);
        
        if (this.cache.has(url)) {
            // Use cached version for instant navigation
            this.loadCachedPage(url);
        } else {
            // Fallback to normal navigation
            window.location.href = url;
        }
    }

    loadCachedPage(url) {
        const cachedHtml = this.cache.get(url);
        
        // Add smooth transition
        document.body.style.opacity = '0.7';
        document.body.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            // Replace page content
            document.documentElement.innerHTML = cachedHtml;
            
            // Reinitialize the cache system on new page
            new PageCache();
            
            // Reinitialize components
            if (window.NavbarComponent) {
                window.NavbarComponent.init();
            }
            if (window.ButtonComponent) {
                window.ButtonComponent.init();
            }
            if (window.ThemeToggle) {
                window.ThemeToggle.init();
            }
            
            // Load saved theme
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            // Smooth fade in
            document.body.style.opacity = '1';
            document.body.style.transform = 'scale(1)';
        }, 100);
    }
}

// Dark mode functionality
const ThemeToggle = {
    init() {
        // Load saved theme on page load
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    },

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    ThemeToggle.init();
    new PageCache();
});

// Make ThemeToggle globally available
window.ThemeToggle = ThemeToggle;
