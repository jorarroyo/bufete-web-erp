import * as Actions from '../../actions/stamp-duty';

const initialState = {
  data: [],
  searchText: '',
  stampDutyDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  reload: '',
  loadingRecord: false,
};

const stampDutyReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_STAMP_DUTY_SEARCH_CRITERIA: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.OPEN_ADD_STAMP_DUTY_DIALOG: {
      return {
        ...state,
        stampDutyDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case Actions.CLOSE_ADD_STAMP_DUTY_DIALOG: {
      return {
        ...state,
        stampDutyDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.REQUEST_SUCCESS: {
      return {
        ...state,
        loadingRecord: false,
      };
    }
    case Actions.REQUEST_INIT: {
      return {
        ...state,
        loadingRecord: true,
      };
    }
    case Actions.CREATE_STAMP_DUTY: {
      return {
        ...state,
        reload: action.payload,
      };
    }
    default:
      return state;
  }
};

export default stampDutyReducer;
