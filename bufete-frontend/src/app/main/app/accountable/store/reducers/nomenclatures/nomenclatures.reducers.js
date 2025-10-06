import {
  GET_NOMENCLATURE_FAILURE,
  GET_NOMENCLATURE_INIT_REQUEST,
  GET_NOMENCLATURE_SUCCESS,
  GET_NOMENCLATURES_FAILURE,
  GET_NOMENCLATURES_INIT_REQUEST,
  GET_NOMENCLATURES_SUCCESS,
  SAVE_NOMENCLATURE_FAILURE,
  SAVE_NOMENCLATURE_INIT_REQUEST,
  SAVE_NOMENCLATURE_SUCCESS,
} from '../../types/nomenclatures/nomenclatures.types';

const initialState = {
  dataList: [],
  entity: {},
  loading: false,
};

const nomenclaturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOMENCLATURES_INIT_REQUEST:
    case GET_NOMENCLATURE_INIT_REQUEST:
    case SAVE_NOMENCLATURE_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_NOMENCLATURES_FAILURE:
    case GET_NOMENCLATURE_FAILURE:
    case SAVE_NOMENCLATURE_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_NOMENCLATURES_SUCCESS: {
      return {
        ...state,
        dataList: action.payload,
        loading: false,
      };
    }
    case GET_NOMENCLATURE_SUCCESS: {
      return {
        ...state,
        entity: action.payload,
        loading: false,
      };
    }
    case SAVE_NOMENCLATURE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default nomenclaturesReducer;
