const { OKStatus, ErrorInternalServerStatus } = require('../constants');

const logger = require('./logger');

module.exports = (req, res, next) => {
    res.success = (data = '', statusCode = OKStatus) => {
        res.status(statusCode || OKStatus).send(data);
    };

    res.error = ({ message, status = ErrorInternalServerStatus, code }) => {
        const errorBody = { status, message };
        if (code) {
            errorBody.code = code;
        }
        res.status(status || ErrorInternalServerStatus).send({
            error: errorBody,
        });
        logger.error(errorBody);
    };

    next();
};
