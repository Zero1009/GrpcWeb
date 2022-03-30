const express = require('express');
const router = express.Router();
const appController = require('../../controllers/storeFile');
const readProto = require('../../controllers/readFile');
const call_grpc = require('../../controllers/grpc');


router.post('/uploadFile', appController.upload, appController.responseUpload );
router.get('/readFile',readProto.package,readProto.methods);
router.post('/grpc',call_grpc.getGrpcBody);

module.exports = router;
