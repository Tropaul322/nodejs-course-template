const User = require('./../resources/users/user.model');
const DB = [];
const getAllUser = () => {
  return DB.slice(0);
};
const getUser = id => {
  return DB.slice(0).filter(el => el.id === id)[0];
};
const createUser = user => {
  DB.push(user);
  return user;
};
const deleteUser = id => {
  const userIndex = DB.findIndex(el => el.id === id);
  DB.splice(userIndex, 1);
  return DB;
};
const changeUser = (id, body) => {
  const userIndex = DB.findIndex(el => el.id === id);
  DB[userIndex] = {
    id,
    name: body.name,
    login: body.login,
    password: body.password
  };
  return DB;
};

DB.push(new User({ id: '1' }), new User(), new User());

module.exports = { getAllUser, getUser, createUser, deleteUser, changeUser };
