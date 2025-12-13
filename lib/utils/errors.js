class DocstronError extends Error{
    constructor(message, statusCode, response){
        super(message);
        this.name = 'DocstronError';
        this.statusCode = statusCode;
        this.response = response;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends DocstronError{
    constructor(message, errors){
        super(message, 422, {errors});
        this.name = 'ValidationError';
        this.errors = errors;
    }
}

class AuthenticationError extends DocstronError{
    constructor(message){
        super(message, 401);
        this.name = 'AuthenticationError';        
    }
}

class NotFoundError extends DocstronError{
    constructor(message){
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

module.exports = {
    DocstronError,
    ValidationError,
    AuthenticationError,
    NotFoundError,    
}