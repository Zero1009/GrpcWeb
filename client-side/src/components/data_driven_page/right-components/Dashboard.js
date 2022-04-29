import React, { useContext } from 'react';
import { CardHeader, CardBody, Row, Col, Card } from 'reactstrap';
import { FileContext } from '../DataDriven';
import InvokeGrpc from './invoke/InvokeGrpc';
import PreviewData from './preview-data/PreviewData';
import Result from './result/Result';
const Dashboard = () => {
  const files = useContext(FileContext);
  return (
    <div
      style={{
        filter: `blur(${
          !(files.files.fileXcel && files.files.fileProto) ? '2px' : '0px'
        })`,
      }}
    >
      <CardHeader align='center'>DataDriven</CardHeader>
      <CardBody className='p-1 h-100'>
        <Row className='h-75'>
          <Col lg={6}>
            <PreviewData />
          </Col>
          <Col>
            <InvokeGrpc />
          </Col>
        </Row>
        <Row className='h-25'>
          <Col>
            <Result />
          </Col>
        </Row>
      </CardBody>
    </div>
  );
};

export default Dashboard;
