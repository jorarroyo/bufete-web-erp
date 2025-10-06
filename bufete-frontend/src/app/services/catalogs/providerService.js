import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getProviders = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getProvider;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener los datos'));
      });
  });
};

const searchProvider = search => {
  if (!search) {
    return getProviders('/search', '');
  }
  return getProviders('/search/', `?params=${search}`);
};

const ProviderServices = {
  getProviders,
  searchProvider,
};

export default ProviderServices;
