//INIT
const PROTO_PATH = __dirname + '/./protoc/DataTransfer.proto';
const { etl } = require('./read_csv');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  objects: true,
  arrays: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).datatransfer;
const objData = {};
const target = {};
const packageName = {};
const serviceName = {};
const methods = {};

async function call_grpc(req_data) {
  const {
    hqNum,
    client,
    laneNum,
    plazaNum,
    entryHqNum,
    entryLaneNum,
    entryPlazaNum,
    tranId,
    plate1,
    plate2,
    plateNo1,
    province,
    timeStamp1,
    timeStamp2,
    tranDatetime,
  } = req_data;
  const target = '192.168.60.102:5051';
  const grpc_client = new proto.DataTransferService(
    target,
    grpc.credentials.createInsecure()
  );
  console.log('Request Data: ', req_data);
  const call = grpc_client.DataTransfer((err, response) => {
    if (err) return console.log(err.message);
    return console.log(response.message);
  });
  call.write();
  call.end();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const data = await etl('Data_Transfer_Format.xlsx');

  for (let i in data) {
    await call_grpc(data[i]);
    await sleep(200);
    console.log('DONE!!');
  }
}

main();