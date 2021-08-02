const axios = require("axios");
const config = require("./config");

function registerCode(token, code) {
  return new Promise((res, rej) => {
    axios.default
      .post(
        config.Url,
        { code: code.trim(), confirm: true },
        {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) LeagueOfLegendsClient/11.15.388.2387 (CEF 74) Safari/537.36",
            accept: "*/*",
            token: token,
            Referer: `https://bargain.lol.garena.vn/?token=${token}`,
          },
        }
      )
      .then(({ data }) => {
        res(data);
      })
      .catch(rej);
  });
}

module.exports = { registerCode };
