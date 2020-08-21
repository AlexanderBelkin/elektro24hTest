import React, { lazy} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Suspense from './commonComponents/Suspense';
import AdminPage from './admin/AdminPage';

//routes
import Login from './auth/Login';
import NotFound from './errors/NotFound';
const MainController = lazy(() => import('./main/MainController'));

const Routes = () => (
  <React.Suspense fallback={<Suspense/>}>
    <Switch>
      <Route exact path='/' component={MainController} />
      <Route path='/404' component={NotFound} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/admin' component={AdminPage} />
      <Route exact path='/:page' component={MainController} />
    </Switch>
  </React.Suspense>
);

export default withRouter(Routes);
