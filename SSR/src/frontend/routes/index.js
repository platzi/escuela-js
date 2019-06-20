import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../containers/App'

const Routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
