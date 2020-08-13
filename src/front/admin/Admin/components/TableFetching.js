import React from 'react';
import { Button, Grid, TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { range } from 'lodash';
import FetchingButton from '../../../commonComponents/FetchingButton';

const TableFetching = ({name, actionsWrapper}) => (
  range(0, 5).map((item, index) => (
    <TableRow key={index}>
      <TableCell className={name} scope="row">
        <Skeleton variant='text' />
      </TableCell>
      <TableCell align="right">
        <Grid className={actionsWrapper}>
          <Button disabled>Edit</Button>
          <FetchingButton disabled color='secondary'>Delete</FetchingButton>
        </Grid>
      </TableCell>
    </TableRow>
  ))
);

export default TableFetching
