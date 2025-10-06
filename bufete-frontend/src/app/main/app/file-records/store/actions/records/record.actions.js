import { statusName } from 'app/constants/appConstant';
import RecordSubTypeServices from 'app/services/catalogs/recordSubTypeService';
import RecordTypeServices from 'app/services/catalogs/recordTypeService';
import RecordServices from 'app/services/file-records/recordsService';
import notificationHandler from 'app/utils/errorHandler';
import helperFunctions from 'app/utils/helperFunc';
import {
  CLOSE_MOVE_TO_RECORD_FILES_DIALOG,
  GET_RECORD_FILE_FAILURE,
  GET_RECORD_FILE_INIT_REQUEST,
  GET_RECORD_FILE_SUCCESS,
  GET_SUB_TYPE_RECORD,
  GET_TYPE_RECORD,
  NEW_RECORD_FILE,
  OPEN_MOVE_TO_RECORD_FILES_DIALOG,
  SAVE_RECORD_FILE_FAILURE,
  SAVE_RECORD_FILE_INIT_REQUEST,
  SAVE_RECORD_FILE_SUCCESS,
} from '../../types/records/record.types';

export function newRecordFile() {
  return {
    type: NEW_RECORD_FILE,
    payload: {
      id: '',
      type: -1,
      sub_type: -1,
      subject: '',
      observations: '',
      opening_date: '',
      closing_date: '',
      location: '',
      file_num: '',
      client_id: [],
      lawyer_id: [],
      admon_id: [],
      confidential: false,
      status: statusName.ELABORADO,
      priority: '',
      judgement_no: '',
      opponent_client_id: [],
      opponent_lawyer_id: [],
    },
  };
}

export function getRecordFile(employeeId) {
  return dispatch => {
    dispatch({
      type: GET_RECORD_FILE_INIT_REQUEST,
    });
    RecordServices.getRecordFile('/', employeeId)
      .then(response =>
        dispatch({
          type: GET_RECORD_FILE_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener el expediente', 'error');
        dispatch({
          type: GET_RECORD_FILE_FAILURE,
        });
      });
  };
}

export function createRecordFile(form) {
  return dispatch => {
    dispatch({
      type: SAVE_RECORD_FILE_INIT_REQUEST,
    });
    const request = {
      id: form.id,
      type: form.type,
      sub_type: form.sub_type,
      subject: form.subject,
      status: statusName.ELABORADO,
      observations: form.observations,
      opening_date: helperFunctions.reFormatDate(form.opening_date),
      location: form.location,
      file_num: form.file_num,
      client_id: form.client_id,
      lawyer_id: form.lawyer_id,
      admon_id: form.admon_id,
      confidential: form.confidential,
      priority: form.priority,
      judgement_no: form.judgement_no,
    };
    RecordServices.postRecordFile('', request)
      .then(response => dispatch({ type: SAVE_RECORD_FILE_SUCCESS, payload: response }))
      .then(() => notificationHandler.successMessage(dispatch, 'Expediente almacenado con éxito!!!'))
      .catch(({ response }) => {
        notificationHandler.infoMessage(dispatch, response.data.message || 'error al crear el expediente', 'error');
        dispatch({
          type: SAVE_RECORD_FILE_FAILURE,
        });
      });
  };
}

export function getTypeRecord() {
  return dispatch =>
    RecordTypeServices.recordTypeByStatus(statusName.ACTIVO)
      .then(response =>
        dispatch({
          type: GET_TYPE_RECORD,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al crear los tipos de expediente', 'error');
        dispatch({
          type: GET_TYPE_RECORD,
          payload: [],
        });
      });
}

export function getSubTypeRecord(parentId) {
  return dispatch =>
    RecordSubTypeServices.recordSubTypeByStatus(parentId, statusName.ACTIVO)
      .then(response =>
        dispatch({
          type: GET_SUB_TYPE_RECORD,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al crear los subtipos de expediente', 'error');
        dispatch({
          type: GET_SUB_TYPE_RECORD,
          payload: [],
        });
      });
}
