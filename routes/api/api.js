const express = require('express');
const router = express.Router();
const appController = require('../../controllers/storeFile');


router.post('/uploadFile', appController.uploadImg, appController.test );

module.exports = router;
