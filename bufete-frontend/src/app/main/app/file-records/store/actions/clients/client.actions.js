import ClientServices from 'app/services/file-records/clientsService';
import CommonServices from 'app/services/shared';
import notificationHandler from 'app/utils/errorHandler';
import helperFunctions from 'app/utils/helperFunc';
import { statusName } from 'app/constants/appConstant';
import {
  GET_CLIENT_FAILURE,
  GET_CLIENT_INIT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_COUNTRIES,
  GET_DEPARTMENTS,
  NEW_CLIENT,
  SAVE_CLIENT_FAILURE,
  SAVE_CLIENT_INIT_REQUEST,
  SAVE_CLIENT_SUCCESS,
  RELOAD_DATA,
  OPEN_CLIENT_GROUP_DETAIL_DIALOG,
  EDIT_CLIENT_GROUP_DETAIL_DIALOG,
  CLOSE_CLIENT_GROUP_DETAIL_DIALOG, DELETE_CLIENT_GROUP_DETAIL, CREATE_CLIENT_GROUP_DETAIL,
} from '../../types/clients/client.types';
import StatusName from '../../../../../shared/StatusName';

const data = {
  id: '',
  name: '',
  lastname: '',
  client_type: -1,
  nit: '',
  acronym: '',
  contacts: [],
  addresses: [],
  phones: [],
  client_group_detail: [],
  client_sex_type: '',
  client_bday: '',
  client_doc_type: '',
  client_doc_num: '',
  client_doc_emmit: '',
  client_lawyer: '',
  client_lawyer_jr: '',
  client_lawyer_assistant: '',
  client_observation: '',
  child_list: [],
};

const newClientGroupDetail = {
  id: '',
  name: '',
  nit: '',
  status: statusName.ACTIVO,
};

export function getClient(clientId) {
  return dispatch => {
    dispatch({
      type: GET_CLIENT_INIT_REQUEST,
    });
    ClientServices.getClient('/', clientId)
      .then(response =>
        dispatch({
          type: GET_CLIENT_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los clientes', 'error');
        dispatch({
          type: GET_CLIENT_FAILURE,
        });
      });
  };
}

function validateRequiredFields(form) {
  if (form.client_type === '') {
    return false;
  }
  if (form.client_type === 2) {
    return (
      form.name.length > 0 && form.last_name.length > 0 && form.nit.length > 0 && form.addresses.length > 0 // &&
      // form.phones.length > 0 &&
      // form.contacts.length > 0
    );
  }
  return form.name.length > 0 && form.nit.length > 0 && form.addresses.length > 0; // && form.phones.length > 0 && form.contacts.length > 0;
}

export function saveClient(form) {
  return dispatch => {
    if (!validateRequiredFields(form)) {
      notificationHandler.infoMessage(dispatch, 'Debe ingresar todos los campos obligatorios', 'warning');
      return;
    }
    dispatch({
      type: SAVE_CLIENT_INIT_REQUEST,
    });
    const request = {
      id: form.id,
      name: form.name,
      nit: form.nit,
      acronym: form.acronym,
      contacts: form.contacts.map(cont => {
        return {
          ...cont,
          id: typeof cont.id === 'string' ? null : cont.id,
        };
      }),
      addresses: form.addresses,
      phones: form.phones,
      personalInfoRequest: {
        id: form.client_info_id,
        bDay: helperFunctions.reFormatDate(form.client_bday),
        lawyer: form.client_lawyer,
        lawyer_jr: form.client_lawyer_jr,
        lawyer_assistant: form.client_lawyer_assistant,
        observation: form.observation,
        sex_type: form.client_sex_type,
        doc_type: form.client_doc_type,
        doc_num: form.client_doc_num,
        doc_emmit: form.client_doc_emmit,
      },
      last_name: form.last_name,
      client_type: form.client_type,
      child_list: form.child_list || [],
    };
    ClientServices.postClient('', request)
      .then(response =>
        dispatch({
          type: SAVE_CLIENT_SUCCESS,
          payload: response,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cliente almacenado con éxito!!!');
        dispatch(reloadData(true));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear el cliente', 'error');
        dispatch({
          type: SAVE_CLIENT_FAILURE,
        });
      });
  };
}

export function newClient() {
  return {
    type: NEW_CLIENT,
    payload: data,
  };
}

export function getDepartments() {
  const request = CommonServices.getDepartments();
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_DEPARTMENTS,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function getCountries() {
  const request = CommonServices.getCountries();
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_COUNTRIES,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function reloadData(reload) {
  return {
    type: RELOAD_DATA,
    payload: reload,
  };
}

export function openClientGroupDetailDialog() {
  return {
    type: OPEN_CLIENT_GROUP_DETAIL_DIALOG,
    data: newClientGroupDetail,
  };
}

export function editClientGroupDetailDialog(record) {
  return {
    type: EDIT_CLIENT_GROUP_DETAIL_DIALOG,
    data: record,
  };
}

export function closeClientGroupDetailDialog() {
  return {
    type: CLOSE_CLIENT_GROUP_DETAIL_DIALOG,
  };
}

export function deleteClientGroupDetail(id) {
  return (dispatch, getState) => {
    const { clientGroupDetail } = getState().clientsApp.client;
    const clientGroupDetailLine = clientGroupDetail.find(s => s.id === id);
    clientGroupDetailLine.status = StatusName.ELIMINADO;
    dispatch({
      type: DELETE_CLIENT_GROUP_DETAIL,
      payload: clientGroupDetailLine,
    });
  };
}

export function createClientGroupDetail(entity) {
  return (dispatch, getState) => {
    const { clientGroupDetail } = getState().clientsApp.client;
    const clientGroupDetailLine = clientGroupDetail.find(s => s.id === entity.id);
    const newClientGroupDetails = {
      ...clientGroupDetailLine,
      id: entity.id,
      name: entity.name,
      nit: entity.nit,
      status: entity.status,
    };
    dispatch({
      type: CREATE_CLIENT_GROUP_DETAIL,
      payload: newClientGroupDetails,
    });
  };
}
