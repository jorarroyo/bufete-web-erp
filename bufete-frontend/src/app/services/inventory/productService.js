import axios from '../../utils/axiosConfig';
import config from 'app/config';

const getAllProducts = (funcName, page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getProducts;
  const url = `${baseUrl}${endpoint}${funcName}?page=${page}&size=${size}&searchText=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos del producto'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los datos del producto'));
      });
  });
};

const getProduct = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getProducts;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos del producto'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los datos del producto'));
      });
  });
};

const postProduct = (funcName, prodRequest) => {
  const { baseUrl, endpoint } = config.getProducts;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, prodRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
}

const putProduct = (funcName, prodRequest) => {
  const { baseUrl, endpoint } = config.getProducts;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .putt(url, prodRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  });
}

const deleteProduct = (funcName, productId) => {
  const { baseUrl, endpoint } = config.getProducts;
  const url = `${baseUrl}${endpoint}${funcName}${productId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

const getStampList = () => {
  return getProduct('/stamps/search-list', '');
};

const getStampDetailById = id => {
  return getProduct('/stamp-detail/', id);
};

const getAllProductMovs = (productId, page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getProducts;
  const url = `${baseUrl}${endpoint}/prod-mov/?productId=${productId}&page=${page}&size=${size}&searchText=${searchText}&sort=${order.id}&direction=${order.direction}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener los datos del producto'));
        }
      })
      .catch(() => {
        reject(new Error('error al obtener los datos del producto'));
      });
  });
};

const getProductByType = type => {
  return getProduct('/product-list/', type);
};

const ProductServices = {
  getAllProducts,
  getStampList,
  getStampDetailById,
  getAllProductMovs,
  getProductByType,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};

export default ProductServices;
