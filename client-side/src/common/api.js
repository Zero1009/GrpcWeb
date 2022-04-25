import axios from 'axios';
export const sendFile = async file => {
  const config = {
    multipart: 'form-data',
  };
  const res = await axios.post('uploadFile', file, config);
  return res.data;
};

export const callGrpc = async body => {
  const config = {
    'Content-Type': 'application/json',
  };
  const res = await axios.post('grpc', body, config);
  return res.data;
};
