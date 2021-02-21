import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Router, Route, Switch } from 'react-router-dom';
import history from './history'

import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthContext } from "./context/auth";

import Course from './components/Course/Course';
import Login from './components/Auth/Login';
import TopicBrowser from './components/Course/TopicBrowser';



const App = props => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const existingToken =localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(existingToken);
  const existingAuthLevel =localStorage.getItem("authLevel");
  const [authLevel, setAuthLevel] = useState(existingAuthLevel);

  const setTokens = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const setLevel = (data) =>{
    console.log('++++++++++++++', data);
    localStorage.setItem("authLevel", data);
    setAuthLevel(data);
  }

  return (
    <AuthContext.Provider value={{authToken, setAuthToken: setTokens, authLevel, setAuthLevel: setLevel}}>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Course}/>
          <PrivateRoute exact path="/browse-topics" component={TopicBrowser}/>
           <Route path="/login">
            <Login/>
          </Route>
          
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
};

export default App;
