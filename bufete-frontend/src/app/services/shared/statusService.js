import axios from 'axios';
import config from 'app/config';
import authService from 'app/services/authService';

const accessToken = authService.getAccessToken();
axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

const getStatusFlow = entityType => {
  const { baseUrl, endpoint } = config.getStatus;
  const url = `${baseUrl}${endpoint}/list/${entityType}`;

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

const getStatusHistory = (entityId, entityType) => {
  const { baseUrl, endpoint } = config.getStatus;
  const url = `${baseUrl}${endpoint}/history/${entityId}/${entityType}`;

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

const StatusService = {
  getStatusFlow,
  getStatusHistory,
};

export default StatusService;
