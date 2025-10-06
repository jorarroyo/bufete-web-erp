import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getRole = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getRoles;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos de los roles'));
        }
      })
      .catch(error => {
        reject(error);
      })
  });
}

const postRole = (funcName, roleRequest) => {
  const { baseUrl, endpoint } = config.getRoles;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, roleRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      })
  });
}

const putRole = (funcName, roleRequest) => {
  const { baseUrl, endpoint } = config.getRoles;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, roleRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      })
  });
}

const deleteRole = (funcName, roleId) => {
  const { baseUrl, endpoint } = config.getRoles;
  const url = `${baseUrl}${endpoint}${funcName}${roleId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      })
  });
}

const RoleServices = {
  getRole,
  postRole,
  putRole,
  deleteRole,
};

export default RoleServices;