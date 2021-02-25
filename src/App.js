import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Router, Route, Switch } from 'react-router-dom';
import history from './history'

import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthContext } from "./context/auth";

import Course from './components/Course/Course';
import Login from './components/Auth/Login';
import TopicBrowser from './components/Course/TopicBrowser';
import CourseBrowser from './components/Course/CourseBrowser';
import AddTopic from './components/Course/Author/AddTopic';



const App = props => {
 
  const existingToken =localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(existingToken);
  const existingAuthLevel =localStorage.getItem("authLevel");
  const [authLevel, setAuthLevel] = useState(existingAuthLevel);
  const existingUserId =localStorage.getItem("userId");
  const [userId, setUserId] = useState(existingUserId);
  

  const setUser = (data) => {
    localStorage.setItem("userId", data);
    setUserId(data);
  }

  const setTokens = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const setLevel = (data) =>{
    localStorage.setItem("authLevel", data);
    setAuthLevel(data);
  }


  return (
    <AuthContext.Provider value={{authToken, setAuthToken: setTokens, authLevel, setAuthLevel: setLevel, userId, setUserId: setUser}}>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Course}/>
          <PrivateRoute exact path="/browse-topics" component={TopicBrowser}/>
          <PrivateRoute exact path="/browse-courses" component={CourseBrowser}/>
          <PrivateRoute exact path="/add-topic" component={AddTopic}/>
           <Route path="/login">
            <Login/>
          </Route>
          
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
};

export default App;
