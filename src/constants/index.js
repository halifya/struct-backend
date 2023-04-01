/* eslint-disable node/no-unsupported-features/es-syntax */
const messages = require('./messages.constant');
const statuses = require('./statuses.constant');
const types = require('./types.constant');
const role = require('./role.constant')

module.exports = {
    ...messages,
    ...statuses,
    ...types,
    ...role
};
