const { Board } = require('./boards.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const ENTITY_NAME = 'Board';
const taskService = require('../tasks/tasks.service');

const getAll = async () => Board.find({});

const save = async boards => {
  const board = await Board.create(boards);
  return board;
};
const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  return board;
};

const remove = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NOT_FOUND_ERROR(`${ENTITY_NAME} was not found`);
  }
  taskService.deleteAllTasksWithBoard(id);
  await Board.deleteOne({ _id: id });
  return board;
};

const update = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return get(id);
};

module.exports = { getAll, save, get, remove, update };
