const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/' + file.originalname.split('.')[1]);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

const responseUpload = (req, res) => {
  res.send('Success');
};
module.exports = { upload, responseUpload };
