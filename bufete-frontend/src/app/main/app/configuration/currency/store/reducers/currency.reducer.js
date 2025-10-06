import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
  entities: null,
  searchText: '',
  routeParams: {},
  selectedCurrency: null,
  currDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CURRENCIES: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
      };
    }
    case Actions.GET_CURRENCY: {
      return {
        ...state,
        selectedCurrency: action.payload,
      };
    }
    case Actions.REMOVE_CURRENCY_SELECTED: {
      return {
        ...state,
        selectedCurrency: null,
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.OPEN_NEW_CURRENCY_DIALOG: {
      return {
        ...state,
        currDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case Actions.CLOSE_NEW_CURRENCY_DIALOG: {
      return {
        ...state,
        currDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_EDIT_CURRENCY_DIALOG: {
      return {
        ...state,
        currDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case Actions.CLOSE_EDIT_CURRENCY_DIALOG: {
      return {
        ...state,
        currDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    default:
      return state;
  }
};

export default currencyReducer;
