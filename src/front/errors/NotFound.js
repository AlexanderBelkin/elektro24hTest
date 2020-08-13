import React from 'react';
import {
  Typography,
  Link,
} from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';

const NotFound = () => (
  <React.Fragment>
    <Typography variant='h5'>Page not found</Typography>
    <Link component={RouteLink} to='/'>Go main</Link>
  </React.Fragment>
);

export default NotFound
