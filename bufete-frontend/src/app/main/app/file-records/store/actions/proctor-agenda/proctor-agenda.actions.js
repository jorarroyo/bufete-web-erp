import ProctorAgendaServices from 'app/services/file-records/proctorAgendaService';
import notificationHandler from 'app/utils/errorHandler';
import {
  GET_PROCTOR_AGENDA_INIT_REQUEST,
  GET_PROCTOR_AGENDA_SUCCESS,
  GET_PROCTOR_AGENDA_FAILURE,
  SET_PROCTOR_AGENDA_SEARCH_CRITERIA,
  OPEN_CHANGE_STATE_DIALOG,
  CLOSE_CHANGE_STATE_DIALOG,
  OPEN_GET_ASSIGNED_ACTIVITIES_DIALOG,
  CLOSE_GET_ASSIGNED_ACTIVITIES_DIALOG,
  CHANGE_AGENDA_STATUS_INIT_REQUEST,
  CHANGE_AGENDA_STATUS_SUCCESS,
  CHANGE_AGENDA_STATUS_FAILURE,
} from '../../types/proctor-agenda/proctor-agenda.types';

export function getAllProctorAgenda(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_PROCTOR_AGENDA_INIT_REQUEST,
    });
    ProctorAgendaServices.getAllProctorAgenda(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_PROCTOR_AGENDA_SUCCESS,
          payload: response,
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los registros de la agenda', 'error');
        dispatch({
          type: GET_PROCTOR_AGENDA_FAILURE,
        });
      });
  };
}

export function setProctorAgendaSearchCriteria(event) {
  return {
    type: SET_PROCTOR_AGENDA_SEARCH_CRITERIA,
    searchText: event.target.value,
  };
}

export function openEditProctorAgendaDialog(recordId, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_DIALOG,
    data: {
      id: recordId,
      prevStatus,
    },
  };
}

export function closeEditProctorAgendaDialog() {
  return {
    type: CLOSE_CHANGE_STATE_DIALOG,
  };
}

export function updateProctorAgendaState(form) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_AGENDA_STATUS_INIT_REQUEST,
    });
    const { routeParams, searchText } = getState().proctorAgendaApp.proctorAgenda;
    ProctorAgendaServices.changeState({
      id: form.id,
      comment: form.comment,
      status: form.next_status,
    })
      .then(() => dispatch({ type: CHANGE_AGENDA_STATUS_SUCCESS }))
      .then(() => dispatch(closeEditProctorAgendaDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cambio de estado con éxito!!!');
        dispatch(getAllProctorAgenda(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(error => {
        if (error.response) {
          const { data } = error.response;
          notificationHandler.infoMessage(dispatch, data.message, 'error');
        } else {
          notificationHandler.infoMessage(dispatch, 'Error al intentar cambia el estado', 'error');
        }
        dispatch({
          type: CHANGE_AGENDA_STATUS_FAILURE,
        });
      });
  };
}

export function openGetAssignedActivitiesDialog(proctorAgendaId) {
  const request = ProctorAgendaServices.getProctorAgenda(proctorAgendaId);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: OPEN_GET_ASSIGNED_ACTIVITIES_DIALOG,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function closeGetAssignedActivitiesDialog() {
  return {
    type: CLOSE_GET_ASSIGNED_ACTIVITIES_DIALOG,
  };
}
