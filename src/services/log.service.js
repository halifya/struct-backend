const axios = require("axios");

const methods = {
  async revshare(req) {
    try {
      console.log(req.body);
      const result = {
        test: "ทดสอบ",
      };
      return result;
    } catch (error) {
      throw Error(error);
    }
  },
  async billPay(req) {
    try {
      console.log(req.body);
      const result = {
        test: "ทดสอบ",
      };
      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
module.exports = { ...methods };
