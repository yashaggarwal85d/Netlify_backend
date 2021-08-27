const JWT = require('jsonwebtoken');
const API = require('../constants/APIstore');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verifiedId = JWT.verify(token, API.TOKENSECRET);
    req.user = verifiedId;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
