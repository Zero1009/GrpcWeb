import React from 'react';
import 'jsoneditor-react/es/editor.min.css';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { exapmleData } from './Data';
const EditorJson = () => {
  return (
    <>
      <Editor value={exapmleData} />
    </>
  );
};

export default EditorJson;
