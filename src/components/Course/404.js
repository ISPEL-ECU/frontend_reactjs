import React from "react";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CourseBuilder(props) {
  return (
    <div className="App" style={{ height: 100 + "%" }}>
      <Container fluid style={{ height: 100 + "%" }}>
        
        <Navbar />
        <Row style={{ height: 95 + "%" }}>
          <Col sm={12} style={{ height: 100 + "%" }}>
            <h1>404. The page you are trying to access could not be found!</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CourseBuilder;
