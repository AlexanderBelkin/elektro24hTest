import React from 'react';
import {
  Container,
  Paper,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Button,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import FetchingButton from '../../components/FetchingButton';
import useUploadButton from '../../components/useUploadButton';

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
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    '& > div': {
      position: 'relative',
    },
  },
  previewImg: {
    width: 64,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  uploadWrapper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
}));

const NewProduct = () => {
  const classes = useStyles();
  const { handleSubmit, errors, control } = useForm();
  const { preview, button, fileState } = useUploadButton({
    preview: classes.preview,
    previewImg: classes.previewImg,
    input: classes.input,
    button: classes.button,
    closeButton: classes.closeButton,
  });

  const onSubmit = (values) => {
    console.log(values);
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
            </Grid>
          </Grid>
          <FormControl
            fullWidth
            variant='outlined'
            className={classes.fields}
            error={Boolean(errors.title)}>
            <InputLabel>Title</InputLabel>
            <Controller
              fullWidth
              name='title'
              variant='outlined'
              label='Title'
              defaultValue=''
              control={control}
              as={OutlinedInput}
              rules={{
                required: 'This field is required',
                minLength : {
                  value: 2,
                  message: 'Min length: 2 chars'
                }
              }}
            />
            {errors.title && <FormHelperText>{errors.title.message}</FormHelperText>}
          </FormControl>
          <FormControl
            fullWidth
            variant='outlined'
            className={classes.fields}
            error={Boolean(errors.description)}
          >
            <InputLabel>Description</InputLabel>
            <Controller
              multiline
              fullWidth
              name='description'
              variant='outlined'
              label='Description'
              defaultValue=''
              control={control}
              rows={4}
              as={OutlinedInput}
              rules={{
                required: 'This field is required',
                minLength : {
                  value: 2,
                  message: 'Min length: 2 chars'
                }
              }}
            />
            {errors.description && <FormHelperText>{errors.description.message}</FormHelperText>}
          </FormControl>
          <FormControl
            fullWidth
            variant='outlined'
            className={classes.fields}
            error={Boolean(errors.price)}
          >
            <InputLabel>Price</InputLabel>
            <Controller
              fullWidth
              name='price'
              variant='outlined'
              label='Price'
              defaultValue=''
              control={control}
              as={OutlinedInput}
              rules={{
                required: 'This field is required',
                validate: {
                  number: value => new RegExp(/^\d+$/).test(value) || 'Should be number'
                }
              }}
            />
            {errors.price && <FormHelperText>{errors.price.message}</FormHelperText>}
          </FormControl>
          <Grid container justify='space-between'>
            <Button component={Link} to='/admin'>Back</Button>
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

export default NewProduct;
