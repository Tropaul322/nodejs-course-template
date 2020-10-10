const boardRepo = require('./boards.memory.repository');

const getAllBoards = () => boardRepo.getAllBoards();

const createBoard = board => boardRepo.createBoard(board);

const getBoard = id => boardRepo.getBoard(id);
const deleteBoard = id => boardRepo.deleteBoard(id);

const changeBoard = (id, body) => boardRepo.changeBoard(id, body);

module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  deleteBoard,
  changeBoard
};
