import axios from 'axios';
import config from 'app/config';
import authService from 'app/services/authService';

const accessToken = authService.getAccessToken();
axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

const getAllStampDuty = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getStampDuty;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

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

const createStampDuty = data => {
  const { baseUrl, endpoint } = config.getStampDuty;
  const url = `${baseUrl}${endpoint}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        stamp_type: data.stamp_type,
        designation_type: data.designation_type,
        year: data.year,
        comment: data.comment,
        stamp_number: data.stamp_number,
        purchase_date: data.purchase_date,
        employee_id: data.employee_id,
        form_number: data.form_number,
        form_range: data.form_range,
        action: data.action,
        activity_id: data.activity_id,
      })
      .then(response => {
        resolve(response);
      })
      .catch(() => {
        reject(new Error('error al crear el movimiento de inventario'));
      });
  });
};

const StampDutyServices = {
  getAllStampDuty,
  createStampDuty,
};

export default StampDutyServices;
