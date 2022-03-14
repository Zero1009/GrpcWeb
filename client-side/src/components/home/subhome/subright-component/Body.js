import React, { useRef, useState, useCallback } from 'react';
import { Row, Col, CardBody, Button } from 'reactstrap';
import EditorJson from './editor/Editor';
const Body = () => {
  const [body, setBody] = useState(null);
  const callback = useCallback(body => {
    setBody(body);
  });
  const divStyle = {
    overflowY: 'scroll',
    border: '1px solid red',
    width: '500px',
    float: 'left',
    height: '500px',
    position: 'relative',
  };
  return (
    <>
      <Row
        className='d-flex justify-content-center'
        style={{ height: '100vh' }}
      >
        <Col className='pe-0 pb-0'>
          <CardBody className='border p-0 h-100 d-flex flex-column'>
            <p>Editor</p>
            <EditorJson parentCallback={callback} />
          </CardBody>
        </Col>

        <Col className='ps-0 pb-4'>
          Response
          <CardBody className='border h-100'>
            <pre>{JSON.stringify(body, null, 1)}</pre>
          </CardBody>
        </Col>
      </Row>
    </>
  );
};

export default Body;
