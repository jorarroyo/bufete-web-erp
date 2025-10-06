import { statusName } from 'app/constants/appConstant';
import StampInvServices from 'app/services/inventory/stampInvService';
import notificationHandler from 'app/utils/errorHandler';
import helperFunctions from 'app/utils/helperFunc';
import {
  ADD_STAMP_INV,
  CLOSE_ADD_STAMP_INV_DIALOG,
  GET_STAMP_INV_FAILURE,
  GET_STAMP_INV_INIT_REQUEST,
  GET_STAMP_INV_SUCCESS,
  NEW_STAMP_INV,
  OPEN_ADD_STAMP_INV_DIALOG,
  REMOVE_STAMP_INV,
  SAVE_STAMP_INV_FAILURE,
  SAVE_STAMP_INV_INIT_REQUEST,
  SAVE_STAMP_INV_SUCCESS,
} from '../../types/stamp-inv/new-stamp-inv.types';

const data = {
  id: null,
  request_type: -1,
  requester_id: -1,
  request_date: new Date(),
  reference: '',
  file_num: '',
  file_record_id: -1,
  total: 0,
  status: statusName.ELABORADO,
  receipt_number: '',
  detail_list: [],
};

export function newNewStampInv() {
  return {
    type: NEW_STAMP_INV,
    payload: data,
  };
}

export function getStampInv(stampInvId) {
  return dispatch => {
    dispatch({
      type: GET_STAMP_INV_INIT_REQUEST,
    });
    StampInvServices.getInvetoryById(stampInvId)
      .then(response =>
        dispatch({
          type: GET_STAMP_INV_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al crear el inventario', 'error');
        dispatch({
          type: GET_STAMP_INV_FAILURE,
        });
      });
  };
}

export function createStampInv(newStampInv) {
  return dispatch => {
    dispatch({
      type: SAVE_STAMP_INV_INIT_REQUEST,
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
      receipt_number: newStampInv.receipt_number,
      detail_list: newStampInv.detail_list,
    };
    StampInvServices.postStampInv('', request)
      .then(response => dispatch({ type: SAVE_STAMP_INV_SUCCESS, payload: response }))
      .then(() => notificationHandler.successMessage(dispatch, "Movimiento de inventario creado con exito!!!"))
      .catch(({response}) => {
        notificationHandler.infoMessage(dispatch, response.data.message || 'error al crear el inventario', 'error');
        dispatch({
          type: SAVE_STAMP_INV_FAILURE,
        });
      });
  };
}

export function openAddStampInvDialog(stampInvType) {
  return {
    type: OPEN_ADD_STAMP_INV_DIALOG,
    payload: {
      request_type: Number(stampInvType),
    },
  };
}

export function closeAddStampInvDialog() {
  return {
    type: CLOSE_ADD_STAMP_INV_DIALOG,
  };
}

export function addProduct(newData) {
  return {
    type: ADD_STAMP_INV,
    payload: newData,
  };
}

export function removeProduct(id) {
  return {
    type: REMOVE_STAMP_INV,
    payload: id,
  };
}
