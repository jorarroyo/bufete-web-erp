import axios from 'axios';
import config from 'app/config';
import authService from 'app/services/authService';
import notificationHandler from 'app/utils/errorHandler';
import { statusName } from 'app/constants/appConstant';
import CaseActivityServices from 'app/services/file-records/caseActivityService';

export const ADD_ACTIVITY_SETTLE = '[ACTIVITY_SETTLE APP] ADD ACTIVITY_SETTLE';
export const UPDATE_ACTIVITY_SETTLE = '[ACTIVITY_SETTLE APP] UPDATE ACTIVITY_SETTLE';
export const NEW_ACTIVITY_SETTLE = '[ACTIVITY_SETTLE APP] NEW ACTIVITY_SETTLE';
export const GET_ACTIVITY_SETTLE = '[ACTIVITY_SETTLE APP] GET ACTIVITY_SETTLE';
export const OPEN_ADD_CASE_ACTIVITY_DIALOG = '[ACTIVITY_SETTLE APP] OPEN ADD CASE ACTIVITY DIALOG';
export const CLOSE_ADD_CASE_ACTIVITY_DIALOG = '[ACTIVITY_SETTLE APP] CLOSE ADD CASE ACTIVITY DIALOG';
export const ASSIGN_CASE_ACTIVITIES = '[ACTIVITY_SETTLE APP] ASSIGN CASE ACTIVITIES';
export const REMOVE_CASE_ACTIVITY = '[ACTIVITY_SETTLE APP] REMOVE CASE ACTIVITY';

const accessToken = authService.getAccessToken();
axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

const data = {
  id: '',
  assign_date: '',
  comment: '',
  status: '',
  proctor_agenda_id: '',
  invoice_num: '',
  invoice_range: '',
  invoice_name: '',
  invoice_description: '',
  invoice_total: 0,
  activity_list: [],
};

export function getActivitySettle(activitySettleId) {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}/${activitySettleId}`;

  const request = axios.get(url);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_ACTIVITY_SETTLE,
          payload: response.data,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function saveActivitySettle(newSettle) {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}`;

  return dispatch => {
    const request = axios.post(url, {
      id: newSettle.id,
      comment: newSettle.comment,
      assign_date: newSettle.assign_date,
      status: statusName.ABIERTO,
      proctor_agenda_id: newSettle.proctor_agenda_id,
      invoice_num: newSettle.invoice_num,
      invoice_range: newSettle.invoice_range,
      invoice_name: newSettle.invoice_name,
      invoice_description: newSettle.invoice_description,
      invoice_total: newSettle.invoice_total,
      invoice_type: newSettle.invoice_type,
      activity_list: newSettle.activity_list.map(actCase => ({
        caseActivityId: actCase.id,
        costDetail: actCase.fieldValue,
      })),
    });
    return request
      .then(response =>
        Promise.all([
          dispatch({
            type: ADD_ACTIVITY_SETTLE,
            payload: response.data,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Actividad asociada con éxito!!!');
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function updateActivitySettle(activitySettle) {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}`;

  return dispatch => {
    const request = axios.put(url, {
      id: activitySettle.id,
      comment: activitySettle.comment,
      assign_date: activitySettle.assign_date,
      status: statusName.ABIERTO,
      proctor_agenda_id: activitySettle.proctor_agenda_id,
      invoice_num: activitySettle.invoice_num,
      invoice_range: activitySettle.invoice_range,
      invoice_name: activitySettle.invoice_name,
      invoice_description: activitySettle.invoice_description,
      invoice_total: activitySettle.invoice_total,
      invoice_type: activitySettle.invoice_type,
      activity_list: activitySettle.activity_list,
    });
    return request
      .then(() =>
        Promise.all([
          dispatch({
            type: UPDATE_ACTIVITY_SETTLE,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Actividad asociada actualizada con éxito!!!');
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function newActivitySettle(proctorAgendaId) {
  return {
    type: NEW_ACTIVITY_SETTLE,
    payload: {
      ...data,
      proctor_agenda_id: proctorAgendaId,
    },
  };
}

export function openAddCaseActivityDialog(proctorAgendaId) {
  const request = CaseActivityServices.getAssignedActivities(proctorAgendaId);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: OPEN_ADD_CASE_ACTIVITY_DIALOG,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function closeAddCaseActivityDialog() {
  return {
    type: CLOSE_ADD_CASE_ACTIVITY_DIALOG,
  };
}

export function assignCaseActivities(ids) {
  const request = CaseActivityServices.getSelectedActivities(ids);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: ASSIGN_CASE_ACTIVITIES,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function removeCaseActivity(id) {
  return {
    type: REMOVE_CASE_ACTIVITY,
    payload: id,
  };
}
