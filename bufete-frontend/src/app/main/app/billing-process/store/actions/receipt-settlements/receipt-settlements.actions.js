import ReceiptSettlementServices from 'app/services/billing-process/receiptSettlementServices';
import notificationHandler from 'app/utils/errorHandler';
import {
  CHANGE_RECEIPT_SETTLEMENTS_STATUS_FAILURE,
  CHANGE_RECEIPT_SETTLEMENTS_STATUS_INIT,
  CHANGE_RECEIPT_SETTLEMENTS_STATUS_SUCCESS,
  CLOSE_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG,
  CLOSE_REPORT_RECEIPT_SETTLEMENTS_DIALOG,
  GET_RECEIPT_SETTLEMENTS_FAILURE,
  GET_RECEIPT_SETTLEMENTS_INIT_REQUEST,
  GET_RECEIPT_SETTLEMENTS_SUCCESS,
  GET_REPORT_RECEIPT_SETTLEMENT_FAILURE,
  GET_REPORT_RECEIPT_SETTLEMENT_INIT_REQUEST,
  GET_REPORT_RECEIPT_SETTLEMENT_SUCCESS,
  OPEN_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG,
  OPEN_REPORT_RECEIPT_SETTLEMENTS_DIALOG,
  SET_RECEIPT_SETTLEMENTS_SEARCH_TEXT,
} from '../../types/receipt-settlements/receipt-settlements.types';

export function getPagedReceiptSettlements(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_RECEIPT_SETTLEMENTS_INIT_REQUEST,
    });
    ReceiptSettlementServices.getAllReceiptSettlements(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_RECEIPT_SETTLEMENTS_SUCCESS,
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
          type: GET_RECEIPT_SETTLEMENTS_FAILURE,
        });
      });
  };
}

export function setReceiptSettlementSearchText(event) {
  return {
    type: SET_RECEIPT_SETTLEMENTS_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openChangeStatusReceiptSettleDialog(id, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG,
    data: {
      id,
      prevStatus,
    },
  };
}

export function closeChangeStatusReceiptSettleDialog() {
  return {
    type: CLOSE_CHANGE_STATE_RECEIPT_SETTLEMENTS_DIALOG,
  };
}

export function updateReceiptSettleState(form) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_RECEIPT_SETTLEMENTS_STATUS_INIT,
    });
    const { routeParams, searchText } = getState().receiptSettleApp.receiptSettlements;
    const request = {
      id: form.id,
      comment: form.comment,
      status: form.next_status,
    };
    ReceiptSettlementServices.patchReceiptSettlement('', request)
      .then(() => dispatch(closeChangeStatusReceiptSettleDialog()))
      .then(() => dispatch({ type: CHANGE_RECEIPT_SETTLEMENTS_STATUS_SUCCESS }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cambio de estado con éxito!!!');
        dispatch(getPagedReceiptSettlements(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
        dispatch({
          type: CHANGE_RECEIPT_SETTLEMENTS_STATUS_FAILURE,
        });
      });
  };
}

export function openReportReceiptSettleDialog(id) {
  return dispatch => {
    ReceiptSettlementServices.getReceiptSettlement('/report/', id)
      .then(response => dispatch({ type: OPEN_REPORT_RECEIPT_SETTLEMENTS_DIALOG, data: response }))
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar generar el reporte', 'error');
      });
  };
}

export function closeReportReceiptSettleDialog() {
  return {
    type: CLOSE_REPORT_RECEIPT_SETTLEMENTS_DIALOG,
  };
}

export function getReceiptSettleReport(form) {
  return dispatch => {
    dispatch({
      type: GET_REPORT_RECEIPT_SETTLEMENT_INIT_REQUEST,
    });
    ReceiptSettlementServices.postReceiptSettlement('/report', form)
      .then(response => {
        notificationHandler.infoMessage(dispatch, 'Datos del reporte actualizados!!', 'success');
        dispatch({ type: GET_REPORT_RECEIPT_SETTLEMENT_SUCCESS, data: response });
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener los datos del reporte', 'error');
        dispatch({
          type: GET_REPORT_RECEIPT_SETTLEMENT_FAILURE,
        });
      });
  };
}
