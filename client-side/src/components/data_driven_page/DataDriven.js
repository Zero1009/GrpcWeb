import React, { useEffect, useRef, useState, createContext } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from 'reactstrap';
import UploadExcel from './left-components/UploadExcel';
import UploadProto from './left-components/UploadProto';
import Dashboard from './right-components/Dashboard';

export const FileContext = createContext();
const DataDriven = () => {
  const [files, setFiles] = useState({
    fileXcel: null,
    xcelContent: null,
    fileProto: null,
    protoRes: null,
    method: null,
    message: null,
    messageTxt: null,
    response: null,
  });

  return (
    <FileContext.Provider value={{ files, setFiles }}>
      <Container className='h-100'>
        <Row style={{ height: '100vh' }}>
          <Col lg={3}>
            <Card>
              {' '}
              <UploadProto />
              <UploadExcel />
            </Card>
          </Col>
          <Col
            lg={9}
            className='d-flex justify-content-center '
            style={{
              pointerEvents: `${
                !(files.fileXcel && files.fileProto) ? 'none' : 'visible'
              }`,
            }}
          >
            <Card className='w-100 '>
              <Dashboard files={files} />
            </Card>

            {!(files.fileXcel != null && files.fileProto != null) ? (
              <div className='position-absolute   d-flex justify-content-center text-danger mt-5'>
                <p className='mt-5 fw-bold'>Please Upload All files first</p>
              </div>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </FileContext.Provider>
  );
};

export default DataDriven;
