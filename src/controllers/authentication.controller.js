 const Service = require('../services/authentication.service');

const methods = {

    async onLogin(req, res) {
        try {
            const result = await Service.login(req.body);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
    async onLoginAdmin(req, res) {
        try {
            const result = await Service.loginAdmin(req.body);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
module.exports = { ...methods };
