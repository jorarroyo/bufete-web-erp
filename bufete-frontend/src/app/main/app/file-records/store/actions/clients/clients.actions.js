import notificationHandler from 'app/utils/errorHandler';
import {
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_INIT_REQUEST,
  GET_CLIENTS_FAILURE,
  SET_CLIENTS_SEARCH_TEXT,
  DELETE_CLIENT,
} from '../../types/clients/clients.types';
import ClientServices from 'app/services/file-records/clientsService';

export function getClients(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_CLIENTS_INIT_REQUEST,
    });
    ClientServices.getAllClients(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_CLIENTS_SUCCESS,
          payload: response,
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los clientes', 'error');
        dispatch({
          type: GET_CLIENTS_FAILURE,
        });
      });
  };
}

export function setClientsSearchText(event) {
  return {
    type: SET_CLIENTS_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function deleteClient(clientId) {
  return (dispatch, getState) => {
    const { routeParams, searchText } = getState().clientsApp.clients;
    ClientServices.deleteClient('/', clientId)
      .then(() =>
        dispatch({
          type: DELETE_CLIENT,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Cliente eliminado con éxito!!!');
        dispatch(getClients(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar el cliente', 'error');
      });
  };
}
