const express = require('express');
const router = express.Router();

const storeFile = (req, res) => {
  try {
    res.json({ message: 'Hi world' });
  } catch (error) {}
};

module.exports = { storeFile };
