const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});
router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  res.json(User.toResponse(user));
});
router.route('/').post(async (req, res) => {
  const newUser = await usersService.createUser(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
  res.json(User.toResponse(newUser));
});

module.exports = router;
