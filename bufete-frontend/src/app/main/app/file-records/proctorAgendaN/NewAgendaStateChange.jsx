import { AppId } from 'app/constants/appConstant';
import StateChangeDialog from 'app/main/shared/StateChangeDialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/proctor-agenda';

const NewAgendaStateChange = () => {
  const dispatch = useDispatch();
  const proctorAgendaDialog = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.agendaDetailDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeEditAgendaDetailDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updateAgendaDetailState(formDialog));
    closeComposeDialog();
  }

  return (
    <StateChangeDialog
      stateChangeDialog={proctorAgendaDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado Actividades"
      handleSubmitDialog={handleSubmit}
      appId={AppId.AGENDA_DETAIL}
    />
  );
};

export default NewAgendaStateChange;
