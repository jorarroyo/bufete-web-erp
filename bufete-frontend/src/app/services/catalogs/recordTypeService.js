import axios from '../../utils/axiosConfig';
import config from 'app/config';

const recordTypeByStatus = status => {
  const { baseUrl, endpoint } = config.getRecordType;
  const url = `${baseUrl}${endpoint}/status/${status}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los tipos de expediente'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los tipos de expediente'));
      });
  });
};

const RecordTypeServices = {
  recordTypeByStatus,
};

export default RecordTypeServices;
