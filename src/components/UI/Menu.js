import React from "react";

import { slide as Menu } from "react-burger-menu";

import { useAuth } from "../../context/auth";

const SideNav = (props) => {
  const { authToken, setAuthToken } = useAuth();
  const { authLevel, setAuthLevel } = useAuth();
  const { setUserId } = useAuth();

  function logOut() {
    setAuthToken();
    setAuthLevel();
    setUserId();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("authLevel");
  }

  const AuthorizedMenu = () => {
    if (authToken) {
      if (parseInt(authLevel) === 1) {
        return (
          <Menu>
            <a id="addTopic" className="menu-item" href="/add-topic">
              Add topic
            </a>
            <a id="createCourse" className="menu-item" href="/">
              Create course
            </a>
            <a id="topics" className="menu-item" href="/browse-topics">
              View topics
            </a>
            <a id="courses" className="menu-item" href="/browse-courses">
              View courses
            </a>
            <hr />
            <a id="admin" className="menu-item" href="/add-user">
              Add user
            </a>
            <a id="admin" className="menu-item" href="/users">
              Manage users
            </a>
            <hr />
            <a id="account" className="menu-item" href="/manage-account">
              Manage Account
            </a>
            <a id="logout" className="menu-item" href="#" onClick={logOut}>
              Logout
            </a>
          </Menu>
        );
      }

      if (parseInt(authLevel) < 3) {
        return (
          <Menu>
            <a id="addTopic" className="menu-item" href="/add-topic">
              Add topic
            </a>
            <a id="createCourse" className="menu-item" href="/">
              Create course
            </a>
            <a id="topics" className="menu-item" href="/browse-topics">
              View topics
            </a>
            <a id="courses" className="menu-item" href="/browse-courses">
              View courses
            </a>
            <hr />
            <a id="account" className="menu-item" href="/manage-account">
              Manage Account
            </a>
            <a id="logout" className="menu-item" href="#" onClick={logOut}>
              Logout
            </a>
          </Menu>
        );
      }
      return (
        <Menu>
          <a id="topics" className="menu-item" href="/browse-topics">
            View topics
          </a>
          <a id="courses" className="menu-item" href="/browse-courses">
            View courses
          </a>
          <hr />
          <a id="account" className="menu-item" href="/manage-account">
            Manage Account
          </a>
          <a id="logout" className="menu-item" href="#" onClick={logOut}>
            Logout
          </a>
        </Menu>
      );
    }
    return (
      <Menu>
        <a id="login" className="menu-item" href="/login">
          Login
        </a>
      </Menu>
    );
  };

  return <AuthorizedMenu />;
};

export default SideNav;
