import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
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
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 2),
    },
    '& > p + p': {
      marginTop: theme.spacing(2),
    },
  },
}));