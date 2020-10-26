const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const { toResponse } = require('./user.model');
const userService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await userService.getAll();
  await res.status(OK).json(users.map(toResponse));
});

router.get('/:id', async (req, res) => {
  const userEntity = await userService.get(req.params.id);
  res.status(OK).send(toResponse(userEntity));
});

router.delete('/:id', async (req, res) => {
  await userService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.post('/', async (req, res) => {
  const userEntity = await userService.save(req.body);
  res.status(OK).send(toResponse(userEntity));
});

router.put('/:id', async (req, res) => {
  const userEntity = await userService.update(req.params.id, req.body);
  res.status(OK).send(toResponse(userEntity));
});

module.exports = router;
