import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import SearchRecordFileDialog from 'app/main/shared/recordSearch/SearchRecordFileDialog';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions/case-activities';

const defaultFormState = {
  id: '',
  file_record_id: '',
  file_num: '',
};

const CaseActRecordUpdate = () => {
  const dispatch = useDispatch();
  const changeRecordDialog = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.changeRecordDialog);
  const { form, setForm, setInForm } = useForm(defaultFormState);
  const [currentRecord, setCurrentRecord] = useState('');

  const initDialog = useCallback(() => {
    if (changeRecordDialog.type === 'edit' && changeRecordDialog.data) {
      setForm(changeRecordDialog.data);
    }
    if (changeRecordDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...changeRecordDialog.data,
      });
    }
    setCurrentRecord(changeRecordDialog.data.file_record_id);
  }, [changeRecordDialog.data, changeRecordDialog.type, setForm, setCurrentRecord]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (changeRecordDialog.props.open) {
      initDialog();
    }
  }, [changeRecordDialog.props.open, initDialog]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(Actions.updateRecordCaseActivity({ ...form, current_id: currentRecord }, changeRecordDialog.receiptSettleType));
  }

  function canBeSubmitted() {
    if (form) {
      return currentRecord !== form.file_record_id;
    }
    return false;
  }

  function closeComposeDialog() {
    dispatch(Actions.closeChangeRecordActivityDialog());
  }

  const handleSelect = itemId => {
    setInForm('file_record_id', itemId);
  };

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...changeRecordDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Reasignación de Expediente
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">record_voice_over</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Expendiente"
              id="file_num"
              name="file_num"
              value={form.file_num}
              variant="outlined"
              fullWidth
              disabled
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">list_alt</Icon>
            </div>
            <SearchRecordFileDialog handleSelect={handleSelect} labelName={form.file_num || ''} />
          </div>
        </DialogContent>

        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Reasignar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CaseActRecordUpdate;
