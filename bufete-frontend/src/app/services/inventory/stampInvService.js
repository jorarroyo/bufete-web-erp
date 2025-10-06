import axios from '../../utils/axiosConfig';
import config from 'app/config';

const getAllInventory = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getStampInv;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&searchText=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos del inventario'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los datos del inventario'));
      });
  });
};

const getStampInv = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getStampInv;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos del inventario'));
        }
      })
      .catch(() => reject(new Error('error al obtener los datos del inventario')));
  });
}

const postStampInv = (funcName, invRequest) => {
  const { baseUrl, endpoint } = config.getStampInv;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, invRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
}

const putStampInv = (funcName, invRequest) => {
  const { baseUrl, endpoint } = config.getStampInv;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, invRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
}

const patchStampInv = (funcName, invRequest) => {
  const { baseUrl, endpoint } = config.getStampInv;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, invRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
}

const deleteStampInv = (funcName, stampInvId) => {
  const { baseUrl, endpoint } = config.getStampInv;
  const url = `${baseUrl}${endpoint}${funcName}${stampInvId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

const getInvetoryById = inventoryId => {
  return getStampInv('/', inventoryId);
};

const getInvetoryByRecordId = recordId => {
  return getStampInv('/list-view/', recordId);
};

const getInvReportByRecordId = recordId => {
  return getStampInv('/report/', recordId);
};

const StampInvServices = {
  getAllInventory,
  getInvetoryById,
  getInvetoryByRecordId,
  getInvReportByRecordId,
  getStampInv,
  postStampInv,
  putStampInv,
  patchStampInv,
  deleteStampInv,
};

export default StampInvServices;
