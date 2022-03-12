import React from 'react';
import Header from './subleft-component/Header';
import Body from './subleft-component/Body';
import { Card } from 'reactstrap';
const SubLeft = () => {
  return (
    <>
      <Card className='h-100'>
        <Header />
        <Body />
      </Card>
    </>
  );
};

export default SubLeft;
