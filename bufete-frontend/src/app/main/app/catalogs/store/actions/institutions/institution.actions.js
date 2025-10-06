import { statusName } from 'app/constants/appConstant';
import InstitutionServices from 'app/services/catalogs/institutionsService';
import notificationHandler from 'app/utils/errorHandler';
import {
  GET_INSTITUTIONS_INIT_REQUEST,
  GET_INSTITUTIONS_FAILURE,
  GET_INSTITUTIONS_SUCCESS,
  SET_SEARCH_TEXT,
  OPEN_NEW_INSTITUTION_DIALOG,
  CLOSE_NEW_INSTITUTION_DIALOG,
  OPEN_EDIT_INSTITUTION_DIALOG,
  CLOSE_EDIT_INSTITUTION_DIALOG,
  REMOVE_INSTITUTION,
  ADD_INSTITUTION,
  UPDATE_INSTITUTION,
} from '../../types/institution.types';

export function getInstitutions(routeParams) {
  return dispatch => {
    dispatch({
      type: GET_INSTITUTIONS_INIT_REQUEST,
    });
    InstitutionServices.getInstitution('/list/', routeParams.id)
      .then(response =>
        dispatch({
          type: GET_INSTITUTIONS_SUCCESS,
          payload: response,
          routeParams,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener las instituciones', 'error');
        dispatch({
          type: GET_INSTITUTIONS_FAILURE,
        });
      });
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openNewInstitutionDialog() {
  return {
    type: OPEN_NEW_INSTITUTION_DIALOG,
  };
}

export function closeNewInstitutionDialog() {
  return {
    type: CLOSE_NEW_INSTITUTION_DIALOG,
  };
}

export function openEditInstitutionDialog(data) {
  return {
    type: OPEN_EDIT_INSTITUTION_DIALOG,
    data,
  };
}

export function closeEditInstitutionDialog() {
  return {
    type: CLOSE_EDIT_INSTITUTION_DIALOG,
  };
}

export function removeInstitution(institutionId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().institutionApp.institution;
    InstitutionServices.deleteInstitution('/', institutionId)
      .then(() =>
        dispatch({
          type: REMOVE_INSTITUTION,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Institución eliminada con éxito!!!');
        dispatch(getInstitutions(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar la institución', 'error');
      });
  };
}

export function addInstitution(newInstitution) {
  return (dispatch, getState) => {
    const { routeParams } = getState().institutionApp.institution;
    const request = {
      name: newInstitution.name,
      short_name: newInstitution.short_name,
    };
    InstitutionServices.postIntitution('', request)
      .then(() =>
        dispatch({
          type: ADD_INSTITUTION,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Institución creada con éxito!!!');
        dispatch(getInstitutions(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear la institución', 'error');
      });
  };
}

export function updateInstitution(institution) {
  return (dispatch, getState) => {
    const { routeParams } = getState().institutionApp.institution;
    const request = {
      id: institution.id,
      name: institution.name,
      short_name: institution.short_name,
      status: statusName.ACTIVO,
    };
    InstitutionServices.putInstitution('', request)
      .then(() =>
        dispatch({
          type: UPDATE_INSTITUTION,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Institución actualizada con éxito!!!');
        dispatch(getInstitutions(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intengar actualizar la institución', 'error');
      });
  };
}
