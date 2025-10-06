import axios from 'axios';
import config from 'app/config';
import authService from 'app/services/authService';

const accessToken = authService.getAccessToken();
axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

const getFileContentById = id => {
  const { baseUrl, endpoint } = config.getFiles;
  const url = `${baseUrl}${endpoint}/download/${id}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url, { responseType: 'arraybuffer' })
      .then(response => {
        resolve(response);
      })
      .catch(() => {
        reject(new Error('error al obtener los expedientes'));
      });
  });
};

const FileManagementService = {
  getFileContentById,
};

export default FileManagementService;
