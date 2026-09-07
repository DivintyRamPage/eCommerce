const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { data, save, nextId } = require('../db/store');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Поля name, email, password обов'язкові" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль має містити щонайменше 6 символів' });
  }

  if (data.users.find((u) => u.email === email)) {
    return res.status(409).json({ error: 'Користувач з таким email вже існує' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = { id: nextId('users'), name, email, passwordHash };
  data.users.push(user);
  save();

  const publicUser = { id: user.id, name: user.name, email: user.email };
  const token = jwt.sign(publicUser, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ user: publicUser, token });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Поля email, password обов'язкові" });
  }

  const user = data.users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Невірний email або пароль' });
  }

  const publicUser = { id: user.id, name: user.name, email: user.email };
  const token = jwt.sign(publicUser, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: publicUser, token });
});

module.exports = router;
