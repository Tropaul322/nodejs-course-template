const tasksRepo = require('./tasks.memory.repository');

const getAll = id => tasksRepo.getAll(id);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);
const save = (boardId, task) => {
  return tasksRepo.save(boardId, task);
};

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const deleteAllTasksWithBoard = boardId =>
  tasksRepo.deleteAllTasksWithBoard(boardId);

const deleteAllUsersId = userId => tasksRepo.deleteAllUsersId(userId);

module.exports = {
  getAll,
  get,
  remove,
  save,
  update,
  deleteAllUsersId,
  deleteAllTasksWithBoard
};
