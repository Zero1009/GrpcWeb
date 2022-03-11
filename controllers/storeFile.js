const express = require('express');
const router = express.Router();
const multer = require('multer');
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if((file.originalname.split('.')[1] != 'xlsx' && file.originalname.split('.')[1] != 'proto')){
      cb(null, './uploads/dummy');
    }
      cb(null, './uploads/' + file.originalname.split('.')[1]);
  },
  filename: function (req, file, cb) {
    if (file.originalname.split('.')[1] == 'xlsx' || file.originalname.split('.')[1] == 'proto') {
      localStorage.setItem('status', JSON.stringify({
        "code": "success",
        "description": file.originalname
      }));
      cb(null, file.originalname);
    } 
    else {
      localStorage.setItem('status', JSON.stringify({
        "code": "failed",
        "description": "worng file type"
      }));
      cb(null,'')
    }
  },
});
const upload =  multer({ storage: storage }).single('file')
  
const responseUpload = (req, res) => {
  if(localStorage.getItem('status')==null){
    localStorage.setItem('status', JSON.stringify({
      "code": "failed",
      "description": "file null"
    }));
  }
  res.send(JSON.parse(localStorage.getItem('status')))
  localStorage.clear();
};
module.exports = { upload, responseUpload };
