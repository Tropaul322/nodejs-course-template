const router = require('express').Router();
const Board = require('./boards.model');
const boardsService = require('./boards.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res.json(boards.map(Board.toResponse));
});
router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.createBoard(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponse(newBoard));
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
  try {
    await boardsService.deleteBoard(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.route('/:id').put(async (req, res) => {
  const body = req.body;
  const boards = await boardsService.changeBoard(req.params.id, body);
  res.json(boards.map(Board.toResponse));
});

module.exports = router;
