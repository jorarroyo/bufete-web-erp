import axios from 'app/utils/axiosConfig';
import config from 'app/config';

const getDocument = (funcName, routeParams) => {
  const { baseUrlFEL, endpoint } = config.getFELDocuments;
  const url = `${baseUrlFEL}${endpoint}${funcName}${routeParams}`;

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

const postDocument = (funcName, felRequest) => {
  const { baseUrlFEL, endpoint } = config.getFELDocuments;
  const url = `${baseUrlFEL}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, felRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const cancelDocument = (funcName, felRequest) => {
  const { baseUrlFEL, endpoint } = config.getFELDocuments;
  const url = `${baseUrlFEL}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, felRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const checkClientNameByNIT = nit => {
  const { baseUrlFEL, endpoint } = config.getFELDocuments;
  const url = `${baseUrlFEL}${endpoint}/name_by_nit/${nit}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

const FELDocumentServices = {
  getDocument,
  postDocument,
  cancelDocument,
  checkClientNameByNIT,
};

export default FELDocumentServices;
