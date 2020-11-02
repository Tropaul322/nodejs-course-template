const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./../common/config');

module.exports = function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer' && token) {
      jwt.verify(token, JWT_SECRET_KEY, err => {
        if (err) {
          res.status(401).send('Access token is missing');
        }
        return next();
      });
    } else {
      res.status(401).send('Access token is missing');
    }
  } else {
    res.status(401).send('Access token is missing');
  }
};
