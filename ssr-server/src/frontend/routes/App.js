import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Player from '../containers/Player';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFount from '../containers/NotFount';

const App = ({ user }) => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={user.id ? Home : Login} />
        <Route exact path='/player/:id/' component={user.id ? Player : Login} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/register/' component={Register} />
        <Route component={NotFount} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
