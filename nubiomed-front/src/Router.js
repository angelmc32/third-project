import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components for navigation

const Router = () => (
  <Switch>
    <Route exact path="/">
      <h1>Home</h1>
    </Route>
  </Switch>
);

export default Router;