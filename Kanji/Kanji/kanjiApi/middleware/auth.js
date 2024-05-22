const jwt = require("jsonwebtoken");

const { DEV_SECRET, NODE_PRODUCTION } = require("./constants");

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  let token;
  
  if (authorization) {
    token = authorization.replace("jwt=", "");
  }

  if (token === '') {
      return next("Необходимо пройти авторизацию");
    }
    let payload;
    try {
    payload = jwt.verify(token, 'dev-secret');
    
  } catch (err) {
    return next("Необходимо пройти авторизацию");
  }
  req.user = payload;
  return next();
};