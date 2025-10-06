import axios from 'app/utils/axiosConfig';
import config from 'app/config';

const getAllReceipts = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getReceipts;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener Listado de facturas'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener Listado de facturas'));
      });
  });
};

const getReceipt = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getReceipts;
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
      .catch((err) => {
        reject(new Error('Error al obtener los datos'));
      });
  });
};

const postReceipt = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getReceipts;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchReceipt = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getReceipts;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const putReceipt = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getReceipts;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const ReceiptServices = {
  getAllReceipts,
  getReceipt,
  postReceipt,
  patchReceipt,
  putReceipt,
};

export default ReceiptServices;
