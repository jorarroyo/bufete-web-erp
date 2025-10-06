import axios from 'app/utils/axiosConfig';
import config from 'app/config';

const getAllReceiptSettlements = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getReceiptSettlement;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener Listado de Liquidaciones'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener Listado de Liquidaciones'));
      });
  });
};

const getReceiptSettlement = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getReceiptSettlement;
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

const postReceiptSettlement = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getReceiptSettlement;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchReceiptSettlement = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getReceiptSettlement;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const getAdvanceBalanceList = clientId => {
  return getReceiptSettlement('/advance_balance/', clientId);
};

const ReceiptSettlementServices = {
  getAllReceiptSettlements,
  getReceiptSettlement,
  postReceiptSettlement,
  patchReceiptSettlement,
  getAdvanceBalanceList,
};

export default ReceiptSettlementServices;
