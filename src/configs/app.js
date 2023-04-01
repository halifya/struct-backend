/* eslint-disable no-magic-numbers */
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    isProduction: process.env.NODE_ENV === 'production',
    apiVersion: process.env.API_VERSION || 1,
    token_exp_days: process.env.TOKEN_EXP_DAYS || 30,
    secret:
        process.env.NODE_ENV === 'production'
            ? process.env.APP_SECRET || 'production-secret'
            : 'my-secret',
    pageLimit: process.env.PAGE_LIMIT || 5,

    // Configure database
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbUsername: process.env.DB_USERNAME || 'root',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME,

    // GCS
    gcsBucket: process.env.GCS_BUCKET || '',
    gcsProjectId: process.env.GCS_PROJECT_ID || '',
};
