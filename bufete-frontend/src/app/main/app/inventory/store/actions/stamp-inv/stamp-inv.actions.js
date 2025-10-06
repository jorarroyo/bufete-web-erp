import StampInvServices from 'app/services/inventory/stampInvService';
import notificationHandler from 'app/utils/errorHandler';
import StatusService from 'app/services/shared/statusService';
import { AppId, productType, RequestType } from 'app/constants/appConstant';
import {
  GET_STAMP_INV_REQUEST_INIT,
  GET_STAMP_INV_SUCCESS,
  GET_STAMP_INV_FAILURE,
  SET_STAMP_INV_SEARCH_CRITERIA,
  OPEN_CHANGE_STATE_DIALOG,
  CLOSE_CHANGE_STATE_DIALOG,
  CHANGE_STAMP_INV_STATUS_INIT,
  CHANGE_STAMP_INV_STATUS_SUCCESS,
  CHANGE_STAMP_INV_STATUS_FAILURE,
  GET_STATUS_FLOW,
  OPEN_RETURN_STAMP_OPTIONS_DIALOG,
  CLOSE_RETURN_STAMP_OPTIONS_DIALOG,
  SAVE_STAMP_INV_RETURN_INIT_REQUEST,
  SAVE_STAMP_INV_RETURN_SUCCESS,
  SAVE_STAMP_INV_RETURN_FAILURE
} from '../../types/stamp-inv/stamp-inv.types';
import ProductServices from 'app/services/inventory/productService';
import helperFunctions from 'app/utils/helperFunc';

export function getStampsInv(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_STAMP_INV_REQUEST_INIT,
    });
    StampInvServices.getAllInventory(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_STAMP_INV_SUCCESS,
          payload: response,
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los inventarios', 'error');
        dispatch({
          type: GET_STAMP_INV_FAILURE,
        });
      });
  };
}

export function setStampInvSearchCriteria(event) {
  return {
    type: SET_STAMP_INV_SEARCH_CRITERIA,
    searchText: event.target.value,
  };
}

export function openChangeStatusDialog(stampInvId, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_DIALOG,
    data: {
      id: stampInvId,
      prevStatus,
    },
  };
}

export function closeChangeStatusDialog() {
  return {
    type: CLOSE_CHANGE_STATE_DIALOG,
  };
}

export function updateStampInvState(form) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_STAMP_INV_STATUS_INIT,
    });
    const { routeParams, searchText } = getState().stampInvApp.stampInv;
    const request = {
      id: form.id,
      comment: form.comment,
      status: form.next_status,
    };
    StampInvServices.patchStampInv('', request)
      .then(() => dispatch({ type: CHANGE_STAMP_INV_STATUS_SUCCESS }))
      .then(() => dispatch(closeChangeStatusDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cambio de estado finalizado con éxito!!!');
        dispatch(getStampsInv(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
        dispatch({
          type: CHANGE_STAMP_INV_STATUS_FAILURE,
        });
      });
  }
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

export function openReturnStampOptionsDialog(stampInvId) {
  const promises = [];
  promises.push(StampInvServices.getInvetoryById(stampInvId));
  promises.push(ProductServices.getProductByType(productType.TIMBRES));
  return dispatch =>
    Promise.all(promises)
      .then(response =>
        dispatch({
          type: OPEN_RETURN_STAMP_OPTIONS_DIALOG,
          payload: {
            data: response,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al obtener el inventario', 'error');
      });
}

export function closeReturnStampOptionsDialog() {
  return {
    type: CLOSE_RETURN_STAMP_OPTIONS_DIALOG,
  };
}

export function createReEntryStampInvOpt(newStampInv) {
  return (dispatch, getState) => {
    const total_request = newStampInv.detail_list.reduce((accumulator, currentValue) => accumulator + currentValue.quantity_request, 0);
    if (total_request === 0) {
      notificationHandler.infoMessage(dispatch, 'Debe ingresar por lo menos unacantidad para el ajuste de inventario', 'error');
      return;
    }
    dispatch({
      type: SAVE_STAMP_INV_RETURN_INIT_REQUEST,
    });
    const { routeParams, searchText } = getState().stampInvApp.stampInv;
    const request = {
      id: null,
      request_type: RequestType.ENTRADA,
      requester_id: newStampInv.requester_id,
      request_date: helperFunctions.reFormatDate(newStampInv.request_date),
      reference: newStampInv.reference,
      file_record_id: newStampInv.file_record_id,
      total: newStampInv.total,
      status: newStampInv.status,
      detail_list: newStampInv.detail_list,
    };
    StampInvServices.postStampInv('', request)
      .then(response => dispatch({ type: SAVE_STAMP_INV_RETURN_SUCCESS, payload: response }))
      .then(() => dispatch(closeReturnStampOptionsDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Ajuste de inventario finalizado con éxito!!!');
        dispatch(getStampsInv(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al crear el retorno de inventario', 'error');
        dispatch({
          type: SAVE_STAMP_INV_RETURN_FAILURE,
        });
      });
  }
}

