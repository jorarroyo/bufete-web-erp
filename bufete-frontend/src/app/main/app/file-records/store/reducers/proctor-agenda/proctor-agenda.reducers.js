import {
  GET_PROCTOR_AGENDA_INIT_REQUEST,
  GET_PROCTOR_AGENDA_SUCCESS,
  GET_PROCTOR_AGENDA_FAILURE,
  SET_PROCTOR_AGENDA_SEARCH_CRITERIA,
  OPEN_CHANGE_STATE_DIALOG,
  CLOSE_CHANGE_STATE_DIALOG,
  OPEN_GET_ASSIGNED_ACTIVITIES_DIALOG,
  CLOSE_GET_ASSIGNED_ACTIVITIES_DIALOG,
  CHANGE_AGENDA_STATUS_INIT_REQUEST,
  CHANGE_AGENDA_STATUS_SUCCESS,
  CHANGE_AGENDA_STATUS_FAILURE,
} from '../../types/proctor-agenda/proctor-agenda.types';

const initialState = {
  data: [],
  searchText: '',
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  proctorAgendaDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  assignedActivitiesDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  statusFlow: [],
  loading: false,
};

const proctorAgendaReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_PROCTOR_AGENDA_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_PROCTOR_AGENDA_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_PROCTOR_AGENDA_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        routeParams: {
          page: 0,
          size: 0,
          order: 'desc',
        },
      };
    }
    case SET_PROCTOR_AGENDA_SEARCH_CRITERIA: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        proctorAgendaDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        proctorAgendaDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_GET_ASSIGNED_ACTIVITIES_DIALOG: {
      const { payload } = action;
      return {
        ...state,
        assignedActivitiesDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: {
            id: payload.id,
            assignDate: payload.assign_date,
            comment: payload.comment,
            status: payload.status,
            employeeId: payload.employee_id,
            employeeName: payload.employee_name,
            proctorAgendaCostLocal: payload.proctor_agenda_cost_local,
            proctorAgendaCostOuter: payload.proctor_agenda_cost_outer,
            agendaReturnAmountLocal: payload.agenda_return_amount_local,
            agendaReturnAmountOuter: payload.agenda_return_amount_outer,
            selectedActivities: payload.activity_list,
            selectedInovices: payload.invoice_list,
          },
        },
      };
    }
    case CLOSE_GET_ASSIGNED_ACTIVITIES_DIALOG: {
      return {
        ...state,
        assignedActivitiesDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: [],
        },
      };
    }
    case CHANGE_AGENDA_STATUS_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CHANGE_AGENDA_STATUS_SUCCESS:
    case CHANGE_AGENDA_STATUS_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default proctorAgendaReducer;
