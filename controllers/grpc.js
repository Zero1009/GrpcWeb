// INIT

// const {
//     etl
// } = require('./read_csv');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { response } = require('express');
const express = require('express');

const getGrpcBody = async (req, res) => {
  const body = req.body;
  const messages = body.messages;
  const packageName = body.packageName;
  const serviceName = body.serviceName;
  const methodName = body.methodName;
  const fileName = body.fileName;
  const target = body.target;
  let response = [];
  let count = 0;
  for (let message of messages) {
    count++;
    console.log(message);
    const res = await callGrpc(
      message,
      packageName,
      serviceName,
      methodName,
      target,
      fileName
    );
    response.push(count + ' : ' + res);
  }
  res.send(response);
};
const callGrpc = (
  grpcMessage,
  packName,
  serviceName,
  methodName,
  target,
  fileName
) => {
  return new Promise((resolve, reject) => {
    const packageName = packName;
    const serName = serviceName;
    const methName = methodName;
    const targetIP = target;
    const PROTO_PATH = `./uploads/proto/${fileName}.proto`;
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      objects: true,
      arrays: true,
    });
    // console.log(packageDefinition[packName+'.'+serviceName][methodName].requestStream)
    const proto = grpc.loadPackageDefinition(packageDefinition)[packageName];
    const grpc_client = new proto[serName](
      targetIP,
      grpc.credentials.createInsecure()
    );
    console.log('Request Data: ', typeof grpcMessage);
    if (
      packageDefinition[packName + '.' + serviceName][methodName].requestStream
    ) {
      const call = grpc_client[methName]((err, response) => {
        if (err) {
          resolve(err.message);
        }
        resolve(response.message);
      });
      call.write(grpcMessage);
      call.end();
    } else {
      grpc_client[methName](grpcMessage, function (err, response) {
        if (err) {
          resolve(err.message);
        }
        resolve(response.message);
      });
    }
  });
};

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

module.exports = {
  getGrpcBody,
};
