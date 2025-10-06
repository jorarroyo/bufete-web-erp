import _ from '@lodash';
import { statusName } from 'app/constants/appConstant';
import * as Actions from '../actions';

const initialState = {
  entities: [],
  fileManagerDialog: {
    props: {
      open: false,
    },
    id: -1,
    type: -1,
    status: statusName.ACTIVO,
  },
};

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_FILES: {
      const { payload } = action;
      return {
        ...state,
        entities: _.keyBy(payload, 'id'),
      };
    }
    case Actions.OPEN_FILE_MANAGER_DIALOG: {
      const { id, type, status, data } = action.payload;
      return {
        ...state,
        entities: _.keyBy(data, 'id'),
        fileManagerDialog: {
          props: {
            open: true,
          },
          id,
          type,
          status,
        },
      };
    }
    case Actions.CLOSE_FILE_MANAGER_DIALOG: {
      return {
        ...state,
        entities: [],
        fileManagerDialog: {
          props: {
            open: false,
          },
          id: -1,
          type: -1,
        },
      };
    }
    default:
      return state;
  }
};

export default filesReducer;
