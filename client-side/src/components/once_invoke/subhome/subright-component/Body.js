import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Row, Col, CardBody, Button } from 'reactstrap';
import EditorJson from './editor/Editor';
const Body = ({ message, setReqMessage, response }) => {
  return (
    <>
      <Row
        className='d-flex justify-content-center'
        style={{ height: '100vh' }}
      >
        <Col className='pe-0 pb-0'>
          Editor
          <CardBody className='border p-0 h-100 d-flex flex-column'>
            <EditorJson message={message} setReqMessage={setReqMessage} />
          </CardBody>
        </Col>

        <Col className='ps-0 pb-4'>
          Response
          <CardBody className='border h-100'>
            <pre>{response === null ? '' : response}</pre>
          </CardBody>
        </Col>
      </Row>
    </>
  );
};

export default Body;
