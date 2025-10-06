import { statusName } from 'app/constants/appConstant';
import {
  ADD_STAMP_INV,
  CLOSE_ADD_STAMP_INV_DIALOG,
  GET_STAMP_INV_FAILURE,
  GET_STAMP_INV_INIT_REQUEST,
  GET_STAMP_INV_SUCCESS,
  NEW_STAMP_INV,
  OPEN_ADD_STAMP_INV_DIALOG,
  REMOVE_STAMP_INV,
  SAVE_STAMP_INV_FAILURE,
  SAVE_STAMP_INV_INIT_REQUEST,
  SAVE_STAMP_INV_SUCCESS,
} from '../../types/stamp-inv/new-stamp-inv.types';

const initialState = {
  data: null,
  searchText: '',
  stampInvDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  product_list: [],
  loading: false,
};

const newStampInvReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ADD_STAMP_INV_DIALOG: {
      return {
        ...state,
        stampInvDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case CLOSE_ADD_STAMP_INV_DIALOG: {
      return {
        ...state,
        stampInvDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case GET_STAMP_INV_FAILURE:
    case GET_STAMP_INV_INIT_REQUEST:
    case SAVE_STAMP_INV_INIT_REQUEST: {
      return {
        ...state,
        data: null,
        product_list: [],
        loading: true,
      };
    }
    case GET_STAMP_INV_SUCCESS:
    case SAVE_STAMP_INV_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data: {
          id: data.id,
          request_type: data.request_type, // data.status === statusName.PENDIENTE ? RequestType.SALIDA : data.request_type,
          requester_id: data.requester_id,
          request_date: data.request_date,
          reference: data.reference,
          file_record_id: data.file_record_id,
          file_num: data.file_num,
          total: data.total,
          status: data.status,
          receipt_number: data.receipt_number || '',
          detail_list: data.detail_list.map(prod => ({
            id: prod.id,
            product_id: prod.product_id,
            quantity_request: prod.quantity_request,
            status: prod.status,
          })),
        },
        product_list: data.detail_list.map(dataProd => ({
          id: dataProd.id,
          status: dataProd.status,
          inventory_id: dataProd.inventory_id,
          product_id: dataProd.product_id,
          product_code: dataProd.product_code,
          product_name: dataProd.product_name,
          unit_value: dataProd.unit_value,
          min_quantity: dataProd.min_quantity,
          product_existence: dataProd.product_existence,
          quantity: dataProd.quantity_request,
        })),
        loading: false,
      };
    }
    case SAVE_STAMP_INV_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case NEW_STAMP_INV: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        product_list: [],
      };
    }
    case ADD_STAMP_INV: {
      let newStamp = action.payload;
      const previousStamp = state.product_list.find(prd => prd.product_id === newStamp.product_id);
      const currentProdList = state.product_list.filter(prd => prd.product_id !== newStamp.product_id);
      if (previousStamp) {
        newStamp = {
          ...previousStamp,
          quantity: newStamp.quantity,
        };
      }
      return {
        ...state,
        product_list: [...currentProdList, newStamp],
      };
    }
    case REMOVE_STAMP_INV: {
      // const currentProdList = state.product_list.filter(prd => prd.id !== action.payload);
      const currentProdList = state.product_list.map(prd => {
        if (prd.product_id === action.payload) {
          return {
            ...prd,
            status: statusName.DELETED,
          };
        }
        return prd;
      });
      return {
        ...state,
        product_list: currentProdList,
      };
    }
    default:
      return state;
  }
};

export default newStampInvReducer;
