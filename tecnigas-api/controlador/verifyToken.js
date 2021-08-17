const keys = require("../keys/keys.js");
const password = keys.cryptoKey;
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers['token'];
  if (token) {
    const deco = jwt.verify(token, password);
    if (!deco)
      return res.send({ token: null, isAuth: false });
  }
  next();
}

module.exports = {
  verifyToken
};
