import React, { useEffect, useState } from 'react';
import PostFetching from './PostFetching';
import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { client, errorHandle } from '../client';
import { makeStyles } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    margin: '0 auto',
  },
  media: {
    height: 140,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const PostWrapper = ({Post, postType}) => {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const [request, setRequest] = useState(true);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPosts = page => {
    client.get(`/${postType}`, {
      params: {
        page: page || 1,
      },
    }).then(response => {
      const posts = response.data;
      setResponse(posts);
      setRequest(false);
    }).catch(error => {
      errorHandle(error, snackbar);
    });
  };

  useEffect(() => {
    setRequest(true);
    fetchPosts(page);
  }, [page]);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  return (
    <Grid container spacing={3}>
      {request
        ? (
          <PostFetching classes={classes}/>
        ) : (
          response.posts.length > 0
            ? (
              response.posts.map((post, index) => (
                <Post post={post} key={index} classes={classes}/>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant='h5' align='center'>No posts yet</Typography>
              </Grid>
            )
        )}
      {response.total > 1
      && (
        <Grid item xs={12}>
          <Pagination
            count={response.total}
            siblingCount={1}
            boundaryCount={2}
            onChange={handleChangePage}
            className={classes.pagination}
            page={page}
          />
        </Grid>
      )}
    </Grid>
  )
};

export default PostWrapper;
