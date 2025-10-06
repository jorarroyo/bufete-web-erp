import CommonServices from 'app/services/shared';
import notificationHandler from 'app/utils/errorHandler';

export const GET_DEPARTMENTS = '[ADDRESS APP] GET DEPARTMENTS';

export function getDepartments() {
  const request = CommonServices.getDepartments();
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_DEPARTMENTS,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}
