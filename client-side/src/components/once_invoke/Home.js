import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import SubLeft from './subhome/SubLeft';
import SubRight from './subhome/SubRight';
const Home = () => {
  const [requestGrpc, setResquestGrpc] = useState(null);
  const [message, setMessage] = useState(null);
  return (
    <>
      <Container>
        <Row
          style={{ height: '100vh' }}
          className='d-flex justify-content-center'
        >
          <Col xs='4' className='pe-0 is-sticky'>
            <SubLeft
              setMessage={setMessage}
              setResquestGrpc={setResquestGrpc}
            />
          </Col>
          <Col xs='8' className='ps-0 pe-0 '>
            <SubRight message={message} requestGrpc={requestGrpc} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
