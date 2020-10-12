const DB = require('../../common/inMemeryDB');
const getAll = async () => DB.getAllUser();
const getUser = async id => DB.getUser(id);
const createUser = async user => {
  return DB.createUser(user);
};
const deleteUser = async id => {
  return DB.deleteUser(id);
};
const changeUser = async (id, body) => {
  return DB.changeUser(id, body);
};
module.exports = { getAll, getUser, createUser, deleteUser, changeUser };
