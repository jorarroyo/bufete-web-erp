import {
  GET_STAMP_INV_OPTION_INIT_REQUEST,
  GET_STAMP_INV_OPTION_SUCCESS,
  GET_STAMP_INV_OPTION_FAILURE,
  OPEN_STAMP_REPORT_DIALOG,
  OPEN_EDIT_STAMP_OPTIONS_DIALOG,
  OPEN_CHANGE_STATE_OPT_DIALOG,
  OPEN_STAMP_OPTIONS_DIALOG,
  CLOSE_STAMP_OPTIONS_DIALOG,
  SAVE_STAMP_INV_OPT_INIT_REQUEST,
  SAVE_STAMP_INV_OPT_SUCCESS,
  SAVE_STAMP_INV_OPT_FAILURE,
  CLOSE_STAMP_REPORT_DIALOG,
  CLOSE_CHANGE_STATE_OPT_DIALOG,
  GET_STATUS_FLOW, OPEN_MOVE_TO_RECORD_FILES_DIALOG, CLOSE_MOVE_TO_RECORD_FILES_DIALOG,
} from '../../types/stamp-inv-opt/stamp-inv-opt.types';
import { statusName } from 'app/constants/appConstant';

const initialState = {
  dataOption: null,
  stampOptionsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: [],
    productList: [],
    recordId: null,
  },
  reportDialog: {
    props: {
      open: false,
    },
    data: [],
    headers: [],
  },
  changeStatusDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  moveToRecordFileDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  product_list: [],
  loading: false,
  recordId: null,
};

const stampInvOptReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_STAMP_INV_OPT_INIT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_STAMP_INV_OPT_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data: {
          id: data.id,
          request_type: data.request_type, // data.status === statusName.PENDIENTE ? RequestType.SALIDA : data.request_type,
          requester_id: data.requester_id,
          request_date: data.request_date_original,
          reference: data.reference,
          file_record_id: data.file_record_id,
          file_num: data.file_num,
          total: data.total,
          status: data.status,
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
    case SAVE_STAMP_INV_OPT_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_STAMP_INV_OPTION_INIT_REQUEST: {
      return {
        ...state,
        dataOption: [],
        loading: true,
        recordId: null,
      };
    }
    case GET_STAMP_INV_OPTION_SUCCESS: {
      return {
        ...state,
        dataOption: action.payload,
        loading: false,
        recordId: action.recordId,
      };
    }
    case GET_STAMP_INV_OPTION_FAILURE: {
      return {
        ...state,
        dataOption: [],
        loading: false,
        recordId: null,
      };
    }
    case OPEN_STAMP_REPORT_DIALOG: {
      // const newHeader = ['No. Tx', 'Fecha', 'Solicitante', 'No. Exp.', 'Cliente', 'Referencia', 'Total'];
      return {
        ...state,
        reportDialog: {
          props: {
            open: true,
          },
          data: action.payload.data,
          headers: action.payload.headers, // newHeader.concat(action.payload.headers),
        },
      };
    }
    case OPEN_EDIT_STAMP_OPTIONS_DIALOG: {
      const currentRequest = action.payload.data[0];
      const productList = action.payload.data[1];
      const id = action.payload.recordId;
      return {
        ...state,
        stampOptionsDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: {
            ...currentRequest,
            detail_list: currentRequest.detail_list.map(prd => ({
              id: prd.id,
              product_id: prd.product_id,
              quantity_request: prd.quantity_request,
              status: prd.status,
            })),
          },
          productList: productList.map(prd => {
            const existingProd = currentRequest.detail_list.find(dta => dta.product_id === prd.id);
            if (existingProd) {
              return {
                ...prd,
                quantity_request: existingProd.quantity_request,
              };
            }
            return {
              ...prd,
              quantity_request: 0,
            };
          }),
          recordId: id,
        },
      };
    }
    case OPEN_CHANGE_STATE_OPT_DIALOG: {
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
    case CLOSE_CHANGE_STATE_OPT_DIALOG: {
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
    case OPEN_STAMP_OPTIONS_DIALOG: {
      return {
        ...state,
        stampOptionsDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.payload.data.map(prd => ({
            id: null,
            product_id: prd.id,
            quantity_request: 0,
            status: statusName.ACTIVO,
          })),
          productList: action.payload.data.map(prd => ({
            ...prd,
            quantity_request: 0,
          })),
          recordId: action.payload.id,
        },
      };
    }
    case CLOSE_STAMP_OPTIONS_DIALOG: {
      return {
        ...state,
        stampOptionsDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: [],
          productList: [],
          recordId: null,
        },
      };
    }
    case CLOSE_STAMP_REPORT_DIALOG: {
      return {
        ...state,
        reportDialog: {
          props: {
            open: false,
          },
          data: [],
          headers: [],
        },
      };
    }
    case GET_STATUS_FLOW: {
      return {
        ...state,
        statusFlow: action.payload,
      };
    }
    case OPEN_MOVE_TO_RECORD_FILES_DIALOG: {
      return {
        ...state,
        moveToRecordFileDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case CLOSE_MOVE_TO_RECORD_FILES_DIALOG: {
      return {
        ...state,
        moveToRecordFileDialog: {
          type: 'new',
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

export default stampInvOptReducer;
