import React, { useContext, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Label } from 'reactstrap';
import { FileContext } from '../../DataDriven';
import { callGrpc } from '../../../../common/api';
const InvokeGrpc = () => {
  const fileContext = useContext(FileContext);
  const [ip, setIp] = useState(null);

  const handleClick = async () => {
    let body = { messages: [] };
    body.methodName = fileContext.files.method;
    body.fileName = fileContext.files.fileProto.name.replace('.proto', '');
    body.packageName = fileContext.files.protoRes.packageName;
    body.serviceName = fileContext.files.protoRes.serviceName;
    body.target = ip;
    body.messages = JSON.parse(JSON.stringify(fileContext.files.xcelContent));
    const res = await callGrpc(body);
    fileContext.setFiles({ ...fileContext.files, response: res });
  };

  const handleChange = e => {
    setIp(e.target.value);
  };
  return (
    <Card className='h-100'>
      <CardHeader align='center'>Invoke</CardHeader>
      <CardBody className='border'>
        <Label>Enter IP</Label>
        <Input onChange={handleChange} value={ip} />
        <p>
          {fileContext.files ? (
            <>Method: {fileContext.files.method}</>
          ) : (
            <>Method: Not select</>
          )}
        </p>
        <Button onClick={handleClick}>Invoke</Button>
      </CardBody>
    </Card>
  );
};

export default InvokeGrpc;
