import axios from 'axios';
import authService from 'app/services/authService';

const accessToken = authService.getAccessToken();
export default axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  },
});
