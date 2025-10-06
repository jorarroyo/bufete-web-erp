import _ from '@lodash';
import {
  CLOSE_EDIT_ACTIVITY_DIALOG,
  CLOSE_NEW_ACTIVITY_DIALOG,
  GET_ACTIVITIES_FAILURE,
  GET_ACTIVITIES_INIT_REQUEST,
  GET_ACTIVITIES_SUCCESS,
  OPEN_EDIT_ACTIVITY_DIALOG,
  OPEN_NEW_ACTIVITY_DIALOG,
  SET_SEARCH_TEXT,
} from '../../types/activity.types';

const initialState = {
  entities: null,
  searchText: '',
  routeParams: {},
  activityDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  error: null,
  loading: false,
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_INIT_REQUEST: {
      return {
        ...state,
        entities: null,
        loading: true,
      };
    }
    case GET_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
        loading: false,
      };
    }
    case GET_ACTIVITIES_FAILURE: {
      return {
        ...state,
        entities: null,
        loading: false,
      };
    }
    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_NEW_ACTIVITY_DIALOG: {
      return {
        ...state,
        activityDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case CLOSE_NEW_ACTIVITY_DIALOG: {
      return {
        ...state,
        activityDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_EDIT_ACTIVITY_DIALOG: {
      return {
        ...state,
        activityDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_EDIT_ACTIVITY_DIALOG: {
      return {
        ...state,
        activityDialog: {
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

export default activityReducer;
