import React from 'react';
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Body from './subright-component/Body';
import Header from './subright-component/Header';
const SubRight = () => {
  return (
    <>
      <Nav className='ms-3' tabs>
        <NavItem>
          <NavLink active>New Tab</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab='1'>
        <TabPane tabId='1'>
          <Card>
            <Header />
            <Body />
          </Card>
        </TabPane>
      </TabContent>
    </>
  );
};

export default SubRight;
