import authService from 'app/services/authService';
import { loginConstant } from 'app/constants/appConstant';
import { setUserData } from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_INIT_REQUEST = 'LOGIN_INIT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function submitLogin({ username, password /* , companyId */ }) {
  return dispatch => {
    dispatch({ type: LOGIN_INIT_REQUEST });
    authService
      .signInWithEmailAndPassword(username, password, loginConstant.DEFAULT_COMPANY)
      .then(user => {
        dispatch(setUserData(user));

        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  }
}

export function userLogout() {
  return dispatch => dispatch({ type: LOGOUT_SUCCESS });
}