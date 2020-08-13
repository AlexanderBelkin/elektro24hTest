import React from 'react';
import {
  Grid,
  Container,
} from '@material-ui/core';
import Table from './components/Table';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(theme => ({
  tableWrapper: {
    padding: theme.spacing(2),
  },
}));

export const Admin = () => {
  const classes = useStyle();
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6} className={classes.tableWrapper}>
          <Table
            addButton='+Article'
            link='article'
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.tableWrapper}>
          <Table
            addButton='+Product'
            link='product'
          />
        </Grid>
      </Grid>
    </Container>
  );
};
