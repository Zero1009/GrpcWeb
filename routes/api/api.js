const express = require('express');
const router = express.Router();
const appCoutroller = require('../../controllers/storeFile');

router.get('/', appCoutroller.storeFile);

module.exports = router;
