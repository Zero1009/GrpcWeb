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
  call.write({
    hqNum: hqNum,
    client: client,
    tranId: tranId,
    laneNum: laneNum,
    tranSeq: '4843312',
    plazaNum: plazaNum,
    refTag: '',
    vehicles: [
      {
        plate1: plate1,
        plate2: plate2,
        cameraNo: '0',
        plateNo1: plateNo1,
        province: province,
        timeStamp: timeStamp1,
        crossLane: {
          platePicName: '',
          platePicData: '',
          bodyPicName: '',
          bodyPicData: '',
          plate1: '',
          plate2: '',
          province: '',
        },
        cameraCode: '1',
        bodyPicData: '37a5c95c-79e3-4e26-87cd-3a44077fb362',
        bodyPicName: '1626337795642.jpeg',
        platePicData: '37a5c95c-79e3-4e26-87cd-3a44077fb362',
        platePicName: '1626337795642.jpeg',
        vehicleWheel: 'VWHEL0002',
        overallPicData: '37a5c95c-79e3-4e26-87cd-3a44077fb362',
        overallPicName: '1626337795642.jpeg',
        percentageProvince: 99,
        percentageCharacter: 99,
        vehicleBrand: 'VBRAND0723',
      },
    ],
    timeStamp: timeStamp1,
    entryHqNum: entryHqNum,
    entryLaneNum: entryLaneNum,
    tranDatetime: '2022-03-10T09:00:00.210Z',
    vehicleClass: '2',
    entryPlazaNum: entryPlazaNum,
  });

  call.end();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const data = await etl('Data_Transfer_Format.xlsx');
  console.log(packageDefinition);
  // for (let i in data) {
  //   await call_grpc(data[i]);
  //   await sleep(200);
  //   console.log('DONE!!');
  // }
}

main();
