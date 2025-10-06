import { ReceiptSettleEnumType, ReceiptSettlementType, statusName } from 'app/constants/appConstant';
import ReceiptSettlementServices from 'app/services/billing-process/receiptSettlementServices';
import notificationHandler from 'app/utils/errorHandler';
import {
  CLOSE_CREATE_RECEIPT_SETTLEMENT_DIALOG,
  CREATE_RECEIPT_SETTLEMENT,
  DELETE_RECEIPT_SETTLEMENT,
  GET_FEES_RECEIPT_SETTLEMENT_FAILURE,
  GET_FEES_RECEIPT_SETTLEMENT_INIT_REQUEST,
  GET_FEES_RECEIPT_SETTLEMENT_SUCCESS,
  GET_RECEIPT_SETTLEMENT_FAILURE,
  GET_RECEIPT_SETTLEMENT_INIT_REQUEST,
  GET_RECEIPT_SETTLEMENT_SUCCESS,
  NEW_RECEIPT_SETTLEMENT,
  OPEN_CREATE_RECEIPT_SETTLEMENT_DIALOG,
  OPEN_EDIT_RECEIPT_SETTLEMENT_DIALOG,
  SAVE_RECEIPT_SETTLEMENT_FAILURE,
  SAVE_RECEIPT_SETTLEMENT_INIT_REQUEST,
  SAVE_RECEIPT_SETTLEMENT_SUCCESS,
} from '../../types/receipt-settlements/receipt-settlement.types';

export function newReceiptSettlement() {
  return {
    type: NEW_RECEIPT_SETTLEMENT,
    payload: {
      id: null,
      client_id: '',
      client_name: '',
      status: statusName.ELABORADO,
      receipt_total: 0,
      type: ReceiptSettleEnumType.LIQUIDACION,
      attorney_fees_list: [],
      activity_fees_list: [],
      stamps_fees_list: [],
      expenses_fees_list: [],
      receipt_settlement_detail: [],
    },
  };
}

export function getReceiptSettlement(id) {
  if (!id) return null;
  return dispatch => {
    dispatch({
      type: GET_RECEIPT_SETTLEMENT_INIT_REQUEST,
    });
    ReceiptSettlementServices.getReceiptSettlement('/', id)
      .then(response =>
        dispatch({
          type: GET_RECEIPT_SETTLEMENT_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener la liquidación de factura', 'error');
        dispatch({
          type: GET_RECEIPT_SETTLEMENT_FAILURE,
        });
      });
  };
}

export function createReceiptSettlement(form, detail, option) {
  return dispatch => {
    if (form.client_id === '') {
      notificationHandler.infoMessage(dispatch, 'Debe seleccionar un cliente', 'warning');
      return;
    }
    dispatch({
      type: SAVE_RECEIPT_SETTLEMENT_INIT_REQUEST,
    });
    const request = {
      id: form.id,
      client_id: form.client_id,
      status: form.status,
      receipt_total: form.receipt_total,
      type: ReceiptSettleEnumType.LIQUIDACION,
      attorney_fees_list: form.attorney_fees_list,
      activity_fees_list: form.activity_fees_list,
      stamps_fees_list: form.stamps_fees_list,
      expenses_fees_list: form.expenses_fees_list,
      receipt_settlement_detail: detail.map(d => ({
        ...d,
        id: typeof d.id === 'string' ? null : d.id,
      })),
    };
    ReceiptSettlementServices.postReceiptSettlement(option, request)
      .then(response =>
        dispatch({
          type: SAVE_RECEIPT_SETTLEMENT_SUCCESS,
          payload: response,
        })
      )
      .then(() => notificationHandler.successMessage(dispatch, 'Liquidación de factura almacenado con éxito!!!'))
      .catch(({ response }) => {
        notificationHandler.infoMessage(dispatch, response.data.message || 'error al crear la Liquidación de factura', 'error');
        dispatch({
          type: SAVE_RECEIPT_SETTLEMENT_FAILURE,
        });
      });
  };
}

export function getFeesReceiptSettlement(id, settlementId) {
  return dispatch => {
    dispatch({
      type: GET_FEES_RECEIPT_SETTLEMENT_INIT_REQUEST,
    });
    ReceiptSettlementServices.getReceiptSettlement('/fees/', `${id}/${settlementId || -1}`)
      .then(response =>
        dispatch({
          type: GET_FEES_RECEIPT_SETTLEMENT_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener la información de cobros', 'error');
        dispatch({
          type: GET_FEES_RECEIPT_SETTLEMENT_FAILURE,
        });
      });
  };
}

export function openReceiptSettleLineDialog(id) {
  return dispatch => {
    dispatch({
      type: OPEN_CREATE_RECEIPT_SETTLEMENT_DIALOG,
      payload: id,
    });
  };
}

export function closeReceiptSettleLineDialog() {
  return {
    type: CLOSE_CREATE_RECEIPT_SETTLEMENT_DIALOG,
  };
}

export function openEditReceiptSettleLineDialog(id) {
  return (dispatch, getState) => {
    const { receiptSettlementDetail } = getState().receiptSettleApp.receiptSettlement;
    const receiptLine = receiptSettlementDetail.find(s => s.id === id);
    dispatch({
      type: OPEN_EDIT_RECEIPT_SETTLEMENT_DIALOG,
      payload: receiptLine,
    });
  };
}

export function deleteReceiptSettleLine(id) {
  return (dispatch, getState) => {
    const { receiptSettlementDetail } = getState().receiptSettleApp.receiptSettlement;
    const receiptLine = receiptSettlementDetail.find(s => s.id === id);
    receiptLine.status = statusName.ELIMINADO;
    dispatch({
      type: DELETE_RECEIPT_SETTLEMENT,
      payload: receiptLine,
    });
  };
}

export function createReceiptSettlementLine(entity) {
  return (dispatch, getState) => {
    if (Number(entity.cost_detail) < Number(entity.discount)) {
      notificationHandler.infoMessage(dispatch, 'El descuento debe ser menor al monto', 'warning');
      return;
    }
    const { receiptSettlementDetail } = getState().receiptSettleApp.receiptSettlement;
    const receiptLine = receiptSettlementDetail.find(s => s.id === entity.id);
    const newReceiptLine = {
      ...receiptLine,
      id: entity.id,
      comment: entity.comment,
      object_type: entity.object_type,
      activity_time: Number(entity.activity_time),
      cost_per_hour: Number(entity.cost_per_hour),
      exchange_value: Number(entity.exchange_value),
      cost_detail: Number(entity.cost_detail),
      discount: Number(entity.discount),
      discount_type: entity.discount_type,
      use_isr: entity.use_isr,
      use_iva: entity.use_iva,
      use_billing: entity.use_billing,
      total: calcTotalRow(entity), // TODO: queda pendiente el calculo del ISR
      status: entity.status,
      advance_balance: entity.advance_balance,
    };
    dispatch({
      type: CREATE_RECEIPT_SETTLEMENT,
      payload: newReceiptLine,
    });
  };
}

function calcTotalRow(row) {
  let subtotal =
    row.object_type === ReceiptSettlementType.HONORARIOS
      ? (row.activity_time * (row.exchange_value * row.cost_per_hour)) / 60
      : Number(row.cost_detail);

  const iva = subtotal * (row.use_iva ? 0.12 : 0);
  const isr = subtotal <= 30000 ? subtotal * 0.05 : 1500 + (subtotal - 30000) * 0.07;
  subtotal = subtotal + iva + (row.use_isr ? isr : 0);
  return subtotal - Number(row.discount);
}
