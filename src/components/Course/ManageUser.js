import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";

import { useAuth } from "../../context/auth";

import { SERVER_ADDRESS } from "../../constants/constants";

const ManageUser = (props) => {
  const [currentUser, setCurrentUser] = useState(props.selectedUser);
  const [roles, setRoles] = useState([]);
  const [userFirstName, setUserFirstName] = useState(currentUser.firstName);
  const [userLastName, setUserLastName] = useState(currentUser.lastName);
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [userRole, setUserRole] = useState(currentUser.roleId);
  const [submitForm, setSubmitForm] = useState(false);
  const { authToken } = useAuth();

  useEffect(() => {
    console.log(props.selectedUser);
    setCurrentUser(props.selectedUser);
    axios
      .get(SERVER_ADDRESS + "get-roles", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((roles) => {
        console.log(roles.data);
        setRoles(roles.data);
      });
  }, [props.selectedUser, authToken]);

  useEffect(() => {
    setUserFirstName(currentUser.firstName);
    setUserLastName(currentUser.lastName);
    setUserEmail(currentUser.email);
    setUserRole(currentUser.roleId);
  }, [currentUser]);

  const rolesToDisplay = roles.map((role) => {
    return (
      <option
        key={role.id + role.roleName}
        value={role.id}
        selected={role.id === userRole ? true : false}
      >
        {role.roleName}
      </option>
    );
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = new FormData();
    data.append("userId", currentUser.id);
    data.append("firstName", userFirstName);
    data.append("lastName", userLastName);
    data.append("email", userEmail);
    data.append("password", userPassword);
    data.append("role", userRole);
    console.log('role '+userRole);
    axios
      .post(SERVER_ADDRESS + "save-user", data, {
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
        props.updateUsers(true);
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

  const onRoleChangeHandler = (id) => {
    setUserRole(id);
  };

  const roleDefaultValue = () => {
    return roles.find((r) => r.id.toString() === userRole).roleName;
  };

  return (
    <Container fluid style={{ height: 100 + "%" }}>
      {submitForm ? <Redirect to="/users" /> : null}
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
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
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
                    required
                    as="select"
                    id="role"
                    style={{ display: "inline" }}
                    onChange={(event) =>
                      onRoleChangeHandler(event.target.value)
                    }
                    defaultValue={roleDefaultValue}
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
                  type="submit"
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
