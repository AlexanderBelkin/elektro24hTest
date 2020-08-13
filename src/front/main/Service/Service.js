import React from 'react';
import {
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 0),
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'lighter',
  },
  description: {
    padding: theme.spacing(0, 2),
    '& > p + p': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const Service = () => {
  const classes = useStyles();
  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.titleWrapper}>
          <Typography variant='h3' className={classes.title}>
            Service
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.description}>
          <Typography variant='body2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut neque vehicula, rutrum ligula nec,
            lobortis nunc. Mauris at ultrices nisi. Sed lacinia leo ac justo rhoncus tempor. Suspendisse potenti. Cras
            venenatis ex libero, id imperdiet est pulvinar facilisis.
          </Typography>
          <Typography variant='body2'>
            Donec in lorem placerat, scelerisque turpis at, tristique odio. Quisque gravida ante sit amet rhoncus
            pulvinar. Mauris varius libero vitae faucibus consectetur. Quisque eleifend, sapien nec fermentum efficitur,
            augue quam euismod nulla, in consectetur enim risus a massa.
          </Typography>
          <Typography variant='body2'>
            Fusce sollicitudin, ante nec gravida finibus, dui nunc eleifend massa, sit amet ullamcorper ligula felis
            vitae quam. Aliquam id ullamcorper purus. Nulla consectetur erat a dui convallis cursus. Quisque et
            fringilla velit. Pellentesque mollis at tortor ut interdum.
          </Typography>
          <Typography variant='body2'>
            Quisque rutrum blandit metus, nec sagittis nibh eleifend eget. Nullam viverra nulla at velit faucibus
            interdum. Ut ultrices tempor vestibulum. Phasellus pellentesque ante viverra risus varius, sed consectetur
            velit venenatis.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
};
