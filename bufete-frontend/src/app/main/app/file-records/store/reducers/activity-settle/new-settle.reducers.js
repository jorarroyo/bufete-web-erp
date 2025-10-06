import * as Actions from '../../actions/activity-settle';

const initialState = {
  data: null,
  caseActivityDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  selectedActivities: [],
};

const newAgendaReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ACTIVITY_SETTLE:
    case Actions.ADD_ACTIVITY_SETTLE: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          assign_date: payload.assign_date,
          comment: payload.comment,
          status: payload.status,
          proctor_agenda_id: payload.proctor_agenda_id,
          invoice_num: payload.invoice_num,
          invoice_range: payload.invoice_range,
          invoice_name: payload.invoice_name,
          invoice_description: payload.invoice_description,
          invoice_total: payload.invoice_total,
          activity_list: payload.activity_list.map(assgn => ({
            activity_id: assgn.id,
            activity_cost: assgn.fieldValue,
          })),
        },
        selectedActivities: payload.activity_list,
      };
    }
    case Actions.NEW_ACTIVITY_SETTLE: {
      return {
        ...state,
        data: action.payload,
        selectedActivities: [],
      };
    }
    case Actions.OPEN_ADD_CASE_ACTIVITY_DIALOG: {
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
    case Actions.CLOSE_ADD_CASE_ACTIVITY_DIALOG: {
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
    case Actions.ASSIGN_CASE_ACTIVITIES: {
      return {
        ...state,
        selectedActivities: [...state.selectedActivities, ...action.payload],
      };
    }
    case Actions.REMOVE_CASE_ACTIVITY: {
      return {
        ...state,
        selectedActivities: state.selectedActivities.filter(selAct => selAct.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default newAgendaReducer;
