const express = require('express');
const router = express.Router();
const appController = require('../../controllers/storeFile');
const readProto = require('../../controllers/readFile')


router.post('/uploadFile', appController.upload, appController.responseUpload );
router.get('/readFile',readProto.package,readProto.methods);

module.exports = router;
