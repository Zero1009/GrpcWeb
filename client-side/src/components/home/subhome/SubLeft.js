import React, { useState } from 'react';
import Header from './subleft-component/Header';
import Body from './subleft-component/Body';
import { Card } from 'reactstrap';
const SubLeft = () => {
  const [protoRes, setProtoRes] = useState(null);
  const [fileName, setFileName] = useState(null);
  return (
    <>
      <Card className='h-100'>
        <Header setProtoRes={setProtoRes} setFileName={setFileName} />
        <Body protoRes={protoRes} fileName={fileName} setFileName={setFileName} />
      </Card>
    </>
  );
};

export default SubLeft;
