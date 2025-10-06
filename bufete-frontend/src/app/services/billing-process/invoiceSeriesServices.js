import axios from 'app/utils/axiosConfig';
import config from 'app/config';

const getAllInvoiceSeries = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getInvoiceSeries;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener Listado de series'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener Listado de series'));
      });
  });
};

const getInvoiceSeries = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getInvoiceSeries;
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

const postInvoiceSeries = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getInvoiceSeries;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchInvoiceSeries = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getInvoiceSeries;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const InvoiceSeriesServices = {
  getAllInvoiceSeries,
  getInvoiceSeries,
  postInvoiceSeries,
  patchInvoiceSeries,
};

export default InvoiceSeriesServices;
