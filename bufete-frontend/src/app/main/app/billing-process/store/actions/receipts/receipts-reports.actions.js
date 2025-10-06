import ReceiptServices from 'app/services/billing-process/receiptServices';
import notificationHandler from 'app/utils/errorHandler';
import {
  RECEIPT_REPORT_FAILURE,
  RECEIPT_REPORT_INIT_REQUEST,
  RECEIPT_REPORT_SUCCESS,
} from '../../types/receipts/receipts-reports.types';

export function requestReceiptReport(form) {
  return dispatch => {
    dispatch({
      type: RECEIPT_REPORT_INIT_REQUEST,
    });
    const request = {
      invoice_id: form.invoiceId,
      start_date: `${form.startDate.toISOString().split('T')[0]}T00:00:00`,
      end_date: `${form.endDate.toISOString().split('T')[0]}T23:59:59`,
    };
    ReceiptServices.postReceipt('/report', request)
      .then(response =>
        dispatch({
          type: RECEIPT_REPORT_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener los datos', 'error');
        dispatch({
          type: RECEIPT_REPORT_FAILURE,
        });
      });
  };
}
