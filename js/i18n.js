// Importar traduções
import { translations } from './i18n/translations.js';

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || this.getBrowserLanguage() || 'en';
        this.init();
    }

    // Detectar idioma do navegador
    getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        const shortLang = lang.split('-')[0];
        return translations[shortLang] ? shortLang : 'en';
    }

    // Inicializar internacionalização
    init() {
        this.setLanguage(this.currentLang);
        this.setupLanguageSelector();
        this.updateMetaTags();
    }

    // Configurar seletor de idiomas
    setupLanguageSelector() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = this.currentLang;
            selector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    // Atualizar meta tags para SEO
    updateMetaTags() {
        const meta = translations[this.currentLang].meta;
        document.title = meta.title;
        document.querySelector('meta[name="description"]').content = meta.description;
        document.querySelector('meta[name="keywords"]').content = meta.keywords;

        // Atualizar tags Open Graph
        document.querySelector('meta[property="og:title"]').content = meta.title;
        document.querySelector('meta[property="og:description"]').content = meta.description;

        // Atualizar canonical e hreflang
        const canonical = document.querySelector('link[rel="canonical"]');
        canonical.href = `https://quemdeixoudeseguir.com/${this.currentLang}/`;

        // Atualizar URL sem recarregar a página
        window.history.pushState({}, '', `/${this.currentLang}/`);
    }

    // Definir idioma
    setLanguage(lang) {
        if (!translations[lang]) return;
        
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        
        this.updateMetaTags();
        this.updateContent();
    }

    // Atualizar conteúdo da página
    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const keys = key.split('.');
            let value = translations[this.currentLang];
            
            for (const k of keys) {
                if (value[k]) {
                    value = value[k];
                } else {
                    console.warn(`Translation key not found: ${key}`);
                    return;
                }
            }

            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
}); 