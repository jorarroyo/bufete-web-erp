import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StateChangeDialog from 'app/main/shared/StateChangeDialog';
import { AppId } from 'app/constants/appConstant';
import * as Actions from '../store/actions/stamp-inv-opt';

const StampInvOptStateChange = () => {
  const dispatch = useDispatch();
  const changeStatusDialog = useSelector(({ stampInvOptApp }) => stampInvOptApp.stampInvOpt.changeStatusDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeChangeStatusDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updateStampInvState(formDialog));
  }

  return (
    <StateChangeDialog
      stateChangeDialog={changeStatusDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado de solicitud"
      handleSubmitDialog={handleSubmit}
      appId={AppId.INVENTARIO_TIMBRES}
    />
  );
};

export default StampInvOptStateChange;
