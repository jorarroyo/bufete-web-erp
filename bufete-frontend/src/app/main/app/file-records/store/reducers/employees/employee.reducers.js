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

const initialState = {
  data: null,
  departments: [],
  countries: [],
  loading: false,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_INIT_REQUEST:
    case SAVE_EMPLOYEE_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
      };
    }
    case SAVE_EMPLOYEE_SUCCESS:
    case GET_EMPLOYEE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          name: payload.name,
          last_name: payload.last_name,
          nit: payload.nit,
          igss: payload.igss,
          position: payload.position,
          amount_per_hour: payload.amount_per_hour,
          address: payload.address,
          home_phone: payload.home_phone,
          cel_phone: payload.cel_phone,
          civil_status: payload.civil_status,
          child_no: payload.child_no,
          academic_level: payload.academic_level,
          title: payload.title,
          village: payload.village,
          languages: payload.languages,
          employee_info_id: payload.personalInfoRequest.id,
          employee_sex_type: payload.personalInfoRequest.sex_type,
          employee_bday: payload.personalInfoRequest.bDay === null ? '' : payload.personalInfoRequest.bDay,
          employee_doc_type: payload.personalInfoRequest.doc_type === null ? '' : payload.personalInfoRequest.doc_type,
          employee_doc_num: payload.personalInfoRequest.doc_num,
          employee_doc_emmit: payload.personalInfoRequest.doc_emmit,
          contact_id: payload.contactRequest.id,
          contact_name: payload.contactRequest.contact_name,
          contact_address: payload.contactRequest.contact_address,
          contact_email: payload.contactRequest.contact_email,
          contact_phone: payload.contactRequest.contact_phone,
          employee_adminission: payload.employee_adminission,
        },
        loading: false,
      };
    }
    case SAVE_EMPLOYEE_FAILURE:
    case GET_EMPLOYEE_FAILURE: {
      return {
        ...state,
        data: null,
        loading: false,
      };
    }
    case NEW_EMPLOYEE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DEPARTMENTS_EMP: {
      return {
        ...state,
        departments: action.payload,
      };
    }
    case GET_COUNTRIES_EMP: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    default:
      return state;
  }
};

export default employeeReducer;
