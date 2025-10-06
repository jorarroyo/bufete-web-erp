import CaseActivityServices from 'app/services/file-records/caseActivityService';
import notificationHandler from 'app/utils/errorHandler';

import helperFunctions from 'app/utils/helperFunc';
import { CaseActivityType, statusName } from 'app/constants/appConstant';
import {
  GET_CASE_ACTIVITIES_INIT_REQUEST,
  GET_CASE_ACTIVITIES_SUCCESS,
  GET_CASE_ACTIVITIES_FAILURE,
  SET_CASE_ACTIVITIES_SEARCH_TEXT,
  CREATE_CASE_ACTIVITIES_INIT_REQUEST,
  CREATE_CASE_ACTIVITIES_SUCCESS,
  CREATE_CASE_ACTIVITIES_FAILURE,
  OPEN_NEW_CASE_ACTIVITY_DIALOG,
  CLOSE_NEW_CASE_ACTIVITY_DIALOG,
  OPEN_EDIT_CASE_ACTIVITY_DIALOG,
  CLOSE_EDIT_CASE_ACTIVITY_DIALOG,
  GET_CASE_ACTIVITY_INIT_REQUEST,
  GET_CASE_ACTIVITY_FAILURE,
  REMOVE_CASE_ACTIVITY_INIT_REQUEST,
  REMOVE_CASE_ACTIVITY_SUCCESS,
  REMOVE_CASE_ACTIVITY_FAILURE,
  CLOSE_CHANGE_RECORD_DIALOG,
  OPEN_CHANGE_RECORD_DIALOG,
  UPDATE_RECORD_CASE_ACTIVITIES_INIT_REQUEST,
  UPDATE_RECORD_CASE_ACTIVITIES_SUCCESS,
  UPDATE_RECORD_CASE_ACTIVITIES_FAILURE,
} from '../../types/case-activities/case-activities.types';

export function getAllCaseActivities(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_CASE_ACTIVITIES_INIT_REQUEST,
    });
    CaseActivityServices.getAllCaseActivities(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_CASE_ACTIVITIES_SUCCESS,
          payload: response,
          recordId: '',
          fileNum: '',
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener las actividades', 'error');
        dispatch({
          type: GET_CASE_ACTIVITIES_FAILURE,
        });
      });
  };
}

export function getCaseActivityByRecordId(recordId) {
  return dispatch => {
    dispatch({
      type: GET_CASE_ACTIVITIES_INIT_REQUEST,
    });
    CaseActivityServices.getCaseActivity('/list_by_record/', recordId)
      .then(response =>
        dispatch({
          type: GET_CASE_ACTIVITIES_SUCCESS,
          payload: response.case_activity_list,
          recordId,
          fileNum: response.name,
          status: response.status,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener las actividades', 'error');
        dispatch({
          type: GET_CASE_ACTIVITIES_FAILURE,
        });
      });
  };
}

export function setCaseActivitiesSearchText(event) {
  return {
    type: SET_CASE_ACTIVITIES_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openNewCaseActivityDialog(openType = 'new') {
  return {
    type: OPEN_NEW_CASE_ACTIVITY_DIALOG,
    openType,
  };
}

export function closeNewCaseActivityDialog() {
  return {
    type: CLOSE_NEW_CASE_ACTIVITY_DIALOG,
  };
}

export function closeEditCaseActivityDialog() {
  return {
    type: CLOSE_EDIT_CASE_ACTIVITY_DIALOG,
  };
}

export function openEditCaseActivityDialog(id) {
  return dispatch => {
    dispatch({
      type: GET_CASE_ACTIVITY_INIT_REQUEST,
    });
    CaseActivityServices.getCaseActivity('/view/', id)
      .then(response =>
        dispatch({
          type: OPEN_EDIT_CASE_ACTIVITY_DIALOG,
          data: {
            ...response,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener la información de procuración', 'error');
        dispatch({
          type: GET_CASE_ACTIVITY_FAILURE,
        });
      });
  };
}

export function createCaseActivity(caseActivity) {
  return (dispatch, getState) => {
    if (caseActivity.id === null) {
      dispatch(closeNewCaseActivityDialog());
    } else {
      dispatch(closeEditCaseActivityDialog());
    }
    dispatch({
      type: CREATE_CASE_ACTIVITIES_INIT_REQUEST,
    });
    const { routeParams, searchText, recordId } = getState().caseActivitiesApp.caseActivities;
    const request = {
      id: caseActivity.id,
      activity_name: caseActivity.activity_name,
      // activity_id: caseActivity.activity_id,
      institution_id: caseActivity.institution_id || 99,
      comment: caseActivity.comment,
      assign_date: helperFunctions.reFormatDate(caseActivity.assign_date),
      status: caseActivity.status || statusName.ACTIVO,
      file_record_id: caseActivity.recordId,
      employee_id: caseActivity.employee_id,
      activity_cost: caseActivity.activity_cost,
      currency_type: Number(caseActivity.currency_type),
      check_number: caseActivity.check_number,
      check_amount: Number(caseActivity.check_amount),
      activity_time:
        typeof caseActivity.activity_time === 'string'
          ? helperFunctions.getMinutesFromHHMMSS(caseActivity.activity_time)
          : caseActivity.activity_time,
      activity_start_date: caseActivity.activity_start_date,
      activity_end_date: caseActivity.activity_end_date,
      case_activity_type: caseActivity.case_activity_type,
      activity_details: caseActivity.employee_list_ids.map(det => ({
        employee_id: det,
        employee_name: '',
        status: statusName.ACTIVO,
      })),
    };
    CaseActivityServices.postCaseActivity('', request)
      .then(response => dispatch({ type: CREATE_CASE_ACTIVITIES_SUCCESS, payload: response }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Actividad asociada con éxito!!!');
        if (recordId !== '') {
          dispatch(getCaseActivityByRecordId(recordId));
        } else {
          dispatch(getAllCaseActivities(routeParams.page, routeParams.size, searchText, routeParams.order));
        }
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear la actividad de procuracion!!', 'error');
        dispatch({
          type: CREATE_CASE_ACTIVITIES_FAILURE,
        });
      });
  };
}

export function removeCaseActivity(caseActivityId) {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_CASE_ACTIVITY_INIT_REQUEST });
    const { routeParams, searchText, recordId } = getState().caseActivitiesApp.caseActivities;
    CaseActivityServices.deleteCaseActivity('/', caseActivityId)
      .then(() => dispatch({ type: REMOVE_CASE_ACTIVITY_SUCCESS }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Actividad eliminada con éxito!!!');
        if (recordId !== '') {
          dispatch(getCaseActivityByRecordId(recordId));
        } else {
          dispatch(getAllCaseActivities(routeParams.page, routeParams.size, searchText, routeParams.order));
        }
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar la actividad de procuracion!!', 'error');
        dispatch({ type: REMOVE_CASE_ACTIVITY_FAILURE });
      });
  };
}

export function closeChangeRecordActivityDialog() {
  return {
    type: CLOSE_CHANGE_RECORD_DIALOG,
  };
}

export function openChangeRecordActivityDialog(id, type) {
  return dispatch => {
    dispatch({
      type: GET_CASE_ACTIVITY_INIT_REQUEST,
    });
    CaseActivityServices.getCaseActivity('/view/', id)
      .then(response =>
        dispatch({
          type: OPEN_CHANGE_RECORD_DIALOG,
          data: {
            ...response,
            receiptType: type,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener la información de procuración', 'error');
        dispatch({
          type: GET_CASE_ACTIVITY_FAILURE,
        });
      });
  };
}

export function updateRecordCaseActivity(caseActivity, type) {
  return (dispatch, getState) => {
    dispatch(closeChangeRecordActivityDialog());
    dispatch({
      type: UPDATE_RECORD_CASE_ACTIVITIES_INIT_REQUEST,
    });
    const { routeParams, searchText } = getState().caseActivitiesApp.caseActivities;
    const request = {
      id: caseActivity.id,
      file_record_id: caseActivity.file_record_id,
    };
    CaseActivityServices.patchCaseActivity('/reasign', request)
      // .then(() => dispatch(closeChangeRecordActivityDialog()))
      .then(response => dispatch({ type: UPDATE_RECORD_CASE_ACTIVITIES_SUCCESS, payload: response }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Actividad reasignada con éxito!!!');
        if (type === CaseActivityType.HONORARIOS) {
          dispatch(getCaseActivityByRecordId(caseActivity.current_id));
        } else {
          dispatch(getAllCaseActivities(routeParams.page, routeParams.size, searchText, routeParams.order));
        }
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar reasignar la actividad de procuración!!', 'error');
        dispatch({
          type: UPDATE_RECORD_CASE_ACTIVITIES_FAILURE,
        });
      });
  };
}
