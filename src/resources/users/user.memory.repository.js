const { User } = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const taskService = require('../tasks/tasks.service');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const save = async user => User.create(user);

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  return user;
};

const remove = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  taskService.deleteAllUsersId(id);
  await User.deleteOne({ _id: id });
  return user;
};
const update = async (id, users) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  await User.updateOne({ _id: id }, users);
  return get(id);
};

module.exports = { getAll, save, get, remove, update };
