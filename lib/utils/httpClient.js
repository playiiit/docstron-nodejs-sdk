const axios = require('axios');
const {
    DocstronError,
    ValidationError,
    AuthenticationError,
    NotFoundError
} = require('./errors');

class HttpClient {
    constructor(apiKey, baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const { status, data } = error.response;
                    const message = data.message || error.message;

                    switch (status) {
                        case 401:
                            throw new AuthenticationError(message);
                        case 404:
                            throw new NotFoundError(message);
                        case 422:
                            throw new ValidationError(message, data.errors);
                        default:
                            throw new DocstronError(message, status, data);
                    }
                } else if (error.request) {
                    throw new DocstronError("No response from server.", 0, null);
                } else {
                    throw new DocstronError(error.message, 0, null);
                }
            }
        );
    }

    async get(url, config = {}) {
        const response = await this.client.get(url, config);
        return response.data;
    }

    async post(url, data, config = {}) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }

    async put(url, data, config = {}) {
        const response = await this.client.put(url, data, config);
        return response.data;
    }

    async delete(url, config = {}) {
        const response = await this.client.delete(url, config);
        return response.data;
    }
}

module.exports = HttpClient;

