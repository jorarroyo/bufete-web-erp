import axios from '../../utils/axiosConfig';
import config from 'app/config';

const getAllProctorAgenda = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getProctorAgenda;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

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

const getProctorAgenda = proctorAgendaId => {
  const { baseUrl, endpoint } = config.getProctorAgenda;
  const url = `${baseUrl}${endpoint}/${proctorAgendaId}`;

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

const postProctorAgenda = (funcName, proctorRequest) => {
  const { baseUrl, endpoint } = config.getProctorAgenda;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, proctorRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const putProctorAgenda = (funcName, proctorRequest) => {
  const { baseUrl, endpoint } = config.getProctorAgenda;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, proctorRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const patchProctorAgenda = (funcName, proctorRequest) => {
  const { baseUrl, endpoint } = config.getProctorAgenda;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, proctorRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
};

const deleteProctorAgenda = proctorAgendaId => {
  const { baseUrl, endpoint } = config.getProctorAgenda;
  const url = `${baseUrl}${endpoint}/${proctorAgendaId}`;

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

const changeState = request => {
  return patchProctorAgenda('', request);
};

const changeStateDetail = request => {
  return patchProctorAgenda('/detail', request);
};

const ProctorAgendaServices = {
  getAllProctorAgenda,
  deleteProctorAgenda,
  changeState,
  changeStateDetail,
  getProctorAgenda,
  postProctorAgenda,
  putProctorAgenda,
  patchProctorAgenda,
};

export default ProctorAgendaServices;
