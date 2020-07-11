import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
  },
});

const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

Wrapper.propTypes = { children: PropTypes.node.isRequired };

export default Wrapper;
