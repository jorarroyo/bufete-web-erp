import ReceiptServices from 'app/services/billing-process/receiptServices';
import notificationHandler from 'app/utils/errorHandler';
import FELDocumentServices from 'app/services/fel/felDocumentServices';
import { statusName } from 'app/constants/appConstant';
import {
  CHANGE_RECEIPT_STATUS_FAILURE,
  CHANGE_RECEIPT_STATUS_INIT,
  CHANGE_RECEIPT_STATUS_SUCCESS,
  CLOSE_CHANGE_STATE_RECEIPT_DIALOG,
  CLOSE_PREVIEW_DOC_RECEIPT_DIALOG,
  GET_RECEIPT_FAILURE,
  GET_RECEIPT_INIT_REQUEST,
  GET_RECEIPT_SUCCESS,
  OPEN_CHANGE_STATE_RECEIPT_DIALOG,
  OPEN_PREVIEW_DOC_RECEIPT_DIALOG,
  PREVIEW_DOC_FAILURE,
  PREVIEW_DOC_INIT_REQUEST,
  SET_RECEIPT_SEARCH_TEXT,
} from '../../types/receipts/receipts.types';

export function getPagedReceipts(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_RECEIPT_INIT_REQUEST,
    });
    ReceiptServices.getAllReceipts(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_RECEIPT_SUCCESS,
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
          type: GET_RECEIPT_FAILURE,
        });
      });
  };
}

export function setReceiptSearchText(event) {
  return {
    type: SET_RECEIPT_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openChangeStatusReceiptDialog(id, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_RECEIPT_DIALOG,
    data: {
      id,
      prevStatus,
    },
  };
}

export function closeChangeStatusReceiptDialog() {
  return {
    type: CLOSE_CHANGE_STATE_RECEIPT_DIALOG,
  };
}

export function updateReceiptState(form) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_RECEIPT_STATUS_INIT,
    });
    // const { routeParams, searchText } = getState().receiptsApp.receipts || getState().receiptApp.receipts;
    if (form.next_status === statusName.GENERADA) {
      ReceiptServices.getReceipt('/fel/', form.id)
        .then(response => {
          const felRequest = {
            Documentos: [
              {
                Factura: response.id,
                TipoDocumento: response.doc_type,
                Cliente: form.selectedChild ? form.selectedChild.id : response.client_id,
                RazonSocial: form.selectedChild ? form.selectedChild.name : response.client_name,
                NIT: (form.selectedChild ? form.selectedChild.nit : response.client_nit).replace('-', ''),
                'Fec.Factura': new Date(response.receipt_date),
                Material: response.material,
                Descripcion: response.description,
                'Cant.': response.quantity,
                Umventa: response.unit_sell,
                'PrecioUnit.': response.unit_price,
                MontoNeto: response.sub_total,
                IVA: response.iva,
                ImporteFinal: response.total,
                Descuento: response.discount,
                DireccionCliente: form.newAddress.length > 0 ? form.newAddress : response.client_direction,
                Pais: response.country,
                TipoImpuesto: response.tax_type,
                PorcentajeImpuesto: response.tax_percent,
                Moneda: response.currency,
                Empresa: '',
                FormaPago: response.pay_method,
                Serie: form.invoiceValue || '',
                FacturaStatus: 'EMITIDO',
                TipoCambio: response.currency_type,
                Email: response.client_email,
                NC_MotivoAjuste: '',
                NC_SerieFac: '',
                NC_NoFac: '',
                TipoDoc: 'FACTURA',
                LineasDetalle: response.details.map((det, index) => ({
                  NumeroLinea: index + 1,
                  Bien_Servicio: det.service_type,
                  Cantidad: det.quantity,
                  UnidadMedida: response.unit_sell,
                  Descripcion: det.description,
                  PrecioUnitario: det.line_unit_price,
                  Precio: det.line_unit_price,
                  Descuento: det.line_discount,
                  Total: det.line_unit_price,
                  ImpuestoMontoNeto: det.line_total,
                  MontoImpuesto: det.line_tax,
                })),
              },
            ],
          };
          FELDocumentServices.postDocument('', felRequest)
            .then(felResponse => {
              if (felResponse[0].StatusWS === '00' || felResponse[0].StatusWS === '98') {
                notificationHandler.successMessage(dispatch, felResponse[0].MessageStatus);
                return felResponse[0];
              }
              notificationHandler.infoMessage(dispatch, felResponse[0].MessageStatus, 'error');
              throw new Error(felResponse[0].MessageStatus);
            })
            .then(resFel => {
              changeStatus(
                { ...form, serial_number: resFel.NumeroInternoCofidi, invoice_series_id: form.invoiceId },
                dispatch,
                getState().receiptsApp ? getState().receiptsApp.receipts.routeParams : getState().receiptApp.receipts.routeParams,
                getState().receiptsApp ? getState().receiptsApp.receipts.searchText : getState().receiptApp.receipts.searchText
              );
            })
            .catch(error => {
              notificationHandler.infoMessage(dispatch, error.message || 'Error al generar la factura', 'error');
              dispatch({
                type: CHANGE_RECEIPT_STATUS_FAILURE,
              });
            });
        })
        .catch(() => {
          notificationHandler.infoMessage(dispatch, 'Error al generar la factura', 'error');
          dispatch({
            type: CHANGE_RECEIPT_STATUS_FAILURE,
          });
        });
    } else if (form.next_status === statusName.ANULADO) {
      const felRequest = {
        no_documento: form.id,
        motivo_anulacion: form.comment,
      };
      FELDocumentServices.cancelDocument('/anular', felRequest)
        .then(felResponse => {
          if (felResponse[0].TipoRespuesta === 'ANULACION') {
            notificationHandler.successMessage(dispatch, felResponse[0].DetalleRespuesta);
          } else {
            notificationHandler.infoMessage(dispatch, felResponse[0].DetalleRespuesta, 'error');
            throw new Error(felResponse[0].DetalleRespuesta);
          }
        })
        .then(() => {
          changeStatus(
            form,
            dispatch,
            getState().receiptsApp ? getState().receiptsApp.receipts.routeParams : getState().receiptApp.receipts.routeParams,
            getState().receiptsApp ? getState().receiptsApp.receipts.searchText : getState().receiptApp.receipts.searchText
          );
        })
        .catch(error => {
          notificationHandler.infoMessage(dispatch, error.message || 'Error al anular la factura', 'error');
          dispatch({
            type: CHANGE_RECEIPT_STATUS_FAILURE,
          });
        });
    } else {
      changeStatus(
        form,
        dispatch,
        getState().receiptsApp ? getState().receiptsApp.receipts.routeParams : getState().receiptApp.receipts.routeParams,
        getState().receiptsApp ? getState().receiptsApp.receipts.searchText : getState().receiptApp.receipts.searchText
      );
    }
  };
}

function changeStatus(form, dispatch, routeParams, searchText) {
  const request = {
    id: form.id,
    comment: form.comment,
    status: form.next_status,
    serial_number: form.serial_number,
    invoice_series_id: form.invoice_series_id,
  };
  ReceiptServices.patchReceipt('', request)
    .then(() => dispatch({ type: CHANGE_RECEIPT_STATUS_SUCCESS }))
    .then(() => dispatch(closeChangeStatusReceiptDialog()))
    .then(() => {
      notificationHandler.successMessage(dispatch, 'Cambio de estado con éxito!!!');
      if (routeParams) {
        dispatch(getPagedReceipts(routeParams.page, routeParams.size, searchText, routeParams.order));
      }
    })
    .catch(() => {
      notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
      dispatch({
        type: CHANGE_RECEIPT_STATUS_FAILURE,
      });
    });
}

export function openPreviewReceiptDocDialog(id) {
  return dispatch => {
    dispatch({
      type: PREVIEW_DOC_INIT_REQUEST,
    });
    FELDocumentServices.getDocument('/', id)
      .then(response => {
        if (Array.isArray(response) && response[0].TipoRespuesta && response[0].TipoRespuesta === 'ERROR') {
          throw new Error(response[0].DetalleRespuesta);
        }
        dispatch({
          type: OPEN_PREVIEW_DOC_RECEIPT_DIALOG,
          id,
          data: response,
        });
      })
      .catch(error => {
        notificationHandler.infoMessage(dispatch, error.message || 'Error al obtener los datos', 'error');
        dispatch({
          type: PREVIEW_DOC_FAILURE,
        });
      });
  };
}

export function closePreviewReceiptDocDialog() {
  return {
    type: CLOSE_PREVIEW_DOC_RECEIPT_DIALOG,
  };
}
