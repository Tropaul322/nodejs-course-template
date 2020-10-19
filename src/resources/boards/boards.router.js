const router = require('express').Router();
const Board = require('./boards.model');
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');
const { logger } = require('../../common/logger');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAllBoards();
    res.status(200).json(boards.map(Board.toResponse));
  } catch (e) {
    logger.error('error', e.stack);
  }
});
router.route('/').post(async (req, res) => {
  try {
    const newBoard = await boardsService.createBoard(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );
    res.status(200).json(Board.toResponse(newBoard));
  } catch (e) {
    logger.error('error', e.stack);
  }
});
router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(404).send('board not found');
    }
  } catch (e) {
    logger.error('error', e.stack);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deleted = await boardsService.deleteBoard(req.params.id);
    if (deleted) {
      tasksService.deleteAllBoardTasks(req.params.id);
      res.status(204).json({});
    } else res.status(404).json({});
  } catch (e) {
    logger.error('error', e.stack);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const body = req.body;
    const boards = await boardsService.changeBoard(req.params.id, body);
    if (boards) {
      res.status(200).json(Board.toResponse(boards));
    } else res.status(404).json({});
  } catch (e) {
    logger.error('error', e.stack);
  }
});

module.exports = router;
