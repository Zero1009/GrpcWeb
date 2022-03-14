const express = require('express');
const router = express.Router();
const appController = require('../../controllers/storeFile');

<<<<<<< HEAD
router.post('/uploadFile', appController.upload, appController.responseUpload);
=======

router.post('/uploadFile', appController.upload, appController.responseUpload );
>>>>>>> dd1cc4af062e58987c5a62d86694db8d587a861d

module.exports = router;
