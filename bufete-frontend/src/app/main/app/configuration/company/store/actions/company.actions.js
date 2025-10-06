import axios from 'axios';
import config from 'app/config';
import authService from 'app/services/authService';
import notificationHandler from 'app/utils/errorHandler';
import { statusName } from 'app/constants/appConstant';

export const GET_COMPANIES = '[COMPANY APP] GET COMPANIES';
export const GET_COMPANIES_ERROR = '[COMPANY APP] GET COMPANIES ERROR';
export const SET_SEARCH_TEXT = '[COMPANY APP] SET SEARCH TEXT';
export const OPEN_NEW_COMPANY_DIALOG = '[COMPANY APP] OPEN NEW COMPANY DIALOG';
export const CLOSE_NEW_COMPANY_DIALOG = '[COMPANY APP] CLOSE NEW COMPANY DIALOG';
export const OPEN_EDIT_COMPANY_DIALOG = '[COMPANY APP] OPEN EDIT COMPANY DIALOG';
export const CLOSE_EDIT_COMPANY_DIALOG = '[COMPANY APP] CLOSE EDIT COMPANY DIALOG';
export const ADD_COMPANY = '[COMPANYS APP] ADD COMPANY';
export const UPDATE_COMPANY = '[COMPANYS APP] UPDATE COMPANY';
export const REMOVE_COMPANY = '[COMPANY APP] REMOVE COMPANY';

const accessToken = authService.getAccessToken();
axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

export function getCompanies(routeParams) {
  const { baseUrl, endpoint } = config.getCompaniesList;
  const url = `${baseUrl}${endpoint}/${routeParams.id}`;

  const request = axios.get(url);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_COMPANIES,
          payload: response.data,
          routeParams,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function openNewCompanyDialog() {
  return {
    type: OPEN_NEW_COMPANY_DIALOG,
  };
}

export function closeNewCompanyDialog() {
  return {
    type: CLOSE_NEW_COMPANY_DIALOG,
  };
}

export function openEditCompanyDialog(data) {
  return {
    type: OPEN_EDIT_COMPANY_DIALOG,
    data,
  };
}

export function closeEditCompanyDialog() {
  return {
    type: CLOSE_EDIT_COMPANY_DIALOG,
  };
}

export function removeCompany(companyId) {
  const { baseUrl, endpoint } = config.createCompany;
  const url = `${baseUrl}${endpoint}/${companyId}`;

  return (dispatch, getState) => {
    const { routeParams } = getState().companyApp.company;
    const request = axios.delete(url);
    return request
      .then(() =>
        Promise.all([
          dispatch({
            type: REMOVE_COMPANY,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Empresa eliminada con éxito!!!');
          dispatch(getCompanies(routeParams));
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function addCompany(newCompany) {
  const { baseUrl, endpoint } = config.createCompany;
  const url = `${baseUrl}${endpoint}`;

  return (dispatch, getState) => {
    const { routeParams } = getState().companyApp.company;
    const request = axios.post(url, {
      name: newCompany.name,
    });
    return request
      .then(() =>
        Promise.all([
          dispatch({
            type: ADD_COMPANY,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Empresa creada con éxito!!!');
          dispatch(getCompanies(routeParams));
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}

export function updateCompany(company) {
  const { baseUrl, endpoint } = config.createCompany;
  const url = `${baseUrl}${endpoint}`;

  return (dispatch, getState) => {
    const { routeParams } = getState().companyApp.company;
    const request = axios.put(url, {
      id: company.id,
      name: company.name,
      status: statusName.ACTIVO,
    });
    return request
      .then(() =>
        Promise.all([
          dispatch({
            type: UPDATE_COMPANY,
          }),
        ]).then(() => {
          notificationHandler.successMessage(dispatch, 'Empresa actualizada con éxito!!!');
          dispatch(getCompanies(routeParams));
        })
      )
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
      });
  };
}
