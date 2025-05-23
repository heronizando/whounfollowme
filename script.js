// Main script file - imports all component scripts
document.addEventListener('DOMContentLoaded', function() {
    // Load all module scripts
    loadScript('js/header.js');
    loadScript('js/language-selector.js');
    loadScript('js/testimonials.js');
    loadScript('js/faq.js');
    loadScript('js/animations.js');
    
    // Helper function to load scripts dynamically
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
    }
});