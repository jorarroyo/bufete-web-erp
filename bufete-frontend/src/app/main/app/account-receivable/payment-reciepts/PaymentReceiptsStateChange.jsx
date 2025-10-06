import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StateChangeDialog from 'app/main/shared/StateChangeDialog';
import { AppId } from 'app/constants/appConstant';
import * as Actions from '../store/actions/payment-receipts';

const PaymentReceiptsStateChange = () => {
  const dispatch = useDispatch();
  const changeStatusDialog = useSelector(({ paymentReceiptsApp }) => paymentReceiptsApp.paymentReceipts.changeStatusDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeChangeStatusPaymentReceiptDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updatePaymentReceiptState(formDialog));
    closeComposeDialog();
  }

  return (
    <StateChangeDialog
      stateChangeDialog={changeStatusDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado Recibo Factura"
      handleSubmitDialog={handleSubmit}
      appId={AppId.RECIBO_FACTURA}
    />
  );
};

export default PaymentReceiptsStateChange;
