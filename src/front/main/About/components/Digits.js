import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { teal } from '@material-ui/core/colors';
import Backgroud from '../assets/about-us.png';

const useStyles = makeStyles(theme => ({
  background: {
    objectFit: 'cover',
    objectPosition: 'bottom',
    height: 200,
    width: '100%',
  },
  digits: {
    backgroundColor: teal[50],
    padding: theme.spacing(4, 2),
    display: 'grid',
    gap: '15px',
    gridTemplateColumns: 'repeat(2, auto)',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    },
  },
}));

const Digits = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <img alt='background' src={Backgroud} className={classes.background} />
      </Grid>
      <Grid container className={classes.digits}>
        <Grid container alignItems='center' direction='column'>
          <Typography variant='h4'>8 million +</Typography>
          <Typography variant='body2'>Lorem ipsum dolor</Typography>
        </Grid>
        <Grid container alignItems='center' direction='column'>
          <Typography variant='h4'>500 +</Typography>
          <Typography variant='body2'>Lorem ipsum dolor</Typography>
        </Grid>
        <Grid container alignItems='center' direction='column'>
          <Typography variant='h4'>1 million +</Typography>
          <Typography variant='body2'>Lorem ipsum dolor</Typography>
        </Grid>
        <Grid container alignItems='center' direction='column'>
          <Typography variant='h4'>4.7 / 5</Typography>
          <Typography variant='body2'>Lorem ipsum dolor</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

export default Digits;
