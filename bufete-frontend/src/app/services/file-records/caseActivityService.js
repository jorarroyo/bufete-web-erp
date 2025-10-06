import axios from 'app/utils/axiosConfig';
import config from 'app/config';
import helperFunctions from 'app/utils/helperFunc';

const getAllCaseActivities = (page, size, searchText, order) => {
  const { baseUrl, endpoint } = config.getCaseActivities;
  const url = `${baseUrl}${endpoint}/?page=${page}&size=${size}&search=${searchText}&sort=${order.id}&direction=${order.direction}`;

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
        reject(new Error('error al obtener los datos'));
      });
  });
};

const getCaseActivity = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getCaseActivities;
  const url = `${baseUrl}${endpoint}${funcName}${routeParams}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Error al obtener las actividades'));
        }
      })
      .catch(() => {
        reject(new Error('Error al obtener las actividades'));
      });
  });
};

const postCaseActivity = (funcName, actRequest) => {
  const { baseUrl, endpoint } = config.getCaseActivities;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, actRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const putCaseActivity = (funcName, actRequest) => {
  const { baseUrl, endpoint } = config.getCaseActivities;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .put(url, actRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const patchCaseActivity = (funcName, actRequest) => {
  const { baseUrl, endpoint } = config.getCaseActivities;
  const url = `${baseUrl}${endpoint}${funcName}`;

  return new Promise((resolve, reject) => {
    axios
      .patch(url, actRequest)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

const deleteCaseActivity = (funcName, caseActivityId) => {
  const { baseUrl, endpoint } = config.getCaseActivities;
  const url = `${baseUrl}${endpoint}${funcName}${caseActivityId}`;

  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve())
      .catch(error => reject(error));
  });
};

const getUnassignedActivities = () => {
  return getCaseActivity('/unassigned', '');
};

const getAssignedActivities = proctorAgendaId => {
  return getCaseActivity('/assigned/', proctorAgendaId);
};

const getPrintableActivities = proctorAgendaId => {
  return getCaseActivity('/printable/', proctorAgendaId);
};

const getSelectedActivities = ids => {
  return postCaseActivity('/assined_list', ids);
};

const getAvailableActivities = (employeeId, assignedDate) => {
  return postCaseActivity('/available', {
    employee_id: employeeId,
    assign_date: helperFunctions.reFormatDate(assignedDate),
  });
};

const CaseActivityServices = {
  getAllCaseActivities,
  getCaseActivity,
  postCaseActivity,
  putCaseActivity,
  patchCaseActivity,
  deleteCaseActivity,
  getUnassignedActivities,
  getSelectedActivities,
  getAssignedActivities,
  getPrintableActivities,
  getAvailableActivities,
};

export default CaseActivityServices;
