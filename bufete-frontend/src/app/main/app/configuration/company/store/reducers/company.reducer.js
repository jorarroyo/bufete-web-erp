import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
  entities: null,
  searchText: '',
  routeParams: {},
  companyDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  error: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_COMPANIES: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.OPEN_NEW_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case Actions.CLOSE_NEW_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_EDIT_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case Actions.CLOSE_EDIT_COMPANY_DIALOG: {
      return {
        ...state,
        companyDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.GET_COMPANIES_ERROR: {
      return {
        ...state,
        error: action.payload,
        entities: [],
      };
    }
    default:
      return state;
  }
};

export default companyReducer;
