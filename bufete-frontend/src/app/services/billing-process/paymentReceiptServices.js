import axios from 'app/utils/axiosConfig';
import config from 'app/config';

const getAllPaymentReceipts = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getPaymentReceipts;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener Listado de recibos de facturas'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener Listado de recibos de facturas'));
      });
  });
};

const getPaymentReceipt = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getPaymentReceipts;
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

const postPaymentReceipt = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getPaymentReceipts;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchPaymentReceipt = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getPaymentReceipts;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const PaymentReceiptServices = {
  getAllPaymentReceipts,
  getPaymentReceipt,
  postPaymentReceipt,
  patchPaymentReceipt,
};

export default PaymentReceiptServices;
