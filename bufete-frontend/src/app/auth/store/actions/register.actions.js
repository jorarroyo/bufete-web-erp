import authService from 'app/services/authService';
import * as UserActions from './user.actions';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister({ displayName, password, email }) {
  return dispatch =>
    authService
      .createUser({
        displayName,
        password,
        email,
      })
      .then(user => {
        dispatch(UserActions.setUserData(user));
        return dispatch({
          type: REGISTER_SUCCESS,
        });
      })
      .catch(error => {
        return dispatch({
          type: REGISTER_ERROR,
          payload: error,
        });
      });
}
