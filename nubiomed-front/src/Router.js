import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from '~components/auth/Signup';

// Import Components for navigation

const Router = () => (
  <Switch>
    <Route exact path="/">
      <h1>Home</h1>
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
  </Switch>
);

export default Router;