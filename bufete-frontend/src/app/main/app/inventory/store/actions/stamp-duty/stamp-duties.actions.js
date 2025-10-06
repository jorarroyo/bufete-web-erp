import StampDutyService from 'app/services/inventory/stampDutyService';
import notificationHandler from 'app/utils/errorHandler';

export const SET_STAMP_DUTY_SEARCH_CRITERIA = '[STAMP-DUTY APP] SET STAMP DUTY SEARCH CRITERIA';
export const CREATE_STAMP_DUTY = '[STAMP-DUTY APP] CREATE STAMP DUTY';
export const REQUEST_INIT = '[STAMP-DUTY APP] REQUEST INIT';
export const REQUEST_SUCCESS = '[STAMP-DUTY APP] REQUEST SUCCESS';
export const OPEN_ADD_STAMP_DUTY_DIALOG = '[STAMP-DUTY APP] OPEN ADD STAMP DUTY DIALOG';
export const CLOSE_ADD_STAMP_DUTY_DIALOG = '[STAMP-DUTY APP] CLOSE ADD STAMP DUTY DIALOG';

const data = {
  stamp_type: 0,
  designation_type: 0,
  year: 0,
  comment: '',
  stamp_number: 0,
  purchase_date: '',
  employee_id: 0,
  form_number: '',
  form_range: '',
  action: '',
  activity_id: null,
};

export function setStampDutySearchCriteria(event) {
  return {
    type: SET_STAMP_DUTY_SEARCH_CRITERIA,
    searchText: event.target.value,
  };
}

export function success() {
  return {
    type: REQUEST_SUCCESS,
  };
}

export function initRequest() {
  return {
    type: REQUEST_INIT,
  };
}

export function createStampDuty(newStamp) {
  const request = StampDutyService.createStampDuty(newStamp);
  return dispatch =>
    request
      .then(response => dispatch({ type: CREATE_STAMP_DUTY, payload: response }))
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'error al crear el movimiento de inventario', 'error');
      });
}

export function openAddStampDutyDialog() {
  return {
    type: OPEN_ADD_STAMP_DUTY_DIALOG,
    payload: data,
  };
}

export function closeAddStampDutyDialog() {
  return {
    type: CLOSE_ADD_STAMP_DUTY_DIALOG,
  };
}
