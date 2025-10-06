import axios from 'app/utils/axiosConfig';
import config from 'app/config';
import notificationHandler from 'app/utils/errorHandler';
import { statusName } from 'app/constants/appConstant';

export const GET_FILES = '[FILE MANAGER APP] GET FILES';
export const ADD_FILE = '[FILE MANAGER APP] ADD FILE';
export const REMOVE_FILE = '[FILE MANAGER APP] REMOVE FILE';
export const OPEN_FILE_MANAGER_DIALOG = '[FILE MANAGER APP] OPEN FILE MANAGER DIALOG';
export const CLOSE_FILE_MANAGER_DIALOG = '[FILE MANAGER APP] CLOSE FILE MANAGER DIALOG';

export function getFiles(recordId, type) {
  const { baseUrl, endpoint } = config.getFiles;
  const url = `${baseUrl}${endpoint}/files/${recordId}/${type}`;
  const request = axios.get(url);

  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_FILES,
          payload: response.data,
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
}

export function uploadFile(file, recordId, type) {
  const { baseUrl, endpoint } = config.getFiles;
  const url = `${baseUrl}${endpoint}/upload`;

  const formData = new FormData();
  formData.append('archivo', file);
  formData.append('id', recordId);
  formData.append('type', type);

  return dispatch => {
    const request = axios.post(url, formData);
    return request
      .then(response =>
        Promise.all([
          dispatch({
            type: ADD_FILE,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, response.data.message);
          dispatch(getFiles(recordId, type));
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function removeFile(fileId) {
  const { baseUrl, endpoint } = config.getFiles;
  const url = `${baseUrl}${endpoint}/${fileId}`;

  return (dispatch, getState) => {
    const { id, type } = getState().fileManagerApp.files.fileManagerDialog;
    const request = axios.delete(url);
    return request
      .then(response =>
        Promise.all([
          dispatch({
            type: REMOVE_FILE,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, response.data.message);
          if (id || id !== -1) {
            dispatch(getFiles(id, type));
          }
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function openFileManagerDialog(id, type, status = statusName.ACTIVO) {
  const { baseUrl, endpoint } = config.getFiles;
  const url = `${baseUrl}${endpoint}/files/${id}/${type}`;
  const request = axios.get(url);

  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: OPEN_FILE_MANAGER_DIALOG,
          payload: {
            id,
            type,
            status,
            data: response.data,
          },
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
}

export function closeFileManagerDialog() {
  return {
    type: CLOSE_FILE_MANAGER_DIALOG,
  };
}
