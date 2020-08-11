import React from 'react';
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import config from '../../../../config';
import { Skeleton } from '@material-ui/lab';

const Fields = ({control, errors, request, state, classes}) => (
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
            defaultValue={state.description || ''}
            control={control}
            rows={4}
            as={OutlinedInput}
            rules={{
              required: 'This field is required',
              minLength : {
                value: config.validation.product.title.min,
                message: `Min length: ${config.validation.product.title.min} chars`
              },
              maxLength: {
                value: config.validation.product.title.max,
                message: `Max length: ${config.validation.product.title.max} chars`
              },
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
            defaultValue={state.price || ''}
            control={control}
            as={OutlinedInput}
            rules={{
              required: 'This field is required',
              minLength : {
                value: config.validation.product.description.min,
                message: `Min length: ${config.validation.product.description.min} chars`
              },
              maxLength: {
                value: config.validation.product.description.max,
                message: `Max length: ${config.validation.product.description.max} chars`
              },
            }}
          />
          {errors.price && <FormHelperText>{errors.price.message}</FormHelperText>}
        </FormControl>
      </React.Fragment>
    )
);

export default Fields;
