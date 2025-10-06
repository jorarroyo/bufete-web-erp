import axios from 'axios';
import config from 'app/config';

const getDepartments = () => {
  const { baseUrl, endpoint } = config.getDeptoList;
  const url = `${baseUrl}${endpoint}`;

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

const getCountries = () => {
  const { baseUrl, endpoint } = config.getCountryList;
  const url = `${baseUrl}${endpoint}`;

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

const getCatalogs = (type, parentId) => {
  const { baseUrl, endpoint } = config.getSharedCatList;
  const url = `${baseUrl}${endpoint}/${type}/${parentId}`;

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

const getClientAddresses = (id, type) => {
  const { baseUrl, endpoint } = config.getClientAddressList;
  const url = `${baseUrl}${endpoint}/${id}/${type}`;

  return new Promise((resolve) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          resolve([]);
        }
      })
      .catch(() => {
        resolve([]);
      });
  });
};

const CommonServices = {
  getDepartments,
  getCountries,
  getCatalogs,
  getClientAddresses,
};

export default CommonServices;
