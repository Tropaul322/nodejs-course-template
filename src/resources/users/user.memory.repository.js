const DB = require('../../common/inMemeryDB');
const getAll = async () => DB;
const getUser = async id => DB.filter(el => el.id === id)[0];
const createUser = async user => {
  DB.push(user);
  return getUser(user.id);
};
module.exports = { getAll, getUser, createUser };
