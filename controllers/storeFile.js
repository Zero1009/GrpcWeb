const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs')
const parser = require('proto-parser');

const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if ((file.originalname.split('.')[1] != 'xlsx' && file.originalname.split('.')[1] != 'proto')) {
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
      cb(null, '')
    }
  },
});
const upload = multer({ storage: storage }).single('file')

const responseUpload = (req, res) => {
  if (localStorage.getItem('status') == null) {
    localStorage.setItem('status', JSON.stringify({
      "code": "failed",
      "description": "file null"
    }));
  } if (JSON.parse(localStorage.getItem('status')).code == "success" && JSON.parse(localStorage.getItem('status')).description.split('.')[1]=="proto") {
    detail();
  }
  res.send(JSON.parse(localStorage.getItem('status')))
  localStorage.clear();
};

const test = (req, res) => { detail() };

const detail = () => {
  try {
    const file = JSON.parse(localStorage.getItem('status')).description
    const path = './uploads/proto/' + file
    // const path = './uploads/proto/NotificationService.proto'
    const data = fs.readFileSync(path, 'utf8')
    const protoDocument = parser.parse(data);
    const methods = []
    const packageName = protoDocument.package
    let serviceName = ""
    for (let i in protoDocument.root.nested[packageName].nested) {
      if (protoDocument.root.nested[packageName].nested[i].methods != undefined) {
        serviceName = i;
      }
    }
    for (let i in protoDocument.root.nested[packageName].nested[serviceName].methods) {
      let requestName = protoDocument.root.nested[packageName].nested[serviceName].methods[i].requestType.value
      const message = []
      for (let j in protoDocument.root.nested[packageName].nested[requestName].fields) {
        message.push(j);
      }
      const methodObj = {
        methodsName: i,
        messages: message
      }
      methods.push(methodObj)
    }
    localStorage.setItem('status', JSON.stringify({ "status": "success", "packageName": packageName, "serviceName": serviceName, "methods": methods }));
  } catch (err) {
    console.error(err)
  }
};

module.exports = { upload, responseUpload, test };
