const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const parser = require('proto-parser');
const { json } = require('express/lib/response');

const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');

const storage = multer.diskStorage({
  // upload file
  destination: function (req, file, cb) {
    if (
      file.originalname.split('.')[1] != 'xlsx' &&
      file.originalname.split('.')[1] != 'proto'
    ) {
      cb(null, './uploads/dummy');
    }
    cb(null, './uploads/' + file.originalname.split('.')[1]);
  },
  filename: function (req, file, cb) {
    if (
      file.originalname.split('.')[1] == 'xlsx' ||
      file.originalname.split('.')[1] == 'proto'
    ) {
      localStorage.setItem(
        'status',
        JSON.stringify({
          //upload success
          code: 'success',
          description: file.originalname,
        })
      );
      cb(null, file.originalname);
    } else {
      localStorage.setItem(
        'status',
        JSON.stringify({
          // upload fail file ผิดประเภท
          code: 'failed',
          description: 'worng file type',
        })
      );
      cb(null, '');
    }
  },
});
const upload = multer({ storage: storage }).single('file');

const responseUpload = (req, res) => {
  // return ผลลัพธ์
  if (localStorage.getItem('status') == null) {
    localStorage.setItem(
      'status',
      JSON.stringify({
        // upload fail
        code: 'failed',
        description: 'file null',
      })
    );
  }
  if (
    JSON.parse(localStorage.getItem('status')).code == 'success' &&
    JSON.parse(localStorage.getItem('status')).description.split('.')[1] ==
      'proto'
  ) {
    detailProto(); // หา detail ของไฟล์ proto ที่ upload
  }
  res.send(JSON.parse(localStorage.getItem('status')));
  localStorage.clear();
};

const messageProto = (protoDocument, packageName, requestName, messageName) => {
  // function หา message ในรูป json
  let m = [];
  if (
    protoDocument.root.nested[packageName].nested[requestName].fields[
      messageName
    ].type.resolvedValue != undefined
  ) {
    if (
      protoDocument.root.nested[packageName].nested[requestName].fields[
        messageName
      ].rule != undefined
    ) {
      // object array
      requestName =
        protoDocument.root.nested[packageName].nested[requestName].fields[
          messageName
        ].type.value;
      for (let j in protoDocument.root.nested[packageName].nested[requestName]
        .fields) {
        const message = messageProto(
          protoDocument,
          packageName,
          requestName,
          j
        );
        m.push(`"${message[0]}":${message[1]}`);
      }
      return [messageName, `[{${m.toString()}}]`];
    } else {
      //object
      requestName =
        protoDocument.root.nested[packageName].nested[requestName].fields[
          messageName
        ].type.value;
      for (let j in protoDocument.root.nested[packageName].nested[requestName]
        .fields) {
        const message = messageProto(
          protoDocument,
          packageName,
          requestName,
          j
        );
        m.push(`"${message[0]}":${message[1]}`);
      }
      return [messageName, `{${m.toString()}}`];
    }
  } else {
    if (
      protoDocument.root.nested[packageName].nested[requestName].fields[
        messageName
      ].rule != undefined
    ) {
      //array
      return [messageName, `[""]`];
    } else {
      //value
      if (
        protoDocument.root.nested[packageName].nested[requestName].fields[
          messageName
        ].type.value == 'string'
      ) {
        return [messageName, `""`];
      } else {
        return [messageName, `0`];
      }
    }
  }
};

const test = (req, res) => {
  // สำหรับลองยิง
  const path = './uploads/proto/NotificationService.proto';
  const data = fs.readFileSync(path, 'utf8');
  const protoDocument = parser.parse(data);
  res.send(protoDocument);
};

const detailProto = () => {
  // หา detail ของ proto ไปแสดงหน้าบ้าน

  try {
    const file = JSON.parse(localStorage.getItem('status')).description;
    const path = './uploads/proto/' + file;
    // const path = './uploads/proto/NotificationService.proto'
    const data = fs.readFileSync(path, 'utf8');
    const protoDocument = parser.parse(data);
    const methods = [];
    const packageName = protoDocument.package;
    let serviceName = '';
    for (let i in protoDocument.root.nested[packageName].nested) {
      if (
        protoDocument.root.nested[packageName].nested[i].methods != undefined
      ) {
        serviceName = i; // ชื่อ service
      }
    }
    for (let i in protoDocument.root.nested[packageName].nested[serviceName]
      .methods) {
      // วนตาม จำนวน method
      let requestName =
        protoDocument.root.nested[packageName].nested[serviceName].methods[i]
          .requestType.value; // ชื่อ method
      const messages = [];
      for (let j in protoDocument.root.nested[packageName].nested[requestName]
        .fields) {
        //วนตาม message
        const message = messageProto(
          protoDocument,
          packageName,
          requestName,
          j
        ); //เรียก function หา message
        messages.push(`"${message[0]}":${message[1]}`);
      }
      const methodObj = {
        methodsName: i,
        messages: JSON.parse(`{${messages.toString()}}`),
      };
      methods.push(methodObj);
    }
    //set response
    localStorage.setItem(
      'status',
      JSON.stringify({
        status: 'success',
        packageName: packageName,
        serviceName: serviceName,
        methods: { methods },
      })
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { upload, responseUpload, test };
