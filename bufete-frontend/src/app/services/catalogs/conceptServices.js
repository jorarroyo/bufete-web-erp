import config from 'app/config';
import axios from '../../utils/axiosConfig';

const getConcepts = (funcName, routeParams) => {
  const { baseUrl, endpoint } = config.getConcept;
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
const searchConcept = search => {
  if (!search) {
    return getConcepts('/search', '');
  }
  return getConcepts('/search/', `?params=${search}`);
};

const ConceptServices = {
  getConcepts,
  searchConcept,
};

export default ConceptServices;
