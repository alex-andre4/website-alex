// Navbar Component Module
const NavbarComponent = {
    // Navigation configuration
    navItems: [
        { href: 'index.html', label: 'Home' },
        { href: 'about.html', label: 'About Me' },
        { href: 'projects.html', label: 'Projects' },
        { href: 'contact.html', label: 'Contact' }
    ],

    // Get current page name
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page;
    },

    // Render navbar HTML
    render() {
        const currentPage = this.getCurrentPage();
        
        return `
            <nav class="nav-header">
                <a href="index.html" class="nav-logo">Alexandre Morales</a>
                <div class="nav-links">
                    ${this.navItems.map(item => `
                        <a href="${item.href}" class="nav-link ${item.href === currentPage ? 'active' : ''}">${item.label}</a>
                    `).join('')}
                </div>
            </nav>
        `;
    },

    // Initialize navbar
    init(container = null) {
        const targetContainer = container || document.querySelector('[data-navbar]');
        if (targetContainer) {
            // Replace the container with the nav element directly
            const navHTML = this.render();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = navHTML;
            const navElement = tempDiv.firstElementChild;
            targetContainer.parentNode.replaceChild(navElement, targetContainer);
        } else {
            // If no container specified, try to find existing nav or create one
            let nav = document.querySelector('.nav-header');
            if (!nav) {
                // Create navbar at the beginning of body
                const body = document.body;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = this.render();
                const navElement = tempDiv.firstElementChild;
                body.insertBefore(navElement, body.firstChild);
            } else {
                // Update existing navbar
                const parent = nav.parentElement;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = this.render();
                const navElement = tempDiv.firstElementChild;
                parent.replaceChild(navElement, nav);
            }
        }
    }
};

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavbarComponent.init());
} else {
    NavbarComponent.init();
}

// Make available globally
window.NavbarComponent = NavbarComponent;
