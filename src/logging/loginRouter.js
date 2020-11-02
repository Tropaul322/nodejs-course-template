const router = require('express').Router();

const loginService = require('./loginService');

router.post('/', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await loginService.findUser(login, password);
    if (!user) {
      res.status(403).send('Wrong login or password');
    }
    const token = loginService.getToken(user);
    if (!token) {
      throw new Error();
    }
    console.log(token);
    res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
