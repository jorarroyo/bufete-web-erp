import { AppId } from 'app/constants/appConstant';
import StateChangeDialog from 'app/main/app/billing-process/expenses/ExpensesStateChangeDialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/expenses';
const RecordFileStateChange = () => {
  const dispatch = useDispatch();
  const expenseDialog = useSelector(({ expensesApp }) => expensesApp.expenses.caseExpenseDialog);

  function closeComposeDialog() {
    dispatch(Actions.closeChangeStatusExpenseDialog());
  }

  function handleSubmit(formDialog) {
    dispatch(Actions.updateExpenseState(formDialog));
    closeComposeDialog();
  }

  return (
    <StateChangeDialog
      stateChangeDialog={expenseDialog}
      closeComposeDialog={closeComposeDialog}
      dialogTitle="Cambio de estado Gasto"
      handleSubmitDialog={handleSubmit}
      appId={AppId.DOCUMENTO_GASTO}
    />
  );
};

export default RecordFileStateChange;
