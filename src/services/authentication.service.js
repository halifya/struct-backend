const { ErrorUnauthorized } = require("../configs/errorMethods");
const { TB_RECIPIENT, TB_MEMBER, TB_ADMIN } = require("../models");
const ROLE_CONSTANT = require("../constants/index");

const axios = require("axios");
const genToken = require("../configs/genToken");

const methods = {
  async login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password, accountId } = data;
        // AUTH ONE
        const { data: authData } = await axios.post(
          process.env.API_ONEID + "/api/oauth/getpwd",
          {
            grant_type: "password",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: username,
            password: password,
          }
        );

        // GET USER DATA
        const accessToken = authData.token_type + " " + authData.access_token;
        const { data: userData } = await axios.get(
          process.env.API_ONEID + "/api/account",
          {
            params: {},
            headers: { Authorization: accessToken },
          }
        );

        if (!accountId) {
          reject(ErrorUnauthorized("recipient_id not found"));
        }

        const loginRecipient = await TB_MEMBER.findOne({
          where: { EMAIL: userData.thai_email, RECIPIENT_ID: accountId },
          raw: true
        });

        if (!loginRecipient) {
          reject(ErrorUnauthorized("recipient_id not found"));
        }

        const obj = await TB_RECIPIENT.findOne({
          where: { RECIPIENT_ID: accountId },
          raw: true,
        });

        if (!obj) {
          reject(ErrorUnauthorized("recipient_id not found"));
        }

        const encodeData = {
          ROLE: ROLE_CONSTANT.USER,
          RECIPIENT_ID: obj.RECIPIENT_ID,
          EMAIL: obj.EMAIL
        };

        const token = genToken.create_token(encodeData);
        const result = { ...userData, token: token, MERCHANT_NAME: obj.NAME };

        resolve(result);
      } catch (error) {
        reject(ErrorUnauthorized(error.message));
      }
    });
  },

  async loginAdmin(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password } = data;
        // AUTH ONE
        const { data: authData } = await axios.post(
          process.env.API_ONEID + "/api/oauth/getpwd",
          {
            grant_type: "password",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: username,
            password: password,
          }
        );

        // GET USER DATA
        const accessToken = authData.token_type + " " + authData.access_token;
        const { data: userData } = await axios.get(
          process.env.API_ONEID + "/api/account",
          {
            params: {},
            headers: { Authorization: accessToken },
          }
        );

        const obj = await TB_ADMIN.findOne({
          where: { EMAIL: userData.thai_email },
          raw: true
        });

        console.log('obj', obj)
        if (!obj) {
          reject(ErrorUnauthorized("recipient_id not found"));
        } 
        
        const encodeData = {
          ROLE: ROLE_CONSTANT.ADMIN,
          RECIPIENT_ID: obj.RECIPIENT_ID,
          EMAIL: obj.EMAIL
        };

        const token = genToken.create_token(encodeData);
        const result = { ...userData, token: token };

        resolve(result);
      } catch (error) {
        reject(ErrorUnauthorized(error.message));
      }
    });
  },
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
module.exports = { ...methods };
