class Templates {
    constructor(httpClient) {
        this.http = httpClient;
    }


    /**
     * Create a new Template
     * @param {Object} params - Template Parameters
     * @param {string} params.application_id - The application ID
     * @param {string} params.name - Template name
     * @param {string} params.content - HTML content with placeholder
     * @param {boolean} [params.is_active=true] - Whether template is active
     * @param {string} [params.extra_css] - Additiional css styling
     * @returns {Promise<Object>} Cretaed template
     */

    async create(params) {
        this._validateCreateParams(params);
        const response = await this.http.post('/v1/templates', params);
        return response.data;
    }

    /**
     * Get a template by ID
     * @param {string} templateId - The template ID
     * @returns {Promise<Object>} Template Details
     */
    async get(templateId) {
        if (!templateId) {
            throw new Error('Template ID is required');
        }

        const response = await this.http.get(`/v1/templates/${templateId}`);
        return response.data;
    }

    /**
     * Update an existing template
     * @param {string} templateId - The template ID
     * @param {Object} params - Template parameters to update
     * @returns {Promise<Object>} U*pdated template
     */
    async update(templateId, params) {
        if (!templateId) {
            throw new Error('Template ID is required');
        }

        const response = await this.http.put(`/v1/templates/${templateId}`, params);
        return response.data;
    }

    /**
     * Delete a template
     * @param {string} templateId - The template ID
     * @returns {Promise<Object>} Delete Confirmation
     */

    async delete(templateId) {
        if (!templateId) {
            throw new Error('Template ID is required');
        }

        const response = await this.http.delete(`/v1/templates/${templateId}`);
        return response.data;
    }

    /**
     * List all templates for an application
     * @param {string} applicationId - The application ID
     * @returns {Promise<Array>} List of templates
     */
    async list(applicationId) {
        if (!applicationId) {
            throw new Error('Application ID is required');
        }

        const response = await this.http.get('/v1/templates', {
            params: { application_id: applicationId }
        });
        return response.data;
    }

    _validateCreateParams(params){
        if(!params.application_id){
            throw new Error('application_id is required');        
        }
        if(!params.name){
            throw new Error('name is required');
        }
        if(!params.content){
            throw new Error('content is required');
        }
    }
}

module.exports = Templates;
