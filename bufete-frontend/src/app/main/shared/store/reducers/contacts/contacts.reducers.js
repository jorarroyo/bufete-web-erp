import {
  SET_INITIAL_DATA,
  CREATE_CONTACT,
  OPEN_CREATE_CONTACT_DIALOG,
  CLOSE_CREATE_CONTACT_DIALOG,
  OPEN_EDIT_CONTACT_DIALOG,
  DELETE_CONTACT,
} from '../../types/contacts/contacts.types';

const initialState = {
  data: null,
  contactsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: {},
  },
  loading: false,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case DELETE_CONTACT:
    case CREATE_CONTACT: {
      const newData = state.data.filter(s => s.id !== action.payload.id);
      return {
        ...state,
        data: [...newData, action.payload],
      };
    }
    case OPEN_CREATE_CONTACT_DIALOG: {
      return {
        ...state,
        contactsDialog: {
          type: 'new',
          props: {
            open: true,
          },
        },
      };
    }
    case OPEN_EDIT_CONTACT_DIALOG: {
      return {
        ...state,
        contactsDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case CLOSE_CREATE_CONTACT_DIALOG: {
      return {
        ...state,
        contactsDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: {},
        },
      };
    }
    default:
      return state;
  }
};

export default contactReducer;
