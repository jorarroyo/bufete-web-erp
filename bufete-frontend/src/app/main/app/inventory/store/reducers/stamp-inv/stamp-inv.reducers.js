import {
  GET_STAMP_INV_REQUEST_INIT,
  GET_STAMP_INV_SUCCESS,
  GET_STAMP_INV_FAILURE,
  SET_STAMP_INV_SEARCH_CRITERIA,
  OPEN_CHANGE_STATE_DIALOG,
  CLOSE_CHANGE_STATE_DIALOG,
  GET_STATUS_FLOW,
  OPEN_RETURN_STAMP_OPTIONS_DIALOG,
  CLOSE_RETURN_STAMP_OPTIONS_DIALOG,
  SAVE_STAMP_INV_RETURN_INIT_REQUEST,
  SAVE_STAMP_INV_RETURN_SUCCESS,
  SAVE_STAMP_INV_RETURN_FAILURE
} from '../../types/stamp-inv/stamp-inv.types';

const initialState = {
  data: [],
  searchText: '',
  stampReturnDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: [],
    productList: [],
    recordId: null,
    loadingDialog: false,
  },
  routeParams: {
    page: 0,
    size: 0,
    order: 'desc',
  },
  changeStatusDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  statusFlow: [],
  loading: false,
};

const stampInvReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_STAMP_INV_RETURN_INIT_REQUEST:
    case GET_STAMP_INV_REQUEST_INIT: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }
    case SAVE_STAMP_INV_RETURN_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
      };
    }
    case SAVE_STAMP_INV_RETURN_SUCCESS:
    case GET_STAMP_INV_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        routeParams: action.routeParams,
      };
    }
    case GET_STAMP_INV_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        routeParams: {
          page: 0,
          size: 0,
          order: 'desc',
        },
      };
    }
    case SET_STAMP_INV_SEARCH_CRITERIA: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case OPEN_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        changeStatusDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_CHANGE_STATE_DIALOG: {
      return {
        ...state,
        changeStatusDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case GET_STATUS_FLOW: {
      return {
        ...state,
        statusFlow: action.payload,
      };
    }
    case OPEN_RETURN_STAMP_OPTIONS_DIALOG: {
      const currentRequest = action.payload.data[0];
      const productList = action.payload.data[1];
      return {
        ...state,
        stampReturnDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: {
            ...currentRequest,
            reference: '',
            detail_list: currentRequest.detail_list.map(prd => ({
              id: null,
              product_id: prd.product_id,
              unit_value: prd.unit_value,
              quantity_request: 0,
              limit: prd.quantity_request,
              status: prd.status,
            })),
          },
          productList: productList
          .map(prd => {
            const existingProd = currentRequest.detail_list.find(dta => dta.product_id === prd.id);
            if (existingProd) {
              return {
                ...prd,
                quantity_request: 0,
                limit: existingProd.quantity_request,
              };
            }
            return {
              ...prd,
              quantity_request: 0,
              limit: 0,
            };
          }).filter(s => s.limit > 0),
        },
      };
    }
    case CLOSE_RETURN_STAMP_OPTIONS_DIALOG: {
      return {
        ...state,
        stampReturnDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: [],
          productList: [],
        },
      };
    }
    default:
      return state;
  }
};

export default stampInvReducer;
