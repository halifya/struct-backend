const Service = require('../services/log.service');

const methods = {
    async onCreateLogRevshare(req, res) {
        try {
            const result = await Service.revshare(req);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
    async onCreateLogBillPay(req, res) {
      try {
          const result = await Service.billPay(req.body);
          res.success(result);
      } catch (error) {
          res.error(error);
      }
  },
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
module.exports = { ...methods };
