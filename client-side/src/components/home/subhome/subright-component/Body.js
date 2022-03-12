import React, { useRef } from 'react';
import { Row, Col, CardBody, Button } from 'reactstrap';
import EditorJson from './editor/Editor';
const Body = () => {
  const scrollRef = useRef(null);
  return (
    <>
      <Row
        className='d-flex justify-content-center'
        style={{ height: '100vh' }}
      >
        <Col className='pe-0 pb-0'>
          <CardBody ref={scrollRef} className='border p-0 h-100'>
            Editor
            <EditorJson />
          </CardBody>
        </Col>

        <Col className='ps-0 pb-4'>
          Response
          <CardBody className='border h-100'>6</CardBody>
        </Col>
      </Row>
    </>
  );
};

export default Body;
