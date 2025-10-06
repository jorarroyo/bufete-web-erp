import axios from '../../utils/axiosConfig';
import config from 'app/config';

const getAllEmployees = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los empleados'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los empleados'));
      });
  });
};

const getEmployee = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los empleados'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener los empleados'));
      });
  });
};

const postEmployee = (funcName, empRequest) => {
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, empRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const putEmployee = (funcName, empRequest) => {
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, empRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const deleteEmployee = (funcName, employeeId) => {
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}${funcName}${employeeId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve())
      .catch(error => reject(error))
  });
};

const getActiveEmployees = () => {
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}/active`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los empleados'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los empleados'));
      });
  });
};

const getEmployeesByPosition = positionId => {
  if (!positionId) return null;
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}/position/${positionId}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los empleados'));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getAmountByEmployee = employeeId => {
  const { baseUrl, endpoint } = config.getEmployees;
  const url = `${baseUrl}${endpoint}/amount/${employeeId}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(() => {
        reject(new Error('error al obtener los empleados'));
      });
  });
};

const EmployeeServices = {
  getAllEmployees,
  getActiveEmployees,
  getEmployeesByPosition,
  getAmountByEmployee,
  getEmployee,
  postEmployee,
  putEmployee,
  deleteEmployee,
};

export default EmployeeServices;
