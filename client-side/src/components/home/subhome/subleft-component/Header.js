import React, { useRef } from 'react';
import { CardHeader, Button, UncontrolledTooltip } from 'reactstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendFile } from '../../../../common/api';
const Header = ({ setProtoRes, setFileName }) => {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = async e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await sendFile(formData);
    localStorage.setItem(
      'fileName',
      formData.get('file').name.replace('.proto', '')
    );
    setFileName(formData.get('file').name);
    setProtoRes(res);
  };
  return (
    <>
      <CardHeader className='d-flex justify-content-between'>
        <p className='m-0'>Proto</p>
        <input
          onChange={handleChange}
          ref={inputRef}
          type='file'
          accept='.proto'
          hidden
        />
        <Button
          onClick={handleClick}
          className='d-flex justify-content-center rounded-circle'
          style={{ width: '30px', height: '30px', background: '#40ff00' }}
          id='ImportProtos'
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <UncontrolledTooltip flip placement='bottom' target='ImportProtos'>
          Import protos
        </UncontrolledTooltip>
      </CardHeader>
    </>
  );
};

export default Header;
