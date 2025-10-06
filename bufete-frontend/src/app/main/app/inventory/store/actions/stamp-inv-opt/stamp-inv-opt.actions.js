import { productType, AppId } from 'app/constants/appConstant';
import ProductServices from 'app/services/inventory/productService';
import StampInvServices from 'app/services/inventory/stampInvService';
import notificationHandler from 'app/utils/errorHandler';
import helperFunctions from 'app/utils/helperFunc';
import StatusService from 'app/services/shared/statusService';
import isEmpty from 'lodash/isEmpty';
import RecordServices from 'app/services/file-records/recordsService';
import {
  GET_STAMP_INV_OPTION_INIT_REQUEST,
  GET_STAMP_INV_OPTION_SUCCESS,
  GET_STAMP_INV_OPTION_FAILURE,
  OPEN_STAMP_REPORT_DIALOG,
  OPEN_EDIT_STAMP_OPTIONS_DIALOG,
  OPEN_CHANGE_STATE_OPT_DIALOG,
  OPEN_STAMP_OPTIONS_DIALOG,
  CLOSE_STAMP_OPTIONS_DIALOG,
  SAVE_STAMP_INV_OPT_INIT_REQUEST,
  SAVE_STAMP_INV_OPT_SUCCESS,
  SAVE_STAMP_INV_OPT_FAILURE,
  CLOSE_STAMP_REPORT_DIALOG,
  CLOSE_CHANGE_STATE_OPT_DIALOG,
  CHANGE_STAMP_INV_STATUS_INIT,
  CHANGE_STAMP_INV_STATUS_SUCCESS,
  CHANGE_STAMP_INV_STATUS_FAILURE,
  GET_STATUS_FLOW,
  CLOSE_MOVE_TO_RECORD_FILES_DIALOG,
  OPEN_MOVE_TO_RECORD_FILES_DIALOG,
  MOVE_TO_RECORD_FILE_INIT,
  MOVE_TO_RECORD_FILE_SUCCESS,
  MOVE_TO_RECORD_FILE_FAILURE,
} from '../../types/stamp-inv-opt/stamp-inv-opt.types';

export function getInvetoryByRecordId(id) {
  return dispatch => {
    dispatch({
      type: GET_STAMP_INV_OPTION_INIT_REQUEST,
    });
    StampInvServices.getInvetoryByRecordId(id)
      .then(response => {
        dispatch({
          type: GET_STAMP_INV_OPTION_SUCCESS,
          payload: response,
          recordId: id,
        });
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos', 'error');
        dispatch({
          type: GET_STAMP_INV_OPTION_FAILURE,
        });
      });
  };
}

export function openStampReportDialog(recordId) {
  return dispatch =>
    StampInvServices.getInvReportByRecordId(recordId)
      .then(response => {
        if (isEmpty(response)) {
          notificationHandler.infoMessage(dispatch, 'Se deben autorizar las solicitudes para generar el reporte', 'warning');
          return;
        }
        dispatch({
          type: OPEN_STAMP_REPORT_DIALOG,
          payload: {
            headers: response[0].detail_list.map(hdr => hdr.product_code),
            data: response.map(det => {
              const newData = {
                id: det.id,
                request_date: det.request_date,
                requester_name: det.requester_name,
                file_num: det.file_num,
                client_name: det.client_name,
                reference: det.reference,
                total: det.total,
              };
              det.detail_list.forEach(lst => {
                newData[lst.product_code] = lst.request_quantity;
              });
              return newData;
            }),
          },
        });
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al obtener datos de timbres', 'error');
      });
}

export function openEditStampOptionsDialog(stampInvId, recordId) {
  const promises = [];
  promises.push(StampInvServices.getInvetoryById(stampInvId));
  promises.push(ProductServices.getProductByType(productType.TIMBRES));
  return dispatch =>
    Promise.all(promises)
      .then(response =>
        dispatch({
          type: OPEN_EDIT_STAMP_OPTIONS_DIALOG,
          payload: {
            id: recordId,
            data: response,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al obtener el inventario', 'error');
      });
}

export function openChangeStatusDialog(stampInvId, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_OPT_DIALOG,
    data: {
      id: stampInvId,
      prevStatus,
    },
  };
}

export function openStampOptionsDialog(recordId) {
  return dispatch =>
    ProductServices.getProductByType(productType.TIMBRES)
      .then(response =>
        dispatch({
          type: OPEN_STAMP_OPTIONS_DIALOG,
          payload: {
            id: recordId,
            data: response,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al obtener datos de timbres', 'error');
      });
}

export function closeStampOptionsDialog() {
  return {
    type: CLOSE_STAMP_OPTIONS_DIALOG,
  };
}

export function createStampInvOpt(newStampInv) {
  return (dispatch, getState) => {
    const { recordId } = getState().stampInvOptApp.stampInvOpt;
    dispatch({
      type: SAVE_STAMP_INV_OPT_INIT_REQUEST,
    });
    const request = {
      id: newStampInv.id,
      request_type: newStampInv.request_type,
      requester_id: newStampInv.requester_id,
      request_date: helperFunctions.reFormatDate(newStampInv.request_date),
      reference: newStampInv.reference,
      file_record_id: newStampInv.file_record_id,
      total: newStampInv.total,
      status: newStampInv.status,
      detail_list: newStampInv.detail_list,
    };
    StampInvServices.postStampInv('', request)
      .then(response => dispatch({ type: SAVE_STAMP_INV_OPT_SUCCESS, payload: response }))
      .then(() => dispatch(closeStampOptionsDialog()))
      .then(() => notificationHandler.successMessage(dispatch, 'Solicitud creada con exito!!'))
      .then(() => dispatch(getInvetoryByRecordId(recordId)))
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al crear el inventario', 'error');
        dispatch({
          type: SAVE_STAMP_INV_OPT_FAILURE,
        });
      });
  };
}

export function closeStampReportDialog() {
  return {
    type: CLOSE_STAMP_REPORT_DIALOG,
  };
}

export function closeChangeStatusDialog() {
  return {
    type: CLOSE_CHANGE_STATE_OPT_DIALOG,
  };
}

export function updateStampInvState(form) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_STAMP_INV_STATUS_INIT,
    });
    const { recordId } = getState().stampInvOptApp.stampInvOpt;
    const request = {
      id: form.id,
      comment: form.comment,
      status: form.next_status,
    };
    StampInvServices.patchStampInv('', request)
      .then(() => dispatch({ type: CHANGE_STAMP_INV_STATUS_SUCCESS }))
      .then(() => dispatch(closeChangeStatusDialog()))
      .then(() => notificationHandler.successMessage(dispatch, 'Cambio de estado finalizado con éxito!!!'))
      .then(() => dispatch(getInvetoryByRecordId(recordId)))
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
        dispatch({
          type: CHANGE_STAMP_INV_STATUS_FAILURE,
        });
      });
  };
}

export function getStatusFlow() {
  return dispatch =>
    StatusService.getStatusFlow(AppId.INVENTARIO_TIMBRES)
      .then(response =>
        dispatch({
          type: GET_STATUS_FLOW,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos', 'error');
      });
}

export function openMoveToRecordFileDialog(requestInv, recordId) {
  return dispatch =>
    RecordServices.getRecordFile('/', recordId)
      .then(response =>
        dispatch({
          type: OPEN_MOVE_TO_RECORD_FILES_DIALOG,
          data: {
            id: recordId,
            file_num: response.file_num,
            request_inv: requestInv,
          },
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function closeMoveToRecordFileDialog() {
  return {
    type: CLOSE_MOVE_TO_RECORD_FILES_DIALOG,
  };
}

export function moveToRecordFile(form) {
  return dispatch => {
    dispatch({
      type: MOVE_TO_RECORD_FILE_INIT,
    });
    const request = {
      id: form.id,
      record_id: form.recordId,
    };
    StampInvServices.patchStampInv('/move_to', request)
      .then(() => dispatch({ type: MOVE_TO_RECORD_FILE_SUCCESS }))
      .then(() => dispatch(closeMoveToRecordFileDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Se movió el registro a un nuevo expediente con éxito!!!');
        dispatch(getInvetoryByRecordId(form.currentId));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar mover los timbres de expediente', 'error');
        dispatch({
          type: MOVE_TO_RECORD_FILE_FAILURE,
        });
      });
  };
}
