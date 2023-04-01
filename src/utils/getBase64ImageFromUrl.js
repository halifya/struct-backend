const axios = require("axios");

const getBase64ImageFromUrl = (url) => {
  return axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then(
      (response) =>
        `data:${response.headers[
          "content-type"
        ].toLowerCase()};base64,${new Buffer(response.data, "binary").toString(
          "base64"
        )}`
    );
};

module.exports = getBase64ImageFromUrl;
