import React, { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";

import Navbar from "react-bootstrap/esm/Navbar";

import { useAuth } from "../../context/auth";

const TopNavbar = (props) => {
  const { authToken, setAuthToken } = useAuth();
  const { authLevel, setAuthLevel } = useAuth();
  const { setUserId } = useAuth();
  const { userName } = useAuth();
  const [currentUser, setCurrentUser] = useState(userName);

  function logOut() {
    setAuthToken();
    setAuthLevel();
    setUserId();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("authLevel");
  }

  useEffect(() => {
    console.log("name is " + userName);
    setCurrentUser(userName);
  }, [userName]);
  const RenderMenuItems = () => {
    if (authToken) {
      if (parseInt(authLevel) === 1) {
        return (
          <Nav
            className="topMenuNav"
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            <NavDropdown
              title="Authoring"
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              <NavDropdown.Item href="/add-topic">Add topic</NavDropdown.Item>
              <NavDropdown.Item href="/create-course">
                Create PeLDS course
              </NavDropdown.Item>
              <NavDropdown.Item href="/create-excourse">
                Create ExLDS course
              </NavDropdown.Item>
              <NavDropdown.Item href="/manage-topics">
                Manage topics
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/browse-topics">View topics</Nav.Link>
            <Nav.Link href="/browse-courses">PeLDS courses</Nav.Link>
            <Nav.Link href="/browse-excourses">ExLDS courses</Nav.Link>
            <NavDropdown title="Admin">
              <NavDropdown.Item href="/add-user">Add user</NavDropdown.Item>
              <NavDropdown.Item href="/users">Manage users</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/manage-account">{currentUser}</Nav.Link>
            <Nav.Link href="#" onClick={logOut}>
              Logout
            </Nav.Link>
          </Nav>
        );
      }
    }
    if (parseInt(authLevel) < 3) {
      return (
        <Nav
          style={{
            paddingLeft: "5rem",
            color: "#FFFFFF",
            fontWeight: "bold",
            paddingRight: 0,
          }}
        >
          <NavDropdown
            title="Authoring"
            style={{
              paddingLeft: "5rem",
              color: "#FFFFFF",
              fontWeight: "bold",
              paddingRight: 0,
            }}
          >
            <NavDropdown.Item href="/add-topic">Add topic</NavDropdown.Item>
            <NavDropdown.Item href="/create-course">
              Create PeLDS course
            </NavDropdown.Item>
            <NavDropdown.Item href="/create-excourse">
              Create ExLDS course
            </NavDropdown.Item>
            <NavDropdown.Item href="/manage-topics">
              Manage topics
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            href="/browse-topics"
            style={{
              paddingLeft: "5rem",
              color: "#FFFFFF",
              fontWeight: "bold",
              paddingRight: 0,
            }}
          >
            View topics
          </Nav.Link>
          <Nav.Link href="/browse-courses">PeLDS courses</Nav.Link>
          <Nav.Link href="/browse-excourses">ExLDS courses</Nav.Link>
          <Nav.Link href="/manage-account">{currentUser}</Nav.Link>
          <Nav.Link href="#" onClick={logOut}>
            Logout
          </Nav.Link>
        </Nav>
      );
    }
    return (
      <Nav>
        <Nav.Link href="/browse-topics">View topics</Nav.Link>
        <Nav.Link href="/browse-courses">PeLDS courses</Nav.Link>
        <Nav.Link href="/browse-excourses">ExLDS courses</Nav.Link>
        <Nav.Link href="/manage-account">{currentUser}</Nav.Link>
        <Nav.Link href="/login" >
          Login
        </Nav.Link>
      </Nav>
    );
  };

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand
        style={{
          paddingLeft: "5rem",
          color: "#FFFFFF",
          fontWeight: "bold",
          paddingRight: 0,
        }}
      >
        ISPEL
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <RenderMenuItems />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;
