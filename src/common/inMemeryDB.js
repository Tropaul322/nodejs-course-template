const Task = require('../resources/tasks/tasks.model');
const DB = {
  users: [],
  boards: [],
  tasks: []
};

// Users
const getAllUser = () => {
  return DB.users.slice(0);
};

const getUser = id => {
  return DB.users.slice(0).filter(el => el.id === id)[0];
};
const createUser = user => {
  DB.users.push(user);
  return user;
};
const deleteUser = id => {
  const userIndex = DB.users.findIndex(el => el.id === id);
  if (userIndex !== -1) {
    DB.users.splice(userIndex, 1);
    return true;
  }
  return;
};
const changeUser = (id, body) => {
  const userIndex = DB.users.findIndex(el => el.id === id);
  DB.users[userIndex] = {
    id,
    name: body.name,
    login: body.login,
    password: body.password
  };
  return DB.users;
};

// Boards
const getAllBoards = () => {
  return DB.boards.slice(0);
};

const createBoard = board => {
  DB.boards.push(board);
  return board;
};
const getBoard = id => {
  return DB.boards.slice(0).filter(el => el.id === id)[0];
};
const deleteBoard = id => {
  const boardIndex = DB.boards.findIndex(el => el.id === id);
  if (boardIndex !== -1) {
    DB.boards.splice(boardIndex, 1);
    return true;
  }
  return false;
};
const changeBoard = (id, body) => {
  const boardIndex = DB.boards.findIndex(el => el.id === id);
  DB.boards[boardIndex] = {
    id,
    title: body.title,
    columns: body.columns
  };
  return DB.boards;
};

// Tasks
const getAll = boardId => {
  return DB.tasks.filter(el => el.boardId === boardId);
};
const postTask = (boardId, task) => {
  task.boardId = boardId;
  const newTask = new Task(task);
  DB.tasks.push(newTask);
  return newTask;
};
const getTask = (boardId, id) => {
  return DB.tasks.filter(el => el.boardId === boardId && el.id === id)[0];
};

const changeTask = (boardId, id, body) => {
  const taskIndex = DB.tasks.findIndex(el => el.id === id);
  if (taskIndex !== -1) {
    const newTask = new Task(body);
    DB.tasks[taskIndex] = newTask;
    return newTask;
  }
  return false;
};

const deleteTask = async (boardId, id) => {
  const taskIndex = DB.tasks.findIndex(el => el.id === id);
  if (taskIndex !== -1) {
    DB.tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};
const deleteAllBoardTasks = boardId => {
  DB.tasks.forEach((el, id) =>
    el.boardId === boardId ? (DB.tasks[id] = {}) : null
  );
};
const deleteAllUsersId = userId => {
  DB.tasks.forEach((el, id) =>
    el.userId === userId ? (DB.tasks[id].userId = null) : null
  );
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  changeUser,
  getAllBoards,
  createBoard,
  getBoard,
  deleteBoard,
  changeBoard,
  getAll,
  postTask,
  getTask,
  changeTask,
  deleteTask,
  deleteAllBoardTasks,
  deleteAllUsersId
};
