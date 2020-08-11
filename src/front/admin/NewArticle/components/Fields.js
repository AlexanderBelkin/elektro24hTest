import React from 'react';
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { Skeleton } from '@material-ui/lab';
import config from '../../../../config';

const Fields = ({control, errors, state, request, classes}) => (
  request
    ? (
      <div className={classes.skeleton}>
        <Skeleton width='100%' variant='text'/>
        <Skeleton width='100%' variant='text'/>
        <Skeleton width='100%' variant='text'/>
      </div>
    ) : (
      <React.Fragment>
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
            defaultValue={state.title || ''}
            control={control}
            as={OutlinedInput}
            rules={{
              required: 'This field is required',
              minLength : {
                value: config.validation.article.title.min,
                message: `Min length: ${config.validation.article.title.min} chars`
              },
              maxLength: {
                value: config.validation.article.title.max,
                message: `Min length: ${config.validation.article.title.max} chars`
              },
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
            defaultValue={state.description || ''}
            control={control}
            rows={4}
            as={OutlinedInput}
            rules={{
              required: 'This field is required',
              minLength : {
                value: config.validation.article.description.min,
                message: `Min length: ${config.validation.article.description.min} chars`
              },
              maxLength: {
                value: config.validation.article.description.max,
                message: `Max length: ${config.validation.article.description.max} chars`
              },
            }}
          />
          {errors.description && <FormHelperText>{errors.description.message}</FormHelperText>}
        </FormControl>
      </React.Fragment>
    )
);

export default Fields;
