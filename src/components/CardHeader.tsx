import { CardHeader, withStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
  title: {
    color: 'white',
  },
});
export default withStyles(styles)(CardHeader);
