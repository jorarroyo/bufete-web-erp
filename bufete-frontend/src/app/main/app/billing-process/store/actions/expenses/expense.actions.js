import { statusName } from 'app/constants/appConstant';
import ExpenseServices from 'app/services/billing-process/expensesServices';
import notificationHandler from 'app/utils/errorHandler';
import helperFunctions from 'app/utils/helperFunc';
import {
  GET_EXPENSE_FAILURE,
  GET_EXPENSE_INIT_REQUEST,
  GET_EXPENSE_SUCCESS,
  NEW_EXPENSE,
  SAVE_EXPENSE_FAILURE,
  SAVE_EXPENSE_INIT_REQUEST,
  SAVE_EXPENSE_SUCCESS,
} from '../../types/expenses/expense.types';

export function newExpense() {
  return {
    type: NEW_EXPENSE,
    payload: {
      id: '',
      expenses_date: '',
      expenses_type: '',
      expenses_num: '',
      provider_id: '',
      provider_name: '',
      concept_id: '',
      concept_name: '',
      status: statusName.ELABORADO,
      exchange_rate: '',
      expenses_currency: '',
      expenses_total: '',
      details: [],
    },
  };
}

export function getExpense(expenseId) {
  return dispatch => {
    dispatch({
      type: GET_EXPENSE_INIT_REQUEST,
    });
    ExpenseServices.getExpense('/', expenseId)
      .then(response =>
        dispatch({
          type: GET_EXPENSE_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener el documento de gasto', 'error');
        dispatch({
          type: GET_EXPENSE_FAILURE,
        });
      });
  };
}

export function createExpense(form, expenseDetail) {
  return dispatch => {
    dispatch({
      type: SAVE_EXPENSE_INIT_REQUEST,
    });
    const request = {
      id: form.id,
      expenses_date: helperFunctions.reFormatDate(form.expenses_date),
      expenses_type: form.expenses_type,
      expenses_num: form.expenses_num,
      provider_id: form.provider_id,
      concept_id: form.concept_id,
      status: form.status,
      exchange_rate: form.exchange_rate,
      expenses_currency: form.expenses_currency,
      expenses_total: form.expenses_total,
      details: expenseDetail,
    };
    ExpenseServices.postExpense('', request)
      .then(response => dispatch({ type: SAVE_EXPENSE_SUCCESS, payload: response }))
      .then(() => notificationHandler.successMessage(dispatch, 'Documento de Gasto almacenado con éxito!!!'))
      .catch(({ response }) => {
        notificationHandler.infoMessage(dispatch, response.data.message || 'error al crear el documento de gastos', 'error');
        dispatch({
          type: SAVE_EXPENSE_FAILURE,
        });
      });
  };
}
