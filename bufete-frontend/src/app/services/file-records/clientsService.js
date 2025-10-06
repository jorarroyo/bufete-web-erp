import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getAllClients = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getClients;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los clientes'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los clientes'));
      });
  });
};

const getClient = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getClients;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos del cliente'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los datos del cliente'));
      });
  });
};

const postClient = (funcName, cliRequest) => {
  const { baseUrl, endpoint } = config.getClients;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, cliRequest)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const putClient = (funcName, cliRequest) => {
  const { baseUrl, endpoint } = config.getClients;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, cliRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteClient = (funcName, clientId) => {
  const { baseUrl, endpoint } = config.getClients;
  const url = `${baseUrl}${endpoint}${funcName}${clientId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

const clientByStatus = status => {
  const { baseUrl, endpoint } = config.getClients;
  const url = `${baseUrl}${endpoint}/status/${status}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los clientes'));
        }
      })
      .catch(() => {
        // reject(new Error('error al obtener los clientes'));
        resolve([]);
      });
  });
};

const personalInfoByClient = clientId => {
  if (!clientId) return null;
  const { baseUrl, endpoint } = config.getClients;
  const url = `${baseUrl}${endpoint}/personal-info/${clientId}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los clientes'));
        }
      })
      .catch(() => {
        resolve(null);
      });
  });
};

const searchClient = search => {
  if (!search) {
    return getClient('/search', '');
  }
  return getClient('/search/', `?params=${search}`);
};

const searchClientChild = search => {
  if (!search) {
    return getClient('/search-child', '');
  }
  return getClient('/search-child/', `?params=${search}`);
};

const getClientChildren = parentId => {
  return getClient('/list-child/', parentId);
};

const ClientServices = {
  getAllClients,
  getClient,
  postClient,
  putClient,
  deleteClient,
  clientByStatus,
  personalInfoByClient,
  searchClient,
  searchClientChild,
  getClientChildren,
};

export default ClientServices;
