import React, { lazy} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Suspense from './components/Suspense';

//routes
import Login from './auth/Login';

const Admin = lazy(() => import('./admin/Admin/Admin'));
const NewProduct = lazy(() => import('./admin/NewProduct/NewProduct'));
const NewArticle = lazy(() => import('./admin/NewArticle/NewArticle'));

const Routes = () => (
  <React.Suspense fallback={Suspense}>
    <Switch>
      <PrivateRoute exact path='/admin' component={Admin} />
      <PrivateRoute exact path='/admin/product/new' component={NewProduct} />
      <PrivateRoute exact path='/admin/article/new' component={NewArticle} />
      <Route path='/login' component={Login} />
    </Switch>
  </React.Suspense>
);

export default withRouter(Routes);
