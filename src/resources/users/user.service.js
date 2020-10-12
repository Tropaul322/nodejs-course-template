const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const createUser = user => usersRepo.createUser(user);

const deleteUser = id => usersRepo.deleteUser(id);

const changeUser = (id, body) => usersRepo.changeUser(id, body);

module.exports = { getAll, getUser, createUser, deleteUser, changeUser };
