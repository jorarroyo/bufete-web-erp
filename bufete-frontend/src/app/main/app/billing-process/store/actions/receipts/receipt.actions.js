import ReceiptServices from 'app/services/billing-process/receiptServices';
import notificationHandler from 'app/utils/errorHandler';
import { ReceiptSettleEnumType, statusName } from 'app/constants/appConstant';
import {
  CLOSE_CREATE_RECEIPT_DIALOG,
  CREATE_RECEIPT,
  DELETE_RECEIPT,
  GET_RECEIPT_FAILURE,
  GET_RECEIPT_INIT_REQUEST,
  GET_RECEIPT_SUCCESS,
  NEW_RECEIPT,
  OPEN_CREATE_RECEIPT_DIALOG,
  OPEN_EDIT_RECEIPT_DIALOG,
  SAVE_RECEIPT_FAILURE,
  SAVE_RECEIPT_INIT_REQUEST,
  SAVE_RECEIPT_SUCCESS,
} from '../../types/receipts/receipt.types';

export function newReceipt() {
  return {
    type: NEW_RECEIPT,
    payload: {
      id: null,
      receipt_settlement_id: null,
      client_id: '',
      client_name: '',
      client_address: '',
      client_nit: '',
      receipt_address_id: '',
      currency_id: '',
      receipt_date: new Date(),
      status: statusName.EN_EDICION,
      object_type: ReceiptSettleEnumType.LIBRE,
      receipt_total: 0,
      receipt_total_discount: 0,
      exchange_rate: 1,
      is_one_time_client: false,
      details: [],
    },
  };
}

export function getReceipt(id) {
  return dispatch => {
    dispatch({
      type: GET_RECEIPT_INIT_REQUEST,
    });
    ReceiptServices.getReceipt('/', id)
      .then(response =>
        dispatch({
          type: GET_RECEIPT_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener la factura', 'error');
        dispatch({
          type: GET_RECEIPT_FAILURE,
        });
      });
  };
}

export function createReceipt(form, detail) {
  const totals = detail
    .filter(f => f.status === statusName.ACTIVO)
    .reduce(
      (total, curr) => ({
        amount: total.amount + curr.line_amount,
        discount: total.discount + curr.line_discount,
        total: total.total + curr.line_total,
      }),
      {
        amount: 0,
        discount: 0,
        total: 0,
      }
    );
  return dispatch => {
    dispatch({
      type: SAVE_RECEIPT_INIT_REQUEST,
    });
    const request = {
      id: form.id,
      receipt_settlement_id: form.receipt_settlement_id,
      client_id: form.client_id,
      receipt_address_id: form.receipt_address_id,
      receipt_date: form.receipt_date,
      status: form.status,
      receipt_total: Math.round(totals.total * 100) / 100,
      receipt_iva: Math.round((totals.total - totals.total / 1.12) * 100) / 100,
      exchange_rate: form.exchange_rate,
      currency_id: form.currency_id,
      receipt_total_discount: Math.round(totals.discount * 100) / 100,
      object_type: form.object_type,
      is_one_time_client: form.is_one_time_client,
      one_time_client: !form.is_one_time_client
        ? null
        : {
            id: form.client_id,
            name: form.client_name,
            address: form.client_address,
            nit: form.client_nit,
          },
      details: detail.map(d => ({
        ...d,
        id: typeof d.id === 'string' ? null : d.id,
      })),
    };
    ReceiptServices.postReceipt('', request)
      .then(response =>
        dispatch({
          type: SAVE_RECEIPT_SUCCESS,
          payload: response,
        })
      )
      .then(() => notificationHandler.successMessage(dispatch, 'Factura almacenado con éxito!!!'))
      .catch(({ response }) => {
        notificationHandler.infoMessage(dispatch, response.data.message || 'error al crear la factura', 'error');
        dispatch({
          type: SAVE_RECEIPT_FAILURE,
        });
      });
  };
}

export function openReceiptLineDialog(isFreeReceipt) {
  return dispatch => {
    dispatch({
      type: OPEN_CREATE_RECEIPT_DIALOG,
      isFreeReceipt,
    });
  };
}

export function closeReceiptLineDialog() {
  return {
    type: CLOSE_CREATE_RECEIPT_DIALOG,
  };
}

export function openEditReceiptLineDialog(id, isFreeReceipt) {
  return (dispatch, getState) => {
    const { receiptDetail } = getState().receiptApp.receipt;
    const receiptLine = receiptDetail.find(s => s.id === id);
    dispatch({
      type: OPEN_EDIT_RECEIPT_DIALOG,
      payload: receiptLine,
      isFreeReceipt,
    });
  };
}

export function deleteReceiptLine(id) {
  return (dispatch, getState) => {
    const { receiptDetail } = getState().receiptApp.receipt;
    const receiptLine = receiptDetail.find(s => s.id === id);
    receiptLine.status = statusName.ELIMINADO;
    dispatch({
      type: DELETE_RECEIPT,
      payload: receiptLine,
    });
  };
}

export function createReceiptLine(entity, isFreeReceipt) {
  return (dispatch, getState) => {
    if (Number(entity.line_amount) < Number(entity.line_discount)) {
      notificationHandler.infoMessage(dispatch, 'El descuento debe ser menor al monto', 'warning');
      return;
    }
    const { receiptDetail } = getState().receiptApp.receipt;
    const receiptLine = receiptDetail.find(s => s.id === entity.id);
    const newReceiptLine = {
      ...receiptLine,
      id: entity.id,
      description: entity.description,
      line_amount: Number(entity.line_amount),
      line_discount: Number(entity.line_discount),
      line_total: calcTotalRow(entity, isFreeReceipt),
      use_isr: entity.use_isr,
      use_iva: entity.use_iva,
      status: entity.status,
    };
    dispatch({
      type: CREATE_RECEIPT,
      payload: newReceiptLine,
    });
  };
}

function calcTotalRow(row, isFreeReceipt) {
  if (!isFreeReceipt && typeof row.id !== 'string') {
    return Number(row.line_total);
  }
  const iva = Number(row.line_amount) * (row.use_iva ? 0.12 : 0);
  let isr = Number(row.line_amount) <= 30000 ? Number(row.line_amount) * 0.05 : 1500 + (Number(row.line_amount) - 30000) * 0.07;
  isr = row.use_isr ? isr : 0.0;
  return Number(row.line_amount) + iva + isr - Number(row.line_discount);
}
