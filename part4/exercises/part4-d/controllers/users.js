const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  res.status(200).json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (body.password.length < 4)
    return res
      .status(401)
      .json({ error: 'password must be 3 characters long.' });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

module.exports = usersRouter;
