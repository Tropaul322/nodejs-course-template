const { Task } = require('./tasks.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const ENTITY_NAME = 'task';

const getAll = async id => Task.find({ boardId: id });

const save = async (boardId, tasks) => {
  tasks.boardId = boardId;
  console.log(tasks);
  const task = Task.create(tasks);
  return task;
};

const get = async (boardId, id) => {
  const task = await Task.find({ boardId, _id: id });
  if (!task[0]) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  return task[0];
};

const remove = async (boardId, id) => {
  const task = await Task.find({ boardId, _id: id });
  if (!task[0]) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  await Task.deleteOne({ _id: id, boardId });
  return task[0];
};
const update = async (boardId, id, tasks) => {
  tasks.boardId = boardId;
  const task = await Task.find({ boardId, _id: id });
  console.log(task[0]);
  if (!task[0]) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  await Task.findOneAndUpdate({ _id: id, boardId }, tasks);
  return get(boardId, id);
};

const deleteAllUsersId = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};
const deleteAllTasksWithBoard = async boardId => {
  await Task.remove({ boardId });
};

module.exports = {
  getAll,
  save,
  get,
  remove,
  update,
  deleteAllUsersId,
  deleteAllTasksWithBoard
};
