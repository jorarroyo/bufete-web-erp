import { statusName } from 'app/constants/appConstant';
import notificationHandler from 'app/utils/errorHandler';
import RecordServices from 'app/services/file-records/recordsService';
import {
  SET_INITIAL_DATA,
  OPEN_CREATE_EXPENSE_DETAILS_DIALOG,
  CLOSE_CREATE_EXPENSE_DETAILS_DIALOG,
  OPEN_EDIT_EXPENSE_DETAILS_DIALOG,
  DELETE_EXPENSE_DETAILS,
  CREATE_EXPENSE_DETAILS,
  OPEN_BULK_EXPENSE_DETAILS_DIALOG,
  CLOSE_BULK_EXPENSE_DETAILS_DIALOG,
  GET_FILE_RECORDS_BY_TIMEFRAME,
  GET_FILE_RECORDS_BY_TIMEFRAME_FAILURE,
  GET_FILE_RECORDS_BY_TIMEFRAME_SUCCESS,
} from '../../types/expenses/expenses-detail.types';

export function setInitialData(expenseDetailsList) {
  return dispatch => {
    dispatch({
      type: SET_INITIAL_DATA,
      payload: expenseDetailsList,
    });
  };
}

export function openBulkExpenseDetailsDialog(id) {
  return dispatch => {
    dispatch({
      type: OPEN_BULK_EXPENSE_DETAILS_DIALOG,
      payload: id,
    });
  };
}

export function closeBulkExpenseDetailsDialog() {
  return {
    type: CLOSE_BULK_EXPENSE_DETAILS_DIALOG,
  };
}

export function openExpenseDetailsDialog(id) {
  return dispatch => {
    dispatch({
      type: OPEN_CREATE_EXPENSE_DETAILS_DIALOG,
      payload: id,
    });
  };
}

export function closeExpenseDetailsDialog() {
  return {
    type: CLOSE_CREATE_EXPENSE_DETAILS_DIALOG,
  };
}

export function openEditExpenseDetailsDialog(id) {
  return (dispatch, getState) => {
    const { data } = getState().expensesApp.expense;
    const expenseDetail = data.details.find(s => s.id === id);
    dispatch({
      type: OPEN_EDIT_EXPENSE_DETAILS_DIALOG,
      payload: expenseDetail,
    });
  };
}

export function deleteExpenseDetails(id) {
  return (dispatch, getState) => {
    const { data } = getState().expensesApp.expense;
    const expenseDetail = data.details.find(s => s.id === id);
    expenseDetail.status = statusName.ELIMINADO;
    dispatch({
      type: DELETE_EXPENSE_DETAILS,
      payload: expenseDetail,
    });
  };
}

export function createExpenseDetails(expenseDetailsEntity) {
  return (dispatch, getState) => {
    const { data, entityData } = getState().expensesApp.expense;
    const expenseDetail = data.details.find(s => s.id === expenseDetailsEntity.id);
    const newExpenseDetail = {
      ...expenseDetail,
      ...entityData,
      id: expenseDetailsEntity.id,
      file_record_id: expenseDetailsEntity.file_record_id,
      record_file_name: expenseDetailsEntity.record_file_name,
      record_client_name: expenseDetailsEntity.record_client_name,
      status: statusName.ELABORADO,
      expense_value: expenseDetailsEntity.expense_value,
    };
    dispatch({
      type: CREATE_EXPENSE_DETAILS,
      payload: newExpenseDetail,
    });
  };
}

export function getFileRecordsByTimeFrame(timeframe) {
  return dispatch => {
    dispatch({
      type: GET_FILE_RECORDS_BY_TIMEFRAME,
    });
    RecordServices.getRecordFile('/record-search/', timeframe)
      .then(response =>
        dispatch({
          type: GET_FILE_RECORDS_BY_TIMEFRAME_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener los expedientes', 'error');
        dispatch({
          type: GET_FILE_RECORDS_BY_TIMEFRAME_FAILURE,
        });
      });
  };
}
