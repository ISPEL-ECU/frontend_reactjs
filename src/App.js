import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Router,  Switch } from "react-router-dom";
import history from "./history";

import PrivateRoute from "./components/Auth/PrivateRoute";
import NonPrivateRoute from "./components/Auth/NonPrivateRoute";
import { AuthContext } from "./context/auth";

import Course from "./components/Course/Course";
import ExCourse from "./components/Course/ExCourse";
import ExCourseNew from "./components/Course/ExCourseNew";
import Login from "./components/Auth/Login";
import TopicBrowser from "./components/Course/TopicBrowser";
import CourseBrowser from "./components/Course/CourseBrowser";
import ExCourseBrowser from "./components/Course/ExCourseBrowser";
import AddTopic from "./components/Course/Author/AddTopic";
import Users from "./components/Course/UserBrowser";
import AddUser from "./components/Course/AddUserWraper";
import ManageAccount from "./components/Course/ManageAccountWraper";
import Questions from "./components/Course/Questions";
import ViewCourse from "./components/Course/ViewCourse";
import ViewExCourse from "./components/Course/ViewExCourse";
import NoMatch from "./components/Course/404";
import ManageTopic from "./components/Course/ManagTopicWraper";
import AddQuestionBank from "./components/Course/Author/AddQuestionBank";
import AddQuestionToBank from "./components/Course/Author/AddQuestionToBank";
import AddQuestionsToBank from "./components/Course/Author/AddQuestionsToBank";


const App = (props) => {
  const existingToken = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(existingToken);
  const existingAuthLevel = localStorage.getItem("authLevel");
  const [authLevel, setAuthLevel] = useState(existingAuthLevel);
  const existingUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(existingUserId);
  const existingUserName = localStorage.getItem("userName");
  const [userName, setUserName] = useState(existingUserName);

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

  const setName = (data) =>{
    localStorage.setItem("userName", data);
    setUserName(data);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: setTokens,
        authLevel,
        setAuthLevel: setLevel,
        userId,
        setUserId: setUser,
        userName,
        setUserName: setName
      }}
    >
      <Router history={history}>
        <Switch>
          <NonPrivateRoute exact path="/" component={TopicBrowser} />
          <NonPrivateRoute exact path="/browse-topics/:topicId?" component={TopicBrowser} />
          <NonPrivateRoute exact path="/get-questions" component={Questions} />
          <NonPrivateRoute path='/course/:courseId/:topicId?' component={ViewCourse}/>
          <NonPrivateRoute path='/excourse/:courseId' component={ViewExCourse}/>
          <NonPrivateRoute
            exact
            path="/browse-courses"
            component={CourseBrowser}
          />
          <NonPrivateRoute
            exact
            path="/browse-excourses"
            component={ExCourseBrowser}
          />
          <PrivateRoute exact path="/create-course" component={Course} />
          <PrivateRoute exact path="/create-excourse" component={ExCourse} />
          <PrivateRoute exact path="/create-excourse-new" component={ExCourseNew} />
           <PrivateRoute exact path="/users" component={Users} />
           <PrivateRoute exact path="/manage-account" component={ManageAccount} />
           <PrivateRoute exact path="/add-user" component={AddUser} />
          <PrivateRoute exact path="/add-topic" component={AddTopic} />
          <PrivateRoute exact path="/add-questionbank" component={AddQuestionBank} />
          <PrivateRoute exact path="/add-questionstobank" component={AddQuestionsToBank} />
          <PrivateRoute exact path="/add-bankquestion" component={AddQuestionToBank} />
          <PrivateRoute exact path="/manage-topics" component={ManageTopic} />
          <NonPrivateRoute path="/login">
            <Login />
          </NonPrivateRoute>
          <NonPrivateRoute path="*">
            <NoMatch />
          </NonPrivateRoute>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
