const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const { toResponse } = require('./boards.model');
const boardService = require('./boards.service');

router.get('/', async (req, res) => {
  const boards = await boardService.getAll();
  await res.status(OK).json(boards.map(toResponse));
});

router.get('/:id', async (req, res) => {
  const board = await boardService.get(req.params.id);
  res.status(OK).send(toResponse(board));
});

router.delete('/:id', async (req, res) => {
  await boardService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.post('/', async (req, res) => {
  const board = await boardService.save(req.body);
  res.status(OK).send(toResponse(board));
});

router.put('/:id', async (req, res) => {
  const board = await boardService.update(req.params.id, req.body);
  res.status(OK).send(toResponse(board));
});

module.exports = router;
