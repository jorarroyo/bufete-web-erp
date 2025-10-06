import PaymentReceiptServices from 'app/services/billing-process/paymentReceiptServices';
import notificationHandler from 'app/utils/errorHandler';
import {
  CHANGE_PAYMENT_RECEIPT_STATUS_FAILURE,
  CHANGE_PAYMENT_RECEIPT_STATUS_INIT,
  CHANGE_PAYMENT_RECEIPT_STATUS_SUCCESS,
  CLOSE_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG,
  GET_PAYMENT_RECEIPTS_FAILURE,
  GET_PAYMENT_RECEIPTS_INIT_REQUEST,
  GET_PAYMENT_RECEIPTS_SUCCESS,
  OPEN_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG,
  SET_PAYMENT_RECEIPT_SEARCH_TEXT,
} from '../../types/payment-receipts/payment-receipts.types';

export function getPagedPayments(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_PAYMENT_RECEIPTS_INIT_REQUEST,
    });
    PaymentReceiptServices.getAllPaymentReceipts(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_PAYMENT_RECEIPTS_SUCCESS,
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
          type: GET_PAYMENT_RECEIPTS_FAILURE,
        });
      });
  };
}

export function setPaymentReceiptSearchText(event) {
  return {
    type: SET_PAYMENT_RECEIPT_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openChangeStatusPaymentReceiptDialog(id, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG,
    data: {
      id,
      prevStatus,
    },
  };
}

export function closeChangeStatusPaymentReceiptDialog() {
  return {
    type: CLOSE_CHANGE_STATE_PAYMENT_RECEIPT_DIALOG,
  };
}

export function updatePaymentReceiptState(form) {
  const request = {
    id: form.id,
    comment: form.comment,
    status: form.next_status,
    serial_number: form.serial_number,
    invoice_series_id: form.invoice_series_id,
  };
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_PAYMENT_RECEIPT_STATUS_INIT,
    });
    const { routeParams, searchText } = getState().paymentReceiptsApp.paymentReceipts;
    PaymentReceiptServices.patchPaymentReceipt('', request)
      .then(() => dispatch({ type: CHANGE_PAYMENT_RECEIPT_STATUS_SUCCESS }))
      .then(() => dispatch(closeChangeStatusPaymentReceiptDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cambio de estado con éxito!!!');
        dispatch(getPagedPayments(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
        dispatch({
          type: CHANGE_PAYMENT_RECEIPT_STATUS_FAILURE,
        });
      });
  };
}
