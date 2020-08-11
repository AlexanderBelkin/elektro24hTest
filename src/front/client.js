import axios from 'axios';
import config from '../config';
import { isArray } from 'lodash';

export const client = axios.create({
  baseURL: `${config.baseUrl}:${config.port}/api`,
});

export const errorHandle = (error, snackbar) => {
  if (error.response) {
    const data = error.response.data;
    if (data.hasOwnProperty('errors')) {
      if (isArray(data.errors)) {
        data.errors.forEach(error => {
          snackbar.enqueueSnackbar(error.msg, {
            variant: 'error',
          });
        });
      } else {
        snackbar.enqueueSnackbar(data.errors.message, {
          variant: 'error',
        });
      }
    }
  } else if (error.request) {
    snackbar.enqueueSnackbar('Server does not answer . Try again later', {
      variant: 'error',
    });
  } else {
    snackbar.enqueueSnackbar('Unhandled error. Contact with support, please', {
      variant: 'error',
    });
  }
};
