import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  Table as List,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  CircularProgress,
} from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import TableFetching from './TableFetching';
import TableEmpty from './TempleEmpty';
import FetchingButton from '../../../components/FetchingButton';
import { client, errorHandle } from '../../../client';

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

const Table = ({addButton, link, array}) => {
  const classes = useStyle();
  const snackbar = useSnackbar();
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState(true);
  const [requestIndex, setRequestIndex] = useState(false);
  const [state, setState] = useState({
    [array]: [],
    total: 0,
  });

  const fetchData = () => {
    client.get(`/${link}`)
      .then(response => {
        const data = response.data[array];
        const total = response.data.total;
        state[array] = data;
        state.total = total;
        setState({ ...state });
        setRequest(false);
      }).catch(error => {
      errorHandle(error, snackbar);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changePage = (event, page) => {
    setPage(page);
  };

  const deleteItem = (event, index) => {
    setRequestIndex(index);
    const item = state[array][index];
    client.delete(`/${link}`, {
      params: {
        id: index,
      },
    }).then(() => {
      setRequestIndex(false);
      fetchData();
      snackbar.enqueueSnackbar(`${item.title} has benn deleted`, {
        variant: 'success',
      });
    }).catch(error => {
      setRequestIndex(false);
      errorHandle(error);
    })
  };

  return (
    <React.Fragment>
      <Button
        component={RouteLink}
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
            {request
              ? <TableFetching name={classes.name} actionsWrapper={classes.actionsWrapper}/>
              : (
                state[array].length > 0
                  ? (
                    state[array].map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className={classes.name} scope="row">
                          <Link component={RouteLink} to={`/${link}/${index}`}>{item.title}</Link>
                        </TableCell>
                        <TableCell align="right">
                          <Grid className={classes.actionsWrapper}>
                            <Button
                              disabled={request || requestIndex === index}
                              component={RouteLink}
                              to={`/admin/${link}/${index}`}
                            >
                              Edit
                            </Button>
                            <FetchingButton
                              color='secondary'
                              disabled={request}
                              fallback={<CircularProgress color='secondary' size={21}/>}
                              fetching={requestIndex === index}
                              onClick={event => deleteItem(event, index)}
                            >
                              Delete
                            </FetchingButton>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableEmpty/>
                  )
              )}
          </TableBody>
        </List>
      </TableContainer>
      {state.total > 1
      && (
        <Pagination
          count={state.total}
          defaultPage={6}
          siblingCount={1}
          boundaryCount={2}
          className={classes.pagination}
          onChange={changePage}
          page={page}
        />
      )}
    </React.Fragment>
  );
};

export default Table;
