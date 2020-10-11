const DB = require('../../common/inMemeryDB');

const getAll = async boardId => {
  return await DB.getAll(boardId);
};

const postTask = async (boardId, task) => DB.postTask(boardId, task);

const getTask = async (boardId, id) => DB.getTask(boardId, id);

const changeTask = async (boardId, id, body) =>
  DB.changeTask(boardId, id, body);

const deleteTask = async (boardId, id) => DB.deleteTask(boardId, id);

const deleteAllBoardTasks = boardId => DB.deleteAllBoardTasks(boardId);

const deleteAllUsersId = userId => DB.deleteAllUsersId(userId);

module.exports = {
  getAll,
  postTask,
  getTask,
  changeTask,
  deleteTask,
  deleteAllBoardTasks,
  deleteAllUsersId
};
