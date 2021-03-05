import React, { useState } from "react";


import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";


import AddUser from "./AddUser";


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";




function UserBrowser(props) {
  const [selectedUser, setSelectedUser] = useState();
 
 
  return (
    <div className="App" style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
      <Container fluid style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%" }}>
          <Col sm={12} style={{ height: 95 + "%" }}>
             {<AddUser/>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserBrowser;
