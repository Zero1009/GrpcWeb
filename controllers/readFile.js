const express = require('express');
const router = express.Router();
const ProtoBuf = require('protobufjs');
const t = require('proto-parser')
const fs = require("fs")
const grpc = require('@grpc/proto-loader')

//const fileName = 

const package = () => {
        //console.log(methods())
        methods()
};

const methods = () =>  {
    try{
    //console.log(JSON.stringify(protoDocument, null, 2));  
    const proto = fs.readFileSync('NotificationService.proto')
    //const proto = fs.readFileSync('QrCodeService.proto')
    const protoDocument = t.parse(proto);
    const packageName = protoDocument.package
    const serviceName = Object.keys(protoDocument.root.nested[packageName].nested).pop()
    
    for(let i in protoDocument.root.nested[packageName].nested[serviceName].methods ){
        const serviceMethods = protoDocument.root.nested[packageName].nested[serviceName].methods[i].requestType.value
        //console.log(serviceMethods)
        let a = [];
        for(let j in protoDocument.root.nested[packageName].nested[serviceMethods].fields){
        a.push(j)
        }
        console.log(a)
    }
    } catch (error) {
    console.log(error)
    }
};
module.exports = {methods,package};
