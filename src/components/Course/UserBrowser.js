import React, { useState } from "react";


import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import Users from "./Users";
import ManageUser from "./ManageUser";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";



function UserBrowser(props) {
  const [selectedUser, setSelectedUser] = useState();
 
 
  return (
    <div className="App" style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
      <Container fluid style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%" }}>
          <Col sm={2} style={{ height: 95 + "%" }}>
            <Form style={{ height: 95 + "%" }}>
              <Card style={{ height: 95 + "%" }}>
                <Row>
                </Row>
                <Row style={{ height: 80 + "%" }}>
                  <Users selectedUserHandler = {setSelectedUser}/>
                </Row>
              </Card>
            </Form>
          </Col>

          <Col sm={10} style={{ overflow: "auto" }}>
            {selectedUser? <ManageUser selectedUser={selectedUser}/>:null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserBrowser;
