import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  loadingWrapper: {
    zIndex: theme.zIndex.modal + 1,
    color: '#fff',
    position: 'fixed',
  },
}));

export default function LoadingComponent(props) {
  const classes = useStyles(props);
  const { loadingRecord } = props;
  return (
    <Backdrop className={classes.loadingWrapper} open={loadingRecord || false}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
