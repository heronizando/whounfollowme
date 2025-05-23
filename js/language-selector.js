// Language selector functionality
(function() {
    const languageBtn = document.getElementById('language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    // Toggle language dropdown
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            languageDropdown.classList.toggle('show');
        });
    }

    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-selector')) {
            languageDropdown.classList.remove('show');
        }
    });

    // Language selection
    const languageOptions = document.querySelectorAll('.language-dropdown a');
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active class
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update button text
            let langText = '';
            switch(lang) {
                case 'pt-BR': langText = 'PT-BR'; break;
                case 'en': langText = 'EN'; break;
                case 'es': langText = 'ES'; break;
                case 'fr': langText = 'FR'; break;
                case 'de': langText = 'DE'; break;
                default: langText = 'PT-BR';
            }
            languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${langText} <i class="fas fa-chevron-down"></i>`;
            
            // Close dropdown
            languageDropdown.classList.remove('show');
        });
    });

    function setLanguage(lang) {
        // Placeholder for language switching functionality
        console.log(`Language switched to: ${lang}`);
        
        // Future implementation would load translations from JSON files
    }
})();