import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const PostFetching = ({classes}) => (
  [0,1,2,3].map(item => (
    <Grid item xs={12} sm={6} md={4} key={item}>
      <Card className={classes.root}>
        <CardActionArea>
          <Skeleton variant='rect' width='100%' height={140}/>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              <Skeleton variant='text'/>
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              <Skeleton variant='text'/>
              <Skeleton variant='text'/>
              <Skeleton variant='text' width='35%'/>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button disabled size='small' color='primary'>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))
);

export default PostFetching;
