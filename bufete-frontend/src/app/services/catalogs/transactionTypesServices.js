import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getTransactionTypeCatalog = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getTransactionTypes;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener el listado'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener el listado'));
      });
  });
};

const TransactionTypeServices = {
  getTransactionTypeCatalog,
};

export default TransactionTypeServices;
