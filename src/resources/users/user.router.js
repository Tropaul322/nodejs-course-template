const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/tasks.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});
router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else res.status(404).json({});
});
router.route('/').post(async (req, res) => {
  const newUser = await usersService.createUser(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
  res.status(200).json(User.toResponse(newUser));
});
router.route('/:id').delete(async (req, res) => {
  const deleted = await usersService.deleteUser(req.params.id);
  if (deleted) {
    tasksService.deleteAllUsersId(req.params.id);
    res.status(204).json([]);
  } else res.status(404).json({});
});
router.route('/:id').put(async (req, res) => {
  const body = req.body;
  const users = await usersService.changeUser(req.params.id, body);
  if (users) {
    res.status(200).json(User.toResponse(users));
  } else res.status(404).json({});
});

module.exports = router;
