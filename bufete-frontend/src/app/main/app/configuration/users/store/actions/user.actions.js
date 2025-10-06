import { EmployeesConstants, loginConstant } from 'app/constants/appConstant';
import UserServices from 'app/services/configuration/userService';
import EmployeeServices from 'app/services/file-records/employeesService';
import notificationHandler from 'app/utils/errorHandler';
import {
  ADD_USER,
  CLOSE_EDIT_ASSIGN_DIALOG,
  CLOSE_EDIT_USER_DIALOG,
  CLOSE_NEW_USER_DIALOG,
  CLOSE_RESET_PASS_DIALOG,
  GET_USERS_FAILURE,
  GET_USERS_INIT_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  OPEN_EDIT_ASSIGN_DIALOG,
  OPEN_EDIT_USER_DIALOG,
  OPEN_NEW_USER_DIALOG,
  OPEN_RESET_PASS_DIALOG,
  REMOVE_USER,
  REMOVE_USER_SELECTED,
  SAVE_ASSIGN_ROLE,
  SAVE_RESET_PASS,
  SET_SEARCH_TEXT,
  UPDATE_USER,
} from '../types/user.types';

export function getUsers(routeParams) {
  return dispatch => {
    dispatch({
      type: GET_USERS_INIT_REQUEST,
    });
    UserServices.getUser('/list/', routeParams.id)
      .then(response =>
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: response,
          routeParams,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los usuarios', 'error');
        dispatch({
          type: GET_USERS_FAILURE,
        });
      });
  };
}

export function getUserById(id) {
  return dispatch => {
    UserServices.getUser('/', id)
      .then(response =>
        dispatch({
          type: GET_USER_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos del usuario', 'error');
      });
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openNewUserDialog() {
  return {
    type: OPEN_NEW_USER_DIALOG,
  };
}

export function closeNewUserDialog() {
  return {
    type: CLOSE_NEW_USER_DIALOG,
  };
}

export function openEditUserDialog(data) {
  return {
    type: OPEN_EDIT_USER_DIALOG,
    data,
  };
}

export function closeEditUserDialog() {
  return {
    type: CLOSE_EDIT_USER_DIALOG,
  };
}

export function removeUserSelected() {
  return {
    type: REMOVE_USER_SELECTED,
  };
}

export function addUser(newUser) {
  return (dispatch, getState) => {
    const { routeParams } = getState().userApp.user;
    const request = {
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      employee_id: newUser.employee_id,
    };
    UserServices.postUser('/signup', request)
      .then(() =>
        dispatch({
          type: ADD_USER,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Usuario creado con éxito!!!');
        dispatch(getUsers(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear el nuevo usuario', 'error');
      });
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
  };
}

export function removeUser(userId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().userApp.user;
    UserServices.deleteUser(userId)
      .then(() =>
        dispatch({
          type: REMOVE_USER,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Usuario eliminado con éxito!!!');
        dispatch(getUsers(routeParams));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar el usuario', 'error');
      });
  };
}

export function checkUsernameAvailability(username) {
  return UserServices.checkUsernameAvailability(username);
}

export function checkEmailAvailability(email) {
  return UserServices.checkEmailAvailability(email);
}

export function openEditUserAssignDialog(id) {
  return dispatch =>
    UserServices.getUser('/assign/', id)
      .then(response =>
        dispatch({
          type: OPEN_EDIT_ASSIGN_DIALOG,
          payload: { userId: id, data: response.map(dat => dat.role_id) },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los datos', 'error');
      });
}

export function closeEditUserAssignDialog() {
  return {
    type: CLOSE_EDIT_ASSIGN_DIALOG,
  };
}

export function addUserAssign(userId, roleAssigned) {
  return dispatch => {
    const request = {
      user_id: userId,
      company_id: loginConstant.DEFAULT_COMPANY,
      roles_id: roleAssigned,
    };
    UserServices.postUser('/assign', request)
      .then(() =>
        dispatch({
          type: SAVE_ASSIGN_ROLE,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Asignación de roles a usuario creado con éxito!!!');
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar asignar los roles', 'error');
      });
  };
}

export function openResetPasswordDialog(userId) {
  return {
    type: OPEN_RESET_PASS_DIALOG,
    payload: userId,
  };
}

export function closeResetPasswordDialog() {
  return {
    type: CLOSE_RESET_PASS_DIALOG,
  };
}

export function resetPassword(resetPass) {
  return dispatch => {
    const request = {
      id: resetPass.user_id,
      password: resetPass.password,
    };
    UserServices.postUser('/reset_pass', request)
      .then(() =>
        dispatch({
          type: SAVE_RESET_PASS,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Clave de usuario reseteada con éxito!!!');
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar resetear la clave del usuario', 'error');
      });
  };
}

export function obtainEmployees() {
  try {
    return EmployeeServices.getEmployeesByPosition([EmployeesConstants.ADMON, EmployeesConstants.LAWYER]);
  } catch (error) {
    return [];
  }
}
