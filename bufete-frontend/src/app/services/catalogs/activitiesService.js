import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getActivity = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getActivities;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener las actividades'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener las actividades'));
      });
  });
};

const postActivity = (funcName, actRequest) => {
  const { baseUrl, endpoint } = config.getActivities;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, actRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

const putActivity = (funcName, actRequest) => {
  const { baseUrl, endpoint } = config.getActivities;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, actRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteActivity = (funcName, activityId) => {
  const { baseUrl, endpoint } = config.getActivities;
  const url = `${baseUrl}${endpoint}${funcName}${activityId}`;

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

const activitiesByStatus = status => {
  const { baseUrl, endpoint } = config.getActivities;
  const url = `${baseUrl}${endpoint}/status/${status}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener las actividades'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener las actividades'));
      });
  });
};

const ActivityServices = {
  getActivity,
  postActivity,
  putActivity,
  deleteActivity,
  activitiesByStatus,
};

export default ActivityServices;
