import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, AppBar, Toolbar, Typography, DialogContent } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import * as Actions from '../store/actions/stamps';
import StampMov from '../stamp-mov/StampMov';

const StampMovDialog = () => {
  const dispatch = useDispatch();
  const stampMovDialog = useSelector(({ stampsApp }) => stampsApp.stamps.stampMovDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeStampMovDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...stampMovDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.LG_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Movimiento de producto
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <StampMov productId={stampMovDialog.data} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default StampMovDialog;
