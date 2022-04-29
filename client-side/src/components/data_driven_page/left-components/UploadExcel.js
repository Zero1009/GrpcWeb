import React, { useRef, useState, useContext } from 'react';
import { CardHeader, CardBody, Button } from 'reactstrap';
import { FileContext } from '../DataDriven';
import { sendFile } from '../../../common/api';

const UploadExcel = () => {
  const btnRef = useRef(null);
  const [file, setFile] = useState(null);
  const files = useContext(FileContext);

  const handleRef = () => {
    btnRef.current.click();
  };

  const handleChange = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
    files.setFiles({ ...files.files, fileXcel: e.target.files[0] });
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await sendFile(formData);
    files.setFiles({
      ...files.files,
      xcelContent: res.messages,
      messagesTxt: res.messagestxt,
    });
  };
  return (
    <>
      <CardHeader>Upload Excel</CardHeader>
      <CardBody className='d-flex flex-column align-items-center mb-3'>
        <input
          type='file'
          accept='.xlsx'
          ref={btnRef}
          onChange={handleChange}
          hidden
        />
        <div className='d-flex flex-column'>
          <Button id='btnUploadExcel' onClick={handleRef}>
            Choose File
          </Button>
          {file === null ? (
            <label>No file select</label>
          ) : (
            <label>{file.name}</label>
          )}
        </div>

        <div>
          <Button className='btn-success ' onClick={handleClick}>
            Upload Excel
          </Button>
        </div>
      </CardBody>
    </>
  );
};

export default UploadExcel;
