import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Label, Navbar, NavbarBrand, NavItem } from 'reactstrap';
const Appbar = () => {
  const linkRef = useRef(null);
  const linkRefBack = useRef(null);
  const [select, setSelect] = useState(true);

  const handleClick = () => {
    setSelect(!select);
    if (select) {
      linkRef.current.click();
    } else {
      linkRefBack.current.click();
    }
  };
  return (
    <>
      <Navbar sticky='top' className='d-flex' expand='md' color='dark' dark>
        <NavbarBrand>
          <Link
            style={{ textDecoration: 'none', color: 'red' }}
            ref={linkRefBack}
            to='/'
          >
            SOMPAIDrpc
          </Link>
        </NavbarBrand>
        <div className='d-flex'>
          <Link ref={linkRef} hidden to='/dataDriven'>
            dataDriven
          </Link>
          <Label className={`text-${select === true ? 'primary' : 'white'}`}>
            Once Invoke
          </Label>
          <div className='form-check form-switch ms-2'>
            <input
              style={{ cursor: 'pointer' }}
              onClick={handleClick}
              className='form-check-input'
              type='checkbox'
              id='flexSwitchCheckDefault'
            />
          </div>
          <Label className={`text-${select === true ? 'white' : 'primary'}`}>
            Data Driven
          </Label>
        </div>
      </Navbar>
    </>
  );
};

export default Appbar;
