import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useAuth } from "../../context/auth";

import { SERVER_ADDRESS } from "../../constants/constants";
import { Redirect } from "react-router";

const ManageUser = (props) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState();

  const { authToken, setUserName } = useAuth();
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
     axios
      .get(SERVER_ADDRESS + "get-user", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserFirstName(response.data.firstName);
          setUserLastName(response.data.lastName);
          setUserEmail(response.data.email);
        }
      });
  }, [props.selectedUser, authToken]);

  const onSubmitHandler =  (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData();
    data.append("firstName", userFirstName);
    data.append("lastName", userLastName);
    if (userPassword.length > 1) data.append("password", userPassword);

     axios
      .post(SERVER_ADDRESS + "save-account", data, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((response) => {
        console.log('response');
        console.log(response);
        if (response.status !== 200) {
          event.preventDefault();
          event.stopPropagation();
        }
        setUserName(userFirstName+' '+userLastName);
        return response.data;
      })
      .then(() => {
        
        setSubmitForm(true);
      })
      .catch((err) => console.log(err));
  };

  const onUserNameChangeHandler = (event) => {
    setUserFirstName(event.target.value);
  };
  const onUserLastNameChangeHandler = (event) => {
    setUserLastName(event.target.value);
  };

  const onUserEmailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const onUserPasswordChangeHandler = (event) => {
    setUserPassword(event.target.value);
  };

  return (
    <Container className="wrappedContainer" fluid >
      {submitForm ? <Redirect to="/browse-topics" /> : null}
      <Row>
        <Col lg={12}>
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col sm={4}>
                <Form.Group className="required">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="userFirstName"
                    onChange={onUserNameChangeHandler}
                    value={userFirstName}
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group key="topicNameInputGroup" className="required">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="userLastName"
                    onChange={onUserLastNameChangeHandler}
                    value={userLastName}
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    readOnly
                    value={userEmail}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="current-password"
                    onChange={onUserPasswordChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="asterix-caption">
                indicates required fields
              </Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row className="justify-content-md-right">
              <Col sm={10} className="float-right">
                <Button
                  type="submit"
                
                  variant="primary"
                  size="lg"
                  className="float-right"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageUser;
