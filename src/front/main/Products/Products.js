import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Chip,
} from '@material-ui/core';

export const Products = ({post, classes}) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={post.images[0]}
          title={post.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {post.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {`${post.description.slice(0, 120)}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary'>
          Learn More
        </Button>
        <Chip label={`$ ${post.price}`} color='primary' size='small' />
      </CardActions>
    </Card>
  </Grid>
);
