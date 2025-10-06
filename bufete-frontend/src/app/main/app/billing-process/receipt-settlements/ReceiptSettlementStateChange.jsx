import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StateChangeDialog from 'app/main/shared/StateChangeDialog';
import { AppId } from 'app/constants/appConstant';
import * as Actions from '../store/actions/receipt-settlements';

const ReceiptSettlementStatusChange = () => {
  const dispatch = useDispatch();
  const changeStatusDialog = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlements.changeStatusDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeChangeStatusReceiptSettleDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updateReceiptSettleState(formDialog));
    closeComposeDialog();
  }

  return (
    <StateChangeDialog
      stateChangeDialog={changeStatusDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado Liquidación"
      handleSubmitDialog={handleSubmit}
      appId={AppId.LIQUIDACION_FACTURA}
    />
  );
};

export default ReceiptSettlementStatusChange;
