import notificationHandler from 'app/utils/errorHandler';
import CommonServices from 'app/services/shared';
import helperFunctions from 'app/utils/helperFunc';
import EmployeeServices from 'app/services/file-records/employeesService';
import {
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_INIT_REQUEST,
  GET_EMPLOYEE_FAILURE,
  SAVE_EMPLOYEE_INIT_REQUEST,
  SAVE_EMPLOYEE_SUCCESS,
  SAVE_EMPLOYEE_FAILURE,
  NEW_EMPLOYEE,
  GET_DEPARTMENTS_EMP,
  GET_COUNTRIES_EMP,
} from '../../types/employees/employee.types';

const data = {
  id: '',
  name: '',
  last_name: '',
  nit: '',
  igss: '',
  address: '',
  home_phone: '',
  cel_phone: '',
  civil_status: '',
  child_no: 0,
  employee_info_id: '',
  employee_sex_type: '',
  employee_bday: '',
  employee_doc_type: '',
  employee_doc_num: '',
  employee_doc_emmit: '',
  academic_level: '',
  title: '',
  village: '',
  languages: '',
  contact_name: '',
  contact_address: '',
  contact_email: '',
  contact_phone: '',
  position: '',
  amount_per_hour: 0,
  employee_adminission: '',
};

export function getEmployee(employeeId) {
  return dispatch => {
    dispatch({
      type: GET_EMPLOYEE_INIT_REQUEST,
    });
    EmployeeServices.getEmployee('/', employeeId)
      .then(response =>
        dispatch({
          type: GET_EMPLOYEE_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los empleados', 'error');
        dispatch({
          type: GET_EMPLOYEE_FAILURE,
        });
      });
  };
}

function validateRequiredFields(form) {
  return (
    form.name.length > 0 &&
    form.last_name.length > 0 &&
    form.address.length > 0 &&
    form.home_phone.length > 0 &&
    form.cel_phone.length > 0 &&
    form.nit.length > 0 &&
    form.contact_name.length > 0 &&
    form.contact_address.length > 0 &&
    form.contact_email.length > 0 &&
    form.contact_phone.length > 0 &&
    form.position !== ''
  );
}

export function saveEmployee(form) {
  return dispatch => {
    if (!validateRequiredFields(form)) {
      notificationHandler.infoMessage(dispatch, 'Debe ingresar todos los campos obligatorios', 'warning');
      return;
    }
    dispatch({
      type: SAVE_EMPLOYEE_INIT_REQUEST,
    });
    const request = {
      id: form.id,
      nit: form.nit,
      personalInfoRequest: {
        id: form.employee_info_id,
        bDay: helperFunctions.reFormatDate(form.employee_bday),
        lawyer: form.employee_lawyer,
        observation: form.observation,
        sex_type: form.employee_sex_type,
        doc_type: form.employee_doc_type,
        doc_num: form.employee_doc_num,
        doc_emmit: form.employee_doc_emmit,
      },
      contactRequest: {
        id: form.contact_id,
        contact_name: form.contact_name,
        contact_address: form.contact_address,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
      },
      name: form.name,
      last_name: form.last_name,
      igss: form.igss,
      address: form.address,
      home_phone: form.home_phone,
      cel_phone: form.cel_phone,
      civil_status: form.civil_status,
      child_no: form.child_no,
      academic_level: form.academic_level,
      title: form.title,
      village: form.village,
      languages: form.languages,
      position: form.position,
      amount_per_hour: form.amount_per_hour,
      employee_adminission: helperFunctions.reFormatDate(form.employee_adminission),
    };
    EmployeeServices.postEmployee('', request)
      .then(response =>
        dispatch({
          type: SAVE_EMPLOYEE_SUCCESS,
          payload: response,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Empleado almacenado con éxito!!!');
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear el empleado', 'error');
        dispatch({
          type: SAVE_EMPLOYEE_FAILURE,
        });
      });
  };
}

export function newEmployee() {
  return {
    type: NEW_EMPLOYEE,
    payload: data,
  };
}

export function getDepartmentsEmp() {
  const request = CommonServices.getDepartments();
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_DEPARTMENTS_EMP,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function getCountriesEmp() {
  const request = CommonServices.getCountries();
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_COUNTRIES_EMP,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}
