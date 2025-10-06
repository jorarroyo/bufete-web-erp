import { AppId } from 'app/constants/appConstant';
import StateChangeDialog from 'app/main/shared/StateChangeDialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/records';

const RecordFileStateChange = () => {
  const dispatch = useDispatch();
  const recordFileDialog = useSelector(({ recordsApp }) => recordsApp.records.caseRecordDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeChangeStatusRecordDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updateRecordState(formDialog));
    closeComposeDialog();
  }

  return (
    <StateChangeDialog
      stateChangeDialog={recordFileDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado Expediente"
      handleSubmitDialog={handleSubmit}
      appId={AppId.EXPEDIENTES}
    />
  );
};

export default RecordFileStateChange;
