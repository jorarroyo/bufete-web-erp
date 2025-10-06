import {
  GET_CLIENT_FAILURE,
  GET_CLIENT_INIT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_COUNTRIES,
  GET_DEPARTMENTS,
  NEW_CLIENT,
  SAVE_CLIENT_FAILURE,
  SAVE_CLIENT_INIT_REQUEST,
  SAVE_CLIENT_SUCCESS,
  RELOAD_DATA,
  OPEN_CLIENT_GROUP_DETAIL_DIALOG,
  EDIT_CLIENT_GROUP_DETAIL_DIALOG,
  CLOSE_CLIENT_GROUP_DETAIL_DIALOG,
  CREATE_CLIENT_GROUP_DETAIL, DELETE_CLIENT_GROUP_DETAIL,
} from '../../types/clients/client.types';

const initialState = {
  data: null,
  departments: [],
  countries: [],
  loading: false,
  reload: false,
  clientGroupDetailDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  clientGroupDetail: [],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENT_INIT_REQUEST:
    case SAVE_CLIENT_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        loading: true,
      };
    }
    case SAVE_CLIENT_SUCCESS:
    case GET_CLIENT_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: {
          id: payload.id,
          name: payload.name,
          last_name: payload.last_name || '',
          client_type: payload.client_type,
          nit: payload.nit,
          acronym: payload.acronym === null ? '' : payload.acronym,
          contacts: payload.contacts,
          addresses: payload.addresses,
          phones: payload.phones,
          client_info_id: payload.personalInfoRequest.id,
          client_sex_type: payload.personalInfoRequest.sex_type,
          client_bday: payload.personalInfoRequest.bDay,
          client_doc_type: payload.personalInfoRequest.doc_type === null ? '' : payload.personalInfoRequest.doc_type,
          client_doc_num: payload.personalInfoRequest.doc_num,
          client_doc_emmit: payload.personalInfoRequest.doc_emmit,
          client_lawyer: payload.personalInfoRequest.lawyer,
          client_lawyer_jr: payload.personalInfoRequest.lawyer_jr,
          client_lawyer_assistant: payload.personalInfoRequest.lawyer_assistant,
          client_observation: payload.personalInfoRequest.observation,
          child_list: payload.child_list || [],
        },
        loading: false,
      };
    }
    case SAVE_CLIENT_FAILURE:
    case GET_CLIENT_FAILURE: {
      return {
        ...state,
        data: null,
        loading: false,
      };
    }
    case NEW_CLIENT: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_DEPARTMENTS: {
      return {
        ...state,
        departments: action.payload,
      };
    }
    case GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case RELOAD_DATA: {
      return {
        ...state,
        reload: action.payload,
      };
    }
    case OPEN_CLIENT_GROUP_DETAIL_DIALOG: {
      return {
        ...state,
        clientGroupDetailDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case EDIT_CLIENT_GROUP_DETAIL_DIALOG: {
      return {
        ...state,
        clientGroupDetailDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_CLIENT_GROUP_DETAIL_DIALOG: {
      return {
        ...state,
        clientGroupDetailDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case CREATE_CLIENT_GROUP_DETAIL:
    case DELETE_CLIENT_GROUP_DETAIL: {
      const newData = state.clientGroupDetail.filter(s => s.id !== action.payload.id);
      return {
        ...state,
        clientGroupDetail: [...newData, action.payload],
      };
    }
    default:
      return state;
  }
};

export default clientReducer;
