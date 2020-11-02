const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../resources/users/user.model');
const { JWT_SECRET_KEY } = require('../common/config');
const logger = require('../common/logger');

const findUser = async (login, password) => {
  try {
    const user = await User.findOne({ login });
    if (!user) {
      return null;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return null;
    }
    return user;
  } catch (e) {
    logger.error(e);
  }
};
const createToken = user => {
  try {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
      expiresIn: '10min'
    });
    return token;
  } catch (e) {
    logger.error(e);
  }
};
module.exports = {
  findUser,
  createToken
};
