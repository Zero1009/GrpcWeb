import React, { useRef, useState, useContext } from 'react';
import { CardHeader, CardBody, Button, Collapse, Container } from 'reactstrap';
import { FileContext } from '../DataDriven';
import { sendFile } from '../../../common/api';
import LinesEllipsis from 'react-lines-ellipsis';
const UploadProto = () => {
  const btnRef = useRef(null);
  const [file, setFile] = useState(null);
  const files = useContext(FileContext);
  const [collapse, setCollapse] = useState(false);
  const [collapsePkg, setcollapsePkg] = useState(false);

  const handleRef = () => {
    btnRef.current.click();
  };

  const handleChange = async e => {
    e.preventDefault();
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await sendFile(formData);
    files.setFiles({
      ...files.files,
      protoRes: res,
      fileProto: e.target.files[0],
    });
  };

  const expandFile = e => {
    e.preventDefault();
    if (e.target.id === 'packageBtn') {
      return setcollapsePkg(!collapsePkg);
    }
    if (collapse === true && e.target.id === 'fileBtn') {
      setcollapsePkg(false);
    }
    setCollapse(!collapse);
  };

  const handleClickMethodName = (messages, e) => {
    files.setFiles({ ...files.files, method: e.target.id, message: messages });
  };

  return (
    <>
      <CardHeader>Upload Proto</CardHeader>
      <CardBody className='d-flex flex-column align-items-center'>
        <input
          type='file'
          accept='.proto'
          ref={btnRef}
          onChange={handleChange}
          hidden
        />
        <Container>
          <div className='d-flex flex-column'>
            <Button className='mb-3' id='btnUploadExcel' onClick={handleRef}>
              Upload Proto
            </Button>
            {file === null ? (
              <label>No file select</label>
            ) : (
              <>
                {file.name === null ? (
                  <></>
                ) : (
                  <>
                    <Button
                      className='btn-success'
                      id='fileBtn'
                      onClick={expandFile}
                    >
                      {file.name}
                    </Button>
                  </>
                )}
                {files.files.protoRes === null || file.name === null ? (
                  <></>
                ) : (
                  <Collapse className='mt-2 ms-2' isOpen={collapse}>
                    <Button
                      id='packageBtn'
                      className='btn-warning'
                      onClick={expandFile}
                    >
                      {files.files.protoRes.packageName +
                        '.' +
                        files.files.protoRes.serviceName}
                    </Button>

                    <Collapse isOpen={collapsePkg}>
                      {files.files.protoRes.methods.methods.map(method => (
                        <div className='p-0 m-0 d-flex flex-column'>
                          <div>
                            <Button
                              key={method.methodsName}
                              id={method.methodsName}
                              onClick={e =>
                                handleClickMethodName(method.messages, e)
                              }
                              className='mt-2 ms-2 w-75 btn-danger'
                            >
                              {method.methodsName}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Collapse>
                  </Collapse>
                )}
              </>
            )}
          </div>
        </Container>
      </CardBody>
    </>
  );
};

export default UploadProto;
