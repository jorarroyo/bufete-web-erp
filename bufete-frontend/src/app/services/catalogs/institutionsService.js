import axios from '../../utils/axiosConfig';
import config from 'app/config';

const getInstitution = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getInstitutions;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener las instituciones'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener las instituciones'));
      });
  });
};

const postIntitution = (funcName, instRequest) => {
  const { baseUrl, endpoint } = config.getInstitutions;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, instRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      })
    });
};

const putInstitution = (funcName, instRequest) => {
  const { baseUrl, endpoint } = config.getInstitutions;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, instRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      })
  });
};

const deleteInstitution = (funcName, institutionId) => {
  const { baseUrl, endpoint } = config.getInstitutions;
  const url = `${baseUrl}${endpoint}${funcName}${institutionId}`;

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

const institutionsByStatus = status => {
  const { baseUrl, endpoint } = config.getInstitutions;
  const url = `${baseUrl}${endpoint}/status/${status}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener las instituciones'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener las instituciones'));
      });
  });
};

const InstitutionServices = {
  getInstitution,
  postIntitution,
  putInstitution,
  deleteInstitution,
  institutionsByStatus,
};

export default InstitutionServices;
