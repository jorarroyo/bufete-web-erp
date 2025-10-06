import axios from 'app/utils/axiosConfig';
import config from 'app/config';

const getAllExpenses = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getExpense;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener Listado de Gastos'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener Listado de Gastos'));
      });
  });
};

const getExpense = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getExpense;
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

const postExpense = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getExpense;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchExpense = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getExpense;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const ExpenseServices = {
  getAllExpenses,
  getExpense,
  postExpense,
  patchExpense,
};

export default ExpenseServices;
