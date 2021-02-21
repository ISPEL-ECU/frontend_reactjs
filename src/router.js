import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';

const Router = (props) =>{
  return (
  <Switch>
     <Route exact path="/" >
       {console.log('here')}
        <App/>
     </Route>
    <Route path="/create-course" component={App}/>
    </Switch>
  
)};

export default Router;