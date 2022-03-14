import React, { useState } from 'react';
import 'jsoneditor-react/es/editor.min.css';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { exapmleData } from './Data';

const EditorJson = ({ parentCallback }) => {
  const a = exapmleData;
  const [body, setBody] = useState(null);
  return (
    <>
      {a === null ? (
        <>Empty</>
      ) : (
        <>
          {' '}
          <Editor
            onChange={async e => {
              setBody(e);
            }}
            value={a}
          />
          {parentCallback(body)}
        </>
      )}
    </>
  );
};

export default EditorJson;
