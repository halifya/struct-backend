const jwt = require("jsonwebtoken");
const fs = require("fs");
const cert = fs.readFileSync("eInvoice.key");
const CryptoJS = require("crypto-js");
const aesKey = process.env.AES_KEY || "V60ERW7hHkhb4DuuDsAr8nGun6VBcMSw";
const key = CryptoJS.enc.Utf8.parse(aesKey);
const iv = CryptoJS.enc.Utf8.parse(aesKey.substring(0, 16));
const base64ToBase64url = (base64Url) => {
  // Replace non-url compatible chars with base64 standard chars
  base64Url = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Pad out with standard base64 required padding characters
  const pad = base64Url.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error(
        "InvalidLengthError: Input base64url string is the wrong length to determine padding"
      );
    }
    base64Url += new Array(5 - pad).join("=");
  }

  return base64Url;
};

module.exports = {
  create_token: function (payload) {
    const token = jwt.sign(payload, cert, {
      expiresIn: "1d",
    });
    return token;
  },
  createTokenPDF: function (payload) {
    try {
      const { size, page, start_date, end_date, recipient_id, amount, search } = payload;

      const encryptedData = JSON.stringify({
        size,
        page,
        start_date,
        end_date,
        recipient_id,
        amount,
        search,
      });

      const encrypted = CryptoJS.AES.encrypt(encryptedData, key, {
        iv: iv,
      });

      const cipher = CryptoJS.enc.Base64url.stringify(encrypted.ciphertext);

      return cipher;
    } catch (error) {
      throw error;
    }
  },
  decodeTokenPDF: function (token) {
    try {
      const tokenBase64 = base64ToBase64url(token);
      const bytes = CryptoJS.AES.decrypt(tokenBase64, key, { iv: iv });
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      const decryptedData = JSON.parse(decryptedString);
      return decryptedData;
    } catch (error) {
      const err = new Error("invalid token");
      err.status = 401;
      throw err;
    }
  },
};
