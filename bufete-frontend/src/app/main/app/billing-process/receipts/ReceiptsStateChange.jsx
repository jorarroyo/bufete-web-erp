import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StateChangeDialog from 'app/main/shared/StateChangeDialog';
import { AppId, statusName } from 'app/constants/appConstant';
import * as Actions from '../store/actions/receipts';

const ReceiptsStateChange = () => {
  const dispatch = useDispatch();
  const changeStatusDialog = useSelector(({ receiptsApp }) => receiptsApp.receipts.changeStatusDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeChangeStatusReceiptDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updateReceiptState(formDialog));
    closeComposeDialog();
  }

  return (
    <StateChangeDialog
      stateChangeDialog={changeStatusDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado Factura"
      handleSubmitDialog={handleSubmit}
      appId={AppId.FACTURACION}
      alert={{
        severity: 'warning',
        title: 'Anulación de Factura',
        message: 'Debe agregar un comentario al anular la factura',
      }}
      excludeList={[statusName.IMPRESO]}
    />
  );
};

export default ReceiptsStateChange;
