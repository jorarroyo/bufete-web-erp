import axios from 'app/utils/axiosConfig';
import config from 'app/config';

const getNomenclatures = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getNomenclature;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

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

const postNomenclature = (funcName, nomRequest) => {
  const { baseUrl, endpoint } = config.getNomenclature;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, nomRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchNomenclature = (funcName, nomRequest) => {
  const { baseUrl, endpoint } = config.getNomenclature;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, nomRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const putNomenclature = (funcName, nomRequest) => {
  const { baseUrl, endpoint } = config.getNomenclature;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, nomRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const deleteNomenclature = (funcName, id) => {
  const { baseUrl, endpoint } = config.getNomenclature;
  const url = `${baseUrl}${endpoint}${funcName}${id}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const searchNomenclatures = search => {
  if (!search) {
    return getNomenclatures('/search', '');
  }
  return getNomenclatures('/search/', `?params=${search}`);
};

const NomenclatureServices = {
  getNomenclatures,
  postNomenclature,
  patchNomenclature,
  putNomenclature,
  searchNomenclatures,
  deleteNomenclature,
};

export default NomenclatureServices;
