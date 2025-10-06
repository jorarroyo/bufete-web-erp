import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getUser = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getUsers;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos de los usuarios'));
        }
      })
      .catch(error => {
        reject(error);
      })
  });
}

const postUser = (funcName, userRequest) => {
  const { baseUrl, endpoint } = config.getUsers;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, userRequest)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      })
  });
}

const deleteUser = userId => {
  const { baseUrl, endpoint } = config.getUsers;
  const url = `${baseUrl}${endpoint}/${userId}`;

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

const checkUsernameAvailability  = username => {
  const { baseUrl, endpoint } = config.getUsers;
  const url = `${baseUrl}${endpoint}/checkUsernameAvailability?username=${username}`;

  const request = axios.get(url);
  return request.then(response => response.data.available).catch(() => false);
}

const checkEmailAvailability  = email => {
  const { baseUrl, endpoint } = config.getUsers;
  const url = `${baseUrl}${endpoint}/checkEmailAvailability?email=${email}`;

  const request = axios.get(url);
  return request.then(response => response.data.available).catch(() => false);
}

const UserServices = {
  getUser,
  postUser,
  deleteUser,
  checkEmailAvailability,
  checkUsernameAvailability,
};

export default UserServices;