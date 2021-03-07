import React, { useEffect, useState } from "react";
import axios from "axios";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useAuth } from "../../context/auth";

import { SERVER_ADDRESS } from "../../constants/constants";
import { Redirect } from "react-router";

const ManageUser = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [roles, setRoles] = useState([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState();
  const [submitForm, setSubmitForm] = useState(false);
  const { authToken } = useAuth();

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + "get-roles", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((roles) => {
        setRoles(roles.data);
        setUserRole(roles.data[0].id);
      });
  }, [props.selectedUser, authToken]);

  const rolesToDisplay = roles.map((role) => {
    return (
      <option value={role.id} key={role.id + role.roleName}>
        {role.roleName}
      </option>
    );
  });

  const onSubmitHandler = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("not valid");
      event.preventDefault();
      event.stopPropagation();
    } else {
      const data = new FormData();
      data.append("firstName", userFirstName);
      data.append("lastName", userLastName);
      data.append("email", userEmail);
      data.append("password", userPassword);
      data.append("role", userRole);
      await axios
        .post(SERVER_ADDRESS + "create-user", data, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            event.preventDefault();
            event.stopPropagation();
          }
          return response.data;
        })
        .then((user) => {
          setCurrentUser(user);
          setSubmitForm(true);
        })
        .catch((err) => console.log(err));
    }
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

  const onRoleChangeHandler = (id) => {
    setUserRole(id);
  };

  return (
    <Container fluid style={{ height: 100 + "%" }}>
      {submitForm ? <Redirect to="/browse-topics" /> : null}
      <Row>
        <Col lg={12}>
          <Form>
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
                <Form.Group className="required">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    onChange={onUserEmailChangeHandler}
                    value={userEmail}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Form.Group className="required">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    id="current-password"
                    onChange={onUserPasswordChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    id="role"
                    style={{ display: "inline" }}
                    onChange={(event) =>
                      onRoleChangeHandler(event.target.value)
                    }
                  >
                    {rolesToDisplay}
                  </Form.Control>
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
                  type="button"
                  onClick={onSubmitHandler}
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
