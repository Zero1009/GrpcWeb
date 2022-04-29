import React, { useContext } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { FileContext } from '../../DataDriven';

const Result = () => {
  const fileContext = useContext(FileContext);
  return (
    <Card className='h-100'>
      <CardHeader>Result</CardHeader>
      <CardBody>
        {fileContext.files.response
          ? fileContext.files.response.map(item => item)
          : ''}
      </CardBody>
    </Card>
  );
};

export default Result;
