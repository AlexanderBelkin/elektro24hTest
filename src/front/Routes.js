import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//routes
import Login from './auth/Login';
import Admin from './admin/Admin';

const Routes = () => (
  <Switch>
    <PrivateRoute exact path='/admin' component={Admin} />
    <Route path='/login' component={Login} />
  </Switch>
);

export default withRouter(Routes);
