// Button Component Module
const ButtonComponent = {
    /**
     * Creates a button element with icon and text
     * @param {Object} options - Button configuration
     * @param {string} options.href - Link URL
     * @param {string} options.text - Button text
     * @param {string} options.icon - Font Awesome icon class (e.g., 'fa-user')
     * @param {string} options.className - Additional CSS classes
     * @returns {string} HTML string for the button
     */
    create({ href, text, icon, className = '' }) {
        const iconHtml = icon ? `<i class="fas ${icon}"></i>` : '';
        const classes = `btn ${className}`.trim();
        
        return `<a href="${href}" class="${classes}">${iconHtml} ${text}</a>`;
    },

    /**
     * Creates multiple buttons and wraps them in nav-buttons container
     * @param {Array} buttons - Array of button configurations
     * @returns {string} HTML string for button group
     */
    createGroup(buttons) {
        const buttonsHtml = buttons.map(btn => this.create(btn)).join('');
        return `<div class="nav-buttons">${buttonsHtml}</div>`;
    },

    /**
     * Initialize buttons in a container
     * @param {string|HTMLElement} container - Container selector or element
     * @param {Array} buttons - Array of button configurations
     */
    init(container, buttons) {
        const targetContainer = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (targetContainer && buttons) {
            targetContainer.innerHTML = this.createGroup(buttons);
        }
    }
};

// Make available globally
window.ButtonComponent = ButtonComponent;
