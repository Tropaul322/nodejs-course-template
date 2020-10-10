const DB = require('../../common/inMemeryDB');
const getAllBoards = async () => DB.getAllBoards();

const createBoard = async board => {
  return DB.createBoard(board);
};

const getBoard = async id => DB.getBoard(id);

const deleteBoard = async id => {
  return DB.deleteBoard(id);
};

const changeBoard = async (id, body) => {
  return DB.changeBoard(id, body);
};
module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  deleteBoard,
  changeBoard
};
