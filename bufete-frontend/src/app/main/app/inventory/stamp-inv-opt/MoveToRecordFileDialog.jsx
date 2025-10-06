import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { dialogConstants } from 'app/constants/appConstant';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, Toolbar, Typography } from '@material-ui/core';
import SearchRecordFileDialog from 'app/main/shared/recordSearch/SearchRecordFileDialog';
import * as Actions from '../store/actions/stamp-inv-opt';

const initialRecordFile = {
  id: 0,
  name: '',
};

const MoveToRecordFileDialog = () => {
  const dispatch = useDispatch();
  const moveToRecordFileDialog = useSelector(({ stampInvOptApp }) => stampInvOptApp.stampInvOpt.moveToRecordFileDialog);

  const [selectedRecordFile, setSelectedRecordFile] = useState(initialRecordFile);

  // const initDialog = useCallback(() => {
  //   setSelectedRecordFile(initialRecordFile);
  // }, [setSelectedRecordFile]);
  //
  // useEffect(() => {
  //   if (moveToRecordFileDialog.props.open) {
  //     initDialog();
  //   }
  // }, [moveToRecordFileDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeMoveToRecordFileDialog());
  }

  const handleNameSelect = async (itemId, itemName) => {
    setSelectedRecordFile({
      id: itemId,
      name: itemName,
    });
  };

  function canBeSubmitted() {
    return selectedRecordFile.id !== 0 && moveToRecordFileDialog?.data?.id !== selectedRecordFile.id;
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.moveToRecordFile({ id: moveToRecordFileDialog?.data?.request_inv, recordId: selectedRecordFile.id, currentId: moveToRecordFileDialog?.data?.id }));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...moveToRecordFileDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Combinar Expedientes
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex" style={{ justifyContent: 'center', itemAlign: 'center' }}>
            <h1>{`Expediente ${moveToRecordFileDialog?.data?.file_num}`}</h1>
          </div>
          <br />
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">list_alt</Icon>
            </div>
            <SearchRecordFileDialog handleNameSelect={handleNameSelect} labelName={selectedRecordFile.name || ''} searchAll={true} />
          </div>
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!canBeSubmitted()}>
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={closeComposeDialog}>
            Cerrar
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default MoveToRecordFileDialog;
