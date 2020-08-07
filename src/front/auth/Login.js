import React, { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Redirect, useHistory } from 'react-router-dom';
import {
  CircularProgress,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { client } from '../client';
import { isTokenValid } from '../helper';

import { useStyle } from './SignForm';
import FetchingButton from '../components/FetchingButton';
import SignForm from './SignForm';
import config from '../../config';

const Login = () => {
  const classes = useStyle();
  const snackbar = useSnackbar();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

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

  const handleSubmit = () => {
    client.post('/auth/login', form)
      .then(response => {
        auth(response.data);
      }).catch(error => {
        const data = error.response.data;
        if (data.hasOwnProperty('errors')) {
          snackbar.enqueueSnackbar(data.message, {
            variant: 'error',
          });
        }
    })
  };

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  };

  return (
    <SignForm>
      <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
        <TextValidator
          variant='outlined'
          margin='normal'
          fullWidth
          id='username'
          label='Username'
          name='username'
          autoFocus
          value={form.username}
          onChange={handleChange}
          validators={[
            'required',
            `minStringLength:${config.validation.user.username.min}`,
            `maxStringLength:${config.validation.user.username.max}`,
          ]}
          errorMessages={[
            'Field is required',
            `Min ${config.validation.user.username.min} chars`,
            `Max ${config.validation.user.username.max} chars`,
          ]}
        />
        <TextValidator
          variant='outlined'
          margin='normal'
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          value={form.password}
          onChange={handleChange}
          validators={[
            'required',
            `minStringLength:${config.validation.user.password.min}`,
            `maxStringLength:${config.validation.user.password.max}`,
          ]}
          errorMessages={[
            'Field is required',
            `Min ${config.validation.user.password.min} chars`,
            `Max ${config.validation.user.password.max} chars`,
          ]}
        />
        <FetchingButton
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          fetching={request}
          fallback={<CircularProgress size={25}/>}
        >
          Sign In
        </FetchingButton>
      </ValidatorForm>
      {
        redirect && <Redirect to='/admin'/>
      }
    </SignForm>
  )
}

export default Login;
