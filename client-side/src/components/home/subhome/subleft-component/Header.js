import React, { useRef } from 'react';
import { CardHeader, Button,UncontrolledTooltip } from 'reactstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = () => {
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current.click();
  return (
    <>
      <CardHeader className='d-flex justify-content-between'>
        <p className='m-0'>Proto</p>
        <input ref={inputRef} type='file' accept='.proto' hidden />
        <Button
          onClick={handleClick}
          className='d-flex justify-content-center rounded-circle'
          style={{ width: '30px', height: '30px', background: '#40ff00' }}
          id = "ImportProtos"
        >
          {' '}
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <UncontrolledTooltip
          flip
          placement="bottom"
          target="ImportProtos"
          >
          Import protos
          </UncontrolledTooltip>
      </CardHeader>
    </>
  );
};

export default Header;