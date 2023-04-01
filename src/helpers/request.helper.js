const axios = require('axios');
/* eslint-disable node/no-unsupported-features/es-syntax */
const methods = {
    getBase64ImageFromUrl(url) {
        return axios
            .get(url, {
                responseType: 'arraybuffer',
            })
            .then(
                (response) =>
                    `data:${response.headers[
                        'content-type'
                    ].toLowerCase()};base64,${Buffer.from(
                        response.data,
                        'binary'
                    ).toString('base64')}`
            );
    },
};

module.exports = {
    ...methods,
};
