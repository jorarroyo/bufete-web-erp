import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getAllRecordFiles = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los expedientes'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los expedientes'));
      });
  });
};

const getRecordFile = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los expedientes'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener los expedientes'));
      });
  });
};

const postRecordFile = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const putRecordFile = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchRecordFile = (funcName, recRequest) => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, recRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const deleteRecordFile = (funcName, recordFileId) => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}${funcName}${recordFileId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve())
      .catch(error => reject(error));
  });
};

const getActiveRecordFiles = () => {
  return getRecordFile('/list', '');
};

const getRecordFilesSearch = (page, size, searchText, order, searchAll = false) => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}/search/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}&all=${searchAll}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los expedientes'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los expedientes'));
      });
  });
};
const getClientNameByRecordId = recordId => {
  const { baseUrl, endpoint } = config.getRecordFiles;
  const url = `${baseUrl}${endpoint}/client-info/${recordId}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los expedientes'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los expedientes'));
      });
  });
};

const RecordServices = {
  getAllRecordFiles,
  getActiveRecordFiles,
  getRecordFilesSearch,
  getRecordFile,
  postRecordFile,
  putRecordFile,
  patchRecordFile,
  deleteRecordFile,
  getClientNameByRecordId,
};

export default RecordServices;
