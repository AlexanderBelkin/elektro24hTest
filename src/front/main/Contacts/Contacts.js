import React from 'react';
import { Paper, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  contacts: {
    padding: theme.spacing(2),
  },
  mapOuter: {
    position: 'relative',
    textAlign: 'right',
    height: 500,
    width: '100%',
  },
  canvas: {
    overflow: 'hidden',
    background: 'none',
    height: 500,
    width: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%'
  },
}));

export const Contacts = () => {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.contacts}>
        <Typography variant='body1'>Tel: +1-123-123</Typography>
        <Typography variant='body1'>Email: email@domain.com</Typography>
      </div>
      <div className={classes.mapOuter}>
        <div className={classes.canvas}>
          <iframe
            className={classes.iframe}
            src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          /></div>
      </div>
    </Paper>
  );
};
