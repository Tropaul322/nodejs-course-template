const router = require('express').Router();
const Board = require('./boards.model');
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res.status(200).json(boards.map(Board.toResponse));
});
router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.createBoard(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.status(200).json(Board.toResponse(newBoard));
});
router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.getBoard(req.params.id);
    res.json(Board.toResponse(board));
  } catch (err) {
    res.status(404).send('board not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  const deleted = await boardsService.deleteBoard(req.params.id);
  if (deleted) {
    tasksService.deleteAllBoardTasks(req.params.id);
    res.status(204).json({});
  } else res.status(404).json({});
});

router.route('/:id').put(async (req, res) => {
  const body = req.body;
  const boards = await boardsService.changeBoard(req.params.id, body);
  if (boards) {
    res.status(200).json(Board.toResponse(boards));
  } else res.status(404).json({});
});

module.exports = router;
