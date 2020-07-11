import { Avatar, withStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
    marginRight: '1rem',
  },
});
export default withStyles(styles)(Avatar);
