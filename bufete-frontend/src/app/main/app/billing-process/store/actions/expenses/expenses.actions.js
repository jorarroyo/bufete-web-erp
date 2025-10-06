import ExpenseServices from 'app/services/billing-process/expensesServices';
import notificationHandler from 'app/utils/errorHandler';
import {
  GET_EXPENSES_FAILURE,
  GET_EXPENSES_INIT_REQUEST,
  GET_EXPENSES_SUCCESS,
  SET_EXPENSES_SEARCH_TEXT,
  CLOSE_CHANGE_STATE_DIALOG,
  OPEN_CHANGE_STATE_DIALOG,
  CHANGE_EXPENSE_STATUS_FAILURE,
  CHANGE_EXPENSE_STATUS_INIT,
  CHANGE_EXPENSE_STATUS_SUCCESS,
} from 'app/main/app/billing-process/store/types/expenses/expenses.types';
import ExpensesServices from 'app/services/billing-process/expensesServices';
import {
  closeChangeStatusRecordDialog,
  getRecords
} from 'app/main/app/billing-process/store/actions/expenses';

export function getPagedExpenses(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_EXPENSES_INIT_REQUEST,
    });
    ExpenseServices.getAllExpenses(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_EXPENSES_SUCCESS,
          payload: response,
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos', 'error');
        dispatch({
          type: GET_EXPENSES_FAILURE,
        });
      });
  };
}

export function setExpensesSearchText(event) {
  return {
    type: SET_EXPENSES_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openChangeStatusExpenseDialog(expenseId, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_DIALOG,
    data: {
      id: expenseId,
      prevStatus,
    },
  };
}

export function closeChangeStatusExpenseDialog() {
  return {
    type: CLOSE_CHANGE_STATE_DIALOG,
  };
}

export function updateExpenseState(form) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_EXPENSE_STATUS_INIT,
    });
    const { routeParams, searchText } = getState().expensesApp.expenses;
    const request = {
      id: form.id,
      comment: form.comment,
      status: form.next_status,
    };
    ExpensesServices.patchExpense('', request)
      .then(() => dispatch({ type: CHANGE_EXPENSE_STATUS_SUCCESS }))
      .then(() => dispatch(closeChangeStatusExpenseDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cambio de estado con éxito!!!');
        dispatch(getPagedExpenses(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
        dispatch({
          type: CHANGE_EXPENSE_STATUS_FAILURE,
        });
      });
  };
}