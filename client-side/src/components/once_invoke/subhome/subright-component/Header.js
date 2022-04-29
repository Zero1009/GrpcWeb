import React, { useEffect, useState } from 'react';
import {
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { callGrpc } from '../../../../common/api';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faServer,
  faAngleDown,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
const Header = ({ reqMessage, requestGrpc, setResponse }) => {
  const [ip, setIp] = useState(null);
  const [dDownOpen, setDDownOpen] = useState(false);
  const toggle = () => setDDownOpen(!dDownOpen);
  const [modal, setModal] = useState(false);
  const [envName, setEnvName] = useState('');
  const [envItem, setEnvItem] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    setMessage(reqMessage);
  }, [reqMessage]);
  const handleModalEnv = () => {
    setModal(!modal);
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const addEnv = () => {
    setEnvItem([...envItem, envName]);
    setModal(!modal);
  };

  const handleClick = async () => {
    let body = { messages: [] };
    body.methodName = localStorage.getItem('methodName');
    body.fileName = localStorage.getItem('fileName');
    body.packageName = requestGrpc.packageName;
    body.serviceName = requestGrpc.serviceName;
    body.target = ip;
    body.messages.push(JSON.parse(message));
    const res = await callGrpc(body);
    setResponse(res);
  };
  return (
    <>
      <CardHeader className='card-header-sub d-flex'>
        <Dropdown
          toggle={toggle}
          isOpen={dDownOpen}
          onClick={() => setDDownOpen(!dDownOpen)}
        >
          <DropdownToggle
            style={{ height: '48px' }}
            className='d-flex align-items-center px-2'
          >
            <p className=' m-0'>Env</p>{' '}
            <FontAwesomeIcon className='ms-4' icon={faAngleDown} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Select Enviroment</DropdownItem>
            {envItem.length === 0 ? (
              <></>
            ) : (
              <>
                {envItem.map(m => (
                  <DropdownItem>{m}</DropdownItem>
                ))}
                <DropdownItem>delete</DropdownItem>
              </>
            )}
            <DropdownItem
              className='dropdown-item-new'
              onClick={handleModalEnv}
            >
              <FontAwesomeIcon className='me-2' icon={faPlus} />
              Save New Enviroment
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input
          className='w-50'
          value={ip}
          onChange={e => setIp(e.target.value)}
        />
        <div className=' bg-dark d-flex align-items-center rounded'>
          <FontAwesomeIcon className='ms-3' icon={faServer} />
          <p className='mb-0 mx-2 fs-6'>Server Address</p>
        </div>
        <div className='ms-5 h-100 d-flex align-items-center justify-content-center'>
          <Button
            style={{ width: '46px', height: '46px', background: '#40ff00' }}
            className=' d-flex justify-content-center align-items-center  rounded-circle'
            onClick={handleClick}
          >
            <FontAwesomeIcon className='ms-1' icon={faPlay} />
          </Button>
        </div>
        <Modal toggle={toggleModal} isOpen={modal}>
          <ModalHeader>Set Enviroment Name</ModalHeader>
          <ModalBody>
            <Input onChange={e => setEnvName(e.target.value)} />
            <div className='d-flex justify-content-end'>
              <Button
                onClick={addEnv}
                className='me-2 mt-2 bg-primary border-primary'
              >
                Ok
              </Button>
              <Button
                className='mt-2 btn-danger'
                onClick={() => setModal(!modal)}
              >
                Cancel
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </CardHeader>
    </>
  );
};

export default Header;
