class Documents {
    constructor(httpClient) {
        this.http = httpClient;
    }

    /**
     * Generate a PDF document from a template
     * @param {string} templateId - The template ID
     * @param {Object} options - Generation options
     * @param {Object} options.data - Data to populate template placeholders
     * @param {string} [options.response_type='document_id'] - Respose format - 'pdf', 'json_with_base64' or 'document_id'
     * @param {string} [options.password] - Optional password to protect the PDF 
     * @returns {Promise<Object|Buffer>} Generated document (format depends om response_type)
     */

    async generate(templateId, options = {}) {
        if (!templateId) {
            throw new Error('Template ID is required');
        }

        if (!options.data) {
            throw new Error('Data is required to generate document');
        }

        const payload = {
            template_id: templateId,
            data: options.data,
            response_type: options.response_type || 'document_id',
            ...(options.password && { password: options.password })
        };

        // For PDF response_type,
        if (payload.response_type === 'pdf') {
            const response = await this.http.post('/v1/documents/generate', payload, {
                responseType: 'arraybuffer',
            });
            return response;
        }

        const response = await this.http.post('/v1/documents/generate', payload);
        return response.data;
    }

    /**
     * Quick generate a PDF  without creating a template first
     * @param {Object} options - Quick generation options
     * @param {string} options.html - HTML content with optional placeholders
     * @param {Object} options.data - Data to populate HTML placeholders
     * @param {string} [options.response_type='document_id'] - Response format: 'pdf', 'json_with_base64' or 'document_id'
     * @param {string} [options.extra_css] - Additional CSS styling
     * @param {boolean} [options.save_template=false] - Whether to save as reusable template
     * @param {string} [options.application_id] - Required when save template is true
     * @param {string} [options.password] - Optional password to protect PDF
     * @returns {Promise<Object|Buffer>} Generated Document (format based on response_type)
     */

    async quickGenerate(options = {}) {
        if (!options.html) {
            throw new Error('HTML content is required');
        }
        if (!options.data) {
            throw new Error('Data is required to generate document');
        }
        if (options.save_template && !options.application_id) {
            throw new Error('application_id is required when save_template is true');
        }

        // For PDF generation,
        const payload = {
            html: options.html,
            data: options.data,
            response_type: options.response_type || 'document_id',
            ...(options.extra_css && { extra_css: options.extra_css }),
            ...(options.save_template !== undefined && { save_template: options.save_template }),
            ...(options.application_id && { application_id: options.application_id }),
            ...(options.password && { password: options.password })
        }

        if (payload.response_type === 'pdf') {
            const response = await this.http.post('/v1/documents/quick/generate', payload, {
                responseType: 'arraybuffer'
            });
            return response;
        }

        const response = await this.http.post('/v1/documents/quick/generate', payload);
        return response.data;
    }

    /**
     * Get document details by ID
     * @param {string} documentId - the document id
     * @returns {Promise<Object>} Document details
     */

    async get(documentId) {
        if (!documentId) {
            throw new Error('Document ID is required');
        }

        const response = await this.http.get(`/v1/documents/${documentId}`);
        return response.data;
    }

    /**
     * List all documents
     * @returns {Promise<Array>} List of all documents
     */

    async list() {
        const response = await this.http.get('/v1/documents');
        return response.data;
    }

    /**
     * Update a document 
     * @param {string} documentId - The document ID
     * @param {Object} data - New data to update the document
     * @returns {Promise<Object>} Updated document
     */

    async update(documentId, data) {
        if (!documentId) {
            throw new Error('Document ID is required');
        }
        if (!data) {
            throw new Error('Data is required to update the document');
        }

        const response = await this.http.put(`/v1/documents/${documentId}`, { data });
        return response.data;
    }

    /**
     * Delete a document
     * @param {string} documentId - The document id
     * @returns {Promise<Object>} Deletion confirmation
     */

    async delete(documentId) {
        if (!documentId) {
            throw new Error('Document ID is required');
        }
        const response = await this.http.delete(`/v1/documents/${documentId}`);
        return response.data;
    }

    /**
     * Download a document as a PDF
     * @param {string} documentId - The document ID
     * @param {string} [filepath] - Optional file path to save (Node.js only)
     * @returns {Promise<Buffer>} PDF file as buffer
     */
    async download(documentId, filepath) {
        if (!documentId) {
            throw new Error('Document ID is required');
        }
        const response = await this.http.get(`/v1/documents/download/${documentId}`, {
            responseType: 'arraybuffer'
        });

        // If file path is provided and we're in Node.js, save the file
        if (filepath && typeof require !== undefined) {
            const fs = require('fs');
            fs.writeFileSync(filepath, Buffer.from(response));
            return Buffer.from(response);
        }

        return Buffer.from(response);
    }
}

module.exports = Documents;