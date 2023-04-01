const {
    ErrorNotModifiedStatus,
    ErrorBadRequestStatus,
    ErrorUnauthorizedStatus,
    ErrorPaymentRequiredStatus,
    ErrorForbiddenStatus,
    ErrorNotFoundStatus,
    ErrorMethodNotAllowedStatus,
    ErrorUnprocessableEntityStatus,
} = require('../constants');

module.exports = {
    ErrorNotModified(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorNotModifiedStatus;
        return error;
    },
    ErrorBadRequest(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorBadRequestStatus;
        return error;
    },
    ErrorUnauthorized(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorUnauthorizedStatus;
        return error;
    },
    ErrorPaymentRequired(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorPaymentRequiredStatus;
        return error;
    },
    ErrorForbidden(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorForbiddenStatus;
        return error;
    },
    ErrorNotFound(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorNotFoundStatus;
        return error;
    },
    ErrorMethodNotAllowed(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorMethodNotAllowedStatus;
        return error;
    },
    ErrorUnprocessableEntity(msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ErrorUnprocessableEntityStatus;
        return error;
    },
    ErrorCustomized(ERROR_CODE, msg) {
        const error = new Error(msg);
        error.message = msg;
        error.status = ERROR_CODE;
        return error;
    },
};
