import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, AppBar, Toolbar, Typography, DialogContent } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import withReducer from 'app/store/withReducer';
import FileManagerApp from './FileManagerApp';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const FileManagerDialog = () => {
  const dispatch = useDispatch();
  const fileManagerDialog = useSelector(({ fileManagerApp }) => fileManagerApp.files.fileManagerDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeFileManagerDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...fileManagerDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.LG_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Documentos
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <FileManagerApp data={fileManagerDialog} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default withReducer('fileManagerApp', reducer)(FileManagerDialog);
