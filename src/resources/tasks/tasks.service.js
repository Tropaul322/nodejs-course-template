const tasksRepo = require('./tasks.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const postTask = (boardId, task) => tasksRepo.postTask(boardId, task);

const getTask = (boardId, id) => tasksRepo.getTask(boardId, id);

const changeTask = (boardId, id, body) =>
  tasksRepo.changeTask(boardId, id, body);

const deleteTask = (boardId, id) => tasksRepo.deleteTask(boardId, id);

const deleteAllBoardTasks = boardId => tasksRepo.deleteAllBoardTasks(boardId);

const deleteAllUsersId = userId => tasksRepo.deleteAllUsersId(userId);

module.exports = {
  getAll,
  postTask,
  getTask,
  changeTask,
  deleteTask,
  deleteAllBoardTasks,
  deleteAllUsersId
};
