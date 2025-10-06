import { statusName } from 'app/constants/appConstant';
import RoleServices from 'app/services/configuration/roleService';
import notificationHandler from 'app/utils/errorHandler';
import {
  GET_ROLES_INIT_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  GET_ROLE,
  SET_SEARCH_TEXT,
  OPEN_NEW_ROLE_DIALOG,
  CLOSE_NEW_ROLE_DIALOG,
  OPEN_EDIT_ROLE_DIALOG,
  CLOSE_EDIT_ROLE_DIALOG,
  REMOVE_ROLE_SELECTED,
  ADD_ROLE,
  UPDATE_ROLE,
  REMOVE_ROLE,
} from '../types/role.types';

export function getRoles(routeParams) {
  return dispatch => {
    dispatch({
      type: GET_ROLES_INIT_REQUEST,
    });
    RoleServices.getRole('/list/', routeParams.id)
      .then(response =>
        dispatch({
          type: GET_ROLES_SUCCESS,
          payload: response,
          routeParams,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los roles', 'error');
        dispatch({
          type: GET_ROLES_FAILURE,
        });
      });
  };
}

export function getRoleById(id) {
  return dispatch =>
    RoleServices.getRole('/', id)
      .then(response =>
        dispatch({
          type: GET_ROLE,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos', 'error');
      });
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openNewRoleDialog() {
  return {
    type: OPEN_NEW_ROLE_DIALOG,
  };
}

export function closeNewRoleDialog() {
  return {
    type: CLOSE_NEW_ROLE_DIALOG,
  };
}

export function openEditRoleDialog(data) {
  return {
    type: OPEN_EDIT_ROLE_DIALOG,
    data,
  };
}

export function closeEditRoleDialog() {
  return {
    type: CLOSE_EDIT_ROLE_DIALOG,
  };
}

export function removeRoleSelected() {
  return {
    type: REMOVE_ROLE_SELECTED,
  };
}

export function addRole(newRole) {
  return (dispatch, getState) => {
    const { routeParams } = getState().roleApp.role;
    const request = {
      name: newRole.name,
      status: statusName.ACTIVO,
      parentId: newRole.parentId,
      options: newRole.options,
    };
    RoleServices.postRole('', request)
      .then(() =>
        Promise.all([
          dispatch({
            type: ADD_ROLE,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Role creado con éxito!!!');
          dispatch(getRoles(routeParams));
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear el role', 'error');
      });
  };
}

export function updateRole(role) {
  return (dispatch, getState) => {
    const { routeParams } = getState().roleApp.role;
    const request = {
      id: role.id,
      name: role.name,
      status: statusName.ACTIVO,
      parentId: role.parentId,
      options: role.options,
    };
    RoleServices.putRole('', request)
      .then(() =>
        Promise.all([
          dispatch({
            type: UPDATE_ROLE,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Rol actualizado con éxito!!!');
          dispatch(getRoles(routeParams));
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar actualizar el rol', 'error');
      });
  };
}

export function removeRole(roleId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().roleApp.role;
    RoleServices.deleteRole('/', roleId)
      .then(() =>
        dispatch({
          type: REMOVE_ROLE,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Rol eliminado con éxito!!!');
        dispatch(getRoles(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar el rol', 'error');
      });
  };
}
