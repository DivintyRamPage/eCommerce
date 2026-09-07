const express = require('express');
const { data } = require('../db/store');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([...data.categories].sort((a, b) => a.name.localeCompare(b.name, 'uk')));
});

module.exports = router;
