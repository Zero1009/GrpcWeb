import React, { useState, useEffect } from 'react';
import { Button, CardBody, UncontrolledTooltip, Collapse } from 'reactstrap';
import {
  faArrowRotateRight,
  faFileUpload,
  faFilter,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Body = ({ protoRes, fileName, setFileName, setMessage }) => {
  const [collapse, setCollapse] = useState(false);
  const [collapsePkg, setcollapsePkg] = useState(false);

  const expandFile = e => {
    if (e.target.id === 'packageBtn') {
      return setcollapsePkg(!collapsePkg);
    }
    if (collapse === true && e.target.id === 'fileBtn') {
      setcollapsePkg(false);
    }
    setCollapse(!collapse);
  };
  const generateProtoObj = (message, methodName) => {
    localStorage.setItem('methodName', methodName);
    setMessage(message);
  };

  return (
    <>
      <CardBody className='border d-flex justify-content-between p-0'>
        <div className='d-flex justify-content-center align-items-center'>
          <Button
            className='p-0  ms-1 me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
            id='Reload'
          >
            <FontAwesomeIcon color='lightblue' icon={faArrowRotateRight} />
          </Button>
          <UncontrolledTooltip flip placement='bottom' target='Reload'>
            Reload
          </UncontrolledTooltip>
          <Button
            className='p-0  me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
            id='ImportPaths'
          >
            <FontAwesomeIcon color='lightblue' icon={faFileUpload} />
          </Button>
          <UncontrolledTooltip flip placement='bottom' target='ImportPaths'>
            Import Paths
          </UncontrolledTooltip>
          <Button
            className='p-0  me-1   d-flex justify-content-center align-items-center'
            style={{ width: '20px', height: '20px', background: 'white' }}
            id='FilterMethodNames'
          >
            <FontAwesomeIcon color='lightblue' icon={faFilter} />
          </Button>
          <UncontrolledTooltip
            flip
            placement='bottom'
            target='FilterMethodNames'
          >
            Filter method names
          </UncontrolledTooltip>
        </div>
        <Button
          className='p-0  me-1   d-flex justify-content-center align-items-center'
          style={{ width: '20px', height: '20px', background: 'white' }}
          id='DeleteAll'
          onClick={() => setFileName(null)}
        >
          <FontAwesomeIcon color='red' icon={faTrash} />
        </Button>
        <UncontrolledTooltip flip placement='bottom' target='DeleteAll'>
          Delete all
        </UncontrolledTooltip>
      </CardBody>
      <CardBody className='border h-100'>
        {fileName === null ? (
          <></>
        ) : (
          <>
            <Button className='btn-success' id='fileBtn' onClick={expandFile}>
              {fileName}
            </Button>
          </>
        )}
        {protoRes === null || fileName === null ? (
          <></>
        ) : (
          <Collapse className='mt-2 ms-2' isOpen={collapse}>
            <Button
              id='packageBtn'
              className='btn-warning'
              onClick={expandFile}
            >
              {protoRes.packageName + '.' + protoRes.serviceName}
            </Button>

            <Collapse isOpen={collapsePkg}>
              {protoRes.methods.methods.map(method => (
                <div className='p-0 m-0 d-flex flex-column'>
                  <div>
                    <Button
                      key={method.methodsName}
                      id={method.methodsName}
                      onClick={() =>
                        generateProtoObj(method.messages, method.methodsName)
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
      </CardBody>
    </>
  );
};

export default Body;
