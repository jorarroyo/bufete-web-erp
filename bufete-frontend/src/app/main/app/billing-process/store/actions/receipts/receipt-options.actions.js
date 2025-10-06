import InvoiceSeriesServices from 'app/services/billing-process/invoiceSeriesServices';
import notificationHandler from 'app/utils/errorHandler';
import ReceiptServices from 'app/services/billing-process/receiptServices';
import {
  CLOSE_INVOICE_SERIES_RECEIPT_DIALOG,
  CLOSE_PREVIEW_RECEIPT_DIALOG,
  INVOICE_SERIES_FAILURE,
  INVOICE_SERIES_INIT_REQUEST,
  OPEN_INVOICE_SERIES_RECEIPT_DIALOG,
  OPEN_PREVIEW_RECEIPT_DIALOG_FAILURE,
  OPEN_PREVIEW_RECEIPT_DIALOG_INIT,
  OPEN_PREVIEW_RECEIPT_DIALOG_SUCCESS,
} from '../../types/receipts/receipt-options.types';

export function openInvoiceSeriesDialog(id, clientId, type) {
  return dispatch => {
    dispatch({
      type: INVOICE_SERIES_INIT_REQUEST,
    });
    InvoiceSeriesServices.getInvoiceSeries('/list', '')
      .then(respone =>
        dispatch({
          type: OPEN_INVOICE_SERIES_RECEIPT_DIALOG,
          payload: respone,
          id,
          clientId,
          object_type: type,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener los datos', 'error');
        dispatch({
          type: INVOICE_SERIES_FAILURE,
        });
      });
  };
}

export function closeInvoiceSeriesInnerDialog() {
  return {
    type: CLOSE_INVOICE_SERIES_RECEIPT_DIALOG,
  };
}

export function closePreviewReceiptDialog() {
  return {
    type: CLOSE_PREVIEW_RECEIPT_DIALOG,
  };
}

export function openPreviewReceiptDialog(id) {
  return dispatch => {
    dispatch({
      type: OPEN_PREVIEW_RECEIPT_DIALOG_INIT,
    });
    ReceiptServices.getReceipt('/fel/', id)
      .then(response => {
        dispatch({
          type: OPEN_PREVIEW_RECEIPT_DIALOG_SUCCESS,
          payload: response,
        });
      })
      .catch(error => {
        notificationHandler.infoMessage(dispatch, error.message || 'Error al obtener los datos de la factura', 'error');
        dispatch({
          type: OPEN_PREVIEW_RECEIPT_DIALOG_FAILURE,
        });
      });
  };
}
