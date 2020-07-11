import { Chip, withStyles, Theme } from '@material-ui/core';

const cardStyles = (theme: Theme) => ({
  root: {
    background: theme.palette.secondary.main,
  },
  label: {
    color: theme.palette.primary.main,
  },
});
export default withStyles(cardStyles)(Chip);
