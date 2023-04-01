const {
    ErrorInternalServerStatus,
    ErrorNotFoundStatus,
} = require('../constants');

module.exports = (isProduction = false, app) => {
    // catch 404 and forward to error handler
    app.use((req, res, next) => {

        const err = new Error('Endpoint Not Found');
        err.status = ErrorNotFoundStatus;
        next(err);
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        if (!isProduction) {
            console.log(err.stack);
        }
        const statusCode = err.status || ErrorInternalServerStatus;
        res.status(statusCode);
        res.json({
            error: {
                status: statusCode,
                message: err.message,
            },
        });
    });
};
