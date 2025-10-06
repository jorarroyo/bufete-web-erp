import axios from 'axios';
import config from 'app/config';
import authService from 'app/services/authService';
import notificationHandler from 'app/utils/errorHandler';
import { statusName } from 'app/constants/appConstant';

export const GET_CURRENCIES = '[CURRENCY APP] GET CURRENCYS';
export const GET_CURRENCY = '[CURRENCY APP] GET CURRENCY';
export const REMOVE_CURRENCY_SELECTED = '[CURRENCY APP] REMOVE CURRENCY SELECTED';
export const SET_SEARCH_TEXT = '[CURRENCY APP] SET SEARCH TEXT';
export const OPEN_NEW_CURRENCY_DIALOG = '[CURRENCY APP] OPEN NEW CURRENCY DIALOG';
export const CLOSE_NEW_CURRENCY_DIALOG = '[CURRENCY APP] CLOSE NEW CURRENCY DIALOG';
export const OPEN_EDIT_CURRENCY_DIALOG = '[CURRENCY APP] OPEN EDIT CURRENCY DIALOG';
export const CLOSE_EDIT_CURRENCY_DIALOG = '[CURRENCY APP] CLOSE EDIT CURRENCY DIALOG';
export const ADD_CURRENCY = '[CURRENCY APP] ADD CURRENCY';
export const UPDATE_CURRENCY = '[CURRENCY APP] UPDATE CURRENCY';
export const REMOVE_CURRENCY = '[CURRENCY APP] REMOVE CURRENCY';

const accessToken = authService.getAccessToken();
axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

export function getCurrencies(routeParams) {
  const { baseUrl, endpoint } = config.getCurrency;
  const url = `${baseUrl}${endpoint}/list/${routeParams.id}`;

  const request = axios.get(url);

  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_CURRENCIES,
          payload: response.data,
          routeParams,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function getCurrencyById(id) {
  const { baseUrl, endpoint } = config.getCurrency;
  const url = `${baseUrl}${endpoint}/${id}`;

  const request = axios.get(url);

  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_CURRENCY,
          payload: response.data,
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openNewCurrencyDialog() {
  return {
    type: OPEN_NEW_CURRENCY_DIALOG,
  };
}

export function closeNewCurrencyDialog() {
  return {
    type: CLOSE_NEW_CURRENCY_DIALOG,
  };
}

export function openEditCurrencyDialog(data) {
  return {
    type: OPEN_EDIT_CURRENCY_DIALOG,
    data,
  };
}

export function closeEditCurrencyDialog() {
  return {
    type: CLOSE_EDIT_CURRENCY_DIALOG,
  };
}

export function removeCurrencySelected() {
  return {
    type: REMOVE_CURRENCY_SELECTED,
  };
}

export function addCurrency(newCurrency) {
  const { baseUrl, endpoint } = config.getCurrency;
  const url = `${baseUrl}${endpoint}`;

  return (dispatch, getState) => {
    const { routeParams } = getState().currencyApp.currency;
    const request = axios.post(url, {
      name: newCurrency.name,
      short_name: newCurrency.short_name,
      status: statusName.ACTIVO,
      exchange_value: newCurrency.exchange_value,
      company_id: newCurrency.company_id,
    });
    return request
      .then(() =>
        Promise.all([
          dispatch({
            type: ADD_CURRENCY,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Moneda creada con éxito!!!');
          dispatch(getCurrencies(routeParams));
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function updateCurrency(currency) {
  const { baseUrl, endpoint } = config.getCurrency;
  const url = `${baseUrl}${endpoint}`;

  return (dispatch, getState) => {
    const { routeParams } = getState().currencyApp.currency;
    const request = axios.put(url, {
      id: currency.id,
      name: currency.name,
      short_name: currency.short_name,
      status: statusName.ACTIVO,
      exchange_value: currency.exchange_value,
      company_id: currency.company_id,
    });
    return request
      .then(() =>
        Promise.all([
          dispatch({
            type: UPDATE_CURRENCY,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Moneda actualizada con éxito!!!');
          dispatch(getCurrencies(routeParams));
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function removeCurrency(currencyId) {
  const { baseUrl, endpoint } = config.getCurrency;
  const url = `${baseUrl}${endpoint}/${currencyId}`;

  return (dispatch, getState) => {
    const { routeParams } = getState().currencyApp.currency;
    const request = axios.delete(url);
    return request
      .then(() =>
        Promise.all([
          dispatch({
            type: REMOVE_CURRENCY,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Moneda eliminada con éxito!!!');
          dispatch(getCurrencies(routeParams));
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}
