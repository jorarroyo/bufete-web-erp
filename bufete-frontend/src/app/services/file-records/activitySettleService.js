import axios from '../../utils/axiosConfig';
import config from 'app/config';

const getAllActivitySettle = (page, size, proctorAgendaId, searchText, order) => {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&proctorAgendaId=${proctorAgendaId}&searchText=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener las agendas de expediente'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener las agendas de expediente'));
      });
  });
};

const getActivitySettle = proctorAgendaId => {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}/list/${proctorAgendaId}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener las agendas de expediente'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener las agendas de expediente'));
      });
  });
};

const postActivitySettle = (funcName, settleRequest) => {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, settleRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const putActivitySettle = (funcName, settleRequest) => {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, settleRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const patchActivitySettle = (funcName, settleRequest) => {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, settleRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const deleteActivitySettle = (activitySettleId, proctorAgendaId) => {
  const { baseUrl, endpoint } = config.getActivitySettle;
  const url = `${baseUrl}${endpoint}/${activitySettleId}/${proctorAgendaId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(() => {
        reject(new Error('error al eliminar los datos'));
      });
  });
};

const ActivitySettleServices = {
  getAllActivitySettle,
  deleteActivitySettle,
  getActivitySettle,
  postActivitySettle,
  putActivitySettle,
  patchActivitySettle,
};

export default ActivitySettleServices;
