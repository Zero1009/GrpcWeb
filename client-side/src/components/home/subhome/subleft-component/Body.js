import React from 'react';
import { Button, CardBody } from 'reactstrap';
import {
  faArrowRotateRight,
  faFileUpload,
  faFilter,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Body = () => {
  return (
    <>
      <CardBody className='border d-flex justify-content-between p-0'>
        <div className='d-flex justify-content-center align-items-center'>
          <Button
            className='p-0  ms-1 me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
          >
            <FontAwesomeIcon color='lightblue' icon={faArrowRotateRight} />
          </Button>
          <Button
            className='p-0  me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
          >
            <FontAwesomeIcon color='lightblue' icon={faFileUpload} />
          </Button>
          <Button
            className='p-0  me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
          >
            <FontAwesomeIcon color='lightblue' icon={faFilter} />
          </Button>
        </div>
        <Button
          className='p-0  me-1   d-flex justify-content-center align-items-center'
          style={{ width: '20px', height: '20px', background: 'white' }}
        >
          <FontAwesomeIcon color='red' icon={faTrash} />
        </Button>
      </CardBody>
      <CardBody className='border h-100'></CardBody>
    </>
  );
};

export default Body;
