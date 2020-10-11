const User = require('./../resources/users/user.model');
const Board = require('../resources/boards/boards.model');
const Column = require('../resources/columns/column.model');
const DB = {
  users: [],
  boards: []
};

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
  } else {
    return;
  }
  return DB.users;
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
  } else {
    return;
  }
  return DB.boards;
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

DB.users.push(new User({ id: '1' }), new User(), new User());
DB.boards.push(
  new Board({ id: '1', columns: [new Column()] }),
  new Board({ columns: [new Column()] }),
  new Board({ columns: [new Column()] })
);

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
  changeBoard
};
