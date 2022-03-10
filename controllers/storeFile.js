const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'+file.originalname.split('.')[1]);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
const uploadImg = multer({ storage: storage }).single('image');
  
const test = (req,res)=>{
  console.log(storage.diskStorage)
  res.send('Success')
};
module.exports = {  uploadImg ,test};
