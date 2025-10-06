import { statusName } from 'app/constants/appConstant';
import ActivityServices from 'app/services/catalogs/activitiesService';
import notificationHandler from 'app/utils/errorHandler';
import {
  GET_ACTIVITIES_INIT_REQUEST,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAILURE,
  SET_SEARCH_TEXT,
  OPEN_NEW_ACTIVITY_DIALOG,
  CLOSE_NEW_ACTIVITY_DIALOG,
  OPEN_EDIT_ACTIVITY_DIALOG,
  CLOSE_EDIT_ACTIVITY_DIALOG,
  REMOVE_ACTIVITY,
  ADD_ACTIVITY,
  UPDATE_ACTIVITY,
} from '../../types/activity.types';

export function getActivities(routeParams) {
  return dispatch => {
    dispatch({
      type: GET_ACTIVITIES_INIT_REQUEST,
    });
    ActivityServices.getActivity('/list/', routeParams.id)
      .then(response =>
        dispatch({
          type: GET_ACTIVITIES_SUCCESS,
          payload: response,
          routeParams,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener las actividades', 'error');
        dispatch({
          type: GET_ACTIVITIES_FAILURE,
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

export function openNewActivityDialog() {
  return {
    type: OPEN_NEW_ACTIVITY_DIALOG,
  };
}

export function closeNewActivityDialog() {
  return {
    type: CLOSE_NEW_ACTIVITY_DIALOG,
  };
}

export function openEditActivityDialog(data) {
  return {
    type: OPEN_EDIT_ACTIVITY_DIALOG,
    data,
  };
}

export function closeEditActivityDialog() {
  return {
    type: CLOSE_EDIT_ACTIVITY_DIALOG,
  };
}

export function removeActivity(activityId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().activityApp.activity;
    ActivityServices.deleteActivity('/', activityId)
      .then(() =>
        dispatch({
          type: REMOVE_ACTIVITY,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Actividad eliminada con éxito!!!');
        dispatch(getActivities(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar la actividad', 'error');
      });
  };
}

export function addActivity(newActivity) {
  return (dispatch, getState) => {
    const { routeParams } = getState().activityApp.activity;
    const request = {
      name: newActivity.name,
    };
    ActivityServices.postActivity('', request)
      .then(() =>
        dispatch({
          type: ADD_ACTIVITY,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Actividad creada con éxito!!!');
        dispatch(getActivities(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear la actividad', 'error');
      });
  };
}

export function updateActivity(activity) {
  return (dispatch, getState) => {
    const { routeParams } = getState().activityApp.activity;
    const request = {
      id: activity.id,
      name: activity.name,
      status: statusName.ACTIVO,
    };
    ActivityServices.putActivity('', request)
      .then(() =>
        dispatch({
          type: UPDATE_ACTIVITY,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Actividad actualizada con éxito!!!');
        dispatch(getActivities(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar actualizar la actividad', 'error');
      });
  };
}
