const User = require('./../resources/users/user.model');
const Board = require('../resources/boards/boards.model');
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
  DB.users.splice(userIndex, 1);
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
  DB.boards.splice(
    DB.boards.findIndex(el => el.id === id),
    1
  );
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
DB.boards.push(new Board({ id: '1' }), new Board(), new Board());

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
