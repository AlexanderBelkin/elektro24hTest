import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  progress: {
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}));

const Suspense = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.progress} size={100}/>
}

export default Suspense;
