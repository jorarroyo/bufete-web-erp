import * as Actions from '../actions';

const initialState = {
  success: false,
  error: {
    username: null,
    password: null,
    // companyId: null,
  },
  loading: false,
};

const login = function(state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIN_INIT_REQUEST: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case Actions.LOGIN_SUCCESS: {
      return {
        ...initialState,
        success: true,
        loading: false,
      };
    }
    case Actions.LOGIN_ERROR: {
      return {
        success: false,
        error: action.payload,
        loading: false,
      };
    }
    case Actions.LOGOUT_SUCCESS: {
      return {
        ...state,
        success: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
