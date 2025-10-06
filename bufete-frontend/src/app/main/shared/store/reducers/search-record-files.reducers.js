import * as Actions from '../actions';

const initialState = {
  data: [],
  searchText: '',
};

const searchRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_RECORDS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default:
      return state;
  }
};

export default searchRecordsReducer;
