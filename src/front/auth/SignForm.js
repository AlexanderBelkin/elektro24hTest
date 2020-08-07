import React from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Box,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import {
  LockOutlined
} from '@material-ui/icons';

export const useStyle = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  heart: {
    color: 'red'
  },
}));

const SignForm = ({children}) => {
  const classes = useStyle();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to start
        </Typography>
        {children}
      </div>
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}{new Date().getFullYear()}
          &nbsp;
          <Link color="inherit">
            Elektro24h
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default SignForm;
