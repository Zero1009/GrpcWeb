import React from 'react';
import { Button, CardBody,UncontrolledTooltip } from 'reactstrap';
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
            id="Reload"
          >
            <FontAwesomeIcon color='lightblue' icon={faArrowRotateRight} />
          </Button>
          <UncontrolledTooltip
          flip
          placement="bottom"
          target="Reload"
          >
          Reload
          </UncontrolledTooltip>
          <Button
            className='p-0  me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
            id="ImportPaths"
          >
            <FontAwesomeIcon color='lightblue' icon={faFileUpload} />
          </Button>
          <UncontrolledTooltip
          flip
          placement="bottom"
          target="ImportPaths"
          >
          Import Paths
          </UncontrolledTooltip>
          <Button
            className='p-0  me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
            id = "FilterMethodNames"
          >
            <FontAwesomeIcon color='lightblue' icon={faFilter} />
          </Button>
          <UncontrolledTooltip
          flip
          placement="bottom"
          target="FilterMethodNames"
          >
          Filter method names
          </UncontrolledTooltip>
        </div>
        <Button
          className='p-0  me-1   d-flex justify-content-center align-items-center'
          style={{ width: '20px', height: '20px', background: 'white' }}
          id="DeleteAll"
        >
          <FontAwesomeIcon color='red' icon={faTrash} />
        </Button>
        <UncontrolledTooltip
          flip
          placement="bottom"
          target="DeleteAll"
          >
          Delete all
          </UncontrolledTooltip>
      </CardBody>
      <CardBody className='border h-100'></CardBody>
    </>
  );
};

export default Body;
