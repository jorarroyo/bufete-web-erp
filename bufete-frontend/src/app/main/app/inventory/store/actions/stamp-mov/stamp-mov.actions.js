import {
  GET_STAMP_MOV_INIT_REQUEST,
  GET_STAMP_MOV_SUCCESS,
  GET_STAMP_MOV_FAILURE,
  SET_STAMP_MOV_SEARCH_CRITERIA,
} from '../../types/stamp-mov/stamp-mov.types';
import ProductServices from 'app/services/inventory/productService';
import notificationHandler from 'app/utils/errorHandler';

export function getStampMovs(productId, page, size, searchText, order) {
  return dispatch => {
    dispatch({
      type: GET_STAMP_MOV_INIT_REQUEST,
    });
    ProductServices.getAllProductMovs(productId, page, size, searchText, order)
      .then(response =>
        dispatch({
          type: GET_STAMP_MOV_SUCCESS,
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
          type: GET_STAMP_MOV_FAILURE,
        });
      });
  };
}

export function setStampMovSearchCriteria(event) {
  return {
    type: SET_STAMP_MOV_SEARCH_CRITERIA,
    searchText: event.target.value,
  };
}
