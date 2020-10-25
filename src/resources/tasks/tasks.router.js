const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const { toResponse } = require('./tasks.model');
const taskService = require('./tasks.service');

router.get('/', async (req, res) => {
  const task = await taskService.getAll(req.params.boardId);
  await res.status(OK).json(task.map(toResponse));
});

router.get('/:id', async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.id);
  res.status(OK).send(toResponse(task));
});

router.delete('/:id', async (req, res) => {
  await taskService.remove(req.params.boardId, req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.post('/', async (req, res) => {
  const task = await taskService.save(req.params.boardId, req.body);
  res.status(OK).send(toResponse(task));
});

router.put('/:id', async (req, res) => {
  const task = await taskService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  res.status(OK).send(toResponse(task));
});

module.exports = router;
