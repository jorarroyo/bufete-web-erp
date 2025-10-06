import {
  GET_STAMP_MOV_INIT_REQUEST,
  GET_STAMP_MOV_SUCCESS,
  GET_STAMP_MOV_FAILURE,
  SET_STAMP_MOV_SEARCH_CRITERIA,
} from '../../types/stamp-mov/stamp-mov.types';

const initialState = {
  data: [],
  searchText: '',
  loading: false,
};

const stampMovReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAMP_MOV_FAILURE:
    case GET_STAMP_MOV_INIT_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case GET_STAMP_MOV_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case SET_STAMP_MOV_SEARCH_CRITERIA: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    default:
      return state;
  }
};

export default stampMovReducer;
