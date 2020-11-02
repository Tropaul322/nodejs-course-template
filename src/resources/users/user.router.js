const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const { toResponse } = require('./user.model');
const bcrypt = require('bcrypt');
const userService = require('./user.service');
const { DEFAULT_SALT_ROUNDS } = require('../../common/config');

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(OK).json(users.map(toResponse));
  } catch (e) {
    return next(e);
  }
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
  const { name, login, password } = req.body;
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userEntity = await userService.save({
    name,
    login,
    password: hashedPassword
  });
  res.status(OK).send(toResponse(userEntity));
});

router.put('/:id', async (req, res) => {
  const { name, login, password } = req.body;
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userEntity = await userService.update(req.params.id, {
    name,
    login,
    password: hashedPassword
  });
  res.status(OK).send(toResponse(userEntity));
});

module.exports = router;
