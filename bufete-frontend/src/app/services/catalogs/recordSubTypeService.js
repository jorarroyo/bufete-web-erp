import axios from '../../utils/axiosConfig';
import config from 'app/config';

const recordSubTypeByStatus = (typeId, status) => {
  const { baseUrl, endpoint } = config.getRecordSubType;
  const url = `${baseUrl}${endpoint}/status/${typeId}/${status}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los sub tipos de expediente'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los sub tipos de expediente'));
      });
  });
};

const RecordSubTypeServices = {
  recordSubTypeByStatus,
};

export default RecordSubTypeServices;
