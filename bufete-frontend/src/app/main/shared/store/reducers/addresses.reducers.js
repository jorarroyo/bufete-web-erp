import * as Actions from '../actions';

const initialState = {
  data: [],
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_DEPARTMENTS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};

export default addressReducer;
