import React, { useState } from "react";


import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";


import ManageAccount from "./ManageAccount";


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";




function UserBrowser(props) {
 
 
 
  return (
    <div className="App" style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
      <Container className="wrappedContainer" fluid >
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%" }}>
          <Col sm={12} style={{ height: 95 + "%" }}>
             {<ManageAccount/>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserBrowser;
