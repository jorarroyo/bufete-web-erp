import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import config from 'app/config';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

class authService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        return new Promise((resolve, reject) => {
          if (!err.response) {
            this.emit('onAutoLogout', 'Error al tratar de ingresar');
            this.setSession(null);
            throw err;
          }
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', err.response.data.message);
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then(response => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password, companyId) => {
    const { baseUrl, endpoint } = config.authSignIn;
    const url = `${baseUrl}${endpoint}`;
    
    return new Promise((resolve, reject) => {
      axios
        .post(url, {
          usernameOrEmail: email,
          password,
          companyId,
        })
        .then(response => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(this.convertToUserDetail(response.data.user));
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    const { baseUrl, endpoint } = config.validateToken;
    const url = `${baseUrl}${endpoint}`;
    
    return new Promise((resolve, reject) => {
      axios
        .post(url, 
          this.getAccessToken()
        )
        .then(response => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(this.convertToUserDetail(response.data.user));
          } else {
            this.logout();
            reject('Imposible loguearse.');
          }
        })
        .catch(error => {
          this.logout();
          reject('Imposible loguearse.');
        });
    });
  };

  updateUserData = user => {
    return axios.post('/api/auth/user/update', {
      user,
    });
  };

  setSession = access_token => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = access_token => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };

  getActiveCompanies = () => {
    const { baseUrl, endpoint } = config.getActiveCompanies;
    const url = `${baseUrl}${endpoint}`;
    
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject('Error obteniendo las empresas');
          }
        })
        .catch(error => {
          reject('Error obteniendo las empresas');
        });
    });
  };

  getActiveRoles = () => {
    const { baseUrl, endpoint } = config.getRoles;
    const url = `${baseUrl}${endpoint}/list/active`;
    
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject('Error obteniendo los roles');
          }
        })
        .catch(error => {
          reject('Error obteniendo los roles');
        });
    });
  };

  convertToUserDetail(user) {
    const newUser = {
      uuid: user.id,
      from: 'real-db',
      password: '',
      role: user.roles,
      company: user.company_name,
      data: {
        displayName: user.name,
        photoURL: 'assets/images/avatars/profile.jpg',
        email: user.username,
        shortcuts: ['calendar', 'mail', 'contacts'],
      },
    };
    return newUser;
  }
}

const instance = new authService();

export default instance;
