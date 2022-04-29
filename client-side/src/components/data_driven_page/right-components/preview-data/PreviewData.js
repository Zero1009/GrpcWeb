import React, { useContext } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { FileContext } from '../../DataDriven';
import EditorJson from './editor/Editor';
const PreviewData = () => {
  const files = useContext(FileContext);
  return (
    <Card className='h-100'>
      <CardHeader align='center'>Preveiw Data</CardHeader>
      <CardBody className='border'>
        <div className=' h-50' style={{ overflow: 'scroll' }}>
          {files.files.messagesTxt
            ? files.files.messagesTxt.map((item, key) => (
                <>
                  <label className='fw-bold text-danger'>{key + 1}: </label>
                  <li style={{ listStyleType: 'none' }}>{item.toString()}</li>
                </>
              ))
            : 'Empty'}
        </div>
      </CardBody>
    </Card>
  );
};

export default PreviewData;
