const Docstron = require('./lib/Docstron');
const {
    DocstronError,
    ValidationError,
    AuthenticationError,
    NotFoundError
} = require('./lib/utils/errors');

module.exports = Docstron;
module.exports.DocstronError = DocstronError;
module.exports.ValidationError = ValidationError;
module.exports.AuthenticationError = AuthenticationError;
module.exports.NotFoundError = NotFoundError;