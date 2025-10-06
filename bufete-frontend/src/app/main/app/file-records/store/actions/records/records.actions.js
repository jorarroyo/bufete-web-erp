import RecordServices from 'app/services/file-records/recordsService';
import notificationHandler from 'app/utils/errorHandler';
import StatusService from 'app/services/shared/statusService';
import { AppId } from 'app/constants/appConstant';
import {
  GET_RECORDS_INIT_REQUEST,
  GET_RECORDS_SUCCESS,
  GET_RECORDS_FAILURE,
  SET_RECORDS_SEARCH_TEXT,
  OPEN_CHANGE_STATE_DIALOG,
  CLOSE_CHANGE_STATE_DIALOG,
  CHANGE_RECORD_STATUS_INIT,
  CHANGE_RECORD_STATUS_SUCCESS,
  CHANGE_RECORD_STATUS_FAILURE,
  GET_STATUS_FLOW,
  OPEN_MERGE_RECORD_FILES_DIALOG,
  CLOSE_MERGE_RECORD_FILES_DIALOG, MERGE_RECORD_FILE_INIT, MERGE_RECORD_FILE_SUCCESS, MERGE_RECORD_FILE_FAILURE,
} from '../../types/records/records.types';

export function getRecords(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_RECORDS_INIT_REQUEST,
    });
    RecordServices.getAllRecordFiles(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_RECORDS_SUCCESS,
          payload: response,
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los expedientes', 'error');
        dispatch({
          type: GET_RECORDS_FAILURE,
        });
      });
  };
}

export function setRecordsSearchText(event) {
  return {
    type: SET_RECORDS_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openChangeStatusRecordDialog(recordId, prevStatus) {
  return {
    type: OPEN_CHANGE_STATE_DIALOG,
    data: {
      id: recordId,
      prevStatus,
    },
  };
}

export function closeChangeStatusRecordDialog() {
  return {
    type: CLOSE_CHANGE_STATE_DIALOG,
  };
}

export function updateRecordState(form) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_RECORD_STATUS_INIT,
    });
    const { routeParams, searchText } = getState().recordsApp.records;
    const request = {
      id: form.id,
      comment: form.comment,
      status: form.next_status,
    };
    RecordServices.patchRecordFile('', request)
      .then(() => dispatch({ type: CHANGE_RECORD_STATUS_SUCCESS }))
      .then(() => dispatch(closeChangeStatusRecordDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cambio de estado con éxito!!!');
        dispatch(getRecords(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar cambiar el estado', 'error');
        dispatch({
          type: CHANGE_RECORD_STATUS_FAILURE,
        });
      });
  };
}

export function getStatusFlow() {
  return dispatch =>
    StatusService.getStatusFlow(AppId.EXPEDIENTES)
      .then(response =>
        dispatch({
          type: GET_STATUS_FLOW,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function openMergeRecordFileDialog(recordId) {
  return dispatch =>
    RecordServices.getRecordFile('/', recordId)
      .then(response =>
        dispatch({
          type: OPEN_MERGE_RECORD_FILES_DIALOG,
          data: {
            id: recordId,
            file_num: response.file_num,
          },
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function closeMergeRecordFileDialog() {
  return {
    type: CLOSE_MERGE_RECORD_FILES_DIALOG,
  };
}

export function mergeRecordFiles(form) {
  return (dispatch, getState) => {
    dispatch({
      type: MERGE_RECORD_FILE_INIT,
    });
    const { routeParams, searchText } = getState().recordsApp.records;
    const request = {
      id: form.id,
      merge_id: form.mergeId,
    };
    RecordServices.patchRecordFile('/merge-record', request)
      .then(() => dispatch({ type: MERGE_RECORD_FILE_SUCCESS }))
      .then(() => dispatch(closeMergeRecordFileDialog()))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Combinación de expedientes realizada con éxito!!!');
        dispatch(getRecords(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar combinar el expediente', 'error');
        dispatch({
          type: MERGE_RECORD_FILE_FAILURE,
        });
      });
  };
}
