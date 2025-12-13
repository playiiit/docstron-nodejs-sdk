class Applications {
    constructor(httpClient) {
        this.http = httpClient;
    }

    /**
     * Create a new application
     * @param {Object} params - Application parameters
     * @param {string} [params.name] - Application name
     * @param {string} [params.description] - Application description
     * @param {boolean} [params.is_active=true] - Whether the application is active
     * @returns {Promise<Object>} Craeted application
     */

    async create(params) {
        this._validateCreateParams(params);

        const response = await this.http.post('/v1/applications', params);
        return response.data;
    }

    /**
     * Get an application by id
     * @param {string} appId - Application ID
     * @returns {Promise<Object>} Application details
     */

    async get(appId) {
        if (!appId) {
            throw new Error('Applicaiton ID is required.');
        }

        const response = await this.http.get(`/v1/applications/${appId}`);
        return response.data;
    }

    /**
     * Update an application
     * @param {string} appId - The application ID
     * @param {Object} params - Application parameters
     * @param {string} [params.name] - New applicatio name
     * @param {string} [params.description] - New description
     * @param {boolean} [params.is_active] - New active status
     * @returns {Promise<Object>} Updated application
     */

    async update(appId, params) {
        if (!appId) {
            throw new Error('Applicaiton ID is required');
        }
        if (!params || Object.keys(params).length === 0) {
            throw new Error('At least one parameter is required to update');
        }

        const response = await this.http.put(`/v1/applications/${appId}`, params);
        return response.data;
    }

    /**
     * Delete an application
     * @param {string} appId - The application ID
     * @return {Promise<Object>} Deletion confirmation
     */

    async delete(appId) {
        if (!appId) {
            throw new Error('Application ID is required');
        }

        const response = await this.http.delete(`/v1/applications/${appId}`);
        return response.data;
    }

    /**
   * List all applications
   * @returns {Promise<Array>} List of all applications
   */
    async list() {
        const response = await this.http.get('/v1/applications');
        return response.data;
    }

    /**
     * Get active applications only
     * @returns {Promise<Array>} List of active applications
     */

    async listActive() {
        const allApps = await this.list();
        return allApps.filter(app => app.is_active === true);
    }

    /**
     * Get inactive applications only
     * @returns {Promise<Array>} List of inactive applications
     */

    async listInactive() {
        const allApps = await this.list();
        return allApps.filter(app => app.is_active === false);
    }

    _validateCreateParams(params) {
        if (!params.name) {
            throw new Error('name is required');
        }
    }
}

module.exports = Applications;