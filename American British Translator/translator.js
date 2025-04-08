const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    constructor() {
        this.americanOnly = americanOnly;
        this.britishOnly = britishOnly;
        this.americanToBritishSpelling = americanToBritishSpelling;
        this.americanToBritishTitles = americanToBritishTitles;
    }
    translate(text, locale) {
        // Initialize translatedText with the original input text
        let translatedText = text;
        let valueHighlighted = '';
        let keyHighlighted = '';

        // Check if the desired translation is from American to British
        if (locale === 'american-to-british') {
            // Iterate over American-only terms to replace them with British equivalents
            for (const [key, value] of Object.entries(this.americanOnly)) {
                // Create a case-insensitive regular expression to find whole words only
                const regex = new RegExp(`\\b${key}\\b`, 'gi');
                // Replace occurrences in the text
                valueHighlighted = `<span class="highlight">${value}</span>`;
                translatedText = translatedText.replace(regex, valueHighlighted);
            }

            // Iterate over American to British spellings
            for (const [key, value] of Object.entries(this.americanToBritishSpelling)) {
                // Create a case-insensitive regular expression to find whole words only
                // The 'g' flags ensure that the search is case-sensitive and global (all occurrences).
                // The '\\b' ensures that we only match whole words, not substrings.
                const regex = new RegExp(`\\b${key}\\b`, 'g');
                valueHighlighted = `<span class="highlight">${value}</span>`;
                translatedText = translatedText.replace(regex, valueHighlighted);
            }

            // Iterate over American to British titles
            for (const [key, value] of Object.entries(this.americanToBritishTitles)) {
                const regex = new RegExp(`${key}`, 'g');
                valueHighlighted = `<span class="highlight">${value}</span>`;
                translatedText = translatedText.replace(regex, valueHighlighted);

           }

            // Replace colon with period for time format
            //translatedText = translatedText.replace(/:/g, '.');
            // Specifically replace time formats like "12:30" to "12.30"
            translatedText = translatedText.replace(/(\d{1,2})\s*:\s*(\d{2})/, '<span class="highlight">$1.$2</span>');
        } 
        // Check if the desired translation is from British to American
        else if (locale === 'british-to-american') {
            // Iterate over British-only terms to replace them with American equivalents
            for (const [key, value] of Object.entries(this.britishOnly)) {
                const regex = new RegExp(`\\b${key}\\b`, 'gi');
                valueHighlighted = `<span class="highlight">${value}</span>`;
                translatedText = translatedText.replace(regex, valueHighlighted);
            }

            // Iterate over British to American spellings
            for (const [key, value] of Object.entries(this.americanToBritishSpelling)) {
                const regex = new RegExp(`\\b${value}\\b`, 'gi');
                keyHighlighted = `<span class="highlight">${key}</span>`;
                translatedText = translatedText.replace(regex, keyHighlighted);
            }

            // Iterate over British to American titles
            for (const [key, value] of Object.entries(this.americanToBritishTitles)) {
                const regex = new RegExp(`\\b${value}\\b`, 'g');
                keyHighlighted = `<span class="highlight">${key}</span>`;
                translatedText = translatedText.replace(regex, keyHighlighted);
            }

            // Replace period with colon for time format
            //translatedText = translatedText.replace(/\./g, ':');
            // Specifically replace time formats like "12.30" to "12:30"
            translatedText = translatedText.replace(/(\d{1,2})\s*\.\s*(\d{2})/, '<span class="highlight">$1:$2</span>');
        }

        // Return the fully translated text
        return translatedText;
    }
    getAmericanOnly() {
        return this.americanOnly;
    }
    getBritishOnly() {
        return this.britishOnly;
    }
    getAmericanToBritishSpelling() {
        return this.americanToBritishSpelling;
    }
    getAmericanToBritishTitles() {
        return this.americanToBritishTitles;
    }
    getLocale(locale) {
        if (locale === 'american-to-british') {
            return 'British English';
        } else if (locale === 'british-to-american') {
            return 'American English';
        }
        return 'Invalid locale';
    }

    getTranslation(text, locale) {
        const translatedText = this.translate(text, locale);
        if (translatedText === text) {
            return 'Everything looks good to me!';
        }
        return translatedText;
    }

}

module.exports = Translator;