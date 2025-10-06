import PaymentReceiptServices from 'app/services/billing-process/paymentReceiptServices';
import notificationHandler from 'app/utils/errorHandler';
import { statusName } from 'app/constants/appConstant';
import ReceiptServices from 'app/services/billing-process/receiptServices';
import CodeRain from 'coderain';
import {
  CLOSE_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG,
  CLOSE_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
  CREATE_BALANCE_DETAIL_PAYMENT_RECEIPT,
  CREATE_TRANS_DETAIL_PAYMENT_RECEIPT,
  DELETE_BALANCE_DETAILS_PAYMENT_RECEIPT,
  DELETE_TRANS_DETAIL_PAYMENT_RECEIPT,
  EDIT_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
  GET_PAYMENT_BALANCE_FAILURE,
  GET_PAYMENT_BALANCE_INIT_REQUEST,
  GET_PAYMENT_BALANCE_SUCCESS,
  GET_PAYMENT_RECEIPT_FAILURE,
  GET_PAYMENT_RECEIPT_INIT_REQUEST,
  GET_PAYMENT_RECEIPT_SUCCESS,
  NEW_PAYMENT_RECEIPT,
  OPEN_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG,
  OPEN_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
  SAVE_PAYMENT_RECEIPT_FAILURE,
  SAVE_PAYMENT_RECEIPT_INIT_REQUEST,
  SAVE_PAYMENT_RECEIPT_SUCCESS,
} from '../../types/payment-receipts/payment-receipt.types';

const newTransDetail = {
  id: '',
  bank_id: '',
  transaction_type_id: '',
  status: statusName.ACTIVO,
  doc_number: '',
  total_transaction: 0,
};

export function newPaymentReceipt() {
  return {
    type: NEW_PAYMENT_RECEIPT,
    payload: {
      id: null,
      client_id: null,
      client_name: '',
      payment_date: new Date(),
      currency_id: 1,
      exchange_rate: 1,
      status: statusName.ELABORADO,
      total_payment: Number(0),
      comments: '',
      detail_list: [],
      trans_list: [],
    },
  };
}

export function getPaymentReceipt(id) {
  return dispatch => {
    dispatch({
      type: GET_PAYMENT_RECEIPT_INIT_REQUEST,
    });
    PaymentReceiptServices.getPaymentReceipt('/', id)
      .then(response =>
        dispatch({
          type: GET_PAYMENT_RECEIPT_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener el registro', 'error');
        dispatch({
          type: GET_PAYMENT_RECEIPT_FAILURE,
        });
      });
  };
}

export function createPaymentReceipt(form, detail, transDets) {
  return dispatch => {
    dispatch({
      type: SAVE_PAYMENT_RECEIPT_INIT_REQUEST,
    });
    const request = {
      id: form.id,
      client_id: form.client_id,
      payment_date: form.payment_date,
      status: form.status,
      currency_id: form.currency_id,
      exchange_rate: form.exchange_rate,
      total_payment: form.total_payment,
      comments: form.comments,
      detail_list: detail
        .filter(s => s.balance_status && s.balance_status === statusName.ELABORADO)
        .map(d => ({
          id: typeof d.detail_id === 'string' ? null : d.detail_id,
          receipt_id: d.id,
          payment_balance: d.to_pay,
          status: d.balance_status,
        })),
      transaction_detail_list: transDets
        .filter(s => s.status === statusName.ACTIVO)
        .map(d => ({
          id: typeof d.id === 'string' ? null : d.id,
          bank_id: d.bank_id,
          transaction_type_id: d.transaction_type_id,
          status: d.status,
          doc_number: d.doc_number,
          total_transaction: d.total_transaction,
        })),
    };
    PaymentReceiptServices.postPaymentReceipt('', request)
      .then(response =>
        dispatch({
          type: SAVE_PAYMENT_RECEIPT_SUCCESS,
          payload: response,
        })
      )
      .then(() => notificationHandler.successMessage(dispatch, 'Registro almacenado con éxito!!!'))
      .catch(({ response }) => {
        notificationHandler.infoMessage(dispatch, response.data.message || 'error al crear el registro', 'error');
        dispatch({
          type: SAVE_PAYMENT_RECEIPT_FAILURE,
        });
      });
  };
}

export function openTransDetailsPaymentDialog() {
  return {
    type: OPEN_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
    data: newTransDetail,
  };
}

export function editTransDetailsPaymentDialog(record) {
  return {
    type: EDIT_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
    data: record,
  };
}

export function closeTransDetailsPaymentDialog() {
  return {
    type: CLOSE_TRANS_DETAILS_PAYMENT_RECEIPT_DIALOG,
  };
}

export function deleteTransDetail(id) {
  return (dispatch, getState) => {
    const { transDetails } = getState().paymentReceiptApp.paymentReceipt;
    const transDetailLine = transDetails.find(s => s.id === id);
    transDetailLine.status = statusName.ELIMINADO;
    dispatch({
      type: DELETE_TRANS_DETAIL_PAYMENT_RECEIPT,
      payload: transDetailLine,
    });
  };
}

export function createTransDetail(entity) {
  return (dispatch, getState) => {
    const { transDetails } = getState().paymentReceiptApp.paymentReceipt;
    const transDetailLine = transDetails.find(s => s.id === entity.id);
    const newTransactionDetail = {
      ...transDetailLine,
      id: entity.id,
      bank_id: entity.bank_id,
      bank_name: entity.bank_name,
      transaction_type_id: entity.transaction_type_id,
      transaction_type_name: entity.transaction_type_name,
      status: entity.status,
      doc_number: entity.doc_number,
      total_transaction: entity.total_transaction,
    };
    dispatch({
      type: CREATE_TRANS_DETAIL_PAYMENT_RECEIPT,
      payload: newTransactionDetail,
    });
  };
}

export function getBalanceDetail(clientId, currencyId, paymentId) {
  return dispatch => {
    const urlParams = paymentId
      ? `?clientId=${clientId}&currencyId=${currencyId}&paymentId=${paymentId}`
      : `?clientId=${clientId}&currencyId=${currencyId}`;
    dispatch({
      type: GET_PAYMENT_BALANCE_INIT_REQUEST,
    });
    ReceiptServices.getReceipt('/balance', urlParams)
      .then(response =>
        dispatch({
          type: GET_PAYMENT_BALANCE_SUCCESS,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.infoMessage(dispatch, error.data.message || 'error al obtener las facturas del cliente', 'error');
        dispatch({
          type: GET_PAYMENT_BALANCE_FAILURE,
        });
      });
  };
}

export function openBalanceDetailsPaymentDialog(lineData) {
  return {
    type: OPEN_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG,
    data: lineData,
  };
}

export function closeBalanceDetailsPaymentDialog() {
  return {
    type: CLOSE_BALANCE_DETAILS_PAYMENT_RECEIPT_DIALOG,
  };
}

export function createBalanceDetail(entity) {
  return dispatch => {
    dispatch({
      type: CREATE_BALANCE_DETAIL_PAYMENT_RECEIPT,
      payload: { ...entity, to_pay: Number(entity.to_pay) },
    });
  };
}

export function createBalanceDetailsBulk(toPay, receiptList) {
  const cr = new CodeRain('#####');
  return dispatch => {
    dispatch({
      type: DELETE_BALANCE_DETAILS_PAYMENT_RECEIPT,
    });
    let toPayRemain = toPay;
    if (receiptList && receiptList.length > 0) {
      if (receiptList[0].balance >= toPay) {
        dispatch({
          type: CREATE_BALANCE_DETAIL_PAYMENT_RECEIPT,
          payload: {
            id: receiptList[0].id,
            detail_id: cr.next(),
            balance_status: statusName.ELABORADO,
            to_pay: Number(toPay),
          },
        });
      }
      receiptList.forEach(s => {
        if (toPayRemain > 0) {
          dispatch({
            type: CREATE_BALANCE_DETAIL_PAYMENT_RECEIPT,
            payload: {
              id: s.id,
              detail_id: cr.next(),
              balance_status: statusName.ELABORADO,
              to_pay: s.balance <= toPayRemain ? s.balance : toPayRemain,
            },
          });
          toPayRemain -= s.balance;
        }
      });
    }
  };
}
