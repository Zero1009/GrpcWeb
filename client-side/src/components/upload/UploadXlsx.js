import React, { useRef, useState } from 'react';
import { sendFile } from '../../common/api';
import {
  Button,
  Card,
  CardBody,
  CardText,
  Container,
  Form,
  Input,
  Label,
} from 'reactstrap';
const UploadXlsx = () => {
  const inputRef = useRef();
  const [file, setFile] = useState({
    fileName: null,
    reqFile: null,
  });
  const [statusUpload, setStatusUpload] = useState({
    xlsx: null,
  });

  const handleClickInput = () => {
    inputRef.current.click();
  };

  const handleChange = e => {
    setFile({
      fileName: e.target.files[0].name,
      reqFile: e.target.files[0],
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file.reqFile);
    const status = await sendFile(formData);
    setStatusUpload({ ...statusUpload, xlsx: status });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input onChange={handleChange} ref={inputRef} type='file' hidden />
        <div className='d-flex flex-row mb-3'>
          <Button color='primary' onClick={handleClickInput}>
            CHOOSE FILE
          </Button>
          <Label className='ms-3 me-3'>{file.fileName}</Label>
          <Button
            type='submit'
            color='primary'
            hidden={file.fileName === null ? true : false}
          >
            Upload
          </Button>
          {statusUpload.xlsx != null && (
            <div className='text-success fw-bold ms-3 fs-5'>
              {statusUpload.xlsx}
            </div>
          )}
        </div>
      </Form>
    </>
  );
};

export default UploadXlsx;
