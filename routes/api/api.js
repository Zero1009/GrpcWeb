const express = require('express');
const router = express.Router();
const appController = require('../../controllers/storeFile');


router.post('/uploadFile', appController.upload, appController.responseUpload );
router.get('/methods', appController.test);


module.exports = router;
