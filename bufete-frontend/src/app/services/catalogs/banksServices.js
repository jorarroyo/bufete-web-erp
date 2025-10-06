import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getBankCatalog = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getBanks;
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

const BankServices = {
  getBankCatalog,
};

export default BankServices;
