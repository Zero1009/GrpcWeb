import axios from 'axios';
export const sendFile = async file => {
  const config = {
    multipart: 'form-data',
  };
  const res = await axios.post('uploadFile', file, config);
  return res.data;
};



