const jwt = require("jsonwebtoken");

const secret = "skilvul";

const jwtHelper = {
  signIn: (payload, option) => {
    return jwt.sign(payload, secret, option);
  },
  verify: (payload, option) => {
    return jwt.verify(payload, secret, option);
  },
};

module.exports = jwtHelper;