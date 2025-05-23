// Importar traduções
import { translations } from './i18n/translations.js';

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || this.getBrowserLanguage() || 'en';
        this.translations = translations;
        this.baseUrl = 'https://heronizando.github.io/whounfollowme';
        this.init();
    }

    // Detectar idioma do navegador
    getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        const shortLang = lang.split('-')[0];
        return this.translations[shortLang] ? shortLang : 'en';
    }

    // Inicializar internacionalização
    init() {
        document.documentElement.lang = this.currentLang;
        this.setupLanguageSelector();
        this.updateMetaTags();
        this.updateContent();
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
        const meta = this.translations[this.currentLang].meta;
        
        // Atualizar título e meta tags
        document.title = meta.title;
        
        const metaTags = {
            'description': meta.description,
            'keywords': meta.keywords
        };
        
        Object.entries(metaTags).forEach(([name, content]) => {
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.name = name;
                document.head.appendChild(tag);
            }
            tag.content = content;
        });

        // Atualizar Open Graph
        const ogTags = {
            'og:title': meta.title,
            'og:description': meta.description,
            'og:url': `${this.baseUrl}/${this.currentLang}/`
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.content = content;
        });

        // Atualizar canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = `${this.baseUrl}/${this.currentLang}/`;

        // Atualizar URL
        const newPath = `/${this.currentLang}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`;
        window.history.pushState({}, '', newPath);
    }

    // Definir idioma
    setLanguage(lang) {
        if (!this.translations[lang]) return;
        
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        
        this.updateMetaTags();
        this.updateContent();

        // Disparar evento de mudança de idioma
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    // Atualizar conteúdo da página
    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const keys = key.split('.');
            let value = this.translations[this.currentLang];
            
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    console.warn(`Translation key not found: ${key}`);
                    return;
                }
            }

            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = value;
            } else if (element.tagName === 'A' && !element.dataset.i18nKeepHref) {
                element.textContent = value;
            } else {
                element.textContent = value;
            }
        });
    }

    translate(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return value;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
}); 