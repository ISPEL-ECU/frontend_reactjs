import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import PrivateRoute from "./components/Auth/PrivateRoute";
import { AuthContext } from "./context/auth";

import Course from "./components/Course/Course";
import Login from "./components/Auth/Login";
import TopicBrowser from "./components/Course/TopicBrowser";
import CourseBrowser from "./components/Course/CourseBrowser";
import AddTopic from "./components/Course/Author/AddTopic";
import Users from "./components/Course/UserBrowser";
import AddUser from "./components/Course/AddUserWraper";
import ManageAccount from "./components/Course/ManageAccountWraper";
import NoMatch from "./components/Course/404";

const App = (props) => {
  const existingToken = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(existingToken);
  const existingAuthLevel = localStorage.getItem("authLevel");
  const [authLevel, setAuthLevel] = useState(existingAuthLevel);
  const existingUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(existingUserId);

  useEffect(() => {
    document.title = "ISPEL";
  }, []);

  const setUser = (data) => {
    localStorage.setItem("userId", data);
    setUserId(data);
  };

  const setTokens = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const setLevel = (data) => {
    localStorage.setItem("authLevel", data);
    setAuthLevel(data);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: setTokens,
        authLevel,
        setAuthLevel: setLevel,
        userId,
        setUserId: setUser,
      }}
    >
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Course} />
          <PrivateRoute exact path="/browse-topics" component={TopicBrowser} />
          <PrivateRoute
            exact
            path="/browse-courses"
            component={CourseBrowser}
          />
           <PrivateRoute exact path="/users" component={Users} />
           <PrivateRoute exact path="/manage-account" component={ManageAccount} />
           <PrivateRoute exact path="/add-user" component={AddUser} />
          <PrivateRoute exact path="/add-topic" component={AddTopic} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
