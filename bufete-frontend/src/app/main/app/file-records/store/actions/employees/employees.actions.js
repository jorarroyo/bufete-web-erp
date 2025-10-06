import EmployeeServices from 'app/services/file-records/employeesService';
import notificationHandler from 'app/utils/errorHandler';
import {
  GET_EMPLOYEES_INIT_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  SET_EMPLOYEES_SEARCH_TEXT,
  DELETE_EMPLOYEE,
} from '../../types/employees/employees.types';

export function getEmployees(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_EMPLOYEES_INIT_REQUEST,
    });
    EmployeeServices.getAllEmployees(page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_EMPLOYEES_SUCCESS,
          payload: response,
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los empleados', 'error');
        dispatch({
          type: GET_EMPLOYEES_FAILURE,
        });
      });
  };
}

export function setEmployeesSearchText(event) {
  return {
    type: SET_EMPLOYEES_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function deleteEmployee(employeeId) {
  return (dispatch, getState) => {
    const { routeParams, searchText } = getState().employeesApp.employees;
    EmployeeServices.postEmployee('/delete', employeeId)
      .then(() =>
        dispatch({
          type: DELETE_EMPLOYEE,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Empleado eliminado con éxito!!!');
        dispatch(getEmployees(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar el empleado', 'error');
      });
  };
}
