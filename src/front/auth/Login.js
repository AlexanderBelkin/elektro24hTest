import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { client, errorHandle } from '../client';
import { isTokenValid } from '../helper';

import { useStyle } from './SignForm';
import FetchingButton from '../commonComponents/FetchingButton';
import SignForm from './SignForm';
import config from '../../config';

const Login = () => {
  const classes = useStyle();
  const snackbar = useSnackbar();
  const history = useHistory();
  const { control, errors, handleSubmit } = useForm()
  const [redirect, setRedirect] = useState(false);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    setRequest(request);
  }, [request]);

  useEffect(() => {
    if (isTokenValid()) {
      history.push('/admin')
    }
  }, [history]);

  const auth = response => {
    if (isTokenValid(response.token)) {
      localStorage.setItem('token', response.token);
      setRedirect(true);
    } else {
      snackbar.enqueueSnackbar('Server error. Try again', {
        variant: 'error',
      });
    }
  };

  const onSubmit = values => {
    client.post('/auth/login', values)
      .then(response => {
        auth(response.data);
      }).catch(error => {
        errorHandle(error, snackbar);
    })
  };

  return (
    <SignForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          fullWidth
          variant='outlined'
          className={classes.fields}
          error={Boolean(errors.username)}
        >
          <InputLabel>Username</InputLabel>
          <Controller
            fullWidth
            name='username'
            type='text'
            variant='outlined'
            label='Username'
            defaultValue=''
            control={control}
            as={OutlinedInput}
            rules={{
              required: 'This field is required',
              minLength : {
                value: config.validation.user.username.min,
                message: `Min length: ${config.validation.user.username.min} chars`
              },
              maxLength: {
                value: config.validation.user.username.max,
                message: `Min length: ${config.validation.user.username.max} chars`
              },
            }}
          />
          {errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
        </FormControl>
        <FormControl
          fullWidth
          variant='outlined'
          className={classes.fields}
          error={Boolean(errors.password)}
        >
          <InputLabel>Password</InputLabel>
          <Controller
            fullWidth
            name='password'
            type='password'
            variant='outlined'
            label='Password'
            defaultValue=''
            control={control}
            as={OutlinedInput}
            rules={{
              required: 'This field is required',
              minLength : {
                value: config.validation.user.password.min,
                message: `Min length: ${config.validation.user.password.min} chars`
              },
              maxLength: {
                value: config.validation.user.password.max,
                message: `Min length: ${config.validation.user.password.max} chars`
              },
            }}
          />
          {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
        </FormControl>
        <FetchingButton
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          fetching={request}
          fallback={<CircularProgress size={25}/>}
        >
          Sign In
        </FetchingButton>
      </form>
      {redirect && <Redirect to='/admin'/>}
    </SignForm>
  )
}

export default Login;
