import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  Table as List,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import FetchingButton from '../../../components/FetchingButton';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(theme => ({
  pagination: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  name: {
    width: '100%',
    maxWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  actionsWrapper: {
    whiteSpace: 'nowrap',
  },
}));

const Table = ({addButton, link}) => {
  const classes = useStyle();
  const [page, setPage] = useState(1);

  const changePage = (event, page) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <Button
        component={Link}
        variant='contained'
        color='primary'
        to={`/admin/${link}/new`}
        className={classes.addButton}
      >
        {addButton}
      </Button>
      <TableContainer component={Paper}>
        <List>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[0,1,2,3,4].map((item) => (
              <TableRow key={item}>
                <TableCell className={classes.name} scope="row">Lorem ipsum</TableCell>
                <TableCell align="right">
                  <Grid className={classes.actionsWrapper}>
                    <Button component={Link} to={`/admin/${link}/id`}>Edit</Button>
                    <FetchingButton color='secondary'>Delete</FetchingButton>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </List>
      </TableContainer>
      <Pagination
        count={11}
        defaultPage={6}
        siblingCount={1}
        boundaryCount={2}
        className={classes.pagination}
        onChange={changePage}
        page={page}
      />
    </React.Fragment>
  );
};

export default Table;
