import NomenclatureServices from 'app/services/accountable/nomenclatureServices';
import notificationHandler from 'app/utils/errorHandler';
import { statusName } from 'app/constants/appConstant';
import {
  GET_NOMENCLATURE_FAILURE,
  GET_NOMENCLATURE_INIT_REQUEST,
  GET_NOMENCLATURE_SUCCESS,
  GET_NOMENCLATURES_FAILURE,
  GET_NOMENCLATURES_INIT_REQUEST,
  GET_NOMENCLATURES_SUCCESS,
  SAVE_NOMENCLATURE_FAILURE,
  SAVE_NOMENCLATURE_INIT_REQUEST,
  SAVE_NOMENCLATURE_SUCCESS,
} from '../../types/nomenclatures/nomenclatures.types';

export function getNomenclatures() {
  return dispatch => {
    dispatch({
      type: GET_NOMENCLATURES_INIT_REQUEST,
    });
    NomenclatureServices.getNomenclatures('', '')
      .then(response =>
        dispatch({
          type: GET_NOMENCLATURES_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos', 'error');
        dispatch({
          type: GET_NOMENCLATURES_FAILURE,
        });
      });
  };
}

export function getNomenclature(id) {
  return dispatch => {
    dispatch({
      type: GET_NOMENCLATURE_INIT_REQUEST,
    });
    NomenclatureServices.getNomenclatures('', id)
      .then(response =>
        dispatch({
          type: GET_NOMENCLATURE_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos', 'error');
        dispatch({
          type: GET_NOMENCLATURE_FAILURE,
        });
      });
  };
}

export function createNomenclature(form) {
  return dispatch => {
    dispatch({
      type: SAVE_NOMENCLATURE_INIT_REQUEST,
    });
    const entity = {
      id: form.id,
      code: form.code,
      name: form.name,
      parent_id: form.parent_id,
      type: form.type,
      status: statusName.ACTIVO,
    };
    NomenclatureServices.postNomenclature('/', entity)
      .then(() => dispatch({ type: SAVE_NOMENCLATURE_SUCCESS }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Se almacenó la información con éxito!!!');
        dispatch(getNomenclatures());
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar almacenar la información', 'error');
        dispatch({
          type: SAVE_NOMENCLATURE_FAILURE,
        });
      });
  };
}

export function deleteNomenclature(id) {
  return dispatch => {
    dispatch({
      type: SAVE_NOMENCLATURE_INIT_REQUEST,
    });
    NomenclatureServices.deleteNomenclature('/', id)
      .then(() => dispatch({ type: SAVE_NOMENCLATURE_SUCCESS }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Se eliminó la información con éxito!!!');
        dispatch(getNomenclatures());
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
        dispatch({
          type: SAVE_NOMENCLATURE_FAILURE,
        });
      });
  };
}
