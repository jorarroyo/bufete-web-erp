import { AppId } from 'app/constants/appConstant';
import StateChangeDialog from 'app/main/shared/StateChangeDialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/proctor-agenda';

const ProctorAgendaStateChange = () => {
  const dispatch = useDispatch();
  const proctorAgendaDialog = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.proctorAgenda.proctorAgendaDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeEditProctorAgendaDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updateProctorAgendaState(formDialog));
    closeComposeDialog();
  }

  return (
    <StateChangeDialog
      stateChangeDialog={proctorAgendaDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado Agenda"
      handleSubmitDialog={handleSubmit}
      appId={AppId.AGENDA}
    />
  );
};

export default ProctorAgendaStateChange;
