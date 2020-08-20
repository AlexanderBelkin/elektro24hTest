import React, { useEffect, useState } from 'react'
import {
  Button,
  Container, FormHelperText,
  Grid,
  Paper
} from '@material-ui/core';
import { useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import FetchingButton from './FetchingButton';
import useUploadButton from './useUploadButton';
import { client, errorHandle } from '../client';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  fields: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  uploadWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'end',
  },
  skeleton: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}));

const PublishForm = ({Fields, link, onClose}) => {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const history = useHistory();
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  const [state, setState] = useState([]);
  const [request, setRequest] = useState(false);
  const { preview, button, fileState } = useUploadButton({images: state.images});
  const { handleSubmit, errors, control } = useForm();

  useEffect(() => {
    if (id) {
      setRequest(true);
      client.get(`/${link}/${id}`).then(response => {
        setState(response.data);
        setRequest(false);
      }).catch(error => {
        errorHandle(error, snackbar);
      });
    }
  }, [id, link]);

  useEffect(() => {
    setImageError(false);
  }, [preview]);

  const sendData = (link, data) => {
    if (isEmpty(state)) {
      return client.post(link, data);
    } else {
      data.append('id', id);
      return client.patch(link, data);
    }
  };

  const onSubmit = (values) => {
    if (fileState.length === 0) {
      setImageError(true);
    } else {
      const form = new FormData();
      Object.keys(values).forEach(key => {
        form.append(key, values[key]);
      });
      fileState.forEach(file => {
        form.append('images', file);
      });
      sendData(`/${link}`, form).then(() => {
        snackbar.enqueueSnackbar(`${values.title} has been published`, {
          variant: 'success',
        });
        history.go(0);
      }).catch(error => {
        errorHandle(error, snackbar);
      })
    }
  };

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container className={classes.fields}>
            <Grid item xs={6}>
              {preview}
            </Grid>
            <Grid item xs={6} className={classes.uploadWrapper}>
              {button}
              {imageError && <FormHelperText error>Upload images</FormHelperText>}
            </Grid>
          </Grid>
          <Fields classes={classes} state={state} request={request} errors={errors} control={control}/>
          <Grid container justify='space-between'>
            <Button onClick={onClose}>Back</Button>
            <FetchingButton
              type='submit'
              variant='outlined'
              color='primary'
            >
              Publish
            </FetchingButton>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
};

export default PublishForm;
