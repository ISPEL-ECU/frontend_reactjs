import React, { useState } from "react";

import axios from "axios";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import { useAuth } from "../../context/auth";

import { Redirect } from "react-router-dom";

import {SERVER_ADDRESS} from "../../constants/constants";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [authLevel, setLevel] = useState();
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken, setAuthLevel, setUserId, setUserName } = useAuth();

  const onLoginHandler = () => {
    axios
      .post(SERVER_ADDRESS+"login", null, {
        params: { email: email, password: password },
      })
      .then((resData) => {
        if (resData.status === 200) {
          
          setAuthToken(resData.data.token);
          setAuthLevel(resData.data.authLevel);
          setUserId(resData.data.userId);
          setUserName(resData.data.userName);
          setLevel(resData.data.authLevel);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/browse-topics" />;
  }

  return (
    <Container fluid style={{ height: 100 + "%" }}>
      
      <Navbar />
      <Container className="text-center">
        <Row>
          <Col
            sm={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            class="mx-auto"
          >
            <Card id="loginCard" style={{ margin: 10 + "px" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onBlur={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onBlur={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={onLoginHandler}>
                    Login
                  </Button>
                </Form>
                {isError && (
                  <div>The username or password provided were incorrect!</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;
