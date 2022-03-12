import React, { useState } from 'react';
import {
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Button,
} from 'reactstrap';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faServer,
  faAngleDown,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  const [dDownOpen, setDDownOpen] = useState(false);
  const toggle = () => setDDownOpen(!dDownOpen);
  return (
    <>
      <CardHeader className='card-header-sub d-flex'>
        <Dropdown
          toggle={toggle}
          isOpen={dDownOpen}
          onClick={() => setDDownOpen(!dDownOpen)}
        >
          <DropdownToggle className='d-flex align-items-center'>
            <p className=' m-0'>Env</p>{' '}
            <FontAwesomeIcon className='ms-4' icon={faAngleDown} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Select Enviroment</DropdownItem>
            <DropdownItem className='dropdown-item-new'>
              <FontAwesomeIcon className='me-2' icon={faPlus} />
              Save New Enviroment
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input className='w-50' />
        <div className=' bg-dark d-flex align-items-center rounded'>
          <FontAwesomeIcon className='ms-3' icon={faServer} />
          <p className='mb-0 mx-2 fs-6'>Server Address</p>
        </div>
        <div className='ms-5 h-100 d-flex align-items-center justify-content-center'>
          <Button
            style={{ width: '46px', height: '46px', background: '#40ff00' }}
            className=' d-flex justify-content-center align-items-center  rounded-circle'
          >
            <FontAwesomeIcon className='ms-1' icon={faPlay} />
          </Button>
        </div>
      </CardHeader>
    </>
  );
};

export default Header;
