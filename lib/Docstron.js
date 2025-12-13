const HttpClient = require('./utils/httpClient');
const Templates = require('./resources/Templates');
const Documents = require('./resources/Documents');
const Applications = require('./resources/Applications');
const { DEFAULT_BASE_URL } = require('./constants');

class Docstron {
    /**
     * Create new Docstron client
     * @param {string} apiKey - Your Docstron API key
     * @param {Object} [Options] - Configuration options
     * @param {string} [Options.baseURL] - Custom base URL
     */
    constructor(apiKey, options = {}) {
        if (!apiKey) {
            throw new Error('API key is required');
        }

        this.apiKey = apiKey;
        this.baseURL = options.baseURL || DEFAULT_BASE_URL;

        const httpClient = new HttpClient(this.apiKey, this.baseURL);

        // v0.1.0 - Templates Only
        this.templates = new Templates(httpClient);

        // v0.2.0 - Documents
        this.documents = new Documents(httpClient);

        // v0.3.0 - Applications
        this.applications = new Applications(httpClient);
    }

    /**
     * Get the current SDK version
     * @returns {string} version number
     */
    static getVersion() {
        return '0.3.0';
    }

    /**
     * Check which features are available
     * @returns {Object} Available features
     */
    static getFeatures() {
        return {
            templates: true, // v0.1.0+
            documents: true, // v0.2.0+
            applications: true // v0.3.0+
        }
    }
}

module.exports = Docstron;