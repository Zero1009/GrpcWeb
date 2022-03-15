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
  }if (JSON.parse(localStorage.getItem('status')).code == "success" && JSON.parse(localStorage.getItem('status')).description.split('.')[1]=="xlsx") {
    detailxlsx();
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

const detailxlsx = () => {
  try{
var XLSX = require("xlsx");
const file = JSON.parse(localStorage.getItem('status')).description
const path = './uploads/xlsx/' + file
var workbook = XLSX. readFile(path);
var sheet_name_list = workbook.SheetNames;

console. log(sheet_name_list); // getting as Sheet1
sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets [y];
  //getting the complete sheet
 // console.log (worksheet);
  var headers = {};
 var data = [];
  for (z in worksheet) {
    if (z[0] == "!") continue;
    //parse out the column, row, and value
    var col = z.substring (0, 1);
   // console. log(col);
    var row = parseInt(z.substring (1));
    // console. log (row);
    var value = worksheet [z].v;
   // console. log (value);
                
    //store header names
    if (row == 1) {
       headers [col] = value;
      // storing the header names
       continue;
    }

    if (!data[row]) data[row] = {};
data[row][headers[col]] = value;
}
//drop those first two rows which are empty
data.shift();
data.shift();
console. log(data);
});
    localStorage.setItem('status', JSON.stringify({ "status": "upload xlsx success"}));
   }catch (err) {
  console.error(err)
   }
};
