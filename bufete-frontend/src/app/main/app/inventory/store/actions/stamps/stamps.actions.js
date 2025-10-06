import ProductService from 'app/services/inventory/productService';
import notificationHandler from 'app/utils/errorHandler';
import { productType, statusName } from 'app/constants/appConstant';
import { 
  GET_STAMPS_INIT_REQUEST, 
  GET_STAMPS_SUCCESS, 
  GET_STAMPS_FAILURE, 
  SET_STAMPS_SEARCH_CRITERIA,
  CREATE_STAMP_INIT_REQUEST,
  CREATE_STAMP_SUCCESS,
  CREATE_STAMP_FAILURE,
  OPEN_ADD_STAMPS_DIALOG,
  CLOSE_ADD_STAMPS_DIALOG,
  OPEN_EDIT_STAMPS_DIALOG,
  CLOSE_EDIT_STAMPS_DIALOG,
  GET_PROD_PROPERTY,
  REMOVE_STAMPS,
  OPEN_STAMP_MOV_DIALOG,
  CLOSE_STAMP_MOV_DIALOG,
  GET_STAMP_INIT_REQUEST,
  GET_STAMP_FAILURE
} from '../../types/stamps/stamps.types';
import ProductServices from 'app/services/inventory/productService';

const data = {
  id: null,
  product_code: '',
  product_name: '',
  product_type: '',
  designation_type: 0,
  year: 0,
  product_inv_type: productType.TIMBRES,
  status: statusName.ACTIVO,
  unit_value: 0,
  min_quantity: 0,
};

export function getStamps(page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_STAMPS_INIT_REQUEST,
    });
    ProductServices.getAllProducts('/', page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_STAMPS_SUCCESS,
          payload: response,
          routeParams: {
            page,
            size,
            order,
          },
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener los timbres', 'error');
        dispatch({
          type: GET_STAMPS_FAILURE,
        });
      });
  }
}

export function setStampsSearchCriteria(event) {
  return {
    type: SET_STAMPS_SEARCH_CRITERIA,
    searchText: event.target.value,
  };
}

export function createStamps(data) {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_STAMP_INIT_REQUEST,
    });
    const { routeParams, searchText } = getState().stampsApp.stamps;
    const request = {
      id: data.id,
      product_code: data.product_code,
      product_name: data.product_name,
      product_inv_type: data.product_inv_type,
      status: data.status,
      unit_value: data.unit_value,
      min_quantity: data.min_quantity,
      detail_list: data.detail_list,
      designation_type: data.designation_type,
      product_type: data.product_type,
      year: data.year,
    };
    ProductServices.postProduct('/stamps', request)
      .then(response => dispatch({ type: CREATE_STAMP_SUCCESS, payload: response }))
      .then(() => {
        if (data.id === null) {
          dispatch(closeAddStampsDialog());
        } else {
          dispatch(closeEditStampsDialog());
        }
      })
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Timbre almacenado con éxito!!!');
        dispatch(getStamps(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar crear el timbre', 'error');
        dispatch({
          type: CREATE_STAMP_FAILURE,
        });
      });
    }
}

export function openAddStampsDialog() {
  return {
    type: OPEN_ADD_STAMPS_DIALOG,
    payload: data,
  };
}

export function closeAddStampsDialog() {
  return {
    type: CLOSE_ADD_STAMPS_DIALOG,
  };
}

export function openEditStampsDialog(id) {
  return dispatch => {
    dispatch({
      type: GET_STAMP_INIT_REQUEST,
    });
    ProductService.getProduct('/stamps/',id)
      .then(response =>
        dispatch({
          type: OPEN_EDIT_STAMPS_DIALOG,
          data: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al intentar obtener la información del timbre', 'error');
        dispatch({
          type: GET_STAMP_FAILURE,
        });
    });
  }
}

export function closeEditStampsDialog() {
  return {
    type: CLOSE_EDIT_STAMPS_DIALOG,
  };
}

export function getProdProperties(type) {
  return dispatch =>
    ProductService.getProduct('/properties/', type)
      .then(response =>
        dispatch({
          type: GET_PROD_PROPERTY,
          payload: response,
        })
      )
      .catch(() => notificationHandler.infoMessage(dispatch, 'Error al intentar obtener la informacion', 'error'));
}

export function removeStamp(form) {
  return (dispatch, getState) => {
    const { routeParams, searchText } = getState().stampsApp.stamps;
    ProductService.deleteProduct('/', form.id)
      .then(() =>
        dispatch({
          type: REMOVE_STAMPS,
        })
      )
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Timbre eliminado con éxito!!!');
        dispatch(getStamps(routeParams.page, routeParams.size, searchText, routeParams.order));
      })
      .catch(() => notificationHandler.infoMessage(dispatch, 'Error al intentar eliminar el timbre', 'error'));
    }
}

export function openStampMovDialog(productId) {
  return {
    type: OPEN_STAMP_MOV_DIALOG,
    payload: productId,
  };
}

export function closeStampMovDialog() {
  return {
    type: CLOSE_STAMP_MOV_DIALOG,
  };
}
