import { 
  GET_PROCTOR_AGENDA_SUCCESS, 
  GET_PROCTOR_AGENDA_INIT_REQUEST,
  GET_PROCTOR_AGENDA_FAILURE,
  SAVE_PROCTOR_AGENDA_INIT_REQUEST,
  SAVE_PROCTOR_AGENDA_SUCCESS,
  SAVE_PROCTOR_AGENDA_FAILURE,
  NEW_PROCTOR_AGENDA,
  OPEN_ADD_CASE_ACTIVITY_DIALOG,
  CLOSE_ADD_CASE_ACTIVITY_DIALOG,
  ASSIGN_CASE_ACTIVITIES,
  REMOVE_CASE_ACTIVITY,
  OPEN_CHANGE_ACTIVITY_STATE_DIALOG,
  CLOSE_CHANGE_ACTIVITY_STATE_DIALOG,
  OPEN_ADD_ACTIVITY_SETTLE_DIALOG,
  CLOSE_ADD_ACTIVITY_SETTLE_DIALOG,
  GET_ACTIVITY_SETTLE,
  DELETE_ACTIVITY_SETTLE,
  RELOAD_DATA,
  CHANGE_ACTIVITY_RECORD_STATUS_SUCCESS,
  CHANGE_ACTIVITY_RECORD_STATUS_INIT_REQUEST,
  CHANGE_ACTIVITY_RECORD_STATUS_FAILURE,
  ADD_ACTIVITY_SETTLE_SUCCESS,
  ADD_ACTIVITY_SETTLE_INIT_REQUEST,
  ADD_ACTIVITY_SETTLE_FAILURE,
} from '../../types/proctor-agenda/new-agenda.types';

const initialState = {
  data: null,
  caseActivityDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  agendaDetailDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  activitySettleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
    proctorAgendaId: null,
  },
  selectedActivities: [],
  selectedReceipts: [],
  loading: false,
  reload: false,
};

const newAgendaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROCTOR_AGENDA_INIT_REQUEST:
    case SAVE_PROCTOR_AGENDA_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
      };
    }
    case GET_PROCTOR_AGENDA_SUCCESS:
    case SAVE_PROCTOR_AGENDA_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          assign_date: payload.assign_date,
          comment: payload.comment,
          status: payload.status,
          employee_id: payload.employee_id,
          employee_name: payload.employee_name,
          proctor_agenda_cost_local: payload.proctor_agenda_cost_local,
          proctor_agenda_cost_outer: payload.proctor_agenda_cost_outer,
          agenda_return_amount_local: payload.agenda_return_amount_local,
          agenda_return_amount_outer: payload.agenda_return_amount_outer,
          activity_list: payload.activity_list.map(assgn => assgn.id),
        },
        selectedActivities: payload.activity_list,
        loading: false,
      };
    }
    case GET_PROCTOR_AGENDA_FAILURE:
    case SAVE_PROCTOR_AGENDA_FAILURE: {
      return {
        ...state,
        data: null,
        loading: false,
      };
    }
    case NEW_PROCTOR_AGENDA: {
      return {
        ...state,
        data: action.payload,
        selectedActivities: [],
        selectedReceipts: [],
      };
    }
    case OPEN_ADD_CASE_ACTIVITY_DIALOG: {
      return {
        ...state,
        caseActivityDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case CLOSE_ADD_CASE_ACTIVITY_DIALOG: {
      return {
        ...state,
        caseActivityDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: [],
        },
      };
    }
    case ADD_ACTIVITY_SETTLE_INIT_REQUEST:
    case CHANGE_ACTIVITY_RECORD_STATUS_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case ADD_ACTIVITY_SETTLE_FAILURE:
    case CHANGE_ACTIVITY_RECORD_STATUS_FAILURE: {
      return {
        ...state,
        loading: false,
      }
    }
    case CHANGE_ACTIVITY_RECORD_STATUS_SUCCESS: {
      return {
        ...state,
        selectedActivities: action.payload,
        loading: false,
      };
    }
    case ASSIGN_CASE_ACTIVITIES: {
      return {
        ...state,
        selectedActivities: [...state.selectedActivities, ...action.payload],
      };
    }
    case REMOVE_CASE_ACTIVITY: {
      return {
        ...state,
        selectedActivities: state.selectedActivities.filter(selAct => selAct.id !== action.payload),
      };
    }
    case OPEN_CHANGE_ACTIVITY_STATE_DIALOG: {
      return {
        ...state,
        agendaDetailDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_CHANGE_ACTIVITY_STATE_DIALOG: {
      return {
        ...state,
        agendaDetailDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case GET_ACTIVITY_SETTLE:
    case DELETE_ACTIVITY_SETTLE:
    case ADD_ACTIVITY_SETTLE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        selectedReceipts: payload,
        loading: false,
      };
    }
    case OPEN_ADD_ACTIVITY_SETTLE_DIALOG: {
      return {
        ...state,
        activitySettleDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.payload,
          proctorAgendaId: action.proctorAgendaId,
        },
      };
    }
    case CLOSE_ADD_ACTIVITY_SETTLE_DIALOG: {
      return {
        ...state,
        activitySettleDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: [],
          proctorAgendaId: null,
        },
      };
    }
    case RELOAD_DATA: {
      return {
        ...state,
        reload: action.payload,
      };
    }
    default:
      return state;
  }
};

export default newAgendaReducer;
