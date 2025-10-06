import {
  GET_RECORD_FILE_FAILURE,
  GET_RECORD_FILE_INIT_REQUEST,
  GET_RECORD_FILE_SUCCESS,
  GET_SUB_TYPE_RECORD,
  GET_TYPE_RECORD,
  NEW_RECORD_FILE,
  SAVE_RECORD_FILE_FAILURE,
  SAVE_RECORD_FILE_INIT_REQUEST,
  SAVE_RECORD_FILE_SUCCESS,
} from '../../types/records/record.types';

const initialState = {
  data: null,
  types: [],
  subtypes: [],
  loading: false,
};

const recordFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECORD_FILE_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
      };
    }
    case GET_RECORD_FILE_FAILURE:
    case SAVE_RECORD_FILE_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SAVE_RECORD_FILE_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_RECORD_FILE_SUCCESS:
    case GET_RECORD_FILE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          type: payload.type,
          sub_type: payload.sub_type,
          subject: payload.subject,
          observations: payload.observations,
          opening_date: payload.opening_date,
          closing_date: payload.closing_date,
          location: payload.location,
          file_num: payload.file_num,
          client_id: payload.client_id,
          lawyer_id: payload.lawyer_id,
          admon_id: payload.admon_id,
          confidential: payload.confidential,
          status: payload.status,
          priority: payload.priority,
          judgement_no: payload.judgement_no,
          message: payload.message,
        },
        loading: false,
      };
    }
    case NEW_RECORD_FILE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_TYPE_RECORD: {
      return {
        ...state,
        types: action.payload,
      };
    }
    case GET_SUB_TYPE_RECORD: {
      return {
        ...state,
        subtypes: action.payload,
      };
    }
    default:
      return state;
  }
};

export default recordFileReducer;
