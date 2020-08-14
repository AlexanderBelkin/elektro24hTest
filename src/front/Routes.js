import React, { lazy} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Suspense from './commonComponents/Suspense';

//routes
import Login from './auth/Login';
import NotFound from './errors/NotFound';
const Admin = lazy(() => import('./admin/Admin').then(module => ({ default: module.Admin })));
const NewProduct = lazy(() => import('./admin/NewProduct').then(module => ({ default: module.NewProduct })));
const NewArticle = lazy(() => import('./admin/NewArticle').then(module => ({ default: module.NewArticle })));
const MainController = lazy(() => import('./main/MainController'));

const Routes = () => (
  <React.Suspense fallback={<Suspense/>}>
    <Switch>
      <Route exact path='/' component={MainController} />
      <Route path='/404' component={NotFound} />
      <Route path='/login' component={Login} />
      <PrivateRoute exact path='/admin/product/new' component={NewProduct} />
      <PrivateRoute exact path='/admin/article/new' component={NewArticle} />
      <PrivateRoute exact path='/admin/product/:id' component={NewProduct} />
      <PrivateRoute exact path='/admin/article/:id' component={NewArticle} />
      <PrivateRoute exact path='/admin' component={Admin} />
      <Route exact path='/:page' component={MainController} />
    </Switch>
  </React.Suspense>
);

export default withRouter(Routes);
