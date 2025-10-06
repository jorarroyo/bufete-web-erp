import * as Actions from 'app/store/actions';
import history from '@history';

const errorHandler = error => {
  if (!error.response) {
    history.push('/pages/errors/error-500');
    return;
  }
  switch (error.response.status) {
    case 400:
      history.push('/pages/errors/error-400');
      break;
    case 403:
      history.push('/pages/errors/error-403');
      break;
    default:
      history.push('/pages/errors/error-500');
      break;
  }
};

const messageHandler = (dispatch, error) => {
  if (!error.response) {
    dispatch(Actions.showMessage({ message: 'Error al ejecutar la opción', variant: 'error' }));
    return;
  }
  switch (error.response.status) {
    case 400:
      dispatch(Actions.showMessage({ message: 'No se encontró el recurso que busca', variant: 'error' }));
      break;
    case 403:
      dispatch(Actions.showMessage({ message: 'No tiene acceso a la opción selecionada', variant: 'error' }));
      break;
    default:
      dispatch(Actions.showMessage({ message: error.response.data.message, variant: 'error' }));
      break;
  }
};

const infoMessage = (dispatch, message, variant) => {
  dispatch(Actions.showMessage({ message, variant }));
};

const successMessage = (dispatch, message) => {
  dispatch(Actions.showMessage({ message, variant: 'success' }));
};

const notificationHandler = {
  errorHandler,
  messageHandler,
  successMessage,
  infoMessage,
};

export default notificationHandler;
