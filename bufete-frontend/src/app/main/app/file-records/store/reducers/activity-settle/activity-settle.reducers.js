import * as Actions from '../../actions/activity-settle';

const initialState = {
  data: [],
  searchText: '',
};

const activitySettleReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_ACTIVITY_SETTLEMENT_SEARCH_CRITERIA: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default:
      return state;
  }
};

export default activitySettleReducer;
