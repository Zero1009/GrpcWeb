import React, { useState, useEffect, useRef } from 'react';
import 'jsoneditor-react/es/editor.min.css';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
const EditorJson = ({ message }) => {
  const [reqMes, setReqMes] = useState();

  useEffect(() => {
    setReqMes(message);
  }, [message]);

  const handleChange = e => {};
  return (
    <>
      {message ? (
        <JSONInput
          onChange={handleChange}
          id={message.type}
          theme='dark'
          placeholder={reqMes}
          locale={locale}
          height='550px'
        />
      ) : (
        <p className='text-secondary'>Empty</p>
      )}
    </>
  );
};

export default EditorJson;
