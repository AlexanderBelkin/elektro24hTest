import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenValid } from './helper';

const PrivateRoute = ({component: Component, ...rest}) =>  {
  return(
    isTokenValid()
      ? <Route {...rest} render={props => <Component {...props}/>}/>
      : <Redirect to='/login'/>
  );
}

export default PrivateRoute;
